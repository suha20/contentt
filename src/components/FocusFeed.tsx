import { useState } from 'react';
import { Brain, RefreshCw, Settings, Check, Bookmark, Eye, TrendingUp } from 'lucide-react';
import { DailyIntent } from '../App';
import { getMockCuratedContent, AnnotatedContent } from '../data/mockContent';

interface FocusFeedProps {
  intent: DailyIntent;
  onResetIntent: () => void;
  onChangeMode: () => void;
}

export function FocusFeed({ intent, onResetIntent, onChangeMode }: FocusFeedProps) {
  const [content] = useState<AnnotatedContent[]>(getMockCuratedContent(intent));
  const [selectedContent, setSelectedContent] = useState<AnnotatedContent | null>(null);
  const [viewedItems, setViewedItems] = useState<Set<string>>(new Set());

  const formatPurpose = (purposes: string[]) => {
    return purposes.map(p => p.replace(/-/g, ' ')).join(', ');
  };

  const handleViewContent = (item: AnnotatedContent) => {
    setSelectedContent(item);
    setViewedItems(new Set(viewedItems).add(item.id));
  };

  const remainingItems = content.length - viewedItems.size;

  if (selectedContent) {
    return (
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 z-10 p-4 backdrop-blur-xl">
          <button 
            onClick={() => setSelectedContent(null)}
            className="text-purple-400 hover:text-purple-300 transition text-sm"
          >
            ← Back to feed
          </button>
        </div>

        {/* Content Preview */}
        <div className="relative">
          <img 
            src={selectedContent.thumbnail}
            alt={selectedContent.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-white text-xl mb-1">{selectedContent.title}</h2>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span>{selectedContent.creator}</span>
              <span>•</span>
              <span>{selectedContent.views} views</span>
            </div>
          </div>
        </div>

        {/* Annotations */}
        <div className="p-4 space-y-4">
          {/* Why This Works */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4">
            <h3 className="text-purple-300 text-sm mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Why This Works
            </h3>
            <p className="text-gray-300 text-sm">{selectedContent.whyThisWorks}</p>
          </div>

          {/* Hook Type */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">Hook Type</div>
            <div className="text-white">{selectedContent.hookType}</div>
          </div>

          {/* Format Pattern */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-1">Format Pattern</div>
            <div className="text-gray-300 text-sm">{selectedContent.formatPattern}</div>
          </div>

          {/* What to Steal */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            <h3 className="text-green-300 text-sm mb-2">💡 What to Steal</h3>
            <p className="text-gray-300 text-sm">{selectedContent.whatToSteal}</p>
          </div>

          {/* How to Adapt */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <h3 className="text-blue-300 text-sm mb-2">🎯 How to Adapt This</h3>
            <p className="text-gray-300 text-sm">{selectedContent.howToAdapt}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Effort</div>
              <div className="text-white text-sm capitalize">{selectedContent.effortRequired}</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Tone</div>
              <div className="text-white text-sm capitalize">{selectedContent.emotionalTone}</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Level</div>
              <div className="text-white text-sm capitalize">{selectedContent.audienceLevel}</div>
            </div>
          </div>

          {/* Action */}
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2">
            <Bookmark className="w-4 h-4" />
            Save for Reference
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            <h1 className="text-xl">Your Daily Lens</h1>
          </div>
          <button 
            onClick={onChangeMode}
            className="text-white/80 hover:text-white transition"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <Check className="w-4 h-4" />
            <span className="text-white/90">Today's Intent:</span>
          </div>
          <div className="text-white/80 text-xs">
            {formatPurpose(intent.purpose)} • {intent.format.join(', ')} • {intent.platform.join(', ')}
          </div>
          {intent.stateText && (
            <div className="mt-2 pt-2 border-t border-white/10 text-xs text-white/70">
              "{intent.stateText}"
            </div>
          )}
        </div>
      </div>

      {/* Progress Stats */}
      <div className="p-4 bg-gray-900 border-b border-gray-800">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl text-white">{content.length}</div>
            <div className="text-xs text-gray-400">Curated for you</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl text-purple-400">{viewedItems.size}</div>
            <div className="text-xs text-gray-400">Analyzed</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700">
            <div className="text-2xl text-blue-400">{remainingItems}</div>
            <div className="text-xs text-gray-400">Remaining</div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white">Your Feed</h2>
          <span className="text-xs text-gray-500">Finite by design</span>
        </div>

        {content.length === 0 ? (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
            <RefreshCw className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-2">No content matches your intent yet</p>
            <p className="text-sm text-gray-500">Try adjusting your preferences or check back later</p>
          </div>
        ) : (
          <div className="space-y-3">
            {content.map((item) => (
              <button
                key={item.id}
                onClick={() => handleViewContent(item)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition text-left group"
              >
                <div className="flex gap-3 p-3">
                  <div className="relative">
                    <img 
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    {viewedItems.has(item.id) && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm mb-1 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span>{item.creator}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.views}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                        {item.hookType}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {item.effortRequired} effort
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* End of Feed Message */}
        {content.length > 0 && (
          <div className="mt-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white mb-2">End of Your Daily Feed</h3>
            <p className="text-sm text-gray-400 mb-4">
              This is intentional. Quality over quantity. Your lens resets tomorrow.
            </p>
            <button 
              onClick={onResetIntent}
              className="text-purple-400 hover:text-purple-300 transition text-sm"
            >
              Reset intent for tomorrow →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
