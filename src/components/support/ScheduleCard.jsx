// src/components/support/ScheduleCard.jsx
import React from 'react';
import { COLORS } from '../../utils/constants';

const ScheduleCard = () => {
  const handleSchedule = () => {
    // Em produção, abriria um modal de agendamento ou redirecionaria
    alert('Funcionalidade de agendamento em desenvolvimento');
  };

  return (
    <div className="w-full mb-6 p-5 sm:p-6 rounded-2xl bg-white shadow-sm">
      <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: COLORS.text }}>
        Caso deseje entrar em contato com nossa equipe e agendar um atendimento 
        com nossa equipe de psicólogos, use o botão abaixo:
      </p>
      <button 
        onClick={handleSchedule}
        className="w-full py-3 px-6 rounded-full text-white font-semibold shadow-lg transition-all hover:opacity-90 text-sm sm:text-base" 
        style={{ backgroundColor: COLORS.primary }}
      >
        Agendar Atendimento
      </button>
    </div>
  );
};

export default ScheduleCard;