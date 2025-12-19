import { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Target, Clock, Settings, Lock, X } from 'lucide-react';
import { DailyIntent, FeasibilityConstraints } from '../App';
import { generateMockDecision, ContentDecision } from '../data/mockContent';

interface CreatorDashboardProps {
  intent: DailyIntent;
  constraints: FeasibilityConstraints | null;
  onResetIntent: () => void;
  onChangeMode: () => void;
}

export function CreatorDashboard({ intent, constraints, onResetIntent, onChangeMode }: CreatorDashboardProps) {
  const [decision] = useState<ContentDecision>(generateMockDecision(intent));
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRegenerate = () => {
    if (regenerateCount < 1) {
      setRegenerateCount(regenerateCount + 1);
      // In real app, this would call AI again
      alert('Regenerating new decision...');
    } else {
      alert('Daily regeneration limit reached. Trust the process and execute!');
    }
  };

  const handleCantPostToday = () => {
    if (confirm('That\'s okay! Building a habit means showing up tomorrow. Reset your intent for then?')) {
      onResetIntent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <h1 className="text-xl">Your Decision</h1>
          </div>
          <button 
            onClick={onChangeMode}
            className="text-white/80 hover:text-white transition"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Decision Lock Badge */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <div className="flex-1 text-sm">
            <div className="text-white/90">Daily decision locked</div>
            <div className="text-white/60 text-xs">
              Based on your intent + current trends
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Confidence Score */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-green-300 text-sm">AI Confidence Score</h3>
            <span className="text-2xl text-white">{decision.confidenceScore}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              style={{ width: `${decision.confidenceScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">{decision.reasoning}</p>
        </div>

        {/* Format & Platform */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3">
            <div className="text-xs text-gray-500 mb-1">Format</div>
            <div className="text-white capitalize">{decision.format}</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3">
            <div className="text-xs text-gray-500 mb-1">Platform</div>
            <div className="text-white capitalize">{decision.platform}</div>
          </div>
        </div>

        {/* Objective */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <h3 className="text-purple-300 text-sm">Objective</h3>
          </div>
          <p className="text-white">{decision.objective}</p>
        </div>

        {/* Hook */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm">Primary Hook</h3>
            <button
              onClick={() => copyToClipboard(decision.hook.primary, 'hook')}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              {copiedField === 'hook' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-gray-300 mb-3">{decision.hook.primary}</p>
          
          {decision.hook.variants.length > 0 && (
            <>
              <div className="text-xs text-gray-500 mb-2">Variants (if primary doesn't feel right)</div>
              <div className="space-y-2">
                {decision.hook.variants.map((variant, i) => (
                  <div key={i} className="bg-gray-900/50 p-2 rounded text-sm text-gray-400">
                    {i + 1}. {variant}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Script */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm">Script / Outline</h3>
            <button
              onClick={() => copyToClipboard(decision.script.outline.join('\n'), 'script')}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              {copiedField === 'script' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-3">
            <div className="text-xs text-blue-300 mb-1">Structure</div>
            <div className="text-sm text-gray-300">{decision.script.structure}</div>
          </div>

          <div className="space-y-2">
            {decision.script.outline.map((line, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-purple-400 flex-shrink-0">{i + 1}.</span>
                <span className="text-gray-300">{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shot List */}
        {decision.shotList && decision.shotList.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h3 className="text-white text-sm mb-3">Shot List / Production Notes</h3>
            <ul className="space-y-2">
              {decision.shotList.map((shot, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-purple-400">•</span>
                  <span>{shot}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Caption */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm">Caption Options</h3>
            <button
              onClick={() => copyToClipboard(decision.caption.long, 'caption')}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              {copiedField === 'caption' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">Short (Instagram/TikTok)</div>
              <p className="text-sm text-gray-300 bg-gray-900/50 p-2 rounded">{decision.caption.short}</p>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Long (with story)</div>
              <p className="text-sm text-gray-300 bg-gray-900/50 p-2 rounded whitespace-pre-wrap">{decision.caption.long}</p>
            </div>
          </div>
        </div>

        {/* CTA Options */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <h3 className="text-white text-sm mb-3">CTA Options</h3>
          <div className="space-y-2">
            {decision.cta.map((cta, i) => (
              <div key={i} className="bg-gray-900/50 p-2 rounded text-sm text-gray-300">
                {cta}
              </div>
            ))}
          </div>
        </div>

        {/* Time Estimate */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-green-400" />
            <h3 className="text-green-300 text-sm">Estimated Time</h3>
          </div>
          <p className="text-white">{decision.estimatedTime}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => setIsExecuting(true)}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            I'm Executing This
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleRegenerate}
              disabled={regenerateCount >= 1}
              className="flex-1 py-2 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate {regenerateCount >= 1 && '(Used)'}
            </button>

            <button
              onClick={handleCantPostToday}
              className="flex-1 py-2 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition flex items-center justify-center gap-2 text-sm"
            >
              <X className="w-4 h-4" />
              Can't Post Today
            </button>
          </div>

          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="w-full py-2 text-gray-500 hover:text-gray-400 transition text-sm"
          >
            {showAlternatives ? 'Hide' : 'Show'} alternative ideas (not recommended)
          </button>

          {showAlternatives && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
              <p className="text-yellow-300 text-sm mb-2">⚠️ Decision fatigue warning</p>
              <p className="text-gray-400 text-xs">
                Browsing alternatives reduces execution. The primary decision was chosen for a reason.
                Trust the process.
              </p>
            </div>
          )}
        </div>

        {/* Philosophy Note */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">
            This decision is locked for today to reduce overthinking.
            <br />
            Your creative fingerprint improves with every execution.
          </p>
        </div>
      </div>

      {isExecuting && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full border border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-lg mb-2">Great choice!</h3>
              <p className="text-gray-400 text-sm mb-6">
                Execute this and return tomorrow. Consistency beats perfection.
              </p>
              <button
                onClick={() => setIsExecuting(false)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition"
              >
                Let's Go
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
