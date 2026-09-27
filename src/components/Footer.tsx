import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4E342E] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="font-['Playfair_Display'] text-3xl font-semibold text-white tracking-wider block mb-4"
            >
              DIEV
            </Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              A curated premium store for everything worth having. Thoughtfully selected products for the modern lifestyle.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-medium text-white/40 mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-sm text-white/70 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=new" className="text-sm text-white/70 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-white/70 hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-medium text-white/40 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-white/70 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/dievstorez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link to="/atelier/login" className="text-sm text-white/50 hover:text-white/70 transition-colors">
                  Atelier
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-medium text-white/40 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-white/70 cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-white/70 cursor-default">Terms of Service</span>
              </li>
              <li>
                <span className="text-sm text-white/70 cursor-default">Shipping Policy</span>
              </li>
              <li>
                <span className="text-sm text-white/70 cursor-default">Returns & Refunds</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 DIEV. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Curated with care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
