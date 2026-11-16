# Annadatha — Agricultural Intelligence & Farmer Profit Optimization

Annadatha is being developed to help farmers compare crop choices and improve **net farm income without unnecessary debt**, while supporting nutritious and safe food for consumers.

## Current status: safety-first prototype

This branch intentionally starts with an empty farmer workspace. Legacy seeded demo records are cleared once in the browser. Weather, mandi prices, government scheme records, research evidence, profit plans, and crop rankings are not presented as verified live data when their required sources are unavailable.

### What this branch currently does

- Starts farmer, parcel, soil-card, profit-plan, review, scheme-application, bookmark, research, and village-stat collections empty unless the user enters records.
- Clears legacy browser-stored demo records once when switching to the real-data-only mode.
- Displays weather as unavailable until a verified weather feed is connected.
- Hides sample mandi prices, historical price charts, and MSP comparisons when no dated market feed is connected.
- Blocks crop rankings and crop combinations until a farm parcel, linked soil report, weather data, and dated mandi prices are available.
- Treats geocoding as address resolution only; it does not prove that a location is an agricultural parcel.
- Avoids describing unverified institutional references as locally validated evidence.

## Official data adapter implementation

This branch includes server-side adapter endpoints and browser presentation for two official data feeds:

- `GET /api/agriculture/weather`: configurable IMD current-station observation adapter. Configure `IMD_CURRENT_WEATHER_URL`, `IMD_STATION_ID`, and `IMD_API_TOKEN` using the exact endpoint, header and response schema issued for your IMD subscription. It intentionally does not generate forecasts or spraying advice.
- `GET /api/agriculture/mandi-prices?district=Krishna`: AGMARKNET daily-price adapter through the data.gov.in resource API. Configure `DATA_GOV_IN_API_KEY`; optionally override `AGMARKNET_RESOURCE_ID`.
- `.env.example` documents variable names only; it contains no credentials. Keep real values in server/deployment secrets, never in frontend variables or Git.
- The Weather and Market pages now display returned source, station/market, observation/report date, units, and unavailable states. They do not fabricate missing values.

Provider access and response schemas have not been validated against live credentials in this repository yet. A configured status means credentials are present, not that the upstream feed has passed validation. Crop ranking and profit estimates remain disabled until all required parcel, soil, agronomic evidence, verified price and cost inputs can be validated together.

A GitHub Actions workflow was added to run TypeScript validation and a Vite production build on pushes and pull requests. Check its result before merging.

## Important limitations

This is **not yet a production-ready live agricultural advisory service**. The following are not integrated in this branch:

- Authenticated IMD weather/station data.
- Official AGMARKNET/e-NAM daily market-price ingestion.
- Soil Health Card / laboratory LIMS verification.
- Parcel/cadastral land-use verification.
- Validated ICAR, ANGRAU, KVK and university trial evidence linked to exact source documents and conditions.
- Verified government-scheme eligibility feeds.
- Secure production database, authentication, role-based authorization, audit logs, backups and offline synchronization.

No API credentials have been supplied or configured. Do not enter API secrets in frontend code or commit them to Git. Configure credentials as server-side deployment secrets after obtaining them from the official provider.

## Official source starting points

- IMD: https://mausam.imd.gov.in/
- Soil Health Card: https://soilhealth.dac.gov.in/
- AGMARKNET: https://agmarknet.gov.in/
- ICAR: https://www.icar.gov.in/
- ANGRAU: https://angrau.ac.in/
- myScheme: https://www.myscheme.gov.in/
- PM-KISAN: https://www.pmkisan.gov.in/
- PMFBY: https://pmfby.gov.in/
- Andhra Pradesh Agriculture: https://apagrisnet.gov.in/

A source link is not itself proof that a dataset has been integrated or verified. Every displayed data point must eventually carry its source, location, observation/publication date, unit, and verification status.

## Development

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`

Build and lint results must be checked in the target environment before deployment. A successful source edit is not equivalent to a tested production build.

## Product principle

Never invent soil values, weather, market prices, yields, input costs, crop suitability, research findings, subsidies, eligibility, or expected profit. Missing information must be shown as **Data unavailable** or requested from the farmer. Any future estimate must disclose assumptions, evidence, uncertainty, and downside risk.
