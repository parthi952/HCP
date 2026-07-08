import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm focus:outline-none focus:ring-2 disabled:opacity-50 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-600/50 border border-transparent",
    outline: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 focus:ring-gray-200",
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
