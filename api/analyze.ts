import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';
import { RekognitionClient, DetectFacesCommand } from '@aws-sdk/client-rekognition';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FaceAttributes {
  age: number;
  gender: string;
  smile: number;
  emotions?: {
    happiness: number;
    calm: number;
    sad: number;
    angry: number;
    confused: number;
    disgusted: number;
    surprised: number;
    fear: number;
  };
}

// VibeGenerator interfaces and logic
interface VibeGenerationResult {
  tag: string;
  rarity: 'Classic' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
  cardType: 'classic' | 'story' | 'epic';
}

interface AmazonRekognitionData {
  AgeRange: { Low: number; High: number };
  Emotions: Array<{ Type: string; Confidence: number }>;
  Smile: { Value: boolean; Confidence: number };
  Eyeglasses: { Value: boolean; Confidence: number };
  Gender: { Value: string; Confidence: number };
}

// Simplified VibeGenerator for API use
function generateVibeTagForAPI(faceData: FaceAttributes): VibeGenerationResult {
  // Age brackets
  const ageBrackets = [
    {
      name: 'Exploration',
      range: [0, 22] as [number, number],
      images: ['Dawn Chaser', 'Starlight Dreamer', 'New Horizon', 'Spark Seeker', 'Wild Comet', 'Morning Spirit', 'Nova Pioneer', 'Cosmic Wanderer']
    },
    {
      name: 'Growth',
      range: [23, 29] as [number, number],
      images: ['Sunbeam Creator', 'Urban Maverick', 'Bloom Architect', 'Trailblazer', 'Flame Keeper', 'Rising Tide', 'Emerald Phoenix', 'Quantum Jumper']
    },
    {
      name: 'Depth',
      range: [30, 38] as [number, number],
      images: ['Moonlit Storyteller', 'Harvest Curator', 'Deepwood Guardian', 'Artisan Soul', 'Autumn Sage', 'River Oracle', 'Crystal Weaver', 'Dream Shaper']
    },
    {
      name: 'Prime',
      range: [39, 50] as [number, number],
      images: ['Starlight Sage', 'Oceanic Philosopher', 'Legacy Architect', 'The Collector', 'Cosmic Elder', 'Time Guardian', 'Wisdom Keeper', 'Soul Navigator']
    },
    {
      name: 'Mastery',
      range: [51, 65] as [number, number],
      images: ['Eternal Mentor', 'Chronicle Keeper', 'Ancient Scholar', 'Zen Master', 'Crystal Sage', 'Void Walker', 'Light Bearer', 'Star Weaver']
    },
    {
      name: 'Transcendence',
      range: [66, 100] as [number, number],
      images: ['Cosmic Guardian', 'Time Traveler', 'Dimension Jumper', 'Infinity Sage', 'Celestial Being', 'Quantum Master', 'Universal Consciousness', 'Enlightened One']
    }
  ];

  // Determine age bracket
  const ageBracket = ageBrackets.find(bracket =>
    faceData.age >= bracket.range[0] && faceData.age <= bracket.range[1]
  ) || ageBrackets[3];

  // Determine modifier based on emotions and features
  let vibeModifier: string;

  const hasGlasses = faceData.smile < 0.3 && Math.random() < 0.3; // Simulate glasses detection
  const happiness = faceData.emotions?.happiness || 0;
  const calm = faceData.emotions?.calm || 0;
  const sad = faceData.emotions?.sad || 0;
  const angry = faceData.emotions?.angry || 0;
  const confused = faceData.emotions?.confused || 0;

  if (hasGlasses) {
    const scholarlyModifiers = ['Scholarly', 'Focused', 'Analytical', 'Cerebral', 'Intellectual', 'Methodical', 'Contemplative', 'Philosophical'];
    vibeModifier = scholarlyModifiers[Math.floor(Math.random() * scholarlyModifiers.length)];
  } else if (happiness > 0.6 || faceData.smile > 0.7) {
    const happyModifiers = ['Radiant', 'Joyful', 'Luminous', 'Vibrant', 'Playful', 'Bubbly', 'Exuberant', 'Effervescent', 'Sunny', 'Cheerful'];
    vibeModifier = happyModifiers[Math.floor(Math.random() * happyModifiers.length)];
  } else if (calm > 0.6) {
    const calmModifiers = ['Serene', 'Tranquil', 'Poised', 'Mindful', 'Grounded', 'Peaceful', 'Balanced', 'Centered', 'Zen', 'Harmonious'];
    vibeModifier = calmModifiers[Math.floor(Math.random() * calmModifiers.length)];
  } else if (sad > 0.3) {
    const sadModifiers = ['Soulful', 'Poetic', 'Introspective', 'Resonant', 'Melancholic', 'Reflective', 'Deep', 'Mystical', 'Pensive', 'Dreamy'];
    vibeModifier = sadModifiers[Math.floor(Math.random() * sadModifiers.length)];
  } else if (angry > 0.3) {
    const angryModifiers = ['Passionate', 'Fiery', 'Bold', 'Determined', 'Courageous', 'Intense', 'Powerful', 'Dynamic', 'Strong-willed', 'Fierce'];
    vibeModifier = angryModifiers[Math.floor(Math.random() * angryModifiers.length)];
  } else if (confused > 0.3) {
    const confusedModifiers = ['Inquisitive', 'Explorative', 'Thoughtful', 'Searching', 'Curious', 'Investigative', 'Questing', 'Seeking', 'Wondering', 'Pondering'];
    vibeModifier = confusedModifiers[Math.floor(Math.random() * confusedModifiers.length)];
  } else {
    const defaultModifiers = ['Authentic', 'Unique', 'Genuine', 'Natural', 'Original', 'Pure', 'True', 'Real', 'Honest', 'Unfiltered'];
    vibeModifier = defaultModifiers[Math.floor(Math.random() * defaultModifiers.length)];
  }

  // Add gender-based modifiers (20% chance)
  let additionalModifier = '';
  if (Math.random() < 0.2 && faceData.gender !== 'unknown') {
    if (faceData.gender === 'female') {
      const feminineModifiers = ['Ethereal', 'Graceful', 'Elegant', 'Divine', 'Angelic', 'Celestial'];
      additionalModifier = feminineModifiers[Math.floor(Math.random() * feminineModifiers.length)];
    } else if (faceData.gender === 'male') {
      const masculineModifiers = ['Majestic', 'Noble', 'Heroic', 'Regal', 'Stalwart', 'Valiant'];
      additionalModifier = masculineModifiers[Math.floor(Math.random() * masculineModifiers.length)];
    }
  }

  // Generate final tag
  const selectedImage = ageBracket.images[Math.floor(Math.random() * ageBracket.images.length)];
  let finalTag = vibeModifier + selectedImage;

  if (additionalModifier) {
    finalTag = additionalModifier + finalTag;
  }

  // Generate description
  const description = generateDescriptionForAPI(vibeModifier, ageBracket.name, selectedImage);

  // Determine rarity (using the same probabilities as frontend)
  const random = Math.random() * 100;
  let rarity: 'Classic' | 'Rare' | 'Epic' | 'Legendary';
  let cardType: 'classic' | 'story' | 'epic';

  if (random < 3) {
    rarity = 'Legendary';
    cardType = 'epic';
  } else if (random < 20) {
    rarity = 'Epic';
    cardType = 'epic';
  } else if (random < 50) {
    rarity = 'Rare';
    cardType = 'story';
  } else {
    rarity = 'Classic';
    cardType = 'classic';
  }

  return {
    tag: finalTag,
    rarity,
    description,
    cardType
  };
}

function generateDescriptionForAPI(modifier: string, agePeriodName: string, imageName: string): string {
  const descriptions: { [key: string]: string } = {
    // Happy series
    'Radiant': `You are full of vitality, like the sunshine of the ${agePeriodName}, always bringing energy and inspiration to those around you.`,
    'Joyful': `Your spirit radiates pure joy, like the vibrant energy of the ${agePeriodName}, naturally uplifting everyone in your presence.`,
    'Luminous': `You glow from within, like the dawn light of the ${agePeriodName}, illuminating paths others might not see.`,
    'Vibrant': `Your energy is infectious and dynamic, like the pulsing life force of the ${agePeriodName}, impossible to ignore.`,
    'Playful': `You possess a delightful playfulness, like the spirited energy of the ${agePeriodName}, finding magic in everyday moments.`,

    // Calm series
    'Serene': `You possess inner peace, like the moonlight of the ${agePeriodName}, gently but firmly illuminating your own path.`,
    'Tranquil': `Your calm presence is like still waters of the ${agePeriodName}, reflecting clarity and wisdom in all you do.`,
    'Poised': `You carry yourself with elegant composure, like the balanced harmony of the ${agePeriodName}, steady and graceful under pressure.`,
    'Mindful': `Your awareness and presence shine through, like the deep consciousness of the ${agePeriodName}, fully engaged in each moment.`,
    'Grounded': `You have a beautiful connection to what matters, like the deep roots of the ${agePeriodName}, providing stability and strength.`,

    // Scholarly series
    'Scholarly': `Your intellectual curiosity shines through, like the accumulated wisdom of the ${agePeriodName}, always learning and growing.`,
    'Focused': `Your concentration and dedication are remarkable, like the precise clarity of the ${agePeriodName}, achieving excellence through focused effort.`,
    'Analytical': `Your mind processes information with elegant precision, like the systematic beauty of the ${agePeriodName}, finding patterns and insights others miss.`,
    'Cerebral': `Your intellectual depth is impressive, like the complex understanding of the ${agePeriodName}, thinking on multiple levels simultaneously.`,

    // Soulful series
    'Soulful': `You have profound emotional depth, like the rich mysteries of the ${agePeriodName}, holding stories that touch the heart.`,
    'Poetic': `Your soul expresses itself beautifully, like the lyrical essence of the ${agePeriodName}, finding poetry in life's moments.`,
    'Introspective': `You possess deep self-awareness, like the reflective nature of the ${agePeriodName}, understanding yourself and others with compassion.`,
    'Resonant': `Your presence creates meaningful connections, like the harmonious vibrations of the ${agePeriodName}, touching others in profound ways.`,

    // Default
    'Authentic': `You are genuinely yourself, like the natural essence of the ${agePeriodName}, beautiful in your originality and truth.`,
    'Unique': `You are a unique individual, possessing the special charm of the ${agePeriodName}, no need to imitate, creating your own style.`,
    'Genuine': `Your authenticity shines through, like the pure energy of the ${agePeriodName}, refreshingly real and wonderfully you.`
  };

  return descriptions[modifier] || `You possess the unique charm of the ${agePeriodName}, unforgettable like the ${imageName}.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('=== New Analysis Request ===');
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  let tempFilePath: string | null = null;

  try {
    console.log('Environment check:');
    console.log('- AWS_REGION:', process.env.AWS_REGION ? 'SET' : 'MISSING');
    console.log('- AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'MISSING');
    console.log('- AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? `SET (length: ${process.env.AWS_SECRET_ACCESS_KEY.length})` : 'MISSING');

    // 1. Parse the uploaded file
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    });

    console.log('Parsing form data...');
    const [, files] = await form.parse(req);
    const imageFile = files.image?.[0];

    if (!imageFile) {
      console.error('No image file in request');
      return res.status(400).json({
        success: false,
        error: 'No image uploaded',
        message: 'Please upload an image file.',
      });
    }

    console.log('Image file received:', {
      name: imageFile.originalFilename,
      size: imageFile.size,
      type: imageFile.mimetype,
      path: imageFile.filepath,
    });

    tempFilePath = imageFile.filepath;

    // 2. Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(imageFile.mimetype || '')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid file type',
        message: 'Only JPG and PNG images are supported.',
      });
    }

    // 3. Read the image
    console.log('Reading image file...');
    const imageBuffer = fs.readFileSync(tempFilePath);
    console.log('Image buffer size:', imageBuffer.length, 'bytes');

    // 4. Initialize AWS Rekognition client
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !accessKeyId || !secretAccessKey) {
      console.error('AWS configuration missing');
      return res.status(500).json({
        success: false,
        error: 'Service configuration error',
        message: 'The service is temporarily unavailable. Please try again later.',
      });
    }

    const rekognitionClient = new RekognitionClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // 5. Call AWS Rekognition DetectFaces API
    console.log('Calling AWS Rekognition DetectFaces API...');
    const command = new DetectFacesCommand({
      Image: {
        Bytes: imageBuffer,
      },
      Attributes: ['ALL'], // Request all face attributes including age, gender, emotions, smile
    });

    const rekognitionResponse = await rekognitionClient.send(command);

    console.log('Rekognition API response:', JSON.stringify(rekognitionResponse, null, 2));

    // 6. Process Rekognition response
    const faceDetails = rekognitionResponse.FaceDetails;

    if (!faceDetails || faceDetails.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No face detected',
        message: 'Please upload a clear frontal photo where your face is clearly visible.',
      });
    }

    if (faceDetails.length > 1) {
      return res.status(400).json({
        success: false,
        error: 'Multiple faces detected',
        message: 'Please upload a photo with only one person for accurate analysis.',
      });
    }

    const face = faceDetails[0];

    // Extract age range (Rekognition returns a range like {Low: 25, High: 32})
    const ageRange = face.AgeRange;
    let estimatedAge = ageRange ? Math.round((ageRange.Low! + ageRange.High!) / 2) : 30;

    // Apply youthful bias - make people look younger
    // Reduce age by 10-20% with a minimum reduction of 2 years
    const ageReduction = Math.max(2, Math.round(estimatedAge * 0.15));
    estimatedAge = Math.max(18, estimatedAge - ageReduction); // Minimum age of 18

    // Extract gender
    const genderValue = face.Gender?.Value?.toLowerCase() || 'unknown';

    // Extract smile confidence (0-100)
    const smileConfidence = face.Smile?.Value ? (face.Smile.Confidence || 0) / 100 : 0;

    // Extract emotions
    const emotions = face.Emotions || [];
    const emotionMap: any = {};
    emotions.forEach((emotion) => {
      const type = emotion.Type?.toLowerCase();
      const confidence = (emotion.Confidence || 0) / 100;
      if (type === 'happy') emotionMap.happiness = confidence;
      else if (type === 'calm') emotionMap.calm = confidence;
      else if (type === 'sad') emotionMap.sad = confidence;
      else if (type === 'angry') emotionMap.angry = confidence;
      else if (type === 'confused') emotionMap.confused = confidence;
      else if (type === 'disgusted') emotionMap.disgusted = confidence;
      else if (type === 'surprised') emotionMap.surprised = confidence;
      else if (type === 'fear') emotionMap.fear = confidence;
    });

    const faceData: FaceAttributes = {
      age: estimatedAge,
      gender: genderValue,
      smile: smileConfidence,
      emotions: emotionMap,
    };

    // 7. Generate Vibe Tag using the API-optimized engine
    const vibeResult = generateVibeTagForAPI(faceData);
    console.log('Generated Vibe Result:', {
      tag: vibeResult.tag,
      rarity: vibeResult.rarity,
      cardType: vibeResult.cardType,
      description: vibeResult.description?.substring(0, 50) + '...'
    });

    // 8. Return success response with complete data
    const result = {
      success: true,
      data: {
        age: faceData.age,
        gender: faceData.gender,
        vibeTag: vibeResult.tag,
        cardType: vibeResult.cardType,
        rarity: vibeResult.rarity,
        description: vibeResult.description,
        attributes: {
          smile: faceData.smile,
          emotions: faceData.emotions,
        },
      },
    };

    console.log('Returning success response:', JSON.stringify(result, null, 2));
    console.log('=== Analysis Complete ===');

    return res.status(200).json(result);

  } catch (error: any) {
    // Detailed error logging
    console.error('=== Analysis Error ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);

    if (error.$metadata) {
      console.error('AWS Error Metadata:', error.$metadata);
    }

    console.error('Full error stack:', error.stack);
    console.error('======================');

    // Handle AWS Rekognition errors
    if (error.name === 'InvalidImageFormatException') {
      return res.status(400).json({
        success: false,
        error: 'Invalid image format',
        message: 'The image format is not supported. Please use JPG or PNG.',
      });
    }

    if (error.name === 'ImageTooLargeException') {
      return res.status(400).json({
        success: false,
        error: 'Image too large',
        message: 'The image is too large. Please use an image smaller than 10MB.',
      });
    }

    if (error.name === 'InvalidS3ObjectException') {
      return res.status(400).json({
        success: false,
        error: 'Invalid image',
        message: 'The image could not be processed. Please try a different photo.',
      });
    }

    if (error.name === 'ProvisionedThroughputExceededException') {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again in a few minutes.',
      });
    }

    if (error.name === 'AccessDeniedException' || error.name === 'UnrecognizedClientException') {
      return res.status(500).json({
        success: false,
        error: 'AWS authentication error',
        message: 'AWS credentials are invalid or missing.',
        debug: process.env.NODE_ENV === 'development' ? {
          region: process.env.AWS_REGION,
          hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
          hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
          errorDetail: error.message,
        } : undefined,
      });
    }

    if (error.name === 'ThrottlingException') {
      return res.status(429).json({
        success: false,
        error: 'Throttled',
        message: 'Too many requests. Please try again in a moment.',
      });
    }

    // Network or timeout errors
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return res.status(504).json({
        success: false,
        error: 'Request timeout',
        message: 'The analysis took too long. Please try with a smaller image.',
      });
    }

    // Generic error
    return res.status(500).json({
      success: false,
      error: 'Analysis failed',
      message: 'Sorry, something went wrong. Please try again.',
      debug: process.env.NODE_ENV === 'development' ? {
        errorMessage: error.message,
        errorName: error.name,
        errorCode: error.code,
      } : undefined,
    });

  } finally {
    // 9. Clean up temporary file
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }
    }
  }
}

