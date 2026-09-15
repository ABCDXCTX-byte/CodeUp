/* ==========================================================================
   CodeUp码上 · data/tutorials.js — 教程注册器与 block schema 定义
   --------------------------------------------------------------------------
   Block 类型一览（所有教程内容一律用这些类型拼装）：

     { t:'p',    x:'段落文本，支持 `行内代码` 与 **加粗**' }
     { t:'h2',   x:'二级标题' }
     { t:'h3',   x:'三级标题' }
     { t:'ul',   x:['列表项', '列表项'] }
     { t:'ol',   x:['有序项', '有序项'] }
     { t:'code', lang:'python', title:'标题', code:'...',
                 run:true,          // 显示运行按钮
                 ed:true,           // 直接以可编辑模式呈现
                 expect:'预期输出',  // 降级时展示
                 note:'代码下方的说明' }
     { t:'note', k:'tip|warn|danger|info', title:'标题', x:'内容' }
     { t:'table',head:['列1','列2'], rows:[['a','b'], ['c','d']] }
     { t:'defs', x:[{ term:'术语', desc:'解释' }] }
     { t:'kp',   x:['要点1', '要点2'] }
     { t:'cmp',  title:'对比标题', x:{ python:'...', java:'...' } }
     { t:'ex',   q:'题目描述', lang:'python', code:[...], expect:'输出',
                 hint:'提示(可选)', ans:'参考答案+解析' }
     { t:'think',q:'问题', ans:'参考答案' }

   约定：
     - code 中禁止使用 Tab，统一 4 空格（渲染时会做一次规整）
     - expect 为程序标准输出的完整文本（不含结尾换行）
     - 章节 id 使用小写连字符：overview / setup / basics ...
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL = global.CL || {};

  var store = {};       // langId -> { chapters: [...] }
  var order = [];       // langId 注册顺序

  /**
   * 注册一门语言的教程
   * @param {string} langId
   * @param {{chapters: Array}} data
   */
  function register(langId, data) {
    data = data || {};
    var chapters = data.chapters || [];
    // 预处理：为每章补 index / 规整代码缩进
    chapters.forEach(function (ch, i) {
      ch.index = i;
      ch.lang = langId;
      if (!ch.id) ch.id = 'ch' + (i + 1);
      (ch.blocks || []).forEach(normBlock);
    });
    store[langId] = { chapters: chapters };
    if (order.indexOf(langId) < 0) order.push(langId);
  }

  function normBlock(b) {
    if (!b) return b;
    if (b.t === 'code' || b.t === 'ex') {
      // 代码可用数组书写（推荐，避免模板字符串转义陷阱）
      if (Array.isArray(b.code)) b.code = tidy(b.code.join('\n'));
      else if (typeof b.code === 'string') b.code = tidy(b.code);
      if (b.expect != null) b.expect = String(b.expect).replace(/\n+$/, '');
    }
    if (b.t === 'cmp' && b.x) {
      Object.keys(b.x).forEach(function (k) {
        if (typeof b.x[k] === 'string') b.x[k] = tidy(b.x[k]);
      });
    }
    return b;
  }

  /** 去掉首尾空行、统一成 4 空格缩进 */
  function tidy(code) {
    var s = String(code == null ? '' : code);
    s = s.replace(/\r\n/g, '\n').replace(/\t/g, '    ');
    s = s.replace(/^\n+/, '').replace(/\s+$/, '');
    // 去掉首尾的连续空行（而不只是第一行/最后一行）
    var lines = s.split('\n');
    var start = 0, end = lines.length;
    while (start < end && lines[start].trim() === '') start++;
    while (end > start && lines[end - 1].trim() === '') end--;
    lines = lines.slice(start, end);
    // 去掉公共前导缩进
    var min = Infinity;
    lines.forEach(function (l) {
      if (!l.trim()) return;
      var m = l.match(/^ */);
      if (m) min = Math.min(min, m[0].length);
    });
    if (min > 0 && min < Infinity) {
      s = lines.map(function (l) { return l.slice(min); }).join('\n');
    } else {
      s = lines.join('\n');
    }
    return s;
  }

  CL.Tutorials = {
    register: register,
    tidy: tidy,
    get: function (langId) { return store[langId] || null; },
    chapters: function (langId) { return store[langId] ? store[langId].chapters : []; },
    chapter: function (langId, chId) {
      var cs = store[langId] ? store[langId].chapters : [];
      for (var i = 0; i < cs.length; i++) if (cs[i].id === chId) return cs[i];
      return null;
    },
    count: function (langId) { return store[langId] ? store[langId].chapters.length : 0; },
    has: function (langId) { return !!store[langId]; },
    all: function () { return order.slice(); },
    _store: store
  };

})(window);
