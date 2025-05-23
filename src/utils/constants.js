// src/utils/constants.js
import { Home, BarChart3, FileText, HeartHandshake, Moon, Sun, Target } from 'lucide-react';

export const COLORS = {
  primary: '#7C3AED',
  secondary: '#EC4899',
  tertiary: '#06B6D4',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
  warning: '#F59E0B',
  success: '#10B981',
  error: '#EF4444'
};

export const MOODS = [
  { value: 'animado', label: 'Animado!', icon: '😊', color: COLORS.success },
  { value: 'ansioso', label: 'Ansioso', icon: '😰', color: COLORS.warning },
  { value: 'triste', label: 'Triste', icon: '😢', color: COLORS.error },
  { value: 'calmo', label: 'Calmo', icon: '😌', color: COLORS.primary },
  { value: 'feliz', label: 'Feliz', icon: '😄', color: COLORS.secondary }
];

export const NAVIGATION = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'evolution', label: 'Evolução', icon: BarChart3 },
  { id: 'questionnaire', label: 'Check-in', icon: FileText },
  { id: 'support', label: 'Apoio', icon: HeartHandshake }
];

export const INSIGHTS = [
  {
    title: 'Padrão de Sono',
    description: 'Você dorme melhor nos fins de semana',
    icon: Moon,
    color: COLORS.primary
  },
  {
    title: 'Melhor Dia',
    description: 'Sextas são seus dias mais felizes',
    icon: Sun,
    color: COLORS.warning
  },
  {
    title: 'Foco da Semana',
    description: 'Pratique exercícios de respiração',
    icon: Target,
    color: COLORS.success
  }
];

export const SLEEP_OPTIONS = [
  { value: '7-9h', label: '7-9h', icon: '😴' },
  { value: '4-7h', label: '4-7h', icon: '😪' },
  { value: 'menos-4h', label: 'Menos de 4h', icon: '😫' },
  { value: 'mais-9h', label: 'Mais de 9h', icon: '😊' }
];