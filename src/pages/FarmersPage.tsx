import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FarmerProfile } from '../types';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Users,
  Search,
  Plus,
  Filter,
  Phone,
  CreditCard,
  MapPin,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Smartphone,
  Landmark
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FarmersPage: React.FC = () => {
  const { language, farmers, addFarmer, parcels, setActiveFarmerId, setRole } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [villageFilter, setVillageFilter] = useState('ALL');
  const [landFilter, setLandFilter] = useState('ALL');
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerProfile | null>(farmers[0] || null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Farmer Form State
  const [formData, setFormData] = useState({
    fullName: '',
    fullNameTelugu: '',
    fatherOrHusbandName: '',
    phoneNumber: '',
    maskedAadhaar: 'XXXX-XXXX-',
    village: 'Dokiparru',
    mandal: 'Gudlavalleru',
    district: 'Krishna',
    landholdingCategory: 'SMALL' as FarmerProfile['landholdingCategory'],
    totalAcreage: 3.0,
    primaryCrop: 'Paddy (BPT 5204)',
    landOwnershipType: 'OWNER' as NonNullable<FarmerProfile['landOwnershipType']>,
    socialCategory: 'OBC' as NonNullable<FarmerProfile['socialCategory']>,
    notes: ''
  });

  const filteredFarmers = farmers.filter(f => {
    const matchesSearch =
      f.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.fullNameTelugu.includes(searchQuery) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.phoneNumber.includes(searchQuery);

    const matchesVillage = villageFilter === 'ALL' || f.village === villageFilter;
    const matchesLand = landFilter === 'ALL' || f.landholdingCategory === landFilter;

    return matchesSearch && matchesVillage && matchesLand;
  });

  const handleCreateFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName) return;

    const newFarmerId = `AP-KRI-GUD-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const newFarmer: FarmerProfile = {
      id: newFarmerId,
      fullName: formData.fullName,
      fullNameTelugu: formData.fullNameTelugu || formData.fullName,
      fatherOrHusbandName: formData.fatherOrHusbandName || 'N/A',
      phoneNumber: formData.phoneNumber || '98480 00000',
      maskedAadhaar: formData.maskedAadhaar.length === 14 ? formData.maskedAadhaar : 'XXXX-XXXX-4512',
      rythuBharosaId: `RBK-GUD-${String(Math.floor(100 + Math.random() * 900))}`,
      gender: 'MALE',
      village: formData.village,
      mandal: formData.mandal,
      district: formData.district,
      landholdingCategory: formData.landholdingCategory,
      totalAcreage: Number(formData.totalAcreage),
      primaryCrop: formData.primaryCrop,
      verificationStatus: 'PENDING_FIELD_VISIT',
      bankLinked: true,
      pmKisanEligible: true,
      landOwnershipType: formData.landOwnershipType,
      socialCategory: formData.socialCategory,
      previousBenefits: [],
      registrationDate: new Date().toISOString().split('T')[0],
      notes: formData.notes,
      parcelsCount: 1
    };

    addFarmer(newFarmer);
    setShowAddModal(false);
    setSelectedFarmer(newFarmer);
  };

  const handleSelectFarmerToSimulate = (f: FarmerProfile) => {
    setActiveFarmerId(f.id);
    setRole('FARMER');
  };

  const farmerParcels = parcels.filter(p => p.farmerId === selectedFarmer?.id);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'రైతుల వివరాలు & రిజిస్ట్రీ' : 'Farmer Registry & Detailed Profiles'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'గుడ్లవల్లేరు మండలంలో నమోదైన రైతుల జాబితా, ఆధార్ అనుసంధానం, మరియు సాగు కమతాల వివరాలు'
              : 'Institutional farmer records, landholding classification, and Rythu Bharosa Kendra linkages.'}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'te' ? 'కొత్త రైతు నమోదు' : 'Register New Farmer'}</span>
        </button>
      </div>

      <DataDisclaimerBanner sourceNote="Illustrative Pilot Registry · Gudlavalleru Hub" compact />

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={language === 'te' ? 'రైతు పేరు, ఐడీ లేదా ఫోన్ నంబర్ వెతకండి...' : 'Search by name, Farmer ID, or phone...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              aria-label="Filter by Village"
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="ALL">{language === 'te' ? 'అన్ని గ్రామాలు' : 'All Villages'}</option>
              <option value="Dokiparru">Dokiparru</option>
              <option value="Angaluru">Angaluru</option>
              <option value="Gudlavalleru">Gudlavalleru</option>
              <option value="Chandrala">Chandrala</option>
              <option value="Vinnakota">Vinnakota</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
            <span className="text-slate-400">Scale:</span>
            <select
              aria-label="Filter by Scale"
              value={landFilter}
              onChange={(e) => setLandFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              <option value="MARGINAL">Marginal (&lt; 2.5 ac)</option>
              <option value="SMALL">Small (2.5 - 5 ac)</option>
              <option value="MEDIUM">Medium (&gt; 5 ac)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content: Farmers Master-Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-semibold text-slate-700">
              {filteredFarmers.length} {language === 'te' ? 'రైతులు జాబితాలో ఉన్నారు' : 'Farmers Found'}
            </span>
            <span className="text-[11px] text-slate-500">
              Pilot Cluster: Gudlavalleru (Krishna)
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[620px] overflow-y-auto">
            {filteredFarmers.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No farmers found matching the search criteria.
              </div>
            ) : (
              filteredFarmers.map((farmer) => {
                const isSelected = selectedFarmer?.id === farmer.id;
                return (
                  <div
                    key={farmer.id}
                    onClick={() => setSelectedFarmer(farmer)}
                    className={`p-4 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-50/70 border-l-3 border-emerald-600'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {farmer.fullName}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            ({farmer.fullNameTelugu})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                          <span className="font-mono text-slate-700">{farmer.id}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {farmer.village}
                          </span>
                          <span>·</span>
                          <span className="tabular-nums font-semibold text-emerald-800">
                            {farmer.totalAcreage} Acres
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <StatusBadge status={farmer.verificationStatus} />
                        <span className="text-[10px] text-slate-400">{farmer.primaryCrop}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detail Pane (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          {selectedFarmer ? (
            <>
              {/* Header */}
              <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-mono text-emerald-700 font-semibold">
                    {selectedFarmer.id}
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedFarmer.fullName}
                  </h2>
                  <div className="text-xs text-slate-600">{selectedFarmer.fullNameTelugu}</div>
                </div>

                <StatusBadge status={selectedFarmer.verificationStatus} />
              </div>

              {/* Action: Switch to this farmer in Demo */}
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                <div className="text-xs text-emerald-900">
                  <div className="font-semibold">Simulate as this Farmer</div>
                  <div className="text-[11px] text-emerald-700">Preview personalized Rythu portal</div>
                </div>
                <Link
                  to="/farmer-view"
                  onClick={() => handleSelectFarmerToSimulate(selectedFarmer)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-700 text-white hover:bg-emerald-800 rounded text-xs font-semibold transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Open Portal</span>
                </Link>
              </div>

              {/* Key Attributes Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 text-[11px]">Father / Husband:</span>
                  <div className="font-semibold text-slate-900 mt-0.5">{selectedFarmer.fatherOrHusbandName}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 text-[11px]">Contact Mobile:</span>
                  <div className="font-semibold text-slate-900 mt-0.5 font-mono">{selectedFarmer.phoneNumber}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 text-[11px]">Aadhaar (Masked):</span>
                  <div className="font-semibold text-slate-900 mt-0.5 font-mono">{selectedFarmer.maskedAadhaar}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 text-[11px]">Rythu Bharosa ID:</span>
                  <div className="font-semibold text-slate-900 mt-0.5 font-mono">{selectedFarmer.rythuBharosaId}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 text-[11px]">Total Landholding:</span>
                  <div className="font-semibold text-slate-900 mt-0.5 tabular-nums">
                    {selectedFarmer.totalAcreage} Acres ({selectedFarmer.landholdingCategory})
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 text-[11px]">Primary Kharif Crop:</span>
                  <div className="font-semibold text-slate-900 mt-0.5">{selectedFarmer.primaryCrop}</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 text-[11px]">Tenancy / Ownership:</span>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    {selectedFarmer.landOwnershipType === 'TENANT_CCRC'
                      ? 'Tenant (CCRC Card)'
                      : selectedFarmer.landOwnershipType === 'OWNER_CUM_TENANT'
                      ? 'Owner-cum-Tenant'
                      : 'Owner Cultivator (Patta)'}
                  </div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 text-[11px]">Category (Voluntary):</span>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    {selectedFarmer.socialCategory || 'GENERAL'}
                  </div>
                </div>

                {/* Government Schemes & Benefits Quick Action */}
                <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg col-span-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {language === 'te' ? 'ప్రభుత్వ పథకాలు & ప్రయోజనాలు' : 'Government Schemes & Benefits'}
                      </div>
                      <div className="text-[10px] text-emerald-800">
                        {language === 'te' ? 'ఈ రైతుకు వర్తించే పథకాలను చూడండి' : 'Screen matching AP & Central schemes'}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/schemes"
                    onClick={() => setActiveFarmerId(selectedFarmer.id)}
                    className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md shadow-2xs transition-colors shrink-0"
                  >
                    {language === 'te' ? 'అర్హత చూడండి' : 'Screen Schemes'} &rarr;
                  </Link>
                </div>
              </div>

              {/* Linked Farm Parcels */}
              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-900 mb-2">
                  <span>Registered Land Parcels ({farmerParcels.length})</span>
                  <Link to="/farms" className="text-emerald-700 hover:text-emerald-800 text-[11px] font-medium">
                    View in map &rarr;
                  </Link>
                </div>
                {farmerParcels.length === 0 ? (
                  <p className="text-xs text-slate-500">No parcels mapped yet.</p>
                ) : (
                  <div className="space-y-2">
                    {farmerParcels.map(p => (
                      <div key={p.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800">
                            Survey #{p.surveyNumber} ({p.village})
                          </span>
                          <span className="font-bold text-emerald-800 tabular-nums">
                            {p.acreage} Acres
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                          <span>Soil: {p.soilType.replace('_', ' ')}</span>
                          <span>Water: {p.irrigationType.replace('_', ' ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Extension Notes */}
              {selectedFarmer.notes && (
                <div className="border-t border-slate-100 pt-3">
                  <span className="text-xs font-semibold text-slate-900">VAA Field Observations:</span>
                  <p className="text-xs text-slate-600 mt-1 bg-slate-50 p-2.5 rounded border border-slate-100 leading-relaxed">
                    {selectedFarmer.notes}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Select a farmer to view detailed profile and parcel history.
            </div>
          )}
        </div>
      </div>

      {/* Add Farmer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">
                {language === 'te' ? 'కొత్త రైతు నమోదు (డెమో)' : 'Register New Farmer (Pilot Demo)'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFarmer} className="space-y-3 mt-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Full Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Katragadda Prasad"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">పూర్తి పేరు (తెలుగు)</label>
                  <input
                    type="text"
                    placeholder="ఉదా: కట్రగడ్డ ప్రసాద్"
                    value={formData.fullNameTelugu}
                    onChange={(e) => setFormData({ ...formData, fullNameTelugu: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Father / Husband Name</label>
                  <input
                    type="text"
                    value={formData.fatherOrHusbandName}
                    onChange={(e) => setFormData({ ...formData, fatherOrHusbandName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="98480 12345"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Village (Gudlavalleru Cluster)</label>
                  <select
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Dokiparru">Dokiparru</option>
                    <option value="Angaluru">Angaluru</option>
                    <option value="Gudlavalleru">Gudlavalleru</option>
                    <option value="Chandrala">Chandrala</option>
                    <option value="Vinnakota">Vinnakota</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Total Acreage (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={formData.totalAcreage}
                    onChange={(e) => setFormData({ ...formData, totalAcreage: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Primary Planned Crop</label>
                <select
                  value={formData.primaryCrop}
                  onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="Paddy (BPT 5204)">Paddy (BPT 5204 Samba Mahsuri)</option>
                  <option value="Paddy (MTU 1061)">Paddy (MTU 1061 Indra)</option>
                  <option value="Black Gram (LBG 752)">Black Gram (Urad LBG 752)</option>
                  <option value="Maize (DHM 117)">Hybrid Maize (DHM 117)</option>
                  <option value="Sugarcane (Co 86032)">Sugarcane (Co 86032)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Land Ownership / Tenancy</label>
                  <select
                    value={formData.landOwnershipType}
                    onChange={(e) => setFormData({ ...formData, landOwnershipType: e.target.value as any })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white text-xs"
                  >
                    <option value="OWNER">Owner Cultivator (Patta)</option>
                    <option value="TENANT_CCRC">Tenant Cultivator (CCRC Card)</option>
                    <option value="OWNER_CUM_TENANT">Owner-cum-Tenant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Category (Voluntary)</label>
                  <select
                    value={formData.socialCategory}
                    onChange={(e) => setFormData({ ...formData, socialCategory: e.target.value as any })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white text-xs"
                  >
                    <option value="GENERAL">General</option>
                    <option value="OBC">OBC (BC-A / BC-B / BC-D)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="WOMEN_HEADED">Women-Headed Household</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Field Observations</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Interested in Direct Seeded Rice (DSR) trial."
                  className="w-full px-3 py-1.5 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 text-white font-semibold rounded hover:bg-emerald-800 cursor-pointer"
                >
                  Save Farmer Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
