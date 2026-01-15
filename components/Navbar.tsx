
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencyCode } from '../types';

interface Props {
  username: string;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ username, isAdmin, onLogout }) => {
  const { currency, setCurrencyByCode } = useCurrency();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const currencyOptions: { code: CurrencyCode; label: string }[] = [
    { code: 'USD', label: 'USD ($)' },
    { code: 'INR', label: 'INR (₹)' },
    { code: 'EUR', label: 'EUR (€)' },
    { code: 'GBP', label: 'GBP (£)' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
          <img 
            src="https://api.a0.dev/assets/image?text=traveler%20land%20logo%20globe%20airplane%20compass&aspect=1:1" 
            alt="TravelerLand.com Logo" 
            className="w-10 h-10 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
          />
          <span className="text-xl font-bold tracking-tight text-slate-800">TravelerLand.com</span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Destinations</Link>
          <a href="#" className="hover:text-indigo-600 transition-colors">Packages</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Special Deals</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button 
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-2 bg-white/50 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:bg-white transition-all shadow-sm"
            >
              <i className="fa-solid fa-coins text-indigo-500"></i>
              {currency.code}
              <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}></i>
            </button>

            {showCurrencyDropdown && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 min-w-[120px] animate-in slide-in-from-top-2 duration-200">
                {currencyOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setCurrencyByCode(opt.code);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                      currency.code === opt.code 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 bg-white/50 border border-slate-200 pl-2 pr-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all group">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
              className={`w-8 h-8 rounded-full border-2 ${isAdmin ? 'border-red-500' : 'border-indigo-500'} bg-slate-100`} 
              alt="Avatar"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                {username}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-tight uppercase tracking-tighter">
                {isAdmin ? 'Admin' : 'Explorer'}
              </span>
            </div>
            <button 
              onClick={onLogout}
              className="ml-2 text-slate-400 hover:text-red-500 transition-colors p-1"
              title="Logout"
            >
              <i className="fa-solid fa-right-from-bracket text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
