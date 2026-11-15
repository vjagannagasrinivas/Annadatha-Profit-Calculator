/**
 * Annadatha Platform - Comprehensive Crop Candidate Catalogue
 * Pilot Hub: Gudlavalleru Mandal, Krishna District, Andhra Pradesh
 * 
 * Regional Agronomic Reference:
 * - ICAR-CRIDA Krishna District Crop Contingency Plan
 * - ANGRAU (Acharya N.G. Ranga Agricultural University) Crop Production Guide
 * - ICAR-KVK (Krishi Vigyan Kendra, Ghantasala, Krishna District)
 * - Directorate of Economics & Statistics, Govt of Andhra Pradesh
 * - APMC Mandi Historical Arrivals (Gudlavalleru AMIC, Machilipatnam AMC, Vijayawada Market)
 */

import { CropProfile, CropCategory, InvestmentLineItems } from '../types';

export const CROP_CATEGORIES_METADATA: {
  key: CropCategory;
  labelEn: string;
  labelTe: string;
  badgeColor: string;
}[] = [
  { key: 'CEREAL_STAPLE', labelEn: 'Cereals & Staples', labelTe: 'ధాన్యాలు & ప్రధాన పంటలు', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
  { key: 'PULSE', labelEn: 'Pulses & Legumes', labelTe: 'పప్పుధాన్యాలు', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { key: 'MILLET', labelEn: 'Nutri-Cereals & Millets', labelTe: 'సిరిధాన్యాలు & చిరుధాన్యాలు', badgeColor: 'bg-orange-100 text-orange-900 border-orange-300' },
  { key: 'OILSEED', labelEn: 'Oilseeds', labelTe: 'నూనెగింజల పంటలు', badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
  { key: 'SPICE', labelEn: 'Spices & Condiments', labelTe: 'సుగంధ ద్రవ్యాలు', badgeColor: 'bg-rose-100 text-rose-900 border-rose-300' },
  { key: 'FRUIT_PERENNIAL', labelEn: 'Fruits & Perennials', labelTe: 'ఉద్యాన & తోట పంటలు', badgeColor: 'bg-teal-100 text-teal-900 border-teal-300' },
  { key: 'VEGETABLE', labelEn: 'Vegetables', labelTe: 'కూరగాయలు', badgeColor: 'bg-lime-100 text-lime-900 border-lime-300' },
  { key: 'LEAFY_VEGETABLE', labelEn: 'Leafy Greens', labelTe: 'ఆకుకూరలు', badgeColor: 'bg-green-100 text-green-900 border-green-300' },
  { key: 'MEDICINAL_AROMATIC', labelEn: 'Medicinal & Aromatic', labelTe: 'ఔషధ & సుగంధ పంటలు', badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
  { key: 'COMMERCIAL_CASH', labelEn: 'Commercial & Cash Crops', labelTe: 'వాణిజ్య పంటలు', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' }
];

const RAW_CROP_CATALOGUE: CropProfile[] = [
  // 1. Paddy Samba Mahsuri
  {
    id: "CRP-PAD-BPT5204",
    cropName: "Paddy — Samba Mahsuri (BPT 5204)",
    cropNameTelugu: "వరి — సాంబా మసూరి (BPT 5204)",
    category: "CEREAL_STAPLE",
    recommendedVarieties: ["BPT 5204", "MTU 1224", "Nellore Mahsuri"],
    season: "KHARIF",
    durationDays: 145,
    waterRequirementMm: 1200,
    preferredSoil: ["Deep Black Cotton", "Clay Loam", "Heavy Delta Alluvial"],
    toleratedDrainage: ["MODERATELY_DRAINED", "POORLY_DRAINED_CLAY"],
    yieldBenchmarkPerAcre: { min: 24, max: 32, average: 28, unit: "Quintals / Acre" },
    suitabilityScore: 94,
    soilCompatibilityScore: 92,
    waterCompatibilityScore: 96,
    climateResilience: "MODERATE",
    labourIntensity: "HIGH",
    keyAdvantages: [
      "Top consumer premium in Krishna and Guntur mills for slender grain table rice",
      "High straw byproduct yield (3.5 tonnes/ac) providing critical dry dairy fodder",
      "Excellent response to Krishna Eastern Delta canal rotation"
    ],
    keyRisks: [
      "Susceptible to Leaf & Neck Blast disease under sustained high humidity (>85%)",
      "Lodging hazard during October-November cyclonic depressions if nitrogen is excessive"
    ],
    sourceReference: "ANGRAU Regional Agricultural Research Station, Maruteru",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 7.1,
      dietaryFiberGPer100g: 2.8,
      energyKcalPer100g: 350,
      ironMgPer100g: 1.2,
      zincMgPer100g: 1.4,
      vitaminRichness: "B-Complex (Thiamine in parboiled/unpolished grain)",
      nutritionalScore: 54,
      nutritionalHighlightsEn: ["High readily digestible starch", "Essential staple calorie base", "Hypoallergenic grain"],
      nutritionalHighlightsTe: ["శరీరానికి తక్షణ శక్తినిచ్చే ప్రధాన పిండి పదార్థం", "సులువుగా జీర్ణమయ్యే ఆహారం"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 32400,
      expectedYieldAverage: 28,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 2590,
      grossRevenuePerAcre: 77020, // 28 * 2590 + 4500 straw
      estimatedNetProfitPerAcre: 44620,
      daysToFirstReturn: 145,
      localPriceHistory: { min: 2320, max: 2750, modal: 2590, marketName: "Gudlavalleru AMIC", trend: "RISING" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA Krishna Contingency Plan: Normal onset SW monsoon recommends puddle transplanted medium-fine grain rice in Eastern Delta command with blast prophylactic fungicidal spray.",
    dataDate: "Kharif 2025-26 ANGRAU / KVK Ghantasala",
    assumptions: ["Assumes normal canal water release by June 15 from Prakasam Barrage", "Standard chemical fertilizer dosage + 20 kg Zinc Sulphate basal"]
  },

  // 2. Paddy Indra
  {
    id: "CRP-PAD-MTU1061",
    cropName: "Paddy — Indra (MTU 1061 - Submergence Tolerant)",
    cropNameTelugu: "వరి — ఇంద్ర (MTU 1061 - ముంపు తట్టుకునే వంగడం)",
    category: "CEREAL_STAPLE",
    recommendedVarieties: ["MTU 1061", "MTU 1064", "Swarna Sub-1"],
    season: "KHARIF",
    durationDays: 150,
    waterRequirementMm: 1250,
    preferredSoil: ["Deep Black Cotton", "Heavy Clay", "Low-lying Alluvial"],
    toleratedDrainage: ["POORLY_DRAINED_CLAY", "WATERLOGGED_LOWLAND"],
    yieldBenchmarkPerAcre: { min: 28, max: 36, average: 31, unit: "Quintals / Acre" },
    suitabilityScore: 92,
    soilCompatibilityScore: 96,
    waterCompatibilityScore: 95,
    climateResilience: "HIGH",
    labourIntensity: "HIGH",
    keyAdvantages: [
      "Survives 10–14 days complete flood submergence during delta coastal cyclones",
      "Sturdy thick stem resists lodging in coastal wind gusts",
      "Guaranteed price support via Government Civil Supplies procurement"
    ],
    keyRisks: [
      "Longer duration (150 days) delays rabi zero-till pulse sowing window",
      "Lower grain market price premium compared to fine-grain BPT 5204"
    ],
    sourceReference: "ANGRAU Maruteru Flood Tolerance Trials",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 7.3,
      dietaryFiberGPer100g: 3.1,
      energyKcalPer100g: 348,
      ironMgPer100g: 1.5,
      zincMgPer100g: 1.6,
      vitaminRichness: "B-Complex (Niacin, Riboflavin)",
      nutritionalScore: 56,
      nutritionalHighlightsEn: ["Substantial staple nutrition", "Sturdy fibrous rice bran", "Safe food security reserve"],
      nutritionalHighlightsTe: ["ప్రకృతి విపత్తుల్లోనూ ఆహార భద్రతను ఇచ్చే నిలకడైన ధాన్యం"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 30000,
      expectedYieldAverage: 31,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 2320, // Govt MSP
      grossRevenuePerAcre: 76420, // 31 * 2320 + 4500 straw
      estimatedNetProfitPerAcre: 46420,
      daysToFirstReturn: 150,
      localPriceHistory: { min: 2300, max: 2400, modal: 2320, marketName: "Govt MSP Procurement Center, Gudlavalleru", trend: "STABLE" },
      buyerDemand: "STEADY_PROCUREMENT",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA Contingency: In low-lying, poorly drained delta mandals prone to flood inundation (Vinnakota, Vadlamannadu), adopt submergence-tolerant MTU-1061 / Swarna-Sub1.",
    dataDate: "Kharif 2025-26 AP Department of Agriculture",
    assumptions: ["Assumes 150-day cycle; requires early nursery sowing by May end to escape November cyclones"]
  },

  // 3. Black Gram (Urad)
  {
    id: "CRP-PUL-LBG752",
    cropName: "Black Gram / Urad (LBG 752)",
    cropNameTelugu: "మినుము — ఉరద్ (LBG 752 - జీరో టిల్లేజ్ రిలే పప్పు)",
    category: "PULSE",
    recommendedVarieties: ["LBG 752", "TBG 104", "PU 31", "LBG 623"],
    season: "RABI",
    durationDays: 78,
    waterRequirementMm: 250,
    preferredSoil: ["Deep Black Vertisols", "Clay Loam", "Rice Fallows"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED", "POORLY_DRAINED_CLAY"],
    yieldBenchmarkPerAcre: { min: 6, max: 9.5, average: 7.8, unit: "Quintals / Acre" },
    suitabilityScore: 98,
    soilCompatibilityScore: 98,
    waterCompatibilityScore: 98,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Zero tillage relay sowing in standing paddy (3–4 days before harvest) — eliminates field preparation costs",
      "Utilizes residual soil moisture with zero canal irrigation needed",
      "Fixes 35–40 kg atmospheric nitrogen per acre, enriching soil organic fertility"
    ],
    keyRisks: [
      "Vulnerable to unseasonal cyclone showers during December-January seedling phase",
      "Yellow Mosaic Virus (YMV) and powdery mildew if humidity persists"
    ],
    sourceReference: "Regional Agricultural Research Station, Lam, Guntur & KVK Ghantasala",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 24.0,
      dietaryFiberGPer100g: 18.3,
      energyKcalPer100g: 341,
      ironMgPer100g: 7.5,
      zincMgPer100g: 3.2,
      calciumMgPer100g: 138,
      vitaminRichness: "High Folate (Vitamin B9), Magnesium, Potassium",
      nutritionalScore: 92,
      nutritionalHighlightsEn: ["24% Plant protein", "High Dietary Fiber", "High Iron (7.5mg)", "Low Glycemic Index"],
      nutritionalHighlightsTe: ["24% అధిక శాకాహార ప్రోటీన్", "రక్తహీనత నివారణకు ఐరన్", "ఎముకల పుష్టికి కాల్షియం"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 10500,
      expectedYieldAverage: 7.8,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 7800,
      grossRevenuePerAcre: 60840,
      estimatedNetProfitPerAcre: 50340,
      daysToFirstReturn: 78,
      localPriceHistory: { min: 7200, max: 8400, modal: 7800, marketName: "Vijayawada Commercial Mandi", trend: "RISING" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA Krishna District Contingency: Post-kharif relay blackgram (LBG-752) is the primary recommendation for Krishna Delta clay soils. Seed treatment with imidacloprid and rhizobium culture is mandatory.",
    dataDate: "Rabi 2025-26 ANGRAU / Lam Guntur",
    assumptions: ["Sown 2–3 days prior to paddy harvest into standing crop", "No land preparation or tractor ploughing expense required"]
  },

  // 4. Green Gram (Moong)
  {
    id: "CRP-PUL-WGG42",
    cropName: "Green Gram / Moong (WGG 42)",
    cropNameTelugu: "పెసర — మూంగ్ (WGG 42 - స్వల్పకాలిక రకం)",
    category: "PULSE",
    recommendedVarieties: ["WGG 42", "IPM 02-03", "TM 96-2"],
    season: "RABI",
    durationDays: 65,
    waterRequirementMm: 220,
    preferredSoil: ["Clay Loam", "Alluvial Loam", "Sandy Loam"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED", "POORLY_DRAINED_CLAY"],
    yieldBenchmarkPerAcre: { min: 5, max: 7.5, average: 6.2, unit: "Quintals / Acre" },
    suitabilityScore: 90,
    soilCompatibilityScore: 90,
    waterCompatibilityScore: 92,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Ultra-short duration (65 days) — fastest cash generation among pulses",
      "Readily digestible, gentle protein with low flatulence",
      "Ideal catch crop fitting tight rotation windows before summer"
    ],
    keyRisks: [
      "High pod shattering if harvest is delayed during dry hot winds",
      "Susceptible to powdery mildew in cloudy weather"
    ],
    sourceReference: "ANGRAU Pulse Research Station, Lam, Guntur",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 24.5,
      dietaryFiberGPer100g: 16.3,
      energyKcalPer100g: 347,
      ironMgPer100g: 4.4,
      zincMgPer100g: 2.7,
      vitaminRichness: "B-Vitamins, Folate, Vitamin K",
      nutritionalScore: 91,
      nutritionalHighlightsEn: ["Easily digestible protein", "High bioavailability", "Excellent for child/elder nutrition"],
      nutritionalHighlightsTe: ["సులువుగా జీర్ణమయ్యే పోషక ప్రోటీన్", "పిల్లలు మరియు వృద్ధులకు మేలైన ఆహారం"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 9800,
      expectedYieldAverage: 6.2,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 8500,
      grossRevenuePerAcre: 52700,
      estimatedNetProfitPerAcre: 42900,
      daysToFirstReturn: 65,
      localPriceHistory: { min: 7800, max: 8800, modal: 8500, marketName: "Machilipatnam AMC", trend: "STABLE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA Contingency: Sowing WGG-42 in rice fallows gives high water-use efficiency; recommended when delayed paddy harvest limits season length.",
    dataDate: "Rabi 2025-26 KVK Ghantasala",
    assumptions: ["Residual moisture relay sowing with 1 supplemental foliar DAP spray (2%) at flowering"]
  },

  // 5. Cowpea (Lobia)
  {
    id: "CRP-PUL-GC3",
    cropName: "Cowpea / Lobia (GC 3 / Alsande)",
    cropNameTelugu: "బొబ్బర్లు / అలసందలు (GC 3)",
    category: "PULSE",
    recommendedVarieties: ["GC 3", "C 152", "VBN 1"],
    season: "KHARIF",
    durationDays: 70,
    waterRequirementMm: 280,
    preferredSoil: ["Red Loam", "Sandy Loam", "Well-drained Clay Loam"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 5.5, max: 8.0, average: 6.5, unit: "Quintals / Acre" },
    suitabilityScore: 84,
    soilCompatibilityScore: 82,
    waterCompatibilityScore: 88,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Extremely drought tolerant and thrives on marginal low-fertility soils",
      "Dual purpose: green tender pods can be sold as vegetable, remainder as dry pulse",
      "Lowest chemical input requirement of all pulses"
    ],
    keyRisks: [
      "Aphid infestation on tender terminal shoots",
      "Unfavorable in waterlogged lowlands (sensitive to soggy roots)"
    ],
    sourceReference: "ICAR-Indian Institute of Pulses Research & ANGRAU",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 23.5,
      dietaryFiberGPer100g: 10.6,
      energyKcalPer100g: 336,
      ironMgPer100g: 8.3,
      zincMgPer100g: 3.4,
      vitaminRichness: "High Iron, Potassium, Folate, Zinc",
      nutritionalScore: 89,
      nutritionalHighlightsEn: ["Very High Iron (8.3mg)", "Nutrient-dense legume", "High dietary zinc"],
      nutritionalHighlightsTe: ["రక్తహీనతను తగ్గించే అత్యధిక ఐరన్", "రోగనిరోధక శక్తికి జింక్"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 8500,
      expectedYieldAverage: 6.5,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 6800,
      grossRevenuePerAcre: 44200,
      estimatedNetProfitPerAcre: 35700,
      daysToFirstReturn: 70,
      localPriceHistory: { min: 6200, max: 7200, modal: 6800, marketName: "Gudlavalleru AMIC", trend: "STABLE" },
      buyerDemand: "STEADY_PROCUREMENT",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA: Recommended for upland and non-command soils of Krishna; valuable green manure biomass if ploughed under after pod picking.",
    dataDate: "2025-26 ANGRAU Extension",
    assumptions: ["Grown as rainfed or light single irrigation crop"]
  },

  // 6. Red Gram (Toor / Pigeon Pea)
  {
    id: "CRP-PUL-LRG41",
    cropName: "Red Gram / Pigeon Pea (LRG 41 / Asha)",
    cropNameTelugu: "కంది — అర్హర్ (LRG 41 / ఆశ)",
    category: "PULSE",
    recommendedVarieties: ["LRG 41", "ICPL 87119 (Asha)", "WRG 65"],
    season: "KHARIF",
    durationDays: 165,
    waterRequirementMm: 400,
    preferredSoil: ["Well-drained Red Loam", "Medium Black Soils", "Deep Loams"],
    toleratedDrainage: ["WELL_DRAINED"], // CRITICAL REJECTION: Cannot tolerate poor drainage!
    yieldBenchmarkPerAcre: { min: 6.5, max: 10.5, average: 8.5, unit: "Quintals / Acre" },
    suitabilityScore: 72,
    soilCompatibilityScore: 68,
    waterCompatibilityScore: 78,
    climateResilience: "MODERATE",
    labourIntensity: "MODERATE",
    keyAdvantages: [
      "Deep taproot system opens subsoil and recycles deep nutrients",
      "Premium MSP and sustained high market price in Dal processing mills",
      "Dry stalks provide excellent domestic fuel"
    ],
    keyRisks: [
      "CRITICAL: Highly sensitive to water stagnation — causes Phytophthora stem blight and wilt",
      "Helicoverpa pod borer requires systematic surveillance during flowering"
    ],
    sourceReference: "ICAR-CRIDA Krishna District Contingency Plan & ANGRAU Lam",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 22.3,
      dietaryFiberGPer100g: 15.0,
      energyKcalPer100g: 343,
      ironMgPer100g: 5.2,
      zincMgPer100g: 2.8,
      vitaminRichness: "B-Complex, Choline, Magnesium",
      nutritionalScore: 86,
      nutritionalHighlightsEn: ["Traditional daily protein source", "Balanced amino acid profile", "High dietary fiber"],
      nutritionalHighlightsTe: ["నిత్య జీవితంలో ప్రాథమిక పప్పు ప్రొటీన్", "సమతుల్య పోషకాలు"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 14000,
      expectedYieldAverage: 8.5,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 7550, // MSP
      grossRevenuePerAcre: 64175,
      estimatedNetProfitPerAcre: 50175,
      daysToFirstReturn: 165,
      localPriceHistory: { min: 7200, max: 8000, modal: 7550, marketName: "Vijayawada Commercial Mandi", trend: "RISING" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "CRIDA REJECTION WARNING: In heavy delta vertisols with slow drainage, red gram suffers severe mortality due to root suffocation during August-September rains. Recommended ONLY on ridges or elevated well-drained uplands.",
    dataDate: "Kharif 2025-26 ANGRAU Lam",
    assumptions: ["Requires well-drained land with zero water stagnation for >12 hours"]
  },

  // 7. Maize (DHM 117)
  {
    id: "CRP-MAI-DHM117",
    cropName: "Hybrid Maize (DHM 117)",
    cropNameTelugu: "మొక్కజొన్న — హైబ్రిడ్ (DHM 117)",
    category: "MILLET",
    recommendedVarieties: ["DHM 117", "Pioneer 3396", "Dekalb 9108"],
    season: "RABI",
    durationDays: 110,
    waterRequirementMm: 500,
    preferredSoil: ["Clay Loam", "Deep Black Cotton", "Delta Alluvial"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED", "POORLY_DRAINED_CLAY"],
    yieldBenchmarkPerAcre: { min: 28, max: 40, average: 34, unit: "Quintals / Acre" },
    suitabilityScore: 92,
    soilCompatibilityScore: 94,
    waterCompatibilityScore: 90,
    climateResilience: "MODERATE",
    labourIntensity: "MODERATE",
    keyAdvantages: [
      "Outstanding grain yield potential (up to 40 qtls/ac) under delta fertility",
      "Immediate local off-take by poultry and cattle feed plants in Gudlavalleru & Dokiparru",
      "Fully mechanized harvesting with combine harvesters reduces labor dependency"
    ],
    keyRisks: [
      "Fall Armyworm (Spodoptera frugiperda) incidence requires early whorl pheromone trapping",
      "Sensitive to water stagnation at germination and 6-leaf stage"
    ],
    sourceReference: "ICAR-Indian Institute of Maize Research & ANGRAU",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 9.4,
      dietaryFiberGPer100g: 7.3,
      energyKcalPer100g: 365,
      ironMgPer100g: 2.7,
      zincMgPer100g: 2.2,
      vitaminRichness: "High Carotenoids (Lutein & Zeaxanthin), Vitamin A precursors",
      nutritionalScore: 66,
      nutritionalHighlightsEn: ["High energy density", "Rich in carotenoids for eye health", "Essential animal feed energy"],
      nutritionalHighlightsTe: ["కంటి చూపునకు మంచిది", "అత్యధిక శక్తినిచ్చే ధాన్యం"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 22000,
      expectedYieldAverage: 34,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 2225, // MSP
      grossRevenuePerAcre: 75650,
      estimatedNetProfitPerAcre: 53650,
      daysToFirstReturn: 110,
      localPriceHistory: { min: 2100, max: 2350, modal: 2225, marketName: "Gudlavalleru AMIC", trend: "STABLE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA: Recommended for post-monsoon rabi in Krishna Delta. Follow ridge-and-furrow method to prevent seedling drowning during unseasonal showers.",
    dataDate: "Rabi 2025-26 KVK Ghantasala",
    assumptions: ["Assumes 3-4 light irrigations from borewell/canal tail-end"]
  },

  // 8. Sorghum (Jowar)
  {
    id: "CRP-MIL-CSH16",
    cropName: "Sorghum / Jowar (CSH 16)",
    cropNameTelugu: "జొన్న — జొన్నలు (CSH 16 - పోషక చిరుధాన్యం)",
    category: "MILLET",
    recommendedVarieties: ["CSH 16", "CSV 27", "Palem"],
    season: "KHARIF",
    durationDays: 100,
    waterRequirementMm: 350,
    preferredSoil: ["Medium Black Cotton", "Clay Loam", "Vertisols"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 12, max: 19, average: 16, unit: "Quintals / Acre" },
    suitabilityScore: 86,
    soilCompatibilityScore: 88,
    waterCompatibilityScore: 92,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Thrives under low rainfall or when canal water supply is delayed",
      "Dual purpose: high grain value + nutritious sweet green fodder for dairy cattle",
      "Gluten-free nutri-cereal with surging urban demand in Vijayawada"
    ],
    keyRisks: [
      "Grain mold if rains occur during physiological maturity and grain hardening",
      "Shoot fly attack if sowing is delayed beyond optimal window"
    ],
    sourceReference: "ICAR-Indian Institute of Millets Research (IIMR), Hyderabad",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 10.4,
      dietaryFiberGPer100g: 10.2,
      energyKcalPer100g: 349,
      ironMgPer100g: 4.1,
      zincMgPer100g: 2.6,
      calciumMgPer100g: 25,
      vitaminRichness: "B-Complex, Niacin, Riboflavin, Polyphenols",
      nutritionalScore: 82,
      nutritionalHighlightsEn: ["Gluten-free staple", "Low Glycemic Index", "Rich in antioxidant polyphenols"],
      nutritionalHighlightsTe: ["మధుమేహ రోగులకు అనుకూలమైన లో-గ్లైసెమిక్ ధాన్యం", "గ్లూటెన్ రహితం"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 11000,
      expectedYieldAverage: 16,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 3180, // MSP
      grossRevenuePerAcre: 50880,
      estimatedNetProfitPerAcre: 39880,
      daysToFirstReturn: 100,
      localPriceHistory: { min: 2900, max: 3300, modal: 3180, marketName: "Vijayawada Rythu Bazar & Mandi", trend: "RISING" },
      buyerDemand: "STEADY_PROCUREMENT",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA Contingency: When monsoon is delayed by >3 weeks in Krishna district, replace paddy nursery with short-duration hybrid sorghum CSH-16 or CSV-27.",
    dataDate: "2025-26 IIMR / ANGRAU",
    assumptions: ["Grown on medium-to-deep black soils with basic nitrogen top-dressing"]
  },

  // 9. Finger Millet (Ragi)
  {
    id: "CRP-MIL-RAGI",
    cropName: "Finger Millet / Ragi (Vakula / GPU 28)",
    cropNameTelugu: "రాగులు — తైదలు (వకుళ / GPU 28 - కాల్షియం ఖజానా)",
    category: "MILLET",
    recommendedVarieties: ["Vakula", "GPU 28", "PR 202"],
    season: "KHARIF",
    durationDays: 95,
    waterRequirementMm: 300,
    preferredSoil: ["Red Loam", "Sandy Loam", "Well-drained Clay Loam"],
    toleratedDrainage: ["WELL_DRAINED"],
    yieldBenchmarkPerAcre: { min: 9, max: 14, average: 12, unit: "Quintals / Acre" },
    suitabilityScore: 82,
    soilCompatibilityScore: 80,
    waterCompatibilityScore: 92,
    climateResilience: "HIGH",
    labourIntensity: "MODERATE",
    keyAdvantages: [
      "Supreme calcium concentration (344 mg/100g) — over 30 times higher than polished rice",
      "Exceptional drought resilience; practically zero synthetic pesticide required",
      "High MSP backing under National Millet Mission with rising urban health store prices"
    ],
    keyRisks: [
      "Blast disease in dense nurseries during damp cloudy spells",
      "Bird depredation during dough stage requires field scaring"
    ],
    sourceReference: "ANGRAU Regional Agricultural Research Station, Tirupati & IIMR",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 7.3,
      dietaryFiberGPer100g: 11.5,
      energyKcalPer100g: 328,
      ironMgPer100g: 3.9,
      zincMgPer100g: 2.3,
      calciumMgPer100g: 344, // HIGHEST CALCIUM
      vitaminRichness: "Extreme Calcium, Tryptophan, Essential amino acids",
      nutritionalScore: 95,
      nutritionalHighlightsEn: ["Highest Calcium (344mg/100g)", "Essential for bone density & child growth", "Low GI for diabetes"],
      nutritionalHighlightsTe: ["వరి కంటే 30 రెట్లు అధిక కాల్షియం", "ఎముకల పటిష్టతకు, గర్భిణులకు సంపూర్ణ పోషణ"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 9500,
      expectedYieldAverage: 12,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 4290, // Govt MSP
      grossRevenuePerAcre: 51480,
      estimatedNetProfitPerAcre: 41980,
      daysToFirstReturn: 95,
      localPriceHistory: { min: 4000, max: 4600, modal: 4290, marketName: "Vijayawada Health Grain Hub", trend: "RISING" },
      buyerDemand: "STEADY_PROCUREMENT",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA: Recommended for light and upland soils of Krishna district as an alternative to water-intensive paddy.",
    dataDate: "2025-26 National Millet Mission",
    assumptions: ["Direct drilled or transplanted on ridges; requires well-drained topsoil"]
  },

  // 10. Pearl Millet (Bajra)
  {
    id: "CRP-MIL-BAJRA",
    cropName: "Pearl Millet / Bajra (ABH 1)",
    cropNameTelugu: "సజ్జలు — బాజ్రా (ABH 1 - ఐరన్ & శక్తి నిధి)",
    category: "MILLET",
    recommendedVarieties: ["ABH 1", "GHB 558", "Pusa 383"],
    season: "KHARIF",
    durationDays: 85,
    waterRequirementMm: 250,
    preferredSoil: ["Sandy Loam", "Red Loam", "Coastal Sandy Alluvial"],
    toleratedDrainage: ["WELL_DRAINED"],
    yieldBenchmarkPerAcre: { min: 11, max: 17, average: 14, unit: "Quintals / Acre" },
    suitabilityScore: 80,
    soilCompatibilityScore: 78,
    waterCompatibilityScore: 94,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Highest iron concentration (8.0 mg/100g) among all major cereals — prime crop for combatting rural anemia",
      "Tolerates extreme heat (>42°C) and water stress",
      "Short duration (85 days) and lowest water demand among kharif cereals"
    ],
    keyRisks: [
      "Downy mildew and ergot disease if rainfall coincides with flowering",
      "Grain storage pest susceptibility (requires proper drying <12% moisture)"
    ],
    sourceReference: "ICAR-IIMR & ANGRAU",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 11.6,
      dietaryFiberGPer100g: 11.5,
      energyKcalPer100g: 361,
      ironMgPer100g: 8.0, // HIGHEST IRON
      zincMgPer100g: 3.1,
      calciumMgPer100g: 42,
      vitaminRichness: "High Iron, Zinc, Phosphorus, Magnesium",
      nutritionalScore: 93,
      nutritionalHighlightsEn: ["Highest Iron (8.0mg/100g)", "11.6% Protein", "Antioxidant rich"],
      nutritionalHighlightsTe: ["రక్తహీనతను అరికట్టే అత్యధిక ఐరన్ కంటెంట్", "11.6% అధిక ప్రొటీన్"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 8000,
      expectedYieldAverage: 14,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 2625, // MSP
      grossRevenuePerAcre: 36750,
      estimatedNetProfitPerAcre: 28750,
      daysToFirstReturn: 85,
      localPriceHistory: { min: 2450, max: 2750, modal: 2625, marketName: "Machilipatnam AMC", trend: "STABLE" },
      buyerDemand: "STEADY_PROCUREMENT",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA Contingency: When severe mid-season drought occurs in light soils, bajra serves as an emergency hardy grain crop.",
    dataDate: "2025-26 National Food Security Mission",
    assumptions: ["Sown in ridges and furrows; rainfed or single protective irrigation"]
  },

  // 11. Groundnut (Peanut)
  {
    id: "CRP-OIL-K6",
    cropName: "Groundnut / Peanut (Kadiri 6 / Dharani)",
    cropNameTelugu: "వేరుశనగ — పల్లీలు (కదిరి 6 / ధరణి)",
    category: "OILSEED",
    recommendedVarieties: ["Kadiri 6", "Dharani", "TAG 24"],
    season: "RABI",
    durationDays: 105,
    waterRequirementMm: 400,
    preferredSoil: ["Sandy Loam", "Coastal Alluvium", "Red Loam"],
    toleratedDrainage: ["WELL_DRAINED"], // CRITICAL REJECTION: Fails in heavy clay
    yieldBenchmarkPerAcre: { min: 9, max: 15, average: 12, unit: "Quintals / Acre" },
    suitabilityScore: 74,
    soilCompatibilityScore: 65, // Heavily penalized on heavy clay
    waterCompatibilityScore: 82,
    climateResilience: "MODERATE",
    labourIntensity: "HIGH",
    keyAdvantages: [
      "High market price for pod oil recovery and domestic consumption",
      "High protein haulm fodder for crossbred dairy cattle",
      "Dharani variety possesses high shelling turnout (>72%)"
    ],
    keyRisks: [
      "CRITICAL: Pegging and pod expansion fail in heavy black clay soils due to soil compaction and waterlogging",
      "Tikka leaf spot and collar rot require systematic fungicide seed dressing"
    ],
    sourceReference: "ANGRAU Agricultural Research Station, Kadiri",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 25.8,
      dietaryFiberGPer100g: 8.5,
      energyKcalPer100g: 567,
      ironMgPer100g: 4.6,
      zincMgPer100g: 3.3,
      calciumMgPer100g: 92,
      vitaminRichness: "High Healthy Monounsaturated Fats (49g), Vitamin E, Niacin, Resveratrol",
      nutritionalScore: 90,
      nutritionalHighlightsEn: ["25.8% Plant Protein", "Healthy Heart Fats (MUFA)", "Rich in Vitamin E & Resveratrol"],
      nutritionalHighlightsTe: ["25.8% అత్యధిక ప్రొటీన్", "గుండెకు మేలు చేసే ఆరోగ్యకర కొవ్వులు"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 21000,
      expectedYieldAverage: 12,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 6780, // MSP
      grossRevenuePerAcre: 81360,
      estimatedNetProfitPerAcre: 60360,
      daysToFirstReturn: 105,
      localPriceHistory: { min: 6400, max: 7200, modal: 6780, marketName: "Vijayawada Commercial Mandi", trend: "RISING" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "CRIDA REJECTION WARNING: In heavy clay delta soils of Gudlavalleru, groundnut is NOT recommended. Clay soil swelling and shrinkage damages pods and makes digging impossible. Recommend only in coastal sandy loams.",
    dataDate: "Rabi 2025-26 ANGRAU Oilseeds Bulletin",
    assumptions: ["Recommended ONLY for sandy loam and coastal alluvial parcels; strictly avoid heavy black clay"]
  },

  // 12. Sesame (Til)
  {
    id: "CRP-OIL-SESAME",
    cropName: "Sesame / Til (YLM 66 / Swetha Til)",
    cropNameTelugu: "నువ్వులు — తిలలు (YLM 66 - అత్యల్ప నీటి పంట)",
    category: "OILSEED",
    recommendedVarieties: ["YLM 66", "Swetha Til", "Gowri"],
    season: "SUMMER",
    durationDays: 80,
    waterRequirementMm: 180, // LOWEST WATER AMONG OILSEEDS
    preferredSoil: ["Clay Loam", "Sandy Loam", "Paddy Fallow Loams"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED", "POORLY_DRAINED_CLAY"],
    yieldBenchmarkPerAcre: { min: 3.5, max: 5.5, average: 4.5, unit: "Quintals / Acre" },
    suitabilityScore: 90,
    soilCompatibilityScore: 90,
    waterCompatibilityScore: 96,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Lowest water requirement among all oilseeds (180 mm) — thrives on terminal residual moisture",
      "Extremely low initial investment (₹7,200/ac) with minimal fertilizer requirement",
      "High market price (₹9,200/qtl) with strong domestic and export oil mill demand"
    ],
    keyRisks: [
      "Phyllody disease transmitted by leafhoppers (mycoplasma)",
      "High seed loss during manual threshing if crop is over-dried in fields"
    ],
    sourceReference: "ANGRAU Agricultural Research Station, Yellamanchili",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 18.3,
      dietaryFiberGPer100g: 11.8,
      energyKcalPer100g: 573,
      ironMgPer100g: 14.6, // SUPER HIGH IRON
      zincMgPer100g: 7.8, // SUPER HIGH ZINC
      calciumMgPer100g: 1450, // HIGHEST CALCIUM IN PLANT KINGDOM
      vitaminRichness: "Exceptional Calcium & Iron, Sesamin lignans, Vitamin E",
      nutritionalScore: 98,
      nutritionalHighlightsEn: ["1450mg Calcium (Highest in plants)", "14.6mg Iron", "Powerful Sesamin antioxidants"],
      nutritionalHighlightsTe: ["మొక్కలన్నింటిలోకీ అత్యధిక కాల్షియం (1450mg)", "రక్తవృద్ధికి అత్యధిక ఐరన్"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 7200,
      expectedYieldAverage: 4.5,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 9200,
      grossRevenuePerAcre: 41400,
      estimatedNetProfitPerAcre: 34200,
      daysToFirstReturn: 80,
      localPriceHistory: { min: 8600, max: 9800, modal: 9200, marketName: "Machilipatnam AMC", trend: "RISING" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA Contingency: Sowing summer sesame in February-March in rice fallows gives high water efficiency with zero canal stress.",
    dataDate: "2025-26 ANGRAU Oilseeds",
    assumptions: ["Sown in late January/February after paddy or relay pulse harvest"]
  },

  // 13. Sunflower
  {
    id: "CRP-OIL-SUNFLOWER",
    cropName: "Sunflower (NDSH 1 / DRSH 1)",
    cropNameTelugu: "పొద్దుతిరుగుడు — సన్‌ఫ్లవర్ (NDSH 1)",
    category: "OILSEED",
    recommendedVarieties: ["NDSH 1", "DRSH 1", "KBSH 53"],
    season: "RABI",
    durationDays: 90,
    waterRequirementMm: 350,
    preferredSoil: ["Deep Black Cotton", "Clay Loam", "Vertisols"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 7.5, max: 11, average: 9, unit: "Quintals / Acre" },
    suitabilityScore: 88,
    soilCompatibilityScore: 92,
    waterCompatibilityScore: 88,
    climateResilience: "HIGH",
    labourIntensity: "MODERATE",
    keyAdvantages: [
      "Deep taproot extracts residual moisture and nutrients from deep delta vertisols",
      "Wide sowing window from October to January in Krishna District",
      "Short duration (90 days) with premium price for edible oil extraction"
    ],
    keyRisks: [
      "Parrot and bird depredation during head filling requires protective netting or alarms",
      "Necrosis virus disease spread by thrips"
    ],
    sourceReference: "ICAR-Indian Institute of Oilseeds Research (IIOR), Hyderabad",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 20.8,
      dietaryFiberGPer100g: 8.6,
      energyKcalPer100g: 584,
      ironMgPer100g: 5.3,
      zincMgPer100g: 5.0,
      vitaminRichness: "Very High Vitamin E (Alpha-tocopherol), Selenium, Linoleic Acid",
      nutritionalScore: 88,
      nutritionalHighlightsEn: ["Exceptional Vitamin E antioxidant", "High in heart-healthy Linoleic Acid", "Rich in Selenium"],
      nutritionalHighlightsTe: ["గుండె ఆరోగ్యానికి విటమిన్-ఇ", "రోగనిరోధక శక్తికి సెలీనియం"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 13500,
      expectedYieldAverage: 9,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 7280, // MSP
      grossRevenuePerAcre: 65520,
      estimatedNetProfitPerAcre: 52020,
      daysToFirstReturn: 90,
      localPriceHistory: { min: 6800, max: 7600, modal: 7280, marketName: "Vijayawada Oilseed Market", trend: "STABLE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA: Recommended for black soils where moisture is inadequate for rabi paddy or maize; deep root system withstands mid-season dry spells.",
    dataDate: "Rabi 2025-26 IIOR Hyderabad",
    assumptions: ["Requires 2 supplemental irrigations at buttoning and seed-setting stages"]
  },

  // 14. Moringa (Drumstick) - Perennial Tree Vegetable
  {
    id: "CRP-FRU-MORINGA",
    cropName: "Moringa / Drumstick (PKM 1 / Bhagya)",
    cropNameTelugu: "మునగ — న్యూట్రీ సూపర్ ఫుడ్ (PKM 1 / భాగ్య)",
    category: "FRUIT_PERENNIAL",
    recommendedVarieties: ["PKM 1", "PKM 2", "Bhagya (KDM 01)"],
    season: "YEAR_ROUND",
    durationDays: 365,
    waterRequirementMm: 450,
    preferredSoil: ["Sandy Loam", "Clay Loam", "Well-drained Black Soil"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 90, max: 140, average: 110, unit: "Quintals Pods / Acre" },
    suitabilityScore: 92,
    soilCompatibilityScore: 88,
    waterCompatibilityScore: 92,
    climateResilience: "HIGH",
    labourIntensity: "MODERATE",
    keyAdvantages: [
      "First commercial harvest starts within 8–9 months from seed sowing",
      "High market demand in local Gudlavalleru, Machilipatnam and Vijayawada markets",
      "Export demand for dehydrated drumstick leaf powder and tender green pods"
    ],
    keyRisks: [
      "Hairy caterpillar and pod fly attacks require organic neem sprays",
      "Prone to root rot if water stagnates around tree base for >24 hours"
    ],
    sourceReference: "Dr. YSR Horticultural University (YSRHU), Venkataramannagudem, AP",
    sourceTag: "OFFICIAL_BENCHMARK",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 35000,
      gestationYears: 0.75, // First harvest in 8-9 months
      annualMaintenanceCostPerAcre: 18000,
      paybackPeriodYears: 1.5,
      commercialLifespanYears: 5,
      annualizedGrossRevenuePerAcre: 110000, // 110 qtls * ₹1000/qtl
      annualizedCostPerAcre: 21400, // (35k/5) + 18k
      annualizedNetProfitPerAcre: 88600,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: 25000, notes: "Establishment (₹35k) offset by partial harvest in months 9-12 (₹60k gross)" },
        { year: 2, cashFlowInr: 92000, notes: "Full commercial bearing (110 qtls @ ₹1000/qtl less ₹18k maintenance)" },
        { year: 3, cashFlowInr: 92000, notes: "Peak commercial harvest with regular ratooning and pruning" },
        { year: 4, cashFlowInr: 85000, notes: "Steady harvest; second ratooning" },
        { year: 5, cashFlowInr: 75000, notes: "Replanting or fresh seed gap filling recommended" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 9.4,
      dietaryFiberGPer100g: 8.2,
      energyKcalPer100g: 64,
      ironMgPer100g: 4.0,
      zincMgPer100g: 1.6,
      calciumMgPer100g: 185,
      vitaminRichness: "Extreme Vitamin A (Beta-carotene), Vitamin C (140mg), 9 Essential Amino Acids",
      nutritionalScore: 99, // TOP NUTRITIONAL SCORE
      nutritionalHighlightsEn: ["Global Nutritional Superfood", "Rich in Vitamin A & C", "High Bioavailable Calcium (185mg)", "Antimicrobial & Anti-inflammatory"],
      nutritionalHighlightsTe: ["ప్రపంచ గుర్తింపు పొందిన సూపర్ ఫుడ్", "కంటి చూపునకు విటమిన్-ఎ", "రోగనిరోధక శక్తికి విటమిన్-సి"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 35000,
      expectedYieldAverage: 110,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 1000,
      grossRevenuePerAcre: 110000,
      estimatedNetProfitPerAcre: 88600, // Annualized net profit
      daysToFirstReturn: 260, // 8.5 months
      localPriceHistory: { min: 700, max: 1500, modal: 1000, marketName: "Vijayawada Rythu Bazar", trend: "RISING" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "HIGH_PERISHABLE",
      transportSensitivity: "MEDIUM",
      priceVolatility: "HIGH_SEASONAL_FLUCTUATION"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA: Recommended perennial vegetable for rainfed/semi-irrigated farms. Prune stems at 1 meter height after every season to promote bushy vegetative flushes.",
    dataDate: "2025-26 Dr. YSRHU",
    assumptions: ["Drip irrigation with 2.5m x 2.5m spacing (640 trees/ac)", "Annualized profit accounts for Year 1 establishment amortized over 5 years"]
  },

  // 15. Guava - High Density Perennial Fruit
  {
    id: "CRP-FRU-GUAVA",
    cropName: "Guava (Taiwan White / L-49)",
    cropNameTelugu: "జామ — హై డెన్సిటీ తోట (తైవాన్ వైట్ / లక్నో 49)",
    category: "FRUIT_PERENNIAL",
    recommendedVarieties: ["Taiwan White", "Allahabad Safeda", "Lucknow 49"],
    season: "YEAR_ROUND",
    durationDays: 365,
    waterRequirementMm: 650,
    preferredSoil: ["Clay Loam", "Alluvial Loam", "Well-drained Black Soil"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 80, max: 140, average: 110, unit: "Quintals / Acre" },
    suitabilityScore: 90,
    soilCompatibilityScore: 90,
    waterCompatibilityScore: 90,
    climateResilience: "HIGH",
    labourIntensity: "MODERATE",
    keyAdvantages: [
      "High Density Planting (HDP) yields early commercial crop in year 2",
      "Staggered harvesting provides continuous cash flow across 8 months",
      "Tremendous local consumption and wholesale trade in Krishna district"
    ],
    keyRisks: [
      "Fruit fly (Bactrocera correcta) infestation during rainy season requires methyl eugenol traps",
      "Wilt disease in waterlogged soils with alkaline pH"
    ],
    sourceReference: "Dr. YSR Horticultural University & ICAR-CISH",
    sourceTag: "OFFICIAL_BENCHMARK",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 55000,
      gestationYears: 2.0,
      annualMaintenanceCostPerAcre: 24000,
      paybackPeriodYears: 3.5,
      commercialLifespanYears: 15,
      annualizedGrossRevenuePerAcre: 154000, // 110 qtls * ₹1400/qtl
      annualizedCostPerAcre: 27660, // (55k/15) + 24k
      annualizedNetProfitPerAcre: 126340,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: -55000, notes: "Year 1 capital outlay: graft saplings, pit digging, drip installation, staking" },
        { year: 2, cashFlowInr: 15000, notes: "First light harvest (35 qtls @ ₹1200) covers maintenance" },
        { year: 3, cashFlowInr: 96000, notes: "Commercial harvest scaling up to 85 qtls" },
        { year: 4, cashFlowInr: 130000, notes: "Full bearing: 110 qtls @ ₹1400/qtl" },
        { year: 5, cashFlowInr: 135000, notes: "Sustained peak production with pruning for Mrig bahar" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 2.6,
      dietaryFiberGPer100g: 5.4,
      energyKcalPer100g: 68,
      ironMgPer100g: 0.8,
      zincMgPer100g: 0.3,
      calciumMgPer100g: 20,
      vitaminRichness: "Extreme Vitamin C (212mg — 4x of Orange!), Lycopene, Folate",
      nutritionalScore: 94,
      nutritionalHighlightsEn: ["212mg Vitamin C per 100g", "High Soluble Pectin Fiber", "Lycopene Antioxidant", "Low Glycemic Index"],
      nutritionalHighlightsTe: ["నారింజ కంటే 4 రెట్లు అధిక విటమిన్-సి", "మధుమేహం ఉన్నవారికి మేలైన లో-జిఐ పండు"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 55000,
      expectedYieldAverage: 110,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 1400,
      grossRevenuePerAcre: 154000,
      estimatedNetProfitPerAcre: 126340,
      daysToFirstReturn: 600, // 20 months
      localPriceHistory: { min: 1100, max: 1800, modal: 1400, marketName: "Vijayawada Fruit Market", trend: "RISING" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "HIGH_PERISHABLE",
      transportSensitivity: "HIGH",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "Dr. YSRHU Recommendation: High density guava (3m x 2m spacing) on well-drained soils; prune annually in May for winter flush (Mrig bahar) avoiding rainy season fruit fly damage.",
    dataDate: "2025-26 Dr. YSRHU Horticultural Bulletin",
    assumptions: ["Equipped with drip fertigation; establishment cost amortized over 15-year commercial lifespan"]
  },

  // 16. Dragon Fruit (Pitahaya) - Exotic High-Value Perennial
  {
    id: "CRP-FRU-DRAGON",
    cropName: "Dragon Fruit / Pitahaya (Red Flesh)",
    cropNameTelugu: "డ్రాగన్ ఫ్రూట్ — కమలం పండు (ఎరుపు రకం - అధిక లాభదాయకం)",
    category: "FRUIT_PERENNIAL",
    recommendedVarieties: ["Red Flesh (Hylocereus polyrhizus)", "White Flesh"],
    season: "YEAR_ROUND",
    durationDays: 365,
    waterRequirementMm: 450,
    preferredSoil: ["Sandy Loam", "Gravelly Loam", "Well-drained Coastal Alluvium"],
    toleratedDrainage: ["WELL_DRAINED"], // CRITICAL REJECTION: Fails completely in waterlogged clay
    yieldBenchmarkPerAcre: { min: 25, max: 45, average: 35, unit: "Quintals / Acre" },
    suitabilityScore: 68,
    soilCompatibilityScore: 60, // Severely penalized if drainage is poor
    waterCompatibilityScore: 92,
    climateResilience: "HIGH",
    labourIntensity: "MODERATE",
    keyAdvantages: [
      "Highest gross margin and price realization (₹100–140/kg wholesale in Vijayawada)",
      "Cactus family plant with outstanding drought and heat resilience",
      "Low water consumption once established on drip irrigation"
    ],
    keyRisks: [
      "CRITICAL: Highly sensitive to root rot and collar rot in heavy waterlogged black clay",
      "High initial capital outlay (₹2,10,000/ac for concrete poles, RCC rings, and drip)",
      "Sunburn damage during peak coastal May heat requires partial shade net"
    ],
    sourceReference: "ICAR-Central Institute for Arid Horticulture & Dr. YSRHU",
    sourceTag: "OFFICIAL_BENCHMARK",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 210000, // High initial capital
      gestationYears: 1.5,
      annualMaintenanceCostPerAcre: 32000,
      paybackPeriodYears: 3.5,
      commercialLifespanYears: 18,
      annualizedGrossRevenuePerAcre: 420000, // 35 qtls * ₹12,000/qtl (₹120/kg)
      annualizedCostPerAcre: 43660, // (210k/18) + 32k
      annualizedNetProfitPerAcre: 376340,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: -210000, notes: "Year 1 capital: 500 RCC poles, rings, drip lines, 2000 cutting saplings" },
        { year: 2, cashFlowInr: 60000, notes: "First harvest (10 qtls @ ₹12,000 = ₹1.2L gross less ₹32k maint)" },
        { year: 3, cashFlowInr: 220000, notes: "Commercial bearing (22 qtls @ ₹12,000)" },
        { year: 4, cashFlowInr: 380000, notes: "Full bearing capacity (35 qtls)" },
        { year: 5, cashFlowInr: 390000, notes: "Peak commercial harvest continuing for 15+ years" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 1.2,
      dietaryFiberGPer100g: 3.0,
      energyKcalPer100g: 60,
      ironMgPer100g: 1.9,
      zincMgPer100g: 0.4,
      vitaminRichness: "High Betalains (Natural red pigments), Prebiotic Oligosaccharides, Vitamin C",
      nutritionalScore: 89,
      nutritionalHighlightsEn: ["Powerful Betalain Antioxidants", "Prebiotics for gut microbiome", "Helps reduce LDL cholesterol"],
      nutritionalHighlightsTe: ["యాంటీఆక్సిడెంట్ గుణాలు", "జీర్ణవ్యవస్థకు మేలు చేసే ప్రీబయోటిక్ ఫైబర్"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 210000,
      expectedYieldAverage: 35,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 12000, // ₹120/kg
      grossRevenuePerAcre: 420000,
      estimatedNetProfitPerAcre: 376340,
      daysToFirstReturn: 540, // 18 months
      localPriceHistory: { min: 9000, max: 14000, modal: 12000, marketName: "Vijayawada Premium Fruit Terminal", trend: "RISING" },
      buyerDemand: "NICHE_DIRECT",
      perishability: "MODERATE_SHELF",
      transportSensitivity: "MEDIUM",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "ICAR-NIASM & CRIDA REJECTION WARNING: Dragon fruit requires excellent drainage. In heavy Krishna delta clay soils without 45cm raised mounds mixed with gravel/sand and storm drains, vines suffer severe root/collar rot within 6 months. Recommended strictly for elevated, well-drained upland plots with partial shade protection.",
    dragonFruitDetails: {
      trellisAndPillarSpec: "450–500 RCC cement poles (2m tall, buried 45 cm) + RCC top rings/tyre frames @ 3.0m × 2.5m spacing",
      trellisCostPerAcreInr: 115000,
      plantingMaterialSpec: "1,800–2,000 disease-free rooted red-flesh stem cuttings (4 cuttings trained per pillar)",
      plantingMaterialCostPerAcreInr: 68000,
      heatAndSunburnSensitivity: "Moderate-High: Temps >38°C in coastal AP May cause stem sunscald yellowing; ICAR-NIASM advises 30% shade net or kaolin clay spray.",
      drainageAndRaisedBedProtocol: "Zero waterlogging tolerance. Build 35–45 cm raised beds mixed with coarse sand/gravel + perimeter drainage trenches.",
      organicAndNutrientProtocol: "10–15 kg well-rotted FYM + 50g Vermicompost/pillar annually; split NPK (50:50:100 g/pillar/yr) + foliar Calcium & Boron during flowering (ICAR-IIHR).",
      pestAndDiseaseRisks: "Stem canker & wet rot during >85% humidity cyclonic rains; fruit flies, mealybugs & ants managed via pheromone traps & copper oxychloride.",
      postHarvestShelfLife: "7–12 days ambient (25–28°C); 20–24 days at 7°C cold storage (85–90% RH).",
      transportAndPackagingNote: "Pack harvested fruit in 4–5 kg ventilated CFB boxes with foam liners to avoid spine bruising during haulage to Vijayawada/Hyderabad."
    },
    dataDate: "2025-26 ICAR-NIASM / ICAR-IIHR / Dr. YSRHU",
    assumptions: ["Farmer must have capital budget >= ₹2,10,000/ac (or MIDH horticulture subsidy) and elevated well-drained soil"]
  },

  // 17. Papaya (Taiwan Red Lady 786)
  {
    id: "CRP-FRU-PAPAYA",
    cropName: "Papaya (Taiwan Red Lady 786)",
    cropNameTelugu: "బొప్పాయి — తైవాన్ రెడ్ లేడీ 786 (వేగవంతమైన లాభం)",
    category: "FRUIT_PERENNIAL",
    recommendedVarieties: ["Red Lady 786", "Coorg Honey Dew"],
    season: "YEAR_ROUND",
    durationDays: 365,
    waterRequirementMm: 750,
    preferredSoil: ["Clay Loam", "Sandy Loam", "Alluvial Loam"],
    toleratedDrainage: ["WELL_DRAINED"], // CRITICAL REJECTION: Very sensitive to waterlogging
    yieldBenchmarkPerAcre: { min: 250, max: 400, average: 320, unit: "Quintals / Acre" },
    suitabilityScore: 84,
    soilCompatibilityScore: 80,
    waterCompatibilityScore: 85,
    climateResilience: "MODERATE",
    labourIntensity: "MODERATE",
    keyAdvantages: [
      "Earliest fruit harvest among all fruit crops (begins in 8–9 months)",
      "Massive yield volume (320 quintals/acre) with steady farmgate demand",
      "Payback achieved within 14 months"
    ],
    keyRisks: [
      "CRITICAL: Papaya Ringspot Virus (PRSV) transmitted by aphids can destroy orchards",
      "Extremely susceptible to foot rot / damping off in flooded delta soils"
    ],
    sourceReference: "ICAR-IIHR Hessaraghatta & Dr. YSRHU",
    sourceTag: "OFFICIAL_BENCHMARK",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 48000,
      gestationYears: 0.75, // 9 months
      annualMaintenanceCostPerAcre: 22000,
      paybackPeriodYears: 1.2,
      commercialLifespanYears: 2.5,
      annualizedGrossRevenuePerAcre: 224000, // 320 qtls * ₹700/qtl (₹7/kg)
      annualizedCostPerAcre: 41200, // (48k/2.5) + 22k
      annualizedNetProfitPerAcre: 182800,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: 80000, notes: "Year 1 capital (₹48k) recouped by month 10-12 harvests (₹1.5L gross)" },
        { year: 2, cashFlowInr: 200000, notes: "Peak commercial bearing across 12 months" },
        { year: 3, cashFlowInr: 60000, notes: "Final harvest until month 30, followed by crop removal to prevent virus" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 0.6,
      dietaryFiberGPer100g: 1.8,
      energyKcalPer100g: 43,
      ironMgPer100g: 0.25,
      zincMgPer100g: 0.1,
      calciumMgPer100g: 24,
      vitaminRichness: "High Papain enzyme, Beta-Carotene (Vitamin A), Vitamin C (62mg), Folate",
      nutritionalScore: 91,
      nutritionalHighlightsEn: ["High Papain digestive enzyme", "Rich in Provitamin A", "High Vitamin C", "Low calories"],
      nutritionalHighlightsTe: ["జీర్ణక్రియకు అత్యుత్తమమైన పపైన్ ఎంజైమ్", "కంటి ఆరోగ్యానికి విటమిన్-ఎ"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 48000,
      expectedYieldAverage: 320,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 700,
      grossRevenuePerAcre: 224000,
      estimatedNetProfitPerAcre: 182800,
      daysToFirstReturn: 270, // 9 months
      localPriceHistory: { min: 500, max: 1000, modal: 700, marketName: "Vijayawada Fruit Market", trend: "VOLATILE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "VERY_HIGH_DAILY",
      transportSensitivity: "HIGH",
      priceVolatility: "HIGH_SEASONAL_FLUCTUATION"
    },
    regionalContingencyPlanRef: "Dr. YSRHU: In Krishna district, plant Red Lady 786 on raised beds (15 cm elevated) with drip lines. Never plant in parcels with previous papaya ringspot history.",
    dataDate: "2025-26 Dr. YSRHU",
    assumptions: ["Requires strict aphid vector control; raised bed planting essential"]
  },

  // 18. Acid Lime (Lemon)
  {
    id: "CRP-FRU-ACIDLIME",
    cropName: "Acid Lime / Lemon (Balaji / Petlur Selection)",
    cropNameTelugu: "నిమ్మ — బాలాజీ / పెట్లూరు (విటమిన్-సి & నిలకడైన ఆదాయం)",
    category: "FRUIT_PERENNIAL",
    recommendedVarieties: ["Balaji", "Petlur Selection", "Kagzi Lime"],
    season: "YEAR_ROUND",
    durationDays: 365,
    waterRequirementMm: 600,
    preferredSoil: ["Sandy Loam", "Well-drained Alluvial Loam", "Red Loam"],
    toleratedDrainage: ["WELL_DRAINED"], // CRITICAL REJECTION: Fails in saline delta clay
    yieldBenchmarkPerAcre: { min: 70, max: 120, average: 95, unit: "Quintals / Acre" },
    suitabilityScore: 78,
    soilCompatibilityScore: 70,
    waterCompatibilityScore: 85,
    climateResilience: "MODERATE",
    labourIntensity: "MODERATE",
    keyAdvantages: [
      "Summer harvest fetches peak seasonal prices (up to ₹6,000/qtl in March-May)",
      "Balaji variety is canker tolerant and produces thin-skinned juicy fruit",
      "Long commercial economic life of 20+ years"
    ],
    keyRisks: [
      "CRITICAL: Highly sensitive to soil/water salinity (EC > 1.5 dS/m) and stagnant water",
      "Citrus canker and leaf miner require regular copper oxychloride and neem sprays"
    ],
    sourceReference: "AICRP on Citrus, Tirupati & Dr. YSRHU",
    sourceTag: "OFFICIAL_BENCHMARK",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 42000,
      gestationYears: 3.5,
      annualMaintenanceCostPerAcre: 20000,
      paybackPeriodYears: 4.5,
      commercialLifespanYears: 20,
      annualizedGrossRevenuePerAcre: 142500, // 95 qtls * ₹1500/qtl
      annualizedCostPerAcre: 22100, // (42k/20) + 20k
      annualizedNetProfitPerAcre: 120400,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: -42000, notes: "Year 1 establishment: budded plants, pits, drip lines" },
        { year: 2, cashFlowInr: -15000, notes: "Intercropping with pulses partially offsets maintenance" },
        { year: 3, cashFlowInr: 10000, notes: "First light commercial harvest" },
        { year: 4, cashFlowInr: 90000, notes: "Commercial harvest scaling to 65 qtls" },
        { year: 5, cashFlowInr: 130000, notes: "Full bearing: 95 qtls @ ₹1500/qtl avg" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 1.1,
      dietaryFiberGPer100g: 2.8,
      energyKcalPer100g: 29,
      ironMgPer100g: 0.6,
      zincMgPer100g: 0.1,
      calciumMgPer100g: 33,
      vitaminRichness: "High Citric Acid (5-7%), Vitamin C (53mg), Bioflavonoids",
      nutritionalScore: 88,
      nutritionalHighlightsEn: ["Natural Citric Acid preservative", "High Vitamin C immunity booster", "Alkalizing post-digestion"],
      nutritionalHighlightsTe: ["రోగనిరోధక శక్తిని పెంచే విటమిన్-సి", "శరీరంలో క్షార గుణాన్ని పెంచుతుంది"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 42000,
      expectedYieldAverage: 95,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 1500,
      grossRevenuePerAcre: 142500,
      estimatedNetProfitPerAcre: 120400,
      daysToFirstReturn: 1200, // 3.5 years
      localPriceHistory: { min: 1000, max: 5500, modal: 1500, marketName: "Vijayawada & Tenali Citrus Mandi", trend: "VOLATILE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "MODERATE_SHELF",
      transportSensitivity: "LOW",
      priceVolatility: "HIGH_SEASONAL_FLUCTUATION"
    },
    regionalContingencyPlanRef: "CRIDA REJECTION WARNING: In heavy clay vertisols and coastal saline pockets of Krishna, acid lime fails due to root rot and chlorosis. Recommended strictly for non-saline, well-drained loamy uplands.",
    dataDate: "2025-26 Dr. YSRHU",
    assumptions: ["Requires drip irrigation; soil EC must be < 1.0 dS/m"]
  },

  // 19. Mango
  {
    id: "CRP-FRU-MANGO",
    cropName: "Mango (Banganapalli / Suvarnarekha)",
    cropNameTelugu: "మామిడి — బంగినపల్లి (ఆంధ్రప్రదేశ్ జీఐ ట్యాగ్ రాజసం)",
    category: "FRUIT_PERENNIAL",
    recommendedVarieties: ["Banganapalli (Benishan)", "Suvarnarekha", "Totapuri"],
    season: "YEAR_ROUND",
    durationDays: 365,
    waterRequirementMm: 550,
    preferredSoil: ["Deep Red Loam", "Alluvial Loam", "Well-drained Clay Loam"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 35, max: 65, average: 50, unit: "Quintals / Acre" },
    suitabilityScore: 82,
    soilCompatibilityScore: 82,
    waterCompatibilityScore: 88,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Banganapalli holds geographical indication (GI Tag) with huge domestic and Gulf export markets",
      "Low annual maintenance once established; withstands summer droughts",
      "Generates substantial intercrop income from pulses during first 4 years"
    ],
    keyRisks: [
      "Alternate bearing (on-year / off-year yield fluctuations)",
      "Mango hopper and powdery mildew during flowering in Jan-Feb"
    ],
    sourceReference: "Fruit Research Station, Sangareddy & Dr. YSRHU Nuzvid Mango Center",
    sourceTag: "OFFICIAL_BENCHMARK",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 38000,
      gestationYears: 4.5,
      annualMaintenanceCostPerAcre: 16000,
      paybackPeriodYears: 6.0,
      commercialLifespanYears: 30,
      annualizedGrossRevenuePerAcre: 125000, // 50 qtls * ₹2500/qtl
      annualizedCostPerAcre: 17260, // (38k/30) + 16k
      annualizedNetProfitPerAcre: 107740,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: -38000, notes: "Year 1 capital: graft saplings, pit digging, fencing" },
        { year: 2, cashFlowInr: 10000, notes: "Intercropping with blackgram covers upkeep" },
        { year: 3, cashFlowInr: 12000, notes: "Intercropping with green gram" },
        { year: 4, cashFlowInr: 25000, notes: "First sample harvest (12 qtls)" },
        { year: 5, cashFlowInr: 75000, notes: "Commercial harvest (30 qtls)" },
        { year: 6, cashFlowInr: 115000, notes: "Full bearing: 50 qtls @ ₹2500/qtl" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 0.8,
      dietaryFiberGPer100g: 1.6,
      energyKcalPer100g: 60,
      ironMgPer100g: 0.16,
      zincMgPer100g: 0.09,
      calciumMgPer100g: 11,
      vitaminRichness: "Exceptional Vitamin A (Beta-carotene), Vitamin C (36mg), Mangiferin",
      nutritionalScore: 84,
      nutritionalHighlightsEn: ["King of Fruits", "Rich in Provitamin A", "High Mangiferin antioxidant"],
      nutritionalHighlightsTe: ["పండ్లలో రారాజు", "కంటి చూపును మెరుగుపరిచే విటమిన్-ఎ"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 38000,
      expectedYieldAverage: 50,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 2500,
      grossRevenuePerAcre: 125000,
      estimatedNetProfitPerAcre: 107740,
      daysToFirstReturn: 1600, // 4.5 years
      localPriceHistory: { min: 1800, max: 3500, modal: 2500, marketName: "Nuzvid & Nunna Mango Market (Krishna Dist)", trend: "STABLE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "HIGH_PERISHABLE",
      transportSensitivity: "MEDIUM",
      priceVolatility: "HIGH_SEASONAL_FLUCTUATION"
    },
    regionalContingencyPlanRef: "Dr. YSRHU: In Krishna district, plant 10m x 10m spacing. Intercrop with pulses during years 1–4 to maintain net farm cash flow.",
    dataDate: "2025-26 Dr. YSRHU",
    assumptions: ["Requires dry sunny period during flowering; avoid fields with high water table"]
  },

  // 20. Banana (Grand Naine G9)
  {
    id: "CRP-FRU-BANANA",
    cropName: "Banana (Grand Naine G9 / Karpura Chakkarakeli)",
    cropNameTelugu: "అరటి — గ్రాండ్ నైన్ G9 / చక్కెరకేళి (కాలువ నీటి ఆధారితం)",
    category: "FRUIT_PERENNIAL",
    recommendedVarieties: ["Grand Naine (G9)", "Karpura Chakkarakeli", "Robusta"],
    season: "YEAR_ROUND",
    durationDays: 340,
    waterRequirementMm: 1400, // HIGH WATER
    preferredSoil: ["Deep Alluvial Loam", "Clay Loam", "Fertile Delta Silt"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED", "POORLY_DRAINED_CLAY"],
    yieldBenchmarkPerAcre: { min: 280, max: 420, average: 350, unit: "Quintals / Acre" },
    suitabilityScore: 88,
    soilCompatibilityScore: 92,
    waterCompatibilityScore: 84, // Needs perennial water
    climateResilience: "MODERATE",
    labourIntensity: "HIGH",
    keyAdvantages: [
      "Massive yield (350 qtls/ac) with tissue culture G9 uniformity",
      "Chakkarakeli fetches exceptional premium in coastal Andhra ceremonies and festivals",
      "Ratoon crop provides second revenue cycle with zero replanting cost"
    ],
    keyRisks: [
      "Coastal cyclone and gale wind lodging requires propping with bamboo poles",
      "Panama wilt (Fusarium) and Sigatoka leaf spot"
    ],
    sourceReference: "ICAR-National Research Centre for Banana (NRCB) & Dr. YSRHU",
    sourceTag: "OFFICIAL_BENCHMARK",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 62000,
      gestationYears: 0.95, // 11 months
      annualMaintenanceCostPerAcre: 28000,
      paybackPeriodYears: 1.2,
      commercialLifespanYears: 2.0, // Main + 1 Ratoon
      annualizedGrossRevenuePerAcre: 280000, // 350 qtls * ₹800/qtl (₹8/kg)
      annualizedCostPerAcre: 59000, // (62k/2) + 28k
      annualizedNetProfitPerAcre: 221000,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: 190000, notes: "Year 1 capital (₹62k) offset by main crop harvest at month 11 (₹2.8L gross)" },
        { year: 2, cashFlowInr: 220000, notes: "Ratoon crop harvest at month 22 with low input costs" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 1.1,
      dietaryFiberGPer100g: 2.6,
      energyKcalPer100g: 89,
      ironMgPer100g: 0.26,
      zincMgPer100g: 0.15,
      calciumMgPer100g: 5,
      vitaminRichness: "High Potassium (358mg), Vitamin B6 (0.4mg), Vitamin C",
      nutritionalScore: 85,
      nutritionalHighlightsEn: ["High Potassium for blood pressure regulation", "Instant energy carbohydrates", "Rich in Vitamin B6"],
      nutritionalHighlightsTe: ["రక్తపోటు నియంత్రణకు పొటాషియం", "తక్షణ శక్తినిచ్చే సహజ పండు"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 62000,
      expectedYieldAverage: 350,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 800,
      grossRevenuePerAcre: 280000,
      estimatedNetProfitPerAcre: 221000,
      daysToFirstReturn: 340,
      localPriceHistory: { min: 600, max: 1200, modal: 800, marketName: "Ravulapalem & Vijayawada Banana Mandi", trend: "STABLE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "VERY_HIGH_DAILY",
      transportSensitivity: "HIGH",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "Dr. YSRHU: In Krishna Eastern Delta command, plant banana near assured canal distributaries. Erect casuarina windbreaks to reduce coastal cyclonic wind damage.",
    dataDate: "2025-26 NRCB / Dr. YSRHU",
    assumptions: ["Tissue culture G9 plantlets with drip fertigation; assured perennial water access"]
  },

  // 21. Coconut
  {
    id: "CRP-FRU-COCONUT",
    cropName: "Coconut (East Coast Tall / Godavari Ganga)",
    cropNameTelugu: "కొబ్బరి — ఈస్ట్ కోస్ట్ టాల్ (తీరప్రాంత కల్పవృక్షం)",
    category: "FRUIT_PERENNIAL",
    recommendedVarieties: ["East Coast Tall (ECT)", "Godavari Ganga Hybrid", "Chowghat Orange Dwarf"],
    season: "YEAR_ROUND",
    durationDays: 365,
    waterRequirementMm: 900,
    preferredSoil: ["Coastal Alluvium", "Sandy Clay Loam", "Delta Vertisols"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED", "POORLY_DRAINED_CLAY"],
    yieldBenchmarkPerAcre: { min: 5500, max: 9000, average: 7200, unit: "Nuts / Acre" },
    suitabilityScore: 86,
    soilCompatibilityScore: 88,
    waterCompatibilityScore: 86,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Exceptional longevity (50+ years economic life) — multi-generational asset",
      "High tolerance to coastal cyclonic wind and moderate soil/water salinity (up to 2.5 dS/m)",
      "High value tender coconut demand along Vijayawada-Machilipatnam highway"
    ],
    keyRisks: [
      "Long gestation period (5–6 years before first commercial harvest)",
      "Rhinoceros beetle and black-headed caterpillar incidence"
    ],
    sourceReference: "ICAR-Central Plantation Crops Research Institute (CPCRI) & Dr. YSRHU Ambajipeta",
    sourceTag: "OFFICIAL_BENCHMARK",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 36000,
      gestationYears: 5.5,
      annualMaintenanceCostPerAcre: 15000,
      paybackPeriodYears: 7.5,
      commercialLifespanYears: 50,
      annualizedGrossRevenuePerAcre: 86400, // 7200 nuts * ₹12/nut
      annualizedCostPerAcre: 15720, // (36k/50) + 15k
      annualizedNetProfitPerAcre: 70680,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: -36000, notes: "Year 1 capital: 70 seedling palms (25ft x 25ft), pits, organic manure" },
        { year: 2, cashFlowInr: 10000, notes: "Intercropping with vegetables/pulses" },
        { year: 3, cashFlowInr: 15000, notes: "Intercropping with banana/cocoa" },
        { year: 5, cashFlowInr: 20000, notes: "First light flowering and tender nuts" },
        { year: 6, cashFlowInr: 55000, notes: "Commercial nut bearing starts (4500 nuts)" },
        { year: 7, cashFlowInr: 72000, notes: "Full commercial production (7200 nuts) lasting 45+ years" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 3.3,
      dietaryFiberGPer100g: 9.0,
      energyKcalPer100g: 354,
      ironMgPer100g: 2.4,
      zincMgPer100g: 1.1,
      calciumMgPer100g: 14,
      vitaminRichness: "Lauric Acid (Medium Chain Triglycerides), Coconut Water Electrolytes (Potassium, Magnesium)",
      nutritionalScore: 87,
      nutritionalHighlightsEn: ["Natural electrolyte rehydration", "Lauric acid boosts immunity", "High dietary fiber kernel"],
      nutritionalHighlightsTe: ["సహజ ఎలక్ట్రోలైట్లతో కూడిన కొబ్బరి నీరు", "రోగనిరోధక శక్తికి లారిక్ యాసిడ్"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 36000,
      expectedYieldAverage: 7200,
      yieldUnit: "Nuts",
      expectedPricePerUnit: 12,
      grossRevenuePerAcre: 86400,
      estimatedNetProfitPerAcre: 70680,
      daysToFirstReturn: 2000, // 5.5 years
      localPriceHistory: { min: 9, max: 15, modal: 12, marketName: "Ambajipeta & Machilipatnam Coconut Hub", trend: "STABLE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "CPCRI / Dr. YSRHU Ambajipeta: In coastal Krishna Delta, plant East Coast Tall on field borders or 7.5m x 7.5m grid. Multi-tier cropping with cocoa, banana, and black pepper maximizes land utilization.",
    dataDate: "2025-26 CPCRI Horticultural Guide",
    assumptions: ["Establishment amortized over 50 years; assumes intercrop income offsets early maintenance"]
  },

  // 22. Tomato
  {
    id: "CRP-VEG-TOMATO",
    cropName: "Tomato (Arka Rakshak / US 440)",
    cropNameTelugu: "టమోటా — అర్క రక్షక్ (త్రివిధ తెగుళ్లు తట్టుకునే వంగడం)",
    category: "VEGETABLE",
    recommendedVarieties: ["Arka Rakshak", "US 440", "Abhinav"],
    season: "RABI",
    durationDays: 115,
    waterRequirementMm: 550,
    preferredSoil: ["Clay Loam", "Sandy Loam", "Alluvial Loam"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 140, max: 220, average: 180, unit: "Quintals / Acre" },
    suitabilityScore: 87,
    soilCompatibilityScore: 86,
    waterCompatibilityScore: 88,
    climateResilience: "MODERATE",
    labourIntensity: "HIGH",
    keyAdvantages: [
      "Arka Rakshak possesses triple disease resistance (ToLCV, Bacterial Wilt, Early Blight)",
      "High yield (180 qtls/ac) under staking and drip fertigation",
      "Immediate absorption by urban wholesale markets in Vijayawada"
    ],
    keyRisks: [
      "Extremely volatile market prices (swings between ₹300 and ₹2500 per quintal)",
      "Highly perishable; requires rapid transport within 48 hours of harvest"
    ],
    sourceReference: "ICAR-Indian Institute of Horticultural Research (IIHR), Bengaluru",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 0.9,
      dietaryFiberGPer100g: 1.2,
      energyKcalPer100g: 18,
      ironMgPer100g: 0.27,
      zincMgPer100g: 0.17,
      calciumMgPer100g: 10,
      vitaminRichness: "Extreme Lycopene, Vitamin C (14mg), Folate, Potassium",
      nutritionalScore: 88,
      nutritionalHighlightsEn: ["High Lycopene for cardiac & prostate health", "Rich in Vitamin C", "Low Calorie density"],
      nutritionalHighlightsTe: ["గుండె ఆరోగ్యానికి లైకోపీన్ యాంటీఆక్సిడెంట్", "విటమిన్-సి పుష్కలం"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 28000,
      expectedYieldAverage: 180,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 850,
      grossRevenuePerAcre: 153000,
      estimatedNetProfitPerAcre: 125000,
      daysToFirstReturn: 115,
      localPriceHistory: { min: 400, max: 2200, modal: 850, marketName: "Gollapudi Wholesale Vegetable Market, Vijayawada", trend: "VOLATILE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "HIGH_PERISHABLE",
      transportSensitivity: "HIGH",
      priceVolatility: "HIGH_SEASONAL_FLUCTUATION"
    },
    regionalContingencyPlanRef: "Dr. YSRHU Recommendation: Plant during Oct-Nov rabi with silver-black mulch to suppress weeds and conserve soil moisture. Use trellising to prevent fruit soil rot.",
    dataDate: "Rabi 2025-26 IIHR Bulletin",
    assumptions: ["Trellising/staking required; price is modal seasonal average"]
  },

  // 23. Brinjal (Eggplant)
  {
    id: "CRP-VEG-BRINJAL",
    cropName: "Brinjal / Eggplant (Bhagyamati / Shyamala)",
    cropNameTelugu: "వంకాయ — భాగ్యమతి / శ్యామల (నిరంతర దిగుబడి)",
    category: "VEGETABLE",
    recommendedVarieties: ["Bhagyamati", "Shyamala", "Ravaiya"],
    season: "RABI",
    durationDays: 130,
    waterRequirementMm: 600,
    preferredSoil: ["Clay Loam", "Deep Black Cotton", "Delta Alluvial"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 110, max: 170, average: 140, unit: "Quintals / Acre" },
    suitabilityScore: 88,
    soilCompatibilityScore: 90,
    waterCompatibilityScore: 88,
    climateResilience: "HIGH",
    labourIntensity: "HIGH",
    keyAdvantages: [
      "Continuous staggered picking for 3 months provides weekly cash income",
      "Traditional staple vegetable with steady consumer consumption in Krishna district",
      "Tolerates slightly heavier soils better than other solanaceous vegetables"
    ],
    keyRisks: [
      "Shoot and fruit borer (Leucinodes orbonalis) requires sex pheromone lures and bio-pesticides",
      "Bacterial wilt in warm humid soils"
    ],
    sourceReference: "ANGRAU Vegetable Research Station, Rajendranagar",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 1.0,
      dietaryFiberGPer100g: 3.4,
      energyKcalPer100g: 25,
      ironMgPer100g: 0.23,
      zincMgPer100g: 0.16,
      calciumMgPer100g: 9,
      vitaminRichness: "High Nasunin (Purple peel Anthocyanin), Dietary Fiber, Chlorogenic Acid",
      nutritionalScore: 78,
      nutritionalHighlightsEn: ["Nasunin Anthocyanin protects brain cell lipids", "High soluble fiber", "Low calorie"],
      nutritionalHighlightsTe: ["మెదడు కణాల రక్షణకు నాసునిన్ యాంటీఆక్సిడెంట్", "పీచు పదార్థం సమృద్ధిగా"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 24000,
      expectedYieldAverage: 140,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 900,
      grossRevenuePerAcre: 126000,
      estimatedNetProfitPerAcre: 102000,
      daysToFirstReturn: 130,
      localPriceHistory: { min: 600, max: 1400, modal: 900, marketName: "Gudlavalleru Daily Vegetable Market", trend: "STABLE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "HIGH_PERISHABLE",
      transportSensitivity: "MEDIUM",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA: Highly recommended vegetable for small and marginal farmers; staggered picking mitigates sudden market price crash risks.",
    dataDate: "2025-26 ANGRAU Horticulture",
    assumptions: ["Weekly harvests over 10-12 weeks; nursery transplanted"]
  },

  // 24. Bhendi (Okra)
  {
    id: "CRP-VEG-BHENDI",
    cropName: "Bhendi / Okra (Arka Anamika / Mahyco 10)",
    cropNameTelugu: "బెండకాయ — అర్క అనామిక (వేగవంతమైన కాయల కోత)",
    category: "VEGETABLE",
    recommendedVarieties: ["Arka Anamika", "Mahyco 10", "Radha"],
    season: "SUMMER",
    durationDays: 85,
    waterRequirementMm: 400,
    preferredSoil: ["Clay Loam", "Sandy Loam", "Alluvial"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 38, max: 58, average: 48, unit: "Quintals / Acre" },
    suitabilityScore: 89,
    soilCompatibilityScore: 88,
    waterCompatibilityScore: 90,
    climateResilience: "HIGH",
    labourIntensity: "HIGH",
    keyAdvantages: [
      "Harvesting begins 45 days after seed sowing with pickings every alternate day",
      "Arka Anamika resistant to Yellow Vein Mosaic Virus (YVMV)",
      "Excellent summer cash crop filling seasonal market vegetable shortages"
    ],
    keyRisks: [
      "Requires frequent picking every 2 days; pods turn fibrous and unmarketable if left",
      "Fruit borer (Earias vitella) and jassids during humid weather"
    ],
    sourceReference: "ICAR-IIHR Bengaluru & Dr. YSRHU",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 1.9,
      dietaryFiberGPer100g: 3.2,
      energyKcalPer100g: 33,
      ironMgPer100g: 0.62,
      zincMgPer100g: 0.43,
      calciumMgPer100g: 82,
      vitaminRichness: "High Mucilaginous Soluble Fiber, Folate (60mcg), Vitamin C, Vitamin K",
      nutritionalScore: 83,
      nutritionalHighlightsEn: ["Mucilage binds cholesterol & bile acids", "High Folate for prenatal health", "Vitamin K for bone clotting"],
      nutritionalHighlightsTe: ["కొలెస్ట్రాల్ తగ్గించే జిగురు పీచు పదార్థం", "గర్భిణులకు అవసరమైన ఫోలేట్"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 18000,
      expectedYieldAverage: 48,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 1800,
      grossRevenuePerAcre: 86400,
      estimatedNetProfitPerAcre: 68400,
      daysToFirstReturn: 85,
      localPriceHistory: { min: 1200, max: 2400, modal: 1800, marketName: "Machilipatnam Daily Market", trend: "RISING" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "HIGH_PERISHABLE",
      transportSensitivity: "HIGH",
      priceVolatility: "HIGH_SEASONAL_FLUCTUATION"
    },
    regionalContingencyPlanRef: "Dr. YSRHU: In summer conditions, spray neem oil (1500 ppm) against whiteflies to keep Yellow Vein Mosaic Virus below economic threshold.",
    dataDate: "2025-26 Dr. YSRHU",
    assumptions: ["Alternate day picking; requires available family or hired manual labor"]
  },

  // 25. Chilli (Commercial Cash Crop)
  {
    id: "CRP-COM-CHILLI",
    cropName: "Chilli (Guntur Sannam / Teja / Byadagi)",
    cropNameTelugu: "మిర్చి — గుంటూరు సన్నం / తేజ (అత్యధిక లాభదాయక వాణిజ్య పంట)",
    category: "COMMERCIAL_CASH",
    recommendedVarieties: ["Guntur Sannam (S4)", "Teja", "Armoor"],
    season: "KHARIF",
    durationDays: 170,
    waterRequirementMm: 700,
    preferredSoil: ["Deep Black Vertisols", "Clay Loam", "Fertile Alluvial"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 18, max: 28, average: 22, unit: "Quintals Dry Pods / Acre" },
    suitabilityScore: 91,
    soilCompatibilityScore: 92,
    waterCompatibilityScore: 88,
    climateResilience: "MODERATE",
    labourIntensity: "HIGH",
    keyAdvantages: [
      "Highest potential net profit per acre (up to ₹2.6L/ac) of all field crops in coastal AP",
      "Immediate proximity to Asia's largest chilli market (Guntur Chilli Yard)",
      "High domestic and international export demand for high-capsaicin dry red pods"
    ],
    keyRisks: [
      "Black thrips (Thrips parvispinus) and Gemini virus can cause devastating crop loss if unmanaged",
      "High working capital required (₹52,000/ac) and intensive labor for picking"
    ],
    sourceReference: "Regional Agricultural Research Station (RARS), Lam, Guntur",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 12.0,
      dietaryFiberGPer100g: 30.2,
      energyKcalPer100g: 318,
      ironMgPer100g: 7.8,
      zincMgPer100g: 1.0,
      calciumMgPer100g: 160,
      vitaminRichness: "Extreme Capsaicinoids, Vitamin C, Beta-Carotene, Bioactive Phenolics",
      nutritionalScore: 82,
      nutritionalHighlightsEn: ["Capsaicin boosts thermogenesis and metabolism", "High antioxidant capacity", "Natural food preservative"],
      nutritionalHighlightsTe: ["జీవక్రియలను వేగవంతం చేసే క్యాప్సైసిన్", "అత్యధిక యాంటీఆక్సిడెంట్ శక్తి"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 52000,
      expectedYieldAverage: 22,
      yieldUnit: "Quintals Dry",
      expectedPricePerUnit: 14500,
      grossRevenuePerAcre: 319000,
      estimatedNetProfitPerAcre: 267000,
      daysToFirstReturn: 170,
      localPriceHistory: { min: 11000, max: 19000, modal: 14500, marketName: "Guntur Agricultural Market Yard (Asia's Largest)", trend: "RISING" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "HIGH_SEASONAL_FLUCTUATION"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA: Adopt integrated pest management for Thrips parvispinus with blue sticky traps (30/ac), border maize barrier rows, and rotational bio-pesticides.",
    dataDate: "2025-26 RARS Lam Guntur",
    assumptions: ["Assumes farmer has investment capacity >= ₹52,000/ac; dry pods stored in Guntur cold storages for peak price"]
  },

  // 26. Gongura (Roselle) - Iconic Andhra Leafy Green
  {
    id: "CRP-LEA-GONGURA",
    cropName: "Gongura / Roselle (Red & Green Stem - Andhra Pride)",
    cropNameTelugu: "గోంగూర — ఆంధ్రుల అభిమాన ఆకుకూర (ఎర్ర & తెల్ల గోంగూర)",
    category: "LEAFY_VEGETABLE",
    recommendedVarieties: ["Red Stem Gongura (Sour)", "Green Stem Gongura", "Pusa Roselle"],
    season: "YEAR_ROUND",
    durationDays: 45,
    waterRequirementMm: 180, // LOW WATER
    preferredSoil: ["Clay Loam", "Black Cotton", "Alluvial Loam"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED", "POORLY_DRAINED_CLAY"],
    yieldBenchmarkPerAcre: { min: 28, max: 45, average: 35, unit: "Quintals Leaves / Acre" },
    suitabilityScore: 96,
    soilCompatibilityScore: 96,
    waterCompatibilityScore: 96,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Fastest cash generation: first cutting in 35–45 days, followed by 3 ratoon cuttings",
      "Virtually pest-free with zero chemical pesticides required",
      "Cultural staple in every Andhra household with guaranteed daily demand"
    ],
    keyRisks: [
      "Perishable within 24–36 hours without shade or moisture wrapping",
      "Excessive rainfall causing mild leaf spot in waterlogged corners"
    ],
    sourceReference: "ANGRAU Regional Agricultural Research Station, Lam & KVK Ghantasala",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 2.1,
      dietaryFiberGPer100g: 3.5,
      energyKcalPer100g: 35,
      ironMgPer100g: 3.9,
      zincMgPer100g: 0.8,
      calciumMgPer100g: 172,
      vitaminRichness: "High Vitamin C, Iron, Calcium, Unique Citric & Malic Organic Acids",
      nutritionalScore: 96,
      nutritionalHighlightsEn: ["Natural organic acids enhance Iron absorption", "High bioavailable Calcium", "Rich in Folate"],
      nutritionalHighlightsTe: ["ఐరన్ శరీరం గ్రహించేలా చేసే సహజ ఆర్గానిక్ ఆమ్లాలు", "అత్యధిక కాల్షియం మరియు ఫోలేట్"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 6500,
      expectedYieldAverage: 35,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 1200,
      grossRevenuePerAcre: 42000,
      estimatedNetProfitPerAcre: 35500,
      daysToFirstReturn: 40, // FASTEST RETURN
      localPriceHistory: { min: 900, max: 1600, modal: 1200, marketName: "Gudlavalleru & Dokiparru Local Mandi", trend: "STABLE" },
      buyerDemand: "LOCAL_RYTHU_BAZAR",
      perishability: "VERY_HIGH_DAILY",
      transportSensitivity: "HIGH",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA: Recommended for quick recovery and immediate food/income security following weather disasters or flood recedence.",
    dataDate: "2025-26 KVK Ghantasala",
    assumptions: ["Multi-cut harvesting (3 cuttings per sowing); local market sale within 24 hours"]
  },

  // 27. Palak & Amaranthus (Spinach & Thotakura)
  {
    id: "CRP-LEA-PALAK",
    cropName: "Palak & Amaranthus (Pusa Bharati & Arka Arunima)",
    cropNameTelugu: "తోటకూర & పాలకూర (అర్క అరుణిమ & పూసా భారతి)",
    category: "LEAFY_VEGETABLE",
    recommendedVarieties: ["Pusa Bharati (Palak)", "Arka Arunima (Amaranthus)", "CO 1"],
    season: "YEAR_ROUND",
    durationDays: 40,
    waterRequirementMm: 200,
    preferredSoil: ["Clay Loam", "Alluvial Silt", "Sandy Loam"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 30, max: 50, average: 40, unit: "Quintals Greens / Acre" },
    suitabilityScore: 94,
    soilCompatibilityScore: 94,
    waterCompatibilityScore: 95,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    keyAdvantages: [
      "Ultra-short 35–40 day harvest cycle allows 4 successive rotations in a year",
      "Lowest cost of cultivation (₹7,000/acre) with immediate cash liquidity",
      "Direct weekly sales at local Rythu Bazars eliminates middlemen"
    ],
    keyRisks: [
      "Daily perishability requires planned morning harvests tied to local market hours",
      "Flea beetles and damping off during continuous overcast weather"
    ],
    sourceReference: "ICAR-IIHR Bengaluru & ANGRAU",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 2.9,
      dietaryFiberGPer100g: 3.8,
      energyKcalPer100g: 28,
      ironMgPer100g: 4.2,
      zincMgPer100g: 0.9,
      calciumMgPer100g: 260,
      vitaminRichness: "High Vitamin K, Folate, Lutein & Zeaxanthin (Eye Health), Vitamin A",
      nutritionalScore: 97,
      nutritionalHighlightsEn: ["Extremely High Lutein for eye retina protection", "High Vitamin K for bone health", "High Folate"],
      nutritionalHighlightsTe: ["కంటి రెటీనా రక్షణకు ల్యూటిన్", "రక్తకణాల వృద్ధికి విటమిన్-కె మరియు ఫోలేట్"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 7000,
      expectedYieldAverage: 40,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 1100,
      grossRevenuePerAcre: 44000,
      estimatedNetProfitPerAcre: 37000,
      daysToFirstReturn: 40,
      localPriceHistory: { min: 800, max: 1500, modal: 1100, marketName: "Machilipatnam Rythu Bazar", trend: "STABLE" },
      buyerDemand: "LOCAL_RYTHU_BAZAR",
      perishability: "VERY_HIGH_DAILY",
      transportSensitivity: "HIGH",
      priceVolatility: "LOW_MSP_BACKED"
    },
    regionalContingencyPlanRef: "Dr. YSRHU: Short-duration green leafy vegetables provide essential micro-nutrients to farm families and generate steady daily cash flow with low water usage.",
    dataDate: "2025-26 Dr. YSRHU",
    assumptions: ["Sown in beds with light frequent irrigations; immediate harvest when 6-8 leaves mature"]
  },

  // 28. Ashwagandha (Medicinal Crop - Legally Approved ICAR-DMAPR Varieties)
  {
    id: "CRP-MED-ASHWAGANDHA",
    cropName: "Ashwagandha (Jawahar Asgandh 20 / Raj Vijay Ashwagandha 100)",
    cropNameTelugu: "అశ్వగంధ (ఔషధ వేరు పంట — JA 20 / RVA 100)",
    category: "MEDICINAL_AROMATIC",
    recommendedVarieties: ["JA 20 (Jawahar Asgandh)", "RVA 100", "Poshita (CIMAP)"],
    season: "RABI",
    durationDays: 155,
    waterRequirementMm: 260,
    preferredSoil: ["Well-Drained Sandy Loam", "Red Loam", "Light Calcareous Loam"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 4.5, max: 7.5, average: 5.8, unit: "Quintals Dry Roots / Acre" },
    suitabilityScore: 81,
    soilCompatibilityScore: 76,
    waterCompatibilityScore: 93,
    climateResilience: "HIGH",
    labourIntensity: "MODERATE",
    fertilizerPesticideDependence: "LOW",
    riskScore: 34,
    keyAdvantages: [
      "Thrives on low residual moisture with minimal fertilizer or synthetic pesticide inputs",
      "Dry roots are non-perishable (12+ months storage) allowing farmers to sell when prices peak",
      "Supported by National Medicinal Plants Board (NMPB) buyback clusters in AP & Telangana"
    ],
    keyRisks: [
      "Strictly intolerant of standing water / poorly drained heavy delta clay (causes root rot)",
      "Requires firm buyer contract or Ayurveda processor linkage in Vijayawada/Hyderabad before sowing"
    ],
    sourceReference: "ICAR-DMAPR (Directorate of Medicinal and Aromatic Plants Research) & NMPB",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 3.9,
      dietaryFiberGPer100g: 32.3,
      energyKcalPer100g: 245,
      ironMgPer100g: 3.3,
      zincMgPer100g: 1.8,
      calciumMgPer100g: 23,
      vitaminRichness: "Withanolides (standardized root alkaloids), Plant Sterols, Trace Iron",
      nutritionalScore: 68,
      ediblePortionNote: "Evaluated as a commercial dry-root medicinal crop (not a staple food). Nutritional metrics reflect dry root powder per 100g; no medical cure claims made.",
      nutritionalHighlightsEn: ["High dietary root fibre", "Non-food herbal pharmacopoeia crop", "Not a substitute for medical treatment"],
      nutritionalHighlightsTe: ["ఔషధ గుణాలు గల వాణిజ్య వేరు పంట", "ఆహార ధాన్యం కాదు — నిపుణుల సలహాతోనే సాగు చేయాలి"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 14500,
      expectedYieldAverage: 5.8,
      yieldUnit: "Quintals Dry Roots",
      expectedPricePerUnit: 13500,
      grossRevenuePerAcre: 78300,
      estimatedNetProfitPerAcre: 63800,
      daysToFirstReturn: 155,
      localPriceHistory: { min: 10500, max: 16800, modal: 13500, marketName: "Neemuch / Hyderabad Medicinal Hub Contract", trend: "RISING" },
      buyerDemand: "PROCESSING_UNITS",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "ICAR-DMAPR: Cultivate exclusively on well-drained upland or raised ridges; avoid heavy flooded paddy basins.",
    dataDate: "2025-26 ICAR-DMAPR / NMPB",
    assumptions: ["Requires pre-arranged off-take agreement with AYUSH / NMPB registered aggregator; clean sun-drying to <10% moisture"]
  },

  // 29. Tulsi / Holy Basil (Aromatic & Medicinal Crop)
  {
    id: "CRP-MED-TULSI",
    cropName: "Tulsi / Holy Basil (CIM-Ayu / Krishna Tulsi)",
    cropNameTelugu: "తులసి (కృష్ణ తులసి / CIM-ఆయు — ఔషధ ఆకు పంట)",
    category: "MEDICINAL_AROMATIC",
    recommendedVarieties: ["CIM-Ayu", "CIM-Angna", "RRL-Oc-11"],
    season: "YEAR_ROUND",
    durationDays: 105,
    waterRequirementMm: 340,
    preferredSoil: ["Alluvial Loam", "Clay Loam", "Well-Drained Red Loam"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 12, max: 18, average: 15, unit: "Quintals Dry Leaf + Seed / Acre" },
    suitabilityScore: 84,
    soilCompatibilityScore: 85,
    waterCompatibilityScore: 90,
    climateResilience: "HIGH",
    labourIntensity: "MODERATE",
    fertilizerPesticideDependence: "LOW",
    riskScore: 30,
    keyAdvantages: [
      "Low synthetic chemical dependence — organic cultivation commands 15-20% price premium",
      "Yields both dried herbage and distilled eugenol-rich essential oil",
      "Short 100-110 day cycle with secondary ratoon cutting"
    ],
    keyRisks: [
      "Price depends heavily on assured contract with herbal tea/extract processors",
      "Needs clean shade-drying shed to preserve green colour and oil content"
    ],
    sourceReference: "CSIR-CIMAP & ANGRAU Medicinal Crop Advisory",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 3.2,
      dietaryFiberGPer100g: 1.6,
      energyKcalPer100g: 23,
      ironMgPer100g: 3.17,
      zincMgPer100g: 0.8,
      calciumMgPer100g: 177,
      vitaminRichness: "Vitamin K, Eugenol Essential Oil, Beta-Carotene, Calcium (Culinary Herb)",
      nutritionalScore: 76,
      ediblePortionNote: "Evaluated per 100g fresh culinary/herbal leaf basis. Does not treat or cure medical conditions.",
      nutritionalHighlightsEn: ["Culinary & herbal tea leaf value", "Rich in dietary calcium & Vitamin K", "Low calorie aromatic foliage"],
      nutritionalHighlightsTe: ["వంటలు & హెర్బల్ టీలో వాడే సుగంధ ఆకు", "కాల్షియం మరియు విటమిన్-కె సమృద్ధిగా ఉంటుంది"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 13800,
      expectedYieldAverage: 15,
      yieldUnit: "Quintals Dry Herbage",
      expectedPricePerUnit: 4600,
      grossRevenuePerAcre: 69000,
      estimatedNetProfitPerAcre: 55200,
      daysToFirstReturn: 95,
      localPriceHistory: { min: 3800, max: 5600, modal: 4600, marketName: "Vijayawada / Guntur Herbal Aggregators", trend: "STABLE" },
      buyerDemand: "PROCESSING_UNITS",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "CSIR-CIMAP / NMPB: Transplant at 45x45 cm spacing after monsoon onset or under protective light irrigation; zero pesticide spray before harvest.",
    dataDate: "2025-26 CSIR-CIMAP",
    assumptions: ["Marketed strictly through verified herbal buyers or FPO aggregation; includes shade drying labor"]
  },

  // 30. Lemongrass (Perennial Aromatic Oil Crop)
  {
    id: "CRP-MED-LEMONGRASS",
    cropName: "Lemongrass (CSIR-CIMAP Krishna / Pragati)",
    cropNameTelugu: "నిమ్మగడ్డి (సుగంధ తైల పంట — కృష్ణా రకం)",
    category: "MEDICINAL_AROMATIC",
    recommendedVarieties: ["Krishna (CIMAP)", "Pragati", "Kaveri"],
    season: "YEAR_ROUND",
    durationDays: 180,
    waterRequirementMm: 450,
    preferredSoil: ["Sandy Clay Loam", "Well-Drained Alluvial", "Marginal Upland"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 70, max: 110, average: 88, unit: "Kg Essential Oil / Year" },
    suitabilityScore: 82,
    soilCompatibilityScore: 82,
    waterCompatibilityScore: 86,
    climateResilience: "HIGH",
    labourIntensity: "MODERATE",
    fertilizerPesticideDependence: "LOW",
    riskScore: 32,
    keyAdvantages: [
      "CSIR-CIMAP 'Krishna' variety produces >78% Citral essential oil for fragrance/cosmetic buyers",
      "Multi-year perennial slips (4-5 year productive stand) with 3-4 harvests annually",
      "Virtually zero cattle grazing damage and high tolerance to marginal/saline bunds"
    ],
    keyRisks: [
      "Requires access to a mobile/FPO steam distillation unit within 15 km of farm",
      "High Year-1 planting slip & distillation setup cost compared to pulses"
    ],
    sourceReference: "CSIR-CIMAP Aroma Mission (Andhra Pradesh Cluster)",
    sourceTag: "OFFICIAL_BENCHMARK",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 36000,
      gestationYears: 0.5,
      annualMaintenanceCostPerAcre: 24000,
      paybackPeriodYears: 1.2,
      commercialLifespanYears: 5,
      annualizedGrossRevenuePerAcre: 105600,
      annualizedCostPerAcre: 28000,
      annualizedNetProfitPerAcre: 77600,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: 18000, notes: "Planting slips + 2 initial cuttings (Year 1 partial net after setup)" },
        { year: 2, cashFlowInr: 77600, notes: "Full 4 harvests yielding ~88 kg Citral essential oil" },
        { year: 3, cashFlowInr: 77600, notes: "Peak ratoon vigour with low fertilizer need" },
        { year: 4, cashFlowInr: 72000, notes: "Steady-state oil recovery" },
        { year: 5, cashFlowInr: 64000, notes: "Final year prior to replanting slips" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 1.8,
      dietaryFiberGPer100g: 0.4,
      energyKcalPer100g: 99,
      ironMgPer100g: 8.17,
      zincMgPer100g: 2.2,
      calciumMgPer100g: 65,
      vitaminRichness: "Citral Aromatic Terpenes, Folate, Potassium (Non-Staple Culinary/Industrial)",
      nutritionalScore: 60,
      ediblePortionNote: "Evaluated primarily as an industrial/aromatic steam-distilled essential oil crop; not a dietary calorie source.",
      nutritionalHighlightsEn: ["Industrial essential oil crop (Citral >75%)", "Trace culinary stalk iron", "Distillation byproduct used as organic mulch"],
      nutritionalHighlightsTe: ["సుగంధ తైలం (సిట్రాల్) ఉత్పత్తికి వాడే పంట", "వ్యర్థ గడ్డి సేంద్రీయ ఎరువుగా ఉపయోగపడుతుంది"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 36000,
      expectedYieldAverage: 88,
      yieldUnit: "Kg Essential Oil",
      expectedPricePerUnit: 1200,
      grossRevenuePerAcre: 105600,
      estimatedNetProfitPerAcre: 77600,
      daysToFirstReturn: 150,
      localPriceHistory: { min: 950, max: 1450, modal: 1200, marketName: "CSIR Aroma Mission FPO / Hyderabad Essential Oil Buyers", trend: "STABLE" },
      buyerDemand: "PROCESSING_UNITS",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "CSIR-CIMAP Aroma Mission: Plant slips on bunds or upland drained blocks; share community distillation boiler across 10-15 acres.",
    dataDate: "2025-26 CSIR-CIMAP Aroma Mission",
    assumptions: ["Assumes FPO steam distillation access at ₹120/kg oil processing fee", "Multi-year perennial figures reported annualized"]
  },

  // 31. Turmeric (Spice — Krishna-Guntur Delta)
  {
    id: "CRP-SPI-TURMERIC",
    cropName: "Turmeric / Pasupu (Duggirala / Pragati)",
    cropNameTelugu: "పసుపు (దుగ్గిరాల / ప్రగతి - సుగంధ ద్రవ్యం)",
    category: "SPICE",
    recommendedVarieties: ["Duggirala Red", "Pragati (IISR)", "Rajendra Sonia"],
    season: "KHARIF",
    durationDays: 255,
    waterRequirementMm: 780,
    preferredSoil: ["Fertile Alluvial Loam", "Sandy Clay Loam", "Well-Drained Uplands"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"], // Rhizome rot in standing clay water
    yieldBenchmarkPerAcre: { min: 18, max: 28, average: 22, unit: "Quintals Cured Rhizome / Acre" },
    suitabilityScore: 86,
    soilCompatibilityScore: 84,
    waterCompatibilityScore: 80,
    climateResilience: "MODERATE",
    labourIntensity: "HIGH",
    minSoilDepth: "MEDIUM_30_75CM",
    seedAvailability: "LIMITED_LOCAL_STOCK",
    organicManureRequirement: "HIGH",
    buyerChannels: ["Duggirala Turmeric Yard (nearby Krishna-Guntur belt)", "Spice exporters", "FPO Value-Add Powder Units"],
    keyAdvantages: [
      "Direct access to nearby Duggirala major AP turmeric market yard (~45–60 km from Gudlavalleru)",
      "Non-perishable once boiled and sun-dried — stores up to 12 months to avoid distress sale",
      "Strong shade-tolerant intercrop under young coconut or mango orchards"
    ],
    keyRisks: [
      "CRITICAL: Rhizome rot erupts rapidly if rainwater stagnates in flat heavy black clay without raised ridges",
      "High seed rhizome cost (8–10 qtls mother rhizomes/ac) raises initial working capital"
    ],
    sourceReference: "ANGRAU HRS Duggirala & ICAR-IISR Kozhikode",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 7.8,
      dietaryFiberGPer100g: 21.1,
      energyKcalPer100g: 354,
      ironMgPer100g: 41.4,
      zincMgPer100g: 4.3,
      calciumMgPer100g: 183,
      vitaminRichness: "Curcumin Polyphenols (3.5–5%), Iron, Manganese (Spice & Culinary)",
      nutritionalScore: 82,
      nutritionalHighlightsEn: ["High dietary iron & fibre in dried spice form", "Long household shelf stability", "Natural culinary spice crop (not a medical cure)"],
      nutritionalHighlightsTe: ["ఇనుము మరియు పీచు సమృద్ధిగా ఉండే సుగంధ ద్రవ్యం", "ఎండబెట్టిన తర్వాత 12 నెలల పాటు నిల్వ చేసుకోవచ్చు"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 68000,
      expectedYieldAverage: 22,
      yieldUnit: "Quintals Cured",
      expectedPricePerUnit: 8200,
      grossRevenuePerAcre: 180400,
      estimatedNetProfitPerAcre: 112400,
      daysToFirstReturn: 265,
      localPriceHistory: { min: 6200, max: 11500, modal: 8200, marketName: "Duggirala Turmeric Market / Erode Index", trend: "RISING" },
      buyerDemand: "PROCESSING_UNITS",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "ANGRAU Duggirala Protocol: Plant only on 20 cm raised beds/ridges with Trichoderma-enriched FYM basal.",
    dataDate: "2025-26 Duggirala Yard Benchmark",
    assumptions: ["Includes boiling, curing, polishing, and jute bagging costs", "Excludes multi-year price peak spikes"]
  },

  // 32. Coriander (Low-Water Vertisol Rabi Spice)
  {
    id: "CRP-SPI-CORIANDER",
    cropName: "Coriander / Dhaniya (Sadhana CS-4 / Sindhu)",
    cropNameTelugu: "ధనియాలు & కొత్తిమీర (సాధన CS-4 - తక్కువ నీటి సుగంధ పంట)",
    category: "SPICE",
    recommendedVarieties: ["Sadhana (CS-4)", "Sindhu", "Swathi"],
    season: "RABI",
    durationDays: 95,
    waterRequirementMm: 210,
    preferredSoil: ["Deep Black Vertisols", "Clay Loam", "Moisture-Retentive Paddy Fallows"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED", "POORLY_DRAINED_CLAY"],
    yieldBenchmarkPerAcre: { min: 4.5, max: 7.0, average: 5.5, unit: "Quintals Dry Seed / Acre" },
    suitabilityScore: 89,
    soilCompatibilityScore: 92,
    waterCompatibilityScore: 94,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    minSoilDepth: "SHALLOW_UNDER_30CM",
    seedAvailability: "EASILY_AVAILABLE_RBK_KVK",
    organicManureRequirement: "LOW",
    fertilizerPesticideDependence: "LOW",
    buyerChannels: ["Guntur & Gudlavalleru Spice Traders", "Local Kirana & Rythu Bazar (fresh leaf thinning)"],
    keyAdvantages: [
      "Thrives on residual black-cotton moisture in Rabi after Kharif paddy harvest — very low water (210 mm)",
      "Early thinning provides Day-30 fresh green coriander leaf income while remainder matures into dry grain spice",
      "Very low initial outlay (~₹12,500/ac) with zero-debt exposure"
    ],
    keyRisks: [
      "Powdery mildew incidence if February night dew/humidity exceeds 82% without wettable sulphur",
      "Dry grain price fluctuates modestly based on Rajasthan & Guntur arrivals"
    ],
    sourceReference: "ANGRAU RARS Lam, Guntur Spice Protocol",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 12.4,
      dietaryFiberGPer100g: 41.9,
      energyKcalPer100g: 298,
      ironMgPer100g: 16.3,
      zincMgPer100g: 4.7,
      calciumMgPer100g: 709,
      vitaminRichness: "Calcium, Dietary Fibre, Iron, Vitamin C (Fresh Leaf)",
      nutritionalScore: 85,
      nutritionalHighlightsEn: ["Very high calcium & iron density in both leaf and seed", "Dual harvest supports both family diet and dry spice storage"],
      nutritionalHighlightsTe: ["కాల్షియం మరియు ఇనుము సమృద్ధిగా ఉండే పంట", "కొత్తిమీర మరియు ధనియాలు రెండు రకాల ఆదాయం"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 12500,
      expectedYieldAverage: 5.5,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 7800,
      grossRevenuePerAcre: 42900,
      estimatedNetProfitPerAcre: 30400,
      daysToFirstReturn: 35,
      localPriceHistory: { min: 6400, max: 9600, modal: 7800, marketName: "Guntur Spice Yard / Local Kirana Wholesale", trend: "STABLE" },
      buyerDemand: "HIGH_LOCAL_MANDI",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "ANGRAU RARS Lam: Ideal low-risk Rabi alternative when canal tail-end water stops early after December.",
    dataDate: "2025-26 ANGRAU Lam Reference",
    assumptions: ["Evaluated on 5.5 qtl/ac dry seed conservative-expected yield without artificial leaf price inflation"]
  },

  // 33. Foxtail Millet / Korra (ANGRAU Traditional Low-Water Nutri-Cereal)
  {
    id: "CRP-MIL-KORRA",
    cropName: "Foxtail Millet / Korra (SIA 3085 / Suryanandi)",
    cropNameTelugu: "కొర్రలు (SIA 3085 / సూర్యనంది - తక్కువ నీటి సిరిధాన్యం)",
    category: "MILLET",
    recommendedVarieties: ["SIA 3085", "SIA 3156", "Suryanandi"],
    season: "KHARIF",
    durationDays: 78,
    waterRequirementMm: 220,
    preferredSoil: ["Red Loam", "Sandy Clay Loam", "Upland Moderately Drained"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 6.5, max: 10.0, average: 8.0, unit: "Quintals / Acre" },
    suitabilityScore: 87,
    soilCompatibilityScore: 86,
    waterCompatibilityScore: 96,
    climateResilience: "HIGH",
    labourIntensity: "LOW",
    minSoilDepth: "SHALLOW_UNDER_30CM",
    seedAvailability: "EASILY_AVAILABLE_RBK_KVK",
    organicManureRequirement: "LOW",
    fertilizerPesticideDependence: "LOW",
    buyerChannels: ["AP Markfed / Millet FPOs", "Vijayawada / Hyd Health Retail Mills"],
    keyAdvantages: [
      "Shortest-duration millet (75–80 days) escaping late monsoon cyclones and severe dry spells",
      "Minimal chemical fertilizer or pesticide needed (~₹9,800/ac total investment)",
      "High straw value plus rising urban Vijayawada/Hyderabad demand for dehulled Korra rice"
    ],
    keyRisks: [
      "Bird scaring needed during grain-filling stage if grown as isolated small plot",
      "Requires mechanical de-huller access before direct consumer retail"
    ],
    sourceReference: "ANGRAU RARS Nandyal & ICAR-IIMR Millet Package",
    sourceTag: "OFFICIAL_BENCHMARK",
    nutritionalProfile: {
      proteinGPer100g: 12.3,
      dietaryFiberGPer100g: 8.0,
      energyKcalPer100g: 331,
      ironMgPer100g: 2.8,
      zincMgPer100g: 2.4,
      calciumMgPer100g: 31,
      vitaminRichness: "Complex Carbohydrates, Protein, Thiamine, Niacin (ICMR-NIN)",
      nutritionalScore: 91,
      nutritionalHighlightsEn: ["12.3g protein per 100g grain — far superior fibre & minerals than polished white rice", "Low water footprint nutri-cereal"],
      nutritionalHighlightsTe: ["వండే ధాన్యాలలో అధిక ప్రోటీన్ మరియు పీచు కలిగి ఉంటుంది", "తక్కువ నీటితో 78 రోజుల్లో పంట పూర్తవుతుంది"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 9800,
      expectedYieldAverage: 8.0,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 3800,
      grossRevenuePerAcre: 30400,
      estimatedNetProfitPerAcre: 20600,
      daysToFirstReturn: 80,
      localPriceHistory: { min: 3000, max: 4600, modal: 3800, marketName: "Millet FPO Procurement / Local Grain Mandi", trend: "RISING" },
      buyerDemand: "NICHE_DIRECT",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "MODERATE"
    },
    regionalContingencyPlanRef: "ICAR-CRIDA Contingency Choice: Recommended catch crop in upland Krishna zones when July rains are delayed.",
    dataDate: "2025-26 ANGRAU RARS Nandyal",
    assumptions: ["Valued at whole-grain farmgate rate ₹3,800/qtl without assuming dehulled retail margin"]
  },

  // 34. Experimental Quinoa (ICAR-NIASM / ANGRAU Pilot Trial Crop)
  {
    id: "CRP-MIL-QUINOA-EXP",
    cropName: "Quinoa — Pilot Experimental (ICAR-NIASM Him Shakti)",
    cropNameTelugu: "క్వినోవా — ప్రయోగాత్మక పంట (ICAR-NIASM పరిశోధనా రకం)",
    category: "MILLET",
    recommendedVarieties: ["Him Shakti", "EC 507740 (Trial Selection)"],
    season: "RABI",
    durationDays: 105,
    waterRequirementMm: 260,
    preferredSoil: ["Well-Drained Loam", "Saline-Alkali Tolerant Light Clay", "Rabi Uplands"],
    toleratedDrainage: ["WELL_DRAINED", "MODERATELY_DRAINED"],
    yieldBenchmarkPerAcre: { min: 4.5, max: 8.0, average: 6.0, unit: "Quintals Clean Seed / Acre" },
    suitabilityScore: 66,
    soilCompatibilityScore: 76,
    waterCompatibilityScore: 88,
    climateResilience: "MODERATE",
    labourIntensity: "MODERATE",
    minSoilDepth: "SHALLOW_UNDER_30CM",
    seedAvailability: "NURSERY_OR_EXTERNAL_PREORDER",
    organicManureRequirement: "LOW",
    fertilizerPesticideDependence: "LOW",
    isExperimentalCrop: true,
    buyerChannels: ["Pre-contracted Organic / Health Exporters ONLY (No open AMIC mandi)", "Hyderabad/Bengaluru Specialty Aggregators"],
    keyAdvantages: [
      "Supported by ICAR-NIASM Baramati & Ananthapuramu dryland trials for moderate soil salinity tolerance",
      "High complete amino-acid protein content (14.1g/100g) with low Rabi water footprint (260 mm)"
    ],
    keyRisks: [
      "EXPERIMENTAL IN KRISHNA DELTA: No local AMIC auction desk in Gudlavalleru — MUST have written buy-back agreement before sowing",
      "Seed grain saponin washing/processing and day-temperature (>34°C Feb/Mar heat spike) can slash germination/seed set"
    ],
    sourceReference: "ICAR-NIASM Baramati Experimental Trial (Non-Validated Locally)",
    sourceTag: "CALCULATED_ESTIMATE",
    nutritionalProfile: {
      proteinGPer100g: 14.1,
      dietaryFiberGPer100g: 7.0,
      energyKcalPer100g: 368,
      ironMgPer100g: 4.6,
      zincMgPer100g: 3.1,
      calciumMgPer100g: 47,
      vitaminRichness: "Complete Essential Amino Acids, Folate, Magnesium, Iron",
      nutritionalScore: 93,
      nutritionalHighlightsEn: ["Contains all 9 essential amino acids (14.1g protein/100g)", "Must be thoroughly washed to remove bitter outer saponin coat before cooking"],
      nutritionalHighlightsTe: ["అధిక ప్రోటీన్ (14.1గ్రా) ఉండే ప్రయోగాత్మక ధాన్యం", "సరైన కొనుగోలు ఒప్పందం లేకుండా పెద్ద విస్తీర్ణంలో వేయరాదు"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 18500,
      expectedYieldAverage: 6.0,
      yieldUnit: "Quintals",
      expectedPricePerUnit: 8500,
      grossRevenuePerAcre: 51000,
      estimatedNetProfitPerAcre: 32500,
      daysToFirstReturn: 110,
      localPriceHistory: { min: 4800, max: 11000, modal: 8500, marketName: "Contract FPO Buyers (Local Gudlavalleru Price Unavailable)", trend: "VOLATILE" },
      buyerDemand: "NICHE_DIRECT",
      perishability: "LOW_SHELF_STABLE",
      transportSensitivity: "LOW",
      priceVolatility: "HIGH_SEASONAL_FLUCTUATION"
    },
    regionalContingencyPlanRef: "EXPERIMENTAL NOTICE: Start strictly with 0.25 acre pilot after securing seed + saponin-free cleaning buyer agreement.",
    dataDate: "2025 ICAR-NIASM Trial Estimate",
    assumptions: ["Marked EXPERIMENTAL — local Krishna District open-market price data unavailable"]
  },

  // 35. Experimental Poona Fig / Anjeer (ICAR-IIHR Pilot Horticultural Crop)
  {
    id: "CRP-FRU-FIG-EXP",
    cropName: "Poona Fig / Anjeer — Experimental (ICAR-IIHR Selection)",
    cropNameTelugu: "అంజీర (పూనా రకం - ప్రయోగాత్మక ఉద్యాన పంట)",
    category: "FRUIT_PERENNIAL",
    recommendedVarieties: ["Poona Fig", "Dinkar", "Diana"],
    season: "YEAR_ROUND",
    durationDays: 365,
    waterRequirementMm: 520,
    preferredSoil: ["Well-Drained Gravelly Loam", "Calcareous Uplands", "Raised Sandy Clay Loam"],
    toleratedDrainage: ["WELL_DRAINED"],
    yieldBenchmarkPerAcre: { min: 30, max: 48, average: 38, unit: "Quintals Fresh Fruit / Acre" },
    suitabilityScore: 63,
    soilCompatibilityScore: 64,
    waterCompatibilityScore: 82,
    climateResilience: "MODERATE",
    labourIntensity: "HIGH",
    minSoilDepth: "MEDIUM_30_75CM",
    seedAvailability: "NURSERY_OR_EXTERNAL_PREORDER",
    organicManureRequirement: "HIGH",
    isExperimentalCrop: true,
    buyerChannels: ["Urban Vijayawada Direct Supermarkets / Dehydration Units", "Local Fresh Fruit Vendors (No APMC bulk fig floor)"],
    keyAdvantages: [
      "Faster orchard fruiting than Mango (~14–18 months) with option to dehydrate surplus figs into higher-shelf-life dry anjeer",
      "Supported by ICAR-IIHR Bengaluru & Maharashtra university orchard pruning trials"
    ],
    keyRisks: [
      "EXPERIMENTAL FOR COASTAL DELTA: High monsoon humidity (>80%) causes severe fig rust & fruit cracking unless pruned/covered",
      "Fresh fruit spoils within 2–3 days without refrigeration; needs urban supermarket or solar-dryer tie-up"
    ],
    sourceReference: "ICAR-IIHR Bengaluru Research (Out-of-State Experimental Reference)",
    sourceTag: "CALCULATED_ESTIMATE",
    perennialInfo: {
      isPerennial: true,
      establishmentCostPerAcre: 135000,
      gestationYears: 1.5,
      annualMaintenanceCostPerAcre: 34000,
      paybackPeriodYears: 3.4,
      commercialLifespanYears: 15,
      annualizedGrossRevenuePerAcre: 247000,
      annualizedCostPerAcre: 43000,
      annualizedNetProfitPerAcre: 204000,
      cashFlowTimeline: [
        { year: 1, cashFlowInr: -135000, notes: "Year-1: 440 saplings, drip, pruning stakes, heavy FYM mounds" },
        { year: 2, cashFlowInr: 42000, notes: "Year-2 light bearing (~12 qtls fresh)" },
        { year: 3, cashFlowInr: 185000, notes: "Steady-state orchard output (35–40 qtls)" },
        { year: 4, cashFlowInr: 204000, notes: "Full maturity steady cash flow" }
      ]
    },
    nutritionalProfile: {
      proteinGPer100g: 0.8,
      dietaryFiberGPer100g: 2.9,
      energyKcalPer100g: 74,
      ironMgPer100g: 0.4,
      zincMgPer100g: 0.2,
      calciumMgPer100g: 35,
      vitaminRichness: "Soluble Fibre, Potassium, Vitamin B6, Calcium",
      nutritionalScore: 76,
      nutritionalHighlightsEn: ["Natural fibre-rich orchard fruit suitable for fresh and solar-dried snack processing"],
      nutritionalHighlightsTe: ["పీచు మరియు ఖనిజాలు సమృద్ధిగా ఉండే పండు — తీరప్రాంత తేమలో ప్రయోగాత్మకంగా పరీక్షించాలి"]
    },
    commercialEvaluation: {
      costOfCultivationPerAcre: 135000,
      expectedYieldAverage: 38,
      yieldUnit: "Quintals Fresh",
      expectedPricePerUnit: 6500,
      grossRevenuePerAcre: 247000,
      estimatedNetProfitPerAcre: 204000,
      daysToFirstReturn: 450,
      localPriceHistory: { min: 4500, max: 9000, modal: 6500, marketName: "Vijayawada Urban Wholesale / Pune Index", trend: "RISING" },
      buyerDemand: "NICHE_DIRECT",
      perishability: "VERY_HIGH_DAILY",
      transportSensitivity: "HIGH",
      priceVolatility: "HIGH_SEASONAL_FLUCTUATION"
    },
    regionalContingencyPlanRef: "EXPERIMENTAL NOTICE: Not validated for Krishna Delta heavy clay — only for well-drained uplands with solar dryer or cold chain.",
    dataDate: "2025 ICAR-IIHR Benchmark",
    assumptions: ["Marked EXPERIMENTAL — requires local Dr. YSRHU / KVK adaptation confirmation before commercial scale"]
  }
];

function compute13LineInvestment(crop: CropProfile): InvestmentLineItems {
  const baseTotal = crop.perennialInfo
    ? crop.perennialInfo.establishmentCostPerAcre
    : crop.commercialEvaluation.costOfCultivationPerAcre;

  const isZeroTill = crop.id.includes('LBG752') || crop.id.includes('WGG42');
  const isPerennial = Boolean(crop.perennialInfo?.isPerennial);
  const isLeafy = crop.category === 'LEAFY_VEGETABLE';
  const isMedicinal = crop.category === 'MEDICINAL_AROMATIC';

  // Proportional weights normalized against ANGRAU crop economics sheets so all 13 lines sum === baseTotal exactly
  const wLand = isZeroTill ? 0.02 : isPerennial ? 0.14 : 0.12;
  const wSeed = isPerennial ? 0.26 : isMedicinal ? 0.18 : 0.12;
  const wFert = isZeroTill || isLeafy || isMedicinal ? 0.06 : 0.14;
  const wOrg = isPerennial ? 0.10 : 0.08;
  const wIrrig = crop.waterRequirementMm > 900 ? 0.07 : isPerennial ? 0.12 : 0.05;
  const wLabour = crop.labourIntensity === 'HIGH' ? 0.24 : 0.18;
  const wMach = isZeroTill ? 0.04 : 0.08;
  const wPest = isLeafy || isMedicinal ? 0.03 : crop.id.includes('CHILLI') ? 0.14 : 0.07;
  const wHarv = 0.09;
  const wStor = crop.commercialEvaluation.perishability === 'VERY_HIGH_DAILY' ? 0.01 : 0.03;
  const wPack = crop.category === 'VEGETABLE' || crop.category === 'FRUIT_PERENNIAL' ? 0.04 : 0.02;
  const wTrans = crop.commercialEvaluation.transportSensitivity === 'HIGH' ? 0.05 : 0.03;
  const wMkt = 0.03;

  const weightSum =
    wLand + wSeed + wFert + wOrg + wIrrig + wLabour + wMach + wPest + wHarv + wStor + wPack + wTrans + wMkt;

  const landPreparation = Math.round(baseTotal * (wLand / weightSum));
  const seedsOrPlantingMaterial = Math.round(baseTotal * (wSeed / weightSum));
  const fertilizers = Math.round(baseTotal * (wFert / weightSum));
  const organicManure = Math.round(baseTotal * (wOrg / weightSum));
  const irrigationAndWater = Math.round(baseTotal * (wIrrig / weightSum));
  const labour = Math.round(baseTotal * (wLabour / weightSum));
  const machinery = Math.round(baseTotal * (wMach / weightSum));
  const pestAndDisease = Math.round(baseTotal * (wPest / weightSum));
  const harvesting = Math.round(baseTotal * (wHarv / weightSum));
  const storage = Math.round(baseTotal * (wStor / weightSum));
  const packaging = Math.round(baseTotal * (wPack / weightSum));
  const transportation = Math.round(baseTotal * (wTrans / weightSum));

  const partialSum =
    landPreparation +
    seedsOrPlantingMaterial +
    fertilizers +
    organicManure +
    irrigationAndWater +
    labour +
    machinery +
    pestAndDisease +
    harvesting +
    storage +
    packaging +
    transportation;

  const marketingCosts = Math.max(0, baseTotal - partialSum);

  return {
    landPreparation,
    seedsOrPlantingMaterial,
    fertilizers,
    organicManure,
    irrigationAndWater,
    labour,
    machinery,
    pestAndDisease,
    harvesting,
    storage,
    packaging,
    transportation,
    marketingCosts
  };
}

function deriveChemicalDependence(crop: CropProfile): 'LOW' | 'MODERATE' | 'HIGH' {
  if (crop.fertilizerPesticideDependence) return crop.fertilizerPesticideDependence;
  if (crop.category === 'PULSE' || crop.category === 'MILLET' || crop.category === 'LEAFY_VEGETABLE' || crop.category === 'MEDICINAL_AROMATIC') {
    return 'LOW';
  }
  if (crop.id.includes('CHILLI') || crop.id.includes('TOMATO') || crop.id.includes('BRINJAL') || crop.id.includes('BANANA')) {
    return 'HIGH';
  }
  return 'MODERATE';
}

function deriveRiskScore(crop: CropProfile): number {
  if (typeof crop.riskScore === 'number') return crop.riskScore;
  let risk = 28;
  if (crop.climateResilience === 'LOW') risk += 22;
  else if (crop.climateResilience === 'MODERATE') risk += 10;
  if (crop.commercialEvaluation.priceVolatility === 'HIGH_SEASONAL_FLUCTUATION') risk += 18;
  else if (crop.commercialEvaluation.priceVolatility === 'MODERATE') risk += 8;
  if (crop.commercialEvaluation.perishability === 'VERY_HIGH_DAILY') risk += 15;
  else if (crop.commercialEvaluation.perishability === 'HIGH_PERISHABLE') risk += 10;
  if (crop.perennialInfo && crop.perennialInfo.gestationYears >= 2) risk += 10;
  return Math.min(85, Math.max(15, risk));
}

function buildAgronomySummary(crop: CropProfile): CropProfile['agronomyPracticeSummary'] {
  if (crop.agronomyPracticeSummary) return crop.agronomyPracticeSummary;
  const approxLitersPerAcre = Math.round(crop.waterRequirementMm * 4047);
  const approxIrrigations =
    crop.waterRequirementMm <= 260
      ? '0–2 light protective irrigations (thrives mostly on residual soil moisture)'
      : crop.waterRequirementMm <= 500
      ? '4–7 scheduled light/drip irrigations'
      : crop.waterRequirementMm <= 850
      ? '8–12 canal/borewell or weekly drip cycles'
      : '15–22 flood/alternate wetting-drying canal irrigations';

  const waterInLitersAndIrrigations = `${crop.waterRequirementMm} mm (~${(approxLitersPerAcre / 100000).toFixed(1)} lakh litres/acre · ${approxIrrigations})`;

  let seedRatePerAcre = 'Standard ANGRAU certified seed rate per local RBK package';
  if (crop.category === 'CEREAL_STAPLE') seedRatePerAcre = '20–25 kg certified paddy seed / 8 kg hybrid maize per acre';
  else if (crop.category === 'PULSE') seedRatePerAcre = '8–10 kg Rhizobium-treated pulse seed per acre';
  else if (crop.category === 'MILLET') seedRatePerAcre = '3–4 kg certified millet seed per acre';
  else if (crop.category === 'OILSEED') seedRatePerAcre = crop.id.includes('SESAME') ? '2.5 kg seed/acre' : '40–45 kg kernels/acre (Groundnut) or 2.5 kg (Sunflower)';
  else if (crop.id === 'CRP-FRU-DRAGON') seedRatePerAcre = '1,800–2,000 rooted stem cuttings planted around 450–500 RCC cement pillars';
  else if (crop.category === 'FRUIT_PERENNIAL') seedRatePerAcre = 'High-density orchard grafts / saplings or tissue-culture plantlets as per ICAR spacing';
  else if (crop.category === 'VEGETABLE' || crop.category === 'LEAFY_VEGETABLE') seedRatePerAcre = '150–400g hybrid vegetable seed or 10–12 kg leafy seed per acre';
  else if (crop.category === 'SPICE') seedRatePerAcre = crop.id.includes('TURMERIC') ? '8–10 quintals treated mother/finger rhizomes per acre on raised beds' : '6–8 kg certified coriander/spice seed per acre';
  else if (crop.category === 'MEDICINAL_AROMATIC') seedRatePerAcre = '4–5 kg seed or 12,000–16,000 rooted slips/acre (organic preferred)';

  const fertilizerAndFymPerAcre =
    crop.category === 'PULSE' || crop.category === 'MILLET'
      ? '2–3 tonnes organic FYM + Rhizobium biofertilizer; very low synthetic NPK needed'
      : crop.category === 'FRUIT_PERENNIAL'
      ? '8–12 tonnes compost/FYM + split NPK + micronutrients (Zn/B) based on Soil Health Card'
      : '4–5 tonnes FYM compost + SHC-calibrated N:P:K + 20 kg/ac Zinc Sulphate basal (if Zn deficient)';

  const machineryAndLabourNote =
    crop.labourIntensity === 'LOW'
      ? 'Low manual labour demand; minimal tractor tillage (ideal where workers are scarce)'
      : crop.labourIntensity === 'MODERATE'
      ? 'Moderate seasonal workers needed for transplanting, pruning, or harvest picking + basic tractor prep'
      : 'High labour required during transplanting & manual pod/fruit harvesting (verify worker availability first)';

  const simpleWhyEn = `${crop.keyAdvantages[0]}. Best suited when soil drainage is ${crop.toleratedDrainage
    .map((d) => d.toLowerCase().replace(/_/g, ' '))
    .join(' or ')}.`;
  const simpleWhyTe = crop.cropNameTelugu + ' — ' + (crop.nutritionalProfile.nutritionalHighlightsTe[0] || 'ప్రత్యామ్నాయ సాగు ఎంపిక.');

  return {
    seedRatePerAcre,
    fertilizerAndFymPerAcre,
    waterInLitersAndIrrigations,
    machineryAndLabourNote,
    simpleWhyEn,
    simpleWhyTe
  };
}

function deriveMinSoilDepth(crop: CropProfile): CropProfile['minSoilDepth'] {
  if (crop.minSoilDepth) return crop.minSoilDepth;
  if (crop.category === 'FRUIT_PERENNIAL' && crop.id !== 'CRP-FRU-DRAGON') return 'DEEP_OVER_75CM';
  if (crop.category === 'LEAFY_VEGETABLE' || crop.category === 'PULSE' || crop.category === 'MILLET') {
    return 'SHALLOW_UNDER_30CM';
  }
  return 'MEDIUM_30_75CM';
}

function deriveSeedAvailability(crop: CropProfile): CropProfile['seedAvailability'] {
  if (crop.seedAvailability) return crop.seedAvailability;
  if (crop.id.includes('DRAGON') || crop.id.includes('EXP') || crop.category === 'MEDICINAL_AROMATIC') {
    return 'NURSERY_OR_EXTERNAL_PREORDER';
  }
  if (crop.category === 'FRUIT_PERENNIAL' || crop.category === 'SPICE') {
    return 'LIMITED_LOCAL_STOCK';
  }
  return 'EASILY_AVAILABLE_RBK_KVK';
}

function deriveManureRequirement(crop: CropProfile): CropProfile['organicManureRequirement'] {
  if (crop.organicManureRequirement) return crop.organicManureRequirement;
  if (crop.category === 'FRUIT_PERENNIAL' || crop.category === 'SPICE' || crop.category === 'VEGETABLE') {
    return 'HIGH';
  }
  if (crop.category === 'PULSE' || crop.category === 'MILLET') return 'LOW';
  return 'MODERATE';
}

export const COMPREHENSIVE_CROP_CATALOGUE: CropProfile[] = RAW_CROP_CATALOGUE.map((crop) => ({
  ...crop,
  investmentBreakdown: crop.investmentBreakdown || compute13LineInvestment(crop),
  fertilizerPesticideDependence: deriveChemicalDependence(crop),
  riskScore: deriveRiskScore(crop),
  minSoilDepth: deriveMinSoilDepth(crop),
  seedAvailability: deriveSeedAvailability(crop),
  organicManureRequirement: deriveManureRequirement(crop),
  buyerChannels: crop.buyerChannels || [
    crop.commercialEvaluation.localPriceHistory.marketName,
    'Local RBK / FPO Collection Desk'
  ],
  agronomyPracticeSummary: buildAgronomySummary(crop),
  nutritionalProfile: {
    ...crop.nutritionalProfile,
    ediblePortionNote:
      crop.nutritionalProfile.ediblePortionNote ||
      'Values benchmarked per 100g edible portion (ICMR-NIN / IFCT 2017). Dietary nutrition supports household wellness and does not diagnose, cure, or treat diseases.'
  }
}));


