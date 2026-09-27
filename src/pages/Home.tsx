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
      <section className="relative min-h-[85vh] flex items-center bg-[#F3E9D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 py-12 lg:py-0">
              <p className="text-xs uppercase tracking-[0.2em] text-[#4E342E]/60 font-medium">
                Curated Premium Store
              </p>
              <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#4E342E] leading-[1.1] font-medium">
                Everything
                <br />
                <span className="italic text-[#C97B63]">worth</span> having.
              </h1>
              <p className="text-base sm:text-lg text-[#4E342E]/70 max-w-md leading-relaxed">
                Thoughtfully curated products for the modern lifestyle. From timepieces to accessories — discover what speaks to you.
              </p>
              <div>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-[#C97B63] text-white px-8 py-4 text-sm uppercase tracking-[0.1em] font-medium hover:bg-[#4E342E] transition-colors duration-300"
                >
                  Shop Collection
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                <ImagePlaceholder
                  src="/products/diev-chronograph/1.jpg"
                  alt="Featured product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-[#FFF8F5] p-4 shadow-sm">
                  <p className="text-[10px] uppercase tracking-wider text-[#4E342E]/50">Featured</p>
                  <p className="text-sm font-medium text-[#4E342E]">DIEV Chronograph</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 sm:py-28 bg-[#FFF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C97B63] font-medium mb-2">
                Just In
              </p>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-[#4E342E]">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/shop?filter=new"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-[#4E342E]/60 hover:text-[#C97B63] transition-colors uppercase tracking-wider"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 sm:py-28 bg-[#F3E9D9]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C97B63] font-medium mb-2">
              Browse
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-[#4E342E]">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${encodeURIComponent(cat)}`}
                className="group relative aspect-square bg-[#F3E9D9] overflow-hidden"
              >
                <ImagePlaceholder
                  src={categoryImages[cat] || ''}
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#4E342E]/20 group-hover:bg-[#4E342E]/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base uppercase tracking-[0.15em] font-medium">
                    {cat}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-28 bg-[#FFF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C97B63] font-medium mb-2">
                Handpicked
              </p>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-[#4E342E]">
                Featured Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-[#4E342E]/60 hover:text-[#C97B63] transition-colors uppercase tracking-wider"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featured.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-20 sm:py-28 bg-[#F3E9D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-[#FFF8F5]">
              <ImagePlaceholder
                src="/products/diev-minimal/1.jpg"
                alt="Editorial"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6 lg:pl-8">
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl text-[#4E342E] leading-tight">
                Designed to be noticed.
                <br />
                <span className="italic text-[#C97B63]">Chosen</span> to be remembered.
              </h2>
              <p className="text-[#4E342E]/70 leading-relaxed max-w-md">
                Every product in our collection is carefully selected for its quality, design, and the story it tells. We believe in objects that elevate your everyday.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] text-[#4E342E] font-medium border-b border-[#4E342E] pb-1 hover:text-[#C97B63] hover:border-[#C97B63] transition-colors"
              >
                Explore the Collection
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 bg-[#FFF8F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl text-[#4E342E] mb-4">
            Find your next favorite.
          </h2>
          <p className="text-[#4E342E]/60 mb-8 max-w-lg mx-auto">
            Browse our complete collection of curated premium products.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#4E342E] text-white px-10 py-4 text-sm uppercase tracking-[0.1em] font-medium hover:bg-[#C97B63] transition-colors duration-300"
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
