// src/components/support/ResourcesGrid.jsx
import React from 'react';
import { Clock, Users } from 'lucide-react';
import { COLORS } from '../../utils/constants';

const ResourcesGrid = () => {
  const resources = [
    {
      icon: Clock,
      title: 'Chat 24/7',
      description: 'Converse com nossos voluntários a qualquer hora',
      color: COLORS.primary
    },
    {
      icon: Users,
      title: 'Grupos de Apoio',
      description: 'Participe de grupos com pessoas que entendem você',
      color: COLORS.tertiary
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {resources.map((resource, index) => {
        const Icon = resource.icon;
        return (
          <div key={index} 
               className="p-4 rounded-xl flex items-center gap-3 bg-white shadow-sm cursor-pointer hover:shadow-md transition-all">
            <Icon className="w-5 h-5" style={{ color: resource.color }} />
            <div>
              <h4 className="font-semibold text-sm" style={{ color: COLORS.text }}>
                {resource.title}
              </h4>
              <p className="text-xs" style={{ color: COLORS.textLight }}>
                {resource.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResourcesGrid;