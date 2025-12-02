#!/bin/bash
set -e

echo "🚀 Creating linkedin-formatter-web as separate repository..."
echo ""

# Navigate to the web app directory
cd /Users/ianderrington/git/supernal-nova/families/supernal-social/apps/linkedin-formatter-web

echo "📦 Step 1: Initialize git repository"
git init

echo ""
echo "📝 Step 2: Add all files (including vercel.json for auto-deploy)"
git add .

echo ""
echo "💾 Step 3: Initial commit"
git commit -m "Initial commit: LinkedIn Formatter web app (ad-supported)

- Vite + React app
- Google AdSense integration (ca-pub-9555345854497895)
- Automatic URL attribution for tracking
- Links to NPM package and public GitHub repo
- Modern purple gradient design
- Mobile responsive
- vercel.json for auto-deployment"

echo ""
echo "🌐 Step 4: Create GitHub repository"
gh repo create supernalintelligence/linkedin-formatter-web \
  --public \
  --source=. \
  --remote=origin \
  --description="Ad-supported web app for LinkedIn Formatter - Convert Markdown to LinkedIn text" \
  --homepage="https://linkedin.tools.supernal.ai"

echo ""
echo "⬆️  Step 5: Push to GitHub"
git push -u origin main

echo ""
echo "✅ Done! Repository created at:"
echo "   https://github.com/supernalintelligence/linkedin-formatter-web"
echo ""
echo "🔗 Next: Connect to Vercel (will auto-deploy on push)"
echo "   1. Go to https://vercel.com/new"
echo "   2. Import: supernalintelligence/linkedin-formatter-web"
echo "   3. Vercel will detect vercel.json automatically"
echo "   4. Set custom domain: linkedin.tools.supernal.ai"
echo "   5. Every push to main = automatic deployment! 🚀"

