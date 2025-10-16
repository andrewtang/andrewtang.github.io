# Quick Setup Guide

Follow these steps to get your portfolio live on GitHub Pages:

## Step 1: Update Configuration

1. **Edit `data/content.ts`**
   - Replace all placeholder content with your information
   - Update name, description, links, projects, experience, and skills

2. **Edit `next.config.mjs`**
   - If using a project repository (not username.github.io):
     - Uncomment `basePath` and `assetPrefix` lines
     - Replace `REPO-NAME` with your actual repository name
   - If using username.github.io:
     - Leave those lines commented out

## Step 2: Initialize Git Repository

```bash
# Inside the portfolio directory
git init
git add .
git commit -m "Initial commit: Portfolio setup"
```

## Step 3: Create GitHub Repository

1. Go to GitHub and create a new repository
   - For personal site: Name it `username.github.io`
   - For project site: Name it whatever you want

2. Push your code:
```bash
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", select **GitHub Actions**
4. The deployment will automatically start

## Step 5: Wait for Deployment

- Check the **Actions** tab to see the deployment progress
- First deployment takes 2-3 minutes
- Your site will be live at:
  - `https://username.github.io` (for username.github.io repos)
  - `https://username.github.io/repo-name` (for project repos)

## Step 6: Verify

Visit your site and make sure everything looks correct!

## Making Changes

After the initial setup, any push to the `main` branch will automatically trigger a rebuild and redeploy.

```bash
# Make your changes, then:
git add .
git commit -m "Update portfolio content"
git push
```

## Troubleshooting

### Site shows 404 errors
- Make sure GitHub Pages is set to "GitHub Actions" in Settings > Pages
- Check if `basePath` and `assetPrefix` are correctly set in `next.config.mjs`

### Build fails
- Check the Actions tab for error messages
- Make sure all content in `data/content.ts` is valid JavaScript/TypeScript

### Styling looks broken
- Verify the `basePath` configuration matches your repository name
- Clear your browser cache

## Next Steps

After setup, you can start building components:
- Hero section
- Projects showcase
- About/Experience sections
- Contact section

Refer to the main README.md for detailed information about the project structure and customization options.
