# 社交媒体预览图制作指南

## 📐 图片规格

创建一张用于 Facebook、Twitter、LinkedIn 分享预览的图片:

### 必需规格
- **尺寸**: 1200 x 630 像素
- **格式**: JPG 或 PNG
- **文件名**: `og-image.jpg`
- **位置**: 放在 `/public/og-image.jpg`
- **大小**: 建议小于 1MB

### 设计建议

#### 布局方案 1: 简洁型
```
┌─────────────────────────────────────────┐
│                                         │
│           [应用截图或 Logo]              │
│                                         │
│      How Old Do I Look?                 │
│      AI Age Guesser & Vibe Analyzer     │
│                                         │
│      ✨ Free • Instant • Fun            │
│                                         │
└─────────────────────────────────────────┘
```

#### 布局方案 2: 展示型
```
┌─────────────────────────────────────────┐
│  [左侧: 应用界面截图]  │  [右侧:]     │
│                        │               │
│   [上传照片界面]       │  Discover     │
│                        │  Your Age &   │
│   [结果展示界面]       │  Vibe Tag     │
│                        │               │
│                        │  howolddoilook.art │
└─────────────────────────────────────────┘
```

#### 布局方案 3: 渐变背景
```
┌─────────────────────────────────────────┐
│  [渐变背景: #D97706 → #1F2937]          │
│                                         │
│    🎭 How Old Do I Look?                │
│                                         │
│    Upload your photo and discover:      │
│    • Your estimated age                 │
│    • Your unique Vibe Tag               │
│    • Positive, fun analysis             │
│                                         │
│    howolddoilook.art                    │
└─────────────────────────────────────────┘
```

## 🎨 设计元素

### 品牌色彩
- **主色**: #D97706 (Terracotta/琥珀色)
- **深色**: #1F2937 (深灰色)
- **浅色**: #F3F4F6 (浅灰色)

### 字体
- **标题**: Playfair Display (粗体)
- **正文**: Noto Sans

### 必须包含
1. ✅ 应用名称: "How Old Do I Look?" 或 Logo
2. ✅ 核心价值: "AI Age Guesser" 或 "Vibe Analyzer"
3. ✅ 域名: "howolddoilook.art" (小字)
4. ✅ 视觉元素: 应用截图、图标或插图

### 避免
- ❌ 文字太小(最小 30px)
- ❌ 颜色对比度不足
- ❌ 信息过载
- ❌ 真人照片(隐私问题)

## 🛠️ 制作工具

### 在线工具(免费)
1. **Canva**: https://www.canva.com/
   - 模板: 搜索 "Facebook Post" 或 "Open Graph"
   - 尺寸: 自定义 1200x630

2. **Figma**: https://www.figma.com/
   - 创建 1200x630 画布
   - 导出为 JPG/PNG

3. **Adobe Express**: https://www.adobe.com/express/
   - 免费模板
   - 快速制作

### 设计软件
- Photoshop
- Sketch
- Affinity Designer

## 📝 制作步骤

### 快速方案(使用 Canva)

1. **访问 Canva**: https://www.canva.com/
2. **创建设计**:
   - 点击 "Create a design"
   - 选择 "Custom size"
   - 输入 1200 x 630 像素
3. **添加背景**:
   - 使用渐变: #D97706 → #1F2937
   - 或纯色背景
4. **添加文字**:
   - 标题: "How Old Do I Look?"
   - 副标题: "AI Age Guesser & Vibe Analyzer"
   - 小字: "howolddoilook.art"
5. **添加元素**:
   - 应用截图(如果有)
   - 或使用图标/插图
6. **下载**:
   - 格式: JPG
   - 质量: 高
   - 文件名: `og-image.jpg`

### 使用截图方案

如果你已经有应用截图:

1. 在浏览器打开 http://localhost:5173/
2. 上传一张示例照片
3. 等待结果显示
4. 截图(Cmd+Shift+4 或 Windows+Shift+S)
5. 在 Canva 中:
   - 导入截图
   - 添加文字和品牌元素
   - 调整布局

## 🎯 完成后

1. **保存文件**:
   ```
   /public/og-image.jpg
   ```

2. **测试预览**:
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

3. **验证**:
   - 文件大小 < 1MB
   - 尺寸正确 1200x630
   - 清晰可读

## 📦 临时占位符

如果暂时没有时间制作,可以使用以下临时方案:

### 方案 1: 纯色 + 文字
创建一个简单的纯色背景图,添加应用名称。

### 方案 2: 使用生成工具
- https://www.opengraph.xyz/
- https://ogimage.xyz/

### 方案 3: AI 生成
使用 DALL-E, Midjourney 等 AI 工具生成。

## ✅ 检查清单

制作完成后,确认:

- [ ] 尺寸: 1200 x 630 像素
- [ ] 格式: JPG 或 PNG
- [ ] 文件名: `og-image.jpg`
- [ ] 位置: `/public/og-image.jpg`
- [ ] 文件大小 < 1MB
- [ ] 文字清晰可读
- [ ] 包含品牌元素
- [ ] 视觉吸引力强

---

**提示**: 部署后,使用 Facebook Sharing Debugger 测试:
https://developers.facebook.com/tools/debug/?q=https://howolddoilook.art/
