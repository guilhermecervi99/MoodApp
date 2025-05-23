// src/components/questionnaire/ProgressBar.jsx
import React from 'react';
import { COLORS } from '../../utils/constants';

const ProgressBar = ({ progress }) => {
  return (
    <div className="mb-6">
      <div className="h-2 rounded-full overflow-hidden" 
           style={{ backgroundColor: `${COLORS.primary}20` }}>
        <div 
          className="h-full transition-all duration-300" 
          style={{ 
            backgroundColor: COLORS.primary,
            width: `${progress}%`
          }}
        />
      </div>
      <p className="text-xs text-center mt-2" style={{ color: COLORS.textLight }}>
        {progress}% concluído
      </p>
    </div>
  );
};

export default ProgressBar;