import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { getNewArrivals, getFeaturedProducts, getCategories } from '../data/products';

const Home: React.FC = () => {
  const newArrivals = getNewArrivals();
  const featured = getFeaturedProducts();
  const categories = getCategories();

  const categoryImages: Record<string, string> = {
    Watches: '/products/diev-chronograph/1.jpg',
    Jewellery: '',
    Accessories: '',
    Bags: '',
    Lifestyle: '',
    Fashion: '',
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10 py-12 lg:py-0">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-medium">
                Curated Premium Store
              </p>
              <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-black leading-[1.05] font-medium">
                Everything
                <br />
                <span className="italic font-normal text-gray-600">worth</span> having.
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed">
                Thoughtfully curated products for the modern lifestyle. From timepieces to accessories — discover what speaks to you.
              </p>
              <div className="pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors duration-300"
                >
                  Shop Collection
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative aspect-[3/4] max-w-lg mx-auto">
                <ImagePlaceholder
                  src="/products/diev-chronograph/1.jpg"
                  alt="Featured product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-lg">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Featured</p>
                  <p className="text-sm font-medium text-black">DIEV Chronograph</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-28 sm:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-medium mb-3">
                Just In
              </p>
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-black">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/shop?filter=new"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-[0.15em]"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-28 sm:py-36 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-20">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-medium mb-3">
              Browse
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-black">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${encodeURIComponent(cat)}`}
                className="group relative aspect-square bg-gray-100 overflow-hidden"
              >
                <ImagePlaceholder
                  src={categoryImages[cat] || ''}
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base uppercase tracking-[0.2em] font-medium">
                    {cat}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-28 sm:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-medium mb-3">
                Handpicked
              </p>
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-black">
                Featured Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-[0.15em]"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {featured.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-28 sm:py-36 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="aspect-[4/5] bg-gray-100">
              <ImagePlaceholder
                src="/products/diev-minimal/1.jpg"
                alt="Editorial"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8 lg:pl-8">
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.1]">
                Designed to be noticed.
                <br />
                <span className="italic font-normal text-gray-500">Chosen</span> to be remembered.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Every product in our collection is carefully selected for its quality, design, and the story it tells. We believe in objects that elevate your everyday.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] text-black font-medium border-b-2 border-black pb-2 hover:text-gray-600 hover:border-gray-600 transition-colors"
              >
                Explore the Collection
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 sm:py-36 bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl mb-6">
            Find your next favorite.
          </h2>
          <p className="text-lg text-gray-400 mb-12 max-w-lg mx-auto">
            Browse our complete collection of curated premium products.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            Shop Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
