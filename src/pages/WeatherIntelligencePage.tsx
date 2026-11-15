import React from 'react';
import { useApp } from '../context/AppContext';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  Thermometer,
  AlertTriangle,
  Calendar,
  CloudRain,
  ShieldAlert,
  MapPin,
  Clock
} from 'lucide-react';

export const WeatherIntelligencePage: React.FC = () => {
  const { language, weather, pilotMandal, pilotDistrict } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'వ్యవసాయ వాతావరణం & ముందస్తు హెచ్చరికలు' : 'Weather Intelligence & Agro-Meteorology'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'గుడ్లవల్లేరు పరిసరాల్లో ఉష్ణోగ్రత, వర్షపాతం, తేమ శాతం మరియు వ్యవసాయ సలహాలు'
              : 'Gudlavalleru agro-met station telemetry, 7-day operational field forecasts, and Bay of Bengal coastal weather advisories.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Recorded: {weather.recordedAt}</span>
        </div>
      </div>

      <DataDisclaimerBanner sourceNote="IMD Amaravati & Machilipatnam Cyclone Warning Center Feeds" compact />

      {/* Critical Agro-Met Alerts */}
      <div className="space-y-3">
        {weather.alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              alert.severity === 'WARNING'
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : alert.severity === 'ADVISORY'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-blue-50 border-blue-200 text-blue-950'
            }`}
          >
            <ShieldAlert className={`w-5 h-5 shrink-0 mt-0.5 ${
              alert.severity === 'WARNING' ? 'text-rose-600' : 'text-amber-600'
            }`} />

            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-xs font-bold uppercase tracking-wider">
                  {language === 'te' ? alert.titleTelugu : alert.title}
                </h2>
                <span className="text-[11px] font-medium opacity-80">
                  Valid Until: {alert.validUntil}
                </span>
              </div>
              <p className="text-xs mt-1 opacity-90 leading-relaxed">
                {alert.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Current Real-time Sensor Station Readings */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Temp */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-xl font-bold font-display text-slate-900 tabular-nums">
            {weather.currentTemp}°C
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Min: {weather.minTemp}° | Max: {weather.maxTemp}°
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Rel. Humidity</span>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-xl font-bold font-display text-blue-700 tabular-nums">
            {weather.humidity}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Blast disease watch
          </div>
        </div>

        {/* 24h Rain */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Past 24h Rain</span>
            <CloudRain className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2 text-xl font-bold font-display text-slate-900 tabular-nums">
            {weather.rainfallPast24h} <span className="text-xs font-normal text-slate-500">mm</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Dry window active
          </div>
        </div>

        {/* Cumulative Seasonal Rain */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Cumulative Rain</span>
            <CloudRain className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-xl font-bold font-display text-emerald-800 tabular-nums">
            {weather.seasonCumulativeRainfall} <span className="text-xs font-normal text-slate-500">mm</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Krishna Delta Season
          </div>
        </div>

        {/* Wind Speed */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Wind Velocity</span>
            <Wind className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 text-xl font-bold font-display text-slate-900 tabular-nums">
            {weather.windSpeed} <span className="text-xs font-normal text-slate-500">km/h</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            East-North-East
          </div>
        </div>

        {/* Solar Radiation */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Solar Flux</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-base font-bold font-display text-slate-900 tabular-nums">
            {weather.solarRadiation}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            High photosynthetic rate
          </div>
        </div>
      </div>

      {/* 7-Day Agricultural Forecast Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {language === 'te' ? '7-రోజుల వ్యవసాయ కార్యాచరణ వాతావరణ అంచనా' : '7-Day Operational Agricultural Forecast & Spraying Windows'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specific agronomic operational recommendations for Krishna Delta farmers
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded">
            Station: Gudlavalleru Block
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {weather.forecast.map((day, idx) => (
            <div key={day.date} className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              {/* Day & Date */}
              <div className="w-40 shrink-0">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{day.dayName}</span>
                  {idx === 0 && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">Today</span>}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">{day.date}</div>
              </div>

              {/* Temp and Humidity */}
              <div className="flex items-center gap-4 shrink-0 text-slate-700">
                <div className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                  <span className="tabular-nums font-semibold">{day.minTemp}° – {day.maxTemp}°C</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span className="tabular-nums font-medium">{day.humidity}% Humidity</span>
                </div>
                <div className="flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="tabular-nums font-medium">{day.expectedRainfall} mm ({day.rainfallChance}%)</span>
                </div>
              </div>

              {/* Agricultural Operational Advisory */}
              <div className="flex-1 md:text-right">
                <span className="inline-block px-3 py-1 bg-slate-100/80 rounded-md text-slate-800 font-medium border border-slate-200/60">
                  {day.advisorySnippet}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
