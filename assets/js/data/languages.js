/* ==========================================================================
   CodeUp码上 · data/languages.js — 语言档案
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL = global.CL || {};

  var LANGUAGES = {
    python: {
      id: 'python',
      name: 'Python',
      abbr: 'Py',
      color: '#3572A5',
      accent: '#FFD43B',
      year: 1991,
      author: 'Guido van Rossum',
      paradigm: '多范式：面向对象 / 函数式 / 命令式',
      typing: '动态类型 · 强类型',
      runtime: '解释执行（CPython 字节码）',
      level: 1,
      tags: ['入门首选', '数据科学', 'AI 主力', '胶水语言'],
      desc: '语法简单，强制缩进。从脚本到数据分析、机器学习都能用。',
      longDesc: 'Python 以「可读性」为第一设计目标：用缩进替代大括号、用关键字替代符号，使得同一份代码在半年后仍然好读。它拥有全球最活跃的第三方生态之一（PyPI），在数据分析、机器学习、Web 后端、自动化运维、科学计算领域都是事实标准。',
      useCases: ['数据分析与可视化', '机器学习 / 深度学习', 'Web 后端（Django / FastAPI）', '自动化脚本与爬虫', '科学计算与仿真'],
      file: 'main.py',
      ext: 'py',
      gotchas: [
        '缩进即语法，混用空格与 Tab 会直接报错',
        '可变对象（list/dict/set）作为默认参数会被所有调用共享',
        'GIL 让 CPU 密集型多线程无法真正并行，需用多进程或 C 扩展',
        '变量只是名字，赋值不复制数据——切片和 copy 模块才是真拷贝'
      ],
      hello: 'print("Hello, World!")'
    },

    java: {
      id: 'java',
      name: 'Java',
      abbr: 'Ja',
      color: '#E76F00',
      accent: '#F89820',
      year: 1995,
      author: 'James Gosling（Sun Microsystems）',
      paradigm: '面向对象为主，兼支持泛型与函数式',
      typing: '静态类型 · 强类型',
      runtime: '编译为字节码，JVM 上运行（JIT 即时编译）',
      level: 3,
      tags: ['企业级', 'Android', '跨平台', '强生态'],
      desc: 'JVM 生态成熟，企业后台和安卓开发的主力。一次编写，到处运行。',
      longDesc: 'Java 的核心价值在于 JVM：一份字节码跑遍所有平台，配合成熟的 JIT 与 GC，长时间运行的服务端程序性能甚至可以超过静态编译语言。它拥有工业界非常完整的工具链（Maven/Gradle、Spring、JUnit、JVM 诊断工具）和严格的向后兼容承诺。',
      useCases: ['大型企业后台（Spring 生态）', 'Android 应用开发', '大数据处理（Hadoop / Flink / Spark）', '金融与电信核心系统', '中间件与消息队列'],
      file: 'Main.java',
      ext: 'java',
      gotchas: [
        'String 比较必须用 equals()，== 比的是引用地址',
        '基本类型是值传递，对象传递的是引用的副本——方法内重新赋值不会影响外部变量',
        'Integer 在 -128~127 有缓存，超出范围用 == 比较会得到 false',
        '每个文件只能有一个 public 类，且文件名必须与类名一致',
        '重写 equals 必须同时重写 hashCode，否则 HashMap 会出问题'
      ],
      hello: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
    },

    c: {
      id: 'c',
      name: 'C',
      abbr: 'C',
      color: '#555555',
      accent: '#283593',
      year: 1972,
      author: 'Dennis Ritchie（贝尔实验室）',
      paradigm: '过程式 / 结构化',
      typing: '静态类型 · 弱类型',
      runtime: '编译为机器码',
      level: 4,
      tags: ['系统级', '贴近硬件', '万物之母', '高性能'],
      desc: '直接操作内存和指针，是理解计算机底层的必经之路。',
      longDesc: 'C 语言几乎没有抽象层：变量就是内存，指针就是地址，数组就是连续内存块。这种「透明」让它成为操作系统、嵌入式、驱动、数据库引擎的唯一现实选择，也让它成为理解内存、栈、堆、缓存等底层概念的最佳教材。代价是所有安全问题都要你自己负责。',
      useCases: ['操作系统与内核（Linux / Windows 内核）', '嵌入式与单片机', '数据库与运行时（Redis / CPython / JVM）', '高性能库与协议栈', '编译器与解释器实现'],
      file: 'main.c',
      ext: 'c',
      gotchas: [
        '数组下标越界不会报错，会静默破坏别的内存（未定义行为）',
        '局部变量未初始化时值是随机的垃圾数据',
        'malloc 之后必须 free，且不能 free 两次',
        '指针运算的单位是「所指向类型的大小」而不是 1 字节',
        '字符串以 \\0 结尾，忘记给它留位置就会缓冲区溢出'
      ],
      hello: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}'
    },

    cpp: {
      id: 'cpp',
      name: 'C++',
      abbr: 'C++',
      color: '#00599C',
      accent: '#F34B7D',
      year: 1983,
      author: 'Bjarne Stroustrup',
      paradigm: '多范式：面向对象 / 泛型 / 函数式 / 元编程',
      typing: '静态类型 · 强类型',
      runtime: '编译为机器码',
      level: 5,
      tags: ['零成本抽象', '游戏引擎', '高频交易', '系统级'],
      desc: '兼顾 C 的性能和高级抽象。零成本抽象：不用的特性不付代价。',
      longDesc: 'C++ 的设计哲学是「你不为你不使用的东西付费」。模板、RAII、移动语义、constexpr 让你写出既高性能又安全的代码；标准库 STL 提供了久经考验的数据结构与算法。它的学习曲线陡峭，但在游戏引擎、浏览器、数据库、高频交易、图形学等性能敏感领域仍无可替代。',
      useCases: ['游戏引擎（Unreal / Unity 底层）', '浏览器内核（Chrome / Firefox）', '高频交易系统', '图形学与音视频处理', '数据库与编译器'],
      file: 'main.cpp',
      ext: 'cpp',
      gotchas: [
        '迭代器在容器修改后会失效，vector 扩容尤其危险',
        '裸 new/delete 是万恶之源，优先用智能指针与容器',
        '头文件重复包含要用 #pragma once 或 include guard',
        '整型除法会截断小数，至少一个操作数是浮点才是真除法',
        '未定义行为（UB）让程序在任何优化等级下都可能表现不同'
      ],
      hello: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
    },

    javascript: {
      id: 'javascript',
      name: 'JavaScript',
      abbr: 'JS',
      color: '#D6A800',
      accent: '#F7DF1E',
      year: 1995,
      author: 'Brendan Eich（Netscape）',
      paradigm: '多范式：原型式 / 函数式 / 事件驱动',
      typing: '动态类型 · 弱类型',
      runtime: '解释 + JIT（V8 等引擎）',
      level: 2,
      tags: ['前端唯一', '全栈通吃', '异步模型', '生态最大'],
      desc: '浏览器原生支持的语言，现在前端、后端、移动端都能写。',
      longDesc: 'JavaScript 的核心特质是「单线程 + 事件循环 + 非阻塞 I/O」：一个主线程靠任务队列支撑高并发。它的原型继承模型与动态弱类型既灵活又容易踩坑，npm 生态则是世界上最大的代码仓库。async/await 让异步代码写起来像同步代码，是它近年最重要的变化。',
      useCases: ['网页交互与前端框架（React / Vue）', '服务端（Node.js）', '跨端应用（Electron / React Native）', '小程序与嵌入式脚本', '构建工具与工程化'],
      file: 'main.js',
      ext: 'js',
      gotchas: [
        '== 会做隐式类型转换，永远用 ===',
        'var 是函数作用域且有变量提升，用 let / const 替代',
        '数字全是双精度浮点，0.1 + 0.2 !== 0.3',
        'this 的指向由调用方式决定，箭头函数没有自己的 this',
        '数组是对象，for...in 遍历会带上非数字键，应用 for...of'
      ],
      hello: 'console.log("Hello, World!");'
    },

    typescript: {
      id: 'typescript',
      name: 'TypeScript',
      abbr: 'TS',
      color: '#3178C6',
      accent: '#3178C6',
      year: 2012,
      author: 'Anders Hejlsberg（Microsoft）',
      paradigm: 'JavaScript 的超集，加静态类型系统',
      typing: '静态类型（编译期）· 结构化类型',
      runtime: '编译为 JavaScript 后运行',
      level: 3,
      tags: ['类型安全', 'JS 超集', 'IDE 神器', '大型项目'],
      desc: '给 JavaScript 加上类型系统。编译期抓错，重构更安全。',
      longDesc: 'TypeScript 不是另一门语言，而是「带类型的 JavaScript」——任何合法的 JS 都是合法的 TS。它的类型系统是结构化的（鸭子类型）而非名义化的，并支持类型推导、联合类型、泛型、条件类型等高级特性，让类型既能描述数据也能描述约束。大型前端项目几乎已全部迁移到 TS。',
      useCases: ['大型前端应用', 'Node.js 服务端', '组件库与 SDK 开发', '跨端框架（NestJS / Deno）', '配置文件与基础设施即代码'],
      file: 'main.ts',
      ext: 'ts',
      gotchas: [
        '类型只在编译期存在，运行时没有任何类型检查',
        'any 会让类型系统失效，慎用；unknown 才是安全的顶层类型',
        '类型断言（as）只是告诉编译器闭嘴，不会真的转换数据',
        'interface 可以声明合并，type 不行；大部分场景二者可互换',
        'tsconfig 的 strict 模式建议始终打开'
      ],
      hello: 'const message: string = "Hello, World!";\nconsole.log(message);'
    },

    go: {
      id: 'go',
      name: 'Go',
      abbr: 'Go',
      color: '#00ADD8',
      accent: '#00ADD8',
      year: 2009,
      author: 'Robert Griesemer / Rob Pike / Ken Thompson（Google）',
      paradigm: '命令式 · 并发导向 · 组合优于继承',
      typing: '静态类型 · 强类型 · 类型推导',
      runtime: '编译为机器码（自带 runtime 与 GC）',
      level: 2,
      tags: ['云原生', '并发简单', '编译极快', '部署单文件'],
      desc: '主打并发和工程效率。goroutine 让高并发写起来像同步代码。',
      longDesc: 'Go 的设计取舍极其克制：没有继承、没有泛型（直到 1.18 才加入）、没有异常，换来的是极快的编译速度、极简的语法和几乎零学习成本的并发模型。一个 goroutine 只占几 KB 栈，一个进程跑几十万并发连接是常态。它已成为云原生基础设施（Docker / Kubernetes / etcd）的标准语言。',
      useCases: ['微服务与 API 网关', '云原生基础设施（K8s / Docker）', '高并发网络服务', 'CLI 工具与 DevOps 脚本', '分布式存储与消息队列'],
      file: 'main.go',
      ext: 'go',
      gotchas: [
        '未使用的变量和 import 会导致编译失败（故意的设计）',
        'for range 得到的元素是副本，用索引才能修改原切片',
        '闭包捕获循环变量在 Go 1.22 之前是同一个变量，容易出 bug',
        'nil map 可以读但写入会 panic，必须先 make',
        'err != nil 的检查虽啰嗦但必须写——Go 没有异常'
      ],
      hello: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}'
    },

    rust: {
      id: 'rust',
      name: 'Rust',
      abbr: 'Rs',
      color: '#B7410E',
      accent: '#DEA584',
      year: 2010,
      author: 'Graydon Hoare（Mozilla 研究院）',
      paradigm: '多范式：函数式 / 命令式 · 所有权模型',
      typing: '静态类型 · 强类型 · 类型推导',
      runtime: '编译为机器码（无 GC）',
      level: 5,
      tags: ['内存安全', '零成本抽象', '无 GC', '并发无畏'],
      desc: '不需要 GC，也不用手动 free。所有权系统在编译期就解决了内存问题。',
      longDesc: 'Rust 最大的不同在于把内存安全从运行时挪到了编译期：所有权、借用、生命周期三条规则让悬垂指针、数据竞争、双重释放成为不可能，而这一切不付出任何运行时开销。代价是陡峭的学习曲线——你会和借用检查器搏斗，但一旦通过编译，程序就极少崩溃。已连续多年位居开发者「最想使用的语言」榜首。',
      useCases: ['系统编程与操作系统（Linux 内核已引入）', 'WebAssembly', '高性能后端服务', '区块链与密码学', '替换 C/C++ 的安全关键组件'],
      file: 'main.rs',
      ext: 'rs',
      gotchas: [
        '变量默认不可变，需要改就要 mut',
        '赋值会把所有权转移（move），之后原变量不可再用',
        '同一时刻只能有一个可变借用，或多个不可变借用',
        'String 与 &str 是两回事，混用是新手第一道坎',
        'unwrap() 在错误时会 panic，生产代码应处理 Result'
      ],
      hello: 'fn main() {\n    println!("Hello, World!");\n}'
    }
  };

  /* 其他语言速览（不提供完整教程，仅速查与对比中出现） */
  var OTHERS = [
    { id: 'csharp', name: 'C#', abbr: 'C#', color: '#68217A', year: 2000, desc: '微软主力语言，.NET 生态核心，游戏开发（Unity）首选。' },
    { id: 'kotlin', name: 'Kotlin', abbr: 'Kt', color: '#7F52FF', year: 2011, desc: '现代 JVM 语言，Android 官方推荐，语法比 Java 简洁得多。' },
    { id: 'swift', name: 'Swift', abbr: 'Sw', color: '#F05138', year: 2014, desc: 'Apple 生态主力，安全现代，取代 Objective-C。' },
    { id: 'php', name: 'PHP', abbr: 'Ph', color: '#777BB4', year: 1995, desc: 'Web 后端老兵，驱动着全球大量网站（WordPress / Laravel）。' },
    { id: 'ruby', name: 'Ruby', abbr: 'Rb', color: '#CC342D', year: 1995, desc: '优雅至上，Rails 框架曾定义了 Web 开发的范式。' },
    { id: 'lua', name: 'Lua', abbr: 'Lu', color: '#000080', year: 1993, desc: '极轻量嵌入式脚本，游戏与 OpenResty 的胶水。' },
    { id: 'sql', name: 'SQL', abbr: 'SQ', color: '#E38C00', year: 1974, desc: '关系型数据库查询语言，数据处理的通用语。' },
    { id: 'shell', name: 'Shell', abbr: 'Sh', color: '#89E051', year: 1971, desc: '系统管理与自动化运维的基础工具。' }
  ];

  var ORDER = ['python', 'javascript', 'java', 'c', 'cpp', 'typescript', 'go', 'rust'];

  CL.Languages = {
    map: LANGUAGES,
    list: ORDER.map(function (id) { return LANGUAGES[id]; }),
    order: ORDER,
    others: OTHERS,
    get: function (id) { return LANGUAGES[id] || null; },
    exists: function (id) { return !!LANGUAGES[id]; },
    color: function (id) { return LANGUAGES[id] ? LANGUAGES[id].color : '#0f5fc9'; }
  };

})(window);
