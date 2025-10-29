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
    name: 'Main Character Energy',
    rarity: 'Epic' as const,
    description: 'You radiate an undeniable presence, as if the entire universe has scripted this moment just for you. Your confidence and charisma light up every room you enter.',
    condition: (data: ProcessedApiData) => data.smile.value && data.emotions.happy > 99
  },
  {
    name: 'Unfiltered Sunshine',
    rarity: 'Epic' as const,
    description: 'Your authentic radiance beams like pure sunlight, unfiltered and absolutely magnetic. People are naturally drawn to your genuine warmth and infectious energy.',
    condition: (data: ProcessedApiData) => data.smile.confidence > 99 && data.emotions.happy > 99
  },
  {
    name: 'The Oracle',
    rarity: 'Rare' as const,
    description: 'Your eyes hold ancient wisdom, as if you can see beyond the veil of ordinary reality. Your insights pierce through complexity with startling clarity.',
    condition: (data: ProcessedApiData) => data.age.high > 28 && data.emotions.calm > 90 && data.eyeglasses.value
  },
  {
    name: 'Effortless Glow',
    rarity: 'Rare' as const,
    description: 'Your beauty flows with natural ease, like sunlight dancing on water. There\'s an innate radiance about you that requires no effort to captivate.',
    condition: (data: ProcessedApiData) => data.age.low < 25 && (data.emotions.happy > 95 || data.smile.value)
  },
  {
    name: 'Midnight Dreamer',
    rarity: 'Rare' as const,
    description: 'You possess a poetic soul that finds beauty in shadows and depth in silence. Your introspective nature holds stories that the midnight sky would envy.',
    condition: (data: ProcessedApiData) => data.emotions.sad > 70
  },
  {
    name: 'The Analyst',
    rarity: 'Rare' as const,
    description: 'Your mind operates with laser-like precision, dissecting complexity with intellectual elegance. Behind those glasses lies a brain that processes the world in fascinating dimensions.',
    condition: (data: ProcessedApiData) => data.eyeglasses.value && data.emotions.calm > 80
  },
  {
    name: 'Untamed Spirit',
    rarity: 'Rare' as const,
    description: 'Wild curiosity and boundless energy dance in your eyes. You\'re a force of nature that cannot be contained, always seeking the next horizon with fearless enthusiasm.',
    condition: (data: ProcessedApiData) => data.age.low < 25 && (data.emotions.surprised > 80 || data.emotions.happy > 80)
  },
  {
    name: 'Poised Leader',
    rarity: 'Rare' as const,
    description: 'Grace and strength emanate from you in perfect balance. Your quiet confidence commands respect without demanding it, leading with wisdom rather than authority.',
    condition: (data: ProcessedApiData) => data.age.high > 28 && data.emotions.calm > 80 && data.gender.value === 'FEMALE'
  },
  {
    name: 'The Visionary',
    rarity: 'Rare' as const,
    description: 'You see possibilities that others miss, painting the future with strokes of innovation. Your mind operates on a different frequency, where ideas become reality.',
    condition: (data: ProcessedApiData) => data.age.high > 28 && data.emotions.calm > 80 && data.gender.value === 'MALE'
  },
  {
    name: 'Cosmic Wanderer',
    rarity: 'Epic' as const,
    description: 'You transcend conventional definitions, existing in a realm all your own. Like a star that refuses to be categorized, you illuminate the mysteries of being unbound.',
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

    // 组合生成最终标签
    const selectedImage = ageBracket.images[Math.floor(Math.random() * ageBracket.images.length)];
    let finalTag = vibeModifier + selectedImage;

    // 如果有额外修饰词，添加到前面
    if (additionalModifier) {
      finalTag = additionalModifier + finalTag;
    }

    // 生成魅力解读
    const description = generateDescription(vibeModifier, ageBracket.name, selectedImage);

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
      tag: 'Unique You',
      rarity: 'Classic',
      description: 'Every version of you is a limited edition in the universe, no definition needed, naturally radiant.',
      cardType: 'classic'
    };
  }
}

// 生成魅力解读 - 支持丰富的修饰词
function generateDescription(modifier: string, agePeriodName: string, imageName: string): string {
  const descriptions: { [key: string]: string } = {
    // 活力系列
    'Radiant': `You are full of vitality, like the sunshine of the ${agePeriodName}, always bringing energy and inspiration to those around you.`,
    'Joyful': `Your spirit radiates pure joy, like the vibrant energy of the ${agePeriodName}, naturally uplifting everyone in your presence.`,
    'Luminous': `You glow from within, like the dawn light of the ${agePeriodName}, illuminating paths others might not see.`,
    'Vibrant': `Your energy is infectious and dynamic, like the pulsing life force of the ${agePeriodName}, impossible to ignore.`,
    'Playful': `You possess a delightful playfulness, like the spirited energy of the ${agePeriodName}, finding magic in everyday moments.`,

    // 宁静系列
    'Serene': `You possess inner peace, like the moonlight of the ${agePeriodName}, gently but firmly illuminating your own path.`,
    'Tranquil': `Your calm presence is like still waters of the ${agePeriodName}, reflecting clarity and wisdom in all you do.`,
    'Poised': `You carry yourself with elegant composure, like the balanced harmony of the ${agePeriodName}, steady and graceful under pressure.`,
    'Mindful': `Your awareness and presence shine through, like the deep consciousness of the ${agePeriodName}, fully engaged in each moment.`,
    'Grounded': `You have a beautiful connection to what matters, like the deep roots of the ${agePeriodName}, providing stability and strength.`,

    // 灵感系列
    'Curious': `Your mind dances with wonder, like the exploring spirit of the ${agePeriodName}, always seeking new discoveries.`,
    'Inspired': `Your creativity flows freely, like the artistic energy of the ${agePeriodName}, transforming ideas into beautiful realities.`,
    'Whimsical': `You have a magical way of seeing the world, like the enchanting spirit of the ${agePeriodName}, finding delight in unexpected places.`,
    'Eclectic': `Your unique blend of interests creates something special, like the diverse beauty of the ${agePeriodName}, combining elements in fascinating ways.`,

    // 深度系列
    'Soulful': `You have profound emotional depth, like the rich mysteries of the ${agePeriodName}, holding stories that touch the heart.`,
    'Poetic': `Your soul expresses itself beautifully, like the lyrical essence of the ${agePeriodName}, finding poetry in life's moments.`,
    'Introspective': `You possess deep self-awareness, like the reflective nature of the ${agePeriodName}, understanding yourself and others with compassion.`,
    'Resonant': `Your presence creates meaningful connections, like the harmonious vibrations of the ${agePeriodName}, touching others in profound ways.`,

    // 智慧系列
    'Scholarly': `Your intellectual curiosity shines through, like the accumulated wisdom of the ${agePeriodName}, always learning and growing.`,
    'Focused': `Your concentration and dedication are remarkable, like the precise clarity of the ${agePeriodName}, achieving excellence through focused effort.`,
    'Analytical': `Your mind processes information with elegant precision, like the systematic beauty of the ${agePeriodName}, finding patterns and insights others miss.`,
    'Cerebral': `Your intellectual depth is impressive, like the complex understanding of the ${agePeriodName}, thinking on multiple levels simultaneously.`,

    // 真实系列
    'Authentic': `You are genuinely yourself, like the natural essence of the ${agePeriodName}, beautiful in your originality and truth.`,
    'Unique': `You are a unique individual, possessing the special charm of the ${agePeriodName}, no need to imitate, creating your own style.`,
    'Genuine': `Your authenticity shines through, like the pure energy of the ${agePeriodName}, refreshingly real and wonderfully you.`
  };

  return descriptions[modifier] || `You possess the unique charm of the ${agePeriodName}, unforgettable like the ${imageName}.`;
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
      tag: 'Unique You',
      rarity: 'Classic',
      description: 'Every version of you is a limited edition in the universe, no definition needed, naturally radiant.',
      cardType: 'classic'
    };
  }
}