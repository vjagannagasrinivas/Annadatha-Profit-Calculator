import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import { GovernmentScheme } from '../types';
import { evaluateSchemeEligibility } from '../utils/schemeEligibility';
import { SchemeEligibilityBadge } from '../components/schemes/SchemeEligibilityBadge';
import { SchemeApplicationStatusBadge } from '../components/schemes/SchemeApplicationStatusBadge';
import { SchemeDetailModal } from '../components/schemes/SchemeDetailModal';
import {
  Sprout,
  TestTube2,
  TrendingUp,
  MapPin,
  Droplets,
  DollarSign,
  Languages,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Landmark,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  FileText,
  Clock,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FarmerPortalPage: React.FC = () => {
  const {
    language,
    setLanguage,
    activeFarmer,
    parcels,
    soilCards,
    mandiPrices,
    pilotMandal,
    schemes,
    schemeApplications,
    bookmarkedSchemeIds,
    toggleBookmarkScheme
  } = useApp();

  const [quickAcreage, setQuickAcreage] = useState<number>(3);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<GovernmentScheme | null>(null);
  const [schemeTab, setSchemeTab] = useState<'RELEVANT' | 'ALL' | 'APPLICATIONS' | 'SAVED'>('RELEVANT');

  const farmerParcels = parcels.filter(p => p.farmerId === activeFarmer?.id);
  const primaryParcel = farmerParcels[0] || parcels[0];
  const soilCard = soilCards.find(s => s.parcelId === primaryParcel?.id) || soilCards[0];
  const localPrice = mandiPrices.find(m => m.variety.includes('BPT 5204')) || mandiPrices[0];

  // Quick live calculations
  const costPerAcre = 30406;
  const yieldPerAcre = 28; // qtls
  const pricePerQtl = localPrice.modalPrice; // ₹2,590
  const grossRevPerAcre = yieldPerAcre * pricePerQtl + 4500; // straw
  const profitPerAcre = grossRevPerAcre - costPerAcre;

  const totalCalculatedCost = costPerAcre * quickAcreage;
  const totalCalculatedRevenue = grossRevPerAcre * quickAcreage;
  const totalCalculatedProfit = profitPerAcre * quickAcreage;

  // Schemes evaluated for this active farmer
  const evaluatedSchemes = schemes.map(scheme => {
    const evalResult = evaluateSchemeEligibility(scheme, activeFarmer, farmerParcels, soilCard);
    return {
      scheme,
      evalResult
    };
  });

  const potentiallyRelevantSchemes = evaluatedSchemes.filter(
    item => item.evalResult.status === 'POTENTIALLY_RELEVANT'
  );

  const farmerApplications = schemeApplications.filter(
    app => app.farmerId === activeFarmer?.id
  );

  const savedSchemes = evaluatedSchemes.filter(item =>
    bookmarkedSchemeIds.includes(item.scheme.id)
  );

  const displayedSchemes = () => {
    switch (schemeTab) {
      case 'RELEVANT':
        return evaluatedSchemes.filter(
          item =>
            item.evalResult.status === 'POTENTIALLY_RELEVANT' ||
            item.evalResult.status === 'MORE_INFO_REQUIRED'
        );
      case 'SAVED':
        return savedSchemes;
      case 'ALL':
      default:
        return evaluatedSchemes;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Mobile Bar with Telugu toggle and farmer greeting */}
      <div className="bg-emerald-800 text-white p-5 rounded-2xl shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-emerald-700 border border-emerald-600 flex items-center justify-center font-bold text-sm">
              రైతు
            </div>
            <div>
              <span className="text-xs text-emerald-200">
                {language === 'te' ? 'రైతు మొబైల్ పోర్టల్' : 'Farmer Mobile Portal'}
              </span>
              <div className="font-display font-bold text-base leading-tight">
                {language === 'te'
                  ? `నమస్కారం, ${activeFarmer?.fullNameTelugu || activeFarmer?.fullName} గారు`
                  : `Namaskaram, ${activeFarmer?.fullName}`}
              </div>
            </div>
          </div>

          <button
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/80 hover:bg-emerald-900 rounded-lg text-xs font-semibold border border-emerald-700 cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-300" />
            <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
          </button>
        </div>

        <div className="pt-2 border-t border-emerald-700/80 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-100">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>{activeFarmer?.village || 'Dokiparru'} ({pilotMandal} Mandal)</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-900/60 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-700/50">
              {activeFarmer?.landOwnershipType === 'TENANT_CCRC'
                ? (language === 'te' ? 'కౌలు రైతు (CCRC)' : 'Tenant (CCRC)')
                : (language === 'te' ? 'భూ యజమాని (పట్టాదారు)' : 'Owner Cultivator')}
            </span>
            <span className="font-mono bg-emerald-900/60 px-2 py-0.5 rounded text-[11px]">
              {activeFarmer?.id || 'AP-KRI-GUD-0182'}
            </span>
          </div>
        </div>
      </div>

      <DataDisclaimerBanner sourceNote="Demonstration Mobile Interface for Pilot Evaluation" compact />

      {/* 4 Large Action Cards (Touch-Friendly for Rythu) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: My Land & Water Status */}
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-2xs hover:border-emerald-600 transition-colors space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{language === 'te' ? '1. నా భూమి & నీటి వసతి' : '1. My Land & Canal Water'}</span>
            </span>
            <span className="text-xs font-bold font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
              {primaryParcel.acreage} Acres
            </span>
          </div>

          <div>
            <div className="text-base font-bold text-slate-900">
              Survey #{primaryParcel.surveyNumber} ({primaryParcel.village})
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Khata: {primaryParcel.khataNumber} · {primaryParcel.soilType.replace('_', ' ')}
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                {language === 'te' ? 'రైవ్స్ కాలువ నీరు సరఫరాలో ఉంది' : 'Ryves Eastern Canal: Normal Water Flow'}
              </span>
            </div>
            <span className="font-semibold text-blue-800">0.65 dS/m (Good)</span>
          </div>
        </div>

        {/* Card 2: Soil Health Card Status */}
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-2xs hover:border-emerald-600 transition-colors space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <TestTube2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'te' ? '2. నేల ఆరోగ్యం & లోపాలు' : '2. Soil Health Status'}</span>
            </span>
            <StatusBadge status="FIELD_VERIFIED" />
          </div>

          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-rose-800">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>
                {language === 'te' ? 'జింక్ లోపం గుర్తించబడింది!' : 'Critical Zinc Deficit Diagnosed!'}
              </span>
            </div>
            <p className="text-[11px] text-rose-900/90 leading-relaxed">
              {language === 'te'
                ? 'ఎకరానికి 20 కేజీల జింక్ సల్ఫేట్ (21%) నాట్లు వేసేటప్పుడు దమ్ము చేయాలి.'
                : 'Apply 20 kg Zinc Sulphate (21%) per acre at puddling.'}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Soil pH: <strong className="text-slate-800 font-mono">7.9 (Normal)</strong></span>
            <span>Organic C: <strong className="text-amber-700 font-mono">0.42% (Low)</strong></span>
          </div>
        </div>

        {/* Card 3: Recommended Crop & Profit */}
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-2xs hover:border-emerald-600 transition-colors space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>{language === 'te' ? '3. సిఫార్సు చేసిన పంట' : '3. Recommended Crop'}</span>
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              94% Match
            </span>
          </div>

          <div>
            <div className="text-base font-bold text-slate-900">
              {language === 'te' ? 'సాంబా మసూరి (BPT 5204)' : 'Paddy — Samba Mahsuri (BPT 5204)'}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Duration: 145 Days · Premium market grain quality
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-emerald-800 text-[11px]">
                {language === 'te' ? 'ఎకరానికి రాగల నికర లాభం' : 'Projected Profit per Acre'}
              </span>
              <div className="text-lg font-bold font-display text-emerald-950 tabular-nums">
                ₹{profitPerAcre.toLocaleString()}
              </div>
            </div>
            <Link
              to="/profit"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>{language === 'te' ? 'వివరాలు' : 'Full Ledger'} &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Card 4: Today's Mandi Price */}
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-2xs hover:border-emerald-600 transition-colors space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{language === 'te' ? '4. నేటి మండి ధర' : '4. Today\'s Mandi Price'}</span>
            </span>
            <span className="text-xs text-slate-500">Gudlavalleru AMIC</span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-bold font-display text-slate-900 tabular-nums">
                ₹{localPrice.modalPrice} <span className="text-xs font-normal text-slate-500">/ క్వింటాల్ (qtl)</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                +₹{localPrice.modalPrice - localPrice.govtMsp} above Govt MSP (₹{localPrice.govtMsp})
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
              Trend: Rising
            </span>
          </div>

          <Link
            to="/market"
            className="block text-center py-2 px-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200"
          >
            {language === 'te' ? 'ఇతర మార్కెట్ యార్డ్ ధరలు చూడండి' : 'Check Nearby Mandis (Machilipatnam / Guntur)'}
          </Link>
        </div>
      </div>

      {/* =====================================================================
          GOVERNMENT SCHEMES & FARMER BENEFITS (FARMER VIEW)
          ===================================================================== */}
      <section className="bg-white rounded-2xl border-2 border-emerald-700/30 p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  {language === 'te'
                    ? 'ప్రభుత్వ పథకాలు & రైతు ప్రయోజనాలు'
                    : 'Government Schemes & Farmer Benefits'}
                </h2>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {potentiallyRelevantSchemes.length} {language === 'te' ? 'అర్హత కలిగినవి' : 'Potentially Relevant'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {language === 'te'
                  ? 'మీ భూమి, పంట, కౌలు వివరాల ఆధారంగా అధికారిక కేంద్ర మరియు ఆంధ్రప్రదేశ్ ప్రభుత్వ పథకాలు'
                  : 'Screened for your land, crop, and tenancy profile (Official AP & Central Government Schemes)'}
              </p>
            </div>
          </div>

          <Link
            to="/schemes"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors self-start sm:self-center"
          >
            <span>{language === 'te' ? 'పూర్తి పథకాల పోర్టల్' : 'Full Schemes Hub'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mandatory Statutory Disclaimer */}
        <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed text-[11px]">
            <strong>{language === 'te' ? 'చట్టబద్ధమైన గమనిక:' : 'Statutory Notice:'}</strong>{' '}
            {language === 'te'
              ? 'అన్నదాత వేదిక ప్రభుత్వ పథకాలను నేరుగా ఆమోదించదు లేదా మంజూరు చేయదు. ఇక్కడ చూపిన అర్హత ప్రాథమిక సమాచారం కొరకు మాత్రమే. తుది ఆమోదం సంబంధిత ప్రభుత్వ శాఖ లేదా రైతు భరోసా కేంద్రం (RBK) పరిశీలనపై ఆధారపడి ఉంటుంది.'
              : 'Annadatha does not officially approve or disburse government schemes. Eligibility screening is illustrative based on farmer-supplied data. Final approval is subject to verification by the concerned government department or Rythu Bharosa Kendra (RBK).'}
          </div>
        </div>

        {/* Farmer Application Tracker Banner (if any exists for this farmer) */}
        {farmerApplications.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>
                  {language === 'te'
                    ? 'మీ దరఖాస్తుల ప్రస్తుత స్థితి (RBK / ఆఫీస్ రికార్డు)'
                    : 'Your Application Status (Recorded by RBK / Field Officer)'}
                </span>
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {farmerApplications.length} {language === 'te' ? 'దరఖాస్తులు' : 'tracked'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {farmerApplications.map(app => (
                <div
                  key={app.id}
                  className="bg-white p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-shadow space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900">
                        {language === 'te' ? app.schemeNameTelugu : app.schemeName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Ref: {app.departmentRefNumber || 'AP-RBK-PENDING'}
                      </div>
                    </div>
                    <SchemeApplicationStatusBadge status={app.currentStatus} />
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span>
                      {language === 'te' ? 'సమర్పించిన తేదీ:' : 'Submitted:'}{' '}
                      <strong>{app.appliedDate}</strong>
                    </span>
                    {app.disbursedAmount ? (
                      <span className="text-emerald-700 font-bold">
                        ₹{app.disbursedAmount.toLocaleString()} ({language === 'te' ? 'మంజూరైంది' : 'Disbursed'})
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        {app.submittedDocuments.length} {language === 'te' ? 'పత్రాలు సమర్పించారు' : 'docs submitted'}
                      </span>
                    )}
                  </div>

                  {app.officerRemarks && (
                    <div className="p-2 bg-slate-50 rounded text-[11px] text-slate-600 border border-slate-100">
                      <span className="font-semibold text-slate-700">RBK Note:</span> {app.officerRemarks}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scheme Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
          <button
            onClick={() => setSchemeTab('RELEVANT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              schemeTab === 'RELEVANT'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {language === 'te' ? 'నాకు అనువైన పథకాలు' : 'Matching My Farm'}{' '}
            <span className="ml-1 text-[10px] opacity-80">({potentiallyRelevantSchemes.length})</span>
          </button>

          <button
            onClick={() => setSchemeTab('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              schemeTab === 'ALL'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {language === 'te' ? 'అన్ని పథకాలు' : 'All Schemes'}{' '}
            <span className="ml-1 text-[10px] opacity-80">({schemes.length})</span>
          </button>

          <button
            onClick={() => setSchemeTab('SAVED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              schemeTab === 'SAVED'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {language === 'te' ? 'సేవ్ చేసినవి' : 'Saved Schemes'}{' '}
            <span className="ml-1 text-[10px] opacity-80">({savedSchemes.length})</span>
          </button>
        </div>

        {/* Schemes Card List */}
        <div className="space-y-3">
          {displayedSchemes().map(({ scheme, evalResult }) => {
            const isBookmarked = bookmarkedSchemeIds.includes(scheme.id);
            const verifiedBenefit = language === 'te' ? scheme.benefitAmountOrSubsidyTelugu : scheme.benefitAmountOrSubsidy;

            return (
              <div
                key={scheme.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-600 transition-colors bg-white space-y-3 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase tracking-wider">
                        {scheme.level === 'CENTRAL' ? 'Central Scheme' : 'AP Govt Scheme'}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {scheme.category.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {language === 'te' ? scheme.officialNameTelugu : scheme.officialName}
                    </h3>
                    {language === 'te' && (
                      <div className="text-xs text-slate-500 font-medium">
                        {scheme.officialName}
                      </div>
                    )}
                    <div className="text-[11px] text-slate-500">
                      {language === 'te' ? scheme.departmentTelugu : scheme.department}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleBookmarkScheme(scheme.id)}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save Scheme'}
                      className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                        isBookmarked
                          ? 'bg-amber-50 text-amber-600 border-amber-300'
                          : 'bg-slate-50 text-slate-400 hover:text-slate-700 border-slate-200'
                      }`}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Plain-Language Purpose */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'te' ? scheme.purposeAndBenefitsTelugu : scheme.purposeAndBenefits}
                </p>

                {/* Screening Result Strip */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">
                      {language === 'te' ? 'ప్రాథమిక అర్హత స్థితి:' : 'Potential Eligibility:'}
                    </span>
                    <SchemeEligibilityBadge status={evalResult.status} />
                  </div>

                  {verifiedBenefit && (
                    <div className="text-emerald-800 font-bold text-xs flex items-center gap-1">
                      <span>{verifiedBenefit}</span>
                    </div>
                  )}
                </div>

                {/* Reasons or Guidance */}
                {evalResult.reasonsEn.length > 0 && (
                  <div className="text-[11px] text-slate-600 flex items-center gap-1.5 flex-wrap">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {language === 'te'
                        ? evalResult.reasonsTe[0]
                        : evalResult.reasonsEn[0]}
                    </span>
                  </div>
                )}

                {evalResult.missingInfoEn.length > 0 && (
                  <div className="text-[11px] text-amber-700 flex items-center gap-1.5 flex-wrap">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>
                      {language === 'te' ? 'అవసరమైన సమాచారం:' : 'Verification factor:'}{' '}
                      {language === 'te'
                        ? evalResult.missingInfoTe.join(', ')
                        : evalResult.missingInfoEn.join(', ')}
                    </span>
                  </div>
                )}

                {/* Actions: View Checklist & Details / Open Official Portal */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedSchemeForModal(scheme)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {language === 'te' ? 'కావలసిన పత్రాలు & పూర్తి వివరాలు' : 'View Documents & Eligibility Details'}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <span>{language === 'te' ? 'అధికారిక వెబ్‌సైట్' : 'Official Portal'}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            );
          })}

          {displayedSchemes().length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <Bookmark className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">
                {schemeTab === 'SAVED'
                  ? (language === 'te' ? 'మీరు ఇంకా ఏ పథకాన్ని సేవ్ చేయలేదు' : 'No schemes saved yet')
                  : (language === 'te' ? 'పథకాలు లభించలేదు' : 'No schemes match the criteria')}
              </p>
              <button
                onClick={() => setSchemeTab('ALL')}
                className="text-xs font-semibold text-emerald-800 hover:underline"
              >
                {language === 'te' ? 'అన్ని పథకాలను చూడండి' : 'View all schemes'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Simple Touch-based Acreage Calculator */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">
              {language === 'te' ? 'మీ సాగు ఖర్చులు మరియు లాభాల లెక్కలు' : 'Quick Acreage Profit Calculator'}
            </h2>
          </div>
          <span className="text-xs text-slate-500">Tap to change acres</span>
        </div>

        {/* Big Tap Buttons for Acres */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 8].map(ac => (
            <button
              key={ac}
              onClick={() => setQuickAcreage(ac)}
              className={`flex-1 min-w-16 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                quickAcreage === ac
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {ac} {language === 'te' ? 'ఎకరాలు' : 'Acres'}
            </button>
          ))}
        </div>

        {/* Result Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-slate-500 text-xs">
              {language === 'te' ? 'మొత్తం సాగు పెట్టుబడి' : 'Total Investment'}
            </span>
            <div className="text-xl font-bold font-display text-slate-900 mt-0.5 tabular-nums">
              ₹{totalCalculatedCost.toLocaleString()}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <span className="text-slate-500 text-xs">
              {language === 'te' ? 'రాగల మొత్తం దిగుబడి' : 'Total Expected Yield'}
            </span>
            <div className="text-xl font-bold font-display text-slate-900 mt-0.5 tabular-nums">
              {yieldPerAcre * quickAcreage} {language === 'te' ? 'క్వింటాళ్లు' : 'Quintals'}
            </div>
          </div>

          <div className="p-3 bg-emerald-700 text-white rounded-xl shadow-xs text-center">
            <span className="text-emerald-100 text-xs font-medium">
              {language === 'te' ? 'మీ నికర లాభం (అంచనా)' : 'Net Estimated Profit'}
            </span>
            <div className="text-2xl font-bold font-display text-white mt-0.5 tabular-nums">
              ₹{totalCalculatedProfit.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Village Agriculture Assistant (VAA) Contact Card */}
      <div className="bg-emerald-50/80 border border-emerald-200 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
            VAA
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-800">
              {language === 'te' ? 'గ్రామ వ్యవసాయ సహాయకురాలు (VAA)' : 'Your Village Agriculture Assistant (VAA)'}
            </div>
            <div className="text-base font-bold text-slate-900">
              P. Anusha (Dokiparru RBK Hub)
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Available at Rythu Bharosa Kendra · Phone: 94401 88412
            </div>
          </div>
        </div>

        <Link
          to="/reports"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-800 text-white font-semibold rounded-xl text-xs hover:bg-emerald-900 transition-colors shadow-xs"
        >
          <span>{language === 'te' ? 'నా సలహా పత్రం (ప్రింట్)' : 'Print My Farm Card'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Full Scheme Detail Modal */}
      {selectedSchemeForModal && (
        <SchemeDetailModal
          scheme={selectedSchemeForModal}
          onClose={() => setSelectedSchemeForModal(null)}
        />
      )}
    </div>
  );
};
