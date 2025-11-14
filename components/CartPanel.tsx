import React from 'react';
import type { CartItem as CartItemType } from '../types';
import { CartItem } from './CartItem';
import { CloseIcon } from './icons/CloseIcon';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemType[];
  onRemoveItem: (productName: string) => void;
  onCheckout: () => void;
  total: number;
}

export const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout, total }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 w-full max-w-md h-full bg-gray-800/80 backdrop-blur-lg shadow-2xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-5 border-b border-gray-700/50">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Your Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-transform duration-300 hover:rotate-90">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center py-10">Your cart is empty</p>
            ) : (
              cartItems.map((item, index) => (
                <CartItem key={item.name} item={item} onRemove={onRemoveItem} index={index} />
              ))
            )}
          </div>
          <div className="p-5 border-t border-gray-700/50">
            <div className="flex justify-between items-center text-xl font-bold mb-4">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button
              onClick={onCheckout}
              disabled={cartItems.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
