import React, { useState } from 'react';
import {
  FarmLocationSelection,
  GeoBoundaryPoint,
  Language,
  LocationSelectionMode
} from '../../types';
import { MAP_CANVAS_BOUNDS, REGIONAL_LOCATION_NODES } from '../../data/locationBoundaries';
import {
  MapPin,
  Navigation,
  Edit3,
  Map as MapIcon,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Sprout,
  ShieldCheck,
  Loader2,
  Trash2
} from 'lucide-react';

interface Props {
  language: Language;
  location: FarmLocationSelection;
  onChange: (next: FarmLocationSelection) => void;
  onApplyNodeDefaults?: (soilType: any, drainage: any, rainfallMm: number, climateZone: string) => void;
}

export const IntelligentLocationSelector: React.FC<Props> = ({
  language,
  location,
  onChange,
  onApplyNodeDefaults
}) => {
  const [resolving, setResolving] = useState(false);
  const [gpsStatusMsg, setGpsStatusMsg] = useState<string | null>(null);
  const [drawingPolygon, setDrawingPolygon] = useState(false);

  const callResolveApi = async (payload: {
    mode: LocationSelectionMode;
    latitude?: number;
    longitude?: number;
    country?: string;
    state?: string;
    district?: string;
    mandal?: string;
    village?: string;
    locality?: string;
  }): Promise<{
    classification: 'URBAN' | 'PERI_URBAN' | 'RURAL';
    landUseCategory: string;
    requiresFarmConfirmation: boolean;
    urbanWarningEn?: string;
    urbanWarningTe?: string;
    resolvedLatitude?: number | null;
    resolvedLongitude?: number | null;
    osmStatus?: 'LIVE_NOMINATIM' | 'OFFLINE_BOUNDARY_FALLBACK';
    detectedAddress?: {
      country?: string;
      state?: string;
      district?: string;
      mandal?: string;
      village?: string;
      displayName?: string;
    };
  } | null> => {
    try {
      const resp = await fetch('/api/location/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) return null;
      return await resp.json();
    } catch {
      return null;
    }
  };

  const handleRequestGps = () => {
    setGpsStatusMsg(null);
    if (!navigator.geolocation) {
      setGpsStatusMsg(
        language === 'te'
          ? 'ఈ బ్రౌజర్‌లో GPS అందుబాటులో లేదు. దయచేసి మాన్యువల్ లేదా మ్యాప్ ఎంపికను ఉపయోగించండి.'
          : 'Browser GPS is unavailable here. Please use Manual Location or Interactive Map Pin.'
      );
      return;
    }

    setResolving(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(5));
        const lng = Number(pos.coords.longitude.toFixed(5));
        const resolved = await callResolveApi({
          mode: 'CURRENT_GPS',
          latitude: lat,
          longitude: lng
        });

        setResolving(false);
        const classification = resolved?.classification || 'PERI_URBAN';
        onChange({
          ...location,
          mode: 'CURRENT_GPS',
          latitude: lat,
          longitude: lng,
          country: resolved?.detectedAddress?.country || location.country,
          state: resolved?.detectedAddress?.state || location.state,
          district: resolved?.detectedAddress?.district || location.district,
          mandal: resolved?.detectedAddress?.mandal || location.mandal,
          village: resolved?.detectedAddress?.village || location.village,
          detectedAddressText:
            resolved?.detectedAddress?.displayName || `GPS ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          classification,
          landUseCategory: resolved?.landUseCategory || 'GPS Coordinates (Pending Farmer Land Confirmation)',
          requiresFarmConfirmation: true,
          agriculturalLandConfirmed: false, // NEVER assume current GPS residence is farmland!
          urbanWarningEn: resolved?.urbanWarningEn,
          urbanWarningTe: resolved?.urbanWarningTe,
          osmStatus: resolved?.osmStatus || 'OFFLINE_BOUNDARY_FALLBACK'
        });
      },
      (err) => {
        setResolving(false);
        setGpsStatusMsg(
          language === 'te'
            ? `GPS అనుమతి నిరాకరించబడింది (${err.message}). దయచేసి మీ గ్రామాన్ని మాన్యువల్‌గా లేదా మ్యాప్‌లో ఎంచుకోండి.`
            : `GPS permission denied or blocked (${err.message}). Select your farm manually or place a pin on the map.`
        );
      },
      { enableHighAccuracy: true, timeout: 7000 }
    );
  };

  const handleSelectRegionalNode = async (villageKey: string) => {
    const node = REGIONAL_LOCATION_NODES.find((n) => n.village === villageKey);
    if (!node) return;
    setResolving(true);
    const resolved = await callResolveApi({
      mode: 'MANUAL',
      country: node.country,
      state: node.state,
      district: node.district,
      mandal: node.mandal,
      village: node.village,
      latitude: node.lat,
      longitude: node.lng
    });
    setResolving(false);

    const isUrban = (resolved?.classification || node.classification) === 'URBAN';
    onChange({
      ...location,
      mode: 'MANUAL',
      country: node.country,
      state: node.state,
      district: node.district,
      mandal: node.mandal,
      village: node.village,
      locality: node.notesEn,
      latitude: node.lat,
      longitude: node.lng,
      classification: resolved?.classification || node.classification,
      landUseCategory: resolved?.landUseCategory || node.landUseCategory,
      requiresFarmConfirmation: isUrban || node.classification === 'PERI_URBAN',
      agriculturalLandConfirmed: node.classification === 'RURAL',
      urbanWarningEn: resolved?.urbanWarningEn || (isUrban ? node.notesEn : undefined),
      urbanWarningTe: resolved?.urbanWarningTe || (isUrban ? node.notesTe : undefined),
      detectedAddressText: `${node.village}, ${node.mandal}, ${node.district}, ${node.state}`,
      osmStatus: resolved?.osmStatus || 'OFFLINE_BOUNDARY_FALLBACK'
    });

    if (node.classification !== 'URBAN' && onApplyNodeDefaults) {
      onApplyNodeDefaults(node.defaultSoilType, node.defaultDrainage, node.avgRainfallMm, node.climateZone);
    }
  };

  const handleManualResolve = async () => {
    setResolving(true);
    const resolved = await callResolveApi({
      mode: 'MANUAL',
      country: location.country,
      state: location.state,
      district: location.district,
      mandal: location.mandal,
      village: location.village,
      locality: location.locality
    });
    setResolving(false);
    if (!resolved) return;

    onChange({
      ...location,
      mode: 'MANUAL',
      latitude: resolved.resolvedLatitude ?? location.latitude,
      longitude: resolved.resolvedLongitude ?? location.longitude,
      classification: resolved.classification,
      landUseCategory: resolved.landUseCategory,
      requiresFarmConfirmation: resolved.requiresFarmConfirmation,
      agriculturalLandConfirmed: resolved.classification === 'RURAL',
      urbanWarningEn: resolved.urbanWarningEn,
      urbanWarningTe: resolved.urbanWarningTe,
      detectedAddressText: resolved.detectedAddress?.displayName || location.detectedAddressText,
      osmStatus: resolved.osmStatus
    });
  };

  const handleKeepUrbanAsResidenceAndSwitchToFarm = () => {
    const dokiparru = REGIONAL_LOCATION_NODES[0];
    onChange({
      ...location,
      mode: 'MANUAL',
      residenceHub: {
        label: location.village || location.locality || 'City Residence',
        cityOrTown: location.village || 'Vijayawada',
        district: location.district || 'NTR',
        state: location.state || 'Andhra Pradesh',
        isSeparateFromFarm: true
      },
      country: dokiparru.country,
      state: dokiparru.state,
      district: dokiparru.district,
      mandal: dokiparru.mandal,
      village: dokiparru.village,
      locality: 'Agricultural Parcel (Rural Command)',
      latitude: dokiparru.lat,
      longitude: dokiparru.lng,
      classification: dokiparru.classification,
      landUseCategory: dokiparru.landUseCategory,
      requiresFarmConfirmation: false,
      agriculturalLandConfirmed: true,
      urbanWarningEn: undefined,
      urbanWarningTe: undefined,
      detectedAddressText: `${dokiparru.village}, ${dokiparru.mandal}, ${dokiparru.district}`
    });
    if (onApplyNodeDefaults) {
      onApplyNodeDefaults(
        dokiparru.defaultSoilType,
        dokiparru.defaultDrainage,
        dokiparru.avgRainfallMm,
        dokiparru.climateZone
      );
    }
  };

  // Interactive SVG map coordinate projection helper
  const projectToSvg = (lat: number, lng: number) => {
    const xPct =
      ((lng - MAP_CANVAS_BOUNDS.minLng) / (MAP_CANVAS_BOUNDS.maxLng - MAP_CANVAS_BOUNDS.minLng)) * 100;
    const yPct =
      (1 - (lat - MAP_CANVAS_BOUNDS.minLat) / (MAP_CANVAS_BOUNDS.maxLat - MAP_CANVAS_BOUNDS.minLat)) * 100;
    return {
      x: Math.max(4, Math.min(96, xPct)),
      y: Math.max(6, Math.min(94, yPct))
    };
  };

  const handleSvgMapClick = async (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    const lng = Number(
      (MAP_CANVAS_BOUNDS.minLng + xRatio * (MAP_CANVAS_BOUNDS.maxLng - MAP_CANVAS_BOUNDS.minLng)).toFixed(5)
    );
    const lat = Number(
      (MAP_CANVAS_BOUNDS.maxLat - yRatio * (MAP_CANVAS_BOUNDS.maxLat - MAP_CANVAS_BOUNDS.minLat)).toFixed(5)
    );

    if (drawingPolygon) {
      const nextPoly: GeoBoundaryPoint[] = [...(location.parcelPolygon || []), { lat, lng }];
      onChange({
        ...location,
        mode: 'MAP_PIN',
        parcelPolygon: nextPoly,
        latitude: location.latitude ?? lat,
        longitude: location.longitude ?? lng
      });
      return;
    }

    setResolving(true);
    const resolved = await callResolveApi({ mode: 'MAP_PIN', latitude: lat, longitude: lng });
    setResolving(false);

    const classification = resolved?.classification || 'RURAL';
    onChange({
      ...location,
      mode: 'MAP_PIN',
      latitude: lat,
      longitude: lng,
      district: resolved?.detectedAddress?.district || location.district,
      mandal: resolved?.detectedAddress?.mandal || location.mandal,
      village: resolved?.detectedAddress?.village || `Map Parcel (${lat.toFixed(3)}, ${lng.toFixed(3)})`,
      classification,
      landUseCategory: resolved?.landUseCategory || 'Map-Pinned Agricultural Parcel',
      requiresFarmConfirmation: classification !== 'RURAL',
      agriculturalLandConfirmed: classification === 'RURAL',
      urbanWarningEn: resolved?.urbanWarningEn,
      urbanWarningTe: resolved?.urbanWarningTe,
      detectedAddressText: resolved?.detectedAddress?.displayName || `Pin ${lat}, ${lng}`,
      osmStatus: resolved?.osmStatus || 'OFFLINE_BOUNDARY_FALLBACK'
    });
  };

  const isUrbanBlocked = location.classification === 'URBAN';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {language === 'te'
                ? 'మాడ్యూల్ 1: తెలివైన వ్యవసాయ భూమి స్థాన ఎంపిక (నగర/గ్రామీణ గుర్తింపు)'
                : 'Module 1: Intelligent Farm Location Selection & Urban/Rural Intelligence'}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              {language === 'te'
                ? 'నివాస చిరునామాను పొలంగా భావించదు. వాస్తవ వ్యవసాయ భూమి స్థానాన్ని నిర్ధారించండి.'
                : 'Where is your agricultural land located? Residence / city hubs are kept separate from actual farm parcels.'}
            </p>
          </div>
        </div>

        {/* Classification Pill */}
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${
              location.classification === 'URBAN'
                ? 'bg-rose-100 text-rose-900 border-rose-300'
                : location.classification === 'PERI_URBAN'
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}
          >
            {location.classification} · {location.landUseCategory.split('(')[0].trim()}
          </span>
        </div>
      </div>

      {/* Three Selection Mode Tabs */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...location, mode: 'CURRENT_GPS' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
              location.mode === 'CURRENT_GPS'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Navigation className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-xs font-bold">
                {language === 'te' ? 'A. నా ప్రస్తుత GPS స్థానం' : 'A. Use My Current Location'}
              </div>
              <div className={`text-[10px] ${location.mode === 'CURRENT_GPS' ? 'text-emerald-200' : 'text-slate-500'}`}>
                Browser GPS + farm check
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...location, mode: 'MANUAL' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
              location.mode === 'MANUAL'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-xs font-bold">
                {language === 'te' ? 'B. గ్రామం / చిరునామా ఎంపిక' : 'B. Select Location Manually'}
              </div>
              <div className={`text-[10px] ${location.mode === 'MANUAL' ? 'text-emerald-200' : 'text-slate-500'}`}>
                Country → Village → Locality
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChange({ ...location, mode: 'MAP_PIN' })}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
              location.mode === 'MAP_PIN'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <MapIcon className="w-4 h-4 shrink-0" />
            <div>
              <div className="text-xs font-bold">
                {language === 'te' ? 'C. మ్యాప్‌లో పొలం మార్క్ చేయండి' : 'C. Select Farm on Map'}
              </div>
              <div className={`text-[10px] ${location.mode === 'MAP_PIN' ? 'text-emerald-200' : 'text-slate-500'}`}>
                Pin marker + parcel boundary
              </div>
            </div>
          </button>
        </div>

        {/* Residence vs Farm Hub Separate Chip if set */}
        {location.residenceHub?.isSeparateFromFarm && (
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
              <span>
                <strong>Residence / Market Hub kept separate:</strong> {location.residenceHub.label} ({location.residenceHub.district})
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <Sprout className="w-4 h-4" />
              <span>
                Active Farm Parcel: {location.village}, {location.mandal}
              </span>
            </div>
          </div>
        )}

        {/* MODE A: CURRENT GPS */}
        {location.mode === 'CURRENT_GPS' && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900">
                  {language === 'te'
                    ? 'బ్రౌజర్ GPS ద్వారా స్థాన నిర్ధారణ'
                    : 'Detect Current Device Coordinates via Browser GPS'}
                </div>
                <p className="text-[11px] text-slate-600">
                  Annadatha will display the detected address and ask you whether you are standing on the farm or at home/town.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRequestGps}
                disabled={resolving}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {resolving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Navigation className="w-3.5 h-3.5" />}
                <span>{resolving ? 'Detecting...' : 'Request GPS Location'}</span>
              </button>
            </div>

            {gpsStatusMsg && (
              <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-[11px]">
                {gpsStatusMsg}
              </div>
            )}

            {location.detectedAddressText && (
              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
                <div className="text-[11px] text-slate-500 font-semibold uppercase">
                  Detected Location ({location.osmStatus || 'Boundary Check'})
                </div>
                <div className="font-semibold text-slate-900">{location.detectedAddressText}</div>
                {location.latitude && location.longitude && (
                  <div className="text-[11px] font-mono text-slate-500">
                    Coordinates: {location.latitude}, {location.longitude}
                  </div>
                )}

                {location.classification !== 'URBAN' && (
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-800">
                      Is this detected spot your actual agricultural land?
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...location,
                          agriculturalLandConfirmed: true,
                          requiresFarmConfirmation: false
                        })
                      }
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold border cursor-pointer ${
                        location.agriculturalLandConfirmed
                          ? 'bg-emerald-700 text-white border-emerald-800'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      }`}
                    >
                      Yes, this is my farm
                    </button>
                    <button
                      type="button"
                      onClick={handleKeepUrbanAsResidenceAndSwitchToFarm}
                      className="px-2.5 py-1 rounded text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 cursor-pointer"
                    >
                      No, this is my residence — select rural farm
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODE B: MANUAL SELECTION */}
        {location.mode === 'MANUAL' && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-800">Quick Benchmark & Urban-Safeguard Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSelectRegionalNode('Dokiparru')}
                  className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold hover:bg-emerald-200 cursor-pointer text-[11px]"
                >
                  Dokiparru (Gudlavalleru Rural Pilot)
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectRegionalNode('Vijayawada Urban (Benz Circle / Governorpet)')}
                  className="px-2.5 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300 font-semibold hover:bg-rose-200 cursor-pointer text-[11px]"
                >
                  Test Urban Safeguard: Vijayawada City
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectRegionalNode('Kankipadu (Peri-Urban Outskirts)')}
                  className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300 font-semibold hover:bg-amber-200 cursor-pointer text-[11px]"
                >
                  Kankipadu (Peri-Urban)
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectRegionalNode('Tarimela (Scarce Rainfall Dryland)')}
                  className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 border border-slate-300 font-semibold hover:bg-slate-300 cursor-pointer text-[11px]"
                >
                  Anantapuramu Dryland
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Country</label>
                <input
                  type="text"
                  value={location.country}
                  onChange={(e) => onChange({ ...location, country: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">State</label>
                <input
                  type="text"
                  value={location.state}
                  onChange={(e) => onChange({ ...location, state: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">District</label>
                <input
                  type="text"
                  value={location.district}
                  onChange={(e) => onChange({ ...location, district: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Mandal / Block / Taluka</label>
                <input
                  type="text"
                  value={location.mandal}
                  onChange={(e) => onChange({ ...location, mandal: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Village / Town</label>
                <input
                  type="text"
                  value={location.village}
                  onChange={(e) => onChange({ ...location, village: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Locality / Survey Ref</label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={location.locality}
                    onChange={(e) => onChange({ ...location, locality: e.target.value })}
                    placeholder="Survey # / Canal / Hamlet"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleManualResolve}
                    disabled={resolving}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-semibold text-xs cursor-pointer shrink-0"
                  >
                    {resolving ? '...' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE C: INTERACTIVE MAP & PARCEL BOUNDARY */}
        {location.mode === 'MAP_PIN' && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-bold text-slate-900">
                  Interactive Regional Boundary Map (Vijayawada Urban — Gudlavalleru Delta Corridor)
                </div>
                <p className="text-[11px] text-slate-600">
                  Click anywhere to drop a farm marker, or enable Boundary Polygon mode to outline your agricultural plot.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDrawingPolygon(!drawingPolygon)}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold text-[11px] border cursor-pointer ${
                    drawingPolygon
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {drawingPolygon ? 'Polygon Mode Active (Click corners)' : 'Mark Parcel Boundary'}
                </button>
                {(location.parcelPolygon?.length || 0) > 0 && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...location, parcelPolygon: [] })}
                    className="px-2 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 cursor-pointer flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="w-3 h-3" /> Clear Boundary
                  </button>
                )}
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-emerald-50/40">
              <svg
                viewBox="0 0 100 56"
                onClick={handleSvgMapClick}
                className="w-full h-64 cursor-crosshair select-none"
              >
                {/* Background Terrain Grid */}
                <defs>
                  <pattern id="farmGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#cbd5e1" strokeWidth="0.25" />
                  </pattern>
                </defs>
                <rect width="100" height="56" fill="#f0fdf4" />
                <rect width="100" height="56" fill="url(#farmGrid)" />

                {/* Vijayawada Urban Municipal Exclusion Zone (Top-Left) */}
                <ellipse cx="13" cy="14" rx="11" ry="9" fill="#fecdd3" fillOpacity="0.55" stroke="#e11d48" strokeWidth="0.4" strokeDasharray="1.2 0.8" />
                <text x="13" y="13" fontSize="2.3" textAnchor="middle" fill="#9f1239" fontWeight="bold">
                  Vijayawada Urban
                </text>
                <text x="13" y="16" fontSize="1.7" textAnchor="middle" fill="#be123c">
                  (City Zone - Non-Farm)
                </text>

                {/* Krishna Eastern Delta Canal Path */}
                <path
                  d="M 5 30 Q 38 24 65 31 T 95 27"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="1.2"
                  strokeOpacity="0.65"
                />
                <text x="52" y="25.5" fontSize="1.8" fill="#0369a1" fontWeight="bold">
                  Krishna Eastern Delta Canal Command
                </text>

                {/* Regional Reference Nodes */}
                {REGIONAL_LOCATION_NODES.filter(
                  (n) => n.district === 'Krishna' || n.district === 'NTR'
                ).map((n) => {
                  const pt = projectToSvg(n.lat, n.lng);
                  const yScaled = (pt.y / 100) * 56;
                  return (
                    <g key={n.village}>
                      <circle
                        cx={pt.x}
                        cy={yScaled}
                        r={1.3}
                        fill={n.classification === 'URBAN' ? '#e11d48' : n.classification === 'PERI_URBAN' ? '#d97706' : '#059669'}
                      />
                      <text
                        x={pt.x}
                        y={yScaled - 2}
                        fontSize="1.8"
                        textAnchor="middle"
                        fill="#1e293b"
                        fontWeight="600"
                      >
                        {n.village.split(' (')[0]}
                      </text>
                    </g>
                  );
                })}

                {/* Drawn Parcel Polygon */}
                {location.parcelPolygon && location.parcelPolygon.length >= 2 && (
                  <polygon
                    points={location.parcelPolygon
                      .map((p) => {
                        const pt = projectToSvg(p.lat, p.lng);
                        return `${pt.x},${(pt.y / 100) * 56}`;
                      })
                      .join(' ')}
                    fill="#10b981"
                    fillOpacity="0.3"
                    stroke="#047857"
                    strokeWidth="0.6"
                  />
                )}

                {/* Active Farmer Pin */}
                {typeof location.latitude === 'number' && typeof location.longitude === 'number' && (
                  (() => {
                    const pin = projectToSvg(location.latitude, location.longitude);
                    const py = (pin.y / 100) * 56;
                    return (
                      <g>
                        <circle cx={pin.x} cy={py} r={2.8} fill="#065f46" fillOpacity="0.2" />
                        <circle cx={pin.x} cy={py} r={1.6} fill="#047857" stroke="#ffffff" strokeWidth="0.5" />
                      </g>
                    );
                  })()
                )}
              </svg>
            </div>

            {/* Consent Checkbox */}
            <label className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={location.consentToSaveCoordinates}
                onChange={(e) => onChange({ ...location, consentToSaveCoordinates: e.target.checked })}
                className="accent-emerald-700"
              />
              <span>
                {language === 'te'
                  ? 'నా అనుమతితో మాత్రమే పొలం GPS అక్షాంశాలు మరియు సరిహద్దులను నిల్వ చేయడానికి సమ్మతిస్తున్నాను.'
                  : 'I consent to save these farm GPS coordinates and boundary polygon solely for agronomic parcel evaluation.'}
              </span>
            </label>
          </div>
        )}

        {/* ===================================================================
            URBAN / PERI-URBAN SAFEGUARD ALERT (CRITICAL REQUIREMENT)
           =================================================================== */}
        {isUrbanBlocked && (
          <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-xl space-y-2.5 text-xs text-rose-950">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-sm text-rose-900">
                  {language === 'te'
                    ? 'నగర ప్రాంత హెచ్చరిక — వ్యవసాయ పంట సిఫార్సులు నిలిపివేయబడ్డాయి'
                    : 'Urban City Centre Selected — Crop Recommendations Paused'}
                </div>
                <p className="leading-relaxed">
                  {language === 'te'
                    ? location.urbanWarningTe ||
                      'విజయవాడ నగర కేంద్రం వ్యవసాయ భూమి కాదు. మీ నివాసం నగరంలో ఉండి పొలం వేరే గ్రామంలో ఉంటే, దయచేసి మీ అసలు వ్యవసాయ భూమి గ్రామాన్ని నమోదు చేయండి.'
                    : location.urbanWarningEn ||
                      'Urban residential/commercial zone detected. Crop recommendations cannot be generated for a city centre. Please enter your actual rural agricultural parcel.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pl-7">
              <button
                type="button"
                onClick={handleKeepUrbanAsResidenceAndSwitchToFarm}
                className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-lg text-xs cursor-pointer"
              >
                Keep {location.village.split(' (')[0]} as Residence/Market Hub & Select Rural Farm Parcel (Dokiparru)
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...location, mode: 'MAP_PIN' })}
                className="px-3 py-1.5 bg-white border border-rose-300 text-rose-900 font-semibold rounded-lg text-xs hover:bg-rose-100 cursor-pointer"
              >
                Or Drop Pin on Rural Outskirts Map
              </button>
            </div>
          </div>
        )}

        {location.classification === 'PERI_URBAN' && !location.agriculturalLandConfirmed && (
          <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-amber-950">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {language === 'te'
                  ? location.urbanWarningTe || 'అర్ధ-పట్టణ ప్రాంతం: ఇది వ్యవసాయ భూమియే అని నిర్ధారించండి.'
                  : location.urbanWarningEn ||
                    'Peri-Urban zone detected. Please confirm this plot is active agricultural land (not residential/commercial).'}
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                onChange({ ...location, agriculturalLandConfirmed: true, requiresFarmConfirmation: false })
              }
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg cursor-pointer"
            >
              Confirm Active Agricultural Land
            </button>
          </div>
        )}

        {location.agriculturalLandConfirmed && location.classification !== 'URBAN' && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Agricultural Parcel Confirmed:</strong> {location.village}, {location.mandal}, {location.district} ({location.state})
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Ready for crop intelligence evaluation
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
