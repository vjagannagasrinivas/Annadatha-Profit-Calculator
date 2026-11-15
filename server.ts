import 'dotenv/config';
import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

type ClassificationType = 'URBAN' | 'PERI_URBAN' | 'RURAL';

interface LocationResolveRequest {
  mode: 'CURRENT_GPS' | 'MANUAL' | 'MAP_PIN';
  latitude?: number;
  longitude?: number;
  country?: string;
  state?: string;
  district?: string;
  mandal?: string;
  village?: string;
  locality?: string;
}

const URBAN_CITY_PATTERNS = [
  'vijayawada',
  'bezawada',
  'benz circle',
  'mg road',
  'governorpet',
  'patamata',
  'guntur city',
  'guntur urban',
  'visakhapatnam',
  'vizag',
  'hyderabad',
  'secunderabad',
  'tirupati urban',
  'rajahmundry urban',
  'kakinada urban',
  'machilipatnam urban',
  'nellore city',
  'kurnool city',
  'bengaluru',
  'chennai',
  'mumbai',
  'delhi'
];

const PERI_URBAN_PATTERNS = [
  'kankipadu',
  'penamaluru',
  'gannavaram',
  'ibrahimpatnam',
  'tadepalli',
  'mangalagiri',
  'nunna',
  'enikepadu',
  'poranki',
  'kanuru',
  'prasadampadu',
  'vuyyuru urban'
];

function classifyLocationDeterministic(input: LocationResolveRequest, nominatimDisplay?: string): {
  classification: ClassificationType;
  administrativeSummary: string;
  landUseCategory: string;
  requiresFarmConfirmation: boolean;
  urbanWarningEn?: string;
  urbanWarningTe?: string;
} {
  const combined = [
    input.district,
    input.mandal,
    input.village,
    input.locality,
    nominatimDisplay
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  // Bounding-box check for Vijayawada urban core (~16.47-16.56 N, 80.58-80.70 E)
  const inVijayawadaCoreBox =
    typeof input.latitude === 'number' &&
    typeof input.longitude === 'number' &&
    input.latitude >= 16.47 &&
    input.latitude <= 16.56 &&
    input.longitude >= 80.58 &&
    input.longitude <= 80.70;

  const isUrbanName = URBAN_CITY_PATTERNS.some((p) => combined.includes(p));
  const isPeriUrbanName = PERI_URBAN_PATTERNS.some((p) => combined.includes(p));

  if (inVijayawadaCoreBox || isUrbanName) {
    return {
      classification: 'URBAN',
      administrativeSummary: nominatimDisplay || `${input.village || input.locality || 'City Centre'}, ${input.district || 'NTR / Urban'}`,
      landUseCategory: 'URBAN_BUILT_UP_RESIDENTIAL_COMMERCIAL',
      requiresFarmConfirmation: true,
      urbanWarningEn:
        'Urban City Zone Detected (e.g., Vijayawada / Municipal Core). Annadatha does not recommend field crops for city-centre residential or commercial coordinates. Keep this as your Residence / Market Hub and specify your actual rural agricultural parcel.',
      urbanWarningTe:
        'నగర ప్రాంతం గుర్తించబడింది (ఉదా. విజయవాడ నగర కేంద్రం). నగర మధ్యలో పంట సిఫార్సులు ఇవ్వబడవు. దయచేసి దీనిని నివాస/మార్కెట్ చిరునామాగా ఉంచి, మీ అసలు వ్యవసాయ భూమి గ్రామాన్ని ఎంచుకోండి.'
    };
  }

  if (isPeriUrbanName) {
    return {
      classification: 'PERI_URBAN',
      administrativeSummary: nominatimDisplay || `${input.village || ''}, ${input.mandal || ''}, ${input.district || ''}`,
      landUseCategory: 'PERI_URBAN_TRANSITIONAL_AGRICULTURAL',
      requiresFarmConfirmation: true,
      urbanWarningEn:
        'Peri-Urban Transitional Zone Detected. Many plots here are mixed residential/industrial. Confirm that this specific survey parcel is active agricultural land before crop planning.',
      urbanWarningTe:
        'అర్ధ-పట్టణ ప్రాంతం గుర్తించబడింది. ఇది వ్యవసాయ భూమియే అని నిర్ధారించిన తర్వాతే పంట ప్రణాళిక రూపొందించబడుతుంది.'
    };
  }

  return {
    classification: 'RURAL',
    administrativeSummary:
      nominatimDisplay ||
      [input.village, input.mandal, input.district, input.state, input.country]
        .filter(Boolean)
        .join(', '),
    landUseCategory: 'RURAL_AGRICULTURAL_CROPLAND',
    requiresFarmConfirmation: input.mode === 'CURRENT_GPS'
  };
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.json({ limit: '2mb' }));

  // =========================================================================
  // API: Module 1 - Intelligent Location & Boundary Resolution
  // =========================================================================
  app.post('/api/location/resolve', async (req, res) => {
    const body = (req.body || {}) as LocationResolveRequest;
    let nominatimDisplay: string | undefined;
    let resolvedLat = body.latitude;
    let resolvedLng = body.longitude;
    let osmStatus: 'LIVE_NOMINATIM' | 'OFFLINE_BOUNDARY_FALLBACK' = 'OFFLINE_BOUNDARY_FALLBACK';
    let osmAddress: Record<string, string> = {};

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);

      if (typeof body.latitude === 'number' && typeof body.longitude === 'number') {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${body.latitude}&lon=${body.longitude}&addressdetails=1`;
        const resp = await fetch(url, {
          signal: controller.signal,
          headers: { 'User-Agent': 'Annadatha-Agri-Intelligence/1.0 (contact@annadatha.pilot)' }
        });
        if (resp.ok) {
          const data = (await resp.json()) as { display_name?: string; address?: Record<string, string> };
          nominatimDisplay = data.display_name;
          osmAddress = data.address || {};
          osmStatus = 'LIVE_NOMINATIM';
        }
      } else if (body.village || body.mandal || body.district || body.locality) {
        const q = [body.locality, body.village, body.mandal, body.district, body.state, body.country || 'India']
          .filter(Boolean)
          .join(', ');
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encodeURIComponent(q)}`;
        const resp = await fetch(url, {
          signal: controller.signal,
          headers: { 'User-Agent': 'Annadatha-Agri-Intelligence/1.0 (contact@annadatha.pilot)' }
        });
        if (resp.ok) {
          const arr = (await resp.json()) as Array<{
            display_name?: string;
            lat?: string;
            lon?: string;
            address?: Record<string, string>;
          }>;
          if (arr.length > 0) {
            nominatimDisplay = arr[0].display_name;
            osmAddress = arr[0].address || {};
            if (arr[0].lat && arr[0].lon) {
              resolvedLat = Number(arr[0].lat);
              resolvedLng = Number(arr[0].lon);
            }
            osmStatus = 'LIVE_NOMINATIM';
          }
        }
      }
      clearTimeout(timer);
    } catch {
      osmStatus = 'OFFLINE_BOUNDARY_FALLBACK';
    }

    const classified = classifyLocationDeterministic(
      { ...body, latitude: resolvedLat, longitude: resolvedLng },
      nominatimDisplay
    );

    res.json({
      ...classified,
      resolvedLatitude: resolvedLat ?? null,
      resolvedLongitude: resolvedLng ?? null,
      osmStatus,
      detectedAddress: {
        country: osmAddress.country || body.country || 'India',
        state: osmAddress.state || body.state || 'Andhra Pradesh',
        district: osmAddress.state_district || osmAddress.county || body.district || '',
        mandal: osmAddress.suburb || osmAddress.town || body.mandal || '',
        village: osmAddress.village || osmAddress.hamlet || osmAddress.city || body.village || '',
        displayName: nominatimDisplay || classified.administrativeSummary
      }
    });
  });

  // =========================================================================
  // Official data adapters — credentials are server-side environment secrets.
  // No browser bundle receives upstream API keys.
  // =========================================================================
  const fetchWithTimeout = async (url: string, headers: Record<string, string> = {}) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      return await fetch(url, { headers, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  };

  app.get('/api/agriculture/weather', async (_req, res) => {
    const stationId = process.env.IMD_STATION_ID?.trim();
    const apiToken = process.env.IMD_API_TOKEN?.trim();
    const authHeader = process.env.IMD_AUTH_HEADER?.trim() || 'Authorization';
    const authPrefix = process.env.IMD_AUTH_PREFIX ?? 'Bearer ';
    if (!stationId || !apiToken) {
      return res.status(503).json({
        available: false,
        status: 'CONFIGURATION_REQUIRED',
        message: 'Configure IMD_STATION_ID and IMD_API_TOKEN as server-side secrets after registering with IMD.',
        source: 'India Meteorological Department',
        sourceUrl: 'https://api.imd.gov.in/public/api_reference.html'
      });
    }
    try {
      const url = new URL('https://api.imd.gov.in/api/v1/current_wx');
      url.searchParams.set('id', stationId);
      const response = await fetchWithTimeout(url.toString(), {
        [authHeader]: authPrefix + apiToken,
        Accept: 'application/json'
      });
      if (!response.ok) {
        return res.status(502).json({ available: false, status: 'UPSTREAM_ERROR', upstreamStatus: response.status, source: 'IMD' });
      }
      const payload: any = await response.json();
      const rows = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [payload];
      const row = rows[0];
      if (!row) return res.status(502).json({ available: false, status: 'NO_OBSERVATION', source: 'IMD' });
      const number = (...keys: string[]) => {
        for (const key of keys) {
          const value = Number(row[key]);
          if (row[key] !== undefined && row[key] !== null && row[key] !== '' && Number.isFinite(value)) return value;
        }
        return null;
      };
      const currentTemp = number('Temperature', 'temperature', 'CURR_TEMP');
      if (currentTemp === null) return res.status(502).json({ available: false, status: 'UNRECOGNISED_RESPONSE', source: 'IMD' });
      return res.json({
        available: true,
        source: 'India Meteorological Department',
        sourceUrl: 'https://api.imd.gov.in/api/v1/current_wx',
        stationId,
        stationLocation: row.Station || row.STATION || 'IMD station (name unavailable)',
        observationDate: row['Date of Observation'] || row.DATE || null,
        observationTimeUtc: row['Time of Observation'] || row.TIME || null,
        currentTemp,
        humidity: number('Humidity', 'RH'),
        windSpeed: number('Wind Speed', 'WIND_SPEED'),
        rainfallPast24h: number('Last 24 hrs Rainfall', 'LAST_24_HRS_RAINFALL'),
        minTemp: number('MIN_TEMP'),
        maxTemp: number('MAX_TEMP'),
        fetchedAt: new Date().toISOString(),
        limitations: ['Station observation, not parcel-level weather', 'No forecast or agronomic advisory is inferred from this observation']
      });
    } catch {
      return res.status(502).json({ available: false, status: 'FETCH_FAILED', source: 'IMD' });
    }
  });

  app.get('/api/agriculture/mandi-prices', async (req, res) => {
    const apiKey = process.env.DATA_GOV_IN_API_KEY?.trim();
    const resourceId = process.env.AGMARKNET_RESOURCE_ID?.trim() || '9ef84268-d588-465a-a308-a864a43d0070';
    if (!apiKey) {
      return res.status(503).json({
        available: false,
        status: 'CONFIGURATION_REQUIRED',
        message: 'Configure DATA_GOV_IN_API_KEY as a server-side secret from the Open Government Data portal.',
        source: 'AGMARKNET / Open Government Data',
        sourceUrl: 'https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi'
      });
    }
    try {
      const url = new URL(`https://api.data.gov.in/resource/${encodeURIComponent(resourceId)}`);
      url.searchParams.set('api-key', apiKey);
      url.searchParams.set('format', 'json');
      url.searchParams.set('limit', '1000');
      url.searchParams.set('filters[state]', 'Andhra Pradesh');
      url.searchParams.set('filters[district]', String(req.query.district || 'Krishna'));
      if (req.query.commodity) url.searchParams.set('filters[commodity]', String(req.query.commodity));
      const response = await fetchWithTimeout(url.toString(), { Accept: 'application/json' });
      if (!response.ok) return res.status(502).json({ available: false, status: 'UPSTREAM_ERROR', upstreamStatus: response.status, source: 'AGMARKNET' });
      const payload: any = await response.json();
      const records = Array.isArray(payload?.records) ? payload.records : [];
      const pick = (row: any, ...keys: string[]) => {
        for (const key of keys) if (row[key] !== undefined && row[key] !== null && row[key] !== '') return row[key];
        return null;
      };
      const numeric = (value: any) => {
        const n = Number(String(value ?? '').replace(/,/g, ''));
        return Number.isFinite(n) ? n : null;
      };
      const normalised = records.map((row: any, index: number) => ({
        id: `agmarknet-${index}-${String(pick(row, 'arrival_date', 'date') || '')}`,
        commodity: pick(row, 'commodity', 'Commodity'),
        variety: pick(row, 'variety', 'Variety') || 'Not specified',
        marketName: pick(row, 'market', 'Market'),
        district: pick(row, 'district', 'District'),
        state: pick(row, 'state', 'State'),
        minPrice: numeric(pick(row, 'min_price', 'Min Price')),
        maxPrice: numeric(pick(row, 'max_price', 'Max Price')),
        modalPrice: numeric(pick(row, 'modal_price', 'Modal Price')),
        reportDate: pick(row, 'arrival_date', 'date', 'Arrival Date'),
        priceUnit: 'INR per quintal',
        sourceName: 'AGMARKNET via data.gov.in',
        sourceUrl: 'https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi',
        sourceTag: 'OFFICIAL_SOURCE',
        retrievedAt: new Date().toISOString()
      })).filter((row: any) => row.commodity && row.marketName && row.reportDate &&
        row.minPrice !== null && row.maxPrice !== null && row.modalPrice !== null);
      return res.json({
        available: normalised.length > 0,
        status: normalised.length > 0 ? 'LIVE_DATA' : 'NO_MATCHING_RECORDS',
        source: 'AGMARKNET via Open Government Data Platform India',
        sourceUrl: 'https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi',
        district: String(req.query.district || 'Krishna'),
        count: normalised.length,
        records: normalised
      });
    } catch {
      return res.status(502).json({ available: false, status: 'FETCH_FAILED', source: 'AGMARKNET' });
    }
  });

  // =========================================================================
  // API: Module 9 - Transparent Data Sources Connectivity Status
  // =========================================================================
  app.get('/api/sources/status', (_req, res) => {
    const geminiConfigured = Boolean(
      process.env.GEMINI_API_KEY?.trim() && process.env.GEMINI_API_KEY.trim() !== 'MY_GEMINI_API_KEY'
    );

    res.json({
      checkedAt: new Date().toISOString(),
      sources: [
        {
          id: 'SRC-GEMINI',
          name: 'AI Farmer Decision Agent (Gemini Server Synthesis)',
          category: 'AI_REASONING',
          status: geminiConfigured ? 'LIVE_CONNECTED' : 'VERIFICATION_REQUIRED',
          statusLabel: geminiConfigured
            ? 'Live Connected (Server-side Gemini API)'
            : 'Data unavailable — Configure GEMINI_API_KEY in runtime secrets',
          details:
            'Synthesizes multi-objective reasoning, risk checklists, and bilingual farmer advisories strictly from validated farm inputs and benchmark data.'
        },
        {
          id: 'SRC-GEO',
          name: 'OpenStreetMap Nominatim & Administrative Boundary Dataset',
          category: 'GEOGRAPHY_BOUNDARY',
          status: 'VERIFICATION_REQUIRED',
          statusLabel: 'Geocoding only — parcel land use is not verified',
          details:
            'Resolves GPS/manual queries into Urban, Peri-Urban, or Rural boundaries so city centres (e.g., Vijayawada) are never treated as farmland.'
        },
        {
          id: 'SRC-IMD',
          name: 'India Meteorological Department (IMD) Live Weather API',
          category: 'CLIMATE_WEATHER',
          status: 'VERIFICATION_REQUIRED',
          statusLabel: 'Verification required — Live IMD station API not connected',
          details:
            'Historical Krishna District monsoon averages are available for planning; live real-time IMD AWS telemetry requires an official institutional API feed.'
        },
        {
          id: 'SRC-SHC',
          name: 'Govt Soil Health Card (SHC) Portal & Lab LIMS',
          category: 'SOIL_CHEMISTRY',
          status: 'VERIFICATION_REQUIRED',
          statusLabel: 'Verification required — Live Govt SHC portal API not connected',
          details:
            'Individual parcel pH, EC, OC, N-P-K, and micronutrient values are NEVER inferred from GPS; farmer-entered or lab-tested values are used.'
        },
        {
          id: 'SRC-AGMARKNET',
          name: 'AGMARKNET / eNAM Daily Mandi Arrivals & Modal Prices',
          category: 'MARKET_PRICES',
          status: 'VERIFICATION_REQUIRED',
          statusLabel: 'Verification required — Live AGMARKNET API not connected',
          details:
            'Displays dated APMC/AMIC historical price bands and Conservative/Expected/Favourable scenarios rather than claiming live today spot rates.'
        },
        {
          id: 'SRC-ICAR',
          name: 'ICAR & ICAR-CRIDA District Crop Contingency Plans',
          category: 'AGRONOMY_REFERENCE',
          status: 'VERIFICATION_REQUIRED',
          statusLabel: 'Official reference documents and local applicability require verification',
          details:
            'Governs flood-submergence tolerance, drainage rejection rules, and delayed-monsoon crop contingency advisories.'
        },
        {
          id: 'SRC-ANGRAU',
          name: 'ANGRAU & ICAR-KVK Ghantasala Crop Production Protocols',
          category: 'AGRONOMY_REFERENCE',
          status: 'VERIFICATION_REQUIRED',
          statusLabel: 'Research records and source documents require verification',
          details:
            'Calibrates varietal selections, 13-item cultivation cost structures, seed rates, and seasonal sowing windows.'
        },
        {
          id: 'SRC-NIN',
          name: 'ICMR-NIN / IFCT 2017 Indian Food Composition Tables',
          category: 'NUTRITION_REFERENCE',
          status: 'CURATED_REFERENCE',
          statusLabel: 'Curated Official Reference Loaded',
          details:
            'Provides protein, dietary fibre, iron, zinc, calcium, and energy per 100g edible portion without making medical cure claims.'
        }
      ]
    });
  });

  // =========================================================================
  // API: Module 8 - AI Farmer Profit Optimization Agent (Server-Side Gemini)
  // =========================================================================
  app.post('/api/agent/analyze', async (req, res) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        available: false,
        error:
          'GEMINI_API_KEY is not configured in the server environment. Deterministic agronomic scoring and 10 objective rankings remain fully functional, while live Gemini AI synthesis is unavailable.'
      });
      return;
    }

    try {
      const {
        location,
        farmProfile,
        priorityWeights,
        topRankedSummary,
        rejectedSummary,
        combinationsSummary,
        researchEvidenceSummary
      } = req.body || {};

      const prompt = `You are the Annadatha AI Farmer Profit Optimization & Research-Driven Crop Discovery Agent operating under strict agricultural ethics.

STRICT RULES YOU MUST OBEY:
1. NEVER invent or fabricate missing values: if soilDataSource is UNKNOWN_NOT_TESTED or soilDepth is UNKNOWN or waterQualityUnknown is true, explicitly state "Data unavailable" for that field and advise free RBK/KVK testing without inventing numbers.
2. NEVER treat out-of-state research trials (e.g. ICAR-NIASM Baramati Maharashtra, ICAR-IIHR Bengaluru) or EXPERIMENTAL crops (e.g. Quinoa, Poona Fig, Dragon Fruit, Ashwagandha) as automatic proof for Gudlavalleru/Krishna Delta. Clearly separate Experimental vs Locally Validated crops and compare soil depth, drainage, summer heat, cyclone risk, and rainfall.
3. NEVER optimize gross revenue alone or guarantee profits; evaluate defensible net profit, conservative downside, Year-1 cash outlay, investment recovery, zero unnecessary debt, and financial risk score.
4. ONLY reference Government Assistance when explicitly verified; never claim farmer eligibility is officially approved.
5. NEVER claim any crop cures or treats medical diseases when discussing nutrition. Never confuse nutritional score with commercial profitability.
6. NEVER compare perennial multi-year cumulative returns directly with a single-season annual crop without noting Year-1 establishment cost and payback period.
7. Respect the Urban/Rural location boundary safeguard, evaluate cropping history / previous crop carryover risks, and incorporate validated multi-crop combinations & rotations.

FARMER & PARCEL CONTEXT:
- Location: ${JSON.stringify(location)}
- Farm Profile & Cropping History: ${JSON.stringify(farmProfile)}
- Farmer Priority Weights (0-100): ${JSON.stringify(priorityWeights)}
- Top Candidate Crops Evaluated (Defensible Profit, Financial Risk & Verified Schemes): ${JSON.stringify(topRankedSummary)}
- Validated Multi-Crop Combinations & Rotations: ${JSON.stringify(combinationsSummary || [])}
- Rejected / Unsuitable Crops & Reasons: ${JSON.stringify(rejectedSummary)}
- Research Evidence Library Trials Considered: ${JSON.stringify(researchEvidenceSummary || [])}

Produce a clear, farmer-friendly first, bilingual (English + Telugu) decision-support synthesis grounded strictly in the provided data.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              executiveSummaryEn: { type: Type.STRING },
              executiveSummaryTe: { type: Type.STRING },
              diversificationPlanEn: { type: Type.STRING },
              diversificationPlanTe: { type: Type.STRING },
              topRiskMitigations: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              dataGapWarnings: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              expertReviewNotesEn: { type: Type.STRING },
              agentConfidenceNote: { type: Type.STRING }
            },
            required: [
              'executiveSummaryEn',
              'executiveSummaryTe',
              'diversificationPlanEn',
              'diversificationPlanTe',
              'topRiskMitigations',
              'dataGapWarnings',
              'expertReviewNotesEn',
              'agentConfidenceNote'
            ]
          }
        }
      });

      const rawText = response.text;
      if (!rawText) {
        res.status(502).json({
          available: false,
          error: 'AI model returned an empty response. Deterministic multi-objective rankings remain valid.'
        });
        return;
      }

      const parsed = JSON.parse(rawText);
      res.json({
        available: true,
        modelUsed: 'gemini-4-hydrogen',
        generatedAt: new Date().toISOString(),
        synthesis: parsed
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown Gemini server error';
      res.status(502).json({
        available: false,
        error: `AI Agent synthesis failed (${msg}). Deterministic agronomic rankings remain active.`
      });
    }
  });

  // =========================================================================
  // VITE MIDDLEWARE (Dev) / STATIC BUILD (Prod)
  // =========================================================================
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, ws: { server: httpServer } },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Annadatha server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Annadatha server:', err);
  process.exit(1);
});
