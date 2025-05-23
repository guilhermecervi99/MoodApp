// src/components/layout/Navigation.jsx
import React from 'react';
import { NAVIGATION, COLORS } from '../../utils/constants';
import { useApp } from '../../contexts/AppContext';

const Navigation = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  if (currentScreen === 'tips') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t" style={{ borderColor: COLORS.background }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-around items-center py-2">
          {NAVIGATION.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className="flex flex-col items-center gap-1 py-2 px-3 transition-all rounded-lg hover:bg-gray-50"
                style={{ minWidth: '64px' }}
              >
                <Icon 
                  className="w-5 h-5" 
                  style={{ color: isActive ? COLORS.primary : COLORS.textLight }}
                />
                <span 
                  className="text-xs font-medium" 
                  style={{ color: isActive ? COLORS.primary : COLORS.textLight }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navigation;