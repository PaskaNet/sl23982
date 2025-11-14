import React from 'react';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (productName: string) => void;
  index: number;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove, index }) => {
  return (
    <div 
        className="flex items-center p-3 rounded-md bg-gray-700/50 animate-slideInUp"
        style={{ animationDelay: `${index * 75}ms`, opacity: 0 }}
    >
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
      <div className="flex-grow">
        <div className="font-bold">{item.name}</div>
        <div className="text-sm text-gray-400">
          ${item.price.toLocaleString()} &times; {item.quantity}
        </div>
      </div>
      <div className="font-bold text-lg mr-4">${(item.price * item.quantity).toLocaleString()}</div>
      <button onClick={() => onRemove(item.name)} className="text-red-500 hover:text-red-400 transition-colors transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
