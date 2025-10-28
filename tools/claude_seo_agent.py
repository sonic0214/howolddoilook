#!/usr/bin/env python3
"""
Claude SEO Agent - AI驱动的SEO分析和优化助手

这个Agent能够：
1. 自动分析网站SEO状况
2. 提供详细的优化建议
3. 与用户交互确认优化方案
4. 生成可执行的优化代码
5. 跟踪优化效果

作者: Claude AI
版本: 1.0.0
"""

import json
import re
import requests
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from urllib.parse import urljoin, urlparse
import time
from bs4 import BeautifulSoup
import csv
from datetime import datetime

@dataclass
class SEOIssue:
    """SEO问题描述"""
    category: str
    severity: str  # critical, high, medium, low
    title: str
    description: str
    recommendation: str
    code_solution: Optional[str] = None
    impact_score: float = 0.0

@dataclass
class SEOMetric:
    """SEO指标"""
    name: str
    current_value: float
    target_value: float
    unit: str
    status: str  # good, warning, critical

class SEOOptimizerAgent:
    """Claude SEO优化Agent"""

    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.parsed_url = urlparse(self.base_url)
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Claude-SEO-Agent/1.0 (SEO Analysis Bot)'
        })

        # SEO分析结果
        self.issues: List[SEOIssue] = []
        self.metrics: List[SEOMetric] = []
        self.analysis_timestamp = datetime.now()

    def print_header(self):
        """打印Agent头部信息"""
        print("=" * 80)
        print("🤖 Claude SEO Agent - AI驱动的SEO分析和优化助手")
        print("=" * 80)
        print(f"📊 分析目标: {self.base_url}")
        print(f"⏰ 分析时间: {self.analysis_timestamp.strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 80)

    def get_user_confirmation(self, message: str, default: bool = True) -> bool:
        """获取用户确认"""
        suffix = " [Y/n]" if default else " [y/N]"
        response = input(f"\n❓ {message}{suffix}: ").strip().lower()

        if not response:
            return default

        return response in ['y', 'yes', '是', 'ok', '确定']

    def get_user_choice(self, question: str, options: List[str]) -> int:
        """获取用户选择"""
        print(f"\n❓ {question}")
        for i, option in enumerate(options, 1):
            print(f"   {i}. {option}")

        while True:
            try:
                choice = input("请选择 (输入数字): ").strip()
                choice_idx = int(choice) - 1
                if 0 <= choice_idx < len(options):
                    return choice_idx
                else:
                    print("⚠️  请输入有效的选项数字")
            except ValueError:
                print("⚠️  请输入数字")

    def analyze_page(self, url: str) -> Optional[BeautifulSoup]:
        """分析单个页面"""
        try:
            print(f"🔍 正在分析: {url}")
            response = self.session.get(url, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')
            print(f"✅ 页面分析完成: {url}")
            return soup

        except Exception as e:
            print(f"❌ 页面分析失败: {url} - {str(e)}")
            return None

    def check_title_tags(self, soup: BeautifulSoup, url: str) -> None:
        """检查Title标签"""
        title_tag = soup.find('title')

        if not title_tag:
            self.issues.append(SEOIssue(
                category="Meta标签",
                severity="critical",
                title="缺少Title标签",
                description=f"页面 {url} 没有Title标签",
                recommendation="添加描述性的Title标签，包含主要关键词，长度控制在50-60字符",
                code_solution='<title>页面标题 - 主要关键词</title>',
                impact_score=10.0
            ))
            return

        title_text = title_tag.get_text().strip()
        title_length = len(title_text)

        if title_length < 30:
            self.issues.append(SEOIssue(
                category="Meta标签",
                severity="high",
                title="Title标签过短",
                description=f"Title标签 '{title_text}' 长度为 {title_length} 字符，少于推荐的30字符",
                recommendation="增加Title标签长度，包含更多相关关键词",
                code_solution=f'<title>{title_text} - 补充关键词</title>',
                impact_score=5.0
            ))
        elif title_length > 60:
            self.issues.append(SEOIssue(
                category="Meta标签",
                severity="medium",
                title="Title标签过长",
                description=f"Title标签长度为 {title_length} 字符，超过推荐的60字符",
                recommendation="缩短Title标签，确保重要信息在搜索结果中完整显示",
                code_solution=f'<title>{title_text[:57]}...</title>',
                impact_score=3.0
            ))

        self.metrics.append(SEOMetric(
            name="Title长度",
            current_value=title_length,
            target_value=50,
            unit="字符",
            status="good" if 30 <= title_length <= 60 else "warning"
        ))

    def check_meta_description(self, soup: BeautifulSoup, url: str) -> None:
        """检查Meta Description"""
        meta_desc = soup.find('meta', attrs={'name': 'description'})

        if not meta_desc or not meta_desc.get('content'):
            self.issues.append(SEOIssue(
                category="Meta标签",
                severity="high",
                title="缺少Meta Description",
                description=f"页面 {url} 没有Meta Description",
                recommendation="添加Meta Description，长度控制在150-160字符，包含关键词和行动召唤",
                code_solution='<meta name="description" content="页面描述，包含关键词和行动召唤">',
                impact_score=8.0
            ))
            return

        desc_content = meta_desc.get('content', '').strip()
        desc_length = len(desc_content)

        if desc_length < 120:
            self.issues.append(SEOIssue(
                category="Meta标签",
                severity="medium",
                title="Meta Description过短",
                description=f"Meta Description长度为 {desc_length} 字符，少于推荐的120字符",
                recommendation="增加描述长度，更好地描述页面内容",
                impact_score=3.0
            ))
        elif desc_length > 160:
            self.issues.append(SEOIssue(
                category="Meta标签",
                severity="medium",
                title="Meta Description过长",
                description=f"Meta Description长度为 {desc_length} 字符，超过推荐的160字符",
                recommendation="缩短描述，确保在搜索结果中完整显示",
                impact_score=2.0
            ))

        self.metrics.append(SEOMetric(
            name="Meta Description长度",
            current_value=desc_length,
            target_value=150,
            unit="字符",
            status="good" if 120 <= desc_length <= 160 else "warning"
        ))

    def check_heading_structure(self, soup: BeautifulSoup, url: str) -> None:
        """检查标题结构"""
        h1_tags = soup.find_all('h1')

        if len(h1_tags) == 0:
            self.issues.append(SEOIssue(
                category="内容结构",
                severity="high",
                title="缺少H1标签",
                description=f"页面 {url} 没有H1标签",
                recommendation="添加唯一的H1标签，包含页面主关键词",
                code_solution='<h1>页面主标题</h1>',
                impact_score=9.0
            ))
        elif len(h1_tags) > 1:
            self.issues.append(SEOIssue(
                category="内容结构",
                severity="medium",
                title="多个H1标签",
                description=f"页面有 {len(h1_tags)} 个H1标签",
                recommendation="只保留一个H1标签，其他改为H2或H3",
                impact_score=4.0
            ))

        # 检查标题层级结构
        headings = []
        for i in range(1, 7):
            for heading in soup.find_all(f'h{i}'):
                headings.append((i, heading.get_text().strip()))

        # 检查是否有跳级
        for i in range(1, len(headings)):
            current_level = headings[i][0]
            prev_level = headings[i-1][0]

            if current_level > prev_level + 1:
                self.issues.append(SEOIssue(
                    category="内容结构",
                    severity="low",
                    title="标题层级跳级",
                    description=f"H{prev_level} 后直接跳到 H{current_level}",
                    recommendation="确保标题层级连续，不要跳级",
                    impact_score=1.0
                ))

        self.metrics.append(SEOMetric(
            name="H1标签数量",
            current_value=len(h1_tags),
            target_value=1,
            unit="个",
            status="good" if len(h1_tags) == 1 else "warning"
        ))

    def check_image_optimization(self, soup: BeautifulSoup, url: str) -> None:
        """检查图片优化"""
        images = soup.find_all('img')
        images_without_alt = 0
        images_missing_lazy = 0

        for img in images:
            # 检查alt属性
            if not img.get('alt'):
                images_without_alt += 1

            # 检查lazy loading
            if img.get('loading') != 'lazy':
                images_missing_lazy += 1

        if images_without_alt > 0:
            self.issues.append(SEOIssue(
                category="图片优化",
                severity="high",
                title=f"缺少Alt属性的图片",
                description=f"有 {images_without_alt} 个图片缺少alt属性",
                recommendation="为所有图片添加描述性的alt属性，包含相关关键词",
                code_solution='<img src="image.jpg" alt="图片描述，包含关键词" loading="lazy">',
                impact_score=6.0
            ))

        if images_missing_lazy > 0:
            self.issues.append(SEOIssue(
                category="图片优化",
                severity="medium",
                title="未使用懒加载",
                description=f"有 {images_missing_lazy} 个图片未使用懒加载",
                recommendation="为非首屏图片添加loading="lazy"属性",
                code_solution='<img src="image.jpg" alt="描述" loading="lazy">',
                impact_score=3.0
            ))

        alt_percentage = ((len(images) - images_without_alt) / len(images) * 100) if images else 0
        self.metrics.append(SEOMetric(
            name="图片Alt属性覆盖率",
            current_value=alt_percentage,
            target_value=100,
            unit="%",
            status="good" if alt_percentage >= 90 else "warning"
        ))

    def check_internal_links(self, soup: BeautifulSoup, url: str) -> None:
        """检查内部链接"""
        links = soup.find_all('a', href=True)
        internal_links = 0
        external_links = 0
        links_without_text = 0

        for link in links:
            href = link.get('href', '')
            text = link.get_text().strip()

            if not text:
                links_without_text += 1
                continue

            # 判断是否为内部链接
            if href.startswith('/') or href.startswith(self.base_url):
                internal_links += 1
            elif href.startswith('http'):
                external_links += 1

        if links_without_text > 0:
            self.issues.append(SEOIssue(
                category="内部链接",
                severity="medium",
                title="空链接文本",
                description=f"有 {links_without_text} 个链接没有描述性文本",
                recommendation="为所有链接添加描述性文本",
                code_solution='<a href="page.html">描述性链接文本</a>',
                impact_score=3.0
            ))

        self.metrics.append(SEOMetric(
            name="内部链接数量",
            current_value=internal_links,
            target_value=10,
            unit="个",
            status="good" if internal_links >= 5 else "warning"
        ))

    def check_meta_tags(self, soup: BeautifulSoup, url: str) -> None:
        """检查其他Meta标签"""
        essential_metas = ['viewport', 'robots', 'description']
        missing_metas = []

        for meta_name in essential_metas:
            if not soup.find('meta', attrs={'name': meta_name}):
                missing_metas.append(meta_name)

        if missing_metas:
            self.issues.append(SEOIssue(
                category="Meta标签",
                severity="high",
                title=f"缺少重要的Meta标签",
                description=f"缺少以下Meta标签: {', '.join(missing_metas)}",
                recommendation="添加缺少的Meta标签",
                code_solution='''
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="index, follow">
<meta name="description" content="页面描述">
                ''',
                impact_score=7.0
            ))

        # 检查Open Graph标签
        og_tags = ['og:title', 'og:description', 'og:image', 'og:url']
        missing_og = []

        for og_tag in og_tags:
            if not soup.find('meta', attrs={'property': og_tag}):
                missing_og.append(og_tag)

        if missing_og:
            self.issues.append(SEOIssue(
                category="社交媒体",
                severity="medium",
                title="缺少Open Graph标签",
                description=f"缺少以下OG标签: {', '.join(missing_og)}",
                recommendation="添加Open Graph标签以优化社交媒体分享效果",
                code_solution='''
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="分享图片URL">
<meta property="og:url" content="页面URL">
                ''',
                impact_score=4.0
            ))

    def check_performance_hints(self, soup: BeautifulSoup, url: str) -> None:
        """检查性能相关优化"""
        # 检查是否有CSS阻塞渲染
        css_links = soup.find_all('link', attrs={'rel': 'stylesheet'})
        blocking_css = sum(1 for link in css_links if not link.get('media') or 'print' not in link.get('media', ''))

        if blocking_css > 2:
            self.issues.append(SEOIssue(
                category="性能优化",
                severity="medium",
                title="CSS阻塞渲染",
                description=f"有 {blocking_css} 个CSS文件可能阻塞页面渲染",
                recommendation="使用媒体查询或异步加载非关键CSS",
                impact_score=3.0
            ))

        # 检查是否有内联CSS
        inline_styles = soup.find_all('style')
        if inline_styles:
            self.issues.append(SEOIssue(
                category="性能优化",
                severity="low",
                title="内联CSS样式",
                description=f"页面有 {len(inline_styles)} 个内联样式",
                recommendation="将CSS移至外部文件，减少HTML体积",
                impact_score=1.0
            ))

    def analyze_page_seo(self, url: str) -> None:
        """分析单个页面的SEO"""
        soup = self.analyze_page(url)
        if not soup:
            return

        # 执行各项检查
        self.check_title_tags(soup, url)
        self.check_meta_description(soup, url)
        self.check_heading_structure(soup, url)
        self.check_image_optimization(soup, url)
        self.check_internal_links(soup, url)
        self.check_meta_tags(soup, url)
        self.check_performance_hints(soup, url)

    def analyze_sitemap(self) -> None:
        """分析网站地图"""
        sitemap_urls = [
            f"{self.base_url}/sitemap.xml",
            f"{self.base_url}/sitemap_index.xml"
        ]

        sitemap_found = False
        for sitemap_url in sitemap_urls:
            try:
                response = self.session.get(sitemap_url, timeout=10)
                if response.status_code == 200:
                    sitemap_found = True
                    print(f"✅ 找到Sitemap: {sitemap_url}")
                    break
            except:
                continue

        if not sitemap_found:
            self.issues.append(SEOIssue(
                category="技术SEO",
                severity="medium",
                title="缺少Sitemap",
                description="未找到sitemap.xml文件",
                recommendation="创建并提交sitemap.xml到搜索引擎",
                impact_score=5.0
            ))

    def analyze_robots_txt(self) -> None:
        """分析robots.txt"""
        robots_url = f"{self.base_url}/robots.txt"

        try:
            response = self.session.get(robots_url, timeout=10)
            if response.status_code == 200:
                print("✅ 找到robots.txt")

                # 检查是否允许搜索引擎访问
                content = response.text.lower()
                if 'disallow: /' in content and 'allow:' not in content:
                    self.issues.append(SEOIssue(
                        category="技术SEO",
                        severity="critical",
                        title="Robots.txt阻止所有访问",
                        description="robots.txt可能阻止搜索引擎访问网站",
                        recommendation="检查robots.txt配置，确保允许搜索引擎访问重要页面",
                        impact_score=10.0
                    ))
            else:
                self.issues.append(SEOIssue(
                    category="技术SEO",
                    severity="medium",
                    title="缺少robots.txt",
                    description="未找到robots.txt文件",
                    recommendation="创建robots.txt文件，指导搜索引擎爬取",
                    code_solution='''User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml''',
                    impact_score=3.0
                ))
        except:
            self.issues.append(SEOIssue(
                category="技术SEO",
                severity="medium",
                title="无法访问robots.txt",
                description="无法访问robots.txt文件",
                recommendation="确保robots.txt文件可以正常访问",
                impact_score=2.0
            ))

    def generate_optimization_plan(self) -> None:
        """生成优化计划"""
        print("\n" + "="*80)
        print("📋 SEO优化分析报告")
        print("="*80)

        # 按严重程度排序问题
        critical_issues = [i for i in self.issues if i.severity == 'critical']
        high_issues = [i for i in self.issues if i.severity == 'high']
        medium_issues = [i for i in self.issues if i.severity == 'medium']
        low_issues = [i for i in self.issues if i.severity == 'low']

        total_impact = sum(i.impact_score for i in self.issues)

        print(f"📊 发现问题总数: {len(self.issues)} 个")
        print(f"🚨 严重问题: {len(critical_issues)} 个")
        print(f"⚠️  高优先级: {len(high_issues)} 个")
        print(f"📝 中等优先级: {len(medium_issues)} 个")
        print(f"💡 低优先级: {len(low_issues)} 个")
        print(f"🎯 预估SEO评分提升: +{total_impact:.1f} 分")

        # 显示关键指标
        print("\n📈 关键指标:")
        for metric in self.metrics:
            status_icon = "✅" if metric.status == "good" else "⚠️"
            print(f"   {status_icon} {metric.name}: {metric.current_value:.1f}{metric.unit} (目标: {metric.target_value}{metric.unit})")

        # 显示问题详情
        if critical_issues or high_issues:
            print(f"\n🚨 需要优先处理的问题:")
            for issue in critical_issues + high_issues:
                print(f"\n   [{issue.severity.upper()}] {issue.title}")
                print(f"   📝 {issue.description}")
                print(f"   💡 建议: {issue.recommendation}")

        # 显示优化建议
        if self.issues:
            print(f"\n🎯 推荐的优化策略:")

            # 根据问题类型推荐优化策略
            categories = list(set(issue.category for issue in self.issues))
            for category in categories:
                category_issues = [i for i in self.issues if i.category == category]
                print(f"\n   📂 {category} ({len(category_issues)} 个问题):")

                for issue in category_issues[:3]:  # 只显示前3个
                    print(f"      • {issue.title}")

    def generate_code_solutions(self) -> str:
        """生成代码解决方案"""
        if not self.issues:
            return "恭喜！未发现SEO问题。"

        solutions = []
        solutions.append("# SEO优化代码解决方案\n")
        solutions.append("```html\n")

        # 按类别分组生成解决方案
        categories = {}
        for issue in self.issues:
            if issue.category not in categories:
                categories[issue.category] = []
            categories[issue.category].append(issue)

        for category, issues in categories.items():
            solutions.append(f"\n<!-- {category} 优化 -->")

            # 去重代码解决方案
            unique_solutions = set()
            for issue in issues:
                if issue.code_solution and issue.code_solution not in unique_solutions:
                    unique_solutions.add(issue.code_solution)
                    solutions.append(f"<!-- {issue.title} -->")
                    solutions.append(issue.code_solution)

        solutions.append("\n```")
        return "\n".join(solutions)

    def save_report(self, filename: str = None) -> None:
        """保存分析报告"""
        if not filename:
            timestamp = self.analysis_timestamp.strftime("%Y%m%d_%H%M%S")
            filename = f"seo_report_{timestamp}.md"

        report_content = []
        report_content.append("# SEO分析报告\n")
        report_content.append(f"**网站**: {self.base_url}\n")
        report_content.append(f"**分析时间**: {self.analysis_timestamp.strftime('%Y-%m-%d %H:%M:%S')}\n")

        # 问题汇总
        critical_issues = [i for i in self.issues if i.severity == 'critical']
        high_issues = [i for i in self.issues if i.severity == 'high']

        report_content.append("## 问题汇总\n")
        report_content.append(f"- 总问题数: {len(self.issues)}\n")
        report_content.append(f"- 严重问题: {len(critical_issues)}\n")
        report_content.append(f"- 高优先级: {len(high_issues)}\n")

        # 详细问题列表
        report_content.append("## 详细问题\n")
        for i, issue in enumerate(self.issues, 1):
            report_content.append(f"### {i}. {issue.title}\n")
            report_content.append(f"**严重程度**: {issue.severity}\n")
            report_content.append(f"**描述**: {issue.description}\n")
            report_content.append(f"**建议**: {issue.recommendation}\n")
            if issue.code_solution:
                report_content.append(f"**代码解决方案**:\n```html\n{issue.code_solution}\n```\n")

        # 添加代码解决方案
        report_content.append("## 代码解决方案\n")
        report_content.append(self.generate_code_solutions())

        # 保存文件
        with open(filename, 'w', encoding='utf-8') as f:
            f.write('\n'.join(report_content))

        print(f"\n📄 报告已保存到: {filename}")

    def interactive_optimization(self) -> None:
        """交互式优化流程"""
        print("\n" + "="*80)
        print("🤖 开始交互式SEO优化流程")
        print("="*80)

        if not self.issues:
            print("🎉 恭喜！未发现SEO问题。")
            return

        # 询问用户要优化的问题类型
        categories = list(set(issue.category for issue in self.issues))
        category_options = ["全部问题"] + categories + ["生成完整报告", "退出"]

        choice_idx = self.get_user_choice("请选择要优化的问题类型:", category_options)

        if choice_idx == len(category_options) - 1:  # 退出
            return
        elif choice_idx == len(category_options) - 2:  # 生成报告
            self.save_report()
            return
        elif choice_idx == 0:  # 全部问题
            selected_issues = self.issues
        else:  # 特定类别
            selected_category = categories[choice_idx - 1]
            selected_issues = [i for i in self.issues if i.category == selected_category]

        # 显示选中的问题
        print(f"\n📋 选中了 {len(selected_issues)} 个问题:")
        for i, issue in enumerate(selected_issues, 1):
            print(f"   {i}. {issue.title} ({issue.severity})")

        # 确认是否生成代码解决方案
        if self.get_user_confirmation(f"\n为这 {len(selected_issues)} 个问题生成代码解决方案?"):
            print("\n💻 正在生成代码解决方案...")

            solutions = []
            for issue in selected_issues:
                if issue.code_solution:
                    solutions.append(f"<!-- {issue.title} -->")
                    solutions.append(issue.code_solution)
                    solutions.append("")

            if solutions:
                print("\n" + "="*60)
                print("🔧 代码解决方案")
                print("="*60)
                print("\n".join(solutions))

                # 询问是否保存到文件
                if self.get_user_confirmation("将代码解决方案保存到文件?"):
                    with open("seo_solutions.html", 'w', encoding='utf-8') as f:
                        f.write("<!-- SEO优化代码解决方案 -->\n")
                        f.write("<!-- 由Claude SEO Agent生成 -->\n")
                        f.write("\n".join(solutions))
                    print("✅ 代码解决方案已保存到: seo_solutions.html")
            else:
                print("⚠️  选中的问题没有代码解决方案")

    def run_analysis(self, pages: List[str] = None) -> None:
        """运行完整的SEO分析"""
        self.print_header()

        if not pages:
            pages = [self.base_url]

        # 询问是否分析多个页面
        if self.get_user_confirmation("是否要分析多个页面? (将分析首页和常见页面)"):
            # 常见页面模式
            common_patterns = [
                "/about", "/contact", "/products", "/services",
                "/blog", "/news", "/help", "/faq"
            ]

            for pattern in common_patterns:
                test_url = self.base_url + pattern
                try:
                    response = self.session.head(test_url, timeout=5)
                    if response.status_code == 200:
                        pages.append(test_url)
                except:
                    continue

        print(f"\n🔍 开始分析 {len(pages)} 个页面...")

        # 分析每个页面
        for page in pages:
            self.analyze_page_seo(page)
            time.sleep(1)  # 避免请求过快

        # 技术SEO检查
        print("\n🔧 检查技术SEO...")
        self.analyze_robots_txt()
        self.analyze_sitemap()

        # 生成分析报告
        self.generate_optimization_plan()

        # 交互式优化
        while True:
            print("\n" + "="*80)
            print("🤖 Claude SEO Agent - 可用操作")
            print("="*80)
            options = [
                "查看详细问题",
                "生成代码解决方案",
                "保存完整报告",
                "重新分析",
                "退出"
            ]

            choice_idx = self.get_user_choice("请选择操作:", options)

            if choice_idx == 0:  # 查看详细问题
                print("\n📋 详细问题列表:")
                for i, issue in enumerate(self.issues, 1):
                    print(f"\n{i}. [{issue.severity.upper()}] {issue.title}")
                    print(f"   📝 {issue.description}")
                    print(f"   💡 {issue.recommendation}")
                    if issue.code_solution:
                        print(f"   🔧 {issue.code_solution}")

            elif choice_idx == 1:  # 生成代码解决方案
                print(self.generate_code_solutions())

            elif choice_idx == 2:  # 保存报告
                self.save_report()

            elif choice_idx == 3:  # 重新分析
                print("\n🔄 重新开始分析...")
                self.issues.clear()
                self.metrics.clear()
                self.run_analysis(pages)
                return

            elif choice_idx == 4:  # 退出
                print("\n👋 感谢使用Claude SEO Agent!")
                break

def main():
    """主函数"""
    print("🤖 Claude SEO Agent - AI驱动的SEO分析和优化助手")
    print("="*80)

    # 获取用户输入的网站URL
    while True:
        url = input("\n请输入要分析的网站URL (例如: https://example.com): ").strip()

        if not url:
            print("⚠️  请输入有效的URL")
            continue

        # 添加协议前缀
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url

        # 验证URL格式
        try:
            parsed = urlparse(url)
            if not parsed.netloc:
                print("⚠️  请输入有效的URL格式")
                continue

            # 测试连接
            test_response = requests.head(url, timeout=10)
            if test_response.status_code not in [200, 403, 404]:
                print(f"⚠️  无法访问网站 (HTTP {test_response.status_code})")
                continue

            break

        except Exception as e:
            print(f"⚠️  连接失败: {str(e)}")
            continue

    # 创建并运行SEO Agent
    agent = SEOOptimizerAgent(url)

    try:
        agent.run_analysis()
    except KeyboardInterrupt:
        print("\n\n👋 分析已取消")
    except Exception as e:
        print(f"\n❌ 发生错误: {str(e)}")

if __name__ == "__main__":
    main()