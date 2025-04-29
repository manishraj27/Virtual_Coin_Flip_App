import React from 'react';

interface OptionInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const OptionInput: React.FC<OptionInputProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  disabled = false 
}) => {
  return (
    <div>
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-slate-300 mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={30}
        className="w-full bg-slate-700/70 border border-slate-600 rounded-lg px-4 py-2 text-white 
                  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-200"
        placeholder="Enter an option"
      />
    </div>
  );
};

export default OptionInput;