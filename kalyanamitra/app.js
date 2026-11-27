// KalyanaMitra Kerala - Main Interactive Application Logic

// Application State
const state = {
  currentMenu: 'malabar_mutton_biryani',
  currentGuests: 500,
  selectedDistrict: 'all',
  selectedCategory: 'all',
  searchQuery: '',
  targetBudget: 300000,
  budgetGuests: 600,
  vendorsList: [...VERIFIED_VENDORS],
  
  // Geolocation & Proximity State
  userLat: null,
  userLng: null,
  userAccuracy: null,
  isLocationActive: false,
  detectedDistrict: null,
  maxRadiusKm: 'all',
  sortOrder: 'nearest',

  // Timeline & Catalog Modes
  timelineMode: 'all', // 'all', 'urgent', 'advance'
  utensilViewMode: 'rent', // 'rent', 'buy'

  // Northern Kerala Flagship Hub & Halls Filters (Kasaragod, Kozhikode, Kannur, Malappuram & Wayanad)
  hubDistrict: 'kasaragod',
  selectedTown: 'all',
  kasaragodTalukFilter: 'all',
  kasaragodVillageQuery: '',
  hallDistrictFilter: 'all',
  hallRegionFilter: 'all',
  hallTierFilter: 'all',
  hallMinSeating: 0,
  hallSearchQuery: '',
  selectedCompareHalls: [],

  // Section Navigation & Classified Catalog Filters
  activeSection: 'home',
  fullPageView: false,
  foodClassFilter: 'all',
  classifiedFoodSearchQuery: '',
  goodsClassFilter: 'all',
  classifiedGoodsSearchQuery: '',

  // Stage Decor & Pandal State
  selectedDecorTheme: 'decor_traditional_kasavu',
  pandalArea: 1500,
  hasMistFans: true,
  hasGenerator: false,
  vegSearchQuery: '',
  utensilSearchQuery: '',

  // Procurement Sheet & Checklist State
  procurementList: JSON.parse(localStorage.getItem('kalyana_procurement_list') || '[]'),
  completedTasks: JSON.parse(localStorage.getItem('kalyana_completed_tasks') || '[]')
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderLiveTickerBar();
  initHeroEstimator();
  initDistrictDropdowns();
  renderMenuButtons();
  updateCalculatorUI();
  updateLabourEstimator();
  runBudgetOptimization();
  updateAuditoriumCapacity();
  populateHallRegionsDropdown();
  selectHubDistrict('kasaragod', false);
  renderKasaragodWeddingHalls();
  renderClassifiedFoodGrid();
  renderClassifiedGoodsGrid();
  renderPeopleCategoryPills();
  renderVendors();
  renderVegetablesCatalog();
  renderUtensilsDualCatalog();
  selectDecorTheme(state.selectedDecorTheme);
  renderWeddingTimeline();
  renderFoodRescueNetwork();
  updateProcurementBadge();
  calculateHousePrepCost();
  handleInitialHashNavigation();
  window.addEventListener('hashchange', handleInitialHashNavigation);
  lucide.createIcons();
}
);

// -------------------------------------------------------------
// 1. Live Commodity Ticker Ribbon
// -------------------------------------------------------------
function renderLiveTickerBar() {
  const ticker = document.getElementById('liveTickerBar');
  if (!ticker || typeof DAILY_COMMODITY_TICKER === 'undefined') return;

  ticker.innerHTML = DAILY_COMMODITY_TICKER.map(item => {
    return `
      <div class="inline-flex items-center gap-1.5 shrink-0">
        <span class="text-slate-300">${item.name}:</span>
        <span class="font-extrabold text-amber-300">${item.wholesale}</span>
        <span class="text-[10px] text-emerald-400">●</span>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// 2. Hero Snapshot Estimator
// -------------------------------------------------------------
function initHeroEstimator() {
  const menuSelect = document.getElementById('heroMenuSelect');
  const guestSlider = document.getElementById('heroGuestSlider');
  const guestDisplay = document.getElementById('heroGuestDisplay');

  function updateHeroSnapshot() {
    const menuKey = menuSelect.value;
    const guests = parseInt(guestSlider.value, 10);
    guestDisplay.innerText = `${guests.toLocaleString('en-IN')} Guests`;

    const result = calculateWeddingBOM(menuKey, guests);
    if (!result) return;

    document.getElementById('heroRawCost').innerText = `₹${result.totalRawMaterialCost.toLocaleString('en-IN')}`;
    document.getElementById('heroLabourCost').innerText = `₹${result.masterCookLabour.toLocaleString('en-IN')}`;
    document.getElementById('heroDirectTotal').innerText = `₹${result.totalDirectCost.toLocaleString('en-IN')}`;
    document.getElementById('heroCateringCost').innerText = `₹${result.cateringContractCost.toLocaleString('en-IN')}`;
    document.getElementById('heroSavings').innerText = `Save ~₹${result.estimatedSavings.toLocaleString('en-IN')}`;
  }

  if (menuSelect && guestSlider) {
    menuSelect.addEventListener('change', updateHeroSnapshot);
    guestSlider.addEventListener('input', updateHeroSnapshot);
    updateHeroSnapshot();
  }
}

// -------------------------------------------------------------
// 3. Main Culinary BOM & Cost Estimator
// -------------------------------------------------------------
function renderMenuButtons() {
  const container = document.getElementById('menuButtonContainer');
  if (!container) return;

  container.innerHTML = Object.values(WEDDING_MENUS).map(menu => {
    const isActive = menu.id === state.currentMenu;
    return `
      <button onclick="selectMenu('${menu.id}')" class="p-3 rounded-xl border text-left transition-all ${
        isActive 
          ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600/50' 
          : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
      }">
        <div class="font-bold text-xs sm:text-sm line-clamp-1">${menu.name}</div>
        <div class="text-[11px] ${isActive ? 'text-amber-300' : 'text-slate-500'} mt-0.5">
          Wholesale: ₹${menu.selfProcuredWholesaleCostPerPlate}/plate
        </div>
      </button>
    `;
  }).join('');
}

function selectMenu(menuId) {
  state.currentMenu = menuId;
  renderMenuButtons();
  updateCalculatorUI();
}

const calcSlider = document.getElementById('calcGuestSlider');
const calcInput = document.getElementById('calcGuestInput');

if (calcSlider && calcInput) {
  calcSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    calcInput.value = val;
    state.currentGuests = val;
    updateCalculatorUI();
  });

  calcInput.addEventListener('input', (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 50) val = 50;
    if (val > 5000) val = 5000;
    calcSlider.value = val;
    state.currentGuests = val;
    updateCalculatorUI();
  });
}

function updateCalculatorUI() {
  const result = calculateWeddingBOM(state.currentMenu, state.currentGuests);
  if (!result) return;

  document.getElementById('statRawCost').innerText = `₹${result.totalRawMaterialCost.toLocaleString('en-IN')}`;
  document.getElementById('statLabourCost').innerText = `₹${result.masterCookLabour.toLocaleString('en-IN')}`;
  document.getElementById('statDirectTotal').innerText = `₹${result.totalDirectCost.toLocaleString('en-IN')}`;
  document.getElementById('statSavings').innerText = `₹${result.estimatedSavings.toLocaleString('en-IN')} Saved`;

  document.getElementById('bomTableTitle').innerText = `Itemized Raw Ingredients List for ${state.currentGuests.toLocaleString('en-IN')} Guests`;
  document.getElementById('bomTableSubtitle').innerText = `${result.menu.name} • ${result.menu.tagline}`;

  const tbody = document.getElementById('bomTableBody');
  if (tbody) {
    tbody.innerHTML = result.calculatedItems.map((item, index) => {
      return `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="py-3 px-6 font-semibold text-slate-900">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] flex items-center justify-center font-bold">${index + 1}</span>
              <span>${item.item}</span>
            </div>
          </td>
          <td class="py-3 px-4 text-center font-bold text-emerald-800 bg-emerald-50/40">
            ${item.totalQty.toLocaleString('en-IN')} ${item.unit}
          </td>
          <td class="py-3 px-4 text-right font-medium text-slate-600">
            ₹${item.estRate.toLocaleString('en-IN')} / ${item.unit}
          </td>
          <td class="py-3 px-6 text-right font-extrabold text-slate-900">
            ₹${item.estCost.toLocaleString('en-IN')}
          </td>
          <td class="py-3 px-6 text-xs text-slate-500 hidden sm:table-cell">
            ${item.notes}
          </td>
        </tr>
      `;
    }).join('');
  }

  updateLabourEstimator();
  lucide.createIcons();
}


function shareBOMOnWhatsApp() {
  const result = calculateWeddingBOM(state.currentMenu, state.currentGuests);
  if (!result) return;

  let message = `*KalyanaMitra Kerala - Wedding Raw Material Requirement List*\n`;
  message += `Menu: ${result.menu.name}\n`;
  message += `Guest Count: ${state.currentGuests} Guests\n\n`;
  message += `*Calculated Ingredients (BOM):*\n`;

  result.calculatedItems.forEach((item, idx) => {
    message += `${idx + 1}. ${item.item}: *${item.totalQty} ${item.unit}* (~₹${item.estCost.toLocaleString('en-IN')})\n`;
  });

  message += `\n*Financial Breakdown:*`;
  message += `\n• Raw Material Sourcing: ₹${result.totalRawMaterialCost.toLocaleString('en-IN')}`;
  message += `\n• Cook Labour Fee (~₹45/plate): ₹${result.masterCookLabour.toLocaleString('en-IN')}`;
  message += `\n• Total Direct Cost: *₹${result.totalDirectCost.toLocaleString('en-IN')}*`;
  message += `\n• (Direct Savings vs Caterer: ~₹${result.estimatedSavings.toLocaleString('en-IN')})\n`;
  message += `\nGenerated via KalyanaMitra (Zero-Commission Wholesale Hub).`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
}

// -------------------------------------------------------------
// 4. "Plan Within My Budget" Smart Optimizer
// -------------------------------------------------------------
function setBudgetPreset(amount) {
  document.getElementById('budgetInputAmount').value = amount;
  runBudgetOptimization();
}

function runBudgetOptimization() {
  const budgetInput = document.getElementById('budgetInputAmount');
  const guestsInput = document.getElementById('budgetInputGuests');

  const budget = parseInt(budgetInput.value, 10) || 300000;
  const guests = parseInt(guestsInput.value, 10) || 600;

  state.targetBudget = budget;
  state.budgetGuests = guests;

  const result = calculateBudgetOptimization(budget, guests);

  document.getElementById('resPerGuest').innerText = `₹${result.perPersonAvailable.toLocaleString('en-IN')} / person`;
  
  const badge = document.getElementById('resBudgetBadge');
  badge.innerText = `${result.budgetHealth} Budget`;
  if (result.budgetHealth === 'Luxury') {
    badge.className = 'px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-300';
  } else if (result.budgetHealth === 'Optimal') {
    badge.className = 'px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300';
  } else {
    badge.className = 'px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300';
  }

  document.getElementById('allocFood').innerText = `₹${result.allocation.food.toLocaleString('en-IN')}`;
  document.getElementById('allocPandal').innerText = `₹${result.allocation.pandal.toLocaleString('en-IN')}`;
  document.getElementById('allocRentals').innerText = `₹${result.allocation.rentals.toLocaleString('en-IN')}`;
  document.getElementById('allocHome').innerText = `₹${result.allocation.homePrep.toLocaleString('en-IN')}`;
  document.getElementById('allocLogistics').innerText = `₹${result.allocation.logistics.toLocaleString('en-IN')}`;

  const adviceList = document.getElementById('budgetAdviceList');
  if (adviceList) {
    adviceList.innerHTML = result.advice.map(item => `
      <div class="flex items-start gap-2">
        <span class="text-emerald-600 font-bold">•</span>
        <span>${item}</span>
      </div>
    `).join('');
  }

  updateAuditoriumCapacity();
  lucide.createIcons();
}


// -------------------------------------------------------------
// 5. Live Geolocation & Proximity Rate Analyzer
// -------------------------------------------------------------
function requestLiveLocation() {
  const btnText = document.getElementById('btnDetectLocationText');
  const statusBadge = document.getElementById('locationStatusBadge');
  const statusText = document.getElementById('locationStatusText');

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser. Please select your district manually from the list.");
    return;
  }

  if (btnText) btnText.innerText = "Requesting GPS Permission...";
  if (statusBadge) {
    statusBadge.innerText = "Acquiring GPS...";
    statusBadge.className = "text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-900 animate-pulse";
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      handleLocationSuccess(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
    },
    (error) => {
      handleLocationError(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}

function handleLocationSuccess(lat, lng, accuracy) {
  state.userLat = lat;
  state.userLng = lng;
  state.userAccuracy = Math.round(accuracy || 15);
  state.isLocationActive = true;

  const nearestDistrict = findNearestDistrict(lat, lng);
  state.detectedDistrict = nearestDistrict;

  const btnText = document.getElementById('btnDetectLocationText');
  const statusBadge = document.getElementById('locationStatusBadge');
  const statusText = document.getElementById('locationStatusText');
  const btnReset = document.getElementById('btnResetLocation');

  if (btnText) btnText.innerText = "📍 GPS Active: Refresh Location";
  if (btnReset) btnReset.classList.remove('hidden');

  if (statusBadge) {
    statusBadge.innerText = `GPS Active (±${state.userAccuracy}m)`;
    statusBadge.className = "text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-400 text-slate-950 font-black";
  }

  if (statusText) {
    statusText.innerHTML = `
      Your live coordinates: <strong>${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E</strong>. 
      Detected region: <strong>${nearestDistrict ? nearestDistrict.name : 'Kerala'}</strong> (~${nearestDistrict ? nearestDistrict.distanceKm : 0} km from district center).
      Showing nearest wholesale markets and live rates!
    `;
  }

  const analysisCard = document.getElementById('liveLocationAnalysisCard');
  if (analysisCard) {
    analysisCard.classList.remove('hidden');
    document.getElementById('detectedLocationHeading').innerText = `Detected: Near ${nearestDistrict ? nearestDistrict.name : 'Kerala'} District`;
    document.getElementById('detectedCoordinatesBadge').innerText = `GPS: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E (±${state.userAccuracy}m)`;

    renderNearbyRatesAnalysis(lat, lng);
  }

  const districtSelect = document.getElementById('districtFilterSelect');
  if (districtSelect) {
    districtSelect.value = 'all';
    state.selectedDistrict = 'all';
    updateDistrictNotice();
  }

  renderPeopleCategoryPills();
  renderVendors();
  navigateToSection('people', 'liveLocationAnalysisCard');

  lucide.createIcons();
}


function handleLocationError(error) {
  const btnText = document.getElementById('btnDetectLocationText');
  const statusBadge = document.getElementById('locationStatusBadge');
  const statusText = document.getElementById('locationStatusText');

  if (btnText) btnText.innerText = "Detect My Live GPS Location";
  if (statusBadge) {
    statusBadge.innerText = "Permission Required";
    statusBadge.className = "text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950";
  }

  let errorMsg = "Unable to retrieve your location.";
  if (error.code === error.PERMISSION_DENIED) {
    errorMsg = "Browser location permission was denied. You can still test this feature using our Quick Location Simulator below, or pick a district manually.";
  } else if (error.code === error.TIMEOUT) {
    errorMsg = "GPS location request timed out. Retrying or use simulator.";
  }

  if (statusText) {
    statusText.innerHTML = `
      <span class="text-amber-300 font-bold">⚠️ ${errorMsg}</span>
      <div class="mt-2 flex flex-wrap gap-2">
        <span class="text-[11px] text-white">Simulate Location in Kerala:</span>
        <button onclick="simulateLocation('kozhikode')" class="text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded">📍 Kozhikode (Palayam)</button>
        <button onclick="simulateLocation('kannur')" class="text-[11px] font-bold bg-emerald-500/80 hover:bg-emerald-400 text-white px-2 py-0.5 rounded">📍 Kannur (Camp Bazaar)</button>
        <button onclick="simulateLocation('malappuram')" class="text-[11px] font-bold bg-amber-400/90 hover:bg-amber-300 text-slate-950 px-2 py-0.5 rounded">📍 Malappuram (Manjeri)</button>
        <button onclick="simulateLocation('wayanad')" class="text-[11px] font-bold bg-emerald-700/80 hover:bg-emerald-600 text-white px-2 py-0.5 rounded">📍 Wayanad (Kalpetta)</button>
        <button onclick="simulateLocation('ernakulam')" class="text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded">📍 Kochi (Broadway)</button>
        <button onclick="simulateLocation('thiruvananthapuram')" class="text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded">📍 Trivandrum (Chalai)</button>
        <button onclick="simulateLocation('kasaragod')" class="text-[11px] font-bold bg-amber-400/90 hover:bg-amber-300 text-slate-950 px-2 py-0.5 rounded">📍 Kasaragod (Complete Hub)</button>
      </div>
    `;
  }

  lucide.createIcons();
}


function simulateLocation(districtId) {
  const district = KERALA_DISTRICTS.find(d => d.id === districtId);
  if (!district) return;
  handleLocationSuccess(district.lat + 0.005, district.lng + 0.005, 10);
}

function resetLiveLocation() {
  state.userLat = null;
  state.userLng = null;
  state.isLocationActive = false;
  state.detectedDistrict = null;
  state.maxRadiusKm = 'all';

  const analysisCard = document.getElementById('liveLocationAnalysisCard');
  if (analysisCard) analysisCard.classList.add('hidden');

  const btnReset = document.getElementById('btnResetLocation');
  if (btnReset) btnReset.classList.add('hidden');

  const btnText = document.getElementById('btnDetectLocationText');
  if (btnText) btnText.innerText = "Detect My Live GPS Location";

  const statusBadge = document.getElementById('locationStatusBadge');
  if (statusBadge) {
    statusBadge.innerText = "GPS Ready";
    statusBadge.className = "text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-emerald-200 border border-white/10";
  }

  const statusText = document.getElementById('locationStatusText');
  if (statusText) {
    statusText.innerText = "Click below to grant browser location permission. The engine will detect your Kerala district & coordinates, calculate exact distance (km) to all wholesale markets, and analyze the cheapest local rates.";
  }

  renderVendors();
  lucide.createIcons();
}


function renderNearbyRatesAnalysis(lat, lng) {
  const grid = document.getElementById('nearestRatesGrid');
  if (!grid) return;

  const analysis = analyzeNearbyVendors(lat, lng, state.vendorsList);
  const nearest = analysis.nearestPerCategory;

  const categoryCards = [
    { cat: 'meat', label: 'Nearest Meat & Seafood Mandi', icon: 'drumstick', color: 'text-rose-600', vendor: nearest['meat'] },
    { cat: 'vegetables', label: 'Nearest Vegetable Auction Mandi', icon: 'apple', color: 'text-emerald-600', vendor: nearest['vegetables'] },
    { cat: 'rentals', label: 'Nearest Pandal & Vessel Rentals', icon: 'tent', color: 'text-amber-600', vendor: nearest['rentals'] },
    { cat: 'home_prep', label: 'Nearest Home Painting Team', icon: 'paint-roller', color: 'text-purple-600', vendor: nearest['home_prep'] },
    { cat: 'logistics', label: 'Nearest Goods Delivery Van', icon: 'truck', color: 'text-blue-600', vendor: nearest['logistics'] }
  ];

  grid.innerHTML = categoryCards.map(item => {
    const v = item.vendor;
    if (!v) return '';

    const waText = encodeURIComponent(
      `Hello ${v.owner}! I found ${v.name} on KalyanaMitra live GPS search.\n` +
      `I am located approximately ${v.distanceKm} km from your shop. Could you confirm bulk wholesale pricing and delivery availability for an upcoming wedding?`
    );
    const waLink = `https://wa.me/${v.whatsapp}?text=${waText}`;

    return `
      <div class="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-1 mb-1.5">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">${item.label}</span>
            <span class="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              📍 ${v.distanceKm} km away
            </span>
          </div>

          <h5 class="text-sm font-bold text-slate-900 line-clamp-1">${v.name}</h5>
          <p class="text-xs text-slate-500 line-clamp-1">${v.location}</p>

          <div class="mt-2 text-xs font-bold text-emerald-900 bg-slate-50 p-2 rounded-lg border border-slate-100">
            ${v.priceSnippet}
          </div>
        </div>

        <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-sm">
            <i data-lucide="message-circle" class="w-3.5 h-3.5 fill-white text-emerald-500"></i>
            <span>Enquire Rates</span>
          </a>
          <a href="tel:${v.phone}" class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700" title="Call Shop">
            <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-800"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}


function handleRadiusChange(e) {
  state.maxRadiusKm = e.target.value;
  renderVendors();
}

function handleSortChange(e) {
  state.sortOrder = e.target.value;
  renderVendors();
}

// -------------------------------------------------------------
// 6. Hyperlocal Wholesale Directory (14 Districts)
// -------------------------------------------------------------
function initDistrictDropdowns() {
  const filterSelect = document.getElementById('districtFilterSelect');
  const modalSelect = document.getElementById('modalDistrictSelect');

  const optionsHTML = KERALA_DISTRICTS.map(d => {
    return `<option value="${d.id}">${d.name} (${d.mainMarkets[0]})</option>`;
  }).join('');

  if (filterSelect) {
    filterSelect.innerHTML = `<option value="all">All Kerala Districts (14 Districts)</option>` + optionsHTML;
    filterSelect.addEventListener('change', (e) => {
      state.selectedDistrict = e.target.value;
      state.selectedTown = 'all';
      updateDistrictNotice();
      renderPeopleCategoryPills();
      renderVendors();
    });
  }

  if (modalSelect) {
    modalSelect.innerHTML = optionsHTML;
  }

  const searchInput = document.getElementById('vendorSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderVendors();
    });
  }
}

function renderPeopleCategoryPills() {
  const container = document.getElementById('categoryPillContainer');
  if (!container || typeof PEOPLE_ROLE_CATEGORIES === 'undefined') return;

  const baseVendors = state.selectedDistrict === 'all'
    ? state.vendorsList
    : state.vendorsList.filter(v => v.district === state.selectedDistrict);

  container.innerHTML = PEOPLE_ROLE_CATEGORIES.map(role => {
    const isActive = state.selectedCategory === role.id;
    const count = role.id === 'all'
      ? baseVendors.length
      : baseVendors.filter(v => v.category === role.id).length;

    return `
      <button onclick="setCategoryFilter('${role.id}')" class="cat-pill ${isActive ? 'active bg-emerald-800 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-300 hover:border-emerald-600'} px-3 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5">
        <span>${role.label}</span>
        <span class="text-[10px] font-black px-1.5 py-0.2 rounded-full ${isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'}">${count}</span>
      </button>
    `;
  }).join('');
}

function setCategoryFilter(cat) {
  state.selectedCategory = cat;
  renderPeopleCategoryPills();
  renderVendors();
}

const MALAYALAM_LOCALITY_MAP = {
  'കന്യാള': 'kanyana',
  'കന്യന': 'kanyana',
  'ധർമ്മത്തടുക്ക': 'dharmathadka',
  'ധർമത്തടുക്ക': 'dharmathadka',
  'ബേക്കൂർ': 'bekoor',
  'ബെക്കൂർ': 'bekoor',
  'കണ്ണാടിപ്പാറ': 'kannadipara',
  'ചേവാർ': 'chewar',
  'ചെവാർ': 'chewar',
  'പെർമുദെ': 'permude',
  'പെർമുദ': 'permude',
  'സീതാംഗോളി': 'seethangoli',
  'സിതാംഗോളി': 'seethangoli',
  'കൈക്കമ്പ': 'kaikamba',
  'ഉപ്പള': 'uppala',
  'കുമ്പള': 'kumbla',
  'ബയാർ': 'bayar',
  'മഞ്ചേശ്വരം': 'manjeshwar',
  'ഹൊസങ്കടി': 'hosangadi',
  'ഒസങ്കടി': 'hosangadi',
  'വോർക്കാടി': 'vorkady',
  'മിയാപദവ്': 'miyapadavu',
  'മായാറി': 'maipady',
  'മായ്പ്പാടി': 'maipady',
  'മധൂർ': 'madhur',
  'വിദ്യാനഗർ': 'vidyanagar',
  'കാസർകോട്': 'kasaragod',
  'ബദിയടുക്ക': 'badiyadka',
  'പെർള': 'perla',
  'ബെരുപ്പതൗൺ': 'perla',
  'ബെള്ളൂർ': 'bellur',
  'ബള്ളൂർ': 'bellur',
  'മുള്ളേരിയ': 'mulleria',
  'ബോവിക്കാനം': 'bovikanam',
  'ചെർക്കള': 'cherkala',
  'ചെങ്കള': 'chengala',
  'പൊയിനാച്ചി': 'poinachi',
  'ഉദുമ': 'uduma',
  'ബേക്കൽ': 'bekal',
  'മേൽപറമ്പ': 'melparamba',
  'കാഞ്ഞങ്ങാട്': 'kanhangad',
  'കൊട്ടച്ചേരി': 'kottachery',
  'നീലേശ്വരം': 'nileshwar',
  'ചെറുവത്തൂർ': 'cheruvathur',
  'തൃക്കരിപ്പൂർ': 'trikaripur',
  'വെള്ളരിക്കുണ്ട്': 'vellarikundu',
  'ഓടയഞ്ചാൽ': 'odayanchal',
  'രാജപുരം': 'rajapuram',
  'പനത്തടി': 'panathady',
  'പരപ്പ': 'parappa',
  // Kozhikode District Localities
  'കോഴിക്കോട്': 'kozhikode',
  'പാളയം': 'palayam',
  'വലിയങ്ങാടി': 'valiyangadi',
  'കൊയിലാണ്ടി': 'koyilandy',
  'വടകര': 'vadakara',
  'താമരശ്ശേരി': 'thamarassery',
  'താമരശേരി': 'thamarassery',
  'ഫറോക്ക്': 'feroke',
  'ബേപ്പൂർ': 'beypore',
  'രാമനാട്ടുകര': 'ramanattukara',
  'കൊടുവള്ളി': 'koduvally',
  'മുക്കം': 'mukkam',
  'തിരുവമ്പാടി': 'thiruvambady',
  'പേരാമ്പ്ര': 'perambra',
  'ബാലുശ്ശേരി': 'balussery',
  'നാദാപുരം': 'nadapuram',
  'കുറ്റ്യാടി': 'kuttiady',
  'പയ്യോളി': 'payyoli',
  'കുന്നമംഗലം': 'kunnamangalam',
  'മാവൂർ': 'mavoor',
  'ഒളവണ്ണ': 'olavanna',
  // Kannur District Localities
  'കണ്ണൂർ': 'kannur',
  'ക്യാമ്പ് ബസാർ': 'camp bazaar',
  'തലശ്ശേരി': 'thalassery',
  'പയ്യന്നൂർ': 'payyanur',
  'തളിപ്പറമ്പ്': 'taliparamba',
  'തളിപറമ്പ്': 'taliparamba',
  'മട്ടന്നൂർ': 'mattannur',
  'ഇരിട്ടി': 'iritty',
  'കൂത്തുപറമ്പ്': 'koothuparamba',
  'പാനൂർ': 'panoor',
  'ശ്രീകണ്ഠപുരം': 'sreekandapuram',
  'ആലക്കോട്': 'alakode',
  'ചെറുപുഴ': 'cherupuzha',
  'പഴയങ്ങാടി': 'pazhayangadi',
  'അഞ്ചരക്കണ്ടി': 'ancharakandy',
  'പേരാവൂർ': 'peravoor',
  'ധർമ്മടം': 'dharmadam',
  'അഴീക്കോട്': 'azhikode',
  'വളപട്ടണം': 'valapattanam',
  'ചക്കരക്കൽ': 'chakkarakkal',
  // Malappuram District Localities
  'മലപ്പുറം': 'malappuram',
  'മഞ്ചേരി': 'manjeri',
  'തിരൂർ': 'tirur',
  'പെരിന്തൽമണ്ണ': 'perinthalmanna',
  'കോട്ടക്കൽ': 'kottakkal',
  'കൊണ്ടോട്ടി': 'kondotty',
  'നിലമ്പൂർ': 'nilambur',
  'പൊന്നാനി': 'ponnani',
  'വളാഞ്ചേരി': 'valanchery',
  'എടപ്പാൾ': 'edappal',
  'വണ്ടൂർ': 'wandoor',
  'താനൂർ': 'tanur',
  'അരീക്കോട്': 'areacode',
  'ചെമ്മാട്': 'chemmad',
  'തിരൂരങ്ങാടി': 'tirurangadi',
  'ആനക്കയം': 'anakkayam',
  'അങ്ങാടിപ്പുറം': 'angadipuram',
  'കരിപ്പൂർ': 'karipur',
  // Wayanad District Localities
  'വയനാട്': 'wayanad',
  'കൽപ്പറ്റ': 'kalpetta',
  'സുൽത്താൻ ബത്തേരി': 'sulthan bathery',
  'ബത്തേരി': 'sulthan bathery',
  'മാനന്തവാടി': 'mananthavady',
  'വൈത്തിരി': 'vythiri',
  'മീനങ്ങാടി': 'meenangadi',
  'അമ്പലവയൽ': 'ambalavayal',
  'പുൽപ്പള്ളി': 'pulpally',
  'പനമരം': 'panamaram',
  'മേപ്പാടി': 'meppadi',
  'ലക്കിടി': 'lakkidi',
  'ചുണ്ടേൽ': 'chundale'
};

function resolveLocalitySearchTerms(rawQuery) {
  const q = (rawQuery || '').toLowerCase().trim();
  if (!q) return [];
  const terms = [q];
  if (MALAYALAM_LOCALITY_MAP[q]) {
    terms.push(MALAYALAM_LOCALITY_MAP[q]);
  }
  Object.keys(MALAYALAM_LOCALITY_MAP).forEach(mlKey => {
    if (mlKey.includes(q) || q.includes(mlKey)) {
      terms.push(MALAYALAM_LOCALITY_MAP[mlKey]);
    }
  });
  return Array.from(new Set(terms));
}

function getFlagshipTownsForDistrict(districtId) {
  if (districtId === 'kasaragod' && typeof KASARAGOD_TOWNS !== 'undefined') return KASARAGOD_TOWNS;
  if (districtId === 'kozhikode' && typeof KOZHIKODE_TOWNS !== 'undefined') return KOZHIKODE_TOWNS;
  if (districtId === 'kannur' && typeof KANNUR_TOWNS !== 'undefined') return KANNUR_TOWNS;
  if (districtId === 'malappuram' && typeof MALAPPURAM_TOWNS !== 'undefined') return MALAPPURAM_TOWNS;
  if (districtId === 'wayanad' && typeof WAYANAD_TOWNS !== 'undefined') return WAYANAD_TOWNS;
  return null;
}

function matchesVendorTown(vendor, townId) {
  if (!townId || townId === 'all') return true;
  const normalized = townId.toLowerCase();
  const spaced = normalized.replace(/_/g, ' ');
  return vendor.town === townId ||
    (vendor.location && (vendor.location.toLowerCase().includes(normalized) || vendor.location.toLowerCase().includes(spaced))) ||
    (vendor.nearbyAreas && vendor.nearbyAreas.some(a => a.toLowerCase().includes(normalized) || a.toLowerCase().includes(spaced)));
}

const FLAGSHIP_NOTICE_DATA = {
  kasaragod: {
    barTitle: 'Kasaragod Regional Town & Village Filter:',
    barBadge: 'Full 4-Taluk & 38-Panchayat Wholesale Coverage',
    barSubtitle: 'Pick Bellur, Perla, Badiyadka, Hosangadi, Uppala, Seethangoli, Kanhangad, Cheruvathur & more',
    title: 'Kasaragod District Complete Wholesale & Wedding Intelligence (All 4 Taluks & 38 Panchayats)',
    badge: 'Mangaluru–Kodagu Border Wholesale Advantage',
    bulletsHtml: `
      <strong>• Kasaragod Town, Vidyanagar &amp; Maipady (കാസർകോട് ടൗൺ &amp; മായ്പ്പാടി):</strong> Central MG Road / Naymarmoola meat mandis, Aged Kaima rice &amp; spice wholesalers, Chandragiri stage decor &amp; Felicity/Municipal wedding halls.<br>
      <strong>• Kanhangad &amp; Nileshwaram (കാഞ്ഞങ്ങാട് &amp; നീലേശ്വരം):</strong> Hosdurg commercial hub — Kottachery 1,000+ plate depots, Municipal APMC veg yards, Thaikadappuram sea fish &amp; Palladium/Asto AC convention halls.<br>
      <strong>• Manjeshwar, Hosangadi, Uppala &amp; Kaikamba (മഞ്ചേശ്വരം, ഹൊസങ്കടി, ഉപ്പള &amp; കൈക്കമ്പ):</strong> Karnataka-border lorry yards (Bellary onions ₹27/kg), Halal mutton abbatoirs, AH Palace/Purushanth halls &amp; 20kg Biryani chembus.<br>
      <strong>• Kumbla, Seethangoli, Bayar &amp; Kanyana (കുമ്പള, സീതാംഗോളി, ബയാർ, കന്യാള):</strong> Arabian Sea Neymeen (₹590/kg), 1,000-leaf Sadya Vaazhayila depots, coconut groves &amp; Dharmathadka/Bekoor/Chewar/Permude/Kannadipara support.<br>
      <strong>• Badiyadka, Perla, Mulleria &amp; Bellur (ബദിയടുക്ക, പെർള, മുള്ളേരിയ &amp; ബെള്ളൂർ):</strong> Midland plantation coconuts, rural farm poultry/meat co-ops, affordable halls (Kaveri, Souparnika, Sai Mandira) &amp; Cherkala–Poinachi transit depots.<br>
      <strong>• Uduma, Bekal, Cheruvathur &amp; Trikaripur (ഉദുമ, ബേക്കൽ, ചെറുവത്തൂർ, തൃക്കരിപ്പൂർ):</strong> Bekal &amp; Valiyaparamba seafood, Grand Hills/Sreelayam/MTP auditoriums &amp; 2,500+ crockery rentals.<br>
      <strong>• Vellarikundu, Odayanchal, Rajapuram &amp; Panathady (വെള്ളരിക്കുണ്ട്, ഓടയഞ്ചാൽ &amp; രാജപുരം):</strong> Eastern high-range spice &amp; produce mandis, economical parish/community halls (₹16k–₹35k) &amp; 4x4 hill goods delivery.`
  },
  kozhikode: {
    barTitle: 'Kozhikode Regional Town & Village Filter:',
    barBadge: 'Full 4-Taluk & 70-Panchayat Wholesale Coverage',
    barSubtitle: 'Pick Kozhikode City, Valiyangadi, Palayam, Koyilandy, Vadakara, Thamarassery, Feroke, Mukkam, Perambra, Nadapuram & more',
    title: 'Kozhikode District Complete Wholesale & Wedding Intelligence (All 4 Taluks, Corporation & 70 Panchayats)',
    badge: "Malabar's Premier Spice, Mandi & Biriyani Trade Hub",
    bulletsHtml: `
      <strong>• Kozhikode City, Valiyangadi &amp; Palayam (കോഴിക്കോട്, വലിയങ്ങാടി &amp; പാളയം):</strong> Kerala's iconic Big Bazaar grain/spice wholesale mandi (Valiyangadi), Palayam 4 AM vegetable yard, SM Street sweets &amp; Kuttichira dum biriyani usthads.<br>
      <strong>• Feroke, Beypore &amp; Ramanattukara (ഫറോക്ക്, ബേപ്പൂർ &amp; രാമനാട്ടുകര):</strong> NH-66 grand convention centres, Beypore harbor fresh catch auctions, bulk crockery depots &amp; Calicut Bypass catering logistics.<br>
      <strong>• Koyilandy, Payyoli &amp; Balussery (കൊയിലാണ്ടി, പയ്യോളി &amp; ബാലുശ്ശേരി):</strong> North coastal sea fish landing, Balussery coconut/produce auctions, Koyilandy halls &amp; Sadya/Malabar catering crews.<br>
      <strong>• Vadakara, Nadapuram &amp; Kuttiady (വടകര, നാദാപുരം &amp; കുറ്റ്യാടി):</strong> Authentic Vadakara wedding biriyani chembus, Kadathanadu meat &amp; coconut oil mills, Orkkatteri veg supply &amp; Kuttiady/Nadapuram hub rentals.<br>
      <strong>• Thamarassery, Koduvally, Mukkam &amp; Thiruvambady (താമരശ്ശേരി, കൊടുവള്ളി, മുക്കം &amp; തിരുവമ്പാടി):</strong> Fresh Wayanad ghat spices, ginger &amp; hill bananas at Churam depots, Kunnamangalam–Mavoor transit crews &amp; hill auditoriums.`
  },
  kannur: {
    barTitle: 'Kannur Regional Town & Village Filter:',
    barBadge: 'Full 5-Taluk & 71-Panchayat Wholesale Coverage',
    barSubtitle: 'Pick Kannur City, Camp Bazaar, Thalassery, Payyanur, Taliparamba, Mattannur, Iritty, Koothuparamba, Panoor, Sreekandapuram & more',
    title: 'Kannur District Complete Wholesale & Wedding Intelligence (All 5 Taluks, Corporation & 71 Panchayats)',
    badge: 'Thalassery Biriyani Heritage & Handloom Wedding Capital',
    bulletsHtml: `
      <strong>• Kannur City, Camp Bazaar &amp; Fort Road (കണ്ണൂർ &amp; ക്യാമ്പ് ബസാർ):</strong> Central Camp Bazaar wholesale rice, ghee &amp; spices, Melechovva &amp; Payyambalam convention centres, Azhikode/Valapattanam catering &amp; pandal godowns.<br>
      <strong>• Thalassery, Dharmadam &amp; Panoor (തലശ്ശേരി, ധർമ്മടം &amp; പാനൂർ):</strong> Authentic Thalassery Kaima biriyani usthads, wholesale halwa &amp; bakery sweets, Thalassery municipal market &amp; Chakkarakkal/Panoor marriage halls.<br>
      <strong>• Payyanur, Pazhayangadi &amp; Cherupuzha (പയ്യന്നൂർ, പഴയങ്ങാടി &amp; ചെറുപുഴ):</strong> North Kannur commercial hub — Payyanur bronze uruli/utensil depots, Madayi seafood, Kavvayi-belt coconut traders &amp; border village coverage.<br>
      <strong>• Taliparamba, Sreekandapuram &amp; Alakode (തളിപ്പറമ്പ്, ശ്രീകണ്ഠപുരം &amp; ആലക്കോട്):</strong> Malabar pepper &amp; spice auction hub, Kanhirangad-Kuppam farm produce, halal poultry/meat yards &amp; hill-tract decorators.<br>
      <strong>• Mattannur, Iritty, Koothuparamba &amp; Peravoor (മട്ടന്നൂർ, ഇരിട്ടി, കൂത്തുപറമ്പ് &amp; പേരാവൂർ):</strong> Coorg-border fresh vegetable arrivals at Iritty, Kannur Airport corridor grand halls &amp; Peravoor/Iritty hill goods fleets.`
  },
  malappuram: {
    barTitle: 'Malappuram Regional Town & Village Filter:',
    barBadge: 'Full 7-Taluk & 94-Panchayat Wholesale Coverage',
    barSubtitle: 'Pick Manjeri, Malappuram Town, Perinthalmanna, Kottakkal, Kondotty, Tirur, Nilambur, Ponnani & more',
    title: 'Malappuram District Complete Wholesale & Wedding Intelligence (All 7 Taluks, 12 Municipalities & 94 Panchayats)',
    badge: 'Ernad Biryani Heritage & Grand Wedding Mandi Hub',
    bulletsHtml: `
      <strong>• Manjeri &amp; Malappuram Town (മഞ്ചേരി &amp; മലപ്പുറം ടൗൺ):</strong> VP Hall International &amp; Rio convention hub, Manjeri APMC 4 AM vegetable mandi, bulk halal mutton/beef corporations &amp; Ernad Shahi Dum Biryani usthads.<br>
      <strong>• Perinthalmanna &amp; Angadipuram (പെരിന്തൽമണ്ണ &amp; അങ്ങാടിപ്പുറം):</strong> Shifa &amp; Presidency convention corridor, Pattambi-border live cattle market, 3,000+ melamine plate godowns &amp; Palakkad-link Matta rice.<br>
      <strong>• Kondotty &amp; Karipur Airport (കൊണ്ടോട്ടി &amp; കരിപ്പൂർ):</strong> Rozia International Convention Centre belt, aged Kaima rice &amp; pure cow ghee wholesalers, live welcome juice bars &amp; 20L RO water delivery.<br>
      <strong>• Kottakkal, Tirurangadi &amp; Chemmad (കോട്ടക്കൽ &amp; തിരൂരങ്ങാടി):</strong> Parappan Square grand AC halls, Chemmad tender Sadya plantain leaves (വാഴയില) depots, floral stage engineering &amp; pre-wedding house sparkle crews.<br>
      <strong>• Tirur, Tanur &amp; Valanchery (തിരൂർ, താനൂർ &amp; വളാഞ്ചേരി):</strong> Bianco Castle convention centre, Tanur harbour sea fish auctions, 50+ Biryani chembu hire &amp; NH-66 cold-pressed coconut oil depots.<br>
      <strong>• Ponnani &amp; Edappal (പൊന്നാനി &amp; എടപ്പാൾ):</strong> Ponnani harbour fresh Neymeen &amp; Pomfret auctions, Edappal pure milk Palada payasam kettles &amp; spacious coastal halls.<br>
      <strong>• Nilambur &amp; Wandoor (നിലമ്പൂർ &amp; വണ്ടൂർ):</strong> Valley farm poultry &amp; meat yards, German clear-span hangars, 4x4 hill pickup vans &amp; affordable rural convention centres.`
  },
  wayanad: {
    barTitle: 'Wayanad Regional Town & Village Filter:',
    barBadge: 'Full 3-Taluk & 23-Panchayat Wholesale Coverage',
    barSubtitle: 'Pick Kalpetta, Vythiri, Sulthan Bathery, Meenangadi, Ambalavayal, Pulpally, Mananthavady, Panamaram & more',
    title: 'Wayanad District Complete Wholesale & Wedding Intelligence (All 3 Taluks, 3 Municipalities & 23 Panchayats)',
    badge: 'Aged Kaima Rice Mills & Highland Destination Wedding Capital',
    bulletsHtml: `
      <strong>• Kalpetta, Vythiri &amp; Meppadi (കൽപ്പറ്റ &amp; വൈത്തിരി):</strong> Destiny Lounge &amp; Hi-Land convention centres, destination resort banquets, rainproof dome pandals, 4K misty drone films &amp; Halal meat depots.<br>
      <strong>• Sulthan Bathery &amp; Kalloor (സുൽത്താൻ ബത്തേരി):</strong> Saptha 5-star &amp; Alma convention centres, authentic Wayanad Jeerakasala/Kaima rice mills, Karnataka border onion arrivals &amp; 30kVA silent gensets.<br>
      <strong>• Ambalavayal &amp; Meenangadi (അമ്പലവയൽ &amp; മീനങ്ങാടി):</strong> Direct farm-gate ginger, green cardamom, ash gourd &amp; yam, tender plantain leaves &amp; signature Wayanad filter coffee/cardamom payasam bars.<br>
      <strong>• Pulpally &amp; Mullankolly (പുൽപ്പള്ളി &amp; മുള്ളൻകൊല്ലി):</strong> Morning chilled Calicut Harbour sea-fish express vans, Kabini valley farm poultry &amp; 2,000-plate catering vessel godowns.<br>
      <strong>• Mananthavady &amp; Panamaram (മാനന്തവാടി &amp; പനമരം):</strong> Sanjyo Auditorium &amp; budget parish halls, Valiya Angadi provisions, 4x4 estate pickups &amp; authentic 24-dish Wayanad Sadya chefs.<br>
      <strong>• Thamarassery Churam Link (ചുരം ട്രാൻസിറ്റ്):</strong> Overnight express supply cargo vans bringing Valiyangadi spices &amp; Beypore seafood up the ghat by 5:30 AM.`
  }
};

function updateDistrictNotice() {
  const noticeBox = document.getElementById('districtMarketNotice');
  const townFilterBar = document.getElementById('kasaragodTownFilterBar');
  if (!noticeBox) return;

  if (state.selectedDistrict === 'all') {
    noticeBox.classList.add('hidden');
    if (townFilterBar) townFilterBar.classList.add('hidden');
    state.selectedTown = 'all';
    return;
  }

  const districtObj = KERALA_DISTRICTS.find(d => d.id === state.selectedDistrict);
  if (!districtObj) {
    noticeBox.classList.add('hidden');
    if (townFilterBar) townFilterBar.classList.add('hidden');
    return;
  }

  const flagshipCfg = FLAGSHIP_NOTICE_DATA[state.selectedDistrict];
  if (flagshipCfg) {
    if (townFilterBar) {
      townFilterBar.classList.remove('hidden');
      const barTitleEl = document.getElementById('hyperlocalTownBarTitle');
      const barBadgeEl = document.getElementById('hyperlocalTownBarBadge');
      const barSubEl = document.getElementById('hyperlocalTownBarSubtitle');
      if (barTitleEl) barTitleEl.innerText = flagshipCfg.barTitle;
      if (barBadgeEl) barBadgeEl.innerText = flagshipCfg.barBadge;
      if (barSubEl) barSubEl.innerText = flagshipCfg.barSubtitle;
      renderKasaragodTownPills();
    }
    noticeBox.classList.remove('hidden');
    noticeBox.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 font-black shadow-sm">
          <i data-lucide="shield-check" class="w-6 h-6"></i>
        </div>
        <div class="space-y-1.5">
          <div class="flex flex-wrap items-center gap-2">
            <h4 class="text-sm font-extrabold text-emerald-950">${flagshipCfg.title}</h4>
            <span class="text-[10px] font-bold bg-emerald-800 text-white px-2 py-0.5 rounded">${flagshipCfg.badge}</span>
          </div>
          <p class="text-xs text-emerald-900 leading-relaxed">${flagshipCfg.bulletsHtml}</p>
        </div>
      </div>
    `;
    lucide.createIcons();
    return;
  } else {
    if (townFilterBar) townFilterBar.classList.add('hidden');
    state.selectedTown = 'all';
  }

  noticeBox.classList.remove('hidden');
  noticeBox.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="w-8 h-8 rounded-lg bg-emerald-200 text-emerald-900 flex items-center justify-center shrink-0">
        <i data-lucide="info" class="w-4 h-4"></i>
      </div>
      <div>
        <h4 class="text-sm font-bold text-emerald-950">Wholesale Sourcing Hubs in ${districtObj.name}:</h4>
        <p class="text-xs text-emerald-800 mt-0.5">
          Key mandi locations: <strong>${districtObj.mainMarkets.join(' • ')}</strong>. Buy directly early morning between 4:00 AM - 7:30 AM for the freshest cuts and best auction lots.
        </p>
      </div>
    </div>
  `;
  lucide.createIcons();
}


function renderKasaragodTownPills() {
  const container = document.getElementById('kasaragodTownPillContainer');
  const townsList = getFlagshipTownsForDistrict(state.selectedDistrict);
  if (!container || !townsList) return;

  const districtVendors = state.vendorsList.filter(v => v.district === state.selectedDistrict);

  container.innerHTML = townsList.map(town => {
    const isActive = state.selectedTown === town.id;
    const matchCount = town.id === 'all'
      ? districtVendors.length
      : districtVendors.filter(v => matchesVendorTown(v, town.id)).length;

    return `
      <button onclick="setKasaragodTownFilter('${town.id}')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
        isActive 
          ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-600/40' 
          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
      }">
        <i data-lucide="${town.id === 'all' ? 'map' : 'map-pin'}" class="w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-500'}"></i>
        <span>${town.name}</span>
        <span class="text-[10px] font-black px-1.5 py-0.2 rounded-full ${isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'}">${matchCount}</span>
      </button>
    `;
  }).join('');

  lucide.createIcons();
}


function setKasaragodTownFilter(townId) {
  state.selectedTown = townId;
  renderKasaragodTownPills();
  renderVendors();
}

function switchToKasaragodHub(districtId = 'kasaragod') {
  const targetDist = ['kasaragod', 'kozhikode', 'kannur', 'malappuram', 'wayanad'].includes(districtId) ? districtId : 'kasaragod';
  state.selectedDistrict = targetDist;
  state.selectedTown = 'all';

  const filterSelect = document.getElementById('districtFilterSelect');
  if (filterSelect) filterSelect.value = targetDist;

  updateDistrictNotice();
  renderPeopleCategoryPills();
  renderVendors();
  selectHubDistrict(targetDist, true);
}

function renderVendors() {
  const grid = document.getElementById('vendorCardsGrid');
  if (!grid) return;

  let processed = state.vendorsList.map(vendor => {
    let dist = null;
    if (state.userLat && state.userLng && vendor.lat && vendor.lng) {
      dist = calculateDistanceKm(state.userLat, state.userLng, vendor.lat, vendor.lng);
    }
    return {
      ...vendor,
      distanceKm: dist
    };
  });

  if (state.selectedDistrict !== 'all') {
    processed = processed.filter(v => v.district === state.selectedDistrict);
  }

  // Flagship District Hyperlocal City, Town & Village Filter (Kasaragod, Kozhikode & Kannur)
  if (getFlagshipTownsForDistrict(state.selectedDistrict) && state.selectedTown && state.selectedTown !== 'all') {
    processed = processed.filter(v => matchesVendorTown(v, state.selectedTown));
  }

  if (state.selectedCategory !== 'all') {
    processed = processed.filter(v => v.category === state.selectedCategory);
  }

  if (state.searchQuery) {
    const terms = resolveLocalitySearchTerms(state.searchQuery);
    processed = processed.filter(v => {
      const searchable = [
        v.name,
        v.roleTitle || '',
        v.owner,
        v.location,
        v.priceSnippet,
        v.district,
        v.town || '',
        ...(v.highlights || []),
        ...(v.nearbyAreas || [])
      ].join(' ').toLowerCase();
      return terms.some(t => searchable.includes(t));
    });
  }

  if (state.isLocationActive && state.maxRadiusKm !== 'all') {
    const radius = parseFloat(state.maxRadiusKm);
    processed = processed.filter(v => v.distanceKm !== null && v.distanceKm <= radius);
  }

  if (state.timelineMode === 'urgent') {
    processed = processed.filter(v => v.deliveryAvailable);
  } else if (state.timelineMode === 'advance') {
    processed = processed.filter(v => v.verified);
  }

  if (state.sortOrder === 'nearest' && state.isLocationActive) {
    processed.sort((a, b) => {
      const distA = a.distanceKm !== null ? a.distanceKm : 9999;
      const distB = b.distanceKm !== null ? b.distanceKm : 9999;
      return distA - distB;
    });
  } else if (state.sortOrder === 'rating') {
    processed.sort((a, b) => b.rating - a.rating);
  } else if (state.sortOrder === 'name') {
    processed.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (processed.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
        <i data-lucide="store" class="w-12 h-12 text-slate-400 mx-auto mb-3"></i>
        <h4 class="text-base font-bold text-slate-800">No Wholesalers Found For This Distance / Filter</h4>
        <p class="text-xs text-slate-500 max-w-md mx-auto mt-1">
          Try expanding your distance radius to 25 km or 50 km, or switch to "All Categories". You can also register a known local merchant for free!
        </p>
        <button onclick="openVendorRegisterModal()" class="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm">
          + Add Local Shop in This District
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  grid.innerHTML = processed.map(v => {
    const districtName = KERALA_DISTRICTS.find(d => d.id === v.district)?.name || 'Kerala';
    const distanceNote = v.distanceKm !== null ? `I am located approximately ${v.distanceKm} km from your shop. ` : '';
    const waText = encodeURIComponent(
      `Hello ${v.owner}! I found your shop "${v.name}" on KalyanaMitra Kerala.\n\n` +
      `I am organizing a wedding in ${districtName}. ${distanceNote}Could you please share your latest bulk wholesale rates, minimum order quantity, and doorstep delivery options?\n\n` +
      `Thank you!`
    );
    const waLink = `https://wa.me/${v.whatsapp}?text=${waText}`;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.name + ' ' + v.location)}`;

    const categoryBadge = {
      'cooks': '<span class="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">👨‍🍳 Cooks & Serving Crew</span>',
      'media_arts': '<span class="bg-pink-50 text-pink-800 border border-pink-200 text-[10px] font-bold px-2 py-0.5 rounded">📸 Photo, Makeup & Arts</span>',
      'decor_tech': '<span class="bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded">🎪 Decor, Sound & Tech</span>',
      'sweets_drinks': '<span class="bg-orange-50 text-orange-800 border border-orange-200 text-[10px] font-bold px-2 py-0.5 rounded">🍮 Payasam, Juice & Water</span>',
      'meat': '<span class="badge-gold text-[10px] font-bold px-2 py-0.5 rounded">🥩 Meat & Seafood</span>',
      'vegetables': '<span class="badge-emerald text-[10px] font-bold px-2 py-0.5 rounded">🥦 Agro, Spices & Leaves</span>',
      'rentals': '<span class="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded">🍽️ Pandal & Vessels</span>',
      'home_prep': '<span class="bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded">🎨 Painting & Cleanup</span>',
      'logistics': '<span class="bg-slate-100 text-slate-800 border border-slate-300 text-[10px] font-bold px-2 py-0.5 rounded">🚚 Transport & Hall Desk</span>'
    }[v.category] || '';

    const distanceBadge = v.distanceKm !== null ? `
      <span class="inline-flex items-center gap-1 text-[11px] font-black text-emerald-900 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300">
        <i data-lucide="navigation" class="w-3 h-3 text-emerald-700"></i>
        ${v.distanceKm} km away
      </span>
    ` : '';

    return `
      <div class="vendor-card bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2.5">
            <div class="flex items-center gap-1.5 flex-wrap">
              ${categoryBadge}
              ${distanceBadge}
            </div>
            <div class="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-500 text-amber-500"></i>
              <span>${v.rating}</span>
              <span class="text-slate-400 font-normal">(${v.reviewsCount})</span>
            </div>
          </div>

          <h3 class="text-base font-bold text-slate-900 tracking-tight leading-snug hover:text-emerald-800">
            ${v.name}
          </h3>
          ${v.roleTitle ? `<p class="text-[11px] font-extrabold text-emerald-800 mt-0.5">${v.roleTitle}</p>` : ''}
          
          <div class="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <i data-lucide="user" class="w-3.5 h-3.5 text-slate-400"></i>
            <span>Proprietor: <strong>${v.owner}</strong></span>
          </div>

          <div class="flex items-start gap-1.5 text-xs text-slate-600 mt-2">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"></i>
            <span class="line-clamp-2">${v.location}</span>
          </div>

          ${(v.nearbyAreas && v.nearbyAreas.length > 0) ? `
            <div class="mt-1.5 text-[11px] text-emerald-800 bg-emerald-50/70 px-2 py-1 rounded border border-emerald-100 line-clamp-1">
              <strong>Serves Villages:</strong> ${v.nearbyAreas.slice(0, 6).join(', ')}
            </div>
          ` : ''}

          <div class="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold">
            <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Wholesale Highlights:</div>
            <div class="text-emerald-900 font-bold">${v.priceSnippet}</div>
          </div>

          <div class="mt-3 space-y-1 text-xs text-slate-600">
            ${v.highlights.map(h => `
              <div class="flex items-center gap-1.5">
                <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
                <span class="line-clamp-1">${h}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <span class="text-[11px] text-slate-500">Direct Phone:</span>
            <a href="tel:${v.phone}" class="font-extrabold text-emerald-900 hover:underline flex items-center gap-1">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-700"></i>
              <span>${v.phone}</span>
            </a>
          </div>

          <div class="flex items-center gap-2">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
              <i data-lucide="message-circle" class="w-4 h-4 fill-white text-emerald-500"></i>
              <span>WhatsApp Enquiry</span>
            </a>

            <a href="tel:${v.phone}" class="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors" title="Call Shop Directly">
              <i data-lucide="phone-call" class="w-4 h-4 text-emerald-800"></i>
            </a>

            <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors" title="Open Google Maps Location">
              <i data-lucide="navigation" class="w-4 h-4 text-blue-600"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}


// -------------------------------------------------------------
// 7. Procurement Timeline Switcher (Urgent vs Advance Planning)
// -------------------------------------------------------------
function setTimelineMode(mode) {
  state.timelineMode = mode;

  const btnAll = document.getElementById('timelineModeAll');
  const btnUrgent = document.getElementById('timelineModeUrgent');
  const btnAdvance = document.getElementById('timelineModeAdvance');

  [btnAll, btnUrgent, btnAdvance].forEach(btn => {
    if (btn) {
      btn.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-1.5";
    }
  });

  if (mode === 'all' && btnAll) {
    btnAll.className = "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-800 shadow-sm transition-all";
  } else if (mode === 'urgent' && btnUrgent) {
    btnUrgent.className = "px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-amber-400 text-slate-950 shadow-sm transition-all flex items-center gap-1.5";
  } else if (mode === 'advance' && btnAdvance) {
    btnAdvance.className = "px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-emerald-800 text-white shadow-sm transition-all flex items-center gap-1.5";
  }

  renderVendors();
}

// -------------------------------------------------------------
// 8. Wholesale Vegetable Catalog & Direct Bulk Buy
// -------------------------------------------------------------
function filterVegetables(query) {
  state.vegSearchQuery = query.toLowerCase().trim();
  renderVegetablesCatalog();
}

function renderVegetablesCatalog() {
  const grid = document.getElementById('vegetablesCatalogGrid');
  if (!grid || typeof WHOLESALE_VEGETABLE_CATALOG === 'undefined') return;

  let items = WHOLESALE_VEGETABLE_CATALOG;
  if (state.vegSearchQuery) {
    items = items.filter(i => 
      i.name.toLowerCase().includes(state.vegSearchQuery) || 
      i.bestWholesaleMarket.toLowerCase().includes(state.vegSearchQuery)
    );
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
        <p class="text-sm font-bold text-slate-600">No wholesale vegetables found matching "${state.vegSearchQuery}"</p>
        <p class="text-xs text-slate-400 mt-1">Try searching "Onion", "Tomato", "Yam", or "Plantain".</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  grid.innerHTML = items.map(item => {
    const waText = encodeURIComponent(
      `Hello! I am contacting via KalyanaMitra Wholesale Vegetable Hub.\n\n` +
      `I want to enquire / order bulk wholesale: *${item.name}*\n` +
      `Package: *${item.bulkUnit}* (~₹${item.bulkPrice})\n` +
      `Please let me know today's live auction rate, current stock, and doorstep delivery time to my location in Kerala.\n\n` +
      `Thank you!`
    );
    const waLink = `https://wa.me/919847654321?text=${waText}`;

    return `
      <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-1 mb-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Mandi Bulk Lot
            </span>
            <span class="text-xs font-black text-emerald-800">
              ₹${item.perKgRate}/${item.unitLabel || 'kg'}
            </span>
          </div>

          <h4 class="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
            ${item.name}
          </h4>

          <div class="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div class="flex justify-between items-center text-slate-600">
              <span>Bulk Unit:</span>
              <span class="font-extrabold text-slate-900">${item.bulkUnit}</span>
            </div>
            <div class="flex justify-between items-center text-slate-600 mt-1">
              <span>Wholesale Price:</span>
              <span class="font-black text-emerald-900">₹${item.bulkPrice.toLocaleString('en-IN')}</span>
            </div>
            <div class="flex justify-between items-center text-slate-400 mt-0.5 text-[11px]">
              <span>Market MRP:</span>
              <span class="line-through">₹${(item.mrpPerKg * (item.bulkPrice / item.perKgRate)).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="mt-2.5 space-y-1 text-[11px] text-slate-500">
            <div class="flex items-center gap-1.5 text-amber-800">
              <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>
              <span><strong>Urgent:</strong> ${item.leadTimeUrgent}</span>
            </div>
            <div class="flex items-center gap-1.5 text-emerald-800">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
              <span><strong>Advance:</strong> ${item.leadTimeAdvance}</span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-700 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
            <span class="text-[11px] text-slate-500">Mandi Merchant:</span>
            <a href="tel:+919447654321" class="font-extrabold text-emerald-900 hover:text-emerald-700 flex items-center gap-1">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-700"></i>
              <span>94476 54321</span>
            </a>
          </div>

          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="w-full whatsapp-btn py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
            <i data-lucide="message-circle" class="w-4 h-4 fill-white text-emerald-500"></i>
            <span>Order Wholesale Sack / Crate</span>
          </a>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}


function enquireAllVegetablesWhatsApp() {
  const message = encodeURIComponent(
    `Hello! I am organizing a wedding in Kerala and want to get bulk wholesale prices for complete vegetables (Savaala, Ulli, Tomatoes, Yam, Plantain Leaves, Ginger, Chillies).\n\n` +
    `Please connect me with the nearest wholesale mandi merchant with doorstep lorry / pickup delivery.\n\n` +
    `Thank you!`
  );
  window.open(`https://wa.me/919447654321?text=${message}`, '_blank');
}

// -------------------------------------------------------------
// 9. Plates & Utensils Dual Mode (Rent vs Wholesale Buy)
// -------------------------------------------------------------
function filterUtensils(query) {
  state.utensilSearchQuery = query.toLowerCase().trim();
  renderUtensilsDualCatalog();
}

function setUtensilViewMode(mode) {
  state.utensilViewMode = mode;

  const btnRent = document.getElementById('toggleModeRent');
  const btnBuy = document.getElementById('toggleModeBuy');

  if (mode === 'rent') {
    if (btnRent) btnRent.className = "px-5 py-2 rounded-lg text-xs font-extrabold bg-emerald-800 text-white shadow-sm transition-all flex items-center gap-2";
    if (btnBuy) btnBuy.className = "px-5 py-2 rounded-lg text-xs font-extrabold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-2";
  } else {
    if (btnRent) btnRent.className = "px-5 py-2 rounded-lg text-xs font-extrabold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-2";
    if (btnBuy) btnBuy.className = "px-5 py-2 rounded-lg text-xs font-extrabold bg-amber-500 text-slate-950 shadow-sm transition-all flex items-center gap-2";
  }

  renderUtensilsDualCatalog();
}

function renderUtensilsDualCatalog() {
  const grid = document.getElementById('utensilsDualCatalogGrid');
  if (!grid || typeof UTENSILS_BUY_OR_RENT_CATALOG === 'undefined') return;

  const isRent = state.utensilViewMode === 'rent';
  let items = UTENSILS_BUY_OR_RENT_CATALOG;
  if (state.utensilSearchQuery) {
    items = items.filter(i => 
      i.name.toLowerCase().includes(state.utensilSearchQuery) || 
      i.idealFor.toLowerCase().includes(state.utensilSearchQuery)
    );
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
        <p class="text-sm font-bold text-slate-600">No utensils found matching "${state.utensilSearchQuery}"</p>
        <p class="text-xs text-slate-400 mt-1">Try searching "Plate", "Tumbler", "Chembu", or "Uruli".</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  grid.innerHTML = items.map(item => {
    const actionLabel = isRent ? 'Book Daily Rental' : 'Buy Wholesale Carton';
    const waText = encodeURIComponent(
      `Hello! I found ${item.name} on KalyanaMitra.\n\n` +
      `I am interested in: *${isRent ? 'RENTING PER DAY' : 'BUYING WHOLESALE CARTONS'}*\n` +
      `Item: *${item.name}*\n` +
      `Rate: *${isRent ? '₹' + item.rentRatePerDay + ' ' + item.rentUnit : '₹' + item.buyWholesalePrice + ' ' + item.buyUnit}*\n` +
      `Please let me know current availability, pickup location, or delivery charges to my address in Kerala.\n\n` +
      `Thank you!`
    );
    const waLink = `https://wa.me/919895112233?text=${waText}`;

    return `
      <div class="bg-white rounded-2xl p-6 border ${isRent ? 'border-emerald-200' : 'border-amber-200'} shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isRent ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'}">
              ${isRent ? '📅 1-Day Wedding Rental' : '📦 Permanent Wholesale Buy'}
            </span>
            <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
              <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span>Ready Stock</span>
            </span>
          </div>

          <h4 class="text-base font-bold text-slate-900 tracking-tight leading-snug">
            ${item.name}
          </h4>

          <div class="mt-4 p-4 rounded-xl ${isRent ? 'bg-emerald-50/70 border border-emerald-200' : 'bg-amber-50/70 border border-amber-200'}">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              ${isRent ? 'Rental Charge:' : 'Wholesale Buy Price:'}
            </div>
            <div class="text-2xl font-black ${isRent ? 'text-emerald-900' : 'text-amber-950'}">
              ${isRent ? `₹${item.rentRatePerDay} <span class="text-xs font-semibold text-slate-600">${item.rentUnit}</span>` : `₹${item.buyWholesalePrice.toLocaleString('en-IN')} <span class="text-xs font-semibold text-slate-600">${item.buyUnit}</span>`}
            </div>
            <div class="text-xs text-slate-600 font-semibold mt-1.5 pt-1.5 border-t border-slate-200/60">
              ${isRent ? `Or Buy Wholesale: <strong>₹${item.buyWholesalePrice} / pc</strong> (${item.buyBulkPackage})` : `Or Rent for Event: <strong>₹${item.rentRatePerDay} / day</strong>`}
            </div>
          </div>

          <p class="text-xs text-slate-500 mt-3 leading-relaxed">
            💡 <strong>Recommendation:</strong> ${item.idealFor}
          </p>
        </div>

        <div class="mt-5 pt-3.5 border-t border-slate-100 space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <span class="text-[11px] text-slate-500">Supplier Phone:</span>
            <a href="tel:+919895112233" class="font-extrabold text-slate-900 hover:text-emerald-700 flex items-center gap-1">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-800"></i>
              <span>98951 12233</span>
            </a>
          </div>

          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="${isRent ? 'whatsapp-btn' : 'bg-amber-500 hover:bg-amber-400 text-slate-950'} py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all">
            <i data-lucide="message-circle" class="w-4 h-4 fill-white ${isRent ? 'text-emerald-500' : 'text-slate-900'}"></i>
            <span>${actionLabel}</span>
          </a>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}



// -------------------------------------------------------------
// 10. Day-Wise Wedding Procurement Checklist & Timeline
// -------------------------------------------------------------
function renderWeddingTimeline() {
  const container = document.getElementById('weddingTimelineContainer');
  if (!container || typeof WEDDING_PROCUREMENT_TIMELINE === 'undefined') return;

  container.innerHTML = WEDDING_PROCUREMENT_TIMELINE.map((stage) => {
    const completedInStage = stage.tasks.filter(t => state.completedTasks.includes(t.id)).length;
    const allDone = completedInStage === stage.tasks.length;

    return `
      <div class="bg-white rounded-2xl p-6 border ${allDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'} shadow-sm transition-all">
        
        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span class="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${stage.badgeColor}">
              ${stage.timeframe}
            </span>
            <h3 class="text-base font-bold text-slate-900 mt-1">${stage.title}</h3>
            <p class="text-xs text-slate-500">${stage.tagline}</p>
          </div>
          <div class="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
            ${completedInStage} of ${stage.tasks.length} Completed
          </div>
        </div>

        <div class="mt-4 space-y-2.5">
          ${stage.tasks.map(task => {
            const isDone = state.completedTasks.includes(task.id);
            return `
              <label class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors ${isDone ? 'bg-emerald-50/50' : ''}">
                <input type="checkbox" onchange="toggleTaskComplete('${task.id}')" ${isDone ? 'checked' : ''} class="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer">
                <span class="text-xs sm:text-sm font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}">
                  ${task.text}
                </span>
              </label>
            `;
          }).join('')}
        </div>

      </div>
    `;
  }).join('');

  lucide.createIcons();
}


function toggleTaskComplete(taskId) {
  if (state.completedTasks.includes(taskId)) {
    state.completedTasks = state.completedTasks.filter(id => id !== taskId);
  } else {
    state.completedTasks.push(taskId);
  }
  localStorage.setItem('kalyana_completed_tasks', JSON.stringify(state.completedTasks));
  renderWeddingTimeline();
}

function resetChecklist() {
  if (confirm("Are you sure you want to reset all completed tasks in your wedding checklist?")) {
    state.completedTasks = [];
    localStorage.removeItem('kalyana_completed_tasks');
    renderWeddingTimeline();
  }
}

// -------------------------------------------------------------
// 11. Kerala Leftover Food Rescue & Donation Network
// -------------------------------------------------------------
function renderFoodRescueNetwork() {
  const grid = document.getElementById('foodRescueGrid');
  if (!grid || typeof FOOD_RESCUE_NETWORK === 'undefined') return;

  grid.innerHTML = FOOD_RESCUE_NETWORK.map(org => {
    const waText = encodeURIComponent(
      `URGENT: Surplus Wedding Food Pickup Request!\n\n` +
      `Location: ${org.district.toUpperCase()}, Kerala\n` +
      `We have untouched surplus wedding feast ready in clean warmers/pots.\n` +
      `Please let us know how fast your volunteer team can dispatch a pickup vehicle.\n\n` +
      `Thank you for saving food!`
    );
    const waLink = `https://wa.me/${org.phone}?text=${waText}`;

    return `
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-1 mb-1.5">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              ${org.district.toUpperCase()} HUB
            </span>
            <span class="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-500"></i> ${org.avgPickupTime}
            </span>
          </div>

          <h4 class="text-sm font-bold text-slate-900 leading-snug">${org.name}</h4>
          <p class="text-xs text-slate-500 mt-1">Coverage: ${org.coverage}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <a href="tel:${org.contact}" class="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800" title="Emergency Call">
            <i data-lucide="phone" class="w-4 h-4 text-emerald-800"></i>
          </a>
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
            <i data-lucide="message-circle" class="w-3.5 h-3.5 fill-white text-emerald-500"></i>
            <span>WhatsApp Food Rescue</span>
          </a>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}


// -------------------------------------------------------------
// 12. Interactive Procurement Sourcing Sheet ("My Wedding Sheet")
// -------------------------------------------------------------
function addBOMToProcurementSheet() {
  const result = calculateWeddingBOM(state.currentMenu, state.currentGuests);
  if (!result) return;

  result.calculatedItems.forEach(item => {
    const existing = state.procurementList.find(p => p.name === item.item);
    if (existing) {
      existing.qty = item.totalQty;
      existing.cost = item.estCost;
    } else {
      state.procurementList.push({
        name: item.item,
        qty: item.totalQty,
        unit: item.unit,
        cost: item.estCost,
        category: 'Food Raw Material'
      });
    }
  });

  saveProcurementList();
  updateProcurementBadge();
  openProcurementDrawer();
}

function addItemToProcurementSheet(name, qty, unit, cost, category) {
  const existing = state.procurementList.find(p => p.name === name);
  if (existing) {
    existing.qty += qty;
    existing.cost += cost;
  } else {
    state.procurementList.push({ name, qty, unit, cost, category: category || 'Wholesale Item' });
  }

  saveProcurementList();
  updateProcurementBadge();
  openProcurementDrawer();
}

function removeItemFromSheet(idx) {
  state.procurementList.splice(idx, 1);
  saveProcurementList();
  updateProcurementBadge();
  renderProcurementDrawer();
}

function clearProcurementList() {
  if (confirm("Clear all items from your wedding procurement sourcing sheet?")) {
    state.procurementList = [];
    saveProcurementList();
    updateProcurementBadge();
    renderProcurementDrawer();
  }
}

function saveProcurementList() {
  localStorage.setItem('kalyana_procurement_list', JSON.stringify(state.procurementList));
}

function updateProcurementBadge() {
  const countBadge = document.getElementById('cartCountBadge');
  const summary = document.getElementById('cartTotalSummary');
  const totalCost = state.procurementList.reduce((acc, cur) => acc + cur.cost, 0);

  if (countBadge) countBadge.innerText = state.procurementList.length;
  if (summary) {
    summary.innerText = `${state.procurementList.length} Items • Est: ₹${totalCost.toLocaleString('en-IN')}`;
  }
}

function openProcurementDrawer() {
  const drawer = document.getElementById('procurementDrawer');
  if (drawer) {
    drawer.classList.remove('hidden');
    drawer.classList.add('flex');
    renderProcurementDrawer();
  }
}

function closeProcurementDrawer() {
  const drawer = document.getElementById('procurementDrawer');
  if (drawer) {
    drawer.classList.add('hidden');
    drawer.classList.remove('flex');
  }
}

function renderProcurementDrawer() {
  const container = document.getElementById('drawerItemsList');
  const totalDisplay = document.getElementById('drawerTotalCost');
  if (!container) return;

  if (state.procurementList.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <i data-lucide="clipboard-x" class="w-10 h-10 mx-auto mb-2 text-slate-300"></i>
        <p class="text-sm font-bold text-slate-600">Your Sourcing Sheet is Empty</p>
        <p class="text-xs text-slate-400 mt-1">Click "Add All to My Sourcing Sheet" in the Food Calculator or add bulk vegetable sacks to build your list.</p>
      </div>
    `;
    if (totalDisplay) totalDisplay.innerText = "₹0";
    lucide.createIcons();
    return;
  }

  const totalCost = state.procurementList.reduce((acc, cur) => acc + cur.cost, 0);
  if (totalDisplay) totalDisplay.innerText = `₹${totalCost.toLocaleString('en-IN')}`;

  container.innerHTML = state.procurementList.map((item, idx) => {
    return `
      <div class="py-3 flex items-center justify-between gap-3 text-xs">
        <div class="flex-1">
          <span class="font-bold text-slate-900 block">${item.name}</span>
          <span class="text-slate-500">${item.qty} ${item.unit} • Est: <strong>₹${item.cost.toLocaleString('en-IN')}</strong></span>
        </div>
        <button onclick="removeItemFromSheet(${idx})" class="text-slate-400 hover:text-rose-600 p-1" title="Remove">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}


function exportProcurementListWhatsApp() {
  if (state.procurementList.length === 0) {
    alert("Please add items to your sourcing sheet first!");
    return;
  }

  const totalCost = state.procurementList.reduce((acc, cur) => acc + cur.cost, 0);
  let message = `*KalyanaMitra Kerala - Wedding Bulk Sourcing Quotation Sheet*\n`;
  message += `Date: ${new Date().toLocaleDateString('en-IN')}\n\n`;
  message += `*Required Items List:*\n`;

  state.procurementList.forEach((item, idx) => {
    message += `${idx + 1}. *${item.name}*: ${item.qty} ${item.unit} (~₹${item.cost.toLocaleString('en-IN')})\n`;
  });

  message += `\n*Estimated Wholesale Target: ₹${totalCost.toLocaleString('en-IN')}*\n\n`;
  message += `Please provide your best wholesale bundle rate and doorstep delivery availability for this requirement.\n`;
  message += `Generated via KalyanaMitra Kerala.`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
}

// -------------------------------------------------------------
// 13. Pre-Wedding House Prep Calculator
// -------------------------------------------------------------
function calculateHousePrepCost() {
  const select = document.getElementById('houseSizeSelect');
  if (!select) return;

  const sqft = parseInt(select.value, 10);
  
  let interiorLabour = 16500;
  let exteriorLabour = 14000;
  let cleaningCost = 6500;
  let yardCost = 3500;

  if (sqft <= 1200) {
    interiorLabour = 11000;
    exteriorLabour = 9500;
    cleaningCost = 4500;
    yardCost = 2500;
  } else if (sqft === 1800) {
    interiorLabour = 16500;
    exteriorLabour = 14000;
    cleaningCost = 6500;
    yardCost = 3500;
  } else if (sqft === 2500) {
    interiorLabour = 23000;
    exteriorLabour = 19500;
    cleaningCost = 8500;
    yardCost = 4500;
  } else {
    interiorLabour = 32000;
    exteriorLabour = 28000;
    cleaningCost = 12000;
    yardCost = 6000;
  }

  const total = interiorLabour + exteriorLabour + cleaningCost + yardCost;

  document.getElementById('houseInteriorLabour').innerText = `₹${interiorLabour.toLocaleString('en-IN')}`;
  document.getElementById('houseExteriorLabour').innerText = `₹${exteriorLabour.toLocaleString('en-IN')}`;
  document.getElementById('houseCleaningCost').innerText = `₹${cleaningCost.toLocaleString('en-IN')}`;
  const yardEl = document.getElementById('houseYardCost');
  if (yardEl) yardEl.innerText = `₹${yardCost.toLocaleString('en-IN')}`;
  document.getElementById('houseTotalCost').innerText = `₹${total.toLocaleString('en-IN')}`;
}

// -------------------------------------------------------------
// 14. Vendor Registration Modal Logic
// -------------------------------------------------------------
function openVendorRegisterModal() {
  const modal = document.getElementById('vendorModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeVendorRegisterModal() {
  const modal = document.getElementById('vendorModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleVendorRegister(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.elements;

  const districtId = inputs[2].value;
  const districtObj = KERALA_DISTRICTS.find(d => d.id === districtId);

  const newVendor = {
    id: 'v_user_' + Date.now(),
    name: inputs[0].value,
    owner: inputs[1].value,
    district: districtId,
    lat: districtObj ? districtObj.lat : 11.2588,
    lng: districtObj ? districtObj.lng : 75.7804,
    whatsapp: inputs[3].value.replace(/\D/g, ''),
    phone: '+91' + inputs[3].value.replace(/\D/g, ''),
    category: inputs[4].value,
    location: inputs[5].value,
    priceSnippet: inputs[6].value || 'Wholesale pricing available on WhatsApp enquiry',
    rating: 5.0,
    reviewsCount: 1,
    verified: true,
    highlights: ['Newly listed Kerala wholesale merchant', 'Direct WhatsApp pricing available'],
    deliveryAvailable: true
  };

  state.vendorsList.unshift(newVendor);
  renderVendors();
  closeVendorRegisterModal();
  form.reset();

  alert(`Congratulations! Your shop "${newVendor.name}" has been successfully listed in the ${newVendor.district.toUpperCase()} directory. Customers can now contact you directly via WhatsApp.`);
}

// -------------------------------------------------------------
// 15. Master Cook & Catering Labour Wages Logic
// -------------------------------------------------------------
function updateLabourEstimator() {
  if (typeof calculateLabourCostBreakdown !== 'function') return;
  const result = calculateLabourCostBreakdown(state.currentMenu, state.currentGuests);
  if (!result) return;

  const totalCostEl = document.getElementById('labourTotalCost');
  const avgPerPlateEl = document.getElementById('labourAvgPerPlate');
  const headChefFeeEl = document.getElementById('labourHeadChefFee');
  const headChefRateEl = document.getElementById('labourHeadChefRate');
  const assistantCostEl = document.getElementById('labourAssistantCost');
  const assistantCountEl = document.getElementById('labourAssistantCount');
  const serverCostEl = document.getElementById('labourServerCost');
  const serverCountEl = document.getElementById('labourServerCount');
  const cleanerCostEl = document.getElementById('labourCleanerCost');
  const cleanerCountEl = document.getElementById('labourCleanerCount');
  const teaCostEl = document.getElementById('labourTeaCost');
  const teaCountEl = document.getElementById('labourTeaCount');
  const totalStaffEl = document.getElementById('labourTotalStaff');

  if (totalCostEl) totalCostEl.innerText = `₹${result.totalLabourCost.toLocaleString('en-IN')}`;
  if (avgPerPlateEl) avgPerPlateEl.innerText = `(~₹${result.avgLabourCostPerPlate} / plate total)`;
  if (headChefFeeEl) headChefFeeEl.innerText = `₹${result.headChefFee.toLocaleString('en-IN')}`;
  if (headChefRateEl) headChefRateEl.innerText = result.isSadya ? '₹35 / plate (Sadya Master)' : '₹40 / plate (Dum Biryani)';
  if (assistantCostEl) assistantCostEl.innerText = `₹${result.assistantCost.toLocaleString('en-IN')}`;
  if (assistantCountEl) assistantCountEl.innerText = `${result.assistantCount} Cooks @ ₹1,200/day`;
  if (serverCostEl) serverCostEl.innerText = `₹${result.serverCost.toLocaleString('en-IN')}`;
  if (serverCountEl) serverCountEl.innerText = `${result.serverCount} Staff @ ₹900/day`;
  if (cleanerCostEl) cleanerCostEl.innerText = `₹${result.cleanerCost.toLocaleString('en-IN')}`;
  if (cleanerCountEl) cleanerCountEl.innerText = `${result.cleanerCount} Workers @ ₹1,000/day`;
  if (teaCostEl) teaCostEl.innerText = `₹${result.teaCost.toLocaleString('en-IN')}`;
  if (teaCountEl) teaCountEl.innerText = `${result.teaBoysCount} Staff @ ₹900/day`;
  if (totalStaffEl) totalStaffEl.innerText = `${result.totalStaffCount} Members`;
}

function addLabourToProcurementSheet() {
  if (typeof calculateLabourCostBreakdown !== 'function') return;
  const result = calculateLabourCostBreakdown(state.currentMenu, state.currentGuests);
  if (!result) return;
  addItemToProcurementSheet(
    `Cooking & Kitchen Crew Labour (${result.totalStaffCount} Staff for ${state.currentGuests} Guests)`,
    1,
    'Team Package',
    result.totalLabourCost,
    'Catering Labour'
  );
}

function shareLabourOnWhatsApp() {
  if (typeof calculateLabourCostBreakdown !== 'function') return;
  const result = calculateLabourCostBreakdown(state.currentMenu, state.currentGuests);
  if (!result) return;
  let msg = `*KalyanaMitra Kerala - Catering Kitchen Labour Rate Card*\n`;
  msg += `Guest Count: ${state.currentGuests} Guests\n`;
  msg += `Menu Type: ${result.isSadya ? 'Traditional Sadya' : 'Non-Veg / Biryani'}\n\n`;
  msg += `*Staff & Wage Breakdown:*\n`;
  msg += `1. Master Cook (മേസ്തിരി): ₹${result.headChefFee.toLocaleString('en-IN')}\n`;
  msg += `2. Assistant Cooks (${result.assistantCount} persons): ₹${result.assistantCost.toLocaleString('en-IN')}\n`;
  msg += `3. Serving Staff (${result.serverCount} persons): ₹${result.serverCost.toLocaleString('en-IN')}\n`;
  msg += `4. Dishwashing & Cleaning (${result.cleanerCount} persons): ₹${result.cleanerCost.toLocaleString('en-IN')}\n`;
  msg += `5. Welcome Drinks Counter (${result.teaBoysCount} staff): ₹${result.teaCost.toLocaleString('en-IN')}\n\n`;
  msg += `*Total Kitchen Team: ${result.totalStaffCount} Members*\n`;
  msg += `*Total Estimated Labour: ₹${result.totalLabourCost.toLocaleString('en-IN')}* (~₹${result.avgLabourCostPerPlate}/plate)\n\n`;
  msg += `Standard Kerala fair wage benchmark via KalyanaMitra Kerala.`;

  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
}

// -------------------------------------------------------------
// 16. Auditorium & Dining Hall Capacity Planning Logic
// -------------------------------------------------------------
function updateAuditoriumCapacity() {
  if (typeof calculateAuditoriumCapacity !== 'function') return;
  const guests = state.budgetGuests || state.currentGuests || 600;
  const result = calculateAuditoriumCapacity(guests);
  if (!result) return;

  const capGuestEl = document.getElementById('capGuestDisplay');
  const capDiningSeatsEl = document.getElementById('capDiningSeats');
  const capBatchesCountEl = document.getElementById('capBatchesCount');
  const capDiningDurationEl = document.getElementById('capDiningDuration');
  const capAuditoriumAreaEl = document.getElementById('capAuditoriumArea');
  const capMainHallCapEl = document.getElementById('capMainHallCapacity');
  const capParkingSlotsEl = document.getElementById('capParkingSlots');
  const capHandwashTapsEl = document.getElementById('capHandwashTaps');

  if (capGuestEl) capGuestEl.innerText = `${guests.toLocaleString('en-IN')} Guests`;
  if (capDiningSeatsEl) capDiningSeatsEl.innerText = `${result.diningSeats} Seats`;
  if (capBatchesCountEl) capBatchesCountEl.innerText = `${result.batchesCount} Batches`;
  if (capDiningDurationEl) capDiningDurationEl.innerText = `~${result.diningTimeHours} Hours total dining window`;
  if (capAuditoriumAreaEl) capAuditoriumAreaEl.innerText = `${result.auditoriumAreaSqft.toLocaleString('en-IN')} sq.ft`;
  if (capMainHallCapEl) capMainHallCapEl.innerText = `For ~${result.mainHallCapacity} floating guests at peak`;
  if (capParkingSlotsEl) capParkingSlotsEl.innerText = `${result.carParkingSlots} Cars / ${result.twoWheelerSlots} Bikes`;
  if (capHandwashTapsEl) capHandwashTapsEl.innerText = `Min. ${result.handwashTaps} Handwash Taps needed`;

  const hallSyncEl = document.getElementById('hallGuestSyncDisplay');
  if (hallSyncEl) hallSyncEl.innerText = `${guests.toLocaleString('en-IN')} Wedding Guests`;
  if (typeof renderKasaragodWeddingHalls === 'function') renderKasaragodWeddingHalls();
}

// -------------------------------------------------------------
// 17. Wedding Stage Decor Themes & Shamiana Logic
// -------------------------------------------------------------
function selectDecorTheme(themeId) {
  state.selectedDecorTheme = themeId;
  if (typeof STAGE_DECOR_THEMES === 'undefined') return;
  const theme = STAGE_DECOR_THEMES.find(t => t.id === themeId);
  if (!theme) return;

  ['decor_traditional_kasavu', 'decor_royal_arabian', 'decor_modern_floral_arch'].forEach(id => {
    const card = document.getElementById(`themeCard_${id}`);
    if (card) {
      if (id === themeId) {
        card.className = "p-5 rounded-2xl border-2 border-emerald-800 bg-emerald-50/40 cursor-pointer transition-all shadow-md space-y-3 relative ring-2 ring-emerald-600/30";
      } else {
        card.className = "p-5 rounded-2xl border border-slate-200 bg-white cursor-pointer transition-all hover:shadow-md space-y-3 relative";
      }
    }
  });

  const titleEl = document.getElementById('selectedThemeTitle');
  const inclusionsEl = document.getElementById('selectedThemeInclusions');
  if (titleEl) {
    titleEl.innerText = `Included in ${theme.name} (₹${theme.basePrice.toLocaleString('en-IN')}):`;
  }
  if (inclusionsEl) {
    inclusionsEl.innerHTML = theme.features.map(f => `
      <li class="flex items-start gap-2">
        <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"></i>
        <span>${f}</span>
      </li>
    `).join('');
  }

  updateDecorAndPandalCost();
  lucide.createIcons();
}


function updateDecorAndPandalCost() {
  if (typeof STAGE_DECOR_THEMES === 'undefined') return;
  const theme = STAGE_DECOR_THEMES.find(t => t.id === state.selectedDecorTheme) || STAGE_DECOR_THEMES[0];
  const slider = document.getElementById('pandalAreaSlider');
  const mistFansCheck = document.getElementById('checkMistFans');
  const genCheck = document.getElementById('checkGenerator');

  const sqft = slider ? parseInt(slider.value, 10) : 1500;
  state.pandalArea = sqft;

  const pandalCost = Math.round(sqft * 6.5);
  const mistCost = (mistFansCheck && mistFansCheck.checked) ? 4800 : 0;
  const genCost = (genCheck && genCheck.checked) ? 5500 : 0;

  const total = theme.basePrice + pandalCost + mistCost + genCost;

  const displayEl = document.getElementById('pandalAreaDisplay');
  const totalEl = document.getElementById('totalDecorPackagePrice');

  if (displayEl) displayEl.innerText = `${sqft.toLocaleString('en-IN')} sq.ft (₹${pandalCost.toLocaleString('en-IN')})`;
  if (totalEl) totalEl.innerText = `₹${total.toLocaleString('en-IN')}`;
}

function addDecorToProcurementSheet() {
  if (typeof STAGE_DECOR_THEMES === 'undefined') return;
  const theme = STAGE_DECOR_THEMES.find(t => t.id === state.selectedDecorTheme) || STAGE_DECOR_THEMES[0];
  const slider = document.getElementById('pandalAreaSlider');
  const mistFansCheck = document.getElementById('checkMistFans');
  const genCheck = document.getElementById('checkGenerator');

  const sqft = slider ? parseInt(slider.value, 10) : 1500;
  const pandalCost = Math.round(sqft * 6.5);
  const mistCost = (mistFansCheck && mistFansCheck.checked) ? 4800 : 0;
  const genCost = (genCheck && genCheck.checked) ? 5500 : 0;
  const total = theme.basePrice + pandalCost + mistCost + genCost;

  addItemToProcurementSheet(
    `Stage Decor (${theme.name}) + ${sqft} sq.ft Shamiana Pandal Package`,
    1,
    'Custom Setup',
    total,
    'Decor & Pandal'
  );
}

// -------------------------------------------------------------
// 18. Printable & PDF Order Sheet Engine
// -------------------------------------------------------------
function triggerPrintableOrderSheet() {
  const container = document.getElementById('printableOrderSheet');
  if (!container) return;

  const dateStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const guests = state.currentGuests || 500;
  const menuObj = (typeof WEDDING_MENUS !== 'undefined' && WEDDING_MENUS[state.currentMenu]) ? WEDDING_MENUS[state.currentMenu] : { name: 'Wedding Feast Banquet' };
  
  // If cart is empty, populate from current calculated BOM
  let itemsToPrint = state.procurementList;
  if (!itemsToPrint || itemsToPrint.length === 0) {
    if (typeof calculateWeddingBOM === 'function') {
      const bom = calculateWeddingBOM(state.currentMenu, guests);
      if (bom) {
        itemsToPrint = bom.calculatedItems.map(i => ({
          name: i.item,
          qty: i.totalQty,
          unit: i.unit,
          cost: i.estCost,
          category: 'Food Raw Material'
        }));
      }
    }
  }

  const totalWholesale = itemsToPrint ? itemsToPrint.reduce((acc, cur) => acc + cur.cost, 0) : 0;

  container.innerHTML = `
    <div class="max-w-4xl mx-auto p-6 text-slate-900 bg-white border border-slate-300 rounded-xl my-4">
      <!-- Invoice Header -->
      <div class="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 class="text-2xl font-black text-slate-950 uppercase tracking-tight">KalyanaMitra Kerala</h1>
          <p class="text-xs font-bold text-emerald-800">Direct Wholesale Sourcing Quotation & Purchase Order</p>
          <p class="text-[11px] text-slate-600 mt-0.5">Zero-Commission Wholesale Benchmark Hub • All 14 Kerala Districts</p>
        </div>
        <div class="text-right text-xs">
          <p><strong>Order Ref:</strong> KM-${Date.now().toString().slice(-6)}</p>
          <p><strong>Generated:</strong> ${dateStr}</p>
          <p><strong>Target District:</strong> ${state.detectedDistrict ? state.detectedDistrict.toUpperCase() : 'ALL KERALA'}</p>
          <p><strong>Estimated Guests:</strong> ${guests} Guests</p>
        </div>
      </div>

      <!-- Wedding Feast Details Banner -->
      <div class="bg-slate-100 p-3 rounded-lg mb-6 flex justify-between items-center text-xs border border-slate-200">
        <div>
          <span class="text-slate-500 font-semibold">Selected Wedding Feast:</span>
          <strong class="text-slate-900 text-sm ml-1">${menuObj.name}</strong>
        </div>
        <div>
          <span class="text-slate-500 font-semibold">Total Sourced Items:</span>
          <strong class="text-emerald-900 font-bold ml-1">${itemsToPrint ? itemsToPrint.length : 0} Items</strong>
        </div>
      </div>

      <!-- Itemized Procurement Table -->
      <table class="w-full text-left border-collapse text-xs mb-6">
        <thead>
          <tr class="border-b-2 border-slate-300 bg-slate-50">
            <th class="py-2 px-2 text-center w-8">Check</th>
            <th class="py-2 px-3">Item Name / Specification</th>
            <th class="py-2 px-3">Category</th>
            <th class="py-2 px-3 text-center">Required Qty</th>
            <th class="py-2 px-3 text-right">Wholesale Target Cost</th>
            <th class="py-2 px-3 text-right">Vendor / Mandi Notes</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          ${itemsToPrint ? itemsToPrint.map((item) => `
            <tr>
              <td class="py-2 px-2 text-center text-sm">☐</td>
              <td class="py-2 px-3 font-bold text-slate-900">${item.name}</td>
              <td class="py-2 px-3 text-slate-600">${item.category || 'Wholesale'}</td>
              <td class="py-2 px-3 text-center font-semibold text-slate-800">${item.qty} ${item.unit}</td>
              <td class="py-2 px-3 text-right font-black text-slate-900">₹${item.cost.toLocaleString('en-IN')}</td>
              <td class="py-2 px-3 text-right text-slate-400">________________</td>
            </tr>
          `).join('') : ''}
        </tbody>
        <tfoot>
          <tr class="border-t-2 border-slate-900 bg-slate-50 font-bold">
            <td colspan="4" class="py-3 px-3 text-right text-sm uppercase">Estimated Wholesale Procurement Budget:</td>
            <td class="py-3 px-3 text-right text-base font-black text-emerald-900">₹${totalWholesale.toLocaleString('en-IN')}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <!-- Key Wholesalers & Mandi Verification Contacts -->
      <div class="border border-slate-300 rounded-lg p-4 mb-6 text-xs bg-slate-50">
        <h4 class="font-bold text-slate-900 uppercase tracking-wider mb-2">Verified Kerala Mandi Emergency Contacts:</h4>
        <div class="grid grid-cols-3 gap-3 text-[11px] text-slate-700">
          <div>• <strong>Chalai Mandi TVM:</strong> +91 94471 23456</div>
          <div>• <strong>Broadway Kochi:</strong> +91 98471 23456</div>
          <div>• <strong>Palayam Kozhikode:</strong> +91 98470 12345</div>
          <div>• <strong>Sakthan Thrissur:</strong> +91 98950 44660</div>
          <div>• <strong>Big Bazaar Palakkad:</strong> +91 97450 12345</div>
          <div>• <strong>Goods Transport (Tata Ace):</strong> +91 94470 88990</div>
        </div>
      </div>

      <!-- Signatures Block -->
      <div class="flex justify-between items-end pt-8 border-t border-slate-300 text-xs text-slate-600">
        <div>
          <p>Procurement Officer / Family Head: _______________________</p>
          <p class="mt-1">Date: _______________________</p>
        </div>
        <div class="text-right">
          <p>Wholesale Mandi Merchant Signature & Seal: _______________________</p>
        </div>
      </div>
    </div>
  `;

  // Trigger print
  window.print();
}

// -------------------------------------------------------------
// 19. Northern Kerala Flagship Hubs (Kasaragod, Kozhikode & Kannur):
//     Village Finder + Wedding Halls & Fees
// -------------------------------------------------------------
const FLAGSHIP_HUB_META = {
  kasaragod: {
    name: 'Kasaragod',
    breadcrumbCoverage: 'Flagship District Coverage: 4 Taluks • 3 Municipalities • 38 Grama Panchayats',
    flagshipBadge: 'Flagship District Rollout #1',
    regionTagMl: 'കാസർകോട് ജില്ലാ സമ്പൂർണ്ണ വെഡ്ഡിംഗ് ഗൈഡ്',
    mainTitle: 'Complete Kasaragod Wedding Intelligence: Every City, Village & Hall Fee',
    mainSubtitleHtml: 'Built as our model Kerala district covering <strong>all 4 Taluks, 3 Municipalities, 38 Grama Panchayats, and rural villages</strong> (from Manjeshwar, Hosangadi, Uppala, Kumbla, Bayar, Perla, Badiyadka &amp; Bellur to Kasaragod Town, Maipady, Cherkala, Uduma, Kanhangad, Nileshwar, Cheruvathur, Trikaripur &amp; Vellarikundu). Compare <strong>Wedding Hall Rents &amp; Seating</strong> and locate the nearest wholesale markets for every village.',
    hallsBtnLabel: 'Compare 25 Kasaragod Halls & Fees',
    shopsBtnLabel: 'Browse 66 Kasaragod People & Shops',
    stat1Val: '4 Taluks',
    stat1Desc: 'Manjeshwaram, Kasaragod, Hosdurg & Vellarikundu',
    stat2Val: '38 Panchayats',
    stat2Desc: '+ 3 Municipalities & 100+ local villages',
    stat3Val: '25 Halls',
    stat3Desc: 'Convention centres & mandapams with fees',
    stat4Val: '66 Vendors',
    stat4Desc: 'Direct wholesale meat, veg, pandal & pickup',
    finderTitle: 'Find Wholesale Markets & Halls for Any Town or Village in Kasaragod',
    searchPlaceholder: 'Type village/town: Bellur, Perla, Hosangadi, Cheruvathur, ബെള്ളൂർ...',
    allTaluksLabel: 'All 4 Taluks (Full District)',
    taluks: [
      { id: 'Manjeshwaram', label: 'Manjeshwaram Taluk (North & Border)' },
      { id: 'Kasaragod', label: 'Kasaragod Taluk (Central & Midland)' },
      { id: 'Hosdurg', label: 'Hosdurg Taluk (Kanhangad, Nileshwar & South)' },
      { id: 'Vellarikundu', label: 'Vellarikundu Taluk (Eastern High-Range)' }
    ],
    quickChips: [
      { q: 'Bellur', label: 'Bellur (ബെള്ളൂർ)' },
      { q: 'Perla', label: 'Perla & Badiyadka' },
      { q: 'Hosangadi', label: 'Hosangadi & Manjeshwar' },
      { q: 'Maipady', label: 'Maipady (മായ്പ്പാടി)' },
      { q: 'Uppala', label: 'Uppala' },
      { q: 'Seethangoli', label: 'Seethangoli' },
      { q: 'Uduma', label: 'Uduma & Bekal' },
      { q: 'Cheruvathur', label: 'Cheruvathur & Trikaripur' },
      { q: 'Odayanchal', label: 'Odayanchal & Rajapuram' }
    ]
  },
  kozhikode: {
    name: 'Kozhikode',
    breadcrumbCoverage: 'Flagship District Coverage: 4 Taluks • 1 Municipal Corporation • 7 Municipalities • 70 Grama Panchayats',
    flagshipBadge: 'Flagship District Rollout #2',
    regionTagMl: 'കോഴിക്കോട് ജില്ലാ സമ്പൂർണ്ണ വെഡ്ഡിംഗ് ഗൈഡ്',
    mainTitle: 'Complete Kozhikode Wedding Intelligence: Every City, Village & Hall Fee',
    mainSubtitleHtml: 'Full district sourcing and hall intelligence covering <strong>all 4 Taluks, Kozhikode Corporation, 7 Municipalities &amp; 70 Grama Panchayats</strong> — from Valiyangadi, Palayam, Feroke, Beypore, Ramanattukara &amp; Kunnamangalam to Thamarassery, Koduvally, Mukkam, Thiruvambady, Koyilandy, Balussery, Perambra, Vadakara, Payyoli, Nadapuram &amp; Kuttiady.',
    hallsBtnLabel: 'Compare 15 Kozhikode Halls & Fees',
    shopsBtnLabel: 'Browse 29 Kozhikode People & Shops',
    stat1Val: '4 Taluks',
    stat1Desc: 'Kozhikode, Thamarassery, Koyilandy & Vadakara',
    stat2Val: '70 Panchayats',
    stat2Desc: '+ 1 Corporation, 7 Municipalities & hills',
    stat3Val: '15 Halls',
    stat3Desc: 'Trade Centre to Thaluk Kalyana Mandapams',
    stat4Val: '29 Vendors',
    stat4Desc: 'Valiyangadi grains, Palayam veg & Usthads',
    finderTitle: 'Find Wholesale Markets & Halls for Any Town or Village in Kozhikode',
    searchPlaceholder: 'Type town/village: Valiyangadi, Palayam, Thamarassery, Vadakara, മുക്കം...',
    allTaluksLabel: 'All 4 Taluks (Full Kozhikode)',
    taluks: [
      { id: 'Kozhikode', label: 'Kozhikode Taluk (City, Feroke & Kunnamangalam)' },
      { id: 'Thamarassery', label: 'Thamarassery Taluk (Mukkam, Koduvally & Hills)' },
      { id: 'Koyilandy', label: 'Koyilandy Taluk (Payyoli, Balussery & Perambra)' },
      { id: 'Vadakara', label: 'Vadakara Taluk (Nadapuram & Kuttiady)' }
    ],
    quickChips: [
      { q: 'Valiyangadi', label: 'Valiyangadi (വലിയങ്ങാടി)' },
      { q: 'Palayam', label: 'Palayam Market' },
      { q: 'Feroke', label: 'Feroke & Beypore' },
      { q: 'Thamarassery', label: 'Thamarassery (താമരശ്ശേരി)' },
      { q: 'Mukkam', label: 'Mukkam & Thiruvambady' },
      { q: 'Koyilandy', label: 'Koyilandy (കൊയിലാണ്ടി)' },
      { q: 'Balussery', label: 'Balussery & Perambra' },
      { q: 'Vadakara', label: 'Vadakara (വടകര)' },
      { q: 'Nadapuram', label: 'Nadapuram & Kuttiady' }
    ]
  },
  kannur: {
    name: 'Kannur',
    breadcrumbCoverage: 'Flagship District Coverage: 5 Taluks • 1 Municipal Corporation • 9 Municipalities • 71 Grama Panchayats',
    flagshipBadge: 'Flagship District Rollout #3',
    regionTagMl: 'കണ്ണൂർ ജില്ലാ സമ്പൂർണ്ണ വെഡ്ഡിംഗ് ഗൈഡ്',
    mainTitle: 'Complete Kannur Wedding Intelligence: Every City, Village & Hall Fee',
    mainSubtitleHtml: 'Comprehensive Thalassery-Biriyani heritage and wholesale intelligence across <strong>all 5 Taluks, Kannur Corporation, 9 Municipalities &amp; 71 Grama Panchayats</strong> — from Camp Bazaar, Azhikode, Valapattanam, Chakkarakkal &amp; Ancharakandy to Thalassery, Dharmadam, Panoor, Koothuparamba, Mattannur, Iritty, Peravoor, Taliparamba, Sreekandapuram, Payyanur, Pazhayangadi &amp; Cherupuzha.',
    hallsBtnLabel: 'Compare 16 Kannur Halls & Fees',
    shopsBtnLabel: 'Browse 26 Kannur People & Shops',
    stat1Val: '5 Taluks',
    stat1Desc: 'Kannur, Thalassery, Taliparamba, Payyanur & Iritty',
    stat2Val: '71 Panchayats',
    stat2Desc: '+ 1 Corporation, 9 Municipalities & Coorg border',
    stat3Val: '16 Halls',
    stat3Desc: 'Sadhoo & airport belt convention halls',
    stat4Val: '26 Vendors',
    stat4Desc: 'Camp Bazaar wholesale, Payyanur bronze & Dum cooks',
    finderTitle: 'Find Wholesale Markets & Halls for Any Town or Village in Kannur',
    searchPlaceholder: 'Type town/village: Camp Bazaar, Thalassery, Payyanur, Iritty, തളിപ്പറമ്പ്...',
    allTaluksLabel: 'All 5 Taluks (Full Kannur)',
    taluks: [
      { id: 'Kannur', label: 'Kannur Taluk (City, Camp Bazaar & Valapattanam)' },
      { id: 'Thalassery', label: 'Thalassery Taluk (Panoor & Koothuparamba)' },
      { id: 'Taliparamba', label: 'Taliparamba Taluk (Sreekandapuram & Alakode)' },
      { id: 'Payyanur', label: 'Payyanur Taluk (Pazhayangadi & Cherupuzha)' },
      { id: 'Iritty', label: 'Iritty Taluk (Mattannur & Peravoor)' }
    ],
    quickChips: [
      { q: 'Camp Bazaar', label: 'Camp Bazaar (കണ്ണൂർ)' },
      { q: 'Thalassery', label: 'Thalassery (തലശ്ശേരി)' },
      { q: 'Panoor', label: 'Panoor & Koothuparamba' },
      { q: 'Payyanur', label: 'Payyanur (പയ്യന്നൂർ)' },
      { q: 'Pazhayangadi', label: 'Pazhayangadi & Madayi' },
      { q: 'Taliparamba', label: 'Taliparamba (തളിപ്പറമ്പ്)' },
      { q: 'Mattannur', label: 'Mattannur (മട്ടന്നൂർ)' },
      { q: 'Iritty', label: 'Iritty (ഇരിട്ടി)' },
      { q: 'Cherupuzha', label: 'Cherupuzha & Alakode' }
    ]
  },
  malappuram: {
    name: 'Malappuram',
    breadcrumbCoverage: 'Flagship District Coverage: 7 Taluks • 12 Municipalities • 94 Grama Panchayats',
    flagshipBadge: 'Flagship District Rollout #4',
    regionTagMl: 'മലപ്പുറം ജില്ലാ സമ്പൂർണ്ണ വെഡ്ഡിംഗ് ഗൈഡ്',
    mainTitle: 'Complete Malappuram Wedding Intelligence: Every City, Village & Hall Fee',
    mainSubtitleHtml: 'Comprehensive Malappuram Nikah, Mandi & Hall intelligence covering <strong>all 7 Taluks, 12 Municipalities &amp; 94 Grama Panchayats</strong> — from Manjeri, Malappuram Town, Areacode &amp; Anakkayam to Perinthalmanna, Angadipuram, Nilambur, Wandoor, Kondotty, Karipur Airport, Kottakkal, Tirurangadi, Chemmad, Tirur, Tanur, Valanchery, Ponnani &amp; Edappal.',
    hallsBtnLabel: 'Compare 12 Malappuram Halls & Fees',
    shopsBtnLabel: 'Browse 25 Malappuram People & Shops',
    stat1Val: '7 Taluks',
    stat1Desc: 'Ernad, Perinthalmanna, Kondotty, Nilambur, Tirurangadi, Tirur & Ponnani',
    stat2Val: '94 Panchayats',
    stat2Desc: '+ 12 Municipalities & Chaliyar valley',
    stat3Val: '12 Halls',
    stat3Desc: 'VP Hall, Shifa, Parappan Sq to Civic halls',
    stat4Val: '25 Vendors',
    stat4Desc: 'Ernad Biryani Ustads, Meat Mandi & Pandal',
    finderTitle: 'Find Wholesale Markets & Halls for Any Town or Village in Malappuram',
    searchPlaceholder: 'Type town/village: Manjeri, Perinthalmanna, Tirur, Kottakkal, നിലമ്പൂർ...',
    allTaluksLabel: 'All 7 Taluks (Full Malappuram)',
    taluks: [
      { id: 'Ernad', label: 'Ernad Taluk (Manjeri & Malappuram Town)' },
      { id: 'Perinthalmanna', label: 'Perinthalmanna Taluk (Angadipuram)' },
      { id: 'Kondotty', label: 'Kondotty Taluk (Airport Corridor)' },
      { id: 'Nilambur', label: 'Nilambur Taluk (Wandoor & Valley)' },
      { id: 'Tirurangadi', label: 'Tirurangadi Taluk (Kottakkal & Chemmad)' },
      { id: 'Tirur', label: 'Tirur Taluk (Tanur & Valanchery)' },
      { id: 'Ponnani', label: 'Ponnani Taluk (Edappal & Harbour)' }
    ],
    quickChips: [
      { q: 'Manjeri', label: 'Manjeri (മഞ്ചേരി)' },
      { q: 'Perinthalmanna', label: 'Perinthalmanna (പെരിന്തൽമണ്ണ)' },
      { q: 'Kottakkal', label: 'Kottakkal (കോട്ടക്കൽ)' },
      { q: 'Tirur', label: 'Tirur (തിരൂർ)' },
      { q: 'Kondotty', label: 'Kondotty (കൊണ്ടോട്ടി)' },
      { q: 'Nilambur', label: 'Nilambur (നിലമ്പൂർ)' },
      { q: 'Ponnani', label: 'Ponnani (പൊന്നാനി)' },
      { q: 'Valanchery', label: 'Valanchery (വളാഞ്ചേരി)' },
      { q: 'Edappal', label: 'Edappal (എടപ്പാൾ)' }
    ]
  },
  wayanad: {
    name: 'Wayanad',
    breadcrumbCoverage: 'Flagship District Coverage: 3 Taluks • 3 Municipalities • 23 Grama Panchayats',
    flagshipBadge: 'Flagship District Rollout #5',
    regionTagMl: 'വയനാട് ജില്ലാ സമ്പൂർണ്ണ വെഡ്ഡിംഗ് ഗൈഡ്',
    mainTitle: 'Complete Wayanad Wedding Intelligence: Every City, Village & Hall Fee',
    mainSubtitleHtml: 'Highland wedding sourcing & destination intelligence covering <strong>all 3 Taluks, 3 Municipalities &amp; 23 Grama Panchayats</strong> — from Kalpetta, Vythiri, Lakkidi, Meppadi &amp; Chundale to Sulthan Bathery, Ambalavayal, Meenangadi, Pulpally, Mananthavady, Panamaram &amp; Thirunelly.',
    hallsBtnLabel: 'Compare 8 Wayanad Halls & Fees',
    shopsBtnLabel: 'Browse 16 Wayanad People & Shops',
    stat1Val: '3 Taluks',
    stat1Desc: 'Vythiri, Sulthan Bathery & Mananthavady',
    stat2Val: '23 Panchayats',
    stat2Desc: '+ 3 Municipalities & Ghat border',
    stat3Val: '8 Halls',
    stat3Desc: 'Saptha, Destiny Lounge to Parish halls',
    stat4Val: '16 Vendors',
    stat4Desc: 'Kaima Rice Mills, Estate Spices & Tents',
    finderTitle: 'Find Wholesale Markets & Halls for Any Town or Village in Wayanad',
    searchPlaceholder: 'Type town/village: Kalpetta, Sulthan Bathery, Mananthavady, വൈത്തിരി...',
    allTaluksLabel: 'All 3 Taluks (Full Wayanad)',
    taluks: [
      { id: 'Vythiri', label: 'Vythiri Taluk (Kalpetta & Lakkidi)' },
      { id: 'Sulthan Bathery', label: 'Sulthan Bathery Taluk (Ambalavayal)' },
      { id: 'Mananthavady', label: 'Mananthavady Taluk (Panamaram)' }
    ],
    quickChips: [
      { q: 'Kalpetta', label: 'Kalpetta (കൽപ്പറ്റ)' },
      { q: 'Sulthan Bathery', label: 'Sulthan Bathery (ബത്തേരി)' },
      { q: 'Vythiri', label: 'Vythiri (വൈത്തിരി)' },
      { q: 'Mananthavady', label: 'Mananthavady (മാനന്തവാടി)' },
      { q: 'Meenangadi', label: 'Meenangadi (മീനങ്ങാടി)' },
      { q: 'Ambalavayal', label: 'Ambalavayal (അമ്പലവയൽ)' },
      { q: 'Pulpally', label: 'Pulpally (പുൽപ്പള്ളി)' },
      { q: 'Panamaram', label: 'Panamaram (പനമരം)' }
    ]
  }
};

const HALL_REGIONS_BY_DISTRICT = {
  kasaragod: [
    { id: 'manjeshwar_uppala', label: 'Manjeshwar, Uppala, Hosangadi & Kumbla' },
    { id: 'badiyadka_mulleria', label: 'Badiyadka, Perla, Mulleria & Bellur' },
    { id: 'kasaragod_central', label: 'Kasaragod Town, Vidyanagar, Cherkala & Maipady' },
    { id: 'uduma_bekal', label: 'Uduma, Bekal & Pallikkara' },
    { id: 'kanhangad_nileshwar', label: 'Kanhangad, Mavungal & Nileshwaram' },
    { id: 'cheruvathur_trikaripur', label: 'Cheruvathur & Trikaripur' },
    { id: 'vellarikundu_highrange', label: 'Vellarikundu, Odayanchal & Rajapuram' }
  ],
  kozhikode: [
    { id: 'clt_city', label: 'Kozhikode City, Valiyangadi & Palayam' },
    { id: 'clt_feroke_ramanattukara', label: 'Feroke, Beypore & Ramanattukara' },
    { id: 'clt_thamarassery_mukkam', label: 'Thamarassery, Koduvally & Mukkam' },
    { id: 'clt_koyilandy', label: 'Koyilandy, Payyoli & Balussery' },
    { id: 'clt_vadakara', label: 'Vadakara, Nadapuram & Kuttiady' }
  ],
  kannur: [
    { id: 'knr_city', label: 'Kannur City, Camp Bazaar & Valapattanam' },
    { id: 'knr_thalassery_panoor', label: 'Thalassery, Panoor & Koothuparamba' },
    { id: 'knr_payyanur_taliparamba', label: 'Payyanur, Taliparamba & Pazhayangadi' },
    { id: 'knr_iritty_mattannur', label: 'Mattannur, Iritty & Peravoor' }
  ],
  malappuram: [
    { id: 'mlp_manjeri_malappuram', label: 'Manjeri, Malappuram Town & Areacode' },
    { id: 'mlp_perinthalmanna_nilambur', label: 'Perinthalmanna, Nilambur & Wandoor' },
    { id: 'mlp_kondotty_kottakkal', label: 'Kondotty, Kottakkal & Tirurangadi' },
    { id: 'mlp_tirur_ponnani', label: 'Tirur, Tanur, Valanchery & Ponnani' }
  ],
  wayanad: [
    { id: 'wyd_kalpetta_vythiri', label: 'Kalpetta, Vythiri, Meppadi & Lakkidi' },
    { id: 'wyd_bathery_eastern', label: 'Sulthan Bathery, Ambalavayal & Pulpally' },
    { id: 'wyd_mananthavady_north', label: 'Mananthavady, Panamaram & Thirunelly' }
  ]
};

function getActiveHubDirectory() {
  if (state.hubDistrict === 'kozhikode' && typeof KOZHIKODE_COVERAGE_DIRECTORY !== 'undefined') {
    return KOZHIKODE_COVERAGE_DIRECTORY;
  }
  if (state.hubDistrict === 'kannur' && typeof KANNUR_COVERAGE_DIRECTORY !== 'undefined') {
    return KANNUR_COVERAGE_DIRECTORY;
  }
  if (state.hubDistrict === 'malappuram' && typeof MALAPPURAM_COVERAGE_DIRECTORY !== 'undefined') {
    return MALAPPURAM_COVERAGE_DIRECTORY;
  }
  if (state.hubDistrict === 'wayanad' && typeof WAYANAD_COVERAGE_DIRECTORY !== 'undefined') {
    return WAYANAD_COVERAGE_DIRECTORY;
  }
  return typeof KASARAGOD_COVERAGE_DIRECTORY !== 'undefined' ? KASARAGOD_COVERAGE_DIRECTORY : [];
}

function selectHubDistrict(districtId, shouldNavigate = true) {
  const target = FLAGSHIP_HUB_META[districtId] ? districtId : 'kasaragod';
  state.hubDistrict = target;
  state.kasaragodTalukFilter = 'all';
  state.kasaragodVillageQuery = '';

  const meta = FLAGSHIP_HUB_META[target];
  const searchInput = document.getElementById('kasaragodVillageSearchInput');
  if (searchInput) {
    searchInput.value = '';
    searchInput.placeholder = meta.searchPlaceholder;
  }

  ['kasaragod', 'kozhikode', 'kannur', 'malappuram', 'wayanad'].forEach(dId => {
    const btn = document.getElementById(`hubSwitch-${dId}`);
    if (!btn) return;
    btn.className = dId === target
      ? 'hub-district-btn px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-800 text-white shadow-sm transition-all flex items-center gap-1.5 ring-2 ring-emerald-500/40'
      : 'hub-district-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1.5';
  });

  const textMap = {
    hubBreadcrumbCoverage: meta.breadcrumbCoverage,
    hubFlagshipBadge: meta.flagshipBadge,
    hubRegionTagMl: meta.regionTagMl,
    hubMainTitle: meta.mainTitle,
    hubHallsBtnLabel: meta.hallsBtnLabel,
    hubShopsBtnLabel: meta.shopsBtnLabel,
    hubStat1Val: meta.stat1Val,
    hubStat1Desc: meta.stat1Desc,
    hubStat2Val: meta.stat2Val,
    hubStat2Desc: meta.stat2Desc,
    hubStat3Val: meta.stat3Val,
    hubStat3Desc: meta.stat3Desc,
    hubStat4Val: meta.stat4Val,
    hubStat4Desc: meta.stat4Desc,
    hubFinderTitle: meta.finderTitle
  };
  Object.entries(textMap).forEach(([elId, val]) => {
    const el = document.getElementById(elId);
    if (el) el.innerText = val;
  });

  const subEl = document.getElementById('hubMainSubtitle');
  if (subEl) subEl.innerHTML = meta.mainSubtitleHtml;

  const talukContainer = document.getElementById('kasaragodTalukPillContainer');
  if (talukContainer) {
    talukContainer.innerHTML = `
      <button onclick="setKasaragodTalukFilter('all')" class="ksd-taluk-pill px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-800 text-white shadow-sm transition-all">${meta.allTaluksLabel}</button>
      ${meta.taluks.map(t => `
        <button onclick="setKasaragodTalukFilter('${t.id}')" class="ksd-taluk-pill px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">${t.label}</button>
      `).join('')}
    `;
  }

  const chipsContainer = document.getElementById('hubQuickVillageChips');
  if (chipsContainer) {
    chipsContainer.innerHTML = `
      <span class="font-bold text-slate-500 mr-1">Quick Village Test:</span>
      ${meta.quickChips.map(c => `
        <button onclick="quickSelectKasaragodVillage('${c.q}')" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold">${c.label}</button>
      `).join('')}
      <button onclick="quickSelectKasaragodVillage('')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Clear Search</button>
    `;
  }

  renderKasaragodVillageFinder();

  if (shouldNavigate) {
    navigateToSection('kasaragod');
  }
  lucide.createIcons();
}

function openAllKasaragodShops() {
  const targetDist = FLAGSHIP_HUB_META[state.hubDistrict] ? state.hubDistrict : 'kasaragod';
  state.selectedDistrict = targetDist;
  state.selectedTown = 'all';

  const filterSelect = document.getElementById('districtFilterSelect');
  if (filterSelect) filterSelect.value = targetDist;

  updateDistrictNotice();
  renderPeopleCategoryPills();
  renderVendors();
  navigateToSection('people', 'vendor-directory');
}

function filterKasaragodVillages(query) {
  state.kasaragodVillageQuery = (query || '').trim();
  renderKasaragodVillageFinder();
}

function setKasaragodTalukFilter(taluk) {
  state.kasaragodTalukFilter = taluk;

  document.querySelectorAll('.ksd-taluk-pill').forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    const isActive = onclickAttr.includes(`'${taluk}'`);
    btn.className = isActive
      ? 'ksd-taluk-pill px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-800 text-white shadow-sm transition-all'
      : 'ksd-taluk-pill px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all';
  });

  renderKasaragodVillageFinder();
}

function quickSelectKasaragodVillage(term) {
  const input = document.getElementById('kasaragodVillageSearchInput');
  if (input) input.value = term;
  state.kasaragodVillageQuery = term;
  if (term) {
    state.kasaragodTalukFilter = 'all';
    setKasaragodTalukFilter('all');
  } else {
    renderKasaragodVillageFinder();
  }
}

function jumpToVillageVendors(townId, districtId) {
  const targetDist = FLAGSHIP_HUB_META[districtId || state.hubDistrict] ? (districtId || state.hubDistrict) : 'kasaragod';
  state.selectedDistrict = targetDist;
  state.selectedTown = townId || 'all';

  const filterSelect = document.getElementById('districtFilterSelect');
  if (filterSelect) filterSelect.value = targetDist;

  updateDistrictNotice();
  renderPeopleCategoryPills();
  renderVendors();
  navigateToSection('people', 'kasaragodTownFilterBar');
}

function jumpToRegionalHalls(regionId, districtId) {
  const targetDist = districtId || (FLAGSHIP_HUB_META[state.hubDistrict] ? state.hubDistrict : 'all');
  state.hallDistrictFilter = targetDist;
  state.hallRegionFilter = regionId || 'all';

  const districtSelect = document.getElementById('hallDistrictSelect');
  if (districtSelect) districtSelect.value = targetDist;

  populateHallRegionsDropdown();

  const regionSelect = document.getElementById('hallRegionSelect');
  if (regionSelect) regionSelect.value = state.hallRegionFilter;

  renderKasaragodWeddingHalls();
  navigateToSection('halls', 'kasaragod-wedding-halls');
}

function renderKasaragodVillageFinder() {
  const grid = document.getElementById('kasaragodVillageGrid');
  const directory = getActiveHubDirectory();
  if (!grid || !directory || directory.length === 0) return;

  const activeDistrict = FLAGSHIP_HUB_META[state.hubDistrict] ? state.hubDistrict : 'kasaragod';
  const activeMeta = FLAGSHIP_HUB_META[activeDistrict];
  let items = directory;

  if (state.kasaragodTalukFilter && state.kasaragodTalukFilter !== 'all') {
    items = items.filter(item => item.taluk === state.kasaragodTalukFilter);
  }

  if (state.kasaragodVillageQuery) {
    const terms = resolveLocalitySearchTerms(state.kasaragodVillageQuery);
    items = items.filter(item => {
      const searchable = [
        item.taluk,
        item.zone,
        item.primaryHub,
        item.nearestCities,
        item.wholesaleAdvantage,
        ...item.villagesCovered
      ].join(' ').toLowerCase();
      return terms.some(t => searchable.includes(t));
    });
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6">
        <i data-lucide="map-pin-off" class="w-10 h-10 text-slate-400 mx-auto mb-2"></i>
        <h4 class="text-sm font-bold text-slate-800">No Matching Locality Found in ${activeMeta.name} for "${state.kasaragodVillageQuery}"</h4>
        <p class="text-xs text-slate-500 mt-1">Try searching a nearby Panchayat/Town in ${activeMeta.name}, or pick a Taluk filter above.</p>
        <button onclick="quickSelectKasaragodVillage('')" class="mt-3 px-4 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold">Show All ${activeMeta.name} Hubs</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const distVendors = state.vendorsList.filter(v => v.district === activeDistrict);
  const allHalls = typeof getAllWeddingHalls === 'function'
    ? getAllWeddingHalls()
    : (typeof KASARAGOD_WEDDING_HALLS !== 'undefined' ? KASARAGOD_WEDDING_HALLS : []);
  const distHalls = allHalls.filter(h => (h.district || 'kasaragod') === activeDistrict);

  grid.innerHTML = items.map(loc => {
    const shopCount = distVendors.filter(v => matchesVendorTown(v, loc.townFilterId)).length;
    const hallCount = distHalls.filter(h => h.regionId === loc.hallRegionId).length;

    return `
      <div class="bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 shadow-sm transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
              ${loc.taluk} Taluk
            </span>
            <span class="text-[10px] font-bold text-slate-500">${loc.zone}</span>
          </div>

          <h4 class="text-base font-extrabold text-slate-900 leading-snug">
            ${loc.primaryHub}
          </h4>

          <div class="mt-2.5 flex flex-wrap gap-1">
            ${loc.villagesCovered.slice(0, 8).map(v => `
              <span class="text-[10px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">${v}</span>
            `).join('')}
          </div>

          <div class="mt-3 text-xs text-slate-600 space-y-1.5">
            <div class="flex items-start gap-1.5">
              <i data-lucide="compass" class="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5"></i>
              <span><strong>City Access:</strong> ${loc.nearestCities}</span>
            </div>
            <div class="flex items-start gap-1.5">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"></i>
              <span>${loc.wholesaleAdvantage}</span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-200">
          <div class="flex items-center gap-2">
            <button onclick="jumpToVillageVendors('${loc.townFilterId}', '${activeDistrict}')" class="flex-1 py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1 shadow-sm">
              <i data-lucide="store" class="w-3.5 h-3.5 text-amber-300"></i>
              <span>${shopCount} Local Shops</span>
            </button>
            <button onclick="jumpToRegionalHalls('${loc.hallRegionId}', '${activeDistrict}')" class="flex-1 py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-[11px] font-bold transition-all flex items-center justify-center gap-1">
              <i data-lucide="landmark" class="w-3.5 h-3.5 text-amber-800"></i>
              <span>${hallCount} Halls &amp; Fees</span>
            </button>
          </div>
          ${activeDistrict === 'kasaragod' ? `
            <button onclick="openVillageLogisticsModal('${loc.id}')" class="w-full mt-2 py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-xs">
              <i data-lucide="route" class="w-3.5 h-3.5 text-emerald-700"></i>
              <span>Route, Mandi &amp; Logistics Dossier (റൂട്ട് &amp; മാർക്കറ്റ്)</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function populateHallRegionsDropdown() {
  const regionEl = document.getElementById('hallRegionSelect');
  if (!regionEl) return;

  const distFilter = state.hallDistrictFilter || 'all';
  if (distFilter !== 'all' && HALL_REGIONS_BY_DISTRICT[distFilter]) {
    const distName = FLAGSHIP_HUB_META[distFilter]?.name || distFilter;
    regionEl.innerHTML = `<option value="all">All ${distName} Regions</option>` +
      HALL_REGIONS_BY_DISTRICT[distFilter].map(r => `<option value="${r.id}">${r.label}</option>`).join('');
  } else {
    regionEl.innerHTML = `<option value="all">All Regions (5 Flagship Districts)</option>` +
      ['kasaragod', 'kozhikode', 'kannur', 'malappuram', 'wayanad'].map(dId => {
        const dName = FLAGSHIP_HUB_META[dId]?.name || dId;
        const opts = (HALL_REGIONS_BY_DISTRICT[dId] || []).map(r => `<option value="${r.id}">${dName} — ${r.label}</option>`).join('');
        return `<optgroup label="${dName} District">${opts}</optgroup>`;
      }).join('');
  }

  const validValues = new Set(['all']);
  Object.values(HALL_REGIONS_BY_DISTRICT).flat().forEach(r => validValues.add(r.id));
  if (!validValues.has(state.hallRegionFilter)) {
    state.hallRegionFilter = 'all';
  }
  regionEl.value = state.hallRegionFilter;
}

function handleHallDistrictChange() {
  const distEl = document.getElementById('hallDistrictSelect');
  state.hallDistrictFilter = distEl ? distEl.value : 'all';
  state.hallRegionFilter = 'all';
  populateHallRegionsDropdown();
  renderKasaragodWeddingHalls();
}

function handleHallFilterChange() {
  const distEl = document.getElementById('hallDistrictSelect');
  const regionEl = document.getElementById('hallRegionSelect');
  const seatingEl = document.getElementById('hallSeatingSelect');
  if (distEl) state.hallDistrictFilter = distEl.value;
  if (regionEl) state.hallRegionFilter = regionEl.value;
  if (seatingEl) state.hallMinSeating = parseInt(seatingEl.value, 10) || 0;
  renderKasaragodWeddingHalls();
}

function handleHallSearchInput(query) {
  state.hallSearchQuery = (query || '').trim();
  renderKasaragodWeddingHalls();
}

function setHallTierFilter(tier) {
  state.hallTierFilter = tier;
  document.querySelectorAll('.hall-tier-pill').forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    const isActive = onclickAttr.includes(`'${tier}'`);
    btn.className = isActive
      ? 'hall-tier-pill px-3 py-1.5 rounded-lg text-xs font-extrabold bg-emerald-800 text-white transition-all'
      : 'hall-tier-pill px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:border-emerald-600 transition-all';
  });
  renderKasaragodWeddingHalls();
}

function addHallToProcurementSheet(hallId) {
  const allHalls = typeof getAllWeddingHalls === 'function'
    ? getAllWeddingHalls()
    : (typeof KASARAGOD_WEDDING_HALLS !== 'undefined' ? KASARAGOD_WEDDING_HALLS : []);
  const hall = allHalls.find(h => h.id === hallId);
  if (!hall) return;
  addItemToProcurementSheet(
    `Wedding Hall Base Slot: ${hall.name} (${hall.locality})`,
    1,
    'Day Booking (Base Est.)',
    hall.baseSlotFee,
    'Wedding Auditorium Fee'
  );
}

function renderKasaragodWeddingHalls() {
  const grid = document.getElementById('kasaragodHallsGrid');
  const countBadge = document.getElementById('hallResultCountBadge');
  const allHalls = typeof getAllWeddingHalls === 'function'
    ? getAllWeddingHalls()
    : (typeof KASARAGOD_WEDDING_HALLS !== 'undefined' ? KASARAGOD_WEDDING_HALLS : []);
  if (!grid || allHalls.length === 0) return;

  let halls = allHalls;

  if (state.hallDistrictFilter && state.hallDistrictFilter !== 'all') {
    halls = halls.filter(h => (h.district || 'kasaragod') === state.hallDistrictFilter);
  }

  if (state.hallRegionFilter && state.hallRegionFilter !== 'all') {
    halls = halls.filter(h => h.regionId === state.hallRegionFilter);
  }

  if (state.hallTierFilter && state.hallTierFilter !== 'all') {
    halls = halls.filter(h => h.tier === state.hallTierFilter);
  }

  if (state.hallMinSeating > 0) {
    halls = halls.filter(h => h.seatingCapacity >= state.hallMinSeating);
  }

  if (state.hallSearchQuery) {
    const terms = resolveLocalitySearchTerms(state.hallSearchQuery);
    halls = halls.filter(h => {
      const searchable = [
        h.district || 'kasaragod',
        h.name,
        h.locality,
        h.taluk,
        h.type,
        h.acStatus,
        ...(h.servesVillages || [])
      ].join(' ').toLowerCase();
      return terms.some(t => searchable.includes(t));
    });
  }

  if (countBadge) {
    const scopeName = state.hallDistrictFilter && state.hallDistrictFilter !== 'all'
      ? (FLAGSHIP_HUB_META[state.hallDistrictFilter]?.name || state.hallDistrictFilter)
      : 'All-District';
    countBadge.innerText = `Showing ${halls.length} ${scopeName} Hall${halls.length === 1 ? '' : 's'}`;
  }

  if (halls.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6">
        <i data-lucide="landmark" class="w-10 h-10 text-slate-400 mx-auto mb-2"></i>
        <h4 class="text-sm font-bold text-slate-800">No Wedding Halls Match Current Filters</h4>
        <p class="text-xs text-slate-500 mt-1">Try selecting "All Districts", "All Fee Tiers", or lowering the minimum seating filter.</p>
        <button onclick="document.getElementById('hallDistrictSelect').value='all'; state.hallDistrictFilter='all'; populateHallRegionsDropdown(); setHallTierFilter('all'); document.getElementById('hallRegionSelect').value='all'; document.getElementById('hallSeatingSelect').value='0'; document.getElementById('hallSearchInput').value=''; state.hallSearchQuery=''; handleHallFilterChange();" class="mt-3 px-4 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold">
          Reset Hall Filters
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const guests = state.budgetGuests || state.currentGuests || 600;

  grid.innerHTML = halls.map(h => {
    const hallDist = h.district || 'kasaragod';
    const distLabel = FLAGSHIP_HUB_META[hallDist]?.name || 'Kasaragod';
    const diningBatches = Math.max(1, Math.ceil(guests / h.diningCapacity));
    const tierBadge = h.tier === 'premium'
      ? '<span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">Grand Convention</span>'
      : h.tier === 'mid'
        ? '<span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">Mid-Range AC/Hall</span>'
        : '<span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">Budget Friendly</span>';

    const waText = encodeURIComponent(
      `Hello! I saw *${h.name}* (${h.locality}, ${distLabel}) on KalyanaMitra Kerala.\n\n` +
      `We are planning a wedding for approx. *${guests} guests*. Could you please share:\n` +
      `1. Exact hall rent for our wedding date (${h.fullPackageRange} range)\n` +
      `2. AC & Generator diesel extra charges\n` +
      `3. Outside catering / kitchen timing rules\n\nThank you!`
    );
    const waLink = `https://wa.me/${h.contact.replace(/\D/g, '')}?text=${waText}`;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapQuery || (h.name + ' ' + h.locality))}`;

    const isCompared = (state.selectedCompareHalls || []).includes(h.id);
    const compareBtn = isCompared
      ? `<button onclick="toggleHallCompare('${h.id}')" class="w-full py-1.5 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm">
           <i data-lucide="check" class="w-3.5 h-3.5"></i>
           <span>Selected for Comparison (Remove)</span>
         </button>`
      : `<button onclick="toggleHallCompare('${h.id}')" class="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all">
           <i data-lucide="scale" class="w-3.5 h-3.5 text-purple-700"></i>
           <span>Add to Side-by-Side Compare</span>
         </button>`;

    return `
      <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            ${tierBadge}
            <span class="text-[11px] font-bold text-slate-500">${distLabel} • ${h.taluk} Taluk</span>
          </div>

          <h4 class="text-base font-extrabold text-slate-900 leading-snug">
            ${h.name}
          </h4>
          <p class="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
            <span>${h.locality}</span>
          </p>

          <!-- Fee Box -->
          <div class="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200">
            <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-900">
              <span>Estimated Hall Fee / Rent</span>
              <span>Base from ₹${h.baseSlotFee.toLocaleString('en-IN')}</span>
            </div>
            <div class="text-lg font-black text-emerald-950 mt-0.5">
              ${h.fullPackageRange}
            </div>
            <div class="text-[11px] font-semibold text-slate-700 mt-0.5">
              ${h.acStatus}
            </div>
          </div>

          <!-- Capacity & Dining Batches -->
          <div class="grid grid-cols-3 gap-2 mt-3 text-center">
            <div class="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <div class="text-[10px] text-slate-500 font-bold">Main Hall</div>
              <div class="text-xs font-black text-slate-900">${h.seatingCapacity} Seats</div>
            </div>
            <div class="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <div class="text-[10px] text-slate-500 font-bold">Dining (പന്തി)</div>
              <div class="text-xs font-black text-emerald-900">${h.diningCapacity} (~${diningBatches} Batches)</div>
            </div>
            <div class="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <div class="text-[10px] text-slate-500 font-bold">Parking</div>
              <div class="text-xs font-black text-slate-900">${h.parkingCars} Cars</div>
            </div>
          </div>

          <div class="mt-3 space-y-1.5 text-[11px] text-slate-600">
            <div><strong class="text-slate-800">Fee &amp; Utility Note:</strong> ${h.extraChargesNote}</div>
            <div><strong class="text-emerald-800">Catering:</strong> ${h.cateringPolicy}</div>
            <div class="text-slate-500"><strong>Serves:</strong> ${h.servesVillages.join(', ')}</div>
          </div>

          <!-- Amenity Badges (Ladies Dining, Prayer Room, Power Backup) -->
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[10px]">
            ${h.separateLadiesDining ? `<span class="font-bold px-2 py-0.5 rounded bg-pink-50 text-pink-900 border border-pink-200">🧕 ${h.separateLadiesDining}</span>` : ''}
            ${h.prayerRoom ? `<span class="font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">🕌 Prayer Hall</span>` : ''}
            ${h.bridalRooms ? `<span class="font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 border border-indigo-200">💄 ${h.bridalRooms}</span>` : ''}
            ${h.powerBackup ? `<span class="font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">⚡ ${h.powerBackup}</span>` : ''}
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 space-y-2">
          ${compareBtn}

          <button onclick="addHallToProcurementSheet('${h.id}')" class="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm">
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Add Est. Base Fee (₹${h.baseSlotFee.toLocaleString('en-IN')}) to Sheet</span>
          </button>

          <div class="flex items-center gap-2">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
              <i data-lucide="message-circle" class="w-3.5 h-3.5 fill-white text-emerald-500"></i>
              <span>Enquire Dates &amp; Fees</span>
            </a>
            <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors" title="View on Google Maps">
              <i data-lucide="navigation" class="w-4 h-4 text-blue-600"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
  updateHallCompareBar();
}

function toggleHallCompare(hallId) {
  if (!state.selectedCompareHalls) state.selectedCompareHalls = [];
  const idx = state.selectedCompareHalls.indexOf(hallId);
  if (idx > -1) {
    state.selectedCompareHalls.splice(idx, 1);
  } else {
    if (state.selectedCompareHalls.length >= 3) {
      alert('You can compare at most 3 wedding halls at a time. Remove one to add another.');
      return;
    }
    state.selectedCompareHalls.push(hallId);
  }
  updateHallCompareBar();
  renderKasaragodWeddingHalls();
}

function clearHallCompare() {
  state.selectedCompareHalls = [];
  updateHallCompareBar();
  renderKasaragodWeddingHalls();
}

function updateHallCompareBar() {
  const bar = document.getElementById('hallCompareFloatingBar');
  const countEl = document.getElementById('compareSelectedCount');
  const count = (state.selectedCompareHalls || []).length;
  if (countEl) countEl.innerText = count;
  if (!bar) return;
  if (count > 0) {
    bar.classList.remove('hidden');
  } else {
    bar.classList.add('hidden');
  }
}

function openHallCompareModal() {
  const modal = document.getElementById('hallCompareModal');
  const body = document.getElementById('hallCompareModalBody');
  if (!modal || !body) return;

  const allHalls = typeof getAllWeddingHalls === 'function'
    ? getAllWeddingHalls()
    : (typeof KASARAGOD_WEDDING_HALLS !== 'undefined' ? KASARAGOD_WEDDING_HALLS : []);
  const selectedHalls = allHalls.filter(h => (state.selectedCompareHalls || []).includes(h.id));

  if (selectedHalls.length === 0) {
    body.innerHTML = `
      <div class="text-center py-12">
        <i data-lucide="scale" class="w-12 h-12 text-slate-400 mx-auto mb-3"></i>
        <h4 class="text-base font-bold text-slate-800">No Halls Selected Yet</h4>
        <p class="text-xs text-slate-500 mt-1">Please select 2 or 3 halls from the listing using the "Add to Side-by-Side Compare" button.</p>
      </div>
    `;
    modal.classList.remove('hidden');
    lucide.createIcons();
    return;
  }

  const guests = state.budgetGuests || state.currentGuests || 600;

  let tableHtml = `
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-xs">
        <thead>
          <tr class="bg-slate-100 text-slate-800 border-b border-slate-300">
            <th class="p-3 font-extrabold w-44 bg-slate-200">Comparison Feature</th>
            ${selectedHalls.map(h => `
              <th class="p-3 font-black text-sm text-slate-900 border-l border-slate-200 min-w-[220px]">
                <div class="flex items-center justify-between gap-1">
                  <span>${h.name}</span>
                  <button onclick="toggleHallCompare('${h.id}'); openHallCompareModal();" class="text-slate-400 hover:text-red-500 text-xs p-1" title="Remove from compare">✕</button>
                </div>
                <div class="text-xs font-semibold text-emerald-800 mt-0.5">${FLAGSHIP_HUB_META[h.district]?.name || h.district} • ${h.locality}</div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 text-slate-700">
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Fee Tier &amp; Type</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 font-extrabold text-slate-900 capitalize">${h.tier} Tier • ${h.type}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Estimated Total Package</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 text-sm font-black text-emerald-950 bg-amber-50/50">${h.fullPackageRange}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Base Day Slot Fee</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 font-bold text-slate-800">₹${h.baseSlotFee.toLocaleString('en-IN')}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Main Hall Seating</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 font-extrabold text-slate-900">${h.seatingCapacity} Seats</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Dining Hall Capacity</td>
            ${selectedHalls.map(h => {
              const batches = Math.max(1, Math.ceil(guests / h.diningCapacity));
              return `<td class="p-3 border-l border-slate-200 font-bold text-emerald-900">${h.diningCapacity} Seats (~${batches} Batches for ${guests} guests)</td>`;
            }).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Air Conditioning (AC)</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 text-slate-800">${h.acStatus}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Dedicated Car Parking</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 text-slate-800">${h.parkingCars} Cars</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Utility / Diesel / Cleaning</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 text-xs text-slate-600">${h.extraChargesNote}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Outside Catering Policy</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 text-xs text-slate-700">${h.cateringPolicy}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Ladies Dining Partition</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 text-xs font-semibold text-slate-800">${h.separateLadiesDining || 'Partition Available on Request'}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Prayer Hall &amp; Dressing Suites</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 text-xs text-slate-700">${(h.prayerRoom ? 'Prayer Hall Available • ' : '') + (h.bridalRooms || 'Standard Dressing Rooms')}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">GenSet Power Backup</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 text-xs text-slate-700">${h.powerBackup || 'Generator Available'}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Key Serviced Towns</td>
            ${selectedHalls.map(h => `<td class="p-3 border-l border-slate-200 text-xs text-slate-500">${h.servesVillages.slice(0, 5).join(', ')}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-3 font-bold bg-slate-50 text-slate-800">Actions</td>
            ${selectedHalls.map(h => {
              const waText = encodeURIComponent(
                `Hello! I am inquiring about *${h.name}* (${h.locality}) via KalyanaMitra Comparator for a wedding with approx. ${guests} guests.`
              );
              return `
                <td class="p-3 border-l border-slate-200 space-y-1.5">
                  <button onclick="addHallToProcurementSheet('${h.id}')" class="w-full py-1.5 px-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] flex items-center justify-center gap-1 shadow-sm">
                    <i data-lucide="plus" class="w-3 h-3"></i> Add Base to Sheet
                  </button>
                  <a href="https://wa.me/${h.contact.replace(/\D/g, '')}?text=${waText}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn w-full py-1.5 px-2 rounded-lg text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm">
                    <i data-lucide="message-circle" class="w-3 h-3"></i> WhatsApp Enquiry
                  </a>
                </td>
              `;
            }).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;

  body.innerHTML = tableHtml;
  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeHallCompareModal() {
  const modal = document.getElementById('hallCompareModal');
  if (modal) modal.classList.add('hidden');
}

// -------------------------------------------------------------
// Kasaragod Micro-Feature Upgrades: Village Logistics, SOS & Feast Calculator
// -------------------------------------------------------------

function openVillageLogisticsModal(locId) {
  const modal = document.getElementById('villageLogisticsModal');
  const title = document.getElementById('villageLogisticsModalTitle');
  const subtitle = document.getElementById('villageLogisticsModalSubtitle');
  const body = document.getElementById('villageLogisticsModalBody');
  if (!modal || !body) return;

  const loc = typeof KASARAGOD_COVERAGE_DIRECTORY !== 'undefined'
    ? KASARAGOD_COVERAGE_DIRECTORY.find(item => item.id === locId)
    : null;

  if (!loc) return;

  const dossier = (typeof KASARAGOD_VILLAGE_LOGISTICS_DOSSIER !== 'undefined' && KASARAGOD_VILLAGE_LOGISTICS_DOSSIER[locId])
    ? KASARAGOD_VILLAGE_LOGISTICS_DOSSIER[locId]
    : {
        primaryMandi: 'Nearest APMC Mandi / Wholesale Yard',
        travelTimePickup: '15–30 mins by Tata Ace / Bolero',
        freightEstimate: '₹700 – ₹1,200',
        meatSlaughterhouse: 'Local Registered Halal Meat Center',
        vegMandi: 'Nearby Daily Fresh Vegetable Yard',
        iceFactory: 'Coastal / Industrial Ice Depot',
        lpgEmergency: 'Commercial LPG Cylinder Service (+919847112233)',
        waterTanker: 'Potable Drinking Water Tankers (+919847990011)',
        pandalUtensils: 'Local Pandal & Heavy Vessel Works',
        traditionDish: 'Authentic Kasaragod Neychoru & Spiced Meat Curry',
        gmapsMandiQuery: loc.primaryHub + ' Kasaragod'
      };

  if (title) title.innerText = loc.primaryHub + ' — Logistics & Mandi Dossier';
  if (subtitle) subtitle.innerText = loc.taluk + ' Taluk • ' + loc.zone;

  const gmapsLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(dossier.gmapsMandiQuery);

  body.innerHTML = `
    <!-- Top Mandi & Transit Banner -->
    <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200">
      <div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-900">
        <span>Primary Wholesale Lifeline (പ്രധാന മൊത്തവ്യാപാര മാർക്കറ്റ്)</span>
        <span class="px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-black">Fastest Route</span>
      </div>
      <div class="text-base font-extrabold text-slate-900 mt-1">
        ${dossier.primaryMandi}
      </div>
      <div class="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div class="p-2 rounded-xl bg-white border border-amber-200 flex items-center gap-2">
          <i data-lucide="clock" class="w-4 h-4 text-emerald-700 shrink-0"></i>
          <div>
            <div class="text-[10px] text-slate-500 font-bold">Transit Time</div>
            <div class="font-extrabold text-slate-900">${dossier.travelTimePickup}</div>
          </div>
        </div>
        <div class="p-2 rounded-xl bg-white border border-amber-200 flex items-center gap-2">
          <i data-lucide="truck" class="w-4 h-4 text-amber-700 shrink-0"></i>
          <div>
            <div class="text-[10px] text-slate-500 font-bold">Est. Freight (Tata Ace)</div>
            <div class="font-extrabold text-slate-900">${dossier.freightEstimate}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Essential Sourcing Depots -->
    <div class="space-y-2 text-xs">
      <div class="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Local Sourcing Lifelines for ${loc.taluk}:</div>
      
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <i data-lucide="beef" class="w-4 h-4 text-rose-600 mt-0.5 shrink-0"></i>
        <div>
          <strong class="text-slate-900">Abattoir &amp; Poultry:</strong>
          <span class="text-slate-600 ml-1">${dossier.meatSlaughterhouse}</span>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <i data-lucide="carrot" class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0"></i>
        <div>
          <strong class="text-slate-900">Vegetable &amp; Banana Leaves:</strong>
          <span class="text-slate-600 ml-1">${dossier.vegMandi}</span>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <i data-lucide="snowflake" class="w-4 h-4 text-blue-600 mt-0.5 shrink-0"></i>
        <div>
          <strong class="text-slate-900">Meat Preservation Ice Depot:</strong>
          <span class="text-slate-600 ml-1">${dossier.iceFactory}</span>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <i data-lucide="flame" class="w-4 h-4 text-amber-600 mt-0.5 shrink-0"></i>
        <div>
          <strong class="text-slate-900">Commercial Gas (19kg):</strong>
          <span class="text-slate-600 ml-1">${dossier.lpgEmergency}</span>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <i data-lucide="droplet" class="w-4 h-4 text-cyan-600 mt-0.5 shrink-0"></i>
        <div>
          <strong class="text-slate-900">Drinking Water Tanker:</strong>
          <span class="text-slate-600 ml-1">${dossier.waterTanker}</span>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <i data-lucide="tent" class="w-4 h-4 text-purple-600 mt-0.5 shrink-0"></i>
        <div>
          <strong class="text-slate-900">Pandal, Chembu &amp; Thali Rental:</strong>
          <span class="text-slate-600 ml-1">${dossier.pandalUtensils}</span>
        </div>
      </div>
    </div>

    <!-- Cultural Specialty Note -->
    <div class="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
      <div class="flex items-center gap-1.5 font-bold mb-1 text-emerald-900">
        <i data-lucide="utensils" class="w-4 h-4 text-emerald-700"></i>
        <span>Local Culinary Tradition (നാട്ടുവിശേഷം):</span>
      </div>
      <div>${dossier.traditionDish}</div>
    </div>

    <!-- Actions -->
    <div class="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2">
      <a href="${gmapsLink}" target="_blank" rel="noopener noreferrer" class="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all">
        <i data-lucide="navigation" class="w-3.5 h-3.5"></i>
        <span>Directions to Mandi on Maps</span>
      </a>
      <button onclick="jumpToVillageVendors('${loc.townFilterId}', 'kasaragod'); closeVillageLogisticsModal();" class="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all">
        <i data-lucide="store" class="w-3.5 h-3.5 text-amber-300"></i>
        <span>View Local Shops &amp; Crews</span>
      </button>
      <button onclick="jumpToRegionalHalls('${loc.hallRegionId}', 'kasaragod'); closeVillageLogisticsModal();" class="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all">
        <i data-lucide="landmark" class="w-3.5 h-3.5"></i>
        <span>View Nearby Halls</span>
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeVillageLogisticsModal() {
  const modal = document.getElementById('villageLogisticsModal');
  if (modal) modal.classList.add('hidden');
}

function openKasaragodEmergencyModal() {
  const modal = document.getElementById('kasaragodEmergencyModal');
  const body = document.getElementById('kasaragodEmergencyModalBody');
  if (!modal || !body) return;

  const services = typeof KASARAGOD_EMERGENCY_SERVICES !== 'undefined' ? KASARAGOD_EMERGENCY_SERVICES : [];

  body.innerHTML = `
    <div class="text-xs text-slate-600 mb-2">
      On the wedding day, unexpected shortages of cooking gas, meat ice, or electricity can disrupt the feast. Tap any verified Kasaragod helpline below for fast-dispatch rescue:
    </div>

    <div class="space-y-4">
      ${services.map(s => `
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div class="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <i data-lucide="${s.icon || 'phone'}" class="w-4 h-4"></i>
              </span>
              <h4 class="text-sm font-extrabold text-slate-900">${s.category}</h4>
            </div>
            <span class="text-[10px] font-bold text-slate-500">${s.note}</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            ${s.providers.map(p => `
              <div class="p-3 bg-white rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div class="text-xs font-bold text-slate-900">${p.name}</div>
                  <div class="text-[10px] text-slate-500 mt-0.5">${p.area}</div>
                </div>
                <div class="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                  <a href="tel:${p.phone.replace(/\s+/g, '')}" class="flex-1 py-1 px-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-[11px] flex items-center justify-center gap-1">
                    <i data-lucide="phone" class="w-3 h-3 text-amber-300"></i>
                    <span>Call Direct</span>
                  </a>
                  <a href="https://wa.me/${p.phone.replace(/\D/g, '')}?text=Hello!+We+need+urgent+wedding+day+service+support+in+Kasaragod" target="_blank" rel="noopener noreferrer" class="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-emerald-700" title="WhatsApp">
                    <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeKasaragodEmergencyModal() {
  const modal = document.getElementById('kasaragodEmergencyModal');
  if (modal) modal.classList.add('hidden');
}

function openKasaragodFeastModal() {
  const modal = document.getElementById('kasaragodFeastModal');
  if (!modal) return;
  const guests = state.budgetGuests || state.currentGuests || 600;
  renderKasaragodFeastModalBody(guests);
  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeKasaragodFeastModal() {
  const modal = document.getElementById('kasaragodFeastModal');
  if (modal) modal.classList.add('hidden');
}

function recalculateKasaragodFeast(val) {
  const guests = Math.max(50, parseInt(val, 10) || 600);
  renderKasaragodFeastModalBody(guests);
}

function renderKasaragodFeastModalBody(guests) {
  const body = document.getElementById('kasaragodFeastModalBody');
  if (!body) return;

  const data = typeof KASARAGOD_TRADITIONAL_FEAST_DATA !== 'undefined'
    ? KASARAGOD_TRADITIONAL_FEAST_DATA
    : null;

  if (!data) return;

  const multiplier = guests / 100;

  const calculatedItems = data.per100Guests.map(item => {
    const qty = Math.round(item.quantity * multiplier * 10) / 10;
    const cost = Math.round(qty * item.estRate);
    return {
      ...item,
      qty: qty,
      cost: cost
    };
  });

  const totalProvisionsCost = calculatedItems.reduce((sum, i) => sum + i.cost, 0);

  body.innerHTML = `
    <!-- Guest Count Controller -->
    <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div class="text-[10px] font-extrabold uppercase tracking-wider text-amber-900">Customized for Your Wedding Scale</div>
        <div class="text-sm font-black text-slate-900 mt-0.5">${data.recipeName}</div>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xs font-bold text-slate-700 whitespace-nowrap">Guests (ആളുകൾ):</label>
        <input type="number" min="50" max="10000" step="50" value="${guests}" oninput="recalculateKasaragodFeast(this.value)" class="w-24 px-3 py-1.5 rounded-xl border border-amber-300 font-black text-sm text-slate-900 bg-white focus:ring-2 focus:ring-emerald-600 outline-none">
        <div class="flex gap-1">
          <button onclick="recalculateKasaragodFeast(300)" class="px-2 py-1 rounded-lg ${guests === 300 ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700 border border-slate-200'} text-xs font-bold">300</button>
          <button onclick="recalculateKasaragodFeast(600)" class="px-2 py-1 rounded-lg ${guests === 600 ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700 border border-slate-200'} text-xs font-bold">600</button>
          <button onclick="recalculateKasaragodFeast(1000)" class="px-2 py-1 rounded-lg ${guests === 1000 ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700 border border-slate-200'} text-xs font-bold">1,000</button>
        </div>
      </div>
    </div>

    <!-- Calculated Ingredients Table -->
    <div class="overflow-x-auto rounded-xl border border-slate-200">
      <table class="w-full text-left text-xs border-collapse">
        <thead class="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200">
          <tr>
            <th class="p-2.5">Key Ingredient (വിഭവങ്ങൾ)</th>
            <th class="p-2.5 text-right">Required Quantity</th>
            <th class="p-2.5 text-right">Wholesale Rate</th>
            <th class="p-2.5 text-right">Est. Cost</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
          ${calculatedItems.map(i => `
            <tr class="hover:bg-slate-50">
              <td class="p-2.5 font-bold text-slate-900">${i.item}</td>
              <td class="p-2.5 text-right font-extrabold text-emerald-900">${i.qty} ${i.unit}</td>
              <td class="p-2.5 text-right text-slate-500">₹${i.estRate}/${i.unit}</td>
              <td class="p-2.5 text-right font-black text-slate-900">₹${i.cost.toLocaleString('en-IN')}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot class="bg-amber-50/80 font-black text-slate-950 border-t border-amber-200">
          <tr>
            <td colspan="3" class="p-2.5 text-right uppercase text-[11px] text-amber-950">Total Est. Raw Provisions for ${guests} Guests:</td>
            <td class="p-2.5 text-right text-sm text-emerald-950 font-extrabold">₹${totalProvisionsCost.toLocaleString('en-IN')}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Evening Reception Sweets -->
    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
      <div class="flex items-center justify-between text-xs font-extrabold text-slate-900">
        <span>Traditional Evening Reception Sweets (മൈലാഞ്ചി സൽക്കാരം)</span>
        <span class="text-[11px] text-slate-500">Kasaragod Signature Dishes</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        ${data.eveningSnacks.map(s => `
          <div class="p-2.5 rounded-xl bg-white border border-slate-200">
            <div class="font-bold text-slate-900">${s.name}</div>
            <div class="text-[11px] text-emerald-800 font-extrabold mt-0.5">${s.portionPerGuest}</div>
            <div class="text-[10px] text-slate-400">~₹${s.estCostPerPiece}/pc</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Cultural Timeline -->
    <div class="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
      <div class="text-xs font-extrabold text-slate-900 mb-2">Authentic Kasaragod Wedding Event Flow (സമയക്രമം):</div>
      <div class="space-y-1.5 text-xs text-slate-600">
        ${data.culturalTimeline.map(t => `
          <div class="flex items-start gap-2 p-2 rounded-lg bg-slate-50">
            <span class="font-extrabold text-emerald-900 shrink-0 min-w-[140px] text-[11px]">${t.time}</span>
            <div>
              <strong class="text-slate-900">${t.event}:</strong> ${t.note}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- One-Click Export to Sourcing Sheet -->
    <div class="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
      <div class="text-xs text-slate-500 font-medium">Adds all ${calculatedItems.length} core raw commodities directly to your interactive sourcing sheet.</div>
      <button onclick="addKasaragodFeastToSheet(${guests})" class="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shrink-0 transition-all">
        <i data-lucide="plus-circle" class="w-4 h-4"></i>
        <span>Add ${guests} Guest Feast to Sourcing Sheet</span>
      </button>
    </div>
  `;

  lucide.createIcons();
}

function addKasaragodFeastToSheet(guestCount) {
  const data = typeof KASARAGOD_TRADITIONAL_FEAST_DATA !== 'undefined' ? KASARAGOD_TRADITIONAL_FEAST_DATA : null;
  if (!data) return;

  const multiplier = (guestCount || 600) / 100;

  data.per100Guests.forEach(item => {
    const qty = Math.round(item.quantity * multiplier * 10) / 10;
    const cost = Math.round(qty * item.estRate);
    addItemToProcurementSheet(
      item.item + ' (' + guestCount + ' guests batch)',
      qty,
      item.unit,
      cost,
      'Kasaragod Feast Provisions'
    );
  });

  alert('Added ' + data.per100Guests.length + ' traditional Kasaragod feast ingredients for ' + guestCount + ' guests to your Sourcing Sheet!');
  closeKasaragodFeastModal();
}


// -------------------------------------------------------------
// 20. Section Router, Menu Bar Navigation & Classified Food / Goods Views
// -------------------------------------------------------------
const SECTION_ALIAS_MAP = {
  home: 'home',
  hero: 'home',
  'home-overview-directory': 'home',
  food: 'food',
  'classified-food-catalog': 'food',
  calculator: 'food',
  'wholesale-vegetables': 'food',
  goods: 'goods',
  'classified-goods-catalog': 'goods',
  'utensils-buy-rent': 'goods',
  'rentals-prep': 'goods',
  people: 'people',
  'vendor-directory': 'people',
  'kasaragodTownFilterBar': 'people',
  'liveLocationAnalysisCard': 'people',
  halls: 'halls',
  'auditorium-estimator': 'halls',
  'kasaragod-wedding-halls': 'halls',
  'kasaragod-halls-section': 'halls',
  planners: 'planners',
  'budget-optimizer': 'planners',
  'wedding-timeline': 'planners',
  'food-rescue': 'planners',
  kasaragod: 'kasaragod',
  'kasaragod-hub': 'kasaragod',
  'kasaragod-village-finder': 'kasaragod'
};

function navigateToSection(sectionKey, targetElementId) {
  const resolved = SECTION_ALIAS_MAP[sectionKey] || 'home';
  state.activeSection = resolved;

  if (state.fullPageView) {
    document.querySelectorAll('.app-section-view').forEach(el => el.classList.remove('hidden'));
  } else {
    document.querySelectorAll('.app-section-view').forEach(el => {
      if (el.getAttribute('data-section') === resolved) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    const navKey = btn.getAttribute('data-nav');
    const isActive = navKey === resolved;
    const isMobile = btn.closest('#mobileMenuBar') !== null;

    if (isMobile) {
      btn.className = isActive
        ? 'nav-tab-btn px-3 py-1.5 rounded-lg text-xs font-extrabold bg-emerald-800 text-white shadow-sm shrink-0'
        : navKey === 'kasaragod'
          ? 'nav-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-950 border border-amber-300 shrink-0'
          : 'nav-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-700 border border-slate-200 shrink-0';
    } else {
      btn.className = isActive
        ? 'nav-tab-btn px-3 py-2 rounded-xl bg-emerald-800 text-white shadow-sm transition-all flex items-center gap-1.5'
        : navKey === 'kasaragod'
          ? 'nav-tab-btn px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 transition-all flex items-center gap-1.5'
          : 'nav-tab-btn px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-all flex items-center gap-1.5';
    }
  });

  const targetHash = '#' + (targetElementId || resolved);
  if (window.location.hash !== targetHash && typeof history !== 'undefined' && history.replaceState) {
    try { history.replaceState(null, '', targetHash); } catch (_) {}
  }

  if (targetElementId) {
    const el = document.getElementById(targetElementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (typeof window.scrollTo === 'function') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  lucide.createIcons();
}

function toggleFullPageView() {
  state.fullPageView = !state.fullPageView;
  const btn = document.getElementById('btnToggleViewMode');
  if (btn) {
    btn.innerText = state.fullPageView ? 'Tabbed Section View' : 'View All Sections';
  }
  navigateToSection(state.activeSection || 'home');
}

function handleInitialHashNavigation() {
  const hash = (window.location.hash || '').replace(/^#/, '').trim();
  if (!hash) {
    navigateToSection('home');
    return;
  }
  const targetSection = SECTION_ALIAS_MAP[hash];
  if (targetSection) {
    const isSpecificSubElement = hash !== targetSection;
    navigateToSection(targetSection, isSpecificSubElement ? hash : null);
  }
}

function syncHallGuestCount(val) {
  const guests = Math.max(100, parseInt(val, 10) || 600);
  state.budgetGuests = guests;
  const budgetGuestEl = document.getElementById('budgetInputGuests');
  if (budgetGuestEl) budgetGuestEl.value = guests;
  updateAuditoriumCapacity();
}

// Classified Food Items Controllers
function setFoodClassFilter(classId) {
  state.foodClassFilter = classId;
  document.querySelectorAll('.food-class-pill').forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    const isActive = onclickAttr.includes(`'${classId}'`);
    btn.className = isActive
      ? 'food-class-pill px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-800 text-white transition-all'
      : 'food-class-pill px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all';
  });
  renderClassifiedFoodGrid();
}

function filterClassifiedFood(query) {
  state.classifiedFoodSearchQuery = (query || '').toLowerCase().trim();
  renderClassifiedFoodGrid();
}

function findSellersForCategory(vendorCat) {
  setCategoryFilter(vendorCat || 'all');
  navigateToSection('people', 'vendor-directory');
}

function renderClassifiedFoodGrid() {
  const grid = document.getElementById('classifiedFoodGrid');
  if (!grid || typeof FOOD_ITEMS_CLASSIFIED === 'undefined') return;

  let items = FOOD_ITEMS_CLASSIFIED;
  if (state.foodClassFilter && state.foodClassFilter !== 'all') {
    items = items.filter(i => i.classId === state.foodClassFilter);
  }
  if (state.classifiedFoodSearchQuery) {
    const q = state.classifiedFoodSearchQuery;
    items = items.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.className.toLowerCase().includes(q) ||
      i.note.toLowerCase().includes(q)
    );
  }

  if (items.length === 0) {
    grid.innerHTML = `<div class="col-span-full py-10 text-center text-xs text-slate-500">No food items matched "${state.classifiedFoodSearchQuery}".</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 shadow-sm flex flex-col justify-between transition-all">
      <div>
        <div class="flex items-center justify-between gap-1 mb-2">
          <span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">${item.className}</span>
          <span class="text-xs font-black text-emerald-900">₹${item.rate}/${item.unit}</span>
        </div>
        <h4 class="text-sm font-extrabold text-slate-900 leading-snug">${item.name}</h4>
        <div class="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1">
          <div class="font-bold text-slate-800">${item.bulkPack}</div>
          <div class="text-slate-400">Retail MRP: <span class="line-through">₹${item.mrp}/${item.unit}</span></div>
        </div>
        <p class="text-[11px] text-slate-500 mt-2 leading-relaxed">${item.note}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-100 space-y-2">
        <button onclick="addItemToProcurementSheet('${item.name.replace(/'/g, "\\'")}', 1, 'Bulk Lot', ${Math.round(item.rate * 10)}, 'Classified Food')" class="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-sm">
          <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Add Sample Lot to Sheet
        </button>
        <button onclick="findSellersForCategory('${item.vendorCategory}')" class="w-full py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1">
          <i data-lucide="store" class="w-3.5 h-3.5 text-amber-300"></i> Find Wholesale Sellers →
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// Classified Goods Controllers
function setGoodsClassFilter(classId) {
  state.goodsClassFilter = classId;
  document.querySelectorAll('.goods-class-pill').forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    const isActive = onclickAttr.includes(`'${classId}'`);
    btn.className = isActive
      ? 'goods-class-pill px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-800 text-white transition-all'
      : 'goods-class-pill px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all';
  });
  renderClassifiedGoodsGrid();
}

function filterClassifiedGoods(query) {
  state.classifiedGoodsSearchQuery = (query || '').toLowerCase().trim();
  renderClassifiedGoodsGrid();
}

function renderClassifiedGoodsGrid() {
  const grid = document.getElementById('classifiedGoodsGrid');
  if (!grid || typeof GOODS_CLASSIFIED_CATALOG === 'undefined') return;

  let items = GOODS_CLASSIFIED_CATALOG;
  if (state.goodsClassFilter && state.goodsClassFilter !== 'all') {
    items = items.filter(i => i.classId === state.goodsClassFilter);
  }
  if (state.classifiedGoodsSearchQuery) {
    const q = state.classifiedGoodsSearchQuery;
    items = items.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.className.toLowerCase().includes(q) ||
      i.note.toLowerCase().includes(q)
    );
  }

  if (items.length === 0) {
    grid.innerHTML = `<div class="col-span-full py-10 text-center text-xs text-slate-500">No wedding goods matched "${state.classifiedGoodsSearchQuery}".</div>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-500 shadow-sm flex flex-col justify-between transition-all">
      <div>
        <span class="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 mb-2">${item.className}</span>
        <h4 class="text-sm font-extrabold text-slate-900 leading-snug">${item.name}</h4>
        <div class="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div class="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span class="text-[10px] font-bold text-emerald-800 block uppercase">1-Day Rental</span>
            <strong class="text-emerald-950 font-black">${item.rentRate}</strong>
          </div>
          <div class="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
            <span class="text-[10px] font-bold text-amber-800 block uppercase">Wholesale Buy</span>
            <strong class="text-amber-950 font-black">${item.buyRate}</strong>
          </div>
        </div>
        <p class="text-[11px] text-slate-500 mt-2.5 leading-relaxed">${item.note}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button onclick="addItemToProcurementSheet('${item.name.replace(/'/g, "\\'")}', 1, 'Rental/Lot Est.', ${item.rentNum}, 'Wedding Goods')" class="flex-1 py-2 px-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1">
          <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Add to Sheet
        </button>
        <button onclick="findSellersForCategory('${item.category}')" class="flex-1 py-2 px-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-1">
          <i data-lucide="users" class="w-3.5 h-3.5 text-amber-300"></i> Suppliers →
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}
