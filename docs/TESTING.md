# 测试指南

## ✅ Mock API 已启用！

项目现在包含了一个开发模式的 Mock API，让你可以在没有真实后端的情况下测试完整的前端功能。

---

## 🚀 如何测试

### 1. 启动开发服务器（如果未启动）

```bash
npm run dev
```

### 2. 打开浏览器

访问：http://localhost:5173

### 3. 测试完整流程

1. **上传图片**
   - 点击上传区域选择图片
   - 或者直接拖拽图片到上传区域
   - 支持 JPG 和 PNG 格式

2. **点击 "Analyze My Photo"**
   - 你会看到 "Analyzing your glow..." 加载动画（2秒）

3. **查看结果**
   - 显示随机生成的年龄（25-44岁）
   - 显示随机的 Vibe Tag（如 "Radiant Optimist", "Golden Hour Glow"）
   - 显示你上传的图片

4. **再试一次**
   - 点击 "Analyze Another Photo" 按钮重新开始

### 4. 测试其他页面

- 点击页面上的文章链接：
  - Skincare Article（护肤文章）
  - Nutrition Article（营养文章）
  - Mindfulness Article（正念文章）

- 测试导航：
  - 点击 "Back to Home" 返回主页
  - 点击顶部的 "Lumin AI" logo 也能返回主页

---

## 📊 Mock API 工作原理

### 自动降级策略

代码会自动检测：
1. 首先尝试调用真实的 `/api/analyze` 端点
2. 如果 API 不可用（404 或网络错误）**且在开发模式**：
   - ✅ 自动切换到 Mock 模式
   - ✅ 在控制台显示警告：`⚠️ API not available, using mock data`
   - ✅ 返回模拟的分析结果

### Mock 数据包括：
- **年龄**: 25-44 之间的随机数
- **性别**: 随机 male 或 female
- **Vibe Tag**: 从8个预设标签中随机选择
- **微笑值**: 0.3-0.8 之间的随机值

### 控制台输出

打开浏览器开发者工具（F12），你会看到：
```
⚠️ API not available, using mock data for development
📊 Mock analysis result: { success: true, data: {...} }
```

---

## 🔄 如何切换到真实 API

### 方法 1：使用 Vercel CLI（推荐）

```bash
# 1. 停止当前的 npm run dev（Ctrl+C 或 Cmd+C）

# 2. 安装 Vercel CLI
npm install -g vercel

# 3. 使用 Vercel CLI 启动
vercel dev

# 4. 访问 http://localhost:3000
```

Vercel CLI 会：
- ✅ 自动运行前端
- ✅ 自动运行 API Functions
- ✅ 读取 `.env` 文件
- ✅ 模拟生产环境

### 方法 2：直接部署到 Vercel

```bash
# 1. 推送代码到 GitHub
git add .
git commit -m "Add Lumin AI project"
git push

# 2. 在 Vercel 导入项目
# 访问 https://vercel.com

# 3. 添加环境变量（Azure 凭证）
# 在 Vercel Dashboard → Settings → Environment Variables

# 4. 部署！
```

---

## ⚠️ 重要提示

### Mock API 仅在开发模式启用

- ✅ **开发环境** (`npm run dev`): Mock API 自动启用
- ❌ **生产环境** (`npm run build`): Mock API 不会运行，必须使用真实 API

### 部署前记得测试真实 API

在部署到 Vercel 之前，请确保：
1. Azure Face API 已配置（或切换到 Amazon Rekognition）
2. 环境变量已正确设置
3. 使用 `vercel dev` 本地测试过真实 API

---

## 🐛 故障排查

### 问题：Mock API 没有触发

**原因**: 可能浏览器缓存了旧代码

**解决方案**:
```bash
# 重启开发服务器
# 按 Ctrl+C 停止
npm run dev

# 刷新浏览器（Ctrl+Shift+R 或 Cmd+Shift+R）
```

### 问题：看到真实的 404 错误

**原因**: API 端点不存在，但 Mock 没有捕获到错误

**解决方案**:
1. 打开浏览器控制台（F12）
2. 查看 Network 标签
3. 检查 `/api/analyze` 请求的状态码
4. 如果不是 404，可能需要调整 Mock 检测逻辑

### 问题：图片上传后没有反应

**原因**: 可能图片太大或格式不支持

**解决方案**:
1. 确保图片格式是 JPG 或 PNG
2. 确保图片小于 10MB
3. 打开控制台查看详细错误信息

---

## 📱 测试清单

在认为前端完成前，请测试以下所有功能：

### 主页 (/)
- [ ] 拖拽上传图片
- [ ] 点击上传图片
- [ ] 图片预览显示
- [ ] "Analyze My Photo" 按钮
- [ ] 加载动画显示
- [ ] 结果正确显示（年龄 + Vibe Tag + 图片）
- [ ] "Analyze Another Photo" 重置功能
- [ ] 所有导航链接可点击
- [ ] 响应式布局（缩放浏览器窗口）

### 文章页面
- [ ] Skincare 文章页面加载
- [ ] Nutrition 文章页面加载
- [ ] Mindfulness 文章页面加载
- [ ] "Back to Home" 链接工作
- [ ] 文章内容完整显示
- [ ] 响应式布局

### 错误处理
- [ ] 不选择图片就点击 "Analyze" 显示错误
- [ ] 上传超大文件显示错误（可选测试）
- [ ] 上传错误格式显示错误（可选测试）

---

## 🎉 测试完成后

如果所有功能正常，你就可以：

1. **提交代码**
   ```bash
   git add .
   git commit -m "Complete Lumin AI MVP with mock API"
   git push
   ```

2. **部署到 Vercel**
   - 记得配置 Azure API 或 Amazon Rekognition
   - 添加环境变量
   - 部署后测试真实功能

3. **移除 Mock API（可选）**
   - 如果你确定真实 API 工作正常
   - 可以从 `ImageUpload.tsx` 中删除 Mock 代码
   - 但保留也没问题，生产环境不会使用它

---

## 💡 提示

Mock API 是一个很好的开发工具：
- ✅ 快速迭代前端 UI
- ✅ 无需等待后端 API 完成
- ✅ 离线开发
- ✅ 演示和展示项目

但最终部署时，确保切换到真实的 AI API！

---

祝测试愉快！🚀
