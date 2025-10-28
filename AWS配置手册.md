# Amazon Rekognition 配置手册

本手册将帮助你完成 Amazon Rekognition 的完整配置,让 "How Old Do I Look" 应用能够正常工作。

---

## 📋 目录

1. [为什么选择 Amazon Rekognition](#为什么选择-amazon-rekognition)
2. [创建 AWS 账户](#步骤-1-创建-aws-账户)
3. [创建 IAM 用户](#步骤-2-创建-iam-用户)
4. [获取访问密钥](#步骤-3-获取访问密钥)
5. [配置环境变量](#步骤-4-配置环境变量)
6. [测试配置](#步骤-5-测试配置)
7. [常见问题](#常见问题)
8. [费用说明](#费用说明)

---

## 为什么选择 Amazon Rekognition?

我们最初使用 Azure Face API,但发现它已经**废弃了年龄检测功能**。因此切换到 Amazon Rekognition:

| 对比项 | Azure Face API | Amazon Rekognition |
|--------|----------------|-------------------|
| 年龄检测 | ❌ 已废弃 | ✅ 完全支持 |
| 性别检测 | ❌ 已废弃 | ✅ 完全支持 |
| 情绪分析 | ❌ 已废弃 | ✅ 支持 8 种情绪 |
| 免费额度 | 30,000 次/月 | 5,000 次/月(前 12 个月) |
| 定价 | $1/1000 次 | $1/1000 次 |
| 准确度 | 中等 | 高 |
| 可靠性 | 一般 | 99.99% 可用性 |

---

## 步骤 1: 创建 AWS 账户

### 1.1 访问 AWS 官网

打开浏览器,访问: https://aws.amazon.com/cn/

### 1.2 点击"创建 AWS 账户"

- 如果你已经有亚马逊账户(如 amazon.com 购物账户),可以使用相同的邮箱
- 如果没有,需要创建新账户

### 1.3 填写注册信息

需要提供:
- ✅ 邮箱地址
- ✅ 密码
- ✅ AWS 账户名称(可以随意填写,如 "Lumin AI Project")

### 1.4 提供联系信息

- 账户类型:**个人**或**公司**(选择个人即可)
- 全名
- 电话号码
- 国家/地区
- 地址

### 1.5 绑定支付方式

⚠️ **重要**: AWS 需要信用卡或借记卡来验证身份

- 不用担心!免费套餐期间不会扣费
- 只有超出免费额度才会收费
- 本项目测试用不会超出免费额度

支持的卡类型:
- Visa
- Mastercard
- American Express
- 银联(部分地区)

### 1.6 身份验证

AWS 会给你的手机发送验证码,输入即可。

### 1.7 选择支持计划

选择 **"基本支持 - 免费"** 即可。

### 1.8 完成注册

恭喜!你现在有了 AWS 账户 🎉

**注册后建议**:
1. 启用 MFA(多因素认证)增强安全性
2. 设置账单提醒(避免意外扣费)

---

## 步骤 2: 创建 IAM 用户

AWS 账户有两种访问方式:
- **Root 账户**: 拥有所有权限(不推荐日常使用)
- **IAM 用户**: 限定权限的子账户(**推荐使用**)

出于安全考虑,我们创建一个只有 Rekognition 权限的 IAM 用户。

### 2.1 登录 AWS 控制台

访问: https://console.aws.amazon.com/

### 2.2 打开 IAM 控制台

**方法 1**: 直接访问
- https://console.aws.amazon.com/iam/

**方法 2**: 通过搜索
1. 点击顶部搜索框
2. 输入 "IAM"
3. 点击 "IAM" 服务

### 2.3 创建新用户

1. 在左侧菜单,点击 **"用户"**(Users)
2. 点击右上角 **"添加用户"**(Add users) 按钮

### 2.4 配置用户详情

**用户名**: 输入一个好记的名字
- 例如: `lumin-ai-rekognition`
- 例如: `howolddoilook-user`
- 例如: `rekognition-api-user`

点击 **"下一步"**(Next)

### 2.5 设置权限

1. 选择 **"直接附加策略"**(Attach policies directly)
2. 在搜索框输入: `Rekognition`
3. 找到 **"AmazonRekognitionFullAccess"**
4. ✅ 勾选这个策略
5. 点击 **"下一步"**(Next)

**注意**: 如果你想更精细的权限控制,可以只授予 `rekognition:DetectFaces` 权限,但初期建议使用 FullAccess 方便调试。

### 2.6 审核并创建

1. 检查用户名和权限是否正确
2. 点击 **"创建用户"**(Create user)

✅ 用户创建成功!

---

## 步骤 3: 获取访问密钥

### 3.1 进入用户详情

1. 在 IAM 用户列表中,点击你刚创建的用户名
2. 进入用户详情页面

### 3.2 创建访问密钥

1. 点击 **"安全凭证"**(Security credentials) 标签
2. 向下滚动到 **"访问密钥"**(Access keys) 部分
3. 点击 **"创建访问密钥"**(Create access key)

### 3.3 选择使用场景

选择 **"应用程序在 AWS 外部运行"**(Application running outside AWS)

这是因为我们的应用部署在 Vercel 上,不在 AWS 内部。

点击 **"下一步"**

### 3.4 添加描述标签(可选)

可以添加一个描述,方便以后识别:
- 例如: "Lumin AI production"
- 例如: "Vercel deployment"

点击 **"创建访问密钥"**

### 3.5 保存访问密钥 ⚠️

**这是最关键的一步!**

你会看到两个值:

1. **访问密钥 ID** (Access key ID)
   - 格式: `AKIAIOSFODNN7EXAMPLE`
   - 20 个字符,以 `AKIA` 开头

2. **秘密访问密钥** (Secret access key)
   - 格式: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
   - 40 个字符,大小写字母+数字+符号

⚠️ **超级重要**:
- **秘密访问密钥只会显示一次!**
- 离开这个页面后就再也看不到了
- 如果没保存,只能删除重新创建

### 3.6 下载密钥

点击 **"下载 .csv 文件"** 按钮,保存到安全的地方。

CSV 文件内容示例:
```csv
Access key ID,Secret access key
AKIAIOSFODNN7EXAMPLE,wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### 3.7 妥善保管

✅ **推荐做法**:
- 将 CSV 文件保存到加密的密码管理器(如 1Password, LastPass)
- 不要上传到云盘
- 不要通过邮件或聊天软件发送
- 不要提交到 Git 仓库

❌ **禁止做法**:
- 不要分享给任何人
- 不要写在纸上
- 不要截图发到社交媒体
- 不要硬编码到代码中

点击 **"完成"**

---

## 步骤 4: 配置环境变量

### 4.1 打开 .env 文件

在项目根目录找到 `.env` 文件,如果没有则创建一个。

### 4.2 填写 AWS 凭证

将以下内容复制到 `.env` 文件中:

```bash
# AWS Rekognition 配置
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=你的访问密钥ID
AWS_SECRET_ACCESS_KEY=你的秘密访问密钥
```

### 4.3 替换为你的真实凭证

**示例**(使用你自己的真实值):

```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### 4.4 选择地区(可选)

默认使用 `us-east-1`(美国东部 - 弗吉尼亚),这是最推荐的地区。

如果你想选择其他地区:

| 地区代码 | 地理位置 | 延迟(中国) |
|---------|---------|-----------|
| `us-east-1` | 美国东部(弗吉尼亚) | ~200ms |
| `us-west-2` | 美国西部(俄勒冈) | ~180ms |
| `ap-southeast-1` | 亚太(新加坡) | ~50ms ⭐ |
| `ap-northeast-1` | 亚太(东京) | ~80ms |
| `eu-west-1` | 欧洲(爱尔兰) | ~250ms |

**如果你在中国**,建议使用 `ap-southeast-1`(新加坡)或 `ap-northeast-1`(东京)。

查看完整地区列表: https://docs.aws.amazon.com/general/latest/gr/rekognition.html

### 4.5 保存文件

按 `Ctrl + S` (Windows) 或 `Cmd + S` (Mac) 保存。

### 4.6 确认 .gitignore

⚠️ **安全检查**:

确保 `.gitignore` 文件中包含:
```
.env
.env.local
.env.production
```

这样你的密钥就不会被提交到 Git 仓库。

验证方法:
```bash
git status
```

如果 `.env` 文件出现在列表中,说明 `.gitignore` 没配置好!

---

## 步骤 5: 测试配置

### 5.1 安装依赖

如果还没安装依赖,运行:

```bash
npm install
```

### 5.2 运行测试脚本

我们提供了一个测试脚本来验证 AWS 配置:

```bash
node test-rekognition.cjs
```

### 5.3 期望的输出

**如果配置正确**,你会看到:

```
=== AWS Rekognition Configuration ===
Region: us-east-1
Access Key ID: AKIAIOSFOD...
Secret Key length: 40
====================================

Test: Using image from URL
Image URL: https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg
Image downloaded: 45231 bytes

Calling AWS Rekognition DetectFaces API...

✅ SUCCESS! AWS Rekognition is working!
Response: {
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "...",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "FaceDetails": [
    {
      "AgeRange": {
        "Low": 25,
        "High": 32
      },
      "Gender": {
        "Value": "Female",
        "Confidence": 99.8
      },
      "Smile": {
        "Value": true,
        "Confidence": 87.5
      },
      "Emotions": [
        {
          "Type": "HAPPY",
          "Confidence": 95.2
        }
      ]
    }
  ]
}

--- Face Detection Results ---
Age Range: { Low: 25, High: 32 }
Estimated Age: 29
Gender: { Value: 'Female', Confidence: 99.8 }
Smile: { Value: true, Confidence: 87.5 }
Emotions: [ { Type: 'HAPPY', Confidence: 95.2 } ]
```

✅ **看到这个输出说明配置成功!** 可以进入下一步。

### 5.4 使用 Vercel CLI 测试完整应用

#### 安装 Vercel CLI

```bash
sudo npm install -g vercel
```

输入你的电脑密码后回车。

#### 启动开发服务器

```bash
vercel dev
```

第一次运行会询问:
- Login to Vercel: 选择 "Continue with GitHub" 或其他方式登录
- Set up and develop: 选择当前目录
- Link to existing project: 选择 N(No)
- Project name: 直接回车使用默认名称
- Directory: 直接回车(使用当前目录)
- Override settings: 选择 N(No)

#### 测试应用

1. 打开浏览器访问: http://localhost:3000
2. 上传一张清晰的人脸照片
3. 点击 "Analyze My Photo"
4. 等待 2-3 秒
5. 查看结果:年龄 + Vibe Tag

✅ **如果能看到真实的年龄结果(不是随机的 25-44),说明 AWS Rekognition 工作正常!**

---

## 常见问题

### ❌ 错误 1: UnrecognizedClientException

**错误信息**:
```
UnrecognizedClientException: The security token included in the request is invalid.
```

**原因**: AWS 凭证无效

**解决方案**:
1. 检查 `.env` 文件中的 `AWS_ACCESS_KEY_ID` 是否正确
2. 检查 `.env` 文件中的 `AWS_SECRET_ACCESS_KEY` 是否正确
3. 确保没有多余的空格或引号
4. 确保复制时没有遗漏字符
5. 重新生成访问密钥并更新 `.env`

**正确格式**:
```bash
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**错误格式**:
```bash
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"  ❌ 多了引号
AWS_SECRET_ACCESS_KEY= wJalrXUtnFEMI...     ❌ 多了空格
```

---

### ❌ 错误 2: AccessDeniedException

**错误信息**:
```
AccessDeniedException: User is not authorized to perform: rekognition:DetectFaces
```

**原因**: IAM 用户没有 Rekognition 权限

**解决方案**:
1. 登录 AWS IAM 控制台: https://console.aws.amazon.com/iam/
2. 点击左侧 "用户"
3. 找到你创建的用户
4. 点击用户名进入详情
5. 点击 "权限" 标签
6. 点击 "添加权限" → "附加现有策略"
7. 搜索 "AmazonRekognitionFullAccess"
8. 勾选并点击 "添加权限"
9. 重新运行测试

---

### ❌ 错误 3: Region not available

**错误信息**:
```
InvalidClientTokenId: The security token included in the request is invalid.
```

或者超时无响应

**原因**: 所选地区可能不支持 Rekognition

**解决方案**:
1. 打开 `.env` 文件
2. 将 `AWS_REGION` 改为 `us-east-1`
3. 保存并重新测试

```bash
AWS_REGION=us-east-1
```

---

### ❌ 错误 4: Environment variables missing

**错误信息**:
```
❌ ERROR: Environment variables missing!
```

**原因**: `.env` 文件不存在或格式错误

**解决方案**:
1. 确保 `.env` 文件在项目根目录(与 `package.json` 同级)
2. 文件名必须是 `.env`,不是 `env.txt` 或 `.env.example`
3. 确保文件内容格式正确(见步骤 4)
4. 如果使用 Vercel CLI,确保重启了 `vercel dev`

---

### ❌ 错误 5: 测试脚本成功,但 Vercel dev 失败

**原因**: Vercel 没有读取到环境变量

**解决方案**:
1. 停止 `vercel dev`(按 Ctrl+C)
2. 确认 `.env` 文件存在且内容正确
3. 重新运行 `vercel dev`
4. 如果还不行,删除 `.vercel` 文件夹:
   ```bash
   rm -rf .vercel
   vercel dev
   ```

---

### ❌ 错误 6: npm run dev 显示 404

**这不是错误!**

**原因**: `npm run dev` 只运行前端,不运行 Serverless Function

**解决方案**:
- 使用 Mock API 测试前端界面(会显示随机年龄)
- 要测试真实 API,使用 `vercel dev` 而不是 `npm run dev`

---

### ❌ 错误 7: Rate limit exceeded

**错误信息**:
```
ProvisionedThroughputExceededException: Rate limit exceeded
```

**原因**: 请求太频繁

**解决方案**:
1. 等待几分钟后重试
2. 免费套餐有速率限制
3. 如果频繁遇到,考虑升级套餐或添加请求节流

---

### ❌ 错误 8: Invalid image format

**错误信息**:
```
InvalidImageFormatException: Invalid image format
```

**原因**: 图片格式不支持或已损坏

**解决方案**:
1. 确保使用 JPG 或 PNG 格式
2. 图片大小不超过 10MB
3. 确保图片没有损坏
4. 尝试使用其他图片

---

## 费用说明

### 免费套餐

**前 12 个月**:
- ✅ 每月 5,000 次免费分析
- ✅ 足够测试和小规模使用
- ✅ 超出后才开始计费

### 超出免费套餐后

| 每月使用量 | 单价(每 1000 次) |
|-----------|-----------------|
| 前 100 万次 | $1.00 |
| 100 万 - 1000 万次 | $0.80 |
| 超过 1000 万次 | $0.60 |

**费用示例**:
- 10,000 次分析 = $10
- 100,000 次分析 = $100
- 1,000,000 次分析 = $1,000

### 如何控制费用

1. **设置预算提醒**:
   - 进入 AWS Billing Dashboard
   - 设置 "Budget Alerts"
   - 当费用超过 $5/$10/$20 时收到邮件

2. **监控使用量**:
   - AWS Cost Explorer: https://console.aws.amazon.com/cost-management/
   - 查看每日/每月使用量

3. **实施速率限制**:
   - 在应用中限制每个用户的请求频率
   - 避免被恶意刷接口

4. **使用 Mock API**:
   - 开发和测试时使用 Mock API
   - 只在生产环境使用真实 API

### 停止计费

如果不再使用,删除 IAM 用户的访问密钥:
1. 进入 IAM → 用户 → 你的用户
2. 安全凭证 → 访问密钥
3. 点击 "停用" 或 "删除"

---

## 安全最佳实践

### ✅ 应该做的事

1. **使用 IAM 用户**,不要使用 Root 账户
2. **最小权限原则**:只给需要的权限
3. **定期轮换密钥**:每 90 天更换一次访问密钥
4. **启用 MFA**:为 Root 账户启用多因素认证
5. **监控使用**:定期检查 CloudTrail 日志
6. **使用环境变量**:永远不要硬编码密钥

### ❌ 禁止做的事

1. ❌ 不要将 `.env` 提交到 Git
2. ❌ 不要在前端代码中使用 AWS 凭证
3. ❌ 不要分享你的秘密访问密钥
4. ❌ 不要使用 Root 账户的访问密钥
5. ❌ 不要给予超过需要的权限
6. ❌ 不要忽略 AWS 的安全警告邮件

### 如果密钥泄露了怎么办?

**立即行动**:
1. 登录 AWS IAM 控制台
2. 停用泄露的访问密钥
3. 删除该访问密钥
4. 创建新的访问密钥
5. 更新 `.env` 文件和 Vercel 环境变量
6. 检查 AWS 账单,确认没有异常费用
7. 考虑联系 AWS 支持

---

## 下一步

配置完成后:

1. ✅ [测试本地开发] 运行 `vercel dev`
2. ✅ [部署到 Vercel] 参考 `DEPLOYMENT.md`
3. ✅ [配置域名] 绑定自定义域名(可选)
4. ✅ [监控使用] 设置 AWS 预算提醒

---

## 获取帮助

如果遇到问题:

1. **重新阅读本手册**,确保每一步都正确
2. **运行测试脚本**: `node test-rekognition.cjs`
3. **检查错误信息**,对照 "常见问题" 部分
4. **查看 AWS 文档**: https://docs.aws.amazon.com/rekognition/
5. **查看项目文档**: `README.md`, `DEPLOYMENT.md`

---

## 附录:相关链接

- **AWS 主页**: https://aws.amazon.com/cn/
- **IAM 控制台**: https://console.aws.amazon.com/iam/
- **Rekognition 文档**: https://docs.aws.amazon.com/rekognition/
- **Rekognition 定价**: https://aws.amazon.com/cn/rekognition/pricing/
- **AWS 免费套餐**: https://aws.amazon.com/cn/free/
- **费用管理**: https://console.aws.amazon.com/cost-management/

---

**祝你配置顺利!如有问题随时查阅本手册 📚**
