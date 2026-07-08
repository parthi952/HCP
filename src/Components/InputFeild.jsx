import React from 'react';

export const InputField = ({ label, type = 'text', error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      
      {type === 'textarea' ? (
        <textarea
          className={`flex min-h-[100px] w-full rounded-xl border bg-slate-50 px-4 py-3 text-[15px] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:cursor-not-allowed disabled:opacity-50 shadow-sm ${
            error 
              ? 'border-red-300 focus:ring-red-500/20' 
              : 'border-gray-200 focus:ring-teal-600/20 focus:border-teal-600 hover:border-gray-300'
          }`}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`flex h-12 w-full rounded-xl border bg-slate-50 px-4 py-2 text-[15px] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:cursor-not-allowed disabled:opacity-50 shadow-sm ${
            error 
              ? 'border-red-300 focus:ring-red-500/20' 
              : 'border-gray-200 focus:ring-teal-600/20 focus:border-teal-600 hover:border-gray-300'
          }`}
          {...props}
        />
      )}
      
      {error && <span className="text-xs font-medium text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};