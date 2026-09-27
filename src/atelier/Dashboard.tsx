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

  const recentProducts = products.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft size={12} /> Store
            </Link>
            <span className="text-gray-700">|</span>
            <h1 className="font-['Playfair_Display'] text-xl tracking-[0.15em]">
              ATELIER
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-[0.15em]"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-14">
          <StatCard icon={<Package size={18} />} label="Total Products" value={products.length} />
          <StatCard icon={<Tag size={18} />} label="Active" value={activeProducts.length} />
          <StatCard icon={<Package size={18} />} label="Hidden" value={hiddenProducts.length} />
          <StatCard icon={<Clock size={18} />} label="New Arrivals" value={newArrivals.length} />
          <StatCard icon={<Star size={18} />} label="Featured" value={featuredProducts.length} />
        </div>

        {/* Categories */}
        <div className="mb-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-black font-medium mb-6">
            Product Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <span
                  key={cat}
                  className="px-5 py-3 bg-gray-50 border border-gray-100 text-sm text-black"
                >
                  {cat} <span className="text-gray-400">({count})</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Recent Products */}
        <div className="mb-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-black font-medium mb-6">
            Recently Added Products
          </h2>
          <div className="bg-gray-50 border border-gray-100 divide-y divide-gray-100">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-black">{product.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-black">{formatPrice(product.price)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Management Info */}
        <div className="bg-gray-50 border border-gray-100 p-8 sm:p-10">
          <h2 className="text-sm uppercase tracking-[0.2em] text-black font-medium mb-6">
            Product Management
          </h2>
          <div className="space-y-5 text-sm text-gray-600">
            <p>
              Products are managed through the GitHub product data file. To add or modify products:
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-2">
              <li>Add product images to <code className="bg-white px-2 py-0.5 text-xs border border-gray-200">public/products/[product-name]/</code></li>
              <li>Add/edit product data in <code className="bg-white px-2 py-0.5 text-xs border border-gray-200">src/data/products.ts</code></li>
              <li>Commit changes to GitHub</li>
              <li>Netlify automatically deploys the updates</li>
            </ol>

            <div className="mt-8 p-6 bg-white border border-gray-100">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-4">
                Product Template
              </p>
              <pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
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

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number }> = ({
  icon,
  label,
  value,
}) => (
  <div className="bg-gray-50 border border-gray-100 p-6">
    <div className="flex items-center gap-3 text-black mb-3">
      {icon}
      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
        {label}
      </span>
    </div>
    <p className="text-3xl font-semibold text-black">{value}</p>
  </div>
);

export default AtelierDashboard;
