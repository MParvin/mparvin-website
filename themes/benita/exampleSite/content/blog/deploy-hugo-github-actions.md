---
title: "Deploying with Hugo and GitHub Actions"
description: "A step-by-step guide for automating Hugo builds and deploying to GitHub Pages."
date: 2024-03-15
toc: true
tags: ["hugo", "github-actions", "devops", "ci-cd"]
author: "Benita Team"
---

## Introduction

Continuous deployment for a Hugo site can be set up in minutes with GitHub Actions.
This post walks through a complete workflow that builds your site and pushes it to
GitHub Pages automatically on every push to `main`.

## Prerequisites

- A Hugo extended site committed to GitHub
- GitHub Pages enabled on the repository
- A `gh-pages` branch (or configure to deploy from `main`'s `/docs`)

## The Workflow File

Create `.github/workflows/deploy.yml`:

```yaml {filename=".github/workflows/deploy.yml"}
name: Deploy Hugo Site

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: "0.121.0"
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

<div class="callout callout-tip">
  <svg class="callout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
  <div class="callout-content"><p>Always pin Hugo to an explicit version to avoid surprise breaking changes.</p></div>
</div>

## Setting baseURL

Make sure your `config.yml` has the correct `baseURL`:

```yaml
baseURL: https://yourname.github.io/repo/
```

## Conclusion

Your Hugo site will now rebuild and deploy automatically on every commit to `main`.
