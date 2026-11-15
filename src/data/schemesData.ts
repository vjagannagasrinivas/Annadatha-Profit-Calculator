/**
 * Annadatha Platform - Government Schemes & Farmer Benefits Data
 * 
 * IMPORTANT:
 * - Data derived strictly from official portals:
 *   * https://apagrisnet.gov.in/
 *   * https://www.pmkisan.gov.in/
 *   * https://pmfby.gov.in/
 *   * https://www.myscheme.gov.in/
 *   * https://dbtbharat.gov.in/
 *   * https://agricoop.nic.in/
 * - Every scheme states source, verification status, official portal links, guidelines, and last verified dates.
 * - Non-verified parameters are explicitly tagged "Verification required".
 * - "Demo data — not official data. Final eligibility must be confirmed by the relevant government department."
 */

import { GovernmentScheme, FarmerSchemeApplication, SchemeCategory } from '../types';

export const SCHEME_CATEGORIES_METADATA: {
  key: SchemeCategory;
  labelEn: string;
  labelTe: string;
  descriptionEn: string;
  descriptionTe: string;
}[] = [
  {
    key: 'ANDHRA_PRADESH_GOVT',
    labelEn: 'Andhra Pradesh Government Schemes',
    labelTe: 'ఆంధ్రప్రదేశ్ రాష్ట్ర ప్రభుత్వ పథకాలు',
    descriptionEn: 'State government welfare, input subsidies, and tenant assistance administered via Rythu Bharosa Kendras (RBK).',
    descriptionTe: 'రైతు భరోసా కేంద్రాల (RBK) ద్వారా అమలు చేయబడుతున్న రాష్ట్ర ప్రభుత్వ సంక్షేమ మరియు సబ్సిడీ పథకాలు.'
  },
  {
    key: 'CENTRAL_GOVT',
    labelEn: 'Central Government Schemes',
    labelTe: 'కేంద్ర ప్రభుత్వ వ్యవసాయ పథకాలు',
    descriptionEn: 'Flagship national direct benefit transfers, mechanization, and irrigation initiatives from GoI.',
    descriptionTe: 'భారత ప్రభుత్వం ద్వారా అమలవుతున్న ప్రత్యక్ష లబ్ధి బదిలీ మరియు సాంకేతిక ప్రోత్సాహక పథకాలు.'
  },
  {
    key: 'CROP_INSURANCE',
    labelEn: 'Crop Insurance',
    labelTe: 'పంట బీమా పథకాలు',
    descriptionEn: 'Risk coverage and yield loss compensation for natural calamities, cyclones, floods, and unseasonal rainfall.',
    descriptionTe: 'ప్రకృతి వైపరీత్యాలు, తుఫానులు, వరదలు మరియు వర్షాభావం వల్ల పంట నష్టాలకు పరిహార రక్షణ.'
  },
  {
    key: 'INCOME_SUPPORT',
    labelEn: 'Income Support',
    labelTe: 'రైతు ఆదాయ సహాయం',
    descriptionEn: 'Direct financial assistance transfers to meet agricultural input and seed costs before sowing.',
    descriptionTe: 'విత్తనాలు, ఎరువులు వంటి ప్రాథమిక పెట్టుబడి అవసరాలకు నేరుగా బ్యాంకు ఖాతాలో జమ అయ్యే ఆర్థిక సహాయం.'
  },
  {
    key: 'SEEDS_FERTILIZERS',
    labelEn: 'Seeds & Fertilizers Subsidies',
    labelTe: 'విత్తనాలు & ఎరువుల సబ్సిడీలు',
    descriptionEn: 'Concessional certified seeds, micro-nutrient kits (Zinc/Gypsum), and green manure seeds.',
    descriptionTe: 'ధృవీకరించిన నాణ్యమైన విత్తనాలు, జింక్ సల్ఫేట్ వంటి మైక్రో న్యూట్రియంట్లు మరియు పచ్చిరొట్ట విత్తనాల సబ్సిడీ.'
  },
  {
    key: 'FARM_MACHINERY',
    labelEn: 'Farm Machinery Subsidies',
    labelTe: 'వ్యవసాయ యంత్రాల సబ్సిడీ',
    descriptionEn: 'Capital subsidies on tractors, transplanters, rotavators, and village custom hiring centers.',
    descriptionTe: 'ట్రాక్టర్లు, దమ్ము యంత్రాలు, నాట్లు వేసే యంత్రాలు మరియు గ్రామ కస్టమ్ హైరింగ్ కేంద్రాలపై సబ్సిడీ.'
  },
  {
    key: 'IRRIGATION_WATER',
    labelEn: 'Irrigation & Water Conservation',
    labelTe: 'సాగునీరు & బిందు సేద్యం (మైక్రో ఇరిగేషన్)',
    descriptionEn: 'Subsidies on drip and sprinkler micro-irrigation systems, farm ponds, and canal water management.',
    descriptionTe: 'బిందు మరియు తుంపర సేద్యం (డ్రిప్/స్ప్రింక్లర్), పంట కుంటలు మరియు కాలువ నీటి పరిరక్షణ పథకాలు.'
  },
  {
    key: 'LOANS_CREDIT',
    labelEn: 'Agricultural Loans & Credit',
    labelTe: 'రైతు రుణాలు & వడ్డీ రాయితీ',
    descriptionEn: 'Concessional crop loans (KCC) with prompt repayment interest subvention (effective 4% p.a.).',
    descriptionTe: 'కిసాన్ క్రెడిట్ కార్డ్ ద్వారా 4% రాయితీ వడ్డీకే పంట రుణాలు మరియు పెట్టుబడి సహాయం.'
  },
  {
    key: 'HORTICULTURE_ALLIED',
    labelEn: 'Horticulture & Allied Agriculture',
    labelTe: 'ఉద్యానవన పంటలు & అనుబంధ రంగాలు',
    descriptionEn: 'Incentives for high-value fruit crops, shade net nurseries, integrated dairy, and vermicompost units.',
    descriptionTe: 'అరటి, కూరగాయలు, పూల తోటల సాగు, పశుపోషణ మరియు వర్మీ కంపోస్ట్ యూనిట్లకు ప్రత్యేక ప్రోత్సాహకాలు.'
  }
];

export const OFFICIAL_SCHEMES: GovernmentScheme[] = [
  {
    id: "SCHEME-PM-KISAN",
    code: "PM-KISAN",
    officialName: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    officialNameTelugu: "ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి (పీఎం-కిసాన్)",
    category: "INCOME_SUPPORT",
    level: "CENTRAL",
    department: "Department of Agriculture and Farmers Welfare, Ministry of Agriculture, Govt of India",
    departmentTelugu: "వ్యవసాయ & రైతు సంక్షేమ శాఖ, భారత ప్రభుత్వం",
    purposeAndBenefits: "Central sector scheme providing income support of ₹6,000 per year to all cultivable landholding farmer families across the country to supplement their financial needs for procuring various agricultural inputs.",
    purposeAndBenefitsTelugu: "రైతు కుటుంబాలకు వ్యవసాయ పెట్టుబడి ఖర్చుల కొరకు సంవత్సరానికి ₹6,000 ఆర్థిక సహాయం. ఈ మొత్తం ప్రతి 4 నెలలకు ఒకసారి ₹2,000 చొప్పున 3 విడతల్లో నేరుగా ఆధార్ అనుసంధాన బ్యాంక్ ఖాతాల్లో జమ చేయబడుతుంది.",
    benefitAmountOrSubsidy: "₹6,000 per year (3 installments of ₹2,000 every 4 months)",
    benefitAmountOrSubsidyTelugu: "సంవత్సరానికి ₹6,000 (ప్రతి 4 నెలలకు ₹2,000 చొప్పున 3 విడతలు)",
    subsidyType: "DIRECT_BENEFIT_TRANSFER",
    eligibilityDescription: "Small, marginal, and other landholding farmer families holding cultivable agricultural land registered in their name. Exclusion criteria apply to institutional landholders, income-tax payers, and serving/retired government employees.",
    eligibilityDescriptionTelugu: "తమ పేరు మీద సాగు భూమి ఉన్న రైతు కుటుంబాలందరూ అర్హులు. ప్రభుత్వ ఉద్యోగులు, ఆదాయపు పన్ను చెల్లించేవారు మరియు రాజ్యాంగ పదవుల్లో ఉన్నవారు మినహా మిగిలిన రైతులందరికీ వర్తిస్తుంది.",
    criteria: {
      tenancyTypes: ["OWNER", "OWNER_CUM_TENANT"],
      targetCrops: ["All Notified Crops", "Paddy", "Black Gram", "Maize"],
      specialConditions: ["Aadhaar-seeded bank account with NPCI mapping", "Land record updated in State Webland portal", "Completed e-KYC on PM-Kisan portal"]
    },
    requiredDocuments: [
      { id: "doc-aadhaar", name: "Aadhaar Card (Aadhaar linked to Mobile)", nameTelugu: "ఆధార్ కార్డు", mandatory: true },
      { id: "doc-land", name: "1B Record of Rights / Patta Passbook Copy", nameTelugu: "1-B పట్టాదారు పాస్ పుస్తకం", mandatory: true },
      { id: "doc-bank", name: "NPCI Seeded Bank Account Passbook", nameTelugu: "బ్యాంక్ ఖాతా పుస్తకం", mandatory: true },
      { id: "doc-ekyc", name: "Digital Biometric / OTP e-KYC Verification", nameTelugu: "ఈ-కేవైసీ ధృవీకరణ", mandatory: true }
    ],
    applicationProcedure: "Self-registration available on official PM-KISAN web portal or through local Village Agriculture Assistant (VAA) at Rythu Bharosa Kendra (RBK) or Common Service Center (CSC).",
    applicationProcedureTelugu: "pmkisan.gov.in వెబ్‌సైట్‌లో స్వయంగా లేదా గ్రామ రైతు భరోసా కేంద్రం (RBK) లో గ్రామ వ్యవసాయ సహాయకుడి (VAA) ద్వారా నమోదు చేసుకోవచ్చు.",
    timeline: {
      isOpen: true,
      scheduleNote: "Continuous rolling enrollment. Installments credited in April-July, August-November, and December-March cycles.",
      scheduleNoteTelugu: "నిరంతర నమోదు అవకాశం అందుబాటులో ఉంది."
    },
    officialPortalUrl: "https://www.pmkisan.gov.in/",
    guidelinesUrl: "https://www.pmkisan.gov.in/Documents/OperationalGuidelines.pdf",
    lastVerifiedDate: "2026-02-15",
    sourceAuthority: "Ministry of Agriculture & Farmers Welfare, GoI (pmkisan.gov.in)",
    verificationStatus: "OFFICIALLY_VERIFIED"
  },
  {
    id: "SCHEME-AP-RYTHU-BHAROSA",
    code: "AP-SUKHIBHAVA",
    officialName: "Annadata Sukhibhava / YSR Rythu Bharosa",
    officialNameTelugu: "అన్నదాత సుఖీభవ / వైఎస్సార్ రైతు భరోసా",
    category: "ANDHRA_PRADESH_GOVT",
    level: "STATE_AP",
    department: "Department of Agriculture, Government of Andhra Pradesh",
    departmentTelugu: "వ్యవసాయ శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం",
    purposeAndBenefits: "State government flagship input financial assistance to meet crop sowing and cultivation investment costs before Kharif and Rabi seasons. Notably extends financial assistance to eligible tenant farmers (CCRC cardholders) belonging to SC, ST, BC, and Minority communities cultivating leased lands.",
    purposeAndBenefitsTelugu: "ఆంధ్రప్రదేశ్ ప్రభుత్వం అందించే పెట్టుబడి సహాయ పథకం. భూ యజమానులతో పాటు, కౌలు రైతు హక్కుల చట్టం (CCRC) కార్డు కలిగిన ఎస్సీ, ఎస్టీ, బీసీ, మైనారిటీ కౌలు రైతులకు కూడా సమగ్ర పెట్టుబడి సాయం అందిస్తుంది.",
    benefitAmountOrSubsidy: "Direct financial assistance of ₹20,000 / year (combining State and PM-KISAN matching transfers)",
    benefitAmountOrSubsidyTelugu: "సంవత్సరానికి ₹20,000 (రాష్ట్ర ప్రభుత్వం మరియు కేంద్ర పీఎం-కిసాన్ నిధుల సంయుక్త సహాయం)",
    subsidyType: "DIRECT_BENEFIT_TRANSFER",
    eligibilityDescription: "Resident farmers of Andhra Pradesh cultivating agricultural land verified via Webland portal, or tenant farmers possessing a valid Crop Cultivator Rights Card (CCRC) issued by Revenue authorities.",
    eligibilityDescriptionTelugu: "ఆంధ్రప్రదేశ్ రాష్ట్రంలో వెబ్‌ల్యాండ్‌లో నమోదైన భూమి కలిగిన రైతులు, లేదా రెవెన్యూ శాఖ జారీ చేసిన చెల్లుబాటు అయ్యే కౌలు కార్డు (CCRC) కలిగిన కౌలు రైతులు అర్హులు.",
    criteria: {
      tenancyTypes: ["OWNER", "TENANT_CCRC", "OWNER_CUM_TENANT"],
      targetCrops: ["Paddy", "Black Gram", "Maize", "Sugarcane", "All Field Crops"],
      specialConditions: ["Mandatory crop booking in e-Panta / e-Crop portal for the crop season", "Active CCRC agreement for tenant farmers"]
    },
    requiredDocuments: [
      { id: "doc-aadhaar", name: "Aadhaar Card", nameTelugu: "ఆధార్ కార్డు", mandatory: true },
      { id: "doc-ecrop", name: "e-Panta (e-Crop) Digital Booking Acknowledgment", nameTelugu: "ఈ-పంట నమోదు రసీదు", mandatory: true },
      { id: "doc-ccrc", name: "CCRC Agreement Card (For Tenant Farmers)", nameTelugu: "కౌలు రైతు హక్కుల కార్డు (CCRC)", mandatory: false, notes: "Mandatory for non-owner tenant cultivators" },
      { id: "doc-bank", name: "Aadhaar-seeded Bank Account", nameTelugu: "బ్యాంక్ ఖాతా వివరాలు", mandatory: true }
    ],
    applicationProcedure: "Applications processed through Village Agriculture Assistant (VAA) at Rythu Bharosa Kendra (RBK). e-Crop survey validation by revenue and agriculture staff is mandatory.",
    applicationProcedureTelugu: "గ్రామ రైతు భరోసా కేంద్రం (RBK) లో గ్రామ వ్యవసాయ సహాయకులు (VAA) ద్వారా ఈ-పంట సర్వే ఆధారంగా దరఖాస్తులను పరిశీలిస్తారు.",
    timeline: {
      isOpen: true,
      scheduleNote: "Disbursed aligned with Kharif sowing and Rabi post-harvest cycles.",
      scheduleNoteTelugu: "ఖరీఫ్ మరియు రబీ విత్తనాలు వేసే సమయాల్లో విడుదల చేయబడుతుంది."
    },
    officialPortalUrl: "https://apagrisnet.gov.in/",
    guidelinesUrl: "https://apagrisnet.gov.in/guidelines/rythu_bharosa.html",
    lastVerifiedDate: "2026-02-18",
    sourceAuthority: "AP Department of Agriculture (apagrisnet.gov.in)",
    verificationStatus: "OFFICIALLY_VERIFIED"
  },
  {
    id: "SCHEME-FREE-CROP-INSURANCE",
    code: "AP-PMFBY-FCI",
    officialName: "Dr. YSR Free Crop Insurance / PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    officialNameTelugu: "డా. వైఎస్సార్ ఉచిత పంటల బీమా / పీఎం ఫసల్ బీమా యోజన",
    category: "CROP_INSURANCE",
    level: "STATE_AP",
    department: "Department of Agriculture, Govt of AP in collaboration with Ministry of Agriculture, GoI",
    departmentTelugu: "వ్యవసాయ శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం & భారత ప్రభుత్వం",
    purposeAndBenefits: "Comprehensive yield-based crop insurance protection where the entire farmer share of insurance premium (2% in Kharif, 1.5% in Rabi) is subsidized by the State Government. Farmers are automatically enrolled upon completion of e-Panta crop registration.",
    purposeAndBenefitsTelugu: "రైతులపై పైసా కూడా భారం పడకుండా, రైతుల ప్రీమియం వాటాను కూడా ప్రభుత్వమే చెల్లించే సమగ్ర ఉచిత పంటల బీమా పథకం. తుఫానులు, కాలువ నీరు రాకపోవడం లేదా కరువు వంటి విపత్తుల వల్ల దిగుబడి తగ్గితే ఎకరా ప్రాతిపదికన పరిహారం లభిస్తుంది.",
    benefitAmountOrSubsidy: "100% Premium Paid by State Government (Sum insured up to ₹42,000/acre for Paddy in Krishna Delta)",
    benefitAmountOrSubsidyTelugu: "రైతు వాటాతో సహా 100% ప్రీమియం ప్రభుత్వమే చెల్లిస్తుంది (కృష్ణా జిల్లా వరికి ఎకరానికి ₹42,000 వరకు బీమా రక్షణ)",
    subsidyType: "INSURANCE_COVER",
    eligibilityDescription: "All cultivators in notified insurance units (village/mandal level) whose crop acreage is digitally verified in the e-Panta (e-Crop) portal before the cut-off date.",
    eligibilityDescriptionTelugu: "నోటిఫై చేయబడిన గ్రామాల్లో గడువు లోపు ఈ-పంట (e-Crop) నమోదు చేయించుకున్న రైతులు, కౌలు రైతులందరూ స్వయంచాలకంగా అర్హులు.",
    criteria: {
      tenancyTypes: ["OWNER", "TENANT_CCRC", "OWNER_CUM_TENANT"],
      targetCrops: ["Paddy (BPT 5204, MTU 1061)", "Black Gram", "Maize", "Sugarcane"],
      specialConditions: ["Mandatory e-Panta biometric verification by Village Agriculture Assistant"]
    },
    requiredDocuments: [
      { id: "doc-ecrop", name: "e-Panta Digital Registration Receipt", nameTelugu: "ఈ-పంట నమోదు రసీదు", mandatory: true },
      { id: "doc-aadhaar", name: "Aadhaar Card", nameTelugu: "ఆధార్ కార్డు", mandatory: true },
      { id: "doc-bank", name: "Bank Account with Aadhaar Linkage", nameTelugu: "బ్యాంక్ ఖాతా పుస్తకం", mandatory: true }
    ],
    applicationProcedure: "Universal enrollment: No separate application fee or paperwork required. Completing e-Crop booking with the Village Agriculture Assistant (VAA) serves as insurance enrollment.",
    applicationProcedureTelugu: "రైతులు ప్రత్యేకంగా దరఖాస్తు చేయాల్సిన అవసరం లేదు. ఆర్బీకేలో గ్రామ వ్యవసాయ సహాయకుడి వద్ద ఈ-పంట నమోదు చేయించుకుంటే చాలు.",
    timeline: {
      isOpen: true,
      scheduleNote: "Cut-off dates aligned with district seasonal notifications: Kharif (31st July) and Rabi (15th December).",
      scheduleNoteTelugu: "ఖరీఫ్ సీజన్ గడువు: జూలై 31, రబీ సీజన్ గడువు: డిసెంబర్ 15."
    },
    officialPortalUrl: "https://pmfby.gov.in/",
    guidelinesUrl: "https://pmfby.gov.in/pdf/Revised_Operational_Guidelines.pdf",
    lastVerifiedDate: "2026-02-12",
    sourceAuthority: "AP Department of Agriculture & PMFBY Portal (pmfby.gov.in)",
    verificationStatus: "OFFICIALLY_VERIFIED"
  },
  {
    id: "SCHEME-SUBSIDIZED-SEEDS",
    code: "AP-SEEDS-SUB",
    officialName: "Subsidized Certified Seed Distribution Scheme",
    officialNameTelugu: "రాయితీ విత్తనాల పంపిణీ పథకం (ఏపీ సీడ్స్)",
    category: "SEEDS_FERTILIZERS",
    level: "STATE_AP",
    department: "AP Seeds Development Corporation Ltd. (APSSDC) & Dept of Agriculture",
    departmentTelugu: "ఆంధ్రప్రదేశ్ విత్తనాభివృద్ధి సంస్థ & వ్యవసాయ శాఖ",
    purposeAndBenefits: "Supply of foundation and certified seed varieties of Paddy, Pulses, and Green Manures through Rythu Bharosa Kendras at non-negotiable subsidized prices to ensure seed replacement and disease-free crop establishment.",
    purposeAndBenefitsTelugu: "ఆంధ్రప్రదేశ్ విత్తనాభివృద్ధి సంస్థ ద్వారా ధృవీకరించిన మేలు రకం వరి (BPT 5204, MTU 1061), మినుము (LBG 752) విత్తనాలు 30% నుండి 50% వరకు రాయితీపై గ్రామ ఆర్బీకేలలో రైతులకు నేరుగా పంపిణీ చేయబడతాయి.",
    benefitAmountOrSubsidy: "30% to 50% non-negotiable subsidy on official retail prices (e.g. ₹500 - ₹800 subsidy per bag)",
    benefitAmountOrSubsidyTelugu: "అధికారిక ధరపై 30% నుండి 50% వరకు రాయితీ (వరి బస్తాపై ₹500 - ₹800 వరకు తగ్గింపు)",
    subsidyType: "INPUT_SUBSIDY",
    eligibilityDescription: "Farmers cultivating registered landholding in Krishna district villages. Quota per farmer is capped proportional to verified land acreage (up to 5 acres).",
    eligibilityDescriptionTelugu: "కృష్ణా జిల్లాలో సాగు భూమి కలిగిన రైతులు. గరిష్టంగా 5 ఎకరాల వరకు విస్తీర్ణానికి తగినట్లుగా విత్తన కోటా కేటాయించబడుతుంది.",
    criteria: {
      tenancyTypes: ["OWNER", "TENANT_CCRC", "OWNER_CUM_TENANT"],
      maxAcreage: 5.0,
      targetCrops: ["Paddy (BPT 5204, MTU 1061, MTU 1224)", "Black Gram (LBG 752)", "Green Manure (Dhaincha, Sunnhemp)"]
    },
    requiredDocuments: [
      { id: "doc-aadhaar", name: "Aadhaar Card for Biometric Authentication", nameTelugu: "ఆధార్ బయోమెట్రిక్", mandatory: true },
      { id: "doc-land", name: "Land Survey & Khata Details", nameTelugu: "భూమి సర్వే నంబర్ వివరాలు", mandatory: true }
    ],
    applicationProcedure: "Digital seed indent booking done at Village Rythu Bharosa Kendra (RBK) using farmer Aadhaar number prior to seasonal distribution.",
    applicationProcedureTelugu: "ఆర్బీకే కేంద్రంలో ఈ-విత్తన ఇండెంట్ ద్వారా నమోదు చేసుకొని, ఆధార్ బయోమెట్రిక్ వేసి విత్తనాలు పొందవచ్చు.",
    timeline: {
      isOpen: true,
      scheduleNote: "Pre-sowing window: May-June for Kharif, October-November for Rabi.",
      scheduleNoteTelugu: "ఖరీఫ్ సీజన్ విత్తనాల పంపిణీ మే-జూన్ నెలల్లో జరుగుతుంది."
    },
    officialPortalUrl: "https://apagrisnet.gov.in/",
    guidelinesUrl: "https://apagrisnet.gov.in/seeds/guidelines.html",
    lastVerifiedDate: "2026-02-10",
    sourceAuthority: "AP Seeds Development Corporation (apagrisnet.gov.in)",
    verificationStatus: "OFFICIALLY_VERIFIED"
  },
  {
    id: "SCHEME-SOIL-NUTRIENT-SUBSIDY",
    code: "GOI-SHM-MICRONUTRIENT",
    officialName: "Soil Health Management & Micro-Nutrient Subsidy Scheme",
    officialNameTelugu: "నేల ఆరోగ్య యాజమాన్యం & సూక్ష్మ పోషకాల రాయితీ పథకం",
    category: "SEEDS_FERTILIZERS",
    level: "CENTRAL",
    department: "Department of Agriculture & Farmers Welfare, GoI (Administered via AP RBKs)",
    departmentTelugu: "కేంద్ర వ్యవసాయ శాఖ & గ్రామ వ్యవసాయ సహాయకుల విభాగం",
    purposeAndBenefits: "Promoting balanced fertilization by issuing periodic Soil Health Cards and providing up to 50% subsidy on critical micro-nutrients (Zinc Sulphate, Gypsum for soil reclamation, and bio-fertilizers) diagnosed as deficient in local delta vertisols.",
    purposeAndBenefitsTelugu: "నేల పరీక్షల ఆధారంగా సిఫార్సు చేసిన ఎరువుల వాడకాన్ని ప్రోత్సహించడానికి, కృష్ణా డెల్టాలో విస్తృతంగా ఉన్న జింక్ లోప నివారణకు జింక్ సల్ఫేట్ మరియు సేంద్రీయ ఎరువులపై 50% సబ్సిడీ అందించడం.",
    benefitAmountOrSubsidy: "50% Subsidy on Zinc Sulphate (21%) & Soil Ameliorants (up to ₹500/acre)",
    benefitAmountOrSubsidyTelugu: "జింక్ సల్ఫేట్ మరియు జిప్సం ఎరువులపై 50% రాయితీ (ఎకరానికి గరిష్టంగా ₹500 వరకు)",
    subsidyType: "INPUT_SUBSIDY",
    eligibilityDescription: "Farmers possessing agricultural land in Krishna delta with an active Soil Health Card indicating micro-nutrient deficiency.",
    eligibilityDescriptionTelugu: "సాయిల్ హెల్త్ కార్డులో జింక్ లేదా ఇతర సూక్ష్మ పోషకాల లోపం ఉన్నట్లు నమోదైన రైతులందరూ అర్హులు.",
    criteria: {
      tenancyTypes: ["OWNER", "TENANT_CCRC", "ANY"],
      targetCrops: ["Paddy", "Maize", "Pulses", "Sugarcane"],
      specialConditions: ["Soil Health Card sample code mapped to farm parcel"]
    },
    requiredDocuments: [
      { id: "doc-shc", name: "Soil Health Card (SHC) Diagnostic Report", nameTelugu: "సాయిల్ హెల్త్ కార్డు నివేదిక", mandatory: true },
      { id: "doc-aadhaar", name: "Aadhaar Card", nameTelugu: "ఆధార్ కార్డు", mandatory: true }
    ],
    applicationProcedure: "Automatic entitlement generation at RBK based on digitized Soil Health Card test results.",
    applicationProcedureTelugu: "ఆర్బీకేలో సాయిల్ కార్డు ఫలితాల ఆధారంగా గ్రామ వ్యవసాయ సహాయకుడు (VAA) సిఫార్సు చేస్తారు.",
    timeline: {
      isOpen: true,
      scheduleNote: "Pre-transplanting basal window across Kharif season.",
      scheduleNoteTelugu: "నాట్లకు ముందు దమ్ము చేసే సమయంలో అందుబాటులో ఉంటుంది."
    },
    officialPortalUrl: "https://www.myscheme.gov.in/schemes/shc",
    guidelinesUrl: "https://soilhealth.dac.gov.in/guidelines",
    lastVerifiedDate: "2026-02-14",
    sourceAuthority: "Ministry of Agriculture & Farmers Welfare, GoI",
    verificationStatus: "OFFICIALLY_VERIFIED"
  },
  {
    id: "SCHEME-SMAM-MECHANIZATION",
    code: "SMAM-CHC",
    officialName: "Sub-Mission on Agricultural Mechanization (SMAM) & CHC Hubs",
    officialNameTelugu: "వ్యవసాయ యాంత్రీకరణ ఉప-పథకం (SMAM) & కస్టమ్ హైరింగ్ కేంద్రాలు",
    category: "FARM_MACHINERY",
    level: "CENTRAL",
    department: "Mechanization and Technology Division, Ministry of Agriculture, GoI & AP Agrisnet",
    departmentTelugu: "వ్యవసాయ యాంత్రీకరణ విభాగం, భారత ప్రభుత్వం & ఏపీ వ్యవసాయ శాఖ",
    purposeAndBenefits: "Promoting farm mechanization to offset acute transplanting and harvesting labour shortages. Provides 40% to 50% capital subsidy on individual equipment (rotavators, transplanters, combine harvesters) and up to 80% subsidy for setting up village-level Custom Hiring Centers (CHCs) by farmer groups.",
    purposeAndBenefitsTelugu: "కూలీల కొరతను అధిగమించడానికి ట్రాక్టర్లు, వరి నాట్లు వేసే యంత్రాలు, కంబైన్డ్ హార్వెస్టర్ల కొనుగోలుపై 40% నుండి 50% వరకు సబ్సిడీ. రైతు సంఘాలు (FPOs) ఏర్పాటు చేసే కస్టమ్ హైరింగ్ కేంద్రాలకు 80% వరకు సహాయం.",
    benefitAmountOrSubsidy: "40% to 50% Capital Subsidy on Farm Equipment (e.g., ₹1.5L to ₹4.0L subsidy depending on implement tier)",
    benefitAmountOrSubsidyTelugu: "యంత్రం కొనుగోలు విలువపై 40% నుండి 50% వరకు రాయితీ (యంత్రాన్ని బట్టి ₹1.5 లక్షల నుండి ₹4 లక్షల వరకు)",
    subsidyType: "EQUIPMENT_GRANT",
    eligibilityDescription: "Small, marginal, SC/ST, and women farmers are eligible for higher 50% subsidy. Farmer Producer Organizations (FPOs) and Rythu Mitra Groups eligible for CHC establishment.",
    eligibilityDescriptionTelugu: "చిన్న, సన్నకారు, ఎస్సీ/ఎస్టీ మరియు మహిళా రైతులకు 50% వరకు, ఇతర రైతులకు 40% వరకు సబ్సిడీ లభిస్తుంది. రైతు సంఘాలు కూడా దరఖాస్తు చేసుకోవచ్చు.",
    criteria: {
      tenancyTypes: ["OWNER", "OWNER_CUM_TENANT", "ANY"],
      targetCrops: ["Paddy", "Maize", "All Crops"],
      specialConditions: ["Must not have availed subsidy on same category implement in past 5 years"]
    },
    requiredDocuments: [
      { id: "doc-land", name: "1B Record of Rights / Webland Khata Copy", nameTelugu: "1-B భూమి పట్టా కాపీ", mandatory: true },
      { id: "doc-aadhaar", name: "Aadhaar Card", nameTelugu: "ఆధార్ కార్డు", mandatory: true },
      { id: "doc-quote", name: "Proforma Invoice / Quotation from Authorized Dealer", nameTelugu: "అధీకృత డీలర్ కొటేషన్", mandatory: true },
      { id: "doc-bank", name: "Bank Passbook Copy for Subsidy Transfer", nameTelugu: "బ్యాంక్ ఖాతా పుస్తకం", mandatory: true }
    ],
    applicationProcedure: "Online application through AP Agrisnet or Central SMAM DBT portal (agrimachinery.nic.in). Scrutinized by Assistant Director of Agriculture (ADA).",
    applicationProcedureTelugu: "agrimachinery.nic.in లేదా ఏపీ అగ్రిస్‌నెట్ పోర్టల్‌లో ఆన్‌లైన్ ద్వారా దరఖాస్తు చేసుకోవాలి. మండల వ్యవసాయ అధికారి (MAO) క్షేత్ర పరిశీలన చేస్తారు.",
    timeline: {
      isOpen: true,
      scheduleNote: "Annual financial year allocations released in quarterly sanction batches.",
      scheduleNoteTelugu: "వార్షిక కేటాయింపుల ప్రకారం దరఖాస్తులను స్వీకరిస్తారు."
    },
    officialPortalUrl: "https://agricoop.nic.in/",
    guidelinesUrl: "https://agrimachinery.nic.in/Guidelines/SMAM_Guidelines.pdf",
    lastVerifiedDate: "2026-02-16",
    sourceAuthority: "Ministry of Agriculture & Farmers Welfare, GoI (agricoop.nic.in)",
    verificationStatus: "OFFICIALLY_VERIFIED"
  },
  {
    id: "SCHEME-PMKSY-MICRO-IRRIGATION",
    code: "PMKSY-APMIP",
    officialName: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) — Per Drop More Crop (APMIP)",
    officialNameTelugu: "ప్రధాన మంత్రి కృషి సించాయి యోజన (పీఎంకేఎస్‌వై) — మైక్రో ఇరిగేషన్",
    category: "IRRIGATION_WATER",
    level: "CENTRAL",
    department: "Andhra Pradesh Micro Irrigation Project (APMIP) & Ministry of Agriculture, GoI",
    departmentTelugu: "ఆంధ్రప్రదేశ్ సూక్ష్మ సేద్య ప్రాజెక్టు (APMIP) & కేంద్ర జలశక్తి శాఖ",
    purposeAndBenefits: "Promoting water-use efficiency through subsidized installation of modern Drip and Sprinkler irrigation systems, saving 30-40% irrigation water while boosting fertilizer use efficiency and crop yield.",
    purposeAndBenefitsTelugu: "సాగునీటిని ఆదా చేయడానికి మరియు ఎరువుల వినియోగ సామర్థ్యాన్ని పెంచడానికి బిందు (డ్రిప్), తుంపర (స్ప్రింక్లర్) సేద్య పరికరాల ఏర్పాటుపై ఆంధ్రప్రదేశ్ ప్రభుత్వం 90% వరకు భారీ సబ్సిడీని అందిస్తుంది.",
    benefitAmountOrSubsidy: "Up to 90% Subsidy for Small/Marginal Farmers, 70% for other farmers (up to ₹1,00,000 per beneficiary)",
    benefitAmountOrSubsidyTelugu: "చిన్న, సన్నకారు రైతులకు 90% వరకు రాయితీ, ఇతర రైతులకు 70% వరకు రాయితీ",
    subsidyType: "EQUIPMENT_GRANT",
    eligibilityDescription: "Farmers owning agricultural land with an assured water source (borewell, open well, farm pond, or lift canal supply) with water salinity EC < 2.0 dS/m.",
    eligibilityDescriptionTelugu: "బోరుబావి, బావి లేదా కాలువ లిఫ్ట్ ద్వారా ఖచ్చితమైన నీటి వసతి కలిగిన రైతులందరూ అర్హులు.",
    criteria: {
      tenancyTypes: ["OWNER", "OWNER_CUM_TENANT"],
      minAcreage: 0.5,
      maxAcreage: 12.5,
      irrigationTypes: ["BOREWELL", "CANAL_AND_BOREWELL", "FARM_POND"],
      targetCrops: ["Maize", "Banana", "Sugarcane", "Horticulture", "Vegetables"]
    },
    requiredDocuments: [
      { id: "doc-land", name: "1B Land Record / Passbook", nameTelugu: "1-B భూమి రికార్డు", mandatory: true },
      { id: "doc-aadhaar", name: "Aadhaar Card", nameTelugu: "ఆధార్ కార్డు", mandatory: true },
      { id: "doc-water", name: "Water Source & Electricity Connection Certificate", nameTelugu: "నీటి వనరు / విద్యుత్ కనెక్షన్ పత్రం", mandatory: true },
      { id: "doc-soilwater", name: "Water & Soil Quality Test Certificate", nameTelugu: "నీటి నాణ్యత పరీక్ష నివేదిక", mandatory: false }
    ],
    applicationProcedure: "Apply online at APMIP / Meeseva portal or through Village Horticulture Assistant (VHA) / VAA at the Rythu Bharosa Kendra.",
    applicationProcedureTelugu: "మీసేవ కేంద్రంలో లేదా ఆర్బీకేలో గ్రామ వ్యవసాయ సహాయకుడి ద్వారా ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోవాలి.",
    timeline: {
      isOpen: true,
      scheduleNote: "Open round the year subject to district APMIP physical targets.",
      scheduleNoteTelugu: "జిల్లా లక్ష్యాల మేరకు నిరంతరం దరఖాస్తులు స్వీకరించబడతాయి."
    },
    officialPortalUrl: "https://apagrisnet.gov.in/",
    guidelinesUrl: "https://pmksy.gov.in/guidelines.aspx",
    lastVerifiedDate: "2026-02-12",
    sourceAuthority: "APMIP & Ministry of Agriculture, GoI",
    verificationStatus: "OFFICIALLY_VERIFIED"
  },
  {
    id: "SCHEME-KISAN-CREDIT-CARD",
    code: "KCC-MISS",
    officialName: "Kisan Credit Card (KCC) & Modified Interest Subvention Scheme (MISS)",
    officialNameTelugu: "కిసాన్ క్రెడిట్ కార్డ్ (కేసీసీ) & రాయితీ వడ్డీ పంట రుణాలు",
    category: "LOANS_CREDIT",
    level: "CENTRAL",
    department: "Department of Agriculture & Farmers Welfare, GoI in coordination with NABARD & RBI",
    departmentTelugu: "కేంద్ర వ్యవసాయ శాఖ & నాబార్డ్ (NABARD)",
    purposeAndBenefits: "Providing institutional short-term credit to farmers at an ultra-low effective interest rate of 4% per annum (with 3% prompt repayment incentive) to meet crop cultivation expenses, post-harvest costs, and farm asset maintenance without relying on private moneylenders.",
    purposeAndBenefitsTelugu: "రైతులు అధిక వడ్డీ వ్యాపారుల బారిన పడకుండా, బ్యాంకుల ద్వారా 4% అతి తక్కువ వడ్డీకే పంట రుణాలు అందించే కిసాన్ క్రెడిట్ కార్డ్ పథకం. సకాలంలో రుణం చెల్లిస్తే 3% అదనపు వడ్డీ రాయితీ లభిస్తుంది.",
    benefitAmountOrSubsidy: "Concessional Crop Loan up to ₹3,00,000 at 4% effective annual interest (7% base - 3% prompt repayment subvention)",
    benefitAmountOrSubsidyTelugu: "రూ. 3 లక్షల వరకు పంట రుణంపై కేవలం 4% వార్షిక వడ్డీ (సకాలంలో చెల్లించిన రైతులకు 3% వడ్డీ రాయితీ)",
    subsidyType: "LOAN_SUBVENTION",
    eligibilityDescription: "All farmers—owner cultivators, tenant farmers, oral lessees, sharecroppers with valid CCRC, and Joint Liability Groups (JLGs).",
    eligibilityDescriptionTelugu: "భూమి ఉన్న రైతులు, అలాగే కౌలు రైతు హక్కుల కార్డు (CCRC) ఉన్న కౌలు రైతులు అందరూ ఈ రాయితీ పంట రుణం పొందడానికి అర్హులు.",
    criteria: {
      tenancyTypes: ["OWNER", "TENANT_CCRC", "OWNER_CUM_TENANT"],
      targetCrops: ["Paddy", "Black Gram", "Maize", "Sugarcane", "All Field Crops"],
      specialConditions: ["Clean credit history / no willful default", "Verified e-Panta crop cultivation entry"]
    },
    requiredDocuments: [
      { id: "doc-aadhaar", name: "Aadhaar Card", nameTelugu: "ఆధార్ కార్డు", mandatory: true },
      { id: "doc-land", name: "1B Land Document / CCRC Tenant Agreement", nameTelugu: "పట్టాదారు పాస్ పుస్తకం లేదా CCRC కౌలు కార్డు", mandatory: true },
      { id: "doc-ecrop", name: "e-Panta Crop Cultivation Certificate", nameTelugu: "ఈ-పంట సాగు ధృవీకరణ పత్రం", mandatory: true },
      { id: "doc-photo", name: "Passport size photographs & PAN Card", nameTelugu: "పాస్‌పోర్ట్ సైజ్ ఫోటోలు", mandatory: true }
    ],
    applicationProcedure: "Submit simplified 1-page KCC application form at nearest Krishna District Central Cooperative Bank (KDCCB) branch, Commercial Bank, or through Village RBK Loan Desk.",
    applicationProcedureTelugu: "సమీపంలోని కృష్ణా డిస్ట్రిక్ట్ కో-ఆపరేటివ్ బ్యాంక్ (KDCCB), ఎస్‌బీఐ లేదా ఆర్బీకే బ్యాంకింగ్ డెస్క్‌లో సులభతర దరఖాస్తును సమర్పించవచ్చు.",
    timeline: {
      isOpen: true,
      scheduleNote: "Continuous facility. Credit limit renewed annually for 5 years.",
      scheduleNoteTelugu: "సంవత్సరం పొడవునా బ్యాంకుల ద్వారా మంజూరు చేయబడుతుంది."
    },
    officialPortalUrl: "https://dbtbharat.gov.in/",
    guidelinesUrl: "https://agricoop.nic.in/en/kisan-credit-card-kcc",
    lastVerifiedDate: "2026-02-15",
    sourceAuthority: "NABARD & Ministry of Agriculture & Farmers Welfare, GoI (agricoop.nic.in)",
    verificationStatus: "OFFICIALLY_VERIFIED"
  },
  {
    id: "SCHEME-MIDH-HORTICULTURE",
    code: "MIDH-AP-HORTI",
    officialName: "Mission for Integrated Development of Horticulture (MIDH)",
    officialNameTelugu: "సమగ్ర ఉద్యాన అభివృద్ధి మిషన్ (MIDH)",
    category: "HORTICULTURE_ALLIED",
    level: "CENTRAL",
    department: "Department of Horticulture, Govt of Andhra Pradesh & Ministry of Agriculture, GoI",
    departmentTelugu: "ఉద్యానవన శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం & కేంద్ర ప్రభుత్వం",
    purposeAndBenefits: "Promoting crop diversification from high-water paddy into lucrative horticultural crops (Banana Grand Naine, Mango, Guava, Vegetables). Subsidizes planting material, mulching sheets, plastic crates, and shade net nurseries.",
    purposeAndBenefitsTelugu: "వరితో పాటు అధిక ఆదాయం ఇచ్చే అరటి, కూరగాయలు, పూల తోటల సాగును ప్రోత్సహించడానికి నాణ్యమైన మొక్కలు, ప్లాస్టిక్ మల్చింగ్ మరియు ప్యాక్ హౌస్‌ల నిర్మాణంపై 40% నుండి 50% వరకు రాయితీ.",
    benefitAmountOrSubsidy: "Up to 40% to 50% capital subsidy on horticultural planting and protected cultivation",
    benefitAmountOrSubsidyTelugu: "ఉద్యాన తోటల పెంపకం మరియు పరికరాలపై 40% నుండి 50% వరకు సబ్సిడీ",
    subsidyType: "INPUT_SUBSIDY",
    eligibilityDescription: "Farmers with cultivable land with assured micro-irrigation facility intending to cultivate perennial/commercial fruit or vegetable crops.",
    eligibilityDescriptionTelugu: "ఖచ్చితమైన నీటి వసతి కలిగిన భూమి ఉన్న రైతులు అరటి లేదా కూరగాయల సాగు కోసం దరఖాస్తు చేసుకోవచ్చు.",
    criteria: {
      tenancyTypes: ["OWNER", "OWNER_CUM_TENANT"],
      minAcreage: 1.0,
      targetCrops: ["Banana (Grand Naine)", "Vegetables", "Flowers", "Fruit Orchards"]
    },
    requiredDocuments: [
      { id: "doc-land", name: "1B Land Document / Survey Extract", nameTelugu: "1-B భూమి రికార్డు", mandatory: true },
      { id: "doc-aadhaar", name: "Aadhaar Card", nameTelugu: "ఆధార్ కార్డు", mandatory: true },
      { id: "doc-bank", name: "Bank Account Passbook", nameTelugu: "బ్యాంక్ ఖాతా పుస్తకం", mandatory: true }
    ],
    applicationProcedure: "Submit application to the Village Horticulture Assistant (VHA) at the Rythu Bharosa Kendra or online on AP Horticulture portal.",
    applicationProcedureTelugu: "గ్రామ ఆర్బీకేలోని ఉద్యానవన సహాయకుడికి (VHA) దరఖాస్తును సమర్పించాలి.",
    timeline: {
      isOpen: true,
      scheduleNote: "Pre-planting season (June-September & January-February).",
      scheduleNoteTelugu: "తోటల నాట్లు వేసే సమయానికి ముందు దరఖాస్తు చేసుకోవాలి."
    },
    officialPortalUrl: "https://www.myscheme.gov.in/",
    guidelinesUrl: "https://midh.gov.in/guidelines.aspx",
    lastVerifiedDate: "2026-02-11",
    sourceAuthority: "Department of Horticulture, Govt of AP & GoI (midh.gov.in)",
    verificationStatus: "OFFICIALLY_VERIFIED"
  },
  {
    id: "SCHEME-RBK-EQUIPMENT-TARIFF",
    code: "PILOT-RBK-RENTAL",
    officialName: "Custom Hiring Center (CHC) Subsidized Machinery Tariff Regulation",
    officialNameTelugu: "ఆర్బీకే కస్టమ్ హైరింగ్ కేంద్రాల యంత్రాల అద్దె రాయితీ (పైలట్)",
    category: "FARM_MACHINERY",
    level: "STATE_AP",
    department: "Department of Agriculture, Govt of AP (Gudlavalleru Hub Pilot)",
    departmentTelugu: "వ్యవసాయ శాఖ, గుడ్లవల్లేరు క్లస్టర్",
    purposeAndBenefits: "Village-level regulated machinery rental service through RBK CHCs, reducing tractor rotavator and combine harvester hiring charges by ₹300-₹500 per hour compared to private commercial market rates.",
    purposeAndBenefitsTelugu: "గ్రామ రైతు భరోసా కేంద్రాల్లో కస్టమ్ హైరింగ్ సెంటర్ల ద్వారా ట్రాక్టర్లు, వరి కోత యంత్రాలను మార్కెట్ ధర కంటే గంటకు ₹300 నుండి ₹500 తక్కువ అద్దెకే రైతులకు అందించే పైలట్ నియంత్రణ విధానం.",
    benefitAmountOrSubsidy: "Regulated hire concession (Saves approx ₹2,500 to ₹4,000 per acre in land prep & harvesting)",
    benefitAmountOrSubsidyTelugu: "మార్కెట్ రేట్ల కంటే ఎకరానికి ₹2,500 నుండి ₹4,000 వరకు యంత్రాల అద్దె ఆదా",
    subsidyType: "EQUIPMENT_GRANT",
    eligibilityDescription: "All registered farmers in Gudlavalleru Mandal villages with active crop parcels.",
    eligibilityDescriptionTelugu: "గుడ్లవల్లేరు మండల పరిధిలోని గ్రామాల్లో నమోదైన రైతులందరూ బుక్ చేసుకోవచ్చు.",
    criteria: {
      tenancyTypes: ["OWNER", "TENANT_CCRC", "OWNER_CUM_TENANT", "ANY"],
      targetCrops: ["Paddy", "Black Gram", "Maize"]
    },
    requiredDocuments: [
      { id: "doc-farmerid", name: "Annadatha / RBK Farmer ID", nameTelugu: "రైతు గుర్తింపు సంఖ్య", mandatory: true }
    ],
    applicationProcedure: "On-demand advance booking through the RBK Custom Hiring Desk or VAA register.",
    applicationProcedureTelugu: "ఆర్బీకే కేంద్రంలో లేదా వ్యవసాయ సహాయకుడి వద్ద ముందుగా యంత్రాన్ని బుక్ చేసుకోవాలి.",
    timeline: {
      isOpen: true,
      scheduleNote: "Pilot active during seasonal peak field operations.",
      scheduleNoteTelugu: "దుక్కులు మరియు కోతల సమయంలో ముందస్తు బుకింగ్ ఆధారంగా అందుబాటులో ఉంటుంది."
    },
    officialPortalUrl: "https://apagrisnet.gov.in/",
    guidelinesUrl: "https://apagrisnet.gov.in/machinery/tariffs.html",
    lastVerifiedDate: "2026-02-17",
    sourceAuthority: "AP Department of Agriculture Gudlavalleru Pilot Desk",
    verificationStatus: "VERIFICATION_REQUIRED"
  }
];

export const INITIAL_SCHEME_APPLICATIONS: FarmerSchemeApplication[] = [
  {
    id: "APP-2026-001",
    applicationNumber: "PMK-AP-2026-8819",
    schemeId: "SCHEME-PM-KISAN",
    schemeName: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    schemeNameTelugu: "పీఎం-కిసాన్ సమ్మాన్ నిధి",
    farmerId: "AP-KRI-GUD-0182",
    farmerName: "Katragadda Venkat Rao",
    farmerNameTelugu: "కట్రగడ్డ వెంకట్రావు",
    village: "Dokiparru",
    mandal: "Gudlavalleru",
    district: "Krishna",
    appliedDate: "2025-06-18",
    currentStatus: "BENEFIT_DISBURSED",
    submittedDocuments: ["Aadhaar Card", "1B ROR Patta Copy", "Bank Passbook", "Digital e-KYC"],
    pendingDocuments: [],
    departmentRefNumber: "PMKISAN-DBT-9921448",
    disbursedAmount: 6000,
    officerRemarks: "All 3 installments credited successfully via Aadhaar Payment Bridge (APB) to SBI Dokiparru branch account.",
    lastUpdated: "2026-01-25",
    auditTrail: [
      { date: "2025-06-18", status: "SUBMITTED_RBK", updatedBy: "P. Anusha (VAA)", role: "Field Officer", remarks: "Application received at Dokiparru RBK with land documents." },
      { date: "2025-07-02", status: "UNDER_SCRUTINY", updatedBy: "V. Ranga Rao (MAO)", role: "Mandal Officer", remarks: "Webland verification matched Survey #142/2B." },
      { date: "2025-07-20", status: "VERIFIED_APPROVED", updatedBy: "State Nodal Desk", role: "Institution Admin", remarks: "Included in State Beneficiary List." },
      { date: "2026-01-25", status: "BENEFIT_DISBURSED", updatedBy: "PFMS / DBT System", role: "Central DBT Gateway", remarks: "Latest installment ₹2,000 disbursed." }
    ]
  },
  {
    id: "APP-2026-002",
    applicationNumber: "YSR-GUD-2026-0412",
    schemeId: "SCHEME-AP-RYTHU-BHAROSA",
    schemeName: "Annadata Sukhibhava / YSR Rythu Bharosa",
    schemeNameTelugu: "అన్నదాత సుఖీభవ / రైతు భరోసా",
    farmerId: "AP-KRI-GUD-0182",
    farmerName: "Katragadda Venkat Rao",
    farmerNameTelugu: "కట్రగడ్డ వెంకట్రావు",
    village: "Dokiparru",
    mandal: "Gudlavalleru",
    district: "Krishna",
    appliedDate: "2025-07-05",
    currentStatus: "VERIFIED_APPROVED",
    submittedDocuments: ["Aadhaar Card", "e-Panta Receipt", "Bank Passbook"],
    pendingDocuments: [],
    departmentRefNumber: "RBK-AP-55219",
    disbursedAmount: 14000,
    officerRemarks: "e-Crop registration completed for Kharif Paddy (3.0 Ac). First and second installments disbursed.",
    lastUpdated: "2026-02-05",
    auditTrail: [
      { date: "2025-07-05", status: "SUBMITTED_RBK", updatedBy: "P. Anusha (VAA)", role: "Field Officer", remarks: "Submitted via Dokiparru RBK desk." },
      { date: "2025-07-28", status: "VERIFIED_APPROVED", updatedBy: "Dr. M. V. Subbarao", role: "Joint Director of Agriculture", remarks: "Approved based on e-Crop biometric verification." }
    ]
  },
  {
    id: "APP-2026-003",
    applicationNumber: "FCI-KRI-2025-9941",
    schemeId: "SCHEME-FREE-CROP-INSURANCE",
    schemeName: "Dr. YSR Free Crop Insurance / PMFBY",
    schemeNameTelugu: "డా. వైఎస్సార్ ఉచిత పంటల బీమా",
    farmerId: "AP-KRI-GUD-0182",
    farmerName: "Katragadda Venkat Rao",
    farmerNameTelugu: "కట్రగడ్డ వెంకట్రావు",
    village: "Dokiparru",
    mandal: "Gudlavalleru",
    district: "Krishna",
    appliedDate: "2025-07-15",
    currentStatus: "VERIFIED_APPROVED",
    submittedDocuments: ["e-Panta Receipt", "Aadhaar Card"],
    pendingDocuments: [],
    departmentRefNumber: "INS-KRISHNA-2025-0182",
    disbursedAmount: 0,
    officerRemarks: "Universal coverage active. Sum insured ₹1,26,000 for 3.0 Acres BPT 5204. No natural calamity claims triggered this cycle.",
    lastUpdated: "2026-01-15",
    auditTrail: [
      { date: "2025-07-15", status: "VERIFIED_APPROVED", updatedBy: "VAA P. Anusha", role: "Field Officer", remarks: "Auto-enrolled via e-Crop booking without farmer premium deduction." }
    ]
  },
  {
    id: "APP-2026-004",
    applicationNumber: "SMAM-AP-2026-1182",
    schemeId: "SCHEME-SMAM-MECHANIZATION",
    schemeName: "Sub-Mission on Agricultural Mechanization (SMAM)",
    schemeNameTelugu: "వ్యవసాయ యాంత్రీకరణ సబ్సిడీ (రోటవేటర్)",
    farmerId: "AP-KRI-GUD-0208",
    farmerName: "Chalasani Sambasiva Rao",
    farmerNameTelugu: "చలసాని సాంబశివరావు",
    village: "Gudlavalleru",
    mandal: "Gudlavalleru",
    district: "Krishna",
    appliedDate: "2026-01-10",
    currentStatus: "UNDER_SCRUTINY",
    submittedDocuments: ["1B Record of Rights", "Aadhaar Card", "Bank Passbook"],
    pendingDocuments: ["Authorized Dealer Machinery Quotation"],
    departmentRefNumber: "SMAM-KRI-PEND-402",
    disbursedAmount: 0,
    officerRemarks: "Requested 40% capital subsidy on 7-feet tractor Rotavator. Awaiting formal quotation upload from certified dealer.",
    lastUpdated: "2026-02-14",
    auditTrail: [
      { date: "2026-01-10", status: "SUBMITTED_RBK", updatedBy: "Gudlavalleru RBK Desk", role: "Field Officer", remarks: "Initial portal submission." },
      { date: "2026-01-28", status: "UNDER_SCRUTINY", updatedBy: "ADA Gudivada", role: "Institution Admin", remarks: "Scrutiny flagged missing dealer quotation." }
    ]
  },
  {
    id: "APP-2026-005",
    applicationNumber: "KCC-KDCCB-2026-092",
    schemeId: "SCHEME-KISAN-CREDIT-CARD",
    schemeName: "Kisan Credit Card (KCC) Concessional Loan",
    schemeNameTelugu: "కిసాన్ క్రెడిట్ కార్డ్ పంట రుణం",
    farmerId: "AP-KRI-GUD-0221",
    farmerName: "Vellanki Nageswara Rao",
    farmerNameTelugu: "వెల్లంకి నాగేశ్వరరావు",
    village: "Chandrala",
    mandal: "Gudlavalleru",
    district: "Krishna",
    appliedDate: "2026-02-01",
    currentStatus: "UNDER_SCRUTINY",
    submittedDocuments: ["Aadhaar Card", "1B Land Document", "Passport Photo"],
    pendingDocuments: ["e-Crop Certificate verification from VAA"],
    departmentRefNumber: "KDCCB-GUD-LN-501",
    disbursedAmount: 0,
    officerRemarks: "Application processed for ₹1,40,000 scale-of-finance loan at 4% interest rate. Pending VAA e-Crop verification signature.",
    lastUpdated: "2026-02-18",
    auditTrail: [
      { date: "2026-02-01", status: "SUBMITTED_RBK", updatedBy: "Chandrala RBK Desk", role: "Field Officer", remarks: "KCC proposal forwarded to KDCCB branch." },
      { date: "2026-02-12", status: "UNDER_SCRUTINY", updatedBy: "KDCCB Branch Manager", role: "Lead Bank Desk", remarks: "Awaiting field officer verification." }
    ]
  },
  {
    id: "APP-2026-006",
    applicationNumber: "SHC-ZINC-2026-339",
    schemeId: "SCHEME-SOIL-NUTRIENT-SUBSIDY",
    schemeName: "Soil Health Management & Micro-Nutrient Subsidy",
    schemeNameTelugu: "జింక్ సల్ఫేట్ 50% రాయితీ సరఫరా",
    farmerId: "AP-KRI-GUD-0195",
    farmerName: "Maddula Lakshmi Devi",
    farmerNameTelugu: "మద్దుల లక్ష్మీదేవి",
    village: "Angaluru",
    mandal: "Gudlavalleru",
    district: "Krishna",
    appliedDate: "2026-02-05",
    currentStatus: "SUBMITTED_RBK",
    submittedDocuments: ["Soil Health Card", "Aadhaar Card"],
    pendingDocuments: [],
    departmentRefNumber: "RBK-MN-2026-0195",
    disbursedAmount: 0,
    officerRemarks: "Identified severe Zinc deficiency (0.48 ppm) on Survey #88/4. 40kg Zinc Sulphate approved for indent at Angaluru RBK.",
    lastUpdated: "2026-02-19",
    auditTrail: [
      { date: "2026-02-05", status: "SUBMITTED_RBK", updatedBy: "P. Anusha (VAA)", role: "Field Officer", remarks: "Generated recommendation based on soil card diagnosis." }
    ]
  }
];
