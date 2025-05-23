// src/components/evolution/MoodChart.jsx
import React from 'react';
import { COLORS } from '../../utils/constants';
import { useMoodStats } from '../../hooks/useMoodStats';

const MoodChart = () => {
  const { moodStats } = useMoodStats();
  const total = moodStats.total || 1;

  const data = [
    { label: 'Feliz', value: moodStats.feliz, color: COLORS.secondary },
    { label: 'Ansioso', value: moodStats.ansioso, color: COLORS.warning },
    { label: 'Deprimido', value: moodStats.deprimido, color: COLORS.tertiary }
  ];

  // Calcular offsets para o gráfico circular
  let cumulativeOffset = 0;
  const chartData = data.map(item => {
    const percentage = (item.value / total) * 100;
    const strokeDasharray = `${(percentage / 100) * 502.65} 502.65`;
    const strokeDashoffset = `-${(cumulativeOffset / 100) * 502.65}`;
    cumulativeOffset += percentage;
    
    return { ...item, strokeDasharray, strokeDashoffset, percentage };
  });

  return (
    <div className="w-full mb-6 p-4 sm:p-6 rounded-2xl shadow-lg bg-white">
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f4f6" strokeWidth="20" />
          {chartData.map((item, index) => (
            <circle
              key={index}
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={item.color}
              strokeWidth="20"
              strokeDasharray={item.strokeDasharray}
              strokeDashoffset={item.strokeDashoffset}
              transform="rotate(-90 100 100)"
              className="transition-all duration-500"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <p className="text-xs sm:text-sm text-center" style={{ color: COLORS.textLight }}>
            NOS ÚLTIMOS 30 DIAS,<br />VOCÊ SE DEFINIU COMO:
          </p>
        </div>
      </div>

      {/* Legenda */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" 
                   style={{ backgroundColor: item.color }}></div>
              <span className="font-medium text-sm sm:text-base" style={{ color: COLORS.text }}>
                {item.label}
              </span>
            </div>
            <span className="text-sm sm:text-base" style={{ color: COLORS.textLight }}>
              {item.value} dias
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodChart;