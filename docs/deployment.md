# JANSETU AI — Deployment & Local Setup Guide

## Local Development

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/deadsec7869/JANSETU-AI.git
cd JANSETU-AI

# 2. Install dependencies
npm install

# 3. (Optional) Configure Gemini API Key
cp .env.example .env
# Edit .env and set VITE_GEMINI_API_KEY="your_api_key_here"

# 4. Start local development server
npm run dev

# App runs at: http://localhost:5173/
# Demo cockpit: http://localhost:5173/demo
```

---

## Production Build

```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Zero-Billing Offline Deployment

JANSETU AI is configured to deploy with zero billing requirements to any static hosting provider:
- **Vercel**: Deploy directly with `npm run build` (output: `dist/`)
- **Netlify**: Deploy static bundle with single-page app redirects configured in `public/_redirects` or `netlify.toml`
- **GitHub Pages**: Build and host static distribution

No serverless backend or paid database is required for full demonstration functionality.
