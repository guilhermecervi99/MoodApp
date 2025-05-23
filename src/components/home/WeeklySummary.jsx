// src/components/home/WeeklySummary.jsx
import React from 'react';
import { COLORS, MOODS } from '../../utils/constants';
import { useApp } from '../../contexts/AppContext';
import { getWeekDays } from '../../utils/dateHelpers';

const WeeklySummary = () => {
  const { moodHistory } = useApp();
  const currentDate = new Date();
  const weekDays = getWeekDays(currentDate, moodHistory);

  return (
    <div className="w-full mb-6">
      <h3 className="text-base sm:text-lg font-semibold mb-3" style={{ color: COLORS.text }}>
        Sua Semana
      </h3>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {weekDays.map((day, index) => {
          const moodData = moodHistory[day.dateStr];
          const mood = MOODS.find(m => m.value === moodData?.mood);
          const icon = mood ? mood.icon : (day.isToday ? '❓' : '➖');
          
          return (
            <div key={index} className="w-full">
              <div 
                className="p-2 sm:p-3 rounded-lg sm:rounded-xl text-center transition-all hover:scale-105"
                style={{ 
                  backgroundColor: day.isToday ? COLORS.primary : COLORS.surface,
                  boxShadow: day.isToday ? '0 4px 12px rgba(124, 58, 237, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <p className="text-xs font-medium mb-1 capitalize" 
                   style={{ color: day.isToday ? 'white' : COLORS.textLight }}>
                  {day.day}
                </p>
                <span className="text-lg sm:text-2xl">{icon}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklySummary;