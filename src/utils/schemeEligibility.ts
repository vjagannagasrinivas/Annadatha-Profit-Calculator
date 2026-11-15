/**
 * Annadatha Platform - Scheme Eligibility Screening Engine
 * 
 * CRITICAL RULE:
 * Never claim that Annadatha has officially approved a farmer for a scheme.
 * Final eligibility must be confirmed by the relevant government department.
 */

import { GovernmentScheme, FarmerProfile, FarmParcel, SoilHealthCard, EligibilityStatus } from '../types';

export interface EligibilityResult {
  status: EligibilityStatus;
  statusLabelEn: string;
  statusLabelTe: string;
  reasonsEn: string[];
  reasonsTe: string[];
  missingInfoEn: string[];
  missingInfoTe: string[];
  matchScore: number; // 0 - 100 for ranking
}

export function evaluateSchemeEligibility(
  scheme: GovernmentScheme,
  farmer?: FarmerProfile,
  parcels: FarmParcel[] = [],
  soilCard?: SoilHealthCard
): EligibilityResult {
  // If no farmer provided or basic info missing
  if (!farmer) {
    return {
      status: 'MORE_INFO_REQUIRED',
      statusLabelEn: 'More Information Required',
      statusLabelTe: 'మరిన్ని వివరాలు అవసరం',
      reasonsEn: ['Farmer profile not loaded. Please select or register a farmer profile.'],
      reasonsTe: ['రైతు వివరాలు లోడ్ కాలేదు. దయచేసి రైతు ప్రొఫైల్‌ను ఎంచుకోండి.'],
      missingInfoEn: ['Farmer registration profile'],
      missingInfoTe: ['రైతు నమోదు వివరాలు'],
      matchScore: 30
    };
  }

  // If scheme itself is not officially verified yet
  if (scheme.verificationStatus === 'VERIFICATION_REQUIRED') {
    return {
      status: 'OFFICIAL_NOT_VERIFIED',
      statusLabelEn: 'Official Eligibility Not Verified',
      statusLabelTe: 'అధికారిక అర్హత ధృవీకరించబడలేదు',
      reasonsEn: [
        'Official government guidelines for this pilot tariff/measure are pending final district gazette notification.',
        'Displayed for illustrative demo awareness only.'
      ],
      reasonsTe: [
        'ఈ పథకానికి సంబంధించి జిల్లా అధికారిక మార్గదర్శకాలు పరిశీలనలో ఉన్నాయి.',
        'కేవలం సమాచార అవగాహన కొరకు మాత్రమే చూపబడుతోంది.'
      ],
      missingInfoEn: ['District Agriculture Dept Gazette Order'],
      missingInfoTe: ['జిల్లా వ్యవసాయ శాఖ అధికారిక ఉత్తర్వులు'],
      matchScore: 40
    };
  }

  const reasonsEn: string[] = [];
  const reasonsTe: string[] = [];
  const missingInfoEn: string[] = [];
  const missingInfoTe: string[] = [];

  let isDisqualified = false;
  let disqualifiedReasonEn = '';
  let disqualifiedReasonTe = '';

  const farmerOwnership = farmer.landOwnershipType || 'OWNER';
  const totalAcres = farmer.totalAcreage || 0;
  const primaryCrop = farmer.primaryCrop || '';
  const parcelsInGudlavalleru = parcels.filter(p => p.farmerId === farmer.id);

  // 1. Tenancy Check
  if (scheme.criteria.tenancyTypes && !scheme.criteria.tenancyTypes.includes('ANY')) {
    if (farmerOwnership === 'TENANT_CCRC') {
      if (scheme.criteria.tenancyTypes.includes('TENANT_CCRC')) {
        reasonsEn.push('Eligible under Tenant Farmer (CCRC cardholder) category.');
        reasonsTe.push('కౌలు రైతు హక్కుల చట్టం (CCRC) కింద అర్హత ఉంది.');
      } else {
        isDisqualified = true;
        disqualifiedReasonEn = 'Scheme strictly requires ownership of cultivable land in revenue Webland records. Tenant cultivators on lease are not eligible directly under this central fund.';
        disqualifiedReasonTe = 'ఈ పథకానికి రెవెన్యూ రికార్డుల్లో స్వంత భూమి ఉండటం తప్పనిసరి. కౌలు రైతులకు ఈ కేంద్ర నిధి నేరుగా వర్తించదు.';
      }
    } else {
      reasonsEn.push('Landownership criteria satisfied in Webland cadastral records.');
      reasonsTe.push('వెబ్‌ల్యాండ్ రికార్డుల ప్రకారం భూ యజమాని అర్హత సరిపోయింది.');
    }
  }

  // 2. Acreage Check
  if (scheme.criteria.maxAcreage && totalAcres > scheme.criteria.maxAcreage) {
    // If scheme has strict upper cap (e.g. subsidized seed quota max 5 ac)
    reasonsEn.push(`Beneficiary allocation is capped up to ${scheme.criteria.maxAcreage} acres for your ${totalAcres} acre holding.`);
    reasonsTe.push(`మీకున్న ${totalAcres} ఎకరాలకు గాను గరిష్టంగా ${scheme.criteria.maxAcreage} ఎకరాల వరకు మాత్రమే సబ్సిడీ కోటా వర్తిస్తుంది.`);
  }

  if (scheme.criteria.minAcreage && totalAcres < scheme.criteria.minAcreage) {
    isDisqualified = true;
    disqualifiedReasonEn = `Requires minimum landholding of ${scheme.criteria.minAcreage} acres (farmer currently has ${totalAcres} acres).`;
    disqualifiedReasonTe = `కనీసం ${scheme.criteria.minAcreage} ఎకరాల సాగు భూమి ఉండాలి (ప్రస్తుతం ${totalAcres} ఎకరాలు మాత్రమే ఉంది).`;
  }

  // 3. Crop Suitability Match
  if (scheme.criteria.targetCrops && scheme.criteria.targetCrops.length > 0) {
    const isUniversal = scheme.criteria.targetCrops.includes('All Notified Crops') || scheme.criteria.targetCrops.includes('All Crops') || scheme.criteria.targetCrops.includes('All Field Crops');
    const cropMatches = isUniversal || scheme.criteria.targetCrops.some(tc => primaryCrop.toLowerCase().includes(tc.toLowerCase()));

    if (cropMatches) {
      reasonsEn.push(`Cultivated crop (${primaryCrop}) is notified in Krishna district for this scheme.`);
      reasonsTe.push(`మీరు సాగు చేస్తున్న పంట (${primaryCrop}) ఈ పథకం కింద నోటిఫై చేయబడింది.`);
    } else {
      // In horticulture scheme if crop is only Paddy
      if (scheme.category === 'HORTICULTURE_ALLIED' && !primaryCrop.toLowerCase().includes('banana') && !primaryCrop.toLowerCase().includes('horticulture')) {
        isDisqualified = true;
        disqualifiedReasonEn = `Scheme is designed for high-value horticultural crops (Banana, Fruits, Vegetables). Active crop is ${primaryCrop}.`;
        disqualifiedReasonTe = `ఈ పథకం ఉద్యాన పంటలైన అరటి, కూరగాయలు, పండ్ల తోటలకు మాత్రమే వర్తిస్తుంది. ప్రస్తుత పంట ${primaryCrop}.`;
      }
    }
  }

  // 4. Irrigation Source Check (e.g. Micro-irrigation needs borewell/canal lift)
  if (scheme.criteria.irrigationTypes && scheme.criteria.irrigationTypes.length > 0) {
    const hasMatchingIrrigation = parcelsInGudlavalleru.some(p => scheme.criteria.irrigationTypes?.includes(p.irrigationType));
    if (hasMatchingIrrigation) {
      reasonsEn.push('Assured irrigation water source is available on registered parcel.');
      reasonsTe.push('ఖచ్చితమైన నీటి వనరు అందుబాటులో ఉంది.');
    } else {
      missingInfoEn.push('Borewell or verified lift water source certificate required');
      missingInfoTe.push('బోరుబావి లేదా నీటి వనరు ధృవీకరణ పత్రం అవసరం');
    }
  }

  // 5. Soil Card Deficit Match (for Micro-nutrient subsidy)
  if (scheme.id === 'SCHEME-SOIL-NUTRIENT-SUBSIDY') {
    if (soilCard && soilCard.zinc.status === 'VERY_LOW') {
      reasonsEn.push('Soil Health Card validates severe Zinc deficiency (0.48 ppm); 50% subsidy on Zinc Sulphate is strongly recommended.');
      reasonsTe.push('సాయిల్ హెల్త్ కార్డులో తీవ్రమైన జింక్ లోపం (0.48 ppm) నిర్ధారించబడింది; 50% సబ్సిడీతో జింక్ ఎరువు లభిస్తుంది.');
    } else if (!soilCard) {
      missingInfoEn.push('Soil Health Card diagnostic report');
      missingInfoTe.push('సాయిల్ హెల్త్ కార్డు నివేదిక అవసరం');
    }
  }

  // 6. Check Bank and Aadhaar Linkage
  if (!farmer.bankLinked) {
    missingInfoEn.push('Bank account linking with NPCI / Aadhaar');
    missingInfoTe.push('బ్యాంక్ ఖాతా ఆధార్ అనుసంధానం');
  }

  // Outcome computation
  if (isDisqualified) {
    return {
      status: 'NOT_ELIGIBLE_CONDITIONS',
      statusLabelEn: 'Appears Not to Meet Conditions',
      statusLabelTe: 'నిబంధనలు సరిపోలడం లేదు',
      reasonsEn: [disqualifiedReasonEn],
      reasonsTe: [disqualifiedReasonTe],
      missingInfoEn,
      missingInfoTe,
      matchScore: 15
    };
  }

  if (missingInfoEn.length > 1) {
    return {
      status: 'MORE_INFO_REQUIRED',
      statusLabelEn: 'More Information Required',
      statusLabelTe: 'మరిన్ని వివరాలు అవసరం',
      reasonsEn: reasonsEn.length > 0 ? reasonsEn : ['Basic farmer profile matches, but additional documentation is needed.'],
      reasonsTe: reasonsTe.length > 0 ? reasonsTe : ['ప్రాథమిక వివరాలు సరిపోలాయి, కానీ అదనపు పత్రాలు పరిశీలించాల్సి ఉంది.'],
      missingInfoEn,
      missingInfoTe,
      matchScore: 55
    };
  }

  return {
    status: 'POTENTIALLY_RELEVANT',
    statusLabelEn: 'Potentially Relevant',
    statusLabelTe: 'పరిశీలించదగిన పథకం',
    reasonsEn: reasonsEn.length > 0 ? reasonsEn : ['Farmer profile and land records match general scheme criteria.'],
    reasonsTe: reasonsTe.length > 0 ? reasonsTe : ['రైతు వివరాలు మరియు భూ రికార్డులు పథకం నిబంధనలకు అనుకూలంగా ఉన్నాయి.'],
    missingInfoEn,
    missingInfoTe,
    matchScore: 92
  };
}
