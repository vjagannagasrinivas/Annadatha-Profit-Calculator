import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ShieldAlert, UserCheck, Languages, RefreshCw, ChevronDown } from 'lucide-react';

export const DemoRoleBar: React.FC = () => {
  const { role, setRole, language, setLanguage, resetAllDemoData, farmers, activeFarmerId, setActiveFarmerId } = useApp();

  const roleOptions: { key: UserRole; titleEn: string; titleTe: string; persona: string }[] = [
    {
      key: 'INSTITUTION_ADMIN',
      titleEn: 'Institution Admin',
      titleTe: 'సంస్థ అడ్మినిస్ట్రేటర్',
      persona: 'Dr. M. V. Subbarao (Joint Director of Ag)'
    },
    {
      key: 'AGRI_EXPERT',
      titleEn: 'Agricultural Expert',
      titleTe: 'వ్యవసాయ శాస్త్రవేత్త',
      persona: 'Dr. S. Radhakrishna (KVK Agronomist)'
    },
    {
      key: 'FIELD_OFFICER',
      titleEn: 'Field Officer (VAA)',
      titleTe: 'గ్రామ వ్యవసాయ సహాయకులు',
      persona: 'P. Anusha (Gudlavalleru Cluster)'
    },
    {
      key: 'FARMER',
      titleEn: 'Farmer (Rythu)',
      titleTe: 'రైతు (రైతు సోదరుడు)',
      persona: 'Katragadda Venkat Rao (Dokiparru)'
    },
    {
      key: 'SYSTEM_ADMIN',
      titleEn: 'System Admin',
      titleTe: 'సిస్టమ్ అడ్మిన్',
      persona: 'Platform & Pilot Data Desk'
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-100 text-xs border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Demo Mode Notice */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold tracking-wide text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>DEMO ACCESS MODE</span>
          </span>
          <span className="text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-slate-300 hidden md:inline">
            For evaluation only · Not real authentication · Demo data — not official data
          </span>
        </div>

        {/* Right: Role Switcher & Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Active Persona Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-medium">
              {roleOptions.find(r => r.key === role)?.persona}
            </span>
          </div>

          {/* Role Selector Dropdown / Segmented buttons */}
          <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
            <label htmlFor="role-select" className="sr-only">Switch Demo Role</label>
            <select
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-transparent text-white font-medium px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer rounded"
            >
              {roleOptions.map((opt) => (
                <option key={opt.key} value={opt.key} className="bg-slate-900 text-slate-100">
                  {language === 'te' ? opt.titleTe : opt.titleEn}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Farmer Picker when in Farmer mode */}
          {role === 'FARMER' && (
            <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
              <label htmlFor="farmer-select" className="sr-only">Select Farmer</label>
              <select
                id="farmer-select"
                value={activeFarmerId}
                onChange={(e) => setActiveFarmerId(e.target.value)}
                className="bg-transparent text-emerald-300 font-medium px-2 py-1 text-xs focus:outline-none cursor-pointer"
              >
                {farmers.map(f => (
                  <option key={f.id} value={f.id} className="bg-slate-900 text-slate-100">
                    {language === 'te' ? f.fullNameTelugu : f.fullName} ({f.village})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Bilingual Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Toggle English / తెలుగు"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">{language === 'en' ? 'తెలుగు' : 'English'}</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetAllDemoData}
            className="hidden sm:flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Reset to fresh demo pilot dataset"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
