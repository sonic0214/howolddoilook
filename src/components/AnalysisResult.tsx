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
    <div>
      {/* Result Card - This will be captured */}
      <div
        ref={resultRef}
        data-result-card
        className="text-left rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-white via-orange-50 to-amber-50"
        style={{
          border: '2px solid #FED7AA'
        }}
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={uploadedImage}
              alt="Your photo"
              style={{ filter: 'brightness(1.05) contrast(1.02)' }}
            />
          </div>
          <div className="p-8 bg-white/60 backdrop-blur-sm">
            <div
              className="inline-block uppercase tracking-wide text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
            >
              YOUR AGE ANALYSIS
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600 font-medium">Estimated Age</div>
              <div
                className="text-3xl font-bold text-gray-900"
              >
                {result.age} years
              </div>
            </div>
            <div className="mt-4 bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border-2 border-orange-200">
              <div className="text-sm font-semibold text-orange-600 mb-1">✨ Your Vibe</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                {result.vibeTag}
              </div>
            </div>
              {/* Watermark */}
            <div
              className="mt-6 text-xs font-medium text-orange-400"
            >
              howolddoilook.art
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
