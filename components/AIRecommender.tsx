
import React, { useState } from 'react';
import { getTravelRecommendations } from '../services/geminiService';
import { AIRecommendation } from '../types';

const AIRecommender: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIRecommendation | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const recommendation = await getTravelRecommendations(query);
    setResult(recommendation);
    setLoading(false);
  };

  return (
    <div className="bg-indigo-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-indigo-400/20 border border-indigo-400/30 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
          <i className="fa-solid fa-sparkles"></i>
          AI TRAVEL AGENT
        </div>
        <h2 className="text-4xl font-bold mb-4">Where should you go next?</h2>
        <p className="text-indigo-100/70 mb-8">Tell our AI your vibe—whether it's "quiet mountain getaway" or "neon city nightlife"—and we'll find your perfect match.</p>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. A romantic beach town with historic architecture..."
            className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-white/40"
          />
          <button 
            disabled={loading}
            className="bg-white text-indigo-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-all disabled:opacity-50"
          >
            {loading ? 'Consulting...' : 'Discover'}
          </button>
        </form>

        {result && (
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-indigo-100 font-medium mb-4 italic text-lg">"{result.reason}"</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.suggestedDestinations.map((dest, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/5 hover:bg-white/20 transition-colors cursor-pointer group">
                  <span className="text-indigo-300 block text-xs font-bold mb-1 uppercase tracking-widest">Area {i + 1}</span>
                  <span className="font-bold group-hover:text-indigo-200">{dest}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommender;
