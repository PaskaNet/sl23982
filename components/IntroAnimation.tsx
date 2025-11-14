import React from 'react';

export const IntroAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex justify-center items-center z-[100] animate-backgroundPan">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-red-500 animate-fadeInScaleUp" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          slaveshop.cz
        </h1>
        <p className="text-gray-400 mt-4 animate-fadeIn" style={{ animationDelay: '500ms', fontFamily: "'Poppins', sans-serif" }}>
          Loading the experience...
        </p>
      </div>
    </div>
  );
};
