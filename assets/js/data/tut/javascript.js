/* ==========================================================================
   CodeUp码上 · data/tut/javascript.js — JavaScript 教程
   --------------------------------------------------------------------------
   结构严格对标 python.js（13 章、block 写法、中文散文风格）。
   所有 run:true 代码块只用 console.log 输出，不引用 window/document，
   由网站浏览器沙箱（AsyncFunction + console 参数）直接执行。
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL;
  var T = CL.Tutorials;

  T.register('javascript', {
    chapters: [

      /* ==================================================== 1 语言概览 */
      {
        id: 'overview',
        title: '语言概览',
        sub: '一门诞生于浏览器、如今无处不在的语言',
        blocks: [
          { t: 'p', x: 'JavaScript 由 Brendan Eich 在 1995 年只用 **10 天** 为 Netscape 浏览器设计出来。它最初叫 LiveScript，为了蹭上当时 Java 的热度改名为 JavaScript——但其实两者除了名字，几乎没有关系。' },

          { t: 'p', x: '今天的 JavaScript 早已不只是「网页特效语言」。借助 **Node.js**，它能在服务器端运行；借助 React / Vue，它能构建完整的前端应用；借助 Electron，它甚至能写桌面软件。一门语言同时覆盖前端、后端、脚本、移动端，这在学习路径上几乎是独一份。' },

          { t: 'h2', x: '语言的本质' },
          { t: 'p', x: 'JavaScript 有三个常被误解的身份：**动态类型**（变量不绑定类型）、**基于原型**（不是传统的类继承，但 ES6 之后有了 class 语法糖）、**事件驱动与异步优先**（从设计之初就要处理「用户点了按钮之后才执行」这类不确定时机的逻辑）。' },

          { t: 'h2', x: '第一个程序' },
          { t: 'code', lang: 'javascript', title: 'Hello, World!', run: true, ed: true,
            code: [
              'console.log("Hello, World!");'
            ],
            expect: 'Hello, World!' },

          { t: 'p', x: '在 JavaScript 里，把文字输出到控制台用的不是 `print`，而是 `console.log`。这行代码在任何支持 JS 的环境（浏览器控制台、Node.js、本教程沙箱）里都会得到同样的结果。对比一下其他语言的第一个程序，你会更直观地感受 JS 的取舍。' },

          { t: 'h2', x: '和其他语言的第一个程序对比' },
          { t: 'cmp', title: '同样输出一行 "Hello, World!"', run: false,
            x: {
              python: ['print("Hello, World!")'].join('\n'),
              java: ['public class Main {', '    public static void main(String[] args) {', '        System.out.println("Hello, World!");', '    }', '}'].join('\n'),
              c: ['#include <stdio.h>', '', 'int main(void) {', '    printf("Hello, World!\\n");', '    return 0;', '}'].join('\n'),
              cpp: ['#include <iostream>', '', 'int main() {', '    std::cout << "Hello, World!" << std::endl;', '    return 0;', '}'].join('\n'),
              javascript: ['console.log("Hello, World!");'].join('\n'),
              typescript: ['const message: string = "Hello, World!";', 'console.log(message);'].join('\n'),
              go: ['package main', '', 'import "fmt"', '', 'func main() {', '    fmt.Println("Hello, World!")', '}'].join('\n'),
              rust: ['fn main() {', '    println!("Hello, World!");', '}'].join('\n')
            }},

          { t: 'p', x: '这张对照表值得反复看。Java 需要类和 main 方法的「仪式」，C 需要头文件和返回码，Go 需要包声明——这些都不是多余的，它们服务于各自语言的工程目标。但作为第一个程序，JavaScript 让你直接看到本质：**调用一个函数，输出一串字符**。没有编译、没有类型声明、没有仪式感，改完立刻能跑。' },

          { t: 'h2', x: 'JavaScript 擅长什么' },
          { t: 'defs', x: [
            { term: 'Web 前端', desc: '浏览器里唯一原生支持的语言，所有交互、动画、数据请求都靠它驱动。' },
            { term: '服务器端（Node.js）', desc: '用同一门语言写前后端，npm 拥有全世界最大的开源包生态。' },
            { term: '快速原型与脚本', desc: '无编译、即写即跑，非常适合自动化、爬虫、构建工具。' },
            { term: '跨平台应用', desc: 'Electron / React Native 让 JS 能写桌面和移动端应用。' }
          ]},

          { t: 'h2', x: 'JavaScript 不擅长什么' },
          { t: 'ul', x: [
            '**CPU 密集且要求极致性能的场景**——JS 是单线程解释执行，数值计算远不如 C/C++/Rust。',
            '**强类型保证的超大型项目**——虽然 TypeScript 补上了类型，但那是「外挂」，原生 JS 仍是动态类型。',
            '**精确的数值与金融运算**——浮点数 `0.1 + 0.2 !== 0.3` 是语言层面的坑，需要格外小心。',
            '**直接操作底层硬件/系统**——它运行在引擎里，离操作系统很远。'
          ]},

          { t: 'note', k: 'tip', title: '怎么判断该不该学 JavaScript',
            x: '如果你想做网站、全栈开发、或者已经是前端工程师——JavaScript 是必学且绕不开的。如果你只做机器学习或底层系统，那它更多是「顺手掌握」的辅助工具。但作为一门「能立刻看到效果」的语言，它对初学者非常友好。' },

          { t: 'h2', x: '从「脚本语言」到「全栈语言」的关键节点' },
          { t: 'table',
            head: ['年份', '关键事件'],
            rows: [
              ['1995', 'Brendan Eich 10 天写出 Mocha，后改名 LiveScript、JavaScript'],
              ['1997', 'ECMAScript 1 标准发布，语言走向规范化'],
              ['2009', 'Node.js 发布，JS 第一次能跑在浏览器之外'],
              ['2015', 'ES2015（ES6）：let/const、class、箭头函数、Promise、模块——现代 JS 的起点'],
              ['2017+', 'async/await、可选链、空值合并等小步快跑，每年一个新版本']
            ]},

          { t: 'code', lang: 'javascript', title: '异步是 JS 的灵魂', run: true,
            code: [
              '// await 一个定时器，模拟「过一会儿才返回」',
              'console.log("1: 开始");',
              'const p = new Promise(function (resolve) {',
              '    setTimeout(function () { resolve("done"); }, 0);',
              '});',
              'console.log("2: 同步代码继续跑（不等 Promise）");',
              'await p;',
              'console.log("3: 异步任务完成")'
            ],
            expect: '1: 开始\n2: 同步代码继续跑（不等 Promise）\n3: 异步任务完成' },

          { t: 'p', x: '注意输出顺序：即使 `setTimeout` 的延时写的是 `0`，它也排在最后。因为 JavaScript **单线程**——同一时刻只能做一件事，耗时操作（网络、定时器）会被「挂起」，等同步代码全部跑完再回来处理。这个模型是理解后面 Promise、async/await 的地基。' },

          { t: 'h2', x: '怎么学这门语言' },
          { t: 'ol', x: [
            '**先跑起来**：每段代码都点「运行」，改一改参数看输出，别只读',
            '**不要背语法**：JS 的坑（`==`、`this`、变量提升）靠理解，不靠记忆',
            '**小步迭代**：学完一章就到浏览器控制台里自己写两句话试试',
            '**遇到错先读报错**：JS 的错误信息通常已经告诉你错在哪一行、什么类型'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '在控制台里打印出「我准备好学习 JavaScript 了！」这一行。', lang: 'javascript',
            code: [
              'console.log("我准备好学习 JavaScript 了！");'
            ],
            expect: '我准备好学习 JavaScript 了！',
            hint: '用 console.log。',
            ans: '一行 `console.log(...)` 就够。' },

          { t: 'think', q: '为什么说 JavaScript 是「异步优先」的语言？这和单线程有什么关系？', ans: '因为 JS 在浏览器里要响应用户操作（点击、滚动），在 Node 里要处理网络请求，这些操作都「不知道什么时候完成」。如果等它完成，整个程序就卡死了。于是 JS 设计成单线程 + 事件循环：耗时操作挂起，主线程继续跑别的，完成后再回调。这就是异步优先。' },

          { t: 'think', q: 'JavaScript 的「动态类型」和 Java/C++ 的「静态类型」有什么本质区别？这对调试意味着什么？', ans: '静态类型在编译时就确定变量的类型，写错了类型编译器直接报错；动态类型在运行时才确定，变量可以随时换成另一种类型。好处是写起来灵活、不用到处写类型声明，坏处是「把字符串当数字用」这类错误要跑到那一行才炸，调试时需要更多的运行时检查。这也是为什么大型 JS 项目后来都转向 TypeScript——把类型检查提前到写代码的时候。' },

          { t: 'kp', x: [
            'JavaScript 是浏览器唯一原生支持的语言，也是前端的根基',
            '动态类型：变量不需要声明类型，但类型错误会在运行时暴露',
            '基于原型（prototype），ES6 之后提供 class 语法糖',
            '异步优先：回调、Promise、async/await 是理解 JS 的核心',
            '代码即写即跑，没有编译步骤，开发循环极短'
          ]}
        ]
      },

      /* ==================================================== 2 快速开始 */
      {
        id: 'setup',
        title: '快速开始',
        sub: '浏览器控制台、Node.js，以及代码怎么跑起来',
        blocks: [
          { t: 'h2', x: 'JavaScript 的两种运行方式' },
          { t: 'p', x: '学习 JavaScript 最幸运的一点：你**不需要安装任何东西**就能开始。每台电脑的浏览器里都自带一个 JavaScript 引擎。当然，若想做真正的项目，装上 Node.js 会让你走得更远。' },

          { t: 'h3', x: '浏览器开发者控制台' },
          { t: 'p', x: '在 Chrome / Edge / Firefox 里按 `F12`（或右键「检查」），切到 **Console** 标签页，就能直接输入 JavaScript 并回车执行。这是最适合初学者的「草稿本」。' },

          { t: 'code', lang: 'javascript', title: '在控制台里试试', run: true,
            code: [
              'const lang = "JavaScript";',
              'console.log("欢迎学习 " + lang + "！");',
              'console.log("它诞生于 1995 年，由 Brendan Eich 设计。");'
            ],
            expect: '欢迎学习 JavaScript！\n它诞生于 1995 年，由 Brendan Eich 设计。' },

          { t: 'h3', x: 'Node.js（服务器端运行）' },
          { t: 'p', x: 'Node.js 把 Chrome 的 V8 引擎搬到了操作系统层面，让 JavaScript 能读写文件、搭建服务器。去 nodejs.org 下载「LTS」版本安装即可。安装后验证：' },

          { t: 'code', lang: 'shell', title: '检查 Node 版本', run: false,
            code: [
              '# 在终端/命令提示符里执行',
              'node --version',
              'npm --version',
              '',
              '# 直接进入交互式 REPL',
              'node'
            ]},

          { t: 'h2', x: '编写并运行一个 .js 文件' },
          { t: 'p', x: '实际项目中，代码写在 `.js` 文件里。新建 `hello.js`，写入下面的内容，然后在终端运行 `node hello.js`。在本教程沙箱里，点「运行」按钮即可看到相同的输出：' },

          { t: 'code', lang: 'javascript', title: 'hello.js', run: true, ed: true,
            code: [
              '// 这是一个完整的 JS 文件',
              'function greet(name) {',
              '    return "你好，" + name + "！";',
              '}',
              '',
              'const friends = ["Alice", "Bob", "Carol"];',
              'for (const f of friends) {',
              '    console.log(greet(f));',
              '}'
            ],
            expect: '你好，Alice！\n你好，Bob！\n你好，Carol！' },

          { t: 'note', k: 'warn', title: '浏览器和 Node 的环境差异',
            x: '浏览器里有 `window`、`document`、DOM 等；Node 里没有这些，但有 `process`、`fs` 等文件操作能力。**本教程的沙箱是浏览器环境，但没有 `window` 和 `document`**——所以所有例子都只用 `console.log` 输出，绝不依赖 DOM，这样你粘贴到其他环境也能跑。' },

          { t: 'h2', x: 'Node 的交互式 REPL' },
          { t: 'p', x: '直接输入 `node` 而不带文件名，就进入了一个「读—求值—打印」循环。每输入一行就立刻执行并回显结果，非常适合做小实验。退出按 `Ctrl + C` 两次。' },

          { t: 'h2', x: '推荐的开发工具' },
          { t: 'defs', x: [
            { term: 'VS Code', desc: '免费、轻量、插件极多。装 JavaScript 扩展后支持智能补全、调试、断点。' },
            { term: 'Node.js', desc: '运行 JS、管理依赖（npm）的基石，做项目必装。' },
            { term: '浏览器开发者工具', desc: 'F12 打开，Console 用于试代码，Sources 用于断点调试。' },
            { term: 'npm', desc: '随 Node 一起安装的包管理器，npm 上有数百万个开源库。' }
          ]},

          { t: 'h2', x: '在本教程沙箱里怎么跑代码' },
          { t: 'p', x: '每个 `code` 块右上角都有「运行」按钮。点一下，代码会在一个隔离的沙箱里执行，`console.log` 的输出会显示在代码块下方。你可以直接点「编辑」改几行再跑——这是学语言最快的方式。' },

          { t: 'code', lang: 'javascript', title: '试一试：改一行再跑', run: true,
            code: [
              'const langs = ["JS", "TS", "Python", "Go"];',
              'console.log("我会的语言数: " + langs.length);',
              'langs.push("Rust");',
              'console.log("加上 Rust 后: " + langs.join(", "));'
            ],
            expect: '我会的语言数: 4\n加上 Rust 后: JS, TS, Python, Go, Rust' },

          { t: 'h2', x: '常见的「跑不起来」原因' },
          { t: 'ul', x: [
            '**忘了保存**：VS Code 里改完代码要先 `Ctrl+S`，终端里跑的才是最新版本',
            '**路径错了**：终端当前目录要和 `.js` 文件所在目录一致，或写绝对路径',
            '**用了 `window` / `document`**：本教程沙箱没有浏览器 DOM，代码只认 `console.log`',
            '**中文标点**：输入法开着时容易打出全角分号 `；` 或全角括号，JS 只认半角'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '在控制台里打印出你的名字和今天的心情，用两行 console.log 输出。', lang: 'javascript',
            code: [
              'const name = "在这里填你的名字";',
              'const mood = "在这里填今天的心情";',
              'console.log(name);',
              'console.log(mood);'
            ],
            expect: '在这里填你的名字\n在这里填今天的心情',
            hint: '把引号里的内容换成你自己的文字即可。',
            ans: '把第一行的 `name` 和第二行的 `mood` 改成你自己的内容，点「运行」就能看到。比如 `const name = "小明";`。' },

          { t: 'think', q: '为什么本教程的例子都只用 console.log，而不用 alert 或 document.write？', ans: '因为 `alert` 会弹出阻塞式对话框、`document.write` 会依赖浏览器 DOM；两者都不适合在「点一下就跑」的沙箱里自动执行。`console.log` 在浏览器和 Node 里行为完全一致，输出也方便比对——所以它是教学沙箱的唯一选择。' },

          { t: 'think', q: '浏览器控制台、Node.js、本教程沙箱这三个环境，初学阶段应该优先用哪个做小实验？为什么？', ans: '优先用本教程沙箱——零安装、点一下就跑、输出直接显示在代码下方，最适合「学一个语法立刻试一下」的节奏。浏览器控制台（F12）适合做更自由的交互式实验，但需要自己打开浏览器、切换到 Console 面板。Node.js 适合写多文件的小项目，但需要安装和命令行操作。初学阶段「降低启动成本」最重要，所以沙箱 > 浏览器控制台 > Node.js。' },

          { t: 'kp', x: [
            '初学阶段用浏览器控制台即可，零安装成本',
            '做项目装 Node.js 的 LTS 版本，并用 node 文件名.js 运行',
            '浏览器有 DOM，Node 有 fs，沙箱两者都没有，只用 console.log',
            'npm 是 JavaScript 世界最大的资产——但先学好语言本身',
            'REPL 适合做一行行的小实验'
          ]}
        ]
      },

      /* ==================================================== 3 基础语法 */
      {
        id: 'basics',
        title: '基础语法',
        sub: 'var / let / const、注释、语句与分号',
        blocks: [
          { t: 'h2', x: '变量声明：var / let / const' },
          { t: 'p', x: 'JavaScript 有三种声明变量的方式。`var` 是老语法，存在「变量提升」等反直觉行为；**现在统一推荐 `let`（可变）和 `const`（不可重新赋值）**。声明时不需要写类型，赋值即确定。' },

          { t: 'code', lang: 'javascript', title: '三种声明方式', run: true, ed: true,
            code: [
              'var a = 1;',
              'let b = 2;',
              'const c = 3;',
              'console.log("a=" + a + " b=" + b + " c=" + c);',
              '// const 不能重新赋值，下面这行若取消注释会报错：',
              '// c = 4;',
              'console.log("c 仍是 " + c);'
            ],
            expect: 'a=1 b=2 c=3\nc 仍是 3' },

          { t: 'note', k: 'warn', title: 'var 的坑：变量提升',
            x: '`var` 声明的变量会被「提升」到函数顶部，且**没有块级作用域**，在 `if`/`for` 里声明的 `var` 会泄漏到外面。这正是 ES6 引入 `let`/`const` 的原因。新代码里请彻底放弃 `var`。' },

          { t: 'h2', x: '第一个完整程序' },
          { t: 'code', lang: 'javascript', title: '问候列表', run: true,
            code: [
              'function greet(name) {',
              '    return \'你好，\' + name + \'！\';',
              '}',
              '',
              'const names = ["Alice", "Bob", "Carol"];',
              'for (const n of names) {',
              '    console.log(greet(n));',
              '}'
            ],
            expect: '你好，Alice！\n你好，Bob！\n你好，Carol！' },

          { t: 'p', x: '注意缩进：JavaScript 用**大括号 `{}`** 划分代码块，缩进只是可读性习惯，不是语法要求（这点与 Python 不同）。但良好的缩进能让你少犯无数错。' },

          { t: 'h2', x: '注释' },
          { t: 'code', lang: 'javascript', title: '单行与多行注释', run: true,
            code: [
              '// 这是单行注释',
              'const x = 10;  // 行尾注释（建议 // 前留两个空格）',
              '',
              '/* 这是',
              '   多行注释 */',
              'console.log("x=" + x);'
            ],
            expect: 'x=10' },

          { t: 'h2', x: '语句与分号（ASI）' },
          { t: 'p', x: 'JavaScript 大多数语句以分号结尾，但引擎有**自动分号插入（ASI）**机制：即使你省略分号，只要换行清晰，引擎也会帮你补上。下面的代码没有写任何分号，依然能正常运行：' },

          { t: 'code', lang: 'javascript', title: '不写分号也能跑', run: true,
            code: [
              'console.log("第一行")',
              'console.log("第二行")',
              'const sum = 1 + 2',
              'console.log("1+2=" + sum)'
            ],
            expect: '第一行\n第二行\n1+2=3' },

          { t: 'note', k: 'info', title: '分号到底写不写？',
            x: '社区两派。写分号（Java/C 风格）更保险，不会踩 ASI 的少数边界坑；不写分号（如 Standard 风格）更简洁。本教程统一**写分号**，因为 `return` 后换行等场景省略分号会静默出错，初学阶段显式分号最安全。' },

          { t: 'table',
            head: ['声明方式', '能否重新赋值', '作用域', '建议'],
            rows: [
              ['`var`', '能', '函数级（会提升）', '不要用'],
              ['`let`', '能', '块级', '可变变量用'],
              ['`const`', '不能（但对象内部可改）', '块级', '默认首选']
            ]},

          { t: 'h2', x: '变量提升（hoisting）到底是什么' },
          { t: 'p', x: '引擎在执行代码前会先「扫一遍」当前作用域，把所有 `var` 声明**挪到作用域顶部**——但只挪声明，不挪赋值。所以你能在声明行之前访问到这个变量，只是它的值是 `undefined`。' },

          { t: 'code', lang: 'javascript', title: 'var 的提升：先使用后声明不报错', run: true,
            code: [
              'console.log("声明前 a =", a);',
              'var a = 10;',
              'console.log("声明后 a =", a);'
            ],
            expect: '声明前 a = undefined\n声明后 a = 10' },

          { t: 'h2', x: '暂时性死区（TDZ）：let / const 的保护' },
          { t: 'p', x: '`let` 和 `const` 也会被提升，但引擎故意不让你在声明行之前访问它们——这段「声明前到声明处」的区间叫**暂时性死区**。在死区里访问会直接抛 `ReferenceError`，而不是悄悄给你一个 `undefined`。这正是 `let`/`const` 比 `var` 安全的根本原因。' },

          { t: 'code', lang: 'javascript', title: 'TDZ 示例', run: true,
            code: [
              'try {',
              '    console.log(b);',
              '} catch (e) {',
              '    console.log("死区里访问 b 抛出: " + e.constructor.name);',
              '}',
              'const b = 20;',
              'console.log("声明后 b =", b);'
            ],
            expect: '死区里访问 b 抛出: ReferenceError\n声明后 b = 20' },

          { t: 'h2', x: 'const 真的「不可变」吗' },
          { t: 'p', x: '`const` 锁住的是**绑定**，不是**值**。它要求这个变量不能再指向别的东西，但如果你指向的是对象/数组，对象内部的字段该改还是能改。初学者最容易在这里踩坑。' },

          { t: 'code', lang: 'javascript', title: 'const 对象内部仍可修改', run: true,
            code: [
              'const user = { name: "Alice", age: 25 };',
              'user.age = 26;',
              'console.log("改字段后: " + user.name + ", " + user.age);',
              '',
              'const list = [1, 2];',
              'list.push(3);',
              'console.log("push 后: " + list.join(", "));',
              '',
              '// 下面这行会报错，因为它换了绑定：',
              '// user = { name: "Bob" };'
            ],
            expect: '改字段后: Alice, 26\npush 后: 1, 2, 3' },

          { t: 'note', k: 'tip', title: '想真正冻结对象怎么办',
            x: '用 `Object.freeze(obj)` 可以浅冻结（属性不能再改）；深层嵌套需要递归冻结。日常代码里理解「const 锁绑定不锁值」就够了。' },

          { t: 'h2', x: '命名规范' },
          { t: 'table',
            head: ['对象', '风格', '示例'],
            rows: [
              ['变量 / 函数', 'camelCase（小驼峰）', '`userName`、`calculateTotal`'],
              ['常量', 'UPPER_SNAKE_CASE', '`MAX_RETRY`、`DEFAULT_PORT`'],
              ['类 / 构造函数', 'PascalCase（大驼峰）', '`Student`、`HttpServer`'],
              ['私有成员', '下划线前缀', '`_internalCache`'],
              ['避免', '单字母（除循环 i/j）、拼音、与关键字撞名', '`l`、`O`、`let` 都是坑']
            ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '声明两个变量：一个用 `const` 存你的年龄，一个用 `let` 存你的年级，然后把年级改成「初三」，最后打印两行。', lang: 'javascript',
            code: [
              'const age = 13;',
              'let grade = "初一";',
              'grade = "初三";',
              'console.log("年龄: " + age);',
              'console.log("年级: " + grade);'
            ],
            expect: '年龄: 13\n年级: 初三',
            hint: 'const 不能重新赋值，let 可以。',
            ans: 'const 用来声明「不会变」的年龄，let 用来声明「会变」的年级。改年级时直接 `grade = "初三"` 即可。' },

          { t: 'ex', q: '下面代码会输出什么？先在脑子里预测，再点运行验证。', lang: 'javascript',
            code: [
              'var x = 1;',
              'function f() {',
              '    console.log(x);',
              '    var x = 2;',
              '    console.log(x);',
              '}',
              'f();'
            ],
            expect: 'undefined\n2',
            hint: '函数里的 `var x` 会被提升到函数顶部，但赋值不会。',
            ans: '函数内的 `var x` 提升到函数顶部（遮蔽了外部的 `x = 1`），但赋值 `x = 2` 仍在原处执行。所以第一行打印的是提升后的 `undefined`，第二行才是 `2`。这就是为什么新代码不要再用 `var`。' },

          { t: 'think', q: '为什么 const 声明的对象能改它的属性，但不能整个重新赋值？', ans: 'const 锁住的是变量和内存地址之间的绑定，而不是内存里那块数据。`user.age = 26` 没有换地址，只是改了对象内部的字段，所以允许；而 `user = {...}` 是让 `user` 指向另一块内存，这违反了 const 的绑定规则，会报错。' },

          { t: 'think', q: 'let 和 const 都有暂时性死区，那为什么我们还是推荐默认用 const？', ans: 'TDZ 是保护机制，不是麻烦。默认 const 能强迫你在声明处就想清楚「这个值以后不会变」，从而减少意外重新赋值带来的 bug。真要改的时候再换成 let，语义上一目了然。' },

          { t: 'kp', x: [
            '新代码只用 let 和 const，彻底告别 var',
            '优先用 const，只有确实需要重新赋值时才用 let',
            '代码块用大括号 {} 包裹，缩进是习惯不是语法',
            '注释用 // 和 /* */，注释是给人类看的',
            '初学阶段建议显式写分号，避开 ASI 的边界坑'
          ]}
        ]
      },

      /* ==================================================== 4 数据类型 */
      {
        id: 'types',
        title: '数据类型',
        sub: '八种类型、动态类型与 typeof',
        blocks: [
          { t: 'h2', x: 'JavaScript 的八种数据类型' },
          { t: 'p', x: 'ES2015 之后，JavaScript 共有 **7 种原始类型 + 1 种对象类型**：`number`、`string`、`boolean`、`null`、`undefined`、`symbol`、`bigint`，以及 `object`（含数组、函数、普通对象等）。最特别的是：**JavaScript 是动态类型语言**——变量本身没有类型，类型属于「值」。同一个变量可以先装数字，再装字符串。' },

          { t: 'code', lang: 'javascript', title: '用 typeof 查看类型', run: true,
            code: [
              'console.log(typeof 42);',
              'console.log(typeof "hello");',
              'console.log(typeof true);',
              'console.log(typeof undefined);',
              'console.log(typeof null);',
              'console.log(typeof {});',
              "console.log(typeof Symbol('id'));",
              'console.log(typeof 123n);',
              'console.log(typeof function(){});'
            ],
            expect: 'number\nstring\nboolean\nundefined\nobject\nobject\nsymbol\nbigint\nfunction' },

          { t: 'note', k: 'info', title: '两个著名的「反直觉」',
            x: '`typeof null` 返回 `"object"`——这是 1995 年留下的历史 bug，至今为了兼容无法修复。而函数虽然本质是对象，但 `typeof` 会特意返回 `"function"`。记住这两条，别被它们绊倒。' },

          { t: 'h3', x: 'number：数字与精度陷阱' },
          { t: 'code', lang: 'javascript', title: '数字与 NaN', run: true,
            code: [
              'console.log(10 / 3);',
              'console.log(Number.isNaN(NaN));',
              'console.log(Number.isFinite(Infinity));',
              'console.log(0.1 + 0.2);'
            ],
            expect: '3.3333333333333335\ntrue\nfalse\n0.30000000000000004' },

          { t: 'h3', x: 'string：字符串' },
          { t: 'code', lang: 'javascript', title: '常用字符串操作', run: true,
            code: [
              'const s = "JavaScript";',
              'console.log(s.length);',
              'console.log(s.toUpperCase());',
              'console.log(s.includes("Script"));',
              'console.log(s.slice(0, 4));'
            ],
            expect: '10\nJAVASCRIPT\ntrue\nJava' },

          { t: 'h3', x: 'boolean / null / undefined' },
          { t: 'p', x: '`true`/`false` 是布尔值；`null` 表示「有意地空」；`undefined` 表示「还没赋值」。两者都代表「无」，但语义不同：`null` 是你主动给的，`undefined` 是系统默认的。' },

          { t: 'code', lang: 'javascript', title: '动态类型：变量可随时换类型', run: true,
            code: [
              'let value = 42;',
              'console.log("初始: " + value);',
              'value = "现在我是字符串";',
              'console.log("之后: " + value);',
              'value = true;',
              'console.log("再之后: " + value);'
            ],
            expect: '初始: 42\n之后: 现在我是字符串\n再之后: true' },

          { t: 'h3', x: 'bigint 与 symbol' },
          { t: 'p', x: '`bigint`（数字后加 `n`）用于表示超出 `number` 安全范围的大整数；`symbol` 是独一无二、不可变的值，常作为对象属性的「私有钥匙」。它们属于进阶类型，先有个印象即可。' },

          { t: 'table',
            head: ['类型', 'typeof 结果', '举例'],
            rows: [
              ['数字', '`"number"`', '`42`、`3.14`、`NaN`'],
              ['字符串', '`"string"`', '`"hi"`'],
              ['布尔', '`"boolean"`', '`true` / `false`'],
              ['空', '`"object"`', '`null`'],
              ['未定义', '`"undefined"`', '`undefined`'],
              ['对象', '`"object"`', '`{}`、`[]`'],
              ['函数', '`"function"`', '`function(){}`'],
              ['大整数', '`"bigint"`', '`123n`'],
              ['符号', '`"symbol"`', '`Symbol()`']
            ]},

          { t: 'h2', x: '== 的转换表：为什么永远不要用它' },
          { t: 'p', x: '`==` 在两边类型不同时，会按一套极其复杂的规则把它们转成数字再比。下面是初学者最容易中招的几条，看完你就明白为什么社区会把 `==` 列入黑名单。' },

          { t: 'code', lang: 'javascript', title: '== 的反直觉结果', run: true,
            code: [
              'console.log(0 == false);',
              'console.log(0 == "");',
              'console.log("" == false);',
              'console.log(null == undefined);',
              'console.log([] == false);',
              'console.log([1] == 1);'
            ],
            expect: 'true\ntrue\ntrue\ntrue\ntrue\ntrue' },

          { t: 'table',
            head: ['表达式', '结果', '原因'],
            rows: [
              ['`0 == false`', '`true`', 'false 转成 0'],
              ['`"" == false`', '`true`', '空字符串和 false 都转成 0'],
              ['`null == undefined`', '`true`', '规范明确规定它们互相等于'],
              ['`[] == false`', '`true`', '空数组先转空字符串再转 false'],
              ['`[1] == 1`', '`true`', '数组先转字符串 "1"，再转数字 1'],
              ['`NaN == NaN`', '**`false`**', 'NaN 不等于任何值，包括它自己']
            ]},

          { t: 'h2', x: '显式类型转换：Number / String / Boolean' },
          { t: 'p', x: '与其让引擎偷偷转，不如你自己写出来。`Number()`、`String()`、`Boolean()` 是最常用的三个显式转换函数，读代码的人一眼就知道你在做什么。' },

          { t: 'code', lang: 'javascript', title: '显式转换示例', run: true,
            code: [
              'console.log(Number("42"));',
              'console.log(Number("3.14"));',
              'console.log(Number("abc"));',
              'console.log(String(42));',
              'console.log(Boolean(0));',
              'console.log(Boolean("0"));',
              'console.log(Boolean([]));'
            ],
            expect: '42\n3.14\nNaN\n42\nfalse\ntrue\ntrue' },

          { t: 'note', k: 'info', title: '几个易错的转换结果',
            x: '`Number("")` 是 `0` 不是 `NaN`；`Number(null)` 是 `0`，但 `Number(undefined)` 是 `NaN`；`Boolean([])` 和 `Boolean({})` 都是 `true`——空对象/空数组在布尔上下文里是真值。这些特例没有道理，记住即可。' },

          { t: 'h2', x: 'typeof 的三个坑' },
          { t: 'code', lang: 'javascript', title: 'typeof 不等于类型本身', run: true,
            code: [
              'console.log(typeof null);',
              'console.log(typeof [1, 2, 3]);',
              'console.log(typeof undefined);',
              'console.log(Array.isArray([1, 2]));',
              'console.log(Object.prototype.toString.call(null));'
            ],
            expect: 'object\nobject\nundefined\ntrue\n[object Null]' },

          { t: 'p', x: '想严格判断「是不是数组」用 `Array.isArray()`；想拿到精确的类型标签，用 `Object.prototype.toString.call(x)`——它会返回 `"[object Array]"`、`"[object Null]"` 这种字符串。日常代码 `typeof` 够用，遇到边界情况再上这两个。' },

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '给定一个用户输入的字符串 age，把它转成数字，如果结果是 NaN 就打印「不是数字」，否则打印「年龄是 X」。', lang: 'javascript',
            code: [
              'const input = "18";',
              'const age = Number(input);',
              'if (Number.isNaN(age)) {',
              '    console.log("不是数字");',
              '} else {',
              '    console.log("年龄是 " + age);',
              '}'
            ],
            expect: '年龄是 18',
            hint: '用 Number.isNaN() 判断，不要直接写 age === NaN。',
            ans: '因为 NaN 是唯一「不等于自己」的值，所以 `age === NaN` 永远是 false。必须用 `Number.isNaN(age)` 或 `isNaN(age)`。' },

          { t: 'ex', q: '下面代码会输出什么？先预测，再运行。', lang: 'javascript',
            code: [
              'const a = "10";',
              'const b = 10;',
              'console.log(a == b);',
              'console.log(a === b);'
            ],
            expect: 'true\nfalse',
            hint: '== 会偷偷转类型，=== 不会。',
            ans: '`a == b` 时 `a` 被转成数字 10，所以是 true；`a === b` 要求类型和值都相等，string 和 number 类型不同，所以是 false。' },

          { t: 'h2', x: '关键术语' },
          { t: 'defs', x: [
            { term: '原始类型 vs 引用类型', desc: '原始类型（number、string、boolean、null、undefined、symbol、bigint）存在栈里，赋值时复制值本身；引用类型（对象、数组、函数）存在堆里，赋值时只复制地址——改一个变量的属性会影响另一个。' },
            { term: 'typeof 运算符', desc: '返回值的类型字符串，如 `typeof 42 === "number"`。注意两个历史 bug：`typeof null === "object"`、`typeof function(){} === "function"`（函数是对象的子类型但 typeof 单独返回 function）。' },
            { term: '隐式类型转换', desc: 'JS 在运算或比较时自动把值转成另一种类型，比如 `"5" + 3` 得到 `"53"`（数字转字符串拼接）、`"5" * 3` 得到 `15`（字符串转数字相乘）。== 比较时也会触发转换，这是它反直觉的根源。' },
            { term: 'undefined 与 null', desc: 'undefined 表示「声明了但没赋值」，是 JS 自动给的默认值；null 表示「故意设为空值」，需要手动赋值。`typeof undefined === "undefined"`，但 `typeof null === "object"`（历史 bug）。判断空值时用 `x == null` 可以同时匹配两者。' }
          ]},

          { t: 'think', q: '为什么 `typeof null` 返回 "object"？', ans: '这是 1995 年 JavaScript 第一版留下的 bug：当时的实现把值用一个类型标签标记，null 的机器码刚好和对象的标签重合。后来语言普及，修这个 bug 会破坏大量旧代码，于是只能保留至今。它不是设计决策，是历史包袱。' },

          { t: 'think', q: 'NaN 为什么不等于自己？怎么判断一个值是不是 NaN？', ans: 'IEEE 754 标准规定 NaN（不是一个数字）表示「计算出错的结果」，两个错误结果之间没有相等关系，所以 `NaN === NaN` 是 false。判断时用 `Number.isNaN(x)`，或者利用它不等于自己这个特性：`x !== x` 为 true 时 x 就是 NaN。' },

          { t: 'kp', x: [
            'JS 共 8 种类型：7 原始 + object',
            '动态类型：变量无类型，类型属于值本身',
            'typeof 对 null 返回 object 是历史 bug，记住即可',
            '浮点数有精度问题，0.1+0.2 不等于 0.3',
            'null 是「主动为空」，undefined 是「系统默认空」'
          ]}
        ]
      },

      /* ==================================================== 5 运算符 */
      {
        id: 'operators',
        title: '运算符与类型强制转换',
        sub: '算术、比较（=== vs ==）、逻辑与强制转换',
        blocks: [
          { t: 'h2', x: '算术运算符' },
          { t: 'code', lang: 'javascript', title: '加减乘除与取模、幂', run: true, ed: true,
            code: [
              'console.log(7 + 3);',
              'console.log(7 - 3);',
              'console.log(7 * 3);',
              'console.log(7 / 3);',
              'console.log(7 % 3);',
              'console.log(2 ** 10);'
            ],
            expect: '10\n4\n21\n2.3333333333333335\n1\n1024' },

          { t: 'h2', x: '比较：=== 还是 == ？' },
          { t: 'p', x: '这是 JavaScript 最重要的习惯之一：**永远用 `===`（严格相等）和 `!==`（严格不等）**。`==` 会在比较前偷偷做「类型转换」，制造出 `0 == false` 这种反直觉的结果。新手请直接把 `==` 从词汇表里删掉。' },

          { t: 'code', lang: 'javascript', title: '=== 与 == 的区别', run: true,
            code: [
              'console.log(1 == "1");',
              'console.log(1 === "1");',
              'console.log(0 == false);',
              'console.log(0 === false);',
              'console.log(null == undefined);',
              'console.log(null === undefined);'
            ],
            expect: 'true\nfalse\ntrue\nfalse\ntrue\nfalse' },

          { t: 'note', k: 'danger', title: '禁用 == 的强制转换',
            x: '`==` 的转换规则极其复杂：它会把字符串转数字、把 `false` 转 `0`、把 `null` 和 `undefined` 视作相等。这类「好心办坏事」的隐式转换是无数线上 bug 的源头。**除非你清楚自己在做什么，否则只写 `===`。**' },

          { t: 'h2', x: '逻辑运算符与短路' },
          { t: 'p', x: '`&&`（与）、`||`（或）、`!`（非）不仅返回布尔值，还会做**短路求值**：`&&` 遇假即停，`||` 遇真即停，并返回那个「决定结果」的值——这常被用来做默认值。' },

          { t: 'code', lang: 'javascript', title: '短路求值', run: true,
            code: [
              'console.log(true && "yes");',
              'console.log(false && "no");',
              'console.log(true || "fallback");',
              'console.log(0 || "default");'
            ],
            expect: 'yes\nfalse\ntrue\ndefault' },

          { t: 'h2', x: '类型强制转换' },
          { t: 'p', x: 'JavaScript 在需要时会自动把值转成目标类型，但**总是显式转换更安全**：用 `Number()`、`String()`、`Boolean()` 明确表达意图。尤其要记住哪些是「假值（falsy）」——它们在 `if` 判断里都会被当成 `false`。' },

          { t: 'code', lang: 'javascript', title: 'Boolean() 与假值', run: true,
            code: [
              'console.log(Boolean(0));',
              'console.log(Boolean(""));',
              'console.log(Boolean(null));',
              'console.log(Boolean(undefined));',
              'console.log(Boolean(NaN));',
              'console.log(Boolean("hello"));',
              'console.log(Boolean(42));'
            ],
            expect: 'false\nfalse\nfalse\nfalse\nfalse\ntrue\ntrue' },

          { t: 'table',
            head: ['假值（falsy）', '其余都是真值'],
            rows: [
              ['`false`', '非零数字'],
              ['`0`、`-0`、`0n`', '非空字符串'],
              ['`""`（空字符串）', '任何对象 `{}`、`[]`'],
              ['`null`', '`true`'],
              ['`undefined`', '——'],
              ['`NaN`', '——']
            ]},

          { t: 'h2', x: '赋值运算符' },
          { t: 'code', lang: 'javascript', title: '复合赋值', run: true,
            code: [
              'let n = 10;',
              'n += 5;',
              'console.log("+=5 后: " + n);',
              'n *= 2;',
              'console.log("*=2 后: " + n);'
            ],
            expect: '+=5 后: 15\n*=2 后: 30' },

          { t: 'h2', x: '逗号运算符与运算符优先级' },
          { t: 'p', x: '逗号 `,` 在 JS 里也是运算符：它会依次执行两边的表达式，**返回右边那个**。日常代码里它常用于 `for` 的多变量步进，别在别的地方乱用。运算符优先级不用背，**该加括号就加括号**——这比记住规则可靠得多。' },

          { t: 'code', lang: 'javascript', title: '逗号与括号', run: true,
            code: [
              'let a = (1 + 2, 3 + 4);',
              'console.log("a =", a);',
              'const x = 2 + 3 * 4;',
              'const y = (2 + 3) * 4;',
              'console.log("无括号: " + x + ", 有括号: " + y);'
            ],
            expect: 'a = 7\n无括号: 14, 有括号: 20' },

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '给定一个字符串价格 `"19.9"`，用 `??` 和 `||` 分别在它为 null/undefined 和为空字符串时给出默认值 `"未填"`，并打印对比。', lang: 'javascript',
            code: [
              'const price = "19.9";',
              'console.log("|| 结果: " + (price || "未填"));',
              'console.log("?? 结果: " + (price ?? "未填"));'
            ],
            expect: '|| 结果: 19.9\n?? 结果: 19.9',
            hint: 'price 是非空字符串，两个运算符结果相同；把 price 改成 "" 再试一次。',
            ans: '当 price 是 `""` 时，`||` 会把空字符串当假值返回「未填」，而 `??` 只在 null/undefined 时才返回默认，会保留空字符串。配置项场景一定要用 `??`。' },

          { t: 'h2', x: '关键术语' },
          { t: 'defs', x: [
            { term: '假值（falsy）', desc: '在布尔上下文里被当作 false 的值，一共 6 个：`false`、`0`、`""`（空字符串）、`null`、`undefined`、`NaN`。其他所有值都是真值（truthy），包括 `"0"`、`"false"`、`[]`、`{}`。' },
            { term: '严格相等（===）', desc: '不做类型转换的比较：类型不同直接返回 false，类型相同再比值。`"5" === 5` 是 false，`5 === 5` 是 true。对应的不相等是 `!==`。现代代码一律用 === 和 !==，永远不要用 == 和 !=。' },
            { term: '逻辑短路', desc: '`&&` 和 `||` 不一定返回布尔值——它们返回「决定结果的那个操作数」。`a && b`：如果 a 是假值，直接返回 a（不看 b）；如果 a 是真值，返回 b。`a || b`：如果 a 是真值，直接返回 a；如果 a 是假值，返回 b。这个特性常用来写默认值和条件执行。' },
            { term: '运算符优先级', desc: '多个运算符同时出现时的执行顺序，和数学里的「先乘除后加减」类似。JS 有完整的优先级表（* / 高于 + -，比较高于 &&，&& 高于 || 等），不确定时加括号——括号不仅改变优先级，还让代码更易读。' }
          ]},

          { t: 'think', q: '为什么 `0.1 + 0.2 !== 0.3`？在金额计算里应该怎么处理？', ans: 'JS 的 number 是 64 位浮点数，0.1 和 0.2 在二进制里都是无限循环小数，存储时被截断，相加后末尾多出误差。金额计算正确做法是：① 用整数分存（19.90 元存成 1990）；② 用 `Number.EPSILON` 做误差范围内比较；③ 直接用 Decimal.js 等专用库。' },

          { t: 'think', q: '`&&` 和 `||` 返回的一定是布尔值吗？`0 && "hello"` 和 `0 || "hello"` 分别返回什么？', ans: '不一定。JS 的逻辑运算符返回的是「决定结果的那个操作数」，而不是强制转成布尔值。`0 && "hello"` 因为 0 是假值，`&&` 一遇到假值就短路返回它，所以返回 `0`（不是 false）。`0 || "hello"` 因为 0 是假值，`||` 继续往后找，返回 `"hello"`（不是 true）。这个特性常被用来写默认值：`const name = inputName || "匿名"`，但要注意 0 和空字符串会被当成「空」替换掉。' },

          { t: 'kp', x: [
            '比较一律用 === 和 !==，别用 ==',
            '逻辑运算符会返回「决定结果」的那个值，而非单纯布尔',
            '需要类型转换时显式调用 Number()/String()/Boolean()',
            '记住 6 个假值：false、0、""、null、undefined、NaN',
            '算术里小心浮点精度：0.1+0.2 !== 0.3'
          ]}
        ]
      },

      /* ==================================================== 6 流程控制 */
      {
        id: 'control',
        title: '流程控制',
        sub: 'if / for / while / switch / 三元运算符',
        blocks: [
          { t: 'h2', x: 'if / else 条件判断' },
          { t: 'code', lang: 'javascript', title: '成绩评级', run: true, ed: true,
            code: [
              'const score = 85;',
              'if (score >= 90) {',
              '    console.log("优秀");',
              '} else if (score >= 60) {',
              '    console.log("及格");',
              '} else {',
              '    console.log("不及格");',
              '}'
            ],
            expect: '及格' },

          { t: 'h2', x: 'for 循环' },
          { t: 'p', x: '经典 `for (初始化; 条件; 步进)` 适合已知次数的循环；`for...of` 用来遍历**可迭代对象**（数组、字符串等）的值；`for...in` 用来遍历对象的**键名**（不推荐用于数组）。' },

          { t: 'code', lang: 'javascript', title: '经典 for', run: true,
            code: [
              'for (let i = 1; i <= 3; i++) {',
              '    console.log("计数: " + i);',
              '}'
            ],
            expect: '计数: 1\n计数: 2\n计数: 3' },

          { t: 'code', lang: 'javascript', title: 'for...of 遍历数组', run: true,
            code: [
              'const fruits = ["苹果", "香蕉", "橙子"];',
              'for (const f of fruits) {',
              '    console.log(f);',
              '}'
            ],
            expect: '苹果\n香蕉\n橙子' },

          { t: 'h2', x: 'while 循环' },
          { t: 'code', lang: 'javascript', title: 'while 与 do...while', run: true,
            code: [
              'let n = 3;',
              'while (n > 0) {',
              '    console.log("n=" + n);',
              '    n--;',
              '}'
            ],
            expect: 'n=3\nn=2\nn=1' },

          { t: 'h2', x: 'switch 多分支' },
          { t: 'code', lang: 'javascript', title: '根据数字判断星期', run: true,
            code: [
              'const day = 3;',
              'let name;',
              'switch (day) {',
              '    case 1: name = "周一"; break;',
              '    case 2: name = "周二"; break;',
              '    case 3: name = "周三"; break;',
              '    default: name = "其他";',
              '}',
              'console.log("今天是" + name);'
            ],
            expect: '今天是周三' },

          { t: 'h2', x: '三元运算符' },
          { t: 'p', x: '`条件 ? 真时的值 : 假时的值` 是 if/else 的紧凑写法，适合简单的二选一。逻辑复杂时仍建议写完整的 if/else，可读性更好。' },

          { t: 'code', lang: 'javascript', title: '三元表达式', run: true,
            code: [
              'const age = 20;',
              'console.log(age >= 18 ? "成年人" : "未成年人");'
            ],
            expect: '成年人' },

          { t: 'h2', x: 'break 与 continue' },
          { t: 'p', x: '`break` 立即结束整个循环；`continue` 跳过本次循环、进入下一轮。它们常与 `if` 配合，用来「提前退出」或「跳过某些项」。' },

          { t: 'h2', x: 'for...in 与 for...of 的区别' },
          { t: 'p', x: '新手最容易把这两个搞混。**`for...in` 遍历键名（字符串），`for...of` 遍历值**。遍历数组请永远用 `for...of`，`for...in` 只适合遍历普通对象的键。' },

          { t: 'code', lang: 'javascript', title: 'for...in vs for...of', run: true,
            code: [
              'const arr = ["a", "b", "c"];',
              'console.log("--- for...of（值）---");',
              'for (const v of arr) console.log(v);',
              'console.log("--- for...in（键）---");',
              'for (const k in arr) console.log(k + " -> " + arr[k]);'
            ],
            expect: '--- for...of（值）---\na\nb\nc\n--- for...in（键）---\n0 -> a\n1 -> b\n2 -> c' },

          { t: 'h2', x: 'switch 的「case 穿透」' },
          { t: 'p', x: '每个 `case` 后面如果忘了写 `break`，代码会**继续往下执行下一个 case 的语句**，直到碰到 `break` 或 switch 结束。这既可能是 bug，也可能是技巧（多个 case 共用一段逻辑时故意穿透）。' },

          { t: 'code', lang: 'javascript', title: 'case 穿透示例', run: true,
            code: [
              'function grade(score) {',
              '    switch (true) {',
              '        case score >= 90: return "A";',
              '        case score >= 80: return "B";',
              '        case score >= 60: return "C";',
              '        default: return "D";',
              '    }',
              '}',
              'console.log(grade(95), grade(85), grade(65), grade(40));'
            ],
            expect: 'A B C D' },

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 for...of 遍历数组 `[1, 2, 3, 4, 5]`，打印其中所有偶数。', lang: 'javascript',
            code: [
              'const nums = [1, 2, 3, 4, 5];',
              'for (const n of nums) {',
              '    if (n % 2 === 0) console.log(n);',
              '}'
            ],
            expect: '2\n4',
            hint: 'n % 2 === 0 表示能被 2 整除。',
            ans: '遍历每个 n，用 `if (n % 2 === 0)` 筛选偶数，符合条件就打印。' },

          { t: 'h2', x: '关键术语' },
          { t: 'defs', x: [
            { term: '块级作用域', desc: '由一对花括号 `{}` 包裹的区域，let 和 const 声明的变量只在这个块内可见。if、for、while 都会创建块级作用域——在 for 循环里用 `let i` 声明的 i，循环外面访问不到。var 没有块级作用域，这是它被 let/const 取代的核心原因。' },
            { term: 'break 与 continue', desc: 'break 直接跳出整个循环，循环不再继续；continue 只跳过当前这一次迭代，进入下一次循环。在嵌套循环里，它们默认只影响最内层循环；要跳出外层需要用标签（label）语法，但更推荐把内层循环抽成函数用 return。' },
            { term: 'switch 穿透（fallthrough）', desc: 'switch 的 case 匹配后，如果没有写 break，执行会「穿透」到下一个 case 继续执行。这不是 bug，是设计特性——可以利用它让多个 case 共享同一段代码。但忘记写 break 导致意外穿透是新手常见 bug，每个 case 末尾记得加 break。' },
            { term: '三元表达式（? :）', desc: '`条件 ? 值A : 值B` 的简写形式，条件为真返回值 A，为假返回值 B。它是表达式不是语句，可以直接赋值或传参。适合简单的二选一，但嵌套三元会严重影响可读性，复杂逻辑仍用 if/else。' }
          ]},

          { t: 'think', q: '为什么 for...in 不适合遍历数组？', ans: '因为 `for...in` 遍历的是「可枚举的键」，包括从原型链继承下来的属性。如果有人给 Array.prototype 加了方法（很多旧库就这么干），你的循环里会冒出莫名其妙的字符串。此外数组的键是字符串下标（"0"、"1"），不是数字，拿到后还要再转换。用 `for...of` 或 `forEach` 就没这些问题。' },

          { t: 'think', q: '`break` 和 `continue` 有什么区别？在嵌套循环里，它们默认只影响哪一层？', ans: '`break` 直接跳出整个循环，循环不再继续；`continue` 只跳过当前这一次迭代，进入下一次循环。比如遍历数组找第一个偶数，找到了就 `break`（不需要再看后面的）；如果要跳过奇数只打印偶数，就用 `continue`。在嵌套循环里，`break` 和 `continue` 默认只影响**最内层**的那个循环——如果要跳出外层循环，需要给循环加标签（`outer: for(...)` 然后 `break outer`），但标签语法在日常代码里很少见，更推荐把内层循环抽成函数用 `return` 跳出。' },

          { t: 'kp', x: [
            '条件判断用 if / else if / else',
            '已知次数用 for，遍历值用 for...of',
            '不确定次数、依赖条件时用 while',
            '多固定分支可用 switch，别忘了每个 case 后的 break',
            '简单二选一用三元 ? :，复杂逻辑仍用 if/else'
          ]}
        ]
      },

      /* ==================================================== 7 函数 */
      {
        id: 'functions',
        title: '函数',
        sub: '声明、表达式、箭头函数、闭包与默认参数',
        blocks: [
          { t: 'h2', x: '函数声明 vs 函数表达式' },
          { t: 'p', x: '**函数声明** `function foo(){}` 会被提升，可在定义前调用；**函数表达式** `const foo = function(){}` 不会被提升。现代写法更倾向表达式或箭头函数，因为它们能清楚地表达「函数也是值」。' },

          { t: 'code', lang: 'javascript', title: '两种定义方式', run: true, ed: true,
            code: [
              'function declared() {',
              '    return "我是函数声明";',
              '}',
              'const expressed = function () {',
              '    return "我是函数表达式";',
              '};',
              'console.log(declared());',
              'console.log(expressed());'
            ],
            expect: '我是函数声明\n我是函数表达式' },

          { t: 'h2', x: '箭头函数' },
          { t: 'p', x: 'ES6 的箭头函数 `() => {}` 写法更短，且**不绑定自己的 `this`**（它会沿用外层作用域的 `this`）。正因为这个特性，它在回调里极其好用。' },

          { t: 'code', lang: 'javascript', title: '箭头函数', run: true,
            code: [
              'const square = (x) => x * x;',
              'const add = (a, b) => a + b;',
              'console.log("square(5)=" + square(5));',
              'console.log("add(2,3)=" + add(2, 3));'
            ],
            expect: 'square(5)=25\nadd(2,3)=5' },

          { t: 'h2', x: '默认参数' },
          { t: 'code', lang: 'javascript', title: '带默认值的参数', run: true,
            code: [
              'function greet(name = "匿名用户", greeting = "你好") {',
              '    return greeting + "，" + name;',
              '}',
              'console.log(greet());',
              'console.log(greet("Alice"));',
              'console.log(greet("Bob", "欢迎"));'
            ],
            expect: '你好，匿名用户\n你好，Alice\n欢迎，Bob' },

          { t: 'h2', x: '闭包（closure）' },
          { t: 'p', x: '**闭包**是 JavaScript 最迷人也最容易卡壳的概念：函数可以「记住」它被创建时所在作用域里的变量，即使那个作用域已经执行完。下面这个计数器，每次调用都访问同一个「私有」的 `count`：' },

          { t: 'code', lang: 'javascript', title: '用闭包实现计数器', run: true,
            code: [
              'function counter() {',
              '    let count = 0;',
              '    return function () {',
              '        count++;',
              '        return count;',
              '    };',
              '}',
              'const c = counter();',
              'console.log(c());',
              'console.log(c());',
              'console.log(c());'
            ],
            expect: '1\n2\n3' },

          { t: 'note', k: 'info', title: '闭包有什么用？',
            x: '闭包让「数据私有化」成为可能——外部无法直接修改 `count`，只能通过返回的函数间接操作它。模块封装、事件回调、防抖节流，底层全靠闭包。理解了闭包，你就理解了 JS 的一半精髓。' },

          { t: 'h2', x: '高阶函数：把函数当参数' },
          { t: 'p', x: '因为函数是「一等公民」，可以当作参数传递、作为返回值。能接收函数参数的函数叫**高阶函数**，`map`/`filter`/`reduce` 都是典型代表（下一章细讲）。' },

          { t: 'code', lang: 'javascript', title: '函数作为参数', run: true,
            code: [
              'function apply(arr, fn) {',
              '    return arr.map(fn);',
              '}',
              'const doubled = apply([1, 2, 3], (x) => x * 2);',
              'console.log(doubled.join(", "));'
            ],
            expect: '2, 4, 6' },

          { t: 'h2', x: '箭头函数的三种形态' },
          { t: 'p', x: '箭头函数不是「长得短」这么简单。根据参数个数和函数体形式，它有几种常见写法：单参数可省括号、单行可省 `return`。' },

          { t: 'code', lang: 'javascript', title: '箭头函数速查', run: true,
            code: [
              'const f1 = (x) => x * 2;',
              'const f2 = x => x * 2;',
              'const f3 = () => 42;',
              'const f4 = (a, b) => {',
              '    const s = a + b;',
              '    return s * 2;',
              '};',
              'console.log(f1(3), f2(3), f3(), f4(2, 3));'
            ],
            expect: '6 6 42 10' },

          { t: 'note', k: 'warn', title: '箭头函数的三个「不能」',
            x: '箭头函数①没有自己的 `this`（沿用外层）；②没有 `arguments` 对象（用 `...rest` 代替）；③不能用作构造函数（`new () => {}` 会报错）。这三条记住，就知道什么时候不能用箭头函数。' },

          { t: 'h2', x: '闭包经典坑：循环里的 var' },
          { t: 'p', x: '下面这段代码在 JS 里非常有名，是理解闭包 + 变量提升的绝佳材料。用 `var` 时，三个函数共享同一个 `i`，循环跑完后 `i` 已经是 3，所以三个都打印 3；用 `let` 时，每轮循环都会创建一个新的 `i`，三个函数各自记住自己那一轮的副本。' },

          { t: 'code', lang: 'javascript', title: 'var vs let 在闭包里', run: true,
            code: [
              'const fs1 = [];',
              'for (var i = 0; i < 3; i++) fs1.push(() => i);',
              'console.log("var:  ", fs1[0](), fs1[1](), fs1[2]());',
              '',
              'const fs2 = [];',
              'for (let j = 0; j < 3; j++) fs2.push(() => j);',
              'console.log("let: ", fs2[0](), fs2[1](), fs2[2]());'
            ],
            expect: 'var:   3 3 3\nlet:  0 1 2' },

          { t: 'h2', x: 'this：为什么回调里它会丢' },
          { t: 'p', x: '普通函数被对象调用时，`this` 指向那个对象；但一旦把这个函数「单独拿出来」传进 `setTimeout` 或事件回调，`this` 就变成了全局对象（或严格模式下的 undefined）。用箭头函数就能解决——它根本不绑定自己的 `this`。' },

          { t: 'code', lang: 'javascript', title: '回调里的 this：普通函数 vs 箭头函数', run: true,
            code: [
              'const counter = {',
              '    count: 42,',
              '    tickRegular: function () {',
              '        const cb = function () {',
              '            // 普通函数单独调用时，this 不再指向 counter',
              '            return "this.count = " + this.count;',
              '        };',
              '        console.log("普通函数回调 → " + cb());',
              '    },',
              '    tickArrow: function () {',
              '        const cb = () => "this.count = " + this.count;',
              '        console.log("箭头函数回调 → " + cb());',
              '    }',
              '};',
              'counter.tickRegular();',
              'counter.tickArrow();'
            ],
            expect: '普通函数回调 → this.count = undefined\n箭头函数回调 → this.count = 42' },

          { t: 'h2', x: '剩余参数 ...args' },
          { t: 'code', lang: 'javascript', title: '收集任意个数的参数', run: true,
            code: [
              'function sum(...nums) {',
              '    return nums.reduce((a, n) => a + n, 0);',
              '}',
              'console.log("sum() =", sum());',
              'console.log("sum(1,2,3) =", sum(1, 2, 3));',
              'console.log("sum(1,2,3,4,5) =", sum(1, 2, 3, 4, 5));'
            ],
            expect: 'sum() = 0\nsum(1,2,3) = 6\nsum(1,2,3,4,5) = 15' },

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个箭头函数 `multiply`，接收两个参数返回乘积；再用它算 6 × 7。', lang: 'javascript',
            code: [
              'const multiply = (a, b) => a * b;',
              'console.log("6 × 7 =", multiply(6, 7));'
            ],
            expect: '6 × 7 = 42',
            hint: '单表达式箭头函数可以省略 return 和大括号。',
            ans: '`const multiply = (a, b) => a * b;` 一行就够。' },

          { t: 'ex', q: '用闭包写一个「倍数计算器」：调用 `multiplier(3)` 返回一个函数，这个函数接收 n 后返回 `n × 3`。', lang: 'javascript',
            code: [
              'function multiplier(factor) {',
              '    return (n) => n * factor;',
              '}',
              'const triple = multiplier(3);',
              'console.log("triple(5) =", triple(5));',
              'console.log("triple(10) =", triple(10));'
            ],
            expect: 'triple(5) = 15\ntriple(10) = 30',
            hint: '返回的箭头函数记住了外层的 factor。',
            ans: '`multiplier(3)` 返回的函数里，`factor` 被闭包捕获为 3，之后每次调用 `triple(n)` 都算 `n * 3`。' },

          { t: 'h2', x: '关键术语' },
          { t: 'defs', x: [
            { term: '闭包（closure）', desc: '函数「记住」了它定义时的作用域，即使在外面调用也能访问当时的变量。闭包是 JS 最强大的特性之一，用来做数据封装、私有变量、函数工厂。常见坑：循环里用 var 声明的变量被闭包共享，导致所有回调拿到同一个值——用 let 或立即执行函数解决。' },
            { term: '高阶函数（higher-order function）', desc: '能接受函数作为参数，或返回一个函数的函数。数组的 map、filter、reduce 都是高阶函数，setTimeout 也是。高阶函数让代码更声明式——你说「要做什么」（map 每个元素乘 2），而不是「怎么做」（写 for 循环一个个改）。' },
            { term: '回调函数（callback）', desc: '作为参数传给另一个函数、在合适时机被调用的函数。异步操作（setTimeout、事件监听、fetch）的核心机制就是回调。回调嵌套过深会形成「回调地狱」，Promise 和 async/await 就是为了解决这个问题。' },
            { term: '函数提升（hoisting）', desc: '函数声明（`function f(){}`）会被提升到作用域顶部，写在调用后面也能用。但函数表达式（`const f = function(){}`）和箭头函数不会被提升，必须先定义后调用。这是函数声明和函数表达式最关键的区别。' }
          ]},

          { t: 'think', q: '为什么 `this` 是 JS 里最容易踩坑的概念？箭头函数为什么能「救」它？', ans: '因为普通函数的 `this` 不取决于它写在哪儿，而取决于它**怎么被调用**：`obj.method()` 里 this 是 obj；`const m = obj.method; m()` 里 this 就丢了。箭头函数干脆不绑定自己的 this，直接沿用外层作用域的 this，所以写回调时永远「指哪儿是哪儿」，bug 大幅减少。' },

          { t: 'think', q: '下面两个写法等价吗？`function f(){}` 和 `const f = function(){}` 有什么本质区别？', ans: '不等价。前者是**函数声明**，会被提升到作用域顶部，写在调用语句后面也能用；后者是**函数表达式**，把一个匿名函数赋值给 const 变量，不会被提升，必须先定义后调用。现代代码更倾向后者或箭头函数，因为它明确表达「函数也是值」，避免提升带来的反直觉。' },

          { t: 'kp', x: [
            '函数声明会被提升，函数表达式不会',
            '箭头函数更简洁，且不绑定自己的 this',
            '默认参数让函数调用更宽容',
            '闭包 = 函数 + 它能访问的外层变量，是封装的核心',
            '函数是一等公民，可以像普通值一样传递'
          ]}
        ]
      },

      /* ==================================================== 8 开发环境与工具链 */
      {
        id: 'devtools',
        title: '开发环境与工具链',
        sub: '从 Node.js 到构建工具，搭建专业前端/Node 开发环境',
        blocks: [
          { t: 'h2', x: 'Node.js 安装与版本管理' },
          { t: 'p', x: 'Node.js 是 JavaScript 的服务端运行时，基于 V8 引擎。做项目必须装 Node.js——它带来了 npm（包管理器）和整个前端工具链生态。' },
          { t: 'defs', x: [
            { term: 'nvm', desc: '最流行的 Node 版本管理工具。nvm install 20、nvm use 20、nvm alias default 20。macOS/Linux 原生支持，Windows 用 nvm-windows。' },
            { term: 'fnm', desc: 'Rust 写的极速 Node 版本管理器，比 nvm 快 10 倍以上。跨平台。' },
            { term: 'LTS 版本', desc: '长期支持版本：偶数号（18、20、22）。生产环境用 LTS，奇数号是当前版本，适合尝鲜。' }
          ]},
          { t: 'code', lang: 'shell', title: 'nvm 常用命令', run: false,
            code: [
              'nvm install 20            # 安装 Node 20',
              'nvm use 20                # 当前终端用 20',
              'nvm alias default 20      # 设为默认',
              'node -v                   # 验证',
              'npm -v                    # npm 版本'
            ]},
          { t: 'h2', x: '包管理：npm、yarn、pnpm' },
          { t: 'defs', x: [
            { term: 'npm', desc: 'Node 自带的包管理器，最通用。npm install、npm run、npx。package.json + package-lock.json。' },
            { term: 'pnpm', desc: '性能最好的包管理器，硬链接 + 内容寻址存储，节省磁盘空间，安装速度比 npm/yarn 快 2-3 倍。Monorepo 首选。' },
            { term: 'yarn', desc: 'Facebook 出品，经典版（v1）稳定，Berry 版（v2+）支持 Plug\'n\'Play（无 node_modules）。' },
            { term: 'npx', desc: 'npm 自带的包执行工具，直接运行命令行工具而无需全局安装。npx create-vite@latest。' }
          ]},
          { t: 'h2', x: 'IDE 与编辑器' },
          { t: 'defs', x: [
            { term: 'VS Code', desc: '前端开发绝对主流，免费开源。内置 Emmet、智能补全、调试、Git。扩展生态极强。' },
            { term: 'WebStorm', desc: 'JetBrains 出品的 JavaScript/TypeScript IDE，付费。重构、调试、框架集成度极高。' }
          ]},
          { t: 'note', k: 'tip', title: 'VS Code 必装扩展',
            x: 'ESLint（实时 lint）、Prettier（保存自动格式化）、EditorConfig（统一编辑器配置）、GitLens（Git 增强）、Error Lens（行内错误提示）。设置 editor.formatOnSave: true。' },
          { t: 'h2', x: '构建工具' },
          { t: 'defs', x: [
            { term: 'Vite', desc: '现代前端构建工具事实标准。开发服务器基于原生 ESM，冷启动毫秒级，HMR 极速。生产构建用 Rollup。' },
            { term: 'esbuild', desc: 'Go 写的极速打包器，比 Webpack 快 10-100 倍。Vite 的底层依赖之一。' },
            { term: 'Rollup', desc: 'ES Module 打包器，Tree Shaking 优秀。Vite 生产构建和大多数库的打包工具。' },
            { term: 'Webpack', desc: '老牌模块打包器，功能最全，插件生态最丰富。配置复杂，大型项目仍在使用。' }
          ]},
          { t: 'code', lang: 'shell', title: 'Vite 创建项目', run: false,
            code: [
              'npm create vite@latest myapp -- --template vue',
              'cd myapp && npm install',
              'npm run dev          # 启动开发服务器',
              'npm run build        # 生产构建',
              'npm run preview      # 预览构建结果'
            ]},
          { t: 'h2', x: '代码质量工具链' },
          { t: 'table', head: ['工具', '作用', '配置文件'], rows: [
            ['ESLint', '代码检查（语法+风格+最佳实践）', 'eslint.config.js'],
            ['Prettier', '代码格式化', '.prettierrc'],
            ['EditorConfig', '统一编辑器配置', '.editorconfig'],
            ['Husky', 'Git hooks 管理', '.husky/'],
            ['lint-staged', '只对暂存文件运行 lint', 'package.json'],
            ['TypeScript', '静态类型检查', 'tsconfig.json']
          ]},
          { t: 'h2', x: '调试工具' },
          { t: 'defs', x: [
            { term: 'Chrome DevTools', desc: '浏览器内置调试器：Sources（断点）、Console（REPL）、Network（网络）、Performance（性能）、Memory（内存）。F12 打开。' },
            { term: 'Node Inspector', desc: 'Node.js 内置调试器。node --inspect app.js 启动，打开 chrome://inspect 附加。' },
            { term: 'VS Code 调试', desc: 'launch.json 配置调试，支持 Node、浏览器、Docker。打断点、单步执行、变量监视。' }
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            'Node.js：用 nvm/fnm 管理多版本，生产用 LTS',
            '包管理：npm（通用）、pnpm（快/省空间）、yarn（经典）',
            'IDE：VS Code（免费主流）或 WebStorm（专业）',
            '构建：Vite（现代标准）、esbuild（极速）、Rollup（库打包）',
            '质量：ESLint + Prettier + Husky + lint-staged',
            '调试：Chrome DevTools（浏览器）、Node Inspector（Node）、VS Code 调试'
          ]}
        ]
      },

      /* ==================================================== 9 集合类型 */
      {
        id: 'collections',
        title: '数组与对象',
        sub: 'Array 的 map/filter/reduce、Object、Set 与 Map',
        blocks: [
          { t: 'h2', x: '数组与 map / filter' },
          { t: 'p', x: '数组 `[]` 是 JS 里最常用的集合。`map` 把每个元素「映射」成新值，`filter` 按条件「筛选」元素，两者都**返回新数组、不修改原数组**——这是函数式风格的精髓。' },

          { t: 'code', lang: 'javascript', title: 'map 与 filter', run: true, ed: true,
            code: [
              'const nums = [1, 2, 3, 4, 5];',
              'const squares = nums.map(n => n * n);',
              'const evens = nums.filter(n => n % 2 === 0);',
              'console.log("平方: " + squares.join(", "));',
              'console.log("偶数: " + evens.join(", "));'
            ],
            expect: '平方: 1, 4, 9, 16, 25\n偶数: 2, 4' },

          { t: 'h2', x: 'reduce：把数组「折叠」成单个值' },
          { t: 'p', x: '`reduce` 最强大也最易懵：`(累加器, 当前值) => 新累加器`，从一个初始值开始，把整个数组「累积」成一个数、一个对象、甚至一个新数组。求和、求最大值、分组统计都离不开它。' },

          { t: 'code', lang: 'javascript', title: 'reduce 求和与求最大', run: true,
            code: [
              'const nums = [10, 20, 30];',
              'const sum = nums.reduce((acc, n) => acc + n, 0);',
              'const max = nums.reduce((a, b) => a > b ? a : b);',
              'console.log("求和: " + sum);',
              'console.log("最大: " + max);'
            ],
            expect: '求和: 60\n最大: 30' },

          { t: 'h2', x: '对象 Object' },
          { t: 'p', x: '对象 `{}` 用「键值对」组织数据，是 JSON 的基础。访问属性可用点号 `obj.key` 或方括号 `obj["key"]`；`this` 在方法里指向调用者。' },

          { t: 'code', lang: 'javascript', title: '定义与访问对象', run: true,
            code: [
              'const person = {',
              '    name: "Alice",',
              '    age: 30,',
              '    greet: function () {',
              '        return "你好，我是" + this.name;',
              '    }',
              '};',
              'console.log(person.name);',
              'console.log(person.greet());',
              'console.log(Object.keys(person).join(", "));'
            ],
            expect: 'Alice\n你好，我是Alice\nname, age, greet' },

          { t: 'h2', x: 'Set：去重集合' },
          { t: 'code', lang: 'javascript', title: 'Set 自动去重', run: true,
            code: [
              'const set = new Set([1, 1, 2, 3, 3]);',
              'console.log("去重后: " + [...set].join(", "));',
              'console.log("是否包含2: " + set.has(2));'
            ],
            expect: '去重后: 1, 2, 3\n是否包含2: true' },

          { t: 'h2', x: 'Map：键值对集合' },
          { t: 'p', x: '`Map` 像对象，但**键可以是任意类型**（对象只能字符串/Symbol 作键），并且能方便地把对象当作键。需要「真正的映射表」时优先用 `Map`。' },

          { t: 'code', lang: 'javascript', title: 'Map 的基本用法', run: true,
            code: [
              'const map = new Map();',
              'map.set("a", 1);',
              'map.set("b", 2);',
              'console.log("a=" + map.get("a"));',
              'console.log("大小: " + map.size);'
            ],
            expect: 'a=1\n大小: 2' },

          { t: 'h2', x: '解构：快速取出成员' },
          { t: 'code', lang: 'javascript', title: '数组与对象解构', run: true,
            code: [
              'const [x, y, ...others] = [1, 2, 3, 4];',
              'console.log("x=" + x + " y=" + y + " 其余=" + others.join(","));',
              'const obj = { name: "Alice", age: 30 };',
              'const { name, age } = obj;',
              'console.log("name=" + name + " age=" + age);'
            ],
            expect: 'x=1 y=2 其余=3,4\nname=Alice age=30' },

          { t: 'table',
            head: ['数组方法', '作用', '是否改原数组'],
            rows: [
              ['`map(fn)`', '每个元素映射成新值', '不改'],
              ['`filter(fn)`', '保留满足条件的元素', '不改'],
              ['`reduce(fn, init)`', '累积成单个值', '不改'],
              ['`forEach(fn)`', '遍历，无返回值', '不改'],
              ['`find(fn)`', '返回第一个满足条件的元素', '不改'],
              ['`sort(fn)`', '排序', '会改原数组']
            ]},

          { t: 'h2', x: '数组方法链：filter → map → reduce' },
          { t: 'p', x: '因为 map / filter / reduce 都返回新数组，你可以把它们**串成一条链**，像流水线一样处理数据。这是 JS 里最常用的数据处理范式。' },

          { t: 'code', lang: 'javascript', title: '一条链算出偶数平方和', run: true,
            code: [
              'const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];',
              'const result = nums',
              '    .filter(n => n % 2 === 0)',
              '    .map(n => n * n)',
              '    .reduce((sum, n) => sum + n, 0);',
              'console.log("偶数平方和 =", result);'
            ],
            expect: '偶数平方和 = 220' },

          { t: 'p', x: '链是这样走的：先筛出 `[2,4,6,8,10]` → 平方成 `[4,16,36,64,100]` → 累加得 `220`。每一步都干净独立，读代码的人一眼看清数据流。' },

          { t: 'h2', x: 'Map 的键可以是对象' },
          { t: 'p', x: '普通对象的键会被强制转成字符串，无法用对象当键。Map 没这个限制——它用**严格相等（SameValueZero）**判断键是否相同。' },

          { t: 'code', lang: 'javascript', title: 'Map 用对象当键', run: true,
            code: [
              'const user = { id: 1 };',
              'const cache = new Map();',
              'cache.set(user, "已登录");',
              'console.log("同引用能拿到: " + cache.get(user));',
              'console.log("新对象拿不到: " + cache.get({ id: 1 }));'
            ],
            expect: '同引用能拿到: 已登录\n新对象拿不到: undefined' },

          { t: 'h2', x: 'Set 与数组的互转' },
          { t: 'code', lang: 'javascript', title: '一行去重', run: true,
            code: [
              'const dup = [1, 2, 2, 3, 3, 3, 4];',
              'const unique = [...new Set(dup)];',
              'console.log("去重后: " + unique.join(", "));',
              'console.log("是否包含 3: " + unique.includes(3));'
            ],
            expect: '去重后: 1, 2, 3, 4\n是否包含 3: true' },

          { t: 'h2', x: '展开运算符 ... 操作对象' },
          { t: 'p', x: 'ES2018 之后，`...` 也能展开对象。这在「复制一份再改几个字段」时非常常用，比 `Object.assign` 干净得多。' },

          { t: 'code', lang: 'javascript', title: '对象展开做浅拷贝', run: true,
            code: [
              'const base = { host: "localhost", port: 3000, debug: false };',
              'const dev = { ...base, port: 5000, debug: true };',
              'console.log("base:", JSON.stringify(base));',
              'console.log("dev: ", JSON.stringify(dev));'
            ],
            expect: 'base: {"host":"localhost","port":3000,"debug":false}\ndev:  {"host":"localhost","port":5000,"debug":true}' },

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '给定 `[15, 23, 8, 42, 16, 4]`，用 filter + map 链：先筛出大于 10 的数，再把每个数乘以 2，最后打印结果。', lang: 'javascript',
            code: [
              'const nums = [15, 23, 8, 42, 16, 4];',
              'const out = nums.filter(n => n > 10).map(n => n * 2);',
              'console.log(out.join(", "));'
            ],
            expect: '30, 46, 84, 32',
            hint: 'filter 出大于 10 的是 15,23,42,16，再乘 2。',
            ans: '筛选后是 `[15, 23, 42, 16]`，乘 2 得 `[30, 46, 84, 32]`。' },

          { t: 'ex', q: '用 Set 把字符串 `"hello world"` 里的字符去重，再打印成一行（保持原顺序）。', lang: 'javascript',
            code: [
              'const s = "hello world";',
              'const unique = [...new Set(s)].join("");',
              'console.log(unique);'
            ],
            expect: 'helo wrd',
            hint: '字符串是可迭代对象，可以直接放进 Set。',
            ans: 'h 出现 1 次、e 1 次、l 3 次（只留 1 个）、o 2 次、空格 1 次、w 1 次、r 1 次、d 1 次，结果是 `helo wrd`。' },

          { t: 'think', q: '为什么 map / filter / reduce 都强调「不修改原数组」？', ans: '因为不可变数据让代码更容易推理：你可以放心把数组传给多个函数，不用担心「谁把它改了」。函数式编程（React、Redux 那一套）完全建立在这个约定上。如果需要改原数组，`push`/`splice`/`sort` 才是正确选择——但要清楚它们会原地修改。' },

          { t: 'think', q: 'Map 和普通对象（{}）到底该用哪个？', ans: '当键是字符串/Symbol 且结构稳定时，普通对象更直观，也更容易 JSON 序列化。当你需要：① 键是任意类型（对象、数字）；② 频繁增删键；③ 遍历键的顺序需要保证；④ 需要 size 属性——这时用 Map。日常 JSON 数据用对象，缓存/查找表用 Map。' },

          { t: 'kp', x: [
            'map/filter/reduce 返回新数组，不污染原数据',
            'reduce 是万能的「折叠」工具，务必掌握',
            '对象用键值对组织数据，是 JSON 的基础',
            'Set 去重、Map 做真正的映射表',
            '解构能一行取出数组/对象的多个成员'
          ]}
        ]
      },

      /* ==================================================== 9 面向对象 */
      {
        id: 'oop',
        title: '面向对象与 this',
        sub: '原型链、class 语法、继承与 this 绑定',
        blocks: [
          { t: 'h2', x: '原型链：JS 的继承本质' },
          { t: 'p', x: 'JavaScript 的继承靠**原型（prototype）**：每个函数都有一个 `prototype` 对象，用 `new` 创建出的实例会「顺着原型链」找到它上面的方法和属性。ES6 的 `class` 只是这套机制更友好的语法糖。' },

          { t: 'code', lang: 'javascript', title: '用原型添加方法', run: true, ed: true,
            code: [
              'function Animal(name) {',
              '    this.name = name;',
              '}',
              'Animal.prototype.speak = function () {',
              '    return this.name + " 发出声音";',
              '};',
              'const cat = new Animal("猫");',
              'console.log(cat.speak());'
            ],
            expect: '猫 发出声音' },

          { t: 'h2', x: 'class 语法糖' },
          { t: 'p', x: '如果你来自 Java / Python，下面这种 `class` 写法会更眼熟。注意：它底层仍然是原型，只是写法更像传统面向对象语言。' },

          { t: 'code', lang: 'javascript', title: 'class 与 constructor', run: true,
            code: [
              'class Animal {',
              '    constructor(name) {',
              '        this.name = name;',
              '    }',
              '    speak() {',
              '        return this.name + " 发出声音";',
              '    }',
              '}',
              'const dog = new Animal("狗");',
              'console.log(dog.speak());'
            ],
            expect: '狗 发出声音' },

          { t: 'h2', x: '继承：extends 与 super' },
          { t: 'code', lang: 'javascript', title: '子类继承父类', run: true,
            code: [
              'class Animal {',
              '    constructor(name) {',
              '        this.name = name;',
              '    }',
              '    speak() {',
              '        return this.name + " 叫";',
              '    }',
              '}',
              'class Dog extends Animal {',
              '    speak() {',
              '        return this.name + " 汪汪叫";',
              '    }',
              '}',
              'const d = new Dog("小黑");',
              'console.log(d.speak());',
              'console.log(d instanceof Dog);',
              'console.log(d instanceof Animal);'
            ],
            expect: '小黑 汪汪叫\ntrue\ntrue' },

          { t: 'h2', x: 'this 绑定：JS 最易错的难点' },
          { t: 'p', x: '`this` 的值**取决于函数如何被调用**，而不是写在哪。普通方法被对象调用时 `this` 指向该对象；一旦把方法「单独抽出来」调用，`this` 就可能丢失。理解 `this` 是区分初学者和熟练者的分水岭。' },

          { t: 'code', lang: 'javascript', title: '方法里的 this', run: true,
            code: [
              'const obj = {',
              '    name: "Alice",',
              '    greetRegular: function () {',
              '        return "普通函数 this.name=" + this.name;',
              '    }',
              '};',
              'console.log(obj.greetRegular());'
            ],
            expect: '普通函数 this.name=Alice' },

          { t: 'code', lang: 'javascript', title: '箭头函数捕获外层 this', run: true,
            code: [
              'const outer = {',
              '    value: 10,',
              '    getValue: function () {',
              '        const inner = () => this.value;',
              '        return inner();',
              '    }',
              '};',
              'console.log("箭头捕获外层this.value=" + outer.getValue());'
            ],
            expect: '箭头捕获外层this.value=10' },

          { t: 'note', k: 'warn', title: 'this 为什么会「丢」？',
            x: '把 `obj.greet` 赋值给一个变量再调用，或把它当作回调传进 `setTimeout`，`this` 往往不再指向 `obj`。解决办法：用箭头函数（自动沿用外层 this）、或用 `.bind(obj)` 手动把 this「绑死」。' },

          { t: 'h2', x: 'class 语法糖 vs 原型链：底层是一回事' },
          { t: 'p', x: '前面我们用 `Animal.prototype.speak = ...` 手动挂方法；class 写法只是把这件事包得更好看。编译后（或者说引擎内部）它们长得几乎一样。' },

          { t: 'code', lang: 'javascript', title: '两种写法本质相同', run: true,
            code: [
              'class Dog {',
              '    constructor(name) { this.name = name; }',
              '    bark() { return this.name + ": 汪汪"; }',
              '}',
              'const d = new Dog("旺财");',
              'console.log(d.bark());',
              'console.log("d 的原型就是 Dog.prototype:", d.__proto__ === Dog.prototype);',
              'console.log("bark 在原型上:", typeof Dog.prototype.bark);'
            ],
            expect: '旺财: 汪汪\nd 的原型就是 Dog.prototype: true\nbark 在原型上: function' },

          { t: 'note', k: 'info', title: 'class 与构造函数的差异',
            x: 'class 写法有几个小区别：① class 方法不可枚举（不会出现在 for...in 里）；② class 有自己的「暂时性死区」，不能在定义前调用；③ class 构造函数必须用 `new` 调用。日常开发用 class 即可，了解原型是为了读得懂老代码。' },

          { t: 'h2', x: '静态成员 static' },
          { t: 'p', x: '挂在类本身而不是实例上的方法叫**静态方法**，用 `static` 关键字。它们常用于工具函数、工厂方法。' },

          { t: 'code', lang: 'javascript', title: 'static 方法', run: true,
            code: [
              'class MathHelper {',
              '    static square(x) { return x * x; }',
              '    static add(a, b) { return a + b; }',
              '}',
              'console.log("square(5) =", MathHelper.square(5));',
              'console.log("add(2,3) =", MathHelper.add(2, 3));'
            ],
            expect: 'square(5) = 25\nadd(2,3) = 5' },

          { t: 'h2', x: '真正的私有字段 #field' },
          { t: 'p', x: '之前用闭包模拟私有变量，ES2022 之后 JS 有了**语法级私有字段**：以 `#` 开头的属性在类外部完全访问不到，连读取都不行。' },

          { t: 'code', lang: 'javascript', title: '私有字段', run: true,
            code: [
              'class Counter {',
              '    #count = 0;',
              '    inc() { this.#count++; return this.#count; }',
              '    get value() { return this.#count; }',
              '}',
              'const c = new Counter();',
              'c.inc(); c.inc(); c.inc();',
              'console.log("当前值:", c.value);',
              '// console.log(c.#count);  // 语法错误：外部不能访问'
            ],
            expect: '当前值: 3' },

          { t: 'h2', x: 'getter / setter：像属性一样调用方法' },
          { t: 'code', lang: 'javascript', title: '存取器', run: true,
            code: [
              'class User {',
              '    constructor(first, last) {',
              '        this.first = first;',
              '        this.last = last;',
              '    }',
              '    get fullName() {',
              '        return this.first + " " + this.last;',
              '    }',
              '}',
              'const u = new User("Alice", "Smith");',
              'console.log("fullName 属性:", u.fullName);'
            ],
            expect: 'fullName 属性: Alice Smith' },

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个 `Rectangle` 类，构造函数接收 width 和 height，方法 `area()` 返回面积。', lang: 'javascript',
            code: [
              'class Rectangle {',
              '    constructor(w, h) {',
              '        this.w = w;',
              '        this.h = h;',
              '    }',
              '    area() {',
              '        return this.w * this.h;',
              '    }',
              '}',
              'const r = new Rectangle(3, 4);',
              'console.log("面积 =", r.area());'
            ],
            expect: '面积 = 12',
            hint: 'constructor 里把参数存到 this 上，方法里用 this.w / this.h。',
            ans: '3 × 4 = 12。' },

          { t: 'ex', q: '写一个继承自 `Animal` 的 `Cat` 类，`speak()` 返回「名字: 喵」。', lang: 'javascript',
            code: [
              'class Animal {',
              '    constructor(name) { this.name = name; }',
              '}',
              'class Cat extends Animal {',
              '    speak() { return this.name + ": 喵"; }',
              '}',
              'const c = new Cat("小花");',
              'console.log(c.speak());'
            ],
            expect: '小花: 喵',
            hint: '用 extends 关键字继承。',
            ans: '`class Cat extends Animal`，在 Cat 里定义 `speak()` 覆盖父类即可。' },

          { t: 'h2', x: '关键术语' },
          { t: 'defs', x: [
            { term: '原型链（prototype chain）', desc: 'JS 的继承机制：每个对象都有一个隐藏的 `__proto__` 指向它的原型对象，访问属性时如果对象本身没有，就沿着原型链往上找，直到 null。`obj.toString()` 能调用就是因为原型链顶端的 Object.prototype 上有这个方法。class 语法只是原型链的包装，没有引入新的继承机制。' },
            { term: '构造函数（constructor）', desc: '用来创建对象的特殊函数，用 `new` 调用时会自动创建一个新对象、把 this 绑定到它、执行函数体、返回这个对象。ES6 的 class 里 `constructor()` 方法就是构造函数。构造函数的 `prototype` 属性上的方法会被所有实例共享。' },
            { term: '实例化（instantiation）', desc: '用 `new ClassName()` 创建一个类的具体对象的过程。每个实例有自己的属性副本，但方法共享原型上的同一份。`instanceof` 运算符用来判断一个对象是不是某个类的实例：`user instanceof User`。' },
            { term: '继承（inheritance）', desc: '一个类（子类）获取另一个类（父类）的属性和方法的机制。JS 里用 `extends` 关键字，子类可以用 `super()` 调用父类构造函数、用 `super.method()` 调用父类方法。继承是「is-a」关系（学生是人），组合是「has-a」关系（汽车有发动机），优先用组合。' }
          ]},

          { t: 'think', q: '为什么说 class 只是「语法糖」，它没有真正改变 JS 的继承模型？', ans: '因为 class 只是把「构造函数 + prototype.xxx = function」这套老式写法包装得更像 Java/Python。实例的方法仍然挂在原型对象上，`new` 仍然是把 `__proto__` 指向构造函数的 prototype。它没有引入新的继承机制，只是让语法更友好。' },

          { t: 'think', q: '在对象方法里用箭头函数和用普通方法写法，this 有什么不同？', ans: '普通方法 `greet() {}` 的 this 在调用时由调用者决定（`obj.greet()` 里 this 是 obj）；写成箭头函数 `greet: () => {}` 时，this 沿用外层（类创建时）的 this，通常不是你想要的。**类方法永远用普通方法写法，不要用箭头函数当方法。**' },

          { t: 'kp', x: [
            'JS 继承靠原型链，class 只是原型语法糖',
            'constructor 里初始化属性，方法写在类体内',
            'extends 实现继承，super 调用父类',
            'this 由「调用方式」决定，不是由「定义位置」决定',
            '箭头函数不绑定 this，适合做回调；丢 this 时用 bind'
          ]}
        ]
      },

      /* ==================================================== 10 异常 */
      {
        id: 'errors',
        title: '异常与错误处理',
        sub: 'try / catch / finally、throw 与 Error 类型',
        blocks: [
          { t: 'h2', x: 'try / catch / finally' },
          { t: 'p', x: '程序难免出错。用 `try` 包裹「可能出错」的代码；一旦其中抛出错误，就会跳到 `catch` 处理；无论是否出错，`finally` 里的代码**总会执行**（常用于释放资源）。' },

          { t: 'code', lang: 'javascript', title: '捕获异常', run: true, ed: true,
            code: [
              'try {',
              '    throw new Error("出错了");',
              '} catch (e) {',
              '    console.log("捕获到错误: " + e.message);',
              '} finally {',
              '    console.log("finally 总会执行");',
              '}'
            ],
            expect: '捕获到错误: 出错了\nfinally 总会执行' },

          { t: 'h2', x: 'throw：主动抛出错误' },
          { t: 'p', x: '当检测到非法输入（如除数为 0），与其返回奇怪的结果，不如**主动 `throw` 一个错误**，把问题清楚地暴露出来。' },

          { t: 'code', lang: 'javascript', title: '函数内校验并抛出', run: true,
            code: [
              'function divide(a, b) {',
              '    if (b === 0) {',
              '        throw new Error("除数不能为 0");',
              '    }',
              '    return a / b;',
              '}',
              'try {',
              '    console.log(divide(10, 0));',
              '} catch (e) {',
              '    console.log("错误: " + e.message);',
              '}'
            ],
            expect: '错误: 除数不能为 0' },

          { t: 'h2', x: 'Error 的常见类型' },
          { t: 'table',
            head: ['错误类型', '含义'],
            rows: [
              ['`Error`', '通用错误，其他类型的基类'],
              ['`TypeError`', '类型不对，如对 undefined 调用方法'],
              ['`ReferenceError`', '使用了未声明的变量'],
              ['`RangeError`', '数值超出合法范围，如递归过深'],
              ['`SyntaxError`', '代码本身语法写错']
            ]},

          { t: 'code', lang: 'javascript', title: '查看错误类型名', run: true,
            code: [
              'console.log(Error.name);',
              'console.log(TypeError.name);',
              'console.log(RangeError.name);',
              'console.log(ReferenceError.name);'
            ],
            expect: 'Error\nTypeError\nRangeError\nReferenceError' },

          { t: 'h2', x: '自定义错误' },
          { t: 'p', x: '在较大项目里，可以继承 `Error` 定义自己的错误类型，让调用方更精确地判断「到底出了哪类错」。' },

          { t: 'code', lang: 'javascript', title: '抛出并识别自定义错误', run: true,
            code: [
              'class ValidationError extends Error {',
              '    constructor(msg) {',
              '        super(msg);',
              '        this.name = "ValidationError";',
              '    }',
              '}',
              'try {',
              '    throw new ValidationError("邮箱格式不对");',
              '} catch (e) {',
              '    console.log("错误名称: " + e.name);',
              '    console.log("错误信息: " + e.message);',
              '}'
            ],
            expect: '错误名称: ValidationError\n错误信息: 邮箱格式不对' },

          { t: 'note', k: 'info', title: '不要吞掉错误',
            x: '空的 `catch (e) {}` 会悄悄把问题藏起来，让调试变成噩梦。至少 `console.error(e)` 或把错误往上抛（不写 catch，或在 catch 里 `throw e`）。' },

          { t: 'h2', x: '错误原因链：cause' },
          { t: 'p', x: '有时候捕获到一个错误后想把它「包一层」再抛出去，同时保留原始原因。ES2022 的 `cause` 字段让这件事标准化。' },

          { t: 'code', lang: 'javascript', title: '保留原始错误', run: true,
            code: [
              'try {',
              '    try {',
              '        JSON.parse("这不是 JSON");',
              '    } catch (e) {',
              '        throw new Error("解析配置失败", { cause: e });',
              '    }',
              '} catch (e) {',
              '    console.log("外层:", e.message);',
              '    console.log("原因:", e.cause.message);',
              '}'
            ],
            expect: '外层: 解析配置失败\n原因: Unexpected token \'这\', "这不是 JSON" is not valid JSON' },

          { t: 'h2', x: '异步代码里的错误' },
          { t: 'p', x: '`Promise` 里抛出的错误不会被外层的 `try/catch` 直接捕获，要在 `await` 外面包一层 `try/catch`，或者用 `.catch()`。这是 JS 异步错误处理的标准姿势。' },

          { t: 'code', lang: 'javascript', title: 'await 配合 try/catch', run: true,
            code: [
              'function fail() {',
              '    return Promise.reject(new Error("网络超时"));',
              '}',
              'try {',
              '    await fail();',
              '} catch (e) {',
              '    console.log("捕获到:", e.message);',
              '}'
            ],
            expect: '捕获到: 网络超时' },

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个函数 `parseAge(s)`，如果 `Number(s)` 是 NaN 就抛出 `Error("年龄必须是数字")`，否则返回年龄。调用一次非法输入并 catch。', lang: 'javascript',
            code: [
              'function parseAge(s) {',
              '    const n = Number(s);',
              '    if (Number.isNaN(n)) throw new Error("年龄必须是数字");',
              '    return n;',
              '}',
              'try {',
              '    console.log(parseAge("abc"));',
              '} catch (e) {',
              '    console.log("错误:", e.message);',
              '}'
            ],
            expect: '错误: 年龄必须是数字',
            hint: '用 Number.isNaN() 判断。',
            ans: '把 "abc" 转成数字得到 NaN，进入 throw 分支，外层 catch 打印错误信息。' },

          { t: 'h2', x: '关键术语' },
          { t: 'defs', x: [
            { term: 'Error 对象', desc: 'JS 里所有错误的基类，有三个核心属性：`message`（错误信息）、`name`（错误类型，如 "TypeError"）、`stack`（调用栈，告诉你错误从哪一行、经过哪些函数抛出来的）。内置子类有 TypeError、ReferenceError、RangeError、SyntaxError、URIError 等。自定义错误继承自 Error。' },
            { term: '调用栈（call stack）', desc: '函数调用的层级记录：A 调用 B，B 调用 C，调用栈就是 [A → B → C]。错误抛出时，Error.stack 会打印完整的调用栈，让你知道错误是从哪个函数、经过哪些调用链到达的。调试时调用栈是定位错误最有价值的信息——它告诉你「谁调用了出错的那个函数」。' },
            { term: '错误传播（error propagation）', desc: '错误从抛出点向上层传播的过程。如果一个函数里 throw 了错误但没有 try/catch，错误会冒泡到调用它的函数，再往上，直到被 catch 或到达全局（变成未捕获错误导致程序崩溃）。主动 re-throw（`catch(e) { ...; throw e; }`）是常见模式：先记录日志，再把错误交给上层处理。' },
            { term: 'finally 块', desc: 'try/catch 之后的可选块，无论 try 里的代码成功还是失败，finally 都会执行。适合做清理工作：关闭文件、释放资源、停止 loading 状态。注意：如果 try 里有 return，finally 仍然会在 return 之前执行——这是它容易被忽略的特性。' }
          ]},

          { t: 'think', q: '为什么空的 catch（`catch (e) {}`）是最糟糕的做法？', ans: '它把错误**完全吞掉**——你以为一切正常，实际上程序已经处于未知状态。至少要 `console.error(e)` 留个痕迹，或者重新抛出让上层处理。调试时，「什么都没发生但结果就是不对」比「直接报错」难找十倍。' },

          { t: 'think', q: '`throw new Error("...")` 和直接 `throw "..."`（抛字符串）有什么区别？为什么推荐前者？', ans: '`throw new Error(...)` 创建的是一个 Error 对象，它自带 `message`（错误信息）、`name`（错误类型）和最重要的 `stack`（调用栈——告诉你错误从哪一行、经过哪些函数调用抛出来的）。直接 `throw "..."` 抛的只是一个原始字符串，没有调用栈信息，catch 里只能拿到一段文字，根本不知道错误是从哪里来的。调试时，调用栈是定位错误最有价值的信息，所以永远用 `throw new Error(...)` 或它的子类（TypeError、RangeError 等），不要直接抛字符串或数字。' },

          { t: 'kp', x: [
            '可能出错的代码放进 try，错误在 catch 处理',
            'finally 无论成败都会执行，适合清理资源',
            '遇到非法情况主动 throw，比返回怪值更清晰',
            'Error 有 TypeError / ReferenceError 等多种子类',
            '自定义错误继承自 Error，便于精确判断'
          ]}
        ]
      },

      /* ==================================================== 11 现代特性 */
      {
        id: 'modern',
        title: '现代 JavaScript 特性',
        sub: '模板字符串、解构、展开、可选链、Promise 与 async/await',
        blocks: [
          { t: 'h2', x: '模板字符串' },
          { t: 'p', x: '用反引号 `` ` `` 包裹的字符串，可以**直接嵌入 `${表达式}`**，再也不用手动拼 `+`。多行字符串也天然支持。' },

          { t: 'code', lang: 'javascript', title: '模板字符串插值', run: true, ed: true,
            code: [
              'const name = "Alice";',
              'const age = 30;',
              'console.log(`姓名: ${name}, 年龄: ${age}`);'
            ],
            expect: '姓名: Alice, 年龄: 30' },

          { t: 'h2', x: '解构赋值' },
          { t: 'p', x: '解构能在一行里把数组或对象的成员「拆」到独立变量，配合函数返回值尤其好用。`...` 还能收集「剩余」项。' },

          { t: 'code', lang: 'javascript', title: '解构与剩余参数', run: true,
            code: [
              'const [first, second, ...rest] = [10, 20, 30, 40];',
              'console.log("first=" + first + " second=" + second + " rest=" + rest.join(","));'
            ],
            expect: 'first=10 second=20 rest=30,40' },

          { t: 'h2', x: '展开运算符 ...' },
          { t: 'p', x: '`...` 能把数组「摊开」成单个元素，用来合并数组、复制数组、传参，优雅又不易错。' },

          { t: 'code', lang: 'javascript', title: '用 ... 合并数组', run: true,
            code: [
              'const a = [1, 2];',
              'const b = [3, 4];',
              'const merged = [...a, ...b];',
              'console.log(merged.join(", "));'
            ],
            expect: '1, 2, 3, 4' },

          { t: 'h2', x: '可选链 ?. 与空值合并 ??' },
          { t: 'p', x: '`?.` 在读取深层属性时，若中间某一环是 `null`/`undefined` 就直接返回 `undefined`，不再报错；`??` 只在左侧是 `null`/`undefined` 时才用右侧默认值（区别于 `||`，它还会把 `0`/`""` 当成「空」）。' },

          { t: 'code', lang: 'javascript', title: '可选链与空值合并', run: true,
            code: [
              'const user = { profile: { name: "Alice" } };',
              'console.log(user.profile?.name);',
              "console.log(user.contact?.email ?? '无邮箱');"
            ],
            expect: 'Alice\n无邮箱' },

          { t: 'h2', x: 'Promise：异步的「未来值」' },
          { t: 'p', x: '网络请求、文件读取等耗时操作不能立即拿到结果。`Promise` 代表一个「将来才会完成（或失败）」的任务。用 `await` 可以「暂停」等待它完成——注意下面用了顶层 `await`，在本教程沙箱中直接可用。' },

          { t: 'code', lang: 'javascript', title: 'await 等待 Promise', run: true,
            code: [
              'const p = new Promise(function (resolve) {',
              '    resolve("Promise 已完成");',
              '});',
              'console.log(await p);'
            ],
            expect: 'Promise 已完成' },

          { t: 'h2', x: 'async / await：把异步写得像同步' },
          { t: 'p', x: '`async` 函数里可以使用 `await`，让异步代码读起来像一行行顺序执行。下面用 `fakeFetch` 模拟一次「请求—解析 JSON」的过程（真实项目里换成 `fetch` 即可，思路完全一致）。' },

          { t: 'code', lang: 'javascript', title: 'async/await 模拟请求', run: true,
            code: [
              'function fakeFetch(data) {',
              '    return Promise.resolve({ json: function () { return Promise.resolve(data); } });',
              '}',
              'const response = await fakeFetch({ name: "Alice", age: 30 });',
              'const user = await response.json();',
              'console.log("用户: " + user.name + ", 年龄: " + user.age);'
            ],
            expect: '用户: Alice, 年龄: 30' },

          { t: 'h2', x: 'Promise.all：并行等多个任务' },
          { t: 'p', x: '如果有多个互不依赖的异步任务，**不要一个一个 await**——那样会串行浪费时间。用 `Promise.all([...])` 让它们并行跑，全部完成后一起拿到结果。' },

          { t: 'code', lang: 'javascript', title: '并行执行多个任务', run: true,
            code: [
              'function fakeTask(name) {',
              '    return Promise.resolve(name);',
              '}',
              'const [a, b, c] = await Promise.all([',
              '    fakeTask("A"),',
              '    fakeTask("B"),',
              '    fakeTask("C")',
              ']);',
              'console.log("结果: " + a + ", " + b + ", " + c);',
              'console.log("三个任务并行完成");'
            ],
            expect: '结果: A, B, C\n三个任务并行完成' },

          { t: 'note', k: 'warn', title: 'Promise.all 的「一败俱败」',
            x: '`Promise.all` 只要有一个 reject，整个就立刻 reject。如果你希望「不管成败都要拿到结果」，用 `Promise.allSettled([...])`，它返回 `{ status, value/reason }` 数组。' },

          { t: 'h2', x: '模块：export / import' },
          { t: 'p', x: '现代 JS 用 ES Module 组织代码：一个文件是一个模块，用 `export` 暴露、用 `import` 引入。本教程沙箱是单文件环境，下面只展示语法——你在真实项目里会天天写它。' },

          { t: 'code', lang: 'javascript', title: 'ES Module 语法示意', run: false,
            code: [
              '// math.js',
              'export const PI = 3.14159;',
              'export function circleArea(r) { return PI * r * r; }',
              '',
              '// main.js',
              'import { circleArea, PI } from "./math.js";',
              'console.log("半径 10 的圆面积:", circleArea(10).toFixed(2));'
            ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 `??` 和 `?.` 安全地读取一个可能缺失的用户对象：`user.profile.name`，如果中间任何一层为空就打印「无用户」。', lang: 'javascript',
            code: [
              'const user = { profile: null };',
              'const name = user.profile?.name ?? "无用户";',
              'console.log(name);'
            ],
            expect: '无用户',
            hint: 'profile 是 null，?. 直接短路到 undefined。',
            ans: '`user.profile` 是 null，`?.` 不会继续访问 `.name`，整个表达式变成 undefined，再由 `??` 替换成「无用户」。' },

          { t: 'ex', q: '用模板字符串输出一个乘法表的一行：`3 × 4 = 12`。', lang: 'javascript',
            code: [
              'const a = 3, b = 4;',
              'console.log(`${a} × ${b} = ${a * b}`);'
            ],
            expect: '3 × 4 = 12',
            hint: '反引号字符串里用 ${} 嵌入表达式。',
            ans: '用反引号包裹，`${a}`、`${b}`、`${a*b}` 会自动求值并插入。' },

          { t: 'h2', x: '关键术语' },
          { t: 'defs', x: [
            { term: '解构赋值（destructuring）', desc: '从数组或对象中一次性提取多个值赋给变量的语法。数组解构：`const [a, b] = [1, 2]`；对象解构：`const { name, age } = user`。支持默认值（`const { port = 3000 } = config`）、重命名（`const { name: userName } = user`）、嵌套解构。解构让函数参数和返回值的处理极其简洁。' },
            { term: '可选链（optional chaining ?.）', desc: '安全访问深层属性的运算符：`user?.address?.city`。如果 user 或 address 是 null/undefined，表达式短路返回 undefined，不会抛出 TypeError。也可以用于方法调用 `obj?.method()` 和数组访问 `arr?.[0]`。可选链是运行时保护，和 TypeScript 的类型收窄配合使用效果最好。' },
            { term: '空值合并（nullish coalescing ??）', desc: '只在左侧为 null 或 undefined 时才返回右侧的默认值运算符：`const port = config.port ?? 3000`。和 `||` 的区别：`||` 会把 0、""、false 都当假值替换掉，而 `??` 只认 null/undefined。配置项场景（端口 0、计数 0 是合法值）必须用 `??` 而不是 `||`。' },
            { term: 'Promise', desc: '表示「将来会有结果」的对象，有三种状态：pending（等待中）、fulfilled（成功，有值）、rejected（失败，有原因）。通过 `.then()` 处理成功、`.catch()` 处理失败、`.finally()` 做清理。Promise 解决了回调地狱问题，让异步代码可以链式调用。async/await 是 Promise 的语法糖，让异步代码写得像同步。' }
          ]},

          { t: 'think', q: '为什么 `??` 比 `||` 更适合做「默认值」？', ans: '因为 `||` 会把 `0`、`""`、`false` 都当成「空」，这些在配置里常常是合法值（比如端口 0、计数 0）。`??` 只在 `null` / `undefined` 时才用默认，语义精确得多。写 `||` 之前先问自己：0 和空字符串在这个位置合法吗？' },

          { t: 'think', q: 'Promise 和回调函数相比，解决了什么问题？', ans: '回调函数嵌套起来会形成「回调地狱」（一层套一层），错误处理也分散在每个回调里。Promise 把异步操作变成一个「对象」，可以链式调用（.then().then()），错误可以统一在 .catch() 里处理；再加上 async/await，异步代码能写得像同步一样线性。' },

          { t: 'kp', x: [
            '模板字符串用 ` 和反引号，支持 ${} 嵌入表达式',
            '解构与展开运算符合并、提取数据极其方便',
            '?. 安全读取深层属性，?? 仅在 null/undefined 时取默认',
            'Promise 表示将来的结果，await 等待它完成',
            'async/await 让异步代码像同步一样好读'
          ]}
        ]
      },

      /* ==================================================== 12 第三方库与生态 */
      {
        id: 'libraries',
        title: '第三方库与生态',
        sub: '从框架到工具库，掌握 JavaScript 最有价值的生态',
        blocks: [
          { t: 'h2', x: '前端框架' },
          { t: 'defs', x: [
            { term: 'React', desc: 'Facebook 出品的 UI 库，组件化 + 虚拟 DOM + Hooks。生态最庞大：React Router、Redux/Zustand、React Query、Next.js。函数组件 + Hooks 是现代写法。' },
            { term: 'Vue', desc: '渐进式框架，响应式数据 + 模板语法。Vue 3 Composition API + script setup 是现代写法。生态：Vue Router、Pinia、Nuxt。学习曲线平缓，国内使用率极高。' },
            { term: 'Angular', desc: 'Google 出品的全功能框架，TypeScript 原生，依赖注入、RxJS、模块化。企业级应用首选，功能最全但学习曲线陡。' },
            { term: 'Svelte', desc: '编译时框架，无虚拟 DOM，运行时极小。响应式语法简洁（$: 标记）。SvelteKit 是全栈框架。性能优秀，包体积极小。' },
            { term: 'SolidJS', desc: '细粒度响应式框架，性能接近原生 JS，API 类似 React 但无虚拟 DOM。适合性能敏感场景。' },
            { term: 'Qwik', desc: '可恢复性框架，零 JS 启动，HTML 序列化状态。极致的首屏性能，适合内容型网站。' }
          ]},
          { t: 'code', lang: 'javascript', title: 'React 函数组件 + Hooks', run: false,
            code: [
              'import { useState, useEffect } from "react";',
              '',
              'export default function Counter() {',
              '  const [count, setCount] = useState(0);',
              '',
              '  useEffect(() => {',
              '    document.title = `点击了 ${count} 次`;',
              '  }, [count]);',
              '',
              '  return (',
              '    <button onClick={() => setCount(c => c + 1)}>',
              '      点击了 {count} 次',
              '    </button>',
              '  );',
              '}'
            ]},
          { t: 'code', lang: 'javascript', title: 'Vue 3 Composition API', run: false,
            code: [
              '<script setup>',
              'import { ref, watch } from "vue";',
              '',
              'const count = ref(0);',
              '',
              'watch(count, (val) => {',
              '  document.title = `点击了 ${val} 次`;',
              '});',
              '</script>',
              '',
              '<template>',
              '  <button @click="count++">点击了 {{ count }} 次</button>',
              '</template>'
            ]},
          { t: 'h2', x: '全栈框架' },
          { t: 'defs', x: [
            { term: 'Next.js', desc: 'React 全栈框架事实标准。SSR/SSG/ISR/CSR 多种渲染模式，App Router、Server Components、API Routes、内置图片优化。Vercel 出品。' },
            { term: 'Nuxt', desc: 'Vue 全栈框架，类似 Next.js。SSR/SSG、自动路由、组合式函数、Nitro 引擎。' },
            { term: 'Remix', desc: 'React 全栈框架，基于 Web 标准（Fetch、Form、URLSearchParams）。嵌套路由、loader/action、渐进增强。已与 React Router 合并。' },
            { term: 'SvelteKit', desc: 'Svelte 全栈框架，类似 Next.js。SSR/SSG、文件路由、load 函数、form actions。' },
            { term: 'Astro', desc: '内容优先的全栈框架，默认零 JS（岛屿架构），支持 React/Vue/Svelte 组件混合。博客、文档、营销站首选。' },
            { term: 'Fresh', desc: 'Deno 原生全栈框架，Preact + islands 架构，无构建步骤，零配置。' }
          ]},
          { t: 'h2', x: '后端框架' },
          { t: 'defs', x: [
            { term: 'Express', desc: '最经典的 Node.js Web 框架，极简、灵活、中间件生态丰富。app.get/post/use、req/res/next。适合中小型 API 和微服务。' },
            { term: 'Fastify', desc: '性能最好的 Node.js Web 框架之一，比 Express 快 2-3 倍。内置 JSON Schema 验证、插件体系、类型安全。' },
            { term: 'Koa', desc: 'Express 原班人马出品的下一代框架，async/await 中间件、洋葱模型。更轻量，更现代。' },
            { term: 'NestJS', desc: '企业级 Node.js 框架，TypeScript 原生，依赖注入、装饰器、模块化架构。类似 Angular 的后端框架。适合大型企业应用。' },
            { term: 'Hono', desc: '轻量、极速的 Web 框架，支持 Cloudflare Workers、Deno、Bun、Node。API 类似 Express，体积极小。' },
            { term: 'AdonisJS', desc: '全功能 Node.js 框架，类似 Laravel。ORM、认证、授权、邮件、队列、验证开箱即用。' }
          ]},
          { t: 'code', lang: 'javascript', title: 'Express 最小 API', run: false,
            code: [
              'import express from "express";',
              '',
              'const app = express();',
              'app.use(express.json());',
              '',
              'app.get("/api/users", (req, res) => {',
              '  res.json([{ id: 1, name: "Alice" }]);',
              '});',
              '',
              'app.post("/api/users", (req, res) => {',
              '  const user = { id: Date.now(), ...req.body };',
              '  res.status(201).json(user);',
              '});',
              '',
              'app.listen(3000, () => console.log("Server running on :3000"));'
            ]},
          { t: 'h2', x: '工具库' },
          { t: 'defs', x: [
            { term: 'Lodash', desc: '最流行的工具库，提供 100+ 函数：数组、对象、集合、字符串、函数式。_、_.map、_.filter、_.debounce、_.throttle。现代 JS 已内置很多，但 Lodash 仍有价值。' },
            { term: 'Ramda', desc: '函数式编程工具库，所有函数自动柯里化，数据最后参数。适合函数式编程风格。' },
            { term: 'date-fns', desc: '现代日期处理库，函数式、不可变、模块化、Tree Shaking 友好。比 Moment.js 小且快。' },
            { term: 'Axios', desc: 'HTTP 客户端，浏览器和 Node 通用。拦截器、取消请求、自动 JSON 转换、错误处理。Fetch API 的增强替代。' },
            { term: 'Zod', desc: 'TypeScript 优先的模式验证库，运行时验证 + 类型推断。z.object、z.string、z.number。API 请求验证首选。' },
            { term: 'Day.js', desc: 'Moment.js 的 2KB 轻量替代，API 几乎一致，不可变、链式调用。' }
          ]},
          { t: 'h2', x: '测试生态' },
          { t: 'defs', x: [
            { term: 'Vitest', desc: '现代测试框架，Vite 原生支持，速度极快。API 兼容 Jest，支持 ESM、TypeScript、HMR。新项目首选。' },
            { term: 'Jest', desc: '最流行的测试框架，Facebook 出品。零配置、快照测试、Mock、覆盖率。生态完善，大量项目使用。' },
            { term: 'Playwright', desc: 'Microsoft 出品的端到端测试框架，支持 Chromium/Firefox/WebKit，自动等待、网络拦截、并行测试。比 Cypress 更现代。' },
            { term: 'Cypress', desc: '端到端测试框架，时间旅行调试、实时重载、选择器 playground。前端开发者友好。' },
            { term: 'Testing Library', desc: '组件测试工具库，React Testing Library / Vue Testing Library。按用户行为测试（getByText、getByRole），不测试实现细节。' },
            { term: 'MSW', desc: 'Mock Service Worker，拦截网络请求返回 Mock 数据。测试和开发环境共用同一套 Mock。' }
          ]},
          { t: 'h2', x: '状态管理' },
          { t: 'defs', x: [
            { term: 'Redux Toolkit', desc: 'Redux 官方推荐工具集，简化 Redux 样板代码。createSlice、configureStore、createAsyncThunk。React 大型应用状态管理事实标准。' },
            { term: 'Zustand', desc: '极简 React 状态管理库，API 简洁，无 Provider，支持中间件。比 Redux 轻量，适合中小型应用。' },
            { term: 'Pinia', desc: 'Vue 3 官方推荐状态管理，替代 Vuex。Composition API 风格，TypeScript 友好，DevTools 支持。' },
            { term: 'MobX', desc: '响应式状态管理，observable/action/computed。自动追踪依赖，语法简洁。适合喜欢响应式的开发者。' },
            { term: 'Jotai', desc: '原子化状态管理，类似 Recoil。原子（atom）组合，细粒度更新，无 Provider。' },
            { term: 'TanStack Query', desc: '服务端状态管理（原 React Query）。缓存、去重、后台刷新、乐观更新、分页。数据获取层事实标准。' }
          ]},
          { t: 'h2', x: '数据库 ORM/ODM' },
          { t: 'defs', x: [
            { term: 'Prisma', desc: '下一代 ORM，Schema 优先、类型安全、自动迁移。Prisma Client 是类型安全的查询构建器。支持 PostgreSQL/MySQL/SQLite/MongoDB。现代 Node.js 项目首选。' },
            { term: 'Mongoose', desc: 'MongoDB ODM，Schema 验证、中间件、虚拟属性、 populate。MongoDB 生态事实标准。' },
            { term: 'Sequelize', desc: '老牌关系型 ORM，支持 PostgreSQL/MySQL/SQLite/MSSQL。Promise 风格，关联、迁移、钩子。' },
            { term: 'TypeORM', desc: 'TypeScript 原生 ORM，装饰器风格，支持 Active Record 和 Data Mapper 模式。NestJS 默认集成。' },
            { term: 'Drizzle ORM', desc: '轻量、类型安全的 ORM，SQL 优先，无代码生成开销。比 Prisma 更轻量，性能更好。' },
            { term: 'Knex.js', desc: 'SQL 查询构建器，不是 ORM。灵活、轻量、支持迁移。适合喜欢写 SQL 的开发者。' }
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            '前端框架：React（生态最大）、Vue（国内主流）、Angular（企业级）、Svelte（编译时/轻量）',
            '全栈框架：Next.js（React 标准）、Nuxt（Vue）、Astro（内容站）、Remix（Web 标准）',
            '后端框架：Express（经典）、Fastify（高性能）、NestJS（企业级）、Hono（边缘计算）',
            '工具库：Lodash（通用）、date-fns（日期）、Axios（HTTP）、Zod（验证）',
            '测试：Vitest（单元）、Playwright（E2E）、Testing Library（组件）、MSW（Mock）',
            '状态管理：Redux Toolkit/Zustand（React）、Pinia（Vue）、TanStack Query（服务端状态）',
            '数据库：Prisma（现代 ORM）、Mongoose（MongoDB）、Drizzle（轻量）'
          ]}
        ]
      },

      /* ==================================================== 13 调试与排错 */
      {
        id: 'debugging',
        title: '调试与排错',
        sub: '从「代码跑不起来」到「找到那一行」的完整方法论',
        blocks: [
          { t: 'p', x: '写代码不犯错是不可能的，区别只在于你多快能找到它。JavaScript 的调试有一个独特的心智模型：因为它是**动态类型 + 异步优先**，很多错误不会在写代码时暴露，而是跑到某一行才突然炸掉。所以调试的核心不是「猜」，而是**缩小范围**——先确定是哪一层出了问题（语法？类型？逻辑？异步？），再逐层往里钻。' },
          { t: 'p', x: '一个高效的调试流程通常是：① 读报错信息，定位行号和错误类型；② 在可疑位置插 `console.log` 看变量实际值；③ 还找不到就上 `debugger` 或 DevTools 断点，逐行执行看状态变化；④ 修复后加断言或测试防止回归。这套流程比「盯着代码看半小时」有效得多。' },

          { t: 'h2', x: '常见的坑' },
          { t: 'table', head: ['报错或现象', '原因', '处理办法'], rows: [
            ['`Uncaught ReferenceError: x is not defined`', '用了没声明的变量，或拼写错误、作用域不对', '检查变量名拼写和声明位置；确认是不是在块级作用域外引用了 let/const'],
            ['`Uncaught TypeError: Cannot read properties of undefined (reading \'name\')`', '在 undefined 上访问属性，通常是数据没加载完或接口返回了空', '用可选链 `obj?.name` 兜底；在访问前确认数据已就绪；加默认值'],
            ['`Uncaught SyntaxError: Unexpected token \'}\'`', '括号/花括号不配对，或多了/少了逗号、分号', '从报错行往上找，逐行检查括号配对；编辑器的括号高亮是最好的帮手'],
            ['`Uncaught RangeError: Maximum call stack size exceeded`', '递归没有终止条件，或两个函数互相调用形成死循环', '检查递归的 base case 是否一定会到达；确认函数没有意外地调用自己'],
            ['`Uncaught TypeError: Cannot read properties of null (reading \'length\')`', '变量是 null 却当对象/数组用，常见于 querySelector 没找到元素', '调用前判空 `if (el) {...}`；确认选择器写对了、DOM 已加载'],
            ['`undefined` 不是报错但结果不对', '函数忘了 return，或访问了不存在的属性，或解构时给了错名字', '在函数末尾确认有 return；`console.log` 打印中间值看哪一步变成了 undefined']
          ]},

          { t: 'h2', x: '调试手段' },
          { t: 'code', lang: 'javascript', title: 'console 家族插桩法', run: false, ed: false,
            code: [
              'function calculateTotal(orders) {',
              '    // 用 console.log 看输入到底是什么',
              '    console.log("收到的订单:", orders);',
              '    // 用 console.table 把数组/对象打印成表格，一目了然',
              '    console.table(orders);',
              '',
              '    const total = orders.reduce((sum, o) => {',
              '        // 在循环内部插桩，看每一步的中间值',
              '        console.log("当前累加:", sum, "当前订单金额:", o.price);',
              '        return sum + o.price;',
              '    }, 0);',
              '',
              '    // 用 console.dir 打印对象的完整结构（展开原型链）',
              '    console.dir({ total, count: orders.length });',
              '    return total;',
              '}',
              '',
              '// console.trace 打印调用栈，看「谁调用了这个函数」',
              'function handleClick() {',
              '    console.trace("点击事件的调用链");',
              '    calculateTotal([{ price: 10 }, { price: 20 }]);',
              '}'
            ],
            note: 'console.log 是最快的定位手段，但别在生产代码里留下它们——上线前清理或用条件日志。' },

          { t: 'code', lang: 'javascript', title: 'debugger 语句与断点思维', run: false, ed: false,
            code: [
              'function processUserData(user) {',
              '    const profile = user.profile;',
              '    // 在这里停下来：浏览器 DevTools 会在这一行暂停',
              '    // 你可以在控制台输入 user、profile 看它们的实际值',
              '    // 也可以用「下一步」「步入」「步出」逐行跟踪',
              '    debugger;',
              '',
              '    if (!profile) {',
              '        throw new Error("用户资料缺失");',
              '    }',
              '',
              '    const fullName = `${profile.firstName} ${profile.lastName}`;',
              '    return { id: user.id, fullName };',
              '}',
              '',
              '// 断点思维的核心：在「你觉得应该正确」的地方暂停，',
              '// 检查变量是否符合预期。如果这里就不对，问题在前面；',
              '// 如果这里对了但后面错了，问题在后面。二分法缩小范围。',
              'try {',
              '    processUserData({ id: 1, profile: null });',
              '} catch (e) {',
              '    console.error("捕获到错误:", e.message);',
              '}'
            ],
            note: 'debugger 语句只在 DevTools 打开时生效，生产环境记得移除。' },

          { t: 'code', lang: 'javascript', title: '断言与防御式编程', run: false, ed: false,
            code: [
              '// 断言：在关键位置假设「这里一定满足条件」，不满足就立刻报错',
              'function assert(condition, message) {',
              '    if (!condition) {',
              '        throw new Error("断言失败: " + message);',
              '    }',
              '}',
              '',
              'function divide(a, b) {',
              '    // 防御：先校验输入，比算出 NaN 再排查容易得多',
              '    assert(typeof a === "number" && typeof b === "number", "参数必须是数字");',
              '    assert(b !== 0, "除数不能为 0");',
              '    return a / b;',
              '}',
              '',
              '// try/catch 包裹可能出错的代码，给出友好的错误上下文',
              'function safeDivide(a, b) {',
              '    try {',
              '        return divide(a, b);',
              '    } catch (e) {',
              '        console.error("除法运算出错:", e.message);',
              '        return null; // 给出安全的默认返回',
              '    }',
              '}',
              '',
              'console.log(safeDivide(10, 2)); // 5',
              'console.log(safeDivide(10, 0));  // null + 错误日志'
            ],
            note: '断言适合开发期抓「不可能发生」的情况；生产环境可以用构建工具移除断言，换成日志记录。' },

          { t: 'note', k: 'tip', title: '调试的黄金法则',
            x: '**先读报错，再动手改。** 绝大多数报错信息已经告诉你「哪一行、什么类型的错误」。新手最常见的毛病是不看报错就瞎改，越改越乱。把报错信息复制下来，逐字读一遍——行号、错误类型、涉及的变量名，都是线索。' },

          { t: 'note', k: 'warn', title: '异步代码的调试陷阱',
            x: '异步代码（setTimeout、Promise、fetch）里的 `console.log` 可能**不是按你写的顺序执行**的。如果你看到「先打印了 B 再打印 A」，不要怀疑人生——那是事件循环在工作。调试异步代码时，在 `.then()` 或 `await` 之后插桩，确认数据确实到了再往下走。' },

          { t: 'think', q: '为什么说「console.log 打多了比打少了好」？打太多又有什么问题？', ans: '调试时信息越多越好定位——在函数入口、关键分支、返回前各打一个，能完整看到数据的流动路径。但打太多的问题是：① 输出刷屏，真正重要的信息被淹没；② 忘记清理就提交了代码，生产环境里全是日志；③ 有些 console.log 本身有副作用（比如打印了一个后来被修改的对象，浏览器控制台显示的是修改后的值）。正确做法是调试完后清理掉临时日志，只保留有意义的错误日志。' },

          { t: 'think', q: '一段代码「没有报错但结果就是不对」，你会怎么排查？', ans: '没有报错说明语法和类型都没问题，是**逻辑错误**。排查步骤：① 明确「预期结果」和「实际结果」的差异；② 从输入开始，在每一个变换步骤后插桩打印，看哪一步开始偏离预期；③ 重点检查条件判断（if 的条件写反了？边界值漏了？）和循环（多循环了一次？索引从 0 还是 1 开始？）；④ 如果涉及异步，确认数据是否在使用前就已经就绪。逻辑错误没有报错信息帮你，只能靠「缩小范围 + 验证假设」。' },

          { t: 'kp', x: [
            '先读报错信息：行号 + 错误类型已经告诉你 80% 的答案',
            'console.log / console.table / console.trace 是最快的定位工具',
            'debugger 语句 + DevTools 断点，逐行看状态变化',
            '断言和防御式校验把「不可能」变成「立刻报错」',
            '异步代码的调试要注意执行顺序，在 await/then 之后确认数据'
          ]}
        ]
      },

      /* ==================================================== 13 综合实战 */
      {
        id: 'projects',
        title: '综合实战',
        sub: '用数组与类做一个「学生成绩分析」小工具',
        blocks: [
          { t: 'h2', x: '项目：学生成绩分析' },
          { t: 'p', x: '把前面学的数组方法、函数、对象、`reduce`/`filter`/`map` 串起来：给定一组学生成绩，算出平均分、及格人数、最高分，并列出名单。全程用 `console.log` 输出，纯控制台即可运行。' },

          { t: 'h3', x: '数据准备与统计' },
          { t: 'code', lang: 'javascript', title: '用数组方法做统计', run: true, ed: true,
            code: [
              'const students = [',
              '    { name: "Alice", score: 92 },',
              '    { name: "Bob", score: 78 },',
              '    { name: "Carol", score: 88 },',
              '    { name: "Dave", score: 65 }',
              '];',
              '',
              'const total = students.reduce((sum, s) => sum + s.score, 0);',
              'const avg = (total / students.length).toFixed(1);',
              'console.log("平均分: " + avg);',
              '',
              'const passed = students.filter(s => s.score >= 70);',
              'console.log("及格人数: " + passed.length);',
              '',
              'const top = students.reduce((best, s) => s.score > best.score ? s : best);',
              'console.log("最高分: " + top.name + " (" + top.score + ")");',
              '',
              'const names = students.map(s => s.name).join("、");',
              'console.log("名单: " + names);'
            ],
            expect: '平均分: 80.8\n及格人数: 3\n最高分: Alice (92)\n名单: Alice、Bob、Carol、Dave' },

          { t: 'p', x: '注意 `reduce` 的两种用法：带初始值 `0` 求和，不带初始值直接比较求最大值。`toFixed(1)` 把平均分保留一位小数（返回字符串，正好用于输出）。' },

          { t: 'h3', x: '用 class 组织数据' },
          { t: 'p', x: '如果以后还要加「是否及格」之类的行为，把每个学生封装成 `Student` 类会更清晰。下面同样的逻辑，改用面向对象写法：' },

          { t: 'code', lang: 'javascript', title: 'class 版本', run: true,
            code: [
              'class Student {',
              '    constructor(name, score) {',
              '        this.name = name;',
              '        this.score = score;',
              '    }',
              '    passed() {',
              '        return this.score >= 60;',
              '    }',
              '}',
              'const students = [',
              '    new Student("Alice", 92),',
              '    new Student("Bob", 78),',
              '    new Student("Carol", 88),',
              '    new Student("Dave", 55)',
              '];',
              'const passedNames = students.filter(s => s.passed()).map(s => s.name).join("、");',
              'const total = students.reduce((sum, s) => sum + s.score, 0);',
              'console.log("总人数: " + students.length);',
              'console.log("平均分: " + (total / students.length).toFixed(1));',
              'console.log("及格: " + passedNames);'
            ],
            expect: '总人数: 4\n平均分: 78.3\n及格: Alice、Bob、Carol' },

          { t: 'h3', x: '可以继续扩展的方向' },
          { t: 'ul', x: [
            '用 `sort` 给成绩排名，输出「第一名 / 最后一名」',
            '用 `Map` 按科目统计每科平均分',
            '把数据换成「从 fetch 请求拿到的 JSON」——把 `students` 换成接口返回即可，逻辑不动',
            '加上 `try/catch`，处理某条记录缺失 `score` 字段的情况'
          ]},

          { t: 'note', k: 'tip', title: '为什么用纯控制台？',
            x: '实战项目最容易卡在「环境配置」上。这里刻意只用 `console.log` 和数组/对象，让你点一下「运行」就能看到完整结果，把注意力集中在**逻辑与数据流**上——这才是编程真正的核心。' },

          { t: 'h2', x: '项目二：待办事项管理器' },
          { t: 'p', x: '把数组方法、对象、class 串起来：实现一个能添加、完成、列出待办事项的小工具。所有数据存在内存里，输出走 console。' },

          { t: 'code', lang: 'javascript', title: 'TodoList 类', run: true, ed: true,
            code: [
              'class TodoList {',
              '    constructor() {',
              '        this.items = [];',
              '        this._nextId = 1;',
              '    }',
              '    add(text) {',
              '        this.items.push({ id: this._nextId++, text: text, done: false });',
              '    }',
              '    done(id) {',
              '        const item = this.items.find(i => i.id === id);',
              '        if (item) item.done = true;',
              '    }',
              '    list() {',
              '        if (this.items.length === 0) {',
              '            console.log("（空）");',
              '            return;',
              '        }',
              '        for (const it of this.items) {',
              '            console.log(`[${it.done ? "√" : " "}] #${it.id} ${it.text}`);',
              '        }',
              '    }',
              '}',
              'const todos = new TodoList();',
              'todos.add("写作业");',
              'todos.add("买牛奶");',
              'todos.add("跑步 30 分钟");',
              'todos.done(2);',
              'todos.list();'
            ],
            expect: '[ ] #1 写作业\n[√] #2 买牛奶\n[ ] #3 跑步 30 分钟' },

          { t: 'p', x: '这个小工具覆盖了：class 封装（数据和操作放一起）、`find` 查找、`push` 添加、模板字符串输出。把它接到 DOM 上，加几个按钮，就是一个能跑的网页版 Todo。' },

          { t: 'h3', x: '可以继续扩展的方向' },
          { t: 'ul', x: [
            '加 `remove(id)` 方法，用 `filter` 删除指定项',
            '加 `pending()` 方法，只列出未完成的事项',
            '用 `localStorage` 把数据存起来，刷新页面不丢',
            '给 add 加一个截止日期字段，按日期排序输出'
          ]},

          { t: 'h2', x: '项目三：简易计算器' },
          { t: 'p', x: '用一个对象把四则运算封装起来，通过字符串分发到对应函数。这个模式叫「查表法」，比一长串 if/else 干净得多。' },

          { t: 'code', lang: 'javascript', title: '基于对象查表的计算器', run: true, ed: true,
            code: [
              'const calculator = {',
              '    add:    (a, b) => a + b,',
              '    sub:    (a, b) => a - b,',
              '    mul:    (a, b) => a * b,',
              '    div:    (a, b) => {',
              '        if (b === 0) throw new Error("除数不能为 0");',
              '        return a / b;',
              '    }',
              '};',
              '',
              'function calc(op, a, b) {',
              '    const fn = calculator[op];',
              '    if (!fn) throw new Error("不支持的运算: " + op);',
              '    return fn(a, b);',
              '}',
              '',
              'console.log("1 + 2 =", calc("add", 1, 2));',
              'console.log("10 - 4 =", calc("sub", 10, 4));',
              'console.log("6 * 7 =", calc("mul", 6, 7));',
              'console.log("20 / 4 =", calc("div", 20, 4));',
              '',
              'try {',
              '    calc("div", 1, 0);',
              '} catch (e) {',
              '    console.log("错误:", e.message);',
              '}'
            ],
            expect: '1 + 2 = 3\n10 - 4 = 6\n6 * 7 = 42\n20 / 4 = 5\n错误: 除数不能为 0' },

          { t: 'p', x: '注意 `calculator[op]` 这种「用字符串当键查函数」的写法——它把「操作类型」和「处理逻辑」解耦了。加新运算只需要在对象里加一行，`calc` 函数本身一行都不用改。这是开闭原则（对扩展开放、对修改关闭）的一个最小示例。' },

          { t: 'h3', x: '可以继续扩展的方向' },
          { t: 'ul', x: [
            '加 `sqrt`、`pow` 等单参数运算，调用方式单独写',
            '把 `calc` 改成接收字符串表达式（如 `"1 + 2"`），自己解析',
            '用 `try/catch` 包住用户输入，让程序永不崩溃',
            '记录历史运算，存成一个数组，支持 `history()` 查看'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '给 TodoList 加一个 `pendingCount()` 方法，返回未完成事项的数量，并在下面代码里打印。', lang: 'javascript',
            code: [
              'class TodoList {',
              '    constructor() { this.items = []; }',
              '    add(text) { this.items.push({ text, done: false }); }',
              '    pendingCount() {',
              '        return this.items.filter(i => !i.done).length;',
              '    }',
              '}',
              'const t = new TodoList();',
              't.add("a");',
              't.add("b");',
              't.items[0].done = true;',
              'console.log("未完成:", t.pendingCount());'
            ],
            expect: '未完成: 1',
            hint: '用 filter 筛出 !i.done，再取 length。',
            ans: '两个事项里第一个被标记 done，剩下 1 个未完成。' },

          { t: 'ex', q: '给计算器加一个 `mod`（取模）运算：`a % b`。', lang: 'javascript',
            code: [
              'const calculator = {',
              '    add: (a, b) => a + b,',
              '    mod: (a, b) => a % b',
              '};',
              'console.log("10 mod 3 =", calculator.mod(10, 3));'
            ],
            expect: '10 mod 3 = 1',
            hint: '在 calculator 对象里加一行即可。',
            ans: '10 ÷ 3 余 1。' },

          { t: 'think', q: '为什么实战项目里推荐用 class 把数据和操作封装在一起，而不是散在全局变量里？', ans: '因为封装能让数据和操作保持一致：你不会忘记「改了数组就要更新计数」，因为 class 把这两件事绑在一个对象里。全局变量满天飞时，谁都能改、谁都能读，项目一大就没人敢动代码了。' },

          { t: 'think', q: '在数据处理流水线里，`filter` 和 `map` 的顺序调换，结果一定一样吗？举一个顺序不同结果不同的例子。', ans: '不一定一样。`filter` 是筛选（去掉不满足条件的元素），`map` 是变换（每个元素变成另一个值）。如果先 map 再 filter，filter 判断的是**变换后**的值；如果先 filter 再 map，filter 判断的是**原始**值。例子：数组 `[1, 2, 3, 4]`，想「把偶数乘 2」。先 filter 偶数得到 `[2, 4]`，再 map 乘 2 得到 `[4, 8]`。但如果先 map 乘 2 得到 `[2, 4, 6, 8]`，再 filter 偶数得到 `[2, 4, 6, 8]`——完全不同。所以写数据流水线时，先想清楚「筛选条件针对的是原始数据还是变换后的数据」，再决定顺序。' },

          { t: 'kp', x: [
            '真实项目 = 数据 + 处理逻辑 + 输出，这个例子三者俱全',
            'reduce 既能求和，也能求最大/最小/分组',
            'filter + map 串联是数据处理的万能组合',
            '面向对象版本把「行为」封装进类，便于扩展',
            '把数组换成 fetch 返回的 JSON，逻辑无需改动'
          ]}
        ]
      },

      /* ==================================================== 13 速查总结 */
      {
        id: 'cheatsheet',
        title: '速查总结',
        sub: '一页纸回顾 JavaScript 的核心语法',
        blocks: [
          { t: 'h2', x: '本教程回顾' },
          { t: 'p', x: '从概览到实战，你已经走完了 JavaScript 的主干：变量、类型、运算符、流程控制、函数（含闭包）、集合、面向对象、异常、现代特性。下面把最常用、最易忘的语法浓缩成一页，方便随时翻看。' },

          { t: 'h2', x: '语法速查表' },
          { t: 'table',
            head: ['需求', '写法'],
            rows: [
              ['声明变量', '`let x = 1;` / `const y = 2;`'],
              ['函数', '`function f(){}` / `const f = () => {}`'],
              ['默认参数', '`function f(a = 0) {}`'],
              ['条件', '`if (x) {} else {}` / `x ? a : b`'],
              ['循环', '`for / for...of / while`'],
              ['数组映射', '`arr.map(fn)` / `arr.filter(fn)` / `arr.reduce(fn, 0)`'],
              ['对象', '`const o = { a: 1 }; o.a`'],
              ['类', '`class A { constructor(){} }`'],
              ['继承', '`class B extends A { }`'],
              ['模板字符串', '`` `你好 ${name}` ``'],
              ['解构', '`const { a, b } = obj;`'],
              ['展开', '`[...a, ...b]`'],
              ['可选链', '`obj?.a?.b`'],
              ['空值合并', '`x ?? 默认值`'],
              ['异步', '`async function() { await p; }`']
            ]},

          { t: 'h2', x: '数据类型一览' },
          { t: 'defs', x: [
            { term: 'number', desc: '数字，含 NaN / Infinity；有浮点精度问题' },
            { term: 'string', desc: '字符串，用 " " 或 \' \' 或 ` ` 包裹' },
            { term: 'boolean', desc: 'true / false' },
            { term: 'null / undefined', desc: '「主动空」与「系统默认空」' },
            { term: 'object', desc: '对象、数组、函数都属此类' },
            { term: 'bigint / symbol', desc: '大整数与唯一符号，进阶类型' }
          ]},

          { t: 'h2', x: '常用数组方法' },
          { t: 'table',
            head: ['方法', '返回', '用途'],
            rows: [
              ['`map`', '新数组', '逐个变换元素'],
              ['`filter`', '新数组', '按条件保留'],
              ['`reduce`', '单个值', '累积/统计'],
              ['`find`', '元素或 undefined', '找第一个匹配'],
              ['`forEach`', 'undefined', '仅遍历副作用'],
              ['`sort`', '排序后的数组', '排序（会改原数组）']
            ]},

          { t: 'h2', x: '常见陷阱' },
          { t: 'ul', x: [
            '**用 `==` 做比较**——改用 `===`，避免隐式类型转换',
            '**误以为 `this` 指向定义处**——`this` 由调用方式决定',
            '**忽略浮点精度**——`0.1 + 0.2 !== 0.3`，金额用整数分或专用库',
            '**`typeof null` 是 `"object"`**——这是历史 bug，别迷信 typeof',
            '**变量提升**——用 `var` 时声明会「飘」到顶部，改用 `let`/`const`'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '不翻上面的速查表，写出：①声明一个常量 PI；②把数组 [1,2,3] 每个元素乘 2；③判断一个变量 x 是否大于 18。', lang: 'javascript',
            code: [
              'const PI = 3.14159;',
              'const doubled = [1, 2, 3].map(n => n * 2);',
              'const x = 20;',
              'console.log("PI =", PI);',
              'console.log("doubled =", doubled.join(", "));',
              'console.log("x > 18 ?", x > 18);'
            ],
            expect: 'PI = 3.14159\ndoubled = 2, 4, 6\nx > 18 ? true',
            hint: 'const 声明常量，map 变换，> 比较。',
            ans: '这是 JS 每天都会写的三件事，应该形成肌肉记忆。' },

          { t: 'think', q: '回顾整本教程，你觉得 JS 最容易让新手踩坑的三个点是什么？', ans: '① `==` 的隐式类型转换——永远用 `===`；② `this` 的动态绑定——回调里用箭头函数；③ 异步代码的错误位置——`await` 外面一定要包 `try/catch`。这三条占了初学者 bug 的一大半。' },

          { t: 'think', q: '速查表里的 `map` / `filter` / `reduce` 三个方法，哪个能做到另外两个做不到的事？举一个必须用 reduce 的场景。', ans: '`reduce` 最强大——它能把数组归约成**任意类型**的单个值，而 `map` 只能返回等长数组、`filter` 只能返回子集数组。必须用 reduce 的场景：把数组转换成对象（比如 `[{id:1,name:"a"}]` 转成 `{1: "a"}` 的查找表）、同时计算多个聚合值（一次遍历同时算出总和和最大值）、数组去重（用 reduce 配合 Set 或对象）。`map` 和 `filter` 本质上都是 reduce 的特例——`map` 是 reduce 每次 push 变换后的值，`filter` 是 reduce 条件满足时才 push。' },

          { t: 'note', k: 'danger', title: '上线前必查',
            x: '凡是比较一律 `===`；涉及金额避免直接浮点运算；回调里的 `this` 优先用箭头函数或 `.bind`；任何外部输入（用户、接口）都要假设「可能是 null」，用可选链 `?.` 兜底。' },

          { t: 'kp', x: [
            '变量用 let/const，比较用 ===',
            '函数是一等公民，闭包是封装利器',
            '数组三件套 map/filter/reduce 每天都会用到',
            'this 看调用方式，异步用 async/await 写',
            '动态类型灵活但要 defensive——对外来数据多加校验'
          ]}
        ]
      }

    ]
  });

})(window);
