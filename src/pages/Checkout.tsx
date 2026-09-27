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
      <main className="min-h-screen pt-32 pb-28 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-4xl text-black mb-6">
            Your cart is empty
          </h1>
          <Link
            to="/shop"
            className="text-sm text-black hover:underline uppercase tracking-[0.15em]"
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

    openWhatsAppOrder(items, customer, paymentMethod);

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
    <main className="min-h-screen pt-28 sm:pt-32 pb-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft size={12} /> Back to Cart
          </Link>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-black">
            Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-2 space-y-12">
              {/* Contact */}
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-black font-medium mb-6">
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={customer.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className={`w-full px-5 py-4 bg-gray-50 border text-sm text-black focus:outline-none focus:border-black transition-colors ${
                        errors.fullName ? 'border-red-400' : 'border-gray-200'
                      }`}
                      placeholder="Rahul Sharma"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-2">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className={`w-full px-5 py-4 bg-gray-50 border text-sm text-black focus:outline-none focus:border-black transition-colors ${
                        errors.phone ? 'border-red-400' : 'border-gray-200'
                      }`}
                      placeholder="98XXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-2">{errors.phone}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-600 mb-2">Email *</label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={`w-full px-5 py-4 bg-gray-50 border text-sm text-black focus:outline-none focus:border-black transition-colors ${
                        errors.email ? 'border-red-400' : 'border-gray-200'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-2">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-black font-medium mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Address *</label>
                    <textarea
                      value={customer.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      rows={3}
                      className={`w-full px-5 py-4 bg-gray-50 border text-sm text-black focus:outline-none focus:border-black transition-colors resize-none ${
                        errors.address ? 'border-red-400' : 'border-gray-200'
                      }`}
                      placeholder="House/Flat no., Street, Landmark"
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500 mt-2">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">City *</label>
                      <input
                        type="text"
                        value={customer.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        className={`w-full px-5 py-4 bg-gray-50 border text-sm text-black focus:outline-none focus:border-black transition-colors ${
                          errors.city ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Lucknow"
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-2">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">State *</label>
                      <input
                        type="text"
                        value={customer.state}
                        onChange={(e) => updateField('state', e.target.value)}
                        className={`w-full px-5 py-4 bg-gray-50 border text-sm text-black focus:outline-none focus:border-black transition-colors ${
                          errors.state ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Uttar Pradesh"
                      />
                      {errors.state && (
                        <p className="text-xs text-red-500 mt-2">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">PIN Code *</label>
                      <input
                        type="text"
                        value={customer.pinCode}
                        onChange={(e) => updateField('pinCode', e.target.value)}
                        className={`w-full px-5 py-4 bg-gray-50 border text-sm text-black focus:outline-none focus:border-black transition-colors ${
                          errors.pinCode ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="226001"
                      />
                      {errors.pinCode && (
                        <p className="text-xs text-red-500 mt-2">{errors.pinCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-black font-medium mb-6">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-6 border border-gray-200 cursor-pointer hover:border-black transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="accent-black"
                    />
                    <div>
                      <p className="text-sm font-medium text-black">Online Payment</p>
                      <p className="text-xs text-gray-500 mt-1">Pay via UPI / Card / Net Banking</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-6 border border-gray-200 cursor-pointer hover:border-black transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-black"
                    />
                    <div>
                      <p className="text-sm font-medium text-black">Cash on Delivery</p>
                      <p className="text-xs text-gray-500 mt-1">Pay when you receive your order</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-8 sticky top-32">
                <h2 className="text-sm uppercase tracking-[0.2em] text-black font-medium mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate pr-3">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-black flex-shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-3 text-sm">
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

                <button
                  type="submit"
                  className="block w-full text-center bg-black text-white py-5 mt-8 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors"
                >
                  Place Order via WhatsApp
                </button>

                <p className="text-[10px] text-gray-400 text-center mt-4">
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
