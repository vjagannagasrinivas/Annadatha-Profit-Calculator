import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DATA_SOURCES_INFO } from '../data/mockData';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  FileText,
  Printer,
  Download,
  Building,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  Sprout,
  DollarSign,
  AlertCircle,
  Landmark
} from 'lucide-react';
import { evaluateSchemeEligibility } from '../utils/schemeEligibility';

export const ReportsPage: React.FC = () => {
  const { language, activeFarmer, parcels, soilCards, profitPlans, pilotMandal, pilotDistrict, pilotState, schemes } = useApp();
  const [selectedFarmerId, setSelectedFarmerId] = useState(activeFarmer?.id || 'AP-KRI-GUD-0182');

  const farmerParcels = parcels.filter(p => p.farmerId === selectedFarmerId);
  const activeParcel = farmerParcels[0] || parcels[0];
  const activeSoilCard = soilCards.find(s => s.parcelId === activeParcel?.id) || soilCards[0];
  const activeProfitPlan = profitPlans.find(p => p.farmerId === selectedFarmerId) || profitPlans[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header - Hidden in Print */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'నివేదికలు & అధికారిక సమాచార ఆధారాలు' : 'Reports & Institutional Data Sources'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'రైతు సలహా పత్రం (ప్రింట్ / పిడిఎఫ్) మరియు ఉపయోగించిన అధికారిక పరిశోధనా సంస్థల వివరాలు'
              : 'Printable farm advisory dossier, stage-wise input prescriptions, and transparent scientific citations.'}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{language === 'te' ? 'సలహా పత్రం ప్రింట్ చేయండి' : 'Print / Export Advisory Card'}</span>
        </button>
      </div>

      <div className="no-print">
        <DataDisclaimerBanner sourceNote="Data Provenance & Institutional Transparency Protocol" compact />
      </div>

      {/* Printable Farm Advisory Card / Dossier */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Printable Card Header */}
        <div className="border-b-2 border-emerald-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-white shrink-0">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-mono">
                ANNADATHA PLATFORM · PILOT ADVISORY DOSSIER
              </div>
              <h2 className="text-xl font-bold font-display text-slate-900">
                Official Farm & Crop Advisory Card (రైతు సలహా పత్రం)
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">
                Pilot Location: {pilotMandal} Mandal, {pilotDistrict} District, {pilotState}
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500 font-mono">
            <div>Dossier #: <strong className="text-slate-900">ADV-2026-GUD-0182</strong></div>
            <div>Issue Date: {new Date().toISOString().split('T')[0]}</div>
            <div className="text-emerald-700 font-semibold mt-1">Status: Verified & Signed</div>
          </div>
        </div>

        {/* Farmer & Land Profile Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Cultivator Details</div>
            <div className="text-sm font-bold text-slate-900">
              {activeFarmer?.fullName} ({activeFarmer?.fullNameTelugu})
            </div>
            <div className="text-slate-600">Farmer ID: <span className="font-mono">{activeFarmer?.id}</span></div>
            <div className="text-slate-600">Rythu Bharosa ID: <span className="font-mono">{activeFarmer?.rythuBharosaId}</span></div>
            <div className="text-slate-600">Village: {activeFarmer?.village}, {pilotMandal} Mandal</div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Land & Command Area</div>
            <div className="text-sm font-bold text-slate-900">
              Survey #{activeParcel?.surveyNumber} · Khata: {activeParcel?.khataNumber}
            </div>
            <div className="text-slate-600">
              Acreage: <strong className="text-slate-900">{activeParcel?.acreage} Acres</strong> ({activeParcel?.cents} Cents)
            </div>
            <div className="text-slate-600">Soil Taxonomy: {activeParcel?.soilType.replace('_', ' ')}</div>
            <div className="text-slate-600">Irrigation: Krishna Eastern Delta Canal (Ryves / Bandar reach)</div>
          </div>
        </div>

        {/* Soil Card Diagnosis Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>1. Certified Soil Test Health Card Diagnosis</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 bg-white border border-slate-200 rounded">
              <span className="text-slate-500 text-[10px]">Soil pH</span>
              <div className="text-base font-bold font-mono text-slate-900">{activeSoilCard.pH.value}</div>
              <span className="text-[10px] text-slate-500">Slightly alkaline vertisol</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded">
              <span className="text-slate-500 text-[10px]">Organic Carbon</span>
              <div className="text-base font-bold font-mono text-amber-700">{activeSoilCard.organicCarbon.value}%</div>
              <span className="text-[10px] text-amber-700 font-semibold">Low (Deficit)</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded">
              <span className="text-slate-500 text-[10px]">Available Zinc (Zn)</span>
              <div className="text-base font-bold font-mono text-rose-700">{activeSoilCard.zinc.value} ppm</div>
              <span className="text-[10px] text-rose-700 font-semibold">Critical Deficit!</span>
            </div>
            <div className="p-2.5 bg-white border border-slate-200 rounded">
              <span className="text-slate-500 text-[10px]">Available Potash (K)</span>
              <div className="text-base font-bold font-mono text-blue-700">{activeSoilCard.potassium.value} kg/ha</div>
              <span className="text-[10px] text-blue-700 font-semibold">High Reserve</span>
            </div>
          </div>
        </div>

        {/* Prescribed Crop & Stage-wise Split Application */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span>2. Recommended Crop & Split Fertilizer Schedule (Kharif Season)</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border border-slate-200 font-semibold">
                  <th className="py-2 px-3">Crop Stage</th>
                  <th className="py-2 px-3">Timing</th>
                  <th className="py-2 px-3">Mandatory Inputs & Dosages (per Acre)</th>
                  <th className="py-2 px-3">Agronomic Objective</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 border border-slate-200">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Basal (Transplanting)</td>
                  <td className="py-2.5 px-3 font-mono">Day 0 (At puddling)</td>
                  <td className="py-2.5 px-3 font-medium text-emerald-950">
                    40 kg DAP + 20 kg Zinc Sulphate (21%) + 25 kg MOP
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">Root establishment and Zinc deficit cure</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Active Tillering</td>
                  <td className="py-2.5 px-3 font-mono">20–25 DAT</td>
                  <td className="py-2.5 px-3 font-medium text-emerald-950">
                    30 kg Neem Coated Urea + Cartap 4G granules
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">Tiller multiplication and stem borer defense</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Panicle Initiation</td>
                  <td className="py-2.5 px-3 font-mono">45–50 DAT</td>
                  <td className="py-2.5 px-3 font-medium text-emerald-950">
                    30 kg Neem Coated Urea + 10 kg MOP + 0.2% Solubor spray
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">Grain count optimization and sterility prevention</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Projected Financial Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
            <DollarSign className="w-4 h-4 text-emerald-700" />
            <span>3. Financial Economics & Net Profit Projection</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
            <div>
              <span className="text-slate-600">Gross Estimated Revenue</span>
              <div className="text-base font-bold font-display text-slate-900 mt-0.5 tabular-nums">
                ₹{activeProfitPlan.grossEstimatedRevenue.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-slate-600">Operational Investment</span>
              <div className="text-base font-bold font-display text-slate-900 mt-0.5 tabular-nums">
                ₹{activeProfitPlan.totalOperationalCost.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-emerald-800 font-semibold">Net Projected Profit</span>
              <div className="text-base font-bold font-display text-emerald-900 mt-0.5 tabular-nums">
                ₹{activeProfitPlan.netProfit.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-slate-600">Net Profit per Acre</span>
              <div className="text-base font-bold font-display text-emerald-950 mt-0.5 tabular-nums">
                ₹{activeProfitPlan.netProfitPerAcre.toLocaleString()} / ac
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Eligible Government Welfare & Subsidies */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
            <Landmark className="w-4 h-4 text-emerald-700" />
            <span>4. Preliminary Screened Government Schemes & Subsidies</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {schemes
              .filter(s => evaluateSchemeEligibility(s, activeFarmer, farmerParcels, activeSoilCard).status === 'POTENTIALLY_RELEVANT')
              .slice(0, 3)
              .map(s => (
                <div key={s.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-800">
                    <span>{s.level === 'CENTRAL' ? 'Central Scheme' : 'AP State Scheme'}</span>
                    <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded">Eligible</span>
                  </div>
                  <div className="font-bold text-slate-900 line-clamp-1">{s.officialName}</div>
                  <div className="text-[11px] text-emerald-900 font-semibold">{s.benefitAmountOrSubsidy}</div>
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                    Portal: {s.officialPortalUrl.replace('https://', '')}
                  </div>
                </div>
              ))}
          </div>

          <div className="text-[10px] text-slate-400 italic">
            * Statutory Notice: Annadatha does not approve government schemes. Final eligibility is determined by the relevant government department or Rythu Bharosa Kendra (RBK).
          </div>
        </div>

        {/* Verification and Sign-off Signatures */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs">
          <div className="space-y-4">
            <div className="text-slate-500">Village Agriculture Assistant (VAA)</div>
            <div className="h-10 flex items-end">
              <span className="font-mono text-emerald-900 font-bold border-b border-dashed border-slate-400 pb-1">
                P. Anusha, VAA (Dokiparru Hub)
              </span>
            </div>
            <div className="text-[10px] text-slate-400">Date: 2026-02-18 · Seal: RBK Gudlavalleru</div>
          </div>

          <div className="space-y-4 text-right">
            <div className="text-slate-500">Senior Agronomist / KVK Specialist</div>
            <div className="h-10 flex items-end justify-end">
              <span className="font-mono text-emerald-900 font-bold border-b border-dashed border-slate-400 pb-1">
                Dr. S. Radhakrishna, KVK Ghantasala
              </span>
            </div>
            <div className="text-[10px] text-slate-400">Digital Sign-off ID: SIG-KRI-77402</div>
          </div>
        </div>

        {/* Prominent Footer Disclaimer */}
        <div className="text-[10px] text-slate-500 text-center border-t border-slate-100 pt-3">
          <strong>DEMO NOTICE:</strong> Demo data — not official data. Generated for evaluation of the Annadatha platform pilot. Not intended as substitute for in-person advice by registered agricultural extension officers.
        </div>
      </div>

      {/* Directory of Institutional Data Sources (Hidden in Print) */}
      <div className="no-print space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-700" />
            <span>Referenced Scientific & Official Institutional Standards</span>
          </h2>
          <span className="text-xs text-slate-500">
            Transparency Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DATA_SOURCES_INFO.map((source, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 text-xs">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-900">{source.organization}</h3>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {source.location}
                </span>
              </div>
              <div className="text-slate-600 font-medium">{source.department}</div>
              <div className="text-slate-500 text-[11px]">
                <strong>Key Publications:</strong> {source.publications}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed bg-slate-50 p-2 rounded border border-slate-100">
                <strong>Data Coverage:</strong> {source.dataCoverage}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
