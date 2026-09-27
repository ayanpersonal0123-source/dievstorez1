import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-20 bg-[#FFF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center py-16 sm:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C97B63] font-medium mb-4">
            Our Story
          </p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-[#4E342E] mb-6">
            About DIEV
          </h1>
          <p className="text-lg text-[#4E342E]/70 max-w-2xl mx-auto leading-relaxed">
            A curated premium store for everything worth having. We believe in thoughtful selection, quality craftsmanship, and products that elevate your everyday.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-16">
          <section className="grid sm:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/5] bg-[#F3E9D9]" />
            <div className="space-y-4">
              <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl text-[#4E342E]">
                Curated with intention.
              </h2>
              <p className="text-[#4E342E]/70 leading-relaxed">
                DIEV was born from a simple belief: that the things we surround ourselves with should be chosen with care. Every product in our collection is handpicked for its quality, design, and the story it tells.
              </p>
              <p className="text-[#4E342E]/70 leading-relaxed">
                From timepieces to accessories, jewellery to lifestyle essentials — we curate objects that deserve a place in your life.
              </p>
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 sm:order-2">
              <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl text-[#4E342E]">
                Quality over quantity.
              </h2>
              <p className="text-[#4E342E]/70 leading-relaxed">
                We don't believe in filling shelves. Instead, we focus on finding products that stand out — pieces that combine exceptional craftsmanship with timeless design.
              </p>
              <p className="text-[#4E342E]/70 leading-relaxed">
                Each item in our store has been evaluated for its materials, construction, and the experience it delivers. If it doesn't meet our standards, it doesn't make the cut.
              </p>
            </div>
            <div className="aspect-[4/5] bg-[#F3E9D9] sm:order-1" />
          </section>

          <section className="text-center py-12 bg-[#F3E9D9]/50 px-8">
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl text-[#4E342E] mb-4">
              Discover our collection
            </h2>
            <p className="text-[#4E342E]/60 mb-6 max-w-md mx-auto">
              Browse carefully selected products across watches, accessories, jewellery, and more.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#C97B63] text-white px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-[#4E342E] transition-colors"
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
