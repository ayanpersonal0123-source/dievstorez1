// ============================================
// DIEV — Product Data
// ============================================
//
// HOW TO ADD A NEW PRODUCT:
//
// 1. Add your product images to: public/products/[product-slug]/
//    Example: public/products/my-new-product/1.jpg, 2.jpg, 3.jpg
//
// 2. Copy one of the product objects below and modify:
//    - id: unique identifier
//    - name: product display name
//    - slug: URL-friendly name (lowercase, hyphens)
//    - category: product category
//    - description: product description
//    - price: selling price in ₹
//    - originalPrice: original price (null if no discount)
//    - discount: discount percentage (0 if no discount)
//    - images: array of image paths
//    - featured: show in featured section
//    - newArrival: show in new arrivals
//    - inStock: availability
//    - stock: number of units
//    - variants: available options
//    - colors: available colors
//    - shippingCharge: shipping cost in ₹
//
// 3. Commit to GitHub → Netlify auto-deploys
//
// ============================================

import { Product } from '../types';

export const products: Product[] = [
  // ─────────────────────────────────────────────
  // PRODUCT 1: DIEV Chronograph
  // ─────────────────────────────────────────────
  {
    id: "product-001",
    name: "DIEV Chronograph",
    slug: "diev-chronograph",
    category: "Watches",
    description: "A refined chronograph timepiece with sapphire crystal glass, Japanese movement, and genuine leather strap. Water resistant to 50 meters. The perfect blend of precision engineering and understated elegance.",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    images: [
      "/products/diev-chronograph/1.jpg",
      "/products/diev-chronograph/2.jpg",
      "/products/diev-chronograph/3.jpg",
    ],
    featured: true,
    newArrival: true,
    inStock: true,
    stock: 10,
    variants: [
      { name: "Strap", options: ["Brown Leather", "Black Leather", "Steel"] },
    ],
    colors: ["Brown", "Black", "Silver"],
    shippingCharge: 99,
    reviews: [],
  },

  // ─────────────────────────────────────────────
  // PRODUCT 2: DIEV Minimal
  // ─────────────────────────────────────────────
  {
    id: "product-002",
    name: "DIEV Minimal",
    slug: "diev-minimal",
    category: "Watches",
    description: "Ultra-thin minimalist watch with a clean dial design. Features a mesh stainless steel strap and quartz movement. Case diameter 40mm. Perfect for everyday wear.",
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    images: [
      "/products/diev-minimal/1.jpg",
      "/products/diev-minimal/2.jpg",
      "/products/diev-minimal/3.jpg",
    ],
    featured: true,
    newArrival: false,
    inStock: true,
    stock: 15,
    variants: [
      { name: "Strap", options: ["Rose Gold Mesh", "Silver Mesh", "Black Leather"] },
    ],
    colors: ["Rose Gold", "Silver", "Black"],
    shippingCharge: 99,
    reviews: [],
  },

  // ─────────────────────────────────────────────
  // PRODUCT 3: DIEV Diver
  // ─────────────────────────────────────────────
  {
    id: "product-003",
    name: "DIEV Diver",
    slug: "diev-diver",
    category: "Watches",
    description: "Professional dive watch with 200m water resistance, unidirectional rotating bezel, and luminous markers. Built for adventure with a bold 44mm case and rubber strap.",
    price: 2199,
    originalPrice: 2799,
    discount: 21,
    images: [
      "/products/diev-diver/1.jpg",
      "/products/diev-diver/2.jpg",
      "/products/diev-diver/3.jpg",
    ],
    featured: true,
    newArrival: true,
    inStock: true,
    stock: 8,
    variants: [
      { name: "Strap", options: ["Black Rubber", "NATO Green", "Steel"] },
    ],
    colors: ["Black", "Green", "Silver"],
    shippingCharge: 99,
    reviews: [],
  },

  // ─────────────────────────────────────────────
  // PRODUCT 4: DIEV Classic
  // ─────────────────────────────────────────────
  {
    id: "product-004",
    name: "DIEV Classic",
    slug: "diev-classic",
    category: "Watches",
    description: "Timeless dress watch with Roman numeral indices, domed crystal, and Italian leather strap. The epitome of classic sophistication for formal occasions.",
    price: 1799,
    originalPrice: null,
    discount: 0,
    images: [
      "/products/diev-classic/1.jpg",
      "/products/diev-classic/2.jpg",
      "/products/diev-classic/3.jpg",
    ],
    featured: false,
    newArrival: false,
    inStock: true,
    stock: 12,
    variants: [
      { name: "Strap", options: ["Tan Leather", "Black Leather", "Burgundy Leather"] },
    ],
    colors: ["Tan", "Black", "Burgundy"],
    shippingCharge: 99,
    reviews: [],
  },

  // ─────────────────────────────────────────────
  // PRODUCT 5: DIEV Skeleton
  // ─────────────────────────────────────────────
  {
    id: "product-005",
    name: "DIEV Skeleton",
    slug: "diev-skeleton",
    category: "Watches",
    description: "Open-heart skeleton dial revealing the intricate mechanical movement within. A conversation piece that merges horological artistry with modern design sensibility.",
    price: 2499,
    originalPrice: 3199,
    discount: 22,
    images: [
      "/products/diev-skeleton/1.jpg",
      "/products/diev-skeleton/2.jpg",
      "/products/diev-skeleton/3.jpg",
    ],
    featured: true,
    newArrival: true,
    inStock: true,
    stock: 5,
    variants: [
      { name: "Strap", options: ["Black Leather", "Brown Leather"] },
    ],
    colors: ["Black", "Brown"],
    shippingCharge: 99,
    reviews: [],
  },

  // ─────────────────────────────────────────────
  // PRODUCT 6: DIEV Sport
  // ─────────────────────────────────────────────
  {
    id: "product-006",
    name: "DIEV Sport",
    slug: "diev-sport",
    category: "Watches",
    description: "Rugged sport watch with tachymeter bezel, chronograph sub-dials, and 100m water resistance. Designed for those who demand performance without compromising style.",
    price: 1899,
    originalPrice: 2399,
    discount: 21,
    images: [
      "/products/diev-sport/1.jpg",
      "/products/diev-sport/2.jpg",
      "/products/diev-sport/3.jpg",
    ],
    featured: false,
    newArrival: true,
    inStock: true,
    stock: 20,
    variants: [
      { name: "Strap", options: ["Silicone Black", "Silicone Blue", "Steel"] },
    ],
    colors: ["Black", "Blue", "Silver"],
    shippingCharge: 99,
    reviews: [],
  },
];

// ============================================
// Helper functions to query products
// ============================================

export const getProducts = (): Product[] => products;

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured && p.inStock);

export const getNewArrivals = (): Product[] =>
  products.filter((p) => p.newArrival && p.inStock);

export const getCategories = (): string[] => {
  const cats = new Set(products.map((p) => p.category));
  return Array.from(cats);
};

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category && p.inStock);
