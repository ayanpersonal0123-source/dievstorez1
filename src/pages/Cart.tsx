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
      <main className="min-h-screen pt-32 pb-28 bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gray-50 flex items-center justify-center">
            <ShoppingBag size={28} className="text-gray-400" />
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl text-black mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-500 mb-10">
            Discover something you'll love.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft size={12} /> Continue Shopping
          </Link>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-black">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${idx}`}
                className="flex gap-6 sm:gap-8 p-6 sm:p-8 bg-gray-50"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.product.slug}`}
                  className="w-24 h-32 sm:w-32 sm:h-40 flex-shrink-0 bg-gray-100"
                >
                  <ImagePlaceholder
                    src={item.product.images[0] || ''}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="text-base sm:text-lg font-medium text-black hover:text-gray-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.product.category}
                      </p>
                      {item.selectedColor && (
                        <p className="text-xs text-gray-500 mt-1">
                          Color: {item.selectedColor}
                        </p>
                      )}
                      {item.selectedVariants &&
                        Object.entries(item.selectedVariants).map(([key, val]) => (
                          <p key={key} className="text-xs text-gray-500 mt-1">
                            {key}: {val}
                          </p>
                        ))}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                      className="p-2 text-gray-400 hover:text-black transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-6">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                        className="p-3 text-gray-600 hover:text-black"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-4 text-sm font-medium text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                        className="p-3 text-gray-600 hover:text-black"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-base font-semibold text-black">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 sticky top-32">
              <h2 className="text-sm uppercase tracking-[0.2em] text-black font-medium mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(calculateSubtotal(items))}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{formatPrice(calculateShipping(items))}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-black font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal(items))}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center bg-black text-white py-5 mt-8 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="block text-center text-xs text-gray-500 hover:text-black mt-6 transition-colors"
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
