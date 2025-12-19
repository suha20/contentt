import { ArrowLeft, Lightbulb, Target, TrendingUp, Sparkles } from 'lucide-react';
import { contentIdeas } from '../data/mockData';

interface ContentSuggestionsProps {
  onBack: () => void;
}

export function ContentSuggestions({ onBack }: ContentSuggestionsProps) {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700'
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-500 text-white z-10">
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-2 mb-3 text-purple-100">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="mb-2">AI Content Ideas</h1>
          <p className="text-sm text-purple-100">
            Personalized suggestions based on current trends
          </p>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-sm">Trend Analysis</h3>
          </div>
          <p className="text-sm text-purple-100">
            Our AI has analyzed {contentIdeas.length} trending patterns across all platforms.
            Here are the best opportunities for maximum reach.
          </p>
        </div>
      </div>

      {/* Content Ideas */}
      <div className="px-4 space-y-4">
        {contentIdeas.map((idea, index) => (
          <div key={idea.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
            {/* Idea Header */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 border-b">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <h3 className="text-base">{idea.title}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[idea.difficulty]}`}>
                  {idea.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600">{idea.description}</p>
            </div>

            {/* Idea Details */}
            <div className="p-4 space-y-3">
              {/* Platforms */}
              <div>
                <div className="text-xs text-gray-500 mb-1">Best Platforms</div>
                <div className="flex flex-wrap gap-2">
                  {idea.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estimated Reach */}
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Estimated Reach</div>
                  <div className="text-sm">{idea.estimatedReach} views</div>
                </div>
              </div>

              {/* Based On Trends */}
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  Inspired by trends:
                </div>
                <div className="space-y-1">
                  {idea.basedOnTrends.map((trend, i) => (
                    <div key={i} className="text-xs text-gray-600 pl-6">
                      • {trend}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 mt-2">
                <Lightbulb className="w-4 h-4" />
                Start Creating
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="p-4 mt-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm mb-2">💡 Pro Tips</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Combine multiple trends for unique content</li>
            <li>• Post during peak hours (6-9 PM)</li>
            <li>• Use 5-7 relevant hashtags per post</li>
            <li>• Engage with comments in first hour</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
