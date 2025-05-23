// src/components/tips/TipCard.jsx
import React from 'react';
import { COLORS } from '../../utils/constants';

const TipCard = ({ number, title, description, source }) => {
  return (
    <div className="p-4 rounded-xl bg-white shadow-sm">
      <h3 className="font-bold text-sm sm:text-base mb-2" style={{ color: COLORS.text }}>
        {number}. {title}
      </h3>
      <p className="text-xs sm:text-sm mb-2" style={{ color: COLORS.textLight }}>
        {description}
      </p>
      {source && (
        <p className="text-xs italic" style={{ color: COLORS.textLight }}>
          Fonte: {source}
        </p>
      )}
    </div>
  );
};

export default TipCard;