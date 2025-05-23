// src/pages/Evolution.jsx
import React from 'react';
import { Activity } from 'lucide-react';
import Header from '../components/layout/Header';
import MoodChart from '../components/evolution/MoodChart';
import TrendChart from '../components/evolution/TrendChart';
import CallToAction from '../components/evolution/CallToAction.jsx';
import { COLORS } from '../utils/constants';

const Evolution = () => {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <Header title="Minha Evolução" icon={Activity} />

      <div className="max-w-2xl mx-auto px-4 pb-24">
        <MoodChart />
        <TrendChart />
        <CallToAction />
      </div>
    </div>
  );
};

export default Evolution;