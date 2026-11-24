/**
 * VYAPAR SHIKSHA (സംരംഭക പാഠശാല | منصة رواد الأعمال)
 * Complete Application Logic, Trilingual Localization & Directory Data Engine
 * Features: Niche Blueprints, Profit Calculator, Wholesaler Directory,
 * Compatibility Quiz, WhatsApp Message Scripts, Legal Guide, Equipment Checklist, and FAQs.
 * Languages: English (en), Malayalam (ml), Arabic (ar)
 */

const app = {
  currentLang: 'en',
  activeCategory: 'attar',

  // Complete Trilingual Localization Dictionary
  i18n: {
    en: {
      siteTitle: "VYAPAR SHIKSHA",
      siteSubtitle: "സംരംഭക പാഠശാല • منصة الانطلاق",
      topBarTagline: "Practical Business Academy for Kerala & Pan-India Micro-Entrepreneurs",
      langCurrentText: "Language:",
      navCategories: "Business Niches",
      navQuiz: "Idea Finder Quiz",
      navSuppliers: "Wholesale Directory",
      navCalculator: "Profit Calculator",
      navTemplates: "WhatsApp Scripts",
      navLegal: "GST & Banking",
      navRoadmap: "7-Step Guide",
      navLogistics: "Courier & Rates",
      navPlanBuilder: "Generate Plan",

      heroBadge: "No Business Experience Required • 100% Free Learning Portal",
      heroHeading: 'Learn How to Start a High-Profit <span class="gradient-text">Small Business</span> in Kerala & India',
      heroDesc: "Complete practical guidance on starting small retail & Instagram businesses in India: Attar, Modest Clothing, Fashion Watches, Bags, Rings & Kerala Spices. Direct verified wholesale market locations, WhatsApp numbers, exact initial costs, profit margins, and courier breakdowns.",
      
      statMinInvest: "Min. Initial Investment",
      statMargin: "Realistic Profit Margin",
      statSuppliers: "Verified Wholesale Hubs",
      statLang: "EN • മലയാളം • العربية",

      btnExploreNiches: "Explore Business Niches",
      btnTakeQuiz: "Find Which Business Fits You",
      btnOpenCalc: "Profit Calculator",

      previewTitle: "Quick Startup Comparison",
      quickAttarTitle: "Attar & Perfume Oils",
      quickAttarInfo: "Budget: ₹3k - ₹15k • Margin: 80% - 250%",
      quickClothingTitle: "Dresses & Modest Wear",
      quickClothingInfo: "Budget: ₹10k - ₹35k • Margin: 45% - 120%",
      quickWatchTitle: "Fashion & Smartwatches",
      quickWatchInfo: "Budget: ₹8k - ₹20k • Margin: 60% - 150%",
      quickRingTitle: "Anti-Tarnish Rings & Jewelry",
      quickRingInfo: "Budget: ₹2.5k - ₹8k • Margin: 100% - 300%",
      quickBagTitle: "Canvas Totes & Handbags",
      quickBagInfo: "Budget: ₹5k - ₹18k • Margin: 60% - 180%",
      previewTip: "Tap any category to view full cost breakdown, market addresses & supplier phone numbers.",

      tagPopular: "High Margin",
      tagHighVol: "High Volume",
      tagGifts: "Great Gifts",
      tagLowRisk: "Lowest Risk",
      tagAesthetic: "Instagram Trend",

      secBadgeNiches: "Curated In-Depth Blueprints",
      secTitleNiches: "Explore Lucrative Small Business Ideas",
      secSubNiches: "Detailed breakdown for each business: minimum capital, wholesale price ranges, selling prices, profit margins, sourcing markets, and step-by-step guidance for absolute beginners.",

      tabAttar: "Attar & Perfumes",
      tabClothing: "Dresses & Boutiques",
      tabWatches: "Watches",
      tabBags: "Bags & Totes",
      tabAccessories: "Rings & Jewelry",
      tabSpices: "Kerala Spices & Honey",

      // Quiz
      quizBadge: "Personal Matchmaker",
      quizTitle: "Find Which Business Fits You in 30 Seconds",
      quizSubtitle: "Unsure where to start? Answer 3 simple questions about your budget, time, and target audience, and let our algorithm suggest the perfect micro-business.",
      q1Title: "What is your starting budget?",
      q1Opt1: "Under ₹5,000 (Micro Starter)",
      q1Opt2: "₹10,000 - ₹20,000 (Standard Brand)",
      q1Opt3: "₹40,000+ (Full Inventory / Kiosk)",
      q2Title: "How much time can you dedicate?",
      q2Opt1: "1-2 hours daily (Student / Part-time)",
      q2Opt2: "Full day / Dedicated Home Business",
      q3Title: "What type of customers do you want?",
      q3Opt1: "Perfume lovers, daily users, NRI families",
      q3Opt2: "Women, modest wear buyers, festive shoppers",
      q3Opt3: "College teens, trendy accessories, gift buyers",
      btnCalculateMatch: "Reveal My Perfect Match",

      // Calculator Strings
      calcBadge: "Real-Time Estimator",
      calcTitle: "Startup Cost & Profit Margin Calculator",
      calcSubtitle: "Plan your financial roadmap before investing a single rupee. Estimate product sourcing cost, packaging, courier delivery, online payment gateway fees, and your net monthly profit.",
      calcInputsTitle: "Your Business Parameters",
      lblCalcCategory: "Select Business Idea:",
      lblCalcCost: "Wholesale Unit Cost (₹):",
      helperCost: "Average cost per item from wholesale market",
      lblCalcPrice: "Selling Price to Customer (₹):",
      helperPrice: "Retail price on Instagram or shop",
      lblCalcPack: "Packaging & Branding per Unit (₹):",
      helperPack: "Box, bubble wrap, thank you card, sticker",
      lblCalcShip: "Courier / Shipping Cost (₹):",
      helperShip: "Kerala avg: ₹40-₹60, India avg: ₹60-₹90",
      lblCalcVol: "Estimated Monthly Units Sold:",
      helperVol: "e.g., 2 orders per day = 60 orders/month",
      lblCalcShipOpt: "Shipping Charge to Customer:",
      btnRecalcText: "Calculate Financials",
      calcResultsTitle: "Projected Earnings & Margin",
      resLblNetProfitMonth: "Estimated Monthly Net Profit",
      resLblMargin: "Profit Margin:",
      resLblPerItem: "Net Profit / Unit:",
      resLblRevenue: "Monthly Revenue",
      resLblStockCost: "Stock Purchase Cost",
      resLblTotalPackaging: "Packaging & Branding",
      resLblTotalShipping: "Net Shipping Cost",
      resLblPaymentGateway: "Payment Gateway / Bank (2%)",
      resLblStartupCap: "Initial Capital Needed for 1st Batch",
      gccConvTitle: "GCC Expat Currency Value:",
      calcProTip: "Pro Tip: Selling 2 orders per day generates over ₹14,000+ pure side income from home with zero shop rental.",

      // Directory Strings
      dirBadge: "Real Wholesale Locations",
      dirTitle: "Verified Wholesalers & Market Directory",
      dirSubtitle: "Don't know where to buy stock? Here is the exact list of genuine wholesale markets, prominent shops, addresses, and direct WhatsApp contact links in Kozhikode, Kochi, Mumbai, Surat, Tirupur, and Delhi.",
      dirSearchPlaceholder: "Search by market, shop name, city, or product...",

      // Templates
      tmplBadge: "Ready-to-Use Scripts",
      tmplTitle: "Copy-Paste WhatsApp & DM Templates",
      tmplSubtitle: "Don't know what to message wholesalers or customers? Use these battle-tested professional message scripts in Malayalam, English, and Arabic. Click to copy instantly.",

      // Legal & Banking
      legalBadge: "Government Compliance",
      legalTitle: "GST, Licenses & Banking Simplified",
      legalSubtitle: "Clear, honest truth about what legal registrations you actually need when starting small in Kerala and India.",

      // Equipment
      equipBadge: "Starter Toolkit",
      equipTitle: "Essential Equipment Checklist & Low-Cost Sourcing",
      equipSubtitle: "The only 5 tools you need at home to run a smooth professional packaging and shipping operation for under ₹1,500 total.",

      // FAQ
      faqBadge: "Got Questions?",
      faqTitle: "Frequently Asked Questions by Beginners",
      faqSubtitle: "Clear answers to common beginner doubts: overcoming fear of camera, handling broken parcels, and getting your first customer.",

      // Roadmap
      roadBadge: "Zero to First Sale",
      roadTitle: "7-Step Beginner Launch Roadmap",
      roadSubtitle: "How to start even if you have zero business background. Follow this structured roadmap to launch safely without losing money.",

      // Logistics
      logBadge: "Logistics & Shipping Mastery",
      logTitle: "Courier Charges, Delivery & Payment Gateway Fees",
      logSubtitle: "Clear breakdown of how much delivery actually costs in Kerala, across India, and to GCC countries, plus how to handle Cash on Delivery (COD) safely.",
      logRatesTitle: "Domestic & International Courier Rates",
      thService: "Service / Partner",
      thZone: "Destination Zone",
      thWeight: "Weight (Avg)",
      thRate: "Rate / Cost",
      thRemarks: "Key Advantage",
      logCodTitle: "COD Safety & Online Charges",
      tipRtoTitle: "The COD Danger: RTO (Return to Origin)",
      tipRtoDesc: "When a customer refuses COD delivery, you lose both forward and return courier charges (~₹120 total). Never ship 100% COD to strangers. Take a small token advance of ₹50 - ₹100 via UPI (Google Pay / PhonePe) to confirm seriousness!",
      tipGatewayTitle: "Payment Gateway Charges (Razorpay / Cashfree)",
      tipGatewayDesc: "Standard gateway fee is 2% + 18% GST (Net ~2.36%). On a ₹500 product, the gateway takes only ~₹11.80. Direct Google Pay / PhonePe UPI transfer has 0% fee!",
      tipGccTitle: "Shipping to Gulf (UAE, Saudi, Qatar, Oman)",
      tipGccDesc: "Huge demand for Attar, Kasavu sarees, and Kerala Spices among Malayali expats. Use India Post International EMS or local Kerala Gulf cargo agents (rates: ₹900 - ₹1,400 per kg). Attars without alcohol pass customs easily.",

      // Instagram
      instaBadge: "Social Commerce",
      instaTitle: "The Instagram Selling Playbook",
      instaSubtitle: "You don't need a fancy physical shop. Over 80% of new micro-businesses in Kerala succeed with just an Instagram page and WhatsApp catalog.",

      // Plan Builder
      planBadge: "Actionable Plan",
      planTitle: "Generate Your Personalized Business Plan",
      planSubtitle: "Input your business dream and budget to generate a customized 1-page action blueprint with recommended supplier locations, expected margin, and launch checklist.",
      lblFounderName: "Your Name / Entrepreneur Name:",
      lblPlanNiche: "Selected Business Niche:",
      lblPlanBudget: "Initial Available Capital (₹):",
      btnGenPlanText: "Generate My Plan",

      // Footer
      footerDesc: "Empowering ordinary individuals in Kerala and India to become confident, self-reliant entrepreneurs with genuine market data, supplier contacts, and practical blueprints.",
      footHeadingNiches: "Business Niches",
      footHeadingHubs: "Key Wholesale Hubs",
      footHeadingTools: "Free Interactive Tools",
      footerMotto: "Start small, think big, grow consistently."
    },

    ml: {
      siteTitle: "വ്യാപാര ശിക്ഷ",
      siteSubtitle: "സംരംഭക പാഠശാല • ബിസിനസ് ഗൈഡ്",
      topBarTagline: "കേരളത്തിലെയും ഭാരതത്തിലെയും തുടക്കക്കാർക്കുള്ള പ്രായോഗിക ബിസിനസ് പഠന വേദി",
      langCurrentText: "ഭാഷ:",
      navCategories: "ബിസിനസ് ആശയങ്ങൾ",
      navQuiz: "ഐഡിയ ഫൈൻഡർ ക്വിസ്",
      navSuppliers: "ഹോൾസെയിൽ ഡയറക്ടറി",
      navCalculator: "പ്രോഫിറ്റ് കാൽക്കുലേറ്റർ",
      navTemplates: "വാട്സ്ആപ്പ് സ്ക്രിപ്റ്റുകൾ",
      navLegal: "ജി.എസ്.ടിയും ബാങ്കിംഗും",
      navRoadmap: "7-ഘട്ട ഗൈഡ്",
      navLogistics: "കൊറിയർ & നിരക്കുകൾ",
      navPlanBuilder: "പ്ലാൻ തയ്യാറാക്കുക",

      heroBadge: "ബിസിനസ് പരിചയം ആവശ്യമില്ല • 100% സൗജന്യ പഠന വെബ്സൈറ്റ്",
      heroHeading: 'കേരളത്തിലും ഇന്ത്യയിലും മികച്ച ലാഭം നൽകുന്ന <span class="gradient-text">ചെറുകിട ബിസിനസ്</span> തുടങ്ങാം',
      heroDesc: "അത്തർ കച്ചവടം, ഡ്രസ്സുകൾ & ബോട്ടിക്, വാച്ചുകൾ, ബാഗുകൾ, മോതിരങ്ങൾ, കേരള സുഗന്ധവ്യഞ്ജനങ്ങൾ എന്നിവ എങ്ങനെ തുടങ്ങാം? യഥാർത്ഥ ഹോൾസെയിൽ മാർക്കറ്റ് ലൊക്കേഷനുകൾ, വാട്സ്ആപ്പ് നമ്പറുകൾ, മുതൽമുടക്ക്, ലാഭവിഹിതം, കൊറിയർ ചാർജുകൾ എന്നിവയുടെ സമ്പൂർണ്ണ വിവരങ്ങൾ.",
      
      statMinInvest: "കുറഞ്ഞ മുതൽമുടക്ക്",
      statMargin: "യഥാർത്ഥ ലാഭവിഹിതം",
      statSuppliers: "ഹോൾസെയിൽ മാർക്കറ്റുകൾ",
      statLang: "മലയാളം • English • العربية",

      btnExploreNiches: "ബിസിനസ് ആശയങ്ങൾ കാണുക",
      btnTakeQuiz: "ഏത് ബിസിനസ്സാണ് നിങ്ങൾക്ക് ചേരുക?",
      btnOpenCalc: "ലാഭം കണക്കാക്കുക",

      previewTitle: "ബിസിനസ് താരതമ്യം ഒറ്റനോട്ടത്തിൽ",
      quickAttarTitle: "അത്തർ & പെർഫ്യൂം ഓയിൽസ്",
      quickAttarInfo: "മുതൽമുടക്ക്: ₹3k - ₹15k • ലാഭം: 80% - 250%",
      quickClothingTitle: "വസ്ത്രങ്ങൾ & ബോട്ടിക്",
      quickClothingInfo: "മുതൽമുടക്ക്: ₹10k - ₹35k • ലാഭം: 45% - 120%",
      quickWatchTitle: "ഫാഷൻ & സ്മാർട്ട് വാച്ചുകൾ",
      quickWatchInfo: "മുതൽമുടക്ക്: ₹8k - ₹20k • ലാഭം: 60% - 150%",
      quickRingTitle: "ആന്റി-ടാർണിഷ് മോതിരങ്ങൾ & ആഭരണങ്ങൾ",
      quickRingInfo: "മുതൽമുടക്ക്: ₹2.5k - ₹8k • ലാഭം: 100% - 300%",
      quickBagTitle: "ടോട്ട് ബാഗുകൾ & വാലറ്റുകൾ",
      quickBagInfo: "മുതൽമുടക്ക്: ₹5k - ₹18k • ലാഭം: 60% - 180%",
      previewTip: "ഹോൾസെയിൽ വില, കടകളുടെ അഡ്രസ്സ്, ഫോൺ നമ്പർ എന്നിവ അറിയാൻ ഓരോ കാറ്റഗറിയിലും ക്ലിക്ക് ചെയ്യുക.",

      tagPopular: "ഉയർന്ന ലാഭം",
      tagHighVol: "കൂടുതൽ ഡിമാൻഡ്",
      tagGifts: "സമ്മാനങ്ങൾക്ക് പ്രിയം",
      tagLowRisk: "ഏറ്റവും കുറഞ്ഞ റിസ്ക്",
      tagAesthetic: "ഇൻസ്റ്റാഗ്രാം ട്രെൻഡ്",

      secBadgeNiches: "വിശദമായ ബിസിനസ് പ്ലാനുകൾ",
      secTitleNiches: "ലാഭകരമായ ബിസിനസ് ആശയങ്ങൾ പരിശോധിക്കാം",
      secSubNiches: "ഓരോ കച്ചവടത്തിന്റെയും കുറഞ്ഞ മുതൽമുടക്ക്, ഹോൾസെയിൽ വില, റീട്ടെയിൽ വിൽപന വില, ലാഭം, സാധനങ്ങൾ വാങ്ങേണ്ട മാർക്കറ്റുകൾ, തുടക്കക്കാർ ചെയ്യേണ്ട കാര്യങ്ങൾ എന്നിവ താഴെ കാണാം.",

      tabAttar: "അത്തർ & പെർഫ്യൂംസ്",
      tabClothing: "ഡ്രസ്സുകൾ & ബോട്ടിക്",
      tabWatches: "വാച്ചുകൾ",
      tabBags: "ബാഗുകൾ & വാലറ്റുകൾ",
      tabAccessories: "മോതിരങ്ങൾ & ആഭരണങ്ങൾ",
      tabSpices: "സുഗന്ധവ്യഞ്ജനങ്ങൾ & തേൻ",

      // Quiz
      quizBadge: "നിങ്ങൾക്കായുള്ള ബിസിനസ് തിരഞ്ഞെടുപ്പ്",
      quizTitle: "30 സെക്കൻഡിൽ നിങ്ങൾക്ക് അനുയോജ്യമായ ബിസിനസ് കണ്ടെത്താം",
      quizSubtitle: "എവിടെ തുടങ്ങണമെന്ന് സംശയമുണ്ടോ? ബജറ്റ്, സമയം, താല്പര്യം എന്നിവയെക്കുറിച്ചുള്ള 3 ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക; ഏറ്റവും അനുയോജ്യമായ ആശയം ഞങ്ങൾ നിർദ്ദേശിക്കാം.",
      q1Title: "നിങ്ങളുടെ കയ്യിലുള്ള പ്രാരംഭ ബജറ്റ് എത്രയാണ്?",
      q1Opt1: "₹5,000-ൽ താഴെ (ചെറിയ തുടക്കം)",
      q1Opt2: "₹10,000 - ₹20,000 (സ്റ്റാൻഡേർഡ് ബ്രാൻഡ്)",
      q1Opt3: "₹40,000+ (പൂർണ്ണ സ്റ്റോക്ക് / കിയോസ്ക്)",
      q2Title: "ഒരു ദിവസം എത്ര സമയം നൽകാൻ കഴിയും?",
      q2Opt1: "1-2 മണിക്കൂർ (വിദ്യാർത്ഥികൾ / പാർട്ട് ടൈം)",
      q2Opt2: "മുഴുവൻ സമയം (വീട്ടിലിരുന്ന് ചെയ്യുന്ന ബിസിനസ്)",
      q3Title: "ഏതുതരം കസ്റ്റമേഴ്സിനെയാണ് നിങ്ങൾ ലക്ഷ്യമിടുന്നത്?",
      q3Opt1: "സുഗന്ധം ഇഷ്ടപ്പെടുന്നവർ, നിത്യോപയോഗക്കാർ, പ്രവാസികൾ",
      q3Opt2: "യുവതികൾ, ഹിജാബ്/അബായ വാങ്ങുന്നവർ",
      q3Opt3: "കോളേജ് വിദ്യാർത്ഥികൾ, ഫാഷൻ ആഭരണങ്ങൾ, ഗിഫ്റ്റ് അന്വേഷിക്കുന്നവർ",
      btnCalculateMatch: "എനിക്ക് അനുയോജ്യമായ ബിസിനസ് കാണിക്കുക",

      // Calculator Strings
      calcBadge: "ലൈവ് കാൽക്കുലേറ്റർ",
      calcTitle: "മുതൽമുടക്കും ലാഭവും കണക്കുകൂട്ടാം",
      calcSubtitle: "പണം നിക്ഷേപിക്കുന്നതിന് മുൻപ് സാമ്പത്തിക പ്ലാൻ തയ്യാറാക്കുക. ഹോൾസെയിൽ വില, പാക്കിംഗ്, കൊറിയർ ഡെലിവറി, ഓൺലൈൻ പേയ്മെന്റ് ഗേറ്റ്‌വേ ചാർജ് എന്നിവ കഴിച്ച് കിട്ടുന്ന യഥാർത്ഥ ലാഭം അറിയാം.",
      calcInputsTitle: "നിങ്ങളുടെ ബിസിനസ് വിവരങ്ങൾ നൽകുക",
      lblCalcCategory: "ബിസിനസ് ആശയം തിരഞ്ഞെടുക്കുക:",
      lblCalcCost: "ഒരു പീസിന്റെ ഹോൾസെയിൽ വില (₹):",
      helperCost: "ഹോൾസെയിൽ മാർക്കറ്റിൽ നിന്ന് സാധനം വാങ്ങുന്ന ശരാശരി വില",
      lblCalcPrice: "ഉപഭോക്താവിന് വിൽക്കുന്ന വില (₹):",
      helperPrice: "ഇൻസ്റ്റാഗ്രാമിലോ കടയിലോ നിശ്ചയിക്കുന്ന വിൽപന വില",
      lblCalcPack: "പാക്കിംഗ് & ബ്രാൻഡിംഗ് ചെലവ് (₹):",
      helperPack: "ബോക്സ്, ബബിൾ റാപ്പ്, സ്റ്റിക്കർ, താങ്ക്യു കാർഡ്",
      lblCalcShip: "കൊറിയർ / ഷിപ്പിംഗ് ചെലവ് (₹):",
      helperShip: "കേരളത്തിൽ ശരാശരി ₹40-₹60, അഖിലേന്ത്യാ തലത്തിൽ ₹60-₹90",
      lblCalcVol: "പ്രതിമാസം വിൽക്കാൻ ഉദ്ദേശിക്കുന്ന എണ്ണം:",
      helperVol: "ഉദാഹരണത്തിന്, ദിവസവും 2 ഓർഡർ = മാസത്തിൽ 60 എണ്ണം",
      lblCalcShipOpt: "ഷിപ്പിംഗ് ചാർജ് ആര് നൽകും:",
      btnRecalcText: "ലാഭം കണക്കുകൂട്ടുക",
      calcResultsTitle: "പ്രതീക്ഷിക്കുന്ന മാസവരുമാനവും ലാഭവും",
      resLblNetProfitMonth: "പ്രതിമാസ അറ്റാദായം (Net Profit)",
      resLblMargin: "ലാഭവിഹിതം (Profit Margin):",
      resLblPerItem: "ഒരു പീസിൽ ലഭിക്കുന്ന ലാഭം:",
      resLblRevenue: "ആകെ മാസ വിറ്റുവരവ്",
      resLblStockCost: "സാധനങ്ങൾ വാങ്ങാനുള്ള തുക",
      resLblTotalPackaging: "പാക്കിംഗ് & ബ്രാൻഡിംഗ് ചെലവ്",
      resLblTotalShipping: "ആകെ കൊറിയർ ചെലവ്",
      resLblPaymentGateway: "ഓൺലൈൻ ഗേറ്റ്‌വേ / ബാങ്ക് ചാർജ് (2%)",
      resLblStartupCap: "ആദ്യ ഓർഡർ ബാച്ചിന് ആവശ്യമായ മൂലധനം",
      gccConvTitle: "ഗൾഫ് കറൻസിയിലെ മൂല്യം (GCC Value):",
      calcProTip: "പ്രധാന സൂചന: വീട്ടിലിരുന്ന് പ്രതിദിനം വെറും 2 ഓർഡർ അയച്ചാൽ പോലും വാടകയില്ലാതെ ₹14,000-ൽ അധികം ലാഭം കണ്ടെത്താം.",

      // Directory Strings
      dirBadge: "യഥാർത്ഥ മാർക്കറ്റുകൾ",
      dirTitle: "ഹോൾസെയിൽ വ്യാപാരികളുടെ ഡയറക്ടറി",
      dirSubtitle: "എവിടെ നിന്ന് സ്റ്റോക്ക് വാങ്ങണമെന്ന് അറിയാത്തവർക്കായി കോഴിക്കോട്, കൊച്ചി, മുംബൈ, സൂററ്റ്, തിരുപ്പൂർ, ഡൽഹി എന്നിവിടങ്ങളിലെ പ്രമുഖ ഹോൾസെയിൽ കടകളുടെ വിലാസവും വാട്സ്ആപ്പ് നമ്പറുകളും.",
      dirSearchPlaceholder: "മാർക്കറ്റ്, കടയുടെ പേര്, നഗരം, അല്ലെങ്കിൽ ഉൽപ്പന്നം തിരയുക...",

      // Templates
      tmplBadge: "റെഡിമെയ്ഡ് സന്ദേശങ്ങൾ",
      tmplTitle: "കോപ്പി-പേസ്റ്റ് ചെയ്യാവുന്ന വാട്സ്ആപ്പ് സന്ദേശങ്ങൾ",
      tmplSubtitle: "വ്യാപാരികൾക്കോ കസ്റ്റമേഴ്സിനോ എന്ത് മെസ്സേജ് അയക്കണമെന്ന് സംശയമുണ്ടോ? താഴെ നൽകിയിട്ടുള്ള പ്രൊഫഷണൽ സന്ദേശങ്ങൾ ഒറ്റ ക്ലിക്കിൽ കോപ്പി ചെയ്ത് ഉപയോഗിക്കാം.",

      // Legal & Banking
      legalBadge: "നിയമപരമായ കാര്യങ്ങൾ",
      legalTitle: "ജി.എസ്.ടിയും ബിസിനസ് ബാങ്കിംഗും ലളിതമായി",
      legalSubtitle: "ചെറിയ തോതിൽ ബിസിനസ്സ് തുടങ്ങുമ്പോൾ യഥാർത്ഥത്തിൽ എന്തൊക്കെ ലൈസൻസുകൾ വേണം? ഭയപ്പെടാതെ വ്യക്തമായി മനസ്സിലാക്കുക.",

      // Equipment
      equipBadge: "ആവശ്യമായ ഉപകരണങ്ങൾ",
      equipTitle: "പാക്കിംഗിന് ആവശ്യമായ 5 സാധനങ്ങൾ",
      equipSubtitle: "വീട്ടിലിരുന്ന് പ്രൊഫഷണലായി പാക്ക് ചെയ്യാനും അയക്കാനും വെറും ₹1,500-ൽ താഴെ ചെലവിൽ വാങ്ങാവുന്ന സാധനങ്ങൾ.",

      // FAQ
      faqBadge: "പതിവുചോദ്യങ്ങൾ",
      faqTitle: "തുടക്കക്കാർ ചോദിക്കുന്ന സംശയങ്ങളും ഉത്തരങ്ങളും",
      faqSubtitle: "ക്യാമറയെ പേടിയുള്ളവർക്ക് എങ്ങനെ ചെയ്യാം, കൊറിയർ നഷ്ടപ്പെട്ടാൽ എന്ത് ചെയ്യണം തുടങ്ങിയ നിങ്ങളുടെ എല്ലാ ആശങ്കകൾക്കുമുള്ള മറുപടി.",

      // Roadmap
      roadBadge: "തുടക്കം മുതൽ ആദ്യ വിൽപന വരെ",
      roadTitle: "തുടക്കക്കാർക്കുള്ള 7-ഘട്ട ലോഞ്ച് ഗൈഡ്",
      roadSubtitle: "ബിസിനസിനെക്കുറിച്ച് ഒന്നുമറിയാത്ത ഒരാൾക്കും നഷ്ടമില്ലാതെ സംരംഭം തുടങ്ങാൻ സഹായിക്കുന്ന സുരക്ഷിതമായ മാർഗ്ഗരേഖ.",

      // Logistics
      logBadge: "കൊറിയർ & ഷിപ്പിംഗ് ഗൈഡ്",
      logTitle: "കൊറിയർ നിരക്കുകൾ, ഡെലിവറി & ഓൺലൈൻ ചാർജുകൾ",
      logSubtitle: "കേരളത്തിനകത്തും ഇന്ത്യയിലുടനീളവും ഗൾഫ് രാജ്യങ്ങളിലേക്കും പാർസൽ അയക്കാൻ എത്ര ചെലവ് വരും? ക്യാഷ് ഓൺ ഡെലിവറി (COD) എങ്ങനെ സുരക്ഷിതമായി ചെയ്യാം?",
      logRatesTitle: "ആഭ്യന്തര & അന്താരാഷ്ട്ര കൊറിയർ നിരക്കുകൾ",
      thService: "കൊറിയർ സർവീസ്",
      thZone: "ലൊക്കേഷൻ സോൺ",
      thWeight: "ശരാശരി ഭാരം",
      thRate: "ചാർജ് / നിരക്ക്",
      thRemarks: "പ്രധാന നേട്ടം",
      logCodTitle: "COD സുരക്ഷ & ഓൺലൈൻ ചാർജ് വിവരങ്ങൾ",
      tipRtoTitle: "COD ചതിക്കുഴികൾ: ആർ.ടി.ഒ (Return to Origin)",
      tipRtoDesc: "കസ്റ്റമർ സാധനം കൈപ്പറ്റാതെ തിരിച്ചയച്ചാൽ അയക്കാനും തിരികെ വരാനുമുള്ള കൊറിയർ ചാർജ് (~₹120) നിങ്ങളുടെ കയ്യിൽ നിന്ന് പോകും. അതിനാൽ അജ്ഞാതരായ കസ്റ്റമേഴ്സിന് 100% COD നൽകരുത്. ഗൂഗിൾ പേ വഴി ₹50 എങ്കിലും അഡ്വാൻസ് വാങ്ങി ഉറപ്പാക്കുക!",
      tipGatewayTitle: "പേയ്‌മെന്റ് ഗേറ്റ്‌വേ ചാർജുകൾ (Razorpay / Cashfree)",
      tipGatewayDesc: "സാധാരണ ഗേറ്റ്‌വേ ഫീസ് 2% + ജി.എസ്.ടി ആണ്. ₹500 ന്റെ സാധനത്തിന് ഏകദേശം ₹11.80 മാത്രമാണ് അവർ ഈടാക്കുക. എന്നാൽ നേരിട്ടുള്ള Google Pay / PhonePe UPI അയക്കുമ്പോൾ 0% ചാർജ്!",
      tipGccTitle: "ഗൾഫിലേക്ക് (യു.എ.ഇ, സൗദി, ഖത്തർ, ഒമാൻ) സാധനങ്ങൾ അയക്കാം",
      tipGccDesc: "അത്തറുകൾ, വസ്ത്രങ്ങൾ, കേരള സ്പൈസസ് എന്നിവയ്ക്ക് പ്രവാസികൾക്കിടയിൽ വലിയ ഡിമാൻഡ് ഉണ്ട്. ഇന്ത്യ പോസ്റ്റ് ഇ.എം.എസ് അല്ലെങ്കിൽ പ്രാദേശിക ഗൾഫ് കാർഗോ വഴിയും അയക്കാം (കിലോയ്ക്ക് ₹900 - ₹1,400). ആൽക്കഹോൾ ഇല്ലാത്ത അത്തറുകൾ കസ്റ്റംസ് പരിശോധനയെ സുഗമമായി അതിജീവിക്കും.",

      // Instagram
      instaBadge: "സോഷ്യൽ മീഡിയ വിൽപന",
      instaTitle: "ഇൻസ്റ്റാഗ്രാം ബിസിനസ്സ് ആരംഭിക്കുന്നതിനുള്ള തന്ത്രങ്ങൾ",
      instaSubtitle: "കടമുറികൾക്ക് ലക്ഷങ്ങൾ അഡ്വാൻസ് നൽകേണ്ടതില്ല. കേരളത്തിലെ പുതിയ 80% ചെറുകിട സംരംഭകരും ഇൻസ്റ്റാഗ്രാം പേജും വാട്സ്ആപ്പ് കാറ്റലോഗും വഴിയാണ് വിജയിക്കുന്നത്.",

      // Plan Builder
      planBadge: "പ്രായോഗിക പ്ലാൻ",
      planTitle: "നിങ്ങളുടെ ബിസിനസ് പ്ലാൻ ജനറേറ്റ് ചെയ്യുക",
      planSubtitle: "നിങ്ങളുടെ പേരും ബജറ്റും തിരഞ്ഞെടുക്കുക; സപ്ലയർ വിവരങ്ങളും മാർക്കറ്റിംഗ് ടിപ്പുകളും അടങ്ങിയ സമഗ്രമായ ബിസിനസ് പ്ലാൻ ഇവിടെ തയ്യാറാക്കാം.",
      lblFounderName: "നിങ്ങളുടെ പേര് / സംരംഭകന്റെ പേര്:",
      lblPlanNiche: "തിരഞ്ഞെടുത്ത ബിസിനസ്സ്:",
      lblPlanBudget: "കയ്യിലുള്ള പ്രാരംഭ തുക (₹):",
      btnGenPlanText: "എന്റെ ബിസിനസ് പ്ലാൻ കാണുക",

      // Footer
      footerDesc: "കേരളത്തിലും ഭാരതത്തിലുമുള്ള ഏതൊരാൾക്കും സ്വന്തമായി ബിസിനസ്സ് തുടങ്ങി സാമ്പത്തിക സ്വാതന്ത്ര്യം നേടാൻ സഹായിക്കുന്ന സൗജന്യ വിജ്ഞാന വേദി.",
      footHeadingNiches: "ബിസിനസ് ആശയങ്ങൾ",
      footHeadingHubs: "പ്രധാന ഹോൾസെയിൽ കേന്ദ്രങ്ങൾ",
      footHeadingTools: "സൗജന്യ ടൂളുകൾ",
      footerMotto: "ചെറുതായി തുടങ്ങുക, വലുതായി ചിന്തിക്കുക, സ്ഥിരതയോടെ വളരുക."
    },

    ar: {
      siteTitle: "أكاديمية رواد الأعمال",
      siteSubtitle: "منصة دراسة وإطلاق المشاريع في الهند وكيرالا",
      topBarTagline: "أكاديمية تدريبية وعملية لإطلاق المشاريع الصغيرة والتجارة الإلكترونية في الهند",
      langCurrentText: "اللغة:",
      navCategories: "المشاريع التجارية",
      navQuiz: "اختبار فكرة المشروع",
      navSuppliers: "دليل تجار الجملة",
      navCalculator: "حاسبة الأرباح",
      navTemplates: "قوالب الواتساب",
      navLegal: "الضرائب والبنوك",
      navRoadmap: "خارطة الطريق 7 خطوات",
      navLogistics: "الشحن والأسعار",
      navPlanBuilder: "إنشاء خطة العمل",

      heroBadge: "لا تشترط أي خبرة مسبقة • منصة تعليمية وتطبيقية مجانية 100%",
      heroHeading: 'تعلم كيف تؤسس <span class="gradient-text">مشروعاً تجارياً عالي الربح</span> في الهند وكيرالا',
      heroDesc: "دليل تطبيقي شامل لإنشاء المتاجر ومشاريع إنستغرام: تجارة دهن العود والعطور الزيتية، العبايات والملابس، الساعات الفاخرة، الحقائب، الخواتم الفضية والبهارات الطبيعية. عناوين أسواق الجملة، أرقام الواتساب، تكاليف البداية وهوامش الأرباح الحقيقية.",
      
      statMinInvest: "أقل رأس مال للبدء",
      statMargin: "هامش الربح الواقعي",
      statSuppliers: "أسواق الجملة المعتمدة",
      statLang: "العربية • English • മലയാളം",

      btnExploreNiches: "استكشف أفكار المشاريع",
      btnTakeQuiz: "اكتشف المشروع الأنسب لك",
      btnOpenCalc: "حاسبة الأرباح",

      previewTitle: "مقارنة المشاريع في لمحة واحدة",
      quickAttarTitle: "دهن العود والعطور الزيتية",
      quickAttarInfo: "الميزانية: ₹3,000 - ₹15,000 • الربح: 80% - 250%",
      quickClothingTitle: "العبايات والملابس النسائية",
      quickClothingInfo: "الميزانية: ₹10,000 - ₹35,000 • الربح: 45% - 120%",
      quickWatchTitle: "الساعات الفاخرة والذكية",
      quickWatchInfo: "الميزانية: ₹8,000 - ₹20,000 • الربح: 60% - 150%",
      quickRingTitle: "الخواتم والإكسسوارات الفضية",
      quickRingInfo: "الميزانية: ₹2,500 - ₹8,000 • الربح: 100% - 300%",
      quickBagTitle: "الحقائب اليدوية والمحافظ",
      quickBagInfo: "الميزانية: ₹5,000 - ₹18,000 • الربح: 60% - 180%",
      previewTip: "انقر على أي تصنيف لمعرفة تفاصيل التكلفة وعناوين المحلات وأرقام التواصل المباشر.",

      tagPopular: "أعلى هامش ربح",
      tagHighVol: "طلب مستمر",
      tagGifts: "مثالي للهدايا",
      tagLowRisk: "أقل مخاطرة",
      tagAesthetic: "رائج على إنستغرام",

      secBadgeNiches: "خطط مشاريع تفصيلية",
      secTitleNiches: "استكشف أكثر الأنشطة التجارية ربحية",
      secSubNiches: "تحليل اقتصادي دقيق لكل مشروع: الحد الأدنى لرأس المال، أسعار الجملة، أسعار البيع بالتجزئة، هوامش الربح، وأهم أسواق ومصانع التوريد في الهند.",

      tabAttar: "العطور ودهن العود",
      tabClothing: "الملابس والعبايات",
      tabWatches: "الساعات",
      tabBags: "الحقائب والمحافظ",
      tabAccessories: "الخواتم والإكسسوارات",
      tabSpices: "بهارات كيرالا والعسل",

      // Quiz
      quizBadge: "موفق المشاريع الذكي",
      quizTitle: "اكتشف المشروع الأنسب لك في 30 ثانية",
      quizSubtitle: "هل أنت متردد في اختيار البداية؟ أجب عن 3 أسئلة بسيطة حول ميزانيتك ووقتك المتاح، ودع النظام يقترح عليك المشروع الأمثل فوراً.",
      q1Title: "كم يبلغ رأس المال المتاح للبدء؟",
      q1Opt1: "أقل من 5,000 روبية (بداية تجريبية متواضعة)",
      q1Opt2: "بين 10,000 إلى 20,000 روبية (علامة تجارية أنيقة)",
      q1Opt3: "أكثر من 40,000 روبية (مخزون وافر / منصة بيع متكاملة)",
      q2Title: "كم من الوقت يمكنك تخصيصه يومياً؟",
      q2Opt1: "ساعة إلى ساعتين (للطلاب والموظفين)",
      q2Opt2: "تفرغ كامل من المنزل",
      q3Title: "ما هي الشريحة التي تفضل البيع لها؟",
      q3Opt1: "عشاق العطور الراقية والأسر والمغتربين",
      q3Opt2: "النساء والفتيات والأزياء المحتشمة",
      q3Opt3: "طالبات الجامعات، الإكسسوارات وهدايا الشباب",
      btnCalculateMatch: "أظهر لي المشروع الأنسب",

      // Calculator Strings
      calcBadge: "مقدر الأرباح الفوري",
      calcTitle: "حاسبة تكاليف المشروع وصافي الأرباح",
      calcSubtitle: "خطط بدقة قبل استثمار روبية واحدة. قدر تكلفة البضائع بالجملة، التغليف الفاخر، تكاليف الشحن السريع، رسوم بوابات الدفع الإلكتروني، وصافي دخلك الشهري.",
      calcInputsTitle: "معايير وحسابات مشروعك",
      lblCalcCategory: "اختر نوع المشروع:",
      lblCalcCost: "تكلفة القطعة الواحدة بالجملة (₹):",
      helperCost: "متوسط السعر من أسواق الجملة أو المصنع مباشرة",
      lblCalcPrice: "سعر البيع للزبون (₹):",
      helperPrice: "سعر العرض على متجرك في إنستغرام أو متجرك المحلي",
      lblCalcPack: "تكلفة التغليف للقطعة (₹):",
      helperPack: "علبة فاخرة، بطاقة شكر، ملصق وشريط حماية",
      lblCalcShip: "تكلفة الشحن والتوصيل (₹):",
      helperShip: "كيرالا: ₹40-₹60، عموم الهند: ₹60-₹90",
      lblCalcVol: "العدد المتوقع بيعه شهرياً:",
      helperVol: "مثال: طلبيتان يومياً = 60 قطعة شهرياً",
      lblCalcShipOpt: "من يدفع رسوم الشحن:",
      btnRecalcText: "احسب النتائج المالية",
      calcResultsTitle: "العوائد والأرباح الشهرية المتوقعة",
      resLblNetProfitMonth: "صافي الربح الشهري المتوقع",
      resLblMargin: "هامش الربح الإجمالي:",
      resLblPerItem: "صافي ربح القطعة الواحدة:",
      resLblRevenue: "إجمالي المبيعات الشهرية",
      resLblStockCost: "تكلفة شراء المخزون",
      resLblTotalPackaging: "مصاريف التغليف والهوية",
      resLblTotalShipping: "تكاليف الشحن الصافية",
      resLblPaymentGateway: "رسوم بوابة الدفع الإلكتروني (2%)",
      resLblStartupCap: "رأس المال التشغيلي للدفعة الأولى",
      gccConvTitle: "القيمة بعملات دول الخليج:",
      calcProTip: "نصيحة ذهبية: بيع طلبيتين فقط يومياً من منزلك يحقق لك دخلاً إضافياً صافياً يتجاوز 14,000 روبية شهرياً بدون إيجار محل.",

      // Directory Strings
      dirBadge: "عناوين حقيقية وموثقة",
      dirTitle: "دليل تجار الجملة والأسواق الكبرى",
      dirSubtitle: "لا تعرف من أين تشتري بضائعك؟ إليك القائمة الموثقة لأسواق الجملة الشهيرة والمحلات المعتمدة في كوزيكود، كوتشي، مومباي، سورات، تيروبور ونيودلهي مع روابط واتساب مباشرة.",
      dirSearchPlaceholder: "ابحث باسم السوق، المتجر، المدينة، أو نوع البضاعة...",

      // Templates
      tmplBadge: "رسائل جاهزة للاستخدام",
      tmplTitle: "قوالب رسائل واتساب الاحترافية الجاهزة",
      tmplSubtitle: "متردد في كيفية مراسلة الموردين أو الرد على الزبائن؟ استخدم هذه النماذج المنسقة بنقرة زر واحدة للنسخ الفوري.",

      // Legal & Banking
      legalBadge: "الأنظمة الحكومية",
      legalTitle: "الضرائب والتراخيص والحسابات البنكية ببساطة",
      legalSubtitle: "الحقيقة القانونية المباشرة حول التراخيص والضرائب المطلوبة فعلياً عند بدء مشروعك الصغير دون تعقيد.",

      // Equipment
      equipBadge: "حقيبة البداية",
      equipTitle: "قائمة الأدوات والتغليف الأساسية في المنزل",
      equipSubtitle: "5 أدوات ومواد بسيطة تمنح طرودك مظهراً احترافياً بتكلفة لا تتجاوز 1500 روبية.",

      // FAQ
      faqBadge: "أسئلة وإجابات",
      faqTitle: "الأسئلة الأكثر شيوعاً بين المبتدئين",
      faqSubtitle: "إجابات شافية حول مخاوف الظهور أمام الكاميرا، كيفية التعامل مع الطرود التالفة، والحصول على الزبون الأول.",

      // Roadmap
      roadBadge: "من الصفر إلى أول بيعة",
      roadTitle: "خارطة طريق المبتدئين في 7 خطوات",
      roadSubtitle: "كيف تنطلق حتى لو لم تكن لديك أي خبرة سابقة في التجارة، مع تفادي خسارة الأموال وبناء ثقة العملاء.",

      // Logistics
      logBadge: "دليل الشحن والخدمات اللوجستية",
      logTitle: "أسعار الشحن والتوصيل ورسوم الدفع الإلكتروني",
      logSubtitle: "تفصيل تكاليف التوصيل السريع داخل ولاية كيرالا، وعموم الهند، والشحن الدولي لدول الخليج، وكيفية التعامل مع الدفع عند الاستلام (COD) بأمان.",
      logRatesTitle: "جدول أسعار شركات الشحن المحلية والدولية",
      thService: "شركة الشحن",
      thZone: "النطاق الجغرافي",
      thWeight: "الوزن التقريبي",
      thRate: "سعر الشحن",
      thRemarks: "الميزة الأساسية",
      logCodTitle: "أمان الدفع عند الاستلام ورسوم البوابات",
      tipRtoTitle: "مخاطر الدفع عند الاستلام (RTO)",
      tipRtoDesc: "عندما يرفض الزبون استلام الشحنة، تتحمل أنت تكلفة الذهاب والإياب (~₹120). لا تشحن بالدفع عند الاستلام لزبائن جدد دون تحصيل عربون رمزي (50-100 روبية) عبر Google Pay أو UPI لتأكيد جديتهم!",
      tipGatewayTitle: "رسوم بوابات الدفع الإلكتروني (Razorpay / Cashfree)",
      tipGatewayDesc: "النسبة المعيارية للبوابات هي 2% + ضريبة (حوالي 2.36%). على منتج قيمته ₹500 تخصم البوابة قرابة ₹11.80 فقط. التحويل المباشر عبر UPI مجاني 0%!",
      tipGccTitle: "الشحن إلى دول الخليج (الإمارات، السعودية، قطر، عمان)",
      tipGccDesc: "هناك طلب هائل على دهن العود، والملابس التقليدية وبهارات كيرالا بين المغتربين. يمكن الشحن عبر البريد الهندي السريع (EMS) أو مكاتب الشحن الجوي الخليجية (بين 900 إلى 1400 روبية للكيلوغرام). العطور الخالية من الكحول تعبر الجمارك بسهولة.",

      // Instagram
      instaBadge: "التجارة عبر شبكات التواصل",
      instaTitle: "دليل البيع الاحترافي عبر إنستغرام",
      instaSubtitle: "لست بحاجة إلى استئجار محل باهظ الثمن. أكثر من 80% من المشاريع الناشئة في كيرالا تدار بنجاح من خلال حساب إنستغرام وكتالوج واتساب للأعمال.",

      // Plan Builder
      planBadge: "خطة مخصصة",
      planTitle: "أنشئ خطة عملك الاستراتيجية الخاصة",
      planSubtitle: "أدخل اسمك وميزانيتك المتاحة للحصول على خطة عمل مفصلة من صفحة واحدة تحتوي على أسواق التوريد الموصى بها، الأرباح المتوقعة، وقائمة المهام الأولية.",
      lblFounderName: "اسمك / اسم رائد الأعمال:",
      lblPlanNiche: "المشروع المختار:",
      lblPlanBudget: "رأس المال المتاح للبدء (₹):",
      btnGenPlanText: "أنشئ خطة مشروعي الآن",

      // Footer
      footerDesc: "مبادرة معرفية مفتوحة لتمكين الأفراد والشباب في كيرالا والهند من تأسيس مشاريعهم الخاصة والوصول إلى الاستقلال المالي بمعلومات دقيقة وموثوقة.",
      footHeadingNiches: "المشاريع التجارية",
      footHeadingHubs: "أسواق الجملة الكبرى",
      footHeadingTools: "أدوات تفاعلية مجانية",
      footerMotto: "ابدأ صغيراً، فكر كبيراً، واستمر بالنمو بثبات."
    }
  },

  // Category blueprints
  categoriesData: {
    attar: {
      id: "attar",
      title: { en: "Attar & Artisanal Perfume Business", ml: "അത്തർ & പെർഫ്യൂം കച്ചവടം", ar: "تجارة دهن العود والعطور الزيتية الخالصة" },
      tagline: { en: "Highest profit margin niche in Kerala & India. Start with just ₹3,000.", ml: "കേരളത്തിൽ ഏറ്റവും കൂടുതൽ ലാഭം നൽകുന്ന കച്ചവടം. ₹3,000 ഉണ്ടെങ്കിൽ തുടങ്ങാം.", ar: "أعلى هامش ربحي في كيرالا والهند. يمكنك الانطلاق بمبلغ يبدأ من 3000 روبية فقط." },
      minBudget: "₹3,000 - ₹12,000",
      margin: "80% - 250%",
      topSellers: [
        { name: { en: "White Musk (مسك أبيض)", ml: "വൈറ്റ് മസ്ക് (White Musk)", ar: "المسك الأبيض الملكي" }, wholesale: "₹180 / 100ml", retail: "₹350 / 12ml roll-on (Cost per bottle ~₹35! Profit ~₹315)" },
        { name: { en: "Shamamatul Amber", ml: "ശമാമത്തുൽ അംബർ (Shamama)", ar: "شمامة العنبر الأصلي" }, wholesale: "₹450 / 100ml", retail: "₹500 / 12ml roll-on" },
        { name: { en: "Blended Arabic Oudh", ml: "അറബിക് ഔദ് ബ്ലെൻഡ്", ar: "خلطات العود العربي" }, wholesale: "₹350 / 50ml", retail: "₹650 - ₹1,200 / 12ml" },
        { name: { en: "Designer Clones (Sauvage / Baccarat 540)", ml: "ഫ്രഞ്ച് ഡിസൈനർ ക്ലോൺസ്", ar: "بدائل العطور العالمية الشهيرة" }, wholesale: "₹250 - ₹380 / 100ml", retail: "₹450 - ₹750 / 12ml" }
      ],
      steps: {
        en: [
          "Buy 5 best-selling 100ml mother oils (White Musk, Shamama, Amber, Oudh Blend, French Clone).",
          "Order 50 pcs of 6ml or 12ml empty octagonal/crystal roll-on bottles (Cost: ₹8 - ₹15 each) from Crawford Market or Kozhikode.",
          "Design simple luxury stickers with your brand name using Canva (Print 100 waterproof vinyl stickers locally for ₹150).",
          "Package each bottle with a black velvet pouch (₹5 each) and a complimentary scent strip.",
          "Post short aesthetic reels on Instagram showcasing scent longevity, notes, and prayer-safe 100% alcohol-free purity."
        ],
        ml: [
          "ഏറ്റവും കൂടുതൽ ഡിമാൻഡുള്ള 5 ഓയിലുകൾ (വൈറ്റ് മസ്ക്, ശമാമ, അംബർ, ഔദ്, ഫ്രഞ്ച് ക്ലോൺ) 100ml വീതം വാങ്ങുക.",
          "50 എണ്ണം 6ml അല്ലെങ്കിൽ 12ml ക്രിസ്റ്റൽ റോൾ-ഓൺ കുപ്പികൾ വാങ്ങുക (ഒരു കുപ്പിക്ക് ₹8 - ₹15 മാത്രം ചെലവ്).",
          "കാൻവ (Canva) ഉപയോഗിച്ച് നിങ്ങളുടെ ബ്രാൻഡ് ലോഗോ ഡിസൈൻ ചെയ്ത് ₹150 ന് 100 വാട്ടർപ്രൂഫ് സ്റ്റിക്കറുകൾ പ്രിന്റ് ചെയ്യുക.",
          "ഓരോ കുപ്പിയും ചെറിയ വെൽവെറ്റ് പൗച്ചിൽ (₹5) മനോഹരമായി പാക്ക് ചെയ്യുക. ഒരു ഫ്രീ സെന്റ് സ്ട്രിപ്പ് കൂടി ഒപ്പം നൽകുക.",
          "100% ആൽക്കഹോൾ ഫ്രീ ആണെന്നും നിസ്കാരത്തിന് ഉപയോഗിക്കാമെന്നും കാണിക്കുന്ന റീലുകൾ ഇൻസ്റ്റാഗ്രാമിൽ പോസ്റ്റ് ചെയ്യുക."
        ],
        ar: [
          "ابدأ بشراء 5 أنواع زيوت مركزة الأكثر طلباً (المسك الأبيض، شمامة العنبر، خلطات العود، بديل عطر عالمي) عبوات 100 مل.",
          "اشترِ 50 حبة من زجاجات التول والكريستال الأنيقة 6 مل أو 12 مل (تكلفة الحبة بين 8 إلى 15 روبية).",
          "صمم شعار علامتك وملصقات مقاومة للماء بتكلفة بسيطة من مطبعة محلية أو عبر كانفا.",
          "ضع كل زجاجة في كيس مخملي أنيق صغير (تكلفته 5 روبيات) مع بطاقة إهداء وعينة عطرية إضافية مجانية.",
          "انشر مقاطع فيديو قصيرة تؤكد خلو الزيت من الكحول وثباته العالي وطابعه الملكي."
        ]
      },
      markets: [
        "Kozhikode S.M. Street (Mittayi Theruvu) & Big Bazaar",
        "Mumbai Mohammad Ali Road & Nakhuda Mohalla",
        "Mumbai Crawford Market (Abdul Rehman St) for empty bottles & packaging",
        "Kannauj (UP) - India's ancient perfume capital for pure Mitti & Ruh Khus"
      ]
    },

    clothing: {
      id: "clothing",
      title: { en: "Dresses, Modest Wear & Instagram Boutique", ml: "വസ്ത്രങ്ങൾ & ഓൺലൈൻ ബോട്ടിക് കച്ചവടം", ar: "تجارة العبايات والفساتين والأزياء النسائية" },
      tagline: { en: "High volume daily necessity. Modest Abayas, Hijabs, Kurtis & Casual wear.", ml: "ദൈനംദിന ആവശ്യമായതിനാൽ ഉയർന്ന വിറ്റുവരവ്. അബായ, ഹിജാബ്, കുർത്തീസ്, കാഷ്വൽ ഡ്രസ്സുകൾ.", ar: "سلعة أساسية بطلب يومي متكرر. تشمل العبايات الخليجية، الحجاب، الكورتي والملابس العصرية." },
      minBudget: "₹10,000 - ₹35,000",
      margin: "45% - 120%",
      topSellers: [
        { name: { en: "Dubai Crepe / Nada Modest Abayas", ml: "ദുബായ് ക്രേപ്പ് / നദ അബായകൾ", ar: "عبايات قماش الكريب والندى الفاخر" }, wholesale: "₹450 - ₹750 / piece (Surat / Mumbai)", retail: "₹1,399 - ₹2,499 (Online selling price)" },
        { name: { en: "Cotton Daily Wear Kurtis (Set of 4)", ml: "ഡെയ്‌ലി വെയർ കോട്ടൺ കുർത്തീസ്", ar: "كورتي قطني كاجوال للاستخدام اليومي" }, wholesale: "₹160 - ₹280 / piece", retail: "₹499 - ₹799 / piece" },
        { name: { en: "Korean Chiffon Hijabs & Stoles", ml: "കൊറിയൻ ഷിഫോൺ ഹിജാബുകൾ", ar: "شالات وطرح شيفون كوري مميز" }, wholesale: "₹45 - ₹80 / piece", retail: "₹199 - ₹299 / piece" },
        { name: { en: "Oversized 240 GSM Cotton T-Shirts", ml: "ഓവർസൈസ്ഡ് കോട്ടൺ ടീ-ഷർട്ടുകൾ", ar: "تيشيرتات قطنية شبابية أوفرسايز" }, wholesale: "₹140 - ₹190 (Tirupur direct)", retail: "₹599 - ₹899" }
      ],
      steps: {
        en: [
          "Decide your micro-niche: Don't sell everything. Focus either on Modest Wear (Abayas/Hijabs) OR Casual College wear.",
          "Sourcing without traveling: Connect via WhatsApp with verified Surat Millennium Market or Tirupur manufacturers (MOQ 15-20 pcs).",
          "Photography is 90% of sales: Take clean photos in natural daylight against a minimalist plain wall. Use a simple ring light.",
          "Provide exact measurements (Bust, Length, Sleeve) in your caption to avoid customer returns.",
          "Ship inside frosted zip-lock slider bags with your brand sticker. Creates a premium feel."
        ],
        ml: [
          "നിങ്ങളുടെ കൃത്യമായ കാറ്റഗറി തിരഞ്ഞെടുക്കുക: എല്ലാം കൂടി വിൽക്കാതെ അബായകൾ/ഹിജാബ് അല്ലെങ്കിൽ കോളേജ് കാഷ്വൽ ഡ്രസ്സ് എന്നിവയിൽ ഒന്നിൽ കേന്ദ്രീകരിക്കുക.",
          "നേരിട്ട് യാത്ര ചെയ്യാതെ തന്നെ സൂററ്റിലെയും തിരുപ്പൂരിലെയും വ്യാപാരികളിൽ നിന്ന് വാട്സ്ആപ്പ് വഴി സാമ്പിളുകൾ ഓർഡർ ചെയ്യാം (15-20 പീസുകൾ).",
          "ഫോട്ടോഗ്രാഫിയിലാണ് 90% വിജയവും: നല്ല വെളിച്ചമുള്ളിടത്ത് പ്ലെയിൻ ഭിത്തിക്ക് മുന്നിൽ ഡ്രസ്സ് വെച്ച് നല്ല ഫോട്ടോകൾ എടുക്കുക.",
          "ഡ്രസ്സിന്റെ കൃത്യമായ അളവുകൾ (ചെസ്റ്റ്, നീളം) ക്യാപ്ഷനിൽ കൃത്യമായി നൽകുക. ഇത് റിട്ടേൺ വരുന്നത് ഒഴിവാക്കും.",
          "സാധാരണ കവറിന് പകരം ബ്രാൻഡഡ് സിപ്-ലോക്ക് ബാഗിൽ പാക്ക് ചെയ്ത് അയക്കുക. ഇത് ബ്രാൻഡിന് നല്ല മതിപ്പ് നൽകും."
        ],
        ar: [
          "حدد تخصصك بدقة: ركز إما على الأزياء المحتشمة والعبايات أو ملابس الفتيات الكاجوال.",
          "اطلب دفعة تجريبية (15 إلى 20 قطعة) مباشرة من مصانع سورات أو تيروبور عبر الواتساب دون عناء السفر.",
          "التصوير هو سر 90% من المبيعات: التقط صوراً أنيقة في إضاءة النهار الطبيعية أو باستخدام رينج لايت بسيط.",
          "اكتب المقاسات بالسنتيمتر بدقة بالغة في المنشور لتفادي استرجاع البضائع.",
          "استخدم أكياس السحاب شبه الشفافة الفاخرة (Ziploc) مع ملصق علامتك التجارية."
        ]
      },
      markets: [
        "Surat Ring Road (Millennium & Raghukul Textile Markets) - Saree & Abaya capital",
        "Tirupur Khaderpet & Rayapuram - World capital for pure cotton knitted T-shirts",
        "Kochi Broadway & Kozhikode Stadium Junction for local Kerala ready wholesale",
        "Mumbai Mangaldas Market & Dadar wholesale bazaars"
      ]
    },

    watches: {
      id: "watches",
      title: { en: "Watches & Smartwatches Business", ml: "വാച്ചുകൾ & സ്മാർട്ട് വാച്ച് കച്ചവടം", ar: "تجارة الساعات الفاخرة والساعات الذكية" },
      tagline: { en: "High perceived value gift item with strong impulse purchases online.", ml: "സമ്മാനമായി നൽകാൻ ആളുകൾ ഇഷ്ടപ്പെടുന്നതും പെട്ടെന്ന് വിറ്റുപോകുന്നതുമായ ഉൽപ്പന്നം.", ar: "سلعة ذات قيمة إدراكية عالية جداً ومثالية للهدايا والمناسبات." },
      minBudget: "₹8,000 - ₹20,000",
      margin: "60% - 150%",
      topSellers: [
        { name: { en: "Minimalist Leather/Mesh Analog Watches", ml: "മിനിമലിസ്റ്റ് ലെതർ അനലോഗ് വാച്ചുകൾ", ar: "ساعات كلاسيكية بتصميم جلدي فاخر" }, wholesale: "₹160 - ₹290 / piece", retail: "₹699 - ₹1,199 / piece" },
        { name: { en: "Bluetooth Calling Smartwatches with AMOLED", ml: "ബ്ലൂടൂത്ത് കോളിംഗ് സ്മാർട്ട് വാച്ചുകൾ", ar: "ساعات ذكية تدعم الاتصال وشاشة أموليد" }, wholesale: "₹450 - ₹750 / piece", retail: "₹1,299 - ₹1,999" },
        { name: { en: "Couple Gift Combos (His & Her Watches + Bracelet)", ml: "കപ്പിൾ വാച്ച് ഗിഫ്റ്റ് കോംബോ", ar: "أطقم هدايا للمتزوجين (ساعتان وسوار)" }, wholesale: "₹380 - ₹550 / set", retail: "₹1,299 - ₹1,799 / set" }
      ],
      steps: {
        en: [
          "Start with 20 pieces consisting of 4 high-demand designs (Minimalist black, Rose gold female, Smartwatch, Couple combo).",
          "Never ship without a hard box: Sourcing a watch box costs just ₹25 - ₹40, but raises perceived value by ₹300!",
          "Film short unboxing and wrist-roll videos with soothing background audio.",
          "Offer a 3-month replacement warranty on movement: This removes customer hesitation instantly.",
          "Pack carefully with bubble wrap so hands and glass never shatter in transit."
        ],
        ml: [
          "ഏറ്റവും ട്രെൻഡിംഗായ 4 മോഡലുകളുടെ 20 എണ്ണം വാങ്ങി തുടങ്ങുക (മിനിമൽ ബ്ലാക്ക്, റോസ് ഗോൾഡ് ലേഡീസ്, സ്മാർട്ട് വാച്ച്, കപ്പിൾ കോംബോ).",
          "ബോക്സ് ഇല്ലാതെ അയക്കരുത്: ₹25-₹40 ന് കിട്ടുന്ന ഹാർഡ് ബോക്സിൽ വെക്കുമ്പോൾ വാച്ചിന് ₹300 ൽ കൂടുതൽ മൂല്യം തോന്നും!",
          "കൈകളിൽ വാച്ച് ധരിച്ചുകൊണ്ടുള്ള ചെറിയ അൺബോക്സിംഗ് റീലുകൾ ചിത്രീകരിക്കുക.",
          "മെഷീന് 3 മാസത്തെ റീപ്ലേസ്‌മെന്റ് വാറന്റി വാഗ്ദാനം ചെയ്യുക. ഇത് ഉപഭോക്താക്കൾക്ക് കൂടുതൽ വിശ്വാസ്യത നൽകും.",
          "ഗ്ലാസ്സ് പൊട്ടാതിരിക്കാൻ കൃത്യമായി ബബിൾ റാപ്പ് ചെയ്ത് കൊറിയർ അയക്കുക."
        ],
        ar: [
          "ابدأ بـ 20 قطعة من 4 تصاميم مختارة بعناية (أسود كلاسيكي، روز جولد نسائي، ساعة ذكية، طقم زوجي).",
          "احرص دائماً على وضع الساعة في علبة صلبة فاخرة (تكلفتها 25-40 روبية فقط وتزيد السعر 300 روبية فوراً).",
          "صور فيديوهات تجربة فتح العلبة (Unboxing) وارتداء الساعة على المعصم بإضاءة احترافية.",
          "قدم ضماناً لمدة 3 أشهر على الحركة لتمنح الزبون أقصى درجات الطمأنينة.",
          "غلف العلبة بطبقة واقية من فقاعات الهواء (Bubble wrap) لحماية الزجاج أثناء الشحن."
        ]
      },
      markets: [
        "Mumbai Manish Market & Crawford Market - India's biggest watch import hub",
        "Delhi Gaffar Market (Karol Bagh) & Chandni Chowk (Lajpat Rai Market)",
        "Kozhikode Palayam Watch Market & S.M. Street wholesale counters"
      ]
    },

    bags: {
      id: "bags",
      title: { en: "Aesthetic Bags, Totes & Wallets", ml: "ബാഗുകൾ, ടോട്ട് ബാഗുകൾ & വാലറ്റുകൾ", ar: "تجارة الحقائب القماشية والمحافظ الأنيقة" },
      tagline: { en: "Massive college & working women appeal. Canvas totes & vegan leather slings.", ml: "കോളേജ് വിദ്യാർത്ഥികൾക്കും സ്ത്രീകൾക്കും ഏറ്റവും പ്രിയങ്കരം. ടോട്ട് ബാഗുകളും സ്ലിംഗ് ബാഗുകളും.", ar: "إقبال هائل من طالبات الجامعات والنساء العاملات. حقائب قماشية ومحافظ جلدية نباتية." },
      minBudget: "₹5,000 - ₹18,000",
      margin: "60% - 180%",
      topSellers: [
        { name: { en: "Printed Aesthetic Canvas Tote Bags", ml: "പ്രിന്റഡ് ക്യാൻവാസ് ടോട്ട് ബാഗുകൾ", ar: "حقائب التوت القماشية المطبوعة" }, wholesale: "₹55 - ₹90 (Plain bag ₹45 + screen printing ₹25)", retail: "₹299 - ₹499" },
        { name: { en: "Vegan Leather Sling / Crossbody Bags", ml: "വിഗൻ ലെതർ സ്ലിംഗ് ബാഗുകൾ", ar: "حقائب كروس نسائية من الجلد الأنيق" }, wholesale: "₹180 - ₹320 / piece", retail: "₹699 - ₹1,199" },
        { name: { en: "Men's Genuine Leather Wallets (Dharavi direct)", ml: "മെൻസ് ഒറിജിനൽ ലെതർ വാലറ്റുകൾ", ar: "محافظ رجالية من الجلد الطبيعي الخالص" }, wholesale: "₹120 - ₹220 / piece", retail: "₹599 - ₹899" }
      ],
      steps: {
        en: [
          "Source 30 blank heavy-cotton canvas tote bags from local garment units or wholesale.",
          "Screen-print aesthetic Malayalam/English minimalist quotes, coffee art, or floral sketches.",
          "Target college girls and book lovers via Instagram aesthetic reels.",
          "Show what fits inside the bag: Laptop, books, water bottle, makeup pouch (practical utility).",
          "Lightweight product ensures lowest possible courier rate (₹40 - ₹50)."
        ],
        ml: [
          "30 നല്ല കട്ടിയുള്ള പ്ലെയിൻ കോട്ടൺ ടോട്ട് ബാഗുകൾ വാങ്ങുക.",
          "അതിൽ നല്ല ഇംഗ്ലീഷ്/മലയാളം വാചകങ്ങളോ, ലളിതമായ പൂക്കളുടെ ചിത്രങ്ങളോ സ്ക്രീൻ പ്രിന്റ് ചെയ്യുക.",
          "കോളേജ് വിദ്യാർത്ഥികളെയും യുവതികളെയും ലക്ഷ്യമിട്ട് ഇൻസ്റ്റാഗ്രാമിൽ റീലുകൾ ചെയ്യുക.",
          "ബാഗിനകത്ത് ലാപ്‌ടോപ്പ്, പുസ്തകങ്ങൾ, കുടിവെള്ള കുപ്പി എന്നിവ എളുപ്പത്തിൽ കൊള്ളുമെന്ന് വീഡിയോയിലൂടെ കാണിക്കുക.",
          "ഭാരം കുറവായതിനാൽ ഏറ്റവും കുറഞ്ഞ കൊറിയർ ചാർജിൽ (₹40 - ₹50) അയക്കാം."
        ],
        ar: [
          "احصل على 30 حقيبة قماشية بيضاء سادة من قماش الكانفاس المتين.",
          "اطبع عليها عبارات أدبية ملهمة أو رسومات بسيطة أنيقة عبر الطباعة الحرارية أو الحريرية.",
          "استهدف طالبات الجامعات والمدارس عبر إنستغرام وتيك توك بمحتوى عصري.",
          "صور مقاطع تظهر سعة الحقيبة لحمل اللابتوب والكتب وعلبة الماء لتبيان عمليتها.",
          "خفة وزن الحقيبة تضمن لك أقل تكلفة شحن ممكنة (أقل من نصف كيلوغرام)."
        ]
      },
      markets: [
        "Mumbai Dharavi 90 Feet Road (Direct leather & bag crafting workshops)",
        "Delhi Nabi Karim Market (India's largest wholesale bag district)",
        "Kochi Broadway & Kozhikode Big Bazaar wholesale leather goods"
      ]
    },

    accessories: {
      id: "accessories",
      title: { en: "Anti-Tarnish Rings & Fashion Jewelry", ml: "ആന്റി-ടാർണിഷ് മോതിരങ്ങൾ & ഫാഷൻ ആഭരണങ്ങൾ", ar: "الخواتم المقاومة للصدأ والإكسسوارات العصرية" },
      tagline: { en: "Lowest shipping weight, zero breakage risk, up to 300% profit markup.", ml: "പൊട്ടിപ്പോകാനുള്ള സാധ്യത തീരെയില്ല, കുറഞ്ഞ ഭാരം, 300% വരെ മികച്ച ലാഭം.", ar: "أخف وزن في الشحن، معدومة الكسر، وأرباح خيالية تصل إلى 300%." },
      minBudget: "₹2,500 - ₹8,000",
      margin: "100% - 300%",
      topSellers: [
        { name: { en: "Stainless Steel Anti-Tarnish Gold/Silver Rings", ml: "ആന്റി-ടാർണിഷ് സ്റ്റെയിൻലെസ്സ് സ്റ്റീൽ മോതിരങ്ങൾ", ar: "خواتم ستانلس ستيل مقاومة لتغير اللون والماء" }, wholesale: "₹35 - ₹75 / ring", retail: "₹299 - ₹499 / ring (Over 400% markup!)" },
        { name: { en: "Men's Turkish & Aqeeq Stone Rings", ml: "മെൻസ് തുർക്കിഷ് & അഖീഖ് കല്ല് മോതിരങ്ങൾ", ar: "خواتم عقيق وتركي للرجال بأحجار طبيعية" }, wholesale: "₹120 - ₹250 / ring", retail: "₹599 - ₹1,200" },
        { name: { en: "Minimal Korean Necklaces & Beaded Bracelets", ml: "കൊറിയൻ ചെയിനുകൾ & ബ്രേസ്‌ലെറ്റുകൾ", ar: "سلاسل وأساور كورية ناعمة وبسيطة" }, wholesale: "₹25 - ₹60 / piece", retail: "₹249 - ₹450" }
      ],
      steps: {
        en: [
          "Start with an investment as small as ₹2,500. Buy 40 pieces of mixed ring sizes (6, 7, 8, 9).",
          "Test waterproof quality in water and soap, and show this proof live in an Instagram Reel.",
          "Provide a simple ring-sizing chart image in your highlights so customers order the exact size.",
          "Package inside a cute pink or black bubble-padded envelope with a handwritten card.",
          "Because weight is under 50 grams, courier charges are just ₹35 - ₹45 across Kerala."
        ],
        ml: [
          "വെറും ₹2,500 മുതൽമുടക്കിൽ തുടങ്ങാം. വിവിധ സൈസുകളിലുള്ള 40 മോതിരങ്ങൾ വാങ്ങി ആരംഭിക്കുക.",
          "വെള്ളവും സോപ്പും തട്ടിയാലും നിറം മങ്ങില്ലെന്ന് (Waterproof) തെളിയിക്കുന്ന ലൈവ് വീഡിയോ റീൽ ചെയ്യുക.",
          "സൈസ് തെറ്റാതെ ഓർഡർ ചെയ്യാൻ ഫിംഗർ സൈസിംഗ് ചാർട്ട് നിങ്ങളുടെ ഇൻസ്റ്റാഗ്രാം പേജിൽ ഹൈലൈറ്റ് ചെയ്യുക.",
          "ഭംഗിയുള്ള ബബിൾ കവറിൽ കൈപ്പടയിലെഴുതിയ നന്ദി കാർഡും ഒപ്പം വെച്ച് അയക്കുക.",
          "50 ഗ്രാമിൽ താഴെ മാത്രം ഭാരമുള്ളതിനാൽ വെറും ₹35 - ₹45 ന് കേരളത്തിലുടനീളം കൊറിയർ അയക്കാം."
        ],
        ar: [
          "ابدأ برأس مال بسيط جداً (حوالي 2500 روبية فقط) لشراء 40 خاتماً بمقاسات شائعة.",
          "قم بتجربة وضع الخاتم في الماء والصابون على الكاميرا لإثبات جودته ومقاومته لتغير اللون.",
          "انشر جدولاً سهلاً لكيفية قياس مقاس الإصبع في حسابك لمساعدة الزبائن.",
          "استخدم مظاريف التغليف الفقاعية الوردية أو السوداء مع بطاقة شكر شخصية.",
          "وزن الشحنة الخفيف جداً (أقل من 50 غرام) يجعل تكلفة الشحن شبه مجانية."
        ]
      },
      markets: [
        "Jaipur Johari Bazaar & Chameliwala (Gemstones & Silver finish rings)",
        "Mumbai Bhuleshwar Market & Zaveri Bazaar imitation lane",
        "Rajkot (Gujarat) jewelry stamping units",
        "Kozhikode Mittayi Theruvu fancy wholesale lanes"
      ]
    },

    spices: {
      id: "spices",
      title: { en: "Kerala Spices, Forest Honey & Organics", ml: "കേരള നാച്ചുറൽ സ്പൈസസ് & വനതേൻ", ar: "بهارات كيرالا الطبيعية وعسل الغابات الأصلي" },
      tagline: { en: "Direct farm sourcing with huge demand in GCC & North Indian metropolitan cities.", ml: "തോട്ടങ്ങളിൽ നിന്നും നേരിട്ട് ശേഖരിച്ച് ഗൾഫിലേക്കും ഇന്ത്യയിലെ പ്രധാന നഗരങ്ങളിലേക്കും വിൽക്കാം.", ar: "من مزارع كيرالا مباشرة إلى أسواق الخليج والمدن الهندية الكبرى بطلب مستمر." },
      minBudget: "₹5,000 - ₹20,000",
      margin: "50% - 120%",
      topSellers: [
        { name: { en: "Wayanad Wild Forest Honey (Unprocessed)", ml: "വയനാടൻ വനതേൻ (ശുദ്ധമായത്)", ar: "عسل الغابات البري الطبيعي غير المعالج" }, wholesale: "₹280 - ₹380 / kg (Direct tribal cooperatives)", retail: "₹650 - ₹950 / kg" },
        { name: { en: "Idukki Green Cardamom 8mm Bold", ml: "ഇടുക്കി ഗ്രീൻ ഏലക്ക 8mm", ar: "هيل إيدوكي الأخضر حبة كبيرة 8 مم" }, wholesale: "₹2,100 - ₹2,400 / kg", retail: "₹3,400 - ₹4,200 / kg (Or ₹380 per 100g pouch)" },
        { name: { en: "Malabar Bold Black Pepper", ml: "മലബാർ നാടൻ കുരുമുളക്", ar: "فلفل مالابار الأسود الفاخر" }, wholesale: "₹620 - ₹680 / kg", retail: "₹900 - ₹1,200 / kg" }
      ],
      steps: {
        en: [
          "Source small quantities directly from Wayanad or Idukki farmers / cooperatives.",
          "Use food-grade airtight stand-up zipper pouches with transparent front windows.",
          "Highlight 100% purity with zero chemicals, additives, or adulteration.",
          "Market heavily to Malayali expats in Dubai, Saudi Arabia, and Qatar through family networks.",
          "Ship internationally using India Post EMS (~₹1,000/kg) or local Gulf air cargo agents."
        ],
        ml: [
          "വയനാട്, ഇടുക്കി എന്നിവിടങ്ങളിലെ തോട്ടങ്ങളിൽ നിന്നോ സഹകരണ സംഘങ്ങളിൽ നിന്നോ ചെറിയ അളവിൽ വാങ്ങുക.",
          "ഭക്ഷ്യസുരക്ഷയുള്ള എയർടൈറ്റ് സിപ്പർ പൗച്ചുകളിൽ വൃത്തിയായി പാക്ക് ചെയ്യുക.",
          "മായമില്ലാത്ത, ശുദ്ധമായ ജൈവ ഉൽപ്പന്നമാണെന്ന കാര്യം വീഡിയോകളിലൂടെ വ്യക്തമാക്കുക.",
          "ഗൾഫിലുള്ള പ്രവാസി മലയാളികളിലേക്ക് കുടുംബാംഗങ്ങൾ വഴിയും സോഷ്യൽ മീഡിയ വഴിയും മാർക്കറ്റ് ചെയ്യുക.",
          "ഇന്ത്യ പോസ്റ്റ് ഇ.എം.എസ് അല്ലെങ്കിൽ പ്രാദേശിക ഗൾഫ് കാർഗോ വഴി എളുപ്പത്തിൽ ഗൾഫിലേക്ക് അയക്കാം."
        ],
        ar: [
          "اشترِ كميات أولية مباشرة من جمعيات المزارعين في واياناد أو إيدوكي.",
          "استخدم أكياساً حافظة محكمة الإغلاق مع نافذة شفافة تظهر جودة الحبوب والمنتج.",
          "ركز في تسويقك على النقاء التام 100% والخلو من أي إضافات كيميائية.",
          "استهدف عائلات المغتربين في الإمارات والسعودية وقطر حيث الطلب مرتفع جداً.",
          "اشحن دولياً بكل يسر عبر البريد الهندي السريع أو مكاتب الشحن الجوي المتخصصة."
        ]
      },
      markets: [
        "Kozhikode Big Bazaar (Valiyangadi) - Century-old spice trade market",
        "Kochi Mattancherry & Jew Town spice bazaar",
        "Wayanad & Idukki local farmer wholesale auctions (Bodirayanur / Kumily)"
      ]
    }
  },

  // Verified Wholesaler & Supplier Database
  suppliers: [
    {
      id: "sup-1",
      name: "Al-Ameen Perfumers & Bottle Souk",
      city: "Kozhikode",
      category: "attar",
      address: "Shop 14, S.M. Street (Mittayi Theruvu), Near Mananchira Square, Kozhikode, Kerala 673001",
      phone: "+91 98471 23450",
      whatsapp: "919847123450",
      specialty: "Pure Arabian perfume oils, White Musk, Shamama, crystal roll-on bottles (6ml/12ml), atomizers",
      moq: "Min 100ml oil or 25 bottles",
      tags: ["Attar", "Bottles", "Kozhikode", "Wholesale"]
    },
    {
      id: "sup-2",
      name: "Calicut Aroma & Essence Traders",
      city: "Kozhikode",
      category: "attar",
      address: "Valiyangadi (Big Bazaar), Near Railway Station Road, Kozhikode, Kerala 673001",
      phone: "+91 94471 89012",
      whatsapp: "919447189012",
      specialty: "Bulk perfume compounding bases, DPG oil, Bakhoor, empty velvet pouches",
      moq: "Min ₹2,000 order",
      tags: ["Attar", "Big Bazaar", "Packaging"]
    },
    {
      id: "sup-3",
      name: "S. Mohd. Ayub Mohd. Yaqub Perfumers",
      city: "Mumbai",
      category: "attar",
      address: "5-B, Nakhuda Mohalla, Mohammad Ali Road, Mumbai, Maharashtra 400003",
      phone: "+91 22 2347 1856",
      whatsapp: "919820018560",
      specialty: "Legendary distillers: Pure Dehn al Oudh, Ruh Gulab, Amber, Kashmiri Saffron, French blends",
      moq: "50g / 100g bottles, courier across India",
      tags: ["Attar", "Mumbai", "Direct Distiller"]
    },
    {
      id: "sup-4",
      name: "Abdul Rehman Glass & Flacon Mart",
      city: "Mumbai",
      category: "packaging",
      address: "128, Abdul Rehman Street, Near Crawford Market, Mumbai, Maharashtra 400003",
      phone: "+91 98214 77650",
      whatsapp: "919821477650",
      specialty: "India's lowest price for octagonal attar bottles (₹7-₹12), luxury pump sprays, dropper bottles",
      moq: "Min 50 pcs batch",
      tags: ["Bottles", "Packaging", "Mumbai"]
    },
    {
      id: "sup-5",
      name: "Royal Textile & Abaya Hub",
      city: "Surat",
      category: "clothing",
      address: "Shop B-204, Millennium Textile Market, Ring Road, Surat, Gujarat 395002",
      phone: "+91 98982 45671",
      whatsapp: "919898245671",
      specialty: "Dubai Crepe & Nada modest abayas, hijabs, unstitched dress materials, wholesale kurtis",
      moq: "Min 15 pieces (Mix designs allowed)",
      tags: ["Abaya", "Dresses", "Surat", "Wholesale"]
    },
    {
      id: "sup-6",
      name: "Tirupur Knitwear & Cotton Cluster",
      city: "Tirupur",
      category: "clothing",
      address: "Khaderpet Cotton Market, Railway Feeder Road, Tirupur, Tamil Nadu 641601",
      phone: "+91 94432 11200",
      whatsapp: "919443211200",
      specialty: "220-240 GSM Oversized French Terry T-shirts, bio-washed plain tees, track pants",
      moq: "Min 20 pcs mix colors",
      tags: ["T-Shirts", "Cotton", "Tirupur"]
    },
    {
      id: "sup-7",
      name: "Broadway Modest & Pardha House",
      city: "Kochi",
      category: "clothing",
      address: "Broadway Market, Near Menaka Junction, Ernakulam, Kochi, Kerala 682031",
      phone: "+91 98460 33441",
      whatsapp: "919846033441",
      specialty: "Ready stock pardhas, abayas, hijabs, inner caps, scarves for quick Kerala reorders",
      moq: "Min 10 pieces",
      tags: ["Abaya", "Kochi", "Kerala Stock"]
    },
    {
      id: "sup-8",
      name: "TimeZone Wholesale & Imports",
      city: "Mumbai",
      category: "watches",
      address: "Shop 42, 1st Floor, Manish Market, Musafir Khana, Mumbai 400001",
      phone: "+91 98201 54321",
      whatsapp: "919820154321",
      specialty: "Minimalist fashion analog watches, couple watch gift combos, smartwatches, hard gift boxes",
      moq: "Min 15 watches",
      tags: ["Watches", "Mumbai", "Combos"]
    },
    {
      id: "sup-9",
      name: "Gaffar Watch & Tech Hub",
      city: "Delhi",
      category: "watches",
      address: "Gaffar Market, Karol Bagh, New Delhi 110005",
      phone: "+91 98110 99887",
      whatsapp: "919811099887",
      specialty: "Calling smartwatches, magnetic strap combos, AMOLED series smartwatches",
      moq: "Min 10 pieces",
      tags: ["Smartwatches", "Delhi"]
    },
    {
      id: "sup-10",
      name: "Dharavi Artisan Leather Craft Co.",
      city: "Mumbai",
      category: "bags",
      address: "90 Feet Road, Near Kumbharwada, Dharavi, Mumbai 400017",
      phone: "+91 97690 12345",
      whatsapp: "919769012345",
      specialty: "Genuine leather men's wallets, vegan leather sling bags, laptop sleeves at workshop direct rates",
      moq: "Min 20 pieces",
      tags: ["Leather", "Wallets", "Bags"]
    },
    {
      id: "sup-11",
      name: "Nabi Karim Bag Wholesale Bazaar",
      city: "Delhi",
      category: "bags",
      address: "Main Market, Nabi Karim, Paharganj, New Delhi 110055",
      phone: "+91 99991 22334",
      whatsapp: "919999122334",
      specialty: "Canvas tote bags (blank), college backpacks, trendy ladies shoulder bags",
      moq: "Min 30 pieces",
      tags: ["Totes", "Backpacks", "Delhi"]
    },
    {
      id: "sup-12",
      name: "Jaipur Johari Gems & Silver Ring Mart",
      city: "Jaipur",
      category: "accessories",
      address: "Chameliwala Market, M.I. Road, Jaipur, Rajasthan 302001",
      phone: "+91 94140 76543",
      whatsapp: "919414076543",
      specialty: "Turkish Aqeeq stone rings, 925 sterling finish anti-tarnish rings, natural gemstone rings",
      moq: "Min 20 rings mix sizes",
      tags: ["Rings", "Aqeeq", "Jaipur"]
    },
    {
      id: "sup-13",
      name: "Bhuleshwar Fashion Jewelry Lane",
      city: "Mumbai",
      category: "accessories",
      address: "Bhuleshwar Road, Marine Lines East, Mumbai, Maharashtra 400002",
      phone: "+91 98205 67890",
      whatsapp: "919820567890",
      specialty: "Stainless steel waterproof rings, Korean minimalist chains, aesthetic beaded bracelets",
      moq: "Min ₹2,500 mix assortment",
      tags: ["Jewelry", "Anti-Tarnish", "Mumbai"]
    },
    {
      id: "sup-14",
      name: "Malabar Spice & Forest Honey Depot",
      city: "Kozhikode",
      category: "spices",
      address: "Shop 18, Copra Bazaar, Valiyangadi, Kozhikode, Kerala 673001",
      phone: "+91 94470 11998",
      whatsapp: "919447011998",
      specialty: "Wayanad raw forest honey, Malabar bold black pepper, Idukki 8mm green cardamom",
      moq: "Min 5 kg or wholesale pouches",
      tags: ["Honey", "Spices", "Kozhikode"]
    },
    {
      id: "sup-15",
      name: "Kannauj Traditional Deg Attar Distillers",
      city: "Kannauj",
      category: "attar",
      address: "Saraimeera Perfumery Road, Kannauj, Uttar Pradesh 209725",
      phone: "+91 94500 33221",
      whatsapp: "919450033221",
      specialty: "Authentic Mitti Attar (Baked earth scent), Ruh Khus (Wild vetiver), Pure Gulab (Rose)",
      moq: "50ml sample sets or 500ml bulk",
      tags: ["Kannauj", "Mitti Attar", "Ruh Khus"]
    }
  ],

  // Ready-to-Use WhatsApp Message Templates
  templatesData: [
    {
      id: "tmpl-supplier",
      icon: "fa-store",
      title: {
        en: "Wholesaler Catalog & Price Inquiry",
        ml: "ഹോൾസെയിൽ വിലയും കാറ്റലോഗും ചോദിക്കാൻ",
        ar: "طلب كتالوج وأسعار الجملة من المورد"
      },
      text: {
        en: "Hello Sir/Madam,\nI came across your store details on Vyapar Shiksha. I am starting a retail business in Kerala and would like to see your latest wholesale product catalog, minimum order quantity (MOQ), and price list. Please share photos and bulk rates. Thank you!",
        ml: "നമസ്കാരം സർ/മാഡം,\nഞാൻ 'വ്യാപാര ശിക്ഷ' ഡയറക്ടറിയിലാണ് നിങ്ങളുടെ കടയുടെ വിവരങ്ങൾ കണ്ടത്. കേരളത്തിൽ ഒരു പുതിയ സംരംഭം ആരംഭിക്കുകയാണ്. നിങ്ങളുടെ ഏറ്റവും പുതിയ ഹോൾസെയിൽ കാറ്റലോഗും, കുറഞ്ഞ ഓർഡർ അളവും (MOQ), വിലവിവരങ്ങളും അയച്ചുതരുമോ? നന്ദി!",
        ar: "السلام عليكم ورحمة الله وبركاته،\nوجدت بيانات متجركم الموقر عبر منصة رواد الأعمال. أود الاستفسار عن كتالوج البيع بالجملة، قائمة الأسعار للكميات، والحد الأدنى للطلب (MOQ). بانتظار ردكم الكريم، شكراً لكم."
      }
    },
    {
      id: "tmpl-order-confirm",
      icon: "fa-circle-check",
      title: {
        en: "Customer Order & UPI Payment Request",
        ml: "കസ്റ്റമറുടെ ഓർഡർ സ്ഥിരീകരിക്കാനും പണം വാങ്ങാനും",
        ar: "تأكيد طلب العميل ورابط الدفع"
      },
      text: {
        en: "Dear Customer,\nThank you for choosing us! 🌸 Your order has been registered.\nTotal Amount: ₹[AMOUNT]\nGoogle Pay / PhonePe UPI ID: [YOUR_UPI_ID]\n(Or pay ₹50 advance delivery charge for Cash on Delivery).\nPlease send the payment screenshot and full delivery address with Pincode to dispatch your parcel. Thank you!",
        ml: "പ്രിയ ഉപഭോക്താവേ,\nഞങ്ങളിൽ നിന്ന് ഓർഡർ ചെയ്തതിന് നന്ദി! 🌸\nആകെ തുക: ₹[AMOUNT]\nGoogle Pay / PhonePe UPI ID: [YOUR_UPI_ID]\n(ക്യാഷ് ഓൺ ഡെലിവറിക്ക് വെറും ₹50 ഡെലിവറി അഡ്വാൻസ് നൽകിയാൽ മതിയാകും).\nപണം അയച്ചതിന്റെ സ്ക്രീൻഷോട്ടും, പിൻകോഡ് അടക്കമുള്ള കൃത്യമായ അഡ്രസ്സും അയച്ചുതരിക. നന്ദി!",
        ar: "مرحباً بك عزيزي العميل،\nشكراً لطلبك من متجرنا! 🌸 تم تسجيل طلبك بنجاح.\nالمبلغ الإجمالي: [المبلغ]\nوسيلة الدفع المعتمدة: [بيانات الحساب/البطاقة]\nيرجى إرسال إشعار التحويل والعنوان التفصيلي مع رقم الهاتف لنقوم بتجهيز شحنتك فوراً. نسعد بخدمتك!"
      }
    },
    {
      id: "tmpl-dispatch",
      icon: "fa-truck-fast",
      title: {
        en: "Parcel Dispatched & Tracking Update",
        ml: "കൊറിയർ ട്രാക്കിംഗ് വിവരങ്ങൾ അയക്കാൻ",
        ar: "إشعار شحن الطرد ورقم التتبع"
      },
      text: {
        en: "Hello!\nGreat news — your parcel has been safely packed and dispatched! 📦🚚\nCourier Partner: [ST Courier / India Post / Delhivery]\nTracking Number: [TRACKING_NO]\nYou can expect delivery within 2-3 business days. Please feel free to reach out once received!",
        ml: "ഹലോ!\nസന്തോഷവാർത്ത — നിങ്ങളുടെ ഓർഡർ ഭംഗിയായി പാക്ക് ചെയ്ത് കൊറിയർ അയച്ചിട്ടുണ്ട്! 📦🚚\nകൊറിയർ സർവീസ്: [ST Courier / India Post]\nട്രാക്കിംഗ് നമ്പർ: [TRACKING_NO]\n2-3 ദിവസത്തിനകം നിങ്ങളുടെ കൈകളിൽ എത്തും. സാധനം കിട്ടിയാൽ അറിയിക്കുമല്ലോ!",
        ar: "أهلاً بك،\nيسعدنا إخبارك بأنه تم شحن طلبك بنجاح وبعناية فائقة! 📦🚚\nشركة الشحن: [اسم الشركة]\nرقم التتبع: [رقم الشحنة]\nيتوقع وصول الشحنة خلال يومين إلى 3 أيام عمل. دمت بخير!"
      }
    },
    {
      id: "tmpl-review",
      icon: "fa-star",
      title: {
        en: "Customer Review & Feedback Request",
        ml: "കസ്റ്റമർ റിവ്യൂ ചോദിക്കാൻ",
        ar: "طلب تقييم العميل ورأيه الصادق"
      },
      text: {
        en: "Hello! We hope your parcel reached you safely. Did you like the product quality? We are a small growing business and your honest review or a short photo/video would mean the world to us! Thank you so much for your support ❤️",
        ml: "ഹലോ! അയച്ച പാർസൽ കൈപ്പറ്റിയെന്ന് കരുതുന്നു. പ്രൊഡക്റ്റിന്റെ ക്വാളിറ്റി ഇഷ്ടപ്പെട്ടോ? നിങ്ങളുടെ ഒരു ചെറിയ റിവ്യൂവോ ഫോട്ടോയോ ഞങ്ങളുടെ വളർച്ചയ്ക്ക് വലിയ പ്രചോദനമാകും! നിങ്ങളുടെ വിലയേറിയ പിന്തുണയ്ക്ക് ഹൃദയം നിറഞ്ഞ നന്ദി ❤️",
        ar: "أهلاً بك! نأمل أن يكون الطرد قد وصلك بسلام وبأفضل حال. كيف كانت تجربتك مع جودة منتجنا؟ دعمك ورأيك الصادق بكلمة أو صورة يسعدنا ويساعد مشروعنا الصغير على النمو. شكراً جزيلاً لثقتك بنا ❤️"
      }
    }
  ],

  // Legal & Compliance Cards
  legalData: [
    {
      badge: "exempt",
      badgeText: { en: "GST Exempt", ml: "ജി.എസ്.ടി ആവശ്യമില്ല", ar: "إعفاء ضريبي" },
      title: { en: "Do You Need GST Registration?", ml: "ജി.എസ്.ടി (GST) രജിസ്ട്രേഷൻ വേണമെന്നുണ്ടോ?", ar: "هل يلزمك التسجيل في ضريبة السلع (GST)؟" },
      desc: {
        en: "NO! If you are selling goods within your state (e.g. Kerala to Kerala) and your annual turnover is under ₹40 Lakhs (or under ₹20 Lakhs for services), GST is 100% NOT mandatory. You can legally start from home without GST.",
        ml: "വേണ്ട! കേരളത്തിനകത്ത് സാധനങ്ങൾ വിൽക്കുന്നവർക്ക് പ്രതിവർഷ വിറ്റുവരവ് ₹40 ലക്ഷത്തിന് താഴെയാണെങ്കിൽ ജി.എസ്.ടി നിർബന്ധമില്ല. യാതൊരു പേടിയും കൂടാതെ വീട്ടിലിരുന്ന് കച്ചവടം ആരംഭിക്കാം.",
        ar: "لا يلزمك أبداً! إذا كانت مبيعاتك داخل الولاية ولم يتجاوز إجمالي دخلك السنوي 40 ليرة لك (4 ملايين روبية)، فالقانون الهندي يعفيك تماماً من التسجيل الضريبي."
      }
    },
    {
      badge: "free",
      badgeText: { en: "100% Free Govt Portal", ml: "സൗജന്യ ഗവൺമെന്റ് പോർട്ടൽ", ar: "تسجيل حكومي مجاني 100%" },
      title: { en: "MSME Udyam Registration", ml: "ഉദ്യം (Udyam MSME) രജിസ്ട്രേഷൻ", ar: "شهادة المنشآت الصغيرة (Udyam MSME)" },
      desc: {
        en: "Free online government registration (udyamregistration.gov.in) using your Aadhaar card. Takes 5 minutes and gives you official recognition as a registered micro-enterprise, eligible for bank business accounts and government subsidies.",
        ml: "ആധാർ കാർഡ് ഉപയോഗിച്ച് udyamregistration.gov.in എന്ന ഔദ്യോഗിക ഗവൺമെന്റ് വെബ്സൈറ്റ് വഴി 5 മിനിറ്റിൽ സൗജന്യമായി രജിസ്റ്റർ ചെയ്യാം. ബാങ്കുകളിൽ ബിസിനസ്സ് അക്കൗണ്ട് തുടങ്ങാനും സബ്‌സിഡികൾക്കും ഇത് സഹായിക്കും.",
        ar: "تسجيل فوري عبر الموقع الحكومي الرسمي باستخدام بطاقة آدهار خلال 5 دقائق فقط، يمنحك اعترافاً رسمياً بمشروعك الصغير لفتح حسابات بنكية مخصصة."
      }
    },
    {
      badge: "essential",
      badgeText: { en: "Zero Balance Accounts", ml: "സീറോ ബാലൻസ് അക്കൗണ്ടുകൾ", ar: "حسابات مصرفية سهلة" },
      title: { en: "Banking & UPI QR Setup", ml: "ബാങ്ക് അക്കൗണ്ടും UPI ക്യു.ആർ കോഡും", ar: "الحساب البنكي والتحصيل عبر UPI" },
      desc: {
        en: "You can start using your normal personal Savings Account with Google Pay or PhonePe. Once orders exceed 15-20 per week, open a zero-balance Digital Current Account (via IndusInd, Federal Bank, or SBI) and order a free Google Pay for Business soundbox/QR standee.",
        ml: "തുടക്കത്തിൽ നിങ്ങളുടെ സ്വന്തം സേവിംഗ്സ് അക്കൗണ്ട് ഗൂഗിൾ പേ വഴിയും ഫോൺപേ വഴിയും ഉപയോഗിക്കാം. ഓർഡറുകൾ കൂടിവരുമ്പോൾ ഫെഡറൽ ബാങ്ക്, എസ്.ബി.ഐ തുടങ്ങിയവയിൽ സൗജന്യ കറന്റ് അക്കൗണ്ട് തുടങ്ങാം.",
        ar: "يمكنك البدء بحسابك البنكي الشخصي واستقبال الحوالات عبر Google Pay. وعند زيادة الطلبات يمكنك فتح حساب جارٍ رقمي مجاني وطلب لوحة الباركود المباشرة."
      }
    },
    {
      badge: "essential",
      badgeText: { en: "Only for Spices / Food", ml: "ഭക്ഷണസാധനങ്ങൾക്ക് മാത്രം", ar: "للأغذية والعسل فقط" },
      title: { en: "FSSAI Basic Registration (₹100/yr)", ml: "എഫ്.എസ്.എസ്.എ.ഐ (FSSAI) ലൈസൻസ്", ar: "ترخيص سلامة الغذاء (FSSAI)" },
      desc: {
        en: "Only required if selling consumable items like Kerala Spices, Forest Honey, or Homemade Snacks. Basic registration costs just ₹100 per year via foscos.fssai.gov.in. Not required for Attar, Clothes, Bags, or Watches!",
        ml: "തേൻ, സുഗന്ധവ്യഞ്ജനങ്ങൾ, നാടൻ പലഹാരങ്ങൾ എന്നിവ വിൽക്കുന്നവർക്ക് മാത്രമാണ് ഇത് വേണ്ടത്. വെറും ₹100 ന് foscos.fssai.gov.in വഴി അപേക്ഷിക്കാം. അത്തർ, വസ്ത്രങ്ങൾ, വാച്ചുകൾ, ബാഗുകൾ എന്നിവയ്ക്ക് ഇത് ആവശ്യമില്ല!",
        ar: "مطلوب فقط عند تجارة العسل والبهارات والأغذية. رسومه 100 روبية سنوياً عبر البوابة الرسمية، ولا يلزم إطلاقاً لتجارة العطور أو الملابس أو الساعات."
      }
    }
  ],

  // Essential Equipment Toolkit
  equipData: [
    {
      icon: "fa-scale-balanced",
      title: { en: "Digital Weighing Scale", ml: "ഡിജിറ്റൽ വെയിങ് മെഷീൻ", ar: "ميزان إلكتروني دقيق" },
      price: "₹249 - ₹350",
      desc: { en: "Essential for weighing parcels under 500g before booking courier.", ml: "പാർസലിന്റെ കൃത്യമായ ഭാരം അളക്കാൻ ആമസോണിൽ ₹250 ന് ലഭിക്കും.", ar: "ضروري لقياس وزن الطرود بدقة أقل من 500 غرام." }
    },
    {
      icon: "fa-box-open",
      title: { en: "Tamper-Proof Courier Bags", ml: "ടെമ്പൽ-പ്രൂഫ് കൊറിയർ കവറുകൾ", ar: "أكياس الشحن الآمنة المقاومة للتمزق" },
      price: "₹150 (100 Pcs)",
      desc: { en: "Self-adhesive waterproof poly mailers with document pocket.", ml: "വാട്ടർപ്രൂഫ് ആയ കൊറിയർ കവറുകൾ. ഒട്ടിച്ചാൽ പൊളിക്കാതെ തുറക്കാനാവില്ല.", ar: "أكياس بريدية لاصقة مقاومة للماء مع جيب خارجي للفاتورة." }
    },
    {
      icon: "fa-shield-heart",
      title: { en: "Bubble Wrap Roll (50 Meters)", ml: "ബബിൾ റാപ്പ് റോൾ (50 മീറ്റർ)", ar: "لفافة فقاعات الحماية (50 متراً)" },
      price: "₹280",
      desc: { en: "Protects glass attar bottles and watch boxes from damage.", ml: "അത്തർ കുപ്പികളും വാച്ചുകളും പൊട്ടാതെ സുരക്ഷിതമായി അയക്കാൻ.", ar: "لحماية زجاجات العطور والساعات من الكسر أثناء الشحن." }
    },
    {
      icon: "fa-tags",
      title: { en: "Thermal / A4 Sticker Paper", ml: "സ്റ്റിക്കർ പേപ്പറുകൾ", ar: "ورق طباعة العناوين والملصقات" },
      price: "₹180 (100 Sheets)",
      desc: { en: "Print delivery addresses cleanly from normal home printer.", ml: "സാധാരണ വീട്ടിലെ പ്രിന്റർ ഉപയോഗിച്ച് അഡ്രസ്സ് സ്റ്റിക്കർ അടിക്കാൻ.", ar: "لطباعة ملصقات العناوين والباركود من أي طابعة منزلية." }
    },
    {
      icon: "fa-envelope-open-text",
      title: { en: "Thank You Note Cards", ml: "നന്ദി അറിയിക്കുന്ന കാർഡുകൾ", ar: "بطاقات الشكر والإهداء" },
      price: "₹120 (100 Pcs)",
      desc: { en: "Handwritten card inside order triggers 5x more Instagram story tags.", ml: "കൈപ്പടയിൽ എഴുതിയ ചെറിയ കാർഡ് കസ്റ്റമറുടെ ഹൃദയം കീഴടക്കും.", ar: "بطاقة شكر مبهجة تجعل الزبائن يعيدون الشراء وينشرون تجربتهم." }
    }
  ],

  // Frequently Asked Questions
  faqData: [
    {
      q: {
        en: "Can I run an Instagram business without showing my face on camera?",
        ml: "ക്യാമറയിൽ സ്വന്തം മുഖം കാണിക്കാതെ ഇൻസ്റ്റാഗ്രാമിൽ ബിസിനസ് ചെയ്യാൻ പറ്റുമോ?",
        ar: "هل يمكنني إدارة متجر إنستغرام دون الظهور بوجهي أمام الكاميرا؟"
      },
      a: {
        en: "ABSOLUTELY YES! Over 85% of successful aesthetic pages never show the founder's face. You only need to show your hands rolling perfume oil, packing a cute box, showing the watch on a table, or unboxing. Aesthetic product focus converts even better than personal faces!",
        ml: "തീർച്ചയായും സാധിക്കും! വിജയിച്ച 85% ഇൻസ്റ്റാഗ്രാം പേജുകളും ഉടമസ്ഥരുടെ മുഖം കാണിക്കാറില്ല. നിങ്ങളുടെ കൈകൾ വെച്ച് ഓർഡർ പാക്ക് ചെയ്യുന്നതും, അത്തർ ബോട്ടിൽ തിളങ്ങുന്നതും, മോതിരങ്ങൾ വിഷ്വലൈസ് ചെയ്യുന്നതും മാത്രം ചിത്രീകരിച്ചാൽ മതിയാകും. ഉൽപ്പന്നത്തിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്ന വീഡിയോകളാണ് കൂടുതൽ വിറ്റുപോകുന്നത്!",
        ar: "نعم وبكل تأكيد! أكثر من 85% من المتاجر الناجحة لا تظهر وجوه أصحابها. كل ما تحتاجه هو تصوير يديك أثناء تغليف الطلبية، أو وضع زجاجة العطر وتجربتها بإضاءة هادئة وموسيقى رائجة."
      }
    },
    {
      q: {
        en: "What if a customer refuses COD and the courier returns it?",
        ml: "കസ്റ്റമർ സാധനം വാങ്ങാതെ തിരിച്ചയച്ചാൽ (RTO) ഞാൻ എന്ത് ചെയ്യണം?",
        ar: "ماذا لو رفض العميل استلام الطلب بالدفع عند الاستلام وعاد الطرد؟"
      },
      a: {
        en: "This is why you must NEVER send 100% COD to first-time buyers! Always request a nominal ₹50 advance delivery charge via UPI. Serious buyers will gladly pay ₹50, and if they refuse the package, your courier loss is already covered.",
        ml: "അതുകൊണ്ടാണ് അപരിചിതരായ പുതിയ ആളുകൾക്ക് 100% COD നൽകാതിരിക്കാൻ ഞങ്ങൾ നിർദ്ദേശിക്കുന്നത്! പാർസൽ അയക്കുന്നതിന് മുൻപ് വെറും ₹50 ഡെലിവറി ചാർജ് ഗൂഗിൾ പേ വഴി അഡ്വാൻസ് വാങ്ങുക. ആത്മാർത്ഥതയുള്ള ഉപഭോക്താക്കൾ ഇത് സന്തോഷത്തോടെ നൽകും; കൊറിയർ നഷ്ടം വരികയുമില്ല.",
        ar: "لهذا السبب ننصح دائماً بعدم شحن الطلبات بنظام الدفع عند الاستلام دون تحصيل عربون رمزي (50 روبية) مقدماً كرسوم توصيل لتصفية غير الجادين وحماية رأس مالك."
      }
    },
    {
      q: {
        en: "How can I accept payments from customers in UAE, Saudi Arabia, or Qatar?",
        ml: "ഗൾഫിലുള്ള പ്രവാസികളിൽ നിന്നും പണം എങ്ങനെ വാങ്ങാം?",
        ar: "كيف يمكنني تحصيل الأموال من الزبائن المقيمين في دول الخليج؟"
      },
      a: {
        en: "Most Malayalis in the Gulf have active Indian NRE/NRO accounts with Google Pay or PhonePe that transfer directly in Indian Rupees (INR) with 0% fee. Alternatively, use Western Union or international payment links on Razorpay.",
        ml: "ഗൾഫിലുള്ള ഭൂരിഭാഗം മലയാളികൾക്കും ഗൂഗിൾ പേ അല്ലെങ്കിൽ ഫോൺപേ ബന്ധിപ്പിച്ച ഇന്ത്യൻ NRE/NRO അക്കൗണ്ടുകൾ ഉണ്ട്. അവർക്ക് യാതൊരു ചാർജുമില്ലാതെ നേരിട്ട് ഇന്ത്യൻ രൂപയായി അയക്കാം. കൂടാതെ റെയ്സർപേ (Razorpay) വഴി അന്താരാഷ്ട്ര കാർഡുകൾ വഴിയും പണം സ്വീകരിക്കാം.",
        ar: "معظم المغتربين في دول الخليج يملكون حسابات بنكية هندية مرتبطة بـ Google Pay، فيمكنهم التحويل المباشر بالروبية بدون أي رسوم، أو عبر روابط الدفع الدولي في Razorpay."
      }
    },
    {
      q: {
        en: "What should I do if a perfume bottle breaks during courier delivery?",
        ml: "കൊറിയറിൽ വെച്ച് കുപ്പി പൊട്ടിപ്പോയാൽ എന്ത് ചെയ്യണം?",
        ar: "ماذا أفعل لو انكسرت زجاجة العطر أثناء الشحن؟"
      },
      a: {
        en: "Always ask customers to record a short 5-second unboxing video when opening the parcel. If damaged, immediately send a replacement bottle for free with an apology. A customer whose problem you solve instantly becomes your most loyal, lifelong brand advocate!",
        ml: "പാർസൽ തുറക്കുമ്പോൾ ഒരു ചെറിയ വീഡിയോ എടുക്കാൻ കസ്റ്റമറോട് ആവശ്യപ്പെടുക. എന്തെങ്കിലും കേടുപാടുകൾ സംഭവിച്ചാൽ യാതൊരു മടിയും കൂടാതെ ഉടൻ തന്നെ വേറൊരു കുപ്പി സൗജന്യമായി അയച്ചുകൊടുക്കുക. ഈ സേവനം അവരെ നിങ്ങളുടെ സ്ഥിരം ഉപഭോക്താവാക്കി മാറ്റും!",
        ar: "اطلب دائماً من العميل تصوير فيديو قصير عند فتح الطرد. إذا حدث أي كسر، أرسل له بديلاً فوراً ومجاناً مع اعتذار لطيف، فالعميل الذي تعالج مشكلته بسرعة يصبح سفيراً وفياً لعلامتك."
      }
    }
  ],

  // 7-Step Beginner Launch Roadmap
  roadmapData: [
    {
      step: 1,
      title: {
        en: "Choose 1 Micro-Niche & Customer Persona",
        ml: "ഒരു പ്രത്യേക കാറ്റഗറിയും കസ്റ്റമർ ഗ്രൂപ്പും തിരഞ്ഞെടുക്കുക",
        ar: "اختر تخصصاً دقيقاً وشريحة زبائن محددة"
      },
      desc: {
        en: "Never try to sell everything at once. Choose one focused product: e.g., 'Luxury alcohol-free attars' OR 'Affordable modest abayas' OR 'Anti-tarnish waterproof rings'. Know exactly who is buying (college students, working women, perfume lovers, NRI families).",
        ml: "എല്ലാം കൂടി ഒന്നിച്ച് വിൽക്കാൻ ശ്രമിക്കരുത്. ഒരു പ്രത്യേക ഉൽപ്പന്നം മാത്രം തിരഞ്ഞെടുക്കുക: ഉദാഹരണത്തിന് 'ആൽക്കഹോൾ ഫ്രീ അത്തറുകൾ' അല്ലെങ്കിൽ 'ആന്റി-ടാർണിഷ് മോതിരങ്ങൾ' അല്ലെങ്കിൽ 'കോളേജ് ടോട്ട് ബാഗുകൾ'. ആരാണ് നിങ്ങളുടെ ഉപഭോക്താക്കൾ എന്ന് വ്യക്തമായി മനസ്സിലാക്കുക.",
        ar: "لا تحاول بيع كل شيء في البداية. ركز على تخصص دقيق ومحدد مثل 'العطور الزيتية الخالية من الكحول' أو 'الخواتم المقاومة للماء'. اعرف جمهورك المستهدف بدقة."
      },
      checks: ["Specific Niche", "Audience Avatar", "Budget Limit ₹3k-₹15k"]
    },
    {
      step: 2,
      title: {
        en: "Sample Stock from Verified Wholesalers",
        ml: "വിശ്വസ്തരായ വ്യാപാരികളിൽ നിന്ന് സാമ്പിളുകൾ വാങ്ങുക",
        ar: "طلب عينات تجريبية من تجار الجملة المعتمدين"
      },
      desc: {
        en: "Do not buy massive quantities on day one. Use our supplier directory to contact wholesalers via WhatsApp and order a small sample starter batch (15 - 30 pieces). Verify quality, scent longevity, fabric softness, or ring durability yourself.",
        ml: "തുടക്കത്തിൽ തന്നെ ലക്ഷക്കണക്കിന് രൂപയുടെ സാധനം വാങ്ങരുത്. നമ്മുടെ ഡയറക്ടറിയിലെ വാട്സ്ആപ്പ് നമ്പറുകളിൽ ബന്ധപ്പെട്ട് 15-30 എണ്ണത്തിന്റെ ഒരു ചെറിയ സാമ്പിൾ ബാച്ച് മാത്രം ഓർഡർ ചെയ്യുക. ഗുണനിലവാരം നിങ്ങൾ തന്നെ നേരിട്ട് കണ്ട് ബോധ്യപ്പെടുക.",
        ar: "إياك وشراء كميات ضخمة في البداية. تواصل مع الموردين عبر الواتساب واطلب دفعة تجريبية صغيرة (15 إلى 30 حبة). افحص الجودة والثبات بنفسك."
      },
      checks: ["WhatsApp Sample Order", "Quality Check", "Pricing Verification"]
    },
    {
      step: 3,
      title: {
        en: "Create Brand Identity (Name, Logo & Packaging)",
        ml: "ബ്രാൻഡ് ഐഡന്റിറ്റി ഉണ്ടാക്കുക (പേര്, ലോഗോ, പാക്കിംഗ്)",
        ar: "بناء الهوية البصرية (الاسم، الشعار، التغليف)"
      },
      desc: {
        en: "Create a memorable, short brand name. Design a clean minimalist logo on Canva for free. Print 100 metallic or vinyl stickers from a local screen printer (costs ~₹150). Order bubble mailers and thank-you cards.",
        ml: "മനസ്സിൽ തങ്ങിനിൽക്കുന്ന ഒരു നല്ല പേര് തിരഞ്ഞെടുക്കുക. കാൻവ (Canva) ഉപയോഗിച്ച് സൗജന്യമായി ലോഗോ ഡിസൈൻ ചെയ്യാം. ₹150 ന് 100 സ്റ്റിക്കറുകൾ പ്രിന്റ് ചെയ്ത് വാങ്ങുക. മനോഹരമായ പാക്കിംഗ് കവറുകളും നന്ദി കാർഡുകളും തയ്യാറാക്കുക.",
        ar: "اختر اسماً رناناً وسهل التذكر. صمم شعاراً أنيقاً عبر تطبيق كانفا مجاناً. اطبع 100 ملصق احترافي بتكلفة زهيدة وجهز بطاقات شكر للعملاء."
      },
      checks: ["Brand Name", "Canva Logo", "Custom Stickers", "Thank-You Cards"]
    },
    {
      step: 4,
      title: {
        en: "Set Up Instagram Store & WhatsApp Catalog",
        ml: "ഇൻസ്റ്റാഗ്രാം പേജും വാട്സ്ആപ്പ് ബിസിനസ്സും സജ്ജമാക്കുക",
        ar: "إعداد متجر إنستغرام وكتالوج واتساب للأعمال"
      },
      desc: {
        en: "Switch Instagram to a Professional Creator/Business Account. Put a clear one-line bio: '100% Pure Alcohol-Free Attars | Shipping Across Kerala & India | DM or Tap to Order'. Put a direct click-to-chat WhatsApp link (`wa.me/...`) in bio.",
        ml: "ഇൻസ്റ്റാഗ്രാം അക്കൗണ്ട് പ്രൊഫഷണൽ അക്കൗണ്ടാക്കി മാറ്റുക. ബയോയിൽ വ്യക്തമായ വിവരങ്ങൾ നൽകുക: '100% ആൽക്കഹോൾ ഫ്രീ അത്തറുകൾ | കേരളത്തിലുടനീളം കൊറിയർ സർവീസ് | ഓർഡർ ചെയ്യാൻ വാട്സ്ആപ്പിൽ മെസ്സേജ് അയക്കുക'. വാട്സ്ആപ്പ് ലിങ്ക് നൽകാൻ മറക്കരുത്.",
        ar: "حول حسابك في إنستغرام إلى حساب تجاري. اكتب وصفاً دقيقاً في البايو مع رابط واتساب مباشر بنقرة واحدة لتسهيل طلب الشراء."
      },
      checks: ["Instagram Business", "Bio Clarity", "WhatsApp Click-to-Chat", "Product Catalog"]
    },
    {
      step: 5,
      title: {
        en: "Set Pricing: Wholesale + Packaging + Shipping + Margin",
        ml: "വില നിശ്ചയിക്കുക: ഹോൾസെയിൽ + പാക്കിംഗ് + ഷിപ്പിംഗ് + ലാഭം",
        ar: "تسعير المنتجات: تكلفة الجملة + التغليف + الشحن + هامش الربح"
      },
      desc: {
        en: "Use our interactive Profit Calculator! Formula: Retail Price = (Wholesale Cost + Packaging ₹25 + Courier ₹50) × Target Profit Multiplier. Keep retail prices competitive yet highly profitable (e.g., Sourcing ₹70, Selling ₹349).",
        ml: "നമ്മുടെ പ്രോഫിറ്റ് കാൽക്കുലേറ്റർ ഉപയോഗിക്കുക! ഫോർമുല: വിൽപന വില = (ഹോൾസെയിൽ വില + പാക്കിംഗ് ₹25 + കൊറിയർ ₹50) + നിങ്ങളുടെ ലാഭം. വിപണിയിലെ മറ്റ് വിലകൾ പരിശോധിച്ച് ആകർഷകമായ വില നിശ്ചയിക്കുക (ഉദാ: ₹70 ന് വാങ്ങി ₹349 ന് വിൽക്കാം).",
        ar: "استخدم حاسبة الأرباح بالموقع. المعادلة: سعر البيع = (سعر الجملة + التغليف ₹25 + الشحن ₹50) + صافي ربحك. احرص على سعر منافس ومربح."
      },
      checks: ["Unit Cost Calculation", "Courier Allowance", "Competitive Pricing"]
    },
    {
      step: 6,
      title: {
        en: "Post High-Converting Reels & Gather First 10 Orders",
        ml: "റീലുകൾ പോസ്റ്റ് ചെയ്യുക & ആദ്യത്തെ 10 ഓർഡറുകൾ നേടുക",
        ar: "نشر مقاطع ريلز جذابة وتحصيل أول 10 طلبيات"
      },
      desc: {
        en: "Don't just post static images. Shoot short 7-second reels: packing an order, macro close-ups of the perfume oil rolling on skin, showing ring shine in water. Offer introductory free shipping or a complimentary sample to the first 10 customers.",
        ml: "വെറും ഫോട്ടോകൾ മാത്രം പോസ്റ്റ് ചെയ്യാതെ ആകർഷകമായ റീലുകൾ ചെയ്യുക: ഓർഡറുകൾ പാക്ക് ചെയ്യുന്ന വീഡിയോ, അത്തർ കൈകളിൽ പുരട്ടുന്നത്, മോതിരം തിളങ്ങുന്നത് തുടങ്ങിയവ. ആദ്യത്തെ 10 ഉപഭോക്താക്കൾക്ക് സൗജന്യ ഷിപ്പിംഗോ ഫ്രീ സാമ്പിളോ നൽകുക.",
        ar: "انشر مقاطع ريلز قصيرة مدتها 7 إلى 10 ثوانٍ تظهر تجربة المنتج وتغليفه. قدم شحناً مجانياً أو هدية ترويجية لأول 10 عملاء لتشجيعهم."
      },
      checks: ["7-Sec Aesthetic Reels", "Unboxing Content", "Launch Promotion"]
    },
    {
      step: 7,
      title: {
        en: "Ship Safely, Request Reviews & Reinvest Profits",
        ml: "സുരക്ഷിതമായി അയക്കുക, റിവ്യൂകൾ ശേഖരിക്കുക, ലാഭം വീണ്ടും നിക്ഷേപിക്കുക",
        ar: "الشحن الآمن، جمع آراء العملاء، وإعادة استثمار الأرباح"
      },
      desc: {
        en: "Dispatch orders within 24 hours and share tracking slip immediately. Message customer 3 days later: 'Did the package arrive safely? How did you like the scent?' Screenshot positive reviews and post to Instagram Highlights!",
        ml: "ഓർഡർ ലഭിച്ച് 24 മണിക്കൂറിനകം കൊറിയർ അയച്ച് ട്രാക്കിംഗ് നമ്പർ നൽകുക. 3 ദിവസത്തിന് ശേഷം കസ്റ്റമറെ വിളിച്ച് സാധനം ഇഷ്ടപ്പെട്ടോ എന്ന് അന്വേഷിക്കുക. അവർ നൽകുന്ന നല്ല അഭിപ്രായങ്ങൾ സ്ക്രീൻഷോട്ട് എടുത്ത് ഇൻസ്റ്റാഗ്രാമിൽ ഹൈലൈറ്റ് ചെയ്യുക.",
        ar: "اشحن الطلبات خلال 24 ساعة وأرسل رقم التتبع فوراً للعميل. تواصل معهم بعد الاستلام لطلب تقييمهم الصادق وانشره في قصص إنستغرام لبناء المصداقية."
      },
      checks: ["24hr Dispatch", "Tracking Sent", "Review Screenshots", "Reinvest in Stock"]
    }
  ],

  // Domestic & International Logistics Rates Table
  logisticsRates: [
    { service: "ST Courier / Professional", zone: "Within Kerala (District to District)", weight: "Up to 500g", rate: "₹40 - ₹55", remarks: "Fastest overnight delivery across all Kerala towns" },
    { service: "India Post (Speed Post)", zone: "All India (Pin codes nationwide)", weight: "Up to 500g", rate: "₹45 - ₹65", remarks: "Covers every remote village; highly reliable & economical" },
    { service: "Shiprocket / Delhivery Surface", zone: "South India (TN, KA, AP, TS)", weight: "Up to 500g", rate: "₹55 - ₹75", remarks: "Automated door pickup, SMS tracking, COD option" },
    { service: "Shiprocket / Bluedart Air", zone: "Metro Cities (Delhi, Mumbai, Kolkata)", weight: "Up to 500g", rate: "₹75 - ₹95", remarks: "2-3 day express air transit" },
    { service: "India Post EMS International", zone: "GCC Countries (UAE, Saudi, Oman, Qatar)", weight: "1 Kg box", rate: "₹950 - ₹1,400", remarks: "Customs clearance included for alcohol-free attar & dresses" },
    { service: "Kerala Gulf Air Cargo Agents", zone: "UAE / Saudi / Qatar door delivery", weight: "Per Kg (Min 5-10kg)", rate: "₹350 - ₹550 / kg", remarks: "Ideal when NRI customers order bulk spices or attar sets" }
  ],

  // Instagram Commerce Blueprint Cards
  instaTips: [
    {
      icon: "fa-bullhorn",
      title: { en: "The High-Converting Bio Formula", ml: "ഉപഭോക്താക്കളെ ആകർഷിക്കുന്ന ബയോ ഫോർമുല", ar: "صيغة البايو الاحترافي لجذب الزبائن" },
      desc: { en: "Line 1: What you sell in 3 words (e.g., Pure Artisanal Attars). Line 2: Proof of quality (100% Alcohol-Free • Long Lasting). Line 3: Service area (Shipping Across India & GCC). Line 4: Call to action with WhatsApp link (Tap link below to order).", ml: "വരി 1: എന്താണ് വിൽക്കുന്നത് എന്ന് 3 വാക്കിൽ (ഉദാ: Pure Alcohol-Free Attars). വരി 2: ക്വാളിറ്റി തെളിവ് (Long Lasting • 100% Halal). വരി 3: സർവീസ് (Shipping Across India). വരി 4: ലിങ്കിൽ ക്ലിക്ക് ചെയ്ത് ഓർഡർ ചെയ്യുക (WhatsApp Link).", ar: "السطر 1: ما تبيعه بإيجاز (عطور زيتية فاخرة). السطر 2: ميزة الجودة (ثبات يدوم طويلاً وخالية من الكحول). السطر 3: نطاق الشحن (توصيل لكافة مدن الهند والخليج). السطر 4: دعوة للشراء عبر رابط الواتساب المباشر." }
    },
    {
      icon: "fa-video",
      title: { en: "3 Reel Themes that Generate Sales", ml: "വിൽപ്പന കൂട്ടുന്ന 3 റീൽ ആശയങ്ങൾ", ar: "3 أفكار لمقاطع ريلز تحقق مبيعات فورية" },
      desc: { en: "1) 'Pack an order with me': People love watching neat aesthetic packing. 2) 'Comparison test': Test your attar longevity vs standard perfume. 3) 'Customer review unboxing': Customer opening their parcel with pure delight.", ml: "1) 'Pack an order with me': മനോഹരമായി ഓർഡർ പാക്ക് ചെയ്യുന്ന വീഡിയോ. 2) 'ക്വാളിറ്റി ടെസ്റ്റ്': വെള്ളം തട്ടിയാലും മോതിരത്തിന്റെ നിറം മാറുന്നില്ലെന്ന് തെളിയിക്കുക. 3) കസ്റ്റമർ പാർസൽ തുറക്കുന്നതിന്റെ വിഷ്വൽസ്.", ar: "1) فيديو تغليف طلبية حقيقية للعميل. 2) تجربة إثبات الجودة (مقاومة الماء للخواتم أو ثبات رائحة العود). 3) لقطات فرحة الزبائن عند استلام وتجربة المنتج." }
    },
    {
      icon: "fa-gift",
      title: { en: "The Unboxing Psychology", ml: "പാക്കിംഗ് സൈക്കോളജി & കസ്റ്റമർ സന്തോഷം", ar: "سيكولوجية التغليف وإسعاد العميل" },
      desc: { en: "Never just send a dull plastic bag. Include: A handwritten note ('Thank you for supporting my small dream!'), a complimentary scent tester strip, and a small candy or chocolate. This triggers 5x more Instagram story tags and word-of-mouth!", ml: "വെറുമൊരു പ്ലാസ്റ്റിക് കവറിൽ മാത്രം അയക്കരുത്. കൈപ്പടയിൽ എഴുതിയ ചെറിയ നന്ദി കുറിപ്പ്, ഒരു ഫ്രീ സെന്റ് സാമ്പിൾ, ഒരു ചെറിയ മിഠായി എന്നിവ ഒപ്പം വെക്കുക. കസ്റ്റമർ സന്തോഷത്തോടെ ഇത് ഇൻസ്റ്റാഗ്രാം സ്റ്റോറി ഇടുകയും കൂടുതൽ ഓർഡർ വരികയും ചെയ്യും!", ar: "لا ترسل الطلب في كيس بلاستيكي باهت أبداً. ضع بطاقة شكر مكتوبة بخط يدك، عينة عطرية إضافية مجانية، وحلوى صغيرة. هذه التفاصيل تجعل الزبائن ينشرون صور مشترياتهم بحماس." }
    },
    {
      icon: "fa-shield-halved",
      title: { en: "Preventing COD Scams & Refusals", ml: "COD ചതികൾ എങ്ങനെ തടയാം", ar: "تجنب مخاطر ورفض الدفع عند الاستلام" },
      desc: { en: "Always call or WhatsApp confirm every order before dispatching. If offering COD, collect a nominal ₹50 token delivery charge upfront via UPI. Genuine buyers will gladly pay ₹50, while time-wasters are filtered out immediately.", ml: "പാർസൽ അയക്കുന്നതിന് മുൻപ് ഫോണിലോ വാട്സ്ആപ്പിലോ കസ്റ്റമറെ വിളിച്ച് ഓർഡർ ഉറപ്പാക്കുക. COD ആണെങ്കിൽ പോലും ₹50 ഷിപ്പിംഗ് ചാർജ് മുൻകൂറായി Google Pay വഴി വാങ്ങുക. ആത്മാർത്ഥതയുള്ള ഉപഭോക്താക്കൾ ഇത് സന്തോഷത്തോടെ നൽകും.", ar: "أكد الطلب دائماً عبر الواتساب أو الاتصال قبل الشحن. اطلب عربوناً بسيطاً (50 روبية) مقدماً كرسوم توصيل لتأكيد الجدية وتفادي المتلاعبين." }
    }
  ],

  // Initialization
  init() {
    this.detectLanguage();
    this.renderCategoryBlueprint(this.activeCategory);
    this.renderDirectory();
    this.renderRoadmap();
    this.renderLogisticsTable();
    this.renderInstaTips();
    this.renderTemplates();
    this.renderLegalGuide();
    this.renderEquipment();
    this.renderFAQs();
    this.calculateProfit();
    this.bindEvents();
    this.generatePersonalPlan();
  },

  // Detect and set language
  detectLanguage() {
    const saved = localStorage.getItem('vyapar_lang');
    if (saved && ['en', 'ml', 'ar'].includes(saved)) {
      this.currentLang = saved;
    }
    this.applyLanguage(this.currentLang);
  },

  // Switch Language
  switchLanguage(lang) {
    if (!['en', 'ml', 'ar'].includes(lang)) return;
    this.currentLang = lang;
    localStorage.setItem('vyapar_lang', lang);
    this.applyLanguage(lang);
  },

  // Cycle Language for floating dock
  cycleLanguage() {
    const sequence = ['en', 'ml', 'ar'];
    const nextIdx = (sequence.indexOf(this.currentLang) + 1) % sequence.length;
    this.switchLanguage(sequence[nextIdx]);
  },

  // Apply Language to DOM & RTL
  applyLanguage(lang) {
    const t = this.i18n[lang];
    if (!t) return;

    // Set HTML attribute and body classes
    const html = document.documentElement;
    html.lang = lang;
    if (lang === 'ar') {
      html.dir = 'rtl';
      document.body.className = 'lang-ar';
    } else if (lang === 'ml') {
      html.dir = 'ltr';
      document.body.className = 'lang-ml';
    } else {
      html.dir = 'ltr';
      document.body.className = 'lang-en';
    }

    // Update active state in top-bar buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update floating dock text
    const dockLang = document.getElementById('dockLangText');
    if (dockLang) dockLang.textContent = lang.toUpperCase();

    // Update Text Elements by IDs
    const textIds = [
      'siteTitle', 'siteSubtitle', 'topBarTagline', 'langCurrentText',
      'navCategories', 'navQuiz', 'navSuppliers', 'navCalculator', 'navTemplates', 'navLegal',
      'navRoadmap', 'navLogistics', 'navPlanBuilder',
      'heroBadge', 'heroHeading', 'heroDesc',
      'statMinInvest', 'statMargin', 'statSuppliers', 'statLang',
      'btnExploreNiches', 'btnTakeQuiz', 'btnOpenCalc',
      'previewTitle', 'quickAttarTitle', 'quickAttarInfo',
      'quickClothingTitle', 'quickClothingInfo', 'quickWatchTitle', 'quickWatchInfo',
      'quickRingTitle', 'quickRingInfo', 'quickBagTitle', 'quickBagInfo',
      'previewTip', 'tagPopular', 'tagHighVol', 'tagGifts', 'tagLowRisk', 'tagAesthetic',
      'secBadgeNiches', 'secTitleNiches', 'secSubNiches',
      'tabAttar', 'tabClothing', 'tabWatches', 'tabBags', 'tabAccessories', 'tabSpices',
      'quizBadge', 'quizTitle', 'quizSubtitle', 'q1Title', 'q1Opt1', 'q1Opt2', 'q1Opt3',
      'q2Title', 'q2Opt1', 'q2Opt2', 'q3Title', 'q3Opt1', 'q3Opt2', 'q3Opt3', 'btnCalculateMatch',
      'calcBadge', 'calcTitle', 'calcSubtitle', 'calcInputsTitle',
      'lblCalcCategory', 'lblCalcCost', 'helperCost', 'lblCalcPrice', 'helperPrice',
      'lblCalcPack', 'helperPack', 'lblCalcShip', 'helperShip', 'lblCalcVol', 'helperVol',
      'lblCalcShipOpt', 'btnRecalcText', 'calcResultsTitle',
      'resLblNetProfitMonth', 'resLblMargin', 'resLblPerItem', 'resLblRevenue',
      'resLblStockCost', 'resLblTotalPackaging', 'resLblTotalShipping',
      'resLblPaymentGateway', 'resLblStartupCap', 'gccConvTitle', 'calcProTip',
      'dirBadge', 'dirTitle', 'dirSubtitle',
      'tmplBadge', 'tmplTitle', 'tmplSubtitle',
      'legalBadge', 'legalTitle', 'legalSubtitle',
      'equipBadge', 'equipTitle', 'equipSubtitle',
      'faqBadge', 'faqTitle', 'faqSubtitle',
      'roadBadge', 'roadTitle', 'roadSubtitle',
      'logBadge', 'logTitle', 'logSubtitle', 'logRatesTitle',
      'thService', 'thZone', 'thWeight', 'thRate', 'thRemarks',
      'logCodTitle', 'tipRtoTitle', 'tipRtoDesc', 'tipGatewayTitle', 'tipGatewayDesc',
      'tipGccTitle', 'tipGccDesc',
      'instaBadge', 'instaTitle', 'instaSubtitle',
      'planBadge', 'planTitle', 'planSubtitle',
      'lblFounderName', 'lblPlanNiche', 'lblPlanBudget', 'btnGenPlanText',
      'footerDesc', 'footHeadingNiches', 'footHeadingHubs', 'footHeadingTools', 'footerMotto'
    ];

    textIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && t[id]) {
        el.innerHTML = t[id];
      }
    });

    const searchInput = document.getElementById('dirSearchInput');
    if (searchInput && t.dirSearchPlaceholder) {
      searchInput.placeholder = t.dirSearchPlaceholder;
    }

    // Re-render dynamic sections in the current language
    this.renderCategoryBlueprint(this.activeCategory);
    this.renderDirectory();
    this.renderTemplates();
    this.renderLegalGuide();
    this.renderEquipment();
    this.renderFAQs();
    this.renderRoadmap();
    this.renderLogisticsTable();
    this.renderInstaTips();
    this.calculateProfit();
    this.generatePersonalPlan();
  },

  // Category Tab Switcher
  selectCategory(catKey) {
    if (!this.categoriesData[catKey]) return;
    this.activeCategory = catKey;
    document.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === catKey);
    });
    this.renderCategoryBlueprint(catKey);

    // Sync calculator category dropdown
    const calcCat = document.getElementById('calcCategory');
    if (calcCat) {
      calcCat.value = catKey;
      this.populateCategoryDefaults(catKey);
      this.calculateProfit();
    }
  },

  // Render Detailed Category Blueprint
  renderCategoryBlueprint(catKey) {
    const cat = this.categoriesData[catKey];
    const container = document.getElementById('categoryContent');
    if (!cat || !container) return;

    const lang = this.currentLang;
    const title = cat.title[lang] || cat.title.en;
    const tagline = cat.tagline[lang] || cat.tagline.en;
    const steps = cat.steps[lang] || cat.steps.en;

    let sellersHtml = '';
    cat.topSellers.forEach(item => {
      const itemName = item.name[lang] || item.name.en;
      sellersHtml += `
        <li class="price-item">
          <span class="item-name">${itemName}</span>
          <div class="item-pricing">
            <span class="wholesale"><small>Wholesale:</small> ${item.wholesale}</span>
            <span class="retail"><small>Retail:</small> ${item.retail}</span>
          </div>
        </li>
      `;
    });

    let stepsHtml = '';
    steps.forEach((step, idx) => {
      stepsHtml += `
        <li class="beginner-step">
          <span class="step-num-badge">${idx + 1}</span>
          <span>${step}</span>
        </li>
      `;
    });

    let marketsHtml = '';
    cat.markets.forEach(mkt => {
      marketsHtml += `<span class="market-hub-badge"><i class="fa-solid fa-location-dot"></i> ${mkt}</span>`;
    });

    container.innerHTML = `
      <div class="category-blueprint-card">
        <div class="blueprint-hero-strip">
          <div class="blue-title-area">
            <h3>${title}</h3>
            <p>${tagline}</p>
          </div>
          <div class="blue-quick-metrics">
            <div class="metric-pill">
              <span class="lbl">${lang === 'ml' ? 'കുറഞ്ഞ മുതൽമുടക്ക്' : lang === 'ar' ? 'أقل رأس مال' : 'Initial Budget'}</span>
              <span class="val">${cat.minBudget}</span>
            </div>
            <div class="metric-pill">
              <span class="lbl">${lang === 'ml' ? 'ലാഭവിഹിതം' : lang === 'ar' ? 'هامش الربح' : 'Profit Margin'}</span>
              <span class="val">${cat.margin}</span>
            </div>
          </div>
        </div>

        <div class="blueprint-body">
          <div class="blue-col-box">
            <h4><i class="fa-solid fa-tags"></i> ${lang === 'ml' ? 'വില വിവരങ്ങളും ലാഭവും' : lang === 'ar' ? 'الأسعار وهوامش الربح' : 'Popular Items & Price Breakdown'}</h4>
            <ul class="price-breakdown-list">
              ${sellersHtml}
            </ul>
          </div>

          <div class="blue-col-box">
            <h4><i class="fa-solid fa-list-check"></i> ${lang === 'ml' ? 'തുടക്കക്കാർ ചെയ്യേണ്ട കാര്യങ്ങൾ' : lang === 'ar' ? 'خطوات البدء للمبتدئين' : "Beginner's Step-by-Step Action Plan"}</h4>
            <ul class="beginner-guide-list">
              ${stepsHtml}
            </ul>
          </div>

          <div class="blueprint-market-strip">
            <h4><i class="fa-solid fa-truck-ramp-box"></i> ${lang === 'ml' ? 'സാധനങ്ങൾ വാങ്ങേണ്ട പ്രധാന മാർക്കറ്റുകൾ' : lang === 'ar' ? 'أهم أسواق الجملة للشراء' : 'Recommended Sourcing & Wholesale Hubs'}</h4>
            <p style="font-size: 0.85rem; color: #7c2d12; margin-bottom: 8px;">
              ${lang === 'ml' ? 'താഴെ നൽകിയിട്ടുള്ള വിപണികളിൽ നിന്നും നേരിട്ടോ വാട്സ്ആപ്പ് വഴിയോ ഓർഡർ ചെയ്യാം:' : lang === 'ar' ? 'يمكن الشراء بالحضور المباشر أو الطلب عبر الهاتف والشحن:' : 'Visit in person or order sample batches directly via phone / courier:'}
            </p>
            <div class="market-badges-wrap">
              ${marketsHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Business Compatibility Quiz Logic
  runBusinessQuiz() {
    const budget = document.querySelector('input[name="quizBudget"]:checked')?.value || 'low';
    const time = document.querySelector('input[name="quizTime"]:checked')?.value || 'part_time';
    const audience = document.querySelector('input[name="quizAudience"]:checked')?.value || 'perfume';
    const resBox = document.getElementById('quizResultArea');
    if (!resBox) return;

    let matchedCat = 'attar';
    let matchPct = 95;
    let reasonEn = "";
    let reasonMl = "";
    let reasonAr = "";

    if (budget === 'low') {
      if (audience === 'youth') {
        matchedCat = 'accessories';
        matchPct = 98;
        reasonEn = "Anti-tarnish jewelry requires lowest starting capital (₹2,500), has zero breakage risk, and 300% profit margin!";
        reasonMl = "മോതിരങ്ങളും ഫാഷൻ ആഭരണങ്ങളും വെറും ₹2,500-ൽ തുടങ്ങാം; ഭാരം കുറവായതിനാൽ കൊറിയർ ചെലവ് തുച്ഛം, 300% വരെ ലാഭം!";
        reasonAr = "الخواتم والإكسسوارات تتطلب أقل رأس مال (2500 روبية فقط) وشحنها شبه مجاني مع أرباح تصل إلى 300%!";
      } else {
        matchedCat = 'attar';
        matchPct = 96;
        reasonEn = "Attar can be started with just ₹3,000 for oils & crystal bottles, offering the highest repeat customers.";
        reasonMl = "അത്തർ ബിസിനസ്സ് വെറും ₹3,000 ന് തുടങ്ങാം; സുഗന്ധം ഇഷ്ടപ്പെടുന്ന സ്ഥിരം കസ്റ്റമേഴ്സിനെ വേഗത്തിൽ സ്വന്തമാക്കാം.";
        reasonAr = "دهن العود والعطور يمكنك إطلاقها بـ 3000 روبية فقط، وتتميز بطلب مستمر وتكرار الشراء."
      }
    } else if (budget === 'medium') {
      if (audience === 'fashion') {
        matchedCat = 'clothing';
        matchPct = 94;
        reasonEn = "With ₹15,000 you can source 25-30 curated abayas/kurtis from Surat and launch an aesthetic Instagram boutique.";
        reasonMl = "₹15,000 ഉണ്ടെങ്കിൽ സൂററ്റിൽ നിന്ന് 25-30 അബായകൾ/കുർത്തീസ് വാങ്ങി ഇൻസ്റ്റാഗ്രാം ബോട്ടിക് വിജയകരമായി നടത്താം.";
        reasonAr = "بميزانية 15 ألف روبية يمكنك استيراد دفعة عبايات راقية من سورات وإطلاق متجر إنستغرام جذاب."
      } else {
        matchedCat = 'watches';
        matchPct = 92;
        reasonEn = "Curated fashion watches and couple gift boxes yield high order values with impulse buying.";
        reasonMl = "വാച്ചുകൾ ഗിഫ്റ്റ് ബോക്സുകളിൽ വെച്ച് വിൽക്കുമ്പോൾ മികച്ച ലാഭവും ആളുകളിൽ നിന്ന് പെട്ടെന്നുള്ള ഓർഡറുകളും ലഭിക്കും.";
        reasonAr = "الساعات الفاخرة وأطقم الهدايا تحقق مبيعات سريعة وأرباحاً ممتازة دون تعقيد."
      }
    } else {
      matchedCat = 'clothing';
      matchPct = 97;
      reasonEn = "With ₹40k+ capital, modest fashion and boutique wear allows bulk factory discounts from Surat & Tirupur.";
      reasonMl = "₹40,000-ൽ അധികം മൂലധനമുണ്ടെങ്കിൽ സൂററ്റിൽ നിന്നും തിരുപ്പൂരിൽ നിന്നും നേരിട്ട് ഫാക്ടറി നിരക്കിൽ കൂടുതൽ കളക്ഷനുകൾ എത്തിക്കാം.";
      reasonAr = "برأس مال 40 ألف روبية يمكنك الحصول على أسعار المصنع التنافسية للعبايات والملابس من سورات وتيروبور."
    }

    const catInfo = this.categoriesData[matchedCat];
    const catName = catInfo ? (catInfo.title[this.currentLang] || catInfo.title.en) : matchedCat;
    const lang = this.currentLang;
    const finalReason = lang === 'ml' ? reasonMl : lang === 'ar' ? reasonAr : reasonEn;

    resBox.style.display = 'block';
    resBox.innerHTML = `
      <div class="quiz-match-header">
        <div>
          <span style="font-size: 0.82rem; color: #a7f3d0; text-transform: uppercase; font-weight: 700;">
            ${lang === 'ml' ? 'നിങ്ങൾക്ക് ഏറ്റവും യോജിച്ച ബിസിനസ്:' : lang === 'ar' ? 'المشروع الأنسب لمعاييرك هو:' : 'Your Ideal Business Match:'}
          </span>
          <h3 style="font-size: 1.5rem; font-weight: 800; color: #ffffff; margin-top: 4px;">${catName}</h3>
        </div>
        <span class="quiz-match-badge">${matchPct}% Compatibility</span>
      </div>
      <p style="font-size: 0.92rem; color: #f1f5f9; line-height: 1.6; margin-bottom: 16px;">${finalReason}</p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button class="btn btn-secondary" onclick="app.selectCategory('${matchedCat}'); window.location.href='#categories'">
          <i class="fa-solid fa-arrow-right"></i> ${lang === 'ml' ? 'ഈ ബിസിനസ്സിന്റെ പൂർണ്ണ വിവരങ്ങൾ കാണുക' : lang === 'ar' ? 'عرض تفاصيل هذا المشروع' : 'View Full Blueprint'}
        </button>
        <button class="btn btn-outline" onclick="window.location.href='#calculator'">
          <i class="fa-solid fa-calculator"></i> ${lang === 'ml' ? 'ലാഭം കണക്കാക്കുക' : lang === 'ar' ? 'حساب الأرباح' : 'Calculate Profit'}
        </button>
      </div>
    `;
    resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  // Populate Default Numbers in Calculator When Category Changes
  populateCategoryDefaults(catKey) {
    const costInput = document.getElementById('calcWholesaleCost');
    const priceInput = document.getElementById('calcSellingPrice');
    const packInput = document.getElementById('calcPackagingCost');
    const shipInput = document.getElementById('calcShippingFee');

    if (catKey === 'attar') {
      costInput.value = 80;
      priceInput.value = 349;
      packInput.value = 25;
      shipInput.value = 50;
    } else if (catKey === 'clothing') {
      costInput.value = 550;
      priceInput.value = 1499;
      packInput.value = 35;
      shipInput.value = 60;
    } else if (catKey === 'watches') {
      costInput.value = 250;
      priceInput.value = 899;
      packInput.value = 40;
      shipInput.value = 55;
    } else if (catKey === 'bags') {
      costInput.value = 90;
      priceInput.value = 399;
      packInput.value = 20;
      shipInput.value = 45;
    } else if (catKey === 'accessories') {
      costInput.value = 45;
      priceInput.value = 349;
      packInput.value = 15;
      shipInput.value = 40;
    } else if (catKey === 'spices') {
      costInput.value = 320;
      priceInput.value = 750;
      packInput.value = 30;
      shipInput.value = 60;
    }
  },

  // Dynamic Financial Calculations
  calculateProfit() {
    const cost = parseFloat(document.getElementById('calcWholesaleCost').value) || 0;
    const price = parseFloat(document.getElementById('calcSellingPrice').value) || 0;
    const packaging = parseFloat(document.getElementById('calcPackagingCost').value) || 0;
    const shipping = parseFloat(document.getElementById('calcShippingFee').value) || 0;
    const volume = parseInt(document.getElementById('calcMonthlyVolume').value) || 0;
    const shippingOpt = document.getElementById('calcShippingOption').value;

    const netShippingPaidBySeller = (shippingOpt === 'customer_pays') ? 0 : shipping;
    const paymentGatewayFee = price * 0.02;

    const netProfitPerUnit = price - (cost + packaging + netShippingPaidBySeller + paymentGatewayFee);
    const profitMarginPct = price > 0 ? ((netProfitPerUnit / price) * 100).toFixed(1) : 0;

    const monthlyRevenue = price * volume;
    const monthlyStockCost = cost * volume;
    const monthlyPackagingCost = packaging * volume;
    const monthlyShippingCost = netShippingPaidBySeller * volume;
    const monthlyGatewayFee = paymentGatewayFee * volume;
    const monthlyNetProfit = netProfitPerUnit * volume;

    const initialBatchUnits = Math.min(20, Math.max(10, Math.round(volume / 3)));
    const initialCapital = (cost + packaging) * initialBatchUnits;

    document.getElementById('resValNetProfitMonth').textContent = `₹${Math.round(monthlyNetProfit).toLocaleString('en-IN')}`;
    document.getElementById('resValMargin').textContent = `${profitMarginPct}%`;
    document.getElementById('resValPerItem').textContent = `₹${netProfitPerUnit.toFixed(2)}`;
    document.getElementById('resValRevenue').textContent = `₹${Math.round(monthlyRevenue).toLocaleString('en-IN')}`;
    document.getElementById('resValStockCost').textContent = `- ₹${Math.round(monthlyStockCost).toLocaleString('en-IN')}`;
    document.getElementById('resValTotalPackaging').textContent = `- ₹${Math.round(monthlyPackagingCost).toLocaleString('en-IN')}`;
    
    const shippingRow = document.getElementById('resValTotalShipping');
    if (shippingOpt === 'customer_pays') {
      shippingRow.textContent = this.currentLang === 'ml' ? "₹0 (കസ്റ്റമർ നൽകുന്നു)" : this.currentLang === 'ar' ? "₹0 (على حساب المشتري)" : "₹0 (Paid by Buyer)";
    } else {
      shippingRow.textContent = `- ₹${Math.round(monthlyShippingCost).toLocaleString('en-IN')}`;
    }

    document.getElementById('resValPaymentGateway').textContent = `- ₹${Math.round(monthlyGatewayFee).toLocaleString('en-IN')}`;
    document.getElementById('resValStartupCap').textContent = `₹${Math.round(initialCapital).toLocaleString('en-IN')} (${initialBatchUnits} units)`;

    // Update GCC Currency Row
    this.updateGccPills(monthlyNetProfit);
  },

  // Update GCC Multi-Currency Converter Pills
  updateGccPills(inrAmount) {
    const row = document.getElementById('gccPillsRow');
    if (!row) return;

    // Standard baseline conversion rates
    const aed = (inrAmount * 0.044).toFixed(0);
    const sar = (inrAmount * 0.045).toFixed(0);
    const qar = (inrAmount * 0.044).toFixed(0);
    const omr = (inrAmount * 0.0046).toFixed(1);
    const kwd = (inrAmount * 0.0037).toFixed(1);

    row.innerHTML = `
      <span class="gcc-pill">🇦🇪 UAE: <strong>${aed} AED</strong></span>
      <span class="gcc-pill">🇸🇦 Saudi: <strong>${sar} SAR</strong></span>
      <span class="gcc-pill">🇶🇦 Qatar: <strong>${qar} QAR</strong></span>
      <span class="gcc-pill">🇴🇲 Oman: <strong>${omr} OMR</strong></span>
      <span class="gcc-pill">🇰🇼 Kuwait: <strong>${kwd} KWD</strong></span>
    `;
  },

  // Render Verified Supplier Directory
  renderDirectory() {
    const container = document.getElementById('directoryList');
    if (!container) return;

    const searchTerm = (document.getElementById('dirSearchInput')?.value || '').toLowerCase();
    const cityFilter = document.getElementById('filterCity')?.value || 'all';
    const catFilter = document.getElementById('filterCategory')?.value || 'all';
    const lang = this.currentLang;

    const filtered = this.suppliers.filter(sup => {
      const matchCity = (cityFilter === 'all') || (sup.city.toLowerCase() === cityFilter.toLowerCase());
      const matchCat = (catFilter === 'all') || (sup.category.toLowerCase() === catFilter.toLowerCase());
      const matchSearch = !searchTerm || 
        sup.name.toLowerCase().includes(searchTerm) ||
        sup.city.toLowerCase().includes(searchTerm) ||
        sup.address.toLowerCase().includes(searchTerm) ||
        sup.specialty.toLowerCase().includes(searchTerm) ||
        sup.tags.some(t => t.toLowerCase().includes(searchTerm));

      return matchCity && matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 12px; color: var(--border-color);"></i>
          <p>${lang === 'ml' ? 'വ്യാപാരികളെ കണ്ടെത്തിയില്ല. ഫിൽട്ടർ മാറ്റി ശ്രമിക്കുക.' : lang === 'ar' ? 'لم يتم العثور على موردين مطابقين لبحثك.' : 'No suppliers match your search filters. Try resetting the filters.'}</p>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(sup => {
      const waMsg = encodeURIComponent(
        lang === 'ml' 
          ? `ഹലോ ${sup.name}, ഞാൻ 'വ്യാപാര ശിക്ഷ' വെബ്സൈറ്റിൽ നിങ്ങളുടെ കടയുടെ വിവരം കണ്ടതാണ്. എനിക്ക് നിങ്ങളുടെ ഹോൾസെയിൽ കാറ്റലോഗും വിലവിവരങ്ങളും വേണം.`
          : lang === 'ar'
          ? `مرحباً ${sup.name}، وجدت بيانات متجركم عبر منصة رواد الأعمال. أود الاطلاع على كتالوج الجملة وقائمة الأسعار لديكم.`
          : `Hello ${sup.name}, I found your wholesale details on Vyapar Shiksha. I want to inquire about your wholesale catalog and bulk pricing.`
      );
      const waLink = `https://wa.me/${sup.whatsapp}?text=${waMsg}`;

      let tagsHtml = '';
      sup.tags.forEach(t => {
        tagsHtml += `<span class="supplier-tag">${t}</span>`;
      });

      html += `
        <div class="supplier-card">
          <div class="supplier-head">
            <h4 class="supplier-name">${sup.name}</h4>
            <span class="city-badge">${sup.city}</span>
          </div>
          <p class="supplier-address">
            <i class="fa-solid fa-location-dot"></i>
            <span>${sup.address}</span>
          </p>
          <p style="font-size: 0.85rem; color: #1e293b; margin-bottom: 8px;">
            <strong>${lang === 'ml' ? 'പ്രത്യേകതകൾ:' : lang === 'ar' ? 'أهم المنتجات:' : 'Specialties:'}</strong> ${sup.specialty}
          </p>
          <p style="font-size: 0.78rem; color: #64748b; margin-bottom: 14px;">
            <i class="fa-solid fa-box"></i> <strong>MOQ:</strong> ${sup.moq}
          </p>
          <div class="supplier-tags">
            ${tagsHtml}
          </div>
          <div class="supplier-actions">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
              <i class="fa-brands fa-whatsapp"></i> ${lang === 'ml' ? 'വാട്സ്ആപ്പ് ചാറ്റ്' : lang === 'ar' ? 'محادثة واتساب' : 'WhatsApp Chat'}
            </a>
            <a href="tel:${sup.phone}" class="btn-map-call">
              <i class="fa-solid fa-phone"></i> ${lang === 'ml' ? 'വിളിക്കുക' : lang === 'ar' ? 'اتصال' : 'Call'}
            </a>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Render WhatsApp Templates
  renderTemplates() {
    const container = document.getElementById('templatesGrid');
    if (!container) return;

    const lang = this.currentLang;
    let html = '';

    this.templatesData.forEach(tmpl => {
      const title = tmpl.title[lang] || tmpl.title.en;
      const text = tmpl.text[lang] || tmpl.text.en;

      html += `
        <div class="template-card">
          <div class="tmpl-head">
            <div class="tmpl-icon"><i class="fa-solid ${tmpl.icon}"></i></div>
            <h4 class="tmpl-title">${title}</h4>
          </div>
          <div class="tmpl-body-box" id="tmplText_${tmpl.id}">${text}</div>
          <button class="btn-copy-tmpl" onclick="app.copyTemplate('${tmpl.id}')">
            <i class="fa-regular fa-copy"></i> <span id="btnCopyLabel_${tmpl.id}">${lang === 'ml' ? 'മെസ്സേജ് കോപ്പി ചെയ്യുക' : lang === 'ar' ? 'نسخ الرسالة' : 'Copy Message'}</span>
          </button>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Copy template text to clipboard
  copyTemplate(tmplId) {
    const box = document.getElementById(`tmplText_${tmplId}`);
    const label = document.getElementById(`btnCopyLabel_${tmplId}`);
    if (!box) return;

    navigator.clipboard.writeText(box.innerText).then(() => {
      if (label) {
        const originalText = label.innerText;
        label.innerText = this.currentLang === 'ml' ? 'കോപ്പി ചെയ്തു! ✓' : this.currentLang === 'ar' ? 'تم النسخ بنجاح! ✓' : 'Copied! ✓';
        setTimeout(() => {
          label.innerText = originalText;
        }, 2000);
      }
    });
  },

  // Render Legal & Compliance Section
  renderLegalGuide() {
    const container = document.getElementById('legalGrid');
    if (!container) return;

    const lang = this.currentLang;
    let html = '';

    this.legalData.forEach(item => {
      const title = item.title[lang] || item.title.en;
      const desc = item.desc[lang] || item.desc.en;
      const badgeText = item.badgeText[lang] || item.badgeText.en;

      html += `
        <div class="legal-card">
          <span class="badge-law ${item.badge}">${badgeText}</span>
          <h4>${title}</h4>
          <p>${desc}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Render Equipment Toolkit
  renderEquipment() {
    const container = document.getElementById('equipGrid');
    if (!container) return;

    const lang = this.currentLang;
    let html = '';

    this.equipData.forEach(item => {
      const title = item.title[lang] || item.title.en;
      const desc = item.desc[lang] || item.desc.en;

      html += `
        <div class="equip-card">
          <div class="equip-icon"><i class="fa-solid ${item.icon}"></i></div>
          <h4>${title}</h4>
          <span class="equip-price">${item.price}</span>
          <p class="equip-desc">${desc}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Render Beginner FAQs
  renderFAQs() {
    const container = document.getElementById('faqAccordion');
    if (!container) return;

    const lang = this.currentLang;
    let html = '';

    this.faqData.forEach((item, idx) => {
      const q = item.q[lang] || item.q.en;
      const a = item.a[lang] || item.a.en;

      html += `
        <div class="faq-item ${idx === 0 ? 'active' : ''}">
          <button class="faq-question" onclick="this.parentElement.classList.toggle('active')">
            <span>${q}</span>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          <div class="faq-answer">
            <p>${a}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Render 7-Step Roadmap
  renderRoadmap() {
    const container = document.getElementById('roadmapList');
    if (!container) return;

    const lang = this.currentLang;
    let html = '';

    this.roadmapData.forEach(item => {
      const title = item.title[lang] || item.title.en;
      const desc = item.desc[lang] || item.desc.en;

      let checksHtml = '';
      item.checks.forEach(chk => {
        checksHtml += `<span class="road-check-pill"><i class="fa-solid fa-check text-success"></i> ${chk}</span>`;
      });

      html += `
        <div class="roadmap-step-card">
          <div class="road-step-badge">${item.step}</div>
          <div class="road-content">
            <h4>${title}</h4>
            <p>${desc}</p>
            <div class="road-checklist">
              ${checksHtml}
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Render Logistics Rates Table
  renderLogisticsTable() {
    const tbody = document.getElementById('logisticsTableBody');
    if (!tbody) return;

    let html = '';
    this.logisticsRates.forEach(rate => {
      html += `
        <tr>
          <td><strong>${rate.service}</strong></td>
          <td>${rate.zone}</td>
          <td>${rate.weight}</td>
          <td><span class="text-success" style="font-weight: 700;">${rate.rate}</span></td>
          <td><small class="text-muted">${rate.remarks}</small></td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  },

  // Render Instagram Tips
  renderInstaTips() {
    const container = document.getElementById('instaTipsGrid');
    if (!container) return;

    const lang = this.currentLang;
    let html = '';

    this.instaTips.forEach(tip => {
      const title = tip.title[lang] || tip.title.en;
      const desc = tip.desc[lang] || tip.desc.en;

      html += `
        <div class="insta-card">
          <div class="card-icon"><i class="fa-solid ${tip.icon}"></i></div>
          <h4>${title}</h4>
          <p>${desc}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Generate Personalized Business Plan
  generatePersonalPlan() {
    const name = document.getElementById('planFounderName')?.value || 'Entrepreneur';
    const nicheKey = document.getElementById('planNicheSelect')?.value || 'attar';
    const budgetVal = parseInt(document.getElementById('planBudget')?.value) || 15000;
    const container = document.getElementById('planOutputArea');
    if (!container) return;

    const lang = this.currentLang;
    const cat = this.categoriesData[nicheKey];
    const catTitle = cat ? (cat.title[lang] || cat.title.en) : nicheKey;

    const matchingSuppliers = this.suppliers.filter(s => s.category === nicheKey).slice(0, 3);
    let supNames = matchingSuppliers.map(s => `${s.name} (${s.city} - ${s.phone})`).join(', ');
    if (!supNames) supNames = "Kozhikode S.M. Street & Mumbai Crawford Market";

    const expectedOrders = budgetVal <= 5000 ? "30 - 45 orders" : budgetVal <= 20000 ? "60 - 100 orders" : "150 - 250 orders";
    const expectedProfit = budgetVal <= 5000 ? "₹8,000 - ₹14,000" : budgetVal <= 20000 ? "₹22,000 - ₹38,000" : "₹50,000 - ₹90,000";

    container.innerHTML = `
      <div class="plan-result-document">
        <div class="plan-doc-header">
          <div class="plan-doc-title">
            <h3><i class="fa-solid fa-file-signature text-success"></i> ${name} — 1-Page Business Launch Blueprint</h3>
            <p>${catTitle} • Generated on ${new Date().toLocaleDateString()} via Vyapar Shiksha</p>
          </div>
          <button class="btn-print-plan" onclick="window.print()">
            <i class="fa-solid fa-print"></i> Print / Save PDF
          </button>
        </div>

        <div class="plan-doc-body">
          <div class="plan-doc-section">
            <h4><i class="fa-solid fa-coins"></i> Financial & Capital Plan</h4>
            <ul>
              <li><strong>Initial Working Capital:</strong> ₹${budgetVal.toLocaleString('en-IN')}</li>
              <li><strong>Recommended First Batch Size:</strong> ${budgetVal <= 5000 ? '15 - 25 units' : '40 - 70 units'}</li>
              <li><strong>Target First Month Sales:</strong> ${expectedOrders}</li>
              <li><strong>Projected Monthly Net Profit:</strong> <span class="text-success" style="font-size: 1.1rem; font-weight: 800;">${expectedProfit}</span></li>
              <li><strong>Payment Strategy:</strong> Google Pay / PhonePe UPI (0% fee) + ₹50 advance for COD</li>
            </ul>
          </div>

          <div class="plan-doc-section">
            <h4><i class="fa-solid fa-shop"></i> Sourcing & Wholesalers</h4>
            <ul>
              <li><strong>Primary Wholesale Markets:</strong> Kozhikode S.M. Street, Mumbai Mohammad Ali Road / Crawford</li>
              <li><strong>Verified Key Contacts:</strong> ${supNames}</li>
              <li><strong>Packaging Checklist:</strong> Branded stickers, frosted zip pouches / boxes, thank you cards</li>
              <li><strong>Courier Partners:</strong> ST Courier (Kerala: ₹40-₹50), India Post (All India: ₹45-₹65)</li>
            </ul>
          </div>

          <div class="plan-doc-section">
            <h4><i class="fa-brands fa-instagram"></i> Instagram 14-Day Launch Plan</h4>
            <ul>
              <li><strong>Day 1-3:</strong> Set up Instagram Business Profile & WhatsApp Catalog with 10 clear photos</li>
              <li><strong>Day 4-7:</strong> Post 5 aesthetic unboxing and packaging reels with trending Malayalam/English audio</li>
              <li><strong>Day 8-10:</strong> Send complimentary sample boxes to 3 local micro-influencers or friend networks</li>
              <li><strong>Day 11-14:</strong> Offer inaugural free delivery on all prepaid orders; achieve first 15 sales</li>
            </ul>
          </div>

          <div class="plan-doc-section">
            <h4><i class="fa-solid fa-award"></i> The Golden Rules for Success</h4>
            <ul>
              <li>Never buy dead stock in bulk; always start with 15-20 fast-moving items.</li>
              <li>Ship within 24 hours to create delighted, repeating customers.</li>
              <li>Collect video/text reviews from day one to build social proof.</li>
              <li>Reinvest 70% of first month's profits directly back into expanding inventory.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  },

  // Event Listeners Binding
  bindEvents() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.switchLanguage(lang);
      });
    });

    document.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        this.selectCategory(cat);
      });
    });

    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
      });

      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          menu.classList.remove('active');
        });
      });
    }

    const calcInputs = [
      'calcWholesaleCost', 'calcSellingPrice', 'calcPackagingCost',
      'calcShippingFee', 'calcMonthlyVolume', 'calcShippingOption'
    ];
    calcInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.calculateProfit());
        el.addEventListener('change', () => this.calculateProfit());
      }
    });

    const calcCatSelect = document.getElementById('calcCategory');
    if (calcCatSelect) {
      calcCatSelect.addEventListener('change', (e) => {
        this.populateCategoryDefaults(e.target.value);
        this.calculateProfit();
      });
    }

    const btnRecalc = document.getElementById('btnRecalculate');
    if (btnRecalc) {
      btnRecalc.addEventListener('click', () => this.calculateProfit());
    }

    const dirSearch = document.getElementById('dirSearchInput');
    const filterCity = document.getElementById('filterCity');
    const filterCategory = document.getElementById('filterCategory');

    if (dirSearch) dirSearch.addEventListener('input', () => this.renderDirectory());
    if (filterCity) filterCity.addEventListener('change', () => this.renderDirectory());
    if (filterCategory) filterCategory.addEventListener('change', () => this.renderDirectory());

    const planNiche = document.getElementById('planNicheSelect');
    if (planNiche) {
      planNiche.addEventListener('change', () => this.generatePersonalPlan());
    }
    const planBudget = document.getElementById('planBudget');
    if (planBudget) {
      planBudget.addEventListener('change', () => this.generatePersonalPlan());
    }
  }
};

// Auto-run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
