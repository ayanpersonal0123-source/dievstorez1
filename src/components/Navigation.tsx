import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const location = useLocation();

  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/shop?filter=new', label: 'New Arrivals' },
    { to: '/shop', label: 'Collections' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <nav className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-black hover:opacity-60 transition-opacity"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="font-['Playfair_Display'] text-2xl sm:text-3xl font-semibold text-black tracking-[0.15em]"
            >
              DIEV
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-[13px] tracking-[0.1em] uppercase transition-colors ${
                    isActive(link.to)
                      ? 'text-black'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-black hover:opacity-60 transition-opacity"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <Link
                to="/cart"
                className="p-2 text-black hover:opacity-60 transition-opacity relative"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-5">
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="w-full bg-transparent border-b border-gray-200 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors text-lg"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeMobile}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-12">
              <span className="font-['Playfair_Display'] text-2xl font-semibold text-black tracking-[0.15em]">
                DIEV
              </span>
              <button
                onClick={closeMobile}
                className="p-2 text-black"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={closeMobile}
                  className="text-base tracking-[0.1em] uppercase text-gray-600 hover:text-black transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-10 border-t border-gray-100">
              <Link
                to="/about"
                onClick={closeMobile}
                className="text-sm text-gray-400 hover:text-black transition-colors"
              >
                About DIEV
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
