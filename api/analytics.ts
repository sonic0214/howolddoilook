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

    // Google Analytics 4 数据收集
    // 注意：服务器端无法直接发送到GA4，数据收集由前端处理
    // 这里我们只记录和分析数据，用于服务器端分析和潜在的未来集成
    console.log('📊 Analytics Data Collected:', {
      eventType: event.eventName,
      sessionId: event.sessionId,
      timestamp: new Date().toISOString(),
      // 记录关键数据用于服务器端分析
      analysisSuccess: event.properties?.success,
      analysisDuration: event.properties?.duration,
      deviceType: event.properties?.deviceType,
      browser: event.properties?.browser
    });

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