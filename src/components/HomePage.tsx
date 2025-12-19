import { TrendingUp, Lightbulb, Instagram, Music2, Facebook, Ghost } from 'lucide-react';
import { trendingContent, getPlatformStats, getTopTrendingByCategory } from '../data/mockData';
import { Screen } from '../App';

interface HomePageProps {
  onNavigate: (screen: Screen, data?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const platformStats = getPlatformStats();
  const topTrends = getTopTrendingByCategory();
  const topContent = [...trendingContent].sort((a, b) => b.engagement - a.engagement).slice(0, 5);

  const platformIcons = {
    instagram: Instagram,
    tiktok: Music2,
    facebook: Facebook,
    snapchat: Ghost
  };

  const platformColors = {
    instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
    tiktok: 'bg-gradient-to-br from-black to-cyan-400',
    facebook: 'bg-blue-600',
    snapchat: 'bg-yellow-400'
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6">
        <h1 className="mb-2">TrendFusion</h1>
        <p className="text-purple-100 text-sm">Discover what's trending across all platforms</p>
      </div>

      {/* Quick Stats */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg">Cross-Platform Analysis</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(platformStats).map(([platform, stats]) => {
            const Icon = platformIcons[platform as keyof typeof platformIcons];
            return (
              <div
                key={platform}
                className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => onNavigate('platform', { platform })}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-full ${platformColors[platform as keyof typeof platformColors]} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="capitalize text-sm">{platform}</span>
                </div>
                <div className="text-xs text-gray-600">
                  <div>{stats.totalViews.toFixed(1)}M views</div>
                  <div>{stats.avgEngagement.toFixed(1)}M engagement</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Trending Now */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg">Trending Now</h2>
          <button 
            className="text-sm text-purple-600"
            onClick={() => onNavigate('suggestions')}
          >
            Get Ideas →
          </button>
        </div>
        <div className="space-y-3">
          {topContent.map((content) => {
            const Icon = platformIcons[content.platform];
            return (
              <div
                key={content.id}
                className="bg-white border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition"
                onClick={() => onNavigate('trend-details', { trend: content })}
              >
                <div className="flex gap-3 p-3">
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-5 h-5 rounded ${platformColors[content.platform]} flex items-center justify-center`}>
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-500 capitalize">{content.platform}</span>
                    </div>
                    <h3 className="text-sm mb-1 truncate">{content.title}</h3>
                    <div className="flex gap-3 text-xs text-gray-600">
                      <span>{content.engagement}M 🔥</span>
                      <span>{content.views}M 👁️</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Insights */}
      <div className="p-4 bg-gray-50">
        <h2 className="text-lg mb-3">Top by Category</h2>
        <div className="space-y-2">
          {topTrends.map((trend) => (
            <div
              key={trend.id}
              className="bg-white p-3 rounded-lg flex items-center justify-between cursor-pointer hover:shadow-md transition"
              onClick={() => onNavigate('trend-details', { trend })}
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">
                  {trend.category}
                </div>
                <span className="text-sm">{trend.title}</span>
              </div>
              <span className="text-xs text-gray-500">{trend.engagement}M</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto flex justify-around p-4">
          <button className="flex flex-col items-center gap-1 text-purple-600">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs">Trends</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-gray-400"
            onClick={() => onNavigate('suggestions')}
          >
            <Lightbulb className="w-6 h-6" />
            <span className="text-xs">Ideas</span>
          </button>
        </div>
      </div>
    </div>
  );
}
