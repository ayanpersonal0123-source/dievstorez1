import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ImagePlaceholder from './ImagePlaceholder';
import { formatPrice } from '../utils/shipping';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F3E9D9] mb-4">
        <ImagePlaceholder
          src={product.images[0] || ''}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.newArrival && (
            <span className="bg-[#4E342E] text-white text-[10px] uppercase tracking-wider px-2.5 py-1 font-medium">
              New
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-[#C97B63] text-white text-[10px] uppercase tracking-wider px-2.5 py-1 font-medium">
              -{product.discount}%
            </span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#4E342E]/40 flex items-center justify-center">
            <span className="bg-white/90 text-[#4E342E] text-xs uppercase tracking-wider px-4 py-2 font-medium">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1.5">
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#4E342E]/50 font-medium">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-[#4E342E] group-hover:text-[#C97B63] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#4E342E]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#4E342E]/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
