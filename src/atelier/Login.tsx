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
      localStorage.setItem(ATELIER_SESSION_KEY, 'active');
      navigate('/atelier');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-14">
          <h1 className="font-['Playfair_Display'] text-4xl text-black mb-3">
            ATELIER
          </h1>
          <p className="text-sm text-gray-500">
            Team access only.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-3">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 text-sm text-black focus:outline-none focus:border-black transition-colors"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 text-sm text-black focus:outline-none focus:border-black transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-400 mt-10">
          This is a frontend access gate. Not enterprise-grade authentication.
        </p>
      </div>
    </main>
  );
};

export default AtelierLogin;
export { ATELIER_SESSION_KEY };
