// src/pages/Home.jsx
import React from 'react';
import { Calendar, Award } from 'lucide-react';
import { COLORS } from '../utils/constants';
import { formatDateFull } from '../utils/dateHelpers';
import DailyCheckCard from '../components/home/DailyCheckCard';
import WeeklyStatusCard from '../components/home/WeeklyStatusCard';
import WeeklySummary from '../components/home/WeeklySummary';
import InsightsSection from '../components/home/InsightsSection';
import QuickStats from '../components/home/QuickStats';
import CommunityCard from '../components/home/CommunityCard';
import { useMoodStats } from '../hooks/useMoodStats';

const Home = () => {
  const currentDate = new Date();
  const { currentStreak } = useMoodStats();

  return (
    <div className="w-full min-h-screen pb-20" style={{ backgroundColor: COLORS.background }}>
      {/* Header com data */}
      <div className="w-full bg-white shadow-sm p-4 mb-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: COLORS.textLight }}>
            <Calendar className="w-4 h-4" />
            <span className="capitalize truncate">{formatDateFull(currentDate)}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Award className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: COLORS.warning }} />
            <span className="text-xs sm:text-sm font-semibold" style={{ color: COLORS.text }}>
              {currentStreak} dias
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <DailyCheckCard />
        <WeeklyStatusCard />
        <WeeklySummary />
        <InsightsSection />
        <QuickStats />
        <CommunityCard />
      </div>
    </div>
  );
};

export default Home;