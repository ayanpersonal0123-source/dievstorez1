// ============================================
// DIEV Product Types
// ============================================

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  isPlaceholder?: boolean; // Mark placeholder reviews
}

export interface Product {
  // Unique product identifier
  id: string;

  // Display name
  name: string;

  // URL-friendly slug (used in product URLs)
  slug: string;

  // Product category (e.g., "Watches", "Jewellery", "Accessories", "Bags", "Lifestyle", "Fashion")
  category: string;

  // Full product description
  description: string;

  // Current selling price (in ₹)
  price: number;

  // Original price before discount (set to null if no discount)
  originalPrice: number | null;

  // Discount percentage (e.g., 25 for 25% off)
  discount: number;

  // Product images — stored in public/products/[slug]/
  // Example: "/products/diev-chronograph/1.jpg"
  images: string[];

  // Show in featured products section
  featured: boolean;

  // Show in new arrivals section
  newArrival: boolean;

  // Is the product currently available for purchase
  inStock: boolean;

  // Number of units available
  stock: number;

  // Product variants (e.g., size, strap type)
  variants: ProductVariant[];

  // Available colors
  colors: string[];

  // Shipping charge for this product (in ₹)
  shippingCharge: number;

  // Product reviews (optional)
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
  selectedColor?: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export type PaymentMethod = 'online' | 'cod';

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high';
