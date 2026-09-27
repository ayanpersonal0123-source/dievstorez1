import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { openWhatsAppOrder } from '../utils/whatsapp';
import { formatPrice, calculateSubtotal, calculateShipping, calculateTotal } from '../utils/shipping';
import { CustomerDetails, PaymentMethod } from '../types';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-20 bg-[#FFF8F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-3xl text-[#4E342E] mb-4">
            Your cart is empty
          </h1>
          <Link
            to="/shop"
            className="text-sm text-[#C97B63] hover:underline uppercase tracking-wider"
          >
            Go to Shop
          </Link>
        </div>
      </main>
    );
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!customer.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!customer.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(customer.phone.replace(/\s/g, '')))
      newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!customer.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(customer.email))
      newErrors.email = 'Enter a valid email';
    if (!customer.address.trim()) newErrors.address = 'Address is required';
    if (!customer.city.trim()) newErrors.city = 'City is required';
    if (!customer.state.trim()) newErrors.state = 'State is required';
    if (!customer.pinCode.trim()) newErrors.pinCode = 'PIN code is required';
    else if (!/^\d{6}$/.test(customer.pinCode.replace(/\s/g, '')))
      newErrors.pinCode = 'Enter a valid 6-digit PIN code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Open WhatsApp with order details
    openWhatsAppOrder(items, customer, paymentMethod);

    // Clear cart and navigate to confirmation
    clearCart();
    navigate('/order-confirmation');
  };

  const updateField = (field: keyof CustomerDetails, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-20 bg-[#FFF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#4E342E]/50 hover:text-[#C97B63] transition-colors mb-4"
          >
            <ArrowLeft size={12} /> Back to Cart
          </Link>
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-[#4E342E]">
            Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact */}
              <div>
                <h2 className="text-sm uppercase tracking-wider text-[#4E342E] font-medium mb-4">
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#4E342E]/60 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      value={customer.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors ${
                        errors.fullName ? 'border-red-400' : 'border-[#E6B89C]/30'
                      }`}
                      placeholder="Rahul Sharma"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-[#4E342E]/60 mb-1.5">Phone *</label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors ${
                        errors.phone ? 'border-red-400' : 'border-[#E6B89C]/30'
                      }`}
                      placeholder="98XXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-[#4E342E]/60 mb-1.5">Email *</label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-white border text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors ${
                        errors.email ? 'border-red-400' : 'border-[#E6B89C]/30'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-sm uppercase tracking-wider text-[#4E342E] font-medium mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#4E342E]/60 mb-1.5">Address *</label>
                    <textarea
                      value={customer.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-3 bg-white border text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors resize-none ${
                        errors.address ? 'border-red-400' : 'border-[#E6B89C]/30'
                      }`}
                      placeholder="House/Flat no., Street, Landmark"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-[#4E342E]/60 mb-1.5">City *</label>
                      <input
                        type="text"
                        value={customer.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors ${
                          errors.city ? 'border-red-400' : 'border-[#E6B89C]/30'
                        }`}
                        placeholder="Lucknow"
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-[#4E342E]/60 mb-1.5">State *</label>
                      <input
                        type="text"
                        value={customer.state}
                        onChange={(e) => updateField('state', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors ${
                          errors.state ? 'border-red-400' : 'border-[#E6B89C]/30'
                        }`}
                        placeholder="Uttar Pradesh"
                      />
                      {errors.state && (
                        <p className="text-xs text-red-500 mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-[#4E342E]/60 mb-1.5">PIN Code *</label>
                      <input
                        type="text"
                        value={customer.pinCode}
                        onChange={(e) => updateField('pinCode', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors ${
                          errors.pinCode ? 'border-red-400' : 'border-[#E6B89C]/30'
                        }`}
                        placeholder="226001"
                      />
                      {errors.pinCode && (
                        <p className="text-xs text-red-500 mt-1">{errors.pinCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-sm uppercase tracking-wider text-[#4E342E] font-medium mb-4">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-[#E6B89C]/30 cursor-pointer hover:border-[#C97B63] transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="accent-[#C97B63]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#4E342E]">Online Payment</p>
                      <p className="text-xs text-[#4E342E]/50">Pay via UPI / Card / Net Banking</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-[#E6B89C]/30 cursor-pointer hover:border-[#C97B63] transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#C97B63]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#4E342E]">Cash on Delivery</p>
                      <p className="text-xs text-[#4E342E]/50">Pay when you receive your order</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#E6B89C]/10 p-6 sticky top-28">
                <h2 className="text-sm uppercase tracking-wider text-[#4E342E] font-medium mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-[#4E342E]/70 truncate pr-2">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-[#4E342E] flex-shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E6B89C]/20 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-[#4E342E]/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculateSubtotal(items))}</span>
                  </div>
                  <div className="flex justify-between text-[#4E342E]/70">
                    <span>Shipping</span>
                    <span>{formatPrice(calculateShipping(items))}</span>
                  </div>
                  <div className="border-t border-[#E6B89C]/20 pt-2 flex justify-between text-[#4E342E] font-semibold text-base">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal(items))}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="block w-full text-center bg-[#C97B63] text-white py-4 mt-6 text-sm uppercase tracking-[0.1em] font-medium hover:bg-[#4E342E] transition-colors"
                >
                  Place Order via WhatsApp
                </button>

                <p className="text-[10px] text-[#4E342E]/40 text-center mt-3">
                  You will be redirected to WhatsApp to complete your order.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
