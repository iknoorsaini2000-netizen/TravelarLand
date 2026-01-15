
import React, { useState, useRef } from 'react';
import DestinationCard from '../components/DestinationCard';
import AIRecommender from '../components/AIRecommender';
import RatingSection from '../components/RatingSection';
import { FEATURED_DESTINATIONS } from '../constants';

interface Props {
  username: string;
}

const Home: React.FC<Props> = ({ username }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const packagesRef = useRef<HTMLDivElement>(null);
  const categories = ['All', 'Nature', 'City', 'Beach', 'History'];

  const filteredDestinations = activeCategory === 'All' 
    ? FEATURED_DESTINATIONS 
    : FEATURED_DESTINATIONS.filter(d => d.category === activeCategory);

  const handleStartExploring = () => {
    setActiveCategory('All');
    packagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header className="pt-40 pb-20 px-4 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8 animate-in slide-in-from-left duration-700">
              Explore the <span className="text-indigo-400">Extraordinary</span>
            </h1>
            <p className="text-slate-300 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl animate-in fade-in duration-1000">
              Welcome back, <span className="text-white font-bold">{username}</span>. Curated travel experiences for the discerning soul at <span className="text-white font-bold text-indigo-200">TravelerLand.com</span>.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleStartExploring}
                className="bg-indigo-600 text-white px-10 py-5 rounded-3xl font-bold text-lg hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/30 active:scale-95"
              >
                Start Exploring
                <i className="fa-solid fa-chevron-right text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-24">
        <section id="popular-packages" ref={packagesRef} className="mb-20 scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Popular Packages</h2>
              <p className="text-slate-500">Hand-picked destinations for your next escape.</p>
            </div>
            <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100 gap-1 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map(dest => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
          
          {filteredDestinations.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <i className="fa-solid fa-map-location-dot text-4xl text-slate-300 mb-4"></i>
              <p className="text-slate-500 font-bold">No packages found in this category.</p>
              <button 
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-indigo-600 font-black uppercase text-xs tracking-widest"
              >
                Show All Packages
              </button>
            </div>
          )}
        </section>

        <section className="my-32">
          <AIRecommender />
        </section>

        <section className="py-20 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Why TravelerLand.com?</h2>
            <p className="text-slate-500">We don't just book trips; we create memories in the world's most breathtaking corners.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'fa-globe', title: 'Curated Hidden Gems', desc: 'Our experts scout locations off the beaten path to ensure exclusivity.' },
              { icon: 'fa-shield-heart', title: 'Seamless Comfort', desc: 'From luxury transport to premium stays, we handle every detail.' },
              { icon: 'fa-camera-retro', title: 'Iconic Vistas', desc: 'Every package includes stops at the most photogenic spots on earth.' }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl mb-6 mx-auto group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <i className={`fa-solid ${feature.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <RatingSection />
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Home;
