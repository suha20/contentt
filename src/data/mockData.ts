import { TrendingContent, ContentIdea } from '../App';

// Mock data representing trending content from various platforms
// In a real app, this would come from social media APIs
export const trendingContent: TrendingContent[] = [
  // Instagram trends
  {
    id: 'ig-1',
    platform: 'instagram',
    title: 'Sunset Photography Challenge',
    description: 'Golden hour photography with dramatic silhouettes',
    category: 'Photography',
    engagement: 2.4,
    views: 15.3,
    thumbnail: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400',
    hashtags: ['#GoldenHour', '#SunsetPhotography', '#NatureLovers']
  },
  {
    id: 'ig-2',
    platform: 'instagram',
    title: 'Minimalist Home Decor',
    description: 'Clean, aesthetic home organization and styling tips',
    category: 'Lifestyle',
    engagement: 3.1,
    views: 22.7,
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400',
    hashtags: ['#MinimalistHome', '#HomeDecor', '#AestheticVibes']
  },
  // TikTok trends
  {
    id: 'tt-1',
    platform: 'tiktok',
    title: 'Dance Challenge: Viral Beat',
    description: 'High-energy dance moves to trending audio',
    category: 'Dance',
    engagement: 8.9,
    views: 45.2,
    thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc9498041f?w=400',
    hashtags: ['#DanceChallenge', '#ViralDance', '#TikTokTrend']
  },
  {
    id: 'tt-2',
    platform: 'tiktok',
    title: 'Quick Recipe Hacks',
    description: '60-second cooking tips and food presentation',
    category: 'Food',
    engagement: 6.5,
    views: 38.4,
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
    hashtags: ['#FoodHacks', '#QuickRecipes', '#CookingTips']
  },
  {
    id: 'tt-3',
    platform: 'tiktok',
    title: 'Get Ready With Me - Glam',
    description: 'Full glam makeup transformation tutorials',
    category: 'Beauty',
    engagement: 7.2,
    views: 41.1,
    thumbnail: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400',
    hashtags: ['#GRWM', '#MakeupTutorial', '#GlamLook']
  },
  // Facebook trends
  {
    id: 'fb-1',
    platform: 'facebook',
    title: 'DIY Home Projects',
    description: 'Budget-friendly home improvement tutorials',
    category: 'DIY',
    engagement: 4.2,
    views: 28.9,
    thumbnail: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400',
    hashtags: ['#DIYProjects', '#HomeImprovement', '#BudgetFriendly']
  },
  {
    id: 'fb-2',
    platform: 'facebook',
    title: 'Motivational Stories',
    description: 'Inspirational personal journey and success stories',
    category: 'Motivation',
    engagement: 5.8,
    views: 32.6,
    thumbnail: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400',
    hashtags: ['#Motivation', '#SuccessStory', '#Inspiration']
  },
  // Snapchat trends
  {
    id: 'sc-1',
    platform: 'snapchat',
    title: 'AR Filter Challenges',
    description: 'Creative augmented reality filter transformations',
    category: 'Technology',
    engagement: 3.9,
    views: 19.5,
    thumbnail: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=400',
    hashtags: ['#ARFilter', '#SnapchatFun', '#FilterChallenge']
  },
  {
    id: 'sc-2',
    platform: 'snapchat',
    title: 'Day in My Life',
    description: 'Behind-the-scenes daily routine vlogs',
    category: 'Lifestyle',
    engagement: 4.5,
    views: 24.3,
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400',
    hashtags: ['#DayInMyLife', '#Vlog', '#DailyRoutine']
  }
];

export const contentIdeas: ContentIdea[] = [
  {
    id: 'idea-1',
    title: 'Sunset Dance Challenge',
    description: 'Combine the viral dance trend with golden hour photography. Create a choreographed routine during sunset with dramatic lighting.',
    platforms: ['TikTok', 'Instagram'],
    difficulty: 'Medium',
    estimatedReach: '50K - 200K',
    basedOnTrends: ['Dance Challenge: Viral Beat', 'Sunset Photography Challenge']
  },
  {
    id: 'idea-2',
    title: 'Minimalist Recipe Presentation',
    description: 'Showcase quick recipes with minimalist plating and aesthetic home backgrounds. Focus on clean, simple food photography.',
    platforms: ['Instagram', 'TikTok'],
    difficulty: 'Easy',
    estimatedReach: '30K - 100K',
    basedOnTrends: ['Quick Recipe Hacks', 'Minimalist Home Decor']
  },
  {
    id: 'idea-3',
    title: 'DIY Home Makeover Series',
    description: 'Document your home transformation using budget-friendly tips. Create before/after content with AR filters showing the vision.',
    platforms: ['Facebook', 'Snapchat', 'Instagram'],
    difficulty: 'Hard',
    estimatedReach: '100K - 500K',
    basedOnTrends: ['DIY Home Projects', 'Minimalist Home Decor', 'AR Filter Challenges']
  },
  {
    id: 'idea-4',
    title: 'Motivational GRWM',
    description: 'Get Ready With Me videos paired with motivational storytelling. Share your journey while doing your makeup routine.',
    platforms: ['TikTok', 'Snapchat'],
    difficulty: 'Easy',
    estimatedReach: '40K - 150K',
    basedOnTrends: ['Get Ready With Me - Glam', 'Motivational Stories']
  },
  {
    id: 'idea-5',
    title: 'Day in Life: Content Creator',
    description: 'Show behind-the-scenes of creating trending content. Meta-content about the content creation process with AR effects.',
    platforms: ['Snapchat', 'Instagram', 'TikTok'],
    difficulty: 'Medium',
    estimatedReach: '60K - 250K',
    basedOnTrends: ['Day in My Life', 'AR Filter Challenges']
  }
];

export const getTrendsByPlatform = (platform: string) => {
  return trendingContent.filter(content => content.platform === platform);
};

export const getTopTrendingByCategory = () => {
  const categories: { [key: string]: TrendingContent } = {};
  
  trendingContent.forEach(content => {
    if (!categories[content.category] || content.engagement > categories[content.category].engagement) {
      categories[content.category] = content;
    }
  });
  
  return Object.values(categories);
};

export const getPlatformStats = () => {
  const stats = {
    instagram: { total: 0, avgEngagement: 0, totalViews: 0 },
    tiktok: { total: 0, avgEngagement: 0, totalViews: 0 },
    facebook: { total: 0, avgEngagement: 0, totalViews: 0 },
    snapchat: { total: 0, avgEngagement: 0, totalViews: 0 }
  };

  trendingContent.forEach(content => {
    stats[content.platform].total += 1;
    stats[content.platform].avgEngagement += content.engagement;
    stats[content.platform].totalViews += content.views;
  });

  Object.keys(stats).forEach(platform => {
    const platformKey = platform as keyof typeof stats;
    if (stats[platformKey].total > 0) {
      stats[platformKey].avgEngagement = stats[platformKey].avgEngagement / stats[platformKey].total;
    }
  });

  return stats;
};
