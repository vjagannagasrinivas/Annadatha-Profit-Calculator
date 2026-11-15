import React from 'react';
import { SchemeApplicationStatus } from '../../types';
import { Clock, CheckCircle2, AlertCircle, FileText, Send, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  status: SchemeApplicationStatus;
}

export const SchemeApplicationStatusBadge: React.FC<Props> = ({ status }) => {
  const { language } = useApp();

  switch (status) {
    case 'BENEFIT_DISBURSED':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300">
          <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />
          <span>{language === 'te' ? 'లబ్ధి బదిలీ అయ్యింది' : 'Benefit Disbursed'}</span>
        </span>
      );

    case 'VERIFIED_APPROVED':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>{language === 'te' ? 'ఆమోదించబడింది' : 'Officially Approved'}</span>
        </span>
      );

    case 'UNDER_SCRUTINY':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          <Clock className="w-3 h-3 text-blue-600 shrink-0" />
          <span>{language === 'te' ? 'పరిశీలనలో ఉంది' : 'Under Scrutiny'}</span>
        </span>
      );

    case 'SUBMITTED_RBK':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          <Send className="w-3 h-3 text-amber-600 shrink-0" />
          <span>{language === 'te' ? 'ఆర్బీకేలో సమర్పించబడింది' : 'Submitted at RBK'}</span>
        </span>
      );

    case 'REJECTED':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          <XCircle className="w-3 h-3 text-rose-600 shrink-0" />
          <span>{language === 'te' ? 'తిరస్కరించబడింది' : 'Rejected by Dept'}</span>
        </span>
      );

    case 'DRAFT':
    default:
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          <FileText className="w-3 h-3 text-slate-500 shrink-0" />
          <span>{language === 'te' ? 'ముసాయిదా' : 'Draft Entry'}</span>
        </span>
      );
  }
};
