# AWS Rekognition Setup Guide

This guide will help you set up Amazon Rekognition for the "How Old Do I Look" application.

---

## Why Amazon Rekognition?

✅ **Fully supports age detection** (unlike Azure Face API which deprecated this feature)
✅ **Reliable and accurate** - powered by AWS AI/ML
✅ **Easy to integrate** - simple REST API
✅ **Free tier available** - 5,000 images/month for the first 12 months

---

## Step 1: Create an AWS Account

If you don't have an AWS account:

1. Go to https://aws.amazon.com/
2. Click **"Create an AWS Account"**
3. Follow the sign-up process
4. **Important**: You'll need a credit card, but the free tier covers testing

---

## Step 2: Create an IAM User

For security, we'll create a dedicated IAM user instead of using root credentials.

1. **Go to IAM Console**
   - Visit: https://console.aws.amazon.com/iam/
   - Or search "IAM" in the AWS Console search bar

2. **Create a new user**
   - Click **"Users"** in the left sidebar
   - Click **"Add users"** button
   - Enter a username (e.g., `lumin-ai-rekognition`)
   - Click **"Next"**

3. **Set permissions**
   - Select **"Attach policies directly"**
   - Search for **"AmazonRekognitionFullAccess"**
   - Check the box next to it
   - Click **"Next"**
   - Click **"Create user"**

4. **Create access keys**
   - Click on your newly created user
   - Go to **"Security credentials"** tab
   - Scroll down to **"Access keys"** section
   - Click **"Create access key"**
   - Select **"Application running outside AWS"**
   - Click **"Next"**
   - (Optional) Add a description tag
   - Click **"Create access key"**

5. **Save your credentials** ⚠️
   - You'll see:
     - **Access key ID** (like: AKIAIOSFODNN7EXAMPLE)
     - **Secret access key** (like: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY)
   - **IMPORTANT**: This is the ONLY time you'll see the secret key!
   - Click **"Download .csv file"** to save them
   - Click **"Done"**

---

## Step 3: Configure Environment Variables

1. **Open your `.env` file** in the project root

2. **Add your AWS credentials**:
   ```bash
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
   AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   ```

3. **Replace the values** with your actual credentials from Step 2

4. **Choose your region** (optional):
   - Default: `us-east-1` (US East, Virginia)
   - Other options: `us-west-2`, `eu-west-1`, `ap-southeast-1`, etc.
   - See full list: https://docs.aws.amazon.com/general/latest/gr/rekognition.html

---

## Step 4: Test the Setup

Run the test script to verify your AWS configuration:

```bash
node test-rekognition.cjs
```

### Expected Output (Success):

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
  "$metadata": { ... },
  "FaceDetails": [
    {
      "AgeRange": { "Low": 25, "High": 32 },
      "Gender": { "Value": "Female", "Confidence": 99.8 },
      ...
    }
  ]
}

--- Face Detection Results ---
Age Range: { Low: 25, High: 32 }
Estimated Age: 29
Gender: { Value: 'Female', Confidence: 99.8 }
Smile: { Value: true, Confidence: 87.5 }
...
```

---

## Step 5: Test with Vercel CLI

Now test the full application with Vercel CLI:

```bash
# Option 1: If you installed Vercel CLI globally
vercel dev

# Option 2: If using npx
npx vercel dev
```

This will:
- Start the frontend on http://localhost:3000
- Run the Serverless Function locally
- Use your AWS credentials from `.env`

Visit http://localhost:3000 and test uploading a photo!

---

## Troubleshooting

### Error: UnrecognizedClientException

**Problem**: AWS credentials are invalid

**Solutions**:
1. Double-check `AWS_ACCESS_KEY_ID` in `.env`
2. Double-check `AWS_SECRET_ACCESS_KEY` in `.env`
3. Make sure there are no extra spaces or quotes
4. Make sure you didn't accidentally swap the two values

### Error: AccessDeniedException

**Problem**: IAM user doesn't have permission

**Solutions**:
1. Go to IAM Console → Users → Your user
2. Click **"Add permissions"**
3. Select **"Attach policies directly"**
4. Search for **"AmazonRekognitionFullAccess"**
5. Check the box and click **"Add permissions"**

### Error: InvalidParameterException

**Problem**: Image is corrupted or wrong format

**Solutions**:
1. Use JPG or PNG format only
2. Make sure image is under 10MB
3. Try a different image

### Error: Region not available

**Problem**: Rekognition is not available in your selected region

**Solutions**:
1. Change `AWS_REGION` to `us-east-1` in `.env`
2. See supported regions: https://docs.aws.amazon.com/general/latest/gr/rekognition.html

### Test script shows success, but Vercel dev still fails

**Problem**: Environment variables not loaded in Vercel

**Solutions**:
1. Make sure `.env` file exists in project root
2. Restart Vercel CLI: Stop it (Ctrl+C) and run `vercel dev` again
3. Check Vercel logs for any error messages

---

## Cost Estimate

### Free Tier (First 12 months)
- **5,000 images per month** - FREE
- Perfect for testing and small-scale usage

### After Free Tier
- **First 1 million images/month**: $1.00 per 1,000 images
- **Next 9 million images/month**: $0.80 per 1,000 images
- **Over 10 million images/month**: $0.60 per 1,000 images

**Example**: 10,000 users per month = ~$10

### Tips to Minimize Cost
1. Use image compression (already implemented)
2. Implement rate limiting (consider for production)
3. Cache results if same user uploads same photo
4. Monitor usage in AWS Cost Explorer

---

## Security Best Practices

### ✅ DO:
- Use IAM users (not root account)
- Give minimum required permissions
- Rotate access keys regularly
- Use `.env` files (never commit to Git)
- Add `.env` to `.gitignore`

### ❌ DON'T:
- Don't commit `.env` to Git
- Don't share your secret access key
- Don't use root account credentials
- Don't give more permissions than needed

---

## Deployment to Vercel

When deploying to Vercel:

1. **Push code to GitHub** (make sure `.env` is NOT pushed)

2. **Import project to Vercel**
   - Go to https://vercel.com
   - Click **"Import Project"**
   - Select your GitHub repo

3. **Add environment variables in Vercel**
   - Go to your project in Vercel Dashboard
   - Click **"Settings"** → **"Environment Variables"**
   - Add:
     ```
     AWS_REGION = us-east-1
     AWS_ACCESS_KEY_ID = AKIAIOSFODNN7EXAMPLE
     AWS_SECRET_ACCESS_KEY = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
     ```
   - Select **"Production"**, **"Preview"**, and **"Development"**
   - Click **"Save"**

4. **Redeploy** (if already deployed)
   - Go to **"Deployments"**
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**

---

## Additional Resources

- **AWS Rekognition Documentation**: https://docs.aws.amazon.com/rekognition/
- **DetectFaces API Reference**: https://docs.aws.amazon.com/rekognition/latest/APIReference/API_DetectFaces.html
- **IAM User Guide**: https://docs.aws.amazon.com/IAM/latest/UserGuide/
- **AWS Free Tier**: https://aws.amazon.com/free/

---

## Need Help?

If you encounter issues:

1. Run the test script: `node test-rekognition.cjs`
2. Check the error message and follow troubleshooting steps above
3. Verify your `.env` file format matches the template
4. Make sure IAM permissions are correct

Happy testing! 🚀
