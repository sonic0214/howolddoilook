# SEO 规范指南 (SEO Guidelines)

## 📋 概述

本文档定义了项目的SEO规范和最佳实践，确保所有页面都能被搜索引擎正确索引，并提升用户体验。

## 🎯 核心原则

### 1. URL可访问性 (Critical)
- **所有公开URL必须可访问，不能返回404错误**
- 路由配置必须与实际页面组件对应
- 新增路由时必须同步更新相关配置

### 2. SEO基础要求
- 每个页面必须有唯一的title标签
- 每个页面必须有meta description
- 重要页面需要结构化数据支持
- 图片必须有alt属性

### 3. 用户体验优化
- 页面加载速度优化
- 移动端友好
- 内部链接结构合理

## 🚀 强制检查清单

### 路由配置检查
- [ ] App.tsx中已添加对应路由
- [ ] 页面组件已创建
- [ ] vercel.json配置支持SPA路由
- [ ] 内部链接指向正确URL

### SEO元数据检查
- [ ] 页面有唯一title (建议50-60字符)
- [ ] 页面有meta description (建议150-160字符)
- [ ] 重要页面有结构化数据 (JSON-LD)
- [ ] 图片有描述性alt属性
- [ ] Open Graph标签配置正确

### 技术SEO检查
- [ ] 页面返回200状态码
- [ ] noindex, nofollow标签正确使用
- [ ] canonical URL设置正确
- [ ] 内部链接使用正确的Link组件

## 📁 当前路由映射

### 主要页面
```
/                           → Home.tsx
/articles                   → ArticlesPage.tsx
/skincare-article           → SkincareArticle.tsx
/nutrition-article          → NutritionArticle.tsx
/mindfulness-article        → MindfulnessArticle.tsx
```

### 文章详情页面
```
/articles/skincare-secrets              → SkincareSecrets.tsx
/articles/nutrition-and-aging          → NutritionAndAging.tsx
/articles/mindfulness-for-youthfulness → MindfulnessForYouthfulness.tsx
```

## 🔍 SEO检查流程

### 开发新页面时的检查步骤：

1. **创建页面组件**
   ```tsx
   // 必须包含这些SEO元素
   import { Helmet } from 'react-helmet-async';
   import ArticleSchema from '../components/ArticleSchema';

   // 页面必须包含
   <Helmet>
     <title>唯一页面标题 - Lumin AI</title>
     <meta name="description" content="页面描述" />
   </Helmet>
   ```

2. **配置路由**
   ```tsx
   // App.tsx中添加路由
   const NewPage = lazy(() => import('./pages/NewPage'));

   <Route path="/new-page" element={<NewPage />} />
   ```

3. **更新内部链接**
   - 检查所有指向新页面的链接
   - 使用React Router的Link组件
   - 确保链接文本具有描述性

4. **运行SEO检查**
   ```bash
   npm run seo-check
   ```

### 部署前检查清单：
- [ ] 所有新路由已测试
- [ ] 没有404错误
- [ ] SEO元数据完整
- [ ] 结构化数据验证通过
- [ ] sitemap已更新

## 🛠️ SEO工具和脚本

### SEO检查脚本
运行以下命令检查SEO规范：
```bash
npm run seo-check
```

### URL可访问性测试
```bash
npm test:routes
```

### sitemap生成
```bash
npm run generate-sitemap
```

## 📊 SEO监控指标

### 核心指标
- 页面索引率
- 有机搜索流量
- 页面加载速度
- 移动端友好性
- 内部链接覆盖率

### 定期检查
- 每月检查404错误
- 季度SEO审核
- 年度技术SEO优化

## ⚠️ 常见错误和解决方案

### 404错误
**错误原因：**
- 路由配置缺失
- 页面组件未创建
- URL拼写错误

**解决方案：**
1. 检查App.tsx路由配置
2. 确认页面组件存在
3. 验证URL拼写

### SEO元数据缺失
**错误原因：**
- 忘记添加Helmet组件
- title或description为空

**解决方案：**
1. 为每个页面添加完整的SEO元数据
2. 使用模板确保一致性

### 内部链接错误
**错误原因：**
- 链接指向不存在的页面
- 使用了错误的链接组件

**解决方案：**
1. 使用React Router的Link组件
2. 定期检查内部链接有效性

## 🔄 更新流程

### 添加新页面时的标准流程：
1. 创建页面组件（包含完整SEO）
2. 配置路由
3. 更新内部链接
4. 运行SEO检查
5. 更新sitemap
6. 测试所有URL可访问性

### 修改现有页面时的检查：
1. 检查SEO元数据是否仍然有效
2. 验证内部链接
3. 测试页面加载速度
4. 确认没有引入404错误

## 📝 维护责任

### 开发者责任：
- 遵循SEO规范开发新页面
- 运行SEO检查脚本
- 修复发现的SEO问题

### 定期审核：
- 月度：检查404错误和索引状态
- 季度：完整SEO审核
- 年度：技术SEO优化和策略更新

## 🆘 问题排查

### 如果发现404错误：
1. 检查控制台错误信息
2. 验证路由配置
3. 确认页面组件存在
4. 检查vercel.json配置

### 如果SEO评分低：
1. 使用Lighthouse审计
2. 检查页面加载速度
3. 验证SEO元数据
4. 检查移动端友好性

---

**最后更新：2025-11-03**
**版本：1.0**
**维护者：开发团队**

> 💡 **重要提醒：** 每次添加新页面或修改路由后，必须运行SEO检查脚本确保没有404错误！