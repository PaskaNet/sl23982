import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onTrackOrder }) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 p-10 rounded-lg text-center max-w-sm shadow-2xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="mx-auto mb-5 bg-green-500 h-16 w-16 rounded-full flex items-center justify-center animate-fadeInScaleUp">
          <CheckIcon className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mt-0" style={{ fontFamily: "'Orbitron', sans-serif" }}>Purchase Successful!</h2>
        <p className="my-4 text-gray-400">Thank you for your purchase. Your order has been processed.</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onTrackOrder}
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/20"
          >
            Track Your Order
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/20"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};