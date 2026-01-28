# Deployment Guide - Writing Defense Platform

## Overview

This guide covers deploying the Writing Defense Platform to various environments.

## Prerequisites

- Node.js 18+ installed
- Git for version control
- Access to hosting service (Netlify, Vercel, or custom server)

## Build Process

### 1. Production Build

```bash
# Install dependencies (if not already done)
npm install

# Run production build
npm run build

# Output will be in dist/ directory
```

**Build Output**:
- `dist/index.html` - Main HTML file
- `dist/assets/` - JS, CSS, and other assets
- All files are minified and optimized

### 2. Preview Build Locally

```bash
npm run preview
# Opens at http://localhost:4173
```

## Deployment Options

### Option 1: Netlify (Recommended)

**Advantages**: 
- Free tier available
- Automatic HTTPS
- Continuous deployment from Git
- Easy rollbacks

**Steps**:

1. **Connect Repository**:
   ```bash
   # Push to GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/writing-defense-platform.git
   git push -u origin main
   ```

2. **Configure Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Build settings:
     ```
     Build command: npm run build
     Publish directory: dist
     ```
   - Click "Deploy site"

3. **Custom Domain** (Optional):
   - Site settings → Domain management
   - Add custom domain
   - Configure DNS records

4. **Environment Variables** (if needed):
   - Site settings → Build & deploy → Environment
   - Add variables (e.g., `VITE_API_URL`)

### Option 2: Vercel

**Advantages**:
- Excellent performance
- Edge network
- Automatic HTTPS

**Steps**:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   # Follow prompts
   ```

3. **Configure**:
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Production Deploy**:
   ```bash
   vercel --prod
   ```

### Option 3: GitHub Pages

**Advantages**:
- Free for public repos
- Simple setup

**Steps**:

1. **Update `vite.config.ts`**:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/writing-defense-platform/', // your repo name
   })
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to `package.json`**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Repo settings → Pages
   - Source: gh-pages branch
   - Save

### Option 4: Custom Server (Self-Hosted)

**Requirements**:
- Server with Node.js or static web server (Nginx, Apache)
- SSH access
- Domain name (optional)

#### Using Nginx

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload to server**:
   ```bash
   scp -r dist/* user@your-server:/var/www/writing-defense
   ```

3. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name writingdefense.yourdomain.com;
       
       root /var/www/writing-defense;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

4. **Enable HTTPS** (with Let's Encrypt):
   ```bash
   sudo certbot --nginx -d writingdefense.yourdomain.com
   ```

#### Using Apache

1. **Upload files** (same as Nginx)

2. **Configure Apache**:
   ```apache
   <VirtualHost *:80>
       ServerName writingdefense.yourdomain.com
       DocumentRoot /var/www/writing-defense
       
       <Directory /var/www/writing-defense>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       # Rewrite for SPA
       <IfModule mod_rewrite.c>
           RewriteEngine On
           RewriteBase /
           RewriteRule ^index\.html$ - [L]
           RewriteCond %{REQUEST_FILENAME} !-f
           RewriteCond %{REQUEST_FILENAME} !-d
           RewriteRule . /index.html [L]
       </IfModule>
   </VirtualHost>
   ```

## Environment Configuration

### Development
```env
# .env.development
VITE_APP_VERSION=1.0.0-dev
VITE_ENABLE_DEBUG=true
```

### Production
```env
# .env.production
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DEBUG=false
```

## Performance Optimization

### 1. Enable Compression

**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
```

**Apache**:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>
```

### 2. CDN Setup (Optional)

**CloudFlare**:
1. Add site to CloudFlare
2. Update DNS nameservers
3. Enable "Auto Minify" (JS, CSS, HTML)
4. Enable "Brotli compression"
5. Page Rules: Cache everything

### 3. Asset Optimization

**Pre-deployment checklist**:
- ✅ Images optimized (use WebP)
- ✅ JS/CSS minified (Vite does this)
- ✅ Source maps disabled in production
- ✅ Unused dependencies removed

## Monitoring & Analytics

### 1. Error Tracking (Optional)

**Sentry Integration**:
```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

### 2. Analytics (Optional)

**Plausible** (privacy-friendly):
```html
<!-- Add to index.html -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## Security Considerations

### 1. HTTPS

**Always use HTTPS** in production:
- Protects user data
- Required for modern browser features
- Improves SEO

### 2. Security Headers

**Nginx**:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;
```

### 3. Rate Limiting (if adding API)

**Nginx**:
```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
    limit_req zone=api burst=20;
}
```

## Backup & Recovery

### 1. Database Backup (Future)

If you add a backend:
```bash
# Automated daily backups
0 2 * * * /usr/local/bin/backup-db.sh
```

### 2. Static Site Backup

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /backups/writing-defense-$DATE.tar.gz /var/www/writing-defense
```

## CI/CD Pipeline (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2
      with:
        publish-dir: './dist'
        production-deploy: true
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Testing Before Deployment

### Pre-deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test production build locally (`npm run preview`)
- [ ] Check all routes work
- [ ] Test editor functionality
- [ ] Verify baseline upload works
- [ ] Check source file upload
- [ ] Test auto-save and recovery
- [ ] Verify mobile responsiveness
- [ ] Check browser console for errors
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

### Browser Compatibility

**Supported Browsers**:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Not Supported**:
- Internet Explorer (any version)
- Very old mobile browsers

## Rollback Procedure

### Netlify/Vercel

1. Go to Deploys tab
2. Find previous working deploy
3. Click "Publish deploy"

### Custom Server

```bash
# Keep last 3 versions
mv /var/www/writing-defense /var/www/writing-defense.backup
tar -xzf /backups/writing-defense-20260125.tar.gz -C /var/www/
sudo systemctl reload nginx
```

## Troubleshooting

### Build Fails

**Issue**: `npm run build` errors
**Solution**:
```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Routes Don't Work After Deploy

**Issue**: Getting 404 on refresh
**Solution**: Configure server to route all requests to index.html (see server configs above)

### Large Bundle Size

**Issue**: Initial load too slow
**Solution**:
```typescript
// Lazy load heavy components
const BurstinessEKG = lazy(() => import('./components/BurstinessEKG'))
```

## Post-Deployment

### 1. DNS Propagation

Wait 24-48 hours for full DNS propagation

### 2. SSL Certificate

Verify HTTPS works: https://www.ssllabs.com/ssltest/

### 3. Performance Check

Test with:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### 4. Monitor

- Check error logs daily (first week)
- Monitor analytics for traffic
- Watch for user feedback

## Support

For deployment issues:
- Check deployment platform docs
- Review server logs
- Contact hosting support
- Open GitHub issue if app-related

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Platform**: Multi-platform deployment guide
