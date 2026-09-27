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

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (newFilter === 'new') {
      result = result.filter((p) => p.newArrival);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    result = result.filter((p) => p.inStock);

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
    <main className="min-h-screen pt-28 sm:pt-32 pb-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-black mb-3">
            {newFilter === 'new' ? 'New Arrivals' : selectedCategory || 'Shop'}
          </h1>
          <p className="text-sm text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <form onSubmit={handleSearch} className="flex-1 flex">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <button
              type="submit"
              className="ml-3 px-6 bg-black text-white text-sm uppercase tracking-[0.1em] hover:bg-gray-800 transition-colors"
            >
              Search
            </button>
          </form>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-4 border text-sm transition-colors ${
                showFilters
                  ? 'border-black text-black'
                  : 'border-gray-200 text-gray-600 hover:border-black'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-5 py-4 border border-gray-200 text-sm text-black bg-white focus:outline-none focus:border-black"
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
          <div className="mb-12 p-8 bg-gray-50 border border-gray-100">
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-4">
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
                    className={`px-4 py-2 text-xs border transition-colors ${
                      !selectedCategory
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 text-gray-600 hover:border-black'
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
                      className={`px-4 py-2 text-xs border transition-colors ${
                        selectedCategory === cat
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-600 hover:border-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-4">
                  Price Range
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0] || ''}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value) || 0, priceRange[1]])
                    }
                    className="w-28 px-4 py-2 border border-gray-200 text-xs text-black focus:outline-none focus:border-black"
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1] === 10000 ? '' : priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value) || 10000])
                    }
                    className="w-28 px-4 py-2 border border-gray-200 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs text-black hover:underline"
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-28">
            <p className="text-xl text-gray-500 mb-3">No products found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 text-sm text-black hover:underline"
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
