import { DailyIntent, Format, Platform } from '../App';

export interface AnnotatedContent {
  id: string;
  platform: Platform;
  format: Format;
  thumbnail: string;
  title: string;
  creator: string;
  views: string;
  engagement: string;
  
  // AI Annotations
  whyThisWorks: string;
  hookType: string;
  formatPattern: string;
  whatToSteal: string;
  howToAdapt: string;
  
  // Metadata
  effortRequired: 'low' | 'medium' | 'high';
  emotionalTone: string;
  audienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface ContentDecision {
  id: string;
  format: Format;
  platform: Platform;
  objective: string;
  
  hook: {
    primary: string;
    variants: string[];
  };
  
  script: {
    structure: string;
    outline: string[];
  };
  
  shotList: string[];
  
  caption: {
    short: string;
    long: string;
  };
  
  cta: string[];
  
  estimatedTime: string;
  confidenceScore: number;
  
  reasoning: string;
}

// Mock curated content based on intent
export const getMockCuratedContent = (intent: DailyIntent): AnnotatedContent[] => {
  const allContent: AnnotatedContent[] = [
    {
      id: '1',
      platform: 'instagram',
      format: 'reels',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
      title: 'The 3-Second Hook Formula',
      creator: '@contentking',
      views: '2.4M',
      engagement: '180K',
      whyThisWorks: 'Opens with pattern interrupt using contrarian statement. Viewers expect X, gets Y immediately.',
      hookType: 'Contrarian opener',
      formatPattern: '3-sec hook → proof point → 3 examples → callback to hook',
      whatToSteal: 'The "Everyone says X, but here\'s why Y" structure in first 2 seconds',
      howToAdapt: 'Use your niche: "Everyone says [common belief], but [your contrarian take]"',
      effortRequired: 'low',
      emotionalTone: 'confident',
      audienceLevel: 'beginner'
    },
    {
      id: '2',
      platform: 'instagram',
      format: 'carousels',
      thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400',
      title: '5 Storytelling Frameworks',
      creator: '@storycraft',
      views: '890K',
      engagement: '67K',
      whyThisWorks: 'Each slide builds tension. Uses numbers for clarity. Final slide delivers unexpected insight.',
      hookType: 'Curiosity gap',
      formatPattern: 'Problem slide → 3-4 framework slides → unexpected twist → CTA',
      whatToSteal: 'The tension build between slides 3-4 before the payoff',
      howToAdapt: 'Keep each slide to 7 words max. Build towards one counterintuitive insight.',
      effortRequired: 'medium',
      emotionalTone: 'educational',
      audienceLevel: 'intermediate'
    },
    {
      id: '3',
      platform: 'tiktok',
      format: 'reels',
      thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400',
      title: 'POV: You finally get it',
      creator: '@mindsetshift',
      views: '5.2M',
      engagement: '420K',
      whyThisWorks: 'POV format creates immediate relatability. Emotion-first, explanation second.',
      hookType: 'POV relatability',
      formatPattern: 'POV setup → emotional peak → satisfying resolution',
      whatToSteal: 'The specific moment of realization shown through expression, not words',
      howToAdapt: 'Pick one specific "aha moment" your audience has. Show the before/after emotionally.',
      effortRequired: 'low',
      emotionalTone: 'relatable',
      audienceLevel: 'beginner'
    },
    {
      id: '4',
      platform: 'youtube',
      format: 'reels',
      thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400',
      title: 'Why Your Hook Fails',
      creator: '@creatorcode',
      views: '1.8M',
      engagement: '145K',
      whyThisWorks: 'Calls out specific mistake in first line. Creates immediate self-reflection.',
      hookType: 'Callout + authority',
      formatPattern: 'Callout hook → diagnosis → solution → proof',
      whatToSteal: 'The direct "You\'re doing X wrong" opening that doesn\'t feel mean',
      howToAdapt: 'Start with: "The reason your [thing] isn\'t working..." then explain compassionately.',
      effortRequired: 'medium',
      emotionalTone: 'helpful',
      audienceLevel: 'intermediate'
    },
    {
      id: '5',
      platform: 'tiktok',
      format: 'reels',
      thumbnail: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=400',
      title: 'The Most Underrated Format',
      creator: '@formatlab',
      views: '3.1M',
      engagement: '290K',
      whyThisWorks: 'Promises insider knowledge. "Underrated" implies unfair advantage.',
      hookType: 'Secret reveal',
      formatPattern: 'Tease → build credibility → reveal → why it works → CTA',
      whatToSteal: 'Positioning something simple as a "secret" increases perceived value',
      howToAdapt: 'Take a basic tactic. Frame it as: "The [adjective] way to [outcome] no one talks about"',
      effortRequired: 'low',
      emotionalTone: 'exclusive',
      audienceLevel: 'beginner'
    },
    {
      id: '6',
      platform: 'instagram',
      format: 'carousels',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
      title: 'Hook Psychology Breakdown',
      creator: '@psychcontent',
      views: '1.2M',
      engagement: '98K',
      whyThisWorks: 'Deep analysis appeals to pattern learners. Each slide = one mental model.',
      hookType: 'Authority + education',
      formatPattern: 'Bold claim → 4-5 principle slides → how to apply',
      whatToSteal: 'Breaking complex ideas into single-principle slides',
      howToAdapt: 'Pick 1 concept. Dedicate 1 slide per core principle. No fluff.',
      effortRequired: 'high',
      emotionalTone: 'analytical',
      audienceLevel: 'advanced'
    },
    {
      id: '7',
      platform: 'tiktok',
      format: 'reels',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
      title: 'Behind My 10M View Video',
      creator: '@viralsecrets',
      views: '4.7M',
      engagement: '380K',
      whyThisWorks: 'Behind-the-scenes creates trust. Big number creates credibility.',
      hookType: 'Proof + transparency',
      formatPattern: 'Show result → reveal strategy → exact execution → encourage action',
      whatToSteal: 'Showing your receipts (analytics) builds instant credibility',
      howToAdapt: 'Share your wins with humility. Explain the exact strategy, not just the outcome.',
      effortRequired: 'medium',
      emotionalTone: 'transparent',
      audienceLevel: 'intermediate'
    },
    {
      id: '8',
      platform: 'instagram',
      format: 'reels',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      title: 'Format Breakdown: Listicle',
      creator: '@formatexpert',
      views: '760K',
      engagement: '54K',
      whyThisWorks: 'Meta-content about content. Appeals to creators looking to improve.',
      hookType: 'Analytical breakdown',
      formatPattern: 'Format showcase → structure reveal → why it works → when to use',
      whatToSteal: 'The frame-by-frame dissection of what makes a format effective',
      howToAdapt: 'Pick a trending video in your niche. Break down its exact structure.',
      effortRequired: 'medium',
      emotionalTone: 'educational',
      audienceLevel: 'intermediate'
    }
  ];

  // Filter based on intent
  return allContent.filter(content => {
    const matchesPlatform = intent.platform.includes(content.platform);
    const matchesFormat = intent.format.includes(content.format);
    
    // Energy-based filtering
    let matchesEnergy = true;
    if (intent.energy === 'low') {
      matchesEnergy = content.effortRequired === 'low';
    } else if (intent.energy === 'medium') {
      matchesEnergy = content.effortRequired !== 'high';
    }
    
    return matchesPlatform && matchesFormat && matchesEnergy;
  }).slice(0, 12); // Limit to 12 items max
};

// Mock content decision for Creator Mode
export const generateMockDecision = (intent: DailyIntent): ContentDecision => {
  const primaryFormat = intent.format[0];
  const primaryPlatform = intent.platform[0];
  
  // Analyze state text for additional context
  const isLowEnergy = intent.energy === 'low' || 
    intent.stateText.toLowerCase().includes('tired') ||
    intent.stateText.toLowerCase().includes('overwhelmed') ||
    intent.stateText.toLowerCase().includes('simple');
  
  const isMotivated = intent.stateText.toLowerCase().includes('motivated') ||
    intent.stateText.toLowerCase().includes('inspired');

  if (primaryFormat === 'reels' && isLowEnergy) {
    return {
      id: 'decision-1',
      format: 'reels',
      platform: primaryPlatform,
      objective: 'High saves (educational value)',
      hook: {
        primary: "The content mistake everyone makes (and how to fix it in 10 seconds)",
        variants: [
          "Why your content isn't hitting (it's not what you think)",
          "I wish someone told me this when I started creating content"
        ]
      },
      script: {
        structure: 'Hook → Problem → Solution → Proof → CTA',
        outline: [
          '0-3s: State the hook while showing a relatable frustrated expression',
          '3-8s: "Most creators think it\'s about [common belief]..." - shake head',
          '8-15s: "But it\'s actually about [your insight]" - show simple example on screen',
          '15-22s: "Here\'s what changed for me..." - show before/after stat',
          '22-28s: "Try this today" - simple actionable step',
          '28-30s: "Follow for more" - smile and point'
        ]
      },
      shotList: [
        'Close-up shot, natural light, clean background',
        'Optional: overlay text with key point at 8s mark',
        'Keep face in frame throughout - builds connection',
        'One simple graphic/stat overlay (can create in Canva in 5 min)'
      ],
      caption: {
        short: 'The content fix nobody talks about 👇',
        long: `I was stuck at [X views/followers] for months.\n\nEveryone said "just post more" or "be consistent."\n\nBut the real issue? [Your insight from video].\n\nOnce I fixed this, everything changed.\n\nIf you're struggling with [problem], try [solution] today.\n\nLet me know if this helps 💬\n\n#contentcreator #contenttips #socialmediatips #creatorgrowth`
      },
      cta: [
        'Save this for later',
        'Follow for daily creator tips',
        'Try this and let me know how it goes'
      ],
      estimatedTime: '15-20 minutes (phone only, minimal editing)',
      confidenceScore: 87,
      reasoning: 'Based on your "simple" preference and current trending hooks. This format is proven for saves. Faceless-friendly with simple text overlay option. Low editing required.'
    };
  }

  if (primaryFormat === 'carousels') {
    return {
      id: 'decision-2',
      format: 'carousels',
      platform: primaryPlatform,
      objective: 'High engagement (comments + shares)',
      hook: {
        primary: "5 content patterns that always work (steal these)",
        variants: [
          "Content formats I wish I knew 2 years ago",
          "The only 5 content structures you actually need"
        ]
      },
      script: {
        structure: 'Slide 1: Hook → Slides 2-6: Pattern + Example → Slide 7: Summary + CTA',
        outline: [
          'Slide 1: Bold statement + promise of value',
          'Slide 2-6: Each slide = 1 pattern (name it + show quick example)',
          'Slide 7: "Which one will you try first? Comment below"'
        ]
      },
      shotList: [
        'Can design entirely in Canva (use carousel templates)',
        'Keep text to 7 words max per slide',
        'Use consistent color scheme (choose 2-3 colors)',
        'Add one simple icon per slide for visual interest'
      ],
      caption: {
        short: 'Content patterns that never fail 📌',
        long: `After analyzing 500+ viral posts, these 5 patterns show up again and again.\n\nSave this and reference it every time you\'re stuck.\n\nWhich pattern resonates with you? Comment the number 👇\n\n#contentpatterns #contentmarketing #contentcreator #socialmediatips #creatoreconomy`
      },
      cta: [
        'Save this for when you need ideas',
        'Share with a creator friend',
        'Comment which pattern you\'ll try first'
      ],
      estimatedTime: '30-40 minutes (Canva design + caption)',
      confidenceScore: 92,
      reasoning: 'Carousels are perfect for your analytical intent. List-based content performs consistently well. Easy to batch create once you have the template.'
    };
  }

  // Default fallback
  return {
    id: 'decision-default',
    format: primaryFormat,
    platform: primaryPlatform,
    objective: 'Reach (get in front of new audience)',
    hook: {
      primary: "Here's what everyone gets wrong about [your topic]",
      variants: [
        "The truth about [topic] nobody tells you",
        "After [X years/attempts], I finally figured out [topic]"
      ]
    },
    script: {
      structure: 'Hook → Common mistake → Why it matters → Your solution → CTA',
      outline: [
        '0-3s: Open with controversial or surprising statement',
        '3-10s: Explain the common mistake (make it relatable)',
        '10-18s: Why this matters (create stakes)',
        '18-25s: Your solution or insight',
        '25-30s: Clear CTA (follow, save, comment)'
      ]
    },
    shotList: [
      'Direct to camera or voiceover with b-roll',
      'Keep it simple - focus on message over production',
      'Optional text overlays for key points'
    ],
    caption: {
      short: 'This changed everything for me 💡',
      long: `Most people think [common belief].\n\nI used to think that too.\n\nBut after [experience], I realized [insight].\n\nIf you're [target audience], this might help you too.\n\nWhat's your experience? 👇`
    },
    cta: [
      'Follow for more insights',
      'Save this if it resonates',
      'Share your thoughts below'
    ],
    estimatedTime: '20-30 minutes',
    confidenceScore: 78,
    reasoning: 'This format adapts well to multiple platforms and requires minimal setup. Based on your intent and current trends.'
  };
};
