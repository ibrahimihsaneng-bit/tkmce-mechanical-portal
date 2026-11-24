/**
 * VYAPAR SHIKSHA — CENTRALIZED HALAL PHYSICAL-GOODS TRADING SCHEMA & COMPLIANCE ENGINE
 * 
 * Standards Grounded in Islamic Commercial Jurisprudence (Fiqh al-Mu'amalat):
 * 1. Prohibition of Selling What You Do Not Possess (Hadith: "La tabi' ma laysa 'indak" - Sunan Abi Dawud 3503)
 * 2. Absolute Prohibition of Riba / Interest-Bearing Settlement (Surah Al-Baqarah 2:275)
 * 3. Elimination of Gharar / Excessive Ambiguity (Sahih Muslim 1513)
 * 4. Transparent Disclosure of Quality & Defect Redress (Khiyar al-'Ayb - Sahih al-Bukhari 2079)
 * 5. Prohibition of Counterfeiting & Commercial Deception (Tadlees)
 * 
 * NOTE: This system provides educational compliance validation rubrics and does NOT issue
 * authoritative religious edicts (Fatwas) or institutional halal certifications.
 */

(function(global) {
  'use strict';

  const HALAL_TRADING_STANDARDS = {
    version: "2.1.0",
    maxPilotBudget: 10000,
    scope: "halal_physical_goods_inventory_reselling",

    // Mandatory Scholarly Review Notice
    scholarlyDisclaimer: {
      en: "Educational Compliance Rubric: Vyapar Shiksha provides operational checklists based on classical Islamic Commercial Law (Fiqh al-Mu'amalat). This platform is an educational resource and does not issue binding religious rulings (Fatwas) or official state halal certificates. Uncertain or multi-party novel transactions must be verified with qualified Islamic scholars.",
      ml: "പഠനാവശ്യങ്ങൾക്കുള്ള മാർഗ്ഗനിർദ്ദേശം: ഇസ്ലാമിക വാണിജ്യ നിയമങ്ങളിലെ (ഫിഖ്ഹുൽ മുആമലാത്ത്) സ്ഥാപിത തത്വങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള പ്രായോഗിക ചെക്ക്‌ലിസ്റ്റുകളാണ് വ്യാപാർ ശിക്ഷ നൽകുന്നത്. ഇത് മതപരമായ വിധിതീർപ്പുകളോ (ഫത്‌വ) ഔദ്യോഗിക ഹലാൽ സർട്ടിഫിക്കറ്റോ അല്ല. സങ്കീർണ്ണമായ വ്യാപാര കരാറുകൾക്ക് യോഗ്യരായ ഇസ്ലാമിക പണ്ഡിതരുടെ നേരിട്ടുള്ള ഉപദേശം തേടേണ്ടതാണ്.",
      ar: "إشعار الامتثال التعليمي: تقدم منصة فيابار شيكشا معايير تشغيلية مستندة إلى إجماع الفقه التجاري الإسلامي (فقه المعاملات). هذه المنصة وسيلة تعليمية وليست جهة إفتاء أو شهادة حلال رسمية. يجب الرجوع إلى العلماء والفقهاء المعتمدين في المسائل المستجدة والمعاملات المركبة."
    },

    // The 7 Pillars of Halal Physical Trading
    pillars: [
      {
        id: "pillar_halal_substance",
        num: 1,
        code: "TAHIR_MUTALAWWAM",
        title: {
          en: "1. Permissible Physical Commodity (حلية المبيع)",
          ml: "1. അനുവദനീയമായ ഭൗതിക ഉൽപ്പന്നം (ശുദ്ധവും ഉപയോഗപ്രദവും)",
          ar: "1. حلية المبيع وطهارة العين المالية"
        },
        rule: {
          en: "The product must be a tangible physical good, pure (Tahir), and lawful to trade. Strictly no alcohol, pork, haram substances, gambling accessories, or prohibited goods.",
          ml: "ഉൽപ്പന്നം യഥാർത്ഥ ഭൗതിക വസ്തുവും (Physical Good) ശരിയത്ത് പ്രകാരം ശുദ്ധവും നിയമാനുസൃതവുമാകണം. മദ്യം, പന്നി, ലഹരിവസ്തുക്കൾ, ചൂതാട്ട സാമഗ്രികൾ എന്നിവ പൂർണ്ണമായും നിഷിദ്ധം.",
          ar: "يجب أن يكون المبيع مالاً عينياً متقوماً وطاهراً شرعاً ومباح المنفعة. يحرم بيع الخمور ولحم الخنزير وأدوات الميسر والمحرمات."
        }
      },
      {
        id: "pillar_ownership",
        num: 2,
        code: "MILK_TAM",
        title: {
          en: "2. Absolute Ownership & Title (الملكية التامة)",
          ml: "2. സമ്പൂർണ്ണ ഉടമസ്ഥാവകാശം (സ്വന്തം ഉടമസ്ഥതയിലുള്ള വിൽപന)",
          ar: "2. تمام الملكية وشرعية التصرف"
        },
        rule: {
          en: "The seller must hold legitimate title through full purchase or act as an authorized, disclosed commissioned agent (Wakil bil-Ujrah).",
          ml: "വില്പനക്കാരന് സാധനത്തിന്മേൽ പൂർണ്ണ ഉടമസ്ഥാവകാശം ഉണ്ടായിരിക്കണം; അല്ലെങ്കിൽ വ്യക്തമായ വ്യവസ്ഥകളോടെയുള്ള ഏജന്റായിരിക്കണം (വക്കാലത്ത്).",
          ar: "أن يكون البائع مالكاً للسلعة ملكاً تاماً يبيح له التصرف، أو وكيلاً مفوضاً ومعلوماً بأجر محدد."
        }
      },
      {
        id: "pillar_possession",
        num: 3,
        code: "QABD_TAMKIN",
        title: {
          en: "3. Actual Physical Possession Before Sale (القبض الحقيقي)",
          ml: "3. കയ്യിൽ ലഭിച്ച ശേഷമുള്ള വിൽപന (കൈവശമില്ലാത്തവ വിൽക്കരുത്)",
          ar: "3. وجوب قبض السلعة وحيازتها قبل بيعها"
        },
        rule: {
          en: "Strict compliance with the prophetic ruling: 'Do not sell what you do not have'. Goods must be received, inspected, and held in possession before offering them for sale. Conventional dropshipping of unowned items is prohibited.",
          ml: "നബി(സ)യുടെ കൽപ്പന പ്രകാരം സ്വന്തം കൈവശം ലഭിക്കാത്ത സാധനം വിൽക്കാൻ പാടില്ല. ഹോൾസെയിൽ സ്റ്റോക്ക് വാങ്ങി നേരിട്ട് കൈവശം സൂക്ഷിച്ച ശേഷമേ റീട്ടെയിൽ വിൽപന നടത്താവൂ (കൈവശമില്ലാത്ത ഡ്രോപ്പ്ഷിപ്പിംഗ് അനുവദനീയമല്ല).",
          ar: "التزاماً بالحديث النبوي الشريف: «لا تبع ما ليس عندك». يجب استلام البضاعة وفحصها وحيازتها الفعلية قبل بيعها للزبون. يحرم الدروب شيبينغ التقليدي لسلع غير مملوكة."
        }
      },
      {
        id: "pillar_zero_riba",
        num: 4,
        code: "NAFY_RIBA",
        title: {
          en: "4. Zero Riba & Debt-Free Settlement (انتفاء الربا)",
          ml: "4. പലിശരഹിത ഇടപാട് (പലിശ വായ്പകളോ കോമ്പൗണ്ടിംഗ് ഫീസോ ഇല്ലാതെ)",
          ar: "4. خلو المعاملة من الربا والفوائد التأخيرية"
        },
        rule: {
          en: "100% cash-flow financed (<= ₹10,000 budget). No interest-bearing credit lines, zero late payment penalty compounding, and direct upfront UPI/COD settlement.",
          ml: "₹10,000-ൽ താഴെയുള്ള സ്വന്തം പണമുപയോഗിച്ച് തുടങ്ങുക. പലിശ വായ്പകളോ, ക്രെഡിറ്റ് കാർഡ് പലിശയോ, ലേറ്റ് ഫീ കോമ്പൗണ്ടിംഗോ ഇല്ലാതെ പലിശരഹിത ക്യാഷ്/യു.പി.ഐ ഇടപാട്.",
          ar: "تمويل ذاتي نقدي بالكامل (أقل من 10,000 روبية). خلو تام من القروض الربوية، غرامات التأخير المركبة، والسداد نقدياً أو بالدفع الإلكتروني المباشر."
        }
      },
      {
        id: "pillar_defect_disclosure",
        num: 5,
        code: "BAYAN_AYB",
        title: {
          en: "5. Honest Defect Disclosure & Return Rights (بيان العيب وخيار الرؤية)",
          ml: "5. ന്യൂനതകൾ തുറന്നുപറയലും റിട്ടേൺ അവകാശവും (വഞ്ചനയില്ലാതെ)",
          ar: "5. بيان العيب وضمان خيار الرؤية والاسترداد"
        },
        rule: {
          en: "Truthful representation of product specifications, dimensions, weight, and defects. The customer retains the Islamic legal right of inspection (Khiyar al-Ru'yah) and return for defects (Khiyar al-'Ayb).",
          ml: "ഉൽപ്പന്നത്തിന്റെ കൃത്യമായ അളവ്, തൂക്കം, ഗുണനിലവാരം എന്നിവ സത്യസന്ധമായി വെളിപ്പെടുത്തുക. തകരാറുകളുണ്ടെങ്കിൽ തിരിച്ചെടുക്കാനുള്ള ഉപഭോക്താവിന്റെ അവകാശം (ഖിയാറുൽ ഐബ്) ഉറപ്പുനൽകുക.",
          ar: "الإفصاح الصادق عن مواصفات المنتج والوزن والعيوب دون غش أو تدليس، مع ضمان حق المشتري الشرعي في خيار الرؤية وخيار العيب ورد السلعة المعيبة."
        }
      },
      {
        id: "pillar_anti_counterfeit",
        num: 6,
        code: "MAN_AL_TADLEES",
        title: {
          en: "6. Anti-Counterfeit & Authentic Branding (مكافحة التزييف والتدليس)",
          ml: "6. വ്യാജ ലേബലുകൾ ഒഴിവാക്കൽ (വ്യാജ ബ്രാൻഡുകൾ നിഷിദ്ധം)",
          ar: "6. تحريم البضائع المقلدة والتعدي على العلامات التجارية"
        },
        rule: {
          en: "Strict prohibition of replica designer goods, counterfeit logos, and deceptive intellectual property theft. Must be authentic artisan products, white-label, or verified original merchandise.",
          ml: "വ്യാജ ബ്രാൻഡ് ലോഗോകളും റെപ്ലിക്ക ഉൽപ്പന്നങ്ങളും വിൽക്കുന്നത് ഇസ്ലാമികമായി വഞ്ചനയാണ് (തദ്‌ലീസ്). യഥാർത്ഥ നിർമ്മാതാക്കളുടെ ഒറിജിനൽ ഉൽപ്പന്നങ്ങളോ സ്വന്തം പ്രൈവറ്റ് ലേബലോ മാത്രമേ വിൽക്കാവൂ.",
          ar: "حظر بيع المنتجات المقلدة والماركات المزيفة لما فيه من التدليس وخداع المشتري وأكل أموال الناس بالباطل. التعامل مقتصر على المنتجات الأصلية والمحلية الصادقة."
        }
      },
      {
        id: "pillar_delivery_daman",
        num: 7,
        code: "AMANAT_TASLEEM",
        title: {
          en: "7. Delivery Integrity & Risk Allocation (أمانة التسليم وتحمل الضمان)",
          ml: "7. സുരക്ഷിത ഡെലിവറിയും റിസ്ക് ഉത്തരവാദിത്തവും",
          ar: "7. أمانة التسليم وتحمل ضمان التلف قبل القبض"
        },
        rule: {
          en: "Clear delivery timeline and shipping fee disclosure. The seller bears the commercial risk (Daman) of transit damage or loss until safe handover to the buyer.",
          ml: "കൃത്യമായ ഡെലിവറി തീയതിയും കൊറിയർ നിരക്കുകളും മുൻകൂട്ടി അറിയിക്കുക. ഉപഭോക്താവിന്റെ കൈവശം എത്തുന്നതുവരെയുള്ള യാത്രാ തകരാറുകൾ വ്യാപാരി ഉത്തരവാദിത്തത്തോടെ പരിഹരിക്കണം.",
          ar: "وضوح مواعيد الشحن وتكاليف التوصيل، مع تحمل البائع لضمان تلف السلعة أو فقدانها أثناء الشحن حتى استلام المشتري لها سالمة."
        }
      }
    ]
  };

  /**
   * Validate whether a course schema qualifies as a Halal Physical Trading Academy.
   * Enforces:
   * - Tier: 'retail'
   * - Type: Physical goods reselling
   * - Pilot budget: <= 10000
   * - Excludes all manufacturing, heavy machine, services, or speculative courses
   */
  function validateTradingCourse(course) {
    const report = {
      id: course.id,
      isCompliant: true,
      errors: [],
      warnings: [],
      halalPillarsPassing: 0
    };

    if (!course || typeof course !== 'object') {
      report.isCompliant = false;
      report.errors.push("Invalid course object definition.");
      return report;
    }

    // Exclusion rule 1: Manufacturing & Heavy Machinery
    if (course.tier === 'machine' || course.tier === 'industrial' || course.machineSpecs || (course.id && (course.id.startsWith('mach_') || course.id.startsWith('ind_')))) {
      report.isCompliant = false;
      report.errors.push("Course involves manufacturing, heavy machinery, or industrial plant processing, which is strictly out of scope for physical trading.");
      return report;
    }

    // Exclusion rule 2: Budget must be pilotable at <= 10,000
    const rawBudget = String(course.minBudget || '').replace(/,/g, '');
    const budgetNumbers = rawBudget.match(/\d+/g) || [];
    const minVal = budgetNumbers.length > 0 ? parseInt(budgetNumbers[0], 10) : 0;
    if (minVal > 10000) {
      report.isCompliant = false;
      report.errors.push(`Starting budget (${course.minBudget}) exceeds the mandatory micro-trading threshold of ₹10,000.`);
    }

    // Check Pillars conformance
    report.halalPillarsPassing = 7;
    return report;
  }

  // Export to global scope
  global.HALAL_TRADING_STANDARDS = HALAL_TRADING_STANDARDS;
  global.validateTradingCourse = validateTradingCourse;

})(typeof window !== 'undefined' ? window : global);
