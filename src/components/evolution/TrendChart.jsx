// src/components/evolution/TrendChart.jsx
import React from 'react';
import { COLORS, MOODS } from '../../utils/constants';
import { useApp } from '../../contexts/AppContext';
import { getWeekDays } from '../../utils/dateHelpers';

const TrendChart = () => {
  const { moodHistory } = useApp();
  const currentDate = new Date();
  const weekDays = getWeekDays(currentDate, moodHistory);

  return (
    <div className="w-full mb-6 p-4 rounded-xl bg-white shadow-sm">
      <h3 className="font-semibold text-sm sm:text-base mb-3" style={{ color: COLORS.text }}>
        Tendência Semanal
      </h3>
      <div className="flex items-end justify-between h-24 sm:h-32 gap-1 sm:gap-2">
        {weekDays.map((day, index) => {
          const moodData = moodHistory[day.dateStr];
          const mood = MOODS.find(m => m.value === moodData?.mood);
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
              {mood ? (
                <div className="w-full flex flex-col items-center">
                  <span className="text-lg sm:text-2xl mb-1">{mood.icon}</span>
                </div>
              ) : (
                <div 
                  className="w-full rounded-t"
                  style={{ 
                    height: '20%', 
                    backgroundColor: COLORS.textLight + '20'
                  }}
                />
              )}
              <span className="text-xs mt-1" 
                    style={{ color: day.isToday ? COLORS.primary : COLORS.textLight }}>
                {day.day.slice(0, 3)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendChart;