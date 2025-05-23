// src/pages/Tips.jsx
import React from 'react';
import { Brain } from 'lucide-react';
import Header from '../components/layout/Header';
import TipCard from '../components/tips/TipCard';
import { COLORS } from '../utils/constants';
import { useApp } from '../contexts/AppContext';

const Tips = () => {
  const { setCurrentScreen } = useApp();

  const tips = [
    {
      title: 'Pratique a respiração profunda e consciente',
      description: 'A respiração profunda ativa o sistema nervoso parassimpático, responsável pela sensação de calma e relaxamento. Técnicas como a respiração 4-7-8 (inspire por 4 segundos, segure por 7, expire por 8) ajudam a reduzir a frequência cardíaca e os níveis de cortisol, o hormônio do estresse.',
      source: 'Harvard Medical School – Relaxation techniques'
    },
    {
      title: 'Exercite-se regularmente',
      description: 'A atividade física libera endorfinas e outros neurotransmissores como a dopamina e a serotonina, que têm efeito antidepressivo e ansiolítico natural. Caminhadas diárias de 30 minutos, por exemplo, já mostram efeito significativo.'
    },
    {
      title: 'Mantenha uma rotina de sono saudável',
      description: 'O sono de qualidade é fundamental para regular o humor e reduzir a ansiedade. Tente dormir e acordar nos mesmos horários todos os dias.'
    },
    {
      title: 'Pratique mindfulness e meditação',
      description: 'Apenas 10 minutos diários de meditação podem reduzir significativamente os níveis de estresse e ansiedade.'
    },
    {
      title: 'Conecte-se com outras pessoas',
      description: 'O apoio social é um fator protetor importante para a saúde mental. Converse com amigos, familiares ou participe de grupos de apoio.'
    }
  ];

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <Header 
        title="Dicas" 
        icon={Brain} 
        onBack={() => setCurrentScreen('evolution')}
      />

      <div className="max-w-2xl mx-auto px-4 pb-24">
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: `${COLORS.primary}20` }}>
          <h2 className="text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: COLORS.primary }}>
            <span className="text-xl sm:text-2xl">💡</span>
            5 Dicas Comprovadas para Melhorar a Ansiedade e o Estresse
          </h2>
        </div>

        <div className="space-y-4">
          {tips.map((tip, index) => (
            <TipCard key={index} number={index + 1} {...tip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tips;