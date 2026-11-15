import React from 'react';
import { GovernmentScheme, FarmerProfile, FarmParcel, SoilHealthCard } from '../../types';
import { useApp } from '../../context/AppContext';
import { evaluateSchemeEligibility } from '../../utils/schemeEligibility';
import { SchemeEligibilityBadge } from './SchemeEligibilityBadge';
import {
  X,
  ExternalLink,
  Building,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Calendar,
  Layers,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  ShieldAlert,
  ShieldCheck,
  Coins,
  Send
} from 'lucide-react';

interface SchemeDetailModalProps {
  scheme: GovernmentScheme;
  onClose: () => void;
  onInitiateApplication?: (scheme: GovernmentScheme) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  onInitiateApplication
}) => {
  const { language, activeFarmer, parcels, soilCards, bookmarkedSchemeIds, toggleBookmarkScheme, role } = useApp();

  const farmerParcels = parcels.filter(p => p.farmerId === activeFarmer?.id);
  const activeSoilCard = soilCards.find(s => s.farmerId === activeFarmer?.id);

  const eligibility = evaluateSchemeEligibility(scheme, activeFarmer, farmerParcels, activeSoilCard);
  const isBookmarked = bookmarkedSchemeIds.includes(scheme.id);

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                scheme.level === 'STATE_AP'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-blue-100 text-blue-900 border border-blue-300'
              }`}>
                {scheme.level === 'STATE_AP' ? 'Andhra Pradesh State Scheme' : 'Government of India (Central)'}
              </span>

              {scheme.verificationStatus === 'OFFICIALLY_VERIFIED' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Officially Verified</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  <span>Verification Required</span>
                </span>
              )}
            </div>

            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {language === 'te' ? scheme.officialNameTelugu : scheme.officialName}
            </h2>
            <div className="text-xs text-slate-600 font-medium">
              {language === 'te' ? scheme.officialName : scheme.officialNameTelugu}
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{language === 'te' ? scheme.departmentTelugu : scheme.department}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleBookmarkScheme(scheme.id)}
              className="p-2 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-white border border-slate-200 transition-colors"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this scheme'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-emerald-700" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 space-y-5 overflow-y-auto text-xs text-slate-700">
          {/* Eligibility Banner for Current Simulated Farmer */}
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-900">
                {language === 'te' ? 'రైతు ప్రాథమిక అర్హత పరిశీలన' : 'Potential Eligibility Screening'} (
                <strong className="text-emerald-900">{activeFarmer?.fullName}</strong>)
              </span>
              <SchemeEligibilityBadge status={eligibility.status} />
            </div>

            <div className="space-y-1 text-[11px]">
              {(language === 'te' ? eligibility.reasonsTe : eligibility.reasonsEn).map((reason, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}

              {eligibility.missingInfoEn.length > 0 && (
                <div className="pt-1.5 border-t border-slate-200 text-amber-900">
                  <span className="font-semibold">
                    {language === 'te' ? 'అదనంగా అవసరమైన సమాచారం:' : 'Additional Information Required:'}
                  </span>{' '}
                  {(language === 'te' ? eligibility.missingInfoTe : eligibility.missingInfoEn).join(', ')}
                </div>
              )}
            </div>
          </div>

          {/* Benefit Amount Highlight */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs uppercase tracking-wider">
              <Coins className="w-4 h-4 text-emerald-700" />
              <span>{language === 'te' ? 'పథకం లబ్ధి / రాయితీ మొత్తం' : 'Official Benefit Amount & Subsidy'}</span>
            </div>
            <div className="text-base font-bold text-emerald-950">
              {language === 'te' ? scheme.benefitAmountOrSubsidyTelugu : scheme.benefitAmountOrSubsidy}
            </div>
            <div className="text-[11px] text-emerald-800">
              Disbursement Type: <span className="font-semibold">{scheme.subsidyType.replace(/_/g, ' ')}</span>
            </div>
          </div>

          {/* Purpose & Benefits */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === 'te' ? 'పథకం ముఖ్య ఉద్దేశం & ప్రయోజనాలు' : 'Purpose & Objectives'}
            </h3>
            <p className="text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-lg border border-slate-100">
              {language === 'te' ? scheme.purposeAndBenefitsTelugu : scheme.purposeAndBenefits}
            </p>
          </div>

          {/* Eligibility Requirements */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === 'te' ? 'అర్హత నిబంధనలు' : 'Eligibility Requirements'}
            </h3>
            <div className="p-3 bg-slate-50/60 rounded-lg border border-slate-100 space-y-2">
              <p className="leading-relaxed text-slate-800">
                {language === 'te' ? scheme.eligibilityDescriptionTelugu : scheme.eligibilityDescription}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-[11px]">
                <div>
                  <span className="text-slate-500">Tenancy Eligibility:</span>{' '}
                  <strong className="text-slate-800">{scheme.criteria.tenancyTypes.join(' / ')}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Target Crops:</span>{' '}
                  <strong className="text-slate-800">{scheme.criteria.targetCrops?.join(', ') || 'All Crops'}</strong>
                </div>
                {scheme.criteria.maxAcreage && (
                  <div>
                    <span className="text-slate-500">Max Subsidized Acreage:</span>{' '}
                    <strong className="text-slate-800">{scheme.criteria.maxAcreage} Acres</strong>
                  </div>
                )}
                {scheme.criteria.minAcreage && (
                  <div>
                    <span className="text-slate-500">Min Acreage Required:</span>{' '}
                    <strong className="text-slate-800">{scheme.criteria.minAcreage} Acres</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === 'te' ? 'అవసరమైన పత్రాలు (డాక్యుమెంట్లు)' : 'Required Documents Checklist'}
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
              {scheme.requiredDocuments.map((doc) => (
                <div key={doc.id} className="p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {language === 'te' ? doc.nameTelugu : doc.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {language === 'te' ? doc.name : doc.nameTelugu}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    doc.mandatory
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {doc.mandatory ? 'Mandatory' : 'Optional / If applicable'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Procedure & Timeline */}
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === 'te' ? 'దరఖాస్తు విధానం & గడువు వివరాలు' : 'Application Procedure & Timeline'}
            </h3>
            <div className="p-3 bg-slate-50/60 rounded-lg border border-slate-100 space-y-2">
              <p className="leading-relaxed">
                {language === 'te' ? scheme.applicationProcedureTelugu : scheme.applicationProcedure}
              </p>
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-[11px] pt-1 border-t border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'te' ? scheme.timeline.scheduleNoteTelugu : scheme.timeline.scheduleNote}</span>
              </div>
            </div>
          </div>

          {/* Official Verification & Provenance */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center justify-between">
              <span>Source Authority: <strong className="text-slate-800">{scheme.sourceAuthority}</strong></span>
              <span>Last Verified: <strong className="text-slate-800 font-mono">{scheme.lastVerifiedDate}</strong></span>
            </div>
            <div>
              Status: <span className="font-semibold text-slate-700">{scheme.verificationStatus.replace(/_/g, ' ')}</span>
            </div>
          </div>

          {/* Mandatory Safety Legal Disclaimer */}
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-amber-950 text-[11px] flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-900">
                {language === 'te' ? 'ముఖ్యమైన అధికారిక ప్రకటన' : 'Government Eligibility Transparency Disclaimer'}
              </div>
              <p className="mt-0.5 opacity-90 leading-relaxed">
                {language === 'te'
                  ? 'అన్నదాత వేదిక ఏ పథకాన్నీ రైతుకు అధికారికంగా ఆమోదించదు లేదా నిధులను నేరుగా పంపిణీ చేయదు. ఇక్కడ చూపిన వివరాలు ప్రాథమిక మార్గదర్శకాలు మాత్రమే. తుది అర్హత మరియు లబ్ధి మంజూరు సంబంధిత వ్యవసాయ మరియు రెవెన్యూ శాఖల పరిశీలనపై ఆధారపడి ఉంటుంది.'
                  : 'Annadatha does not officially approve farmers for government schemes or guarantee fund disbursement. Screening reflects farmer-entered data against published criteria. Final eligibility must be confirmed by the relevant government department.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200 transition-colors w-full sm:w-auto justify-center"
            >
              <span>{language === 'te' ? 'అధికారిక వెబ్‌సైట్ తెరవండి' : 'Open Official Govt Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <a
              href={scheme.guidelinesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-800 underline underline-offset-2"
            >
              <span>View Guidelines PDF</span>
            </a>
          </div>

          {(role === 'INSTITUTION_ADMIN' || role === 'FIELD_OFFICER') && onInitiateApplication && (
            <button
              onClick={() => onInitiateApplication(scheme)}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Record Application for Farmer</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
