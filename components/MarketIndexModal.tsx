import React from 'react';

interface MarketIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chart: React.FC<{ data: number[]; title: string; color: string }> = ({ data, title, color }) => {
  const width = 300;
  const height = 150;
  const maxVal = Math.max(...data);
  const points = data.map((d, i) => `${(i / (data.length - 1)) * width},${height - (d / maxVal) * (height - 20) - 10}`).join(' ');

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2 text-center" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h3>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                points={points}
                style={{
                    strokeDasharray: 500,
                    strokeDashoffset: 500,
                    animation: 'draw-line 2s ease-out forwards'
                }}
            />
        </svg>
    </div>
  );
};

export const MarketIndexModal: React.FC<MarketIndexModalProps> = ({ isOpen, onClose }) => {
    const pastData = [60, 80, 75, 90, 110, 105, 120, 130];
    const futureData = [130, 135, 140, 138, 150, 160, 155, 170];

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div 
            className={`relative bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 p-8 rounded-lg w-full max-w-2xl text-center shadow-2xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>Market Index</h2>
            <p className="mb-6 text-gray-400">Fictional price trends based on historical and projected data.</p>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Chart data={pastData} title="Past Market Performance" color="#f87171" />
                <Chart data={futureData} title="Future Projections" color="#34d399" />
            </div>
    
            <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105">
              Close
            </button>
          </div>
        </div>
      );
};