import React from 'react';
import {
  AgentSynthesisPayload,
  CropCombinationPlan,
  DataSourceStatusRecord,
  FarmEvaluationProfile,
  FarmLocationSelection,
  Language
} from '../../types';
import { EvaluatedCrop, sumInvestmentLines } from '../../utils/cropRecommendationEngine';
import { X, Printer, Send, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  language: Language;
  farmerName: string;
  location: FarmLocationSelection;
  farmProfile: FarmEvaluationProfile;
  allEvaluated: EvaluatedCrop[];
  combinations?: CropCombinationPlan[];
  aiSynthesis: AgentSynthesisPayload | null;
  sources: DataSourceStatusRecord[];
  onClose: () => void;
  onSendToExpertReview: (topCrop: EvaluatedCrop) => void;
}

export const FinalFarmerReportModal: React.FC<Props> = ({
  language,
  farmerName,
  location,
  farmProfile,
  allEvaluated,
  combinations = [],
  aiSynthesis,
  sources,
  onClose,
  onSendToExpertReview
}) => {
  const recommended = allEvaluated.filter((e) => e.evaluation.recommendationStatus !== 'NOT_RECOMMENDED');
  const rejected = allEvaluated.filter((e) => e.evaluation.recommendationStatus === 'NOT_RECOMMENDED');

  const topBalanced = [...recommended].sort((a, b) => b.compositeScore - a.compositeScore).slice(0, 3);
  const topLowInv = [...recommended].sort((a, b) => a.totalInvestmentPerAcre - b.totalInvestmentPerAcre).slice(0, 3);
  const topNutrition = [...recommended]
    .sort((a, b) => b.crop.nutritionalProfile.nutritionalScore - a.crop.nutritionalProfile.nutritionalScore)
    .slice(0, 3);
  const topProfit = [...recommended].sort((a, b) => b.effectiveAnnualProfit - a.effectiveAnnualProfit).slice(0, 3);

  const primaryPick = topBalanced[0] || allEvaluated[0];

  return (
    <div className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-2 sm:p-5 overflow-y-auto backdrop-blur-2xs">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Toolbar (Hidden when printing) */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {language === 'te'
                ? 'మాడ్యూల్ 10: సమగ్ర రైతు నిర్ణయ సహాయ నివేదిక'
                : 'Module 10: Comprehensive Final Farmer Advisory & Profit Report'}
            </h2>
            <p className="text-xs text-slate-600">
              Prepared for <strong>{farmerName}</strong> · Transparently labels Verified vs Farmer-Entered vs Estimated data
            </p>
          </div>
          <div className="flex items-center gap-2">
            {primaryPick && (
              <button
                type="button"
                onClick={() => onSendToExpertReview(primaryPick)}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Top Plan to Expert Review</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Body (14 Sections) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-xs text-slate-800">
          {/* Header Masthead */}
          <div className="border-b-2 border-emerald-800 pb-4 flex flex-wrap justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                ANNADATHA AGRICULTURAL INTELLIGENCE &amp; PROFIT OPTIMIZATION REPORT
              </div>
              <h1 className="text-xl font-bold text-slate-900 mt-0.5">
                {language === 'te' ? 'వ్యవసాయ క్షేత్ర పంట ప్రణాళిక నివేదిక' : `Farm Crop Discovery & Profit Report — ${farmerName}`}
              </h1>
              <p className="text-slate-600 mt-1">
                Generated on {new Date().toLocaleDateString('en-IN')} · Pilot Region: {location.district} District, {location.state}
              </p>
            </div>
            <div className="text-right space-y-1">
              <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[11px]">
                STATUS: ADVISORY ESTIMATE · EXPERT REVIEW RECOMMENDED
              </span>
            </div>
          </div>

          {/* AI Executive Synthesis if available */}
          {aiSynthesis && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <div className="font-bold text-emerald-950 text-sm">AI Agent Executive Synthesis (Bilingual EN / TE)</div>
              <p className="leading-relaxed text-slate-800">{aiSynthesis.executiveSummaryEn}</p>
              <p className="leading-relaxed text-emerald-950 font-medium">{aiSynthesis.executiveSummaryTe}</p>
              <div className="pt-2 border-t border-emerald-200/70 text-[11px] text-emerald-900">
                <strong>Diversification Plan:</strong>{' '}
                {language === 'te' ? aiSynthesis.diversificationPlanTe : aiSynthesis.diversificationPlanEn}
              </div>
            </div>
          )}

          {/* Sections 1 - 4: Location, Area, Soil/Water, Climate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 border border-slate-200 rounded-xl space-y-1.5">
              <div className="font-bold text-slate-900">1 &amp; 2. Farm Location &amp; Cultivated Area [Farmer-Entered]</div>
              <div>
                <strong>Farm Parcel:</strong> {location.village}, {location.mandal} Mandal, {location.district}, {location.state}
              </div>
              <div>
                <strong>Land Classification:</strong> {location.classification} ({location.landUseCategory})
              </div>
              {location.residenceHub?.isSeparateFromFarm && (
                <div>
                  <strong>Separate Residence / Market Hub:</strong> {location.residenceHub.label}
                </div>
              )}
              <div>
                <strong>Cultivated Area:</strong> {farmProfile.acreage} Acres ({(farmProfile.acreage * 0.4047).toFixed(2)} Hectares)
              </div>
            </div>

            <div className="p-3.5 border border-slate-200 rounded-xl space-y-1.5">
              <div className="font-bold text-slate-900">3 &amp; 4. Soil, Water &amp; Season Context</div>
              <div>
                <strong>Soil &amp; Drainage [Farmer-Entered]:</strong> {farmProfile.soilType.replace(/_/g, ' ')} ·{' '}
                {farmProfile.soilDrainage.replace(/_/g, ' ')}
              </div>
              <div>
                <strong>Soil Chemistry Provenance:</strong>{' '}
                {farmProfile.soilDataSource &&
                farmProfile.soilDataSource !== 'UNSPECIFIED' &&
                farmProfile.soilDataSource !== 'UNKNOWN_NOT_TESTED'
                  ? `${farmProfile.soilDataSource} (pH ${farmProfile.soilPh ?? 'N/A'}, EC ${farmProfile.soilEc ?? 'N/A'}, OC ${farmProfile.soilOrganicCarbon ?? 'N/A'}%)`
                  : 'Unknown / Not Tested Yet — never invented or inferred from GPS. Get free RBK/KVK soil test before fertilizer purchase.'}
              </div>
              <div>
                <strong>Cropping History [Farmer-Entered]:</strong>{' '}
                {farmProfile.croppingPattern?.replace(/_/g, ' ') || 'Standard'}
                {farmProfile.previousCrop ? ` · Last: ${farmProfile.previousCrop}` : ''}
              </div>
              <div>
                <strong>Irrigation &amp; Water:</strong> {farmProfile.waterSource.replace(/_/g, ' ')} ({farmProfile.waterAvailability})
              </div>
              <div>
                <strong>Season &amp; Budget:</strong> {farmProfile.season} · Budget ₹{farmProfile.investmentBudgetPerAcre.toLocaleString()}/ac
              </div>
            </div>
          </div>

          {/* Sections 5 & 6: Evaluated vs Rejected */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              5 &amp; 6. Crops Evaluated ({allEvaluated.length}) — Suitable vs Agronomically Rejected
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1.5">
                <div className="font-bold text-emerald-900 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Top Overall Balanced Choices ({topBalanced.length})</span>
                </div>
                {topBalanced.map((item, idx) => (
                  <div key={item.crop.id} className="p-2 bg-white rounded border border-emerald-200 flex justify-between items-center gap-2">
                    <span>
                      <strong>#{idx + 1} {item.crop.cropName}</strong> ({item.crop.season})
                      {item.evaluation.requiresExperimentalDisclaimer && (
                        <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                          Experimental / Pilot First
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-bold text-emerald-800 shrink-0">
                      ₹{item.effectiveAnnualProfit.toLocaleString()}/ac/yr
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-rose-50/50 border border-rose-200 rounded-xl space-y-1.5">
                <div className="font-bold text-rose-900 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Rejected Crops ({rejected.length}) &amp; Reasons</span>
                </div>
                {rejected.length === 0 ? (
                  <p className="text-[11px] text-slate-600">No crops failed critical drainage/water gates under current settings.</p>
                ) : (
                  rejected.slice(0, 4).map((item) => (
                    <div key={item.crop.id} className="p-2 bg-white rounded border border-rose-200 text-[11px]">
                      <strong>{item.crop.cropName}:</strong> {item.evaluation.reasonsAgainst[0]}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sections 7, 8, 9, 10: Distinct Rankings Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">7. Lowest Investment Picks</div>
              {topLowInv.map((c) => (
                <div key={c.crop.id} className="flex justify-between text-[11px]">
                  <span className="truncate pr-2">{c.crop.cropName.split(' (')[0]}</span>
                  <strong className="font-mono">₹{c.totalInvestmentPerAcre.toLocaleString()}</strong>
                </div>
              ))}
            </div>
            <div className="p-3 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">8. Highest Nutrition Picks (ICMR-NIN)</div>
              {topNutrition.map((c) => (
                <div key={c.crop.id} className="flex justify-between text-[11px]">
                  <span className="truncate pr-2">{c.crop.cropName.split(' (')[0]}</span>
                  <strong className="font-mono">{c.crop.nutritionalProfile.nutritionalScore}/100</strong>
                </div>
              ))}
            </div>
            <div className="p-3 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900">9. Highest Defensible Net Profit</div>
              {topProfit.map((c) => (
                <div key={c.crop.id} className="flex justify-between text-[11px]">
                  <span className="truncate pr-2">{c.crop.cropName.split(' (')[0]}</span>
                  <strong className="font-mono text-emerald-800">₹{c.defensibleNetProfit.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Section 10: Best Multi-Crop Combinations & Rotations */}
          {combinations.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">
                10. Best Multi-Crop Combinations &amp; Sequence Rotations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {combinations
                  .filter((cb) => cb.isSuitable)
                  .slice(0, 2)
                  .map((cb) => (
                    <div key={cb.id} className="p-3 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-1.5 text-[11px]">
                      <div className="font-bold text-slate-900">{language === 'te' ? cb.titleTe : cb.titleEn}</div>
                      <div className="text-slate-600">{language === 'te' ? cb.soilHealthBenefitTe : cb.soilHealthBenefitEn}</div>
                      <div className="flex flex-wrap gap-3 pt-1 font-mono text-[11px] font-semibold text-emerald-900">
                        <span>Outlay: ₹{cb.combinedInitialOutlayPerAcre.toLocaleString()}/ac</span>
                        <span>Defensible Net: ₹{cb.defensibleNetProfitPerAcre.toLocaleString()}/ac</span>
                        <span>Risk: {cb.financialRiskScore}/100</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Sections 11 & 12: Complete 13-Line Investment Comparison & Scenarios */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              11 &amp; 12. Top Candidate Investment &amp; 3-Scenario Market Comparison [Estimated]
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead className="bg-slate-100 text-slate-800">
                  <tr>
                    <th className="p-2.5">Crop</th>
                    <th className="p-2.5">Initial/Setup Cost</th>
                    <th className="p-2.5">Recurring/Mktg</th>
                    <th className="p-2.5">Conservative Net</th>
                    <th className="p-2.5">Expected Net</th>
                    <th className="p-2.5">Favourable Net</th>
                    <th className="p-2.5">Break-Even Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {topBalanced.map((item) => {
                    const sums = sumInvestmentLines(item.crop);
                    return (
                      <tr key={item.crop.id}>
                        <td className="p-2.5 font-semibold">{item.crop.cropName}</td>
                        <td className="p-2.5 font-mono">₹{sums.initialEstablishmentOrInputCost.toLocaleString()}</td>
                        <td className="p-2.5 font-mono">₹{sums.recurringAndMarketingCost.toLocaleString()}</td>
                        <td className="p-2.5 font-mono text-amber-800">
                          ₹{item.scenarios.conservative.netProfitPerAcre.toLocaleString()}
                        </td>
                        <td className="p-2.5 font-mono font-bold text-emerald-800">
                          ₹{item.scenarios.expected.netProfitPerAcre.toLocaleString()}
                        </td>
                        <td className="p-2.5 font-mono text-blue-800">
                          ₹{item.scenarios.favourable.netProfitPerAcre.toLocaleString()}
                        </td>
                        <td className="p-2.5 font-mono">
                          ₹{item.scenarios.breakEvenPricePerUnit.toLocaleString()} / {item.crop.commercialEvaluation.yieldUnit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sections 13 & 14: Risks, Data Sources & Verification Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 border border-slate-200 rounded-xl space-y-1.5">
              <div className="font-bold text-slate-900">13. Key Risks, Data Gaps &amp; Assumptions</div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                <li>Profits are conservative/expected estimates only and are never guaranteed.</li>
                <li>Perennial orchard crops report annualized steady-state economics separately from Year-1 setup cost.</li>
                <li>Nutrition scores do not imply medical disease cure or substitute clinical care.</li>
                {aiSynthesis?.dataGapWarnings?.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 border border-slate-200 rounded-xl space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>14. Data Sources &amp; Verification Provenance</span>
              </div>
              <div className="space-y-1 text-[11px]">
                {sources.slice(0, 6).map((s) => (
                  <div key={s.id} className="flex justify-between gap-2 border-b border-slate-100 pb-1">
                    <span className="text-slate-700">{s.name}</span>
                    <span
                      className={`font-semibold shrink-0 ${
                        s.status === 'LIVE_CONNECTED'
                          ? 'text-emerald-700'
                          : s.status === 'CURATED_REFERENCE'
                          ? 'text-blue-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {s.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
