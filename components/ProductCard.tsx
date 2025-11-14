import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, index }) => {
  const isDiscounted = product.originalPrice && product.originalPrice > product.price;

  return (
    <div 
      className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/30 transition-all duration-300 flex flex-col group animate-slideInUp border border-gray-700/50 hover:border-red-500/50"
      style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
    >
      {isDiscounted && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-lg">
          SALE
        </div>
      )}
      <div className="overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>{product.name}</h3>
        <p className="text-gray-400 mb-4">Age: {Math.floor(Math.random() * 15) + 18} years</p>
        <div className="mt-auto flex justify-between items-center">
          <div className="flex flex-col">
            {isDiscounted && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice?.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-bold text-red-400">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md shadow-red-500/20"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};