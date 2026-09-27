import { CartItem } from '../types';

// ============================================
// Shipping Calculation Utility
// ============================================
// Calculates total shipping based on individual product shipping charges.
// Each product has its own shippingCharge defined in the product data.

export const calculateShipping = (items: CartItem[]): number => {
  if (items.length === 0) return 0;

  // Sum up shipping charges for each item (quantity × per-unit shipping)
  const total = items.reduce((sum, item) => {
    return sum + item.product.shippingCharge * item.quantity;
  }, 0);

  return total;
};

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
};

export const calculateTotal = (items: CartItem[]): number => {
  return calculateSubtotal(items) + calculateShipping(items);
};

export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};
