// AI状态标签生成引擎 - 严格按照技术规范实现

// Amazon Rekognition API 数据结构
export interface AmazonRekognitionData {
  AgeRange: { Low: number; High: number };
  Emotions: Array<{ Type: string; Confidence: number }>;
  Smile: { Value: boolean; Confidence: number };
  Eyeglasses: { Value: boolean; Confidence: number };
  Gender: { Value: string; Confidence: number };
}

// 输出数据结构
export interface VibeGenerationResult {
  tag: string; // 生成的最终标签名
  rarity: 'Classic' | 'Rare' | 'Epic' | 'Legendary'; // 稀有度等级
  description: string; // 对应的魅力解读
  cardType: 'classic' | 'story' | 'epic'; // 卡片样式类型
}

// 2.1 年龄段意象词库 (AGE_BRACKETS) - 丰富的核心意象
const AGE_BRACKETS = [
  {
    name: 'Exploration', // 0-22
    range: [0, 22] as [number, number],
    images: ['Dawn Chaser', 'Starlight Dreamer', 'New Horizon', 'Spark Seeker', 'Wild Comet', 'Morning Spirit', 'Nova Pioneer', 'Cosmic Wanderer']
  },
  {
    name: 'Growth', // 23-29
    range: [23, 29] as [number, number],
    images: ['Sunbeam Creator', 'Urban Maverick', 'Bloom Architect', 'Trailblazer', 'Flame Keeper', 'Rising Tide', 'Emerald Phoenix', 'Quantum Jumper']
  },
  {
    name: 'Depth', // 30-38
    range: [30, 38] as [number, number],
    images: ['Moonlit Storyteller', 'Harvest Curator', 'Deepwood Guardian', 'Artisan Soul', 'Autumn Sage', 'River Oracle', 'Crystal Weaver', 'Dream Shaper']
  },
  {
    name: 'Prime', // 39-50
    range: [39, 50] as [number, number],
    images: ['Starlight Sage', 'Oceanic Philosopher', 'Legacy Architect', 'The Collector', 'Cosmic Elder', 'Time Guardian', 'Wisdom Keeper', 'Soul Navigator']
  },
  {
    name: 'Mastery', // 51-65
    range: [51, 65] as [number, number],
    images: ['Eternal Mentor', 'Chronicle Keeper', 'Ancient Scholar', 'Zen Master', 'Crystal Sage', 'Void Walker', 'Light Bearer', 'Star Weaver']
  },
  {
    name: 'Transcendence', // 66+
    range: [66, 100] as [number, number],
    images: ['Cosmic Guardian', 'Time Traveler', 'Dimension Jumper', 'Infinity Sage', 'Celestial Being', 'Quantum Master', 'Universal Consciousness', 'Enlightened One']
  }
];

// 2.2 特殊"彩蛋"标签库 (SPECIAL_TAGS) - 最高优先级标签
const SPECIAL_TAGS = [
  {
    name: 'MainCharacterEnergy',
    rarity: 'Epic' as const,
    description: 'Undeniable presence lighting up every room. Confidence and charisma that captivates.',
    condition: (data: ProcessedApiData) => data.smile.value && data.emotions.happy > 99
  },
  {
    name: 'UnfilteredSunshine',
    rarity: 'Epic' as const,
    description: 'Authentic radiance absolutely magnetic. Genuine warmth drawing everyone close.',
    condition: (data: ProcessedApiData) => data.smile.confidence > 99 && data.emotions.happy > 99
  },
  {
    name: 'TheOracle',
    rarity: 'Rare' as const,
    description: 'Ancient wisdom seeing beyond ordinary reality. Insights piercing through complexity.',
    condition: (data: ProcessedApiData) => data.age.high > 28 && data.emotions.calm > 90 && data.eyeglasses.value
  },
  {
    name: 'EffortlessGlow',
    rarity: 'Rare' as const,
    description: 'Natural beauty flowing with ease. Innate radiance captivating without effort.',
    condition: (data: ProcessedApiData) => data.age.low < 25 && (data.emotions.happy > 95 || data.smile.value)
  },
  {
    name: 'MidnightDreamer',
    rarity: 'Rare' as const,
    description: 'Poetic soul finding beauty in shadows. Introspective depth holding precious stories.',
    condition: (data: ProcessedApiData) => data.emotions.sad > 70
  },
  {
    name: 'TheAnalyst',
    rarity: 'Rare' as const,
    description: 'Mind operating with laser precision. Intellect processing the world uniquely.',
    condition: (data: ProcessedApiData) => data.eyeglasses.value && data.emotions.calm > 80
  },
  {
    name: 'UntamedSpirit',
    rarity: 'Rare' as const,
    description: 'Wild curiosity dancing in your eyes. Force of nature seeking horizons fearlessly.',
    condition: (data: ProcessedApiData) => data.age.low < 25 && (data.emotions.surprised > 80 || data.emotions.happy > 80)
  },
  {
    name: 'PoisedLeader',
    rarity: 'Rare' as const,
    description: 'Grace and strength in perfect balance. Quiet confidence commanding respect naturally.',
    condition: (data: ProcessedApiData) => data.age.high > 28 && data.emotions.calm > 80 && data.gender.value === 'FEMALE'
  },
  {
    name: 'TheVisionary',
    rarity: 'Rare' as const,
    description: 'Seeing possibilities others miss. Mind painting the future with innovation.',
    condition: (data: ProcessedApiData) => data.age.high > 28 && data.emotions.calm > 80 && data.gender.value === 'MALE'
  },
  {
    name: 'CosmicWanderer',
    rarity: 'Epic' as const,
    description: 'Transcending definitions, existing uniquely. Illuminating mysteries of being unbound.',
    condition: (data: ProcessedApiData) => (data.age.high - data.age.low) > 10 // Very wide age range suggests "undefinable"
  }
];

// 3. 数据预处理接口
interface ProcessedApiData {
  age: { low: number; high: number; mid: number };
  emotions: { [key: string]: number };
  smile: { value: boolean; confidence: number };
  eyeglasses: { value: boolean; confidence: number };
  gender: { value: string; confidence: number };
  primaryEmotion: { type: string; confidence: number };
}

// 3.1. 数据预处理函数
function preprocessApiData(apiData: AmazonRekognitionData): ProcessedApiData {
  // 计算中间年龄
  const midAge = Math.round((apiData.AgeRange.Low + apiData.AgeRange.High) / 2);

  // 扁平化情绪数据
  const emotions: { [key: string]: number } = {};
  let maxConfidence = 0;
  let primaryEmotionType = 'NEUTRAL';

  apiData.Emotions.forEach(emotion => {
    emotions[emotion.Type] = emotion.Confidence;
    if (emotion.Confidence > maxConfidence) {
      maxConfidence = emotion.Confidence;
      primaryEmotionType = emotion.Type;
    }
  });

  return {
    age: {
      low: apiData.AgeRange.Low,
      high: apiData.AgeRange.High,
      mid: midAge
    },
    emotions,
    smile: {
      value: apiData.Smile.Value,
      confidence: apiData.Smile.Confidence
    },
    eyeglasses: {
      value: apiData.Eyeglasses.Value,
      confidence: apiData.Eyeglasses.Confidence
    },
    gender: {
      value: apiData.Gender.Value,
      confidence: apiData.Gender.Confidence
    },
    primaryEmotion: {
      type: primaryEmotionType,
      confidence: maxConfidence
    }
  };
}

// 根据稀有度确定卡片类型
function getCardTypeByRarity(rarity: 'Classic' | 'Rare' | 'Epic' | 'Legendary'): 'classic' | 'story' | 'epic' {
  switch (rarity) {
    case 'Epic':
    case 'Legendary':
      return 'epic';
    case 'Rare':
      return 'story';
    case 'Classic':
    default:
      return 'classic';
  }
}

// 随机决定稀有度（游戏化体验）
function determineRandomRarity(): 'Classic' | 'Rare' | 'Epic' | 'Legendary' {
  const random = Math.random() * 100;

  if (random < 3) return 'Legendary';      // 3% 传说
  if (random < 20) return 'Epic';          // 17% 史诗
  if (random < 50) return 'Rare';          // 30% 稀有
  return 'Classic';                        // 50% 经典
}

// 3.2. 核心实现逻辑：generateVibeTag(apiData) 函数
export function generateVibeTag(apiData: AmazonRekognitionData): VibeGenerationResult {
  try {
    // 数据预处理
    const data = preprocessApiData(apiData);

    // 第一步：检查"彩蛋"标签
    for (const specialTag of SPECIAL_TAGS) {
      if (specialTag.condition(data)) {
        return {
          tag: specialTag.name,
          rarity: specialTag.rarity,
          description: specialTag.description,
          cardType: getCardTypeByRarity(specialTag.rarity)
        };
      }
    }

    // 第二步：执行"主标签公式"

    // 确定年龄段 (ageBracket)
    const ageBracket = AGE_BRACKETS.find(bracket =>
      data.age.mid >= bracket.range[0] && data.age.mid <= bracket.range[1]
    ) || AGE_BRACKETS[3]; // 默认使用智慧期

    // 添加随机因子，增加结果的多样性和不可预测性
    let randomSeed = Date.now() + Math.random() * 1000;
    const originalRandom = Math.random;
    Math.random = function() {
      const x = Math.sin(randomSeed++) * 10000;
      return x - Math.floor(x);
    };

    // 使用后恢复原始random函数
    const restoreRandom = () => {
      Math.random = originalRandom;
    };

    // 确定气质修饰词 (vibeModifier) - 丰富的气质词库
    let vibeModifier: string;

    if (data.eyeglasses.value) {
      // 眼镜用户高优先级 - 智慧系列
      const scholarlyModifiers = ['Scholarly', 'Focused', 'Analytical', 'Cerebral', 'Intellectual', 'Methodical', 'Contemplative', 'Philosophical'];
      vibeModifier = scholarlyModifiers[Math.floor(Math.random() * scholarlyModifiers.length)];
    } else if (data.primaryEmotion.type === 'HAPPY' && data.primaryEmotion.confidence > 70 || data.smile.value) {
      // 开心/微笑 - 活力系列
      const happyModifiers = ['Radiant', 'Joyful', 'Luminous', 'Vibrant', 'Playful', 'Bubbly', 'Exuberant', 'Effervescent', 'Sunny', 'Cheerful'];
      vibeModifier = happyModifiers[Math.floor(Math.random() * happyModifiers.length)];
    } else if (data.primaryEmotion.type === 'CALM' && data.primaryEmotion.confidence > 70) {
      // 冷静 - 宁静系列
      const calmModifiers = ['Serene', 'Tranquil', 'Poised', 'Mindful', 'Grounded', 'Peaceful', 'Balanced', 'Centered', 'Zen', 'Harmonious'];
      vibeModifier = calmModifiers[Math.floor(Math.random() * calmModifiers.length)];
    } else if (data.primaryEmotion.type === 'SURPRISED') {
      // 惊讶 - 灵感系列
      const surprisedModifiers = ['Curious', 'Inspired', 'Whimsical', 'Eclectic', 'Adventurous', 'Inquisitive', 'Spontaneous', 'Wonder-filled', 'Magical', 'Creative'];
      vibeModifier = surprisedModifiers[Math.floor(Math.random() * surprisedModifiers.length)];
    } else if (data.primaryEmotion.type === 'SAD') {
      // 悲伤 - 深度系列（正面转化）
      const sadModifiers = ['Soulful', 'Poetic', 'Introspective', 'Resonant', 'Melancholic', 'Reflective', 'Deep', 'Mystical', 'Pensive', 'Dreamy'];
      vibeModifier = sadModifiers[Math.floor(Math.random() * sadModifiers.length)];
    } else if (data.primaryEmotion.type === 'ANGRY' && data.primaryEmotion.confidence > 60) {
      // 愤怒 - 力量系列（正面转化）
      const angryModifiers = ['Passionate', 'Fiery', 'Bold', 'Determined', 'Courageous', 'Intense', 'Powerful', 'Dynamic', 'Strong-willed', 'Fierce'];
      vibeModifier = angryModifiers[Math.floor(Math.random() * angryModifiers.length)];
    } else if (data.primaryEmotion.type === 'CONFUSED') {
      // 困惑 - 探索系列
      const confusedModifiers = ['Inquisitive', 'Explorative', 'Thoughtful', 'Searching', 'Curious', 'Investigative', 'Questing', 'Seeking', 'Wondering', 'Pondering'];
      vibeModifier = confusedModifiers[Math.floor(Math.random() * confusedModifiers.length)];
    } else {
      // 默认 - 真实系列
      const defaultModifiers = ['Authentic', 'Unique', 'Genuine', 'Natural', 'Original', 'Pure', 'True', 'Real', 'Honest', 'Unfiltered'];
      vibeModifier = defaultModifiers[Math.floor(Math.random() * defaultModifiers.length)];
    }

    // 添加基于年龄和性别的额外修饰词，增加区分度
    let additionalModifier = '';

    // 基于性别的微调（20%概率）
    if (Math.random() < 0.2 && data.gender.value !== 'UNKNOWN') {
      if (data.gender.value === 'FEMALE') {
        const feminineModifiers = ['Ethereal', 'Graceful', 'Elegant', 'Divine', 'Angelic', 'Celestial'];
        additionalModifier = feminineModifiers[Math.floor(Math.random() * feminineModifiers.length)];
      } else if (data.gender.value === 'MALE') {
        const masculineModifiers = ['Majestic', 'Noble', 'Heroic', 'Regal', 'Stalwart', 'Valiant'];
        additionalModifier = masculineModifiers[Math.floor(Math.random() * masculineModifiers.length)];
      }
    }

    // 基于年龄段的特殊修饰词（15%概率）
    if (Math.random() < 0.15) {
      if (data.age.mid < 25) {
        const youthfulModifiers = ['Youthful', 'Fresh', 'New', 'Emerging', 'Blooming'];
        additionalModifier = additionalModifier ? `${additionalModifier} ${youthfulModifiers[Math.floor(Math.random() * youthfulModifiers.length)]}` : youthfulModifiers[Math.floor(Math.random() * youthfulModifiers.length)];
      } else if (data.age.mid > 60) {
        const wiseModifiers = ['Ancient', 'Eternal', 'Timeless', 'Wise', 'Venerable'];
        additionalModifier = additionalModifier ? `${additionalModifier} ${wiseModifiers[Math.floor(Math.random() * wiseModifiers.length)]}` : wiseModifiers[Math.floor(Math.random() * wiseModifiers.length)];
      }
    }

    // 组合生成最终标签 - 移除所有空格使其更紧凑
    const selectedImage = ageBracket.images[Math.floor(Math.random() * ageBracket.images.length)].replace(/\s+/g, '');
    const cleanModifier = vibeModifier.replace(/\s+/g, '');
    const cleanAdditionalModifier = additionalModifier.replace(/\s+/g, '');

    let finalTag = cleanModifier + selectedImage;

    // 如果有额外修饰词，添加到前面
    if (cleanAdditionalModifier) {
      finalTag = cleanAdditionalModifier + finalTag;
    }

    // 生成魅力解读
    const description = generateDescription(vibeModifier, ageBracket.name);

    // 根据随机概率决定稀有度（增加游戏化体验）
    const rarity = determineRandomRarity();

    // 恢复原始random函数
  restoreRandom();

  return {
      tag: finalTag,
      rarity,
      description,
      cardType: getCardTypeByRarity(rarity)
    };

  } catch (error) {
    console.error('Vibe generation error:', error);

    // 第三步：设定默认/备用方案 (Fallback)
    return {
      tag: 'UniqueYou',
      rarity: 'Classic',
      description: 'Limited edition in the universe, naturally radiant.',
      cardType: 'classic'
    };
  }
}

// 生成魅力解读 - 更简洁的版本
function generateDescription(modifier: string, agePeriodName: string): string {
  const descriptions: { [key: string]: string } = {
    // 活力系列
    'Radiant': `Full of vitality, bringing energy to all around you.`,
    'Joyful': `Pure joy radiates from within, naturally uplifting.`,
    'Luminous': `You glow from within, illuminating new paths.`,
    'Vibrant': `Infectious energy, dynamic and impossible to ignore.`,
    'Playful': `Delightfully playful, finding magic in moments.`,
    'Bubbly': `Effervescent spirit, bright and refreshing.`,
    'Exuberant': `Boundless enthusiasm that inspires others.`,
    'Effervescent': `Sparkling energy that lights up any room.`,
    'Sunny': `Warm presence that brightens everyone's day.`,
    'Cheerful': `Uplifting spirit that spreads positivity.`,

    // 宁静系列
    'Serene': `Inner peace that gently illuminates your path.`,
    'Tranquil': `Calm presence reflecting clarity and wisdom.`,
    'Poised': `Elegant composure, steady under pressure.`,
    'Mindful': `Present awareness, fully engaged in each moment.`,
    'Grounded': `Deep connection providing stability and strength.`,
    'Peaceful': `Tranquil nature that soothes and centers.`,
    'Balanced': `Harmonious equilibrium in all you do.`,
    'Centered': `Anchored calm amid life's storms.`,
    'Zen': `Peaceful mindfulness in every action.`,
    'Harmonious': `Beautiful balance creating unity.`,

    // 灵感系列
    'Curious': `Wonder-filled mind seeking new discoveries.`,
    'Inspired': `Creative energy transforming ideas to reality.`,
    'Whimsical': `Magical worldview finding delight everywhere.`,
    'Eclectic': `Unique blend creating something special.`,
    'Adventurous': `Bold spirit embracing the unknown.`,
    'Inquisitive': `Questioning mind uncovering truths.`,
    'Spontaneous': `Free spirit following joy's call.`,
    'Wonder-filled': `Eyes that see magic in the ordinary.`,
    'Magical': `Enchanting presence that captivates.`,
    'Creative': `Imaginative soul bringing visions to life.`,

    // 深度系列
    'Soulful': `Profound depth holding stories that touch hearts.`,
    'Poetic': `Expressive soul finding poetry in life.`,
    'Introspective': `Deep self-awareness and compassion.`,
    'Resonant': `Meaningful connections that touch others deeply.`,
    'Melancholic': `Beautiful depth in contemplation.`,
    'Reflective': `Thoughtful nature pondering life's mysteries.`,
    'Deep': `Profound understanding beneath the surface.`,
    'Mystical': `Ethereal quality touching the sublime.`,
    'Pensive': `Contemplative spirit seeking meaning.`,
    'Dreamy': `Imaginative soul wandering beautiful realms.`,

    // 智慧系列
    'Scholarly': `Intellectual curiosity always learning, growing.`,
    'Focused': `Remarkable dedication achieving excellence.`,
    'Analytical': `Elegant precision finding hidden patterns.`,
    'Cerebral': `Impressive depth thinking on multiple levels.`,
    'Intellectual': `Brilliant mind exploring ideas deeply.`,
    'Methodical': `Systematic approach mastering complexity.`,
    'Contemplative': `Thoughtful consideration of all angles.`,
    'Philosophical': `Deep wisdom questioning existence itself.`,

    // 力量系列
    'Passionate': `Fierce energy pursuing what matters most.`,
    'Fiery': `Intense spirit that cannot be dimmed.`,
    'Bold': `Courageous presence making waves.`,
    'Determined': `Unwavering focus achieving the impossible.`,
    'Courageous': `Brave heart facing challenges head-on.`,
    'Intense': `Powerful energy commanding attention.`,
    'Powerful': `Strong force shaping your world.`,
    'Dynamic': `Energetic presence driving change.`,
    'Strong-willed': `Resolute spirit bending to no one.`,
    'Fierce': `Formidable strength protecting what's precious.`,

    // 真实系列
    'Authentic': `Genuinely yourself, beautiful in originality.`,
    'Unique': `One-of-a-kind charm, creating your own style.`,
    'Genuine': `Refreshingly real and wonderfully you.`,
    'Natural': `Effortless grace in your true self.`,
    'Original': `Unprecedented spirit breaking the mold.`,
    'Pure': `Untainted essence shining through.`,
    'True': `Honest soul living with integrity.`,
    'Real': `Unfiltered authenticity that resonates.`,
    'Honest': `Transparent heart speaking truth.`,
    'Unfiltered': `Raw beauty without pretense.`,

    // 额外修饰词系列
    'Ethereal': `Otherworldly grace transcending the ordinary.`,
    'Graceful': `Elegant movement through life's dance.`,
    'Elegant': `Refined beauty in every gesture.`,
    'Divine': `Celestial quality touching the sacred.`,
    'Angelic': `Pure light blessing those nearby.`,
    'Celestial': `Starlike presence from beyond.`,
    'Majestic': `Regal bearing commanding respect.`,
    'Noble': `Honorable character standing tall.`,
    'Heroic': `Brave spirit rising to the occasion.`,
    'Regal': `Royal presence with natural authority.`,
    'Stalwart': `Steadfast strength never wavering.`,
    'Valiant': `Courageous heart facing any challenge.`,
    'Youthful': `Fresh energy full of possibility.`,
    'Fresh': `New perspective bringing innovation.`,
    'New': `Emerging force shaping tomorrow.`,
    'Emerging': `Rising star on the ascent.`,
    'Blooming': `Unfolding beauty reaching potential.`,
    'Ancient': `Timeless wisdom spanning ages.`,
    'Eternal': `Enduring spirit beyond time.`,
    'Timeless': `Ageless quality never fading.`,
    'Wise': `Deep understanding guiding others.`,
    'Venerable': `Respected presence earning admiration.`
  };

  return descriptions[modifier] || `Unique charm of ${agePeriodName}, unforgettable.`;
}

// 适配器函数：将现有的FaceAnalysisData转换为AmazonRekognitionData格式
export function adaptToAmazonFormat(faceData: any): AmazonRekognitionData {
  // 将0-1范围的情绪值转换为0-100的置信度
  const convertEmotion = (value: number) => Math.round(value * 100);

  return {
    AgeRange: {
      Low: Math.max(0, faceData.age - 2),
      High: faceData.age + 2
    },
    Emotions: faceData.emotion ? [
      { Type: 'HAPPY', Confidence: convertEmotion(faceData.emotion.happiness || 0) },
      { Type: 'CALM', Confidence: convertEmotion(faceData.emotion.neutral || 0) },
      { Type: 'SAD', Confidence: convertEmotion(faceData.emotion.sadness || 0) },
      { Type: 'ANGRY', Confidence: convertEmotion(faceData.emotion.anger || 0) },
      { Type: 'SURPRISED', Confidence: convertEmotion(faceData.emotion.surprise || 0) },
      { Type: 'DISGUSTED', Confidence: convertEmotion(faceData.emotion.disgust || 0) },
      { Type: 'FEAR', Confidence: convertEmotion(faceData.emotion.fear || 0) },
      { Type: 'CONFUSED', Confidence: convertEmotion(faceData.emotion.contempt || 0) }
    ].filter(e => e.Confidence > 10) : [],
    Smile: {
      Value: (faceData.smile || 0) > 0.5,
      Confidence: Math.round((faceData.smile || 0) * 100)
    },
    Eyeglasses: {
      Value: faceData.glasses && faceData.glasses !== 'None',
      Confidence: faceData.glasses ? 95 : 5
    },
    Gender: {
      Value: faceData.gender?.toUpperCase() || 'UNKNOWN',
      Confidence: 85
    }
  };
}

// 主要导出函数，兼容现有接口
export function generateVibeTagLegacy(faceData: any): VibeGenerationResult {
  try {
    const amazonData = adaptToAmazonFormat(faceData);
    return generateVibeTag(amazonData);
  } catch (error) {
    console.error('Legacy vibe generation error:', error);
    return {
      tag: 'UniqueYou',
      rarity: 'Classic',
      description: 'Limited edition in the universe, naturally radiant.',
      cardType: 'classic'
    };
  }
}