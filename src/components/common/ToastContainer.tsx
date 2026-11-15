import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-lg border shadow-lg flex items-start gap-3 transition-all duration-200 bg-white ${
              isSuccess
                ? 'border-emerald-300 text-slate-900'
                : isWarning
                ? 'border-amber-300 text-slate-900'
                : 'border-blue-300 text-slate-900'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
            {isWarning && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
            {!isSuccess && !isWarning && <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
            
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold">{toast.title}</div>
              <div className="text-xs text-slate-600 mt-0.5 break-words">{toast.message}</div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
