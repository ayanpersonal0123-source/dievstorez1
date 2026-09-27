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
      <main className="min-h-screen pt-24 pb-20 bg-[#FFF8F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-3xl text-[#4E342E] mb-4">
            Product Not Found
          </h1>
          <p className="text-[#4E342E]/60 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-[#C97B63] hover:underline uppercase tracking-wider"
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
    <main className="min-h-screen pt-20 sm:pt-24 pb-20 bg-[#FFF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#4E342E]/50 hover:text-[#C97B63] transition-colors"
          >
            <ArrowLeft size={12} /> Back to Shop
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-[#F3E9D9] overflow-hidden">
              <ImagePlaceholder
                src={product.images[selectedImage] || ''}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-[#F3E9D9] overflow-hidden border-2 transition-colors ${
                      idx === selectedImage ? 'border-[#C97B63]' : 'border-transparent'
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
          <div className="space-y-6 lg:py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#C97B63] font-medium mb-2">
                {product.category}
              </p>
              <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-[#4E342E] mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold text-[#4E342E]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#4E342E]/40 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-[#C97B63]/10 text-[#C97B63] text-xs font-medium px-2 py-1">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            <p className="text-[#4E342E]/70 leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.map((variant) => (
              <div key={variant.name}>
                <p className="text-xs uppercase tracking-wider text-[#4E342E]/60 font-medium mb-3">
                  {variant.name}: {selectedVariants[variant.name] || 'Select'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        setSelectedVariants((prev) => ({ ...prev, [variant.name]: option }))
                      }
                      className={`px-4 py-2 text-xs border transition-colors ${
                        selectedVariants[variant.name] === option
                          ? 'border-[#C97B63] bg-[#C97B63] text-white'
                          : 'border-[#E6B89C]/40 text-[#4E342E]/70 hover:border-[#C97B63]'
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
                <p className="text-xs uppercase tracking-wider text-[#4E342E]/60 font-medium mb-3">
                  Color: {selectedColor || 'Select'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs border transition-colors ${
                        selectedColor === color
                          ? 'border-[#C97B63] bg-[#C97B63] text-white'
                          : 'border-[#E6B89C]/40 text-[#4E342E]/70 hover:border-[#C97B63]'
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
              <p className="text-xs uppercase tracking-wider text-[#4E342E]/60 font-medium mb-3">
                Quantity
              </p>
              <div className="flex items-center border border-[#E6B89C]/40 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#4E342E]/60 hover:text-[#4E342E] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-medium text-[#4E342E] min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 text-[#4E342E]/60 hover:text-[#4E342E] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <span className="text-xs text-green-700 bg-green-50 px-2 py-1">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-xs text-red-700 bg-red-50 px-2 py-1">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Shipping */}
            <div className="flex items-center gap-2 text-sm text-[#4E342E]/60 py-3 border-t border-[#E6B89C]/20">
              <Truck size={16} />
              <span>Shipping: {formatPrice(product.shippingCharge)}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-[#4E342E] text-white py-4 text-sm uppercase tracking-[0.1em] font-medium hover:bg-[#C97B63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#4E342E] text-[#4E342E] py-4 text-sm uppercase tracking-[0.1em] font-medium hover:bg-[#4E342E] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
