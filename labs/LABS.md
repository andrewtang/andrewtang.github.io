# Labs

Experimental projects and prototypes.

This file is for your internal tracking. The public-facing labs page is available at `/labs` on the site.

## How to Add a New Lab

1. Create a new folder in `app/labs/` (e.g., `app/labs/02/`)
2. Create the component in `components/labs/` (e.g., `Lab02Demo.tsx`)
3. Add the lab entry to `data/content.ts` in the `labs` array
4. Update this file with details for your reference

## Design Rules for Lab Pages

Every lab page **MUST** follow these structural requirements:

### 1. Back Button (Required)
- Position: Top-left corner (6/12 spacing on mobile/desktop)
- Link: `/labs` (back to main labs page)
- Style: Monospace font, uppercase, white/60 opacity with hover to white
- Example:
```tsx
<Link
  href="/labs"
  className="inline-block text-sm font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors"
>
  ← Labs
</Link>
```

### 2. Header Structure
- Title should be centered on the page
- Use Framer Motion animations for entrance (fade-in, scale)
- Typical delay: 0.6s after page load
- Use white text for maximum contrast

### 3. Footer/Controls Structure
- Position controls/instructions at the bottom of the page
- Desktop: Bottom-left and bottom-right corners (12 spacing)
- Mobile: Center or simplified layout (6 spacing)
- Use monospace font for technical information
- Opacity: white/30-40 for subtle appearance

### 4. Layout Requirements
- Full-screen height (`h-screen`)
- Relative positioning for absolute child elements
- Z-index layering: canvas/content (0), navigation/controls (10)
- Responsive spacing: mobile (6) → desktop (12)

### 5. Color Adaptation (Required)
- **Dark backgrounds**: Use white text (`text-white`) with reduced opacity (`/60`, `/40`, `/30`)
- **Light backgrounds**: Use black text (`text-black` or `text-foreground`) with reduced opacity
- Apply color adaptation to:
  - Back button link
  - Title and headings
  - Footer text
  - All interactive controls
- Example for light background:
```tsx
// For light backgrounds, use black text
<Link
  href="/labs"
  className="text-black/60 hover:text-black"
>
  ← Labs
</Link>
```

## Active Projects

### 01 - [Project Name TBD]
**Status:** In Progress
**Started:** October 2025
**Description:** [Add description here]

**Tech Stack:**
- [Add technologies]

**Goals:**
- [Add goals]

**Links:**
- Code: `labs/01/`
- Public page: `/labs` (view all labs)
- Demo: [Add link if applicable]

---

## Future Projects

### 02 - [Project Name]
**Status:** Planned
**Description:** [Add description]

### 03 - [Project Name]
**Status:** Planned
**Description:** [Add description]

---

## Completed Projects

None yet.

---

## Template for New Labs

```markdown
### [Number] - [Project Name]
**Status:** [Planned/In Progress/Completed/Archived]
**Started:** [Month Year]
**Completed:** [Month Year or N/A]
**Description:** [Brief description of what you're building/exploring]

**Tech Stack:**
- [Technology 1]
- [Technology 2]

**Goals:**
- [Goal 1]
- [Goal 2]

**Key Learnings:**
- [Add after completion]

**Links:**
- Code: `labs/[number]/`
- Demo: [URL if deployed]
- Write-up: [Link to detailed post if applicable]
```
