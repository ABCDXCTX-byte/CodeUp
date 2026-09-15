/* ==========================================================================
   CodeUp码上 · editors.js — “复制代码到云端编辑器”
   --------------------------------------------------------------------------
   浏览器安全沙箱无法真正“枚举”用户电脑上安装了哪些软件，因此这里采用
   “一次偏好 + 持久化”的方案：用户在这一面板里勾选自己常用的编辑器，之后
   每张代码卡片的「复制」按钮就会展开二级菜单，固定含「复制到剪切板」，并为
   每个已勾选的编辑器多出一个「复制到 X」选项——点击后先复制代码到剪切板，
   再通过该编辑器的 URI Scheme（如 vscode://、cursor://、trae://）尝试唤起
   桌面应用，唤起后用户直接 Ctrl/Cmd+V 粘贴即可。
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL = global.CL || {};
  var STORE_KEY = 'codeup.editors.v1';

  /* ------------------------------------------------------------ 已知编辑器 */
  // 全部默认 def:false —— 菜单不会预先显示你没装的编辑器；是否启用由「自动识别」
  // 或你在设置里手动勾选决定，并持久化在本机。
  // schemes：URI Scheme 候选数组（按优先级）。国内版与国际版 Scheme 常不同
  // （如 CodeBuddy 国内版为 codebuddycn://，Trae 国内版可能为 trae-cn://），
  // 唤起/检测时会依次尝试所有候选，已注册的那个才会真正打开应用。
  // 注意：除 CodeBuddy 外，下列所有 Scheme 均取自 protocol-launcher 协议库
  // （https://zhensherlock.github.io/protocol-launcher/zh/），与官方一致；CodeBuddy
  // 因国内版为 codebuddycn://，单独保留，未采用该库。
  var KNOWN = [
    { id: 'vscode',     name: 'VS Code',   color: '#007acc', schemes: ['vscode://'],           badge: 'VS', def: false },
    { id: 'cursor',     name: 'Cursor',     color: '#111827', schemes: ['cursor://'],           badge: 'Cu', def: false },
    { id: 'trae',       name: 'Trae',       color: '#ff6b35', schemes: ['trae://', 'trae-cn://'], badge: 'Tr', def: false,
      note: '国际版(trae.com)为 trae:// ，国内版(trae.cn)为 trae-cn:// ；若都打不开，说明本机未注册该 URI 协议，需在 Trae 内「安装 trae 命令」或重装时勾选注册。' },
    { id: 'codebuddy',  name: 'CodeBuddy',  color: '#4f46e5', schemes: ['codebuddycn://', 'codebuddy://'], badge: 'CB', def: false },
    { id: 'windsurf',   name: 'Windsurf',   color: '#0ea5e9', schemes: ['windsurf://'],         badge: 'Wi', def: false },
    { id: 'zed',        name: 'Zed',        color: '#18181b', schemes: ['zed://'],              badge: 'Ze', def: false },
    { id: 'codex',      name: 'Codex',      color: '#10a37f', schemes: ['codex://'],            badge: 'Cx', def: false,
      note: 'OpenAI Codex 的 URI Scheme 为 codex:// （来源 protocol-launcher）；留空则只复制不唤起。' }
  ];

  /* ------------------------------------------------------------ 偏好存储 */
  function readStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function writeStore(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); }
    catch (e) { /* 隐私模式忽略 */ }
  }
  function enabledMap() {
    var s = readStore();
    s.enabled = s.enabled || {};
    s.custom = s.custom || [];
    return s;
  }

  /* 当前生效（应出现在菜单里）的编辑器列表 */
  function getEnabled() {
    var s = enabledMap();
    var list = [];
    KNOWN.forEach(function (e) {
      var on = s.enabled.hasOwnProperty(e.id) ? !!s.enabled[e.id] : !!e.def;
      if (on) list.push(e);
    });
    s.custom.forEach(function (c) { list.push(c); });
    return list;
  }

  function setEnabled(id, on) {
    var s = enabledMap();
    s.enabled[id] = !!on;
    writeStore(s);
  }
  function addCustom(name, scheme, color) {
    var s = enabledMap();
    var id = 'custom_' + Date.now().toString(36);
    s.custom.push({
      id: id, name: name, scheme: (scheme || '').replace(/[:/]+$/, '').replace(/^[\w]+:\/\//, ''),
      color: color || '#0f5fc9', badge: (name || '?').slice(0, 2)
    });
    writeStore(s);
    return id;
  }
  function removeCustom(id) {
    var s = enabledMap();
    s.custom = s.custom.filter(function (c) { return c.id !== id; });
    writeStore(s);
  }

  /* ------------------------------------------------------------ 复制工具 */
  function fallbackCopy(txt) {
    try {
      var t = document.createElement('textarea');
      t.value = txt;
      t.style.position = 'fixed'; t.style.top = '0'; t.style.left = '0';
      t.style.opacity = '0'; t.style.pointerEvents = 'none';
      document.body.appendChild(t);
      t.focus(); t.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(t);
      return ok;
    } catch (e) { return false; }
  }
  function copyText(txt) {
    return new Promise(function (resolve) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () { resolve(true); },
          function () { resolve(fallbackCopy(txt)); });
      } else {
        resolve(fallbackCopy(txt));
      }
    });
  }

  /* ------------------------------------------------------------ 唤起桌面编辑器 */
  // 优先用 <a>.click() 触发 URI Scheme —— 这是多数浏览器最稳妥、且不会让页面跳转离开
  // 的方式（自定义协议会被浏览器拦截并转交桌面应用）。iframe 作为兜底。
  // 注意：浏览器要求“唤起外部程序”必须发生在用户手势（点击）调用栈内，故本函数
  // 只应在按钮 click 回调里被调用。
  function tryAnchorLaunch(url) {
    if (!url) return;
    try {
      var a = document.createElement('a');
      a.href = url; a.rel = 'noopener';
      a.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch (e) { /* 忽略 */ }
    try {
      var ifr = document.createElement('iframe');
      ifr.style.cssText = 'position:fixed;width:0;height:0;border:0;left:-9999px;top:-9999px;';
      ifr.src = url;
      document.body.appendChild(ifr);
      setTimeout(function () { if (ifr && ifr.parentNode) ifr.parentNode.removeChild(ifr); }, 1800);
    } catch (e) { /* 部分环境不支持 iframe 触发，忽略 */ }
  }

  /* 取某编辑器所有候选 Scheme（归一化为数组） */
  function schemesOf(ed) {
    if (Array.isArray(ed.schemes)) return ed.schemes.filter(Boolean);
    if (ed.scheme) return [ed.scheme];
    return [];
  }
  /* 复制动作：依次尝试该编辑器的全部候选 Scheme（只注册的那个会真正打开） */
  function launchEditorSchemes(ed) {
    schemesOf(ed).forEach(function (s) { tryAnchorLaunch(s); });
  }

  /* ------------------------------------------------------------ 自动识别本机编辑器 */
  // 浏览器安全沙箱无法枚举已装软件，这里用“焦点丢失”启发式：依次对每个已知编辑器
  // 唤起其全部候选 Scheme，若窗口在短时窗内失去焦点（被外部应用抢走），即认为该编辑
  // 器已安装并自动启用。best-effort；必须在用户点击手势内启动（用 rAF 链保持在 5s
  // 临时激活窗口内，避免 setTimeout 丢失手势而被浏览器拦截）。
  var detectToken = 0;
  function runDetection(onProgress, onDone) {
    var token = ++detectToken;
    var s = enabledMap();
    var cands = KNOWN.filter(function (e) { return schemesOf(e).length; });
    var i = 0, found = 0;
    var responded = false;
    function onBlur() { responded = true; }
    function onVis() { if (document.visibilityState === 'hidden') responded = true; }
    window.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVis);
    function next() {
      if (token !== detectToken) {            // 已取消/重跑
        window.removeEventListener('blur', onBlur);
        document.removeEventListener('visibilitychange', onVis);
        return;
      }
      if (i >= cands.length) {
        window.removeEventListener('blur', onBlur);
        document.removeEventListener('visibilitychange', onVis);
        if (onDone) onDone(found);
        return;
      }
      var e = cands[i++];
      responded = false;
      if (onProgress) onProgress(e, i, cands.length);
      launchEditorSchemes(e);                 // 同一手势内唤起该编辑器全部候选 Scheme
      setTimeout(function () {
        if (token !== detectToken) return;
        if (responded) { s.enabled[e.id] = true; writeStore(s); found++; }
        requestAnimationFrame(next);          // 保持临时激活窗口，继续下一个
      }, 650);
    }
    next();
  }
  function cancelDetection() { detectToken++; }

  /* ------------------------------------------------------------ 二级复制菜单 */
  var currentMenu = null;

  function closeMenu() {
    if (!currentMenu) return;
    var m = currentMenu; currentMenu = null;
    if (m._cleanup) m._cleanup();
    if (m.parentNode) m.parentNode.removeChild(m);
  }

  function badgeHTML(ed) {
    return '<span class="cm-badge" style="background:' + (ed.color || '#0f5fc9') + '">' +
      CL.Highlight.esc(ed.badge || (ed.name || '?').slice(0, 2)) + '</span>';
  }

  function openCopyMenu(anchor, getCode) {
    if (currentMenu) closeMenu();
    var code = typeof getCode === 'function' ? getCode() : getCode;

    var menu = document.createElement('div');
    menu.className = 'copy-menu';
    menu.setAttribute('role', 'menu');
    menu.innerHTML =
      '<div class="cm-head">复制代码到…</div>' +
      '<button class="cm-item cm-clip" role="menuitem">' +
        '<span class="cm-ico">' + ICO.clip + '</span>' +
        '<span class="cm-label">复制到剪切板</span>' +
        '<span class="cm-hint">Ctrl C / ⌘ C</span>' +
      '</button>' +
      '<div class="cm-sep"></div>' +
      '<div class="cm-list" id="cmList"></div>' +
      '<div class="cm-sep"></div>' +
      '<button class="cm-item cm-set" role="menuitem">' +
        '<span class="cm-ico">' + ICO.gear + '</span>' +
        '<span class="cm-label">编辑器设置…</span>' +
      '</button>';

    var list = menu.querySelector('#cmList');
    var eds = getEnabled();

    if (!eds.length) {
      list.innerHTML = '<div class="cm-empty">尚未识别到你电脑上的编辑器</div>';
      var det = document.createElement('button');
      det.className = 'cm-item cm-detect';
      det.setAttribute('role', 'menuitem');
      det.innerHTML = '<span class="cm-ico">' + ICO.search + '</span><span class="cm-label">自动识别本机编辑器</span>';
      det.addEventListener('click', function () { closeMenu(); openSettings(true); });
      list.appendChild(det);
    } else {
      eds.forEach(function (ed) {
        var b = document.createElement('button');
        b.className = 'cm-item cm-ed';
        b.setAttribute('role', 'menuitem');
        b.innerHTML = badgeHTML(ed) +
          '<span class="cm-label">复制到 ' + CL.Highlight.esc(ed.name) + '</span>' +
          '<span class="cm-hint">' + (schemesOf(ed).length ? '复制并打开' : '仅复制') + '</span>';
        b.addEventListener('click', function () {
          doCopyToEditor(ed, code, menu);
        });
        list.appendChild(b);
      });
    }

    // 固定项
    menu.querySelector('.cm-clip').addEventListener('click', function () {
      copyText(code).then(function (ok) {
        if (CL.toast) CL.toast(ok ? '已复制到剪切板' : '复制失败，请手动选择', ok ? 'ok' : 'err');
        closeMenu();
      });
    });
    menu.querySelector('.cm-set').addEventListener('click', function () {
      closeMenu();
      openSettings();
    });

    document.body.appendChild(menu);
    currentMenu = menu;
    positionMenu(menu, anchor);
    wireMenuClose(menu, anchor);

    // 默认聚焦第一项，支持键盘上下选择
    var first = menu.querySelector('.cm-item');
    if (first) first.focus();
    menu.addEventListener('keydown', onMenuKey);
  }

  function doCopyToEditor(ed, code, menu) {
    copyText(code).then(function (ok) {
      if (!ok) { if (CL.toast) CL.toast('复制失败，请手动选择', 'err'); closeMenu(); return; }
      if (schemesOf(ed).length) {
        launchEditorSchemes(ed);
        if (CL.toast) CL.toast('已复制 · 正在尝试打开 ' + ed.name + '（若未打开，请在设置确认 Scheme 或手动粘贴）', 'ok');
      } else {
        if (CL.toast) CL.toast('已复制 · ' + (ed.note ? ed.note : ed.name + ' 暂不支持自动打开'), 'ok');
      }
      closeMenu();
    });
  }

  function positionMenu(menu, anchor) {
    var r = anchor.getBoundingClientRect();
    var mw = menu.offsetWidth, mh = menu.offsetHeight;
    var top = r.bottom + 6;
    var left = r.right - mw;                 // 默认右对齐到按钮
    if (left < 8) left = 8;
    if (top + mh > global.innerHeight - 8) top = Math.max(8, r.top - mh - 6);
    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
  }

  function wireMenuClose(menu, anchor) {
    setTimeout(function () {
      document.addEventListener('click', onDocClick, true);
    }, 0);
    function onDocClick(e) {
      if (menu.contains(e.target) || anchor.contains(e.target)) return;
      closeMenu();
    }
    document.addEventListener('keydown', onKey);
    function onKey(e) { if (e.key === 'Escape') closeMenu(); }
    menu._cleanup = function () {
      document.removeEventListener('click', onDocClick, true);
      document.removeEventListener('keydown', onKey);
      menu.removeEventListener('keydown', onMenuKey);
    };
  }

  function onMenuKey(e) {
    var items = Array.prototype.slice.call(currentMenu.querySelectorAll('.cm-item'));
    if (!items.length) return;
    var i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    else if (e.key === 'Enter' && document.activeElement.classList.contains('cm-item')) {
      e.preventDefault(); document.activeElement.click();
    }
  }

  /* ------------------------------------------------------------ 设置面板 */
  var currentModal = null;

  function detectProgressCb(e, idx, total) {
    var st = currentModal && currentModal.querySelector('#edsStatus');
    if (st) st.textContent = '检测中 (' + idx + '/' + total + ')：' + e.name + ' …';
  }
  function detectDoneCb(found) {
    var st = currentModal && currentModal.querySelector('#edsStatus');
    if (st) st.textContent = found ? ('已识别 ' + found + ' 个编辑器 ✓') : '未识别到编辑器，请手动勾选';
    if (currentModal) { var rows = currentModal.querySelector('#edsRows'); if (rows) renderRows(rows); }
    if (CL.toast) CL.toast(found ? ('已自动识别 ' + found + ' 个已安装编辑器') : '未识别到编辑器，请手动勾选', found ? 'ok' : 'info');
    var btn = currentModal && currentModal.querySelector('#edsDetect');
    if (btn) { btn.disabled = false; btn.textContent = '重新检测本机编辑器'; }
  }

  function closeSettings() {
    if (currentModal && currentModal.parentNode) currentModal.parentNode.removeChild(currentModal);
    currentModal = null;
    document.removeEventListener('keydown', onModalKey);
  }
  function onModalKey(e) { if (e.key === 'Escape') closeSettings(); }

  function openSettings(autoDetect) {
    closeSettings();
    var backdrop = document.createElement('div');
    backdrop.className = 'ed-settings-backdrop';
    backdrop.innerHTML =
      '<div class="ed-settings" role="dialog" aria-modal="true" aria-label="编辑器设置">' +
        '<div class="eds-head">' +
          '<div>' +
            '<div class="eds-title">桌面编辑器</div>' +
            '<div class="eds-sub">勾选你电脑上安装的编辑器，复制代码时即可一键唤起</div>' +
          '</div>' +
          '<button class="eds-close" title="关闭" aria-label="关闭">' + ICO.x + '</button>' +
        '</div>' +
        '<div class="eds-note">提示：浏览器无法自动枚举你装了哪些软件。点「自动检测」会依次尝试唤起各编辑器来识别已装的（best-effort）。拿不准某个 Scheme 对不对？点该行「测试」按钮即可验证——应用被打开就说明正确。CodeBuddy 国内版 Scheme 为 <code>codebuddycn://</code>，Trae 国内版可能为 <code>trae-cn://</code>，均已自动兼容。</div>' +
        '<div class="eds-toolbar">' +
          '<button class="eds-detect" id="edsDetect">自动检测本机编辑器</button>' +
          '<span class="eds-status" id="edsStatus"></span>' +
        '</div>' +
        '<div class="eds-rows" id="edsRows"></div>' +
        '<div class="eds-add">' +
          '<input class="eds-in" id="edsName" placeholder="自定义编辑器名称，如 MyIDE">' +
          '<input class="eds-in" id="edsScheme" placeholder="URI Scheme，如 myide">' +
          '<button class="eds-addbtn" id="edsAdd">添加</button>' +
        '</div>' +
        '<div class="eds-foot">' +
          '<button class="eds-reset" id="edsReset">恢复默认</button>' +
          '<button class="eds-done" id="edsDone">完成</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(backdrop);
    currentModal = backdrop;
    document.addEventListener('keydown', onModalKey);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeSettings();
    });
    backdrop.querySelector('.eds-close').addEventListener('click', closeSettings);
    backdrop.querySelector('#edsDone').addEventListener('click', closeSettings);

    renderRows(backdrop.querySelector('#edsRows'));

    backdrop.querySelector('#edsAdd').addEventListener('click', function () {
      var nm = backdrop.querySelector('#edsName').value.trim();
      var sc = backdrop.querySelector('#edsScheme').value.trim();
      if (!nm) { if (CL.toast) CL.toast('请填写编辑器名称', 'err'); return; }
      addCustom(nm, sc);
      backdrop.querySelector('#edsName').value = '';
      backdrop.querySelector('#edsScheme').value = '';
      renderRows(backdrop.querySelector('#edsRows'));
      if (CL.toast) CL.toast('已添加「' + nm + '」', 'ok');
    });

    backdrop.querySelector('#edsReset').addEventListener('click', function () {
      var s = readStore(); s.enabled = {}; s.custom = []; writeStore(s);
      renderRows(backdrop.querySelector('#edsRows'));
      if (CL.toast) CL.toast('已恢复默认勾选', 'ok');
    });

    var detBtn = backdrop.querySelector('#edsDetect');
    function startDetect() {
      detBtn.disabled = true; detBtn.textContent = '检测中…'; cancelDetection();
      runDetection(detectProgressCb, detectDoneCb);
    }
    detBtn.addEventListener('click', startDetect);
    if (autoDetect) startDetect();
  }

  function renderRows(host) {
    var s = enabledMap();
    var html = '';
    KNOWN.forEach(function (e) {
      var on = s.enabled.hasOwnProperty(e.id) ? !!s.enabled[e.id] : !!e.def;
      html += rowHTML(e.id, e.name, e.color, e.badge, on, e.note, false, schemesOf(e));
    });
    s.custom.forEach(function (c) {
      html += rowHTML(c.id, c.name, c.color, c.badge, true, '', true, schemesOf(c));
    });
    host.innerHTML = html;

    host.querySelectorAll('.eds-row').forEach(function (row) {
      var id = row.getAttribute('data-id');
      var sw = row.querySelector('.eds-switch');
      sw.addEventListener('change', function () {
        if (row.getAttribute('data-custom') === '1') {
          // 自定义项开关关掉即删除
          if (!sw.checked) { removeCustom(id); renderRows(host); }
        } else {
          setEnabled(id, sw.checked);
        }
      });
      var del = row.querySelector('.eds-del');
      if (del) del.addEventListener('click', function () { removeCustom(id); renderRows(host); });
      var test = row.querySelector('.eds-test');
      if (test) test.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var id = row.getAttribute('data-id');
        var schemes; try { schemes = JSON.parse(test.getAttribute('data-schemes')); } catch (e2) { schemes = []; }
        var nm = (row.querySelector('.eds-name') || {}).textContent || '编辑器';
        if (!schemes.length) { if (CL.toast) CL.toast(nm + ' 未配置 Scheme，请在输入框填写', 'info'); return; }

        // 真诊断：在用户手势内逐个试候选 Scheme，监听 window 失焦 / 页面隐藏判定成功
        var i = 0, done = false, responded = false;
        var onBlur = function () { responded = true; };
        var onVis = function () { if (document.visibilityState === 'hidden') responded = true; };
        window.addEventListener('blur', onBlur);
        document.addEventListener('visibilitychange', onVis);

        if (CL.toast) CL.toast('正在逐项测试 ' + nm + ' 的 Scheme…（请允许浏览器打开应用）', 'info');
        function next() {
          if (done) return;
          if (i >= schemes.length) {
            window.removeEventListener('blur', onBlur);
            document.removeEventListener('visibilitychange', onVis);
            if (CL.toast) CL.toast('未检测到 ' + nm + ' 的有效 Scheme（本机可能未注册该 URI 协议）', 'info');
            return;
          }
          var sc = schemes[i++];
          responded = false;
          if (CL.toast) CL.toast('测试 ' + sc + ' …', 'info');
          tryAnchorLaunch(sc);
          setTimeout(function () {
            if (done) return;
            if (responded) {
              done = true;
              window.removeEventListener('blur', onBlur);
              document.removeEventListener('visibilitychange', onVis);
              setEnabled(id, true);
              var sw = row.querySelector('.eds-switch'); if (sw) sw.checked = true;
              if (CL.toast) CL.toast('✓ ' + sc + ' 有效 · 已自动启用 ' + nm, 'ok');
            } else {
              requestAnimationFrame(next);
            }
          }, 750);
        }
        next();
      });
    });
  }

  function rowHTML(id, name, color, badge, on, note, custom, schemesArr) {
    var canTest = schemesArr && schemesArr.length;
    var testBtn = canTest
      ? '<button class="eds-test" type="button" data-schemes="' + CL.Highlight.esc(JSON.stringify(schemesArr)).replace(/"/g, '&quot;') + '" title="测试唤起该编辑器">测试</button>'
      : '';
    return '<div class="eds-row' + (custom ? ' eds-row-custom' : '') + '" data-id="' + CL.Highlight.esc(id) + '" data-custom="' + (custom ? 1 : 0) + '">' +
      '<span class="eds-badge" style="background:' + (color || '#0f5fc9') + '">' + CL.Highlight.esc(badge || (name || '?').slice(0, 2)) + '</span>' +
      '<div class="eds-meta">' +
        '<div class="eds-name">' + CL.Highlight.esc(name) + '</div>' +
        (note ? '<div class="eds-tip">' + CL.Highlight.esc(note) + '</div>' : '') +
      '</div>' +
      testBtn +
      (custom ? '<button class="eds-del" title="删除">' + ICO.trash + '</button>' : '') +
      '<label class="eds-switchwrap">' +
        '<input type="checkbox" class="eds-switch"' + (on ? ' checked' : '') + '>' +
        '<span class="eds-track"><span class="eds-thumb"></span></span>' +
      '</label>' +
    '</div>';
  }

  /* ------------------------------------------------------------ 图标 */
  var ICO = {
    clip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="7 5 19 12 7 19 7 5"/></svg>'
  };

  /* ------------------------------------------------------------ 导出 */
  CL.Editors = {
    openCopyMenu: openCopyMenu,
    openSettings: openSettings,
    getEnabled: getEnabled,
    setEnabled: setEnabled,
    addCustom: addCustom,
    removeCustom: removeCustom,
    detect: runDetection,
    KNOWN: KNOWN
  };

  /* ------------------------------------------------------------ 首次访问提示 */
  // 浏览器禁止无用户手势静默唤起外部程序，故不自动扫描；只在首次访问给一句轻提示，
  // 引导用户通过「复制 → 自动识别」来识别本机编辑器。
  function maybeGreet() {
    var s = readStore();
    if (s.greeted) return;
    s.greeted = true; writeStore(s);
    if (CL.toast) CL.toast('点代码卡片「复制」→「自动识别」可一键唤起你装的编辑器', 'info');
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(maybeGreet, 700);
  } else {
    window.addEventListener('DOMContentLoaded', function () { setTimeout(maybeGreet, 500); });
  }

})(window);
