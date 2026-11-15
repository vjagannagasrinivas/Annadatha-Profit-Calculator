import React, { useState } from 'react';
import { GovernmentScheme, FarmerProfile, FarmerSchemeApplication, SchemeApplicationStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Send, FileText, CheckSquare, Square, Building, UserCheck } from 'lucide-react';

interface Props {
  scheme?: GovernmentScheme;
  onClose: () => void;
}

export const RecordApplicationModal: React.FC<Props> = ({ scheme, onClose }) => {
  const { language, farmers, schemes, addSchemeApplication, activeFarmer, role } = useApp();

  const [selectedSchemeId, setSelectedSchemeId] = useState(scheme?.id || schemes[0]?.id || '');
  const [selectedFarmerId, setSelectedFarmerId] = useState(activeFarmer?.id || farmers[0]?.id || '');
  const [status, setStatus] = useState<SchemeApplicationStatus>('SUBMITTED_RBK');
  const [departmentRefNumber, setDepartmentRefNumber] = useState(`RBK-GUD-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [officerRemarks, setOfficerRemarks] = useState('Documents received and verified by Village Agriculture Assistant at Dokiparru RBK.');
  const [disbursedAmount, setDisbursedAmount] = useState<number>(0);

  const targetScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];
  const targetFarmer = farmers.find(f => f.id === selectedFarmerId) || farmers[0];

  // Available documents checklist
  const allDocs = targetScheme ? targetScheme.requiredDocuments.map(d => d.name) : [
    'Aadhaar Card',
    '1B Record of Rights / Patta Passbook',
    'Bank Account Passbook',
    'e-Panta (e-Crop) Digital Booking Receipt',
    'CCRC Agreement Card (For Tenant Cultivators)',
    'Soil Health Card Diagnostic Report'
  ];

  const [submittedDocs, setSubmittedDocs] = useState<string[]>([
    'Aadhaar Card',
    '1B Record of Rights / Patta Passbook',
    'Bank Account Passbook'
  ]);

  const toggleDoc = (docName: string) => {
    setSubmittedDocs(prev =>
      prev.includes(docName) ? prev.filter(d => d !== docName) : [...prev, docName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetScheme || !targetFarmer) return;

    const pendingDocs = allDocs.filter(d => !submittedDocs.includes(d));
    const today = new Date().toISOString().split('T')[0];

    const newApp: FarmerSchemeApplication = {
      id: `APP-2026-${String(Math.floor(100 + Math.random() * 900))}`,
      applicationNumber: `RBK-${targetFarmer.village.slice(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      schemeId: targetScheme.id,
      schemeName: targetScheme.officialName,
      schemeNameTelugu: targetScheme.officialNameTelugu,
      farmerId: targetFarmer.id,
      farmerName: targetFarmer.fullName,
      farmerNameTelugu: targetFarmer.fullNameTelugu,
      village: targetFarmer.village,
      mandal: targetFarmer.mandal,
      district: targetFarmer.district,
      appliedDate: today,
      currentStatus: status,
      submittedDocuments: submittedDocs,
      pendingDocuments: pendingDocs,
      departmentRefNumber: departmentRefNumber || undefined,
      disbursedAmount: status === 'BENEFIT_DISBURSED' ? Number(disbursedAmount) : 0,
      officerRemarks,
      lastUpdated: today,
      auditTrail: [
        {
          date: today,
          status,
          updatedBy: role === 'INSTITUTION_ADMIN' ? 'Dr. M. V. Subbarao (Admin)' : 'P. Anusha (VAA)',
          role: role === 'INSTITUTION_ADMIN' ? 'Institution Admin' : 'Field Officer (VAA)',
          remarks: officerRemarks
        }
      ]
    };

    addSchemeApplication(newApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">
              {language === 'te' ? 'రైతు పథకం దరఖాస్తు నమోదు' : 'Record Government Scheme Application'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto text-xs">
          {/* Scheme Selector */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Select Government Scheme *</label>
            <select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 bg-white"
            >
              {schemes.map(s => (
                <option key={s.id} value={s.id}>
                  {s.officialName} ({s.level === 'STATE_AP' ? 'AP State' : 'Central'})
                </option>
              ))}
            </select>
          </div>

          {/* Farmer Selector */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Select Beneficiary Farmer *</label>
            <select
              value={selectedFarmerId}
              onChange={(e) => setSelectedFarmerId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 bg-white"
            >
              {farmers.map(f => (
                <option key={f.id} value={f.id}>
                  {f.fullName} ({f.id}) — {f.village} ({f.totalAcreage} Ac)
                </option>
              ))}
            </select>
          </div>

          {/* Department Ref and Initial Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Department Acknowledgment / Ref #</label>
              <input
                type="text"
                value={departmentRefNumber}
                onChange={(e) => setDepartmentRefNumber(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Application Progress Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as SchemeApplicationStatus)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                <option value="DRAFT">Draft</option>
                <option value="SUBMITTED_RBK">Submitted at RBK</option>
                <option value="UNDER_SCRUTINY">Under Scrutiny (MAO / Dept)</option>
                <option value="VERIFIED_APPROVED">Officially Approved</option>
                <option value="BENEFIT_DISBURSED">Benefit Disbursed (DBT / In-kind)</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          {status === 'BENEFIT_DISBURSED' && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Disbursed Amount (₹)</label>
              <input
                type="number"
                value={disbursedAmount}
                onChange={(e) => setDisbursedAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </div>
          )}

          {/* Documents Checklist */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Verified Documents Received from Farmer:
            </label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-lg">
              {allDocs.map((doc, idx) => {
                const checked = submittedDocs.includes(doc);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleDoc(doc)}
                    className="flex items-center gap-2 p-1.5 hover:bg-white rounded cursor-pointer transition-colors"
                  >
                    {checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className={`text-xs ${checked ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                      {doc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Officer Verification Remarks */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Field Officer Verification & Scrutiny Remarks *
            </label>
            <textarea
              rows={3}
              value={officerRemarks}
              onChange={(e) => setOfficerRemarks(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Record & Log Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
