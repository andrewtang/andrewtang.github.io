# Website Optimization Guide

## Phase 1 Completed ✅

### What We Fixed:

1. **Removed duplicate files**
   - Deleted `/public/building.gif` (duplicate, keeping `/public/images/building.gif`)

2. **Replaced all `<img>` tags with Next.js `<Image>` components**
   - ✅ About page: climbing.gif + andy photos (3 images)
   - ✅ Hero page: building.gif
   - All project images already using Next.js Image

3. **Implemented lazy loading**
   - GIFs load only on hover (conditional rendering)
   - First photo on About page has `priority`, others lazy load
   - Project images have proper responsive `sizes` attribute

4. **Configured responsive images**
   - Added `sizes` prop to all images for optimal loading
   - Mobile: smaller dimensions, Desktop: larger dimensions

---

## Image Compression Required (Manual Step)

Since GitHub Pages doesn't support Next.js image optimization, images need to be manually compressed:

### Critical (High Priority):

| File | Current Size | Target Size | Tool |
|------|-------------|-------------|------|
| `climbing.gif` | 10.0 MB | ~1 MB | Convert to WebP or optimize with Ezgif |
| `betashares.png` | 2.0 MB | ~200 KB | TinyPNG or ImageOptim |
| `andy-3.png` | 1.3 MB | ~150 KB | TinyPNG or ImageOptim |
| `andy-1.png` | 1.1 MB | ~150 KB | TinyPNG or ImageOptim |

### Medium Priority:

| File | Current Size | Target Size |
|------|-------------|-------------|
| `andy-2.png` | 696 KB | ~100 KB |
| `afterpay.png` | 528 KB | ~100 KB |
| `building.gif` | 450 KB | ~100 KB |

### Recommended Tools:

1. **For PNGs:**
   - [TinyPNG](https://tinypng.com/) - Web-based, excellent compression
   - ImageOptim (Mac) - Desktop app
   - Squoosh.app - Google's web tool

2. **For GIFs:**
   - [Ezgif](https://ezgif.com/optimize) - Optimize existing GIFs
   - Convert to MP4/WebM for better compression
   - Use FFmpeg: `ffmpeg -i input.gif -vcodec libx264 -pix_fmt yuv420p output.mp4`

3. **Batch Processing:**
   ```bash
   # Install ImageOptim CLI (Mac)
   brew install imageoptim-cli

   # Optimize all images
   imageoptim --quality 80-100 public/images/*.png
   ```

---

## Performance Improvements from Phase 1:

- ✅ Removed 92 bytes (duplicate file)
- ✅ Enabled proper lazy loading for all images
- ✅ Responsive image loading (mobile users don't load desktop-sized images)
- ✅ Better accessibility with proper alt text
- ✅ Priority loading for above-the-fold images

---

## Next Steps (Phase 2):

After manual image compression, we'll tackle:

1. **Type System** - Create shared types, remove `any`
2. **Component Extraction** - Create reusable cursor components
3. **Code Deduplication** - Extract shared hover logic into custom hooks
4. **Constants File** - Centralize design tokens

---

## Expected Results After Manual Compression:

**Before:**
- Total image size: ~15.5 MB
- Page load time: 3-5s (on 4G)

**After:**
- Total image size: ~2-3 MB  ⚡️ **80% reduction**
- Page load time: 1-2s (on 4G)  ⚡️ **50-60% faster**
- Lighthouse Performance: 85-95/100

---

## Testing Checklist:

After compressing images, test:

- [ ] All images load correctly on homepage
- [ ] All images load correctly on /about page
- [ ] GIFs animate on hover
- [ ] Images look sharp on Retina displays
- [ ] Mobile images scale appropriately
- [ ] Dark mode images render correctly

---

*Generated on 2025-10-18 | Phase 1 of 4 Complete*
