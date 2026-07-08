import React from 'react';
import { Calendar } from 'lucide-react';

export const DateSelector = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="relative group">
        <input
          type="date"
          className={`flex h-12 w-full rounded-xl border bg-slate-50 pl-4 pr-11 py-2 text-[15px] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:cursor-not-allowed disabled:opacity-50 appearance-none shadow-sm [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
            error 
              ? 'border-red-300 focus:ring-red-500/20' 
              : 'border-gray-200 focus:ring-teal-600/20 focus:border-teal-600 hover:border-gray-300'
          }`}
          {...props}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-teal-600 transition-colors">
          <Calendar className="w-5 h-5" />
        </div>
      </div>
      
      {error && <span className="text-xs font-medium text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};