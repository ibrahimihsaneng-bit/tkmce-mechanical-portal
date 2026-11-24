/**
 * VYAPAR SHIKSHA - PLATFORM ENHANCEMENTS ENGINE
 * Dark Mode, Bookmarks, Course Completion Tracking, Global Search, and Learning Dashboard.
 */

const platformEnhancements = {
  theme: 'light',
  bookmarks: [],
  progress: {},

  init() {
    this.initTheme();
    this.loadBookmarks();
    this.loadProgress();
    this.renderLearningDashboard();
    this.bindGlobalKeyboard();
  },

  // 1. Dark Mode System
  initTheme() {
    const saved = localStorage.getItem('vyapar_theme');
    if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }
    this.applyTheme(this.theme);
  },

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('vyapar_theme', theme);

    // Update theme toggle icons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun text-warning"></i> <span class="theme-text">Light</span>'
        : '<i class="fa-solid fa-moon"></i> <span class="theme-text">Dark</span>';
    });
  },

  toggleTheme() {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  },

  // 2. Bookmarks System
  loadBookmarks() {
    try {
      const saved = localStorage.getItem('vyapar_bookmarks');
      this.bookmarks = saved ? JSON.parse(saved) : ['attar', 'clothing'];
    } catch (e) {
      this.bookmarks = ['attar', 'clothing'];
    }
  },

  saveBookmarks() {
    try {
      localStorage.setItem('vyapar_bookmarks', JSON.stringify(this.bookmarks));
      this.renderLearningDashboard();
    } catch (e) {
      console.warn('Could not save bookmarks', e);
    }
  },

  toggleBookmark(nicheKey) {
    const idx = this.bookmarks.indexOf(nicheKey);
    if (idx > -1) {
      this.bookmarks.splice(idx, 1);
      this.showToast('Bookmark removed', 'info');
    } else {
      this.bookmarks.push(nicheKey);
      this.showToast('Course added to your Bookmarks!', 'success');
    }
    this.saveBookmarks();
    this.updateBookmarkButton(nicheKey);
  },

  isBookmarked(nicheKey) {
    return this.bookmarks.includes(nicheKey);
  },

  updateBookmarkButton(nicheKey) {
    const btn = document.getElementById('btnBookmarkCourse');
    if (!btn) return;
    const isBooked = this.isBookmarked(nicheKey);
    btn.innerHTML = isBooked 
      ? '<i class="fa-solid fa-bookmark text-warning"></i> <span>Bookmarked</span>'
      : '<i class="fa-regular fa-bookmark"></i> <span>Bookmark Course</span>';
  },

  // 3. Course Completion Tracking
  loadProgress() {
    try {
      const saved = localStorage.getItem('vyapar_progress');
      this.progress = saved ? JSON.parse(saved) : { attar: [1, 2], clothing: [1] };
    } catch (e) {
      this.progress = { attar: [1, 2], clothing: [1] };
    }
  },

  saveProgress() {
    try {
      localStorage.setItem('vyapar_progress', JSON.stringify(this.progress));
      this.renderLearningDashboard();
    } catch (e) {
      console.warn('Could not save progress', e);
    }
  },

  markChapter(nicheKey, chapterNum) {
    if (!this.progress[nicheKey]) this.progress[nicheKey] = [];
    const list = this.progress[nicheKey];
    const idx = list.indexOf(chapterNum);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(chapterNum);
      this.showToast(`Chapter ${chapterNum} completed!`, 'success');
    }
    this.saveProgress();
  },

  getProgressPct(nicheKey, totalChapters = 7) {
    const completed = (this.progress[nicheKey] || []).length;
    return Math.min(100, Math.round((completed / totalChapters) * 100));
  },

  // 4. Learning Progress Dashboard Bar on Homepage
  renderLearningDashboard() {
    const bar = document.getElementById('learningDashboardBar');
    if (!bar) return;

    const totalBookmarked = this.bookmarks.length;
    let totalCompletedChapters = 0;
    Object.values(this.progress).forEach(arr => {
      totalCompletedChapters += arr.length;
    });

    const activeNiche = this.bookmarks[0] || 'attar';
    const activePct = this.getProgressPct(activeNiche);

    bar.innerHTML = `
      <div class="learn-dash-left">
        <div class="learn-avatar-badge">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <div class="learn-dash-info">
          <h4>Welcome Back, Student Entrepreneur!</h4>
          <p>Resume your active physical goods academy or review saved study blueprints.</p>
        </div>
      </div>

      <div class="learn-dash-stats">
        <div class="learn-stat-item">
          <span class="learn-stat-val">${totalBookmarked}</span>
          <span class="learn-stat-lbl">Bookmarked</span>
        </div>
        <div class="learn-stat-item">
          <span class="learn-stat-val">${totalCompletedChapters}</span>
          <span class="learn-stat-lbl">Chapters Done</span>
        </div>
        <div class="learn-stat-item">
          <span class="learn-stat-val text-success">${activePct}%</span>
          <span class="learn-stat-lbl">Active Course</span>
        </div>
      </div>

      <div class="learn-dash-actions">
        <button class="btn btn-sm btn-outline text-success" onclick="platformEnhancements.openBookmarksModal()">
          <i class="fa-solid fa-bookmark"></i> Bookmarks (${totalBookmarked})
        </button>
        <button class="btn btn-sm btn-primary" onclick="app.openAcademy('${activeNiche}')">
          <i class="fa-solid fa-play"></i> Resume: ${activeNiche.toUpperCase()}
        </button>
      </div>
    `;
  },

  openBookmarksModal() {
    let listHtml = '';
    if (this.bookmarks.length === 0) {
      listHtml = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No bookmarked courses yet. Click "Bookmark Course" inside any academy to save it here!</p>';
    } else {
      listHtml = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${this.bookmarks.map(key => {
            const pct = this.getProgressPct(key);
            return `
              <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card-subtle); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                <div>
                  <strong style="text-transform: uppercase; font-size: 0.95rem;">${key} Academy</strong>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">Progress: ${pct}% complete</div>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-sm btn-primary" onclick="app.openAcademy('${key}'); platformEnhancements.closeModal();">Open Course</button>
                  <button class="btn btn-sm btn-outline text-danger" onclick="platformEnhancements.toggleBookmark('${key}'); platformEnhancements.openBookmarksModal();">&times;</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    this.showCustomModal('Your Saved Course Bookmarks', listHtml);
  },

  // 5. Global Live Search
  handleGlobalSearch(query) {
    const q = (query || '').toLowerCase().trim();
    const dropdown = document.getElementById('globalSearchResultsDropdown');
    if (!dropdown) return;

    if (!q || q.length < 2) {
      dropdown.style.display = 'none';
      return;
    }

    let results = [];

    // Search Academies
    const academies = [
      { name: 'Attar & Artisanal Perfumes', key: 'attar', type: 'Academy', budget: '₹3k' },
      { name: 'Modest Wear & Boutiques', key: 'clothing', type: 'Academy', budget: '₹5k' },
      { name: 'Watches & Fashion Combos', key: 'watches', type: 'Academy', budget: '₹4.5k' },
      { name: 'Canvas Totes & Aesthetic Bags', key: 'bags', type: 'Academy', budget: '₹3.5k' },
      { name: 'Anti-Tarnish Jewelry & Rings', key: 'accessories', type: 'Academy', budget: '₹2.5k' },
      { name: 'Kerala Farm Spices & Honey', key: 'spices', type: 'Academy', budget: '₹4k' }
    ];

    academies.forEach(a => {
      if (a.name.toLowerCase().includes(q)) {
        results.push({
          title: a.name,
          subtitle: `Physical Trading Course • Budget: ${a.budget}`,
          icon: 'fa-graduation-cap text-success',
          action: `app.openAcademy('${a.key}'); platformEnhancements.closeSearch();`
        });
      }
    });

    // Search 12 Tools
    const tools = [
      { name: 'Business Matchmaker Diagnostic', id: 'matchmaker' },
      { name: 'Starting Capital Allocation Planner', id: 'planner' },
      { name: 'Wholesale-to-Retail Profit Calculator', id: 'profit' },
      { name: 'Break-Even Volume Calculator', id: 'breakeven' },
      { name: 'Inventory Risk & Spoilage Index', id: 'risk' },
      { name: 'Operational Expense Tracker', id: 'expenses' },
      { name: 'Stock Management Dashboard', id: 'stock' },
      { name: '1-Page Business Plan Generator', id: 'plan' },
      { name: 'Ethical Negotiation Assistant', id: 'negotiation' },
      { name: 'Halal Trading Eligibility Checklist', id: 'halal' },
      { name: 'Wholesale Supplier Comparator', id: 'suppliers' },
      { name: 'Printable Sales & Purchase Ledger', id: 'ledger' }
    ];

    tools.forEach(t => {
      if (t.name.toLowerCase().includes(q)) {
        results.push({
          title: t.name,
          subtitle: 'Interactive Commercial Tool',
          icon: 'fa-calculator text-primary',
          action: `app.navigateTo('tools'); if (window.tradingTools) window.tradingTools.selectTool('${t.id}'); platformEnhancements.closeSearch();`
        });
      }
    });

    // Search Kerala Districts
    if (window.keralaTradingIntelData) {
      for (const [id, d] of Object.entries(window.keralaTradingIntelData.districts)) {
        if (d.name.en.toLowerCase().includes(q) || (d.name.ml && d.name.ml.includes(q))) {
          results.push({
            title: `${d.name.en} District Trading Intelligence`,
            subtitle: `ODOP: ${d.officialOdop}`,
            icon: 'fa-map-location-dot text-warning',
            action: `app.selectKeralaDistrict('${id}'); platformEnhancements.closeSearch();`
          });
        }
      }
    }

    if (results.length === 0) {
      dropdown.innerHTML = '<div style="padding: 12px; color: var(--text-muted); font-size: 0.85rem; text-align: center;">No matches found for "' + q + '"</div>';
    } else {
      dropdown.innerHTML = results.slice(0, 6).map(r => `
        <div style="padding: 10px 14px; border-bottom: 1px solid var(--border-light); cursor: pointer; display: flex; align-items: center; gap: 12px;" 
             onclick="${r.action}" onmouseover="this.style.background='var(--bg-card-subtle)'" onmouseout="this.style.background='transparent'">
          <i class="fa-solid ${r.icon}" style="font-size: 1.1rem;"></i>
          <div>
            <strong style="font-size: 0.88rem; color: var(--text-main); display: block;">${r.title}</strong>
            <small style="font-size: 0.72rem; color: var(--text-muted);">${r.subtitle}</small>
          </div>
        </div>
      `).join('');
    }

    dropdown.style.display = 'block';
  },

  closeSearch() {
    const dropdown = document.getElementById('globalSearchResultsDropdown');
    if (dropdown) dropdown.style.display = 'none';
  },

  // 6. Generic Modal Helper
  showCustomModal(title, bodyHtml) {
    let modal = document.getElementById('platformCustomModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'platformCustomModal';
      modal.className = 'community-modal-backdrop';
      modal.innerHTML = `
        <div class="community-modal-box" style="max-width: 540px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 14px; margin-bottom: 16px;">
            <h3 id="customModalTitle" style="margin: 0; font-size: 1.2rem; color: var(--text-main);"></h3>
            <button onclick="platformEnhancements.closeModal()" style="background: none; border: none; font-size: 1.6rem; cursor: pointer; color: var(--text-muted); line-height: 1;">&times;</button>
          </div>
          <div id="customModalBody"></div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    document.getElementById('customModalTitle').textContent = title;
    document.getElementById('customModalBody').innerHTML = bodyHtml;
    modal.style.display = 'flex';
  },

  closeModal() {
    const modal = document.getElementById('platformCustomModal');
    if (modal) modal.style.display = 'none';
  },

  // Toast System
  showToast(msg, type = 'success') {
    const toastId = 'platform-toast';
    let toast = document.getElementById(toastId);
    if (!toast) {
      toast = document.createElement('div');
      toast.id = toastId;
      toast.style.cssText = 'position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; z-index: 10000; box-shadow: 0 4px 16px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 8px; transition: opacity 0.2s ease;';
      document.body.appendChild(toast);
    }
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check text-success"></i>' : '<i class="fa-solid fa-circle-info text-warning"></i>';
    toast.innerHTML = icon + ' ' + msg;
    toast.style.display = 'flex';
    setTimeout(() => { if (toast) toast.style.display = 'none'; }, 3200);
  },

  bindGlobalKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.closeSearch();
      }
    });
  }
};

// Export to window
window.platformEnhancements = platformEnhancements;
