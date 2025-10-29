import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { AnalysisResult } from '../types';

interface AnalysisResultProps {
  result: AnalysisResult;
  uploadedImage: string;
  onTryAgain: () => void;
}

export default function AnalysisResultComponent({
  result,
  uploadedImage,
  onTryAgain,
}: AnalysisResultProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const generateImageBlob = async (): Promise<Blob | null> => {
    if (!resultRef.current) return null;

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-result-card]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.width = resultRef.current!.offsetWidth + 'px';
          }
        },
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      });
    } catch (error) {
      console.error('Failed to generate image:', error);
      return null;
    }
  };

  const shareToTwitter = async () => {
    const text = `I look ${result.age} years old according to AI! Find out if you look younger or older:`;
    const url = 'https://howolddoilook.art/';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    setShowShareMenu(false);
  };

  const shareToFacebook = async () => {
    const url = 'https://howolddoilook.art/';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
    setShowShareMenu(false);
  };

  const shareToLinkedIn = async () => {
    const url = 'https://howolddoilook.art/';
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
    setShowShareMenu(false);
  };

  const shareToWhatsApp = async () => {
    const text = `I look ${result.age} years old according to AI! Try it yourself: https://howolddoilook.art/`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setShowShareMenu(false);
  };

  const downloadImage = async () => {
    setIsGenerating(true);
    const blob = await generateImageBlob();

    if (!blob) {
      alert('Failed to generate image. Please try again.');
      setIsGenerating(false);
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-age-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsGenerating(false);
    setShowShareMenu(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://howolddoilook.art/');
      alert('Link copied! Share it with your friends 🎉');
    } catch (error) {
      console.error('Failed to copy link:', error);
      alert('Failed to copy link. Please copy manually: https://howolddoilook.art/');
    }
    setShowShareMenu(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Result Card - This will be captured */}
      <div className="w-full overflow-hidden rounded-xl shadow-2xl bg-white">
        <div
          ref={resultRef}
          data-result-card
          className="bg-white shadow-2xl rounded-xl flex overflow-hidden"
          style={{
            width: '800px',
            height: '450px',
            maxWidth: '100%'
          }}
        >
          {/* Left side: User photo */}
          <div className="w-1/2">
            <img
              src={uploadedImage}
              className="w-full h-full object-cover"
              alt="User selfie for age analysis"
              style={{ filter: 'brightness(1.05) contrast(1.02)' }}
            />
          </div>

          {/* Right side: Analysis results */}
          <div className="w-1/2 p-12 flex flex-col justify-between">
            <div>
              <p className="text-sm font-bold tracking-widest text-terracotta uppercase">YOUR ANALYSIS</p>
              <p className="mt-4 text-lg text-gray-500">Estimated Age</p>
              <p className="text-7xl font-bold text-brand-dark leading-none">{result.age}</p>
            </div>

            <div className="mt-8">
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm font-bold text-terracotta">✨ Your Vibe</p>
                <p className="font-serif-display text-5xl text-brand-dark mt-2">{result.vibeTag}</p>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <p className="text-lg font-bold text-brand-dark opacity-50">howolddoilook.art</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 relative">
        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute bottom-full mb-2 left-0 right-0 bg-white border-2 border-terracotta rounded-lg shadow-xl p-4 z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg" style={{ color: '#1F2937' }}>Share Your Result</h3>
              <button
                onClick={() => setShowShareMenu(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4">
              {/* Twitter */}
              <button
                onClick={shareToTwitter}
                className="w-12 h-12 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500 hover:scale-110 transition-all shadow-md"
                aria-label="Share on Twitter"
                title="Share on Twitter"
              >
                <i className="fa-brands fa-twitter text-xl"></i>
              </button>

              {/* Facebook */}
              <button
                onClick={shareToFacebook}
                className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-110 transition-all shadow-md"
                aria-label="Share on Facebook"
                title="Share on Facebook"
              >
                <i className="fa-brands fa-facebook text-xl"></i>
              </button>

              {/* WhatsApp */}
              <button
                onClick={shareToWhatsApp}
                className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 hover:scale-110 transition-all shadow-md"
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp text-xl"></i>
              </button>

              {/* LinkedIn */}
              <button
                onClick={shareToLinkedIn}
                className="w-12 h-12 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 hover:scale-110 transition-all shadow-md"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                <i className="fa-brands fa-linkedin text-xl"></i>
              </button>

              {/* Download Image */}
              <button
                onClick={downloadImage}
                disabled={isGenerating}
                className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-700 hover:scale-110 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Download Image"
                title="Download Image"
              >
                {isGenerating ? (
                  <i className="fa-solid fa-spinner fa-spin text-xl"></i>
                ) : (
                  <i className="fa-solid fa-download text-xl"></i>
                )}
              </button>

              {/* Copy Link */}
              <button
                onClick={copyLink}
                className="w-12 h-12 flex items-center justify-center bg-gray-600 text-white rounded-full hover:bg-gray-700 hover:scale-110 transition-all shadow-md"
                aria-label="Copy Link"
                title="Copy Link"
              >
                <i className="fa-solid fa-link text-xl"></i>
              </button>
            </div>
          </div>
        )}

        {/* Main Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="bg-terracotta text-white py-3 px-4 font-bold hover:bg-amber-700 transition-colors rounded-md flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-share-nodes"></i>
            Share Result
          </button>

          <button
            onClick={onTryAgain}
            className="bg-brand-dark text-white py-3 px-4 font-bold hover:bg-gray-700 transition-colors rounded-md flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-rotate-right"></i>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
