// src/components/questionnaire/WakeUpSelector.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { COLORS } from '../../utils/constants';

const WakeUpSelector = ({ value, onChange }) => {
  const options = [
    { value: 'disposto', label: 'Disposto', icon: Sun, color: COLORS.warning },
    { value: 'indisposto', label: 'Indisposto', icon: Moon, color: COLORS.textLight }
  ];

  return (
    <>
      <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: `${COLORS.primary}20` }}>
        <h3 className="font-semibold text-sm sm:text-base" style={{ color: COLORS.primary }}>
          2. Como você se sentiu ao acordar?
        </h3>
      </div>
      
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl bg-white shadow-sm">
        <div className="space-y-2 sm:space-y-3">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <label key={option.value}
                     className="flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="wakeUp"
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-4 h-4 sm:w-5 sm:h-5 accent-purple-600"
                />
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: option.color }} />
                <span className="font-medium text-sm sm:text-base" style={{ color: COLORS.text }}>
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WakeUpSelector;