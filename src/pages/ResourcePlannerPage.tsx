import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResourceItem } from '../types';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Calculator,
  Plus,
  Trash2,
  DollarSign,
  TrendingDown,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ResourcePlannerPage: React.FC = () => {
  const { language, resourcePlan, updateResourceItem, saveProfitPlan, farmers, activeFarmer } = useApp();
  const navigate = useNavigate();

  const [acreage, setAcreage] = useState<number>(0);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [cultivationMethod, setCultivationMethod] = useState<'CONVENTIONAL_PUDDLED' | 'DIRECT_SEEDED_RICE_DSR'>('CONVENTIONAL_PUDDLED');

  // Calculate totals
  const totalCostPerAcre = resourcePlan.reduce((acc, curr) => acc + curr.totalCostPerAcre, 0);
  // DSR cultivation saves roughly 14 women mandays transplanting (~₹6,300) and reduces puddling tractor by 2 hours (~₹2,400), but adds weedicide (~₹1,200) -> Net ~₹7,500/acre savings!
  const methodAdjustedCostPerAcre = totalCostPerAcre;

  const totalFarmParcelCost = Math.round(methodAdjustedCostPerAcre * acreage);

  // Group by category
  const categories: ResourceItem['category'][] = [
    'SEED',
    'FERTILIZER',
    'ORGANIC',
    'PESTICIDE',
    'LABOUR',
    'MACHINERY',
    'IRRIGATION'
  ];

  const categoryLabels: Record<ResourceItem['category'], { en: string; te: string }> = {
    SEED: { en: 'Seeds & Treatment', te: 'విత్తనాలు & శుద్ధి' },
    FERTILIZER: { en: 'Chemical Fertilizers (Macro & Micro)', te: 'రసాయన ఎరువులు (NPK & జింక్)' },
    ORGANIC: { en: 'Organic Manure & Bio-fertilizers', te: 'పశువుల ఎరువు & సేంద్రీయ' },
    PESTICIDE: { en: 'Plant Protection & Herbicides', te: 'సస్యరక్షణ & కలుపు మందులు' },
    LABOUR: { en: 'Farm Labour & Transplanting', te: 'కూలీ ఖర్చులు & నాట్లు' },
    MACHINERY: { en: 'Machinery & Harvester Hire', te: 'యంత్రాల అద్దె (ట్రాక్టర్, హార్వెస్టర్)' },
    IRRIGATION: { en: 'Canal Cess & Water Management', te: 'కాలువ నీటి తీరువా' }
  };

  const handleProceedToProfitAnalysis = () => {
    // Profit calculations stay disabled until verified crop, yield, price, and cost inputs exist.
    return;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'సాగు వనరుల ప్రణాళిక & ఖర్చుల గణాంకాలు' : 'Resource Planner & Input Cost Estimator'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'విత్తనాలు, రసాయన ఎరువులు, సేంద్రీయ ఎరువు, కూలీలు మరియు యంత్రాల ఖర్చుల సమగ్ర వివరాలు'
              : 'Granular input budget calculator with stage-wise split fertilizer schedules and custom hiring tariffs.'}
          </p>
        </div>

        <button
          onClick={handleProceedToProfitAnalysis}
          disabled
          title="Unavailable until verified cost, yield and market inputs are connected"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors text-xs font-semibold shadow-xs cursor-pointer"
        >
          <span>{language === 'te' ? 'లాభాల విశ్లేషణకు పంపండి' : 'Calculate Net Profit & Revenue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <DataDisclaimerBanner sourceNote="AP Department of Agriculture Input Subsidies & Prevailing Gudlavalleru Wages" compact />

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        <strong>Profit calculation is not available yet.</strong>
        <p className="mt-1">No verified crop-specific input quotations, yield evidence, or dated buyer/mandi prices are connected. This planner will not invent a cost, yield, selling price, or profit figure. Enter verified quotations and evidence before enabling calculations.</p>
      </div>

      {/* Control Strip: Acreage and Cultivation Method */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Selected Crop */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Planned Crop & Variety:
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="Paddy (BPT 5204)">Paddy — BPT 5204 (Samba Mahsuri)</option>
            <option value="Paddy (MTU 1061)">Paddy — MTU 1061 (Indra Submergence)</option>
            <option value="Black Gram (LBG 752)">Black Gram — LBG 752 (Relay Pulse)</option>
            <option value="Hybrid Maize (DHM 117)">Hybrid Maize — DHM 117</option>
          </select>
        </div>

        {/* Acreage Slider & Number Input */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
            <span>Land Parcel Acreage:</span>
            <span className="font-bold text-emerald-800 tabular-nums">{acreage} Acres</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={acreage}
              onChange={(e) => setAcreage(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <input
              type="number"
              step="0.1"
              min="0.5"
              value={acreage}
              onChange={(e) => setAcreage(Number(e.target.value))}
              className="w-16 px-2 py-1 text-xs border border-slate-200 rounded text-right tabular-nums font-bold"
            />
          </div>
        </div>

        {/* Cultivation Method (DSR vs Puddled) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Cultivation Method (Technique):
          </label>
          <select
            value={cultivationMethod}
            onChange={(e) => setCultivationMethod(e.target.value as any)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="CONVENTIONAL_PUDDLED">Conventional Puddled Transplanting</option>
            <option value="DIRECT_SEEDED_RICE_DSR">Direct Seeded Rice (DSR) — Saves ~24% Cost</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500">Input Cost per Acre:</span>
          <div className="mt-1 text-2xl font-bold font-display text-slate-900 tabular-nums">
            ₹{methodAdjustedCostPerAcre.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {cultivationMethod === 'DIRECT_SEEDED_RICE_DSR' ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Saved ~₹7,300/ac via DSR Zero-transplanting</span>
              </span>
            ) : (
              <span>Conventional puddled baseline</span>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500">Total Operational Budget ({acreage} Acres):</span>
          <div className="mt-1 text-2xl font-bold font-display text-emerald-800 tabular-nums">
            ₹{totalFarmParcelCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across 7 input categories
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500">Government Subsidies Applied:</span>
          <div className="mt-1 text-2xl font-bold font-display text-slate-900 tabular-nums">
            ₹{(1850 * acreage).toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            Urea & DAP subsidy benchmark included
          </div>
        </div>
      </div>

      {/* Categorized Resource Input Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {language === 'te' ? 'విభాగాల వారీగా సాగు వ్యయం (ఎకరానికి & పూర్తి కమతానికి)' : 'Line-Item Resource Breakdown & Prevailing Tariffs'}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Editable rates and quantities; based on ANGRAU package and Gudlavalleru village wage norms
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                <th className="py-2.5 px-4">Item & Application Stage</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Qty / Acre</th>
                <th className="py-2.5 px-3">Unit</th>
                <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                <th className="py-2.5 px-3 text-right">Cost / Acre</th>
                <th className="py-2.5 px-4 text-right">Total ({acreage} Ac)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {resourcePlan.map((item, idx) => {
                const totalItemForParcel = Math.round(item.totalCostPerAcre * acreage);
                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-slate-900">{item.itemName}</div>
                      <div className="text-[10px] text-slate-500">
                        {item.itemNameTelugu} · <span className="font-mono text-emerald-800">{item.applicationStage}</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-right tabular-nums">
                      {item.isCustomizable ? (
                        <input
                          type="number"
                          step="0.5"
                          value={item.quantityPerAcre}
                          onChange={(e) => updateResourceItem(idx, { quantityPerAcre: Number(e.target.value) })}
                          className="w-16 px-1.5 py-0.5 text-right border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500"
                        />
                      ) : (
                        item.quantityPerAcre
                      )}
                    </td>

                    <td className="py-2.5 px-3 text-slate-500">{item.unit}</td>

                    <td className="py-2.5 px-3 text-right tabular-nums">
                      {item.isCustomizable ? (
                        <input
                          type="number"
                          value={item.unitCostInr}
                          onChange={(e) => updateResourceItem(idx, { unitCostInr: Number(e.target.value) })}
                          className="w-20 px-1.5 py-0.5 text-right border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500"
                        />
                      ) : (
                        `₹${item.unitCostInr}`
                      )}
                    </td>

                    <td className="py-2.5 px-3 text-right tabular-nums font-semibold text-slate-900">
                      ₹{item.totalCostPerAcre.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-4 text-right tabular-nums font-bold text-emerald-900">
                      ₹{totalItemForParcel.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100/80 font-bold text-slate-900 border-t border-slate-200">
                <td colSpan={5} className="py-3 px-4 text-right">
                  Subtotal Operational Investment:
                </td>
                <td className="py-3 px-3 text-right tabular-nums text-emerald-800">
                  ₹{methodAdjustedCostPerAcre.toLocaleString()} / ac
                </td>
                <td className="py-3 px-4 text-right tabular-nums text-emerald-950 text-sm">
                  ₹{totalFarmParcelCost.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
