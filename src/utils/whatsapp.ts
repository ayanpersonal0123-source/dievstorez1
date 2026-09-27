import { CartItem, CustomerDetails, PaymentMethod } from '../types';
import { calculateSubtotal, calculateShipping, calculateTotal, formatPrice } from './shipping';

// ============================================
// WhatsApp Order System
// ============================================

const WHATSAPP_NUMBER = '919277406933';

export const generateWhatsAppMessage = (
  items: CartItem[],
  customer: CustomerDetails,
  paymentMethod: PaymentMethod
): string => {
  const lines: string[] = [];

  lines.push('Hello DIEV Store 👋');
  lines.push('');
  lines.push('I would like to place an order.');
  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('📦 ORDER DETAILS');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  if (items.length === 1) {
    const item = items[0];
    lines.push(`PRODUCT:`);
    lines.push(`${item.product.name}`);
    if (item.selectedColor) lines.push(`Color: ${item.selectedColor}`);
    if (item.selectedVariants) {
      Object.entries(item.selectedVariants).forEach(([key, val]) => {
        lines.push(`${key}: ${val}`);
      });
    }
    lines.push('');
    lines.push(`QUANTITY: ${item.quantity}`);
    lines.push(`PRICE: ${formatPrice(item.product.price * item.quantity)}`);
  } else {
    lines.push('PRODUCTS:');
    lines.push('');
    items.forEach((item, index) => {
      const itemTotal = item.product.price * item.quantity;
      lines.push(`${index + 1}. ${item.product.name} × ${item.quantity} — ${formatPrice(itemTotal)}`);
      if (item.selectedColor) lines.push(`   Color: ${item.selectedColor}`);
      if (item.selectedVariants) {
        Object.entries(item.selectedVariants).forEach(([key, val]) => {
          lines.push(`   ${key}: ${val}`);
        });
      }
    });
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('👤 CUSTOMER DETAILS');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push(`Name: ${customer.fullName}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push(`Email: ${customer.email}`);
  lines.push(`Address: ${customer.address}`);
  lines.push(`City: ${customer.city}`);
  lines.push(`State: ${customer.state}`);
  lines.push(`PIN Code: ${customer.pinCode}`);

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('💳 PAYMENT');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push(`Payment Method: ${paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}`);

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('💰 ORDER SUMMARY');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push(`Subtotal: ${formatPrice(calculateSubtotal(items))}`);
  lines.push(`Shipping: ${formatPrice(calculateShipping(items))}`);
  lines.push(`Total: ${formatPrice(calculateTotal(items))}`);

  lines.push('');
  lines.push('Thank you.');

  return lines.join('\n');
};

export const openWhatsAppOrder = (
  items: CartItem[],
  customer: CustomerDetails,
  paymentMethod: PaymentMethod
): void => {
  const message = generateWhatsAppMessage(items, customer, paymentMethod);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, '_blank');
};
