import React from 'react';

const AbstractBackground: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* Main gradient background - darker purple */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-purple-950 to-indigo-950"></div>
      
      {/* Subtle radial gradients for depth */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(120,50,200,0.3),transparent_60%)]"></div>
      <div className="absolute top-1/2 right-0 w-full h-full opacity-15 bg-[radial-gradient(circle_at_70%_60%,rgba(160,50,180,0.2),transparent_50%)]"></div>
      
      {/* Animated subtle gradient overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#4a1d96,#2e1065,#4a1d96)] bg-[length:400%_400%] animate-gradient-slow"></div>
      
      {/* Section dividers */}
      <div className="absolute top-[100vh] left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      <div className="absolute top-[200vh] left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
    </div>
  );
};

export default AbstractBackground;