// src/components/MoodTrackerApp.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, Home, BarChart3, FileText, HeartHandshake, Smile, Brain, Activity, Moon, Sun, TrendingUp, Heart, Clock, Award, Sparkles, Target, Users } from 'lucide-react';
import { format, startOfWeek, addDays, isToday, parseISO, isSameDay, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MoodTrackerApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showDailyCheck, setShowDailyCheck] = useState(true);
  const [formData, setFormData] = useState({
    mood: '',
    wakeUpFeeling: '',
    sleepHours: ''
  });
  const [moodHistory, setMoodHistory] = useState(() => {
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : {};
  });
  const [dailyChecks, setDailyChecks] = useState(() => {
    const saved = localStorage.getItem('dailyChecks');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentDate] = useState(new Date());

  // Paleta de cores
  const colors = {
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

  const moods = [
    { value: 'animado', label: 'Animado!', icon: '😊', color: colors.success },
    { value: 'ansioso', label: 'Ansioso', icon: '😰', color: colors.warning },
    { value: 'triste', label: 'Triste', icon: '😢', color: colors.error },
    { value: 'calmo', label: 'Calmo', icon: '😌', color: colors.primary },
    { value: 'feliz', label: 'Feliz', icon: '😄', color: colors.secondary }
  ];

  const navigation = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'evolution', label: 'Evolução', icon: BarChart3 },
    { id: 'questionnaire', label: 'Check-in', icon: FileText },
    { id: 'support', label: 'Apoio', icon: HeartHandshake }
  ];

  const insights = [
    {
      title: 'Padrão de Sono',
      description: 'Você dorme melhor nos fins de semana',
      icon: Moon,
      color: colors.primary
    },
    {
      title: 'Melhor Dia',
      description: 'Sextas são seus dias mais felizes',
      icon: Sun,
      color: colors.warning
    },
    {
      title: 'Foco da Semana',
      description: 'Pratique exercícios de respiração',
      icon: Target,
      color: colors.success
    }
  ];

  // Funções de data
  const formatDateFull = (date) => {
    return format(date, "EEEE, d 'de' MMMM yyyy", { locale: ptBR });
  };

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(start, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const moodData = moodHistory[dateStr];
      
      return {
        date,
        day: format(date, 'EEE', { locale: ptBR }),
        isToday: isToday(date),
        mood: moodData?.mood || (isToday(date) ? 'hoje' : null),
        icon: moodData ? moods.find(m => m.value === moodData.mood)?.icon : (isToday(date) ? '❓' : '➖')
      };
    });
  };

  const calculateStreak = () => {
    let streak = 0;
    let checkDate = new Date();
    
    while (true) {
      const dateStr = format(checkDate, 'yyyy-MM-dd');
      if (dailyChecks[dateStr]) {
        streak++;
        checkDate = subDays(checkDate, 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateMoodStats = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(currentDate, 29 - i);
      return format(date, 'yyyy-MM-dd');
    });

    const stats = {
      feliz: 0,
      ansioso: 0,
      deprimido: 0,
      calmo: 0,
      animado: 0,
      triste: 0
    };

    last30Days.forEach(dateStr => {
      const entry = moodHistory[dateStr];
      if (entry) {
        if (entry.mood === 'feliz' || entry.mood === 'animado') stats.feliz++;
        else if (entry.mood === 'ansioso') stats.ansioso++;
        else if (entry.mood === 'triste' || entry.mood === 'deprimido') stats.deprimido++;
        else if (entry.mood === 'calmo') stats.calmo++;
      }
    });

    return stats;
  };

  const getWeeklyMood = () => {
    const weekDays = getWeekDays();
    const moodCounts = {};
    
    weekDays.forEach(day => {
      const dateStr = format(day.date, 'yyyy-MM-dd');
      const entry = moodHistory[dateStr];
      if (entry?.mood) {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      }
    });

    // Retorna o humor mais frequente da semana
    let maxMood = 'ansioso';
    let maxCount = 0;
    
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxMood = mood;
      }
    });

    return maxMood;
  };

  const getMoodDetails = (mood) => {
    const moodMap = {
      'ansioso': { icon: '😰', color: colors.warning, label: 'ANSIOSO' },
      'feliz': { icon: '😄', color: colors.secondary, label: 'FELIZ' },
      'animado': { icon: '😊', color: colors.success, label: 'ANIMADO' },
      'calmo': { icon: '😌', color: colors.primary, label: 'CALMO' },
      'triste': { icon: '😢', color: colors.error, label: 'TRISTE' }
    };
    return moodMap[mood] || moodMap['ansioso'];
  };

  // Efeitos
  useEffect(() => {
    const today = format(currentDate, 'yyyy-MM-dd');
    setShowDailyCheck(!dailyChecks[today]);
  }, [dailyChecks, currentDate]);

  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  useEffect(() => {
    localStorage.setItem('dailyChecks', JSON.stringify(dailyChecks));
  }, [dailyChecks]);

  // Handlers
  const handleStartQuestionnaire = () => {
    setShowDailyCheck(false);
    setCurrentScreen('questionnaire');
  };

  const handleFormSubmit = () => {
    const today = format(currentDate, 'yyyy-MM-dd');
    
    const newEntry = {
      ...formData,
      date: today,
      timestamp: new Date().toISOString()
    };
    
    setMoodHistory(prev => ({
      ...prev,
      [today]: newEntry
    }));
    
    setDailyChecks(prev => ({
      ...prev,
      [today]: true
    }));

    setFormData({ mood: '', wakeUpFeeling: '', sleepHours: '' });
    setCurrentScreen('home');
    setShowDailyCheck(false);
  };

  const renderHome = () => {
    const currentMoodDetails = getMoodDetails(getWeeklyMood());
    const weekDays = getWeekDays();
    const currentStreak = calculateStreak();
    const moodStats = calculateMoodStats();
    const totalDays = Object.keys(dailyChecks).length;
    
    return (
      <div className="w-full min-h-screen pb-20" style={{ backgroundColor: colors.background }}>
        {/* Header com data */}
        <div className="w-full bg-white shadow-sm p-4 mb-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: colors.textLight }}>
              <Calendar className="w-4 h-4" />
              <span className="capitalize truncate">{formatDateFull(currentDate)}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.warning }} />
              <span className="text-xs sm:text-sm font-semibold" style={{ color: colors.text }}>
                {currentStreak} dias
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4">
          {/* Card de Humor Diário */}
          {showDailyCheck && (
            <div className="w-full mb-6 p-6 rounded-2xl shadow-lg bg-white animate-fade-in">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}20` }}>
                  <Brain className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: colors.primary }} />
                </div>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-3" style={{ color: colors.text }}>
                Humor Diário
              </h2>
              
              <p className="text-center text-sm sm:text-base mb-2" style={{ color: colors.text }}>
                Como está se sentindo hoje?
              </p>
              <p className="text-center text-xs sm:text-sm mb-6" style={{ color: colors.textLight }}>
                Responda a 5 questões rápidas para registrar seu dia
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDailyCheck(false)}
                  className="flex-1 py-3 px-4 sm:px-6 rounded-full border-2 transition-all hover:opacity-80 text-sm sm:text-base"
                  style={{ borderColor: colors.textLight, color: colors.textLight }}
                >
                  Hoje Não
                </button>
                <button
                  onClick={handleStartQuestionnaire}
                  className="flex-1 py-3 px-4 sm:px-6 rounded-full text-white font-semibold transition-all hover:opacity-90 shadow-lg text-sm sm:text-base"
                  style={{ backgroundColor: colors.primary }}
                >
                  Vamos lá!
                </button>
              </div>
            </div>
          )}

          {/* Card de Status Semanal */}
          <div className="w-full mb-6 p-5 sm:p-6 rounded-2xl shadow-lg transition-all duration-500" style={{ backgroundColor: currentMoodDetails.color }}>
            <p className="text-xs sm:text-sm font-medium text-white mb-2">
              Nos últimos 7 dias, você tem se sentido:
            </p>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">{currentMoodDetails.icon}</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{currentMoodDetails.label}</h3>
            </div>
          </div>

          {/* Resumo Semanal */}
          <div className="w-full mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3" style={{ color: colors.text }}>
              Sua Semana
            </h3>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {weekDays.map((day, index) => (
                <div key={index} className="w-full">
                  <div 
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl text-center transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: day.isToday ? colors.primary : colors.surface,
                      boxShadow: day.isToday ? '0 4px 12px rgba(124, 58, 237, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <p className="text-xs font-medium mb-1 capitalize" style={{ color: day.isToday ? 'white' : colors.textLight }}>
                      {day.day}
                    </p>
                    <span className="text-lg sm:text-2xl">{day.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards de Insights */}
          <div className="w-full mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3" style={{ color: colors.text }}>
              Insights da Semana
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl flex sm:flex-col items-center gap-3 sm:gap-2 transition-all hover:shadow-md bg-white"
                  >
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${insight.color}20` }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: insight.color }} />
                    </div>
                    <div className="text-left sm:text-center">
                      <h4 className="font-semibold text-xs sm:text-sm" style={{ color: colors.text }}>
                        {insight.title}
                      </h4>
                      <p className="text-xs mt-1" style={{ color: colors.textLight }}>
                        {insight.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="w-full mb-6 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-3 sm:p-4 rounded-xl text-center bg-white shadow-sm">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" style={{ color: colors.error }} />
              <p className="text-lg sm:text-2xl font-bold" style={{ color: colors.text }}>{totalDays}</p>
              <p className="text-xs" style={{ color: colors.textLight }}>Dias registrados</p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl text-center bg-white shadow-sm">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" style={{ color: colors.success }} />
              <p className="text-lg sm:text-2xl font-bold" style={{ color: colors.text }}>
                {totalDays > 0 ? Math.round((moodStats.feliz / totalDays) * 100) : 0}%
              </p>
              <p className="text-xs" style={{ color: colors.textLight }}>Dias felizes</p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl text-center bg-white shadow-sm">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" style={{ color: colors.warning }} />
              <p className="text-lg sm:text-2xl font-bold" style={{ color: colors.text }}>{currentStreak}</p>
              <p className="text-xs" style={{ color: colors.textLight }}>Sequência</p>
            </div>
          </div>

          {/* Comunidade */}
          <div className="w-full p-4 rounded-xl" style={{ backgroundColor: `${colors.tertiary}10` }}>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5" style={{ color: colors.tertiary }} />
              <h3 className="font-semibold text-sm sm:text-base" style={{ color: colors.text }}>Comunidade</h3>
            </div>
            <p className="text-xs sm:text-sm" style={{ color: colors.textLight }}>
              Você não está sozinho! <strong>2.847</strong> pessoas estão cuidando da saúde mental hoje.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderQuestionnaire = () => (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="w-full bg-white shadow-sm p-4 mb-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => setCurrentScreen('home')}>
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.text }} />
          </button>
          <h1 className="text-base sm:text-lg font-semibold" style={{ color: colors.text }}>Humor Diário</h1>
          <Smile className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.primary }} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-24">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${colors.primary}20` }}>
            <div 
              className="h-full transition-all duration-300" 
              style={{ 
                backgroundColor: colors.primary,
                width: formData.mood && formData.wakeUpFeeling && formData.sleepHours ? '100%' : 
                       formData.mood && formData.wakeUpFeeling ? '66%' : 
                       formData.mood ? '33%' : '0%'
              }}
            />
          </div>
        </div>

        {/* Pergunta 1 */}
        <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: `${colors.primary}20` }}>
          <h3 className="font-semibold text-sm sm:text-base" style={{ color: colors.primary }}>
            1. Como você se definiria hoje?
          </h3>
        </div>
        
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl bg-white shadow-sm">
          <div className="space-y-2 sm:space-y-3">
            {moods.map((mood) => (
              <label key={mood.value} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="mood"
                  value={mood.value}
                  checked={formData.mood === mood.value}
                  onChange={(e) => setFormData({...formData, mood: e.target.value})}
                  className="w-4 h-4 sm:w-5 sm:h-5 accent-purple-600"
                />
                <span className="text-xl sm:text-2xl">{mood.icon}</span>
                <span className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>{mood.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pergunta 2 */}
        <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: `${colors.primary}20` }}>
          <h3 className="font-semibold text-sm sm:text-base" style={{ color: colors.primary }}>
            2. Como você se sentiu ao acordar?
          </h3>
        </div>
        
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl bg-white shadow-sm">
          <div className="space-y-2 sm:space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all hover:bg-gray-50">
              <input
                type="radio"
                name="wakeUp"
                value="disposto"
                checked={formData.wakeUpFeeling === 'disposto'}
                onChange={(e) => setFormData({...formData, wakeUpFeeling: e.target.value})}
                className="w-4 h-4 sm:w-5 sm:h-5 accent-purple-600"
              />
              <Sun className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.warning }} />
              <span className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>Disposto</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all hover:bg-gray-50">
              <input
                type="radio"
                name="wakeUp"
                value="indisposto"
                checked={formData.wakeUpFeeling === 'indisposto'}
                onChange={(e) => setFormData({...formData, wakeUpFeeling: e.target.value})}
                className="w-5 h-5 accent-purple-600"
              />
              <Moon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.textLight }} />
              <span className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>Indisposto</span>
            </label>
          </div>
        </div>

        {/* Pergunta 3 */}
        <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: `${colors.primary}20` }}>
          <h3 className="font-semibold text-sm sm:text-base" style={{ color: colors.primary }}>
            3. Quantas horas de sono você teve?
          </h3>
        </div>
        
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl bg-white shadow-sm">
          <div className="space-y-2 sm:space-y-3">
            {[
              { value: '7-9h', label: '7-9h', icon: '😴' },
              { value: '4-7h', label: '4-7h', icon: '😪' },
              { value: 'menos-4h', label: 'Menos de 4h', icon: '😫' },
              { value: 'mais-9h', label: 'Mais de 9h', icon: '😊' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="sleep"
                  value={option.value}
                  checked={formData.sleepHours === option.value}
                  onChange={(e) => setFormData({...formData, sleepHours: e.target.value})}
                  className="w-4 h-4 sm:w-5 sm:h-5 accent-purple-600"
                />
                <span className="text-xl sm:text-2xl">{option.icon}</span>
                <span className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleFormSubmit}
          disabled={!formData.mood || !formData.wakeUpFeeling || !formData.sleepHours}
          className="w-full py-3 sm:py-4 rounded-full text-white font-semibold shadow-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          style={{ backgroundColor: colors.primary }}
        >
          Enviar Respostas
        </button>
      </div>
    </div>
  );

  const renderEvolution = () => {
    const moodStats = calculateMoodStats();
    const total = Object.values(moodStats).reduce((a, b) => a + b, 0) || 1;
    const weekDays = getWeekDays();
    
    return (
      <div className="w-full min-h-screen" style={{ backgroundColor: colors.background }}>
        {/* Header */}
        <div className="w-full bg-white shadow-sm p-4 mb-6">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button onClick={() => setCurrentScreen('home')}>
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.text }} />
            </button>
            <h1 className="text-base sm:text-lg font-semibold" style={{ color: colors.text }}>Minha Evolução</h1>
            <Activity className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.primary }} />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-24">
          {/* Gráfico circular */}
          <div className="w-full mb-6 p-4 sm:p-6 rounded-2xl shadow-lg bg-white">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={colors.secondary}
                  strokeWidth="20"
                  strokeDasharray={`${(moodStats.feliz/total) * 502.65} 502.65`}
                  strokeDashoffset="0"
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={colors.warning}
                  strokeWidth="20"
                  strokeDasharray={`${(moodStats.ansioso/total) * 502.65} 502.65`}
                  strokeDashoffset={`-${(moodStats.feliz/total) * 502.65}`}
                  transform="rotate(-90 100 100)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={colors.tertiary}
                  strokeWidth="20"
                  strokeDasharray={`${(moodStats.deprimido/total) * 502.65} 502.65`}
                  strokeDashoffset={`-${((moodStats.feliz + moodStats.ansioso)/total) * 502.65}`}
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <p className="text-xs sm:text-sm text-center" style={{ color: colors.textLight }}>
                  NOS ÚLTIMOS 30 DIAS,<br />VOCÊ SE DEFINIU COMO:
                </p>
              </div>
            </div>

            {/* Legenda */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                  <span className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>Feliz</span>
                </div>
                <span className="text-sm sm:text-base" style={{ color: colors.textLight }}>{moodStats.feliz} dias</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: colors.warning }}></div>
                  <span className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>Ansioso</span>
                </div>
                <span className="text-sm sm:text-base" style={{ color: colors.textLight }}>{moodStats.ansioso} dias</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: colors.tertiary }}></div>
                  <span className="font-medium text-sm sm:text-base" style={{ color: colors.text }}>Deprimido</span>
                </div>
                <span className="text-sm sm:text-base" style={{ color: colors.textLight }}>{moodStats.deprimido} dias</span>
              </div>
            </div>
          </div>

          {/* Gráfico de tendência */}
          <div className="w-full mb-6 p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-semibold text-sm sm:text-base mb-3" style={{ color: colors.text }}>
              Tendência Semanal
            </h3>
            <div className="flex items-end justify-between h-24 sm:h-32 gap-1 sm:gap-2">
              {weekDays.map((day, index) => {
                const moodData = moodHistory[format(day.date, 'yyyy-MM-dd')];
                const height = moodData ? 80 : 0;
                const moodDetails = moodData ? getMoodDetails(moodData.mood) : null;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    {moodData ? (
                      <div className="w-full flex flex-col items-center justify-end h-full">
                        <span className="text-lg sm:text-2xl mb-1">{moodDetails.icon}</span>
                      </div>
                    ) : (
                      <div 
                        className="w-full rounded-t"
                        style={{ 
                          height: '20%', 
                          backgroundColor: colors.textLight + '20'
                        }}
                      />
                    )}
                    <span className="text-xs mt-1" style={{ color: day.isToday ? colors.primary : colors.textLight }}>
                      {day.day.slice(0, 3)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="w-full p-4 rounded-xl text-center" style={{ backgroundColor: `${colors.primary}10` }}>
            <p className="mb-4 text-sm sm:text-base" style={{ color: colors.text }}>
              Acesse nossa aba de "Dicas" para receber conteúdos e melhorar o seu desempenho!
            </p>
            <button
              onClick={() => setCurrentScreen('tips')}
              className="px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all hover:opacity-90 text-sm sm:text-base"
              style={{ backgroundColor: colors.primary }}
            >
              → Ver Dicas
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSupport = () => (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="w-full bg-white shadow-sm p-4 mb-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => setCurrentScreen('home')}>
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.text }} />
          </button>
          <h1 className="text-base sm:text-lg font-semibold" style={{ color: colors.text }}>Central de Apoio</h1>
          <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.primary }} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-24">
        {/* Ajuda Imediata */}
        <div className="w-full mb-6 p-5 sm:p-6 rounded-2xl text-white" style={{ backgroundColor: colors.text }}>
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Precisa de Ajuda imediata?</h2>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">
            Clique no botão abaixo para entrar em contato com Centro de Valorização à Vida
          </p>
          <button className="w-full py-3 px-6 rounded-full bg-white font-semibold transition-all hover:opacity-90 text-sm sm:text-base" style={{ color: colors.text }}>
            Ligar para CVV - 188
          </button>
        </div>

        {/* Agendamento */}
        <div className="w-full mb-6 p-5 sm:p-6 rounded-2xl bg-white shadow-sm">
          <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: colors.text }}>
            Caso deseje entrar em contato com nossa equipe e agendar um atendimento com nossa equipe de psicólogos, use o botão abaixo:
          </p>
          <button className="w-full py-3 px-6 rounded-full text-white font-semibold shadow-lg transition-all hover:opacity-90 text-sm sm:text-base" style={{ backgroundColor: colors.primary }}>
            Agendar Atendimento
          </button>
        </div>

        {/* Recursos Adicionais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl flex items-center gap-3 bg-white shadow-sm">
            <Clock className="w-5 h-5" style={{ color: colors.primary }} />
            <div>
              <h4 className="font-semibold text-sm" style={{ color: colors.text }}>
                Chat 24/7
              </h4>
              <p className="text-xs" style={{ color: colors.textLight }}>
                Converse com nossos voluntários a qualquer hora
              </p>
            </div>
          </div>
          
          <div className="p-4 rounded-xl flex items-center gap-3 bg-white shadow-sm">
            <Users className="w-5 h-5" style={{ color: colors.tertiary }} />
            <div>
              <h4 className="font-semibold text-sm" style={{ color: colors.text }}>
                Grupos de Apoio
              </h4>
              <p className="text-xs" style={{ color: colors.textLight }}>
                Participe de grupos com pessoas que entendem você
              </p>
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: `${colors.success}10` }}>
          <p className="text-xs sm:text-sm text-center" style={{ color: colors.text }}>
            Lembre-se: buscar ajuda é um ato de coragem. Você não está sozinho(a).
          </p>
        </div>
      </div>
    </div>
  );

  const renderTips = () => (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="w-full bg-white shadow-sm p-4 mb-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => setCurrentScreen('evolution')}>
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.text }} />
          </button>
          <h1 className="text-base sm:text-lg font-semibold" style={{ color: colors.text }}>Dicas</h1>
          <Brain className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.primary }} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-24">
        <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: `${colors.primary}20` }}>
          <h2 className="text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: colors.primary }}>
            <span className="text-xl sm:text-2xl">💡</span>
            5 Dicas Comprovadas para Melhorar a Ansiedade e o Estresse
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-bold text-sm sm:text-base mb-2" style={{ color: colors.text }}>
              1. Pratique a respiração profunda e consciente
            </h3>
            <p className="text-xs sm:text-sm mb-2" style={{ color: colors.textLight }}>
              A respiração profunda ativa o sistema nervoso parassimpático, responsável pela sensação de calma e relaxamento. 
              Técnicas como a respiração 4-7-8 (inspire por 4 segundos, segure por 7, expire por 8) ajudam a reduzir a frequência cardíaca 
              e os níveis de cortisol, o hormônio do estresse.
            </p>
            <p className="text-xs italic" style={{ color: colors.textLight }}>
              Fonte: Harvard Medical School – Relaxation techniques
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-bold text-sm sm:text-base mb-2" style={{ color: colors.text }}>
              2. Exercite-se regularmente
            </h3>
            <p className="text-xs sm:text-sm mb-2" style={{ color: colors.textLight }}>
              A atividade física libera endorfinas e outros neurotransmissores como a dopamina e a serotonina, que têm efeito 
              antidepressivo e ansiolítico natural. Caminhadas diárias de 30 minutos, por exemplo, já mostram efeito significativo.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-bold text-sm sm:text-base mb-2" style={{ color: colors.text }}>
              3. Mantenha uma rotina de sono saudável
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: colors.textLight }}>
              O sono de qualidade é fundamental para regular o humor e reduzir a ansiedade. Tente dormir e acordar nos mesmos horários todos os dias.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-bold text-sm sm:text-base mb-2" style={{ color: colors.text }}>
              4. Pratique mindfulness e meditação
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: colors.textLight }}>
              Apenas 10 minutos diários de meditação podem reduzir significativamente os níveis de estresse e ansiedade.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-bold text-sm sm:text-base mb-2" style={{ color: colors.text }}>
              5. Conecte-se com outras pessoas
            </h3>
            <p className="text-xs sm:text-sm" style={{ color: colors.textLight }}>
              O apoio social é um fator protetor importante para a saúde mental. Converse com amigos, familiares ou participe de grupos de apoio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const screens = {
    home: renderHome,
    questionnaire: renderQuestionnaire,
    evolution: renderEvolution,
    support: renderSupport,
    tips: renderTips
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative" style={{ backgroundColor: colors.background }}>
      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto">
        {screens[currentScreen] ? screens[currentScreen]() : renderHome()}
      </div>

      {/* Navegação inferior */}
      {currentScreen !== 'tips' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t" style={{ borderColor: colors.background }}>
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-around items-center py-2">
              {navigation.map((item) => {
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
                      style={{ color: isActive ? colors.primary : colors.textLight }}
                    />
                    <span 
                      className="text-xs font-medium" 
                      style={{ color: isActive ? colors.primary : colors.textLight }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTrackerApp;