import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SoilHealthCard, SoilNutrientValue } from '../types';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  TestTube2,
  UploadCloud,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  FileText,
  Plus,
  RefreshCw,
  HelpCircle,
  FlaskConical
} from 'lucide-react';

export const SoilIntelligencePage: React.FC = () => {
  const { language, soilCards, addSoilCard, parcels, farmers } = useApp();
  const [selectedCard, setSelectedCard] = useState<SoilHealthCard>(soilCards[0]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  // Manual entry form state
  const [formState, setFormState] = useState({
    parcelId: parcels[0]?.id || '',
    farmerId: farmers[0]?.id || '',
    sampleCode: `GUD-LAB-${Math.floor(100 + Math.random() * 900)}`,
    pH: 7.8,
    ec: 0.52,
    organicCarbon: 0.44,
    nitrogen: 210,
    phosphorus: 34,
    potassium: 340,
    zinc: 0.52,
    iron: 6.2,
    boron: 0.42,
    sulphur: 12.5,
    testingLab: 'KVK Ghantasala Soil Diagnostic Lab (Krishna)'
  });

  const handleSimulateCardUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const evaluateStatus = (val: number, low: number, high: number): 'LOW' | 'OPTIMAL' | 'HIGH' => {
      if (val < low) return 'LOW';
      if (val > high) return 'HIGH';
      return 'OPTIMAL';
    };

    const newCard: SoilHealthCard = {
      id: `SHC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      parcelId: formState.parcelId || parcels[0]?.id || 'PRC-01',
      farmerId: formState.farmerId || farmers[0]?.id || 'AP-KRI-01',
      sampleCode: formState.sampleCode,
      testDate: new Date().toISOString().split('T')[0],
      testingLab: formState.testingLab,
      status: 'PENDING_LAB_CONFIRMATION',
      sourceTag: 'FARMER_ENTERED',
      pH: {
        value: Number(formState.pH),
        unit: 'pH scale',
        status: evaluateStatus(Number(formState.pH), 6.5, 8.2),
        optimalRange: '6.5 - 8.2',
        remediation: Number(formState.pH) > 8.0 ? 'Slightly alkaline; apply organic compost and use SSP over DAP.' : 'Favorable neutral-alkaline range.'
      },
      ec: {
        value: Number(formState.ec),
        unit: 'dS/m',
        status: Number(formState.ec) < 1.0 ? 'OPTIMAL' : 'HIGH',
        optimalRange: '< 1.0 dS/m',
        remediation: 'Non-saline conditions.'
      },
      organicCarbon: {
        value: Number(formState.organicCarbon),
        unit: '%',
        status: evaluateStatus(Number(formState.organicCarbon), 0.5, 0.75),
        optimalRange: '0.50 - 0.75%',
        remediation: 'Incorporate 4 tonnes/acre Farm Yard Manure (FYM) or green manure with Dhaincha.'
      },
      nitrogen: {
        value: Number(formState.nitrogen),
        unit: 'kg/ha',
        status: evaluateStatus(Number(formState.nitrogen), 280, 560),
        optimalRange: '280 - 560 kg/ha',
        remediation: 'Apply recommended split doses of Neem-coated Urea.'
      },
      phosphorus: {
        value: Number(formState.phosphorus),
        unit: 'kg/ha',
        status: evaluateStatus(Number(formState.phosphorus), 23, 56),
        optimalRange: '23 - 56 kg/ha',
        remediation: 'Apply 40 kg DAP/acre basal.'
      },
      potassium: {
        value: Number(formState.potassium),
        unit: 'kg/ha',
        status: evaluateStatus(Number(formState.potassium), 140, 280),
        optimalRange: '140 - 280 kg/ha',
        remediation: 'High reserve in delta clay; economize MOP dose by 20%.'
      },
      sulphur: {
        value: Number(formState.sulphur),
        unit: 'ppm',
        status: evaluateStatus(Number(formState.sulphur), 10, 20),
        optimalRange: '10 - 20 ppm',
        remediation: 'Adequate.'
      },
      calcium: {
        value: 28.5,
        unit: 'meq/100g',
        status: 'OPTIMAL',
        optimalRange: '15 - 30 meq/100g',
        remediation: 'Normal.'
      },
      magnesium: {
        value: 8.4,
        unit: 'meq/100g',
        status: 'OPTIMAL',
        optimalRange: '5 - 15 meq/100g',
        remediation: 'Normal.'
      },
      zinc: {
        value: Number(formState.zinc),
        unit: 'ppm',
        status: Number(formState.zinc) < 0.6 ? 'VERY_LOW' : 'OPTIMAL',
        optimalRange: '0.60 - 1.20 ppm',
        remediation: 'Broadcast 20 kg Zinc Sulphate (21%) per acre at puddling.'
      },
      iron: {
        value: Number(formState.iron),
        unit: 'ppm',
        status: 'OPTIMAL',
        optimalRange: '4.5 - 9.0 ppm',
        remediation: 'Normal under submergence.'
      },
      copper: {
        value: 0.95,
        unit: 'ppm',
        status: 'OPTIMAL',
        optimalRange: '0.20 - 0.80 ppm',
        remediation: 'Sufficient.'
      },
      manganese: {
        value: 4.2,
        unit: 'ppm',
        status: 'OPTIMAL',
        optimalRange: '2.0 - 6.0 ppm',
        remediation: 'Sufficient.'
      },
      boron: {
        value: Number(formState.boron),
        unit: 'ppm',
        status: evaluateStatus(Number(formState.boron), 0.5, 1.0),
        optimalRange: '0.50 - 1.00 ppm',
        remediation: 'Foliar spray of 0.2% Solubor at panicle initiation.'
      },
      overallRating: 'MODERATE',
      expertRemediationNotes: 'Manual entry logged. Awaiting field officer and agronomist verification.'
    };

    addSoilCard(newCard);
    setSelectedCard(newCard);
    setShowManualForm(false);
  };

  const getStatusColor = (status: SoilNutrientValue['status']) => {
    switch (status) {
      case 'VERY_LOW':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'LOW':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'OPTIMAL':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'HIGH':
        return 'text-blue-800 bg-blue-50 border-blue-200';
      case 'EXCESSIVE':
        return 'text-purple-800 bg-purple-50 border-purple-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'నేల ఆరోగ్య సమాచారం & పోషకాల విశ్లేషణ' : 'Soil Intelligence & Health Card (SHC)'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'సాయిల్ హెల్త్ కార్డు అప్‌లోడ్, 14 పారామీటర్ల పోషక స్థాయిలు, మరియు సిఫార్సు చేసిన ఎరువుల మోతాదు'
              : 'Soil test digitization, Krishna Delta vertisol nutrient deficit diagnostics, and fertilizer prescription.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowManualForm(!showManualForm)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
            <span>{showManualForm ? 'Hide Entry Form' : 'Manual Data Entry'}</span>
          </button>
        </div>
      </div>

      <DataDisclaimerBanner sourceNote="KVK Ghantasala Diagnostic Standards & ANGRAU Soil Science" compact />

      {/* Upload & Card Selector Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Upload Box Simulator */}
        <div className="md:col-span-1 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <UploadCloud className="w-4 h-4 text-emerald-600" />
              <span>{language === 'te' ? 'కార్డు అప్‌లోడ్ (OCR సిమ్యులేటర్)' : 'Digital Soil Card Upload'}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Upload physical Soil Health Card photo or PDF. Simulated OCR automatically extracts 14 macro and micro-nutrients.
            </p>
          </div>

          <div className="mt-3">
            <button
              onClick={handleSimulateCardUpload}
              disabled={isUploading}
              className="w-full py-2.5 px-3 border border-dashed border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50 rounded-lg text-xs font-semibold text-emerald-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Extracting Lab Readings...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Simulate Card Scan & OCR</span>
                </>
              )}
            </button>

            {uploadSuccess && (
              <div className="mt-2 text-[11px] text-emerald-800 font-medium flex items-center gap-1 bg-emerald-100/70 p-1.5 rounded">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Simulated sample extracted: Sample #GUD-DKP-S092 loaded!</span>
              </div>
            )}
          </div>
        </div>

        {/* Available Tested Cards in Demo */}
        <div className="md:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900">
              {language === 'te' ? 'లభ్యతలో ఉన్న సాయిల్ కార్డులు' : 'Available Lab Tested Soil Cards'}
            </span>
            <span className="text-[11px] text-slate-500">
              {soilCards.length} Cards Loaded
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {soilCards.map(card => {
              const isSelected = selectedCard?.id === card.id;
              const farmer = farmers.find(f => f.id === card.farmerId);
              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-colors flex items-center justify-between text-xs ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 font-medium'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
                      {card.overallRating === 'HEALTHY' ? 'H' : 'M'}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        Sample #{card.sampleCode} · {farmer?.fullName || 'Farmer'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Lab: {card.testingLab} · Tested: {card.testDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={card.sourceTag} type="source" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Manual Entry Form Collapsible */}
      {showManualForm && (
        <div className="bg-white p-5 rounded-xl border border-emerald-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900">
                Manual Soil Nutrient Entry Form (Soil Health Card)
              </h2>
            </div>
            <button
              onClick={() => setShowManualForm(false)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Close Form
            </button>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Target Farm Parcel *</label>
                <select
                  value={formState.parcelId}
                  onChange={(e) => setFormState({ ...formState, parcelId: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  {parcels.map(p => (
                    <option key={p.id} value={p.id}>
                      Survey #{p.surveyNumber} ({p.village}) — {p.farmerName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Soil Sample Lab Code</label>
                <input
                  type="text"
                  value={formState.sampleCode}
                  onChange={(e) => setFormState({ ...formState, sampleCode: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Testing Laboratory</label>
                <input
                  type="text"
                  value={formState.testingLab}
                  onChange={(e) => setFormState({ ...formState, testingLab: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Chemical & Physical */}
            <div>
              <div className="text-xs font-bold text-slate-800 mb-2">1. Chemical Parameters (pH, EC, Organic Carbon)</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1">Soil pH (Optimal: 6.5 - 8.2)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formState.pH}
                    onChange={(e) => setFormState({ ...formState, pH: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Electrical Conductivity EC (dS/m)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={formState.ec}
                    onChange={(e) => setFormState({ ...formState, ec: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Organic Carbon OC % (Optimal: 0.5 - 0.75)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formState.organicCarbon}
                    onChange={(e) => setFormState({ ...formState, organicCarbon: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Macronutrients */}
            <div>
              <div className="text-xs font-bold text-slate-800 mb-2">2. Primary Macronutrients (kg/ha)</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1">Available Nitrogen N (kg/ha)</label>
                  <input
                    type="number"
                    value={formState.nitrogen}
                    onChange={(e) => setFormState({ ...formState, nitrogen: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Available Phosphorus P (kg/ha)</label>
                  <input
                    type="number"
                    value={formState.phosphorus}
                    onChange={(e) => setFormState({ ...formState, phosphorus: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Available Potassium K (kg/ha)</label>
                  <input
                    type="number"
                    value={formState.potassium}
                    onChange={(e) => setFormState({ ...formState, potassium: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Micronutrients */}
            <div>
              <div className="text-xs font-bold text-slate-800 mb-2">3. Micronutrients (ppm)</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1">Zinc Zn (ppm) [Critical for Delta]</label>
                  <input
                    type="number"
                    step="0.05"
                    value={formState.zinc}
                    onChange={(e) => setFormState({ ...formState, zinc: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Iron Fe (ppm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formState.iron}
                    onChange={(e) => setFormState({ ...formState, iron: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Boron B (ppm)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={formState.boron}
                    onChange={(e) => setFormState({ ...formState, boron: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowManualForm(false)}
                className="px-3 py-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-700 text-white font-semibold rounded hover:bg-emerald-800 cursor-pointer"
              >
                Save & Analyze Soil Parameters
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Selected Soil Card Detail Dashboard */}
      {selectedCard && (
        <div className="space-y-6">
          {/* Card Meta Header */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-800">
                  {selectedCard.sampleCode}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-600">
                  Tested at: {selectedCard.testingLab}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Soil Health Analysis & Agronomic Diagnostics
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">
                Target Parcel: {selectedCard.parcelId} · Test Date: {selectedCard.testDate}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge status={selectedCard.sourceTag} type="source" />
              <div className="px-3 py-1.5 rounded-lg bg-emerald-100/70 border border-emerald-300 text-xs font-semibold text-emerald-900">
                Overall: {selectedCard.overallRating}
              </div>
            </div>
          </div>

          {/* Primary Parameter Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* pH */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Soil Reaction (pH)</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.pH.status)}`}>
                  {selectedCard.pH.status}
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold font-display text-slate-900 tabular-nums">
                {selectedCard.pH.value}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Optimal: {selectedCard.pH.optimalRange}
              </div>
            </div>

            {/* EC */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Salinity (EC)</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.ec.status)}`}>
                  {selectedCard.ec.status}
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold font-display text-slate-900 tabular-nums">
                {selectedCard.ec.value} <span className="text-xs font-normal text-slate-500">dS/m</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Optimal: {selectedCard.ec.optimalRange}
              </div>
            </div>

            {/* Organic Carbon */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Organic Carbon (OC)</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.organicCarbon.status)}`}>
                  {selectedCard.organicCarbon.status}
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold font-display text-slate-900 tabular-nums">
                {selectedCard.organicCarbon.value}%
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Optimal: {selectedCard.organicCarbon.optimalRange}
              </div>
            </div>

            {/* Zinc (Critical for Krishna Delta) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Zinc (Zn) Micronutrient</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.zinc.status)}`}>
                  {selectedCard.zinc.status}
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold font-display text-rose-700 tabular-nums">
                {selectedCard.zinc.value} <span className="text-xs font-normal text-slate-500">ppm</span>
              </div>
              <div className="text-[11px] text-rose-700 font-semibold mt-1">
                Deficit in Delta Vertisols!
              </div>
            </div>
          </div>

          {/* Full Nutrient Grid */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Detailed 14-Parameter Nutrient Inventory & Optimal Delta Benchmarks
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Source: ANGRAU Soil Science Standards
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                    <th className="py-2.5 px-4">Nutrient / Parameter</th>
                    <th className="py-2.5 px-3 text-right">Tested Value</th>
                    <th className="py-2.5 px-3">Unit</th>
                    <th className="py-2.5 px-3">Optimal Range</th>
                    <th className="py-2.5 px-3">Rating</th>
                    <th className="py-2.5 px-4">Agronomic Remediation & Guidance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">Nitrogen (N)</td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-amber-800">{selectedCard.nitrogen.value}</td>
                    <td className="py-2.5 px-3">{selectedCard.nitrogen.unit}</td>
                    <td className="py-2.5 px-3 text-slate-500">{selectedCard.nitrogen.optimalRange}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.nitrogen.status)}`}>
                        {selectedCard.nitrogen.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{selectedCard.nitrogen.remediation}</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">Phosphorus (P)</td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-slate-800">{selectedCard.phosphorus.value}</td>
                    <td className="py-2.5 px-3">{selectedCard.phosphorus.unit}</td>
                    <td className="py-2.5 px-3 text-slate-500">{selectedCard.phosphorus.optimalRange}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.phosphorus.status)}`}>
                        {selectedCard.phosphorus.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{selectedCard.phosphorus.remediation}</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">Potassium (K)</td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-blue-800">{selectedCard.potassium.value}</td>
                    <td className="py-2.5 px-3">{selectedCard.potassium.unit}</td>
                    <td className="py-2.5 px-3 text-slate-500">{selectedCard.potassium.optimalRange}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.potassium.status)}`}>
                        {selectedCard.potassium.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{selectedCard.potassium.remediation}</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">Zinc (Zn)</td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-rose-700">{selectedCard.zinc.value}</td>
                    <td className="py-2.5 px-3">{selectedCard.zinc.unit}</td>
                    <td className="py-2.5 px-3 text-slate-500">{selectedCard.zinc.optimalRange}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.zinc.status)}`}>
                        {selectedCard.zinc.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-rose-800 font-medium">{selectedCard.zinc.remediation}</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">Sulphur (S)</td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-slate-800">{selectedCard.sulphur.value}</td>
                    <td className="py-2.5 px-3">{selectedCard.sulphur.unit}</td>
                    <td className="py-2.5 px-3 text-slate-500">{selectedCard.sulphur.optimalRange}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.sulphur.status)}`}>
                        {selectedCard.sulphur.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{selectedCard.sulphur.remediation}</td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">Boron (B)</td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-bold text-amber-800">{selectedCard.boron.value}</td>
                    <td className="py-2.5 px-3">{selectedCard.boron.unit}</td>
                    <td className="py-2.5 px-3 text-slate-500">{selectedCard.boron.optimalRange}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(selectedCard.boron.status)}`}>
                        {selectedCard.boron.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{selectedCard.boron.remediation}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Expert Prescription Box */}
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Agronomist Prescribed Soil Remediation Strategy (Gudlavalleru Hub)</span>
            </div>
            <p className="text-xs text-emerald-900/90 mt-1.5 leading-relaxed">
              {selectedCard.expertRemediationNotes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
