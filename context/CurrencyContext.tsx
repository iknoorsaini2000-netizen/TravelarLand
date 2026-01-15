
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, Currency } from '../types';

interface CurrencyContextType {
  currency: Currency;
  setCurrencyByCode: (code: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
}

const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  INR: { code: 'INR', symbol: '₹', rate: 83.50 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 }
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('travelerland_currency');
    return (saved as CurrencyCode) || 'USD';
  });

  const currency = CURRENCIES[currencyCode];

  const setCurrencyByCode = (code: CurrencyCode) => {
    setCurrencyCode(code);
    localStorage.setItem('travelerland_currency', code);
  };

  const formatPrice = (usdAmount: number) => {
    const converted = Math.round(usdAmount * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyByCode, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
