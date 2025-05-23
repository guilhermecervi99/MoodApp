// src/components/home/QuickStats.jsx
import React from 'react';
import { Heart, TrendingUp, Sparkles } from 'lucide-react';
import { COLORS } from '../../utils/constants';
import { useMoodStats } from '../../hooks/useMoodStats';

const QuickStats = () => {
  const { totalDays, happyPercentage, currentStreak } = useMoodStats();

  const stats = [
    {
      icon: Heart,
      value: totalDays,
      label: 'Dias registrados',
      color: COLORS.error
    },
    {
      icon: TrendingUp,
      value: `${happyPercentage}%`,
      label: 'Dias felizes',
      color: COLORS.success
    },
    {
      icon: Sparkles,
      value: currentStreak,
      label: 'Sequência',
      color: COLORS.warning
    }
  ];

  return (
    <div className="w-full mb-6 grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="p-3 sm:p-4 rounded-xl text-center bg-white shadow-sm">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" 
                  style={{ color: stat.color }} />
            <p className="text-lg sm:text-2xl font-bold" style={{ color: COLORS.text }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: COLORS.textLight }}>
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;