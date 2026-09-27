import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Minus, Plus, Truck } from 'lucide-react';
import { getProductBySlug } from '../data/products';
import { useCart } from '../context/CartContext';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { formatPrice } from '../utils/shipping';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = getProductBySlug(slug || '');

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedColor, setSelectedColor] = useState<string>('');

  if (!product) {
    return (
      <main className="min-h-screen pt-32 pb-28 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-4xl text-black mb-6">
            Product Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-black hover:underline uppercase tracking-[0.15em]"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariants, selectedColor);
    navigate('/cart');
  };

  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={12} /> Back to Shop
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-5">
            <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
              <ImagePlaceholder
                src={product.images[selectedImage] || ''}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-50 overflow-hidden border-2 transition-colors ${
                      idx === selectedImage ? 'border-black' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <ImagePlaceholder
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8 lg:py-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-3">
                {product.category}
              </p>
              <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-black mb-6">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-semibold text-black">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-gray-100 text-black text-xs font-medium px-3 py-1.5">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.map((variant) => (
              <div key={variant.name}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-4">
                  {variant.name}: {selectedVariants[variant.name] || 'Select'}
                </p>
                <div className="flex flex-wrap gap-3">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        setSelectedVariants((prev) => ({ ...prev, [variant.name]: option }))
                      }
                      className={`px-5 py-3 text-xs border transition-colors ${
                        selectedVariants[variant.name] === option
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-600 hover:border-black'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-4">
                  Color: {selectedColor || 'Select'}
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-3 text-xs border transition-colors ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 text-gray-600 hover:border-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-4">
                Quantity
              </p>
              <div className="flex items-center border border-gray-200 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 text-gray-600 hover:text-black transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-6 text-sm font-medium text-black min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-4 text-gray-600 hover:text-black transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <span className="text-xs text-green-700 bg-green-50 px-3 py-1.5">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-xs text-red-700 bg-red-50 px-3 py-1.5">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Shipping */}
            <div className="flex items-center gap-3 text-sm text-gray-600 py-5 border-t border-gray-100">
              <Truck size={16} />
              <span>Shipping: {formatPrice(product.shippingCharge)}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-3 bg-black text-white py-5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-3 border-2 border-black text-black py-5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
