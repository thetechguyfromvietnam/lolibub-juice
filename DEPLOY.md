# Deploy to GitHub and Vercel

## Step 1: Push to GitHub

### Option A: Using GitHub Desktop (Easiest)
1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. File → Add Local Repository
4. Select: `/Users/anhmai/Desktop/Full Stack Dev/lolibub-juice`
5. Click "Publish repository"
6. ✅ Code will be pushed to GitHub

### Option B: Using Terminal with Personal Access Token
1. Create a Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "lolibub-juice"
   - Check "repo" checkbox
   - Click "Generate token"
   - Copy the token (you won't see it again!)

2. Push to GitHub:
   ```bash
   git push origin main
   ```
   - Username: `thetechguyfromvietnam`
   - Password: (paste the Personal Access Token)

## Step 2: Deploy to Vercel

Once code is on GitHub:

1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import: `thetechguyfromvietnam/lolibub-juice`
5. Click "Deploy" (Vercel auto-detects React settings)
6. ✅ Your site will be live in 2-3 minutes!

## Your Juice Ordering Website Features:
- ✅ Payment verification with QR code
- ✅ Mobile responsive design
- ✅ WhatsApp integration for orders
- ✅ Customer info collection
- ✅ Beautiful detox green theme
- ✅ Complete menu with categories

## Repository:
https://github.com/thetechguyfromvietnam/lolibub-juice

