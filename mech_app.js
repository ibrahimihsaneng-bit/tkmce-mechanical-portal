/**
 * MECH TKMCE 2.0 — APPLICATION CONTROLLER & ROUTER
 * Handles navigation, state persistence, universal search, 
 * beginner foundation, semester catalog S1-S8, reading modes, 
 * study planner, exam center, and KaTeX rendering.
 */

(function() {
  'use strict';

  // Application State
  const AppState = {
    currentView: 'dashboard',
    selectedSemester: 'S4',
    selectedSubject: '24MET401',
    selectedModule: 'Module 1',
    readingMode: 'detailed', // detailed, short, exam, formulas
    fontSize: 16, // px
    theme: localStorage.getItem('mech_theme') || 'dark',
    bookmarks: JSON.parse(localStorage.getItem('mech_bookmarks') || '[]'),
    tasks: JSON.parse(localStorage.getItem('mech_tasks') || '[]'),
    timerMinutes: 25,
    timerSeconds: 0,
    timerRunning: false,
    timerInterval: null
  };

  // DOM Elements cache
  let views = {};

  // Initialize Application
  window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    cacheDOMElements();
    setupEventListeners();
    setupUniversalSearch();
    setupKeyboardShortcuts();
    setupPomodoro();
    
    // Hash Routing
    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  });

  // Theme Management
  function initTheme() {
    document.documentElement.setAttribute('data-theme', AppState.theme);
    updateThemeIcon();
  }

  function toggleTheme() {
    AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', AppState.theme);
    localStorage.setItem('mech_theme', AppState.theme);
    updateThemeIcon();
    if (AppState.currentView === 'lab') {
      renderActiveSimulation();
    }
  }

  function updateThemeIcon() {
    const iconBtn = document.getElementById('theme-toggle-btn');
    if (!iconBtn) return;
    if (AppState.theme === 'dark') {
      iconBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      iconBtn.setAttribute('title', 'Switch to Light Theme');
      iconBtn.setAttribute('aria-label', 'Switch to Light Theme');
    } else {
      iconBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      iconBtn.setAttribute('title', 'Switch to Dark Theme');
      iconBtn.setAttribute('aria-label', 'Switch to Dark Theme');
    }
  }

  // Cache views
  function cacheDOMElements() {
    const viewIds = ['dashboard', 'semesters', 'notes', 'pyqs', 'formulas', 'exams', 'planner', 'gate', 'lab', 'bookmarks', 'downloads', 'settings'];
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
  }

  function updateBreadcrumbs(viewName, parts) {
    const bcContainer = document.getElementById('app-breadcrumbs');
    if (!bcContainer) return;

    const names = {
      dashboard: 'Dashboard',
      semesters: 'Semesters',
      notes: 'Study Notes',
      pyqs: 'PYQ Vault',
      formulas: 'Formula Library',
      exams: 'Exam Centre',
      planner: 'Study Planner',
      gate: 'GATE Preparation',
      lab: 'Interactive Lab',
      bookmarks: 'Bookmarks',
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
  // 1. DASHBOARD
  // ===================================================================
  function renderDashboard() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const totalCatalog = data.catalog_raw ? data.catalog_raw.length : 61;
    const totalPYQs = data.pyqs ? data.pyqs.length : 38;
    const totalFormulas = data.formulas ? data.formulas.length : 11;
    const starterLessons = data.starter_lessons ? data.starter_lessons.slice(0, 4) : [];

    container.innerHTML = `
      <!-- Welcome Engineering Banner -->
      <div class="card" style="margin-bottom: var(--space-6); background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-elevated) 100%); border-left: 4px solid var(--color-academic-blue);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:var(--space-4);">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:var(--space-2);">
              <span class="badge badge-blue">Autonomous 2024 Scheme</span>
              <span class="badge badge-teal">TKM College of Engineering</span>
            </div>
            <h1 class="h1" style="margin-bottom:var(--space-2);">Welcome to MECH TKMCE 2.0</h1>
            <p class="text-secondary" style="max-width:680px; font-size:0.95rem;">
              The student-built Mechanical Engineering workspace for TKMCE Autonomous Scheme. 100% free forever, zero ads, no paywalls, unrestricted downloads, comprehensive S1–S8 syllabus, and verified physical simulations.
            </p>
          </div>
          <div style="display:flex; gap:var(--space-2);">
            <a href="#semesters" class="btn btn-primary">Browse S1–S8 &rarr;</a>
            <a href="#lab" class="btn btn-secondary">Interactive Lab</a>
          </div>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="grid-cols-4" style="margin-bottom: var(--space-6);">
        <div class="card" style="display:flex; align-items:center; gap:var(--space-4);">
          <div style="width:44px; height:44px; border-radius:var(--radius-md); background:var(--color-academic-blue-subtle); color:var(--color-academic-blue); display:flex; align-items:center; justify-content:center;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div>
            <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-mono);">${totalCatalog}</div>
            <div class="text-secondary" style="font-size:0.8rem;">Autonomous Courses (S1–S8)</div>
          </div>
        </div>

        <div class="card" style="display:flex; align-items:center; gap:var(--space-4);">
          <div style="width:44px; height:44px; border-radius:var(--radius-md); background:var(--color-technical-teal-subtle); color:var(--color-technical-teal); display:flex; align-items:center; justify-content:center;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div>
            <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-mono);">${totalPYQs}</div>
            <div class="text-secondary" style="font-size:0.8rem;">Past Question Papers</div>
          </div>
        </div>

        <div class="card" style="display:flex; align-items:center; gap:var(--space-4);">
          <div style="width:44px; height:44px; border-radius:var(--radius-md); background:var(--color-warning-subtle); color:var(--color-warning); display:flex; align-items:center; justify-content:center;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <div>
            <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-mono);">${totalFormulas}</div>
            <div class="text-secondary" style="font-size:0.8rem;">Formulas in KaTeX</div>
          </div>
        </div>

        <div class="card" style="display:flex; align-items:center; gap:var(--space-4);">
          <div style="width:44px; height:44px; border-radius:var(--radius-md); background:var(--color-success-subtle); color:var(--color-success); display:flex; align-items:center; justify-content:center;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-mono);">100%</div>
            <div class="text-secondary" style="font-size:0.8rem;">Free • No Ads</div>
          </div>
        </div>
      </div>

      <!-- Beginner Foundation Track ("Start from Zero") -->
      <div class="card" style="margin-bottom:var(--space-8); border:1px solid rgba(37, 99, 235, 0.3); background:var(--color-surface-elevated);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-3); flex-wrap:wrap; gap:8px;">
          <div>
            <span class="badge badge-teal">Beginner Learning Track</span>
            <h2 class="h3" style="margin-top:4px;">🌱 Start from Zero — Mechanical Engineering Foundations</h2>
          </div>
          <span class="text-secondary" style="font-size:0.8rem;">Essential skills for 1st & 2nd year students</span>
        </div>
        <p class="text-secondary" style="font-size:0.88rem; margin-bottom:var(--space-4);">
          Master units, free-body diagrams, and mechanics fundamentals with worked numerical examples and original engineering diagrams before diving into core syllabus modules.
        </p>

        <div class="grid-cols-4">
          ${starterLessons.map(l => `
            <a href="#notes/FOUNDATION/${encodeURIComponent(l.title)}" class="card" style="text-decoration:none; color:inherit; background:var(--color-surface); padding:var(--space-4); display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <span class="badge badge-blue text-mono" style="margin-bottom:6px;">${l.id.toUpperCase()}</span>
                <h4 class="h4" style="margin-bottom:6px; font-size:0.92rem;">${l.title}</h4>
              </div>
              <div class="text-secondary" style="font-size:0.75rem; margin-top:8px;">Open Foundation Lesson &rarr;</div>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Quick Semester Jump Grid (S1 to S8) -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);">
        <h2 class="h2">Academic Semesters (S1 – S8)</h2>
        <span class="text-secondary" style="font-size:0.85rem;">Official 2024 Autonomous Curriculum</span>
      </div>
      <div class="grid-cols-4" style="margin-bottom:var(--space-8);">
        ${['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'].map(s => {
          const sNum = parseInt(s.replace('S', ''));
          const coursesInSem = (data.catalog_raw || []).filter(c => c.semester === sNum).length;
          const hasDetailed = ['S3', 'S4', 'S5', 'S6', 'S7'].includes(s);
          return `
            <a href="#semesters/${s}" class="card" style="text-decoration:none; color:inherit; display:flex; flex-direction:column; justify-content:space-between; height:125px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-family:var(--font-heading); font-size:1.4rem; font-weight:800; color:var(--color-academic-blue);">${s}</span>
                ${hasDetailed ? '<span class="badge badge-teal">Full Syllabus</span>' : '<span class="badge">Catalog</span>'}
              </div>
              <div style="margin-top:auto;">
                <div style="font-size:0.84rem; font-weight:600; color:var(--color-text-primary);">Semester ${sNum}</div>
                <div class="text-secondary" style="font-size:0.75rem;">${coursesInSem} Registered Courses &rarr;</div>
              </div>
            </a>
          `;
        }).join('')}
      </div>

      <!-- Academic Workspaces Row -->
      <div class="grid-cols-3">
        <div class="card">
          <h3 class="h3" style="margin-bottom:var(--space-2);">📖 Study Notes Reader</h3>
          <p class="text-secondary" style="font-size:0.88rem; margin-bottom:var(--space-4);">
            Multi-mode reading workspace: Detailed study, 2-minute short summaries, exam derivations, and technical vector SVGs across 95 autonomous modules.
          </p>
          <a href="#notes/24MET401" class="btn btn-secondary btn-sm">Open Study Notes &rarr;</a>
        </div>

        <div class="card">
          <h3 class="h3" style="margin-bottom:var(--space-2);">📚 PYQ Vault 2.0</h3>
          <p class="text-secondary" style="font-size:0.88rem; margin-bottom:var(--space-4);">
            Filter 38+ past series and end-semester question papers with step-by-step model solutions. Fast PDF previews and unrestricted downloads.
          </p>
          <a href="#pyqs" class="btn btn-secondary btn-sm">Explore PYQs &rarr;</a>
        </div>

        <div class="card">
          <h3 class="h3" style="margin-bottom:var(--space-2);">⚙️ Interactive Lab</h3>
          <p class="text-secondary" style="font-size:0.88rem; margin-bottom:var(--space-4);">
            Verified physical simulations: Mohr's circle stress analysis, thermodynamic cycles, venturi Bernoulli flow, and beam deflection calculators.
          </p>
          <a href="#lab" class="btn btn-secondary btn-sm">Launch Simulations &rarr;</a>
        </div>
      </div>
    `;
  }

  // ===================================================================
  // 2. SEMESTERS VIEW (Full S1–S8 Catalog + Detailed Autonomous Modules)
  // ===================================================================
  function renderSemesters() {
    const container = document.getElementById('semesters-content');
    if (!container) return;

    const currentSem = AppState.selectedSemester;
    const sNum = parseInt(currentSem.replace('S', ''));
    const data = window.MECH_DATA || {};
    const semInfo = data.curriculum ? data.curriculum[currentSem] : null;

    const catalogList = (data.catalog_raw || []).filter(c => c.semester === sNum);
    const detailedSubjs = semInfo ? semInfo.detailed_subjects : {};

    let contentHtml = '';

    contentHtml += `
      <div style="margin-bottom:var(--space-4); display:flex; justify-content:space-between; align-items:center;">
        <h2 class="h3">${currentSem} Course Catalog (${catalogList.length} Courses)</h2>
        <span class="badge badge-blue">TKMCE 2024 Scheme Table</span>
      </div>

      <div class="grid-cols-2" style="margin-bottom:var(--space-8);">
        ${catalogList.map(c => {
          const typeBadge = c.type === 'integrated' ? '<span class="badge badge-teal">Integrated (Theory + Lab)</span>' : 
                           c.type === 'lab' ? '<span class="badge">Practical / Lab</span>' : '<span class="badge">Theory</span>';
          const eseBadge = c.ese ? `<span class="badge badge-warning">ESE: ${c.ese} Marks</span>` : '';
          const hasNotes = detailedSubjs && detailedSubjs[c.code];
          
          return `
            <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-2); flex-wrap:wrap; gap:4px;">
                  <span class="badge badge-blue text-mono">${c.code}</span>
                  <div style="display:flex; gap:4px;">
                    ${typeBadge}
                    ${eseBadge}
                  </div>
                </div>
                <h3 class="h3" style="margin-bottom:var(--space-2);">${c.title}</h3>
                <div class="text-secondary" style="font-size:0.8rem; margin-bottom:var(--space-4);">
                  Curriculum Source: Page ${c.sourcePage || 13} of TKMCE 2024 Scheme Specification
                </div>
              </div>
              <div style="display:flex; gap:var(--space-2); margin-top:auto; border-top:1px solid var(--color-border-subtle); padding-top:var(--space-3); flex-wrap:wrap;">
                ${hasNotes ? `<a href="#notes/${c.code}" class="btn btn-primary btn-sm">Study Notes &rarr;</a>` : ''}
                <a href="https://www.google.com/search?q=${encodeURIComponent('TKMCE ' + c.code + ' ' + c.title)}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">🔍 Research</a>
                <a href="#pyqs" class="btn btn-secondary btn-sm">Question Papers</a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // If detailed module syllabus exists for S3, S4, S5, S6, S7
    if (detailedSubjs && Object.keys(detailedSubjs).length > 0) {
      contentHtml += `
        <div style="border-top:1px solid var(--color-border); padding-top:var(--space-6); margin-top:var(--space-6);">
          <div style="margin-bottom:var(--space-4);">
            <span class="badge badge-teal">Autonomous Syllabus Breakdown</span>
            <h2 class="h2" style="margin-top:4px;">Core Department Subjects & Module Syllabus</h2>
          </div>

          <div class="grid-cols-2">
            ${Object.entries(detailedSubjs).map(([code, s]) => {
              const modCount = s.modules ? Object.keys(s.modules).length : 5;
              return `
                <div class="card">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-2);">
                    <span class="badge badge-blue text-mono">Slot ${s.slot || 'A'}: ${code}</span>
                    <span class="badge">${s.credits || 4} Credits</span>
                  </div>
                  <h3 class="h3" style="margin-bottom:var(--space-2);">${s.name}</h3>
                  <div class="text-secondary" style="font-size:0.84rem; margin-bottom:var(--space-4);">
                    ${modCount} Modules • Syllabus Verified from Autonomous Document
                  </div>
                  <div style="display:flex; gap:var(--space-2);">
                    <a href="#notes/${code}" class="btn btn-primary btn-sm">Open Study Notes &rarr;</a>
                    <a href="https://mechtkmce.vercel.app/tkm_syllabus_2024.pdf" target="_blank" class="btn btn-secondary btn-sm">View Official PDF 📄</a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-6); flex-wrap:wrap; gap:var(--space-4);">
        <div>
          <h1 class="h1">Semester ${sNum} Curriculum</h1>
          <p class="text-secondary">TKMCE Autonomous Scheme • Department of Mechanical Engineering</p>
        </div>
        <!-- Semester Switcher Pills -->
        <div style="display:flex; gap:4px; background:var(--color-surface); padding:4px; border-radius:var(--radius-lg); border:1px solid var(--color-border); overflow-x:auto;">
          ${['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'].map(s => `
            <a href="#semesters/${s}" class="btn btn-sm ${s === currentSem ? 'btn-primary' : 'btn-secondary'}" style="border:none;">${s}</a>
          `).join('')}
        </div>
      </div>

      ${contentHtml}
    `;
  }

  // ===================================================================
  // 3. STUDY NOTES WORKSPACE (Starter Foundation + 19 Subjects with 95 Modules)
  // ===================================================================
  function renderStudyNotes() {
    const container = document.getElementById('notes-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const notesData = data.notes || {};
    const starterLessons = data.starter_lessons || [];
    const currSubj = AppState.selectedSubject;

    // Check if current subject is FOUNDATION or starter lesson
    const isStarter = currSubj === 'FOUNDATION' || starterLessons.some(l => l.title === AppState.selectedModule);

    let readingContent = '';
    let currTitle = '';
    let diagramHtml = '';

    if (isStarter) {
      const lesson = starterLessons.find(l => l.title === AppState.selectedModule) || starterLessons[0];
      currTitle = lesson.title;

      if (lesson.diagram) {
        diagramHtml = `
          <div style="background:var(--color-surface-elevated); border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:24px; margin-bottom:24px; text-align:center; overflow-x:auto;">
            <img src="./${lesson.diagram}" alt="${lesson.title} Diagram" style="max-width:100%; height:auto; max-height:260px;">
            <div style="font-size:0.75rem; color:var(--color-text-tertiary); margin-top:8px;">Figure: ${lesson.title} • Original Engineering SVG Illustration</div>
          </div>
        `;
      }

      readingContent = `
        <div style="background:var(--color-academic-blue-subtle); border-left:4px solid var(--color-academic-blue); padding:14px; border-radius:var(--radius-md); margin-bottom:20px;">
          <div style="font-size:0.75rem; font-weight:700; color:var(--color-academic-blue); text-transform:uppercase;">Beginner Foundation Lesson</div>
          <div style="font-size:0.85rem; color:var(--color-text-secondary); margin-top:2px;">Status: ${lesson.status || 'Draft learning material'}</div>
        </div>

        ${(lesson.sections || []).map(sec => `
          <div style="margin-bottom:24px;">
            <h4 class="h4" style="color:var(--color-text-primary); margin-bottom:8px;">${sec.heading}</h4>
            <p style="color:var(--color-text-secondary); line-height:1.7; margin:0;">${sec.text}</p>
          </div>
        `).join('')}

        ${lesson.worked_example ? `
          <div class="card card-elevated" style="margin-top:24px; border-left:4px solid var(--color-technical-teal);">
            <h4 class="h4" style="color:var(--color-technical-teal); margin-bottom:10px;">💡 Worked Numerical Example</h4>
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:6px;">Problem:</div>
            <p style="font-size:0.88rem; color:var(--color-text-secondary); margin-bottom:12px;">${lesson.worked_example.problem}</p>
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:6px;">Step-by-Step Solution:</div>
            <div style="font-size:0.88rem; color:var(--color-text-secondary); line-height:1.7;">
              ${(lesson.worked_example.solution || []).map(step => `<div>• ${step}</div>`).join('')}
            </div>
          </div>
        ` : ''}

        ${lesson.practice_problem ? `
          <div class="card card-elevated" style="margin-top:24px; border-left:4px solid var(--color-warning);">
            <h4 class="h4" style="color:var(--color-warning); margin-bottom:10px;">📝 Practice Challenge</h4>
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:6px;">Question:</div>
            <p style="font-size:0.88rem; color:var(--color-text-secondary); margin-bottom:12px;">${lesson.practice_problem.question}</p>
            <div style="font-size:0.84rem; color:var(--color-text-tertiary);">
              <strong>Final Answer Check:</strong> ${lesson.practice_problem.answer}
            </div>
          </div>
        ` : ''}
      `;
    } else {
      // 19 core subjects
      const subjData = notesData[currSubj] || notesData['24MET401'];
      const modules = subjData ? subjData.modules : {};
      const currMod = AppState.selectedModule in modules ? AppState.selectedModule : Object.keys(modules)[0];
      const modData = modules[currMod] || {};
      currTitle = `${currMod}: ${modData.title || ''}`;

      if (modData.diagram_svg) {
        diagramHtml = `
          <div style="background:var(--color-surface-elevated); border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:20px; margin-bottom:24px; text-align:center; overflow-x:auto;">
            ${modData.diagram_svg}
            <div style="font-size:0.75rem; color:var(--color-text-tertiary); margin-top:8px;">Figure: Precision Mechanical Engineering Vector Diagram • Autonomous 2024 Scheme</div>
          </div>
        `;
      }

      if (AppState.readingMode === 'detailed') {
        readingContent = modData.detailed_notes || '<p>Detailed study content being loaded...</p>';
      } else if (AppState.readingMode === 'short') {
        readingContent = `
          <div style="background:var(--color-academic-blue-subtle); border-left:4px solid var(--color-academic-blue); padding:16px; border-radius:var(--radius-md); margin-bottom:16px;">
            <h4 style="color:var(--color-academic-blue); margin-bottom:6px;">⚡ High-Yield 2-Minute Summary</h4>
            <p style="font-size:0.9rem; color:var(--color-text-secondary); margin:0;">Quick revision points for rapid recall before class or internal series tests.</p>
          </div>` + (modData.short_notes || '');
      } else if (AppState.readingMode === 'exam') {
        readingContent = `
          <div style="background:var(--color-warning-subtle); border-left:4px solid var(--color-warning); padding:16px; border-radius:var(--radius-md); margin-bottom:16px;">
            <h4 style="color:var(--color-warning); margin-bottom:6px;">🎯 Key Exam Derivations & Criteria</h4>
            <p style="font-size:0.9rem; color:var(--color-text-secondary); margin:0;">Exam-focused formulas, assumptions, and critical scoring concepts.</p>
          </div>` + (modData.short_notes || '') + (modData.detailed_notes || '');
      }
    }

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4); flex-wrap:wrap; gap:var(--space-3);">
        <div>
          <span class="badge badge-blue text-mono">${isStarter ? 'FOUNDATION' : currSubj}</span>
          <h1 class="h2" style="margin-top:4px;">${isStarter ? 'Beginner Foundation Track' : (notesData[currSubj] ? notesData[currSubj].name : 'Mechanics of Deformable Solids')}</h1>
        </div>
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <!-- Reading Mode Switcher -->
          <div style="display:flex; background:var(--color-surface); padding:3px; border-radius:var(--radius-md); border:1px solid var(--color-border);">
            <button class="btn btn-sm ${AppState.readingMode === 'detailed' ? 'btn-primary' : 'btn-secondary'}" onclick="setReadingMode('detailed')" style="border:none;">Detailed</button>
            <button class="btn btn-sm ${AppState.readingMode === 'short' ? 'btn-primary' : 'btn-secondary'}" onclick="setReadingMode('short')" style="border:none;">Short</button>
            <button class="btn btn-sm ${AppState.readingMode === 'exam' ? 'btn-primary' : 'btn-secondary'}" onclick="setReadingMode('exam')" style="border:none;">Exam Mode</button>
          </div>
          <!-- Font Controls -->
          <button class="icon-action-btn" onclick="adjustFontSize(-1)" title="Decrease font size">A-</button>
          <button class="icon-action-btn" onclick="adjustFontSize(1)" title="Increase font size">A+</button>
          <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨️ Print</button>
        </div>
      </div>

      <!-- Navigation & Reader Grid -->
      <div style="display:grid; grid-template-columns: 260px 1fr; gap:var(--space-6);">
        <!-- Sidebar Navigation -->
        <div>
          <div class="card" style="padding:var(--space-3);">
            <div class="sidebar-section-label">Beginner Foundation</div>
            ${starterLessons.slice(0, 4).map(l => `
              <a href="#notes/FOUNDATION/${encodeURIComponent(l.title)}" class="nav-item ${AppState.selectedModule === l.title ? 'active' : ''}">
                <span class="nav-item-text" style="font-size:0.82rem;">${l.title}</span>
              </a>
            `).join('')}

            <div class="sidebar-section-label" style="margin-top:16px;">Core Modules (S4–S7)</div>
            ${!isStarter && notesData[currSubj] ? Object.keys(notesData[currSubj].modules).map(modKey => `
              <a href="#notes/${currSubj}/${encodeURIComponent(modKey)}" class="nav-item ${modKey === AppState.selectedModule ? 'active' : ''}">
                <span class="nav-item-text">${modKey}</span>
              </a>
            `).join('') : `
              <a href="#notes/24MET401" class="btn btn-secondary btn-sm" style="width:100%; margin-top:8px;">Load 24MET401 Modules &rarr;</a>
            `}

            <div class="sidebar-section-label" style="margin-top:16px;">Select Subject</div>
            ${Object.keys(notesData).slice(0, 6).map(cCode => `
              <a href="#notes/${cCode}" class="nav-item ${cCode === currSubj ? 'active' : ''}">
                <span class="nav-item-text text-mono" style="font-size:0.75rem;">${cCode}</span>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Note Reading Card -->
        <div class="card" style="font-size:${AppState.fontSize}px; line-height:1.7;">
          <div style="border-bottom:1px solid var(--color-border); padding-bottom:12px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
            <h3 class="h3">${currTitle}</h3>
            <button class="btn btn-secondary btn-sm" onclick="toggleBookmark('note', '${currSubj}-${AppState.selectedModule}', '${currSubj} ${currTitle}')">
              ⭐ Bookmark
            </button>
          </div>

          <!-- Vector Diagram -->
          ${diagramHtml}

          <!-- Body Content -->
          <div class="note-body-content">
            ${readingContent}
          </div>
        </div>
      </div>
    `;

    // Render KaTeX Math
    if (window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }
  }

  window.setReadingMode = function(mode) {
    AppState.readingMode = mode;
    renderStudyNotes();
  };

  window.adjustFontSize = function(delta) {
    AppState.fontSize = Math.min(24, Math.max(13, AppState.fontSize + delta));
    renderStudyNotes();
  };

  // ===================================================================
  // 4. PYQ VAULT 2.0
  // ===================================================================
  function renderPYQVault() {
    const container = document.getElementById('pyqs-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const pyqs = data.pyqs || [];

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">PYQ Vault 2.0</h1>
        <p class="text-secondary">Official Past Year Question Papers & University Step-by-Step Solutions • TKMCE Mechanical</p>
      </div>

      <!-- Filters Toolbar -->
      <div class="card" style="margin-bottom:var(--space-6); display:flex; gap:var(--space-4); flex-wrap:wrap; align-items:center;">
        <div>
          <label style="font-size:0.75rem; font-weight:700; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Filter by Semester</label>
          <select id="pyq-sem-filter" class="btn btn-secondary btn-sm" onchange="filterPYQs()">
            <option value="ALL">All Semesters</option>
            <option value="S3">S3</option>
            <option value="S4">S4</option>
            <option value="S5">S5</option>
          </select>
        </div>
        <div>
          <label style="font-size:0.75rem; font-weight:700; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Exam Category</label>
          <select id="pyq-cat-filter" class="btn btn-secondary btn-sm" onchange="filterPYQs()">
            <option value="ALL">All Examinations</option>
            <option value="Series Exam">Series Tests (Internal)</option>
            <option value="End Semester">End Semester Examination</option>
          </select>
        </div>
        <div style="margin-left:auto;">
          <label style="font-size:0.75rem; font-weight:700; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Search Question Papers</label>
          <input type="text" id="pyq-search-box" placeholder="Search by subject or course code..." onkeyup="filterPYQs()" style="padding:6px 12px; border-radius:var(--radius-md); border:1px solid var(--color-border); background:var(--color-surface); color:var(--color-text-primary); font-size:0.85rem; width:260px;">
        </div>
      </div>

      <!-- Papers Grid -->
      <div id="pyqs-grid-container" class="grid-cols-3">
        ${pyqs.map(p => `
          <div class="card pyq-card-item" data-sem="${p.semester}" data-cat="${p.exam_type}" data-title="${p.title} ${p.subject} ${p.code}">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-2);">
              <span class="badge badge-blue">${p.semester}</span>
              <span class="badge">${p.exam_type}</span>
            </div>
            <h3 class="h4" style="margin-bottom:var(--space-1);">${p.subject}</h3>
            <div class="text-mono text-secondary" style="font-size:0.75rem; margin-bottom:var(--space-3);">${p.code}</div>
            <div style="font-size:0.8rem; color:var(--color-text-tertiary); margin-bottom:var(--space-4);">
              File: ${p.title} (${p.size_kb} KB)
            </div>
            <div style="display:flex; gap:var(--space-2); margin-top:auto;">
              <a href="${p.url}" target="_blank" class="btn btn-primary btn-sm" style="flex:1;">View PDF &rarr;</a>
              <a href="${p.url}" download class="btn btn-secondary btn-sm" title="Download">⬇️</a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.filterPYQs = function() {
    const sem = document.getElementById('pyq-sem-filter').value;
    const cat = document.getElementById('pyq-cat-filter').value;
    const query = document.getElementById('pyq-search-box').value.toLowerCase();

    document.querySelectorAll('.pyq-card-item').forEach(card => {
      const cSem = card.getAttribute('data-sem');
      const cCat = card.getAttribute('data-cat');
      const cTitle = card.getAttribute('data-title').toLowerCase();

      const matchSem = sem === 'ALL' || cSem === sem;
      const matchCat = cat === 'ALL' || cCat.includes(cat);
      const matchQuery = !query || cTitle.includes(query);

      if (matchSem && matchCat && matchQuery) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // ===================================================================
  // 5. FORMULA LIBRARY
  // ===================================================================
  function renderFormulaLibrary() {
    const container = document.getElementById('formulas-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const formulas = data.formulas || [];

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Formula Library</h1>
        <p class="text-secondary">Searchable Mechanical Engineering Formula Database with KaTeX & SI Units</p>
      </div>

      <!-- Formula Cards Grid -->
      <div class="grid-cols-2" id="formulas-grid">
        ${formulas.map(f => `
          <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-2);">
              <span class="badge badge-teal">${f.category}</span>
              <span class="text-mono text-secondary" style="font-size:0.75rem;">${f.code} • ${f.module}</span>
            </div>
            <h3 class="h3" style="margin-bottom:var(--space-3);">${f.name}</h3>

            <!-- Formula Display Box -->
            <div style="background:var(--color-surface-elevated); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:16px; margin-bottom:var(--space-3); text-align:center; font-size:1.15rem;">
              $$${f.latex}$$
            </div>

            <!-- Variables Table -->
            <div style="margin-bottom:var(--space-3);">
              <div style="font-size:0.75rem; font-weight:700; color:var(--color-text-secondary); text-transform:uppercase; margin-bottom:6px;">Variables & SI Units:</div>
              <ul style="padding-left:18px; font-size:0.84rem; color:var(--color-text-secondary); line-height:1.6;">
                ${f.variables.map(v => `
                  <li><strong>$${v.symbol}$</strong>: ${v.meaning} (<em>${v.unit}</em>)</li>
                `).join('')}
              </ul>
            </div>

            <div style="font-size:0.8rem; color:var(--color-text-tertiary); border-top:1px solid var(--color-border-subtle); padding-top:8px;">
              <strong>Assumptions:</strong> ${f.assumptions}
            </div>
          </div>
        `).join('')}
      </div>
    `;

    if (window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }
  }

  // ===================================================================
  // 6. EXAM CENTRE
  // ===================================================================
  function renderExamCentre() {
    const container = document.getElementById('exams-content');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Exam Centre</h1>
        <p class="text-secondary">Revision Checklists, Exam Countdown, and High-Yield Problem Sets</p>
      </div>

      <div class="grid-cols-3" style="margin-bottom:var(--space-6);">
        <div class="card" style="border-left:4px solid var(--color-academic-blue);">
          <h3 class="h4" style="margin-bottom:8px;">⏱️ Next Autonomous Series Exam</h3>
          <div style="font-size:1.6rem; font-weight:800; font-family:var(--font-mono); color:var(--color-academic-blue); margin-bottom:4px;">14 Days</div>
          <div class="text-secondary" style="font-size:0.8rem;">Target: Series Exam 2 • 2024 Scheme</div>
        </div>

        <div class="card" style="border-left:4px solid var(--color-warning);">
          <h3 class="h4" style="margin-bottom:8px;">🎯 High-Yield Derivations</h3>
          <div style="font-size:1.6rem; font-weight:800; font-family:var(--font-mono); color:var(--color-warning); margin-bottom:4px;">18 Topics</div>
          <div class="text-secondary" style="font-size:0.8rem;">Euler column, Mohr circle, Merchant, Bernoulli</div>
        </div>

        <div class="card" style="border-left:4px solid var(--color-success);">
          <h3 class="h4" style="margin-bottom:8px;">✅ Practice Completion</h3>
          <div style="font-size:1.6rem; font-weight:800; font-family:var(--font-mono); color:var(--color-success); margin-bottom:4px;">8 / 22 Solved</div>
          <div class="text-secondary" style="font-size:0.8rem;">Model university numericals reviewed</div>
        </div>
      </div>

      <div class="card">
        <h3 class="h3" style="margin-bottom:var(--space-3);">High-Frequency University Exam Questions</h3>
        <p class="text-secondary" style="font-size:0.88rem; margin-bottom:var(--space-4);">
          Reviewed from past 5 years of TKMCE Autonomous and KTU University examination cycles:
        </p>

        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="padding:12px; background:var(--color-surface-elevated); border-radius:var(--radius-md); border:1px solid var(--color-border);">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span class="badge badge-blue">24MET401 • 10 Marks</span>
              <span class="badge badge-warning">Frequently Asked</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; margin-bottom:6px;">Derivation of Euler's Buckling Formula for Column with Both Ends Hinged.</div>
            <p class="text-secondary" style="font-size:0.82rem; margin:0;">Includes assumptions, differential equation of deflection curve, and effective length concepts.</p>
          </div>

          <div style="padding:12px; background:var(--color-surface-elevated); border-radius:var(--radius-md); border:1px solid var(--color-border);">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span class="badge badge-blue">24MEP305 • 10 Marks</span>
              <span class="badge badge-warning">Frequently Asked</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; margin-bottom:6px;">Bernoulli's Equation from Euler's Equation of Motion along a Streamline.</div>
            <p class="text-secondary" style="font-size:0.82rem; margin:0;">Detailed integration of pressure, gravity, and acceleration along a frictionless streamline.</p>
          </div>
        </div>
      </div>
    `;
  }

  // ===================================================================
  // 7. STUDY PLANNER & POMODORO
  // ===================================================================
  function renderStudyPlanner() {
    const container = document.getElementById('planner-content');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Study Planner & Focus Workspace</h1>
        <p class="text-secondary">Pomodoro Timer, Task Management, and Revision Targets</p>
      </div>

      <div style="display:grid; grid-template-columns: 340px 1fr; gap:var(--space-6);">
        <!-- Pomodoro Timer Card -->
        <div class="card" style="text-align:center;">
          <h3 class="h3" style="margin-bottom:var(--space-4);">Engineering Focus Timer</h3>
          <div id="pomodoro-display" style="font-size:3.5rem; font-weight:800; font-family:var(--font-mono); color:var(--color-academic-blue); margin-bottom:var(--space-4);">
            25:00
          </div>
          <div style="display:flex; justify-content:center; gap:var(--space-2); margin-bottom:var(--space-4);">
            <button class="btn btn-primary" id="pomodoro-start-btn" onclick="togglePomodoro()">Start Focus</button>
            <button class="btn btn-secondary" onclick="resetPomodoro()">Reset</button>
          </div>
          <div class="text-secondary" style="font-size:0.8rem;">
            25 min focused study • 5 min engineering rest interval
          </div>
        </div>

        <!-- Task Checklist Card -->
        <div class="card">
          <h3 class="h3" style="margin-bottom:var(--space-3);">Daily Learning Targets</h3>
          <div style="display:flex; gap:8px; margin-bottom:var(--space-4);">
            <input type="text" id="new-task-input" placeholder="e.g., Complete Mohr's circle numericals..." style="flex:1; padding:8px 12px; border-radius:var(--radius-md); border:1px solid var(--color-border); background:var(--color-surface); color:var(--color-text-primary); font-size:0.88rem;">
            <button class="btn btn-primary btn-sm" onclick="addTask()">Add Task</button>
          </div>

          <div id="tasks-list" style="display:flex; flex-direction:column; gap:8px;">
            ${AppState.tasks.length === 0 ? '<div class="text-secondary" style="font-size:0.88rem; text-align:center; padding:16px;">No study tasks added yet. Add your first goal above!</div>' : ''}
            ${AppState.tasks.map((t, idx) => `
              <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--color-surface-elevated); border-radius:var(--radius-md); border:1px solid var(--color-border);">
                <label style="display:flex; align-items:center; gap:8px; font-size:0.88rem; cursor:pointer;">
                  <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask(${idx})">
                  <span style="${t.done ? 'text-decoration:line-through; opacity:0.6;' : ''}">${t.text}</span>
                </label>
                <button onclick="removeTask(${idx})" style="background:none; border:none; color:var(--color-text-tertiary); cursor:pointer;">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function setupPomodoro() {
    window.togglePomodoro = function() {
      const btn = document.getElementById('pomodoro-start-btn');
      if (AppState.timerRunning) {
        clearInterval(AppState.timerInterval);
        AppState.timerRunning = false;
        if (btn) btn.innerText = 'Resume Focus';
      } else {
        AppState.timerRunning = true;
        if (btn) btn.innerText = 'Pause';
        AppState.timerInterval = setInterval(() => {
          if (AppState.timerSeconds === 0) {
            if (AppState.timerMinutes === 0) {
              clearInterval(AppState.timerInterval);
              AppState.timerRunning = false;
              alert('Pomodoro completed! Take a 5-minute break.');
              resetPomodoro();
              return;
            }
            AppState.timerMinutes--;
            AppState.timerSeconds = 59;
          } else {
            AppState.timerSeconds--;
          }
          updatePomodoroDisplay();
        }, 1000);
      }
    };

    window.resetPomodoro = function() {
      clearInterval(AppState.timerInterval);
      AppState.timerRunning = false;
      AppState.timerMinutes = 25;
      AppState.timerSeconds = 0;
      updatePomodoroDisplay();
      const btn = document.getElementById('pomodoro-start-btn');
      if (btn) btn.innerText = 'Start Focus';
    };

    function updatePomodoroDisplay() {
      const display = document.getElementById('pomodoro-display');
      if (!display) return;
      const m = String(AppState.timerMinutes).padStart(2, '0');
      const s = String(AppState.timerSeconds).padStart(2, '0');
      display.innerText = `${m}:${s}`;
    }

    window.addTask = function() {
      const input = document.getElementById('new-task-input');
      if (!input || !input.value.trim()) return;
      AppState.tasks.push({ text: input.value.trim(), done: false });
      localStorage.setItem('mech_tasks', JSON.stringify(AppState.tasks));
      renderStudyPlanner();
    };

    window.toggleTask = function(idx) {
      if (AppState.tasks[idx]) {
        AppState.tasks[idx].done = !AppState.tasks[idx].done;
        localStorage.setItem('mech_tasks', JSON.stringify(AppState.tasks));
        renderStudyPlanner();
      }
    };

    window.removeTask = function(idx) {
      AppState.tasks.splice(idx, 1);
      localStorage.setItem('mech_tasks', JSON.stringify(AppState.tasks));
      renderStudyPlanner();
    };
  }

  // ===================================================================
  // 8. GATE PREPARATION
  // ===================================================================
  function renderGATEPreparation() {
    const container = document.getElementById('gate-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const gate = data.gate;
    if (!gate) return;

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <span class="badge badge-blue">Graduate Aptitude Test in Engineering</span>
        <h1 class="h1" style="margin-top:4px;">GATE Mechanical Engineering Preparation</h1>
        <p class="text-secondary">Official GATE ME Syllabus & Curriculum Mapping to TKMCE Autonomous Course Codes</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:var(--space-6);">
        ${gate.sections.map(sec => `
          <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4); border-bottom:1px solid var(--color-border); padding-bottom:8px;">
              <h2 class="h2">${sec.name}</h2>
              <span class="badge badge-warning text-mono">${sec.weightage}</span>
            </div>

            <div class="grid-cols-2">
              ${sec.topics.map(t => `
                <div style="background:var(--color-surface-elevated); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:16px;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <h3 class="h4">${t.name}</h3>
                    <span class="badge badge-teal">${t.tkm_status}</span>
                  </div>
                  <div class="text-mono text-secondary" style="font-size:0.75rem; margin-bottom:8px;">Course: ${t.mapped_code}</div>
                  <p class="text-secondary" style="font-size:0.84rem; line-height:1.5; margin:0;">${t.syllabus}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ===================================================================
  // 9. INTERACTIVE ENGINEERING LAB
  // ===================================================================
  function renderInteractiveLab() {
    const container = document.getElementById('lab-content');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Interactive Engineering Simulation Lab</h1>
        <p class="text-secondary">Verified Physical Simulations with Live Mathematical Parameter Feedback</p>
      </div>

      <div class="grid-cols-2">
        <!-- 1. Mohr's Circle -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
            <h3 class="h3">Mohr's Circle (2D Plane Stress)</h3>
            <span class="badge badge-blue">Strength of Materials</span>
          </div>
          <canvas id="canvas-mohr" width="480" height="260" style="width:100%; height:260px; background:var(--color-surface-elevated); border-radius:var(--radius-md); border:1px solid var(--color-border); margin-bottom:12px;"></canvas>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:12px;">
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">σ_x: <span id="val-sx">80</span> MPa</label>
              <input type="range" id="slider-sx" min="-100" max="150" value="80" style="width:100%;" oninput="updateMohrSim()">
            </div>
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">σ_y: <span id="val-sy">-40</span> MPa</label>
              <input type="range" id="slider-sy" min="-100" max="150" value="-40" style="width:100%;" oninput="updateMohrSim()">
            </div>
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">τ_xy: <span id="val-txy">30</span> MPa</label>
              <input type="range" id="slider-txy" min="0" max="80" value="30" style="width:100%;" oninput="updateMohrSim()">
            </div>
          </div>
          <div id="mohr-results" style="font-family:var(--font-mono); font-size:0.8rem; background:var(--color-surface-elevated); padding:8px; border-radius:var(--radius-sm); color:var(--color-text-primary);">
            σ1 = 87.2 MPa | σ2 = -47.2 MPa | τmax = 67.2 MPa
          </div>
        </div>

        <!-- 2. Thermodynamic Cycle -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
            <h3 class="h3">Thermodynamic P-V Cycle</h3>
            <span class="badge badge-teal">Thermodynamics</span>
          </div>
          <canvas id="canvas-cycle" width="480" height="260" style="width:100%; height:260px; background:var(--color-surface-elevated); border-radius:var(--radius-md); border:1px solid var(--color-border); margin-bottom:12px;"></canvas>
          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:8px; margin-bottom:12px;">
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">Compression Ratio (r): <span id="val-r">8</span></label>
              <input type="range" id="slider-r" min="4" max="16" value="8" style="width:100%;" oninput="updateCycleSim()">
            </div>
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">Peak Temp (T_max): <span id="val-tmax">1400</span> K</label>
              <input type="range" id="slider-tmax" min="800" max="2200" value="1400" step="50" style="width:100%;" oninput="updateCycleSim()">
            </div>
          </div>
          <div id="cycle-results" style="font-family:var(--font-mono); font-size:0.8rem; background:var(--color-surface-elevated); padding:8px; border-radius:var(--radius-sm); color:var(--color-text-primary);">
            Ideal Thermal Efficiency η_th = 56.5%
          </div>
        </div>

        <!-- 3. Venturi Bernoulli Flow -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
            <h3 class="h3">Venturi Tube & Bernoulli Flow</h3>
            <span class="badge badge-blue">Fluid Mechanics</span>
          </div>
          <canvas id="canvas-venturi" width="480" height="260" style="width:100%; height:260px; background:var(--color-surface-elevated); border-radius:var(--radius-md); border:1px solid var(--color-border); margin-bottom:12px;"></canvas>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:12px;">
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">Inlet D1: <span id="val-d1">100</span> mm</label>
              <input type="range" id="slider-d1" min="80" max="150" value="100" style="width:100%;" oninput="updateVenturiSim()">
            </div>
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">Throat D2: <span id="val-d2">50</span> mm</label>
              <input type="range" id="slider-d2" min="30" max="75" value="50" style="width:100%;" oninput="updateVenturiSim()">
            </div>
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">Flow Q: <span id="val-q">15</span> L/s</label>
              <input type="range" id="slider-q" min="5" max="30" value="15" style="width:100%;" oninput="updateVenturiSim()">
            </div>
          </div>
          <div id="venturi-results" style="font-family:var(--font-mono); font-size:0.8rem; background:var(--color-surface-elevated); padding:8px; border-radius:var(--radius-sm); color:var(--color-text-primary);">
            v1 = 1.91 m/s | v2 = 7.64 m/s | ΔP = 27.3 kPa
          </div>
        </div>

        <!-- 4. Beam Deflection -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; margin-bottom:var(--space-2);">
            <h3 class="h3">Simply Supported Beam Bending</h3>
            <span class="badge badge-warning">Mechanics of Solids</span>
          </div>
          <canvas id="canvas-beam" width="480" height="260" style="width:100%; height:260px; background:var(--color-surface-elevated); border-radius:var(--radius-md); border:1px solid var(--color-border); margin-bottom:12px;"></canvas>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:12px;">
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">Length L: <span id="val-blen">6</span> m</label>
              <input type="range" id="slider-blen" min="4" max="12" value="6" style="width:100%;" oninput="updateBeamSim()">
            </div>
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">Point Load W: <span id="val-bload">20</span> kN</label>
              <input type="range" id="slider-bload" min="5" max="50" value="20" style="width:100%;" oninput="updateBeamSim()">
            </div>
            <div>
              <label style="font-size:0.7rem; color:var(--color-text-secondary);">Position a: <span id="val-bpos">3</span> m</label>
              <input type="range" id="slider-bpos" min="1" max="5" value="3" style="width:100%;" oninput="updateBeamSim()">
            </div>
          </div>
          <div id="beam-results" style="font-family:var(--font-mono); font-size:0.8rem; background:var(--color-surface-elevated); padding:8px; border-radius:var(--radius-sm); color:var(--color-text-primary);">
            M_max = 30.00 kN·m | R_A = 10.00 kN | R_B = 10.00 kN
          </div>
        </div>
      </div>
    `;

    renderActiveSimulation();
  }

  function renderActiveSimulation() {
    setTimeout(() => {
      updateMohrSim();
      updateCycleSim();
      updateVenturiSim();
      updateBeamSim();
    }, 50);
  }

  window.updateMohrSim = function() {
    const sx = parseFloat(document.getElementById('slider-sx').value);
    const sy = parseFloat(document.getElementById('slider-sy').value);
    const txy = parseFloat(document.getElementById('slider-txy').value);
    document.getElementById('val-sx').innerText = sx;
    document.getElementById('val-sy').innerText = sy;
    document.getElementById('val-txy').innerText = txy;

    if (window.MECH_SIM) {
      const res = window.MECH_SIM.renderMohrsCircle('canvas-mohr', sx, sy, txy);
      if (res) {
        document.getElementById('mohr-results').innerText = `σ1 = ${res.s1} MPa | σ2 = ${res.s2} MPa | τmax = ${res.tmax} MPa | θp = ${res.thetaP}°`;
      }
    }
  };

  window.updateCycleSim = function() {
    const r = parseFloat(document.getElementById('slider-r').value);
    const tmax = parseFloat(document.getElementById('slider-tmax').value);
    document.getElementById('val-r').innerText = r;
    document.getElementById('val-tmax').innerText = tmax;

    if (window.MECH_SIM) {
      const res = window.MECH_SIM.renderCycle('canvas-cycle', r, tmax);
      if (res) {
        document.getElementById('cycle-results').innerText = `Ideal Thermal Efficiency η_th = ${res.eta}% (γ = 1.4)`;
      }
    }
  };

  window.updateVenturiSim = function() {
    const d1 = parseFloat(document.getElementById('slider-d1').value);
    const d2 = parseFloat(document.getElementById('slider-d2').value);
    const q = parseFloat(document.getElementById('slider-q').value);
    document.getElementById('val-d1').innerText = d1;
    document.getElementById('val-d2').innerText = d2;
    document.getElementById('val-q').innerText = q;

    if (window.MECH_SIM) {
      const res = window.MECH_SIM.renderVenturi('canvas-venturi', d1, d2, q);
      if (res) {
        document.getElementById('venturi-results').innerText = `v1 = ${res.v1} m/s | v2 = ${res.v2} m/s | ΔP = ${res.deltaP} kPa | Δh = ${res.deltaH} cm`;
      }
    }
  };

  window.updateBeamSim = function() {
    const blen = parseFloat(document.getElementById('slider-blen').value);
    const bload = parseFloat(document.getElementById('slider-bload').value);
    const bpos = parseFloat(document.getElementById('slider-bpos').value);
    document.getElementById('val-blen').innerText = blen;
    document.getElementById('val-bload').innerText = bload;
    document.getElementById('val-bpos').innerText = bpos;

    if (window.MECH_SIM) {
      const res = window.MECH_SIM.renderBeam('canvas-beam', blen, bload, bpos);
      if (res) {
        document.getElementById('beam-results').innerText = `M_max = ${res.maxMoment} kN·m | R_A = ${res.ra} kN | R_B = ${res.rb} kN`;
      }
    }
  };

  // ===================================================================
  // 10. BOOKMARKS
  // ===================================================================
  function renderBookmarks() {
    const container = document.getElementById('bookmarks-content');
    if (!container) return;

    if (AppState.bookmarks.length === 0) {
      container.innerHTML = `
        <div style="margin-bottom:var(--space-6);">
          <h1 class="h1">Saved Bookmarks</h1>
          <p class="text-secondary">Your saved study notes, question papers, and formulas</p>
        </div>
        <div class="card" style="text-align:center; padding:var(--space-8);">
          <div style="font-size:2rem; margin-bottom:8px;">⭐</div>
          <h3 class="h3" style="margin-bottom:8px;">No Bookmarks Saved Yet</h3>
          <p class="text-secondary" style="font-size:0.9rem; margin-bottom:16px;">
            Click the "Bookmark" button on any study note, PYQ paper, or formula to pin it here for instant revision.
          </p>
          <a href="#notes/24MET401" class="btn btn-primary">Browse Study Notes</a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Saved Bookmarks (${AppState.bookmarks.length})</h1>
        <p class="text-secondary">Quick access to your pinned engineering study material</p>
      </div>

      <div class="grid-cols-2">
        ${AppState.bookmarks.map((b, idx) => `
          <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span class="badge badge-blue">${b.type}</span>
              <h3 class="h4" style="margin:6px 0 2px;">${b.title}</h3>
              <div class="text-secondary text-mono" style="font-size:0.75rem;">${b.id}</div>
            </div>
            <div style="display:flex; gap:8px;">
              <a href="#notes/${b.id.split('-')[0]}" class="btn btn-secondary btn-sm">Open &rarr;</a>
              <button onclick="removeBookmark(${idx})" class="btn btn-secondary btn-sm" title="Remove">✕</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.toggleBookmark = function(type, id, title) {
    const existsIdx = AppState.bookmarks.findIndex(b => b.id === id);
    if (existsIdx >= 0) {
      AppState.bookmarks.splice(existsIdx, 1);
      alert('Removed from bookmarks');
    } else {
      AppState.bookmarks.push({ type, id, title });
      alert('Added to bookmarks ⭐');
    }
    localStorage.setItem('mech_bookmarks', JSON.stringify(AppState.bookmarks));
  };

  window.removeBookmark = function(idx) {
    AppState.bookmarks.splice(idx, 1);
    localStorage.setItem('mech_bookmarks', JSON.stringify(AppState.bookmarks));
    renderBookmarks();
  };

  // ===================================================================
  // 11. DOWNLOADS
  // ===================================================================
  function renderDownloads() {
    const container = document.getElementById('downloads-content');
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Offline Downloads & Android App</h1>
        <p class="text-secondary">Official Standalone Android APK & PWA Offline Workspace</p>
      </div>

      <div class="grid-cols-2">
        <div class="card">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <div style="width:48px; height:48px; border-radius:var(--radius-md); background:var(--color-success-subtle); color:var(--color-success); display:flex; align-items:center; justify-content:center; font-size:1.8rem;">
              📱
            </div>
            <div>
              <h3 class="h3">TKMCE Mechanical Android APK</h3>
              <span class="badge badge-teal">Standalone Signed APK • 225 KB</span>
            </div>
          </div>
          <p class="text-secondary" style="font-size:0.88rem; margin-bottom:16px;">
            Install the offline Android application on your smartphone. Operates completely without an active internet connection. No tracking, zero ads, and no background drain.
          </p>
          <a href="./tkm_mech_portal.apk" download class="btn btn-primary">Download APK (225 KB) ⬇️</a>
        </div>

        <div class="card">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
            <div style="width:48px; height:48px; border-radius:var(--radius-md); background:var(--color-academic-blue-subtle); color:var(--color-academic-blue); display:flex; align-items:center; justify-content:center; font-size:1.8rem;">
              ⚡
            </div>
            <div>
              <h3 class="h3">Progressive Web App (PWA)</h3>
              <span class="badge badge-blue">Installable on Chrome & Safari</span>
            </div>
          </div>
          <p class="text-secondary" style="font-size:0.88rem; margin-bottom:16px;">
            MECH TKMCE is fully PWA enabled. You can install it on your laptop (macOS / Windows / Linux) or mobile device directly from your browser's address bar.
          </p>
          <button class="btn btn-secondary" onclick="alert('To install, tap the Share or Install icon in your browser address bar.')">Install PWA Web App</button>
        </div>
      </div>

      <!-- S4 Study Notes & Compiled Volume Section -->
      <div class="card" style="margin-top:var(--space-6);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4); flex-wrap:wrap; gap:8px;">
          <div>
            <h3 class="h3" style="margin-bottom:4px;">📚 S4 Autonomous Study Notes (Printable PDFs)</h3>
            <p class="text-secondary" style="font-size:0.88rem;">Official TKMCE Autonomous 2024 Scheme Semester 4 comprehensive notes compiled for fast exam revision and offline study.</p>
          </div>
          <a href="./notes/TKMCE_S4_Study_Notes.pdf" download class="btn btn-primary btn-sm">
            Download Complete S4 Volume (508 KB) ⬇️
          </a>
        </div>

        <div class="grid-cols-2" style="gap:12px; margin-top:var(--space-4);">
          <div class="card" style="padding:14px; background:var(--color-surface-elevated); border:1px solid var(--color-border);">
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:4px;">24MET401 • Mechanics of Solids</div>
            <div class="text-secondary" style="font-size:0.8rem; margin-bottom:10px;">Stress-strain, shear force, bending moment, Mohr's circle, torsion & deflection</div>
            <a href="./notes/24MET401.pdf" download class="btn btn-secondary btn-sm" style="font-size:0.8rem;">Download PDF (71 KB) ⬇️</a>
          </div>

          <div class="card" style="padding:14px; background:var(--color-surface-elevated); border:1px solid var(--color-border);">
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:4px;">24MET402 • Manufacturing Technology</div>
            <div class="text-secondary" style="font-size:0.8rem; margin-bottom:10px;">Casting, forming, welding, traditional & CNC machining operations</div>
            <a href="./notes/24MET402.pdf" download class="btn btn-secondary btn-sm" style="font-size:0.8rem;">Download PDF (66 KB) ⬇️</a>
          </div>

          <div class="card" style="padding:14px; background:var(--color-surface-elevated); border:1px solid var(--color-border);">
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:4px;">24MEP403 • Fluid Machinery</div>
            <div class="text-secondary" style="font-size:0.8rem; margin-bottom:10px;">Impulse & reaction turbines, Pelton wheel, Francis, Kaplan & centrifugal pumps</div>
            <a href="./notes/24MEP403.pdf" download class="btn btn-secondary btn-sm" style="font-size:0.8rem;">Download PDF (68 KB) ⬇️</a>
          </div>

          <div class="card" style="padding:14px; background:var(--color-surface-elevated); border:1px solid var(--color-border);">
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:4px;">24MEJ404 • Thermal Engineering</div>
            <div class="text-secondary" style="font-size:0.8rem; margin-bottom:10px;">Air standard cycles, IC engine performance, gas turbines & steam nozzles</div>
            <a href="./notes/24MEJ404.pdf" download class="btn btn-secondary btn-sm" style="font-size:0.8rem;">Download PDF (67 KB) ⬇️</a>
          </div>

          <div class="card" style="padding:14px; background:var(--color-surface-elevated); border:1px solid var(--color-border);">
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:4px;">24HUT415 • Constitution of India</div>
            <div class="text-secondary" style="font-size:0.8rem; margin-bottom:10px;">Preamble, Fundamental Rights & Duties, Directive Principles, Union & State Judiciary</div>
            <a href="./notes/24HUT415.pdf" download class="btn btn-secondary btn-sm" style="font-size:0.8rem;">Download PDF (60 KB) ⬇️</a>
          </div>

          <div class="card" style="padding:14px; background:var(--color-surface-elevated); border:1px solid var(--color-border);">
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:4px;">24MCT406 • Environmental Science</div>
            <div class="text-secondary" style="font-size:0.8rem; margin-bottom:10px;">Ecosystems, natural resources, biodiversity, pollution control & sustainable development</div>
            <a href="./notes/24MCT406.pdf" download class="btn btn-secondary btn-sm" style="font-size:0.8rem;">Download PDF (64 KB) ⬇️</a>
          </div>

          <div class="card" style="padding:14px; background:var(--color-surface-elevated); border:1px solid var(--color-border);">
            <div style="font-weight:600; font-size:0.92rem; margin-bottom:4px;">24BYT408 • Biology for Engineers</div>
            <div class="text-secondary" style="font-size:0.8rem; margin-bottom:10px;">Bio-inspired engineering, biomolecules, cellular mechanisms & bio-sensors</div>
            <a href="./notes/24BYT408.pdf" download class="btn btn-secondary btn-sm" style="font-size:0.8rem;">Download PDF (65 KB) ⬇️</a>
          </div>
        </div>
      </div>
    `;
  }

  // ===================================================================
  // 12. SETTINGS & SOURCE CITATIONS
  // ===================================================================
  function renderSettings() {
    const container = document.getElementById('settings-content');
    if (!container) return;

    const data = window.MECH_DATA || {};
    const sources = data.sources || [];

    container.innerHTML = `
      <div style="margin-bottom:var(--space-6);">
        <h1 class="h1">Workspace Settings & Citations</h1>
        <p class="text-secondary">Customize Theme, Reading Fonts, and Verified Academic Source Citations</p>
      </div>

      <div class="card" style="max-width:680px; margin-bottom:var(--space-6);">
        <h3 class="h3" style="margin-bottom:var(--space-4);">Theme & Appearance</h3>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-4);">
          <div>
            <div style="font-weight:600; font-size:0.95rem;">Interface Theme</div>
            <div class="text-secondary" style="font-size:0.8rem;">Switch between technical dark theme and high-contrast light theme</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="toggleTheme()">Toggle Theme (${AppState.theme})</button>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:600; font-size:0.95rem;">Default Reading Font Size</div>
            <div class="text-secondary" style="font-size:0.8rem;">Adjust font size for study notes (${AppState.fontSize}px)</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="icon-action-btn" onclick="adjustFontSize(-1)">-</button>
            <button class="icon-action-btn" onclick="adjustFontSize(1)">+</button>
          </div>
        </div>
      </div>

      <!-- Sources and Academic References -->
      <div class="card" style="max-width:680px; margin-bottom:var(--space-6);">
        <h3 class="h3" style="margin-bottom:var(--space-3);">Verified Academic Sources & References</h3>
        <p class="text-secondary" style="font-size:0.85rem; margin-bottom:16px;">
          All curriculum structures, exam weights, and foundational reference textbooks cited in accordance with academic integrity guidelines:
        </p>

        <div style="display:flex; flex-direction:column; gap:10px;">
          ${sources.map(s => `
            <div style="padding:10px; background:var(--color-surface-elevated); border-radius:var(--radius-md); border:1px solid var(--color-border);">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="font-size:0.88rem;">${s.title}</strong>
                <a href="${s.url}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="font-size:0.75rem;">Source Link &rarr;</a>
              </div>
              <div class="text-secondary" style="font-size:0.78rem; margin-top:4px;">${s.usage} • <em>${s.license}</em></div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card" style="max-width:680px;">
        <h3 class="h3" style="margin-bottom:var(--space-4);">Local Storage Management</h3>
        <p class="text-secondary" style="font-size:0.85rem; margin-bottom:16px;">
          Your study bookmarks, daily tasks, and theme preferences are saved locally on this browser. No personal data is sent to external servers.
        </p>
        <button class="btn btn-secondary btn-sm" onclick="clearLocalData()" style="color:var(--color-error); border-color:var(--color-error-subtle);">
          Reset Local Study Data
        </button>
      </div>
    `;
  }

  window.clearLocalData = function() {
    if (confirm('Are you sure you want to reset your local study bookmarks and planner tasks?')) {
      localStorage.removeItem('mech_bookmarks');
      localStorage.removeItem('mech_tasks');
      AppState.bookmarks = [];
      AppState.tasks = [];
      alert('Local data reset.');
      renderSettings();
    }
  };

  // ===================================================================
  // UNIVERSAL SEARCH MODAL (Ctrl+K)
  // ===================================================================
  function setupUniversalSearch() {
    const trigger = document.getElementById('global-search-trigger');
    const modal = document.getElementById('search-palette-modal');
    const input = document.getElementById('search-palette-input');
    const resultsContainer = document.getElementById('search-results-list');

    if (trigger) trigger.addEventListener('click', openSearch);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSearch();
      });
    }

    if (input) {
      input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        if (!query) {
          resultsContainer.innerHTML = `<div class="search-group-title">Type to search subjects, modules, formulas, and PYQs...</div>`;
          return;
        }

        const matches = performSearch(query);
        renderSearchResults(matches, resultsContainer);
      });
    }
  }

  function openSearch() {
    const modal = document.getElementById('search-palette-modal');
    const input = document.getElementById('search-palette-input');
    if (modal) modal.classList.add('active');
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  function closeSearch() {
    const modal = document.getElementById('search-palette-modal');
    if (modal) modal.classList.remove('active');
  }

  function performSearch(query) {
    const results = [];
    const data = window.MECH_DATA || {};

    // 1. Search Curriculum Courses
    if (data.catalog_raw) {
      data.catalog_raw.forEach(c => {
        if (c.code.toLowerCase().includes(query) || c.title.toLowerCase().includes(query)) {
          results.push({
            type: 'Course',
            title: `${c.code}: ${c.title}`,
            sub: `Semester ${c.semester} • ${c.type}`,
            link: `#semesters/S${c.semester}`
          });
        }
      });
    }

    // 2. Search Starter Foundation Lessons
    if (data.starter_lessons) {
      data.starter_lessons.forEach(l => {
        if (l.title.toLowerCase().includes(query)) {
          results.push({
            type: 'Foundation',
            title: l.title,
            sub: 'Beginner Mechanical Learning Track',
            link: `#notes/FOUNDATION/${encodeURIComponent(l.title)}`
          });
        }
      });
    }

    // 3. Search Formulas
    if (data.formulas) {
      data.formulas.forEach(f => {
        if (f.name.toLowerCase().includes(query) || f.category.toLowerCase().includes(query) || f.code.toLowerCase().includes(query)) {
          results.push({
            type: 'Formula',
            title: f.name,
            sub: `${f.category} (${f.code})`,
            link: `#formulas`
          });
        }
      });
    }

    // 4. Search PYQs
    if (data.pyqs) {
      data.pyqs.forEach(p => {
        if (p.subject.toLowerCase().includes(query) || p.code.toLowerCase().includes(query) || p.title.toLowerCase().includes(query)) {
          results.push({
            type: 'PYQ Paper',
            title: p.subject,
            sub: `${p.semester} • ${p.exam_type}`,
            link: p.url
          });
        }
      });
    }

    return results.slice(0, 10);
  }

  function renderSearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = `<div class="search-group-title" style="text-align:center; padding:16px;">No matching engineering resources found.</div>`;
      return;
    }

    container.innerHTML = results.map(r => `
      <a href="${r.link}" class="search-result-item" onclick="document.getElementById('search-palette-modal').classList.remove('active')">
        <span class="badge badge-blue">${r.type}</span>
        <div style="flex:1;">
          <div style="font-weight:600; font-size:0.9rem;">${r.title}</div>
          <div class="text-secondary" style="font-size:0.75rem;">${r.sub}</div>
        </div>
        <span style="color:var(--color-text-tertiary);">&rarr;</span>
      </a>
    `).join('');
  }

  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') {
        closeSearch();
      }
    });
  }

})();
