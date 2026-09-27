import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ExternalLink } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  return (
    <main className="min-h-screen pt-32 pb-28 bg-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gray-50 flex items-center justify-center">
          <CheckCircle size={36} className="text-black" />
        </div>

        <h1 className="font-['Playfair_Display'] text-4xl text-black mb-4">
          Your Order Details Are Ready
        </h1>

        <p className="text-lg text-gray-600 mb-3 leading-relaxed">
          Continue in WhatsApp to complete your order.
        </p>
        <p className="text-sm text-gray-500 mb-12">
          If WhatsApp didn't open automatically, click the button below.
        </p>

        <a
          href="https://wa.me/919277406933"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors mb-6"
        >
          <ExternalLink size={16} />
          Open WhatsApp
        </a>

        <div className="mt-12 pt-10 border-t border-gray-100">
          <Link
            to="/shop"
            className="text-sm text-black hover:underline uppercase tracking-[0.15em]"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="mt-12 text-xs text-gray-400 leading-relaxed">
          Note: Your order is confirmed only after communication via WhatsApp.
          <br />
          Payment details will be shared through WhatsApp.
        </p>
      </div>
    </main>
  );
};

export default OrderConfirmation;
