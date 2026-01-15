
import React, { useState } from 'react';

interface Props {
  onLogin: (username: string) => void;
}

const AuthGate: React.FC<Props> = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [error, setError] = useState('');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.length < 3 || password.length < 5) {
      setError('Username (>2) and Password (>4) required.');
      return;
    }

    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@') || emailPassword.length < 5) {
      setError('Please enter a valid email and email password.');
      return;
    }

    if (username === 'admin') {
      if (password === 'iknoor132') {
        onLogin('admin');
      } else {
        setError('Incorrect admin password.');
        setStep(1);
      }
      return;
    }

    onLogin(username);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"></div>
      </div>

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/10 rounded-3xl mb-4 border border-white/10 shadow-inner">
            <img 
              src="https://api.a0.dev/assets/image?text=traveler%20land%20logo%20globe%20airplane%20compass&aspect=1:1" 
              alt="TravelerLand.com Logo" 
              className="w-20 h-20 object-contain drop-shadow-lg"
            />
          </div>
          <h2 className="text-3xl font-black text-white">TravelerLand.com</h2>
          <p className="text-indigo-100/60 mt-2">
            {step === 1 
              ? (isLogin ? 'Welcome back, explorer!' : 'Join the world of adventure.')
              : 'Verify your email account'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNextStep} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2 ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="e.g. rohit"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm font-medium bg-red-400/10 py-2 px-4 rounded-xl border border-red-400/20 animate-pulse">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
            >
              Next Step
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="e.g. rohit@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2 ml-1">Email Password</label>
              <input 
                type="password" 
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Email credentials..."
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm font-medium bg-red-400/10 py-2 px-4 rounded-xl border border-red-400/20 animate-pulse">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all"
              >
                Back
              </button>
              <button 
                type="submit"
                className="flex-[2] bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98]"
              >
                {isLogin ? 'Complete Login' : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setStep(1);
              setError('');
            }}
            className="text-indigo-200/60 hover:text-white text-sm font-medium transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already a member? Log in"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/30 tracking-widest uppercase font-bold">
            Authorized Personnel Only for Admin Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthGate;
