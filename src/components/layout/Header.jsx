// src/components/layout/Header.jsx
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { COLORS } from '../../utils/constants';
import { useApp } from '../../contexts/AppContext';

const Header = ({ title, icon: Icon, showBack = true, onBack }) => {
  const { setCurrentScreen } = useApp();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setCurrentScreen('home');
    }
  };

  return (
    <div className="w-full bg-white shadow-sm p-4 mb-6">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {showBack ? (
          <button onClick={handleBack}>
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: COLORS.text }} />
          </button>
        ) : (
          <div className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
        <h1 className="text-base sm:text-lg font-semibold" style={{ color: COLORS.text }}>{title}</h1>
        {Icon ? (
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: COLORS.primary }} />
        ) : (
          <div className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </div>
    </div>
  );
};

export default Header;