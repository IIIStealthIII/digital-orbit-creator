
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-tron-background flex flex-col items-center justify-center p-4">
      <div className="tron-grid"></div>
      
      <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text">404</h1>
      
      <div className="w-20 h-1 bg-tron-cyan mb-6 glow-border"></div>
      
      <p className="text-xl md:text-2xl mb-8 text-tron-cyan">
        Program not found. Returning to system entry point.
      </p>
      
      <Link 
        to="/" 
        className="tron-button px-8 py-3 text-lg transition-all duration-500 hover:scale-105"
      >
        Return to Grid
      </Link>
    </div>
  );
};

export default NotFound;
