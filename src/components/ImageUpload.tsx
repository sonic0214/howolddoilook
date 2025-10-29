import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { AppState, AnalysisResult, ApiResponse } from '../types';
import { generateVibeTagLegacy } from '../utils/vibeGenerator';
import { runVibeGeneratorTests } from '../utils/testVibeGenerator';
import axios from 'axios';

interface ImageUploadProps {
  setAppState: (state: AppState) => void;
  setResult: (result: AnalysisResult | null) => void;
  setError: (error: string) => void;
  setUploadedImage: (image: string) => void;
}

export default function ImageUpload({
  setAppState,
  setResult,
  setError,
  setUploadedImage,
}: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // 开发环境下的测试函数
  const handleTestVibeGenerator = () => {
    if (import.meta.env.DEV) {
      runVibeGeneratorTests();
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      handleFileSelect(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleFileSelect = (file: File) => {
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      setError('Please upload a JPG or PNG image');
      setStatusMessage('Error: Please upload a JPG or PNG image');
      setAppState(AppState.ERROR);
      return;
    }

    setSelectedFile(file);
    setStatusMessage(`Photo "${file.name}" selected and ready for analysis`);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      setAppState(AppState.ERROR);
      return;
    }

    setAppState(AppState.ANALYZING);

    try {
      // Compress image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(selectedFile, options);

      // Check if we're in development mode and API is not available
      const isDev = import.meta.env.DEV;
      let response: { data: ApiResponse };

      try {
        // Upload to API
        const formData = new FormData();
        formData.append('image', compressedFile);

        response = await axios.post<ApiResponse>('/api/analyze', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000,
        });
      } catch (apiError: any) {
        // If API is not available in dev mode, use mock data
        if (isDev && (apiError.code === 'ERR_NETWORK' || apiError.response?.status === 404)) {
          console.warn('⚠️ API not available, using mock data for development');

          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Generate intelligent mock response using the new vibe generator
          const mockAge = Math.floor(Math.random() * 20) + 25; // Random age 25-44
          const mockGender = Math.random() > 0.5 ? 'Male' : 'Female';

          // Create mock face analysis data
          const mockFaceData: any = {
            age: mockAge,
            gender: mockGender,
            smile: Math.random() * 0.5 + 0.3, // 0.3-0.8 range
            glasses: Math.random() > 0.7 ? 'ReadingGlasses' : 'None',
            emotion: {
              happiness: Math.random() * 0.8,
              neutral: Math.random() * 0.6,
              sadness: Math.random() * 0.2,
              anger: Math.random() * 0.1,
              contempt: Math.random() * 0.1,
              disgust: Math.random() * 0.1,
              fear: Math.random() * 0.1,
              surprise: Math.random() * 0.4
            }
          };

          // Generate intelligent vibe tag using the new engine
          const vibeResult = generateVibeTagLegacy(mockFaceData);
          const mockVibeTag = vibeResult.tag;

          response = {
            data: {
              success: true,
              data: {
                age: mockAge,
                gender: mockGender.toLowerCase(),
                vibeTag: mockVibeTag,
                cardType: vibeResult.cardType,
                rarity: vibeResult.rarity,
                description: vibeResult.description,
                attributes: {
                  smile: mockFaceData.smile,
                  glasses: mockFaceData.glasses,
                  emotion: mockFaceData.emotion,
                },
              },
            },
          };

          console.log('📊 Mock analysis result:', response.data);
          console.log('🎯 Vibe generation result:', vibeResult.tag);
          console.log('⭐ Rarity:', vibeResult.rarity);
          console.log('📝 Card Type:', vibeResult.cardType);
          console.log('📄 Description:', vibeResult.description);
        } else {
          throw apiError;
        }
      }

      if (response.data.success && response.data.data) {
        setResult(response.data.data);
        setUploadedImage(preview);
        setAppState(AppState.RESULT);
      } else {
        setError(response.data.error || 'Analysis failed');
        setAppState(AppState.ERROR);
      }
    } catch (error: any) {
      console.error('Analysis error:', error);

      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else {
        setError('Failed to analyze image. Please try again.');
      }

      setAppState(AppState.ERROR);
    }
  };

  return (
    <div>
      {/* Screen reader live region for status updates */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </div>

      <div
        {...getRootProps()}
        role="button"
        tabIndex={0}
        aria-label="Upload photo for age analysis"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Trigger file dialog programmatically if needed
          }
        }}
        className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-center p-4 cursor-pointer transition-colors focus-visible ${
          isDragActive
            ? 'border-terracotta bg-orange-50'
            : preview
            ? 'border-terracotta'
            : 'border-gray-300 hover:border-terracotta'
        }`}
      >
        <input
          {...getInputProps()}
          aria-label="Upload photo for age analysis"
          title="Upload a photo for AI age analysis"
        />
        {preview ? (
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-gray-600">Click or drag to change image</p>
          </div>
        ) : (
          <>
            <i className="fa-solid fa-cloud-arrow-up text-5xl text-gray-400"></i>
            <p className="mt-4 text-gray-500 font-semibold">
              {isDragActive ? 'Drop your photo here' : 'Click or drag to upload a photo'}
            </p>
            <p className="text-sm text-gray-400">
              For the best results, use a clear frontal portrait.
            </p>
          </>
        )}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!selectedFile}
        aria-describedby={!selectedFile ? "upload-help" : undefined}
        className={`mt-6 w-full py-4 text-xl font-bold shadow-lg rounded-md transition-colors ${
          selectedFile
            ? 'bg-terracotta text-white hover:bg-amber-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Analyze My Photo
      </button>

      {/* 开发环境测试按钮 */}
      {import.meta.env.DEV && (
        <button
          onClick={handleTestVibeGenerator}
          className="mt-3 w-full py-2 text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors"
        >
          🧪 Test Vibe Generator (Dev Only)
        </button>
      )}

      {!selectedFile && (
        <p id="upload-help" className="sr-only">
          Please upload a photo first before enabling the analysis button
        </p>
      )}
    </div>
  );
}
