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


/** Live scheme records must be ingested from official dated sources; no embedded catalogue is trusted. */
export const OFFICIAL_SCHEMES: GovernmentScheme[] = [];
export const INITIAL_SCHEME_APPLICATIONS: FarmerSchemeApplication[] = [];
