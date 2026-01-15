
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthGate from './components/AuthGate';
import Home from './views/Home';
import DestinationDetails from './views/DestinationDetails';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogin = (user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
    if (user === 'admin') {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUsername('');
  };

  if (!isAuthenticated) {
    return <AuthGate onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar username={username} isAdmin={isAdmin} onLogout={handleLogout} />

      {isAdmin && (
        <div className="fixed bottom-6 left-6 z-[60] bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-2xl flex items-center gap-2 animate-pulse">
          <i className="fa-solid fa-user-shield"></i>
          ADMIN MODE ACTIVE
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home username={username} />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
      </Routes>

      <footer className="bg-slate-900 text-white pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://api.a0.dev/assets/image?text=traveler%20land%20logo%20globe%20airplane%20compass&aspect=1:1" 
                alt="TravelerLand.com Logo" 
                className="w-10 h-10 object-contain invert opacity-90"
              />
              <span className="text-2xl font-bold tracking-tight">TravelerLand.com</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              Redefining the art of exploration. Discover beautiful areas, immersive cultures, and unforgettable adventures with TravelerLand.com.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <i className={`fa-brands fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white">Our Destinations</a></li>
              <li><a href="#" className="hover:text-white">Travel Guides</a></li>
              <li><a href="#" className="hover:text-white">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-white">Customer Stories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© 2024 TravelerLand.com. All rights reserved.</p>
          <div className="flex gap-8 text-slate-500 text-sm">
            <span>Made with <i className="fa-solid fa-heart text-indigo-500 mx-1"></i> for explorers</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
