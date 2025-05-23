// src/utils/dateHelpers.js
import { format, startOfWeek, addDays, isToday, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDateFull = (date) => {
  return format(date, "EEEE, d 'de' MMMM yyyy", { locale: ptBR });
};

export const getWeekDays = (currentDate, moodHistory) => {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const moodData = moodHistory[dateStr];
    
    return {
      date,
      day: format(date, 'EEE', { locale: ptBR }),
      isToday: isToday(date),
      mood: moodData?.mood || (isToday(date) ? 'hoje' : null),
      dateStr
    };
  });
};

export const getLast30Days = (currentDate) => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = subDays(currentDate, 29 - i);
    return format(date, 'yyyy-MM-dd');
  });
};

export const getTodayString = () => format(new Date(), 'yyyy-MM-dd');