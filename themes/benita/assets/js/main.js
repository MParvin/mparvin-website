/* Benita Theme — Main JavaScript */
(function () {
  'use strict';

  // ============================================================
  // Mobile sidebar toggle
  // ============================================================
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // ============================================================
  // Sidebar collapsible sections + state persistence
  // ============================================================
  document.querySelectorAll('.sidebar-nav-item[data-section]').forEach(function (item) {
    var sectionId = item.getAttribute('data-section');
    var stored = localStorage.getItem('benita-sidebar-' + sectionId);

    // Restore state; default open if the stored key doesn't exist
    if (stored === 'open' || stored === null) {
      item.classList.add('open');
    }

    var trigger = item.querySelector(':scope > .sidebar-nav-link');
    if (!trigger) return;

    trigger.addEventListener('click', function (e) {
      var subNav = item.querySelector(':scope > .sidebar-sub-nav');
      if (subNav) {
        e.preventDefault();
        item.classList.toggle('open');
        localStorage.setItem(
          'benita-sidebar-' + sectionId,
          item.classList.contains('open') ? 'open' : 'closed'
        );
      }
    });
  });

  // ============================================================
  // Tab switching
  // ============================================================
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      var wrapper = btn.closest('.tabs-wrapper');
      if (!wrapper || !target) return;

      wrapper.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      wrapper.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });

      btn.classList.add('active');
      var panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // Activate first tab in each tabs-wrapper
  document.querySelectorAll('.tabs-wrapper').forEach(function (wrapper) {
    var firstBtn = wrapper.querySelector('.tab-btn');
    var firstPanel = wrapper.querySelector('.tab-panel');
    if (firstBtn && !wrapper.querySelector('.tab-btn.active')) {
      firstBtn.classList.add('active');
    }
    if (firstPanel && !wrapper.querySelector('.tab-panel.active')) {
      firstPanel.classList.add('active');
    }
  });

  // ============================================================
  // Copy code buttons — Chroma .highlight blocks
  // ============================================================
  function makeCopyBtn() {
    var btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<rect x="9" y="9" width="13" height="13" rx="2"></rect>' +
        '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
      '</svg>Copy';
    return btn;
  }

  function resetCopyBtn(btn) {
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<rect x="9" y="9" width="13" height="13" rx="2"></rect>' +
        '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
      '</svg>Copy';
    btn.classList.remove('copied');
  }

  function markCopied(btn) {
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
        '<polyline points="20 6 9 17 4 12"></polyline>' +
      '</svg>Copied!';
    btn.classList.add('copied');
    setTimeout(function () { resetCopyBtn(btn); }, 2000);
  }

  function copyText(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        markCopied(btn);
      }).catch(function () {
        fallbackCopy(text, btn);
      });
    } else {
      fallbackCopy(text, btn);
    }
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      markCopied(btn);
    } catch (e) {}
    document.body.removeChild(ta);
  }

  // Add copy button to each .highlight block
  document.querySelectorAll('.highlight').forEach(function (block) {
    if (block.querySelector('.copy-code-btn')) return;
    var btn = makeCopyBtn();
    btn.addEventListener('click', function () {
      var code = block.querySelector('code');
      if (code) copyText(code.innerText, btn);
    });
    block.appendChild(btn);
  });

  // Handle .code-block-copy buttons inside shortcode wrappers
  document.querySelectorAll('.code-block-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrapper = btn.closest('.code-block-wrapper');
      if (!wrapper) return;
      var code = wrapper.querySelector('code');
      if (code) copyText(code.innerText, btn);
    });
  });

  // ============================================================
  // Anchor links for headings
  // ============================================================
  var contentAreas = document.querySelectorAll('.content');
  contentAreas.forEach(function (area) {
    area.querySelectorAll('h2[id], h3[id], h4[id]').forEach(function (heading) {
      var anchor = document.createElement('a');
      anchor.href = '#' + heading.id;
      anchor.className = 'heading-anchor';
      anchor.setAttribute('aria-label', 'Link to section');
      anchor.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
          '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>' +
          '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>' +
        '</svg>';
      heading.appendChild(anchor);
    });
  });

  // ============================================================
  // TOC active link on scroll
  // ============================================================
  var tocLinks = document.querySelectorAll('#TableOfContents a');
  if (tocLinks.length > 0) {
    var headings = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        var el = document.getElementById(id.slice(1));
        if (el) headings.push({ el: el, link: link });
      }
    });

    var activeHeading = null;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          activeHeading = entry.target.id;
          tocLinks.forEach(function (l) { l.classList.remove('active'); });
          var activeLink = document.querySelector('#TableOfContents a[href="#' + activeHeading + '"]');
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, { rootMargin: '0px 0px -65% 0px', threshold: 0 });

    headings.forEach(function (h) { observer.observe(h.el); });
  }

  // ============================================================
  // Active sidebar link
  // ============================================================
  var currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.sidebar-nav-link[href]').forEach(function (link) {
    var href = link.getAttribute('href').replace(/\/$/, '');
    if (href === currentPath) {
      link.classList.add('active');
      // Open parent collapsible
      var parentItem = link.closest('.sidebar-sub-nav');
      if (parentItem) {
        var grandparent = parentItem.closest('.sidebar-nav-item');
        if (grandparent) grandparent.classList.add('open');
      }
    }
  });

  // ============================================================
  // Client-side search (Fuse.js)
  // ============================================================
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');

  if (searchInput && searchResults) {
    var searchIndex = null;
    var fuse = null;

    function loadSearchIndex() {
      if (searchIndex !== null) return;
      fetch('/search-index.json')
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          if (!data) return;
          searchIndex = data;
          if (typeof Fuse !== 'undefined') {
            fuse = new Fuse(searchIndex, {
              keys: ['title', 'description', 'content'],
              threshold: 0.35,
              includeMatches: true,
              minMatchCharLength: 2,
            });
          }
        })
        .catch(function () {});
    }

    function renderResults(query) {
      if (!query || !fuse) {
        searchResults.classList.remove('active');
        return;
      }
      var results = fuse.search(query).slice(0, 8);
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-empty">No results for "' + escapeHtml(query) + '"</div>';
      } else {
        searchResults.innerHTML = results.map(function (r) {
          return '<a class="search-result-item" href="' + escapeHtml(r.item.url) + '">' +
            '<div class="res-title">' + escapeHtml(r.item.title) + '</div>' +
            (r.item.description ? '<div class="res-snippet">' + escapeHtml(r.item.description) + '</div>' : '') +
            '</a>';
        }).join('');
      }
      searchResults.classList.add('active');
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    searchInput.addEventListener('focus', loadSearchIndex);

    var debounceTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        renderResults(searchInput.value.trim());
      }, 150);
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-wrapper')) {
        searchResults.classList.remove('active');
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !e.target.matches('input, textarea, [contenteditable]')) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        searchInput.blur();
        searchResults.classList.remove('active');
      }
    });
  }

})();
