import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExpertReviewItem } from '../types';
import { DataDisclaimerBanner } from '../components/common/DataDisclaimerBanner';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  FileCheck,
  Edit3,
  X,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Filter
} from 'lucide-react';

export const ExpertReviewPage: React.FC = () => {
  const { language, reviewQueue, updateReviewItem, role } = useApp();
  const [selectedItem, setSelectedItem] = useState<ExpertReviewItem | null>(reviewQueue[0] || null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Modal State
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<'APPROVE' | 'REVISE' | 'VERIFY'>('APPROVE');
  const [specialistNotes, setSpecialistNotes] = useState('');

  const filteredQueue = reviewQueue.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.currentStatus === filterStatus;
  });

  const handleOpenModal = (action: 'APPROVE' | 'REVISE' | 'VERIFY') => {
    setReviewAction(action);
    setSpecialistNotes(
      action === 'APPROVE'
        ? 'Soil parameters reviewed. Recommended 20 kg Zinc Sulphate basal dose and reduced MOP application. Approved for Kharif season.'
        : action === 'REVISE'
        ? 'Please reduce chemical nitrogen by 25 kg/acre and incorporate 4 tonnes FYM as organic basal dressing.'
        : 'Field inspection completed by VAA. Soil sample collected and submitted to KVK Ghantasala lab.'
    );
    setShowApprovalModal(true);
  };

  const handleConfirmAction = () => {
    if (!selectedItem) return;

    if (reviewAction === 'APPROVE') {
      updateReviewItem(selectedItem.id, {
        currentStatus: 'VERIFIED',
        agronomistRecommendations: specialistNotes
      });
      setSelectedItem({ ...selectedItem, currentStatus: 'VERIFIED', agronomistRecommendations: specialistNotes });
    } else if (reviewAction === 'REVISE') {
      updateReviewItem(selectedItem.id, {
        currentStatus: 'REVISION_REQUESTED',
        agronomistRecommendations: specialistNotes
      });
      setSelectedItem({ ...selectedItem, currentStatus: 'REVISION_REQUESTED', agronomistRecommendations: specialistNotes });
    } else if (reviewAction === 'VERIFY') {
      updateReviewItem(selectedItem.id, {
        currentStatus: 'EXPERT_REVIEW_PENDING',
        fieldOfficerNotes: specialistNotes
      });
      setSelectedItem({ ...selectedItem, currentStatus: 'EXPERT_REVIEW_PENDING', fieldOfficerNotes: specialistNotes });
    }

    setShowApprovalModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'te' ? 'వ్యవసాయ శాస్త్రవేత్తల పరిశీలన & ఆమోదం' : 'Expert Review & Agronomic Sign-Off Workflow'}
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {language === 'te'
              ? 'గ్రామ వ్యవసాయ సహాయకులు (VAA) మరియు KVK శాస్త్రవేత్తల సమగ్ర పర్యవేక్షణ వేదిక'
              : 'Multi-stage governance: Village Agriculture Assistant field verification and Senior Agronomist chemical dosage approvals.'}
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              aria-label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Review Statuses</option>
              <option value="EXPERT_REVIEW_PENDING">Pending Agronomist Sign-off</option>
              <option value="PENDING_FIELD_VISIT">Pending VAA Field Visit</option>
              <option value="VERIFIED">Verified & Approved</option>
              <option value="REVISION_REQUESTED">Revision Requested</option>
            </select>
          </div>
        </div>
      </div>

      <DataDisclaimerBanner sourceNote="Simulated Multi-Role Approval Workflow · KVK Advisory Standards" compact />

      {/* Main Review Workplace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Review Queue (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              Advisory Review Queue ({filteredQueue.length} Active Items)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Gudlavalleru Cluster
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[620px] overflow-y-auto">
            {filteredQueue.map(item => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-emerald-50/70 border-l-3 border-emerald-600' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{item.farmerName}</span>
                        <span className="text-[11px] font-mono text-slate-500">{item.village}</span>
                      </div>
                      <div className="text-xs text-slate-700 font-medium mt-0.5">
                        {item.cropName}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {item.requestedNutrientPlan}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <StatusBadge status={item.currentStatus} />
                      <span className="text-[10px] text-slate-400 font-mono">{item.submittedDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Item Dossier & Action Deck (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          {selectedItem ? (
            <>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="text-[11px] font-mono text-emerald-800 font-bold">
                    {selectedItem.id} · Plan: {selectedItem.planId}
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedItem.farmerName}
                  </h2>
                  <div className="text-xs text-slate-500">
                    Village: {selectedItem.village} · Acreage: {selectedItem.acreage} Acres
                  </div>
                </div>

                <StatusBadge status={selectedItem.currentStatus} />
              </div>

              {/* Farmer Submission Overview */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1.5">
                <div className="font-semibold text-slate-800">Submitted Farmer Crop & Nutrient Plan:</div>
                <p className="text-slate-600 leading-relaxed">
                  {selectedItem.requestedNutrientPlan}
                </p>
              </div>

              {/* Field Officer Observations */}
              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-blue-950">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>Village Agriculture Assistant (VAA) Field Notes:</span>
                </div>
                <p className="text-blue-900/90 leading-relaxed">
                  {selectedItem.fieldOfficerNotes || 'Field verification pending by cluster VAA.'}
                </p>
              </div>

              {/* Agronomist Decision & Sign-off Notes */}
              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Senior Agronomist Sign-Off & Official Advice:</span>
                </div>
                <p className="text-emerald-900/90 leading-relaxed">
                  {selectedItem.agronomistRecommendations || 'Awaiting specialist review on micro-nutrient dosages.'}
                </p>
              </div>

              {/* Interactive Decision Action Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-xs font-semibold text-slate-700">Record Expert Action:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleOpenModal('APPROVE')}
                    className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Advisory</span>
                  </button>

                  <button
                    onClick={() => handleOpenModal('REVISE')}
                    className="flex-1 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Request Dosage Change</span>
                  </button>

                  <button
                    onClick={() => handleOpenModal('VERIFY')}
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>VAA Field Visit</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Select an item from the review queue.
            </div>
          )}
        </div>
      </div>

      {/* Action Input Modal */}
      {showApprovalModal && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">
                {reviewAction === 'APPROVE'
                  ? 'Approve Advisory Plan & Sign Off'
                  : reviewAction === 'REVISE'
                  ? 'Request Dosage Revision from Farmer'
                  : 'Record VAA Field Inspection'}
              </h2>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <span className="font-semibold text-slate-800">{selectedItem.farmerName}</span>
                <div className="text-slate-500 mt-0.5">{selectedItem.cropName} · {selectedItem.village}</div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Official Agronomic Remarks & Mandatory Prescription *
                </label>
                <textarea
                  rows={4}
                  value={specialistNotes}
                  onChange={(e) => setSpecialistNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowApprovalModal(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAction}
                  className="px-4 py-1.5 bg-emerald-700 text-white font-semibold rounded hover:bg-emerald-800 cursor-pointer"
                >
                  Confirm & Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
