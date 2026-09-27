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
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-5">
        <ImagePlaceholder
          src={product.images[0] || ''}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.newArrival && (
            <span className="bg-black text-white text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 font-medium">
              New
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-white text-black text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 font-medium border border-gray-200">
              -{product.discount}%
            </span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-black text-white text-xs uppercase tracking-[0.15em] px-5 py-2 font-medium">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-semibold text-black">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
