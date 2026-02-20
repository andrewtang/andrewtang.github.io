# Project Detail Pages — Rules & Guide

Project detail pages live at `/projects/[slug]` and are statically generated at build time.

---

## File locations

| What | Where |
|---|---|
| Route | `app/projects/[slug]/page.tsx` |
| TOC component | `components/work/ProjectTOC.tsx` |
| Types | `types/project.ts`, `types/projectDetail.ts` |
| Project registry | `data/projects/index.ts` |
| **Each project** | `data/projects/[slug].ts` ← one file per project |
| Site / experience / labs | `data/site.ts`, `data/experience.ts`, `data/labs.ts` |
| Backward-compat barrel | `data/content.ts` (re-exports everything — do not edit) |

---

## Adding a new project

### 1. Create `data/projects/my-project.ts`

Copy `data/projects/betashares.ts` as a starting point. Each file exports exactly two things: `card` (homepage card data) and `detail` (case study content). The slug lives here — nowhere else.

```ts
import type { Project, ProjectDetail } from '@/types';

export const card: Project = {
  id: 7,                              // next sequential id
  slug: "my-project",                 // URL: /projects/my-project
  title: "The one-line project title",
  description: "Company • Shipped YYYY",
  image: "/images/work/my-project.jpg",
  tags: ["UI Design", "UX Research"],
  link: "",                           // leave empty — routing is handled automatically
  tooltipText: "Coming soon",         // shown on hover when not published
                                      // add published: true to make card clickable and case study live
};

export const detail: ProjectDetail = {
  slug: "my-project",                 // must match card.slug
  role: "Principal Product Designer",
  company: "Company Name",
  year: "2024",
  overview: "One or two sentences summarising the project and its impact.",
  content: [
    { type: "text", heading: "The problem",  body: "..." },
    { type: "text", heading: "The approach", body: "..." },
    { type: "text", heading: "The outcome",  body: "..." },
  ],
};
```

### 2. Register in `data/projects/index.ts`

Import the new file and add it to the `all` array in display order (highest id first = top of homepage).

```ts
import * as myProject from './my-project';

const all = [macro, betashares, myProject, afterpay, ...];
```

### 3. Add the cover image

Place at `public/images/work/my-project.jpg`.
Recommended: **1600 × 900px** (16:9), JPG, ≤ 300 KB.

---

## Publishing a case study

When the case study is ready:

1. Add `published: true` to `card` in the project file.
2. Fill in `overview` and `content[]` with real copy.
3. Run `npm run build` — the page will now be statically generated at `/projects/[slug]`.

---

## Content blocks

Content is an array of `ProjectContentBlock` objects.

### `text` — section with heading + body copy

```ts
{
  type: "text",
  heading: "The problem",   // appears in the sticky TOC sidebar
  body: "Body copy here.\n\nDouble newlines = paragraph break.",
}
```

> All `text` blocks with a `heading` are automatically added to the TOC.
> "Overview" is always the first TOC entry and scrolls to page top.

### `image` — single image

```ts
{
  type: "image",
  src: "/images/work/my-project-screen.jpg",
  alt: "Description for screen readers",
  layout: "full",       // "full" = bleed to column edge | "contained" = within column
  caption: "Optional caption.",
}
```

### `images` — side-by-side pair (2 columns)

```ts
{
  type: "images",
  srcs: [
    { src: "/images/work/screen-a.jpg", alt: "Screen A" },
    { src: "/images/work/screen-b.jpg", alt: "Screen B" },
  ],
  caption: "Optional caption.",
}
```

### `divider` — horizontal rule

```ts
{ type: "divider" }
```

---

## `published` flag

`published` lives only on `card`. There is no separate flag on `detail`.

| Flag | Card behaviour | Detail page |
|---|---|---|
| `card.published: true` | Clickable, links to detail page | Full case study rendered |
| omitted / `false` | Not clickable, shows tooltip | 404 |

---

## Checklist for a new project

- [ ] `data/projects/my-project.ts` created with `card` and `detail` exports
- [ ] Registered in `data/projects/index.ts` `all` array in the right position
- [ ] Cover image at `public/images/work/[slug].jpg` (16:9, ≤ 300 KB)
- [ ] `overview` written (1–2 sentences, shown above the cover image)
- [ ] `content[]` has at minimum: Problem, Approach, Outcome sections
- [ ] `published: true` added to `card` when ready to publish
- [ ] `npm run build` passes with no errors
