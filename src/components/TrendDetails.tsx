import { ArrowLeft, TrendingUp, Eye, Heart, Share2, Instagram, Music2, Facebook, Ghost } from 'lucide-react';
import { TrendingContent } from '../App';

interface TrendDetailsProps {
  trend: TrendingContent | null;
  onBack: () => void;
}

export function TrendDetails({ trend, onBack }: TrendDetailsProps) {
  if (!trend) {
    return (
      <div className="p-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <p>No trend selected</p>
      </div>
    );
  }

  const platformIcons = {
    instagram: Instagram,
    tiktok: Music2,
    facebook: Facebook,
    snapchat: Ghost
  };

  const platformColors = {
    instagram: 'from-purple-500 to-pink-500',
    tiktok: 'from-black to-cyan-400',
    facebook: 'from-blue-600 to-blue-700',
    snapchat: 'from-yellow-400 to-yellow-500'
  };

  const Icon = platformIcons[trend.platform];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10 p-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600">
          <ArrowLeft className="w-5 h-5" />
          Back to Trends
        </button>
      </div>

      {/* Trend Image */}
      <div className="relative">
        <img
          src={trend.thumbnail}
          alt={trend.title}
          className="w-full h-64 object-cover"
        />
        <div className={`absolute top-4 right-4 bg-gradient-to-r ${platformColors[trend.platform]} text-white px-3 py-1 rounded-full flex items-center gap-2`}>
          <Icon className="w-4 h-4" />
          <span className="text-sm capitalize">{trend.platform}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Category */}
        <div className="mb-4">
          <div className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm mb-2">
            {trend.category}
          </div>
          <h1 className="mb-2">{trend.title}</h1>
          <p className="text-gray-600">{trend.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-orange-600 mb-1">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Engagement</span>
            </div>
            <div className="text-2xl">{trend.engagement}M</div>
            <div className="text-xs text-gray-600">interactions</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Eye className="w-5 h-5" />
              <span className="text-sm">Views</span>
            </div>
            <div className="text-2xl">{trend.views}M</div>
            <div className="text-xs text-gray-600">total views</div>
          </div>
        </div>

        {/* Hashtags */}
        <div className="mb-6">
          <h3 className="text-sm mb-2">Trending Hashtags</h3>
          <div className="flex flex-wrap gap-2">
            {trend.hashtags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Engagement Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            Performance Metrics
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Engagement Rate</span>
                <span>{((trend.engagement / trend.views) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${Math.min((trend.engagement / trend.views) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Virality Score</span>
                <span>{Math.min(Math.round((trend.engagement / 10) * 100), 100)}/100</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${Math.min((trend.engagement / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Why It's Trending */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm mb-2">💡 Why It's Trending</h3>
          <p className="text-sm text-gray-700">
            This content is performing exceptionally well due to its {trend.category.toLowerCase()} appeal
            and strong visual elements. The engagement rate suggests high audience resonance,
            making it an ideal trend to capitalize on for your own content creation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Create Similar Content
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Lightbulb({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}
