# LinkedIn Formatter (Ad-Supported)

**URL:** `linkedin.tools.supernal.ai`

This is the ad-supported standalone version of the LinkedIn Formatter tool.

## Features

- ✅ Full LinkedIn formatting functionality
- 💰 Google AdSense integration (2 ad placements)
- 🏷️ "Powered by Supernal Intelligence" branding
- 🔗 Links to ad-free version on supernal.ai
- 📦 Uses `supernal-linkedin-formatter` NPM package

## Setup

### 1. Install Dependencies

```bash
cd families/supernal-social/apps/linkedin-formatter-web
pnpm install
```

### 2. Configure Google AdSense

Replace placeholder IDs in:
- `index.html`: Update `ca-pub-YOUR-PUBLISHER-ID`
- `src/App.tsx`: Update `ca-pub-YOUR-PUBLISHER-ID`, `TOP-SLOT-ID`, and `BOTTOM-SLOT-ID`

### 3. Local Development

```bash
pnpm dev
```

Visit: `http://localhost:3456`

### 4. Build

```bash
pnpm build
```

## Deployment to Vercel

### Option 1: Vercel CLI (with token)

```bash
cd families/supernal-social/apps/linkedin-formatter-web
VERCEL_TOKEN=your-token-here vercel --prod
```

### Option 2: GitHub Integration

1. Connect repo to Vercel
2. Set root directory: `families/supernal-social/apps/linkedin-formatter-web`
3. Framework: Vite
4. Build command: `pnpm build`
5. Output directory: `dist`

### Custom Domain Setup

1. In Vercel dashboard → Project Settings → Domains
2. Add domain: `linkedin.tools.supernal.ai`
3. Add DNS records (Vercel will provide):
   ```
   CNAME linkedin.tools.supernal.ai → cname.vercel-dns.com
   ```

## Architecture

```
linkedin.tools.supernal.ai (Ad-supported)
    ↓
Uses: supernal-linkedin-formatter@1.0.1 (NPM)
    ↓
Links to: supernal.ai/tools/linkedin-formatter (Ad-free)
```

## Revenue Model

- Google AdSense placements:
  - Top banner (below header)
  - Bottom banner (above footer)
  
## Tech Stack

- **Framework:** Vite + React
- **Package:** supernal-linkedin-formatter (our NPM package)
- **Hosting:** Vercel
- **Ads:** Google AdSense
- **Analytics:** (Can add Google Analytics)

## Differences from Ad-Free Version

| Feature | Ad-Supported | Ad-Free (supernal.ai) |
|---------|-------------|----------------------|
| Functionality | ✅ Same | ✅ Same |
| Ads | 💰 2 placements | ❌ None |
| Branding | "Powered by" | Full branding |
| Framework | Vite | Next.js |
| URL | linkedin.tools | supernal.ai/tools |

## Monetization

Replace `ca-pub-YOUR-PUBLISHER-ID` with your actual Google AdSense publisher ID to start earning revenue from this tool.

## License

Proprietary - Supernal Intelligence © 2024

Built with open-source [`supernal-linkedin-formatter`](https://npmjs.com/package/supernal-linkedin-formatter).
