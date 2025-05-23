// src/hooks/useMoodStats.js
import { useApp } from '../contexts/AppContext';
import { subDays, format } from 'date-fns';

export const useMoodStats = () => {
  const { moodHistory, dailyChecks } = useApp();
  
  // Calcular streak
  const calculateStreak = () => {
    let streak = 0;
    let checkDate = new Date();
    
    while (true) {
      const dateStr = format(checkDate, 'yyyy-MM-dd');
      if (dailyChecks[dateStr]) {
        streak++;
        checkDate = subDays(checkDate, 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Calcular estatísticas dos últimos 30 dias
  const calculateMoodStats = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i);
      return format(date, 'yyyy-MM-dd');
    });

    const stats = {
      feliz: 0,
      ansioso: 0,
      deprimido: 0,
      calmo: 0,
      animado: 0,
      triste: 0,
      total: 0
    };

    last30Days.forEach(dateStr => {
      const entry = moodHistory[dateStr];
      if (entry) {
        stats.total++;
        if (entry.mood === 'feliz' || entry.mood === 'animado') stats.feliz++;
        else if (entry.mood === 'ansioso') stats.ansioso++;
        else if (entry.mood === 'triste' || entry.mood === 'deprimido') stats.deprimido++;
        else if (entry.mood === 'calmo') stats.calmo++;
      }
    });

    return stats;
  };

  const stats = calculateMoodStats();
  const totalDays = Object.keys(dailyChecks).length;
  const happyPercentage = totalDays > 0 ? Math.round((stats.feliz / stats.total) * 100) : 0;

  return {
    currentStreak: calculateStreak(),
    totalDays,
    happyPercentage,
    moodStats: stats
  };
};