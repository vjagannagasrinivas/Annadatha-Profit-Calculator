import React from 'react';
import { DataSourceType, VerificationStatus } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, FileCheck, UserCheck, ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StatusBadgeProps {
  status: VerificationStatus | DataSourceType | string;
  type?: 'status' | 'source';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'status' }) => {
  const { language } = useApp();

  // Status mapping
  if (type === 'source' || status in {
    FARMER_ENTERED: 1,
    OFFICIAL_BENCHMARK: 1,
    CALCULATED_ESTIMATE: 1,
    FIELD_VERIFIED: 1,
    EXPERT_APPROVED: 1
  }) {
    switch (status) {
      case 'OFFICIAL_BENCHMARK':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>{language === 'te' ? 'అధికారిక ప్రమాణం' : 'Official Benchmark'}</span>
          </span>
        );
      case 'FIELD_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <UserCheck className="w-3 h-3 text-emerald-600" />
            <span>{language === 'te' ? 'పొలంలో ధృవీకరించినవి' : 'Field Verified (VAA)'}</span>
          </span>
        );
      case 'EXPERT_APPROVED':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            <span>{language === 'te' ? 'శాస్త్రవేత్త ఆమోదం' : 'Expert Approved'}</span>
          </span>
        );
      case 'CALCULATED_ESTIMATE':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            <FileCheck className="w-3 h-3 text-indigo-600" />
            <span>{language === 'te' ? 'అంచనా లెక్కలు' : 'Calculated Estimate'}</span>
          </span>
        );
      case 'FARMER_ENTERED':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>{language === 'te' ? 'రైతు నమోదు చేసిన వివరాలు' : 'Farmer-Entered'}</span>
          </span>
        );
    }
  }

  // Workflow verification status mapping
  switch (status) {
    case 'VERIFIED':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>{language === 'te' ? 'ధృవీకరించబడింది' : 'Verified'}</span>
        </span>
      );
    case 'EXPERT_REVIEW_PENDING':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          <Clock className="w-3 h-3 text-blue-500" />
          <span>{language === 'te' ? 'శాస్త్రవేత్త పరిశీలనలో' : 'Expert Review Pending'}</span>
        </span>
      );
    case 'PENDING_FIELD_VISIT':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          <Clock className="w-3 h-3 text-amber-500" />
          <span>{language === 'te' ? 'క్షేత్ర పరిశీలన పెండింగ్' : 'Pending Field Visit'}</span>
        </span>
      );
    case 'REVISION_REQUESTED':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          <AlertTriangle className="w-3 h-3 text-rose-500" />
          <span>{language === 'te' ? 'సవరణలు అవసరం' : 'Revision Requested'}</span>
        </span>
      );
    case 'REJECTED':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
          <HelpCircle className="w-3 h-3 text-slate-500" />
          <span>{language === 'te' ? 'తిరస్కరించబడింది' : 'Rejected'}</span>
        </span>
      );
    default:
      return (
        <span className="text-xs text-slate-600">
          {status}
        </span>
      );
  }
};
