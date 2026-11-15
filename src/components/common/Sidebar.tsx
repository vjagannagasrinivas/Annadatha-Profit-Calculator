import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  MapPin,
  TestTube2,
  CloudSun,
  Sprout,
  Calculator,
  TrendingUp,
  DollarSign,
  ClipboardCheck,
  FileText,
  Settings,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Landmark,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { language, role, pilotMandal, pilotDistrict, reviewQueue } = useApp();

  const pendingReviewCount = reviewQueue.filter(r => r.currentStatus === 'EXPERT_REVIEW_PENDING' || r.currentStatus === 'PENDING_FIELD_VISIT').length;

  const navSections = [
    {
      title: language === 'te' ? 'ప్రాథమిక సమాచారం' : 'CORE INTELLIGENCE',
      items: [
        {
          to: '/',
          icon: LayoutDashboard,
          labelEn: 'Institution Overview',
          labelTe: 'సంస్థాగత సమాచారం',
          badge: null
        },
        {
          to: '/farmers',
          icon: Users,
          labelEn: 'Farmer Registry',
          labelTe: 'రైతుల జాబితా',
          badge: null
        },
        {
          to: '/farms',
          icon: MapPin,
          labelEn: 'Farm Parcels & Land',
          labelTe: 'పొలాలు & కమతాలు',
          badge: null
        },
        {
          to: '/soil',
          icon: TestTube2,
          labelEn: 'Soil Intelligence (SHC)',
          labelTe: 'నేల ఆరోగ్యం (సాయిల్ కార్డ్)',
          badge: null
        },
        {
          to: '/weather',
          icon: CloudSun,
          labelEn: 'Weather & Agro-Met',
          labelTe: 'వాతావరణ నివేదిక',
          badge: null
        }
      ]
    },
    {
      title: language === 'te' ? 'ప్రణాళిక & విశ్లేషణ' : 'PLANNING & OPTIMIZATION',
      items: [
        {
          to: '/crops',
          icon: Sprout,
          labelEn: 'Crop Intelligence',
          labelTe: 'పంటల ఎంపిక & పోలిక',
          badge: null
        },
        {
          to: '/research',
          icon: BookOpen,
          labelEn: 'Research Evidence Library',
          labelTe: 'పరిశోధనా ఆధారాలు',
          badge: 'ICAR'
        },
        {
          to: '/resources',
          icon: Calculator,
          labelEn: 'Resource Planner',
          labelTe: 'సాగు ఖర్చులు & వనరులు',
          badge: null
        },
        {
          to: '/market',
          icon: TrendingUp,
          labelEn: 'Market / Mandi Prices',
          labelTe: 'మార్కెట్ ధరలు (మండి)',
          badge: null
        },
        {
          to: '/profit',
          icon: DollarSign,
          labelEn: 'Profit Optimization',
          labelTe: 'నికర లాభాల విశ్లేషణ',
          badge: null
        }
      ]
    },
    {
      title: language === 'te' ? 'ఆమోదం & నివేదికలు' : 'GOVERNANCE & OUTPUTS',
      items: [
        {
          to: '/review',
          icon: ClipboardCheck,
          labelEn: 'Expert Review & Sign-off',
          labelTe: 'శాస్త్రవేత్తల ఆమోదం',
          badge: pendingReviewCount > 0 ? `${pendingReviewCount}` : null
        },
        {
          to: '/schemes',
          icon: Landmark,
          labelEn: 'Government Schemes & Benefits',
          labelTe: 'ప్రభుత్వ పథకాలు & ప్రయోజనాలు',
          badge: 'New'
        },
        {
          to: '/reports',
          icon: FileText,
          labelEn: 'Reports & Data Sources',
          labelTe: 'నివేదికలు & ఆధారాలు',
          badge: null
        },
        {
          to: '/settings',
          icon: Settings,
          labelEn: 'Settings & Pilot Admin',
          labelTe: 'పైలట్ సెట్టింగ్‌లు',
          badge: null
        },
        {
          to: '/farmer-view',
          icon: Smartphone,
          labelEn: 'Farmer Easy View (Mobile)',
          labelTe: 'రైతు సులభ వీక్షణ (మొబైల్)',
          badge: 'Demo'
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-xs"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar aside */}
      <aside
        className={`fixed md:sticky top-20 left-0 z-40 h-[calc(100vh-5rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        <div className="py-4 px-3 space-y-6">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {sec.title}
              </div>
              <div className="space-y-0.5 mt-1.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => {
                        if (window.innerWidth < 768) onClose();
                      }}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/70'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                        <span className="truncate">
                          {language === 'te' ? item.labelTe : item.labelEn}
                        </span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Location & Pilot Status Card */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 m-2 rounded-lg text-xs">
          <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{pilotMandal} Mandal, {pilotDistrict}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
            Krishna Eastern Delta Command · Vertisol & Clay Loam soils
          </p>
          <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span>Pilot Active</span>
            <span className="font-semibold text-emerald-700">11 Villages</span>
          </div>
        </div>
      </aside>
    </>
  );
};
