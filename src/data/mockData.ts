/**
 * Annadatha Platform - Illustrative Demo Datasets
 * PILOT LOCATION: Gudlavalleru Mandal, Krishna District, Andhra Pradesh, India.
 * 
 * IMPORTANT:
 * - All entries are clearly labelled illustrative demo data only.
 * - Source Tag distinguishes farmer-entered, official benchmarks, field-verified, and calculated estimates.
 * - Disclaimer: "Demo data — not official data".
 */

import {
  FarmerProfile,
  FarmParcel,
  SoilHealthCard,
  WeatherCondition,
  CropProfile,
  ResourceItem,
  MandiPriceRecord,
  ProfitOptimizationPlan,
  ExpertReviewItem,
  VillageClusterStat
} from '../types';
import { COMPREHENSIVE_CROP_CATALOGUE } from './cropCatalogueData';

export const DEMO_NOTICE = "Demo data — not official data. Illustrative simulations only.";

export const PILOT_LOCATION_INFO = {
  country: "India",
  state: "Andhra Pradesh",
  district: "Krishna",
  mandal: "Gudlavalleru",
  agroClimaticZone: "Krishna-Godavari Zone (High Agro-potential Delta)",
  majorCanalSystem: "Krishna Eastern Delta Canal (Ryves & Bandar Canals)",
  headquarters: "Machilipatnam (District HQ), Gudlavalleru (Pilot Hub)"
};

export const VILLAGE_LIST = [
  "Gudlavalleru",
  "Dokiparru",
  "Angaluru",
  "Chandrala",
  "Vinnakota",
  "Penjendra",
  "Serikalvapudi",
  "Vadlamannadu",
  "Chitram",
  "Katuru",
  "Kurumaddali"
];

export const INITIAL_VILLAGE_STATS: VillageClusterStat[] = [
  {
    villageName: "Gudlavalleru",
    registeredFarmers: 428,
    cultivatedAcreage: 1850,
    primaryCrop: "Paddy (BPT 5204)",
    soilTestingCoveragePct: 78,
    canalWaterStatus: "GOOD",
    fieldVisitsThisMonth: 34
  },
  {
    villageName: "Dokiparru",
    registeredFarmers: 312,
    cultivatedAcreage: 1420,
    primaryCrop: "Paddy (MTU 1061) / Blackgram",
    soilTestingCoveragePct: 65,
    canalWaterStatus: "ADEQUATE",
    fieldVisitsThisMonth: 28
  },
  {
    villageName: "Angaluru",
    registeredFarmers: 380,
    cultivatedAcreage: 1690,
    primaryCrop: "Paddy / Maize",
    soilTestingCoveragePct: 82,
    canalWaterStatus: "GOOD",
    fieldVisitsThisMonth: 30
  },
  {
    villageName: "Chandrala",
    registeredFarmers: 245,
    cultivatedAcreage: 1120,
    primaryCrop: "Paddy / Sugarcane",
    soilTestingCoveragePct: 59,
    canalWaterStatus: "ADEQUATE",
    fieldVisitsThisMonth: 19
  },
  {
    villageName: "Vinnakota",
    registeredFarmers: 290,
    cultivatedAcreage: 1310,
    primaryCrop: "Paddy / Blackgram",
    soilTestingCoveragePct: 71,
    canalWaterStatus: "TAIL_END_DEFICIT",
    fieldVisitsThisMonth: 22
  },
  {
    villageName: "Vadlamannadu",
    registeredFarmers: 195,
    cultivatedAcreage: 890,
    primaryCrop: "Paddy / Fodder Maize",
    soilTestingCoveragePct: 52,
    canalWaterStatus: "ADEQUATE",
    fieldVisitsThisMonth: 14
  }
];

export const INITIAL_FARMERS: FarmerProfile[] = [
  {
    id: "AP-KRI-GUD-0182",
    fullName: "Katragadda Venkat Rao",
    fullNameTelugu: "కట్రగడ్డ వెంకట్రావు",
    fatherOrHusbandName: "Subbaiah",
    phoneNumber: "98480 34219",
    maskedAadhaar: "XXXX-XXXX-4821",
    rythuBharosaId: "RBK-GUD-00412",
    gender: "MALE",
    village: "Dokiparru",
    mandal: "Gudlavalleru",
    district: "Krishna",
    landholdingCategory: "SMALL",
    totalAcreage: 4.5,
    primaryCrop: "Paddy (BPT 5204)",
    verificationStatus: "VERIFIED",
    bankLinked: true,
    pmKisanEligible: true,
    landOwnershipType: "OWNER",
    socialCategory: "OBC",
    previousBenefits: ["PM-KISAN", "YSR Rythu Bharosa", "Free Crop Insurance"],
    registrationDate: "2025-06-12",
    notes: "Pilot demonstration farmer. Interested in DSR (Direct Seeded Rice) and relay pulse cultivation.",
    parcelsCount: 2
  },
  {
    id: "AP-KRI-GUD-0195",
    fullName: "Maddula Lakshmi Devi",
    fullNameTelugu: "మద్దుల లక్ష్మీదేవి",
    fatherOrHusbandName: "Narasimha Rao",
    phoneNumber: "94401 88234",
    maskedAadhaar: "XXXX-XXXX-7104",
    rythuBharosaId: "RBK-GUD-00588",
    gender: "FEMALE",
    village: "Angaluru",
    mandal: "Gudlavalleru",
    district: "Krishna",
    landholdingCategory: "MARGINAL",
    totalAcreage: 2.2,
    primaryCrop: "Paddy (MTU 1061)",
    verificationStatus: "VERIFIED",
    bankLinked: true,
    pmKisanEligible: true,
    landOwnershipType: "OWNER",
    socialCategory: "WOMEN_HEADED",
    previousBenefits: ["PM-KISAN"],
    registrationDate: "2025-07-04",
    notes: "Integrated dairy unit with 3 Murrah buffaloes. High organic manure availability.",
    parcelsCount: 1
  },
  {
    id: "AP-KRI-GUD-0208",
    fullName: "Chalasani Sambasiva Rao",
    fullNameTelugu: "చలసాని సాంబశివరావు",
    fatherOrHusbandName: "Purnachandra Rao",
    phoneNumber: "98665 19240",
    maskedAadhaar: "XXXX-XXXX-9325",
    rythuBharosaId: "RBK-GUD-00621",
    gender: "MALE",
    village: "Gudlavalleru",
    mandal: "Gudlavalleru",
    district: "Krishna",
    landholdingCategory: "MEDIUM",
    totalAcreage: 8.0,
    primaryCrop: "Paddy / Sugarcane",
    verificationStatus: "EXPERT_REVIEW_PENDING",
    bankLinked: true,
    pmKisanEligible: true,
    landOwnershipType: "OWNER",
    socialCategory: "GENERAL",
    previousBenefits: ["YSR Rythu Bharosa"],
    registrationDate: "2025-08-19",
    notes: "Awaiting soil card validation for micro-nutrient deficiency (Zinc & Iron).",
    parcelsCount: 3
  },
  {
    id: "AP-KRI-GUD-0221",
    fullName: "Vellanki Nageswara Rao",
    fullNameTelugu: "వెల్లంకి నాగేశ్వరరావు",
    fatherOrHusbandName: "Ramamohan",
    phoneNumber: "99491 55601",
    maskedAadhaar: "XXXX-XXXX-3140",
    rythuBharosaId: "RBK-GUD-00704",
    gender: "MALE",
    village: "Chandrala",
    mandal: "Gudlavalleru",
    district: "Krishna",
    landholdingCategory: "SMALL",
    totalAcreage: 3.5,
    primaryCrop: "Paddy (MTU 1224)",
    verificationStatus: "PENDING_FIELD_VISIT",
    bankLinked: true,
    pmKisanEligible: true,
    landOwnershipType: "OWNER",
    socialCategory: "OBC",
    previousBenefits: [],
    registrationDate: "2025-09-02",
    notes: "Tail-end distributary water access problem in late Rabi.",
    parcelsCount: 1
  },
  {
    id: "AP-KRI-GUD-0239",
    fullName: "Paladugu Venkateswaramma",
    fullNameTelugu: "పాలడుగు వెంకటేశ్వరమ్మ",
    fatherOrHusbandName: "Koteswara Rao",
    phoneNumber: "97014 62118",
    maskedAadhaar: "XXXX-XXXX-5582",
    rythuBharosaId: "RBK-GUD-00819",
    gender: "FEMALE",
    village: "Vinnakota",
    mandal: "Gudlavalleru",
    district: "Krishna",
    landholdingCategory: "MARGINAL",
    totalAcreage: 1.8,
    primaryCrop: "Paddy / Blackgram",
    verificationStatus: "VERIFIED",
    bankLinked: true,
    pmKisanEligible: true,
    landOwnershipType: "TENANT_CCRC",
    socialCategory: "SC",
    previousBenefits: [],
    registrationDate: "2025-09-18",
    notes: "Tenant cultivator with registered CCRC card. Follows natural farming practices (ZBNF Jeevamrutham) on 1 acre.",
    parcelsCount: 1
  }
];

export const INITIAL_PARCELS: FarmParcel[] = [
  {
    id: "PRC-GUD-0182-A",
    farmerId: "AP-KRI-GUD-0182",
    farmerName: "Katragadda Venkat Rao",
    surveyNumber: "142/2B",
    khataNumber: "KHT-519",
    village: "Dokiparru",
    mandal: "Gudlavalleru",
    acreage: 3.0,
    cents: 300,
    soilType: "CLAY_LOAM",
    irrigationType: "CANAL_KRISHNA_DELTA",
    waterAvailability: "SEASONAL_KHARIF_RABI",
    waterSalinityEc: 0.65,
    latitude: 16.3452,
    longitude: 81.0489,
    activeCrop: "Paddy (BPT 5204)",
    cropSeason: "KHARIF",
    sourceTag: "FIELD_VERIFIED",
    updatedDate: "2026-02-15"
  },
  {
    id: "PRC-GUD-0182-B",
    farmerId: "AP-KRI-GUD-0182",
    farmerName: "Katragadda Venkat Rao",
    surveyNumber: "148/1A",
    khataNumber: "KHT-519",
    village: "Dokiparru",
    mandal: "Gudlavalleru",
    acreage: 1.5,
    cents: 150,
    soilType: "BLACK_COTTON",
    irrigationType: "CANAL_AND_BOREWELL",
    waterAvailability: "PERENNIAL",
    waterSalinityEc: 0.72,
    latitude: 16.3481,
    longitude: 81.0512,
    activeCrop: "Black Gram (LBG 752)",
    cropSeason: "RABI",
    sourceTag: "FIELD_VERIFIED",
    updatedDate: "2026-02-15"
  },
  {
    id: "PRC-GUD-0195-A",
    farmerId: "AP-KRI-GUD-0195",
    farmerName: "Maddula Lakshmi Devi",
    surveyNumber: "88/4",
    khataNumber: "KHT-340",
    village: "Angaluru",
    mandal: "Gudlavalleru",
    acreage: 2.2,
    cents: 220,
    soilType: "COASTAL_ALLUVIAL",
    irrigationType: "CANAL_KRISHNA_DELTA",
    waterAvailability: "SEASONAL_KHARIF_RABI",
    waterSalinityEc: 0.58,
    latitude: 16.3610,
    longitude: 81.0345,
    activeCrop: "Paddy (MTU 1061)",
    cropSeason: "KHARIF",
    sourceTag: "FIELD_VERIFIED",
    updatedDate: "2026-01-20"
  },
  {
    id: "PRC-GUD-0208-A",
    farmerId: "AP-KRI-GUD-0208",
    farmerName: "Chalasani Sambasiva Rao",
    surveyNumber: "215/1",
    khataNumber: "KHT-892",
    village: "Gudlavalleru",
    mandal: "Gudlavalleru",
    acreage: 5.0,
    cents: 500,
    soilType: "CLAY_LOAM",
    irrigationType: "CANAL_AND_BOREWELL",
    waterAvailability: "PERENNIAL",
    waterSalinityEc: 0.81,
    latitude: 16.3534,
    longitude: 81.0620,
    activeCrop: "Paddy (BPT 5204)",
    cropSeason: "KHARIF",
    sourceTag: "FARMER_ENTERED",
    updatedDate: "2026-02-10"
  }
];

export const INITIAL_SOIL_CARDS: SoilHealthCard[] = [
  {
    id: "SHC-2026-0182-A",
    parcelId: "PRC-GUD-0182-A",
    farmerId: "AP-KRI-GUD-0182",
    sampleCode: "GUD-DKP-S092",
    testDate: "2025-12-10",
    testingLab: "Regional Soil Testing Laboratory, KVK Ghantasala (Krishna)",
    status: "OFFICIAL_VERIFIED",
    sourceTag: "OFFICIAL_BENCHMARK",
    pH: {
      value: 7.9,
      unit: "pH scale",
      status: "OPTIMAL",
      optimalRange: "6.5 - 8.2",
      remediation: "Slightly alkaline vertisol. Maintain organic matter, avoid excess saline water."
    },
    ec: {
      value: 0.48,
      unit: "dS/m",
      status: "OPTIMAL",
      optimalRange: "< 1.0 dS/m",
      remediation: "Non-saline soil condition."
    },
    organicCarbon: {
      value: 0.42,
      unit: "%",
      status: "LOW",
      optimalRange: "0.50 - 0.75%",
      remediation: "Incorporate 4 tonnes/acre Farm Yard Manure (FYM) or sow Dhaincha / Sunnhemp as green manure."
    },
    nitrogen: {
      value: 195,
      unit: "kg/ha",
      status: "LOW",
      optimalRange: "280 - 560 kg/ha",
      remediation: "Apply Neem Coated Urea in 3 equal splits: Basal, Tillering (20-25 DAT), and Panicle initiation."
    },
    phosphorus: {
      value: 38,
      unit: "kg/ha",
      status: "OPTIMAL",
      optimalRange: "23 - 56 kg/ha",
      remediation: "Medium availability. Apply 40 kg DAP/acre as basal dose."
    },
    potassium: {
      value: 360,
      unit: "kg/ha",
      status: "HIGH",
      optimalRange: "140 - 280 kg/ha",
      remediation: "High potassium status typical of Krishna clay soils. Reduce Muriate of Potash (MOP) dosage by 20%."
    },
    sulphur: {
      value: 14.2,
      unit: "ppm",
      status: "OPTIMAL",
      optimalRange: "10 - 20 ppm",
      remediation: "Adequate level."
    },
    calcium: {
      value: 32.4,
      unit: "meq/100g",
      status: "HIGH",
      optimalRange: "15 - 30 meq/100g",
      remediation: "Sufficient calcium saturation."
    },
    magnesium: {
      value: 9.8,
      unit: "meq/100g",
      status: "OPTIMAL",
      optimalRange: "5 - 15 meq/100g",
      remediation: "Normal balance."
    },
    zinc: {
      value: 0.48,
      unit: "ppm",
      status: "VERY_LOW",
      optimalRange: "0.60 - 1.20 ppm",
      remediation: "CRITICAL: Zinc deficiency widespread in Krishna delta. Broadcast 20 kg Zinc Sulphate (21%) per acre at transplanting."
    },
    iron: {
      value: 6.8,
      unit: "ppm",
      status: "OPTIMAL",
      optimalRange: "4.5 - 9.0 ppm",
      remediation: "Sufficient availability under flooded rice conditions."
    },
    copper: {
      value: 1.1,
      unit: "ppm",
      status: "OPTIMAL",
      optimalRange: "0.20 - 0.80 ppm",
      remediation: "Sufficient."
    },
    manganese: {
      value: 4.9,
      unit: "ppm",
      status: "OPTIMAL",
      optimalRange: "2.0 - 6.0 ppm",
      remediation: "Sufficient."
    },
    boron: {
      value: 0.38,
      unit: "ppm",
      status: "LOW",
      optimalRange: "0.50 - 1.00 ppm",
      remediation: "Foliar spray of 0.2% Solubor at panicle initiation for better grain filling."
    },
    overallRating: "MODERATE",
    expertRemediationNotes: "Soil exhibits typical heavy clay texture with high water holding capacity. Primary bottlenecks are low organic carbon and severe zinc deficiency. Prioritize green manuring and basal Zinc Sulphate application before puddling."
  }
];

export const INITIAL_WEATHER: WeatherCondition = {
  currentTemp: 31.4,
  minTemp: 22.1,
  maxTemp: 33.8,
  humidity: 74,
  windSpeed: 14.5,
  rainfallPast24h: 0.0,
  seasonCumulativeRainfall: 742.6,
  solarRadiation: "18.4 MJ/m²",
  stationLocation: "Gudlavalleru Agro-Met Observatory (Krishna Dist)",
  recordedAt: "2026-11-11 11:30 IST",
  sourceTag: "OFFICIAL_BENCHMARK",
  alerts: [
    {
      id: "ALT-2026-09",
      severity: "ADVISORY",
      title: "High Humidity Blast Disease Alert for BPT 5204",
      titleTelugu: "సాంబా మసూరి (BPT 5204) కి అగ్గి తెగులు హెచ్చరిక",
      description: "Night relative humidity exceeding 85% with morning dew promotes leaf blast. Inspect nursery and tillering crop for spindle-shaped lesions.",
      validUntil: "2026-11-15"
    },
    {
      id: "ALT-2026-10",
      severity: "WATCH",
      title: "Ryves Canal Water Rotation Cycle Update",
      titleTelugu: "రైవ్స్ కాలువ నీటి సరఫరా వంతుల షెడ్యూల్",
      description: "Canal supply rotation will open for Dokiparru distributary on Thursday. Ensure field bunds are strengthened to impound water.",
      validUntil: "2026-11-18"
    }
  ],
  forecast: [
    {
      date: "2026-11-11",
      dayName: "Wednesday",
      minTemp: 22.0,
      maxTemp: 33.5,
      rainfallChance: 10,
      expectedRainfall: 0,
      humidity: 72,
      advisorySnippet: "Ideal weather for fertilizer top-dressing in early tillering crop."
    },
    {
      date: "2026-11-12",
      dayName: "Thursday",
      minTemp: 22.4,
      maxTemp: 34.0,
      rainfallChance: 15,
      expectedRainfall: 0,
      humidity: 70,
      advisorySnippet: "Canal water release day. Maintain 2-3 cm shallow water in transplanted fields."
    },
    {
      date: "2026-11-13",
      dayName: "Friday",
      minTemp: 23.1,
      maxTemp: 33.2,
      rainfallChance: 25,
      expectedRainfall: 2.4,
      humidity: 76,
      advisorySnippet: "Partly cloudy. Suitable for manual weeding and zinc foliar application."
    },
    {
      date: "2026-11-14",
      dayName: "Saturday",
      minTemp: 22.8,
      maxTemp: 32.5,
      rainfallChance: 40,
      expectedRainfall: 8.0,
      humidity: 82,
      advisorySnippet: "Scattered light showers expected. Postpone systemic pesticide sprays."
    },
    {
      date: "2026-11-15",
      dayName: "Sunday",
      minTemp: 21.9,
      maxTemp: 31.8,
      rainfallChance: 20,
      expectedRainfall: 1.0,
      humidity: 78,
      advisorySnippet: "Clear sky post-noon. Monitor for brown plant hopper (BPH) at base of tillers."
    },
    {
      date: "2026-11-16",
      dayName: "Monday",
      minTemp: 21.5,
      maxTemp: 32.2,
      rainfallChance: 10,
      expectedRainfall: 0,
      humidity: 74,
      advisorySnippet: "Favorable dry window for farm mechanization and field bund clearing."
    },
    {
      date: "2026-11-17",
      dayName: "Tuesday",
      minTemp: 22.0,
      maxTemp: 33.0,
      rainfallChance: 15,
      expectedRainfall: 0,
      humidity: 72,
      advisorySnippet: "Optimum solar radiation for photosynthesis and grain formation."
    }
  ]
};

export const INITIAL_CROPS: CropProfile[] = COMPREHENSIVE_CROP_CATALOGUE;

export const INITIAL_RESOURCE_PLAN_PADDY: ResourceItem[] = [
  {
    category: "SEED",
    itemName: "Certified Seed — BPT 5204 (Samba Mahsuri)",
    itemNameTelugu: "ధృవీకరించిన విత్తనాలు — BPT 5204",
    quantityPerAcre: 25,
    unit: "kg",
    unitCostInr: 44,
    totalCostPerAcre: 1100,
    applicationStage: "LAND_PREPARATION",
    sourceBenchmark: "AP Seeds Development Corporation (APSSDC) Rate",
    isCustomizable: true
  },
  {
    category: "SEED",
    itemName: "Seed Treatment (Carbendazim 2g/kg + Trichoderma viride)",
    itemNameTelugu: "విత్తన శుద్ధి మందులు",
    quantityPerAcre: 1,
    unit: "kit",
    unitCostInr: 220,
    totalCostPerAcre: 220,
    applicationStage: "LAND_PREPARATION",
    sourceBenchmark: "RBK Gudlavalleru Hub Benchmark",
    isCustomizable: false
  },
  {
    category: "FERTILIZER",
    itemName: "DAP (Di-ammonium Phosphate 18:46:0)",
    itemNameTelugu: "డీఏపీ ఎరువు (బస్తా)",
    quantityPerAcre: 50,
    unit: "kg (1 bag)",
    unitCostInr: 1350,
    totalCostPerAcre: 1350,
    applicationStage: "BASAL",
    sourceBenchmark: "Govt Subsidized Maximum Retail Price",
    isCustomizable: true
  },
  {
    category: "FERTILIZER",
    itemName: "Neem Coated Urea (46% N) - 3 Splits",
    itemNameTelugu: "వేప పూత యూరియా (3 దఫాలు)",
    quantityPerAcre: 90,
    unit: "kg (2 bags)",
    unitCostInr: 268,
    totalCostPerAcre: 536,
    applicationStage: "TILLERING",
    sourceBenchmark: "Govt Subsidized Maximum Retail Price",
    isCustomizable: true
  },
  {
    category: "FERTILIZER",
    itemName: "MOP (Muriate of Potash 0:0:60)",
    itemNameTelugu: "పొటాష్ ఎరువు (MOP)",
    quantityPerAcre: 35,
    unit: "kg",
    unitCostInr: 34,
    totalCostPerAcre: 1190,
    applicationStage: "BASAL",
    sourceBenchmark: "Official Dealer Subsidized Benchmark",
    isCustomizable: true
  },
  {
    category: "FERTILIZER",
    itemName: "Zinc Sulphate Heptahydrate (21% Zn)",
    itemNameTelugu: "జింక్ సల్ఫేట్ (21% మైక్రో న్యూట్రియంట్)",
    quantityPerAcre: 20,
    unit: "kg",
    unitCostInr: 45,
    totalCostPerAcre: 900,
    applicationStage: "BASAL",
    sourceBenchmark: "Soil Health Card Deficit Recommendation",
    isCustomizable: true
  },
  {
    category: "ORGANIC",
    itemName: "Well-decomposed Farm Yard Manure (FYM)",
    itemNameTelugu: "పశువుల పెంట / మాగిన ఎరువు",
    quantityPerAcre: 3,
    unit: "Tractor Loads",
    unitCostInr: 1500,
    totalCostPerAcre: 4500,
    applicationStage: "LAND_PREPARATION",
    sourceBenchmark: "Local Krishna District Farm Rate",
    isCustomizable: true
  },
  {
    category: "PESTICIDE",
    itemName: "Pre-emergence Herbicide (Pretilachlor 50% EC)",
    itemNameTelugu: "కలుపు మందు (ప్రిటిలాక్లోర్)",
    quantityPerAcre: 500,
    unit: "ml",
    unitCostInr: 480,
    totalCostPerAcre: 480,
    applicationStage: "LAND_PREPARATION",
    sourceBenchmark: "RBK Retail Rate",
    isCustomizable: true
  },
  {
    category: "PESTICIDE",
    itemName: "Bio-fungicide & Stem Borer Management (Cartap 4G / Chlorantraniliprole)",
    itemNameTelugu: "కాండం తొలుచు పురుగు నివారణ మందు",
    quantityPerAcre: 1,
    unit: "Application pack",
    unitCostInr: 1650,
    totalCostPerAcre: 1650,
    applicationStage: "TILLERING",
    sourceBenchmark: "ANGRAU Plant Protection Standard",
    isCustomizable: true
  },
  {
    category: "LABOUR",
    itemName: "Nursery Raising & Manual Transplanting Labour",
    itemNameTelugu: "నారు మడి తయారీ & నాట్లు వేసే కూలీలు",
    quantityPerAcre: 14,
    unit: "Woman mandays",
    unitCostInr: 450,
    totalCostPerAcre: 6300,
    applicationStage: "BASAL",
    sourceBenchmark: "Gudlavalleru Village Prevailing Wage Norms",
    isCustomizable: true
  },
  {
    category: "LABOUR",
    itemName: "Inter-cultivation, Weeding & Chemical Spraying",
    itemNameTelugu: "కలుపు తీత మరియు పిచికారీ కూలీ ఖర్చులు",
    quantityPerAcre: 6,
    unit: "Mandays",
    unitCostInr: 500,
    totalCostPerAcre: 3000,
    applicationStage: "TILLERING",
    sourceBenchmark: "Local Prevailing Daily Wages",
    isCustomizable: true
  },
  {
    category: "MACHINERY",
    itemName: "Tractor Disc Ploughing, Puddling & Levelling Hire",
    itemNameTelugu: "ట్రాక్టర్ దమ్ము, చదును చేసే యంత్ర ఖర్చులు",
    quantityPerAcre: 4.5,
    unit: "Tractor Hours",
    unitCostInr: 1200,
    totalCostPerAcre: 5400,
    applicationStage: "LAND_PREPARATION",
    sourceBenchmark: "Custom Hiring Center (CHC) Gudlavalleru",
    isCustomizable: true
  },
  {
    category: "MACHINERY",
    itemName: "Combined Harvester & Thresher Machine Hire",
    itemNameTelugu: "వరి కోత మరియు నూర్పిడి కంబైన్డ్ హార్వెస్టర్",
    quantityPerAcre: 1.2,
    unit: "Machine Hours",
    unitCostInr: 2600,
    totalCostPerAcre: 3120,
    applicationStage: "HARVEST",
    sourceBenchmark: "Gudlavalleru Harvester Union Tariff",
    isCustomizable: true
  },
  {
    category: "IRRIGATION",
    itemName: "Canal Water Cess & Field Bund Maintenance",
    itemNameTelugu: "కాలువ నీటి తీరువా & గట్ల మరమ్మత్తులు",
    quantityPerAcre: 1,
    unit: "Seasonal acre charge",
    unitCostInr: 650,
    totalCostPerAcre: 650,
    applicationStage: "BASAL",
    sourceBenchmark: "AP Water Resources Dept Statutory Cess",
    isCustomizable: false
  }
];

export const INITIAL_MANDI_PRICES: MandiPriceRecord[] = [
  {
    id: "MND-01",
    commodity: "Paddy (Common / Grade-A)",
    variety: "BPT 5204 (Samba Mahsuri)",
    marketName: "Gudlavalleru AMIC (Local Hub)",
    district: "Krishna",
    minPrice: 2420,
    maxPrice: 2680,
    modalPrice: 2590,
    arrivalVolumeTonnes: 145,
    trend: "UP",
    trendPercentage: 3.4,
    reportDate: "2026-11-10",
    govtMsp: 2320,
    sourceName: "AP Agmarknet Illustrative Pilot Feed",
    sourceTag: "OFFICIAL_BENCHMARK"
  },
  {
    id: "MND-02",
    commodity: "Paddy (Coarse / Submergence)",
    variety: "MTU 1061 (Indra)",
    marketName: "Machilipatnam AMC",
    district: "Krishna",
    minPrice: 2280,
    maxPrice: 2410,
    modalPrice: 2360,
    arrivalVolumeTonnes: 320,
    trend: "STABLE",
    trendPercentage: 0.2,
    reportDate: "2026-11-10",
    govtMsp: 2300,
    sourceName: "AP Agmarknet Illustrative Pilot Feed",
    sourceTag: "OFFICIAL_BENCHMARK"
  },
  {
    id: "MND-03",
    commodity: "Black Gram (Urad)",
    variety: "LBG 752",
    marketName: "Vijayawada (Gollapudi AMC)",
    district: "Krishna",
    minPrice: 7600,
    maxPrice: 8450,
    modalPrice: 8120,
    arrivalVolumeTonnes: 85,
    trend: "UP",
    trendPercentage: 5.1,
    reportDate: "2026-11-10",
    govtMsp: 7400,
    sourceName: "AP Agmarknet Illustrative Pilot Feed",
    sourceTag: "OFFICIAL_BENCHMARK"
  },
  {
    id: "MND-04",
    commodity: "Maize (Yellow Corn)",
    variety: "DHM 117 Hybrid",
    marketName: "Guntur Agricultural Market",
    district: "Guntur",
    minPrice: 2150,
    maxPrice: 2380,
    modalPrice: 2290,
    arrivalVolumeTonnes: 410,
    trend: "DOWN",
    trendPercentage: -1.8,
    reportDate: "2026-11-10",
    govtMsp: 2225,
    sourceName: "AP Agmarknet Illustrative Pilot Feed",
    sourceTag: "OFFICIAL_BENCHMARK"
  },
  {
    id: "MND-05",
    commodity: "Sugarcane",
    variety: "Co 86032",
    marketName: "Vuyyuru KCP Mill Gate",
    district: "Krishna",
    minPrice: 325,
    maxPrice: 340,
    modalPrice: 335,
    arrivalVolumeTonnes: 920,
    trend: "STABLE",
    trendPercentage: 0.0,
    reportDate: "2026-11-10",
    govtMsp: 315, // Fair & Remunerative Price per quintal
    sourceName: "Sugar Mill Gate Statutory FRP Benchmark",
    sourceTag: "OFFICIAL_BENCHMARK"
  }
];

export const INITIAL_PROFIT_PLANS: ProfitOptimizationPlan[] = [
  {
    id: "PLN-2026-001",
    farmerId: "AP-KRI-GUD-0182",
    parcelId: "PRC-GUD-0182-A",
    cropId: "CRP-PAD-BPT5204",
    cropName: "Paddy (BPT 5204 Samba Mahsuri)",
    variety: "BPT 5204",
    acreage: 3.0,
    cultivationMethod: "CONVENTIONAL_PUDDLED",
    seedCost: 3960,
    fertilizerCost: 11958,
    organicCost: 13500,
    pesticideCost: 6390,
    labourCost: 27900,
    machineryCost: 25560,
    irrigationPowerCost: 1950,
    totalOperationalCost: 91218,
    costPerAcre: 30406,
    expectedYieldPerAcreQuintals: 28,
    totalYieldQuintals: 84,
    expectedPricePerQuintal: 2590,
    mainProduceRevenue: 217560,
    byProductRevenue: 13500, // Fodder / Straw bales
    grossEstimatedRevenue: 231060,
    netProfit: 139842,
    netProfitPerAcre: 46614,
    returnOnInvestmentPct: 153.3,
    breakEvenPricePerQuintal: 1086,
    status: "EXPERT_APPROVED",
    reviewedBy: "Dr. S. Radhakrishna (Senior Agronomist, KVK)",
    reviewedAt: "2026-02-18",
    expertRemarks: "Soil test reveals zinc deficiency. Plan incorporates 20kg Zinc Sulphate per acre and reduces MOP application due to high inherent potassium. Projected returns are healthy.",
    sourceTag: "CALCULATED_ESTIMATE"
  },
  {
    id: "PLN-2026-002",
    farmerId: "AP-KRI-GUD-0182",
    parcelId: "PRC-GUD-0182-B",
    cropId: "CRP-PUL-LBG752",
    cropName: "Black Gram (LBG 752 Urad)",
    variety: "LBG 752",
    acreage: 1.5,
    cultivationMethod: "DIRECT_SEEDED_RICE_DSR",
    seedCost: 1650,
    fertilizerCost: 1200,
    organicCost: 0,
    pesticideCost: 1800,
    labourCost: 4500,
    machineryCost: 1800,
    irrigationPowerCost: 0,
    totalOperationalCost: 10950,
    costPerAcre: 7300,
    expectedYieldPerAcreQuintals: 8.0,
    totalYieldQuintals: 12.0,
    expectedPricePerQuintal: 8120,
    mainProduceRevenue: 97440,
    byProductRevenue: 1800,
    grossEstimatedRevenue: 99240,
    netProfit: 88290,
    netProfitPerAcre: 58860,
    returnOnInvestmentPct: 806.3,
    breakEvenPricePerQuintal: 912,
    status: "EXPERT_APPROVED",
    reviewedBy: "Dr. S. Radhakrishna (Senior Agronomist, KVK)",
    reviewedAt: "2026-02-18",
    expertRemarks: "Excellent relay crop option utilizing residual soil moisture with zero tillage. Minimal operational risk.",
    sourceTag: "CALCULATED_ESTIMATE"
  }
];

export const INITIAL_REVIEW_QUEUE: ExpertReviewItem[] = [
  {
    id: "REV-2026-081",
    farmerId: "AP-KRI-GUD-0208",
    farmerName: "Chalasani Sambasiva Rao",
    village: "Gudlavalleru",
    planId: "PLN-2026-008",
    cropName: "Paddy (BPT 5204) — 5.0 Acres",
    acreage: 5.0,
    submittedDate: "2026-02-19",
    currentStatus: "EXPERT_REVIEW_PENDING",
    requestedNutrientPlan: "Custom high-nitrogen schedule requested; soil lab indicates 7.9 pH with Zinc deficiency.",
    fieldOfficerNotes: "Field verified by VAA P. Anusha. Irrigation borewell tested at 0.81 dS/m, safe for canal conjunctive use.",
    agronomistRecommendations: "Need to cut proposed Urea by 25 kg/acre and substitute with 20 kg Zinc Sulphate + 4 t FYM.",
    actionRequired: "AGRONOMIST_SIGN_OFF",
    lastUpdated: "2026-02-20"
  },
  {
    id: "REV-2026-082",
    farmerId: "AP-KRI-GUD-0221",
    farmerName: "Vellanki Nageswara Rao",
    village: "Chandrala",
    planId: "PLN-2026-011",
    cropName: "Paddy (MTU 1224) — 3.5 Acres",
    acreage: 3.5,
    submittedDate: "2026-02-18",
    currentStatus: "PENDING_FIELD_VISIT",
    requestedNutrientPlan: "Conventional chemical schedule without recent soil test.",
    fieldOfficerNotes: "Scheduled field visit on 2026-02-22 to collect composite soil sample.",
    actionRequired: "FIELD_VERIFICATION",
    lastUpdated: "2026-02-18"
  },
  {
    id: "REV-2026-083",
    farmerId: "AP-KRI-GUD-0195",
    farmerName: "Maddula Lakshmi Devi",
    village: "Angaluru",
    planId: "PLN-2026-005",
    cropName: "Paddy (MTU 1061) — 2.2 Acres",
    acreage: 2.2,
    submittedDate: "2026-02-17",
    currentStatus: "VERIFIED",
    requestedNutrientPlan: "Integrated organic (dairy slurry) + recommended NPK splits.",
    fieldOfficerNotes: "Verified on site. Vermicompost unit operational.",
    agronomistRecommendations: "Approved with green manuring recommendation.",
    actionRequired: "AGRONOMIST_SIGN_OFF",
    lastUpdated: "2026-02-19"
  }
];

export const DATA_SOURCES_INFO = [
  {
    organization: "Acharya N.G. Ranga Agricultural University (ANGRAU)",
    department: "Directorate of Extension & Crop Production Standards",
    location: "Lam, Guntur / RARS Maruteru",
    publications: "Vyavasaya Panchangam (Agronomy Package of Practices 2025-26)",
    dataCoverage: "Fertilizer dosage recommendations, crop duration, pest threshold limits for AP agro-climatic zones",
    linkNote: "Reference standards for nutrient and crop protection models."
  },
  {
    organization: "Krishi Vigyan Kendra (ICAR-KVK)",
    department: "District Agricultural Advisory Cell",
    location: "Ghantasala, Krishna District, AP",
    publications: "District Soil Health & Diagnostic Advisory Bulletins",
    dataCoverage: "Krishna Delta vertisol characteristics, micro-nutrient deficiencies (Zn/Fe), canal rotation timing",
    linkNote: "Local agronomic validation partner."
  },
  {
    organization: "Directorate of Economics and Statistics (DES) & AP Agmarknet",
    department: "Agricultural Marketing Department, Govt of AP",
    location: "Guntur / Vijayawada",
    publications: "Daily Modal Mandi Arrivals & Price Bulletins",
    dataCoverage: "Min, Max, Modal prices and arrival volumes from Gudlavalleru, Machilipatnam, Vijayawada, Guntur APMCs",
    linkNote: "Basis for market intelligence calculations (illustrative demo figures)."
  },
  {
    organization: "India Meteorological Department (IMD)",
    department: "Agromet Advisory Service (AAS) & RMC Chennai",
    location: "Amaravati / Machilipatnam Cyclone Warning Center",
    publications: "District Agromet Advisory Service Bulletins (Gudlavalleru Block)",
    dataCoverage: "7-day precipitation, temperature, relative humidity forecasts and disease hazard alerts",
    linkNote: "Advisory weather intelligence layer."
  },
  {
    organization: "Department of Agriculture, Govt of Andhra Pradesh",
    department: "Rythu Bharosa Kendra (RBK) Technical Operations",
    location: "Gudlavalleru Mandal Hub",
    publications: "E-Panta crop booking guidelines & Input Subsidies schedule",
    dataCoverage: "Seed varieties, subsidized fertilizer price benchmarks, custom hiring center (CHC) machinery tariffs",
    linkNote: "Village-level operational delivery model."
  }
];
