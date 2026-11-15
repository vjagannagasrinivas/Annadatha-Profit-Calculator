import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Users,
  MapPin,
  TestTube2,
  DollarSign,
  TrendingUp,
  Droplets,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  ArrowUpRight,
  Filter,
  Landmark,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const InstitutionDashboardPage: React.FC = () => {
  const {
    language,
    farmers,
    parcels,
    soilCards,
    villageStats,
    pilotMandal,
    pilotDistrict,
    profitPlans,
    reviewQueue,
    schemes,
    schemeApplications
  } = useApp();
  const [selectedVillage, setSelectedVillage] = useState<string>('ALL');

  // Aggregated metrics
  const totalRegistered = villageStats.reduce((acc, curr) => acc + curr.registeredFarmers, 0);
  const totalAcreage = villageStats.reduce((acc, curr) => acc + curr.cultivatedAcreage, 0);
  const avgSoilCoverage = Math.round(
    villageStats.reduce((acc, curr) => acc + curr.soilTestingCoveragePct, 0) / villageStats.length
  );
  const pendingApprovals = reviewQueue.filter(r => r.currentStatus === 'EXPERT_REVIEW_PENDING').length;

  const filteredVillageStats = selectedVillage === 'ALL'
    ? villageStats
    : villageStats.filter(v => v.villageName === selectedVillage);

  return (
    <div className="space-y-6">
      {/* Top Banner & Pilot Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>KRISHNA DISTRICT PILOT HUB</span>
            <span className="text-slate-400">·</span>
            <span>{pilotMandal} Mandal</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {language === 'te' ? 'వ్యవసాయ పర్యవేక్షణ & సమగ్ర విహంగ వీక్షణం' : 'Institutional Agriculture Monitoring & Intelligence'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'కృష్ణా డెల్టా కాలువ పరిధిలో రైతుల వివరాలు, నేల ఆరోగ్యం, మరియు పంటల ప్రణాళిక విశ్లేషణ'
              : 'Farm profiling, soil health coverage, weather risks, and crop profitability metrics across Gudlavalleru cluster.'}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Kharif–Rabi 2025–26 Cycle</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              aria-label="Filter by Village"
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="ALL">{language === 'te' ? 'అన్ని గ్రామాలు' : 'All Villages'}</option>
              {villageStats.map(v => (
                <option key={v.villageName} value={v.villageName}>{v.villageName}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mandatory Data Disclaimer Banner */}
      <DataDisclaimerBanner
        sourceNote="Pilot Benchmark Source: KVK Ghantasala & AP Department of Agriculture (Gudlavalleru Hub)"
      />

      {/* Primary KPI Metric Cards (Clean, unboxed, tabular-nums) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Registered Farmers */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{language === 'te' ? 'నమోదైన రైతులు' : 'Registered Farmers'}</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-slate-900 tabular-nums">
              {totalRegistered.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-700 font-medium">+14 this week</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Sample profiles in demo:</span>
            <span className="font-semibold text-slate-800">{farmers.length} active</span>
          </div>
        </div>

        {/* Card 2: Cultivated Acreage */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{language === 'te' ? 'సాగు విస్తీర్ణం' : 'Cultivated Acreage'}</span>
            <MapPin className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-slate-900 tabular-nums">
              {totalAcreage.toLocaleString()}
            </span>
            <span className="text-xs text-slate-600 font-medium">Acres (Gudlavalleru)</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Primary Crop:</span>
            <span className="font-semibold text-slate-800">Paddy (BPT 5204)</span>
          </div>
        </div>

        {/* Card 3: Soil Card Coverage */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{language === 'te' ? 'నేల ఆరోగ్య కార్డులు' : 'Soil Health Card Coverage'}</span>
            <TestTube2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-slate-900 tabular-nums">
              {avgSoilCoverage}%
            </span>
            <span className="text-xs text-emerald-700 font-medium">Verified by KVK Lab</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Primary Deficit:</span>
            <span className="font-semibold text-amber-700">Zinc & Organic C</span>
          </div>
        </div>

        {/* Card 4: Projected Net Profit */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>{language === 'te' ? 'సగటు నికర లాభం' : 'Avg Projected Profit'}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-emerald-700 tabular-nums">
              ₹46,614
            </span>
            <span className="text-xs text-slate-600 font-medium">/ acre (Kharif Paddy)</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Relay Blackgram:</span>
            <span className="font-semibold text-emerald-800">₹58,860 / ac</span>
          </div>
        </div>
      </div>

      {/* Quick Government Schemes & Farmer Benefits Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-4 sm:p-5 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Landmark className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-white">
                {language === 'te' ? 'ప్రభుత్వ పథకాలు & రైతు ప్రయోజనాల వేదిక' : 'Government Schemes & Farmer Benefits Hub'}
              </span>
              <span className="text-[10px] bg-emerald-700 text-emerald-100 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/50">
                {schemes.length} Active Schemes
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 mt-0.5">
              {language === 'te'
                ? `${schemeApplications.length} దరఖాస్తులు పరిశీలనలో ఉన్నాయి · CCRC కౌలు & పట్టాదారు రైతులకు అనువైన పథకాల గుర్తింపు`
                : `${schemeApplications.length} applications tracked in pilot · Automated screening for CCRC tenant and owner cultivators`}
            </p>
          </div>
        </div>

        <Link
          to="/schemes"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white text-emerald-900 font-semibold rounded-lg text-xs hover:bg-emerald-50 transition-colors shadow-2xs shrink-0"
        >
          <span>{language === 'te' ? 'పథకాల నిర్వహణ చూడండి' : 'Manage Schemes & Subsidies'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-800" />
        </Link>
      </div>

      {/* Main Grid: Village Cluster Table & Live Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Village Cluster Performance Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {language === 'te' ? 'గ్రామ వారీ సాగు & నీటి లభ్యత స్థితి' : 'Gudlavalleru Village Clusters — Field Status'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time pilot indicators for Krishna Eastern Delta distributaries
              </p>
            </div>
            <Link
              to="/farms"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>{language === 'te' ? 'అన్ని కమతాలు' : 'View all parcels'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                  <th className="py-2.5 px-4">{language === 'te' ? 'గ్రామం' : 'Village'}</th>
                  <th className="py-2.5 px-3 text-right">{language === 'te' ? 'రైతులు' : 'Farmers'}</th>
                  <th className="py-2.5 px-3 text-right">{language === 'te' ? 'విస్తీర్ణం (ఎకరాలు)' : 'Acreage (Ac)'}</th>
                  <th className="py-2.5 px-3">{language === 'te' ? 'ప్రధాన పంట' : 'Primary Crop'}</th>
                  <th className="py-2.5 px-3 text-center">{language === 'te' ? 'సాయిల్ కార్డ్ %' : 'SHC %'}</th>
                  <th className="py-2.5 px-3">{language === 'te' ? 'కాలువ నీరు' : 'Canal Water'}</th>
                  <th className="py-2.5 px-4 text-right">{language === 'te' ? 'క్షేత్ర పర్యటనలు' : 'Visits'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredVillageStats.map((village) => (
                  <tr key={village.villageName} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {village.villageName}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      {village.registeredFarmers.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      {village.cultivatedAcreage.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-slate-800">{village.primaryCrop}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${village.soilTestingCoveragePct}%` }}
                          />
                        </div>
                        <span className="tabular-nums font-medium text-[11px]">
                          {village.soilTestingCoveragePct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {village.canalWaterStatus === 'GOOD' ? (
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-emerald-600" />
                          <span>Good</span>
                        </span>
                      ) : village.canalWaterStatus === 'ADEQUATE' ? (
                        <span className="text-slate-700 font-medium flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          <span>Adequate</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-amber-500" />
                          <span>Tail-end Deficit</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums font-medium text-slate-900">
                      {village.fieldVisitsThisMonth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Krishna Western & Eastern Delta Command · Ryves & Bandar Canal network</span>
            <span className="tabular-nums">Updated today: 2026-11-11</span>
          </div>
        </div>

        {/* Right Col: Live Field Activity & Advisories */}
        <div className="space-y-4">
          {/* Quick Review Alert Box */}
          <div className="bg-emerald-900 text-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">
                {language === 'te' ? 'శాస్త్రవేత్త పరిశీలన' : 'Agronomist Action Required'}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-800 text-emerald-100">
                {pendingApprovals} Pending
              </span>
            </div>
            <h3 className="text-sm font-bold text-white mt-2">
              Soil Nutrient Recommendations Pending Sign-off
            </h3>
            <p className="text-xs text-emerald-200 mt-1">
              Field Officers in Dokiparru and Gudlavalleru have submitted 3 new soil deficit schedules for approval.
            </p>
            <Link
              to="/review"
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-emerald-950 font-semibold text-xs hover:bg-emerald-50 transition-colors shadow-2xs"
            >
              <span>{language === 'te' ? 'ఆమోదాల విభాగం' : 'Open Review Queue'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>{language === 'te' ? 'ఇటీవలి క్షేత్ర కార్యకలాపాలు' : 'Recent Field Activities'}</span>
              </h3>
              <span className="text-[11px] text-slate-400">Live Pilot Feed</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs mt-2">
              <div className="py-2.5">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Dokiparru · Survey #142/2B</span>
                  <span>10:30 AM</span>
                </div>
                <p className="text-slate-800 font-medium mt-0.5">
                  Soil card verified for Katragadda Venkat Rao: Critical Zinc deficiency diagnosed.
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status="FIELD_VERIFIED" />
                </div>
              </div>

              <div className="py-2.5">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Angaluru · Survey #88/4</span>
                  <span>Yesterday</span>
                </div>
                <p className="text-slate-800 font-medium mt-0.5">
                  VAA P. Anusha completed field inspection for Maddula Lakshmi Devi (2.2 Acres Paddy).
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status="VERIFIED" />
                </div>
              </div>

              <div className="py-2.5">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Gudlavalleru Mandi</span>
                  <span>Yesterday</span>
                </div>
                <p className="text-slate-800 font-medium mt-0.5">
                  Paddy BPT 5204 modal price recorded at ₹2,590/qtl (+₹270 above MSP).
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status="OFFICIAL_BENCHMARK" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
