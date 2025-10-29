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

    // 这里可以集成实际的 analytics 服务，例如：
    // - Google Analytics 4
    // - Mixpanel
    // - Amplitude
    // - 自建分析服务

    // 示例：如果使用 GA4
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', event.eventName, {
    //     custom_parameters: event.properties,
    //     session_id: event.sessionId,
    //     page_location: event.url
    //   });
    // }

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