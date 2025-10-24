# GitHub Pages Deployment Guide

## 🚀 Quick Deploy Steps

### 1. Update Repository Name in Config

If your GitHub repository name is **NOT** "portfolio", update `vite.config.ts`:

```typescript
base: mode === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

Replace `YOUR-REPO-NAME` with your actual repository name.

### 2. Push to GitHub

```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy your site

### 4. Access Your Site

Your portfolio will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## 🔧 Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the project
npm run build

# The build output will be in the 'dist' folder
# You can deploy this folder to any static hosting service
```

## 📝 Important Notes

1. **Base Path**: The `base` in `vite.config.ts` must match your repository name
2. **Auto Deploy**: Every push to `main` branch will trigger automatic deployment
3. **Build Time**: First deployment takes 2-5 minutes
4. **Custom Domain**: You can add a custom domain in GitHub Pages settings

## 🛠️ Local Testing

Test the production build locally before deploying:

```bash
npm run build
npm run preview
```

## 🔍 Troubleshooting

**404 on deployed site?**
- Check that `base` in `vite.config.ts` matches your repo name
- Ensure GitHub Pages is set to use "GitHub Actions" as source

**Assets not loading?**
- Verify the base path in `vite.config.ts`
- Clear browser cache and hard reload

**Workflow failed?**
- Check the Actions tab in GitHub for error details
- Ensure all dependencies are in `package.json`

## 📦 What's Configured

✅ Vite configuration for GitHub Pages
✅ GitHub Actions workflow for automatic deployment
✅ Optimized production build
✅ Asset path handling
✅ Base URL configuration

## 🎨 Customization

To change the deployment branch, edit `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches:
      - main  # Change this to your preferred branch
```

---

**Ready to deploy!** Just push to GitHub and your portfolio will be live in minutes! 🎉
