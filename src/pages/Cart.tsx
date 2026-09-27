import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { formatPrice, calculateSubtotal, calculateShipping, calculateTotal } from '../utils/shipping';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-20 bg-[#FFF8F5] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#F3E9D9] flex items-center justify-center">
            <ShoppingBag size={24} className="text-[#C97B63]" />
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#4E342E] mb-3">
            Your cart is empty
          </h1>
          <p className="text-[#4E342E]/60 mb-8">
            Discover something you'll love.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#C97B63] text-white px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-[#4E342E] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-20 bg-[#FFF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#4E342E]/50 hover:text-[#C97B63] transition-colors mb-4"
          >
            <ArrowLeft size={12} /> Continue Shopping
          </Link>
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-[#4E342E]">
            Shopping Cart
          </h1>
          <p className="text-sm text-[#4E342E]/60 mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${idx}`}
                className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-white border border-[#E6B89C]/10"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.product.slug}`}
                  className="w-20 h-24 sm:w-28 sm:h-32 flex-shrink-0 bg-[#F3E9D9]"
                >
                  <ImagePlaceholder
                    src={item.product.images[0] || ''}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="text-sm sm:text-base font-medium text-[#4E342E] hover:text-[#C97B63] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-[#4E342E]/50 mt-0.5">
                        {item.product.category}
                      </p>
                      {item.selectedColor && (
                        <p className="text-xs text-[#4E342E]/50 mt-0.5">
                          Color: {item.selectedColor}
                        </p>
                      )}
                      {item.selectedVariants &&
                        Object.entries(item.selectedVariants).map(([key, val]) => (
                          <p key={key} className="text-xs text-[#4E342E]/50 mt-0.5">
                            {key}: {val}
                          </p>
                        ))}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="p-1 text-[#4E342E]/40 hover:text-[#C97B63] transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-[#E6B89C]/30">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="p-2 text-[#4E342E]/60 hover:text-[#4E342E]"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-medium text-[#4E342E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        className="p-2 text-[#4E342E]/60 hover:text-[#4E342E]"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-semibold text-[#4E342E]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E6B89C]/10 p-6 sticky top-28">
              <h2 className="text-sm uppercase tracking-wider text-[#4E342E] font-medium mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#4E342E]/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(calculateSubtotal(items))}</span>
                </div>
                <div className="flex justify-between text-[#4E342E]/70">
                  <span>Shipping</span>
                  <span>{formatPrice(calculateShipping(items))}</span>
                </div>
                <div className="border-t border-[#E6B89C]/20 pt-3 flex justify-between text-[#4E342E] font-semibold text-base">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal(items))}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center bg-[#C97B63] text-white py-4 mt-6 text-sm uppercase tracking-[0.1em] font-medium hover:bg-[#4E342E] transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="block text-center text-xs text-[#4E342E]/50 hover:text-[#C97B63] mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
