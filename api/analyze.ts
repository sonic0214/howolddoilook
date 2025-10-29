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

    // 7. Generate Vibe Tag
    const vibeTag = generateVibeTag(faceData);
    console.log('Generated Vibe Tag:', vibeTag);

    // 8. Return success response
    const result = {
      success: true,
      data: {
        age: faceData.age,
        gender: faceData.gender,
        vibeTag,
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

/**
 * Generate an age-related appearance description based on age and emotional attributes
 */
function generateVibeTag(attributes: FaceAttributes): string {
  const age = attributes.age;
  const smile = attributes.smile || 0;
  const happiness = attributes.emotions?.happiness || 0;

  // Define appearance descriptions organized by age group and mood
  const appearanceTypes = {
    young_happy: [
      'Youthful Glow',
      'Fresh-faced',
      'Young Spirit',
      'Bright-eyed',
      'Radiant Youth',
      'Fresh Appeal',
    ],
    young_calm: [
      'Natural Beauty',
      'Understated Charm',
      'Serene Youth',
      'Quiet Elegance',
      'Natural Grace',
      'Subtle Charm',
    ],
    young_neutral: [
      'Modern Look',
      'Fresh Style',
      'Contemporary Vibe',
      'Clean Appearance',
      'Modern Appeal',
      'Youthful Style',
    ],
    mid_happy: [
      'Ageless Beauty',
      'Timeless Appeal',
      'Graceful Charm',
      'Elegant Glow',
      'Confident Presence',
      'Polished Look',
    ],
    mid_calm: [
      'Refined Beauty',
      'Classic Style',
      'Sophisticated Charm',
      'Polished Presence',
      'Understated Elegance',
      'Graceful Appeal',
    ],
    mid_neutral: [
      'Professional Look',
      'Established Style',
      'Mature Appearance',
      'Distinguished Presence',
      'Refined Style',
      'Classic Look',
    ],
    mature_happy: [
      'Wise Beauty',
      'Eternal Youth',
      'Timeless Charm',
      'Graceful Wisdom',
      'Golden Years',
      'Ageless Spirit',
    ],
    mature_calm: [
      'Noble Presence',
      'Serene Wisdom',
      'Graceful Authority',
      'Peaceful Beauty',
      'Elegant Age',
      'Distinguished Charm',
    ],
    mature_neutral: [
      'Respected Presence',
      'Classic Beauty',
      'Elegant Style',
      'Timeless Appeal',
      'Mature Charm',
      'Graceful Look',
    ],
  };

  // Determine age group
  let ageGroup: 'young' | 'mid' | 'mature';
  if (age < 30) {
    ageGroup = 'young';
  } else if (age < 50) {
    ageGroup = 'mid';
  } else {
    ageGroup = 'mature';
  }

  // Determine mood group based on smile and happiness
  let moodGroup: 'happy' | 'calm' | 'neutral';
  if (smile > 0.7 || happiness > 0.6) {
    moodGroup = 'happy';
  } else if (smile > 0.3 || happiness > 0.3) {
    moodGroup = 'calm';
  } else {
    moodGroup = 'neutral';
  }

  // Get the appropriate appearance type array
  const key = `${ageGroup}_${moodGroup}` as keyof typeof appearanceTypes;
  const options = appearanceTypes[key];

  // Return a random appearance type from the array
  return options[Math.floor(Math.random() * options.length)];
}
