import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FarmParcel, DataSourceType } from '../types';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  MapPin,
  Layers,
  Droplets,
  Plus,
  Compass,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  Search,
  Filter
} from 'lucide-react';

export const FarmParcelsPage: React.FC = () => {
  const { language, parcels, addParcel, farmers, pilotMandal, pilotDistrict } = useApp();
  const [selectedVillage, setSelectedVillage] = useState('ALL');
  const [selectedSoil, setSelectedSoil] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeParcel, setActiveParcel] = useState<FarmParcel>(parcels[0]);

  // New parcel state
  const [newParcel, setNewParcel] = useState({
    farmerId: farmers[0]?.id || '',
    surveyNumber: '',
    khataNumber: 'KHT-',
    village: 'Dokiparru',
    mandal: 'Gudlavalleru',
    acreage: 2.5,
    soilType: 'CLAY_LOAM' as FarmParcel['soilType'],
    irrigationType: 'CANAL_KRISHNA_DELTA' as FarmParcel['irrigationType'],
    waterAvailability: 'SEASONAL_KHARIF_RABI' as FarmParcel['waterAvailability'],
    waterSalinityEc: 0.68,
    activeCrop: 'Paddy (BPT 5204)',
    cropSeason: 'KHARIF' as FarmParcel['cropSeason']
  });

  const filteredParcels = parcels.filter(p => {
    const matchVillage = selectedVillage === 'ALL' || p.village === selectedVillage;
    const matchSoil = selectedSoil === 'ALL' || p.soilType === selectedSoil;
    return matchVillage && matchSoil;
  });

  const handleAddParcel = (e: React.FormEvent) => {
    e.preventDefault();
    const farmer = farmers.find(f => f.id === newParcel.farmerId) || farmers[0];

    const parcel: FarmParcel = {
      id: `PRC-GUD-${farmer.id.split('-').pop()}-${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
      farmerId: farmer.id,
      farmerName: farmer.fullName,
      surveyNumber: newParcel.surveyNumber || `${Math.floor(100 + Math.random() * 200)}/1`,
      khataNumber: newParcel.khataNumber || 'KHT-701',
      village: newParcel.village,
      mandal: newParcel.mandal,
      acreage: Number(newParcel.acreage),
      cents: Math.round(Number(newParcel.acreage) * 100),
      soilType: newParcel.soilType,
      irrigationType: newParcel.irrigationType,
      waterAvailability: newParcel.waterAvailability,
      waterSalinityEc: Number(newParcel.waterSalinityEc),
      latitude: 16.3400 + (Math.random() * 0.02 - 0.01),
      longitude: 81.0450 + (Math.random() * 0.02 - 0.01),
      activeCrop: newParcel.activeCrop,
      cropSeason: newParcel.cropSeason,
      sourceTag: 'FIELD_VERIFIED',
      updatedDate: new Date().toISOString().split('T')[0]
    };

    addParcel(parcel);
    setShowAddModal(false);
    setActiveParcel(parcel);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'కమతాలు & భూమి వివరాలు' : 'Farm Parcels & Land Profiling'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'సర్వే నంబర్లు, కాలువ నీటి సరఫరా, నేల స్వభావం మరియు జీపీఎస్ సరిహద్దుల వివరాలు'
              : 'Survey numbers, soil classification, Krishna Delta canal distributary access, and salinity metrics.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'te' ? 'కొత్త కమతం నమోదు' : 'Add Farm Parcel'}</span>
        </button>
      </div>

      <DataDisclaimerBanner sourceNote="AP Cadastral Survey & Krishna Delta Command Area Pilot" compact />

      {/* Filter and Overview Strip */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-600">Filters:</span>
          
          <select
            aria-label="Filter by Village"
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Villages (Gudlavalleru Cluster)</option>
            <option value="Dokiparru">Dokiparru</option>
            <option value="Angaluru">Angaluru</option>
            <option value="Gudlavalleru">Gudlavalleru</option>
            <option value="Chandrala">Chandrala</option>
            <option value="Vinnakota">Vinnakota</option>
          </select>

          <select
            aria-label="Filter by Soil Type"
            value={selectedSoil}
            onChange={(e) => setSelectedSoil(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Soil Types</option>
            <option value="CLAY_LOAM">Clay Loam (Alluvial)</option>
            <option value="BLACK_COTTON">Deep Black Cotton (Vertisol)</option>
            <option value="COASTAL_ALLUVIAL">Coastal Alluvial</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-3">
          <span>Active Command: <strong className="text-slate-800">Ryves & Bandar Canals</strong></span>
          <span>·</span>
          <span>Average Salinity: <strong className="text-emerald-700">0.69 dS/m (Good)</strong></span>
        </div>
      </div>

      {/* Main Grid: Parcel List & Visual Cadastral Map Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Parcels List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              {filteredParcels.length} {language === 'te' ? 'కమతాలు కనుగొనబడ్డాయి' : 'Parcels Registered'}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Gudlavalleru Pilot Zone (16.34°N, 81.05°E)
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
            {filteredParcels.map((parcel) => {
              const isSelected = activeParcel?.id === parcel.id;
              return (
                <div
                  key={parcel.id}
                  onClick={() => setActiveParcel(parcel)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-emerald-50/70 border-l-3 border-emerald-600' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">
                          Survey #{parcel.surveyNumber}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          Khata: {parcel.khataNumber}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/60 px-1.5 py-0.2 rounded">
                          {parcel.village}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 mt-1">
                        Cultivator: <strong className="text-slate-800">{parcel.farmerName}</strong>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5 flex-wrap">
                        <span className="tabular-nums font-semibold text-slate-800">
                          {parcel.acreage} Acres ({parcel.cents} Cents)
                        </span>
                        <span>·</span>
                        <span className="text-slate-600">
                          {parcel.soilType.replace('_', ' ')}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-slate-600">
                          <Droplets className="w-3 h-3 text-emerald-600" />
                          {parcel.irrigationType.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <StatusBadge status={parcel.sourceTag} type="source" />
                      <span className="text-[11px] font-mono text-slate-500">
                        EC: {parcel.waterSalinityEc} dS/m
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Parcel Geo Inspector & Cadastral Simulation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {activeParcel && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                    {activeParcel.id}
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    Survey #{activeParcel.surveyNumber} · {activeParcel.village}
                  </h2>
                  <div className="text-xs text-slate-600">
                    Farmer: {activeParcel.farmerName} ({activeParcel.farmerId})
                  </div>
                </div>

                <StatusBadge status={activeParcel.sourceTag} type="source" />
              </div>

              {/* Simulated Cadastral Grid Visualization */}
              <div className="relative bg-slate-900 rounded-lg p-4 text-white overflow-hidden shadow-inner">
                <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Cadastral Field GIS Map (Krishna Delta)</span>
                  </span>
                  <span className="font-mono text-[11px]">
                    {activeParcel.latitude.toFixed(4)}°N, {activeParcel.longitude.toFixed(4)}°E
                  </span>
                </div>

                {/* Vector Plot Simulation */}
                <div className="my-3 py-6 px-4 bg-slate-950/60 rounded border border-slate-800 flex flex-col items-center justify-center text-center">
                  <div className="w-36 h-28 border-2 border-dashed border-emerald-400/80 bg-emerald-950/40 rounded flex flex-col items-center justify-center p-2 relative">
                    <div className="text-xs font-bold text-emerald-300">
                      Survey {activeParcel.surveyNumber}
                    </div>
                    <div className="text-[11px] text-slate-300 font-mono mt-0.5">
                      {activeParcel.acreage} Acres
                    </div>
                    <div className="text-[9px] text-emerald-400/80 mt-1 uppercase">
                      {activeParcel.cropSeason} {activeParcel.activeCrop?.split(' ')[0]}
                    </div>
                    {/* Canal Water Inflow Marker */}
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold" title="Canal Distributary Inflow">
                      W
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2">
                    Ryves Eastern Canal Distributary #4 · Dokiparru Reach
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-500">Water Salinity:</span>{' '}
                    <span className="text-emerald-400 font-mono font-medium">
                      {activeParcel.waterSalinityEc} dS/m (Normal)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Irrigation:</span>{' '}
                    <span className="text-slate-200">Canal Gravity</span>
                  </div>
                </div>
              </div>

              {/* Agro-Characteristics */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-slate-600">Soil Taxonomy:</span>
                  <span className="font-semibold text-slate-900">
                    {activeParcel.soilType === 'CLAY_LOAM'
                      ? 'Deep Coastal Clay Loam (High CEC)'
                      : activeParcel.soilType === 'BLACK_COTTON'
                      ? 'Black Cotton Vertisol (High Swelling)'
                      : 'Alluvial River Basin Soil'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-slate-600">Current Kharif Crop:</span>
                  <span className="font-semibold text-emerald-800">
                    {activeParcel.activeCrop || 'Paddy (BPT 5204)'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-slate-600">Drainage Status:</span>
                  <span className="font-medium text-slate-800">
                    Adequate delta drainage via field channels
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                  <span className="text-slate-600">Last Verified Date:</span>
                  <span className="font-mono text-slate-700">{activeParcel.updatedDate}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Parcel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">
                Register New Land Parcel (Gudlavalleru Pilot)
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddParcel} className="space-y-3 mt-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Select Cultivator / Farmer *</label>
                <select
                  value={newParcel.farmerId}
                  onChange={(e) => setNewParcel({ ...newParcel, farmerId: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  {farmers.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.fullName} ({f.id}) — {f.village}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Survey Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 154/2"
                    value={newParcel.surveyNumber}
                    onChange={(e) => setNewParcel({ ...newParcel, surveyNumber: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Khata / Patta Number</label>
                  <input
                    type="text"
                    placeholder="KHT-450"
                    value={newParcel.khataNumber}
                    onChange={(e) => setNewParcel({ ...newParcel, khataNumber: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Village</label>
                  <select
                    value={newParcel.village}
                    onChange={(e) => setNewParcel({ ...newParcel, village: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Dokiparru">Dokiparru</option>
                    <option value="Angaluru">Angaluru</option>
                    <option value="Gudlavalleru">Gudlavalleru</option>
                    <option value="Chandrala">Chandrala</option>
                    <option value="Vinnakota">Vinnakota</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Acreage (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.2"
                    value={newParcel.acreage}
                    onChange={(e) => setNewParcel({ ...newParcel, acreage: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Soil Type</label>
                  <select
                    value={newParcel.soilType}
                    onChange={(e) => setNewParcel({ ...newParcel, soilType: e.target.value as FarmParcel['soilType'] })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="CLAY_LOAM">Clay Loam</option>
                    <option value="BLACK_COTTON">Deep Black Cotton (Vertisol)</option>
                    <option value="COASTAL_ALLUVIAL">Coastal Alluvial</option>
                    <option value="RED_LOAM">Red Loam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Irrigation Source</label>
                  <select
                    value={newParcel.irrigationType}
                    onChange={(e) => setNewParcel({ ...newParcel, irrigationType: e.target.value as FarmParcel['irrigationType'] })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="CANAL_KRISHNA_DELTA">Krishna Canal Supply</option>
                    <option value="CANAL_AND_BOREWELL">Canal + Borewell Conjunctive</option>
                    <option value="BOREWELL">Borewell Only</option>
                    <option value="FARM_POND">Farm Pond / Rainfed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Active Crop</label>
                  <input
                    type="text"
                    value={newParcel.activeCrop}
                    onChange={(e) => setNewParcel({ ...newParcel, activeCrop: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Water Salinity EC (dS/m)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newParcel.waterSalinityEc}
                    onChange={(e) => setNewParcel({ ...newParcel, waterSalinityEc: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 text-white font-semibold rounded hover:bg-emerald-800 cursor-pointer"
                >
                  Register Parcel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
