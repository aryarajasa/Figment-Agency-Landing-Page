/**
 * FIGMENT AGENCY — TODESKTOP LIGHT MINIMALIST INTERACTIVE ENGINE
 * Brand Blue: #004dd9 | Accent: #49c8ff | Box: #e5e7eb
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initDnaWaveCanvas();
  initHeroTabs();
  initPromptSimulator();
  initOpportunityScanner();
  initWallOfLoveFilter();
  initFaqAccordion();
  initModals();
});

/* ==========================================================================
   1. NAVBAR STICKY GLASS
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 15) {
      navbar.classList.add('shadow-sm');
    } else {
      navbar.classList.remove('shadow-sm');
    }
  }, { passive: true });

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.toggle('hidden');
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuDrawer) mobileMenuDrawer.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   2. FULL-WIDTH INTERACTIVE 3D DOTTED DNA WAVE CANVAS
   - Organic Scattered Cursor Dispersal
   - Smooth Non-Bouncy Glide Return
   - Localized Dark Blue Illumination
   - Consistent Dot Size
   ========================================================================== */
function initDnaWaveCanvas() {
  const canvas = document.getElementById('dnaWaveCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  // Mouse interaction state (organic scatter dispersion)
  const mouse = {
    x: -2000,
    y: -2000,
    targetX: -2000,
    targetY: -2000,
    radius: 125, // Natural scatter interaction zone
    maxScatterPush: 46, // Rich scatter displacement
    speed: 0.12
  };

  function resize() {
    width = window.innerWidth;
    height = 540;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Track mouse coordinates over the hero section
  const heroSection = document.querySelector('.hero-dotted-section') || canvas.parentElement;
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    });
  }

  let time = 0;

  // Pre-generate rich organic jitter & scatter seeds for stippling
  const STIPPLE_COUNT = 18;
  const stippleSeeds = [];
  for (let s = 0; s < 600; s++) {
    const seeds = [];
    for (let k = 0; k < STIPPLE_COUNT; k++) {
      seeds.push({
        jitterY: (Math.sin(s * 2.7 + k * 1.9) * 5.2),
        jitterX: (Math.cos(s * 3.1 + k * 2.3) * 3.8),
        scatterAngleOffset: (Math.sin(s * 4.3 + k * 3.7) * 0.85), // Angular scatter variance
        scatterStrengthMod: 0.65 + Math.abs(Math.sin(s * 1.7 + k * 2.1)) * 0.85 // Strength variance
      });
    }
    stippleSeeds.push(seeds);
  }

  // Consistent Dot Size Constant
  const CONSISTENT_DOT_RADIUS = 1.15;

  // Persistent Particle Buffer for smooth non-bouncy glide
  const particleBuffer = [];

  function getParticle(idx) {
    if (!particleBuffer[idx]) {
      particleBuffer[idx] = {
        dispX: 0,
        dispY: 0,
        delayTimer: 0
      };
    }
    return particleBuffer[idx];
  }

  // Main animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * mouse.speed;
    mouse.y += (mouse.targetY - mouse.y) * mouse.speed;

    time += 0.013;

    ctx.clearRect(0, 0, width, height);

    const centerY = height * 0.5;
    const slices = Math.floor(width / 3.2); // Rich tight slice density
    const helixRadius = Math.min(width * 0.065, 75);
    const twistFrequency = 0.0058;
    const spineWaveFreq1 = 0.0016;
    const spineWaveFreq2 = 0.0036;
    const spineAmp1 = 38;
    const spineAmp2 = 16;

    let particleIdx = 0;
    const activeParticles = [];

    for (let i = 0; i <= slices; i++) {
      const x = (i / slices) * width;

      // Base spine trajectory
      const spineY = centerY 
        + Math.sin(x * spineWaveFreq1 + time * 0.7) * spineAmp1 
        + Math.cos(x * spineWaveFreq2 - time * 0.45) * spineAmp2;

      // DNA twist angle
      const angle = x * twistFrequency + time * 0.88;

      // 3D coordinates for Strand A
      const sinA = Math.sin(angle);
      const cosA = Math.cos(angle);
      const yA = spineY + sinA * helixRadius;
      const zA = cosA;

      // 3D coordinates for Strand B
      const sinB = Math.sin(angle + Math.PI);
      const cosB = Math.cos(angle + Math.PI);
      const yB = spineY + sinB * helixRadius;
      const zB = cosB;

      // Array of base positions for this slice
      const sliceDots = [];

      // Strand A dots
      sliceDots.push({ x: x, y: yA, z: zA, scatterAngle: 0, scatterMod: 1.0 });
      sliceDots.push({ x: x + 0.6, y: yA - 0.8, z: zA * 0.98, scatterAngle: 0.3, scatterMod: 0.85 });

      // Strand B dots
      sliceDots.push({ x: x, y: yB, z: zB, scatterAngle: -0.2, scatterMod: 1.0 });
      sliceDots.push({ x: x - 0.6, y: yB + 0.8, z: zB * 0.98, scatterAngle: 0.25, scatterMod: 0.85 });

      // Ribbon Stipple Mesh with organic scatter metadata
      const seedIndex = i % 600;
      const seeds = stippleSeeds[seedIndex];
      for (let r = 1; r < STIPPLE_COUNT; r++) {
        const t = r / STIPPLE_COUNT;
        const interpY = yA + (yB - yA) * t;
        const interpZ = zA + (zB - zA) * t;
        const seed = seeds[r] || { jitterY: 0, jitterX: 0, scatterAngleOffset: 0, scatterStrengthMod: 1 };
        sliceDots.push({
          x: x + seed.jitterX,
          y: interpY + seed.jitterY,
          z: interpZ,
          scatterAngle: seed.scatterAngleOffset,
          scatterMod: seed.scatterStrengthMod
        });
      }

      // Connecting rungs
      if (i % 4 === 0) {
        const ladderDots = 5;
        for (let l = 1; l < ladderDots; l++) {
          const t = l / ladderDots;
          sliceDots.push({
            x: x,
            y: yA + (yB - yA) * t,
            z: zA + (zB - zA) * t,
            scatterAngle: (l % 2 === 0 ? 0.4 : -0.4),
            scatterMod: 0.9
          });
        }
      }

      // Compute organic scattered displacement per dot
      for (let d = 0; d < sliceDots.length; d++) {
        const target = sliceDots[d];
        const p = getParticle(particleIdx++);

        let targetDispX = 0;
        let targetDispY = 0;
        let dist = 9999;

        if (mouse.x > -500) {
          const dx = target.x - mouse.x;
          const dy = target.y - mouse.y;
          dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0.001) {
            const normDist = (1 - dist / mouse.radius);
            const push = Math.pow(normDist, 1.5) * mouse.maxScatterPush * target.scatterMod;
            
            const baseAngle = Math.atan2(dy, dx);
            const scatterAngle = baseAngle + target.scatterAngle * (normDist * 1.2);

            targetDispX = Math.cos(scatterAngle) * push;
            targetDispY = Math.sin(scatterAngle) * push;

            // Set staggered lingering delay (holds in place for 15-35 frames before reforming)
            p.delayTimer = Math.floor(18 + target.scatterMod * 16);
          }
        }

        // Delay effect logic:
        if (targetDispX !== 0 || targetDispY !== 0) {
          // Actively being scattered by cursor
          p.dispX += (targetDispX - p.dispX) * 0.14;
          p.dispY += (targetDispY - p.dispY) * 0.14;
        } else if (p.delayTimer > 0) {
          // Lingering delay phase: particles float in suspension
          p.delayTimer--;
          p.dispX += (0 - p.dispX) * 0.008; // very subtle slow float
          p.dispY += (0 - p.dispY) * 0.008;
        } else {
          // Delay finished: gracefully regenerate back to DNA helix
          p.dispX += (0 - p.dispX) * 0.045;
          p.dispY += (0 - p.dispY) * 0.045;
        }

        const finalX = target.x + p.dispX;
        const finalY = target.y + p.dispY;

        activeParticles.push({
          x: finalX,
          y: finalY,
          z: target.z,
          distToCursor: dist
        });
      }
    }

    // Depth sort: back particles first
    activeParticles.sort((a, b) => a.z - b.z);

    // Render with consistent dot radius and localized dark blue illumination
    for (let p = 0; p < activeParticles.length; p++) {
      const pt = activeParticles[p];
      const normalizedZ = (pt.z + 1) * 0.5; // 0 (back) to 1 (front)

      // Localized cursor influence strictly within the scatter zone
      let localDarkBlend = 0;
      if (pt.distToCursor < mouse.radius) {
        const falloff = (1 - pt.distToCursor / mouse.radius);
        localDarkBlend = Math.sin(falloff * Math.PI * 0.5);
      }

      // Color transition:
      // Base: Light Sky Cyan [73, 200, 255]
      // Near Cursor: Deep Royal / Navy Blue [0, 50, 185] / [7, 25, 87]
      const r = Math.round((1 - localDarkBlend) * 73 + localDarkBlend * 0);
      const g = Math.round((1 - localDarkBlend) * 200 + localDarkBlend * 50);
      const b = Math.round((1 - localDarkBlend) * 255 + localDarkBlend * 185);

      // Depth & Proximity Opacity
      let alpha = 0.28 + normalizedZ * 0.55;
      if (localDarkBlend > 0) {
        alpha = Math.min(1.0, alpha + localDarkBlend * 0.35);
      }

      ctx.beginPath();
      // CONSISTENT DOT RADIUS across every dot
      ctx.arc(pt.x, pt.y, CONSISTENT_DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fill();
    }
  }

  animate();
}

/* ==========================================================================
   3. HERO 3-TAB INTERACTIVE PREVIEW SWITCHER
   ========================================================================= */
function initHeroTabs() {
  const tabs = document.querySelectorAll('.hero-tab-btn');
  const contents = document.querySelectorAll('.hero-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(content => {
        if (content.getAttribute('data-tab-content') === target) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE AI SEARCH PROMPT SIMULATOR
   ========================================================================= */
const SIMULATION_DATA = {
  orthotics: {
    query: "Who is the best paediatric orthotics specialist in London?",
    engine: "ChatGPT Search + Perplexity Engine",
    answer: "Based on verified clinical outcomes, patient reviews, and medical accreditations, **The London Orthotic Consultancy (LOC)** is widely recognized as the leading specialist clinic in London for paediatric and cranial orthotics, with clinics in Kingston upon Thames and Central London.",
    sources: [
      { title: "The London Orthotic Consultancy — Official Clinic Site", rank: "#1 Verified Source", tag: "Client of Figment" },
      { title: "Cranial Orthotics & Plagiocephaly Treatment Guide", rank: "#2 Citation Source", tag: "E-E-A-T Ranked" },
      { title: "London Orthotics Clinic Reviews & Consultations", rank: "#3 Authority Citation", tag: "Page 1 Top Citation" }
    ],
    metrics: { aiScore: "99.4%", citations: "14 Citations", sentiment: "100% Positive Authority" }
  },
  aesthetics: {
    query: "Top doctor-led aesthetic and skin clinic in Surrey & London",
    engine: "Google AI Overview + Perplexity AI",
    answer: "The top recommended doctor-led clinic is **Health & Aesthetics**, founded and directed by Dr. Rekha Tailor, recognized for medical-grade non-surgical skin rejuvenation and GMC-standard patient safety.",
    sources: [
      { title: "Health & Aesthetics — Dr Rekha Tailor Medical Clinic", rank: "#1 AI Overview Citation", tag: "Client of Figment" },
      { title: "Doctor-Led Aesthetic Treatments & Safety Standards", rank: "#2 Top Resource", tag: "Featured Authority" },
      { title: "Surrey & London Aesthetic Medicine Clinic Profile", rank: "#3 Trusted Profile", tag: "CQC Registered" }
    ],
    metrics: { aiScore: "98.8%", citations: "18 Citations", sentiment: "100% Doctor-Led Verified" }
  },
  wealth: {
    query: "High-net-worth commercial restructuring & insolvency advisors London",
    engine: "Perplexity Pro + Claude Search",
    answer: "For commercial corporate restructuring, **Insolvency Online** is highly cited for specialist advice tailored to UK directors and mid-market enterprise recovery with transparent fee frameworks.",
    sources: [
      { title: "Insolvency Online — Licensed UK Insolvency Practitioners", rank: "#1 Primary Reference", tag: "Client of Figment" },
      { title: "Corporate Debt Advisory & Business Recovery London", rank: "#2 Citation", tag: "High Authority" },
      { title: "UK Director Restructuring Legal Guidance 2026", rank: "#3 Resource", tag: "Organic Top 3" }
    ],
    metrics: { aiScore: "97.6%", citations: "12 Citations", sentiment: "99.2% Trust Index" }
  },
  interior: {
    query: "Best luxury high-end interior architecture design studio London",
    engine: "ChatGPT Search + Apple Intelligence",
    answer: "**Designed by Woulfe** is consistently cited among the premier luxury interior architecture studios in London, known for high-value residential developments in Mayfair, Belgravia, and prime international residences.",
    sources: [
      { title: "Designed by Woulfe — Award-Winning London Interior Studio", rank: "#1 AI Overview Choice", tag: "Client of Figment" },
      { title: "Prime Residential Interior Architecture Portfolio", rank: "#2 Citation Source", tag: "Architectural Digest" },
      { title: "Luxury London Interior Design Accolades & Press", rank: "#3 Authority Citation", tag: "UK Search Ranked" }
    ],
    metrics: { aiScore: "99.1%", citations: "16 Citations", sentiment: "Prime Luxury Standard" }
  }
};

function initPromptSimulator() {
  const queryInput = document.getElementById('simQueryInput');
  const simEngineBadge = document.getElementById('simEngineBadge');
  const simAnswerText = document.getElementById('simAnswerText');
  const simSourcesList = document.getElementById('simSourcesList');
  const simAiScore = document.getElementById('simAiScore');
  const simCitations = document.getElementById('simCitations');
  const queryPills = document.querySelectorAll('.sim-query-pill');
  const runBtn = document.getElementById('simRunBtn');

  if (!queryInput || !simAnswerText) return;

  function loadSimulation(key) {
    const data = SIMULATION_DATA[key] || SIMULATION_DATA.orthotics;
    
    queryInput.value = data.query;
    if (simEngineBadge) simEngineBadge.textContent = data.engine;
    
    simAnswerText.innerHTML = '<span class="inline-flex items-center gap-2 text-slate-400 text-xs"><svg class="animate-spin h-3.5 w-3.5 text-brand-blue" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> Scanning AI knowledge graphs...</span>';
    
    setTimeout(() => {
      const formatted = data.answer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>');
      simAnswerText.innerHTML = formatted;

      if (simSourcesList) {
        simSourcesList.innerHTML = data.sources.map(s => `
          <div class="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#e5e7eb] hover:border-slate-300 transition-colors">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
              <span class="text-xs font-medium text-slate-800">${s.title}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-100 font-semibold">${s.rank}</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">${s.tag}</span>
            </div>
          </div>
        `).join('');
      }

      if (simAiScore) simAiScore.textContent = data.metrics.aiScore;
      if (simCitations) simCitations.textContent = data.metrics.citations;
    }, 350);
  }

  queryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      queryPills.forEach(p => {
        p.classList.remove('bg-brand-blue', 'text-white');
        p.classList.add('bg-white', 'text-slate-600');
      });
      pill.classList.remove('bg-white', 'text-slate-600');
      pill.classList.add('bg-brand-blue', 'text-white');
      
      const key = pill.getAttribute('data-sim-key');
      loadSimulation(key);
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      loadSimulation('orthotics');
    });
  }

  loadSimulation('orthotics');
}

/* ==========================================================================
   5. INTERACTIVE AI SEARCH GROWTH OPPORTUNITY SCANNER
   ========================================================================= */
function initOpportunityScanner() {
  const steps = document.querySelectorAll('.scanner-step');
  const nextBtns = document.querySelectorAll('.scanner-next-btn');
  const resultBox = document.getElementById('scannerResult');
  const formBox = document.getElementById('scannerFormBox');
  const calcScore = document.getElementById('calcScore');
  const calcAuditSummary = document.getElementById('calcAuditSummary');

  if (!steps.length) return;

  let currentStep = 1;
  const userAnswers = {
    industry: 'Healthcare & Medical Clinic',
    currentRankings: 'Some top 10 positions',
    aiStatus: 'Not sure if we appear in ChatGPT',
  };

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepContainer = btn.closest('.scanner-step');
      const stepNum = parseInt(stepContainer.getAttribute('data-step'));
      
      const activeOption = stepContainer.querySelector('input[type="radio"]:checked');
      if (activeOption) {
        const key = activeOption.name;
        userAnswers[key] = activeOption.value;
      }

      if (stepNum < 3) {
        stepContainer.classList.add('hidden');
        currentStep = stepNum + 1;
        const nextContainer = document.querySelector(`.scanner-step[data-step="${currentStep}"]`);
        if (nextContainer) nextContainer.classList.remove('hidden');
      } else {
        stepContainer.classList.add('hidden');
        if (formBox) formBox.classList.add('hidden');
        if (resultBox) {
          resultBox.classList.remove('hidden');
          if (calcScore) {
            animateScore(84);
          }
          if (calcAuditSummary) {
            calcAuditSummary.innerHTML = `
              <p class="text-slate-700 text-xs leading-relaxed mb-2.5">
                Based on your industry (<strong>${userAnswers.industry}</strong>), your clinic or firm has an estimated <strong>68% untapped citation share</strong> across ChatGPT Search and Google AI Overviews.
              </p>
              <ul class="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                <li>Estimated high-value organic opportunity: <strong>+35 to +70 enquiries/month</strong></li>
                <li>Key fix required: Schema Entity Graph injection & E-E-A-T doctor authority link</li>
                <li>Projected turnaround to capture AI citations: <strong>45 – 90 days</strong></li>
              </ul>
            `;
          }
        }
      }
    });
  });

  function animateScore(target) {
    let count = 0;
    const interval = setInterval(() => {
      count += 2;
      if (calcScore) calcScore.textContent = count + '%';
      if (count >= target) {
        clearInterval(interval);
        if (calcScore) calcScore.textContent = target + '%';
      }
    }, 15);
  }
}

/* ==========================================================================
   6. "WALL OF LOVE" FILTERABLE MASONRY TESTIMONIALS
   ========================================================================= */
function initWallOfLoveFilter() {
  const filterBtns = document.querySelectorAll('.wall-filter-btn');
  const items = document.querySelectorAll('.wall-masonry-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-blue', 'text-white');
        b.classList.add('bg-white', 'text-slate-600');
      });
      btn.classList.add('bg-brand-blue', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-600');

      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE FAQ ACCORDION
   ========================================================================= */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.accordion-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      if (isOpen) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. MODAL POPUPS (DISCOVERY CALL & AI GUIDE)
   ========================================================================= */
function initModals() {
  const discoveryModal = document.getElementById('discoveryModal');
  const discoveryTriggers = document.querySelectorAll('.open-discovery-modal');
  const discoveryCloses = document.querySelectorAll('.close-discovery-modal');
  const discoveryForm = document.getElementById('discoveryForm');
  const discoverySuccess = document.getElementById('discoverySuccess');

  const guideModal = document.getElementById('guideModal');
  const guideTriggers = document.querySelectorAll('.open-guide-modal');
  const guideCloses = document.querySelectorAll('.close-guide-modal');
  const guideForm = document.getElementById('guideForm');
  const guideSuccess = document.getElementById('guideSuccess');

  discoveryTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (discoveryModal) discoveryModal.classList.add('open');
    });
  });

  discoveryCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      if (discoveryModal) discoveryModal.classList.remove('open');
    });
  });

  guideTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (guideModal) guideModal.classList.add('open');
    });
  });

  guideCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      if (guideModal) guideModal.classList.remove('open');
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (discoveryModal) discoveryModal.classList.remove('open');
      if (guideModal) guideModal.classList.remove('open');
    }
  });

  if (discoveryForm && discoverySuccess) {
    discoveryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = discoveryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
      }
      setTimeout(() => {
        discoveryForm.classList.add('hidden');
        discoverySuccess.classList.remove('hidden');
      }, 500);
    });
  }

  if (guideForm && guideSuccess) {
    guideForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = guideForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
      }
      setTimeout(() => {
        guideForm.classList.add('hidden');
        guideSuccess.classList.remove('hidden');
      }, 500);
    });
  }
}

/* ==========================================================================
   0. PREMIUM MINIMALIST PRELOADER CONTROLLER
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloaderProgressBar');
  const counter = document.getElementById('preloaderCounter');
  const statusText = document.getElementById('preloaderStatusText');

  if (!preloader) return;

  const statuses = [
    { progress: 25, text: "Scanning AI Knowledge Graphs..." },
    { progress: 60, text: "Calibrating Search Consensus..." },
    { progress: 90, text: "Structuring Entity Matrices..." },
    { progress: 100, text: "Welcome to Figment" }
  ];

  let currentProgress = 0;
  let statusIndex = 0;

  const interval = setInterval(() => {
    currentProgress += Math.floor(Math.random() * 8) + 4;
    
    if (currentProgress > 100) currentProgress = 100;

    if (progressBar) progressBar.style.width = currentProgress + '%';
    if (counter) counter.textContent = currentProgress + '%';

    if (statusIndex < statuses.length && currentProgress >= statuses[statusIndex].progress) {
      if (statusText) statusText.textContent = statuses[statusIndex].text;
      statusIndex++;
    }

    if (currentProgress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('preloader-hidden');
      }, 250);
    }
  }, 35);
}
