import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

export const MultiSelect = ({ label, error, className = '', options = [], value = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optValue) => {
    const newValue = value.includes(optValue)
      ? value.filter(v => v !== optValue)
      : [...value, optValue];
    if (onChange) onChange(newValue);
  };

  const removeOption = (e, optValue) => {
    e.stopPropagation();
    if (onChange) onChange(value.filter(v => v !== optValue));
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`} ref={containerRef}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex min-h-[48px] w-full items-center rounded-xl border bg-slate-50 pl-3 pr-11 py-1.5 text-[15px] cursor-pointer focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm ${
            error 
              ? 'border-red-300 focus:ring-red-500/20' 
              : isOpen ? 'border-teal-600 ring-2 ring-teal-600/20 bg-white' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex flex-wrap gap-1.5 flex-1">
            {value.length === 0 && <span className="text-gray-400 py-1 ml-1">Select options...</span>}
            {value.map(val => {
              const option = options.find(o => o.value === val);
              return (
                <span key={val} className="flex items-center gap-1 bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md text-sm border border-teal-200">
                  {option ? option.label : val}
                  <button type="button" onClick={(e) => removeOption(e, val)} className="text-teal-600 hover:text-teal-900 rounded-full hover:bg-teal-200 p-0.5 ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto py-1">
            {options.map((opt) => {
              const isSelected = value.includes(opt.value);
              return (
                <div 
                  key={opt.value}
                  onClick={() => toggleOption(opt.value)}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 cursor-pointer text-[15px]"
                >
                  <span className={isSelected ? 'font-medium text-teal-700' : 'text-gray-700'}>{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-teal-600" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {error && <span className="text-xs font-medium text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};
