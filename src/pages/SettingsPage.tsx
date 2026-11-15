import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import {
  Settings,
  MapPin,
  Languages,
  RefreshCw,
  ShieldCheck,
  BookOpen,
  Database,
  CheckCircle2,
  AlertTriangle,
  Server
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    language,
    setLanguage,
    pilotMandal,
    pilotDistrict,
    pilotState,
    setPilotMandal,
    setPilotDistrict,
    resetAllDemoData,
    role
  } = useApp();

  const [confirmReset, setConfirmReset] = useState(false);

  const availableDistricts = [
    { name: 'Krishna', mandals: ['Gudlavalleru (Pilot Hub)', 'Machilipatnam', 'Gudivada', 'Pamarru', 'Pedana'] },
    { name: 'Guntur', mandals: ['Tenali', 'Bapatla', 'Mangalagiri', 'Amaravati'] },
    { name: 'West Godavari', mandals: ['Bhimavaram', 'Palakollu', 'Tanuku', 'Narsapur'] }
  ];

  const permissionsMatrix = [
    { module: 'Institution Dashboard', admin: 'Full', expert: 'View', fieldOfficer: 'View', farmer: 'None' },
    { module: 'Farmer Registry', admin: 'Full', expert: 'View', fieldOfficer: 'Edit & Add', farmer: 'Self Only' },
    { module: 'Farm Parcels & Cadastre', admin: 'Full', expert: 'View', fieldOfficer: 'Verify & Mapp', farmer: 'Self Only' },
    { module: 'Soil Health Card Upload', admin: 'Full', expert: 'Verify & Prescribe', fieldOfficer: 'Sample Entry', farmer: 'Upload Photo' },
    { module: 'Crop Suitability Matrix', admin: 'Full', expert: 'Configure Scores', fieldOfficer: 'View', farmer: 'Interactive' },
    { module: 'Resource Planner', admin: 'Full', expert: 'Audit Tariffs', fieldOfficer: 'Guidance', farmer: 'Calculate' },
    { module: 'Profit Optimization', admin: 'Full', expert: 'Benchmark', fieldOfficer: 'View', farmer: 'View & Simulate' },
    { module: 'Advisory Sign-Off', admin: 'Audit', expert: 'Full Sign-Off', fieldOfficer: 'Field Inspection', farmer: 'View Status' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'పైలట్ సెట్టింగ్‌లు & సిస్టమ్ నిర్వహణ' : 'Settings & Pilot Administration'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'పైలట్ లొకేషన్ ఎంపిక, భాష మార్పు, పాత్రల అధికారాలు మరియు డెమో సమాచారం రీసెట్'
              : 'Pilot hub configuration, pan-India expansion controls, role permissions matrix, and data dictionaries.'}
          </p>
        </div>
      </div>

      <DataDisclaimerBanner sourceNote="Pilot System Configuration & Data Integrity Registry" compact />

      {/* Grid: Pilot Location & Language */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pilot Location Management */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Pilot Geography & Expansion Controls
            </h2>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Configure the agro-climatic pilot command area. Initial active hub is Gudlavalleru Mandal in Krishna District, designed to scale across Andhra Pradesh and all Indian states.
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">State / Region</label>
              <input
                type="text"
                disabled
                value={pilotState}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-800 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">District</label>
              <select
                value={pilotDistrict}
                onChange={(e) => setPilotDistrict(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                {availableDistricts.map(d => (
                  <option key={d.name} value={d.name}>{d.name} District</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Mandal / Sub-District</label>
              <select
                value={pilotMandal}
                onChange={(e) => setPilotMandal(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                <option value="Gudlavalleru">Gudlavalleru (Pilot Hub · 11 Villages)</option>
                <option value="Machilipatnam">Machilipatnam (Coastal Plain)</option>
                <option value="Gudivada">Gudivada (Delta Basin)</option>
                <option value="Pamarru">Pamarru (Alluvial Loam)</option>
              </select>
            </div>
          </div>

          <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-950">
            Active Command: <strong>{pilotMandal} Mandal, {pilotDistrict} District</strong> (Krishna Eastern Delta Canal Command).
          </div>
        </div>

        {/* Bilingual & Demo Reset Settings */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Languages className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Language & Simulation Environment
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Active Display Language</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`py-2 px-3 rounded border text-xs font-semibold cursor-pointer transition-colors ${
                    language === 'en'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  English (Default)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('te')}
                  className={`py-2 px-3 rounded border text-xs font-semibold cursor-pointer transition-colors ${
                    language === 'te'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  తెలుగు (Telugu)
                </button>
              </div>
            </div>

            {/* Connection Notice */}
            <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-slate-500" />
                <span>Sandbox Integrity Status</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Platform operates in isolated simulation mode. No live government APIs (e-Panta, Agmarknet live endpoints) or external databases (Supabase) are claimed or connected.
              </p>
            </div>

            {/* Reset Demo Data Button */}
            <div className="pt-2">
              <label className="block text-slate-600 font-semibold mb-1">Demo Dataset Controls</label>
              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="w-full py-2 px-3 border border-slate-300 hover:bg-slate-100 rounded text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Demo Data to Pilot Baseline</span>
                </button>
              ) : (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded space-y-2">
                  <p className="text-[11px] text-rose-900 font-medium">
                    This will clear all edited farmers, soil cards, and custom profit plans from local storage.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        resetAllDemoData();
                        setConfirmReset(false);
                      }}
                      className="px-3 py-1.5 bg-rose-700 text-white rounded text-xs font-semibold hover:bg-rose-800 cursor-pointer"
                    >
                      Confirm Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmReset(false)}
                      className="px-3 py-1.5 border border-slate-200 rounded text-xs text-slate-600 hover:bg-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role & Permissions Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Institutional Role-Based Access Control (RBAC) Matrix
            </h2>
          </div>
          <span className="text-[11px] text-slate-500">5 Distinct User Roles</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                <th className="py-2.5 px-4">Platform Module</th>
                <th className="py-2.5 px-3">Institution Admin</th>
                <th className="py-2.5 px-3">Agri Expert (KVK)</th>
                <th className="py-2.5 px-3">Field Officer (VAA)</th>
                <th className="py-2.5 px-3">Farmer (Rythu)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {permissionsMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{row.module}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-emerald-800">{row.admin}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-blue-800 font-medium">{row.expert}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-amber-800 font-medium">{row.fieldOfficer}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-slate-600">{row.farmer}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
