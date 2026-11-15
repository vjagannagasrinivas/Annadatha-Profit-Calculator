import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sprout, Smartphone, FileSpreadsheet, Menu, X } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { language, role } = useApp();
  const location = useLocation();

  const isFarmerMode = role === 'FARMER' || location.pathname === '/farmer-view';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-8 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
            aria-label="Toggle navigation"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Sprout className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                Annadatha <span className="text-emerald-600 font-medium text-sm">| అన్నదాత</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Zone 2: Nav Links (Clean, concise single-line text links) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            to="/"
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 ${
              location.pathname === '/' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            {language === 'te' ? 'విహంగ వీక్షణం' : 'Dashboard'}
          </Link>
          <Link
            to="/crops"
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 ${
              location.pathname === '/crops' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            {language === 'te' ? 'పంటల ఎంపిక' : 'Crop Intelligence'}
          </Link>
          <Link
            to="/resources"
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 ${
              location.pathname === '/resources' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            {language === 'te' ? 'వనరుల ప్రణాళిక' : 'Resource Planner'}
          </Link>
          <Link
            to="/market"
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 ${
              location.pathname === '/market' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            {language === 'te' ? 'మార్కెట్ ధరలు' : 'Mandi Prices'}
          </Link>
          <Link
            to="/profit"
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 ${
              location.pathname === '/profit' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            {language === 'te' ? 'లాభాల విశ్లేషణ' : 'Profit Optimization'}
          </Link>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to={isFarmerMode ? "/" : "/farmer-view"}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            {isFarmerMode ? (
              <>
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>{language === 'te' ? 'సంస్థాగత పోర్టల్' : 'Institutional Portal'}</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>{language === 'te' ? 'రైతు సులభ వీక్షణ' : 'Farmer Mobile View'}</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
