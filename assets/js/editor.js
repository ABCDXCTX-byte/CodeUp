/* ==========================================================================
   CodeUp码上 · editor.js — 自研代码编辑器
   - textarea + 高亮层双缓冲，像素级对齐
   - 行号槽 / 自动增高 / 自动缩进 / 括号配对 / 括号匹配高亮
   - 懒升级：静态代码块可一键变为可编辑
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL = global.CL || {};
  var HL = CL.Highlight;

  /* ------------------------------------------------------------ 常量 */
  var PAIRS = { '(': ')', '[': ']', '{': '}' };
  var CLOSERS = { ')': '(', ']': '[', '}': '{' };
  var QUOTES = { '"': '"', "'": "'", '`': '`' };
  var OPEN_ALL = '([{';
  var CLOSE_ALL = ')]}';

  var INDENT_SIZE = { python: 4, c: 4, cpp: 4, java: 4, javascript: 2, typescript: 2, go: 4, rust: 4 };
  var LINE_COMMENT = {
    python: '#', c: '//', cpp: '//', java: '//', javascript: '//',
    typescript: '//', go: '//', rust: '//', shell: '#', ruby: '#',
    lua: '--', sql: '--', php: '//', csharp: '//', swift: '//', kotlin: '//'
  };

  var uid = 0;

  /* ------------------------------------------------------------ 带标记渲染 */
  /**
   * 渲染 token 流，并在指定字符位置叠加标记 class
   * @param {Array} tokens token 流
   * @param {Object} marks { charIndex: className }
   */
  function renderWithMarks(tokens, marks) {
    if (!marks || !Object.keys(marks).length) return HL.tokensToHtml(tokens);

    var html = '', pos = 0;
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i], v = t.v, seg = '', segStart = 0;
      for (var j = 0; j < v.length; j++) {
        var mark = marks[pos + j];
        if (mark !== (seg ? marks[segStart] : undefined) && j > 0) {
          html += wrap(seg, t.c, marks[segStart]);
          seg = ''; segStart = pos + j;
        }
        if (!seg) segStart = pos + j;
        seg += v[j];
      }
      if (seg) html += wrap(seg, t.c, marks[segStart]);
      pos += v.length;
    }
    return html;

    function wrap(text, cls, mark) {
      var h = HL.esc(text);
      if (cls !== 'plain') h = '<span class="tok-' + cls + '">' + h + '</span>';
      if (mark) h = '<span class="' + mark + '">' + h + '</span>';
      return h;
    }
  }

  /* ------------------------------------------------------------ 编辑器 */
  function Editor(host, opts) {
    opts = opts || {};
    this.host = host;
    this.lang = HL.normalizeLang(opts.lang || 'plain');
    this.readOnly = !!opts.readOnly;
    this.onChange = opts.onChange || null;
    this.onRun = opts.onRun || null;
    this.indentUnit = opts.indent != null ? opts.indent : (INDENT_SIZE[this.lang] || 4);
    this.maxHeight = opts.maxHeight || 560;
    this.minHeight = opts.minHeight || 84;
    this.id = 'ed' + (++uid);
    this._marks = {};
    this._build();
    this.setValue(opts.value || '');
  }

  Editor.prototype._build = function () {
    var self = this;

    var root = document.createElement('div');
    root.className = 'editor';
    root.innerHTML =
      '<div class="ed-gutter"><div class="ed-gutter-inner"></div></div>' +
      '<div class="ed-surface">' +
        '<pre class="ed-hl" aria-hidden="true"><code></code></pre>' +
        '<textarea class="ed-ta" spellcheck="false" autocapitalize="off" ' +
          'autocorrect="off" wrap="off" aria-label="代码编辑器"></textarea>' +
      '</div>';
    this.host.appendChild(root);

    this.el = root;
    this.gutter = root.querySelector('.ed-gutter');
    this.gutterInner = root.querySelector('.ed-gutter-inner');
    this.surface = root.querySelector('.ed-surface');
    this.hl = root.querySelector('.ed-hl');
    this.hlCode = root.querySelector('.ed-hl code');
    this.ta = root.querySelector('.ed-ta');
    this.ta.id = this.id;
    if (this.readOnly) this.ta.readOnly = true;

    // 度量行高
    var cs = getComputedStyle(this.ta);
    this.lineH = parseFloat(cs.lineHeight) || 21.84;
    this.padY = (parseFloat(cs.paddingTop) || 14) + (parseFloat(cs.paddingBottom) || 14);

    /* ---- 事件 ---- */
    this.ta.addEventListener('input', function () { self._onInput(); });
    this.ta.addEventListener('scroll', function () { self._syncScroll(); });
    this.ta.addEventListener('keydown', function (e) { self._onKeyDown(e); });
    this.ta.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' ||
          e.key === 'ArrowDown' || e.key === 'Home' || e.key === 'End' || e.key === 'PageUp' ||
          e.key === 'PageDown') {
        self._updateActiveLine(); self._updateBraceMarks();
      }
    });
    this.ta.addEventListener('click', function () {
      self._updateActiveLine(); self._updateBraceMarks();
    });
    this.ta.addEventListener('focus', function () {
      root.classList.add('focused');
      self._updateActiveLine(); self._updateBraceMarks();
    });
    this.ta.addEventListener('blur', function () { root.classList.remove('focused'); });
  };

  Editor.prototype.getValue = function () { return this.ta.value; };

  Editor.prototype.setValue = function (v) {
    this.ta.value = v == null ? '' : String(v);
    this._refresh();
  };

  Editor.prototype.setLang = function (lang) {
    this.lang = HL.normalizeLang(lang);
    this.indentUnit = INDENT_SIZE[this.lang] || 4;
    this._refresh();
  };

  Editor.prototype.focus = function () { try { this.ta.focus(); } catch (e) {} };

  Editor.prototype.destroy = function () {
    if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
  };

  /* ---- 刷新高亮 / 行号 / 高度 ---- */
  Editor.prototype._refresh = function () {
    var src = this.ta.value;
    var tokens = HL.tokenize(src, HL.rules[this.lang] || []);
    this.hlCode.innerHTML = renderWithMarks(tokens, this._marks);
    this._updateGutter(src);
    this._updateHeight(src);
    this._syncScroll();
    this._updateBraceMarks();
  };

  Editor.prototype._updateGutter = function (src) {
    var count = src.split('\n').length;
    if (this._lineCount === count) { this._updateActiveLine(); return; }

    if (count > 4000) {
      this.gutterInner.textContent = '';           // 超大文件不渲染行号
      this._lineCount = count;
      return;
    }
    var html = '', i;
    for (i = 1; i <= count; i++) html += '<div>' + i + '</div>';
    this.gutterInner.innerHTML = html;
    this._lineCount = count;
    this._updateActiveLine();
  };

  Editor.prototype._updateHeight = function (src) {
    var lines = src.split('\n').length;
    var h = lines * this.lineH + this.padY + 2;    // +2 容差
    h = Math.max(this.minHeight, Math.min(this.maxHeight, h));
    this.surface.style.height = h + 'px';
    this.el.style.height = h + 'px';
  };

  Editor.prototype._syncScroll = function () {
    var st = this.ta.scrollTop, sl = this.ta.scrollLeft;
    this.hlCode.style.transform = 'translate(' + (-sl) + 'px,' + (-st) + 'px)';
    this.gutterInner.style.transform = 'translateY(' + (-st) + 'px)';
  };

  Editor.prototype._updateActiveLine = function () {
    if (!this._lineCount || this._lineCount > 4000) return;
    var pos = this.ta.selectionStart;
    var line = this.ta.value.slice(0, pos).split('\n').length;
    var cur = this.gutterInner.querySelector('div.active');
    if (cur) cur.classList.remove('active');
    var el = this.gutterInner.children[line - 1];
    if (el) el.classList.add('active');
  };

  /* ---- 括号匹配 ---- */
  Editor.prototype._findMatch = function (src, pos) {
    var i, depth, ch, want;

    // 光标右侧是开括号
    ch = src[pos];
    if (PAIRS[ch]) {
      depth = 0; want = PAIRS[ch];
      for (i = pos; i < src.length; i++) {
        if (this._inSkip(src, i)) continue;
        if (src[i] === ch) depth++;
        else if (src[i] === want) { depth--; if (depth === 0) return i; }
      }
      return -1;
    }
    // 光标左侧是闭括号
    ch = src[pos - 1];
    if (CLOSERS[ch]) {
      depth = 0; want = CLOSERS[ch];
      for (i = pos - 1; i >= 0; i--) {
        if (src[i] === ch) depth++;
        else if (src[i] === want) { depth--; if (depth === 0) return i; }
      }
      return -1;
    }
    return -1;
  };

  // 简易跳过：字符串与注释内的括号不参与匹配
  Editor.prototype._inSkip = function (src, i) {
    var tokens = this._tokensCache;
    if (!tokens) return false;
    for (var k = 0; k < tokens.length; k++) {
      var t = tokens[k];
      if (i >= t._s && i < t._s + t.v.length) return t.c === 'comment' || t.c === 'string' || t.c === 'regex';
    }
    return false;
  };

  Editor.prototype._updateBraceMarks = function () {
    var src = this.ta.value;
    var tokens = HL.tokenize(src, HL.rules[this.lang] || []);
    var p = 0;
    for (var i = 0; i < tokens.length; i++) { tokens[i]._s = p; p += tokens[i].v.length; }
    this._tokensCache = tokens;

    var marks = {};
    var pos = this.ta.selectionStart;
    var candidates = [pos, pos - 1];

    for (var c = 0; c < candidates.length; c++) {
      var at = candidates[c];
      if (at < 0 || at > src.length) continue;
      var ch = src[at];
      var isOpen = !!PAIRS[ch], isClose = !!CLOSERS[ch];
      if (!isOpen && !isClose) continue;
      if (this._inSkip(src, at)) continue;

      var pairPos;
      if (isOpen) pairPos = this._findMatch(src, at);
      else pairPos = this._findMatch(src, at + 1);

      if (pairPos >= 0) {
        marks[at] = 'brace-match';
        marks[pairPos] = 'brace-match';
      } else {
        marks[at] = 'brace-bad';
      }
      break;
    }

    var changed = JSON.stringify(marks) !== JSON.stringify(this._marks);
    this._marks = marks;
    if (changed) {
      this.hlCode.innerHTML = renderWithMarks(tokens, marks);
      this._syncScroll();
    }
  };

  /* ---- 输入处理 ---- */
  Editor.prototype._onInput = function () {
    this._refresh();
    if (this.onChange) this.onChange(this.ta.value, this);
  };

  Editor.prototype._replace = function (start, end, text, selStart, selEnd) {
    var ta = this.ta;
    var v = ta.value;
    ta.value = v.slice(0, start) + text + v.slice(end);
    ta.selectionStart = selStart != null ? selStart : start + text.length;
    ta.selectionEnd = selEnd != null ? selEnd : ta.selectionStart;
    this._refresh();
    if (this.onChange) this.onChange(ta.value, this);
  };

  Editor.prototype._onKeyDown = function (e) {
    var ta = this.ta, self = this;
    var s = ta.selectionStart, en = ta.selectionEnd, v = ta.value;

    /* 运行：Ctrl/Cmd + Enter */
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (this.onRun) this.onRun(this.getValue(), this);
      return;
    }
    /* 全选式保存屏蔽 */
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); return; }

    if (this.readOnly) return;

    /* 注释切换：Ctrl/Cmd + / */
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      this._toggleComment();
      return;
    }

    /* Tab / Shift+Tab */
    if (e.key === 'Tab') {
      e.preventDefault();
      var multi = v.slice(s, en).indexOf('\n') >= 0;
      if (multi || e.shiftKey) { this._indentSelection(e.shiftKey ? -1 : 1); }
      else { this._replace(s, en, this._spaces(this.indentUnit)); }
      return;
    }

    /* Enter：自动缩进 */
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      var lineStart = v.lastIndexOf('\n', s - 1) + 1;
      var linePrefix = v.slice(lineStart, s);
      var indentMatch = linePrefix.match(/^[ \t]*/);
      var indent = indentMatch ? indentMatch[0] : '';

      var trimmed = linePrefix.replace(/\s+$/, '');
      var lastChar = trimmed.charAt(trimmed.length - 1);
      var nextChar = v.charAt(en);
      var inside = PAIRS[lastChar] && CLOSERS[nextChar] === lastChar;

      var insert;
      var caretAt;
      if (inside) {
        insert = '\n' + indent + this._spaces(this.indentUnit) + '\n' + indent;
        caretAt = s + 1 + indent.length + this.indentUnit;
      } else if (PAIRS[lastChar] || lastChar === ':') {
        insert = '\n' + indent + this._spaces(this.indentUnit);
        caretAt = null;
      } else {
        insert = '\n' + indent;
        caretAt = null;
      }
      // 智能缩进：行首已有内容时保持
      this._replace(s, en, insert, caretAt != null ? caretAt : s + insert.length);
      return;
    }

    /* 自动配对 */
    if (PAIRS[e.key] && s === en) {
      var next = v.charAt(en);
      // 后面是单词字符时不自动配对（避免误伤 < 之类）
      if (!next || /[\s)\]};,.]/.test(next) || CLOSE_ALL.indexOf(next) >= 0) {
        e.preventDefault();
        this._replace(s, en, e.key + PAIRS[e.key], s + 1);
        return;
      }
    }

    /* 引号配对 */
    if (QUOTES[e.key] && s === en) {
      var nx = v.charAt(en);
      var pre = v.charAt(s - 1);
      if (nx === e.key) { e.preventDefault(); ta.selectionStart = ta.selectionEnd = en + 1; return; }
      if ((!nx || /[\s)\]};,.:=+*/\-]/.test(nx)) && !/[\w'"`]/.test(pre)) {
        e.preventDefault();
        this._replace(s, en, e.key + e.key, s + 1);
        return;
      }
    }

    /* 跳过闭合符 */
    if (CLOSE_ALL.indexOf(e.key) >= 0 && s === en && v.charAt(en) === e.key) {
      e.preventDefault();
      ta.selectionStart = ta.selectionEnd = en + 1;
      return;
    }

    /* Backspace：成对删除 */
    if (e.key === 'Backspace' && s === en && s > 0) {
      var a = v.charAt(s - 1), b = v.charAt(s);
      if ((PAIRS[a] && PAIRS[a] === b) || (QUOTES[a] && QUOTES[a] === b)) {
        e.preventDefault();
        this._replace(s - 1, s + 1, '');
        return;
      }
      // 缩进块退格
      var ls = v.lastIndexOf('\n', s - 1) + 1;
      var before = v.slice(ls, s);
      if (before && /^[ \t]+$/.test(before)) {
        var drop = before.length % this.indentUnit || this.indentUnit;
        e.preventDefault();
        this._replace(Math.max(ls, s - drop), s, '');
        return;
      }
    }
  };

  Editor.prototype._spaces = function (n) { return new Array(n + 1).join(' '); };

  Editor.prototype._indentSelection = function (dir) {
    var ta = this.ta, v = ta.value, s = ta.selectionStart, e = ta.selectionEnd;
    var lineStart = v.lastIndexOf('\n', s - 1) + 1;
    var lineEnd = v.indexOf('\n', e);
    if (lineEnd < 0) lineEnd = v.length;

    var block = v.slice(lineStart, lineEnd);
    var lines = block.split('\n');
    var unit = this._spaces(this.indentUnit);
    var out = [], firstDelta = 0, delta = 0, i;

    for (i = 0; i < lines.length; i++) {
      var ln = lines[i];
      if (dir > 0) {
        out.push(ln ? unit + ln : ln);
        if (i === 0) firstDelta = this.indentUnit;
        delta += this.indentUnit;
      } else {
        var m = ln.match(/^(?: {1,4}|\t)/);
        var cut = m ? m[0].length : 0;
        if (i === 0) firstDelta = -cut;
        delta -= cut;
        out.push(ln.slice(cut));
      }
    }

    this._replace(
      lineStart, lineEnd, out.join('\n'),
      Math.max(lineStart, s + firstDelta),
      Math.max(lineStart, e + delta)
    );
  };

  Editor.prototype._toggleComment = function () {
    var mark = LINE_COMMENT[this.lang];
    if (!mark) return;
    var ta = this.ta, v = ta.value, s = ta.selectionStart, e = ta.selectionEnd;
    var lineStart = v.lastIndexOf('\n', s - 1) + 1;
    var lineEnd = v.indexOf('\n', e);
    if (lineEnd < 0) lineEnd = v.length;

    var lines = v.slice(lineStart, lineEnd).split('\n');
    var allCommented = lines.every(function (ln) { return !ln.trim() || ln.trim().indexOf(mark) === 0; });
    var out = lines.map(function (ln) {
      if (!ln.trim()) return ln;
      if (allCommented) return ln.replace(new RegExp('^(\\s*)' + mark.replace(/[#-]/g, '\\$&') + ' ?'), '$1');
      return ln.replace(/^(\s*)/, '$1' + mark + ' ');
    });
    this._replace(lineStart, lineEnd, out.join('\n'), lineStart, lineStart + out.join('\n').length);
  };

  /* ------------------------------------------------------------ 工厂 */
  function create(host, opts) { return new Editor(host, opts); }

  /* ------------------------------------------------------------ 代码块组件 */
  /**
   * 渲染一个代码块。opts:
   *   { lang, code, title, runnable, editable, onRun, maxHeight, compact }
   * 返回 { el, editor(), getValue(), setOutput() }
   */
  function codeBlock(host, opts) {
    opts = opts || {};
    var lang = HL.normalizeLang(opts.lang);
    var code = String(opts.code || '').replace(/\t/g, '    ').replace(/^\n+/, '').replace(/\n+\s*$/, '');
    var runnable = !!opts.runnable;
    var editable = !!opts.editable;

    var wrap = document.createElement('div');
    wrap.className = 'code-view' + (opts.compact ? ' compact' : '');

    var head = document.createElement('div');
    head.className = 'cv-head';
    head.innerHTML =
      '<div class="cv-dots"><i></i><i></i><i></i></div>' +
      '<div class="cv-title"></div>' +
      '<span class="cv-lang"></span>' +
      '<div class="cv-actions"></div>';
    wrap.appendChild(head);

    wrap.querySelector('.cv-title').textContent = opts.title || '';
    wrap.querySelector('.cv-lang').textContent = lang;

    var actions = wrap.querySelector('.cv-actions');
    var body = document.createElement('div');
    wrap.appendChild(body);

    var console_ = document.createElement('div');
    console_.className = 'console';
    wrap.appendChild(console_);

    var status = document.createElement('div');
    status.className = 'ed-status';
    wrap.appendChild(status);

    host.appendChild(wrap);

    var inst = {
      el: wrap,
      lang: lang,
      _editor: null,
      _code: code,
      _console: console_,
      _status: status
    };

    inst.getValue = function () {
      return inst._editor ? inst._editor.getValue() : inst._code;
    };

    inst.editor = function () {
      if (inst._editor) return inst._editor;
      body.innerHTML = '';
      inst._editor = create(body, {
        lang: lang,
        value: inst._code,
        maxHeight: opts.maxHeight || 560,
        onRun: opts.onRun ? function (v, ed) { opts.onRun(v, ed, inst); } : null
      });
      setStatus();
      return inst._editor;
    };

    inst.setOutput = function (lines, meta) {
      meta = meta || {};
      var box = console_.querySelector('.cc-body');
      if (!box) {
        console_.innerHTML =
          '<div class="cc-head">' +
            '<span>输出</span>' +
            '<span class="cc-badge"></span>' +
            '<span class="cc-time"></span>' +
            '<button class="cc-close" title="收起">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="cc-body"></div>';
        box = console_.querySelector('.cc-body');
        console_.querySelector('.cc-close').addEventListener('click', function () {
          console_.classList.remove('open');
        });
      }
      if (meta.badge != null) {
        var bd = console_.querySelector('.cc-badge');
        if (bd) {
          bd.textContent = meta.badge;
          bd.classList.toggle('loading', /运行中|加载中/.test(meta.badge));
        }
      }
      if (meta.time != null) { var tm = console_.querySelector('.cc-time'); if (tm) tm.textContent = meta.time; }

      var html = '';
      if (!lines || !lines.length) html = '<span class="cc-empty">（无输出）</span>';
      else {
        for (var i = 0; i < lines.length; i++) {
          var l = lines[i];
          var cls = l.cls ? ' ' + l.cls : '';
          html += '<span class="cc-line' + cls + '">' + HL.esc(l.text != null ? l.text : String(l)) + '</span>';
        }
      }
      box.innerHTML = html;
      box.scrollTop = box.scrollHeight;
      console_.classList.add('open');
    };

    inst.clearOutput = function () { console_.classList.remove('open'); };

    /* ---- 静态视图 ---- */
    function renderStaticView() {
      body.className = 'code-static';
      body.innerHTML = HL.renderStatic(inst._code, lang, { maxHeight: opts.maxHeight });
    }

    function setStatus() {
      if (!inst._editor) { status.innerHTML = ''; status.style.display = 'none'; return; }
      status.style.display = '';
      var mode = CL.Runner ? CL.Runner.describe(lang) : null;
      var tag = mode
        ? '<span class="es-mode-' + mode.tone + '">' + mode.label + '</span>'
        : '';
      status.innerHTML =
        '<span class="es-lang">' + HL.esc(lang) + '</span>' +
        '<span>' + inst._editor.getValue().split('\n').length + ' 行</span>' +
        tag +
        '<span class="sp">Ctrl+Enter 运行 · Ctrl+/ 注释</span>';
    }

    /* ---- 操作按钮 ---- */
    function addBtn(label, icon, cls, handler, title) {
      var b = document.createElement('button');
      b.className = 'cv-btn' + (cls ? ' ' + cls : '');
      b.innerHTML = (icon || '') + '<span>' + label + '</span>';
      b.title = title || label;
      // 紧凑卡片里 <span> 文案会被 CSS 隐藏，靠 aria-label 保住可访问名称
      b.setAttribute('aria-label', title || label);
      b.addEventListener('click', handler);
      actions.appendChild(b);
      return b;
    }

    var ICO = {
      play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>',
      spinner: '<svg class="cv-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.56"/></svg>',
      copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
      open: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M19 13v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>'
    };

    // 「打开编辑器继续编辑」：把这段代码送进全功能 Playground IDE（卡片左上角，红绿灯圆点之后）
    if (CL.Languages.exists(lang) && CL.BytecodeEditor && CL.BytecodeEditor.openWith) {
      var openBtn = document.createElement('button');
      openBtn.className = 'cv-btn cv-open-editor';
      openBtn.innerHTML = ICO.open + '<span>转到云端编辑器以继续编辑</span>';
      openBtn.title = '转到云端编辑器以继续编辑此代码';
      openBtn.setAttribute('aria-label', '转到云端编辑器以继续编辑此代码');
      openBtn.addEventListener('click', function () {
        CL.BytecodeEditor.openWith(inst.lang, inst.getValue());
      });
      var dots = head.querySelector('.cv-dots');
      head.insertBefore(openBtn, dots ? dots.nextSibling : head.firstChild);
    }

    if (runnable) {
      var runBtn = addBtn('运行', ICO.play, 'run', function () {
        if (runBtn.disabled) return;
        // 优先调用外部 onRun 回调（如教程页的 runCode，含完整结果处理）；无回调时走默认云端运行
        if (opts.onRun) { opts.onRun(inst.getValue(), inst._editor, inst); return; }
        inst._doRun();
      }, '运行这段代码（Ctrl+Enter）');
      inst.runBtn = runBtn;

      inst._doRun = function () {
        if (runBtn.disabled) return;
        var code = inst.getValue();
        runBtn.disabled = true;
        runBtn.innerHTML = ICO.spinner + '<span>运行中…</span>';
        inst.setOutput([{ text: '正在连接云端运行服务…', cls: 'sys' }], { badge: '运行中' });
        CL.Runner.run(inst.lang, code, {
          onProgress: function (msg) {
            inst.setOutput([{ text: msg, cls: 'sys' }], { badge: '运行中' });
          },
          onDone: function (res) {
            runBtn.disabled = false;
            runBtn.innerHTML = ICO.play + '<span>运行</span>';
            var badge;
            if (res.comingSoon) badge = '敬请期待';
            else if (res.degraded) badge = '演示模式';
            else if (res.cached) badge = '运行成功 · 缓存';
            else badge = res.ok ? '运行成功' : '运行失败';
            inst.setOutput(res.lines, { badge: badge, time: res.time != null ? res.time + 'ms' : '' });
          }
        });
      };
    }

    // 「复制」：展开二级菜单（复制到剪切板 / 复制到云端编辑器）。
    // 若 CL.Editors 未加载，则退化为直接复制。
    var copyBtn = addBtn('复制', ICO.copy, '', function (e) {
      if (CL.Editors && CL.Editors.openCopyMenu) {
        e.stopPropagation();
        CL.Editors.openCopyMenu(copyBtn, function () { return inst.getValue(); });
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        var txt = inst.getValue();
        var done = function () {
          copyBtn.classList.add('copied');
          copyBtn.innerHTML = ICO.check + '<span>已复制</span>';
          setTimeout(function () {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = ICO.copy + '<span>复制</span>';
          }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).then(done, fb);
        } else fb();
        function fb() {
          var t = document.createElement('textarea');
          t.value = txt; t.style.position = 'fixed'; t.style.opacity = '0';
          document.body.appendChild(t); t.select();
          try { document.execCommand('copy'); done(); } catch (er) {}
          document.body.removeChild(t);
        }
      }
    }, '复制代码到剪切板或云端编辑器');

    renderStaticView();
    if (editable) inst.editor();
    // 绑定 Ctrl+Enter 运行快捷键：外部传了 onRun 时 Editor 已绑定；未传时用默认 _doRun
    if (editable && inst._doRun && inst._editor && !inst._editor.onRun) inst._editor.onRun = inst._doRun;

    return inst;
  }

  /* ------------------------------------------------------------ 导出 */
  CL.Editor = {
    create: create,
    Editor: Editor,
    codeBlock: codeBlock,
    renderWithMarks: renderWithMarks,
    INDENT_SIZE: INDENT_SIZE,
    LINE_COMMENT: LINE_COMMENT
  };

})(window);
