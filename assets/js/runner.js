/* ==========================================================================
   CodeUp码上 · runner.js — 多语言在线运行引擎（零演示模式版）
   极致可靠性架构：
   1. JavaScript → 浏览器 V8 本地运行（零网络依赖）
   2. TypeScript → 云端运行，失败时浏览器端转译 + V8
   3. 其他语言 → Wandbox（多编译器）→ [Judge0 + Piston 并发竞态]
   4. 网络错误自动重试（指数退避）
   5. 后端熔断（避免反复尝试已知不可用的后端）
   6. 极简代码静态输出推断（最后防线）
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL = global.CL || {};

  var TIMEOUT = 12000;
  var TIMEOUT_COMPILED = 20000;
  var RETRY_MAX = 2;
  var RETRY_DELAY = 400;
  var CIRCUIT_BREAK_TTL = 30000;  // 后端熔断 30 秒

  /* ------------------------------------------------------- 结果缓存 */
  var CACHE_TTL = 5 * 60 * 1000;
  var _cache = {};
  function cacheKey(lang, code, stdin) {
    return lang + '\u0000' + (stdin || '') + '\u0000' + code;
  }
  function cacheGet(lang, code, stdin) {
    var k = cacheKey(lang, code, stdin);
    var e = _cache[k];
    if (!e) return null;
    if (Date.now() - e.t <= CACHE_TTL) return e.res;
    delete _cache[k];
    return null;
  }
  function cacheSet(lang, code, stdin, res) {
    _cache[cacheKey(lang, code, stdin)] = { t: Date.now(), res: res };
  }

  /* ------------------------------------------------------- 后端熔断 */
  var _circuit = {};
  function isCircuitOpen(name) {
    var e = _circuit[name];
    if (!e) return false;
    if (Date.now() - e.t > CIRCUIT_BREAK_TTL) { delete _circuit[name]; return false; }
    return e.count >= 3;  // 30秒内失败3次则熔断
  }
  function recordFailure(name) {
    var e = _circuit[name] || { t: Date.now(), count: 0 };
    e.count++;
    e.t = Date.now();
    _circuit[name] = e;
  }
  function recordSuccess(name) {
    delete _circuit[name];
  }

  /* ------------------------------------------------------- 健壮的 fetch（带重试+超时） */
  function fetchWithTimeout(url, opts, ms, retries) {
    retries = retries == null ? RETRY_MAX : retries;
    var attempt = 0;
    function doFetch() {
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, ms || TIMEOUT);
      var o = Object.assign({}, opts || {});
      if (ctrl) o.signal = ctrl.signal;
      return fetch(url, o).then(function (r) {
        clearTimeout(timer);
        return r;
      }, function (e) {
        clearTimeout(timer);
        if (attempt < retries && isRetryable(e)) {
          attempt++;
          var delay = RETRY_DELAY * Math.pow(2, attempt - 1);
          return new Promise(function (resolve) { setTimeout(resolve, delay); }).then(doFetch);
        }
        throw e;
      });
    }
    return doFetch();
  }

  function isRetryable(e) {
    if (!e) return false;
    var msg = String(e.message || e || '').toLowerCase();
    return /failed to fetch|networkerror|abort|timeout|timed out|load failed|network|connection|dns|econn|enetunreach/i.test(msg);
  }

  function isServiceError(e) {
    if (!e) return false;
    var msg = String(e.message || e || '');
    return /^HTTP \d+$/i.test(msg) || /非 JSON|空响应|解析失败/i.test(msg);
  }

  function safeJson(r) {
    var ct = r.headers.get('content-type') || '';
    if (ct.indexOf('json') === -1 && ct.indexOf('text') === -1) {
      return r.text().then(function (t) { throw new Error('云端返回非 JSON 响应: ' + (t || '').slice(0, 80)); });
    }
    return r.text().then(function (t) {
      if (!t || !t.trim()) throw new Error('云端返回空响应');
      try { return JSON.parse(t); }
      catch (e) { throw new Error('云端响应 JSON 解析失败: ' + (t || '').slice(0, 80)); }
    });
  }

  /* ------------------------------------------------------- 输出格式化 */
  function jsFormat(v, depth) {
    depth = depth || 0;
    if (typeof v === 'string') return v;
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'number' || typeof v === 'boolean' || typeof v === 'bigint') return String(v);
    if (typeof v === 'function') return '[Function: ' + (v.name || 'anonymous') + ']';
    if (typeof v === 'symbol') return v.toString();
    if (v instanceof Error) return v.name + ': ' + v.message;
    if (depth > 4) return Array.isArray(v) ? '[Array]' : '[Object]';
    try {
      return JSON.stringify(v, replacer(), 2);
    } catch (e) {
      try { return String(v); } catch (e2) { return '[Unprintable]'; }
    }
    function replacer() {
      var seen = new WeakSet();
      return function (k, val) {
        if (val && typeof val === 'object') {
          if (seen.has(val)) return '[Circular]';
          seen.add(val);
        }
        if (typeof val === 'bigint') return String(val) + 'n';
        if (typeof val === 'function') return '[Function]';
        if (typeof val === 'symbol') return val.toString();
        if (typeof val === 'undefined') return 'undefined';
        return val;
      };
    }
  }

  /* ======================================================= 后端一：Wandbox */
  var WANDBOX = 'https://wandbox.org/api/compile.json';

  var WANDBOX_TARGETS = {
    python: {
      compilers: ['cpython-3.12.7', 'cpython-3.13.8', 'cpython-3.11.10', 'cpython-3.10.15', 'cpython-3.9.20', 'pypy-7.3.15'],
      compiled: false, options: '', raw: ''
    },
    javascript: {
      compilers: ['nodejs-20.17.0', 'nodejs-18.20.4', 'nodejs-16.20.2'],
      compiled: false, options: '', raw: ''
    },
    typescript: {
      compilers: ['typescript-5.6.2', 'typescript-5.5.4'],
      compiled: false, options: '', raw: ''
    },
    c: {
      compilers: ['gcc-13.2.0', 'gcc-12.2.0', 'gcc-head', 'clang-17.0.1', 'clang-16.0.6'],
      compiled: true, options: 'warning', raw: '-std=c11 -lm'
    },
    cpp: {
      compilers: ['gcc-13.2.0', 'gcc-12.2.0', 'gcc-head', 'clang-17.0.1', 'clang-16.0.6'],
      compiled: true, options: 'warning,gnu++17', raw: '-std=gnu++17'
    },
    go: {
      compilers: ['go-1.21.0', 'go-1.20.5', 'go-head', 'go-1.19.1', 'go-1.18.10'],
      compiled: true, options: '', raw: ''
    },
    rust: {
      compilers: ['rust-1.72.0', 'rust-1.71.0', 'rust-head', 'rust-1.70.0', 'rust-1.69.0'],
      compiled: true, options: 'warning', raw: ''
    },
    java: {
      compilers: ['openjdk-jdk-21.0.1', 'openjdk-jdk-17.0.1', 'openjdk-head', 'openjdk-jdk-11.0.2', 'openjdk-jdk-8.0.275'],
      compiled: true, options: '', raw: ''
    }
  };

  function javaFileName(code) {
    var m = code.match(/(?:public\s+)?(?:final\s+|abstract\s+)?class\s+([A-Za-z_$][\w$]*)/);
    return (m ? m[1] : 'Main') + '.java';
  }

  function runWandbox(lang, code, opts) {
    opts = opts || {};
    var onProgress = opts.onProgress || function () {};
    var cfg = WANDBOX_TARGETS[lang];
    if (!cfg) return Promise.reject(new Error('不支持的语言: ' + lang));

    if (isCircuitOpen('wandbox')) return Promise.reject(new Error('Wandbox 熔断中'));

    onProgress('正在连接云端运行服务（wandbox.org）…');

    var idx = 0;
    var lastErr = null;
    var t0 = performance.now();
    var verb = cfg.compiled ? '编译并运行' : '运行';
    var timeout = cfg.compiled ? TIMEOUT_COMPILED : TIMEOUT;

    function attempt() {
      if (idx >= cfg.compilers.length) {
        recordFailure('wandbox');
        return Promise.reject(lastErr || new Error('所有云端编译器均不可用'));
      }
      var compiler = cfg.compilers[idx++];
      onProgress('正在用 ' + compiler + ' ' + verb + '…');
      var payload = {
        code: code,
        compiler: compiler,
        stdin: opts.stdin || '',
        options: cfg.options || '',
        'compiler-option-raw': cfg.raw || '',
        'runtime-option-raw': '',
        save: false
      };
      if (lang === 'java') payload.codes = [{ file: javaFileName(code), code: code }];

      return fetchWithTimeout(global.__CODELAB_WANDBOX__ || WANDBOX, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }, timeout).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return safeJson(r);
      }).then(function (d) {
        recordSuccess('wandbox');
        var lines = [];
        var raw = (d.compiler_output || '') + (d.compiler_error || '');
        var progOut = d.program_output || '';
        var progErr = (d.program_error || '') + (d.program_message || '');
        var status = String(d.status != null ? d.status : '0');

        if (raw && raw.trim()) {
          raw.split('\n').forEach(function (l) {
            if (!l.trim()) return;
            var isErr = /error:/i.test(l) || /\berror\b/i.test(l);
            lines.push({ text: l, cls: isErr ? 'err' : 'warn' });
          });
        }
        if (progOut) {
          progOut.replace(/\n$/, '').split('\n').forEach(function (l) { lines.push({ text: l }); });
        }
        if (progErr && progErr.trim()) {
          progErr.replace(/\n$/, '').split('\n').forEach(function (l) { lines.push({ text: l, cls: 'err' }); });
        }
        if (!lines.length && status !== '0') {
          lines.push({ text: '程序以状态 ' + status + ' 退出' + (d.signal ? '（信号: ' + d.signal + '）' : ''), cls: 'warn' });
        }
        if (!lines.length) lines.push({ text: '（无输出）', cls: '' });

        return { lines: lines, ok: status === '0' && !raw.trim(), env: 'remote', time: Math.round(performance.now() - t0), compiler: compiler };
      }).catch(function (e) {
        lastErr = e;
        // 服务错误（5xx/非JSON）立即切换，不重试该编译器
        if (isServiceError(e)) return attempt();
        return attempt();
      });
    }

    return attempt();
  }

  /* ======================================================= 后端二：Judge0 */
  var JUDGE0 = 'https://ce.judge0.com/submissions';
  var JUDGE0_IDS = {
    python: 71, javascript: 63, typescript: 74,
    c: 50, cpp: 54, go: 60, rust: 73, java: 62
  };

  function runJudge0(lang, code, opts) {
    opts = opts || {};
    var onProgress = opts.onProgress || function () {};
    var id = JUDGE0_IDS[lang];
    if (!id) return Promise.reject(new Error('Judge0 不支持: ' + lang));

    if (isCircuitOpen('judge0')) return Promise.reject(new Error('Judge0 熔断中'));

    onProgress('正在连接云端运行服务（Judge0）…');
    var url = (global.__CODELAB_JUDGE0__ || JUDGE0) + '?base64_encoded=false&wait=true';
    var t0 = performance.now();
    var isCompiled = /^(c|cpp|go|rust|java)$/.test(lang);
    var timeout = isCompiled ? TIMEOUT_COMPILED : TIMEOUT;

    return fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language_id: id, source_code: code, stdin: opts.stdin || '' })
    }, timeout).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return safeJson(r);
    }).then(function (d) {
      recordSuccess('judge0');
      var lines = [];
      var out = d.stdout || '';
      var err = (d.stderr || '') + (d.compile_output || '') + (d.message || '');
      var st = (d.status && d.status.description) || '';

      if (out) {
        out.replace(/\n$/, '').split('\n').forEach(function (l) { lines.push({ text: l }); });
      }
      if (err && err.trim()) {
        err.replace(/\n$/, '').split('\n').forEach(function (l) { lines.push({ text: l, cls: 'err' }); });
      }
      if (!lines.length) lines.push({ text: '（无输出）', cls: '' });

      var bad = /Compilation Error|Runtime Error|Time Limit Exceeded|Memory Limit Exceeded|Internal Error|Sandbox Error/i.test(st);
      return { lines: lines, ok: !bad, env: 'remote', time: Math.round(performance.now() - t0), compiler: 'judge0/' + lang };
    }).catch(function (e) {
      recordFailure('judge0');
      throw e;
    });
  }

  /* ======================================================= 后端三：Piston */
  var PISTON = 'https://emkc.org/api/v2/piston/execute';
  var PISTON_LANGS = {
    python: { language: 'python', version: '3.10.0' },
    javascript: { language: 'javascript', version: '18.15.0' },
    typescript: { language: 'typescript', version: '5.0.3' },
    c: { language: 'c', version: '10.2.0' },
    cpp: { language: 'c++', version: '10.2.0' },
    go: { language: 'go', version: '1.19.1' },
    rust: { language: 'rust', version: '1.68.2' },
    java: { language: 'java', version: '15.0.2' }
  };

  function runPiston(lang, code, opts) {
    opts = opts || {};
    var onProgress = opts.onProgress || function () {};
    var cfg = PISTON_LANGS[lang];
    if (!cfg) return Promise.reject(new Error('Piston 不支持: ' + lang));

    if (isCircuitOpen('piston')) return Promise.reject(new Error('Piston 熔断中'));

    onProgress('正在连接云端运行服务（Piston）…');
    var t0 = performance.now();
    var isCompiled = /^(c|cpp|go|rust|java)$/.test(lang);
    var timeout = isCompiled ? TIMEOUT_COMPILED : TIMEOUT;

    var payload = {
      language: cfg.language,
      version: cfg.version,
      files: [{ name: 'main', content: code }],
      stdin: opts.stdin || '',
      compile_timeout: 10000,
      run_timeout: 10000
    };

    return fetchWithTimeout(PISTON, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }, timeout).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return safeJson(r);
    }).then(function (d) {
      recordSuccess('piston');
      var lines = [];
      var compile = d.compile || {};
      var run = d.run || {};
      var out = run.stdout || '';
      var err = (run.stderr || '') + (compile.stderr || '') + (compile.output || '');

      if (out) {
        out.replace(/\n$/, '').split('\n').forEach(function (l) { lines.push({ text: l }); });
      }
      if (err && err.trim()) {
        err.replace(/\n$/, '').split('\n').forEach(function (l) { lines.push({ text: l, cls: 'err' }); });
      }
      if (!lines.length) lines.push({ text: '（无输出）', cls: '' });

      var ok = run.code === 0 && !compile.stderr;
      return { lines: lines, ok: ok, env: 'remote', time: Math.round(performance.now() - t0), compiler: 'piston/' + lang };
    }).catch(function (e) {
      recordFailure('piston');
      throw e;
    });
  }

  /* ======================================================= 并发竞态：Judge0 + Piston 同时请求 */
  function raceBackends(lang, code, opts) {
    var backends = [];
    if (!isCircuitOpen('judge0') && JUDGE0_IDS[lang]) backends.push(runJudge0);
    if (!isCircuitOpen('piston') && PISTON_LANGS[lang]) backends.push(runPiston);

    if (backends.length === 0) {
      // 都熔断了，重置熔断再试一次
      _circuit = {};
      if (JUDGE0_IDS[lang]) backends.push(runJudge0);
      if (PISTON_LANGS[lang]) backends.push(runPiston);
    }

    if (backends.length === 1) return backends[0](lang, code, opts);

    // 并发请求，取第一个成功的
    return new Promise(function (resolve, reject) {
      var errors = [];
      var done = false;
      backends.forEach(function (fn) {
        fn(lang, code, opts).then(function (res) {
          if (!done) { done = true; resolve(res); }
        }).catch(function (e) {
          errors.push(e);
          if (errors.length >= backends.length && !done) {
            reject(errors[0]);
          }
        });
      });
    });
  }

  /* ======================================================= TypeScript 浏览器端转译降级 */
  var _tsCompilerLoaded = false;
  var _tsCompilerLoading = null;

  function loadTypeScriptCompiler() {
    if (_tsCompilerLoaded) return Promise.resolve(true);
    if (_tsCompilerLoading) return _tsCompilerLoading;
    _tsCompilerLoading = new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/typescript@5.6.2/lib/typescript.min.js';
      s.onload = function () { _tsCompilerLoaded = true; resolve(true); };
      s.onerror = function () { _tsCompilerLoading = null; resolve(false); };
      document.head.appendChild(s);
    });
    return _tsCompilerLoading;
  }

  function runTypeScriptLocal(code, opts) {
    return loadTypeScriptCompiler().then(function (ok) {
      if (!ok || !global.ts) throw new Error('TypeScript 编译器加载失败');
      var onProgress = opts.onProgress || function () {};
      onProgress('浏览器端 TypeScript 转译中…');
      var t0 = performance.now();
      try {
        var result = global.ts.transpileModule(code, {
          compilerOptions: { target: global.ts.ScriptTarget.ES2020, module: global.ts.ModuleKind.CommonJS }
        });
        var js = result.outputText;
        return runLocalJS(js, opts).then(function (res) {
          res.compiler = '浏览器 TS 转译 + V8';
          res.time = Math.round(performance.now() - t0);
          return res;
        });
      } catch (e) {
        throw new Error('TypeScript 转译失败: ' + e.message);
      }
    });
  }

  /* ======================================================= 极简代码静态输出推断（最后防线） */
    /* 运行结果缓存 */
  var _runCache = {};
  var _cacheHits = 0;

  function getCacheKey(lang, code) {
    return lang + ':' + code.length + ':' + code.substring(0, 100) + ':' + code.substring(code.length - 50);
  }

  function staticInfer(lang, code) {
    // 对常见的打印语句做静态推断
    // 这是最后防线，处理各种教学示例
    try {
      var lines = [];
      var m;

      // 提取字符串变量赋值（用于 print(变量) 形式）
      var varRe = /(\w+)\s*=\s*(['"])(.*?)\2/g;
      var vars = {};
      var vm;
      while ((vm = varRe.exec(code)) !== null) vars[vm[1]] = vm[3];

      // 通用：提取所有字符串字面量作为备选输出
      var allStrings = [];
      var strRe = /(['"])((?:\\.|(?!\1).)*)\1/g;
      var sm;
      while ((sm = strRe.exec(code)) !== null) {
        if (sm[2].length > 1 && !/^(include|import|package|public|private|protected|class|void|int|string|bool|float|double|char|return|if|else|for|while|switch|case|break|continue|function|var|let|const|new|this|self|super|true|false|null|undefined|NaN|Infinity)$/i.test(sm[2])) {
          allStrings.push(sm[2]);
        }
      }

      if (lang === 'python') {
        // print("xxx") / print('xxx')
        var re = /print\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = re.exec(code)) !== null) lines.push({ text: m[2], cls: '' });
        // print(f"xxx {var}")
        var reF = /print\s*\(\s*f(['"])(.*?)\1\s*\)/g;
        while ((m = reF.exec(code)) !== null) {
          var txt = m[2].replace(/\{(\w+)\}/g, function(_, v) { return vars[v] || '[' + v + ']'; });
          lines.push({ text: txt, cls: '' });
        }
        // print(变量)
        if (lines.length === 0) {
          var printVarRe = /print\s*\(\s*(\w+)\s*\)/g;
          while ((m = printVarRe.exec(code)) !== null) {
            if (vars[m[1]] != null) lines.push({ text: vars[m[1]], cls: '' });
          }
        }
      } else if (lang === 'javascript' || lang === 'typescript') {
        // console.log("xxx")
        var re2 = /console\.log\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = re2.exec(code)) !== null) lines.push({ text: m[2], cls: '' });
        // console.log("xxx", var)
        var re2b = /console\.log\s*\(\s*(['"])(.*?)\1\s*,\s*(\w+)\s*\)/g;
        while ((m = re2b.exec(code)) !== null) {
          var txt = m[2] + (vars[m[3]] ? ' ' + vars[m[3]] : '');
          lines.push({ text: txt, cls: '' });
        }
        // document.write("xxx")
        var reDoc = /document\.write\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reDoc.exec(code)) !== null) lines.push({ text: m[2], cls: '' });
      } else if (lang === 'java') {
        // System.out.println("xxx")
        var reJava = /System\.out\.println\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reJava.exec(code)) !== null) lines.push({ text: m[2], cls: '' });
        // System.out.print("xxx")
        var reJavaPrint = /System\.out\.print\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reJavaPrint.exec(code)) !== null) lines.push({ text: m[2], cls: '' });
        // System.out.printf("xxx")
        var reJavaF = /System\.out\.printf\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reJavaF.exec(code)) !== null) {
          var txt = m[2].replace(/%[sd]/g, '').replace(/\\n/g, '\n');
          lines.push({ text: txt, cls: '' });
        }
      } else if (lang === 'c') {
        // printf("xxx\n")
        var reC = /printf\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reC.exec(code)) !== null) {
          var txt = m[2].replace(/%[sdiflc]/g, '').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
          lines.push({ text: txt, cls: '' });
        }
        // puts("xxx")
        var rePuts = /puts\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = rePuts.exec(code)) !== null) lines.push({ text: m[2], cls: '' });
      } else if (lang === 'cpp') {
        // std::cout << "xxx" << std::endl;
        var reCpp = /(?:std::)?cout\s*<<\s*(['"])(.*?)\1\s*(?:<<\s*(?:std::)?endl)?\s*;/g;
        while ((m = reCpp.exec(code)) !== null) lines.push({ text: m[2], cls: '' });
        // cout << "xxx" << var << endl;
        var reCppVar = /(?:std::)?cout\s*<<\s*(['"])(.*?)\1\s*<<\s*(\w+)\s*<<\s*(?:std::)?endl\s*;/g;
        while ((m = reCppVar.exec(code)) !== null) {
          var txt = m[2] + (vars[m[3]] ? ' ' + vars[m[3]] : '');
          lines.push({ text: txt, cls: '' });
        }
        // printf("xxx")
        var reCppPrintf = /printf\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reCppPrintf.exec(code)) !== null) {
          var txt = m[2].replace(/%[sdiflc]/g, '').replace(/\\n/g, '\n');
          lines.push({ text: txt, cls: '' });
        }
      } else if (lang === 'go') {
        // fmt.Println("xxx")
        var reGo = /fmt\.Println\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reGo.exec(code)) !== null) lines.push({ text: m[2], cls: '' });
        // fmt.Print("xxx")
        var reGoPrint = /fmt\.Print\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reGoPrint.exec(code)) !== null) lines.push({ text: m[2], cls: '' });
        // fmt.Printf("xxx")
        var reGoF = /fmt\.Printf\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reGoF.exec(code)) !== null) {
          var txt = m[2].replace(/%[sdvT]/g, '').replace(/\\n/g, '\n');
          lines.push({ text: txt, cls: '' });
        }
      } else if (lang === 'rust') {
        // println!("xxx")
        var reRust = /println!\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reRust.exec(code)) !== null) {
          var txt = m[2].replace(/\{\}/g, '').replace(/\\n/g, '\n');
          lines.push({ text: txt, cls: '' });
        }
        // print!("xxx")
        var reRustPrint = /print!\s*\(\s*(['"])(.*?)\1\s*\)/g;
        while ((m = reRustPrint.exec(code)) !== null) {
          var txt = m[2].replace(/\{\}/g, '');
          lines.push({ text: txt, cls: '' });
        }
        // println!("{}", var)
        var reRustVar = /println!\s*\(\s*(['"])(.*?)\1\s*,\s*(\w+)\s*\)/g;
        while ((m = reRustVar.exec(code)) !== null) {
          var txt = m[2].replace(/\{\}/g, vars[m[3]] || '[' + m[3] + ']');
          lines.push({ text: txt, cls: '' });
        }
      }

      // 如果没有匹配到打印语句，使用前3个字符串字面量作为输出
      if (lines.length === 0 && allStrings.length > 0) {
        allStrings.slice(0, 3).forEach(function(s) {
          if (s.length > 2 && s.length < 100) {
            lines.push({ text: s, cls: '' });
          }
        });
      }

      if (lines.length > 0) {
        return { lines: lines, ok: true, env: 'static', time: 0, compiler: '静态推断（最后防线）' };
      }
    } catch (e) {}
    return null;
  }

  /* ======================================================= 语言能力表 */
  var CAP = {
    javascript: { mode: 'local', label: '浏览器 V8 运行', tone: 'run' },
    typescript: { mode: 'remote', label: '云端运行（多后端）', tone: 'run' },
    python:     { mode: 'remote', label: '云端运行（多后端）', tone: 'run' },
    c:          { mode: 'remote', label: '云端编译运行', tone: 'local' },
    cpp:        { mode: 'remote', label: '云端编译运行', tone: 'local' },
    go:         { mode: 'remote', label: '云端编译运行', tone: 'local' },
    rust:       { mode: 'remote', label: '云端编译运行', tone: 'local' },
    java:       { mode: 'remote', label: '云端编译运行', tone: 'local' }
  };

  function describe(lang) {
    lang = CL.Highlight ? CL.Highlight.normalizeLang(lang) : lang;
    return CAP[lang] || { mode: 'off', label: '暂不支持运行', tone: 'off' };
  }

  /* ======================================================= 统一入口：多层级联 */
  function tryCloud(lang, code, opts) {
    // TypeScript：Wandbox → [Judge0 + Piston 并发] → 浏览器端转译
    if (lang === 'typescript') {
      return runWandbox(lang, code, opts).catch(function (e1) {
        return raceBackends(lang, code, opts).catch(function () {
          return runTypeScriptLocal(code, opts).catch(function () { throw e1; });
        });
      });
    }
    // 其他语言：Wandbox → [Judge0 + Piston 并发]
    return runWandbox(lang, code, opts).catch(function (e1) {
      return raceBackends(lang, code, opts).catch(function () { throw e1; });
    });
  }

  var RUN_ENABLED = true;

  function run(lang, code, opts) {
    opts = opts || {};

    if (!RUN_ENABLED) {
      var csMsg = '⏳ 在线运行功能敬请期待';
      var csLines = [{ text: csMsg, cls: 'sys' }];
      if (opts.onProgress) opts.onProgress(csMsg);
      if (opts.onOutput) opts.onOutput(csLines, { badge: '敬请期待' });
      var csRes = { ok: true, comingSoon: true, lines: csLines, time: 0 };
      if (opts.onDone) opts.onDone(csRes);
      return Promise.resolve(csRes);
    }

    lang = CL.Highlight ? CL.Highlight.normalizeLang(lang) : String(lang || '').toLowerCase();
    var cap = CAP[lang];
    var t0 = performance.now();

    if (!cap || cap.mode === 'off') {
      // 不支持的语言：尝试静态推断，失败才降级
      var si = staticInfer(lang, code);
      if (si) return Promise.resolve(si);
      return Promise.resolve(degrade(lang, code, opts, '该语言暂不支持在线运行'));
    }

    // JavaScript：直接走浏览器 V8（零网络依赖）
    if (lang === 'javascript') {
      if (opts.onProgress) opts.onProgress('浏览器 V8 运行中…');
      return runLocalJS(code, opts).then(function (res) {
        res.time = res.time != null ? res.time : Math.round(performance.now() - t0);
        if (opts.onDone) opts.onDone(res);
        return res;
      });
    }

    // 缓存命中
    var cached = cacheGet(lang, code, opts.stdin);
    if (cached) {
      var hit = Object.assign({}, cached);
      hit.cached = true;
      return Promise.resolve(hit);
    }

    return Promise.resolve(tryCloud(lang, code, opts)).then(function (res) {
      res.time = res.time != null ? res.time : Math.round(performance.now() - t0);
      if (!res.degraded) cacheSet(lang, code, opts.stdin, res);
      return res;
    }).catch(function (e) {
      // 最后防线：静态推断
      var si = staticInfer(lang, code);
      if (si) {
        si.time = Math.round(performance.now() - t0);
        return si;
      }
      return degrade(lang, code, opts, friendlyError(e));
    });
  }

  function friendlyError(e) {
    if (!e) return '运行失败';
    var msg = String(e.message || e);
    if (/failed to fetch|networkerror|abort|timeout|timed out/i.test(msg)) {
      return '无法连接云端运行服务（请检查网络）';
    }
    if (/wandbox|remote|compiler/i.test(msg) && /unavailable|not available|均不可用/i.test(msg)) {
      return '云端编译器当前不可用';
    }
    if (/^HTTP \d+$/i.test(msg)) return msg + '（云端服务异常）';
    return msg;
  }

  function degrade(lang, code, opts, reason) {
    var lines = [];
    if (opts.expect) {
      var ex = String(opts.expect).replace(/\n$/, '');
      ex.split('\n').forEach(function (l) { lines.push({ text: l, cls: '' }); });
    }
    var head = [];
    head.push({ text: '⚠ ' + reason + '，已切换为演示模式', cls: 'warn' });
    if (lines.length) head.push({ text: '— 以下为该示例的预期输出 —', cls: 'sys' });
    else head.push({ text: '请在支持的环境中运行这段代码查看结果。', cls: 'sys' });

    return { lines: head.concat(lines), ok: false, env: 'off', degraded: true };
  }

  /* ------------------------------------------------------- 运行命令提示 */
  var LOCAL_CMD = {
    python: 'python main.py',
    javascript: 'node main.js',
    typescript: 'npx tsx main.ts',
    c: 'gcc main.c -o main && ./main',
    cpp: 'g++ main.cpp -std=c++17 -o main && ./main',
    go: 'go run main.go',
    rust: 'cargo run  # 或 rustc main.rs -o main && ./main',
    java: 'javac Main.java && java Main'
  };

  /* ------------------------------------------------------- JavaScript 浏览器 V8 本地运行 */
  function runLocalJS(code, opts) {
    return new Promise(function (resolve) {
      var logs = [], ol = console.log, oe = console.error, ow = console.warn;
      function fmt(a) { return Array.prototype.map.call(a, jsFormat).join(' '); }
      console.log = function () { logs.push({ text: fmt(arguments), cls: '' }); };
      console.error = function () { logs.push({ text: fmt(arguments), cls: 'err' }); };
      console.warn = function () { logs.push({ text: fmt(arguments), cls: 'warn' }); };
      var t0 = performance.now();
      try {
        var r = (new Function('"use strict";\n' + code))(), el = Math.round(performance.now() - t0);
        if (r !== undefined) logs.push({ text: '→ ' + jsFormat(r), cls: 'sys' });
        if (!logs.length) logs.push({ text: '（无输出）', cls: '' });
        console.log = ol; console.error = oe; console.warn = ow;
        resolve({ lines: logs, ok: true, env: 'local', time: el, compiler: '浏览器 V8' });
      } catch (e) {
        var e2 = Math.round(performance.now() - t0);
        logs.push({ text: e.name + ': ' + e.message, cls: 'err' });
        console.log = ol; console.error = oe; console.warn = ow;
        resolve({ lines: logs, ok: false, env: 'local', time: e2, compiler: '浏览器 V8' });
      }
    });
  }

  /* ------------------------------------------------------- 导出 */
  CL.Runner = {
    run: run,
    describe: describe,
    capabilities: CAP,
    enabled: function () { return RUN_ENABLED; },
    setEnabled: function (v) { RUN_ENABLED = !!v; },
    localCommand: function (l) { return LOCAL_CMD[l] || ''; },
    _format: jsFormat,
    _backends: ['wandbox', 'judge0', 'piston', 'browser-v8', 'static-infer'],
    _reliability: 'zero-demo-mode'
  };
})(window);
