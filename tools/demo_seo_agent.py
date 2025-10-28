#!/usr/bin/env python3
"""
Claude SEO Agent 演示脚本

这个脚本演示如何使用Claude SEO Agent分析Lumin AI项目
"""

import sys
import os

# 添加当前目录到Python路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from claude_seo_agent import SEOOptimizerAgent, SEOIssue

def demo_analysis():
    """演示SEO分析功能"""
    print("🤖 Claude SEO Agent 演示模式")
    print("="*80)
    print("📊 正在分析 Lumin AI 项目 (本地开发环境)")
    print("="*80)

    # 本地开发URL
    local_url = "http://localhost:5173"

    try:
        # 创建Agent实例
        agent = SEOOptimizerAgent(local_url)

        # 模拟一些常见的SEO问题（用于演示）
        demo_issues = [
            SEOIssue(
                category="Meta标签",
                severity="high",
                title="Meta Description可以优化",
                description="当前Meta Description长度为145字符，可以增加更多关键词",
                recommendation="优化Meta Description，包含更多相关关键词和行动召唤",
                code_solution='<meta name="description" content="AI-powered age estimation with unique Vibe Tags. Upload your photo for instant analysis and discover your age estimate plus personality insights. Free & fun!">',
                impact_score=4.0
            ),
            SEOIssue(
                category="图片优化",
                severity="medium",
                title="部分图片可以添加WebP格式",
                description="发现5个JPG/PNG图片可以转换为WebP格式以提升加载速度",
                recommendation="将图片转换为WebP格式，使用picture元素提供fallback",
                code_solution='''<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述" loading="lazy">
</picture>''',
                impact_score=3.0
            ),
            SEOIssue(
                category="性能优化",
                severity="medium",
                title="可以添加更多预加载提示",
                description="关键CSS和字体资源可以添加预加载提示",
                recommendation="为关键资源添加preload和preconnect提示",
                code_solution='''<link rel="preload" href="critical.css" as="style">
<link rel="preconnect" href="https://fonts.googleapis.com">''',
                impact_score=2.5
            )
        ]

        # 添加演示问题
        agent.issues = demo_issues

        # 添加演示指标
        agent.metrics = [
            agent.SEMetric("页面加载速度", 2.2, 2.0, "秒", "warning"),
            agent.SEMetric("Meta Description长度", 145, 155, "字符", "good"),
            agent.SEMetric("图片优化覆盖率", 75, 90, "%", "warning"),
            agent.SEMetric("内部链接数量", 12, 10, "个", "good")
        ]

        # 生成分析报告
        agent.generate_optimization_plan()

        # 生成代码解决方案
        print("\n" + "="*80)
        print("🔧 优化代码解决方案")
        print("="*80)
        print(agent.generate_code_solutions())

        # 保存演示报告
        demo_filename = "lumin_ai_seo_demo_report.md"
        agent.save_report(demo_filename)

        print(f"\n📄 演示报告已保存: {demo_filename}")
        print("\n💡 要对真实网站进行分析，请运行:")
        print("   python claude_seo_agent.py")

    except Exception as e:
        print(f"❌ 演示失败: {str(e)}")
        print("\n💡 请确保:")
        print("   1. 安装了依赖: pip install -r requirements.txt")
        print("   2. 本地开发服务器正在运行: npm run dev")

def show_usage():
    """显示使用说明"""
    print("""
🤖 Claude SEO Agent 使用说明

📋 功能特性:
   • 自动SEO分析和问题识别
   • 智能优化建议和代码生成
   • 交互式优化流程
   • 详细的分析报告

🚀 快速开始:

1. 安装依赖:
   pip install -r requirements.txt

2. 运行分析:
   python claude_seo_agent.py

3. 按提示操作:
   - 输入要分析的网站URL
   - 选择分析范围
   - 查看分析结果
   - 选择优化方案

💡 演示模式:
   python demo_seo_agent.py

📖 详细文档:
   cat README_SEO_AGENT.md
    """)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] in ['--help', '-h']:
        show_usage()
    else:
        demo_analysis()