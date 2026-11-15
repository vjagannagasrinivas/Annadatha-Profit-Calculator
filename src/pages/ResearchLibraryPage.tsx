import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ResearchEvidenceRecord,
  ResearchEvidenceTier,
  SoilDrainageType
} from '../types';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import {
  BookOpen,
  Plus,
  CheckCircle2,
  FlaskConical,
  ExternalLink,
  AlertTriangle,
  Search,
  ShieldCheck,
  X
} from 'lucide-react';

export const ResearchLibraryPage: React.FC = () => {
  const {
    language,
    role,
    crops,
    researchEvidence,
    addResearchRecord,
    validateResearchRecord
  } = useApp();

  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showContributeModal, setShowContributeModal] = useState(false);

  const canContribute =
    role === 'AGRI_EXPERT' || role === 'INSTITUTION_ADMIN' || role === 'SYSTEM_ADMIN' || role === 'FIELD_OFFICER';
  const canValidateLocally = role === 'AGRI_EXPERT' || role === 'INSTITUTION_ADMIN';

  // Contribution form state
  const [formState, setFormState] = useState({
    cropId: crops[0]?.id || 'CRP-FRU-DRAGON',
    variety: '',
    evidenceTier: 'UNIVERSITY_PROFESSOR_TRIAL' as ResearchEvidenceTier,
    researcherAndTitle: '',
    institution: '',
    researchLocation: '',
    isOutOfStateTrial: true,
    soilType: '',
    trialDrainageRequirement: 'WELL_DRAINED' as SoilDrainageType,
    climateAndTemperature: '',
    rainfallAndWater: '',
    trialRainfallMm: 650,
    seasonAndPeriod: '',
    experimentalDesignAndSampleSize: '',
    cultivationPractices: '',
    inputRequirements: '',
    yieldAndQualityOutcomes: '',
    economicResults: '',
    trialLimitations: '',
    publicationDate: new Date().toISOString().split('T')[0],
    sourceUrl: 'https://'
  });

  const tierLabels: Record<ResearchEvidenceTier, string> = {
    PUBLISHED_INSTITUTIONAL_RESEARCH: '1. Published Institutional Research (ICAR/NIASM/IIHR)',
    UNIVERSITY_PROFESSOR_TRIAL: '2. University & Professor-Led Experiment',
    MULTI_LOCATION_TRIAL: '3. Multi-Location Trial',
    KVK_FARMER_FIELD_DEMO: '4. KVK & Farmer Field Demonstration',
    COMMERCIAL_FARMER_REPORT: '5. Commercial Farmer Report',
    UNVERIFIED_CLAIM: '6. Unverified / Experimental Claim'
  };

  const filtered = researchEvidence.filter((rec) => {
    const matchTier = tierFilter === 'ALL' || rec.evidenceTier === tierFilter;
    const matchSearch =
      rec.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.researchLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.researcherAndTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTier && matchSearch;
  });

  const handleSubmitResearch = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedCrop = crops.find((c) => c.id === formState.cropId);
    const newRecord: ResearchEvidenceRecord = {
      id: `RES-${Date.now().toString().slice(-6)}`,
      cropId: formState.cropId,
      cropName: matchedCrop?.cropName || formState.cropId,
      variety: formState.variety || 'Experimental Selection',
      evidenceTier: formState.evidenceTier,
      validationStatus: 'EXPERIMENTAL', // Strictly marked Experimental until local expert sign-off
      researcherAndTitle: formState.researcherAndTitle,
      institution: formState.institution,
      researchLocation: formState.researchLocation,
      isOutOfStateTrial: formState.isOutOfStateTrial,
      soilType: formState.soilType,
      trialDrainageRequirement: formState.trialDrainageRequirement,
      climateAndTemperature: formState.climateAndTemperature,
      rainfallAndWater: formState.rainfallAndWater,
      trialRainfallMm: formState.trialRainfallMm,
      seasonAndPeriod: formState.seasonAndPeriod,
      experimentalDesignAndSampleSize: formState.experimentalDesignAndSampleSize,
      cultivationPractices: formState.cultivationPractices,
      inputRequirements: formState.inputRequirements,
      yieldAndQualityOutcomes: formState.yieldAndQualityOutcomes,
      economicResults: formState.economicResults || 'Not reported in trial',
      trialLimitations: formState.trialLimitations,
      publicationDate: formState.publicationDate,
      sourceUrl: formState.sourceUrl,
      localValidationNotes: 'Newly contributed experimental record — awaiting local field validation.'
    };
    addResearchRecord(newRecord);
    setShowContributeModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-700" />
            <span>
              {language === 'te'
                ? 'పరిశోధనా ఆధారాల లైబ్రరీ & శాస్త్రవేత్తల నాలెడ్జ్ హబ్'
                : 'Research Evidence Library & Professor Knowledge Base'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            ICAR-NIASM, ICAR-IIHR, ICAR-CRIDA, ANGRAU, Dr. YSRHU, KVK field demos &amp; professor-contributed trials with explicit condition limitations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowContributeModal(true)}
          disabled={!canContribute}
          title={!canContribute ? 'Switch role to Agricultural Expert or Admin to contribute research' : ''}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Contribute Professor / Expert Trial</span>
        </button>
      </div>

      <DataDisclaimerBanner
        sourceNote="Governance Rule: Out-of-state or new professor trials are strictly marked EXPERIMENTAL until locally validated for Krishna District."
        compact
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
        >
          <option value="ALL">All 6 Evidence Tiers ({researchEvidence.length} Records)</option>
          {(Object.keys(tierLabels) as ResearchEvidenceTier[]).map((t) => (
            <option key={t} value={t}>
              {tierLabels[t]}
            </option>
          ))}
        </select>

        <div className="relative min-w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter crop, university, ICAR institute or location..."
            className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Research Cards */}
      <div className="space-y-4">
        {filtered.map((rec) => (
          <div key={rec.id} className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-3 text-xs">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">{rec.cropName}</h2>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                    {rec.variety}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] border ${
                      rec.validationStatus === 'LOCALLY_VALIDATED'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : rec.validationStatus === 'EXPERIMENTAL'
                        ? 'bg-purple-100 text-purple-900 border-purple-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    {rec.validationStatus === 'LOCALLY_VALIDATED'
                      ? 'LOCALLY VALIDATED (KRISHNA CLUSTER)'
                      : rec.validationStatus === 'EXPERIMENTAL'
                      ? 'EXPERIMENTAL — NOT LOCALLY VERIFIED'
                      : 'NEEDS LOCAL FIELD TRIAL'}
                  </span>
                </div>
                <div className="text-slate-600 mt-1">
                  <strong>{rec.institution}</strong> · {rec.researcherAndTitle} ·{' '}
                  <span className="font-medium text-slate-800">{rec.researchLocation}</span>{' '}
                  {rec.isOutOfStateTrial && (
                    <span className="text-amber-800 font-semibold">(Out-of-State Trial)</span>
                  )}
                </div>
              </div>

              <div className="text-right space-y-1">
                <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-900 border border-blue-200 rounded-md font-bold text-[10px]">
                  {tierLabels[rec.evidenceTier]}
                </span>
                <div className="text-[11px] text-slate-500">Published: {rec.publicationDate}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
                <div className="font-bold text-slate-900">Trial Environment &amp; Design</div>
                <div><strong>Soil:</strong> {rec.soilType}</div>
                <div><strong>Climate:</strong> {rec.climateAndTemperature}</div>
                <div><strong>Water:</strong> {rec.rainfallAndWater}</div>
                <div><strong>Design:</strong> {rec.experimentalDesignAndSampleSize}</div>
                <div><strong>Period:</strong> {rec.seasonAndPeriod}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
                <div className="font-bold text-slate-900">Practices, Inputs &amp; Outcomes</div>
                <div><strong>Practices:</strong> {rec.cultivationPractices}</div>
                <div><strong>Inputs:</strong> {rec.inputRequirements}</div>
                <div><strong>Yield/Quality:</strong> {rec.yieldAndQualityOutcomes}</div>
                <div><strong>Reported Economics:</strong> {rec.economicResults}</div>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1.5">
                <div className="font-bold text-amber-950 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Trial Limitations &amp; Local Validation</span>
                </div>
                <p className="text-amber-950 leading-relaxed">{rec.trialLimitations}</p>
                {rec.localValidationNotes && (
                  <p className="text-slate-700 italic pt-1 border-t border-amber-200/70">
                    {rec.localValidationNotes}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <a
                href={rec.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-800 hover:underline font-semibold flex items-center gap-1"
              >
                <span>Source Institutional Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {canValidateLocally && rec.validationStatus !== 'LOCALLY_VALIDATED' && (
                <button
                  type="button"
                  onClick={() =>
                    validateResearchRecord(
                      rec.id,
                      'LOCALLY_VALIDATED',
                      'Reviewed by Agricultural Expert / KVK agronomist and validated with local adaptation notes.'
                    )
                  }
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Promote Experimental Trial to Locally Validated</span>
                </button>
              )}

              {rec.validatedBy && (
                <span className="text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Validated by {rec.validatedBy} ({rec.validatedDate})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CONTRIBUTE RESEARCH MODAL */}
      {showContributeModal && (
        <div className="fixed inset-0 bg-slate-900/65 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-emerald-700" />
                <div>
                  <h2 className="text-base font-bold text-slate-900">Contribute Experimental Research / Trial Record</h2>
                  <p className="text-xs text-slate-600">
                    New contributions are automatically tagged EXPERIMENTAL until validated for local district use.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowContributeModal(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitResearch} className="flex-1 overflow-y-auto p-5 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Candidate Crop *</label>
                  <select
                    value={formState.cropId}
                    onChange={(e) => setFormState({ ...formState, cropId: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    {crops.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.cropName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Variety / Genotype *</label>
                  <input
                    required
                    type="text"
                    value={formState.variety}
                    onChange={(e) => setFormState({ ...formState, variety: e.target.value })}
                    placeholder="e.g., Red Flesh / Arka Hiranyagarbha"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Evidence Tier *</label>
                  <select
                    value={formState.evidenceTier}
                    onChange={(e) => setFormState({ ...formState, evidenceTier: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    {(Object.keys(tierLabels) as ResearchEvidenceTier[]).map((t) => (
                      <option key={t} value={t}>
                        {tierLabels[t]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Professor / Principal Investigator *</label>
                  <input
                    required
                    type="text"
                    value={formState.researcherAndTitle}
                    onChange={(e) => setFormState({ ...formState, researcherAndTitle: e.target.value })}
                    placeholder="e.g., Prof. K. Narasimha Rao"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">University / ICAR Institution *</label>
                  <input
                    required
                    type="text"
                    value={formState.institution}
                    onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                    placeholder="e.g., ANGRAU Lam / ICAR-NIASM"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Trial Location *</label>
                  <input
                    required
                    type="text"
                    value={formState.researchLocation}
                    onChange={(e) => setFormState({ ...formState, researchLocation: e.target.value })}
                    placeholder="e.g., Ghantasala, Krishna Dist, AP"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Trial Soil &amp; Drainage *</label>
                  <select
                    value={formState.trialDrainageRequirement}
                    onChange={(e) => setFormState({ ...formState, trialDrainageRequirement: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="WELL_DRAINED">Well Drained</option>
                    <option value="MODERATELY_DRAINED">Moderately Drained</option>
                    <option value="POORLY_DRAINED_CLAY">Poorly Drained Clay</option>
                    <option value="WATERLOGGED_LOWLAND">Waterlogged Lowland</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Experimental Design &amp; Sample Size *</label>
                  <input
                    required
                    type="text"
                    value={formState.experimentalDesignAndSampleSize}
                    onChange={(e) => setFormState({ ...formState, experimentalDesignAndSampleSize: e.target.value })}
                    placeholder="e.g., RBD 3 replications, 12 plots"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Trial Rainfall (mm)</label>
                  <input
                    type="number"
                    value={formState.trialRainfallMm}
                    onChange={(e) => setFormState({ ...formState, trialRainfallMm: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Soil Type &amp; Climate Conditions *</label>
                  <input
                    required
                    type="text"
                    value={formState.soilType}
                    onChange={(e) => setFormState({ ...formState, soilType: e.target.value })}
                    placeholder="Soil pH/texture + climate"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Season &amp; Trial Period *</label>
                  <input
                    required
                    type="text"
                    value={formState.seasonAndPeriod}
                    onChange={(e) => setFormState({ ...formState, seasonAndPeriod: e.target.value })}
                    placeholder="e.g., Rabi 2024–2025 (3 seasons)"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Yield, Quality &amp; Economic Outcomes *</label>
                <textarea
                  required
                  rows={2}
                  value={formState.yieldAndQualityOutcomes}
                  onChange={(e) => setFormState({ ...formState, yieldAndQualityOutcomes: e.target.value })}
                  placeholder="Observed yield range, quality traits, and input requirements"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Trial Limitations &amp; Conditions Warning *</label>
                <textarea
                  required
                  rows={2}
                  value={formState.trialLimitations}
                  onChange={(e) => setFormState({ ...formState, trialLimitations: e.target.value })}
                  placeholder="e.g., Out-of-state dryland trial; cannot assume identical results in Gudlavalleru delta clay"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <label className="flex items-center gap-2 font-medium">
                  <input
                    type="checkbox"
                    checked={formState.isOutOfStateTrial}
                    onChange={(e) => setFormState({ ...formState, isOutOfStateTrial: e.target.checked })}
                  />
                  <span>Conducted outside Krishna District / Andhra Pradesh</span>
                </label>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  Save as EXPERIMENTAL Trial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
