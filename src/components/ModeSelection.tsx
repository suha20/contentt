import { Brain, Sparkles, ArrowRight } from 'lucide-react';
import { AppMode } from '../App';

interface ModeSelectionProps {
  onSelectMode: (mode: AppMode) => void;
}

export function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="p-6 pt-12">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-8 h-8 text-purple-400" />
          <h1 className="text-white text-2xl">Intent</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Your personal editor-in-chief
        </p>
      </div>

      {/* Philosophy Statement */}
      <div className="px-6 pb-8">
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-white text-lg mb-3">This app is different</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2">
              <span className="text-purple-400">•</span>
              <span>No mindless scrolling</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">•</span>
              <span>No decision fatigue</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">•</span>
              <span>Just clarity and execution</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mode Selection Cards */}
      <div className="flex-1 px-6 pb-6 space-y-4">
        {/* Personal Mode */}
        <button
          onClick={() => onSelectMode('personal')}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-6 text-left hover:bg-gray-800 hover:border-purple-500/50 transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition" />
          </div>
          
          <h3 className="text-white text-lg mb-2">Personal / Focus Mode</h3>
          <p className="text-gray-400 text-sm mb-4">
            Learn intentionally without the algorithm. Curated content based on what you want to understand today.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded-full border border-blue-500/20">
              Intentional learning
            </span>
            <span className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded-full border border-blue-500/20">
              No pressure
            </span>
            <span className="text-xs bg-blue-500/10 text-blue-300 px-2 py-1 rounded-full border border-blue-500/20">
              Pattern recognition
            </span>
          </div>
        </button>

        {/* Creator Mode */}
        <button
          onClick={() => onSelectMode('creator')}
          className="w-full bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/30 rounded-2xl p-6 text-left hover:border-purple-500 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs px-3 py-1 rounded-bl-xl">
            Primary
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition" />
          </div>
          
          <h3 className="text-white text-lg mb-2">Creator Mode</h3>
          <p className="text-gray-400 text-sm mb-4">
            Know exactly what to post today. Executable decisions, not endless ideas. Built for consistency.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-purple-500/10 text-purple-300 px-2 py-1 rounded-full border border-purple-500/20">
              Daily decisions
            </span>
            <span className="text-xs bg-purple-500/10 text-purple-300 px-2 py-1 rounded-full border border-purple-500/20">
              Execution-ready
            </span>
            <span className="text-xs bg-purple-500/10 text-purple-300 px-2 py-1 rounded-full border border-purple-500/20">
              Zero overthinking
            </span>
          </div>
        </button>
      </div>

      {/* Footer Note */}
      <div className="p-6 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Your daily lens resets at midnight. Choose wisely.
        </p>
      </div>
    </div>
  );
}
