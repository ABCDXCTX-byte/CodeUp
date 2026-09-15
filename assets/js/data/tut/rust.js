/* ==========================================================================
   CodeUp码上 · data/tut/rust.js — Rust 教程（内容模板，对照 python.js）
   --------------------------------------------------------------------------
   编写约定：
     - 每个 code 块都是「自包含、可编译」的单文件 Rust（fn main 包裹）
     - 远程编译走 wandbox；失败时降级展示 expect
     - 全程 4 空格缩进，无 Tab
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL;
  var T = CL.Tutorials;

  T.register('rust', {
    chapters: [

      /* ==================================================== 1 语言概览 */
      {
        id: 'overview',
        title: '语言概览',
        sub: '一门在编译期就替你管好内存与并发的系统级语言',
        blocks: [
          { t: 'p', x: 'Rust 由 **Graydon Hoare** 在 2006 年作为个人项目开始设计，后来由 **Mozilla** 接手资助，2015 年发布 1.0 正式版。它的诞生源于一个朴素的痛点：写底层系统软件（浏览器引擎、操作系统、数据库）时，你要么用 C/C++ 换取性能却常年与内存错误、数据竞争搏斗，要么用带垃圾回收（GC）的语言换取安全却牺牲确定性与性能。Rust 想同时拿到两者——**没有 GC，却能在编译期保证内存安全与线程安全**。' },

          { t: 'p', x: '它最不一样的设计，是引入了「**所有权（ownership）**」这一在编译期就被强制执行的资源管理制度。你写的每一行代码，编译器都会检查谁拥有这块内存、什么时候释放、能不能同时被多人读写。一旦违反规则，代码**根本编译不过**——把成千上万种运行时崩溃，提前变成了「改到编译通过为止」的反馈循环。' },

          { t: 'h2', x: 'Rust 想解决什么' },
          { t: 'defs', x: [
            { term: '内存安全无 GC', desc: '通过所有权与借用检查，在编译期消除悬垂指针、二次释放、缓冲区溢出等 classics 漏洞，运行时零额外开销。' },
            { term: '并发无数据竞争', desc: '「无畏并发（fearless concurrency）」：编译器在编译期阻止数据竞争，多线程不再靠运气。' },
            { term: '零成本抽象', desc: '你用高级写法（泛型、trait、闭包），编译器生成和手写底层代码一样快的机器码。抽象不收运行时税。' },
            { term: '可靠的包与构建', desc: 'Cargo 统一管理依赖、构建、测试、文档，生态体验接近现代脚本语言。' }
          ]},

          { t: 'h2', x: '三个支柱一句话' },
          { t: 'ul', x: [
            '**所有权**：每块内存都有唯一主人，主人离开作用域，内存自动回收。',
            '**借用**：你可以把内存「借」给别人看或用，但规则由编译器盯着。',
            '**生命周期**：编译器追踪引用活多久，保证你不会用到已经释放的内存。'
          ]},

          { t: 'note', k: 'tip', title: 'Rust 难，但难在对的地方',
            x: '很多人说 Rust 学习曲线陡，其实它把「内存正确性」这门本该由资深工程师凭经验把控的功课，变成编译器替你把关。前期被编译器「说服」很费劲，但一旦编译通过，你就已经在起跑线上避开了大部分 C/C++ 项目要花数月去 debug 的坑。' },

          { t: 'h2', x: '第一个程序' },
          { t: 'code', lang: 'rust', title: 'Hello, World!', run: true, ed: true,
            code: [
              'fn main() {',
              '    println!("Hello, World!");',
              '}'
            ],
            expect: 'Hello, World!' },

          { t: 'p', x: '注意结尾那个 `!`——它不是感叹，而是表示 `println` 是一个**宏**（macro），在编译期展开成真正的代码。Rust 里很多「看起来像函数但带感叹号」的东西都是宏。除此之外，程序由一个 `fn main()` 入口开始，语句以分号结尾，字符串用双引号。对比一下其他语言，你会发现 Rust 比 Python 多了类型与仪式，但比 Java/C++ 轻得多。' },

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

          { t: 'p', x: '这张对照表值得反复看。Python 一行解决，是因为解释器替你扛下了内存与类型管理；Java/C++ 的「仪式感」服务于它们对性能与工程的严苛要求；Rust 的 `fn main` 比 Java 少了类和 `static void`、`String[] args`，比 C 少了头文件与 `return 0`，但多了 `println!` 这个宏——它暗示了 Rust「编译期展开、零运行时开销」的取向。' },

          { t: 'h2', x: 'Rust 擅长什么' },
          { t: 'defs', x: [
            { term: '系统编程', desc: '操作系统（如 Redox）、浏览器引擎组件（Firefox 的 Servo/Stylo）、嵌入式、驱动——传统 C/C++ 的领地。' },
            { term: '高性能服务端', desc: '网络代理、数据库、消息队列。Tokio 让异步 Rust 既有极高吞吐又内存可控。' },
            { term: 'WebAssembly', desc: 'Rust 是编译到 WASM 体验最好的语言之一，前端重计算场景首选。' },
            { term: '命令行工具', desc: 'ripgrep、bat、fd 等明星工具都是 Rust 写的，体积小、启动快、跨平台。' },
            { term: '安全性敏感场景', desc: '加密、解析不可信输入（PDF/图片/网络协议）——内存安全直接等于安全。' }
          ]},

          { t: 'h2', x: 'Rust 不擅长什么' },
          { t: 'p', x: '诚实地说清楚边界，比一味吹捧更有价值：' },
          { t: 'ul', x: [
            '**学习成本**：所有权与生命周期是全新心智模型，前几周会频繁和编译器较劲。',
            '**编译速度**：为了做严格检查，Rust 编译比 Go/C 慢，大型项目尤甚。',
            '**开发节奏极快的脚本/原型**：若只在乎尽快出结果、不在乎运行时开销，Python 更顺手。',
            '**某些成熟生态**：老牌领域的第三方库数量仍不如 C/C++ 与 Java。'
          ]},

          { t: 'note', k: 'info', title: '本教程基于 Rust 1.72',
            x: '所有示例都遵循 Rust 1.72 的语义，避免使用 1.73 之后才稳定的新特性，确保你能用当前主流工具链直接编译运行。' },

          { t: 'kp', x: [
            'Rust 没有垃圾回收，却在编译期保证内存安全与线程安全',
            '程序入口是 fn main()，被 println!（带感叹号，是宏）输出',
            '所有权 / 借用 / 生命周期是 Rust 的灵魂，也是难点所在',
            'Cargo 是官方构建与包管理工具，等价于 npm + make',
            '编译不过的代码跑不起来——编译器是你最严格也最靠谱的搭档'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个 `main`，用 `println!` 打印两行：你开始学 Rust，以及它的招牌能力。', lang: 'rust',
            code: [
              'fn main() {',
              '    println!("我开始学 Rust 了");',
              '    println!("Rust 在编译期保证内存安全");',
              '}'
            ],
            expect: '我开始学 Rust 了\nRust 在编译期保证内存安全',
            ans: '记住三件事：入口是 `fn main()`，输出用宏 `println!`（末尾有感叹号和分号），每条语句以分号结尾。`println!` 会自动加换行。' },
          { t: 'think', q: 'Rust 说「没有 GC 却能在编译期保证内存安全」，它靠的是什么？',
            ans: '靠所有权、借用、生命周期三件套：每个值只有一个主人，主人离开作用域就自动释放；借引用要遵守「多个只读或单个可写」的规则；编译器追踪引用活得够久。这些检查在编译期完成，运行时既不扫堆也不停顿。' },
          { t: 'think', q: 'Rust 把「所有权」放在编译期检查而不是运行时，这带来了什么取舍？',
            ans: '好处是零运行时开销——没有 GC 停顿、没有引用计数的额外指令，生成的机器码和 C/C++ 一样快。代价是编译期要做大量静态分析，编译速度比带 GC 的语言慢，初学者要花时间适应「编译器不让你编译通过」的反馈循环。但这个取舍是值得的：把内存错误从「运行时熬夜排查」提前到「编译期改到通过」，在大型长期维护的项目里省下来的时间远大于编译多花的时间。' }
        ]
      },

      /* ==================================================== 2 快速开始 */
      {
        id: 'setup',
        title: '快速开始',
        sub: '用 rustup 装工具链，用 cargo 管项目',
        blocks: [
          { t: 'h2', x: '安装 Rust 工具链' },
          { t: 'p', x: 'Rust 官方推荐的安装器叫 **rustup**，它会帮你安装编译器 `rustc`、包管理器 `cargo`，并能在一台机器上并存多个 Rust 版本（稳定版 / 测试版 / 每夜版）。' },

          { t: 'h3', x: 'Windows' },
          { t: 'ol', x: [
            '访问 rust-lang.org 下载 `rustup-init.exe` 并运行',
            '安装程序会顺带装上 MSVC 构建工具（编译 C 依赖需要）',
            '装完后打开新的命令提示符，输入 `rustc --version` 验证'
          ]},
          { t: 'note', k: 'warn', title: 'Windows 上的链接器',
            x: 'Rust 自己不负责链接，它调用系统的 C 链接器。Windows 上若没装 Visual Studio 的生成工具，编译含 C 依赖的 crate 会失败。装 rustup 时勾选默认组件通常就带上 MSVC 工具链了；若想轻量，也可装 MinGW-w64 并配置。' },

          { t: 'h3', x: 'macOS 与 Linux' },
          { t: 'p', x: '官方一行命令即可安装，它会下载 rustup 并默认装好稳定版工具链：' },
          { t: 'p', x: '```\n# macOS / Linux\ncurl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh\nsource $HOME/.cargo/env\nrustc --version\n```' },

          { t: 'h2', x: '三个核心命令' },
          { t: 'table',
            head: ['命令', '作用', '说明'],
            rows: [
              ['`rustc 文件.rs`', '直接编译单个源文件', '适合跑小例子，不涉及依赖'],
              ['`cargo new 项目名`', '创建新项目骨架', '生成 Cargo.toml 与 src/main.rs'],
              ['`cargo run`', '编译并运行当前项目', '开发时最常用的命令'],
              ['`cargo build`', '只编译（不运行）', '加 `--release` 做优化编译'],
              ['`cargo test`', '跑单元测试', 'Rust 内置测试框架，零配置'],
              ['`rustup update`', '升级工具链', '保持与官方最新稳定版同步']
            ]},

          { t: 'h2', x: '第一个可运行项目' },
          { t: 'p', x: '用 `cargo new hello` 会生成一个标准结构：`Cargo.toml`（项目清单，记录名称、版本、依赖）与 `src/main.rs`（代码入口）。真正的业务代码都放在 `src/` 下，依赖在 `Cargo.toml` 的 `[dependencies]` 里声明，cargo 自动下载并锁定版本。下面这段就是 `cargo new` 后 `src/main.rs` 的默认内容，直接 `cargo run` 即可看到输出。' },
          { t: 'code', lang: 'rust', title: '默认 main.rs 运行效果', run: true, ed: true,
            code: [
              'fn main() {',
              '    println!("Hello, World!");',
              '}'
            ],
            expect: 'Hello, World!' },

          { t: 'p', x: 'Rust 的「编译 + 运行」与 Python 这类解释型语言不同：你改完代码后必须先编译，编译通过才会执行。好处是很多错误在编译期就被拦下，运行时极少 surprises。' },

          { t: 'h2', x: '单文件也能跑：rustc 直编', },
          { t: 'p', x: '不创建整个 cargo 项目、只想验证一段小代码时，把代码存成 `.rs` 文件，用 `rustc 文件名.rs` 直接生成可执行文件，再运行它。本教程里所有 `run` 按钮背后的远程编译，本质上就是把这个单文件交给编译器（wandbox）编译执行。' },
          { t: 'code', lang: 'rust', title: 'rustc 直编示例', run: true,
            code: [
              'fn main() {',
              '    let version = "1.72";',
              '    println!("Rust 工具链已就绪，示例基于 Rust {}", version);',
              '    println!("用 `cargo run` 启动项目，用 `rustc main.rs` 直接编译单文件");',
              '}'
            ],
            expect: 'Rust 工具链已就绪，示例基于 Rust 1.72\n用 `cargo run` 启动项目，用 `rustc main.rs` 直接编译单文件' },

          { t: 'note', k: 'tip', title: 'Cargo.toml 长什么样',
            x: '一个最小清单大致是：`[package]` 下写 `name`、`version`、`edition = "2021"`；依赖写在 `[dependencies]` 下，例如 `serde = "1"`。cargo 会自动解析、下载、编译依赖，并把锁定版本写进 `Cargo.lock`，保证别人拉到的是一模一样的依赖树。' },

          { t: 'h2', x: '推荐的开发工具' },
          { t: 'defs', x: [
            { term: 'VS Code + rust-analyzer', desc: '免费组合，补全、跳转、错误内联提示体验一流。rust-analyzer 是官方推荐的语言服务器。' },
            { term: 'CLion / RustRover', desc: 'JetBrains 出品，重构与调试强大，适合大型工程。' },
            { term: 'rustfmt', desc: '官方代码格式化工具，一条命令统一风格，团队协作必备。' },
            { term: 'Clippy', desc: '官方 lint 工具，比编译器更「唠叨」，能指出不够地道的写法。' }
          ]},

          { t: 'kp', x: [
            '用 rustup 装工具链，用 cargo 管项目与依赖',
            '写小例子用 rustc 直编，写真项目用 cargo new',
            'Cargo.toml 声明依赖，Cargo.lock 锁定版本',
            'rustfmt 管格式，clippy 管风格，二者都应纳入日常',
            'Rust 是先编译后运行的语言，编译期错误是常态而非事故'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个 main，打印两条常用命令：开发用 `cargo run`，直编单文件用 `rustc`。', lang: 'rust',
            code: [
              'fn main() {',
              '    println!("用 cargo run 启动项目");',
              '    println!("用 rustc main.rs 直编单文件");',
              '}'
            ],
            expect: '用 cargo run 启动项目\n用 rustc main.rs 直编单文件',
            ans: '小例子直接 `rustc main.rs` 再运行；正经项目用 `cargo new` 生成骨架、`cargo run` 一键编译运行。本教程的运行按钮背后就是把单文件交给编译器。' },
          { t: 'think', q: '`Cargo.toml` 和 `Cargo.lock` 各自的作用是什么？',
            ans: '`Cargo.toml` 是你手写的项目清单：写包名、版本和「我依赖哪些 crate」；`Cargo.lock` 是 cargo 自动生成的，记录这次实际锁定的每个依赖的精确版本，保证别人拉到一模一样的依赖树。' },
          { t: 'think', q: '`cargo check` 和 `cargo build` 都能检查代码能不能编译，区别在哪？什么时候用哪个？',
            ans: '`cargo check` 只做类型检查和借用检查，不生成最终的可执行文件，所以速度比 `cargo build` 快很多。日常写代码时你频繁想确认「这段能不能编译过」，用 `cargo check` 反馈最快；需要真正跑程序或发布时才用 `cargo build`（或 `cargo run`，它等价于 build 加运行）。Rust 编译偏慢，养成「写一段就 cargo check 一下」的习惯能大幅减少等待时间。' }
        ]
      },

      /* ==================================================== 3 基础语法 */
      {
        id: 'basics',
        title: '基础语法',
        sub: '变量、宏、注释、格式化输出，以及「块即表达式」',
        blocks: [
          { t: 'h2', x: '变量：let 与不可变性' },
          { t: 'p', x: 'Rust 默认变量是**不可变**的——绑定之后不能再改。这跟 Python 那种「名字随便指」截然不同，却能从根源上减少「谁改了我的数据」这类 bug。想让它可变，要显式加 `mut`（mutable）。' },

          { t: 'code', lang: 'rust', title: 'let 与 mut', run: true, ed: true,
            code: [
              'fn main() {',
              '    let name = "Alice";',
              '    let age = 25;',
              '    println!("你好，{}！", name);',
              '    println!("你今年 {} 岁。", age);',
              '    println!("明年你就 {} 岁了。", age + 1);',
              '}'
            ],
            expect: '你好，Alice！\n你今年 25 岁。\n明年你就 26 岁了。' },

          { t: 'note', k: 'tip', title: 'age + 1 没有修改 age',
            x: '`age + 1` 算出一个新值 26 并输出，原来 `age` 仍是 25。因为 `age` 没声明 `mut`，编译器禁止你对它重新赋值。这种「默认不可变」逼你在真的需要变化时显式表态。' },

          { t: 'h2', x: '注释' },
          { t: 'p', x: 'Rust 的注释写法和 C 系语言一致：行注释用 `//`，块注释用 `/* ... */`（且块注释支持嵌套，这是 Rust 的小巧思）。文档注释 `///` 会被自动抽取成 API 文档。' },
          { t: 'code', lang: 'rust', title: '注释与 debug 打印', run: true, ed: true,
            code: [
              'fn main() {',
              '    // 单行注释：这一行不会执行',
              '    let pi = 3.14; // 行尾注释',
              '    println!("pi = {}", pi);',
              '',
              '    let nums = [1, 2, 3];',
              '    println!("nums = {:?}", nums); // {:?} 是 debug 打印',
              '}'
            ],
            expect: 'pi = 3.14\nnums = [1, 2, 3]' },

          { t: 'note', k: 'info', title: '普通打印 {} 与 debug 打印 {:?}',
            x: '`{}` 调用类型的 `Display` 实现，给人看；`{:?}` 调用 `Debug` 实现，给开发者看（常用于数组、元组等）。想让自定义类型支持 `{:?}`，在 struct/enum 上加 `#[derive(Debug)]` 即可，几乎零成本。' },

          { t: 'h2', x: '「影子」：同名重新绑定' },
          { t: 'p', x: 'Rust 允许用 `let` 再次声明同名变量，新绑定「遮蔽」旧值。这和「修改变量」不同——它本质是一次新的绑定，常用于做类型转换（先用字符串读入，再绑定成数字）。' },
          { t: 'code', lang: 'rust', title: '变量遮蔽 shadowing', run: true, ed: true,
            code: [
              'fn main() {',
              '    let x = 5;',
              '    let x = x + 1;          // 影子：基于旧 x 重新绑定',
              '    let x = x * 2;',
              '    println!("x = {}", x);  // 12',
              '',
              '    // 用块表达式初始化：块的最后一行是「返回值」，不加分号',
              '    let y = {',
              '        let inner = 3;',
              '        inner * inner',
              '    };',
              '    println!("y = {}", y);  // 9',
              '}'
            ],
            expect: 'x = 12\ny = 9' },

          { t: 'note', k: 'danger', title: '块的最后一行不要加分号',
            x: '`inner * inner` 后面**没有分号**，它就是整个块的返回值，被绑给 `y`。一旦你习惯性地加上分号，这行就变成「语句」而非「表达式」，块会返回 `()`，编译器会抱怨类型对不上。这是新手最常见的坑之一。' },

          { t: 'h2', x: '格式化输出：灵活又严格' },
          { t: 'p', x: '`println!` 用 `{}` 占位，按顺序或按编号填入；`{name}` 形式按名字填；`{:?}` 做 debug 打印；`{:.2}` 控制小数位。相比 C 的 `printf`，它是类型安全的——占位符和实参类型不匹配会在编译期报错，不会出现内存越界。' },
          { t: 'code', lang: 'rust', title: '各种占位符', run: true, ed: true,
            code: [
              'fn main() {',
              '    println!("{} 在 {} 学习 Rust", "Alice", 2026);',
              '    println!("{0} 和 {0} 是同一人", "Bob");',
              '    println!("{name} 今年 {age} 岁", name = "Carol", age = 30);',
              '    println!("Debug: {:?}", (\'a\', 1, true));',
              '    println!("保留两位: {:.2}", 3.14159);',
              '}'
            ],
            expect: 'Alice 在 2026 学习 Rust\nBob 和 Bob 是同一人\nCarol 今年 30 岁\nDebug: (\'a\', 1, true)\n保留两位: 3.14' },

          { t: 'h2', x: '语句与表达式' },
          { t: 'p', x: 'Rust 区分「语句」（做动作、不返回值，以分号结尾）和「表达式」（求值、有返回值，不以分号结尾）。函数体、if、循环、块都是表达式。`let` 本身是语句，所以 `let x = (if ...)` 这种写法合法——因为 if 表达式能产出值。' },

          { t: 'code', lang: 'rust', title: '用表达式初始化变量', run: true, ed: true,
            code: [
              'fn main() {',
              '    let score = 85;',
              '    let level = if score >= 60 { "及格" } else { "不及格" };',
              '    println!("分数 {} -> {}", score, level);',
              '}'
            ],
            expect: '分数 85 -> 及格' },

          { t: 'note', k: 'tip', title: '为什么 Rust 强调「表达式」',
            x: '把控制流当成能返回值的表达式，意味着你可以用 `let x = if ...` 直接给变量赋值，少了「先声明、再在分支里分别改」的样板代码，也更不容易漏掉某个分支的赋值。' },

          { t: 'kp', x: [
            '变量默认不可变，需要变化才加 mut',
            '同名 let 重新绑定叫「影子」，常用于类型转换',
            '块/if/循环都是表达式，最后一行（无分号）即返回值',
            'println! 是宏，{} 占位、{:?} 做 debug、{:.2} 控精度',
            'Rust 的格式化是类型安全的，占位符与实参类型不符会编译报错'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用「影子（shadowing）」三步算出 x：先 x=5，再 x=x+1，最后 x=x*2，打印结果。', lang: 'rust',
            code: [
              'fn main() {',
              '    let x = 5;',
              '    let x = x + 1;',
              '    let x = x * 2;',
              '    println!("x = {}", x);',
              '}'
            ],
            expect: 'x = 12',
            ans: '每次 `let x = ...` 都是一次新绑定，把旧 x 遮住。5→6→12，最后打印 12。这和「修改变量」不同——它不需要 mut，本质是重新声明。' },
          { t: 'ex', q: '用 if 表达式判断 7 是奇数还是偶数；再用一个块表达式（最后一行不带分号）算出 6 的两倍。', lang: 'rust',
            code: [
              'fn main() {',
              '    let n = 7;',
              '    let kind = if n % 2 == 0 { "偶数" } else { "奇数" };',
              '    println!("{} 是 {}", n, kind);',
              '',
              '    let doubled = {',
              '        let m = 6;',
              '        m * 2',
              '    };',
              '    println!("doubled = {}", doubled);',
              '}'
            ],
            expect: '7 是 奇数\ndoubled = 12',
            hint: '块的最后一行不带分号才是返回值。',
            ans: 'if 是表达式，两个分支都返回 &str，类型一致。块里 `m * 2` 没加分号，作为整个块的值被 doubled 接住。7 是奇数，6×2=12。' },
          { t: 'think', q: '为什么 Rust 里块/函数体的「最后一行」不能加分号？',
            ans: '加分号就变成「语句」，语句没有值（值是 ()）；不加分号才是「表达式」，它的值才会被返回。如果手滑加了分号，编译器会报「期望某个类型，却得到 ()」——这是新手最常见的坑。' },
          { t: 'think', q: '`let` 绑定默认是不可变的，要改值必须加 `mut`。Rust 为什么把「不可变」设为默认？',
            ans: '因为不可变变量更安全、更易推理。如果一个变量默认不能改，你读代码时就知道它的值从头到尾不变，不用在脑子里追踪「哪里可能改了它」。需要改的时候显式写 `mut`，相当于告诉读者和编译器「注意，这个变量会变」——这在多线程场景下尤其重要，不可变数据天然可以安全共享。Rust 的哲学是「显式即安全」，把最安全的选项设为默认，把需要额外注意的选项变成需要你主动声明。' }
        ]
      },

      /* ==================================================== 4 数据类型 */
      {
        id: 'types',
        title: '数据类型',
        sub: '标量类型、字符串、类型推断与显式转换',
        blocks: [
          { t: 'h2', x: 'Rust 的类型哲学' },
          { t: 'p', x: 'Rust 是**静态强类型**：每个变量在编译期就有确定类型，且类型之间**不会隐式转换**。`"1" + 1` 这种在 JS 里能「凑合」的写法，在 Rust 里直接编译报错。好处是：类型错误在编译期就暴露，而不是等用户触发时才崩溃。' },

          { t: 'h2', x: '标量类型' },
          { t: 'table',
            head: ['类型', '说明', '示例'],
            rows: [
              ['`i8/i16/i32/i64/i128/isize`', '有符号整数', '`-42`（默认 i32）'],
              ['`u8/u16/u32/u64/u128/usize`', '无符号整数', '`100`（u32）'],
              ['`f32 / f64`', '浮点（IEEE 754）', '`3.14`（默认 f64）'],
              ['`bool`', '布尔', '`true` / `false`'],
              ['`char`', 'Unicode 字符（4 字节）', '`\'R\'` / `\'🦀\'`'],
              ['`&str`', '字符串切片（只读视图）', '`"hello"`'],
              ['`String`', '可增长堆字符串', '`String::from("hi")`']
            ]},
          { t: 'note', k: 'info', title: 'isize / usize 是什么',
            x: '`isize` 与 `usize` 的长度取决于目标平台（64 位系统上是 64 位）。它们通常用于「索引」和「长度」——比如数组下标、集合大小，因为不可能为负也不需要超过内存寻址范围。' },

          { t: 'code', lang: 'rust', title: '标量类型一览', run: true, ed: true,
            code: [
              'fn main() {',
              '    let a: i32 = -42;     // 有符号 32 位整数',
              '    let b: u32 = 100;     // 无符号 32 位整数',
              '    let c: f64 = 3.14;    // 64 位浮点',
              '    let d: bool = true;   // 布尔',
              '    let e: char = \'R\';    // 字符（Unicode，4 字节）',
              '    println!("{} {} {} {} {}", a, b, c, d, e);',
              '',
              '    // &str 是字符串切片（只读视图），String 是可增长的堆字符串',
              '    let s: &str = "hello";',
              '    let owned: String = String::from("world");',
              '    println!("{} {}", s, owned);',
              '}'
            ],
            expect: '-42 100 3.14 true R\nhello world' },

          { t: 'h2', x: '类型推断' },
          { t: 'p', x: '虽然 Rust 是静态类型，但编译器非常聪明，绝大多数时候能从上下文**推断**出类型，你不必处处标注。整数默认推断成 `i32`，浮点默认 `f64`。需要换默认或消除歧义时，再显式写类型。' },
          { t: 'code', lang: 'rust', title: '类型推断', run: true, ed: true,
            code: [
              'fn main() {',
              '    let x = 10;          // 默认 i32',
              '    let y = 3.5;         // 默认 f64',
              '    let z = "hi";        // &str',
              '    let v = vec![1, 2];  // Vec<i32>',
              '    println!("{} {} {} {:?}", x, y, z, v);',
              '',
              '    // 类型标注可覆盖默认推断',
              '    let n: u8 = 255;',
              '    println!("n = {}", n);',
              '}'
            ],
            expect: '10 3.5 hi [1, 2]\nn = 255' },

          { t: 'h2', x: '数字运算与溢出' },
          { t: 'p', x: '整数除法会**截断**而非四舍五入；取余用 `%`。Rust 在调试模式（默认 `cargo run`）下，对无符号整数溢出会**直接 panic**——这是它「不悄悄出错」的体现。发布模式（`--release`）下溢出会回绕（256 变成 0），追求极致性能。无论哪种，都鼓励你显式处理边界，而不是指望溢出「恰好正确」。' },
          { t: 'code', lang: 'rust', title: '整数运算', run: true, ed: true,
            code: [
              'fn main() {',
              '    let a = 7 / 2;     // 整数除法截断',
              '    let b = 7 % 2;     // 取余',
              '    let c = 2_i32.pow(10);',
              '    println!("7/2={} 7%2={} 2^10={}", a, b, c);',
              '',
              '    let max: u8 = 255;',
              '    println!("max = {}", max);',
              '    // println!("{}", max + 1); // 调试模式会 panic：溢出',
              '}'
            ],
            expect: '7/2=3 7%2=1 2^10=1024\nmax = 255' },

          { t: 'h2', x: '字符与字符串：长度不是一回事' },
          { t: 'p', x: 'Rust 的 `char` 永远是 4 字节 Unicode 标量值，能装下任何字符甚至 emoji。而字符串 `&str`/`String` 在内存里是 **UTF-8 字节序列**——所以「字符个数」和「字节长度」常常不相等。中文每个字通常占 3 字节。' },
          { t: 'code', lang: 'rust', title: 'char 与字符串长度', run: true, ed: true,
            code: [
              'fn main() {',
              '    let ch = \'🦀\';',
              '    println!("一个 char 占 {} 字节", std::mem::size_of::<char>());',
              '',
              '    let s = "你好";',
              '    println!("字符数(Unicode): {}", s.chars().count());',
              '    println!("字节数(UTF-8): {}", s.len());',
              '}'
            ],
            expect: '一个 char 占 4 字节\n字符数(Unicode): 2\n字节数(UTF-8): 6' },

          { t: 'note', k: 'warn', title: '别用下标切中文',
            x: '字符串索引 `s[0]` 在 Rust 里**不允许**，因为 UTF-8 里「第几个字节」不等于「第几个字符」，编译器拒绝这种可能出错的写法。要取字符用 `.chars().nth(i)`，要取字节用 `.as_bytes()[i]`，二者语义不同。' },

          { t: 'h2', x: '显式类型转换' },
          { t: 'p', x: 'Rust 不做任何隐式数值转换。字符串转数字用 `parse`，数字之间转换用 `as`。`as` 是「按位重新解释」，可能截断或回绕，所以要清楚自己在做什么。' },
          { t: 'code', lang: 'rust', title: '显式转换', run: true, ed: true,
            code: [
              'fn main() {',
              '    let s = "42";',
              '    let n: i32 = s.parse().unwrap_or(0);',
              '    println!("字符串 \'{}\' -> 数字 {}", s, n);',
              '',
              '    let f = 3.99;',
              '    println!("int(3.99) 截断 = {}", f as i32);',
              '    let big = 300;',
              '    println!("u8 截断: {}", big as u8); // 300 % 256 = 44',
              '}'
            ],
            expect: '字符串 \'42\' -> 数字 42\nint(3.99) 截断 = 3\nu8 截断: 44' },

          { t: 'kp', x: [
            '静态强类型：类型在编译期确定，且绝不隐式转换',
            '默认 i32 / f64，需要时显式标注覆盖推断',
            'char 是 4 字节 Unicode；字符串是 UTF-8 字节流',
            '字符串不能下标索引，字符数与字节数常不相等',
            '数字转字符串用 parse，数字互转用 as（会截断/回绕）'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '把浮点 5.9 用 as 转成 i32 看截断效果；再打印字符串 "rust" 的字节长度和字符数。', lang: 'rust',
            code: [
              'fn main() {',
              '    let f = 5.9;',
              '    println!("f as i32 = {}", f as i32);',
              '',
              '    let s = "rust";',
              '    println!("字节长度 = {}", s.len());',
              '    println!("字符数 = {}", s.chars().count());',
              '}'
            ],
            expect: 'f as i32 = 5\n字节长度 = 4\n字符数 = 4',
            ans: '`as i32` 会把小数部分直接截掉（不是四舍五入），5.9 变 5。"rust" 全是 ASCII，所以字节长度和字符数都是 4；换成中文就不一样了。' },
          { t: 'think', q: '为什么 Rust 不允许你写 `let c = s[0]` 去取字符串第一个字符？',
            ans: 'Rust 字符串是 UTF-8 字节流，「第 0 个字节」不一定是「第 0 个字符」——中文一个字占 3 字节，直接按字节取可能切到半个字符，产生非法 UTF-8。所以编译器干脆禁止下标；要取字符用 `.chars().nth(i)`，要取字节用 `.as_bytes()[i]`。' },
          { t: 'think', q: 'Rust 的 `String` 和 `&str` 有什么区别？什么时候用哪个？',
            ans: '`String` 是**拥有所有权**的、存在堆上的可增长字符串，你可以修改它（`push_str`、`clear` 等），它离开作用域时自动释放堆内存。`&str` 是**借用**的字符串切片，只是一个（指针, 长度）对，不拥有数据，可以指向 `String` 的一部分、也可以指向字符串字面量。函数参数如果只需要读字符串，用 `&str`（调用方传 `String` 或 `&str` 都行，因为 `String` 会自动解引用为 `&str`）；函数要返回新建的字符串或需要持有，用 `String`。' }
        ]
      },

      /* ==================================================== 5 运算符 */
      {
        id: 'operators',
        title: '运算符',
        sub: '算术、比较、逻辑、位运算与复合赋值',
        blocks: [
          { t: 'h2', x: '运算符总览' },
          { t: 'table',
            head: ['类别', '运算符', '说明'],
            rows: [
              ['算术', '`+ - * / %`', '加减乘除、取余'],
              ['幂', '`.pow(n)`', '方法形式，如 `2_i32.pow(10)`'],
              ['比较', '`== != < > <= >=`', '结果为 bool'],
              ['逻辑', '`&& || !`', '短路求值，操作数是 bool'],
              ['位运算', '`& | ^ ! << >>`', '按二进制位操作'],
              ['赋值', '`= += -= *= /= %=`', '复合赋值'],
              ['范围', '`..` `..=`', '左闭右开 / 全闭，常用于 for']
            ]},

          { t: 'h2', x: '算术与比较' },
          { t: 'code', lang: 'rust', title: '算术比较', run: true, ed: true,
            code: [
              'fn main() {',
              '    let a = 10;',
              '    let b = 3;',
              '    println!("a + b = {}", a + b);',
              '    println!("a % b = {}", a % b);',
              '    println!("a > b ? {}", a > b);',
              '    println!("链式组合: {}", (1 < 2) && (2 < 3));',
              '}'
            ],
            expect: 'a + b = 13\na % b = 1\na > b ? true\n链式组合: true' },

          { t: 'note', k: 'warn', title: 'Rust 没有 Python 那种链式比较',
            x: '在 Python 里你能写 `1 < x < 10`，Rust 不支持这种「一个值对多个边界」的链式语法，必须拆成 `1 < x && x < 10`。这是两种语言设计取舍的不同——Rust 更「显式」。' },

          { t: 'h2', x: '逻辑与短路求值' },
          { t: 'p', x: '`&&` 和 `||` 是**短路**的：一旦左边已经能决定结果，右边就不再求值。利用这一点，你可以把「可能出错的检查」放在右边，避免无谓计算甚至越界访问。' },
          { t: 'code', lang: 'rust', title: '短路求值演示', run: true, ed: true,
            code: [
              'fn main() {',
              '    let x = 5;',
              '    // 左边为假，expensive() 不会被调用',
              '    let big = x > 100 && expensive();',
              '    println!("big = {}", big);',
              '}',
              '',
              'fn expensive() -> bool {',
              '    println!("expensive 被调用了");',
              '    true',
              '}'
            ],
            expect: 'big = false' },

          { t: 'h2', x: '位运算' },
          { t: 'p', x: '位运算直接操作整数的二进制位，常见于底层协议、标志位、图形与加密。`{:b}` 可以把数字按二进制打印出来，调试位运算时很方便。' },
          { t: 'code', lang: 'rust', title: '位运算', run: true, ed: true,
            code: [
              'fn main() {',
              '    let a = 0b1100; // 12',
              '    let b = 0b1010; // 10',
              '    println!("a & b = {:b}", a & b); // 1000 = 8',
              '    println!("a | b = {:b}", a | b); // 1110 = 14',
              '    println!("a ^ b = {:b}", a ^ b); // 0100 = 4',
              '    println!("a << 1 = {}", a << 1); // 24',
              '}'
            ],
            expect: 'a & b = 1000\na | b = 1110\na ^ b = 100\na << 1 = 24' },

          { t: 'h2', x: '复合赋值' },
          { t: 'p', x: '可变变量可以用 `+=` 这类复合赋值就地更新。`String` 甚至重载了 `+=`（把右侧字符串追加进来）。' },
          { t: 'code', lang: 'rust', title: '复合赋值', run: true, ed: true,
            code: [
              'fn main() {',
              '    let mut n = 1;',
              '    n += 4;',
              '    n *= 2;',
              '    println!("n = {}", n); // 10',
              '',
              '    let mut s = String::from("go");',
              '    s += " rust";',
              '    println!("{}", s);',
              '}'
            ],
            expect: 'n = 10\ngo rust' },

          { t: 'h2', x: '运算符也是方法（trait）' },
          { t: 'p', x: 'Rust 里 `a + b` 背后其实是 `a.add(b)`，由 `std::ops::Add` 等 trait 定义。这意味着你可以让自己的类型也支持 `+`、`==` 等运算符——只要去实现对应的 trait。这叫「运算符重载」，是 Rust 把一致性交给开发者、而非写死在语言里的体现。' },

          { t: 'note', k: 'tip', title: '什么时候会用到重载',
            x: '写数学向量、矩阵、复数、时间戳这类「天然该支持加减比较」的类型时，实现 `Add` / `Sub` / `PartialEq` 等 trait，就能让用户像用内建类型一样写 `v1 + v2`。标准库里的 `Duration`、`std::time` 就是这么做的。' },

          { t: 'kp', x: [
            '比较结果为 bool，逻辑运算符要求 bool 操作数',
            '&& 与 || 短路求值，可用来跳过昂贵或危险的右边',
            '没有链式比较，写成 a < x && x < b',
            '复合赋值 += 等可用于数字与 String',
            '运算符本质是 trait 方法，自定义类型可重载'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '给定 a=17、b=5，打印整数商、余数、按位与，以及 1 左移 4 位的结果。', lang: 'rust',
            code: [
              'fn main() {',
              '    let a = 17;',
              '    let b = 5;',
              '    println!("a / b = {}", a / b);',
              '    println!("a % b = {}", a % b);',
              '    println!("a & b = {}", a & b);',
              '    println!("1 << 4 = {}", 1 << 4);',
              '}'
            ],
            expect: 'a / b = 3\na % b = 2\na & b = 1\n1 << 4 = 16',
            ans: '整数除法截断：17/5=3。余数 2。17(10001) & 5(00101)=1。左移四位等价于乘 2⁴，1<<4=16。' },
          { t: 'think', q: '`&&` 和 `||` 的「短路求值」在写代码时有什么实际好处？',
            ans: '一旦左边已经能决定结果，右边就不执行。于是你可以把「可能越界或昂贵」的检查放右边：比如 `v.len() > 0 && v[0] == 1`，数组为空时根本不会去取 v[0]，避免 panic。' },
          { t: 'think', q: 'Rust 里 `a == b` 和 `a.eq(&b)` 有什么区别？为什么有时候只能用后者？',
            ans: '`==` 是 `PartialEq` trait 的运算符语法糖，要求两边类型相同，而且它会自动处理引用——`a == b` 在 a、b 是引用时等价于 `*a == *b`。`a.eq(&b)` 是显式调用 `PartialEq::eq`，需要手动传引用。大多数时候用 `==` 就行，但在泛型代码里需要明确控制引用层级、或在某些闭包/方法链里运算符不方便写时，就用 `.eq()`。另外浮点数实现了 `PartialEq` 但没实现 `Eq`（因为 NaN != NaN），所以浮点数可以用 `==` 但不能放进要求 `Eq` 的 HashSet。' }
        ]
      },

      /* ==================================================== 6 控制流 */
      {
        id: 'control',
        title: '控制流',
        sub: 'if 是表达式、loop/while/for，以及 match 模式匹配',
        blocks: [
          { t: 'h2', x: 'if 是表达式，不是语句' },
          { t: 'p', x: '在 Rust 里，`if` 会**产生一个值**。这意味着你可以用它直接给变量赋值，各分支的**类型必须一致**。没有 Python 那种「真就执行、假就跳过且不赋值」的模糊——要么都赋值，要么都不赋。' },
          { t: 'code', lang: 'rust', title: 'if 作为表达式', run: true, ed: true,
            code: [
              'fn main() {',
              '    let score = 85;',
              '    let grade = if score >= 90 {',
              '        "A"',
              '    } else if score >= 60 {',
              '        "B"',
              '    } else {',
              '        "C"',
              '    };',
              '    println!("成绩等级: {}", grade);',
              '',
              '    let n = 5;',
              '    let parity = if n % 2 == 0 { "偶数" } else { "奇数" };',
              '    println!("{} 是 {}", n, parity);',
              '}'
            ],
            expect: '成绩等级: B\n5 是 奇数' },

          { t: 'note', k: 'info', title: '为什么分支类型要一致',
            x: '因为 `if` 的结果要绑给一个变量，编译器必须知道这个变量是什么类型。如果「及格分支返回字符串、不及格分支返回数字」，变量类型就无法确定，编译报错。这是一种「逼你想清楚」的约束。' },

          { t: 'h2', x: 'loop：无限循环，可带返回值' },
          { t: 'p', x: '`loop` 是无限循环，常用于「直到某个条件才退出」的场景。它特殊的地方在于：`break` 可以**携带一个值**作为整个 loop 的返回值——这让它既能当 `while(true)` 用，又能顺手算出一个结果。' },
          { t: 'code', lang: 'rust', title: 'loop 带返回值', run: true, ed: true,
            code: [
              'fn main() {',
              '    let mut count = 0;',
              '    let result = loop {',
              '        count += 1;',
              '        if count == 3 {',
              '            break count * 10; // loop 的返回值通过 break 带出',
              '        }',
              '    };',
              '    println!("result = {}", result);',
              '}'
            ],
            expect: 'result = 30' },

          { t: 'h2', x: 'while：条件循环' },
          { t: 'code', lang: 'rust', title: 'while 倒计时', run: true, ed: true,
            code: [
              'fn main() {',
              '    let mut i = 5;',
              '    while i > 0 {',
              '        println!("{}", i);',
              '        i -= 1;',
              '    }',
              '    println!("发射！");',
              '}'
            ],
            expect: '5\n4\n3\n2\n1\n发射！' },

          { t: 'h2', x: 'for：遍历的首选' },
          { t: 'p', x: '遍历集合或区间时，优先用 `for`，而不是手动维护下标。`1..3` 是左闭右开（不含 3），`1..=3` 是全闭（含 3）。遍历集合用 `.iter()` 拿到元素的引用。' },
          { t: 'code', lang: 'rust', title: 'for 遍历', run: true, ed: true,
            code: [
              'fn main() {',
              '    for i in 1..=3 {',
              '        println!("i = {}", i);',
              '    }',
              '    let names = ["Alice", "Bob", "Carol"];',
              '    for name in names.iter() {',
              '        println!("你好，{}", name);',
              '    }',
              '}'
            ],
            expect: 'i = 1\ni = 2\ni = 3\n你好，Alice\n你好，Bob\n你好，Carol' },

          { t: 'h2', x: 'match：Rust 的控制流之王' },
          { t: 'p', x: '`match` 是 Rust 最强大的控制结构——它把一个值「模式匹配」到若干分支。**它必须穷尽**：所有可能的情况都得覆盖，否则编译报错。用 `_` 兜底遗漏的情况。相比 C 的 `switch`，match 的分支能绑定变量、能做守卫条件、能解构复杂数据，是 Rust 表达力的核心来源。' },
          { t: 'code', lang: 'rust', title: 'match 基础', run: true, ed: true,
            code: [
              'fn main() {',
              '    let number = 3;',
              '    let desc = match number {',
              '        0 => "零",',
              '        1 | 2 | 3 => "小数字",',
              '        4..=9 => "个位数",',
              '        _ => "其他",',
              '    };',
              '    println!("{} 是 {}", number, desc);',
              '',
              '    // match 必须穷尽；用 _ 兜底',
              '    let c = \'b\';',
              '    let kind = match c {',
              '        \'a\'..=\'z\' => "小写字母",',
              '        \'A\'..=\'Z\' => "大写字母",',
              '        _ => "其他字符",',
              '    };',
              '    println!("\'{}\' 是 {}", c, kind);',
              '}'
            ],
            expect: '3 是 小数字\n\'b\' 是 小写字母' },

          { t: 'h2', x: 'match 的进阶：守卫与绑定' },
          { t: 'p', x: '分支后可加 `if` 守卫做更精细的判断；模式里可以用变量名「捕获」匹配到的值，甚至用 `@` 把值同时绑定并判范围。下面顺带演示了用 match 处理 `Option`（Rust 表示「可能有值」的枚举，详见错误处理章）。' },
          { t: 'code', lang: 'rust', title: '守卫与绑定', run: true, ed: true,
            code: [
              'fn main() {',
              '    let pair = (2, -2);',
              '    match pair {',
              '        (x, y) if x + y == 0 => println!("互为相反数"),',
              '        (x, y) => println!("({}, {}) 不是相反数", x, y),',
              '    }',
              '',
              '    let msg = Some(5);',
              '    match msg {',
              '        Some(n @ 1..=5) => println!("小正数: {}", n),',
              '        Some(_) => println!("其他数"),',
              '        None => println!("无"),',
              '    }',
              '}'
            ],
            expect: '(2, -2) 不是相反数\n小正数: 5' },

          { t: 'note', k: 'tip', title: 'match 比一连串 if-else 更安全',
            x: '当你给枚举（enum）加了一个新变体，所有 `match` 它的地方编译器会提醒你「漏了分支」，逼你处理。这种「改一处、编译器带你改全身」的能力，是大型项目重构不崩的关键。' },

          { t: 'kp', x: [
            'if 是表达式，各分支类型必须一致',
            'loop 的 break 可带返回值，等价于带结果的无限循环',
            '遍历优先用 for，区间 .. 不含尾、..= 含尾',
            'match 必须穷尽，用 _ 兜底；还能守卫 + 绑定',
            'match 处理 enum/Option 是 Rust 日常写法的核心'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 `loop` 不断自增 n，直到 n>5 时 `break` 带出 `n*2` 作为循环结果并打印。', lang: 'rust',
            code: [
              'fn main() {',
              '    let mut n = 1;',
              '    let result = loop {',
              '        n += 1;',
              '        if n > 5 {',
              '            break n * 2;',
              '        }',
              '    };',
              '    println!("result = {}", result);',
              '}'
            ],
            expect: 'result = 12',
            hint: 'loop 是表达式，break 可以带值。',
            ans: 'n 从 1 开始自增：2、3、4、5、6。当 n=6 时满足 >5，`break 6*2` 把 12 作为整个 loop 的返回值，绑给 result。' },
          { t: 'ex', q: '用 `match` 给分数 76 定级：90~100 是 A，60~89 是 B，其余是 C。', lang: 'rust',
            code: [
              'fn main() {',
              '    let score = 76;',
              '    let grade = match score {',
              '        90..=100 => "A",',
              '        60..=89 => "B",',
              '        _ => "C",',
              '    };',
              '    println!("成绩 = {}", grade);',
              '}'
            ],
            expect: '成绩 = B',
            ans: '`..=` 是全闭区间。76 落在 60~89，所以匹配 "B"。match 必须穷尽，这里用 `_ => "C"` 兜底了所有其他分数。' },
          { t: 'think', q: '为什么 Rust 要求 `match` 必须穷尽所有可能？漏掉一个分支会怎样？',
            ans: '编译器会直接报错，不让你编译通过。好处是：当你给 enum 加一个新变体时，所有处理它的 match 都会提醒你「这里漏了」，逼你补全——大型项目重构时不会悄悄漏掉某个状态，这是别的语言靠自觉做不到的安全网。' },
          { t: 'think', q: '`if let` 和 `match` 相比各自适合什么场景？`if let` 有什么局限？',
            ans: '`if let` 适合「只关心一种模式、其他情况忽略」的场景，比如 `if let Some(x) = opt { ... }`，比写一个只有一个分支加 `_ => ()` 的 match 简洁。它的局限是：不能像 match 那样作为表达式返回值给变量（`let x = match ...` 可以，`let x = if let ...` 不行，因为 else 分支类型可能不匹配），多分支处理也不如 match 清晰。需要穷尽处理或多分支返回值时用 match，只处理单种情况时用 `if let`。' }
        ]
      },

      /* ==================================================== 7 函数 */
      {
        id: 'functions',
        title: '函数',
        sub: '定义、返回值，以及和所有权绑定的参数传递',
        blocks: [
          { t: 'h2', x: '定义函数' },
          { t: 'p', x: '用 `fn` 定义函数，参数必须标注类型，返回值用 `-> 类型` 声明。Rust 没有「return 语句优先」的习惯——**函数体最后一个表达式（不加分号）就是返回值**，当然你也可以用 `return` 提前返回。' },
          { t: 'code', lang: 'rust', title: '函数与返回值', run: true, ed: true,
            code: [
              'fn main() {',
              '    println!("add(3, 4) = {}", add(3, 4));',
              '    println!("area(2, 3) = {}", area(2, 3));',
              '}',
              '',
              'fn add(a: i32, b: i32) -> i32 {',
              '    a + b // 无分号 = 返回值',
              '}',
              '',
              'fn area(w: i32, h: i32) -> i32 {',
              '    w * h',
              '}'
            ],
            expect: 'add(3, 4) = 7\narea(2, 3) = 6' },

          { t: 'note', k: 'info', title: '表达式 vs 语句',
            x: '`a + b`（无分号）是表达式，值被返回；`a + b;`（有分号）是语句，值为 `()`。所以如果函数想返回 `a + b`，千万别手滑加分号，否则编译器会报「期望 i32，却得到 ()」。' },

          { t: 'h2', x: '参数传递与所有权' },
          { t: 'p', x: '这是 Rust 和多数语言最不一样的地方。把 `String` 这种拥有堆内存的值传给函数，**所有权会移动**过去——原变量从此失效。函数结束后，那块内存随参数一起被释放。这避免了「两个地方都想释放同一块内存」的二次释放 bug。' },
          { t: 'code', lang: 'rust', title: '传值即移动所有权', run: true, ed: true,
            code: [
              'fn main() {',
              '    let s = String::from("hello");',
              '    take_ownership(s);',
              '    // println!("{}", s); // 编译错误：s 的所有权已移走',
              '}',
              '',
              'fn take_ownership(text: String) {',
              '    println!("拿到了字符串: {}", text);',
              '}'
            ],
            expect: '拿到了字符串: hello' },

          { t: 'h2', x: '借用：传引用而不转移所有权' },
          { t: 'p', x: '如果你只是想「用一下」参数、用完还要还回来，就传**引用** `&T`。引用像一张「借书卡」：你看完得还，书的主人没变。函数结束后，原来的变量依然有效。' },
          { t: 'code', lang: 'rust', title: '传引用（借用）', run: true, ed: true,
            code: [
              'fn main() {',
              '    let s = String::from("hello");',
              '    print_length(&s);          // 借出引用，不转移所有权',
              '    println!("仍然可用: {}", s); // s 还在',
              '}',
              '',
              'fn print_length(s: &String) {',
              '    println!("长度 = {}", s.len());',
              '}'
            ],
            expect: '长度 = 5\n仍然可用: hello' },

          { t: 'h2', x: '可变引用：借来还能改' },
          { t: 'p', x: '普通的 `&T` 是只读借用。要借来修改，得用**可变引用** `&mut T`，并且原变量必须声明为 `mut`。编译器规定：同一时刻，要么有多个只读借用，要么只有一个可写借用——从根本上杜绝数据竞争。' },
          { t: 'code', lang: 'rust', title: '可变引用', run: true, ed: true,
            code: [
              'fn main() {',
              '    let mut s = String::from("hi");',
              '    append_world(&mut s);',
              '    println!("{}", s);',
              '}',
              '',
              'fn append_world(s: &mut String) {',
              '    s.push_str(", world");',
              '}'
            ],
            expect: 'hi, world' },

          { t: 'h2', x: '把所有权还回来' },
          { t: 'p', x: '有时函数既要「用」参数、又要返回结果，可以在返回时把所有权交还（连同新算出的数据一并返回）。Rust 没有 GC，也没有隐式拷贝，这种「显式归还」既清晰又零开销。' },
          { t: 'code', lang: 'rust', title: '返回所有权', run: true, ed: true,
            code: [
              'fn main() {',
              '    let s = String::from("rust");',
              '    let (s, len) = calc_length(s);',
              '    println!("\'{}\' 长度 {}", s, len);',
              '}',
              '',
              'fn calc_length(s: String) -> (String, usize) {',
              '    let len = s.len();',
              '    (s, len) // 把所有权还回来',
              '}'
            ],
            expect: '\'rust\' 长度 4' },

          { t: 'h2', x: '递归与其他例子' },
          { t: 'p', x: 'Rust 支持递归，也会做尾调用之外的普通递归展开。下面用经典的斐波那契演示函数调用自身。' },
          { t: 'code', lang: 'rust', title: '递归', run: true, ed: true,
            code: [
              'fn main() {',
              '    println!("fib(10) = {}", fib(10));',
              '}',
              '',
              'fn fib(n: u64) -> u64 {',
              '    if n < 2 { n } else { fib(n - 1) + fib(n - 2) }',
              '}'
            ],
            expect: 'fib(10) = 55' },

          { t: 'note', k: 'tip', title: 'Copy 类型传值不移动',
            x: '像 `i32`、`f64`、`bool`、`char` 这类完全在栈上、大小固定的类型实现了 `Copy` trait。传它们时编译器会**复制一份**，原变量不受影响。所以你很少需要给整数加 `&`。堆类型（`String`、 vector）则默认移动，需要 `&` 或 `.clone()` 才能再用。' },

          { t: 'kp', x: [
            'fn 定义函数，参数标类型，返回值用 -> 类型',
            '最后一行（无分号）即返回值；也可 return 提前退出',
            '传 String 等会移动所有权，原变量失效',
            '传 &T 是借用，用完原变量仍在；&mut T 可改',
            '栈上的 Copy 类型（i32 等）传值会复制，不移动'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '把一个 `String` 传给函数计算长度（会移动所有权），函数返回长度后不再使用原字符串。', lang: 'rust',
            code: [
              'fn main() {',
              '    let s = String::from("hello");',
              '    let len = calc_len(s);',
              '    println!("长度 = {}", len);',
              '}',
              '',
              'fn calc_len(s: String) -> usize {',
              '    s.len()',
              '}'
            ],
            expect: '长度 = 5',
            ans: '把 String 传进函数，所有权移动到 s 上，函数结束时这块堆内存被自动释放。因为 main 之后不再用 s，所以能编译通过。' },
          { t: 'ex', q: '改用借用 `&String` 传参，计算长度的同时保证原字符串在 main 里仍可用。', lang: 'rust',
            code: [
              'fn main() {',
              '    let s = String::from("rust");',
              '    let len = borrow_len(&s);',
              '    println!("长度 = {}", len);',
              '    println!("s 仍然可用: {}", s);',
              '}',
              '',
              'fn borrow_len(s: &String) -> usize {',
              '    s.len()',
              '}'
            ],
            expect: '长度 = 4\ns 仍然可用: rust',
            ans: '传 `&s` 是「借」一个只读引用，所有权没动，函数用完就还，所以 main 里 s 还能继续打印。需要修改时才用 `&mut String`。' },
          { t: 'think', q: '把 `String` 传给函数后，为什么原来的变量就不能再用了？',
            ans: '因为所有权被「移动」过去了：同一时刻堆上的数据只能有一个主人。如果原变量还能用、函数结束又释放一次，就会二次释放，造成 use-after-free。Rust 在编译期直接禁止这种写法，从根上杜绝这类崩溃。' },
          { t: 'think', q: '同样是传值，为什么 `i32` 传完两边都能用，而 `String` 传完原变量就失效了？',
            ans: '因为 i32 实现了 `Copy` trait：它大小固定、存在栈上，传参时编译器悄悄复制一份，原变量不受影响。String 的数据在堆上，Copy 太贵，所以默认是「移动」——要么借用，要么 `.clone()`，才要再用一次。' }
        ]
      },

      /* ==================================================== 8 开发环境与工具链 */
      {
        id: 'devtools',
        title: '开发环境与工具链',
        sub: '从 rustup 到 clippy，搭建专业 Rust 开发环境',
        blocks: [
          { t: 'h2', x: 'Rust 安装与版本管理' },
          { t: 'p', x: 'Rust 官方推荐使用 rustup 安装和管理版本。rustup 是 Rust 的版本管理工具，类似 nvm/rbenv，可以安装多个 Rust 版本（stable/beta/nightly），切换默认版本，安装组件（rust-src、clippy、rustfmt）。' },
          { t: 'defs', x: [
            { term: 'rustup', desc: 'Rust 官方版本管理工具。curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh（Linux/macOS），Windows 下载 rustup-init.exe。安装后 rustc --version、cargo --version 验证。' },
            { term: 'rustc', desc: 'Rust 编译器，将 .rs 编译为二进制。rustc main.rs -o program。通常不直接使用，通过 cargo 调用。' },
            { term: 'cargo', desc: 'Rust 包管理和构建工具，类似 npm + make + pip。cargo new/build/run/test/doc/publish。Rust 开发的核心工具。' },
            { term: 'stable/beta/nightly', desc: 'Rust 三个发布通道。stable（稳定版，默认）、beta（测试版）、nightly（每日构建，包含不稳定特性）。rustup default stable、rustup override set nightly。' },
            { term: '组件', desc: 'rustup component add clippy rustfmt rust-src。clippy（静态分析）、rustfmt（格式化）、rust-src（标准库源码，调试和 RLS 用）。' }
          ]},
          { t: 'code', lang: 'shell', title: 'rustup 和 cargo 常用命令', run: false,
            code: [
              'rustup default stable              # 设置默认版本',
              'rustup update                       # 更新所有版本',
              'rustup toolchain list               # 列出已安装版本',
              'rustup component add clippy rustfmt # 安装组件',
              '',
              'cargo new myapp --bin               # 创建二进制项目',
              'cargo new mylib --lib               # 创建库项目',
              'cargo build                          # 编译（debug）',
              'cargo build --release                # 编译（release，优化）',
              'cargo run                            # 编译并运行',
              'cargo test                           # 运行测试',
              'cargo test --release                 # release 模式测试',
              'cargo doc --open                     # 生成并打开文档',
              'cargo check                          # 快速类型检查（不生成二进制）',
              'cargo clippy                         # 静态分析',
              'cargo fmt                            # 格式化代码',
              'cargo publish                        # 发布到 crates.io',
              'cargo add serde                      # 添加依赖（cargo-edit）'
            ]},
          { t: 'h2', x: 'Cargo 构建系统' },
          { t: 'p', x: 'Cargo 是 Rust 的构建系统和包管理器，负责依赖管理、编译、测试、文档、发布。Cargo.toml 是项目配置文件（类似 package.json），Cargo.lock 锁定依赖版本（类似 package-lock.json）。' },
          { t: 'code', lang: 'toml', title: 'Cargo.toml 示例', run: false,
            code: [
              '[package]',
              'name = "myapp"',
              'version = "0.1.0"',
              'edition = "2021"           # Rust 2015/2018/2021',
              'authors = ["Your Name <you@example.com>"]',
              'description = "A Rust application"',
              'license = "MIT"',
              'repository = "https://github.com/user/myapp"',
              '',
              '[dependencies]',
              'serde = { version = "1.0", features = ["derive"] }',
              'serde_json = "1.0"',
              'tokio = { version = "1.0", features = ["full"] }',
              'reqwest = { version = "0.11", features = ["json"] }',
              '',
              '[dev-dependencies]',
              'proptest = "1.0"            # 仅测试时依赖',
              '',
              '[build-dependencies]',
              'cc = "1.0"                   # 构建脚本依赖',
              '',
              '[profile.release]',
              'opt-level = 3               # 优化级别',
              'lto = true                   # 链接时优化',
              'codegen-units = 1           # 单代码生成单元（更慢但更小）',
              'strip = true                 # 剥离符号',
              '',
              '[workspace]',
              'members = ["crates/*"]      # 工作空间成员'
            ]},
          { t: 'h2', x: 'IDE 与编辑器' },
          { t: 'defs', x: [
            { term: 'VS Code + rust-analyzer', desc: '免费轻量，rust-analyzer 是 Rust 官方语言服务器（LSP），提供智能补全、类型提示、重构、跳转定义。比旧的 RLS 快 10 倍以上。安装 rust-analyzer 扩展即可。' },
            { term: 'RustRover', desc: 'JetBrains 出品的 Rust 专用 IDE，付费。智能补全、重构、调试、数据库、Docker 集成度极高。专业 Rust 开发首选。' },
            { term: 'CLion + Rust 插件', desc: 'JetBrains C/C++ IDE + Rust 插件，支持 Rust 开发。比 RustRover 更通用，适合同时写 C/C++ 和 Rust。' },
            { term: 'Vim/Neovim + rust-analyzer', desc: '终端党首选，rust-analyzer 提供 LSP 智能补全，配合 coc.nvim/nvim-lspconfig。调试用 nvim-dap + lldb。' },
            { term: 'Helix', desc: '现代模态编辑器，内置 LSP（rust-analyzer）和 Tree-sitter，开箱即用。类似 Vim 但更现代。' }
          ]},
          { t: 'h2', x: '调试工具' },
          { t: 'defs', x: [
            { term: 'rust-gdb / rust-lldb', desc: 'Rust 封装的 GDB/LLDB，自动加载 Rust 美化脚本（rustlib/etc），更好地显示 Rust 类型（Option、Result、Vec、String）。rust-gdb ./target/debug/myapp。' },
            { term: 'gdb', desc: 'GNU 调试器，Linux 默认。break main、run、next、step、print var、backtrace。Rust 程序也可用 gdb 调试。' },
            { term: 'lldb', desc: 'LLVM 调试器，macOS 默认（Xcode 内置）。API 更现代，Python 脚本支持更好。Rust 程序可用 lldb 调试。' },
            { term: 'VS Code 调试', desc: '安装 CodeLLDB 扩展，配置 launch.json，即可在 VS Code 中图形化调试 Rust 程序。断点、变量、调用栈、监视表达式。' },
            { term: 'cargo-flamegraph', desc: '生成火焰图，分析性能瓶颈。cargo flamegraph。基于 perf（Linux）或 dtrace（macOS）。' },
            { term: 'criterion', desc: 'Rust 基准测试库，比内置 #[bench] 更强大，统计分析、自动比较、生成报告。criterion.rs。' },
            { term: 'perf / Instruments', desc: 'Linux 用 perf（内核级性能分析），macOS 用 Instruments（Xcode 自带，CPU/内存/磁盘/网络）。' }
          ]},
          { t: 'code', lang: 'shell', title: 'rust-gdb 调试常用命令', run: false,
            code: [
              'rust-gdb ./target/debug/myapp    # 启动调试',
              '(gdb) break main                    # 在 main 函数打断点',
              '(gdb) break src/main.rs:42          # 在第 42 行打断点',
              '(gdb) run                            # 运行',
              '(gdb) next                           # 下一步（不进入函数）',
              '(gdb) step                           # 步入函数',
              '(gdb) print variable                 # 打印变量',
              '(gdb) info locals                    # 查看局部变量',
              '(gdb) backtrace                      # 查看调用栈',
              '(gdb) continue                       # 继续运行',
              '(gdb) quit                           # 退出'
            ]},
          { t: 'h2', x: '静态分析与代码质量' },
          { t: 'defs', x: [
            { term: 'clippy', desc: 'Rust 官方静态分析工具，700+ lint 规则，检测常见错误、性能问题、风格问题、未使用代码。cargo clippy。Rust 开发必备，CI 必跑。#![warn(clippy::all)] 开启。' },
            { term: 'rustfmt', desc: 'Rust 官方格式化工具，统一代码风格。cargo fmt。Rust 社区强制使用 rustfmt，无需讨论风格。rustfmt.toml 可配置。' },
            { term: 'cargo audit', desc: '安全审计工具，检查依赖中的已知漏洞（RustSec 数据库）。cargo audit。CI 中可加 cargo audit --deny warnings。' },
            { term: 'cargo outdated', desc: '检查依赖是否有新版本。cargo outdated。帮助保持依赖最新。' },
            { term: 'cargo tree', desc: '显示依赖树，查看依赖关系和版本冲突。cargo tree -d 显示重复依赖。' },
            { term: 'cargo geiger', desc: '检测 unsafe 代码使用量，cargo geiger。帮助评估项目的 unsafe 风险。' },
            { term: 'miri', desc: 'Rust 解释器，检测未定义行为（UB），包括内存错误、数据竞争、未初始化内存。cargo +nightly miri test。需要 nightly。' },
            { term: 'tarpaulin', desc: 'Rust 代码覆盖率工具，cargo tarpaulin --out Html。比 llvm-cov 更简单。' }
          ]},
          { t: 'code', lang: 'rust', title: 'clippy 配置示例', run: false,
            code: [
              '// 在 lib.rs / main.rs 顶部',
              '#![warn(clippy::all)]           // 开启所有 clippy 警告',
              '#![warn(clippy::pedantic)]      // 开启更严格的检查',
              '#![warn(clippy::nursery)]       // 开启新加入的检查',
              '#![allow(clippy::too_many_arguments)]  // 允许特定规则',
              '',
              'fn main() {',
              '    // clippy 会警告：needless_return',
              '    // 应改为 let x = 42;',
              '    let x = return 42;',
              '    ',
              '    // clippy 会警告：needless_collect',
              '    // 应直接迭代迭代器',
              '    let v: Vec<i32> = (1..10).collect();',
              '    let sum: i32 = v.iter().sum();',
              '}'
            ]},
          { t: 'h2', x: '测试框架' },
          { t: 'defs', x: [
            { term: 'cargo test', desc: 'Rust 内置测试框架，#[test] 标记测试函数，assert!/assert_eq!/assert_ne! 断言。cargo test 运行所有测试，cargo test name 运行特定测试。' },
            { term: 'proptest', desc: '属性测试（property-based testing）框架，类似 Haskell QuickCheck。自动生成随机输入，验证属性是否成立。proptest! { #[test] fn test(a in any::<i32>()) { ... } }。' },
            { term: 'quickcheck', desc: '另一个属性测试框架，更老更简单。' },
            { term: 'mockall', desc: 'Rust mock 框架，自动生成 mock 结构体。#[automock] 标记 trait。类似 GoMock。' },
            { term: 'tokio-test', desc: 'Tokio 异步测试宏，#[tokio::test] 标记异步测试。' },
            { term: 'cargo nextest', desc: '下一代 Rust 测试运行器，比 cargo test 更快，支持并行、重试、过滤、Junit 输出。nextest.rs。' }
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            '安装：rustup（版本管理）+ rustc（编译器）+ cargo（构建/包管理），stable/beta/nightly 三通道',
            '构建：Cargo.toml 配置依赖和 profile，cargo build/run/test/check/doc/publish，Cargo.lock 锁定版本',
            'IDE：VS Code + rust-analyzer（免费/快）、RustRover（专业首选）、CLion + Rust 插件、Vim + rust-analyzer',
            '调试：rust-gdb/rust-lldb（Rust 美化）、gdb/lldb、VS Code + CodeLLDB、cargo-flamegraph（火焰图）、criterion（基准测试）',
            '静态分析：clippy（700+ lint，必备）、rustfmt（格式化）、cargo audit（安全审计）、miri（未定义行为检测，nightly）',
            '测试：cargo test（内置）、proptest（属性测试）、mockall（mock）、cargo nextest（更快的测试运行器）'
          ]}
        ]
      },

      /* ==================================================== 9 集合类型 */
      {
        id: 'collections',
        title: '集合类型',
        sub: 'Vec、String、HashMap——Rust 的核心容器',
        blocks: [
          { t: 'h2', x: 'Vec<T>：可增长数组' },
          { t: 'p', x: '`Vec<T>`（向量）是内存连续、可动态增长、存在堆上的数组。用 `vec![]` 宏快速创建，用 `push` 追加。访问用下标 `v[i]`（越界会 panic）或 `.get(i)` 返回 `Option`（安全）。' },

          { t: 'defs', x: [
            { term: 'Vec<T>', desc: '可增长的堆上数组，Rust 最常用的集合。用 `vec![]` 宏创建、`push` 追加、`len` 取长度。下标访问越界会 panic，`.get(i)` 返回 Option 更安全。离开作用域时自动释放堆内存。' },
            { term: 'String 与 &str', desc: '`String` 是拥有所有权的、可增长的堆字符串；`&str` 是借用的字符串切片（指针加长度），不拥有数据。函数参数只读用 `&str`（String 可自动转换），返回新建字符串用 String。' },
            { term: 'HashMap<K,V>', desc: '哈希映射表，位于 `std::collections`。每次运行随机化哈希种子（防攻击），所以遍历顺序不确定。用 `.get(k)` 返回 `Option<&V>`，用 `.entry(k).or_insert(v)` 安全地「不存在则插入」。' },
            { term: '移动 move', desc: 'Rust 中赋值或传参时，对于没有实现 Copy trait 的类型（如 String、Vec），所有权会从原变量转移到新变量，原变量失效不能再用。这是 Rust 内存管理的核心机制，避免了双重释放。' }
          ]},

          { t: 'note', k: 'tip', title: '选对迭代器',
            x: '遍历集合时选对迭代器：`.iter()` 产生 `&T`（只读借用，原集合后续还能用）、`.iter_mut()` 产生 `&mut T`（可修改元素）、`.into_iter()` 产生 T（消耗所有权，原集合不能再用）。新手最常犯的错是用了 `.into_iter()` 后还想继续用原集合，编译器会报「borrow of moved value」。' },

          { t: 'code', lang: 'rust', title: 'Vec 基础', run: true, ed: true,
            code: [
              'fn main() {',
              '    let mut v = vec![1, 2, 3];',
              '    v.push(4);',
              '    println!("v = {:?}", v);',
              '    println!("第二个元素 = {}", v[1]);',
              '    println!("长度 = {}", v.len());',
              '    let sum: i32 = v.iter().sum();',
              '    println!("求和 = {}", sum);',
              '}'
            ],
            expect: 'v = [1, 2, 3, 4]\n第二个元素 = 2\n长度 = 4\n求和 = 10' },

          { t: 'h2', x: '遍历 Vec' },
          { t: 'p', x: '`.iter()` 产生元素的引用；配合 `.enumerate()` 还能同时拿到下标。需要修改元素时用 `.iter_mut()`。' },
          { t: 'code', lang: 'rust', title: '遍历与 enumerate', run: true, ed: true,
            code: [
              'fn main() {',
              '    let v = vec!["a", "b", "c"];',
              '    for (i, item) in v.iter().enumerate() {',
              '        println!("{}: {}", i, item);',
              '    }',
              '}'
            ],
            expect: '0: a\n1: b\n2: c' },

          { t: 'h2', x: 'Vec 的高阶操作' },
          { t: 'p', x: '迭代器是 Rust 的杀手锏之一：`.map`、`.filter`、`.collect` 等组合子让集合处理既声明式又零成本（编译后和内手写循环一样快）。' },
          { t: 'code', lang: 'rust', title: 'map 与 filter', run: true, ed: true,
            code: [
              'fn main() {',
              '    let v = vec![1, 2, 3, 4, 5];',
              '    let squares: Vec<i32> = v.iter().map(|x| x * x).collect();',
              '    println!("{:?}", squares);',
              '    let evens: Vec<&i32> = v.iter().filter(|x| *x % 2 == 0).collect();',
              '    println!("{:?}", evens);',
              '}'
            ],
            expect: '[1, 4, 9, 16, 25]\n[2, 4]' },

          { t: 'h2', x: 'String：可增长的文本' },
          { t: 'p', x: '`String` 是可修改、拥有堆内存的字符串；`&str` 常是借来的只读视图。`push_str` 追加、`format!` 拼接、`to_string`/`String::from` 把 `&str` 转成拥有的 `String`。' },
          { t: 'code', lang: 'rust', title: 'String 操作', run: true, ed: true,
            code: [
              'fn main() {',
              '    let mut s = String::new();',
              '    s.push_str("Hello");',
              '    s.push(\'!\');',
              '    println!("{}", s);',
              '',
              '    let s2 = String::from("Rust");',
              '    let combined = format!("{} {}", s, s2);',
              '    println!("{}", combined);',
              '',
              '    let slice: &str = "abc";',
              '    let owned: String = slice.to_string();',
              '    println!("{}", owned);',
              '}'
            ],
            expect: 'Hello!\nHello! Rust\nabc' },

          { t: 'note', k: 'info', title: '&str 与 String 怎么选',
            x: '函数参数若只「读」字符串，优先用 `&str`（它能同时接受 `String` 和字面量，更通用）；需要「拥有并修改」时用 `String`。这条经验能省掉大量无谓的 `.to_string()`。' },

          { t: 'h2', x: 'HashMap<K, V>：键值表' },
          { t: 'p', x: '`HashMap` 来自 `std::collections`，存键值对。需要 `use` 引入。`.get` 返回 `Option<&V>`（键不存在就是 `None`）——又是 Rust「没有值就用 Option 显式表达」的体现。下面是「统计词频」的经典用法。' },
          { t: 'note', k: 'warn', title: 'HashMap 的遍历顺序不确定',
            x: '出于安全（防止哈希洪水攻击），Rust 的 `HashMap` 每次运行会随机化哈希种子，所以**迭代顺序不固定**。千万不要依赖 `println!("{:?}", map)` 的输出顺序来写 expect——要查确定结果就用 `.get(键)`。' },
          { t: 'code', lang: 'rust', title: 'HashMap 查询', run: true, ed: true,
            code: [
              'use std::collections::HashMap;',
              '',
              'fn main() {',
              '    let mut scores = HashMap::new();',
              '    scores.insert("Alice", 90);',
              '    scores.insert("Bob", 75);',
              '    println!("Alice 的分数: {:?}", scores.get("Alice"));',
              '    println!("Bob 的分数: {:?}", scores.get("Bob"));',
              '    println!("Carol 的分数: {:?}", scores.get("Carol")); // 不存在 -> None',
              '',
              '    let mut count = HashMap::new();',
              '    for w in ["rust", "is", "fast", "rust", "is", "safe"] {',
              '        *count.entry(w).or_insert(0) += 1;',
              '    }',
              '    println!("rust 出现: {} 次", count.get("rust").copied().unwrap_or(0));',
              '    println!("safe 出现: {} 次", count.get("safe").copied().unwrap_or(0));',
              '}'
            ],
            expect: 'Alice 的分数: Some(90)\nBob 的分数: Some(75)\nCarol 的分数: None\nrust 出现: 2 次\nsafe 出现: 1 次' },

          { t: 'kp', x: [
            'Vec<T> 是堆上可变数组，vec![] 创建，push 追加',
            '下标越界会 panic，用 get 返回 Option 更安全',
            '迭代器 map/filter/collect 既优雅又零成本',
            'String 拥有堆文本，&str 多为只读借用',
            'HashMap 顺序不确定，查值请用 get 拿 Option'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '创建一个空 `Vec`，push 三个数，再用迭代器 `sum()` 求和并打印。', lang: 'rust',
            code: [
              'fn main() {',
              '    let mut v = Vec::new();',
              '    v.push(10);',
              '    v.push(20);',
              '    v.push(30);',
              '    let sum: i32 = v.iter().sum();',
              '    println!("v = {:?}", v);',
              '    println!("sum = {}", sum);',
              '}'
            ],
            expect: 'v = [10, 20, 30]\nsum = 60',
            ans: 'Vec 要 `mut` 才能 push。`.iter().sum()` 是迭代器组合子，编译器优化后和手写循环一样快。10+20+30=60。' },
          { t: 'ex', q: '建一个 `HashMap` 存入两个分数，用 `get` 查询存在与不存在的键，观察返回的 Option。', lang: 'rust',
            code: [
              'use std::collections::HashMap;',
              '',
              'fn main() {',
              '    let mut m = HashMap::new();',
              '    m.insert("apple", 3);',
              '    m.insert("banana", 5);',
              '    println!("apple = {:?}", m.get("apple"));',
              '    println!("orange = {:?}", m.get("orange"));',
              '}'
            ],
            expect: 'apple = Some(3)\norange = None',
            ans: '`get` 返回 `Option<&V>`：键存在是 `Some(值)`，不存在是 `None`——绝不会给你一个空指针。这正是 Rust 用类型表达「可能没有」的方式。' },
          { t: 'think', q: '为什么遍历 HashMap 时不能依赖它打印的顺序？',
            ans: '出于安全考虑，Rust 每次运行会随机化哈希种子，防止哈希洪水攻击。所以键的迭代顺序每次都不同。要拿到确定结果，用 `.get(键)` 精确查询，而不是遍历后假设顺序。' },
          { t: 'think', q: '`Vec<T>` 的 `.get(i)` 和 `[i]` 下标访问有什么区别？为什么推荐前者？',
            ans: '`[i]` 下标访问在越界时会直接 panic（`index out of bounds`），而 `.get(i)` 返回 `Option<&T>`：越界时返回 `None`，不 panic。推荐 `.get()` 是因为它把「可能越界」写进了类型系统，调用方必须用 `match` 或 `if let` 处理 `None` 的情况，不会因为一个越界就让整个程序崩溃。只有你**确定**下标不会越界时（比如刚检查过 `i < vec.len()`），才用 `[i]` 图方便。这和 Rust「用类型表达可能性、避免运行时崩溃」的哲学一致。' }
        ]
      },

      /* ==================================================== 9 结构体与枚举 */
      {
        id: 'oop',
        title: '结构体与枚举',
        sub: 'struct + impl、方法、trait（接口）、enum + match',
        blocks: [
          { t: 'h2', x: 'struct：自定义数据类型' },
          { t: 'p', x: '`struct` 把多个字段组合成一个有意义的整体。用 `impl` 块给它挂上方法——第一个参数 `&self` 表示「这个方法作用在实例上」（类似其他语言的 `this`）。Rust 不叫「类」，但 struct + impl 就能表达对象的行为。' },
          { t: 'code', lang: 'rust', title: 'struct 与方法', run: true, ed: true,
            code: [
              'struct User {',
              '    name: String,',
              '    age: u32,',
              '}',
              '',
              'impl User {',
              '    fn new(name: &str, age: u32) -> User {',
              '        User { name: name.to_string(), age }',
              '    }',
              '    fn greet(&self) -> String {',
              '        format!("我是 {}，{} 岁", self.name, self.age)',
              '    }',
              '}',
              '',
              'fn main() {',
              '    let u = User::new("Alice", 25);',
              '    println!("{}", u.greet());',
              '    println!("name = {}, age = {}", u.name, u.age);',
              '}'
            ],
            expect: '我是 Alice，25 岁\nname = Alice, age = 25' },

          { t: 'note', k: 'info', title: '字段初始化简写',
            x: '当参数名和字段名相同时，可写成 `User { name, age }` 而非 `User { name: name, age: age }`。另外 `..p` 能把另一个实例的其余字段「搬」过来（结构体更新语法），少写重复代码。' },

          { t: 'h2', x: 'tuple struct 与更新语法' },
          { t: 'p', x: '除了具名字段，struct 也可以是「带名字的元组」（字段只编号）。给 struct 加 `#[derive(Debug)]` 后就能用 `{:?}` 打印，调试极方便。' },
          { t: 'code', lang: 'rust', title: 'Debug 打印与更新语法', run: true, ed: true,
            code: [
              '#[derive(Debug)]',
              'struct Point {',
              '    x: i32,',
              '    y: i32,',
              '}',
              '',
              'fn main() {',
              '    let p = Point { x: 3, y: 4 };',
              '    println!("点到原点距离平方 = {}", p.x * p.x + p.y * p.y);',
              '',
              '    let q = Point { x: 10, ..p }; // 复用 p 的 y',
              '    println!("q = {:?}", q);',
              '}'
            ],
            expect: '点到原点距离平方 = 25\nq = Point { x: 10, y: 4 }' },

          { t: 'h2', x: 'trait：接口 / 能力' },
          { t: 'p', x: '`trait` 类似其他语言的「接口」：定义一组方法签名，任何类型都可以 `impl` 它来获得这套能力。trait 还能带**默认实现**，子类不重写就用默认的。Rust 靠 trait 实现多态——而且是编译期确定、零运行时开销的静态分发。' },
          { t: 'code', lang: 'rust', title: 'trait 与实现', run: true, ed: true,
            code: [
              'trait Animal {',
              '    fn sound(&self) -> String;',
              '    fn speak(&self) {',
              '        println!("{}", self.sound());',
              '    }',
              '}',
              '',
              'struct Dog;',
              'struct Cat;',
              '',
              'impl Animal for Dog {',
              '    fn sound(&self) -> String { "汪汪".to_string() }',
              '}',
              'impl Animal for Cat {',
              '    fn sound(&self) -> String { "喵喵".to_string() }',
              '}',
              '',
              'fn main() {',
              '    let dog = Dog;',
              '    let cat = Cat;',
              '    dog.speak();',
              '    cat.speak();',
              '}'
            ],
            expect: '汪汪\n喵喵' },

          { t: 'h2', x: 'enum：带数据的枚举（代数数据类型）' },
          { t: 'p', x: 'Rust 的 `enum` 比 C 的枚举强大得多：每个变体可以**携带数据**，甚至不同变体带不同类型的数据。这叫「代数数据类型」，能精准表达「要么这样、要么那样、且各带各自的信息」。配合 `match` 解构，是表达状态机的利器。' },
          { t: 'code', lang: 'rust', title: 'enum 基础', run: true, ed: true,
            code: [
              '#[derive(Debug)]',
              'enum Direction {',
              '    North,',
              '    South,',
              '    East,',
              '    West,',
              '}',
              '',
              'fn main() {',
              '    let d = Direction::North;',
              '    let msg = match d {',
              '        Direction::North => "向北",',
              '        Direction::South => "向南",',
              '        Direction::East => "向东",',
              '        Direction::West => "向西",',
              '    };',
              '    println!("方向：{}", msg);',
              '    let v = Direction::East;',
              '    println!("{:?}", v);',
              '}'
            ],
            expect: '方向：向北\nEast' },

          { t: 'h2', x: 'enum 携带不同数据' },
          { t: 'p', x: '下面这个 `Message` 枚举演示了「每个变体形态各异」：有的不带数据，有的带具名字段，有的带元组，有的带多个值。处理时用一个 `match` 就能把数据完整解构出来。' },
          { t: 'code', lang: 'rust', title: '带数据的枚举', run: true, ed: true,
            code: [
              '#[derive(Debug)]',
              'enum Message {',
              '    Quit,',
              '    Move { x: i32, y: i32 },',
              '    Write(String),',
              '    ChangeColor(u8, u8, u8),',
              '}',
              '',
              'fn main() {',
              '    let messages = [',
              '        Message::Quit,',
              '        Message::Move { x: 1, y: 2 },',
              '        Message::Write(String::from("hi")),',
              '        Message::ChangeColor(255, 0, 0),',
              '    ];',
              '    for m in &messages {',
              '        handle(m);',
              '    }',
              '}',
              '',
              'fn handle(m: &Message) {',
              '    match m {',
              '        Message::Quit => println!("退出"),',
              '        Message::Move { x, y } => println!("移动到 ({}, {})", x, y),',
              '        Message::Write(text) => println!("文本: {}", text),',
              '        Message::ChangeColor(r, g, b) => println!("颜色 #{}", r + g + b),',
              '    }',
              '}'
            ],
            expect: '退出\n移动到 (1, 2)\n文本: hi\n颜色 #255' },

          { t: 'h2', x: '可变方法：&mut self' },
          { t: 'p', x: '方法第一个参数写成 `&mut self`，就能在调用时修改自身状态。下面用一个小计数器演示。' },
          { t: 'code', lang: 'rust', title: '&mut self 方法', run: true, ed: true,
            code: [
              '#[derive(Debug)]',
              'struct Counter {',
              '    value: u32,',
              '}',
              'impl Counter {',
              '    fn new() -> Counter { Counter { value: 0 } }',
              '    fn inc(&mut self) { self.value += 1; }',
              '}',
              'fn main() {',
              '    let mut c = Counter::new();',
              '    c.inc();',
              '    c.inc();',
              '    println!("计数 = {}", c.value);',
              '}'
            ],
            expect: '计数 = 2' },

          { t: 'note', k: 'tip', title: 'Rust 不是传统 OOP',
            x: 'Rust 没有「类继承」。它用 trait 做能力复用、用组合（struct 里嵌 struct）做代码复用。官方观点是：继承常常带来脆弱的耦合，而 trait + 组合更灵活、更易推理。所以你会在 Rust 里少看到「父类子类」，多看到「实现某个 trait」。' },

          { t: 'kp', x: [
            'struct 聚合字段，impl 块挂方法，&self 即实例',
            'trait 相当于接口，支持默认实现，实现多态',
            'enum 变体可携带各异的数据，配合 match 解构',
            '&mut self 方法能修改自身状态',
            'Rust 用 trait + 组合替代类继承'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '定义 `Rect` 结构体（w、h），用 impl 块给它一个 `area(&self)` 方法算面积并打印。', lang: 'rust',
            code: [
              'struct Rect {',
              '    w: i32,',
              '    h: i32,',
              '}',
              '',
              'impl Rect {',
              '    fn area(&self) -> i32 {',
              '        self.w * self.h',
              '    }',
              '}',
              '',
              'fn main() {',
              '    let r = Rect { w: 3, h: 4 };',
              '    println!("面积 = {}", r.area());',
              '}'
            ],
            expect: '面积 = 12',
            ans: '`impl Rect` 块挂方法，`&self` 就是实例本身（类似 this）。3×4=12。结构体负责数据、impl 负责行为，这就是 Rust 版的「对象」。' },
          { t: 'ex', q: '定义一个只有两个变体的枚举 `Traffic`（Red/Green），用 `match` 把 Red 映射成「停下」并打印。', lang: 'rust',
            code: [
              'enum Traffic {',
              '    Red,',
              '    Green,',
              '}',
              '',
              'fn main() {',
              '    let light = Traffic::Red;',
              '    let action = match light {',
              '        Traffic::Red => "停下",',
              '        Traffic::Green => "通行",',
              '    };',
              '    println!("现在: {}", action);',
              '}'
            ],
            expect: '现在: 停下',
            ans: 'enum 的每个变体用 `::` 命名空间访问。match 必须覆盖全部变体，这里 Red 和 Green 都写了，所以不用 `_` 兜底。Red 匹配到「停下」。' },
          { t: 'think', q: 'Rust 的 trait 和 Go 的 interface，思想上有什么异同？',
            ans: '相同点：都定义一组方法签名，由具体类型去实现，实现多态，都不需要「继承」。不同点：Go 的接口是隐式实现，类型只要有方法就自动满足；Rust 要显式写 `impl Trait for Type`，但 trait 可以带默认实现、还能当函数约束（trait bound）。' },
          { t: 'think', q: 'Rust 没有继承，那「代码复用」靠什么实现？trait 的默认方法起什么作用？',
            ans: 'Rust 靠**组合**（struct 里嵌套其他 struct）和 **trait 默认方法**实现复用，而不是继承。trait 可以提供默认方法实现：实现了这个 trait 的类型自动获得默认方法，也可以选择覆盖它。比如 `Iterator` trait 只要求你实现 `next()`，但它提供了上百个默认方法（`map`、`filter`、`fold`、`collect` 等），你实现一个 `next` 就全有了。这种「最小接口加大量默认方法」的设计比继承更灵活：类型可以同时实现多个 trait，不会被单一父类绑死，也不会有脆弱的基类问题。' }
        ]
      },

      /* ==================================================== 10 错误处理 */
      {
        id: 'errors',
        title: '错误处理',
        sub: 'Result / Option 枚举、? 运算符、panic! 与自定义错误',
        blocks: [
          { t: 'h2', x: 'Rust 的两条路：可恢复与不可恢复' },
          { t: 'p', x: 'Rust 没有 Java 那种 `try/catch` 异常机制（异常会带来隐式控制流，难推理）。取而代之：可预期的失败用返回值 `Result<T, E>` 或 `Option<T>` 显式表达；真正「不该发生」的 bug 才用 `panic!` 直接终止。把「可能失败」写进类型签名，调用方**被迫**处理，没人能假装错误不存在。' },

          { t: 'defs', x: [
            { term: 'Result<T, E>', desc: '可恢复错误的核心枚举，有两个变体：`Ok(T)` 表示成功并携带结果值，`Err(E)` 表示失败并携带错误信息。函数返回 Result 时，调用方必须用 match、if let 或 ? 处理两种情况，编译器盯着你不会漏。' },
            { term: 'Option<T>', desc: '表示「可能有值也可能没有」的枚举，`Some(T)` 有值，`None` 没有。替代了其他语言里的 null/空指针。从 Option 取值必须 match 或用 unwrap/unwrap_or，悬空引用从源头被杜绝。' },
            { term: '? 运算符', desc: '用在返回 Result 或 Option 的函数里。如果是 Err/None 就立即返回，如果是 Ok/Some 就取出里面的值继续执行。相当于「出错就提前返回，没错就往下走」的简写，让错误处理代码简洁不啰嗦。' },
            { term: 'unwrap / expect', desc: '从 Option/Result 里取值的便捷方法。值是 Some/Ok 时返回里面的值，是 None/Err 时直接 panic。`expect("msg")` 可以自定义 panic 消息。只适合原型开发或你确定不可能失败的场景，生产代码应优先用 match 或 ?。' },
            { term: 'panic!', desc: '不可恢复错误的宏，直接终止当前线程、打印堆栈信息。设置 `RUST_BACKTRACE=1` 可看到完整调用栈。只用于「程序真的没法继续了」的 bug，普通可预期错误用 Result 返回。' }
          ]},

          { t: 'note', k: 'warn', title: '不要在生产代码里到处 unwrap()',
            x: '每个 `unwrap()` 都是一颗定时炸弹——一旦值是 None 或 Err，线程直接 panic，服务可能因此挂掉。正确做法是：能确定不失败的地方用 `expect("明确说明为什么不可能失败")` 留个文档，其余地方用 `?` 把错误传出去，在最外层（如 main 或请求入口）统一 match 处理。' },

          { t: 'h2', x: 'Option<T>：可能有值，也可能没有' },
          { t: 'p', x: '当一个函数「可能返回空」，返回 `Option<T>`（`Some(v)` 或 `None`），而不是像其他语言那样返回 `null`/特殊值。访问前必须 `match` 区分，悬空引用从源头被杜绝。' },
          { t: 'code', lang: 'rust', title: 'Option 基础', run: true, ed: true,
            code: [
              'fn main() {',
              '    let numbers = [10, 20, 30];',
              '    let first = numbers.get(0);',
              '    println!("第一个: {:?}", first); // Some(10)',
              '    let tenth = numbers.get(10);',
              '    println!("第十个: {:?}", tenth); // None',
              '',
              '    match numbers.get(1) {',
              '        Some(v) => println!("值 = {}", v),',
              '        None => println!("越界"),',
              '    }',
              '',
              '    // unwrap_or 提供默认值，安全兜底',
              '    let v = numbers.get(99).copied().unwrap_or(-1);',
              '    println!("安全取值 = {}", v);',
              '}'
            ],
            expect: '第一个: Some(10)\n第十个: None\n值 = 20\n安全取值 = -1' },

          { t: 'h2', x: 'Result<T, E>：成功或失败' },
          { t: 'p', x: '`Result<T, E>` 要么是 `Ok(值)` 要么是 `Err(错误)`。标准库里大量可能失败的操作（解析、读文件、网络）都返回它。下面故意构造一个成功与一个失败来对比。' },
          { t: 'code', lang: 'rust', title: 'Result 基础', run: true, ed: true,
            code: [
              'fn main() {',
              '    let ok: Result<i32, &str> = Ok(42);',
              '    let err: Result<i32, &str> = Err("出错了");',
              '',
              '    match ok {',
              '        Ok(v) => println!("成功: {}", v),',
              '        Err(e) => println!("失败: {}", e),',
              '    }',
              '    match err {',
              '        Ok(v) => println!("成功: {}", v),',
              '        Err(e) => println!("失败: {}", e),',
              '    }',
              '',
              '    // 从字符串解析数字：返回 Result',
              '    let n: i32 = "123".parse().unwrap_or(0);',
              '    println!("解析结果 = {}", n);',
              '}'
            ],
            expect: '成功: 42\n失败: 出错了\n解析结果 = 123' },

          { t: 'h2', x: '? 运算符：早期返回', },
          { t: 'p', x: '如果一个函数返回 `Result`，在其内部调用「可能失败」的函数时，加一个 `?` 就能表达：「成功就取出里面的值继续；失败就立刻把错误返回给调用方」。它把层层嵌套的 `match` 压成一行，是 Rust 错误处理的语法糖。' },
          { t: 'code', lang: 'rust', title: '? 运算符', run: true, ed: true,
            code: [
              'use std::num::ParseIntError;',
              '',
              'fn parse_pair(s: &str) -> Result<i32, ParseIntError> {',
              '    let v: i32 = s.parse()?; // 解析失败就提前返回 Err',
              '    Ok(v * 2)',
              '}',
              '',
              'fn main() {',
              '    match parse_pair("21") {',
              '        Ok(v) => println!("翻倍 = {}", v),',
              '        Err(e) => println!("错误: {}", e),',
              '    }',
              '    match parse_pair("abc") {',
              '        Ok(v) => println!("翻倍 = {}", v),',
              '        Err(e) => println!("错误: {}", e),',
              '    }',
              '}'
            ],
            expect: '翻倍 = 42\n错误: invalid digit found in string' },

          { t: 'h2', x: '自定义错误类型' },
          { t: 'p', x: '真实项目里你会定义自己的错误枚举，让它实现 `Display`（决定怎么打印）。借助 `?`，不同来源的错误能被统一成一种返回类型，向上传播。下面用「开方」演示：负数无实根，返回自定义错误。' },
          { t: 'code', lang: 'rust', title: '自定义错误', run: true, ed: true,
            code: [
              'use std::fmt;',
              '',
              '#[derive(Debug)]',
              'enum MathError {',
              '    DivByZero,',
              '    Negative,',
              '}',
              '',
              'impl fmt::Display for MathError {',
              '    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {',
              '        match self {',
              '            MathError::DivByZero => write!(f, "除以零"),',
              '            MathError::Negative => write!(f, "负数"),',
              '        }',
              '    }',
              '}',
              '',
              'fn sqrt(n: f64) -> Result<f64, MathError> {',
              '    if n < 0.0 { return Err(MathError::Negative); }',
              '    Ok(n.sqrt())',
              '}',
              '',
              'fn main() {',
              '    match sqrt(9.0) {',
              '        Ok(v) => println!("sqrt(9) = {}", v),',
              '        Err(e) => println!("错误: {}", e),',
              '    }',
              '    match sqrt(-1.0) {',
              '        Ok(v) => println!("sqrt(-1) = {}", v),',
              '        Err(e) => println!("错误: {}", e),',
              '    }',
              '}'
            ],
            expect: 'sqrt(9) = 3\n错误: 负数' },

          { t: 'h2', x: 'panic!：不可恢复的崩溃' },
          { t: 'p', x: '`panic!` 表示「程序遇到了绝不该发生、无法继续的状态」，它会打印错误信息、展开栈并终止进程。常见的触发点：`unwrap()`/`expect()` 在 `None`/`Err` 上调用、数组越界（调试模式）、整数溢出（调试模式）。Rust 鼓励你用 `match`/ `?` 优雅处理可预期失败，只在「契约被违反」时才 panic。' },
          { t: 'note', k: 'danger', title: '用 get 代替下标，避免无谓 panic',
            x: '`v[5]` 越界会直接 panic 并终止程序；而 `v.get(5)` 返回 `Option`，你可以用 `match` 安全处理「没有」的情况，程序继续跑。能用可恢复方式表达，就别用会崩溃的下标。' },
          { t: 'code', lang: 'rust', title: '安全处理「没有」', run: true, ed: true,
            code: [
              'fn main() {',
              '    // 下面这行若取消注释会 panic（运行时崩溃）：',
              '    // let v: Vec<i32> = Vec::new();',
              '    // println!("{}", v[5]); // index out of bounds',
              '',
              '    // 推荐做法：用 get 返回 Option，不会 panic',
              '    let v = vec![1, 2, 3];',
              '    match v.get(5) {',
              '        Some(x) => println!("{}", x),',
              '        None => println!("越界访问被安全拦截，没有崩溃"),',
              '    }',
              '}'
            ],
            expect: '越界访问被安全拦截，没有崩溃' },

          { t: 'h2', x: 'Option 与 Result 互转' },
          { t: 'p', x: '两个枚举之间能互相转换：`ok_or` 把 `Option` 变成 `Result`（补一个错误信息），`unwrap_err` 取出错误。掌握这些组合子，错误处理才会顺手。' },
          { t: 'code', lang: 'rust', title: '互转', run: true, ed: true,
            code: [
              'fn main() {',
              '    let maybe = Some(10);',
              '    let res: Result<i32, &str> = maybe.ok_or("没有值");',
              '    match res {',
              '        Ok(v) => println!("有 {}", v),',
              '        Err(e) => println!("{}", e),',
              '    }',
              '    let none: Option<i32> = None;',
              '    let res2 = none.ok_or("空的");',
              '    println!("{}", res2.unwrap_err());',
              '}'
            ],
            expect: '有 10\n空的' },

          { t: 'kp', x: [
            '可预期失败用 Result/Option 表达，强迫调用方处理',
            '? 运算符：成功取值、失败早返回，等价于压缩的 match',
            'panic! 用于不可恢复的错误，会终止程序',
            '优先 v.get(i) 而非 v[i]，避免越界 panic',
            '自定义错误实现 Display，用 ? 向上传播'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 `get` 安全地访问 Vec，分别取存在的下标 1 和越界的下标 10，用 match 处理。', lang: 'rust',
            code: [
              'fn main() {',
              '    let nums = vec![10, 20, 30];',
              '    match nums.get(1) {',
              '        Some(v) => println!("第二个 = {}", v),',
              '        None => println!("没有"),',
              '    }',
              '    match nums.get(10) {',
              '        Some(v) => println!("第十一个 = {}", v),',
              '        None => println!("越界，安全"),',
              '    }',
              '}'
            ],
            expect: '第二个 = 20\n越界，安全',
            hint: '下标越界要用 get 而非 []。',
            ans: '`get(1)` 返回 Some(20)，`get(10)` 越界返回 None。用 `[]` 越界会直接 panic，而 `get` 返回 Option 让你安全处理「没有」，程序继续跑。' },
          { t: 'ex', q: '写一个 `half` 函数：解析字符串成整数后求一半，奇数或解析失败都返回 Result，用 `{:?}` 打印两种结果。', lang: 'rust',
            code: [
              'fn half(s: &str) -> Result<i32, String> {',
              '    let n: i32 = s.parse().map_err(|_| "解析失败".to_string())?;',
              '    if n % 2 != 0 {',
              '        return Err("不是偶数".to_string());',
              '    }',
              '    Ok(n / 2)',
              '}',
              '',
              'fn main() {',
              '    println!("{:?}", half("8"));',
              '    println!("{:?}", half("7"));',
              '}'
            ],
            expect: 'Ok(4)\nErr("不是偶数")',
            hint: '? 会在失败时提前把错误返回。',
            ans: 'half("8")：解析成功、8 是偶数，返回 Ok(4)。half("7")：解析成功但 7 是奇数，返回 Err("不是偶数")。`?` 把解析错误也统一成了 String 类型向上传播。' },
          { t: 'think', q: '`Result<T, E>` 相比 C 里「返回特殊错误码」好在哪里？',
            ans: '错误码只是个 int，调用方很容易忘记检查；而 Result 是枚举，你必须用 match 或 `?` 把 Ok 和 Err 两种情况都处理了才能拿到里面的值，编译器盯着你。「成功」和「失败」被写进了类型，没人能假装错误不存在。' },
          { t: 'think', q: '`?` 运算符只能用在返回 `Result` 或 `Option` 的函数里。如果在 `main` 函数里想用 `?` 怎么办？',
            ans: '标准做法是把 `main` 的返回类型改成 `Result<(), Box<dyn std::error::Error>>`（或更具体的错误类型）。Rust 允许 `main` 返回 `Result`：如果返回 `Ok(())` 程序正常退出，如果返回 `Err(e)` 程序会把错误打印到 stderr 并以非零状态码退出。这样你就能在 main 里畅快用 `?` 了。另一种办法是把可能出错的逻辑抽进一个返回 `Result` 的辅助函数，在 main 里调用后用 `match` 或 `.expect()` 处理结果。新手常见的坑是在返回 `()` 的 main 里写 `?`，编译器会报错「`?` 操作符只能用于返回 Result 或 Option 的函数」。' }
        ]
      },

      /* ==================================================== 11 所有权与借用（灵魂） */
      {
        id: 'modern',
        title: '所有权与借用',
        sub: 'Rust 的灵魂：ownership / borrow / lifetime / 引用 / 可变性',
        blocks: [
          { t: 'h2', x: '为什么需要所有权' },
          { t: 'p', x: '其他语言靠垃圾回收器（GC）定时扫描、回收不再用的内存，或者靠手动 `free`/`delete`。GC 有运行时开销与停顿，手动管理则容易「忘了释放」或「释放了还在用」。Rust 选了第三条路：**所有权规则在编译期就把内存的生灭安排得明明白白**，运行时既不扫堆也不停顿。' },

          { t: 'h2', x: '所有权三定律' },
          { t: 'ol', x: [
            'Rust 中每个值都有一个**所有者**（owner，通常是某个变量）。',
            '同一时刻，**有且只有一个**所有者。',
            '当所有者离开作用域，这个值就被自动释放（调用 `drop`）。'
          ]},
          { t: 'note', k: 'info', title: '栈上 vs 堆上',
            x: '像 `i32`、`bool` 这种编译期已知大小的值放在栈上，离开作用域直接弹出，无需特殊管理；`String`、vector 这类大小可变的值放在堆上，离开作用域时 Rust 自动调用 `drop` 释放堆内存——你一行 `free` 都不用写，也不会漏写。' },

          { t: 'h2', x: '移动：所有权移交' },
          { t: 'p', x: '把 `String` 赋给另一个变量，或传给函数，所有权就**移动**过去。原变量失效——这样就保证「同一块堆内存只有一个主人」，释放时不会冲突。而 `i32` 这类 `Copy` 类型是复制，双方都有效。' },
          { t: 'code', lang: 'rust', title: '移动与复制', run: true, ed: true,
            code: [
              'fn main() {',
              '    let s1 = String::from("所有权");',
              '    let s2 = s1; // 移动：s1 不再有效',
              '    println!("s2 = {}", s2);',
              '',
              '    let x = 5;',
              '    let y = x; // 拷贝：i32 实现了 Copy',
              '    println!("x = {}, y = {}", x, y);',
              '}'
            ],
            expect: 's2 = 所有权\nx = 5, y = 5' },

          { t: 'h2', x: '借用：用而不占' },
          { t: 'p', x: '**借用**就是传引用 `&T`：你不拿走所有权，只是「借来用一下」，用完归还，原主人依旧是原来的变量。比喻：你借朋友的书看，书还是朋友的；你看完归还，朋友还能继续用。' },
          { t: 'code', lang: 'rust', title: '借用规则', run: true, ed: true,
            code: [
              'fn main() {',
              '    let mut s = String::from("书");',
              '    let r1 = &s;       // 不可变借用',
              '    let r2 = &s;       // 多个不可变借用，OK',
              '    println!("{} {}", r1, r2);',
              '',
              '    let r3 = &mut s;   // 之前的借用已结束，可变借用 OK',
              '    r3.push_str("与笔");',
              '    println!("{}", r3);',
              '}'
            ],
            expect: '书 书\n书与笔' },

          { t: 'note', k: 'tip', title: '借用检查的核心口诀',
            x: '**要么多个「只读借书人」同时存在，要么只有一个「可写借书人」，二者不可兼得。** 这条规则在编译期就杜绝了「一边读一边被改」导致的数据竞争。Rust 把并发里最难的坑，在连代码都没运行时就堵死了。' },

          { t: 'h2', x: '生命周期：引用的有效期' },
          { t: 'p', x: '当两个引用流动于函数之间，编译器需要确认「返回的引用不会比它指向的数据活得更久」。生命周期标注（写 \'a\'）就是给编译器看的「借条有效期」：它不改变运行时行为，只帮编译器验证安全性。下面这个返回「较长字符串」的函数，必须告诉编译器两个输入和返回值的引用活得一样长。' },
          { t: 'code', lang: 'rust', title: '显式生命周期', run: true, ed: true,
            code: [
              'fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str {',
              '    if x.len() > y.len() { x } else { y }',
              '}',
              '',
              'fn main() {',
              '    let a = "rust";',
              '    let b = "golang";',
              '    println!("更长的是: {}", longest(a, b));',
              '}'
            ],
            expect: '更长的是: golang' },

          { t: 'note', k: 'info', title: '多数时候不用手写生命周期',
            x: '编译器有「生命周期省略规则」，在明显的情况下自动推断，你 90% 的时间不需要写 \'a\'。只有函数签名里涉及「多个引用、且要返回其中一个」这类模糊场景，才需要显式标注。' },

          { t: 'h2', x: '作用域决定借用何时结束' },
          { t: 'p', x: '借用（引用）自己的有效期也受作用域约束。只要把只读借用限制在块内，块结束后就可以开始可变借用了——这就是「非词法生命周期（NLL）」：编译器按「最后一次使用」而非「花括号」来判断引用何时失效。' },
          { t: 'code', lang: 'rust', title: '借用随作用域结束', run: true, ed: true,
            code: [
              'fn main() {',
              '    let mut data = vec![1, 2, 3];',
              '    {',
              '        let refs: Vec<&i32> = data.iter().collect();',
              '        println!("只读遍历: {:?}", refs);',
              '    } // 不可变借用在这里结束',
              '    data.push(4); // 现在可以可变借用',
              '    println!("修改后: {:?}", data);',
              '}'
            ],
            expect: '只读遍历: [1, 2, 3]\n修改后: [1, 2, 3, 4]' },

          { t: 'h2', x: 'Clone：当确实需要独立副本' },
          { t: 'p', x: '如果你真的需要两份独立数据（比如把值存进两个结构），用 `.clone()` 做**深拷贝**——显式地付出拷贝成本，而不是靠编译器悄悄复制。成本可见，行为可预测，这也是 Rust 的哲学。' },
          { t: 'code', lang: 'rust', title: '显式 clone', run: true, ed: true,
            code: [
              '#[derive(Clone, Debug)]',
              'struct File {',
              '    name: String,',
              '}',
              '',
              'fn main() {',
              '    let f = File { name: "a.txt".to_string() };',
              '    let g = f.clone(); // 深拷贝，各自独立',
              '    println!("f = {:?}, g = {:?}", f, g);',
              '}'
            ],
            expect: 'f = File { name: "a.txt" }, g = File { name: "a.txt" }' },

          { t: 'h2', x: 'Box<T>：把值放进堆里' },
          { t: 'p', x: '`Box<T>` 是最简单的智能指针：在堆上分配一个值，栈上只留一个指针。它离开作用域时自动释放堆内存。递归数据结构、 trait 对象常借助 `Box` 获得已知大小的句柄。所有权规则对 `Box` 同样适用。' },
          { t: 'code', lang: 'rust', title: 'Box 智能指针', run: true, ed: true,
            code: [
              'fn main() {',
              '    let b = Box::new(42);',
              '    println!("Box 里的值是 {}", b);',
              '    // b 离开作用域时，堆上的 42 被自动释放',
              '}'
            ],
            expect: 'Box 里的值是 42' },

          { t: 'note', k: 'tip', title: '一句话记住灵魂三件套',
            x: '**所有权**回答「谁负责释放」；**借用**回答「别人能不能临时用」；**生命周期**回答「借用的引用能活多久」。三者合力，让 Rust 在没有 GC 的前提下，保证你永远不会因为「用了一块已释放的内存」而崩溃。' },

          { t: 'kp', x: [
            '每个值有且只有一个所有者；所有者离开作用域即释放',
            '堆类型赋值/传参会「移动」，原变量失效',
            'Copy 类型（i32 等）传值会复制，不移动',
            '借用 &T 只读、&mut T 可改；两者不能同时存在',
            '生命周期标注只帮编译器验证引用有效性，不改运行时'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '对比「移动」与「复制」：把 String 赋给新变量后用新变量；把 i32 赋给新变量后两边都用。', lang: 'rust',
            code: [
              'fn main() {',
              '    let s1 = String::from("move");',
              '    let s2 = s1;',
              '    println!("s2 = {}", s2);',
              '',
              '    let x1 = 100;',
              '    let x2 = x1;',
              '    println!("x1 = {}, x2 = {}", x1, x2);',
              '}'
            ],
            expect: 's2 = move\nx1 = 100, x2 = 100',
            hint: 'String 会移动，i32 会复制。',
            ans: 'String 在堆上，`s2 = s1` 把所有权移走，s1 失效。i32 实现了 Copy，`x2 = x1` 是复制，x1 和 x2 都还能用。这就是「堆类型移动、栈类型复制」。' },
          { t: 'ex', q: '演示借用规则：先在一个块里开两个只读借用并打印，块结束后再开一个可变借用修改字符串。', lang: 'rust',
            code: [
              'fn main() {',
              '    let mut s = String::from("hello");',
              '    {',
              '        let r1 = &s;',
              '        let r2 = &s;',
              '        println!("{} {}", r1, r2);',
              '    }',
              '    let r3 = &mut s;',
              '    r3.push_str(" world");',
              '    println!("{}", r3);',
              '}'
            ],
            expect: 'hello hello\nhello world',
            ans: '块内 r1、r2 都是只读借用，可以同时存在；块结束后只读借用失效，r3 才能以可变借用出现。这就是「要么多个只读、要么单个可写，二者不同时」的规则。' },
          { t: 'think', q: '为什么 Rust 规定同一时刻不能同时存在 `&T` 和 `&mut T`？',
            ans: '因为这正是数据竞争的根源：一个人在读、另一个人在写，读到的值可能处于中间态。Rust 在编译期强制「要么全是读者、要么唯一的写者」，把「无畏并发」从口号变成编译器保证——多线程下不会出现数据竞争。' },
          { t: 'think', q: '函数签名里的生命周期标注（比如 `&\'a str`）会改变程序运行时的行为吗？',
            ans: '不会。生命周期标注只是写给编译器看的「借条有效期」，用来验证返回的引用不会比它指向的数据活得更久。运行时它什么都不做，也没有任何运行时开销——它纯是编译期的安全检查。' }
        ]
      },

      /* ==================================================== 调试与排错 */
      {
        id: 'debugging',
        title: '调试与排错',
        sub: '把编译器当搭档：看懂报错、插对桩、用对工具',
        blocks: [
          { t: 'p', x: 'Rust 的调试绝大多数发生在**编译期**。编译器的报错信息极其详细：它会告诉你哪个文件哪一行、期望什么类型、实际给了什么类型，甚至还会给出 `help:` 修复建议和 `note:` 补充说明。把编译器当结对编程的搭档，而不是跟你对着干的对手——这是学 Rust 最重要的心态转换。' },
          { t: 'p', x: '运行期 panic 相对少见，因为大部分错误在编译期就被拦住了。真出现 panic 时，设置环境变量 `RUST_BACKTRACE=1` 能看到完整调用栈。Rust 没有异常：可恢复的错误用 `Result<T, E>` 返回，不可恢复才 `panic!`。调试第一步先分清：是编译不过，还是跑起来崩了？前者修类型、借用、生命周期，后者查越界、unwrap、整数溢出。' },

          { t: 'h2', x: '常见的坑' },
          { t: 'table',
            head: ['报错或现象', '原因', '处理办法'],
            rows: [
              ['`error[E0425]: cannot find value y in this scope`', '用了没定义的变量，常见于拼写错误', '检查拼写和作用域，确认是否已用 `let` 绑定'],
              ['`error[E0308]: mismatched types`', '期望类型和实际类型对不上', '看报错里的 `expected` / `found`，修正类型或加 `as` / `into()` 转换'],
              ['`error[E0382]: borrow of moved value: x`', '值已经被移动（move）走了，原变量不能再用', '改用引用 `&x` 传参，或对实现了 `Clone` 的类型调用 `.clone()`'],
              ['`error[E0502]: cannot borrow x as mutable because it is also borrowed as immutable`', '同时存在只读借用和可变借用，违反借用规则', '缩短只读借用的作用域（用块 `{}` 包裹），或先读完再写'],
              ['`thread \'main\' panicked at src/main.rs:3:5: index out of bounds: the len is 3 but the index is 5`', '数组或切片下标越界', '访问前检查 `len()`，或用 `.get(i)` 返回 `Option<&T>` 安全取值'],
              ['`thread \'main\' panicked at \'called Option::unwrap() on a None value\'`', '对 `None` 调用了 `unwrap()`，直接 panic', '用 `match` / `if let` 处理 `None`，或用 `unwrap_or(default)` 给默认值'],
              ['`error[E0277]: trait bound not satisfied`', '类型没有实现要求的 trait（泛型约束不满足）', '为类型实现该 trait，或调整泛型约束，或换一个已实现的类型']
            ]},

          { t: 'h2', x: '调试手段' },
          { t: 'p', x: 'Rust 日常调试最常用的是 `dbg!` 宏插桩和 `assert!` 断言，配合 `cargo check` 做快速类型检查、`cargo clippy` 做额外 lint。需要单步调试时可以用 gdb 或 lldb，思路和其他语言的调试器一样：打断点、单步、看变量。' },

          { t: 'code', lang: 'rust', title: '用 dbg! 宏插桩', run: false, ed: false,
            code: [
              'fn divide(a: i32, b: i32) -> i32 {',
              '    // dbg! 会打印文件名、行号和表达式的值，比 println! 更适合临时调试',
              '    dbg!(&a, &b);',
              '    if b == 0 {',
              '        eprintln!("警告：除数为 0");',
              '        return 0;',
              '    }',
              '    a / b',
              '}',
              '',
              'fn main() {',
              '    let result = divide(10, 0);',
              '    println!("结果: {}", result);',
              '}'
            ],
            note: '`dbg!` 宏输出到 stderr 并自带 `[src/main.rs:3] a = 10, b = 0` 这样的位置信息，调试完直接删掉即可，不会残留到生产代码。' },

          { t: 'code', lang: 'rust', title: 'assert! / assert_eq! 断言', run: false, ed: false,
            code: [
              'fn divide(a: i32, b: i32) -> i32 {',
              '    // assert! 守住前置条件：不满足就 panic 并打印消息',
              '    assert!(b != 0, "除数不能为 0");',
              '    a / b',
              '}',
              '',
              'fn main() {',
              '    // assert_eq! 对比两个值，不等就 panic 并打印左右两边',
              '    assert_eq!(divide(10, 2), 5);',
              '    println!("测试通过");',
              '}',
            ],
            note: '`assert!` 和 `assert_eq!` 在 release 模式也会保留；如果只想在 debug 模式检查，用 `debug_assert!`。断言适合守住「绝不该发生」的条件。' },

          { t: 'code', lang: 'rust', title: 'Result + ? 运算符：把错误传出去而不是 panic', run: false, ed: false,
            code: [
              'use std::fs;',
              '',
              'fn read_config(path: &str) -> Result<String, std::io::Error> {',
              '    // ? 运算符：如果是 Err 就直接返回，是 Ok 就取出里面的值',
              '    let content = fs::read_to_string(path)?;',
              '    Ok(content)',
              '}',
              '',
              'fn main() {',
              '    match read_config("config.toml") {',
              '        Ok(s) => println!("配置内容: {}", s),',
              '        Err(e) => eprintln!("读取配置失败: {}", e),',
              '    }',
              '}'
            ],
            note: '`?` 只能用在返回 `Result` 或 `Option` 的函数里。它是 Rust 错误处理的核心：让错误沿着调用链向上传播，在合适的层级统一处理，而不是每层都 `unwrap`。' },

          { t: 'note', k: 'tip', title: '编译器报错先修第一个',
            x: 'Rust 一次编译可能报出一堆错误，但后面的往往是第一个错误引发的连锁反应。先修最上面的 `error[EXXXX]`，再 `cargo check`，很多后续错误会自己消失。不要一看到满屏报错就慌。' },
          { t: 'note', k: 'warn', title: '不要在生产代码里滥用 unwrap()',
            x: '`unwrap()` 和 `expect()` 在 `None` / `Err` 时直接 panic，适合原型开发和你确定不可能失败的地方。真实业务里用 `match`、`if let` 或 `?` 把错误传出去处理。线上因为一个 `unwrap`  panic 导致服务挂掉，是完全可以避免的低级事故。' },

          { t: 'think', q: '为什么 Rust 编译器的报错比大多数语言都啰嗦？这是缺点吗？',
            ans: '这不是啰嗦，是 Rust 把「为什么错」和「怎么改」都告诉你了。因为所有权、借用、生命周期这些规则是编译期强制执行的，光说「类型不匹配」不够，还得告诉你是哪次 move 导致的、哪个借用还活着、生命周期哪里没对上。新手初期会觉得信息过载，但习惯后你会发现：能编译过的 Rust 代码，运行时出 bug 的概率低很多——编译器替你做了大量静态检查，这正是 Rust 的核心价值。' },
          { t: 'think', q: '你的程序在 debug 模式下 `thread \'main\' panicked at \'attempt to subtract with overflow\'`，但 release 模式却能跑（结果可能不对）。这是怎么回事？该怎么处理？',
            ans: 'Rust 在 debug 编译模式下会做整数溢出检查，溢出就直接 panic；release 模式默认不检查，会做二进制补码回绕（wrap around），所以能跑但结果可能是错的。处理方式分三种：(1) 如果溢出是逻辑 bug，就修正算法，从根上避免；(2) 如果确实需要回绕语义，用 `wrapping_sub` / `wrapping_add` 等方法显式表达，让两种模式行为一致；(3) 如果需要到边界就停（饱和），用 `saturating_sub` / `saturating_add`。千万不要靠 release 模式「不 panic」来掩盖问题。' },

          { t: 'kp', x: [
            '编译期错误是 Rust 的主战场：先修第一个 error，后面的连锁错误会跟着消失',
            '`dbg!` 宏比 `println!` 更适合临时插桩：自带文件名、行号、表达式值',
            '整数溢出在 debug 模式 panic、release 模式回绕——不要靠 release 掩盖问题',
            '`unwrap` / `expect` 只用于原型或确定不失败的场景，生产代码用 `match` 或 `?`',
            '`RUST_BACKTRACE=1` 看完整栈，`cargo clippy` 做额外 lint，`cargo check` 快速类型检查'
          ]}
        ]
      },

      /* ==================================================== 12 第三方库与生态 */
      {
        id: 'libraries',
        title: '第三方库与生态',
        sub: '从 Tokio 到 Actix，掌握 Rust 最有价值的生态',
        blocks: [
          { t: 'h2', x: '异步运行时' },
          { t: 'defs', x: [
            { term: 'Tokio', desc: 'Rust 最流行的异步运行时，多线程调度器、异步 IO、定时器、同步原语。tokio = { version = "1", features = ["full"] }。async fn、tokio::spawn、tokio::time::sleep。Actix/Axum/reqwest 的底层。' },
            { term: 'async-std', desc: '另一个异步运行时，API 类似标准库（async_std::fs、async_std::net）。比 Tokio 更轻量，但生态不如 Tokio 丰富。' },
            { term: 'smol', desc: '极简异步运行时，单文件、体积极小。适合嵌入式和轻量场景。' },
            { term: 'futures', desc: 'Rust 异步基础库，Future trait、Stream、Sink、join!/select! 宏。Tokio/async-std 的基础。' },
            { term: 'pin-project', desc: '安全的 pin 投影宏，编写自定义 Future/Stream 时必备。#[pin_project] 标记结构体。' }
          ]},
          { t: 'code', lang: 'rust', title: 'Tokio 异步示例', run: false,
            code: [
              'use tokio;',
              'use std::time::Duration;',
              '',
              '#[tokio::main]  // 自动创建运行时',
              'async fn main() {',
              '    // 并发执行多个任务',
              '    let handle1 = tokio::spawn(async {',
              '        tokio::time::sleep(Duration::from_secs(1)).await;',
              '        println!("Task 1 done");',
              '        42',
              '    });',
              '',
              '    let handle2 = tokio::spawn(async {',
              '        tokio::time::sleep(Duration::from_millis(500)).await;',
              '        println!("Task 2 done");',
              '        "hello"',
              '    });',
              '',
              '    // 等待两个任务完成',
              '    let (r1, r2) = tokio::join!(handle1, handle2);',
              '    println!("Results: {:?}, {:?}", r1, r2);',
              '}'
            ]},
          { t: 'h2', x: 'Web 框架' },
          { t: 'defs', x: [
            { term: 'Actix Web', desc: 'Rust 最流行的 Web 框架，高性能（TechEmpower 排名前列）、actor 模型、中间件丰富。actix-web = "4"。HttpServer::new、App::new、web::get、web::Json。' },
            { term: 'Axum', desc: 'Tokio 团队出品的 Web 框架，基于 Tower（中间件生态），提取器（extractors）模式优雅。axum = "0.7"。Router::new、route、State、Json。与 Tokio 生态无缝集成。' },
            { term: 'Rocket', desc: '声明式 Web 框架，属性宏（#[get("/")]）、类型安全、表单验证。rocket = "0.5"。API 优雅，适合快速开发。但需要 nightly（0.5 已支持 stable）。' },
            { term: 'Warp', desc: '函数式 Web 框架，基于 Filter trait，组合式路由。warp = "0.3"。get().and(path("hello")).map(|| "Hello")。适合喜欢函数式的开发者。' },
            { term: 'Tide', desc: 'async-std 团队出品的 Web 框架，API 简洁，中间件丰富。tide = "0.16"。' }
          ]},
          { t: 'code', lang: 'rust', title: 'Axum REST API 示例', run: false,
            code: [
              'use axum::{',
              '    routing::{get, post},',
              '    http::StatusCode,',
              '    Json, Router,',
              '};',
              'use serde::{Deserialize, Serialize};',
              '',
              '#[derive(Serialize, Deserialize)]',
              'struct User {',
              '    id: u64,',
              '    name: String,',
              '    age: u32,',
              '}',
              '',
              'async fn list_users() -> Json<Vec<User>> {',
              '    Json(vec![User { id: 1, name: "Alice".into(), age: 25 }])',
              '}',
              '',
              'async fn create_user(Json(user): Json<User>) -> (StatusCode, Json<User>) {',
              '    (StatusCode::CREATED, Json(user))',
              '}',
              '',
              '#[tokio::main]',
              'async fn main() {',
              '    let app = Router::new()',
              '        .route("/api/users", get(list_users).post(create_user));',
              '',
              '    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();',
              '    axum::serve(listener, app).await.unwrap();',
              '}'
            ]},
          { t: 'h2', x: '序列化' },
          { t: 'defs', x: [
            { term: 'Serde', desc: 'Rust 序列化/反序列化框架，trait 抽象，支持多种格式。serde = { version = "1", features = ["derive"] }。#[derive(Serialize, Deserialize)]。Rust 序列化事实标准。' },
            { term: 'serde_json', desc: 'Serde 的 JSON 实现，serde_json = "1"。serde_json::to_string、serde_json::from_str、serde_json::Value。' },
            { term: 'bincode', desc: '二进制序列化格式，紧凑、快速，适合网络传输和存储。bincode = "1"。' },
            { term: 'serde_yaml', desc: 'Serde 的 YAML 实现。' },
            { term: 'serde_toml', desc: 'Serde 的 TOML 实现。' },
            { term: 'prost', desc: 'Protocol Buffers Rust 实现，代码生成，比 rust-protobuf 更现代。prost = "0.12"。' },
            { term: 'rkyv', desc: '零拷贝序列化框架，序列化数据可直接内存映射使用，无需反序列化。rkyv = "0.7"。性能极高。' }
          ]},
          { t: 'h2', x: '数据库' },
          { t: 'defs', x: [
            { term: 'Diesel', desc: 'Rust 最流行的 ORM，类型安全、查询构建器、迁移工具。diesel = { version = "2", features = ["postgres", "r2d2"] }。支持 PostgreSQL/MySQL/SQLite。' },
            { term: 'SQLx', desc: '异步 SQL 工具库，编译期 SQL 检查（sqlx::query!），支持 PostgreSQL/MySQL/SQLite。sqlx = { version = "0.7", features = ["postgres", "runtime-tokio-rustls"] }。比 ORM 更可控。' },
            { term: 'rusqlite', desc: 'SQLite Rust 绑定，同步 API。rusqlite = "0.31"。支持连接池（r2d2）。' },
            { term: 'mongodb', desc: 'MongoDB 官方 Rust 驱动，异步 API。mongodb = "2"。' },
            { term: 'redis', desc: 'Redis Rust 客户端，同步/异步 API。redis = { version = "0.24", features = ["tokio-comp"] }。' },
            { term: 'sea-orm', desc: '异步 ORM，基于 SQLx，支持 ActiveRecord 和 DataMapper 模式。sea-orm = "0.12"。比 Diesel 更现代，异步友好。' }
          ]},
          { t: 'h2', x: '日志 / 错误处理 / CLI' },
          { t: 'defs', x: [
            { term: 'tracing', desc: 'Rust 最流行的结构化日志和追踪库，支持 span（跨函数/异步的上下文）、事件、订阅者。tracing = "0.1"、tracing-subscriber = "0.3"。比 log 更强大，支持分布式追踪。' },
            { term: 'log', desc: 'Rust 日志门面（facade），类似 SLF4J。log = "0.4"。需要配合实现（env_logger、pretty_env_logger）。' },
            { term: 'env_logger', desc: 'log 的实现，通过 RUST_LOG 环境变量控制日志级别。env_logger = "0.11"。' },
            { term: 'anyhow', desc: '应用层错误处理库，anyhow::Result、anyhow::Error，支持错误包装和上下文。anyhow = "1"。适合应用程序。' },
            { term: 'thiserror', desc: '库层错误处理库，#[derive(Error)] 自动生成错误类型。thiserror = "1"。适合库开发，定义自定义错误类型。' },
            { term: 'eyre', desc: '类似 anyhow，但更注重错误报告的美观和可定制性。eyre = "0.6"。' },
            { term: 'clap', desc: 'Rust 最流行的 CLI 框架，派生宏（#[derive(Parser)]）、自动帮助、自动补全。clap = { version = "4", features = ["derive"] }。' },
            { term: 'crossterm', desc: '跨平台终端操作库，光标、颜色、输入、备用屏幕。crossterm = "0.27"。TUI 应用基础。' },
            { term: 'ratatui', desc: 'TUI 库（原 tui-rs），基于 crossterm，提供组件（表格、图表、列表、标签页）。ratatui = "0.26"。' }
          ]},
          { t: 'code', lang: 'rust', title: 'thiserror + anyhow 错误处理示例', run: false,
            code: [
              'use thiserror::Error;',
              'use anyhow::{Result, Context};',
              '',
              '// 库层：用 thiserror 定义自定义错误',
              '#[derive(Error, Debug)]',
              'pub enum ApiError {',
              '    #[error("网络错误: {0}")]',
              '    Network(#[from] std::io::Error),',
              '    ',
              '    #[error("HTTP 错误: {status}")]',
              '    Http { status: u16 },',
              '    ',
              '    #[error("解析错误: {0}")]',
              '    Parse(String),',
              '}',
              '',
              '// 应用层：用 anyhow 包装，添加上下文',
              'fn fetch_user(id: u64) -> Result<String> {',
              '    let response = reqwest::blocking::get(format!("https://api.example.com/users/{}", id))',
              '        .context("请求用户 API 失败")?;',
              '    ',
              '    let body = response.text()',
              '        .context("读取响应体失败")?;',
              '    ',
              '    Ok(body)',
              '}',
              '',
              'fn main() -> Result<()> {',
              '    let user = fetch_user(1)?;',
              '    println!("{}", user);',
              '    Ok(())',
              '}'
            ]},
          { t: 'h2', x: '网络 / 并发 / 加密' },
          { t: 'defs', x: [
            { term: 'reqwest', desc: 'Rust 最流行的 HTTP 客户端，同步/异步、JSON、表单、代理、cookie。reqwest = { version = "0.11", features = ["json"] }。基于 Tokio + hyper。' },
            { term: 'hyper', desc: '底层 HTTP 库，Tokio 团队出品，HTTP/1.1 和 HTTP/2。hyper = "1"。reqwest/Axum 的底层。' },
            { term: 'tonic', desc: 'gRPC Rust 实现，基于 Tokio + hyper，代码生成（prost）。tonic = "0.11"、tonic-build = "0.11"。' },
            { term: 'crossbeam', desc: '并发工具库，无锁队列、通道、作用域线程、内存回收。crossbeam = "0.8"。比 std::sync 更强大。' },
            { term: 'rayon', desc: '数据并行库，一行代码将迭代器改为并行。rayon = "1"。(1..100).into_par_iter().sum()。简单高效。' },
            { term: 'parking_lot', desc: '更高效的同步原语，Mutex/RwLock/Condvar，比 std::sync 更快、API 更友好（不会中毒）。parking_lot = "0.12"。' },
            { term: 'ring', desc: 'Rust 加密库，安全、快速、无 OpenSSL 依赖。ring = "0.17"。支持 AES、SHA、RSA、ECC、HMAC。' },
            { term: 'rustls', desc: 'Rust 实现的 TLS 库，无需 OpenSSL，更安全。rustls = "0.22"。reqwest/hyper 可使用 rustls 替代 native-tls。' },
            { term: 'openssl', desc: 'OpenSSL Rust 绑定，功能最全但需要系统安装 OpenSSL。openssl = "0.10"。' }
          ]},
          { t: 'h2', x: '游戏 / 图形 / 机器学习' },
          { t: 'defs', x: [
            { term: 'Bevy', desc: 'Rust 最流行的游戏引擎，ECS 架构、数据驱动、跨平台。bevy = "0.13"。2D/3D 游戏、可视化应用。社区活跃，插件丰富。' },
            { term: 'wgpu', desc: 'Rust 图形 API，跨平台（Vulkan/Metal/DX12/WebGPU），安全抽象。wgpu = "0.20"。WebGPU 的 Rust 实现。' },
            { term: 'macroquad', desc: '极简游戏库，单文件、跨平台、API 简单。macroquad = "0.4"。适合小型游戏和原型。' },
            { term: 'tch-rs', desc: 'PyTorch C++ API 的 Rust 绑定，支持张量、自动微分、模型训练/推理。tch = "0.17"。LibTorch 的 Rust 封装。' },
            { term: 'tract', desc: 'Rust 推理引擎，支持 ONNX 和 NNEF，轻量、快速。tract = "0.21"。适合嵌入式推理。' },
            { term: 'linfa', desc: 'Rust 机器学习库，类似 scikit-learn，支持多种算法。linfa = "0.7"。' },
            { term: 'ndarray', desc: 'Rust 多维数组库，类似 NumPy。ndarray = "0.15"。科学计算基础。' }
          ]},
          { t: 'h2', x: '系统编程 / 工具库' },
          { t: 'defs', x: [
            { term: 'nix', desc: 'Rust 系统编程库，安全封装 POSIX API（进程、信号、文件、网络、ioctl）。nix = "0.27"。比 libc 更安全（类型安全）。' },
            { term: 'libc', desc: 'C 标准库 Rust 绑定，直接调用 libc 函数。libc = "0.2"。底层系统编程必备。' },
            { term: 'windows', desc: 'Windows API Rust 绑定，Microsoft 官方维护。windows = "0.54"。' },
            { term: 'itertools', desc: '迭代器扩展库，提供额外的迭代器适配器（cartesian_product、tuple_windows、unique、sorted）。itertools = "0.12"。' },
            { term: 'once_cell', desc: '延迟初始化库，OnceCell/Lazy，比 lazy_static 更现代（支持标准库，无宏）。once_cell = "1"。' },
            { term: 'chrono', desc: '日期时间库，DateTime/NaiveDate/TimeZone、格式化、解析。chrono = "0.4"。' },
            { term: 'uuid', desc: 'UUID 生成库，uuid = { version = "1", features = ["v4"] }。支持 v1/v3/v4/v5。' },
            { term: 'rand', desc: '随机数库，rand = "0.8"。thread_rng、gen_range、seq::SliceRandom。' },
            { term: 'regex', desc: '正则表达式库，regex = "1"。有限自动机，保证线性时间，无 ReDoS。' },
            { term: 'tokio-util', desc: 'Tokio 工具库，codec（编解码器）、 framed、compat。tokio-util = "0.7"。' }
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            '异步运行时：Tokio（最流行/多线程）、async-std（标准库风格）、smol（极简）、futures（基础）',
            'Web 框架：Actix Web（最流行/高性能）、Axum（Tokio 官方/Tower 生态）、Rocket（声明式）、Warp（函数式）',
            '序列化：Serde（事实标准）+ serde_json/bincode/serde_yaml、prost（protobuf）、rkyv（零拷贝）',
            '数据库：Diesel（最流行 ORM）、SQLx（异步/编译期检查）、sea-orm（异步 ORM）、rusqlite（SQLite）、redis（Redis）',
            '日志：tracing（结构化/span/分布式追踪）、log + env_logger（经典）',
            '错误处理：thiserror（库层/自定义错误）、anyhow（应用层/上下文）、eyre（美观报告）',
            'CLI：clap（最流行/派生宏）、crossterm（终端操作）、ratatui（TUI 组件）',
            '网络：reqwest（HTTP 客户端）、hyper（底层 HTTP）、tonic（gRPC）',
            '并发：crossbeam（无锁/通道）、rayon（数据并行）、parking_lot（高效同步原语）',
            '加密：ring（安全/无 OpenSSL）、rustls（TLS/无 OpenSSL）、openssl（功能最全）',
            '游戏图形：Bevy（ECS 游戏引擎）、wgpu（跨平台图形）、macroquad（极简游戏）',
            'AI：tch-rs（PyTorch）、tract（推理）、linfa（机器学习）、ndarray（多维数组）',
            '系统编程：nix（POSIX 安全封装）、libc（C 库绑定）、windows（Windows API）',
            '工具库：itertools（迭代器扩展）、once_cell（延迟初始化）、chrono（日期时间）、uuid、rand、regex'
          ]}
        ]
      },

      /* ==================================================== 13 综合实战 */
      {
        id: 'projects',
        title: '综合实战',
        sub: '用 enum + match 写状态机，用 struct + Vec 做学生管理',
        blocks: [
          { t: 'h2', x: '实战一：交通灯状态机' },
          { t: 'p', x: '状态机是 enum + match 的绝佳舞台：把每种状态列为一个变体，状态迁移写成一个纯函数。因为 `match` 必须穷尽，哪天你加了一种新状态，编译器会立刻指出所有「忘了处理新状态」的地方——这是用 if-else 堆状态极易翻车、而用 Rust 很稳的典型场景。' },
          { t: 'code', lang: 'rust', title: '交通灯状态机', run: true, ed: true,
            code: [
              '#[derive(Debug)]',
              'enum Traffic {',
              '    Red,',
              '    Green,',
              '    Yellow,',
              '}',
              '',
              'fn next(state: Traffic) -> Traffic {',
              '    match state {',
              '        Traffic::Red => Traffic::Yellow,',
              '        Traffic::Yellow => Traffic::Green,',
              '        Traffic::Green => Traffic::Red,',
              '    }',
              '}',
              '',
              'fn main() {',
              '    let mut light = Traffic::Red;',
              '    for _ in 0..4 {',
              '        println!("当前: {:?}", light);',
              '        light = next(light);',
              '    }',
              '}'
            ],
            expect: '当前: Red\n当前: Yellow\n当前: Green\n当前: Red' },

          { t: 'h2', x: '实战二：简易学生管理' },
          { t: 'p', x: '把前面学的 struct、Vec、循环、引用、方法串起来：用 `Vec<Student>` 存一批学生，遍历算平均分、找最高分。这里用 `&Student` 引用避免移动，用可变累加成统计。' },
          { t: 'code', lang: 'rust', title: '学生管理', run: true, ed: true,
            code: [
              '#[derive(Debug)]',
              'struct Student {',
              '    name: String,',
              '    score: u32,',
              '}',
              '',
              'fn main() {',
              '    let mut students: Vec<Student> = Vec::new();',
              '    students.push(Student { name: "Alice".to_string(), score: 90 });',
              '    students.push(Student { name: "Bob".to_string(), score: 75 });',
              '    students.push(Student { name: "Carol".to_string(), score: 88 });',
              '',
              '    let mut total: u32 = 0;',
              '    let mut best: &Student = &students[0];',
              '    for s in &students {',
              '        println!("{}: {} 分", s.name, s.score);',
              '        total += s.score;',
              '        if s.score > best.score {',
              '            best = s;',
              '        }',
              '    }',
              '    println!("平均分 = {}", total / students.len() as u32);',
              '    println!("最高分: {}", best.name);',
              '}'
            ],
            expect: 'Alice: 90 分\nBob: 75 分\nCarol: 88 分\n平均分 = 84\n最高分: Alice' },

          { t: 'h2', x: '实战三：按名字查询（Option + 引用）' },
          { t: 'p', x: '再练一个常见需求：在集合里按条件查找，返回「找到的引用」或「没找到」。函数签名 `-> Option<&Student>` 把「可能没有」写进了类型，调用方必须用 `match` 区分，绝不会拿到空指针。' },
          { t: 'code', lang: 'rust', title: '按名字查询', run: true, ed: true,
            code: [
              '#[derive(Debug)]',
              'struct Student {',
              '    name: String,',
              '    score: u32,',
              '}',
              '',
              'fn main() {',
              '    let students = [',
              '        Student { name: "Alice".to_string(), score: 90 },',
              '        Student { name: "Bob".to_string(), score: 75 },',
              '    ];',
              '    match find_student(&students, "Bob") {',
              '        Some(s) => println!("找到 {}，{} 分", s.name, s.score),',
              '        None => println!("没找到"),',
              '    }',
              '    match find_student(&students, "Dave") {',
              '        Some(s) => println!("找到 {}，{} 分", s.name, s.score),',
              '        None => println!("没找到 Dave"),',
              '    }',
              '}',
              '',
              'fn find_student(list: &[Student], name: &str) -> Option<&Student> {',
              '    for s in list {',
              '        if s.name == name { return Some(s); }',
              '    }',
              '    None',
              '}'
            ],
            expect: '找到 Bob，75 分\n没找到 Dave' },

          { t: 'h2', x: '实战四：筛选及格名单' },
          { t: 'p', x: '用迭代器的 `filter` 一把筛出满足条件的学生，再用 `collect` 聚成新的引用列表。再次看到：声明式写法 + 显式类型，既好读又安全。' },
          { t: 'code', lang: 'rust', title: '筛选及格', run: true, ed: true,
            code: [
              '#[derive(Debug)]',
              'struct Student {',
              '    name: String,',
              '    score: u32,',
              '}',
              '',
              'fn main() {',
              '    let students = [',
              '        Student { name: "Alice".to_string(), score: 90 },',
              '        Student { name: "Bob".to_string(), score: 55 },',
              '        Student { name: "Carol".to_string(), score: 88 },',
              '    ];',
              '    let passed: Vec<&Student> = students.iter().filter(|s| s.score >= 60).collect();',
              '    println!("及格 {} 人:", passed.len());',
              '    for s in &passed {',
              '        println!("  {}", s.name);',
              '    }',
              '}'
            ],
            expect: '及格 2 人:\n  Alice\n  Carol' },

          { t: 'note', k: 'tip', title: '小项目也能体现 Rust 价值观',
            x: '这四个例子都没用 GC、没用异常、没用 null。错误用 Option/Result 表达，可变用 mut 显式标注，内存靠所有权自动回收。等它们长大成几千行的服务，这些「一开始偏执的约束」会让你省下无数调试内存与并发事故的通宵。' },

          { t: 'kp', x: [
            'enum + match 是写状态机/命令分发最稳的组合',
            'Vec<struct> 是组织同构数据的标准姿势',
            '查找返回 Option<&T>，类型即「可能为空」的声明',
            '迭代器 filter/map/collect 让集合处理声明式且安全',
            '小项目里就遵守所有权/可变性约束，大项目才稳'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用一个 `Student` 结构体数组存两名学生，用迭代器 `map`+`sum` 算总分，再除以人数得平均分。', lang: 'rust',
            code: [
              'struct Student {',
              '    name: String,',
              '    score: u32,',
              '}',
              '',
              'fn main() {',
              '    let students = [',
              '        Student { name: "Alice".to_string(), score: 90 },',
              '        Student { name: "Bob".to_string(), score: 80 },',
              '    ];',
              '    let total: u32 = students.iter().map(|s| s.score).sum();',
              '    println!("平均分 = {}", total / students.len() as u32);',
              '}'
            ],
            expect: '平均分 = 85',
            hint: 'map 取出 score，sum 求和。',
            ans: '90+80=170，除以 2 人得 85。`.iter().map(|s| s.score).sum()` 是声明式写法，`s` 是 `&Student` 引用，没有发生所有权移动。' },
          { t: 'think', q: '为什么 Rust 的查找函数要返回 `Option<&Student>`，而不是直接返回 `&Student`？',
            ans: '因为「找不到」是真实可能的情况。如果直接返回引用，你就被迫在找不到时返回一个空指针——这正是 Rust 要消灭的东西。返回 `Option<&Student>` 把「可能没有」写进类型，调用方必须 match 出 Some/None 两种情况，绝不会拿到悬垂引用。' },
          { t: 'think', q: '在学生管理项目里，如果用 `for s in &students` 遍历后又想修改 `students`，编译器会报什么错？为什么？',
            ans: '会报「cannot borrow `students` as mutable because it is also borrowed as immutable」（E0502）。因为 `for s in &students` 持有了对 `students` 的不可变借用，这个借用在整个循环期间都有效。如果你在循环体内试图 `students.push(...)` 或修改元素，就需要可变借用——而 Rust 不允许同时存在不可变借用和可变借用。解决办法：(1) 先遍历收集需要修改的索引到一个 Vec，循环结束后再按索引修改；(2) 用 `iter_mut()` 遍历可变引用，直接在循环里改元素内容（但不能增删元素）；(3) 把遍历和修改分成两个独立阶段。这正是借用规则在保护你：避免「遍历到一半容器结构变了」导致的迭代器失效。' }
        ]
      },

      /* ==================================================== 13 速查总结 */
      {
        id: 'cheatsheet',
        title: '速查总结',
        sub: '一页纸带走 Rust 的核心语法与心智模型',
        blocks: [
          { t: 'h2', x: '一句话心智模型' },
          { t: 'p', x: '把内存想象成一本图书：每个值都有唯一的主人（所有权）；别人想看可以借（借用，只读或可写）；借的条子上有有效期（生命周期）；编译器在门口把关，保证「书没被销毁时没人还在引用它、写的时候没人同时读」。读懂这套比喻，Rust 就不再吓人。' },

          { t: 'h2', x: '核心语法速查' },
          { t: 'table',
            head: ['目的', '写法'],
            rows: [
              ['入口函数', '`fn main() { ... }`'],
              ['不可变变量', '`let x = 5;`'],
              ['可变变量', '`let mut x = 5;`'],
              ['打印', '`println!("{}", x);`'],
              ['debug 打印', '`println!("{:?}", v);`'],
              ['整型 / 浮点', '`i32` `u32` `f64`'],
              ['字符串', '`&str`（只读） `String`（拥有）'],
              ['数组', '`vec![1, 2, 3]`（Vec）'],
              ['键值表', '`HashMap<K, V>`'],
              ['函数', '`fn add(a: i32, b: i32) -> i32 { a + b }`'],
              ['结构体', '`struct P { x: i32 }` + `impl P`'],
              ['接口/能力', '`trait` + `impl Trait for T`'],
              ['枚举', '`enum` + `match` 穷尽匹配'],
              ['可能为空', '`Option<T>`：`Some(v)` / `None`'],
              ['可能失败', '`Result<T, E>`：`Ok(v)` / `Err(e)`'],
              ['早期返回', '`?` 运算符'],
              ['循环', '`loop` `while` `for x in 集合`']
            ]},

          { t: 'h2', x: '借用规则速查' },
          { t: 'defs', x: [
            { term: '所有权', desc: '每个值唯一主人；主人离开作用域，内存自动 drop。赋值/传参给堆类型会移动。' },
            { term: '不可变借用 &T', desc: '只读借看，可同时存在多个；不转移所有权，原变量仍可用。' },
            { term: '可变借用 &mut T', desc: '可修改地借；同一时刻只能有一个，且与只读借用互斥。' },
            { term: '生命周期', desc: '标注引用的有效期（\'a），帮编译器确认返回的引用不会悬空。多数情况自动推断。' }
          ]},

          { t: 'h2', x: '常见陷阱与对策' },
          { t: 'table',
            head: ['现象', '原因', '对策'],
            rows: [
              ['`borrow of moved value`', '把 String/Vec 传走后还用', '传 `&` 引用，或 `.clone()`'],
              ['`cannot assign twice`', '变量没声明 mut', '加 `mut`'],
              ['`missing lifetime`', '返回引用未标注有效期', '补 `<\'a>` 生命周期参数'],
              ['`index out of bounds`', '用 `v[i]` 越界', '改用 `v.get(i)` 返回 Option'],
              ['整数溢出 panic', '调试模式 u8 等超出范围', '用 checked_add / 换更大类型']
            ]},

          { t: 'h2', x: '一页代码示例' },
          { t: 'code', lang: 'rust', title: 'Rust 速查卡片', run: true, ed: true,
            code: [
              'fn main() {',
              '    println!("Rust 速查：");',
              '    println!("- 变量: let x = 5; 可变: let mut x = 5;");',
              '    println!("- 函数: fn add(a: i32, b: i32) -> i32 {{ a + b }}");',
              '    println!("- 打印: println!(\"{{}}\", x);");',
              '    println!("- 容器: Vec<T> / String / HashMap<K,V>");',
              '    println!("- 枚举: enum / match 穷尽匹配");',
              '    println!("- 错误: Option<T> / Result<T,E> / ?");',
              '    println!("- 灵魂: 所有权 + 借用 + 生命周期");',
              '}'
            ],
            expect: 'Rust 速查：\n- 变量: let x = 5; 可变: let mut x = 5;\n- 函数: fn add(a: i32, b: i32) -> i32 { a + b }\n- 打印: println!("{}", x);\n- 容器: Vec<T> / String / HashMap<K,V>\n- 枚举: enum / match 穷尽匹配\n- 错误: Option<T> / Result<T,E> / ?\n- 灵魂: 所有权 + 借用 + 生命周期' },

          { t: 'h2', x: '下一步学什么' },
          { t: 'ul', x: [
            '**泛型与 trait bound**：写出既通用又零成本的抽象（`fn f<T: Display>(x: T)`）。',
            '**智能指针**：`Rc`/`RefCell`（单线程共享可变）、`Arc`/`Mutex`（多线程）。',
            '**闭包与迭代器进阶**：`fold`、自定义迭代器、惰性求值。',
            '**异步 Rust**：用 `async/.await` + Tokio 写高并发服务。',
            '**标准库深读**：`std::collections`、`std::io`、`std::fmt` 是日常主力。'
          ]},

          { t: 'note', k: 'tip', title: '给坚持到这里的你',
            x: 'Rust 前期「和编译器吵架」的挫败感是真实且普遍的。但请记住：编译器每拦你一次，就替你挡掉一个未来要在生产环境熬夜排查的 bug。等你能顺畅写出编译通过的代码，你会发现自己写的 Rust 比写其他语言时「想得更清楚」。这，就是 Rust 的礼物。' },

          { t: 'kp', x: [
            '所有权 + 借用 + 生命周期 = Rust 的灵魂，缺一不可',
            'Option/Result 把「空」与「错」写进类型，逼你处理',
            'enum + match 是表达状态与命令分发最稳的组合',
            'mut 显式、引用显式、生命周期显式——显式即安全',
            '编译器是你最严格也最靠谱的搭档，与它合作而非对抗'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '综合复习：用 `for` 遍历全闭区间 `1..=3`，打印每个数的平方。', lang: 'rust',
            code: [
              'fn main() {',
              '    for i in 1..=3 {',
              '        println!("{} 的平方是 {}", i, i * i);',
              '    }',
              '}'
            ],
            expect: '1 的平方是 1\n2 的平方是 4\n3 的平方是 9',
            ans: '`1..=3` 是全闭区间，含 1、2、3。这一小段把「fn main + for + println!」串成了 Rust 日常程序的骨架。' },
          { t: 'think', q: '用一句话概括 Rust 的三个灵魂概念，以及它们各自回答什么问题。',
            ans: '所有权回答「谁负责释放内存」（唯一主人，出作用域自动 drop）；借用回答「别人能不能临时用」（&T 只读、&mut T 可写）；生命周期回答「引用能活多久」（保证不悬垂）。三者合力，让 Rust 没有 GC 也能内存安全。' },
          { t: 'think', q: '速查内外，`cargo check`、`cargo clippy`、`cargo test` 三条命令各自守的是什么关？',
            ans: '`cargo check` 守的是「编译关」——快速做类型检查和借用检查，不生成可执行文件，日常写代码时频繁跑，反馈最快；`cargo clippy` 守的是「lint 关」——比编译器更严格，能发现「能编译但写得不好」的代码，比如多余的 `clone()`、可以用 `while let` 替代的 `loop + match`、性能次优的迭代器用法，还会给修复建议；`cargo test` 守的是「行为关」——运行单元测试和集成测试，验证代码实际行为是否符合预期。三条命令从编译到 lint 再到测试，层层把关，是 Rust 项目 CI 的标配。' }
        ]
      }

    ]
  });

})(window);
