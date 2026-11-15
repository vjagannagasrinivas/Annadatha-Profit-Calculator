import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GovernmentScheme, SchemeCategory, FarmerSchemeApplication, SchemeApplicationStatus } from '../types';
import { SCHEME_CATEGORIES_METADATA } from '../data/schemesData';
import { evaluateSchemeEligibility } from '../utils/schemeEligibility';
import { SchemeEligibilityBadge } from '../components/schemes/SchemeEligibilityBadge';
import { SchemeApplicationStatusBadge } from '../components/schemes/SchemeApplicationStatusBadge';
import { SchemeDetailModal } from '../components/schemes/SchemeDetailModal';
import { RecordApplicationModal } from '../components/schemes/RecordApplicationModal';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import {
  Landmark,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Plus,
  Bookmark,
  BookmarkCheck,
  Building,
  Calendar,
  FileText,
  Clock,
  Coins,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Users,
  Edit,
  History,
  Eye,
  ChevronRight,
  TrendingUp,
  MapPin,
  HelpCircle,
  X
} from 'lucide-react';

export const GovernmentSchemesPage: React.FC = () => {
  const {
    language,
    schemes,
    schemeApplications,
    updateSchemeApplication,
    activeFarmer,
    farmers,
    parcels,
    soilCards,
    bookmarkedSchemeIds,
    toggleBookmarkScheme,
    role
  } = useApp();

  const [activeTab, setActiveTab] = useState<'BROWSE' | 'TRACKER' | 'BENEFICIARIES' | 'PORTALS'>('BROWSE');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | 'STATE_AP' | 'CENTRAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);

  // Modals state
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<GovernmentScheme | null>(null);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [schemeForNewApp, setSchemeForNewApp] = useState<GovernmentScheme | undefined>(undefined);

  // Application update modal state (for institution staff)
  const [selectedAppForEdit, setSelectedAppForEdit] = useState<FarmerSchemeApplication | null>(null);
  const [editStatus, setEditStatus] = useState<SchemeApplicationStatus>('UNDER_SCRUTINY');
  const [editRemarks, setEditRemarks] = useState('');
  const [editDisbursed, setEditDisbursed] = useState<number>(0);

  const farmerParcels = parcels.filter(p => p.farmerId === activeFarmer?.id);
  const activeSoilCard = soilCards.find(s => s.farmerId === activeFarmer?.id);

  // Filter schemes
  const filteredSchemes = schemes.filter(scheme => {
    const matchCat = selectedCategory === 'ALL' || scheme.category === selectedCategory;
    const matchLevel = selectedLevel === 'ALL' || scheme.level === selectedLevel;
    const matchSearch =
      scheme.officialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.officialNameTelugu.includes(searchQuery) ||
      scheme.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSaved = !onlySaved || bookmarkedSchemeIds.includes(scheme.id);

    return matchCat && matchLevel && matchSearch && matchSaved;
  });

  // Calculate Application Stats
  const totalApps = schemeApplications.length;
  const approvedApps = schemeApplications.filter(a => a.currentStatus === 'VERIFIED_APPROVED' || a.currentStatus === 'BENEFIT_DISBURSED').length;
  const scrutinyApps = schemeApplications.filter(a => a.currentStatus === 'UNDER_SCRUTINY' || a.currentStatus === 'SUBMITTED_RBK').length;
  const totalDisbursedFunds = schemeApplications.reduce((acc, curr) => acc + (curr.disbursedAmount || 0), 0);

  const handleOpenEditApp = (app: FarmerSchemeApplication) => {
    setSelectedAppForEdit(app);
    setEditStatus(app.currentStatus);
    setEditRemarks(app.officerRemarks || '');
    setEditDisbursed(app.disbursedAmount || 0);
  };

  const handleSaveAppEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppForEdit) return;

    updateSchemeApplication(
      selectedAppForEdit.id,
      {
        currentStatus: editStatus,
        officerRemarks: editRemarks,
        disbursedAmount: editStatus === 'BENEFIT_DISBURSED' ? Number(editDisbursed) : selectedAppForEdit.disbursedAmount
      },
      editRemarks || `Status updated to ${editStatus}`
    );

    setSelectedAppForEdit(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Landmark className="w-4 h-4 text-emerald-700" />
            <span>GOVERNMENT WELFARE & SUBSIDY DIRECTORY</span>
            <span className="text-slate-400">·</span>
            <span>Andhra Pradesh & GoI Directives</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {language === 'te'
              ? 'ప్రభుత్వ పథకాలు & రైతు సంక్షేమ ప్రయోజనాలు'
              : 'Government Schemes & Farmer Benefits'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'కేంద్ర, రాష్ట్ర ప్రభుత్వ పథకాలు, రాయితీ విత్తనాలు, పంటల బీమా మరియు దరఖాస్తుల పర్యవేక్షణ'
              : 'Direct benefit transfers, input subsidies, crop insurance, and institutional application tracking.'}
          </p>
        </div>

        {/* Institution Staff Action */}
        {(role === 'INSTITUTION_ADMIN' || role === 'FIELD_OFFICER') && (
          <button
            onClick={() => {
              setSchemeForNewApp(undefined);
              setShowRecordModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'te' ? 'రైతు దరఖాస్తు నమోదు' : 'Record New Application'}</span>
          </button>
        )}
      </div>

      <DataDisclaimerBanner
        sourceNote="Official Portals: apagrisnet.gov.in, pmkisan.gov.in, pmfby.gov.in, myscheme.gov.in"
      />

      {/* Tabs Strip */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto text-xs font-semibold pb-px">
        <button
          onClick={() => setActiveTab('BROWSE')}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'BROWSE'
              ? 'border-emerald-700 text-emerald-800 font-bold bg-emerald-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>{language === 'te' ? 'పథకాల జాబితా & అర్హత' : 'Browse Schemes & Eligibility'}</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px]">
            {schemes.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('TRACKER')}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'TRACKER'
              ? 'border-emerald-700 text-emerald-800 font-bold bg-emerald-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{language === 'te' ? 'దరఖాస్తుల స్థితి & పర్యవేక్షణ' : 'Application Progress Tracker'}</span>
          <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px]">
            {schemeApplications.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('BENEFICIARIES')}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'BENEFICIARIES'
              ? 'border-emerald-700 text-emerald-800 font-bold bg-emerald-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{language === 'te' ? 'రైతుల ప్రయోజన మ్యాట్రిక్స్' : 'Farmer Opportunity Matrix'}</span>
        </button>

        <button
          onClick={() => setActiveTab('PORTALS')}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'PORTALS'
              ? 'border-emerald-700 text-emerald-800 font-bold bg-emerald-50/50 rounded-t-lg'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>{language === 'te' ? 'అధికారిక వెబ్‌సైట్ల డైరెక్టరీ' : 'Official Portals & Guidelines'}</span>
        </button>
      </div>

      {/* TAB 1: BROWSE SCHEMES & SCREENING */}
      {activeTab === 'BROWSE' && (
        <div className="space-y-6">
          {/* Active Farmer Quick Eligibility Banner */}
          {activeFarmer && (
            <div className="bg-emerald-900 text-white rounded-xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>ELIGIBILITY SCREENING ACTIVE PROFILE</span>
                  <span>·</span>
                  <span className="font-mono">{activeFarmer.id}</span>
                </div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>{activeFarmer.fullName} ({activeFarmer.fullNameTelugu})</span>
                  <span className="text-xs bg-emerald-800 px-2 py-0.5 rounded text-emerald-100 font-medium">
                    {activeFarmer.village}
                  </span>
                </div>
                <div className="text-xs text-emerald-200 flex items-center gap-3 flex-wrap pt-0.5">
                  <span>Landholding: <strong className="text-white">{activeFarmer.totalAcreage} Acres</strong></span>
                  <span>·</span>
                  <span>Category: <strong className="text-white">{activeFarmer.landOwnershipType || 'OWNER'}</strong></span>
                  <span>·</span>
                  <span>Crop: <strong className="text-white">{activeFarmer.primaryCrop}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs bg-emerald-800/80 p-3 rounded-lg border border-emerald-700">
                <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                <div>
                  <div className="font-bold text-white">Automated Criteria Matching</div>
                  <div className="text-[11px] text-emerald-200">
                    Schemes filtered based on your landownership and crop
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={language === 'te' ? 'పథకం పేరు, శాఖ లేదా కోడ్ వెతకండి (ఉదా: పీఎం-కిసాన్, బీమా)...' : 'Search schemes by name, department, or keyword...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  aria-label="Filter by Government Level"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as any)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Levels (State & Central)</option>
                  <option value="STATE_AP">Andhra Pradesh State Schemes</option>
                  <option value="CENTRAL">Central Government Schemes</option>
                </select>

                <button
                  onClick={() => setOnlySaved(!onlySaved)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    onlySaved
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'text-emerald-700 fill-emerald-700' : 'text-slate-400'}`} />
                  <span>Saved Schemes ({bookmarkedSchemeIds.length})</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills (Functional interactive buttons) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
                  selectedCategory === 'ALL'
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Categories ({schemes.length})
              </button>

              {SCHEME_CATEGORIES_METADATA.map((cat) => {
                const count = schemes.filter(s => s.category === cat.key).length;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium cursor-pointer ${
                      selectedCategory === cat.key
                        ? 'bg-emerald-700 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{language === 'te' ? cat.labelTe : cat.labelEn}</span>
                    <span className="ml-1 opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchemes.length === 0 ? (
              <div className="col-span-full p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
                <Landmark className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs">No schemes found matching the search or category filters.</p>
              </div>
            ) : (
              filteredSchemes.map((scheme) => {
                const eligibility = evaluateSchemeEligibility(scheme, activeFarmer, farmerParcels, activeSoilCard);
                const isBookmarked = bookmarkedSchemeIds.includes(scheme.id);

                return (
                  <div
                    key={scheme.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-emerald-300 transition-colors space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Top Bar: Level & Bookmark */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            scheme.level === 'STATE_AP'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : 'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}>
                            {scheme.level === 'STATE_AP' ? 'AP State' : 'Central GoI'}
                          </span>

                          <span className="text-[10px] text-slate-500 font-mono">
                            {scheme.code}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleBookmarkScheme(scheme.id)}
                          className="p-1 text-slate-400 hover:text-emerald-700 rounded transition-colors cursor-pointer"
                          title={isBookmarked ? 'Remove saved scheme' : 'Save scheme'}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-emerald-700" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                          {language === 'te' ? scheme.officialNameTelugu : scheme.officialName}
                        </h3>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {language === 'te' ? scheme.officialName : scheme.officialNameTelugu}
                        </div>
                      </div>

                      {/* Benefit Pill */}
                      <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 space-y-0.5 text-xs">
                        <div className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                          {language === 'te' ? 'రాయితీ / లబ్ధి మొత్తం:' : 'Verified Benefit:'}
                        </div>
                        <div className="font-bold text-emerald-950 font-display text-xs line-clamp-2">
                          {language === 'te' ? scheme.benefitAmountOrSubsidyTelugu : scheme.benefitAmountOrSubsidy}
                        </div>
                      </div>

                      {/* Potential Eligibility Badge */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          {language === 'te' ? 'మీ ప్రొఫైల్ ఆధారంగా అర్హత:' : 'Potential Eligibility:'}
                        </div>
                        <div>
                          <SchemeEligibilityBadge status={eligibility.status} />
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2 pt-0.5">
                          {(language === 'te' ? eligibility.reasonsTe : eligibility.reasonsEn)[0]}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <a
                        href={scheme.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px]"
                        title="Official portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Official Portal</span>
                      </a>

                      <button
                        onClick={() => setSelectedSchemeForModal(scheme)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>{language === 'te' ? 'పూర్తి వివరాలు' : 'View Details'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATION TRACKER */}
      {activeTab === 'TRACKER' && (
        <div className="space-y-6">
          {/* Tracker Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 text-xs">Total Applications Tracked</span>
              <div className="mt-1 text-2xl font-bold font-display text-slate-900 tabular-nums">
                {totalApps}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Across Gudlavalleru Cluster</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 text-xs">Approved / Benefit Disbursed</span>
              <div className="mt-1 text-2xl font-bold font-display text-emerald-800 tabular-nums">
                {approvedApps}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">Verified on State/Central Portals</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 text-xs">Under Scrutiny / In Progress</span>
              <div className="mt-1 text-2xl font-bold font-display text-blue-700 tabular-nums">
                {scrutinyApps}
              </div>
              <div className="text-[11px] text-blue-600 mt-1">Pending at VAA / MAO Level</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 text-xs">Total Direct Benefits Tracked</span>
              <div className="mt-1 text-2xl font-bold font-display text-emerald-900 tabular-nums">
                ₹{totalDisbursedFunds.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Direct Benefit Transfer (DBT)</div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Active Benefit Applications Register & Document Verification Status
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Real-time synchronization with Rythu Bharosa Kendra (RBK) submission logs
                </p>
              </div>

              {(role === 'INSTITUTION_ADMIN' || role === 'FIELD_OFFICER') && (
                <button
                  onClick={() => setShowRecordModal(true)}
                  className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Record Application</span>
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                    <th className="py-2.5 px-4">Application #</th>
                    <th className="py-2.5 px-3">Scheme Name</th>
                    <th className="py-2.5 px-3">Beneficiary Farmer</th>
                    <th className="py-2.5 px-3">Village</th>
                    <th className="py-2.5 px-3">Applied Date</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Submitted Docs</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {schemeApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                        {app.applicationNumber}
                        {app.departmentRefNumber && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            Ref: {app.departmentRefNumber}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{app.schemeName}</div>
                        <div className="text-[10px] text-slate-500">{app.schemeNameTelugu}</div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-900">{app.farmerName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{app.farmerId}</div>
                      </td>

                      <td className="py-3 px-3 font-medium text-slate-800">
                        {app.village}
                      </td>

                      <td className="py-3 px-3 font-mono text-slate-600">
                        {app.appliedDate}
                      </td>

                      <td className="py-3 px-3">
                        <SchemeApplicationStatusBadge status={app.currentStatus} />
                      </td>

                      <td className="py-3 px-3">
                        <div className="text-[11px] text-emerald-800 font-medium">
                          {app.submittedDocuments.length} Verified
                        </div>
                        {app.pendingDocuments.length > 0 && (
                          <div className="text-[10px] text-rose-700 font-medium">
                            {app.pendingDocuments.length} Pending
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        {(role === 'INSTITUTION_ADMIN' || role === 'FIELD_OFFICER') ? (
                          <button
                            onClick={() => handleOpenEditApp(app)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Update Status
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400">View Only</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FARMER BENEFIT OPPORTUNITY MATRIX */}
      {activeTab === 'BENEFICIARIES' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Registered Farmers — Scheme Benefit Opportunity Matrix
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Proactively identify eligible farmers based on landholding, tenancy, and crop cultivation records
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                    <th className="py-2.5 px-4">Farmer Name & ID</th>
                    <th className="py-2.5 px-3">Village</th>
                    <th className="py-2.5 px-3">Tenancy / Ownership</th>
                    <th className="py-2.5 px-3 text-right">Acreage</th>
                    <th className="py-2.5 px-3">Active Crop</th>
                    <th className="py-2.5 px-3 text-center">Matching Schemes</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {farmers.map((farmer) => {
                    const parcelsForFarmer = parcels.filter(p => p.farmerId === farmer.id);
                    const matchingSchemesCount = schemes.filter(s => {
                      const res = evaluateSchemeEligibility(s, farmer, parcelsForFarmer);
                      return res.status === 'POTENTIALLY_RELEVANT';
                    }).length;

                    return (
                      <tr key={farmer.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{farmer.fullName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{farmer.id}</div>
                        </td>

                        <td className="py-3 px-3 font-medium text-slate-800">
                          {farmer.village}
                        </td>

                        <td className="py-3 px-3">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            farmer.landOwnershipType === 'TENANT_CCRC'
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}>
                            {farmer.landOwnershipType === 'TENANT_CCRC' ? 'Tenant (CCRC)' : 'Owner Cultivator'}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                          {farmer.totalAcreage} Ac
                        </td>

                        <td className="py-3 px-3">
                          {farmer.primaryCrop}
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{matchingSchemesCount} Relevant Schemes</span>
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedSchemeForModal(schemes[0]);
                            }}
                            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 underline"
                          >
                            Explore Schemes &rarr;
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: OFFICIAL PORTALS & DIRECTORY */}
      {activeTab === 'PORTALS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">AP Agrisnet (Department of Agriculture)</h3>
                  <div className="text-xs text-slate-500">Government of Andhra Pradesh</div>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  State Portal
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official agricultural gateway for Andhra Pradesh. Manages e-Panta crop registration, subsidized seed indents, and Rythu Bharosa Kendra (RBK) service catalogs.
              </p>
              <a
                href="https://apagrisnet.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>Visit https://apagrisnet.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">PM-KISAN Samman Nidhi</h3>
                  <div className="text-xs text-slate-500">Ministry of Agriculture & Farmers Welfare, GoI</div>
                </div>
                <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  Central DBT
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                National Direct Benefit Transfer portal providing ₹6,000/year to landholding farmer families. Hosts online farmer registration, e-KYC authentication, and installment status verification.
              </p>
              <a
                href="https://www.pmkisan.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>Visit https://www.pmkisan.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Pradhan Mantri Fasal Bima Yojana (PMFBY)</h3>
                  <div className="text-xs text-slate-500">National Crop Insurance Portal</div>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Crop Insurance
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrated national crop insurance platform. Calculates sum insured, premium rates, and monitors yield loss compensation for notified insurance units.
              </p>
              <a
                href="https://pmfby.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>Visit https://pmfby.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">myScheme National Platform</h3>
                  <div className="text-xs text-slate-500">National e-Governance Division (NeGD)</div>
                </div>
                <span className="text-[10px] font-semibold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                  One-Stop Portal
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Single unified national portal discovering all government schemes across agriculture, irrigation, and allied farming sectors.
              </p>
              <a
                href="https://www.myscheme.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>Visit https://www.myscheme.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">DBT Bharat Portal</h3>
                  <div className="text-xs text-slate-500">Cabinet Secretariat, Government of India</div>
                </div>
                <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  DBT Monitor
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct Benefit Transfer tracking mechanism across all central welfare and farm subsidy transfers.
              </p>
              <a
                href="https://dbtbharat.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>Visit https://dbtbharat.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">AgriCoop (Ministry of Agriculture)</h3>
                  <div className="text-xs text-slate-500">Department of Agriculture & Farmers Welfare, GoI</div>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Policy & Guidelines
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official policy guidelines, operational schemes guidelines, and KCC interest subvention circulars.
              </p>
              <a
                href="https://agricoop.nic.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>Visit https://agricoop.nic.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Scheme Detail Modal */}
      {selectedSchemeForModal && (
        <SchemeDetailModal
          scheme={selectedSchemeForModal}
          onClose={() => setSelectedSchemeForModal(null)}
          onInitiateApplication={(scheme) => {
            setSelectedSchemeForModal(null);
            setSchemeForNewApp(scheme);
            setShowRecordModal(true);
          }}
        />
      )}

      {/* Record New Application Modal */}
      {showRecordModal && (
        <RecordApplicationModal
          scheme={schemeForNewApp}
          onClose={() => setShowRecordModal(false)}
        />
      )}

      {/* Edit Existing Application Modal for Staff */}
      {selectedAppForEdit && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Update Application Progress: {selectedAppForEdit.applicationNumber}
                </h3>
                <div className="text-xs text-slate-500">
                  {selectedAppForEdit.schemeName} · {selectedAppForEdit.farmerName}
                </div>
              </div>
              <button onClick={() => setSelectedAppForEdit(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAppEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Update Status *</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as SchemeApplicationStatus)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 bg-white"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="SUBMITTED_RBK">Submitted at RBK</option>
                  <option value="UNDER_SCRUTINY">Under Scrutiny (MAO / Dept)</option>
                  <option value="VERIFIED_APPROVED">Officially Approved</option>
                  <option value="BENEFIT_DISBURSED">Benefit Disbursed (DBT / In-kind)</option>
                  <option value="REJECTED">Rejected by Department</option>
                </select>
              </div>

              {editStatus === 'BENEFIT_DISBURSED' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Disbursed Amount (₹)</label>
                  <input
                    type="number"
                    value={editDisbursed}
                    onChange={(e) => setEditDisbursed(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Official Audit & Scrutiny Remarks *
                </label>
                <textarea
                  rows={3}
                  value={editRemarks}
                  onChange={(e) => setEditRemarks(e.target.value)}
                  placeholder="Record verified observations or reasons for status change..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAppForEdit(null)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save & Update Audit Trail
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
