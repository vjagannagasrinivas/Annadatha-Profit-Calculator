import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Building2,
  Calendar,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  BarChart3,
  Search
} from 'lucide-react';

export const MarketIntelligencePage: React.FC = () => {
  const { language, mandiPrices } = useApp();
  const [selectedMarket, setSelectedMarket] = useState('ALL');
  const [searchCommodity, setSearchCommodity] = useState('');

  const filteredPrices = mandiPrices.filter(item => {
    const matchMarket = selectedMarket === 'ALL' || item.marketName.includes(selectedMarket);
    const matchSearch = item.commodity.toLowerCase().includes(searchCommodity.toLowerCase()) ||
                        item.variety.toLowerCase().includes(searchCommodity.toLowerCase());
    return matchMarket && matchSearch;
  });

  if (mandiPrices.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Market Intelligence</h1>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          <h2 className="font-semibold">Verified mandi prices unavailable</h2>
          <p className="mt-1">No live or dated AGMARKNET/e-NAM price feed is connected. Annadatha will not display sample prices, historical charts, MSP comparisons, or profit estimates as market facts.</p>
          <a className="mt-2 inline-block underline" href="https://agmarknet.gov.in/" target="_blank" rel="noreferrer">Open official AGMARKNET</a>
        </div>
      </div>
    );
  }

  // Sample 6-Month Historical Seasonal Price Points for Paddy BPT 5204
  const historicalTrendData = [
    { month: 'Jun 2025', price: 2360, label: 'Nursery Window' },
    { month: 'Jul 2025', price: 2410, label: 'Transplanting' },
    { month: 'Aug 2025', price: 2450, label: 'Tillering' },
    { month: 'Sep 2025', price: 2480, label: 'Grain Filling' },
    { month: 'Oct 2025', price: 2540, label: 'Harvest Peak' },
    { month: 'Nov 2025', price: 2590, label: 'Current Peak (Gudlavalleru)' }
  ];

  const maxPriceInHistory = 2700;
  const minPriceInHistory = 2200;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'మార్కెట్ సమాచారం & మండి ధరలు' : 'Market Intelligence & Mandi Price Engine'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'గుడ్లవల్లేరు, మచిలీపట్నం, విజయవాడ మార్కెట్ యార్డుల మోడల్ ధరలు మరియు ఎంఎస్‌పీ (MSP) పోలిక'
              : 'Daily arrivals, min/max/modal prices, APMC market feeds, and MSP price variance analytics.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Report Date: 2026-11-10</span>
        </div>
      </div>

      <DataDisclaimerBanner sourceNote="AP Agmarknet Illustrative Mandi Feeds · APMC Price Bulletin" compact />

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search commodity or variety (e.g. BPT 5204, Urad, Maize)..."
            value={searchCommodity}
            onChange={(e) => setSearchCommodity(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            aria-label="Filter by Mandi"
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All APMC Mandis (Krishna & Guntur)</option>
            <option value="Gudlavalleru">Gudlavalleru AMIC (Local Hub)</option>
            <option value="Machilipatnam">Machilipatnam AMC</option>
            <option value="Vijayawada">Vijayawada (Gollapudi AMC)</option>
            <option value="Guntur">Guntur AMC</option>
            <option value="Vuyyuru">Vuyyuru Sugar Mill Gate</option>
          </select>
        </div>
      </div>

      {/* Mandi Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Today's Mandi Price Rates & Arrival Volumes (₹ per Quintal)
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {filteredPrices.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                <th className="py-2.5 px-4">Commodity & Variety</th>
                <th className="py-2.5 px-3">Market / Mandi</th>
                <th className="py-2.5 px-3 text-right">Min Price</th>
                <th className="py-2.5 px-3 text-right">Max Price</th>
                <th className="py-2.5 px-3 text-right">Modal Price (₹/qtl)</th>
                <th className="py-2.5 px-3 text-right">Govt MSP</th>
                <th className="py-2.5 px-3 text-center">MSP Variance</th>
                <th className="py-2.5 px-3 text-right">Arrivals (Tonnes)</th>
                <th className="py-2.5 px-4 text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPrices.map((item) => {
                const variance = item.modalPrice - item.govtMsp;
                const isAboveMsp = variance >= 0;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.commodity}</div>
                      <div className="text-[11px] text-slate-500">{item.variety}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800">{item.marketName}</div>
                      <div className="text-[10px] text-slate-500">{item.district} District</div>
                    </td>

                    <td className="py-3 px-3 text-right tabular-nums text-slate-600 font-mono">
                      ₹{item.minPrice}
                    </td>

                    <td className="py-3 px-3 text-right tabular-nums text-slate-600 font-mono">
                      ₹{item.maxPrice}
                    </td>

                    <td className="py-3 px-3 text-right tabular-nums font-bold text-slate-900 font-mono text-sm">
                      ₹{item.modalPrice}
                    </td>

                    <td className="py-3 px-3 text-right tabular-nums text-slate-500 font-mono">
                      ₹{item.govtMsp}
                    </td>

                    <td className="py-3 px-3 text-center tabular-nums">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        isAboveMsp
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>
                        {isAboveMsp ? `+₹${variance}` : `-₹${Math.abs(variance)}`}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right tabular-nums font-medium text-slate-800">
                      {item.arrivalVolumeTonnes} t
                    </td>

                    <td className="py-3 px-4 text-center">
                      {item.trend === 'UP' ? (
                        <span className="inline-flex items-center gap-0.5 text-emerald-700 font-semibold text-[11px]">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>+{item.trendPercentage}%</span>
                        </span>
                      ) : item.trend === 'DOWN' ? (
                        <span className="inline-flex items-center gap-0.5 text-rose-700 font-semibold text-[11px]">
                          <TrendingDown className="w-3.5 h-3.5" />
                          <span>{item.trendPercentage}%</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-slate-500 font-medium text-[11px]">
                          <Minus className="w-3.5 h-3.5" />
                          <span>Stable</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Seasonal Trend Chart Simulation */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              6-Month Seasonal Price Curve — Paddy BPT 5204 (Gudlavalleru AMIC)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Historical price movements from nursery sowing to peak delta post-harvest arrivals
            </p>
          </div>
          <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Current Modal: ₹2,590/qtl
          </div>
        </div>

        {/* Visual Bar/Line Representation */}
        <div className="mt-6 pt-4 pb-2">
          <div className="grid grid-cols-6 gap-3 items-end h-44">
            {historicalTrendData.map((point) => {
              const heightPct = Math.round(((point.price - minPriceInHistory) / (maxPriceInHistory - minPriceInHistory)) * 100);
              return (
                <div key={point.month} className="flex flex-col items-center h-full justify-end group">
                  <span className="text-[11px] font-bold font-mono text-slate-800 mb-1 tabular-nums group-hover:text-emerald-700">
                    ₹{point.price}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t h-full flex items-end overflow-hidden">
                    <div
                      className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all rounded-t"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 mt-2">{point.month}</span>
                  <span className="text-[9px] text-slate-400 text-center line-clamp-1">{point.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Minimum Support Price (MSP) Baseline: ₹2,320/qtl</span>
          <span>Source: Directorate of Marketing, Govt of AP (Simulated Pilot Feed)</span>
        </div>
      </div>
    </div>
  );
};
