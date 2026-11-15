import React from 'react';
import {
  FarmEvaluationProfile,
  LandAreaUnit,
  Language,
  PriorityWeights,
  SoilDrainageType,
  SoilHealthCard
} from '../../types';
import { Sliders, Upload, ShieldAlert, Droplets, IndianRupee, Scale } from 'lucide-react';

interface Props {
  language: Language;
  farmProfile: FarmEvaluationProfile;
  onChange: (next: FarmEvaluationProfile) => void;
  farmerSoilCards: SoilHealthCard[];
  priorityWeights: PriorityWeights;
  onChangeWeights: (next: PriorityWeights) => void;
}

export const FarmIntelligencePanel: React.FC<Props> = ({
  language,
  farmProfile,
  onChange,
  farmerSoilCards,
  priorityWeights,
  onChangeWeights
}) => {
  const unit: LandAreaUnit = farmProfile.landAreaUnit || 'ACRES';
  const rawArea = farmProfile.landAreaValue ?? farmProfile.acreage;

  const handleAreaChange = (val: number, newUnit: LandAreaUnit) => {
    const safeVal = Math.max(0.1, val);
    let acres = safeVal;
    if (newUnit === 'HECTARES') acres = Number((safeVal * 2.47105).toFixed(2));
    else if (newUnit === 'CENTS') acres = Number((safeVal / 100).toFixed(2));

    onChange({
      ...farmProfile,
      landAreaValue: safeVal,
      landAreaUnit: newUnit,
      acreage: Math.max(0.1, acres)
    });
  };

  const handleLinkExistingShc = (cardId: string) => {
    const card = farmerSoilCards.find((c) => c.id === cardId);
    if (!card) return;
    onChange({
      ...farmProfile,
      soilDataSource: 'SHC_LINKED',
      soilPh: card.pH.value,
      soilEc: card.ec.value,
      soilOrganicCarbon: card.organicCarbon.value,
      soilN: card.nitrogen.value,
      soilP: card.phosphorus.value,
      soilK: card.potassium.value,
      soilZn: card.zinc.value,
      soilFe: card.iron.value,
      soilB: card.boron.value,
      soilS: card.sulphur.value
    });
  };

  const handleShcFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange({
      ...farmProfile,
      soilDataSource: 'SHC_UPLOADED',
      uploadedShcFileName: file.name
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-5 text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'te'
              ? 'మాడ్యూల్ 2 & 4: పొలం వివరాలు, భూసార పరీక్ష, పెట్టుబడి & ప్రాధాన్యతలు'
              : 'Module 2 & 4: Farm Intelligence, Soil Test Data & Multi-Objective Priorities'}
          </h3>
        </div>
        <span className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium">
          Normalized Area: <strong>{farmProfile.acreage} Acres</strong> ({(farmProfile.acreage * 0.4047).toFixed(2)} Ha)
        </span>
      </div>

      {/* Section A: Core Land, Soil Drainage, Water, Season, Labour, Market */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Land Area + Unit Converter */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            {language === 'te' ? 'సాగు విస్తీర్ణం & యూనిట్' : 'Total Cultivated Land Area'}
          </label>
          <div className="flex gap-1.5">
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={rawArea}
              onChange={(e) => handleAreaChange(Number(e.target.value), unit)}
              className="w-24 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
            />
            <select
              value={unit}
              onChange={(e) => handleAreaChange(rawArea, e.target.value as LandAreaUnit)}
              className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            >
              <option value="ACRES">Acres</option>
              <option value="HECTARES">Hectares</option>
              <option value="CENTS">Cents (100 = 1 ac)</option>
            </select>
          </div>
        </div>

        {/* Soil Type */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Soil Texture / Type</label>
          <select
            value={farmProfile.soilType}
            onChange={(e) => onChange({ ...farmProfile, soilType: e.target.value as any })}
            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          >
            <option value="BLACK_COTTON">Deep Black Cotton (Vertisol)</option>
            <option value="COASTAL_ALLUVIAL">Coastal Alluvial Delta</option>
            <option value="CLAY_LOAM">Clay Loam</option>
            <option value="RED_LOAM">Red Loam (Upland)</option>
            <option value="SANDY_CLAY">Sandy Clay Loam</option>
          </select>
        </div>

        {/* Soil Drainage & Waterlogging Risk */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Soil Drainage & Waterlogging</label>
          <select
            value={farmProfile.soilDrainage}
            onChange={(e) => onChange({ ...farmProfile, soilDrainage: e.target.value as SoilDrainageType })}
            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
          >
            <option value="POORLY_DRAINED_CLAY">Poorly Drained Clay (Slow)</option>
            <option value="WATERLOGGED_LOWLAND">Waterlogged Lowland (Flood Risk)</option>
            <option value="MODERATELY_DRAINED">Moderately Drained Loam</option>
            <option value="WELL_DRAINED">Well Drained Upland / Raised Beds</option>
          </select>
        </div>

        {/* Water Source */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Water Source</label>
          <select
            value={farmProfile.waterSource}
            onChange={(e) => onChange({ ...farmProfile, waterSource: e.target.value as any })}
            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          >
            <option value="CANAL_KRISHNA_DELTA">Canal Irrigation (Krishna Delta)</option>
            <option value="BOREWELL">Borewell / Open Well</option>
            <option value="FARM_POND">Farm Pond / Tank</option>
            <option value="RAIN_FED">Rainfed Only</option>
          </select>
        </div>

        {/* Water Availability */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Irrigation Availability</label>
          <select
            value={farmProfile.waterAvailability}
            onChange={(e) => onChange({ ...farmProfile, waterAvailability: e.target.value as any })}
            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          >
            <option value="SEASONAL_KHARIF_RABI">Seasonal (Kharif + Rabi)</option>
            <option value="PERENNIAL">Perennial (Year-Round Assured)</option>
            <option value="KHARIF_ONLY">Kharif Monsoon Only</option>
            <option value="DEFICIT">Deficit / Tail-End Stress</option>
          </select>
        </div>

        {/* Season & Sowing Window */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Season & Sowing Month</label>
          <div className="flex gap-1.5">
            <select
              value={farmProfile.season}
              onChange={(e) => onChange({ ...farmProfile, season: e.target.value as any })}
              className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            >
              <option value="ALL">All Seasons</option>
              <option value="KHARIF">Kharif (Jun–Nov)</option>
              <option value="RABI">Rabi (Dec–Mar)</option>
              <option value="SUMMER">Summer (Feb–May)</option>
            </select>
            <input
              type="text"
              value={farmProfile.sowingMonth || 'June–July'}
              onChange={(e) => onChange({ ...farmProfile, sowingMonth: e.target.value })}
              placeholder="Sowing month"
              className="w-24 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Labour & Machinery */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Labour & Machinery Access</label>
          <div className="flex gap-1.5">
            <select
              value={farmProfile.labourAvailability}
              onChange={(e) => onChange({ ...farmProfile, labourAvailability: e.target.value as any })}
              className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            >
              <option value="MODERATE">Labour: Moderate</option>
              <option value="ABUNDANT">Labour: Abundant</option>
              <option value="SCARCE_HIGH_WAGE">Labour: Scarce/High Wage</option>
            </select>
            <select
              value={farmProfile.machineryAvailability || 'FULL_CUSTOM_HIRING'}
              onChange={(e) => onChange({ ...farmProfile, machineryAvailability: e.target.value as any })}
              className="w-28 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            >
              <option value="FULL_CUSTOM_HIRING">CHC Full Machinery</option>
              <option value="LIMITED_TRACTOR">Tractor Only</option>
              <option value="MANUAL_ONLY">Manual Only</option>
            </select>
          </div>
        </div>

        {/* Market Channel & Distance */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Market Channel & Distance (km)</label>
          <div className="flex gap-1.5">
            <select
              value={farmProfile.marketAccess}
              onChange={(e) => onChange({ ...farmProfile, marketAccess: e.target.value as any })}
              className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            >
              <option value="DIRECT_GUDLAVALLERU_AMIC">Local AMIC Mandi</option>
              <option value="VIJAYAWADA_COMMERCIAL">Vijayawada Terminal</option>
              <option value="LOCAL_RYTHU_BAZAR">Rythu Bazar Direct</option>
              <option value="FARMGATE_MIDDLEMAN">Farmgate Buyer</option>
            </select>
            <input
              type="number"
              min="1"
              max="200"
              value={farmProfile.marketDistanceKm ?? 8}
              onChange={(e) => onChange({ ...farmProfile, marketDistanceKm: Number(e.target.value) })}
              title="Distance in km"
              className="w-16 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>
        </div>
      </div>

      {/* Section B: Soil Health Card & Tested Water Quality (NEVER INFERRED FROM GPS) */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold text-slate-900">
                Soil Test Chemistry & Water Quality (Farmer-Entered or Linked SHC Only)
              </span>
              <p className="text-[11px] text-slate-600">
                Annadatha never guesses pH, EC, N-P-K, or micronutrients from GPS coordinates.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {farmerSoilCards.length > 0 && (
              <select
                onChange={(e) => handleLinkExistingShc(e.target.value)}
                defaultValue=""
                className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-[11px] font-medium"
              >
                <option value="" disabled>
                  Load Farmer Soil Health Card...
                </option>
                {farmerSoilCards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.sampleCode} ({c.testDate} · pH {c.pH.value})
                  </option>
                ))}
              </select>
            )}

            <label className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-[11px] font-semibold cursor-pointer flex items-center gap-1">
              <Upload className="w-3 h-3 text-emerald-700" />
              <span>Upload SHC Photo/PDF</span>
              <input type="file" accept=".pdf,image/*" onChange={handleShcFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        {farmProfile.uploadedShcFileName && (
          <div className="px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900">
            Uploaded document: <strong>{farmProfile.uploadedShcFileName}</strong> — Marked as{' '}
            <em>Farmer-uploaded / Pending KVK lab verification</em>. Enter key lab values below to apply them to crop chemistry rules.
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {[
            { key: 'soilPh', label: 'pH', placeholder: '7.4' },
            { key: 'soilEc', label: 'EC (dS/m)', placeholder: '0.8' },
            { key: 'soilOrganicCarbon', label: 'OC (%)', placeholder: '0.62' },
            { key: 'soilN', label: 'N (kg/ha)', placeholder: '210' },
            { key: 'soilP', label: 'P (kg/ha)', placeholder: '22' },
            { key: 'soilK', label: 'K (kg/ha)', placeholder: '260' },
            { key: 'soilZn', label: 'Zn (ppm)', placeholder: '0.58' },
            { key: 'soilFe', label: 'Fe (ppm)', placeholder: '4.8' },
            { key: 'soilB', label: 'B (ppm)', placeholder: '0.6' },
            { key: 'soilS', label: 'S (ppm)', placeholder: '12' }
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">{field.label}</label>
              <input
                type="number"
                step="0.01"
                value={(farmProfile as any)[field.key] ?? ''}
                placeholder={field.placeholder}
                onChange={(e) => {
                  const v = e.target.value === '' ? undefined : Number(e.target.value);
                  onChange({
                    ...farmProfile,
                    soilDataSource: v !== undefined ? 'MANUAL_ENTERED' : farmProfile.soilDataSource || 'UNSPECIFIED',
                    [field.key]: v
                  });
                }}
                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[11px] font-mono"
              />
            </div>
          ))}
        </div>

        {/* Optional Water Quality */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200 text-[11px]">
          <label className="flex items-center gap-1.5 font-semibold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(farmProfile.waterQualityTested)}
              onChange={(e) => onChange({ ...farmProfile, waterQualityTested: e.target.checked })}
              className="accent-blue-700"
            />
            <Droplets className="w-3.5 h-3.5 text-blue-600" />
            <span>Water Quality Lab Tested (EC / pH)</span>
          </label>
          {farmProfile.waterQualityTested && (
            <div className="flex items-center gap-2">
              <span>Water EC (dS/m):</span>
              <input
                type="number"
                step="0.1"
                value={farmProfile.waterEc ?? 1.1}
                onChange={(e) => onChange({ ...farmProfile, waterEc: Number(e.target.value) })}
                className="w-16 px-2 py-0.5 bg-white border border-slate-300 rounded font-mono"
              />
              <span>Water pH:</span>
              <input
                type="number"
                step="0.1"
                value={farmProfile.waterPh ?? 7.4}
                onChange={(e) => onChange({ ...farmProfile, waterPh: Number(e.target.value) })}
                className="w-16 px-2 py-0.5 bg-white border border-slate-300 rounded font-mono"
              />
            </div>
          )}
        </div>
      </div>

      {/* Section C: Investment Budget & Multi-Objective Priority Weights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
        {/* Investment Budget */}
        <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-emerald-700" />
              <span>Available Investment Budget (₹ / Acre)</span>
            </span>
            <span className="font-bold text-sm font-mono text-emerald-900">
              ₹{farmProfile.investmentBudgetPerAcre.toLocaleString()}/ac
            </span>
          </div>
          <input
            type="range"
            min="8000"
            max="250000"
            step="2000"
            value={farmProfile.investmentBudgetPerAcre}
            onChange={(e) => onChange({ ...farmProfile, investmentBudgetPerAcre: Number(e.target.value) })}
            className="w-full accent-emerald-700 cursor-pointer"
          />
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {[12000, 25000, 35000, 60000, 120000, 220000].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onChange({ ...farmProfile, investmentBudgetPerAcre: v })}
                className={`px-2 py-0.5 rounded border cursor-pointer ${
                  farmProfile.investmentBudgetPerAcre === v
                    ? 'bg-emerald-800 text-white border-emerald-900'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                ₹{(v / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Objective Priority Sliders */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>Farmer Priority Weights (Multi-Objective Balance)</span>
            </span>
            <span className="text-[10px] text-slate-500">0 = Ignore · 100 = Top Priority</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2">
            {(
              [
                { key: 'lowestInvestment', label: 'Low Investment' },
                { key: 'lowestWater', label: 'Low Water' },
                { key: 'highestNutrition', label: 'High Nutrition' },
                { key: 'highestProfit', label: 'High Net Profit' },
                { key: 'fastestReturn', label: 'Fast Return' },
                { key: 'lowestRisk', label: 'Low Risk / Chem' }
              ] as { key: keyof PriorityWeights; label: string }[]
            ).map((w) => (
              <div key={w.key}>
                <div className="flex justify-between text-[10px] font-medium text-slate-700">
                  <span>{w.label}</span>
                  <span className="font-mono">{priorityWeights[w.key]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={priorityWeights[w.key]}
                  onChange={(e) =>
                    onChangeWeights({ ...priorityWeights, [w.key]: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-700 h-1.5 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
