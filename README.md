# Portfolio Website

A minimal, modern portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Configured for static export to GitHub Pages.

## Tech Stack

- **Next.js 14** - App Router with TypeScript
- **Tailwind CSS** - Utility-first CSS with custom minimal theme
- **Framer Motion** - Animation library
- **GitHub Pages** - Static hosting

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[USERNAME]/[REPO-NAME].git
cd [REPO-NAME]
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Configuration

### 1. Update Site Content

Edit `data/content.ts` to customize your personal information, projects, experience, and skills.

### 2. Configure GitHub Pages

If your repository is **not** `username.github.io` (i.e., it's a project repository), you need to update `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/REPO-NAME',
  assetPrefix: '/REPO-NAME/',
};
```

Replace `REPO-NAME` with your actual repository name.

If your repository **is** `username.github.io`, leave these lines commented out.

### 3. Set Up GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Set Source to "GitHub Actions"
4. The workflow will automatically deploy on push to main branch

### 4. Update Deployment Workflow

The GitHub Actions workflow is configured for the `main` branch. If your default branch is named differently (e.g., `master`), update `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches:
      - master  # Change this to your branch name
```

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── sections/          # Large section components
│   └── ui/                # Reusable UI components
├── data/
│   └── content.ts         # Site content and configuration
├── lib/
│   └── utils.ts           # Utility functions
├── public/
│   └── images/            # Static images
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── next.config.mjs        # Next.js configuration
└── tailwind.config.ts     # Tailwind CSS configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (for testing build locally)
- `npm run lint` - Run ESLint

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  background: "#0a0a0a",
  foreground: "#fafafa",
  muted: "#737373",
  accent: "#3b82f6",
}
```

### Fonts

The project uses Inter for body text and Geist Mono for monospace. To change fonts, update `app/layout.tsx`.

## Building Components

Components will be built one by one. Planned sections include:
- Hero section
- About section
- Projects showcase
- Experience timeline
- Skills grid
- Contact section

## Deployment

The site automatically deploys to GitHub Pages when you push to the main branch. The deployment workflow:

1. Installs dependencies
2. Builds the Next.js app
3. Exports static files to `out/` directory
4. Deploys to GitHub Pages

Your site will be available at:
- User/Organization site: `https://[USERNAME].github.io`
- Project site: `https://[USERNAME].github.io/[REPO-NAME]`

## License

MIT
