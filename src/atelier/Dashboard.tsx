import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Package, Star, Tag, Clock, ArrowLeft } from 'lucide-react';
import { getProducts, getCategories } from '../data/products';
import { ATELIER_SESSION_KEY } from './Login';
import { formatPrice } from '../utils/shipping';

const AtelierDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem(ATELIER_SESSION_KEY);
    if (session !== 'active') {
      navigate('/atelier/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem(ATELIER_SESSION_KEY);
    navigate('/atelier/login');
  };

  if (!isAuthenticated) return null;

  const products = getProducts();
  const categories = getCategories();
  const activeProducts = products.filter((p) => p.inStock);
  const hiddenProducts = products.filter((p) => !p.inStock);
  const newArrivals = products.filter((p) => p.newArrival);
  const featuredProducts = products.filter((p) => p.featured);

  // Recently added (last 3 products in array)
  const recentProducts = products.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-[#FFF8F5]">
      {/* Header */}
      <header className="bg-[#4E342E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-white/50 hover:text-white/70 transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Store
            </Link>
            <span className="text-white/20">|</span>
            <h1 className="font-['Playfair_Display'] text-xl tracking-wider">
              ATELIER
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          <StatCard icon={<Package size={18} />} label="Total Products" value={products.length} />
          <StatCard icon={<Tag size={18} />} label="Active" value={activeProducts.length} />
          <StatCard icon={<Package size={18} />} label="Hidden" value={hiddenProducts.length} />
          <StatCard icon={<Clock size={18} />} label="New Arrivals" value={newArrivals.length} />
          <StatCard icon={<Star size={18} />} label="Featured" value={featuredProducts.length} />
        </div>

        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-[#4E342E] font-medium mb-4">
            Product Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <span
                  key={cat}
                  className="px-4 py-2 bg-white border border-[#E6B89C]/20 text-sm text-[#4E342E]"
                >
                  {cat} <span className="text-[#4E342E]/40">({count})</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Recent Products */}
        <div className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-[#4E342E] font-medium mb-4">
            Recently Added Products
          </h2>
          <div className="bg-white border border-[#E6B89C]/10 divide-y divide-[#E6B89C]/10">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium text-[#4E342E]">{product.name}</p>
                  <p className="text-xs text-[#4E342E]/50">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#4E342E]">{formatPrice(product.price)}</p>
                  <p className="text-xs text-[#4E342E]/50">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Management Info */}
        <div className="bg-[#F3E9D9]/50 border border-[#E6B89C]/20 p-6 sm:p-8">
          <h2 className="text-sm uppercase tracking-wider text-[#4E342E] font-medium mb-4">
            Product Management
          </h2>
          <div className="space-y-4 text-sm text-[#4E342E]/70">
            <p>
              Products are managed through the GitHub product data file. To add or modify products:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Add product images to <code className="bg-white px-1.5 py-0.5 text-xs">public/products/[product-name]/</code></li>
              <li>Add/edit product data in <code className="bg-white px-1.5 py-0.5 text-xs">src/data/products.ts</code></li>
              <li>Commit changes to GitHub</li>
              <li>Netlify automatically deploys the updates</li>
            </ol>

            <div className="mt-6 p-4 bg-white border border-[#E6B89C]/10">
              <p className="text-xs uppercase tracking-wider text-[#4E342E]/50 font-medium mb-3">
                Product Template
              </p>
              <pre className="text-xs text-[#4E342E]/70 overflow-x-auto whitespace-pre-wrap">
{`{
  id: "product-xxx",
  name: "Product Name",
  slug: "product-name",
  category: "Category",
  description: "Product description...",
  price: 1499,
  originalPrice: 1999,  // null if no discount
  discount: 25,         // 0 if no discount
  images: [
    "/products/product-name/1.jpg",
    "/products/product-name/2.jpg"
  ],
  featured: true,
  newArrival: true,
  inStock: true,
  stock: 10,
  variants: [
    { name: "Size", options: ["S", "M", "L"] }
  ],
  colors: ["Black", "White"],
  shippingCharge: 99
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number }> = ({
  icon,
  label,
  value,
}) => (
  <div className="bg-white border border-[#E6B89C]/10 p-4">
    <div className="flex items-center gap-2 text-[#C97B63] mb-2">
      {icon}
      <span className="text-[10px] uppercase tracking-wider text-[#4E342E]/50 font-medium">
        {label}
      </span>
    </div>
    <p className="text-2xl font-semibold text-[#4E342E]">{value}</p>
  </div>
);

export default AtelierDashboard;
