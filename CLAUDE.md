# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website for Andrew Tang built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. The site is configured for static export and deployed to GitHub Pages at andrewtang.net.

## Tech Stack

- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** with custom minimal dark theme
- **Framer Motion** for animations
- **GitHub Actions** for automated deployment to GitHub Pages

## Architecture

**Next.js App Router Structure**:
- `app/` - Next.js app directory with pages and layouts
- `components/` - React components (sections/ and ui/ subdirectories)
- `data/content.ts` - Centralized site content and configuration
- `lib/utils.ts` - Utility functions (cn() for class merging)
- `public/` - Static assets

**Design System** (tailwind.config.ts):
- Background: #0a0a0a (dark)
- Foreground: #fafafa (light text)
- Muted: #737373 (secondary text)
- Accent: #3b82f6 (blue)
- Fonts: Inter (body), Geist Mono (code)
- Custom animations: fade-in, slide-up

## Development

**Commands**:
- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build and export static site to `out/`
- `npm run lint` - Run ESLint

**Configuration**:
- `next.config.mjs` - Static export enabled, images unoptimized for GitHub Pages
- CNAME file maintained for custom domain (andrewtang.net)

## Deployment

The site deploys automatically via GitHub Actions (.github/workflows/deploy.yml) when pushing to the `master` branch:
1. Installs dependencies
2. Builds Next.js app
3. Exports to `out/` directory
4. Deploys to GitHub Pages

## Making Changes

**Content updates**: Edit `data/content.ts` for site info, projects, experience, skills

**Styling**: Use Tailwind utility classes; custom theme defined in tailwind.config.ts

**New components**: Place in `components/ui/` (reusable) or `components/sections/` (page sections)

**Adding pages**: Create new route folders in `app/` following Next.js App Router conventions
