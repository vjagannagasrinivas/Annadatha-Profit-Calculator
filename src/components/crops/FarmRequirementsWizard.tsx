import React, { useState } from 'react';
import {
  FarmEvaluationProfile,
  FarmLocationSelection,
  LandAreaUnit,
  Language,
  PriorityWeights,
  SoilDrainageType,
  SoilHealthCard
} from '../../types';
import { IntelligentLocationSelector } from '../location/IntelligentLocationSelector';
import {
  MapPin,
  Maximize2,
  TestTube2,
  Droplets,
  CloudSun,
  Calendar,
  History,
  IndianRupee,
  Wrench,
  Target,
  Store,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Upload,
  Info,
  Sparkles
} from 'lucide-react';

interface Props {
  language: Language;
  location: FarmLocationSelection;
  onChangeLocation: (next: FarmLocationSelection) => void;
  farmProfile: FarmEvaluationProfile;
  onChangeFarm: (next: FarmEvaluationProfile) => void;
  farmerSoilCards: SoilHealthCard[];
  priorityWeights: PriorityWeights;
  onChangeWeights: (next: PriorityWeights) => void;
  onFinishWizard: () => void;
}

export const FarmRequirementsWizard: React.FC<Props> = ({
  language,
  location,
  onChangeLocation,
  farmProfile,
  onChangeFarm,
  farmerSoilCards,
  priorityWeights,
  onChangeWeights,
  onFinishWizard
}) => {
  const [step, setStep] = useState<number>(1);
  const [showSoilGlossary, setShowSoilGlossary] = useState<boolean>(true);

  const stepsMeta = [
    { num: 1, icon: MapPin, titleEn: 'Location', titleTe: 'పొలం స్థానం' },
    { num: 2, icon: Maximize2, titleEn: 'Land Size', titleTe: 'భూమి విస్తీర్ణం' },
    { num: 3, icon: TestTube2, titleEn: 'Soil & SHC', titleTe: 'నేల & భూసారం' },
    { num: 4, icon: Droplets, titleEn: 'Water', titleTe: 'నీటి వనరులు' },
    { num: 5, icon: CloudSun, titleEn: 'Weather', titleTe: 'వాతావరణం' },
    { num: 6, icon: Calendar, titleEn: 'Season', titleTe: 'సీజన్' },
    { num: 7, icon: History, titleEn: 'Crop History', titleTe: 'గత పంటలు' },
    { num: 8, icon: IndianRupee, titleEn: 'Budget', titleTe: 'పెట్టుబడి బడ్జెట్' },
    { num: 9, icon: Wrench, titleEn: 'Labour & Tools', titleTe: 'కూలీలు & యంత్రాలు' },
    { num: 10, icon: Target, titleEn: 'Objectives', titleTe: 'రైతు లక్ష్యాలు' },
    { num: 11, icon: Store, titleEn: 'Market Access', titleTe: 'మార్కెట్ & అమ్మకం' },
    { num: 12, icon: FileText, titleEn: 'Reports & Go', titleTe: 'పత్రాలు & ఫలితం' }
  ];

  const unit: LandAreaUnit = farmProfile.landAreaUnit || 'ACRES';
  const rawArea = farmProfile.landAreaValue ?? farmProfile.acreage;

  const handleAreaChange = (val: number, newUnit: LandAreaUnit) => {
    const safeVal = Math.max(0.1, val);
    let acres = safeVal;
    if (newUnit === 'HECTARES') acres = Number((safeVal * 2.47105).toFixed(2));
    else if (newUnit === 'CENTS') acres = Number((safeVal / 100).toFixed(2));
    onChangeFarm({ ...farmProfile, landAreaValue: safeVal, landAreaUnit: newUnit, acreage: Math.max(0.1, acres) });
  };

  const WhyBox: React.FC<{ whyEn: string; whyTe: string; howEn: string; howTe: string }> = ({
    whyEn,
    whyTe,
    howEn,
    howTe
  }) => (
    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-blue-950">
            {language === 'te' ? 'ఈ సమాచారం ఎందుకు అవసరం?' : 'Why we ask for this'}
          </div>
          <p className="text-blue-900 leading-relaxed mt-0.5">{language === 'te' ? whyTe : whyEn}</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-emerald-950">
            {language === 'te' ? 'సమాచారం లేకపోతే ఎలా పొందాలి?' : 'How to obtain missing info'}
          </div>
          <p className="text-emerald-900 leading-relaxed mt-0.5">{language === 'te' ? howTe : howEn}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
      {/* Top 12-Step Progress Strip */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {language === 'te'
                ? 'సరళమైన 12-దశల రైతు పొలం అంచనా విధానం (Farm Requirements Wizard)'
                : '12-Step Farmer-Friendly Farm Assessment Wizard'}
            </h2>
            <p className="text-[11px] text-slate-600">
              {language === 'te'
                ? 'ప్రతి దశలో సాధారణ భాషలో వివరణ & "నాకు తెలియదు" ఎంపిక అందుబాటులో ఉంది.'
                : 'Plain-language questions with familiar units, examples, and "I don\'t know" options — never forced technical jargon.'}
            </p>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-full text-[11px]">
            Step {step} of 12
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
          {stepsMeta.map((s) => {
            const Icon = s.icon;
            const active = step === s.num;
            const done = step > s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`p-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  active
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : done
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-bold text-[10px]">{s.num}</span>
                </div>
                <span className="text-[10px] font-medium truncate w-full">
                  {language === 'te' ? s.titleTe : s.titleEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Body */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* STEP 1: FARM LOCATION */}
        {step === 1 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Crops depend on local village soil, delta canals vs upland, and nearby markets. Keeping your city home/market separate from your actual farmland avoids recommending field crops inside cities like Vijayawada."
              whyTe="పంటలు మీ గ్రామ నేల, నీటి కాలువలు మరియు సమీప మార్కెట్లపై ఆధారపడి ఉంటాయి. నగర నివాసం మరియు గ్రామీణ పొలం వేర్వేరుగా ఉంటాయి."
              howEn="If unsure of your Survey Number or exact boundary, check your AP Meebhoomi passbook or ask your Village Agriculture Assistant (VAA) at the Rythu Bharosa Kendra."
              howTe="మీ పొలం సర్వే నంబర్ తెలియకపోతే మీభూమి పాస్‌బుక్ లేదా గ్రామ రైతు భరోసా కేంద్రం (RBK)లో అడగండి."
            />
            <IntelligentLocationSelector
              language={language}
              location={location}
              onChange={onChangeLocation}
              onApplyNodeDefaults={(soilType, drainage, rainfallMm, climateZone) =>
                onChangeFarm({
                  ...farmProfile,
                  soilType,
                  soilDrainage: drainage,
                  annualRainfallMm: rainfallMm,
                  climateZone
                })
              }
            />
          </div>
        )}

        {/* STEP 2: LAND SIZE */}
        {step === 2 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Total cultivated area determines exact seed bags, fertilizer cost, tractor hours, and whether expensive infrastructure (like Dragon Fruit cement poles) is affordable."
              whyTe="సాగు విస్తీర్ణం ఆధారంగా విత్తనాలు, ఎరువుల బస్తాలు మరియు మొత్తం పెట్టుబడి ఖర్చు లెక్కించబడుతుంది."
              howEn="1 Acre = 100 Cents = 0.405 Hectares (roughly 4,047 sq. meters). Ask your village VRO/RBK if measuring a leased portion."
              howTe="1 ఎకరం = 100 సెంట్లు = 0.405 హెక్టార్లు. కౌలు భూమి కొలతలు పట్టాదారు లేదా వీఆర్వో ద్వారా తెలుసుకోవచ్చు."
            />

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="font-bold text-sm text-slate-900">
                {language === 'te' ? 'మీరు సాగు చేయాలనుకుంటున్న భూమి ఎంత?' : 'How much agricultural land are you planning to cultivate?'}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  min="0.1"
                  step="0.25"
                  value={rawArea}
                  onChange={(e) => handleAreaChange(Number(e.target.value), unit)}
                  className="w-32 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold font-mono"
                />
                <select
                  value={unit}
                  onChange={(e) => handleAreaChange(rawArea, e.target.value as LandAreaUnit)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                >
                  <option value="ACRES">Acres (ఎకరాలు)</option>
                  <option value="CENTS">Cents (సెంట్లు — 100 = 1 Acre)</option>
                  <option value="HECTARES">Hectares (హెక్టార్లు)</option>
                </select>
                <span className="text-slate-600">
                  Normalized Area: <strong className="text-emerald-900">{farmProfile.acreage} Acres</strong> (
                  {(farmProfile.acreage * 100).toFixed(0)} Cents)
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[0.5, 1, 2, 3, 5, 10].map((ac) => (
                  <button
                    key={ac}
                    type="button"
                    onClick={() => handleAreaChange(ac, 'ACRES')}
                    className={`px-3 py-1.5 rounded-lg border font-semibold cursor-pointer ${
                      farmProfile.acreage === ac
                        ? 'bg-emerald-800 text-white border-emerald-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ac} Acre{ac !== 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SOIL AND SOIL HEALTH */}
        {step === 3 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Many profitable crops like Dragon Fruit or Groundnut rot if rainwater stagnates in heavy black clay. Knowing soil health avoids wasting money on unnecessary urea/DAP."
              whyTe="నల్లరేగడి నీటి నిల్వ ఉండే నేలల్లో డ్రాగన్ ఫ్రూట్, వేరుశనగ వేరుకుళ్ళుతో చనిపోతాయి. భూసార పరీక్ష ద్వారా ఎరువుల ఖర్చు ఆదా అవుతుంది."
              howEn="If you do NOT have a Soil Health Card, click 'I don\'t know / Not tested' below. Collect a 6-inch topsoil sample and submit it free at your village Rythu Bharosa Kendra (RBK) or KVK Ghantasala."
              howTe="భూసార కార్డు లేకుంటే 'నాకు తెలియదు' నొక్కండి. మీ గ్రామ RBKలో ఉచిత మట్టి పరీక్ష చేయించుకోవచ్చు."
            />

            {/* Plain Language Soil Guide Toggle */}
            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950">
                  Plain-Language Soil Parameters Guide (EN / తెలుగు)
                </span>
                <button
                  type="button"
                  onClick={() => setShowSoilGlossary(!showSoilGlossary)}
                  className="text-emerald-800 underline font-semibold cursor-pointer"
                >
                  {showSoilGlossary ? 'Hide Guide' : 'Show Simple Explanations'}
                </button>
              </div>
              {showSoilGlossary && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <strong>pH (ఆమ్ల/క్షార స్థితి):</strong> Like lemon (acid &lt;6) vs baking soda (alkaline &gt;8). Neutral 6.5–7.5 suits most crops.
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <strong>EC (ఉప్పదనం - Salinity):</strong> Saltiness in soil water. Above 2.0 dS/m burns sensitive fruit roots.
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <strong>Organic Carbon (సేంద్రీయ కర్బనం):</strong> Humus from FYM compost/straw; helps soil hold moisture like a sponge.
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <strong>NPK (నత్రజని-భాస్వరం-పొటాష్):</strong> N grows green leaves, P builds strong roots, K gives grain weight & disease immunity.
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <strong>Micronutrients (సూక్ష్మ పోషకాలు Zn/Fe/B):</strong> Like plant vitamins. Krishna Delta clay often lacks Zinc!
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <strong>Drainage (నీటి పారుదల):</strong> Does rain soak away in 2 hours (Well Drained) or stand on top for 2+ days (Poor Clay)?
                  </div>
                </div>
              )}
            </div>

            {/* Soil Texture & Visual Drainage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">1. Soil Feel / Type (నేల రకం)</label>
                <select
                  value={farmProfile.soilType}
                  onChange={(e) => onChangeFarm({ ...farmProfile, soilType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                >
                  <option value="BLACK_COTTON">Black Sticky Clay / Cotton Soil (నల్లరేగడి - Sticky when wet)</option>
                  <option value="COASTAL_ALLUVIAL">Coastal River Silt / Alluvial (ఒండ్రు నేల)</option>
                  <option value="CLAY_LOAM">Mixed Clay Loam (బంకమట్టి మిశ్రమ నేల)</option>
                  <option value="RED_LOAM">Red Loam / Upland (ఎర్ర నేల)</option>
                  <option value="SANDY_CLAY">Sandy Clay / Loose Soil (ఇసుక మిశ్రమ నేల)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  2. After Heavy Rain, How Does Water Drain? (నీరు నిలుస్తుందా?)
                </label>
                <select
                  value={farmProfile.soilDrainage}
                  onChange={(e) => onChangeFarm({ ...farmProfile, soilDrainage: e.target.value as SoilDrainageType })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                >
                  <option value="POORLY_DRAINED_CLAY">Slow / Water stands for 1–2 days (Heavy Black Clay)</option>
                  <option value="WATERLOGGED_LOWLAND">Flood-Prone Lowland (Water stands &gt;3 days)</option>
                  <option value="MODERATELY_DRAINED">Moderate (Soaks away within half a day)</option>
                  <option value="WELL_DRAINED">Fast Drainage (Elevated land / water never puddles)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  2b. Soil Depth / Hardpan Level (నేల లోతు)
                </label>
                <select
                  value={farmProfile.soilDepth || 'UNKNOWN'}
                  onChange={(e) => onChangeFarm({ ...farmProfile, soilDepth: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                >
                  <option value="UNKNOWN">I don&apos;t know / Not checked yet (తెలియదు)</option>
                  <option value="DEEP_OVER_75CM">Deep Soil (&gt;75 cm / ~2.5 ft — safe for tree roots)</option>
                  <option value="MEDIUM_30_75CM">Medium Depth (30–75 cm — good for seasonal crops)</option>
                  <option value="SHALLOW_UNDER_30CM">Shallow / Hardpan (&lt;30 cm — avoid deep orchards)</option>
                </select>
              </div>
            </div>

            {/* Soil Test / Unknown / Upload */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-slate-900">
                  3. Do you have Soil Health Card / Lab Test Results? (మట్టి పరీక్ష రిపోర్ట్ ఉందా?)
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onChangeFarm({
                        ...farmProfile,
                        soilDataSource: 'UNKNOWN_NOT_TESTED',
                        soilPh: undefined,
                        soilEc: undefined,
                        soilOrganicCarbon: undefined,
                        soilN: undefined,
                        soilP: undefined,
                        soilK: undefined,
                        soilZn: undefined
                      })
                    }
                    className={`px-3 py-1.5 rounded-lg font-bold border cursor-pointer ${
                      farmProfile.soilDataSource === 'UNKNOWN_NOT_TESTED' || farmProfile.soilDataSource === 'UNSPECIFIED'
                        ? 'bg-amber-700 text-white border-amber-800'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}
                  >
                    I don&apos;t know / Not tested yet (నాకు తెలియదు)
                  </button>

                  {farmerSoilCards.length > 0 && (
                    <select
                      onChange={(e) => {
                        const card = farmerSoilCards.find((c) => c.id === e.target.value);
                        if (!card) return;
                        onChangeFarm({
                          ...farmProfile,
                          soilDataSource: 'SHC_LINKED',
                          soilPh: card.pH.value,
                          soilEc: card.ec.value,
                          soilOrganicCarbon: card.organicCarbon.value,
                          soilN: card.nitrogen.value,
                          soilP: card.phosphorus.value,
                          soilK: card.potassium.value,
                          soilZn: card.zinc.value
                        });
                      }}
                      defaultValue=""
                      className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-medium"
                    >
                      <option value="" disabled>
                        Link Farmer SHC Card...
                      </option>
                      {farmerSoilCards.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.sampleCode} (pH {c.pH.value}, Zn {c.zinc.value} ppm)
                        </option>
                      ))}
                    </select>
                  )}

                  <label className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Upload SHC / Lab PDF</span>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          onChangeFarm({
                            ...farmProfile,
                            soilDataSource: 'SHC_UPLOADED',
                            uploadedShcFileName: f.name
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {(farmProfile.soilDataSource === 'UNKNOWN_NOT_TESTED' || farmProfile.soilDataSource === 'UNSPECIFIED') && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-950">
                  <strong>Missing Soil Test Handled Honestly:</strong> Annadatha will NOT invent NPK/pH values. Recommendations will rely only on drainage/texture and flag Soil Health Card testing as a required first step before applying fertilizers.
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {[
                  { k: 'soilPh', label: 'pH (Optional)', ph: 'e.g. 7.4' },
                  { k: 'soilEc', label: 'Salt EC dS/m', ph: 'e.g. 0.8' },
                  { k: 'soilOrganicCarbon', label: 'Org. Carbon %', ph: 'e.g. 0.6' },
                  { k: 'soilN', label: 'Nitrogen kg/ha', ph: 'e.g. 210' },
                  { k: 'soilP', label: 'Phosphorus kg/ha', ph: 'e.g. 22' },
                  { k: 'soilK', label: 'Potash kg/ha', ph: 'e.g. 260' },
                  { k: 'soilZn', label: 'Zinc ppm', ph: 'e.g. 0.55' }
                ].map((f) => (
                  <div key={f.k}>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">{f.label}</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder={f.ph}
                      value={(farmProfile as any)[f.k] ?? ''}
                      onChange={(e) => {
                        const v = e.target.value === '' ? undefined : Number(e.target.value);
                        onChangeFarm({
                          ...farmProfile,
                          soilDataSource: v !== undefined ? 'MANUAL_ENTERED' : farmProfile.soilDataSource,
                          [f.k]: v
                        });
                      }}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-xs font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: WATER AVAILABILITY */}
        {step === 4 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="A crop like Paddy or Banana needs over 1,200 mm (almost 50 lakh litres/acre!), while Black Gram or Millets grow with just 220–300 mm."
              whyTe="వరి లేదా అరటికి దాదాపు 50 లక్షల లీటర్ల నీరు అవసరం కాగా, మినుము మరియు చిరుధాన్యాలు తక్కువ నీటితో పండుతాయి."
              howEn="Borewell saltiness (EC) can be checked quickly using a pocket EC meter at KVK Ghantasala or RBK."
              howTe="బోరు నీటి ఉప్పదనం తెలియకపోతే 'తెలియదు' అని ఎంచుకోండి; KVK లేదా RBKలో పరీక్షించవచ్చు."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Primary Water Source (నీటి వనరు)</label>
                <select
                  value={farmProfile.waterSource}
                  onChange={(e) => onChangeFarm({ ...farmProfile, waterSource: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="CANAL_KRISHNA_DELTA">Government Canal Water (కాలువ నీరు - Krishna Delta)</option>
                  <option value="BOREWELL">Borewell / Tubewell (బోరు నీరు)</option>
                  <option value="FARM_POND">Farm Pond / Village Tank (చెరువు / కుంట)</option>
                  <option value="RAIN_FED">Rain Only — No Canal or Bore (కేవలం వర్షాధారం)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">How Many Months is Water Available?</label>
                <select
                  value={farmProfile.waterAvailability}
                  onChange={(e) => onChangeFarm({ ...farmProfile, waterAvailability: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="PERENNIAL">Year-round (All 12 months — suitable for tree crops)</option>
                  <option value="SEASONAL_KHARIF_RABI">Seasonal (Kharif monsoon + Rabi winter residual)</option>
                  <option value="KHARIF_ONLY">Monsoon Season Only (June–Nov)</option>
                  <option value="DEFICIT">Uncertain / Tail-end Water Shortage</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-3">
              <span className="font-semibold text-slate-800">Is your bore/canal water salty?</span>
              <button
                type="button"
                onClick={() => onChangeFarm({ ...farmProfile, waterQualityUnknown: true, waterQualityTested: false })}
                className={`px-3 py-1 rounded-lg border font-semibold cursor-pointer ${
                  farmProfile.waterQualityUnknown ? 'bg-amber-700 text-white border-amber-800' : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                I don&apos;t know (తెలియదు)
              </button>
              <button
                type="button"
                onClick={() => onChangeFarm({ ...farmProfile, waterQualityUnknown: false, waterQualityTested: true })}
                className={`px-3 py-1 rounded-lg border font-semibold cursor-pointer ${
                  farmProfile.waterQualityTested ? 'bg-blue-700 text-white border-blue-800' : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                Yes, I have EC value
              </button>
              {farmProfile.waterQualityTested && (
                <input
                  type="number"
                  step="0.1"
                  value={farmProfile.waterEc ?? 1.1}
                  onChange={(e) => onChangeFarm({ ...farmProfile, waterEc: Number(e.target.value) })}
                  placeholder="EC dS/m"
                  className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-mono"
                />
              )}
            </div>
          </div>
        )}

        {/* STEP 5: WEATHER AND CLIMATE */}
        {step === 5 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Coastal Andhra districts face October–November cyclonic winds that snap tall Banana or Moringa trees, and May heat waves (>40°C) that sunburn Dragon Fruit stems."
              whyTe="కోస్తా జిల్లాలలో తుఫాను గాలులు అరటి/మునగను విరిచేస్తాయి మరియు మే నెల ఎండలు డ్రాగన్ ఫ్రూట్‌ను కాల్చివేస్తాయి."
              howEn="If unsure, choose 'Use District Historical Average'. Note: Live IMD weather station API is currently not connected."
              howTe="తెలియకపోతే జిల్లా సగటు వాతావరణాన్ని ఎంచుకోండి."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Local Weather Hazards on Your Farm</label>
                <select
                  value={farmProfile.cycloneOrHeatRisk || 'HIGH_COASTAL_WIND'}
                  onChange={(e) => onChangeFarm({ ...farmProfile, cycloneOrHeatRisk: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="HIGH_COASTAL_WIND">High Coastal Cyclone Winds &amp; Heavy Monsoon (Krishna Delta)</option>
                  <option value="HEAT_STRESS_PRONE">Dry Inland Heat Stress (&gt;41°C May Summer)</option>
                  <option value="MODERATE">Balanced / Sheltered Microclimate</option>
                  <option value="UNKNOWN">I don&apos;t know (Use District Historical Benchmark)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Expected Annual Rainfall (mm)</label>
                <input
                  type="number"
                  value={farmProfile.annualRainfallMm ?? 980}
                  onChange={(e) => onChangeFarm({ ...farmProfile, annualRainfallMm: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Peak Season Temp (°C — Optional)</label>
                <input
                  type="number"
                  placeholder="Unknown / Use KVK Station"
                  value={farmProfile.avgTempC ?? ''}
                  onChange={(e) =>
                    onChangeFarm({
                      ...farmProfile,
                      avgTempC: e.target.value === '' ? undefined : Number(e.target.value)
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Typical Humidity (% — Optional)</label>
                <input
                  type="number"
                  placeholder="Leave blank if unknown (e.g., 78)"
                  value={farmProfile.relativeHumidityPct ?? ''}
                  onChange={(e) =>
                    onChangeFarm({
                      ...farmProfile,
                      relativeHumidityPct: e.target.value === '' ? undefined : Number(e.target.value)
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: SEASON AND PLANTING PERIOD */}
        {step === 6 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Planting at the right week avoids pest outbreaks (like Yellow Mosaic Virus in pulses or blast in late paddy) and catches peak mandi prices."
              whyTe="సరైన సమయంలో విత్తడం వల్ల తెగుళ్లు తగ్గి మంచి మార్కెట్ ధర లభిస్తుంది."
              howEn="If you want to explore year-round fruits or any upcoming rotation, choose 'All Seasons & Perennials'."
              howTe="అన్ని సీజన్ల పంటలు మరియు తోటలను చూడాలంటే 'అన్ని సీజన్లు' ఎంచుకోండి."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">When do you plan to sow/plant?</label>
                <select
                  value={farmProfile.season}
                  onChange={(e) => onChangeFarm({ ...farmProfile, season: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
                >
                  <option value="ALL">All Seasons &amp; Multi-Year Perennials (Show Everything)</option>
                  <option value="KHARIF">Kharif Monsoon (June – November)</option>
                  <option value="RABI">Rabi Winter / Rice Fallow (December – March)</option>
                  <option value="SUMMER">Summer / Zaid (February – May)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Preferred Sowing Month</label>
                <input
                  type="text"
                  value={farmProfile.sowingMonth || 'June–July'}
                  onChange={(e) => onChangeFarm({ ...farmProfile, sowingMonth: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: PREVIOUS CROPS & CROPPING HISTORY */}
        {step === 7 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Planting the same crop family repeatedly builds up pests (e.g., Chilli after Chilli invites wilt & thrips). Rotating Paddy with Black Gram naturally restores nitrogen!"
              whyTe="వరుసగా ఒకే పంట వేయడం వల్ల భూమిలో తెగుళ్లు పెరుగుతాయి. వరి తర్వాత మినుము వేస్తే భూసారం పెరుగుతుంది."
              howEn="Select 'I don\'t know / Newly leased plot' if taking over new farmland."
              howTe="కొత్తగా కౌలుకు తీసుకున్న పొలమైతే 'నాకు తెలియదు' ఎంచుకోండి."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Cropping History (గత 2–3 సీజన్ల పంటలు)</label>
                <select
                  value={farmProfile.croppingPattern || 'CONTINUOUS_PADDY'}
                  onChange={(e) => onChangeFarm({ ...farmProfile, croppingPattern: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="CONTINUOUS_PADDY">Continuous Paddy Year-After-Year (నిరంతర వరి)</option>
                  <option value="PADDY_PULSE_ROTATION">Paddy followed by Black Gram / Pulse Rotation</option>
                  <option value="HORTICULTURE_OR_VEGETABLE">Vegetables / Chilli / Orchard Crops</option>
                  <option value="FALLOW_OR_VIRGIN">Fallow / Uncultivated Land</option>
                  <option value="UNKNOWN">I don&apos;t know / Newly Leased Land</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Last Harvested Crop Name (Optional)</label>
                <input
                  type="text"
                  value={farmProfile.previousCrop || 'Paddy (BPT 5204)'}
                  onChange={(e) => onChangeFarm({ ...farmProfile, previousCrop: e.target.value })}
                  placeholder="e.g., Paddy, Chilli, Maize, or Unknown"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: INVESTMENT BUDGET */}
        {step === 8 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Short-duration crops like Gongura or Black Gram need ₹6,500–₹10,500/acre, whereas Dragon Fruit pillars + drip cost ~₹2,10,000/acre. Matching capital prevents mid-season debt distress."
              whyTe="గోంగూర/మినుముకు ₹10,500 సరిపోతే, డ్రాగన్ ఫ్రూట్ స్తంభాలకు ₹2,10,000 వరకు అవుతుంది. పెట్టుబడిని బట్టి పంట ఎంచుకోవాలి."
              howEn="You can enter your comfortable cash-in-hand per acre or click 'Show Lowest-Cost Options First' if minimizing debt."
              howTe="మీ చేతిలో ఉన్న పెట్టుబడి ఎంచుకోండి లేదా 'తక్కువ పెట్టుబడి పంటలు చూపించు' నొక్కండి."
            />
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-emerald-950">Available Capital per Acre: ₹{farmProfile.investmentBudgetPerAcre.toLocaleString()}</span>
                <button
                  type="button"
                  onClick={() =>
                    onChangeFarm({
                      ...farmProfile,
                      budgetMode: farmProfile.budgetMode === 'UNKNOWN_FLEXIBLE' ? 'MODERATE_CAPITAL' : 'UNKNOWN_FLEXIBLE'
                    })
                  }
                  className={`px-3 py-1 rounded-lg border font-semibold cursor-pointer ${
                    farmProfile.budgetMode === 'UNKNOWN_FLEXIBLE'
                      ? 'bg-emerald-800 text-white border-emerald-900'
                      : 'bg-white text-emerald-900 border-emerald-300'
                  }`}
                >
                  {farmProfile.budgetMode === 'UNKNOWN_FLEXIBLE' ? 'Flexible / Show All Budgets ✓' : "I don't know / Show All Options"}
                </button>
              </div>
              <input
                type="range"
                min="8000"
                max="250000"
                step="5000"
                value={farmProfile.investmentBudgetPerAcre}
                onChange={(e) =>
                  onChangeFarm({ ...farmProfile, budgetMode: 'MODERATE_CAPITAL', investmentBudgetPerAcre: Number(e.target.value) })
                }
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex flex-wrap gap-2 text-[11px]">
                {[12000, 25000, 35000, 60000, 120000, 220000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onChangeFarm({ ...farmProfile, budgetMode: 'MODERATE_CAPITAL', investmentBudgetPerAcre: v })}
                    className={`px-2.5 py-1 rounded border cursor-pointer ${
                      farmProfile.investmentBudgetPerAcre === v
                        ? 'bg-emerald-800 text-white border-emerald-900'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    ₹{(v / 1000).toFixed(0)}k / ac
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 9: LABOUR AND MACHINERY */}
        {step === 9 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Crops like Okra/Tomato require picking workers every 2 days. If workers are scarce during peak season, lower-labour crops like Millets or Zero-Till Pulses protect profits."
              whyTe="బెండ/టమాటాకు ప్రతి రెండు రోజులకు కూలీలు అవసరం. కూలీల కొరత ఉంటే తక్కువ శ్రమ గల చిరుధాన్యాలు/మినుము మంచిది."
              howEn="Check Custom Hiring Centres (CHC) at your village RBK for subsidized drone sprayers, power tillers, and combine harvesters."
              howTe="గ్రామ RBK కస్టమ్ హైరింగ్ సెంటర్లలో ట్రాక్టర్లు/డ్రోన్లు తక్కువ అద్దెకు లభిస్తాయి."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Worker / Family Labour Availability</label>
                <select
                  value={farmProfile.labourAvailability}
                  onChange={(e) => onChangeFarm({ ...farmProfile, labourAvailability: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="ABUNDANT">Plenty of Family / Local Farm Workers</option>
                  <option value="MODERATE">Moderate Availability (Seasonal Hired Gang)</option>
                  <option value="SCARCE_HIGH_WAGE">Scarce / Very High Peak Harvest Wages</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Machinery &amp; Custom Hiring Access</label>
                <select
                  value={farmProfile.machineryAvailability || 'FULL_CUSTOM_HIRING'}
                  onChange={(e) => onChangeFarm({ ...farmProfile, machineryAvailability: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="FULL_CUSTOM_HIRING">RBK Custom Hiring / Tractor &amp; Harvester Available</option>
                  <option value="LIMITED_TRACTOR">Tractor Ploughing Only (Manual Harvest)</option>
                  <option value="MANUAL_ONLY">Limited Machinery / Steep Slope Plots</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Seeds, Fertilizers &amp; Nursery Access</label>
                <select
                  value={farmProfile.seedAndInputAccess || 'FULL_RBK_DEALER_ACCESS'}
                  onChange={(e) => onChangeFarm({ ...farmProfile, seedAndInputAccess: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="FULL_RBK_DEALER_ACCESS">RBK Certified Seeds + Local Dealers Nearby</option>
                  <option value="MODERATE_LOCAL_DEALER">Basic Staples Only (Specialty Nursery Preorder)</option>
                  <option value="CONSTRAINED_REMOTE">Remote / Inputs Must Be Transported Long Distance</option>
                  <option value="UNKNOWN">I don&apos;t know (Verify at RBK first)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Organic Manure / FYM Compost Availability</label>
                <select
                  value={farmProfile.fymOrCompostAvailable || 'PURCHASE_LOCALLY'}
                  onChange={(e) => onChangeFarm({ ...farmProfile, fymOrCompostAvailable: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="AVAILABLE_OWN_DAIRY">Available from Own Dairy / Buffalo Shed</option>
                  <option value="PURCHASE_LOCALLY">Available to Buy Locally (₹1,500–2,500/tractor load)</option>
                  <option value="SCARCE">Scarce / Very Expensive to Transport</option>
                  <option value="UNKNOWN">I don&apos;t know</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 10: FARMER OBJECTIVES */}
        {step === 10 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="There is no single 'best crop' for every farmer. Some need fast cash with zero debt; others want high family nutrition or long-term orchards. Your weights adjust our balanced ranking and show trade-offs."
              whyTe="ప్రతి రైతు లక్ష్యం వేరు. తక్కువ అప్పు, వేగవంతమైన ఆదాయం, లేదా పోషకాహారం — మీ ప్రాధాన్యతల ప్రకారం 10 ప్రత్యేక జాబితాలు వస్తాయి."
              howEn="Slide higher for goals most important to your household right now."
              howTe="మీ కుటుంబానికి ముఖ్యమైన లక్ష్యాలను ఎక్కువగా సెట్ చేయండి."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              {(
                [
                  { key: 'lowestInvestment', label: 'Save Upfront Capital (Lowest Cost)' },
                  { key: 'lowestWater', label: 'Save Irrigation Water (Drought Safe)' },
                  { key: 'highestNutrition', label: 'Grow Nutrient-Rich Food (ICMR-NIN)' },
                  { key: 'highestProfit', label: 'Maximize Annual Net Cash Profit' },
                  { key: 'fastestReturn', label: 'Get Fast Cash Return (Short Cycle)' },
                  { key: 'lowestRisk', label: 'Minimize Failure & Chemical Risk' }
                ] as { key: keyof PriorityWeights; label: string }[]
              ).map((obj) => (
                <div key={obj.key} className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <div className="flex justify-between font-bold text-slate-800 text-[11px] mb-1">
                    <span>{obj.label}</span>
                    <span className="font-mono text-emerald-800">{priorityWeights[obj.key]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priorityWeights[obj.key]}
                    onChange={(e) => onChangeWeights({ ...priorityWeights, [obj.key]: Number(e.target.value) })}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 11: MARKET AND BUYER ACCESS */}
        {step === 11 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Fresh vegetables & leafy greens spoil in 24–36 hours if a buyer is far away. High-value crops like Dragon Fruit or Ashwagandha require verified wholesale or processor buyers."
              whyTe="కూరగాయలు/ఆకుకూరలు 24 గంటల్లో పాడవుతాయి. డ్రాగన్ ఫ్రూట్ లేదా ఔషధ పంటలకు ముందుగానే కొనుగోలుదారులు ఉండాలి."
              howEn="Choose your nearest mandi, Rythu Bazar, or farmgate aggregator."
              howTe="సమీప మార్కెట్ యార్డ్ లేదా రైతు బజార్ దూరం నమోదు చేయండి."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Where Will You Sell Produce?</label>
                <select
                  value={farmProfile.marketAccess}
                  onChange={(e) => onChangeFarm({ ...farmProfile, marketAccess: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="DIRECT_GUDLAVALLERU_AMIC">Local AMIC / Govt MSP Procurement</option>
                  <option value="VIJAYAWADA_COMMERCIAL">Vijayawada / Guntur Commercial Mandi</option>
                  <option value="LOCAL_RYTHU_BAZAR">Weekly Village Market / Rythu Bazar</option>
                  <option value="FARMGATE_MIDDLEMAN">Farmgate Trader Pickup</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Distance to Nearest Market (km)</label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={farmProfile.marketDistanceKm ?? 8}
                  onChange={(e) => onChangeFarm({ ...farmProfile, marketDistanceKm: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-300 rounded-lg w-full cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={Boolean(farmProfile.coldStorageAvailable)}
                    onChange={(e) => onChangeFarm({ ...farmProfile, coldStorageAvailable: e.target.checked })}
                    className="accent-emerald-700"
                  />
                  <span>Cold Storage / Crate Transport Access</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 12: OPTIONAL DOCUMENTS & LAUNCH */}
        {step === 12 && (
          <div className="space-y-4">
            <WhyBox
              whyEn="Optional Soil Health Card or tenant CCRC certificate notes help Agricultural Experts verify your plan faster in the Expert Review Queue."
              whyTe="మట్టి పరీక్ష రిపోర్ట్ లేదా CCRC కౌలు కార్డు వివరాలు ఉంటే నిపుణులు త్వరగా ఆమోదించగలరు."
              howEn="Documents are completely optional. Click 'Discover Crops' below even if you skip uploading."
              howTe="పత్రాలు తప్పనిసరి కాదు — నేరుగా పంటల అన్వేషణను ప్రారంభించవచ్చు."
            />
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 bg-white rounded-lg border border-emerald-100 space-y-1">
                  <div className="font-bold text-slate-900">Assessment Summary Ready</div>
                  <div><strong>Location:</strong> {location.village}, {location.mandal} ({location.classification})</div>
                  <div><strong>Area:</strong> {farmProfile.acreage} Acres · <strong>Drainage:</strong> {farmProfile.soilDrainage.replace(/_/g, ' ')}</div>
                  <div><strong>Water:</strong> {farmProfile.waterSource.replace(/_/g, ' ')} · <strong>Budget:</strong> ₹{farmProfile.investmentBudgetPerAcre.toLocaleString()}/ac</div>
                  <div><strong>Soil Lab Status:</strong> {farmProfile.soilDataSource || 'Not Tested (Safe Mode)'}</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-100 space-y-2">
                  <div className="font-bold text-slate-900">Optional Document Reference (CCRC / SHC Note)</div>
                  <input
                    type="text"
                    value={farmProfile.optionalLeaseOrLandDoc || ''}
                    onChange={(e) => onChangeFarm({ ...farmProfile, optionalLeaseOrLandDoc: e.target.value })}
                    placeholder="Optional: CCRC #, Passbook Khata #, or SHC note"
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded"
                  />
                  <div className="text-[10px] text-slate-500">
                    Uploaded SHC: {farmProfile.uploadedShcFileName || 'None attached (optional)'}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onFinishWizard}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Wizard &amp; Run Research-Driven Crop Discovery</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Wizard Navigation */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-700 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Changes update all 10 crop rankings immediately</span>
        </div>

        {step < 12 ? (
          <button
            type="button"
            onClick={() => setStep(Math.min(12, step + 1))}
            className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onFinishWizard}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold cursor-pointer"
          >
            Finish &amp; View Results
          </button>
        )}
      </div>
    </div>
  );
};
