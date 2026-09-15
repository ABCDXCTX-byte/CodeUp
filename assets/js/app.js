/* ==========================================================================
   CodeUp码上 · app.js — 主程序：路由 / 主题 / 进度 / 搜索 / 全局交互
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL = global.CL || {};
  var R = CL.Router;
  var P = CL.Pages;

  var app = document.getElementById('app');
  var THEME_KEY = 'codeup.theme';
  var PROGRESS_KEY = 'codeup.progress';

  /* ------------------------------------------------------------
     旧 key 一次性迁移：站点由 CodeLab 更名 CodeUp码上时，
     把 codelab.* 下的数据搬到 codeup.*，老用户的主题偏好与
     阅读进度不丢。搬完即删旧 key，只执行一次。
     必须早于 initTheme() 与各页面读取存储之前调用。
     ------------------------------------------------------------ */
  var LEGACY_STORE_KEYS = {
    'codelab.theme':      'codeup.theme',
    'codelab.progress':   'codeup.progress',
    'codelab.bce.v1':     'codeup.bce.v1',
    'codelab.editors.v1': 'codeup.editors.v1'
  };
  function migrateLegacyStore() {
    try {
      Object.keys(LEGACY_STORE_KEYS).forEach(function (oldKey) {
        var val = localStorage.getItem(oldKey);
        if (val == null) return;
        var newKey = LEGACY_STORE_KEYS[oldKey];
        if (localStorage.getItem(newKey) == null) localStorage.setItem(newKey, val);
        localStorage.removeItem(oldKey);
      });
    } catch (e) { /* 隐私模式 / 禁用存储：忽略 */ }
  }

  /* ============================================================ 进度存储 */
  var Progress = {
    _read: function () {
      try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
      catch (e) { return {}; }
    },
    _write: function (data) {
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(data)); }
      catch (e) { /* 隐私模式下忽略 */ }
    },
    done: function (lang) {
      var all = this._read();
      return (all[lang] || {});
    },
    mark: function (lang, chId) {
      var all = this._read();
      if (!all[lang]) all[lang] = {};
      if (all[lang][chId]) return;
      all[lang][chId] = Date.now();
      this._write(all);
    },
    reset: function () { this._write({}); }
  };
  CL.Progress = Progress;

  /* ============================================================ 主题 */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    var mc = document.getElementById('metaTheme');
    if (mc) mc.content = (t === 'dark' ? '#0a0e15' : '#ffffff');
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!saved) saved = 'light';   // 轻盈浅蓝/白为主视觉（暗色可手动切换）
    applyTheme(saved);
  }

  /* ============================================================ Toast */
  var toastWrap = document.getElementById('toastWrap');
  function toast(msg, kind) {
    var t = document.createElement('div');
    t.className = 'toast ' + (kind || '');
    var ico = kind === 'err'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    t.innerHTML = ico + '<span>' + CL.Highlight.esc(msg) + '</span>';
    toastWrap.appendChild(t);
    setTimeout(function () {
      t.classList.add('out');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 320);
    }, 2600);
  }

  /* ============================================================ 滚动进度条 */
  var bar = document.getElementById('topbarProgress');
  var toTop = document.getElementById('toTop');
  var App = {
    progress: function (p) {
      bar.style.width = Math.max(0, Math.min(1, p)) * 100 + '%';
      bar.classList.toggle('on', p > 0.005);
      toTop.classList.toggle('on', (global.scrollY || 0) > 400);
    }
  };
  CL.App = App;

  global.addEventListener('scroll', function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    App.progress(max > 0 ? (global.scrollY || 0) / max : 0);
  }, { passive: true });

  toTop.addEventListener('click', function () {
    global.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================================ 页面渲染 */
  function setTitle(t) { document.title = t || 'CodeUp码上 · 多语言编程教学实验室'; }

  function setActiveNav(name) {
    document.querySelectorAll('.nav-item').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === name);
    });
  }

  var currentDestroy = null;

  function clearPageHandlers() {
    if (currentDestroy) {
      try { currentDestroy(); } catch (e) { /* 忽略页面卸载时的异常 */ }
      currentDestroy = null;
    }
  }

  function render(fn, navName) {
    return function (params) {
      var oldPage = document.querySelector('.page');
      var useAnimation = oldPage && !reduceAnimations && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (useAnimation) {
        // 克隆旧页面用于退出动画（不阻塞新页面渲染）
        var clone = oldPage.cloneNode(true);
        clone.className = 'page page-leave-clone';
        clone.style.position = 'absolute';
        clone.style.top = '0';
        clone.style.left = '0';
        clone.style.right = '0';
        clone.style.pointerEvents = 'none';
        clone.style.zIndex = '1';
        var parent = oldPage.parentNode;
        parent.style.position = 'relative';
        parent.appendChild(clone);

        // 立即渲染新页面（不等待退出动画）
        doRender();

        // 新页面进入动画
        var newPage = document.querySelector('.page');
        if (newPage) {
          newPage.classList.add('page-enter');
          setTimeout(function () {
            if (newPage) newPage.classList.remove('page-enter');
          }, 320);
        }

        // 退出动画完成后移除克隆体
        setTimeout(function () {
          if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
        }, 220);
      } else {
        doRender();
      }

      function doRender() {
        clearPageHandlers();
        setActiveNav(navName);
        var res = fn(app, params) || {};
        setTitle(res.title);
        global.scrollTo(0, 0);
        App.progress(0);
        highlightNav();
        initScrollReveal();
        if (typeof res.destroy === 'function') currentDestroy = res.destroy;
      }
    };
  }

  /* ---- Scroll reveal animations ---- */
  var scrollObserver = null;
  function initScrollReveal() {
    if (!('IntersectionObserver' in global)) return;
    if (scrollObserver) { try { scrollObserver.disconnect(); } catch (e) {} }
    var page = document.querySelector('.page');
    if (!page) return;
    var targets = page.querySelectorAll('section, .hero, .lang-grid, .feat-grid, .path-grid, .pg-section, .pg-ide, table, pre, blockquote');
    targets.forEach(function (el, i) {
      if (el.classList.contains('section-reveal')) return;
      el.classList.add('section-reveal');
      el.style.transitionDelay = Math.min(i * 40, 200) + 'ms';
    });
    scrollObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    page.querySelectorAll('.section-reveal').forEach(function (el) {
      scrollObserver.observe(el);
    });
  }

  /* ---- 路由表 ---- */
  R.add('/', render(P.home, 'home'));
  R.add('/languages', render(P.languages, 'languages'));
  R.add('/languages/:lang', function (params) { render(P.tutorial, 'languages')(params); });
  R.add('/languages/:lang/:chapter', function (params) { render(P.tutorial, 'languages')(params); });
  R.add('/compare', render(P.compare, 'compare'));
  R.add('/cheatsheet', render(P.cheatsheet, 'cheatsheet'));
  R.add('/playground', render(P.playground, 'playground'));
  R.add('/playground/:lang', render(P.playground, 'playground'));
  R.notFound(function () {
    setActiveNav(null);
    P.notFound(app);
    setTitle('页面不存在 · CodeUp码上');
  });

  function highlightNav() {
    var path = R.current();
    document.querySelectorAll('.nav-item').forEach(function (a) {
      var href = a.getAttribute('href').replace('#', '');
      var name = a.getAttribute('data-nav');
      var on = (path === href) ||
               (href !== '/' && path.indexOf(href) === 0);
      if (name === 'home') on = (path === '/');
      a.classList.toggle('active', on);
    });
  }

  /* ============================================================ 页脚 */
  function buildFooter() {
    var wrap = document.getElementById('footerCols');
    var cols = [
      { title: '学习路线', links: CL.Languages.list.slice(0, 4).map(function (l) {
        return { text: l.name + ' 教程', href: '#/languages/' + l.id };
      }) },
      { title: '更多语言', links: CL.Languages.list.slice(4).map(function (l) {
        return { text: l.name + ' 教程', href: '#/languages/' + l.id };
      }) },
      { title: '工具', links: [
        { text: '横向对比', href: '#/compare' },
        { text: '语法速查', href: '#/cheatsheet' },
        { text: '在线运行', href: '#/playground' },
        { text: '全部语言', href: '#/languages' }
      ] }
    ];
    wrap.innerHTML = cols.map(function (c) {
      return '<div><div class="fc-title">' + CL.Highlight.esc(c.title) + '</div><div class="fc-list">' +
        c.links.map(function (l) {
          return '<a href="' + l.href + '">' + CL.Highlight.esc(l.text) + '</a>';
        }).join('') + '</div></div>';
    }).join('');
  }

  /* ============================================================ 搜索 */
  var searchInput = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');
  var searchIndex = null;

  function buildIndex() {
    var items = [];
    CL.Languages.list.forEach(function (l) {
      items.push({
        lang: l.id,
        langName: l.name,
        color: l.color,
        title: l.name + ' 教程',
        sub: l.desc,
        href: '#/languages/' + l.id
      });
      CL.Tutorials.chapters(l.id).forEach(function (ch, i) {
        items.push({
          lang: l.id,
          langName: l.name,
          color: l.color,
          title: ch.title,
          sub: (ch.sub ? stripTags(ch.sub) + ' · ' : '') + '第 ' + (i + 1) + ' 章',
          href: '#/languages/' + l.id + '/' + ch.id
        });
      });
    });
    // 速查组
    (CL.Compare ? CL.Compare.cheatsheet : []).forEach(function (g) {
      items.push({
        lang: null, langName: '速查', color: '#ff6b35',
        title: g.title, sub: '速查手册 · ' + g.rows.length + ' 条',
        href: '#/cheatsheet'
      });
    });
    // 对比项
    (CL.Compare ? CL.Compare.items : []).forEach(function (it) {
      items.push({
        lang: null, langName: '对比', color: '#0f5fc9',
        title: it.title, sub: stripTags(it.desc || ''),
        href: '#/compare'
      });
    });
    return items;
  }

  function stripTags(s) {
    return String(s || '').replace(/<[^>]*>/g, '').replace(/\*\*/g, '').replace(/`/g, '');
  }

  function doSearch(q) {
    if (!searchIndex) searchIndex = buildIndex();
    q = q.trim().toLowerCase();
    if (!q) { searchResults.hidden = true; return; }

    var hits = [], seen = {};
    searchIndex.forEach(function (it) {
      if (seen[it.href]) return;
      var hay = (it.title + ' ' + it.sub + ' ' + it.langName).toLowerCase();
      if (hay.indexOf(q) >= 0) { hits.push(it); seen[it.href] = true; }
    });

    if (!hits.length) {
      searchResults.innerHTML = '<div class="sr-empty">没有找到「' + CL.Highlight.esc(q) + '」相关内容</div>';
      searchResults.hidden = false;
      return;
    }

    searchResults.innerHTML = hits.slice(0, 12).map(function (it) {
      return '<a class="sr-item" href="' + it.href + '">' +
        '<div class="sr-top">' +
          '<span class="sr-lang" style="background:' + it.color + '22;color:' + it.color + '">' +
            CL.Highlight.esc(it.langName) + '</span>' +
          '<span class="sr-title">' + CL.Highlight.esc(it.title) + '</span>' +
        '</div>' +
        '<div class="sr-sub">' + CL.Highlight.esc(it.sub) + '</div>' +
      '</a>';
    }).join('');
    var first = searchResults.querySelector('.sr-item');
    if (first) first.classList.add('sel');     // 默认选中第一项，回车即可打开
    searchResults.hidden = false;
  }

  searchInput.addEventListener('input', function () { doSearch(searchInput.value); });
  searchInput.addEventListener('focus', function () { if (searchInput.value) doSearch(searchInput.value); });
  searchInput.addEventListener('blur', function () {
    setTimeout(function () { searchResults.hidden = true; }, 180);
  });
  // 键盘导航：↑/↓ 选择结果，Enter 打开，Esc 关闭（提升操作效率）
  searchInput.addEventListener('keydown', function (e) {
    var items = searchResults.querySelectorAll('.sr-item');
    if (searchResults.hidden || !items.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var dir = e.key === 'ArrowDown' ? 1 : -1;
      var cur = -1;
      items.forEach(function (it, i) { if (it.classList.contains('sel')) cur = i; });
      var next = Math.max(0, Math.min(items.length - 1, cur + dir));
      items.forEach(function (it) { it.classList.remove('sel'); });
      items[next].classList.add('sel');
      items[next].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      var sel = searchResults.querySelector('.sr-item.sel') || items[0];
      if (sel) {
        var href = sel.getAttribute('href');
        searchResults.hidden = true;
        if (document.activeElement === searchInput) searchInput.blur();
        location.hash = href.charAt(0) === '#' ? href.slice(1) : href;
      }
    }
  });
  document.addEventListener('click', function (e) {
    if (!document.getElementById('searchBox').contains(e.target)) searchResults.hidden = true;
  });

  /* ============================================================ 快捷键 */
  document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + K 聚焦搜索
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
      return;
    }
    // Esc 关闭搜索
    if (e.key === 'Escape') {
      searchResults.hidden = true;
      searchInput.blur();
      document.querySelectorAll('.sidebar.open').forEach(function (s) { s.classList.remove('open'); });
      document.querySelectorAll('.sb-backdrop').forEach(function (b) { b.remove(); });
    }
  });

  /* ============================================================ 顶栏交互 */
  document.getElementById('themeToggle').addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    var de = document.documentElement;
    de.classList.add('theme-anim');           // 切换瞬间启用全局颜色过渡，体验更顺滑
    applyTheme(next);
    clearTimeout(de._themeAnimT);
    de._themeAnimT = setTimeout(function () { de.classList.remove('theme-anim'); }, 320);
    toast(next === 'dark' ? '已切换到深色主题' : '已切换到浅色主题', 'ok');
  });

  var burger = document.getElementById('navBurger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('.nav-item')) nav.classList.remove('open');
  });

  /* ============================================================ 锚点跳转修复 */
  // 目录链接使用原生 hash 锚点会和路由冲突，这里接管
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.length < 2) return;
    if (href.charAt(1) === '/') return;         // 路由链接，交给浏览器
    if (a.classList.contains('toc') || a.closest('.toc')) {
      e.preventDefault();
      var target = document.getElementById(href.slice(1));
      if (target) {
        var y = target.getBoundingClientRect().top + global.scrollY - 80;
        global.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });

  /* ============================================================ 启动 */
  migrateLegacyStore();
  initTheme();
  buildFooter();
  R.init(function () { /* 由各路由 handler 处理 */ });

  CL.toast = toast;

  /* 开发辅助：暴露内部状态 */
  CL.debug = {
    stats: function () { return P.siteStats(); },
    resetProgress: function () { Progress.reset(); toast('已清除阅读进度', 'ok'); }
  };

  /* ============================================================ 性能优化 */
  var isLowEndDevice = (function () {
    try {
      var cores = navigator.hardwareConcurrency || 4;
      var memory = navigator.deviceMemory || 4;
      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      var effectiveType = connection ? connection.effectiveType : '4g';
      var saveData = connection ? connection.saveData : false;
      return cores <= 2 || memory <= 2 || effectiveType === '2g' || effectiveType === 'slow-2g' || saveData;
    } catch (e) { return false; }
  })();

  var reduceAnimations = isLowEndDevice;
  (function monitorFPS() {
    if (isLowEndDevice) return;
    var frames = 0;
    var lastTime = performance.now();
    function check() {
      frames++;
      var now = performance.now();
      if (now - lastTime >= 1000) {
        var fps = Math.round(frames * 1000 / (now - lastTime));
        if (fps < 30) {
          reduceAnimations = true;
          document.documentElement.classList.add('low-fps');
        }
        frames = 0;
        lastTime = now;
      }
      requestAnimationFrame(check);
    }
    requestAnimationFrame(check);
  })();

  function rafThrottle(fn) {
    var ticking = false;
    return function () {
      if (ticking) return;
      ticking = true;
      var args = arguments;
      var context = this;
      requestAnimationFrame(function () {
        fn.apply(context, args);
        ticking = false;
      });
    };
  }

  function debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(context, args); }, delay || 200);
    };
  }

  var originalInitScrollReveal = initScrollReveal;
  initScrollReveal = function () {
    if (reduceAnimations) {
      var page = document.querySelector('.page');
      if (page) {
        page.querySelectorAll('.section-reveal, section, .hero, .lang-grid, .feat-grid, .path-grid').forEach(function (el) {
          el.classList.add('visible');
          el.style.transition = 'none';
        });
      }
      return;
    }
    originalInitScrollReveal();
  };

  global.addEventListener('resize', debounce(function () {}, 150), { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      document.documentElement.classList.add('page-hidden');
    } else {
      document.documentElement.classList.remove('page-hidden');
    }
  });

  CL.perf = {
    isLowEnd: isLowEndDevice,
    reduceAnimations: function () { return reduceAnimations; },
    rafThrottle: rafThrottle,
    debounce: debounce
  };


  /* ============================================================ 交互动画 (性能优化版) */

  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // 波纹元素池 - 复用元素，减少DOM操作
  var ripplePool = [];
  var MAX_RIPPLES = 5;

  function getRipple() {
    if (ripplePool.length > 0) {
      return ripplePool.pop();
    }
    var r = document.createElement('span');
    r.className = 'ripple';
    return r;
  }

  function releaseRipple(r) {
    if (ripplePool.length < MAX_RIPPLES) {
      r.removeAttribute('style');
      ripplePool.push(r);
    } else {
      r.remove();
    }
  }

  // --- 1. 按钮波纹效果 (优化版：元素池复用) ---
  function initRipple() {
    if (reduceAnimations || isTouchDevice) return;
    document.addEventListener('click', function (e) {
      var target = e.target.closest('.btn, .bce-btn, .cv-btn, .icon-btn, .nav-item, .sidebar-link, .toc-link, .bce-file, .bce-tab, .bce-select-item, .page-link');
      if (!target) return;
      var rect = target.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 0.8;
      var ripple = getRipple();
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      target.appendChild(ripple);
      setTimeout(function () { releaseRipple(ripple); }, 400);
    });
  }

  // --- 2. 数字计数动画 ---
  function initCounters() {
    if (reduceAnimations) return;
    var counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;
    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = el.dataset.target; });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10) || 0;
    var duration = 1200;
    var start = performance.now();
    function update(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(update);
  }

  // --- 3. 统一滚动处理 (合并所有滚动事件，减少监听器) ---
  var scrollTicking = false;
  var scrollCallbacks = [];

  function onScroll(cb) {
    scrollCallbacks.push(cb);
  }

  function initUnifiedScroll() {
    window.addEventListener('scroll', function () {
      if (!scrollTicking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          scrollCallbacks.forEach(function (cb) { cb(scrollY); });
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  // --- 4. 导航栏滚动效果 ---
  function initNavbarScroll() {
    var topbar = document.querySelector('.topbar');
    if (!topbar) return;
    var lastState = null;
    onScroll(function (scrollY) {
      var state = scrollY > 20;
      if (state !== lastState) {
        topbar.classList.toggle('scrolled', state);
        lastState = state;
      }
    });
    topbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  // --- 5. 滚动进度条 ---
  function initScrollProgress() {
    if (reduceAnimations) return;
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    var docHeight = 0;
    function updateDocHeight() {
      docHeight = document.documentElement.scrollHeight - window.innerHeight;
    }
    updateDocHeight();
    window.addEventListener('resize', updateDocHeight, { passive: true });
    onScroll(function (scrollY) {
      if (docHeight > 0) {
        bar.style.transform = 'scaleX(' + (scrollY / docHeight) + ')';
      }
    });
  }

  // --- 6. 磁吸按钮效果 (简化版) ---
  function initMagnetic() {
    if (reduceAnimations || isTouchDevice) return;
    var buttons = document.querySelectorAll('.btn-primary, .bce-btn-primary, .bce-btn-run');
    buttons.forEach(function (btn) {
      btn.classList.add('magnetic');
      var strength = 0.2;
      var ticking = false;
      btn.addEventListener('mousemove', function (e) {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var rect = btn.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = 'translate(' + (x * strength) + 'px, ' + (y * strength) + 'px)';
          ticking = false;
        });
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  // --- 初始化所有交互动画 ---
  function initInteractiveAnimations() {
    if (reduceAnimations) return;
    initUnifiedScroll();
    initRipple();
    initCounters();
    initNavbarScroll();
    initScrollProgress();
    initMagnetic();
  }

  setTimeout(function () { initInteractiveAnimations(); }, 200);
CL.interactive = {
    initRipple: initRipple,
    initTilt: initTilt,
    initGlow: initGlow,
    initCounters: initCounters,
    initParallax: initParallax,
    initNavbarScroll: initNavbarScroll,
    initScrollProgress: initScrollProgress,
    initMagnetic: initMagnetic,
    initAll: initInteractiveAnimations
  };
})(window);
