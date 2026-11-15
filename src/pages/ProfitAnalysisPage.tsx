import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProfitOptimizationPlan } from '../types';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  DollarSign,
  TrendingUp,
  Sliders,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfitAnalysisPage: React.FC = () => {
  const { language, profitPlans, activeFarmer, saveProfitPlan } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<ProfitOptimizationPlan>(profitPlans[0]);

  // Sensitivity Simulator State
  const [priceAdjustmentPct, setPriceAdjustmentPct] = useState<number>(0); // -30% to +30%
  const [yieldAdjustmentPct, setYieldAdjustmentPct] = useState<number>(0); // -40% to +20%
  const [costInflationPct, setCostInflationPct] = useState<number>(0); // 0% to +30%

  if (!selectedPlan) {
    return (
      <div className="p-8 text-center text-slate-500">
        No profit plan available. Create one in the Resource Planner first.
      </div>
    );
  }

  // Calculate dynamic simulated figures
  const basePrice = selectedPlan.expectedPricePerQuintal;
  const simulatedPrice = Math.round(basePrice * (1 + priceAdjustmentPct / 100));

  const baseYieldPerAcre = selectedPlan.expectedYieldPerAcreQuintals;
  const simulatedYieldPerAcre = Number((baseYieldPerAcre * (1 + yieldAdjustmentPct / 100)).toFixed(1));
  const simulatedTotalYield = Number((simulatedYieldPerAcre * selectedPlan.acreage).toFixed(1));

  const baseTotalCost = selectedPlan.totalOperationalCost;
  const simulatedTotalCost = Math.round(baseTotalCost * (1 + costInflationPct / 100));
  const simulatedCostPerAcre = Math.round(simulatedTotalCost / selectedPlan.acreage);

  const simulatedMainRevenue = Math.round(simulatedTotalYield * simulatedPrice);
  const simulatedByProductRevenue = selectedPlan.byProductRevenue;
  const simulatedGrossRevenue = simulatedMainRevenue + simulatedByProductRevenue;

  const simulatedNetProfit = simulatedGrossRevenue - simulatedTotalCost;
  const simulatedNetProfitPerAcre = Math.round(simulatedNetProfit / selectedPlan.acreage);
  const simulatedRoi = Number(((simulatedNetProfit / simulatedTotalCost) * 100).toFixed(1));
  const simulatedBreakEven = Math.round(simulatedTotalCost / simulatedTotalYield);

  const resetSensitivities = () => {
    setPriceAdjustmentPct(0);
    setYieldAdjustmentPct(0);
    setCostInflationPct(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'నికర లాభాల విశ్లేషణ & ధరల హెచ్చుతగ్గుల అంచనా' : 'Crop Profit Optimization & Risk Sensitivity Engine'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'ఆదాయం, ఖర్చులు, నికర లాభం మరియు మార్కెట్ ధరలు తగ్గినప్పుడు రాగల నష్టాల విశ్లేషణ'
              : 'Financial ledger, return on investment (ROI %), break-even price, and what-if stress testing.'}
          </p>
        </div>

        {/* Plan Switcher */}
        <div className="flex items-center gap-2">
          <select
            aria-label="Select Cultivation Plan"
            value={selectedPlan.id}
            onChange={(e) => {
              const p = profitPlans.find(plan => plan.id === e.target.value);
              if (p) {
                setSelectedPlan(p);
                resetSensitivities();
              }
            }}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-800 focus:outline-none shadow-2xs cursor-pointer"
          >
            {profitPlans.map(p => (
              <option key={p.id} value={p.id}>
                {p.cropName} ({p.acreage} Ac) — {p.cultivationMethod.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DataDisclaimerBanner sourceNote="DES Cost of Cultivation Norms & Gudlavalleru Hub Projections" compact />

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Gross Estimated Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-display text-slate-900 tabular-nums">
            ₹{simulatedGrossRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Produce: ₹{simulatedMainRevenue.toLocaleString()} + Fodder: ₹{simulatedByProductRevenue.toLocaleString()}
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Operational Cost</span>
            <Scale className="w-4 h-4 text-slate-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-display text-slate-900 tabular-nums">
            ₹{simulatedTotalCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Cost per Acre: <strong className="text-slate-800">₹{simulatedCostPerAcre.toLocaleString()}</strong>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Projected Net Profit</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className={`mt-2 text-2xl font-bold font-display tabular-nums ${
            simulatedNetProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'
          }`}>
            ₹{simulatedNetProfit.toLocaleString()}
          </div>
          <div className="text-[11px] font-semibold text-emerald-800 mt-1">
            ₹{simulatedNetProfitPerAcre.toLocaleString()} / Acre
          </div>
        </div>

        {/* ROI and Break Even */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Return on Investment (ROI)</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-display text-slate-900 tabular-nums">
            {simulatedRoi}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Break-even Price: <strong className="text-slate-800 font-mono">₹{simulatedBreakEven}/qtl</strong>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive What-If Stress Testing Simulator & Financial Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: What-If Sensitivity Simulator (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                "What-If" Sensitivity & Risk Simulator
              </h2>
            </div>
            <button
              onClick={resetSensitivities}
              className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Test the resilience of this farm plan against unexpected weather damage, pest loss, or price volatility in the Krishna market.
          </p>

          {/* Slider 1: Market Price Fluctuation */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Market Price Shift:</span>
              <span className={`tabular-nums font-mono ${priceAdjustmentPct >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {priceAdjustmentPct > 0 ? `+${priceAdjustmentPct}%` : `${priceAdjustmentPct}%`} (₹{simulatedPrice}/qtl)
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              step="5"
              value={priceAdjustmentPct}
              onChange={(e) => setPriceAdjustmentPct(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>-30% Drop</span>
              <span>Baseline: ₹{basePrice}</span>
              <span>+30% Rally</span>
            </div>
          </div>

          {/* Slider 2: Yield Shock (Rain / Pest loss) */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Yield Shock / Harvest Loss:</span>
              <span className={`tabular-nums font-mono ${yieldAdjustmentPct >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {yieldAdjustmentPct > 0 ? `+${yieldAdjustmentPct}%` : `${yieldAdjustmentPct}%`} ({simulatedYieldPerAcre} qtl/ac)
              </span>
            </div>
            <input
              type="range"
              min="-40"
              max="20"
              step="5"
              value={yieldAdjustmentPct}
              onChange={(e) => setYieldAdjustmentPct(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>-40% Heavy loss</span>
              <span>Baseline: {baseYieldPerAcre} qtl</span>
              <span>+20% Bumper</span>
            </div>
          </div>

          {/* Slider 3: Input Cost Inflation */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Input Cost Inflation (Fertilizer/Diesel):</span>
              <span className="tabular-nums font-mono text-slate-800">
                +{costInflationPct}% (₹{simulatedTotalCost.toLocaleString()})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={costInflationPct}
              onChange={(e) => setCostInflationPct(Number(e.target.value))}
              className="w-full accent-slate-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>0% Normal</span>
              <span>+15% Rise</span>
              <span>+30% Severe spike</span>
            </div>
          </div>

          {/* Stress Test Verdict Box */}
          <div className={`p-3.5 rounded-lg border text-xs ${
            simulatedNetProfit > 20000
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : simulatedNetProfit >= 0
              ? 'bg-amber-50 border-amber-200 text-amber-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="font-bold">
              {simulatedNetProfit > 20000
                ? 'High Margin Resilience'
                : simulatedNetProfit >= 0
                ? 'Moderate Margin Cushion'
                : 'Risk of Operational Deficit'}
            </div>
            <p className="mt-1 text-[11px] leading-relaxed opacity-90">
              {simulatedNetProfit >= 0
                ? `Even under current simulated stress parameters, the farm retains ₹${simulatedNetProfitPerAcre.toLocaleString()}/acre positive return.`
                : 'Simulated parameters push returns below operational break-even. Consider relay pulse rotation or DSR to compress cost.'}
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Financial Statement (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="text-[11px] font-mono text-emerald-800 font-bold">
                {selectedPlan.id}
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                Financial Ledger: {selectedPlan.cropName}
              </h2>
              <div className="text-xs text-slate-500">
                Acreage: {selectedPlan.acreage} Acres · Cultivation: {selectedPlan.cultivationMethod.replace('_', ' ')}
              </div>
            </div>

            <StatusBadge status={selectedPlan.status} />
          </div>

          {/* Revenue Breakdown */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800">1. Projected Revenues (Inflow)</div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">
                  Main Crop Grain Output ({simulatedTotalYield} Quintals @ ₹{simulatedPrice}/qtl):
                </span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{simulatedMainRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200/60 pt-1.5">
                <span className="text-slate-600">
                  By-product Value (Paddy Straw / Cattle Fodder Bales):
                </span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{simulatedByProductRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-1.5 text-slate-900 font-bold">
                <span>Total Gross Estimated Revenue:</span>
                <span className="font-mono text-emerald-800 text-sm">
                  ₹{simulatedGrossRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800">2. Operational Investments (Outflow)</div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Certified Seed & Treatment:</span>
                <span className="font-mono">₹{selectedPlan.seedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Chemical Fertilizers (NPK & Zinc):</span>
                <span className="font-mono">₹{selectedPlan.fertilizerCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Organic Manure (FYM):</span>
                <span className="font-mono">₹{selectedPlan.organicCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Plant Protection & Herbicides:</span>
                <span className="font-mono">₹{selectedPlan.pesticideCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Labour Mandays (Transplanting, Weeding):</span>
                <span className="font-mono">₹{selectedPlan.labourCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Machinery Hire (Tractor & Harvester):</span>
                <span className="font-mono">₹{selectedPlan.machineryCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Canal Irrigation Cess:</span>
                <span className="font-mono">₹{selectedPlan.irrigationPowerCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-1.5 text-slate-900 font-bold">
                <span>Total Operational Cost:</span>
                <span className="font-mono text-slate-900">
                  ₹{simulatedTotalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Net Margin Highlight */}
          <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-900">Net Estimated Profit</div>
              <div className="text-[11px] text-emerald-700">Gross Inflow minus Operational Outflow</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold font-display text-emerald-900 tabular-nums">
                ₹{simulatedNetProfit.toLocaleString()}
              </div>
              <div className="text-xs font-semibold text-emerald-800">
                ₹{simulatedNetProfitPerAcre.toLocaleString()} / Acre
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Link
              to="/reports"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Generate Printable Farm Advisory Card</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
