import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: true,
  },
};

interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  timestamp?: number;
  sessionId?: string;
  url?: string;
  referrer?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  try {
    const event: AnalyticsEvent = req.body;

    // 验证必要字段
    if (!event.eventName) {
      return res.status(400).json({
        success: false,
        error: 'Missing eventName'
      });
    }

    // 记录埋点事件到控制台（生产环境中可以接入实际的 analytics 服务）
    console.log('📊 Analytics Event Received:', {
      eventName: event.eventName,
      properties: event.properties,
      timestamp: event.timestamp,
      sessionId: event.sessionId,
      url: event.url,
      referrer: event.referrer,
      userAgent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
    });

    // 集成 Google Analytics 4
    try {
      // 如果gtag函数存在（通过HTML全局脚本加载）
      if (typeof gtag !== 'undefined') {
        // 将自定义属性转换为GA4格式
        const ga4Parameters: any = {};

        if (event.properties) {
          // 添加自定义参数（最多25个）
          Object.keys(event.properties).slice(0, 25).forEach((key, index) => {
            ga4Parameters[`custom_parameter_${index + 1}`] = event.properties[key];
          });
        }

        // 添加会话ID
        if (event.sessionId) {
          ga4Parameters.session_id = event.sessionId;
        }

        // 添加页面位置
        if (event.url) {
          ga4Parameters.page_location = event.url;
        }

        // 发送事件到GA4
        gtag('event', event.eventName, ga4Parameters);

        console.log('📊 GA4 Event Sent:', {
          eventName: event.eventName,
          parameters: ga4Parameters
        });
      } else {
        console.warn('⚠️ Google Analytics gtag function not available');
      }
    } catch (error) {
      console.error('❌ GA4 Integration Error:', error);
    }

    return res.status(200).json({
      success: true,
      message: 'Analytics event recorded'
    });

  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}