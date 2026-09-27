import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================
// ATELIER LOGIN
// ============================================
// Frontend-only access gate (not true authentication).
// Replace these placeholder values with your actual credentials.

const ATELIER_USERNAME = 'YOUR_ATELIER_USERNAME';
const ATELIER_PASSWORD = 'YOUR_ATELIER_PASSWORD';

const ATELIER_SESSION_KEY = 'diev_atelier_session';

const AtelierLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === ATELIER_USERNAME && password === ATELIER_PASSWORD) {
      // Store session in localStorage
      localStorage.setItem(ATELIER_SESSION_KEY, 'active');
      navigate('/atelier');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8F5] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-['Playfair_Display'] text-3xl text-[#4E342E] mb-2">
            ATELIER
          </h1>
          <p className="text-sm text-[#4E342E]/50">
            Team access only.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#4E342E]/60 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E6B89C]/30 text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#4E342E]/60 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E6B89C]/30 text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#4E342E] text-white py-3 text-sm uppercase tracking-[0.1em] font-medium hover:bg-[#C97B63] transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-[10px] text-[#4E342E]/30 mt-8">
          This is a frontend access gate. Not enterprise-grade authentication.
        </p>
      </div>
    </main>
  );
};

export default AtelierLogin;
export { ATELIER_SESSION_KEY };
