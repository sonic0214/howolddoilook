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
    try {
      // 生成卡片图片
      const blob = await generateImageBlob();
      if (blob) {
        // 将blob转换为base64
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result as string;

          // 上传图片到免费的图片托管服务或使用data URL
          const text = `I look ${result.age} years old according to AI! My vibe: ${result.vibeTag} ✨`;
          const url = 'https://howolddoilook.art/';

          // 尝试分享图片（Twitter不支持直接分享图片，需要先上传）
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
          window.open(twitterUrl, '_blank', 'width=550,height=420');

          setShowShareMenu(false);
        };
        reader.readAsDataURL(blob);
      } else {
        // 如果图片生成失败，使用原有逻辑
        const text = `I look ${result.age} years old according to AI! My vibe: ${result.vibeTag} ✨`;
        const url = 'https://howolddoilook.art/';
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
        setShowShareMenu(false);
      }
    } catch (error) {
      console.error('Share error:', error);
      setShowShareMenu(false);
    }
  };

  const shareToFacebook = async () => {
    try {
      // 生成卡片图片
      const blob = await generateImageBlob();
      if (blob) {
        // 将blob转换为base64
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result as string;

          // 创建一个临时的下载链接让用户保存图片
          const imageUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = 'my-age-result.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(imageUrl);

          // 提示用户手动分享图片
          alert('卡片图片已下载！请将图片上传到Facebook并分享 📸');
          setShowShareMenu(false);
        };
        reader.readAsDataURL(blob);
      } else {
        // 如果图片生成失败，使用原有逻辑
        const url = 'https://howolddoilook.art/';
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank', 'width=550,height=420');
        setShowShareMenu(false);
      }
    } catch (error) {
      console.error('Share error:', error);
      setShowShareMenu(false);
    }
  };

  const shareToLinkedIn = async () => {
    const url = 'https://howolddoilook.art/';
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
    setShowShareMenu(false);
  };

  const shareToWhatsApp = async () => {
    try {
      // 生成卡片图片
      const blob = await generateImageBlob();
      if (blob) {
        // 将blob转换为base64
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result as string;

          // 创建一个临时的下载链接让用户保存图片
          const imageUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = 'my-age-result.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(imageUrl);

          // 提示用户手动发送图片
          const text = `I look ${result.age} years old according to AI! My vibe: ${result.vibeTag} ✨ Try it yourself: https://howolddoilook.art/\n\n(请分享刚刚下载的卡片图片 📸)`;
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
          window.open(whatsappUrl, '_blank');

          setShowShareMenu(false);
        };
        reader.readAsDataURL(blob);
      } else {
        // 如果图片生成失败，使用原有逻辑
        const text = `I look ${result.age} years old according to AI! My vibe: ${result.vibeTag} ✨ Try it yourself: https://howolddoilook.art/`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
        setShowShareMenu(false);
      }
    } catch (error) {
      console.error('Share error:', error);
      setShowShareMenu(false);
    }
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

  // Determine card type and render accordingly
  const cardType = result.cardType || 'classic';
  const rarity = result.rarity || 'Common';

  const renderClassicCard = () => (
    <div
      ref={resultRef}
      data-result-card
      className="bg-white shadow-2xl rounded-xl flex overflow-hidden"
      style={{
        width: '800px',
        height: '480px',
        maxWidth: '100%'
      }}
    >
      {/* Left side: User photo */}
      <div className="w-1/2 bg-gray-50">
        <img
          src={uploadedImage}
          className="w-full h-full object-contain p-3"
          alt="User selfie for age analysis"
          style={{ filter: 'brightness(1.05) contrast(1.02)' }}
        />
      </div>

      {/* Right side: Analysis results */}
      <div className="w-1/2 p-10 flex flex-col justify-between">
        <div>
          <p className="text-sm font-bold tracking-widest text-terracotta uppercase">YOUR ANALYSIS</p>
          <p className="mt-3 text-base text-gray-500">Estimated Age</p>
          <p className="text-6xl font-bold text-brand-dark leading-none">{result.age}</p>
        </div>

        <div className="mt-6">
          <div className="border-t border-gray-200 pt-5">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-bold text-terracotta">✨ Your Vibe</p>
              <p className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                {rarity}
              </p>
            </div>
            <p className="font-serif-display text-4xl text-brand-dark mt-2 leading-tight">{result.vibeTag}</p>
            {result.description && (
              <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-4">{result.description}</p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-8">
          <p className="text-lg font-bold text-brand-dark opacity-50">howolddoilook.art</p>
        </div>
      </div>
    </div>
  );

  const renderStoryCard = () => (
    <div
      ref={resultRef}
      data-result-card
      className="bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden"
      style={{
        width: '400px',
        height: '711px',
        maxWidth: '100%'
      }}
    >
      {/* Top: Photo */}
      <div className="h-3/5 bg-gray-50">
        <img
          src={uploadedImage}
          className="w-full h-full object-contain p-4"
          alt="User selfie for age analysis"
          style={{ filter: 'brightness(1.05) contrast(1.02)' }}
        />
      </div>

      {/* Bottom: Analysis results */}
      <div className="h-2/5 p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <p className="font-serif-display text-3xl text-brand-dark leading-tight flex-1 pr-2 overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                maxHeight: '3rem'
              }}>{result.vibeTag}</p>
            <p className="px-2 py-1 bg-terracotta text-white text-xs font-bold rounded-full whitespace-nowrap">
              {rarity}
            </p>
          </div>
          {result.description && (
            <p className="mt-3 text-gray-700 text-xs leading-relaxed line-clamp-3">{result.description}</p>
          )}
        </div>

        <div className="flex justify-between items-end text-brand-dark">
          <div className="text-left">
            <p className="text-sm text-gray-500">Estimated Age</p>
            <p className="text-4xl font-bold leading-none">{result.age}</p>
          </div>
          <p className="text-lg font-bold opacity-50">howolddoilook.art</p>
        </div>
      </div>
    </div>
  );

  const renderEpicCard = () => (
    <div
      ref={resultRef}
      data-result-card
      className="relative shadow-2xl rounded-xl overflow-hidden"
      style={{
        width: '400px',
        height: '550px',
        maxWidth: '100%'
      }}
    >
      {/* 背景图片 - 使用object-contain避免截取 */}
      <div className="absolute inset-0 bg-gray-900">
        <img
          src={uploadedImage}
          className="absolute inset-0 w-full h-full object-contain p-4"
          alt="User selfie for age analysis"
        />
        {/* 渐变蒙层 - 更浅的背景 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* 内容 */}
      <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
        {/* 右上角标签 */}
        <div className="text-right">
          <span
            className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full tracking-widest"
            style={{
              boxShadow: '0 0 12px rgba(255, 193, 7, 0.6)',
              textShadow: '0 0 12px rgba(255, 193, 7, 0.6)'
            }}
          >
            {rarity.toUpperCase()}
          </span>
        </div>

        {/* 中间内容 */}
        <div className="text-left">
          <p
            className="font-serif-display text-5xl leading-tight"
            style={{
              textShadow: '0 0 12px rgba(255, 193, 7, 0.6)'
            }}
          >
            {result.vibeTag}
          </p>
          {result.description && (
            <p className="mt-3 text-white/80 max-w-xs text-xs leading-relaxed line-clamp-4">
              {result.description}
            </p>
          )}
        </div>

        {/* 底部信息 */}
        <div className="flex justify-between items-end text-white">
          <div className="text-left">
            <p className="text-xs opacity-70">Estimated Age</p>
            <p className="text-3xl font-bold leading-none">{result.age}</p>
          </div>
          <p className="text-sm font-bold opacity-50">howolddoilook.art</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      {/* Result Card - This will be captured */}
      <div className="inline-block">
        {cardType === 'epic' && renderEpicCard()}
        {cardType === 'story' && renderStoryCard()}
        {cardType === 'classic' && renderClassicCard()}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 relative w-full max-w-lg">
        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border-2 border-terracotta rounded-lg shadow-xl p-4 z-10 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg" style={{ color: '#1F2937' }}>Share Your Result</h3>
              <button
                onClick={() => setShowShareMenu(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <span style={{ fontSize: '1.2rem' }}>✕</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4">
              {/* Twitter */}
              <button
                onClick={shareToTwitter}
                className="w-12 h-12 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500 hover:scale-110 transition-all shadow-md text-lg font-bold"
                aria-label="Share on Twitter"
                title="Share on Twitter"
              >
                𝕏
              </button>

              {/* Facebook */}
              <button
                onClick={shareToFacebook}
                className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-110 transition-all shadow-md text-xl font-bold"
                aria-label="Share on Facebook"
                title="Share on Facebook"
              >
                f
              </button>

              {/* WhatsApp */}
              <button
                onClick={shareToWhatsApp}
                className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 hover:scale-110 transition-all shadow-md text-xl"
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
              >
                💬
              </button>

              {/* LinkedIn */}
              <button
                onClick={shareToLinkedIn}
                className="w-12 h-12 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 hover:scale-110 transition-all shadow-md text-lg font-bold"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                in
              </button>

              {/* Download Image */}
              <button
                onClick={downloadImage}
                disabled={isGenerating}
                className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-700 hover:scale-110 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xl"
                aria-label="Download Image"
                title="Download Image"
              >
                {isGenerating ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  '⬇️'
                )}
              </button>

              {/* Copy Link */}
              <button
                onClick={copyLink}
                className="w-12 h-12 flex items-center justify-center bg-gray-600 text-white rounded-full hover:bg-gray-700 hover:scale-110 transition-all shadow-md text-xl"
                aria-label="Copy Link"
                title="Copy Link"
              >
                🔗
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
            <span className="icon-share" style={{ fontSize: '1.2rem' }}>🔗</span>
            Share Result
          </button>

          <button
            onClick={onTryAgain}
            className="bg-brand-dark text-white py-3 px-4 font-bold hover:bg-gray-700 transition-colors rounded-md flex items-center justify-center gap-2"
          >
            <span className="icon-refresh" style={{ fontSize: '1.2rem' }}>🔄</span>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
