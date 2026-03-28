# Benita

A premium Hugo theme for DevOps-focused documentation platforms. Inspired by DevDocs, Notion, and Vercel Docs.

## Features

- **Dark mode only** — clean dark palette tuned for readability
- **3-column layout** — fixed sidebar + fluid main content + fixed aside panel
- **Glassmorphism navbar** — blur + transparency effect
- **Collapsible sidebar** — persistent open/closed state via localStorage
- **Client-side search** — powered by Fuse.js
- **Syntax highlighting** — Hugo Chroma with copy-to-clipboard
- **Tab navigation** — smooth in-page tab switching
- **Responsive** — collapses gracefully for tablet and mobile
- **Hugo Pipes** — CSS/JS minification and fingerprinting

## Requirements

- Hugo **extended** v0.115.0 or later

## Quick Start

1. Add the theme to your `themes/` directory (already done if you're reading this).
2. Update your `config.yml`:

```yaml
theme: benita

outputs:
  home:
    - HTML
    - RSS
    - JSON

params:
  description: "Your site description"
  githubURL: "https://github.com/yourname/yourrepo"
  enableSearch: true
```

3. Define your sidebar navigation via Hugo menus:

```yaml
menu:
  sidebar:
    - identifier: docs
      name: Docs
      weight: 1
      params:
        icon: book
    - identifier: getting-started
      name: Getting Started
      parent: docs
      url: /docs/getting-started/
      weight: 1
    - identifier: blog
      name: Blog
      url: /blog/
      weight: 2
      params:
        icon: rss
```

## Content Structure

```
content/
  docs/
    _index.md
    getting-started.md
    advanced.md
  blog/
    _index.md
    my-post.md
  kb/
    _index.md
```

### Front Matter

```yaml
---
title: "My Page Title"
description: "Short description shown in cards and meta"
date: 2024-01-01
tags: ["devops", "linux"]
toc: true
tabs:
  - name: Overview
    id: overview
  - name: Setup
    id: setup
  - name: Advanced
    id: advanced
---
```

## Design System

| Token | Value |
|---|---|
| Background | `#0B0F1A` |
| Surface | `#121826` |
| Primary | `#3B82F6` |
| Secondary | `#6366F1` |
| Accent | `#22C55E` |
| Text Primary | `#E5E7EB` |
| Text Secondary | `#9CA3AF` |

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus search |
| `Escape` | Close search |

## License

MIT
