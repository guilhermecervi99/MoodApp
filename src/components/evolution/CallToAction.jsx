// src/components/evolution/CallToAction.jsx
import React from 'react';
import { COLORS } from '../../utils/constants';
import { useApp } from '../../contexts/AppContext';

const CallToAction = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="w-full p-4 rounded-xl text-center" 
         style={{ backgroundColor: `${COLORS.primary}10` }}>
      <p className="mb-4 text-sm sm:text-base" style={{ color: COLORS.text }}>
        Acesse nossa aba de "Dicas" para receber conteúdos e melhorar o seu desempenho!
      </p>
      <button
        onClick={() => setCurrentScreen('tips')}
        className="px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all hover:opacity-90 text-sm sm:text-base"
        style={{ backgroundColor: COLORS.primary }}
      >
        → Ver Dicas
      </button>
    </div>
  );
};

export default CallToAction;