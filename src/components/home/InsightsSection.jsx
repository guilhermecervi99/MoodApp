// src/components/home/InsightsSection.jsx
import React from 'react';
import { COLORS, INSIGHTS } from '../../utils/constants';

const InsightsSection = () => {
  return (
    <div className="w-full mb-6">
      <h3 className="text-base sm:text-lg font-semibold mb-3" style={{ color: COLORS.text }}>
        Insights da Semana
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {INSIGHTS.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div 
              key={index} 
              className="p-4 rounded-xl flex sm:flex-col items-center gap-3 sm:gap-2 transition-all hover:shadow-md bg-white"
            >
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${insight.color}20` }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: insight.color }} />
              </div>
              <div className="text-left sm:text-center">
                <h4 className="font-semibold text-xs sm:text-sm" style={{ color: COLORS.text }}>
                  {insight.title}
                </h4>
                <p className="text-xs mt-1" style={{ color: COLORS.textLight }}>
                  {insight.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsSection;