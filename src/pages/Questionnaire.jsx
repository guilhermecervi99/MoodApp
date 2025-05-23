// src/pages/Questionnaire.jsx
import React from 'react';
import { Smile } from 'lucide-react';
import Header from '../components/layout/Header';
import ProgressBar from '../components/questionnaire/ProgressBar';
import MoodSelector from '../components/questionnaire/MoodSelector';
import WakeUpSelector from '../components/questionnaire/WakeUpSelector';
import SleepSelector from '../components/questionnaire/SleepSelector';
import { COLORS } from '../utils/constants';
import { useApp } from '../contexts/AppContext';

const Questionnaire = () => {
  const { formData, setFormData, saveDailyMood, setCurrentScreen } = useApp();

  const handleSubmit = () => {
    if (formData.mood && formData.wakeUpFeeling && formData.sleepHours) {
      saveDailyMood(formData);
      setCurrentScreen('home');
    }
  };

  const progress = 
    (formData.mood ? 33 : 0) + 
    (formData.wakeUpFeeling ? 33 : 0) + 
    (formData.sleepHours ? 34 : 0);

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <Header title="Humor Diário" icon={Smile} />
      
      <div className="max-w-2xl mx-auto px-4 pb-24">
        <ProgressBar progress={progress} />
        
        <MoodSelector 
          value={formData.mood}
          onChange={(mood) => setFormData({...formData, mood})}
        />
        
        <WakeUpSelector 
          value={formData.wakeUpFeeling}
          onChange={(feeling) => setFormData({...formData, wakeUpFeeling: feeling})}
        />
        
        <SleepSelector 
          value={formData.sleepHours}
          onChange={(hours) => setFormData({...formData, sleepHours: hours})}
        />

        <button
          onClick={handleSubmit}
          disabled={!formData.mood || !formData.wakeUpFeeling || !formData.sleepHours}
          className="w-full py-3 sm:py-4 rounded-full text-white font-semibold shadow-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          style={{ backgroundColor: COLORS.primary }}
        >
          Enviar Respostas
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;