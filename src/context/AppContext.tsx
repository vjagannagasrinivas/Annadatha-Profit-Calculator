import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  FarmerProfile,
  FarmParcel,
  SoilHealthCard,
  WeatherCondition,
  CropProfile,
  ResourceItem,
  MandiPriceRecord,
  ProfitOptimizationPlan,
  ExpertReviewItem,
  VillageClusterStat,
  GovernmentScheme,
  FarmerSchemeApplication,
  ResearchEvidenceRecord,
  ResearchValidationStatus
} from '../types';
import {
  INITIAL_FARMERS,
  INITIAL_PARCELS,
  INITIAL_SOIL_CARDS,
  INITIAL_WEATHER,
  INITIAL_CROPS,
  INITIAL_RESOURCE_PLAN_PADDY,
  INITIAL_MANDI_PRICES,
  INITIAL_PROFIT_PLANS,
  INITIAL_REVIEW_QUEUE,
  INITIAL_VILLAGE_STATS
} from '../data/mockData';
import { OFFICIAL_SCHEMES, INITIAL_SCHEME_APPLICATIONS } from '../data/schemesData';
import { INITIAL_RESEARCH_EVIDENCE } from '../data/researchEvidenceData';
import { TRANSLATIONS } from '../data/translations';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface WeatherObservation {
  available: boolean; status: string; source: string; sourceUrl: string; stationId?: string;
  stationLocation?: string; observationDate?: string | null; observationTimeUtc?: string | null;
  currentTemp?: number; humidity?: number | null; windSpeed?: number | null; rainfallPast24h?: number | null;
  minTemp?: number | null; maxTemp?: number | null; fetchedAt?: string;
}
interface OfficialMandiRecord {
  id: string; commodity: string; variety: string; marketName: string; district: string; state: string;
  minPrice: number; maxPrice: number; modalPrice: number; reportDate: string; priceUnit: string;
  sourceName: string; sourceUrl: string; sourceTag: string; retrievedAt: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.en;
  
  // Pilot location
  pilotMandal: string;
  pilotDistrict: string;
  pilotState: string;
  setPilotMandal: (mandal: string) => void;
  setPilotDistrict: (district: string) => void;
  
  // Active selected farmer for farmer view & detailed inspects
  activeFarmerId: string;
  setActiveFarmerId: (id: string) => void;
  activeFarmer: FarmerProfile | undefined;
  
  // Collections
  farmers: FarmerProfile[];
  addFarmer: (farmer: FarmerProfile) => void;
  updateFarmer: (farmer: FarmerProfile) => void;
  
  parcels: FarmParcel[];
  addParcel: (parcel: FarmParcel) => void;
  
  soilCards: SoilHealthCard[];
  addSoilCard: (card: SoilHealthCard) => void;
  
  weather: WeatherCondition | null;
  weatherObservation: WeatherObservation | null;
  officialMandiRecords: OfficialMandiRecord[];
  liveDataStatus: { weather: string; mandi: string };
  
  crops: CropProfile[];
  
  resourcePlan: ResourceItem[];
  setResourcePlan: React.Dispatch<React.SetStateAction<ResourceItem[]>>;
  updateResourceItem: (index: number, updated: Partial<ResourceItem>) => void;
  
  mandiPrices: MandiPriceRecord[];
  
  profitPlans: ProfitOptimizationPlan[];
  saveProfitPlan: (plan: ProfitOptimizationPlan) => void;
  
  reviewQueue: ExpertReviewItem[];
  addReviewItem: (item: ExpertReviewItem) => void;
  updateReviewItem: (id: string, updates: Partial<ExpertReviewItem>) => void;
  
  villageStats: VillageClusterStat[];
  
  // Government Schemes & Farmer Benefits
  schemes: GovernmentScheme[];
  schemeApplications: FarmerSchemeApplication[];
  addSchemeApplication: (app: FarmerSchemeApplication) => void;
  updateSchemeApplication: (id: string, updates: Partial<FarmerSchemeApplication>, auditRemarks?: string) => void;
  bookmarkedSchemeIds: string[];
  toggleBookmarkScheme: (schemeId: string) => void;

  // Research Evidence Library & Professor Knowledge Contribution
  researchEvidence: ResearchEvidenceRecord[];
  addResearchRecord: (record: ResearchEvidenceRecord) => void;
  validateResearchRecord: (id: string, status: ResearchValidationStatus, notes: string) => void;
  
  // Notifications
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
  removeToast: (id: string) => void;
  
  // Demo Reset
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // One-time migration: discard legacy seeded demo records from this browser.
  useState(() => {
    const key = 'annadatha_data_mode';
    if (localStorage.getItem(key) !== 'real-data-only-v1') {
      [
        'annadatha_farmers', 'annadatha_parcels', 'annadatha_soil_cards',
        'annadatha_profit_plans', 'annadatha_reviews', 'annadatha_scheme_applications',
        'annadatha_bookmarked_schemes', 'annadatha_research_evidence'
      ].forEach((item) => localStorage.removeItem(item));
      localStorage.setItem(key, 'real-data-only-v1');
    }
    return true;
  });
  const [role, setRole] = useState<UserRole>('INSTITUTION_ADMIN');
  const [language, setLanguage] = useState<Language>('en');
  
  const [pilotMandal, setPilotMandal] = useState('Gudlavalleru');
  const [pilotDistrict, setPilotDistrict] = useState('Krishna');
  const [pilotState] = useState('Andhra Pradesh');
  
  const [activeFarmerId, setActiveFarmerId] = useState<string>('');
  
  const [farmers, setFarmers] = useState<FarmerProfile[]>(() => {
    const saved = localStorage.getItem('annadatha_farmers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [parcels, setParcels] = useState<FarmParcel[]>(() => {
    const saved = localStorage.getItem('annadatha_parcels');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [soilCards, setSoilCards] = useState<SoilHealthCard[]>(() => {
    const saved = localStorage.getItem('annadatha_soil_cards');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [weather] = useState<WeatherCondition | null>(null);
  const [weatherObservation, setWeatherObservation] = useState<WeatherObservation | null>(null);
  const [officialMandiRecords, setOfficialMandiRecords] = useState<OfficialMandiRecord[]>([]);
  const [liveDataStatus, setLiveDataStatus] = useState({ weather: 'LOADING', mandi: 'LOADING' });
  const [crops] = useState<CropProfile[]>(INITIAL_CROPS);
  const [resourcePlan, setResourcePlan] = useState<ResourceItem[]>([]);
  const [mandiPrices] = useState<MandiPriceRecord[]>([]);
  
  const [profitPlans, setProfitPlans] = useState<ProfitOptimizationPlan[]>(() => {
    const saved = localStorage.getItem('annadatha_profit_plans');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [reviewQueue, setReviewQueue] = useState<ExpertReviewItem[]>(() => {
    const saved = localStorage.getItem('annadatha_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  const [schemes] = useState<GovernmentScheme[]>([]);

  const [schemeApplications, setSchemeApplications] = useState<FarmerSchemeApplication[]>(() => {
    const saved = localStorage.getItem('annadatha_scheme_applications');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookmarkedSchemeIds, setBookmarkedSchemeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('annadatha_bookmarked_schemes');
    return saved ? JSON.parse(saved) : [];
  });

  const [researchEvidence, setResearchEvidence] = useState<ResearchEvidenceRecord[]>(() => {
    const saved = localStorage.getItem('annadatha_research_evidence');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [villageStats] = useState<VillageClusterStat[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Fetch official datasets through server-side adapters. API secrets never enter the browser.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [weatherResult, mandiResult] = await Promise.allSettled([
        fetch('/api/agriculture/weather').then(async (r) => { const data = await r.json(); if (!r.ok) throw data; return data; }),
        fetch('/api/agriculture/mandi-prices?district=Krishna').then(async (r) => { const data = await r.json(); if (!r.ok) throw data; return data; })
      ]);
      if (cancelled) return;
      if (weatherResult.status === 'fulfilled' && weatherResult.value?.available) {
        setWeatherObservation(weatherResult.value);
        setLiveDataStatus((s) => ({ ...s, weather: weatherResult.value.status || 'LIVE_DATA' }));
      } else {
        setWeatherObservation(null);
        setLiveDataStatus((s) => ({ ...s, weather: weatherResult.status === 'rejected' ? (weatherResult.reason?.status || 'UNAVAILABLE') : (weatherResult.value?.status || 'UNAVAILABLE') }));
      }
      if (mandiResult.status === 'fulfilled' && mandiResult.value?.available && Array.isArray(mandiResult.value.records)) {
        setOfficialMandiRecords(mandiResult.value.records);
        setLiveDataStatus((s) => ({ ...s, mandi: mandiResult.value.status || 'LIVE_DATA' }));
      } else {
        setOfficialMandiRecords([]);
        setLiveDataStatus((s) => ({ ...s, mandi: mandiResult.status === 'rejected' ? (mandiResult.reason?.status || 'UNAVAILABLE') : (mandiResult.value?.status || 'UNAVAILABLE') }));
      }
    };
    void load();
    return () => { cancelled = true; };
  }, []);

  // Persist state changes in localStorage for seamless evaluation
  useEffect(() => {
    localStorage.setItem('annadatha_farmers', JSON.stringify(farmers));
  }, [farmers]);

  useEffect(() => {
    localStorage.setItem('annadatha_parcels', JSON.stringify(parcels));
  }, [parcels]);

  useEffect(() => {
    localStorage.setItem('annadatha_soil_cards', JSON.stringify(soilCards));
  }, [soilCards]);

  useEffect(() => {
    localStorage.setItem('annadatha_profit_plans', JSON.stringify(profitPlans));
  }, [profitPlans]);

  useEffect(() => {
    localStorage.setItem('annadatha_reviews', JSON.stringify(reviewQueue));
  }, [reviewQueue]);

  useEffect(() => {
    localStorage.setItem('annadatha_scheme_applications', JSON.stringify(schemeApplications));
  }, [schemeApplications]);

  useEffect(() => {
    localStorage.setItem('annadatha_bookmarked_schemes', JSON.stringify(bookmarkedSchemeIds));
  }, [bookmarkedSchemeIds]);

  useEffect(() => {
    localStorage.setItem('annadatha_research_evidence', JSON.stringify(researchEvidence));
  }, [researchEvidence]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addFarmer = (newFarmer: FarmerProfile) => {
    setFarmers(prev => [newFarmer, ...prev]);
    addToast('success', 'Farmer Registered', `${newFarmer.fullName} added with ID ${newFarmer.id}`);
  };

  const updateFarmer = (updated: FarmerProfile) => {
    setFarmers(prev => prev.map(f => f.id === updated.id ? updated : f));
    addToast('info', 'Farmer Updated', `Profile updated for ${updated.fullName}`);
  };

  const addParcel = (newParcel: FarmParcel) => {
    setParcels(prev => [newParcel, ...prev]);
    // Also update farmer's parcel count
    setFarmers(prev => prev.map(f => {
      if (f.id === newParcel.farmerId) {
        return {
          ...f,
          parcelsCount: f.parcelsCount + 1,
          totalAcreage: Number((f.totalAcreage + newParcel.acreage).toFixed(2))
        };
      }
      return f;
    }));
    addToast('success', 'Farm Parcel Added', `Survey #${newParcel.surveyNumber} (${newParcel.acreage} ac) registered.`);
  };

  const addSoilCard = (newCard: SoilHealthCard) => {
    setSoilCards(prev => [newCard, ...prev]);
    addToast('success', 'Soil Health Card Added', `Sample ${newCard.sampleCode} processed.`);
  };

  const updateResourceItem = (index: number, updated: Partial<ResourceItem>) => {
    setResourcePlan(prev => {
      const copy = [...prev];
      const target = { ...copy[index], ...updated };
      target.totalCostPerAcre = target.quantityPerAcre * target.unitCostInr;
      copy[index] = target;
      return copy;
    });
  };

  const saveProfitPlan = (plan: ProfitOptimizationPlan) => {
    setProfitPlans(prev => {
      const idx = prev.findIndex(p => p.id === plan.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = plan;
        return copy;
      }
      return [plan, ...prev];
    });
    addToast('success', 'Plan Saved', `Crop profit plan for ${plan.cropName} stored.`);
  };

  const addReviewItem = (newItem: ExpertReviewItem) => {
    setReviewQueue(prev => [newItem, ...prev]);
    addToast('success', 'Sent to Expert Review', `${newItem.cropName} advisory submitted for agronomist sign-off.`);
  };

  const updateReviewItem = (id: string, updates: Partial<ExpertReviewItem>) => {
    setReviewQueue(prev => prev.map(item => item.id === id ? { ...item, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : item));
    addToast('info', 'Review Action Recorded', `Status updated for review #${id}`);
  };

  const addSchemeApplication = (newApp: FarmerSchemeApplication) => {
    setSchemeApplications(prev => [newApp, ...prev]);
    addToast('success', 'Scheme Application Registered', `Application ${newApp.applicationNumber} created for ${newApp.farmerName}`);
  };

  const updateSchemeApplication = (id: string, updates: Partial<FarmerSchemeApplication>, auditRemarks?: string) => {
    setSchemeApplications(prev => prev.map(app => {
      if (app.id === id) {
        const today = new Date().toISOString().split('T')[0];
        const newAudit = auditRemarks ? [
          ...app.auditTrail,
          {
            date: today,
            status: updates.currentStatus || app.currentStatus,
            updatedBy: role === 'INSTITUTION_ADMIN' ? 'Dr. M. V. Subbarao (Admin)' : role === 'FIELD_OFFICER' ? 'P. Anusha (VAA)' : 'Desk Officer',
            role: role === 'INSTITUTION_ADMIN' ? 'Institution Admin' : 'Field Officer',
            remarks: auditRemarks
          }
        ] : app.auditTrail;

        return {
          ...app,
          ...updates,
          lastUpdated: today,
          auditTrail: newAudit
        };
      }
      return app;
    }));
    addToast('info', 'Scheme Application Updated', `Status updated for application #${id}`);
  };

  const toggleBookmarkScheme = (schemeId: string) => {
    setBookmarkedSchemeIds(prev => {
      const exists = prev.includes(schemeId);
      const updated = exists ? prev.filter(id => id !== schemeId) : [...prev, schemeId];
      addToast('info', exists ? 'Scheme Removed' : 'Scheme Saved', exists ? 'Removed from saved schemes list' : 'Added to your saved schemes shortlist');
      return updated;
    });
  };

  const addResearchRecord = (record: ResearchEvidenceRecord) => {
    setResearchEvidence(prev => [record, ...prev]);
    addToast('success', 'Research Trial Recorded', `${record.cropName} evidence saved (${record.validationStatus}).`);
  };

  const validateResearchRecord = (id: string, status: ResearchValidationStatus, notes: string) => {
    const today = new Date().toISOString().split('T')[0];
    const validatorName =
      role === 'AGRI_EXPERT'
        ? 'Dr. S. Radhakrishna (Senior Agronomist)'
        : role === 'INSTITUTION_ADMIN'
        ? 'Dr. M. V. Subbarao (Institution Admin)'
        : 'Authorized Research Reviewer';
    setResearchEvidence(prev =>
      prev.map(rec =>
        rec.id === id
          ? {
              ...rec,
              validationStatus: status,
              localValidationNotes: notes,
              validatedBy: validatorName,
              validatedDate: today
            }
          : rec
      )
    );
    addToast('info', 'Research Status Updated', `Evidence record #${id} marked as ${status.replace(/_/g, ' ')}.`);
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('annadatha_farmers');
    localStorage.removeItem('annadatha_parcels');
    localStorage.removeItem('annadatha_soil_cards');
    localStorage.removeItem('annadatha_profit_plans');
    localStorage.removeItem('annadatha_reviews');
    localStorage.removeItem('annadatha_scheme_applications');
    localStorage.removeItem('annadatha_bookmarked_schemes');
    localStorage.removeItem('annadatha_research_evidence');
    
    setFarmers([]);
    setParcels([]);
    setSoilCards([]);
    setProfitPlans([]);
    setReviewQueue([]);
    setSchemeApplications([]);
    setBookmarkedSchemeIds([]);
    setResearchEvidence([]);
    setResourcePlan([]);
    setActiveFarmerId('');
    
    addToast('info', 'Workspace Cleared', 'Local records cleared. No demo records were restored.');
  };

  const activeFarmer = farmers.find(f => f.id === activeFarmerId) || farmers[0];

  const t = TRANSLATIONS[language];

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        t,
        pilotMandal,
        pilotDistrict,
        pilotState,
        setPilotMandal,
        setPilotDistrict,
        activeFarmerId,
        setActiveFarmerId,
        activeFarmer,
        farmers,
        addFarmer,
        updateFarmer,
        parcels,
        addParcel,
        soilCards,
        addSoilCard,
        weather,
        weatherObservation,
        officialMandiRecords,
        liveDataStatus,
        crops,
        resourcePlan,
        setResourcePlan,
        updateResourceItem,
        mandiPrices,
        profitPlans,
        saveProfitPlan,
        reviewQueue,
        addReviewItem,
        updateReviewItem,
        villageStats,
        schemes,
        schemeApplications,
        addSchemeApplication,
        updateSchemeApplication,
        bookmarkedSchemeIds,
        toggleBookmarkScheme,
        researchEvidence,
        addResearchRecord,
        validateResearchRecord,
        toasts,
        addToast,
        removeToast,
        resetAllDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
