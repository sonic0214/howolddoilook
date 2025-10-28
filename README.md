# Lumin AI - Age Guesser & Vibe Analyzer

An AI-powered web application that analyzes your photo to estimate your age and provides a positive, uplifting "Vibe Tag" that celebrates your unique energy.

## Features

- 📸 **Instant Age Analysis** - Upload or capture a photo for immediate AI analysis
- ✨ **Positive Vibe Tags** - Get an uplifting label like "Radiant Optimist" or "Golden Hour Glow"
- 🔒 **Privacy First** - Photos are never saved, analyzed in-memory only
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Beautiful UI** - Clean, modern interface with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **AI**: Amazon Rekognition
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- AWS Account (for Rekognition)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/lumin-ai.git
cd lumin-ai
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:
```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
```

### AWS Rekognition Setup

For detailed setup instructions, see [AWS_SETUP.md](./AWS_SETUP.md)

Quick steps:
1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Create a new IAM user with **AmazonRekognitionFullAccess** permission
3. Create access keys for the user
4. Copy your **Access Key ID** and **Secret Access Key**
5. Add them to your `.env` file

### Development

**Option 1: Frontend only (with Mock API)**
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

Note: This uses mock data for age analysis. To test with real AWS Rekognition, use Option 2.

**Option 2: Full stack with Vercel CLI (Recommended)**
```bash
vercel dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

This runs both the frontend and the Serverless Function locally with real AWS Rekognition.

### Building for Production

```bash
npm run build
npm run preview
```

## Deployment to Vercel

1. Push your code to GitHub

2. Import your repository on [Vercel](https://vercel.com)

3. Add environment variables in Vercel dashboard:
   - `AWS_REGION` (e.g., us-east-1)
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

4. Deploy!

## Project Structure

```
howolddoilook/
├── api/
│   └── analyze.ts              # Serverless API endpoint
├── src/
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   ├── types/                  # TypeScript types
│   └── App.tsx                 # Main app
├── public/                     # Static assets
├── index.html
├── vercel.json                 # Vercel configuration
└── package.json
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `AWS_REGION` | AWS region (e.g., us-east-1) | Yes |
| `AWS_ACCESS_KEY_ID` | Your AWS IAM access key ID | Yes |
| `AWS_SECRET_ACCESS_KEY` | Your AWS IAM secret access key | Yes |

## How It Works

1. **Upload**: User uploads a photo or captures one with webcam
2. **Compress**: Image is compressed client-side to optimize bandwidth
3. **Analyze**: Serverless function calls AWS Rekognition for age detection
4. **Generate**: Custom algorithm creates a positive "Vibe Tag" based on age and emotional attributes
5. **Display**: Results are shown in a beautiful card format
6. **Delete**: Temporary files are immediately deleted (privacy first!)

## Vibe Tag Algorithm

The Vibe Tag is generated based on:
- **Age Group**: young (<30), mid (30-50), mature (50+)
- **Mood**: happy (smile >0.7), calm (0.3-0.7), neutral (<0.3)
- **Random Selection**: From a curated list of positive labels

Examples:
- Young + Happy → "Radiant Optimist", "Sunshine Spirit"
- Mid + Calm → "Poised Leader", "Elegant Mind"
- Mature + Happy → "Radiant Sage", "Ageless Joy"

## Privacy & Security

- ✅ Photos are **never stored** on our servers
- ✅ Analysis happens in-memory only
- ✅ Temporary files are deleted immediately after processing
- ✅ No tracking or analytics on user images
- ✅ HTTPS encryption for all data transmission

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Amazon Rekognition](https://aws.amazon.com/rekognition/)
- Deployed on [Vercel](https://vercel.com)

## Support

For issues and questions, please open an issue on GitHub or contact us at support@lumin-ai.com.

---

Made with ❤️ by the Lumin AI Team
