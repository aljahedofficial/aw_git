# Backend Deployment Guide

The backend API needs to be deployed to a public service for the GitHub Pages frontend to work.

## Option 1: Deploy to Render.com (Recommended - Free)

1. **Sign up** at [render.com](https://render.com)

2. **Connect your GitHub repository**:
   - Go to Dashboard → New → Web Service
   - Select "Deploy from Git"
   - Connect your GitHub account and select `aljahedofficial/aw_git`

3. **Configure the service**:
   - **Name**: `writing-defense-api`
   - **Region**: Choose closest to you (Oregon, Oregon)
   - **Branch**: `main`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && gunicorn --bind 0.0.0.0:5000 --timeout 120 app:app`
   - **Root Directory**: `.` (leave empty)

4. **Environment Variables** (if needed):
   - None required for basic setup

5. **Click Deploy** and wait for the service to build and start

6. **Get your API URL**: 
   - Once deployed, you'll see a URL like `https://writing-defense-api.onrender.com`
   - Copy this URL

7. **Update the frontend**:
   - Edit `.env.production`:
     ```
     VITE_API_URL=https://writing-defense-api.onrender.com
     ```
   - Run: `npm run deploy`
   - This will rebuild and push to GitHub Pages

---

## Option 2: Deploy to Railway.app

1. **Sign up** at [railway.app](https://railway.app)

2. **Deploy from GitHub**:
   - New Project → Deploy from GitHub repo
   - Select `aljahedofficial/aw_git`

3. **Configure**:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT app:app`

4. **Get your deployment URL** and update `.env.production`

---

## Option 3: Deploy to Vercel with Python Runtime

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Import your GitHub repo**

3. **Configure**:
   - Set `Root Directory` to `backend`
   - Vercel will auto-detect Flask

4. **Update `.env.production`** with your Vercel API URL

---

## Testing the Integration

After deploying the backend:

1. Update `.env.production`:
   ```
   VITE_API_URL=https://your-deployed-backend-url.com
   ```

2. Rebuild and deploy frontend:
   ```bash
   npm run deploy
   ```

3. Visit https://aljahedofficial.github.io/aw_git/ and test "Analyze for Colonization"

---

## Troubleshooting

If you get CORS errors:
- The backend already has CORS enabled in `app.py`
- Ensure your API URL is correct in `.env.production`

If the backend times out:
- Render's free tier has a 30-second timeout for requests
- The analysis can take longer than this for large documents
- Consider upgrading to a paid tier or optimizing the analysis engine

