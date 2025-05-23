// src/components/support/EmergencyCard.jsx
import React from 'react';
import { COLORS } from '../../utils/constants';

const EmergencyCard = () => {
  const handleEmergencyCall = () => {
    // Em produção, poderia abrir o discador do telefone
    window.open('tel:188', '_self');
  };

  return (
    <div className="w-full mb-6 p-5 sm:p-6 rounded-2xl text-white" 
         style={{ backgroundColor: COLORS.text }}>
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
        Precisa de Ajuda imediata?
      </h2>
      <p className="mb-4 sm:mb-6 text-sm sm:text-base">
        Clique no botão abaixo para entrar em contato com Centro de Valorização à Vida
      </p>
      <button 
        onClick={handleEmergencyCall}
        className="w-full py-3 px-6 rounded-full bg-white font-semibold transition-all hover:opacity-90 text-sm sm:text-base" 
        style={{ color: COLORS.text }}
      >
        Ligar para CVV - 188
      </button>
    </div>
  );
};

export default EmergencyCard;