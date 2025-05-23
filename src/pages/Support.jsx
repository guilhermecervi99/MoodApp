// src/pages/Support.jsx
import React from 'react';
import { HeartHandshake } from 'lucide-react';
import Header from '../components/layout/Header';
import EmergencyCard from '../components/support/EmergencyCard';
import ScheduleCard from '../components/support/ScheduleCard';
import ResourcesGrid from '../components/support/ResourcesGrid';
import { COLORS } from '../utils/constants';

const Support = () => {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <Header title="Central de Apoio" icon={HeartHandshake} />

      <div className="max-w-2xl mx-auto px-4 pb-24">
        <EmergencyCard />
        <ScheduleCard />
        <ResourcesGrid />
        
        {/* Mensagem de encorajamento */}
        <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: `${COLORS.success}10` }}>
          <p className="text-xs sm:text-sm text-center" style={{ color: COLORS.text }}>
            Lembre-se: buscar ajuda é um ato de coragem. Você não está sozinho(a).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;