/* ==========================================================================
   CodeUp码上 · router.js — 极简 hash 路由
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL = global.CL || {};

  var routes = [];
  var fallback = null;
  var current = null;

  /**
   * 注册路由。pattern 形如 '/languages/:lang/:chapter'
   */
  function add(pattern, handler) {
    var keys = [];
    var regex = new RegExp('^' + pattern.replace(/\/:([\w]+)/g, function (_, k) {
      keys.push(k);
      return '/([^/]+)';
    }).replace(/\//g, '\\/') + '$');
    routes.push({ regex: regex, keys: keys, handler: handler, pattern: pattern });
  }

  function notFound(handler) { fallback = handler; }

  function parse(hash) {
    var path = String(hash || '').replace(/^#/, '');
    if (!path || path === '/') path = '/';
    path = path.replace(/\/+$/, '') || '/';
    var qs = '';
    var qi = path.indexOf('?');
    if (qi >= 0) { qs = path.slice(qi + 1); path = path.slice(0, qi); }

    for (var i = 0; i < routes.length; i++) {
      var m = routes[i].regex.exec(path);
      if (m) {
        var params = {};
        for (var k = 0; k < routes[i].keys.length; k++) {
          params[routes[i].keys[k]] = decodeURIComponent(m[k + 1]);
        }
        return { path: path, params: params, query: qs, route: routes[i] };
      }
    }
    return { path: path, params: {}, query: qs, route: null };
  }

  function go(path, replace) {
    var target = '#' + (path.indexOf('/') === 0 ? path : '/' + path);
    if (global.location.hash === target) { resolve(); return; }
    if (replace && global.history && global.history.replaceState) {
      global.history.replaceState(null, '', target);
      resolve();
    } else {
      global.location.hash = target;
    }
  }

  var handler = null;

  function resolve() {
    var r = parse(global.location.hash);
    current = r;
    if (!handler) return;
    if (r.route) r.route.handler(r.params, r);
    else if (fallback) fallback(r);
  }

  function init(fn) {
    handler = fn;
    global.addEventListener('hashchange', resolve);
    if (!global.location.hash) {
      if (global.history && global.history.replaceState) {
        global.history.replaceState(null, '', '#/');
      } else global.location.hash = '#/';
    }
    resolve();
  }

  function currentPath() { return current ? current.path : '/'; }

  CL.Router = {
    add: add,
    notFound: notFound,
    init: init,
    go: go,
    resolve: resolve,
    parse: parse,
    current: currentPath
  };

})(window);
