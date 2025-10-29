// 测试AI状态标签生成引擎的功能
import { generateVibeTag, generateVibeTagLegacy, AmazonRekognitionData } from './vibeGenerator';

// 测试用例 - 模拟Amazon Rekognition API数据格式，测试新标签库
const testCases: { name: string; data: AmazonRekognitionData; expectedRarity?: string }[] = [
  {
    name: 'Super infectious smile - should trigger Main Character Energy',
    data: {
      AgeRange: { Low: 26, High: 30 },
      Emotions: [
        { Type: 'HAPPY', Confidence: 99.5 }
      ],
      Smile: { Value: true, Confidence: 100 },
      Eyeglasses: { Value: false, Confidence: 5 },
      Gender: { Value: 'FEMALE', Confidence: 99 }
    },
    expectedRarity: 'Epic'
  },
  {
    name: 'Young happy user - should trigger Effortless Glow',
    data: {
      AgeRange: { Low: 21, High: 24 },
      Emotions: [
        { Type: 'HAPPY', Confidence: 98 }
      ],
      Smile: { Value: true, Confidence: 99 },
      Eyeglasses: { Value: false, Confidence: 5 },
      Gender: { Value: 'FEMALE', Confidence: 99 }
    },
    expectedRarity: 'Rare'
  },
  {
    name: 'Mature wise woman - should trigger Poised Leader',
    data: {
      AgeRange: { Low: 30, High: 35 },
      Emotions: [
        { Type: 'CALM', Confidence: 95 }
      ],
      Smile: { Value: false, Confidence: 10 },
      Eyeglasses: { Value: false, Confidence: 5 },
      Gender: { Value: 'FEMALE', Confidence: 99 }
    },
    expectedRarity: 'Rare'
  },
  {
    name: 'Mature wise man - should trigger The Visionary',
    data: {
      AgeRange: { Low: 30, High: 35 },
      Emotions: [
        { Type: 'CALM', Confidence: 95 }
      ],
      Smile: { Value: false, Confidence: 10 },
      Eyeglasses: { Value: false, Confidence: 5 },
      Gender: { Value: 'MALE', Confidence: 99 }
    },
    expectedRarity: 'Rare'
  },
  {
    name: 'Glasses + calm - should trigger The Analyst',
    data: {
      AgeRange: { Low: 28, High: 32 },
      Emotions: [
        { Type: 'CALM', Confidence: 95 }
      ],
      Smile: { Value: false, Confidence: 10 },
      Eyeglasses: { Value: true, Confidence: 99 },
      Gender: { Value: 'MALE', Confidence: 99 }
    },
    expectedRarity: 'Rare'
  },
  {
    name: 'Young energetic - should trigger Untamed Spirit',
    data: {
      AgeRange: { Low: 19, High: 21 },
      Emotions: [
        { Type: 'SURPRISED', Confidence: 85 }
      ],
      Smile: { Value: true, Confidence: 70 },
      Eyeglasses: { Value: false, Confidence: 5 },
      Gender: { Value: 'FEMALE', Confidence: 99 }
    },
    expectedRarity: 'Rare'
  },
  {
    name: 'Sad introspective - should trigger Midnight Dreamer',
    data: {
      AgeRange: { Low: 25, High: 27 },
      Emotions: [
        { Type: 'SAD', Confidence: 75 }
      ],
      Smile: { Value: false, Confidence: 10 },
      Eyeglasses: { Value: false, Confidence: 5 },
      Gender: { Value: 'MALE', Confidence: 99 }
    },
    expectedRarity: 'Rare'
  },
  {
    name: 'Wide age range - should trigger Cosmic Wanderer',
    data: {
      AgeRange: { Low: 20, High: 35 }, // 15 year difference
      Emotions: [
        { Type: 'CALM', Confidence: 80 }
      ],
      Smile: { Value: false, Confidence: 20 },
      Eyeglasses: { Value: false, Confidence: 5 },
      Gender: { Value: 'FEMALE', Confidence: 99 }
    },
    expectedRarity: 'Epic'
  },
  {
    name: 'Young person - combination tag test',
    data: {
      AgeRange: { Low: 19, High: 21 },
      Emotions: [
        { Type: 'HAPPY', Confidence: 75 },
        { Type: 'CALM', Confidence: 25 }
      ],
      Smile: { Value: true, Confidence: 70 },
      Eyeglasses: { Value: false, Confidence: 5 },
      Gender: { Value: 'MALE', Confidence: 99 }
    }
  },
  {
    name: 'Middle-aged person with glasses - scholarly tag test',
    data: {
      AgeRange: { Low: 43, High: 47 },
      Emotions: [
        { Type: 'CALM', Confidence: 80 },
        { Type: 'HAPPY', Confidence: 20 }
      ],
      Smile: { Value: false, Confidence: 15 },
      Eyeglasses: { Value: true, Confidence: 99 },
      Gender: { Value: 'FEMALE', Confidence: 99 }
    }
  }
];

export function runVibeGeneratorTests() {
  console.log('🧪 Starting AI Status Tag Generator Engine tests...\n');

  testCases.forEach((testCase, index) => {
    console.log(`📋 Test Case ${index + 1}: ${testCase.name}`);
    console.log(`📊 Input data:`, testCase.data);

    // 测试新的实现
    const result = generateVibeTag(testCase.data);

    console.log(`🎯 Generated tag: "${result.tag}"`);
    console.log(`⭐ Rarity: ${result.rarity}`);
    console.log(`📝 Charm description: "${result.description}"`);

    if (testCase.expectedRarity && result.rarity !== testCase.expectedRarity) {
      console.log(`⚠️  Expected rarity: ${testCase.expectedRarity}, Actual: ${result.rarity}`);
    }

    console.log('─'.repeat(80));
  });

  console.log('✅ New engine tests completed!\n');

  // 测试legacy兼容性
  console.log('🔄 Testing Legacy compatibility...\n');

  const legacyTestData = {
    age: 25,
    gender: 'Female',
    smile: 0.8,
    emotion: {
      happiness: 0.9,
      neutral: 0.1,
      sadness: 0,
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      surprise: 0
    }
  };

  const legacyResult = generateVibeTagLegacy(legacyTestData);
  console.log(`🔄 Legacy test result: "${legacyResult.tag}" (${legacyResult.rarity})`);
  console.log(`📝 Legacy description: "${legacyResult.description}"`);

  console.log('\n✅ All tests completed!');
}

// 如果直接运行此文件，执行测试
if (typeof window === 'undefined') {
  runVibeGeneratorTests();
}