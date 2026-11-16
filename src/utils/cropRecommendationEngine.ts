/**
 * Annadatha Platform - Research-Driven AI Crop Discovery & 10-Objective Optimization Engine
 * Evaluates all candidates against farmer requirements, cropping history, SHC chemistry,
 * water availability, 13-line investment costs, 3 profit scenarios, and Research Evidence trials.
 *
 * CRITICAL PRINCIPLE:
 * Out-of-state trials (e.g. ICAR-NIASM Baramati) are compared explicitly against the
 * farmer's actual parcel conditions — never treated as automatic local proof.
 */

import {
  CropProfile,
  FarmEvaluationProfile,
  CropEvaluationResult,
  RecommendationRankingType,
  ProfitScenarios,
  ScenarioProjection,
  PriorityWeights,
  FarmLocationSelection,
  AgentStepLog,
  ResearchEvidenceRecord,
  FarmResearchComparison,
  VerifiedSchemeLink,
  CropCombinationPlan
} from '../types';
import { OFFICIAL_SCHEMES } from '../data/schemesData';

export interface EvaluatedCrop {
  crop: CropProfile;
  evaluation: CropEvaluationResult;
  compositeScore: number;
  effectiveAnnualProfit: number;
  riskAdjustedProfit: number;
  defensibleNetProfit: number;
  financialRiskScore: number;
  scenarios: ProfitScenarios;
  totalInvestmentPerAcre: number;
  recurringOperationalCostPerAcre: number;
}

export const DEFAULT_PRIORITY_WEIGHTS: PriorityWeights = {
  lowestInvestment: 70,
  lowestWater: 65,
  highestNutrition: 60,
  highestProfit: 85,
  fastestReturn: 65,
  lowestRisk: 75
};

export function sumInvestmentLines(crop: CropProfile): {
  totalAll13Lines: number;
  initialEstablishmentOrInputCost: number;
  recurringAndMarketingCost: number;
} {
  const breakdown = crop.investmentBreakdown;
  if (!breakdown) {
    const fallback = crop.perennialInfo
      ? crop.perennialInfo.establishmentCostPerAcre
      : crop.commercialEvaluation.costOfCultivationPerAcre;
    return {
      totalAll13Lines: fallback,
      initialEstablishmentOrInputCost: Math.round(fallback * 0.72),
      recurringAndMarketingCost: Math.round(fallback * 0.28)
    };
  }

  const initialEstablishmentOrInputCost =
    breakdown.landPreparation +
    breakdown.seedsOrPlantingMaterial +
    breakdown.fertilizers +
    breakdown.organicManure +
    breakdown.irrigationAndWater +
    breakdown.machinery;

  const recurringAndMarketingCost =
    breakdown.labour +
    breakdown.pestAndDisease +
    breakdown.harvesting +
    breakdown.storage +
    breakdown.packaging +
    breakdown.transportation +
    breakdown.marketingCosts;

  return {
    totalAll13Lines: initialEstablishmentOrInputCost + recurringAndMarketingCost,
    initialEstablishmentOrInputCost,
    recurringAndMarketingCost
  };
}

export function computeProfitScenarios(crop: CropProfile): ProfitScenarios {
  const isPerennial = Boolean(crop.perennialInfo?.isPerennial);
  const expectedYield = crop.commercialEvaluation.expectedYieldAverage;
  const expectedPrice = crop.commercialEvaluation.expectedPricePerUnit;

  const totalExpensePerAcre = isPerennial
    ? crop.perennialInfo!.annualizedCostPerAcre
    : sumInvestmentLines(crop).totalAll13Lines;

  const expectedGross = isPerennial
    ? crop.perennialInfo!.annualizedGrossRevenuePerAcre
    : crop.commercialEvaluation.grossRevenuePerAcre;

  const buildScenario = (
    label: ScenarioProjection['label'],
    yieldMult: number,
    priceMult: number,
    costMult: number
  ): ScenarioProjection => {
    const y = Number((expectedYield * yieldMult).toFixed(1));
    const p = Math.round(expectedPrice * priceMult);
    const baseProductGross = expectedYield * expectedPrice;
    const byProductAllowance = Math.max(0, expectedGross - baseProductGross);
    const gross = Math.round(y * p + byProductAllowance * yieldMult);
    const expense = Math.round(totalExpensePerAcre * costMult);
    const net = gross - expense;
    const roi = expense > 0 ? Number(((net / expense) * 100).toFixed(1)) : 0;

    return {
      label,
      yieldPerAcre: y,
      sellingPricePerUnit: p,
      grossRevenuePerAcre: gross,
      totalExpensePerAcre: expense,
      netProfitPerAcre: net,
      roiPct: roi
    };
  };

  const conservative = buildScenario('CONSERVATIVE', 0.88, 0.88, 1.05);
  const expected = buildScenario('EXPECTED', 1.0, 1.0, 1.0);
  const favourable = buildScenario('FAVOURABLE', 1.1, 1.1, 1.0);

  const breakEvenYieldUnits =
    expectedPrice > 0 ? Number((totalExpensePerAcre / expectedPrice).toFixed(1)) : 0;
  const breakEvenPricePerUnit =
    expectedYield > 0 ? Math.round(totalExpensePerAcre / expectedYield) : 0;

  const paybackPeriodText = isPerennial
    ? `${crop.perennialInfo!.paybackPeriodYears} years (multi-year orchard payback; first harvest Year ${crop.perennialInfo!.gestationYears})`
    : `${crop.commercialEvaluation.daysToFirstReturn} days (single harvest cycle)`;

  return {
    conservative,
    expected,
    favourable,
    breakEvenYieldUnits,
    breakEvenPricePerUnit,
    paybackPeriodText
  };
}

export function compareResearchWithFarm(
  records: ResearchEvidenceRecord[],
  crop: CropProfile,
  farm: FarmEvaluationProfile
): FarmResearchComparison[] {
  const matched = records.filter((r) => r.cropId === crop.id);
  const farmRain = farm.annualRainfallMm || 980;

  return matched.map((rec) => {
    const keyDifferences: string[] = [];
    const requiredModifications: string[] = [];

    if (rec.isOutOfStateTrial) {
      keyDifferences.push(
        `Out-of-state research (${rec.researchLocation}) differs agro-climatically from ${farm.mandal} (${farm.district}, ${farm.state}).`
      );
    }

    if (rec.trialDrainageRequirement !== farm.soilDrainage) {
      keyDifferences.push(
        `Trial used ${rec.trialDrainageRequirement.replace(/_/g, ' ')} soil, whereas your farm is ${farm.soilDrainage.replace(/_/g, ' ')}.`
      );
      if (rec.trialDrainageRequirement === 'WELL_DRAINED') {
        requiredModifications.push(
          'Construct 35–45 cm raised beds mixed with coarse sand/organic compost + perimeter stormwater drains to prevent root rot.'
        );
      }
    }

    if (Math.abs(rec.trialRainfallMm - farmRain) > 200) {
      keyDifferences.push(
        `Trial rainfall (${rec.trialRainfallMm} mm) differs from local ${farm.village} rainfall (~${farmRain} mm/yr).`
      );
      if (farmRain > rec.trialRainfallMm + 200) {
        requiredModifications.push(
          'Higher coastal humidity & monsoon volume require preventive fungicidal scheduling and storm drainage.'
        );
      }
    }

    if (crop.id === 'CRP-FRU-DRAGON' && (farm.cycloneOrHeatRisk === 'HIGH_COASTAL_WIND' || farm.district === 'Krishna')) {
      requiredModifications.push(
        'Coastal AP adaptation (ICAR-NIASM / YSRHU): Reinforce RCC pole anchoring against cyclones + install 30% summer shade net over top rings for May sunburn protection.'
      );
    }

    let transferabilityVerdict: FarmResearchComparison['transferabilityVerdict'] = 'HIGH_LOCAL_FIT';
    if (rec.validationStatus !== 'LOCALLY_VALIDATED' || rec.isOutOfStateTrial) {
      transferabilityVerdict =
        keyDifferences.length >= 2 ? 'LOW_TRANSFERABILITY_EXPERIMENTAL' : 'CONDITIONAL_WITH_MODIFICATIONS';
    } else if (keyDifferences.length > 0) {
      transferabilityVerdict = 'CONDITIONAL_WITH_MODIFICATIONS';
    }

    const matchSummaryEn =
      transferabilityVerdict === 'HIGH_LOCAL_FIT'
        ? `Locally validated trial (${rec.institution}) aligns closely with your parcel conditions.`
        : transferabilityVerdict === 'CONDITIONAL_WITH_MODIFICATIONS'
        ? `Partial match: ${rec.institution} evidence requires specific field engineering/modifications listed below.`
        : `Experimental / Out-of-state (${rec.researchLocation}): Do not treat as automatic proof for ${farm.village}; small pilot trial advised first.`;

    const matchSummaryTe =
      transferabilityVerdict === 'HIGH_LOCAL_FIT'
        ? `స్థానిక పరిశోధన (${rec.institution}) మీ పొలం పరిస్థితులకు నేరుగా సరిపోతుంది.`
        : `ఇతర ప్రాంత/ప్రయోగాత్మక పరిశోధన — మీ పొలంలో మార్పులు చేసిన తర్వాతే చిన్న విస్తీర్ణంలో పరీక్షించాలి.`;

    return {
      record: rec,
      matchSummaryEn,
      matchSummaryTe,
      keyDifferences,
      requiredModifications,
      transferabilityVerdict
    };
  });
}

export function getVerifiedSchemesForCrop(
  crop: CropProfile,
  farm: FarmEvaluationProfile
): VerifiedSchemeLink[] {
  const verifiedOnly = OFFICIAL_SCHEMES.filter((s) => s.verificationStatus === 'OFFICIALLY_VERIFIED');
  const matches: VerifiedSchemeLink[] = [];

  for (const scheme of verifiedOnly) {
    const targetCrops = (scheme.criteria.targetCrops || []).map((t) => t.toLowerCase());
    const cropLower = crop.cropName.toLowerCase();
    const isHorti = crop.category === 'FRUIT_PERENNIAL' || crop.category === 'VEGETABLE' || crop.category === 'SPICE';
    const isPulseOrMillet = crop.category === 'PULSE' || crop.category === 'MILLET' || crop.category === 'OILSEED';

    const stateOk =
      scheme.level === 'CENTRAL' ||
      (farm.state || '').toLowerCase().includes('andhra');
    if (!stateOk) continue;

    const cropMatched =
      targetCrops.includes('all notified crops') ||
      targetCrops.some((t) => cropLower.includes(t) || t.includes(cropLower.split(' ')[0])) ||
      (isHorti && (scheme.category === 'HORTICULTURE_ALLIED' || scheme.category === 'IRRIGATION_WATER')) ||
      (isPulseOrMillet && scheme.category === 'SEEDS_FERTILIZERS');

    if (cropMatched) {
      matches.push({
        schemeId: scheme.id,
        code: scheme.code,
        nameEn: scheme.officialName,
        nameTe: scheme.officialNameTelugu,
        verifiedBenefitSummary: scheme.benefitAmountOrSubsidy,
        portalUrl: scheme.officialPortalUrl
      });
    }
  }

  return matches.slice(0, 3);
}

export function evaluateCropForFarm(
  crop: CropProfile,
  farm: FarmEvaluationProfile,
  researchLibrary: ResearchEvidenceRecord[] = []
): CropEvaluationResult {
  const reasonsFor: string[] = [];
  const reasonsForTelugu: string[] = [];
  const reasonsAgainst: string[] = [];
  const reasonsAgainstTelugu: string[] = [];
  const assumptions: string[] = [];
  const assumptionsTelugu: string[] = [];
  const soilChemistryNotes: string[] = [];
  const croppingHistoryNotes: string[] = [];
  const inputAndMarketNotes: string[] = [];

  // 1. Soil Drainage & Waterlogging Evaluation
  const drainageMatch = crop.toleratedDrainage.includes(farm.soilDrainage);
  if (drainageMatch) {
    if (farm.soilDrainage === 'POORLY_DRAINED_CLAY' || farm.soilDrainage === 'WATERLOGGED_LOWLAND') {
      reasonsFor.push(`Tolerates slow-draining / lowland clay conditions without severe root asphyxiation.`);
      reasonsForTelugu.push(`బంకమట్టి మరియు లోతట్టు తేమ పరిస్థితులను సమర్థవంతంగా తట్టుకుంటుంది.`);
    } else {
      reasonsFor.push(`Farm soil drainage (${farm.soilDrainage.replace(/_/g, ' ')}) aligns with crop root aeration.`);
      reasonsForTelugu.push(`నేల నీటి పారుదల స్వభావం పంట వేరు వ్యవస్థకు అనుకూలంగా ఉంది.`);
    }
  } else {
    if (farm.soilDrainage === 'POORLY_DRAINED_CLAY' || farm.soilDrainage === 'WATERLOGGED_LOWLAND') {
      reasonsAgainst.push(
        `CRITICAL DRAINAGE MISMATCH: Vulnerable to root/collar rot in ${farm.soilDrainage.replace(/_/g, ' ')}. Raised mounds/drainage trenches mandatory if attempted.`
      );
      reasonsAgainstTelugu.push(
        `తీవ్ర ప్రతికూలత: నీరు నిలిచే బంకమట్టి నేలల్లో వేరుకుళ్ళు ప్రమాదం ఎక్కువ. ఎత్తైన మడులు లేకుండా సిఫార్సు చేయబడదు.`
      );
    } else {
      reasonsAgainst.push(`Soil drainage (${farm.soilDrainage.replace(/_/g, ' ')}) falls outside ideal range.`);
      reasonsAgainstTelugu.push(`ప్రస్తుత నేల నీటి పారుదల ఈ పంటకు అనువైనది కాదు.`);
    }
  }

  // 2. Water Availability, Source & Water Quality
  let waterMatch = true;
  if (farm.waterAvailability === 'DEFICIT' && crop.waterRequirementMm > 420) {
    waterMatch = false;
    reasonsAgainst.push(
      `Water demand (${crop.waterRequirementMm} mm) exceeds deficit irrigation supply (${farm.waterSource.replace(/_/g, ' ')}).`
    );
    reasonsAgainstTelugu.push(
      `నీటి అవసరం (${crop.waterRequirementMm} మి.మీ.) ప్రస్తుతం ఉన్న లోటు నీటి వనరుల కంటే ఎక్కువ.`
    );
  } else if (
    farm.waterAvailability === 'KHARIF_ONLY' &&
    crop.season === 'RABI' &&
    farm.waterSource === 'RAIN_FED' &&
    crop.waterRequirementMm > 300
  ) {
    waterMatch = false;
    reasonsAgainst.push(`Rabi cycle requires supplemental moisture not assured under Kharif-only rainfed farms.`);
    reasonsAgainstTelugu.push(`ఖరీఫ్ వర్షాధార పొలంలో రబీ పంటకు తగినంత నీటి భద్రత లేదు.`);
  } else if (crop.waterRequirementMm > 900 && farm.waterSource === 'RAIN_FED') {
    waterMatch = false;
    reasonsAgainst.push(`High water requirement (${crop.waterRequirementMm} mm) cannot rely on rainfed-only moisture.`);
    reasonsAgainstTelugu.push(`అధిక నీటి అవసరం (${crop.waterRequirementMm} మి.మీ.) వర్షాధార సాగుకు సరిపోదు.`);
  } else {
    reasonsFor.push(`Water demand (${crop.waterRequirementMm} mm) matches ${farm.waterSource.replace(/_/g, ' ')}.`);
    reasonsForTelugu.push(`నీటి అవసరం (${crop.waterRequirementMm} మి.మీ.) సాగునీటి వనరుకు సరిపోతుంది.`);
  }

  if (farm.waterQualityTested && typeof farm.waterEc === 'number' && farm.waterEc > 2.2) {
    if (crop.category === 'FRUIT_PERENNIAL' || crop.id.includes('CHILLI') || crop.id.includes('TOMATO')) {
      reasonsAgainst.push(`Irrigation water salinity EC (${farm.waterEc} dS/m) poses salt stress risk for sensitive horticulture.`);
      reasonsAgainstTelugu.push(`సాగునీటి ఉప్పదనం (EC ${farm.waterEc} dS/m) ఉద్యాన పంటలకు నష్టం కలిగించవచ్చు.`);
    }
  }

  // 3. Soil Test Chemistry (Strictly never inferred from GPS)
  const hasSoilChemistry =
    farm.soilDataSource &&
    farm.soilDataSource !== 'UNSPECIFIED' &&
    farm.soilDataSource !== 'UNKNOWN_NOT_TESTED';

  if (hasSoilChemistry) {
    if (typeof farm.soilPh === 'number') {
      if (farm.soilPh > 8.3) {
        soilChemistryNotes.push(`Alkaline soil pH (${farm.soilPh}): apply gypsum/organic manure before planting.`);
        if (crop.category === 'FRUIT_PERENNIAL' && !crop.id.includes('GUAVA')) {
          reasonsAgainst.push(`High alkaline soil pH (${farm.soilPh}) limits iron/zinc uptake without gypsum reclamation.`);
          reasonsAgainstTelugu.push(`నేల క్షారత్వం (pH ${farm.soilPh}) ఎక్కువగా ఉన్నందున జిప్సం శుద్ధి అవసరం.`);
        }
      } else if (farm.soilPh < 5.8) {
        soilChemistryNotes.push(`Acidic soil pH (${farm.soilPh}): apply agricultural lime prior to sowing.`);
      } else {
        soilChemistryNotes.push(`Soil pH (${farm.soilPh}) is in favourable agronomic band.`);
      }
    }
    if (typeof farm.soilEc === 'number' && farm.soilEc > 2.0) {
      soilChemistryNotes.push(`Elevated soil EC (${farm.soilEc} dS/m): choose salt-tolerant variety and flush salts.`);
    }
    if (typeof farm.soilZn === 'number' && farm.soilZn < 0.6 && crop.category === 'CEREAL_STAPLE') {
      soilChemistryNotes.push(`Zinc deficient (${farm.soilZn} ppm): apply 20 kg/ac Zinc Sulphate 21% basal.`);
    }
  } else {
    soilChemistryNotes.push(
      'Soil test values not yet known ("I don\'t know / Not tested"). Annadatha will NOT invent NPK/pH values — obtain free SHC testing at local Rythu Bharosa Kendra (RBK) / KVK Ghantasala before buying fertilizers.'
    );
  }

  // 4. Cropping History & Pest/Nutrient Break Check
  if (farm.croppingPattern === 'CONTINUOUS_PADDY' && crop.category === 'PULSE') {
    croppingHistoryNotes.push(
      'Strong Rotation Fit: Following continuous paddy with nitrogen-fixing pulses breaks stem borer/BPH cycles and restores 30–35 kg N/ac.'
    );
    reasonsFor.push('Breaks continuous paddy monoculture & restores soil nitrogen.');
    reasonsForTelugu.push('నిరంతర వరి సాగు తర్వాత పప్పుధాన్యాలు వేయడం వల్ల భూసారం పెరిగి చీడపీడలు తగ్గుతాయి.');
  } else if (
    farm.previousCrop &&
    ['Chilli', 'Tomato', 'Brinjal'].some((s) => farm.previousCrop!.toLowerCase().includes(s.toLowerCase())) &&
    ['CRP-COM-CHILLI', 'CRP-VEG-TOMATO', 'CRP-VEG-BRINJAL'].includes(crop.id)
  ) {
    croppingHistoryNotes.push(
      `Solanaceous Rotation Warning: Previous crop (${farm.previousCrop}) shares wilt/thrips pathogens; rotate with pulses or millets first.`
    );
    reasonsAgainst.push(`Continuous solanaceous cropping (${farm.previousCrop} → ${crop.cropName}) elevates wilt & virus carryover.`);
    reasonsAgainstTelugu.push(`వరుసగా ఒకే జాతి పంటలు సాగు చేయడం వల్ల వైరస్ మరియు ఎండు తెగులు ప్రమాదం పెరుగుతుంది.`);
  }

  // 5. Investment Budget Feasibility
  const initialCost = crop.perennialInfo
    ? crop.perennialInfo.establishmentCostPerAcre
    : sumInvestmentLines(crop).totalAll13Lines;

  const budgetFlexible = farm.budgetMode === 'UNKNOWN_FLEXIBLE';
  const budgetAffordable = budgetFlexible || farm.investmentBudgetPerAcre >= initialCost;
  const budgetShortfallInr = budgetAffordable ? undefined : initialCost - farm.investmentBudgetPerAcre;

  if (budgetAffordable && !budgetFlexible) {
    reasonsFor.push(
      `Capital requirement (₹${initialCost.toLocaleString()}/ac) fits your ₹${farm.investmentBudgetPerAcre.toLocaleString()}/ac budget.`
    );
    reasonsForTelugu.push(
      `ఎకరానికి పెట్టుబడి ₹${initialCost.toLocaleString()} మీ బడ్జెట్ (₹${farm.investmentBudgetPerAcre.toLocaleString()}) లోపు ఉంది.`
    );
  } else if (!budgetAffordable) {
    reasonsAgainst.push(
      `Budget Shortfall: Requires ₹${initialCost.toLocaleString()}/ac — exceeds stated budget by ₹${(budgetShortfallInr || 0).toLocaleString()}/ac.`
    );
    reasonsAgainstTelugu.push(
      `పెట్టుబడి లోటు: ₹${initialCost.toLocaleString()}/ఎకరా ఖర్చు మీ బడ్జెట్ కంటే ₹${(budgetShortfallInr || 0).toLocaleString()} ఎక్కువ.`
    );
  }

  // 6b. Soil Depth, Humidity/Temperature, Seed & Manure & Machinery Availability
  let soilDepthMatch = true;
  if (farm.soilDepth && farm.soilDepth !== 'UNKNOWN') {
    if (farm.soilDepth === 'SHALLOW_UNDER_30CM' && crop.minSoilDepth === 'DEEP_OVER_75CM') {
      soilDepthMatch = false;
      reasonsAgainst.push(
        `Soil Depth Limitation (<30 cm): Deep-rooted orchard (${crop.cropName}) requires >75 cm root zone for stability and feeder roots.`
      );
      reasonsAgainstTelugu.push(
        `నేల లోతు చాలదు (<30 సెం.మీ.): లోతైన వేర్లు ఉండే తోట పంటలకు కనీసం 75 సెం.మీ. లోతు అవసరం.`
      );
    } else if (farm.soilDepth === 'DEEP_OVER_75CM') {
      reasonsFor.push(`Deep root zone (>75 cm) supports vigorous root development.`);
      reasonsForTelugu.push(`లోతైన నేల (>75 సెం.మీ.) వేరు వ్యవస్థకు అనుకూలంగా ఉంది.`);
    }
  } else {
    inputAndMarketNotes.push('Soil depth not entered — confirm absence of hardpan/kankar layer below 45 cm before orchards.');
  }

  if (typeof farm.relativeHumidityPct === 'number' && farm.relativeHumidityPct >= 82) {
    if (crop.id.includes('BPT5204') || crop.category === 'VEGETABLE' || crop.id.includes('FIG') || crop.id.includes('TURMERIC')) {
      inputAndMarketNotes.push(
        `High humidity (${farm.relativeHumidityPct}%) increases foliar blast, mildew, or rhizome/fruit rot pressure — schedule prophylactic biocontrol/drainage.`
      );
    }
  }

  if (crop.seedAvailability === 'NURSERY_OR_EXTERNAL_PREORDER' || farm.seedAndInputAccess === 'CONSTRAINED_REMOTE') {
    inputAndMarketNotes.push(
      `Seed / Planting Material Alert: ${crop.seedAvailability === 'NURSERY_OR_EXTERNAL_PREORDER' ? 'Requires verified nursery/breeder pre-order (not stocked at regular village RBK).' : 'Remote dealer access — procure treated seed 2–3 weeks before sowing.'}`
    );
  } else {
    inputAndMarketNotes.push('Certified seeds/inputs normally accessible via local RBK / KVK Ghantasala or Mandal dealers.');
  }

  if (crop.organicManureRequirement === 'HIGH' && farm.fymOrCompostAvailable === 'SCARCE') {
    reasonsAgainst.push(
      `Organic Manure Constraint: Requires 8–12 tonnes FYM/compost per acre, which is scarce locally and adds freight cost.`
    );
    reasonsAgainstTelugu.push(
      `సేంద్రీయ ఎరువుల కొరత: ఎకరానికి 8–12 టన్నుల పశువుల ఎరువు అవసరం, స్థానికంగా లభ్యత తక్కువ.`
    );
  }

  if (farm.machineryAvailability === 'MANUAL_ONLY' && (crop.category === 'SPICE' || crop.id.includes('PADDY') || crop.id.includes('MAIZE'))) {
    inputAndMarketNotes.push(
      'Machinery Limitation: Manual-only cultivation without tractor ridger/rotavator increases land-prep days & wage cost.'
    );
  }

  // 7. Research Evidence Comparison & Verified Schemes Only
  const researchComparisons = compareResearchWithFarm(researchLibrary, crop, farm);
  const hasLocallyValidated = researchComparisons.some((rc) => rc.record.validationStatus === 'LOCALLY_VALIDATED');
  const requiresExperimentalDisclaimer =
    Boolean(crop.isExperimentalCrop) || (researchComparisons.length > 0 && !hasLocallyValidated);

  if (requiresExperimentalDisclaimer) {
    croppingHistoryNotes.push(
      'Experimental Evidence Notice: Existing trials for this crop are out-of-state or experimental and require local Krishna Delta validation (0.25 ac pilot first) before full-acre investment.'
    );
  }

  const verifiedSchemes = getVerifiedSchemesForCrop(crop, farm);

  assumptions.push(`Calculated per 1 acre benchmark (1 ha = 2.471 acres) using dated institutional & AMIC price bands.`);
  assumptions.push(`Conservative profitability assumes -12% yield & price stress with +5% cost contingency.`);
  assumptionsTelugu.push(`1 ఎకరానికి సాధారణ వాతావరణం మరియు 13 రకాల ఖర్చుల ఆధారంగా లెక్కించబడింది.`);

  let recommendationStatus: CropEvaluationResult['recommendationStatus'] = 'HIGHLY_RECOMMENDED';
  let recommendationStatusTelugu = 'పూర్తిగా సిఫార్సు చేయబడింది';

  if (!drainageMatch || !waterMatch || !soilDepthMatch) {
    recommendationStatus = 'NOT_RECOMMENDED';
    recommendationStatusTelugu = !drainageMatch
      ? 'సిఫార్సు చేయబడలేదు (నేల పారుదల సరిపోలదు)'
      : !soilDepthMatch
      ? 'సిఫార్సు చేయబడలేదు (నేల లోతు చాలదు)'
      : 'సిఫార్సు చేయబడలేదు (నీటి లభ్యత చాలదు)';
  } else if (!budgetAffordable && (budgetShortfallInr || 0) > farm.investmentBudgetPerAcre * 0.45) {
    recommendationStatus = 'MARGINAL_WITH_CARE';
    recommendationStatusTelugu = 'అదనపు పెట్టుబడి / సబ్సిడీతో పరిశీలించదగినది';
  } else if (requiresExperimentalDisclaimer || reasonsAgainst.length >= 1) {
    recommendationStatus = 'SUITABLE';
    recommendationStatusTelugu = requiresExperimentalDisclaimer
      ? 'ప్రయోగాత్మక / జాగ్రత్తలతో పరిశీలించదగినది'
      : 'అనువైనది (జాగ్రత్తలు అవసరం)';
  }

  return {
    recommendationStatus,
    recommendationStatusTelugu,
    reasonsFor,
    reasonsForTelugu,
    reasonsAgainst,
    reasonsAgainstTelugu,
    regionalContingencyPlanRef: crop.regionalContingencyPlanRef,
    dataDate: crop.dataDate,
    assumptions,
    assumptionsTelugu,
    budgetAffordable,
    budgetShortfallInr,
    drainageMatch,
    waterMatch,
    soilDepthMatch,
    soilChemistryNotes,
    croppingHistoryNotes,
    inputAndMarketNotes,
    verifiedSchemes,
    researchComparisons,
    requiresExperimentalDisclaimer
  };
}

export function rankCropsForFarm(
  catalogue: CropProfile[],
  farm: FarmEvaluationProfile,
  rankingType: RecommendationRankingType,
  researchLibrary: ResearchEvidenceRecord[] = []
): EvaluatedCrop[] {
  const weights = farm.priorityWeights || DEFAULT_PRIORITY_WEIGHTS;

  const maxCost = Math.max(
    ...catalogue.map((c) =>
      c.perennialInfo ? c.perennialInfo.establishmentCostPerAcre : sumInvestmentLines(c).totalAll13Lines
    ),
    100000
  );
  const maxWater = Math.max(...catalogue.map((c) => c.waterRequirementMm), 1250);
  const maxProfit = Math.max(
    ...catalogue.map((c) =>
      c.perennialInfo ? c.perennialInfo.annualizedNetProfitPerAcre : c.commercialEvaluation.estimatedNetProfitPerAcre
    ),
    100000
  );
  const maxDays = Math.max(...catalogue.map((c) => c.commercialEvaluation.daysToFirstReturn), 365);

  const evaluatedList: EvaluatedCrop[] = catalogue.map((crop) => {
    const evaluation = evaluateCropForFarm(crop, farm, researchLibrary);
    const scenarios = computeProfitScenarios(crop);
    const inv = sumInvestmentLines(crop);

    const effectiveAnnualProfit = crop.perennialInfo
      ? crop.perennialInfo.annualizedNetProfitPerAcre
      : crop.commercialEvaluation.estimatedNetProfitPerAcre;

    const riskFactor = 1 - Math.min(0.75, (crop.riskScore ?? 35) / 100);
    const riskAdjustedProfit = Math.round(effectiveAnnualProfit * riskFactor);

    const totalInvestmentPerAcre = crop.perennialInfo
      ? crop.perennialInfo.establishmentCostPerAcre
      : inv.totalAll13Lines;

    const recurringOperationalCostPerAcre = crop.perennialInfo
      ? crop.perennialInfo.annualMaintenanceCostPerAcre
      : inv.recurringAndMarketingCost;

    // Defensible net profit blends conservative downside + expected outcome and penalizes
    // unvalidated/experimental market liquidity and unrefrigerated daily perishability
    const blendedScenarioNet = Math.round(
      scenarios.conservative.netProfitPerAcre * 0.45 + scenarios.expected.netProfitPerAcre * 0.55
    );
    let defensibilityFactor = evaluation.requiresExperimentalDisclaimer ? 0.65 : 0.95;
    if (
      crop.commercialEvaluation.perishability === 'VERY_HIGH_DAILY' &&
      !farm.coldStorageAvailable &&
      (farm.marketDistanceKm ?? 8) > 15
    ) {
      defensibilityFactor -= 0.15;
    }
    const defensibleNetProfit = Math.round(blendedScenarioNet * defensibilityFactor);

    // Financial Risk Score (0-100, lower is safer; weights capital exposure, volatility, gestation, debt shortfall)
    let financialRiskScore = crop.riskScore ?? 35;
    if (!evaluation.budgetAffordable) financialRiskScore += 18;
    if (evaluation.requiresExperimentalDisclaimer) financialRiskScore += 15;
    if (crop.perennialInfo && crop.perennialInfo.paybackPeriodYears >= 3) financialRiskScore += 12;
    if (scenarios.conservative.netProfitPerAcre <= 0) financialRiskScore += 20;
    financialRiskScore = Math.min(98, Math.max(8, financialRiskScore));

    const invScore = 1 - Math.min(1, totalInvestmentPerAcre / maxCost);
    const waterScore = 1 - Math.min(1, crop.waterRequirementMm / maxWater);
    const nutriScore = Math.min(1, crop.nutritionalProfile.nutritionalScore / 100);
    const profitScore = Math.max(0, Math.min(1, defensibleNetProfit / maxProfit));
    const speedScore = 1 - Math.min(1, crop.commercialEvaluation.daysToFirstReturn / maxDays);
    const riskSafetyScore = 1 - Math.min(1, financialRiskScore / 100);
    const lowChemScore =
      crop.fertilizerPesticideDependence === 'LOW' ? 1 : crop.fertilizerPesticideDependence === 'MODERATE' ? 0.65 : 0.3;

    const totalWeight =
      weights.lowestInvestment +
      weights.lowestWater +
      weights.highestNutrition +
      weights.highestProfit +
      weights.fastestReturn +
      weights.lowestRisk || 1;

    const weightedObjectivePct =
      ((invScore * weights.lowestInvestment +
        waterScore * weights.lowestWater +
        nutriScore * weights.highestNutrition +
        profitScore * weights.highestProfit +
        speedScore * weights.fastestReturn +
        ((riskSafetyScore + lowChemScore) / 2) * weights.lowestRisk) /
        totalWeight) *
      100;

    let score = crop.suitabilityScore * 0.42 + weightedObjectivePct * 0.58;
    if (!evaluation.drainageMatch) score -= 42;
    if (!evaluation.waterMatch) score -= 35;
    if (evaluation.soilDepthMatch === false) score -= 32;
    if (!evaluation.budgetAffordable) score -= 14;

    const compositeScore = Math.round(Math.max(5, Math.min(99, score)));

    return {
      crop,
      evaluation,
      compositeScore,
      effectiveAnnualProfit,
      riskAdjustedProfit,
      defensibleNetProfit,
      financialRiskScore,
      scenarios,
      totalInvestmentPerAcre,
      recurringOperationalCostPerAcre
    };
  });

  let activeList = evaluatedList;
  if (farm.season !== 'ALL' && farm.season !== 'YEAR_ROUND') {
    activeList = evaluatedList.filter(
      (item) =>
        item.crop.season === farm.season ||
        item.crop.season === 'YEAR_ROUND' ||
        (farm.season === 'KHARIF' && item.crop.category === 'FRUIT_PERENNIAL')
    );
  }

  const statusWeight: Record<CropEvaluationResult['recommendationStatus'], number> = {
    HIGHLY_RECOMMENDED: 4,
    SUITABLE: 3,
    MARGINAL_WITH_CARE: 2,
    NOT_RECOMMENDED: 1
  };

  const chemRank: Record<'LOW' | 'MODERATE' | 'HIGH', number> = {
    LOW: 1,
    MODERATE: 2,
    HIGH: 3
  };

  const isViable = (item: EvaluatedCrop) => (item.evaluation.recommendationStatus !== 'NOT_RECOMMENDED' ? 1 : 0);

  const sortWithViability = (list: EvaluatedCrop[], cmp: (a: EvaluatedCrop, b: EvaluatedCrop) => number) =>
    [...list].sort((a, b) => {
      const viableDiff = isViable(b) - isViable(a);
      if (viableDiff !== 0) return viableDiff;
      return cmp(a, b);
    });

  switch (rankingType) {
    case 'LOWEST_INITIAL_INVESTMENT':
      return sortWithViability(activeList, (a, b) => a.totalInvestmentPerAcre - b.totalInvestmentPerAcre);

    case 'LOWEST_RECURRING_COST':
      return sortWithViability(activeList, (a, b) => a.recurringOperationalCostPerAcre - b.recurringOperationalCostPerAcre);

    case 'LOWEST_WATER':
      return sortWithViability(activeList, (a, b) => a.crop.waterRequirementMm - b.crop.waterRequirementMm);

    case 'LOWEST_CHEMICAL_DEPENDENCE':
      return sortWithViability(activeList, (a, b) => {
        const diff =
          chemRank[a.crop.fertilizerPesticideDependence || 'MODERATE'] -
          chemRank[b.crop.fertilizerPesticideDependence || 'MODERATE'];
        if (diff !== 0) return diff;
        return statusWeight[b.evaluation.recommendationStatus] - statusWeight[a.evaluation.recommendationStatus];
      });

    case 'LOWEST_FINANCIAL_RISK':
      return sortWithViability(activeList, (a, b) => {
        const riskDiff = a.financialRiskScore - b.financialRiskScore;
        if (riskDiff !== 0) return riskDiff;
        return b.scenarios.conservative.netProfitPerAcre - a.scenarios.conservative.netProfitPerAcre;
      });

    case 'HIGHEST_NUTRITION':
      return sortWithViability(
        activeList,
        (a, b) => b.crop.nutritionalProfile.nutritionalScore - a.crop.nutritionalProfile.nutritionalScore
      );

    case 'HIGHEST_NET_PROFIT':
      return sortWithViability(activeList, (a, b) => b.defensibleNetProfit - a.defensibleNetProfit);

    case 'BEST_RISK_ADJUSTED_PROFIT':
      return sortWithViability(activeList, (a, b) => b.riskAdjustedProfit - a.riskAdjustedProfit);

    case 'FASTEST_RETURN':
      return sortWithViability(
        activeList,
        (a, b) => a.crop.commercialEvaluation.daysToFirstReturn - b.crop.commercialEvaluation.daysToFirstReturn
      );

    case 'BEST_LONG_TERM_INVESTMENT':
      return sortWithViability(activeList, (a, b) => {
        const aIsPerennial = a.crop.perennialInfo?.isPerennial || a.crop.category === 'FRUIT_PERENNIAL' ? 1 : 0;
        const bIsPerennial = b.crop.perennialInfo?.isPerennial || b.crop.category === 'FRUIT_PERENNIAL' ? 1 : 0;
        if (bIsPerennial !== aIsPerennial) return bIsPerennial - aIsPerennial;
        const statusDiff =
          statusWeight[b.evaluation.recommendationStatus] - statusWeight[a.evaluation.recommendationStatus];
        if (statusDiff !== 0) return statusDiff;
        return b.defensibleNetProfit - a.defensibleNetProfit;
      });

    case 'BEST_CROP_COMBINATIONS':
    case 'BEST_OVERALL_BALANCE':
    default:
      return [...activeList].sort((a, b) => {
        const statusDiff =
          statusWeight[b.evaluation.recommendationStatus] - statusWeight[a.evaluation.recommendationStatus];
        if (statusDiff !== 0) return statusDiff;
        return b.compositeScore - a.compositeScore;
      });
  }
}

/**
 * Ranking #10: Evaluate Multi-Crop Combinations, Sequence Rotations & Intercropping Systems
 * Evaluates 6 system designs against the individual farm's soil drainage, water, budget & climate.
 */
export function evaluateCropCombinations(
  catalogue: CropProfile[],
  farm: FarmEvaluationProfile,
  researchLibrary: ResearchEvidenceRecord[] = []
): CropCombinationPlan[] {
  const byId = new Map<string, EvaluatedCrop>();
  const all = rankCropsForFarm(catalogue, { ...farm, season: 'ALL' }, 'BEST_OVERALL_BALANCE', researchLibrary);
  for (const item of all) {
    byId.set(item.crop.id, item);
  }

  const pick = (id: string) => byId.get(id);

  const specs: Array<{
    id: string;
    titleEn: string;
    titleTe: string;
    systemType: CropCombinationPlan['systemType'];
    members: Array<{
      id: string;
      weight: number;
      areaShareOrSeason: string;
      purposeEn: string;
      purposeTe: string;
    }>;
    soilHealthBenefitEn: string;
    soilHealthBenefitTe: string;
    researchCitations: string[];
    experimentalNote?: string;
  }> = [
    {
      id: 'COMB-DELTA-PADDY-URAD-CORIANDER',
      titleEn: 'Krishna Delta Rice-Fallow Rotation: Paddy (MTU 1061) → Zero-Till Black Gram (LBG 752) + Bund Sesame',
      titleTe: 'కృష్ణా డెల్టా పంట మార్పిడి: ఖరీఫ్ వరి (MTU 1061) → రబీ జీరో-టిల్లేజ్ మినుము + గట్టుపై నువ్వులు',
      systemType: 'SEQUENTIAL_ROTATION',
      members: [
        {
          id: 'CRP-PAD-MTU1061',
          weight: 1.0,
          areaShareOrSeason: 'Kharif (Jun–Nov)',
          purposeEn: 'Flood-tolerant staple cereal grain + 3.5t dairy fodder straw',
          purposeTe: 'వరద తట్టుకునే ప్రధాన వరి ధాన్యం + పశుగ్రాసం'
        },
        {
          id: 'CRP-PUL-LBG752',
          weight: 0.85,
          areaShareOrSeason: 'Rabi Relay (Dec–Feb)',
          purposeEn: 'Zero-tillage relay pulse fixes 35 kg N/ac on residual canal moisture',
          purposeTe: 'విత్తే ముందు దుక్కి లేకుండా 35 కిలోల నత్రజని స్థిరీకరణ'
        },
        {
          id: 'CRP-OIL-SESAME',
          weight: 0.25,
          areaShareOrSeason: 'Summer / Bunds (Mar–May)',
          purposeEn: 'Ultra-low water oilseed bonus cash & family cooking oil security',
          purposeTe: 'తక్కువ నీటితో అదనపు నూనెగింజ ఆదాయం'
        }
      ],
      soilHealthBenefitEn: 'Breaks continuous paddy stem-borer/BPH pest cycle and restores natural Rhizobium nitrogen + organic residue.',
      soilHealthBenefitTe: 'నిరంతర వరి చీడపీడల వలయాన్ని విచ్ఛిన్నం చేసి సహజ నత్రజనిని పెంచుతుంది.',
      researchCitations: ['ANGRAU RARS Maruteru & ARS Lam Rice-Fallow Package', 'ICAR-CRIDA Krishna Contingency Plan']
    },
    {
      id: 'COMB-LOW-WATER-MILLET-PULSE-GONGURA',
      titleEn: 'Zero-Debt Climate-Resilient Mix: Foxtail Millet (Korra) + Green Gram (WGG 42) + Gongura Quick Cash',
      titleTe: 'అప్పు లేని తక్కువ నీటి మిశ్రమ సాగు: కొర్రలు + పెసలు + 45 రోజుల గోంగూర',
      systemType: 'BORDER_BUND_MIXED',
      members: [
        {
          id: 'CRP-MIL-KORRA',
          weight: 0.5,
          areaShareOrSeason: 'Kharif (50% Area)',
          purposeEn: 'Drought-proof 78-day nutri-millet + fodder with <₹10k/ac outlay',
          purposeTe: 'తక్కువ నీటితో 78 రోజుల్లో పండే బలవర్ధక సిరిధాన్యం'
        },
        {
          id: 'CRP-PUL-WGG42',
          weight: 0.35,
          areaShareOrSeason: 'Rabi (50% Area)',
          purposeEn: 'Short-duration nitrogen fixer harvested in 65 days',
          purposeTe: '65 రోజుల్లో వచ్చే రబీ పప్పుధాన్య ఆదాయం'
        },
        {
          id: 'CRP-LEA-GONGURA',
          weight: 0.25,
          areaShareOrSeason: '20% Staggered Plots (45d)',
          purposeEn: 'Rapid Day-35 cash flow to pay household labour without borrowing',
          purposeTe: 'వడ్డీ అప్పు లేకుండా నెలవారీ ఖర్చులకు తక్షణ నగదు'
        }
      ],
      soilHealthBenefitEn: 'Shallow fibrous millet roots paired with leguminous green gram nodules keep topsoil porous with minimal synthetic inputs.',
      soilHealthBenefitTe: 'తక్కువ రసాయన ఎరువులతోనే భూసారం మరియు తేమ నిల్వ మెరుగుపడతాయి.',
      researchCitations: ['ANGRAU RARS Nandyal Small Millets', 'ICMR-NIN IFCT Nutrition Density Standard']
    },
    {
      id: 'COMB-VERTISOL-SPICE-PULSE',
      titleEn: 'Residual-Moisture Low-Risk Spice Rotation: Kharif Paddy → Rabi Coriander (Sadhana CS-4) + Black Gram',
      titleTe: 'రబీ తక్కువ నీటి సుగంధ-పప్పు పంటలు: వరి తర్వాత సాధన ధనియాలు + మినుము',
      systemType: 'SEQUENTIAL_ROTATION',
      members: [
        {
          id: 'CRP-PAD-BPT5204',
          weight: 0.5,
          areaShareOrSeason: 'Kharif Main',
          purposeEn: 'Primary table rice revenue (managed with zinc basal & leaf-blast check)',
          purposeTe: 'ప్రధాన ఖరీఫ్ బియ్యం ఆదాయం'
        },
        {
          id: 'CRP-SPI-CORIANDER',
          weight: 0.6,
          areaShareOrSeason: 'Rabi Vertisol (50% Area)',
          purposeEn: '210 mm shelf-stable coriander spice yielding Day-35 fresh greens + dry seed',
          purposeTe: '210 మి.మీ. నీటితో నిల్వ ఉండే ధనియాల పంట'
        },
        {
          id: 'CRP-PUL-LBG752',
          weight: 0.5,
          areaShareOrSeason: 'Rabi Vertisol (50% Area)',
          purposeEn: 'Dual spice + pulse risk spread across two non-correlated mandi buyers',
          purposeTe: 'ధరల హెచ్చుతగ్గుల నష్టాన్ని తగ్గించే ద్వంద్వ పంట'
        }
      ],
      soilHealthBenefitEn: 'Coriander umbel flowers attract beneficial ladybird & hoverfly predators that naturally suppress aphid/thrips populations.',
      soilHealthBenefitTe: 'ధనియాల పూలు మిత్ర పురుగులను ఆకర్షించి సహజ సస్యరక్షణకు తోడ్పడతాయి.',
      researchCitations: ['ANGRAU RARS Lam Coriander Trials']
    },
    {
      id: 'COMB-ALLEY-ORCHARD-TURMERIC-PULSE',
      titleEn: 'Long-Term Agroforestry Cushion: Coconut / Guava + Shade-Tolerant Turmeric & Black Gram Intercrop',
      titleTe: 'దీర్ఘకాలిక తోట & అంతర పంట: కొబ్బరి / జామ తోటలో పసుపు + మినుము (ఆదాయ ఆలస్యం లేకుండా)',
      systemType: 'INTERCROPPING_ALLEY',
      members: [
        {
          id: 'CRP-FRU-GUAVA',
          weight: 0.6,
          areaShareOrSeason: 'Orchard Grid (Year 1–15)',
          purposeEn: 'Medium-gestation fruit tree anchored for 15-year recurring returns',
          purposeTe: '15 ఏళ్ల పాటు స్థిర ఫలసాయం ఇచ్చే జామ తోట'
        },
        {
          id: 'CRP-SPI-TURMERIC',
          weight: 0.45,
          areaShareOrSeason: 'Years 1–3 Inter-row Raised Ridges',
          purposeEn: 'Pays off Year-1–2 orchard establishment debt before tree canopy closes',
          purposeTe: 'తోట పెరిగే మొదటి 2 ఏళ్లలో పెట్టుబడిని తిరిగి రాబట్టే పసుపు'
        },
        {
          id: 'CRP-PUL-LBG752',
          weight: 0.35,
          areaShareOrSeason: 'Living Nitrogen Mulch',
          purposeEn: 'Covers inter-row soil against weeds & feeds organic nitrogen to young trees',
          purposeTe: 'కలుపు నియంత్రణ + తోటకు సహజ నత్రజని'
        }
      ],
      soilHealthBenefitEn: 'Multi-storey root architecture maximizes solar & nutrient efficiency while eliminating gestation cash-flow gaps.',
      soilHealthBenefitTe: 'తోట పంటలలో మొదటి 2 ఏళ్ల ఆదాయ కొరతను అంతర పంటలు పూర్తిగా నివారిస్తాయి.',
      researchCitations: ['ICAR-IIHR Bengaluru Guava Intercropping', 'ANGRAU HRS Duggirala Raised-Bed Turmeric']
    },
    {
      id: 'COMB-NUTRITION-MORINGA-VEG-PULSE',
      titleEn: 'High-Nutrition Farm Basket: Moringa (PKM 1) Border + Red Gram / Maize + Palak Greens',
      titleTe: 'గ్రామ పోషకాహార & స్థిర ఆదాయ ప్రణాళిక: మునగ + మొక్కజొన్న + పాలకూర',
      systemType: 'BORDER_BUND_MIXED',
      members: [
        {
          id: 'CRP-FRU-MORINGA',
          weight: 0.45,
          areaShareOrSeason: 'Perennial Alley (180d return)',
          purposeEn: 'Highest vitamin/calcium/iron perennial pod crop with rapid 6-month fruiting',
          purposeTe: '6 నెలల్లోనే కోతకు వచ్చే అత్యధిక పోషక మునగ పంట'
        },
        {
          id: 'CRP-MAI-DHM117',
          weight: 0.6,
          areaShareOrSeason: 'Main Kharif/Rabi Strip',
          purposeEn: 'Reliable cattle-feed & grain crop supported by poultry/dairy buyers',
          purposeTe: 'పశుగ్రాసం మరియు మార్కెట్ డిమాండ్ ఉన్న మొక్కజొన్న'
        },
        {
          id: 'CRP-LEA-PALAK',
          weight: 0.25,
          areaShareOrSeason: 'Short 35-day Nutrition Strips',
          purposeEn: 'High iron/folate fresh household greens & local Rythu Bazar weekly income',
          purposeTe: 'రైతు బజారులో వారానికి తక్షణ ఆదాయం ఇచ్చే ఆకుకూరలు'
        }
      ],
      soilHealthBenefitEn: 'Leaf drop from Moringa rapidly adds humus while staggered harvests reduce single-day price crash risk.',
      soilHealthBenefitTe: 'మునగ ఆకు రాలడం వల్ల సేంద్రీయ కర్బనం పెరిగి పోషక విలువలు రెట్టింపు అవుతాయి.',
      researchCitations: ['TNAU / ANGRAU PKM-1 Moringa Package', 'ICMR-NIN Nutrient Retention Guidelines']
    },
    {
      id: 'COMB-EXPERIMENTAL-SAFE-PILOT',
      titleEn: 'Safe Experimental Diversification (0.25 Ac Pilot Only): Raised-Bed Dragon Fruit/Quinoa + 0.75 Ac Rice-Fallow Pulse',
      titleTe: 'సురక్షిత ప్రయోగాత్మక విధానం (0.25 ఎకరం మాత్రమే): డ్రాగన్ ఫ్రూట్ / క్వినోవా ట్రయల్ + మినుము భద్రత',
      systemType: 'EXPERIMENTAL_PILOT_SAFE',
      members: [
        {
          id: 'CRP-PUL-LBG752',
          weight: 0.75,
          areaShareOrSeason: '75% Core Safe Plot',
          purposeEn: 'Low-risk cash anchor protecting farmer household against any trial crop loss',
          purposeTe: 'ప్రయోగాత్మక నష్ట భయం లేకుండా 75% భూమిలో సురక్షిత మినుము'
        },
        {
          id: 'CRP-FRU-DRAGON',
          weight: 0.25,
          areaShareOrSeason: '25% Raised-Bed Trial Plot',
          purposeEn: 'Controlled small-plot validation of ICAR-NIASM trellis/shade protocol without full debt',
          purposeTe: 'పూర్తి అప్పు చేయకుండా 25% భాగంలో మాత్రమే ఎత్తైన మడులపై పరీక్ష'
        }
      ],
      soilHealthBenefitEn: 'Isolates high-capital experimental horticulture to a small raised-bed test block while keeping 75% soil under regenerative legumes.',
      soilHealthBenefitTe: 'భారీ పెట్టుబడి ప్రయోగాన్ని చిన్న విస్తీర్ణానికి పరిమితం చేసి రైతును అప్పుల ఊబి నుండి కాపాడుతుంది.',
      researchCitations: ['ICAR-NIASM Baramati Dragon Fruit Pilot', 'Dr. YSRHU Venkataramannagudem Evaluation'],
      experimentalNote: 'EXPERIMENTAL SYSTEM RULE: Never allocate 100% of small-farmer credit to out-of-state trials before 12–18 month local plot observation.'
    }
  ];

  return specs
    .map((spec) => {
      const evaluatedMembers = spec.members.map((m) => ({
        meta: m,
        evalCrop: pick(m.id)
      }));

      let suitable = true;
      const rejectionReasons: string[] = [];

      for (const m of evaluatedMembers) {
        if (!m.evalCrop) continue;
        // For experimental pilot safe plot, allow raised-bed trial caveat unless water is deficit
        if (spec.systemType === 'EXPERIMENTAL_PILOT_SAFE' && m.meta.id === 'CRP-FRU-DRAGON') {
          if (farm.waterAvailability === 'DEFICIT') {
            suitable = false;
            rejectionReasons.push('Deficit water cannot support trial orchard establishment.');
          }
          continue;
        }
        if (m.evalCrop.evaluation.recommendationStatus === 'NOT_RECOMMENDED') {
          suitable = false;
          rejectionReasons.push(
            `${m.evalCrop.crop.cropName.split(' (')[0]} fails parcel check (${m.evalCrop.evaluation.reasonsAgainst[0] || 'drainage/water mismatch'}).`
          );
        }
      }

      let totalOutlay = 0;
      let totalRecur = 0;
      let totalWater = 0;
      let consNet = 0;
      let expNet = 0;
      let defNet = 0;
      let riskSum = 0;

      for (const m of evaluatedMembers) {
        if (!m.evalCrop) continue;
        const w = m.meta.weight;
        totalOutlay += m.evalCrop.totalInvestmentPerAcre * w;
        totalRecur += m.evalCrop.recurringOperationalCostPerAcre * w;
        totalWater += m.evalCrop.crop.waterRequirementMm * (w > 0.6 ? 0.8 : w);
        consNet += m.evalCrop.scenarios.conservative.netProfitPerAcre * w;
        expNet += m.evalCrop.effectiveAnnualProfit * w;
        defNet += m.evalCrop.defensibleNetProfit * w;
        riskSum += m.evalCrop.financialRiskScore * w;
      }

      const avgRisk = Math.round(
        Math.max(10, Math.min(92, (riskSum / evaluatedMembers.reduce((a, b) => a + b.meta.weight, 0)) * 0.85))
      );

      if (!farm.budgetMode || farm.budgetMode !== 'UNKNOWN_FLEXIBLE') {
        if (totalOutlay > farm.investmentBudgetPerAcre * 1.45 && spec.systemType !== 'EXPERIMENTAL_PILOT_SAFE') {
          suitable = false;
          rejectionReasons.push(
            `Combined system outlay (₹${Math.round(totalOutlay).toLocaleString()}/ac) exceeds farm budget cap (₹${farm.investmentBudgetPerAcre.toLocaleString()}/ac).`
          );
        }
      }

      return {
        id: spec.id,
        titleEn: spec.titleEn,
        titleTe: spec.titleTe,
        systemType: spec.systemType,
        componentCropIds: spec.members.map((m) => m.id),
        roleBreakdown: spec.members.map((m) => ({
          cropName: pick(m.id)?.crop.cropName || m.id,
          areaShareOrSeason: m.areaShareOrSeason,
          purposeEn: m.purposeEn,
          purposeTe: m.purposeTe
        })),
        combinedInitialOutlayPerAcre: Math.round(totalOutlay),
        combinedRecurringCostPerAcre: Math.round(totalRecur),
        combinedWaterMm: Math.round(totalWater),
        conservativeNetProfitPerAcre: Math.round(consNet),
        expectedNetProfitPerAcre: Math.round(expNet),
        defensibleNetProfitPerAcre: Math.round(defNet),
        financialRiskScore: avgRisk,
        soilHealthBenefitEn: spec.soilHealthBenefitEn,
        soilHealthBenefitTe: spec.soilHealthBenefitTe,
        reasonSuitableOrRejectedEn: suitable
          ? 'Fits individual farm drainage, seasonal moisture, and diversified risk-return balance.'
          : rejectionReasons.join(' '),
        reasonSuitableOrRejectedTe: suitable
          ? 'మీ పొలం నీటి పారుదల, సీజన్ మరియు తక్కువ నష్టభయ లక్ష్యాలకు సరిపోతుంది.'
          : 'ప్రస్తుత పొలం నీటి పారుదల లేదా బడ్జెట్‌కు సరిపోలదు: ' + rejectionReasons[0],
        isSuitable: suitable,
        researchCitations: spec.researchCitations,
        experimentalNote: spec.experimentalNote
      };
    })
    .sort((a, b) => {
      if (a.isSuitable !== b.isSuitable) return a.isSuitable ? -1 : 1;
      return b.defensibleNetProfitPerAcre - a.defensibleNetProfitPerAcre;
    });
}

export function build14StepAgentTrace(
  location: FarmLocationSelection,
  farm: FarmEvaluationProfile,
  evaluated: EvaluatedCrop[],
  aiSynthesisSuccess: boolean | null
): AgentStepLog[] {
  const suitableCount = evaluated.filter((e) => e.evaluation.recommendationStatus !== 'NOT_RECOMMENDED').length;
  const rejectedCount = evaluated.filter((e) => e.evaluation.recommendationStatus === 'NOT_RECOMMENDED').length;
  const shcEntered =
    farm.soilDataSource && farm.soilDataSource !== 'UNSPECIFIED' && farm.soilDataSource !== 'UNKNOWN_NOT_TESTED';

  return [
    {
      stepNumber: 1,
      titleEn: 'Resolve Farmer Location & Boundaries',
      titleTe: 'రైతు భూమి స్థానాన్ని గుర్తించడం',
      status: location.agriculturalLandConfirmed ? 'COMPLETED' : 'WARNING',
      detail: `${location.village}, ${location.mandal}, ${location.district} (${location.classification})`
    },
    {
      stepNumber: 2,
      titleEn: 'Urban / Peri-Urban / Rural Land-Use Check',
      titleTe: 'నగర / గ్రామీణ భూవినియోగ నిర్ధారణ',
      status: location.classification === 'URBAN' && !location.agriculturalLandConfirmed ? 'WARNING' : 'COMPLETED',
      detail: location.landUseCategory
    },
    {
      stepNumber: 3,
      titleEn: 'Verify Cultivated Land Area & Cropping History',
      titleTe: 'విస్తీర్ణం & గత పంటల చరిత్ర పరిశీలన',
      status: 'COMPLETED',
      detail: `${farm.acreage} Acres · History: ${farm.croppingPattern?.replace(/_/g, ' ') || 'Standard Rotation'}`
    },
    {
      stepNumber: 4,
      titleEn: 'Check Soil Health Card (Never Infer from GPS)',
      titleTe: 'భూసార పరీక్ష తనిఖీ (GPS నుండి ఊహించబడదు)',
      status: shcEntered ? 'COMPLETED' : 'WARNING',
      detail: shcEntered
        ? `Source: ${farm.soilDataSource} · pH ${farm.soilPh ?? 'N/A'} · EC ${farm.soilEc ?? 'N/A'}`
        : 'Unknown / Not tested — farmer advised to get free RBK/KVK soil test'
    },
    {
      stepNumber: 5,
      titleEn: 'Assess Drainage, Water Source & Salinity',
      titleTe: 'నీటి పారుదల & సాగునీటి నాణ్యత',
      status: 'COMPLETED',
      detail: `${farm.soilDrainage.replace(/_/g, ' ')} · ${farm.waterSource.replace(/_/g, ' ')} (${farm.waterAvailability})`
    },
    {
      stepNumber: 6,
      titleEn: 'Review Climate, Hazards & Season Window',
      titleTe: 'వాతావరణం, ప్రమాదాలు & సీజన్',
      status: 'COMPLETED',
      detail: `${farm.season} · ~${farm.annualRainfallMm || 980} mm avg · Hazard: ${farm.cycloneOrHeatRisk || 'MODERATE'}`
    },
    {
      stepNumber: 7,
      titleEn: 'Scan Research Evidence Library (6 Tiers)',
      titleTe: 'పరిశోధనా ఆధారాల లైబ్రరీ పరిశీలన',
      status: 'COMPLETED',
      detail: 'Compared ICAR-NIASM, ICAR-IIHR, ANGRAU, YSRHU & KVK trials against actual parcel conditions'
    },
    {
      stepNumber: 8,
      titleEn: 'Reject Unsuitable & Flag Experimental Crops',
      titleTe: 'సరిపోని పంటల తొలగింపు & ప్రయోగాత్మక గుర్తింపు',
      status: 'COMPLETED',
      detail: `${suitableCount} suitable · ${rejectedCount} rejected for drainage/water mismatch`
    },
    {
      stepNumber: 9,
      titleEn: 'Audit 13-Line Investment (Initial vs Recurring)',
      titleTe: '13 రకాల పెట్టుబడి ఖర్చుల లెక్కింపు',
      status: 'COMPLETED',
      detail: `Budget filter ₹${farm.investmentBudgetPerAcre.toLocaleString()}/ac`
    },
    {
      stepNumber: 10,
      titleEn: 'Compute Nutrition Profile (ICMR-NIN / IFCT)',
      titleTe: 'పోషక విలువల విశ్లేషణ (ICMR-NIN)',
      status: 'COMPLETED',
      detail: 'Evaluated protein, fibre, Fe, Zn, Ca per 100g (no medical claims)'
    },
    {
      stepNumber: 11,
      titleEn: 'Build Conservative / Expected / Favourable Scenarios',
      titleTe: '3 మార్కెట్ దృశ్యాల అంచనా',
      status: 'COMPLETED',
      detail: 'Break-even yield, ROI %, payback period & price volatility'
    },
    {
      stepNumber: 12,
      titleEn: 'Generate 10 Separate Objective Rankings & Trade-Offs',
      titleTe: '10 విభాగాల వారీగా పంటల ర్యాంకింగ్',
      status: 'COMPLETED',
      detail: 'Initial cost, recurring cost, water, low-chemical, nutrition, net & risk-adjusted profit, speed, long-term, balanced'
    },
    {
      stepNumber: 13,
      titleEn: 'AI Agent Research Discovery Synthesis',
      titleTe: 'AI ఏజెంట్ సమగ్ర విశ్లేషణ',
      status: aiSynthesisSuccess === true ? 'COMPLETED' : aiSynthesisSuccess === false ? 'WARNING' : 'PENDING',
      detail:
        aiSynthesisSuccess === true
          ? 'Gemini AI synthesized research-backed bilingual advisory'
          : aiSynthesisSuccess === false
          ? 'Server Gemini unavailable — deterministic rankings active'
          : 'Ready to synthesize research & farm profile'
    },
    {
      stepNumber: 14,
      titleEn: 'Provenance Tagging & Expert Review Readiness',
      titleTe: 'ఆధారాల విభజన & నిపుణుల ఆమోదం',
      status: 'COMPLETED',
      detail: 'Separated Official, Research, Farmer-Entered, Assumption & Estimate'
    }
  ];
}
