import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ExternalLink } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#FFF8F5] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-600" />
        </div>

        <h1 className="font-['Playfair_Display'] text-3xl text-[#4E342E] mb-3">
          Your Order Details Are Ready
        </h1>

        <p className="text-[#4E342E]/70 mb-2 leading-relaxed">
          Continue in WhatsApp to complete your order.
        </p>
        <p className="text-sm text-[#4E342E]/50 mb-8">
          If WhatsApp didn't open automatically, click the button below.
        </p>

        <a
          href="https://wa.me/919277406933"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-[#128C7E] transition-colors mb-4"
        >
          <ExternalLink size={16} />
          Open WhatsApp
        </a>

        <div className="mt-8 pt-8 border-t border-[#E6B89C]/20">
          <Link
            to="/shop"
            className="text-sm text-[#C97B63] hover:underline uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="mt-8 text-xs text-[#4E342E]/40">
          Note: Your order is confirmed only after communication via WhatsApp.
          <br />
          Payment details will be shared through WhatsApp.
        </p>
      </div>
    </main>
  );
};

export default OrderConfirmation;
