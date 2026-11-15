import React, { useState } from 'react';
import { EvaluatedCrop, sumInvestmentLines } from '../../utils/cropRecommendationEngine';
import { Language } from '../../types';
import {
  X,
  IndianRupee,
  TrendingUp,
  Heart,
  ShieldAlert,
  Calendar,
  Truck,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface Props {
  evaluatedCrop: EvaluatedCrop;
  acreage: number;
  language: Language;
  onClose: () => void;
}

export const InvestmentProfitModal: React.FC<Props> = ({
  evaluatedCrop,
  acreage,
  language,
  onClose
}) => {
  const [showExpertTechnical, setShowExpertTechnical] = useState(true);
  const { crop, evaluation, scenarios } = evaluatedCrop;
  const lines = crop.investmentBreakdown!;
  const sums = sumInvestmentLines(crop);
  const isPerennial = Boolean(crop.perennialInfo?.isPerennial);
  const practice = crop.agronomyPracticeSummary;

  const initialRows = [
    { labelEn: '1. Land Preparation & Levelling', labelTe: '1. భూమి తయారీ & సమతలం', val: lines.landPreparation },
    { labelEn: '2. Seeds / Planting Material / Saplings', labelTe: '2. విత్తనాలు / మొక్కలు', val: lines.seedsOrPlantingMaterial },
    { labelEn: '3. Chemical Fertilizers', labelTe: '3. రసాయన ఎరువులు', val: lines.fertilizers },
    { labelEn: '4. Organic Manure / Bio-Inputs', labelTe: '4. సేంద్రీయ ఎరువులు / పశువుల ఎరువు', val: lines.organicManure },
    { labelEn: '5. Irrigation & Water / Drip Power', labelTe: '5. సాగునీరు & డ్రిప్ ఖర్చులు', val: lines.irrigationAndWater },
    { labelEn: '6. Machinery & Custom Hiring', labelTe: '6. యంత్రాలు & ట్రాక్టర్ అద్దె', val: lines.machinery }
  ];

  const recurringAndMarketRows = [
    { labelEn: '7. Agricultural Labour (Sowing/Weeding)', labelTe: '7. వ్యవసాయ కూలీలు', val: lines.labour },
    { labelEn: '8. Pest & Disease Management (IPM)', labelTe: '8. సస్యరక్షణ / పురుగుమందులు', val: lines.pestAndDisease },
    { labelEn: '9. Harvesting & Threshing', labelTe: '9. పంట కోత & నూర్పిడి', val: lines.harvesting },
    { labelEn: '10. On-Farm Storage / Cold Space', labelTe: '10. నిల్వ & గిడ్డంగి ఖర్చులు', val: lines.storage },
    { labelEn: '11. Grading & Packaging (Bags/Crates)', labelTe: '11. గ్రేడింగ్ & ప్యాకేజింగ్', val: lines.packaging },
    { labelEn: '12. Farm-to-Mandi Transportation', labelTe: '12. రవాణా ఖర్చులు', val: lines.transportation },
    { labelEn: '13. Mandi Cess & Marketing Costs', labelTe: '13. మార్కెటింగ్ & మండి రుసుము', val: lines.marketingCosts }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/65 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto backdrop-blur-2xs">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[93vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'te' ? crop.cropNameTelugu : crop.cropName}
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                20-Point Farmer Advisory · Simple First + Expert Research Details
              </span>
              {evaluation.requiresExperimentalDisclaimer && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
                  EXPERIMENTAL / NEEDS LOCAL VALIDATION
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Evaluated for <strong>{acreage} acres</strong> · Benchmark Date: {crop.dataDate} · Reference: {crop.sourceReference}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
          {/* SECTION 1: SIMPLE FARMER-FIRST 20-POINT SUMMARY */}
          <section className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-emerald-950">
                {language === 'te'
                  ? 'రైతుకు సులభంగా అర్థమయ్యే సారాంశం (20 ముఖ్య అంశాలు)'
                  : 'Simple Farmer Explanation (All 20 Essential Crop Details)'}
              </h3>
              <span className="text-[10px] font-semibold text-emerald-900 bg-white px-2.5 py-0.5 rounded border border-emerald-200">
                Not an official government approval — Advisory Estimate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1.5">
                <div>
                  <strong className="text-slate-900">1. Why Recommended / Status:</strong>{' '}
                  {language === 'te' ? practice?.simpleWhyTe : practice?.simpleWhyEn}
                </div>
                <div>
                  <strong className="text-slate-900">2. Why It Suits (or Doesn&apos;t Suit) Your Farm:</strong>{' '}
                  {evaluation.reasonsAgainst.length > 0 ? evaluation.reasonsAgainst[0] : evaluation.reasonsFor[0]}
                </div>
                <div>
                  <strong className="text-slate-900">3. Soil &amp; Climate Fit [Published Research]:</strong>{' '}
                  Prefers {crop.preferredSoil.join(', ')} with {crop.toleratedDrainage.map((d) => d.replace(/_/g, ' ')).join(' / ')}.
                </div>
                <div>
                  <strong className="text-slate-900">4. Season &amp; Planting Window:</strong> {crop.season} (
                  {isPerennial ? `${crop.perennialInfo?.gestationYears} yr gestation` : `${crop.durationDays} days cycle`})
                </div>
                <div>
                  <strong className="text-slate-900">5. Water Need (Understandable Units):</strong>{' '}
                  {practice?.waterInLitersAndIrrigations}
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1.5">
                <div>
                  <strong className="text-slate-900">6. Seed / Planting Material [Benchmark]:</strong>{' '}
                  {practice?.seedRatePerAcre}
                </div>
                <div>
                  <strong className="text-slate-900">7. Fertilizer &amp; Organic Manure:</strong>{' '}
                  {practice?.fertilizerAndFymPerAcre}
                </div>
                <div>
                  <strong className="text-slate-900">8. Labour &amp; Machinery Needs:</strong>{' '}
                  {practice?.machineryAndLabourNote}
                </div>
                <div>
                  <strong className="text-slate-900">9 &amp; 10. Initial vs Recurring Cost [Calculated]:</strong>{' '}
                  Initial ₹{sums.initialEstablishmentOrInputCost.toLocaleString()}/ac · Recurring/Mktg ₹
                  {sums.recurringAndMarketingCost.toLocaleString()}/ac
                </div>
                <div>
                  <strong className="text-slate-900">11 &amp; 13–14. Yield Range &amp; Dated Price:</strong>{' '}
                  {crop.yieldBenchmarkPerAcre.min}–{crop.yieldBenchmarkPerAcre.max} {crop.yieldBenchmarkPerAcre.unit} @ ₹
                  {crop.commercialEvaluation.expectedPricePerUnit.toLocaleString()} ({crop.dataDate} · {crop.commercialEvaluation.localPriceHistory.marketName})
                </div>
              </div>
            </div>
          </section>

          {/* SPECIAL DRAGON FRUIT RESEARCH & ENGINEERING BLOCK (ICAR-NIASM / ICAR-IIHR) */}
          {crop.dragonFruitDetails && (
            <section className="p-4 bg-purple-50/70 border-2 border-purple-200 rounded-2xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-purple-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-purple-700" />
                  <span>Dragon Fruit Deep Institutional Evaluation (ICAR-NIASM Baramati &amp; ICAR-IIHR Bengaluru)</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-900 rounded border border-purple-300">
                  Requires Elevated Well-Drained Bed &amp; High Capital
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-purple-950">
                <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-1.5">
                  <div><strong>Support Pillars &amp; Trellis:</strong> {crop.dragonFruitDetails.trellisAndPillarSpec} (Est. ₹{crop.dragonFruitDetails.trellisCostPerAcreInr.toLocaleString()}/ac)</div>
                  <div><strong>Planting Cuttings:</strong> {crop.dragonFruitDetails.plantingMaterialSpec} (Est. ₹{crop.dragonFruitDetails.plantingMaterialCostPerAcreInr.toLocaleString()}/ac)</div>
                  <div><strong>Drainage &amp; Mounds:</strong> {crop.dragonFruitDetails.drainageAndRaisedBedProtocol}</div>
                  <div><strong>Heat &amp; Sunburn Sensitivity:</strong> {crop.dragonFruitDetails.heatAndSunburnSensitivity}</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-1.5">
                  <div><strong>Organic &amp; Nutrient Schedule:</strong> {crop.dragonFruitDetails.organicAndNutrientProtocol}</div>
                  <div><strong>Pest &amp; Disease Risks:</strong> {crop.dragonFruitDetails.pestAndDiseaseRisks}</div>
                  <div><strong>Post-Harvest Shelf Life:</strong> {crop.dragonFruitDetails.postHarvestShelfLife}</div>
                  <div><strong>Transport &amp; Packaging:</strong> {crop.dragonFruitDetails.transportAndPackagingNote}</div>
                </div>
              </div>
            </section>
          )}

          {/* 3-SCENARIO MARKET & PROFIT INTELLIGENCE (Items 15-18) */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>15–18. Revenue, Costs, Estimated Net Profit &amp; Break-Even [Calculated Estimate]</span>
              </h3>
              <span className="text-[11px] text-slate-500">
                Conservative / Expected / Favourable — Profits are never guaranteed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { data: scenarios.conservative, title: 'Conservative (-12% Yield/Price)', bg: 'bg-amber-50/70 border-amber-200', accent: 'text-amber-900' },
                { data: scenarios.expected, title: 'Expected Benchmark Scenario', bg: 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-200', accent: 'text-emerald-900' },
                { data: scenarios.favourable, title: 'Favourable (+10% Yield/Price)', bg: 'bg-blue-50/70 border-blue-200', accent: 'text-blue-900' }
              ].map((sc) => (
                <div key={sc.data.label} className={`p-3.5 rounded-xl border ${sc.bg} space-y-1.5 text-[11px]`}>
                  <div className={`font-bold text-xs ${sc.accent}`}>{sc.title}</div>
                  <div className="flex justify-between"><span>Gross Revenue / ac:</span><strong className="font-mono">₹{sc.data.grossRevenuePerAcre.toLocaleString()}</strong></div>
                  <div className="flex justify-between"><span>Total 13 Costs / ac:</span><strong className="font-mono text-rose-800">-₹{sc.data.totalExpensePerAcre.toLocaleString()}</strong></div>
                  <div className="pt-1 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="font-bold">Est. Net Profit / ac:</span>
                    <span className="text-sm font-bold font-mono text-emerald-900">₹{sc.data.netProfitPerAcre.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>ROI: <strong>{sc.data.roiPct}%</strong></span>
                    <span>Total ({acreage} ac): <strong>₹{Math.round(sc.data.netProfitPerAcre * acreage).toLocaleString()}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px]">
              <div><span className="text-slate-500">Defensible Net/Ac:</span><div className="font-bold font-mono text-emerald-900">₹{evaluatedCrop.defensibleNetProfit.toLocaleString()}</div></div>
              <div><span className="text-slate-500">Financial Risk:</span><div className="font-bold">{evaluatedCrop.financialRiskScore}/100 ({evaluatedCrop.financialRiskScore <= 35 ? 'Low Risk' : evaluatedCrop.financialRiskScore <= 60 ? 'Moderate' : 'High Risk'})</div></div>
              <div><span className="text-slate-500">Break-Even Yield:</span><div className="font-bold font-mono">{scenarios.breakEvenYieldUnits} {crop.commercialEvaluation.yieldUnit}/ac</div></div>
              <div><span className="text-slate-500">Break-Even Price:</span><div className="font-bold font-mono">₹{scenarios.breakEvenPricePerUnit.toLocaleString()} / {crop.commercialEvaluation.yieldUnit}</div></div>
              <div><span className="text-slate-500">Payback Period:</span><div className="font-bold">{scenarios.paybackPeriodText}</div></div>
              <div><span className="text-slate-500">Demand &amp; Storage:</span><div className="font-bold">{crop.commercialEvaluation.perishability.replace(/_/g, ' ')}</div></div>
            </div>

            {/* Verified Govt Schemes Only & Buyer / Input Readiness */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1.5">
                <div className="font-bold text-emerald-950">Verified Government Assistance Only (Not Auto-Approved)</div>
                {evaluation.verifiedSchemes && evaluation.verifiedSchemes.length > 0 ? (
                  <ul className="space-y-1">
                    {evaluation.verifiedSchemes.map((vs) => (
                      <li key={vs.schemeId} className="p-1.5 bg-white rounded border border-emerald-100">
                        <div className="font-bold text-slate-900">
                          {vs.code}: {language === 'te' ? vs.nameTe : vs.nameEn}
                        </div>
                        <div className="text-[10px] text-emerald-800">{vs.verifiedBenefitSummary}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600">
                    No crop-specific subsidy verified in catalogue — check RBK for general PM-KISAN / Interest Subvention eligibility.
                  </p>
                )}
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="font-bold text-slate-900">Seeds, Buyers &amp; Local Logistics Checks</div>
                {crop.buyerChannels && crop.buyerChannels.length > 0 && (
                  <div className="text-slate-700">
                    <strong>Buyer Channels:</strong> {crop.buyerChannels.join(' · ')}
                  </div>
                )}
                {evaluation.inputAndMarketNotes?.map((note, idx) => (
                  <div key={idx} className="text-[10px] text-slate-600">• {note}</div>
                ))}
              </div>
            </div>
          </section>

          {/* 13-LINE INVESTMENT BREAKDOWN */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-emerald-700" />
                <span>Complete 13-Line Investment Ledger ({isPerennial ? 'Year-1 Setup' : 'Per Season'})</span>
              </h3>
              <span className="font-mono font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Total: ₹{sums.totalAll13Lines.toLocaleString()}/ac · ₹{Math.round(sums.totalAll13Lines * acreage).toLocaleString()} ({acreage} ac)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-3 py-2 bg-slate-100 font-bold text-slate-800 flex justify-between">
                  <span>Initial Field Prep &amp; Inputs</span>
                  <span className="font-mono">₹{sums.initialEstablishmentOrInputCost.toLocaleString()}/ac</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {initialRows.map((r) => (
                    <div key={r.labelEn} className="px-3 py-2 flex justify-between text-[11px]">
                      <span>{language === 'te' ? r.labelTe : r.labelEn}</span>
                      <span className="font-mono font-semibold">₹{r.val.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-3 py-2 bg-slate-100 font-bold text-slate-800 flex justify-between">
                  <span>Recurring Care, Harvest &amp; Marketing</span>
                  <span className="font-mono">₹{sums.recurringAndMarketingCost.toLocaleString()}/ac</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {recurringAndMarketRows.map((r) => (
                    <div key={r.labelEn} className="px-3 py-2 flex justify-between text-[11px]">
                      <span>{language === 'te' ? r.labelTe : r.labelEn}</span>
                      <span className="font-mono font-semibold">₹{r.val.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ITEM 12: NUTRITION INTELLIGENCE */}
          <section className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>12. Nutritional Composition [ICMR-NIN / IFCT 2017 per 100g]</span>
              </h3>
              <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                Nutrient Score: {crop.nutritionalProfile.nutritionalScore}/100
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[11px]">
              {[
                { k: 'Protein', v: `${crop.nutritionalProfile.proteinGPer100g} g` },
                { k: 'Fibre', v: `${crop.nutritionalProfile.dietaryFiberGPer100g} g` },
                { k: 'Energy', v: `${crop.nutritionalProfile.energyKcalPer100g} kcal` },
                { k: 'Iron (Fe)', v: `${crop.nutritionalProfile.ironMgPer100g} mg` },
                { k: 'Zinc (Zn)', v: `${crop.nutritionalProfile.zincMgPer100g} mg` },
                { k: 'Calcium', v: `${crop.nutritionalProfile.calciumMgPer100g || 0} mg` }
              ].map((m) => (
                <div key={m.k} className="p-2 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500">{m.k}</div>
                  <div className="font-bold font-mono">{m.v}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ITEMS 19 & 20: EXPANDABLE EXPERT TECHNICAL & RESEARCH CONDITION COMPARISON */}
          <section className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowExpertTechnical(!showExpertTechnical)}
              className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200/70 flex items-center justify-between font-bold text-slate-900 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>19 &amp; 20. Risks, Research Evidence &amp; Parcel Comparison (For Agricultural Experts)</span>
              </span>
              {showExpertTechnical ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showExpertTechnical && (
              <div className="p-4 space-y-3 text-[11px] bg-white">
                <div className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl">
                  <div className="font-bold text-rose-900 mb-1">Key Risks &amp; Limitations [Published Research / Expert Notes]</div>
                  <ul className="list-disc pl-4 space-y-1 text-rose-950">
                    {crop.keyRisks.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                {evaluation.researchComparisons && evaluation.researchComparisons.length > 0 ? (
                  <div className="space-y-2.5">
                    <div className="font-bold text-slate-900">
                      Institutional &amp; University Trial Comparisons ({evaluation.researchComparisons.length} Linked Trials)
                    </div>
                    {evaluation.researchComparisons.map((rc) => (
                      <div key={rc.record.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold text-slate-900">
                            {rc.record.institution} — {rc.record.researchLocation}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[10px] border ${
                              rc.transferabilityVerdict === 'HIGH_LOCAL_FIT'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : rc.transferabilityVerdict === 'CONDITIONAL_WITH_MODIFICATIONS'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-purple-100 text-purple-900 border-purple-300'
                            }`}
                          >
                            {rc.record.validationStatus} · {rc.transferabilityVerdict.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-slate-800">{language === 'te' ? rc.matchSummaryTe : rc.matchSummaryEn}</p>
                        {rc.keyDifferences.length > 0 && (
                          <div className="text-amber-900">
                            <strong>Condition Differences:</strong> {rc.keyDifferences.join(' ')}
                          </div>
                        )}
                        {rc.requiredModifications.length > 0 && (
                          <div className="text-emerald-900">
                            <strong>Required Farm Modifications:</strong> {rc.requiredModifications.join(' ')}
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-1 text-slate-500">
                          <span>Outcome: {rc.record.yieldAndQualityOutcomes}</span>
                          <a
                            href={rc.record.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-800 font-semibold flex items-center gap-1 hover:underline shrink-0 ml-2"
                          >
                            <span>Source ({rc.record.publicationDate})</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950">
                    <strong>Missing Local Research Notice:</strong> Detailed multi-year published trials for this specific candidate are not yet catalogued for Krishna District; figures use ANGRAU / Dr. YSRHU production benchmarks and should be verified locally before large-scale sowing.
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Truck className="w-4 h-4 text-slate-500" />
            <span>
              Transport Sensitivity: <strong>{crop.commercialEvaluation.transportSensitivity}</strong> · Perishability:{' '}
              <strong>{crop.commercialEvaluation.perishability.replace(/_/g, ' ')}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg cursor-pointer"
          >
            Close Detailed View
          </button>
        </div>
      </div>
    </div>
  );
};
