// src/App.jsx
import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { useApp } from './contexts/AppContext';
import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import Evolution from './pages/Evolution';
import Support from './pages/Support';
import Tips from './pages/Tips';
import { COLORS } from './utils/constants';
import './App.css';

const AppContent = () => {
  const { currentScreen } = useApp();

  const screens = {
    home: <Home />,
    questionnaire: <Questionnaire />,
    evolution: <Evolution />,
    support: <Support />,
    tips: <Tips />
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative" style={{ backgroundColor: COLORS.background }}>
      <div className="flex-1 overflow-y-auto">
        {screens[currentScreen] || <Home />}
      </div>
      <Navigation />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;