You are a senior frontend engineer and Hugo theme developer.

Your task is to build a production-ready Hugo theme for a DevOps-focused documentation platform, inspired by modern tools like DevDocs, Notion, and Vercel Docs.

The design must strictly follow the specifications below.

---

## 1. Core Requirements

- Static site built with Hugo (extended version required)
- Fully responsive (desktop-first, then tablet/mobile)
- Dark mode ONLY
- High performance (minimal JS, no heavy frameworks)
- Clean, modular, maintainable structure

---

## 2. Layout Structure

Implement a 3-column layout:

1. Left Sidebar (fixed, 260px width)
2. Main Content (fluid center)
3. Right Aside Panel (fixed, ~300px)

Top Navbar (fixed, 64px height)

---

## 3. Components

### Navbar
- Glassmorphism style (blur + transparency)
- Left: logo + environment selector dropdown
- Center: large search input (client-side search ready)
- Right: GitHub button + primary CTA ("Get Started")

---

### Sidebar (Left)
- Collapsible navigation tree
- Sections:
  - Docs
  - Blog
  - Knowledge Base
  - FAQ
  - Cheat Sheets
  - Tutorials
- Nested items supported
- Active item highlighted (primary color)
- Smooth expand/collapse

---

### Main Content

- Page title (H1)
- Tab navigation under title:
  - Overview
  - Setup
  - Advanced
  - Troubleshooting

- Content sections:
  - Paragraph text
  - Headings (H2, H3)
  - Code blocks

#### Code Block Requirements:
- Dark styled container
- Syntax highlighting
- Copy-to-clipboard button
- Monospace font (JetBrains Mono)

---

### Right Aside Panel

Include card-based UI:

1. Quick Links
2. Resources
3. Optional visual/promo card

Cards should have:
- Rounded corners
- Subtle border
- Slight shadow
- Compact spacing

---

## 4. Design System

### Colors
- Background: #0B0F1A
- Surface: #121826
- Primary: #3B82F6
- Secondary: #6366F1
- Accent: #22C55E

- Text Primary: #E5E7EB
- Text Secondary: #9CA3AF

- Border: rgba(255,255,255,0.08)
- Glass: rgba(255,255,255,0.04)

---

### Typography
- Font: Inter (UI), JetBrains Mono (code)

Sizes:
- H1: 32px bold
- H2: 24px semibold
- H3: 18px semibold
- Body: 14px regular
- Code: 13px

---

### Spacing System
- Base unit: 8px
- Scale: 8 / 12 / 16 / 24 / 32 / 48

---

### Effects
- Border radius:
  - Cards: 12px
  - Containers: 16px

- Shadow:
  - 0 10px 30px rgba(0,0,0,0.4)

- Glass effect:
  - backdrop-blur: 12px
  - translucent background

---

## 5. Hugo Implementation Details

- Use Hugo Pipes for asset processing
- Organize theme as:
  - layouts/
  - partials/
  - assets/
  - static/
  - content/
  - data/

- Create reusable partials:
  - navbar.html
  - sidebar.html
  - aside.html
  - codeblock.html

- Use TailwindCSS (preferred) OR clean SCSS

- Enable syntax highlighting using Hugo's built-in Chroma

---

## 6. Features

- Client-side search (Fuse.js or similar, lightweight)
- Sidebar state persistence (open/closed)
- Copy button for code blocks
- Smooth tab switching (no page reload)
- Anchor links for headings

---

## 7. Content Structure (Example)

- content/docs/
- content/blog/
- content/kb/

Each doc page should support:
- title
- description
- toc
- tags

---

## 8. UX Priorities

- Fast navigation
- Excellent readability
- Clear hierarchy
- Minimal distractions

---

## 9. Deliverables

- Fully working Hugo theme
- Example content pages
- Clean folder structure
- README with setup instructions

---

## 10. Constraints

- Do NOT use heavy frameworks (React, Vue, etc.)
- Avoid unnecessary animations
- Keep JS minimal and purposeful

---

The final result should feel like a premium developer documentation platform: clean, fast, structured, and elegant.