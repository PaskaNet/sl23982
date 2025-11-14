import React from 'react';
import type { Product } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  product: Product | null;
}

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onAddToCart, product }) => {
    if (!product) return null;

    const isDiscounted = product.originalPrice && product.originalPrice > product.price;

    const handleAddToCartClick = () => {
        onAddToCart(product);
        onClose(); // Close modal after adding to cart
    }

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-80 z-[60] flex justify-center items-center p-4 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`relative bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 p-8 rounded-lg w-full max-w-md text-center shadow-2xl transition-all duration-500 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-transform duration-300 hover:rotate-90 z-10">
                    <CloseIcon className="h-6 w-6" />
                </button>
                
                {isDiscounted ? (
                     <h2 className="text-2xl font-bold mb-2 text-red-500" style={{ fontFamily: "'Orbitron', sans-serif" }}>Special Offer!</h2>
                ) : (
                    <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>Featured Product</h2>
                )}

                <p className="mb-4 text-gray-400">A special selection just for you.</p>

                <div className="my-6">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md shadow-lg"/>
                </div>

                <h3 className="text-xl font-bold">{product.name}</h3>

                <div className="flex justify-center items-baseline gap-3 my-4">
                    {isDiscounted && (
                    <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice?.toLocaleString()}
                    </span>
                    )}
                    <span className="text-3xl font-bold text-red-400">
                    ${product.price.toLocaleString()}
                    </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button onClick={handleAddToCartClick} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md shadow-red-500/20 order-1 sm:order-2">
                        Add to Cart
                    </button>
                    <button onClick={onClose} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 order-2 sm:order-1">
                        Continue Browsing
                    </button>
                </div>
            </div>
        </div>
    );
};
