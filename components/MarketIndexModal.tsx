import React, { useState, useEffect } from 'react';

interface MarketIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// FIX: Added `isOpen` prop to the Chart component to properly control the data update interval.
const Chart: React.FC<{ initialData: number[]; title: string; color: string; isOpen: boolean }> = ({ initialData, title, color, isOpen }) => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        if (!isOpen) return;
        const interval = setInterval(() => {
            setData(currentData => {
                const lastPoint = currentData[currentData.length - 1];
                const fluctuation = Math.random() * 20 - 10;
                const nextPoint = Math.max(30, Math.min(200, lastPoint + fluctuation)); // Keep within bounds
                return [...currentData.slice(1), nextPoint];
            });
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [isOpen]);

    const width = 300;
    const height = 150;
    const maxVal = 220; // Use a fixed max value for a stable y-axis
    const pathData = data.map((d, i) => 
        `${i === 0 ? 'M' : 'L'} ${(i / (data.length - 1)) * width},${height - (d / maxVal) * (height - 20) - 10}`
    ).join(' ');

    return (
        <div className="bg-gray-700/50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h3>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                <path
                    d={pathData}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    style={{ transition: 'd 400ms linear' }}
                />
            </svg>
        </div>
    );
};

export const MarketIndexModal: React.FC<MarketIndexModalProps> = ({ isOpen, onClose }) => {
    const pastData = [60, 80, 75, 90, 110, 105, 120, 130, 125, 115, 122, 135];
    const futureData = [135, 140, 138, 150, 160, 155, 170, 165, 175, 180, 172, 185];

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div 
            className={`relative bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 p-8 rounded-lg w-full max-w-2xl text-center shadow-2xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Live Market Index</h2>
            <p className="mb-6 text-gray-400">Real-time fictional price trends based on simulated data.</p>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* FIX: Passed the `isOpen` prop to the Chart component. */}
                <Chart initialData={pastData} title="Past Market Performance" color="#f87171" isOpen={isOpen} />
                <Chart initialData={futureData} title="Future Projections" color="#34d399" isOpen={isOpen} />
            </div>
    
            <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105">
              Close
            </button>
          </div>
        </div>
      );
};
