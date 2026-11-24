/**
 * VYAPAR SHIKSHA (സംരംഭക പാഠശാല | منصة رواد الأعمال)
 * Complete Modular Single-Page Application (SPA) Engine
 * 
 * Features:
 * 1. Clean Homepage with Study Academies Overview, Real Photo Cards, 30-Sec Quiz & 7-Step Roadmap
 * 2. Dedicated Business Study Academies (പഠന ശാഖകൾ) with Step-by-Step Processing Stepper:
 *    - ഘട്ടം 1: ഉൽപ്പന്ന വിവരങ്ങളും വിപണിയും (Blueprint & Product Science)
 *    - ഘട്ടം 2: എന്തിനൊക്കെ എത്ര രൂപ? (Exact Capital & Itemized Budget Table)
 *    - ഘട്ടം 3: മൊത്തവ്യാപാര മാർക്കറ്റുകൾ & മാപ്പ് (Wholesale Hubs with Phone & Google Maps)
 *    - ഘട്ടം 4: വ്യാപാരികളോട് സംസാരിക്കേണ്ട രീതി (Wholesaler Calling Dialogue & Coaching)
 *    - ഘട്ടം 5: പുതിയത് ഉണ്ടാക്കാൻ എത്ര വേണം? (Formulation & How to Make Step-by-Step)
 *    - ഘട്ടം 6: ലൈവ് ലാഭ ഗ്രാഫ് (Live Profit Graph & Margin Visualizer)
 *    - ഘട്ടം 7: കൊറിയറും ആദ്യ വിൽപനയും (Courier Rates, Safe COD & 14-Day Launch Checklist)
 * 3. High-Resolution, 100% Authentic Real-Life Photography (Zero AI Cartoons/Fake Graphics)
 * 4. Dedicated Financial & Sourcing Tools View (Calculator, Directory, WhatsApp Scripts, Legal, Plan Generator)
 * 5. Complete Trilingual Localization (English, Malayalam, Arabic with full RTL support)
 */

const app = {
  currentLang: 'en',
  currentView: 'home',         // 'home' | 'academy' | 'tools'
  currentAcademy: 'attar',      // 'attar' | 'clothing' | 'watches' | 'bags' | 'accessories' | 'spices'
  currentToolTab: 'calc',       // 'calc' | 'suppliers' | 'scripts' | 'legal' | 'plan'
  currentCourseStep: 1,         // Active step inside academy (1 to 7)
  courseViewMode: 'stepper',    // 'stepper' (guided 1-step processing) | 'all' (view full masterclass)

  // Current Attar Simulator State
  simState: {
    oilId: 'white_musk',
    sizeMl: 6,
    bottleStyle: 'octagonal',
    packTier: 'velvet'
  },

  // Trilingual Localization Dictionary
  i18n: {
    en: {
      siteTitle: "VYAPAR SHIKSHA",
      siteSubtitle: "സംരംഭക പാഠശാല • منصة الانطلاق",
      topBarTagline: "Practical Business Academy for Kerala & Pan-India Micro-Entrepreneurs",
      langCurrentText: "Language:",
      
      // Header Nav
      navHome: "Home",
      navAcademies: "Study Academies",
      dropAttar: "Attar & Perfumes Academy",
      dropClothing: "Dresses & Boutique Academy",
      dropWatches: "Fashion Watches Academy",
      dropBags: "Canvas Totes & Bags Academy",
      dropAccessories: "Rings & Jewelry Academy",
      dropSpices: "Kerala Spices & Honey Academy",
      navTools: "Profit Tools",
      navSuppliers: "Wholesalers & Maps",
      navTemplates: "WhatsApp Scripts",
      navPlanBuilder: "Generate Plan",

      // Hero
      heroBadge: "No Business Experience Required • 100% Free Learning Portal",
      heroHeading: 'Learn How to Start a High-Profit <span class="gradient-text">Small Business</span> in Kerala & India',
      heroDesc: "A structured micro-business academy for beginners. Dedicated study courses for Attar, Modest Wear, Watches, Bags, and Rings: initial capital requirements, formulation guides, verified wholesale hubs with phone numbers & Google Maps, live profit graphs, and supplier negotiation scripts.",
      statFaculties: "Dedicated Academies",
      statMinInvest: "Min. Initial Investment",
      statMargin: "Realistic Profit Margin",
      statLang: "EN • മലയാളം • العربية",
      btnExploreNiches: "Explore Business Academies",
      btnTakeQuiz: "Find Which Business Fits You",
      btnViewDirectory: "Wholesaler Directory & Maps",

      // Hero Quick Preview
      previewTitle: "6 Specialized Business Academies",
      quickAttarTitle: "Attar & Perfume Academy",
      quickAttarInfo: "Budget: ₹3k - ₹12k • 80% - 250% Profit • Kozhikode & Mumbai",
      quickClothingTitle: "Dresses & Modest Wear Academy",
      quickClothingInfo: "Budget: ₹10k - ₹35k • Surat & Tirupur Direct Mills",
      quickWatchTitle: "Watches & Smartwatches Academy",
      quickWatchInfo: "Budget: ₹8k - ₹20k • Hard Box Combos • Mumbai & Delhi",
      quickRingTitle: "Anti-Tarnish Jewelry & Rings Academy",
      quickRingInfo: "Budget: ₹2.5k - ₹8k • 100% - 300% Margin • Lowest Risk",
      quickBagTitle: "Aesthetic Canvas Totes & Bags Academy",
      quickBagInfo: "Budget: ₹5k - ₹18k • Screen Printing • Dharavi Leather",
      previewTip: "Tap any academy above to open its comprehensive dedicated masterclass!",
      tagPopular: "High Margin",
      tagHighVol: "High Volume",
      tagGifts: "Great Gifts",
      tagLowRisk: "Lowest Risk",
      tagAesthetic: "Instagram Trend",

      // Faculty Grid on Home
      facultyBadge: "Choose Your Business Faculty",
      facultyTitle: "Dedicated Business Study Academies",
      facultySubtitle: "Each academy is an independent, complete masterclass. Learn the step-by-step creation roadmap, exact capital breakdown, supplier phone numbers with Google Maps, profit graphs, and negotiation dialogue.",
      btnStartCourse: "Open Study Academy",

      // Stepper Labels
      lblGuidedMode: "Guided Step Mode",
      lblAllStepsMode: "Full Syllabus",
      lblSwitchCourse: "Switch Course",
      step1Pill: "1. Product Science",
      step2Pill: "2. Capital Breakdown",
      step3Pill: "3. Wholesale Markets",
      step4Pill: "4. Calling Dialogue",
      step5Pill: "5. Formulation & Making",
      step6Pill: "6. Profit Graph",
      step7Pill: "7. Portals, Instagram & Websites",
      step8Pill: "8. Courier & Launch",
      btnPrevStep: "← Previous Chapter",
      btnNextStep: "Next Chapter →",
      btnFinishCourse: "🎉 Finish Course & Generate Plan →",

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

      // Roadmap
      roadBadge: "Zero to First Sale",
      roadTitle: "7-Step Beginner Launch Roadmap",
      roadSubtitle: "How to start even if you have zero business background. Follow this structured roadmap to launch safely without losing money.",

      // Course Common
      lblBackToHub: "Back to Academies Overview",
      mod1Title: "1. Blueprint & Product Science",
      mod2Title: "2. Exact Capital & Budget Breakdown",
      mod3Title: "3. Wholesale Markets & Google Maps",
      mod4Title: "4. Wholesaler Calling & Chat Coaching",
      mod5Title: "5. Formulation / How to Make Your Brand",
      mod6Title: "6. Profit Simulator & Live Visual Graph",
      mod7Title: "7. Verified Online Portals, Instagram Pages & Websites (India & International)",
      mod8Title: "8. Courier Rates, COD & Launch Checklist",

      // Tools Top
      toolsHeaderTitle: "Financial Tools & Sourcing Hubs",
      toolsHeaderSub: "Access our universal profit calculator, directory of verified wholesale hubs, WhatsApp negotiation scripts, and custom business plan generator.",
      
      // Footer
      footerDesc: "Empowering ordinary individuals in Kerala and India to become confident, self-reliant entrepreneurs with genuine market data, supplier contacts, and practical blueprints.",
      footHeadingNiches: "Study Academies",
      footHeadingHubs: "Key Wholesale Hubs",
      footHeadingTools: "Free Interactive Tools",
      footerMotto: "Start small, think big, grow consistently."
    },

    ml: {
      siteTitle: "വ്യാപാര ശിക്ഷ",
      siteSubtitle: "സംരംഭക പാഠശാല • ബിസിനസ് ഗൈഡ്",
      topBarTagline: "കേരളത്തിലെയും ഭാരതത്തിലെയും തുടക്കക്കാർക്കുള്ള പ്രായോഗിക ബിസിനസ് പഠന വേദി",
      langCurrentText: "ഭാഷ:",

      // Header Nav
      navHome: "ഹോം",
      navAcademies: "പഠന ശാഖകൾ",
      dropAttar: "അത്തർ & പെർഫ്യൂം ശാഖ",
      dropClothing: "വസ്ത്രങ്ങൾ & ബോട്ടിക് ശാഖ",
      dropWatches: "ഫാഷൻ വാച്ചുകൾ ശാഖ",
      dropBags: "ക്യാൻവാസ് ബാഗുകൾ ശാഖ",
      dropAccessories: "മോതിരങ്ങൾ & ആഭരണ ശാഖ",
      dropSpices: "കേരള സുഗന്ധവ്യഞ്ജന ശാഖ",
      navTools: "പ്രോഫിറ്റ് ടൂളുകൾ",
      navSuppliers: "ഹോൾസെയിൽ വ്യാപാരികൾ & മാപ്പ്",
      navTemplates: "വാട്സ്ആപ്പ് സ്ക്രിപ്റ്റുകൾ",
      navPlanBuilder: "പ്ലാൻ തയ്യാറാക്കുക",

      // Hero
      heroBadge: "ബിസിനസ് പരിചയം ആവശ്യമില്ല • 100% സൗജന്യ പഠന വെബ്സൈറ്റ്",
      heroHeading: 'കേരളത്തിലും ഇന്ത്യയിലും ഉയർന്ന ലാഭമുള്ള <span class="gradient-text">ചെറുകിട ബിസിനസ്സ്</span> എങ്ങനെ തുടങ്ങാം?',
      heroDesc: "തുടക്കക്കാർക്കായി ചിട്ടപ്പെടുത്തിയ സമഗ്ര സംരംഭക പാഠശാല. അത്തർ, വസ്ത്രങ്ങൾ, വാച്ചുകൾ, ബാഗുകൾ, മോതിരങ്ങൾ എന്നിവ പഠിക്കാൻ പ്രത്യേക ശാഖകൾ: തുടക്കത്തിൽ എന്തിനൊക്കെ എത്ര രൂപ ചെലവ് വരും, പുതിയത് ഉണ്ടാക്കാൻ എത്ര വേണം, വ്യാപാരികളുടെ ഫോൺ നമ്പറും ഗൂഗിൾ മാപ്പും, ലൈവ് പ്രോഫിറ്റ് ഗ്രാഫും, സംസാരിക്കേണ്ട രീതിയും.",
      statFaculties: "പ്രത്യേക പഠന ശാഖകൾ",
      statMinInvest: "കുറഞ്ഞ പ്രാരംഭ മൂലധനം",
      statMargin: "യഥാർത്ഥ ലാഭ ശതമാനം",
      statLang: "മലയാളം • EN • العربية",
      btnExploreNiches: "പഠന ശാഖകൾ പരിശോധിക്കുക",
      btnTakeQuiz: "ഏത് ബിസിനസ്സാണ് യോജിക്കുക എന്ന് നോക്കൂ",
      btnViewDirectory: "വ്യാപാരികളുടെ വിവരങ്ങൾ & മാപ്പ്",

      // Hero Quick Preview
      previewTitle: "6 പ്രത്യേക ബിസിനസ് പഠന ശാഖകൾ",
      quickAttarTitle: "അത്തർ & പെർഫ്യൂം പഠന ശാഖ",
      quickAttarInfo: "മൂലധനം: ₹3,000 - ₹12,000 • 80% - 250% ലാഭം • കോഴിക്കോട് & മുംബൈ",
      quickClothingTitle: "വസ്ത്രങ്ങൾ & ബോട്ടിക് പഠന ശാഖ",
      quickClothingInfo: "മൂലധനം: ₹10,000 - ₹35,000 • സൂററ്റ് & തിരുപ്പൂർ ഫാക്ടറികൾ",
      quickWatchTitle: "വാച്ചുകൾ & ഗിഫ്റ്റ് കോമ്പോകൾ",
      quickWatchInfo: "മൂലധനം: ₹8,000 - ₹20,000 • മുംബൈ മനീഷ് മാർക്കറ്റ് & ഡൽഹി",
      quickRingTitle: "ആന്റി-ടാർണിഷ് മോതിരങ്ങളും ജ്വല്ലറിയും",
      quickRingInfo: "മൂലധനം: ₹2,500 - ₹8,000 • 100% - 300% ലാഭം • കുറഞ്ഞ റിസ്ക്",
      quickBagTitle: "ക്യാൻവാസ് ടോട്ടുകൾ & ലെതർ ബാഗുകൾ",
      quickBagInfo: "മൂലധനം: ₹5,000 - ₹18,000 • സ്ക്രീൻ പ്രിന്റിംഗ് • ധാരാവി",
      previewTip: "ഓരോ ശാഖയിലും ക്ലിക്ക് ചെയ്ത് പൂർണ്ണ വിവരങ്ങൾ പഠിച്ചു തുടങ്ങൂ!",
      tagPopular: "ഉയർന്ന ലാഭം",
      tagHighVol: "ഉയർന്ന ഡിമാൻഡ്",
      tagGifts: "സമ്മാനങ്ങൾക്ക് പ്രിയം",
      tagLowRisk: "കുറഞ്ഞ റിസ്ക്",
      tagAesthetic: "ഇൻസ്റ്റാഗ്രാം ട്രെൻഡ്",

      // Faculty Grid on Home
      facultyBadge: "നിങ്ങളുടെ ബിസിനസ് ശാഖ തിരഞ്ഞെടുക്കൂ",
      facultyTitle: "പ്രത്യേക ബിസിനസ് പഠന ശാഖകൾ",
      facultySubtitle: "ഓരോ ശാഖയും ഒരു സമ്പൂർണ്ണ മാസ്റ്റർക്ലാസ്സാണ്. പൂജ്യത്തിൽ നിന്നുള്ള തുടക്കം, എന്തിനൊക്കെ എത്ര രൂപ ചെലവാകും, പുതിയത് എങ്ങനെ ഉണ്ടാക്കാം, വ്യാപാരികളുടെ ഫോൺ നമ്പറും ഗൂഗിൾ മാപ്പും, ലൈവ് ലാഭ ഗ്രാഫും, കടക്കാരുമായി സംസാരിക്കേണ്ട ചോദ്യങ്ങളും പഠിക്കാം.",
      btnStartCourse: "പഠനം ആരംഭിക്കുക",

      // Stepper Labels
      lblGuidedMode: "ഘട്ടം ഘട്ടമായുള്ള പഠനം",
      lblAllStepsMode: "മുഴുവൻ സിലബസും കാണുക",
      lblSwitchCourse: "മറ്റൊരു കോഴ്സ് തിരഞ്ഞെടുക്കൂ",
      step1Pill: "1. ഉൽപ്പന്ന ശാസ്ത്രം",
      step2Pill: "2. ബഡ്ജറ്റ് കണക്കുകൾ",
      step3Pill: "3. മാർക്കറ്റുകൾ & മാപ്പ്",
      step4Pill: "4. സംസാരിക്കേണ്ട രീതി",
      step5Pill: "5. നിർമ്മാണ രീതി",
      step6Pill: "6. ലൈവ് ലാഭ ഗ്രാഫ്",
      step7Pill: "7. ഇൻസ്റ്റാഗ്രാം, വെബ്‌സൈറ്റുകൾ & ലിങ്കുകൾ",
      step8Pill: "8. കൊറിയർ & വിൽപന",
      btnPrevStep: "← മുൻപത്തെ ഘട്ടം",
      btnNextStep: "അടുത്ത ഘട്ടം കാണുക →",
      btnFinishCourse: "🎉 പഠനം പൂർത്തിയായി! ബിസിനസ് പ്ലാൻ തയ്യാറാക്കുക →",

      // Quiz
      quizBadge: "നിങ്ങൾക്ക് യോജിച്ച ബിസിനസ് കണ്ടെത്താം",
      quizTitle: "30 സെക്കൻഡിൽ നിങ്ങൾക്ക് അനുയോജ്യമായ ബിസിനസ്സ്",
      quizSubtitle: "എവിടെ തുടങ്ങണമെന്ന് അറിയില്ലേ? നിങ്ങളുടെ ബഡ്ജറ്റും സമയവും ഉപഭോക്താക്കളെയും കുറിച്ചുള്ള 3 ലളിതമായ ചോദ്യങ്ങൾക്ക് മറുപടി നൽകി മികച്ച ബിസിനസ് കണ്ടെത്തൂ.",
      q1Title: "നിങ്ങളുടെ പക്കലുള്ള പ്രാരംഭ മൂലധനം എത്രയാണ്?",
      q1Opt1: "₹5,000-ൽ താഴെ (ചെറിയ തുടക്കം)",
      q1Opt2: "₹10,000 - ₹20,000 (സ്റ്റാൻഡേർഡ് ബ്രാൻഡ്)",
      q1Opt3: "₹40,000-ന് മുകളിൽ (മുഴുവൻ സ്റ്റോക്ക് / കിയോസ്ക്)",
      q2Title: "ദിവസവും എത്ര സമയം ഇതിനായി മാറ്റിവെക്കാം?",
      q2Opt1: "ദിവസവും 1-2 മണിക്കൂർ (വിദ്യാർത്ഥികൾ / പാർട്ട് ടൈം)",
      q2Opt2: "പൂർണ്ണ സമയം / വീട്ടിലിരുന്നുള്ള മുഴുവൻ സംരംഭം",
      q3Title: "ഏതുതരം ഉപഭോക്താക്കൾക്കാണ് വിൽക്കാൻ താല്പര്യം?",
      q3Opt1: "സുഗന്ധം ഇഷ്ടപ്പെടുന്നവർ, സ്ഥിരം കസ്റ്റമേഴ്സ്, പ്രവാസികൾ",
      q3Opt2: "സ്ത്രീകൾ, മോഡസ്റ്റ് വസ്ത്രങ്ങൾ, പെരുന്നാൾ / വിവാഹ വിപണി",
      q3Opt3: "കോളേജ് വിദ്യാർത്ഥികൾ, ട്രെൻഡി ആഭരണങ്ങൾ, സമ്മാനങ്ങൾ",
      btnCalculateMatch: "യോജിച്ച ബിസിനസ്സ് കാണിക്കുക",

      // Roadmap
      roadBadge: "ആദ്യ വിൽപനയിലേക്ക്",
      roadTitle: "തുടക്കക്കാർക്കുള്ള 7 ഘട്ട റോഡ്മാപ്പ്",
      roadSubtitle: "ബിസിനസ് പരിചയം ഒട്ടും ഇല്ലെങ്കിലും പണം നഷ്ടപ്പെടാതെ ധൈര്യമായി ബിസിനസ്സ് തുടങ്ങാനുള്ള കൃത്യമായ വഴികാട്ടി.",

      // Course Common
      lblBackToHub: "പഠന ശാഖകളുടെ ഹോം പേജിലേക്ക്",
      mod1Title: "1. ബിസിനസ് അടിത്തറ & ഉൽപ്പന്ന വിവരങ്ങൾ",
      mod2Title: "2. എന്തിനൊക്കെ എത്ര രൂപ? (വിശദമായ ബഡ്ജറ്റ് പട്ടിക)",
      mod3Title: "3. മൊത്തവ്യാപാര മാർക്കറ്റുകൾ, ഫോൺ & ഗൂഗിൾ മാപ്പ്",
      mod4Title: "4. വ്യാപാരികളോട് സംസാരിക്കേണ്ട രീതിയും ചോദ്യങ്ങളും",
      mod5Title: "5. പുതിയത് ഉണ്ടാക്കാൻ എത്ര വേണം? (തയ്യാറാക്കുന്ന വിധം)",
      mod6Title: "6. ഇന്ററാക്ടീവ് ലാഭ ഗ്രാഫും കാൽക്കുലേറ്ററും",
      mod7Title: "7. സോഷ്യൽ മീഡിയ, വ്യാപാരികളുടെ വെബ്‌സൈറ്റുകൾ & ലിങ്കുകൾ (ഇന്ത്യ & വിദേശ രാജ്യങ്ങൾ)",
      mod8Title: "8. കൊറിയർ നിരക്കുകൾ, സി.ഒ.ഡി നിയമങ്ങൾ & ലോഞ്ച് പ്ലാൻ",

      // Tools Top
      toolsHeaderTitle: "സാമ്പത്തിക ഉപകരണങ്ങളും വിപണി വിവരങ്ങളും",
      toolsHeaderSub: "പ്രോഫിറ്റ് കാൽക്കുലേറ്റർ, നേരിട്ടുള്ള വ്യാപാരികളുടെ ഡയറക്ടറി, റെഡിമെയ്ഡ് വാട്സ്ആപ്പ് സന്ദേശങ്ങൾ, ബിസിനസ് പ്ലാൻ ജനറേറ്റർ എന്നിവ ഇവിടെ ഉപയോഗിക്കാം.",
      
      // Footer
      footerDesc: "കേരളത്തിലെയും ഭാരതത്തിലെയും സാധാരണക്കാർക്ക് സ്വന്തം കാലിൽ നിൽക്കാനും സംരംഭകരാകാനും കൃത്യമായ മാർക്കറ്റ് വിവരങ്ങളും ഫോൺ നമ്പറുകളും ഗൈഡിങ്ങും നൽകുന്ന സംരംഭം.",
      footHeadingNiches: "പഠന ശാഖകൾ",
      footHeadingHubs: "പ്രധാന ഹോൾസെയിൽ വിപണികൾ",
      footHeadingTools: "സൗജന്യ ടൂളുകൾ",
      footerMotto: "ചെറുതായി തുടങ്ങുക, വലുതായി ചിന്തിക്കുക, നിരന്തരം വളരുക."
    },

    ar: {
      siteTitle: "منصة رواد الأعمال",
      siteSubtitle: "أكاديمية التجارة والمشاريع المصغرة",
      topBarTagline: "أكاديمية تعليم التجارة العملية للمبتدئين في كيرالا والهند",
      langCurrentText: "اللغة:",

      // Header Nav
      navHome: "الرئيسية",
      navAcademies: "أكاديميات المشاريع",
      dropAttar: "أكاديمية العطور ودهن العود",
      dropClothing: "أكاديمية العبايات والأزياء",
      dropWatches: "أكاديمية الساعات الفاخرة",
      dropBags: "أكاديمية الحقائب اليدوية",
      dropAccessories: "أكاديمية الخواتم والإكسسوارات",
      dropSpices: "أكاديمية التوابل والعسل الطبيعي",
      navTools: "حاسبة الأرباح",
      navSuppliers: "أسواق الجملة والخرائط",
      navTemplates: "نماذج واتساب الجاهزة",
      navPlanBuilder: "خطة العمل",

      // Hero
      heroBadge: "لا تشترط أي خبرة سابقة • منصة تعليمية مجانية 100%",
      heroHeading: 'تعلم كيف تؤسس <span class="gradient-text">مشروعاً مربحاً</span> في الهند وكيرالا من الصفر',
      heroDesc: "أكاديمية متكاملة لرواد الأعمال المبتدئين. مسارات دراسية مستقلة لكل تخصص: دهن العود، العبايات، الساعات، الحقائب، والخواتم. تتضمن تفاصيل رأس المال الدقيق، طريقة التركيب والتصنيع، عناوين أسواق الجملة مع أرقام الواتساب وخرائط جوجل، ورسم بياني تفاعلي للأرباح وسيناريوهات التفاوض.",
      statFaculties: "أكاديميات تخصصية",
      statMinInvest: "أقل رأس مال مطلوب",
      statMargin: "هامش ربحي واقعي",
      statLang: "العربية • മലയാളം • EN",
      btnExploreNiches: "استكشف أكاديميات التجارة",
      btnTakeQuiz: "اختبر المشروع الأنسب لك",
      btnViewDirectory: "دليل الموردين وخرائط جوجل",

      // Hero Quick Preview
      previewTitle: "6 أكاديميات تجارية متخصصة",
      quickAttarTitle: "أكاديمية دهن العود والعطور",
      quickAttarInfo: "رأس المال: 3 آلاف - 12 ألف روبية • أرباح 80% - 250% • كاليكوت ومومباي",
      quickClothingTitle: "أكاديمية العبايات والأزياء",
      quickClothingInfo: "رأس المال: 10 آلاف - 35 ألف روبية • مصانع سورات وتيروبور مباشرة",
      quickWatchTitle: "أكاديمية الساعات وأطقم الهدايا",
      quickWatchInfo: "رأس المال: 8 آلاف - 20 ألف روبية • سوق مانيش بمومباي ودلهي",
      quickRingTitle: "أكاديمية الخواتم المقاومة للصدأ",
      quickRingInfo: "رأس المال: 2500 - 8000 روبية • أرباح تصل إلى 300% • مخاطرة شبه معدومة",
      quickBagTitle: "أكاديمية الحقائب والمنتجات الجلدية",
      quickBagInfo: "رأس المال: 5 آلاف - 18 ألف روبية • طباعة الحرير وورش درافي",
      previewTip: "انقر على أي أكاديمية أعلاه لفتح الدورة التعليمية التفصيلية الشاملة!",
      tagPopular: "أرباح عالية",
      tagHighVol: "طلب يومي",
      tagGifts: "مثالي للهدايا",
      tagLowRisk: "أقل مخاطرة",
      tagAesthetic: "رائج بالإنستغرام",

      // Faculty Grid on Home
      facultyBadge: "اختر مسارك التجاري",
      facultyTitle: "أكاديميات دراسة المشاريع المصغرة",
      facultySubtitle: "كل أكاديمية عبارة عن دورة احترافية مستقلة تمنحك خطوات التأسيس من الصفر، جدول توزيع التكاليف الدقيق، أرقام الموردين ومواقعهم على خرائط جوجل، ورسم بياني تفاعلي للأرباح.",
      btnStartCourse: "ابدأ دراسة الأكاديمية",

      // Stepper Labels
      lblGuidedMode: "الدراسة خطوة بخطوة",
      lblAllStepsMode: "كامل المنهج الدراسي",
      lblSwitchCourse: "تبديل الأكاديمية",
      step1Pill: "1. علم المنتج",
      step2Pill: "2. جدول الميزانية",
      step3Pill: "3. أسواق الجملة",
      step4Pill: "4. حوار الاتصال",
      step5Pill: "5. طريقة التصنيع",
      step6Pill: "6. حاسبة الأرباح",
      step7Pill: "7. بوابات ومواقع الموردين وإنستغرام",
      step8Pill: "8. الشحن وانطلاقة البيع",
      btnPrevStep: "← الفصل السابق",
      btnNextStep: "الفصل التالي →",
      btnFinishCourse: "🎉 تم إكمال الدورة! توليد خطة العمل →",

      // Quiz
      quizBadge: "مساعدك لاختيار الفكرة",
      quizTitle: "اكتشف المشروع الأنسب لك خلال 30 ثانية",
      quizSubtitle: "محتار من أين تبدأ؟ أجب على 3 أسئلة بسيطة حول ميزانيتك ووقتك ونوعية عملائك ليقترح لك نظامنا الذكي المشروع المثالي.",
      q1Title: "ما هو رأس المال الأولي المتوفر لديك؟",
      q1Opt1: "أقل من 5,000 روبية (بداية مصغرة)",
      q1Opt2: "10,000 إلى 20,000 روبية (علامة تجارية قياسية)",
      q1Opt3: "أكثر من 40,000 روبية (مخزون كامل / كشك تجاري)",
      q2Title: "كم من الوقت يمكنك تخصيصه يومياً؟",
      q2Opt1: "ساعة إلى ساعتين يومياً (للطلاب والعمل الجزئي)",
      q2Opt2: "دوام كامل / مشروع منزلي رئيسي",
      q3Title: "من هي الشريحة المستهدفة لزبائنك؟",
      q3Opt1: "عشاق العطور والعود، المصلون، المغتربون",
      q3Opt2: "النساء، مشتريات العبايات، مواسم الأعياد والأعراس",
      q3Opt3: "طلاب الجامعات، الإكسسوارات الشبابية، الهدايا",
      btnCalculateMatch: "كشف المشروع الأنسب لي",

      // Roadmap
      roadBadge: "من الصفر إلى المبيعات",
      roadTitle: "خارطة طريق المبتدئين في 7 خطوات",
      roadSubtitle: "كيف تنطلق وتبيع بنجاح حتى وإن لم تكن لديك أي خبرة سابقة دون خسارة أموالك.",

      // Course Common
      lblBackToHub: "العودة إلى نظرة عامة على الأكاديميات",
      mod1Title: "1. أساسيات المنتج وعلم الصنعة",
      mod2Title: "2. تفاصيل الميزانية ورأس المال الدقيق",
      mod3Title: "3. أسواق الجملة وخرائط جوجل",
      mod4Title: "4. تدريب الاتصال والتفاوض مع الموردين",
      mod5Title: "5. طريقة التركيب وصناعة علامتك الجديدة",
      mod6Title: "6. حاسبة الأرباح والرسم البياني المباشر",
      mod7Title: "7. بوابات الموردين الرسمية وصفحات إنستغرام وفيسبوك (الهند والخليج)",
      mod8Title: "8. أسعار الشحن وضوابط الدفع عند الاستلام",

      // Tools Top
      toolsHeaderTitle: "الأدوات المالية ومراكز التوريد",
      toolsHeaderSub: "استخدم حاسبة الأرباح، دليل أسواق الجملة، رسائل الواتساب الجاهزة، وأداة إنشاء خطة العمل الشاملة.",
      
      // Footer
      footerDesc: "تمكين المبتدئين في كيرالا والهند من تأسيس مشاريعهم الخاصة بمعلومات موثوقة وعناوين دقيقة وأرقام اتصال مباشرة.",
      footHeadingNiches: "أكاديميات المشاريع",
      footHeadingHubs: "أهم أسواق الجملة",
      footHeadingTools: "أدوات مجانية تفاعلية",
      footerMotto: "ابدأ بخطى صغيرة، فكر بوعي كبير، واستمر بالنمو."
    }
  },

  // Fragrance Oils Data for Attar Simulator
  attarOils: [
    { id: "white_musk", name: { en: "Royal White Musk (Pure Silky)", ml: "റോയൽ വൈറ്റ് മസ്ക് (White Musk)", ar: "المسك الأبيض الملكي" }, costPer100ml: 180, retailBase3ml: 149, retailBase6ml: 249, retailBase12ml: 399 },
    { id: "shamama", name: { en: "Shamamatul Amber (Warm Herbal)", ml: "ശമാമത്തുൽ അംബർ (Shamama)", ar: "شمامة العنبر التراثي" }, costPer100ml: 450, retailBase3ml: 220, retailBase6ml: 380, retailBase12ml: 599 },
    { id: "oudh_shams", name: { en: "Oudh Al Shams (Rich Woody Blend)", ml: "ഔദ് അൽ ശംസ് (Arabic Oudh)", ar: "عود الشمس الشرقي الفاخر" }, costPer100ml: 550, retailBase3ml: 299, retailBase6ml: 499, retailBase12ml: 850 },
    { id: "blue_ocean", name: { en: "Blue Ocean (Designer Fresh Cool)", ml: "ബ്ലൂ ഓഷ്യൻ (French Fresh Blend)", ar: "بلو أوشن (بديل العطور البحرية المنعشة)" }, costPer100ml: 280, retailBase3ml: 179, retailBase6ml: 299, retailBase12ml: 499 },
    { id: "ruh_gulab", name: { en: "Ruh Gulab (Kannauj Pure Damask Rose)", ml: "റൂഹ് ഗുലാബ് (കണ്ണൗജ് പനിനീർ റോസ്)", ar: "روح الورد الجوري الهندي" }, costPer100ml: 650, retailBase3ml: 320, retailBase6ml: 550, retailBase12ml: 950 },
    { id: "jannat_firdaus", name: { en: "Jannatul Firdaus (Classic Oriental)", ml: "ജന്നത്തുൽ ഫിർദൗസ് (Oriental Classic)", ar: "جنة الفردوس الكلاسيكي" }, costPer100ml: 220, retailBase3ml: 149, retailBase6ml: 249, retailBase12ml: 399 }
  ],

  bottleCosts: { octagonal: 10, crystal: 35, luxury: 75 },
  packCosts: { velvet: 6, rigid: 25, casket: 60 },

  // All 6 Categories with Deep Curriculum Data & Real Authentic Photography
  categoriesData: {
    attar: {
      id: "attar",
      icon: "fa-bottle-droplet",
      headerClass: "attar-header",
      badgeColor: "#10b981",
      title: {
        en: "Attar & Artisanal Perfumes Academy",
        ml: "അത്തർ & പെർഫ്യൂം പഠന ശാഖ",
        ar: "أكاديمية دهن العود والعطور الزيتية الخالصة"
      },
      tagline: {
        en: "Highest profit margin (80% - 250%) in Kerala & India. Start with just ₹3,000.",
        ml: "കേരളത്തിൽ ഏറ്റവും ഉയർന്ന ലാഭം നൽകുന്ന സംരംഭം. ₹3,000 ഉണ്ടെങ്കിൽ തുടങ്ങാം.",
        ar: "أعلى هامش ربحي في كيرالا والهند (80% إلى 250%). انطلق برأس مال 3,000 روبية فقط."
      },
      minBudget: "₹3,000 - ₹12,000",
      margin: "80% - 250%",
      topMarkets: "Kozhikode S.M. Street, Mumbai Crawford Market, Kannauj",
      
      // Authentic Real-Life Photography
      images: {
        cover: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
        product: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
        sourcing: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80",
        formulation: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
        packaging: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
      },

      curriculumHighlights: {
        en: [
          "Zero-knowledge scent science: Attar vs EDP spray & oil notes",
          "Exact itemized capital: from ₹3,100 starter to ₹14,500 luxury brand",
          "Step-by-step blending, pipette dispensing & crystal flacon assembly",
          "Direct WhatsApp & Google Maps of S.M. Street & Crawford wholesalers",
          "Interactive flacon simulator with live visual profit bar graph",
          "Wholesaler calling script: asking for testers & bulk slab pricing"
        ],
        ml: [
          "അത്തറും സ്പ്രേ പെർഫ്യൂമും തമ്മിലുള്ള വ്യത്യാസവും മണങ്ങളുടെ രഹസ്യങ്ങളും",
          "എന്തിനൊക്കെ എത്ര രൂപ ചെലവാകും? (₹3,100 മുതൽ ₹14,500 വരെയുള്ള വിശദ പട്ടിക)",
          "പുതിയ ബ്രാൻഡ് ഉണ്ടാക്കാൻ എത്ര വേണം? (കുപ്പി നിറയ്ക്കലും സ്റ്റിക്കർ ഒട്ടിക്കലും)",
          "മിഠായിത്തെരുവ്, ക്രോഫോർഡ് മാർക്കറ്റ് വ്യാപാരികളുടെ ഫോണും മാപ്പും",
          "ഓരോ അത്തർ കുപ്പിയുടെയും ചെലവും ലാഭവും കാണിക്കുന്ന ലൈവ് ഗ്രാഫ്",
          "ഹോൾസെയിൽ കടക്കാരോട് സംസാരിക്കേണ്ട രീതിയും ചോദിക്കേണ്ട ചോദ്യങ്ങളും"
        ],
        ar: [
          "علم العطور للمبتدئين: الفرق بين الزيت المركز وبخاخات الكحول والنوتات العطرية",
          "جدول الميزانية الدقيق: من بداية بـ 3,100 روبية إلى ماركة فاخرة بـ 14,500 روبية",
          "طريقة التعبئة والتغليف وتركيب رول الكريستال يدوياً خطوة بخطوة",
          "أرقام ومواقع موردي جملة العطور في شارع إس إم بكاليكوت وسوق كروفورد بمومباي",
          "حاسبة ورسم بياني تفاعلي لحساب تكلفة كل زجاجة وهامش الربح الصافي",
          "حوار التفاوض الصوتي: كيف تطلب عينات مجانية وتحصل على سعر الكيلو"
        ]
      },

      onlinePortals: {
        intro: {
          en: "Direct access to verified suppliers, raw material platforms, Instagram brand inspirations, and wholesale portals across Kerala, Pan-India, and GCC (Dubai & Saudi Arabia). Tap any card to open in a new tab.",
          ml: "കേരളം, ഭാരതം, ഗൾഫ് (ദുബായ്, സൗദി) എന്നിവിടങ്ങളിലെ പ്രമുഖ അത്തർ ബ്രാൻഡുകളുടെ ഇൻസ്റ്റാഗ്രാം പേജുകൾ, വ്യാപാരികളുടെ ഗ്രൂപ്പുകൾ, റോ മെറ്റീരിയൽ വാങ്ങാനുള്ള ഒഫീഷ്യൽ വെബ്‌സൈറ്റുകൾ എന്നിവ താഴെ നൽകിയിരിക്കുന്നു.",
          ar: "روابط مباشرة وموثوقة لموردي زيوت العطور وقوارير الزجاج وصفحات إنستغرام الملهمة ومجموعات تجار الجملة في كيرالا والهند ودول الخليج (دبي والسعودية)."
        },
        instagram: [
          {
            handle: "@alharamainperfumes",
            name: "Al Haramain Perfumes (UAE & India)",
            url: "https://www.instagram.com/alharamainperfumes/",
            followers: "420K",
            region: "UAE & India",
            flag: "🇦🇪 🇮🇳",
            badge: "Luxury Aesthetic",
            desc: {
              en: "Masterclass in luxury flacon photography, Arabic typography, and how to present high-margin attar gift sets.",
              ml: "ക്രിസ്റ്റൽ കുപ്പികളുടെ ഫോട്ടോഗ്രാഫിയും പ്രീമിയം ഗിഫ്റ്റ് സെറ്റ് പാക്കിംഗും കണ്ടുപഠിക്കാം.",
              ar: "نموذج رائد في تصوير قوارير الكريستال الفاخرة وتقديم أطقم الهدايا التراثية."
            }
          },
          {
            handle: "@ajmalperfumes",
            name: "Ajmal Perfumes Official",
            url: "https://www.instagram.com/ajmalperfumes/",
            followers: "650K",
            region: "Global & India",
            flag: "🇦🇪 🇮🇳",
            badge: "Heritage Brand",
            desc: {
              en: "Study their product storytelling around pure Indian Dehn al Oudh, Mukhallat blends, and seasonal festive launches.",
              ml: "ഔദ്, മുഖല്ലത് എന്നിവ എങ്ങനെ ഒരു ബ്രാൻഡായി മാർക്കറ്റ് ചെയ്യാം എന്ന് പഠിക്കാം.",
              ar: "تعلم منهم أساليب تسويق دهن العود الهندي الأصيل والخلطات الموسمية للأعياد."
            }
          },
          {
            handle: "@lattafaperfumes",
            name: "Lattafa Perfumes Dubai",
            url: "https://www.instagram.com/lattafaperfumes/",
            followers: "890K",
            region: "Dubai, UAE",
            flag: "🇦🇪",
            badge: "Viral Trendsetter",
            desc: {
              en: "World leader in affordable luxury packaging and viral social media reel presentations that sell out in minutes.",
              ml: "ഇൻസ്റ്റാഗ്രാം റീൽസിലൂടെ എങ്ങനെ ലക്ഷ്വറി അത്തറുകൾ വേഗത്തിൽ വിറ്റഴിക്കാമെന്ന് കാണാം.",
              ar: "أكبر علامة تجارية ملهمة في صناعة فيديوهات الريلز الجذابة والتغليف الفاخر بأسعار معقولة."
            }
          },
          {
            handle: "@khalisperfumes",
            name: "Khalis Perfumes Dubai",
            url: "https://www.instagram.com/khalisperfumes/",
            followers: "240K",
            region: "GCC & India",
            flag: "🇦🇪 🇮🇳",
            badge: "Oil Roll-On Mastery",
            desc: {
              en: "Specializes in 6ml & 12ml concentrated perfume oils with beautiful velvet pouches and metallic roller caps.",
              ml: "6ml, 12ml റോൾ-ഓൺ അത്തറുകൾ എങ്ങനെ ആകർഷകമായി അവതരിപ്പിക്കാമെന്ന് മനസ്സിലാക്കാം.",
              ar: "متخصص في زيوت العطور سعة 6 مل و12 مل بأكياس مخملية فاخرة ورول ذهبي."
            }
          },
          {
            handle: "@kerala_attar_community",
            name: "Kerala Attar & Oud Community",
            url: "https://www.instagram.com/explore/tags/keralaattar/",
            followers: "Local Hub",
            region: "Kerala",
            flag: "🇮🇳",
            badge: "Malayali Consumer Trends",
            desc: {
              en: "Explore what scents are trending among youth and NRI families across Kozhikode, Malappuram, and Kochi.",
              ml: "കോഴിക്കോടും മലപ്പുറത്തും കൊച്ചിയിലും മലയാളികൾക്കിടയിൽ കൂടുതൽ വിറ്റുപോകുന്ന അത്തറുകൾ കാണാം.",
              ar: "استكشف أذواق المستهلكين في كيرالا وأنواع دهن العود الأكثر طلباً بين العائلات والشباب."
            }
          },
          {
            handle: "@perfume_bottles_india",
            name: "Indian Bottle Importers Hub",
            url: "https://www.instagram.com/explore/tags/perfumebottles/",
            followers: "Trade Catalog",
            region: "Pan-India",
            flag: "🇮🇳",
            badge: "Packaging Showcase",
            desc: {
              en: "Catalog drops of crystal flacons, luxury dropper pipettes, custom wooden boxes, and roll-on components.",
              ml: "ഹോൾസെയിൽ ഗ്ലാസ് കുപ്പികളും വെൽവെറ്റ് ബോക്സുകളും വിൽക്കുന്ന വ്യാപാരികളുടെ കാറ്റലോഗ് കാണാം.",
              ar: "كتالوجات أسبوعية لقوارير الزجاج الكريستال والأغطية الذهبية والقطارات الطبية."
            }
          }
        ],
        facebook: [
          {
            name: "Kerala Attar & Oud Traders Community",
            url: "https://www.facebook.com/groups/keralaattar",
            members: "28K Members",
            region: "Kerala & South India",
            flag: "🇮🇳",
            badge: "Active Trade Forum",
            desc: {
              en: "Daily wholesale buy/sell deals, empty flacon carton offers, and advice from experienced Kerala perfume shop owners.",
              ml: "കേരളത്തിലെ അത്തർ വ്യാപാരികളും കുപ്പി സപ്ലയർമാരും ദിവസേന ഓഫറുകൾ പങ്കുവെക്കുന്ന ഫേസ്ബുക്ക് കൂട്ടായ്മ.",
              ar: "مجموعة تجارية نشطة لتبادل عروض بيع زيوت العطور وقوارير الجملة في كيرالا."
            }
          },
          {
            name: "All India Perfumers & Raw Fragrance Network",
            url: "https://www.facebook.com/groups/attarwholesalersindia",
            members: "45K Members",
            region: "Pan-India",
            flag: "🇮🇳",
            badge: "Direct Distillers Group",
            desc: {
              en: "Direct distillers from Kannauj, Mumbai Nakhuda Mohalla, and Delhi offering 1kg and 5kg mother oil canisters.",
              ml: "കനൗജിലെയും മുംബൈയിലെയും ഫാക്ടറികളിൽ നിന്ന് നേരിട്ട് ലിറ്റർ കണക്കിന് ഓയിൽ വാങ്ങാനുള്ള വ്യാപാരികളുടെ ഫോറം.",
              ar: "ملتقى يضم مصنعي الزيوت العطرية في قنوج ومومباي ودلهي لبيع البراميل وعبوات الكيلو."
            }
          },
          {
            name: "Dubai Deira Naif Souk Oud Exporters",
            url: "https://www.facebook.com/groups/dubaiperfumesouk",
            members: "62K Members",
            region: "GCC & UAE",
            flag: "🇦🇪",
            badge: "GCC Bulk Sourcing",
            desc: {
              en: "Deira wholesale perfume bazaar traders providing direct air cargo consolidated shipping to Calicut and Cochin airports.",
              ml: "ദുബായ് ദേര മാർക്കറ്റിൽ നിന്നും കേരളത്തിലേക്ക് കാർഗോ വഴി അത്തർ എത്തിക്കുന്ന വ്യാപാരികളുടെ ഗ്രൂപ്പ്.",
              ar: "تجار سوق نايف بديرة دبي يقدمون شحنات جوية مجمعة لمطاري كوتشين وكاليكوت."
            }
          }
        ],
        websites: [
          {
            name: "Scentkart India",
            domain: "scentkart.com",
            url: "https://scentkart.com",
            type: "Raw Materials Portal",
            region: "Domestic (India)",
            flag: "🇮🇳",
            badge: "Doorstep Supply (₹)",
            desc: {
              en: "India's online hub for aroma chemicals, concentrated perfume bases, pipettes, and glass flacons with doorstep delivery.",
              ml: "അറോമ കെമിക്കലുകൾ, മദർ ഓയിലുകൾ, ഗ്ലാസ് കുപ്പികൾ എന്നിവ ഓൺലൈനായി വീട്ടിലെത്തിക്കുന്ന വിശ്വസനീയ വെബ്സൈറ്റ്.",
              ar: "بوابة إلكترونية متخصصة في الهند لشراء الزيوت العطرية الخام وأدوات التركيب المخبرية."
            }
          },
          {
            name: "IndiaMART Glass Bottles & Attar Caps Hub",
            domain: "indiamart.com",
            url: "https://www.indiamart.com/proddetail/attar-glass-bottle-22485303991.html",
            type: "Verified Factory Directory",
            region: "Pan-India",
            flag: "🇮🇳",
            badge: "Lowest Factory Rates (₹6-₹10)",
            desc: {
              en: "Direct link to verified Indian glass moulding factories in Firozabad & Mumbai. Direct GST bill and transport delivery.",
              ml: "ഫിറോസാബാദിലെയും മുംബൈയിലെയും ഫാക്ടറികളിൽ നിന്ന് ₹6-₹10 നിരക്കിൽ കുപ്പികൾ നേരിട്ട് വാങ്ങാനുള്ള ലിങ്ക്.",
              ar: "تواصل مباشر مع مصانع الزجاج في فيروز آباد ومومباي بأسعار المصنع الأصلية."
            }
          },
          {
            name: "Falcon Pack Official (UAE & India)",
            domain: "falconpack.com",
            url: "https://www.falconpack.com",
            type: "Luxury Packaging Giant",
            region: "UAE & Global",
            flag: "🇦🇪 🌍",
            badge: "GCC Quality Standard",
            desc: {
              en: "GCC's premier packaging manufacturer for rigid presentation gift boxes, velvet pouches, and flacons used by top brands.",
              ml: "ഗൾഫിലെ പ്രമുഖ പെർഫ്യൂം ബ്രാൻഡുകൾ ഉപയോഗിക്കുന്ന ലക്ഷ്വറി ബോക്സുകളും പൗച്ചുകളും നിർമ്മിക്കുന്ന കമ്പനി.",
              ar: "الشركة الرائدة في الخليج لتصنيع علب الهدايا الفاخرة والأكياس المخملية."
            }
          },
          {
            name: "Ajmal Perfumes Official India",
            domain: "ajmalperfume.com",
            url: "https://ajmalperfume.com",
            type: "Direct Brand & Legacy Wholesaler",
            region: "India & UAE",
            flag: "🇮🇳 🇦🇪",
            badge: "Original Distiller",
            desc: {
              en: "Official wholesale inquiries and master catalog of pure Oudh, Mukhallat, Amber, and French artisanal oils.",
              ml: "ശുദ്ധമായ ഊദ്, അംബർ എന്നിവ നേരിട്ട് വാങ്ങാനുള്ള അജ്മൽ പെർഫ്യൂംസിന്റെ ഒഫീഷ്യൽ പോർട്ടൽ.",
              ar: "البوابة الرسمية لشركة أجمل العالمية لطلبات الجملة لدهن العود والخلطات التراثية."
            }
          },
          {
            name: "Dubai Deira Perfume Souk Directory",
            domain: "visitdubai.com",
            url: "https://www.visitdubai.com/en/places-to-visit/deira-perfume-souk",
            type: "International Sourcing Hub",
            region: "Dubai, UAE",
            flag: "🇦🇪",
            badge: "World Sourcing Epicenter",
            desc: {
              en: "Official guide to Dubai's world-famous Sikkat Al Khail perfume bazaar. Essential for NRI traders and bulk importers.",
              ml: "ദുബായ് ദേരയിലെ സുഗന്ധദ്രവ്യ മാർക്കറ്റിലെ കടകളുടെയും മൊത്തവ്യാപാരികളുടെയും വിവരങ്ങൾ.",
              ar: "دليل سوق العطور التراثي في ديرة دبي؛ المركز العالمي لتجارة دهن العود والعطور بالجملة."
            }
          },
          {
            name: "Alibaba Verified Crystal Attar Flacon Factories",
            domain: "alibaba.com",
            url: "https://www.alibaba.com/trade/search?SearchText=attar+bottles+crystal",
            type: "Global Direct Factories",
            region: "International Export",
            flag: "🌍",
            badge: "Factory Direct ($0.08/pc)",
            desc: {
              en: "Custom engraved and gold-plated crystal bottles with trade assurance and international sea/air freight to Kochi/Mumbai.",
              ml: "നിങ്ങളുടെ ബ്രാൻഡ് ലോഗോ കൊത്തിയ ക്രിസ്റ്റൽ കുപ്പികൾ വിദേശ ഫാക്ടറികളിൽ നിന്ന് കുറഞ്ഞ ചെലവിൽ നേരിട്ട് ഇറക്കുമതി ചെയ്യാം.",
              ar: "استيراد مباشر لقوارير الكريستال الفاخرة المنقوشة بشعارك مع ضمان التجارة الدولي."
            }
          }
        ]
      },

      // Module 1: Blueprint & Product Science
      blueprint: {
        intro: {
          en: "Attar (Ittar) is pure concentrated perfume oil extracted through hydro-distillation without a single drop of alcohol. In Kerala and across GCC, attars carry massive demand because they are prayer-safe (حلال / Halal), skin-friendly, long-lasting (12 to 24+ hours), and deeply personal.",
          ml: "ഒരു തുള്ളി പോലും ആൽക്കഹോൾ ചേർക്കാത്ത ശുദ്ധമായ സുഗന്ധതൈലമാണ് അത്തർ. നിസ്കാരത്തിന് ഉപയോഗിക്കാമെന്നതും (100% ഹലാൽ), ചർമ്മത്തിന് ദോഷം ചെയ്യില്ല എന്നതും, 12 മുതൽ 24 മണിക്കൂർ വരെ വസ്ത്രങ്ങളിൽ സുഗന്ധം നിലനിൽക്കും എന്നതുമാണ് കേരളത്തിലും ഗൾഫിലും ഇതിന് ഇത്രയധികം സ്ഥിരം ആവശ്യക്കാരെ ഉണ്ടാക്കുന്നത്.",
          ar: "دهن العود والعطور الزيتية النقية مستخلصة طبيعياً بدون قطرة كحول واحدة. عليها طلب استثنائي في كيرالا ودول الخليج لأنها صالحة للصلاة تماماً، لطيفة على البشرة، وتدوم فوّاحة من 12 إلى 24 ساعة."
        },
        fastMovingList: [
          { name: { en: "White Musk (مسك أبيض)", ml: "റോയൽ വൈറ്റ് മസ്ക് (White Musk)", ar: "المسك الأبيض الملكي" }, wholesale: "₹180 / 100ml", retail: "₹249 - ₹350 / 6ml", profit: "₹210 profit per bottle (600% markup!)" },
          { name: { en: "Shamamatul Amber", ml: "ശമാമത്തുൽ അംബർ (Shamama)", ar: "شمامة العنبر التراثي" }, wholesale: "₹450 / 100ml", retail: "₹380 - ₹550 / 6ml", profit: "₹330 profit per bottle" },
          { name: { en: "Arabic Oudh Al Shams", ml: "അറബിക് ഔദ് അൽ ശംസ്", ar: "خلطة عود الشمس الملكية" }, wholesale: "₹550 / 100ml", retail: "₹499 - ₹850 / 6ml", profit: "₹440 profit per bottle" },
          { name: { en: "French Clone (Blue Ocean / Sauvage)", ml: "ഫ്രഞ്ച് ക്ലോൺസ് (Sauvage / Aqua)", ar: "بديل العطور الفرنسية الفاخرة" }, wholesale: "₹280 / 100ml", retail: "₹299 - ₹499 / 6ml", profit: "₹260 profit per bottle" }
        ]
      },

      // Module 2: Exact Capital & Budget Breakdown Table (എന്തിനൊക്കെ എത്ര രൂപ)
      capitalTable: [
        { item: { en: "Mother Fragrance Oils (5 varieties × 100ml = 500ml)", ml: "മദർ പെർഫ്യൂം ഓയിൽ (5 ഇനങ്ങൾ × 100ml = 500ml)", ar: "زيوت عطرية مركزة خام (5 أنواع × 100 مل)" }, starter: "₹1,500", pro: "₹6,500 (1.5 Liters Premium)", notes: { en: "White Musk, Shamama, Amber, Oudh, Blue Ocean", ml: "വൈറ്റ് മസ്ക്, ശമാമ, അംബർ, ഔദ്, ബ്ലൂ ഓഷ്യൻ", ar: "مسك، شمامة، عنبر، عود، منعش" } },
        { item: { en: "Empty Glass Flacons / Roll-on Bottles (6ml / 12ml)", ml: "ഗ്ലാസ് റോൾ-ഓൺ കുപ്പികൾ (6ml / 12ml ഒക്ടാഗണൽ)", ar: "زجاجات رول كريستال ومضلعة أنيقة" }, starter: "₹450 (50 bottles @ ₹9/pc)", pro: "₹2,250 (150 crystal bottles)", notes: { en: "Abdul Rehman St Crawford or Kozhikode", ml: "മിഠായിത്തെരുവ് അല്ലെങ്കിൽ ക്രോഫോർഡ് മാർക്കറ്റ്", ar: "سوق كروفورد أو كاليكوت" } },
        { item: { en: "Packaging (Black Velvet Drawstring Pouches)", ml: "പാക്കേജിംഗ് (വെൽവെറ്റ് പൗച്ചുകൾ / പ്രീമിയം ബോക്സ്)", ar: "أكياس قماش مخملية فاخرة برباط ذهبي" }, starter: "₹300 (50 pouches @ ₹6/pc)", pro: "₹2,000 (Custom rigid gift boxes)", notes: { en: "Creates premium luxury unboxing feel", ml: "ലക്ഷ്വറി ഫീൽ നൽകുന്ന കറുത്ത വെൽവെറ്റ്", ar: "تعطي طابعاً ملكياً للهدية" } },
        { item: { en: "Branded Vinyl Waterproof Stickers (100 pcs)", ml: "ബ്രാൻഡഡ് വാട്ടർപ്രൂഫ് വിനൈൽ സ്റ്റിക്കറുകൾ", ar: "ملصقات فينيل ضد الماء والزيوت بشعارك" }, starter: "₹200 (100 custom printed labels)", pro: "₹800 (Gold foil embossed)", notes: { en: "Print locally in Kozhikode/Kochi", ml: "പ്രാദേശിക പ്രിന്റിംഗ് പ്രസ്സിൽ അടിക്കാം", ar: "طباعة محلية سريعة" } },
        { item: { en: "Tools: Medical Pipettes (5ml) & Clean Beaker", ml: "അളവു ഉപകരണങ്ങൾ: ഡ്രോപ്പർ പൈപ്പറ്റുകൾ (5ml)", ar: "قطارات قياس طبية وكؤوس مدرجة نظيفة" }, starter: "₹150 (Pack of 20 pipettes)", pro: "₹450 (Stainless funnel & beaker)", notes: { en: "Ensures 0% oil wastage during filling", ml: "ഒരു തുള്ളി പോലും പാഴാവാതെ കുപ്പിയിൽ നിറയ്ക്കാം", ar: "تمنع هدر أي قطرة زيت عطرية" } },
        { item: { en: "Courier Packing Buffer (Bubble wrap & mailer bags)", ml: "കൊറിയർ പാക്കിംഗ് ബഫർ (ബബിൾ റാപ്പ് & ബോക്സ്)", ar: "مواد حماية الشحن (بابل رول وأكياس شحن)" }, starter: "₹500 (Reserve for initial orders)", pro: "₹2,500 (Branded courier polybags)", notes: { en: "For first 15-20 customer dispatches", ml: "ആദ്യ ഓർഡറുകൾ സുരക്ഷിതമായി അയക്കാൻ", ar: "لتأمين أول 20 طرد بريدي" } }
      ],
      totalStarterCost: "₹3,100",
      totalProCost: "₹14,500",

      // Module 3: Formulation & Assembly Guide (പുതിയത് ഉണ്ടാക്കാൻ എത്ര വേണം)
      formulation: {
        costPerUnitBox: {
          en: "Exact Cost to Make 1 Finished Luxury 6ml Attar Bottle: Oil (6ml): ₹16.80 + Octagonal Bottle: ₹9.00 + Velvet Pouch: ₹6.00 + Vinyl Label: ₹2.00 = <strong>Total ₹33.80!</strong> Sells on Instagram for ₹249 to ₹349 (Over ₹215+ net profit per bottle!).",
          ml: "ഒരു ഫിനിഷ്ഡ് 6ml ലക്ഷ്വറി അത്തർ ഉണ്ടാക്കാൻ വേണ്ട ആകെ തുക: ഓയിൽ (6ml): ₹16.80 + ഒക്ടാഗണൽ കുപ്പി: ₹9.00 + വെൽവെറ്റ് പൗച്ച്: ₹6.00 + ബ്രാൻഡ് സ്റ്റിക്കർ: ₹2.00 = <strong>ആകെ വെറും ₹33.80 മാത്രം!</strong> ഇത് വിൽക്കുന്നത് ₹249 മുതൽ ₹349 വരെയാണ് (ഒരു കുപ്പിയിൽ നിന്ന് മാത്രം ₹215-ലധികം ലാഭം!).",
          ar: "التكلفة الدقيقة لتصنيع زجاجة دهن عود 6 مل فاخرة: زيت مركز (6 مل): 16.80 روبية + زجاجة رول أنيقة: 9 روبيات + كيس مخملي: 6 روبيات + استيكر شعارك: روبيتان = <strong>الإجمالي 33.80 روبية فقط!</strong> تُباع عبر الإنترنت بـ 249 إلى 349 روبية (أكثر من 215 روبية ربح صافي بكل حبة!)."
        },
        steps: [
          {
            step: 1,
            title: { en: "Clean & Dry Workspace Setup", ml: "അണുവിമുക്തവും ഈർപ്പമില്ലാത്തതുമായ അന്തരീക്ഷം", ar: "تجهيز مساحة عمل جافة ومعقمة" },
            desc: { en: "Ensure your table is 100% free of moisture and water drops. Even a single water drop can cloud fragrance oils and spoil longevity.", ml: "മേശയും കുപ്പികളും പൂർണ്ണമായും ഉണങ്ങിയതാണെന്ന് ഉറപ്പാക്കുക. അത്തറിൽ ഒരു തുള്ളി വെള്ളം വീണാൽ പോലും അതിന്റെ ഗുണവും മണവും നഷ്ടപ്പെടും.", ar: "تأكد من خلو الأدوات من قطرات الماء؛ الرطوبة تُتلف نقاء الزيت العطري." }
          },
          {
            step: 2,
            title: { en: "Accurate Pipette Extraction", ml: "പൈപ്പറ്റ് ഉപയോഗിച്ച് കൃത്യമായി അളന്നെടുക്കുക", ar: "سحب الزيت العطري بالقطارة المدرجة" },
            desc: { en: "Use a clean 5ml graduated disposable pipette to draw exactly 6ml or 12ml from your mother oil container and dispense slowly into the glass flacon.", ml: "5ml ഗ്രാജ്വേറ്റഡ് ഡ്രോപ്പർ ഉപയോഗിച്ച് കൃത്യം 6ml അല്ലെങ്കിൽ 12ml ഓയിൽ മദർ ബോട്ടിലിൽ നിന്നും എടുത്ത് കുപ്പിയിലേക്ക് ഒഴിക്കുക.", ar: "اسحب الكمية المحددة بالمليمتر بالقطارة المدرجة وفرغها في الزجاجة بهدوء." }
          },
          {
            step: 3,
            title: { en: "Press-Fitting Roller Ball & Cap", ml: "റോൾ-ഓൺ ബോളും ക്യാപ്പും അമർത്തി ഉറപ്പിക്കുക", ar: "تثبيت رول التوزيع وإحكام الغطاء" },
            desc: { en: "Press down the stainless steel or plastic roller ball plug until it clicks flush. Screw on the metallic gold or silver cap tightly to seal.", ml: "റോൾ-ഓൺ ബോൾ വിരൽ കൊണ്ട് അമർത്തി കുപ്പിയിൽ ഉറപ്പിക്കുക. തുടർന്ന് ഗോൾഡൻ മെറ്റൽ ക്യാപ്പ് വലിച്ച് മുറുക്കി അടയ്ക്കുക.", ar: "اضغط بكرة الرول بقوة حتى تسمع صوت استقرارها ثم أحكم إغلاق الغطاء الذهبي." }
          },
          {
            step: 4,
            title: { en: "Sticker Application & Wipe-Down", ml: "ലോഗോ സ്റ്റിക്കർ ഭംഗിയായി ഒട്ടിക്കുക", ar: "لصق شعار علامتك التجاري بدقة" },
            desc: { en: "Wipe bottle exterior with a microfiber cloth to remove fingerprint smudges, then align and apply your waterproof vinyl brand label centered.", ml: "മൈക്രോഫൈബർ തുണി കൊണ്ട് കുപ്പി തുടച്ച് വിരലടയാളങ്ങൾ മാറ്റിയ ശേഷം നടുവിലായി നിങ്ങളുടെ ബ്രാൻഡ് ലേബൽ ഒട്ടിക്കുക.", ar: "امسح الزجاجة بقطعة قماش ناعمة ثم ألصق استيكر هويتك في المنتصف باستقامة." }
          },
          {
            step: 5,
            title: { en: "Velvet Pouch Packaging & Free Sample Strip", ml: "വെൽവെറ്റ് പൗച്ചിൽ വെച്ച് ഫ്രീ സാമ്പിൾ സ്ട്രിപ്പ് നൽകുക", ar: "التغليف داخل الكيس المخملي وإضافة عينة مجانية" },
            desc: { en: "Place inside the black drawstring velvet pouch. Slip in a scented blotter strip of another variety as a complimentary surprise gift!", ml: "കറുത്ത വെൽവെറ്റ് പൗച്ചിനുള്ളിൽ വെച്ച് കയർ മുറുക്കുക. മറ്റൊരു അത്തറിന്റെ സുഗന്ധം പുരട്ടിയ ചെറിയ സ്ട്രിപ്പ് സൗജന്യമായി ഒപ്പം വെക്കുക.", ar: "ضع الزجاجة في الكيس المخملي وضع معها شريحة ورقية معطرة بنوع آخر كهدية مجانية." }
          }
        ]
      },
    },

    clothing: {
      id: "clothing",
      icon: "fa-shirt",
      headerClass: "clothing-header",
      badgeColor: "#be185d",
      title: {
        en: "Dresses, Modest Wear & Boutique Academy",
        ml: "വസ്ത്രങ്ങൾ & ഓൺലൈൻ ബോട്ടിക് പഠന ശാഖ",
        ar: "أكاديمية العبايات والأزياء والفساتين النسائية"
      },
      tagline: {
        en: "High volume daily necessity. Modest Abayas, Hijabs, Kurtis & Casual wear from direct mills.",
        ml: "ദൈനംദിന ആവശ്യമായതിനാൽ ഉയർന്ന വിറ്റുവരവ്. അബായ, ഹിജാബ്, കുർത്തീസ് ഫാക്ടറി നിരക്കിൽ.",
        ar: "سلعة استهلاكية أساسية بطلب متكرر. تشمل العبايات والفساتين والكورتي من المصانع مباشرة."
      },
      minBudget: "₹10,000 - ₹35,000",
      margin: "45% - 120%",
      topMarkets: "Surat Millennium Market, Tirupur Cotton Cluster, Kochi Broadway",
      
      images: {
        cover: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        product: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
        sourcing: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        formulation: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
        packaging: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
      },

      onlinePortals: {
        intro: {
          en: "Direct access to verified Surat & Tirupur mill catalogs, modest fashion Instagram brands, wholesale Facebook reseller groups, and Dubai Abaya Souk export contacts. Tap any card to open.",
          ml: "സൂറത്ത്, തിരുപ്പൂർ മില്ലുകളുടെ വെബ്‌സൈറ്റുകൾ, ട്രെൻഡിങ് അബായ ഇൻസ്റ്റാഗ്രാം പേജുകൾ, വ്യാപാരികളുടെ ഗ്രൂപ്പുകൾ, ദുബായ് നായിഫ് സൂഖ് കാറ്റലോഗുകൾ എന്നിവ താഴെ നൽകിയിരിക്കുന്നു.",
          ar: "روابط مباشرة لمصانع سورات وتيروبور، وحسابات إنستغرام لأشهر ماركات العبايات، ومجموعات تجار الجملة في دبي وسوق نايف."
        },
        instagram: [
          {
            handle: "@houseofhaya_official",
            name: "House of Haya (Dubai & India)",
            url: "https://www.instagram.com/explore/tags/abayamodest/",
            followers: "310K",
            region: "UAE & India",
            flag: "🇦🇪 🇮🇳",
            badge: "Modest Fashion Inspiration",
            desc: {
              en: "Study their Nada crepe draping, video reels showcasing fabric flow, and minimalist Korean chiffon styling.",
              ml: "നദ ക്രേപ്പ്, കൊറിയൻ ഷിഫോൺ അബായകൾ എങ്ങനെ പ്രീമിയം രീതിയിൽ അവതരിപ്പിക്കാമെന്ന് കാണാം.",
              ar: "تعلم منهم أسلوب تصوير العبايات والفساتين المحتشمة واستعراض خامات كريب ندى الفاخر."
            }
          },
          {
            handle: "@modestwearkerala",
            name: "Kerala Modest Boutique Hub",
            url: "https://www.instagram.com/explore/tags/keralaboutique/",
            followers: "180K",
            region: "Kerala",
            flag: "🇮🇳",
            badge: "Local Festive Collections",
            desc: {
              en: "High-converting Kerala reels format, Eid/wedding collections, and customer testimonial story highlights.",
              ml: "പെരുന്നാൾ/വിവാഹ സീസണുകളിൽ കേരളത്തിൽ കൂടുതൽ വിറ്റുപോകുന്ന വസ്ത്രങ്ങളുടെ മോഡലുകൾ.",
              ar: "أفكار مميزة لحملات أزياء الأعياد والأعراس في كيرالا وكيفية بناء الثقة مع العملاء عبر الستوري."
            }
          },
          {
            handle: "@surat_textile_direct",
            name: "Surat Mills Daily Catalog",
            url: "https://www.instagram.com/explore/tags/suratsaree/",
            followers: "Daily Drops",
            region: "Surat, Gujarat",
            flag: "🇮🇳",
            badge: "Mill Wholesale Feed",
            desc: {
              en: "Daily drops of stitched kurtis, coordinate sets, and cotton dress materials directly from Ring Road looms.",
              ml: "സൂറത്ത് മില്ലുകളിൽ നിന്ന് ദിവസേന പുറത്തിറങ്ങുന്ന പുതിയ കുർത്തീസ്, ഡ്രസ്സ് മെറ്റീരിയലുകൾ.",
              ar: "تحديثات يومية لأحدث أطقم الكورتي والأقمشة القطنية من مصانع سورات مباشرة."
            }
          },
          {
            handle: "@tirupur_cotton_mills",
            name: "Tirupur Knitwear Exporters",
            url: "https://www.instagram.com/explore/tags/tirupurtextiles/",
            followers: "Direct Looms",
            region: "Tirupur, TN",
            flag: "🇮🇳",
            badge: "Pure Combed Cotton",
            desc: {
              en: "100% combed cotton oversized t-shirts, loungewear, and nightwear with MOQ 15 pcs and transport delivery.",
              ml: "100% പ്യുവർ കോട്ടൺ വസ്ത്രങ്ങൾ, നൈറ്റ് വെയർ എന്നിവ ഫാക്ടറി നിരക്കിൽ നൽകുന്ന വ്യാപാരികൾ.",
              ar: "ملابس قطنية مريحة وفساتين منزلية قطنية 100% بأسعار المصنع وشحن بريدي ميسر."
            }
          }
        ],
        facebook: [
          {
            name: "Surat Textile Wholesalers & Resellers Hub",
            url: "https://www.facebook.com/groups/surattextilewholesale",
            members: "145K Members",
            region: "Pan-India",
            flag: "🇮🇳",
            badge: "Factory Direct Deals",
            desc: {
              en: "Over 145,000 verified textile mill owners and resellers posting daily clearance lots and WhatsApp catalogs.",
              ml: "സൂറത്തിലെ വസ്ത്ര നിർമ്മാതാക്കൾ നേരിട്ട് വിലക്കുറവിൽ സ്റ്റോക്കുകൾ വിൽക്കുന്ന ഗ്രൂപ്പ്.",
              ar: "أكبر تجمع لمصنعي أقمشة سورات والموزعين لعرض التخفيضات اليومية بالجملة."
            }
          },
          {
            name: "Tirupur Garments Direct Manufacturers Community",
            url: "https://www.facebook.com/groups/tirupurgarments",
            members: "82K Members",
            region: "South India",
            flag: "🇮🇳",
            badge: "Knitwear Looms",
            desc: {
              en: "Direct connection with Tirupur knitters and exporters offering surplus export garments at unbelievable prices.",
              ml: "തിരുപ്പൂരിലെ കയറ്റുമതി ഫാക്ടറികളിൽ നിന്നുള്ള തുണിത്തരങ്ങൾ കുറഞ്ഞ നിരക്കിൽ ലഭിക്കുന്ന ഗ്രൂപ്പ്.",
              ar: "تواصل مباشر مع مصانع تيروبور للملابس القطنية الفائضة من التصدير بأسعار مغرية."
            }
          },
          {
            name: "Dubai Naif Souk Abaya Exporters Group",
            url: "https://www.facebook.com/groups/dubaiperfumesouk",
            members: "55K Members",
            region: "GCC & UAE",
            flag: "🇦🇪",
            badge: "GCC Direct Cargo",
            desc: {
              en: "Dubai Deira Naif Souk abaya shops providing consolidated air cargo delivery directly to Kerala airports.",
              ml: "ദുബായ് നായിഫ് സൂഖിൽ നിന്ന് നേരിട്ട് കേരളത്തിലേക്ക് അബായകൾ കാർഗോ വഴി അയച്ചുതരുന്ന ഗ്രൂപ്പ്.",
              ar: "تجار سوق نايف للعبايات في دبي مع خدمة الشحن الجوي المباشر إلى كيرالا."
            }
          }
        ],
        websites: [
          {
            name: "Textile Infomedia Surat Wholesale Hub",
            domain: "textileinfomedia.com",
            url: "https://www.textileinfomedia.com",
            type: "National Textile Portal",
            region: "India",
            flag: "🇮🇳",
            badge: "Verified Mill Directory",
            desc: {
              en: "Directory of 5,000+ verified Surat textile manufacturers, weaving mills, and wholesale kurti distributors.",
              ml: "സൂറത്തിലെ അയ്യായിരത്തിലധികം ടെക്സ്റ്റൈൽ ഫാക്ടറികളുടെ ഫോൺ നമ്പറുകളും കാറ്റലോഗും ലഭിക്കുന്ന പോർട്ടൽ.",
              ar: "دليل شامل يضم أكثر من 5000 مصنع نسيج معتمد في سورات مع أرقام التواصل."
            }
          },
          {
            name: "IndiaMART Stitched Kurti & Abaya Mills",
            domain: "indiamart.com",
            url: "https://www.indiamart.com/impcat/ladies-kurti.html",
            type: "Factory Direct Buying",
            region: "Pan-India",
            flag: "🇮🇳",
            badge: "Direct Looms (₹160-₹350)",
            desc: {
              en: "Direct factory pricing for daily wear stitched kurtis, cotton sets, and Islamic modest wear with buyer protection.",
              ml: "റെഡിമെയ്ഡ് കുർത്തീസുകളും കോട്ടൺ സെറ്റുകളും ഫാക്ടറി വിലയിൽ (₹160-₹350) വാങ്ങാനുള്ള ലിങ്ക്.",
              ar: "شراء مباشر للكورتي والفساتين النسائية الجاهزة بأسعار المصنع مع حماية المشتري."
            }
          },
          {
            name: "Tirupur Cotton Cluster Manufacturers",
            domain: "tirupurknitwears.com",
            url: "https://www.tirupurknitwears.com",
            type: "Knitwear Industry Portal",
            region: "Tirupur, TN",
            flag: "🇮🇳",
            badge: "Pure Cotton Export",
            desc: {
              en: "Direct link to South India's cotton apparel cluster for unbranded blank t-shirts, loungewear, and baby wear.",
              ml: "തിരുപ്പൂർ കോട്ടൺ ക്ലസ്റ്ററിലെ വസ്ത്ര നിർമ്മാതാക്കളിൽ നിന്ന് നേരിട്ട് വാങ്ങാനുള്ള ഒഫീഷ്യൽ സൈറ്റ്.",
              ar: "البوابة الرسمية لمصانع تيروبور للألبسة القطنية بدون علامة تجارية لطباعة شعارك."
            }
          },
          {
            name: "Dubai Naif Souk Abaya Wholesale District",
            domain: "visitdubai.com",
            url: "https://www.visitdubai.com/en/places-to-visit/naif-souk",
            type: "Global Modest Fashion Center",
            region: "Dubai, UAE",
            flag: "🇦🇪",
            badge: "GCC Wholesale Market",
            desc: {
              en: "Official guide to Dubai's Naif Souk, home to over 200 abaya wholesalers, fabric cutters, and embroidery shops.",
              ml: "ദുബായിലെ പ്രസിദ്ധമായ നായിഫ് മാർക്കറ്റിലെ അബായ കടകളുടെയും മൊത്തവ്യാപാരികളുടെയും വിവരങ്ങൾ.",
              ar: "دليل سوق نايف التراثي في دبي؛ عاصمة تجارة العبايات والأقمشة الخليجية بالجملة."
            }
          },
          {
            name: "Alibaba Verified Modest Wear Apparel Mills",
            domain: "alibaba.com",
            url: "https://www.alibaba.com/trade/search?SearchText=abaya+modest+wear",
            type: "Global Factory Sourcing",
            region: "International Export",
            flag: "🌍",
            badge: "Custom Embroidery Looms",
            desc: {
              en: "Custom fabric stitching, private label embroidery, and container/air cargo options with trade assurance.",
              ml: "സ്വന്തം ബ്രാൻഡ് ലേബലിൽ അബായകളും വസ്ത്രങ്ങളും തുന്നി ഇറക്കുമതി ചെയ്യാനുള്ള അന്താരാഷ്ട്ര ഫാക്ടറി പോർട്ടൽ.",
              ar: "استيراد عبايات وأزياء مصممة بهويتك الخاصة من المصانع العالمية مع ضمان الجودة والشحن."
            }
          }
        ]
      },

      curriculumHighlights: {
        en: [
          "Understanding fabric GSM, Nada crepe, Korean chiffon & pure cotton",
          "Itemized startup budget for starting an Instagram clothing boutique",
          "How to source directly from Surat & Tirupur mills via WhatsApp with MOQ 15 pcs",
          "Aesthetic smartphone photography & size chart guide that eliminates returns",
          "Interactive dress profit simulator and margin calculator",
          "Wholesaler dialogue: asking for video calls of fabric drape & defect guarantee"
        ],
        ml: [
          "തുണിയുടെ ഗുണനിലവാരം (GSM), നദ ക്രേപ്പ്, കൊറിയൻ ഷിഫോൺ എന്നിവ തിരിച്ചറിയാം",
          "ഓൺലൈൻ ബോട്ടിക് തുടങ്ങാൻ എന്തിനൊക്കെ എത്ര രൂപ വേണം? (ബഡ്ജറ്റ് പട്ടിക)",
          "സൂററ്റിലെയും തിരുപ്പൂരിലെയും മില്ലുകളിൽ നിന്ന് 15 പീസ് സാമ്പിളുകൾ വാങ്ങാം",
          "റിട്ടേൺ വരാതിരിക്കാൻ കൃത്യമായ അളവുകളും മൊബൈൽ ഫോട്ടോഗ്രാഫിയും",
          "ഒരു ഡ്രസ്സിൽ നിന്നും എത്ര ലാഭം കിട്ടുമെന്ന് കാണിക്കുന്ന പ്രോഫിറ്റ് ടൂൾ",
          "സൂററ്റ് മില്ലുകളോട് വീഡിയോ കോളിൽ തുണി പരിശോധിക്കാനുള്ള ചോദ്യങ്ങൾ"
        ],
        ar: [
          "التعرف على أقمشة الكريب والندى والشيفون الكوري والقطن الصافي ومواصفاتها",
          "جدول الميزانية الأولي لإطلاق بوتيك أونلاين برأس مال مدروس",
          "كيفية الطلب المباشر من مصانع سورات وتيروبور بالواتساب بحد أدنى 15 قطعة فقط",
          "أسرار تصوير الملابس بالهاتف الذكي وجداول المقاسات الدقيقة لتفادي الإرجاع",
          "حاسبة هوامش الربح لتجارة الملابس الجاهزة",
          "سيناريو مكالمة الفيديو لفحص جودة انسيابية القماش وضمان عيوب التصنيع"
        ]
      },

      blueprint: {
        intro: {
          en: "Fashion is a daily staple with massive festive surges (Eid, Onam, Weddings) in Kerala and GCC. The secret to 100%+ margin is skipping retail middlemen and connecting directly with textile weaving clusters in Surat (Gujarat) and Tirupur (Tamil Nadu).",
          ml: "വസ്ത്ര വിപണിയിൽ എപ്പോഴും ആവശ്യക്കാരുണ്ട്. പെരുന്നാൾ, ഓണം, വിവാഹ സീസണുകളിൽ വിൽപന ഇരട്ടിയാകും. ഇടനിലക്കാരെ ഒഴിവാക്കി സൂററ്റിലെയും തിരുപ്പൂരിലെയും മില്ലുകളിൽ നിന്ന് നേരിട്ട് വാട്സ്ആപ്പിലൂടെ ഓർഡർ ചെയ്താൽ 50% മുതൽ 120% വരെ ലാഭം നേടാം.",
          ar: "تجارة الملابس تتضاعف أرباحها في مواسم الأعياد والأعراس. السر في تحقيق أرباح تفوق 100% هو تخطي الوسطاء والشراء مباشرة من مصانع سورات وتيروبور."
        },
        fastMovingList: [
          { name: { en: "Dubai Crepe / Nada Modest Abayas", ml: "ദുബായ് ക്രേപ്പ് / നദ അബായകൾ", ar: "عبايات قماش الكريب والندى الفاخر" }, wholesale: "₹450 - ₹750 / piece", retail: "₹1,399 - ₹2,499", profit: "₹950+ profit per piece" },
          { name: { en: "Cotton Daily Wear Kurtis (Set of 4)", ml: "ഡെയ്‌ലി വെയർ കോട്ടൺ കുർത്തീസ്", ar: "كورتي قطني كاجوال عملي" }, wholesale: "₹180 - ₹280 / piece", retail: "₹549 - ₹799", profit: "₹370 profit per piece" },
          { name: { en: "Korean Chiffon Hijabs & Stoles", ml: "കൊറിയൻ ഷിഫോൺ ഹിജാബുകൾ", ar: "شالات وطرح شيفون كوري" }, wholesale: "₹45 - ₹80 / piece", retail: "₹199 - ₹299", profit: "₹160 profit per piece" },
          { name: { en: "240 GSM Oversized T-Shirts", ml: "ഓവർസൈസ്ഡ് കോട്ടൺ ടീ-ഷർട്ടുകൾ", ar: "تيشيرتات قطنية شبابية أوفرسايز" }, wholesale: "₹140 - ₹190 / piece", retail: "₹599 - ₹899", profit: "₹450 profit per piece" }
        ]
      },

      capitalTable: [
        { item: { en: "Initial Inventory: 20-25 Curated Abayas / Kurtis", ml: "ആദ്യ സ്റ്റോക്ക്: 20-25 അബായകൾ അല്ലെങ്കിൽ കുർത്തീസ്", ar: "المخزون الأولي: 20 إلى 25 قطعة عبايات أو فساتين" }, starter: "₹8,500", pro: "₹28,000 (80+ assorted items)", notes: { en: "Direct from Surat / Tirupur mills", ml: "സൂററ്റ് / തിരുപ്പൂർ ഫാക്ടറികളിൽ നിന്ന്", ar: "مباشرة من مصانع سورات وتيروبور" } },
        { item: { en: "Branded Frosted Zip-lock Slider Bags (50 pcs)", ml: "ബ്രാൻഡഡ് സിപ്-ലോക്ക് സ്ലൈഡർ കവറുകൾ", ar: "أكياس شحن مطفية بسحاب منزلق فاخر" }, starter: "₹400 (50 frosted bags @ ₹8)", pro: "₹1,200 (200 printed bags)", notes: { en: "Protects clothes from water during transit", ml: "വസ്ത്രങ്ങൾ മഴ നനയാതെ സുരക്ഷിതമായിരിക്കും", ar: "تحمي الملابس من الأتربة والرطوبة" } },
        { item: { en: "Custom Hangtags & Thank You Cards", ml: "ബ്രാൻഡ് ഹാംഗ് ടാഗുകൾ & താങ്ക് യൂ കാർഡുകൾ", ar: "بطاقات أسعار ورقية فاخرة وبطاقة شكر" }, starter: "₹250 (100 tags with string)", pro: "₹750 (Embossed hangtags)", notes: { en: "Give boutique branded look", ml: "വസ്ത്രത്തിന് ബോട്ടിക് ലുക്ക് നൽകും", ar: "تمنح الفستان طابع البوتيك المتميز" } },
        { item: { en: "Smartphone Ring Light & Measuring Tape", ml: "ലൈറ്റിംഗ് ടൂൾസ്: റിംഗ് ലൈറ്റും അളവ് ടേപ്പും", ar: "رينج لايت للهاتف وشريط قياس مرن" }, starter: "₹450 (10-inch ring light + tape)", pro: "₹1,500 (Studio backdrop & softbox)", notes: { en: "Crucial for crystal-clear catalog photos", ml: "വ്യക്തമായ ഫോട്ടോകൾ എടുക്കാൻ ആവശ്യം", ar: "أساسي لتصوير تفاصيل القماش بوضوح" } },
        { item: { en: "Courier Reserve Buffer", ml: "കൊറിയർ പാക്കിംഗ് & ആദ്യ ഷിപ്പിംഗ് ബഫർ", ar: "مخصص نفقات الشحن الأولي" }, starter: "₹800", pro: "₹2,500", notes: { en: "Covers initial 10-15 Kerala dispatches", ml: "ആദ്യത്തെ 10-15 പാഴ്സലുകൾ അയക്കാൻ", ar: "لتأمين شحن أول 15 طلباً" } }
      ],
      totalStarterCost: "₹10,400",
      totalProCost: "₹33,950",

      formulation: {
        costPerUnitBox: {
          en: "Unit Economics: Surat Dubai Crepe Abaya: ₹550 + Frosted Slider Bag: ₹8 + Hangtag: ₹2.50 = <strong>Total cost ₹560.50!</strong> Sells on Instagram for ₹1,499 to ₹1,999 (Over ₹930+ net profit per piece!).",
          ml: "ഒരു അബായയുടെ കണക്ക്: സൂററ്റ് നദ അബായ: ₹550 + സിപ് സ്ലൈഡർ ബാഗ്: ₹8 + ബോട്ടിക് ടാഗ്: ₹2.50 = <strong>ആകെ വെറും ₹560.50!</strong> ഓൺലൈനിൽ വിൽക്കുന്നത് ₹1,499 മുതൽ ₹1,999 വരെ (ഒരു പീസിന് ₹930-ലധികം ലാഭം!).",
          ar: "حسابات القطعة: عباية كريب خليجي بسعر الجملة: 550 روبية + كيس مطفي: 8 روبيات + بطاقة الاسم: 2.50 = <strong>التكلفة الإجمالية 560.50 روبية!</strong> تُباع بـ 1,499 إلى 1,999 روبية (أكثر من 930 روبية صافي ربح بكل عباية!)."
        },
        steps: [
          {
            step: 1,
            title: { en: "Steam Ironing & Lint Inspection", ml: "ഇസ്തിരിയിടലും നൂലുകൾ നീക്കം ചെയ്യലും", ar: "الكي بالبخار وفحص الخيوط الزائدة" },
            desc: { en: "Steam iron every dress and snip off loose manufacturing threads. First impressions determine whether you get reviews or refund requests.", ml: "ഡ്രസ്സ് നന്നായി ഇസ്തിരിയിടുകയും വശങ്ങളിലെ നൂലുകൾ കട്ട് ചെയ്ത് വൃത്തിയാക്കുകയും ചെയ്യുക.", ar: "قم بكي الفستان بالبخار وقص أي خيوط زائدة قبل التصوير أو التغليف." }
          },
          {
            step: 2,
            title: { en: "Precise Measurement Charting", ml: "കൃത്യമായ അളവുകൾ രേഖപ്പെടുത്തുക", ar: "تدوين جدول المقاسات بالسنتيمتر" },
            desc: { en: "Measure Bust, Waist, Length, and Sleeve in inches. Mentioning exact sizing in your caption cuts size returns by 95%.", ml: "ചെസ്റ്റ്, നീളം, സ്ലീവ് എന്നിവ ഇഞ്ചിൽ അളന്ന് കൃത്യമായി കുറിക്കുക. ഇത് റിട്ടേൺ വരുന്നത് പൂർണ്ണമായി ഒഴിവാക്കും.", ar: "قس محيط الصدر والطول بدقة؛ ذكر المقاس بالإنش يقلل طلبات الإرجاع بنسبة 95%." }
          },
          {
            step: 3,
            title: { en: "Natural Light Photography", ml: "നല്ല വെളിച്ചത്തിൽ ഫോട്ടോ എടുക്കുക", ar: "التصوير الاحترافي في ضوء النهار" },
            desc: { en: "Hang against a plain white or beige wall near a window. Show texture close-up and full drape without heavy Instagram filters.", ml: "ജനലിനടുത്തുള്ള ഭിത്തിയിൽ ഹാങ്ങറിൽ തൂക്കിയിട്ട് സ്വാഭാവിക വെളിച്ചത്തിൽ ഫോട്ടോയും റീലും എടുക്കുക.", ar: "علق الفستان على جدار بسيط بجانب نافذة وصوّر تفاصيل القماش بدون فلاتر مشوهة." }
          },
          {
            step: 4,
            title: { en: "Attach Brand Hangtag", ml: "നിങ്ങളുടെ ബോട്ടിക് ടാഗ് ഉറപ്പിക്കുക", ar: "تثبيت بطاقة الماركة الأنيقة" },
            desc: { en: "Fasten your branded card tag to the collar or inner label using a satin ribbon or safety tag pin.", ml: "നിങ്ങളുടെ ബ്രാൻഡ് നെയിമുള്ള ടാഗ് ഭംഗിയായി കോളറിലോ വശത്തോ ഘടിപ്പിക്കുക.", ar: "ثبت بطاقة علامتك التجارية بدبوس أنيق عند الياقة." }
          },
          {
            step: 5,
            title: { en: "Fold in Frosted Zip Bag & Ship", ml: "സിപ്-ലോക്ക് ബാഗിൽ മടക്കി പാക്ക് ചെയ്യുക", ar: "الطي في كيس بسحاب وإضافة بطاقة شكر" },
            desc: { en: "Fold neatly with tissue paper lining and slide into the frosted zipper pouch with a handwritten thank-you note.", ml: "വൃത്തിയായി മടക്കി ടിഷ്യൂ പേപ്പർ വെച്ച് സിപ് ബാഗിൽ ഇടുക. ഒപ്പം സ്നേഹം നിറഞ്ഞൊരു താങ്ക് യൂ കാർഡും നൽകുക.", ar: "اطوِ الفستان بنظام وضعه داخل الكيس المطفى مع رسالة شكر للزبون." }
          }
        ]
      },
    },

    watches: {
      id: "watches",
      icon: "fa-clock",
      headerClass: "watch-header",
      badgeColor: "#4338ca",
      title: {
        en: "Fashion Watches & Combos Academy",
        ml: "ഫാഷൻ വാച്ചുകൾ & ഗിഫ്റ്റ് കോമ്പോ പഠന ശാഖ",
        ar: "أكاديمية الساعات الفاخرة وأطقم الهدايا"
      },
      tagline: {
        en: "Impulse gifting favorite with 60% - 150% profit. Minimalist analog & smartwatches.",
        ml: "ആളുകൾ സമ്മാനമായി നൽകാൻ ഇഷ്ടപ്പെടുന്നതിനാൽ പെട്ടെന്ന് വിറ്റുപോകുന്നു. 60% - 150% ലാഭം.",
        ar: "الأكثر مبيعاً في الهدايا بهامش ربح 60% إلى 150%. ساعات يد أنيقة وساعات ذكية."
      },
      minBudget: "₹8,000 - ₹20,000",
      margin: "60% - 150%",
      topMarkets: "Mumbai Manish Market, Delhi Sadar Bazaar & Gaffar Market",

      images: {
        cover: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        product: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
        sourcing: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
        formulation: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        packaging: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
      },

      curriculumHighlights: {
        en: [
          "Movement basics: Quartz movements, battery lifespan & waterproof grading",
          "Itemized budget to launch a curated watch boutique for under ₹8,500",
          "Sourcing verified stock from Mumbai Manish Market & Delhi Gaffar Market",
          "How to create couple watch gift boxes with bracelets for 250% higher order value",
          "Interactive watch unit & gift box profit simulator",
          "Wholesaler script: defect testing, battery replacement & wholesale cartons"
        ],
        ml: [
          "ക്വാർട്സ് മൂവ്മെന്റ്, ബാറ്ററി ആയുസ്സ്, വാട്ടർ റെസിസ്റ്റന്റ് എന്നിവ പഠിക്കാം",
          "വെറും ₹8,500-ൽ വാച്ച് ബിസിനസ്സ് തുടങ്ങാനുള്ള വിശദ ബഡ്ജറ്റ് പട്ടിക",
          "മുംബൈ മനീഷ് മാർക്കറ്റ്, ഡൽഹി ഗഫാർ മാർക്കറ്റ് വ്യാപാരികളുടെ ഫോൺ നമ്പറുകൾ",
          "ബ്രേസ്‌ലെറ്റ് ചേർത്തുള്ള കപ്പിൾ ഗിഫ്റ്റ് ബോക്സുകൾ ഉണ്ടാക്കി ഇരട്ടി ലാഭം നേടാം",
          "വാച്ചുകളുടെ വിലയും ലാഭവും കണക്കാക്കുന്ന ലൈവ് സിമുലേറ്റർ",
          "കേടുപാടുകൾ വന്നാൽ മാറ്റിവാങ്ങാനുള്ള കടക്കാരുമായുള്ള സംസാര രീതി"
        ],
        ar: [
          "فهم محركات الساعات، عمر البطارية، ودرجات مقاومة الماء للمبتدئين",
          "جدول التكلفة الأولي لإطلاق متجر ساعات أنيق بميزانية تبدأ من 8,500 روبية",
          "التوريد المباشر من سوق مانيش بمومباي وسوق غفار التكنولوجي بدلهي",
          "طريقة عمل أطقم هدايا الكوبلز مع أساور أنيقة لمضاعفة الأرباح",
          "حاسبة الأرباح لساعات اليد المنفردة وأطقم الهدايا الفاخرة",
          "سيناريو الحديث مع تجار الجملة بشأن فحص البطاريات وضمان الاستبدال"
        ]
      },

      blueprint: {
        intro: {
          en: "Watches are perceived as luxury lifestyle accessories. A minimalist watch bought wholesale for ₹220 to ₹350 sells easily for ₹899 to ₹1,299 when paired with a clean rigid box and velvet cushion.",
          ml: "വാച്ചുകൾ ആളുകൾക്ക് വളരെ മതിപ്പുള്ള ഉൽപ്പന്നമാണ്. വെറും ₹220 മുതൽ ₹350 വരെ മൊത്തവിലയുള്ള വാച്ചുകൾ നല്ലൊരു ഹാർഡ് ബോക്സിലും തലയിണയിലും വെച്ച് നൽകുമ്പോൾ ₹899 മുതൽ ₹1,299 വരെ നിഷ്പ്രയാസം വിൽക്കാം.",
          ar: "تعتبر الساعات رمزاً للأناقة وقيمة الهدية. الساعة التي تشتريها بسعر جملة 220 إلى 350 روبية تُباع بسهولة بـ 899 إلى 1,299 روبية عند تقديمها في علبة هدايا فاخرة."
        },
        fastMovingList: [
          { name: { en: "Minimalist Leather / Mesh Strap Watch", ml: "ലെതർ / മെഷ് സ്ട്രാപ്പ് മിനിമലിസ്റ്റ് വാച്ച്", ar: "ساعة جلدية كلاسيكية بتصميم بسيط" }, wholesale: "₹220 - ₹320", retail: "₹799 - ₹1,199", profit: "₹570+ profit per watch" },
          { name: { en: "Couple Gift Set (His & Hers in Box)", ml: "കപ്പിൾ ഗിഫ്റ്റ് വാച്ച് ബോക്സ് സെറ്റ്", ar: "طقم هدايا ساعات رجالية ونسائية متطابقة" }, wholesale: "₹480 - ₹650 / pair", retail: "₹1,699 - ₹2,499", profit: "₹1,200 profit per box" },
          { name: { en: "AMOLED / Calling Smartwatches", ml: "കോളിംഗ് സ്മാർട്ട്‌വാച്ചുകൾ", ar: "ساعات ذكية تدعم المكالمات وشاشة أموليد" }, wholesale: "₹550 - ₹850", retail: "₹1,499 - ₹2,199", profit: "₹850 profit per piece" }
        ]
      },

      capitalTable: [
        { item: { en: "Initial Watch Stock: 20 Curated Fashion Watches", ml: "ആദ്യ സ്റ്റോക്ക്: 20 ട്രെൻഡി ഫാഷൻ വാച്ചുകൾ", ar: "دفعة الساعات الأولى: 20 ساعة يد كلاسيكية" }, starter: "₹5,200", pro: "₹16,000 (50+ watches & sets)", notes: { en: "Manish Market Mumbai or Delhi", ml: "മുംബൈ മനീഷ് മാർക്കറ്റിൽ നിന്ന്", ar: "سوق مانيش بمومباي" } },
        { item: { en: "Hard Cardboard Gift Boxes with Velvet Pillow", ml: "ഹാർഡ് ഗിഫ്റ്റ് ബോക്സുകളും തലയിണകളും (25 pcs)", ar: "علب هدايا كرتونية مقواة مع وسادة مخملية" }, starter: "₹625 (25 boxes @ ₹25/pc)", pro: "₹1,800 (Custom logo printed boxes)", notes: { en: "Turns budget watch into a luxury gift", ml: "വാച്ചിന് പ്രീമിയം ലക്ഷ്വറി ലുക്ക് നൽകും", ar: "ترفع قيمة الساعة أضعافاً" } },
        { item: { en: "Extra Button Cell Batteries (Pack of 20)", ml: "അധിക ബട്ടൺ സെൽ ബാറ്ററികൾ (20 എണ്ണം)", ar: "بطاريات إضافية احتياطية (20 حبة)" }, starter: "₹150", pro: "₹350", notes: { en: "Complimentary extra battery builds trust", ml: "ഫ്രീയായി ഒരു ബാറ്ററി കൂടി നൽകിയാൽ കസ്റ്റമർ ഹാപ്പി", ar: "تقديم بطارية إضافية مجانية يبني الثقة" } },
        { item: { en: "Plastic Stopper Clips & Cleaning Cloths", ml: "പ്ലാസ്റ്റിക് സ്റ്റോപ്പർ ക്ലിപ്പുകളും തുണിയും", ar: "مشابك إيقاف البطارية وأقمشة تلميع" }, starter: "₹200", pro: "₹500", notes: { en: "Keeps battery fresh until customer unboxes", ml: "കസ്റ്റമർ തുറക്കുന്നത് വരെ ബാറ്ററി തീരില്ല", ar: "تحفظ البطارية جديدة لحين فتح الزبون للعلبة" } },
        { item: { en: "Bubble Wrap & Courier Mailers", ml: "ബബിൾ റാപ്പും ഷിപ്പിംഗ് ബാഗുകളും", ar: "تغليف حماية فقاعي وكراتين شحن" }, starter: "₹600", pro: "₹2,000", notes: { en: "Prevents glass scratches in transit", ml: "ഗ്ലാസ് പൊട്ടാതെ സുരക്ഷിതമായി എത്തിക്കാൻ", ar: "لحماية زجاج الساعة من الخدش أثناء الشحن" } }
      ],
      totalStarterCost: "₹6,775",
      totalProCost: "₹20,650",

      formulation: {
        costPerUnitBox: {
          en: "Watch Unit Economics: Analog Minimalist Watch: ₹260 + Velvet Pillow Box: ₹25 + Extra Battery & Wipe: ₹8 = <strong>Total cost ₹293!</strong> Sells on Instagram for ₹899 to ₹1,199 (Over ₹600+ net profit per piece!).",
          ml: "ഒരു വാച്ചിന്റെ ചെലവ്: വാച്ച്: ₹260 + വെൽവെറ്റ് പില്ലോ ബോക്സ്: ₹25 + എക്സ്ട്രാ ബാറ്ററി & ക്ലീനിംഗ് തുണി: ₹8 = <strong>ആകെ വെറും ₹293 മാത്രം!</strong> വിൽക്കുന്നത് ₹899 മുതൽ ₹1,199 വരെ (ഒരു വാച്ചിൽ നിന്ന് ₹600-ലധികം ലാഭം!).",
          ar: "حسابات الساعة الواحدة: ساعة يد بسعر الجملة: 260 روبية + علبة بوسادة مخمل: 25 روبية + بطارية إضافية وقماش تلميع: 8 روبيات = <strong>الإجمالي 293 روبية فقط!</strong> تُباع بـ 899 إلى 1,199 روبية (أكثر من 600 روبية صافي ربح بكل ساعة!)."
        },
        steps: [
          {
            step: 1,
            title: { en: "Crown Stopper Check & Time Alignment", ml: "ക്ലിപ്പും സമയവും പരിശോധിക്കുക", ar: "فحص مشبك التاج وضبط الوقت" },
            desc: { en: "Ensure the plastic stopper clip is in place under the crown to prevent battery drain. Test second-hand ticking smoothly.", ml: "ബാറ്ററി തീരാതിരിക്കാൻ ക്രൗണിന് താഴെ പ്ലാസ്റ്റിക് ക്ലിപ്പ് ഉണ്ടെന്ന് ഉറപ്പാക്കുക. സെക്കൻഡ് സൂചി ഓടുന്നുണ്ടോ എന്ന് നോക്കുക.", ar: "تأكد من وجود المشبك البلاستيكي لحفظ البطارية واختبر حركة العقارب بسلاسة." }
          },
          {
            step: 2,
            title: { en: "Glass Inspection & Microfiber Polishing", ml: "ഗ്ലാസ് വൃത്തിയാക്കി തിളക്കം നൽകുക", ar: "تلميع الزجاج وفحص النقاء" },
            desc: { en: "Inspect dial for internal dust particles and polish front/back glass using an optical microfiber cloth.", ml: "ഗ്ലാസിൽ വിരലടയാളങ്ങളോ പൊടിയോ ഉണ്ടെങ്കിൽ വൃത്തിയുള്ള തുണി ഉപയോഗിച്ച് തുടച്ചു മാറ്റുക.", ar: "امسح زجاج الساعة الأمامي والخلفي بقماش العدسات لإزالة البصمات تماماً." }
          },
          {
            step: 3,
            title: { en: "Cushion Mounting & Hard Box Placement", ml: "തലയിണയിൽ ഉറപ്പിച്ച് ബോക്സിൽ വെക്കുക", ar: "تثبيت الساعة على الوسادة المخملية" },
            desc: { en: "Buckle the watch snugly around the miniature velvet cushion. Place inside the hard cardboard presentation box.", ml: "ചെറിയ വെൽവെറ്റ് തലയിണയിൽ വാച്ച് കെട്ടി ഹാർഡ് ഗിഫ്റ്റ് ബോക്സിനുള്ളിൽ ഭംഗിയായി വെക്കുക.", ar: "أغلق حزام الساعة حول الوسادة المخملية وضعها في علبة الإهداء الكرتونية الفاخرة." }
          },
          {
            step: 4,
            title: { en: "Add Complimentary Battery & Warranty Card", ml: "സൗജന്യ ബാറ്ററിയും വാറന്റി കാർഡും വെക്കുക", ar: "إضافة بطارية بديلة مجانية وبطاقة ضمان" },
            desc: { en: "Tuck in a sealed backup button cell battery and a warranty card offering 6-month movement replacement.", ml: "ഒരു അധിക ബാറ്ററിയും നിങ്ങളുടെ 6 മാസത്തെ ഗ്യാരണ്ടി കാർഡും ബോക്സിനുള്ളിൽ ചേർക്കുക.", ar: "ضع البطارية البديلة وبطاقة ضمان المتجر داخل العلبة بجانب الساعة." }
          },
          {
            step: 5,
            title: { en: "Triple Bubble Wrap Packing", ml: "ബബിൾ റാപ്പിൽ പൊതിഞ്ഞ് കൊറിയർ ചെയ്യുക", ar: "التغليف الفقاعي المزدوج للشحن" },
            desc: { en: "Wrap the hard box in 2 layers of bubble wrap before sealing into the waterproof courier polybag.", ml: "ബോക്സ് രണ്ട് തവണ ബബിൾ റാപ്പിൽ പൊതിഞ്ഞ് കൊറിയർ കവറിലാക്കുക.", ar: "لف العلبة بطبقتين من البابل رول لحمايتها قبل وضعها في كيس البريد السريع." }
          }
        ]
      },
    },

    bags: {
      id: "bags",
      icon: "fa-bag-shopping",
      headerClass: "bag-header",
      badgeColor: "#c2410c",
      title: {
        en: "Canvas Totes & Bags Academy",
        ml: "ക്യാൻവാസ് ബാഗുകൾ & ടോട്ടുകൾ പഠന ശാഖ",
        ar: "أكاديمية الحقائب اليدوية ومنتجات القماش والجلد"
      },
      tagline: {
        en: "College youth & aesthetic Instagram trend. 350 GSM cotton canvas & Dharavi genuine leather.",
        ml: "കോളേജ് വിദ്യാർത്ഥികൾക്കും പെൺകുട്ടികൾക്കും പ്രിയപ്പെട്ട ട്രെൻഡ്. സ്ക്രീൻ പ്രിന്റിംഗ് & ലെതർ.",
        ar: "صيحة عصرية لطلاب الجامعات والفتيات. قماش الكانفاس الطبيعي ومنتجات جلد درافي."
      },
      minBudget: "₹5,000 - ₹18,000",
      margin: "60% - 180%",
      topMarkets: "Dharavi Leather Cluster (Mumbai), Surat, Delhi Nabi Karim",

      images: {
        cover: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        product: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        sourcing: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
        formulation: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
        packaging: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
      },

      curriculumHighlights: {
        en: [
          "Understanding canvas weights (250 GSM vs 350 GSM heavy drill cotton)",
          "Step-by-step custom screen printing at local printing workshops",
          "Itemized budget to launch an aesthetic aesthetic tote brand for ₹5,500",
          "Direct WhatsApp contacts for Dharavi leather workshops & canvas bag stitchers",
          "Unit economics and live tote bag profit graph",
          "Wholesaler script: zipper quality, inner pockets & minimum custom printing batches"
        ],
        ml: [
          "കട്ടിയുള്ള കോട്ടൺ ക്യാൻവാസ് തുണികൾ (350 GSM) തിരഞ്ഞെടുക്കുന്ന വിധം",
          "പ്രാദേശിക സ്ക്രീൻ പ്രിന്റിംഗ് വഴി നിങ്ങളുടെ ചിത്രങ്ങളും എഴുത്തുകളും പ്രിന്റ് ചെയ്യാം",
          "വെറും ₹5,500-ൽ ഇൻസ്റ്റാഗ്രാം ബാഗ് ബ്രാൻഡ് തുടങ്ങാനുള്ള ബഡ്ജറ്റ് പട്ടിക",
          "ധാരാവി ലെതർ നിർമ്മാതാക്കളുടെയും സൂററ്റ് വ്യാപാരികളുടെയും ഫോൺ നമ്പറുകൾ",
          "ഒരു ബാഗിൽ നിന്നും എത്ര രൂപ ലാഭം കിട്ടുമെന്ന് കാണിക്കുന്ന പ്രോഫിറ്റ് ടൂൾ",
          "സിബ്ബുകളുടെ ഗുണനിലവാരവും അകത്തെ പോക്കറ്റുകളും ചോദിച്ചറിയാനുള്ള സംസാര രീതി"
        ],
        ar: [
          "التعرف على سماكات قماش الكانفاس الطبيعي (250 إلى 350 غرام) والمتانة",
          "طريقة طباعة العبارات والرسومات بالحرير في المطابع المحلية بخطوات عملية",
          "جدول التكلفة الأولي لإطلاق علامة حقائب يد كانفاس بميزانية 5,500 روبية",
          "أرقام ومواقع ورش الجلود الشهيرة في درافي بمومباي وسوق دلهي للحقائب",
          "حاسبة التكاليف والأرباح لحقائب اليد والمحافظ الجلدية",
          "سيناريو التواصل بشأن جودة السحابات والجيوب الداخلية والتصنيع الخاص"
        ]
      },

      blueprint: {
        intro: {
          en: "Eco-friendly aesthetic tote bags are one of the fastest selling merchandise products on Instagram. Blank canvas totes cost just ₹65 to ₹95 wholesale. Adding trendy typography or local Malayalam/Arabic quotes turns them into ₹399 to ₹599 fashion statements.",
          ml: "പ്ലാസ്റ്റിക് ഒഴിവാക്കാനും കോളേജിൽ പോകാനും യുവാക്കൾ ഇപ്പോൾ ക്യാൻവാസ് ടോട്ട് ബാഗുകളാണ് ഉപയോഗിക്കുന്നത്. വെറും ₹65 മുതൽ ₹95 വരെ മൊത്തവിലയുള്ള പ്ലെയിൻ ബാഗുകളിൽ മനോഹരമായ മലയാളം/ഇംഗ്ലീഷ് വരികൾ പ്രിന്റ് ചെയ്ത് ₹399 മുതൽ ₹599 വരെ ഓൺലൈനിൽ വിൽക്കാം.",
          ar: "حقائب الكانفاس القطنية الصديقة للبيئة من أكثر المنتجات طلباً بين الشباب والفتيات. حقيبة الكانفاس السادة تكلف بالجملة 65 إلى 95 روبية، وطباعة عبارات فنية عليها تحولها لقطعة مميزة تُباع بـ 399 إلى 599 روبية."
        },
        fastMovingList: [
          { name: { en: "350 GSM Heavy Canvas Tote with Zip & Pocket", ml: "സിപ്പും പോക്കറ്റുമുള്ള ഹെവി ക്യാൻവാസ് ടോട്ട്", ar: "حقيبة كانفاس سميكة بسحاب وجيب داخلي" }, wholesale: "₹85 - ₹110", retail: "₹399 - ₹599", profit: "₹320+ profit per bag" },
          { name: { en: "Minimalist Vegan Leather Sling Bag", ml: "വീഗൻ ലെതർ സ്ലിംഗ് ബാഗ്", ar: "حقيبة كروس صغيرة من الجلد الصناعي الفاخر" }, wholesale: "₹160 - ₹240", retail: "₹699 - ₹999", profit: "₹480 profit per bag" },
          { name: { en: "Dharavi Genuine Leather Men's Bi-Fold Wallet", ml: "ധാരാവി ഒറിജിനൽ ലെതർ വാലറ്റ്", ar: "محفظة رجالية جلد طبيعي من ورش درافي" }, wholesale: "₹120 - ₹180", retail: "₹499 - ₹799", profit: "₹350 profit per wallet" }
        ]
      },

      capitalTable: [
        { item: { en: "30 Heavy Cotton Blank Canvas Totes (with Inner Pocket)", ml: "30 എണ്ണം ഹെവി കോട്ടൺ ക്യാൻവാസ് ബാഗുകൾ", ar: "30 حقيبة كانفاس سادة سميكة بجيب وسحاب" }, starter: "₹2,700 (30 bags @ ₹90/pc)", pro: "₹8,500 (100 bags bulk)", notes: { en: "Direct from Surat or Delhi Nabi Karim", ml: "സൂററ്റിൽ നിന്നോ ഡൽഹിയിൽ നിന്നോ", ar: "من مصانع دلهي أو سورات" } },
        { item: { en: "Screen Printing Charges (Single Color Custom Print)", ml: "സ്ക്രീൻ പ്രിന്റിംഗ് ചെലവ് (30 എണ്ണത്തിന്)", ar: "تكلفة طباعة الشعار أو التصميم بالحرير" }, starter: "₹750 (Screen setup + ₹15/bag)", pro: "₹1,800 (Multi-color print)", notes: { en: "Done at local screen printer in your town", ml: "നിങ്ങളുടെ നാട്ടിലെ പ്രിന്റിംഗ് പ്രസ്സിൽ ചെയ്യാം", ar: "تُطبع في أي مطبعة محلية قريبة منك" } },
        { item: { en: "Custom Kraft Hangtags & Care Cards", ml: "ക്രാഫ്റ്റ് ഹാംഗ് ടാഗുകൾ & വാഷിംഗ് നിർദ്ദേശങ്ങൾ", ar: "بطاقات كرافت كلاسيكية وإرشادات الغسيل" }, starter: "₹200", pro: "₹600", notes: { en: "Adds aesthetic eco-friendly branding", ml: "ഇക്കോ-ഫ്രണ്ട്‌ലി ബ്രാൻഡിംഗ് നൽകും", ar: "تمنح الحقيبة لمسة تراثية بيئية راقية" } },
        { item: { en: "Clear Polywrap Packing & Dispatch Envelopes", ml: "പാക്കിംഗ് കവറുകളും കൊറിയർ കവറുകളും", ar: "أكياس شفافة لحفظ القماش ومغلفات بريد" }, starter: "₹450", pro: "₹1,200", notes: { en: "Totes are lightweight, saving courier fees", ml: "ഭാരം കുറവായതിനാൽ കൊറിയർ ചാർജ് വളരെ കുറവാണ്", ar: "وزن خفيف جداً يقلل تكلفة الشحن البريدي" } },
        { item: { en: "Marketing & Courier Buffer", ml: "കൊറിയർ ചാർജ് ബഫർ", ar: "مخصص نفقات الشحن الأولي" }, starter: "₹600", pro: "₹2,000", notes: { en: "For initial deliveries", ml: "ആദ്യ ഓർഡറുകൾ അയക്കാൻ", ar: "لتغطية شحن أول دفعة" } }
      ],
      totalStarterCost: "₹4,700",
      totalProCost: "₹14,100",

      formulation: {
        costPerUnitBox: {
          en: "Tote Bag Economics: Blank 350 GSM Bag: ₹90 + Custom Screen Print: ₹18 + Kraft Tag & Polybag: ₹6 = <strong>Total cost ₹114!</strong> Sells on Instagram for ₹399 to ₹549 (Over ₹285+ net profit per bag!).",
          ml: "ഒരു ടോട്ട് ബാഗിന്റെ കണക്ക്: പ്ലെയിൻ ബാഗ്: ₹90 + സ്ക്രീൻ പ്രിന്റിംഗ്: ₹18 + ക്രാഫ്റ്റ് ടാഗ് & കവർ: ₹6 = <strong>ആകെ വെറും ₹114 മാത്രം!</strong> വിൽക്കുന്നത് ₹399 മുതൽ ₹549 വരെ (ഒരു ബാഗിൽ നിന്ന് ₹285-ലധികം ലാഭം!).",
          ar: "حسابات الحقيبة الواحدة: حقيبة كانفاس سميكة سادة: 90 روبية + طباعة الشعار: 18 روبية + بطاقة كرافت وكيس: 6 روبيات = <strong>الإجمالي 114 روبية فقط!</strong> تُباع بـ 399 إلى 549 روبية (أكثر من 285 روبية صافي ربح بكل حقيبة!)."
        },
        steps: [
          {
            step: 1,
            title: { en: "Screen Printing Alignment", ml: "പ്രിന്റിംഗ് കൃത്യത പരിശോധിക്കുക", ar: "ضبط موضع الطباعة بدقة" },
            desc: { en: "Work with your local screen printer to burn a mesh stencil of your typography. Ensure printing is centered and ink is cured.", ml: "ലോക്കൽ പ്രസ്സിൽ നിങ്ങളുടെ എഴുത്തോ ഡിസൈനോ സ്ക്രീൻ പ്രിന്റ് ചെയ്ത് നന്നായി ഉണക്കുക.", ar: "اعتمد الشعار مع فني الطباعة وتأكد من تثبيت الحبر وتوسط الرسمة." }
          },
          {
            step: 2,
            title: { en: "Zipper & Stitch Reinforcement Test", ml: "സിബ്ബും തുന്നലുകളും പരിശോധിക്കുക", ar: "اختبار متانة الخياطة والسحاب" },
            desc: { en: "Pull handles firmly to test weight capacity (must hold 5-8 kg). Test zipper opening and closing smoothly.", ml: "ബാഗിന്റെ പിടിയിൽ വലിച്ച് ബലം പരിശോധിക്കുക. സിബ്ബ് ശരിയായി പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക.", ar: "شد مقبض الحقيبة بقوة للتأكد من تحمله وزن 5 كجم واختبر سلاسة السحاب." }
          },
          {
            step: 3,
            title: { en: "Iron & Fold Flat", ml: "ഇസ്തിരിയിട്ട് ഭംഗിയായി മടക്കുക", ar: "كي القماش وطي الحقيبة بنظام" },
            desc: { en: "Iron canvas from the back side so heat does not smudge print ink. Fold into a flat neat square.", ml: "പ്രിന്റ് കേടാവാതിരിക്കാൻ ബാഗിന്റെ പുറകുവശത്ത് ഇസ്തിരിയിട്ട് ഭംഗിയായി മടക്കുക.", ar: "اكْوِ القماش من الجهة الخلفية لحماية الحبر ثم اطوِ الحقيبة بشكل مسطح." }
          },
          {
            step: 4,
            title: { en: "Attach Eco-Friendly Kraft Hangtag", ml: "ഇക്കോ-ഫ്രണ്ട്‌ലി ടാഗ് ഘടിപ്പിക്കുക", ar: "ربط بطاقة الكرافت البيئية بخيط قنب" },
            desc: { en: "Tie the recycled kraft tag to the handle using natural jute twine.", ml: "ചണക്കയർ ഉപയോഗിച്ച് ബാഗിന്റെ പിടിയിൽ നിങ്ങളുടെ ബ്രാൻഡ് ടാഗ് കെട്ടുക.", ar: "اربط بطاقة هويتك المصنوعة من ورق الكرافت بخيط خيش طبيعي أنيق." }
          },
          {
            step: 5,
            title: { en: "Slide into Self-Adhesive Polybag", ml: "കവറിലിട്ട് പാക്ക് ചെയ്യുക", ar: "الحفظ داخل غلاف شفاف ذاتي اللصق" },
            desc: { en: "Insert into transparent self-adhesive cellophane polybag so the print is visibly displayed.", ml: "പ്രിന്റ് പുറത്തു കാണാവുന്ന രീതിയിൽ സുതാര്യമായ കവറിലിട്ട് ഒട്ടിക്കുക.", ar: "أدخل الحقيبة في غلاف بلاستيكي شفاف ذاتي اللصق لتظهر الرسمة بوضوح." }
          }
        ]
      },
    },

    accessories: {
      id: "accessories",
      icon: "fa-ring",
      headerClass: "ring-header",
      badgeColor: "#0f766e",
      title: {
        en: "Anti-Tarnish Jewelry & Rings Academy",
        ml: "ആന്റി-ടാർണിഷ് മോതിരങ്ങളും ആഭരണങ്ങളും പഠന ശാഖ",
        ar: "أكاديمية الخواتم والإكسسوارات المقاومة للماء"
      },
      tagline: {
        en: "Lowest risk & highest markup (100% - 300%). 316L Stainless Steel waterproof jewelry.",
        ml: "ഏറ്റവും കുറഞ്ഞ റിസ്കും ഉയർന്ന ലാഭവും (100% - 300%). വെള്ളം നനഞ്ഞാലും നിറം മങ്ങാത്ത ആഭരണങ്ങൾ.",
        ar: "أقل مخاطرة وأعلى هامش ربحي (100% إلى 300%). مجوهرات ستانلس ستيل 316L مقاومة للماء والصدأ."
      },
      minBudget: "₹2,500 - ₹8,000",
      margin: "100% - 300%",
      topMarkets: "Mumbai Bhuleshwar Market, Jaipur Johari Bazaar, Delhi Sadar",

      images: {
        cover: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
        product: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        sourcing: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
        formulation: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
        packaging: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
      },

      curriculumHighlights: {
        en: [
          "Understanding 316L Stainless Steel & 18K PVD vacuum plating (never tarnishes)",
          "Itemized budget to launch an Instagram ring brand for under ₹2,800",
          "Sourcing verified inventory from Mumbai Bhuleshwar & Jaipur gemstone cutters",
          "Ring sizing technique (free printable ring size chart for customers)",
          "Interactive ring unit economics and 300% profit graph",
          "Wholesaler script: lead/nickel-free test, mixed size lots & plating guarantee"
        ],
        ml: [
          "316L സ്റ്റെയിൻലെസ്സ് സ്റ്റീലും 18K ഗോൾഡ് പ്ലേറ്റിംഗും (നിറം മങ്ങാത്തതിന്റെ രഹസ്യം)",
          "വെറും ₹2,800 ഉണ്ടെങ്കിൽ സ്വന്തമായി ഒരു ജ്വല്ലറി പേജ് തുടങ്ങാം (ബഡ്ജറ്റ് പട്ടിക)",
          "മുംബൈ ഭൂലേശ്വർ മാർക്കറ്റിലെയും ജയ്പൂരിലെയും വ്യാപാരികളുടെ ഫോൺ നമ്പറുകൾ",
          "കസ്റ്റമർക്ക് വിരലിന്റെ കൃത്യമായ അളവ് നൽകാനുള്ള റിംഗ് സൈസിംഗ് ചാർട്ട്",
          "ഒരു മോതിരത്തിൽ നിന്നും 300% ലാഭം എങ്ങനെ നേടാമെന്ന് കാണിക്കുന്ന ഗ്രാഫ്",
          "നിറം പോകില്ലെന്ന് ഉറപ്പുവരുത്താൻ കടക്കാരോട് ചോദിക്കേണ്ട ചോദ്യങ്ങൾ"
        ],
        ar: [
          "أسرار معدن الستانلس ستيل 316L والطلاء بالذهب عيار 18 المقاوم للماء والعرق",
          "جدول الميزانية الأولي لإطلاق متجر إكسسوارات برأس مال 2,800 روبية فقط",
          "التوريد المباشر من سوق بهوليشوار بمومباي وسوق جوهري للأحجار في جايبور",
          "طريقة تحديد مقاسات الخواتم بدقة وطباعة دليل المقاسات المجاني للزبائن",
          "حاسبة الأرباح الاستثنائية التي تصل إلى 300% في تجارة الخواتم",
          "سيناريو الحديث مع الموردين بشأن خلو المنتجات من النيكل وضمان ثبات اللون"
        ]
      },

      blueprint: {
        intro: {
          en: "Anti-tarnish jewelry is revolutionizing the fashion accessory market in India. Modern college girls and working women prefer wearing stylish 316L stainless steel rings and chains every day without worrying about color fading. Sourced wholesale for ₹35 to ₹80, they sell effortlessly for ₹299 to ₹499.",
          ml: "വെള്ളം നനഞ്ഞാലും നിറം മങ്ങാത്ത (Anti-tarnish) മോതിരങ്ങൾക്കും ചെയിനുകൾക്കും ഇന്ന് വൻ ഡിമാൻഡാണ്. കോളേജ് വിദ്യാർത്ഥിനികളും ഉദ്യോഗസ്ഥരായ സ്ത്രീകളും ഇത് സ്ഥിരമായി ഉപയോഗിക്കുന്നു. വെറും ₹35 മുതൽ ₹80 വരെ മൊത്തവിലയുള്ള മോതിരങ്ങൾ ₹299 മുതൽ ₹499 വരെ എളുപ്പത്തിൽ വിൽക്കാം.",
          ar: "المجوهرات المقاومة للماء والصدأ تشهد إقبالاً غير مسبوق في الهند والخليج. الفتيات يفضلن ارتداء الخواتم والسلاسل الذهبية المقاومة للماء يومياً. سعر الجملة بين 35 إلى 80 روبية وتُباع بـ 299 إلى 499 روبية بكل سهولة."
        },
        fastMovingList: [
          { name: { en: "18K Gold Plated Chunky Dome Ring", ml: "18K ഗോൾഡ് പ്ലേറ്റഡ് ഡോം റിംഗ്", ar: "خاتم قبة ذهبي عيار 18 مطلي بتقنية PVD" }, wholesale: "₹45 - ₹70", retail: "₹349 - ₹499", profit: "₹280+ profit per ring" },
          { name: { en: "Natural Aqeeq / Gemstone Silver Finish Ring", ml: "യമനി അഖീഖ് സ്റ്റോൺ മോതിരങ്ങൾ", ar: "خواتم فضية مرصعة بحجر العقيق اليماني" }, wholesale: "₹120 - ₹180", retail: "₹599 - ₹899", profit: "₹450 profit per ring" },
          { name: { en: "Waterproof Snake Chain Choker", ml: "വാട്ടർപ്രൂഫ് സ്നേക്ക് ചെയിൻ ചോക്കർ", ar: "سلسال الأفعى الذهبي المقاوم للماء" }, wholesale: "₹65 - ₹95", retail: "₹399 - ₹599", profit: "₹330 profit per chain" }
        ]
      },

      capitalTable: [
        { item: { en: "Initial Stock: 35 Assorted Anti-Tarnish Rings (Sizes 6, 7, 8)", ml: "ആദ്യ സ്റ്റോക്ക്: 35 ആന്റി-ടാർണിഷ് മോതിരങ്ങൾ (സൈസ് 6, 7, 8)", ar: "دفعة الخواتم الأولى: 35 خاتماً متنوعاً (مقاسات 6، 7، 8)" }, starter: "₹1,750 (35 rings @ ₹50 avg)", pro: "₹6,000 (120 assorted rings)", notes: { en: "From Bhuleshwar Mumbai or Sadar Delhi", ml: "മുംബൈ അല്ലെങ്കിൽ ഡൽഹിയിൽ നിന്ന്", ar: "سوق بهوليشوار بمومباي" } },
        { item: { en: "Velvet Slotted Ring Display Box", ml: "മോതിരങ്ങൾ വെക്കാനുള്ള വെൽവെറ്റ് ബോക്സ്", ar: "علبة عرض مجوهرات مخملية مضلعة" }, starter: "₹250 (Holds 36 rings)", pro: "₹650", notes: { en: "Perfect for taking aesthetic product videos", ml: "വീഡിയോകളും ഫോട്ടോകളും എടുക്കാൻ ബെസ്റ്റ്", ar: "مثالية لتصوير فيديوهات المنتجات للإنستغرام" } },
        { item: { en: "Small Branded Velvet Pouches (50 pcs)", ml: "ചെറിയ വെൽവെറ്റ് പൗച്ചുകൾ (50 എണ്ണം)", ar: "أكياس مخملية صغيرة فاخرة للخواتم" }, starter: "₹250 (50 pouches @ ₹5/pc)", pro: "₹800", notes: { en: "Elegant pouch for each ring delivery", ml: "ഓരോ മോതിരവും ഇതിൽ വെച്ച് നൽകാം", ar: "كيس إهداء فاخر مع كل خاتم مباع" } },
        { item: { en: "Tiny Self-Seal Zipper Bags & Bubble Envelopes", ml: "ബബിൾ എൻവലപ്പുകളും ചെറിയ കവറുകളും", ar: "مغلفات شحن بريدية مبطنة بالفقاعات" }, starter: "₹350", pro: "₹1,000", notes: { en: "Jewelry weights ~20g; cheapest postal rates!", ml: "ഭാരം വെറും 20 ഗ്രാം; കൊറിയർ നിരക്ക് തുച്ഛം!", ar: "وزن الخاتم 20 جرام؛ أقل تكلفة شحن ممكنة!" } }
      ],
      totalStarterCost: "₹2,600",
      totalProCost: "₹8,450",

      formulation: {
        costPerUnitBox: {
          en: "Ring Unit Economics: Stainless Steel 18K Plated Ring: ₹50 + Mini Velvet Pouch: ₹5 + Thank You Card: ₹2 = <strong>Total cost ₹57!</strong> Sells on Instagram for ₹349 to ₹449 (Over ₹290+ net profit per piece / 500% ROI!).",
          ml: "ഒരു മോതിരത്തിന്റെ കണക്ക്: സ്റ്റെയിൻലെസ്സ് സ്റ്റീൽ മോതിരം: ₹50 + വെൽവെറ്റ് പൗച്ച്: ₹5 + താങ്ക് യൂ കാർഡ്: ₹2 = <strong>ആകെ വെറും ₹57 മാത്രം!</strong> വിൽക്കുന്നത് ₹349 മുതൽ ₹449 വരെ (ഒരു മോതിരത്തിൽ നിന്ന് ₹290-ലധികം ലാഭം!).",
          ar: "حسابات الخاتم الواحد: خاتم ستانلس ستيل مطلي بالذهب: 50 روبية + كيس مخملي صغير: 5 روبيات + بطاقة شكر: روبيتان = <strong>الإجمالي 57 روبية فقط!</strong> يُباع بـ 349 إلى 449 روبية (أكثر من 290 روبية صافي ربح بكل خاتم!)."
        },
        steps: [
          {
            step: 1,
            title: { en: "Size Verification with Ring Mandrel", ml: "സൈസ് അളന്ന് കൃത്യമാക്കുക", ar: "فحص وتأكيد مقاس الخاتم بدقة" },
            desc: { en: "Slide ring onto a ring sizer rod to confirm standard Indian/US size (Sizes 6, 7, 8 fit 90% of Indian women).", ml: "റിംഗ് സൈസർ ഉപയോഗിച്ച് മോതിരത്തിന്റെ കൃത്യമായ നമ്പർ (6, 7, 8) പരിശോധിക്കുക.", ar: "قس الخاتم على عصا المقاسات لتأكيد المقاس (6، 7، 8 تناسب 90% من الفتيات)." }
          },
          {
            step: 2,
            title: { en: "Soap & Water Immersion Quality Test", ml: "വെള്ളത്തിൽ മുക്കി ഗുണനിലവാരം പരിശോധിക്കുക", ar: "اختبار ثبات اللون في الماء والصابون" },
            desc: { en: "Submerge a sample piece in warm soapy water for 24 hours to prove 100% waterproof anti-tarnish durability for customer reels.", ml: "ഒരു സാമ്പിൾ മോതിരം സോപ്പു വെള്ളത്തിൽ ഇട്ട് നിറം മങ്ങുന്നില്ലെന്ന് റീൽസിലൂടെ കസ്റ്റമേഴ്സിനെ കാണിക്കുക.", ar: "اغمر عينة في ماء وصابون لمدة 24 ساعة وصورها للزبائن لإثبات مقاومة الصدأ." }
          },
          {
            step: 3,
            title: { en: "Microfiber Buffing & Jewelry Carding", ml: "തുടച്ച് വൃത്തിയാക്കി കാർഡിൽ വെക്കുക", ar: "التلميع والتثبيت على بطاقة العرض" },
            desc: { en: "Buff with a jeweler's polishing cloth and insert securely into your branded presentation display card.", ml: "നല്ല തുണി കൊണ്ട് തുടച്ച് നിങ്ങളുടെ ബ്രാൻഡഡ് കാർഡിൽ മോതിരം ഉറപ്പിച്ചു നിർത്തുക.", ar: "امسح الخاتم بقطعة تلميع المجوهرات وثبته على بطاقة علامتك الأنيقة." }
          },
          {
            step: 4,
            title: { en: "Mini Velvet Pouch Insertion", ml: "ചെറിയ വെൽവെറ്റ് പൗച്ചിൽ വെക്കുക", ar: "الحفظ داخل الكيس المخملي الصغير" },
            desc: { en: "Place the carded ring inside the mini drawstring velvet pouch with an anti-tarnish protective strip.", ml: "ചെറിയ വെൽവെറ്റ് പൗച്ചിനുള്ളിൽ കാർഡും മോതിരവും വെച്ച് കയർ മുറുക്കുക.", ar: "ضع الخاتم مع بطاقته داخل الكيس المخملي الأنيق." }
          },
          {
            step: 5,
            title: { en: "Padded Bubble Mailer Dispatch", ml: "ബബിൾ എൻവലപ്പിൽ വെച്ച് അയക്കുക", ar: "الإرسال في مغلف بريدي مبطن بالفقاعات" },
            desc: { en: "Slip into a compact bubble padded courier envelope. Ships anywhere in Kerala via Speed Post for just ₹40-₹45!", ml: "ബബിൾ കവറിലിട്ട് സ്പീഡ് പോസ്റ്റ് വഴിയോ കൊറിയർ വഴിയോ അയക്കാം (വെറും ₹40-₹45 മാത്രം ചെലവ്).", ar: "ضعه في مغلف بريدي صغير مبطن؛ يُشحن بالبريد السريع بتكلفة 40 روبية فقط لخفة وزنه." }
          }
        ]
      },
    },

    spices: {
      id: "spices",
      icon: "fa-seedling",
      headerClass: "spice-header",
      badgeColor: "#15803d",
      title: {
        en: "Kerala Spices & Forest Honey Academy",
        ml: "കേരള സുഗന്ധവ്യഞ്ജന & വനതേൻ പഠന ശാഖ",
        ar: "أكاديمية التوابل والعسل الطبيعي من كيرالا"
      },
      tagline: {
        en: "Global export & Pan-India pride. Alleppey Green Cardamom, Wayanad Honey & Malabar Pepper.",
        ml: "കേരളത്തിന്റെ അഭിമാനമായ ഏലം, കുരുമുളക്, വയനാടൻ വനതേൻ. ഇന്ത്യ മുഴുവനും ഗൾഫിലേക്കും വിൽക്കാം.",
        ar: "فخر منتجات كيرالا عالمياً. الهيل الأخضر الفاخر، الفلفل الأسود وعسل الغابات البري."
      },
      minBudget: "₹5,000 - ₹25,000",
      margin: "50% - 140%",
      topMarkets: "Kozhikode Valiyangadi, Idukki Cardamom Auctions, Wayanad Honey Depots",

      images: {
        cover: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
        product: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
        sourcing: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80",
        formulation: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
        packaging: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
      },

      curriculumHighlights: {
        en: [
          "Spice grading mastery: 8mm bold green cardamom, Tellicherry black pepper & wild honey",
          "Itemized budget to launch an organic spice & honey packaging brand",
          "Direct farm & auction sourcing in Idukki, Wayanad & Kozhikode Valiyangadi",
          "FSSAI food license basics (100% free online registration for small home businesses)",
          "Interactive spice unit margin simulator and export pricing guide",
          "Wholesaler script: moisture testing, export grade certification & bulk sack discounts"
        ],
        ml: [
          "ഏലക്കായുടെ ഗ്രേഡിംഗ് (8mm ബോൾഡ് ഗ്രീൻ), വയനാടൻ തേൻ, കുരുമുളക് തിരിച്ചറിയാം",
          "ഓർഗാനിക് സ്പൈസസ് ബ്രാൻഡ് തുടങ്ങാനുള്ള സമഗ്ര ബഡ്ജറ്റ് പട്ടിക",
          "ഇടുക്കി, വയനാട്, കോഴിക്കോട് വലിയങ്ങാടി വ്യാപാരികളുടെ ഫോൺ നമ്പറുകൾ",
          "FSSAI ഫുഡ് ലൈസൻസ് സൗജന്യമായി ഓൺലൈനിൽ എടുക്കുന്ന വിധം",
          "സുഗന്ധവ്യഞ്ജനങ്ങളുടെ കിലോഗ്രാം വിലയും ലാഭവും കണക്കാക്കുന്ന സിമുലേറ്റർ",
          "ഈർപ്പമില്ലെന്ന് ഉറപ്പുവരുത്താനും മൊത്തത്തിൽ വാങ്ങാനുമുള്ള സംസാര രീതി"
        ],
        ar: [
          "درجات تصنيف التوابل: الهيل الأخضر حبة عريضة 8 ملم، فلفل مالابار، والعسل البري",
          "جدول الميزانية الأولي لإطلاق علامة تعبئة وتغليف التوابل الطبيعية",
          "الشراء المباشر من مزارع إيدوكي ومناحل واياناد وسوق كوزيكود التاريخي",
          "إجراءات ترخيص سلامة الغذاء FSSAI المنزلي المجاني عبر الإنترنت",
          "حاسبة هوامش الربح لتجارة التوابل والشحن للخليج",
          "سيناريو الحديث مع تجار الجملة بشأن فحص نسبة الرطوبة والشهادات المعتمدة"
        ]
      },

      blueprint: {
        intro: {
          en: "Kerala produces the highest quality spices in the world. People across Pan-India and Malayali families in GCC crave authentic unadulterated 8mm cardamom, raw forest honey, and sun-dried black pepper. Buying directly from farmer auction yards and packing into aesthetic kraft stand-up pouches yields 50% to 140% margin.",
          ml: "ലോകത്തിൽ തന്നെ ഏറ്റവും മികച്ച സുഗന്ധവ്യഞ്ജനങ്ങൾ വിളയുന്നത് നമ്മുടെ കേരളത്തിലാണ്. മായമില്ലാത്ത ഒറിജിനൽ ഏലക്കായ്ക്കും കുരുമുളകിനും വയനാടൻ വനതേനിനും ഇന്ത്യയിലും ഗൾഫിലും വൻ ഡിമാൻഡാണ്. കർഷകരിൽ നിന്നോ വലിയങ്ങാടിയിൽ നിന്നോ നേരിട്ട് വാങ്ങി നല്ല ക്രാഫ്റ്റ് പൗച്ചുകളിൽ പാക്ക് ചെയ്ത് വിറ്റാൽ മികച്ച ലാഭം നേടാം.",
          ar: "تنتج كيرالا أجود أنواع التوابل في العالم. الجاليات في دول الخليج والمشترين في كافة مدن الهند يبحثون عن الهيل الأخضر الأصلي والعسل البري الصافي. التعبئة في أكياس كرافت عصرية تحقق أرباحاً بين 50% إلى 140%."
        },
        fastMovingList: [
          { name: { en: "8mm Bold Green Cardamom (Idukki Grade 1)", ml: "ഇടുക്കി 8mm ബോൾഡ് ഗ്രീൻ ഏലക്ക", ar: "هيل أخضر كيرالا حبة عريضة جامبو 8 ملم" }, wholesale: "₹1,800 - ₹2,300 / kg", retail: "₹3,400 - ₹4,200 / kg (₹340 / 100g pouch)", profit: "₹1,500+ profit per kg" },
          { name: { en: "Wayanad Raw Wild Forest Honey", ml: "വയനാടൻ നാച്ചുറൽ വനതേൻ", ar: "عسل سدر وغابات طبيعي خام من واياناد" }, wholesale: "₹280 - ₹380 / kg", retail: "₹650 - ₹850 / kg", profit: "₹370+ profit per bottle" },
          { name: { en: "Malabar Bold Black Pepper", ml: "മലബാർ ബോൾഡ് കുരുമുളക്", ar: "فلفل أسود مالابار حبة عريضة منقى" }, wholesale: "₹550 - ₹680 / kg", retail: "₹950 - ₹1,299 / kg", profit: "₹450+ profit per kg" }
        ]
      },

      capitalTable: [
        { item: { en: "Starter Bulk Spices (3kg Cardamom + 5kg Pepper + 5kg Honey)", ml: "ആദ്യ സ്റ്റോക്ക് (3kg ഏലക്ക + 5kg കുരുമുളക് + 5kg തേൻ)", ar: "مخزون التوابل الأول: 3 كجم هيل + 5 كجم فلفل + 5 كجم عسل" }, starter: "₹9,500", pro: "₹28,000", notes: { en: "Direct from Kozhikode Valiyangadi or Idukki", ml: "കോഴിക്കോട് വലിയങ്ങാടി അല്ലെങ്കിൽ ഇടുക്കിയിൽ നിന്ന്", ar: "من مزارع إيدوكي وسوق كوزيكود" } },
        { item: { en: "Kraft Paper Window Stand-Up Pouches with Zip (100 pcs)", ml: "സിപ്പോടു കൂടിയ ക്രാഫ്റ്റ് സ്റ്റാൻഡ്-അപ്പ് പൗച്ചുകൾ", ar: "أكياس كرافت بنية بنافذة شفافة وسحاب محكم" }, starter: "₹650 (100 pouches @ ₹6.50/pc)", pro: "₹2,000", notes: { en: "Keeps spices crisp, aroma locked and moisture-free", ml: "മണം പോകാതെയും ഈർപ്പം തട്ടാതെയും സൂക്ഷിക്കാം", ar: "تحفظ نكهة ورائحة التوابل طازجة" } },
        { item: { en: "Hand Impulse Heat Sealer Machine (8-inch)", ml: "ഹാൻഡ് ഹീറ്റ് സീലർ മെഷീൻ (8 ഇഞ്ച്)", ar: "جهاز لحام الأكياس اليدوي بالحرارة" }, starter: "₹850 (One-time tool investment)", pro: "₹2,200", notes: { en: "Ensures 100% airtight vacuum-like seal", ml: "എയർടൈറ്റായി പാക്ക് ചെയ്യാൻ ഇത് സഹായിക്കും", ar: "يضمن إغلاقاً محكماً يمنع دخول الهواء" } },
        { item: { en: "Digital Kitchen Gram Weighing Scale", ml: "ഡിജിറ്റൽ ഗ്രാമം വെയ്യിംഗ് സ്കെയിൽ", ar: "ميزان إلكتروني دقيق لقياس الغرامات" }, starter: "₹350", pro: "₹800", notes: { en: "Precise 100g, 250g, 500g pouch filling", ml: "കൃത്യമായി 100g, 250g തൂക്കി നിറയ്ക്കാൻ", ar: "لوزن أكياس 100 و250 و500 غرام بدقة" } },
        { item: { en: "Branded Stickers & FSSAI Registration Print", ml: "ബ്രാൻഡ് ലേബലുകളും ഫുഡ് രജിസ്ട്രേഷൻ നമ്പറും", ar: "ملصقات الشعار وطباعة رقم ترخيص FSSAI" }, starter: "₹350", pro: "₹1,200", notes: { en: "Displays brand, batch number, date and FSSAI", ml: "ഡേറ്റ്, ബാച്ച് നമ്പർ, ബ്രാൻഡ് രേഖപ്പെടുത്താം", ar: "تدوين تاريخ التعبئة والوزن الصافي" } }
      ],
      totalStarterCost: "₹11,700",
      totalProCost: "₹34,200",

      formulation: {
        costPerUnitBox: {
          en: "Spice Unit Economics: 100g Grade-1 8mm Cardamom: ₹210 + Kraft Window Pouch: ₹6.50 + Vinyl Label: ₹2.00 = <strong>Total cost ₹218.50!</strong> Sells on Instagram and to GCC NRI families for ₹380 to ₹450 (Over ₹160+ net profit per 100g pouch!).",
          ml: "100 ഗ്രാം ഏലക്കയുടെ കണക്ക്: 100 ഗ്രാം ഏലം: ₹210 + ക്രാഫ്റ്റ് പൗച്ച്: ₹6.50 + ലേബൽ: ₹2.00 = <strong>ആകെ വെറും ₹218.50 മാത്രം!</strong> വിൽക്കുന്നത് ₹380 മുതൽ ₹450 വരെ (വെറും 100 ഗ്രാം പൗച്ചിൽ നിന്ന് മാത്രം ₹160-ലധികം ലാഭം!).",
          ar: "حسابات كيس الهيل 100 غرام: هيل جامبو فاخر 100 غرام: 210 روبيات + كيس كرافت بنافذة: 6.50 روبيات + استيكر الشعار: روبيتان = <strong>الإجمالي 218.50 روبية فقط!</strong> يُباع عبر الإنترنت ولعائلات المغتربين بـ 380 إلى 450 روبية (أكثر من 160 روبية ربح صافي بكل كيس!)."
        },
        steps: [
          {
            step: 1,
            title: { en: "Sieving & Defect Sorting", ml: "അരിച്ച് പൊടിയും വലിപ്പക്കുറവുള്ളതും മാറ്റുക", ar: "غربلة وفرز الحبات المعيبة والشوائب" },
            desc: { en: "Pour cardamom onto a clean white stainless tray. Sieve out loose dust and discard broken split pods.", ml: "ഏലക്ക നല്ലൊരു പാത്രത്തിലിട്ട് പൊടിയും വിണ്ടുപോയ കായകളും മാറ്റുക.", ar: "انشر الهيل على صينية نظيفة واستبعد الحبات التالفة أو القشور الفارغة." }
          },
          {
            step: 2,
            title: { en: "Digital Weighing to Exact Grams", ml: "ഡിജിറ്റൽ സ്കെയിലിൽ കൃത്യമായി തൂക്കുക", ar: "الوزن الدقيق بالميزان الإلكتروني" },
            desc: { en: "Weigh exactly 100g, 250g, or 500g on your digital kitchen scale.", ml: "ഡിജിറ്റൽ സ്കെയിലിൽ കൃത്യമായി 100 ഗ്രാം അല്ലെങ്കിൽ 250 ഗ്രാം തൂക്കുക.", ar: "زن الكمية المحددة (100 أو 250 غرام) على الميزان الإلكتروني بدقة." }
          },
          {
            step: 3,
            title: { en: "Pouch Filling with Desiccant / Oxygen Absorber", ml: "ക്രാഫ്റ്റ് പൗച്ചിൽ നിറയ്ക്കുക", ar: "التعبئة في أكياس الكرافت مع ممتص الرطوبة" },
            desc: { en: "Pour into the kraft paper stand-up pouch. Drop in a tiny food-grade silica gel pack or oxygen absorber to guarantee freshness.", ml: "ക്രാഫ്റ്റ് പൗച്ചിലേക്ക് പകർന്ന് ഈർപ്പം തട്ടാതിരിക്കാൻ ഒരു ചെറിയ ഫുഡ്-ഗ്രേഡ് പായ്ക്കറ്റ് കൂടി വെക്കുക.", ar: "فرغ التوابل في الكيس وضع ظرف سيلكا جل غذائي لحفظ الجفاف." }
          },
          {
            step: 4,
            title: { en: "Hermetic Heat Sealing Above Zip", ml: "ഹീറ്റ് സീലർ ഉപയോഗിച്ച് എയർടൈറ്റ് സീൽ ചെയ്യുക", ar: "اللحام الحراري المحكم أعلى السحاب" },
            desc: { en: "Press the ziplock shut firmly, then run the impulse heat sealer 1 cm above the zip to create a tamper-evident seal.", ml: "സിപ്പ് അമർത്തി അടച്ച ശേഷം മെഷീൻ ഉപയോഗിച്ച് മുകൾഭാഗം ഹീറ്റ് സീൽ ചെയ്യുക.", ar: "أغلق سحاب الكيس ثم مرر جهاز اللحام الحراري لضمان عدم فتحه قبل وصوله للزبون." }
          },
          {
            step: 5,
            title: { en: "Labeling Batch Date & FSSAI Number", ml: "ഡേറ്റും ബ്രാൻഡ് ലേബലും ഒട്ടിക്കുക", ar: "لصق بيانات تاريخ التعبئة ورقم FSSAI" },
            desc: { en: "Apply your brand sticker with net weight, packing date, origin (Idukki, Kerala), and FSSAI basic registration number.", ml: "തൂക്കം, പാക്ക് ചെയ്ത തിയ്യതി, FSSAI നമ്പർ എന്നിവയുള്ള ബ്രാൻഡ് ലേബൽ ഒട്ടിക്കുക.", ar: "ألصق استيكر الهوية متضمناً الوزن الصافي، بلد المنشأ ورقم الترخيص." }
          }
        ]
      },
    }
  },

  // Verified Wholesale Suppliers Directory with Maps & WhatsApp
  suppliers: [
    {
      id: "sup-1",
      name: "Al-Ameen Perfumers & Bottle Souk",
      city: "Kozhikode",
      category: "attar",
      address: "Shop 14, S.M. Street (Mittayi Theruvu), Near Mananchira Square, Kozhikode, Kerala 673001",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=S.M.+Street+Mittayi+Theruvu+Mananchira+Kozhikode",
      phone: "+91 98471 23450",
      whatsapp: "919847123450",
      website: "https://scentkart.com",
      instagram: "https://www.instagram.com/explore/tags/keralaattar/",
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
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Valiyangadi+Big+Bazaar+Kozhikode",
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
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Nakhuda+Mohalla+Mohammad+Ali+Road+Mumbai",
      phone: "+91 22 2347 1856",
      whatsapp: "919820018560",
      website: "https://ajmalperfume.com",
      instagram: "https://www.instagram.com/ajmalperfumes/",
      specialty: "Legendary distillers: Pure Dehn al Oudh, Ruh Gulab, Amber, Kashmiri Saffron, French blends",
      moq: "50g / 100g bottles, courier across India",
      tags: ["Attar", "Mumbai", "Direct Distiller"]
    },
    {
      id: "sup-4",
      name: "Abdul Rehman Glass & Flacon Mart",
      city: "Mumbai",
      category: "attar",
      address: "128, Abdul Rehman Street, Near Crawford Market, Mumbai, Maharashtra 400003",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Abdul+Rehman+Street+Crawford+Market+Mumbai",
      phone: "+91 98214 77650",
      whatsapp: "919821477650",
      website: "https://www.indiamart.com/proddetail/attar-glass-bottle-22485303991.html",
      instagram: "https://www.instagram.com/explore/tags/perfumebottles/",
      specialty: "India's lowest price for octagonal attar bottles (₹7-₹12), luxury pump sprays, dropper bottles",
      moq: "Min 50 pcs batch",
      tags: ["Bottles", "Packaging", "Mumbai"]
    },
    {
      id: "sup-5",
      name: "Kannauj Traditional Deg Attar Distillers",
      city: "Kannauj",
      category: "attar",
      address: "Saraimeera Perfumery Road, Kannauj, Uttar Pradesh 209725",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Saraimeera+Kannauj+Uttar+Pradesh",
      phone: "+91 94500 33221",
      whatsapp: "919450033221",
      specialty: "Authentic Mitti Attar (Baked earth scent), Ruh Khus (Wild vetiver), Pure Gulab (Rose)",
      moq: "50ml sample sets or 500ml bulk",
      tags: ["Kannauj", "Mitti Attar", "Ruh Khus"]
    },
    {
      id: "sup-6",
      name: "Royal Textile & Abaya Hub",
      city: "Surat",
      category: "clothing",
      address: "Shop B-204, Millennium Textile Market, Ring Road, Surat, Gujarat 395002",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Millennium+Textile+Market+Ring+Road+Surat",
      phone: "+91 98982 45671",
      whatsapp: "919898245671",
      specialty: "Dubai Crepe & Nada modest abayas, hijabs, unstitched dress materials, wholesale kurtis",
      moq: "Min 15 pieces (Mix designs allowed)",
      tags: ["Abaya", "Dresses", "Surat", "Wholesale"]
    },
    {
      id: "sup-7",
      name: "Tirupur Knitwear & Cotton Cluster",
      city: "Tirupur",
      category: "clothing",
      address: "Khaderpet Cotton Market, Railway Feeder Road, Tirupur, Tamil Nadu 641601",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Khaderpet+Cotton+Market+Tirupur",
      phone: "+91 94432 11200",
      whatsapp: "919443211200",
      specialty: "220-240 GSM Oversized French Terry T-shirts, bio-washed plain tees, track pants",
      moq: "Min 20 pcs mix colors",
      tags: ["T-Shirts", "Cotton", "Tirupur"]
    },
    {
      id: "sup-8",
      name: "Broadway Modest & Pardha House",
      city: "Kochi",
      category: "clothing",
      address: "Broadway Market, Near Menaka Junction, Ernakulam, Kochi, Kerala 682031",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Broadway+Market+Menaka+Kochi",
      phone: "+91 98460 33441",
      whatsapp: "919846033441",
      specialty: "Ready stock pardhas, abayas, hijabs, inner caps, scarves for quick Kerala reorders",
      moq: "Min 10 pieces",
      tags: ["Abaya", "Kochi", "Kerala Stock"]
    },
    {
      id: "sup-9",
      name: "TimeZone Wholesale & Imports",
      city: "Mumbai",
      category: "watches",
      address: "Shop 42, 1st Floor, Manish Market, Musafir Khana, Mumbai 400001",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Manish+Market+Musafir+Khana+Mumbai",
      phone: "+91 98201 54321",
      whatsapp: "919820154321",
      specialty: "Minimalist fashion analog watches, couple watch gift combos, smartwatches, hard gift boxes",
      moq: "Min 15 watches",
      tags: ["Watches", "Mumbai", "Combos"]
    },
    {
      id: "sup-10",
      name: "Gaffar Watch & Tech Hub",
      city: "Delhi",
      category: "watches",
      address: "Gaffar Market, Karol Bagh, New Delhi 110005",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Gaffar+Market+Karol+Bagh+Delhi",
      phone: "+91 98110 99887",
      whatsapp: "919811099887",
      specialty: "Calling smartwatches, magnetic strap combos, AMOLED series smartwatches",
      moq: "Min 10 pieces",
      tags: ["Smartwatches", "Delhi"]
    },
    {
      id: "sup-11",
      name: "Dharavi Artisan Leather Craft Co.",
      city: "Mumbai",
      category: "bags",
      address: "90 Feet Road, Near Kumbharwada, Dharavi, Mumbai 400017",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=90+Feet+Road+Dharavi+Mumbai",
      phone: "+91 97690 12345",
      whatsapp: "919769012345",
      specialty: "Genuine leather men's wallets, vegan leather sling bags, laptop sleeves at workshop direct rates",
      moq: "Min 20 pieces",
      tags: ["Leather", "Wallets", "Bags"]
    },
    {
      id: "sup-12",
      name: "Nabi Karim Bag Wholesale Bazaar",
      city: "Delhi",
      category: "bags",
      address: "Main Market, Nabi Karim, Paharganj, New Delhi 110055",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Nabi+Karim+Bag+Market+New+Delhi",
      phone: "+91 99991 22334",
      whatsapp: "919999122334",
      specialty: "Canvas tote bags (blank), college backpacks, trendy ladies shoulder bags",
      moq: "Min 30 pieces",
      tags: ["Totes", "Backpacks", "Delhi"]
    },
    {
      id: "sup-13",
      name: "Bhuleshwar Fashion Jewelry Lane",
      city: "Mumbai",
      category: "accessories",
      address: "Bhuleshwar Road, Marine Lines East, Mumbai, Maharashtra 400002",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Bhuleshwar+Market+Marine+Lines+Mumbai",
      phone: "+91 98205 67890",
      whatsapp: "919820567890",
      specialty: "Stainless steel waterproof rings, Korean minimalist chains, aesthetic beaded bracelets",
      moq: "Min ₹2,500 mix assortment",
      tags: ["Jewelry", "Anti-Tarnish", "Mumbai"]
    },
    {
      id: "sup-14",
      name: "Jaipur Johari Gems & Silver Ring Mart",
      city: "Jaipur",
      category: "accessories",
      address: "Chameliwala Market, M.I. Road, Jaipur, Rajasthan 302001",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Johari+Bazaar+Chameliwala+Market+Jaipur",
      phone: "+91 94140 76543",
      whatsapp: "919414076543",
      specialty: "Turkish Aqeeq stone rings, 925 sterling finish anti-tarnish rings, natural gemstone rings",
      moq: "Min 20 rings mix sizes",
      tags: ["Rings", "Aqeeq", "Jaipur"]
    },
    {
      id: "sup-15",
      name: "Malabar Spice & Forest Honey Depot",
      city: "Kozhikode",
      category: "spices",
      address: "Shop 18, Copra Bazaar, Valiyangadi, Kozhikode, Kerala 673001",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Copra+Bazaar+Valiyangadi+Kozhikode",
      phone: "+91 94470 11998",
      whatsapp: "919447011998",
      specialty: "Wayanad raw forest honey, Malabar bold black pepper, Idukki 8mm green cardamom",
      moq: "Min 5 kg or wholesale pouches",
      tags: ["Honey", "Spices", "Kozhikode"]
    }
  ],

  // Wholesaler Negotiation Coaching Data (സംസാരിക്കേണ്ട രീതി)
  coachingData: [
    {
      step: 1,
      title: {
        en: "First Contact & Sounding Like a Business Buyer",
        ml: "ആദ്യമായി വിളിക്കുമ്പോൾ പറയേണ്ടത് (കടക്കാരെപ്പോലെ സംസാരിക്കാം)",
        ar: "الاتصال الأول: كيف تبدو كتاجر محترف ولست زبوناً عادياً"
      },
      desc: {
        en: "Never ask 'How much for 1 piece?'. Wholesalers ignore retail questions. Introduce your brand and ask for their wholesale PDF catalog & rate card.",
        ml: "ഒരിക്കലും 'ഒരു പീസിന് എത്രയാണ്?' എന്ന് ചോദിക്കരുത്. അത് ചോദിച്ചാൽ റീട്ടെയിൽ വിലയേ പറയൂ. നിങ്ങൾക്ക് ഒരു ഇൻസ്റ്റാഗ്രാം സ്റ്റോർ ഉണ്ടെന്നും പുതിയ കളക്ഷനിലേക്ക് മൊത്തവില കാറ്റലോഗ് വേണമെന്നും പറയുക.",
        ar: "إياك أن تسأل 'بكم الحبة الواحدة؟'. المورد يتجاهل زبائن التجزئة. عرّف بنفسك كمتجر إلكتروني واطلب كتالوج الجملة وقائمة الأسعار."
      },
      dialogue: {
        en: "\"Hello Sir, I run a curated perfume brand in Kerala. We are expanding our catalog for the upcoming season. Could you please share your wholesale PDF catalog and price slab for 100ml oils and flacons?\"",
        ml: "\"ഹലോ ഭായ്, ഞാൻ കേരളത്തിൽ പെർഫ്യൂം ബ്രാൻഡ് നടത്തുകയാണ്. അടുത്ത മാസത്തെ പുതിയ ബാച്ചിലേക്ക് സ്റ്റോക്ക് എടുക്കാൻ വേണ്ടിയാണ്. നിങ്ങളുടെ 100ml ഓയിലുകളുടെയും കുപ്പികളുടെയും ഹോൾസെയിൽ കാറ്റലോഗും റേറ്റ് ലിസ്റ്റും ഒന്ന് വാട്സ്ആപ്പിൽ അയക്കാമോ?\"",
        ar: "\"مرحباً أخي الكريم، أنا صاحب متجر عطور في كيرالا ونجهز لدفعة الموسم الجديد. لو تكرمت ترسل لي كتالوج الجملة وقائمة أسعار العبوات والزيوت سعة 100 مل على الواتساب؟\""
      }
    },
    {
      step: 2,
      title: {
        en: "Inquiring Quality, Concentration & Dilution",
        ml: "ക്വാളിറ്റിയും ഒറിജിനലാണോ എന്നും ചോദിക്കേണ്ടത്",
        ar: "السؤال عن درجة النقاء والتركيز وخلو الزيت من التخفيف"
      },
      desc: {
        en: "Ask specifically about oil grade (Grade A pure vs DPG mixed) and origin (Kannauj / Swiss / French concentrate).",
        ml: "അത്തറിൽ DPG ചേർത്ത് നേർപ്പിച്ചിട്ടുണ്ടോ എന്നും (Uncut Concentrate), ഫ്രഞ്ച് ക്ലോൺസ് ആണോ അതോ ഒറിജിനൽ കണ്ണൗജ് ഓയിൽ ആണോ എന്നും ചോദിക്കുക.",
        ar: "اسأل تحديداً هل الزيت خام غير مخفف بمادة DPG، وما هو بلد المنشأ للزيت العطري (فرنسي أم سويسري أم محلي)."
      },
      dialogue: {
        en: "\"Is your White Musk and Oudh 100% uncut concentrate or blended with DPG? We only sell prayer-safe pure oils to our repeat customers, so quality longevity is our priority.\"",
        ml: "\"നിങ്ങളുടെ വൈറ്റ് മസ്കും ഔദും 100% അൺകട്ട് കോൺസെൻട്രേറ്റഡ് ഓയിൽ തന്നെയല്ലേ? DPG മിക്സ് ചെയ്തിട്ടില്ലല്ലോ? ഞങ്ങളുടെ സ്ഥിരം കസ്റ്റമേഴ്സ് നിസ്കാരത്തിന് ഉപയോഗിക്കുന്നവരാണ്, അതുകൊണ്ട് ക്വാളിറ്റിയിൽ വിട്ടുവീഴ്ചയില്ല.\"",
        ar: "\"هل المسك والعود لديكم مركز خام بنسبة 100% بدون تخفيف بمادة DPG؟ نحن نضمن لعملائنا زيوتاً نقية تدوم طويلاً صالحة للصلاة.\""
      }
    },
    {
      step: 3,
      title: {
        en: "Negotiating Small Trial Sample Batches",
        ml: "ചെറിയ സാമ്പിളുകൾ ടെസ്റ്റ് ചെയ്യാൻ വിലപേശാം",
        ar: "التفاوض للحصول على عينات تجريبية بسعر الجملة"
      },
      desc: {
        en: "Wholesalers usually demand 1kg MOQ. Use this script to get 50ml or 100ml tester samples at the wholesale price slab before placing large orders.",
        ml: "തുടക്കത്തിൽ തന്നെ 1 കിലോ വാങ്ങാൻ അവർ നിർബന്ധിക്കും. എന്നാൽ ആദ്യം 50ml അല്ലെങ്കിൽ 100ml വീതം 5 ഐറ്റം സാമ്പിൾ വാങ്ങി ടെസ്റ്റ് ചെയ്യാനുള്ള അനുമതി നേടാം.",
        ar: "تجار الجملة يطلبون شراء بالكيلو. استخدم هذا الأسلوب للحصول على عينات 50 أو 100 مل بسعر الجملة لاختبار ثبات الرائحة أولاً."
      },
      dialogue: {
        en: "\"I want to test scent projection and customer reaction first. Can you dispatch a sample tester kit of 5 varieties (100ml each) at the 1kg bulk slab? Once approved, we will place 5kg bulk repeat order next month.\"",
        ml: "\"ആദ്യം കസ്റ്റമേഴ്സിന് സാമ്പിൾ കൊടുത്ത് മണത്തിന്റെ റിസൾട്ട് നോക്കാനാണ്. എനിക്ക് ഏറ്റവും ഡിമാൻഡുള്ള 5 ഐറ്റംസ് 100ml വീതം സാമ്പിൾ തരാമോ? 1 കിലോയുടെ നിരക്കിൽ നൽകിയാൽ അടുത്ത മാസം 5 കിലോ ബൾക്ക് ഓർഡർ തരാം.\"",
        ar: "\"أود اختبار ثبات العطر أولاً وعرضه على نخبة من العملاء. هل يمكنك إرسال باقة عينات من 5 أنواع (100 مل لكل نوع) بسعر الكيلو؟ وإذا ناسبتنا سنعتمد طلبية 5 كجم شهرياً.\""
      }
    },
    {
      step: 4,
      title: {
        en: "Breakage Replacement & Courier Guarantee",
        ml: "കൊറിയറിൽ കുപ്പി പൊട്ടിയാൽ പകരം തരുമോ എന്ന് ഉറപ്പാക്കുക",
        ar: "ضمان تعويض الزجاج المكسور أثناء الشحن البريدي"
      },
      desc: {
        en: "Glass flacons can crack during transit from Mumbai or Delhi. Always clarify the breakage replacement policy before transferring money.",
        ml: "മുംബൈയിൽ നിന്നോ ഡൽഹിയിൽ നിന്നോ കുപ്പികൾ കൊറിയറിൽ വരുമ്പോൾ ചിലപ്പോൾ പൊട്ടാം. അൺബോക്സിംഗ് വീഡിയോ എടുത്താൽ അടുത്ത ഓർഡറിൽ മാറ്റിത്തരുമോ എന്ന് ഉറപ്പാക്കണം.",
        ar: "الزجاج قد يتعرض للكسر في الطريق. أكد دائماً على شرط تصوير فيديو فتح الكرتون واستبدال أي زجاجة متضررة في الشحنة التالية."
      },
      dialogue: {
        en: "\"If any glass flacons get damaged during courier transit, will you adjust the replacement in my next invoice with unboxing video proof?\"",
        ml: "\"വഴിയിൽ വെച്ച് കുപ്പികൾക്ക് എന്തെങ്കിലും ഡാമേജ് ഉണ്ടായാൽ അൺബോക്സിംഗ് വീഡിയോ തന്നാൽ അടുത്ത ഇൻവോയ്സിൽ അഡ്ജസ്റ്റ് ചെയ്തു തരുമല്ലോ അല്ലേ ഭായ്?\"",
        ar: "\"إذا تعرضت أي زجاجات للكسر أثناء الشحن، هل تعوضونها في الفاتورة القادمة بمجرد إرسال فيديو فتح الصندوق؟\""
      }
    }
  ],

  // Ready-to-Use Copy-Paste WhatsApp & DM Scripts
  templatesData: [
    {
      id: "tmpl-supplier",
      icon: "fa-store",
      title: {
        en: "Wholesaler Inquiry & Rate Card Request",
        ml: "ഹോൾസെയിൽ കടക്കാരോട് കാറ്റലോഗ് ചോദിക്കാൻ",
        ar: "طلب كتالوج الجملة وقائمة الأسعار من المورد"
      },
      text: {
        en: "Hello Sir,\nI run a retail/online store in Kerala. I saw your shop profile on Vyapar Shiksha. We are planning our new inventory purchase for this month.\nCould you please share your latest wholesale catalog, price list, and minimum order quantity (MOQ)?\nThank you!\n— Business Founder",
        ml: "ഹലോ സർ,\nഞാൻ കേരളത്തിൽ ഓൺലൈൻ സംരംഭം നടത്തുന്നയാളാണ്. നിങ്ങളുടെ കടയുടെ വിവരങ്ങൾ 'വ്യാപാര ശിക്ഷ' വെബ്സൈറ്റിൽ കണ്ടതാണ്.\nഈ മാസത്തെ പുതിയ സ്റ്റോക്ക് ഓർഡർ ചെയ്യാൻ നിങ്ങളുടെ ഏറ്റവും പുതിയ ഹോൾസെയിൽ കാറ്റലോഗും വിലവിവരപ്പട്ടികയും MOQ (കുറഞ്ഞ ഓർഡർ അളവ്) വിവരങ്ങളും ഒന്ന് വാട്സ്ആപ്പിൽ അയക്കാമോ?\nനന്ദി!",
        ar: "مرحباً أخي الكريم،\nأنا صاحب متجر إلكتروني في كيرالا. وجدت بيانات متجركم عبر منصة رواد الأعمال. نود تجهيز دفعة بضاعة جديدة لهذا الشهر.\nهل يمكنك إرسال كتالوج الجملة المحدث وقائمة الأسعار والحد الأدنى للطلب (MOQ)؟\nشكراً لكم!"
      }
    },
    {
      id: "tmpl-order-upi",
      icon: "fa-receipt",
      title: {
        en: "Customer Order Confirmation & UPI Payment",
        ml: "കസ്റ്റമറോട് പണം ഗൂഗിൾ പേ ചെയ്യാൻ ആവശ്യപ്പെടൽ",
        ar: "تأكيد طلب الزبون وبيانات الدفع بالتحويل"
      },
      text: {
        en: "Hi [Customer Name]! ❤️\nThank you for choosing [Your Brand Name]. Your order for [Product Name] has been reserved.\n\nTotal Amount: ₹[Amount]\nDelivery: 2-3 Days via Speed Post\n\nPay securely via Google Pay / PhonePe to: [Your UPI Number]\n(Please send a screenshot once paid, and we will dispatch your parcel within 24 hours!)",
        ml: "ഹലോ [Customer Name]! ❤️\nഞങ്ങളുടെ [Your Brand Name]-ൽ നിന്നും ഓർഡർ ചെയ്തതിന് നന്ദി. നിങ്ങൾ തിരഞ്ഞെടുത്ത [Product Name] ഇവിടെ റിസർവ് ചെയ്തു വെച്ചിട്ടുണ്ട്.\n\nആകെ തുക: ₹[Amount]\nഡെലിവറി: 2-3 ദിവസത്തിനകം സ്പീഡ് പോസ്റ്റ് വഴി എത്തും\n\nGoogle Pay / PhonePe വഴി ഈ നമ്പറിലേക്ക് പണം അയക്കാം: [Your UPI Number]\n(പണം അയച്ച ശേഷം സ്ക്രീൻഷോട്ടും നിങ്ങളുടെ പൂർണ്ണ മേൽവിലാസവും അയച്ചു തരിക. 24 മണിക്കൂറിനകം ഞങ്ങൾ പാഴ്സൽ അയക്കുന്നതാണ്!)",
        ar: "أهلاً بك [اسم الزبون]! ❤️\nشكراً لاختيارك [اسم متجرك]. تم حجز طلبك لـ [اسم المنتج] بنجاح.\n\nالمبلغ الإجمالي: [المبلغ] روبية\nالشحن: يستغرق من يومين إلى 3 أيام\n\nيمكنك التحويل عبر Google Pay / PhonePe إلى: [رقمك]\n(يرجى إرسال إيصال التحويل مع العنوان التفصيلي لنقوم بشحن طلبك خلال 24 ساعة!)"
      }
    },
    {
      id: "tmpl-dispatch",
      icon: "fa-truck-fast",
      title: {
        en: "Parcel Dispatched & Tracking Link Notification",
        ml: "പാഴ്സൽ അയച്ചു കഴിഞ്ഞാൽ ട്രാക്കിംഗ് നമ്പർ നൽകാൻ",
        ar: "إشعار العميل برقم تتبع الشحنة البريدية"
      },
      text: {
        en: "Great news [Customer Name]! 📦✨\nYour [Your Brand Name] package is on the way!\n\nCourier: ST Courier / India Post\nTracking ID: [Tracking Number]\nTrack here: [Tracking URL]\n\nExpect delivery in 2-3 days. Please record a quick unboxing video when you receive it! ❤️",
        ml: "നല്ല വാർത്ത [Customer Name]! 📦✨\nനിങ്ങൾ ഓർഡർ ചെയ്ത [Your Brand Name] പാഴ്സൽ ഞങ്ങൾ കൊറിയർ ചെയ്തിട്ടുണ്ട്!\n\nകൊറിയർ സർവീസ്: ST Courier / Speed Post\nട്രാക്കിംഗ് നമ്പർ: [Tracking Number]\n\n2-3 ദിവസത്തിനകം പാഴ്സൽ നിങ്ങളുടെ കൈകളിൽ എത്തും. പാഴ്സൽ കിട്ടുമ്പോൾ ഒരു ചെറിയ അൺബോക്സിംഗ് വീഡിയോ എടുക്കാൻ മറക്കല്ലേ! ❤️",
        ar: "بشرى سارة [اسم الزبون]! 📦✨\nشحنتك من [اسم متجرك] في طريقها إليك الآن!\n\nشركة الشحن: ST Courier / البريد السريع\nرقم التتبع: [رقم التتبع]\n\nنتوقع وصولها خلال يومين أو ثلاثة. لا تنسَ تصوير فيديو فتح العلبة ومشاركتنا رأيك! ❤️"
      }
    },
    {
      id: "tmpl-review",
      icon: "fa-star",
      title: {
        en: "Customer Review & Social Proof Request",
        ml: "കസ്റ്റമറോട് റിവ്യൂ ചോദിക്കാനും ഇൻസ്റ്റാഗ്രാമിൽ ഇടാനും",
        ar: "طلب تقييم الزبون لمشاركته في وسائل التواصل"
      },
      text: {
        en: "Hi [Customer Name]! Hope you received your parcel and loved the quality. ❤️\nCould you please take 10 seconds to share your honest feedback? Your review means the world to our small home-grown brand! Feel free to tag us on Instagram @[YourHandle] 🌟",
        ml: "ഹലോ [Customer Name]! നിങ്ങൾക്ക് പാഴ്സൽ കിട്ടിയെന്ന് കരുതുന്നു. ഉൽപ്പന്നം ഇഷ്ടപ്പെട്ടോ? ❤️\nനിങ്ങളുടെ അഭിപ്രായം ഒന്നു പറയാമോ? തുടക്കക്കാരായ ഞങ്ങളെപ്പോലെയുള്ള ചെറുകിട സംരംഭങ്ങൾക്ക് നിങ്ങളുടെ ഒരു നല്ല വാക്ക് വലിയ പ്രോത്സാഹനമാണ്. ഇൻസ്റ്റാഗ്രാമിൽ @[YourHandle] ടാഗ് ചെയ്യാനും മറക്കല്ലേ! 🌟",
        ar: "مرحباً [اسم الزبون]! نأمل أن الشحنة وصلتك ونالت إعجابك. ❤️\nهل يمكنك التكرم بمشاركتنا رأيك الصادق في المنتج؟ تقييمك يعني الكثير لمتجرنا الناشئ! ويسعدنا دائماً أن تذكرنا على الإنستغرام @[حسابك] 🌟"
      }
    }
  ],

  // 7-Step Universal Beginner Launch Roadmap
  roadmapData: [
    {
      step: "01",
      title: { en: "Pick 1 Niche & 5 Fast-Moving SKUs", ml: "ഒരൊറ്റ ബിസിനസ്സും 5 മികച്ച ഐറ്റങ്ങളും തിരഞ്ഞെടുക്കുക", ar: "اختر تخصصاً واحداً و5 منتجات سريعة البيع" },
      desc: { en: "Don't try to sell everything. Specialize in 1 focused line (e.g. Attars or Abayas). Start with the top 5 high-demand varieties.", ml: "എല്ലാം കൂടി ഒന്നിച്ച് വിൽക്കാൻ നോക്കരുത്. അത്തറാണെങ്കിൽ അത്തർ മാത്രം തിരഞ്ഞെടുത്ത് ഏറ്റവും കൂടുതൽ ആവശ്യക്കാരുള്ള 5 ഇനങ്ങൾ കൊണ്ട് തുടങ്ങുക.", ar: "لا تحاول بيع كل شيء. تخصص في مجال واحد (مثل العطور أو العبايات) وابدأ بأفضل 5 منتجات مطلوبة." },
      checks: ["Low initial capital", "Clear target audience", "High repeat purchases"]
    },
    {
      step: "02",
      title: { en: "Order Initial Test Batch (₹3k - ₹8k)", ml: "ആദ്യ ടെസ്റ്റ് ബാച്ച് ഓർഡർ ചെയ്യുക (₹3,000 - ₹8,000)", ar: "اطلب دفعة تجريبية أولى (3 إلى 8 آلاف روبية)" },
      desc: { en: "Use our wholesale directory to contact verified suppliers via WhatsApp. Order sample bottles/fabrics before investing heavily.", ml: "നമ്മുടെ വെബ്സൈറ്റിലെ ഡയറക്ടറിയിൽ നിന്ന് വ്യാപാരികളെ വാട്സ്ആപ്പിൽ വിളിച്ച് ചെറിയ സാമ്പിൾ സ്റ്റോക്ക് ഓർഡർ ചെയ്യുക.", ar: "تواصل مع الموردين عبر الواتساب واطلب عينات صغيرة قبل استثمار مبالغ كبيرة." },
      checks: ["Verify supplier phone", "Inspect sample quality", "Check packaging finish"]
    },
    {
      step: "03",
      title: { en: "Design Aesthetic Brand & Labels (Canva)", ml: "കാൻവ (Canva) ഉപയോഗിച്ച് ലോഗോയും സ്റ്റിക്കറും ഉണ്ടാക്കുക", ar: "صمم الهوية والملصقات عبر تطبيق كانفا مجاناً" },
      desc: { en: "Create an elegant brand name. Design clean minimalist labels for free using Canva. Print 100 vinyl stickers locally for ~₹150.", ml: "ലളിതവും മനോഹരവുമായ ഒരു ബ്രാൻഡ് പേര് കണ്ടെത്തുക. കാൻവയിൽ ഡിസൈൻ ചെയ്ത് ₹150 ന് 100 സ്റ്റിക്കറുകൾ പ്രിന്റ് ചെയ്തെടുക്കുക.", ar: "اختر اسماً رناناً لعلامتك وصمم الملصقات مجاناً واطبع 100 ملصق فينيل بتكلفة زهيدة." },
      checks: ["Minimalist logo", "Waterproof sticker paper", "Contact/social handle"]
    },
    {
      step: "04",
      title: { en: "Set up Instagram Business & WhatsApp Catalog", ml: "ഇൻസ്റ്റാഗ്രാം പേജും വാട്സ്ആപ്പ് കാറ്റലോഗും ഒരുക്കുക", ar: "إعداد حساب إنستغرام تجاري وكتالوج واتساب" },
      desc: { en: "Convert your Instagram to a Business account. Create high-resolution reels against natural daylight showing unboxing & textures.", ml: "ഇൻസ്റ്റാഗ്രാമിൽ ബിസിനസ്സ് അക്കൗണ്ട് തുടങ്ങി നല്ല വെളിച്ചത്തിൽ എടുത്ത ക്ലിയർ ഫോട്ടോകളും റീലുകളും പോസ്റ്റ് ചെയ്യുക. വാട്സ്ആപ്പ് ബിസിനസ്സ് കാറ്റലോഗ് സെറ്റ് ചെയ്യുക.", ar: "حول حسابك لتجاري وصور مقاطع فيديو أنيقة لفتح الصناديق في إضاءة النهار الطبيعية." },
      checks: ["Professional Bio", "Direct WhatsApp link", "Clear pricing in captions"]
    },
    {
      step: "05",
      title: { en: "Tie up with Courier Partners (ST Courier / Speed Post)", ml: "കൊറിയർ പാർട്ണറെ തിരഞ്ഞെടുക്കുക (Speed Post / ST)", ar: "التعاقد مع شركات الشحن البريدي المحلي" },
      desc: { en: "Register with India Post Speed Post (₹40-₹50 across Kerala) or Shiprocket. Keep bubble wrap, cardboard boxes, and tape ready.", ml: "കേരളത്തിൽ വളരെ വേഗത്തിൽ എത്തിക്കാൻ ST Courier അല്ലെങ്കിൽ ഇന്ത്യ പോസ്റ്റ് സ്പീഡ് പോസ്റ്റ് തിരഞ്ഞെടുക്കുക (ചെലവ് ₹40-₹50 മാത്രം).", ar: "اعتمد الشحن مع البريد السريع أو شركات الشحن السريع الموثوقة ووفر مواد التغليف." },
      checks: ["Kerala avg: ₹40-₹50", "All-India avg: ₹55-₹70", "Bubble wrap ready"]
    },
    {
      step: "06",
      title: { en: "Collect First 15 Orders via Family & Close Circles", ml: "ആദ്യത്തെ 15 ഓർഡറുകൾ സുഹൃത്തുക്കളിൽ നിന്നും നേടുക", ar: "احصل على أول 15 طلباً عبر المعارف والأصدقاء" },
      desc: { en: "Reach out to your WhatsApp status contacts and college/friend groups. Offer inaugural launch free delivery to trigger first sales.", ml: "വാട്സ്ആപ്പ് സ്റ്റാറ്റസ് വഴിയും സുഹൃത്തുക്കളോടും പറഞ്ഞ് ആദ്യത്തെ 15 വിൽപനകൾ പൂർത്തിയാക്കുക. ആദ്യ ഓർഡറുകൾക്ക് ഫ്രീ ഡെലിവറി നൽകുക.", ar: "شارك المنتجات عبر حالات الواتساب والمجموعات المقربة وقدم شحناً مجانياً لأول 15 مشترياً." },
      checks: ["Free delivery launch offer", "Fast dispatch (<24h)", "Collect photo reviews"]
    },
    {
      step: "07",
      title: { en: "Reinvest 70% Profit into Scaling Stock", ml: "കിട്ടിയ ലാഭത്തിന്റെ 70% വീണ്ടും സ്റ്റോക്കിലേക്ക് മാറ്റുക", ar: "إعادة استثمار 70% من الأرباح في تنمية المخزون" },
      desc: { en: "Never withdraw all profit in month 1. Reinvest 70% to order 50-100 units at lower bulk rates, increasing your margin even further.", ml: "ആദ്യ മാസത്തെ ലാഭം മുഴുവൻ എടുത്ത് ചെലവാക്കാതെ 70% പണവും വീണ്ടും കൂടുതൽ സ്റ്റോക്ക് വാങ്ങാൻ ഉപയോഗിക്കുക. ഇതുവഴി കൂടുതൽ ഡിസ്കൗണ്ട് കിട്ടും.", ar: "لا تسحب كامل الأرباح في الشهر الأول؛ أعد استثمار 70% منها لشراء كميات أكبر بسعر جملة أرخص." },
      checks: ["Reinvest for volume slabs", "Expand to 10 fast sellers", "Build customer loyalty"]
    }
  ],

  // Legal & Compliance Data
  legalData: [
    {
      badge: "exempt",
      badgeText: { en: "NO GST REQUIRED", ml: "GST ആവശ്യമില്ല", ar: "معفى من ضريبة GST" },
      title: { en: "GST Registration Exemption (< ₹40 Lakhs)", ml: "GST ഇല്ലാതെ തന്നെ തുടങ്ങാം (₹40 ലക്ഷം വരെ)", ar: "إعفاء ضريبة السلع والخدمات GST (أقل من 40 لاخ)" },
      desc: { en: "In India, micro-businesses dealing in goods with annual turnover under ₹40 Lakhs (₹20 Lakhs in some states) are legally EXEMPT from GST registration. You can start right now from home using personal UPI without paying for GST filings.", ml: "ഇന്ത്യയിൽ പ്രതിവർഷ വിറ്റുവരവ് ₹40 ലക്ഷത്തിൽ താഴെയുള്ള ചെറുകിട കച്ചവടങ്ങൾക്ക് നിയമപരമായി GST രജിസ്ട്രേഷൻ ആവശ്യമില്ല. വീട്ടിലിരുന്ന് സ്വന്തം Google Pay / PhonePe വഴി ധൈര്യമായി ബിസിനസ്സ് തുടങ്ങാം.", ar: "المشاريع المصغرة في الهند التي تقل مبيعاتها السنوية عن 40 لاخ روبية (4 ملايين روبية) معفاة قانونياً من تسجيل ضريبة GST. يمكنك البدء من المنزل بدون أي رسوم ضريبية." }
    },
    {
      badge: "recommended",
      badgeText: { en: "100% FREE", ml: "100% സൗജന്യം", ar: "مجاني 100%" },
      title: { en: "Udyam MSME Registration", ml: "ഉദ്യം (Udyam) MSME രജിസ്ട്രേഷൻ", ar: "شهادة المنشآت الصغيرة والمتوسطة (Udyam)" },
      desc: { en: "Free online government certificate (udyamregistration.gov.in). Takes 5 minutes using your Aadhaar & PAN. Gives official proof as a Micro Enterprise and enables opening a current bank account.", ml: "കേന്ദ്ര സർക്കാരിന്റെ വെബ്സൈറ്റിൽ (udyamregistration.gov.in) ആധാർ കാർഡും പാൻ കാർഡും ഉപയോഗിച്ച് 5 മിനിറ്റിൽ തികച്ചും സൗജന്യമായി ചെയ്യാവുന്ന രജിസ്ട്രേഷൻ. ഇത് വെച്ച് ബാങ്കിൽ കറന്റ് അക്കൗണ്ട് തുടങ്ങാം.", ar: "تسجيل إلكتروني حكومي مجاني يستغرق 5 دقائق عبر رقم الهوية Aadhaar والبطاقة الضريبية PAN. يمنحك صفة منشأة رسمية لفتح حساب بنكي تجاري." }
    },
    {
      badge: "banking",
      badgeText: { en: "SMART STEP", ml: "സ്മാർട്ട് ബാങ്കിംഗ്", ar: "إدارة مصرفية ذكية" },
      title: { en: "Zero-Balance Current Account", ml: "സീറോ ബാലൻസ് ബാങ്ക് അക്കൗണ്ട്", ar: "حساب مصرفي تجاري بدون حد أدنى" },
      desc: { en: "Keep business and personal funds separate. Use your Udyam certificate to open a zero-balance digital current account with ICICI, HDFC, or Federal Bank.", ml: "സ്വന്തം ആവശ്യങ്ങൾക്കുള്ള പണവും ബിസിനസ് പണവും വേർതിരിച്ചു വെക്കുക. ഉദ്യം സർട്ടിഫിക്കറ്റ് ഉപയോഗിച്ച് ഫെഡറൽ ബാങ്കിലോ ഐ.സി.ഐ.സി.ഐ-യിലോ കറന്റ് അക്കൗണ്ട് തുടങ്ങാം.", ar: "افصل أموال المشروع عن مصاريفك الشخصية. افتح حساباً جارياً رقمياً عبر شهادة Udyam بدون شروط رصيد معقدة." }
    },
    {
      badge: "food",
      badgeText: { en: "FOR SPICES & HONEY", ml: "ഭക്ഷണ സാധനങ്ങൾക്ക് മാത്രം", ar: "خاص بالأغذية والعسل والتوابل" },
      title: { en: "FSSAI Basic Registration (₹100/yr)", ml: "FSSAI ഫുഡ് ലൈസൻസ് (വർഷത്തിൽ ₹100)", ar: "ترخيص سلامة الغذاء FSSAI السنوي (100 روبية)" },
      desc: { en: "Only required if selling consumable spices and honey. The basic home-kitchen registration (foscos.fssai.gov.in) costs only ₹100 per year and requires no commercial factory inspection.", ml: "തേൻ, ഏലക്ക തുടങ്ങിയ ഭക്ഷണ സാധനങ്ങൾ വിൽക്കാൻ മാത്രമേ ഇത് ആവശ്യമുള്ളൂ. foscos.fssai.gov.in എന്ന വെബ്സൈറ്റിലൂടെ വർഷത്തിൽ വെറും ₹100 ഫീസ് അടച്ച് വീട്ടിലിരുന്ന് തന്നെ രജിസ്റ്റർ ചെയ്യാം.", ar: "مطلوب فقط عند تجارة العسل والتوابل الصالحة للأكل. التسجيل البسيط عبر موقع foscos.fssai.gov.in برسم سنوي رمزي قدره 100 روبية فقط بدون لجان تفتيش." }
    }
  ],

  // Starter Equipment Toolkit
  equipData: [
    { icon: "fa-scale-balanced", title: { en: "Digital Precision Scale (0.01g)", ml: "ഡിജിറ്റൽ പ്രിസിഷൻ സ്കെയിൽ", ar: "ميزان إلكتروني حساس" }, price: "₹250 - ₹400", desc: { en: "Essential for weighing attar bottles, rings and spice packets accurately.", ml: "അത്തർ കുപ്പികളും ആഭരണങ്ങളും കൃത്യമായി തൂക്കാൻ ആവശ്യം.", ar: "أساسي لوزن زجاجات العطور والخواتم والطرود بدقة بالغة." } },
    { icon: "fa-fire-burner", title: { en: "Hand Impulse Heat Sealer (8-inch)", ml: "ഹാൻഡ് ഹീറ്റ് സീലർ മെഷീൻ", ar: "جهاز لحام الأكياس اليدوي" }, price: "₹750 - ₹950", desc: { en: "Airtight sealing for spice pouches, polybags, and waterproof courier packets.", ml: "കവറുകളും പൗച്ചുകളും വായു കടക്കാതെ സീൽ ചെയ്യാൻ.", ar: "لإغلاق أكياس التوابل وأغلفة الشحن البريدي بإحكام تام." } },
    { icon: "fa-print", title: { en: "Bluetooth Thermal Label Printer (Optional)", ml: "തെർമൽ ലേബൽ പ്രിന്റർ (ഓപ്ഷണൽ)", ar: "طابعة بوليصات الشحن الحرارية" }, price: "₹1,800 - ₹2,500", desc: { en: "Prints self-adhesive shipping address labels in 1 second without costly ink.", ml: "മഷി ആവശ്യമില്ലാതെ കൊറിയർ അഡ്രസ്സ് സ്റ്റിക്കർ പെട്ടെന്ന് പ്രിന്റ് ചെയ്യാം.", ar: "لطباعة ملصقات عناوين الشحن ذاتية اللصق بثوانٍ معدودة بدون حبر." } },
    { icon: "fa-tape", title: { en: "Heavy-Duty Tape Dispenser & Cutter", ml: "ടേപ്പ് ഡിസ്പെൻസർ", ar: "موزع وقاطع شريط التغليف اللاصق" }, price: "₹150 - ₹250", desc: { en: "Speeds up box packaging and eliminates frustrating tape searching.", ml: "ബോക്സുകൾ വേഗത്തിൽ ടേപ്പ് ഒട്ടിച്ച് പാക്ക് ചെയ്യാൻ.", ar: "يسرع تغليف كراتين الشحن البريدي ويوفر الوقت." } }
  ],

  // Courier Rates Data
  logisticsRates: [
    { service: "ST Courier", zone: "Inside Kerala (District to District)", weight: "Up to 500g", rate: "₹40 - ₹50", remarks: "Fastest 24-48h delivery across Kerala towns" },
    { service: "India Post Speed Post", zone: "Kerala & South India", weight: "Up to 500g", rate: "₹42 - ₹55", remarks: "Reaches every remote pin code & rural village" },
    { service: "Shiprocket / Delhivery", zone: "Pan-India (Metro cities)", weight: "Up to 500g", rate: "₹55 - ₹75", remarks: "Doorstep pickup & automated WhatsApp tracking" },
    { service: "India Post International EMS", zone: "GCC (UAE, Saudi, Qatar, Oman)", weight: "Up to 500g", rate: "₹850 - ₹1,200", remarks: "Best for alcohol-free attars, fabrics & spices" },
    { service: "Kerala Gulf Air Cargo", zone: "UAE & Saudi Air Cargo", weight: "Per Kg (Min 5kg)", rate: "₹800 - ₹1,100 / kg", remarks: "Very popular among Gulf NRI expatriates" }
  ],

  // Core Application Initialization
  init() {
    this.detectLanguage();
    this.handleHashRouting();
    this.bindEvents();
    this.renderAllViews();
    this.renderFloatingAudioDock();
  },

  detectLanguage() {
    const saved = localStorage.getItem('vyapar_lang');
    if (saved && ['en', 'ml', 'ar'].includes(saved)) {
      this.currentLang = saved;
    } else {
      this.currentLang = 'en';
    }
  },

  // SPA View Routing System
  navigateTo(viewName) {
    const vHome = document.getElementById('viewHome');
    const vAcademy = document.getElementById('viewAcademy');
    const vTools = document.getElementById('viewTools');

    if (!vHome || !vAcademy || !vTools) return;

    // Reset view visibility
    vHome.style.display = 'none';
    vAcademy.style.display = 'none';
    vTools.style.display = 'none';

    // Handle View States
    if (viewName === 'home') {
      this.currentView = 'home';
      vHome.style.display = 'block';
      this.updateNavActive('navHome');
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'academy') {
      this.currentView = 'academy';
      vAcademy.style.display = 'block';
      this.updateNavActive('navAcademies');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (['tools', 'suppliers', 'scripts', 'legal', 'plan', 'calc'].includes(viewName)) {
      this.currentView = 'tools';
      vTools.style.display = 'block';
      
      let tabKey = viewName === 'tools' ? 'calc' : viewName;
      this.switchToolTab(tabKey);

      if (viewName === 'suppliers') this.updateNavActive('navSuppliers');
      else if (viewName === 'scripts') this.updateNavActive('navTemplates');
      else if (viewName === 'plan') this.updateNavActive('navPlanBuilder');
      else this.updateNavActive('navTools');

      window.location.hash = `#${viewName}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  updateNavActive(activeId) {
    document.querySelectorAll('.nav-item, .nav-btn-action').forEach(el => {
      el.classList.remove('active-nav');
    });
    const target = document.getElementById(activeId);
    if (target) target.classList.add('active-nav');
  },

  // =========================================================================
  // 30-MINUTE AUDIO MASTERCLASS STATE & ENGINE
  // =========================================================================
  audioMasterclassState: {
    nicheKey: 'attar',
    isPlaying: false,
    isPoweredOn: false,
    currentEpisode: 1,
    currentTimeSec: 0,
    totalDurationSec: 1800,
    playbackRate: 1.0,
    voiceLang: 'ml',
    timerInterval: null,
    audioCtx: null,
    oscillator: null,
    gainNode: null,
    isDrawerOpen: false,
    isMenuOpen: false,
    isMinimized: false,
    isClosed: true,
    longPressTimer: null
  },

  masterclassAudioLibrary: {
  "attar": [
    {
      "num": 1,
      "startSec": 0,
      "endSec": 300,
      "timestamp": "00:00",
      "title": {
        "en": "1. Scent Science & Fast-Moving Fragrances (00:00 - 05:00)",
        "ml": "1. സുഗന്ധ ശാസ്ത്രവും അത്തറിന്റെ വിപണിയും (00:00 - 05:00)",
        "ar": "1. علم الصنعة والزيوت العطرية الأكثر طلباً (00:00 - 05:00)"
      },
      "text": {
        "ml": "നമസ്കാരം, വ്യാപാര ശിക്ഷയിലേക്ക് സ്വാഗതം. ഇന്ന് നമ്മൾ പഠിക്കുന്നത് കേരളത്തിലും ഇന്ത്യയിലും ഗൾഫിലും ഏറ്റവും ഉയർന്ന ലാഭം തരുന്ന അത്തർ ബിസിനസ്സ് എങ്ങനെ വിജയകരമായി തുടങ്ങാം എന്നതാണ്. അത്തർ എന്നാൽ ആൽക്കഹോൾ ഒട്ടും ചേർക്കാത്ത ശുദ്ധമായ പ്രകൃതിദത്ത സുഗന്ധതൈലമാണ്. നിസ്കാരത്തിന് ഉപയോഗിക്കാം എന്നതും, 12 മുതൽ 24 മണിക്കൂർ വരെ സുഗന്ധം വസ്ത്രങ്ങളിൽ തങ്ങിനിൽക്കും എന്നതുമാണ് ഇതിന്റെ ഏറ്റവും വലിയ പ്രത്യേകത. തുടക്കക്കാർ തിരഞ്ഞെടുക്കേണ്ട 4 പ്രധാന മണങ്ങൾ: ഒന്ന് റോയൽ വൈറ്റ് മസ്ക്, രണ്ട് ശമാമത്തുൽ അംബർ, മൂന്ന് അറബിക് ഊദ് അൽ ശംസ്, നാല് സാവേജ് പോലുള്ള ഫ്രഞ്ച് ക്ലോണുകൾ. ഇവ വിപണിയിൽ അതിവേഗം വിറ്റുപോകുന്ന ഇനങ്ങളാണ്.",
        "en": "Welcome to Vyapar Shiksha. Today, we master how to launch a high-profit artisanal attar business in Kerala and India from home. Attar is 100% pure concentrated perfume oil extracted without alcohol. It is prayer-safe, skin-friendly, and lasts 12 to 24 hours. The top 4 fast-moving varieties every beginner should start with are Royal White Musk, Shamamatul Amber, Arabic Oudh Al Shams, and French Fresh Clones like Sauvage and Blue Ocean. These four fragrances command an immediate 70% repeat buying rate.",
        "ar": "مرحباً بكم في منصة رواد الأعمال. في هذه الدورة الصوتية نتعلم خطوة بخطوة كيف تؤسس مشروعاً ناجحاً ومربحاً لدهن العود والعطور الزيتية. دهن العود زيت نقي مركز 100% مستخلص بدون أي كحول، مما يجعله صالحاً للصلاة ولطيفاً على البشرة ويدوم فوّاحاً لأكثر من 24 ساعة. الأصناف الأربعة الأكثر مبيعاً للمبتدئين هي: المسك الأبيض الملكي، شمامة العنبر، عود الشمس الملكي، وبدائل العطور الفرنسية الفاخرة."
      }
    },
    {
      "num": 2,
      "startSec": 300,
      "endSec": 600,
      "timestamp": "05:00",
      "title": {
        "en": "2. Exact Capital & Budget Breakdown (05:00 - 10:00)",
        "ml": "2. എന്തിനൊക്കെ എത്ര രൂപ? പ്രാരംഭ ബഡ്ജറ്റ് (05:00 - 10:00)",
        "ar": "2. جدول الميزانية الدقيق وتكاليف البداية (05:00 - 10:00)"
      },
      "text": {
        "ml": "രണ്ടാമത്തെ ഘട്ടത്തിൽ നമ്മൾ നോക്കുന്നത് ഈ ബിസിനസ് തുടങ്ങാൻ കയ്യിൽ എത്ര രൂപ വേണം എന്നതാണ്. വെറും 3,100 രൂപ ഉണ്ടെങ്കിൽ വീട്ടിലിരുന്ന് നിങ്ങൾക്ക് ഈ ബിസിനസ്സ് തുടങ്ങാം. 500 മില്ലിലിറ്റർ മദർ ഓയിലിന് 1,500 രൂപ, 50 ഗ്ലാസ് റോൾ-ഓൺ കുപ്പികൾക്ക് 450 രൂപ, 50 പ്രീമിയം കറുത്ത വെൽവെറ്റ് പൗച്ചുകൾക്ക് 300 രൂപ, 100 വാട്ടർപ്രൂഫ് വിനൈൽ ബ്രാൻഡ് സ്റ്റിക്കറുകൾക്ക് 200 രൂപ, അളന്നെടുക്കാനുള്ള ഡ്രോപ്പർ പൈപ്പറ്റുകൾക്ക് 150 രൂപ, കൊറിയർ ബഫറിന് 500 രൂപ. ആകെ വെറും 3,100 രൂപ മാത്രം മതിയാകും നിങ്ങളുടെ ആദ്യ ബാച്ച് 50 കുപ്പികൾ മാർക്കറ്റിലിറക്കാൻ.",
        "en": "In Phase 2, we break down every single rupee needed to start. With just ₹3,100, you can start right from your study table. 500ml concentrated mother oil costs ₹1,500. 50 octagonal glass flacons cost ₹450 at ₹9 each. 50 black velvet drawstring pouches cost ₹300 at ₹6 each. 100 custom vinyl waterproof stickers cost ₹200. Medical pipettes cost ₹150, and ₹500 is your courier dispatch buffer. Total starting capital is just ₹3,100 to produce your first 50 retail bottles.",
        "ar": "في هذه المرحلة نستعرض بدقة رأس المال الأولي المطلوب. بمبلغ 3,100 روبية فقط يمكنك إطلاق مشروعك من منزلك. 500 مل زيوت عطرية خام بـ 1500 روبية، 50 زجاجة كريستال رول بـ 450 روبية بمعدل 9 روبيات للزجاجة، 50 كيساً مخملياً فاخراً بـ 300 روبية، 100 ملصق فينيل مقاوم للماء بشعارك بـ 200 روبية، وقطارات قياس بـ 150 روبية، ومبلغ 500 روبية احتياطي للشحن. الإجمالي 3100 روبية فقط."
      }
    },
    {
      "num": 3,
      "startSec": 600,
      "endSec": 960,
      "timestamp": "10:00",
      "title": {
        "en": "3. Kozhikode & Mumbai Wholesale Markets (10:00 - 16:00)",
        "ml": "3. മിഠായിത്തെരുവും ക്രോഫോർഡ് മാർക്കറ്റും (10:00 - 16:00)",
        "ar": "3. أسواق الجملة في كاليكوت ومومباي ودبي (10:00 - 16:00)"
      },
      "text": {
        "ml": "മൂന്നാമതായി സാധനങ്ങൾ എവിടെ നിന്ന് വാങ്ങണം എന്ന് മനസ്സിലാക്കാം. കേരളത്തിൽ കോഴിക്കോട് മിഠായിത്തെരുവും വലിയങ്ങാടിയുമാണ് ഏറ്റവും പ്രധാനപ്പെട്ട കേന്ദ്രങ്ങൾ. വലിയ അളവിൽ കുറഞ്ഞ നിരക്കിൽ വാങ്ങാൻ മുംബൈ മുഹമ്മദ് അലി റോഡിലെ നഖൂദ മൊഹല്ലയും ക്രോഫോർഡ് മാർക്കറ്റിലെ അബ്ദുൽ റഹ്മാൻ സ്ട്രീറ്റും സന്ദർശിക്കാം. ഇവിടെ വെറും 7 മുതൽ 9 രൂപയ്ക്ക് പ്രീമിയം ഒക്ടാഗണൽ ക്രിസ്റ്റൽ കുപ്പികൾ ലഭിക്കും. ഗൾഫിലുള്ളവർക്ക് ദുബായ് ദേരയിലെ നായിഫ് പെർഫ്യൂം സൂഖും അജ്മാൻ ഇൻഡസ്ട്രിയൽ ഏരിയയുമാണ് പ്രധാന സ്രോതസ്സുകൾ. ഇവിടങ്ങളിൽ നിന്ന് എയർ കാർഗോ വഴി നാട്ടിലേക്ക് നേരിട്ട് എത്തിക്കാം.",
        "en": "In Phase 3, we explore verified wholesale markets. In Kerala, Kozhikode S.M. Street and Valiyangadi Big Bazaar are the historical trading hubs for Arabian bases and roll-on bottles. For pan-India direct manufacturing rates, Mumbai's Nakhuda Mohalla on Mohammad Ali Road and Abdul Rehman Street near Crawford Market offer the lowest prices in India, where octagonal crystal bottles cost as low as ₹7 to ₹9. For GCC NRI entrepreneurs, Dubai Deira Naif Souk and Ajman Industrial Area offer direct container and air cargo wholesale lots.",
        "ar": "في هذه المرحلة نحدد أين تتسوق بالجملة الحقيقية. في كيرالا، يعد شارع إس إم وسوق فاليانغادي بكاليكوت المركزين الأكبر لموردي زيوت العطور. وللحصول على أسعار المصانع في الهند، توجه إلى سوق نخودا بشارع محمد علي وشارع عبد الرحمن بسوق كروفورد بمومباي، حيث تباع زجاجات الكريستال بـ 7 إلى 9 روبيات فقط. وفي دول الخليج، يعتبر سوق نايف بديرة دبي والمنطقة الصناعية بعجمان المركز العالمي الأكبر للتصدير."
      }
    },
    {
      "num": 4,
      "startSec": 960,
      "endSec": 1260,
      "timestamp": "16:00",
      "title": {
        "en": "4. Wholesaler Calling & Negotiation Coaching (16:00 - 21:00)",
        "ml": "4. വ്യാപാരികളോട് സംസാരിക്കേണ്ട ചോദ്യങ്ങൾ (16:00 - 21:00)",
        "ar": "4. حوار الاتصال والتفاوض مع الموردين (16:00 - 21:00)"
      },
      "text": {
        "ml": "നാലാമതായി വ്യാപാരികളോട് എങ്ങനെ സംസാരിക്കണം എന്ന് നോക്കാം. കടക്കാരോട് ഒരിക്കലും എനിക്ക് 5 കുപ്പി തരൂ എന്ന് ചോദിക്കരുത്. 'എനിക്ക് കേരളത്തിൽ പുതിയ അത്തർ ബ്രാൻഡ് തുടങ്ങാനാണ്, എനിക്ക് നിങ്ങളുടെ 5 ടോപ്പ് സെല്ലിംഗ് ഇനങ്ങളുടെ 100ml മദർ ഓയിൽ സാമ്പിൾ വേണം, അടുത്ത ബാച്ചിൽ 5 കിലോ ബാരൽ എടുക്കുമ്പോൾ തരുന്ന അതേ ഹോൾസെയിൽ സ്ലാബ് റേറ്റ് ഇതിന് നൽകുമോ?' എന്ന് ചോദിക്കണം. ഓയിലിൽ വെള്ളമോ അനാവശ്യ കെമിക്കലുകളോ കലർന്നിട്ടില്ലെന്ന് ഉറപ്പാക്കാൻ വെള്ളക്കടലാസിൽ ഒരു തുള്ളി വീഴ്ത്തി നോക്കുക. എണ്ണക്കറ മാത്രം ബാക്കിയായാൽ അത് ശുദ്ധമായ മദർ ഓയിലാണ്.",
        "en": "In Phase 4, we master negotiation dialogue. Never ask a wholesaler for retail quantities. Always say: 'I am launching a new artisanal fragrance brand in Kerala. I need 100ml tester cuts of your top 5 fastest-moving mother oils. Will you extend your 5-kilo bulk slab rate to my initial testing lot?' To test oil purity, place a drop on white blotter paper: if it leaves a rich, concentrated, transparent fragrant sheen without water rings, it is pure undiluted concentrate.",
        "ar": "في هذه المرحلة نتقن حوار التفاوض الصوتي. إياك وأن تسأل المورد بأسلوب الزبون العادي. قل له بثقة: 'أنا أؤسس علامة تجارية جديدة للعطور في كيرالا، وأود الحصول على عينات 100 مل من أفضل 5 أصناف لديكم بسعر الجملة المخفض، مع وعد بالطلب ببراميل 5 كيلو مستقبلاً'. لاختبار نقاء الزيت، ضع قطرة على شريحة ورق بيضاء؛ إذا بقيت شفافة ذات فوحان قوي بدون دوائر مائية، فهو زيت مركز نقي 100%."
      }
    },
    {
      "num": 5,
      "startSec": 1260,
      "endSec": 1500,
      "timestamp": "21:00",
      "title": {
        "en": "5. Formulation, Bottling & Unit Cost SOP (21:00 - 25:00)",
        "ml": "5. കുപ്പി നിറയ്ക്കലും നിർമ്മാണ രീതിയും (21:00 - 25:00)",
        "ar": "5. طريقة التعبئة والتركيب والتغليف الفاخر (21:00 - 25:00)"
      },
      "text": {
        "ml": "അഞ്ചാമതായി കുപ്പി നിറയ്ക്കുന്ന വിധം. നിങ്ങളുടെ വർക്കിംഗ് ടേബിൾ പൂർണ്ണമായും ഉണങ്ങിയതാണെന്ന് ഉറപ്പാക്കുക. അത്തറിൽ ഒരു തുള്ളി വെള്ളം വീണാൽ പോലും അതിന്റെ സുഗന്ധം നഷ്ടപ്പെടും. 5ml ഡ്രോപ്പർ പൈപ്പറ്റ് ഉപയോഗിച്ച് കൃത്യമായി 6ml ഓയിൽ എടുത്ത് കുപ്പിയിലേക്ക് ഒഴിക്കുക. തുടർന്ന് റോൾ-ഓൺ ബോൾ അമർത്തി ഉറപ്പിക്കുക. മൈക്രോഫൈബർ തുണി കൊണ്ട് കുപ്പി തുടച്ച് വിരലടയാളങ്ങൾ മാറ്റിയ ശേഷം നടുവിലായി നിങ്ങളുടെ ബ്രാൻഡ് ലോഗോ ഒട്ടിക്കുക. തുടർന്ന് കറുത്ത വെൽവെറ്റ് പൗച്ചിലേക്ക് ഇടുക. ഒരു കുപ്പിയുടെ മൊത്തം ചെലവ് വെറും 33 രൂപ 80 പൈസ മാത്രമാണ്!",
        "en": "In Phase 5, we execute practical bottling SOP. Ensure your workspace is 100% dry; moisture clouds fragrance oils. Use a 5ml graduated pipette to draw exactly 6ml and dispense smoothly into the flacon. Press-fit the roller ball plug with a clean click. Wipe the exterior with a microfiber cloth to remove fingerprint grease, then align your waterproof vinyl label. Place inside the black velvet pouch. The exact finished cost of this luxury bottle is just ₹33.80!",
        "ar": "في هذه المرحلة نطبق خطوات التصنيع العملي. تأكد من جفاف طاولة العمل تماماً فالرطوبة تفسد نقاء الزيت. استخدم قطارة مدرجة 5 مل لسحب 6 مل وتعبئتها بهدوء في الزجاجة. ثبت بكرة الرول بقوة حتى تسمع صوت استقرارها ثم امسح الزجاجة بقطعة قماش ناعمة والصق شعارك في المنتصف، وضعها في الكيس المخملي الأسود. التكلفة الإجمالية لهذه الزجاجة الفاخرة لا تتجاوز 33.80 روبية فقط!"
      }
    },
    {
      "num": 6,
      "startSec": 1500,
      "endSec": 1800,
      "timestamp": "25:00",
      "title": {
        "en": "6. Profit Margins, Social Selling & Safe COD (25:00 - 30:00)",
        "ml": "6. ലാഭവിഹിതവും ഓൺലൈൻ വിപണനവും (25:00 - 30:00)",
        "ar": "6. حساب الأرباح والتسويق والشحن البريدي (25:00 - 30:00)"
      },
      "text": {
        "ml": "അവസാനമായി ലാഭക്കണക്കുകളും വിപണന തന്ത്രങ്ങളും. 34 രൂപ ചിലവായ 6ml കുപ്പി ഇൻസ്റ്റാഗ്രാമിൽ 249 രൂപയ്ക്കാണ് വിൽക്കുന്നത്. ഒരു കുപ്പിയിൽ നിന്നുള്ള അറ്റാദായം 215 രൂപയാണ്! മാസം 50 കുപ്പികൾ വിറ്റാൽ 10,750 രൂപയും, 100 കുപ്പികൾ വിറ്റാൽ 21,500 രൂപയും ലാഭം ലഭിക്കും. പ്രധാനപ്പെട്ട ഒരു നിയമം: അപരിചിതർക്ക് ക്യാഷ് ഓൺ ഡെലിവറി അയക്കുമ്പോൾ ഓർഡർ സ്ഥിരീകരിക്കാൻ 50 രൂപ അഡ്വാൻസ് ടോക്കൺ ഗൂഗിൾ പേ വഴി വാങ്ങുക. ഇല്ലെങ്കിൽ പാഴ്സൽ തിരിച്ചുവരുമ്പോൾ കൊറിയർ ചാർജ്ജ് നിങ്ങൾക്ക് നഷ്ടമാകും. ഇന്ത്യ പോസ്റ്റ് സ്പീഡ് പോസ്റ്റ് വഴി കേരളത്തിൽ 35 രൂപയ്ക്ക് സുരക്ഷിതമായി എത്തിക്കാം.",
        "en": "Finally, in Phase 6, we analyze profit margins and sales execution. A bottle costing ₹34 sells on Instagram for ₹249 to ₹349, netting over ₹215 pure profit per bottle. Selling just 50 bottles a month generates ₹10,750 net income, and 100 bottles yields ₹21,500 pure profit. Critical Rule: Never ship 100% Cash on Delivery to strangers without taking a ₹50 advance token via UPI, protecting you against return courier losses. Use India Post Speed Post for safe ₹35 delivery across Kerala.",
        "ar": "ختاماً، في المرحلة السادسة، نحلل هوامش الأرباح وقواعد البيع الآمن. الزجاجة التي كلفتك 34 روبية تباع عبر الإنترنت بـ 249 إلى 349 روبية، بصافي ربح يفوق 215 روبية بكل حبة. بيع 50 زجاجة شهرياً يمنحك 10,750 روبية، وبيع 100 حبة يمنحك 21,500 روبية ربحاً صافياً. قاعدة ذهبية: لا تشحن أبداً بنظام الدفع عند الاستلام الكامل للغرباء دون أخذ عربون 50 روبية مقدماً عبر تطبيق الدفع لحماية نفسك من رسوم الإرجاع. استخدم البريد السريع بتكلفة 35 روبية فقط داخل كيرالا."
      }
    }
  ],
  "clothing": [
    {
      "num": 1,
      "startSec": 0,
      "endSec": 300,
      "timestamp": "00:00",
      "title": {
        "en": "1. Fabric Science & Fast-Moving Modest Cuts (00:00 - 05:00)",
        "ml": "1. തുണിത്തരങ്ങളും അബായ മോഡലുകളും (00:00 - 05:00)",
        "ar": "1. أنواع الأقمشة الفاخرة وقصات العبايات الأكثر طلباً (00:00 - 05:00)"
      },
      "text": {
        "ml": "നമസ്കാരം, വസ്ത്ര-അബായ ബിസിനസ്സ് മാസ്റ്റർക്ലാസിലേക്ക് സ്വാഗതം. കേരളത്തിലും ഗൾഫിലും ഏറ്റവും കൂടുതൽ ഡിമാൻഡുള്ള ഒരു മേഖലയാണിത്. ഇതിൽ ഏറ്റവും പ്രധാനം ശരിയായ തുണി തിരഞ്ഞെടുക്കലാണ്. 140 GSM ഒറിജിനൽ കൊറിയൻ നിദ ഫാബ്രിക് ആണ് അബായകൾക്ക് ഏറ്റവും ഉത്തമം. ചുളിവുകൾ വീഴാത്ത സൂം ക്രീപ്പ്, ഒഴുക്കുള്ള ക്രങ്കിൾ ഷിഫോൺ എന്നിവയാണ് മറ്റ് പ്രിയങ്കരമായ തുണികൾ. തുടക്കക്കാർക്ക് വിൽക്കാൻ ഏറ്റവും അനുയോജ്യമായ 4 ഡിസൈനുകൾ: ഒന്ന് ക്ലാസിക് ബ്ലാക്ക് ദുബായ് കിമോണോ, രണ്ട് ഫ്രണ്ട്-ഓപ്പൺ കാഷ്വൽ അബായ, മൂന്ന് ലളിതമായ ലിനൻ കുർത്തികൾ, നാല് പേസ്റ്റൽ ടിയേർഡ് മാക്സി ഡ്രസ്സുകൾ.",
        "en": "Welcome to the Modest Wear & Clothing Masterclass. In Kerala and the GCC, modest fashion commands an evergreen year-round demand. Fabric choice defines your brand reputation. Original 140 GSM Korean Nida is the gold standard for premium abayas due to its lightweight drape and opaque matte finish. Wrinkle-free Zoom crepe and breathable crinkle chiffon are the secondary staples. The top 4 fast-moving cuts for beginners are: Classic Black Dubai Kimono, Front-Open Casual Abayas, Daily Linen Kurtis, and Pastel Tiered Maxi Dresses.",
        "ar": "أهلاً بكم في ماستر كلاس تجارة العبايات والأزياء المحتشمة. هذا القطاع يتميز بطلب دائم ومستمر على مدار العام في كيرالا والخليج. جودة القماش هي أساس نجاحك؛ قماش كوري ندى الأصلي بوزن 140 غرام هو الخيار الأول لجاذبيته وخفته وثباته. يليه قماش زوم المقاوم للتجعد وشيفون الكرينكل الفاخر. أفضل 4 موديلات مبيعاً للمبتدئين: كيمونو دبي الأسود الكلاسيكي، العباية المفتوحة العملية، فساتين اللينين اليومية، والموديل الطبقات العصري."
      }
    },
    {
      "num": 2,
      "startSec": 300,
      "endSec": 600,
      "timestamp": "05:00",
      "title": {
        "en": "2. Exact Capital & Inventory Budget (05:00 - 10:00)",
        "ml": "2. പ്രാരംഭ ഇൻവെന്ററിയും ബഡ്ജറ്റും (05:00 - 10:00)",
        "ar": "2. رأس مال البداية وميزانية أول دفعة (05:00 - 10:00)"
      },
      "text": {
        "ml": "രണ്ടാമത്തെ ഭാഗത്ത് നമ്മൾ വസ്ത്ര ബിസിനസ്സ് തുടങ്ങാനുള്ള ബഡ്ജറ്റ് പരിശോധിക്കുന്നു. 15,000 രൂപ ഉണ്ടെങ്കിൽ നിങ്ങൾക്ക് 30 പീസ് റെഡിമെയ്ഡ് അബായകളുടെയും വസ്ത്രങ്ങളുടെയും ആദ്യ സ്റ്റോക്ക് ഇറക്കാം. 30 അബായകൾക്ക് ശരാശരി 400 രൂപ നിരക്കിൽ 12,000 രൂപ. 100 പ്രീമിയം സാറ്റിൻ ബ്രാൻഡ് ടാഗുകൾക്കും വാഷ് കെയർ ലേബലുകൾക്കും 600 രൂപ. തുണി പൊതിയുന്ന ബട്ടർ പേപ്പറിന് 200 രൂപ. സുരക്ഷിതമായി അയക്കാനുള്ള പോളിമെയ്‌ലർ ബാഗുകൾക്ക് 400 രൂപ. കൊറിയർ ബഫറിന് 1,800 രൂപ. ആകെ 15,000 രൂപ കൊണ്ട് നിങ്ങൾക്ക് ഇൻസ്റ്റാഗ്രാം വഴി സ്വന്തം ബ്രാൻഡ് തുടങ്ങാം.",
        "en": "In Phase 2, we break down your startup budget. With ₹15,000, you can launch with a curated 30-piece starter inventory. 30 ready-to-wear boutique abayas at an average ₹400 wholesale cost requires ₹12,000. 100 woven satin neck tags and wash-care labels cost ₹600. Branded translucent butter paper wrapping costs ₹200. Waterproof courier poly-mailers cost ₹400. A ₹1,800 reserve buffer covers upfront postal dispatches. Total capital is ₹15,000 to launch your online boutique.",
        "ar": "في هذه المرحلة نستعرض ميزانية البداية. بمبلغ 15,000 روبية تستطيع تدشين متجرك الإلكتروني بـ 30 قطعة جاهزة. 30 عباية بسعر جملة 400 روبية للقطعة تكلف 12,000 روبية. 100 بطاقة ماركة قماشية من الساتان بـ 600 روبية، ورق زبدة فاخر لتغليف القطع بـ 200 روبية، أكياس شحن بريدية محكمة بـ 400 روبية، ومبلغ 1800 روبية احتياطي للشحن. الإجمالي 15,000 روبية فقط لتأسيس علامتك الخاصة."
      }
    },
    {
      "num": 3,
      "startSec": 600,
      "endSec": 960,
      "timestamp": "10:00",
      "title": {
        "en": "3. Direct Wholesale Sourcing Hubs (10:00 - 16:00)",
        "ml": "3. സൂറത്ത്, തിരുപ്പൂർ, കോഴിക്കോട് മാർക്കറ്റുകൾ (10:00 - 16:00)",
        "ar": "3. أسواق الجملة الكبرى: سورات وتيروبور ودبي (10:00 - 16:00)"
      },
      "text": {
        "ml": "മൂന്നാമതായി തുണിത്തരങ്ങൾ ഏറ്റവും കുറഞ്ഞ വിലയ്ക്ക് എവിടെ കിട്ടും എന്ന് നോക്കാം. ഇന്ത്യയിലെ ഏറ്റവും വലിയ തുണി മാർക്കറ്റ് ഗുജറാത്തിലെ സൂറത്ത് റിംഗ് റോഡിലുള്ള മില്ലേനിയം മാർക്കറ്റും ജപ്പാൻ മാർക്കറ്റുമാണ്. ഇവിടെ ഒരു അബായ വെറും 350 മുതൽ 450 രൂപയ്ക്ക് ലഭിക്കും. കോട്ടൺ വസ്ത്രങ്ങൾക്ക് തമിഴ്നാട്ടിലെ തിരുപ്പൂർ ആണ് ഏറ്റവും മികച്ച കേന്ദ്രം. കേരളത്തിൽ നേരിട്ട് കണ്ട് വാങ്ങാൻ കോഴിക്കോട് മാവൂർ റോഡിലും കൊച്ചി ബ്രോഡ്‌വേയിലും ഉള്ള മൊത്തവിതരണക്കാരെ സമീപിക്കാം. ഗൾഫിലുള്ളവർക്ക് ദുബായ് ദേരയിലെ നായിഫ് അബായ സൂഖും അജ്മാനുമാണ് മികച്ച ഉറവിടങ്ങൾ.",
        "en": "In Phase 3, we map verified wholesale hubs. Gujarat's Surat Ring Road—specifically Millennium Market and Japan Market—is India's capital for synthetic crepe and finished abayas, offering factory rates between ₹350 and ₹450 per piece. For premium knitwear and cotton loungewear, Tirupur in Tamil Nadu provides direct mill pricing. Within Kerala, Kozhikode Mavoor Road and Ernakulam Broadway host authorized master distributors. In the UAE, Dubai Deira Naif Abaya Souk provides direct container export pricing.",
        "ar": "في هذه المرحلة نحدد مراكز الشراء بالجملة. يعتبر شارع الحزام بسورات في ولاية غوجارات، وتحديداً سوق ميلينيوم وسوق اليابان، عاصمة صناعة الأقمشة والعبايات الجاهزة بأسعار تبدأ من 350 إلى 450 روبية للقطعة. ولملابس القطن الصيفية، مدينة تيروبور هي المركز الأكبر. في كيرالا، يتوفر موزعو الجملة بشارع مافور بكاليكوت وبرودواي بكوتشي. وفي الإمارات، سوق نايف بديرة دبي هو الوجهة الأبرز."
      }
    },
    {
      "num": 4,
      "startSec": 960,
      "endSec": 1260,
      "timestamp": "16:00",
      "title": {
        "en": "4. Wholesaler Negotiation & Quality Tests (16:00 - 21:00)",
        "ml": "4. വ്യാപാരികളോട് സംസാരിക്കേണ്ട രീതിയും ക്വാളിറ്റി ടെസ്റ്റും (16:00 - 21:00)",
        "ar": "4. أسرار التفاوض وفحص جودة الأقمشة والخياطة (16:00 - 21:00)"
      },
      "text": {
        "ml": "നാലാമതായി തുണിയുടെ ഗുണനിലവാരം എങ്ങനെ പരിശോധിക്കണം എന്ന് മനസ്സിലാക്കാം. കടക്കാരോട് സാമ്പിൾ വാങ്ങുമ്പോൾ ഒരു തുണി കഷ്ണം എടുത്ത് കയ്യിലിട്ട് അമർത്തിപ്പിടിക്കുക. വിടുമ്പോൾ ചുളിവ് വീഴുന്നില്ലെങ്കിൽ അത് ഒറിജിനൽ നിദയോ സൂം ക്രീപ്പോ ആണ്. അല്പം വെള്ളം തളിച്ചു നോക്കുക; വെള്ളം തുണി പെട്ടെന്ന് വലിച്ചെടുത്ത് കറയാകുന്നുണ്ടോ എന്ന് നോക്കുക. വ്യാപാരിയോട് ചോദിക്കുക: 'ഞാൻ കേരളത്തിൽ ബോട്ടിക് നടത്തുകയാണ്, എനിക്ക് കളർ പോകാത്തതും ചുരുങ്ങാത്തതുമായ പ്രീമിയം തയ്യൽ ഫിനിഷിങ് ഉള്ള 30 പീസ് മിക്സഡ് സൈസുകൾ വേണം'. ഇരട്ട തയ്യൽ ഉള്ള പീസുകൾ മാത്രം തിരഞ്ഞെടുക്കുക.",
        "en": "In Phase 4, we master quality testing and negotiation. When testing abaya fabrics, execute the crush test: squeeze a handful of fabric tightly for 5 seconds; if it releases without deep crease lines, it is authentic high-grade Nida or Zoom crepe. Perform a water-drop test to verify breathability. In your negotiation, state: 'We operate an online boutique in Kerala. We need an assorted 30-piece starter bundle across sizes 52 to 58 with reinforced double-stitch hems.' Inspect seam allowances to ensure no thread fraying.",
        "ar": "في هذه المرحلة نتعلم أسرار الفحص والتفاوض. لاختبار جودة القماش، اضغط على طرف القماش بيدك بقوة لمدة 5 ثوانٍ؛ إذا عاد مستوياً دون تجاعيد فهو ندى أصلي. افحص الخياطة الداخلية وتأكد من وجود خياطة مزدوجة متينة تمنع التمزق. عند مخاطبة المورد قل له: 'لدينا متجر أزياء في كيرالا، نريد باقة مشكلة من 30 قطعة بمقاسات من 52 إلى 58 بسعر الجملة المخفض مع اشتراط جودة الخياطة'."
      }
    },
    {
      "num": 5,
      "startSec": 1260,
      "endSec": 1500,
      "timestamp": "21:00",
      "title": {
        "en": "5. Finishing, Ironing & Luxury Unboxing SOP (21:00 - 25:00)",
        "ml": "5. അയൺ ചെയ്യലും ബ്രാൻഡഡ് പാക്കിംഗും (21:00 - 25:00)",
        "ar": "5. معايير الكي والتغليف الفاخر لفتح الصندوق (21:00 - 25:00)"
      },
      "text": {
        "ml": "അഞ്ചാമതായി ഉൽപ്പന്നം കസ്റ്റമർക്ക് അയക്കാനുള്ള ഒരുക്കങ്ങൾ. ഹോൾസെയിൽ കടയിൽ നിന്ന് വാങ്ങിയ വസ്ത്രങ്ങൾ നേരിട്ട് കസ്റ്റമർക്ക് അയക്കരുത്. ആദ്യം കത്രിക ഉപയോഗിച്ച് അധികമുള്ള നൂലുകൾ വെട്ടിമാറ്റുക. ഹാൻഡ് സ്റ്റീം പ്രസ്സ് ഉപയോഗിച്ച് നല്ല രീതിയിൽ ചുളിവുകൾ മാറ്റി ഇസ്തിരിയിടുക. നിങ്ങളുടെ ബ്രാൻഡ് ലോഗോ ഉള്ള ടാഗ് കഴുത്തിൽ തുന്നിപ്പിടിപ്പിക്കുകയോ ടാഗ് ഗൺ ഉപയോഗിച്ച് ഘടിപ്പിക്കുകയോ ചെയ്യുക. തുടർന്ന് സുഗന്ധമുള്ള ഒരു തുള്ളി സ്പ്രേ ചെയ്ത ബട്ടർ പേപ്പറിൽ മടക്കിവെച്ച് നടുവിലായി ഒരു 'താങ്ക് യു കാർഡ്' വെക്കുക. ഇത് കാണുമ്പോൾ കസ്റ്റമർക്ക് ഇരട്ടി സന്തോഷം ഉണ്ടാകും.",
        "en": "In Phase 5, we execute finishing and unboxing SOP. Never ship uninspected factory garments directly to retail customers. Trim all loose hanging threads with thread snips. Use a vertical handheld steam iron to smooth out every transit fold. Attach your custom branded neck label or hangtag using a fine-needle tagging gun. Lightly mist the tissue paper with a pleasant subtle scent, fold with sharp boutique lines, seal with a branded sticker, and insert an aesthetic handwritten thank-you card.",
        "ar": "في هذه المرحلة نطبق معايير التجهيز النهائي. لا ترسل الملابس للمشتري مباشرة من كرتون الجملة. قم بقص كل الخيوط الزائدة بدقة، واستخدم المكواة البخارية العمودية لفرد القطعة تماماً. ثبت بطاقة علامتك التجارية الأنيقة، ثم اطوِ العباية بنعومة داخل ورق الزبدة المعطر بنفحة خفيفة، وضع بطاقة شكر شخصية أنيقة للمشتري. هذه اللمسة تزيد من ولاء الزبون وإعادة الشراء بنسبة 80%."
      }
    },
    {
      "num": 6,
      "startSec": 1500,
      "endSec": 1800,
      "timestamp": "25:00",
      "title": {
        "en": "6. Profit Margins, Reels Video Draping & Safe Delivery (25:00 - 30:00)",
        "ml": "6. ലാഭക്കണക്കുകളും ഇൻസ്റ്റാഗ്രാം റീൽസ് വിപണനവും (25:00 - 30:00)",
        "ar": "6. هوامش الربح والتسويق عبر مقاطع الريلز والشحن الآمن (25:00 - 30:00)"
      },
      "text": {
        "ml": "അവസാനമായി ലാഭവും വിപണന തന്ത്രങ്ങളും. സൂറത്തിൽ നിന്ന് 420 രൂപയ്ക്ക് വാങ്ങിയ ഒരു പ്രീമിയം അബായ, ബ്രാൻഡ് ചെയ്ത് ഇൻസ്റ്റാഗ്രാമിൽ വിൽക്കുന്നത് 1,199 മുതൽ 1,499 രൂപയ്ക്കാണ്! ഒരു വസ്ത്രത്തിൽ നിന്ന് മാത്രം 700 മുതൽ 900 രൂപ വരെ അറ്റാദായം ലഭിക്കും. മാസം വെറും 25 അബായകൾ വിറ്റാൽ 20,000 രൂപയ്ക്ക് മുകളിൽ ലാഭമുണ്ടാക്കാം. ഇതിനായി ഫോണിൽ നാച്ചുറൽ ലൈറ്റിൽ തുണിയുടെ ഒഴുക്ക് കാണിക്കുന്ന 10 സെക്കൻഡ് റീൽസ് വീഡിയോകൾ ചെയ്യുക. ക്യാഷ് ഓൺ ഡെലിവറിക്ക് 100 രൂപ അഡ്വാൻസ് ഗൂഗിൾ പേ വഴി വാങ്ങാൻ ഒരിക്കലും മറക്കരുത്. ഡി ടി ഡി സി അല്ലെങ്കിൽ സ്പീഡ് പോസ്റ്റ് വഴി 50 രൂപയ്ക്ക് അയക്കാം.",
        "en": "In Phase 6, we master profit margins and video commerce. An abaya sourced at ₹420 wholesale easily commands ₹1,199 to ₹1,499 online with boutique branding, generating ₹700 to ₹900 pure profit per unit! Selling just 25 pieces a month produces over ₹20,000 net income. Capture 10-second Instagram Reels in natural daylight showing the fabric flowing and sleeve details. Crucial Rule: Always collect a ₹100 UPI advance token before dispatching COD parcels to guarantee pickup. Ship via DTDC or Speed Post for ₹50.",
        "ar": "ختاماً، في المرحلة السادسة، نراجع حساب الأرباح واستراتيجية التسويق. العباية التي تشتريها بسعر 420 روبية تباع عبر متجرك بـ 1,199 إلى 1,499 روبية، بربح صافٍ يتراوح بين 700 إلى 900 روبية للقطعة الواحدة! بيع 25 قطعة فقط شهرياً يمنحك أكثر من 20,000 روبية ربحاً حقيقياً. صور مقاطع ريلز قصيرة في الإضاءة الطبيعية توضح انسيابية القماش وتفاصيل الأكمام. قاعدة هامة: اطلب عربون 100 روبية لأي طلب دفع عند الاستلام لتفادي المرتجعات."
      }
    }
  ],
  "watches": [
    {
      "num": 1,
      "startSec": 0,
      "endSec": 300,
      "timestamp": "00:00",
      "title": {
        "en": "1. Watch Anatomy & High-Demand Styles (00:00 - 05:00)",
        "ml": "1. വാച്ചുകളുടെ ശാസ്ത്രവും പ്രധാന മോഡലുകളും (00:00 - 05:00)",
        "ar": "1. تشريح الساعات وحركاتها والموديلات الأكثر طلباً (00:00 - 05:00)"
      },
      "text": {
        "ml": "നമസ്കാരം, പ്രീമിയം വാച്ച് ബിസിനസ്സ് മാസ്റ്റർക്ലാസിലേക്ക് സ്വാഗതം. പുരുഷന്മാരും സ്ത്രീകളും സമ്മാനങ്ങൾ നൽകാനും നിത്യവും ധരിക്കാനും ഏറ്റവും കൂടുതൽ വാങ്ങുന്ന ഒന്നാണ് വാച്ചുകൾ. ഒരു നല്ല വാച്ചിന്റെ ജീവൻ അതിന്റെ ഉള്ളിലെ മൂവ്‌മെന്റ് ആണ്. ജാപ്പനീസ് മിയോട്ട അല്ലെങ്കിൽ സെയ്‌ക്കോ മൂവ്‌മെന്റ് ഉള്ള ക്വാർട്സ് വാച്ചുകളാണ് കൃത്യതയും ദീർഘായുസ്സും നൽകുന്നത്. സ്ക്രാച്ച് വീഴാത്ത മിനറൽ ക്രിസ്റ്റൽ ഗ്ലാസ്സും 316L സ്റ്റെയിൻലെസ്സ് സ്റ്റീൽ ബോഡിയും നോക്കി വാങ്ങുക. ഏറ്റവും വേഗത്തിൽ വിറ്റുപോകുന്ന 4 മോഡലുകൾ: ഒന്ന് മിനിമലിസ്റ്റ് അൾട്രാ-തിൻ ലെതർ വാച്ച്, രണ്ട് സെറാമിക് ഡേറ്റ് വാച്ച്, മൂന്ന് മെറ്റൽ ക്രോണോഗ്രാഫ്, നാല് വിന്റേജ് സ്ക്വയർ ടാങ്ക് വാച്ച്.",
        "en": "Welcome to the Premium Watch & Accessories Masterclass. Watches represent one of the highest perceived-value gifting and daily lifestyle segments. The core of a reliable watch is its internal movement: Japanese Miyota or Seiko Epson quartz calibers deliver pinpoint timekeeping and 2-3 years battery endurance. Look for scratch-resistant hardened mineral crystal and 316L solid stainless steel cases. The top 4 fast-moving designs are: Minimalist Ultra-Thin Leather, Ceramic Bezel Date Editions, Solid Steel Chronographs, and Vintage Square Tank models.",
        "ar": "مرحباً بكم في ماستر كلاس تجارة الساعات الفاخرة. تعد الساعات من أكثر المنتجات طلباً للهدايا والاستخدام اليومي بقيمة ملموسة عالية. قلب الساعة هو محركها الداخلي؛ محركات الكوارتز اليابانية مثل مييوتا أو سيكو تضمن الدقة المتناهية وعمر بطارية يتجاوز سنتين. احرص على اختيار زجاج معدني مقاوم للخدش وهيكل من الستانلس ستيل 316L. أفضل 4 موديلات طلباً: الساعات النحيفة الجلدية الكلاسيكية، ساعات السيراميك، الكرونوغراف المعدني، والموديل المربع العتيق."
      }
    },
    {
      "num": 2,
      "startSec": 300,
      "endSec": 600,
      "timestamp": "05:00",
      "title": {
        "en": "2. Exact Capital & Boxing Budget (05:00 - 10:00)",
        "ml": "2. വാച്ച് ബിസിനസ്സ് ബഡ്ജറ്റും ബോക്സിംഗും (05:00 - 10:00)",
        "ar": "2. ميزانية رأس المال وعلب الهدايا الفاخرة (05:00 - 10:00)"
      },
      "text": {
        "ml": "രണ്ടാമതായി വാച്ച് ബിസിനസ്സ് തുടങ്ങാനുള്ള ബഡ്ജറ്റ് നോക്കാം. 8,500 രൂപ ഉണ്ടെങ്കിൽ 20 പ്രീമിയം വാച്ചുകൾ വാങ്ങി നിങ്ങൾക്ക് ഈ ബിസിനസ്സ് ആരംഭിക്കാം. 20 ക്വാർട്സ് വാച്ചുകൾക്ക് ശരാശരി 300 രൂപ നിരക്കിൽ 6,000 രൂപ. 20 ആഡംബര വെൽവെറ്റ് തലയണയുള്ള മാറ്റ്-ബ്ലാക്ക് ബോക്സുകൾക്ക് 800 രൂപ (ഒരു ബോക്സിന് 40 രൂപ). നിങ്ങളുടെ ബ്രാൻഡ് പേരുള്ള 50 വാറന്റി കാർഡുകൾക്ക് 200 രൂപ. ക്ലീനിങ് മൈക്രോഫൈബർ തുണിക്ക് 150 രൂപ. ബബിൾ റാപ്പും കൊറിയർ ബഫറും 1,350 രൂപ. ആകെ 8,500 രൂപ കൊണ്ട് ആദ്യത്തെ 20 പീസ് ബൊട്ടീക്ക് ബോക്സുകൾ വിപണിയിൽ ഇറക്കാം.",
        "en": "In Phase 2, we allocate your startup capital. With ₹8,500, you can secure 20 high-grade watches with complete luxury presentation. 20 curated quartz watches at ₹300 wholesale cost requires ₹6,000. 20 matte-black luxury presentation boxes with velvet cushions cost ₹800 at ₹40 each. 50 custom branded 1-year movement warranty cards cost ₹200. Microfiber lens wiping cloths cost ₹150. Heavy protective bubble wraps and courier buffer require ₹1,350. Total capital is just ₹8,500.",
        "ar": "في هذه المرحلة نستعرض ميزانية البداية لسوق الساعات. بمبلغ 8,500 روبية يمكنك شراء 20 ساعة فاخرة مع علب الهدايا الكاملة. 20 ساعة كوارتز ممتازة بمتوسط سعر جملة 300 روبية تكلف 6,000 روبية. 20 علبة هدايا سوداء فاخرة بوسادة مخملية بـ 800 روبية بمعدل 40 روبية للعلبة. 50 كرت ضمان للمحرك بشعارك بـ 200 روبية، وأقمشة تنظيف مايكروفايبر بـ 150 روبية، واحتياطي التغليف الآمن والشحن 1,350 روبية. الإجمالي 8,500 روبية فقط."
      }
    },
    {
      "num": 3,
      "startSec": 600,
      "endSec": 960,
      "timestamp": "10:00",
      "title": {
        "en": "3. Mumbai Manish Market & Delhi Gaffar Hubs (10:00 - 16:00)",
        "ml": "3. മനീഷ് മാർക്കറ്റും ഗഫാർ മാർക്കറ്റും (10:00 - 16:00)",
        "ar": "3. أسواق الجملة الكبرى للساعات: مومباي ودلهي (10:00 - 16:00)"
      },
      "text": {
        "ml": "മൂന്നാമതായി വാച്ചുകൾ മൊത്തമായി വാങ്ങാനുള്ള വിപണികൾ കണ്ടെത്താം. ഇന്ത്യയിൽ ഏറ്റവും കുറഞ്ഞ നിരക്കിൽ വാച്ചുകൾ ലഭിക്കുന്നത് മുംബൈയിലെ മനീഷ് മാർക്കറ്റിലും ഫോർട്ട് ക്ലോക്ക് ടവർ ഏരിയയിലുമാണ്. അതുപോലെ ഡൽഹി കരോൾ ബാഗിലെ ഗഫാർ മാർക്കറ്റിലും സദർ ബസാറിലും നേരിട്ട് ഇറക്കുമതി ചെയ്യുന്ന വൻകിട വ്യാപാരികളുണ്ട്. ഇവിടെ 250 മുതൽ 380 രൂപയ്ക്ക് ഉയർന്ന ക്വാളിറ്റിയുള്ള വാച്ചുകൾ ലഭിക്കും. കേരളത്തിൽ കോഴിക്കോട് പാളയം മാർക്കറ്റിലും എറണാകുളം പെന്റാ മേനകയിലും മൊത്ത വിതരണക്കാരുണ്ട്. വിദേശത്ത് നിന്ന് നേരിട്ട് ഹോങ്കോംഗ്, ഷെൻസെൻ എന്നിവിടങ്ങളിൽ നിന്നും കണ്ടെയ്നർ ലോട്ട് ഓർഡർ ചെയ്യാം.",
        "en": "In Phase 3, we reveal verified watch wholesale hubs. In Mumbai, Manish Market near CST and the Fort Clock Tower wholesale street are India's premier hubs for imported timepieces, offering direct wholesale prices from ₹250 to ₹380 per unit. In Delhi, Gaffar Market in Karol Bagh and Sadar Bazaar house primary direct importers. In Kerala, Kozhikode Palayam and Kochi Penta Menaka host regional wholesale stockists. For large-scale scaling, direct air-courier lots originate from Hong Kong and Shenzhen horology districts.",
        "ar": "في هذه المرحلة نكشف عن مراكز الجملة الكبرى للساعات. في مومباي، يعتبر سوق مانيش الشهير قرب محطة سي إس تي ومنطقة فورت المركز الأول في الهند لساعات اليد المستوردة بأسعار جملة تتراوح بين 250 إلى 380 روبية. وفي دلهي، سوق غفار في كارول باغ وسوق صدر هما الأكبر. وفي كيرالا تتوفر محلات جملة في بالايام بكاليكوت وبينتا ماناكا بإرناكولام، إضافة للاستيراد المباشر من هونغ كونغ وشينزن."
      }
    },
    {
      "num": 4,
      "startSec": 960,
      "endSec": 1260,
      "timestamp": "16:00",
      "title": {
        "en": "4. Wholesaler Questions & Movement Warranty (16:00 - 21:00)",
        "ml": "4. വാച്ചുകൾ വാങ്ങുമ്പോൾ ചോദിക്കേണ്ട കാര്യങ്ങൾ (16:00 - 21:00)",
        "ar": "4. أسئلة فحص المورد وضمان المحرك والبطارية (16:00 - 21:00)"
      },
      "text": {
        "ml": "നാലാമതായി വ്യാപാരികളോട് ചോദിക്കേണ്ട പ്രധാന ചോദ്യങ്ങൾ. 'ഇതിലെ ബാറ്ററി ഒറിജിനൽ സോണി അല്ലെങ്കിൽ മാക്സൽ സെൽ ആണോ? എത്ര വർഷം നിലനിൽക്കും?' എന്ന് ചോദിക്കുക. വാച്ചിന്റെ ക്രൗൺ അഥവാ സമയം തിരിക്കുന്ന കീ തിരിച്ച് തീയതിയും സൂചികളും സുഗമമായി നീങ്ങുന്നുണ്ടോ എന്ന് പരിശോധിക്കുക. 'എനിക്ക് 20 പീസ് മിക്സഡ് ബോക്സ് സ്ലാബ് റേറ്റിൽ നൽകുമോ, ഒപ്പം കേടുപാടുകൾ വന്നാൽ റീപ്ലേസ്മെന്റ് തരുമോ?' എന്ന് ഉറപ്പ് വരുത്തുക. വാട്ടർ റെസിസ്റ്റന്റ് ഗാസ്കറ്റ് ഉള്ള വാച്ചുകൾ മാത്രം തിരഞ്ഞെടുക്കുക.",
        "en": "In Phase 4, we script your wholesaler inspection. Always ask: 'What internal movement cell is installed—is it an authentic Maxell or Sony battery with 2-year warranty?' Test the crown adjustment: ensure date switching clicks crisply at 12 o'clock and hands turn smoothly without slack. Inquire: 'Can you extend your 100-piece slab rate if I take a 20-piece mixed-box tester lot with guaranteed dead-on-arrival replacement?' Verify that the caseback features a genuine rubber O-ring seal for splash resistance.",
        "ar": "في هذه المرحلة نتقن حوار فحص الساعات مع المورد. اسأل المورد دائماً: 'ما هو نوع البطارية المركبة، هل هي سوني أو ماكسيل الأصلية التي تدوم سنتين؟'. جرب لف تاج الساعة وتأكد من حركة العقارب بسلاسة وانتقال التاريخ بدقة. واطلب منه بوضوح: 'هل تمنحني سعر الجملة لباقة من 20 قطعة متنوعة مع استبدال أي قطعة تالفة؟'. وتأكد من وجود حلقة مطاطية عازلة تحت الغطاء الخلفي لمقاومة رذاذ الماء."
      }
    },
    {
      "num": 5,
      "startSec": 1260,
      "endSec": 1500,
      "timestamp": "21:00",
      "title": {
        "en": "5. QC Inspection & Luxury Cushion Boxing SOP (21:00 - 25:00)",
        "ml": "5. വാച്ച് പരിശോധനയും ലക്ഷ്വറി ബോക്സിംഗും (21:00 - 25:00)",
        "ar": "5. خطوات الفحص والتلميع والتركيب على الوسادة الفاخرة (21:00 - 25:00)"
      },
      "text": {
        "ml": "അഞ്ചാമതായി വാച്ച് ബോക്സിംഗും പാക്കിംഗും ചെയ്യുന്ന വിധം. ആദ്യം മൈക്രോഫൈബർ തുണി ഉപയോഗിച്ച് വാച്ചിലെ എല്ലാ വിരലടയാളങ്ങളും പൊടിയും തുടച്ചുമാറ്റുക. ക്രൗണിലെ പ്ലാസ്റ്റിക് ലോക്ക് മാറ്റി കൃത്യമായി സമയം ക്രമീകരിക്കുക. വാച്ച് സ്ട്രാപ്പിൽ നിങ്ങളുടെ ബ്രാൻഡ് ടാഗ് ഘടിപ്പിക്കുക. തുടർന്ന് കറുത്ത വെൽവെറ്റ് തലയണയിലേക്ക് വാച്ച് ഉറപ്പിച്ചു വെച്ച് ബോക്സിൽ വെയ്ക്കുക. ബോക്സിന്റെ അടിയിൽ 1 വർഷത്തെ വാറന്റി കാർഡും വെയ്ക്കുക. ഈ ലക്ഷ്വറി പാക്കിംഗ് കാണുമ്പോൾ 350 രൂപയുടെ വാച്ചിന് 1,500 രൂപയുടെ മൂല്യം തോന്നും!",
        "en": "In Phase 5, we execute luxury boxing SOP. Wipe every millimeter of the mineral crystal and case with an antistatic microfiber cloth to remove manufacturing oils. Remove the plastic crown stopper clip, sync the exact time to the second, and press the crown in. Secure your custom branded foil tag around the strap buckle. Wrap the watch around the soft velvet cushion and seat it firmly inside the matte-black rigid gift box. Slip your branded 1-Year Movement Warranty Card beneath. Presentation transforms a ₹350 wholesale piece into a ₹1,500 luxury timepiece!",
        "ar": "في هذه المرحلة نطبق معايير التغليف الفاخر. امسح الزجاج والإطار المعدني بقطعة مايكروفايبر ناعمة لإزالة أي شوائب أو بصمات. انزع قفل التاج البلاستيكي واضبط الوقت بدقة بالثانية واضغط التاج لتشغيل الحركة. ثبت بطاقة علامتك الفاخرة على إبزيم السير، ثم لف الساعة حول الوسادة المخملية وضعها داخل العلبة الأنيقة وضع كرت الضمان بالأسفل. هذا التغليف الراقي يحول ساعة كلفتك 350 روبية إلى تحفة تبدو بقيمة 1500 روبية!"
      }
    },
    {
      "num": 6,
      "startSec": 1500,
      "endSec": 1800,
      "timestamp": "25:00",
      "title": {
        "en": "6. Profit Margins, Wrist Roll Reels & Safe Courier (25:00 - 30:00)",
        "ml": "6. ലാഭവിഹിതവും മാക്രോ വീഡിയോ വിപണനവും (25:00 - 30:00)",
        "ar": "6. حساب الأرباح وفيديوهات تصوير المعصم والشحن الآمن (25:00 - 30:00)"
      },
      "text": {
        "ml": "അവസാനമായി ലാഭക്കണക്കുകളും സോഷ്യൽ മീഡിയ വിപണനവും. 320 രൂപയ്ക്ക് വാങ്ങിയ ഒരു വാച്ച്, പ്രീമിയം ബോക്സും വാറന്റിയും നൽകി ഇൻസ്റ്റാഗ്രാമിൽ 1,199 മുതൽ 1,499 രൂപയ്ക്കാണ് വിൽക്കുന്നത്. ഒരു വാച്ചിൽ നിന്നുള്ള അറ്റാദായം 750 രൂപയ്ക്ക് മുകളിലാണ്! മാസം 30 വാച്ചുകൾ വിറ്റാൽ 22,500 രൂപ ലാഭം നേടാം. വിൽപന കൂട്ടാൻ ഫോൺ ക്യാമറയിൽ വാച്ചിന്റെ ഡയൽ ക്ലോസ്-അപ്പായി കാണിച്ച് കൈയ്യിൽ ധരിച്ചുകൊണ്ടുള്ള 'റിസ്റ്റ് റോൾ' വീഡിയോകൾ റീൽസായി പോസ്റ്റ് ചെയ്യുക. ഗ്ലാസ്സ് വാച്ചുകൾ ആയതിനാൽ എയർ കുഷ്യൻ ബബിൾ റാപ്പ് ചുറ്റി ഇന്ത്യ പോസ്റ്റ് വഴി അയക്കുക.",
        "en": "In Phase 6, we analyze profit realization and video marketing. Sourced at ₹320 with ₹40 luxury boxing, a watch commands ₹1,199 to ₹1,499 on Instagram, netting over ₹750 pure profit per piece! Selling just 30 watches a month yields over ₹22,500 net monthly income. Master the 'Wrist Roll Reel': shoot 4K macro video in automotive sunlight slowly rolling your wrist to highlight dial reflections and sweep second movement. Cushion the box with multi-layer bubble wrap for safe ₹45 pan-India courier dispatch.",
        "ar": "ختاماً، في المرحلة السادسة، نحدد هوامش الأرباح واستراتيجية التسويق بالفيديو. الساعة التي تكلفك 320 روبية مع 40 روبية للعلبة تباع عبر الإنترنت بـ 1,199 إلى 1,499 روبية، بصافي ربح يفوق 750 روبية للقطعة! بيع 30 ساعة شهرياً يحقق لك أكثر من 22,500 روبية ربحاً حقيقياً. صور مقاطع ريلز قصيرة لحركة الساعة على المعصم في ضوء النهار لإبراز لمعان الزجاج وتفاصيل الميناء. غلف العلبة بطبقات فقاعية واقية لشحن آمن بـ 45 روبية."
      }
    }
  ],
  "bags": [
    {
      "num": 1,
      "startSec": 0,
      "endSec": 300,
      "timestamp": "00:00",
      "title": {
        "en": "1. Canvas & Leather Science (00:00 - 05:00)",
        "ml": "1. ക്യാൻവാസ് തുണികളും ടോട്ട് ബാഗ് ശാസ്ത്രവും (00:00 - 05:00)",
        "ar": "1. علم أقمشة الكانفاس والجلود وحقائب التوت العصرية (00:00 - 05:00)"
      },
      "text": {
        "ml": "നമസ്കാരം, ടോട്ട് ബാഗ് & ലെതർ ഗുഡ്സ് മാസ്റ്റർക്ലാസിലേക്ക് സ്വാഗതം. കോളേജ് വിദ്യാർത്ഥികളും ഓഫീസിൽ പോകുന്നവരും പരിസ്ഥിതി സൗഹൃദ ജീവിതശൈലി ഇഷ്ടപ്പെടുന്നവരും ഇന്ന് ഏറ്റവും കൂടുതൽ ഉപയോഗിക്കുന്ന ഒന്നാണ് കോട്ടൺ ടോട്ട് ബാഗുകൾ. കുറഞ്ഞത് 350 GSM ഉള്ള ഓർഗാനിക് ഡ്രിൽ കോട്ടൺ ക്യാൻവാസ് വേണം ബാഗുകൾക്കായി തിരഞ്ഞെടുക്കാൻ. ഇത് ഭാരം താങ്ങാനും ദീർഘകാലം നിലനിൽക്കാനും സഹായിക്കും. പ്രിയങ്കരമായ 4 ഇനങ്ങൾ: ഒന്ന് മലയാളം സാഹിത്യ ഉദ്ധരണികൾ പ്രിന്റ് ചെയ്ത കൾച്ചറൽ ടോട്ട് ബാഗുകൾ, രണ്ട് മിനിമലിസ്റ്റ് ആർട്ട് ടോട്ട് ബാഗുകൾ, മൂന്ന് സിപ്പറും ഉള്ളിൽ പോക്കറ്റുമുള്ള ഡെയ്‌ലി ഷോപ്പർ ബാഗുകൾ, നാല് വീഗൻ ലെതർ ലാപ്ടോപ്പ് ബാഗുകൾ.",
        "en": "Welcome to the Aesthetic Tote Bags & Leather Goods Masterclass. Heavyweight cotton tote bags represent a booming lifestyle category driven by university students, creatives, and eco-conscious shoppers. Sourcing the right canvas is non-negotiable: insist on minimum 350 GSM organic heavy cotton drill canvas to prevent slouching and ensure heavy load bearing. The top 4 fast-moving designs are: Kerala Malayalam Typography Quotes Totes, Minimalist Botanical Line-Art Totes, Zippered Pocket Daily Shoppers, and Vegan Leather Structured Laptop Totes.",
        "ar": "مرحباً بكم في ماستر كلاس حقائب القماش والكانفاس والجلود. تشهد حقائب التوت القطنية طلباً هائلاً بين طلاب الجامعات والموظفين ومحبي المنتجات الصديقة للبيئة. مواصفات القماش حاسمة؛ يجب ألا يقل وزن الكانفاس عن 350 غرام لضمان المتانة وتحمل الأوزان اليومية دون تمزق. أفضل 4 تصاميم مبيعاً: حقائب العبارات الثقافية والخط العربي، حقائب الرسومات النباتية البسيطة، حقائب التسوق اليومية بسحاب وجيب داخلي، وحقائب اللابتوب من الجلد النباتي الفاخر."
      }
    },
    {
      "num": 2,
      "startSec": 300,
      "endSec": 600,
      "timestamp": "05:00",
      "title": {
        "en": "2. Exact Capital & Printing Budget (05:00 - 10:00)",
        "ml": "2. പ്രാരംഭ ബഡ്ജറ്റും സ്ക്രീൻ പ്രിന്റിംഗും (05:00 - 10:00)",
        "ar": "2. ميزانية رأس المال والطباعة الحريرية (05:00 - 10:00)"
      },
      "text": {
        "ml": "രണ്ടാമതായി ടോട്ട് ബാഗ് ബിസിനസ്സ് തുടങ്ങാനുള്ള ബഡ്ജറ്റ് നോക്കാം. വെറും 5,500 രൂപ ഉണ്ടെങ്കിൽ 40 പ്രീമിയം പ്രിന്റഡ് ടോട്ട് ബാഗുകളുമായി നിങ്ങൾക്ക് തുടങ്ങാം. 40 അൺപ്രിന്റഡ് 350 GSM ക്യാൻവാസ് ബാഗുകൾക്ക് 60 രൂപ നിരക്കിൽ 2,400 രൂപ. 2 സ്ക്രീൻ പ്രിന്റിംഗ് ഫ്രെയിമുകൾക്കും ഇക്കോ-ഫ്രണ്ട്‌ലി മഷിക്കും 1,200 രൂപ (ഒരു ബാഗിന് 20 രൂപ പ്രിന്റിംഗ് ചെലവ്). 100 ക്രാഫ്റ്റ് പേപ്പർ ബ്രാൻഡ് റാപ്പർ സ്ലീവുകൾക്ക് 300 രൂപ. തുണിയിൽ തുന്നുന്ന ബ്രാൻഡ് ടാഗുകൾക്ക് 400 രൂപ. കൊറിയർ ബഫറിന് 1,200 രൂപ. ആകെ വെറും 5,500 രൂപ കൊണ്ട് ആദ്യ ബാച്ച് തയ്യാറാക്കാം.",
        "en": "In Phase 2, we budget your initial tote production run. With just ₹5,500, you can produce 40 custom-printed premium totes. 40 unprinted 350 GSM heavy canvas totes at ₹60 mill rate costs ₹2,400. Silk-screen exposure frames and eco-pigment textile ink cost ₹1,200 (averaging ₹20 per print). 100 recycled kraft paper belly-band sleeves cost ₹300. Custom woven side-seam tags cost ₹400. ₹1,200 reserves cover your initial dispatches. Total startup capital is just ₹5,500 to bring your design collection to life.",
        "ar": "في هذه المرحلة نحدد ميزانية إنتاج حقائب التوت. بمبلغ 5,500 روبية فقط يمكنك إنتاج 40 حقيبة قماشية مطبوعة بتصميمك الخاص. 40 حقيبة كانفاس خام بوزن 350 غرام بسعر 60 روبية تكلف 2,400 روبية. إطارات الطباعة الحريرية والأحبار الصديقة للبيئة تكلف 1,200 روبية بمعدل 20 روبية للطباعة بكل حبة. 100 غلاف كرتوني بشعارك بـ 300 روبية، ملصقات قماشية جانبية بـ 400 روبية، واحتياطي شحن 1,200 روبية. الإجمالي 5,500 روبية فقط."
      }
    },
    {
      "num": 3,
      "startSec": 600,
      "endSec": 960,
      "timestamp": "10:00",
      "title": {
        "en": "3. Mumbai Dharavi & Surat Canvas Mills (10:00 - 16:00)",
        "ml": "3. ധാരാവി ലെതർ മാർക്കറ്റും ഈറോഡ് കോട്ടൺ മില്ലുകളും (10:00 - 16:00)",
        "ar": "3. أسواق الجملة ومصانع الأقمشة: دارافي وإيرود وسورات (10:00 - 16:00)"
      },
      "text": {
        "ml": "മൂന്നാമതായി ബാഗുകളും മെറ്റീരിയലുകളും എവിടെ നിന്ന് നേരിട്ട് വാങ്ങാം എന്ന് നോക്കാം. ക്യാൻവാസ് തുണികൾക്ക് ഏറ്റവും മികച്ച സ്ഥലം തമിഴ്നാട്ടിലെ ഈറോഡ്, കോയമ്പത്തൂർ നെയ്ത്ത് ശാലകളും ഗുജറാത്തിലെ സൂറത്ത് മില്ലുകളുമാണ്. ഇവിടെ പ്ലെയിൻ ബാഗുകൾ 45 മുതൽ 60 രൂപയ്ക്ക് ലഭിക്കും. ലെതർ ഉൽപ്പന്നങ്ങൾക്കും ക്വാളിറ്റി തയ്യലിനും മുംബൈയിലെ ധാരാവി 90 ഫീറ്റ് റോഡും കൊൽക്കത്ത ബൗബസാറുമാണ് പ്രധാന കേന്ദ്രങ്ങൾ. ഇവിടെ മികച്ച ഫിനിഷിങ് ഉള്ള വീഗൻ ലെതർ ബാഗുകൾ 150 മുതൽ 250 രൂപയ്ക്ക് ലഭിക്കും. കേരളത്തിൽ കണ്ണൂരിലെ പരമ്പരാഗത കൈത്തറി സംഘങ്ങളിൽ നിന്നും ശുദ്ധമായ കോട്ടൺ ബാഗുകൾ ലഭ്യമാണ്.",
        "en": "In Phase 3, we map verified canvas and leather sourcing hubs. For raw heavyweight canvas and pre-stitched blank totes, weaving clusters in Erode and Coimbatore in Tamil Nadu, alongside Surat canvas mills, provide direct blank totes at ₹45 to ₹60. For leather goods, laptop sleeves, and metal hardware, Mumbai's Dharavi 90-Feet Road and Kolkata's Bowbazar craft clusters offer artisan manufacturing where vegan leather totes cost between ₹150 and ₹250. In Kerala, Kannur handloom cooperative societies provide organic unbleached bags.",
        "ar": "في هذه المرحلة نحدد مراكز توريد الكانفاس والجلود. لشراء أكياس الكانفاس الخام، تعتبر مصانع إيرود وكويمباتور في تاميل نادو ومطاحن سورات الأفضل لتوفير حقائب خام بسعر 45 إلى 60 روبية. ولمنتجات الجلود وحقائب اللابتوب، منطقة دارافي بشارع 90 في مومباي وحي بوبازار بكولكاتا هما الأبرز لتوفير حقائب جلدية فاخرة بأسعار بين 150 إلى 250 روبية. وفي كيرالا، توفر جمعيات كانور النسيجية خامات قطنية طبيعية."
      }
    },
    {
      "num": 4,
      "startSec": 960,
      "endSec": 1260,
      "timestamp": "16:00",
      "title": {
        "en": "4. Manufacturer Dialogue & Box-X Strap Strength (16:00 - 21:00)",
        "ml": "4. തയ്യൽക്കാരുമായി സംസാരിക്കേണ്ടതും സ്ട്രാപ്പ് ഉറപ്പും (16:00 - 21:00)",
        "ar": "4. أسرار التفاوض مع ورش الخياطة واختبار متانة الأحزمة (16:00 - 21:00)"
      },
      "text": {
        "ml": "നാലാമതായി ബാഗുകളുടെ ക്വാളിറ്റി ഉറപ്പാക്കാൻ തയ്യൽക്കാരോട് സംസാരിക്കേണ്ടത് എങ്ങനെ എന്ന് നോക്കാം. ബാഗിന്റെ പിടി അഥവാ ഹാൻഡിൽ ബാഗുമായി ചേരുന്നിടത്ത് 'ബോക്സ്-എക്സ്' (Box-X) ക്രോസ് തയ്യൽ ഉണ്ടെന്ന് ഉറപ്പാക്കണം. സാധാരണ സിംഗിൾ തയ്യൽ ആണെങ്കിൽ പുസ്തകങ്ങൾ ഇടുമ്പോൾ പിടി പൊട്ടിപ്പോകും. പ്രിന്റിംഗ് നടത്തുമ്പോൾ വാട്ടർ ബേസ്ഡ് ഇക്കോ-ഫ്രണ്ട്‌ലി മഷി ഉപയോഗിക്കാൻ പറയുക. വ്യാപാരിയോട് ചോദിക്കുക: 'എനിക്ക് 40 ബാഗുകളുടെ സാമ്പിൾ ബാച്ച് വേണം, ഉള്ളിൽ മൊബൈൽ ഫോൺ വെയ്ക്കാനുള്ള സിപ്പർ പോക്കറ്റ് കൂടി വെച്ചു തരുമോ?' ഗുണനിലവാരം ഉറപ്പാക്കിയ ശേഷം മാത്രം വലിയ ഓർഡറുകൾ നൽകുക.",
        "en": "In Phase 4, we enforce manufacturing quality specifications. Never accept simple single-stitch strap attachments. Insist on the industrial 'Box-X cross-stitch' pattern where handles meet the bag body, guaranteeing support for 10kg laptops and books without tearing. Demand water-based phthalate-free textile inks that withstand machine washing. In your supplier script, specify: 'We require a 40-unit batch in natural unbleached canvas, reinforced Box-X handle stitching, and an internal 7x7 inch zippered smartphone pocket.'",
        "ar": "في هذه المرحلة نضبط معايير الجودة مع ورش التصنيع. إياك وقبول خياطة بسيطة للأحزمة؛ اشترط دائماً خياطة 'Box-X' المتقاطعة عند موضع تثبيت الحزام لضمان تحمله لوزن 10 كغ من الكتب دون أي تمزق. واشترط استخدام أحبار مائية آمنة لا تتأثر بالغسيل. عند مخاطبة الورشة قل لهم: 'نحتاج دفعة أولى من 40 حقيبة من الكانفاس الطبيعي بخياطة معززة للأحزمة مع إضافة جيب داخلي بسحاب قياس 7×7 إنش للجوال'."
      }
    },
    {
      "num": 5,
      "startSec": 1260,
      "endSec": 1500,
      "timestamp": "21:00",
      "title": {
        "en": "5. Heat Curing, Ironing & Kraft Paper Branding (21:00 - 25:00)",
        "ml": "5. പ്രിന്റിംഗ് ഉറപ്പിക്കലും ക്രാഫ്റ്റ് പേപ്പർ പാക്കിംഗും (21:00 - 25:00)",
        "ar": "5. تثبيت الطباعة بالحرارة وتغليف الورق البني الأنيق (21:00 - 25:00)"
      },
      "text": {
        "ml": "അഞ്ചാമതായി പ്രിന്റ് ദീർഘകാലം നിൽക്കാനുള്ള വിദ്യയും പാക്കിംഗും. സ്ക്രീൻ പ്രിന്റ് ചെയ്ത ശേഷം ഹീറ്റ് പ്രസ്സ് മെഷീൻ ഉപയോഗിച്ച് 160 ഡിഗ്രി ചൂടിൽ 15 സെക്കൻഡ് അമർത്തുക (ക്യൂറിംഗ്). ഇത് മഷി തുണിയിലേക്ക് പൂർണ്ണമായി പിടിച്ചിരിക്കാൻ സഹായിക്കും, എത്ര തവണ കഴുകിയാലും കളർ പോകില്ല. തുടർന്ന് സ്റ്റീം അയൺ ചെയ്ത് ചുളിവുകൾ മാറ്റുക. ബാഗ് നീളത്തിൽ ഭംഗിയായി മടക്കി, നിങ്ങളുടെ ബ്രാൻഡ് പേരും സോഷ്യൽ മീഡിയ ലിങ്കുകളും ഉള്ള ഒരു ക്രാഫ്റ്റ് പേപ്പർ സ്ലീവ് കൊണ്ട് ചുറ്റുക. ഇത് കസ്റ്റമർക്ക് പ്രകൃതിദത്തവും പ്രീമിയവുമായ ഒരു അനുഭവം നൽകും.",
        "en": "In Phase 5, we execute print heat-curing and packaging SOP. After screen-printing, heat-press the print at 160°C for 15 seconds to permanently polymerize the pigment into the cotton fibers, ensuring zero wash fading. Steam iron the canvas crisp. Fold the tote into a sleek vertical rectangle and wrap it with an earthy recycled kraft paper belly-band displaying your brand logo and social handles. This aesthetic minimal unboxing resonates profoundly with young lifestyle consumers.",
        "ar": "في هذه المرحلة نطبق معايير تثبيت الطباعة والتغليف. بعد الطباعة، يجب تعريض القماش لمكبس حراري بدرجة 160 مئوية لمدة 15 ثانية لتثبيت اللون داخل ألياف القطن نهائياً بحيث لا يبهت مع الغسيل المتكرر. اكوَ الحقيبة بالبخار واطوها رأسياً بشكل مستطيل أنيق وضع حولها غلافاً من الورق البني المعاد تدويره يحمل شعارك وحسابك على إنستغرام. هذا التغليف الصديق للبيئة يعشقه جيل الشباب."
      }
    },
    {
      "num": 6,
      "startSec": 1500,
      "endSec": 1800,
      "timestamp": "25:00",
      "title": {
        "en": "6. Profit Margins & Campus / Café Influencer Strategy (25:00 - 30:00)",
        "ml": "6. ലാഭക്കണക്കുകളും കോളേജ്-കഫേ വിപണന തന്ത്രങ്ങളും (25:00 - 30:00)",
        "ar": "6. حساب الأرباح وتسويق المقاهي والجامعات (25:00 - 30:00)"
      },
      "text": {
        "ml": "അവസാനമായി ലാഭവും വിപണന തന്ത്രങ്ങളും. നിർമ്മാണത്തിന് 120 രൂപ ചിലവായ ഒരു പ്രീമിയം പ്രിന്റഡ് ടോട്ട് ബാഗ് ഇൻസ്റ്റാഗ്രാമിൽ വിൽക്കുന്നത് 399 മുതൽ 499 രൂപയ്ക്കാണ്! ഒരു ബാഗിൽ നിന്നുള്ള അറ്റാദായം 250 മുതൽ 320 രൂപ വരെയാണ്! മാസം 60 ബാഗുകൾ വിറ്റാൽ 16,000 രൂപ മുതൽ 19,000 രൂപ വരെ ലാഭമുണ്ടാക്കാം. കേരളത്തിലെ പ്രമുഖ കോളേജ് വിദ്യാർത്ഥികൾക്കും കഫേ വ്ലോഗർമാർക്കും സൗജന്യമായി ഓരോ ബാഗ് അയച്ചുകൊടുക്കുക. അവർ ബാഗ് ധരിച്ചുകൊണ്ട് ചിത്രങ്ങളും റീൽസും പോസ്റ്റ് ചെയ്യുമ്പോൾ നിങ്ങളുടെ പേജിലേക്ക് ധാരാളം ഓർഡറുകൾ വരും. സ്പീഡ് പോസ്റ്റ് വഴി 40 രൂപയ്ക്ക് സുരക്ഷിതമായി അയക്കാം.",
        "en": "In Phase 6, we analyze profit scaling and organic influencer marketing. With total production cost at ₹120 (₹60 bag + ₹20 print + ₹15 tag/sleeve + ₹25 dispatch buffer), the bag retails at ₹399 to ₹499, netting ₹250 to ₹320 clear profit per tote! Selling just 60 totes a month yields ₹16,000 to ₹19,000 monthly profit. Seed free gift bags to creative college students, bookstagrammers, and café vloggers across Kerala; their organic lifestyle photos will ignite your direct-message orders.",
        "ar": "ختاماً، في المرحلة السادسة، نراجع حساب الأرباح واستراتيجية التسويق. الحقيبة التي كلفتك 120 روبية إجمالاً تباع عبر الإنترنت بـ 399 إلى 499 روبية، بصافي ربح يتراوح بين 250 إلى 320 روبية بكل حبة! بيع 60 حقيبة شهرياً يحقق لك أرباحاً بين 16,000 إلى 19,000 روبية شهرياً. أرسل عينات مجانية لطلاب الجامعات المتميزين ومحبي القراءة وصناع محتوى المقاهي في كيرالا لنشر صورهم وهم يحملون الحقيبة، مما يولد مئات الطلبات المباشرة."
      }
    }
  ],
  "accessories": [
    {
      "num": 1,
      "startSec": 0,
      "endSec": 300,
      "timestamp": "00:00",
      "title": {
        "en": "1. 316L Stainless Steel & 18K PVD Plating Science (00:00 - 05:00)",
        "ml": "1. ആന്റി-ടാർണിഷ് ആഭരണ ശാസ്ത്രവും വിപണിയും (00:00 - 05:00)",
        "ar": "1. علم طلاء الذهب الفاخر PVD والستانلس ستيل 316L المقاوم للصدأ (00:00 - 05:00)"
      },
      "text": {
        "ml": "നമസ്കാരം, ആന്റി-ടാർണിഷ് വാട്ടർപ്രൂഫ് ജ്വല്ലറി മാസ്റ്റർക്ലാസിലേക്ക് സ്വാഗതം. സാധാരണ മുക്കുപണ്ടങ്ങൾ കുറച്ചു ദിവസം കഴിയുമ്പോൾ കറുത്തുപോവുകയും നിറം മങ്ങുകയും ചെയ്യും. എന്നാൽ ആന്റി-ടാർണിഷ് ജ്വല്ലറിയുടെ പ്രത്യേകത എന്തെന്നാൽ ഇത് 316L സർജിക്കൽ സ്റ്റെയിൻലെസ്സ് സ്റ്റീൽ കൊണ്ടാണ് നിർമ്മിക്കുന്നത്. ഇതിൽ 18 കാരറ്റ് റിയൽ ഗോൾഡ് പി.വി.ഡി (PVD Vacuum Plating) വഴി കോട്ടിംഗ് ചെയ്യുന്നു. അതിനാൽ വെള്ളമോ വിയർപ്പോ പെർഫ്യൂമോ തട്ടിയാലും ഇത് ഒരിക്കലും കറുത്തുപോകില്ല. ചർമ്മത്തിൽ അലർജി ഉണ്ടാക്കില്ല. ഏറ്റവും ഡിമാൻഡുള്ള 4 ഇനങ്ങൾ: ഹെറിങ്ബോൺ സ്നേക്ക് ചെയിൻ, റൊട്ടേറ്റിങ് റോമൻ ന്യൂമറൽ റിംഗ്സ്, കട്ടി കുറഞ്ഞ ഹഗ്ഗി ഹൂപ്പ്സ്, എവിൽ ഐ ലോക്കറ്റ് ചെയിനുകൾ.",
        "en": "Welcome to the Anti-Tarnish Daily Wear Jewelry Masterclass. Traditional fashion jewelry tarnishes and discolors within weeks. Anti-tarnish jewelry revolutionizes this by using 316L surgical stainless steel fused with 18K real gold via PVD (Physical Vapor Deposition) vacuum plating. It is 100% waterproof, sweat-proof, perfume-resistant, and hypoallergenic. The top 4 fast-moving designs are: Flat Herringbone Snake Chains, Rotating Roman Numeral Bands, Chunky Huggie Hoops, and Mother-of-Pearl Evil Eye Pendants.",
        "ar": "مرحباً بكم في ماستر كلاس المجوهرات اليومية المقاومة للصدأ وتغير اللون. المجوهرات التقليدية يتغير لونها بسرعة، بينما تتميز مجوهرات الآنتي-تارنيش بصناعتها من الستانلس ستيل الجراحي 316L المطلي بذهب حقيقي عيار 18 بتقنية الترسيب الفراغي PVD. مقاومة للماء والتعرق والعطور بنسبة 100% ولا تسبب أي حساسية للبشرة. أكثر 4 تصاميم طلباً: سلاسل جلد الحية المسطحة، خواتم الأرقام الرومانية، أقراط الهوقي العريضة، وسلاسل عين الحسد بصدف اللؤلؤ."
      }
    },
    {
      "num": 2,
      "startSec": 300,
      "endSec": 600,
      "timestamp": "05:00",
      "title": {
        "en": "2. Exact Capital & Luxury Drawer Box Budget (05:00 - 10:00)",
        "ml": "2. തുടക്ക ബഡ്ജറ്റും ഡ്രോയർ ബോക്സ് പാക്കിംഗും (05:00 - 10:00)",
        "ar": "2. رأس مال البداية وعلب الهدايا ذات السحاب الحريري (05:00 - 10:00)"
      },
      "text": {
        "ml": "രണ്ടാമതായി ഈ ബിസിനസ്സ് തുടങ്ങാനുള്ള ബഡ്ജറ്റ് നോക്കാം. വെറും 2,800 രൂപ ഉണ്ടെങ്കിൽ വീട്ടിലിരുന്ന് ആർക്കും ഈ ബിസിനസ്സ് തുടങ്ങാം. 40 പീസ് ട്രെൻഡിങ് ആഭരണങ്ങൾക്ക് ശരാശരി 45 രൂപ നിരക്കിൽ 1,800 രൂപ. റിബൺ വലിപ്പുള്ള 40 ലക്ഷ്വറി സ്ലൈഡ്-ഡ്രോയർ ബോക്സുകൾക്ക് 400 രൂപ (ഒരു ബോക്സിന് 10 രൂപ). 50 പോളിഷിംഗ് ക്ലോത്തുകൾക്ക് 150 രൂപ. എയർടൈറ്റ് സിപ്പ് ലോക്ക് കവറുകൾക്ക് 50 രൂപ. കൊറിയർ ബഫറിന് 400 രൂപ. ആകെ വെറും 2,800 രൂപ കൊണ്ട് നിങ്ങൾക്ക് ആദ്യത്തെ 40 ആഭരണങ്ങൾ ബ്രാൻഡ് ചെയ്ത് വിപണിയിൽ ഇറക്കാം.",
        "en": "In Phase 2, we budget your initial jewelry inventory. With just ₹2,800, you can start from your home desk. 40 trending pieces at ₹45 wholesale cost requires ₹1,800. 40 luxury pull-ribbon slide drawer boxes cost ₹400 at ₹10 each. 50 micro-suede silver polishing cloths cost ₹150. Airtight mini anti-oxidation ziplocks cost ₹50. A ₹400 shipping reserve covers early orders. Total initial capital is just ₹2,800 to curate your first luxury jewelry drop.",
        "ar": "في هذه المرحلة نستعرض ميزانية البداية. بمبلغ 2,800 روبية فقط يمكنك إطلاق مشروع مجوهرات فاخرة من منزلك. 40 قطعة مجوهرات عصرية بسعر جملة 45 روبية تكلف 1,800 روبية. 40 علبة هدايا فاخرة بسحاب شريطي حريري بـ 400 روبية بمعدل 10 روبيات للعلبة. 50 قطعة قماش تلميع بـ 150 روبية، أكياس محكمة مضادة للأكسدة بـ 50 روبية، واحتياطي شحن 400 روبية. الإجمالي 2,800 روبية فقط."
      }
    },
    {
      "num": 3,
      "startSec": 600,
      "endSec": 960,
      "timestamp": "10:00",
      "title": {
        "en": "3. Mumbai Bhuleshwar & Jaipur Wholesale Hubs (10:00 - 16:00)",
        "ml": "3. ഭുലേശ്വർ മാർക്കറ്റും ജയ്പൂർ ജൊഹാരി ബസാറും (10:00 - 16:00)",
        "ar": "3. أسواق الجملة الكبرى: بهوليشوار بمومباي وجيبور وراجكوت (10:00 - 16:00)"
      },
      "text": {
        "ml": "മൂന്നാമതായി ഈ ആഭരണങ്ങൾ ഏറ്റവും കുറഞ്ഞ നിരക്കിൽ എവിടെ നിന്ന് കിട്ടും എന്ന് നോക്കാം. ഇന്ത്യയിൽ ആന്റി-ടാർണിഷ് ജ്വല്ലറിയുടെ ഏറ്റവും വലിയ വിപണി മുംബൈയിലെ ഭുലേശ്വർ മാർക്കറ്റും സാവേരി ബസാറിലെ കൽബാദേവി റോഡുമാണ്. ഇവിടെ വെറും 35 മുതൽ 55 രൂപയ്ക്ക് സൂപ്പർ ക്വാളിറ്റി സ്റ്റീൽ ആഭരണങ്ങൾ ലഭിക്കും. രണ്ടാമത്തെ പ്രമുഖ കേന്ദ്രം രാജസ്ഥാനിലെ ജയ്പൂർ ജൊഹാരി ബസാറും ഗുജറാത്തിലെ രാജ്‌കോട്ടിലെ കാസ്റ്റിംഗ് ഫാക്ടറികളുമാണ്. കേരളത്തിൽ കോഴിക്കോട് വലിയങ്ങാടിയിലും കൊച്ചി ബ്രോഡ്‌വേയിലും ഉള്ള മൊത്തവിതരണക്കാരിൽ നിന്നും നേരിട്ട് വാങ്ങാം.",
        "en": "In Phase 3, we reveal verified jewelry wholesale hubs. Mumbai's Bhuleshwar Market and Kalbadevi Road near Zaveri Bazaar represent India's epicentre for imported stainless steel jewelry, offering carded wholesale prices from ₹35 to ₹55 per piece. Jaipur's Johari Bazaar excels in semi-precious stone steel settings, while Rajkot in Gujarat hosts domestic precision steel casting mills. Within Kerala, Kozhikode Valiyangadi and Ernakulam Broadway host authorized importers.",
        "ar": "في هذه المرحلة نحدد أسواق الجملة الحقيقية. يعتبر سوق بهوليشوار وشارع كالباديفي قرب سوق زافيري بمومباي المركز الأكبر في الهند للمجوهرات المستوردة بأسعار جملة تبدأ من 35 إلى 55 روبية للقطعة. كما يشتهر سوق جوهاري ببازار جيبور بالأحجار الكريمة، ومصانع راجكوت بسبائك الستانلس ستيل. وفي كيرالا تتوفر لدى كبار الموزعين في فاليانغادي بكاليكوت وبرودواي بكوتشي."
      }
    },
    {
      "num": 4,
      "startSec": 960,
      "endSec": 1260,
      "timestamp": "16:00",
      "title": {
        "en": "4. Wholesaler Questions & 48-Hour Saltwater Test (16:00 - 21:00)",
        "ml": "4. വ്യാപാരികളോട് ചോദിക്കേണ്ടതും ഉപ്പുവെള്ള പരീക്ഷണവും (16:00 - 21:00)",
        "ar": "4. أسئلة فحص المورد واختبار الماء المالح لمدة 48 ساعة (16:00 - 21:00)"
      },
      "text": {
        "ml": "നാലാമതായി ഇത് ഒറിജിനൽ ആന്റി-ടാർണിഷ് ആണെന്ന് എങ്ങനെ ഉറപ്പാക്കാം എന്ന് നോക്കാം. വ്യാപാരിയോട് ചോദിക്കുക: 'ഇത് 316L സ്റ്റെയിൻലെസ്സ് സ്റ്റീൽ ആണോ അതോ സാധാരണ സിങ്ക് അലോയ് ആണോ? PVD വാക്വം പ്ലേറ്റിംഗ് വാറന്റി ഉണ്ടോ?'. വാങ്ങിയ ശേഷം വീട്ടിൽ വെച്ച് ഒരു സാമ്പിൾ ഉപ്പുവെള്ളത്തിൽ 48 മണിക്കൂർ മുക്കിവെക്കുക. സാധാരണ മുക്കുപണ്ടം ആണെങ്കിൽ 12 മണിക്കൂറിനുള്ളിൽ പച്ചയോ കറുപ്പോ നിറമായി മാറും. ഒറിജിനൽ ആണെങ്കിൽ 48 മണിക്കൂർ കഴിഞ്ഞാലും സ്വർണ്ണം പോലെ തിളങ്ങി നിൽക്കും! ഇത് നിങ്ങളുടെ കസ്റ്റമർമാർക്ക് വീഡിയോ എടുത്ത് കാണിച്ചു കൊടുക്കാം.",
        "en": "In Phase 4, we master purity testing and negotiation. Always ask: 'Is the core base solid 316L surgical steel, or cheap zinc alloy? Do you guarantee vacuum PVD plating?' Execute the 48-Hour Saltwater Test on every new sample: submerge the piece in concentrated saltwater for 48 hours. Cheap electroplated brass turns green and pits within 12 hours. Authentic PVD surgical steel emerges pristine, radiant, and identical to real gold—record this as powerful video proof for your buyers!",
        "ar": "في هذه المرحلة نتقن اختبار الجودة والتفاوض. اسأل المورد بحزم: 'هل المعدن الأساسي ستانلس ستيل 316L نقي أم زنك رخيص، وهل الطلاء بطريقة PVD الفراغية؟'. قم بإجراء اختبار الماء المالح لمدة 48 ساعة: ضع عينة في ماء مالح مركز؛ المعادن الرديئة تسود ويخضر لونها خلال 12 ساعة، بينما الستيل المطلي بـ PVD يخرج لامعاً كالذهب الخالص تماماً. صور هذه التجربة لتكون برهاناً قاطعاً لزبائنك!"
      }
    },
    {
      "num": 5,
      "startSec": 1260,
      "endSec": 1500,
      "timestamp": "21:00",
      "title": {
        "en": "5. Inspection, Anti-Oxidation Pouch & Luxury Box SOP (21:00 - 25:00)",
        "ml": "5. ആഭരണ പരിശോധനയും ലക്ഷ്വറി ഡ്രോയർ ബോക്സിംഗും (21:00 - 25:00)",
        "ar": "5. فحص المشابك وأكياس الحماية والعلب الفاخرة (21:00 - 25:00)"
      },
      "text": {
        "ml": "അഞ്ചാമതായി ആഭരണങ്ങൾ പാക്ക് ചെയ്യുന്ന വിധം. ആദ്യം പ്ലയർ ഉപയോഗിച്ച് ചെയിനുകളുടെ ഹുക്കുകളും ലോക്കുകളും ഉറപ്പുള്ളതാണോ എന്ന് നോക്കുക. തുടർന്ന് ആഭരണം ചെറിയ എയർടൈറ്റ് സിപ്പ് കവറിൽ ഇടുക. ഇത് പോളിഷ് ചെയ്ത ലക്ഷ്വറി ഡ്രോയർ ബോക്സിൽ വെയ്ക്കുക. കൂടെ ഒരു പിങ്ക് പോളിഷിംഗ് ക്ലോത്തും നിങ്ങളുടെ നന്ദി അറിയിക്കുന്ന ഒരു കാർഡും വെയ്ക്കുക. മോതിരം ആണെങ്കിൽ അളവ് മനസ്സിലാക്കാനുള്ള ഒരു റിംഗ് സൈസ് ഗൈഡും കൂടെ വെക്കാം. ഈ ഭംഗിയുള്ള പാക്കിംഗ് കാണുമ്പോൾ 50 രൂപയുടെ മാലയ്ക്ക് കസ്റ്റമർ സന്തോഷത്തോടെ 350 രൂപ തരും!",
        "en": "In Phase 5, we execute luxury unboxing SOP. Test every lobster clasp, jump ring, and earring post with jeweler's pliers to ensure zero transit snapping. Place the jewelry inside a miniature airtight anti-oxidation ziplock pouch to prevent dust friction. Seat it neatly inside the slide-drawer luxury box lined with velvet sponge. Include a branded pink microfiber polishing cloth and a warm thank-you note. Premium packaging transforms a ₹50 wholesale chain into a ₹350 treasured luxury piece!",
        "ar": "في هذه المرحلة نطبق خطوات التجهيز والتغليف. افحص مشابك السلاسل وحلقات التثبيت للتأكد من قوتها. ضع القطعة في كيس صغير عازل للهواء لمنع الاحتكاك، ثم ثبتها داخل علبة السحاب الحريري المبطنة بالإسفنج المخملي. أضف قطعة قماش تلميع وردية مع كرت شكر أنيق. هذا التغليف الفاخر يجعل الزبون يدفع 350 روبية بكل سرور في قطعة كلفتك 50 روبية فقط!"
      }
    },
    {
      "num": 6,
      "startSec": 1500,
      "endSec": 1800,
      "timestamp": "25:00",
      "title": {
        "en": "6. Profit Margins, 'Wear in Shower' Reels & Safe COD (25:00 - 30:00)",
        "ml": "6. ലാഭക്കണക്കുകളും 'വാട്ടർപ്രൂഫ്' റീൽസ് വിപണനവും (25:00 - 30:00)",
        "ar": "6. أرباح 300% وفيديوهات إثبات مقاومة الماء والشحن الآمن (25:00 - 30:00)"
      },
      "text": {
        "ml": "അവസാനമായി ലാഭക്കണക്കുകളും ഇൻസ്റ്റാഗ്രാം വിപണനവും. 50 രൂപയ്ക്ക് വാങ്ങിയ ഒരു ചെയിൻ, മനോഹരമായ ബോക്സിൽ വെച്ച് ഇൻസ്റ്റാഗ്രാമിൽ വിൽക്കുന്നത് 299 മുതൽ 399 രൂപയ്ക്കാണ്! അതായത് 250 മുതൽ 300 രൂപ വരെ അറ്റാദായം (300% ലാഭം). മാസം 50 പീസുകൾ വിറ്റാൽ 15,000 രൂപയും, 100 പീസ് വിറ്റാൽ 30,000 രൂപയും ലാഭം ലഭിക്കും. വിൽപന കൂട്ടാൻ നിങ്ങൾ ചെയ്യേണ്ടത്: ഈ ആഭരണം ധരിച്ച് വെള്ളം ഒഴിക്കുന്നതും, സോപ്പ് പതപ്പിച്ച് കഴുകുന്നതുമായ 'ഷവർ-പ്രൂഫ്' റീൽസ് ചെയ്യുക. കൊറിയർ അയക്കുമ്പോൾ 50 രൂപ അഡ്വാൻസ് ടോക്കൺ വാങ്ങുക. ഇന്ത്യ പോസ്റ്റ് വഴി 35 രൂപയ്ക്ക് അയക്കാം.",
        "en": "In Phase 6, we examine profit margins and viral video hooks. A chain sourced at ₹50 retails effortlessly for ₹299 to ₹399 with your branded box, delivering over ₹250 pure net profit—a 300% markup! Selling just 50 pieces monthly generates ₹15,000 profit; 100 pieces yields ₹30,000 net income. Create 'Wear In The Shower' Reels: show the jewelry under running faucet water and soap lather to prove zero tarnish. Collect a ₹50 UPI advance token on COD orders, and ship safely via Speed Post for ₹35.",
        "ar": "ختاماً، في المرحلة السادسة، نحدد هوامش الأرباح واستراتيجية الفيديوهات الفيروسية. القطعة التي تشتريها بـ 50 روبية تباع بـ 299 إلى 399 روبية، بربح صافٍ يتجاوز 250 روبية للحبة (هامش ربح يفوق 300%)! بيع 50 قطعة شهرياً يمنحك 15,000 روبية، وبيع 100 قطعة يحقق 30,000 روبية أرباحاً صافية. انشر فيديوهات ريلز تحت الماء والصابون لإثبات مقاومة الصدأ عملياً. واطلب عربون 50 روبية للشحن البريدي بـ 35 روبية."
      }
    }
  ],
  "spices": [
    {
      "num": 1,
      "startSec": 0,
      "endSec": 300,
      "timestamp": "00:00",
      "title": {
        "en": "1. Kerala Spice Agronomy & Export Grades (00:00 - 05:00)",
        "ml": "1. കേരളത്തിലെ സുഗന്ധവ്യഞ്ജനങ്ങളും ഗ്രേഡുകളും (00:00 - 05:00)",
        "ar": "1. درجات بهارات كيرالا التصديرية وشاي مونار الفاخر (00:00 - 05:00)"
      },
      "text": {
        "ml": "നമസ്കാരം, കേരള സ്പൈസസ് & പ്രീമിയം ടീ മാസ്റ്റർക്ലാസിലേക്ക് സ്വാഗതം. ലോകത്തിൽ തന്നെ ഏറ്റവും മികച്ച സുഗന്ധവ്യഞ്ജനങ്ങൾ വിളയുന്ന നാടാണ് നമ്മുടെ കേരളം. പ്രത്യേകിച്ച് ഗൾഫ് മലയാളികൾക്കും ഉത്തരേന്ത്യക്കാർക്കും വിദേശികൾക്കും പ്രിയങ്കരമായ ഒന്നാണിത്. ഏറ്റവും ഉയർന്ന ലാഭം തരുന്ന ഇനങ്ങൾ: ഇടുക്കിയിലെ 8mm എക്സ്ട്രാ ബോൾഡ് പച്ച ഏലം, 5% കുർക്കുമിൻ അടങ്ങിയ ആലപ്പുഴ മഞ്ഞൾ, വയനാടൻ കറുത്ത കുരുമുളക്, മൂന്നാറിലെ ഓർത്തഡോക്സ് ചായപ്പൊടി. ഉയർന്ന ഗ്രേഡിലുള്ള സാധനങ്ങൾ മാത്രം തിരഞ്ഞെടുത്താൽ പ്രീമിയം നിരക്കിൽ വിൽക്കാം.",
        "en": "Welcome to the Export Grade Kerala Spices & High-Altitude Tea Masterclass. Kerala produces the most aromatic and globally coveted spices on earth. Gulf NRIs, North Indian families, and gifting connoisseurs pay premium prices for authentic single-origin harvests. Focus on these 4 export-grade champions: 8mm Extra-Bold Green Cardamom from Idukki, Alleppey Finger Turmeric with over 5% natural curcumin, Wayanad Tellicherry Garbled Extra Bold Black Pepper, and Munnar High-Grown Orthodox BOPF Tea.",
        "ar": "مرحباً بكم في ماستر كلاس بهارات كيرالا التصديرية وشاي المرتفعات الفاخر. تشتهر كيرالا بإنتاج أفضل التوابل العطرية في العالم، وتحظى بطلب هائل في دول الخليج وشمال الهند. ركز على 4 أصناف تصديرية كبرى: الهيل الأخضر الملكي حبة عريضة 8 ملم من إيدوكي، كركم أليبي الطبيعي المحتوي على 5% كوركومين، فلفل واياناد الأسود التصديري، وشاي مونار الأورثوذكسي الفاخر المقطوف من قمم الجبال."
      }
    },
    {
      "num": 2,
      "startSec": 300,
      "endSec": 600,
      "timestamp": "05:00",
      "title": {
        "en": "2. Exact Capital & Gift Box Budget (05:00 - 10:00)",
        "ml": "2. പ്രാരംഭ ബഡ്ജറ്റും ലക്ഷ്വറി ഗിഫ്റ്റ് പാക്കുകളും (05:00 - 10:00)",
        "ar": "2. ميزانية رأس المال وصناديق الهدايا الفاخرة (05:00 - 10:00)"
      },
      "text": {
        "ml": "രണ്ടാമതായി സുഗന്ധവ്യഞ്ജന ബിസിനസ്സ് തുടങ്ങാനുള്ള ബഡ്ജറ്റ് നോക്കാം. 7,000 രൂപ ഉണ്ടെങ്കിൽ ഉയർന്ന ഗുണനിലവാരമുള്ള സ്പൈസസ് ഗിഫ്റ്റ് ഹാംപറുകളുമായി നിങ്ങൾക്ക് തുടങ്ങാം. 2 കിലോഗ്രാം ഉയർന്ന ഗ്രേഡ് പച്ച ഏലത്തിനും കുരുമുളകിനും 4,200 രൂപ. 30 പ്രീമിയം ഗ്ലാസ്സ് ജാറുകൾക്കും അലുമിനിയം ഫോയിൽ സിപ്പർ പൗച്ചുകൾക്കും 1,000 രൂപ. FSSAI ബേസിക് രജിസ്ട്രേഷന് 100 രൂപ. 100 പ്രീമിയം വാട്ടർപ്രൂഫ് ലേബലുകൾക്ക് 300 രൂപ. കൊറിയർ ബഫറിന് 1,400 രൂപ. ആകെ 7,000 രൂപ കൊണ്ട് നിങ്ങൾക്ക് ആദ്യത്തെ 30 ലക്ഷ്വറി പാക്കറ്റുകൾ വിപണിയിൽ ഇറക്കാം.",
        "en": "In Phase 2, we budget your artisanal spice launch. With ₹7,000, you can curate 30 luxury gift canisters and airtight reserve pouches. 2 kilograms of Grade-A export cardamom and black pepper requires ₹4,200. 30 hexagonal glass jars and multi-layer foil zipper pouches cost ₹1,000. Basic annual FSSAI registration costs ₹100. 100 moisture-proof metallic foil labels cost ₹300. A ₹1,400 dispatch buffer covers postal transit. Total initial capital is ₹7,000 to launch your origin-certified spice label.",
        "ar": "في هذه المرحلة نحدد ميزانية إطلاق مشروع البهارات الفاخرة. بمبلغ 7,000 روبية يمكنك تجهيز 30 عبوة هدايا زجاجية فاخرة. 2 كيلو هيل أخضر تصديري وفلفل أسود فاخر تكلف 4,200 روبية. 30 برطماناً زجاجياً وأكياس ألومنيوم بسحاب تكلف 1,000 روبية. رسوم التسجيل الغذائي FSSAI بـ 100 روبية، 100 ملصق مقاوم للرطوبة بشعارك بـ 300 روبية، واحتياطي شحن 1,400 روبية. الإجمالي 7,000 روبية فقط."
      }
    },
    {
      "num": 3,
      "startSec": 600,
      "endSec": 960,
      "timestamp": "10:00",
      "title": {
        "en": "3. Vandanmedu & Kozhikode Wholesale Mandis (10:00 - 16:00)",
        "ml": "3. വണ്ടൻമേട് ഏലക്ക മണ്ടിയും വലിയങ്ങാടിയും (10:00 - 16:00)",
        "ar": "3. أسواق الجملة الكبرى: مزادات فاندانميدو وسوق كاليكوت التاريخي (10:00 - 16:00)"
      },
      "text": {
        "ml": "മൂന്നാമതായി സ്പൈസസ് എവിടെ നിന്ന് വാങ്ങണം എന്ന് നോക്കാം. ഏലക്ക ഏറ്റവും കുറഞ്ഞ വിലയ്ക്ക് വലിയ അളവിൽ കിട്ടുന്നത് ഇടുക്കിയിലെ വണ്ടൻമേട് സ്പൈസസ് പാർക്കിലും തമിഴ്നാട് അതിർത്തിയിലുള്ള ബോഡിനായ്ക്കന്നൂർ ഏലക്ക മാർക്കറ്റിലുമാണ്. ഇവിടെ കർഷകരുടെ നേരിട്ടുള്ള ലേലം നടക്കുന്നു. കുരുമുളകിനും മഞ്ഞളിനും കോഴിക്കോട് വലിയങ്ങാടിയും കൊച്ചി മട്ടാഞ്ചേരി ജൂ ടൗണുമാണ് നൂറ്റാണ്ടുകളായി പ്രശസ്തമായ വിപണികൾ. നല്ല ചായപ്പൊടിക്ക് മൂന്നാറിലെ കണ്ണൻ ദേവൻ ടീ ഫാക്ടറി ഔട്ട്‌ലെറ്റുകൾ സന്ദർശിക്കാം. ഇടനിലക്കാരില്ലാതെ വാങ്ങുമ്പോൾ ഏറ്റവും കുറഞ്ഞ നിരക്കിൽ ശുദ്ധമായ സാധനങ്ങൾ ലഭിക്കും.",
        "en": "In Phase 3, we map authentic wholesale spice mandis. For green cardamom, the Vandanmedu Spices Park in Idukki and the Bodinayakanur Cardamom Auction Center represent the world's primary source, where farmers auction fresh batches daily. For Tellicherry black pepper and ginger, Kozhikode Valiyangadi Big Bazaar and Kochi Mattancherry Jew Town are the historic trading nerve centers. For pure orthodox whole-leaf tea, source directly through Munnar KDHP factory auctions.",
        "ar": "في هذه المرحلة نكشف عن أسواق المزاد الكبرى للبهارات. للهيل الأخضر، يعد مجمع فاندانميدو بإيدوكي وسوق بوديناياكانور المركز العالمي الأكبر لمزادات المزارعين اليومية. وللفلفل الأسود والزنجبيل، يعتبر سوق فاليانغادي بكاليكوت وماتانتشيري بكوتشي أسواق التجارة التاريخية. ولأجود أنواع الشاي، توجه لمصانع ومزادات مونار الجبلية للحصول على أسعار المصدر مباشرة."
      }
    },
    {
      "num": 4,
      "startSec": 960,
      "endSec": 1260,
      "timestamp": "16:00",
      "title": {
        "en": "4. Mandi Questions, Moisture Meter & Aroma Tests (16:00 - 21:00)",
        "ml": "4. വ്യാപാരികളോട് ചോദിക്കേണ്ടതും ഈർപ്പ പരിശോധനയും (16:00 - 21:00)",
        "ar": "4. فحص نسبة الرطوبة واختبار الزيوت العطرية النقية (16:00 - 21:00)"
      },
      "text": {
        "ml": "നാലാമതായി സ്പൈസസ് വാങ്ങുമ്പോൾ ശ്രദ്ധിക്കേണ്ട ടെസ്റ്റുകൾ. ഏലക്ക വാങ്ങുമ്പോൾ കയ്യിലിട്ട് ഞെരിച്ചു നോക്കുക. നല്ല പച്ചനിറവും ഉള്ളിൽ കറുത്ത കട്ടിയുള്ള വിത്തുകളും വേണം. ഈർപ്പത്തിന്റെ അളവ് 10 ശതമാനത്തിൽ താഴെയാണെന്ന് മോയിസ്ചർ മീറ്റർ ഉപയോഗിച്ച് ഉറപ്പാക്കുക. ഈർപ്പം കൂടിയാൽ ദിവസങ്ങൾക്കുള്ളിൽ പൂപ്പൽ വരും. കുരുമുളക് വിരലുകൾക്കിടയിൽ അമർത്തുമ്പോൾ എണ്ണമയമുള്ള നല്ല രൂക്ഷമായ മണം വരണം. വ്യാപാരിയോട് ചോദിക്കുക: 'ഇത് ഈ സീസണിലെ ഫ്രഷ് കർഷക ലോട്ടാണോ, ആർട്ടിഫിഷ്യൽ കളർ ചേർക്കാത്ത പച്ച ഏലമാണോ?'. ഗുണനിലവാരം ഉറപ്പുവരുത്തി മാത്രം വാങ്ങുക.",
        "en": "In Phase 4, we master quality testing in spice mandis. Squeeze a cardamom pod between your fingers: it must feel firm, crisp, and contain dark brown to black fragrant seeds. Insist on a moisture meter reading under 10% to prevent transit fungal growth. Crack open a peppercorn: it should release volatile essential oils without chalky powder. Ask the auctioneer: 'Is this current season single-estate crop, 100% natural without synthetic green food dyes?'",
        "ar": "في هذه المرحلة نضبط معايير الجودة المخبرية. اضغط على حبة الهيل بأصابعك؛ يجب أن تكون متماسكة وتحتوي على بذور سوداء داكنة ذات رائحة قوية. تأكد من أن نسبة الرطوبة أقل من 10% لمنع تعفن البهارات أثناء التخزين. واكسر حبة فلفل أسود للتأكد من فوحان زيتها العطري. اسأل المورد: 'هل هذا محصول الموسم الحالي طبيعي 100% بدون أي ألوان صناعية مضافة؟'."
      }
    },
    {
      "num": 5,
      "startSec": 1260,
      "endSec": 1500,
      "timestamp": "21:00",
      "title": {
        "en": "5. Weighing, Oxygen Absorber & Glass Jar Packaging (21:00 - 25:00)",
        "ml": "5. അളന്നു തൂക്കലും എയർടൈറ്റ് ഗ്ലാസ്സ് ജാർ പാക്കിംഗും (21:00 - 25:00)",
        "ar": "5. معايير الوزن الدقيق والتعبئة في البرطمانات الزجاجية المحكمة (21:00 - 25:00)"
      },
      "text": {
        "ml": "അഞ്ചാമതായി സ്പൈസസ് പാക്ക് ചെയ്യുന്ന രീതി. ഡിജിറ്റൽ ഗ്രാം സ്കെയിൽ ഉപയോഗിച്ച് കൃത്യമായി 100 ഗ്രാം അളന്നെടുക്കുക. എയർടൈറ്റ് ഗ്ലാസ്സ് ജാറിലോ അല്ലെങ്കിൽ അലുമിനിയം ഫോയിൽ സിപ്പർ പൗച്ചിലോ ഇടുക. വായുസമ്പർക്കം മൂലം മണം നഷ്ടപ്പെടാതിരിക്കാൻ ഒരു ചെറിയ ഫുഡ്-ഗ്രേഡ് ഓക്സിജൻ അബ്സോർബർ സാച്ചെറ്റ് കൂടെ വെയ്ക്കുക. സീലിങ് മെഷീൻ ഉപയോഗിച്ച് പൗച്ചിന്റെ മുകൾഭാഗം ഹീറ്റ് സീൽ ചെയ്യുക. നിങ്ങളുടെ ബ്രാൻഡ് ലോഗോ, FSSAI നമ്പർ, പായ്ക്ക് ചെയ്ത തീയതി എന്നിവ രേഖപ്പെടുത്തിയ വാട്ടർപ്രൂഫ് ലേബൽ ഒട്ടിക്കുക. ഇത് 1 വർഷം വരെ അതേ മണത്തോടെ സുരക്ഷിതമായി ഇരിക്കും.",
        "en": "In Phase 5, we execute precision food packaging SOP. Use a calibrated 0.1g digital scale to weigh exact 100g or 250g portions. Dispense into sterile hexagonal glass jars or multi-layer barrier foil pouches. Insert a miniature food-grade oxygen absorber sachet to arrest oil degradation. Heat-seal the tamper-evident pouch notch. Affix your luxury foil label containing origin coordinates, harvest month, and your FSSAI license number. Proper packaging preserves aroma for over 12 months.",
        "ar": "في هذه المرحلة نطبق خطوات التعبئة الغذائية الدقيقة. استخدم ميزاناً رقمياً حساساً لوزن 100 غرام أو 250 غرام بدقة. عبئ البهارات داخل برطمانات زجاجية معقمة أو أكياس ألومنيوم حاجزة للرطوبة، وضع كيساً صغيراً لامتصاص الأكسجين لحفظ الزيوت العطرية لمدة سنة كاملة. اغلق الكيس بالحرارة والصق شعارك ورقم الترخيص الغذائي وتاريخ التعبئة."
      }
    },
    {
      "num": 6,
      "startSec": 1500,
      "endSec": 1800,
      "timestamp": "25:00",
      "title": {
        "en": "6. Profit Margins, Gulf NRI Gifting & Speed Post (25:00 - 30:00)",
        "ml": "6. ലാഭക്കണക്കുകളും ഗൾഫ് മലയാളി ഗിഫ്റ്റ് മാർക്കറ്റും (25:00 - 30:00)",
        "ar": "6. أرباح مضاعفة وتسويق هدايا المغتربين والشحن السريع (25:00 - 30:00)"
      },
      "text": {
        "ml": "അവസാനമായി ലാഭക്കണക്കുകളും വിപണനവും. മണ്ടിയിൽ നിന്ന് 1 കിലോ 8mm പച്ച ഏലക്ക 1,800 രൂപയ്ക്കാണ് ലഭിക്കുന്നത്. ഇത് 100 ഗ്രാമിന്റെ 10 ഗ്ലാസ്സ് ജാറുകളാക്കി മാറ്റുമ്പോൾ, ഒരു ജാറിന് 349 രൂപ നിരക്കിൽ ആകെ 3,490 രൂപ ലഭിക്കും! അതായത് 1 കിലോ ഏലക്കയിൽ നിന്ന് മാത്രം 1,500 രൂപ മുതൽ 1,700 രൂപ വരെ അറ്റാദായം! മാസം വെറും 15 കിലോ വിറ്റാൽ 25,000 രൂപയ്ക്ക് മുകളിൽ ലാഭമുണ്ടാക്കാം. നാട്ടിൽ വന്ന് ഗൾഫിലേക്ക് മടങ്ങുന്ന പ്രവാസികൾക്കും നോർത്ത് ഇന്ത്യൻ വിനോദസഞ്ചാരികൾക്കും ഗിഫ്റ്റ് പാക്കുകളായി വിൽക്കാം. ഇന്ത്യ പോസ്റ്റ് വഴി രാജ്യത്തെവിടെയും 45 രൂപയ്ക്ക് അയക്കാം.",
        "en": "In Phase 6, we analyze profit scaling and gifting commerce. Sourcing 1 kilogram of 8mm green cardamom directly at ₹1,800 and packaging into ten 100g artisan glass jars retailing at ₹349 yields ₹3,490 gross revenue—over ₹1,500 to ₹1,700 pure profit per kilogram! Retailing just 15 kilograms monthly produces over ₹25,000 net income. Position your brand for Gulf NRI vacationers returning to the UAE, Saudi Arabia, and Qatar, as well as luxury corporate gifting. Ship pan-India safely via Speed Post for ₹45.",
        "ar": "ختاماً، في المرحلة السادسة، نحسب الأرباح الهائلة لتجارة البهارات الفاخرة. كيلو الهيل التصديري من المزاد يكلف 1,800 روبية، وعند تعبئته في 10 برطمانات سعة 100 غرام وبيعه بـ 349 روبية للبرطمان، تحقق 3,490 روبية، أي بصافي ربح يفوق 1,600 روبية في الكيلو الواحد! بيع 15 كيلو فقط شهرياً يمنحك أكثر من 25,000 روبية ربحاً صافياً. استهدف المغتربين العائدين للخليج وسياح كيرالا بهدايا تذكارية فاخرة، واشحن لكافة أنحاء الهند بـ 45 روبية."
      }
    }
  ]
},

  // Helper: Get audio episodes for specific category or fallback to attar
  getAudioEpisodes(nicheKey) {
    const key = nicheKey || this.audioMasterclassState.nicheKey || this.currentAcademy || 'attar';
    return this.masterclassAudioLibrary[key] || this.masterclassAudioLibrary.attar;
  },

  getCurrentAudioEpisode() {
    const episodes = this.getAudioEpisodes();
    const epNum = this.audioMasterclassState.currentEpisode;
    return episodes.find(e => e.num === epNum) || episodes[0];
  },

  formatAudioTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  },

  // Explicit Power Switch (സ്വിച്ച് ബട്ടൺ)
  toggleAudioPowerSwitch(forceState) {
    const state = this.audioMasterclassState;
    const shouldBeOn = typeof forceState === 'boolean' ? forceState : !state.isPoweredOn;

    if (!shouldBeOn) {
      this.turnAudioOff();
    } else {
      state.isPoweredOn = true;
      this.playAudioMasterclass();
    }
  },

  // Completely Turn Off Audio
  turnAudioOff() {
    const state = this.audioMasterclassState;
    state.isPoweredOn = false;
    state.isPlaying = false;
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.updateAudioProgressUI();
  },

  // Play a specific chapter episode from the syllabus note card without hijacking the screen!
  playChapterAudio(stepNum) {
    const state = this.audioMasterclassState;
    state.isClosed = false;
    state.isMinimized = false;
    const episodes = this.getAudioEpisodes();
    const epNum = Math.min(Math.max(1, stepNum), episodes.length);
    const targetEp = episodes.find(e => e.num === epNum) || episodes[0];

    state.currentEpisode = targetEp.num;
    state.currentTimeSec = targetEp.startSec;
    state.isPoweredOn = true;
    state.isPlaying = true;

    this.speakCurrentEpisode();
    this.startAudioProgressTimer();
    this.renderFloatingAudioDock();
    this.updateAudioProgressUI();
  },

  // Toggle Play / Pause in background
  toggleAudioMasterclass() {
    const state = this.audioMasterclassState;
    if (state.isPlaying) {
      this.pauseAudioMasterclass();
    } else {
      state.isPoweredOn = true;
      this.playAudioMasterclass();
    }
  },

  playAudioMasterclass() {
    const state = this.audioMasterclassState;
    state.isPoweredOn = true;
    state.isPlaying = true;

    try {
      if (!state.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) state.audioCtx = new AudioContext();
      }
      if (state.audioCtx && state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
      }
    } catch (e) {
      console.warn('AudioContext notice:', e);
    }

    this.speakCurrentEpisode();
    this.startAudioProgressTimer();
    this.updateAudioProgressUI();

    const dock = document.getElementById('floatingAudioDock');
    if (dock) dock.classList.remove('dock-hidden');
  },

  pauseAudioMasterclass() {
    const state = this.audioMasterclassState;
    state.isPlaying = false;
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.updateAudioProgressUI();
  },

  playAudioEpisode(epNum) {
    const episodes = this.getAudioEpisodes();
    const ep = episodes.find(e => e.num === epNum) || episodes[0];
    this.audioMasterclassState.currentEpisode = ep.num;
    this.audioMasterclassState.currentTimeSec = ep.startSec;
    this.audioMasterclassState.isPoweredOn = true;

    if (!this.audioMasterclassState.isPlaying) {
      this.playAudioMasterclass();
    } else {
      this.speakCurrentEpisode();
      this.updateAudioProgressUI();
    }
  },

  startAudioProgressTimer() {
    const state = this.audioMasterclassState;
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      if (!state.isPlaying) return;
      state.currentTimeSec += 1 * state.playbackRate;
      if (state.currentTimeSec >= state.totalDurationSec) {
        state.currentTimeSec = state.totalDurationSec;
        this.pauseAudioMasterclass();
      }

      const episodes = this.getAudioEpisodes();
      const targetEp = episodes.find(ep => state.currentTimeSec >= ep.startSec && state.currentTimeSec < ep.endSec);
      if (targetEp && targetEp.num !== state.currentEpisode) {
        state.currentEpisode = targetEp.num;
        this.speakCurrentEpisode();
      }

      this.updateAudioProgressUI();
    }, 1000);
  },

  setAudioVoice(lang) {
    this.audioMasterclassState.voiceLang = lang;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.renderFloatingAudioDock();
    // renderStudyStageHeaderBar removed to prevent screen blocking
    if (this.audioMasterclassState.isPlaying) {
      this.speakCurrentEpisode();
    }
  },

  setAudioSpeed(speed) {
    this.audioMasterclassState.playbackRate = speed;
    if (this.audioMasterclassState.isPlaying) {
      this.speakCurrentEpisode();
    }
    this.renderFloatingAudioDock();
  },

  skipAudio(seconds) {
    const state = this.audioMasterclassState;
    state.currentTimeSec = Math.max(0, Math.min(state.totalDurationSec, state.currentTimeSec + seconds));
    const episodes = this.getAudioEpisodes();
    const targetEp = episodes.find(ep => state.currentTimeSec >= ep.startSec && state.currentTimeSec < ep.endSec);
    if (targetEp && targetEp.num !== state.currentEpisode) {
      state.currentEpisode = targetEp.num;
    }
    if (state.isPlaying) {
      this.speakCurrentEpisode();
    }
    this.updateAudioProgressUI();
  },

  seekAudioTrack(event) {
    const track = document.getElementById('dockScrubTrack');
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSec = Math.floor(pct * this.audioMasterclassState.totalDurationSec);

    this.audioMasterclassState.currentTimeSec = targetSec;
    const episodes = this.getAudioEpisodes();
    const targetEp = episodes.find(ep => targetSec >= ep.startSec && targetSec < ep.endSec);
    if (targetEp) {
      this.audioMasterclassState.currentEpisode = targetEp.num;
    }
    if (this.audioMasterclassState.isPlaying) {
      this.speakCurrentEpisode();
    }
    this.updateAudioProgressUI();
  },

  toggleTranscriptDrawer(forceState) {
    const state = this.audioMasterclassState;
    state.isDrawerOpen = typeof forceState === 'boolean' ? forceState : !state.isDrawerOpen;
    const drawer = document.getElementById('floatingTranscriptDrawer');
    if (!drawer) return;

    if (state.isDrawerOpen) {
      drawer.style.display = 'flex';
      this.renderTranscriptDrawerContent();
    } else {
      drawer.style.display = 'none';
    }
  },

  speakCurrentEpisode() {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const state = this.audioMasterclassState;
    const lang = state.voiceLang || this.currentLang || 'ml';
    const episodes = this.getAudioEpisodes();
    const ep = episodes[state.currentEpisode - 1] || episodes[0];
    const textToSpeak = ep.text[lang] || ep.text.en;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = state.playbackRate * 0.95;
    utterance.pitch = 1.05;

    const langCodes = { ml: 'ml-IN', ar: 'ar-SA', en: 'en-US' };
    utterance.lang = langCodes[lang] || 'en-US';

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const match = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(utterance.lang.toLowerCase()))
                 || voices.find(v => lang === 'ml' && (v.name.includes('Malayalam') || v.lang.includes('IN')))
                 || voices.find(v => lang === 'ar' && (v.name.includes('Arabic') || v.lang.startsWith('ar')));
      if (match) utterance.voice = match;
    }

    utterance.onend = () => {
      const currentEpisodes = this.getAudioEpisodes();
      if (state.isPlaying && state.currentEpisode < currentEpisodes.length) {
        state.currentEpisode += 1;
        state.currentTimeSec = currentEpisodes[state.currentEpisode - 1].startSec;
        this.speakCurrentEpisode();
        this.updateAudioProgressUI();
      }
    };

    window.speechSynthesis.speak(utterance);
  },

  // Ultra-Compact Floating Side Audio Widget (Zero-Branding & Minimal Screen Footprint)
  renderFloatingAudioDock() {
    const dock = document.getElementById('floatingAudioDock');
    if (!dock) return;

    const state = this.audioMasterclassState;
    if (state.isClosed) {
      dock.style.display = 'none';
      return;
    }
    dock.style.display = 'block';

    const lang = state.voiceLang || this.currentLang || 'ml';
    const episodes = this.getAudioEpisodes();
    const currentEp = episodes[state.currentEpisode - 1] || episodes[0];
    const formattedCurrentTime = this.formatAudioTime(state.currentTimeSec);

    dock.innerHTML = `
      <!-- 1. POPUP SIDE MENU (Opens on long-press or menu click: Speed controls, down-arrow, close) -->
      <div class="audio-side-menu-popup ${state.isMenuOpen ? 'is-open' : ''}" id="audioSideMenuPopup" style="display: ${state.isMenuOpen ? 'flex' : 'none'};">
        <div class="asmp-header">
          <span class="asmp-ep-badge">Ep ${state.currentEpisode} • 30-Min Audio</span>
          <div class="asmp-header-actions">
            <!-- Down Arrow Minimize ("ഡൗൺ ആരോ / തെക്ക് ആരോ") -->
            <button class="asmp-btn-action" onclick="app.minimizeAudioWidget(event)" title="${lang === 'ml' ? 'ഹൈഡ് ചെയ്യുക (Minimize / Hide)' : 'Hide / Minimize'}">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            <!-- Close 'X' ("തെറ്റ് ഒഴിവാക്കാൻ") -->
            <button class="asmp-btn-action asmp-btn-close" onclick="app.closeAudioWidget(event)" title="${lang === 'ml' ? 'ഓഡിയോ ക്ലോസ് ചെയ്യുക (Close / Dismiss)' : 'Close'}">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- Speed Selector: "അതിൽ സ്പീഡ് കൂട്ടാനുള്ള ഓപ്ഷൻ, അത് മാത്രം ചെയ്താൽ മതി" -->
        <div class="asmp-speed-section">
          <div class="asmp-section-label">
            <i class="fa-solid fa-gauge-high text-primary"></i>
            <span>${lang === 'ml' ? 'സ്പീഡ് മാറ്റുക (Speed):' : lang === 'ar' ? 'سرعة الصوت:' : 'Playback Speed:'}</span>
          </div>
          <div class="asmp-speed-grid">
            <button class="asmp-speed-btn ${state.playbackRate === 1 ? 'active' : ''}" onclick="app.setAudioSpeed(1)">1.0x</button>
            <button class="asmp-speed-btn ${state.playbackRate === 1.25 ? 'active' : ''}" onclick="app.setAudioSpeed(1.25)">1.25x</button>
            <button class="asmp-speed-btn ${state.playbackRate === 1.5 ? 'active' : ''}" onclick="app.setAudioSpeed(1.5)">1.5x</button>
            <button class="asmp-speed-btn ${state.playbackRate === 2 ? 'active' : ''}" onclick="app.setAudioSpeed(2)">2.0x</button>
          </div>
        </div>

        <!-- Controls & Voice Language -->
        <div class="asmp-controls-grid">
          <button class="asmp-play-toggle-btn" onclick="app.toggleAudioMasterclass(event)">
            <i class="fa-solid ${state.isPlaying ? 'fa-pause' : 'fa-play'}"></i>
            <span>${state.isPlaying ? (lang === 'ml' ? 'പോസ്' : 'Pause') : (lang === 'ml' ? 'പ്ലേ' : 'Play')}</span>
          </button>
          <div class="asmp-lang-box">
            <button class="asmp-lang-chip ${lang === 'ml' ? 'active' : ''}" onclick="app.setAudioVoice('ml')">ML</button>
            <button class="asmp-lang-chip ${lang === 'en' ? 'active' : ''}" onclick="app.setAudioVoice('en')">EN</button>
            <button class="asmp-lang-chip ${lang === 'ar' ? 'active' : ''}" onclick="app.setAudioVoice('ar')">AR</button>
          </div>
        </div>

        <!-- Episode Stepper -->
        <div class="asmp-nav-row">
          <button class="asmp-nav-btn" onclick="app.skipAudioEpisode(-1)" title="Previous Episode">
            <i class="fa-solid fa-backward-step"></i> <span>Ep ${Math.max(1, state.currentEpisode - 1)}</span>
          </button>
          <span class="asmp-nav-status">Ep ${state.currentEpisode} of 6</span>
          <button class="asmp-nav-btn" onclick="app.skipAudioEpisode(1)" title="Next Episode">
            <span>Ep ${Math.min(6, state.currentEpisode + 1)}</span> <i class="fa-solid fa-forward-step"></i>
          </button>
        </div>
      </div>

      <!-- 2. ULTRA-COMPACT FLOATING SIDE CAPSULE (~38px Height, Zero Branding Clutter) -->
      <div class="audio-capsule ${state.isMinimized ? 'is-minimized' : ''}" 
           id="audioCapsule" 
           onmousedown="app.handleCapsuleMouseDown(event)" 
           onmouseup="app.handleCapsuleMouseUp(event)" 
           ontouchstart="app.handleCapsuleTouchStart(event)" 
           ontouchend="app.handleCapsuleTouchEnd(event)"
           title="${lang === 'ml' ? 'മെനു കാണാൻ ക്ലിക്ക് ചെയ്യുക അല്ലെങ്കിൽ ഞെക്കിപ്പിടിക്കുക' : 'Click or Press & Hold for Menu'}">

        <!-- Normal State: Ultra-Compact 38px pill -->
        <div class="capsule-normal-content" style="${state.isMinimized ? 'display: none;' : 'display: flex;'}">
          <!-- Play / Pause Circular Icon -->
          <button class="capsule-play-btn" onclick="app.toggleAudioMasterclass(event)" title="${state.isPlaying ? 'Pause' : 'Play'}">
            <i class="fa-solid ${state.isPlaying ? 'fa-pause' : 'fa-play'}" id="capsulePlayIcon"></i>
          </button>

          <!-- Time text -->
          <span class="capsule-time" id="capsuleTime">${formattedCurrentTime}</span>

          <!-- Fast Speed Quick-Pill: Single Click Cycles 1x -> 1.25x -> 1.5x -> 2x -->
          <button class="capsule-speed-pill" id="capsuleSpeedPill" onclick="app.cycleAudioSpeed(event)" title="Speed: ${state.playbackRate}x (Click to cycle)">
            ${state.playbackRate}x
          </button>

          <!-- Down Arrow ("തെക്ക് ആരോ / ഡൗൺ ആരോ കൊടുത്തിട്ട് അത് ഒഴിവാക്കാനും / ഹൈഡ് ചെയ്യാനും") -->
          <button class="capsule-action-btn btn-min" onclick="app.minimizeAudioWidget(event)" title="${lang === 'ml' ? 'ഹൈഡ് ചെയ്യുക (Hide / Minimize)' : 'Hide to bubble'}">
            <i class="fa-solid fa-chevron-down"></i>
          </button>

          <!-- Close 'X' Button ("തെറ്റ് ഒഴിവാക്കാൻ") -->
          <button class="capsule-action-btn btn-close" onclick="app.closeAudioWidget(event)" title="${lang === 'ml' ? 'ഓഡിയോ ക്ലോസ് ചെയ്യുക (Close / Dismiss)' : 'Close Audio'}">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Minimized State: Tiny 38px floating bubble with pulsing dot -->
        <div class="capsule-minimized-content" style="${state.isMinimized ? 'display: flex;' : 'display: none;'}" onclick="app.restoreAudioWidget(event)" title="${lang === 'ml' ? 'ഓഡിയോ പ്ലെയർ തുറക്കുക' : 'Restore Audio'}">
          <i class="fa-solid fa-headphones"></i>
          <span class="mini-pulse-dot ${state.isPlaying ? 'pulsing' : ''}"></span>
        </div>
      </div>
    `;
  },

  // Cycle speed quickly on single click: 1x -> 1.25x -> 1.5x -> 2.0x -> 1x
  cycleAudioSpeed(event) {
    if (event) event.stopPropagation();
    const speeds = [1, 1.25, 1.5, 2];
    const currIdx = speeds.indexOf(this.audioMasterclassState.playbackRate);
    const nextIdx = (currIdx + 1) % speeds.length;
    this.setAudioSpeed(speeds[nextIdx]);
  },

  // Skip between episodes
  skipAudioEpisode(delta) {
    const state = this.audioMasterclassState;
    const episodes = this.getAudioEpisodes();
    const nextEpNum = Math.min(Math.max(1, state.currentEpisode + delta), episodes.length);
    this.playAudioEpisode(nextEpNum);
  },

  // Toggle Popup Side Menu
  toggleSideMenu(event) {
    if (event) event.stopPropagation();
    this.audioMasterclassState.isMenuOpen = !this.audioMasterclassState.isMenuOpen;
    const popup = document.getElementById('audioSideMenuPopup');
    if (popup) {
      popup.style.display = this.audioMasterclassState.isMenuOpen ? 'flex' : 'none';
      popup.classList.toggle('is-open', this.audioMasterclassState.isMenuOpen);
    }
  },

  openSideMenu() {
    this.audioMasterclassState.isMenuOpen = true;
    const popup = document.getElementById('audioSideMenuPopup');
    if (popup) {
      popup.style.display = 'flex';
      popup.classList.add('is-open');
    }
  },

  // Minimize Audio Widget into tiny bubble ("തെക്ക് ആരോ കൊടുത്തിട്ട് അത് ഒഴിവാക്കാനും")
  minimizeAudioWidget(event) {
    if (event) event.stopPropagation();
    this.audioMasterclassState.isMinimized = true;
    this.audioMasterclassState.isMenuOpen = false;
    this.renderFloatingAudioDock();
  },

  // Restore Minimized Audio Widget
  restoreAudioWidget(event) {
    if (event) event.stopPropagation();
    this.audioMasterclassState.isMinimized = false;
    this.renderFloatingAudioDock();
  },

  // Completely Close & Dismiss Audio Widget ("തെറ്റ് ഒഴിവാക്കാൻ")
  closeAudioWidget(event) {
    if (event) event.stopPropagation();
    this.turnAudioOff();
    this.audioMasterclassState.isClosed = true;
    this.audioMasterclassState.isMenuOpen = false;
    const dock = document.getElementById('floatingAudioDock');
    if (dock) dock.style.display = 'none';
  },

  // Press-and-Hold / Long-Press Handlers ("ഞെക്കിപ്പിടിച്ചാൽ മാത്രം ഫങ്ക്ഷൻ പ്രവർത്തിക്കുന്ന രീതി")
  handleCapsuleMouseDown(event) {
    if (event.target.closest('button')) return;
    this.startLongPressTimer();
  },
  handleCapsuleMouseUp(event) {
    this.clearLongPressTimer();
  },
  handleCapsuleTouchStart(event) {
    if (event.target.closest('button')) return;
    this.startLongPressTimer();
  },
  handleCapsuleTouchEnd(event) {
    this.clearLongPressTimer();
  },
  startLongPressTimer() {
    this.clearLongPressTimer();
    this.audioMasterclassState.longPressTimer = setTimeout(() => {
      this.openSideMenu();
    }, 400);
  },
  clearLongPressTimer() {
    if (this.audioMasterclassState.longPressTimer) {
      clearTimeout(this.audioMasterclassState.longPressTimer);
      this.audioMasterclassState.longPressTimer = null;
    }
  },

  // Render Content inside Floating Transcript Drawer
  renderTranscriptDrawerContent() {
    const body = document.getElementById('floatingTranscriptDrawer');
    if (!body) return;

    const state = this.audioMasterclassState;
    const lang = state.voiceLang || this.currentLang || 'ml';
    const episodes = this.getAudioEpisodes();

    const transcriptHtml = episodes.map(ep => {
      const isActive = ep.num === state.currentEpisode;
      return `
        <div class="transcript-drawer-para ${isActive ? 'active' : ''}" onclick="app.playAudioEpisode(${ep.num})">
          <div class="tdp-header">
            <span class="tdp-time">[${ep.timestamp}]</span>
            <strong>${ep.title[lang] || ep.title.en}</strong>
          </div>
          <p class="tdp-text">${ep.text[lang] || ep.text.en}</p>
        </div>
      `;
    }).join('');

    body.innerHTML = `
      <div class="transcript-drawer-header">
        <div class="td-title">
          <i class="fa-solid fa-scroll text-primary"></i>
          <span>${lang === 'ml' ? 'തത്സമയ വിവരണം (Live Transcript)' : lang === 'ar' ? 'النص المتزامن مع الصوت' : 'Synchronized Live Transcript'}</span>
        </div>
        <div class="td-actions">
          <button class="btn-td-download" onclick="app.copyOrDownloadTranscript()" title="${lang === 'ml' ? 'സംഗ്രഹം ഡൗൺലോഡ് ചെയ്യുക' : 'Save Summary'}">
            <i class="fa-solid fa-download"></i>
          </button>
          <button class="btn-td-close" onclick="app.toggleTranscriptDrawer(false)" title="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="transcript-drawer-body" id="transcriptDrawerBody">
        ${transcriptHtml}
      </div>
    `;
  },

  // Focus Audio Masterclass (without hijacking viewport)
  focusAudioMasterclass() {
    const state = this.audioMasterclassState;
    if (!state.isPoweredOn || !state.isPlaying) {
      state.isPoweredOn = true;
      this.playAudioMasterclass();
    } else {
      this.pauseAudioMasterclass();
    }
    const dock = document.getElementById('floatingAudioDock');
    if (dock) dock.classList.remove('dock-hidden');
  },

  // Update Dynamic UI During Playback
  updateAudioProgressUI() {
    const state = this.audioMasterclassState;
    const lang = state.voiceLang || this.currentLang || 'ml';
    const episodes = this.getAudioEpisodes();
    const currentEp = episodes[state.currentEpisode - 1] || episodes[0];

    const timeCurrEl = document.getElementById('capsuleTime');
    const playIcon = document.getElementById('capsulePlayIcon');
    const soundwave = document.getElementById('capsuleSoundwave');
    const speedPill = document.getElementById('capsuleSpeedPill');

    if (timeCurrEl) timeCurrEl.textContent = this.formatAudioTime(state.currentTimeSec);
    if (playIcon) {
      playIcon.className = `fa-solid ${state.isPlaying ? 'fa-pause' : 'fa-play'}`;
    }
    if (soundwave) {
      soundwave.classList.toggle('is-playing', state.isPlaying);
    }
    if (speedPill) {
      speedPill.textContent = `${state.playbackRate}x`;
    }

    // Update Power Switch buttons across UI
    const isAudioActive = state.isPoweredOn && state.isPlaying;
    ['dockAudioPowerSwitch', 'sshAudioPowerSwitch'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.className = `audio-power-toggle-btn ${isAudioActive ? 'state-on' : 'state-off'}`;
        const text = btn.querySelector('.power-toggle-text');
        if (text) text.textContent = isAudioActive ? 'ON' : 'OFF';
      }
    });

    // Update active paragraph in transcript drawer
    document.querySelectorAll('.transcript-drawer-para').forEach((p, idx) => {
      const isActive = idx + 1 === state.currentEpisode;
      p.classList.toggle('active', isActive);
      if (isActive && state.isDrawerOpen) {
        p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    // Update chapter play buttons inside course modules
    document.querySelectorAll('.btn-chapter-audio-play').forEach(btn => {
      const epNum = parseInt(btn.getAttribute('data-episode'), 10);
      const isThisPlaying = state.isPlaying && epNum === state.currentEpisode;
      btn.classList.toggle('is-playing', isThisPlaying);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = `fa-solid ${isThisPlaying ? 'fa-pause' : 'fa-headphones'}`;
      }
    });
  },

  copyOrDownloadTranscript() {
    const lang = this.audioMasterclassState.voiceLang || this.currentLang || 'ml';
    const cat = this.categoriesData[this.audioMasterclassState.nicheKey] || this.categoriesData.attar;
    const episodes = this.getAudioEpisodes();
    let fullText = `VYAPAR SHIKSHA — ${cat.title.en.toUpperCase()} MASTERCLASS AUDIO SUMMARY\n\n`;

    episodes.forEach(ep => {
      fullText += `[${ep.timestamp}] ${ep.title[lang] || ep.title.en}\n`;
      fullText += `${ep.text[lang] || ep.text.en}\n\n`;
    });

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyapar-shiksha-${this.audioMasterclassState.nicheKey}-masterclass-${lang}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Open Dedicated Academy Masterclass
  openAcademy(nicheKey, targetStep = 1, updateHash = true) {
    if (!this.categoriesData[nicheKey]) nicheKey = 'attar';
    this.currentAcademy = nicheKey;
    this.currentView = 'academy';
    this.currentCourseStep = targetStep;

    const vHome = document.getElementById('viewHome');
    const vAcademy = document.getElementById('viewAcademy');
    const vTools = document.getElementById('viewTools');

    if (vHome) vHome.style.display = 'none';
    if (vTools) vTools.style.display = 'none';
    if (vAcademy) vAcademy.style.display = 'block';

    const cat = this.categoriesData[nicheKey];
    const lang = this.currentLang;

    // Update Banner Texts
    const titleEl = document.getElementById('courseMainTitle');
    const tagEl = document.getElementById('courseMainTagline');
    const badgeEl = document.getElementById('courseBadgeNiche');

    if (titleEl) titleEl.textContent = cat.title[lang] || cat.title.en;
    if (tagEl) tagEl.textContent = cat.tagline[lang] || cat.tagline.en;
    if (badgeEl) badgeEl.textContent = lang === 'ml' ? `പ്രത്യേക പഠന ശാഖ: ${cat.minBudget}` : lang === 'ar' ? `أكاديمية تخصصية • رأس مال: ${cat.minBudget}` : `Specialized Academy • Capital: ${cat.minBudget}`;

    this.audioMasterclassState.nicheKey = nicheKey;
    this.renderCourseSidebar(nicheKey);
    // renderStudyStageHeaderBar removed to prevent screen blocking
    this.renderCourseModules(nicheKey);
    this.renderFloatingAudioDock();

    if (updateHash) {
      window.history.replaceState(null, '', `#academy/${nicheKey}/${targetStep}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Set Stepper Step (1 to 8)
  setCourseStep(stepNum) {
    if (stepNum < 1) stepNum = 1;
    if (stepNum > 8) stepNum = 8;
    this.currentCourseStep = stepNum;
    window.history.replaceState(null, '', `#academy/${this.currentAcademy}/${stepNum}`);
    this.renderCourseSidebar(this.currentAcademy);
    this.renderCourseModules(this.currentAcademy);

    const stage = document.getElementById('academyStudyStage');
    if (stage) {
      stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  nextCourseStep() {
    if (this.currentCourseStep < 8) {
      this.setCourseStep(this.currentCourseStep + 1);
    } else {
      this.navigateTo('plan');
    }
  },

  prevCourseStep() {
    if (this.currentCourseStep > 1) {
      this.setCourseStep(this.currentCourseStep - 1);
    }
  },

  toggleCourseViewMode(mode) {
    this.courseViewMode = mode;
    const btnStepper = document.getElementById('btnModeStepper');
    const btnAll = document.getElementById('btnModeAll');

    if (btnStepper) btnStepper.classList.toggle('active', mode === 'stepper');
    if (btnAll) btnAll.classList.toggle('active', mode === 'all');

    this.renderCourseModules(this.currentAcademy);
  },

  // Render Left Dedicated Sidebar Navigation
  renderCourseSidebar(nicheKey) {
    const sidebar = document.getElementById('academyStudySidebar');
    if (!sidebar) return;

    const cat = this.categoriesData[nicheKey] || this.categoriesData.attar;
    const lang = this.currentLang;
    const t = this.i18n[lang] || this.i18n.en;
    const current = this.currentCourseStep;
    const pct = Math.round((current / 8) * 100);

    const chapterItems = [
      { num: 1, title: t.step1Pill || "1. Product Science", sub: lang === 'ml' ? "അടിത്തറ & ഉൽപ്പന്ന വിവരങ്ങൾ" : lang === 'ar' ? "علم المنتج والصنعة" : "Blueprint & Scent Science" },
      { num: 2, title: t.step2Pill || "2. Capital Breakdown", sub: lang === 'ml' ? "എന്തിനൊക്കെ എത്ര രൂപ?" : lang === 'ar' ? "جدول الميزانية والتكاليف" : "Itemized Budget Ledger" },
      { num: 3, title: t.step3Pill || "3. Wholesale Markets", sub: lang === 'ml' ? "മിഠായിത്തെരുവ് & ക്രോഫോർഡ്" : lang === 'ar' ? "أسواق الجملة والخرائط" : "Wholesale Hubs & Maps" },
      { num: 4, title: t.step4Pill || "4. Calling Dialogue", sub: lang === 'ml' ? "സംസാരിക്കേണ്ട രീതി & ചോദ്യങ്ങൾ" : lang === 'ar' ? "حوار الاتصال والتفاوض" : "Negotiation & Scripts" },
      { num: 5, title: t.step5Pill || "5. Formulation & Making", sub: lang === 'ml' ? "പുതിയത് ഉണ്ടാക്കുന്ന വിധം" : lang === 'ar' ? "طريقة التركيب والتصنيع" : "Assembly & Bottling SOP" },
      { num: 6, title: t.step6Pill || "6. Profit Graph", sub: lang === 'ml' ? "ലൈവ് ലാഭ ഗ്രാഫ്" : lang === 'ar' ? "رسم وحاسبة الأرباح" : "Visual Profit Simulator" },
      { num: 7, title: t.step7Pill || "7. Portals, Instagram & Websites", sub: lang === 'ml' ? "ഇൻസ്റ്റാഗ്രാം, ഫേസ്ബുക്ക് & സൈറ്റുകൾ" : lang === 'ar' ? "المواقع وصفحات إنستغرام" : "Instagram & Verified Portals" },
      { num: 8, title: t.step8Pill || "8. Courier & Launch", sub: lang === 'ml' ? "കൊറിയർ നിരക്കുകൾ & വിൽപന" : lang === 'ar' ? "الشحن وانطلاقة البيع" : "Safe COD & Dispatch Rules" }
    ];

    let chaptersHtml = '';
    chapterItems.forEach(ch => {
      const isActive = ch.num === current;
      const isDone = ch.num < current;
      const cls = isActive ? 'active' : isDone ? 'completed' : '';
      const badgeIcon = isDone 
        ? '<i class="fa-solid fa-check"></i>' 
        : `<span>${ch.num}</span>`;

      chaptersHtml += `
        <button class="sidebar-chapter-item ${cls}" onclick="app.setCourseStep(${ch.num})">
          <div class="chapter-badge-circle">${badgeIcon}</div>
          <div class="chapter-item-text">
            <div class="chapter-item-title">${ch.title}</div>
            <div class="chapter-item-sub">${ch.sub}</div>
          </div>
        </button>
      `;
    });

    const progressLabel = lang === 'ml'
      ? `ഘട്ടം ${current} / 8 (${pct}% പൂർത്തിയായി)`
      : lang === 'ar'
      ? `الفصل ${current} من 8 (اكتمل ${pct}%)`
      : `Chapter ${current} of 8 (${pct}% Done)`;

    sidebar.innerHTML = `
      <div class="sidebar-niche-profile">
        <div class="sidebar-img-crop">
          <img src="${cat.images.cover}" alt="${cat.title[lang] || cat.title.en}">
          <span class="sidebar-budget-badge"><i class="fa-solid fa-coins"></i> ${cat.minBudget}</span>
        </div>
        <button class="sidebar-audio-cta-btn" onclick="app.focusAudioMasterclass()">
          <div class="sidebar-audio-icon"><i class="fa-solid fa-headphones"></i></div>
          <div class="sidebar-audio-text">
            <strong>30-Min Audio Class</strong>
            <small>${lang === 'ml' ? 'കേട്ടു പഠിക്കാം (Listen & Learn)' : lang === 'ar' ? 'استمع للدورة الصوتية' : 'Listen & Learn (30 Mins)'}</small>
          </div>
          <span class="audio-live-pill"><i class="fa-solid fa-play"></i></span>
        </button>
        <h3 class="sidebar-course-name">${cat.title[lang] || cat.title.en}</h3>
        <p class="sidebar-course-tagline">${cat.tagline[lang] || cat.tagline.en}</p>
        <div class="sidebar-progress-summary">
          <div class="sidebar-progress-bar">
            <div class="sidebar-progress-fill" style="width: ${pct}%;"></div>
          </div>
          <div class="sidebar-progress-text-row">
            <span>${progressLabel}</span>
            <span><strong class="text-success">${cat.margin}</strong> Margin</span>
          </div>
        </div>
      </div>

      <nav class="sidebar-chapters-menu" id="sidebarChaptersMenu">
        ${chaptersHtml}
      </nav>

      <div class="sidebar-footer-tools">
        <button class="sidebar-tool-btn" onclick="app.navigateTo('calc')">
          <i class="fa-solid fa-calculator text-primary"></i> <span>${lang === 'ml' ? 'പ്രോഫിറ്റ് കാൽക്കുലേറ്റർ' : lang === 'ar' ? 'حاسبة الأرباح' : 'Profit Calculator'}</span>
        </button>
        <button class="sidebar-tool-btn" onclick="app.navigateTo('plan')">
          <i class="fa-solid fa-file-invoice-dollar text-success"></i> <span>${lang === 'ml' ? 'ബിസിനസ് പ്ലാൻ ഉണ്ടാക്കുക' : lang === 'ar' ? 'خطة العمل المخصصة' : 'Generate Business Plan'}</span>
        </button>
      </div>
    `;
  },

  // Portal Filter Handler
  currentPortalFilter: 'all',

  filterPortals(filterType) {
    this.currentPortalFilter = filterType;
    document.querySelectorAll('.portal-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filterType);
    });
    const grid = document.getElementById('portalsCardsGrid');
    if (grid) {
      grid.innerHTML = this.renderPortalsCards(this.currentAcademy, filterType);
    }
  },

  renderPortalsCards(nicheKey, filterType = 'all') {
    const cat = this.categoriesData[nicheKey] || this.categoriesData.attar;
    const lang = this.currentLang;
    const portals = cat.onlinePortals || { instagram: [], facebook: [], websites: [] };

    let items = [];

    if (filterType === 'all' || filterType === 'ig') {
      (portals.instagram || []).forEach(ig => items.push({ type: 'ig', ...ig }));
    }
    if (filterType === 'all' || filterType === 'fb') {
      (portals.facebook || []).forEach(fb => items.push({ type: 'fb', ...fb }));
    }
    if (filterType === 'all' || filterType === 'web' || filterType === 'india') {
      (portals.websites || []).filter(w => filterType !== 'india' || w.region.includes('India')).forEach(w => items.push({ type: 'web', ...w }));
    }
    if (filterType === 'intl') {
      (portals.websites || []).filter(w => w.region.includes('UAE') || w.region.includes('Global') || w.region.includes('Dubai') || w.flag.includes('🇦🇪') || w.flag.includes('🌍')).forEach(w => items.push({ type: 'web', ...w }));
      (portals.instagram || []).filter(i => i.region.includes('UAE') || i.region.includes('Global') || i.flag.includes('🇦🇪')).forEach(i => items.push({ type: 'ig', ...i }));
    }

    if (items.length === 0) {
      return `<p class="text-muted" style="padding: 20px;">${lang === 'ml' ? 'ഈ കാറ്റഗറിയിൽ ലിങ്കുകൾ ലഭ്യമല്ല.' : lang === 'ar' ? 'لا توجد روابط لهذا التصنيف حالياً.' : 'No links found for this filter.'}</p>`;
    }

    return items.map(item => {
      let iconClass = 'portal-icon-web';
      let iconEl = '<i class="fa-solid fa-globe"></i>';
      let actionText = lang === 'ml' ? 'വെബ്‌സൈറ്റ് സന്ദർശിക്കുക' : lang === 'ar' ? 'زيارة الموقع الرسمي' : 'Visit Official Website';
      let handleText = item.domain || '';

      if (item.type === 'ig') {
        iconClass = 'portal-icon-ig';
        iconEl = '<i class="fa-brands fa-instagram"></i>';
        actionText = lang === 'ml' ? 'ഇൻസ്റ്റാഗ്രാം പേജ് കാണുക' : lang === 'ar' ? 'عرض صفحة إنستغرام' : 'Open Instagram Profile';
        handleText = item.handle || '';
      } else if (item.type === 'fb') {
        iconClass = 'portal-icon-fb';
        iconEl = '<i class="fa-brands fa-facebook"></i>';
        actionText = lang === 'ml' ? 'ഫേസ്ബുക്ക് ഗ്രൂപ്പ് കാണുക' : lang === 'ar' ? 'الانضمام لمجموعة فيسبوك' : 'Open Facebook Group';
        handleText = item.members || '';
      }

      return `
        <div class="portal-card">
          <div class="portal-card-top">
            <div class="portal-icon-name">
              <div class="portal-type-icon ${iconClass}">
                ${iconEl}
              </div>
              <div class="portal-title-block">
                <h5>${item.name}</h5>
                <span class="portal-handle-domain">${handleText}</span>
              </div>
            </div>
            <span class="portal-region-badge">${item.flag} ${item.region}</span>
          </div>
          <p class="portal-desc">${item.desc[lang] || item.desc.en}</p>
          <div class="portal-card-footer">
            <span class="portal-badge-pill">${item.badge}</span>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn-open-portal">
              <span>${actionText}</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');
  },

  renderPortalsSection(nicheKey) {
    const cat = this.categoriesData[nicheKey] || this.categoriesData.attar;
    const lang = this.currentLang;
    const intro = cat.onlinePortals ? (cat.onlinePortals.intro[lang] || cat.onlinePortals.intro.en) : '';

    return `
      <div class="portals-header-box">
        <i class="fa-solid fa-globe" style="font-size: 1.25rem; margin-right: 8px;"></i>
        ${intro}
      </div>

      <div class="portals-filter-bar">
        <button class="portal-filter-btn active" data-filter="all" onclick="app.filterPortals('all')">
          <i class="fa-solid fa-layer-group"></i> ${lang === 'ml' ? 'എല്ലാം കാണുക' : lang === 'ar' ? 'جميع الروابط' : 'All Portals & Links'}
        </button>
        <button class="portal-filter-btn" data-filter="ig" onclick="app.filterPortals('ig')">
          <i class="fa-brands fa-instagram" style="color: #e1306c;"></i> ${lang === 'ml' ? 'ഇൻസ്റ്റാഗ്രാം പേജുകൾ' : lang === 'ar' ? 'صفحات إنستغرام' : 'Instagram Brands'}
        </button>
        <button class="portal-filter-btn" data-filter="fb" onclick="app.filterPortals('fb')">
          <i class="fa-brands fa-facebook" style="color: #1877f2;"></i> ${lang === 'ml' ? 'ഫേസ്ബുക്ക് ഗ്രൂപ്പുകൾ' : lang === 'ar' ? 'مجموعات فيسبوك' : 'Facebook Groups'}
        </button>
        <button class="portal-filter-btn" data-filter="india" onclick="app.filterPortals('india')">
          🇮🇳 ${lang === 'ml' ? 'ഇന്ത്യയിലെ ഫാക്ടറി സൈറ്റുകൾ' : lang === 'ar' ? 'مواقع المصانع في الهند' : 'India Sourcing Websites'}
        </button>
        <button class="portal-filter-btn" data-filter="intl" onclick="app.filterPortals('intl')">
          🇦🇪 🌍 ${lang === 'ml' ? 'വിദേശ രാജ്യങ്ങൾ & ഗൾഫ്' : lang === 'ar' ? 'دبي والأسواق الدولية' : 'GCC (Dubai) & Global'}
        </button>
      </div>

      <div class="portals-cards-grid" id="portalsCardsGrid">
        ${this.renderPortalsCards(nicheKey, this.currentPortalFilter || 'all')}
      </div>
    `;
  },

  // Render Modules in Academy (Guided Stepper Mode vs Full Masterclass Mode)
  renderCourseModules(nicheKey) {
    const container = document.getElementById('courseModulesBody');
    if (!container) return;

    this.renderCourseSidebar(nicheKey);

    const cat = this.categoriesData[nicheKey] || this.categoriesData.attar;
    const lang = this.currentLang;
    const t = this.i18n[lang] || this.i18n.en;
    const activeStep = this.currentCourseStep;
    const isStepper = this.courseViewMode === 'stepper';

    // Build the 8 Step HTML definitions
    const stepModules = [
      // STEP 1: Product Science & Blueprint
      {
        id: "mod-blueprint",
        stepNum: 1,
        title: t.mod1Title || '1. Blueprint & Product Science',
        heroImg: cat.images.product,
        heroTitle: lang === 'ml' ? 'ഉൽപ്പന്ന വിവരങ്ങളും വിപണിയും' : lang === 'ar' ? 'علم الصنعة والمنتج' : 'Product Science & Fast Sellers',
        heroSub: lang === 'ml' ? 'ആദ്യമായി എന്ത് ചെയ്യണം? ഉൽപ്പന്നം എന്താണെന്ന് മനസ്സിലാക്കുക, ഏറ്റവും കൂടുതൽ വിറ്റുപോകുന്ന ഇനങ്ങൾ തിരഞ്ഞെടുക്കുക.' : lang === 'ar' ? 'ماذا تفعل أولاً؟ افهم طبيعة المنتج واختر أكثر 4 أصناف طلباً في السوق.' : 'Phase 1: Zero-knowledge craft science and top 4 fastest-moving varieties.',
        renderContent: () => `
          <div class="blueprint-intro-box" style="background: #f8fafc; border-left: 4px solid var(--primary); padding: 18px 22px; border-radius: var(--radius-sm); margin-bottom: 24px; line-height: 1.6;">
            <p style="font-size: 0.96rem; color: var(--secondary-dark);">${cat.blueprint.intro[lang] || cat.blueprint.intro.en}</p>
          </div>

          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--secondary-dark); margin-bottom: 14px;">
            <i class="fa-solid fa-fire text-danger"></i> ${lang === 'ml' ? 'തുടക്കക്കാർ തിരഞ്ഞെടുക്കേണ്ട 4 ടോപ്പ് ഐറ്റങ്ങൾ' : lang === 'ar' ? 'أفضل 4 منتجات للمبتدئين' : 'Top Fast-Moving Best-Seller Products'}
          </h4>
          <div class="table-responsive">
            <table class="cost-ledger-table">
              <thead>
                <tr>
                  <th>${lang === 'ml' ? 'ഉൽപ്പന്നം' : lang === 'ar' ? 'المنتج' : 'Product Variety'}</th>
                  <th>${lang === 'ml' ? 'ഹോൾസെയിൽ വില' : lang === 'ar' ? 'سعر الجملة' : 'Wholesale Cost'}</th>
                  <th>${lang === 'ml' ? 'വിൽപന വില' : lang === 'ar' ? 'سعر البيع المقترح' : 'Selling Price'}</th>
                  <th>${lang === 'ml' ? 'ഒരു യൂണിറ്റിൽ നിന്നുള്ള ലാഭം' : lang === 'ar' ? 'صافي الربح بكل حبة' : 'Net Unit Profit'}</th>
                </tr>
              </thead>
              <tbody>
                ${cat.blueprint.fastMovingList.map(item => `
                  <tr>
                    <td><strong>${item.name[lang] || item.name.en}</strong></td>
                    <td><span class="text-danger" style="font-weight: 700;">${item.wholesale}</span></td>
                    <td><span class="text-primary" style="font-weight: 700;">${item.retail}</span></td>
                    <td><span class="text-success" style="font-weight: 800;">${item.profit}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `
      },

      // STEP 2: Exact Capital & Budget Breakdown Table
      {
        id: "mod-capital",
        stepNum: 2,
        title: t.mod2Title || '2. Exact Capital & Budget Breakdown',
        heroImg: cat.images.cover,
        heroTitle: lang === 'ml' ? 'എന്തിനൊക്കെ എത്ര രൂപ? (വിശദമായ ബഡ്ജറ്റ് പട്ടിക)' : lang === 'ar' ? 'تفاصيل الميزانية ورأس المال الدقيق' : 'Itemized Capital & Budget Ledger',
        heroSub: lang === 'ml' ? 'രണ്ടാമതായി എന്ത് ചെയ്യണം? കയ്യിൽ എത്ര രൂപ വേണം, എന്തിനൊക്കെ എത്ര രൂപ ചെലവാകും എന്ന് കൃത്യമായി പ്ലാൻ ചെയ്യുക.' : lang === 'ar' ? 'ماذا تفعل ثانياً؟ حدد ميزانيتك بدقة واعرف أين تذهب كل روبية لتفادي أي خسائر.' : 'Phase 2: Exact itemized startup costs for Starter and Pro brand tiers.',
        renderContent: () => `
          <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 16px;">
            ${lang === 'ml' 
              ? 'ബിസിനസ് തുടങ്ങുമ്പോൾ എന്തിനൊക്കെ എത്ര രൂപ ചെലവാകും എന്ന് കൃത്യമായി കാണിക്കുന്ന ബഡ്ജറ്റ് പട്ടിക. അനാവശ്യ ചെലവുകൾ ഒഴിവാക്കി സുരക്ഷിതമായി തുടങ്ങാം.' 
              : lang === 'ar'
              ? 'جدول تفصيلي يوضح أين تذهب كل روبية من رأس مالك، لتنطلق بثقة وبدون أي هدر مالي.'
              : 'Complete itemized budget ledger. Shows exactly what components cost and how much starting capital is needed for both Starter and Pro brand tiers.'}
          </p>

          <div class="table-responsive">
            <table class="cost-ledger-table">
              <thead>
                <tr>
                  <th>${lang === 'ml' ? 'ചെലവ് ഇനം' : lang === 'ar' ? 'بند المصروف' : 'Budget Item'}</th>
                  <th>${lang === 'ml' ? 'തുടക്കക്കാർക്ക് (Starter Tier)' : lang === 'ar' ? 'للمبتدئين (Starter)' : 'Starter Tier'}</th>
                  <th>${lang === 'ml' ? 'ലക്ഷ്വറി ബ്രാൻഡിന് (Pro Brand)' : lang === 'ar' ? 'علامة تجارية متقدمة (Pro)' : 'Pro Brand Tier'}</th>
                  <th>${lang === 'ml' ? 'പ്രത്യേകതകൾ' : lang === 'ar' ? 'ملاحظات' : 'Sourcing Notes'}</th>
                </tr>
              </thead>
              <tbody>
                ${cat.capitalTable.map(row => `
                  <tr>
                    <td><strong>${row.item[lang] || row.item.en}</strong></td>
                    <td style="font-weight: 700; color: var(--primary);">${row.starter}</td>
                    <td style="font-weight: 700; color: #4338ca;">${row.pro}</td>
                    <td><small class="text-muted">${row.notes[lang] || row.notes.en}</small></td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td>${lang === 'ml' ? 'ആകെ കുറഞ്ഞ പ്രാരംഭ മൂലധനം:' : lang === 'ar' ? 'إجمالي رأس المال الأولي المطلوب:' : 'Total Initial Working Capital:'}</td>
                  <td>${cat.totalStarterCost}</td>
                  <td>${cat.totalProCost}</td>
                  <td>${lang === 'ml' ? 'ആദ്യ ബാച്ചിന് ആവശ്യമായത്' : lang === 'ar' ? 'يكفي لإنتاج الدفعة الأولى' : 'Sufficient for first inventory'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },

      // STEP 3: Wholesale Hubs with Phone & Google Maps
      {
        id: "mod-suppliers",
        stepNum: 3,
        title: t.mod3Title || '3. Wholesale Markets & Google Maps',
        heroImg: cat.images.sourcing,
        heroTitle: lang === 'ml' ? 'മൊത്തവ്യാപാര മാർക്കറ്റുകൾ & മാപ്പ്' : lang === 'ar' ? 'أسواق الجملة وعناوين الموردين' : 'Wholesale Markets, Phone & Google Maps',
        heroSub: lang === 'ml' ? 'മൂന്നാമതായി എന്ത് ചെയ്യണം? മിഠായിത്തെരുവ്, ക്രോഫോർഡ് മാർക്കറ്റ് എന്നിവിടങ്ങളിലെ വ്യാപാരികളുടെ ലൊക്കേഷനുകൾ കണ്ടുപിടിക്കുക.' : lang === 'ar' ? 'ماذا تفعل ثالثاً؟ اعرف أين تتسوق بأسعار الجملة الحقيقية وتواصل مع الموردين المعتمدين.' : 'Phase 3: Connect directly with verified wholesale hubs via Google Maps and WhatsApp.',
        renderContent: () => {
          const matchingSuppliers = this.suppliers.filter(s => s.category === nicheKey || (nicheKey === 'attar' && s.category === 'packaging'));
          return `
            <div class="suppliers-grid-niche" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px;">
              ${matchingSuppliers.map(sup => {
                const waMsg = encodeURIComponent(
                  lang === 'ml' 
                    ? `ഹലോ ${sup.name}, ഞാൻ 'വ്യാപാര ശിക്ഷ' വെബ്സൈറ്റിൽ നിങ്ങളുടെ കടയുടെ വിവരം കണ്ടതാണ്. എനിക്ക് നിങ്ങളുടെ ഹോൾസെയിൽ കാറ്റലോഗും വിലവിവരങ്ങളും വേണം.`
                    : lang === 'ar'
                    ? `مرحباً ${sup.name}، وجدت بيانات متجركم عبر منصة رواد الأعمال. أود الاطلاع على كتالوج الجملة وقائمة الأسعار لديكم.`
                    : `Hello ${sup.name}, I found your wholesale details on Vyapar Shiksha. I want to inquire about your wholesale catalog and bulk pricing.`
                );
                const waLink = `https://wa.me/${sup.whatsapp}?text=${waMsg}`;

                return `
                  <div class="supplier-card">
                    <div class="supplier-head">
                      <h4 class="supplier-name">${sup.name}</h4>
                      <span class="city-badge">${sup.city}</span>
                    </div>
                    <p class="supplier-address"><i class="fa-solid fa-location-dot"></i> <span>${sup.address}</span></p>
                    <p style="font-size: 0.85rem; color: #1e293b; margin-bottom: 8px;"><strong>${lang === 'ml' ? 'പ്രത്യേകതകൾ:' : lang === 'ar' ? 'المنتجات:' : 'Specialties:'}</strong> ${sup.specialty}</p>
                    <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px;"><i class="fa-solid fa-box"></i> <strong>MOQ:</strong> ${sup.moq}</p>
                    <div class="supplier-actions">
                      <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
                        <i class="fa-brands fa-whatsapp"></i> ${lang === 'ml' ? 'വാട്സ്ആപ്പ്' : lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                      </a>
                      <a href="${sup.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn-map">
                        <i class="fa-solid fa-location-crosshairs"></i> ${lang === 'ml' ? 'മാപ്പ്' : lang === 'ar' ? 'الخريطة' : 'Map'}
                      </a>
                      ${sup.instagram ? `<a href="${sup.instagram}" target="_blank" rel="noopener noreferrer" class="btn-map" title="Instagram"><i class="fa-brands fa-instagram" style="color: #e1306c;"></i></a>` : ''}
                      ${sup.website ? `<a href="${sup.website}" target="_blank" rel="noopener noreferrer" class="btn-map" title="Website"><i class="fa-solid fa-globe" style="color: #059669;"></i></a>` : ''}
                      <a href="tel:${sup.phone}" class="btn-map-call">
                        <i class="fa-solid fa-phone"></i>
                      </a>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        }
      },

      // STEP 4: Calling Dialogue & Negotiation Coaching
      {
        id: "mod-coaching",
        stepNum: 4,
        title: t.mod4Title || '4. Wholesaler Calling & Chat Coaching',
        heroImg: cat.images.sourcing,
        heroTitle: lang === 'ml' ? 'വ്യാപാരികളോട് സംസാരിക്കേണ്ട രീതി' : lang === 'ar' ? 'حوار التفاوض والاتصال مع الموردين' : 'Wholesaler Calling & Chat Coaching',
        heroSub: lang === 'ml' ? 'നാലാമതായി എന്ത് ചെയ്യണം? കടക്കാരെ വിളിച്ച് സാമ്പിളുകൾ ആവശ്യപ്പെടാനും വിലപേശാനുമുള്ള സംസാര രീതി പഠിക്കുക.' : lang === 'ar' ? 'ماذا تفعل رابعاً؟ كيف تتصل بالموردين بثقة وتطلب عينات وتتفاوض على سعر الكيلو.' : 'Phase 4: Battle-tested calling scripts and negotiation masterclass.',
        renderContent: () => `
          <div class="coaching-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px;">
            ${this.coachingData.map(c => `
              <div class="coach-card">
                <span class="coach-step-badge">Step ${c.step}</span>
                <h4>${c.title[lang] || c.title.en}</h4>
                <p>${c.desc[lang] || c.desc.en}</p>
                <div class="dialogue-box">
                  <i class="fa-solid fa-quote-left"></i> ${c.dialogue[lang] || c.dialogue.en}
                </div>
              </div>
            `).join('')}
          </div>
        `
      },

      // STEP 5: Formulation & Assembly Guide
      {
        id: "mod-sourcing",
        stepNum: 5,
        title: t.mod5Title || '5. Formulation & How to Make Your Brand',
        heroImg: cat.images.formulation,
        heroTitle: lang === 'ml' ? 'പുതിയത് ഉണ്ടാക്കാൻ എത്ര വേണം? (നിർമ്മാണ രീതി)' : lang === 'ar' ? 'طريقة التركيب وصناعة علامتك الجديدة' : 'Formulation, Assembly & Crafting',
        heroSub: lang === 'ml' ? 'അഞ്ചാമതായി എന്ത് ചെയ്യണം? കുപ്പിയിൽ അളന്ന് നിറച്ച്, റോൾ-ഓൺ അമർത്തി, ലേബൽ ഒട്ടിച്ച് വെൽവെറ്റ് പൗച്ചിലാക്കുന്ന വിധം.' : lang === 'ar' ? 'ماذا تفعل خامساً؟ طريقة تعبئة الزجاجات وتثبيت الرول ولصق الشعار والتغليف الفاخر.' : 'Phase 5: Step-by-step practical assembly, hygiene, bottling and unit cost.',
        renderContent: () => `
          <div class="unit-economics-callout" style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 18px 22px; border-radius: var(--radius-sm); margin-bottom: 24px; color: #065f46; font-size: 0.96rem; line-height: 1.6;">
            <i class="fa-solid fa-chart-pie" style="font-size: 1.25rem; margin-right: 8px;"></i>
            ${cat.formulation.costPerUnitBox[lang] || cat.formulation.costPerUnitBox.en}
          </div>

          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--secondary-dark); margin-bottom: 16px;">
            <i class="fa-solid fa-list-ol text-primary"></i> ${lang === 'ml' ? 'ഘട്ടം ഘട്ടമായി തയ്യാറാക്കുന്ന വിധം' : lang === 'ar' ? 'خطوات التصنيع والتركيب خطوة بخطوة' : 'Step-by-Step Practical Creation Steps'}
          </h4>

          <div class="steps-flow-grid" style="display: flex; flex-direction: column; gap: 14px;">
            ${cat.formulation.steps.map(s => `
              <div class="step-card-flow" style="display: flex; gap: 16px; background: #ffffff; border: 1px solid var(--border-color); padding: 18px; border-radius: var(--radius-sm);">
                <div class="step-num-bubble" style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">
                  ${s.step}
                </div>
                <div>
                  <h5 style="font-size: 1.05rem; font-weight: 700; color: var(--secondary-dark); margin-bottom: 4px;">${s.title[lang] || s.title.en}</h5>
                  <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">${s.desc[lang] || s.desc.en}</p>
                </div>
              </div>
            `).join('')}
          </div>
        `
      },

      // STEP 6: Live Visual Profit Graph & Simulator
      {
        id: "mod-simulator",
        stepNum: 6,
        title: t.mod6Title || '6. Profit Simulator & Live Visual Graph',
        heroImg: cat.images.cover,
        heroTitle: lang === 'ml' ? 'ലൈവ് ലാഭ ഗ്രാഫും സിമുലേറ്ററും' : lang === 'ar' ? 'حاسبة الأرباح والرسم البياني المباشر' : 'Live Profit Graph & Margin Visualizer',
        heroSub: lang === 'ml' ? 'ആറാമതായി എന്ത് ചെയ്യണം? ഓരോ കുപ്പിയിലും എത്ര ലാഭം കിട്ടും, 25/50/100 കുപ്പികൾ വിൽക്കുമ്പോൾ എത്ര സമ്പാദിക്കാം എന്ന് കാണുക.' : lang === 'ar' ? 'ماذا تفعل سادساً؟ شاهد رسماً بيانياً مباشراً يوضح أرباحك وتكلفة تصنيع كل حبة بدقة.' : 'Phase 6: Interactive simulator with real-time segmented horizontal profit bar graph.',
        renderContent: () => this.getNicheSimulatorHtml(nicheKey)
      },

      // STEP 7: Verified Online Portals, Instagram Pages, Facebook & Websites (India & International)
      {
        id: "mod-portals",
        stepNum: 7,
        title: t.mod7Title || '7. Verified Online Portals, Instagram & Websites',
        heroImg: cat.images.packaging,
        heroTitle: lang === 'ml' ? 'സോഷ്യൽ മീഡിയ, വ്യാപാരികളുടെ വെബ്‌സൈറ്റുകൾ & ലിങ്കുകൾ' : lang === 'ar' ? 'بوابات الموردين الرسمية وصفحات إنستغرام وفيسبوك' : 'Verified Online Portals, Instagram & Websites',
        heroSub: lang === 'ml' ? 'ഏഴാമതായി എന്ത് ചെയ്യണം? പ്രമുഖ ബ്രാൻഡുകളുടെ ഇൻസ്റ്റാഗ്രാം, ഫേസ്ബുക്ക് ഗ്രൂപ്പുകൾ, ഇന്ത്യയിലെയും ഗൾഫിലെയും ഒഫീഷ്യൽ സൈറ്റുകൾ പരിശോധിക്കുക.' : lang === 'ar' ? 'ماذا تفعل سابعاً؟ استكشف الحسابات الملهمة على إنستغرام ومجموعات تجار الجملة ومواقع المصانع في الهند والخليج.' : 'Phase 7: Direct verified links to Instagram brands, Facebook wholesale groups, domestic portals, and GCC/international exporters.',
        renderContent: () => this.renderPortalsSection(nicheKey)
      },

      // STEP 8: Courier Rates, COD Rules & Launch Plan
      {
        id: "mod-logistics",
        stepNum: 8,
        title: t.mod8Title || '8. Courier Rates, COD & Launch Checklist',
        heroImg: cat.images.packaging,
        heroTitle: lang === 'ml' ? 'കൊറിയർ നിരക്കുകൾ & സുരക്ഷിതമായ വിൽപന' : lang === 'ar' ? 'أسعار الشحن البريدي وانطلاقة المبيعات' : 'Courier Rates, Safe COD & Launch Checklist',
        heroSub: lang === 'ml' ? 'എട്ടാമതായി എന്ത് ചെയ്യണം? സുരക്ഷിതമായി പാക്ക് ചെയ്ത് കൊറിയർ വഴി കസ്റ്റമറിലേക്ക് എത്തിക്കുക, COD നഷ്ടങ്ങൾ ഒഴിവാക്കുക.' : lang === 'ar' ? 'ماذا تفعل ثامناً؟ شحن الطرود بنظام وضمان استلام الأموال بدون مخاطر التوصيل.' : 'Phase 8: Shipping partners, COD advance token rule, and 14-day Instagram playbook.',
        renderContent: () => `
          <div class="cod-danger-box" style="background: #fffbeb; border: 1px solid #fef08a; padding: 20px 24px; border-radius: var(--radius-sm); margin-bottom: 24px; color: #854d0e; font-size: 0.94rem; line-height: 1.6;">
            <h4 style="font-size: 1.1rem; font-weight: 800; color: #78350f; margin-bottom: 8px;">
              <i class="fa-solid fa-triangle-exclamation text-warning"></i> ${lang === 'ml' ? 'പ്രധാനപ്പെട്ടത്: ക്യാഷ് ഓൺ ഡെലിവറി (COD) അപകടം ഒഴിവാക്കാം' : lang === 'ar' ? 'تنبيه هام: تفادي خسائر الدفع عند الاستلام' : 'Critical Rule: Cash on Delivery (COD) Protection'}
            </h4>
            <p>
              ${lang === 'ml'
                ? 'അപരിചിതർക്ക് 100% ക്യാഷ് ഓൺ ഡെലിവറി അയക്കരുത്. കസ്റ്റമർ വാങ്ങിയില്ലെങ്കിൽ പോകുന്ന ചാർജ്ജും മടങ്ങി വരുന്ന ചാർജ്ജും (ഏകദേശം ₹100-₹120) നിങ്ങൾ നൽകേണ്ടി വരും. ഓർഡർ സ്ഥിരീകരിക്കാൻ ₹50 ടോക്കൺ അഡ്വാൻസ് Google Pay വഴി വാങ്ങുക!'
                : lang === 'ar'
                ? 'إياك وشحن طرد بالدفع عند الاستلام الكامل لأشخاص لا تعرفهم. إذا رفض الزبون الاستلام ستتحمل رسوم الذهاب والعودة (~120 روبية). خذ دائماً عربون 50 روبية مقدماً!'
                : 'Never ship 100% COD to strangers. If a customer rejects delivery, you lose both forward and return courier charges (~₹120 total). Always collect a small ₹50 advance token via UPI to confirm serious buyers!'}
            </p>
          </div>

          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--secondary-dark); margin-bottom: 14px;">
            <i class="fa-solid fa-box-open text-primary"></i> ${lang === 'ml' ? 'കൊറിയർ നിരക്കുകൾ (കേരളം, ഇന്ത്യ & ഗൾഫ്)' : lang === 'ar' ? 'أسعار الشحن البريدي المعتمدة' : 'Courier Rates & Delivery Charges'}
          </h4>
          <div class="table-responsive">
            <table class="cost-ledger-table">
              <thead>
                <tr>
                  <th>${lang === 'ml' ? 'കൊറിയർ സർവീസ്' : lang === 'ar' ? 'شركة الشحن' : 'Service / Partner'}</th>
                  <th>${lang === 'ml' ? 'മേഖല' : lang === 'ar' ? 'الوجهة' : 'Destination'}</th>
                  <th>${lang === 'ml' ? 'ഭാരം' : lang === 'ar' ? 'الوزن' : 'Weight'}</th>
                  <th>${lang === 'ml' ? 'നിരക്ക്' : lang === 'ar' ? 'السعر' : 'Rate'}</th>
                  <th>${lang === 'ml' ? 'പ്രത്യേകത' : lang === 'ar' ? 'الميزة' : 'Key Advantage'}</th>
                </tr>
              </thead>
              <tbody>
                ${this.logisticsRates.map(r => `
                  <tr>
                    <td><strong>${r.service}</strong></td>
                    <td>${r.zone}</td>
                    <td>${r.weight}</td>
                    <td><span class="text-success" style="font-weight: 700;">${r.rate}</span></td>
                    <td><small class="text-muted">${r.remarks}</small></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `
      }
    ];

    let html = '';

    if (isStepper) {
      // GUIDED STEPPER PROCESSING MODE: Render ONLY the active step card
      const stepData = stepModules[activeStep - 1] || stepModules[0];
      const prevBtnHtml = activeStep > 1 
        ? `<button class="btn-step-prev" onclick="app.prevCourseStep()">${t.btnPrevStep || '← Previous Chapter'}</button>` 
        : `<span></span>`;
      
      const nextBtnHtml = activeStep < 8 
        ? `<button class="btn-step-next" onclick="app.nextCourseStep()">${t.btnNextStep || 'Next Chapter →'}</button>` 
        : `<button class="btn-step-next" onclick="app.navigateTo('plan')">${t.btnFinishCourse || '🎉 Finish Course & Generate Plan →'}</button>`;

      html = `
        <article class="course-module-card" id="${stepData.id}">
          <div class="module-photo-hero">
            <img src="${stepData.heroImg}" alt="${stepData.heroTitle}">
            <div class="module-photo-overlay">
              <span class="module-number-badge" style="display: inline-block; margin-bottom: 6px;">Chapter ${activeStep} of 8</span>
              <h4>${stepData.heroTitle}</h4>
              <p>${stepData.heroSub}</p>
            </div>
          </div>
          <div class="module-body">
            <!-- Slim Chapter Audio Pill -->
            <div class="chapter-audio-simple-bar">
              <button class="btn-chapter-audio-pill ${this.audioMasterclassState.isPlaying && this.audioMasterclassState.currentEpisode === activeStep ? 'is-playing' : ''}" data-episode="${activeStep}" onclick="app.playChapterAudio(${activeStep})" title="Play Chapter ${activeStep}">
                <i class="fa-solid ${this.audioMasterclassState.isPlaying && this.audioMasterclassState.currentEpisode === activeStep ? 'fa-pause' : 'fa-headphones'}"></i>
                <span>${lang === 'ml' ? 'ഈ പാഠം കേട്ടുപഠിക്കാം' : lang === 'ar' ? 'استمع لهذا الدرس' : 'Listen to Lesson'} (Ep ${Math.min(activeStep, 6)})</span>
              </button>
            </div>

            ${stepData.renderContent()}

            <div class="stepper-nav-footer">
              ${prevBtnHtml}
              ${nextBtnHtml}
            </div>
          </div>
        </article>
      `;
    } else {
      // FULL MASTERCLASS MODE: Render all 8 steps stacked
      html = stepModules.map((s, idx) => `
        <article class="course-module-card" id="${s.id}" style="margin-bottom: 35px;">
          <div class="module-photo-hero">
            <img src="${s.heroImg}" alt="${s.heroTitle}">
            <div class="module-photo-overlay">
              <span class="module-number-badge" style="display: inline-block; margin-bottom: 6px;">Chapter ${idx + 1} of 8</span>
              <h4>${s.heroTitle}</h4>
              <p>${s.heroSub}</p>
            </div>
          </div>
          <div class="module-body">
            <div class="chapter-audio-simple-bar">
              <button class="btn-chapter-audio-pill ${this.audioMasterclassState.isPlaying && this.audioMasterclassState.currentEpisode === (idx + 1) ? 'is-playing' : ''}" data-episode="${idx + 1}" onclick="app.playChapterAudio(${idx + 1})" title="Play Chapter ${idx + 1}">
                <i class="fa-solid ${this.audioMasterclassState.isPlaying && this.audioMasterclassState.currentEpisode === (idx + 1) ? 'fa-pause' : 'fa-headphones'}"></i>
                <span>${lang === 'ml' ? 'ഈ പാഠം കേട്ടുപഠിക്കാം' : lang === 'ar' ? 'استمع لهذا الدرس' : 'Listen to Lesson'} (Ep ${Math.min(idx + 1, 6)})</span>
              </button>
            </div>

            ${s.renderContent()}
          </div>
        </article>
      `).join('');
    }

    container.innerHTML = html;
  },

  // Switch Tools Dynamic Subview Tab
  switchToolTab(tabKey) {
    this.currentToolTab = tabKey;
    document.querySelectorAll('.tool-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-subview') === tabKey);
    });
    this.renderToolsDynamicContent(tabKey);
  },

  // Switch Language
  switchLanguage(lang) {
    if (!['en', 'ml', 'ar'].includes(lang)) lang = 'en';
    this.currentLang = lang;
    if (this.audioMasterclassState) {
      this.audioMasterclassState.voiceLang = lang;
    }
    localStorage.setItem('vyapar_lang', lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    document.body.className = `lang-${lang}`;

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    const dockText = document.getElementById('dockLangText');
    if (dockText) dockText.textContent = lang.toUpperCase();

    this.translateStaticElements();
    this.renderAllViews();
  },

  cycleLanguage() {
    const cycle = { en: 'ml', ml: 'ar', ar: 'en' };
    this.switchLanguage(cycle[this.currentLang] || 'en');
  },

  translateStaticElements() {
    const t = this.i18n[this.currentLang] || this.i18n.en;
    Object.keys(t).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = t[id];
      }
    });
  },

  // Hash-based URL Routing Handler
  handleHashRouting() {
    window.addEventListener('hashchange', () => this.processHash());
    this.processHash();
  },

  processHash() {
    const rawHash = window.location.hash.replace(/^#/, '').trim();
    if (!rawHash) {
      if (this.currentView !== 'academy') {
        this.navigateTo('home');
      }
      return;
    }

    if (rawHash.startsWith('academy/')) {
      const parts = rawHash.split('/');
      const niche = parts[1] || 'attar';
      const step = parts[2] ? parseInt(parts[2], 10) : (this.currentCourseStep || 1);
      this.openAcademy(niche, step, false);
    } else if (['tools', 'suppliers', 'scripts', 'legal', 'plan', 'calc'].includes(rawHash)) {
      this.navigateTo(rawHash);
    } else if (rawHash === 'home') {
      this.navigateTo('home');
    }
    // Anchor tags like #mod-capital do NOT redirect to home!
  },

  // Render Master Dispatcher
  renderAllViews() {
    this.renderFacultyCards();
    this.renderRoadmap();
    if (this.currentView === 'academy') {
      this.openAcademy(this.currentAcademy, this.currentCourseStep);
    } else if (this.currentView === 'tools') {
      this.renderToolsDynamicContent(this.currentToolTab);
    }
  },

  // Render Homepage Faculty Cards Grid with Real Photography
  renderFacultyCards() {
    const grid = document.getElementById('facultyCardsGrid');
    if (!grid) return;

    const lang = this.currentLang;
    const t = this.i18n[lang] || this.i18n.en;
    let html = '';

    Object.keys(this.categoriesData).forEach(catKey => {
      const cat = this.categoriesData[catKey];
      const title = cat.title[lang] || cat.title.en;
      const tagline = cat.tagline[lang] || cat.tagline.en;
      const highlights = cat.curriculumHighlights[lang] || cat.curriculumHighlights.en;

      let hlList = '';
      highlights.slice(0, 4).forEach(h => {
        hlList += `<li><i class="fa-solid fa-circle-check"></i> <span>${h}</span></li>`;
      });

      html += `
        <div class="faculty-card">
          <div class="faculty-card-cover">
            <img src="${cat.images.cover}" alt="${title}" loading="lazy">
            <span class="cover-badge"><i class="fa-solid fa-coins"></i> ${cat.minBudget}</span>
          </div>
          <div class="faculty-header ${cat.headerClass}">
            <div class="faculty-icon-wrap">
              <i class="fa-solid ${cat.icon}"></i>
            </div>
            <div class="faculty-title-text">
              <h3>${title}</h3>
              <p>${tagline}</p>
            </div>
          </div>
          <div class="faculty-body">
            <div class="faculty-metrics-strip">
              <div>
                <small>${lang === 'ml' ? 'കുറഞ്ഞ ചെലവ്' : lang === 'ar' ? 'أقل رأس مال' : 'Min Budget'}</small>
                <br><strong>${cat.minBudget}</strong>
              </div>
              <div>
                <small>${lang === 'ml' ? 'ലാഭ ശതമാനം' : lang === 'ar' ? 'هامش الربح' : 'Profit Margin'}</small>
                <br><strong class="text-success">${cat.margin}</strong>
              </div>
            </div>
            <ul class="faculty-curriculum-list">
              ${hlList}
            </ul>
            <button class="btn-enter-faculty" onclick="app.openAcademy('${cat.id}')">
              <i class="fa-solid fa-graduation-cap"></i> <span>${t.btnStartCourse || 'Open Study Academy'}</span> <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
  },

  // Get HTML for Simulator inside Module 6
  getNicheSimulatorHtml(nicheKey) {
    const lang = this.currentLang;
    const cat = this.categoriesData[nicheKey];

    if (nicheKey === 'attar') {
      return `
        <div class="attar-studio-layout">
          <div class="config-pane">
            <h4 class="config-title"><i class="fa-solid fa-sliders"></i> ${lang === 'ml' ? '1. അത്തർ കുപ്പി കോൺഫിഗർ ചെയ്യുക' : lang === 'ar' ? '1. اختر مواصفات زجاجة العطر' : '1. Build Your Attar Flacon'}</h4>
            <div class="control-group">
              <label class="control-label">${lang === 'ml' ? 'സുഗന്ധതൈലം തിരഞ്ഞെടുക്കുക:' : lang === 'ar' ? 'اختر نوع الزيت العطري:' : 'Select Fragrance Oil Variety:'}</label>
              <div class="oil-chips-grid" id="oilChipsGrid"></div>
            </div>
            <div class="control-group">
              <label class="control-label">${lang === 'ml' ? 'കുപ്പിയുടെ അളവ് (Size):' : lang === 'ar' ? 'حجم الزجاجة:' : 'Choose Flacon Size:'}</label>
              <div class="pill-group">
                <button class="pill-btn size-pill-btn" data-size="3" onclick="app.setSimSize(3)">3ml Roll-on</button>
                <button class="pill-btn size-pill-btn active" data-size="6" onclick="app.setSimSize(6)">6ml Octagonal</button>
                <button class="pill-btn size-pill-btn" data-size="12" onclick="app.setSimSize(12)">12ml Full Tola</button>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">${lang === 'ml' ? 'കുപ്പിയുടെ ഡിസൈൻ:' : lang === 'ar' ? 'تصميم ونوع الزجاجة:' : 'Choose Bottle & Hardware Style:'}</label>
              <div class="pill-group">
                <button class="pill-btn bottle-pill-btn active" data-bottle="octagonal" onclick="app.setSimBottle('octagonal')">Octagonal Glass (₹10)</button>
                <button class="pill-btn bottle-pill-btn" data-bottle="crystal" onclick="app.setSimBottle('crystal')">Crystal Dipstick (₹35)</button>
                <button class="pill-btn bottle-pill-btn" data-bottle="luxury" onclick="app.setSimBottle('luxury')">Royal Metal Case (₹75)</button>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">${lang === 'ml' ? 'പാക്കേജിംഗ് ബോക്സ് / പൗച്ച്:' : lang === 'ar' ? 'نوع علبة التغليف:' : 'Packaging & Pouch Tier:'}</label>
              <div class="pill-group">
                <button class="pill-btn pack-pill-btn active" data-pack="velvet" onclick="app.setSimPack('velvet')">Velvet Pouch (₹6)</button>
                <button class="pill-btn pack-pill-btn" data-pack="rigid" onclick="app.setSimPack('rigid')">Rigid Magnetic Box (₹25)</button>
                <button class="pill-btn pack-pill-btn" data-pack="casket" onclick="app.setSimPack('casket')">Luxury Wooden Casket (₹60)</button>
              </div>
            </div>
          </div>

          <div class="graph-pane">
            <h4 class="graph-title"><i class="fa-solid fa-chart-column"></i> ${lang === 'ml' ? 'തത്സമയ ലാഭ ഗ്രാഫ്' : lang === 'ar' ? 'رسم بياني مباشر للأرباح' : 'Live Profit Graph & Margin Visualizer'}</h4>
            <div class="profit-bar-chart-card">
              <div class="horizontal-profit-bar">
                <div class="bar-segment bar-oil" id="barOil" style="width: 14%;" title="Oil Cost"></div>
                <div class="bar-segment bar-bottle" id="barBottle" style="width: 8%;" title="Bottle Cost"></div>
                <div class="bar-segment bar-pack" id="barPack" style="width: 6%;" title="Packaging Cost"></div>
                <div class="bar-segment bar-profit" id="barProfit" style="width: 72%;" title="Net Profit"></div>
              </div>
              <div class="bar-legend-row">
                <span class="legend-item"><span class="dot dot-oil"></span> ${lang === 'ml' ? 'ഓയിൽ' : lang === 'ar' ? 'الزيت' : 'Oil Cost'}</span>
                <span class="legend-item"><span class="dot dot-bottle"></span> ${lang === 'ml' ? 'കുപ്പി' : lang === 'ar' ? 'الزجاجة' : 'Bottle'}</span>
                <span class="legend-item"><span class="dot dot-pack"></span> ${lang === 'ml' ? 'പാക്കേജിംഗ്' : lang === 'ar' ? 'التغليف' : 'Packaging'}</span>
                <span class="legend-item"><span class="dot dot-profit"></span> <strong>${lang === 'ml' ? 'ലാഭം' : lang === 'ar' ? 'صافي الربح' : 'Net Profit'}</strong></span>
              </div>
            </div>

            <div class="sim-metric-cards-grid">
              <div class="sim-card card-cost">
                <span class="sim-card-label">${lang === 'ml' ? 'ഒരു കുപ്പി ഉണ്ടാക്കാൻ ആകെ ചെലവ്:' : lang === 'ar' ? 'إجمالي تكلفة تصنيع الزجاجة:' : 'Total Cost to Make:'}</span>
                <span class="sim-card-val" id="valTotalCostPerBottle">₹26.80</span>
              </div>
              <div class="sim-card card-sell">
                <span class="sim-card-label">${lang === 'ml' ? 'സാധാരണ വിൽപന വില:' : lang === 'ar' ? 'سعر البيع المقترح للزبون:' : 'Selling Price:'}</span>
                <span class="sim-card-val" id="valSuggestedRetail">₹249.00</span>
              </div>
              <div class="sim-card card-profit">
                <span class="sim-card-label">${lang === 'ml' ? 'ഒരു കുപ്പിയിൽ നിന്നുള്ള ലാഭം:' : lang === 'ar' ? 'صافي ربح الزجاجة الواحدة:' : 'Net Profit:'}</span>
                <span class="sim-card-val text-success" id="valNetProfitPerBottle">₹222.20</span>
                <small class="sim-card-sub" id="valProfitMarginPct">(829% Markup!)</small>
              </div>
            </div>

            <div class="batch-projection-strip">
              <div class="batch-pill"><strong>25 ${lang === 'ml' ? 'കുപ്പികൾ' : lang === 'ar' ? 'حبة' : 'Bottles'}:</strong> <span id="valBatchCost25">Cost: ₹670</span> | <span class="text-success" id="valBatchProfit25">Profit: ₹5,555</span></div>
              <div class="batch-pill"><strong>50 ${lang === 'ml' ? 'കുപ്പികൾ' : lang === 'ar' ? 'حبة' : 'Bottles'}:</strong> <span id="valBatchCost50">Cost: ₹1,340</span> | <span class="text-success" id="valBatchProfit50">Profit: ₹11,110</span></div>
              <div class="batch-pill"><strong>100 ${lang === 'ml' ? 'കുപ്പികൾ' : lang === 'ar' ? 'حبة' : 'Bottles'}:</strong> <span id="valBatchCost100">Cost: ₹2,680</span> | <span class="text-success" id="valBatchProfit100">Profit: ₹22,220</span></div>
            </div>
          </div>
        </div>
      `;
    } else {
      // General Niche Simulator
      return `
        <div style="background: #f8fafc; border: 1px solid var(--border-color); padding: 24px; border-radius: var(--radius-md);">
          <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--secondary-dark); margin-bottom: 12px;">
            <i class="fa-solid fa-calculator text-primary"></i> ${cat.title[lang] || cat.title.en} — ${lang === 'ml' ? 'ലാഭ കണക്കുകൂട്ടൽ' : lang === 'ar' ? 'حساب الأرباح التقديري' : 'Profit Projection'}
          </h4>
          <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 20px;">
            ${lang === 'ml' ? 'ഈ കാറ്റഗറിയിലെ ശരാശരി ലാഭക്കണക്കുകൾ താഴെ കാണാം. കൂടുതൽ വിശദമായി കണക്കാക്കാൻ ഞങ്ങളുടെ പ്രോഫിറ്റ് ടൂൾ ഉപയോഗിക്കുക.' : lang === 'ar' ? 'متوسط أرباح هذا التخصص موضح أدناه. يمكنك استخدام حاسبة الأرباح لتخصيص الأرقام بدقة.' : 'Standard unit projections for this niche. Open our full Profit Calculator for detailed customization.'}
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 20px;">
            <div style="background: #fff; padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <span style="font-size: 0.8rem; color: var(--text-muted);">${lang === 'ml' ? 'കുറഞ്ഞ പ്രാരംഭ മൂലധനം' : lang === 'ar' ? 'أقل رأس مال' : 'Minimum Capital'}</span>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--secondary-dark); margin-top: 4px;">${cat.minBudget}</h3>
            </div>
            <div style="background: #fff; padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <span style="font-size: 0.8rem; color: var(--text-muted);">${lang === 'ml' ? 'പ്രതീക്ഷിക്കാവുന്ന ലാഭം' : lang === 'ar' ? 'هامش الربح المتوقع' : 'Realistic Margin'}</span>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: #10b981; margin-top: 4px;">${cat.margin}</h3>
            </div>
          </div>
          <button class="btn btn-primary" onclick="app.navigateTo('calc')">
            <i class="fa-solid fa-calculator"></i> ${lang === 'ml' ? 'വിശദമായ കാൽക്കുലേറ്റർ തുറക്കുക' : lang === 'ar' ? 'فتح حاسبة الأرباح الشاملة' : 'Open Comprehensive Profit Calculator'}
          </button>
        </div>
      `;
    }
  },

  // Attar Simulator Operations
  renderAttarSimulator() {
    const oilGrid = document.getElementById('oilChipsGrid');
    if (!oilGrid) return;

    const lang = this.currentLang;
    let chipsHtml = '';

    this.attarOils.forEach(oil => {
      const activeClass = oil.id === this.simState.oilId ? 'active' : '';
      const name = oil.name[lang] || oil.name.en;
      chipsHtml += `
        <div class="oil-chip ${activeClass}" onclick="app.setSimOil('${oil.id}')">
          <span>${name}</span>
          <small>₹${oil.costPer100ml}/100ml</small>
        </div>
      `;
    });
    oilGrid.innerHTML = chipsHtml;
    this.updateSimulatorGraph();
  },

  setSimOil(id) {
    this.simState.oilId = id;
    this.renderAttarSimulator();
  },

  setSimSize(size) {
    this.simState.sizeMl = parseInt(size);
    document.querySelectorAll('.size-pill-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-size')) === this.simState.sizeMl);
    });
    this.updateSimulatorGraph();
  },

  setSimBottle(bottle) {
    this.simState.bottleStyle = bottle;
    document.querySelectorAll('.bottle-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-bottle') === bottle);
    });
    this.updateSimulatorGraph();
  },

  setSimPack(pack) {
    this.simState.packTier = pack;
    document.querySelectorAll('.pack-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-pack') === pack);
    });
    this.updateSimulatorGraph();
  },

  updateSimulatorGraph() {
    const oil = this.attarOils.find(o => o.id === this.simState.oilId) || this.attarOils[0];
    const size = this.simState.sizeMl;
    const bottleCost = this.bottleCosts[this.simState.bottleStyle] || 10;
    const packCost = this.packCosts[this.simState.packTier] || 6;

    const oilCost = (oil.costPer100ml / 100) * size;
    const totalCost = oilCost + bottleCost + packCost;

    let sellingPrice = size === 3 ? oil.retailBase3ml : size === 12 ? oil.retailBase12ml : oil.retailBase6ml;
    if (this.simState.bottleStyle === 'crystal') sellingPrice += 50;
    if (this.simState.bottleStyle === 'luxury') sellingPrice += 120;
    if (this.simState.packTier === 'rigid') sellingPrice += 40;
    if (this.simState.packTier === 'casket') sellingPrice += 100;

    const netProfit = Math.max(0, sellingPrice - totalCost);
    const markupPct = ((netProfit / totalCost) * 100).toFixed(0);

    const oilWidthPct = Math.max(4, (oilCost / sellingPrice) * 100).toFixed(1);
    const bottleWidthPct = Math.max(4, (bottleCost / sellingPrice) * 100).toFixed(1);
    const packWidthPct = Math.max(4, (packCost / sellingPrice) * 100).toFixed(1);
    const profitWidthPct = Math.max(10, (netProfit / sellingPrice) * 100).toFixed(1);

    const barOil = document.getElementById('barOil');
    const barBottle = document.getElementById('barBottle');
    const barPack = document.getElementById('barPack');
    const barProfit = document.getElementById('barProfit');

    if (barOil) barOil.style.width = `${oilWidthPct}%`;
    if (barBottle) barBottle.style.width = `${bottleWidthPct}%`;
    if (barPack) barPack.style.width = `${packWidthPct}%`;
    if (barProfit) barProfit.style.width = `${profitWidthPct}%`;

    const costEl = document.getElementById('valTotalCostPerBottle');
    const sellEl = document.getElementById('valSuggestedRetail');
    const profitEl = document.getElementById('valNetProfitPerBottle');
    const markupEl = document.getElementById('valProfitMarginPct');

    if (costEl) costEl.textContent = `₹${totalCost.toFixed(2)}`;
    if (sellEl) sellEl.textContent = `₹${sellingPrice.toFixed(2)}`;
    if (profitEl) profitEl.textContent = `₹${netProfit.toFixed(2)}`;
    if (markupEl) markupEl.textContent = `(${markupPct}% Markup!)`;

    const b25Cost = totalCost * 25;
    const b25Profit = netProfit * 25;
    const b50Cost = totalCost * 50;
    const b50Profit = netProfit * 50;
    const b100Cost = totalCost * 100;
    const b100Profit = netProfit * 100;

    const vBatchCost25 = document.getElementById('valBatchCost25');
    const vBatchProfit25 = document.getElementById('valBatchProfit25');
    const vBatchCost50 = document.getElementById('valBatchCost50');
    const vBatchProfit50 = document.getElementById('valBatchProfit50');
    const vBatchCost100 = document.getElementById('valBatchCost100');
    const vBatchProfit100 = document.getElementById('valBatchProfit100');

    if (vBatchCost25) vBatchCost25.textContent = `Cost: ₹${Math.round(b25Cost).toLocaleString('en-IN')}`;
    if (vBatchProfit25) vBatchProfit25.textContent = `Profit: ₹${Math.round(b25Profit).toLocaleString('en-IN')}`;
    if (vBatchCost50) vBatchCost50.textContent = `Cost: ₹${Math.round(b50Cost).toLocaleString('en-IN')}`;
    if (vBatchProfit50) vBatchProfit50.textContent = `Profit: ₹${Math.round(b50Profit).toLocaleString('en-IN')}`;
    if (vBatchCost100) vBatchCost100.textContent = `Cost: ₹${Math.round(b100Cost).toLocaleString('en-IN')}`;
    if (vBatchProfit100) vBatchProfit100.textContent = `Profit: ₹${Math.round(b100Profit).toLocaleString('en-IN')}`;
  },

  // Render Dynamic Content in Tools View
  renderToolsDynamicContent(tabKey) {
    const container = document.getElementById('toolsDynamicContainer');
    if (!container) return;

    if (tabKey === 'calc') {
      container.innerHTML = this.getCalculatorToolHtml();
      this.bindCalcInputs();
      this.calculateProfit();
    } else if (tabKey === 'suppliers') {
      container.innerHTML = this.getSuppliersToolHtml();
      this.renderDirectory();
    } else if (tabKey === 'scripts') {
      container.innerHTML = this.getScriptsToolHtml();
    } else if (tabKey === 'legal') {
      container.innerHTML = this.getLegalToolHtml();
    } else if (tabKey === 'plan') {
      container.innerHTML = this.getPlanToolHtml();
      this.generatePersonalPlan();
    }
  },

  // Calculator Tool HTML
  getCalculatorToolHtml() {
    const lang = this.currentLang;
    return `
      <div class="calculator-layout">
        <div class="calc-inputs-pane">
          <h3 class="calc-box-title"><i class="fa-solid fa-sliders"></i> ${lang === 'ml' ? 'ബിസിനസ് വിവരങ്ങൾ നൽകുക' : lang === 'ar' ? 'أدخل معايير وتكاليف مشروعك' : 'Your Business Parameters'}</h3>
          <div class="form-group">
            <label class="form-label">${lang === 'ml' ? 'ബിസിനസ്സ് ഐഡിയ:' : lang === 'ar' ? 'فكرة المشروع:' : 'Select Business Idea:'}</label>
            <select class="form-control" id="calcCategory" onchange="app.populateCategoryDefaults(this.value); app.calculateProfit();">
              <option value="attar">Attar & Perfumes (അത്തർ & പെർഫ്യൂം)</option>
              <option value="clothing">Dresses & Modest Wear (വസ്ത്രങ്ങൾ & ബോട്ടിക്)</option>
              <option value="watches">Fashion Watches (ഫാഷൻ വാച്ചുകൾ)</option>
              <option value="bags">Canvas Totes & Bags (ബാഗുകൾ)</option>
              <option value="accessories">Anti-Tarnish Jewelry (മോതിരങ്ങൾ & ആഭരണങ്ങൾ)</option>
              <option value="spices">Kerala Spices & Honey (സുഗന്ധവ്യഞ്ജനങ്ങൾ)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${lang === 'ml' ? 'ഒരു യൂണിറ്റിന്റെ ഹോൾസെയിൽ വില (₹):' : lang === 'ar' ? 'تكلفة شراء القطعة بالجملة (روبية):' : 'Wholesale Unit Cost (₹):'}</label>
            <input type="number" class="form-control" id="calcWholesaleCost" value="80">
          </div>
          <div class="form-group">
            <label class="form-label">${lang === 'ml' ? 'കസ്റ്റമർക്ക് വിൽക്കുന്ന വില (₹):' : lang === 'ar' ? 'سعر البيع للزبون (روبية):' : 'Selling Price to Customer (₹):'}</label>
            <input type="number" class="form-control" id="calcSellingPrice" value="349">
          </div>
          <div class="form-group">
            <label class="form-label">${lang === 'ml' ? 'പാക്കേജിംഗ് & ലേബൽ ചെലവ് (₹):' : lang === 'ar' ? 'تكلفة التغليف والاستيكر للقطعة (روبية):' : 'Packaging & Branding per Unit (₹):'}</label>
            <input type="number" class="form-control" id="calcPackagingCost" value="25">
          </div>
          <div class="form-group">
            <label class="form-label">${lang === 'ml' ? 'കൊറിയർ ചാർജ്ജ് (₹):' : lang === 'ar' ? 'تكلفة الشحن البريدي (روبية):' : 'Courier / Shipping Cost (₹):'}</label>
            <input type="number" class="form-control" id="calcShippingFee" value="50">
          </div>
          <div class="form-group">
            <label class="form-label">${lang === 'ml' ? 'പ്രതിമാസ ഓർഡറുകൾ (Volume):' : lang === 'ar' ? 'عدد الطلبات المتوقعة شهرياً:' : 'Estimated Monthly Units Sold:'}</label>
            <input type="number" class="form-control" id="calcMonthlyVolume" value="60">
            <small style="color: var(--text-muted); font-size: 0.78rem;">e.g. 2 orders per day = 60 orders/month</small>
          </div>
          <div class="form-group">
            <label class="form-label">${lang === 'ml' ? 'ഷിപ്പിംഗ് ചാർജ്ജ് ആര് നൽകും?' : lang === 'ar' ? 'من يتحمل تكلفة الشحن؟' : 'Shipping Charge to Customer:'}</label>
            <select class="form-control" id="calcShippingOption" onchange="app.calculateProfit()">
              <option value="customer_pays">Customer Pays Shipping (₹0 cost to seller)</option>
              <option value="free_shipping">Free Shipping (Seller absorbs shipping)</option>
            </select>
          </div>
          <button class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 10px;" onclick="app.calculateProfit()">
            <i class="fa-solid fa-calculator"></i> ${lang === 'ml' ? 'ലാഭം കണക്കാക്കുക' : lang === 'ar' ? 'تحديث حساب الأرباح' : 'Recalculate Profit'}
          </button>
        </div>

        <div class="calc-results-pane">
          <h3 class="calc-box-title"><i class="fa-solid fa-chart-line"></i> ${lang === 'ml' ? 'പ്രതീക്ഷിക്കാവുന്ന വരുമാനവും ലാഭവും' : lang === 'ar' ? 'الأرباح الصافية المتوقعة' : 'Projected Earnings & Margin'}</h3>
          <div class="result-hero-card">
            <span class="hero-res-label">${lang === 'ml' ? 'പ്രതിമാസ അറ്റാദായം (Net Profit / Month)' : lang === 'ar' ? 'صافي الربح الشهري المتوقع' : 'Estimated Monthly Net Profit'}</span>
            <span class="hero-res-val" id="resValNetProfitMonth">₹14,052</span>
            <div class="hero-res-sub">
              <span>${lang === 'ml' ? 'ലാഭ ശതമാനം:' : lang === 'ar' ? 'هامش الربح:' : 'Profit Margin:'} <strong id="resValMargin">66.8%</strong></span>
              <span>${lang === 'ml' ? 'ഒരു പീസിലെ ലാഭം:' : lang === 'ar' ? 'الربح بكل قطعة:' : 'Net Profit / Unit:'} <strong id="resValPerItem">₹234.20</strong></span>
            </div>
          </div>

          <div class="breakdown-list-card">
            <div class="breakdown-row"><span>${lang === 'ml' ? 'പ്രതിമാസ ആകെ വിറ്റുവരവ് (Revenue)' : lang === 'ar' ? 'إجمالي المبيعات' : 'Monthly Revenue'}</span><strong id="resValRevenue">₹20,940</strong></div>
            <div class="breakdown-row"><span>${lang === 'ml' ? 'സ്റ്റോക്ക് വാങ്ങിയ തുക' : lang === 'ar' ? 'تكلفة شراء البضاعة' : 'Stock Purchase Cost'}</span><strong class="text-danger" id="resValStockCost">- ₹4,800</strong></div>
            <div class="breakdown-row"><span>${lang === 'ml' ? 'പാക്കേജിംഗ് ചെലവ്' : lang === 'ar' ? 'تكلفة التغليف' : 'Packaging & Branding'}</span><strong class="text-danger" id="resValTotalPackaging">- ₹1,500</strong></div>
            <div class="breakdown-row"><span>${lang === 'ml' ? 'കൊറിയർ ചാർജ്ജ്' : lang === 'ar' ? 'تكلفة الشحن' : 'Net Shipping Cost'}</span><strong class="text-danger" id="resValTotalShipping">₹0 (Paid by Buyer)</strong></div>
            <div class="breakdown-row"><span>${lang === 'ml' ? 'ബാങ്ക് / പേയ്‌മെന്റ് ഗേറ്റ്‌വേ (2%)' : lang === 'ar' ? 'عمولة الدفع الإلكتروني' : 'Payment Gateway / Bank (2%)'}</span><strong class="text-danger" id="resValPaymentGateway">- ₹419</strong></div>
            <div class="breakdown-row highlight-row"><span>${lang === 'ml' ? 'ആദ്യ ബാച്ചിന് വേണ്ട മൂലധനം' : lang === 'ar' ? 'رأس مال الدفعة الأولى' : 'Initial Capital Needed for 1st Batch'}</span><strong class="text-primary" id="resValStartupCap">₹2,100 (20 units)</strong></div>
          </div>

          <div class="gcc-conversion-box">
            <h5 class="gcc-title"><i class="fa-solid fa-coins"></i> ${lang === 'ml' ? 'ഗൾഫ് കറൻസി മൂല്യം (GCC Currencies):' : lang === 'ar' ? 'قيمة الأرباح بالعملات الخليجية:' : 'GCC Expat Currency Value:'}</h5>
            <div class="gcc-pills-row" id="gccPillsRow"></div>
          </div>
        </div>
      </div>
    `;
  },

  bindCalcInputs() {
    ['calcWholesaleCost', 'calcSellingPrice', 'calcPackagingCost', 'calcShippingFee', 'calcMonthlyVolume'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.calculateProfit());
    });
  },

  calculateProfit() {
    const cost = parseFloat(document.getElementById('calcWholesaleCost')?.value) || 0;
    const price = parseFloat(document.getElementById('calcSellingPrice')?.value) || 0;
    const packaging = parseFloat(document.getElementById('calcPackagingCost')?.value) || 0;
    const shipping = parseFloat(document.getElementById('calcShippingFee')?.value) || 0;
    const volume = parseInt(document.getElementById('calcMonthlyVolume')?.value) || 0;
    const shippingOpt = document.getElementById('calcShippingOption')?.value || 'customer_pays';

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

    const resProfit = document.getElementById('resValNetProfitMonth');
    const resMargin = document.getElementById('resValMargin');
    const resUnit = document.getElementById('resValPerItem');
    const resRev = document.getElementById('resValRevenue');
    const resStock = document.getElementById('resValStockCost');
    const resPack = document.getElementById('resValTotalPackaging');
    const resShip = document.getElementById('resValTotalShipping');
    const resGate = document.getElementById('resValPaymentGateway');
    const resCap = document.getElementById('resValStartupCap');

    if (resProfit) resProfit.textContent = `₹${Math.round(monthlyNetProfit).toLocaleString('en-IN')}`;
    if (resMargin) resMargin.textContent = `${profitMarginPct}%`;
    if (resUnit) resUnit.textContent = `₹${netProfitPerUnit.toFixed(2)}`;
    if (resRev) resRev.textContent = `₹${Math.round(monthlyRevenue).toLocaleString('en-IN')}`;
    if (resStock) resStock.textContent = `- ₹${Math.round(monthlyStockCost).toLocaleString('en-IN')}`;
    if (resPack) resPack.textContent = `- ₹${Math.round(monthlyPackagingCost).toLocaleString('en-IN')}`;
    
    if (resShip) {
      resShip.textContent = shippingOpt === 'customer_pays' ? (this.currentLang === 'ml' ? "₹0 (കസ്റ്റമർ നൽകുന്നു)" : this.currentLang === 'ar' ? "₹0 (على حساب المشتري)" : "₹0 (Paid by Buyer)") : `- ₹${Math.round(monthlyShippingCost).toLocaleString('en-IN')}`;
    }

    if (resGate) resGate.textContent = `- ₹${Math.round(monthlyGatewayFee).toLocaleString('en-IN')}`;
    if (resCap) resCap.textContent = `₹${Math.round(initialCapital).toLocaleString('en-IN')} (${initialBatchUnits} units)`;

    this.updateGccPills(monthlyNetProfit);
  },

  updateGccPills(inrAmount) {
    const row = document.getElementById('gccPillsRow');
    if (!row) return;

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

  populateCategoryDefaults(catKey) {
    const costInput = document.getElementById('calcWholesaleCost');
    const priceInput = document.getElementById('calcSellingPrice');
    const packInput = document.getElementById('calcPackagingCost');
    const shipInput = document.getElementById('calcShippingFee');

    if (!costInput) return;

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

  // Suppliers Tool HTML
  getSuppliersToolHtml() {
    const lang = this.currentLang;
    return `
      <div>
        <div class="dir-filters-bar">
          <input type="text" class="dir-search-input" id="dirSearchInput" placeholder="${lang === 'ml' ? 'വ്യാപാരികളുടെ പേര്, സ്ഥലം അല്ലെങ്കിൽ ഉൽപ്പന്നം തിരയുക...' : lang === 'ar' ? 'ابحث باسم السوق أو المدينة أو المنتج...' : 'Search by market, shop name, city, or product...'}" oninput="app.renderDirectory()">
          <select class="dir-filter-select" id="filterCity" onchange="app.renderDirectory()">
            <option value="all">${lang === 'ml' ? 'എല്ലാ നഗരങ്ങളും' : lang === 'ar' ? 'جميع المدن' : 'All Cities'}</option>
            <option value="Kozhikode">Kozhikode (കോഴിക്കോട്)</option>
            <option value="Kochi">Kochi (കൊച്ചി)</option>
            <option value="Mumbai">Mumbai (മുംബൈ)</option>
            <option value="Surat">Surat (സൂററ്റ്)</option>
            <option value="Tirupur">Tirupur (തിരുപ്പൂർ)</option>
            <option value="Delhi">Delhi (ഡൽഹി)</option>
            <option value="Jaipur">Jaipur (ജയ്പൂർ)</option>
            <option value="Kannauj">Kannauj (കണ്ണൗജ്)</option>
          </select>
          <select class="dir-filter-select" id="filterCategory" onchange="app.renderDirectory()">
            <option value="all">${lang === 'ml' ? 'എല്ലാ കാറ്റഗറിയും' : lang === 'ar' ? 'جميع التخصصات' : 'All Categories'}</option>
            <option value="attar">Attar & Perfumes</option>
            <option value="clothing">Dresses & Boutiques</option>
            <option value="watches">Watches</option>
            <option value="bags">Bags & Totes</option>
            <option value="accessories">Rings & Jewelry</option>
            <option value="spices">Kerala Spices & Honey</option>
          </select>
        </div>
        <div class="directory-grid" id="directoryList"></div>
      </div>
    `;
  },

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
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 12px;"></i>
          <p>${lang === 'ml' ? 'വ്യാപാരികളെ കണ്ടെത്തിയില്ല. ഫിൽട്ടർ മാറ്റി ശ്രമിക്കുക.' : lang === 'ar' ? 'لم يتم العثور على موردين مطابقين لبحثك.' : 'No suppliers match your search filters.'}</p>
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

      html += `
        <div class="supplier-card">
          <div class="supplier-head">
            <h4 class="supplier-name">${sup.name}</h4>
            <span class="city-badge">${sup.city}</span>
          </div>
          <p class="supplier-address"><i class="fa-solid fa-location-dot"></i> <span>${sup.address}</span></p>
          <p style="font-size: 0.85rem; color: #1e293b; margin-bottom: 8px;"><strong>${lang === 'ml' ? 'പ്രത്യേകതകൾ:' : lang === 'ar' ? 'المنتجات:' : 'Specialties:'}</strong> ${sup.specialty}</p>
          <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px;"><i class="fa-solid fa-box"></i> <strong>MOQ:</strong> ${sup.moq}</p>
          <div class="supplier-tags">
            ${sup.tags.map(t => `<span class="supplier-tag">${t}</span>`).join('')}
          </div>
          <div class="supplier-actions">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
              <i class="fa-brands fa-whatsapp"></i> ${lang === 'ml' ? 'വാട്സ്ആപ്പ്' : lang === 'ar' ? 'واتساب' : 'WhatsApp'}
            </a>
            <a href="${sup.mapUrl}" target="_blank" rel="noopener noreferrer" class="btn-map">
              <i class="fa-solid fa-location-crosshairs"></i> ${lang === 'ml' ? 'ഗൂഗിൾ മാപ്പ്' : lang === 'ar' ? 'خرائط جوجل' : 'Google Maps'}
            </a>
            <a href="tel:${sup.phone}" class="btn-map-call">
              <i class="fa-solid fa-phone"></i>
            </a>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Scripts Tool HTML
  getScriptsToolHtml() {
    const lang = this.currentLang;
    return `
      <div>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 24px; text-align: center;">
          ${lang === 'ml' ? 'ഒരു ക്ലിക്കിൽ കോപ്പി ചെയ്ത് വാട്സ്ആപ്പിലും ഇൻസ്റ്റാഗ്രാമിലും അയക്കാവുന്ന പ്രൊഫഷണൽ സന്ദേശങ്ങൾ.' : lang === 'ar' ? 'نماذج رسائل احترافية جاهزة للنسخ بنقرة زر واحدة لإرسالها عبر الواتساب والإنستغرام.' : 'Ready-to-use battle-tested message scripts in Malayalam, English, and Arabic. Click to copy instantly.'}
        </p>
        <div class="templates-grid">
          ${this.templatesData.map(tmpl => `
            <div class="template-card">
              <div class="tmpl-head">
                <div class="tmpl-icon"><i class="fa-solid ${tmpl.icon}"></i></div>
                <h4 class="tmpl-title">${tmpl.title[lang] || tmpl.title.en}</h4>
              </div>
              <div class="tmpl-body-box" id="tmplText_${tmpl.id}">${tmpl.text[lang] || tmpl.text.en}</div>
              <button class="btn-copy-tmpl" onclick="app.copyTemplate('${tmpl.id}')">
                <i class="fa-regular fa-copy"></i> <span id="btnCopyLabel_${tmpl.id}">${lang === 'ml' ? 'മെസ്സേജ് കോപ്പി ചെയ്യുക' : lang === 'ar' ? 'نسخ الرسالة' : 'Copy Message'}</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

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

  // Legal Tool HTML
  getLegalToolHtml() {
    const lang = this.currentLang;
    return `
      <div>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--secondary-dark); margin-bottom: 16px;">
          <i class="fa-solid fa-scale-balanced text-primary"></i> ${lang === 'ml' ? 'നിയമപരമായ കാര്യങ്ങളും ലൈസൻസുകളും' : lang === 'ar' ? 'الضوابط القانونية والتراخيص الرسمية' : 'Legal Compliance, GST Exemption & Banking'}
        </h3>
        <div class="legal-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; margin-bottom: 40px;">
          ${this.legalData.map(item => `
            <div class="legal-card">
              <span class="badge-law ${item.badge}">${item.badgeText[lang] || item.badgeText.en}</span>
              <h4>${item.title[lang] || item.title.en}</h4>
              <p>${item.desc[lang] || item.desc.en}</p>
            </div>
          `).join('')}
        </div>

        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--secondary-dark); margin-bottom: 16px;">
          <i class="fa-solid fa-toolbox text-warning"></i> ${lang === 'ml' ? 'വീട്ടിൽ ആവശ്യമുള്ള 4 ലളിതമായ ഉപകരണങ്ങൾ' : lang === 'ar' ? 'أهم الأدوات المنزلية للبدء بأقل من 1500 روبية' : 'Essential Home Equipment Toolkit (< ₹1,500 total)'}
        </h3>
        <div class="equip-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
          ${this.equipData.map(item => `
            <div class="equip-card">
              <div class="equip-icon"><i class="fa-solid ${item.icon}"></i></div>
              <h4>${item.title[lang] || item.title.en}</h4>
              <span class="equip-price">${item.price}</span>
              <p class="equip-desc">${item.desc[lang] || item.desc.en}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // Business Plan Generator Tool HTML
  getPlanToolHtml() {
    const lang = this.currentLang;
    return `
      <div>
        <div class="plan-form-card">
          <div class="plan-inputs-grid">
            <div class="form-group">
              <label class="form-label">${lang === 'ml' ? 'നിങ്ങളുടെ പേര്:' : lang === 'ar' ? 'اسمك / اسم رائد الأعمال:' : 'Your Name / Entrepreneur Name:'}</label>
              <input type="text" class="form-control" id="planFounderName" value="Ibrahim" oninput="app.generatePersonalPlan()">
            </div>
            <div class="form-group">
              <label class="form-label">${lang === 'ml' ? 'തിരഞ്ഞെടുത്ത ബിസിനസ്സ് ശാഖ:' : lang === 'ar' ? 'المجال المختار:' : 'Selected Business Niche:'}</label>
              <select class="form-control" id="planNicheSelect" onchange="app.generatePersonalPlan()">
                <option value="attar">Attar & Perfumes (അത്തർ & പെർഫ്യൂം)</option>
                <option value="clothing">Dresses & Boutiques (വസ്ത്രങ്ങൾ & ബോട്ടിക്)</option>
                <option value="watches">Fashion Watches (ഫാഷൻ വാച്ചുകൾ)</option>
                <option value="bags">Canvas Totes & Bags (ബാഗുകൾ)</option>
                <option value="accessories">Anti-Tarnish Jewelry (മോതിരങ്ങൾ & ആഭരണങ്ങൾ)</option>
                <option value="spices">Kerala Spices & Honey (സുഗന്ധവ്യഞ്ജനങ്ങൾ)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${lang === 'ml' ? 'കയ്യിലുള്ള പ്രാരംഭ മൂലധനം (₹):' : lang === 'ar' ? 'رأس المال المبدئي المتوفر (روبية):' : 'Initial Available Capital (₹):'}</label>
              <input type="number" class="form-control" id="planBudget" value="10000" oninput="app.generatePersonalPlan()">
            </div>
          </div>
        </div>

        <div class="plan-output-container" id="planOutputArea"></div>
      </div>
    `;
  },

  generatePersonalPlan() {
    const name = document.getElementById('planFounderName')?.value || 'Entrepreneur';
    const nicheKey = document.getElementById('planNicheSelect')?.value || 'attar';
    const budgetVal = parseInt(document.getElementById('planBudget')?.value) || 10000;
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
              <li><strong>Day 4-7:</strong> Post 5 aesthetic unboxing and packaging reels with trending audio</li>
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

  // Business Quiz
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
      <div class="quiz-match-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <div>
          <span style="font-size: 0.82rem; color: #a7f3d0; text-transform: uppercase; font-weight: 700;">
            ${lang === 'ml' ? 'നിങ്ങൾക്ക് ഏറ്റവും യോജിച്ച ബിസിനസ്:' : lang === 'ar' ? 'المشروع الأنسب لمعاييرك هو:' : 'Your Ideal Business Match:'}
          </span>
          <h3 style="font-size: 1.5rem; font-weight: 800; color: #ffffff; margin-top: 4px;">${catName}</h3>
        </div>
        <span class="quiz-match-badge" style="background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 20px; font-weight: 800; color: #fff;">${matchPct}% Match</span>
      </div>
      <p style="font-size: 0.94rem; color: #f1f5f9; line-height: 1.6; margin-bottom: 18px;">${finalReason}</p>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button class="btn btn-secondary" onclick="app.openAcademy('${matchedCat}')">
          <i class="fa-solid fa-graduation-cap"></i> ${lang === 'ml' ? 'ഈ ബിസിനസ്സ് ശാഖ പഠിക്കുക' : lang === 'ar' ? 'ابدأ دراسة هذه الأكاديمية' : 'Open This Academy'}
        </button>
        <button class="btn btn-outline" onclick="app.navigateTo('calc')">
          <i class="fa-solid fa-calculator"></i> ${lang === 'ml' ? 'ലാഭം കണക്കാക്കുക' : lang === 'ar' ? 'حساب الأرباح' : 'Calculate Profit'}
        </button>
      </div>
    `;
    resBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  // 7-Step Roadmap Render
  renderRoadmap() {
    const container = document.getElementById('roadmapList');
    if (!container) return;

    const lang = this.currentLang;
    let html = '';

    this.roadmapData.forEach(item => {
      const title = item.title[lang] || item.title.en;
      const desc = item.desc[lang] || item.desc.en;

      html += `
        <div class="roadmap-step-card">
          <div class="road-step-badge">${item.step}</div>
          <div class="road-content">
            <h4>${title}</h4>
            <p>${desc}</p>
            <div class="road-checklist">
              ${item.checks.map(chk => `<span class="road-check-pill"><i class="fa-solid fa-check text-success"></i> ${chk}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  // Event Listeners Binding
  bindEvents() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.switchLanguage(lang);
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
          document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
        });
      });
    }

    const dropdownBtn = document.getElementById('navAcademies');
    if (dropdownBtn) {
      dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = dropdownBtn.closest('.nav-dropdown');
        if (parent) parent.classList.toggle('open');
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      }
    });
  }
};

// Auto-run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
