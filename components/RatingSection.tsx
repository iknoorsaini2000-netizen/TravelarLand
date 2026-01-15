
import React from 'react';

const testimonials = [
  { name: 'Rohit Sharma', location: 'India', comment: 'The best travel planning experience ever! The AI suggestions were spot on.', rating: 5, img: 'https://picsum.photos/seed/rohit/100/100' },
  { name: 'Sarah J.', location: 'United Kingdom', comment: 'Traveler Land made my Santorini trip unforgettable. Highly recommend!', rating: 5, img: 'https://picsum.photos/seed/sarah/100/100' },
  { name: 'Kenji Sato', location: 'Japan', comment: 'Great interface and very helpful support team. 5 stars.', rating: 5, img: 'https://picsum.photos/seed/kenji/100/100' }
];

const RatingSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-1/3">
            <h2 className="text-4xl font-black text-slate-900 mb-6">User Ratings</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
              <div className="text-center mb-8">
                <span className="text-6xl font-black text-slate-900">4.9</span>
                <div className="flex justify-center gap-1 text-yellow-400 my-2 text-xl">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-slate-500 font-medium">Average based on 2,540 reviews</p>
              </div>

              <div className="space-y-3">
                {[
                  { star: 5, percent: 92 },
                  { star: 4, percent: 6 },
                  { star: 3, percent: 1 },
                  { star: 2, percent: 0.5 },
                  { star: 1, percent: 0.5 }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-600 w-4">{row.star}</span>
                    <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 rounded-full" 
                        style={{ width: `${row.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 w-8">{row.percent}%</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all">
                Write a Review
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={t.img} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100" alt={t.name} />
                    <div>
                      <h4 className="font-bold text-slate-900 leading-none">{t.name}</h4>
                      <span className="text-xs text-slate-400 font-medium">{t.location}</span>
                    </div>
                    <div className="ml-auto flex text-yellow-400 text-xs">
                      {[...Array(t.rating)].map((_, j) => (
                        <i key={j} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>
              ))}
              <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center text-center text-white">
                <i className="fa-solid fa-earth-americas text-4xl mb-4 opacity-50"></i>
                <h4 className="text-xl font-bold mb-2">Join our community</h4>
                <p className="text-indigo-100 text-xs mb-4 leading-relaxed">Share your adventure with thousands of other travelers around the globe.</p>
                <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl text-sm font-bold">Follow @TravelerLand</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RatingSection;
