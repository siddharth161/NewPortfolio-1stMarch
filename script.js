/**
 * Siddharth Shankar - Modern Portfolio Engine
 * Specialized in Agentic AI Systems, .NET 9 Clean Architecture & Distributed Systems
 * 100% Vanilla JavaScript (ES6+) - Zero Bloat, Ultra Fast
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Theme Management (Dark / Light with LocalStorage & OS detection)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('siddharth-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('siddharth-theme', theme);
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.title = 'Switch to Dark Mode';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.title = 'Switch to Light Mode';
    }
  }

  // Initial theme application
  applyTheme(getPreferredTheme());

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('siddharth-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });


  // =========================================================================
  // 2. Reading Progress Bar & Sticky Header Spy
  // =========================================================================
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 450) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // =========================================================================
  // 3. Mobile Navigation Drawer
  // =========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }


  // =========================================================================
  // 4. Scroll Spy: Active Navigation Link Indicator
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -65% 0px'
  });

  sections.forEach(sec => sectionObserver.observe(sec));


  // =========================================================================
  // 5. Typewriter Effect in Hero Section
  // =========================================================================
  const typewriterElement = document.getElementById('typewriter');
  const roles = [
    'Agentic AI Systems',
    '.NET 9 Clean Architectures',
    'Autonomous Multi-Agent Loops',
    'High-Throughput CQRS Backends',
    'Resilient Distributed Platforms',
    'Full-Stack Intelligent Web Apps'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeStep() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at end of text
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeStep, typingSpeed);
  }

  typeStep();


  // =========================================================================
  // 6. Project Filter Tabs
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });


  // =========================================================================
  // 7. Interactive Architecture & Agent Sandbox Terminal
  // =========================================================================
  const terminalBody = document.getElementById('terminal-body');
  const btnSimAgenticOps = document.getElementById('btn-sim-agenticops');
  const btnSimMediFlow = document.getElementById('btn-sim-mediflow');
  const btnSimJobAgent = document.getElementById('btn-sim-jobagent');
  const btnClearTerm = document.getElementById('btn-clear-term');

  let simTimer = null;
  let isSimulating = false;

  const simulations = {
    agenticops: [
      { tag: 'tag-info', label: 'INFO', msg: '<strong>[AlertWebhook]</strong> Received PagerDuty Alert: CrashLoopBackOff detected on service <code>payment-processor-svc</code>' },
      { tag: 'tag-thought', label: 'THOUGHT', msg: '<strong>[SemanticKernel]</strong> Evaluating container telemetry: Health probes failed 5 times. High heap allocation detected in pod <code>payment-core-8fd9b</code>.' },
      { tag: 'tag-action', label: 'ACTION', msg: '<strong>[KubernetesDiagnosticPlugin]</strong> Probing live pod metrics & cgroup memory pressures via Kubernetes API...' },
      { tag: 'tag-info', label: 'INFO', msg: '<strong>[LogAnalyzerPlugin]</strong> Regex signature match: <code>OutOfMemoryError (OOMKilled)</code> in high-volume background queue consumer.' },
      { tag: 'tag-thought', label: 'THOUGHT', msg: '<strong>[SafetyPolicyEngine]</strong> Remediation action required: Graceful pod restart + temporary memory quota burst. Risk tier: <strong>MODERATE</strong> (Auto-approved under policy rules).' },
      { tag: 'tag-action', label: 'ACTION', msg: '<strong>[KubernetesPlugin]</strong> Initiating rolling pod replacement and flushing uncommitted in-memory cache...' },
      { tag: 'tag-success', label: 'SUCCESS', msg: '<strong>[HealthCheckPlugin]</strong> Pod replacement active. HTTP liveness & readiness probe returned <code>200 OK (Latency: 14ms)</code>. Incident resolved.' },
      { tag: 'tag-info', label: 'INFO', msg: '<strong>[SignalRStream]</strong> Post-mortem RCA telemetry report generated and broadcast live over WebSockets to SRE Dashboard.' }
    ],
    mediflow: [
      { tag: 'tag-info', label: 'INFO', msg: '<strong>[MediFlow.Api]</strong> Ingesting incoming EDI 837P Professional Healthcare Claim batch <code>#CLM-2026-9812</code>' },
      { tag: 'tag-thought', label: 'THOUGHT', msg: '<strong>[MediatR]</strong> Dispatching <code>SubmitClaimCommand</code> through CQRS pipeline behaviors...' },
      { tag: 'tag-info', label: 'INFO', msg: '<strong>[FluentValidation]</strong> Validating NPI format (<code>1982736450</code>), diagnosis codes (<code>ICD-10: I10, Z00.00</code>), and line-item balances. Result: <strong>PASSED</strong>.' },
      { tag: 'tag-action', label: 'ACTION', msg: '<strong>[ClaimsAdjudicator]</strong> Evaluating Medicaid provider eligibility rules & fee schedules...' },
      { tag: 'tag-info', label: 'INFO', msg: '<strong>[PollyPolicy]</strong> Circuit breaker status: <code>CLOSED</code>. Executing provider verification lookup with zero failures.' },
      { tag: 'tag-success', label: 'SUCCESS', msg: '<strong>[Domain]</strong> Claim adjudicated! Status: <strong>APPROVED</strong>. Total: $1,450.00 | Covered: $1,425.00 | Copay: $25.00.' },
      { tag: 'tag-action', label: 'ACTION', msg: '<strong>[TransactionalOutbox]</strong> Atomically committed Claim state to DB and inserted <code>ClaimApprovedDomainEvent</code> into Outbox table.' },
      { tag: 'tag-info', label: 'INFO', msg: '<strong>[BackgroundWorker]</strong> Outbox processor read event and published integration payload to clearinghouse message queue.' }
    ],
    jobagent: [
      { tag: 'tag-info', label: 'INFO', msg: '<strong>[n8n.Cron]</strong> Scheduled daily job discovery workflow triggered across target ATS endpoints.' },
      { tag: 'tag-action', label: 'ACTION', msg: '<strong>[JobIngestor]</strong> Polled Greenhouse, Lever, and Ashby APIs: 14 new engineering postings ingested into PostgreSQL.' },
      { tag: 'tag-thought', label: 'THOUGHT', msg: '<strong>[Qdrant]</strong> Computing cosine similarity between candidate profile vectors and job specification embeddings...' },
      { tag: 'tag-info', label: 'INFO', msg: '<strong>[Ollama:Qwen2.5]</strong> Evaluated role "Distributed Systems Engineer" at CloudScale Inc. Match Score: <strong>94/100</strong>. Status -> <strong>MATCHED</strong>.' },
      { tag: 'tag-action', label: 'ACTION', msg: '<strong>[TypstEngine]</strong> Compiling customized ATS-tailored vector PDF resume with aligned keywords & metrics...' },
      { tag: 'tag-success', label: 'SUCCESS', msg: '<strong>[Typst]</strong> Resume PDF compiled in 16ms! ATS compliance rating: <strong>98%</strong>.' },
      { tag: 'tag-action', label: 'ACTION', msg: '<strong>[Browser-Use]</strong> Spawning Playwright Chromium instance. Navigating to application form and populating fields...' },
      { tag: 'tag-success', label: 'SUCCESS', msg: '<strong>[TelegramApproval]</strong> Form completed up to final submit. Halting safely. Interactive review alert dispatched to candidate Telegram!' }
    ]
  };

  function getTimestamp() {
    const now = new Date();
    return now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
  }

  function appendTerminalLine(item) {
    if (!terminalBody) return;
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `
      <span class="log-time">${getTimestamp()}</span>
      <span class="log-tag ${item.tag}">${item.label}</span>
      <span class="log-msg">${item.msg}</span>
    `;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function runSimulation(type) {
    if (simTimer) clearTimeout(simTimer);
    isSimulating = true;

    // Highlight the active button
    [btnSimAgenticOps, btnSimMediFlow, btnSimJobAgent].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });
    if (type === 'agenticops' && btnSimAgenticOps) btnSimAgenticOps.classList.add('active');
    if (type === 'mediflow' && btnSimMediFlow) btnSimMediFlow.classList.add('active');
    if (type === 'jobagent' && btnSimJobAgent) btnSimJobAgent.classList.add('active');

    // Add divider in terminal
    const divider = document.createElement('div');
    divider.style.borderTop = '1px dashed rgba(255,255,255,0.1)';
    divider.style.margin = '14px 0 10px';
    terminalBody.appendChild(divider);

    const logList = simulations[type] || [];
    let idx = 0;

    function playNext() {
      if (idx < logList.length) {
        appendTerminalLine(logList[idx]);
        idx++;
        simTimer = setTimeout(playNext, 650);
      } else {
        isSimulating = false;
      }
    }

    playNext();
  }

  if (btnSimAgenticOps) {
    btnSimAgenticOps.addEventListener('click', () => runSimulation('agenticops'));
  }
  if (btnSimMediFlow) {
    btnSimMediFlow.addEventListener('click', () => runSimulation('mediflow'));
  }
  if (btnSimJobAgent) {
    btnSimJobAgent.addEventListener('click', () => runSimulation('jobagent'));
  }

  if (btnClearTerm) {
    btnClearTerm.addEventListener('click', () => {
      if (simTimer) clearTimeout(simTimer);
      if (terminalBody) {
        terminalBody.innerHTML = `
          <div class="terminal-line">
            <span class="log-time">${getTimestamp()}</span>
            <span class="log-tag tag-info">READY</span>
            <span class="log-msg">Terminal cleared. Select a simulation scenario above to stream live telemetry.</span>
          </div>
        `;
      }
    });
  }

  // Allow "Simulate in Terminal" buttons on project cards to scroll to terminal and execute
  const runSimCardBtns = document.querySelectorAll('.run-sim-btn');
  runSimCardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const simType = btn.getAttribute('data-sim');
      const sandbox = document.getElementById('sandbox');
      if (sandbox) {
        sandbox.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        runSimulation(simType);
      }, 600);
    });
  });

  // Start with AgenticOps simulation automatically on initial load
  setTimeout(() => {
    if (terminalBody) {
      terminalBody.innerHTML = `
        <div class="terminal-line">
          <span class="log-time">${getTimestamp()}</span>
          <span class="log-tag tag-success">ONLINE</span>
          <span class="log-msg">Agentic Orchestration Cluster v2.4 initialized. All plugins and workers connected.</span>
        </div>
      `;
      runSimulation('agenticops');
    }
  }, 1000);


  // =========================================================================
  // 8. Copy to Clipboard Utility with Toast Notification
  // =========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(msg) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'sidds4970@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard! (sidds4970@gmail.com)');
      }).catch(() => {
        showToast('sidds4970@gmail.com');
      });
    });
  }


  // =========================================================================
  // 9. Contact Form Simulation & Feedback
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Open email client with pre-populated message
      const mailtoLink = `mailto:sidds4970@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio')}&body=${encodeURIComponent(`Hi Siddharth,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
      window.location.href = mailtoLink;

      showToast(`Thank you, ${name}! Your email client has been prepared.`);
      contactForm.reset();
    });
  }


  // =========================================================================
  // 10. Dynamic Footer Copyright Year
  // =========================================================================
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});