import { ArrowLeft, Instagram, Music2, Facebook, Ghost, TrendingUp } from 'lucide-react';
import { getTrendsByPlatform } from '../data/mockData';

interface PlatformViewProps {
  platform: string | null;
  onBack: () => void;
}

export function PlatformView({ platform, onBack }: PlatformViewProps) {
  if (!platform) {
    return (
      <div className="p-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <p>No platform selected</p>
      </div>
    );
  }

  const trends = getTrendsByPlatform(platform);

  const platformConfig = {
    instagram: {
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      name: 'Instagram'
    },
    tiktok: {
      icon: Music2,
      color: 'from-black to-cyan-400',
      bgColor: 'bg-gradient-to-br from-gray-900 to-cyan-50',
      name: 'TikTok'
    },
    facebook: {
      icon: Facebook,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      name: 'Facebook'
    },
    snapchat: {
      icon: Ghost,
      color: 'from-yellow-400 to-yellow-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      name: 'Snapchat'
    }
  };

  const config = platformConfig[platform as keyof typeof platformConfig];
  const Icon = config.icon;

  const totalEngagement = trends.reduce((sum, t) => sum + t.engagement, 0);
  const totalViews = trends.reduce((sum, t) => sum + t.views, 0);
  const avgEngagement = trends.length > 0 ? totalEngagement / trends.length : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.color} text-white`}>
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-2 mb-3 text-white/80">
            <ArrowLeft className="w-5 h-5" />
            Back to All Trends
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <h1>{config.name} Trends</h1>
          </div>
          <p className="text-sm text-white/80">
            {trends.length} trending content pieces
          </p>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border mb-4">
          <h3 className="text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            Platform Performance
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl">{trends.length}</div>
              <div className="text-xs text-gray-600">Trends</div>
            </div>
            <div>
              <div className="text-2xl">{totalViews.toFixed(1)}M</div>
              <div className="text-xs text-gray-600">Total Views</div>
            </div>
            <div>
              <div className="text-2xl">{avgEngagement.toFixed(1)}M</div>
              <div className="text-xs text-gray-600">Avg Engagement</div>
            </div>
          </div>
        </div>

        {/* Trending Content */}
        <h2 className="text-lg mb-3">Trending Content</h2>
        <div className="space-y-3">
          {trends.map((trend) => (
            <div key={trend.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <img
                src={trend.thumbnail}
                alt={trend.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs">
                    {trend.category}
                  </span>
                </div>
                <h3 className="text-base mb-2">{trend.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-4">
                    <span className="text-gray-600">
                      🔥 {trend.engagement}M
                    </span>
                    <span className="text-gray-600">
                      👁️ {trend.views}M
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {((trend.engagement / trend.views) * 100).toFixed(1)}% rate
                  </div>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {trend.hashtags.map((tag, i) => (
                    <span key={i} className="text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Tips */}
        <div className={`${config.bgColor} rounded-lg p-4 mt-4 border`}>
          <h3 className="text-sm mb-2">📱 {config.name} Best Practices</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            {platform === 'instagram' && (
              <>
                <li>• Post Reels for maximum reach</li>
                <li>• Use 20-30 hashtags strategically</li>
                <li>• Engage with Stories daily</li>
              </>
            )}
            {platform === 'tiktok' && (
              <>
                <li>• Keep videos under 60 seconds</li>
                <li>• Use trending sounds and effects</li>
                <li>• Post 1-3 times per day</li>
              </>
            )}
            {platform === 'facebook' && (
              <>
                <li>• Share valuable, long-form content</li>
                <li>• Engage in Groups and Communities</li>
                <li>• Use Facebook Live for reach</li>
              </>
            )}
            {platform === 'snapchat' && (
              <>
                <li>• Create custom AR filters</li>
                <li>• Use Spotlight for viral content</li>
                <li>• Post authentic, raw content</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
