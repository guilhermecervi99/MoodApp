// src/components/questionnaire/SleepSelector.jsx
import React from 'react';
import { COLORS, SLEEP_OPTIONS } from '../../utils/constants';

const SleepSelector = ({ value, onChange }) => {
  return (
    <>
      <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: `${COLORS.primary}20` }}>
        <h3 className="font-semibold text-sm sm:text-base" style={{ color: COLORS.primary }}>
          3. Quantas horas de sono você teve?
        </h3>
      </div>
      
      <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl bg-white shadow-sm">
        <div className="space-y-2 sm:space-y-3">
          {SLEEP_OPTIONS.map((option) => (
            <label key={option.value}
                   className="flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all hover:bg-gray-50">
              <input
                type="radio"
                name="sleep"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 sm:w-5 sm:h-5 accent-purple-600"
              />
              <span className="text-xl sm:text-2xl">{option.icon}</span>
              <span className="font-medium text-sm sm:text-base" style={{ color: COLORS.text }}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default SleepSelector;