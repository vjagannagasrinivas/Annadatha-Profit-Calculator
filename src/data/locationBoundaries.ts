/**
 * Annadatha Platform - Administrative Boundaries & Urban/Rural Classification Reference
 * Covers Gudlavalleru Pilot Cluster, Krishna & NTR (Vijayawada) Districts, and Pan-India Expansion Nodes
 */

import { UrbanRuralClassification } from '../types';

export interface AdministrativeNode {
  country: string;
  state: string;
  district: string;
  mandal: string;
  village: string;
  classification: UrbanRuralClassification;
  landUseCategory: string;
  lat: number;
  lng: number;
  defaultSoilType: 'BLACK_COTTON' | 'COASTAL_ALLUVIAL' | 'CLAY_LOAM' | 'RED_LOAM' | 'SANDY_CLAY';
  defaultDrainage: 'WELL_DRAINED' | 'MODERATELY_DRAINED' | 'POORLY_DRAINED_CLAY' | 'WATERLOGGED_LOWLAND';
  avgRainfallMm: number;
  climateZone: string;
  notesEn: string;
  notesTe: string;
}

export const REGIONAL_LOCATION_NODES: AdministrativeNode[] = [
  // Krishna District — Gudlavalleru Pilot Cluster (Rural Agricultural Command)
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    mandal: 'Gudlavalleru',
    village: 'Dokiparru',
    classification: 'RURAL',
    landUseCategory: 'Krishna Eastern Delta Canal Command (Tail-End Vertisols)',
    lat: 16.3365,
    lng: 81.0312,
    defaultSoilType: 'BLACK_COTTON',
    defaultDrainage: 'POORLY_DRAINED_CLAY',
    avgRainfallMm: 980,
    climateZone: 'Coastal Sub-Humid Delta (Godavari-Krishna Agro-Climatic Zone)',
    notesEn: 'Active agricultural village under Krishna Eastern Delta canal system.',
    notesTe: 'కృష్ణా తూర్పు డెల్టా కాలువ ఆయకట్టులోని గ్రామీణ వ్యవసాయ క్లస్టర్.'
  },
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    mandal: 'Gudlavalleru',
    village: 'Angaluru',
    classification: 'RURAL',
    landUseCategory: 'Perennial Canal Irrigated Cropland',
    lat: 16.3612,
    lng: 81.0184,
    defaultSoilType: 'BLACK_COTTON',
    defaultDrainage: 'MODERATELY_DRAINED',
    avgRainfallMm: 985,
    climateZone: 'Coastal Sub-Humid Delta',
    notesEn: 'Fertile double-cropped paddy & zero-till blackgram zone.',
    notesTe: 'సారవంతమైన వరి మరియు జీరో టిల్లేజ్ మినుము పండే గ్రామం.'
  },
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    mandal: 'Gudlavalleru',
    village: 'Gudlavalleru',
    classification: 'RURAL',
    landUseCategory: 'Mandal Rural Hub & Surrounding Agricultural Parcels',
    lat: 16.3510,
    lng: 81.0448,
    defaultSoilType: 'CLAY_LOAM',
    defaultDrainage: 'MODERATELY_DRAINED',
    avgRainfallMm: 985,
    climateZone: 'Coastal Sub-Humid Delta',
    notesEn: 'Pilot mandal hub with direct AMIC agricultural market access.',
    notesTe: 'గుడ్లవల్లేరు మండల కేంద్రం మరియు సమీప వ్యవసాయ భూములు.'
  },
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    mandal: 'Gudlavalleru',
    village: 'Chandrala',
    classification: 'RURAL',
    landUseCategory: 'Heavy Black Clay Delta Cropland',
    lat: 16.3228,
    lng: 81.0574,
    defaultSoilType: 'BLACK_COTTON',
    defaultDrainage: 'POORLY_DRAINED_CLAY',
    avgRainfallMm: 975,
    climateZone: 'Coastal Sub-Humid Delta',
    notesEn: 'Deep black cotton vertisol zone suited for submergence paddy & relay pulses.',
    notesTe: 'లోతైన నల్లరేగడి నేలలు గల వ్యవసాయ గ్రామం.'
  },
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    mandal: 'Gudlavalleru',
    village: 'Vinnakota',
    classification: 'RURAL',
    landUseCategory: 'Lowland Flood-Prone Delta Paddy Zone',
    lat: 16.3745,
    lng: 81.0691,
    defaultSoilType: 'BLACK_COTTON',
    defaultDrainage: 'WATERLOGGED_LOWLAND',
    avgRainfallMm: 1010,
    climateZone: 'Coastal Sub-Humid Delta',
    notesEn: 'Low-lying drainage basin; requires submergence-tolerant varieties in Kharif.',
    notesTe: 'లోతట్టు ప్రాంతం — ఖరీఫ్‌లో ముంపు తట్టుకునే వరి రకాలు అవసరం.'
  },
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    mandal: 'Gudlavalleru',
    village: 'Vadlamannadu',
    classification: 'RURAL',
    landUseCategory: 'Rice-Fallow Pulse & Oilseed Belt',
    lat: 16.3401,
    lng: 81.0789,
    defaultSoilType: 'COASTAL_ALLUVIAL',
    defaultDrainage: 'MODERATELY_DRAINED',
    avgRainfallMm: 990,
    climateZone: 'Coastal Sub-Humid Delta',
    notesEn: 'Balanced alluvial clay loam suitable for paddy, pulses, sesame, and vegetables.',
    notesTe: 'వరి, పప్పుధాన్యాలు, నువ్వులు మరియు కూరగాయలకు అనుకూలమైన నేలలు.'
  },

  // Urban & Peri-Urban Safeguard Demonstration Nodes (e.g., Vijayawada)
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'NTR',
    mandal: 'Vijayawada Central',
    village: 'Vijayawada Urban (Benz Circle / Governorpet)',
    classification: 'URBAN',
    landUseCategory: 'Urban Municipal Built-up / Commercial Core (Non-Agricultural)',
    lat: 16.5062,
    lng: 80.6480,
    defaultSoilType: 'RED_LOAM',
    defaultDrainage: 'WELL_DRAINED',
    avgRainfallMm: 960,
    climateZone: 'Urban Heat Island / Municipal Zone',
    notesEn: 'Urban city centre — CANNOT be used directly as farmland for crop planning.',
    notesTe: 'విజయవాడ నగర కేంద్రం — ఇక్కడ వ్యవసాయ భూమి లేనందున నేరుగా పంట సిఫార్సులు ఇవ్వబడవు.'
  },
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'NTR',
    mandal: 'Kankipadu',
    village: 'Kankipadu (Peri-Urban Outskirts)',
    classification: 'PERI_URBAN',
    landUseCategory: 'Peri-Urban Transitional Canal Corridor',
    lat: 16.4324,
    lng: 80.7689,
    defaultSoilType: 'COASTAL_ALLUVIAL',
    defaultDrainage: 'WELL_DRAINED',
    avgRainfallMm: 965,
    climateZone: 'Krishna Riverfront Transitional Zone',
    notesEn: 'Peri-urban belt near Vijayawada; confirm active survey plot before planting.',
    notesTe: 'విజయవాడ సమీప అర్ధ-పట్టణ వ్యవసాయ ప్రాంతం — భూమి స్థితిని నిర్ధారించండి.'
  },
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    mandal: 'Guntur East',
    village: 'Guntur Municipal Core',
    classification: 'URBAN',
    landUseCategory: 'Urban Municipal Built-up (Commercial Spice Hub)',
    lat: 16.3067,
    lng: 80.4365,
    defaultSoilType: 'BLACK_COTTON',
    defaultDrainage: 'MODERATELY_DRAINED',
    avgRainfallMm: 910,
    climateZone: 'Urban Commercial Hub',
    notesEn: 'Urban market hub — select outlying rural village for crop cultivation.',
    notesTe: 'గుంటూరు నగర మార్కెట్ కేంద్రం — పంట సాగు కోసం గ్రామీణ క్షేత్రాన్ని ఎంచుకోండి.'
  },

  // Pan-India Scalable Expansion Nodes
  {
    country: 'India',
    state: 'Andhra Pradesh',
    district: 'Anantapuramu',
    mandal: 'Singanamala',
    village: 'Tarimela (Scarce Rainfall Dryland)',
    classification: 'RURAL',
    landUseCategory: 'Arid / Semi-Arid Rainfed Red Soil Zone',
    lat: 14.8112,
    lng: 77.7124,
    defaultSoilType: 'RED_LOAM',
    defaultDrainage: 'WELL_DRAINED',
    avgRainfallMm: 540,
    climateZone: 'Scarce Rainfall Zone (Rayalaseema Dryland)',
    notesEn: 'Low-rainfall red loam; favors groundnut, millets, red gram, ashwagandha.',
    notesTe: 'వర్షాధార ఎర్ర నేలలు — వేరుశనగ, చిరుధాన్యాలు, కందికి అనుకూలం.'
  },
  {
    country: 'India',
    state: 'Telangana',
    district: 'Nalgonda',
    mandal: 'Miryalaguda',
    village: 'Vemulapally',
    classification: 'RURAL',
    landUseCategory: 'Nagarjuna Sagar Left Canal Command',
    lat: 16.8725,
    lng: 79.5641,
    defaultSoilType: 'RED_LOAM',
    defaultDrainage: 'WELL_DRAINED',
    avgRainfallMm: 790,
    climateZone: 'Southern Telangana Semi-Arid Zone',
    notesEn: 'Irrigated rice-pulse & orchard diversification belt.',
    notesTe: 'కాలువ ఆయకట్టు వరి మరియు ఉద్యాన పంటల ప్రాంతం.'
  },
  {
    country: 'India',
    state: 'Karnataka',
    district: 'Mandya',
    mandal: 'Maddur',
    village: 'Chamanahalli',
    classification: 'RURAL',
    landUseCategory: 'Cauvery Basin Irrigated Cropland',
    lat: 12.5841,
    lng: 77.0439,
    defaultSoilType: 'RED_LOAM',
    defaultDrainage: 'WELL_DRAINED',
    avgRainfallMm: 740,
    climateZone: 'Southern Dry Zone of Karnataka',
    notesEn: 'Finger millet (Ragi), paddy, sugarcane, and horticultural basin.',
    notesTe: 'రాగులు, వరి మరియు ఉద్యాన పంటల ప్రాంతం.'
  }
];

export const MAP_CANVAS_BOUNDS = {
  minLat: 16.25,
  maxLat: 16.58,
  minLng: 80.58,
  maxLng: 81.14
};
