import { useState } from 'react';
import { ArrowLeft, ArrowRight, Zap, Target } from 'lucide-react';
import { AppMode, DailyIntent, Purpose, Format, Platform, Energy, FeasibilityConstraints } from '../App';

interface IntentSetupProps {
  mode: AppMode;
  onComplete: (intent: DailyIntent, constraints?: FeasibilityConstraints) => void;
  onBack: () => void;
}

export function IntentSetup({ mode, onComplete, onBack }: IntentSetupProps) {
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState<Purpose[]>([]);
  const [format, setFormat] = useState<Format[]>([]);
  const [platform, setPlatform] = useState<Platform[]>([]);
  const [energy, setEnergy] = useState<Energy | null>(null);
  const [stateText, setStateText] = useState('');
  
  // Creator Mode specific
  const [timeAvailable, setTimeAvailable] = useState<'short' | 'medium' | 'long'>('medium');
  const [visibilityComfort, setVisibilityComfort] = useState<'faceless' | 'voice-only' | 'face-to-camera'>('faceless');
  const [authorityLevel, setAuthorityLevel] = useState<'beginner' | 'intermediate' | 'expert'>('intermediate');
  const [tooling, setTooling] = useState<'phone-only' | 'basic-editing' | 'advanced-setup'>('phone-only');

  const purposes = [
    { id: 'learn-hooks' as Purpose, label: 'Learn hooks', icon: '🎯' },
    { id: 'study-storytelling' as Purpose, label: 'Study storytelling', icon: '📖' },
    { id: 'study-formats' as Purpose, label: 'Study formats', icon: '🎬' },
    { id: 'inspiration' as Purpose, label: 'Get inspiration', icon: '💡' },
    { id: 'analyze' as Purpose, label: 'Analyse what works', icon: '📊' }
  ];

  const formats = [
    { id: 'reels' as Format, label: 'Reels / Shorts', icon: '📱' },
    { id: 'carousels' as Format, label: 'Carousels', icon: '🎴' },
    { id: 'podcasts' as Format, label: 'Podcasts', icon: '🎙️' },
    { id: 'text' as Format, label: 'Text posts', icon: '✍️' }
  ];

  const platforms = [
    { id: 'instagram' as Platform, label: 'Instagram', icon: '📷' },
    { id: 'tiktok' as Platform, label: 'TikTok', icon: '🎵' },
    { id: 'youtube' as Platform, label: 'YouTube', icon: '▶️' }
  ];

  const energyLevels = [
    { id: 'low' as Energy, label: 'Low', desc: 'Simple & light', color: 'green' },
    { id: 'medium' as Energy, label: 'Medium', desc: 'Balanced effort', color: 'yellow' },
    { id: 'high' as Energy, label: 'High', desc: 'Deep analysis', color: 'red' }
  ];

  const toggleSelection = <T,>(array: T[], setArray: (arr: T[]) => void, item: T) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const canProceedStep1 = purpose.length > 0 && format.length > 0 && platform.length > 0;
  const canComplete = canProceedStep1 && (energy !== null || stateText.trim().length > 0);

  const handleComplete = () => {
    const intent: DailyIntent = {
      purpose,
      format,
      platform,
      energy,
      stateText,
      timestamp: Date.now()
    };

    if (mode === 'creator') {
      const constraints: FeasibilityConstraints = {
        timeAvailable,
        visibilityComfort,
        authorityLevel,
        tooling
      };
      onComplete(intent, constraints);
    } else {
      onComplete(intent);
    }
  };

  const totalSteps = mode === 'creator' ? 3 : 2;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-200 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Step {step} of {totalSteps}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Step 1: Intent Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-xl mb-2">What's your intent today?</h2>
              <p className="text-gray-400 text-sm">Select what you want to focus on. This shapes your entire feed.</p>
            </div>

            {/* Purpose */}
            <div>
              <h3 className="text-gray-300 text-sm mb-3">Purpose</h3>
              <div className="space-y-2">
                {purposes.map(p => (
                  <button
                    key={p.id}
                    onClick={() => toggleSelection(purpose, setPurpose, p.id)}
                    className={`w-full p-3 rounded-xl text-left transition ${
                      purpose.includes(p.id)
                        ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                        : 'bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <span className="mr-2">{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Format */}
            <div>
              <h3 className="text-gray-300 text-sm mb-3">Format</h3>
              <div className="grid grid-cols-2 gap-2">
                {formats.map(f => (
                  <button
                    key={f.id}
                    onClick={() => toggleSelection(format, setFormat, f.id)}
                    className={`p-3 rounded-xl text-left transition ${
                      format.includes(f.id)
                        ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                        : 'bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-lg mb-1">{f.icon}</div>
                    <div className="text-sm">{f.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-gray-300 text-sm mb-3">Platform</h3>
              <div className="grid grid-cols-3 gap-2">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    onClick={() => toggleSelection(platform, setPlatform, p.id)}
                    className={`p-3 rounded-xl text-center transition ${
                      platform.includes(p.id)
                        ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                        : 'bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-lg mb-1">{p.icon}</div>
                    <div className="text-xs">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Energy & State */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-xl mb-2">How are you feeling?</h2>
              <p className="text-gray-400 text-sm">Help us understand your state. This makes better decisions.</p>
            </div>

            {/* Free text state */}
            <div>
              <h3 className="text-gray-300 text-sm mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                Describe your state (optional but powerful)
              </h3>
              <textarea
                value={stateText}
                onChange={(e) => setStateText(e.target.value)}
                placeholder="e.g., 'Feeling motivated but short on time' or 'Overwhelmed, need something simple' or 'Inspired but stuck on ideas'"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 resize-none focus:border-purple-500 focus:outline-none"
                rows={4}
              />
            </div>

            {/* Energy level (quick select) */}
            <div>
              <h3 className="text-gray-300 text-sm mb-3">Or quick select energy level</h3>
              <div className="space-y-2">
                {energyLevels.map(e => (
                  <button
                    key={e.id}
                    onClick={() => setEnergy(e.id)}
                    className={`w-full p-3 rounded-xl text-left transition ${
                      energy === e.id
                        ? 'bg-purple-500/20 border-2 border-purple-500'
                        : 'bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white">{e.label}</div>
                        <div className="text-xs text-gray-400">{e.desc}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        e.color === 'green' ? 'bg-green-500' :
                        e.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Creator Constraints (Only for Creator Mode) */}
        {step === 3 && mode === 'creator' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-xl mb-2">Feasibility Check</h2>
              <p className="text-gray-400 text-sm">Let's make sure recommendations match your reality.</p>
            </div>

            {/* Time Available */}
            <div>
              <h3 className="text-gray-300 text-sm mb-3">Time available today</h3>
              <div className="space-y-2">
                {[
                  { id: 'short', label: 'Short (10-15 min)', desc: 'Quick content' },
                  { id: 'medium', label: 'Medium (30-60 min)', desc: 'Balanced' },
                  { id: 'long', label: 'Long (2+ hours)', desc: 'Deep work' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTimeAvailable(t.id as any)}
                    className={`w-full p-3 rounded-xl text-left transition ${
                      timeAvailable === t.id
                        ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                        : 'bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-sm">{t.label}</div>
                    <div className="text-xs text-gray-400">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility Comfort */}
            <div>
              <h3 className="text-gray-300 text-sm mb-3">Visibility comfort</h3>
              <div className="space-y-2">
                {[
                  { id: 'faceless', label: 'Faceless', desc: 'No face shown' },
                  { id: 'voice-only', label: 'Voice only', desc: 'Audio + visuals' },
                  { id: 'face-to-camera', label: 'Face to camera', desc: 'Full visibility' }
                ].map(v => (
                  <button
                    key={v.id}
                    onClick={() => setVisibilityComfort(v.id as any)}
                    className={`w-full p-3 rounded-xl text-left transition ${
                      visibilityComfort === v.id
                        ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                        : 'bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-sm">{v.label}</div>
                    <div className="text-xs text-gray-400">{v.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Authority Level */}
            <div>
              <h3 className="text-gray-300 text-sm mb-3">Authority level</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'beginner', label: 'Beginner' },
                  { id: 'intermediate', label: 'Intermediate' },
                  { id: 'expert', label: 'Expert' }
                ].map(a => (
                  <button
                    key={a.id}
                    onClick={() => setAuthorityLevel(a.id as any)}
                    className={`p-3 rounded-xl text-center transition ${
                      authorityLevel === a.id
                        ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                        : 'bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-xs">{a.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tooling */}
            <div>
              <h3 className="text-gray-300 text-sm mb-3">Available tools</h3>
              <div className="space-y-2">
                {[
                  { id: 'phone-only', label: 'Phone only', desc: 'Minimal setup' },
                  { id: 'basic-editing', label: 'Basic editing', desc: 'Simple tools' },
                  { id: 'advanced-setup', label: 'Advanced setup', desc: 'Full gear' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTooling(t.id as any)}
                    className={`w-full p-3 rounded-xl text-left transition ${
                      tooling === t.id
                        ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                        : 'bg-gray-800/50 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-sm">{t.label}</div>
                    <div className="text-xs text-gray-400">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-800 p-4 bg-gray-900">
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition"
            >
              Back
            </button>
          )}
          
          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceedStep1}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!canComplete}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
            >
              <Target className="w-4 h-4" />
              Lock My Daily Lens
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
