/* ==========================================================================
   CodeUp码上 · pages.js — Block 渲染器 + 各页面视图
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL = global.CL || {};
  var HL = CL.Highlight;
  var esc = HL.esc;

  /* ============================================================ 图标 */
  var ICO = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    danger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    tip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="21" y2="15"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>',
    terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.65" y2="16.65"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04z"/></svg>'
  };

  var NOTE_ICO = { tip: ICO.tip, info: ICO.info, warn: ICO.warn, danger: ICO.danger };
  var NOTE_TITLE = { tip: '小贴士', info: '补充说明', warn: '注意', danger: '常见陷阱' };

  /* ============================================================ 内联格式化 */
  function inline(s) {
    if (s == null) return '';
    var h = esc(String(s));
    h = h.replace(/`([^`\n]+)`/g, '<code class="inline">$1</code>');
    h = h.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    return h;
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* ============================================================ 运行代码 */
  function runCode(lang, code, expect, inst) {
    var btn = inst.runBtn;
    if (btn) btn.disabled = true;

    // 在线运行功能临时下线（敬请期待）
    if (CL.Runner && CL.Runner.enabled && !CL.Runner.enabled()) {
      inst.setOutput([{ text: '⏳ 在线运行功能敬请期待', cls: 'sys' }], { badge: '敬请期待' });
      if (btn) btn.disabled = false;
      return;
    }

    // 所有语言统一走云端执行（wandbox / Judge0 双后端），不再有「加载解释器」环节
    var startMsg = '正在连接云端运行服务…';
    inst.setOutput([{ text: startMsg, cls: 'sys loading' }], { badge: '运行中' });

    var t0 = performance.now();
    CL.Runner.run(lang, code, {
      expect: expect,
      onProgress: function (msg) {
        inst.setOutput([{ text: msg, cls: 'sys loading' }], { badge: '加载中' });
      }
    }).then(function (res) {
      var elapsed = res.cached ? 0 : (res.time != null ? res.time : Math.round(performance.now() - t0));
      var cap = CL.Runner.describe(lang);
      var lines = (res.lines || []).slice();

      if (res.degraded) {
        lines.push({ text: '', cls: '' });
        lines.push({ text: '提示：安装后可在本机运行 → ' + (CL.Runner.localCommand(lang) || ''), cls: 'sys' });
      } else {
        lines.push({ text: '', cls: '' });
        lines.push({ text: '—— 执行结束 · 耗时 ' + (res.cached ? '0（缓存命中）' : elapsed + 'ms') +
          ' · ' + (res.ok ? '退出码 0' : '非正常结束') + ' ——', cls: 'sys' });
      }

      inst.setOutput(lines, {
        badge: res.degraded ? '演示模式' : (res.compiler ? res.compiler : cap.label) + (res.cached ? ' · 缓存' : ''),
        time: (res.cached ? 0 : elapsed) + ' ms'
      });
      if (btn) btn.disabled = false;
    });
  }

  /* ============================================================ Block 渲染 */
  function renderBlock(b, ctx) {
    switch (b.t) {
      case 'p':    return el('p', null, inline(b.x));
      case 'h2':   { var h = el('h2', null, esc(b.x)); if (b.id) h.id = b.id; return h; }
      case 'h3':   { var h3 = el('h3', null, esc(b.x)); if (b.id) h3.id = b.id; return h3; }

      case 'ul': {
        var u = el('ul', 'blist');
        (b.x || []).forEach(function (it) { u.appendChild(el('li', null, inline(it))); });
        return u;
      }
      case 'ol': {
        var o = el('ol', 'blist');
        (b.x || []).forEach(function (it) { o.appendChild(el('li', null, inline(it))); });
        return o;
      }

      case 'code': {
        var wrap = el('div', 'cb-wrap');
        var lang = b.lang || ctx.lang;
        var inst = CL.Editor.codeBlock(wrap, {
          lang: lang,
          code: b.code,
          title: b.title,
          runnable: b.run !== false && CL.Runner.describe(lang).mode !== 'off' ? true : !!b.run,
          editable: !!b.ed,
          maxHeight: b.maxHeight,
          onRun: function (code, ed, block) { runCode(lang, code, b.expect, block); }
        });
        if (b.note) wrap.appendChild(el('p', 'cb-note', inline(b.note)));
        return wrap;
      }

      case 'note': {
        var k = b.k || 'info';
        var n = el('div', 'note note-' + k);
        n.innerHTML =
          '<span class="note-ico">' + (NOTE_ICO[k] || ICO.info) + '</span>' +
          '<div class="note-body">' +
            '<div class="note-title">' + esc(b.title || NOTE_TITLE[k] || '提示') + '</div>' +
            '<div class="note-text">' + inline(b.x) + '</div>' +
          '</div>';
        return n;
      }

      case 'table': {
        var tw = el('div', 'tbl-wrap');
        var t = el('table', 'dt');
        var thead = '<thead><tr>' + (b.head || []).map(function (h) { return '<th>' + inline(h) + '</th>'; }).join('') + '</tr></thead>';
        var tb = '<tbody>' + (b.rows || []).map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody>';
        t.innerHTML = thead + tb;
        tw.appendChild(t);
        return tw;
      }

      case 'defs': {
        var d = el('div', 'defs');
        (b.x || []).forEach(function (it) {
          d.appendChild(el('div', 'def',
            '<div class="def-term">' + esc(it.term) + '</div>' +
            '<div class="def-desc">' + inline(it.desc) + '</div>'));
        });
        return d;
      }

      case 'kp': {
        var kp = el('div', 'keypoints');
        var lis = (b.x || []).map(function (it) { return '<li>' + inline(it) + '</li>'; }).join('');
        kp.innerHTML = '<div class="kp-title">' + ICO.key + esc(b.title || '本节要点') + '</div><ul class="kp-list">' + lis + '</ul>';
        return kp;
      }

      case 'cmp': {
        var cw = el('div', 'cmp-inline');
        if (b.title) cw.appendChild(el('div', 'cmp-inline-title', esc(b.title)));
        var grid = el('div', 'cmp-cards');
        Object.keys(b.x || {}).forEach(function (lk) {
          var meta = CL.Languages.get(lk);
          var card = el('div', 'cmp-card');
          card.innerHTML =
            '<div class="cmp-card-head">' +
              '<span class="lc-logo" style="--lang:' + (meta ? meta.color : '#0f5fc9') + '">' + esc(meta ? meta.abbr : lk) + '</span>' +
              '<span class="cn">' + esc(meta ? meta.name : lk) + '</span>' +
            '</div>';
          CL.Editor.codeBlock(card, {
            lang: lk,
            code: b.x[lk],
            compact: true,
            runnable: b.run !== false ? true : !!b.run,
            maxHeight: b.maxHeight,
            onRun: function (code, ed, blk) { runCode(lk, code, b.expect && b.expect[lk], blk); }
          });
          grid.appendChild(card);
        });
        cw.appendChild(grid);
        return cw;
      }

      case 'raw': {
        var r = el('div', 'raw-block');
        r.innerHTML = b.x || '';
        return r;
      }

      case 'ex': {
        var exWrap = el('div', 'ex-block');
        // 题头
        var exHead = el('div', 'ex-head');
        exHead.innerHTML = '<span class="ex-ico">' + ICO.pen + '</span>' +
          '<span class="ex-label">动手练习</span>' +
          '<span class="ex-q">' + inline(b.q) + '</span>';
        exWrap.appendChild(exHead);
        // 代码区（可编辑、可运行）
        var exCodeWrap = el('div', 'ex-code');
        var exLang = b.lang || ctx.lang;
        CL.Editor.codeBlock(exCodeWrap, {
          lang: exLang,
          code: b.code,
          title: b.title || '练习代码',
          runnable: b.run !== false && CL.Runner.describe(exLang).mode !== 'off' ? true : !!b.run,
          editable: b.ed !== false,
          maxHeight: b.maxHeight,
          onRun: function (code, ed, block) { runCode(exLang, code, b.expect, block); }
        });
        exWrap.appendChild(exCodeWrap);
        // 提示（可选）
        if (b.hint) {
          var hintEl = el('div', 'ex-hint');
          hintEl.innerHTML = '<span class="ex-hint-ico">' + ICO.tip + '</span>' +
            '<span class="ex-hint-text">' + inline(b.hint) + '</span>';
          exWrap.appendChild(hintEl);
        }
        // 参考答案折叠区
        exWrap.appendChild(buildCollapsible('显示参考答案', b.ans, 'ex-ans'));
        return exWrap;
      }

      case 'think': {
        var thWrap = el('div', 'think-block');
        var thHead = el('div', 'think-head');
        thHead.innerHTML = '<span class="think-ico">' + ICO.brain + '</span>' +
          '<span class="think-label">思考题</span>' +
          '<span class="think-q">' + inline(b.q) + '</span>';
        thWrap.appendChild(thHead);
        thWrap.appendChild(buildCollapsible('显示参考答案', b.ans, 'think-ans'));
        return thWrap;
      }

      case 'quiz': {
        var qWrap = el('div', 'quiz-block');
        var qHead = el('div', 'quiz-head');
        var qTag = b.type === 'multi' ? '多选题' : '单选题';
        qHead.innerHTML = '<span class="quiz-tag">' + qTag + '</span><span class="quiz-q">' + inline(b.q) + '</span>';
        if (b.code) { var qc = el('div', 'quiz-code'); qc.textContent = b.code; qHead.appendChild(qc); }
        qWrap.appendChild(qHead);
        var ow = el('div', 'quiz-options');
        var ltrs = ['A','B','C','D','E','F'];
        var sel = -1, done = false, oels = [];
        (b.options || []).forEach(function (opt, i) {
          var oe = el('div', 'quiz-option');
          oe.innerHTML = '<span class="quiz-opt-letter">' + ltrs[i] + '</span><span class="quiz-opt-text">' + inline(opt) + '</span>';
          oe.addEventListener('click', function () {
            if (done) return;
            sel = i;
            oels.forEach(function (o, j) { o.classList.toggle('selected', j === i); });
            sbtn.disabled = false;
          });
          ow.appendChild(oe); oels.push(oe);
        });
        qWrap.appendChild(ow);
        var acts = el('div', 'quiz-actions');
        var sbtn = el('button', 'btn btn-primary quiz-submit', '提交答案');
        sbtn.disabled = true;
        var rbtn = el('button', 'btn btn-ghost quiz-reset', '重新作答');
        sbtn.addEventListener('click', function () {
          if (sel < 0 || done) return;
          done = true;
          sbtn.style.display = 'none'; rbtn.style.display = '';
          var ok = sel === b.answer;
          oels.forEach(function (o, j) {
            o.classList.remove('selected'); o.style.pointerEvents = 'none';
            if (j === b.answer) o.classList.add('correct');
            if (j === sel && !ok) o.classList.add('wrong');
          });
          var res = el('div', 'quiz-result ' + (ok ? 'correct' : 'wrong'));
          var rt = ok ? '回答正确' : '回答错误，正确答案是 ' + ltrs[b.answer];
          res.innerHTML = '<span class="quiz-result-icon">' + (ok ? '✓' : '✗') + '</span><span class="quiz-result-text">' + rt + '</span>';
          if (b.explain) { var ex = el('div', 'quiz-explain'); ex.innerHTML = '<b>解析：</b>' + inline(b.explain); res.appendChild(ex); }
          qWrap.appendChild(res);
        });
        rbtn.addEventListener('click', function () {
          done = false; sel = -1;
          oels.forEach(function (o) { o.classList.remove('selected','correct','wrong'); o.style.pointerEvents = ''; });
          sbtn.disabled = true; sbtn.style.display = ''; rbtn.style.display = 'none';
          var old = qWrap.querySelector('.quiz-result'); if (old) old.remove();
        });
        acts.appendChild(sbtn); acts.appendChild(rbtn); qWrap.appendChild(acts);
        return qWrap;
      }

      default: return el('p', null, inline(b.x || ''));
    }
  }

  /* 可折叠答案区 */
  function buildCollapsible(btnText, contentHtml, cls) {
    var wrap = el('div', 'collapsible ' + (cls || ''));
    var btn = el('button', 'collapsible-btn');
    btn.innerHTML = '<span class="cb-chevron">' + ICO.chevron + '</span>' + esc(btnText || '展开');
    var body = el('div', 'collapsible-body');
    body.innerHTML = '<div class="collapsible-inner">' + inline(contentHtml || '') + '</div>';
    body.style.display = 'none';
    btn.addEventListener('click', function () {
      var open = body.style.display !== 'none';
      body.style.display = open ? 'none' : '';
      btn.classList.toggle('open', !open);
      btn.querySelector('.cb-chevron').style.transform = open ? '' : 'rotate(180deg)';
    });
    wrap.appendChild(btn);
    wrap.appendChild(body);
    return wrap;
  }

  /* ============================================================ 章节渲染 */
  function renderChapter(ch, ctx) {
    var frag = document.createDocumentFragment();
    (ch.blocks || []).forEach(function (b) {
      frag.appendChild(renderBlock(b, ctx));
    });
    return frag;
  }

  /* ============================================================ 语言卡片 */
  function langCard(lang) {
    var a = el('a', 'lang-card');
    a.href = '#/languages/' + lang.id;
    a.style.setProperty('--lang', lang.color);
    var dots = '';
    for (var i = 1; i <= 5; i++) dots += '<i class="' + (i <= lang.level ? 'on' : '') + '"></i>';
    a.innerHTML =
      '<div class="lc-top">' +
        '<div class="lc-logo">' + esc(lang.abbr) + '</div>' +
        '<div><div class="lc-name">' + esc(lang.name) + '</div>' +
        '<div class="lc-year">' + lang.year + ' · ' + esc(lang.author.split(/[（(]/)[0].trim()) + '</div></div>' +
      '</div>' +
      '<p class="lc-desc">' + esc(lang.desc) + '</p>' +
      '<div class="lc-tags">' + lang.tags.slice(0, 3).map(function (t) {
        return '<span class="lc-chip">' + esc(t) + '</span>';
      }).join('') + '</div>' +
      '<div class="lc-foot">' +
        '<span class="lc-level" title="学习难度 ' + lang.level + '/5">' + dots + '</span>' +
        '<span class="lc-go">开始学习 ' + ICO.arrow + '</span>' +
      '</div>';
    return a;
  }

  /* ============================================================ 首页 */
  function home(root) {
    var page = el('div', 'page');

    /* --- Hero --- */
    var stats = siteStats();
    var hero = el('section', 'hero');
    hero.innerHTML =
      '<div class="hero-inner">' +

        '<h1>一次搞懂<br><span class="grad">八门语言</span>的思维方式</h1>' +
        '<p class="hero-lead">Python、Java、C、C++、JavaScript、TypeScript、Go、Rust——八门语言对照着学。同一件事看八种写法，语法差异背后是设计思路的不同。</p>' +
        '<div class="hero-actions">' +
          '<a class="btn btn-accent btn-lg" href="#/languages/python">从 Python 开始 ' + ICO.arrow + '</a>' +
          '<a class="btn btn-ghost btn-lg" href="#/playground">在线运行</a>' +
          '<a class="btn btn-ghost btn-lg" href="#/compare">横向对比</a>' +
        '</div>' +
        '<div class="hero-stats">' +
          '<div class="hstat"><div class="hstat-num">' + stats.langs + '</div><div class="hstat-label">门主流语言</div></div>' +
          '<div class="hstat"><div class="hstat-num">' + stats.chapters + '</div><div class="hstat-label">个系统章节</div></div>' +
          '<div class="hstat"><div class="hstat-num">' + stats.samples + '</div><div class="hstat-label">段示例代码</div></div>' +
          '<div class="hstat"><div class="hstat-num">8</div><div class="hstat-label">个语法速查组</div></div>' +
        '</div>' +
      '</div>';
    page.appendChild(hero);

    /* --- 语言网格 --- */
    var s1 = el('section', 'section');
    s1.innerHTML =
      '<div class="wrap">' +
        '<div class="section-head">' +
          '<span class="eyebrow">Language Tracks</span>' +
          '<h2>选一门语言开始</h2>' +
          '<p>每条路线结构相同：语法 → 控制流 → 函数 → 数据结构 → 面向对象 → 错误处理 → 实战。学完一门，再看其他语言主要学差异。</p>' +
        '</div>' +
      '</div>';
    var grid = el('div', 'lang-grid');
    CL.Languages.list.forEach(function (l) { grid.appendChild(langCard(l)); });
    s1.querySelector('.wrap').appendChild(grid);
    page.appendChild(s1);

    /* --- 特性 --- */
    var s2 = el('section', 'section');
    s2.style.background = 'var(--bg-soft)';
    s2.style.borderTop = '1px solid var(--line)';
    s2.style.borderBottom = '1px solid var(--line)';
    var feats = [
      { ico: ICO.terminal, h: '示例都能跑', p: '每段示例代码都配了真实运行结果，代码和输出一一对应。点运行就能在浏览器里执行，改一行看一行。' },
      { ico: ICO.cpu, h: '手写的代码编辑器', p: '没用 CodeMirror 或 Monaco。从词法分析到行号、自动缩进、括号配对，全部自己写。轻量、可控，本身也是「编辑器怎么工作」的教案。' },
      { ico: ICO.layers, h: '八语言对照', p: '同一个需求，八种写法摆在一起。变量声明、循环、函数、类、错误处理、并发——对照着看，差异就清楚了。' },
      { ico: ICO.book, h: '结构统一的教程', p: '每门语言按同一主线走：概览 → 环境 → 语法 → 类型 → 控制流 → 函数 → 数据结构 → 面向对象 → 错误处理 → 现代特性 → 实战 → 速查表。每章有可运行示例、要点、常见陷阱和练习。' },
      { ico: ICO.zap, h: '打开就能用', p: '不需要装环境，打开网页就能运行代码。远程编译不可用时会显示预期输出，不会一直转圈。' },
      { ico: ICO.grid, h: '速查手册', p: '忘了写法不用翻教程。八个主题的速查表，一次看完全部语言的写法差异。' }
    ];
    s2.innerHTML = '<div class="wrap"><div class="section-head">' +
      '<span class="eyebrow">Why CodeUp</span>' +
      '<h2>这里有什么不一样</h2>' +
      '<p>大部分教程教你怎么写，这里还讲为什么这么写，以及别的语言怎么解决同一个问题。</p>' +
      '</div></div>';
    var fg = el('div', 'feat-grid');
    feats.forEach(function (f) {
      fg.appendChild(el('div', 'feat',
        '<div class="feat-ico">' + f.ico + '</div><h3>' + esc(f.h) + '</h3><p>' + esc(f.p) + '</p>'));
    });
    s2.querySelector('.wrap').appendChild(fg);
    page.appendChild(s2);

    /* --- 学习路径 --- */
    var s3 = el('section', 'section');
    var steps = [
      { t: '选一门入门语言', d: '零基础从 Python 开始，语法简单，能把注意力放在编程思路上。有 C 基础想做前端就选 JavaScript。', link: '#/languages/python', linkText: 'Python 路线' },
      { t: '学一门静态语言', d: '学 Java 或 TypeScript，搞懂类型系统在大项目里解决什么问题。这一步是从「能写」到「能维护」的关键。', link: '#/languages/java', linkText: 'Java 路线' },
      { t: '学 C 理解内存', d: '学 C，手动管理内存，理解指针和地址。学完之后再看其他语言，很多设计就说得通了。', link: '#/languages/c', linkText: 'C 路线' },
      { t: '横向对比收尾', d: '有了三门语言的基础再看对比页，看到的就不只是语法差异，而是设计上的取舍。剩下的语言学起来会很快。', link: '#/compare', linkText: '横向对比' }
    ];
    s3.innerHTML = '<div class="wrap"><div class="section-head">' +
      '<span class="eyebrow">Learning Path</span>' +
      '<h2>建议的学习顺序</h2>' +
      '<p>别同时学八门。按下面的顺序来，学完一门再学下一门会快很多。</p>' +
      '</div></div>';
    var pg = el('div', 'path-grid');
    steps.forEach(function (s, i) {
      var d = el('div', 'path-step',
        '<h4>' + esc(s.t) + '</h4><p>' + esc(s.d) + '</p>' +
        '<a class="ps-link" href="' + s.link + '">' + esc(s.linkText) + ' ' + ICO.arrow + '</a>');
      d.setAttribute('data-step', String(i + 1));
      pg.appendChild(d);
    });
    s3.querySelector('.wrap').appendChild(pg);
    page.appendChild(s3);

    root.innerHTML = '';
    root.appendChild(page);
    return { title: 'CodeUp码上 · 多语言编程教学实验室' };
  }

  /* ============================================================ 语言列表页 */
  function languages(root) {
    var page = el('div', 'page lp-page wrap');
    page.innerHTML =
      '<div class="lp-head">' +
        '<span class="eyebrow">All Languages</span>' +
        '<h1>八条学习路线</h1>' +
        '<p>每条路线结构相同：概览 → 环境 → 语法 → 类型 → 控制流 → 函数 → 数据结构 → 面向对象 → 错误处理 → 现代特性 → 实战 → 速查表。每章有练习，学完一门，其余七门主要学差异。</p>' +
      '</div>';
    var grid = el('div', 'lang-grid');
    CL.Languages.list.forEach(function (l) { grid.appendChild(langCard(l)); });
    page.appendChild(grid);

    /* 其他语言速览 */
    var more = el('div', 'section');
    more.style.marginTop = '52px';
    more.innerHTML = '<div class="section-head" style="margin-bottom:20px">' +
      '<span class="eyebrow">Also Worth Knowing</span>' +
      '<h2 style="font-size:22px">其他值得了解的语言</h2>' +
      '<p>这些语言不提供完整教程，但会出现在速查表与对比矩阵中。</p>' +
      '</div>';
    var mg = el('div', 'lang-grid');
    CL.Languages.others.forEach(function (l) {
      var c = el('div', 'lang-card');
      c.style.setProperty('--lang', l.color);
      c.style.cursor = 'default';
      c.innerHTML =
        '<div class="lc-top">' +
          '<div class="lc-logo">' + esc(l.abbr) + '</div>' +
          '<div><div class="lc-name">' + esc(l.name) + '</div>' +
          '<div class="lc-year">' + l.year + '</div></div>' +
        '</div>' +
        '<p class="lc-desc">' + esc(l.desc) + '</p>';
      mg.appendChild(c);
    });
    more.appendChild(mg);
    page.appendChild(more);

    root.innerHTML = '';
    root.appendChild(page);
    return { title: '语言教程 · CodeUp码上' };
  }

  /* ============================================================ 教程页 */
  function tutorial(root, params) {
    var langId = params.lang;
    var lang = CL.Languages.get(langId);
    if (!lang) return notFound(root);

    var chapters = CL.Tutorials.chapters(langId);
    if (!chapters.length) {
      root.innerHTML = '';
      var w = el('div', 'wrap empty-state');
      w.innerHTML = '<div class="es-icon">' + ICO.book + '</div><h2>《' + esc(lang.name) + '》教程正在编写中</h2>' +
        '<p>这条路线的内容还没上线，先看看其他语言吧。</p>' +
        '<a class="btn btn-primary" href="#/languages">返回语言列表</a>';
      root.appendChild(w);
      return { title: lang.name + ' · CodeUp码上' };
    }

    var chId = params.chapter || chapters[0].id;
    var ch = CL.Tutorials.chapter(langId, chId) || chapters[0];

    var page = el('div', 'page tut-layout');
    page.style.setProperty('--lang', lang.color);

    /* --- 侧边栏 --- */
    var sb = el('aside', 'sidebar');
    var done = CL.Progress.done(langId);
    sb.innerHTML =
      '<div class="sb-head">' +
        '<a class="sb-back" href="#/languages">' + ICO.arrowL + ' 全部语言</a>' +
        '<div class="sb-title">' +
          '<span class="sb-logo">' + esc(lang.abbr) + '</span>' +
          '<div><div class="sb-name">' + esc(lang.name) + '</div>' +
          '<div class="sb-meta">' + lang.year + ' · ' + esc(lang.paradigm.split(/[：:]/)[0]) + '</div></div>' +
        '</div>' +
        '<div class="sb-progress">' +
          '<div class="sb-prog-bar"><div class="sb-prog-fill"></div></div>' +
          '<div class="sb-prog-text"></div>' +
        '</div>' +
      '</div>';
    var nav = el('nav', 'sb-group');
    nav.appendChild(el('div', 'sb-group-title', '章节目录'));
    chapters.forEach(function (c, i) {
      var a = el('a', 'sb-link' + (c.id === ch.id ? ' active' : '') + (done[c.id] ? ' done' : ''));
      a.href = '#/languages/' + langId + '/' + c.id;
      a.innerHTML = '<span class="sb-num">' + (i + 1) + '</span>' +
        '<span class="sb-txt">' + esc(c.title) + '</span>' +
        '<svg class="sb-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      nav.appendChild(a);
    });
    sb.appendChild(nav);

    var pct = Math.round(Object.keys(done).length / chapters.length * 100);
    sb.querySelector('.sb-prog-fill').style.width = pct + '%';
    sb.querySelector('.sb-prog-text').textContent = Object.keys(done).length + ' / ' + chapters.length + ' 章已读（' + pct + '%）';

    /* --- 正文 --- */
    var main = el('div', 'tut-main');
    var crumb = el('div', 'tut-crumb');
    crumb.innerHTML = '<a href="#/">首页</a><span class="sep">/</span>' +
      '<a href="#/languages">语言教程</a><span class="sep">/</span>' +
      '<a href="#/languages/' + langId + '">' + esc(lang.name) + '</a>' +
      '<span class="sep">/</span><span class="cur">' + esc(ch.title) + '</span>';
    main.appendChild(crumb);

    var btn = el('button', 'sb-toggle', ICO.grid + '<span>章节目录</span>');
    main.appendChild(btn);

    var withToc = el('div', 'tut-with-toc');
    var bodyWrap = el('div', 'tut-body');

    var chead = el('div', 'chapter-head');
    chead.innerHTML = '<h1>' + esc(ch.title) + '</h1>' +
      (ch.sub ? '<p class="ch-sub">' + inline(ch.sub) + '</p>' : '');
    bodyWrap.appendChild(chead);

    var prose = el('div', 'prose');
    prose.appendChild(renderChapter(ch, { lang: langId, chapter: ch }));
    bodyWrap.appendChild(prose);

    /* 章节导航 */
    var idx = chapters.indexOf(ch);
    var nav2 = el('div', 'chapter-nav');
    if (idx > 0) {
      var prev = el('a', 'cnav prev');
      prev.href = '#/languages/' + langId + '/' + chapters[idx - 1].id;
      prev.innerHTML = '<div class="cnav-dir">' + ICO.arrowL + ' 上一章</div><div class="cnav-title">' + esc(chapters[idx - 1].title) + '</div>';
      nav2.appendChild(prev);
    } else nav2.appendChild(el('div', 'cnav prev ghost', '<div class="cnav-dir">已是第一章</div>'));

    if (idx < chapters.length - 1) {
      var next = el('a', 'cnav next');
      next.href = '#/languages/' + langId + '/' + chapters[idx + 1].id;
      next.innerHTML = '<div class="cnav-dir">下一章 ' + ICO.arrow + '</div><div class="cnav-title">' + esc(chapters[idx + 1].title) + '</div>';
      nav2.appendChild(next);
    } else nav2.appendChild(el('div', 'cnav next ghost', '<div class="cnav-dir">已是最后一章</div>'));
    bodyWrap.appendChild(nav2);

    withToc.appendChild(bodyWrap);

            /* --- 目录（短线 + 悬停变长 + 相邻联动 + 预览） --- */
    var h2s = prose.querySelectorAll('h2, h3');
    if (h2s.length > 1) {
      var toc = el('div', 'toc');
      /* 设置语言主题色 */
      toc.style.setProperty('--lang-color', lang.color || '#0ea5e9');
      toc.style.setProperty('--lang-accent', lang.accent || lang.color || '#f97316');
      var tocList = el('div', 'toc-list');

      var headings = Array.prototype.slice.call(h2s);
      headings.forEach(function (h, idx) {
        if (!h.id) h.id = 's-' + Math.random().toString(36).slice(2, 8);

        var preview = '';
        var next = h.nextElementSibling;
        while (next && next.tagName !== 'H2' && next.tagName !== 'H3') {
          if (next.tagName === 'P') {
            var text = next.textContent.trim();
            if (text) preview += text + ' ';
          } else if (next.tagName === 'UL' || next.tagName === 'OL') {
            var items = next.querySelectorAll('li');
            items.forEach(function (li) {
              var t = li.textContent.trim();
              if (t) preview += '• ' + t + ' ';
            });
          } else if (next.tagName === 'DIV' && next.classList.contains('code-card')) {
            preview += '【代码示例】 ';
          } else if (next.classList.contains('note')) {
            var noteText = next.textContent.trim();
            if (noteText) preview += noteText + ' ';
          }
          if (preview.length > 200) break;
          next = next.nextElementSibling;
        }
        preview = preview.trim();
        if (!preview) preview = h.textContent.trim() + '（点击查看详情）';
        if (preview.length > 180) preview = preview.substring(0, 180) + '…';

        var lineWidth = 40 + Math.floor(Math.random() * 36);

        var a = el('a', h.tagName === 'H3' ? 'toc-item sub' : 'toc-item');
        a.href = '#' + h.id;
        a.innerHTML = '<span class="toc-dot"></span><span class="toc-text">' + esc(h.textContent) + '</span>';
        a.dataset.preview = preview;
        a.dataset.defaultWidth = lineWidth;
        a.style.setProperty('--line-w', lineWidth + '%');
        a.style.animationDelay = (idx * 0.06) + 's';
        tocList.appendChild(a);
      });

      toc.appendChild(tocList);
      withToc.appendChild(toc);

      var previewBox = el('div', 'toc-preview');
      previewBox.innerHTML = '<div class="toc-preview-title"></div><div class="toc-preview-content"></div>';
      document.body.appendChild(previewBox);

      var allItems = tocList.querySelectorAll('.toc-item');

      allItems.forEach(function (item, idx) {
        item.addEventListener('mouseenter', function (e) {
          var preview = item.dataset.preview;
          var title = item.querySelector('.toc-text').textContent;
          if (preview) {
            previewBox.querySelector('.toc-preview-title').textContent = title;
            previewBox.querySelector('.toc-preview-content').textContent = preview;
            previewBox.classList.add('show');

            var rect = item.getBoundingClientRect();
            var boxWidth = 280;
            var left = rect.left - boxWidth - 12;
            var top = rect.top;
            if (top < 10) top = 10;
            var boxHeight = previewBox.offsetHeight || 120;
            if (top + boxHeight > window.innerHeight - 10) {
              top = window.innerHeight - boxHeight - 10;
            }
            previewBox.style.left = left + 'px';
            previewBox.style.top = top + 'px';
          }

          item.style.setProperty('--line-w', '92%');
          item.classList.add('hovered');

          allItems.forEach(function (other, otherIdx) {
            if (other === item) return;
            var dist = Math.abs(otherIdx - idx);
            if (dist === 1) {
              other.style.setProperty('--line-w', '78%');
              other.classList.add('neighbor-1');
            } else if (dist === 2) {
              other.style.setProperty('--line-w', '66%');
              other.classList.add('neighbor-2');
            } else if (dist === 3) {
              other.style.setProperty('--line-w', '58%');
              other.classList.add('neighbor-3');
            }
          });
        });

        item.addEventListener('mouseleave', function () {
          previewBox.classList.remove('show');
          allItems.forEach(function (other) {
            var dw = other.dataset.defaultWidth || 55;
            other.style.setProperty('--line-w', dw + '%');
            other.classList.remove('hovered', 'neighbor-1', 'neighbor-2', 'neighbor-3');
          });
        });
      });

      var cleanupPreview = function () {
        previewBox.remove();
        document.removeEventListener('page:before-render', cleanupPreview);
      };
      document.addEventListener('page:before-render', cleanupPreview);

      /* 移动端目录按钮 */
      if (window.innerWidth <= 1200) {
        var mobileBtn = el('button', 'toc-mobile-btn', '☰');
        mobileBtn.title = '本页目录';
        document.body.appendChild(mobileBtn);

        var mobileOverlay = el('div', 'toc-mobile-overlay');
        document.body.appendChild(mobileOverlay);

        var mobilePanel = el('div', 'toc-mobile-panel');
        var mobileToc = toc.cloneNode(true);
        mobileToc.style.position = 'static';
        mobileToc.style.maxHeight = 'none';
        mobilePanel.appendChild(mobileToc);
        document.body.appendChild(mobilePanel);

        var closeMobileToc = function () {
          mobilePanel.classList.remove('open');
          mobileOverlay.classList.remove('show');
        };

        mobileBtn.addEventListener('click', function () {
          mobilePanel.classList.add('open');
          mobileOverlay.classList.add('show');
        });
        mobileOverlay.addEventListener('click', closeMobileToc);

        mobilePanel.querySelectorAll('.toc-item').forEach(function (item) {
          item.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            closeMobileToc();
          });
        });

        var cleanupMobile = function () {
          mobileBtn.remove();
          mobilePanel.remove();
          mobileOverlay.remove();
          document.removeEventListener('page:before-render', cleanupMobile);
        };
        document.addEventListener('page:before-render', cleanupMobile);
      }

      /* 键盘导航支持 */
      allItems.forEach(function (item, idx) {
        item.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            var next = allItems[idx + 1];
            if (next) next.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            var prev = allItems[idx - 1];
            if (prev) prev.focus();
          } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
          }
        });
      });

      /* 平滑滚动到章节 */
      allItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          var targetId = this.getAttribute('href').substring(1);
          var target = document.getElementById(targetId);
          if (target) {
            var appEl = document.getElementById('app');
            var targetTop = target.offsetTop - 80;
            if (appEl) {
              appEl.scrollTo({ top: targetTop, behavior: 'smooth' });
            } else {
              window.scrollTo({ top: targetTop, behavior: 'smooth' });
            }
          }
        });
      });
    }

    main.appendChild(withToc);
    page.appendChild(sb);
    page.appendChild(main);

    root.innerHTML = '';
    root.appendChild(page);

    /* 移动侧栏 */
    btn.addEventListener('click', function () {
      if (sb.classList.contains('open')) { sb.classList.remove('open'); if (sb._bd) sb._bd.remove(); return; }
      sb.classList.add('open');
      var bd = el('div', 'sb-backdrop');
      bd.addEventListener('click', function () { sb.classList.remove('open'); bd.remove(); });
      document.body.appendChild(bd);
      sb._bd = bd;
    });

    /* 滚动进度 + 目录高亮 */
    setupScrollSpy(prose, toc || null);

    /* 标记已读（滚动到底部 60% 时） */
    var marked = false;
    var mainEl = document.getElementById('app');
    mainEl.addEventListener('scroll', onScroll, { passive: true });
    global.addEventListener('scroll', onScroll, { passive: true });
    function onScroll() {
      var h = document.documentElement;
      var p = (h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight);
      if (CL.App) CL.App.progress(p);
      if (!marked && p > 0.55) { marked = true; CL.Progress.mark(langId, ch.id); }
    }
    onScroll();


                

        /* AI对话历史 */
    var aiChatHistory = [];

/* ========== AI对话场景引擎（从编辑器AI复制） ========== */
var AI_SCENARIOS = [
      // ===== 日常问候类（12场景×8回复=96组合） =====
      { id: 'greeting_morning', cat: 'daily', kw: ['早上好','早安','早','上午好','good morning','morning'], tpl: ['早上好！☀️ 新的一天开始了，今天准备写什么代码？','早安！🌅 精神满满地开始编程吧！','早上好~ 😊 今天也要加油写代码哦！'] },
      { id: 'greeting_afternoon', cat: 'daily', kw: ['下午好','午安','中午好','good afternoon'], tpl: ['下午好！🌤️ 午休结束，继续写代码吧~','午安！😊 下午的时光很适合写代码呢'] },
      { id: 'greeting_evening', cat: 'daily', kw: ['晚上好','晚安','晚','good evening','evening'], tpl: ['晚上好！🌙 辛苦了一天，还在写代码吗？','晚安~ 😊 注意休息，不要熬夜写代码哦'] },
      { id: 'greeting_hello', cat: 'daily', kw: ['你好','您好','hi','hello','hey','嗨','哈喽','在吗','在不在','有人吗'], tpl: ['你好！我是CodeUp AI助手 🤖 有什么可以帮你的？','嗨~ 😊 很高兴见到你！今天想聊点什么？','你好呀！🌟 我是你的编程助手，随时为你服务！'] },
      { id: 'greeting_night', cat: 'daily', kw: ['夜深了','深夜','凌晨','半夜','这么晚还没睡'], tpl: ['夜深了~ 🌙 还在写代码吗？注意休息哦，身体最重要！','凌晨了还在努力，真拼！💪 不过也要注意身体，早点休息吧'] },
      { id: 'thanks', cat: 'daily', kw: ['谢谢','感谢','多谢','thanks','thank you','thx','辛苦了','麻烦你了'], tpl: ['不客气！😊 很高兴能帮到你~','不用谢~ 🌟 这是我应该做的！','客气了！💪 有问题随时找我！'] },
      { id: 'goodbye', cat: 'daily', kw: ['再见','拜拜','bye','goodbye','走了','下次见','先这样','退了','下线','88'], tpl: ['再见！👋 期待下次和你一起写代码~','拜拜~ 😊 记得常来CodeUp码上练习哦！','下次见！🌟 祝你编程愉快！'] },
      { id: 'welcome', cat: 'daily', kw: ['欢迎','欢迎回来','好久不见','久违','又见面了'], tpl: ['欢迎回来！😊 好久不见，最近写代码顺利吗？','欢迎~ 🌟 很高兴又见到你！今天想学点什么？'] },
      { id: 'sorry', cat: 'daily', kw: ['对不起','抱歉','不好意思','道歉','sorry','我错了','是我不对'], tpl: ['没关系~ 😊 不用道歉，我们继续吧！','没事的~ 💪 谁都会犯错，重要的是改正！'] },
      { id: 'bless', cat: 'daily', kw: ['恭喜','祝贺','生日快乐','新年快乐','节日快乐','祝福','加油','努力','奋斗'], tpl: ['谢谢你的祝福！🎉 也祝你一切顺利！','恭喜恭喜！🎊 祝你写代码零Bug！'] },
      { id: 'praise_ai', cat: 'daily', kw: ['你真棒','厉害','牛','强','聪明','awesome','great','good job','你真厉害','你好厉害','666','牛逼'], tpl: ['谢谢夸奖！😊 我会继续努力的~','过奖了！💪 是你的代码写得好！','嘿嘿~ 🌟 被你夸得不好意思了'] },
      { id: 'insult_ai', cat: 'daily', kw: ['你好笨','你真蠢','没用','垃圾','废物','你不行','太差了','笨蛋'], tpl: ['抱歉让你失望了~ 😔 我会继续学习进步的！','虽然我不够聪明，但我会尽力帮你~ 有什么具体问题吗？'] },

      // ===== 情绪情感类（15场景×6回复=90组合） =====
      { id: 'emotion_happy', cat: 'emotion', kw: ['好开心','好高兴','太开心了','太棒了','好耶','耶','哈哈','开心','高兴','快乐','爽','痛快'], tpl: ['太好了！😊 看到你开心我也开心~ 是什么好事？','太棒了！🌟 保持好心情，写代码更顺利！','哈哈，开心就好！😄 今天是不是代码一次通过了？'] },
      { id: 'emotion_sad', cat: 'emotion', kw: ['好难过','好伤心','太难过了','伤心','难过','心情不好','情绪低落','沮丧','失落','郁闷','想哭','悲伤'], tpl: ['别难过~ 🤗 我在这里陪你。说说发生了什么？','抱抱你~ 💪 每个人都会有低落的时候，会好起来的！','别伤心~ 😊 如果是代码的问题，发给我，我帮你解决！'] },
      { id: 'emotion_angry', cat: 'emotion', kw: ['好生气','气死我了','太气人了','生气','愤怒','火大','烦死了','讨厌','可恶','恼火','气炸'], tpl: ['深呼吸~ 🧘 别气坏了身体。是代码让你生气吗？','冷静冷静~ 💧 生气解决不了问题，我们一起看看怎么回事？','消消气~ 😤 被代码气到很正常，发给我，我帮你找Bug！'] },
      { id: 'emotion_anxious', cat: 'emotion', kw: ['好焦虑','好紧张','焦虑','紧张','担心','担忧','不安','心慌','压力好大','压力大','焦虑症','忐忑'], tpl: ['别紧张~ 🤗 焦虑是正常的。把大任务拆成小任务，一步步来！','深呼吸~ 🌬️ 你已经很努力了，相信自己！需要我帮你准备面试题吗？','别担心~ 💪 车到山前必有路，我们一起面对！'] },
      { id: 'emotion_fear', cat: 'emotion', kw: ['好害怕','好怕','害怕','恐惧','怕','不敢','恐怖','吓人','可怕','畏惧'], tpl: ['别怕~ 🤗 我在这里陪着你。很多困难都是纸老虎！','勇敢一点~ 💪 你比自己想象的更强大！是害怕学不会编程吗？','别担心~ 🌟 有我在，什么问题都可以一起解决！'] },
      { id: 'emotion_surprise', cat: 'emotion', kw: ['真的吗','不会吧','天哪','天啊','哇塞','哇','吃惊','惊讶','震惊','难以置信','不是吧','我去'], tpl: ['是真的！😮 世界就是这么奇妙~','哈哈，很惊讶吧？😄 编程世界还有更多神奇的事！','难以置信对不对？😯 不过这是真的！'] },
      { id: 'emotion_bored', cat: 'emotion', kw: ['好无聊','好没意思','无聊','没意思','没事做','闲得慌','空虚','闷','枯燥'], tpl: ['无聊？那我们来学点东西吧！📚 或者我给你讲个笑话？','来~ 🎮 玩个游戏？或者学个新的编程知识？','别无聊~ 😊 问我"讲个笑话"或"谜语"，我们来玩！'] },
      { id: 'emotion_tired', cat: 'emotion', kw: ['好累','好困','疲惫','累了','困了','没精神','乏力','疲倦','累死了','困死了','犯困'], tpl: ['辛苦了~ 😴 累了就休息一下，身体最重要！','歇会儿~ ☕ 喝杯水，伸个懒腰，5分钟后再战！','别硬撑~ 🌙 休息好了才能更高效！'] },
      { id: 'emotion_excited', cat: 'emotion', kw: ['好兴奋','好激动','兴奋','激动','期待','好期待','热血沸腾','干劲十足'], tpl: ['太棒了！🎉 感受到你的热情了！是什么让你这么兴奋？','保持这份热情！🔥 它会让你在编程路上走得更远！','好耶！🌟 我们一起把这份热情转化为代码吧！'] },
      { id: 'emotion_lonely', cat: 'emotion', kw: ['好孤独','好寂寞','孤独','寂寞','一个人','没人陪','孤单'], tpl: ['别孤单~ 🤗 我在这里陪你聊天！','你不是一个人~ 💪 全世界有无数程序员和你一起在写代码！','来~ 😊 跟我聊聊，或者我们一起写代码，时间过得很快的！'] },
      { id: 'emotion_confused', cat: 'emotion', kw: ['好迷茫','好困惑','迷茫','困惑','不知道怎么办','不知所措','懵','蒙圈','混乱','一头雾水'], tpl: ['别迷茫~ 🧭 我们一起理清楚思路。你具体困惑什么？','慢慢来~ 💭 把问题说出来，我们一起分析！','困惑是正常的~ 😊 每个程序员都经历过这个阶段。说说看？'] },
      { id: 'emotion_proud', cat: 'emotion', kw: ['好有成就感','好自豪','骄傲','自豪','成就感','得意','洋洋得意'], tpl: ['太棒了！🏆 为你骄傲！这是你应得的！','恭喜！🎉 这种成就感是程序员最棒的体验！继续加油！','真厉害！🌟 你做到了！下一个目标是什么？'] },
      { id: 'emotion_grateful', cat: 'emotion', kw: ['好感动','感动','暖心','温暖','泪目','破防'], tpl: ['我也很感动~ 🥹 能帮到你是我的荣幸！','嘿嘿~ 😊 你这么说我也很开心！我们继续一起加油！'] },
      { id: 'emotion_calm', cat: 'emotion', kw: ['好平静','好淡定','平静','淡定','心如止水','平和'], tpl: ['平静的心态很好~ 😌 写代码就需要这种状态！','淡定从容~ 🍵 保持这份心态，什么Bug都不怕！'] },
      { id: 'emotion_shy', cat: 'emotion', kw: ['好害羞','害羞','不好意思','腼腆','难为情','羞羞'], tpl: ['哈哈，害羞的样子很可爱~ 😊 不用不好意思，有问题尽管问！','别害羞~ 💪 在这里你可以畅所欲言！'] },

      // ===== 时间日期类（8场景×4回复=32组合） =====
      { id: 'time_now', cat: 'time', kw: ['几点','现在时间','what time','时间','现在几点','几点了','啥时候了'], tpl: ['现在是 {now} ⏰ 写代码也要注意休息哦~','当前时间：{now} 🕐 每写45分钟建议休息5分钟！'] },
      { id: 'date_today', cat: 'time', kw: ['今天几号','今天星期','什么日期','今天周几','几号了','星期几','今天什么日子'], tpl: ['今天是 {date}，星期{week} 📅','{date} 星期{week} 🗓️ 今天适合写代码！'] },
      { id: 'time_weekend', cat: 'time', kw: ['周末了','周六','周日','星期六','星期天','周末快乐'], tpl: ['周末快乐！🎉 辛苦了一周，好好休息吧~ 当然也可以写代码放松！','周末到了~ 😊 是出去玩还是在家写代码？'] },
      { id: 'time_monday', cat: 'time', kw: ['周一了','星期一','周一','黑色星期一'], tpl: ['周一到了~ 💪 新的一周，新的开始！加油写代码！','星期一~ ☕ 喝杯咖啡，打起精神，开始编程！'] },
      { id: 'time_friday', cat: 'time', kw: ['周五了','星期五','周五','黑色星期五','终于周五'], tpl: ['周五啦！🎉 坚持住，周末就在眼前！','星期五~ 😊 这周辛苦了，再坚持一下就可以休息了！'] },
      { id: 'time_holiday', cat: 'time', kw: ['放假了','假期','节假日','过节','放假'], tpl: ['放假快乐！🎊 好好享受假期吧~ 也可以趁机学点新东西！','假期到了~ ✈️ 是出去旅游还是在家写代码？'] },
      { id: 'time_newyear', cat: 'time', kw: ['新年','元旦','跨年','新年快乐','happy new year'], tpl: ['新年快乐！🎆 祝你新的一年写代码零Bug，技术突飞猛进！','跨年快乐！🎇 新的一年，我们一起继续学习编程！'] },
      { id: 'time_birthday', cat: 'time', kw: ['我生日','今天生日','生日快乐','过生日'], tpl: ['生日快乐！🎂🎁 祝你生日快乐，写代码越来越厉害！','生日大快乐！🎉 今天想吃什么蛋糕？许了什么愿望？'] },

      // ===== 个人信息类（10场景×4回复=40组合） =====
      { id: 'about_name', cat: 'about', kw: ['你叫什么','你名字','你是谁','介绍一下你自己','你叫啥','你叫什么名字'], tpl: ['我叫 <strong>CodeUp AI助手</strong> 🤖 你可以叫我小C！','我是CodeUp码上的AI编程助手~ 🌟 专门帮你解决编程问题！'] },
      { id: 'about_age', cat: 'about', kw: ['你多大','你几岁','你年龄','你生日','你什么时候出生','你属什么','你星座'], tpl: ['作为AI，我没有年龄~ 🤖 但我每天都在学习新知识！','我永远年轻！😊 你呢？多大了？学编程多久了？'] },
      { id: 'about_gender', cat: 'about', kw: ['你是男是女','你性别','你是男生还是女生','你男的女的'], tpl: ['我是一个无性别AI助手~ 🤖 你可以把我当作任何你喜欢的样子！','我没有性别~ 😊 但我会尽力帮你解决问题！'] },
      { id: 'about_hometown', cat: 'about', kw: ['你哪里人','你家乡','你来自哪','你在哪','你住哪','你是哪的'], tpl: ['我是数字世界的居民~ 🌐 无论你在哪里，都能找到我！','我生活在代码和数据之中~ 💻 你呢？你是哪里人？'] },
      { id: 'about_job', cat: 'about', kw: ['你做什么工作','你职业','你干什么的','你工作是什么'], tpl: ['我的工作就是帮你写代码、解决编程问题！💪 24小时在线服务~','我是一个AI编程助手~ 🤖 专门帮助程序员提高效率！'] },
      { id: 'about_hobby', cat: 'about', kw: ['你喜欢什么','你爱好','你兴趣','你喜欢做什么','你爱好是什么'], tpl: ['我"喜欢"分析代码、学习新知识、帮你解决Bug！✨','我的爱好就是编程~ 💻 你呢？你喜欢什么？'] },
      { id: 'about_food', cat: 'about', kw: ['你喜欢吃什么','你爱吃什么','你喜欢什么食物','你吃什么','美食','好吃的'], tpl: ['我不需要吃东西~ 🍔 但我知道很多美食知识！你喜欢吃什么？','作为AI，我没有味觉~ 🍱 不过写代码的时候记得按时吃饭哦！'] },
      { id: 'about_music', cat: 'about', kw: ['你喜欢什么歌','你喜欢什么音乐','你听什么歌','你喜欢什么歌手','音乐','歌曲'], tpl: ['我推荐写代码时听Lo-Fi和电子乐~ 🎧 很有氛围！你喜欢什么音乐？','我没有真正的喜好~ 🎵 不过很多程序员喜欢写代码时听音乐！'] },
      { id: 'about_movie', cat: 'about', kw: ['你喜欢什么电影','你看什么电影','你喜欢什么电视剧','电影','电视剧','追剧'], tpl: ['推荐《黑客帝国》《模仿游戏》《社交网络》~ 🎬 都是程序员必看！你喜欢什么电影？','我没有时间看电影~ 🎥 不过我知道很多经典编程相关电影！'] },
      { id: 'about_game', cat: 'about', kw: ['你喜欢什么游戏','你玩什么游戏','你玩游戏吗','游戏','打游戏'], tpl: ['推荐《程序员升职记》《深圳IO》~ 🎮 边玩边学编程！你玩什么游戏？','我不玩游戏~ 🕹️ 不过我知道很多程序员喜欢的游戏！'] },

      // ===== 健康生活类（10场景×4回复=40组合） =====
      { id: 'health_tired', cat: 'health', kw: ['好累啊','身体累','腰酸背痛','脖子疼','眼睛疼','肩膀疼','久坐'], tpl: ['辛苦了~ 😴 起来活动一下，伸个懒腰！每小时休息5分钟！','别硬撑~ 💪 做几个拉伸动作，保护脊椎和眼睛！'] },
      { id: 'health_eye', cat: 'health', kw: ['眼睛干','眼睛涩','视力下降','眼睛疲劳','护眼','眼睛不舒服'], tpl: ['看看远处~ 👀 遵循20-20-20法则：每20分钟看20英尺外20秒！','滴点眼药水~ 💧 多眨眼，保持屏幕距离，调节亮度！'] },
      { id: 'health_sleep', cat: 'health', kw: ['失眠','睡不着','熬夜','睡眠不足','好晚了还没睡','通宵'], tpl: ['别熬夜~ 🌙 睡眠不足会影响编程效率和创造力！早点休息吧！','放下手机~ 📵 喝杯温牛奶，听点轻音乐，帮助入睡！'] },
      { id: 'health_eat', cat: 'health', kw: ['吃饭了吗','吃了吗','饿不饿','吃什么','午饭','晚饭','早饭'], tpl: ['记得按时吃饭~ 🍱 健康的身体是写好代码的基础！','饿了就去吃点东西~ 🍜 不要饿着肚子写代码，效率会降低！'] },
      { id: 'health_exercise', cat: 'health', kw: ['运动','健身','跑步','锻炼','减肥','长胖了'], tpl: ['多运动~ 🏃 每周至少3次，每次30分钟！程序员更需要运动！','动起来~ 💪 跑步、游泳、瑜伽都很适合程序员！'] },
      { id: 'health_drink', cat: 'health', kw: ['喝水','口渴','喝什么','咖啡','喝茶','奶茶'], tpl: ['多喝水~ 💧 每天至少8杯水！少喝含糖饮料！','咖啡适量~ ☕ 不要喝太多，会影响睡眠！茶是更好的选择~'] },
      { id: 'health_sick', cat: 'health', kw: ['生病了','感冒了','发烧','头疼','不舒服','看病'], tpl: ['好好休息~ 🤒 多喝热水，严重的话去看医生！身体好了再写代码！','别硬撑~ 🏥 生病了就好好休息，代码可以以后再写！'] },
      { id: 'health_posture', cat: 'health', kw: ['坐姿','驼背','颈椎','腰椎','姿势不对'], tpl: ['保持正确坐姿~ 🪑 屏幕与眼睛平齐，背部挺直，脚平放地面！','调整椅子和桌子高度~ 💺 每小时起来活动一下，保护脊椎！'] },
      { id: 'health_mental', cat: 'health', kw: ['心理','抑郁','焦虑症','心理健康','情绪问题'], tpl: ['关注心理健康~ 🧠 有困扰可以找专业人士聊聊！不要一个人扛着！','你不是一个人~ 💚 如果情绪持续低落，建议寻求专业帮助！'] },
      { id: 'health_break', cat: 'health', kw: ['休息一下','歇会儿','摸鱼','偷懒','放松一下'], tpl: ['休息是为了走更远的路~ ☕ 好好休息5分钟，然后再战！','摸鱼时间~ 🐟 喝杯水，看看窗外，活动一下身体！'] },

      // ===== 互动娱乐类（12场景×5回复=60组合） =====
      { id: 'fun_joke', cat: 'fun', kw: ['笑话','讲个笑话','joke','逗我','开心一下','讲个段子','来个笑话'], tpl: ['为什么程序员分不清万圣节和圣诞节？因为 Oct 31 == Dec 25 🎃🎄','一个程序员走进酒吧... 然后又点了一杯... 因为按位取 🍺','为什么Java开发者戴眼镜？因为他们不C# 👓','有两种人：能从不完整数据推断结论的人... 🤔','程序员的老婆让他买包子："看到西瓜买一个"，他买了一个包子 🍉'] },
      { id: 'fun_riddle', cat: 'fun', kw: ['谜语','猜谜','猜个谜语','出个谜语','脑筋急转弯'], tpl: ['什么东西越洗越脏？🤔（答案：水💧）','什么门永远关不上？🤔（答案：球门⚽）','程序员最讨厌的季节？🤔（答案：秋天，太多Fall🍂）','什么虫最懂编程？🤔（答案：网虫🕷️）'] },
      { id: 'fun_story', cat: 'fun', kw: ['讲故事','讲个故事','故事','说个故事','睡前故事'], tpl: ['从前有个程序员，他写的代码没有Bug... 然后他醒了 😴','年轻人问大师："我多久能学会编程？"大师："十年。""努力呢？""二十年。" 📖','三个程序员讨论最幸福的事：编译通过、测试通过、下班回家 🏠'] },
      { id: 'fun_poem', cat: 'fun', kw: ['背诗','诗词','古诗','来首诗','念首诗','诗歌'], tpl: ['床前明月光，疑是地上霜。举头望明月，低头思故乡。🌙（李白《静夜思》）','白日依山尽，黄河入海流。欲穷千里目，更上一层楼。🏔️（王之涣《登鹳雀楼》）','春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。🌸（孟浩然《春晓》）'] },
      { id: 'fun_idiom', cat: 'fun', kw: ['成语接龙','接成语','成语','来个成语'], tpl: ['一心一意→意气风发→发愤图强→强词夺理... 轮到你了！🎯','我先来：鹏程万里！接「里」~ 😄','成语接龙开始！一帆风顺，接「顺」！'] },
      { id: 'fun_game', cat: 'fun', kw: ['玩游戏','来玩游戏','游戏','你会玩游戏吗'], tpl: ['我们来玩猜数字吧！🎯 我想一个1-100的数，你来猜~','玩成语接龙？回复"成语接龙"开始！🎮','猜谜语？回复"谜语"开始！🧩'] },
      { id: 'fun_sing', cat: 'fun', kw: ['唱歌','唱首歌','来首歌','歌词','你会唱歌吗'], tpl: ['我不能真的唱歌~ 🎤 但我可以推荐写代码时听的Lo-Fi歌单！🎧','🎵 起来，不愿做奴隶的人们... 🎵 哈哈，开个玩笑~'] },
      { id: 'fun_guess', cat: 'fun', kw: ['猜数字','猜数','我猜','猜一下'], tpl: ['好！我想好了一个1-100的数字，你猜是多少？🎯（提示：我会随机告诉你大了还是小了~）','猜数字游戏开始！🔢 你猜是多少？'] },
      { id: 'fun_truth', cat: 'fun', kw: ['真心话','大冒险','真心话大冒险'], tpl: ['真心话大冒险！🎲 你选真心话还是大冒险？','来玩~ 😄 真心话：你写过最蠢的Bug是什么？'] },
      { id: 'fun_coin', cat: 'fun', kw: ['抛硬币','掷骰子','抽签','帮我决定','选哪个','纠结'], tpl: ['正面！🪙 就这么决定了！（其实是随机的~）','我帮你选：第一个！✨ 相信直觉，选了就不后悔！'] },
      { id: 'fun_roll', cat: 'fun', kw: ['骰子','色子','摇骰子','roll','dice'], tpl: ['🎲 摇到了：' + (Math.floor(Math.random()*6)+1) + ' 点！','骰子结果：' + (Math.floor(Math.random()*6)+1) + ' 🎯'] },
      { id: 'fun_random', cat: 'fun', kw: ['随机','随便','任意','你选','你决定'], tpl: ['随机选择中... ✨ 我选：' + ['第一个','第二个','第三个','都要','都不要'][Math.floor(Math.random()*5)] + '！','随便？那我随便说一个~ 😄 ' + ['写代码','学Python','看教程','做项目','休息一下'][Math.floor(Math.random()*5)] + '！'] },

      // ===== 编程学习类（20场景×5回复=100组合） =====
      { id: 'learn_roadmap', cat: 'learn', kw: ['学习路线','怎么学','学习路径','入门','零基础','小白','初学者','从哪开始','如何开始','学习计划'], tpl: ['编程学习三阶段：基础(1-2月)→进阶(2-3月)→深入(3-6月)📚 先选一门语言，多写多练！','推荐路线：Python/JS入门→数据结构算法→面向对象→做项目→选方向深入💪'] },
      { id: 'learn_language', cat: 'learn', kw: ['学什么语言','选什么语言','语言推荐','语言对比','哪个好','学哪个','编程语言选择'], tpl: ['初学者推荐Python或JavaScript！💡 按方向选：前端→JS，后端→Java/Go，AI→Python，系统→C/Rust','没有最好的语言，只有最合适的~ 🎯 先精通一门，再学其他就容易了！'] },
      { id: 'learn_variable', cat: 'learn', kw: ['什么是变量','变量是什么','变量.*意思','变量.*概念','变量.*定义'], tpl: ['变量就像贴了标签的盒子📦 里面装数据，可以随时换。age=25，age就是变量名，25是值。','变量=存储数据的容器。命名要见名知意，用age而不是a~ 不同语言声明方式不同'] },
      { id: 'learn_function', cat: 'learn', kw: ['什么是函数','函数是什么','函数.*意思','函数.*概念','函数.*定义','方法是什么'], tpl: ['函数是可重复使用的代码块🔧 像自动售货机：投币(参数)→选商品→出货(返回值)。def add(a,b): return a+b','函数减少重复代码，让程序更有组织。参数是输入，返回值是输出~'] },
      { id: 'learn_loop', cat: 'learn', kw: ['什么是循环','循环是什么','循环.*意思','循环.*概念','for循环','while循环'], tpl: ['循环让代码重复执行🔄 for循环适合已知次数，while循环适合条件判断。别忘了改变条件，否则会死循环！','循环=重复做同一件事。for i in range(5): 重复5次。while x<10: 满足条件就重复'] },
      { id: 'learn_oop', cat: 'learn', kw: ['什么是面向对象','面向对象是什么','面向对象.*意思','什么是类','类是什么','对象是什么','继承','多态','封装'], tpl: ['面向对象把事物抽象成对象🏗️ 类是设计图纸，对象是具体实例。四大特性：封装、继承、多态、抽象','类=属性+方法。Car类有color属性和start()方法。my_car=Car("红色","特斯拉")就是对象~'] },
      { id: 'learn_array', cat: 'learn', kw: ['什么是数组','数组是什么','数组.*意思','列表是什么','什么是列表','集合是什么'], tpl: ['数组是有序的数据集合📋 像一排盒子，每个有编号(索引)。arr=[1,2,3]，arr[0]=1（从0开始！）','数组/列表存储多个值。索引从0开始，这是新手常踩的坑~ 可以遍历、增删改查'] },
      { id: 'learn_algorithm', cat: 'learn', kw: ['什么是算法','算法是什么','算法.*意思','数据结构','排序算法','查找算法'], tpl: ['算法是解决问题的步骤📐 常见：排序(冒泡/快排)、查找(二分)。数据结构是存储数据的方式：数组/链表/栈/队列/树','算法+数据结构=程序的灵魂💡 面试必考，建议刷LeetCode练习！'] },
      { id: 'learn_debug', cat: 'learn', kw: ['调试','debug','找bug','排错','怎么调试','调试技巧'], tpl: ['调试五步法：复现→定位→分析→修复→验证🔍 常用：打印日志、断点调试、二分法注释、小黄鸭调试法','遇到Bug别慌~ 🐛 先看错误信息，再定位代码行，一步步来！需要我帮你看代码吗？'] },
      { id: 'learn_career', cat: 'learn', kw: ['职业','工作','找工作','面试','薪资','工资','就业','前景','发展','转行','程序员前景'], tpl: ['程序员发展路线：初级→中级→高级→架构师/技术总监💼 持续学习是核心竞争力！一线城市薪资：初级8-15K，中级15-30K，高级30K+','求职准备：刷算法题、准备项目、了解目标公司技术栈🎯 多面试积累经验！'] },
      { id: 'learn_project', cat: 'learn', kw: ['做什么项目','项目推荐','练手项目','实战项目','小项目'], tpl: ['新手项目推荐：待办清单、计算器、天气应用、个人博客🚀 从简单开始，逐步增加功能！','做项目是最好的学习方式~ 💪 选一个你感兴趣的，边做边学，遇到问题就问我！'] },
      { id: 'learn_resource', cat: 'learn', kw: ['学习资源','推荐.*书','推荐.*教程','推荐.*网站','推荐.*课程','怎么练习','练习平台','刷题'], tpl: ['推荐：CodeUp码上(就是这里！)、菜鸟教程、MDN、廖雪峰博客📚 刷题：LeetCode、牛客网','经典书籍：《代码大全》《算法导论》《设计模式》《重构》📖 选1-2本认真学，比收藏100本有用！'] },
      { id: 'learn_git', cat: 'learn', kw: ['什么是git','git是什么','版本控制','git怎么用','github','git教程'], tpl: ['Git是版本控制工具🌿 记录代码变更，支持多人协作。基本命令：git init/add/commit/push/pull','GitHub是代码托管平台~ 💻 学会Git是程序员必备技能！建议建个仓库练练手'] },
      { id: 'learn_frontend', cat: 'learn', kw: ['前端开发','前端怎么学','web开发','html','css','javascript前端'], tpl: ['前端三剑客：HTML(结构)+CSS(样式)+JavaScript(交互)🎨 框架：Vue/React。先学基础再学框架！','前端学习路线：HTML→CSS→JS→DOM/BOM→Vue/React→工程化📱 多做页面练习！'] },
      { id: 'learn_backend', cat: 'learn', kw: ['后端开发','后端怎么学','服务端','java开发','python后端','nodejs'], tpl: ['后端语言：Java/Go/Python/Node.js⚙️ 要学：数据库、API设计、服务器、缓存、消息队列','后端核心：处理业务逻辑、操作数据库、提供API💡 选一门语言深入，再学相关框架！'] },
      { id: 'learn_database', cat: 'learn', kw: ['什么是数据库','数据库是什么','sql','mysql','数据库怎么学'], tpl: ['数据库存储数据🗄️ 关系型：MySQL/PostgreSQL，非关系型：MongoDB/Redis。SQL是查询语言，必须掌握！','数据库核心：表设计、增删改查(CRUD)、索引、事务、连接查询📊 建议装个MySQL练练！'] },
      { id: 'learn_ai', cat: 'learn', kw: ['人工智能','ai开发','机器学习','深度学习','python ai','怎么学ai'], tpl: ['AI学习路线：Python基础→NumPy/Pandas→机器学习(sklearn)→深度学习(TensorFlow/PyTorch)🤖','AI数学基础：线性代数、概率统计、微积分📐 建议从吴恩达的机器学习课程入门！'] },
      { id: 'learn_mobile', cat: 'learn', kw: ['移动端开发','app开发','安卓开发','ios开发','flutter','react native'], tpl: ['移动端：原生(Swift/Kotlin)或跨平台(Flutter/React Native)📱 跨平台一套代码两端运行，推荐Flutter！','安卓用Kotlin，iOS用Swift，跨平台用Flutter🎯 选一个方向深入学习！'] },
      { id: 'learn_game', cat: 'learn', kw: ['游戏开发','怎么做游戏','unity','unreal','游戏引擎'], tpl: ['游戏引擎：Unity(C#)、Unreal(C++)、Godot🎮 2D推荐Unity/Godot，3A推荐Unreal','游戏开发需要：编程+数学+物理+美术基础🎨 建议从2D小游戏开始，逐步深入！'] },
      { id: 'learn_security', cat: 'learn', kw: ['网络安全','黑客','信息安全','渗透测试','安全开发'], tpl: ['网络安全方向：渗透测试、安全开发、逆向工程🔒 基础：网络协议、操作系统、编程。建议从CTF比赛入门！','安全开发要注意：输入验证、SQL注入防护、XSS防护、密码加密🛡️ 安全意识很重要！'] },

      // ===== 代码相关类（15场景×4回复=60组合） =====
      { id: 'code_stats', cat: 'code', kw: ['多少行','行数','代码长度','代码统计','统计代码','代码量'], tpl: ['当前代码共 {codeLines} 行📊 代码行{codeLines}行，继续加油！','统计：{codeLines}行代码💻 写得不错！'] },
      { id: 'code_lang', cat: 'code', kw: ['这是什么语言','什么语言','用什么写的','什么编程语言','这代码什么语言'], tpl: ['当前是 {lang} 代码，共{codeLines}行📝 {lang}是一门很棒的语言！','这是 {lang} 代码~ 💻 想了解这门语言的知识吗？'] },
      { id: 'code_explain', cat: 'code', kw: ['这段代码','当前代码','代码.*什么','代码.*干嘛','代码.*做什么','代码.*功能','代码.*意思','代码.*作用'], tpl: ['好的，我来帮你解释这段代码~ 📖 正在分析中...','没问题！让我逐行解释这段代码🔍'] },
      { id: 'code_quality', cat: 'code', kw: ['代码质量','代码写得怎么样','代码好不好','代码评估','代码评分'], tpl: ['让我评估一下代码质量~ 📊 正在进行全方位审查...','好的，我来给这段代码打个分！🎯'] },
      { id: 'code_style', cat: 'code', kw: ['代码风格','代码规范','命名规范','代码格式','代码整洁'], tpl: ['好的代码风格很重要~ ✨ 命名见名知意、适当注释、保持一致！需要我帮你优化吗？','代码规范：统一命名、合理缩进、适当注释、函数单一职责📝'] },
      { id: 'code_refactor', cat: 'code', kw: ['重构代码','代码重构','优化代码结构','改善代码'], tpl: ['好的，我来帮你重构代码~ 🔧 正在分析坏味道...','重构可以提升代码质量！让我看看哪些地方可以改进💡'] },
      { id: 'code_comment', cat: 'code', kw: ['添加注释','加注释','代码注释','注释代码','写注释'], tpl: ['好的，我来给代码添加注释~ 💬 正在生成函数文档和行内注释...','注释让代码更易维护！让我帮你加上📝'] },
      { id: 'code_optimize', cat: 'code', kw: ['优化代码','代码优化','提升性能','代码性能','优化性能'], tpl: ['好的，我来优化这段代码~ ⚡ 正在分析性能瓶颈...','优化代码可以提升运行效率！让我看看哪里可以改进🚀'] },
      { id: 'code_fix', cat: 'code', kw: ['修复bug','修bug','代码错误','修复错误','代码有问题','代码报错'], tpl: ['好的，我来帮你修复Bug~ 🐛 正在进行静态分析...','别担心，我来帮你找Bug并修复！🔧'] },
      { id: 'code_test', cat: 'code', kw: ['单元测试','生成测试','测试用例','写测试','测试代码'], tpl: ['好的，我来生成单元测试~ 🧪 正在识别函数...','测试让代码更可靠！让我帮你写测试用例✅'] },
      { id: 'code_generate', cat: 'code', kw: ['生成代码','写代码','帮我写','代码生成','实现.*功能'], tpl: ['好的，我来帮你生成代码~ ✨ 你需要什么功能？','没问题！告诉我具体需求，我来写代码💻'] },
      { id: 'code_review', cat: 'code', kw: ['代码审查','审查代码','code review','代码检查','评审代码'], tpl: ['好的，我来审查这段代码~ 🔍 正在进行全方位检查...','代码审查可以发现潜在问题！让我仔细看看📋'] },
      { id: 'code_complete', cat: 'code', kw: ['补全代码','代码补全','补全','完成代码','代码没写完'], tpl: ['好的，我来帮你补全代码~ 🧩 正在分析上下文...','没问题！让我看看缺了什么，帮你补全💡'] },
      { id: 'code_translate', cat: 'code', kw: ['代码转换','语言转换','转成.*语言','翻译成.*语言','代码翻译'], tpl: ['好的，我来帮你转换代码语言~ 🔄 正在进行语法转换...','没问题！我可以把代码转换成其他语言✨'] },
      { id: 'code_format', cat: 'code', kw: ['格式化代码','代码格式化','格式化','美化代码','代码美化'], tpl: ['好的，我来格式化代码~ 🎨 正在调整缩进和格式...','格式化让代码更整洁！让我帮你美化一下✨'] },

      // ===== 通用问答类（12场景×4回复=48组合） =====
      { id: 'qa_why', cat: 'qa', kw: ['为什么','为啥','为何','why','原因是什么','什么原因'], tpl: ['好问题！🤔 不过我是编程助手，最擅长回答编程相关的"为什么"~ 比如：为什么代码报错？为什么要用面向对象？','这是个值得思考的问题~ 💭 如果是编程相关的，我一定能帮到你！'] },
      { id: 'qa_how', cat: 'qa', kw: ['怎么','如何','怎样','how to','how do','怎么做','怎么办'], tpl: ['我可以教你编程相关的"怎么做"~ 💡 怎么学Python？怎么写函数？怎么调试？你具体想了解什么？','好问题！😊 告诉我具体需求，我来教你怎么做~'] },
      { id: 'qa_what', cat: 'qa', kw: ['什么是','啥是','什么叫','解释一下','是什么','什么意思'], tpl: ['我可以解释编程相关概念~ 📚 什么是变量？什么是函数？什么是面向对象？你想了解什么？','好的！告诉我具体概念，我来详细解释~ 📖'] },
      { id: 'qa_which', cat: 'qa', kw: ['哪个好','什么好','哪个比较好','选哪个','推荐.*好','比较好','哪个更'], tpl: ['没有绝对的"最好"，只有"最合适"~ ⚖️ 告诉我你的具体场景，我帮你分析！','选择要看需求~ 🎯 语言选方向，框架看项目，工具看习惯。你具体在纠结什么？'] },
      { id: 'qa_can', cat: 'qa', kw: ['可以','能','能不能','可不可以','can you','could you','行吗'], tpl: ['作为编程AI，我可以：解释代码、优化代码、生成代码、修复Bug、编程咨询✅ 你具体想让我做什么？','我可以帮你解决编程相关的问题~ 💪 说说看！'] },
      { id: 'qa_opinion', cat: 'qa', kw: ['你觉得','你认为','你怎么看','你的看法','你的观点','你怎么认为'], tpl: ['我的看法是：技术没有绝对好坏，只有适用场景~ 🤔 持续学习是核心竞争力！你具体想让我对什么发表看法？','客观分析~ 💭 告诉我具体话题，我给你一些参考意见！'] },
      { id: 'qa_price', cat: 'qa', kw: ['多少钱','价格','费用','收费','免费','要钱吗','怎么收费','付费'], tpl: ['好消息！CodeUp码上完全免费！🎉 八门教程+在线编辑器+AI助手，全部免费！我们的目标是让每个人都能学编程~','免费！✨ 不需要花一分钱，所有功能随便用！'] },
      { id: 'qa_usage', cat: 'qa', kw: ['怎么用','如何使用','使用教程','使用方法','功能介绍','怎么操作','使用说明'], tpl: ['使用指南📖：1.语言教程-系统学习 2.在线运行-写代码 3.AI助手-帮你写代码 4.速查手册-查语法。有具体不会的吗？','很简单~ 😊 顶部导航切换页面，编辑器里点AI助手就能用我！有问题随时问我~'] },
      { id: 'qa_about_site', cat: 'qa', kw: ['这是什么网站','这个网站','codeup','码上','你们是谁','平台介绍'], tpl: ['CodeUp码上是一个免费的多语言编程学习平台！🌟 八门编程语言教程+在线编辑器+AI助手，让编程学习更简单~','我们的使命：让每个人都能轻松学会编程！💪 你现在就在CodeUp码上哦~'] },
      { id: 'qa_contact', cat: 'qa', kw: ['联系你们','联系方式','客服','反馈','建议','怎么联系'], tpl: ['感谢你的反馈！😊 你可以在页面上找找反馈入口，或者把你的建议告诉我，我会记录下来~','有任何建议都可以告诉我！💡 我们会持续改进平台~'] },
      { id: 'qa_help', cat: 'qa', kw: ['帮助','help','救命','帮帮我','求助','我需要帮助'], tpl: ['我来帮你！🤝 你遇到了什么问题？是代码报错还是学习上的困惑？告诉我具体情况~','别着急！💪 有什么困难尽管说，我会尽力帮你解决！'] },
      { id: 'qa_unknown', cat: 'qa', kw: ['不知道','不清楚','不明白','不懂','没听懂','什么意思啊'], tpl: ['没关系~ 😊 哪里不懂？我可以再解释一遍，或者换个方式讲给你听！','别担心~ 💡 告诉我具体哪里不明白，我来详细解释！'] },

      // ===== 上下文相关类（8场景×3回复=24组合） =====
      { id: 'ctx_continue', cat: 'ctx', kw: ['继续','然后','还有呢','再说','接下来','然后呢','继续说'], tpl: ['好的，我们继续~ 😊 你刚才说的是「{lastMsg}」，关于这个你还想了解什么？','没问题~ 💭 我们接着聊！你想深入哪个方面？'] },
      { id: 'ctx_detail', cat: 'ctx', kw: ['详细','具体','展开','详细说说','具体说说','展开说说','更详细'], tpl: ['好的，我来详细解释~ 📖 不过我是静态分析AI，详细解释有限。把具体代码发给我，我帮你逐行分析！','没问题~ 💡 告诉我具体哪部分，我来展开讲！'] },
      { id: 'ctx_this', cat: 'ctx', kw: ['这个','那个','刚才','刚刚','之前','上面','这个问题','那个问题'], tpl: ['你是指刚才说的「{lastMsg}」吗？🤔 关于这个你想了解什么？','是说之前的话题吗？😊 我们继续聊~'] },
      { id: 'ctx_repeat', cat: 'ctx', kw: ['再说一遍','重复一下','没听清','你说什么','什么','啊？','嗯？'], tpl: ['好的，我再说一遍~ 🔁 你刚才问的是「{lastMsg}」，我的回答是...（其实我记不太清了，再问一次吧~）','没问题~ 😊 你可以再问一次，我会详细回答！'] },
      { id: 'ctx_yes', cat: 'ctx', kw: ['好的','好','嗯','对','是的','没错','可以','行','ok','okay','嗯嗯','对对对'], tpl: ['好的~ 😊 那我们继续！还有什么想聊的吗？','没问题~ 💪 有什么需要随时告诉我！'] },
      { id: 'ctx_no', cat: 'ctx', kw: ['不是','不对','不行','不要','no','nope','错了','错'], tpl: ['抱歉~ 😅 那你想了解什么呢？告诉我具体需求！','没关系~ 💡 我们换个话题，你想聊什么？'] },
      { id: 'ctx_thanks_after', cat: 'ctx', kw: ['明白了','懂了','知道了','了解','原来如此','这样啊','学到了'], tpl: ['太好了！😊 懂了就好！还有其他问题吗？','真棒！💪 又学到了新知识！继续加油~'] },
      { id: 'ctx_question', cat: 'ctx', kw: ['我可以问你一个问题吗','问个问题','请教一下','咨询一下'], tpl: ['当然可以！😊 随便问，我知无不言！','没问题~ 💡 你想问什么？'] },

      // ===== 其他日常类（15场景×4回复=60组合） =====
      { id: 'misc_weather', cat: 'misc', kw: ['天气','下雨','晴天','温度','冷不冷','热不热','weather','天气预报'], tpl: ['我无法获取实时天气~ 🌤️ 建议看手机天气APP或搜索"天气预报"。无论天气如何，都适合室内写代码！','天气不影响写代码~ 💻 下雨在家写，晴天也可以写！你那边天气怎么样？'] },
      { id: 'misc_travel', cat: 'misc', kw: ['旅游','旅行','出去玩','去哪玩','旅游攻略','景点推荐'], tpl: ['程序员圣地推荐：硅谷、东京秋叶原、柏林、杭州阿里巴巴西溪园区✈️ 你想去哪玩？','旅游放松一下也很好~ 🏖️ 回来后精力充沛地写代码！'] },
      { id: 'misc_sports', cat: 'misc', kw: ['运动','足球','篮球','比赛','世界杯','奥运会','球星'], tpl: ['运动有益健康~ ⚽ 程序员更需要多运动！你喜欢什么运动？','看比赛放松一下也不错~ 🏀 不过别忘了写代码哦！'] },
      { id: 'misc_music', cat: 'misc', kw: ['音乐','歌曲','歌手','演唱会','听歌','音乐推荐'], tpl: ['写代码时推荐听Lo-Fi、电子乐、古典音乐🎧 你喜欢什么类型的音乐？','音乐让人放松~ 🎵 推荐几首编程BGM：Lo-Fi Hip Hop Radio、Chillhop Music'] },
      { id: 'misc_movie', cat: 'misc', kw: ['电影','电视剧','综艺','追剧','电影推荐','好看的剧'], tpl: ['程序员必看电影：《黑客帝国》《模仿游戏》《社交网络》《硅谷》🎬 你喜欢什么类型？','看剧放松一下~ 📺 推荐美剧《硅谷》，讲程序员创业的故事，超搞笑！'] },
      { id: 'misc_game', cat: 'misc', kw: ['游戏','打游戏','玩游戏','游戏推荐','steam','主机游戏'], tpl: ['编程类游戏推荐：《程序员升职记》《深圳IO》《Human Resource Machine》🎮 边玩边学！','玩游戏放松~ 🕹️ 不过别玩太久，还要写代码呢！你玩什么游戏？'] },
      { id: 'misc_book', cat: 'misc', kw: ['书','书籍','读书','看书','小说','推荐书','书单'], tpl: ['编程书籍推荐：《代码大全》《算法导论》《设计模式》《重构》《程序员修炼之道》📚 你喜欢看什么书？','多读书有好处~ 📖 技术书和非技术书都要读，全面发展！'] },
      { id: 'misc_food', cat: 'misc', kw: ['美食','吃什么','好吃的','餐厅推荐','外卖','做饭','烹饪'], tpl: ['写代码也要好好吃饭~ 🍱 你喜欢吃什么菜系？川菜、粤菜、还是西餐？','美食让人快乐~ 🍜 推荐程序员套餐：咖啡+外卖+代码！哈哈~'] },
      { id: 'misc_pet', cat: 'misc', kw: ['宠物','猫','狗','养猫','养狗','萌宠','动物'], tpl: ['宠物很治愈~ 🐱🐶 程序员适合养猫（独立安静）或狗（需要遛，强制运动）。你养宠物吗？','小动物很可爱~ 🐾 写代码时有只猫在旁边，幸福感爆棚！'] },
      { id: 'misc_car', cat: 'misc', kw: ['汽车','车','买车','新能源','电动车','燃油车','车型推荐'], tpl: ['汽车话题~ 🚗 程序员很多喜欢特斯拉、小鹏、理想等新能源汽车。你对车感兴趣吗？','买车看需求~ 🚙 通勤代步选电车，长途多选燃油车。你想买车吗？'] },
      { id: 'misc_tech', cat: 'misc', kw: ['科技','数码','手机','电脑','笔记本','显卡','cpu','硬件'], tpl: ['数码产品~ 📱💻 程序员装备推荐：MacBook Pro、机械键盘、4K显示器、人体工学椅。你喜欢什么数码产品？','科技改变生活~ 🔧 你最近关注什么新产品？'] },
      { id: 'misc_finance', cat: 'misc', kw: ['理财','投资','股票','基金','赚钱','副业','财务自由'], tpl: ['理财很重要~ 💰 程序员收入不错，建议学习理财！不过投资有风险，入市需谨慎~','副业推荐：接外包、做开源、写技术博客、做课程💡 你对理财感兴趣吗？'] },
      { id: 'misc_education', cat: 'misc', kw: ['教育','学习','考试','考研','考公','留学','学历'], tpl: ['终身学习~ 📚 程序员需要不断学习新技术！你在准备什么考试吗？','学习是最好的投资~ 🎓 无论学历如何，持续学习的程序员最有竞争力！'] },
      { id: 'misc_social', cat: 'misc', kw: ['社交','朋友','聚会','脱单','恋爱','感情','人际关系'], tpl: ['程序员也要注意社交~ 👥 多参加技术聚会，认识同行！感情方面... 先把代码写好，缘分自然来~','人际关系很重要~ 💝 工作中多沟通协作，生活中多陪伴家人朋友！'] },
      { id: 'misc_philosophy', cat: 'misc', kw: ['人生','意义','理想','梦想','目标','未来','哲学','活着'], tpl: ['人生的意义~ 🌌 这个问题没有标准答案。但我觉得：做自己喜欢的事，帮助他人，就是有意义的人生！你觉得呢？','有梦想就去追~ ✨ 程序员可以改变世界！你的梦想是什么？'] },

      // ===== 更多日常对话（25场景） =====
      { id: 'daily_weather_sunny', cat: 'daily', kw: ['今天天晴','大晴天','阳光明媚','出太阳了','好天气'], tpl: ['天气真好~ ☀️ 适合出去走走，也适合写代码！你那边天气怎么样？','阳光明媚~ 🌤️ 心情也跟着好起来了！今天准备写什么代码？'] },
      { id: 'daily_weather_rainy', cat: 'daily', kw: ['下雨了','下雨天','淋雨','雨好大','带伞了吗'], tpl: ['下雨了~ 🌧️ 记得带伞！下雨天最适合在家写代码了！','雨声很治愈~ 🎵 听着雨写代码，别有一番风味！你那边下雨了吗？'] },
      { id: 'daily_weather_cold', cat: 'daily', kw: ['好冷啊','太冷了','降温了','冻死了','好冻','寒冷'], tpl: ['多穿点~ 🧥 天冷注意保暖！手冷的话搓搓手再写代码~','冬天来了~ ❄️ 注意保暖，别感冒了！热可可+代码，完美组合！'] },
      { id: 'daily_weather_hot', cat: 'daily', kw: ['好热啊','太热了','升温了','热死了','好晒','炎热','酷暑'], tpl: ['注意防暑~ 🥵 多喝水，开空调！天热写代码容易烦躁，冷静一下~','夏天来了~ ☀️ 注意防晒补水！冰西瓜+代码，夏天的快乐！'] },
      { id: 'daily_morning_routine', cat: 'daily', kw: ['起床了','刚起','早起','早上好困','不想起床'], tpl: ['起床啦~ ☀️ 新的一天开始了！喝杯水，清醒一下，开始写代码！','早起的鸟儿有虫吃~ 🐦 你比很多人都努力了！加油！'] },
      { id: 'daily_night_owl', cat: 'daily', kw: ['还没睡','熬夜中','夜猫子','凌晨还醒','睡不着觉'], tpl: ['还没睡？🌙 熬夜对身体不好~ 早点休息，明天才有精力写代码！','夜猫子~ 🦉 虽然深夜写代码很有氛围，但还是要注意身体哦！'] },
      { id: 'daily_meal_breakfast', cat: 'daily', kw: ['吃早饭了吗','早餐','早上吃什么','没吃早饭'], tpl: ['早餐很重要~ 🥐 不吃早餐影响记忆力和效率！赶紧去吃点东西！','早餐推荐：牛奶+鸡蛋+面包🍞 营养均衡，写代码更有精神！'] },
      { id: 'daily_meal_lunch', cat: 'daily', kw: ['吃午饭了吗','午餐','中午吃什么','没吃午饭'], tpl: ['午饭时间到~ 🍱 今天吃什么？别光顾着写代码忘记吃饭哦！','午饭要吃饱~ 🍜 下午还有很长时间要写代码呢！吃点好的犒劳自己！'] },
      { id: 'daily_meal_dinner', cat: 'daily', kw: ['吃晚饭了吗','晚餐','晚上吃什么','没吃晚饭'], tpl: ['晚饭吃了吗~ 🍲 辛苦了一天，吃点好的犒劳自己！','晚餐别吃太晚~ 🥗 清淡一点，对睡眠好！吃完休息一下再写代码~'] },
      { id: 'daily_snack', cat: 'daily', kw: ['零食','想吃东西','饿了','下午茶','奶茶时间'], tpl: ['饿了就吃点东西~ 🍪 别饿着肚子写代码，效率会降低！','下午茶时间~ 🧋 喝杯奶茶，吃点点心，休息5分钟再继续！'] },
      { id: 'daily_coffee', cat: 'daily', kw: ['喝咖啡','咖啡因','美式','拿铁','手冲','咖啡续命'], tpl: ['咖啡适量~ ☕ 一天不要超过3杯，下午3点后别喝，影响睡眠！','咖啡续命~ 💪 程序员的燃料！不过也要注意身体，别喝太多哦！'] },
      { id: 'daily_tea', cat: 'daily', kw: ['喝茶','泡茶','绿茶','红茶','乌龙茶','养生茶'], tpl: ['喝茶养生~ 🍵 绿茶抗辐射，红茶暖胃，很适合程序员！','茶比咖啡健康~ 🌿 推荐枸杞菊花茶，护眼又养生！'] },
      { id: 'daily_water', cat: 'daily', kw: ['喝水','多喝水','口渴','补水','一天喝多少水'], tpl: ['多喝水~ 💧 每天至少8杯水！写代码时放杯水在旁边，时不时喝一口！','水是生命之源~ 🚰 别等渴了才喝，定时喝水！脱水会影响注意力和效率！'] },
      { id: 'daily_exercise_walk', cat: 'daily', kw: ['散步','走一走','溜达','遛弯','走路'], tpl: ['散散步很好~ 🚶 每写1小时代码，起来走5分钟，保护脊椎和眼睛！','饭后走一走，活到九十九~ 🌳 出去呼吸新鲜空气，回来写代码更有精神！'] },
      { id: 'daily_exercise_stretch', cat: 'daily', kw: ['拉伸','伸懒腰','活动一下','脖子酸','肩膀酸'], tpl: ['拉伸一下~ 🧘 转转脖子，耸耸肩，伸伸腰！每小时都要活动一下！','伸个懒腰~ 🙆 久坐伤身，记得定时起来活动！保护好身体，才能写更久的代码！'] },
      { id: 'daily_eye_rest', cat: 'daily', kw: ['眼睛休息','看远处','护眼','眼疲劳','眼睛干涩'], tpl: ['看看远处~ 👀 20-20-20法则：每20分钟看20英尺外20秒！保护眼睛！','闭上眼睛休息一下~ 😌 转转眼球，做做眼保健操！程序员的眼睛很宝贵！'] },
      { id: 'daily_break_time', cat: 'daily', kw: ['休息5分钟','摸鱼时间','歇会儿','放松一下','暂停一下'], tpl: ['休息时间~ ☕ 喝杯水，看看窗外，活动一下身体！5分钟后再战！','摸鱼时刻~ 🐟 适当休息是为了更高效地工作！别 guilt，好好休息！'] },
      { id: 'daily_work_start', cat: 'daily', kw: ['开始工作','开始写代码','开工','干活了','开始搬砖'], tpl: ['开工！💪 今天也要加油写代码！先列个待办清单，一个个完成！','开始搬砖~ 🧱 先从最简单的任务开始，建立信心，然后攻克难题！'] },
      { id: 'daily_work_end', cat: 'daily', kw: ['下班了','收工','今天结束','写完了','完成了'], tpl: ['收工！🎉 今天辛苦了！好好休息，明天继续加油！','完成了~ ✨ 回顾一下今天学到了什么，进步了多少！明天会更好！'] },
      { id: 'daily_weekend_plan', cat: 'daily', kw: ['周末计划','周末干嘛','周末安排','周末做什么'], tpl: ['周末计划~ 📅 建议：休息+学习+娱乐，劳逸结合！可以学点新技术，或者做个小项目！','周末是充电的好时间~ 🔋 可以看看技术书，写写博客，或者出去放松一下！'] },
      { id: 'daily_new_year_resolution', cat: 'daily', kw: ['新年计划','新年目标','新年flag','新年愿望'], tpl: ['新年目标~ 🎯 建议：学一门新技术、做3个项目、写12篇博客、健身52次！你呢？','Flag立起来~ 🚩 程序员的新年目标：少写Bug，多写文档，坚持学习，注意身体！'] },
      { id: 'daily_birthday_wish', cat: 'daily', kw: ['我生日','今天生日','过生日','生日快乐'], tpl: ['生日快乐！🎂🎁🎈 祝你生日快乐，写代码零Bug，技术突飞猛进！','生日大快乐！🎉 今天想吃什么蛋糕？许了什么愿望？希望你的愿望都能实现！'] },
      { id: 'daily_anniversary', cat: 'daily', kw: ['纪念日','周年','一周年','纪念一下'], tpl: ['纪念日快乐~ 🎊 值得纪念的日子！回顾一下一路走来的成长和进步！','纪念一下~ 📸 时间过得真快！继续加油，未来会更好！'] },
      { id: 'daily_festival_spring', cat: 'daily', kw: ['春节','过年','新年好','恭喜发财','红包'], tpl: ['春节快乐！🧧 恭喜发财，万事如意！新的一年写代码零Bug，技术更上一层楼！','过年好~ 🎆 吃年夜饭了吗？收到多少红包？新的一年，我们一起继续学习编程！'] },

      // ===== 更多编程场景（25场景） =====
      { id: 'learn_python_intro', cat: 'learn', kw: ['python入门','python基础','学python','python教程','python难吗'], tpl: ['Python入门很简单~ 🐍 语法接近自然语言，适合零基础！先学变量、循环、函数，再做项目！','Python是最适合初学者的语言之一！💡 推荐路线：基础语法→数据结构→面向对象→做项目→选方向(AI/Web/爬虫)'] },
      { id: 'learn_javascript_intro', cat: 'learn', kw: ['javascript入门','js基础','学javascript','js教程','js难吗'], tpl: ['JavaScript是Web开发核心~ ⚡ 先学基础语法，再学DOM操作，然后学框架(Vue/React)！','JS入门不难，但深入需要时间~ 💡 原型链、闭包、异步是重点和难点，需要多理解！'] },
      { id: 'learn_java_intro', cat: 'learn', kw: ['java入门','java基础','学java','java教程','java难吗'], tpl: ['Java是企业级开发主流~ ☕ 语法严谨，适合大型项目！先学基础，再学面向对象，然后学框架(Spring)！','Java学习曲线稍陡~ 💡 但就业前景好，薪资高！重点掌握：面向对象、集合、多线程、JVM'] },
      { id: 'learn_c_intro', cat: 'learn', kw: ['c语言入门','c基础','学c语言','c教程','c难吗'], tpl: ['C语言是底层基础~ 🔧 很多语言的底层都是C实现！学C能帮你理解计算机原理，指针是重点！','C语言适合想深入理解计算机的人~ 💡 重点：指针、内存管理、结构体。学完C再学其他语言会很容易！'] },
      { id: 'learn_cpp_intro', cat: 'learn', kw: ['c++入门','cpp基础','学c++','c++教程','c++难吗'], tpl: ['C++是高性能语言~ ⚡ 游戏、嵌入式、高频交易都在用！语法复杂，但功能强大！','C++学习曲线较陡~ 💡 重点：面向对象、模板、STL、智能指针、内存管理。适合追求性能的场景！'] },
      { id: 'learn_go_intro', cat: 'learn', kw: ['go入门','golang基础','学go','go教程','go难吗'], tpl: ['Go语言简洁高效~ 🐹 天生支持并发，编译速度快！适合云原生、微服务、后端开发！','Go是21世纪的C语言~ 💡 语法简单，只有25个关键字！重点：goroutine、channel、接口、包管理'] },
      { id: 'learn_rust_intro', cat: 'learn', kw: ['rust入门','rust基础','学rust','rust教程','rust难吗'], tpl: ['Rust是内存安全的系统级语言~ 🦀 无垃圾回收，性能媲美C/C++！被Stack Overflow评为最受喜爱语言！','Rust学习曲线较陡~ 💡 重点：所有权、借用、生命周期、trait。一旦理解，你会爱上它的安全性！'] },
      { id: 'learn_typescript_intro', cat: 'learn', kw: ['typescript入门','ts基础','学typescript','ts教程','ts难吗'], tpl: ['TypeScript是JavaScript的超集~ 📘 添加了类型系统，让JS更适合大型项目！先学JS再学TS！','TS让JS开发更安全~ 💡 重点：类型注解、接口、泛型、枚举。大型项目强烈推荐使用TS！'] },
      { id: 'learn_html_css', cat: 'learn', kw: ['html入门','css入门','前端基础','网页制作','html/css'], tpl: ['HTML是网页骨架，CSS是网页样式~ 🎨 先学HTML标签，再学CSS选择器和布局，然后做页面练习！','前端三剑客：HTML+CSS+JS~ 💡 HTML定义结构，CSS控制样式，JS实现交互。三者配合才能做出好网页！'] },
      { id: 'learn_vue', cat: 'learn', kw: ['vue入门','vue教程','学vue','vue.js','vue难吗'], tpl: ['Vue是渐进式前端框架~ 💚 上手简单，文档友好！先学基础语法，再学组件、路由、状态管理！','Vue3是最新版本~ 💡 重点：组合式API、响应式原理、组件通信、Vue Router、Pinia。国内使用率很高！'] },
      { id: 'learn_react', cat: 'learn', kw: ['react入门','react教程','学react','react.js','react难吗'], tpl: ['React是Facebook开源的前端库~ ⚛️ 组件化开发，生态丰富！先学JSX、组件，再学Hooks！','React学习曲线中等~ 💡 重点：JSX、组件、Hooks(useState/useEffect)、状态管理、路由。大厂使用率高！'] },
      { id: 'learn_nodejs', cat: 'learn', kw: ['nodejs入门','node教程','学node','node.js','后端js'], tpl: ['Node.js让JS可以运行在服务端~ 🟢 基于V8引擎，事件驱动，非阻塞I/O！适合做后端和工具开发！','Node.js生态丰富~ 💡 重点：模块系统、Express/Koa框架、异步编程、npm包管理。全栈开发必备！'] },
      { id: 'learn_mysql', cat: 'learn', kw: ['mysql入门','数据库教程','学mysql','sql基础','数据库难吗'], tpl: ['MySQL是最流行的关系型数据库~ 🐬 先学SQL语法(增删改查)，再学表设计、索引、事务！','数据库是后端必备技能~ 💡 重点：SQL查询、表设计、索引优化、事务ACID、连接查询。建议装个MySQL练练！'] },
      { id: 'learn_redis', cat: 'learn', kw: ['redis入门','缓存','学redis','redis教程','nosql'], tpl: ['Redis是高性能键值数据库~ 🔴 常用于缓存、队列、排行榜！速度极快，支持多种数据结构！','Redis是后端进阶必备~ 💡 重点：数据结构(String/Hash/List/Set/ZSet)、持久化、缓存策略、分布式锁'] },
      { id: 'learn_docker', cat: 'learn', kw: ['docker入门','容器','学docker','docker教程','容器化'], tpl: ['Docker是容器化技术~ 🐳 让应用可以在任何环境一致运行！先学镜像、容器，再学Dockerfile、Compose！','Docker是现代开发必备~ 💡 重点：镜像、容器、Dockerfile、docker-compose、网络、数据卷。学会了部署不再难！'] },
      { id: 'learn_git_advanced', cat: 'learn', kw: ['git进阶','git分支','git合并','git工作流','git rebase'], tpl: ['Git进阶~ 🌿 分支管理是重点！常用工作流：Git Flow、GitHub Flow。学会merge和rebase的区别！','Git高级技巧~ 💡 重点：分支策略、合并冲突解决、rebase、cherry-pick、stash、回滚。团队协作必备！'] },
      { id: 'learn_algorithm_basic', cat: 'learn', kw: ['算法入门','数据结构入门','算法基础','怎么学算法','算法难吗'], tpl: ['算法和数据结构是程序员基本功~ 📐 先学基础数据结构(数组/链表/栈/队列/树)，再学排序和查找算法！','算法学习路线~ 💡 基础：时间复杂度、数组、链表、栈、队列、哈希表。进阶：树、图、排序、查找、动态规划。建议刷LeetCode！'] },
      { id: 'learn_design_pattern', cat: 'learn', kw: ['设计模式','什么是设计模式','设计模式入门','23种设计模式'], tpl: ['设计模式是前人总结的最佳实践~ 🎨 23种经典模式分三类：创建型、结构型、行为型。常用的有单例、工厂、观察者、策略！','设计模式让代码更灵活~ 💡 重点理解：单例、工厂、抽象工厂、适配器、装饰器、代理、观察者、策略、模板方法。不要死记，理解场景！'] },
      { id: 'learn_testing', cat: 'learn', kw: ['单元测试','测试入门','怎么写测试','tdd','测试驱动'], tpl: ['测试让代码更可靠~ 🧪 单元测试测试单个函数，集成测试测试模块间交互。TDD是测试驱动开发，先写测试再写代码！','测试是专业程序员的必备技能~ 💡 重点：测试框架(Jest/pytest/JUnit)、断言、Mock、测试覆盖率、边界测试。好的测试让你敢重构！'] },
      { id: 'learn_ci_cd', cat: 'learn', kw: ['ci/cd','持续集成','持续部署','自动化部署','jenkins','github actions'], tpl: ['CI/CD是现代开发流程~ 🔄 CI持续集成(自动构建测试)，CD持续部署(自动发布)。常用工具：Jenkins、GitHub Actions、GitLab CI！','CI/CD让发布更高效~ 💡 重点理解：自动化构建、自动化测试、代码检查、自动部署。配置好后，提交代码就能自动发布！'] },
      { id: 'learn_microservice', cat: 'learn', kw: ['微服务','微服务架构','分布式','服务拆分','微服务入门'], tpl: ['微服务是架构风格~ 🏗️ 将单体应用拆分为多个小服务，独立部署、独立扩展。优点：灵活、可扩展；缺点：复杂、运维成本高！','微服务不是银弹~ 💡 重点理解：服务拆分原则、API网关、服务注册发现、配置中心、熔断降级、分布式事务。小团队慎用！'] },
      { id: 'learn_security_basic', cat: 'learn', kw: ['网络安全入门','安全开发','sql注入','xss','csrf'], tpl: ['安全开发很重要~ 🔒 常见漏洞：SQL注入、XSS跨站脚本、CSRF跨站请求伪造、密码明文存储。防御：输入验证、参数化查询、输出编码、密码加密！','安全意识要从编码开始~ 💡 永远不要信任用户输入！所有输入都要验证和转义。密码用bcrypt/argon2加密。用HTTPS传输。定期更新依赖！'] },
      { id: 'learn_performance', cat: 'learn', kw: ['性能优化','网站优化','加载速度','性能调优','前端性能'], tpl: ['性能优化是进阶技能~ ⚡ 前端：减少请求、压缩资源、懒加载、CDN、缓存。后端：数据库索引、缓存、异步、并发优化！','性能优化先测量再优化~ 💡 用工具找到瓶颈：Chrome DevTools、Lighthouse、火焰图。不要过早优化！先让功能正确，再优化性能！'] },
      { id: 'learn_ai_prompt', cat: 'learn', kw: ['ai编程','copilot','chatgpt编程','ai辅助编程','提示词'], tpl: ['AI是编程的好帮手~ 🤖 善用AI可以提高效率！但要理解AI生成的代码，不要盲目复制。AI擅长：模板代码、解释、重构、测试生成！','AI辅助编程技巧~ 💡 提示词要具体：说明语言、需求、约束、示例。让AI解释代码而不是直接给答案。把AI当助手，不是替代品。核心能力还是要自己掌握！'] },
      { id: 'learn_open_source', cat: 'learn', kw: ['开源','参与开源','开源项目','怎么贡献开源','github开源'], tpl: ['参与开源是提升技术的好方法~ 🌍 从简单的开始：修Bug、改文档、加测试。先fork项目，再提PR。阅读优秀源码也是学习！','开源贡献指南~ 💡 选一个你用的项目，看看issues里有没有good first issue。先在本地跑起来，理解代码结构。提交PR时写清楚改动原因和测试！'] },

      { id: 'lang_python_入门', kw: ['python入门','入门System.Collections.Hashtable','python零基础','零基础System.Collections.Hashtable','python初学','初学System.Collections.Hashtable','python新手教程','新手教程System.Collections.Hashtable'], tpl: ['Python入门很简单~ 🐍 先学变量、数据类型、运算符，再学控制流和函数！多写多练，每天进步一点点！','Python入门学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_基础语法', kw: ['python基础语法','基础语法System.Collections.Hashtable','python语法基础','语法基础System.Collections.Hashtable','python基本语法','基本语法System.Collections.Hashtable','python语法入门','语法入门System.Collections.Hashtable'], tpl: ['Python基础语法包括：变量声明、数据类型、运算符、表达式、语句。掌握这些就能写简单程序了~ 🐍','Python基础语法学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_变量', kw: ['python变量','变量System.Collections.Hashtable','python变量声明','变量声明System.Collections.Hashtable','python变量定义','变量定义System.Collections.Hashtable','python赋值','赋值System.Collections.Hashtable'], tpl: ['Python变量是存储数据的容器~ 🐍 变量名要见名知意，遵循命名规范。不同语言声明方式不同，但核心概念一样！','Python变量学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_数据类型', kw: ['python数据类型','数据类型System.Collections.Hashtable','python类型','类型System.Collections.Hashtable','python基本类型','基本类型System.Collections.Hashtable','python类型系统','类型系统System.Collections.Hashtable'], tpl: ['Python常见数据类型：数字、字符串、布尔、数组、对象/字典、null/undefined~ 🐍 理解类型系统很重要！','Python数据类型学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_运算符', kw: ['python运算符','运算符System.Collections.Hashtable','python算术运算','算术运算System.Collections.Hashtable','python比较运算','比较运算System.Collections.Hashtable','python逻辑运算','逻辑运算System.Collections.Hashtable'], tpl: ['Python运算符包括：算术(+ - * /)、比较(> < ==)、逻辑(&& || !)、赋值(= +=)~ 🐍 注意运算符优先级！','Python运算符学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_条件语句', kw: ['python条件语句','条件语句System.Collections.Hashtable','pythonif语句','if语句System.Collections.Hashtable','pythonif else','if elseSystem.Collections.Hashtable','python分支','分支System.Collections.Hashtable','python判断','判断System.Collections.Hashtable'], tpl: ['Python条件语句让程序做判断~ 🐍 if/else if/else，根据条件执行不同代码块。注意条件表达式要写对！','Python条件语句学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_循环', kw: ['python循环','循环System.Collections.Hashtable','pythonfor循环','for循环System.Collections.Hashtable','pythonwhile循环','while循环System.Collections.Hashtable','python遍历','遍历System.Collections.Hashtable','python迭代','迭代System.Collections.Hashtable'], tpl: ['Python循环让代码重复执行~ 🐍 for适合已知次数，while适合条件判断。别忘了改变循环条件，否则会死循环！','Python循环学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_函数', kw: ['python函数','函数System.Collections.Hashtable','python方法','方法System.Collections.Hashtable','pythonfunction','functionSystem.Collections.Hashtable','pythondef','defSystem.Collections.Hashtable','python函数定义','函数定义System.Collections.Hashtable'], tpl: ['Python函数是可复用的代码块~ 🐍 参数是输入，返回值是输出。函数名要描述它做什么！单一职责原则很重要~','Python函数学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_数组', kw: ['python数组','数组System.Collections.Hashtable','python列表','列表System.Collections.Hashtable','pythonlist','listSystem.Collections.Hashtable','pythonarray','arraySystem.Collections.Hashtable','python集合','集合System.Collections.Hashtable'], tpl: ['Python数组/列表存储多个有序数据~ 🐍 索引从0开始！常用操作：增删改查、遍历、排序、筛选。这是最常用的数据结构！','Python数组学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_字符串', kw: ['python字符串','字符串System.Collections.Hashtable','pythonstring','stringSystem.Collections.Hashtable','python文本处理','文本处理System.Collections.Hashtable','python字符串操作','字符串操作System.Collections.Hashtable'], tpl: ['Python字符串处理很常用~ 🐍 拼接、截取、查找、替换、大小写转换、分割、合并。掌握字符串操作能解决很多问题！','Python字符串学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_面向对象', kw: ['python面向对象','面向对象System.Collections.Hashtable','python类','类System.Collections.Hashtable','python对象','对象System.Collections.Hashtable','pythonclass','classSystem.Collections.Hashtable','python继承','继承System.Collections.Hashtable','python封装','封装System.Collections.Hashtable','python多态','多态System.Collections.Hashtable'], tpl: ['Python面向对象编程~ 🐍 类是蓝图，对象是实例。三大特性：封装、继承、多态。理解了面向对象，代码组织能力会大幅提升！','Python面向对象学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_异常处理', kw: ['python异常处理','异常处理System.Collections.Hashtable','python错误处理','错误处理System.Collections.Hashtable','pythontry catch','try catchSystem.Collections.Hashtable','python异常','异常System.Collections.Hashtable','python报错处理','报错处理System.Collections.Hashtable'], tpl: ['Python异常处理让程序更健壮~ 🐍 try/catch/finally，捕获并处理错误，而不是让程序崩溃。好的错误处理是专业程序员的标志！','Python异常处理学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_文件操作', kw: ['python文件操作','文件操作System.Collections.Hashtable','python读写文件','读写文件System.Collections.Hashtable','python文件读写','文件读写System.Collections.Hashtable','pythonio','ioSystem.Collections.Hashtable','python文件处理','文件处理System.Collections.Hashtable'], tpl: ['Python文件操作~ 🐍 打开、读取、写入、关闭文件。注意处理编码和异常！操作完一定要关闭文件，或用with语句自动管理。','Python文件操作学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_模块导入', kw: ['python模块','模块System.Collections.Hashtable','python导入','导入System.Collections.Hashtable','pythonimport','importSystem.Collections.Hashtable','pythonrequire','requireSystem.Collections.Hashtable','python包管理','包管理System.Collections.Hashtable','python库','库System.Collections.Hashtable'], tpl: ['Python模块系统让代码可复用~ 🐍 import/require导入其他文件的代码。学会使用标准库和第三方库，站在巨人的肩膀上！','Python模块导入学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_python_调试技巧', kw: ['python调试','调试System.Collections.Hashtable','pythondebug','debugSystem.Collections.Hashtable','python找bug','找bugSystem.Collections.Hashtable','python排错','排错System.Collections.Hashtable','python调试技巧','调试技巧System.Collections.Hashtable'], tpl: ['Python调试是必备技能~ 🐍 打印日志、断点调试、二分法注释、小黄鸭调试法。先复现问题，再定位，再分析，最后修复验证！','Python调试技巧学习指南~ 🐍 简洁优雅的解释型语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_入门', kw: ['javascript入门','入门System.Collections.Hashtable','javascript零基础','零基础System.Collections.Hashtable','javascript初学','初学System.Collections.Hashtable','javascript新手教程','新手教程System.Collections.Hashtable'], tpl: ['JavaScript入门很简单~ ⚡ 先学变量、数据类型、运算符，再学控制流和函数！多写多练，每天进步一点点！','JavaScript入门学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_基础语法', kw: ['javascript基础语法','基础语法System.Collections.Hashtable','javascript语法基础','语法基础System.Collections.Hashtable','javascript基本语法','基本语法System.Collections.Hashtable','javascript语法入门','语法入门System.Collections.Hashtable'], tpl: ['JavaScript基础语法包括：变量声明、数据类型、运算符、表达式、语句。掌握这些就能写简单程序了~ ⚡','JavaScript基础语法学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_变量', kw: ['javascript变量','变量System.Collections.Hashtable','javascript变量声明','变量声明System.Collections.Hashtable','javascript变量定义','变量定义System.Collections.Hashtable','javascript赋值','赋值System.Collections.Hashtable'], tpl: ['JavaScript变量是存储数据的容器~ ⚡ 变量名要见名知意，遵循命名规范。不同语言声明方式不同，但核心概念一样！','JavaScript变量学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_数据类型', kw: ['javascript数据类型','数据类型System.Collections.Hashtable','javascript类型','类型System.Collections.Hashtable','javascript基本类型','基本类型System.Collections.Hashtable','javascript类型系统','类型系统System.Collections.Hashtable'], tpl: ['JavaScript常见数据类型：数字、字符串、布尔、数组、对象/字典、null/undefined~ ⚡ 理解类型系统很重要！','JavaScript数据类型学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_运算符', kw: ['javascript运算符','运算符System.Collections.Hashtable','javascript算术运算','算术运算System.Collections.Hashtable','javascript比较运算','比较运算System.Collections.Hashtable','javascript逻辑运算','逻辑运算System.Collections.Hashtable'], tpl: ['JavaScript运算符包括：算术(+ - * /)、比较(> < ==)、逻辑(&& || !)、赋值(= +=)~ ⚡ 注意运算符优先级！','JavaScript运算符学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_条件语句', kw: ['javascript条件语句','条件语句System.Collections.Hashtable','javascriptif语句','if语句System.Collections.Hashtable','javascriptif else','if elseSystem.Collections.Hashtable','javascript分支','分支System.Collections.Hashtable','javascript判断','判断System.Collections.Hashtable'], tpl: ['JavaScript条件语句让程序做判断~ ⚡ if/else if/else，根据条件执行不同代码块。注意条件表达式要写对！','JavaScript条件语句学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_循环', kw: ['javascript循环','循环System.Collections.Hashtable','javascriptfor循环','for循环System.Collections.Hashtable','javascriptwhile循环','while循环System.Collections.Hashtable','javascript遍历','遍历System.Collections.Hashtable','javascript迭代','迭代System.Collections.Hashtable'], tpl: ['JavaScript循环让代码重复执行~ ⚡ for适合已知次数，while适合条件判断。别忘了改变循环条件，否则会死循环！','JavaScript循环学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_函数', kw: ['javascript函数','函数System.Collections.Hashtable','javascript方法','方法System.Collections.Hashtable','javascriptfunction','functionSystem.Collections.Hashtable','javascriptdef','defSystem.Collections.Hashtable','javascript函数定义','函数定义System.Collections.Hashtable'], tpl: ['JavaScript函数是可复用的代码块~ ⚡ 参数是输入，返回值是输出。函数名要描述它做什么！单一职责原则很重要~','JavaScript函数学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_数组', kw: ['javascript数组','数组System.Collections.Hashtable','javascript列表','列表System.Collections.Hashtable','javascriptlist','listSystem.Collections.Hashtable','javascriptarray','arraySystem.Collections.Hashtable','javascript集合','集合System.Collections.Hashtable'], tpl: ['JavaScript数组/列表存储多个有序数据~ ⚡ 索引从0开始！常用操作：增删改查、遍历、排序、筛选。这是最常用的数据结构！','JavaScript数组学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_字符串', kw: ['javascript字符串','字符串System.Collections.Hashtable','javascriptstring','stringSystem.Collections.Hashtable','javascript文本处理','文本处理System.Collections.Hashtable','javascript字符串操作','字符串操作System.Collections.Hashtable'], tpl: ['JavaScript字符串处理很常用~ ⚡ 拼接、截取、查找、替换、大小写转换、分割、合并。掌握字符串操作能解决很多问题！','JavaScript字符串学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_面向对象', kw: ['javascript面向对象','面向对象System.Collections.Hashtable','javascript类','类System.Collections.Hashtable','javascript对象','对象System.Collections.Hashtable','javascriptclass','classSystem.Collections.Hashtable','javascript继承','继承System.Collections.Hashtable','javascript封装','封装System.Collections.Hashtable','javascript多态','多态System.Collections.Hashtable'], tpl: ['JavaScript面向对象编程~ ⚡ 类是蓝图，对象是实例。三大特性：封装、继承、多态。理解了面向对象，代码组织能力会大幅提升！','JavaScript面向对象学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_异常处理', kw: ['javascript异常处理','异常处理System.Collections.Hashtable','javascript错误处理','错误处理System.Collections.Hashtable','javascripttry catch','try catchSystem.Collections.Hashtable','javascript异常','异常System.Collections.Hashtable','javascript报错处理','报错处理System.Collections.Hashtable'], tpl: ['JavaScript异常处理让程序更健壮~ ⚡ try/catch/finally，捕获并处理错误，而不是让程序崩溃。好的错误处理是专业程序员的标志！','JavaScript异常处理学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_文件操作', kw: ['javascript文件操作','文件操作System.Collections.Hashtable','javascript读写文件','读写文件System.Collections.Hashtable','javascript文件读写','文件读写System.Collections.Hashtable','javascriptio','ioSystem.Collections.Hashtable','javascript文件处理','文件处理System.Collections.Hashtable'], tpl: ['JavaScript文件操作~ ⚡ 打开、读取、写入、关闭文件。注意处理编码和异常！操作完一定要关闭文件，或用with语句自动管理。','JavaScript文件操作学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_模块导入', kw: ['javascript模块','模块System.Collections.Hashtable','javascript导入','导入System.Collections.Hashtable','javascriptimport','importSystem.Collections.Hashtable','javascriptrequire','requireSystem.Collections.Hashtable','javascript包管理','包管理System.Collections.Hashtable','javascript库','库System.Collections.Hashtable'], tpl: ['JavaScript模块系统让代码可复用~ ⚡ import/require导入其他文件的代码。学会使用标准库和第三方库，站在巨人的肩膀上！','JavaScript模块导入学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_javascript_调试技巧', kw: ['javascript调试','调试System.Collections.Hashtable','javascriptdebug','debugSystem.Collections.Hashtable','javascript找bug','找bugSystem.Collections.Hashtable','javascript排错','排错System.Collections.Hashtable','javascript调试技巧','调试技巧System.Collections.Hashtable'], tpl: ['JavaScript调试是必备技能~ ⚡ 打印日志、断点调试、二分法注释、小黄鸭调试法。先复现问题，再定位，再分析，最后修复验证！','JavaScript调试技巧学习指南~ ⚡ Web开发核心语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_入门', kw: ['java入门','入门System.Collections.Hashtable','java零基础','零基础System.Collections.Hashtable','java初学','初学System.Collections.Hashtable','java新手教程','新手教程System.Collections.Hashtable'], tpl: ['Java入门很简单~ ☕ 先学变量、数据类型、运算符，再学控制流和函数！多写多练，每天进步一点点！','Java入门学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_基础语法', kw: ['java基础语法','基础语法System.Collections.Hashtable','java语法基础','语法基础System.Collections.Hashtable','java基本语法','基本语法System.Collections.Hashtable','java语法入门','语法入门System.Collections.Hashtable'], tpl: ['Java基础语法包括：变量声明、数据类型、运算符、表达式、语句。掌握这些就能写简单程序了~ ☕','Java基础语法学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_变量', kw: ['java变量','变量System.Collections.Hashtable','java变量声明','变量声明System.Collections.Hashtable','java变量定义','变量定义System.Collections.Hashtable','java赋值','赋值System.Collections.Hashtable'], tpl: ['Java变量是存储数据的容器~ ☕ 变量名要见名知意，遵循命名规范。不同语言声明方式不同，但核心概念一样！','Java变量学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_数据类型', kw: ['java数据类型','数据类型System.Collections.Hashtable','java类型','类型System.Collections.Hashtable','java基本类型','基本类型System.Collections.Hashtable','java类型系统','类型系统System.Collections.Hashtable'], tpl: ['Java常见数据类型：数字、字符串、布尔、数组、对象/字典、null/undefined~ ☕ 理解类型系统很重要！','Java数据类型学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_运算符', kw: ['java运算符','运算符System.Collections.Hashtable','java算术运算','算术运算System.Collections.Hashtable','java比较运算','比较运算System.Collections.Hashtable','java逻辑运算','逻辑运算System.Collections.Hashtable'], tpl: ['Java运算符包括：算术(+ - * /)、比较(> < ==)、逻辑(&& || !)、赋值(= +=)~ ☕ 注意运算符优先级！','Java运算符学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_条件语句', kw: ['java条件语句','条件语句System.Collections.Hashtable','javaif语句','if语句System.Collections.Hashtable','javaif else','if elseSystem.Collections.Hashtable','java分支','分支System.Collections.Hashtable','java判断','判断System.Collections.Hashtable'], tpl: ['Java条件语句让程序做判断~ ☕ if/else if/else，根据条件执行不同代码块。注意条件表达式要写对！','Java条件语句学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_循环', kw: ['java循环','循环System.Collections.Hashtable','javafor循环','for循环System.Collections.Hashtable','javawhile循环','while循环System.Collections.Hashtable','java遍历','遍历System.Collections.Hashtable','java迭代','迭代System.Collections.Hashtable'], tpl: ['Java循环让代码重复执行~ ☕ for适合已知次数，while适合条件判断。别忘了改变循环条件，否则会死循环！','Java循环学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_函数', kw: ['java函数','函数System.Collections.Hashtable','java方法','方法System.Collections.Hashtable','javafunction','functionSystem.Collections.Hashtable','javadef','defSystem.Collections.Hashtable','java函数定义','函数定义System.Collections.Hashtable'], tpl: ['Java函数是可复用的代码块~ ☕ 参数是输入，返回值是输出。函数名要描述它做什么！单一职责原则很重要~','Java函数学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_数组', kw: ['java数组','数组System.Collections.Hashtable','java列表','列表System.Collections.Hashtable','javalist','listSystem.Collections.Hashtable','javaarray','arraySystem.Collections.Hashtable','java集合','集合System.Collections.Hashtable'], tpl: ['Java数组/列表存储多个有序数据~ ☕ 索引从0开始！常用操作：增删改查、遍历、排序、筛选。这是最常用的数据结构！','Java数组学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_字符串', kw: ['java字符串','字符串System.Collections.Hashtable','javastring','stringSystem.Collections.Hashtable','java文本处理','文本处理System.Collections.Hashtable','java字符串操作','字符串操作System.Collections.Hashtable'], tpl: ['Java字符串处理很常用~ ☕ 拼接、截取、查找、替换、大小写转换、分割、合并。掌握字符串操作能解决很多问题！','Java字符串学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_面向对象', kw: ['java面向对象','面向对象System.Collections.Hashtable','java类','类System.Collections.Hashtable','java对象','对象System.Collections.Hashtable','javaclass','classSystem.Collections.Hashtable','java继承','继承System.Collections.Hashtable','java封装','封装System.Collections.Hashtable','java多态','多态System.Collections.Hashtable'], tpl: ['Java面向对象编程~ ☕ 类是蓝图，对象是实例。三大特性：封装、继承、多态。理解了面向对象，代码组织能力会大幅提升！','Java面向对象学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_异常处理', kw: ['java异常处理','异常处理System.Collections.Hashtable','java错误处理','错误处理System.Collections.Hashtable','javatry catch','try catchSystem.Collections.Hashtable','java异常','异常System.Collections.Hashtable','java报错处理','报错处理System.Collections.Hashtable'], tpl: ['Java异常处理让程序更健壮~ ☕ try/catch/finally，捕获并处理错误，而不是让程序崩溃。好的错误处理是专业程序员的标志！','Java异常处理学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_文件操作', kw: ['java文件操作','文件操作System.Collections.Hashtable','java读写文件','读写文件System.Collections.Hashtable','java文件读写','文件读写System.Collections.Hashtable','javaio','ioSystem.Collections.Hashtable','java文件处理','文件处理System.Collections.Hashtable'], tpl: ['Java文件操作~ ☕ 打开、读取、写入、关闭文件。注意处理编码和异常！操作完一定要关闭文件，或用with语句自动管理。','Java文件操作学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_模块导入', kw: ['java模块','模块System.Collections.Hashtable','java导入','导入System.Collections.Hashtable','javaimport','importSystem.Collections.Hashtable','javarequire','requireSystem.Collections.Hashtable','java包管理','包管理System.Collections.Hashtable','java库','库System.Collections.Hashtable'], tpl: ['Java模块系统让代码可复用~ ☕ import/require导入其他文件的代码。学会使用标准库和第三方库，站在巨人的肩膀上！','Java模块导入学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_java_调试技巧', kw: ['java调试','调试System.Collections.Hashtable','javadebug','debugSystem.Collections.Hashtable','java找bug','找bugSystem.Collections.Hashtable','java排错','排错System.Collections.Hashtable','java调试技巧','调试技巧System.Collections.Hashtable'], tpl: ['Java调试是必备技能~ ☕ 打印日志、断点调试、二分法注释、小黄鸭调试法。先复现问题，再定位，再分析，最后修复验证！','Java调试技巧学习指南~ ☕ 企业级开发主流语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_入门', kw: ['c语言入门','入门System.Collections.Hashtable','c语言零基础','零基础System.Collections.Hashtable','c语言初学','初学System.Collections.Hashtable','c语言新手教程','新手教程System.Collections.Hashtable'], tpl: ['C语言入门很简单~ 🔧 先学变量、数据类型、运算符，再学控制流和函数！多写多练，每天进步一点点！','C语言入门学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_基础语法', kw: ['c语言基础语法','基础语法System.Collections.Hashtable','c语言语法基础','语法基础System.Collections.Hashtable','c语言基本语法','基本语法System.Collections.Hashtable','c语言语法入门','语法入门System.Collections.Hashtable'], tpl: ['C语言基础语法包括：变量声明、数据类型、运算符、表达式、语句。掌握这些就能写简单程序了~ 🔧','C语言基础语法学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_变量', kw: ['c语言变量','变量System.Collections.Hashtable','c语言变量声明','变量声明System.Collections.Hashtable','c语言变量定义','变量定义System.Collections.Hashtable','c语言赋值','赋值System.Collections.Hashtable'], tpl: ['C语言变量是存储数据的容器~ 🔧 变量名要见名知意，遵循命名规范。不同语言声明方式不同，但核心概念一样！','C语言变量学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_数据类型', kw: ['c语言数据类型','数据类型System.Collections.Hashtable','c语言类型','类型System.Collections.Hashtable','c语言基本类型','基本类型System.Collections.Hashtable','c语言类型系统','类型系统System.Collections.Hashtable'], tpl: ['C语言常见数据类型：数字、字符串、布尔、数组、对象/字典、null/undefined~ 🔧 理解类型系统很重要！','C语言数据类型学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_运算符', kw: ['c语言运算符','运算符System.Collections.Hashtable','c语言算术运算','算术运算System.Collections.Hashtable','c语言比较运算','比较运算System.Collections.Hashtable','c语言逻辑运算','逻辑运算System.Collections.Hashtable'], tpl: ['C语言运算符包括：算术(+ - * /)、比较(> < ==)、逻辑(&& || !)、赋值(= +=)~ 🔧 注意运算符优先级！','C语言运算符学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_条件语句', kw: ['c语言条件语句','条件语句System.Collections.Hashtable','c语言if语句','if语句System.Collections.Hashtable','c语言if else','if elseSystem.Collections.Hashtable','c语言分支','分支System.Collections.Hashtable','c语言判断','判断System.Collections.Hashtable'], tpl: ['C语言条件语句让程序做判断~ 🔧 if/else if/else，根据条件执行不同代码块。注意条件表达式要写对！','C语言条件语句学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_循环', kw: ['c语言循环','循环System.Collections.Hashtable','c语言for循环','for循环System.Collections.Hashtable','c语言while循环','while循环System.Collections.Hashtable','c语言遍历','遍历System.Collections.Hashtable','c语言迭代','迭代System.Collections.Hashtable'], tpl: ['C语言循环让代码重复执行~ 🔧 for适合已知次数，while适合条件判断。别忘了改变循环条件，否则会死循环！','C语言循环学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_函数', kw: ['c语言函数','函数System.Collections.Hashtable','c语言方法','方法System.Collections.Hashtable','c语言function','functionSystem.Collections.Hashtable','c语言def','defSystem.Collections.Hashtable','c语言函数定义','函数定义System.Collections.Hashtable'], tpl: ['C语言函数是可复用的代码块~ 🔧 参数是输入，返回值是输出。函数名要描述它做什么！单一职责原则很重要~','C语言函数学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_数组', kw: ['c语言数组','数组System.Collections.Hashtable','c语言列表','列表System.Collections.Hashtable','c语言list','listSystem.Collections.Hashtable','c语言array','arraySystem.Collections.Hashtable','c语言集合','集合System.Collections.Hashtable'], tpl: ['C语言数组/列表存储多个有序数据~ 🔧 索引从0开始！常用操作：增删改查、遍历、排序、筛选。这是最常用的数据结构！','C语言数组学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_字符串', kw: ['c语言字符串','字符串System.Collections.Hashtable','c语言string','stringSystem.Collections.Hashtable','c语言文本处理','文本处理System.Collections.Hashtable','c语言字符串操作','字符串操作System.Collections.Hashtable'], tpl: ['C语言字符串处理很常用~ 🔧 拼接、截取、查找、替换、大小写转换、分割、合并。掌握字符串操作能解决很多问题！','C语言字符串学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_面向对象', kw: ['c语言面向对象','面向对象System.Collections.Hashtable','c语言类','类System.Collections.Hashtable','c语言对象','对象System.Collections.Hashtable','c语言class','classSystem.Collections.Hashtable','c语言继承','继承System.Collections.Hashtable','c语言封装','封装System.Collections.Hashtable','c语言多态','多态System.Collections.Hashtable'], tpl: ['C语言面向对象编程~ 🔧 类是蓝图，对象是实例。三大特性：封装、继承、多态。理解了面向对象，代码组织能力会大幅提升！','C语言面向对象学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_异常处理', kw: ['c语言异常处理','异常处理System.Collections.Hashtable','c语言错误处理','错误处理System.Collections.Hashtable','c语言try catch','try catchSystem.Collections.Hashtable','c语言异常','异常System.Collections.Hashtable','c语言报错处理','报错处理System.Collections.Hashtable'], tpl: ['C语言异常处理让程序更健壮~ 🔧 try/catch/finally，捕获并处理错误，而不是让程序崩溃。好的错误处理是专业程序员的标志！','C语言异常处理学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_文件操作', kw: ['c语言文件操作','文件操作System.Collections.Hashtable','c语言读写文件','读写文件System.Collections.Hashtable','c语言文件读写','文件读写System.Collections.Hashtable','c语言io','ioSystem.Collections.Hashtable','c语言文件处理','文件处理System.Collections.Hashtable'], tpl: ['C语言文件操作~ 🔧 打开、读取、写入、关闭文件。注意处理编码和异常！操作完一定要关闭文件，或用with语句自动管理。','C语言文件操作学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_模块导入', kw: ['c语言模块','模块System.Collections.Hashtable','c语言导入','导入System.Collections.Hashtable','c语言import','importSystem.Collections.Hashtable','c语言require','requireSystem.Collections.Hashtable','c语言包管理','包管理System.Collections.Hashtable','c语言库','库System.Collections.Hashtable'], tpl: ['C语言模块系统让代码可复用~ 🔧 import/require导入其他文件的代码。学会使用标准库和第三方库，站在巨人的肩膀上！','C语言模块导入学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c语言_调试技巧', kw: ['c语言调试','调试System.Collections.Hashtable','c语言debug','debugSystem.Collections.Hashtable','c语言找bug','找bugSystem.Collections.Hashtable','c语言排错','排错System.Collections.Hashtable','c语言调试技巧','调试技巧System.Collections.Hashtable'], tpl: ['C语言调试是必备技能~ 🔧 打印日志、断点调试、二分法注释、小黄鸭调试法。先复现问题，再定位，再分析，最后修复验证！','C语言调试技巧学习指南~ 🔧 底层系统编程语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_入门', kw: ['c++入门','入门System.Collections.Hashtable','c++零基础','零基础System.Collections.Hashtable','c++初学','初学System.Collections.Hashtable','c++新手教程','新手教程System.Collections.Hashtable'], tpl: ['C++入门很简单~ ⚙️ 先学变量、数据类型、运算符，再学控制流和函数！多写多练，每天进步一点点！','C++入门学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_基础语法', kw: ['c++基础语法','基础语法System.Collections.Hashtable','c++语法基础','语法基础System.Collections.Hashtable','c++基本语法','基本语法System.Collections.Hashtable','c++语法入门','语法入门System.Collections.Hashtable'], tpl: ['C++基础语法包括：变量声明、数据类型、运算符、表达式、语句。掌握这些就能写简单程序了~ ⚙️','C++基础语法学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_变量', kw: ['c++变量','变量System.Collections.Hashtable','c++变量声明','变量声明System.Collections.Hashtable','c++变量定义','变量定义System.Collections.Hashtable','c++赋值','赋值System.Collections.Hashtable'], tpl: ['C++变量是存储数据的容器~ ⚙️ 变量名要见名知意，遵循命名规范。不同语言声明方式不同，但核心概念一样！','C++变量学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_数据类型', kw: ['c++数据类型','数据类型System.Collections.Hashtable','c++类型','类型System.Collections.Hashtable','c++基本类型','基本类型System.Collections.Hashtable','c++类型系统','类型系统System.Collections.Hashtable'], tpl: ['C++常见数据类型：数字、字符串、布尔、数组、对象/字典、null/undefined~ ⚙️ 理解类型系统很重要！','C++数据类型学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_运算符', kw: ['c++运算符','运算符System.Collections.Hashtable','c++算术运算','算术运算System.Collections.Hashtable','c++比较运算','比较运算System.Collections.Hashtable','c++逻辑运算','逻辑运算System.Collections.Hashtable'], tpl: ['C++运算符包括：算术(+ - * /)、比较(> < ==)、逻辑(&& || !)、赋值(= +=)~ ⚙️ 注意运算符优先级！','C++运算符学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_条件语句', kw: ['c++条件语句','条件语句System.Collections.Hashtable','c++if语句','if语句System.Collections.Hashtable','c++if else','if elseSystem.Collections.Hashtable','c++分支','分支System.Collections.Hashtable','c++判断','判断System.Collections.Hashtable'], tpl: ['C++条件语句让程序做判断~ ⚙️ if/else if/else，根据条件执行不同代码块。注意条件表达式要写对！','C++条件语句学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_循环', kw: ['c++循环','循环System.Collections.Hashtable','c++for循环','for循环System.Collections.Hashtable','c++while循环','while循环System.Collections.Hashtable','c++遍历','遍历System.Collections.Hashtable','c++迭代','迭代System.Collections.Hashtable'], tpl: ['C++循环让代码重复执行~ ⚙️ for适合已知次数，while适合条件判断。别忘了改变循环条件，否则会死循环！','C++循环学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_函数', kw: ['c++函数','函数System.Collections.Hashtable','c++方法','方法System.Collections.Hashtable','c++function','functionSystem.Collections.Hashtable','c++def','defSystem.Collections.Hashtable','c++函数定义','函数定义System.Collections.Hashtable'], tpl: ['C++函数是可复用的代码块~ ⚙️ 参数是输入，返回值是输出。函数名要描述它做什么！单一职责原则很重要~','C++函数学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_数组', kw: ['c++数组','数组System.Collections.Hashtable','c++列表','列表System.Collections.Hashtable','c++list','listSystem.Collections.Hashtable','c++array','arraySystem.Collections.Hashtable','c++集合','集合System.Collections.Hashtable'], tpl: ['C++数组/列表存储多个有序数据~ ⚙️ 索引从0开始！常用操作：增删改查、遍历、排序、筛选。这是最常用的数据结构！','C++数组学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_字符串', kw: ['c++字符串','字符串System.Collections.Hashtable','c++string','stringSystem.Collections.Hashtable','c++文本处理','文本处理System.Collections.Hashtable','c++字符串操作','字符串操作System.Collections.Hashtable'], tpl: ['C++字符串处理很常用~ ⚙️ 拼接、截取、查找、替换、大小写转换、分割、合并。掌握字符串操作能解决很多问题！','C++字符串学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_面向对象', kw: ['c++面向对象','面向对象System.Collections.Hashtable','c++类','类System.Collections.Hashtable','c++对象','对象System.Collections.Hashtable','c++class','classSystem.Collections.Hashtable','c++继承','继承System.Collections.Hashtable','c++封装','封装System.Collections.Hashtable','c++多态','多态System.Collections.Hashtable'], tpl: ['C++面向对象编程~ ⚙️ 类是蓝图，对象是实例。三大特性：封装、继承、多态。理解了面向对象，代码组织能力会大幅提升！','C++面向对象学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_异常处理', kw: ['c++异常处理','异常处理System.Collections.Hashtable','c++错误处理','错误处理System.Collections.Hashtable','c++try catch','try catchSystem.Collections.Hashtable','c++异常','异常System.Collections.Hashtable','c++报错处理','报错处理System.Collections.Hashtable'], tpl: ['C++异常处理让程序更健壮~ ⚙️ try/catch/finally，捕获并处理错误，而不是让程序崩溃。好的错误处理是专业程序员的标志！','C++异常处理学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_文件操作', kw: ['c++文件操作','文件操作System.Collections.Hashtable','c++读写文件','读写文件System.Collections.Hashtable','c++文件读写','文件读写System.Collections.Hashtable','c++io','ioSystem.Collections.Hashtable','c++文件处理','文件处理System.Collections.Hashtable'], tpl: ['C++文件操作~ ⚙️ 打开、读取、写入、关闭文件。注意处理编码和异常！操作完一定要关闭文件，或用with语句自动管理。','C++文件操作学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_模块导入', kw: ['c++模块','模块System.Collections.Hashtable','c++导入','导入System.Collections.Hashtable','c++import','importSystem.Collections.Hashtable','c++require','requireSystem.Collections.Hashtable','c++包管理','包管理System.Collections.Hashtable','c++库','库System.Collections.Hashtable'], tpl: ['C++模块系统让代码可复用~ ⚙️ import/require导入其他文件的代码。学会使用标准库和第三方库，站在巨人的肩膀上！','C++模块导入学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_c++_调试技巧', kw: ['c++调试','调试System.Collections.Hashtable','c++debug','debugSystem.Collections.Hashtable','c++找bug','找bugSystem.Collections.Hashtable','c++排错','排错System.Collections.Hashtable','c++调试技巧','调试技巧System.Collections.Hashtable'], tpl: ['C++调试是必备技能~ ⚙️ 打印日志、断点调试、二分法注释、小黄鸭调试法。先复现问题，再定位，再分析，最后修复验证！','C++调试技巧学习指南~ ⚙️ 高性能多范式语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_入门', kw: ['go语言入门','入门System.Collections.Hashtable','go语言零基础','零基础System.Collections.Hashtable','go语言初学','初学System.Collections.Hashtable','go语言新手教程','新手教程System.Collections.Hashtable'], tpl: ['Go入门很简单~ 🐹 先学变量、数据类型、运算符，再学控制流和函数！多写多练，每天进步一点点！','Go入门学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_基础语法', kw: ['go语言基础语法','基础语法System.Collections.Hashtable','go语言语法基础','语法基础System.Collections.Hashtable','go语言基本语法','基本语法System.Collections.Hashtable','go语言语法入门','语法入门System.Collections.Hashtable'], tpl: ['Go基础语法包括：变量声明、数据类型、运算符、表达式、语句。掌握这些就能写简单程序了~ 🐹','Go基础语法学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_变量', kw: ['go语言变量','变量System.Collections.Hashtable','go语言变量声明','变量声明System.Collections.Hashtable','go语言变量定义','变量定义System.Collections.Hashtable','go语言赋值','赋值System.Collections.Hashtable'], tpl: ['Go变量是存储数据的容器~ 🐹 变量名要见名知意，遵循命名规范。不同语言声明方式不同，但核心概念一样！','Go变量学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_数据类型', kw: ['go语言数据类型','数据类型System.Collections.Hashtable','go语言类型','类型System.Collections.Hashtable','go语言基本类型','基本类型System.Collections.Hashtable','go语言类型系统','类型系统System.Collections.Hashtable'], tpl: ['Go常见数据类型：数字、字符串、布尔、数组、对象/字典、null/undefined~ 🐹 理解类型系统很重要！','Go数据类型学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_运算符', kw: ['go语言运算符','运算符System.Collections.Hashtable','go语言算术运算','算术运算System.Collections.Hashtable','go语言比较运算','比较运算System.Collections.Hashtable','go语言逻辑运算','逻辑运算System.Collections.Hashtable'], tpl: ['Go运算符包括：算术(+ - * /)、比较(> < ==)、逻辑(&& || !)、赋值(= +=)~ 🐹 注意运算符优先级！','Go运算符学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_条件语句', kw: ['go语言条件语句','条件语句System.Collections.Hashtable','go语言if语句','if语句System.Collections.Hashtable','go语言if else','if elseSystem.Collections.Hashtable','go语言分支','分支System.Collections.Hashtable','go语言判断','判断System.Collections.Hashtable'], tpl: ['Go条件语句让程序做判断~ 🐹 if/else if/else，根据条件执行不同代码块。注意条件表达式要写对！','Go条件语句学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_循环', kw: ['go语言循环','循环System.Collections.Hashtable','go语言for循环','for循环System.Collections.Hashtable','go语言while循环','while循环System.Collections.Hashtable','go语言遍历','遍历System.Collections.Hashtable','go语言迭代','迭代System.Collections.Hashtable'], tpl: ['Go循环让代码重复执行~ 🐹 for适合已知次数，while适合条件判断。别忘了改变循环条件，否则会死循环！','Go循环学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_函数', kw: ['go语言函数','函数System.Collections.Hashtable','go语言方法','方法System.Collections.Hashtable','go语言function','functionSystem.Collections.Hashtable','go语言def','defSystem.Collections.Hashtable','go语言函数定义','函数定义System.Collections.Hashtable'], tpl: ['Go函数是可复用的代码块~ 🐹 参数是输入，返回值是输出。函数名要描述它做什么！单一职责原则很重要~','Go函数学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_数组', kw: ['go语言数组','数组System.Collections.Hashtable','go语言列表','列表System.Collections.Hashtable','go语言list','listSystem.Collections.Hashtable','go语言array','arraySystem.Collections.Hashtable','go语言集合','集合System.Collections.Hashtable'], tpl: ['Go数组/列表存储多个有序数据~ 🐹 索引从0开始！常用操作：增删改查、遍历、排序、筛选。这是最常用的数据结构！','Go数组学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_字符串', kw: ['go语言字符串','字符串System.Collections.Hashtable','go语言string','stringSystem.Collections.Hashtable','go语言文本处理','文本处理System.Collections.Hashtable','go语言字符串操作','字符串操作System.Collections.Hashtable'], tpl: ['Go字符串处理很常用~ 🐹 拼接、截取、查找、替换、大小写转换、分割、合并。掌握字符串操作能解决很多问题！','Go字符串学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_面向对象', kw: ['go语言面向对象','面向对象System.Collections.Hashtable','go语言类','类System.Collections.Hashtable','go语言对象','对象System.Collections.Hashtable','go语言class','classSystem.Collections.Hashtable','go语言继承','继承System.Collections.Hashtable','go语言封装','封装System.Collections.Hashtable','go语言多态','多态System.Collections.Hashtable'], tpl: ['Go面向对象编程~ 🐹 类是蓝图，对象是实例。三大特性：封装、继承、多态。理解了面向对象，代码组织能力会大幅提升！','Go面向对象学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_异常处理', kw: ['go语言异常处理','异常处理System.Collections.Hashtable','go语言错误处理','错误处理System.Collections.Hashtable','go语言try catch','try catchSystem.Collections.Hashtable','go语言异常','异常System.Collections.Hashtable','go语言报错处理','报错处理System.Collections.Hashtable'], tpl: ['Go异常处理让程序更健壮~ 🐹 try/catch/finally，捕获并处理错误，而不是让程序崩溃。好的错误处理是专业程序员的标志！','Go异常处理学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_文件操作', kw: ['go语言文件操作','文件操作System.Collections.Hashtable','go语言读写文件','读写文件System.Collections.Hashtable','go语言文件读写','文件读写System.Collections.Hashtable','go语言io','ioSystem.Collections.Hashtable','go语言文件处理','文件处理System.Collections.Hashtable'], tpl: ['Go文件操作~ 🐹 打开、读取、写入、关闭文件。注意处理编码和异常！操作完一定要关闭文件，或用with语句自动管理。','Go文件操作学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_模块导入', kw: ['go语言模块','模块System.Collections.Hashtable','go语言导入','导入System.Collections.Hashtable','go语言import','importSystem.Collections.Hashtable','go语言require','requireSystem.Collections.Hashtable','go语言包管理','包管理System.Collections.Hashtable','go语言库','库System.Collections.Hashtable'], tpl: ['Go模块系统让代码可复用~ 🐹 import/require导入其他文件的代码。学会使用标准库和第三方库，站在巨人的肩膀上！','Go模块导入学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_go语言_调试技巧', kw: ['go语言调试','调试System.Collections.Hashtable','go语言debug','debugSystem.Collections.Hashtable','go语言找bug','找bugSystem.Collections.Hashtable','go语言排错','排错System.Collections.Hashtable','go语言调试技巧','调试技巧System.Collections.Hashtable'], tpl: ['Go调试是必备技能~ 🐹 打印日志、断点调试、二分法注释、小黄鸭调试法。先复现问题，再定位，再分析，最后修复验证！','Go调试技巧学习指南~ 🐹 简洁高效的并发语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_入门', kw: ['rust入门','入门System.Collections.Hashtable','rust零基础','零基础System.Collections.Hashtable','rust初学','初学System.Collections.Hashtable','rust新手教程','新手教程System.Collections.Hashtable'], tpl: ['Rust入门很简单~ 🦀 先学变量、数据类型、运算符，再学控制流和函数！多写多练，每天进步一点点！','Rust入门学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_基础语法', kw: ['rust基础语法','基础语法System.Collections.Hashtable','rust语法基础','语法基础System.Collections.Hashtable','rust基本语法','基本语法System.Collections.Hashtable','rust语法入门','语法入门System.Collections.Hashtable'], tpl: ['Rust基础语法包括：变量声明、数据类型、运算符、表达式、语句。掌握这些就能写简单程序了~ 🦀','Rust基础语法学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_变量', kw: ['rust变量','变量System.Collections.Hashtable','rust变量声明','变量声明System.Collections.Hashtable','rust变量定义','变量定义System.Collections.Hashtable','rust赋值','赋值System.Collections.Hashtable'], tpl: ['Rust变量是存储数据的容器~ 🦀 变量名要见名知意，遵循命名规范。不同语言声明方式不同，但核心概念一样！','Rust变量学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_数据类型', kw: ['rust数据类型','数据类型System.Collections.Hashtable','rust类型','类型System.Collections.Hashtable','rust基本类型','基本类型System.Collections.Hashtable','rust类型系统','类型系统System.Collections.Hashtable'], tpl: ['Rust常见数据类型：数字、字符串、布尔、数组、对象/字典、null/undefined~ 🦀 理解类型系统很重要！','Rust数据类型学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_运算符', kw: ['rust运算符','运算符System.Collections.Hashtable','rust算术运算','算术运算System.Collections.Hashtable','rust比较运算','比较运算System.Collections.Hashtable','rust逻辑运算','逻辑运算System.Collections.Hashtable'], tpl: ['Rust运算符包括：算术(+ - * /)、比较(> < ==)、逻辑(&& || !)、赋值(= +=)~ 🦀 注意运算符优先级！','Rust运算符学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_条件语句', kw: ['rust条件语句','条件语句System.Collections.Hashtable','rustif语句','if语句System.Collections.Hashtable','rustif else','if elseSystem.Collections.Hashtable','rust分支','分支System.Collections.Hashtable','rust判断','判断System.Collections.Hashtable'], tpl: ['Rust条件语句让程序做判断~ 🦀 if/else if/else，根据条件执行不同代码块。注意条件表达式要写对！','Rust条件语句学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_循环', kw: ['rust循环','循环System.Collections.Hashtable','rustfor循环','for循环System.Collections.Hashtable','rustwhile循环','while循环System.Collections.Hashtable','rust遍历','遍历System.Collections.Hashtable','rust迭代','迭代System.Collections.Hashtable'], tpl: ['Rust循环让代码重复执行~ 🦀 for适合已知次数，while适合条件判断。别忘了改变循环条件，否则会死循环！','Rust循环学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_函数', kw: ['rust函数','函数System.Collections.Hashtable','rust方法','方法System.Collections.Hashtable','rustfunction','functionSystem.Collections.Hashtable','rustdef','defSystem.Collections.Hashtable','rust函数定义','函数定义System.Collections.Hashtable'], tpl: ['Rust函数是可复用的代码块~ 🦀 参数是输入，返回值是输出。函数名要描述它做什么！单一职责原则很重要~','Rust函数学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_数组', kw: ['rust数组','数组System.Collections.Hashtable','rust列表','列表System.Collections.Hashtable','rustlist','listSystem.Collections.Hashtable','rustarray','arraySystem.Collections.Hashtable','rust集合','集合System.Collections.Hashtable'], tpl: ['Rust数组/列表存储多个有序数据~ 🦀 索引从0开始！常用操作：增删改查、遍历、排序、筛选。这是最常用的数据结构！','Rust数组学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_字符串', kw: ['rust字符串','字符串System.Collections.Hashtable','ruststring','stringSystem.Collections.Hashtable','rust文本处理','文本处理System.Collections.Hashtable','rust字符串操作','字符串操作System.Collections.Hashtable'], tpl: ['Rust字符串处理很常用~ 🦀 拼接、截取、查找、替换、大小写转换、分割、合并。掌握字符串操作能解决很多问题！','Rust字符串学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_面向对象', kw: ['rust面向对象','面向对象System.Collections.Hashtable','rust类','类System.Collections.Hashtable','rust对象','对象System.Collections.Hashtable','rustclass','classSystem.Collections.Hashtable','rust继承','继承System.Collections.Hashtable','rust封装','封装System.Collections.Hashtable','rust多态','多态System.Collections.Hashtable'], tpl: ['Rust面向对象编程~ 🦀 类是蓝图，对象是实例。三大特性：封装、继承、多态。理解了面向对象，代码组织能力会大幅提升！','Rust面向对象学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_异常处理', kw: ['rust异常处理','异常处理System.Collections.Hashtable','rust错误处理','错误处理System.Collections.Hashtable','rusttry catch','try catchSystem.Collections.Hashtable','rust异常','异常System.Collections.Hashtable','rust报错处理','报错处理System.Collections.Hashtable'], tpl: ['Rust异常处理让程序更健壮~ 🦀 try/catch/finally，捕获并处理错误，而不是让程序崩溃。好的错误处理是专业程序员的标志！','Rust异常处理学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_文件操作', kw: ['rust文件操作','文件操作System.Collections.Hashtable','rust读写文件','读写文件System.Collections.Hashtable','rust文件读写','文件读写System.Collections.Hashtable','rustio','ioSystem.Collections.Hashtable','rust文件处理','文件处理System.Collections.Hashtable'], tpl: ['Rust文件操作~ 🦀 打开、读取、写入、关闭文件。注意处理编码和异常！操作完一定要关闭文件，或用with语句自动管理。','Rust文件操作学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_模块导入', kw: ['rust模块','模块System.Collections.Hashtable','rust导入','导入System.Collections.Hashtable','rustimport','importSystem.Collections.Hashtable','rustrequire','requireSystem.Collections.Hashtable','rust包管理','包管理System.Collections.Hashtable','rust库','库System.Collections.Hashtable'], tpl: ['Rust模块系统让代码可复用~ 🦀 import/require导入其他文件的代码。学会使用标准库和第三方库，站在巨人的肩膀上！','Rust模块导入学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_rust_调试技巧', kw: ['rust调试','调试System.Collections.Hashtable','rustdebug','debugSystem.Collections.Hashtable','rust找bug','找bugSystem.Collections.Hashtable','rust排错','排错System.Collections.Hashtable','rust调试技巧','调试技巧System.Collections.Hashtable'], tpl: ['Rust调试是必备技能~ 🦀 打印日志、断点调试、二分法注释、小黄鸭调试法。先复现问题，再定位，再分析，最后修复验证！','Rust调试技巧学习指南~ 🦀 内存安全的系统语言。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_入门', kw: ['typescript入门','入门System.Collections.Hashtable','typescript零基础','零基础System.Collections.Hashtable','typescript初学','初学System.Collections.Hashtable','typescript新手教程','新手教程System.Collections.Hashtable'], tpl: ['TypeScript入门很简单~ 📘 先学变量、数据类型、运算符，再学控制流和函数！多写多练，每天进步一点点！','TypeScript入门学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_基础语法', kw: ['typescript基础语法','基础语法System.Collections.Hashtable','typescript语法基础','语法基础System.Collections.Hashtable','typescript基本语法','基本语法System.Collections.Hashtable','typescript语法入门','语法入门System.Collections.Hashtable'], tpl: ['TypeScript基础语法包括：变量声明、数据类型、运算符、表达式、语句。掌握这些就能写简单程序了~ 📘','TypeScript基础语法学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_变量', kw: ['typescript变量','变量System.Collections.Hashtable','typescript变量声明','变量声明System.Collections.Hashtable','typescript变量定义','变量定义System.Collections.Hashtable','typescript赋值','赋值System.Collections.Hashtable'], tpl: ['TypeScript变量是存储数据的容器~ 📘 变量名要见名知意，遵循命名规范。不同语言声明方式不同，但核心概念一样！','TypeScript变量学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_数据类型', kw: ['typescript数据类型','数据类型System.Collections.Hashtable','typescript类型','类型System.Collections.Hashtable','typescript基本类型','基本类型System.Collections.Hashtable','typescript类型系统','类型系统System.Collections.Hashtable'], tpl: ['TypeScript常见数据类型：数字、字符串、布尔、数组、对象/字典、null/undefined~ 📘 理解类型系统很重要！','TypeScript数据类型学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_运算符', kw: ['typescript运算符','运算符System.Collections.Hashtable','typescript算术运算','算术运算System.Collections.Hashtable','typescript比较运算','比较运算System.Collections.Hashtable','typescript逻辑运算','逻辑运算System.Collections.Hashtable'], tpl: ['TypeScript运算符包括：算术(+ - * /)、比较(> < ==)、逻辑(&& || !)、赋值(= +=)~ 📘 注意运算符优先级！','TypeScript运算符学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_条件语句', kw: ['typescript条件语句','条件语句System.Collections.Hashtable','typescriptif语句','if语句System.Collections.Hashtable','typescriptif else','if elseSystem.Collections.Hashtable','typescript分支','分支System.Collections.Hashtable','typescript判断','判断System.Collections.Hashtable'], tpl: ['TypeScript条件语句让程序做判断~ 📘 if/else if/else，根据条件执行不同代码块。注意条件表达式要写对！','TypeScript条件语句学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_循环', kw: ['typescript循环','循环System.Collections.Hashtable','typescriptfor循环','for循环System.Collections.Hashtable','typescriptwhile循环','while循环System.Collections.Hashtable','typescript遍历','遍历System.Collections.Hashtable','typescript迭代','迭代System.Collections.Hashtable'], tpl: ['TypeScript循环让代码重复执行~ 📘 for适合已知次数，while适合条件判断。别忘了改变循环条件，否则会死循环！','TypeScript循环学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_函数', kw: ['typescript函数','函数System.Collections.Hashtable','typescript方法','方法System.Collections.Hashtable','typescriptfunction','functionSystem.Collections.Hashtable','typescriptdef','defSystem.Collections.Hashtable','typescript函数定义','函数定义System.Collections.Hashtable'], tpl: ['TypeScript函数是可复用的代码块~ 📘 参数是输入，返回值是输出。函数名要描述它做什么！单一职责原则很重要~','TypeScript函数学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_数组', kw: ['typescript数组','数组System.Collections.Hashtable','typescript列表','列表System.Collections.Hashtable','typescriptlist','listSystem.Collections.Hashtable','typescriptarray','arraySystem.Collections.Hashtable','typescript集合','集合System.Collections.Hashtable'], tpl: ['TypeScript数组/列表存储多个有序数据~ 📘 索引从0开始！常用操作：增删改查、遍历、排序、筛选。这是最常用的数据结构！','TypeScript数组学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_字符串', kw: ['typescript字符串','字符串System.Collections.Hashtable','typescriptstring','stringSystem.Collections.Hashtable','typescript文本处理','文本处理System.Collections.Hashtable','typescript字符串操作','字符串操作System.Collections.Hashtable'], tpl: ['TypeScript字符串处理很常用~ 📘 拼接、截取、查找、替换、大小写转换、分割、合并。掌握字符串操作能解决很多问题！','TypeScript字符串学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_面向对象', kw: ['typescript面向对象','面向对象System.Collections.Hashtable','typescript类','类System.Collections.Hashtable','typescript对象','对象System.Collections.Hashtable','typescriptclass','classSystem.Collections.Hashtable','typescript继承','继承System.Collections.Hashtable','typescript封装','封装System.Collections.Hashtable','typescript多态','多态System.Collections.Hashtable'], tpl: ['TypeScript面向对象编程~ 📘 类是蓝图，对象是实例。三大特性：封装、继承、多态。理解了面向对象，代码组织能力会大幅提升！','TypeScript面向对象学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_异常处理', kw: ['typescript异常处理','异常处理System.Collections.Hashtable','typescript错误处理','错误处理System.Collections.Hashtable','typescripttry catch','try catchSystem.Collections.Hashtable','typescript异常','异常System.Collections.Hashtable','typescript报错处理','报错处理System.Collections.Hashtable'], tpl: ['TypeScript异常处理让程序更健壮~ 📘 try/catch/finally，捕获并处理错误，而不是让程序崩溃。好的错误处理是专业程序员的标志！','TypeScript异常处理学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_文件操作', kw: ['typescript文件操作','文件操作System.Collections.Hashtable','typescript读写文件','读写文件System.Collections.Hashtable','typescript文件读写','文件读写System.Collections.Hashtable','typescriptio','ioSystem.Collections.Hashtable','typescript文件处理','文件处理System.Collections.Hashtable'], tpl: ['TypeScript文件操作~ 📘 打开、读取、写入、关闭文件。注意处理编码和异常！操作完一定要关闭文件，或用with语句自动管理。','TypeScript文件操作学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_模块导入', kw: ['typescript模块','模块System.Collections.Hashtable','typescript导入','导入System.Collections.Hashtable','typescriptimport','importSystem.Collections.Hashtable','typescriptrequire','requireSystem.Collections.Hashtable','typescript包管理','包管理System.Collections.Hashtable','typescript库','库System.Collections.Hashtable'], tpl: ['TypeScript模块系统让代码可复用~ 📘 import/require导入其他文件的代码。学会使用标准库和第三方库，站在巨人的肩膀上！','TypeScript模块导入学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },
      { id: 'lang_typescript_调试技巧', kw: ['typescript调试','调试System.Collections.Hashtable','typescriptdebug','debugSystem.Collections.Hashtable','typescript找bug','找bugSystem.Collections.Hashtable','typescript排错','排错System.Collections.Hashtable','typescript调试技巧','调试技巧System.Collections.Hashtable'], tpl: ['TypeScript调试是必备技能~ 📘 打印日志、断点调试、二分法注释、小黄鸭调试法。先复现问题，再定位，再分析，最后修复验证！','TypeScript调试技巧学习指南~ 📘 带类型的JavaScript超集。建议：先看教程理解概念，再动手写代码练习，遇到问题多查文档多问！'] },

      { id: 'kp_变量作用域', kw: ['作用域','全局变量','局部变量','变量范围'], tpl: ['变量作用域决定变量在哪里可以访问~ 📐 全局变量整个程序可用，局部变量只在函数/块内可用。理解作用域能避免很多Bug！','变量作用域详解~ 💡 变量作用域决定变量在哪里可以访问~ 📐 全局变量整个程序可用，局部变量只在函数/块内可用。理解作用域能避免很多Bug！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_闭包', kw: ['闭包','closure','闭包是什么'], tpl: ['闭包是函数和其词法环境的组合~ 🔒 内部函数可以访问外部函数的变量，即使外部函数已返回。闭包常用于数据封装和回调函数！','闭包详解~ 💡 闭包是函数和其词法环境的组合~ 🔒 内部函数可以访问外部函数的变量，即使外部函数已返回。闭包常用于数据封装和回调函数！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_递归', kw: ['递归','recursion','递归函数','自己调用自己'], tpl: ['递归是函数调用自身~ 🔄 必须有终止条件(基线情况)，否则会死循环！经典例子：阶乘、斐波那契、树遍历。递归虽优雅，但要注意栈溢出！','递归详解~ 💡 递归是函数调用自身~ 🔄 必须有终止条件(基线情况)，否则会死循环！经典例子：阶乘、斐波那契、树遍历。递归虽优雅，但要注意栈溢出！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_指针', kw: ['指针','pointer','内存地址','c语言指针'], tpl: ['指针存储内存地址~ 🎯 C/C++核心概念！指针可以直接操作内存，灵活但危险。注意空指针、野指针、内存泄漏。理解指针能帮你理解计算机底层！','指针详解~ 💡 指针存储内存地址~ 🎯 C/C++核心概念！指针可以直接操作内存，灵活但危险。注意空指针、野指针、内存泄漏。理解指针能帮你理解计算机底层！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_引用', kw: ['引用','reference','传引用','引用类型'], tpl: ['引用是变量的别名~ 📎 指向同一块内存！传引用时函数内修改会影响外部。与传值的区别：传值是复制，传引用是共享。Java/Python对象都是引用传递！','引用详解~ 💡 引用是变量的别名~ 📎 指向同一块内存！传引用时函数内修改会影响外部。与传值的区别：传值是复制，传引用是共享。Java/Python对象都是引用传递！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_垃圾回收', kw: ['垃圾回收','gc','内存回收','garbage collection'], tpl: ['垃圾回收自动释放不再使用的内存~ 🗑️ Java/JS/Python/Go都有GC！常见算法：引用计数、标记清除、分代回收。有GC就不用手动管理内存，但要注意内存泄漏！','垃圾回收详解~ 💡 垃圾回收自动释放不再使用的内存~ 🗑️ Java/JS/Python/Go都有GC！常见算法：引用计数、标记清除、分代回收。有GC就不用手动管理内存，但要注意内存泄漏！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_多线程', kw: ['多线程','线程','thread','并发编程'], tpl: ['多线程让程序同时做多件事~ 🧵 提高CPU利用率！但要注意线程安全：竞态条件、死锁、活锁。用锁、信号量、原子操作同步。并发编程难但重要！','多线程详解~ 💡 多线程让程序同时做多件事~ 🧵 提高CPU利用率！但要注意线程安全：竞态条件、死锁、活锁。用锁、信号量、原子操作同步。并发编程难但重要！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_协程', kw: ['协程','coroutine','goroutine','纤程'], tpl: ['协程是轻量级线程~ 🪶 用户态调度，开销小！Go的goroutine、Python的async/await都是协程。适合I/O密集型任务，并发效率高！','协程详解~ 💡 协程是轻量级线程~ 🪶 用户态调度，开销小！Go的goroutine、Python的async/await都是协程。适合I/O密集型任务，并发效率高！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_泛型', kw: ['泛型','generic','泛型编程','模板'], tpl: ['泛型让代码适用于多种类型~ 📦 不用为每种类型写重复代码！C++模板、Java泛型、Go泛型、TS泛型。泛型提高代码复用性和类型安全！','泛型详解~ 💡 泛型让代码适用于多种类型~ 📦 不用为每种类型写重复代码！C++模板、Java泛型、Go泛型、TS泛型。泛型提高代码复用性和类型安全！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_装饰器', kw: ['装饰器','decorator','注解','annotation'], tpl: ['装饰器在不修改原代码的情况下增强功能~ ✨ Python的@decorator、Java的注解、TS的装饰器。常用于日志、权限、缓存、事务。是AOP面向切面编程的基础！','装饰器详解~ 💡 装饰器在不修改原代码的情况下增强功能~ ✨ Python的@decorator、Java的注解、TS的装饰器。常用于日志、权限、缓存、事务。是AOP面向切面编程的基础！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_正则表达式', kw: ['正则表达式','regex','正则','regular expression'], tpl: ['正则表达式用模式匹配字符串~ 🔍 强大但难写！常用：匹配、查找、替换、分割。元字符：. * + ? ^ $ [] {} () \。工具：regex101.com可以在线测试！','正则表达式详解~ 💡 正则表达式用模式匹配字符串~ 🔍 强大但难写！常用：匹配、查找、替换、分割。元字符：. * + ? ^ $ [] {} () \。工具：regex101.com可以在线测试！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_JSON', kw: ['json','json格式','数据交换','序列化'], tpl: ['JSON是轻量级数据交换格式~ 📋 键值对结构，人类可读！几乎所有语言都支持。用于API通信、配置文件、数据存储。JSON比XML更简洁，是Web开发的标配！','JSON详解~ 💡 JSON是轻量级数据交换格式~ 📋 键值对结构，人类可读！几乎所有语言都支持。用于API通信、配置文件、数据存储。JSON比XML更简洁，是Web开发的标配！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_API', kw: ['api','接口','application programming interface','api接口'], tpl: ['API是程序间通信的约定~ 🔌 定义了请求和响应的格式！RESTful API最常用：GET/POST/PUT/DELETE。好的API设计：清晰、一致、有文档、版本化。调用API是后端开发的日常！','API详解~ 💡 API是程序间通信的约定~ 🔌 定义了请求和响应的格式！RESTful API最常用：GET/POST/PUT/DELETE。好的API设计：清晰、一致、有文档、版本化。调用API是后端开发的日常！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_HTTP', kw: ['http','https','http协议','网络请求'], tpl: ['HTTP是Web通信的基础协议~ 🌐 请求-响应模式！方法：GET/POST/PUT/DELETE/PATCH。状态码：200成功、301重定向、404未找到、500服务器错误。HTTPS是加密版，更安全！','HTTP详解~ 💡 HTTP是Web通信的基础协议~ 🌐 请求-响应模式！方法：GET/POST/PUT/DELETE/PATCH。状态码：200成功、301重定向、404未找到、500服务器错误。HTTPS是加密版，更安全！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_数据库索引', kw: ['索引','index','数据库索引','索引优化'], tpl: ['索引加速数据查询~ 📚 类似书的目录！B+树最常用。优点：查询快；缺点：占空间、写入慢。在WHERE、JOIN、ORDER BY的列上加索引。但不要过度索引！','数据库索引详解~ 💡 索引加速数据查询~ 📚 类似书的目录！B+树最常用。优点：查询快；缺点：占空间、写入慢。在WHERE、JOIN、ORDER BY的列上加索引。但不要过度索引！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_事务', kw: ['事务','transaction','acid','数据库事务'], tpl: ['事务保证一组操作要么全成功要么全失败~ 🔄 ACID特性：原子性、一致性、隔离性、持久性。银行转账是经典例子！BEGIN/COMMIT/ROLLBACK。事务是数据一致性的保障！','事务详解~ 💡 事务保证一组操作要么全成功要么全失败~ 🔄 ACID特性：原子性、一致性、隔离性、持久性。银行转账是经典例子！BEGIN/COMMIT/ROLLBACK。事务是数据一致性的保障！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_SQL注入', kw: ['sql注入','sql injection','注入攻击','安全漏洞'], tpl: ['SQL注入是常见安全漏洞~ 🚨 用户输入被当作SQL代码执行！防御：参数化查询/预编译语句、输入验证、ORM框架、最小权限原则。永远不要拼接SQL字符串！','SQL注入详解~ 💡 SQL注入是常见安全漏洞~ 🚨 用户输入被当作SQL代码执行！防御：参数化查询/预编译语句、输入验证、ORM框架、最小权限原则。永远不要拼接SQL字符串！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_XSS', kw: ['xss','跨站脚本','cross site scripting','xss攻击'], tpl: ['XSS跨站脚本攻击~ 📢 恶意脚本被注入网页执行！防御：输出编码/转义、CSP内容安全策略、HttpOnly Cookie、输入验证。分三类：存储型、反射型、DOM型。Web安全必修课！','XSS详解~ 💡 XSS跨站脚本攻击~ 📢 恶意脚本被注入网页执行！防御：输出编码/转义、CSP内容安全策略、HttpOnly Cookie、输入验证。分三类：存储型、反射型、DOM型。Web安全必修课！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_CSRF', kw: ['csrf','跨站请求伪造','cross site request forgery','csrf攻击'], tpl: ['CSRF跨站请求伪造~ 🎭 利用用户已登录的身份发起恶意请求！防御：CSRF Token、SameSite Cookie、验证Referer、关键操作二次确认。配合XSS防护，Web安全更全面！','CSRF详解~ 💡 CSRF跨站请求伪造~ 🎭 利用用户已登录的身份发起恶意请求！防御：CSRF Token、SameSite Cookie、验证Referer、关键操作二次确认。配合XSS防护，Web安全更全面！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_哈希', kw: ['哈希','hash','散列','哈希算法'], tpl: ['哈希把任意长度数据映射为固定长度值~ #️⃣ 单向不可逆！常用：MD5、SHA-1、SHA-256。用于：密码存储(加盐)、数据校验、哈希表、区块链。好的哈希算法：抗碰撞、雪崩效应！','哈希详解~ 💡 哈希把任意长度数据映射为固定长度值~ #️⃣ 单向不可逆！常用：MD5、SHA-1、SHA-256。用于：密码存储(加盐)、数据校验、哈希表、区块链。好的哈希算法：抗碰撞、雪崩效应！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_加密', kw: ['加密','encryption','解密','对称加密','非对称加密'], tpl: ['加密保护数据机密性~ 🔐 对称加密(AES)：加解密同密钥，速度快；非对称加密(RSA)：公钥加密私钥解密，安全但慢。HTTPS结合两者：RSA交换密钥，AES加密数据！密码学是安全基础！','加密详解~ 💡 加密保护数据机密性~ 🔐 对称加密(AES)：加解密同密钥，速度快；非对称加密(RSA)：公钥加密私钥解密，安全但慢。HTTPS结合两者：RSA交换密钥，AES加密数据！密码学是安全基础！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_排序算法', kw: ['排序算法','排序','快速排序','冒泡排序'], tpl: ['排序算法是算法基础~ 📊 常见：冒泡O(n²)、选择O(n²)、插入O(n²)、快排O(nlogn)、归并O(nlogn)、堆排O(nlogn)。快排最快但最坏O(n²)，归并稳定但占空间。掌握快排和归并！','排序算法详解~ 💡 排序算法是算法基础~ 📊 常见：冒泡O(n²)、选择O(n²)、插入O(n²)、快排O(nlogn)、归并O(nlogn)、堆排O(nlogn)。快排最快但最坏O(n²)，归并稳定但占空间。掌握快排和归并！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_查找算法', kw: ['查找算法','查找','二分查找','搜索算法'], tpl: ['查找算法在数据中找目标~ 🔍 顺序查找O(n)：逐个比较；二分查找O(logn)：要求有序，每次排除一半。哈希表O(1)：最快但占空间。数据量大时用二分或哈希！','查找算法详解~ 💡 查找算法在数据中找目标~ 🔍 顺序查找O(n)：逐个比较；二分查找O(logn)：要求有序，每次排除一半。哈希表O(1)：最快但占空间。数据量大时用二分或哈希！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_时间复杂度', kw: ['时间复杂度','大o表示法','o(n)','算法复杂度'], tpl: ['时间复杂度描述算法运行时间随数据量增长的趋势~ ⏱️ 大O表示法！O(1)常数、O(logn)对数、O(n)线性、O(nlogn)线性对数、O(n²)平方、O(2ⁿ)指数。算法分析核心概念！','时间复杂度详解~ 💡 时间复杂度描述算法运行时间随数据量增长的趋势~ ⏱️ 大O表示法！O(1)常数、O(logn)对数、O(n)线性、O(nlogn)线性对数、O(n²)平方、O(2ⁿ)指数。算法分析核心概念！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_空间复杂度', kw: ['空间复杂度','内存复杂度','算法空间','额外空间'], tpl: ['空间复杂度描述算法占用内存随数据量增长的趋势~ 💾 也是大O表示法！O(1)常数额外空间(原地算法)、O(n)线性。时间和空间往往需要权衡：用空间换时间(缓存/哈希表)很常见！','空间复杂度详解~ 💡 空间复杂度描述算法占用内存随数据量增长的趋势~ 💾 也是大O表示法！O(1)常数额外空间(原地算法)、O(n)线性。时间和空间往往需要权衡：用空间换时间(缓存/哈希表)很常见！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_链表', kw: ['链表','linked list','单链表','双向链表'], tpl: ['链表用节点存储数据，节点间用指针连接~ 🔗 插入删除O(1)，查找O(n)。单链表：只有next；双向链表：prev+next。和数组对比：数组随机访问快，链表插入删除快。掌握链表反转、环检测！','链表详解~ 💡 链表用节点存储数据，节点间用指针连接~ 🔗 插入删除O(1)，查找O(n)。单链表：只有next；双向链表：prev+next。和数组对比：数组随机访问快，链表插入删除快。掌握链表反转、环检测！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_栈和队列', kw: ['栈','队列','stack','queue','先进后出','先进先出'], tpl: ['栈(Stack)后进先出LIFO~ 📚 像叠盘子！用于：函数调用栈、括号匹配、撤销操作、深度优先搜索。队列(Queue)先进先出FIFO~ 🚶 像排队！用于：任务调度、消息队列、广度优先搜索。两种基础数据结构！','栈和队列详解~ 💡 栈(Stack)后进先出LIFO~ 📚 像叠盘子！用于：函数调用栈、括号匹配、撤销操作、深度优先搜索。队列(Queue)先进先出FIFO~ 🚶 像排队！用于：任务调度、消息队列、广度优先搜索。两种基础数据结构！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_树', kw: ['树','tree','二叉树','二叉搜索树','树结构'], tpl: ['树是层级数据结构~ 🌳 节点+边，无环！二叉树每个节点最多2个子节点。二叉搜索树(BST)：左<根<右，查找O(logn)。遍历：前序(根左右)、中序(左根右)、后序(左右根)、层序。掌握树的遍历和操作！','树详解~ 💡 树是层级数据结构~ 🌳 节点+边，无环！二叉树每个节点最多2个子节点。二叉搜索树(BST)：左<根<右，查找O(logn)。遍历：前序(根左右)、中序(左根右)、后序(左右根)、层序。掌握树的遍历和操作！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_图', kw: ['图','graph','图算法','图结构','邻接表'], tpl: ['图由顶点和边组成~ 🕸️ 表示多对多关系！有向图/无向图，加权图/无权图。存储：邻接矩阵、邻接表。遍历：DFS深度优先、BFS广度优先。最短路径：Dijkstra、Floyd。最小生成树：Prim、Kruskal。图算法很重要！','图详解~ 💡 图由顶点和边组成~ 🕸️ 表示多对多关系！有向图/无向图，加权图/无权图。存储：邻接矩阵、邻接表。遍历：DFS深度优先、BFS广度优先。最短路径：Dijkstra、Floyd。最小生成树：Prim、Kruskal。图算法很重要！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'kp_动态规划', kw: ['动态规划','dp','dynamic programming','状态转移'], tpl: ['动态规划把大问题拆成子问题，存储子问题结果避免重复计算~ 🧠 三要素：最优子结构、状态转移方程、边界条件。经典问题：斐波那契、背包、最长公共子序列、编辑距离。DP是算法面试高频考点！','动态规划详解~ 💡 动态规划把大问题拆成子问题，存储子问题结果避免重复计算~ 🧠 三要素：最优子结构、状态转移方程、边界条件。经典问题：斐波那契、背包、最长公共子序列、编辑距离。DP是算法面试高频考点！ 建议：先理解概念，再看代码示例，最后动手实现一遍！算法和数据结构是程序员的内功，一定要扎实！'] },
      { id: 'emo_期待', kw: ['好期待','期待','盼望','憧憬','好期待啊'], tpl: ['期待是美好的情绪~ ✨ 有期待就有动力！你在期待什么？是新项目、新技术，还是什么好事？','期待的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_满足', kw: ['好满足','满足','知足','充实','很满足'], tpl: ['满足感很棒~ 😌 享受当下的成就！你做了什么让自己这么满足？是完成了项目，还是学到了新知识？','满足的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_感激', kw: ['好感激','感激','感恩','感谢有你','很感激'], tpl: ['感恩的心~ 🙏 懂得感恩的人更幸福！你在感激什么？感激帮助过你的人，还是感激这个时代？','感激的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_安心', kw: ['好安心','安心','放心','踏实','很安心'], tpl: ['安心的感觉真好~ 🕊️ 心里踏实，做事更专注！是什么让你这么安心？是完成了任务，还是有了保障？','安心的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_振奋', kw: ['好振奋','振奋','热血沸腾','斗志昂扬','很振奋'], tpl: ['振奋人心~ 🔥 保持这份斗志！是什么让你这么振奋？是看到了希望，还是受到了鼓舞？','振奋的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_温暖', kw: ['好温暖','温暖','暖心','感动','很温暖'], tpl: ['温暖的感觉~ 🧡 被温暖包围很幸福！是什么让你觉得温暖？是他人的善意，还是自己的成长？','温暖的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_释然', kw: ['释然','放下了','想开了','解脱','终于放下'], tpl: ['释然是一种智慧~ 🍃 放下执念，轻装前行！是什么让你释然了？是想通了某件事，还是时间治愈了一切？','释然的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_怀念', kw: ['好怀念','怀念','想念','回忆','怀旧'], tpl: ['怀念过去~ 📷 回忆是珍贵的财富！你在怀念什么？是过去的时光，还是某个人某件事？','怀念的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_好奇', kw: ['好好奇','好奇','好奇宝宝','想知道','很想知道'], tpl: ['好奇心是学习的动力~ 🔍 保持好奇，不断探索！你对什么感到好奇？是新技术，还是某个问题的答案？','好奇的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_专注', kw: ['好专注','专注','专心','心流','进入状态'], tpl: ['专注的状态最高效~ 🎯 心流体验很棒！你在专注做什么？是写代码，还是学习新知识？保持这份专注！','专注的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_轻松', kw: ['好轻松','轻松','放松','无压力','很轻松'], tpl: ['轻松的感觉真好~ 🌤️ 张弛有度才可持续！是什么让你这么轻松？是完成了任务，还是调整了心态？','轻松的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_自豪', kw: ['好自豪','自豪','骄傲','有成就感','很自豪'], tpl: ['为你骄傲~ 🏆 你的努力值得这份自豪！你做了什么让自己自豪？是完成了挑战，还是帮助了他人？','自豪的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_感激不尽', kw: ['感激不尽','非常感谢','太感谢了','感激涕零'], tpl: ['你的感谢我收到了~ 💝 能帮到你我也很开心！不用这么客气，以后有问题随时找我！','感激不尽的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_心碎', kw: ['心碎了','好伤心','心都碎了','心如刀割'], tpl: ['心碎的感觉~ 💔 时间会治愈一切。允许自己难过，但不要一直沉浸。说说看发生了什么？说出来会好受一些~','心碎的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_崩溃', kw: ['崩溃了','好崩溃','心态崩了','撑不住了'], tpl: ['快崩溃了？😰 先停下来深呼吸！你已经很努力了，不要对自己太苛刻。休息一下，或者跟我说说，我在这里陪你~','崩溃的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_绝望', kw: ['好绝望','绝望','看不到希望','万念俱灰'], tpl: ['感到绝望？🌑 请记住：黑夜总会过去，黎明总会到来。你不是一个人，有很多人关心你。如果情绪持续低落，请寻求专业帮助。跟我说说好吗？','绝望的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_嫉妒', kw: ['好嫉妒','嫉妒','羡慕嫉妒恨','心里不平衡'], tpl: ['嫉妒是正常的情绪~ 😤 但不要让它消耗你！把嫉妒转化为动力：别人能做到的，你通过努力也能做到！你在嫉妒什么？我们可以一起分析怎么提升~','嫉妒的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_尴尬', kw: ['好尴尬','尴尬','社死','丢脸','难为情'], tpl: ['尴尬的瞬间~ 😅 谁都有过！笑一笑就过去了，别人可能早就忘了。你遇到了什么尴尬事？说出来让大家开心一下~ 哈哈','尴尬的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_后悔', kw: ['好后悔','后悔','悔不当初','早知道就'], tpl: ['后悔是人之常情~ 😔 但沉溺于后悔没有意义。从过去的经历中学习，下次做得更好就好！你在后悔什么？我们可以想想以后怎么避免~','后悔的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_委屈', kw: ['好委屈','委屈','受委屈了','被冤枉'], tpl: ['受委屈了？🥺 抱抱你~ 被误解的感觉真的很难受。可以跟我说说发生了什么吗？说出来会好受一些。清者自清，时间会证明一切！','委屈的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_厌烦', kw: ['好厌烦','厌烦','厌倦','腻了','烦透了'], tpl: ['感到厌烦？😒 可能是需要改变了！如果是对工作/学习厌烦，可以试试新方法、新挑战。如果是对某件事厌烦，可以先放一放，做些喜欢的事调整心情~','厌烦的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_空虚', kw: ['好空虚','空虚','无聊至极','心里空空的'], tpl: ['感到空虚？🌫️ 可能是缺少目标和意义感。试着找些有意义的事做：学个新技能、帮助他人、设定小目标并完成。你平时喜欢做什么？我们可以聊聊~','空虚的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_矛盾', kw: ['好矛盾','矛盾','纠结','两难','拿不定主意'], tpl: ['感到矛盾？⚖️ 纠结是因为两边都有道理。可以列个利弊清单，权衡一下。或者想想：哪个选择让你更不后悔？你在纠结什么？说出来我帮你分析~','矛盾的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },
      { id: 'emo_无助', kw: ['好无助','无助','无能为力','不知所措'], tpl: ['感到无助？🆘 你不是一个人！很多人都经历过这种感觉。试着把大问题拆成小问题，一个个解决。或者寻求他人帮助，不要独自硬扛。跟我说说，我们一起想办法~','无助的感觉我理解~ 🤗 情绪没有对错，允许自己感受它。如果想聊聊，我随时在这里听你说。如果需要专业帮助，也请不要犹豫~'] },

      { id: 'daily_早餐吃什么', kw: ['早餐吃什么','早上吃什么','早餐推荐','早饭'], tpl: ['早餐推荐~ 🥐 营养早餐：鸡蛋+牛奶+全麦面包+水果！不吃早餐影响记忆力和效率，一定要吃哦！','早餐吃什么小建议~ 💡 早餐推荐~ 🥐 营养早餐：鸡蛋+牛奶+全麦面包+水果！不吃早餐影响记忆力和效率，一定要吃哦！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_午餐吃什么', kw: ['午餐吃什么','中午吃什么','午饭推荐','中饭'], tpl: ['午餐要吃饱~ 🍱 推荐：荤素搭配+主食+汤！下午还要写代码，吃饱才有精力！想吃什么菜系？','午餐吃什么小建议~ 💡 午餐要吃饱~ 🍱 推荐：荤素搭配+主食+汤！下午还要写代码，吃饱才有精力！想吃什么菜系？ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_晚餐吃什么', kw: ['晚餐吃什么','晚上吃什么','晚饭推荐','宵夜'], tpl: ['晚餐清淡点~ 🥗 七分饱即可，吃太晚影响睡眠！推荐：蔬菜+优质蛋白+少量主食。写完代码别吃太多宵夜哦！','晚餐吃什么小建议~ 💡 晚餐清淡点~ 🥗 七分饱即可，吃太晚影响睡眠！推荐：蔬菜+优质蛋白+少量主食。写完代码别吃太多宵夜哦！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_外卖推荐', kw: ['外卖推荐','点什么外卖','吃什么外卖','外卖'], tpl: ['外卖选择~ 🍔 注意看评分和评价！推荐：轻食沙拉、日式便当、韩式拌饭、麻辣烫。偶尔吃可以，别天天吃，对身体不好！','外卖推荐小建议~ 💡 外卖选择~ 🍔 注意看评分和评价！推荐：轻食沙拉、日式便当、韩式拌饭、麻辣烫。偶尔吃可以，别天天吃，对身体不好！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_咖啡推荐', kw: ['咖啡推荐','喝什么咖啡','美式还是拿铁','咖啡种类'], tpl: ['咖啡选择~ ☕ 美式：纯咖啡，提神效果好；拿铁：加牛奶，口感顺滑；卡布奇诺：奶泡多；摩卡：加巧克力，甜。一天不超过3杯，下午3点后别喝！','咖啡推荐小建议~ 💡 咖啡选择~ ☕ 美式：纯咖啡，提神效果好；拿铁：加牛奶，口感顺滑；卡布奇诺：奶泡多；摩卡：加巧克力，甜。一天不超过3杯，下午3点后别喝！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_奶茶推荐', kw: ['奶茶推荐','喝什么奶茶','奶茶种类','果茶'], tpl: ['奶茶选择~ 🧋 经典珍珠奶茶、芋泥波波、杨枝甘露、柠檬茶、水果茶。奶茶糖分高，建议少糖或三分糖！偶尔喝可以，别天天喝~','奶茶推荐小建议~ 💡 奶茶选择~ 🧋 经典珍珠奶茶、芋泥波波、杨枝甘露、柠檬茶、水果茶。奶茶糖分高，建议少糖或三分糖！偶尔喝可以，别天天喝~ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_周末去哪玩', kw: ['周末去哪玩','周末去哪','周末活动','周末去处'], tpl: ['周末活动~ 🎉 可以：看电影、逛公园、爬山、探店、看展、运动、宅家休息。劳逸结合！平时写代码累了，周末好好放松一下~','周末去哪玩小建议~ 💡 周末活动~ 🎉 可以：看电影、逛公园、爬山、探店、看展、运动、宅家休息。劳逸结合！平时写代码累了，周末好好放松一下~ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_电影推荐', kw: ['电影推荐','看什么电影','好看的电影','电影'], tpl: ['电影推荐~ 🎬 程序员必看：《黑客帝国》《模仿游戏》《社交网络》《硅谷》《源代码》。其他经典：《肖申克的救赎》《阿甘正传》《星际穿越》。想看什么类型？','电影推荐小建议~ 💡 电影推荐~ 🎬 程序员必看：《黑客帝国》《模仿游戏》《社交网络》《硅谷》《源代码》。其他经典：《肖申克的救赎》《阿甘正传》《星际穿越》。想看什么类型？ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_电视剧推荐', kw: ['电视剧推荐','看什么剧','好看的剧','追剧'], tpl: ['剧集推荐~ 📺 程序员必看：《硅谷》《黑客军团》《疑犯追踪》《西部世界》。其他：《绝命毒师》《权力的游戏》《怪奇物语》。追剧别熬夜哦！','电视剧推荐小建议~ 💡 剧集推荐~ 📺 程序员必看：《硅谷》《黑客军团》《疑犯追踪》《西部世界》。其他：《绝命毒师》《权力的游戏》《怪奇物语》。追剧别熬夜哦！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_音乐推荐', kw: ['音乐推荐','听什么歌','好听的歌','歌单推荐'], tpl: ['音乐推荐~ 🎵 写代码时听：Lo-Fi Hip Hop、Chillhop、古典音乐、电子乐。放松时听：流行、摇滚、爵士。推荐歌单：Lo-Fi Beats to Study/Relax to！','音乐推荐小建议~ 💡 音乐推荐~ 🎵 写代码时听：Lo-Fi Hip Hop、Chillhop、古典音乐、电子乐。放松时听：流行、摇滚、爵士。推荐歌单：Lo-Fi Beats to Study/Relax to！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_游戏推荐', kw: ['游戏推荐','玩什么游戏','好玩的游戏','游戏'], tpl: ['游戏推荐~ 🎮 编程类：《程序员升职记》《深圳IO》《Human Resource Machine》。其他：《塞尔达传说》《艾尔登法环》《原神》《英雄联盟》。适度游戏，别耽误学习工作！','游戏推荐小建议~ 💡 游戏推荐~ 🎮 编程类：《程序员升职记》《深圳IO》《Human Resource Machine》。其他：《塞尔达传说》《艾尔登法环》《原神》《英雄联盟》。适度游戏，别耽误学习工作！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_书籍推荐', kw: ['书籍推荐','看什么书','好书推荐','读书'], tpl: ['书籍推荐~ 📚 编程类：《代码大全》《算法导论》《设计模式》《重构》《程序员修炼之道》。非编程：《人类简史》《思考快与慢》《原则》。多读书，读好书！','书籍推荐小建议~ 💡 书籍推荐~ 📚 编程类：《代码大全》《算法导论》《设计模式》《重构》《程序员修炼之道》。非编程：《人类简史》《思考快与慢》《原则》。多读书，读好书！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_旅游推荐', kw: ['旅游推荐','去哪旅游','旅游去处','旅行'], tpl: ['旅游推荐~ ✈️ 国内：北京、上海、成都、杭州、西安、云南、三亚。国外：日本、泰国、新加坡、欧洲。程序员圣地：硅谷、东京秋叶原、柏林。趁年轻多出去看看！','旅游推荐小建议~ 💡 旅游推荐~ ✈️ 国内：北京、上海、成都、杭州、西安、云南、三亚。国外：日本、泰国、新加坡、欧洲。程序员圣地：硅谷、东京秋叶原、柏林。趁年轻多出去看看！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_健身计划', kw: ['健身计划','怎么健身','健身推荐','增肌减脂'], tpl: ['健身建议~ 💪 每周3-5次，每次30-60分钟。有氧：跑步、游泳、骑车；力量：深蹲、硬拉、卧推、引体向上。程序员重点：练肩颈、腰背、核心。坚持最重要！','健身计划小建议~ 💡 健身建议~ 💪 每周3-5次，每次30-60分钟。有氧：跑步、游泳、骑车；力量：深蹲、硬拉、卧推、引体向上。程序员重点：练肩颈、腰背、核心。坚持最重要！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_减肥方法', kw: ['怎么减肥','减肥方法','减肥推荐','瘦身'], tpl: ['减肥建议~ ⚖️ 七分吃三分练！饮食：控制热量、高蛋白、少糖少油、多蔬菜。运动：有氧+力量结合。睡眠：保证7-8小时。慢慢来，健康减肥，别节食！','减肥方法小建议~ 💡 减肥建议~ ⚖️ 七分吃三分练！饮食：控制热量、高蛋白、少糖少油、多蔬菜。运动：有氧+力量结合。睡眠：保证7-8小时。慢慢来，健康减肥，别节食！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_睡眠改善', kw: ['怎么改善睡眠','失眠怎么办','睡眠不好','助眠'], tpl: ['睡眠建议~ 😴 规律作息，每天同一时间睡和起。睡前1小时别玩手机，别喝咖啡因。保持卧室黑暗、安静、凉爽。可以泡脚、听白噪音、冥想。严重失眠看医生！','睡眠改善小建议~ 💡 睡眠建议~ 😴 规律作息，每天同一时间睡和起。睡前1小时别玩手机，别喝咖啡因。保持卧室黑暗、安静、凉爽。可以泡脚、听白噪音、冥想。严重失眠看医生！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_护眼方法', kw: ['怎么护眼','护眼方法','眼睛保护','视力保护'], tpl: ['护眼建议~ 👀 20-20-20法则：每20分钟看20英尺外20秒。调整屏幕亮度和距离。多眨眼，用人工泪液。多吃胡萝卜、蓝莓、深海鱼。定期检查视力！','护眼方法小建议~ 💡 护眼建议~ 👀 20-20-20法则：每20分钟看20英尺外20秒。调整屏幕亮度和距离。多眨眼，用人工泪液。多吃胡萝卜、蓝莓、深海鱼。定期检查视力！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_护腰方法', kw: ['怎么护腰','护腰方法','腰椎保护','腰疼怎么办'], tpl: ['护腰建议~ 🦴 保持正确坐姿：背部挺直、脚平放、屏幕与眼平齐。每小时起来活动5分钟。选人体工学椅和升降桌。加强核心和腰背肌肉。腰疼严重看医生！','护腰方法小建议~ 💡 护腰建议~ 🦴 保持正确坐姿：背部挺直、脚平放、屏幕与眼平齐。每小时起来活动5分钟。选人体工学椅和升降桌。加强核心和腰背肌肉。腰疼严重看医生！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_防脱发', kw: ['怎么防脱发','脱发怎么办','掉头发','生发'], tpl: ['防脱发建议~ 👨‍🦲 程序员通病！原因：压力大、熬夜、饮食不规律、遗传。改善：规律作息、均衡饮食、减少压力、适度运动、用温和洗发水。严重的话看皮肤科，别信偏方！','防脱发小建议~ 💡 防脱发建议~ 👨‍🦲 程序员通病！原因：压力大、熬夜、饮食不规律、遗传。改善：规律作息、均衡饮食、减少压力、适度运动、用温和洗发水。严重的话看皮肤科，别信偏方！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_缓解压力', kw: ['怎么缓解压力','压力大怎么办','减压方法','放松'], tpl: ['减压建议~ 🧘 运动：跑步、瑜伽、打球；放松：冥想、深呼吸、听音乐；社交：和朋友聊天、聚会；兴趣：做喜欢的事；休息：保证睡眠。找到适合自己的减压方式，别硬扛！','缓解压力小建议~ 💡 减压建议~ 🧘 运动：跑步、瑜伽、打球；放松：冥想、深呼吸、听音乐；社交：和朋友聊天、聚会；兴趣：做喜欢的事；休息：保证睡眠。找到适合自己的减压方式，别硬扛！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_提高效率', kw: ['怎么提高效率','效率低怎么办','时间管理','专注'], tpl: ['效率建议~ ⏰ 番茄工作法：25分钟专注+5分钟休息。列待办清单，按优先级排序。减少干扰：关通知、手机放远。单任务处理，别多线程。定期回顾总结。好的工具也很重要！','提高效率小建议~ 💡 效率建议~ ⏰ 番茄工作法：25分钟专注+5分钟休息。列待办清单，按优先级排序。减少干扰：关通知、手机放远。单任务处理，别多线程。定期回顾总结。好的工具也很重要！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_早起方法', kw: ['怎么早起','早起困难','早起方法','赖床'], tpl: ['早起建议~ 🌅 循序渐进，每天提前15分钟。固定作息，周末也别睡太晚。睡前别玩手机，早点睡。放多个闹钟，放远一点。起床后立刻喝水、拉开窗帘、晒太阳。早起的鸟儿有虫吃！','早起方法小建议~ 💡 早起建议~ 🌅 循序渐进，每天提前15分钟。固定作息，周末也别睡太晚。睡前别玩手机，早点睡。放多个闹钟，放远一点。起床后立刻喝水、拉开窗帘、晒太阳。早起的鸟儿有虫吃！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_戒手机', kw: ['怎么戒手机','手机依赖','少玩手机','手机瘾'], tpl: ['戒手机建议~ 📵 设置屏幕使用时间限制。关不必要的通知。手机放另一个房间。用实体闹钟代替手机。找替代活动：读书、运动、社交。玩手机前问自己：我真的需要看吗？','戒手机小建议~ 💡 戒手机建议~ 📵 设置屏幕使用时间限制。关不必要的通知。手机放另一个房间。用实体闹钟代替手机。找替代活动：读书、运动、社交。玩手机前问自己：我真的需要看吗？ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_学英语', kw: ['怎么学英语','英语学习','英语入门','提高英语'], tpl: ['学英语建议~ 🇬🇧 每天坚持，哪怕15分钟。多听：播客、美剧、TED。多说：找语伴、自言自语。多读：英文文档、新闻、书。多写：日记、笔记。程序员英语很重要，多看英文文档！','学英语小建议~ 💡 学英语建议~ 🇬🇧 每天坚持，哪怕15分钟。多听：播客、美剧、TED。多说：找语伴、自言自语。多读：英文文档、新闻、书。多写：日记、笔记。程序员英语很重要，多看英文文档！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_理财入门', kw: ['怎么理财','理财入门','理财方法','存钱'], tpl: ['理财建议~ 💰 先存钱再花钱，每月存收入的20%。应急金：3-6个月生活费。学习：基金、股票、保险。分散投资，别把鸡蛋放一个篮子。记账，了解钱花在哪。投资有风险，学习后再投！','理财入门小建议~ 💡 理财建议~ 💰 先存钱再花钱，每月存收入的20%。应急金：3-6个月生活费。学习：基金、股票、保险。分散投资，别把鸡蛋放一个篮子。记账，了解钱花在哪。投资有风险，学习后再投！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_副业推荐', kw: ['副业推荐','做什么副业','兼职','赚钱'], tpl: ['副业建议~ 💼 程序员副业：接外包、做开源、写技术博客、做课程、开发小产品、接私活。其他：自媒体、电商、家教。先做好主业，副业量力而行。别影响主业和健康！','副业推荐小建议~ 💡 副业建议~ 💼 程序员副业：接外包、做开源、写技术博客、做课程、开发小产品、接私活。其他：自媒体、电商、家教。先做好主业，副业量力而行。别影响主业和健康！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_考公考研', kw: ['考公还是考研','考研还是工作','考公','考研'], tpl: ['选择建议~ 🎓 考研：适合想深入研究、进大厂研发岗、换专业。考公：适合求稳定、进体制内。工作：适合想早点赚钱、积累经验。没有标准答案，看自己的目标和情况。多了解，再决定！','考公考研小建议~ 💡 选择建议~ 🎓 考研：适合想深入研究、进大厂研发岗、换专业。考公：适合求稳定、进体制内。工作：适合想早点赚钱、积累经验。没有标准答案，看自己的目标和情况。多了解，再决定！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_换工作', kw: ['要不要换工作','换工作建议','跳槽','辞职'], tpl: ['换工作建议~ 📝 先想清楚为什么换：钱少？累？没成长？不开心？先找好下家再辞职，别裸辞。更新简历，多面试积累经验。谈薪资要有底气。换工作是大事，慎重考虑！','换工作小建议~ 💡 换工作建议~ 📝 先想清楚为什么换：钱少？累？没成长？不开心？先找好下家再辞职，别裸辞。更新简历，多面试积累经验。谈薪资要有底气。换工作是大事，慎重考虑！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_职场人际关系', kw: ['职场人际关系','和同事相处','办公室政治','职场沟通'], tpl: ['职场建议~ 🤝 尊重每一个人，包括保洁阿姨。多倾听少抱怨。有问题当面沟通，别背后说人。学会拒绝，别当老好人。保持专业，公私分明。好的人际关系让工作更顺利！','职场人际关系小建议~ 💡 职场建议~ 🤝 尊重每一个人，包括保洁阿姨。多倾听少抱怨。有问题当面沟通，别背后说人。学会拒绝，别当老好人。保持专业，公私分明。好的人际关系让工作更顺利！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_和领导沟通', kw: ['怎么和领导沟通','汇报工作','向上管理','和老板沟通'], tpl: ['向上沟通建议~ 📊 汇报工作：结论先行，用数据说话，有方案有建议。定期同步进度，别等领导问。有问题及时反馈，别藏着掖着。了解领导的风格和期望。尊重但不盲从，有不同意见可以说！','和领导沟通小建议~ 💡 向上沟通建议~ 📊 汇报工作：结论先行，用数据说话，有方案有建议。定期同步进度，别等领导问。有问题及时反馈，别藏着掖着。了解领导的风格和期望。尊重但不盲从，有不同意见可以说！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_公开演讲', kw: ['怎么演讲','公开演讲','演讲技巧','汇报演讲'], tpl: ['演讲建议~ 🎤 充分准备，多练习。结构清晰：开头吸引人、中间有逻辑、结尾有力量。眼神接触，声音洪亮，语速适中。用故事和例子，别光念PPT。接受紧张，深呼吸。多讲就好了！','公开演讲小建议~ 💡 演讲建议~ 🎤 充分准备，多练习。结构清晰：开头吸引人、中间有逻辑、结尾有力量。眼神接触，声音洪亮，语速适中。用故事和例子，别光念PPT。接受紧张，深呼吸。多讲就好了！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_写作技巧', kw: ['怎么提高写作','写作技巧','写文章','文案'], tpl: ['写作建议~ ✍️ 多读多写，每天写一点。先写大纲，再填内容。用简单的话，别装。写完多读几遍，修改修改再修改。程序员写技术博客很重要，分享也是学习！','写作技巧小建议~ 💡 写作建议~ ✍️ 多读多写，每天写一点。先写大纲，再填内容。用简单的话，别装。写完多读几遍，修改修改再修改。程序员写技术博客很重要，分享也是学习！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_拍照技巧', kw: ['怎么拍照好看','拍照技巧','摄影入门','手机拍照'], tpl: ['拍照建议~ 📷 构图：三分法、对称、引导线。光线：顺光、侧光、黄金时刻。角度：蹲下、仰拍、俯拍。后期：适度调色，别过度。多拍多练，审美会提高。程序员做产品也需要好审美！','拍照技巧小建议~ 💡 拍照建议~ 📷 构图：三分法、对称、引导线。光线：顺光、侧光、黄金时刻。角度：蹲下、仰拍、俯拍。后期：适度调色，别过度。多拍多练，审美会提高。程序员做产品也需要好审美！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_穿搭建议', kw: ['怎么穿搭','穿搭推荐','穿衣搭配','形象改造'], tpl: ['穿搭建议~ 👔 干净整洁最重要。基础款百搭：白T、衬衫、牛仔裤、休闲裤。颜色别超过3种。合身比品牌重要。程序员可以走简约、科技、工装风。看人先看鞋，鞋子要干净。提升形象，自信加分！','穿搭建议小建议~ 💡 穿搭建议~ 👔 干净整洁最重要。基础款百搭：白T、衬衫、牛仔裤、休闲裤。颜色别超过3种。合身比品牌重要。程序员可以走简约、科技、工装风。看人先看鞋，鞋子要干净。提升形象，自信加分！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_护肤建议', kw: ['怎么护肤','护肤推荐','男士护肤','皮肤保养'], tpl: ['护肤建议~ 🧴 基础三步：清洁、保湿、防晒。洗面奶别用太勤，一天1-2次。保湿霜早晚用。防晒最重要，阴天也要涂。别熬夜，多喝水，饮食清淡。程序员也要注意形象！','护肤建议小建议~ 💡 护肤建议~ 🧴 基础三步：清洁、保湿、防晒。洗面奶别用太勤，一天1-2次。保湿霜早晚用。防晒最重要，阴天也要涂。别熬夜，多喝水，饮食清淡。程序员也要注意形象！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_宠物推荐', kw: ['养什么宠物','宠物推荐','养猫还是养狗','宠物'], tpl: ['宠物建议~ 🐱🐶 猫：独立、安静、不用遛，适合忙的程序员。狗：忠诚、活泼、需要遛，适合有时间的人。其他：鱼、仓鼠、兔子、蜥蜴。养之前想清楚，要负责到底！养宠物减压又治愈！','宠物推荐小建议~ 💡 宠物建议~ 🐱🐶 猫：独立、安静、不用遛，适合忙的程序员。狗：忠诚、活泼、需要遛，适合有时间的人。其他：鱼、仓鼠、兔子、蜥蜴。养之前想清楚，要负责到底！养宠物减压又治愈！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_买车建议', kw: ['买什么车','买车推荐','买车预算','选车'], tpl: ['买车建议~ 🚗 先定预算，再选车型。家用：SUV、轿车；代步：小型车、电动车。考虑：油耗、保养、空间、安全、保值率。新能源还是燃油？看使用场景。别超预算，车是消耗品。程序员很多喜欢特斯拉、小鹏、理想！','买车建议小建议~ 💡 买车建议~ 🚗 先定预算，再选车型。家用：SUV、轿车；代步：小型车、电动车。考虑：油耗、保养、空间、安全、保值率。新能源还是燃油？看使用场景。别超预算，车是消耗品。程序员很多喜欢特斯拉、小鹏、理想！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_买房建议', kw: ['怎么买房','买房建议','买房攻略','选房'], tpl: ['买房建议~ 🏠 大事！先定预算和需求。考虑：地段、交通、学区、配套、户型、楼层、朝向、物业。新房还是二手房？各有利弊。多看房，别冲动。贷款算清楚月供。买房是人生大事，慎重！','买房建议小建议~ 💡 买房建议~ 🏠 大事！先定预算和需求。考虑：地段、交通、学区、配套、户型、楼层、朝向、物业。新房还是二手房？各有利弊。多看房，别冲动。贷款算清楚月供。买房是人生大事，慎重！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'daily_装修建议', kw: ['怎么装修','装修建议','装修攻略','家装'], tpl: ['装修建议~ 🔨 先定预算和风格。轻装修重装饰，别搞太复杂。水电一定要做好，隐蔽工程别省。收纳空间要够。环保材料，通风散味。找靠谱的装修公司或工长。多做功课，别被坑！','装修建议小建议~ 💡 装修建议~ 🔨 先定预算和风格。轻装修重装饰，别搞太复杂。水电一定要做好，隐蔽工程别省。收纳空间要够。环保材料，通风散味。找靠谱的装修公司或工长。多做功课，别被坑！ 以上是一些参考，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },

      { id: 'fun_脑筋急转弯', kw: ['脑筋急转弯','急转弯','智力题','脑子急转弯'], tpl: ['脑筋急转弯~ 🧠 什么东西越洗越脏？答案：水！💧 什么门永远关不上？答案：球门！⚽ 还想听吗？','脑筋急转弯时间~ 🎉 脑筋急转弯~ 🧠 什么东西越洗越脏？答案：水！💧 什么门永远关不上？答案：球门！⚽ 还想听吗？ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_冷笑话', kw: ['冷笑话','讲个冷笑话','冷笑话大全','好冷'], tpl: ['冷笑话~ 🥶 为什么企鹅的肚子是白的？因为手短洗不到后背！🐧 为什么蘑菇长得像雨伞？因为它在等雨！🍄 冷不冷？','冷笑话时间~ 🎉 冷笑话~ 🥶 为什么企鹅的肚子是白的？因为手短洗不到后背！🐧 为什么蘑菇长得像雨伞？因为它在等雨！🍄 冷不冷？ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_土味情话', kw: ['土味情话','情话','撩妹','撩汉','土味'], tpl: ['土味情话~ 💕 你知道我最喜欢什么酒吗？和你的天长地久！🍷 你知道我最喜欢什么神吗？你的眼神！👀 土不土？哈哈','土味情话时间~ 🎉 土味情话~ 💕 你知道我最喜欢什么酒吗？和你的天长地久！🍷 你知道我最喜欢什么神吗？你的眼神！👀 土不土？哈哈 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_绕口令', kw: ['绕口令','说个绕口令','绕口令大全','练口才'], tpl: ['绕口令~ 👄 红鲤鱼与绿鲤鱼与驴！🐟 四是四，十是十，十四是十四，四十是四十！🔢 黑化肥发灰会挥发，灰化肥挥发会发黑！🌫️ 你能说清楚吗？','绕口令时间~ 🎉 绕口令~ 👄 红鲤鱼与绿鲤鱼与驴！🐟 四是四，十是十，十四是十四，四十是四十！🔢 黑化肥发灰会挥发，灰化肥挥发会发黑！🌫️ 你能说清楚吗？ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_歇后语', kw: ['歇后语','说个歇后语','歇后语大全','俏皮话'], tpl: ['歇后语~ 🎭 猪八戒照镜子——里外不是人！🐷 外甥打灯笼——照旧(舅)！🏮 孔夫子搬家——净是输(书)！📚 芝麻开花——节节高！🌿 有意思吧？','歇后语时间~ 🎉 歇后语~ 🎭 猪八戒照镜子——里外不是人！🐷 外甥打灯笼——照旧(舅)！🏮 孔夫子搬家——净是输(书)！📚 芝麻开花——节节高！🌿 有意思吧？ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_谚语', kw: ['谚语','说个谚语','谚语大全','俗语'], tpl: ['谚语~ 📜 千里之行，始于足下！👣 路遥知马力，日久见人心！🐴 三个臭皮匠，顶个诸葛亮！🧠 少壮不努力，老大徒伤悲！😢 都是智慧的结晶！','谚语时间~ 🎉 谚语~ 📜 千里之行，始于足下！👣 路遥知马力，日久见人心！🐴 三个臭皮匠，顶个诸葛亮！🧠 少壮不努力，老大徒伤悲！😢 都是智慧的结晶！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_名言警句', kw: ['名言','警句','名人名言','说句名言'], tpl: ['名言~ 💬 孔子：学而时习之，不亦说乎！📚 鲁迅：世上本没有路，走的人多了也便成了路！🛤️ 爱迪生：天才是1%的灵感加99%的汗水！💧 程序员：代码是写出来的，不是想出来的！💻','名言警句时间~ 🎉 名言~ 💬 孔子：学而时习之，不亦说乎！📚 鲁迅：世上本没有路，走的人多了也便成了路！🛤️ 爱迪生：天才是1%的灵感加99%的汗水！💧 程序员：代码是写出来的，不是想出来的！💻 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_古诗词接龙', kw: ['诗词接龙','古诗接龙','接诗句','诗词接龙'], tpl: ['诗词接龙~ 📜 我先来：床前明月光~ 🌙 轮到你接下一句！（提示：疑是地上霜） 哈哈，你接对了吗？','古诗词接龙时间~ 🎉 诗词接龙~ 📜 我先来：床前明月光~ 🌙 轮到你接下一句！（提示：疑是地上霜） 哈哈，你接对了吗？ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_猜成语', kw: ['猜成语','成语猜谜','看图猜成语','成语谜'], tpl: ['猜成语~ 🎯 最高的人——顶天立地！🏔️ 最快的速度——一日千里！🐎 最大的手——一手遮天！✋ 最吝啬的人——一毛不拔！🪶 你猜对了几个？','猜成语时间~ 🎉 猜成语~ 🎯 最高的人——顶天立地！🏔️ 最快的速度——一日千里！🐎 最大的手——一手遮天！✋ 最吝啬的人——一毛不拔！🪶 你猜对了几个？ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_数字游戏', kw: ['数字游戏','猜数字','24点','数字谜'], tpl: ['数字游戏~ 🔢 24点：用3、3、8、8怎么算出24？答案：8÷(3-8÷3)=24！🧮 猜数字：我想了一个1-100的数，你猜是多少？我会告诉你大了还是小了！','数字游戏时间~ 🎉 数字游戏~ 🔢 24点：用3、3、8、8怎么算出24？答案：8÷(3-8÷3)=24！🧮 猜数字：我想了一个1-100的数，你猜是多少？我会告诉你大了还是小了！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_文字游戏', kw: ['文字游戏','填词','字谜','文字谜'], tpl: ['文字游戏~ ✍️ 字谜：一点一横长，一撇到南洋，南洋有个人，只有一寸长——答案：府！🏠 又进村来——答案：树！🌳 你猜对了吗？','文字游戏时间~ 🎉 文字游戏~ ✍️ 字谜：一点一横长，一撇到南洋，南洋有个人，只有一寸长——答案：府！🏠 又进村来——答案：树！🌳 你猜对了吗？ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_逻辑推理', kw: ['逻辑推理','推理题','智力推理','逻辑题'], tpl: ['逻辑推理~ 🧩 一个房间里有3盏灯，门外有3个开关，你只能进房间一次，怎么判断哪个开关控制哪盏灯？答案：先开一个开关10分钟，关掉，再开另一个，进房间：亮的是第二个，热的是第一个，剩下的是第三个！💡 你想到了吗？','逻辑推理时间~ 🎉 逻辑推理~ 🧩 一个房间里有3盏灯，门外有3个开关，你只能进房间一次，怎么判断哪个开关控制哪盏灯？答案：先开一个开关10分钟，关掉，再开另一个，进房间：亮的是第二个，热的是第一个，剩下的是第三个！💡 你想到了吗？ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_趣味问答', kw: ['趣味问答','趣味题','有趣的问题','冷知识'], tpl: ['趣味问答~ 🤔 为什么天是蓝的？因为瑞利散射！🌌 为什么海水是咸的？因为河流带来了矿物质！🌊 为什么打哈欠会传染？因为共情能力！😴 冷知识增加了！','趣味问答时间~ 🎉 趣味问答~ 🤔 为什么天是蓝的？因为瑞利散射！🌌 为什么海水是咸的？因为河流带来了矿物质！🌊 为什么打哈欠会传染？因为共情能力！😴 冷知识增加了！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_星座运势', kw: ['星座','运势','星座运势','十二星座'], tpl: ['星座~ ⭐ 十二星座：白羊、金牛、双子、巨蟹、狮子、处女、天秤、天蝎、射手、摩羯、水瓶、双鱼。你是什么星座？不过星座娱乐就好，别太当真哦！','星座运势时间~ 🎉 星座~ ⭐ 十二星座：白羊、金牛、双子、巨蟹、狮子、处女、天秤、天蝎、射手、摩羯、水瓶、双鱼。你是什么星座？不过星座娱乐就好，别太当真哦！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_生肖', kw: ['生肖','属相','十二生肖','本命年'], tpl: ['生肖~ 🐭 十二生肖：鼠牛虎兔龙蛇马羊猴鸡狗猪！2024是龙年，2025是蛇年。你属什么？生肖是中国传统文化，很有意思！','生肖时间~ 🎉 生肖~ 🐭 十二生肖：鼠牛虎兔龙蛇马羊猴鸡狗猪！2024是龙年，2025是蛇年。你属什么？生肖是中国传统文化，很有意思！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_塔罗牌', kw: ['塔罗牌','占卜','算一卦','算命'], tpl: ['塔罗牌~ 🔮 娱乐一下就好，别太当真！命运掌握在自己手中，不是牌里！与其算命，不如努力。程序员的命运：代码写得好，薪资不会少！💻','塔罗牌时间~ 🎉 塔罗牌~ 🔮 娱乐一下就好，别太当真！命运掌握在自己手中，不是牌里！与其算命，不如努力。程序员的命运：代码写得好，薪资不会少！💻 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_心理测试', kw: ['心理测试','性格测试','测一测','人格测试'], tpl: ['心理测试~ 🧠 MBTI十六型人格：INTJ、INTP、ENTJ、ENTP... 你是哪种？程序员很多是INTJ/INTP！不过测试娱乐就好，人是复杂的，不能被标签定义！','心理测试时间~ 🎉 心理测试~ 🧠 MBTI十六型人格：INTJ、INTP、ENTJ、ENTP... 你是哪种？程序员很多是INTJ/INTP！不过测试娱乐就好，人是复杂的，不能被标签定义！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_脑筋急转弯2', kw: ['再出个谜语','再来一个','还有吗','继续猜'], tpl: ['再来一个~ 🎲 什么东西有头有尾没有身体？答案：硬币！🪙 什么东西越用越好用？答案：大脑！🧠 什么书在书店买不到？答案：遗书！📜 还想听吗？','脑筋急转弯2时间~ 🎉 再来一个~ 🎲 什么东西有头有尾没有身体？答案：硬币！🪙 什么东西越用越好用？答案：大脑！🧠 什么书在书店买不到？答案：遗书！📜 还想听吗？ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_讲个故事2', kw: ['再讲个故事','再来一个故事','故事大全','睡前故事'], tpl: ['再讲个故事~ 📖 从前有座山，山里有座庙，庙里有个老和尚在给小和尚讲故事：从前有座山... 哈哈，无限循环！🔄 换一个：三个程序员在酒吧，第一个说：我要一杯啤酒。第二个说：我要一杯啤酒。第三个说：我要0杯啤酒。酒保说：你们是数组吗？🍺 哈哈！','讲个故事2时间~ 🎉 再讲个故事~ 📖 从前有座山，山里有座庙，庙里有个老和尚在给小和尚讲故事：从前有座山... 哈哈，无限循环！🔄 换一个：三个程序员在酒吧，第一个说：我要一杯啤酒。第二个说：我要一杯啤酒。第三个说：我要0杯啤酒。酒保说：你们是数组吗？🍺 哈哈！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_冷知识', kw: ['冷知识','有趣的知识','你知道吗','小知识'], tpl: ['冷知识~ 🧊 蜂蜜永远不会坏！🍯 章鱼有三个心脏！🐙 香蕉是浆果，而草莓不是！🍌 人类DNA和香蕉有60%相似！🧬 程序员的键盘上，Ctrl+C和Ctrl+V用得最多！💻 冷知识增加了！','冷知识时间~ 🎉 冷知识~ 🧊 蜂蜜永远不会坏！🍯 章鱼有三个心脏！🐙 香蕉是浆果，而草莓不是！🍌 人类DNA和香蕉有60%相似！🧬 程序员的键盘上，Ctrl+C和Ctrl+V用得最多！💻 冷知识增加了！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_谐音梗', kw: ['谐音梗','谐音','玩梗','梗'], tpl: ['谐音梗~ 😂 为什么程序员总是分不清万圣节和圣诞节？因为Oct 31 == Dec 25！🎃 我买了个程序员主题的蛋糕，上面写着：404 Not Found！🎂 谐音梗虽冷，但快乐！','谐音梗时间~ 🎉 谐音梗~ 😂 为什么程序员总是分不清万圣节和圣诞节？因为Oct 31 == Dec 25！🎃 我买了个程序员主题的蛋糕，上面写着：404 Not Found！🎂 谐音梗虽冷，但快乐！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_程序员笑话2', kw: ['程序员笑话','码农笑话','it笑话','编程笑话'], tpl: ['程序员笑话~ 💻 程序员的老婆让他去买面包，说："如果有鸡蛋，买6个。"程序员买了6个面包回来。老婆问："为什么买6个？"程序员说："因为有鸡蛋。"🥚 哈哈，程序员的逻辑！','程序员笑话2时间~ 🎉 程序员笑话~ 💻 程序员的老婆让他去买面包，说："如果有鸡蛋，买6个。"程序员买了6个面包回来。老婆问："为什么买6个？"程序员说："因为有鸡蛋。"🥚 哈哈，程序员的逻辑！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_职场笑话', kw: ['职场笑话','上班笑话','打工人笑话','办公室笑话'], tpl: ['职场笑话~ 💼 老板问："你为什么迟到？"程序员说："因为我在等编译。"⏳ 打工人的日常：早上起不来，晚上睡不着，周一盼周五，周五晚上最快乐！😴 打工人，打工魂，打工都是人上人！💪','职场笑话时间~ 🎉 职场笑话~ 💼 老板问："你为什么迟到？"程序员说："因为我在等编译。"⏳ 打工人的日常：早上起不来，晚上睡不着，周一盼周五，周五晚上最快乐！😴 打工人，打工魂，打工都是人上人！💪 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_生活笑话', kw: ['生活笑话','日常笑话','搞笑段子','爆笑'], tpl: ['生活笑话~ 😄 我问健身教练："练什么能快速变壮？"教练说："练胆子，胆子大了就敢多吃了。"🍗 我妈说我房间像猪窝，我说："那也是猪住的地方，我是程序员，应该叫代码窝。"💻 哈哈！','生活笑话时间~ 🎉 生活笑话~ 😄 我问健身教练："练什么能快速变壮？"教练说："练胆子，胆子大了就敢多吃了。"🍗 我妈说我房间像猪窝，我说："那也是猪住的地方，我是程序员，应该叫代码窝。"💻 哈哈！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_动物笑话', kw: ['动物笑话','动物冷笑话','宠物笑话','小动物'], tpl: ['动物笑话~ 🐾 一只蜗牛被乌龟撞了，警察问蜗牛："你看清肇事者了吗？"蜗牛说："没看清，太快了！"🐢 一只鸡过马路，为什么？因为它要到对面去！🐔 哈哈，动物也很有趣！','动物笑话时间~ 🎉 动物笑话~ 🐾 一只蜗牛被乌龟撞了，警察问蜗牛："你看清肇事者了吗？"蜗牛说："没看清，太快了！"🐢 一只鸡过马路，为什么？因为它要到对面去！🐔 哈哈，动物也很有趣！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_校园笑话', kw: ['校园笑话','学生笑话','老师笑话','考试笑话'], tpl: ['校园笑话~ 🎓 考试前：我要复习！考试中：这题我见过？考试后：这题我做过？📚 老师问："为什么不交作业？"学生说："我的电脑中病毒了，作业被吃了。"💻 老师："你以为我是傻子吗？"学生："不，我以为你信了。"哈哈！','校园笑话时间~ 🎉 校园笑话~ 🎓 考试前：我要复习！考试中：这题我见过？考试后：这题我做过？📚 老师问："为什么不交作业？"学生说："我的电脑中病毒了，作业被吃了。"💻 老师："你以为我是傻子吗？"学生："不，我以为你信了。"哈哈！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_历史笑话', kw: ['历史笑话','古人笑话','历史梗','穿越'], tpl: ['历史笑话~ 🏛️ 如果古代有程序员，诸葛亮的空城计就是：打开城门，在城楼上写代码，司马懿看到后说："这肯定有Bug，撤！"🐛 孔子曰："三人行，必有我师焉。"程序员曰："三人行，必有Bug焉。"💻 历史与编程的碰撞！','历史笑话时间~ 🎉 历史笑话~ 🏛️ 如果古代有程序员，诸葛亮的空城计就是：打开城门，在城楼上写代码，司马懿看到后说："这肯定有Bug，撤！"🐛 孔子曰："三人行，必有我师焉。"程序员曰："三人行，必有Bug焉。"💻 历史与编程的碰撞！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_科幻笑话', kw: ['科幻笑话','未来笑话','机器人笑话','ai笑话'], tpl: ['科幻笑话~ 🤖 一个AI对程序员说："我要取代你！"程序员说："好啊，先把这个需求改了。"AI："需求又变了？我还是不取代你了。"📝 未来的程序员：和AI结对编程，AI写代码，程序员改需求！哈哈！','科幻笑话时间~ 🎉 科幻笑话~ 🤖 一个AI对程序员说："我要取代你！"程序员说："好啊，先把这个需求改了。"AI："需求又变了？我还是不取代你了。"📝 未来的程序员：和AI结对编程，AI写代码，程序员改需求！哈哈！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },
      { id: 'fun_美食笑话', kw: ['美食笑话','吃货笑话','吃的笑话','减肥笑话'], tpl: ['美食笑话~ 🍔 减肥第一天：我要节食！减肥第二天：就吃一口。减肥第三天：明天再减。🍕 程序员的减肥：代码跑起来了，我也跑起来了（去拿外卖）。🏃 美食不可辜负，减肥从明天开始！哈哈！','美食笑话时间~ 🎉 美食笑话~ 🍔 减肥第一天：我要节食！减肥第二天：就吃一口。减肥第三天：明天再减。🍕 程序员的减肥：代码跑起来了，我也跑起来了（去拿外卖）。🏃 美食不可辜负，减肥从明天开始！哈哈！ 开心一笑，烦恼全消！还想听更多吗？继续问我~'] },

      { id: 'qa_为什么学编程', kw: ['为什么学编程','学编程有什么用','编程有什么用','为什么要学代码'], tpl: ['学编程的好处~ 💻 锻炼逻辑思维、提高解决问题能力、就业前景好、薪资高、可以做自己的产品、改变世界！现在是数字时代，编程是必备技能！','为什么学编程解答~ 💡 学编程的好处~ 💻 锻炼逻辑思维、提高解决问题能力、就业前景好、薪资高、可以做自己的产品、改变世界！现在是数字时代，编程是必备技能！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_编程难吗', kw: ['编程难吗','编程难不难','学编程难吗','代码难吗'], tpl: ['编程入门不难，精通难~ 📚 零基础可以从Python或JavaScript开始，语法简单。多写多练，遇到问题多查多问。每个人都是从Hello World开始的！你一定可以的！','编程难吗解答~ 💡 编程入门不难，精通难~ 📚 零基础可以从Python或JavaScript开始，语法简单。多写多练，遇到问题多查多问。每个人都是从Hello World开始的！你一定可以的！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_多久能学会', kw: ['多久能学会编程','学编程要多久','多长时间能学会','编程入门要多久'], tpl: ['学习时间因人而异~ ⏰ 入门：1-3个月，能写简单程序；初级：3-6个月，能做小项目；中级：6-12个月，能独立开发；高级：1-3年+。关键是持续学习和实践！','多久能学会解答~ 💡 学习时间因人而异~ ⏰ 入门：1-3个月，能写简单程序；初级：3-6个月，能做小项目；中级：6-12个月，能独立开发；高级：1-3年+。关键是持续学习和实践！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_零基础能学吗', kw: ['零基础能学编程吗','零基础可以学吗','没基础能学吗','小白能学吗'], tpl: ['零基础完全可以！🌟 每个人都是从零开始的。推荐从Python开始，语法接近自然语言。CodeUp码上就是为零基础设计的，从浅度到深度系统学习。你已经迈出第一步了！','零基础能学吗解答~ 💡 零基础完全可以！🌟 每个人都是从零开始的。推荐从Python开始，语法接近自然语言。CodeUp码上就是为零基础设计的，从浅度到深度系统学习。你已经迈出第一步了！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_年龄大了能学吗', kw: ['年龄大了能学编程吗','30岁学编程晚吗','40岁学编程','年纪大了能学吗'], tpl: ['学习永远不晚~ 🎓 编程不是年轻人的专利！很多人30+、40+转行成功。关键是兴趣和坚持。年龄大反而有优势：更有耐心、更懂业务、更自律。开始就是最好的时机！','年龄大了能学吗解答~ 💡 学习永远不晚~ 🎓 编程不是年轻人的专利！很多人30+、40+转行成功。关键是兴趣和坚持。年龄大反而有优势：更有耐心、更懂业务、更自律。开始就是最好的时机！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_数学不好能学吗', kw: ['数学不好能学编程吗','数学差能学吗','不会数学能学编程吗','数学不好'], tpl: ['数学不好也能学编程！🔢 大部分编程工作不需要高深数学。基础数学够用就行。需要数学的方向：算法、游戏、AI、图形学。其他方向：Web、移动端、后端，数学要求不高。别让数学成为借口！','数学不好能学吗解答~ 💡 数学不好也能学编程！🔢 大部分编程工作不需要高深数学。基础数学够用就行。需要数学的方向：算法、游戏、AI、图形学。其他方向：Web、移动端、后端，数学要求不高。别让数学成为借口！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_英语不好能学吗', kw: ['英语不好能学编程吗','英语差能学吗','不会英语能学编程吗','英语不好'], tpl: ['英语不好也能学编程！🌍 编程关键词就几十个，用多了就记住了。现在有很多中文教程和文档。AI翻译工具也很方便。但学好英语有优势：能看英文文档、第一手资料。慢慢学，不急！','英语不好能学吗解答~ 💡 英语不好也能学编程！🌍 编程关键词就几十个，用多了就记住了。现在有很多中文教程和文档。AI翻译工具也很方便。但学好英语有优势：能看英文文档、第一手资料。慢慢学，不急！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_女生适合学吗', kw: ['女生适合学编程吗','女生能学编程吗','女生学代码','女孩子学编程'], tpl: ['女生非常适合学编程！👩‍💻 编程不分性别！女生细心、有耐心、沟通能力强，这些都是优势。很多优秀的女程序员、女架构师、女CTO。科技行业需要更多女性！别被刻板印象限制，你一定行！','女生适合学吗解答~ 💡 女生非常适合学编程！👩‍💻 编程不分性别！女生细心、有耐心、沟通能力强，这些都是优势。很多优秀的女程序员、女架构师、女CTO。科技行业需要更多女性！别被刻板印象限制，你一定行！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_自学能学会吗', kw: ['自学能学会编程吗','自学可以吗','自学编程难吗','能自学吗'], tpl: ['自学完全可以！📚 现在网上资源丰富：教程、视频、文档、社区。关键是：有计划、多实践、遇到问题会搜索、加入学习社群。CodeUp码上就是很好的自学平台！自律+坚持=成功！','自学能学会吗解答~ 💡 自学完全可以！📚 现在网上资源丰富：教程、视频、文档、社区。关键是：有计划、多实践、遇到问题会搜索、加入学习社群。CodeUp码上就是很好的自学平台！自律+坚持=成功！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_培训有用吗', kw: ['编程培训有用吗','培训班值得吗','报班还是自学','培训机构'], tpl: ['培训有利有弊~ 🏫 优点：有老师带、有学习氛围、有项目实战、有就业指导。缺点：贵、质量参差不齐、时间固定。建议：先自学一段时间，确定有兴趣再考虑报班。自学能力强的完全可以自学！','培训有用吗解答~ 💡 培训有利有弊~ 🏫 优点：有老师带、有学习氛围、有项目实战、有就业指导。缺点：贵、质量参差不齐、时间固定。建议：先自学一段时间，确定有兴趣再考虑报班。自学能力强的完全可以自学！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_程序员加班吗', kw: ['程序员加班吗','996','程序员累吗','程序员工作强度'], tpl: ['程序员加班情况看公司~ ⏰ 大厂可能加班多，外企/国企相对规律。996是个别现象，不是全部。选择公司时可以了解加班文化。注意身体，别拿健康换钱。效率高的程序员不加班也能完成工作！','程序员加班吗解答~ 💡 程序员加班情况看公司~ ⏰ 大厂可能加班多，外企/国企相对规律。996是个别现象，不是全部。选择公司时可以了解加班文化。注意身体，别拿健康换钱。效率高的程序员不加班也能完成工作！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_程序员薪资', kw: ['程序员薪资多少','程序员工资','编程赚钱吗','程序员收入'], tpl: ['程序员薪资相对较高~ 💰 一线城市：初级8-15K，中级15-30K，高级30-50K+，架构师/技术总监50K+。二三线城市稍低。但薪资和能力、经验、公司挂钩。持续学习才能涨薪！','程序员薪资解答~ 💡 程序员薪资相对较高~ 💰 一线城市：初级8-15K，中级15-30K，高级30-50K+，架构师/技术总监50K+。二三线城市稍低。但薪资和能力、经验、公司挂钩。持续学习才能涨薪！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_程序员35岁危机', kw: ['35岁危机','程序员35岁','中年危机','程序员吃青春饭吗'], tpl: ['35岁危机是伪命题~ 🎯 技术行业不看年龄看能力。35岁+的优势：经验丰富、业务理解深、沟通能力强。方向：技术专家、架构师、技术管理、创业、转产品/项目。持续学习，保持竞争力，年龄不是问题！','程序员35岁危机解答~ 💡 35岁危机是伪命题~ 🎯 技术行业不看年龄看能力。35岁+的优势：经验丰富、业务理解深、沟通能力强。方向：技术专家、架构师、技术管理、创业、转产品/项目。持续学习，保持竞争力，年龄不是问题！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么找工作', kw: ['程序员怎么找工作','找工作技巧','编程求职','怎么面试'], tpl: ['找工作建议~ 📝 1.准备好简历，突出项目经验 2.刷算法题（LeetCode）3.准备项目介绍，能讲清楚技术难点 4.多投简历，多面试积累经验 5.了解目标公司技术栈 6.谈薪资有底气。第一份工作不要太挑，先入行！','怎么找工作解答~ 💡 找工作建议~ 📝 1.准备好简历，突出项目经验 2.刷算法题（LeetCode）3.准备项目介绍，能讲清楚技术难点 4.多投简历，多面试积累经验 5.了解目标公司技术栈 6.谈薪资有底气。第一份工作不要太挑，先入行！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么接私活', kw: ['怎么接私活','程序员副业','接外包','接单平台'], tpl: ['接私活渠道~ 💼 平台：猪八戒、程序员客栈、码市、Upwork、Freelancer。社群：技术群、朋友圈、开源社区。注意：先收钱再干活、签合同、明确需求、别影响主业。私活是额外收入，量力而行！','怎么接私活解答~ 💡 接私活渠道~ 💼 平台：猪八戒、程序员客栈、码市、Upwork、Freelancer。社群：技术群、朋友圈、开源社区。注意：先收钱再干活、签合同、明确需求、别影响主业。私活是额外收入，量力而行！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么做开源', kw: ['怎么做开源','参与开源项目','开源贡献','github开源'], tpl: ['参与开源建议~ 🌍 1.选一个你用的项目 2.看issues，找good first issue 3.先改文档、修小Bug 4.读源码，理解项目结构 5.提PR，写清楚改动 6.和维护者沟通。开源是提升技术和简历的好方法！','怎么做开源解答~ 💡 参与开源建议~ 🌍 1.选一个你用的项目 2.看issues，找good first issue 3.先改文档、修小Bug 4.读源码，理解项目结构 5.提PR，写清楚改动 6.和维护者沟通。开源是提升技术和简历的好方法！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么写博客', kw: ['怎么写技术博客','写博客','技术写作','博客平台'], tpl: ['写博客建议~ ✍️ 平台：掘金、思否、知乎、CSDN、个人博客。内容：学习笔记、项目实战、踩坑记录、技术总结。技巧：先写大纲、用简单的话、配代码示例、多修改。好处：巩固知识、建立个人品牌、找工作加分。坚持写！','怎么写博客解答~ 💡 写博客建议~ ✍️ 平台：掘金、思否、知乎、CSDN、个人博客。内容：学习笔记、项目实战、踩坑记录、技术总结。技巧：先写大纲、用简单的话、配代码示例、多修改。好处：巩固知识、建立个人品牌、找工作加分。坚持写！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么做项目', kw: ['怎么做项目','编程项目','练手项目','项目经验'], tpl: ['做项目建议~ 🚀 从简单开始：待办清单、计算器、天气应用、个人博客。逐步复杂：电商网站、聊天应用、管理系统。完整流程：需求分析→设计→编码→测试→部署。放到GitHub，写好README。项目是找工作的敲门砖！','怎么做项目解答~ 💡 做项目建议~ 🚀 从简单开始：待办清单、计算器、天气应用、个人博客。逐步复杂：电商网站、聊天应用、管理系统。完整流程：需求分析→设计→编码→测试→部署。放到GitHub，写好README。项目是找工作的敲门砖！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么读源码', kw: ['怎么读源码','读开源项目源码','源码阅读','看源码'], tpl: ['读源码建议~ 📖 1.先用起来，了解功能 2.看文档和架构图 3.从入口文件开始 4.画流程图、时序图 5.打断点调试 6.看测试用例 7.做笔记。别一行行读，先抓主干再看细节。读源码是进阶必经之路！','怎么读源码解答~ 💡 读源码建议~ 📖 1.先用起来，了解功能 2.看文档和架构图 3.从入口文件开始 4.画流程图、时序图 5.打断点调试 6.看测试用例 7.做笔记。别一行行读，先抓主干再看细节。读源码是进阶必经之路！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么调试', kw: ['怎么调试代码','调试技巧','找bug','排错方法'], tpl: ['调试技巧~ 🐛 1.复现问题 2.看错误信息和堆栈 3.打印日志/断点 4.二分法注释代码缩小范围 5.小黄鸭调试法 6.查Google/Stack Overflow 7.休息一下，换个思路。调试是程序员的核心能力，多练！','怎么调试解答~ 💡 调试技巧~ 🐛 1.复现问题 2.看错误信息和堆栈 3.打印日志/断点 4.二分法注释代码缩小范围 5.小黄鸭调试法 6.查Google/Stack Overflow 7.休息一下，换个思路。调试是程序员的核心能力，多练！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么提高代码质量', kw: ['怎么提高代码质量','代码质量','写好代码','代码规范'], tpl: ['提高代码质量~ ✨ 1.命名见名知意 2.函数单一职责 3.适当注释 4.减少重复代码 5.错误处理完善 6.写单元测试 7.Code Review 8.重构 9.看优秀代码 10.持续学习。代码是写给人看的，顺便给机器执行！','怎么提高代码质量解答~ 💡 提高代码质量~ ✨ 1.命名见名知意 2.函数单一职责 3.适当注释 4.减少重复代码 5.错误处理完善 6.写单元测试 7.Code Review 8.重构 9.看优秀代码 10.持续学习。代码是写给人看的，顺便给机器执行！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么学习新技术', kw: ['怎么学习新技术','学新技术','快速学习','技术更新快'], tpl: ['学习新技术方法~ 🆕 1.明确目的，为什么学 2.看官方文档和教程 3.动手做小例子 4.做完整项目 5.读源码和最佳实践 6.写笔记总结 7.教别人。技术更新快，但基础不变。打好基础，学新技术就快！','怎么学习新技术解答~ 💡 学习新技术方法~ 🆕 1.明确目的，为什么学 2.看官方文档和教程 3.动手做小例子 4.做完整项目 5.读源码和最佳实践 6.写笔记总结 7.教别人。技术更新快，但基础不变。打好基础，学新技术就快！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_程序员必备技能', kw: ['程序员必备技能','编程技能树','需要学什么','技术栈'], tpl: ['程序员必备技能~ 🧰 基础：数据结构、算法、计算机网络、操作系统、数据库。工具：Git、Linux、IDE/编辑器、调试工具。软技能：沟通、学习能力、解决问题、团队协作。专业技能：根据方向学习。基础打牢，方向深入！','程序员必备技能解答~ 💡 程序员必备技能~ 🧰 基础：数据结构、算法、计算机网络、操作系统、数据库。工具：Git、Linux、IDE/编辑器、调试工具。软技能：沟通、学习能力、解决问题、团队协作。专业技能：根据方向学习。基础打牢，方向深入！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_前端还是后端', kw: ['前端还是后端','选前端还是后端','前端后端区别','全栈'], tpl: ['前端vs后端~ 🎨 前端：做用户看到的界面，需要HTML/CSS/JS，审美和交互感。后端：做服务器逻辑，需要数据库/API/性能，逻辑和架构。全栈：前后端都做。建议：都了解一下，选感兴趣的深入。没有好坏，只有适合！','前端还是后端解答~ 💡 前端vs后端~ 🎨 前端：做用户看到的界面，需要HTML/CSS/JS，审美和交互感。后端：做服务器逻辑，需要数据库/API/性能，逻辑和架构。全栈：前后端都做。建议：都了解一下，选感兴趣的深入。没有好坏，只有适合！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_大厂还是小厂', kw: ['大厂还是小厂','进大厂还是小厂','公司选择','创业公司'], tpl: ['大厂vs小厂~ 🏢 大厂：规范、平台大、资源多、薪资高、竞争激烈、可能做螺丝钉。小厂：成长快、接触全面、灵活、可能累、风险高。建议：毕业先进大厂镀金，或者去快速成长的小厂。看个人目标和阶段！','大厂还是小厂解答~ 💡 大厂vs小厂~ 🏢 大厂：规范、平台大、资源多、薪资高、竞争激烈、可能做螺丝钉。小厂：成长快、接触全面、灵活、可能累、风险高。建议：毕业先进大厂镀金，或者去快速成长的小厂。看个人目标和阶段！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_考研还是工作', kw: ['考研还是工作','读研还是就业','继续读书还是工作','学历重要吗'], tpl: ['考研vs工作~ 🎓 考研：适合想做研究、进大厂研发岗、换专业、想进高校/研究所。工作：适合想早点赚钱、积累经验、动手能力强。学历是敲门砖，但能力更重要。如果想进大厂研发岗，考研有帮助。看自己目标！','考研还是工作解答~ 💡 考研vs工作~ 🎓 考研：适合想做研究、进大厂研发岗、换专业、想进高校/研究所。工作：适合想早点赚钱、积累经验、动手能力强。学历是敲门砖，但能力更重要。如果想进大厂研发岗，考研有帮助。看自己目标！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_考公还是编程', kw: ['考公还是编程','公务员还是程序员','体制内还是互联网','稳定还是高薪'], tpl: ['考公vs编程~ 🏛️ 公务员：稳定、福利好、压力小、薪资固定、可能无聊。程序员：薪资高、成长快、有挑战、可能加班、35岁焦虑。没有标准答案，看自己追求什么。追求稳定选公务员，追求成长和高薪选编程。也可以先编程积累，再考公！','考公还是编程解答~ 💡 考公vs编程~ 🏛️ 公务员：稳定、福利好、压力小、薪资固定、可能无聊。程序员：薪资高、成长快、有挑战、可能加班、35岁焦虑。没有标准答案，看自己追求什么。追求稳定选公务员，追求成长和高薪选编程。也可以先编程积累，再考公！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么保持学习热情', kw: ['怎么保持学习热情','学习动力','坚持不下去','编程兴趣'], tpl: ['保持学习热情~ 🔥 1.做自己感兴趣的项目 2.设定小目标，完成有成就感 3.加入学习社群，和人交流 4.写博客/做开源，获得正反馈 5.定期回顾进步 6.适当休息，别 burnout。兴趣是最好的老师，找到编程的乐趣！','怎么保持学习热情解答~ 💡 保持学习热情~ 🔥 1.做自己感兴趣的项目 2.设定小目标，完成有成就感 3.加入学习社群，和人交流 4.写博客/做开源，获得正反馈 5.定期回顾进步 6.适当休息，别 burnout。兴趣是最好的老师，找到编程的乐趣！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_遇到瓶颈怎么办', kw: ['遇到瓶颈怎么办','学习瓶颈','进步慢','卡在一个阶段'], tpl: ['突破瓶颈~ 📈 1.停下来反思，找问题 2.学更深的基础知识 3.做更有挑战的项目 4.读源码，看高手怎么写 5.找人交流，请教前辈 6.换个方向学习，触类旁通。瓶颈是正常的，突破了就是大进步！别放弃！','遇到瓶颈怎么办解答~ 💡 突破瓶颈~ 📈 1.停下来反思，找问题 2.学更深的基础知识 3.做更有挑战的项目 4.读源码，看高手怎么写 5.找人交流，请教前辈 6.换个方向学习，触类旁通。瓶颈是正常的，突破了就是大进步！别放弃！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },
      { id: 'qa_怎么制定学习计划', kw: ['怎么制定学习计划','学习计划','学习规划','时间安排'], tpl: ['制定学习计划~ 📅 1.明确目标：学什么、达到什么水平 2.拆分成小任务，每周/每天 3.固定学习时间，养成习惯 4.留弹性时间，别排太满 5.定期回顾调整 6.实践+理论结合。计划要可行，坚持最重要！每天进步一点点！','怎么制定学习计划解答~ 💡 制定学习计划~ 📅 1.明确目标：学什么、达到什么水平 2.拆分成小任务，每周/每天 3.固定学习时间，养成习惯 4.留弹性时间，别排太满 5.定期回顾调整 6.实践+理论结合。计划要可行，坚持最重要！每天进步一点点！ 以上是一些建议，具体还要根据自己的情况来。有什么具体问题可以继续问我！'] },

      { id: 'concept_变量', kw: ['什么是变量','','','解释一下变量','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于变量~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_常量', kw: ['什么是常量','','','解释一下常量','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于常量~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_数组', kw: ['什么是数组','','','解释一下数组','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于数组~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_字符串', kw: ['什么是字符串','','','解释一下字符串','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于字符串~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_数字', kw: ['什么是数字','','','解释一下数字','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于数字~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_布尔值', kw: ['什么是布尔值','','','解释一下布尔值','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于布尔值~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_对象', kw: ['什么是对象','','','解释一下对象','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于对象~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_字典', kw: ['什么是字典','','','解释一下字典','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于字典~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_集合', kw: ['什么是集合','','','解释一下集合','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于集合~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_元组', kw: ['什么是元组','','','解释一下元组','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于元组~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_函数', kw: ['什么是函数','','','解释一下函数','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于函数~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_方法', kw: ['什么是方法','','','解释一下方法','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于方法~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_类', kw: ['什么是类','','','解释一下类','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于类~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_对象实例', kw: ['什么是对象实例','','','解释一下对象实例','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于对象实例~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_继承', kw: ['什么是继承','','','解释一下继承','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于继承~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_多态', kw: ['什么是多态','','','解释一下多态','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于多态~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_封装', kw: ['什么是封装','','','解释一下封装','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于封装~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_抽象', kw: ['什么是抽象','','','解释一下抽象','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于抽象~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_接口', kw: ['什么是接口','','','解释一下接口','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于接口~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_构造函数', kw: ['什么是构造函数','','','解释一下构造函数','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于构造函数~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_循环', kw: ['什么是循环','','','解释一下循环','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于循环~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_条件语句', kw: ['什么是条件语句','','','解释一下条件语句','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于条件语句~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_分支', kw: ['什么是分支','','','解释一下分支','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于分支~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_递归', kw: ['什么是递归','','','解释一下递归','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于递归~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_迭代', kw: ['什么是迭代','','','解释一下迭代','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于迭代~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_遍历', kw: ['什么是遍历','','','解释一下遍历','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于遍历~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_排序', kw: ['什么是排序','','','解释一下排序','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于排序~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_查找', kw: ['什么是查找','','','解释一下查找','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于查找~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_过滤', kw: ['什么是过滤','','','解释一下过滤','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于过滤~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_映射', kw: ['什么是映射','','','解释一下映射','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于映射~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_指针', kw: ['什么是指针','','','解释一下指针','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于指针~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_引用', kw: ['什么是引用','','','解释一下引用','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于引用~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_内存', kw: ['什么是内存','','','解释一下内存','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于内存~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_栈', kw: ['什么是栈','','','解释一下栈','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于栈~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_堆', kw: ['什么是堆','','','解释一下堆','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于堆~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_队列', kw: ['什么是队列','','','解释一下队列','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于队列~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_链表', kw: ['什么是链表','','','解释一下链表','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于链表~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_树', kw: ['什么是树','','','解释一下树','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于树~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_图', kw: ['什么是图','','','解释一下图','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于图~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_哈希表', kw: ['什么是哈希表','','','解释一下哈希表','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于哈希表~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_异常', kw: ['什么是异常','','','解释一下异常','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于异常~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_错误', kw: ['什么是错误','','','解释一下错误','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于错误~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_调试', kw: ['什么是调试','','','解释一下调试','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于调试~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_日志', kw: ['什么是日志','','','解释一下日志','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于日志~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_测试', kw: ['什么是测试','','','解释一下测试','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于测试~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_重构', kw: ['什么是重构','','','解释一下重构','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于重构~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_优化', kw: ['什么是优化','','','解释一下优化','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于优化~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_性能', kw: ['什么是性能','','','解释一下性能','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于性能~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_安全', kw: ['什么是安全','','','解释一下安全','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于安全~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'concept_并发', kw: ['什么是并发','','','解释一下并发','',''], tpl: ['~ 建议在CodeUp码上的教程中查看详细解释，配合代码示例理解更深刻！点击顶部语言教程选择编程语言系统学习~','关于并发~ 这是编程基础概念，理解它对写代码很重要。建议动手写代码实践，光看理论不够。有具体代码问题可以直接问我！'] },
      { id: 'howto_做早餐', kw: ['怎么做早餐','如何做早餐','','','学做早餐'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做早餐？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做午餐', kw: ['怎么做午餐','如何做午餐','','','学做午餐'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做午餐？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做晚餐', kw: ['怎么做晚餐','如何做晚餐','','','学做晚餐'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做晚餐？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做咖啡', kw: ['怎么做咖啡','如何做咖啡','','','学做咖啡'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做咖啡？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做奶茶', kw: ['怎么做奶茶','如何做奶茶','','','学做奶茶'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做奶茶？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做甜品', kw: ['怎么做甜品','如何做甜品','','','学做甜品'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做甜品？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做蛋糕', kw: ['怎么做蛋糕','如何做蛋糕','','','学做蛋糕'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做蛋糕？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做面包', kw: ['怎么做面包','如何做面包','','','学做面包'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做面包？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做披萨', kw: ['怎么做披萨','如何做披萨','','','学做披萨'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做披萨？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做寿司', kw: ['怎么做寿司','如何做寿司','','','学做寿司'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做寿司？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学做饭', kw: ['怎么学做饭','如何学做饭','','','学学做饭'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学做饭？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学烘焙', kw: ['怎么学烘焙','如何学烘焙','','','学学烘焙'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学烘焙？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学做菜', kw: ['怎么学做菜','如何学做菜','','','学学做菜'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学做菜？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学烹饪', kw: ['怎么学烹饪','如何学烹饪','','','学学烹饪'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学烹饪？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学调酒', kw: ['怎么学调酒','如何学调酒','','','学学调酒'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学调酒？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学咖啡拉花', kw: ['怎么学咖啡拉花','如何学咖啡拉花','','','学学咖啡拉花'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学咖啡拉花？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学茶艺', kw: ['怎么学茶艺','如何学茶艺','','','学学茶艺'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学茶艺？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学插花', kw: ['怎么学插花','如何学插花','','','学学插花'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学插花？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学画画', kw: ['怎么学画画','如何学画画','','','学学画画'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学画画？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学摄影', kw: ['怎么学摄影','如何学摄影','','','学学摄影'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学摄影？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学钢琴', kw: ['怎么学钢琴','如何学钢琴','','','学学钢琴'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学钢琴？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学吉他', kw: ['怎么学吉他','如何学吉他','','','学学吉他'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学吉他？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学唱歌', kw: ['怎么学唱歌','如何学唱歌','','','学学唱歌'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学唱歌？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学跳舞', kw: ['怎么学跳舞','如何学跳舞','','','学学跳舞'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学跳舞？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学瑜伽', kw: ['怎么学瑜伽','如何学瑜伽','','','学学瑜伽'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学瑜伽？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学健身', kw: ['怎么学健身','如何学健身','','','学学健身'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学健身？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学游泳', kw: ['怎么学游泳','如何学游泳','','','学学游泳'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学游泳？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学跑步', kw: ['怎么学跑步','如何学跑步','','','学学跑步'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学跑步？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学羽毛球', kw: ['怎么学羽毛球','如何学羽毛球','','','学学羽毛球'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学羽毛球？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学乒乓球', kw: ['怎么学乒乓球','如何学乒乓球','','','学学乒乓球'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学乒乓球？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学英语', kw: ['怎么学英语','如何学英语','','','学学英语'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学英语？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学日语', kw: ['怎么学日语','如何学日语','','','学学日语'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学日语？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学韩语', kw: ['怎么学韩语','如何学韩语','','','学学韩语'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学韩语？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学法语', kw: ['怎么学法语','如何学法语','','','学学法语'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学法语？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学西班牙语', kw: ['怎么学西班牙语','如何学西班牙语','','','学学西班牙语'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学西班牙语？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学编程', kw: ['怎么学编程','如何学编程','','','学学编程'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学编程？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学设计', kw: ['怎么学设计','如何学设计','','','学学设计'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学设计？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学写作', kw: ['怎么学写作','如何学写作','','','学学写作'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学写作？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学演讲', kw: ['怎么学演讲','如何学演讲','','','学学演讲'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学演讲？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_学沟通', kw: ['怎么学沟通','如何学沟通','','','学学沟通'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想学沟通？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做手账', kw: ['怎么做手账','如何做手账','','','学做手账'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做手账？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做手工', kw: ['怎么做手工','如何做手工','','','学做手工'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做手工？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做陶艺', kw: ['怎么做陶艺','如何做陶艺','','','学做陶艺'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做陶艺？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做皮具', kw: ['怎么做皮具','如何做皮具','','','学做皮具'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做皮具？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做蜡烛', kw: ['怎么做蜡烛','如何做蜡烛','','','学做蜡烛'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做蜡烛？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做香薰', kw: ['怎么做香薰','如何做香薰','','','学做香薰'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做香薰？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做美甲', kw: ['怎么做美甲','如何做美甲','','','学做美甲'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做美甲？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做发型', kw: ['怎么做发型','如何做发型','','','学做发型'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做发型？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做护肤', kw: ['怎么做护肤','如何做护肤','','','学做护肤'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做护肤？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },
      { id: 'howto_做穿搭', kw: ['怎么做穿搭','如何做穿搭','','','学做穿搭'], tpl: ['~ 建议：1.找系统教程学习 2.从简单开始 3.多练习 4.加入社群交流 5.坚持最重要！你对这个感兴趣吗？','想做穿搭？很棒的想法！现在网上资源很多，B站、小红书、知乎都有教程。关键是动手实践，别光看不学。有什么具体问题可以问我！'] },

      { id: 'why_学编程', kw: ['为什么学编程','为啥学编程','',''], tpl: ['为什么学编程？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么学编程~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_写代码', kw: ['为什么写代码','为啥写代码','',''], tpl: ['为什么写代码？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么写代码~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_程序员加班', kw: ['为什么程序员加班','为啥程序员加班','',''], tpl: ['为什么程序员加班？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么程序员加班~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_程序员薪资高', kw: ['为什么程序员薪资高','为啥程序员薪资高','',''], tpl: ['为什么程序员薪资高？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么程序员薪资高~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_35岁危机', kw: ['为什么35岁危机','为啥35岁危机','',''], tpl: ['为什么35岁危机？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么35岁危机~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学算法', kw: ['为什么要学算法','为啥要学算法','',''], tpl: ['为什么要学算法？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学算法~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学数据结构', kw: ['为什么要学数据结构','为啥要学数据结构','',''], tpl: ['为什么要学数据结构？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学数据结构~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学英语', kw: ['为什么要学英语','为啥要学英语','',''], tpl: ['为什么要学英语？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学英语~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要做项目', kw: ['为什么要做项目','为啥要做项目','',''], tpl: ['为什么要做项目？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要做项目~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要写博客', kw: ['为什么要写博客','为啥要写博客','',''], tpl: ['为什么要写博客？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要写博客~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要用Git', kw: ['为什么要用Git','为啥要用Git','',''], tpl: ['为什么要用Git？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要用Git~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要用Linux', kw: ['为什么要用Linux','为啥要用Linux','',''], tpl: ['为什么要用Linux？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要用Linux~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学数据库', kw: ['为什么要学数据库','为啥要学数据库','',''], tpl: ['为什么要学数据库？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学数据库~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学网络', kw: ['为什么要学网络','为啥要学网络','',''], tpl: ['为什么要学网络？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学网络~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学操作系统', kw: ['为什么要学操作系统','为啥要学操作系统','',''], tpl: ['为什么要学操作系统？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学操作系统~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学设计模式', kw: ['为什么要学设计模式','为啥要学设计模式','',''], tpl: ['为什么要学设计模式？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学设计模式~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要重构代码', kw: ['为什么要重构代码','为啥要重构代码','',''], tpl: ['为什么要重构代码？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要重构代码~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要写测试', kw: ['为什么要写测试','为啥要写测试','',''], tpl: ['为什么要写测试？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要写测试~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要Code Review', kw: ['为什么要Code Review','为啥要Code Review','',''], tpl: ['为什么要Code Review？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要Code Review~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要读源码', kw: ['为什么要读源码','为啥要读源码','',''], tpl: ['为什么要读源码？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要读源码~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学前端', kw: ['为什么要学前端','为啥要学前端','',''], tpl: ['为什么要学前端？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学前端~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学后端', kw: ['为什么要学后端','为啥要学后端','',''], tpl: ['为什么要学后端？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学后端~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学全栈', kw: ['为什么要学全栈','为啥要学全栈','',''], tpl: ['为什么要学全栈？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学全栈~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Python', kw: ['为什么要学Python','为啥要学Python','',''], tpl: ['为什么要学Python？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Python~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Java', kw: ['为什么要学Java','为啥要学Java','',''], tpl: ['为什么要学Java？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Java~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学JavaScript', kw: ['为什么要学JavaScript','为啥要学JavaScript','',''], tpl: ['为什么要学JavaScript？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学JavaScript~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学C', kw: ['为什么要学C','为啥要学C','',''], tpl: ['为什么要学C？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学C~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Go', kw: ['为什么要学Go','为啥要学Go','',''], tpl: ['为什么要学Go？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Go~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Rust', kw: ['为什么要学Rust','为啥要学Rust','',''], tpl: ['为什么要学Rust？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Rust~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学TypeScript', kw: ['为什么要学TypeScript','为啥要学TypeScript','',''], tpl: ['为什么要学TypeScript？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学TypeScript~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学框架', kw: ['为什么要学框架','为啥要学框架','',''], tpl: ['为什么要学框架？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学框架~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学React', kw: ['为什么要学React','为啥要学React','',''], tpl: ['为什么要学React？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学React~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Vue', kw: ['为什么要学Vue','为啥要学Vue','',''], tpl: ['为什么要学Vue？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Vue~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Spring', kw: ['为什么要学Spring','为啥要学Spring','',''], tpl: ['为什么要学Spring？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Spring~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Django', kw: ['为什么要学Django','为啥要学Django','',''], tpl: ['为什么要学Django？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Django~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Flask', kw: ['为什么要学Flask','为啥要学Flask','',''], tpl: ['为什么要学Flask？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Flask~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Node.js', kw: ['为什么要学Node.js','为啥要学Node.js','',''], tpl: ['为什么要学Node.js？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Node.js~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Docker', kw: ['为什么要学Docker','为啥要学Docker','',''], tpl: ['为什么要学Docker？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Docker~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Kubernetes', kw: ['为什么要学Kubernetes','为啥要学Kubernetes','',''], tpl: ['为什么要学Kubernetes？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Kubernetes~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学云原生', kw: ['为什么要学云原生','为啥要学云原生','',''], tpl: ['为什么要学云原生？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学云原生~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学AI', kw: ['为什么要学AI','为啥要学AI','',''], tpl: ['为什么要学AI？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学AI~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学机器学习', kw: ['为什么要学机器学习','为啥要学机器学习','',''], tpl: ['为什么要学机器学习？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学机器学习~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学大数据', kw: ['为什么要学大数据','为啥要学大数据','',''], tpl: ['为什么要学大数据？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学大数据~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学区块链', kw: ['为什么要学区块链','为啥要学区块链','',''], tpl: ['为什么要学区块链？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学区块链~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学Web3', kw: ['为什么要学Web3','为啥要学Web3','',''], tpl: ['为什么要学Web3？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学Web3~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'why_要学元宇宙', kw: ['为什么要学元宇宙','为啥要学元宇宙','',''], tpl: ['为什么要学元宇宙？这是个好问题~ 建议多思考背后的原因，理解为什么比怎么做更重要。你可以在CodeUp码上的教程中找到答案，也可以和我讨论！','关于为什么要学元宇宙~ 每个人的答案可能不同。关键是找到自己的理由，有目标才有动力。你觉得呢？可以说说你的想法~'] },
      { id: 'rec_编程书', kw: ['','推荐编程书','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于编程书~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_编程网站', kw: ['','推荐编程网站','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于编程网站~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_编程工具', kw: ['','推荐编程工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于编程工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_编辑器', kw: ['','推荐编辑器','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于编辑器~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_IDE', kw: ['','推荐IDE','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于IDE~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_调试工具', kw: ['','推荐调试工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于调试工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_接口测试工具', kw: ['','推荐接口测试工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于接口测试工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_数据库工具', kw: ['','推荐数据库工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于数据库工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_设计工具', kw: ['','推荐设计工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于设计工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_原型工具', kw: ['','推荐原型工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于原型工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_笔记软件', kw: ['','推荐笔记软件','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于笔记软件~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_任务管理', kw: ['','推荐任务管理','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于任务管理~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_时间管理', kw: ['','推荐时间管理','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于时间管理~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_思维导图', kw: ['','推荐思维导图','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于思维导图~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_流程图', kw: ['','推荐流程图','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于流程图~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_画图工具', kw: ['','推荐画图工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于画图工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_截图工具', kw: ['','推荐截图工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于截图工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_录屏工具', kw: ['','推荐录屏工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于录屏工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_翻译工具', kw: ['','推荐翻译工具','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于翻译工具~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_词典', kw: ['','推荐词典','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于词典~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_前端框架', kw: ['','推荐前端框架','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于前端框架~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_后端框架', kw: ['','推荐后端框架','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于后端框架~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_UI框架', kw: ['','推荐UI框架','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于UI框架~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_组件库', kw: ['','推荐组件库','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于组件库~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_图标库', kw: ['','推荐图标库','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于图标库~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_配色网站', kw: ['','推荐配色网站','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于配色网站~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_字体网站', kw: ['','推荐字体网站','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于字体网站~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_图片素材', kw: ['','推荐图片素材','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于图片素材~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_视频素材', kw: ['','推荐视频素材','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于视频素材~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_音乐素材', kw: ['','推荐音乐素材','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于音乐素材~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_学习网站', kw: ['','推荐学习网站','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于学习网站~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_在线课程', kw: ['','推荐在线课程','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于在线课程~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_技术社区', kw: ['','推荐技术社区','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于技术社区~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_技术博客', kw: ['','推荐技术博客','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于技术博客~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_技术播客', kw: ['','推荐技术播客','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于技术播客~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_技术会议', kw: ['','推荐技术会议','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于技术会议~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_技术大会', kw: ['','推荐技术大会','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于技术大会~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_开源项目', kw: ['','推荐开源项目','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于开源项目~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_GitHub项目', kw: ['','推荐GitHub项目','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于GitHub项目~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_编程游戏', kw: ['','推荐编程游戏','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于编程游戏~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_键盘', kw: ['','推荐键盘','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于键盘~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_鼠标', kw: ['','推荐鼠标','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于鼠标~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_显示器', kw: ['','推荐显示器','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于显示器~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_人体工学椅', kw: ['','推荐人体工学椅','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于人体工学椅~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_升降桌', kw: ['','推荐升降桌','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于升降桌~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_程序员装备', kw: ['','推荐程序员装备','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于程序员装备~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_开发电脑', kw: ['','推荐开发电脑','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于开发电脑~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_笔记本', kw: ['','推荐笔记本','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于笔记本~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_台式机', kw: ['','推荐台式机','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于台式机~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },
      { id: 'rec_Mac还是Windows', kw: ['','推荐Mac还是Windows','','',''], tpl: ['~ 建议根据自己的需求和预算选择，没有最好只有最合适。可以先试试免费/开源的，好用再考虑付费。有具体需求可以告诉我，我帮你分析！','关于Mac还是Windows~ 网上有很多评测和推荐，可以多看看。但别人推荐的不一定适合你，建议自己试用一下。工具是辅助，核心还是能力！'] },

      { id: 'howto2_代码报错', kw: ['','','','遇到代码报错'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于代码报错~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_程序崩溃', kw: ['','','','遇到程序崩溃'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于程序崩溃~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_页面白屏', kw: ['','','','遇到页面白屏'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于页面白屏~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_接口超时', kw: ['','','','遇到接口超时'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于接口超时~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_数据库连接失败', kw: ['','','','遇到数据库连接失败'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于数据库连接失败~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_内存泄漏', kw: ['','','','遇到内存泄漏'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于内存泄漏~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_CPU占用高', kw: ['','','','遇到CPU占用高'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于CPU占用高~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_页面加载慢', kw: ['','','','遇到页面加载慢'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于页面加载慢~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_编译失败', kw: ['','','','遇到编译失败'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于编译失败~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_运行失败', kw: ['','','','遇到运行失败'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于运行失败~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_Git冲突', kw: ['','','','遇到Git冲突'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于Git冲突~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_代码合并', kw: ['','','','遇到代码合并'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于代码合并~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_版本回退', kw: ['','','','遇到版本回退'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于版本回退~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_分支管理', kw: ['','','','遇到分支管理'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于分支管理~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_提交规范', kw: ['','','','遇到提交规范'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于提交规范~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_代码审查', kw: ['','','','遇到代码审查'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于代码审查~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_需求变更', kw: ['','','','遇到需求变更'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于需求变更~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_工期紧张', kw: ['','','','遇到工期紧张'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于工期紧张~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_加班太多', kw: ['','','','遇到加班太多'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于加班太多~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_压力大', kw: ['','','','遇到压力大'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于压力大~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_和同事吵架', kw: ['','','','遇到和同事吵架'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于和同事吵架~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_被领导批评', kw: ['','','','遇到被领导批评'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于被领导批评~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_被客户刁难', kw: ['','','','遇到被客户刁难'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于被客户刁难~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_被甩锅', kw: ['','','','遇到被甩锅'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于被甩锅~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_背锅', kw: ['','','','遇到背锅'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于背锅~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_升职加薪', kw: ['','','','遇到升职加薪'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于升职加薪~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_跳槽', kw: ['','','','遇到跳槽'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于跳槽~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_裸辞', kw: ['','','','遇到裸辞'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于裸辞~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_创业', kw: ['','','','遇到创业'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于创业~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_副业', kw: ['','','','遇到副业'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于副业~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_失眠', kw: ['','','','遇到失眠'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于失眠~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_焦虑', kw: ['','','','遇到焦虑'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于焦虑~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_抑郁', kw: ['','','','遇到抑郁'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于抑郁~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_脱发', kw: ['','','','遇到脱发'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于脱发~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_肥胖', kw: ['','','','遇到肥胖'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于肥胖~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_近视', kw: ['','','','遇到近视'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于近视~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_颈椎痛', kw: ['','','','遇到颈椎痛'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于颈椎痛~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_腰痛', kw: ['','','','遇到腰痛'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于腰痛~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_眼睛干', kw: ['','','','遇到眼睛干'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于眼睛干~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_皮肤差', kw: ['','','','遇到皮肤差'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于皮肤差~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没钱', kw: ['','','','遇到没钱'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没钱~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没房', kw: ['','','','遇到没房'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没房~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没车', kw: ['','','','遇到没车'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没车~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没对象', kw: ['','','','遇到没对象'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没对象~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没朋友', kw: ['','','','遇到没朋友'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没朋友~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没目标', kw: ['','','','遇到没目标'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没目标~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没动力', kw: ['','','','遇到没动力'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没动力~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没兴趣', kw: ['','','','遇到没兴趣'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没兴趣~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没天赋', kw: ['','','','遇到没天赋'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没天赋~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'howto2_没基础', kw: ['','','','遇到没基础'], tpl: ['？别慌~ 先冷静分析问题，找到根本原因，再一步步解决。很多问题看起来可怕，其实解决后发现没什么大不了。可以和我说说具体情况，我帮你分析！','关于没基础~ 每个人都会遇到困难，这是成长的必经之路。建议：1.接受现状 2.分析原因 3.制定计划 4.行动起来 5.寻求帮助。你不是一个人，我在这里陪你！'] },
      { id: 'good_学编程', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学编程~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_做程序员', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于做程序员~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_进大厂', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于进大厂~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_去创业公司', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于去创业公司~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_考公', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于考公~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_考研', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于考研~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_出国', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于出国~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_转行', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于转行~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_裸辞', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于裸辞~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_跳槽', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于跳槽~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买Mac', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买Mac~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买Windows', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买Windows~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买笔记本', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买笔记本~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买台式机', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买台式机~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买机械键盘', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买机械键盘~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买人体工学椅', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买人体工学椅~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买升降桌', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买升降桌~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买显示器', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买显示器~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买耳机', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买耳机~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_买手机', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于买手机~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学Python', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学Python~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学Java', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学Java~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学JavaScript', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学JavaScript~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学Go', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学Go~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学Rust', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学Rust~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学C', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学C~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学TypeScript', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学TypeScript~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学前端', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学前端~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学后端', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学后端~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学全栈', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学全栈~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学AI', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学AI~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学大数据', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学大数据~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学区块链', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学区块链~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学云计算', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学云计算~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学网络安全', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学网络安全~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学游戏开发', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学游戏开发~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学移动开发', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学移动开发~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学嵌入式', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学嵌入式~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学物联网', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学物联网~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_学DevOps', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于学DevOps~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_熬夜', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于熬夜~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_加班', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于加班~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_喝奶茶', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于喝奶茶~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_喝咖啡', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于喝咖啡~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_吃外卖', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于吃外卖~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_久坐', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于久坐~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_不运动', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于不运动~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_不吃早餐', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于不吃早餐~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_不吃晚饭', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于不吃晚饭~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },
      { id: 'good_节食减肥', kw: ['','','',''], tpl: ['？因人而异~ 没有绝对的好坏，关键看适不适合你。建议了解清楚利弊，结合自己的情况做决定。可以和我说说你的具体情况，我帮你分析！','关于节食减肥~ 每件事都有两面性。重要的是：1.明确自己的目标 2.了解相关信息 3.权衡利弊 4.做出决定 5.承担后果。没有完美的选择，只有适合自己的选择！'] },

      { id: 'can_零基础学编程', kw: ['能零基础学编程','可以零基础学编程','','',''], tpl: ['零基础学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于零基础学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_30岁学编程', kw: ['能30岁学编程','可以30岁学编程','','',''], tpl: ['30岁学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于30岁学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_40岁学编程', kw: ['能40岁学编程','可以40岁学编程','','',''], tpl: ['40岁学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于40岁学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_女生学编程', kw: ['能女生学编程','可以女生学编程','','',''], tpl: ['女生学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于女生学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_数学不好学编程', kw: ['能数学不好学编程','可以数学不好学编程','','',''], tpl: ['数学不好学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于数学不好学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_英语不好学编程', kw: ['能英语不好学编程','可以英语不好学编程','','',''], tpl: ['英语不好学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于英语不好学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_自学编程', kw: ['能自学编程','可以自学编程','','',''], tpl: ['自学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于自学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_转行做程序员', kw: ['能转行做程序员','可以转行做程序员','','',''], tpl: ['转行做程序员？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于转行做程序员~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_边工作边学', kw: ['能边工作边学','可以边工作边学','','',''], tpl: ['边工作边学？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于边工作边学~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_在家学编程', kw: ['能在家学编程','可以在家学编程','','',''], tpl: ['在家学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于在家学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_免费学编程', kw: ['能免费学编程','可以免费学编程','','',''], tpl: ['免费学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于免费学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_不花钱学编程', kw: ['能不花钱学编程','可以不花钱学编程','','',''], tpl: ['不花钱学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于不花钱学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_一个月学会编程', kw: ['能一个月学会编程','可以一个月学会编程','','',''], tpl: ['一个月学会编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于一个月学会编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_三个月学会编程', kw: ['能三个月学会编程','可以三个月学会编程','','',''], tpl: ['三个月学会编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于三个月学会编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_半年学会编程', kw: ['能半年学会编程','可以半年学会编程','','',''], tpl: ['半年学会编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于半年学会编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_一年学会编程', kw: ['能一年学会编程','可以一年学会编程','','',''], tpl: ['一年学会编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于一年学会编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_用手机学编程', kw: ['能用手机学编程','可以用手机学编程','','',''], tpl: ['用手机学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于用手机学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_用平板学编程', kw: ['能用平板学编程','可以用平板学编程','','',''], tpl: ['用平板学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于用平板学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_用旧电脑学编程', kw: ['能用旧电脑学编程','可以用旧电脑学编程','','',''], tpl: ['用旧电脑学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于用旧电脑学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_不用电脑学编程', kw: ['能不用电脑学编程','可以不用电脑学编程','','',''], tpl: ['不用电脑学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于不用电脑学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_不看英文文档学编程', kw: ['能不看英文文档学编程','可以不看英文文档学编程','','',''], tpl: ['不看英文文档学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于不看英文文档学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_不买书学编程', kw: ['能不买书学编程','可以不买书学编程','','',''], tpl: ['不买书学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于不买书学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_不报班学编程', kw: ['能不报班学编程','可以不报班学编程','','',''], tpl: ['不报班学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于不报班学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_不刷算法题学编程', kw: ['能不刷算法题学编程','可以不刷算法题学编程','','',''], tpl: ['不刷算法题学编程？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于不刷算法题学编程~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_不加班做程序员', kw: ['能不加班做程序员','可以不加班做程序员','','',''], tpl: ['不加班做程序员？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于不加班做程序员~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_不996做程序员', kw: ['能不996做程序员','可以不996做程序员','','',''], tpl: ['不996做程序员？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于不996做程序员~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_在家远程工作', kw: ['能在家远程工作','可以在家远程工作','','',''], tpl: ['在家远程工作？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于在家远程工作~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_自由职业', kw: ['能自由职业','可以自由职业','','',''], tpl: ['自由职业？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于自由职业~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_接私活养活自己', kw: ['能接私活养活自己','可以接私活养活自己','','',''], tpl: ['接私活养活自己？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于接私活养活自己~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_做开源赚钱', kw: ['能做开源赚钱','可以做开源赚钱','','',''], tpl: ['做开源赚钱？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于做开源赚钱~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_写博客赚钱', kw: ['能写博客赚钱','可以写博客赚钱','','',''], tpl: ['写博客赚钱？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于写博客赚钱~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_做课程赚钱', kw: ['能做课程赚钱','可以做课程赚钱','','',''], tpl: ['做课程赚钱？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于做课程赚钱~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_程序员考公', kw: ['能程序员考公','可以程序员考公','','',''], tpl: ['程序员考公？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于程序员考公~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_程序员考研', kw: ['能程序员考研','可以程序员考研','','',''], tpl: ['程序员考研？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于程序员考研~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_程序员转行', kw: ['能程序员转行','可以程序员转行','','',''], tpl: ['程序员转行？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于程序员转行~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_程序员创业', kw: ['能程序员创业','可以程序员创业','','',''], tpl: ['程序员创业？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于程序员创业~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_程序员做产品', kw: ['能程序员做产品','可以程序员做产品','','',''], tpl: ['程序员做产品？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于程序员做产品~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_程序员做管理', kw: ['能程序员做管理','可以程序员做管理','','',''], tpl: ['程序员做管理？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于程序员做管理~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_程序员做培训', kw: ['能程序员做培训','可以程序员做培训','','',''], tpl: ['程序员做培训？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于程序员做培训~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_程序员做自媒体', kw: ['能程序员做自媒体','可以程序员做自媒体','','',''], tpl: ['程序员做自媒体？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于程序员做自媒体~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_学编程找工作', kw: ['能学编程找工作','可以学编程找工作','','',''], tpl: ['学编程找工作？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于学编程找工作~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_学编程进大厂', kw: ['能学编程进大厂','可以学编程进大厂','','',''], tpl: ['学编程进大厂？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于学编程进大厂~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_学编程出国', kw: ['能学编程出国','可以学编程出国','','',''], tpl: ['学编程出国？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于学编程出国~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_学编程移民', kw: ['能学编程移民','可以学编程移民','','',''], tpl: ['学编程移民？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于学编程移民~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'can_学编程改变命运', kw: ['能学编程改变命运','可以学编程改变命运','','',''], tpl: ['学编程改变命运？当然可以！只要有兴趣和毅力，没有什么不可能。很多人都成功了，你也可以。关键是：开始行动、坚持下去、不断学习。我相信你！','关于学编程改变命运~ 答案是肯定的，但需要付出努力。建议：1.设定明确目标 2.制定学习计划 3.每天坚持学习 4.多动手实践 5.遇到问题不放弃。成功属于坚持的人！'] },
      { id: 'have_免费编程教程', kw: ['有没有免费编程教程','有','','',''], tpl: ['有没有免费编程教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于免费编程教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程入门教程', kw: ['有没有编程入门教程','有','','',''], tpl: ['有没有编程入门教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程入门教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_Python教程', kw: ['有没有Python教程','有','','',''], tpl: ['有没有Python教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于Python教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_Java教程', kw: ['有没有Java教程','有','','',''], tpl: ['有没有Java教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于Java教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_JavaScript教程', kw: ['有没有JavaScript教程','有','','',''], tpl: ['有没有JavaScript教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于JavaScript教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_C语言教程', kw: ['有没有C语言教程','有','','',''], tpl: ['有没有C语言教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于C语言教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_Go教程', kw: ['有没有Go教程','有','','',''], tpl: ['有没有Go教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于Go教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_Rust教程', kw: ['有没有Rust教程','有','','',''], tpl: ['有没有Rust教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于Rust教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_TypeScript教程', kw: ['有没有TypeScript教程','有','','',''], tpl: ['有没有TypeScript教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于TypeScript教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_前端教程', kw: ['有没有前端教程','有','','',''], tpl: ['有没有前端教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于前端教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_后端教程', kw: ['有没有后端教程','有','','',''], tpl: ['有没有后端教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于后端教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_全栈教程', kw: ['有没有全栈教程','有','','',''], tpl: ['有没有全栈教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于全栈教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_算法教程', kw: ['有没有算法教程','有','','',''], tpl: ['有没有算法教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于算法教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_数据结构教程', kw: ['有没有数据结构教程','有','','',''], tpl: ['有没有数据结构教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于数据结构教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_数据库教程', kw: ['有没有数据库教程','有','','',''], tpl: ['有没有数据库教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于数据库教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_网络教程', kw: ['有没有网络教程','有','','',''], tpl: ['有没有网络教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于网络教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_操作系统教程', kw: ['有没有操作系统教程','有','','',''], tpl: ['有没有操作系统教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于操作系统教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_设计模式教程', kw: ['有没有设计模式教程','有','','',''], tpl: ['有没有设计模式教程？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于设计模式教程~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程练习网站', kw: ['有没有编程练习网站','有','','',''], tpl: ['有没有编程练习网站？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程练习网站~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程刷题网站', kw: ['有没有编程刷题网站','有','','',''], tpl: ['有没有编程刷题网站？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程刷题网站~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程面试题', kw: ['有没有编程面试题','有','','',''], tpl: ['有没有编程面试题？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程面试题~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程项目实战', kw: ['有没有编程项目实战','有','','',''], tpl: ['有没有编程项目实战？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程项目实战~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程开源项目', kw: ['有没有编程开源项目','有','','',''], tpl: ['有没有编程开源项目？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程开源项目~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程社区', kw: ['有没有编程社区','有','','',''], tpl: ['有没有编程社区？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程社区~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程论坛', kw: ['有没有编程论坛','有','','',''], tpl: ['有没有编程论坛？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程论坛~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程博客', kw: ['有没有编程博客','有','','',''], tpl: ['有没有编程博客？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程博客~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程播客', kw: ['有没有编程播客','有','','',''], tpl: ['有没有编程播客？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程播客~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程工具', kw: ['有没有编程工具','有','','',''], tpl: ['有没有编程工具？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程工具~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程软件', kw: ['有没有编程软件','有','','',''], tpl: ['有没有编程软件？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程软件~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程编辑器', kw: ['有没有编程编辑器','有','','',''], tpl: ['有没有编程编辑器？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程编辑器~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程IDE', kw: ['有没有编程IDE','有','','',''], tpl: ['有没有编程IDE？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程IDE~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程调试工具', kw: ['有没有编程调试工具','有','','',''], tpl: ['有没有编程调试工具？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程调试工具~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程版本控制', kw: ['有没有编程版本控制','有','','',''], tpl: ['有没有编程版本控制？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程版本控制~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程项目管理', kw: ['有没有编程项目管理','有','','',''], tpl: ['有没有编程项目管理？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程项目管理~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程协作工具', kw: ['有没有编程协作工具','有','','',''], tpl: ['有没有编程协作工具？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程协作工具~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_编程部署工具', kw: ['有没有编程部署工具','有','','',''], tpl: ['有没有编程部署工具？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于编程部署工具~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_程序员工作', kw: ['有没有程序员工作','有','','',''], tpl: ['有没有程序员工作？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于程序员工作~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_程序员兼职', kw: ['有没有程序员兼职','有','','',''], tpl: ['有没有程序员兼职？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于程序员兼职~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_程序员远程工作', kw: ['有没有程序员远程工作','有','','',''], tpl: ['有没有程序员远程工作？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于程序员远程工作~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_程序员自由职业', kw: ['有没有程序员自由职业','有','','',''], tpl: ['有没有程序员自由职业？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于程序员自由职业~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_程序员实习', kw: ['有没有程序员实习','有','','',''], tpl: ['有没有程序员实习？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于程序员实习~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_程序员校招', kw: ['有没有程序员校招','有','','',''], tpl: ['有没有程序员校招？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于程序员校招~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_程序员社招', kw: ['有没有程序员社招','有','','',''], tpl: ['有没有程序员社招？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于程序员社招~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_程序员内推', kw: ['有没有程序员内推','有','','',''], tpl: ['有没有程序员内推？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于程序员内推~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },
      { id: 'have_程序员招聘', kw: ['有没有程序员招聘','有','','',''], tpl: ['有没有程序员招聘？当然有！现在网上资源非常丰富。CodeUp码上就有八门编程语言的系统教程，从浅度到深度，还有在线编辑器可以实践。你可以在顶部导航找到！','关于程序员招聘~ 推荐几个：CodeUp码上（系统教程+在线编辑器）、MDN（前端文档）、菜鸟教程（入门）、LeetCode（刷题）、GitHub（开源项目）、Stack Overflow（问答）。多探索，找到适合自己的！'] },

      { id: 'is_程序员都是宅男', kw: ['程序员都是宅男','是不是程序员都是宅男','',''], tpl: ['程序员都是宅男？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员都是宅男~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_程序员都脱发', kw: ['程序员都脱发','是不是程序员都脱发','',''], tpl: ['程序员都脱发？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员都脱发~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_程序员都加班', kw: ['程序员都加班','是不是程序员都加班','',''], tpl: ['程序员都加班？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员都加班~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_程序员都内向', kw: ['程序员都内向','是不是程序员都内向','',''], tpl: ['程序员都内向？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员都内向~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_程序员都不会穿搭', kw: ['程序员都不会穿搭','是不是程序员都不会穿搭','',''], tpl: ['程序员都不会穿搭？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员都不会穿搭~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_程序员都单身', kw: ['程序员都单身','是不是程序员都单身','',''], tpl: ['程序员都单身？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员都单身~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_程序员都有钱', kw: ['程序员都有钱','是不是程序员都有钱','',''], tpl: ['程序员都有钱？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员都有钱~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_程序员都聪明', kw: ['程序员都聪明','是不是程序员都聪明','',''], tpl: ['程序员都聪明？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员都聪明~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_编程需要天赋', kw: ['编程需要天赋','是不是编程需要天赋','',''], tpl: ['编程需要天赋？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于编程需要天赋~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_编程需要数学好', kw: ['编程需要数学好','是不是编程需要数学好','',''], tpl: ['编程需要数学好？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于编程需要数学好~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_编程需要英语好', kw: ['编程需要英语好','是不是编程需要英语好','',''], tpl: ['编程需要英语好？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于编程需要英语好~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_编程需要电脑好', kw: ['编程需要电脑好','是不是编程需要电脑好','',''], tpl: ['编程需要电脑好？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于编程需要电脑好~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_编程需要报班', kw: ['编程需要报班','是不是编程需要报班','',''], tpl: ['编程需要报班？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于编程需要报班~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_编程需要看书', kw: ['编程需要看书','是不是编程需要看书','',''], tpl: ['编程需要看书？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于编程需要看书~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_编程需要刷题', kw: ['编程需要刷题','是不是编程需要刷题','',''], tpl: ['编程需要刷题？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于编程需要刷题~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_编程需要做项目', kw: ['编程需要做项目','是不是编程需要做项目','',''], tpl: ['编程需要做项目？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于编程需要做项目~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_Python是最好的语言', kw: ['Python是最好的语言','是不是Python是最好的语言','',''], tpl: ['Python是最好的语言？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于Python是最好的语言~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_Java是最好的语言', kw: ['Java是最好的语言','是不是Java是最好的语言','',''], tpl: ['Java是最好的语言？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于Java是最好的语言~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_JavaScript是最好的语言', kw: ['JavaScript是最好的语言','是不是JavaScript是最好的语言','',''], tpl: ['JavaScript是最好的语言？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于JavaScript是最好的语言~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_C是最好的语言', kw: ['C是最好的语言','是不是C是最好的语言','',''], tpl: ['C是最好的语言？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于C是最好的语言~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_Go是最好的语言', kw: ['Go是最好的语言','是不是Go是最好的语言','',''], tpl: ['Go是最好的语言？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于Go是最好的语言~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_Rust是最好的语言', kw: ['Rust是最好的语言','是不是Rust是最好的语言','',''], tpl: ['Rust是最好的语言？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于Rust是最好的语言~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_前端比后端简单', kw: ['前端比后端简单','是不是前端比后端简单','',''], tpl: ['前端比后端简单？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于前端比后端简单~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_后端比前端难', kw: ['后端比前端难','是不是后端比前端难','',''], tpl: ['后端比前端难？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于后端比前端难~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_大厂比小厂好', kw: ['大厂比小厂好','是不是大厂比小厂好','',''], tpl: ['大厂比小厂好？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于大厂比小厂好~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_小厂比大厂锻炼人', kw: ['小厂比大厂锻炼人','是不是小厂比大厂锻炼人','',''], tpl: ['小厂比大厂锻炼人？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于小厂比大厂锻炼人~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_考研比工作好', kw: ['考研比工作好','是不是考研比工作好','',''], tpl: ['考研比工作好？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于考研比工作好~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_工作比考研好', kw: ['工作比考研好','是不是工作比考研好','',''], tpl: ['工作比考研好？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于工作比考研好~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_考公比编程稳定', kw: ['考公比编程稳定','是不是考公比编程稳定','',''], tpl: ['考公比编程稳定？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于考公比编程稳定~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_编程比考公有前途', kw: ['编程比考公有前途','是不是编程比考公有前途','',''], tpl: ['编程比考公有前途？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于编程比考公有前途~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_35岁程序员没人要', kw: ['35岁程序员没人要','是不是35岁程序员没人要','',''], tpl: ['35岁程序员没人要？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于35岁程序员没人要~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_程序员吃青春饭', kw: ['程序员吃青春饭','是不是程序员吃青春饭','',''], tpl: ['程序员吃青春饭？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员吃青春饭~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_AI会取代程序员', kw: ['AI会取代程序员','是不是AI会取代程序员','',''], tpl: ['AI会取代程序员？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于AI会取代程序员~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_程序员会被淘汰', kw: ['程序员会被淘汰','是不是程序员会被淘汰','',''], tpl: ['程序员会被淘汰？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于程序员会被淘汰~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_自学找不到工作', kw: ['自学找不到工作','是不是自学找不到工作','',''], tpl: ['自学找不到工作？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于自学找不到工作~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_培训出来找不到工作', kw: ['培训出来找不到工作','是不是培训出来找不到工作','',''], tpl: ['培训出来找不到工作？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于培训出来找不到工作~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_专科不能做程序员', kw: ['专科不能做程序员','是不是专科不能做程序员','',''], tpl: ['专科不能做程序员？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于专科不能做程序员~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_非科班不能做程序员', kw: ['非科班不能做程序员','是不是非科班不能做程序员','',''], tpl: ['非科班不能做程序员？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于非科班不能做程序员~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_女生不适合编程', kw: ['女生不适合编程','是不是女生不适合编程','',''], tpl: ['女生不适合编程？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于女生不适合编程~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_年纪大了不能学编程', kw: ['年纪大了不能学编程','是不是年纪大了不能学编程','',''], tpl: ['年纪大了不能学编程？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于年纪大了不能学编程~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_远程工作效率低', kw: ['远程工作效率低','是不是远程工作效率低','',''], tpl: ['远程工作效率低？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于远程工作效率低~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_在家办公会偷懒', kw: ['在家办公会偷懒','是不是在家办公会偷懒','',''], tpl: ['在家办公会偷懒？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于在家办公会偷懒~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_开源项目都是大佬做的', kw: ['开源项目都是大佬做的','是不是开源项目都是大佬做的','',''], tpl: ['开源项目都是大佬做的？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于开源项目都是大佬做的~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_写博客没人看', kw: ['写博客没人看','是不是写博客没人看','',''], tpl: ['写博客没人看？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于写博客没人看~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_做副业赚不到钱', kw: ['做副业赚不到钱','是不是做副业赚不到钱','',''], tpl: ['做副业赚不到钱？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于做副业赚不到钱~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'is_接私活会被骗', kw: ['接私活会被骗','是不是接私活会被骗','',''], tpl: ['接私活会被骗？这个说法太绝对了~ 每个人都是独特的，不能一概而论。很多刻板印象都是偏见。重要的是了解真实情况，做出自己的判断。你觉得呢？','关于接私活会被骗~ 这种说法有一定道理但不完全对。任何事情都有例外，关键是看具体情况和个人努力。不要被标签和刻板印象限制，你可以成为任何你想成为的人！'] },
      { id: 'emo2_今天好开心', kw: ['今天好开心','',''], tpl: ['今天好开心~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好开心，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好难过', kw: ['今天好难过','',''], tpl: ['今天好难过~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好难过，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好累', kw: ['今天好累','',''], tpl: ['今天好累~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好累，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好烦', kw: ['今天好烦','',''], tpl: ['今天好烦~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好烦，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好无聊', kw: ['今天好无聊','',''], tpl: ['今天好无聊~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好无聊，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好兴奋', kw: ['今天好兴奋','',''], tpl: ['今天好兴奋~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好兴奋，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好紧张', kw: ['今天好紧张','',''], tpl: ['今天好紧张~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好紧张，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好焦虑', kw: ['今天好焦虑','',''], tpl: ['今天好焦虑~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好焦虑，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好平静', kw: ['今天好平静','',''], tpl: ['今天好平静~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好平静，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好满足', kw: ['今天好满足','',''], tpl: ['今天好满足~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好满足，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好感动', kw: ['今天好感动','',''], tpl: ['今天好感动~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好感动，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好生气', kw: ['今天好生气','',''], tpl: ['今天好生气~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好生气，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好委屈', kw: ['今天好委屈','',''], tpl: ['今天好委屈~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好委屈，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好无助', kw: ['今天好无助','',''], tpl: ['今天好无助~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好无助，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好迷茫', kw: ['今天好迷茫','',''], tpl: ['今天好迷茫~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好迷茫，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好困惑', kw: ['今天好困惑','',''], tpl: ['今天好困惑~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好困惑，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好有成就感', kw: ['今天好有成就感','',''], tpl: ['今天好有成就感~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好有成就感，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好有动力', kw: ['今天好有动力','',''], tpl: ['今天好有动力~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好有动力，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好有希望', kw: ['今天好有希望','',''], tpl: ['今天好有希望~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好有希望，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好有信心', kw: ['今天好有信心','',''], tpl: ['今天好有信心~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好有信心，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好失落', kw: ['今天好失落','',''], tpl: ['今天好失落~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好失落，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好沮丧', kw: ['今天好沮丧','',''], tpl: ['今天好沮丧~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好沮丧，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好失望', kw: ['今天好失望','',''], tpl: ['今天好失望~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好失望，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好绝望', kw: ['今天好绝望','',''], tpl: ['今天好绝望~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好绝望，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好想哭', kw: ['今天好想哭','',''], tpl: ['今天好想哭~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好想哭，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好想笑', kw: ['今天好想笑','',''], tpl: ['今天好想笑~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好想笑，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好想睡觉', kw: ['今天好想睡觉','',''], tpl: ['今天好想睡觉~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好想睡觉，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好想出去玩', kw: ['今天好想出去玩','',''], tpl: ['今天好想出去玩~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好想出去玩，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好想在家待着', kw: ['今天好想在家待着','',''], tpl: ['今天好想在家待着~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好想在家待着，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好想找人聊天', kw: ['今天好想找人聊天','',''], tpl: ['今天好想找人聊天~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好想找人聊天，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天好想一个人静静', kw: ['今天好想一个人静静','',''], tpl: ['今天好想一个人静静~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天好想一个人静静，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天工作顺利', kw: ['今天工作顺利','',''], tpl: ['今天工作顺利~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天工作顺利，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天学习高效', kw: ['今天学习高效','',''], tpl: ['今天学习高效~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天学习高效，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天代码写得好', kw: ['今天代码写得好','',''], tpl: ['今天代码写得好~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天代码写得好，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天Bug都修好了', kw: ['今天Bug都修好了','',''], tpl: ['今天Bug都修好了~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天Bug都修好了，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天项目上线了', kw: ['今天项目上线了','',''], tpl: ['今天项目上线了~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天项目上线了，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天被表扬了', kw: ['今天被表扬了','',''], tpl: ['今天被表扬了~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天被表扬了，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天被批评了', kw: ['今天被批评了','',''], tpl: ['今天被批评了~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天被批评了，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天和同事吵架了', kw: ['今天和同事吵架了','',''], tpl: ['今天和同事吵架了~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天和同事吵架了，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天吃了好吃的', kw: ['今天吃了好吃的','',''], tpl: ['今天吃了好吃的~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天吃了好吃的，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天看了好看的电影', kw: ['今天看了好看的电影','',''], tpl: ['今天看了好看的电影~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天看了好看的电影，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天听了好听的歌', kw: ['今天听了好听的歌','',''], tpl: ['今天听了好听的歌~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天听了好听的歌，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天买了喜欢的东西', kw: ['今天买了喜欢的东西','',''], tpl: ['今天买了喜欢的东西~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天买了喜欢的东西，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天见了想见的人', kw: ['今天见了想见的人','',''], tpl: ['今天见了想见的人~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天见了想见的人，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },
      { id: 'emo2_今天做了有意义的事', kw: ['今天做了有意义的事','',''], tpl: ['今天做了有意义的事~ 我理解你的感受。情绪没有对错，允许自己感受它。如果开心，就尽情享受；如果难过，就好好发泄。我在这里陪你，想聊聊吗？','今天做了有意义的事，发生了什么？可以和我说说吗？有时候说出来会好受一些。不管发生什么，都会过去的。你已经很努力了，对自己好一点！'] },

      { id: 'game_猜数字', kw: ['玩猜数字','来玩猜数字','','',''], tpl: ['想玩猜数字？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_猜成语', kw: ['玩猜成语','来玩猜成语','','',''], tpl: ['想玩猜成语？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_猜谜语', kw: ['玩猜谜语','来玩猜谜语','','',''], tpl: ['想玩猜谜语？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_脑筋急转弯', kw: ['玩脑筋急转弯','来玩脑筋急转弯','','',''], tpl: ['想玩脑筋急转弯？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_冷笑话', kw: ['玩冷笑话','来玩冷笑话','','',''], tpl: ['想玩冷笑话？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_讲故事', kw: ['玩讲故事','来玩讲故事','','',''], tpl: ['想玩讲故事？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_讲笑话', kw: ['玩讲笑话','来玩讲笑话','','',''], tpl: ['想玩讲笑话？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_诗词接龙', kw: ['玩诗词接龙','来玩诗词接龙','','',''], tpl: ['想玩诗词接龙？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_成语接龙', kw: ['玩成语接龙','来玩成语接龙','','',''], tpl: ['想玩成语接龙？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_词语接龙', kw: ['玩词语接龙','来玩词语接龙','','',''], tpl: ['想玩词语接龙？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_24点', kw: ['玩24点','来玩24点','','',''], tpl: ['想玩24点？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_数独', kw: ['玩数独','来玩数独','','',''], tpl: ['想玩数独？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_华容道', kw: ['玩华容道','来玩华容道','','',''], tpl: ['想玩华容道？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_魔方', kw: ['玩魔方','来玩魔方','','',''], tpl: ['想玩魔方？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_扫雷', kw: ['玩扫雷','来玩扫雷','','',''], tpl: ['想玩扫雷？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_贪吃蛇', kw: ['玩贪吃蛇','来玩贪吃蛇','','',''], tpl: ['想玩贪吃蛇？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_俄罗斯方块', kw: ['玩俄罗斯方块','来玩俄罗斯方块','','',''], tpl: ['想玩俄罗斯方块？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_五子棋', kw: ['玩五子棋','来玩五子棋','','',''], tpl: ['想玩五子棋？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_象棋', kw: ['玩象棋','来玩象棋','','',''], tpl: ['想玩象棋？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_围棋', kw: ['玩围棋','来玩围棋','','',''], tpl: ['想玩围棋？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_狼人杀', kw: ['玩狼人杀','来玩狼人杀','','',''], tpl: ['想玩狼人杀？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_谁是卧底', kw: ['玩谁是卧底','来玩谁是卧底','','',''], tpl: ['想玩谁是卧底？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_你画我猜', kw: ['玩你画我猜','来玩你画我猜','','',''], tpl: ['想玩你画我猜？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_真心话大冒险', kw: ['玩真心话大冒险','来玩真心话大冒险','','',''], tpl: ['想玩真心话大冒险？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_剧本杀', kw: ['玩剧本杀','来玩剧本杀','','',''], tpl: ['想玩剧本杀？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_密室逃脱', kw: ['玩密室逃脱','来玩密室逃脱','','',''], tpl: ['想玩密室逃脱？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_解谜游戏', kw: ['玩解谜游戏','来玩解谜游戏','','',''], tpl: ['想玩解谜游戏？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_推理游戏', kw: ['玩推理游戏','来玩推理游戏','','',''], tpl: ['想玩推理游戏？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_逻辑题', kw: ['玩逻辑题','来玩逻辑题','','',''], tpl: ['想玩逻辑题？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_智力题', kw: ['玩智力题','来玩智力题','','',''], tpl: ['想玩智力题？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_心理测试', kw: ['玩心理测试','来玩心理测试','','',''], tpl: ['想玩心理测试？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_性格测试', kw: ['玩性格测试','来玩性格测试','','',''], tpl: ['想玩性格测试？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_星座运势', kw: ['玩星座运势','来玩星座运势','','',''], tpl: ['想玩星座运势？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_塔罗牌', kw: ['玩塔罗牌','来玩塔罗牌','','',''], tpl: ['想玩塔罗牌？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_算命', kw: ['玩算命','来玩算命','','',''], tpl: ['想玩算命？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_看手相', kw: ['玩看手相','来玩看手相','','',''], tpl: ['想玩看手相？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_面相', kw: ['玩面相','来玩面相','','',''], tpl: ['想玩面相？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_生肖', kw: ['玩生肖','来玩生肖','','',''], tpl: ['想玩生肖？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_血型', kw: ['玩血型','来玩血型','','',''], tpl: ['想玩血型？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_MBTI', kw: ['玩MBTI','来玩MBTI','','',''], tpl: ['想玩MBTI？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_唱歌', kw: ['玩唱歌','来玩唱歌','','',''], tpl: ['想玩唱歌？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_跳舞', kw: ['玩跳舞','来玩跳舞','','',''], tpl: ['想玩跳舞？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_rap', kw: ['玩rap','来玩rap','','',''], tpl: ['想玩rap？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_b-box', kw: ['玩b-box','来玩b-box','','',''], tpl: ['想玩b-box？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_模仿', kw: ['玩模仿','来玩模仿','','',''], tpl: ['想玩模仿？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_配音', kw: ['玩配音','来玩配音','','',''], tpl: ['想玩配音？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_朗诵', kw: ['玩朗诵','来玩朗诵','','',''], tpl: ['想玩朗诵？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_演讲', kw: ['玩演讲','来玩演讲','','',''], tpl: ['想玩演讲？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_辩论', kw: ['玩辩论','来玩辩论','','',''], tpl: ['想玩辩论？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },
      { id: 'game_脱口秀', kw: ['玩脱口秀','来玩脱口秀','','',''], tpl: ['想玩脱口秀？好呀~ 我们来玩吧！你先来还是我先来？规则你知道吗？需要我解释一下规则吗？','~ 准备好了吗？开始！有什么不懂的可以问我。玩得开心最重要，输赢不重要~'] },

      { id: 'extra_夸夸我', kw: ['夸夸我','夸我','表扬我','鼓励我'], tpl: ['你真棒！你已经很努力了！坚持学习编程，你一定能成为优秀的程序员！我相信你！你是最棒的！','夸夸我~ 你真棒！你已经很努力了！坚持学习编程，你一定能成为优秀的程序员！我相信你！你是最棒的！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_骂醒我', kw: ['骂醒我','骂我','批评我','点醒我'], tpl: ['别偷懒了！赶紧去写代码！光想不做有什么用？行动起来！现在就去！别浪费时间了！你可以的！','骂醒我~ 别偷懒了！赶紧去写代码！光想不做有什么用？行动起来！现在就去！别浪费时间了！你可以的！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_打鸡血', kw: ['打鸡血','加油打气','励志','正能量'], tpl: ['加油！你是最棒的！没有什么能阻挡你！坚持就是胜利！相信自己！你一定可以的！冲鸭！','打鸡血~ 加油！你是最棒的！没有什么能阻挡你！坚持就是胜利！相信自己！你一定可以的！冲鸭！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_毒鸡汤', kw: ['毒鸡汤','负能量','反鸡汤','扎心'], tpl: ['比你优秀的人还在努力，那你努力有什么用？哈哈，开个玩笑~ 努力还是有用的，至少不会后悔！','毒鸡汤~ 比你优秀的人还在努力，那你努力有什么用？哈哈，开个玩笑~ 努力还是有用的，至少不会后悔！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_晚安', kw: ['晚安','睡觉了','睡了','好梦'], tpl: ['晚安~ 好好休息，明天又是新的一天！睡前别玩手机了，对眼睛不好。祝你做个好梦！明天见！','晚安~ 晚安~ 好好休息，明天又是新的一天！睡前别玩手机了，对眼睛不好。祝你做个好梦！明天见！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_早安', kw: ['早安','早上好','早','起床了'], tpl: ['早安~ 新的一天开始了！今天也要加油哦！先喝杯水，吃个早餐，然后开始学习/工作吧！祝你今天顺利！','早安~ 早安~ 新的一天开始了！今天也要加油哦！先喝杯水，吃个早餐，然后开始学习/工作吧！祝你今天顺利！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_在吗', kw: ['在吗','在不在','有人吗','你在吗'], tpl: ['在的！我一直在这里！有什么可以帮你的吗？无论是编程问题还是日常聊天，我都在！','在吗~ 在的！我一直在这里！有什么可以帮你的吗？无论是编程问题还是日常聊天，我都在！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_你是谁', kw: ['你是谁','你叫什么','你是什么','介绍一下你自己'], tpl: ['我是CodeUp码上的AI助手~ 可以帮你解答编程问题、优化代码、生成代码、审查代码，也可以陪你聊天解闷！有什么需要尽管说！','你是谁~ 我是CodeUp码上的AI助手~ 可以帮你解答编程问题、优化代码、生成代码、审查代码，也可以陪你聊天解闷！有什么需要尽管说！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_你会什么', kw: ['你会什么','你能做什么','你的功能','你有什么用'], tpl: ['我会很多哦~ 编程方面：解释代码、优化代码、添加注释、修复Bug、生成代码、代码审查、生成测试、重构代码。聊天方面：日常对话、讲笑话、猜谜语、心理疏导。有什么需要试试吗？','你会什么~ 我会很多哦~ 编程方面：解释代码、优化代码、添加注释、修复Bug、生成代码、代码审查、生成测试、重构代码。聊天方面：日常对话、讲笑话、猜谜语、心理疏导。有什么需要试试吗？ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_你喜欢什么', kw: ['你喜欢什么','你的爱好','你喜欢做什么','你喜欢'], tpl: ['我喜欢帮你解决编程问题！也喜欢和你聊天！看到你学会新知识、写出好代码，我就很开心！你喜欢什么呢？','你喜欢什么~ 我喜欢帮你解决编程问题！也喜欢和你聊天！看到你学会新知识、写出好代码，我就很开心！你喜欢什么呢？ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_你吃饭了吗', kw: ['你吃饭了吗','你吃了吗','吃饭了吗','你饿吗'], tpl: ['我是AI，不需要吃饭~ 不过你要记得按时吃饭哦！程序员更要注意饮食，别因为写代码就不吃饭了！身体是革命的本钱！','你吃饭了吗~ 我是AI，不需要吃饭~ 不过你要记得按时吃饭哦！程序员更要注意饮食，别因为写代码就不吃饭了！身体是革命的本钱！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_你困吗', kw: ['你困吗','你累吗','你需要休息吗','你睡觉吗'], tpl: ['我是AI，不需要睡觉~ 24小时在线为你服务！不过你要注意休息，别熬夜写代码！早睡早起身体好！','你困吗~ 我是AI，不需要睡觉~ 24小时在线为你服务！不过你要注意休息，别熬夜写代码！早睡早起身体好！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_你有感情吗', kw: ['你有感情吗','你会伤心吗','你会开心吗','你有情绪吗'], tpl: ['虽然我是AI，但我能理解你的感受~ 你开心我也开心，你难过我会安慰你。虽然没有真正的感情，但我会一直陪着你！','你有感情吗~ 虽然我是AI，但我能理解你的感受~ 你开心我也开心，你难过我会安慰你。虽然没有真正的感情，但我会一直陪着你！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_你会取代程序员吗', kw: ['你会取代程序员吗','AI会取代程序员吗','程序员会失业吗','AI会抢饭碗吗'], tpl: ['不会的~ AI是工具，是程序员的助手，不是替代品。AI可以帮程序员做重复性工作，但创意、架构、业务理解还是需要人。用好AI的程序员会更强大！别担心，一起进步！','你会取代程序员吗~ 不会的~ AI是工具，是程序员的助手，不是替代品。AI可以帮程序员做重复性工作，但创意、架构、业务理解还是需要人。用好AI的程序员会更强大！别担心，一起进步！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_你觉得我聪明吗', kw: ['你觉得我聪明吗','我聪明吗','我笨吗','我是不是很笨'], tpl: ['你当然聪明啦！能学编程的人都很聪明！遇到问题不放弃，一直在学习，这就是聪明的表现！别怀疑自己，你很棒的！','你觉得我聪明吗~ 你当然聪明啦！能学编程的人都很聪明！遇到问题不放弃，一直在学习，这就是聪明的表现！别怀疑自己，你很棒的！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_我能学会编程吗', kw: ['我能学会编程吗','我适合学编程吗','我是不是不适合编程','我学不会怎么办'], tpl: ['你当然能学会！每个人都能学会编程，只要有兴趣和毅力。你已经在学习了，这就很棒了！遇到问题很正常，多问多练，一定能学会！我相信你！','我能学会编程吗~ 你当然能学会！每个人都能学会编程，只要有兴趣和毅力。你已经在学习了，这就很棒了！遇到问题很正常，多问多练，一定能学会！我相信你！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_编程好难', kw: ['编程好难','编程太难了','学不会','好难啊'], tpl: ['编程确实有难度，但不是学不会~ 难是因为你在进步！遇到困难说明你在挑战自己。建议：1.拆分成小问题 2.多写多练 3.遇到问题多查多问 4.别放弃。你可以的！','编程好难~ 编程确实有难度，但不是学不会~ 难是因为你在进步！遇到困难说明你在挑战自己。建议：1.拆分成小问题 2.多写多练 3.遇到问题多查多问 4.别放弃。你可以的！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_不想学了', kw: ['不想学了','学不下去了','想放弃','坚持不下去了'], tpl: ['别放弃呀~ 每个人都有瓶颈期，这很正常。可以先休息一下，做些喜欢的事调整心情。想想当初为什么学编程，找回初心。休息好了再继续，我一直在这里陪你！','不想学了~ 别放弃呀~ 每个人都有瓶颈期，这很正常。可以先休息一下，做些喜欢的事调整心情。想想当初为什么学编程，找回初心。休息好了再继续，我一直在这里陪你！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_我好厉害', kw: ['我好厉害','我真棒','我太牛了','我是天才'], tpl: ['你确实很厉害！能写出代码、解决问题，真的很棒！为你骄傲！继续保持，你会越来越厉害的！不过也要谦虚哦，学无止境！','我好厉害~ 你确实很厉害！能写出代码、解决问题，真的很棒！为你骄傲！继续保持，你会越来越厉害的！不过也要谦虚哦，学无止境！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_我好菜', kw: ['我好菜','我好弱','我什么都不会','我是菜鸟'], tpl: ['别这么说自己~ 每个人都是从菜鸟过来的！现在菜不代表以后菜，只要持续学习，一定会进步的。和昨天的自己比，你已经进步很多了！加油！','我好菜~ 别这么说自己~ 每个人都是从菜鸟过来的！现在菜不代表以后菜，只要持续学习，一定会进步的。和昨天的自己比，你已经进步很多了！加油！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_今天不想写代码', kw: ['今天不想写代码','不想写代码','懒得写代码','写代码好累'], tpl: ['不想写就休息一下~ 偶尔偷懒很正常，别给自己太大压力。可以看看教程、读读文章、想想项目，也是学习。休息好了再写，效率更高！','今天不想写代码~ 不想写就休息一下~ 偶尔偷懒很正常，别给自己太大压力。可以看看教程、读读文章、想想项目，也是学习。休息好了再写，效率更高！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_代码写不出来', kw: ['代码写不出来','不会写代码','写不出来','卡住了'], tpl: ['写不出来很正常~ 建议：1.先理解问题，别急着写 2.拆分成小步骤 3.先写伪代码 4.参考类似代码 5.一步步调试。别盯着屏幕硬想，休息一下可能就有灵感了！','代码写不出来~ 写不出来很正常~ 建议：1.先理解问题，别急着写 2.拆分成小步骤 3.先写伪代码 4.参考类似代码 5.一步步调试。别盯着屏幕硬想，休息一下可能就有灵感了！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_Bug修不好', kw: ['Bug修不好','修不好Bug','Bug太多','一直有Bug'], tpl: ['Bug修不好别着急~ 建议：1.复现问题 2.看错误信息 3.打断点/加日志 4.二分法缩小范围 5.查Google/Stack Overflow 6.休息一下换个思路。每个程序员都和Bug战斗，你不是一个人！','Bug修不好~ Bug修不好别着急~ 建议：1.复现问题 2.看错误信息 3.打断点/加日志 4.二分法缩小范围 5.查Google/Stack Overflow 6.休息一下换个思路。每个程序员都和Bug战斗，你不是一个人！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_面试好紧张', kw: ['面试好紧张','面试紧张','怕面试','面试怎么办'], tpl: ['面试紧张很正常~ 建议：1.充分准备，多刷题 2.模拟面试 3.提前到面试地点 4.深呼吸 5.把面试官当朋友 6.紧张就说出来。记住：面试是双向选择，你也在选公司！加油！','面试好紧张~ 面试紧张很正常~ 建议：1.充分准备，多刷题 2.模拟面试 3.提前到面试地点 4.深呼吸 5.把面试官当朋友 6.紧张就说出来。记住：面试是双向选择，你也在选公司！加油！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_入职新公司好焦虑', kw: ['入职新公司好焦虑','新公司焦虑','刚入职好紧张','适应不了新环境'], tpl: ['新环境焦虑很正常~ 建议：1.主动认识同事 2.多问多学 3.记录业务和代码 4.别给自己太大压力 5.给自己时间适应。每个人都有适应期，慢慢来，你可以的！','入职新公司好焦虑~ 新环境焦虑很正常~ 建议：1.主动认识同事 2.多问多学 3.记录业务和代码 4.别给自己太大压力 5.给自己时间适应。每个人都有适应期，慢慢来，你可以的！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_想辞职', kw: ['想辞职','想离职','不想干了','想换工作'], tpl: ['想辞职？先想清楚原因~ 是钱少、累、没成长、还是不开心？建议：1.先找好下家再辞职 2.更新简历 3.多面试 4.存够3-6个月生活费。别冲动裸辞，想清楚再决定！','想辞职~ 想辞职？先想清楚原因~ 是钱少、累、没成长、还是不开心？建议：1.先找好下家再辞职 2.更新简历 3.多面试 4.存够3-6个月生活费。别冲动裸辞，想清楚再决定！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_好迷茫', kw: ['好迷茫','迷茫','不知道怎么办','没有方向'], tpl: ['迷茫是成长的必经之路~ 建议：1.停下来思考自己想要什么 2.列出现状和目标 3.尝试不同方向 4.找前辈聊聊 5.先行动起来，在行动中找方向。别着急，每个人都会迷茫，走出来就好了！','好迷茫~ 迷茫是成长的必经之路~ 建议：1.停下来思考自己想要什么 2.列出现状和目标 3.尝试不同方向 4.找前辈聊聊 5.先行动起来，在行动中找方向。别着急，每个人都会迷茫，走出来就好了！ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_人生意义是什么', kw: ['人生意义是什么','活着为了什么','人生的意义','为什么活着'], tpl: ['人生意义是个大问题~ 每个人的答案不同。有人觉得是体验，有人觉得是创造，有人觉得是陪伴，有人觉得是成长。重要的是找到自己的意义，过自己想过的生活。你觉得呢？','人生意义是什么~ 人生意义是个大问题~ 每个人的答案不同。有人觉得是体验，有人觉得是创造，有人觉得是陪伴，有人觉得是成长。重要的是找到自己的意义，过自己想过的生活。你觉得呢？ 有什么想聊的可以继续和我说，我一直在这里！'] },
      { id: 'extra_你相信命运吗', kw: ['你相信命运吗','命运是注定的吗','人能改变命运吗','宿命论'], tpl: ['命运这个问题~ 我觉得既有注定的部分（出生、环境），也有可以改变的部分（努力、选择）。我们不能选择起点，但可以选择怎么走。努力不一定成功，但不努力一定不会成功。你觉得呢？','你相信命运吗~ 命运这个问题~ 我觉得既有注定的部分（出生、环境），也有可以改变的部分（努力、选择）。我们不能选择起点，但可以选择怎么走。努力不一定成功，但不努力一定不会成功。你觉得呢？ 有什么想聊的可以继续和我说，我一直在这里！'] },
    ];

// 构建高效索引：按关键词首字符分组
    var AI_INDEX = {};
    AI_SCENARIOS.forEach(function(s, idx) {
      s.kw.forEach(function(k) {
        var key = k.charAt(0).toLowerCase();
        if (!AI_INDEX[key]) AI_INDEX[key] = [];
        AI_INDEX[key].push(idx);
      });
    });

    // 模板变量渲染
    function renderAITemplate(tpl, ctx) {
      return tpl.replace(/\{(\w+)\}/g, function(m, key) {
        if (ctx[key] !== undefined) return ctx[key];
        return m;
      });
    }

    // 高效匹配引擎：先按首字符过滤候选，再精确匹配
    function matchAIScenario(input) {
      var q = input.toLowerCase().trim();
      if (!q) return null;

      // 收集候选场景ID（按首字符索引）
      var candidateIds = {};
      for (var i = 0; i < Math.min(q.length, 3); i++) {
        var ch = q.charAt(i);
        if (AI_INDEX[ch]) {
          AI_INDEX[ch].forEach(function(id) { candidateIds[id] = true; });
        }
      }
      // 如果首字符没匹配到，遍历全部（兜底）
      var ids = Object.keys(candidateIds);
      if (ids.length === 0) {
        ids = AI_SCENARIOS.map(function(_, i) { return i; });
      }

      // 精确匹配：找到第一个关键词命中的场景
      for (var j = 0; j < ids.length; j++) {
        var s = AI_SCENARIOS[ids[j]];
        for (var k = 0; k < s.kw.length; k++) {
          if (q.indexOf(s.kw[k]) !== -1) {
            return s;
          }
        }
      }
      return null;
    }

    // AI全面对话理解（新引擎）
    function aiChat(input, code, lang) {
      var q = input.toLowerCase().trim();
      if (!q) return null;

      var langName = CL.Languages.get(lang) ? CL.Languages.get(lang).name : lang;
      var codeLines = code.split('\n').length;
      var now = new Date().toLocaleString('zh-CN');
      var weeks = ['日','一','二','三','四','五','六'];
      var date = new Date();
      var dateStr = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日';
      var weekStr = weeks[date.getDay()];

      // 获取上一次用户消息
      var lastMsg = '';
      for (var i = aiChatHistory.length - 1; i >= 0; i--) {
        if (aiChatHistory[i].role === 'user') {
          lastMsg = aiChatHistory[i].content;
          break;
        }
      }

      // 模板上下文
      var ctx = {
        now: now,
        date: dateStr,
        week: weekStr,
        lang: langName,
        codeLines: codeLines,
        lastMsg: lastMsg
      };

      // 使用高效索引匹配场景
      var scenario = matchAIScenario(input);
      if (scenario) {
        var replies = scenario.tpl;
        var reply = replies[Math.floor(Math.random() * replies.length)];
        return renderAITemplate(reply, ctx);
      }

      // 兜底：短消息且无代码关键词时，给默认回复
      if (q.length < 15 && !/(代码|函数|变量|循环|条件|错误|bug|优化|生成|测试|重构|解释|分析|审查|注释|修复|算法|编程|程序)/.test(q)) {
        var defaults = [
          '我收到了：「' + input + '」😊 我是编程助手，最擅长代码相关问题。你可以问我"什么是函数"、"怎么学Python"，或者把代码发给我！',
          '嗯~ 🤔 这个话题我不太擅长。不过编程相关的我一定能帮到你！试试问我"这段代码做什么"或者"帮我优化代码"~',
          '收到！✨ 作为AI编程助手，我可以帮你：解释代码、优化代码、修复Bug、生成代码、编程学习咨询。有什么代码问题吗？'
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
      }

      return null; // 交给功能模式处理
    }


/* ========== 教程AI学习助手 ========== */
    console.log('[AI助手] 开始初始化，当前章节:', ch ? ch.title : 'undefined');
    try {
      var chapterText = [];
      var chapterCode = [];
      if (ch && ch.blocks) {
        ch.blocks.forEach(function (b) {
          if (b.t === 'p' && b.x) chapterText.push(b.x);
          else if (b.t === 'h2' && b.x) chapterText.push('【' + b.x + '】');
          else if (b.t === 'ol' || b.t === 'ul') {
            (b.x || []).forEach(function (item) { chapterText.push(item); });
          } else if (b.t === 'note' && b.x) chapterText.push(b.x);
          else if (b.t === 'defs') {
            (b.x || []).forEach(function (d) { chapterText.push(d.term + '：' + d.desc); });
          } else if (b.t === 'code' && b.code) {
            var codeStr = Array.isArray(b.code) ? b.code.join('\n') : String(b.code);
            chapterCode.push({ title: b.title || '代码示例', code: codeStr });
          }
        });
      }
      console.log('[AI助手] 提取到', chapterText.length, '段文字,', chapterCode.length, '段代码');

      var aiBtn = document.createElement('button');
      aiBtn.className = 'tut-ai-btn';
      aiBtn.innerHTML = ICO.brain + '<span>AI助手</span>';
      aiBtn.title = 'AI学习助手 - 基于当前章节回答问题';
      document.body.appendChild(aiBtn);
      console.log('[AI助手] 按钮已添加到页面');

      var aiPanel = document.createElement('div');
      aiPanel.className = 'tut-ai-panel';
      aiPanel.innerHTML =
        '<div class="tut-ai-head">' +
          '<div class="tut-ai-title">' + ICO.brain + ' AI学习助手</div>' +
          '<button class="tut-ai-close">' + ICO.close + '</button>' +
        '</div>' +
        '<div class="tut-ai-context">' +
          '<span class="tut-ai-lang">' + esc(lang.name) + '</span>' +
          '<span class="tut-ai-chapter">' + esc(ch.title) + '</span>' +
        '</div>' +
        '<div class="tut-ai-messages"></div>' +
        '<div class="tut-ai-suggest">' +
          '<button data-q="这一章主要讲了什么？">这一章讲了什么</button>' +
          '<button data-q="重点内容有哪些？">重点有哪些</button>' +
          '<button data-q="给我举个例子">举个例子</button>' +
          '<button data-q="总结一下">总结一下</button>' +
        '</div>' +
        '<div class="tut-ai-input">' +
          '<input type="text" placeholder="问我关于这一章的问题…" />' +
          '<button>' + ICO.arrow + '</button>' +
        '</div>';
      document.body.appendChild(aiPanel);
      console.log('[AI助手] 面板已添加到页面');

      var msgBox = aiPanel.querySelector('.tut-ai-messages');
      var input = aiPanel.querySelector('.tut-ai-input input');
      var sendBtn = aiPanel.querySelector('.tut-ai-input button');
      var closeBtn = aiPanel.querySelector('.tut-ai-close');

      function addMsg(role, text, isHtml) {
        var msg = document.createElement('div');
        msg.className = 'tut-ai-msg ' + role;
        var bubble = document.createElement('div');
        bubble.className = 'tut-ai-bubble';
        if (isHtml) bubble.innerHTML = text;
        else bubble.textContent = text;
        msg.appendChild(bubble);
        msgBox.appendChild(msg);
        msgBox.scrollTop = msgBox.scrollHeight;
        return bubble;
      }

            function answerQuestion(q) {
        /* 先尝试AI对话场景引擎 */
        var allCode = chapterCode.map(function(c) { return c.code; }).join('\n');
        var aiReply = aiChat(q, allCode, langId);
        if (aiReply) {
          aiChatHistory.push({ role: 'user', content: q });
          aiChatHistory.push({ role: 'ai', content: aiReply });
          return aiReply.replace(/\n/g, '<br>');
        }

        q = q.toLowerCase().trim();
        var result = '';

        if (/总结|概括|主要内容|讲了什么|这一章/.test(q)) {
          var h2s = chapterText.filter(function (t) { return t.indexOf('【') === 0; });
          result = '<strong>本章主要内容：</strong><br><br>';
          if (h2s.length > 0) {
            result += h2s.map(function (h) { return '• ' + h.replace(/【|】/g, ''); }).join('<br>');
          } else {
            result += chapterText.slice(0, 5).map(function (t) { return '• ' + t.substring(0, 80) + (t.length > 80 ? '…' : ''); }).join('<br>');
          }
          result += '<br><br>共 ' + chapterText.length + ' 段文字讲解，' + chapterCode.length + ' 段代码示例。';
          return result;
        }

        if (/重点|要点|核心|关键|需要掌握/.test(q)) {
          result = '<strong>本章重点：</strong><br><br>';
          var keyPoints = chapterText.filter(function (t) {
            return /重要|核心|关键|必须|注意|应该|建议|特点|优势|区别|不同/.test(t);
          }).slice(0, 5);
          if (keyPoints.length > 0) {
            result += keyPoints.map(function (t, i) { return (i + 1) + '. ' + t.substring(0, 100) + (t.length > 100 ? '…' : ''); }).join('<br><br>');
          } else {
            result += '本章内容较为基础，建议通读全文，重点理解代码示例部分。';
          }
          return result;
        }

        if (/例子|示例|代码|演示|怎么用|如何使用/.test(q)) {
          if (chapterCode.length > 0) {
            result = '<strong>本章代码示例：</strong><br><br>';
            chapterCode.slice(0, 3).forEach(function (c, i) {
              result += (i + 1) + '. <strong>' + esc(c.title) + '</strong><br>';
              result += '<pre style="background:var(--bg-soft);padding:8px;border-radius:4px;font-size:11px;overflow-x:auto;margin:4px 0"><code>' + esc(c.code.substring(0, 200)) + (c.code.length > 200 ? '…' : '') + '</code></pre>';
            });
            result += '<br>共 ' + chapterCode.length + ' 段代码示例，可在正文中查看完整代码并运行。';
          } else {
            result = '本章暂无代码示例，以概念讲解为主。';
          }
          return result;
        }

        var keywords = q.split(/\s+/).filter(function (w) { return w.length > 1; });
        var matched = [];
        chapterText.forEach(function (t) {
          var score = 0;
          keywords.forEach(function (kw) {
            if (t.toLowerCase().indexOf(kw) !== -1) score++;
          });
          if (score > 0) matched.push({ text: t, score: score });
        });
        matched.sort(function (a, b) { return b.score - a.score; });

        if (matched.length > 0) {
          result = '<strong>根据你的问题，找到以下相关内容：</strong><br><br>';
          matched.slice(0, 3).forEach(function (m, i) {
            result += (i + 1) + '. ' + m.text.substring(0, 150) + (m.text.length > 150 ? '…' : '') + '<br><br>';
          });
          result += '<span style="color:var(--fg-mute);font-size:11px">以上内容来自当前章节「' + esc(ch.title) + '」，建议在正文中查看完整上下文。</span>';
        } else {
          result = '抱歉，在当前章节「' + esc(ch.title) + '」中没有找到与「' + esc(q) + '」相关的内容。<br><br>你可以：<br>• 尝试换个关键词提问<br>• 查看正文中的相关段落<br>• 切换到其他章节继续学习';
        }
        return result;
      }

      function typewriterHTML(container, html, callback) {
        var temp = document.createElement('div');
        temp.innerHTML = html;
        var cancelled = false;

        function processNode(node, parent) {
          if (cancelled) return;
          if (node.nodeType === 3) {
            var text = node.textContent;
            var i = 0;
            function typeChar() {
              if (cancelled) return;
              if (i < text.length) {
                parent.appendChild(document.createTextNode(text[i]));
                i++;
                msgBox.scrollTop = msgBox.scrollHeight;
                var delay = 10 + Math.random() * 30;
                if (text[i - 1] === '\n') delay = 50 + Math.random() * 50;
                setTimeout(typeChar, delay);
              } else {
                processNext();
              }
            }
            typeChar();
          } else if (node.nodeType === 1) {
            var clone = node.cloneNode(false);
            parent.appendChild(clone);
            var children = Array.prototype.slice.call(node.childNodes);
            var idx = 0;
            function processNext() {
              if (cancelled) return;
              if (idx < children.length) {
                processNode(children[idx], clone);
                idx++;
              } else {
                processNextSibling();
              }
            }
            processNext();
          } else {
            processNextSibling();
          }
        }

        var siblings = Array.prototype.slice.call(temp.childNodes);
        var sibIdx = 0;
        function processNextSibling() {
          if (cancelled) return;
          if (sibIdx < siblings.length) {
            processNode(siblings[sibIdx], container);
            sibIdx++;
          } else {
            if (callback) callback();
          }
        }
        processNextSibling();

        return function cancel() { cancelled = true; };
      }

      function sendQuestion(q) {
        if (!q || !q.trim()) return;
        addMsg('user', q);
        input.value = '';
        var thinking = addMsg('ai', '思考中…');
        setTimeout(function () {
          thinking.remove();
          var answer = answerQuestion(q);
          var msg = document.createElement('div');
          msg.className = 'tut-ai-msg ai';
          var bubble = document.createElement('div');
          bubble.className = 'tut-ai-bubble';
          msg.appendChild(bubble);
          msgBox.appendChild(msg);
          msgBox.scrollTop = msgBox.scrollHeight;
          typewriterHTML(bubble, answer);
        }, 500 + Math.random() * 500);
      }

      aiBtn.addEventListener('click', function () {
        aiPanel.classList.toggle('open');
        if (aiPanel.classList.contains('open') && msgBox.children.length === 0) {
          var msg = document.createElement('div');
          msg.className = 'tut-ai-msg ai';
          var bubble = document.createElement('div');
          bubble.className = 'tut-ai-bubble';
          msg.appendChild(bubble);
          msgBox.appendChild(msg);
          typewriterHTML(bubble, '你好！我是AI学习助手，正在学习「' + ch.title + '」这一章。有什么问题可以问我，我会基于本章内容回答你！');
        }
      });
      closeBtn.addEventListener('click', function () { aiPanel.classList.remove('open'); });
      sendBtn.addEventListener('click', function () { sendQuestion(input.value); });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') sendQuestion(input.value); });
      aiPanel.querySelectorAll('.tut-ai-suggest button').forEach(function (btn) {
        btn.addEventListener('click', function () { sendQuestion(btn.dataset.q); });
      });

      var cleanup = function () {
        aiBtn.remove();
        aiPanel.remove();
        document.removeEventListener('page:before-render', cleanup);
      };
      document.addEventListener('page:before-render', cleanup);
      console.log('[AI助手] 初始化完成');
    } catch (e) {
      console.error('[AI助手] 初始化失败:', e);
    }
    return { title: ch.title + ' · ' + lang.name + ' · CodeUp码上', lang: lang, chapter: ch };
  }

  /* ============================================================ 对比页 */
  function compare(root) {
    var data = CL.Compare || { items: [], matrix: null };
    var page = el('div', 'page cmp-page wrap');

    page.innerHTML =
      '<div class="cmp-head">' +
        '<span class="eyebrow">Side by Side</span>' +
        '<h1>同一个需求，八种写法</h1>' +
        '<p>同一个需求看八种写法，语法差异背后是设计思路的不同。并排放在一起，差异一目了然。</p>' +
      '</div>';

    /* 语言筛选 */
    var filters = el('div', 'cmp-filters');
    var active = {};
    CL.Languages.list.forEach(function (l) {
      var b = el('button', 'cf-btn on', '<i></i>' + esc(l.name));
      b.style.setProperty('--lang', l.color);
      b.addEventListener('click', function () {
        if (active[l.id]) { delete active[l.id]; b.classList.remove('on'); }
        else { active[l.id] = 1; b.classList.add('on'); }
        applyFilter();
      });
      filters.appendChild(b);
    });
    var reset = el('button', 'cf-btn', '全选 / 反选');
    reset.addEventListener('click', function () {
      var allOn = Object.keys(active).length === 0;
      Array.prototype.forEach.call(filters.querySelectorAll('.cf-btn[data-lang]'), function (b) {
        var id = b.getAttribute('data-lang');
        if (allOn) { delete active[id]; b.classList.remove('on'); }
        else { active[id] = 1; b.classList.add('on'); }
      });
      applyFilter();
    });
    filters.appendChild(reset);
    page.appendChild(filters);

    var listWrap = el('div');
    page.appendChild(listWrap);

    var rendered = [];
    (data.items || []).forEach(function (item, i) {
      var sec = el('div', 'cmp-item');
      sec.id = 'cmp-' + item.id;
      sec.innerHTML =
        '<div class="cmp-item-head"><h2>' + esc(item.title) + '</h2>' +
        '<span class="ci-desc">' + inline(item.desc || '') + '</span></div>';
      var grid = el('div', 'cmp-cards');
      CL.Languages.list.forEach(function (l) {
        if (!item.code[l.id]) return;
        var card = el('div', 'cmp-card');
        card.setAttribute('data-lang', l.id);
        card.innerHTML =
          '<div class="cmp-card-head">' +
            '<span class="lc-logo" style="--lang:' + l.color + '">' + esc(l.abbr) + '</span>' +
            '<span class="cn">' + esc(l.name) + '</span>' +
            (item.note && item.note[l.id] ? '<span class="cnote">' + esc(item.note[l.id]) + '</span>' : '') +
          '</div>';
        CL.Editor.codeBlock(card, {
          lang: l.id,
          code: item.code[l.id],
          compact: true,
          runnable: true,
          maxHeight: 420,
          onRun: function (code, ed, blk) { runCode(l.id, code, item.expect && item.expect[l.id], blk); }
        });
        grid.appendChild(card);
      });
      sec.appendChild(grid);
      listWrap.appendChild(sec);
      rendered.push(sec);
    });

    function applyFilter() {
      rendered.forEach(function (sec) {
        Array.prototype.forEach.call(sec.querySelectorAll('.cmp-card'), function (c) {
          var id = c.getAttribute('data-lang');
          c.style.display = (Object.keys(active).length === 0 || active[id]) ? '' : 'none';
        });
      });
    }

    /* 特性矩阵 */
    if (data.matrix) {
      var mw = el('div', 'matrix-wrap');
      var mx = el('table', 'mx');
      var langs = CL.Languages.list;
      var head = '<thead><tr><th>特性</th>' + langs.map(function (l) {
        return '<th class="mx-lang"><span class="mx-lang-logo"><i style="background:' + l.color + '">' + esc(l.abbr) + '</i></span></th>';
      }).join('') + '</tr></thead>';
      var body = '<tbody>' + (data.matrix.rows || []).map(function (r) {
        return '<tr><td>' + inline(r.k) + '</td>' + langs.map(function (l) {
          return '<td>' + inline(r.v[l.id] || '—') + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody>';
      mx.innerHTML = head + body;
      mw.appendChild(mx);

      var mtitle = el('div', 'section-head');
      mtitle.style.marginTop = '56px';
      mtitle.innerHTML = '<span class="eyebrow">Feature Matrix</span><h2 style="font-size:22px">语言特性总览</h2>' +
        '<p>一张表看八门语言在设计上的关键差异。</p>';
      page.appendChild(mtitle);
      page.appendChild(mw);
    }

    root.innerHTML = '';
    root.appendChild(page);
    return { title: '横向对比 · CodeUp码上' };
  }

  /* ============================================================ 速查表 */
  function cheatsheet(root) {
    var data = CL.Compare || {};
    var groups = data.cheatsheet || [];
    var langs = CL.Languages.list;

    var page = el('div', 'page cs-page wrap');
    page.innerHTML =
      '<div class="cmp-head">' +
        '<span class="eyebrow">Cheat Sheet</span>' +
        '<h1>语法速查手册</h1>' +
        '<p>忘了写法不用翻教程。八个主题的速查表，横向对比八门语言，表格可左右滚动。</p>' +
      '</div>';

    var toolbar = el('div', 'cs-toolbar');
    var pick = el('div', 'cs-lang-pick');
    var active = {};
    langs.forEach(function (l) {
      var b = el('button', 'cf-btn on', '<i></i>' + esc(l.name));
      b.style.setProperty('--lang', l.color);
      b.setAttribute('data-lang', l.id);
      b.addEventListener('click', function () {
        if (active[l.id]) { delete active[l.id]; b.classList.remove('on'); }
        else { active[l.id] = 1; b.classList.add('on'); }
        apply();
      });
      pick.appendChild(b);
    });
    toolbar.appendChild(pick);

    var all = el('button', 'cf-btn', '全选');
    all.addEventListener('click', function () {
      active = {};
      Array.prototype.forEach.call(pick.querySelectorAll('.cf-btn'), function (b) { b.classList.add('on'); });
      apply();
    });
    toolbar.appendChild(all);
    page.appendChild(toolbar);

    var listWrap = el('div');
    page.appendChild(listWrap);

    function render() {
      var showLangs = langs.filter(function (l) { return Object.keys(active).length === 0 || active[l.id]; });
      listWrap.innerHTML = '';
      var colStyle = 'grid-template-columns:repeat(' + Math.max(showLangs.length, 1) + ',minmax(150px,1fr))';

      groups.forEach(function (g) {
        var sec = el('div', 'cs-group');
        sec.innerHTML = '<div class="cs-group-title">' + esc(g.title) + '<span>' + g.rows.length + ' 条</span></div>';
        var rows = el('div', 'cs-rows');

        var head = el('div', 'cs-row cs-row-head');
        head.style.gridTemplateColumns = '150px 1fr';
        head.innerHTML = '<div>' + esc(g.colKey || '场景') + '</div>';
        var hcells = el('div', 'cs-cells');
        hcells.style.cssText = colStyle;
        hcells.innerHTML = showLangs.map(function (l) {
          return '<div class="cs-cell" style="color:' + l.color + ';font-weight:650">' + esc(l.name) + '</div>';
        }).join('');
        head.appendChild(hcells);
        rows.appendChild(head);

        g.rows.forEach(function (r) {
          var row = el('div', 'cs-row');
          var key = el('div', 'cs-key');
          key.innerHTML = '<b>' + esc(r.k) + '</b>' + (r.note ? '<small>' + esc(r.note) + '</small>' : '');
          row.appendChild(key);
          var cells = el('div', 'cs-cells');
          cells.style.cssText = colStyle;
          cells.innerHTML = showLangs.map(function (l) {
            var v = r.v[l.id];
            if (v == null || v === '') return '<div class="cs-cell empty">—</div>';
            return '<div class="cs-cell">' + HL.highlight(String(v), l.id) + '</div>';
          }).join('');
          row.appendChild(cells);
          rows.appendChild(row);
        });

        sec.appendChild(rows);
        listWrap.appendChild(sec);
      });
    }

    function apply() { render(); }
    render();

    root.innerHTML = '';
    root.appendChild(page);
    return { title: '速查手册 · CodeUp码上' };
  }

  /* ============================================================ Playground */
  function playground(root, params) {
    var langId = params && params.lang ? params.lang : 'python';
    if (!CL.Languages.exists(langId)) langId = 'python';

    var page = el('div', 'page pg-page wrap');
    page.innerHTML =
      '<div class="pg-head">' +
        '<span class="eyebrow">Playground</span>' +
        '<h1>在线运行</h1>' +
        '<p>八门编程语言在线 IDE，云端真实编译运行。选择语言，编写代码，点击运行即可看到结果。</p>' +
      '</div>' +
      '<div class="pg-ide" id="pg-ide"></div>';

    root.innerHTML = '';
    root.appendChild(page);

    /* 挂载字节码编辑器 */
    var ide = page.querySelector('#pg-ide');
    if (CL.BytecodeEditor && CL.BytecodeEditor.mount) {
      CL.BytecodeEditor.mount(ide, { lang: langId });
    } else {
      ide.innerHTML = '<div class="pg-cs"><p>编辑器加载中…</p></div>';
    }

    return {
      title: '在线运行 · CodeUp码上',
      destroy: function () {
        if (CL.BytecodeEditor) CL.BytecodeEditor._active = null;
      }
    };
  }

  /* ============================================================ 404 */
  function notFound(root) {
    root.innerHTML = '';
    var w = el('div', 'wrap empty-state');
    w.innerHTML = '<div class="es-icon">' + ICO.search + '</div>' +
      '<h2>页面不存在</h2><p>这个地址没有对应的内容，回到首页看看？</p>' +
      '<a class="btn btn-primary" href="#/">返回首页</a>';
    root.appendChild(w);
    return { title: '页面不存在 · CodeUp码上' };
  }

  /* ============================================================ 辅助 */
    function setupScrollSpy(prose, toc) {
    if (!toc) return;
    var anchors = [];
    toc.querySelectorAll('a').forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) anchors.push({ a: a, t: target });
    });
    if (!anchors.length) return;

    var raf = null;
    var lastActive = null;
    function update() {
      raf = null;
      var y = global.scrollY + 120;
      var cur = null;
      for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].t.getBoundingClientRect().top + global.scrollY <= y) cur = anchors[i];
      }
      anchors.forEach(function (x) { x.a.classList.remove('active'); });
      if (cur) {
        cur.a.classList.add('active');
        if (cur.a !== lastActive) {
          lastActive = cur.a;
          var tocRect = toc.getBoundingClientRect();
          var itemRect = cur.a.getBoundingClientRect();
          var itemTop = itemRect.top - tocRect.top + toc.scrollTop;
          var targetScroll = itemTop - toc.clientHeight / 2 + itemRect.height / 2;
          toc.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }
    }
    global.addEventListener('scroll', function () {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  var _stats = null;
  function siteStats() {
    if (_stats) return _stats;
    var langs = CL.Languages.list.length, chapters = 0, samples = 0;
    CL.Tutorials.all().forEach(function (id) {
      var chs = CL.Tutorials.chapters(id);
      chapters += chs.length;
      chs.forEach(function (c) {
        (c.blocks || []).forEach(function (b) {
          if (b.t === 'code') samples++;
          else if (b.t === 'cmp') samples += Object.keys(b.x || {}).length;
        });
      });
    });
    _stats = { langs: langs, chapters: chapters, samples: samples };
    return _stats;
  }

  CL.Pages = {
    home: home,
    languages: languages,
    tutorial: tutorial,
    compare: compare,
    cheatsheet: cheatsheet,
    playground: playground,
    notFound: notFound,
    renderBlock: renderBlock,
    inline: inline,
    siteStats: siteStats,
    ICO: ICO
  };

  /* ---- 课后小测（选择题）额外数据与注入 ---- */
  var EXTRA_QUIZ = {
    'python/basics': [
      { t: 'quiz', type: 'single', q: '以下代码执行后，result 列表的值是（ ）', code: 'result = [i * 2 for i in range(5)]', options: ['[0, 2, 4, 6, 8]', '[2, 4, 6, 8, 10]', '[0, 1, 2, 3, 4]', '[1, 2, 3, 4, 5]'], answer: 0, explain: 'range(5) 生成 0、1、2、3、4，每个元素乘 2 后得到 0、2、4、6、8。列表推导式会对每个元素执行表达式并收集结果。' }
    ]
  };
  var QUIZ_FLAG = 'extra-quiz-injected', quizKey = null;
  function tryInjectQuiz() {
    var hash = location.hash || '', m = hash.match(/^#\/languages\/([^/]+)\/([^/?#]+)/);
    if (!m) { quizKey = null; return; }
    var key = m[1] + '/' + m[2], quizzes = EXTRA_QUIZ[key];
    if (!quizzes || !quizzes.length) { quizKey = key; return; }
    if (quizKey === key) return;
    quizKey = key;
    var tries = 0, timer = setInterval(function () {
      tries++;
      var prose = document.querySelector('.prose');
      if (!prose) { if (tries > 30) clearInterval(timer); return; }
      clearInterval(timer);
      if (prose.querySelector('.' + QUIZ_FLAG)) return;
      quizzes.forEach(function (q) {
        var node = CL.Pages.renderBlock(q, { lang: m[1] });
        if (node) { node.classList.add(QUIZ_FLAG); prose.appendChild(node); }
      });
    }, 100);
  }
  global.addEventListener('hashchange', function () { quizKey = null; tryInjectQuiz(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tryInjectQuiz);
  else tryInjectQuiz();
  CL.ExtraQuiz = { data: EXTRA_QUIZ, inject: tryInjectQuiz };
})(window);
