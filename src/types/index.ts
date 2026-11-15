/**
 * Annadatha Platform - Type Definitions
 * Designed for Krishna District Pilot (Gudlavalleru Mandal) & Scalable Pan-India Architecture
 */

export type UserRole = 
  | 'INSTITUTION_ADMIN'   // Joint Director of Agriculture / KVK Advisory Head
  | 'AGRI_EXPERT'         // Senior Agronomist / Soil Scientist
  | 'FIELD_OFFICER'       // Village Agriculture Assistant (VAA) / Extension Worker
  | 'FARMER'              // Rythu / Cultivator
  | 'SYSTEM_ADMIN';       // Platform & Data Admin

export type Language = 'en' | 'te';

export type VerificationStatus = 
  | 'VERIFIED'
  | 'EXPERT_APPROVED'
  | 'PENDING_FIELD_VISIT'
  | 'EXPERT_REVIEW_PENDING'
  | 'REVISION_REQUESTED'
  | 'REJECTED'
  | 'CALCULATED_ESTIMATE';

export type DataSourceType = 
  | 'FARMER_ENTERED'
  | 'OFFICIAL_BENCHMARK'
  | 'CALCULATED_ESTIMATE'
  | 'FIELD_VERIFIED'
  | 'EXPERT_APPROVED';

export interface LocationHierarchy {
  state: string;
  district: string;
  mandal: string;
  village: string;
  pincode: string;
}

export interface FarmerProfile {
  id: string; // e.g. AP-KRI-GUD-0182
  fullName: string;
  fullNameTelugu: string;
  fatherOrHusbandName: string;
  phoneNumber: string;
  maskedAadhaar: string; // e.g. XXXX-XXXX-4821
  rythuBharosaId: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  village: string;
  mandal: string;
  district: string;
  landholdingCategory: 'MARGINAL' | 'SMALL' | 'SEMI_MEDIUM' | 'MEDIUM' | 'LARGE';
  totalAcreage: number; // in acres
  primaryCrop: string;
  verificationStatus: VerificationStatus;
  bankLinked: boolean;
  pmKisanEligible: boolean;
  landOwnershipType?: 'OWNER' | 'TENANT_CCRC' | 'OWNER_CUM_TENANT';
  socialCategory?: 'GENERAL' | 'OBC' | 'SC' | 'ST' | 'WOMEN_HEADED';
  previousBenefits?: string[];
  registrationDate: string;
  notes?: string;
  parcelsCount: number;
}

export interface FarmParcel {
  id: string;
  farmerId: string;
  farmerName: string;
  surveyNumber: string;
  khataNumber: string;
  village: string;
  mandal: string;
  acreage: number; // in acres
  cents: number; // 1 acre = 100 cents
  soilType: 'BLACK_COTTON' | 'COASTAL_ALLUVIAL' | 'CLAY_LOAM' | 'RED_LOAM' | 'SANDY_CLAY';
  irrigationType: 'CANAL_KRISHNA_DELTA' | 'BOREWELL' | 'FARM_POND' | 'CANAL_AND_BOREWELL' | 'RAIN_FED';
  waterAvailability: 'PERENNIAL' | 'SEASONAL_KHARIF_RABI' | 'KHARIF_ONLY' | 'DEFICIT';
  waterSalinityEc: number; // dS/m
  latitude: number;
  longitude: number;
  activeCrop?: string;
  cropSeason: 'KHARIF' | 'RABI' | 'SUMMER';
  sourceTag: DataSourceType;
  updatedDate: string;
}

export interface SoilNutrientValue {
  value: number;
  unit: string;
  status: 'VERY_LOW' | 'LOW' | 'OPTIMAL' | 'HIGH' | 'EXCESSIVE';
  optimalRange: string;
  remediation?: string;
}

export interface SoilHealthCard {
  id: string;
  parcelId: string;
  farmerId: string;
  sampleCode: string;
  testDate: string;
  testingLab: string;
  status: 'OFFICIAL_VERIFIED' | 'SELF_ENTERED' | 'PENDING_LAB_CONFIRMATION';
  sourceTag: DataSourceType;
  
  // Physical & Chemical parameters
  pH: SoilNutrientValue;
  ec: SoilNutrientValue; // Electrical Conductivity dS/m
  organicCarbon: SoilNutrientValue; // %
  
  // Primary Nutrients (Macronutrients) kg/ha
  nitrogen: SoilNutrientValue;
  phosphorus: SoilNutrientValue;
  potassium: SoilNutrientValue;
  
  // Secondary Nutrients
  sulphur: SoilNutrientValue;
  calcium: SoilNutrientValue;
  magnesium: SoilNutrientValue;
  
  // Micronutrients (ppm)
  zinc: SoilNutrientValue;
  iron: SoilNutrientValue;
  copper: SoilNutrientValue;
  manganese: SoilNutrientValue;
  boron: SoilNutrientValue;
  
  overallRating: 'HEALTHY' | 'MODERATE' | 'NEEDS_REMEDIATION';
  expertRemediationNotes: string;
}

export interface WeatherCondition {
  currentTemp: number; // Celsius
  minTemp: number;
  maxTemp: number;
  humidity: number; // %
  windSpeed: number; // km/h
  rainfallPast24h: number; // mm
  seasonCumulativeRainfall: number; // mm
  solarRadiation: string; // MJ/m2
  stationLocation: string;
  recordedAt: string;
  sourceTag: DataSourceType;
  alerts: {
    id: string;
    severity: 'WATCH' | 'ADVISORY' | 'WARNING';
    title: string;
    titleTelugu: string;
    description: string;
    validUntil: string;
  }[];
  forecast: {
    date: string;
    dayName: string;
    minTemp: number;
    maxTemp: number;
    rainfallChance: number; // %
    expectedRainfall: number; // mm
    humidity: number;
    advisorySnippet: string;
  }[];
}

export type CropCategory = 
  | 'CEREAL_STAPLE'
  | 'PULSE'
  | 'MILLET'
  | 'OILSEED'
  | 'SPICE'
  | 'FRUIT_PERENNIAL'
  | 'VEGETABLE'
  | 'LEAFY_VEGETABLE'
  | 'MEDICINAL_AROMATIC'
  | 'COMMERCIAL_CASH';

export type RecommendationRankingType = 
  | 'BEST_OVERALL_BALANCE'
  | 'LOWEST_INITIAL_INVESTMENT'
  | 'LOWEST_RECURRING_COST'
  | 'LOWEST_WATER'
  | 'LOWEST_CHEMICAL_DEPENDENCE'
  | 'LOWEST_FINANCIAL_RISK'
  | 'HIGHEST_NUTRITION'
  | 'HIGHEST_NET_PROFIT'
  | 'BEST_RISK_ADJUSTED_PROFIT'
  | 'FASTEST_RETURN'
  | 'BEST_LONG_TERM_INVESTMENT'
  | 'BEST_CROP_COMBINATIONS';

export type SoilDrainageType = 
  | 'WELL_DRAINED'
  | 'MODERATELY_DRAINED'
  | 'POORLY_DRAINED_CLAY'
  | 'WATERLOGGED_LOWLAND';

export type SoilDepthType =
  | 'SHALLOW_UNDER_30CM'
  | 'MEDIUM_30_75CM'
  | 'DEEP_OVER_75CM'
  | 'UNKNOWN';

export type InputAvailabilityStatus =
  | 'EASILY_AVAILABLE_RBK_KVK'
  | 'LIMITED_LOCAL_STOCK'
  | 'NURSERY_OR_EXTERNAL_PREORDER'
  | 'DATA_UNAVAILABLE';

export interface VerifiedSchemeLink {
  schemeId: string;
  code: string;
  nameEn: string;
  nameTe: string;
  verifiedBenefitSummary: string;
  portalUrl: string;
}

export interface CropCombinationPlan {
  id: string;
  titleEn: string;
  titleTe: string;
  systemType: 'SEQUENTIAL_ROTATION' | 'INTERCROPPING_ALLEY' | 'BORDER_BUND_MIXED' | 'EXPERIMENTAL_PILOT_SAFE';
  componentCropIds: string[];
  roleBreakdown: {
    cropName: string;
    areaShareOrSeason: string;
    purposeEn: string;
    purposeTe: string;
  }[];
  combinedInitialOutlayPerAcre: number;
  combinedRecurringCostPerAcre: number;
  combinedWaterMm: number;
  conservativeNetProfitPerAcre: number;
  expectedNetProfitPerAcre: number;
  defensibleNetProfitPerAcre: number;
  financialRiskScore: number; // 0-100 lower is safer
  soilHealthBenefitEn: string;
  soilHealthBenefitTe: string;
  reasonSuitableOrRejectedEn: string;
  reasonSuitableOrRejectedTe: string;
  isSuitable: boolean;
  researchCitations: string[];
  experimentalNote?: string;
}

export type LocationSelectionMode = 'CURRENT_GPS' | 'MANUAL' | 'MAP_PIN';
export type UrbanRuralClassification = 'URBAN' | 'PERI_URBAN' | 'RURAL';
export type LandAreaUnit = 'ACRES' | 'HECTARES' | 'CENTS';

export interface GeoBoundaryPoint {
  lat: number;
  lng: number;
}

export interface ResidenceLocation {
  label: string;
  cityOrTown: string;
  district: string;
  state: string;
  isSeparateFromFarm: boolean;
}

export interface FarmLocationSelection {
  mode: LocationSelectionMode;
  country: string;
  state: string;
  district: string;
  mandal: string;
  village: string;
  locality: string;
  latitude?: number;
  longitude?: number;
  parcelPolygon?: GeoBoundaryPoint[];
  consentToSaveCoordinates: boolean;
  classification: UrbanRuralClassification;
  landUseCategory: string;
  agriculturalLandConfirmed: boolean;
  requiresFarmConfirmation: boolean;
  urbanWarningEn?: string;
  urbanWarningTe?: string;
  detectedAddressText?: string;
  osmStatus?: 'LIVE_NOMINATIM' | 'OFFLINE_BOUNDARY_FALLBACK';
  residenceHub?: ResidenceLocation;
}

export interface PriorityWeights {
  lowestInvestment: number; // 0 - 100
  lowestWater: number;      // 0 - 100
  highestNutrition: number; // 0 - 100
  highestProfit: number;    // 0 - 100
  fastestReturn: number;    // 0 - 100
  lowestRisk: number;       // 0 - 100
}

export interface InvestmentLineItems {
  landPreparation: number;
  seedsOrPlantingMaterial: number;
  fertilizers: number;
  organicManure: number;
  irrigationAndWater: number;
  labour: number;
  machinery: number;
  pestAndDisease: number;
  harvesting: number;
  storage: number;
  packaging: number;
  transportation: number;
  marketingCosts: number;
}

export interface ScenarioProjection {
  label: 'CONSERVATIVE' | 'EXPECTED' | 'FAVOURABLE';
  yieldPerAcre: number;
  sellingPricePerUnit: number;
  grossRevenuePerAcre: number;
  totalExpensePerAcre: number;
  netProfitPerAcre: number;
  roiPct: number;
}

export interface ProfitScenarios {
  conservative: ScenarioProjection;
  expected: ScenarioProjection;
  favourable: ScenarioProjection;
  breakEvenYieldUnits: number;
  breakEvenPricePerUnit: number;
  paybackPeriodText: string;
}

export interface AgentStepLog {
  stepNumber: number;
  titleEn: string;
  titleTe: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'WARNING';
  detail: string;
}

export interface AgentSynthesisPayload {
  executiveSummaryEn: string;
  executiveSummaryTe: string;
  diversificationPlanEn: string;
  diversificationPlanTe: string;
  topRiskMitigations: string[];
  dataGapWarnings: string[];
  expertReviewNotesEn: string;
  agentConfidenceNote: string;
}

export interface DataSourceStatusRecord {
  id: string;
  name: string;
  category: string;
  status: 'LIVE_CONNECTED' | 'VERIFICATION_REQUIRED' | 'CURATED_REFERENCE';
  statusLabel: string;
  details: string;
}

export interface PerennialEconomics {
  isPerennial: boolean;
  establishmentCostPerAcre: number; // Year 1 capital outlay
  gestationYears: number; // Years until first commercial harvest
  annualMaintenanceCostPerAcre: number; // Annual recurring maintenance cost
  paybackPeriodYears: number; // Years to break even
  commercialLifespanYears: number; // Economic lifespan
  annualizedGrossRevenuePerAcre: number; // Steady-state annual gross revenue
  annualizedCostPerAcre: number; // Steady-state annual cost
  annualizedNetProfitPerAcre: number; // Steady-state net profit
  cashFlowTimeline: {
    year: number;
    cashFlowInr: number;
    notes: string;
  }[];
}

export interface NutritionalComposition {
  proteinGPer100g: number;
  dietaryFiberGPer100g: number;
  energyKcalPer100g: number;
  ironMgPer100g: number;
  zincMgPer100g: number;
  calciumMgPer100g?: number;
  vitaminRichness: string;
  nutritionalScore: number; // 0 - 100 benchmark
  nutritionalHighlightsEn: string[];
  nutritionalHighlightsTe: string[];
  ediblePortionNote?: string;
}

export interface CommercialEvaluation {
  costOfCultivationPerAcre: number; // Initial or seasonal cost
  expectedYieldAverage: number;
  yieldUnit: string;
  expectedPricePerUnit: number;
  grossRevenuePerAcre: number;
  estimatedNetProfitPerAcre: number;
  daysToFirstReturn: number; // Days to first harvest / cash flow
  localPriceHistory: {
    min: number;
    max: number;
    modal: number;
    marketName: string;
    trend: 'RISING' | 'STABLE' | 'VOLATILE';
  };
  buyerDemand: 'HIGH_LOCAL_MANDI' | 'STEADY_PROCUREMENT' | 'LOCAL_RYTHU_BAZAR' | 'PROCESSING_UNITS' | 'NICHE_DIRECT';
  perishability: 'LOW_SHELF_STABLE' | 'MODERATE_SHELF' | 'HIGH_PERISHABLE' | 'VERY_HIGH_DAILY';
  transportSensitivity: 'LOW' | 'MEDIUM' | 'HIGH';
  priceVolatility: 'LOW_MSP_BACKED' | 'MODERATE' | 'HIGH_SEASONAL_FLUCTUATION';
}

export type ResearchEvidenceTier =
  | 'PUBLISHED_INSTITUTIONAL_RESEARCH'
  | 'UNIVERSITY_PROFESSOR_TRIAL'
  | 'MULTI_LOCATION_TRIAL'
  | 'KVK_FARMER_FIELD_DEMO'
  | 'COMMERCIAL_FARMER_REPORT'
  | 'UNVERIFIED_CLAIM';

export type ResearchValidationStatus =
  | 'LOCALLY_VALIDATED'
  | 'EXPERIMENTAL'
  | 'NEEDS_LOCAL_TRIAL';

export interface ResearchEvidenceRecord {
  id: string;
  cropId: string;
  cropName: string;
  variety: string;
  evidenceTier: ResearchEvidenceTier;
  validationStatus: ResearchValidationStatus;
  researcherAndTitle: string;
  institution: string;
  researchLocation: string;
  isOutOfStateTrial: boolean;
  soilType: string;
  trialDrainageRequirement: SoilDrainageType;
  climateAndTemperature: string;
  rainfallAndWater: string;
  trialRainfallMm: number;
  seasonAndPeriod: string;
  experimentalDesignAndSampleSize: string;
  cultivationPractices: string;
  inputRequirements: string;
  yieldAndQualityOutcomes: string;
  economicResults: string;
  trialLimitations: string;
  publicationDate: string;
  sourceUrl: string;
  localValidationNotes?: string;
  validatedBy?: string;
  validatedDate?: string;
}

export interface FarmResearchComparison {
  record: ResearchEvidenceRecord;
  matchSummaryEn: string;
  matchSummaryTe: string;
  keyDifferences: string[];
  requiredModifications: string[];
  transferabilityVerdict: 'HIGH_LOCAL_FIT' | 'CONDITIONAL_WITH_MODIFICATIONS' | 'LOW_TRANSFERABILITY_EXPERIMENTAL';
}

export interface DragonFruitSpecificDetails {
  trellisAndPillarSpec: string;
  trellisCostPerAcreInr: number;
  plantingMaterialSpec: string;
  plantingMaterialCostPerAcreInr: number;
  heatAndSunburnSensitivity: string;
  drainageAndRaisedBedProtocol: string;
  organicAndNutrientProtocol: string;
  pestAndDiseaseRisks: string;
  postHarvestShelfLife: string;
  transportAndPackagingNote: string;
}

export interface CropEvaluationResult {
  recommendationStatus: 'HIGHLY_RECOMMENDED' | 'SUITABLE' | 'MARGINAL_WITH_CARE' | 'NOT_RECOMMENDED';
  recommendationStatusTelugu: string;
  reasonsFor: string[];
  reasonsForTelugu: string[];
  reasonsAgainst: string[];
  reasonsAgainstTelugu: string[];
  regionalContingencyPlanRef: string;
  dataDate: string;
  assumptions: string[];
  assumptionsTelugu: string[];
  budgetAffordable: boolean;
  budgetShortfallInr?: number;
  drainageMatch: boolean;
  waterMatch: boolean;
  soilDepthMatch?: boolean;
  soilChemistryNotes?: string[];
  croppingHistoryNotes?: string[];
  inputAndMarketNotes?: string[];
  verifiedSchemes?: VerifiedSchemeLink[];
  researchComparisons?: FarmResearchComparison[];
  requiresExperimentalDisclaimer?: boolean;
}

export interface FarmEvaluationProfile {
  country?: string;
  state: string;
  district: string;
  mandal: string;
  village: string;
  locality?: string;
  acreage: number;
  landAreaValue?: number;
  landAreaUnit?: LandAreaUnit;
  soilType: 'BLACK_COTTON' | 'COASTAL_ALLUVIAL' | 'CLAY_LOAM' | 'RED_LOAM' | 'SANDY_CLAY';
  soilDrainage: SoilDrainageType;
  soilDepth?: SoilDepthType;
  soilDataSource?: 'SHC_LINKED' | 'MANUAL_ENTERED' | 'SHC_UPLOADED' | 'UNKNOWN_NOT_TESTED' | 'UNSPECIFIED';
  soilPh?: number;
  soilEc?: number;
  soilOrganicCarbon?: number;
  soilN?: number;
  soilP?: number;
  soilK?: number;
  soilZn?: number;
  soilFe?: number;
  soilB?: number;
  soilS?: number;
  uploadedShcFileName?: string;
  waterSource: 'CANAL_KRISHNA_DELTA' | 'BOREWELL' | 'FARM_POND' | 'RAIN_FED';
  waterAvailability: 'PERENNIAL' | 'SEASONAL_KHARIF_RABI' | 'KHARIF_ONLY' | 'DEFICIT';
  waterQualityTested?: boolean;
  waterQualityUnknown?: boolean;
  waterPh?: number;
  waterEc?: number;
  annualRainfallMm?: number;
  avgTempC?: number;
  relativeHumidityPct?: number;
  climateZone?: string;
  cycloneOrHeatRisk?: 'HIGH_COASTAL_WIND' | 'MODERATE' | 'HEAT_STRESS_PRONE' | 'UNKNOWN';
  season: 'ALL' | 'KHARIF' | 'RABI' | 'SUMMER' | 'YEAR_ROUND';
  upcomingSeason?: 'KHARIF' | 'RABI' | 'SUMMER' | 'UNKNOWN';
  sowingMonth?: string;
  previousCrop?: string;
  croppingPattern?: 'CONTINUOUS_PADDY' | 'PADDY_PULSE_ROTATION' | 'FALLOW_OR_VIRGIN' | 'HORTICULTURE_OR_VEGETABLE' | 'UNKNOWN';
  pastCropIssues?: string;
  investmentBudgetPerAcre: number;
  budgetMode?: 'LOW_CAPITAL_PRIORITY' | 'MODERATE_CAPITAL' | 'COMMERCIAL_HORTICULTURE' | 'UNKNOWN_FLEXIBLE';
  labourAvailability: 'ABUNDANT' | 'MODERATE' | 'SCARCE_HIGH_WAGE';
  machineryAvailability?: 'FULL_CUSTOM_HIRING' | 'LIMITED_TRACTOR' | 'MANUAL_ONLY';
  seedAndInputAccess?: 'FULL_RBK_DEALER_ACCESS' | 'MODERATE_LOCAL_DEALER' | 'CONSTRAINED_REMOTE' | 'UNKNOWN';
  fymOrCompostAvailable?: 'AVAILABLE_OWN_DAIRY' | 'PURCHASE_LOCALLY' | 'SCARCE' | 'UNKNOWN';
  marketAccess: 'DIRECT_GUDLAVALLERU_AMIC' | 'VIJAYAWADA_COMMERCIAL' | 'LOCAL_RYTHU_BAZAR' | 'FARMGATE_MIDDLEMAN';
  marketDistanceKm?: number;
  coldStorageAvailable?: boolean;
  optionalLeaseOrLandDoc?: string;
  priorityWeights?: PriorityWeights;
}

export interface CropProfile {
  id: string;
  cropName: string;
  cropNameTelugu: string;
  category: CropCategory;
  recommendedVarieties: string[];
  season: 'KHARIF' | 'RABI' | 'YEAR_ROUND' | 'SUMMER';
  durationDays: number;
  waterRequirementMm: number;
  preferredSoil: string[];
  toleratedDrainage: SoilDrainageType[];
  yieldBenchmarkPerAcre: {
    min: number;
    max: number;
    average: number;
    unit: string;
  };
  suitabilityScore: number; // 0 - 100 for current farm condition
  soilCompatibilityScore: number;
  waterCompatibilityScore: number;
  climateResilience: 'HIGH' | 'MODERATE' | 'LOW';
  labourIntensity: 'HIGH' | 'MODERATE' | 'LOW';
  fertilizerPesticideDependence?: 'LOW' | 'MODERATE' | 'HIGH';
  riskScore?: number; // 0 - 100 (higher = riskier)
  minSoilDepth?: SoilDepthType;
  seedAvailability?: InputAvailabilityStatus;
  organicManureRequirement?: 'LOW' | 'MODERATE' | 'HIGH';
  buyerChannels?: string[];
  isExperimentalCrop?: boolean;
  keyAdvantages: string[];
  keyRisks: string[];
  sourceReference: string;
  sourceTag: DataSourceType;

  // Rich metadata for discovery & rankings
  perennialInfo?: PerennialEconomics;
  nutritionalProfile: NutritionalComposition;
  commercialEvaluation: CommercialEvaluation;
  investmentBreakdown?: InvestmentLineItems;
  dragonFruitDetails?: DragonFruitSpecificDetails;
  agronomyPracticeSummary?: {
    seedRatePerAcre: string;
    fertilizerAndFymPerAcre: string;
    waterInLitersAndIrrigations: string;
    machineryAndLabourNote: string;
    simpleWhyEn: string;
    simpleWhyTe: string;
  };
  regionalContingencyPlanRef: string;
  dataDate: string;
  assumptions: string[];
}

export interface ResourceItem {
  category: 'SEED' | 'FERTILIZER' | 'ORGANIC' | 'PESTICIDE' | 'LABOUR' | 'MACHINERY' | 'IRRIGATION';
  itemName: string;
  itemNameTelugu: string;
  quantityPerAcre: number;
  unit: string;
  unitCostInr: number;
  totalCostPerAcre: number;
  applicationStage: 'LAND_PREPARATION' | 'BASAL' | 'TILLERING' | 'FLOWERING' | 'HARVEST';
  sourceBenchmark: string;
  isCustomizable: boolean;
}

export interface MandiPriceRecord {
  id: string;
  commodity: string;
  variety: string;
  marketName: string; // e.g. Gudlavalleru AMC, Machilipatnam AMC, Vijayawada AMC
  district: string;
  minPrice: number; // INR per quintal
  maxPrice: number;
  modalPrice: number;
  arrivalVolumeTonnes: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  trendPercentage: number;
  reportDate: string;
  govtMsp: number; // Minimum Support Price for comparison
  sourceName: string; // e.g. AP Agmarknet Illustrative Dataset
  sourceTag: DataSourceType;
}

export interface ProfitOptimizationPlan {
  id: string;
  farmerId: string;
  parcelId: string;
  cropId: string;
  cropName: string;
  variety: string;
  acreage: number;
  cultivationMethod: 'CONVENTIONAL_PUDDLED' | 'DIRECT_SEEDED_RICE_DSR' | 'DRIP_FERTIGATED';
  
  // Cost breakdown
  seedCost: number;
  fertilizerCost: number;
  organicCost: number;
  pesticideCost: number;
  labourCost: number;
  machineryCost: number;
  irrigationPowerCost: number;
  totalOperationalCost: number;
  costPerAcre: number;
  
  // Yield & Revenue Projections
  expectedYieldPerAcreQuintals: number;
  totalYieldQuintals: number;
  expectedPricePerQuintal: number;
  mainProduceRevenue: number;
  byProductRevenue: number; // Straw/fodder
  grossEstimatedRevenue: number;
  
  // Profitability
  netProfit: number;
  netProfitPerAcre: number;
  returnOnInvestmentPct: number;
  breakEvenPricePerQuintal: number;
  
  status: VerificationStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  expertRemarks?: string;
  sourceTag: DataSourceType;
}

export interface ExpertReviewItem {
  id: string;
  farmerId: string;
  farmerName: string;
  village: string;
  planId: string;
  cropName: string;
  acreage: number;
  submittedDate: string;
  currentStatus: VerificationStatus;
  requestedNutrientPlan: string;
  fieldOfficerNotes?: string;
  agronomistRecommendations?: string;
  actionRequired: 'FIELD_VERIFICATION' | 'AGRONOMIST_SIGN_OFF' | 'REVISED_DOSAGE';
  lastUpdated: string;
}

export interface VillageClusterStat {
  villageName: string;
  registeredFarmers: number;
  cultivatedAcreage: number;
  primaryCrop: string;
  soilTestingCoveragePct: number;
  canalWaterStatus: 'GOOD' | 'ADEQUATE' | 'TAIL_END_DEFICIT';
  fieldVisitsThisMonth: number;
}

// ==========================================
// GOVERNMENT SCHEMES & FARMER BENEFITS TYPES
// ==========================================

export type SchemeCategory = 
  | 'ANDHRA_PRADESH_GOVT'
  | 'CENTRAL_GOVT'
  | 'CROP_INSURANCE'
  | 'INCOME_SUPPORT'
  | 'SEEDS_FERTILIZERS'
  | 'FARM_MACHINERY'
  | 'IRRIGATION_WATER'
  | 'LOANS_CREDIT'
  | 'HORTICULTURE_ALLIED';

export type EligibilityStatus = 
  | 'POTENTIALLY_RELEVANT'
  | 'MORE_INFO_REQUIRED'
  | 'NOT_ELIGIBLE_CONDITIONS'
  | 'OFFICIAL_NOT_VERIFIED';

export type SchemeApplicationStatus = 
  | 'DRAFT'
  | 'SUBMITTED_RBK'
  | 'UNDER_SCRUTINY'
  | 'VERIFIED_APPROVED'
  | 'BENEFIT_DISBURSED'
  | 'REJECTED';

export interface SchemeDocumentRequirement {
  id: string;
  name: string;
  nameTelugu: string;
  mandatory: boolean;
  notes?: string;
}

export interface GovernmentScheme {
  id: string;
  code: string;
  officialName: string;
  officialNameTelugu: string;
  category: SchemeCategory;
  level: 'STATE_AP' | 'CENTRAL';
  department: string;
  departmentTelugu: string;
  purposeAndBenefits: string;
  purposeAndBenefitsTelugu: string;
  benefitAmountOrSubsidy: string;
  benefitAmountOrSubsidyTelugu: string;
  subsidyType: 'DIRECT_BENEFIT_TRANSFER' | 'INPUT_SUBSIDY' | 'LOAN_SUBVENTION' | 'INSURANCE_COVER' | 'EQUIPMENT_GRANT';
  eligibilityDescription: string;
  eligibilityDescriptionTelugu: string;
  criteria: {
    tenancyTypes: ('OWNER' | 'TENANT_CCRC' | 'OWNER_CUM_TENANT' | 'ANY')[];
    maxAcreage?: number;
    minAcreage?: number;
    targetCrops?: string[]; // e.g. ["Paddy", "Black Gram", "Maize", "Horticulture", "All Notified Crops"]
    irrigationTypes?: string[];
    specialConditions?: string[];
  };
  requiredDocuments: SchemeDocumentRequirement[];
  applicationProcedure: string;
  applicationProcedureTelugu: string;
  timeline: {
    isOpen: boolean;
    openingDate?: string;
    closingDate?: string;
    scheduleNote: string;
    scheduleNoteTelugu: string;
  };
  officialPortalUrl: string;
  guidelinesUrl: string;
  lastVerifiedDate: string;
  sourceAuthority: string;
  verificationStatus: 'OFFICIALLY_VERIFIED' | 'VERIFICATION_REQUIRED';
}

export interface SchemeApplicationAuditEntry {
  date: string;
  status: SchemeApplicationStatus;
  updatedBy: string;
  role: string;
  remarks: string;
}

export interface FarmerSchemeApplication {
  id: string;
  applicationNumber: string;
  schemeId: string;
  schemeName: string;
  schemeNameTelugu: string;
  farmerId: string;
  farmerName: string;
  farmerNameTelugu: string;
  village: string;
  mandal: string;
  district: string;
  appliedDate: string;
  currentStatus: SchemeApplicationStatus;
  submittedDocuments: string[];
  pendingDocuments: string[];
  departmentRefNumber?: string;
  disbursedAmount?: number;
  officerRemarks: string;
  lastUpdated: string;
  auditTrail: SchemeApplicationAuditEntry[];
}
