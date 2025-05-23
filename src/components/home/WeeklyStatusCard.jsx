// src/components/home/WeeklyStatusCard.jsx
import React from 'react';
import { COLORS, MOODS } from '../../utils/constants';
import { useApp } from '../../contexts/AppContext';
import { getWeekDays } from '../../utils/dateHelpers';

const WeeklyStatusCard = () => {
  const { moodHistory } = useApp();
  const currentDate = new Date();
  const weekDays = getWeekDays(currentDate, moodHistory);
  
  // Calcular o humor mais frequente da semana
  const getWeeklyMood = () => {
    const moodCounts = {};
    
    weekDays.forEach(day => {
      const entry = moodHistory[day.dateStr];
      if (entry?.mood) {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      }
    });

    let maxMood = 'ansioso';
    let maxCount = 0;
    
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxMood = mood;
      }
    });

    return maxMood;
  };

  const weeklyMood = getWeeklyMood();
  const moodDetails = MOODS.find(m => m.value === weeklyMood) || MOODS[1];

  return (
    <div className="w-full mb-6 p-5 sm:p-6 rounded-2xl shadow-lg transition-all duration-500" 
         style={{ backgroundColor: moodDetails.color }}>
      <p className="text-xs sm:text-sm font-medium text-white mb-2">
        Nos últimos 7 dias, você tem se sentido:
      </p>
      <div className="flex items-center gap-3">
        <span className="text-2xl sm:text-3xl">{moodDetails.icon}</span>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {moodDetails.label.toUpperCase()}
        </h3>
      </div>
    </div>
  );
};

export default WeeklyStatusCard;