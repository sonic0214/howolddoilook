// 埋点分析工具
interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

interface AnalysisEventProperties {
  fileType?: string;
  fileSize?: number;
  userDevice?: string;
  userBrowser?: string;
  analysisStartTime?: number;
  isProduction?: boolean;
}

// 获取用户设备信息
const getUserDeviceInfo = () => {
  const userAgent = navigator.userAgent;

  // 简单的设备检测
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);

  let deviceType = 'desktop';
  if (isMobile) deviceType = 'mobile';
  else if (isTablet) deviceType = 'tablet';

  // 简单的浏览器检测
  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'chrome';
  else if (userAgent.includes('Firefox')) browser = 'firefox';
  else if (userAgent.includes('Safari')) browser = 'safari';
  else if (userAgent.includes('Edge')) browser = 'edge';
  else if (userAgent.includes('Opera')) browser = 'opera';

  return {
    deviceType,
    browser,
    userAgent: userAgent.substring(0, 200) // 限制长度
  };
};

// 发送埋点事件到服务器
const sendAnalyticsEvent = async (event: AnalyticsEvent) => {
  try {
    // 只在生产环境发送到服务器，开发环境只在控制台打印
    if (import.meta.env.PROD) {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          timestamp: event.timestamp || Date.now(),
          sessionId: getSessionId(),
          url: window.location.href,
          referrer: document.referrer || 'direct',
        }),
      });
    } else {
      // 开发环境在控制台打印埋点信息
      console.log('🔥 Analytics Event:', {
        ...event,
        timestamp: event.timestamp || Date.now(),
        sessionId: getSessionId(),
        url: window.location.href
      });
    }
  } catch (error) {
    console.warn('Failed to send analytics event:', error);
  }
};

// 获取或创建会话ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// 具体的埋点事件函数
export const analytics = {
  // 页面访问埋点
  pageView: (pageName: string) => {
    sendAnalyticsEvent({
      eventName: 'page_view',
      properties: {
        pageName,
        ...getUserDeviceInfo()
      }
    });
  },

  // 开始分析埋点
  analysisStart: (properties?: AnalysisEventProperties) => {
    const deviceInfo = getUserDeviceInfo();
    sendAnalyticsEvent({
      eventName: 'analysis_start',
      properties: {
        ...deviceInfo,
        ...properties,
        analysisStartTime: Date.now()
      }
    });
  },

  // 分析完成埋点
  analysisComplete: (properties: {
    success: boolean;
    age?: number;
    gender?: string;
    vibeTag?: string;
    rarity?: string;
    cardType?: string;
    duration?: number;
    errorMessage?: string;
  }) => {
    const deviceInfo = getUserDeviceInfo();
    sendAnalyticsEvent({
      eventName: 'analysis_complete',
      properties: {
        ...deviceInfo,
        ...properties
      }
    });
  },

  // 分享埋点
  share: (platform: string, properties?: {
    vibeTag?: string;
    rarity?: string;
    age?: number;
  }) => {
    sendAnalyticsEvent({
      eventName: 'share',
      properties: {
        platform,
        ...getUserDeviceInfo(),
        ...properties
      }
    });
  },

  // 下载图片埋点
  downloadImage: (properties?: {
    vibeTag?: string;
    rarity?: string;
    cardType?: string;
  }) => {
    sendAnalyticsEvent({
      eventName: 'download_image',
      properties: {
        ...getUserDeviceInfo(),
        ...properties
      }
    });
  },

  // 按钮点击埋点
  buttonClick: (buttonName: string, properties?: Record<string, any>) => {
    sendAnalyticsEvent({
      eventName: 'button_click',
      properties: {
        buttonName,
        ...getUserDeviceInfo(),
        ...properties
      }
    });
  },

  // 错误埋点
  error: (errorType: string, errorMessage?: string, properties?: Record<string, any>) => {
    sendAnalyticsEvent({
      eventName: 'error',
      properties: {
        errorType,
        errorMessage,
        ...getUserDeviceInfo(),
        ...properties
      }
    });
  }
};

// 导出默认埋点实例
export default analytics;