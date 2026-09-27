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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F5]/95 backdrop-blur-sm border-b border-[#E6B89C]/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-[#4E342E] hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="font-['Playfair_Display'] text-2xl sm:text-3xl font-semibold text-[#4E342E] tracking-wider"
            >
              DIEV
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-sm tracking-wide uppercase transition-colors ${
                    isActive(link.to)
                      ? 'text-[#C97B63]'
                      : 'text-[#4E342E]/70 hover:text-[#4E342E]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#4E342E] hover:opacity-70 transition-opacity"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                to="/cart"
                className="p-2 text-[#4E342E] hover:opacity-70 transition-opacity relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C97B63] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-[#E6B89C]/20 bg-[#FFF8F5] px-4 py-3">
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
                className="w-full bg-transparent border-b border-[#E6B89C]/40 py-2 text-[#4E342E] placeholder-[#4E342E]/40 focus:outline-none focus:border-[#C97B63] transition-colors"
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
            className="absolute inset-0 bg-black/30"
            onClick={closeMobile}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#FFF8F5] shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="font-['Playfair_Display'] text-2xl font-semibold text-[#4E342E]">
                DIEV
              </span>
              <button
                onClick={closeMobile}
                className="p-2 text-[#4E342E]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={closeMobile}
                  className="text-base tracking-wide uppercase text-[#4E342E]/80 hover:text-[#C97B63] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-[#E6B89C]/20">
              <Link
                to="/about"
                onClick={closeMobile}
                className="text-sm text-[#4E342E]/50 hover:text-[#4E342E] transition-colors"
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
