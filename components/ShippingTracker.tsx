import React, { useEffect, useState } from 'react';

interface ShippingTrackerProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUSES = ["Order Confirmed", "Processing at Origin", "In Transit", "Out for Delivery", "Delivered"];

export const ShippingTracker: React.FC<ShippingTrackerProps> = ({ isOpen, onClose }) => {
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setCurrentStatusIndex(0);
            const interval = setInterval(() => {
                setCurrentStatusIndex(prev => {
                    if (prev < STATUSES.length - 1) {
                        return prev + 1;
                    }
                    clearInterval(interval);
                    return prev;
                });
            }, 2000); // Update status every 2 seconds
            return () => clearInterval(interval);
        }
    }, [isOpen]);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className={`relative bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 p-8 rounded-lg w-full max-w-3xl text-center shadow-2xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Order Tracking</h2>
        <p className="mb-6 text-gray-400">Your order is on its way!</p>

        <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
            <svg viewBox="0 0 800 400" className="w-full h-auto">
                <path d="M10,200 L790,200" fill="none" stroke="#4a5568" strokeWidth="2"/>
                <path
                    d="M150,250 C 250,100, 550,100, 650,250"
                    id="shipping-path"
                    fill="none"
                    stroke="#4a5568"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                />
                {isOpen && (
                    <>
                        <path
                            d="M150,250 C 250,100, 550,100, 650,250"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3"
                            style={{
                                strokeDasharray: 800,
                                strokeDashoffset: 800,
                                animation: 'draw-line 8s linear forwards',
                                animationDelay: '1s'
                            }}
                        />
                        <circle cx="0" cy="0" r="8" fill="#ef4444" className="shadow-lg">
                            <animateMotion dur="8s" begin="1s" fill="freeze" repeatCount="1">
                                <mpath href="#shipping-path"/>
                            </animateMotion>
                        </circle>
                    </>
                )}
                <circle cx="150" cy="250" r="10" fill="#34d399"/>
                <text x="150" y="275" textAnchor="middle" fill="white" fontSize="12">Origin</text>
                <circle cx="650" cy="250" r="10" fill="#3b82f6"/>
                <text x="650" y="275" textAnchor="middle" fill="white" fontSize="12">Destination</text>
            </svg>
        </div>
        
        <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-200">{STATUSES[currentStatusIndex]}</h3>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div className="bg-green-500 h-2.5 rounded-full transition-all duration-1000" style={{width: `${(currentStatusIndex / (STATUSES.length - 1)) * 100}%`}}></div>
            </div>
        </div>

        <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105">
          Close
        </button>
      </div>
    </div>
  );
};