import React from 'react';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onCartClick: () => void;
  onMarketIndexClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, cartTotal, onCartClick, onMarketIndexClick }) => {
  return (
    <header className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-700/50">
      <h1 className="text-4xl font-bold text-red-500 animate-slideInUp" style={{ fontFamily: "'Orbitron', sans-serif" }}>slaveshop.cz</h1>
      <div className="flex items-center space-x-4 animate-slideInUp" style={{ animationDelay: '100ms' }}>
         <button
          onClick={onMarketIndexClick}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-500/10"
        >
          <ChartBarIcon className="h-5 w-5 mr-2" />
          Market Index
        </button>
        <button
          onClick={onCartClick}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/20"
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          Cart (<span className="tabular-nums">{cartCount}</span>)
        </button>
        <span className="text-lg text-gray-300 hidden md:inline">Total: $<span className="tabular-nums">{cartTotal.toLocaleString()}</span></span>
      </div>
    </header>
  );
};