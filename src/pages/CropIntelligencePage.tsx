import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  RecommendationRankingType,
  FarmEvaluationProfile,
  FarmLocationSelection,
  PriorityWeights,
  AgentSynthesisPayload,
  DataSourceStatusRecord,
  ExpertReviewItem
} from '../types';
import { CROP_CATEGORIES_METADATA } from '../data/cropCatalogueData';
import {
  rankCropsForFarm,
  evaluateCropForFarm,
  evaluateCropCombinations,
  EvaluatedCrop,
  DEFAULT_PRIORITY_WEIGHTS,
  build14StepAgentTrace
} from '../utils/cropRecommendationEngine';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { FarmRequirementsWizard } from '../components/crops/FarmRequirementsWizard';
import { InvestmentProfitModal } from '../components/crops/InvestmentProfitModal';
import { FinalFarmerReportModal } from '../components/crops/FinalFarmerReportModal';
import {
  CheckCircle2,
  AlertCircle,
  Droplets,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Scale,
  Search,
  Sliders,
  Sparkles,
  Zap,
  Heart,
  ChevronDown,
  ChevronUp,
  X,
  MapPin,
  Award,
  AlertTriangle,
  Trees,
  FileText,
  Database,
  Send,
  Loader2,
  Bot,
  ShieldCheck,
  BookOpen,
  Repeat,
  ShieldAlert,
  Layers,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CropIntelligencePage: React.FC = () => {
  const {
    language,
    crops,
    parcels,
    soilCards,
    activeFarmer,
    pilotMandal,
    pilotDistrict,
    pilotState,
    researchEvidence,
    weather,
    mandiPrices,
    addReviewItem,
    addToast
  } = useApp();

  const primaryParcel = parcels.find((p) => p.farmerId === activeFarmer?.id) || parcels[0];
  const farmerSoilCards = soilCards.filter((c) => c.farmerId === activeFarmer?.id);

  // Module 1: Intelligent Location State
  const [location, setLocation] = useState<FarmLocationSelection>({
    mode: 'MANUAL',
    country: 'India',
    state: pilotState || 'Andhra Pradesh',
    district: pilotDistrict || 'Krishna',
    mandal: pilotMandal || 'Gudlavalleru',
    village: activeFarmer?.village || primaryParcel?.village || 'Dokiparru',
    locality: primaryParcel ? `Survey #${primaryParcel.surveyNumber}` : 'Eastern Delta Canal Command',
    latitude: primaryParcel?.latitude || 16.3365,
    longitude: primaryParcel?.longitude || 81.0312,
    consentToSaveCoordinates: true,
    classification: 'RURAL',
    landUseCategory: 'Krishna Eastern Delta Canal Command (Rural Cropland)',
    agriculturalLandConfirmed: true,
    requiresFarmConfirmation: false
  });

  // Module 2 & 4: 12-Step Farm Assessment & Multi-Objective Priority Weights
  const [priorityWeights, setPriorityWeights] = useState<PriorityWeights>(DEFAULT_PRIORITY_WEIGHTS);
  const [farmProfile, setFarmProfile] = useState<FarmEvaluationProfile>({
    country: 'India',
    state: pilotState || 'Andhra Pradesh',
    district: pilotDistrict || 'Krishna',
    mandal: pilotMandal || 'Gudlavalleru',
    village: activeFarmer?.village || primaryParcel?.village || 'Dokiparru',
    acreage: primaryParcel?.acreage || 3.0,
    landAreaValue: primaryParcel?.acreage || 3.0,
    landAreaUnit: 'ACRES',
    soilType: primaryParcel?.soilType || 'BLACK_COTTON',
    soilDrainage: 'POORLY_DRAINED_CLAY',
    soilDepth: 'UNKNOWN',
    soilDataSource: farmerSoilCards[0] ? 'SHC_LINKED' : 'UNKNOWN_NOT_TESTED',
    soilPh: farmerSoilCards[0]?.pH.value,
    soilEc: farmerSoilCards[0]?.ec.value,
    soilOrganicCarbon: farmerSoilCards[0]?.organicCarbon.value,
    soilN: farmerSoilCards[0]?.nitrogen.value,
    soilP: farmerSoilCards[0]?.phosphorus.value,
    soilK: farmerSoilCards[0]?.potassium.value,
    soilZn: farmerSoilCards[0]?.zinc.value,
    waterSource: 'CANAL_KRISHNA_DELTA',
    waterAvailability: 'SEASONAL_KHARIF_RABI',
    waterEc: primaryParcel?.waterSalinityEc,
    waterQualityUnknown: false,
    annualRainfallMm: 980,
    climateZone: 'Coastal Sub-Humid Delta',
    cycloneOrHeatRisk: 'MODERATE',
    season: 'ALL',
    sowingMonth: 'June–July',
    croppingPattern: 'CONTINUOUS_PADDY',
    previousCrop: 'Paddy (Samba Mahsuri BPT 5204)',
    pastCropIssues: 'Late November stem borer & moderate neck blast pressure during high humidity.',
    investmentBudgetPerAcre: 35000,
    budgetMode: 'MODERATE_CAPITAL',
    labourAvailability: 'MODERATE',
    machineryAvailability: 'FULL_CUSTOM_HIRING',
    seedAndInputAccess: 'FULL_RBK_DEALER_ACCESS',
    fymOrCompostAvailable: 'PURCHASE_LOCALLY',
    marketAccess: 'DIRECT_GUDLAVALLERU_AMIC',
    marketDistanceKm: 8,
    coldStorageAvailable: false
  });

  // Sync location into farmProfile
  useEffect(() => {
    setFarmProfile((prev) => ({
      ...prev,
      country: location.country,
      state: location.state,
      district: location.district,
      mandal: location.mandal,
      village: location.village,
      locality: location.locality
    }));
  }, [location.country, location.state, location.district, location.mandal, location.village, location.locality]);

  const effectiveFarmProfile = useMemo<FarmEvaluationProfile>(
    () => ({ ...farmProfile, priorityWeights }),
    [farmProfile, priorityWeights]
  );

  // Ranking & Filters
  const [rankingType, setRankingType] = useState<RecommendationRankingType>('BEST_OVERALL_BALANCE');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFarmCustomizer, setShowFarmCustomizer] = useState(true);
  const [expandedCropId, setExpandedCropId] = useState<string | null>(null);

  // Modals
  const [compareCropIds, setCompareCropIds] = useState<string[]>([
    'CRP-PAD-BPT5204',
    'CRP-PUL-LBG752',
    'CRP-MIL-KORRA',
    'CRP-SPI-CORIANDER',
    'CRP-FRU-MORINGA'
  ]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [detailModalCrop, setDetailModalCrop] = useState<EvaluatedCrop | null>(null);
  const [showFinalReportModal, setShowFinalReportModal] = useState(false);
  const [showDataSourcesModal, setShowDataSourcesModal] = useState(false);

  // Module 8 & 9: AI Agent Execution & Source Status
  const [agentRunning, setAgentRunning] = useState(false);
  const [aiSynthesis, setAiSynthesis] = useState<AgentSynthesisPayload | null>(null);
  const [aiErrorNotice, setAiErrorNotice] = useState<string | null>(null);
  const [aiSynthesisSuccess, setAiSynthesisSuccess] = useState<boolean | null>(null);
  const [showAgentSteps, setShowAgentSteps] = useState(false);
  const [sourcesStatus, setSourcesStatus] = useState<DataSourceStatusRecord[]>([]);

  useEffect(() => {
    fetch('/api/sources/status')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.sources) setSourcesStatus(data.sources);
      })
      .catch(() => {
        // Fallback transparent notice if offline
      });
  }, []);

  // Recommendations require a real farm parcel, a linked lab soil report,
  // weather data, and dated market prices. Missing inputs must never be guessed.
  const hasVerifiedFarmInputs = Boolean(
    primaryParcel && farmerSoilCards.length > 0 && weather && mandiPrices.length > 0
  );

  const rankedEvaluatedCrops = useMemo(() => {
    if (!hasVerifiedFarmInputs) return [];
    return rankCropsForFarm(crops, effectiveFarmProfile, rankingType, researchEvidence);
  }, [crops, effectiveFarmProfile, rankingType, researchEvidence, hasVerifiedFarmInputs]);

  const cropCombinations = useMemo(() => {
    if (!hasVerifiedFarmInputs) return [];
    return evaluateCropCombinations(crops, effectiveFarmProfile, researchEvidence);
  }, [crops, effectiveFarmProfile, researchEvidence, hasVerifiedFarmInputs]);

  const displayedCrops = useMemo(() => {
    return rankedEvaluatedCrops.filter((item) => {
      const matchCat = selectedCategory === 'ALL' || item.crop.category === selectedCategory;
      const matchSearch =
        item.crop.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.crop.cropNameTelugu.includes(searchQuery) ||
        item.crop.recommendedVarieties.some((v) => v.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [rankedEvaluatedCrops, selectedCategory, searchQuery]);

  const agentTraceSteps = useMemo(() => {
    return build14StepAgentTrace(location, effectiveFarmProfile, rankedEvaluatedCrops, aiSynthesisSuccess);
  }, [location, effectiveFarmProfile, rankedEvaluatedCrops, aiSynthesisSuccess]);

  const isLocationBlockedForCrops =
    location.classification === 'URBAN' || !location.agriculturalLandConfirmed || !hasVerifiedFarmInputs;

  const handleRunAiAgent = async () => {
    if (isLocationBlockedForCrops) {
      addToast(
        'warning',
        'Confirm Agricultural Parcel',
        'Crop analysis is locked until the actual agricultural parcel, lab soil report, verified weather, and dated mandi prices are available. Missing values are not guessed.'
      );
      return;
    }

    setAgentRunning(true);
    setShowAgentSteps(true);
    setAiErrorNotice(null);

    const suitableTop = rankedEvaluatedCrops
      .filter((e) => e.evaluation.recommendationStatus !== 'NOT_RECOMMENDED')
      .slice(0, 6)
      .map((e) => ({
        cropName: e.crop.cropName,
        category: e.crop.category,
        season: e.crop.season,
        isPerennial: Boolean(e.crop.perennialInfo?.isPerennial),
        totalInvestmentPerAcre: e.totalInvestmentPerAcre,
        expectedAnnualNetProfitPerAcre: e.effectiveAnnualProfit,
        defensibleNetProfitPerAcre: e.defensibleNetProfit,
        financialRiskScore: e.financialRiskScore,
        conservativeNetProfitPerAcre: e.scenarios.conservative.netProfitPerAcre,
        waterMm: e.crop.waterRequirementMm,
        nutritionScore: e.crop.nutritionalProfile.nutritionalScore,
        compositeScore: e.compositeScore,
        verifiedSchemeCount: e.evaluation.verifiedSchemes?.length || 0,
        requiresExperimentalDisclaimer: Boolean(e.evaluation.requiresExperimentalDisclaimer)
      }));

    const rejectedTop = rankedEvaluatedCrops
      .filter((e) => e.evaluation.recommendationStatus === 'NOT_RECOMMENDED')
      .slice(0, 5)
      .map((e) => ({
        cropName: e.crop.cropName,
        rejectionReason: e.evaluation.reasonsAgainst[0]
      }));

    const combinationsSummary = cropCombinations
      .filter((c) => c.isSuitable)
      .slice(0, 3)
      .map((c) => ({
        title: c.titleEn,
        systemType: c.systemType,
        combinedOutlayPerAcre: c.combinedInitialOutlayPerAcre,
        defensibleNetProfitPerAcre: c.defensibleNetProfitPerAcre,
        financialRiskScore: c.financialRiskScore
      }));

    const researchSummary = researchEvidence.slice(0, 8).map((r) => ({
      cropName: r.cropName,
      institution: r.institution,
      location: r.researchLocation,
      tier: r.evidenceTier,
      validationStatus: r.validationStatus,
      isOutOfStateTrial: r.isOutOfStateTrial
    }));

    try {
      const resp = await fetch('/api/agent/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location,
          farmProfile: effectiveFarmProfile,
          priorityWeights,
          topRankedSummary: suitableTop,
          combinationsSummary,
          rejectedSummary: rejectedTop,
          researchEvidenceSummary: researchSummary
        })
      });

      const data = await resp.json();
      if (resp.ok && data.available && data.synthesis) {
        setAiSynthesis(data.synthesis);
        setAiSynthesisSuccess(true);
        addToast('success', 'AI Agent Synthesis Complete', 'Research-aware bilingual advisory generated.');
      } else {
        setAiSynthesis(null);
        setAiSynthesisSuccess(false);
        setAiErrorNotice(
          data.error || 'AI server synthesis unavailable. Deterministic 10-ranking evaluation remains active.'
        );
      }
    } catch {
      setAiSynthesis(null);
      setAiSynthesisSuccess(false);
      setAiErrorNotice(
        'Could not reach server AI synthesis endpoint. Deterministic 10-objective rankings remain fully functional.'
      );
    } finally {
      setAgentRunning(false);
    }
  };

  const handleSendToExpertReview = (evaluated: EvaluatedCrop) => {
    const today = new Date().toISOString().split('T')[0];
    const newItem: ExpertReviewItem = {
      id: `REV-${Date.now().toString().slice(-5)}`,
      farmerId: activeFarmer?.id || 'AP-KRI-GUD-0182',
      farmerName: activeFarmer?.fullName || 'Pilot Farmer',
      village: location.village,
      planId: `PLAN-${evaluated.crop.id}`,
      cropName: evaluated.crop.cropName,
      acreage: farmProfile.acreage,
      submittedDate: today,
      currentStatus: 'EXPERT_REVIEW_PENDING',
      requestedNutrientPlan: `Soil Source: ${farmProfile.soilDataSource || 'UNSPECIFIED'} | Budget: ₹${farmProfile.investmentBudgetPerAcre.toLocaleString()}/ac | 13-Line Total: ₹${evaluated.totalInvestmentPerAcre.toLocaleString()}/ac`,
      fieldOfficerNotes: `Location confirmed (${location.classification}): ${location.village}, ${location.mandal}. Expected annual profit ₹${evaluated.effectiveAnnualProfit.toLocaleString()}/ac (Conservative ₹${evaluated.scenarios.conservative.netProfitPerAcre.toLocaleString()}/ac).`,
      agronomistRecommendations: aiSynthesis?.expertReviewNotesEn,
      actionRequired: 'AGRONOMIST_SIGN_OFF',
      lastUpdated: today
    };
    addReviewItem(newItem);
  };

  const toggleCompare = (cropId: string) => {
    if (compareCropIds.includes(cropId)) {
      if (compareCropIds.length > 1) {
        setCompareCropIds(compareCropIds.filter((id) => id !== cropId));
      }
    } else {
      if (compareCropIds.length < 5) {
        setCompareCropIds([...compareCropIds, cropId]);
      } else {
        setCompareCropIds([...compareCropIds.slice(1), cropId]);
      }
    }
  };

  const comparedCropsList = crops.filter((c) => compareCropIds.includes(c.id));

  const rankingTabs: {
    key: RecommendationRankingType;
    labelEn: string;
    labelTe: string;
    icon: React.ElementType;
    descriptionEn: string;
    tradeOffEn: string;
  }[] = [
    {
      key: 'BEST_OVERALL_BALANCE',
      labelEn: 'Best Overall Balance',
      labelTe: 'సమగ్ర సమతుల్య ఎంపిక',
      icon: Scale,
      descriptionEn: 'Weighted multi-objective score across your priorities',
      tradeOffEn: 'Balances defensible profit, financial risk, water, and budget without extremes; may skip peak-profit crops if capital/weather risk is high.'
    },
    {
      key: 'LOWEST_INITIAL_INVESTMENT',
      labelEn: 'Lowest Investment',
      labelTe: 'అత్యల్ప ప్రారంభ పెట్టుబడి',
      icon: DollarSign,
      descriptionEn: 'Lowest seed/pillar/land-prep capital outlay per acre',
      tradeOffEn: 'Protects farmers from upfront borrowing or debt, though gross income ceiling is modest compared to trellised orchards or intensive vegetables.'
    },
    {
      key: 'LOWEST_RECURRING_COST',
      labelEn: 'Lowest Recurring Costs',
      labelTe: 'అత్యల్ప నిర్వహణ ఖర్చు',
      icon: Repeat,
      descriptionEn: 'Minimal ongoing labour, spray, harvesting & mandi fees',
      tradeOffEn: 'Reduces seasonal cash-flow pressure and worker shortage risk; zero-till pulses, millets, and established tree crops rank best.'
    },
    {
      key: 'LOWEST_WATER',
      labelEn: 'Lowest Water Requirement',
      labelTe: 'అత్యల్ప నీటి అవసరం',
      icon: Droplets,
      descriptionEn: 'Minimum seasonal crop water demand (mm)',
      tradeOffEn: 'Survives canal tail-end cuts and deficit rainfall on residual moisture, trading irrigated paddy/banana biomass for drought resilience.'
    },
    {
      key: 'HIGHEST_NUTRITION',
      labelEn: 'Highest Nutritional Value',
      labelTe: 'అత్యధిక పోషక విలువలు',
      icon: Heart,
      descriptionEn: 'ICMR-NIN protein, iron, zinc, calcium & fibre score',
      tradeOffEn: 'High nutritional value supports family diet quality (never medical cures) and does NOT guarantee top cash profit without specialty buyers.'
    },
    {
      key: 'HIGHEST_NET_PROFIT',
      labelEn: 'Highest Defensible Profit',
      labelTe: 'అత్యధిక నిలకడైన లాభం',
      icon: TrendingUp,
      descriptionEn: 'Downside-weighted defensible net profit (not revenue alone)',
      tradeOffEn: 'Blends Conservative & Expected net margins after spoilage/experimental hair-cuts; perishable or unverified trials are discounted.'
    },
    {
      key: 'LOWEST_FINANCIAL_RISK',
      labelEn: 'Lowest Financial Risk',
      labelTe: 'అత్యల్ప ఆర్థిక నష్టభయం',
      icon: ShieldAlert,
      descriptionEn: 'Lowest downside risk score & strongest conservative floor',
      tradeOffEn: 'Prioritizes MSP-backed, shelf-stable, low-debt, locally validated crops over speculative high-investment vegetables or experimental trials.'
    },
    {
      key: 'FASTEST_RETURN',
      labelEn: 'Fastest Realistic Income',
      labelTe: 'వేగవంతమైన రాబడి',
      icon: Zap,
      descriptionEn: 'Shortest days from sowing to realistic cash recovery',
      tradeOffEn: 'Recovers working capital in 30–90 days (leafy greens/pulses), provided daily or weekly local buyer off-take is confirmed.'
    },
    {
      key: 'BEST_LONG_TERM_INVESTMENT',
      labelEn: 'Best Long-Term Investment',
      labelTe: 'దీర్ఘకాలిక ఉద్యాన ఎంపిక',
      icon: Trees,
      descriptionEn: 'Multi-year perennials evaluated on gestation & payback',
      tradeOffEn: 'Delivers strong 5–20 year cash flows ONLY if farmer survives Year-1–2 setup investment, soil depth (>75 cm), and drainage checks.'
    },
    {
      key: 'BEST_CROP_COMBINATIONS',
      labelEn: 'Best Combinations & Rotations',
      labelTe: 'ఉత్తమ పంటల కలయిక & మార్పిడి',
      icon: Layers,
      descriptionEn: 'Multi-crop sequences, intercrops & safe pilot mixes',
      tradeOffEn: 'Combines complementary seasonal/intercrop plots to restore soil nitrogen, cut pest cycles, and avoid single-crop market crashes.'
    }
  ];

  const activeRankingMeta = rankingTabs.find((t) => t.key === rankingType) || rankingTabs[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {language === 'te'
                ? 'అన్నదాత AI రైతు స్నేహపూర్వక పంట ఆవిష్కరణ & లాభదాయకత ఏజెంట్'
                : 'Research-Driven AI Crop Discovery & Profit Optimization'}
            </h1>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              {crops.length} Crops · {researchEvidence.length} Research Trials
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? '12-దశల సులభమైన పొలం విశ్లేషణ, పరిశోధనా ఆధారాల పోలిక, 10 లక్ష్య ర్యాంకింగ్‌లు & 20-అంశాల రైతు నివేదిక'
              : '12-step farmer-friendly assessment wizard, 6-tier Research Evidence comparison, 10 distinct objective rankings & 20-point reports.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/research"
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-lg text-xs font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-700" />
            <span>{language === 'te' ? 'పరిశోధనా లైబ్రరీ' : 'Research Library'}</span>
          </Link>

          <button
            type="button"
            onClick={() => setShowDataSourcesModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>Data Sources</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFarmCustomizer(!showFarmCustomizer)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              showFarmCustomizer
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showFarmCustomizer ? 'Hide 12-Step Wizard' : 'Open 12-Step Wizard'}</span>
          </button>

          <button
            type="button"
            onClick={handleRunAiAgent}
            disabled={agentRunning || isLocationBlockedForCrops}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
          >
            {agentRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bot className="w-3.5 h-3.5" />}
            <span>{agentRunning ? 'Synthesizing...' : 'Run AI Agent'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFinalReportModal(true)}
            disabled={isLocationBlockedForCrops}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-semibold cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Final Farmer Report</span>
          </button>
        </div>
      </div>

      <DataDisclaimerBanner
        sourceNote="Provenance Rule: Official Govt Sources, Published Research, Farmer-Entered Inputs, Expert Observations, Model Assumptions & Calculated Estimates are always kept strictly separated."
        compact
      />

      {/* COMPACT ACTIVE FARM CONTEXT BAR (Always Visible) */}
      <div className="p-3 sm:p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>
              {location.village}, {location.mandal}, {location.district}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                location.classification === 'URBAN'
                  ? 'bg-rose-100 text-rose-900 border-rose-300'
                  : location.classification === 'PERI_URBAN'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              {location.classification}
            </span>
          </div>

          <span className="text-slate-300">|</span>
          <span className="text-slate-700">
            <strong>{farmProfile.acreage} Acres</strong> · {farmProfile.soilType.replace(/_/g, ' ')} (
            {farmProfile.soilDrainage.replace(/_/g, ' ')})
          </span>

          <span className="text-slate-300">|</span>
          <span
            className={`font-semibold ${
              farmProfile.soilDataSource === 'UNKNOWN_NOT_TESTED' || farmProfile.soilDataSource === 'UNSPECIFIED'
                ? 'text-amber-800'
                : 'text-emerald-800'
            }`}
          >
            Soil Test:{' '}
            {farmProfile.soilDataSource === 'UNKNOWN_NOT_TESTED' || farmProfile.soilDataSource === 'UNSPECIFIED'
              ? 'Not Tested Yet (Never Inferred)'
              : `${farmProfile.soilDataSource} (pH ${farmProfile.soilPh ?? 'N/A'})`}
          </span>

          <span className="text-slate-300">|</span>
          <span className="text-slate-700">
            Budget: <strong>₹{farmProfile.investmentBudgetPerAcre.toLocaleString()}/ac</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowFarmCustomizer(!showFarmCustomizer)}
          className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
        >
          {showFarmCustomizer ? 'Collapse Wizard ▲' : 'Edit 12 Steps ▼'}
        </button>
      </div>

      {/* Explicit "Data unavailable" Honesty Guard Notice when critical tests are unentered */}
      {(farmProfile.soilDataSource === 'UNKNOWN_NOT_TESTED' ||
        farmProfile.soilDataSource === 'UNSPECIFIED' ||
        farmProfile.soilDepth === 'UNKNOWN' ||
        farmProfile.waterQualityUnknown) && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-950">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Verified Field Data Status — Missing Fields Marked &ldquo;Data unavailable&rdquo;:</span>{' '}
            <span>
              {farmProfile.soilDataSource === 'UNKNOWN_NOT_TESTED' || farmProfile.soilDataSource === 'UNSPECIFIED'
                ? 'Soil Lab NPK/pH/EC: Data unavailable (request free RBK/KVK soil test). '
                : ''}
              {farmProfile.soilDepth === 'UNKNOWN'
                ? 'Soil Depth Profile: Data unavailable (verify rooting depth >=75 cm via 2-ft trial pit before orchards). '
                : ''}
              {farmProfile.waterQualityUnknown
                ? 'Irrigation Salinity EC: Data unavailable (verify bore/canal salinity before salt-sensitive crops). '
                : ''}
              Live AGMARKNET Today Spot &amp; Live IMD Station Telemetry: Data unavailable (historical mandi bands shown).
            </span>
          </div>
        </div>
      )}

      {/* A. 12-STEP FARMER-FRIENDLY FARM REQUIREMENTS WIZARD */}
      {showFarmCustomizer && (
        <FarmRequirementsWizard
          language={language}
          location={location}
          onChangeLocation={setLocation}
          farmProfile={farmProfile}
          onChangeFarm={setFarmProfile}
          farmerSoilCards={farmerSoilCards}
          priorityWeights={priorityWeights}
          onChangeWeights={setPriorityWeights}
          onFinishWizard={() => {
            setShowFarmCustomizer(false);
            addToast(
              'success',
              language === 'te' ? 'పొలం వివరాలు సేవ్ అయ్యాయి' : 'Farm Requirements Applied',
              'All 10 crop objective rankings & research trial comparisons updated.'
            );
          }}
        />
      )}

      {/* MODULE 8: AI AGENT 14-STEP WORKFLOW & GEMINI SYNTHESIS PANEL */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span className="text-sm font-bold text-slate-900">
              {language === 'te'
                ? 'మాడ్యూల్ 8: AI నిర్ణయ సహాయ ఏజెంట్ (14 దశల పారదర్శక విశ్లేషణ)'
                : 'Module 8: AI Agent 14-Step Execution Pipeline & Synthesis'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAgentSteps(!showAgentSteps)}
              className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showAgentSteps ? 'Hide 14-Step Trace' : 'Inspect 14-Step Trace'}</span>
              {showAgentSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {aiErrorNotice && (
          <div className="m-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>{aiErrorNotice}</span>
          </div>
        )}

        {aiSynthesis && (
          <div className="p-4 sm:p-5 bg-emerald-50/60 border-b border-emerald-200 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-emerald-700" />
                <span>AI Agent Bilingual Advisory Synthesis</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold border border-emerald-300">
                {aiSynthesis.agentConfidenceNote}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1.5">
                <div className="font-bold text-slate-900">Executive Summary (EN / TE)</div>
                <p className="text-slate-700 leading-relaxed">{aiSynthesis.executiveSummaryEn}</p>
                <p className="text-emerald-950 leading-relaxed font-medium pt-1 border-t border-slate-100">
                  {aiSynthesis.executiveSummaryTe}
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1.5">
                <div className="font-bold text-slate-900">Diversification &amp; Risk Mitigations</div>
                <p className="text-slate-700 leading-relaxed">
                  {language === 'te' ? aiSynthesis.diversificationPlanTe : aiSynthesis.diversificationPlanEn}
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                  {aiSynthesis.topRiskMitigations.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {showAgentSteps && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 text-[11px]">
            {agentTraceSteps.map((st) => (
              <div
                key={st.stepNumber}
                className={`p-2.5 rounded-xl border space-y-1 ${
                  st.status === 'COMPLETED'
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : st.status === 'WARNING'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Step {st.stepNumber}</span>
                  {st.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  ) : st.status === 'WARNING' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                <div className="font-semibold text-slate-900 leading-tight">
                  {language === 'te' ? st.titleTe : st.titleEn}
                </div>
                <div className="text-[10px] text-slate-600 leading-snug">{st.detail}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GUARDED RECOMMENDATIONS SECTION (Paused when Urban City Centre is selected) */}
      {isLocationBlockedForCrops ? (
        <div className="p-8 bg-rose-50/70 border-2 border-dashed border-rose-300 rounded-2xl text-center space-y-3">
          <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
          <h3 className="text-base font-bold text-rose-950">
            {location.classification === 'URBAN'
              ? 'Urban Location Guardrail Active — Select Your Rural Agricultural Parcel Above'
              : 'Farm Confirmation Needed — Confirm Agricultural Land Status Above'}
          </h3>
          <p className="text-xs text-rose-900 max-w-2xl mx-auto leading-relaxed">
            Annadatha never generates field crop advisories for urban municipal city centres such as Vijayawada Benz Circle or unconfirmed device residences. Open Step 1 of the Farm Assessment Wizard above to keep your city address as Residence / Market Hub and specify your rural parcel to unlock all 10 rankings.
          </p>
        </div>
      ) : (
        <>
          {/* 10 DISTINCT MULTI-OBJECTIVE RANKINGS & EXPLICIT TRADE-OFFS */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {language === 'te'
                  ? '10 ప్రత్యేక రైతు లక్ష్య ర్యాంకింగ్‌లు & లాభ-నష్ట సమీకరణాలు'
                  : '10 Distinct Objective Rankings (No Single Metric Hides Trade-Offs)'}
              </span>
              <span className="text-xs text-slate-500">
                {displayedCrops.length} crops ranked for {location.village}, {location.district}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {rankingTabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = rankingType === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setRankingType(tab.key)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm ring-1 ring-emerald-800'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`} />
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />}
                    </div>
                    <div>
                      <div className={`font-bold text-xs leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {language === 'te' ? tab.labelTe : tab.labelEn}
                      </div>
                      <div className={`text-[10px] mt-0.5 line-clamp-2 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                        {tab.descriptionEn}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Trade-Off Callout */}
            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-start gap-2.5 text-xs text-indigo-950">
              <Scale className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Trade-Off Notice ({language === 'te' ? activeRankingMeta.labelTe : activeRankingMeta.labelEn}):</span>{' '}
                <span>{activeRankingMeta.tradeOffEn}</span>
              </div>
            </div>
          </div>

          {/* Conditional Display: #10 Multi-Crop Combinations & Rotations OR Individual Crop Candidates */}
          {rankingType === 'BEST_CROP_COMBINATIONS' ? (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-950">
                <div>
                  <strong className="font-bold">
                    {language === 'te'
                      ? 'బహుళ పంటల కలయిక & పంట మార్పిడి వ్యవస్థలు (6 నమూనాలు విశ్లేషించబడ్డాయి)'
                      : 'Multi-Crop Combinations & Sequence Rotations (6 Farm-Level Systems Evaluated)'}
                  </strong>
                  <p className="text-[11px] text-emerald-900 mt-0.5">
                    Evaluates seasonal crop rotations, orchard alley intercropping, and 0.25-ac experimental safety hedges against your farm&apos;s drainage, water, and budget.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setRankingType('BEST_OVERALL_BALANCE')}
                  className="px-3 py-1.5 bg-white border border-emerald-300 rounded-lg font-semibold text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                >
                  View Individual Crops ({crops.length}) &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {cropCombinations.map((combo) => (
                  <div
                    key={combo.id}
                    className={`rounded-2xl border p-5 shadow-2xs space-y-3 ${
                      combo.isSuitable ? 'bg-white border-emerald-300' : 'bg-rose-50/30 border-rose-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          combo.isSuitable
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                        }`}
                      >
                        {combo.isSuitable ? 'FARM-VALIDATED SYSTEM' : 'NOT SUITABLE FOR FARM'}
                      </span>
                      <span className="text-[10px] font-bold bg-indigo-50 text-indigo-900 border border-indigo-200 px-2 py-0.5 rounded">
                        {combo.systemType.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {language === 'te' ? combo.titleTe : combo.titleEn}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Defensible Net</div>
                        <div className="font-bold text-emerald-800 font-mono">
                          ₹{combo.defensibleNetProfitPerAcre.toLocaleString()}/ac
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Outlay / Recur</div>
                        <div className="font-bold text-slate-900 font-mono">
                          ₹{combo.combinedInitialOutlayPerAcre.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Rec: ₹{combo.combinedRecurringCostPerAcre.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Combined Water</div>
                        <div className="font-bold text-blue-900 font-mono">{combo.combinedWaterMm} mm</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Financial Risk</div>
                        <div className="font-bold text-slate-900 font-mono">{combo.financialRiskScore}/100</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Floor: ₹{combo.conservativeNetProfitPerAcre.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {combo.roleBreakdown.map((m) => (
                        <div
                          key={m.cropName}
                          className="p-2 bg-slate-50/70 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]"
                        >
                          <div>
                            <strong className="text-slate-900">{m.cropName.split(' (')[0]}</strong>{' '}
                            <span className="text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-semibold">
                              {m.areaShareOrSeason}
                            </span>
                          </div>
                          <span className="text-slate-600">{language === 'te' ? m.purposeTe : m.purposeEn}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-emerald-950 bg-emerald-50/60 p-2 rounded-lg border border-emerald-200">
                      <strong>Soil &amp; Pest Benefit:</strong>{' '}
                      {language === 'te' ? combo.soilHealthBenefitTe : combo.soilHealthBenefitEn}
                    </p>

                    {!combo.isSuitable && (
                      <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-900 font-medium">
                        {language === 'te' ? combo.reasonSuitableOrRejectedTe : combo.reasonSuitableOrRejectedEn}
                      </div>
                    )}

                    {combo.experimentalNote && (
                      <div className="p-2 bg-amber-50 border border-amber-300 rounded-lg text-[11px] text-amber-950">
                        {combo.experimentalNote}
                      </div>
                    )}

                    <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <strong>Research Provenance:</strong> {combo.researchCitations.join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Search & Category Filter Tabs */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('ALL')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      selectedCategory === 'ALL'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    All Candidates ({rankedEvaluatedCrops.length})
                  </button>
                  {CROP_CATEGORIES_METADATA.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        selectedCategory === cat.key
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {language === 'te' ? cat.labelTe : cat.labelEn}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-52">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={language === 'te' ? 'పంట లేదా వంగడం వెతకండి...' : 'Search crop or variety...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* EVALUATED CROP CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedCrops.map((evaluated) => {
                  const {
                    crop,
                    evaluation,
                    compositeScore,
                    defensibleNetProfit,
                    financialRiskScore,
                    totalInvestmentPerAcre,
                    recurringOperationalCostPerAcre
                  } = evaluated;
                  const isComparing = compareCropIds.includes(crop.id);
                  const isExpanded = expandedCropId === crop.id;
                  const isPerennial = Boolean(crop.perennialInfo?.isPerennial);
                  const primaryResearch = evaluation.researchComparisons?.[0];
                  const isExperimental = Boolean(evaluation.requiresExperimentalDisclaimer);
                  const verifiedSchemes = evaluation.verifiedSchemes || [];

              let statusBorder = 'border-slate-200 hover:border-slate-300';
              let statusBg = 'bg-white';
              if (evaluation.recommendationStatus === 'HIGHLY_RECOMMENDED') {
                statusBorder = 'border-emerald-300 hover:border-emerald-500';
              } else if (evaluation.recommendationStatus === 'NOT_RECOMMENDED') {
                statusBorder = 'border-rose-200 bg-rose-50/20';
              } else if (evaluation.recommendationStatus === 'MARGINAL_WITH_CARE') {
                statusBorder = 'border-amber-200 bg-amber-50/20';
              }

              return (
                <div
                  key={crop.id}
                  className={`rounded-2xl border ${statusBorder} ${statusBg} p-5 shadow-2xs transition-all flex flex-col justify-between space-y-3.5`}
                >
                  {/* Card Top */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                            evaluation.recommendationStatus === 'HIGHLY_RECOMMENDED'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : evaluation.recommendationStatus === 'SUITABLE'
                              ? 'bg-blue-100 text-blue-900 border-blue-300'
                              : evaluation.recommendationStatus === 'MARGINAL_WITH_CARE'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}
                        >
                          {evaluation.recommendationStatus === 'HIGHLY_RECOMMENDED' && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          )}
                          {evaluation.recommendationStatus === 'NOT_RECOMMENDED' && (
                            <AlertTriangle className="w-3 h-3 text-rose-700" />
                          )}
                          <span>
                            {language === 'te'
                              ? evaluation.recommendationStatusTelugu
                              : evaluation.recommendationStatus.replace(/_/g, ' ')}
                          </span>
                        </span>

                        {isExperimental ? (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded-md">
                            Experimental / Pilot Trial Only
                          </span>
                        ) : primaryResearch ? (
                          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-900 border border-indigo-200 px-1.5 py-0.5 rounded-md">
                            {primaryResearch.record.institution.split(' ')[0]} Validated
                          </span>
                        ) : null}

                        {isPerennial ? (
                          <span className="text-[10px] font-semibold bg-teal-100 text-teal-900 border border-teal-300 px-1.5 py-0.5 rounded-md">
                            Perennial ({crop.perennialInfo?.gestationYears}y)
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md">
                            {crop.season} ({crop.durationDays}d)
                          </span>
                        )}

                        <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md">
                          Fit: {compositeScore}/100
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCompare(crop.id)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded border transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                          isComparing
                            ? 'bg-emerald-700 text-white border-emerald-800'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                      </button>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {language === 'te' ? crop.cropNameTelugu : crop.cropName}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Varieties: {crop.recommendedVarieties.slice(0, 3).join(', ')}
                      </div>
                    </div>

                    {/* Simple Plain-Language "Why" First */}
                    {crop.agronomyPracticeSummary && (
                      <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200/80 leading-relaxed">
                        {language === 'te'
                          ? crop.agronomyPracticeSummary.simpleWhyTe
                          : crop.agronomyPracticeSummary.simpleWhyEn}
                      </p>
                    )}
                  </div>

                  {/* Dragon Fruit Institutional Conditional Box */}
                  {crop.dragonFruitDetails && (
                    <div className="p-2.5 bg-amber-50/80 border border-amber-300 rounded-xl space-y-1 text-[11px] text-amber-950">
                      <div className="flex justify-between font-bold text-amber-900">
                        <span>ICAR-NIASM / IIHR Conditional Advisory</span>
                        <span>Payback: {crop.perennialInfo?.paybackPeriodYears || 3.2} yrs</span>
                      </div>
                      <p className="text-[10px] text-amber-900 leading-snug">
                        Never auto-recommended: requires {crop.dragonFruitDetails.trellisAndPillarSpec}, 35–45 cm raised beds on heavy clay &amp; summer shade net (&gt;38°C sunscald guard).
                      </p>
                    </div>
                  )}

                  {/* Generic Perennial Warning (if not Dragon Fruit) */}
                  {!crop.dragonFruitDetails && isPerennial && crop.perennialInfo && (
                    <div className="p-2.5 bg-teal-50/70 border border-teal-200 rounded-xl space-y-1 text-[11px] text-teal-950">
                      <div className="flex justify-between font-bold text-teal-900">
                        <span>Perennial Orchard Metrics</span>
                        <span>Payback: {crop.perennialInfo.paybackPeriodYears} yrs</span>
                      </div>
                      <div className="text-[10px] text-teal-800">
                        Year-1 Setup: ₹{crop.perennialInfo.establishmentCostPerAcre.toLocaleString()} · Maint: ₹
                        {crop.perennialInfo.annualMaintenanceCostPerAcre.toLocaleString()}/yr · Annualized return below.
                      </div>
                    </div>
                  )}

                  {/* Core Metrics */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        Defensible Net Profit
                      </span>
                      <div className="text-sm font-bold text-emerald-800 tabular-nums">
                        ₹{defensibleNetProfit.toLocaleString()} <span className="text-[10px] font-normal">/ ac</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Fin Risk: {financialRiskScore}/100
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Water &amp; Inputs</span>
                      <div className="text-sm font-bold text-blue-900 tabular-nums">{crop.waterRequirementMm} mm</div>
                      <span className="text-[10px] text-slate-500">
                        Chem Dep: {crop.fertilizerPesticideDependence || 'MODERATE'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        Initial / Total Outlay
                      </span>
                      <div className="text-xs font-bold text-slate-900 font-mono">
                        ₹{totalInvestmentPerAcre.toLocaleString()} / ac
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Recur: ₹{recurringOperationalCostPerAcre.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        Nutrition &amp; Budget
                      </span>
                      <div className="text-xs font-bold text-slate-800">
                        Nutri: <span className="text-emerald-800">{crop.nutritionalProfile.nutritionalScore}/100</span>
                      </div>
                      {evaluation.budgetAffordable ? (
                        <span className="text-[10px] text-emerald-700 font-medium">
                          Fits budget · {crop.commercialEvaluation.daysToFirstReturn}d
                        </span>
                      ) : (
                        <span className="text-[10px] text-rose-700 font-medium">
                          Over budget +₹{(evaluation.budgetShortfallInr || 0).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {verifiedSchemes.length > 0 && (
                    <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-[10px] text-emerald-950">
                      <span className="font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Verified Govt Schemes: {verifiedSchemes.length}</span>
                      </span>
                      <span className="truncate text-emerald-800 font-medium">
                        {language === 'te' ? verifiedSchemes[0].nameTe : verifiedSchemes[0].nameEn}
                      </span>
                    </div>
                  )}

                  {/* Match & Rejection Highlights */}
                  <div className="space-y-1.5 text-xs">
                    {evaluation.reasonsFor.length > 0 && (
                      <div className="flex items-start gap-1.5 text-emerald-900 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">
                          {language === 'te' ? evaluation.reasonsForTelugu[0] : evaluation.reasonsFor[0]}
                        </span>
                      </div>
                    )}
                    {evaluation.reasonsAgainst.length > 0 && (
                      <div className="flex items-start gap-1.5 text-rose-900 bg-rose-50/80 p-2 rounded-lg border border-rose-200">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight font-medium">
                          {language === 'te' ? evaluation.reasonsAgainstTelugu[0] : evaluation.reasonsAgainst[0]}
                        </span>
                      </div>
                    )}
                    {evaluation.croppingHistoryNotes && evaluation.croppingHistoryNotes.length > 0 && (
                      <div className="flex items-start gap-1.5 text-indigo-950 bg-indigo-50/70 p-2 rounded-lg border border-indigo-200 text-[10px]">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-700 shrink-0 mt-0.5" />
                        <span>{evaluation.croppingHistoryNotes[0]}</span>
                      </div>
                    )}
                  </div>

                  {/* Interactive Actions: Open Full 20-Point Modal + Research + Expert Review */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDetailModalCrop(evaluated)}
                        className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-[11px] font-bold cursor-pointer text-center"
                      >
                        20-Point Details &amp; Research
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendToExpertReview(evaluated)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-[11px] font-semibold cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Expert Review</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedCropId(isExpanded ? null : crop.id)}
                      className="w-full text-center py-1 text-[11px] font-semibold text-slate-600 hover:text-emerald-800 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Research & Field Notes' : 'Research Comparison, Soil & Mandi Band'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[11px]">
                        <div>
                          <span className="font-bold text-emerald-900 flex items-center gap-1 uppercase text-[10px]">
                            <Award className="w-3.5 h-3.5" />
                            ICAR-CRIDA Reference
                          </span>
                          <p className="text-slate-700 mt-0.5">{crop.regionalContingencyPlanRef}</p>
                        </div>
                        {primaryResearch && (
                          <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-950 space-y-0.5">
                            <div className="font-bold text-[10px] uppercase">
                              Research Fit: {primaryResearch.transferabilityVerdict.replace(/_/g, ' ')}
                            </div>
                            <p className="text-[10px]">
                              {language === 'te' ? primaryResearch.matchSummaryTe : primaryResearch.matchSummaryEn}
                            </p>
                          </div>
                        )}
                        {evaluation.soilChemistryNotes && evaluation.soilChemistryNotes.length > 0 && (
                          <div className="p-2 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-950">
                            <strong>Soil Status:</strong> {evaluation.soilChemistryNotes.join(' ')}
                          </div>
                        )}
                        {evaluation.inputAndMarketNotes && evaluation.inputAndMarketNotes.length > 0 && (
                          <div className="p-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-800">
                            <strong>Inputs &amp; Buyers:</strong> {evaluation.inputAndMarketNotes.join(' ')}
                          </div>
                        )}
                        <div className="text-slate-600">
                          <strong>Mandi Band ({crop.commercialEvaluation.localPriceHistory.marketName}):</strong> ₹
                          {crop.commercialEvaluation.localPriceHistory.min.toLocaleString()} – ₹
                          {crop.commercialEvaluation.localPriceHistory.max.toLocaleString()} /{' '}
                          {crop.commercialEvaluation.yieldUnit} ({crop.dataDate})
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Nav */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <Link to="/resources" className="font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1">
                      <span>Plan Inputs</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      to="/profit"
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-semibold transition-colors"
                    >
                      Profit Analyzer &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
      )}

      {/* SIDE-BY-SIDE 5-CROP COMPARISON MODAL */}
      {showComparisonModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Multi-Crop Side-by-Side Comparison Matrix</h2>
                  <p className="text-xs text-slate-500">
                    Comparing {comparedCropsList.length} crops for {location.village} (Budget: ₹
                    {farmProfile.investmentBudgetPerAcre.toLocaleString()}/ac)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-x-auto p-4 sm:p-6 text-xs">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-left">
                    <th className="p-3 bg-slate-100 font-bold text-slate-800 w-44 sticky left-0 z-10">
                      Attribute / Metric
                    </th>
                    {comparedCropsList.map((crop) => {
                      const evalResult = evaluateCropForFarm(crop, effectiveFarmProfile, researchEvidence);
                      return (
                        <th key={crop.id} className="p-3 font-bold text-slate-900 min-w-48 bg-slate-50">
                          <div className="text-sm font-bold">{crop.cropName}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{crop.category.replace(/_/g, ' ')}</div>
                          <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded border bg-white">
                            {evalResult.recommendationStatus.replace(/_/g, ' ')}
                          </span>
                          {evalResult.requiresExperimentalDisclaimer && (
                            <span className="mt-1 ml-1 inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                              Experimental
                            </span>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 sticky left-0">Season / Cycle</td>
                    {comparedCropsList.map((c) => (
                      <td key={c.id} className="p-3">
                        {c.perennialInfo
                          ? `Perennial (${c.perennialInfo.gestationYears}y gestation · ${c.perennialInfo.commercialLifespanYears}y life)`
                          : `${c.season} (${c.durationDays} days)`}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 sticky left-0">Water Requirement</td>
                    {comparedCropsList.map((c) => (
                      <td key={c.id} className="p-3 font-mono font-bold text-blue-900">
                        {c.waterRequirementMm} mm
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 sticky left-0">Initial Outlay / Ac</td>
                    {comparedCropsList.map((c) => (
                      <td key={c.id} className="p-3 font-mono font-bold">
                        ₹
                        {(
                          c.perennialInfo
                            ? c.perennialInfo.establishmentCostPerAcre
                            : c.commercialEvaluation.costOfCultivationPerAcre
                        ).toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 sticky left-0">Annualized Net Profit</td>
                    {comparedCropsList.map((c) => (
                      <td key={c.id} className="p-3 font-mono font-bold text-emerald-900">
                        ₹
                        {(
                          c.perennialInfo
                            ? c.perennialInfo.annualizedNetProfitPerAcre
                            : c.commercialEvaluation.estimatedNetProfitPerAcre
                        ).toLocaleString()}
                        /ac
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 sticky left-0">Chemical Dependence &amp; Risk</td>
                    {comparedCropsList.map((c) => (
                      <td key={c.id} className="p-3 text-slate-700">
                        Chem: <strong>{c.fertilizerPesticideDependence || 'MODERATE'}</strong> · Risk: {c.riskScore ?? 35}/100
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-slate-50 sticky left-0">Nutrition Density Score</td>
                    {comparedCropsList.map((c) => (
                      <td key={c.id} className="p-3 font-bold text-emerald-800">
                        {c.nutritionalProfile.nutritionalScore}/100 (Prot {c.nutritionalProfile.proteinGPer100g}g)
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5, 6, 7 MODAL */}
      {detailModalCrop && (
        <InvestmentProfitModal
          evaluatedCrop={detailModalCrop}
          acreage={farmProfile.acreage}
          language={language}
          onClose={() => setDetailModalCrop(null)}
        />
      )}

      {/* MODULE 10 FINAL REPORT MODAL */}
      {showFinalReportModal && (
        <FinalFarmerReportModal
          language={language}
          farmerName={activeFarmer?.fullName || 'Pilot Cultivator'}
          location={location}
          farmProfile={effectiveFarmProfile}
          allEvaluated={rankedEvaluatedCrops}
          combinations={cropCombinations}
          aiSynthesis={aiSynthesis}
          sources={sourcesStatus}
          onClose={() => setShowFinalReportModal(false)}
          onSendToExpertReview={(pick) => {
            handleSendToExpertReview(pick);
            setShowFinalReportModal(false);
          }}
        />
      )}

      {/* MODULE 9 TRANSPARENT DATA SOURCES MODAL */}
      {showDataSourcesModal && (
        <div className="fixed inset-0 bg-slate-900/65 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Module 9: Data Sources, Live API Connectivity &amp; Verification Status
                  </h2>
                  <p className="text-xs text-slate-600">
                    Unconnected external government portals are clearly labeled Verification Required.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDataSourcesModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5 text-xs">
              {sourcesStatus.map((src) => (
                <div key={src.id} className="p-3 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-900">{src.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        src.status === 'LIVE_CONNECTED'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : src.status === 'CURATED_REFERENCE'
                          ? 'bg-blue-100 text-blue-900 border-blue-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {src.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700">{src.statusLabel}</div>
                  <p className="text-[11px] text-slate-600">{src.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Compare Pill */}
      {compareCropIds.length >= 2 && !showComparisonModal && !isLocationBlockedForCrops && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>
              <strong>{compareCropIds.length}</strong> of 5 crops selected
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowComparisonModal(true)}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg text-white cursor-pointer"
          >
            Compare Matrix &rarr;
          </button>
          <button
            type="button"
            onClick={() => setCompareCropIds([])}
            className="text-slate-400 hover:text-white underline cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
