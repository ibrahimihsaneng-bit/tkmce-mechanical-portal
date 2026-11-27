/**
 * MECH TKMCE 3.0 — NEXT-GENERATION ENGINEERING LEARNING OPERATING SYSTEM
 * Complete application controller & router integrating:
 * - Academic OS: S1–S8 Catalog, Digital Textbook with 7 Reading Modes, PYQs, Formulas
 * - Focus OS: Focus Studio, Circular Dial Timer, Deep Focus Shield, Paper Study Mode, Distraction Parking Lot
 * - Exam OS: Flashcards with 3D Flip, Spaced Repetition (SRS), Active Recall, University Exam Patterns
 * - Engineering OS: Verified Physics Simulations, 6 Real-World Calculators, GATE Roadmaps
 * - Personal Workspace: Intelligent Dashboard, Study Planner, Bookmarks, Local Progress Tracking
 */

(function() {
  'use strict';

  // Global Application State (Persisted in localStorage)
  const AppState = {
    // Unified Focus Studio State
    focusTab: 'overview', // overview, protection, schedule, history, reader
    focusPreset: 'deep', // quick, pomodoro, deep, marathon, paper, custom
    focusStudyMinutes: 50,
    focusBreakMinutes: 10,
    focusIntensity: localStorage.getItem('mech_focus_intensity') || 'gentle', // gentle, deep, strict
    focusGoal: localStorage.getItem('mech_focus_goal') || 'Understand conduction and solve 3 problems',
    focusRules: JSON.parse(localStorage.getItem('mech_focus_rules') || '{"shorts": true, "allowlist": true, "budget": 30, "phoneAway": true}'),
    focusSchedules: JSON.parse(localStorage.getItem('mech_focus_schedules') || '[{"name": "Morning revision", "days": "Mon–Fri", "time": "06:00–06:25", "subject": "24MET401", "type": "Quick revision"}, {"name": "Evening deep focus", "days": "Mon–Fri", "time": "18:00–18:50", "subject": "24MET501", "type": "Heat Transfer"}, {"name": "Weekend practice", "days": "Sat", "time": "09:00–10:00", "subject": "24MET401", "type": "Numerical practice"}]'),
    
    // Resource Manager State
    resourceStep: 1, // 1: destination, 2: files, 3: review, 4: publish
    resourceData: {
      scheme: 'Autonomous 2024',
      semester: 'S4',
      subject: '24MET401',
      module: 'Module 1',
      topic: 'Entire module',
      type: 'Detailed notes',
      title: 'Mechanics of Deformable Solids — Module 1',
      author: 'TKMCE Mechanical Faculty',
      license: 'Verified institutional faculty',
      files: []
    },
    publishedResources: JSON.parse(localStorage.getItem('mech_published_resources') || '[]'),

    currentView: 'dashboard',
    selectedSemester: 'S4',
    selectedSubject: '24MET401',
    selectedModule: 'Module 1',
    readingMode: 'textbook', // textbook, detailed, short, exam, formulas, numerical, questions
    fontSize: parseInt(localStorage.getItem('mech_font_size') || '16'),
    theme: localStorage.getItem('mech_theme') || 'warm', // warm, light, dark
    bookmarks: JSON.parse(localStorage.getItem('mech_bookmarks') || '[]'),
    tasks: JSON.parse(localStorage.getItem('mech_tasks') || '[]'),
    parkingLot: JSON.parse(localStorage.getItem('mech_parking_lot') || '[]'),
    completedLessons: JSON.parse(localStorage.getItem('mech_completed_lessons') || '[]'),
    lastOpened: JSON.parse(localStorage.getItem('mech_last_opened') || 'null'),
    studyHistory: JSON.parse(localStorage.getItem('mech_study_history') || '[]'),
    // Focus Studio State
    focusPreset: 'pomodoro',
    focusStudyMinutes: 25,
    focusBreakMinutes: 5,
    focusShield: 'gentle',
    focusPhase: 'setup', // setup, focus, break, reflection
    timerTargetTime: null,
    timerRemainingMs: 25 * 60 * 1000,
    timerRunning: false,
    timerInterval: null,
    interruptionCount: 0,
    wakeLock: null,
    // Exam OS / Flashcards State
    flashcardIndex: 0,
    flashcardFlipped: false,
    flashcardFilter: 'All',
    examTab: 'flashcards', // flashcards, pattern, numerical, srs
    srsStats: JSON.parse(localStorage.getItem('mech_srs_stats') || '{"mastered": 0, "reviewDue": 0}'),
    // Engineering Lab State
    labTab: 'sims', // sims, calcs, gate
    activeSim: 'mohr'
  };

  // Cached View Containers
  let views = {};

  // Application Entry Point
  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    cacheDOMElements();
    setupEventListeners();
    setupUniversalSearch();
    setupKeyboardShortcuts();
    renderParkingLotList();
    
    // Hash Routing
    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    // Trigger KaTeX rendering on initial load
    triggerKaTeX();
  });

  // KaTeX Auto-Renderer Trigger
  function triggerKaTeX(container) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(container || document.body, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\(', right: '\)', display: false},
            {left: '\[', right: '\]', display: true}
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn('KaTeX render warning:', e);
      }
    }
  }

  // 3-Theme Management (Warm Paper [default / screenshot], Light Academic, Dark Reading)
  function initTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    updateThemeIcon();
  }

  function toggleTheme() {
    const themeCycle = {
      'warm': 'light',
      'light': 'dark',
      'dark': 'warm'
    };
    AppState.theme = themeCycle[AppState.theme] || 'warm';
    document.documentElement.setAttribute('data-theme', AppState.theme);
    localStorage.setItem('mech_theme', AppState.theme);
    updateThemeIcon();
    if (AppState.currentView === 'lab' && AppState.labTab === 'sims') {
      renderActiveSimulation();
    }
  }
  window.toggleTheme = toggleTheme;

  function updateThemeIcon() {
    const iconBtn = document.getElementById('theme-toggle-btn');
    if (!iconBtn) return;
    if (AppState.theme === 'warm') {
      iconBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`;
      iconBtn.setAttribute('title', 'Theme: Warm Paper (Click for Light Academic)');
    } else if (AppState.theme === 'light') {
      iconBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      iconBtn.setAttribute('title', 'Theme: Light Academic (Click for Dark Mode)');
    } else {
      iconBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      iconBtn.setAttribute('title', 'Theme: Dark Reading (Click for Warm Paper)');
    }
  }

  // Cache views
  function cacheDOMElements() {
    const viewIds = ['dashboard', 'semesters', 'notes', 'pyqs', 'formulas', 'exams', 'planner', 'gate', 'lab', 'bookmarks', 'downloads', 'settings', 'focus', 'resources', 'intervention'];
    viewIds.forEach(id => {
      views[id] = document.getElementById('view-' + id);
    });
  }

  // Event Listeners
  function setupEventListeners() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const collapseBtn = document.getElementById('sidebar-collapse-btn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-collapsed');
      });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        document.body.classList.toggle('mobile-sidebar-open');
      });
    }

    document.addEventListener('click', (e) => {
      if (document.body.classList.contains('mobile-sidebar-open') && 
          !e.target.closest('.app-sidebar') && 
          !e.target.closest('#mobile-menu-btn')) {
        document.body.classList.remove('mobile-sidebar-open');
      }
    });

    // Deep Focus Visibility Detection (Tracks interruptions non-punitively)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && AppState.currentView === 'focus' && AppState.timerRunning) {
        AppState.interruptionCount++;
        const note = document.getElementById('focus-interruption-stat');
        if (note) note.textContent = AppState.interruptionCount;
      }
    });
  }

  // Router
  function handleRoute() {
    let hash = window.location.hash.replace('#', '') || 'dashboard';
    const parts = hash.split('/');
    const viewName = parts[0];

    if (!views[viewName]) {
      hash = 'dashboard';
    }

    AppState.currentView = viewName;
    document.body.classList.remove('mobile-sidebar-open');

    // Update Nav Highlights
    document.querySelectorAll('.nav-item').forEach(el => {
      const href = el.getAttribute('href');
      if (href === '#' + viewName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    document.querySelectorAll('.mobile-nav-btn').forEach(el => {
      const href = el.getAttribute('href');
      if (href === '#' + viewName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Toggle View Sections
    Object.keys(views).forEach(id => {
      if (views[id]) {
        if (id === viewName) {
          views[id].classList.add('active');
        } else {
          views[id].classList.remove('active');
        }
      }
    });

    updateBreadcrumbs(viewName, parts);
    renderView(viewName, parts);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(triggerKaTeX, 60);
  }

  function updateBreadcrumbs(viewName, parts) {
    const bcContainer = document.getElementById('app-breadcrumbs');
    if (!bcContainer) return;

    const names = {
      dashboard: 'Dashboard',
      semesters: 'Semesters & notes',
      notes: 'Digital Textbook',
      focus: 'Focus Studio',
      resources: 'Resource Manager',
      intervention: 'Focus Intervention',
      pyqs: 'PYQ Vault',
      formulas: 'Formula Library',
      exams: 'Practice Centre',
      planner: 'Study Planner',
      gate: 'GATE Preparation',
      lab: 'Interactive Lab & Calcs',
      bookmarks: 'Saved resources',
      downloads: 'Offline Downloads',
      settings: 'Settings'
    };

    let html = `<a href="#dashboard" class="breadcrumb-item">MECH TKMCE</a>`;
    if (viewName !== 'dashboard') {
      html += `<span class="breadcrumb-separator">/</span>`;
      html += `<a href="#${viewName}" class="breadcrumb-item">${names[viewName] || viewName}</a>`;
      if (parts.length > 1) {
        html += `<span class="breadcrumb-separator">/</span>`;
        html += `<span class="breadcrumb-current">${parts[1]}</span>`;
      }
    }
    bcContainer.innerHTML = html;
  }

  // View Dispatcher
  function renderView(viewName, parts) {
    switch (viewName) {
      case 'dashboard':
        renderDashboard();
        break;
      case 'semesters':
        if (parts[1]) AppState.selectedSemester = parts[1];
        renderSemesters();
        break;
      case 'notes':
        if (parts[1]) AppState.selectedSubject = parts[1];
        if (parts[2]) AppState.selectedModule = decodeURIComponent(parts[2]);
        renderStudyNotes();
        break;
      case 'focus':
        if (parts[1]) {
          if (parts[1] === 'reader') {
            AppState.focusPhase = 'focus';
            AppState.focusTab = 'reader';
          } else {
            AppState.focusTab = parts[1];
          }
        }
        renderFocusStudio();
        break;
      case 'resources':
        if (parts[1]) {
          if (parts[1] === 'review') AppState.resourceStep = 3;
          else if (parts[1] === 'upload') AppState.resourceStep = 2;
          else if (parts[1] === 'manage') AppState.resourceStep = 4;
          else AppState.resourceStep = 1;
        }
        renderResourceManager();
        break;
      case 'intervention':
        renderInterventionScreen();
        break;
      case 'pyqs':
        renderPYQVault();
        break;
      case 'formulas':
        renderFormulaLibrary();
        break;
      case 'exams':
        renderExamCentre();
        break;
      case 'planner':
        renderStudyPlanner();
        break;
      case 'gate':
        renderGATEPreparation();
        break;
      case 'lab':
        renderInteractiveLab();
        break;
      case 'bookmarks':
        renderBookmarks();
        break;
      case 'downloads':
        renderDownloads();
        break;
      case 'settings':
        renderSettings();
        break;
    }
  }

  // ===================================================================
  // 1. DASHBOARD (Matches User Reference Screenshot With 100% Precision)
  // ===================================================================
  function renderDashboard() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;

    const completedCount = AppState.completedLessons.length;
    const openTasksCount = AppState.tasks.filter(t => !t.completed).length;
    const lastOpened = AppState.lastOpened;

    container.innerHTML = `
      <!-- FIG. 01 Precision Engineering Hero Banner -->
      <div class="hero-banner-mech3">
        <svg style="position:absolute; right:0; top:0; width:100%; height:100%; pointer-events:none; opacity:0.16;" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="engGrid3" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#B5D8CB" stroke-width="0.7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#engGrid3)"/>
        </svg>

        <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:24px;">
          <!-- Left Pitch & Call to Actions -->
          <div style="max-width:520px;">
            <div class="hero-tag-badge">ENGINEERING LEARNING / 01</div>
            <h1 style="font-family:var(--font-heading); font-size:2.5rem; font-weight:700; line-height:1.15; margin:0 0 14px 0; letter-spacing:-0.03em; color:#FFFFFF;">
              Less distraction.<br>More understanding.
            </h1>
            <p style="font-size:1.02rem; line-height:1.55; color:#D4EDE2; margin-bottom:26px;">
              A quiet space for your engineering journey. Find a lesson, set one goal and make meaningful progress.
            </p>
            <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <a href="#focus" class="btn" style="background:#B5D8CB; color:#142D28; font-weight:600; padding:10px 22px; border-radius:9999px; border:none; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
                Start a focus session &rarr;
              </a>
              <a href="#semesters" class="btn" style="background:transparent; color:#FFFFFF; border:1px solid rgba(255,255,255,0.35); font-weight:500; padding:10px 22px; border-radius:9999px; text-decoration:none;">
                Explore subjects
              </a>
            </div>
          </div>

          <!-- Right Engineering Precision Vector Graphic (FIG. 01) -->
          <div style="display:flex; flex-direction:column; align-items:flex-end; justify-content:center; min-width:210px;">
            <div style="font-size:0.68rem; font-family:var(--font-mono); letter-spacing:0.12em; color:#8DB8A7; margin-bottom:4px;">
              FIG. 01 / PRECISION
            </div>
            <svg width="210" height="190" viewBox="0 0 210 190" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="10" y1="95" x2="200" y2="95" stroke="#25544B" stroke-width="1" stroke-dasharray="2 3"/>
              <line x1="105" y1="5" x2="105" y2="185" stroke="#25544B" stroke-width="1" stroke-dasharray="2 3"/>
              <circle cx="105" cy="95" r="80" stroke="#25544B" stroke-width="1" stroke-dasharray="4 4"/>
              
              <!-- Outer Gear Profile -->
              <g stroke="#B5D8CB" stroke-width="1.8" fill="none">
                <circle cx="105" cy="95" r="66"/>
                <path d="M99 29 h12 v5 h-12 z" />
                <path d="M99 156 h12 v5 h-12 z" />
                <path d="M39 89 v12 h5 v-12 z" />
                <path d="M166 89 v12 h5 v-12 z" />
                <path d="M57 52 l8 8 l-4 4 l-8 -8 z" />
                <path d="M145 140 l8 8 l-4 4 l-8 -8 z" />
                <path d="M148 56 l-8 8 l4 4 l8 -8 z" />
                <path d="M60 144 l-8 8 l4 4 l8 -8 z" />
              </g>

              <circle cx="105" cy="95" r="46" stroke="#B5D8CB" stroke-width="1.4"/>
              <circle cx="105" cy="95" r="30" stroke="#B5D8CB" stroke-width="2"/>
              
              <!-- Sector Wedge Highlight -->
              <path d="M105 95 L105 65 A30 30 0 0 1 131 80 Z" fill="#B5D8CB" opacity="0.85"/>
              <path d="M105 95 L131 80 A30 30 0 0 1 127 116 Z" fill="#B5D8CB" opacity="0.3"/>
              
              <!-- Center Bore -->
              <circle cx="105" cy="95" r="13" fill="#163B36" stroke="#B5D8CB" stroke-width="2"/>
              <circle cx="105" cy="95" r="4" fill="#B5D8CB"/>
              
              <text x="175" y="178" fill="#8DB8A7" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="0.1em">MECH / 3.0</text>
            </svg>
          </div>
        </div>
      </div>

      <!-- Your Workspace: Choose Next Useful Action -->
      <div style="margin-bottom:var(--space-8);">
        <div style="margin-bottom:var(--space-3);">
          <h2 class="h3" style="font-size:1.15rem; margin-bottom:2px;">Your workspace</h2>
          <p class="text-secondary" style="font-size:0.86rem;">Choose the next useful action.</p>
        </div>

        <div class="grid-cols-4" style="gap:14px;">
          <!-- 1. Study Notes -->
          <a href="#notes/24MET401" class="workspace-action-card">
            <div class="action-icon-circle">📖</div>
            <div>
              <div style="font-weight:700; font-size:0.95rem;">Study notes</div>
              <div class="text-secondary" style="font-size:0.8rem;">Browse modules</div>
            </div>
          </a>

          <!-- 2. Focus Studio -->
          <a href="#focus" class="workspace-action-card">
            <div class="action-icon-circle">🎯</div>
            <div>
              <div style="font-weight:700; font-size:0.95rem;">Focus Studio</div>
              <div class="text-secondary" style="font-size:0.8rem;">One task at a time</div>
            </div>
          </a>

          <!-- 3. Formulas -->
          <a href="#formulas" class="workspace-action-card">
            <div class="action-icon-circle">∑</div>
            <div>
              <div style="font-weight:700; font-size:0.95rem;">Formulas</div>
              <div class="text-secondary" style="font-size:0.8rem;">Quick reference</div>
            </div>
          </a>

          <!-- 4. Practice -->
          <a href="#exams" class="workspace-action-card">
            <div class="action-icon-circle">📝</div>
            <div>
              <div style="font-weight:700; font-size:0.95rem;">Practice</div>
              <div class="text-secondary" style="font-size:0.8rem;">Recall and solve</div>
            </div>
          </a>
        </div>
      </div>

      <!-- Explore Semesters Section (S1 to S8 Cards) -->
      <div style="margin-bottom:var(--space-8);">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:var(--space-3);">
          <div>
            <h2 class="h3" style="font-size:1.15rem; margin-bottom:2px;">Explore semesters</h2>
            <p class="text-secondary" style="font-size:0.86rem;">TKMCE Autonomous 2024 Scheme Curricula (S1 to S8)</p>
          </div>
          <a href="#semesters" style="font-size:0.86rem; font-weight:600; color:var(--color-academic-blue); text-decoration:none;">
            All subjects &rarr;
          </a>
        </div>

        <div style="display:grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap:10px;" id="dashboard-sem-grid">
          <a href="#semesters/S1" class="semester-pill-card">
            <div class="semester-pill-title">S1</div>
            <div class="semester-pill-sub">5 verified notes</div>
          </a>
          <a href="#semesters/S2" class="semester-pill-card">
            <div class="semester-pill-title">S2</div>
            <div class="semester-pill-sub">3 verified notes</div>
          </a>
          <a href="#semesters/S3" class="semester-pill-card">
            <div class="semester-pill-title">S3</div>
            <div class="semester-pill-sub">5 verified notes</div>
          </a>
          <a href="#semesters/S4" class="semester-pill-card active" style="border-color:var(--color-academic-blue); background:var(--color-surface-elevated);">
            <div class="semester-pill-title">S4</div>
            <div class="semester-pill-sub" style="color:var(--color-academic-blue); font-weight:600;">7 core notes</div>
          </a>
          <a href="#semesters/S5" class="semester-pill-card">
            <div class="semester-pill-title">S5</div>
            <div class="semester-pill-sub">7 core notes</div>
          </a>
          <a href="#semesters/S6" class="semester-pill-card">
            <div class="semester-pill-title">S6</div>
            <div class="semester-pill-sub">3 verified notes</div>
          </a>
          <a href="#semesters/S7" class="semester-pill-card">
            <div class="semester-pill-title">S7</div>
            <div class="semester-pill-sub">2 verified notes</div>
          </a>
          <a href="#semesters/S8" class="semester-pill-card">
            <div class="semester-pill-title">S8</div>
            <div class="semester-pill-sub">2 verified notes</div>
          </a>
        </div>
      </div>

      <!-- Continue Learning: Dynamic Local State -->
      <div style="margin-bottom:var(--space-8);">
        <div style="margin-bottom:var(--space-3);">
          <h2 class="h3" style="font-size:1.15rem; margin-bottom:2px;">Continue learning</h2>
          <p class="text-secondary" style="font-size:0.86rem;">Your progress stays on this device.</p>
        </div>

        <div class="grid-cols-2" style="gap:14px;">
          <!-- Last Opened -->
          <div class="card" style="padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:0.72rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--color-text-tertiary); margin-bottom:8px;">
                LAST OPENED
              </div>
              ${lastOpened ? `
                <h3 class="h4" style="margin-bottom:4px;">${lastOpened.subject} • ${lastOpened.module}</h3>
                <p class="text-secondary" style="font-size:0.86rem; margin-bottom:14px;">${lastOpened.title || 'Resume where you left off.'}</p>
                <a href="#notes/${lastOpened.subject}/${encodeURIComponent(lastOpened.module)}" style="font-size:0.86rem; font-weight:600; color:var(--color-academic-blue); text-decoration:none;">Resume lesson &rarr;</a>
              ` : `
                <h3 class="h4" style="margin-bottom:4px;">Start with a single topic.</h3>
                <p class="text-secondary" style="font-size:0.86rem; margin-bottom:14px;">Your last opened lesson will appear here.</p>
                <a href="#notes/24MET401" style="font-size:0.86rem; font-weight:600; color:var(--color-academic-blue); text-decoration:none;">Browse lessons &rarr;</a>
              `}
            </div>
          </div>

          <!-- Local Progress -->
          <div class="card" style="padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:0.72rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--color-text-tertiary); margin-bottom:8px;">
                LOCAL PROGRESS
              </div>
              <div style="font-family:var(--font-heading); font-size:2rem; font-weight:700; color:var(--color-text-primary); line-height:1; margin-bottom:6px;">
                ${completedCount}/34
              </div>
              <p class="text-secondary" style="font-size:0.86rem; margin-bottom:14px;">
                Digital textbook courses tracked • ${openTasksCount} open study tasks
              </p>
              <a href="#planner" style="font-size:0.86rem; font-weight:600; color:var(--color-academic-blue); text-decoration:none;">Plan your next session &rarr;</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Verified TKMCE Autonomous Scheme Notice -->
      <div style="background:var(--color-academic-blue-subtle); border:1px solid rgba(22,89,77,0.18); border-radius:10px; padding:12px 18px; margin-bottom:var(--space-8); display:flex; align-items:center; gap:12px;">
        <span style="font-size:1.2rem;">🏛️</span>
        <div style="font-size:0.85rem; color:var(--color-text-secondary); line-height:1.5;">
          <strong>TKMCE Autonomous 2024 Scheme:</strong> Official institutional curriculum, S1–S8 verified digital textbook notes, KaTeX mathematical derivations, past question papers, and authentic engineering visual references. 100% free and open for all students.
        </div>
      </div>

      <!-- Minimal Student Footer -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--color-border); padding-top:16px; font-size:0.78rem; color:var(--color-text-tertiary);">
        <div>MECH TKMCE 3.0</div>
        <div>TKMCE Mechanical Engineering Learning Portal • Autonomous 2024 Scheme</div>
      </div>
    `;
  }

  // ===================================================================
  // 2. FOCUS OS — FOCUS STUDIO (One Screen. One Subject. One Goal.)
  // ===================================================================
  function renderFocusStudio() {
    const container = document.getElementById('focus-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const notesData = data.notes || {};
    const subjects = Object.keys(notesData);

    if (AppState.focusPhase === 'setup') {
      container.innerHTML = `
        <div style="max-width:760px; margin:0 auto; padding-top:var(--space-4);">
          <div style="margin-bottom:var(--space-6); text-align:center;">
            <div style="display:inline-block; font-size:0.75rem; font-weight:700; letter-spacing:0.1em; color:var(--color-academic-blue); text-transform:uppercase; margin-bottom:6px;">
              THE STUDY WORKSPACE / 01
            </div>
            <h1 class="h1" style="font-size:2.2rem; margin-bottom:8px;">Make room for <em>focus.</em></h1>
            <p class="text-secondary" style="font-size:0.95rem;">One task, one session. Everything else can wait.</p>
          </div>

          <div class="grid-cols-2" style="gap:20px;">
            <!-- 01 / PLAN -->
            <div class="card" style="padding:24px;">
              <div style="font-size:0.72rem; font-weight:700; letter-spacing:0.08em; color:var(--color-text-tertiary); margin-bottom:8px;">
                01 / PLAN
              </div>
              <h2 class="h3" style="margin-bottom:16px;">What will you study?</h2>

              <div style="margin-bottom:14px;">
                <label style="display:block; font-size:0.82rem; font-weight:600; margin-bottom:4px;">Subject</label>
                <select id="focus-subj-select" style="width:100%; padding:9px 12px; border:1px solid var(--color-border); border-radius:var(--radius-md); background:var(--color-surface-elevated); color:var(--color-text-primary); font-size:0.9rem;" onchange="updateFocusModules(this.value)">
                  ${subjects.map(c => `
                    <option value="${c}" ${c === AppState.selectedSubject ? 'selected' : ''}>${c} • ${notesData[c].name || c}</option>
                  `).join('')}
                </select>
              </div>

              <div style="margin-bottom:14px;">
                <label style="display:block; font-size:0.82rem; font-weight:600; margin-bottom:4px;">Module / Chapter</label>
                <select id="focus-mod-select" style="width:100%; padding:9px 12px; border:1px solid var(--color-border); border-radius:var(--radius-md); background:var(--color-surface-elevated); color:var(--color-text-primary); font-size:0.9rem;">
                  <option value="Module 1">Module 1</option>
                  <option value="Module 2">Module 2</option>
                  <option value="Module 3">Module 3</option>
                  <option value="Module 4">Module 4</option>
                  <option value="Module 5">Module 5</option>
                </select>
              </div>

              <div style="margin-bottom:16px;">
                <label style="display:block; font-size:0.82rem; font-weight:600; margin-bottom:4px;">One Clear Goal</label>
                <input type="text" id="focus-goal-input" placeholder="e.g. Master Mohr's circle & solve 2 problems" style="width:100%; padding:9px 12px; border:1px solid var(--color-border); border-radius:var(--radius-md); background:var(--color-surface-elevated); color:var(--color-text-primary); font-size:0.9rem;">
              </div>

              <div style="margin-bottom:16px;">
                <label style="display:block; font-size:0.82rem; font-weight:600; margin-bottom:8px;">Session Type</label>
                <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px;">
                  <button type="button" class="btn btn-sm ${AppState.focusPreset === 'quick' ? 'btn-primary' : 'btn-secondary'}" onclick="setFocusPreset('quick', 10, 2)">Quick (10m)</button>
                  <button type="button" class="btn btn-sm ${AppState.focusPreset === 'pomodoro' ? 'btn-primary' : 'btn-secondary'}" onclick="setFocusPreset('pomodoro', 25, 5)">Pomodoro (25m)</button>
                  <button type="button" class="btn btn-sm ${AppState.focusPreset === 'deep' ? 'btn-primary' : 'btn-secondary'}" onclick="setFocusPreset('deep', 50, 10)">Deep (50m)</button>
                  <button type="button" class="btn btn-sm ${AppState.focusPreset === 'paper' ? 'btn-primary' : 'btn-secondary'}" onclick="setFocusPreset('paper', 45, 10)">📖 Paper (45m)</button>
                </div>
              </div>

              <button class="btn btn-primary" style="width:100%; padding:12px; font-weight:600; font-size:0.95rem;" onclick="launchFocusSession()">
                Start focus session &rarr;
              </button>
            </div>

            <!-- 02 / PREPARE -->
            <div class="card" style="padding:24px; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="font-size:0.72rem; font-weight:700; letter-spacing:0.08em; color:var(--color-text-tertiary); margin-bottom:8px;">
                  02 / PREPARE
                </div>
                <h2 class="h3" style="margin-bottom:12px;">Clear your space.</h2>
                <p class="text-secondary" style="font-size:0.86rem; margin-bottom:16px;">A few small choices before you begin.</p>

                <div style="display:flex; flex-direction:column; gap:10px; font-size:0.88rem;">
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                    <input type="checkbox" id="prep-phone" checked> Phone away / notifications silenced
                  </label>
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                    <input type="checkbox" id="prep-fullscreen"> Request fullscreen on start
                  </label>
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                    <input type="checkbox" id="prep-wakelock" checked> Keep study screen awake
                  </label>
                  <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                    <input type="checkbox" id="prep-remind" checked> Gentle reminder if leaving study tab
                  </label>
                </div>

                <div style="background:var(--color-surface-elevated); border-radius:var(--radius-md); padding:12px 14px; margin-top:20px; font-size:0.8rem; color:var(--color-text-secondary); line-height:1.5;">
                  <strong>💡 Tip:</strong> Press <kbd style="background:var(--color-surface); padding:2px 4px; border-radius:3px; border:1px solid var(--color-border);">Alt+P</kbd> at any time during study to park distracting thoughts in your Parking Lot without leaving this screen.
                </div>
              </div>

              <div style="margin-top:24px;">
                <div style="font-size:0.75rem; font-weight:700; color:var(--color-text-tertiary); text-transform:uppercase; margin-bottom:6px;">
                  Recent Sessions
                </div>
                <div style="font-size:0.82rem; color:var(--color-text-secondary);">
                  ${AppState.studyHistory.length > 0 ? 
                    AppState.studyHistory.slice(-3).map(h => `<div>• ${h.subject} (${h.minutes}m) — ${h.goal || 'Focused study'}</div>`).join('') :
                    'No sessions yet today. Your focused study time will be tracked locally.'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (AppState.focusPhase === 'focus' || AppState.focusPhase === 'break') {
      const isBreak = AppState.focusPhase === 'break';
      const subjData = notesData[AppState.selectedSubject] || {};
      const modData = (subjData.modules || {})[AppState.selectedModule] || {};

      container.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:20px;">
          <!-- Top Focus Bar -->
          <div class="card" style="padding:14px 20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; background:var(--color-surface-elevated);">
            <div>
              <span class="badge ${isBreak ? 'badge-teal' : 'badge-blue'}">${isBreak ? '☕ RECOVERY BREAK' : '🎯 DEEP FOCUS'}</span>
              <span style="font-weight:700; font-size:0.95rem; margin-left:8px;">${AppState.selectedSubject} • ${AppState.selectedModule}</span>
              <span class="text-secondary" style="font-size:0.86rem; margin-left:8px;">— "${AppState.focusGoal || 'Concentrated Study'}"</span>
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <button class="btn btn-secondary btn-sm" onclick="toggleParkingLot()">💡 Park Thought (Alt+P)</button>
              <button class="btn btn-secondary btn-sm" onclick="toggleFullscreen()">⛶ Fullscreen</button>
              <button class="btn btn-secondary btn-sm" onclick="endFocusSession()">End Session</button>
            </div>
          </div>

          <!-- Main Focus Split -->
          <div style="display:grid; grid-template-columns: 320px 1fr; gap:20px;">
            <!-- Left Dial Timer Panel -->
            <div class="card" style="padding:28px 20px; display:flex; flex-direction:column; align-items:center; text-align:center;">
              <div style="font-size:0.75rem; font-weight:700; letter-spacing:0.1em; color:var(--color-academic-blue); text-transform:uppercase; margin-bottom:12px;">
                ${isBreak ? 'REST & STRETCH' : 'SESSION RUNNING'}
              </div>

              <!-- Digital Clock Display -->
              <div id="focus-clock-display" style="font-family:var(--font-mono); font-size:3.6rem; font-weight:700; color:var(--color-text-primary); margin-bottom:8px; line-height:1;">
                ${formatTime(AppState.timerRemainingMs)}
              </div>
              <div class="text-secondary" style="font-size:0.82rem; margin-bottom:24px;">
                ${AppState.timerRunning ? 'Countdown active' : 'Timer paused'}
              </div>

              <!-- Control Buttons -->
              <div style="display:flex; gap:10px; margin-bottom:20px; width:100%; justify-content:center;">
                <button class="btn btn-primary" style="flex:1;" onclick="toggleFocusTimer()">
                  ${AppState.timerRunning ? 'Pause' : 'Resume'}
                </button>
                <button class="btn btn-secondary" onclick="extendFocusTimer(5)">+5 Min</button>
              </div>

              <!-- Stats & Capabilities -->
              <div style="border-top:1px solid var(--color-border); padding-top:16px; width:100%; font-size:0.8rem; color:var(--color-text-secondary); text-align:left;">
                <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                  <span>Tab hidden events:</span>
                  <strong id="focus-interruption-stat">${AppState.interruptionCount}</strong>
                </div>
                <div style="font-size:0.75rem; color:var(--color-text-tertiary); line-height:1.4;">
                  Visibility changes recorded gently. No browsing activity is tracked.
                </div>
              </div>
            </div>

            <!-- Right Reading Material or Paper Study Box -->
            <div class="card" style="padding:24px; max-height:75vh; overflow-y:auto;" id="focus-reading-panel">
              ${AppState.focusPreset === 'paper' ? `
                <div style="text-align:center; padding:48px 20px;">
                  <div style="font-size:3rem; margin-bottom:16px;">📖</div>
                  <h2 class="h2" style="margin-bottom:8px;">Paper Study Mode Active</h2>
                  <p class="text-secondary" style="font-size:0.95rem; max-width:480px; margin:0 auto 20px auto;">
                    Work directly from your physical textbook or handwritten notebook. The screen remains awake to keep time.
                  </p>
                  <div style="background:var(--color-surface-elevated); display:inline-block; padding:10px 20px; border-radius:var(--radius-md); font-size:0.88rem; font-weight:600; color:var(--color-academic-blue);">
                    Goal: ${AppState.focusGoal || 'Physical Book Revision'}
                  </div>
                </div>
              ` : `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid var(--color-border); padding-bottom:10px;">
                  <h3 class="h3" style="font-size:1.1rem;">${modData.title || AppState.selectedModule}</h3>
                  <div style="display:flex; gap:6px;">
                    <button class="icon-action-btn" onclick="adjustFontSize(-1)">A-</button>
                    <button class="icon-action-btn" onclick="adjustFontSize(1)">A+</button>
                  </div>
                </div>

                <div class="textbook-reader-content" style="font-size:${AppState.fontSize}px; line-height:1.7;">
                  ${modData.textbook_html || modData.detailed_notes || '<p>Study material loading...</p>'}
                </div>
              `}
            </div>
          </div>
        </div>
      `;
    }
  }

  window.setFocusPreset = function(preset, studyMins, breakMins) {
    AppState.focusPreset = preset;
    AppState.focusStudyMinutes = studyMins;
    AppState.focusBreakMinutes = breakMins;
    renderFocusStudio();
  };

  window.updateFocusModules = function(code) {
    AppState.selectedSubject = code;
    renderFocusStudio();
  };

  window.launchFocusSession = function() {
    const goalInput = document.getElementById('focus-goal-input');
    const subjSelect = document.getElementById('focus-subj-select');
    const modSelect = document.getElementById('focus-mod-select');
    const fsCheck = document.getElementById('prep-fullscreen');
    const wakeCheck = document.getElementById('prep-wakelock');

    if (goalInput && goalInput.value.trim()) {
      AppState.focusGoal = goalInput.value.trim();
    } else {
      AppState.focusGoal = 'Study ' + (modSelect ? modSelect.value : 'Module 1');
    }
    if (subjSelect) AppState.selectedSubject = subjSelect.value;
    if (modSelect) AppState.selectedModule = modSelect.value;

    AppState.focusPhase = 'focus';
    AppState.timerRemainingMs = AppState.focusStudyMinutes * 60 * 1000;
    AppState.timerTargetTime = Date.now() + AppState.timerRemainingMs;
    AppState.timerRunning = true;
    AppState.interruptionCount = 0;

    // Request fullscreen if checked
    if (fsCheck && fsCheck.checked) {
      toggleFullscreen(true);
    }

    // Request wake lock if checked
    if (wakeCheck && wakeCheck.checked && 'wakeLock' in navigator) {
      navigator.wakeLock.request('screen').then(lock => {
        AppState.wakeLock = lock;
      }).catch(() => {});
    }

    startFocusTimerEngine();
    renderFocusStudio();
  };

  function startFocusTimerEngine() {
    clearInterval(AppState.timerInterval);
    AppState.timerInterval = setInterval(() => {
      if (!AppState.timerRunning) return;
      const now = Date.now();
      AppState.timerRemainingMs = Math.max(0, AppState.timerTargetTime - now);
      
      const display = document.getElementById('focus-clock-display');
      if (display) {
        display.textContent = formatTime(AppState.timerRemainingMs);
      }

      if (AppState.timerRemainingMs <= 0) {
        clearInterval(AppState.timerInterval);
        handleTimerCompletion();
      }
    }, 500);
  }

  window.toggleFocusTimer = function() {
    if (AppState.timerRunning) {
      AppState.timerRunning = false;
      clearInterval(AppState.timerInterval);
    } else {
      AppState.timerRunning = true;
      AppState.timerTargetTime = Date.now() + AppState.timerRemainingMs;
      startFocusTimerEngine();
    }
    renderFocusStudio();
  };

  window.extendFocusTimer = function(minutes) {
    AppState.timerRemainingMs += minutes * 60 * 1000;
    AppState.timerTargetTime += minutes * 60 * 1000;
    const display = document.getElementById('focus-clock-display');
    if (display) display.textContent = formatTime(AppState.timerRemainingMs);
  };

  window.endFocusSession = function() {
    clearInterval(AppState.timerInterval);
    if (AppState.wakeLock) {
      AppState.wakeLock.release().catch(() => {});
      AppState.wakeLock = null;
    }
    // Record history
    AppState.studyHistory.push({
      date: new Date().toLocaleDateString(),
      subject: AppState.selectedSubject,
      module: AppState.selectedModule,
      minutes: AppState.focusStudyMinutes,
      goal: AppState.focusGoal
    });
    localStorage.setItem('mech_study_history', JSON.stringify(AppState.studyHistory));
    
    AppState.focusPhase = 'setup';
    location.hash = '#dashboard';
  };

  function handleTimerCompletion() {
    // Beep chime using Web Audio
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}

    alert(`🎉 Great work! Focus session for ${AppState.selectedSubject} completed.`);
    if (AppState.focusPhase === 'focus') {
      AppState.focusPhase = 'break';
      AppState.timerRemainingMs = AppState.focusBreakMinutes * 60 * 1000;
      AppState.timerTargetTime = Date.now() + AppState.timerRemainingMs;
      AppState.timerRunning = true;
      startFocusTimerEngine();
      renderFocusStudio();
    } else {
      endFocusSession();
    }
  }

  function formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function toggleFullscreen(force) {
    if (!document.fullscreenElement || force) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
  }

  // ===================================================================
  // 3. DISTRACTION PARKING LOT (Alt+P)
  // ===================================================================
  window.toggleParkingLot = function() {
    const drawer = document.getElementById('parkingLotDrawer');
    if (!drawer) return;
    if (drawer.style.display === 'none' || !drawer.style.display) {
      drawer.style.display = 'block';
      const input = document.getElementById('parkingLotInput');
      if (input) setTimeout(() => input.focus(), 60);
    } else {
      drawer.style.display = 'none';
    }
  };

  window.addParkedThought = function() {
    const input = document.getElementById('parkingLotInput');
    if (!input || !input.value.trim()) return;
    AppState.parkingLot.push({
      text: input.value.trim(),
      date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    localStorage.setItem('mech_parking_lot', JSON.stringify(AppState.parkingLot));
    input.value = '';
    renderParkingLotList();
  };

  window.deleteParkedThought = function(idx) {
    AppState.parkingLot.splice(idx, 1);
    localStorage.setItem('mech_parking_lot', JSON.stringify(AppState.parkingLot));
    renderParkingLotList();
  };

  window.moveThoughtToPlanner = function(idx) {
    const item = AppState.parkingLot[idx];
    if (!item) return;
    AppState.tasks.push({
      id: Date.now(),
      title: item.text,
      subject: AppState.selectedSubject || '24MET401',
      due: 'Today',
      priority: 'Medium',
      completed: false
    });
    localStorage.setItem('mech_tasks', JSON.stringify(AppState.tasks));
    deleteParkedThought(idx);
    alert('Thought scheduled into your Study Planner! 📅');
  };

  function renderParkingLotList() {
    const container = document.getElementById('parkingLotList');
    if (!container) return;
    if (AppState.parkingLot.length === 0) {
      container.innerHTML = '<div style="color:var(--color-text-tertiary); text-align:center; padding:12px 0;">No stray thoughts parked right now. Clear mind! 🌿</div>';
      return;
    }
    container.innerHTML = AppState.parkingLot.map((p, i) => `
      <div style="background:var(--color-surface-elevated); border:1px solid var(--color-border); border-radius:var(--radius-sm); padding:8px 10px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:500;">${p.text}</div>
          <div style="font-size:0.7rem; color:var(--color-text-tertiary);">${p.date}</div>
        </div>
        <div style="display:flex; gap:4px;">
          <button onclick="moveThoughtToPlanner(${i})" title="Schedule to Planner" style="background:none; border:none; cursor:pointer; font-size:0.9rem;">📅</button>
          <button onclick="deleteParkedThought(${i})" title="Delete" style="background:none; border:none; cursor:pointer; color:var(--color-text-tertiary); font-size:0.9rem;">✕</button>
        </div>
      </div>
    `).join('');
  }

  // ===================================================================
  // 4. DIGITAL TEXTBOOK & STUDY NOTES (S1-S8 Multi-Semester Digital Reader)
  // ===================================================================
  window.selectSemesterInNotes = function(sem) {
    const data = window.MECH_DATA || {};
    const cat = data.catalog_raw || [];
    const notesData = data.notes || {};
    const sNum = parseInt(sem.replace('S', ''));
    
    // Find first course with notes or first course in catalog
    const semCourses = cat.filter(c => c.semester === sNum);
    let targetCourse = semCourses.find(c => notesData[c.code]) || semCourses[0];
    
    if (targetCourse) {
      AppState.selectedSubject = targetCourse.code;
      const subjData = notesData[targetCourse.code] || {};
      const modules = subjData.modules || {};
      AppState.selectedModule = Object.keys(modules)[0] || 'Module 1';
      window.location.hash = `#notes/${targetCourse.code}`;
      renderStudyNotes();
    }
  };

  // Interactive Notes Update & Personalization Controller
  let editingSubject = '';
  let editingModule = '';

  window.openNotesUpdateModal = function(subj, mod) {
    editingSubject = subj || AppState.selectedSubject;
    editingModule = mod || AppState.selectedModule;

    const data = window.MECH_DATA || {};
    const notesData = data.notes || {};
    const subjData = notesData[editingSubject] || {};
    const modules = subjData.modules || {};
    const modData = modules[editingModule] || {};

    const customKey = `mech_custom_${editingSubject}_${editingModule}`;
    const initialText = localStorage.getItem(customKey) || modData.textbook_html || modData.detailed_notes || '';

    const titleEl = document.getElementById('note-update-modal-title');
    if (titleEl) {
      titleEl.innerText = `Edit & Personalize: ${editingSubject} • ${editingModule}`;
    }

    const textarea = document.getElementById('note-update-textarea');
    if (textarea) {
      textarea.value = initialText;
    }

    const previewBox = document.getElementById('note-update-preview-box');
    if (previewBox) {
      previewBox.style.display = 'none';
      previewBox.innerHTML = '';
    }

    const modal = document.getElementById('noteUpdateModal');
    if (modal) {
      modal.classList.add('active');
    }
  };

  window.closeNoteUpdateModal = function() {
    const modal = document.getElementById('noteUpdateModal');
    if (modal) {
      modal.classList.remove('active');
    }
  };

  window.toggleNotePreview = function() {
    const textarea = document.getElementById('note-update-textarea');
    const previewBox = document.getElementById('note-update-preview-box');
    if (!textarea || !previewBox) return;

    if (previewBox.style.display === 'none') {
      previewBox.style.display = 'block';
      previewBox.innerHTML = textarea.value;
      triggerKaTeX(previewBox);
    } else {
      previewBox.style.display = 'none';
    }
  };

  window.saveCustomNote = function() {
    const textarea = document.getElementById('note-update-textarea');
    if (!textarea || !editingSubject || !editingModule) return;

    const customKey = `mech_custom_${editingSubject}_${editingModule}`;
    localStorage.setItem(customKey, textarea.value);
    closeNoteUpdateModal();
    renderStudyNotes();
    alert(`Personalized notes for ${editingSubject} (${editingModule}) saved to this device!`);
  };

  window.resetNoteToOfficial = function(subj, mod) {
    const targetSubj = subj || editingSubject || AppState.selectedSubject;
    const targetMod = mod || editingModule || AppState.selectedModule;
    const customKey = `mech_custom_${targetSubj}_${targetMod}`;
    
    if (confirm(`Reset ${targetSubj} (${targetMod}) back to official verified institutional notes?`)) {
      localStorage.removeItem(customKey);
      closeNoteUpdateModal();
      renderStudyNotes();
    }
  };

  window.exportNoteJSON = function() {
    const textarea = document.getElementById('note-update-textarea');
    if (!textarea) return;

    const exportObj = {
      subject: editingSubject,
      module: editingModule,
      content: textarea.value,
      exportedAt: new Date().toISOString()
    };

    const jsonStr = JSON.stringify(exportObj, null, 2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonStr).then(() => {
        alert('Module JSON copied to clipboard! You can submit this as a Pull Request on GitHub.');
      }).catch(() => {
        prompt('Copy your updated module JSON below:', jsonStr);
      });
    } else {
      prompt('Copy your updated module JSON below:', jsonStr);
    }
  };

  function renderStudyNotes() {
    const container = document.getElementById('notes-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const notesData = data.notes || {};
    const catalog = data.catalog_raw || [];
    
    let currSubj = AppState.selectedSubject || '24MET401';
    
    // Determine active semester for current subject
    let currentSem = 'S4';
    const match = catalog.find(c => c.code === currSubj);
    if (match && match.semester) {
      currentSem = 'S' + match.semester;
    } else if (currSubj.startsWith('24MAP1') || currSubj.startsWith('24CYP1') || currSubj.startsWith('24EST1') || currSubj.startsWith('24ESL1') || currSubj.startsWith('24MCT1')) {
      currentSem = 'S1';
    } else if (currSubj.startsWith('24MAP2') || currSubj.startsWith('24PYP2') || currSubj.startsWith('24ESP2') || currSubj.startsWith('24MCP2') || currSubj.startsWith('24HUL2') || currSubj.startsWith('24HUT2')) {
      currentSem = 'S2';
    } else if (currSubj.startsWith('24MAT3') || currSubj.startsWith('24MEP3') || currSubj.startsWith('24MET3') || currSubj.startsWith('24MEJ3') || currSubj.startsWith('24EST3') || currSubj.startsWith('24HUT3')) {
      currentSem = 'S3';
    } else if (currSubj.startsWith('24MET5') || currSubj.startsWith('24MEJ5') || currSubj.startsWith('24MEP5') || currSubj.startsWith('24HUT5') || currSubj.startsWith('24MCT5') || currSubj.startsWith('24ESP5')) {
      currentSem = 'S5';
    } else if (currSubj.startsWith('24MET6') || currSubj.startsWith('24MEP6') || currSubj.startsWith('24MEE6')) {
      currentSem = 'S6';
    } else if (currSubj.startsWith('24MEP7') || currSubj.startsWith('24MEE7')) {
      currentSem = 'S7';
    } else if (currSubj.startsWith('24MEE8') || currSubj.startsWith('24MED8') || currSubj.startsWith('24MEN8') || currSubj.startsWith('24MEO8') || currSubj.startsWith('24MEH8')) {
      currentSem = 'S8';
    }

    const sNum = parseInt(currentSem.replace('S', ''));
    const semCourses = catalog.filter(c => c.semester === sNum);

    let subjData = notesData[currSubj];
    
    if (!subjData) {
      // Check if another subject in this semester has notes
      const altSubj = semCourses.find(c => notesData[c.code]);
      if (altSubj && notesData[altSubj.code]) {
        currSubj = altSubj.code;
        subjData = notesData[currSubj];
        AppState.selectedSubject = currSubj;
      } else {
        subjData = {
          name: match ? match.title : currSubj,
          modules: {
            "Syllabus Overview": {
              title: "Official TKMCE Autonomous Scheme Curriculum",
              short_notes: "<p>Curriculum topics verified against institutional regulations.</p>",
              detailed_notes: `<p>Full digital textbook modules for ${currSubj} are in active preparation. Please refer to the official syllabus PDF or browse other semesters.</p>`,
              textbook_html: `<div style='padding:24px; text-align:center;'><h3>${currSubj} • ${match ? match.title : ''}</h3><p>Official course registered in TKMCE Autonomous 2024 scheme.</p><a href='./tkm_syllabus_2024.pdf' target='_blank' class='btn btn-primary'>View Institutional Syllabus PDF</a></div>`
            }
          }
        };
      }
    }

    const modules = subjData.modules || {};
    const currMod = AppState.selectedModule in modules ? AppState.selectedModule : Object.keys(modules)[0] || 'Module 1';
    const modData = modules[currMod] || {};

    // Check for custom personalized notes in local storage
    const customKey = `mech_custom_${currSubj}_${currMod}`;
    const customContent = localStorage.getItem(customKey);
    const hasCustomNotes = !!customContent;

    // Save as last opened
    AppState.lastOpened = {
      subject: currSubj,
      module: currMod,
      title: modData.title
    };
    localStorage.setItem('mech_last_opened', JSON.stringify(AppState.lastOpened));

    let readingContent = '';
    if (hasCustomNotes) {
      readingContent = customContent;
    } else if (AppState.readingMode === 'textbook') {
      readingContent = modData.textbook_html || modData.detailed_notes || '<p>Textbook material available.</p>';
    } else if (AppState.readingMode === 'detailed') {
      readingContent = modData.detailed_notes || modData.textbook_html || '<p>Detailed notes loaded.</p>';
    } else if (AppState.readingMode === 'short') {
      readingContent = `
        <div style="background:var(--color-academic-blue-subtle); border-left:4px solid var(--color-academic-blue); padding:16px; border-radius:var(--radius-md); margin-bottom:16px;">
          <h4 style="color:var(--color-academic-blue); margin-bottom:6px;">⚡ High-Yield Revision Points</h4>
          <p style="font-size:0.9rem; color:var(--color-text-secondary); margin:0;">Quick revision checklist for fast recall before exams.</p>
        </div>` + (modData.short_notes || '');
    } else if (AppState.readingMode === 'exam') {
      readingContent = `
        <div style="background:var(--color-warning-subtle); border-left:4px solid var(--color-warning); padding:16px; border-radius:var(--radius-md); margin-bottom:16px;">
          <h4 style="color:var(--color-warning); margin-bottom:6px;">🎯 University Exam Mode: Scoring Derivations</h4>
          <p style="font-size:0.9rem; color:var(--color-text-secondary); margin:0;">Critical scoring criteria, derivation steps, and key assumptions for TKMCE Autonomous exams.</p>
        </div>` + (modData.short_notes || '') + (modData.detailed_notes || '');
    } else if (AppState.readingMode === 'formulas') {
      readingContent = `
        <div style="background:var(--color-academic-blue-subtle); border-left:4px solid var(--color-academic-blue); padding:16px; border-radius:var(--radius-md); margin-bottom:16px;">
          <h4 style="color:var(--color-academic-blue); margin-bottom:6px;">∑ Formula Revision</h4>
          <p style="font-size:0.9rem; color:var(--color-text-secondary); margin:0;">Standard mathematical relations and SI units for ${currMod}.</p>
        </div>
        <div class="card" style="padding:16px; margin-top:12px;">
          ${(data.formulas || []).filter(f => f.subject_code === currSubj).map(f => `
            <div style="margin-bottom:16px; border-bottom:1px solid var(--color-border); padding-bottom:12px;">
              <div style="font-weight:700;">${f.name}</div>
              <div style="margin:8px 0; font-size:1.1rem;">$$${f.latex}$$</div>
              <div class="text-secondary" style="font-size:0.82rem;">${f.description || ''}</div>
            </div>
          `).join('') || '<p>Check the global Formula Library for comprehensive KaTeX equation sheets.</p>'}
        </div>
      `;
    }

    // Direct PDF existence check
    const s4Pdfs = ['24BYT408', '24HUT415', '24MCT406', '24MEJ404', '24MEP403', '24MET401', '24MET402'];
    const hasDirectPdf = s4Pdfs.includes(currSubj);

    container.innerHTML = `
      <!-- Subject Header & PDF Download Banner -->
      <div class="card" style="margin-bottom:var(--space-6); background:linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-elevated) 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span class="badge badge-blue text-mono">${currSubj}</span>
              <span class="badge badge-teal">${currentSem} • Autonomous 2024 Scheme</span>
            </div>
            <h1 class="h2" style="margin:0; font-family:var(--font-heading);">${subjData.name || (match ? match.title : currSubj)}</h1>
          </div>

          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            ${hasDirectPdf ? `
              <a href="./notes/${currSubj}.pdf" download class="btn btn-secondary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                <span>📄</span>
                <span>Subject PDF</span>
              </a>
            ` : `
              <button class="btn btn-secondary btn-sm" onclick="window.print()" style="display:inline-flex; align-items:center; gap:6px;" title="Print/Save full notes to PDF">
                <span>🖨️</span>
                <span>Save PDF</span>
              </button>
            `}

            ${currentSem === 'S4' ? `
              <a href="./notes/TKMCE_S4_Study_Notes.pdf" download class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                <span>📚</span>
                <span>Compiled S4 PDF (508 KB)</span>
              </a>
            ` : `
              <a href="./tkm_syllabus_2024.pdf" target="_blank" class="btn btn-primary btn-sm" style="display:inline-flex; align-items:center; gap:6px;">
                <span>📋</span>
                <span>Syllabus PDF</span>
              </a>
            `}
          </div>
        </div>

        <!-- Mode Bar & Utility Controls -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:18px; padding-top:14px; border-top:1px solid var(--color-border); flex-wrap:wrap; gap:12px;">
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button class="btn btn-sm ${AppState.readingMode === 'textbook' ? 'btn-primary' : 'btn-secondary'}" onclick="setReadingMode('textbook')" style="border:none;">Digital Textbook</button>
            <button class="btn btn-sm ${AppState.readingMode === 'detailed' ? 'btn-primary' : 'btn-secondary'}" onclick="setReadingMode('detailed')" style="border:none;">Detailed</button>
            <button class="btn btn-sm ${AppState.readingMode === 'short' ? 'btn-primary' : 'btn-secondary'}" onclick="setReadingMode('short')" style="border:none;">Short</button>
            <button class="btn btn-sm ${AppState.readingMode === 'exam' ? 'btn-primary' : 'btn-secondary'}" onclick="setReadingMode('exam')" style="border:none;">Exam Mode</button>
            <button class="btn btn-sm ${AppState.readingMode === 'formulas' ? 'btn-primary' : 'btn-secondary'}" onclick="setReadingMode('formulas')" style="border:none;">Formulas</button>
          </div>

          <div style="display:flex; align-items:center; gap:6px;">
            <button class="btn btn-sm btn-secondary" onclick="openNotesUpdateModal('${currSubj}', '${currMod}')" style="display:inline-flex; align-items:center; gap:5px;" title="Personalize or contribute updates to these notes">
              <span>✏️</span>
              <span>Edit Notes</span>
            </button>
            <button class="icon-action-btn" onclick="adjustFontSize(-1)" title="Decrease font size">A-</button>
            <button class="icon-action-btn" onclick="adjustFontSize(1)" title="Increase font size">A+</button>
            <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨️ Print</button>
          </div>
        </div>
      </div>

      <!-- Main Layout: Module Nav & Content -->
      <div style="display:grid; grid-template-columns: 280px 1fr; gap:var(--space-6);">
        <!-- Sidebar: Semester Switcher & Courses -->
        <div>
          <div class="card" style="padding:14px; position:sticky; top:80px; max-height:calc(100vh - 100px); overflow-y:auto;">
            <!-- Active Modules -->
            <div class="sidebar-section-label">Modules (${Object.keys(modules).length})</div>
            ${Object.keys(modules).map(mKey => `
              <a href="#notes/${currSubj}/${encodeURIComponent(mKey)}" class="nav-item ${mKey === currMod ? 'active' : ''}" style="margin-bottom:4px;">
                <span class="nav-item-text">${mKey}</span>
              </a>
            `).join('')}

            <!-- Semester Switcher -->
            <div class="sidebar-section-label" style="margin-top:20px;">Semester Selector</div>
            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:4px; margin-bottom:12px;">
              ${['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'].map(s => `
                <button class="btn btn-sm ${s === currentSem ? 'btn-primary' : 'btn-secondary'}" style="padding:4px 6px; font-size:0.75rem; border:none;" onclick="selectSemesterInNotes('${s}')">${s}</button>
              `).join('')}
            </div>

            <!-- Courses of Active Semester -->
            <div class="sidebar-section-label">${currentSem} Courses (${semCourses.length})</div>
            ${semCourses.map(c => {
              const hasNotes = !!notesData[c.code];
              const isSelected = c.code === currSubj;
              return `
                <a href="#notes/${c.code}" class="nav-item ${isSelected ? 'active' : ''}" style="margin-bottom:3px; display:flex; justify-content:space-between; align-items:center;">
                  <span class="nav-item-text" style="font-size:0.8rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${c.code} - ${c.title}">${c.code}</span>
                  ${hasNotes ? '<span class="badge badge-teal" style="font-size:0.65rem; padding:1px 5px; flex-shrink:0;">Textbook</span>' : '<span class="badge" style="font-size:0.65rem; padding:1px 4px; opacity:0.6;">Syllabus</span>'}
                </a>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Main Reading Workspace -->
        <div class="card" style="padding:28px 32px;" id="textbook-reader-pane">
          <div style="margin-bottom:20px; border-bottom:1px solid var(--color-border); padding-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:0.75rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--color-academic-blue); margin-bottom:4px;">
                  ${currMod}
                </div>
                <h2 class="h2" style="margin:0;">${modData.title || currMod}</h2>
              </div>
              ${hasCustomNotes ? `
                <div style="display:inline-flex; align-items:center; gap:8px; padding:4px 12px; background:var(--color-teal-subtle, #e6f4f1); border:1px solid var(--color-teal, #0d9488); border-radius:9999px; font-size:0.75rem; font-weight:600; color:#0f766e;">
                  <span>✏️ Local Edits Active</span>
                  <button onclick="resetNoteToOfficial('${currSubj}', '${currMod}')" style="background:none; border:none; text-decoration:underline; cursor:pointer; color:#0f766e; font-size:0.75rem;">Reset</button>
                </div>
              ` : ''}
            </div>
          </div>

          <div class="textbook-body" style="font-size:${AppState.fontSize}px; line-height:1.75;">
            ${readingContent}
          </div>
        </div>
      </div>
    `;

    // Trigger KaTeX on updated content
    triggerKaTeX(container);
  }

  window.setReadingMode = function(mode) {
    AppState.readingMode = mode;
    renderStudyNotes();
  };

  window.adjustFontSize = function(delta) {
    AppState.fontSize = Math.min(24, Math.max(13, AppState.fontSize + delta));
    localStorage.setItem('mech_font_size', AppState.fontSize);
    renderStudyNotes();
  };
  // 5. PRACTICE & ACTIVE RECALL CENTRE (Exam OS)
  // ===================================================================
  function renderExamCentre() {
    const container = document.getElementById('exams-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const flashcards = data.flashcards || [];
    const activeFc = flashcards[AppState.flashcardIndex] || flashcards[0];

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Practice & Active Recall Centre</h1>
        <p class="text-secondary">Interactive Flashcards, University Exam Patterns, and Step-by-Step Worked Solutions</p>
      </div>

      <!-- Navigation Tabs -->
      <div style="display:flex; gap:8px; border-bottom:1px solid var(--color-border); margin-bottom:var(--space-6);">
        <button class="btn ${AppState.examTab === 'flashcards' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchExamTab('flashcards')">🗂️ Flashcards & Active Recall</button>
        <button class="btn ${AppState.examTab === 'pattern' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchExamTab('pattern')">📋 University Exam Patterns</button>
        <button class="btn ${AppState.examTab === 'numerical' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchExamTab('numerical')">💡 Numerical Practice</button>
      </div>

      ${AppState.examTab === 'flashcards' ? `
        <!-- 3D Flashcard Deck -->
        <div style="max-width:620px; margin:0 auto;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; font-size:0.86rem;">
            <div class="text-secondary">Card ${AppState.flashcardIndex + 1} of ${flashcards.length}</div>
            <div class="badge badge-teal">${activeFc ? activeFc.category : 'Concept'} • ${activeFc ? activeFc.subject : '24MET401'}</div>
          </div>

          <div class="flashcard-stage" onclick="flipFlashcard()">
            <div class="flashcard-inner ${AppState.flashcardFlipped ? 'flipped' : ''}" id="flashcard-inner-box">
              <!-- Front -->
              <div class="flashcard-front">
                <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:var(--color-academic-blue); margin-bottom:14px;">
                  Active Recall Prompt
                </div>
                <div style="font-size:1.15rem; font-weight:600; line-height:1.5;">
                  ${activeFc ? activeFc.front : 'Loading question...'}
                </div>
                <div style="font-size:0.8rem; color:var(--color-text-tertiary); margin-top:24px;">
                  👆 Click to Flip and Reveal Solution
                </div>
              </div>

              <!-- Back -->
              <div class="flashcard-back">
                <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:var(--color-success); margin-bottom:14px;">
                  Verified Answer & Formula
                </div>
                <div style="font-size:1.02rem; line-height:1.6; text-align:left; width:100%;">
                  ${activeFc ? activeFc.back : ''}
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Flashcard Controls -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; gap:12px;">
            <button class="btn btn-secondary btn-sm" onclick="prevFlashcard()">← Previous</button>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" style="border-color:var(--color-error); color:var(--color-error);" onclick="rateFlashcard(false)">Still Learning</button>
              <button class="btn btn-primary btn-sm" onclick="rateFlashcard(true)">Mastered ✓</button>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="nextFlashcard()">Next →</button>
          </div>
        </div>
      ` : AppState.examTab === 'pattern' ? `
        <!-- University Exam Pattern Bank -->
        <div class="grid-cols-2" style="gap:16px;">
          <div class="card">
            <span class="badge badge-blue">Part A • Short Answer (2 Marks)</span>
            <h3 class="h3" style="margin:10px 0 6px 0;">State Mohr's Circle Principal Plane Definition</h3>
            <p class="text-secondary" style="font-size:0.88rem; margin-bottom:12px;">A principal plane is a plane of zero shear stress ($\tau = 0$) where only normal stress acts.</p>
            <div style="background:var(--color-surface-elevated); padding:10px; border-radius:var(--radius-sm); font-size:0.8rem;">
              <strong>Exam Tip:</strong> Always state that principal stresses are the maximum and minimum normal stresses.
            </div>
          </div>

          <div class="card">
            <span class="badge badge-teal">Part B • Long Question (8 Marks)</span>
            <h3 class="h3" style="margin:10px 0 6px 0;">Derivation of Euler's Buckling Formula</h3>
            <p class="text-secondary" style="font-size:0.88rem; margin-bottom:12px;">Determine the critical buckling load for a column with both ends pinned using the governing differential equation $EI \frac{d^2y}{dx^2} = -Py$.</p>
            <div style="background:var(--color-surface-elevated); padding:10px; border-radius:var(--radius-sm); font-size:0.8rem;">
              <strong>Key Steps:</strong> General solution $y = A\sin(kx) + B\cos(kx)$, apply boundary conditions $y(0)=0$ and $y(L)=0$, yielding $P_{cr} = \frac{\pi^2 EI}{L^2}$.
            </div>
          </div>
        </div>
      ` : `
        <!-- Numerical Practice -->
        <div class="card" style="padding:24px; max-width:680px; margin:0 auto;">
          <span class="badge badge-warning">24MET401 • Numerical Challenge</span>
          <h3 class="h3" style="margin:12px 0 8px 0;">Biaxial Plane Stress Analysis</h3>
          <p style="font-size:0.92rem; line-height:1.6; margin-bottom:16px;">
            At a critical point in a mechanical component, stresses are $\sigma_x = 80\text{ MPa}$, $\sigma_y = -40\text{ MPa}$, and $\tau_{xy} = 30\text{ MPa}$. Determine the principal stresses and the maximum shear stress.
          </p>
          <button class="btn btn-primary btn-sm" onclick="this.nextElementSibling.style.display='block'; this.style.display='none';">Reveal Step-by-Step Solution</button>
          <div style="display:none; background:var(--color-surface-elevated); border-left:4px solid var(--color-academic-blue); padding:16px; border-radius:var(--radius-md); margin-top:16px; font-size:0.9rem; line-height:1.7;">
            <div><strong>1. Center of Mohr's Circle:</strong> $\sigma_{avg} = \frac{80 + (-40)}{2} = 20\text{ MPa}$</div>
            <div><strong>2. Radius of Circle:</strong> $R = \sqrt{\left(\frac{80 - (-40)}{2}\right)^2 + 30^2} = \sqrt{60^2 + 30^2} = \sqrt{4500} = 67.08\text{ MPa}$</div>
            <div><strong>3. Principal Stresses:</strong> $\sigma_1 = 20 + 67.08 = 87.08\text{ MPa}$, $\sigma_2 = 20 - 67.08 = -47.08\text{ MPa}$</div>
            <div><strong>4. Maximum Shear Stress:</strong> $\tau_{\max} = R = 67.08\text{ MPa}$</div>
          </div>
        </div>
      `}
    `;
  }

  window.switchExamTab = function(tab) {
    AppState.examTab = tab;
    renderExamCentre();
    setTimeout(triggerKaTeX, 60);
  };

  window.flipFlashcard = function() {
    AppState.flashcardFlipped = !AppState.flashcardFlipped;
    const box = document.getElementById('flashcard-inner-box');
    if (box) {
      if (AppState.flashcardFlipped) box.classList.add('flipped');
      else box.classList.remove('flipped');
      setTimeout(triggerKaTeX, 60);
    }
  };

  window.nextFlashcard = function() {
    const data = window.MECH_DATA || {};
    const count = (data.flashcards || []).length;
    AppState.flashcardIndex = (AppState.flashcardIndex + 1) % count;
    AppState.flashcardFlipped = false;
    renderExamCentre();
    setTimeout(triggerKaTeX, 60);
  };

  window.prevFlashcard = function() {
    const data = window.MECH_DATA || {};
    const count = (data.flashcards || []).length;
    AppState.flashcardIndex = (AppState.flashcardIndex - 1 + count) % count;
    AppState.flashcardFlipped = false;
    renderExamCentre();
    setTimeout(triggerKaTeX, 60);
  };

  window.rateFlashcard = function(mastered) {
    if (mastered) {
      AppState.srsStats.mastered = (AppState.srsStats.mastered || 0) + 1;
      localStorage.setItem('mech_srs_stats', JSON.stringify(AppState.srsStats));
    }
    nextFlashcard();
  };

  // ===================================================================
  // 6. ENGINEERING OS — LAB, CALCULATORS & GATE
  // ===================================================================
  function renderInteractiveLab() {
    const container = document.getElementById('lab-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const calculators = data.calculators || [];

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Engineering OS — Simulations & Calculators</h1>
        <p class="text-secondary">Verified Physical Models, Real-Time Interactive Calculators, and GATE Roadmaps</p>
      </div>

      <!-- Lab Subtabs -->
      <div style="display:flex; gap:8px; border-bottom:1px solid var(--color-border); margin-bottom:var(--space-6);">
        <button class="btn ${AppState.labTab === 'sims' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchLabTab('sims')">⚙️ Physics Simulations</button>
        <button class="btn ${AppState.labTab === 'calcs' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="switchLabTab('calcs')">🧮 Engineering Calculators</button>
      </div>

      ${AppState.labTab === 'sims' ? `
        <!-- 4 Verified Physics Simulations -->
        <div style="display:flex; gap:8px; margin-bottom:16px; overflow-x:auto;">
          <button class="btn btn-sm ${AppState.activeSim === 'mohr' ? 'btn-primary' : 'btn-secondary'}" onclick="setSim('mohr')">Mohr's Circle Stress</button>
          <button class="btn btn-sm ${AppState.activeSim === 'pv' ? 'btn-primary' : 'btn-secondary'}" onclick="setSim('pv')">Thermodynamic P-V Cycles</button>
          <button class="btn btn-sm ${AppState.activeSim === 'venturi' ? 'btn-primary' : 'btn-secondary'}" onclick="setSim('venturi')">Venturi Bernoulli Flow</button>
          <button class="btn btn-sm ${AppState.activeSim === 'beam' ? 'btn-primary' : 'btn-secondary'}" onclick="setSim('beam')">Beam Deflection</button>
        </div>
        <div id="active-sim-workspace" class="card" style="padding:24px;"></div>
      ` : `
        <!-- 6 Engineering Calculators -->
        <div class="grid-cols-2" style="gap:20px;">
          <!-- 1. Stress Strain -->
          <div class="calc-card">
            <h3 class="h4" style="margin-bottom:6px;">1. Stress, Strain & Young's Modulus</h3>
            <div style="font-size:0.84rem; color:var(--color-academic-blue); margin-bottom:14px;">$$E = \frac{P \cdot L}{A \cdot \Delta L}$$</div>
            
            <div class="calc-input-group">
              <label><span>Axial Force P</span> <span>kN</span></label>
              <input type="number" id="calc-p-load" value="50" class="calc-input-control" oninput="runAllCalculators()">
            </div>
            <div class="calc-input-group">
              <label><span>Diameter d</span> <span>mm</span></label>
              <input type="number" id="calc-p-diam" value="20" class="calc-input-control" oninput="runAllCalculators()">
            </div>
            <div class="calc-input-group">
              <label><span>Length L</span> <span>mm</span></label>
              <input type="number" id="calc-p-len" value="1000" class="calc-input-control" oninput="runAllCalculators()">
            </div>
            <div class="calc-input-group">
              <label><span>Elongation ΔL</span> <span>mm</span></label>
              <input type="number" id="calc-p-deltal" value="0.75" class="calc-input-control" oninput="runAllCalculators()">
            </div>

            <div class="calc-result-box" id="calc-res-stress">
              Calculated Young's Modulus: <strong>212.2 GPa</strong>
            </div>
          </div>

          <!-- 2. Thermal Stress -->
          <div class="calc-card">
            <h3 class="h4" style="margin-bottom:6px;">2. Thermal Stress & Expansion</h3>
            <div style="font-size:0.84rem; color:var(--color-academic-blue); margin-bottom:14px;">$$\sigma_{th} = E \cdot \alpha \cdot \Delta T$$</div>

            <div class="calc-input-group">
              <label><span>Young's Modulus E</span> <span>GPa</span></label>
              <input type="number" id="calc-t-e" value="200" class="calc-input-control" oninput="runAllCalculators()">
            </div>
            <div class="calc-input-group">
              <label><span>Thermal Expansion α</span> <span>×10⁻⁶ /°C</span></label>
              <input type="number" id="calc-t-alpha" value="12" class="calc-input-control" oninput="runAllCalculators()">
            </div>
            <div class="calc-input-group">
              <label><span>Temp Rise ΔT</span> <span>°C</span></label>
              <input type="number" id="calc-t-dt" value="60" class="calc-input-control" oninput="runAllCalculators()">
            </div>

            <div class="calc-result-box" id="calc-res-thermal">
              Thermal Stress: <strong>144.0 MPa</strong>
            </div>
          </div>

          <!-- 3. Reynolds Number -->
          <div class="calc-card">
            <h3 class="h4" style="margin-bottom:6px;">3. Reynolds Number & Regime</h3>
            <div style="font-size:0.84rem; color:var(--color-academic-blue); margin-bottom:14px;">$$Re = \frac{\rho v D}{\mu}$$</div>

            <div class="calc-input-group">
              <label><span>Velocity v</span> <span>m/s</span></label>
              <input type="number" id="calc-r-v" value="1.5" class="calc-input-control" oninput="runAllCalculators()">
            </div>
            <div class="calc-input-group">
              <label><span>Diameter D</span> <span>mm</span></label>
              <input type="number" id="calc-r-d" value="50" class="calc-input-control" oninput="runAllCalculators()">
            </div>
            <div class="calc-input-group">
              <label><span>Kinematic Viscosity ν</span> <span>×10⁻⁶ m²/s</span></label>
              <input type="number" id="calc-r-nu" value="1.0" class="calc-input-control" oninput="runAllCalculators()">
            </div>

            <div class="calc-result-box" id="calc-res-reynolds">
              Reynolds Number: <strong>75,000 (Turbulent)</strong>
            </div>
          </div>

          <!-- 4. Pump Power -->
          <div class="calc-card">
            <h3 class="h4" style="margin-bottom:6px;">4. Pump Hydraulic & Shaft Power</h3>
            <div style="font-size:0.84rem; color:var(--color-academic-blue); margin-bottom:14px;">$$P = \frac{\rho g Q H}{1000 \cdot \eta}$$</div>

            <div class="calc-input-group">
              <label><span>Discharge Q</span> <span>L/s</span></label>
              <input type="number" id="calc-pump-q" value="25" class="calc-input-control" oninput="runAllCalculators()">
            </div>
            <div class="calc-input-group">
              <label><span>Total Head H</span> <span>m</span></label>
              <input type="number" id="calc-pump-h" value="40" class="calc-input-control" oninput="runAllCalculators()">
            </div>
            <div class="calc-input-group">
              <label><span>Pump Efficiency η</span> <span>%</span></label>
              <input type="number" id="calc-pump-eff" value="75" class="calc-input-control" oninput="runAllCalculators()">
            </div>

            <div class="calc-result-box" id="calc-res-pump">
              Shaft Power Required: <strong>13.08 kW</strong>
            </div>
          </div>
        </div>
      `}
    `;

    if (AppState.labTab === 'sims') {
      renderActiveSimulation();
    }
  }

  window.switchLabTab = function(tab) {
    AppState.labTab = tab;
    renderInteractiveLab();
    setTimeout(triggerKaTeX, 60);
  };

  window.setSim = function(simName) {
    AppState.activeSim = simName;
    renderInteractiveLab();
  };

  function renderActiveSimulation() {
    const container = document.getElementById('active-sim-workspace');
    if (!container || !window.MECH_SIMULATIONS) return;
    const simFunc = window.MECH_SIMULATIONS[AppState.activeSim];
    if (typeof simFunc === 'function') {
      simFunc(container);
    }
  }

  window.runAllCalculators = function() {
    // 1. Stress Strain
    const p = parseFloat(document.getElementById('calc-p-load')?.value || 50) * 1000;
    const d = parseFloat(document.getElementById('calc-p-diam')?.value || 20);
    const L = parseFloat(document.getElementById('calc-p-len')?.value || 1000);
    const dL = parseFloat(document.getElementById('calc-p-deltal')?.value || 0.75);
    const area = (Math.PI * d * d) / 4;
    const E = (p * L) / (area * dL) / 1000; // GPa
    const stress = p / area; // MPa
    const resStress = document.getElementById('calc-res-stress');
    if (resStress) resStress.innerHTML = `Stress: <strong>${stress.toFixed(1)} MPa</strong> • Young's Modulus E: <strong>${E.toFixed(1)} GPa</strong>`;

    // 2. Thermal
    const eMod = parseFloat(document.getElementById('calc-t-e')?.value || 200) * 1000;
    const alpha = parseFloat(document.getElementById('calc-t-alpha')?.value || 12) * 1e-6;
    const dt = parseFloat(document.getElementById('calc-t-dt')?.value || 60);
    const sigmaTh = (eMod * alpha * dt);
    const resThermal = document.getElementById('calc-res-thermal');
    if (resThermal) resThermal.innerHTML = `Thermal Stress: <strong>${sigmaTh.toFixed(1)} MPa</strong>`;

    // 3. Reynolds
    const v = parseFloat(document.getElementById('calc-r-v')?.value || 1.5);
    const diam = parseFloat(document.getElementById('calc-r-d')?.value || 50) / 1000;
    const nu = parseFloat(document.getElementById('calc-r-nu')?.value || 1.0) * 1e-6;
    const Re = (v * diam) / nu;
    const regime = Re < 2300 ? 'Laminar (Smooth)' : Re > 4000 ? 'Turbulent (High Mixing)' : 'Transition';
    const resRey = document.getElementById('calc-res-reynolds');
    if (resRey) resRey.innerHTML = `Reynolds Number: <strong>${Math.round(Re).toLocaleString()} (${regime})</strong>`;

    // 4. Pump Power
    const q = parseFloat(document.getElementById('calc-pump-q')?.value || 25) / 1000;
    const head = parseFloat(document.getElementById('calc-pump-h')?.value || 40);
    const eff = parseFloat(document.getElementById('calc-pump-eff')?.value || 75) / 100;
    const hydPower = (1000 * 9.81 * q * head) / 1000;
    const shaftPower = hydPower / eff;
    const resPump = document.getElementById('calc-res-pump');
    if (resPump) resPump.innerHTML = `Hydraulic Power: <strong>${hydPower.toFixed(2)} kW</strong> • Shaft Power: <strong>${shaftPower.toFixed(2)} kW</strong>`;
  };

  // ===================================================================
  // 7. STUDY PLANNER (Personal Workspace)
  // ===================================================================
  function renderStudyPlanner() {
    const container = document.getElementById('planner-content');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <h1 class="h1">Personal Study Planner</h1>
          <p class="text-secondary">Organize daily priorities, set module goals, and launch Focus Studio directly from tasks</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="showAddTaskPrompt()">+ New Study Task</button>
      </div>

      <div class="card" style="padding:20px;">
        ${AppState.tasks.length > 0 ? `
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${AppState.tasks.map((t, idx) => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--color-surface-elevated); border:1px solid var(--color-border); border-radius:var(--radius-md);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggleTask(${idx})">
                  <div>
                    <div style="font-weight:600; text-decoration:${t.completed ? 'line-through' : 'none'}; opacity:${t.completed ? '0.6' : '1'};">
                      ${t.title}
                    </div>
                    <div class="text-secondary" style="font-size:0.8rem;">
                      ${t.subject || 'MECH'} • Priority: <span class="badge badge-teal">${t.priority || 'Normal'}</span>
                    </div>
                  </div>
                </div>

                <div style="display:flex; align-items:center; gap:8px;">
                  <button class="btn btn-secondary btn-sm" onclick="AppState.selectedSubject='${t.subject || '24MET401'}'; AppState.focusGoal='${t.title}'; location.hash='#focus';">
                    🎯 Focus
                  </button>
                  <button onclick="deleteTask(${idx})" style="background:none; border:none; color:var(--color-text-tertiary); cursor:pointer; font-size:1.1rem;">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="text-align:center; padding:32px 0;">
            <div style="font-size:2.5rem; margin-bottom:12px;">📅</div>
            <h3 class="h3" style="margin-bottom:6px;">No study tasks scheduled yet</h3>
            <p class="text-secondary" style="font-size:0.88rem; margin-bottom:16px;">Schedule your next module target or homework exercise.</p>
            <button class="btn btn-secondary btn-sm" onclick="showAddTaskPrompt()">Add Your First Task</button>
          </div>
        `}
      </div>
    `;
  }

  window.showAddTaskPrompt = function() {
    const title = prompt('Enter task description (e.g. Solve 3 Mohr circle problems):');
    if (!title || !title.trim()) return;
    const subj = prompt('Course code (e.g. 24MET401):', AppState.selectedSubject || '24MET401') || '24MET401';
    AppState.tasks.push({
      id: Date.now(),
      title: title.trim(),
      subject: subj.trim(),
      priority: 'High',
      completed: false
    });
    localStorage.setItem('mech_tasks', JSON.stringify(AppState.tasks));
    renderStudyPlanner();
  };

  window.toggleTask = function(idx) {
    if (AppState.tasks[idx]) {
      AppState.tasks[idx].completed = !AppState.tasks[idx].completed;
      localStorage.setItem('mech_tasks', JSON.stringify(AppState.tasks));
      renderStudyPlanner();
    }
  };

  window.deleteTask = function(idx) {
    AppState.tasks.splice(idx, 1);
    localStorage.setItem('mech_tasks', JSON.stringify(AppState.tasks));
    renderStudyPlanner();
  };

  // ===================================================================
  // 8. SEMESTERS HUB (S1–S8)
  // ===================================================================
  function renderSemesters() {
    const container = document.getElementById('semesters-content');
    if (!container) return;

    const currentSem = AppState.selectedSemester;
    const sNum = parseInt(currentSem.replace('S', ''));
    const data = window.MECH_DATA || {};
    const semInfo = data.curriculum ? data.curriculum[currentSem] : null;
    const catalogList = (data.catalog_raw || []).filter(c => c.semester === sNum);

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">${currentSem} • TKMCE Autonomous Scheme</h1>
        <p class="text-secondary">${semInfo ? semInfo.title : 'Autonomous Mechanical Engineering Curriculum'}</p>
      </div>

      <!-- Semester Tabs -->
      <div style="display:flex; gap:8px; overflow-x:auto; margin-bottom:var(--space-6); padding-bottom:4px;">
        ${['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'].map(s => `
          <button class="btn btn-sm ${s === currentSem ? 'btn-primary' : 'btn-secondary'}" onclick="AppState.selectedSemester='${s}'; renderSemesters();">
            ${s}
          </button>
        `).join('')}
      </div>

      <div class="grid-cols-2" style="gap:16px;">
        ${catalogList.map(c => `
          <div class="card" style="padding:18px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
              <span class="badge badge-blue text-mono">${c.code}</span>
              <span class="badge badge-teal">${c.type}</span>
            </div>
            <h3 class="h4" style="margin-bottom:6px;">${c.title}</h3>
            <div class="text-secondary" style="font-size:0.82rem; margin-bottom:14px;">
              End-Sem Exam: ${c.ese ? c.ese + ' Marks' : 'Continuous Assessment'}
            </div>
            <div style="display:flex; gap:8px;">
              <a href="#notes/${c.code}" class="btn btn-primary btn-sm">Read Notes &rarr;</a>
              ${['24BYT408', '24HUT415', '24MCT406', '24MEJ404', '24MEP403', '24MET401', '24MET402'].includes(c.code) ? `
                <a href="./notes/${c.code}.pdf" download class="btn btn-secondary btn-sm">PDF ⬇️</a>
              ` : `
                <a href="#notes/${c.code}" class="btn btn-secondary btn-sm" onclick="setTimeout(()=>window.print(), 500);">Save PDF 🖨️</a>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ===================================================================
  // 9. PYQ VAULT (38 Authentic Question Papers)
  // ===================================================================
  function renderPYQVault() {
    const container = document.getElementById('pyqs-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const pyqs = data.pyqs || [];

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Previous-Year Question Paper Vault</h1>
        <p class="text-secondary">38 Authentic University & Series Question Papers with Unrestricted Previews</p>
      </div>

      <div class="grid-cols-2" style="gap:16px;">
        ${pyqs.slice(0, 12).map(p => `
          <div class="card" style="padding:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span class="badge badge-blue text-mono">${p.code || 'MECH'}</span>
              <span class="badge badge-teal">${p.exam || 'End Sem'}</span>
            </div>
            <h3 class="h4" style="margin-bottom:4px;">${p.title}</h3>
            <div class="text-secondary" style="font-size:0.82rem; margin-bottom:12px;">Year: ${p.year || '2023–2024'}</div>
            <a href="./${p.file}" target="_blank" class="btn btn-secondary btn-sm">Preview PDF 📄</a>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ===================================================================
  // 10. FORMULA LIBRARY
  // ===================================================================
  function renderFormulaLibrary() {
    const container = document.getElementById('formulas-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const formulas = data.formulas || [];

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Mechanical Engineering Formula Library</h1>
        <p class="text-secondary">High-Precision Mathematical Expressions Typeset with KaTeX</p>
      </div>

      <div class="grid-cols-2" style="gap:16px;">
        ${formulas.map(f => `
          <div class="card" style="padding:20px;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--color-academic-blue); margin-bottom:4px;">
              ${f.subject_code} • ${f.subject_name}
            </div>
            <h3 class="h4" style="margin-bottom:10px;">${f.name}</h3>
            <div style="background:var(--color-surface-elevated); padding:14px; border-radius:var(--radius-md); font-size:1.15rem; margin-bottom:12px; text-align:center;">
              $$${f.latex}$$
            </div>
            <p class="text-secondary" style="font-size:0.84rem; margin:0;">${f.description || ''}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ===================================================================
  // 11. GATE PREPARATION
  // ===================================================================
  function renderGATEPreparation() {
    const container = document.getElementById('gate-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const gateSections = data.gate_me_syllabus || [];

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">GATE Mechanical Engineering Preparation</h1>
        <p class="text-secondary">Official 4-Section Curriculum Roadmap Mapped to TKMCE Semesters</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:20px;">
        ${gateSections.map(sec => `
          <div class="card" style="padding:22px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3 class="h3" style="margin:0;">${sec.name}</h3>
              <span class="badge badge-teal">${sec.weightage}</span>
            </div>
            <div class="grid-cols-2" style="gap:12px;">
              ${(sec.topics || []).map(top => `
                <div style="background:var(--color-surface-elevated); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--color-border);">
                  <div style="font-weight:600; font-size:0.92rem;">${top.name}</div>
                  <div class="badge badge-blue" style="font-size:0.72rem; margin:4px 0;">${top.tkm_status}</div>
                  <div class="text-secondary" style="font-size:0.8rem;">${top.syllabus}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ===================================================================
  // 12. BOOKMARKS & SAVED RESOURCES
  // ===================================================================
  function renderBookmarks() {
    const container = document.getElementById('bookmarks-content');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Saved Resources & Bookmarks</h1>
        <p class="text-secondary">Quick access to bookmarked modules, formulas, and questions</p>
      </div>
      <div class="card" style="padding:24px;">
        <p class="text-secondary">Save frequently revised chapters or tricky formulas to view them here.</p>
      </div>
    `;
  }

  // ===================================================================
  // 13. DOWNLOADS & OFFLINE APK
  // ===================================================================
  function renderDownloads() {
    const container = document.getElementById('downloads-content');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Offline Downloads & Android App</h1>
        <p class="text-secondary">Standalone Signed Android APK, PWA, and S4 Comprehensive Notes</p>
      </div>

      <div class="grid-cols-2" style="gap:16px; margin-bottom:24px;">
        <div class="card">
          <h3 class="h3" style="margin-bottom:8px;">📱 TKMCE Mechanical Android App</h3>
          <p class="text-secondary" style="font-size:0.88rem; margin-bottom:14px;">
            Install the signed standalone APK for completely offline studying without background data consumption.
          </p>
          <a href="./tkm_mech_portal.apk" download class="btn btn-primary">Download APK (225 KB) ⬇️</a>
        </div>

        <div class="card">
          <h3 class="h3" style="margin-bottom:8px;">⚡ Complete S4 Study Notes Volume</h3>
          <p class="text-secondary" style="font-size:0.88rem; margin-bottom:14px;">
            Consolidated 7-course volume compiled for fast end-semester exam revision.
          </p>
          <a href="./notes/TKMCE_S4_Study_Notes.pdf" download class="btn btn-primary">Download S4 Volume (508 KB) ⬇️</a>
        </div>
      </div>
    `;
  }

  // ===================================================================
  // 14. SETTINGS
  // ===================================================================
  function renderSettings() {
    const container = document.getElementById('settings-content');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Workspace Settings & Themes</h1>
        <p class="text-secondary">Configure typography, reading environment, and data backups</p>
      </div>

      <div class="card" style="max-width:680px; padding:24px;">
        <h3 class="h3" style="margin-bottom:14px;">Theme Environment</h3>
        <div style="display:flex; gap:10px; margin-bottom:24px;">
          <button class="btn ${AppState.theme === 'warm' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AppState.theme='warm'; initTheme();">Warm Paper (Default)</button>
          <button class="btn ${AppState.theme === 'light' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AppState.theme='light'; initTheme();">Academic Light</button>
          <button class="btn ${AppState.theme === 'dark' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AppState.theme='dark'; initTheme();">Dark Reading</button>
        </div>

        <h3 class="h3" style="margin-bottom:14px;">Data Management</h3>
        <p class="text-secondary" style="font-size:0.88rem; margin-bottom:14px;">All study history and planner tasks remain 100% private in local storage.</p>
        <button class="btn btn-secondary btn-sm" onclick="if(confirm('Clear local study history and tasks?')) { localStorage.clear(); location.reload(); }">Clear Local Data</button>
      </div>
    `;
  }

  // ===================================================================
  // 15. UNIVERSAL SEARCH (Ctrl+K)
  // ===================================================================
  function setupUniversalSearch() {
    const trigger = document.getElementById('global-search-trigger');
    const modal = document.getElementById('search-palette-modal');
    const input = document.getElementById('search-palette-input');
    const resultsContainer = document.getElementById('search-results-list');

    if (!trigger || !modal || !input) return;

    function openSearch() {
      modal.classList.add('active');
      setTimeout(() => input.focus(), 60);
    }

    function closeSearch() {
      modal.classList.remove('active');
      input.value = '';
    }

    trigger.addEventListener('click', openSearch);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeSearch();
      }
    });

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        resultsContainer.innerHTML = '<div class="search-group-title">Start typing to search curriculum & notes...</div>';
        return;
      }

      const data = window.MECH_DATA || {};
      const catalog = data.catalog_raw || [];
      const formulas = data.formulas || [];
      const pyqs = data.pyqs || [];

      const filteredCourses = catalog.filter(c => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)).slice(0, 5);
      const filteredFormulas = formulas.filter(f => f.name.toLowerCase().includes(q) || (f.description && f.description.toLowerCase().includes(q))).slice(0, 3);
      const filteredPyqs = pyqs.filter(p => p.title.toLowerCase().includes(q)).slice(0, 3);

      let html = '';
      if (filteredCourses.length > 0) {
        html += '<div class="search-group-title">Courses</div>';
        filteredCourses.forEach(c => {
          html += `
            <a href="#notes/${c.code}" class="search-result-item" onclick="document.getElementById('search-palette-modal').classList.remove('active')">
              <span class="badge badge-blue text-mono">${c.code}</span>
              <div>
                <div style="font-weight:600;">${c.title}</div>
                <div style="font-size:0.75rem; color:var(--color-text-secondary);">Semester ${c.semester} • ${c.type}</div>
              </div>
            </a>
          `;
        });
      }

      if (filteredFormulas.length > 0) {
        html += '<div class="search-group-title">Formulas</div>';
        filteredFormulas.forEach(f => {
          html += `
            <a href="#formulas" class="search-result-item" onclick="document.getElementById('search-palette-modal').classList.remove('active')">
              <span class="badge badge-teal">∑</span>
              <div>
                <div style="font-weight:600;">${f.name}</div>
                <div style="font-size:0.75rem; color:var(--color-text-secondary);">${f.subject_name}</div>
              </div>
            </a>
          `;
        });
      }

      resultsContainer.innerHTML = html || '<div class="search-group-title">No matching resources found.</div>';
    });
  }

  // Keyboard Shortcuts (Alt+P for Parking Lot)
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        toggleParkingLot();
      }
    });
  }

})();
