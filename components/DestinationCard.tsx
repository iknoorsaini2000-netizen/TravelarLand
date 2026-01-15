
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface Props {
  destination: Destination;
}

const DestinationCard: React.FC<Props> = ({ destination }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const { formatPrice } = useCurrency();

  // Load wishlist state from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('traveler_land_wishlist');
    if (savedWishlist) {
      const wishlistArray: string[] = JSON.parse(savedWishlist);
      setIsWishlisted(wishlistArray.includes(destination.id));
    }
  }, [destination.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    e.preventDefault();

    const savedWishlist = localStorage.getItem('traveler_land_wishlist');
    let wishlistArray: string[] = savedWishlist ? JSON.parse(savedWishlist) : [];

    if (isWishlisted) {
      wishlistArray = wishlistArray.filter(id => id !== destination.id);
    } else {
      wishlistArray.push(destination.id);
    }

    localStorage.setItem('traveler_land_wishlist', JSON.stringify(wishlistArray));
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const shareData = {
      title: `Explore ${destination.name} on TravelerLand.com`,
      text: `Check out this amazing trip to ${destination.name}, ${destination.country}! ${destination.description}`,
      url: `${window.location.origin}/#/destination/${destination.id}`,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  return (
    <Link 
      to={`/destination/${destination.id}`}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 transition-all duration-500 ease-out border border-slate-100 flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-indigo-600 shadow-sm">
          {destination.category}
        </div>

        {/* Action Buttons Container */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {/* Wishlist Button */}
          <button 
            onClick={toggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md border border-white/20 active:scale-90 ${
              isWishlisted 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white/90 text-slate-400 hover:text-red-500 hover:scale-110'
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <i className={`fa-${isWishlisted ? 'solid' : 'regular'} fa-heart ${isWishlisted ? 'animate-bounce-short' : ''}`}></i>
          </button>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md border border-white/20 active:scale-90 ${
              shareStatus === 'copied' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white/90 text-slate-400 hover:text-indigo-600'
            }`}
            title="Share this destination"
          >
            {shareStatus === 'copied' ? (
              <i className="fa-solid fa-check animate-in zoom-in duration-200"></i>
            ) : (
              <i className="fa-solid fa-share-nodes"></i>
            )}
          </button>
        </div>
        
        {/* Price Floating Badge for attention */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl text-white font-bold text-xs shadow-lg border border-white/10">
          From {formatPrice(destination.price)}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow relative bg-white">
        <div className="mb-4">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-1">
            {destination.country}
          </span>
          <h3 className="text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
            {destination.name}
          </h3>
          
          {/* Rating and Review Count Section */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <i className="fa-solid fa-star text-xs"></i>
              <span className="text-sm font-black text-slate-800">{destination.rating}</span>
            </div>
            <span className="text-slate-400 text-xs font-medium">
              ({destination.reviewCount} reviews)
            </span>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {destination.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {destination.highlights.slice(0, 2).map((h, i) => (
            <span key={i} className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-tight border border-slate-100">
              {h}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-slate-50 pt-6">
          <div>
            <span className="text-slate-400 text-[10px] block uppercase font-black tracking-[0.2em] mb-0.5">Package Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">{formatPrice(destination.price)}</span>
              <span className="text-xs text-slate-400 font-medium">/ person</span>
            </div>
          </div>
          
          <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:rotate-[-45deg] transition-all duration-500 shadow-lg shadow-slate-200 group-hover:shadow-indigo-200">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .animate-bounce-short {
          animation: bounce-short 0.3s ease-in-out;
        }
      `}</style>
    </Link>
  );
};

export default DestinationCard;
