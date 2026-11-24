/**
 * VYAPAR SHIKSHA - 12 FUNCTIONAL HALAL TRADING TOOLS ENGINE
 * Comprehensive Interactive Business Diagnostics, Calculators, Ledgers, and Generators
 * 
 * 1. Business Matchmaker
 * 2. Starting Capital Planner
 * 3. Wholesale-to-Retail Profit Calculator
 * 4. Break-Even Calculator
 * 5. Inventory Risk Calculator
 * 6. Expense Tracker
 * 7. Stock Management Dashboard
 * 8. Business Plan Generator
 * 9. Ethical Negotiation Assistant
 * 10. Halal Trading Eligibility Checklist
 * 11. Supplier Comparison Tool
 * 12. Printable Sales and Purchase Ledger
 */

const tradingTools = {
  activeTool: 'matchmaker',

  // Tool 1: Matchmaker State
  matchmaker: {
    capital: 'starter',
    time: 'part_time',
    storage: 'room_shelf',
    channel: 'whatsapp_social',
    perishability: 'zero_perishability'
  },

  // Tool 2: Capital Planner State
  planner: {
    budget: 5000,
    category: 'attar',
    split: { inventory: 60, packaging: 12, logistics: 15, reserve: 8, marketing: 5 }
  },

  // Tool 3: Profit Calculator State
  profitCalc: {
    wholesaleCost: 75,
    freightPerUnit: 12,
    packPerUnit: 8,
    spoilagePct: 3,
    retailPrice: 199,
    batchUnits: 40
  },

  // Tool 4: Break-Even State
  breakEven: {
    fixedCosts: 1800,
    retailPrice: 220,
    variableCost: 110,
    dailySalesTarget: 3
  },

  // Tool 5: Inventory Risk State
  riskCalc: {
    shelfLifeMonths: 12,
    storageSensitivity: 'ambient',
    seasonalVariation: 'moderate',
    turnoverTargetDays: 20
  },

  // Tool 6: Expense Tracker State
  expenses: [],

  // Tool 7: Stock Management State
  stock: [],

  // Tool 8: Plan Generator State
  planForm: {
    brandName: 'Al-Barakah Trading',
    faculty: 'attar',
    capital: 5000,
    targetCity: 'Kollam',
    primaryChannel: 'WhatsApp Business & Community Direct'
  },

  // Tool 9: Negotiation Assistant State
  negotiation: {
    scenario: 'inquiry',
    supplierName: 'Haji Traders',
    productName: 'White Musk 6ml Attar',
    quantity: 50,
    targetPrice: 45
  },

  // Tool 10: Halal Checklist State
  halalChecklist: {
    q1: true, q2: true, q3: true, q4: true, q5: true,
    q6: true, q7: true, q8: true, q9: true, q10: true
  },

  // Tool 11: Supplier Comparison State
  suppliersList: [
    { name: 'Supplier A (State Co-op)', unitPrice: 180, moq: 20, freight: 250, leadTime: 3, verified: true, returnPolicy: 'Full Replacement' },
    { name: 'Supplier B (Local Wholesale Mandi)', unitPrice: 165, moq: 50, freight: 150, leadTime: 1, verified: true, returnPolicy: 'Transit Only' },
    { name: 'Supplier C (Private Distributor)', unitPrice: 155, moq: 100, freight: 400, leadTime: 6, verified: false, returnPolicy: 'No Returns' }
  ],

  // Tool 12: Ledger State
  ledger: [],

  init() {
    this.loadPersistedData();
    this.render();
  },

  loadPersistedData() {
    try {
      const savedExpenses = localStorage.getItem('vyapar_expenses');
      if (savedExpenses) {
        this.expenses = JSON.parse(savedExpenses);
      } else {
        // Seed realistic starter expenses
        this.expenses = [
          { id: 1, date: '2026-11-20', category: 'Inventory', amount: 3000, notes: 'Wholesale batch order (40 units)' },
          { id: 2, date: '2026-11-21', category: 'Freight', amount: 350, notes: 'KSRTC Swift Cargo parcel charges' },
          { id: 3, date: '2026-11-22', category: 'Packaging', amount: 480, notes: '50 velvet pouches & labels' },
          { id: 4, date: '2026-11-23', category: 'Marketing', amount: 150, notes: '3 sample giveaway testers' }
        ];
      }

      const savedStock = localStorage.getItem('vyapar_stock');
      if (savedStock) {
        this.stock = JSON.parse(savedStock);
      } else {
        // Seed realistic starter SKUs
        this.stock = [
          { sku: 'AT-MUSK-6ML', name: 'White Musk Roll-on (6ml)', category: 'Attar', cost: 58, inStock: 32, sold: 18 },
          { sku: 'CS-W240-250G', name: 'Kollam Cashews W240 (250g)', category: 'Food', cost: 175, inStock: 4, sold: 16 },
          { sku: 'HIJ-CHIF-01', name: 'Korean Chiffon Hijab (Olive)', category: 'Modest Wear', cost: 85, inStock: 15, sold: 15 },
          { sku: 'SP-PEPPER-100G', name: 'Malabar Garbled Pepper (100g)', category: 'Spices', cost: 65, inStock: 25, sold: 10 }
        ];
      }

      const savedLedger = localStorage.getItem('vyapar_ledger');
      if (savedLedger) {
        this.ledger = JSON.parse(savedLedger);
      } else {
        // Seed realistic starter transactions
        this.ledger = [
          { id: 1, date: '2026-11-20', desc: 'Opening Capital Deposit', type: 'inflow', amount: 5000 },
          { id: 2, date: '2026-11-21', desc: 'Initial Wholesale Inventory Purchase', type: 'outflow', amount: 3000 },
          { id: 3, date: '2026-11-21', desc: 'Packaging & Labels Order', type: 'outflow', amount: 480 },
          { id: 4, date: '2026-11-22', desc: 'Parcel Freight Fee', type: 'outflow', amount: 350 },
          { id: 5, date: '2026-11-23', desc: 'Sale: 5x Attar Bottles (Cash)', type: 'inflow', amount: 900 },
          { id: 6, date: '2026-11-24', desc: 'Sale: 4x Cashew Pouches (UPI)', type: 'inflow', amount: 1040 }
        ];
      }
    } catch (e) {
      console.warn('Error loading persisted tool data', e);
    }
  },

  selectTool(toolId) {
    this.activeTool = toolId;
    document.querySelectorAll('.tool-nav-card').forEach(card => {
      card.classList.toggle('active', card.getAttribute('data-tool') === toolId);
    });
    this.renderToolPane();
  },

  render() {
    const container = document.getElementById('toolsDynamicContainer');
    if (!container) return;

    const lang = (window.app && window.app.currentLang) || 'en';

    container.innerHTML = `
      <div class="tools-hub-container">
        <div class="tools-hub-header">
          <span class="kerala-official-badge">
            <i class="fa-solid fa-calculator"></i> 12 Functional Halal Trading Tools
          </span>
          <h2 class="section-title" style="margin-top: 10px;">
            ${lang === 'ml' ? 'വ്യാപാര കണക്കുകൂട്ടലുകൾ & മാനേജ്‌മെന്റ് ടൂളുകൾ' : 'Commercial Planning & Management Suite'}
          </h2>
          <p class="section-subtitle">
            ${lang === 'ml' 
              ? 'വ്യാജ കണക്കുകളോ പലിശയോ ഇല്ലാതെ, യഥാർത്ഥ ചിലവുകളും വേസ്റ്റേജും കണക്കുകൂട്ടി ബിസിനസ്സ് സുരക്ഷിതമായി നടത്താനുള്ള 12 ഇന്ററാക്ടീവ് ടൂളുകൾ.' 
              : 'Every tool is fully interactive with zero fake buttons. Includes transportation, packaging, spoilage allowance, and ledger tracking.'}
          </p>
        </div>

        <!-- 12 Tools Navigation Grid -->
        <div class="tools-grid-selector">
          <div class="tool-nav-card ${this.activeTool === 'matchmaker' ? 'active' : ''}" data-tool="matchmaker" onclick="tradingTools.selectTool('matchmaker')">
            <div class="tool-nav-icon"><i class="fa-solid fa-compass"></i></div>
            <div class="tool-nav-text"><strong>1. Business Matchmaker</strong><small>Diagnostic Quiz</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'planner' ? 'active' : ''}" data-tool="planner" onclick="tradingTools.selectTool('planner')">
            <div class="tool-nav-icon"><i class="fa-solid fa-coins"></i></div>
            <div class="tool-nav-text"><strong>2. Capital Planner</strong><small>Itemized Budget</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'profit' ? 'active' : ''}" data-tool="profit" onclick="tradingTools.selectTool('profit')">
            <div class="tool-nav-icon"><i class="fa-solid fa-chart-line"></i></div>
            <div class="tool-nav-text"><strong>3. Profit Calculator</strong><small>Wholesale to Retail</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'breakeven' ? 'active' : ''}" data-tool="breakeven" onclick="tradingTools.selectTool('breakeven')">
            <div class="tool-nav-icon"><i class="fa-solid fa-scale-balanced"></i></div>
            <div class="tool-nav-text"><strong>4. Break-Even Tool</strong><small>Volume to Profit</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'risk' ? 'active' : ''}" data-tool="risk" onclick="tradingTools.selectTool('risk')">
            <div class="tool-nav-icon"><i class="fa-solid fa-shield-virus"></i></div>
            <div class="tool-nav-text"><strong>5. Inventory Risk</strong><small>Spoilage Index</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'expenses' ? 'active' : ''}" data-tool="expenses" onclick="tradingTools.selectTool('expenses')">
            <div class="tool-nav-icon"><i class="fa-solid fa-receipt"></i></div>
            <div class="tool-nav-text"><strong>6. Expense Tracker</strong><small>Running Expenses</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'stock' ? 'active' : ''}" data-tool="stock" onclick="tradingTools.selectTool('stock')">
            <div class="tool-nav-icon"><i class="fa-solid fa-boxes-stacked"></i></div>
            <div class="tool-nav-text"><strong>7. Stock Manager</strong><small>SKUs & Reorder</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'plan' ? 'active' : ''}" data-tool="plan" onclick="tradingTools.selectTool('plan')">
            <div class="tool-nav-icon"><i class="fa-solid fa-file-contract"></i></div>
            <div class="tool-nav-text"><strong>8. Business Plan</strong><small>Printable 1-Pager</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'negotiation' ? 'active' : ''}" data-tool="negotiation" onclick="tradingTools.selectTool('negotiation')">
            <div class="tool-nav-icon"><i class="fa-solid fa-comments-dollar"></i></div>
            <div class="tool-nav-text"><strong>9. Negotiation Script</strong><small>WhatsApp Dialogue</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'halal' ? 'active' : ''}" data-tool="halal" onclick="tradingTools.selectTool('halal')">
            <div class="tool-nav-icon"><i class="fa-solid fa-stamp"></i></div>
            <div class="tool-nav-text"><strong>10. Halal Checklist</strong><small>10 Shariah Tests</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'suppliers' ? 'active' : ''}" data-tool="suppliers" onclick="tradingTools.selectTool('suppliers')">
            <div class="tool-nav-icon"><i class="fa-solid fa-code-compare"></i></div>
            <div class="tool-nav-text"><strong>11. Supplier Compare</strong><small>Side-by-Side Matrix</small></div>
          </div>
          <div class="tool-nav-card ${this.activeTool === 'ledger' ? 'active' : ''}" data-tool="ledger" onclick="tradingTools.selectTool('ledger')">
            <div class="tool-nav-icon"><i class="fa-solid fa-book-journal-whills"></i></div>
            <div class="tool-nav-text"><strong>12. Cash Ledger</strong><small>Sales & Purchases</small></div>
          </div>
        </div>

        <!-- Interactive Tool Display Stage -->
        <div class="interactive-tool-pane" id="activeToolPane">
          <!-- Rendered dynamically -->
        </div>

        <!-- Mandatory Halal Earnings Transparency Disclaimer -->
        <div class="earnings-disclaimer-box">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.2rem; flex-shrink: 0; margin-top: 2px;"></i>
          <div>
            <strong>Shariah Ethical Disclosure & Earnings Reality Check:</strong>
            Vyapar Shiksha does not guarantee fixed earnings, effortless profits, or passive wealth. Physical trade involves market risk, customer negotiation, and actual inventory handling (*Qabd*). Profit figures shown above are mathematical calculations based on entered cost variables and do not constitute a financial guarantee.
          </div>
        </div>
      </div>
    `;

    this.renderToolPane();
  },

  renderToolPane() {
    const pane = document.getElementById('activeToolPane');
    if (!pane) return;

    switch (this.activeTool) {
      case 'matchmaker':  pane.innerHTML = this.getMatchmakerHtml(); break;
      case 'planner':     pane.innerHTML = this.getPlannerHtml(); break;
      case 'profit':      pane.innerHTML = this.getProfitCalcHtml(); break;
      case 'breakeven':   pane.innerHTML = this.getBreakEvenHtml(); break;
      case 'risk':        pane.innerHTML = this.getRiskCalcHtml(); break;
      case 'expenses':    pane.innerHTML = this.getExpensesHtml(); break;
      case 'stock':       pane.innerHTML = this.getStockHtml(); break;
      case 'plan':        pane.innerHTML = this.getPlanGeneratorHtml(); break;
      case 'negotiation': pane.innerHTML = this.getNegotiationHtml(); break;
      case 'halal':       pane.innerHTML = this.getHalalChecklistHtml(); break;
      case 'suppliers':   pane.innerHTML = this.getSupplierCompareHtml(); break;
      case 'ledger':      pane.innerHTML = this.getLedgerHtml(); break;
      default:            pane.innerHTML = this.getMatchmakerHtml();
    }
  },

  // =========================================================================
  // TOOL 1: BUSINESS MATCHMAKER
  // =========================================================================
  getMatchmakerHtml() {
    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-compass text-success"></i> Business Matchmaker Diagnostic Tool</h3>
          <p>Answer 5 practical questions about your real situation to discover which halal trading academies match you best.</p>
        </div>
      </div>

      <div class="quiz-questions-grid" style="margin-bottom: 24px;">
        <div class="quiz-step-card">
          <span class="quiz-num">1</span>
          <h4>Available Starting Capital</h4>
          <select class="form-control" onchange="tradingTools.matchmaker.capital = this.value; tradingTools.runMatchmaker();">
            <option value="micro" ${this.matchmaker.capital === 'micro' ? 'selected' : ''}>Micro-Pilot (< ₹2,500)</option>
            <option value="starter" ${this.matchmaker.capital === 'starter' ? 'selected' : ''} selected>Growth Starter (₹2,500 - ₹5,000)</option>
            <option value="hub" ${this.matchmaker.capital === 'hub' ? 'selected' : ''}>Inventory Hub (₹5,000 - ₹10,000)</option>
          </select>
        </div>

        <div class="quiz-step-card">
          <span class="quiz-num">2</span>
          <h4>Daily Available Time</h4>
          <select class="form-control" onchange="tradingTools.matchmaker.time = this.value; tradingTools.runMatchmaker();">
            <option value="part_time" ${this.matchmaker.time === 'part_time' ? 'selected' : ''}>1-2 hours daily (Part-time / Student)</option>
            <option value="full_time" ${this.matchmaker.time === 'full_time' ? 'selected' : ''}>Full Day (Dedicated Home Business)</option>
          </select>
        </div>

        <div class="quiz-step-card">
          <span class="quiz-num">3</span>
          <h4>Available Storage Space</h4>
          <select class="form-control" onchange="tradingTools.matchmaker.storage = this.value; tradingTools.runMatchmaker();">
            <option value="zero_storage" ${this.matchmaker.storage === 'zero_storage' ? 'selected' : ''}>Table Drawer / Handbag (Jewelry / Attar)</option>
            <option value="room_shelf" ${this.matchmaker.storage === 'room_shelf' ? 'selected' : ''} selected>Single Room Shelf (Dry Foods, Stoles)</option>
            <option value="small_room" ${this.matchmaker.storage === 'small_room' ? 'selected' : ''}>Corner of Room (Totes, Cookware)</option>
          </select>
        </div>

        <div class="quiz-step-card">
          <span class="quiz-num">4</span>
          <h4>Preferred Sales Channel</h4>
          <select class="form-control" onchange="tradingTools.matchmaker.channel = this.value; tradingTools.runMatchmaker();">
            <option value="whatsapp_social" ${this.matchmaker.channel === 'whatsapp_social' ? 'selected' : ''} selected>WhatsApp Business & Direct Network</option>
            <option value="local_retail_b2b" ${this.matchmaker.channel === 'local_retail_b2b' ? 'selected' : ''}>B2B Supply to Local Bakeries & Fancy Stores</option>
            <option value="flea_community" ${this.matchmaker.channel === 'flea_community' ? 'selected' : ''}>Community Market & Pop-up Kiosks</option>
          </select>
        </div>

        <div class="quiz-step-card">
          <span class="quiz-num">5</span>
          <h4>Product Perishability Preference</h4>
          <select class="form-control" onchange="tradingTools.matchmaker.perishability = this.value; tradingTools.runMatchmaker();">
            <option value="zero_perishability" ${this.matchmaker.perishability === 'zero_perishability' ? 'selected' : ''} selected>Zero Perishability (Attar, Textiles, Bags)</option>
            <option value="sealed_long_life" ${this.matchmaker.perishability === 'sealed_long_life' ? 'selected' : ''}>Sealed Dry Goods (Cashews, Spices, Honey)</option>
          </select>
        </div>
      </div>

      <div id="matchmakerResultBox">
        ${this.getMatchmakerResultHtml()}
      </div>
    `;
  },

  runMatchmaker() {
    const box = document.getElementById('matchmakerResultBox');
    if (box) box.innerHTML = this.getMatchmakerResultHtml();
  },

  getMatchmakerResultHtml() {
    const m = this.matchmaker;
    let recs = [];

    if (m.storage === 'zero_storage' || m.perishability === 'zero_perishability') {
      recs.push({
        id: 'attar',
        title: 'Attar & Artisanal Perfume Oils',
        matchScore: '98% Match',
        budget: '₹2,500 - ₹3,500',
        margin: '120% - 200%',
        storage: 'Single Drawer',
        desc: 'Zero expiry, compact size, high margins, ideal for WhatsApp catalogue sales.'
      });
      recs.push({
        id: 'accessories',
        title: 'Anti-Tarnish Stainless Steel Jewelry',
        matchScore: '94% Match',
        budget: '₹2,000 - ₹3,500',
        margin: '100% - 250%',
        storage: 'Pouches / Box',
        desc: 'Waterproof PVD coating, zero sizing hassle, huge gift demand.'
      });
    }

    if (m.channel === 'local_retail_b2b' || m.perishability === 'sealed_long_life') {
      recs.push({
        id: 'spices',
        title: 'Graded Kerala Cashews & Foothill Spices',
        matchScore: '96% Match',
        budget: '₹3,000 - ₹5,000',
        margin: '35% - 48%',
        storage: 'Airtight Jars',
        desc: 'Rapid weekly turnover, daily household essential, direct B2B grocery supply.'
      });
    }

    if (recs.length < 3) {
      recs.push({
        id: 'clothing',
        title: 'Korean Chiffon Hijabs & Modest Stoles',
        matchScore: '92% Match',
        budget: '₹2,800 - ₹4,500',
        margin: '60% - 100%',
        storage: 'Closet Shelf',
        desc: 'Consistent festive and daily wear demand with zero sizing complexity.'
      });
    }

    return `
      <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 24px;">
        <h4 style="margin: 0 0 16px; color: var(--text-main); font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-wand-magic-sparkles text-success"></i> Your Top 3 Recommended Halal Trading Academies:
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${recs.slice(0, 3).map(r => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 18px; display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="background: var(--emerald-50); color: var(--emerald-800); border: 1px solid var(--emerald-500); font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px;">${r.matchScore}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">${r.budget}</span>
              </div>
              <h5 style="margin: 0 0 6px; font-size: 1rem; font-weight: 800; color: var(--text-main);">${r.title}</h5>
              <p style="margin: 0 0 12px; font-size: 0.82rem; color: var(--text-muted); line-height: 1.45;">${r.desc}</p>
              <div style="margin-top: auto; padding-top: 10px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--gold-600); font-weight: 700;"><i class="fa-solid fa-arrow-trend-up"></i> ${r.margin}</span>
                <button class="btn btn-sm btn-primary" onclick="app.openAcademy('${r.id}')">Start Course →</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // =========================================================================
  // TOOL 2: STARTING CAPITAL PLANNER
  // =========================================================================
  getPlannerHtml() {
    const b = this.planner.budget;
    const inv = Math.round(b * (this.planner.split.inventory / 100));
    const pack = Math.round(b * (this.planner.split.packaging / 100));
    const log = Math.round(b * (this.planner.split.logistics / 100));
    const res = Math.round(b * (this.planner.split.reserve / 100));
    const mkt = Math.round(b * (this.planner.split.marketing / 100));

    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-coins text-warning"></i> Starting Capital Allocation Planner</h3>
          <p>Safely divide your startup capital across inventory, packaging, freight, and emergency reserve buffer.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start;">
        <div>
          <div class="form-group" style="margin-bottom: 20px;">
            <label class="form-label" style="font-weight: 700;">Total Capital: <strong class="text-success" style="font-size: 1.2rem;">₹${b.toLocaleString('en-IN')}</strong></label>
            <input type="range" class="form-range" min="1000" max="10000" step="500" value="${b}" 
                   oninput="tradingTools.planner.budget = parseInt(this.value, 10); tradingTools.updatePlanner();">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
              <span>₹1,000 (Micro-Pilot)</span>
              <span>₹5,000 (Starter)</span>
              <span>₹10,000 (Max Limit)</span>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Product Faculty:</label>
            <select class="form-control" onchange="tradingTools.planner.category = this.value; tradingTools.updatePlanner();">
              <option value="attar">Attar & Perfume Oils</option>
              <option value="cashews">Kollam Graded Cashews</option>
              <option value="spices">Kerala Farm Spices</option>
              <option value="modest_wear">Modest Wear & Stoles</option>
              <option value="stationery">Stationery & Office Craft</option>
              <option value="household">Clay Cookware & Woodcraft</option>
            </select>
          </div>

          <div style="background: var(--bg-card-subtle); padding: 14px; border-radius: var(--radius-md); font-size: 0.82rem; color: var(--text-muted);">
            <strong style="color: var(--text-main);"><i class="fa-solid fa-shield-halved text-success"></i> Shariah Prudence Rule:</strong>
            Never deploy 100% of your money into goods without reserving at least 8% for parcel returns, damaged stock, or delayed customer cash collection.
          </div>
        </div>

        <div>
          <h4 style="margin: 0 0 14px; font-size: 1rem; color: var(--text-main);">Itemized Budget Breakdown:</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card-subtle); padding: 10px 14px; border-radius: 8px;">
              <span><i class="fa-solid fa-boxes-stacked text-primary"></i> 1. Product Inventory (60%)</span>
              <strong style="font-size: 1rem; color: var(--primary);">₹${inv.toLocaleString('en-IN')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card-subtle); padding: 10px 14px; border-radius: 8px;">
              <span><i class="fa-solid fa-box text-warning"></i> 2. Pouches & Custom Labels (12%)</span>
              <strong style="font-size: 1rem; color: var(--text-main);">₹${pack.toLocaleString('en-IN')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card-subtle); padding: 10px 14px; border-radius: 8px;">
              <span><i class="fa-solid fa-truck text-info"></i> 3. KSRTC / Courier Freight (15%)</span>
              <strong style="font-size: 1rem; color: var(--text-main);">₹${log.toLocaleString('en-IN')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card-subtle); padding: 10px 14px; border-radius: 8px;">
              <span><i class="fa-solid fa-shield-heart text-success"></i> 4. Emergency Buffer Reserve (8%)</span>
              <strong style="font-size: 1rem; color: var(--emerald-700);">₹${res.toLocaleString('en-IN')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card-subtle); padding: 10px 14px; border-radius: 8px;">
              <span><i class="fa-solid fa-bullhorn text-secondary"></i> 5. Samples & Marketing (5%)</span>
              <strong style="font-size: 1rem; color: var(--text-main);">₹${mkt.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  updatePlanner() {
    this.renderToolPane();
  },

  // =========================================================================
  // TOOL 3: WHOLESALE-TO-RETAIL PROFIT CALCULATOR
  // =========================================================================
  getProfitCalcHtml() {
    const p = this.profitCalc;
    const spoilagePerUnit = Math.round(p.wholesaleCost * (p.spoilagePct / 100) * 10) / 10;
    const landedCost = Math.round((p.wholesaleCost + p.freightPerUnit + p.packPerUnit + spoilagePerUnit) * 10) / 10;
    const unitGrossProfit = Math.round((p.retailPrice - landedCost) * 10) / 10;
    const marginPct = Math.round((unitGrossProfit / p.retailPrice) * 100);
    const markupPct = Math.round((unitGrossProfit / landedCost) * 100);
    const totalBatchInvestment = Math.round(landedCost * p.batchUnits);
    const totalBatchProfit = Math.round(unitGrossProfit * p.batchUnits);

    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-chart-line text-success"></i> Wholesale-to-Retail Profit Calculator</h3>
          <p>Computes true landed costs including packaging, freight, and damaged stock allowances.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start;">
        <div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div class="form-group">
              <label class="form-label">Wholesale Cost (₹):</label>
              <input type="number" class="form-control" value="${p.wholesaleCost}" 
                     oninput="tradingTools.profitCalc.wholesaleCost = parseFloat(this.value)||0; tradingTools.renderToolPane();">
            </div>
            <div class="form-group">
              <label class="form-label">Inward Freight (₹):</label>
              <input type="number" class="form-control" value="${p.freightPerUnit}" 
                     oninput="tradingTools.profitCalc.freightPerUnit = parseFloat(this.value)||0; tradingTools.renderToolPane();">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div class="form-group">
              <label class="form-label">Pouch / Box / Label (₹):</label>
              <input type="number" class="form-control" value="${p.packPerUnit}" 
                     oninput="tradingTools.profitCalc.packPerUnit = parseFloat(this.value)||0; tradingTools.renderToolPane();">
            </div>
            <div class="form-group">
              <label class="form-label">Spoilage / Defect (%):</label>
              <input type="number" class="form-control" value="${p.spoilagePct}" 
                     oninput="tradingTools.profitCalc.spoilagePct = parseFloat(this.value)||0; tradingTools.renderToolPane();">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
            <div class="form-group">
              <label class="form-label">Target Selling Price (₹):</label>
              <input type="number" class="form-control" value="${p.retailPrice}" 
                     oninput="tradingTools.profitCalc.retailPrice = parseFloat(this.value)||0; tradingTools.renderToolPane();">
            </div>
            <div class="form-group">
              <label class="form-label">Batch Units:</label>
              <input type="number" class="form-control" value="${p.batchUnits}" 
                     oninput="tradingTools.profitCalc.batchUnits = parseInt(this.value, 10)||1; tradingTools.renderToolPane();">
            </div>
          </div>
        </div>

        <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 20px;">
          <h4 style="margin: 0 0 14px; font-size: 1rem; color: var(--text-main);">Calculated Landed Unit Economics:</h4>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.88rem;">
            <span>True Landed Cost per Unit:</span>
            <strong>₹${landedCost.toFixed(2)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.88rem;">
            <span>Net Profit per Unit:</span>
            <strong class="text-success" style="font-size: 1.1rem;">₹${unitGrossProfit.toFixed(2)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.88rem;">
            <span>Profit Margin on Selling Price:</span>
            <strong style="color: var(--primary);">${marginPct}%</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 0.88rem;">
            <span>Markup on Landed Cost:</span>
            <strong style="color: var(--gold-600);">${markupPct}%</strong>
          </div>

          <div style="background: var(--bg-card); border-top: 2px dashed var(--border-light); padding-top: 12px; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.88rem;">
              <span>Total Batch Sourcing Cost:</span>
              <strong>₹${totalBatchInvestment.toLocaleString('en-IN')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1rem; font-weight: 800;">
              <span>Total Projected Batch Profit:</span>
              <span class="text-success" style="font-size: 1.25rem;">₹${totalBatchProfit.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // TOOL 4: BREAK-EVEN CALCULATOR
  // =========================================================================
  getBreakEvenHtml() {
    const b = this.breakEven;
    const unitContrib = b.retailPrice - b.variableCost;
    const breakEvenUnits = unitContrib > 0 ? Math.ceil(b.fixedCosts / unitContrib) : 0;
    const breakEvenRevenue = breakEvenUnits * b.retailPrice;
    const daysToBreakEven = Math.ceil(breakEvenUnits / (b.dailySalesTarget || 1));

    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-scale-balanced text-primary"></i> Break-Even Volume Calculator</h3>
          <p>Find out exactly how many units you must sell to recover your initial capital and start generating pure profit.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start;">
        <div>
          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label">Initial Fixed Startup Costs (₹):</label>
            <input type="number" class="form-control" value="${b.fixedCosts}" 
                   oninput="tradingTools.breakEven.fixedCosts = parseFloat(this.value)||0; tradingTools.renderToolPane();">
            <small style="color: var(--text-muted); font-size: 0.72rem;">Weighing scale, label printer, sample flyers, tape gun, initial setup</small>
          </div>

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label">Selling Price per Unit (₹):</label>
            <input type="number" class="form-control" value="${b.retailPrice}" 
                   oninput="tradingTools.breakEven.retailPrice = parseFloat(this.value)||0; tradingTools.renderToolPane();">
          </div>

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label">Variable Landed Cost per Unit (₹):</label>
            <input type="number" class="form-control" value="${b.variableCost}" 
                   oninput="tradingTools.breakEven.variableCost = parseFloat(this.value)||0; tradingTools.renderToolPane();">
          </div>

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label">Daily Sales Target (Units/Day):</label>
            <input type="number" class="form-control" value="${b.dailySalesTarget}" 
                   oninput="tradingTools.breakEven.dailySalesTarget = parseInt(this.value, 10)||1; tradingTools.renderToolPane();">
          </div>
        </div>

        <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 22px; text-align: center;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Contribution Margin per Unit:</span>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--text-main); margin: 4px 0 16px;">₹${unitContrib}</div>

          <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px;">
            <span style="font-size: 0.85rem; color: var(--text-muted);">Units to Break-Even:</span>
            <div style="font-size: 2.2rem; font-weight: 900; color: var(--primary); line-height: 1.2;">${breakEvenUnits} Units</div>
            <small style="color: var(--text-muted); font-size: 0.78rem;">Gross sales required: ₹${breakEvenRevenue.toLocaleString('en-IN')}</small>
          </div>

          <div style="background: var(--emerald-50); border: 1px solid var(--emerald-500); padding: 10px 14px; border-radius: 8px; font-size: 0.82rem; color: var(--emerald-800); font-weight: 700;">
            <i class="fa-solid fa-clock"></i> Projected Break-Even Time: ~${daysToBreakEven} Days at ${b.dailySalesTarget} sales/day
          </div>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // TOOL 5: INVENTORY RISK CALCULATOR
  // =========================================================================
  getRiskCalcHtml() {
    const r = this.riskCalc;
    let score = 15;
    if (r.shelfLifeMonths <= 1) score += 40;
    else if (r.shelfLifeMonths <= 3) score += 25;
    else if (r.shelfLifeMonths <= 6) score += 15;
    
    if (r.storageSensitivity === 'moisture') score += 25;
    if (r.seasonalVariation === 'high') score += 20;
    if (r.turnoverTargetDays > 30) score += 15;

    score = Math.min(100, Math.max(10, score));

    const riskBadge = score < 35 
      ? { text: 'Low Risk (Highly Stable)', color: '#059669', bg: '#dcfce7' }
      : score < 65 
      ? { text: 'Moderate Risk (Requires Weekly Cycle)', color: '#d97706', bg: '#fef3c7' }
      : { text: 'High Risk (Perishable / Urgent Turnover)', color: '#dc2626', bg: '#fee2e2' };

    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-shield-virus text-danger"></i> Inventory Risk & Spoilage Index</h3>
          <p>Evaluates physical storage vulnerabilities, shelf life degradation, and unsellable stock risks.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start;">
        <div>
          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label">Product Shelf Life (Months):</label>
            <input type="number" class="form-control" value="${r.shelfLifeMonths}" min="1" max="48"
                   oninput="tradingTools.riskCalc.shelfLifeMonths = parseInt(this.value, 10)||1; tradingTools.renderToolPane();">
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label">Storage Sensitivity:</label>
            <select class="form-control" onchange="tradingTools.riskCalc.storageSensitivity = this.value; tradingTools.renderToolPane();">
              <option value="ambient" ${r.storageSensitivity === 'ambient' ? 'selected' : ''}>Ambient Room Temperature (Stable)</option>
              <option value="moisture" ${r.storageSensitivity === 'moisture' ? 'selected' : ''}>Moisture / Heat Sensitive (Spices, Chocolates)</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label">Target Turnover Cycle (Days):</label>
            <input type="number" class="form-control" value="${r.turnoverTargetDays}" min="7" max="90"
                   oninput="tradingTools.riskCalc.turnoverTargetDays = parseInt(this.value, 10)||7; tradingTools.renderToolPane();">
          </div>
        </div>

        <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 22px; text-align: center;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Inventory Risk Index:</span>
          <div style="font-size: 2.8rem; font-weight: 900; color: ${riskBadge.color}; margin: 6px 0 10px;">${score} / 100</div>
          
          <div style="background: ${riskBadge.bg}; color: ${riskBadge.color}; font-weight: 800; font-size: 0.85rem; padding: 6px 14px; border-radius: 999px; display: inline-block; margin-bottom: 16px;">
            ${riskBadge.text}
          </div>

          <p style="text-align: left; font-size: 0.82rem; color: var(--text-body); line-height: 1.5; margin: 0; background: var(--bg-card); padding: 12px; border-radius: 8px; border: 1px solid var(--border-light);">
            <strong>Actionable Prudence Advice:</strong>
            ${score < 35 
              ? 'Excellent stability. Zero expiry pressure allows you to buy in standard 40-50 unit batches to secure maximum wholesale discounts.' 
              : score < 65 
              ? 'Keep inventory strictly capped at 2-3 weeks of projected sales. Ensure airtight moisture-proof stand-up pouches and store in a cool dry area.' 
              : 'Strict Micro-Pilot only! Procure no more than 10-15 units per cycle. Obtain customer pre-commitments before placing supplier orders to prevent dead stock.'}
          </p>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // TOOL 6: EXPENSE TRACKER
  // =========================================================================
  getExpensesHtml() {
    const totalExp = this.expenses.reduce((sum, e) => sum + e.amount, 0);

    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-receipt text-warning"></i> Operational Expense Tracker</h3>
          <p>Log all business expenditures to calculate true net earnings and maintain transparent accounts.</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="tradingTools.clearExpenses()">Clear All</button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px; align-items: start;">
        <div style="background: var(--bg-card-subtle); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
          <h4 style="margin: 0 0 12px; font-size: 0.95rem;">Record New Expense:</h4>
          <div class="form-group" style="margin-bottom: 10px;">
            <label class="form-label">Category:</label>
            <select class="form-control" id="expCategory">
              <option value="Inventory">Inventory Wholesale</option>
              <option value="Freight">Freight & Transport</option>
              <option value="Packaging">Packaging & Labels</option>
              <option value="Marketing">Samples & Marketing</option>
              <option value="Miscellaneous">Miscellaneous Supplies</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 10px;">
            <label class="form-label">Amount (₹):</label>
            <input type="number" class="form-control" id="expAmount" placeholder="e.g. 450">
          </div>
          <div class="form-group" style="margin-bottom: 14px;">
            <label class="form-label">Description / Note:</label>
            <input type="text" class="form-control" id="expNotes" placeholder="e.g. 50 Stand-up pouches">
          </div>
          <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="tradingTools.addExpense()">
            <i class="fa-solid fa-plus"></i> Add Expense Entry
          </button>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <strong>Expense Log (${this.expenses.length} Entries):</strong>
            <span style="font-size: 1rem; font-weight: 800; color: var(--primary);">Total: ₹${totalExp.toLocaleString('en-IN')}</span>
          </div>
          <div style="max-height: 320px; overflow-y: auto; border: 1px solid var(--border-light); border-radius: 8px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
              <thead style="background: var(--bg-card-subtle); border-bottom: 1px solid var(--border-light);">
                <tr>
                  <th style="padding: 8px 12px;">Date</th>
                  <th style="padding: 8px 12px;">Category</th>
                  <th style="padding: 8px 12px;">Notes</th>
                  <th style="padding: 8px 12px; text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${this.expenses.map(e => `
                  <tr style="border-bottom: 1px solid var(--border-light);">
                    <td style="padding: 8px 12px; color: var(--text-muted);">${e.date}</td>
                    <td style="padding: 8px 12px; font-weight: 700;">${e.category}</td>
                    <td style="padding: 8px 12px;">${e.notes}</td>
                    <td style="padding: 8px 12px; text-align: right; font-weight: 800; color: var(--text-main);">₹${e.amount.toLocaleString('en-IN')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  addExpense() {
    const cat = document.getElementById('expCategory')?.value || 'Miscellaneous';
    const amt = parseFloat(document.getElementById('expAmount')?.value || 0);
    const notes = document.getElementById('expNotes')?.value || '';

    if (amt <= 0) return;

    const today = new Date().toISOString().split('T')[0];
    this.expenses.unshift({ id: Date.now(), date: today, category: cat, amount: amt, notes: notes });
    localStorage.setItem('vyapar_expenses', JSON.stringify(this.expenses));
    this.renderToolPane();
  },

  clearExpenses() {
    this.expenses = [];
    localStorage.removeItem('vyapar_expenses');
    this.renderToolPane();
  },

  // =========================================================================
  // TOOL 7: STOCK MANAGEMENT DASHBOARD
  // =========================================================================
  getStockHtml() {
    const totalValuation = this.stock.reduce((sum, s) => sum + (s.inStock * s.cost), 0);
    const totalUnits = this.stock.reduce((sum, s) => sum + s.inStock, 0);

    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-boxes-stacked text-primary"></i> Stock Management Dashboard</h3>
          <p>Real-time SKU tracker with automated reorder alerts when inventory runs below 5 units.</p>
        </div>
        <div style="font-size: 0.88rem; font-weight: 700;">
          Total Stock Valuation: <strong class="text-success">₹${totalValuation.toLocaleString('en-IN')}</strong> (${totalUnits} Units)
        </div>
      </div>

      <div style="overflow-x: auto; border: 1px solid var(--border-light); border-radius: var(--radius-md); margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead style="background: var(--bg-card-subtle); border-bottom: 1px solid var(--border-light);">
            <tr>
              <th style="padding: 10px 14px;">SKU</th>
              <th style="padding: 10px 14px;">Product Name</th>
              <th style="padding: 10px 14px;">Category</th>
              <th style="padding: 10px 14px;">Cost/Unit</th>
              <th style="padding: 10px 14px;">In Stock</th>
              <th style="padding: 10px 14px;">Units Sold</th>
              <th style="padding: 10px 14px;">Status</th>
              <th style="padding: 10px 14px; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.stock.map(s => {
              const isLow = s.inStock < 5;
              return `
                <tr style="border-bottom: 1px solid var(--border-light);">
                  <td style="padding: 10px 14px; font-family: monospace; font-weight: 700; color: var(--text-muted);">${s.sku}</td>
                  <td style="padding: 10px 14px; font-weight: 700; color: var(--text-main);">${s.name}</td>
                  <td style="padding: 10px 14px;">${s.category}</td>
                  <td style="padding: 10px 14px;">₹${s.cost}</td>
                  <td style="padding: 10px 14px; font-weight: 800; font-size: 1rem; color: ${isLow ? '#dc2626' : 'var(--text-main)'};">${s.inStock}</td>
                  <td style="padding: 10px 14px; color: var(--primary); font-weight: 700;">${s.sold}</td>
                  <td style="padding: 10px 14px;">
                    <span style="background: ${isLow ? '#fee2e2' : '#dcfce7'}; color: ${isLow ? '#991b1b' : '#166534'}; padding: 2px 8px; border-radius: 999px; font-size: 0.72rem; font-weight: 800;">
                      ${isLow ? '⚠️ REORDER' : 'IN STOCK'}
                    </span>
                  </td>
                  <td style="padding: 10px 14px; text-align: right;">
                    <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 0.75rem;" onclick="tradingTools.recordStockSale('${s.sku}')">
                      -1 Sold
                    </button>
                    <button class="btn btn-sm btn-light" style="padding: 3px 8px; font-size: 0.75rem;" onclick="tradingTools.restockItem('${s.sku}')">
                      +10 Restock
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  recordStockSale(sku) {
    const item = this.stock.find(s => s.sku === sku);
    if (item && item.inStock > 0) {
      item.inStock -= 1;
      item.sold += 1;
      localStorage.setItem('vyapar_stock', JSON.stringify(this.stock));
      this.renderToolPane();
    }
  },

  restockItem(sku) {
    const item = this.stock.find(s => s.sku === sku);
    if (item) {
      item.inStock += 10;
      localStorage.setItem('vyapar_stock', JSON.stringify(this.stock));
      this.renderToolPane();
    }
  },

  // =========================================================================
  // TOOL 8: 1-PAGE BUSINESS PLAN GENERATOR
  // =========================================================================
  getPlanGeneratorHtml() {
    const f = this.planForm;
    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-file-contract text-success"></i> 1-Page Halal Business Plan Generator</h3>
          <p>Generate a professional, structured physical trading business blueprint with 1-click print / PDF export.</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.print()">
          <i class="fa-solid fa-print"></i> Print / PDF Export
        </button>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div class="form-group">
          <label class="form-label">Trading Venture Name:</label>
          <input type="text" class="form-control" value="${f.brandName}" 
                 oninput="tradingTools.planForm.brandName = this.value; tradingTools.updatePlanView();">
        </div>
        <div class="form-group">
          <label class="form-label">Initial Seed Capital (₹):</label>
          <input type="number" class="form-control" value="${f.capital}" 
                 oninput="tradingTools.planForm.capital = parseInt(this.value, 10)||1000; tradingTools.updatePlanView();">
        </div>
      </div>

      <!-- Live Printable Blueprint Preview -->
      <div id="planPreviewContainer" style="background: var(--bg-card); border: 2px solid var(--border-light); border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--primary); padding-bottom: 16px; margin-bottom: 20px;">
          <div>
            <span style="font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 1px;">Halal Commercial Blueprint</span>
            <h2 style="margin: 4px 0 0; font-size: 1.6rem; color: var(--text-main);">${f.brandName}</h2>
          </div>
          <div style="text-align: right; font-size: 0.8rem; color: var(--text-muted);">
            <div><strong>Framework:</strong> Physical Inventory Trading</div>
            <div><strong>Seed Budget:</strong> ₹${f.capital.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.85rem; line-height: 1.5; color: var(--text-body);">
          <div>
            <h5 style="color: var(--primary); margin: 0 0 6px;"><i class="fa-solid fa-bullseye"></i> 1. Core Trading Model</h5>
            <p style="margin: 0 0 14px;">Wholesale procurement of verified physical goods (Attar/Cashew/Textiles) with actual possession (*Qabd*) before retail sale. Strictly zero unowned dropshipping, zero debt interest, and 100% transparent defect disclosure.</p>
            
            <h5 style="color: var(--primary); margin: 0 0 6px;"><i class="fa-solid fa-coins"></i> 2. Capital Allocation</h5>
            <ul style="margin: 0 0 14px; padding-left: 18px;">
              <li>Inventory Purchase (60%): <strong>₹${Math.round(f.capital * 0.6).toLocaleString('en-IN')}</strong></li>
              <li>Packaging & Custom Branding (12%): <strong>₹${Math.round(f.capital * 0.12).toLocaleString('en-IN')}</strong></li>
              <li>Freight & Transit Logistics (15%): <strong>₹${Math.round(f.capital * 0.15).toLocaleString('en-IN')}</strong></li>
              <li>Emergency Buffer Reserve (8%): <strong>₹${Math.round(f.capital * 0.08).toLocaleString('en-IN')}</strong></li>
            </ul>
          </div>

          <div>
            <h5 style="color: var(--primary); margin: 0 0 6px;"><i class="fa-solid fa-truck-fast"></i> 3. Sourcing & Logistics</h5>
            <p style="margin: 0 0 14px;">Procure certified stock from state co-operative societies (Hantex/CAPEX) or regulated mandis (Valiyangadi/Broadway). Inspect samples physically before final cash exchange. Dispatch orders via KSRTC Swift Cargo / India Post.</p>

            <h5 style="color: var(--primary); margin: 0 0 6px;"><i class="fa-solid fa-calendar-check"></i> 4. 7-Day Launch Schedule</h5>
            <ul style="margin: 0; padding-left: 18px;">
              <li>Day 1-2: Audit 5 local shops & record shelf price thresholds</li>
              <li>Day 3-4: Secure sample pack, take photos & get 5 pre-orders</li>
              <li>Day 5-6: Purchase bulk lot, enforce Qabd & pack with labels</li>
              <li>Day 7: Deliver orders, collect cash & record net profit</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  updatePlanView() {
    this.renderToolPane();
  },

  // =========================================================================
  // TOOL 9: ETHICAL NEGOTIATION ASSISTANT
  // =========================================================================
  getNegotiationHtml() {
    const n = this.negotiation;
    let scriptText = '';

    if (n.scenario === 'inquiry') {
      scriptText = `السلام عليكم ورحمة الله وبركاته / നമസ്കാരം ${n.supplierName},
ഞാൻ ${n.productName}-ന്റെ ഒരു പുതിയ റീട്ടെയിൽ ട്രേഡിംഗ് യൂണിറ്റ് ആരംഭിക്കുകയാണ്. 
നിങ്ങളുടെ പക്കൽ നിലവിൽ ലഭ്യമായ ക്വാളിറ്റി സാമ്പിളുകളും, ${n.quantity} പീസുകൾക്ക് നൽകാൻ കഴിയുന്ന ഏറ്റവും കുറഞ്ഞ ഹോൾസെയിൽ റേറ്റും ഒന്ന് അറിയിക്കാമോ? ഞങ്ങൾ തുടർച്ചയായി ഓർഡർ നൽകാൻ ഉദ്ദേശിക്കുന്നതാണ്. GST / ബിൽ സഹിതമുള്ള നിരക്ക് അറിയിക്കുമല്ലോ. നന്ദി.`;
    } else if (n.scenario === 'defect') {
      scriptText = `ബഹുമാനപ്പെട്ട ${n.supplierName},
നിങ്ങൾ അയച്ച ${n.productName} പാഴ്സൽ ഇന്ന് ലഭിച്ചു, നന്ദി.
എന്നാൽ പാഴ്സൽ തുറന്ന് പരിശോധിച്ചപ്പോൾ (${n.quantity} പീസുകളിൽ 3 എണ്ണത്തിൽ സീൽ പൊട്ടലുകൾ / ഡാമേജ്) കാണുകയുണ്ടായി. ഇസ്‌ലാമിക കച്ചവട മര്യാദ പ്രകാരം നാം പരസ്പരം വിശ്വസ്തത പാലിക്കേണ്ടതുണ്ടല്ലോ. അടുത്ത ഓർഡറിൽ ഇതിന് തുല്യമായ റീപ്ലേസ്‌മെന്റ് നൽകുമോ അതോ ഈ തുക ക്രഡിറ്റ് ആയി കുറയ്ക്കുമോ എന്ന് ദയവായി അറിയിക്കുക. ഫോട്ടോകൾ ഇതോടൊപ്പം അറ്റാച്ച് ചെയ്യുന്നു.`;
    } else {
      scriptText = `പ്രിയപ്പെട്ട ${n.supplierName},
ഞങ്ങൾക്ക് ${n.productName} ${n.quantity} എണ്ണം ആവശ്യമുണ്ട്. മറ്റൊരു വിശ്വസ്ത സപ്ലയർ ഞങ്ങൾക്ക് ₹${n.targetPrice} നിരക്കിൽ ഇത് ഓഫർ ചെയ്യുന്നുണ്ട്. എങ്കിലും നിങ്ങളുടെ ക്വാളിറ്റിയിൽ താല്പര്യമുള്ളതിനാൽ, ഇതേ നിരക്കിൽ ഞങ്ങൾക്ക് തരാൻ സാധിക്കുമോ? ദയവായി പരിശോധിക്കുക.`;
    }

    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-comments-dollar text-primary"></i> Ethical Negotiation & Supplier Dialogue Assistant</h3>
          <p>Polite, professional, Shariah-compliant negotiation scripts in Malayalam & English for WhatsApp and phone calls.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start;">
        <div>
          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label">Scenario:</label>
            <select class="form-control" onchange="tradingTools.negotiation.scenario = this.value; tradingTools.renderToolPane();">
              <option value="inquiry" ${n.scenario === 'inquiry' ? 'selected' : ''}>1. First Contact & Wholesale MOQ Inquiry</option>
              <option value="defect" ${n.scenario === 'defect' ? 'selected' : ''}>2. Claiming Transit Defect / Damage Ethically</option>
              <option value="price_match" ${n.scenario === 'price_match' ? 'selected' : ''}>3. Respectful Volume Price Matching</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label">Supplier / Wholesaler Name:</label>
            <input type="text" class="form-control" value="${n.supplierName}" 
                   oninput="tradingTools.negotiation.supplierName = this.value; tradingTools.renderToolPane();">
          </div>

          <div class="form-group" style="margin-bottom: 12px;">
            <label class="form-label">Product Name:</label>
            <input type="text" class="form-control" value="${n.productName}" 
                   oninput="tradingTools.negotiation.productName = this.value; tradingTools.renderToolPane();">
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label class="form-label" style="font-weight: 700; margin: 0;">Generated WhatsApp Script:</label>
            <button class="btn btn-sm btn-outline text-success" onclick="tradingTools.copyScript('${encodeURIComponent(scriptText)}')">
              <i class="fa-solid fa-copy"></i> Copy Script
            </button>
          </div>
          <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 18px; font-size: 0.88rem; line-height: 1.6; color: var(--text-main); white-space: pre-wrap; font-family: 'Manjari', sans-serif;">
${scriptText}
          </div>
        </div>
      </div>
    `;
  },

  copyScript(encoded) {
    const text = decodeURIComponent(encoded);
    navigator.clipboard.writeText(text).then(() => {
      alert('Negotiation script copied to clipboard! Paste directly into WhatsApp.');
    });
  },

  // =========================================================================
  // TOOL 10: HALAL TRADING ELIGIBILITY CHECKLIST
  // =========================================================================
  getHalalChecklistHtml() {
    const ch = this.halalChecklist;
    const score = Object.values(ch).filter(Boolean).length;

    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-stamp text-success"></i> Halal Trading Eligibility Checklist</h3>
          <p>Verify your physical commerce practices against the 10 fundamental tenets of Islamic Commercial Law (*Fiqh al-Mu'amalat*).</p>
        </div>
        <div style="background: var(--emerald-50); color: var(--emerald-800); border: 1px solid var(--emerald-500); padding: 6px 14px; border-radius: var(--radius-full); font-weight: 800; font-size: 0.88rem;">
          Score: ${score} / 10 Shariah Tests Passed
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
        <label class="check-item-row ${ch.q1 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q1 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q1 = this.checked; tradingTools.renderToolPane();">
          <span><strong>1. Actual Physical Possession (*Qabd*):</strong> I inspect and receive physical custody of goods before reselling them to customers.</span>
        </label>
        <label class="check-item-row ${ch.q2 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q2 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q2 = this.checked; tradingTools.renderToolPane();">
          <span><strong>2. Anti-Dropshipping Rule:</strong> I do not sell items I do not own or possess (*La tabi' ma laysa 'indak*).</span>
        </label>
        <label class="check-item-row ${ch.q3 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q3 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q3 = this.checked; tradingTools.renderToolPane();">
          <span><strong>3. Zero Riba (No Interest):</strong> No bank interest loans or credit-card usury are used to finance inventory.</span>
        </label>
        <label class="check-item-row ${ch.q4 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q4 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q4 = this.checked; tradingTools.renderToolPane();">
          <span><strong>4. Defect Disclosure (*Bayan al-Ayb*):</strong> Any minor manufacturing flaw, tear, or near-expiry date is disclosed honestly.</span>
        </label>
        <label class="check-item-row ${ch.q5 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q5 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q5 = this.checked; tradingTools.renderToolPane();">
          <span><strong>5. Accurate Weights & Measures:</strong> Exact grammage and volume (e.g. 100g, 250g, 6ml) are strictly verified.</span>
        </label>
        <label class="check-item-row ${ch.q6 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q6 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q6 = this.checked; tradingTools.renderToolPane();">
          <span><strong>6. No Speculation or Gambling:</strong> Zero lottery boxes, mystery packages, or multi-level referral pyramids.</span>
        </label>
        <label class="check-item-row ${ch.q7 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q7 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q7 = this.checked; tradingTools.renderToolPane();">
          <span><strong>7. Permissible Goods:</strong> Pure halal commodities with zero prohibited ingredients, alcohol, or counterfeit branding.</span>
        </label>
        <label class="check-item-row ${ch.q8 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q8 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q8 = this.checked; tradingTools.renderToolPane();">
          <span><strong>8. Mutual Consent (*Taradi*):</strong> Buyer and seller freely agree on price and return policy without coercion.</span>
        </label>
        <label class="check-item-row ${ch.q9 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q9 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q9 = this.checked; tradingTools.renderToolPane();">
          <span><strong>9. Risk Liability (*Al-Kharaj bi al-Daman*):</strong> I accept liability for lost or damaged goods while under my ownership.</span>
        </label>
        <label class="check-item-row ${ch.q10 ? 'checked' : ''}">
          <input type="checkbox" ${ch.q10 ? 'checked' : ''} onchange="tradingTools.halalChecklist.q10 = this.checked; tradingTools.renderToolPane();">
          <span><strong>10. Written Invoice / Receipt:</strong> Every transaction provides a clear price slip or digital WhatsApp invoice.</span>
        </label>
      </div>
    `;
  },

  // =========================================================================
  // TOOL 11: SUPPLIER COMPARISON TOOL
  // =========================================================================
  getSupplierCompareHtml() {
    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-code-compare text-info"></i> Wholesale Supplier Side-by-Side Comparator</h3>
          <p>Compare multiple suppliers on MOQ, landed costs, transit times, and return policies before placing an order.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
        ${this.suppliersList.map((sup, idx) => {
          const batchCost = (sup.unitPrice * sup.moq) + sup.freight;
          const effectiveLanded = Math.round(batchCost / sup.moq);
          const isWinner = idx === 0;

          return `
            <div style="background: var(--bg-card-subtle); border: 2px solid ${isWinner ? 'var(--primary)' : 'var(--border-light)'}; border-radius: var(--radius-md); padding: 18px; position: relative;">
              ${isWinner ? '<span style="position: absolute; top: -10px; right: 14px; background: var(--primary); color: #fff; font-size: 0.68rem; font-weight: 800; padding: 2px 8px; border-radius: 999px;">RECOMMENDED</span>' : ''}
              <h4 style="margin: 0 0 10px; font-size: 1rem; color: var(--text-main);">${sup.name}</h4>
              
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem; margin-bottom: 14px;">
                <div style="display: flex; justify-content: space-between;"><span>Unit Price:</span> <strong>₹${sup.unitPrice}</strong></div>
                <div style="display: flex; justify-content: space-between;"><span>Minimum MOQ:</span> <strong>${sup.moq} Units</strong></div>
                <div style="display: flex; justify-content: space-between;"><span>Freight Charges:</span> <strong>₹${sup.freight}</strong></div>
                <div style="display: flex; justify-content: space-between;"><span>Delivery Speed:</span> <strong>${sup.leadTime} Days</strong></div>
                <div style="display: flex; justify-content: space-between;"><span>FSSAI / GST:</span> <strong class="${sup.verified ? 'text-success' : 'text-danger'}">${sup.verified ? 'Verified' : 'Unregistered'}</strong></div>
                <div style="display: flex; justify-content: space-between;"><span>Defect Return:</span> <strong>${sup.returnPolicy}</strong></div>
              </div>

              <div style="background: var(--bg-card); padding: 10px; border-radius: 6px; border: 1px solid var(--border-light); text-align: center;">
                <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">True Landed Cost / Unit:</span>
                <div style="font-size: 1.3rem; font-weight: 900; color: var(--primary);">₹${effectiveLanded}</div>
                <small style="font-size: 0.72rem; color: var(--text-muted);">Total Batch MOQ: ₹${batchCost.toLocaleString('en-IN')}</small>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // =========================================================================
  // TOOL 12: PRINTABLE SALES & PURCHASE CASH LEDGER
  // =========================================================================
  getLedgerHtml() {
    let runningBalance = 0;
    const computedRows = this.ledger.map(row => {
      if (row.type === 'inflow') runningBalance += row.amount;
      else runningBalance -= row.amount;
      return { ...row, balance: runningBalance };
    });

    const totalInflow = this.ledger.filter(r => r.type === 'inflow').reduce((s, r) => s + r.amount, 0);
    const totalOutflow = this.ledger.filter(r => r.type === 'outflow').reduce((s, r) => s + r.amount, 0);

    return `
      <div class="tool-pane-header">
        <div>
          <h3><i class="fa-solid fa-book-journal-whills text-success"></i> Printable Sales & Purchase Ledger</h3>
          <p>Double-entry micro-business cash ledger with automated running balance and export tools.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-outline" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Ledger</button>
          <button class="btn btn-sm btn-outline" onclick="tradingTools.exportCsv()"><i class="fa-solid fa-file-csv"></i> Export CSV</button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 20px;">
        <div style="background: var(--emerald-50); border: 1px solid var(--emerald-500); padding: 12px; border-radius: 8px;">
          <span style="font-size: 0.75rem; color: var(--emerald-800); font-weight: 700;">TOTAL CASH INFLOW</span>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--emerald-900);">₹${totalInflow.toLocaleString('en-IN')}</div>
        </div>
        <div style="background: var(--gold-50); border: 1px solid var(--gold-400); padding: 12px; border-radius: 8px;">
          <span style="font-size: 0.75rem; color: var(--gold-600); font-weight: 700;">TOTAL CASH OUTFLOW</span>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--gold-600);">₹${totalOutflow.toLocaleString('en-IN')}</div>
        </div>
        <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-light); padding: 12px; border-radius: 8px;">
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">NET RUNNING BALANCE</span>
          <div style="font-size: 1.3rem; font-weight: 900; color: ${runningBalance >= 0 ? 'var(--primary)' : '#dc2626'};">₹${runningBalance.toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div style="overflow-x: auto; border: 1px solid var(--border-light); border-radius: var(--radius-md); margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
          <thead style="background: var(--bg-card-subtle); border-bottom: 1px solid var(--border-light);">
            <tr>
              <th style="padding: 10px 14px;">Date</th>
              <th style="padding: 10px 14px;">Transaction Particulars</th>
              <th style="padding: 10px 14px; text-align: right;">Cash In (+)</th>
              <th style="padding: 10px 14px; text-align: right;">Cash Out (-)</th>
              <th style="padding: 10px 14px; text-align: right;">Running Balance</th>
            </tr>
          </thead>
          <tbody>
            ${computedRows.map(r => `
              <tr style="border-bottom: 1px solid var(--border-light);">
                <td style="padding: 10px 14px; color: var(--text-muted);">${r.date}</td>
                <td style="padding: 10px 14px; font-weight: 700; color: var(--text-main);">${r.desc}</td>
                <td style="padding: 10px 14px; text-align: right; color: #059669; font-weight: 800;">
                  ${r.type === 'inflow' ? '+ ₹' + r.amount.toLocaleString('en-IN') : '-'}
                </td>
                <td style="padding: 10px 14px; text-align: right; color: #dc2626; font-weight: 800;">
                  ${r.type === 'outflow' ? '- ₹' + r.amount.toLocaleString('en-IN') : '-'}
                </td>
                <td style="padding: 10px 14px; text-align: right; font-weight: 900; color: var(--text-main);">
                  ₹${r.balance.toLocaleString('en-IN')}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Add New Transaction Form -->
      <div style="background: var(--bg-card-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 16px; display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;">
        <div style="flex: 1; min-width: 200px;">
          <label class="form-label" style="font-size: 0.78rem;">Description:</label>
          <input type="text" id="ledDesc" class="form-control" placeholder="e.g. Sale of 2 Attar bottles">
        </div>
        <div style="width: 140px;">
          <label class="form-label" style="font-size: 0.78rem;">Type:</label>
          <select id="ledType" class="form-control">
            <option value="inflow">Sale (Cash In)</option>
            <option value="outflow">Expense (Cash Out)</option>
          </select>
        </div>
        <div style="width: 140px;">
          <label class="form-label" style="font-size: 0.78rem;">Amount (₹):</label>
          <input type="number" id="ledAmount" class="form-control" placeholder="e.g. 500">
        </div>
        <button class="btn btn-primary btn-sm" onclick="tradingTools.addLedgerEntry()">
          <i class="fa-solid fa-plus"></i> Record Entry
        </button>
      </div>
    `;
  },

  addLedgerEntry() {
    const desc = document.getElementById('ledDesc')?.value || '';
    const type = document.getElementById('ledType')?.value || 'inflow';
    const amount = parseFloat(document.getElementById('ledAmount')?.value || 0);

    if (!desc || amount <= 0) return;

    const today = new Date().toISOString().split('T')[0];
    this.ledger.push({ id: Date.now(), date: today, desc, type, amount });
    localStorage.setItem('vyapar_ledger', JSON.stringify(this.ledger));
    this.renderToolPane();
  },

  exportCsv() {
    let csv = "Date,Particulars,Type,Amount\n";
    this.ledger.forEach(r => {
      csv += `"${r.date}","${r.desc}","${r.type}",${r.amount}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyapar_trading_ledger_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Export to window
window.tradingTools = tradingTools;
