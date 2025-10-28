# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Lumin AI** - An AI-powered age guesser that provides positive "Vibe Tags" instead of just numbers. Built with React, TypeScript, and Azure Face API, deployed on Vercel.

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (custom colors: `terracotta` #D97706, `brand-dark` #1F2937)
- **Fonts**: Google Fonts (Noto Sans, Playfair Display)
- **Icons**: Font Awesome 6
- **Backend**: Vercel Serverless Functions
- **AI Service**: Azure Face API
- **Image Handling**: react-dropzone, browser-image-compression
- **Routing**: React Router DOM

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
howolddoilook/
├── api/
│   └── analyze.ts              # Vercel Serverless Function for Azure Face API
├── src/
│   ├── components/             # Reusable React components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Hero.tsx            # Hero section with upload widget
│   │   ├── ImageUpload.tsx     # Image upload component (drag & drop)
│   │   ├── AnalysisResult.tsx  # Result display component
│   │   ├── Privacy.tsx         # Privacy section
│   │   ├── Features.tsx        # Features section
│   │   ├── Testimonials.tsx    # User testimonials
│   │   ├── HowItWorks.tsx      # 3-step process
│   │   ├── CaseStudies.tsx     # Example results
│   │   ├── Articles.tsx        # Article links
│   │   ├── FAQ.tsx             # FAQ section
│   │   ├── CTA.tsx             # Call to action
│   │   └── Footer.tsx          # Footer
│   ├── pages/
│   │   ├── Home.tsx            # Main landing page
│   │   ├── SkincareArticle.tsx # Skincare article
│   │   ├── NutritionArticle.tsx # Nutrition article
│   │   └── MindfulnessArticle.tsx # Mindfulness article
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles with Tailwind
├── backup/                     # Original HTML files
├── public/                     # Static assets
├── vercel.json                 # Vercel configuration
└── tailwind.config.js          # Tailwind custom configuration
```

## Key Architecture Decisions

### 1. State Management
Uses React hooks (`useState`) for component-level state. No Redux/Zustand needed for MVP.

**AppState Enum** (`src/types/index.ts:35`):
- `IDLE`: Initial state, show upload interface
- `UPLOADING`: (Reserved for future use)
- `ANALYZING`: Show loading spinner
- `RESULT`: Display analysis results
- `ERROR`: Show error message

### 2. Image Processing Flow
1. User uploads image via drag & drop or file selector
2. Client-side validation (format: JPG/PNG, size: <10MB)
3. Image compression using `browser-image-compression` (max 1MB, 1920px)
4. Send to `/api/analyze` endpoint
5. Serverless function calls Azure Face API
6. Generate Vibe Tag based on age + emotional attributes
7. Return results and delete temporary file
8. Display results in `AnalysisResult` component

### 3. Vibe Tag Generation Logic
Located in `api/analyze.ts:259-324` (the `generateVibeTag` function)

**Algorithm**:
- **Age Groups**: young (<30), mid (30-50), mature (50+)
- **Mood Groups**: happy (smile >0.7), calm (0.3-0.7), neutral (<0.3)
- **Selection**: Random tag from curated list per group

**Examples**:
- Young + Happy → "Radiant Optimist", "Sunshine Spirit", "Collagen Millionaire"
- Mid + Calm → "Poised Leader", "Elegant Mind"
- Mature + Happy → "Radiant Sage", "Ageless Joy"

### 4. Privacy Implementation
- **No photo storage**: Images processed in-memory only
- **Immediate deletion**: Temporary files deleted in `finally` block (`api/analyze.ts:202-208`)
- **No tracking**: No analytics on user images
- **HTTPS only**: Enforced by Vercel

### 5. Error Handling
Comprehensive error handling in `api/analyze.ts:169-214`:
- No face detected → User-friendly message to try clearer photo
- Multiple faces → Prompt for single-person photo
- Azure API rate limiting (429) → Ask to retry later
- Azure auth errors (401/403) → Generic "service unavailable" message
- Network errors → Generic retry message

## Environment Variables

Required for deployment:

```bash
AZURE_FACE_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
AZURE_FACE_API_KEY=your_32_character_api_key
```

**Setup Azure Face API**:
1. Go to https://portal.azure.com
2. Create Face API resource (select **Free F0** tier - 30k calls/month)
3. Copy **Endpoint** and **Key 1**
4. Add to Vercel environment variables

## Tailwind Custom Configuration

`tailwind.config.js:8-11`:
```javascript
colors: {
  'terracotta': '#D97706',     // Primary brand color
  'brand-dark': '#1F2937',     // Dark text/backgrounds
}
```

`tailwind.config.js:13-16`:
```javascript
fontFamily: {
  sans: ['Noto Sans', 'sans-serif'],
  'serif-display': ['Playfair Display', 'serif'],
}
```

## Common Development Tasks

### Adding a New Vibe Tag
Edit `api/analyze.ts:264-321` to add tags to appropriate age/mood group.

### Modifying UI Components
All components follow the original HTML design strictly. Maintain:
- Same section order
- Same text content
- Same image URLs
- Same Tailwind classes

### Testing API Locally
1. Create `.env` file with Azure credentials
2. Run `npm run dev`
3. Upload test image at http://localhost:5173
4. Check Network tab for `/api/analyze` request/response

### Debugging Azure API Issues
Check logs in Vercel dashboard or run locally:
- 429: Rate limit exceeded (30k/month on free tier)
- 401/403: Invalid API key or endpoint
- 400: Invalid image format or no face detected

## Deployment to Vercel

1. Push code to GitHub
2. Import repository on https://vercel.com
3. Add environment variables (Azure endpoint + API key)
4. Deploy automatically on push to `main` branch

**Important**: Never commit `.env` file or expose API keys!

## Code Style & Conventions

- **Components**: PascalCase (e.g., `ImageUpload.tsx`)
- **Functions**: camelCase (e.g., `generateVibeTag`)
- **TypeScript**: Strict mode enabled, no `any` types (except error handling)
- **Imports**: Absolute imports for `src/*`, relative for local files
- **CSS**: Tailwind utility classes only, no custom CSS except `index.css`

## Performance Considerations

- **Image compression**: Client-side compression reduces upload time
- **Lazy loading**: Not implemented (MVP is single-page app)
- **Code splitting**: Vite handles automatically
- **API timeout**: 15 seconds for Azure Face API calls

## Known Limitations (MVP)

- No user authentication
- No photo history/saved results
- No camera capture (planned for Phase 2)
- No rate limiting on client side
- No analytics/tracking
- No database (stateless)

## Future Enhancements

1. Add webcam capture functionality (`react-webcam`)
2. Implement social sharing with OpenGraph images
3. Add user accounts and history
4. A/B test different Vibe Tag sets
5. Multi-language support
6. Dark mode theme

## Troubleshooting

### "No face detected" errors
- Ensure photo has clear, frontal face
- Check lighting (not too dark/bright)
- Verify face is not obscured (no sunglasses, masks)

### Build errors
- Run `npm install` to ensure all dependencies installed
- Check TypeScript errors: `npm run lint`
- Verify Node version >= 18

### API not working locally
- Confirm `.env` file exists in root directory
- Verify Azure API key is valid (test in Azure Portal)
- Check API endpoint URL format (must end with `/`)

## Support

For issues or questions:
- Check `开发计划.md` for detailed development roadmap
- Review `../README.md` for setup instructions
- Open GitHub issue for bugs/feature requests
