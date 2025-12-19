import { useState, useEffect } from 'react';
import { ModeSelection } from './components/ModeSelection';
import { IntentSetup } from './components/IntentSetup';
import { FocusFeed } from './components/FocusFeed';
import { CreatorDashboard } from './components/CreatorDashboard';

export type AppMode = 'personal' | 'creator' | null;
export type Format = 'reels' | 'carousels' | 'podcasts' | 'text';
export type Platform = 'instagram' | 'tiktok' | 'youtube';
export type Purpose = 'learn-hooks' | 'study-storytelling' | 'study-formats' | 'inspiration' | 'analyze';
export type Energy = 'low' | 'medium' | 'high';

export interface DailyIntent {
  purpose: Purpose[];
  format: Format[];
  platform: Platform[];
  energy: Energy | null;
  stateText: string;
  timestamp: number;
}

export interface FeasibilityConstraints {
  timeAvailable: 'short' | 'medium' | 'long';
  visibilityComfort: 'faceless' | 'voice-only' | 'face-to-camera';
  authorityLevel: 'beginner' | 'intermediate' | 'expert';
  tooling: 'phone-only' | 'basic-editing' | 'advanced-setup';
}

export default function App() {
  const [mode, setMode] = useState<AppMode>(null);
  const [dailyIntent, setDailyIntent] = useState<DailyIntent | null>(null);
  const [feasibilityConstraints, setFeasibilityConstraints] = useState<FeasibilityConstraints | null>(null);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Check if daily intent has expired (past midnight)
  useEffect(() => {
    if (dailyIntent) {
      const intentDate = new Date(dailyIntent.timestamp);
      const now = new Date();
      
      // Check if it's a new day
      if (intentDate.getDate() !== now.getDate() || 
          intentDate.getMonth() !== now.getMonth() || 
          intentDate.getFullYear() !== now.getFullYear()) {
        // Reset for new day
        setDailyIntent(null);
        setMode(null);
      }
    }
  }, [dailyIntent]);

  const handleModeSelect = (selectedMode: AppMode) => {
    setMode(selectedMode);
    setHasSeenIntro(true);
  };

  const handleIntentComplete = (intent: DailyIntent, constraints?: FeasibilityConstraints) => {
    setDailyIntent(intent);
    if (constraints) {
      setFeasibilityConstraints(constraints);
    }
  };

  const handleResetIntent = () => {
    setDailyIntent(null);
    setFeasibilityConstraints(null);
  };

  const renderContent = () => {
    // Step 1: Mode selection
    if (!mode) {
      return <ModeSelection onSelectMode={handleModeSelect} />;
    }

    // Step 2: Intent setup (if not set for today)
    if (!dailyIntent) {
      return (
        <IntentSetup 
          mode={mode} 
          onComplete={handleIntentComplete}
          onBack={() => setMode(null)}
        />
      );
    }

    // Step 3: Main experience based on mode
    if (mode === 'personal') {
      return (
        <FocusFeed 
          intent={dailyIntent}
          onResetIntent={handleResetIntent}
          onChangeMode={() => setMode(null)}
        />
      );
    }

    if (mode === 'creator') {
      return (
        <CreatorDashboard 
          intent={dailyIntent}
          constraints={feasibilityConstraints}
          onResetIntent={handleResetIntent}
          onChangeMode={() => setMode(null)}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-md mx-auto bg-gray-900 min-h-screen shadow-2xl">
        {renderContent()}
      </div>
    </div>
  );
}
