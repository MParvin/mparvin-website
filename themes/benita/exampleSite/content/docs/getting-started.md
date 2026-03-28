---
title: "Getting Started"
description: "Install and configure the Benita Hugo theme in minutes."
date: 2024-01-01
toc: true
tags: ["install", "setup", "quickstart"]
weight: 1
tabs:
  - name: Overview
    id: tab-overview
  - name: Setup
    id: tab-setup
  - name: Advanced
    id: tab-advanced
  - name: Troubleshooting
    id: tab-troubleshoot
---

<div class="tabs-wrapper">
<ul class="tabs-nav">
  <li><button class="tab-btn active" data-tab="tab-overview">Overview</button></li>
  <li><button class="tab-btn" data-tab="tab-setup">Setup</button></li>
  <li><button class="tab-btn" data-tab="tab-advanced">Advanced</button></li>
  <li><button class="tab-btn" data-tab="tab-troubleshoot">Troubleshooting</button></li>
</ul>

<div class="tab-panel active" id="tab-overview">

## What is Benita?

**Benita** is a premium Hugo theme designed for DevOps documentation platforms.
It features a 3-column layout, dark-mode-only palette, glassmorphism navbar,
collapsible sidebar, and client-side search — all with zero heavy JS frameworks.

<div class="callout callout-note">
  <svg class="callout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
  <div class="callout-content"><p>Hugo <strong>extended</strong> v0.115.0+ is required for Hugo Pipes support.</p></div>
</div>

### Key Features

- Dark mode only with a tuned 6-color palette
- Fixed 3-column layout (sidebar + content + aside)
- Glassmorphism navbar with search
- Fuse.js client-side search
- Chroma syntax highlighting with copy button
- Sidebar state persisted in `localStorage`

</div>

<div class="tab-panel" id="tab-setup">

## Installation

Clone or copy the theme into your `themes/` directory:

```bash
git submodule add https://github.com/yourname/benita themes/benita
```

Update `config.yml`:

```yaml
theme: benita

outputs:
  home:
    - HTML
    - RSS
    - JSON

params:
  description: "A DevOps documentation platform."
  githubURL: "https://github.com/yourname/repo"
  enableSearch: true
```

Run the dev server:

```bash
hugo server -D
```

</div>

<div class="tab-panel" id="tab-advanced">

## Sidebar Menu

Define a `sidebar` menu in `config.yml`:

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
```

## Aside Cards

Add `data/quicklinks.yml` and `data/resources.yml` to populate the aside panel.

### quicklinks.yml

```yaml
- name: GitHub Repository
  url: https://github.com/yourname/repo
- name: Issues
  url: https://github.com/yourname/repo/issues
```

### Promo Card

In `config.yml`:

```yaml
params:
  promoCard:
    title: "Pro Tip"
    description: "Enable TOC in front matter with toc: true."
    url: /docs/toc/
    buttonText: "Read More"
```

</div>

<div class="tab-panel" id="tab-troubleshoot">

## Common Issues

### CSS not loading

Make sure you are using **Hugo extended** — regular builds don't support Hugo Pipes.

<div class="callout callout-warning">
  <svg class="callout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
  <div class="callout-content"><p>Run <code>hugo version</code> — the output must include <code>extended</code>.</p></div>
</div>

### Search not working

Ensure your `config.yml` includes:

```yaml
outputs:
  home:
    - HTML
    - RSS
    - JSON
```

Then set `enableSearch: true` under `params`.

### Sidebar won't collapse

The sidebar uses `localStorage`. Check that cookies/storage aren't blocked in
your browser.

</div>
</div>
