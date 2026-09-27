import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, getCategories } from '../data/products';
import { Product, SortOption } from '../types';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const newFilter = searchParams.get('filter') || '';

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const categories = getCategories();

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // New arrivals filter
    if (newFilter === 'new') {
      result = result.filter((p) => p.newArrival);
    }

    // Price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // In stock only
    result = result.filter((p) => p.inStock);

    // Sort
    switch (sortBy) {
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, newFilter, sortBy, priceRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (localSearch.trim()) {
      params.set('search', localSearch.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setLocalSearch('');
    setSelectedCategory('');
    setPriceRange([0, 10000]);
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory || newFilter === 'new';

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-20 bg-[#FFF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-[#4E342E] mb-2">
            {newFilter === 'new' ? 'New Arrivals' : selectedCategory || 'Shop'}
          </h1>
          <p className="text-sm text-[#4E342E]/60">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4E342E]/40"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6B89C]/30 text-sm text-[#4E342E] placeholder-[#4E342E]/40 focus:outline-none focus:border-[#C97B63] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="ml-2 px-4 bg-[#4E342E] text-white text-sm uppercase tracking-wider hover:bg-[#C97B63] transition-colors"
            >
              Search
            </button>
          </form>

          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border text-sm transition-colors ${
                showFilters
                  ? 'border-[#C97B63] text-[#C97B63]'
                  : 'border-[#E6B89C]/30 text-[#4E342E]/70 hover:border-[#C97B63]'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 border border-[#E6B89C]/30 text-sm text-[#4E342E] bg-white focus:outline-none focus:border-[#C97B63]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white border border-[#E6B89C]/20">
            <div className="flex flex-wrap gap-6">
              {/* Categories */}
              <div>
                <p className="text-xs uppercase tracking-wider text-[#4E342E]/50 font-medium mb-3">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      const params = new URLSearchParams(searchParams);
                      params.delete('category');
                      setSearchParams(params);
                    }}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      !selectedCategory
                        ? 'border-[#C97B63] bg-[#C97B63] text-white'
                        : 'border-[#E6B89C]/30 text-[#4E342E]/70 hover:border-[#C97B63]'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat === selectedCategory ? '' : cat);
                        const params = new URLSearchParams(searchParams);
                        if (cat === selectedCategory) {
                          params.delete('category');
                        } else {
                          params.set('category', cat);
                        }
                        setSearchParams(params);
                      }}
                      className={`px-3 py-1.5 text-xs border transition-colors ${
                        selectedCategory === cat
                          ? 'border-[#C97B63] bg-[#C97B63] text-white'
                          : 'border-[#E6B89C]/30 text-[#4E342E]/70 hover:border-[#C97B63]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-xs uppercase tracking-wider text-[#4E342E]/50 font-medium mb-3">
                  Price Range
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0] || ''}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value) || 0, priceRange[1]])
                    }
                    className="w-24 px-3 py-1.5 border border-[#E6B89C]/30 text-xs text-[#4E342E] focus:outline-none focus:border-[#C97B63]"
                  />
                  <span className="text-[#4E342E]/40">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1] === 10000 ? '' : priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value) || 10000])
                    }
                    className="w-24 px-3 py-1.5 border border-[#E6B89C]/30 text-xs text-[#4E342E] focus:outline-none focus:border-[#C97B63]"
                  />
                </div>
              </div>

              {/* Clear */}
              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs text-[#C97B63] hover:underline"
                  >
                    <X size={12} /> Clear all
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-[#4E342E]/60 mb-2">No products found</p>
            <p className="text-sm text-[#4E342E]/40">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-[#C97B63] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Shop;
