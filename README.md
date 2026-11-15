# Annadatha — Agricultural Intelligence & Crop Profit Optimization Platform

> **Pilot Hub**: Gudlavalleru Mandal, Krishna District, Andhra Pradesh, India.  
> **Platform Scope**: Scalable pan-India agricultural intelligence, soil diagnostics, crop suitability comparison, input resource planning, and market profit optimization.

---

## 1. Project Overview

**Annadatha** (అన్నదాత) is an institutional-grade agricultural intelligence and decision-support web application designed to empower farmers, extension workers (Village Agriculture Assistants / VAAs), agricultural scientists (ICAR-KVK agronomists), and institutional administrators.

The pilot implementation is situated in **Gudlavalleru Mandal, Krishna District, Andhra Pradesh**—a high-potential alluvial delta command area fed by the Krishna Eastern Delta canal system (Ryves and Bandar canals). The platform is architected for seamless multi-district and pan-India expansion.

---

## 2. Core Modules Implemented

1. **Institution Overview & Dashboard (`/`)**:
   - Aggregated metrics across Gudlavalleru pilot villages (registered farmers, active acreage, soil test coverage, avg net profit).
   - Village cluster table (Gudlavalleru, Dokiparru, Angaluru, Chandrala, Vinnakota, Vadlamannadu).
   - Live field activity log and canal water rotation status.

2. **Farmer Registry & Dossier (`/farmers`)**:
   - Filterable, searchable directory by village, landholding scale (Marginal, Small, Medium), and crop.
   - Detailed farmer profiles (masked Aadhaar, Rythu Bharosa Kendra IDs, linked land parcels, dairy units).
   - Add/Register new farmer form with instant validation.

3. **Farm Parcels & Cadastral Profiling (`/farms`)**:
   - Survey numbers, Khata numbers, acreage (acres and cents).
   - Soil taxonomy (Vertisols / Deep Black Cotton, Alluvial Clay Loams) and canal/borewell irrigation sources.
   - Water salinity EC metrics (dS/m) and simulated GIS cadastral plot visualizer.

4. **Soil Intelligence & Soil Health Card (`/soil`)**:
   - Physical Soil Health Card upload simulator with automated OCR extraction.
   - Comprehensive 14-parameter nutrient inventory (N, P, K, Zn, Fe, B, S, Ca, Mg, pH, EC, Organic Carbon).
   - Agronomic deficit diagnostic matrix tailored to Krishna Delta soils (e.g. Zinc deficiency remediation with Zinc Sulphate 21% @ 20 kg/acre).

5. **Weather Intelligence & Agro-Meteorology (`/weather`)**:
   - Telemetry from Gudlavalleru Agro-Met Station: temperature, relative humidity, past 24h & cumulative seasonal rainfall, wind velocity, and solar radiation flux.
   - 7-day operational agricultural forecast with dedicated spraying and canal release windows.
   - Disease hazard bulletins (high-humidity leaf blast warning for Samba Mahsuri BPT 5204).

6. **Research-Driven AI Crop Discovery & 12-Step Farm Assessment (`/crops` & `/research`)**:
   - **12-Step Farmer-Friendly Farm Requirements Wizard**: Interactive step-by-step assessment (Location, Land Size, Soil & SHC with plain-language pH/EC/OC/NPK explainers & "I don't know" options, Water, Weather, Season, Cropping History, Budget, Labour & Machinery, Farmer Objectives, Market Access, Optional Documents) in simple English & Telugu explaining *why* every question is asked and *how* to obtain missing info from RBK/KVK.
   - **Intelligent Location & Urban/Rural Safeguard**: Three modes — Current GPS (with explicit check that residence != farmland), Manual Country-to-Locality hierarchy, and Interactive Map pin + boundary polygon (saved only with user consent). Automatically classifies Urban, Peri-Urban, and Rural boundaries via `/api/location/resolve` so urban centres like **Vijayawada** never receive direct crop recommendations.
   - **Research Evidence Library (`/research`)**: 6-tier evidence hierarchy (Institutional ICAR/ANGRAU/YSRHU, University/Professor, Multi-location, KVK/Farmer demo, Commercial farmer, Unverified/Experimental) with explicit condition matching against parcel soil, drainage, rainfall, and summer heat, plus a Professor/Expert trial contribution form (`EXPERIMENTAL` until locally validated).
   - **Deep Dragon Fruit Conditional Evaluation**: Dedicated ICAR-NIASM & ICAR-IIHR institutional benchmark covering RCC pillars/trellis (~₹1.15L/ac), 35–45 cm raised beds for Krishna Delta clay, >38°C sunscald 30% shade net, 2–3 yr payback, ambient/chilled shelf life, and never auto-recommended.
   - **35-Crop Comprehensive Discovery Catalogue & 10 Objective Rankings**: Evaluates Cereals, Pulses, Millets, Oilseeds, **Spices & Condiments**, Fruits & Perennials, Vegetables, Leafy Greens, Medicinal Crops, Commercial Crops, and **Experimental Trials** across **16 farm dimensions** (geography, soil & depth, drainage, SHC chemistry, seasonal climate, water source/EC, initial & recurring investment, seed/planting material & FYM availability, labour/machinery, pest risks, nutrition, local buyers/perishability, research evidence, and verified-only Govt assistance). Produces **10 distinct rankings**: *Best Overall Balance*, *Lowest Investment*, *Lowest Recurring Costs*, *Lowest Water*, *Highest Nutrition*, *Highest Defensible Net Profit*, *Lowest Financial Risk*, *Fastest Cash Return*, *Best Long-Term Investment*, and *Best Crop Combinations & Rotations*.
   - **20-Point Farmer-Friendly Results & Final Report**: Simple explanation first (EN/TE) + expandable expert research & 13-line ledger, strict "Data unavailable" safeguards, Conservative/Expected/Favourable profit scenarios, verified-only Govt scheme badges, ICMR-NIN nutrition without medical cure claims, server-side Gemini synthesis (`POST /api/agent/analyze`), and printable Final Farmer Report.

7. **Resource Planner & Input Budgeting (`/resources`)**:
   - Granular cost breakdown: certified seeds, split-dose chemical fertilizers, organic FYM, plant protection, labour mandays, machinery hire, and canal water cess.
   - Dynamic acreage slider and cultivation method selector (Conventional Puddled Transplanting vs. Direct Seeded Rice DSR saving ~24% cost).

8. **Market Intelligence & Mandi Prices (`/market`)**:
   - Illustrative APMC Mandi feeds from Gudlavalleru AMIC, Machilipatnam AMC, Vijayawada (Gollapudi), and Guntur.
   - Min, max, and modal prices per quintal with daily arrivals.
   - Automatic variance comparison against Government Minimum Support Price (MSP).
   - 6-month seasonal price trend visualization.

9. **Profit Analysis & Risk Sensitivity Engine (`/profit`)**:
   - Full financial ledger: gross revenue (produce + straw/fodder), operational investments, net profit, and break-even price.
   - Interactive "What-If" stress testing simulator with real-time sliders for market price shocks (-30% to +30%), yield harvest losses (-40% to +20%), and input cost inflation.

10. **Expert Review & Approval Workflow (`/review`)**:
    - Multi-stage governance: Village Agriculture Assistant (VAA) field visits and Senior Agronomist chemical dosage sign-offs.
    - Actions: Approve Advisory, Request Dosage Revision, Record Inspection.

11. **Reports & Institutional Data Sources (`/reports`)**:
    - Exportable and printable official Farmer Advisory Card (రైతు సలహా పత్రం) with digital signature stamps.
    - Transparent documentation of referenced scientific standards (ANGRAU, KVK Ghantasala, AP Agmarknet, IMD).

12. **Settings & Pilot Administration (`/settings`)**:
    - District and mandal expansion selector.
    - Bilingual preference (English & Telugu - తెలుగు).
    - Role-Based Access Control (RBAC) matrix.
    - Sandbox integrity monitor and demo dataset reset button.

13. **Government Schemes & Farmer Benefits (`/schemes`)**:
    - Complete repository across 9 official categories: AP State Schemes, Central Schemes, Crop Insurance, Income Support, Seeds & Fertilizer Subsidies, Farm Machinery, Irrigation & Water, Agricultural Loans, Horticulture & Allied.
    - Official verified datasets from `apagrisnet.gov.in`, `pmkisan.gov.in`, `pmfby.gov.in`, `myscheme.gov.in`, `dbtbharat.gov.in`, and `agricoop.nic.in`.
    - Automated farmer eligibility screening engine evaluating land ownership (Patta vs CCRC tenant), acreage, crop, irrigation, and social category, classifying into 4 statuses: *Potentially Relevant*, *More Information Required*, *Appears Not to Meet Listed Conditions*, and *Official Eligibility Not Verified*.
    - Strict statutory disclaimer: Annadatha never claims official approval; final confirmation rests with the concerned government department or RBK.
    - Institutional Application Tracker: Record progress, documents submitted, department reference numbers, and audit logs.
    - Official Portals Directory with direct external links to government portals.

14. **Farmer Mobile View (`/farmer-view`)**:
    - Simplified, high-contrast, touch-first interface tailored for Rythu with large buttons, Telugu-first terminology, 1-tap acreage profit calculator, and integrated scheme eligibility & application tracking cards.

---

## 3. Demo Access & Roles

The top persistent bar provides instant switching between 5 simulation personas:
- **Institution Administrator**: Dr. M. V. Subbarao (Joint Director of Agriculture)
- **Agricultural Expert**: Dr. S. Radhakrishna (Senior Agronomist, KVK Ghantasala)
- **Field Officer**: P. Anusha (Village Agriculture Assistant, Gudlavalleru Hub)
- **Farmer (Rythu)**: Katragadda Venkat Rao (Dokiparru Village)
- **System Administrator**: Platform & Pilot Data Desk

> **Notice**: The platform operates in Demo Access Mode for evaluation. No real authentication or external credentials are required for evaluation.

---

## 4. Data Transparency Rules Enforced

- **"Demo data — not official data"** notices are prominently displayed throughout.
- Demo crop suggestions are clearly tagged as simulations, not real farming advice.
- Explicit visual badges distinguish:
  * `Farmer-Entered`
  * `Official Benchmark`
  * `Field Verified (VAA)`
  * `Expert Approved`
  * `Calculated Estimate`
- Live Express endpoints (`/api/location/resolve`, `/api/sources/status`, `/api/agent/analyze`) power boundary resolution and optional server-side Gemini narrative synthesis (`GEMINI_API_KEY` stays strictly server-side).
- External live government feeds (**IMD Live Weather**, **Govt SHC LIMS**, **AGMARKNET Spot API**) are not connected and are explicitly marked **Verification required** in the Data Sources registry and Final Farmer Report.

---

## 5. Requirements for Production Deployment

To transition Annadatha from this pilot demonstration into a live state or national production deployment, the following components must be integrated:

1. **Authentication & RBAC**:
   - Integration with Single Sign-On (SSO) using MeriPehchan / Aadhaar e-Sign or state departmental OAuth.
   - Role-based JWT token sessions with multi-factor authentication (MFA) for administrative sign-offs.

2. **Official Government & Sensor API Integrations**:
   - **e-Panta (AP Webland / Cadastral Portal)**: Live synchronization of survey numbers, patta passbooks, and crop bookings.
   - **Agmarknet & e-NAM**: Live websocket/REST ingestion of daily commodity prices from APMCs.
   - **IMD Agromet Service**: Real-time automated weather station (AWS) IoT feeds and Doppler radar precipitation alerts.
   - **Soil Health Card (SHC) Portal (Ministry of Agriculture)**: Direct lab LIMS integration to pull official lab test certificates.

3. **Backend Database & Persistence**:
   - Relational PostgreSQL / Cloud SQL database with PostGIS extensions for spatial cadastral polygon mapping.
   - Secure audit logs for every agronomist sign-off and dosage adjustment.

4. **Offline PWA & Low-Connectivity Sync**:
   - Service Worker caching and background sync for Field Officers in remote rural areas with intermittent cellular coverage.

5. **Multi-Channel Delivery**:
   - WhatsApp Bot and automated IVR voice calls in Telugu for illiterate or non-smartphone farmers with daily weather and spraying alerts.
