/**
 * VYAPAR SHIKSHA — ARCHIVED INDUSTRIAL UNITS REALITY-CHECK & RISK GATEWAY
 * 
 * Interactive 3-Stage Verification & Financial Advisory Gateway
 * 1. Capital Reality Check: Explains the ₹5 Lakh to ₹45 Lakh investment requirement
 * 2. Bank Loan & Compound Interest (Riba) Simulator: Interactive EMI & debt-trap chart
 * 3. Enterprise Verification Terminal: Simulated Razorpay/UPI inspection & mandatory consent
 */

(function(global) {
  'use strict';

  const archivedGateway = {
    currentStep: 1,
    selectedScale: 'micro_factory', // 'micro_factory' | 'industrial_plant'
    loanAmount: 1000000, // ₹10 Lakhs
    loanTenureYears: 5,
    interestRatePct: 13.5, // 13.5% Commercial SME bank interest
    targetCourseKey: null,
    _unlocked: false,
    checklist: {
      surplusCapital: false,
      overheadRisks: false,
      tradingFirst: false
    },

    getApp() {
      return (typeof window !== 'undefined' && window.app) || (typeof app !== 'undefined' ? app : null);
    },

    getLang() {
      const a = this.getApp();
      if (a && a.currentLang) return a.currentLang;
      try {
        const saved = localStorage.getItem('vyapar_lang');
        if (saved && ['en', 'ml', 'ar'].includes(saved)) return saved;
      } catch (e) {}
      if (typeof document !== 'undefined' && document.documentElement.lang) {
        return document.documentElement.lang;
      }
      return 'en';
    },

    isUnlocked() {
      if (this._unlocked) return true;
      try {
        return localStorage.getItem('vyapar_archived_unlocked') === 'true';
      } catch (e) {
        return false;
      }
    },

    unlock(courseKey) {
      this._unlocked = true;
      try {
        localStorage.setItem('vyapar_archived_unlocked', 'true');
      } catch (e) {}

      this.closeModal();

      const appRef = this.getApp();
      const lang = this.getLang();

      if (window.platformEnhancements) {
        window.platformEnhancements.showToast(
          lang === 'ml' 
            ? '✅ വ്യാവസായിക നിർമ്മാണ റഫറൻസുകൾ അൺലോക്ക് ചെയ്യപ്പെട്ടു!' 
            : '✅ Archived Industrial References Unlocked!'
        );
      }

      const target = courseKey || this.targetCourseKey;
      this.targetCourseKey = null;

      if (appRef) {
        appRef.currentTierFilter = 'archived';
        document.querySelectorAll('.tier-tab-btn').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-tier') === 'archived');
        });
        appRef.renderFacultyCards();

        if (target) {
          appRef.openArchivedCourse(target);
        } else {
          const el = document.getElementById('facultyCardsGrid') || document.getElementById('faculty-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },

    relock() {
      this._unlocked = false;
      try {
        localStorage.removeItem('vyapar_archived_unlocked');
      } catch (e) {}

      const appRef = this.getApp();
      const lang = this.getLang();

      if (appRef) {
        appRef.filterBusinessTier('all');
      }
      if (window.platformEnhancements) {
        window.platformEnhancements.showToast(
          lang === 'ml' 
            ? '🔒 ആർക്കൈവ് സെക്ഷൻ വീണ്ടും ലോക്ക് ചെയ്തു.' 
            : '🔒 Archived References Relocked.'
        );
      }
    },

    openModal(step = 1, targetCourseKey = null) {
      if (targetCourseKey) {
        this.targetCourseKey = targetCourseKey;
      }
      this.currentStep = step;
      this.render();
      const modal = document.getElementById('archivedGatewayModal');
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    },

    closeModal() {
      const modal = document.getElementById('archivedGatewayModal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    },

    confirmAndUnlock() {
      this.checklist.surplusCapital = true;
      this.checklist.overheadRisks = true;
      this.checklist.tradingFirst = true;

      const chk1 = document.getElementById('chkSurplusCapital');
      const chk2 = document.getElementById('chkOverheadRisks');
      const chk3 = document.getElementById('chkTradingFirst');
      if (chk1) chk1.checked = true;
      if (chk2) chk2.checked = true;
      if (chk3) chk3.checked = true;

      this.unlock();
    },

    setStep(stepNum) {
      this.currentStep = stepNum;
      this.render();
    },

    setScale(scaleType) {
      this.selectedScale = scaleType;
      this.loanAmount = (scaleType === 'micro_factory') ? 1000000 : 2500000;
      this.render();
    },

    updateLoanParams(amount, tenure) {
      if (amount !== undefined) this.loanAmount = parseFloat(amount) || 500000;
      if (tenure !== undefined) this.loanTenureYears = parseInt(tenure, 10) || 5;
      this.updateLoanGraphDom();
    },

    toggleCheck(field, isChecked) {
      this.checklist[field] = !!isChecked;
      const btn = document.getElementById('btnGatewayUnlock');
      const allChecked = this.checklist.surplusCapital && this.checklist.overheadRisks && this.checklist.tradingFirst;
      if (btn) {
        btn.classList.toggle('disabled-btn', !allChecked);
        btn.style.opacity = allChecked ? '1' : '0.55';
      }
    },

    calculateLoan(principal, annualRatePct, years) {
      const r = (annualRatePct / 100) / 12; // Monthly rate
      const n = years * 12; // Total months
      const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - principal;
      return {
        monthlyEmi: Math.round(emi),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        interestPctOfPrincipal: Math.round((totalInterest / principal) * 100)
      };
    },

    updateLoanGraphDom() {
      const loan = this.calculateLoan(this.loanAmount, this.interestRatePct, this.loanTenureYears);
      const elEmi = document.getElementById('gwLoanEmiVal');
      const elPrincipal = document.getElementById('gwLoanPrincipalVal');
      const elInterest = document.getElementById('gwLoanInterestVal');
      const elTotal = document.getElementById('gwLoanTotalVal');
      const elInterestBar = document.getElementById('gwInterestBarFill');
      const elInterestPctLabel = document.getElementById('gwInterestPctLabel');

      const lang = this.getLang();
      const isMl = lang === 'ml';
      if (elEmi) elEmi.textContent = `₹${loan.monthlyEmi.toLocaleString('en-IN')}`;
      if (elPrincipal) elPrincipal.textContent = `₹${this.loanAmount.toLocaleString('en-IN')}`;
      if (elInterest) elInterest.textContent = `₹${loan.totalInterest.toLocaleString('en-IN')}`;
      if (elTotal) elTotal.textContent = `₹${loan.totalPayment.toLocaleString('en-IN')}`;
      if (elInterestBar) elInterestBar.style.width = `${Math.min(loan.interestPctOfPrincipal, 100)}%`;
      if (elInterestPctLabel) elInterestPctLabel.textContent = `+${loan.interestPctOfPrincipal}% ${isMl ? 'പലിശ ബാധ്യത' : 'Interest Burden'}`;
    },

    render() {
      const modal = document.getElementById('archivedGatewayModal');
      if (!modal) return;

      const lang = this.getLang();
      const isMl = lang === 'ml';
      const isAr = lang === 'ar';

      const loan = this.calculateLoan(this.loanAmount, this.interestRatePct, this.loanTenureYears);

      let stepContentHtml = '';

      // STEP 1: CAPITAL SCALE REALITY-CHECK
      if (this.currentStep === 1) {
        const isMicro = this.selectedScale === 'micro_factory';
        const totalCapital = isMicro ? '₹9,75,000' : '₹35,90,000';
        const machineryCost = isMicro ? '₹3,80,000' : '₹18,00,000';
        const powerCost = isMicro ? '₹1,80,000 (KSEB 3-Phase + Transformer)' : '₹4,50,000 (High-Tension Line)';
        const rentAdvance = isMicro ? '₹1,20,000 (10 Months Deposit)' : '₹3,60,000 (Industrial Estate)';
        const licCost = isMicro ? '₹45,000 (PCB, Fire, Panchayat)' : '₹1,80,000 (Environmental Clearance)';
        const rawMatBuffer = isMicro ? '₹2,50,000 (3 Months Buffer)' : '₹8,00,000 (Bulk Ingredients)';

        stepContentHtml = `
          <div class="gateway-step-container">
            <div class="gateway-alert-banner alert-danger">
              <i class="fa-solid fa-triangle-exclamation gateway-alert-icon"></i>
              <div>
                <strong>${isMl ? 'അതീവ സാമ്പത്തിക ജാഗ്രത മുന്നറിയിപ്പ്' : isAr ? 'تحذير مالي بالغ الأهمية' : 'High-Capital Risk Advisory'}</strong>
                <p>${isMl ? 'മെഷീൻ അധിഷ്ഠിത നിർമ്മാണ യൂണിറ്റുകളും ഇൻഡസ്ട്രിയൽ പ്ലാന്റുകളും സാധാരണക്കാർക്കും തുടക്കക്കാർക്കുമുള്ളതല്ല. ഇതിന് വൻകിട മൂലധനവും ഫാക്ടറി സജ്ജീകരണങ്ങളും ആവശ്യമാണ്.' : 'Machinery manufacturing and industrial plants are NOT suitable for beginners or micro-budgets. Massive capital and commercial overheads are mandatory.'}</p>
              </div>
            </div>

            <div class="gateway-scale-selector">
              <span class="gateway-scale-label">${isMl ? 'നിർമ്മാണ തോത് തിരഞ്ഞെടുക്കുക:' : 'Select Factory Scale:'}</span>
              <div class="scale-btn-group">
                <button class="scale-btn ${isMicro ? 'active' : ''}" onclick="archivedGateway.setScale('micro_factory')">
                  <i class="fa-solid fa-gears"></i> ${isMl ? 'ചെറുകിട മെഷീൻ യൂണിറ്റ് (₹5L - ₹12L)' : 'Micro-Machinery Unit'}
                </button>
                <button class="scale-btn ${!isMicro ? 'active' : ''}" onclick="archivedGateway.setScale('industrial_plant')">
                  <i class="fa-solid fa-industry"></i> ${isMl ? 'ഇൻഡസ്ട്രിയൽ പ്ലാന്റ് (₹15L - ₹45L)' : 'Industrial Processing Plant'}
                </button>
              </div>
            </div>

            <!-- Itemized Capital Breakdown -->
            <div class="gateway-cost-card">
              <div class="gateway-cost-header">
                <div>
                  <h4 style="margin:0 0 4px; font-size:1.05rem;">${isMicro ? (isMl ? 'ചെറുകിട യൂണിറ്റ് ആവശ്യമായ തുടക്ക ചിലവ്' : 'Micro-Unit Startup Expenses') : (isMl ? 'ഇൻഡസ്ട്രിയൽ പ്ലാന്റ് ആവശ്യമായ തുടക്ക ചിലവ്' : 'Industrial Plant Startup Expenses')}</h4>
                  <span style="font-size:0.8rem; color:var(--text-muted);">${isMl ? 'യന്ത്രങ്ങൾ സ്ഥാപിക്കുന്നതിന് മുൻപ് തന്നെ കൈവശം കരുതേണ്ട യഥാർത്ഥ തുക' : 'Non-negotiable fixed capital required before commencing'}</span>
                </div>
                <div class="total-capital-pill">${totalCapital}</div>
              </div>

              <div class="cost-breakdown-list">
                <div class="cost-item-row">
                  <span class="cost-name"><i class="fa-solid fa-screwdriver-wrench text-warning"></i> ${isMl ? 'യന്ത്രസാമഗ്രികൾ & ഓട്ടോമേഷൻ ടൂളുകൾ' : 'Machinery & Tooling'}:</span>
                  <strong class="cost-amt">${machineryCost}</strong>
                </div>
                <div class="cost-item-row">
                  <span class="cost-name"><i class="fa-solid fa-bolt text-warning"></i> ${isMl ? '3-ഫേസ് വൈദ്യുതി & കൊമേഴ്സ്യൽ വയറിംഗ്' : '3-Phase Power & Wiring'}:</span>
                  <strong class="cost-amt">${powerCost}</strong>
                </div>
                <div class="cost-item-row">
                  <span class="cost-name"><i class="fa-solid fa-warehouse text-info"></i> ${isMl ? 'ഫാക്ടറി കെട്ടിട വാടക അഡ്വാൻസ് (10 മാസം)' : 'Factory Shed Lease Deposit'}:</span>
                  <strong class="cost-amt">${rentAdvance}</strong>
                </div>
                <div class="cost-item-row">
                  <span class="cost-name"><i class="fa-solid fa-file-shield text-danger"></i> ${isMl ? 'PCB, ഫയർ ഫോഴ്സ്, ഫാക്ടറി ലൈസൻസുകൾ' : 'Pollution PCB & Factory NOC'}:</span>
                  <strong class="cost-amt">${licCost}</strong>
                </div>
                <div class="cost-item-row">
                  <span class="cost-name"><i class="fa-solid fa-boxes-stacked text-success"></i> ${isMl ? 'അസംസ്കൃത വസ്തുക്കളുടെ വർക്കിംഗ് ക്യാപിറ്റൽ' : 'Raw Materials Buffer'}:</span>
                  <strong class="cost-amt">${rawMatBuffer}</strong>
                </div>
              </div>

              <div class="vs-trading-callout">
                <div class="callout-badge">${isMl ? 'താരതമ്യം' : 'Comparison'}</div>
                <p>
                  ${isMl ? 'വ്യാപാർ ശിക്ഷയുടെ <strong>₹10,000 ഹലാൽ ട്രേഡിംഗിൽ</strong> ഒരു മാസത്തെ കടബാധ്യതയോ മെഷീൻ തേയ്മാനമോ ഇല്ല. എന്നാൽ ഈ നിർമ്മാണ യൂണിറ്റിന് <strong>കുറഞ്ഞത് ₹10 ലക്ഷം രൂപ</strong> വേണം!' : 'Vyapar Shiksha Halal Trading starts with ₹10,000 and has zero fixed overheads. Manufacturing requires a minimum of ₹10,00,000+!'}
                </p>
              </div>
            </div>

            <!-- Footer Action -->
            <div class="gateway-footer-actions">
              <button class="btn btn-outline" onclick="archivedGateway.closeModal()">
                <i class="fa-solid fa-arrow-left"></i> ${isMl ? 'സേഫായ ട്രേഡിംഗിലേക്ക് മടങ്ങുക' : 'Back to Safe Trading'}
              </button>
              <button class="btn btn-primary" onclick="archivedGateway.setStep(2)">
                <span>${isMl ? 'ഘട്ടം 2: ബാങ്ക് വായ്പയും പലിശക്കെണിയും കാണുക' : 'Step 2: Bank Debt & Interest Risk'}</span> <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        `;
      }

      // STEP 2: BANK LOAN & COMPOUND INTEREST SIMULATOR
      else if (this.currentStep === 2) {
        stepContentHtml = `
          <div class="gateway-step-container">
            <div class="gateway-alert-banner alert-warning">
              <i class="fa-solid fa-scale-balanced gateway-alert-icon text-warning"></i>
              <div>
                <strong>${isMl ? 'പലിശ ബാധ്യതയും (രിബ) ബാങ്ക് വായ്പാ റിസ്കും' : 'Commercial Debt & Interest (Riba) Hazard'}</strong>
                <p>${isMl ? 'നിർമ്മാണം തുടങ്ങാൻ ബാങ്കിൽ നിന്ന് വായ്പയെടുത്താൽ, ഉൽപ്പന്നങ്ങൾ വിറ്റഴിഞ്ഞില്ലെങ്കിലും കൃത്യമായ തീയതിയിൽ ഭീമമായ ഇ.എം.ഐ ബാങ്കിലേക്ക് അടയ്ക്കേണ്ടി വരും.' : 'Bank loans obligate fixed monthly EMI repayments regardless of machine downtime or product unsold stock.'}</p>
              </div>
            </div>

            <!-- Interactive Loan Simulator Controls -->
            <div class="gateway-loan-calc-grid">
              <div class="loan-input-pane">
                <div class="form-group" style="margin-bottom: 14px;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <label class="form-label" style="font-size:0.85rem;">${isMl ? 'ബാങ്ക് വായ്പ തുക (Principal):' : 'Loan Principal:'}</label>
                    <strong style="color:var(--primary); font-size:1rem;" id="gwLoanSliderDisplay">₹${(this.loanAmount / 100000).toFixed(1)} Lakhs</strong>
                  </div>
                  <input type="range" class="form-range" min="500000" max="3000000" step="100000" value="${this.loanAmount}"
                         oninput="document.getElementById('gwLoanSliderDisplay').textContent = '₹' + (parseFloat(this.value)/100000).toFixed(1) + ' Lakhs'; archivedGateway.updateLoanParams(this.value, undefined);">
                  <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-muted);">
                    <span>₹5 Lakhs</span>
                    <span>₹15 Lakhs</span>
                    <span>₹30 Lakhs</span>
                  </div>
                </div>

                <div class="form-group" style="margin-bottom: 14px;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <label class="form-label" style="font-size:0.85rem;">${isMl ? 'തിരിച്ചടവ് കാലാവധി (Tenure):' : 'Repayment Tenure:'}</label>
                    <strong style="color:var(--text-main); font-size:0.95rem;" id="gwTenureSliderDisplay">${this.loanTenureYears} Years (60 Mo)</strong>
                  </div>
                  <input type="range" class="form-range" min="3" max="7" step="1" value="${this.loanTenureYears}"
                         oninput="document.getElementById('gwTenureSliderDisplay').textContent = this.value + ' Years (' + (this.value * 12) + ' Mo)'; archivedGateway.updateLoanParams(undefined, this.value);">
                  <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--text-muted);">
                    <span>3 Years</span>
                    <span>5 Years</span>
                    <span>7 Years</span>
                  </div>
                </div>

                <div style="background:var(--bg-card); border:1px solid var(--border-light); border-radius:8px; padding:10px 12px; font-size:0.78rem; color:var(--text-muted);">
                  <i class="fa-solid fa-percent text-danger"></i> <strong>${isMl ? 'ബാങ്ക് വാർഷിക പലിശ നിരക്ക്:' : 'Commercial Interest Rate:'}</strong> 13.5% Reducing Balance (SME Commercial Standard).
                </div>
              </div>

              <!-- Live Loan Breakdown & Interest Trap Graph -->
              <div class="loan-output-pane">
                <div class="emi-highlight-box">
                  <span class="emi-sub-label">${isMl ? 'പ്രതിമാസ ബാങ്ക് ഇ.എം.ഐ ബാധ്യത' : 'Mandatory Monthly EMI'}</span>
                  <div class="emi-amount" id="gwLoanEmiVal">₹${loan.monthlyEmi.toLocaleString('en-IN')}</div>
                  <small style="color:#ef4444; font-weight:700; font-size:0.75rem;">
                    <i class="fa-solid fa-circle-exclamation"></i> ${isMl ? 'ഫാക്ടറി പൂട്ടിക്കിടന്നാലും എല്ലാ മാസവും ഈ തുക അടയ്ക്കണം!' : 'Payable every month even during complete zero-sales periods!'}
                  </small>
                </div>

                <div class="loan-stats-rows">
                  <div class="stat-row">
                    <span>${isMl ? 'വാങ്ങിയ വായ്പ (Principal):' : 'Principal Loan:'}</span>
                    <strong id="gwLoanPrincipalVal">₹${this.loanAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div class="stat-row text-danger">
                    <span>${isMl ? 'ബാങ്കിന് നൽകേണ്ട അധിക പലിശ (Riba):' : 'Total Interest Surcharge:'}</span>
                    <strong id="gwLoanInterestVal">₹${loan.totalInterest.toLocaleString('en-IN')}</strong>
                  </div>
                  <div class="stat-row total-repay">
                    <span>${isMl ? 'ആകെ തിരിച്ചടയ്ക്കേണ്ട തുക:' : 'Total Cash Outflow:'}</span>
                    <strong id="gwLoanTotalVal">₹${loan.totalPayment.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <!-- Animated Debt Trap Bar Chart -->
                <div class="debt-bar-container">
                  <div style="display:flex; justify-content:space-between; font-size:0.72rem; margin-bottom:4px;">
                    <span style="color:#059669; font-weight:700;">100% Principal</span>
                    <span style="color:#dc2626; font-weight:800;" id="gwInterestPctLabel">+${loan.interestPctOfPrincipal}% ${isMl ? 'പലിശ ബാധ്യത' : 'Interest Burden'}</span>
                  </div>
                  <div class="debt-bar-track">
                    <div class="principal-bar-fill"></div>
                    <div class="interest-bar-fill" id="gwInterestBarFill" style="width:${Math.min(loan.interestPctOfPrincipal, 100)}%;"></div>
                  </div>
                </div>

                <!-- Ethical Islamic Ruling Callout -->
                <div class="halal-prohibition-box">
                  <i class="fa-solid fa-book-quran text-warning"></i>
                  <div>
                    <strong>${isMl ? 'ഇസ്ലാമിക വാണിജ്യ നീതി (Fiqh al-Mu\'amalat)' : 'Ethical Commercial Principle'}</strong>
                    <p>${isMl ? '"നിങ്ങൾ പലിശ ഭക്ഷിക്കരുത്... അത് അല്ലാഹുവിനോടും അവന്റെ റസൂലിനോടുമുള്ള യുദ്ധപ്രഖ്യാപനമാണ്." (വിശുദ്ധ ഖുർആൻ 2:275). വ്യാപാർ ശിക്ഷ ബാങ്ക് കടമില്ലാത്ത സ്വയംപര്യാപ്തതയെ പ്രോത്സാഹിപ്പിക്കുന്നു.' : 'Commercial debt interest is strictly prohibited under Islamic law. Vyapar Shiksha champions 100% cashflow-bootstrapped trading without debt traps.'}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Action -->
            <div class="gateway-footer-actions">
              <button class="btn btn-outline" onclick="archivedGateway.setStep(1)">
                <i class="fa-solid fa-arrow-left"></i> ${isMl ? 'ഘട്ടം 1 ലേക്ക്' : 'Back to Step 1'}
              </button>
              <button class="btn btn-primary" onclick="archivedGateway.setStep(3)">
                <span>${isMl ? 'ഘട്ടം 3: യോഗ്യതാ വെരിഫിക്കേഷൻ & അൺലോക്ക്' : 'Step 3: Verification & Unlock'}</span> <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        `;
      }

      // STEP 3: ENTERPRISE CHECKOUT SIMULATION & MANDATORY CONSENT
      else if (this.currentStep === 3) {
        const allChecked = this.checklist.surplusCapital && this.checklist.overheadRisks && this.checklist.tradingFirst;

        stepContentHtml = `
          <div class="gateway-step-container">
            <div class="gateway-alert-banner alert-info">
              <i class="fa-solid fa-id-card-clip gateway-alert-icon text-info"></i>
              <div>
                <strong>${isMl ? 'വ്യാവസായിക നിർമ്മാണ പ്രവേശന കവാടം' : 'Industrial Access & Capital Verification'}</strong>
                <p>${isMl ? 'ബാങ്ക് കടമില്ലാതെ സ്വന്തമായി പണം മുടക്കാൻ തയ്യാറുള്ളവർക്ക് മാത്രമേ ഈ ആർക്കൈവ് റഫറൻസുകൾ തുറക്കാൻ അനുവാദമുള്ളൂ.' : 'Only individuals with genuine surplus capital and awareness of manufacturing failure risks may proceed.'}</p>
              </div>
            </div>

            <!-- Simulated Enterprise Invoice & UPI / Razorpay Terminal Mock -->
            <div class="enterprise-terminal-card">
              <div class="terminal-header">
                <div class="terminal-brand">
                  <i class="fa-solid fa-shield-halved text-success"></i>
                  <span>${isMl ? 'എന്റർപ്രൈസ് ക്യാപിറ്റൽ ഇൻസ്പെക്ഷൻ ടെർമിനൽ' : 'Enterprise Capital Clearance Terminal'}</span>
                </div>
                <div class="terminal-badge">${isMl ? 'ഡെമോ സിമുലേഷൻ' : 'Simulation Mode'}</div>
              </div>

              <div class="terminal-body-grid">
                <div class="terminal-invoice-details">
                  <span class="inv-label">${isMl ? 'യൂണിറ്റ് പ്രോ-ഫോർമ എസ്റ്റിമേറ്റ്:' : 'Unit Pro-Forma Estimate:'}</span>
                  <div class="inv-code">EST-MCH-KL-2026-994</div>
                  <div class="inv-amount-tag">₹10,00,000 – ₹25,00,000</div>
                  <p class="inv-desc">
                    ${isMl ? 'വാണിജ്യ മെഷീൻ നിർമ്മാതാക്കൾക്ക് നേരിട്ട് നൽകേണ്ട മുൻകൂർ ഓർഡർ തുകയാണിത്. ഗൂഗിൾ പേ വഴിയോ ബാങ്ക് ട്രാൻസ്ഫർ വഴിയോ ഘട്ടംഘട്ടമായി നൽകണം.' : 'Simulated wholesale machinery booking invoice required by industrial fabricators.'}
                  </p>
                </div>

                <div class="terminal-qr-box">
                  <div class="mock-qr-code">
                    <i class="fa-solid fa-qrcode"></i>
                    <div class="qr-scan-line"></div>
                  </div>
                  <span class="qr-note"><i class="fa-brands fa-google-pay"></i> <i class="fa-solid fa-building-columns"></i> ${isMl ? 'ആവശ്യമായ സാമ്പത്തിക ശേഷി' : 'Required Capital Readiness'}</span>
                </div>
              </div>
            </div>

            <!-- Mandatory 3-Point Risk Acknowledgment -->
            <div class="risk-acknowledgment-box">
              <h5 style="margin:0 0 10px; font-size:0.95rem; color:var(--text-main);">
                <i class="fa-solid fa-signature text-primary"></i> ${isMl ? 'തുടരുന്നതിന് മുൻപുള്ള നിർബന്ധിത സമ്മതപത്രം (Tick all 3):' : 'Mandatory Declarations (Check all 3):'}
              </h5>

              <label class="gateway-checkbox-row" style="cursor: pointer;">
                <input type="checkbox" id="chkSurplusCapital" onchange="archivedGateway.toggleCheck('surplusCapital', this.checked)" onclick="archivedGateway.toggleCheck('surplusCapital', this.checked)" ${this.checklist.surplusCapital ? 'checked' : ''}>
                <span>${isMl ? '1. എന്റെ കൈവശം ബാങ്ക് വായ്പയെ ആശ്രയിക്കാതെ സ്വന്തമായി മുടക്കാൻ ആവശ്യമായ മിച്ച മൂലധനമുണ്ട്.' : '1. I have sufficient personal capital without resorting to commercial bank debt.'}</span>
              </label>

              <label class="gateway-checkbox-row" style="cursor: pointer;">
                <input type="checkbox" id="chkOverheadRisks" onchange="archivedGateway.toggleCheck('overheadRisks', this.checked)" onclick="archivedGateway.toggleCheck('overheadRisks', this.checked)" ${this.checklist.overheadRisks ? 'checked' : ''}>
                <span>${isMl ? '2. യന്ത്രങ്ങളുടെ തകരാറുകൾ, കറന്റ് ബിൽ, തൊഴിലാളി വേതനം, ഡെപ്രിസിയേഷൻ എന്നിവ മൂലമുള്ള വൻ നഷ്ടസാധ്യത ഞാൻ ബോധ്യപ്പെടുന്നു.' : '2. I acknowledge the high fixed overheads, depreciation, and failure risks of physical plants.'}</span>
              </label>

              <label class="gateway-checkbox-row" style="cursor: pointer;">
                <input type="checkbox" id="chkTradingFirst" onchange="archivedGateway.toggleCheck('tradingFirst', this.checked)" onclick="archivedGateway.toggleCheck('tradingFirst', this.checked)" ${this.checklist.tradingFirst ? 'checked' : ''}>
                <span>${isMl ? '3. തുടക്കക്കാർ ₹10,000-ൽ താഴെയുള്ള ഫിസിക്കൽ ഗുഡ്സ് ട്രേഡിംഗിൽ വിജയം കണ്ട ശേഷമേ ഇതിലേക്ക് കടക്കാവൂ എന്ന മുന്നറിയിപ്പ് ഞാൻ വായിച്ചു.' : '3. I understand the recommendation for beginners to master under-₹10,000 micro-trading first.'}</span>
              </label>
            </div>

            <!-- Final Dual Action Buttons -->
            <div class="gateway-final-actions">
              <button class="btn btn-outline btn-safe-return" onclick="archivedGateway.closeModal()">
                <i class="fa-solid fa-shield-heart text-success"></i> ${isMl ? 'സേഫായ ₹10,000 ട്രേഡിംഗ് പഠിക്കാം (ശുപാർശ ചെയ്യുന്നത്)' : 'Stay with Safe ₹10,000 Trading (Recommended)'}
              </button>
              <button class="btn btn-primary ${allChecked ? '' : 'disabled-btn'}" id="btnGatewayUnlock" onclick="archivedGateway.confirmAndUnlock()" style="cursor: pointer; opacity: ${allChecked ? '1' : '0.55'}; transition: opacity 0.3s, background 0.3s;">
                <i class="fa-solid fa-lock-open"></i> ${isMl ? 'ഞാൻ സമ്മതിക്കുന്നു; റഫറൻസ് അൺലോക്ക് ചെയ്യുക' : 'I Acknowledge Risks — Unlock Reference'}
              </button>
            </div>
          </div>
        `;
      }

      modal.innerHTML = `
        <div class="gateway-modal-box">
          <div class="gateway-modal-header">
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="gateway-header-icon"><i class="fa-solid fa-box-archive"></i></div>
              <div>
                <h3 style="margin:0; font-size:1.2rem; font-weight:800; color:#ffffff;">
                  ${isMl ? 'നിർമ്മാണ യൂണിറ്റ് റഫറൻസ് പ്രവേശന കവാടം' : isAr ? 'بوابة التحقق من المخاطر للمصانع المؤرشفة' : 'Archived Units Advisory & Risk Gateway'}
                </h3>
                <span style="font-size:0.78rem; color:rgba(255,255,255,0.85);">
                  ${isMl ? 'സാമ്പത്തിക ആസൂത്രണവും പലിശരഹിത സുതാര്യതയും' : 'Financial Reality-Check & Ethical Debt Disclosure'}
                </span>
              </div>
            </div>
            <button class="gateway-modal-close" onclick="archivedGateway.closeModal()">&times;</button>
          </div>

          <!-- Stepper Navigation -->
          <div class="gateway-stepper-bar">
            <div class="stepper-step ${this.currentStep >= 1 ? 'active' : ''} ${this.currentStep > 1 ? 'completed' : ''}" onclick="archivedGateway.setStep(1)">
              <span class="step-num">1</span> <span class="step-lbl">${isMl ? 'മൂലധന ചിലവ്' : 'Capital Scale'}</span>
            </div>
            <div class="stepper-line ${this.currentStep >= 2 ? 'active' : ''}"></div>
            <div class="stepper-step ${this.currentStep >= 2 ? 'active' : ''} ${this.currentStep > 2 ? 'completed' : ''}" onclick="archivedGateway.setStep(2)">
              <span class="step-num">2</span> <span class="step-lbl">${isMl ? 'ബാങ്ക് പലിശക്കെണി' : 'Debt & Interest'}</span>
            </div>
            <div class="stepper-line ${this.currentStep >= 3 ? 'active' : ''}"></div>
            <div class="stepper-step ${this.currentStep === 3 ? 'active' : ''}" onclick="archivedGateway.setStep(3)">
              <span class="step-num">3</span> <span class="step-lbl">${isMl ? 'വെരിഫിക്കേഷൻ & അൺലോക്ക്' : 'Clearance & Unlock'}</span>
            </div>
          </div>

          <div class="gateway-modal-body">
            ${stepContentHtml}
          </div>
        </div>
      `;
    }
  };

  global.archivedGateway = archivedGateway;

})(typeof window !== 'undefined' ? window : this);
