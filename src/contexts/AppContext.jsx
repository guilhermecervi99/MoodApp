// src/contexts/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getTodayString } from '../utils/dateHelpers';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [moodHistory, setMoodHistory] = useLocalStorage('moodHistory', {});
  const [dailyChecks, setDailyChecks] = useLocalStorage('dailyChecks', {});
  const [formData, setFormData] = useState({
    mood: '',
    wakeUpFeeling: '',
    sleepHours: ''
  });

  const today = getTodayString();
  const showDailyCheck = !dailyChecks[today];

  const saveDailyMood = (data) => {
    const newEntry = {
      ...data,
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
  };

  const value = {
    currentScreen,
    setCurrentScreen,
    moodHistory,
    dailyChecks,
    formData,
    setFormData,
    showDailyCheck,
    saveDailyMood
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};