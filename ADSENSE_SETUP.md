# Google AdSense Setup - Complete ✅

## ✅ AdSense ID: `ca-pub-9555345854497895`

### Files Updated:

1. **index.html**
   - ✅ Added AdSense script in `<head>`
   - ✅ Added meta tag for account verification

2. **src/App.tsx**
   - ✅ Top banner ad placement
   - ✅ Bottom banner ad placement
   - ✅ Both using auto format (responsive)

3. **public/ads.txt**
   - ✅ Created with correct snippet
   - Will be served at: `https://linkedin.tools.supernal.ai/ads.txt`

## Ad Placements

### Top Banner
- Location: Below header, above main content
- Format: Auto (responsive)
- Client ID: ca-pub-9555345854497895

### Bottom Banner
- Location: After examples, before footer
- Format: Auto (responsive)
- Client ID: ca-pub-9555345854497895

## Verification Steps

After deployment to `linkedin.tools.supernal.ai`:

1. **Verify ads.txt**: Visit `https://linkedin.tools.supernal.ai/ads.txt`
   - Should show: `google.com, pub-9555345854497895, DIRECT, f08c47fec0942fa0`

2. **Verify meta tag**: View page source
   - Should contain: `<meta name="google-adsense-account" content="ca-pub-9555345854497895">`

3. **Test ads**: Visit the site
   - Ads may show placeholder or test ads initially
   - Full ads appear after Google approves the site (can take 24-48 hours)

## Next Steps

1. Deploy to Vercel:
   ```bash
   cd families/supernal-social/apps/linkedin-formatter-web
   pnpm build
   vercel --prod
   ```

2. Add domain: `linkedin.tools.supernal.ai` in Vercel dashboard

3. Wait for Google AdSense review (usually 24-48 hours)

4. Monitor in Google AdSense dashboard

## Testing

Ads won't show immediately because:
- Site needs to be live and accessible
- Google needs to crawl and approve the site
- May show test/blank ads during review

## Revenue Tracking

Monitor in Google AdSense dashboard:
- Impressions
- Clicks
- CTR (Click-through rate)
- Estimated earnings

## Notes

- Used auto format (no specific ad slots needed)
- Responsive ads adapt to screen size
- ads.txt helps prevent ad fraud
- Meta tag verifies site ownership

