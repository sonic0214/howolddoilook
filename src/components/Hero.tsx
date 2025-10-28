import { useState } from 'react';
import { AppState, AnalysisResult } from '../types';
import ImageUpload from './ImageUpload';
import AnalysisResultComponent from './AnalysisResult';

export default function Hero() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string>('');

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setResult(null);
    setError('');
    setUploadedImage('');
  };

  return (
    <header id="start" className="container mx-auto px-6 py-16 md:py-24 text-center">
      <h1 className="font-serif-display text-5xl md:text-7xl font-bold leading-tight">
        How Old Do I Look?<br className="hidden md:block" />
        Go Beyond the <span className="text-terracotta">Age Guesser.</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Get an instant age estimate and discover your unique "Vibe Tag"—a positive, fun
        analysis that a basic age guesser can't offer.
      </p>

      <div id="app-widget" className="mt-12 max-w-xl mx-auto">
        {appState === AppState.IDLE && (
          <ImageUpload
            setAppState={setAppState}
            setResult={setResult}
            setError={setError}
            setUploadedImage={setUploadedImage}
          />
        )}

        {appState === AppState.ANALYZING && (
          <div className="py-24">
            <i className="fas fa-spinner fa-spin text-5xl text-terracotta"></i>
            <p className="mt-4 text-gray-600 font-semibold">Analyzing your glow...</p>
          </div>
        )}

        {appState === AppState.RESULT && result && (
          <AnalysisResultComponent
            result={result}
            uploadedImage={uploadedImage}
            onTryAgain={handleReset}
          />
        )}

        {appState === AppState.ERROR && (
          <div className="py-12 px-6 bg-red-50 border border-red-200 rounded-lg">
            <i className="fas fa-exclamation-circle text-4xl text-red-500"></i>
            <p className="mt-4 text-red-700 font-semibold">{error || 'Something went wrong'}</p>
            <button
              onClick={handleReset}
              className="mt-6 bg-brand-dark text-white px-6 py-3 font-bold hover:bg-gray-700 transition-colors rounded-md"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
