# Deployment Guide for Lumin AI

## Prerequisites

Before deploying, ensure you have:

1. ✅ AWS Account with Rekognition setup
2. ✅ Vercel account
3. ✅ GitHub repository (optional but recommended)

---

## Step 1: Setup AWS Rekognition

### Complete Setup Instructions

For detailed AWS setup instructions, see **[AWS_SETUP.md](./AWS_SETUP.md)**

### Quick Summary

1. **Create AWS Account**: Go to https://aws.amazon.com/
2. **Create IAM User**: Go to https://console.aws.amazon.com/iam/
   - Create user with **AmazonRekognitionFullAccess** permission
   - Create access keys
3. **Save Credentials**:
   - Access Key ID
   - Secret Access Key

**⚠️ IMPORTANT**: Keep these credentials secure! Never commit them to Git.

---

## Step 2: Test Locally (Optional but Recommended)

### 2.1 Create Environment File

In your project root, create `.env`:

```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
```

### 2.2 Test with Test Script

```bash
npm install
node test-rekognition.cjs
```

You should see:
```
✅ SUCCESS! AWS Rekognition is working!
```

### 2.3 Test with Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Run development server
vercel dev
```

1. Open http://localhost:3000
2. Upload a clear portrait photo
3. Click "Analyze My Photo"
4. Verify you get age estimate and Vibe Tag

If it works locally, you're ready to deploy!

---

## Step 3: Deploy to Vercel

### Option A: Deploy from GitHub (Recommended)

#### 3.1 Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/lumin-ai.git
git push -u origin main
```

**⚠️ Make sure `.env` is in `.gitignore`!**

#### 3.2 Import on Vercel

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your `lumin-ai` repository
5. Click **"Import"**

#### 3.3 Configure Build Settings

Vercel should auto-detect Vite. Verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 3.4 Add Environment Variables

Before clicking "Deploy", expand **"Environment Variables"**:

Add these three variables:

1. **Name**: `AWS_REGION`
   - **Value**: `us-east-1` (or your chosen region)
   - **Environments**: Production, Preview, Development

2. **Name**: `AWS_ACCESS_KEY_ID`
   - **Value**: Your AWS access key ID
   - **Environments**: Production, Preview, Development

3. **Name**: `AWS_SECRET_ACCESS_KEY`
   - **Value**: Your AWS secret access key
   - **Environments**: Production, Preview, Development

#### 3.5 Deploy!

Click **"Deploy"** and wait 2-3 minutes.

---

### Option B: Deploy via Vercel CLI

#### 3.1 Install Vercel CLI

```bash
npm install -g vercel
```

#### 3.2 Login

```bash
vercel login
```

#### 3.3 Deploy

```bash
vercel
```

Follow prompts:
- Link to existing project? **N**
- Project name? **lumin-ai**
- Directory? **.** (current directory)
- Override settings? **N**

#### 3.4 Add Environment Variables

```bash
vercel env add AWS_REGION
# Enter: us-east-1

vercel env add AWS_ACCESS_KEY_ID
# Paste your access key ID when prompted

vercel env add AWS_SECRET_ACCESS_KEY
# Paste your secret access key when prompted
```

#### 3.5 Redeploy with Environment Variables

```bash
vercel --prod
```

---

## Step 4: Verify Deployment

### 4.1 Check Deployment URL

Vercel will give you a URL like: `https://lumin-ai-abc123.vercel.app`

### 4.2 Test Live Site

1. Open your deployment URL
2. Upload a test photo
3. Verify age analysis works
4. Check all navigation links
5. Test article pages

### 4.3 Check Logs (If Issues Occur)

1. Go to Vercel dashboard
2. Click on your project
3. Go to **"Functions"** tab
4. Find `/api/analyze` function
5. Click to see logs

Common issues:
- **"Service configuration error"** → Environment variables not set correctly
- **"AWS authentication error"** → Invalid AWS credentials
- **"No face detected"** → Photo quality issue (not a deployment problem)

---

## Step 5: Custom Domain (Optional)

### 5.1 Buy a Domain

Purchase from:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### 5.2 Add to Vercel

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Enter your domain (e.g., `lumin-ai.com`)
4. Follow DNS configuration instructions

### 5.3 Configure DNS

Add these records to your domain provider:

**For root domain** (`lumin-ai.com`):
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain** (`www.lumin-ai.com`):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 5.4 Wait for Propagation

DNS changes take 5 minutes to 48 hours. Usually works within 1 hour.

---

## Step 6: Post-Deployment Monitoring

### 6.1 Monitor AWS Usage

1. Go to AWS Cost Explorer: https://console.aws.amazon.com/cost-management/
2. View your Rekognition usage
3. Set up billing alerts if approaching free tier limits

**Free Tier**: 5,000 images/month for first 12 months

### 6.2 Monitor Vercel Analytics

1. Go to Vercel dashboard
2. Click **"Analytics"** tab
3. View page views, load times, etc.

### 6.3 Set Up Error Alerts

Vercel will email you if:
- Deployments fail
- Functions timeout
- High error rates detected

---

## Troubleshooting Common Issues

### Issue: "AWS authentication error"

**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify all three variables are set:
   - `AWS_REGION`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
3. Make sure there are no extra spaces or quotes
4. Try regenerating AWS access keys if needed

### Issue: "Access Denied"

**Solution**:
1. Go to AWS IAM Console
2. Find your IAM user
3. Ensure it has **AmazonRekognitionFullAccess** permission attached
4. If not, click "Add permissions" → "Attach policies directly"

### Issue: "Function timeout"

**Solution**:
- Vercel free tier has 10-second timeout
- AWS Rekognition usually responds in 1-3 seconds
- If timing out, user's photo might be too large (already compressed in frontend)
- Check Vercel function logs for specific errors

### Issue: "Build fails on Vercel"

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure `package.json` has correct dependencies
3. Try building locally: `npm run build`
4. Fix any TypeScript errors

### Issue: "API works locally but not on Vercel"

**Solution**:
1. Verify environment variables are set in Vercel (not just in `.env`)
2. Check Vercel function logs for specific error messages
3. Ensure `vercel.json` is configured correctly
4. Try redeploying: `vercel --prod --force`

---

## Security Checklist

Before going live, verify:

- [ ] `.env` file is in `.gitignore`
- [ ] No AWS credentials committed to Git repository
- [ ] Environment variables set in Vercel dashboard
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] CORS headers configured in `api/analyze.ts`
- [ ] AWS IAM user has minimum required permissions only

---

## Performance Optimization

### Enable Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `src/main.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
```

### Enable Image Optimization

Vercel automatically optimizes images served from your domain.

---

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
git commit -am "Update dependencies"
git push
```

Vercel will auto-deploy on push to `main`.

### Monitor Costs

- **AWS Rekognition Free Tier**: 5,000 images/month for first 12 months
- **After Free Tier**: $1.00 per 1,000 images (first 1M/month)
- **Vercel Free Tier**: Unlimited bandwidth, 100 GB-hours compute
- **Domain**: $10-15/year if you bought one

### Backup Strategy

Your code is on GitHub (version controlled). No database, so no data to backup!

---

## Next Steps

1. ✅ Share your live URL on social media
2. ✅ Get user feedback
3. ✅ Monitor AWS usage (stay within free tier)
4. ✅ Consider adding Google Analytics
5. ✅ Plan for Phase 2 features (webcam capture, user accounts, etc.)

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **AWS Rekognition Docs**: https://docs.aws.amazon.com/rekognition/
- **AWS Setup Guide**: See `AWS_SETUP.md`
- **Project Issues**: GitHub Issues (if using GitHub)
- **This Project's Docs**: See `README.md` and `CLAUDE.md`

---

**Congratulations! Your Lumin AI app is now live! 🎉**
