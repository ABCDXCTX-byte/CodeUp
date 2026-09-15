/* ==========================================================================
   CodeUp码上 · highlight.js — 自研词法分析器与语法高亮
   - 零依赖，纯手写 tokenizer
   - 基于 sticky 正则的顺序扫描，规则表驱动
   - 输出 escaped HTML，天然防注入
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL = global.CL || {};

  /* ---------------------------------------------------------------- 工具 */
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function setOf(str) {
    var o = Object.create(null), arr = str.split(/\s+/);
    for (var i = 0; i < arr.length; i++) if (arr[i]) o[arr[i]] = 1;
    return o;
  }

  function S(re) { return new RegExp(re.source, 'y'); }

  /* ---------------------------------------------------------- 公共正则片段 */
  var ID = '[A-Za-z_$][\\w$]*';
  var ID_UNI = '[A-Za-z_\\u00c0-\\u024f$][\\w$\\u00c0-\\u024f]*';

  /* ---------------------------------------------------------- 关键字字典 */

  var KW = {
    python: setOf('False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case'),
    java: setOf('abstract assert break case catch class const continue default do else enum extends final finally for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while record sealed permits var yield'),
    c: setOf('auto break case const continue default do else enum extern for goto if inline register restrict return sizeof static struct switch typedef union volatile while _Alignas _Alignof _Atomic _Bool _Generic _Noreturn _Static_assert _Thread_local'),
    cpp: setOf('alignas alignof and and_eq asm auto bitand bitor break case catch class compl concept const consteval constexpr constinit const_cast continue co_await co_return co_yield decltype default delete do dynamic_cast else enum explicit export extern for friend goto if inline mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public register reinterpret_cast requires return sizeof static static_assert static_cast struct switch template this thread_local throw try typedef typeid typename union using virtual volatile while xor xor_eq'),
    javascript: setOf('async await break case catch class const continue debugger default delete do else export extends finally for function if import in instanceof let new of return super switch this throw try typeof var void while with yield'),
    typescript: setOf('abstract any as async await boolean break case catch class const continue declare default delete do else enum export extends false finally for from function get if implements import in infer instanceof interface is keyof let namespace never new null number of private protected public readonly return satisfies set static string super switch symbol this throw true try type typeof undefined unique unknown var void while yield'),
    go: setOf('break case chan const continue default defer else fallthrough for func go goto if import interface map package range return select struct switch type var'),
    rust: setOf('as async await break const continue crate dyn else enum extern false fn for if impl in let loop match mod move mut pub ref return self Self static struct super trait true type union unsafe use where while'),
    /* 额外语言的轻量支持 */
    sql: setOf('SELECT FROM WHERE INSERT INTO VALUES UPDATE DELETE CREATE TABLE DROP ALTER ADD PRIMARY KEY FOREIGN REFERENCES JOIN LEFT RIGHT INNER OUTER ON GROUP BY ORDER HAVING LIMIT OFFSET AS AND OR NOT NULL IS IN LIKE BETWEEN DISTINCT COUNT SUM AVG MIN MAX CASE WHEN THEN ELSE END UNION ALL INDEX VIEW DATABASE SET DEFAULT UNIQUE CHECK CONSTRAINT'),
    kotlin: setOf('as as? break class continue do else false for fun if in !in is !is null object package return super this throw true try typealias typeof val var when while companion data sealed inline suspend lateinit init constructor'),
    swift: setOf('associatedtype class deinit enum extension fileprivate func import init inout internal let open operator private protocol public repeat rethrows static struct subscript typealias var where break case catch continue default defer do else fallthrough for guard if in return throw while'),
    php: setOf('abstract and array as break callable case catch class clone const continue declare default do echo else elseif empty enddeclare endfor endforeach endif endswitch endwhile enum extends final finally fn for foreach function global goto if implements include include_once instanceof insteadof interface isset list match namespace new or print private protected public readonly require require_once return static switch throw trait try unset use var while xor yield'),
    csharp: setOf('abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern false finally fixed for foreach goto if implicit in interface internal is lock namespace new null object operator out override params private protected public readonly ref return sealed sizeof stackalloc static string struct switch this throw true try typeof unchecked unsafe using virtual void volatile while var record init'),
    ruby: setOf('BEGIN END alias and begin break case class def defined? do else elsif end ensure false for if in module next nil not or redo rescue retry return self super then true undef unless until when while yield require attr_accessor attr_reader attr_writer'),
    lua: setOf('and break do else elseif end false for function goto if in local nil not or repeat return then true until while'),
    shell: setOf('if then elif else fi for while until do done case esac function return in select time coproc local export readonly declare unset shift source alias echo cd eval exec exit read set trap wait'),
    json: setOf('true false null')
  };

  /* ---------------------------------------------------------- 类型字典 */
  var TY = {
    python: setOf('int float str bool list dict tuple set bytes bytearray frozenset complex range type object Exception BaseException'),
    java: setOf('boolean byte char short int long float double void String Integer Long Double Float Boolean Character Byte Short Object List ArrayList LinkedList Map HashMap TreeMap LinkedHashMap Set HashSet TreeSet Queue Deque Optional StringBuilder Math System'),
    c: setOf('int char float double void short long unsigned signed size_t ssize_t ptrdiff_t wchar_t FILE time_t bool _Bool int8_t int16_t int32_t int64_t uint8_t uint16_t uint32_t uint64_t div_t'),
    cpp: setOf('int char float double void short long unsigned signed bool size_t string wstring vector map unordered_map set unordered_set pair tuple array deque list queue stack optional variant any shared_ptr unique_ptr weak_ptr string_view auto_ptr nullptr_t istream ostream iostream fstream sstream std'),
    javascript: setOf('Number String Boolean Object Array Function Symbol BigInt Map Set WeakMap WeakSet Promise Date RegExp Error TypeError JSON Math Reflect Proxy ArrayBuffer Uint8Array Int32Array Float64Array Intl Infinity NaN undefined'),
    typescript: setOf('string number boolean object symbol bigint unknown never any void undefined null Array Promise Record Partial Required Readonly Pick Omit Exclude Extract NonNullable ReturnType Parameters Map Set Date RegExp Error'),
    go: setOf('bool string int int8 int16 int32 int64 uint uint8 uint16 uint32 uint64 uintptr byte rune float32 float64 complex64 complex128 error any comparable'),
    rust: setOf('i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 bool char str String Vec Option Result Box Rc Arc RefCell HashMap HashSet BTreeMap BTreeSet Iterator IntoIterator Copy Clone Debug Display Some None Ok Err'),
    swift: setOf('Int Int8 Int16 Int32 Int64 UInt UInt8 UInt16 UInt32 UInt64 Float Double Bool String Character Array Dictionary Set Optional Any AnyObject Never Result'),
    kotlin: setOf('Int Long Short Byte Double Float Boolean Char String Array List MutableList Map MutableMap Set MutableSet Any Unit Nothing'),
    csharp: setOf('int long short byte uint ulong ushort sbyte float double decimal bool char string object dynamic var void nint nuint IEnumerable List Dictionary HashSet Task')
  };

  /* ---------------------------------------------------------- 内建函数 */
  var BI = {
    python: setOf('print len range int str float bool list dict set tuple enumerate zip map filter sum min max abs round sorted reversed type isinstance open input super repr format id dir hasattr getattr setattr any all ord chr bin hex oct pow divmod globals locals staticmethod classmethod property'),
    c: setOf('printf scanf malloc calloc realloc free sizeof strlen strcpy strcat strcmp sprintf fprintf fopen fclose fread fwrite fgets fputs exit abs rand srand time qsort memcpy memset atoi atof pow sqrt'),
    cpp: setOf('cout cin cerr endl printf scanf size push_back emplace_back begin end sort find count move make_shared make_unique'),
    java: setOf('println print printf length size add get put containsKey containsValue valueOf parseInt parseDouble toString equals hashCode getClass'),
    javascript: setOf('console document window require module exports parseInt parseFloat isNaN isFinite encodeURIComponent decodeURIComponent setTimeout setInterval clearTimeout clearInterval fetch structuredClone'),
    typescript: setOf('console parseInt parseFloat isNaN setTimeout fetch'),
    go: setOf('make new len cap append copy delete panic recover print println close complex real imag min max clear'),
    rust: setOf('println print eprintln vec format panic assert assert_eq assert_ne todo unimplemented dbg matches'),
    lua: setOf('print type pairs ipairs tostring tonumber table string math io os require pcall error select'),
    shell: setOf('echo printf read cd pwd ls cat grep sed awk curl wget git npm node python')
  };

  /* ---------------------------------------------------------- 规则构造 */
  function R(cls, re, opt) {
    var r = { c: cls, re: S(re) };
    if (opt) for (var k in opt) r[k] = opt[k];
    return r;
  }

  /* 通用：行注释 */
  function lineComment(prefix) { return R('comment', prefix + '[^\\n]*'); }
  /* 通用：块注释 */
  function blockComment() { return R('comment', '/\\*[\\s\\S]*?(?:\\*/|$)'); }
  /* 通用：双/单引号字符串 */
  function quoted(flags) {
    return [
      R('string', '(?:' + flags + ')?"(?:\\\\.|[^"\\\\\\n])*"?'),
      R('string', '(?:' + flags + ")'(?:\\\\.|[^'\\\\\\n])*'?")
    ];
  }
  /* 通用数字 */
  var NUM = R('number', '(?:0[xX][\\da-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\\d[\\d_]*(?:\\.[\\d_]*)?(?:[eE][+-]?\\d+)?)');
  /* 标识符 → 关键字 */
  function kw(id) { return R('keyword', id, { set: KW[id] }); }
  /* 标识符 → 类型 */
  function ty(id) { return R('type', id, { set: TY[id] }); }
  /* 标识符 → 内建 */
  function bi(id) { return R('builtin', id, { set: BI[id] }); }
  /* 函数调用（前瞻左括号，不消耗） */
  function fncall(id) { return R('func', id + '(?=\\s*\\()'); }
  /* 字面量布尔/null */
  function lits(words, cls) { return R(cls || 'number', '\\b(?:' + words + ')\\b'); }
  /* 标点 */
  var PUNCT = R('punct', '[{}()\\[\\];,.]');
  var OP = R('op', '=>|->|::|:=|\\?\\.|\\.\\.\\.|\\+\\+|--|<<=|>>=|===|!==|==|!=|<=|>=|&&|\\|\\||\\?\\?|\\*\\*|\\+=|-=|\\*=|/=|%=|&=|\\|=|\\^=|[-+*/%=<>&|^~!?:]');

  /* ---------------------------------------------------------- 各语言规则 */
  var RULES = {};

  /* ---------------- Python ---------------- */
  RULES.python = [
    R('comment', '#[^\\n]*'),
    R('string', '[rRbBuUfF]{0,2}("""[\\s\\S]*?(?:"""|$)|' + "'''[\\s\\S]*?(?:'''|$))"),
    R('string', '[rRbBuUfF]{0,2}"(?:\\\\.|[^"\\\\\\n])*"?'),
    R('string', "[rRbBuUfF]{0,2}'(?:\\\\.|[^'\\\\\\n])*'?"),
    R('attr', '@' + ID + '(?:\.' + ID + ')*'),
    NUM,
    kw('python'),
    lits('True|False|None|self|cls', 'builtin'),
    ty('python'),
    bi('python'),
    fncall(ID),
    PUNCT, OP
  ];

  /* ---------------- C ---------------- */
  RULES.c = [
    R('comment', '//[^\\n]*'),
    R('comment', '/\\*[\\s\\S]*?(?:\\*/|$)'),
    R('macro', '^[ \\t]*#[a-z_]+[^\\n]*', { m: true }),
    R('string', '"(?:\\\\.|[^"\\\\\\n])*"?'),
    R('string', "'(?:\\\\.|[^'\\\\\\n])'?"),
    NUM,
    kw('c'),
    ty('c'),
    lits('true|false|NULL|null|nullptr', 'builtin'),
    bi('c'),
    fncall(ID),
    R('type', '\\b[A-Z][A-Z0-9_]{2,}\\b'),
    PUNCT, OP
  ];

  /* ---------------- C++ ---------------- */
  RULES.cpp = [
    R('comment', '//[^\\n]*'),
    R('comment', '/\\*[\\s\\S]*?(?:\\*/|$)'),
    R('macro', '^[ \\t]*#[a-z_]+[^\\n]*', { m: true }),
    R('string', 'R"\\((?:[\\s\\S]*?)\\)"'),
    R('string', '"(?:\\\\.|[^"\\\\\\n])*"?'),
    R('string', "'(?:\\\\.|[^'\\\\\\n])'?"),
    NUM,
    kw('cpp'),
    ty('cpp'),
    lits('true|false|nullptr|NULL', 'builtin'),
    bi('cpp'),
    fncall(ID),
    R('type', '\\b(?:std::)?[A-Z][A-Za-z0-9_]*\\b'),
    PUNCT, OP
  ];

  /* ---------------- Java ---------------- */
  RULES.java = [
    R('comment', '//[^\\n]*'),
    R('comment', '/\\*[\\s\\S]*?(?:\\*/|$)'),
    R('string', '"""[\\s\\S]*?(?:"""|$)'),
    R('string', '"(?:\\\\.|[^"\\\\\\n])*"?'),
    R('string', "'(?:\\\\.|[^'\\\\\\n])'?"),
    NUM,
    R('attr', '@' + ID),
    kw('java'),
    lits('true|false|null', 'builtin'),
    ty('java'),
    bi('java'),
    fncall(ID),
    R('type', '\\b[A-Z][A-Za-z0-9_]*\\b'),
    PUNCT, OP
  ];

  /* ---------------- JavaScript ---------------- */
  RULES.javascript = [
    R('comment', '//[^\\n]*'),
    R('comment', '/\\*[\\s\\S]*?(?:\\*/|$)'),
    R('string', '`(?:\\\\.|[^`\\\\])*(?:`|$)'),
    R('string', '"(?:\\\\.|[^"\\\\\\n])*"?'),
    R('string', "'(?:\\\\.|[^'\\\\\\n])*'?"),
    R('regex', '/(?![/*])(?:\\\\.|\\[(?:\\\\.|[^\\]\\\\])*\\]|[^/\\\\\\n])+/[gimsuy]*(?=[\\s;,).\\]}]|$)'),
    NUM,
    kw('javascript'),
    lits('true|false|null|undefined|NaN|Infinity|this|super', 'builtin'),
    ty('javascript'),
    bi('javascript'),
    fncall(ID),
    R('type', '\\b[A-Z][A-Za-z0-9_]*\\b'),
    PUNCT, OP
  ];

  /* ---------------- TypeScript ---------------- */
  RULES.typescript = [
    R('comment', '//[^\\n]*'),
    R('comment', '/\\*[\\s\\S]*?(?:\\*/|$)'),
    R('string', '`(?:\\\\.|[^`\\\\])*(?:`|$)'),
    R('string', '"(?:\\\\.|[^"\\\\\\n])*"?'),
    R('string', "'(?:\\\\.|[^'\\\\\\n])*'?"),
    NUM,
    kw('typescript'),
    lits('true|false|null|undefined|NaN|Infinity|this|super', 'builtin'),
    ty('typescript'),
    bi('typescript'),
    fncall(ID),
    R('type', '\\b[A-Z][A-Za-z0-9_]*\\b'),
    PUNCT, OP
  ];

  /* ---------------- Go ---------------- */
  RULES.go = [
    R('comment', '//[^\\n]*'),
    R('comment', '/\\*[\\s\\S]*?(?:\\*/|$)'),
    R('string', '`[^`]*`?'),
    R('string', '"(?:\\\\.|[^"\\\\\\n])*"?'),
    R('string', "'(?:\\\\.|[^'\\\\\\n])'?"),
    NUM,
    kw('go'),
    lits('true|false|nil|iota', 'builtin'),
    ty('go'),
    bi('go'),
    fncall(ID),
    R('type', '\\b[A-Z][A-Za-z0-9_]*\\b'),
    PUNCT, OP
  ];

  /* ---------------- Rust ---------------- */
  RULES.rust = [
    R('comment', '//![^\\n]*'),
    R('comment', '///[^\\n]*'),
    R('comment', '//[^\\n]*'),
    R('comment', '/\\*[\\s\\S]*?(?:\\*/|$)'),
    R('string', 'r#*"[\\s\\S]*?"#'),
    R('string', '"(?:\\\\.|[^"\\\\\\n])*"?'),
    R('string', "'(?:\\\\.|[^'\\\\\\n])'?"),
    R('attr', '#!?\\[[^\\]]*\\]'),
    R('macro', '\\b[A-Za-z_]\\w*!'),
    R('attr', "'[a-z_]\\w*"),
    NUM,
    kw('rust'),
    lits('true|false|None', 'builtin'),
    ty('rust'),
    bi('rust'),
    fncall(ID),
    R('type', '\\b[A-Z][A-Za-z0-9_]*\\b'),
    PUNCT, OP
  ];

  /* ---------------- 其他语言（速查/对比用轻支持） ---------------- */
  function simpleLang(id, commentPrefixes, opts) {
    opts = opts || {};
    var rs = [];
    (commentPrefixes || []).forEach(function (p) {
      rs.push(R('comment', p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^\\n]*'));
    });
    if (opts.hash) rs.push(R('macro', '^[ \\t]*#[a-z_]+[^\\n]*', { m: true }));
    if (opts.blockComment) rs.push(blockComment());
    rs.push(R('string', '"(?:\\\\.|[^"\\\\\\n])*"?'));
    rs.push(R('string', "'(?:\\\\.|[^'\\\\\\n])*'?"));
    rs.push(NUM);
    if (KW[id]) rs.push(kw(id));
    if (TY[id]) rs.push(ty(id));
    if (BI[id]) rs.push(bi(id));
    rs.push(fncall(ID));
    rs.push(PUNCT, OP);
    return rs;
  }

  RULES.sql = [R('comment', '--[^\\n]*'), R('comment', '/\\*[\\s\\S]*?(?:\\*/|$)'),
    R('string', "'(?:''|[^'])*'?"), R('string', '"(?:[^"])*"'),
    NUM, R('keyword', '[A-Za-z_][\\w]*', { set: KW.sql, up: true }),
    fncall(ID), PUNCT, OP];
  RULES.kotlin = simpleLang('kotlin', ['//'], { blockComment: true });
  RULES.swift = simpleLang('swift', ['//'], { blockComment: true });
  RULES.php = simpleLang('php', ['//', '#'], { blockComment: true, hash: false });
  RULES.csharp = simpleLang('csharp', ['//'], { blockComment: true });
  RULES.ruby = simpleLang('ruby', ['#']);
  RULES.lua = simpleLang('lua', ['--']);
  RULES.shell = simpleLang('shell', ['#']);
  RULES.json = [R('string', '"(?:\\\\.|[^"\\\\\\n])*"?'), NUM, lits('true|false|null', 'builtin'), PUNCT, OP];
  RULES.html = [R('comment', '<!--[\\s\\S]*?(?:-->|$)'), R('string', '"(?:[^"\\n])*"?'), PUNCT, OP];
  RULES.plain = [];

  /* ---------------------------------------------------------------- 分词 */
  function tokenize(src, rules) {
    var out = [], i = 0, n = src.length, guard = 0;
    var lastPlain = false;

    function push(cls, val) {
      if (cls === 'plain') {
        if (lastPlain) out[out.length - 1].v += val;
        else { out.push({ c: 'plain', v: val }); lastPlain = true; }
        return;
      }
      lastPlain = false;
      out.push({ c: cls, v: val });
    }

    while (i < n && guard++ < 200000) {
      var hit = false;
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        rule.re.lastIndex = i;
        var m;
        try { m = rule.re.exec(src); } catch (e) { continue; }
        if (!m || m.index !== i || !m[0]) continue;

        // 集合约束：命中词必须在字典内
        if (rule.set) {
          var key = rule.up ? m[0].toUpperCase() : m[0];
          if (!rule.set[key]) continue;
        }
        // 行首约束（多行模式下的预处理指令）
        if (rule.m && i > 0 && src[i - 1] !== '\n') continue;

        push(rule.c, m[0]);
        i += m[0].length;
        hit = true;
        break;
      }
      if (!hit) { push('plain', src.charAt(i)); i++; }
    }
    return out;
  }

  /* ---------------------------------------------------------------- 渲染 */
  function tokensToHtml(tokens) {
    var html = '', i;
    for (i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (t.c === 'plain') html += esc(t.v);
      else html += '<span class="tok-' + t.c + '">' + esc(t.v) + '</span>';
    }
    return html;
  }

  /**
   * 高亮一段代码
   * @param {string} src  源码
   * @param {string} lang 语言 id
   * @returns {string} HTML
   */
  function highlight(src, lang) {
    if (src == null) src = '';
    lang = normalizeLang(lang);
    var rules = RULES[lang];
    if (!rules || !rules.length) return esc(src);
    return tokensToHtml(tokenize(src, rules));
  }

  var ALIAS = {
    py: 'python', python3: 'python',
    'c++': 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp',
    js: 'javascript', node: 'javascript', jsx: 'javascript',
    ts: 'typescript', tsx: 'typescript',
    golang: 'go',
    rs: 'rust',
    csharp: 'csharp', 'c#': 'csharp', cs: 'csharp',
    kt: 'kotlin',
    sh: 'shell', bash: 'shell', zsh: 'shell', console: 'plain', text: 'plain', txt: 'plain',
    output: 'plain'
  };

  function normalizeLang(lang) {
    if (!lang) return 'plain';
    var l = String(lang).toLowerCase();
    if (ALIAS[l]) return ALIAS[l];
    return RULES[l] ? l : 'plain';
  }

  /**
   * 渲染带行号的静态代码块（返回 HTML 片段，外层再包 .code-view）
   */
  function renderStatic(src, lang, opts) {
    opts = opts || {};
    src = String(src == null ? '' : src).replace(/\t/g, '    ').replace(/^\n+/, '').replace(/\s+$/, '');
    var lines = src.split('\n');
    var body = '', i;
    for (i = 0; i < lines.length; i++) {
      body += '<div class="csl"><span class="cs-gutter">' + (i + 1) + '</span><code>' + highlight(lines[i], lang) + '</code></div>';
    }
    var maxH = opts.maxHeight ? ' style="max-height:' + opts.maxHeight + 'px"' : '';
    return '<div class="code-scroll"' + maxH + '><div class="code-lines">' + body + '</div></div>';
  }

  /* ---------------------------------------------------------------- 导出 */
  CL.Highlight = {
    highlight: highlight,
    renderStatic: renderStatic,
    tokenize: tokenize,
    tokensToHtml: tokensToHtml,
    normalizeLang: normalizeLang,
    esc: esc,
    rules: RULES,
    has: function (l) { var n = normalizeLang(l); return !!(RULES[n] && RULES[n].length); }
  };

})(window);
