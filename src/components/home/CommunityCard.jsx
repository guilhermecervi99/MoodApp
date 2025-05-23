// src/components/home/CommunityCard.jsx
import React from 'react';
import { Users } from 'lucide-react';
import { COLORS } from '../../utils/constants';

const CommunityCard = () => {
  // Simular número de usuários ativos
  const activeUsers = 2847 + Math.floor(Math.random() * 100);

  return (
    <div className="w-full p-4 rounded-xl" style={{ backgroundColor: `${COLORS.tertiary}10` }}>
      <div className="flex items-center gap-3 mb-2">
        <Users className="w-5 h-5" style={{ color: COLORS.tertiary }} />
        <h3 className="font-semibold text-sm sm:text-base" style={{ color: COLORS.text }}>
          Comunidade
        </h3>
      </div>
      <p className="text-xs sm:text-sm" style={{ color: COLORS.textLight }}>
        Você não está sozinho! <strong>{activeUsers.toLocaleString('pt-BR')}</strong> pessoas 
        estão cuidando da saúde mental hoje.
      </p>
    </div>
  );
};

export default CommunityCard;