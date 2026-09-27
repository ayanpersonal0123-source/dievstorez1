import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center py-20 sm:py-28">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-medium mb-4">
            Our Story
          </p>
          <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl text-black mb-8">
            About DIEV
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A curated premium store for everything worth having. We believe in thoughtful selection, quality craftsmanship, and products that elevate your everyday.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-24">
          <section className="grid sm:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="aspect-[4/5] bg-gray-100" />
            <div className="space-y-6">
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-black">
                Curated with intention.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                DIEV was born from a simple belief: that the things we surround ourselves with should be chosen with care. Every product in our collection is handpicked for its quality, design, and the story it tells.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From timepieces to accessories, jewellery to lifestyle essentials — we curate objects that deserve a place in your life.
              </p>
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:order-2">
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-black">
                Quality over quantity.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We don't believe in filling shelves. Instead, we focus on finding products that stand out — pieces that combine exceptional craftsmanship with timeless design.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Each item in our store has been evaluated for its materials, construction, and the experience it delivers. If it doesn't meet our standards, it doesn't make the cut.
              </p>
            </div>
            <div className="aspect-[4/5] bg-gray-100 sm:order-1" />
          </section>

          <section className="text-center py-20 bg-gray-50 px-8">
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-black mb-6">
              Discover our collection
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
              Browse carefully selected products across watches, accessories, jewellery, and more.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors"
            >
              Shop Now <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
};

export default About;
