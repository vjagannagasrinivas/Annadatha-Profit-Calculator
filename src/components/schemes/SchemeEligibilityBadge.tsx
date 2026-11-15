import React from 'react';
import { EligibilityStatus } from '../../types';
import { CheckCircle2, AlertCircle, HelpCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SchemeEligibilityBadgeProps {
  status: EligibilityStatus;
  showText?: boolean;
}

export const SchemeEligibilityBadge: React.FC<SchemeEligibilityBadgeProps> = ({ status, showText = true }) => {
  const { language } = useApp();

  switch (status) {
    case 'POTENTIALLY_RELEVANT':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          {showText && <span>{language === 'te' ? 'పరిశీలించదగిన పథకం' : 'Potentially Relevant'}</span>}
        </span>
      );

    case 'MORE_INFO_REQUIRED':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-300">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          {showText && <span>{language === 'te' ? 'మరిన్ని వివరాలు అవసరం' : 'More Information Required'}</span>}
        </span>
      );

    case 'NOT_ELIGIBLE_CONDITIONS':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded border border-rose-300">
          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          {showText && <span>{language === 'te' ? 'నిబంధనలు సరిపోలడం లేదు' : 'Appears Not to Meet Conditions'}</span>}
        </span>
      );

    case 'OFFICIAL_NOT_VERIFIED':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-300">
          <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {showText && <span>{language === 'te' ? 'అధికారిక అర్హత ధృవీకరించబడలేదు' : 'Official Eligibility Not Verified'}</span>}
        </span>
      );
  }
};
