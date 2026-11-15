import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, MapPin, Database } from 'lucide-react';

interface DataDisclaimerBannerProps {
  moduleName?: string;
  sourceNote?: string;
  compact?: boolean;
}

export const DataDisclaimerBanner: React.FC<DataDisclaimerBannerProps> = ({
  moduleName,
  sourceNote,
  compact = false
}) => {
  const { language, pilotMandal, pilotDistrict, pilotState } = useApp();

  if (compact) {
    return (
      <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-amber-50/70 border border-amber-200/80 rounded text-amber-900">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span className="font-medium">
            {language === 'te'
              ? 'డెమో సమాచారం — అధికారిక సమాచారం కాదు. నమూనా లెక్కల కొరకు మాత్రమే.'
              : 'Demo data — not official data. Illustrative simulations only; not real farming advice.'}
          </span>
        </div>
        <span className="text-amber-800 text-[11px] hidden sm:inline">
          {sourceNote || 'Pilot: Gudlavalleru Hub (Krishna Dist)'}
        </span>
      </div>
    );
  }

  return (
    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 mb-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start sm:items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <div className="font-semibold text-amber-900">
              {language === 'te' ? 'డెమో సమాచార ప్రకటన' : 'Pilot Demonstration & Data Transparency Notice'}
            </div>
            <p className="text-amber-800/90 text-xs mt-0.5">
              {language === 'te'
                ? 'ఇక్కడ చూపబడిన వివరాలు (నేల నమూనాలు, వాతావరణం, పంట సిఫార్సులు, మార్కెట్ ధరలు) ప్రాజెక్ట్ పరిశీలన కోసం రూపొందించిన నమూనా లెక్కలు మాత్రమే. నిజమైన సాగు సలహాగా భావించవద్దు.'
                : 'All figures, soil test values, weather readings, market prices, and crop suggestions shown are illustrative demo data for pilot testing. Do not present demo crop suggestions as real farming advice.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-amber-200 text-amber-800 font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>{pilotMandal}, {pilotDistrict} (AP)</span>
          </span>
          <span className="flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-slate-600" />
            <span>ANGRAU / Agmarknet Demo Feeds</span>
          </span>
        </div>
      </div>
    </div>
  );
};
