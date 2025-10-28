// Test script to debug AWS Rekognition API
const { RekognitionClient, DetectFacesCommand } = require('@aws-sdk/client-rekognition');
const axios = require('axios');
require('dotenv').config();

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

console.log('=== AWS Rekognition Configuration ===');
console.log('Region:', region);
console.log('Access Key ID:', accessKeyId?.substring(0, 10) + '...');
console.log('Secret Key length:', secretAccessKey?.length);
console.log('====================================\n');

// Test with a sample image URL
async function testRekognitionAPI() {
  try {
    // Check environment variables first
    if (!region || !accessKeyId || !secretAccessKey) {
      console.error('❌ ERROR: Environment variables missing!');
      console.error('Please make sure .env file exists with:');
      console.error('  AWS_REGION=us-east-1');
      console.error('  AWS_ACCESS_KEY_ID=your_access_key_id');
      console.error('  AWS_SECRET_ACCESS_KEY=your_secret_access_key');
      process.exit(1);
    }

    // Initialize Rekognition client
    const rekognitionClient = new RekognitionClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // Test with image URL (easier than file)
    const testImageUrl = 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400';

    console.log('Test: Using image from URL');
    console.log('Image URL:', testImageUrl);
    console.log('\nDownloading image...');

    // Download image
    const imageResponse = await axios.get(testImageUrl, {
      responseType: 'arraybuffer'
    });
    const imageBuffer = Buffer.from(imageResponse.data);

    console.log('Image downloaded:', imageBuffer.length, 'bytes');
    console.log('\nCalling AWS Rekognition DetectFaces API...');

    // Call DetectFaces
    const command = new DetectFacesCommand({
      Image: {
        Bytes: imageBuffer,
      },
      Attributes: ['ALL'], // Request all face attributes
    });

    const response = await rekognitionClient.send(command);

    console.log('\n✅ SUCCESS! AWS Rekognition is working!');
    console.log('Response:', JSON.stringify(response, null, 2));

    if (response.FaceDetails && response.FaceDetails.length > 0) {
      const face = response.FaceDetails[0];
      console.log('\n--- Face Detection Results ---');
      console.log('Age Range:', face.AgeRange);
      console.log('Estimated Age:', Math.round((face.AgeRange.Low + face.AgeRange.High) / 2));
      console.log('Gender:', face.Gender);
      console.log('Smile:', face.Smile);
      console.log('Emotions:', face.Emotions);
      console.log('Confidence:', face.Confidence);
    }

  } catch (error) {
    console.error('\n❌ ERROR! AWS Rekognition call failed');
    console.error('Error type:', error.constructor.name);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);

    if (error.$metadata) {
      console.error('\nAWS Error Metadata:', error.$metadata);
    }

    // Common error explanations
    if (error.name === 'UnrecognizedClientException') {
      console.error('\n💡 Tip: AWS credentials are invalid');
      console.error('   - Check if AWS_ACCESS_KEY_ID is correct in .env');
      console.error('   - Check if AWS_SECRET_ACCESS_KEY is correct in .env');
      console.error('   - Make sure there are no extra spaces or quotes');
    } else if (error.name === 'AccessDeniedException') {
      console.error('\n💡 Tip: Access denied - IAM permissions issue');
      console.error('   - Your IAM user needs AmazonRekognitionFullAccess permission');
      console.error('   - Go to AWS IAM Console → Users → Add permissions');
    } else if (error.name === 'InvalidParameterException') {
      console.error('\n💡 Tip: Invalid parameter in request');
      console.error('   - Image might be corrupted or in wrong format');
    } else if (error.name === 'ProvisionedThroughputExceededException') {
      console.error('\n💡 Tip: Rate limit exceeded');
      console.error('   - Wait a few minutes and try again');
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('\n💡 Tip: Network connection issue');
      console.error('   - Check your internet connection');
      console.error('   - Verify AWS_REGION is correct (e.g., us-east-1)');
    }

    console.error('\nFull error stack:', error.stack);
  }
}

testRekognitionAPI();
