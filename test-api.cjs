// Test script to debug Azure Face API
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const endpoint = process.env.AZURE_FACE_ENDPOINT;
const apiKey = process.env.AZURE_FACE_API_KEY;

console.log('=== Azure API Configuration ===');
console.log('Endpoint:', endpoint);
console.log('API Key length:', apiKey?.length);
console.log('API Key (first 10 chars):', apiKey?.substring(0, 10) + '...');
console.log('================================\n');

// Test with a sample image URL (you can also use a local file)
async function testAzureAPI() {
  try {
    const url = `${endpoint}/face/v1.0/detect`;

    console.log('Testing Azure API at:', url);
    console.log('Request parameters:', {
      returnFaceAttributes: 'age,gender,smile,glasses,emotion'
    });

    // Test with image URL first (easier than file)
    const testImageUrl = 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400';

    console.log('\nTest 1: Using image URL');
    console.log('Image URL:', testImageUrl);

    const response = await axios.post(
      url,
      { url: testImageUrl },
      {
        params: {
          returnFaceAttributes: 'age,gender,smile,glasses,emotion'
        },
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': apiKey
        },
        timeout: 15000
      }
    );

    console.log('\n✅ SUCCESS! Azure API is working!');
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));

    if (response.data && response.data.length > 0) {
      const face = response.data[0];
      console.log('\n--- Face Detection Results ---');
      console.log('Age:', face.faceAttributes.age);
      console.log('Gender:', face.faceAttributes.gender);
      console.log('Smile:', face.faceAttributes.smile);
      console.log('Emotion:', face.faceAttributes.emotion);
    }

  } catch (error) {
    console.error('\n❌ ERROR! Azure API call failed');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);

    if (error.response) {
      console.error('\nAzure API Error Response:');
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
      console.error('Headers:', error.response.headers);

      // Common error explanations
      if (error.response.status === 401) {
        console.error('\n💡 Tip: 401 Unauthorized - Your API key is invalid');
        console.error('   - Check if AZURE_FACE_API_KEY is correct in .env');
        console.error('   - Try using Key 2 instead of Key 1 from Azure Portal');
      } else if (error.response.status === 403) {
        console.error('\n💡 Tip: 403 Forbidden - API key might be for wrong resource');
        console.error('   - Verify endpoint matches the resource where key is from');
      } else if (error.response.status === 404) {
        console.error('\n💡 Tip: 404 Not Found - Endpoint URL is incorrect');
        console.error('   - Check AZURE_FACE_ENDPOINT in .env');
        console.error('   - Should end with / like: https://xxx.cognitiveservices.azure.com/');
      }
    } else if (error.request) {
      console.error('\n💡 Tip: No response from server');
      console.error('   - Check your internet connection');
      console.error('   - Verify endpoint URL is correct');
    } else {
      console.error('\n💡 Tip:', error.message);
    }
  }
}

// Check environment variables first
if (!endpoint || !apiKey) {
  console.error('❌ ERROR: Environment variables missing!');
  console.error('Please make sure .env file exists with:');
  console.error('  AZURE_FACE_ENDPOINT=https://your-resource.cognitiveservices.azure.com/');
  console.error('  AZURE_FACE_API_KEY=your_api_key_here');
  process.exit(1);
}

testAzureAPI();
