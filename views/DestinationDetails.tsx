
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FEATURED_DESTINATIONS } from '../constants';
import { getDestinationWeather } from '../services/geminiService';
import { useCurrency } from '../context/CurrencyContext';

interface WeatherDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const destination = FEATURED_DESTINATIONS.find(d => d.id === id);
  const [weather, setWeather] = useState<WeatherDay[] | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (destination) {
      const fetchWeather = async () => {
        setWeatherLoading(true);
        const data = await getDestinationWeather(`${destination.name}, ${destination.country}`);
        setWeather(data);
        setWeatherLoading(false);
      };
      fetchWeather();
    }
  }, [destination]);

  const handleBooking = () => {
    setBookingStatus('processing');
    setTimeout(() => {
      setBookingStatus('success');
      setTimeout(() => setBookingStatus('idle'), 3000);
    }, 1500);
  };

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold mb-4">Destination not found</h2>
        <Link to="/" className="text-indigo-600 font-bold hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500">
      {/* Success Toast */}
      {bookingStatus === 'success' && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <i className="fa-solid fa-circle-check text-xl"></i>
          <span className="font-bold">Booking Request Sent Successfully!</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        <img 
          src={destination.image.replace('800/600', '1920/1080')} 
          alt={destination.name}
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/90"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-20">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group">
              <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
              <span className="font-bold text-xs tracking-widest uppercase">Explore More</span>
            </Link>
            
            <span className="block text-indigo-400 font-black tracking-[0.3em] uppercase mb-2 animate-in slide-in-from-bottom-4 duration-700">
              {destination.country}
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-4 animate-in slide-in-from-bottom-8 duration-700">
              {destination.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 animate-in slide-in-from-bottom-12 duration-700">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="text-white font-bold">{destination.rating}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <i className="fa-solid fa-tag text-indigo-400"></i>
                <span className="text-white font-bold">{destination.category}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          
          {/* Content Left */}
          <div className="lg:col-span-2 space-y-12 md:space-y-16">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Experience {destination.name}</h2>
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
                {destination.description} Immerse yourself in the local atmosphere, where every corner tells a story of heritage and natural wonder. Whether you're seeking serenity or a burst of energy, {destination.name} provides an unparalleled escape from the mundane.
              </p>
            </div>

            {/* Weather Section */}
            <div className="bg-slate-50 rounded-[2.5rem] p-6 md:p-10 border border-slate-100 overflow-hidden relative shadow-inner">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Weekly Outlook</h2>
                  <p className="text-sm text-slate-500">Intelligent climate forecasting for your trip</p>
                </div>
                <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit">
                  <i className="fa-solid fa-wand-magic-sparkles"></i> Gemini AI Prediction
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
                {weatherLoading ? (
                  Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="min-w-[120px] bg-white rounded-3xl p-6 border border-slate-100 animate-pulse">
                      <div className="h-3 bg-slate-100 rounded w-10 mb-4 mx-auto"></div>
                      <div className="h-10 w-10 bg-slate-100 rounded-full mb-4 mx-auto"></div>
                      <div className="h-4 bg-slate-100 rounded w-14 mx-auto"></div>
                    </div>
                  ))
                ) : weather ? (
                  weather.map((w, i) => (
                    <div key={i} className="snap-center min-w-[130px] flex-grow bg-white rounded-[2rem] p-6 border border-slate-100 hover:border-indigo-400 transition-all hover:shadow-xl hover:shadow-indigo-500/10 text-center group cursor-default">
                      <span className="text-[10px] font-black text-slate-400 uppercase mb-4 block tracking-widest">{w.day}</span>
                      <div className="text-3xl text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i className={`fa-solid ${w.icon}`}></i>
                      </div>
                      <div className="flex flex-col gap-1 mb-4">
                        <span className="text-xl font-black text-slate-900 leading-none">{w.high}°</span>
                        <span className="text-xs font-bold text-slate-400">{w.low}°</span>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-indigo-500 bg-indigo-50 py-1 rounded-full px-2 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {w.condition}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
                    Weather engine is warming up...
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">Curated Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-all group shadow-sm hover:shadow-md">
                    <div className="w-14 h-14 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <i className={`fa-solid ${['fa-map-location-dot', 'fa-camera-retro', 'fa-utensils', 'fa-person-hiking'][idx % 4]}`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{highlight}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Discover why this location remains a top-tier choice for global explorers.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="w-full md:w-2/5 relative z-10">
                <img src={`https://picsum.photos/seed/${id}-guide/600/600`} className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border-2 border-white/10" alt="Guide" />
              </div>
              <div className="flex-grow relative z-10">
                <span className="text-indigo-400 font-bold text-[10px] uppercase tracking-[0.4em] block mb-3">Insider Access</span>
                <h3 className="text-3xl font-black mb-6 leading-tight">Expert Travel Concierge</h3>
                <p className="text-slate-400 text-lg italic mb-8 border-l-2 border-indigo-500 pl-6 py-2">
                  "The secret to {destination.name} isn't found in a guidebook. It's in the hidden alleyways and the quiet moments between the landmarks. Let us show you."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/20">TL</div>
                  <div>
                    <span className="font-bold block text-white">Thomas L.</span>
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-black">Destination Specialist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card Right */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden group/card">
              <div className="bg-slate-900 p-10 text-white relative">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-4xl group-hover/card:scale-110 transition-transform">
                  <i className="fa-solid fa-plane-departure"></i>
                </div>
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Private Package</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{formatPrice(destination.price)}</span>
                  <span className="text-slate-500 font-medium">/ person</span>
                </div>
              </div>
              <div className="p-10 space-y-8">
                <div className="space-y-4">
                  {[
                    { label: 'Stay Duration', value: '7 Days / 6 Nights', icon: 'fa-moon' },
                    { label: 'Package Type', value: 'All-Inclusive Luxury', icon: 'fa-gem' },
                    { label: 'Booking Status', value: 'Limited Spots', icon: 'fa-bolt', valClass: 'text-orange-500' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-3 text-slate-500">
                        <i className={`fa-solid ${item.icon} text-xs`}></i>
                        <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className={`font-black text-slate-900 ${item.valClass || ''}`}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleBooking}
                  disabled={bookingStatus !== 'idle'}
                  className={`w-full font-black py-6 rounded-[2rem] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                    bookingStatus === 'idle' 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {bookingStatus === 'processing' ? (
                    <i className="fa-solid fa-circle-notch animate-spin text-xl"></i>
                  ) : (
                    <>
                      Reserve Your Spot
                      <i className="fa-solid fa-arrow-right-long group-hover/card:translate-x-1 transition-transform"></i>
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <i className="fa-solid fa-lock text-[10px]"></i>
                  <span className="text-[10px] uppercase font-black tracking-[0.2em]">Secure Reservation</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.08); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 20s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default DestinationDetails;
