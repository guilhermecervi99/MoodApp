// src/components/home/DailyCheckCard.jsx
import React from 'react';
import { Brain } from 'lucide-react';
import { COLORS } from '../../utils/constants';
import { useApp } from '../../contexts/AppContext';

const DailyCheckCard = () => {
  const { setCurrentScreen, showDailyCheck } = useApp();

  if (!showDailyCheck) return null;

  return (
    <div className="w-full mb-6 p-6 rounded-2xl shadow-lg bg-white animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center" 
             style={{ backgroundColor: `${COLORS.primary}20` }}>
          <Brain className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: COLORS.primary }} />
        </div>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-3" style={{ color: COLORS.text }}>
        Humor Diário
      </h2>
      
      <p className="text-center text-sm sm:text-base mb-2" style={{ color: COLORS.text }}>
        Como está se sentindo hoje?
      </p>
      <p className="text-center text-xs sm:text-sm mb-6" style={{ color: COLORS.textLight }}>
        Responda a 5 questões rápidas para registrar seu dia
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex-1 py-3 px-4 sm:px-6 rounded-full border-2 transition-all hover:opacity-80 text-sm sm:text-base"
          style={{ borderColor: COLORS.textLight, color: COLORS.textLight }}
        >
          Hoje Não
        </button>
        <button
          onClick={() => setCurrentScreen('questionnaire')}
          className="flex-1 py-3 px-4 sm:px-6 rounded-full text-white font-semibold transition-all hover:opacity-90 shadow-lg text-sm sm:text-base"
          style={{ backgroundColor: COLORS.primary }}
        >
          Vamos lá!
        </button>
      </div>
    </div>
  );
};

export default DailyCheckCard;