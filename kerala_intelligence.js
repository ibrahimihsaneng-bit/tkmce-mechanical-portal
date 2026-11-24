/**
 * KERALA HALAL TRADING INTELLIGENCE SYSTEM
 * Interactive UI Engine, 14-District SVG Map, Multi-Attribute Filtering,
 * Ground Market Research Validation Checklist, and Verified Wholesale Sourcing Hubs.
 * 
 * Primary Research Sources:
 * - Directorate of Industries and Commerce, Kerala (https://www.industry.kerala.gov.in/)
 * - One Local Body One Product (OLOP) Portal (https://olop.industry.kerala.gov.in/)
 * - PMFME One District One Product (ODOP) MoFPI & DIC Official Datasets
 */

const keralaIntel = {
  selectedDistrict: 'kollam', // Prioritize Kollam by default!
  activeViewTab: 'dashboard',  // 'dashboard' | 'products' | 'checklist' | 'directory'
  
  filterState: {
    district: 'all',
    capital: 'all',
    category: 'all',
    storage: 'all',
    selling: 'all',
    risk: 'all',
    search: ''
  },

  checklistState: {
    st1_c1: false, st1_c2: false, st1_c3: false,
    st2_c1: false, st2_c2: false, st2_c3: false,
    st3_c1: false, st3_c2: false, st3_c3: false,
    st4_c1: false, st4_c2: false, st4_c3: false,
    st5_c1: false, st5_c2: false
  },

  init() {
    this.loadChecklistState();
    this.render();
  },

  loadChecklistState() {
    try {
      const saved = localStorage.getItem('kerala_intel_checklist');
      if (saved) {
        this.checklistState = Object.assign(this.checklistState, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load checklist state from localStorage', e);
    }
  },

  saveChecklistState() {
    try {
      localStorage.setItem('kerala_intel_checklist', JSON.stringify(this.checklistState));
    } catch (e) {
      console.warn('Could not save checklist state to localStorage', e);
    }
  },

  setDistrict(districtId) {
    if (!window.keralaTradingIntelData || !window.keralaTradingIntelData.districts[districtId]) return;
    this.selectedDistrict = districtId;
    this.renderDistrictMap();
    this.renderDistrictDashboard();
    this.updateActivePill(districtId);
    
    // Smooth scroll to district dashboard on mobile
    if (window.innerWidth < 768) {
      const dashEl = document.getElementById('keralaDistrictDashboard');
      if (dashEl) dashEl.scrollIntoView({ behavior: 'smooth' });
    }
  },

  updateActivePill(districtId) {
    document.querySelectorAll('.kerala-district-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-district') === districtId);
    });
  },

  switchViewTab(tabKey) {
    this.activeViewTab = tabKey;
    document.querySelectorAll('.kerala-subview-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabKey);
    });

    const dashSec = document.getElementById('secDistrictDashboard');
    const prodSec = document.getElementById('secFilteredProducts');
    const checkSec = document.getElementById('secMarketChecklist');
    const dirSec = document.getElementById('secSourcingDirectory');

    if (dashSec) dashSec.style.display = tabKey === 'dashboard' ? 'block' : 'none';
    if (prodSec) prodSec.style.display = tabKey === 'products' ? 'block' : 'none';
    if (checkSec) checkSec.style.display = tabKey === 'checklist' ? 'block' : 'none';
    if (dirSec) dirSec.style.display = tabKey === 'directory' ? 'block' : 'none';

    if (tabKey === 'products') this.renderFilteredProducts();
    if (tabKey === 'checklist') this.renderChecklist();
    if (tabKey === 'directory') this.renderSourcingDirectory();
  },

  render() {
    const container = document.getElementById('viewKeralaIntel');
    if (!container) return;

    const lang = (window.app && window.app.currentLang) || 'en';

    container.innerHTML = `
      <!-- Kerala Intelligence Header Banner -->
      <section class="kerala-intel-header">
        <div class="container">
          <div class="kerala-header-flex">
            <div>
              <div class="kerala-badge-row">
                <span class="kerala-official-badge">
                  <i class="fa-solid fa-landmark"></i> 
                  <span>${lang === 'ml' ? 'കേരള സർക്കാർ ODOP & OLOP അധിഷ്ഠിത ഇൻഫർമേഷൻ' : lang === 'ar' ? 'بيانات حكومة كيرالا الرسمية (ODOP & OLOP)' : 'Official Kerala Govt ODOP & OLOP Data'}</span>
                </span>
                <span class="kerala-verified-date">
                  <i class="fa-solid fa-clock-rotate-left"></i> Verified: Nov 2026
                </span>
                <span class="kerala-priority-tag">
                  <i class="fa-solid fa-star text-warning"></i> Kollam Priority Focus
                </span>
              </div>
              <h1 class="kerala-main-title">
                ${lang === 'ml' 
                  ? 'കേരള ഹലാൽ ട്രേഡിംഗ് ഇന്റലിജൻസ് സിസ്റ്റം' 
                  : lang === 'ar' 
                  ? 'نظام استخبارات التجارة الحلال في كيرالا (14 مقاطعة)' 
                  : 'Kerala Halal Trading Intelligence System'}
              </h1>
              <p class="kerala-main-subtitle">
                ${lang === 'ml'
                  ? '14 കേരള ജില്ലകളിലെയും തദ്ദേശീയമായി ലഭ്യമായ ഉൽപ്പന്നങ്ങൾ, റീട്ടെയിൽ റീസെല്ലിംഗ് സാധ്യതകൾ (₹10,000-ൽ താഴെ), ഔദ്യോഗിക മൊത്തവ്യാപാര കേന്ദ്രങ്ങൾ, ട്രാഫിക് & സീസണൽ മാർക്കറ്റ് വിവരങ്ങൾ.'
                  : lang === 'ar'
                  ? 'دليل استخباري شامل لجميع مقاطعات كيرالا الـ 14: المنتجات المتاحة محلياً، فرص التجارة بأقل من 10,000 روبية، مراكز الجملة المعتمدة، ومتطلبات السلامة.'
                  : 'Comprehensive trading intelligence across all 14 Kerala districts: locally available permissible physical goods, micro-reselling below ₹10,000, verified public wholesale hubs, logistics, and ground market research.'}
              </p>
            </div>
            <div class="kerala-header-actions">
              <button class="btn" style="background: rgba(255,255,255,0.2) !important; border: 1.5px solid rgba(255,255,255,0.6) !important; color: #ffffff !important; font-weight: 700; border-radius: 10px;" onclick="keralaIntel.printDistrictReport()">
                <i class="fa-solid fa-print"></i> <span>${lang === 'ml' ? 'ജില്ലാ റിപ്പോർട്ട് പ്രിന്റ്' : 'Print District Report'}</span>
              </button>
              <button class="btn btn-success" onclick="keralaIntel.switchViewTab('checklist')">
                <i class="fa-solid fa-clipboard-check"></i> <span>${lang === 'ml' ? 'മാർക്കറ്റ് റിസർച്ച് ചെക്ക്‌ലിസ്റ്റ്' : 'Market Research Checklist'}</span>
              </button>
            </div>
          </div>

          <!-- Sub-View Navigation Tabs -->
          <div class="kerala-nav-tabs">
            <button class="kerala-subview-tab active" data-tab="dashboard" onclick="keralaIntel.switchViewTab('dashboard')">
              <i class="fa-solid fa-map-location-dot"></i> <span>${lang === 'ml' ? '14 ജില്ലാ മാപ്പും വിവരങ്ങളും' : lang === 'ar' ? 'الخريطة ولوحة المقاطعات' : '14 Districts Map & Dashboard'}</span>
            </button>
            <button class="kerala-subview-tab" data-tab="products" onclick="keralaIntel.switchViewTab('products')">
              <i class="fa-solid fa-filter"></i> <span>${lang === 'ml' ? 'മൾട്ടി-ഫിൽട്ടർ ഉൽപ്പന്നങ്ങൾ (≤ ₹10k)' : lang === 'ar' ? 'تصفية المنتجات والدورات' : 'Multi-Filter Products (≤ ₹10k)'}</span>
            </button>
            <button class="kerala-subview-tab" data-tab="checklist" onclick="keralaIntel.switchViewTab('checklist')">
              <i class="fa-solid fa-list-check"></i> <span>${lang === 'ml' ? 'ഗ്രൗണ്ട് മാർക്കറ്റ് റിസർച്ച് ടൂൾ' : lang === 'ar' ? 'قائمة التحقق من الطلب المحلي' : 'Ground Validation Checklist'}</span>
            </button>
            <button class="kerala-subview-tab" data-tab="directory" onclick="keralaIntel.switchViewTab('directory')">
              <i class="fa-solid fa-building-circle-check"></i> <span>${lang === 'ml' ? 'വെരിഫൈഡ് ഹോൾസെയിൽ ഡയറക്ടറി' : lang === 'ar' ? 'دليل الجملة المعتمد حكومياً' : 'Verified Wholesale Directory'}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Main Container -->
      <div class="container kerala-content-wrapper">
        
        <!-- SECTION 1: DISTRICT MAP & DEDICATED DASHBOARD (DEFAULT VIEW) -->
        <section id="secDistrictDashboard">
          <!-- District Selector & Search Bar -->
          <div class="kerala-map-control-card">
            <div class="kerala-search-row">
              <div class="kerala-search-input-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="keralaTownSearch" placeholder="${lang === 'ml' ? 'പട്ടണങ്ങൾ അല്ലെങ്കിൽ പഞ്ചായത്തുകൾ തിരയുക (ഉദാ: Punalur, Anchal, Kundara, Kottarakkara, Kunnamkulam)...' : 'Search towns, taluks or panchayats (e.g., Punalur, Anchal, Kundara, Kottarakkara)...'}" oninput="keralaIntel.handleSearch(this.value)">
              </div>
              <div class="kerala-priority-callout">
                <i class="fa-solid fa-location-dot text-danger"></i>
                <span>${lang === 'ml' ? 'ശ്രദ്ധാകേന്ദ്രം: കൊല്ലം ജില്ല (പുനലൂർ, അഞ്ചൽ, പത്തനാപുരം, കൊട്ടാരക്കര, കരുനാഗപ്പള്ളി, കുണ്ടറ)' : 'Priority Focus: Kollam District (Punalur, Anchal, Pathanapuram, Kottarakkara, Karunagappally, Kundara)'}</span>
              </div>
            </div>

            <!-- Quick District Selector Pills (All 14 Kerala Districts) -->
            <div class="kerala-districts-pill-scroll" id="keralaDistrictPills">
              <!-- Rendered dynamically -->
            </div>
          </div>

          <!-- Dual Column: Interactive SVG Map (Left) + District Dashboard (Right) -->
          <div class="kerala-layout-grid">
            <div class="kerala-map-col">
              <div class="kerala-map-container" id="keralaSvgMapContainer">
                <!-- SVG Interactive Map injected here -->
              </div>
              <div class="kerala-map-legend">
                <div class="legend-item"><span class="legend-color legend-priority"></span> Kollam (Priority Focus)</div>
                <div class="legend-item"><span class="legend-color legend-coastal"></span> Coastal / Lowland</div>
                <div class="legend-item"><span class="legend-color legend-highland"></span> Highland / Spices</div>
              </div>
            </div>

            <div class="kerala-dash-col" id="keralaDistrictDashboard">
              <!-- Rendered dynamically for selected district -->
            </div>
          </div>
        </section>

        <!-- SECTION 2: MULTI-ATTRIBUTE FILTER VIEW -->
        <section id="secFilteredProducts" style="display: none;">
          <div class="kerala-filter-master-box" id="keralaFilterBox">
            <!-- Filter inputs rendered here -->
          </div>
          <div class="kerala-filter-results-grid" id="keralaFilterResults">
            <!-- Filtered products rendered here -->
          </div>
        </section>

        <!-- SECTION 3: GROUND MARKET RESEARCH VALIDATION CHECKLIST -->
        <section id="secMarketChecklist" style="display: none;">
          <div class="kerala-checklist-card" id="keralaChecklistContainer">
            <!-- Checklist rendered here -->
          </div>
        </section>

        <!-- SECTION 4: VERIFIED PUBLIC WHOLESALE SOURCING DIRECTORY -->
        <section id="secSourcingDirectory" style="display: none;">
          <div class="kerala-directory-card" id="keralaDirectoryContainer">
            <!-- Directory rendered here -->
          </div>
        </section>

      </div>
    `;

    this.renderDistrictPills();
    this.renderDistrictMap();
    this.renderDistrictDashboard();
  },

  renderDistrictPills() {
    const container = document.getElementById('keralaDistrictPills');
    if (!container || !window.keralaTradingIntelData) return;

    const districts = window.keralaTradingIntelData.districts;
    const lang = (window.app && window.app.currentLang) || 'en';

    let html = '';
    const order = [
      'kollam', // Priority first!
      'thiruvananthapuram', 'pathanamthitta', 'alappuzha', 'kottayam',
      'idukki', 'ernakulam', 'thrissur', 'palakkad', 'malappuram',
      'kozhikode', 'wayanad', 'kannur', 'kasaragod'
    ];

    order.forEach(id => {
      const d = districts[id];
      if (!d) return;
      const isPriority = d.priority;
      const isActive = this.selectedDistrict === id;
      const name = d.name[lang] || d.name.en;

      html += `
        <button class="kerala-district-pill ${isActive ? 'active' : ''} ${isPriority ? 'priority-pill' : ''}" 
                data-district="${id}" onclick="keralaIntel.setDistrict('${id}')">
          ${isPriority ? '<i class="fa-solid fa-star text-warning"></i>' : '<i class="fa-solid fa-location-dot"></i>'}
          <span>${name}</span>
          ${isPriority ? '<small class="priority-label">Priority</small>' : ''}
        </button>
      `;
    });

    container.innerHTML = html;
  },

  renderDistrictMap() {
    const container = document.getElementById('keralaSvgMapContainer');
    if (!container) return;

    const lang = (window.app && window.app.currentLang) || 'en';
    const sel = this.selectedDistrict;

    // High fidelity SVG map representation of Kerala's 14 districts (North to South)
    // Coordinated properly with clickable interactive paths and responsive tooltips
    container.innerHTML = `
      <div class="kerala-svg-wrapper">
        <svg viewBox="0 0 340 700" class="kerala-svg-map" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="mapShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="1" dy="3" stdDeviation="3" flood-opacity="0.15"/>
            </filter>
            <linearGradient id="gradKollam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
            <linearGradient id="gradSelected" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10b981"/>
              <stop offset="100%" stop-color="#059669"/>
            </linearGradient>
          </defs>

          <!-- Arabian Sea Indicator -->
          <text x="25" y="360" class="map-sea-text">ARABIAN SEA (ലക്ഷദ്വീപ് കടൽ)</text>

          <!-- 1. KASARAGOD -->
          <g class="district-shape ${sel === 'kasaragod' ? 'active-district' : ''}" 
             data-district="kasaragod" onclick="keralaIntel.setDistrict('kasaragod')">
            <path d="M 65 30 L 105 40 L 95 85 L 60 75 Z" />
            <text x="80" y="58" class="district-label">Kasaragod</text>
          </g>

          <!-- 2. KANNUR -->
          <g class="district-shape ${sel === 'kannur' ? 'active-district' : ''}" 
             data-district="kannur" onclick="keralaIntel.setDistrict('kannur')">
            <path d="M 60 75 L 95 85 L 125 95 L 115 140 L 70 130 Z" />
            <text x="92" y="110" class="district-label">Kannur</text>
          </g>

          <!-- 3. WAYANAD -->
          <g class="district-shape ${sel === 'wayanad' ? 'active-district' : ''}" 
             data-district="wayanad" onclick="keralaIntel.setDistrict('wayanad')">
            <path d="M 125 95 L 175 105 L 180 155 L 130 145 Z" />
            <text x="150" y="130" class="district-label">Wayanad</text>
          </g>

          <!-- 4. KOZHIKODE -->
          <g class="district-shape ${sel === 'kozhikode' ? 'active-district' : ''}" 
             data-district="kozhikode" onclick="keralaIntel.setDistrict('kozhikode')">
            <path d="M 70 130 L 115 140 L 130 145 L 125 195 L 85 185 Z" />
            <text x="105" y="165" class="district-label">Kozhikode</text>
          </g>

          <!-- 5. MALAPPURAM -->
          <g class="district-shape ${sel === 'malappuram' ? 'active-district' : ''}" 
             data-district="malappuram" onclick="keralaIntel.setDistrict('malappuram')">
            <path d="M 85 185 L 125 195 L 175 210 L 165 260 L 100 245 Z" />
            <text x="125" y="225" class="district-label">Malappuram</text>
          </g>

          <!-- 6. PALAKKAD -->
          <g class="district-shape ${sel === 'palakkad' ? 'active-district' : ''}" 
             data-district="palakkad" onclick="keralaIntel.setDistrict('palakkad')">
            <path d="M 175 210 L 220 225 L 225 285 L 150 290 L 165 260 Z" />
            <text x="185" y="255" class="district-label">Palakkad</text>
          </g>

          <!-- 7. THRISSUR -->
          <g class="district-shape ${sel === 'thrissur' ? 'active-district' : ''}" 
             data-district="thrissur" onclick="keralaIntel.setDistrict('thrissur')">
            <path d="M 100 245 L 150 290 L 165 330 L 105 325 Z" />
            <text x="128" y="295" class="district-label">Thrissur</text>
          </g>

          <!-- 8. ERNAKULAM -->
          <g class="district-shape ${sel === 'ernakulam' ? 'active-district' : ''}" 
             data-district="ernakulam" onclick="keralaIntel.setDistrict('ernakulam')">
            <path d="M 105 325 L 165 330 L 160 385 L 100 380 Z" />
            <text x="130" y="358" class="district-label">Ernakulam</text>
          </g>

          <!-- 9. IDUKKI -->
          <g class="district-shape ${sel === 'idukki' ? 'active-district' : ''}" 
             data-district="idukki" onclick="keralaIntel.setDistrict('idukki')">
            <path d="M 165 330 L 225 345 L 230 425 L 165 415 L 160 385 Z" />
            <text x="195" y="380" class="district-label">Idukki</text>
          </g>

          <!-- 10. KOTTAYAM -->
          <g class="district-shape ${sel === 'kottayam' ? 'active-district' : ''}" 
             data-district="kottayam" onclick="keralaIntel.setDistrict('kottayam')">
            <path d="M 100 380 L 160 385 L 165 415 L 150 445 L 105 440 Z" />
            <text x="132" y="415" class="district-label">Kottayam</text>
          </g>

          <!-- 11. ALAPPUZHA -->
          <g class="district-shape ${sel === 'alappuzha' ? 'active-district' : ''}" 
             data-district="alappuzha" onclick="keralaIntel.setDistrict('alappuzha')">
            <path d="M 85 390 L 105 390 L 110 475 L 80 470 Z" />
            <text x="95" y="435" class="district-label">Alappuzha</text>
          </g>

          <!-- 12. PATHANAMTHITTA -->
          <g class="district-shape ${sel === 'pathanamthitta' ? 'active-district' : ''}" 
             data-district="pathanamthitta" onclick="keralaIntel.setDistrict('pathanamthitta')">
            <path d="M 110 445 L 175 440 L 180 495 L 125 495 Z" />
            <text x="145" y="470" class="district-label">Pathanamthitta</text>
          </g>

          <!-- 13. KOLLAM (PRIORITY DISTRICT - HIGHLIGHTED) -->
          <g class="district-shape priority-shape ${sel === 'kollam' ? 'active-district' : ''}" 
             data-district="kollam" onclick="keralaIntel.setDistrict('kollam')">
            <path d="M 85 475 L 125 495 L 180 500 L 175 550 L 105 545 Z" />
            <text x="130" y="525" class="district-label district-label-kollam">⭐ KOLLAM</text>
          </g>

          <!-- 14. THIRUVANANTHAPURAM -->
          <g class="district-shape ${sel === 'thiruvananthapuram' ? 'active-district' : ''}" 
             data-district="thiruvananthapuram" onclick="keralaIntel.setDistrict('thiruvananthapuram')">
            <path d="M 105 545 L 175 550 L 180 620 L 130 625 Z" />
            <text x="142" y="585" class="district-label">Thiruvananthapuram</text>
          </g>
        </svg>

        <div class="kerala-map-instruction">
          <i class="fa-solid fa-hand-pointer text-success"></i>
          <span>${lang === 'ml' ? 'മാപ്പിലെ ജില്ലകളിൽ ക്ലിക്ക് ചെയ്ത് പൂർണ്ണ വിവരങ്ങൾ കാണുക' : 'Tap any district on map to view verified trading intel'}</span>
        </div>
      </div>
    `;
  },

  renderDistrictDashboard() {
    const container = document.getElementById('keralaDistrictDashboard');
    if (!container || !window.keralaTradingIntelData) return;

    const d = window.keralaTradingIntelData.districts[this.selectedDistrict];
    if (!d) return;

    const lang = (window.app && window.app.currentLang) || 'en';
    const name = d.name[lang] || d.name.en;
    const tagline = d.tagline[lang] || d.tagline.en;

    container.innerHTML = `
      <div class="district-dashboard-card">
        <!-- Top District Header -->
        <div class="district-dash-header">
          <div class="dash-title-left">
            <div class="dash-tags-row">
              <span class="dash-zone-tag">${d.zone}</span>
              ${d.priority ? '<span class="dash-priority-tag"><i class="fa-solid fa-star"></i> Priority Granular Coverage</span>' : ''}
              <span class="dash-odop-tag"><i class="fa-solid fa-certificate"></i> ODOP: ${d.officialOdop}</span>
            </div>
            <h2 class="dash-district-name">${name}</h2>
            <p class="dash-district-tagline">${tagline}</p>
          </div>
          <div class="dash-title-right">
            <button class="btn btn-sm btn-outline text-success" onclick="keralaIntel.printDistrictReport()">
              <i class="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>

        <!-- 1. TOWNS, MUNICIPALITIES & TALUKS GRID -->
        <div class="dash-section">
          <h3 class="dash-sec-title">
            <i class="fa-solid fa-city text-primary"></i> 
            <span>${lang === 'ml' ? 'പ്രധാന പട്ടണങ്ങൾ, താലൂക്കുകൾ & വ്യവസായ കേന്ദ്രങ്ങൾ' : 'Towns, Taluks & Trading Hotspots'}</span>
            <small class="dash-count-badge">${d.taluksAndTowns.length} Centers</small>
          </h3>
          <div class="dash-towns-grid">
            ${d.taluksAndTowns.map(t => `
              <div class="town-chip-card">
                <div class="town-chip-head">
                  <strong>${t.name[lang] || t.name.en}</strong>
                  <span class="town-type-pill">${t.type}</span>
                </div>
                <p class="town-spec-text">${t.keySpecialties}</p>
                <div class="town-hotspots-row">
                  <span class="hotspot-lbl"><i class="fa-solid fa-location-crosshairs"></i> Hotspots:</span>
                  ${t.tradingHotspots.map(h => `<span class="hotspot-badge">${h}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. LOCALLY AVAILABLE PERMISSIBLE PRODUCTS (SUITABLE BELOW ₹10,000) -->
        <div class="dash-section">
          <h3 class="dash-sec-title">
            <i class="fa-solid fa-boxes-packing text-success"></i> 
            <span>${lang === 'ml' ? 'തദ്ദേശീയ ഉൽപ്പന്നങ്ങൾ (₹10,000-ൽ താഴെ പുനർവിൽപനയ്ക്ക് അനുയോജ്യമായവ)' : 'Permissible Products for Resale (Below ₹10,000)'}</span>
          </h3>
          <div class="dash-products-grid">
            ${d.permissibleProducts.map(p => `
              <div class="dash-prod-card">
                <div class="prod-card-top">
                  <div class="prod-status-pill ${p.status === 'CONFIRMED_ODOP' ? 'status-odop' : 'status-dic'}">
                    <i class="fa-solid fa-shield-check"></i> ${p.status.replace('_', ' ')}
                  </div>
                  <span class="prod-budget-tag">Min Budget: ₹${p.minPilotBudget.toLocaleString('en-IN')}</span>
                </div>
                <h4 class="prod-card-title">${p.name[lang] || p.name.en}</h4>
                <div class="prod-economics-box">
                  <i class="fa-solid fa-calculator text-warning"></i>
                  <span>${p.sampleEconomics}</span>
                </div>
                ${p.inspectionChecklist ? `
                  <div class="prod-inspection-box">
                    <strong><i class="fa-solid fa-magnifying-glass text-info"></i> Qabd Inspection Test:</strong>
                    <span>${p.inspectionChecklist}</span>
                  </div>
                ` : ''}
                <div class="prod-meta-row">
                  <span><i class="fa-solid fa-box-archive"></i> Storage: ${p.storageType.replace('_', ' ')}</span>
                  <span><i class="fa-solid fa-shop"></i> Selling: ${p.sellingPreference}</span>
                  <span><i class="fa-solid fa-shield-heart text-success"></i> Risk: ${p.inventoryRisk}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. VERIFIED PUBLIC WHOLESALE SOURCING HUBS -->
        <div class="dash-section">
          <h3 class="dash-sec-title">
            <i class="fa-solid fa-building-circle-check text-warning"></i> 
            <span>${lang === 'ml' ? 'ഔദ്യോഗിക മൊത്തവ്യാപാര കേന്ദ്രങ്ങൾ & കോ-ഓപ്പറേറ്റീവ് സൊസൈറ്റികൾ' : 'Verified Wholesale Sourcing Hubs & Public Co-operatives'}</span>
          </h3>
          <div class="dash-hubs-grid">
            ${d.wholesaleSourcingHubs.map(h => `
              <div class="dash-hub-card">
                <div class="hub-head">
                  <span class="hub-type-badge">${h.type}</span>
                  <h4>${h.name}</h4>
                  <small class="hub-loc"><i class="fa-solid fa-location-dot"></i> ${h.location}</small>
                </div>
                <div class="hub-details">
                  <p><strong><i class="fa-solid fa-cart-flatbed"></i> Procurement:</strong> ${h.procurementMethod}</p>
                  <p><strong><i class="fa-solid fa-circle-check text-success"></i> Verification:</strong> ${h.verificationMethod}</p>
                </div>
                <div class="hub-portal-link">
                  <a href="${h.officialPortal.split(' ')[0]}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Official Portal
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4. LOGISTICS, TRANSPORT & SEASONAL OPPORTUNITIES -->
        <div class="dash-grid-two">
          <!-- Logistics -->
          <div class="dash-section dash-box-sub">
            <h4 class="sub-sec-title"><i class="fa-solid fa-truck-fast text-primary"></i> Transportation & Logistics</h4>
            <ul class="dash-info-list">
              <li><strong>Railway Parcel Hubs:</strong> ${d.logisticsAndTransport.railwayHubs}</li>
              <li><strong>KSRTC Swift Cargo:</strong> ${d.logisticsAndTransport.ksrtcParcelService}</li>
              <li><strong>Major Roadways:</strong> ${d.logisticsAndTransport.roadNetworks}</li>
              ${d.logisticsAndTransport.privateParcel ? `<li><strong>Local Carriers:</strong> ${d.logisticsAndTransport.privateParcel}</li>` : ''}
            </ul>
          </div>

          <!-- Seasonal Opportunities -->
          <div class="dash-section dash-box-sub">
            <h4 class="sub-sec-title"><i class="fa-solid fa-calendar-days text-danger"></i> Seasonal Selling Windows</h4>
            <div class="seasons-mini-list">
              ${d.seasonalOpportunities.map(s => `
                <div class="season-item-mini">
                  <div class="season-title-row">
                    <strong>${s.season}</strong>
                    <span class="timing-badge">${s.timing}</span>
                  </div>
                  <p class="season-demand-text"><i class="fa-solid fa-fire text-warning"></i> ${s.highDemandProducts}</p>
                  ${s.action ? `<small class="season-action-text"><i class="fa-solid fa-arrow-right"></i> ${s.action}</small>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 5. SUPPLIER VERIFICATION & GROUND MARKET RESEARCH INSTRUCTIONS -->
        <div class="dash-grid-two">
          <!-- Verification Methods -->
          <div class="dash-section dash-box-sub">
            <h4 class="sub-sec-title"><i class="fa-solid fa-user-shield text-success"></i> Supplier Verification Protocol</h4>
            <ol class="dash-steps-list">
              ${d.supplierVerificationGuide.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>

          <!-- Ground Research Instructions -->
          <div class="dash-section dash-box-sub">
            <h4 class="sub-sec-title"><i class="fa-solid fa-clipboard-question text-info"></i> Ground Market Research (Pre-Purchase)</h4>
            <ol class="dash-steps-list">
              ${(d.groundMarketResearchInstructions || [
                "Survey 5 retail stores in your locality to note customer price expectations.",
                "Inspect physical samples before committing to any wholesale order.",
                "Obtain 5 soft commitments/orders through WhatsApp product pictures.",
                "Start with a micro-batch under ₹3,500 to validate actual cash turnover."
              ]).map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
        </div>

        <!-- 6. STATUTORY & FOOD SAFETY REQUIREMENTS -->
        <div class="dash-section dash-statutory-box">
          <div class="statutory-head">
            <i class="fa-solid fa-file-shield text-warning"></i>
            <h4>Applicable Trading & Food Safety Requirements</h4>
          </div>
          <div class="statutory-grid">
            <div class="stat-item">
              <strong>FSSAI Registration:</strong>
              <span>${d.statutoryRequirements.fssai}</span>
            </div>
            <div class="stat-item">
              <strong>MSME Udyam:</strong>
              <span>${d.statutoryRequirements.udyam}</span>
            </div>
            <div class="stat-item">
              <strong>Legal Metrology:</strong>
              <span>${d.statutoryRequirements.legalMetrology || 'Mandatory compliance with Legal Metrology (Packaged Commodities) Rules: MRP, Net Weight, Mfg Date, Best Before.'}</span>
            </div>
          </div>
        </div>

        <!-- 7. RECOMMENDED ACADEMIES & OFFICIAL SOURCES FOOTER -->
        <div class="dash-footer-row">
          <div class="recommended-academies-wrap">
            <span><i class="fa-solid fa-graduation-cap"></i> Recommended Study Academies for ${name}:</span>
            <div class="academies-pills-row">
              ${d.recommendedAcademies.map(acId => `
                <a href="#academy/${acId}" class="academy-chip-link" onclick="app.openAcademy('${acId}')">
                  <i class="fa-solid fa-book-open"></i> ${acId.toUpperCase()} Academy
                </a>
              `).join('')}
            </div>
          </div>
          <div class="dash-source-cite">
            <small><i class="fa-solid fa-circle-info"></i> ${d.verificationSource}</small>
          </div>
        </div>

      </div>
    `;
  },

  handleSearch(query) {
    const q = (query || '').toLowerCase().trim();
    if (!q || !window.keralaTradingIntelData) return;

    const districts = window.keralaTradingIntelData.districts;
    let matchedDistrict = null;

    for (const [distId, d] of Object.entries(districts)) {
      if (distId.includes(q) || d.name.en.toLowerCase().includes(q) || (d.name.ml && d.name.ml.includes(q))) {
        matchedDistrict = distId;
        break;
      }
      const hasTown = d.taluksAndTowns.some(t => 
        t.name.en.toLowerCase().includes(q) || 
        (t.name.ml && t.name.ml.includes(q)) ||
        t.tradingHotspots.some(h => h.toLowerCase().includes(q))
      );
      if (hasTown) {
        matchedDistrict = distId;
        break;
      }
    }

    if (matchedDistrict) {
      this.setDistrict(matchedDistrict);
    }
  },

  renderFilteredProducts() {
    const box = document.getElementById('keralaFilterBox');
    const results = document.getElementById('keralaFilterResults');
    if (!box || !results || !window.keralaTradingIntelData) return;

    const lang = (window.app && window.app.currentLang) || 'en';

    box.innerHTML = `
      <div class="filter-controls-header">
        <h3><i class="fa-solid fa-sliders text-success"></i> Multi-Attribute Trading Opportunity Filter</h3>
        <p>Filter official Kerala physical goods opportunities and matching courses by budget, district, storage, and inventory risk.</p>
      </div>
      <div class="filter-controls-grid">
        <!-- District -->
        <div class="filter-group">
          <label><i class="fa-solid fa-location-dot"></i> District:</label>
          <select id="kfDistrict" class="form-control" onchange="keralaIntel.updateFilter('district', this.value)">
            <option value="all" ${this.filterState.district === 'all' ? 'selected' : ''}>All 14 Districts (കേരളം മുഴുവൻ)</option>
            <option value="kollam" ${this.filterState.district === 'kollam' ? 'selected' : ''}>⭐ Kollam (കൊല്ലം) - Priority</option>
            <option value="thiruvananthapuram" ${this.filterState.district === 'thiruvananthapuram' ? 'selected' : ''}>Thiruvananthapuram</option>
            <option value="pathanamthitta" ${this.filterState.district === 'pathanamthitta' ? 'selected' : ''}>Pathanamthitta</option>
            <option value="alappuzha" ${this.filterState.district === 'alappuzha' ? 'selected' : ''}>Alappuzha</option>
            <option value="kottayam" ${this.filterState.district === 'kottayam' ? 'selected' : ''}>Kottayam</option>
            <option value="idukki" ${this.filterState.district === 'idukki' ? 'selected' : ''}>Idukki</option>
            <option value="ernakulam" ${this.filterState.district === 'ernakulam' ? 'selected' : ''}>Ernakulam / Kochi</option>
            <option value="thrissur" ${this.filterState.district === 'thrissur' ? 'selected' : ''}>Thrissur</option>
            <option value="palakkad" ${this.filterState.district === 'palakkad' ? 'selected' : ''}>Palakkad</option>
            <option value="malappuram" ${this.filterState.district === 'malappuram' ? 'selected' : ''}>Malappuram</option>
            <option value="kozhikode" ${this.filterState.district === 'kozhikode' ? 'selected' : ''}>Kozhikode</option>
            <option value="wayanad" ${this.filterState.district === 'wayanad' ? 'selected' : ''}>Wayanad</option>
            <option value="kannur" ${this.filterState.district === 'kannur' ? 'selected' : ''}>Kannur</option>
            <option value="kasaragod" ${this.filterState.district === 'kasaragod' ? 'selected' : ''}>Kasaragod</option>
          </select>
        </div>

        <!-- Available Capital -->
        <div class="filter-group">
          <label><i class="fa-solid fa-coins text-warning"></i> Starting Capital:</label>
          <select id="kfCapital" class="form-control" onchange="keralaIntel.updateFilter('capital', this.value)">
            <option value="all">All Budgets (≤ ₹10,000)</option>
            <option value="micro">Micro-Pilot (< ₹2,500)</option>
            <option value="starter">Growth Starter (₹2,500 - ₹5,000)</option>
            <option value="standard">Standard Hub (₹5,000 - ₹10,000)</option>
          </select>
        </div>

        <!-- Category -->
        <div class="filter-group">
          <label><i class="fa-solid fa-boxes-stacked text-primary"></i> Product Category:</label>
          <select id="kfCategory" class="form-control" onchange="keralaIntel.updateFilter('category', this.value)">
            <option value="all">All Categories</option>
            <option value="packaged_food">Packaged Halal Food & Cashew</option>
            <option value="textiles">Modest Wear & Handloom</option>
            <option value="spices">Spices & Farm Produce</option>
            <option value="household">Household & Clay Cookware</option>
            <option value="mobile_accessories">Mobile Accessories</option>
            <option value="stationery">Stationery & Paper Products</option>
            <option value="general_utility">General Utility & Woodcraft</option>
            <option value="attar">Attar & Fragrance Oils</option>
            <option value="cosmetics">Cold-Pressed Virgin Oils</option>
          </select>
        </div>

        <!-- Storage Requirements -->
        <div class="filter-group">
          <label><i class="fa-solid fa-warehouse text-info"></i> Storage Type:</label>
          <select id="kfStorage" class="form-control" onchange="keralaIntel.updateFilter('storage', this.value)">
            <option value="all">Any Storage Requirement</option>
            <option value="ambient_dry">Ambient Dry Shelf (Normal Room Temp)</option>
            <option value="cool_dry">Cool & Dry / Moisture-Proof Container</option>
          </select>
        </div>

        <!-- Selling Preference -->
        <div class="filter-group">
          <label><i class="fa-solid fa-store text-success"></i> Selling Mode:</label>
          <select id="kfSelling" class="form-control" onchange="keralaIntel.updateFilter('selling', this.value)">
            <option value="all">All Modes (Online & Offline)</option>
            <option value="hybrid">Hybrid (WhatsApp + Local Retail)</option>
            <option value="offline">Offline Direct (Grocery, Bakery, Kiosk)</option>
            <option value="online">Online / Courier Delivery</option>
          </select>
        </div>

        <!-- Inventory Risk -->
        <div class="filter-group">
          <label><i class="fa-solid fa-shield-halved text-danger"></i> Inventory Risk:</label>
          <select id="kfRisk" class="form-control" onchange="keralaIntel.updateFilter('risk', this.value)">
            <option value="all">All Risk Levels</option>
            <option value="very_low">Very Low (Indefinite Shelf Life, Non-Perishable)</option>
            <option value="low">Low (Airtight Sealed, 6-12 Months Expiry)</option>
            <option value="moderate">Moderate (Fast 30-Day Turnover Required)</option>
          </select>
        </div>
      </div>
    `;

    this.renderFilterResults();
  },

  updateFilter(key, val) {
    this.filterState[key] = val;
    this.renderFilterResults();
  },

  renderFilterResults() {
    const results = document.getElementById('keralaFilterResults');
    if (!results || !window.keralaTradingIntelData) return;

    const districts = window.keralaTradingIntelData.districts;
    const f = this.filterState;
    const lang = (window.app && window.app.currentLang) || 'en';

    let matchedProducts = [];

    for (const [distId, d] of Object.entries(districts)) {
      if (f.district !== 'all' && f.district !== distId) continue;

      d.permissibleProducts.forEach(p => {
        // Capital filter
        if (f.capital === 'micro' && p.minPilotBudget >= 2500) return;
        if (f.capital === 'starter' && (p.minPilotBudget < 2500 || p.minPilotBudget > 5000)) return;
        if (f.capital === 'standard' && p.minPilotBudget <= 5000) return;

        // Category filter
        if (f.category !== 'all' && p.category !== f.category) return;

        // Storage filter
        if (f.storage !== 'all' && p.storageType !== f.storage) return;

        // Selling filter
        if (f.selling !== 'all' && p.sellingPreference !== f.selling && p.sellingPreference !== 'hybrid') return;

        // Risk filter
        if (f.risk !== 'all' && p.inventoryRisk !== f.risk) return;

        matchedProducts.push({ product: p, district: d });
      });
    }

    if (matchedProducts.length === 0) {
      results.innerHTML = `
        <div class="kerala-empty-results">
          <i class="fa-solid fa-filter-circle-xmark"></i>
          <h4>No regional opportunities match these exact criteria</h4>
          <p>Try broadening your filters (e.g., select 'All Budgets' or 'All Districts') to discover high-margin opportunities.</p>
        </div>
      `;
      return;
    }

    results.innerHTML = `
      <div class="kerala-results-summary-bar">
        <span>Found <strong>${matchedProducts.length} verified physical opportunities</strong> matching your criteria:</span>
      </div>
      <div class="dash-products-grid">
        ${matchedProducts.map(item => {
          const p = item.product;
          const d = item.district;
          return `
            <div class="dash-prod-card">
              <div class="prod-card-top">
                <span class="prod-dist-badge"><i class="fa-solid fa-location-dot"></i> ${d.name[lang] || d.name.en}</span>
                <span class="prod-budget-tag">Min: ₹${p.minPilotBudget.toLocaleString('en-IN')}</span>
              </div>
              <h4 class="prod-card-title">${p.name[lang] || p.name.en}</h4>
              <div class="prod-economics-box">
                <i class="fa-solid fa-calculator text-warning"></i>
                <span>${p.sampleEconomics}</span>
              </div>
              ${p.inspectionChecklist ? `
                <div class="prod-inspection-box">
                  <strong><i class="fa-solid fa-magnifying-glass text-info"></i> Qabd Inspection Test:</strong>
                  <span>${p.inspectionChecklist}</span>
                </div>
              ` : ''}
              <div class="prod-meta-row">
                <span><i class="fa-solid fa-box-archive"></i> ${p.storageType.replace('_', ' ')}</span>
                <span><i class="fa-solid fa-shop"></i> ${p.sellingPreference}</span>
                <span><i class="fa-solid fa-shield-heart text-success"></i> ${p.inventoryRisk} risk</span>
              </div>
              <div class="prod-card-footer-action">
                <button class="btn btn-sm btn-outline text-success" onclick="keralaIntel.setDistrict('${d.id}'); keralaIntel.switchViewTab('dashboard');">
                  View ${d.name.en} Dashboard →
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderChecklist() {
    const container = document.getElementById('keralaChecklistContainer');
    if (!container) return;

    const lang = (window.app && window.app.currentLang) || 'en';
    const s = this.checklistState;

    const totalItems = Object.keys(s).length;
    const completedItems = Object.values(s).filter(Boolean).length;
    const progressPct = Math.round((completedItems / totalItems) * 100);

    container.innerHTML = `
      <div class="checklist-header-card">
        <div class="checklist-head-flex">
          <div>
            <span class="checklist-badge"><i class="fa-solid fa-clipboard-check"></i> Risk Mitigation Protocol</span>
            <h2>Ground Market Research & Pre-Purchase Validation Tool</h2>
            <p>Complete this 5-stage validation process before spending a single rupee on wholesale inventory. Protect your capital and guarantee buyer demand first.</p>
          </div>
          <div class="checklist-progress-circle">
            <span class="pct-num">${progressPct}%</span>
            <small>Validation Complete</small>
          </div>
        </div>
        <div class="checklist-progress-bar">
          <div class="progress-fill" style="width: ${progressPct}%;"></div>
        </div>
      </div>

      <div class="checklist-stages-list">
        <!-- STAGE 1: LOCAL COMPETITOR AUDIT -->
        <div class="check-stage-card">
          <div class="stage-card-head">
            <span class="stage-num-badge">Stage 1</span>
            <div>
              <h4>Local Retail & Shelf Price Audit</h4>
              <small>Validate actual selling prices in your town before sourcing</small>
            </div>
          </div>
          <div class="stage-items-list">
            <label class="check-item-row ${s.st1_c1 ? 'checked' : ''}">
              <input type="checkbox" ${s.st1_c1 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st1_c1', this.checked)">
              <span>Visited 5 local bakeries, supermarkets, or fancy stores in my target area (e.g., Chinnakada, Kottarakkara, or my town).</span>
            </label>
            <label class="check-item-row ${s.st1_c2 ? 'checked' : ''}">
              <input type="checkbox" ${s.st1_c2 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st1_c2', this.checked)">
              <span>Recorded the retail shelf prices, packaging weight (e.g. 100g, 250g, 500g), and brands currently on sale.</span>
            </label>
            <label class="check-item-row ${s.st1_c3 ? 'checked' : ''}">
              <input type="checkbox" ${s.st1_c3 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st1_c3', this.checked)">
              <span>Identified the most popular customer price threshold (e.g., ₹149, ₹199, or ₹299 psychological pricing).</span>
            </label>
          </div>
        </div>

        <!-- STAGE 2: UNIT COST & MARGIN REALITY CHECK -->
        <div class="check-stage-card">
          <div class="stage-card-head">
            <span class="stage-num-badge">Stage 2</span>
            <div>
              <h4>Cost-Per-Unit & Landed Cost Breakdown</h4>
              <small>Calculate true net margins including hidden transport and packaging</small>
            </div>
          </div>
          <div class="stage-items-list">
            <label class="check-item-row ${s.st2_c1 ? 'checked' : ''}">
              <input type="checkbox" ${s.st2_c1 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st2_c1', this.checked)">
              <span>Calculated base wholesale purchasing price per unit directly from primary hub or co-operative society.</span>
            </label>
            <label class="check-item-row ${s.st2_c2 ? 'checked' : ''}">
              <input type="checkbox" ${s.st2_c2 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st2_c2', this.checked)">
              <span>Added realistic freight / KSRTC cargo transit cost + pouch/jar packaging + label printing per unit.</span>
            </label>
            <label class="check-item-row ${s.st2_c3 ? 'checked' : ''}">
              <input type="checkbox" ${s.st2_c3 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st2_c3', this.checked)">
              <span>Confirmed minimum net profit margin of at least 35% on cost after deducting all operational expenses.</span>
            </label>
          </div>
        </div>

        <!-- STAGE 3: CUSTOMER PRE-VALIDATION & SOFT COMMITMENTS -->
        <div class="check-stage-card">
          <div class="stage-card-head">
            <span class="stage-num-badge">Stage 3</span>
            <div>
              <h4>Customer Pre-Validation (Zero Financial Risk)</h4>
              <small>Get actual customer commitments before placing bulk inventory orders</small>
            </div>
          </div>
          <div class="stage-items-list">
            <label class="check-item-row ${s.st3_c1 ? 'checked' : ''}">
              <input type="checkbox" ${s.st3_c1 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st3_c1', this.checked)">
              <span>Procured a single sample unit / tester pack to inspect physical quality and take authentic product photos.</span>
            </label>
            <label class="check-item-row ${s.st3_c2 ? 'checked' : ''}">
              <input type="checkbox" ${s.st3_c2 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st3_c2', this.checked)">
              <span>Shared product photos and price offer with 15 prospective buyers (WhatsApp status, direct family, local shops).</span>
            </label>
            <label class="check-item-row ${s.st3_c3 ? 'checked' : ''}">
              <input type="checkbox" ${s.st3_c3 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st3_c3', this.checked)">
              <span>Secured at least 5 verbal or advance pre-orders before placing the bulk inventory order.</span>
            </label>
          </div>
        </div>

        <!-- STAGE 4: PHYSICAL SAMPLE & QABD INSPECTION -->
        <div class="check-stage-card">
          <div class="stage-card-head">
            <span class="stage-num-badge">Stage 4</span>
            <div>
              <h4>Physical Inspection & Qabd Possession Check</h4>
              <small>Strict compliance with Islamic physical goods trading principles</small>
            </div>
          </div>
          <div class="stage-items-list">
            <label class="check-item-row ${s.st4_c1 ? 'checked' : ''}">
              <input type="checkbox" ${s.st4_c1 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st4_c1', this.checked)">
              <span>Enforced physical possession (Qabd) — goods physically inspected and held in stock before selling to retail customers.</span>
            </label>
            <label class="check-item-row ${s.st4_c2 ? 'checked' : ''}">
              <input type="checkbox" ${s.st4_c2 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st4_c2', this.checked)">
              <span>Verified FSSAI license (on foscos.fssai.gov.in) or Handloom Mark certification on supplier invoice.</span>
            </label>
            <label class="check-item-row ${s.st4_c3 ? 'checked' : ''}">
              <input type="checkbox" ${s.st4_c3 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st4_c3', this.checked)">
              <span>Agreed in writing with supplier on return/replacement terms for transit-damaged or defective goods.</span>
            </label>
          </div>
        </div>

        <!-- STAGE 5: MICRO-PILOT LAUNCH -->
        <div class="check-stage-card">
          <div class="stage-card-head">
            <span class="stage-num-badge">Stage 5</span>
            <div>
              <h4>Micro-Pilot Launch (Under ₹3,500)</h4>
              <small>Execute low-risk first cycle to validate real cash turnaround</small>
            </div>
          </div>
          <div class="stage-items-list">
            <label class="check-item-row ${s.st5_c1 ? 'checked' : ''}">
              <input type="checkbox" ${s.st5_c1 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st5_c1', this.checked)">
              <span>Placed initial test order capped under ₹3,500 (e.g. 20 packs of cashews or 15 handloom stoles).</span>
            </label>
            <label class="check-item-row ${s.st5_c2 ? 'checked' : ''}">
              <input type="checkbox" ${s.st5_c2 ? 'checked' : ''} onchange="keralaIntel.toggleCheck('st5_c2', this.checked)">
              <span>Delivered pre-orders within 48 hours, collected cash payments, and recorded net profit into ledger.</span>
            </label>
          </div>
        </div>
      </div>
    `;
  },

  toggleCheck(key, isChecked) {
    this.checklistState[key] = isChecked;
    this.saveChecklistState();
    this.renderChecklist();
  },

  renderSourcingDirectory() {
    const container = document.getElementById('keralaDirectoryContainer');
    if (!container || !window.keralaTradingIntelData) return;

    const districts = window.keralaTradingIntelData.districts;
    let allHubs = [];

    for (const [distId, d] of Object.entries(districts)) {
      d.wholesaleSourcingHubs.forEach(h => {
        allHubs.push({ hub: h, district: d });
      });
    }

    container.innerHTML = `
      <div class="directory-master-header">
        <div class="dir-notice-box">
          <i class="fa-solid fa-shield-halved text-success"></i>
          <div>
            <h4>Official Public Sector & Regulated Wholesale Sourcing Directory</h4>
            <p>To eliminate speculation, scams, and unverified private intermediaries, this directory lists <strong>ONLY verifiable government co-operative federations, Public Sector Undertakings (PSUs), DIC common facility clusters, and centuries-old regulated municipal wholesale bazaars</strong>.</p>
          </div>
        </div>
      </div>

      <div class="directory-cards-container">
        ${allHubs.map(item => {
          const h = item.hub;
          const d = item.district;
          return `
            <div class="verified-hub-entry-card">
              <div class="entry-header-row">
                <span class="hub-tag-verified"><i class="fa-solid fa-circle-check text-success"></i> VERIFIED PUBLIC ENTITY</span>
                <span class="hub-district-pill"><i class="fa-solid fa-location-dot"></i> ${d.name.en}</span>
              </div>
              <h3 class="entry-hub-name">${h.name}</h3>
              <p class="entry-hub-type"><strong>Classification:</strong> ${h.type}</p>
              <p class="entry-hub-loc"><strong>Location:</strong> ${h.location}</p>
              
              <div class="entry-details-grid">
                <div class="entry-proc-box">
                  <strong><i class="fa-solid fa-handshake-simple"></i> Procurement Procedure:</strong>
                  <span>${h.procurementMethod}</span>
                </div>
                <div class="entry-verif-box">
                  <strong><i class="fa-solid fa-certificate"></i> Mandatory Verification:</strong>
                  <span>${h.verificationMethod}</span>
                </div>
              </div>

              <div class="entry-footer-bar">
                <a href="${h.officialPortal.split(' ')[0]}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline text-success">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Official Portal
                </a>
                <button class="btn btn-sm btn-light" onclick="keralaIntel.setDistrict('${d.id}'); keralaIntel.switchViewTab('dashboard');">
                  View Full ${d.name.en} Dashboard →
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  printDistrictReport() {
    window.print();
  }
};

// Export to window
window.keralaIntel = keralaIntel;
