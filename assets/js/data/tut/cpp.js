/* ==========================================================================
   CodeUp码上 · data/tut/cpp.js — C++ 教程
   --------------------------------------------------------------------------
   风格与结构严格对标 python.js（散文风、13 章、block 写法一致）。
   C++ 是「远程编译语言」：代码块经 wandbox（g++-13, gnu++17）编译运行，
   失败降级展示 expect。每段代码自包含可编译。
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL;
  var T = CL.Tutorials;

  T.register('cpp', {
    chapters: [

      /* ==================================================== 1 概览 */
      {
        id: 'overview',
        title: '语言概览',
        sub: '一门把「零开销抽象」写进语言设计哲学的语言',
        blocks: [
          { t: 'p', x: 'C++ 由 **Bjarne Stroustrup** 在 1979 年的贝尔实验室开始设计，初衷是给当时最流行的系统编程语言 C 加上「带类的 C」（C with Classes）。1983 年正式命名为 C++，其中的 `++` 既是自增运算符，也寓意「C 的进化」。1985 年发布第一个商业版本，1998 年成为 ISO 国际标准。' },

          { t: 'p', x: '它最与众不同的地方，是一句被反复强调的设计信条：**「你不为没用到的东西付出代价」（You don\'t pay for what you don\'t use）**。这意味着高级抽象（类、模板、泛型）在运行时几乎不产生额外开销——它们大多在编译期被「折叠」成和手写 C 一样快的机器码。这是 C++ 能同时胜任操作系统、游戏引擎、高频交易和嵌入式的关键原因。' },

          { t: 'h2', x: '设计哲学' },
          { t: 'p', x: 'C++ 之父总结过几条核心准则，理解它们能帮你避开「把 C++ 当 C 用」或「把 C++ 当 Java 用」的误区：' },
          { t: 'ol', x: [
            '**零开销抽象**——你写的类和模板，编译后不该比手写的裸代码慢',
            '**直接操作硬件**——指针、内存、对齐，一切都在你掌控之中',
            '**静态类型 + 编译期检查**——错误尽量在编译时发现，而不是运行时崩溃',
            '**向后兼容 C**——几乎每一段 C 程序都是合法的 C++ 程序'
          ]},

          { t: 'h2', x: '第一个程序' },
          { t: 'code', lang: 'cpp', title: 'Hello, World!', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    std::cout << "Hello, World!" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'Hello, World!' },

          { t: 'p', x: '和 Python 的 `print("Hello, World!")` 相比，C++ 多了 `#include`、函数 `main`、`std::cout`、分号和 `return 0`。这不是啰嗦，而是**显式告诉编译器和读者：这是一个独立的、可编译链接成可执行文件的程序**。每一个符号背后都有明确职责。' },

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

          { t: 'p', x: '这张对照表值得反复看。C 用 `printf`，C++ 用 `std::cout`——后者是类型安全的，不需要用 `%d`/`%s` 这类格式符去「猜」参数类型。Java 需要类和 `main` 方法的仪式感，Go 需要包声明——它们服务于各自的工程目标，但作为第一个程序，C++ 已经让你看到本质：**调用输出，结束程序**。' },

          { t: 'h2', x: 'C++ 擅长什么' },
          { t: 'defs', x: [
            { term: '系统编程', desc: '操作系统内核、驱动、数据库引擎。需要直接操控内存与硬件时，C++ 仍是首选。' },
            { term: '游戏与图形', desc: 'Unreal、Unity 的底层、渲染引擎、物理仿真。对帧率和延迟的极致要求只有 C++ 能满足。' },
            { term: '高频交易', desc: '微秒级延迟决定盈亏。零开销抽象让策略逻辑既高级又够快。' },
            { term: '高性能库', desc: 'TensorFlow、OpenCV、LLVM、Chrome 的核心。把性能瓶颈交给 C++，接口留给其他语言。' },
            { term: '嵌入式', desc: '从单片机到汽车 ECU，资源受限又需要抽象能力时，C++ 恰到好处。' }
          ]},

          { t: 'h2', x: 'C++ 不擅长什么' },
          { t: 'p', x: '诚实地说清楚边界，比一味吹捧更有价值：' },
          { t: 'ul', x: [
            '**快速写脚本 / 一次性工具**——编译链接这一步让开发循环比 Python 慢很多。',
            '**新手友好度**——指针、内存、未定义行为（UB）是陡峭的学习曲线。',
            '**安全默认**——语言默认信任你，数组越界、空指针不会自动报错，全靠纪律和现代特性规避。',
            '**生态碎片化**——标准库相对较小，GUI、网络、序列化多依赖第三方，且版本繁杂。'
          ]},

          { t: 'note', k: 'tip', title: '怎么判断该不该学 C++',
            x: '如果你要做游戏引擎、操作系统、高性能计算、嵌入式，或者想真正理解「程序如何跑在硬件上」——选 C++ 几乎是必经之路。如果你的目标是写业务后台、数据分析、自动化脚本，那先用 Python/Go 把事情做出来，再回头学 C++ 会轻松得多。' },

          { t: 'kp', x: [
            'C++ 是 C 的超集（几乎），同时支持面向过程与面向对象',
            '核心信条：零开销抽象 + 不为没用到的东西付代价',
            '代码需经「编译 → 链接」才能运行，没有解释器直接跑',
            '类型在编译期检查，运行时不存在类型信息（与 Java 不同）',
            '内存默认由程序员管理，现代 C++ 用智能指针把这件事变安全',
            '标准委员会每三年发布一版：C++11 / 14 / 17 / 20 是重要里程碑'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 std::cout 输出你自己的一句话', lang: 'cpp',
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    std::cout << "我在学 C++" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '我在学 C++',
            hint: '注意 std::cout 后面用 << 而不是逗号',
            ans: '运行后输出「我在学 C++」。和 C 的 printf 不同，cout 不需要写 %d 这类格式符，编译器自动处理类型。' },
          { t: 'think', q: 'C++ 的「零开销抽象」是什么意思？',
            ans: '意思是你用类、模板这些高级抽象写代码，编译后的机器码和手写 C 一样快——不会因为用了高级语法就额外付出运行时代价。这是 C++ 能同时做到「优雅」和「极致性能」的根本原因。' },
          { t: 'think', q: 'C++ 和 C 最大的区别是什么？为什么说 C++ 不是「C 的超集」？',
            ans: 'C++ 在 C 的基础上增加了类、模板、异常、引用、STL 等大量特性，但它**不是严格的超集**：有些合法的 C 代码在 C++ 里编译不过，比如 C 允许 void* 隐式转成任意指针类型（C++ 必须强制转换），C 的字符字面量是 int 类型（C++ 是 char），C 可以用不写参数类型的旧式函数声明。大多数 C 代码能直接用 C++ 编译，但遇到边界情况要注意差异。' }
        ]
      },

      /* ==================================================== 2 快速开始 */
      {
        id: 'setup',
        title: '快速开始',
        sub: '装好编译器，学会用 g++ 把代码变成程序',
        blocks: [
          { t: 'h2', x: 'C++ 是编译型语言' },
          { t: 'p', x: '和 Python「写完直接跑」不同，C++ 必须先由**编译器**把源码翻译成机器码，再**链接**成可执行文件。你写的 `.cpp` 文件本身不能直接运行。这一步多出来的「编译」，换来的是运行时接近硬件的极限性能。' },

          { t: 'h2', x: '选择编译器' },
          { t: 'p', x: '主流编译器有三家，它们的命令行几乎一致，本教程统一以 **g++（GCC）** 为例：' },
          { t: 'table',
            head: ['编译器', '平台', '说明'],
            rows: [
              ['`g++`', 'Linux / Windows(MinGW) / macOS', 'GNU 出品，开源免费，本教程默认'],
              ['`clang++`', 'macOS / Linux', 'LLVM 出品，报错信息更友好，Apple 默认'],
              ['`cl` (MSVC)', 'Windows (Visual Studio)', '微软出品，Windows 原生生态']
            ]},

          { t: 'h3', x: 'Windows' },
          { t: 'ol', x: [
            '安装 **MinGW-w64** 或 **MSYS2**，或用 Visual Studio 自带的「C++ 桌面开发」工作负载',
            '确保 `g++ --version` 能在命令提示符里运行（把编译器目录加进 PATH）',
            '验证：`g++ --version` 应输出版本号'
          ]},
          { t: 'note', k: 'warn', title: 'Windows 用户注意',
            x: '直接在微软商店装的「C++」往往是假的。请用 MSYS2（推荐 `pacman -S mingw-w64-x86_64-gcc`）或 Visual Studio。本教程所有代码在 g++-13 的 gnu++17 标准下验证通过。' },

          { t: 'h3', x: 'macOS 与 Linux' },
          { t: 'p', x: 'macOS 用命令行工具 `xcode-select --install` 即可获得 clang++；Linux 用包管理器装 g++：' },
          { t: 'note', k: 'info', title: '安装命令（复制到终端执行）',
            x: 'macOS：`xcode-select --install`\nUbuntu：`sudo apt install g++`\n验证：`g++ --version`' },

          { t: 'h2', x: '编译与运行：核心命令' },
          { t: 'p', x: '这是你今天要记住的最重要的一行命令。它会把 `main.cpp` 编译、链接，生成名为 `app` 的可执行文件：' },
          { t: 'note', k: 'info', title: '编译命令（本教程标准）',
            x: 'g++ main.cpp -std=c++17 -o app\n\n- `main.cpp`：你的源文件\n- `-std=c++17`：指定 C++17 标准（现代特性都依赖它）\n- `-o app`：输出文件名叫 app\n\n运行：\n- Linux/macOS：`./app`\n- Windows：`app.exe`' },

          { t: 'code', lang: 'cpp', title: 'main.cpp', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    std::cout << "本程序已被 g++ 编译并运行。" << std::endl;',
              '    std::cout << "使用的标准: C++17" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '本程序已被 g++ 编译并运行。\n使用的标准: C++17' },

          { t: 'h2', x: '编译过程的四步' },
          { t: 'p', x: '`g++ main.cpp -o app` 背后其实做了四件事，理解它们有助于排查错误：' },
          { t: 'ol', x: [
            '**预处理**——展开 `#include` 和宏，生成纯 C++ 文本',
            '**编译**——把 C++ 翻译成汇编语言',
            '**汇编**——把汇编翻译成机器码（目标文件 `.o`）',
            '**链接**——把你的代码和标准库拼在一起，生成最终可执行文件'
          ]},

          { t: 'h2', x: '多文件项目（初窥）' },
          { t: 'p', x: '真实项目不会把所有代码塞进一个文件。常见做法是：声明放 `.h` 头文件，实现放 `.cpp` 源文件，最后一起编译：' },
          { t: 'note', k: 'info', title: '多文件编译',
            x: 'g++ main.cpp utils.cpp -std=c++17 -o app\n\n头文件用 `#include "utils.h"` 引入；`#include <...>` 用于标准库，`#include "..."` 用于你自己的文件。本章先专注单文件，多文件在 OOP 之后自然展开。' },

          { t: 'h2', x: '推荐的开发工具' },
          { t: 'defs', x: [
            { term: 'VS Code', desc: '免费轻量，装 C/C++ 扩展后支持调试、智能补全。配合 g++ 体验很好。' },
            { term: 'CLion', desc: 'JetBrains 出品，重构与调试一流，对 CMake 支持完善（付费，学生免费）。' },
            { term: 'Visual Studio', desc: 'Windows 上最完整的 IDE，开箱即用，适合大型项目。' },
            { term: 'Compiler Explorer', desc: 'godbolt.org，在线看 C++ 编译成了什么汇编，理解「零开销」的神器。' }
          ]},

          { t: 'note', k: 'tip', title: '本教程的代码都能在线跑',
            x: '本网站的「运行」按钮会调用在线编译器（wandbox，g++-13 gnu++17）编译并执行你的代码。你不需要装编译器也能跟着练——但学完一定要在自己机器上敲一遍，编译报错是 C++ 学习最重要的一课。' },

          { t: 'kp', x: [
            'C++ 必须先编译链接成可执行文件，不能直接运行源码',
            '默认命令：`g++ main.cpp -std=c++17 -o app`',
            '`-std=c++17` 务必写上，现代特性大多依赖它',
            '`#include <...>` 引入标准库，`#include "..."` 引入自己的头文件',
            '编译器报错是朋友，学会读错误信息比背语法更重要'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个程序输出两行文字，确认编译环境可用', lang: 'cpp',
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    std::cout << "编译器环境已就绪" << std::endl;',
              '    std::cout << "C++ 学习正式开始" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '编译器环境已就绪\nC++ 学习正式开始',
            hint: '两行 cout 用 std::endl 结尾',
            ans: '两行输出说明你的 g++ 环境没问题。以后每段示例都可以照这个流程自己编译运行。' },
          { t: 'think', q: '编译 C++ 程序时为什么要加 -std=c++17？',
            ans: 'C++11/14/17/20 每个版本都新增了大量现代特性（auto、智能指针、lambda 等）。不加这个参数，编译器默认用老旧标准，这些现代写法会报错。指定标准确保你的代码行为可预期。' },
          { t: 'think', q: 'g++ 和 gcc 有什么区别？编译 C++ 代码为什么要用 g++ 而不是 gcc？',
            ans: 'gcc 是 GNU 编译器集合的驱动程序，它根据文件后缀自动选择语言（.c 用 C 编译器，.cpp 用 C++ 编译器）。但**链接阶段**有区别：g++ 会自动链接 C++ 标准库（libstdc++），而 gcc 默认只链接 C 标准库。用 gcc 编译 .cpp 文件虽然能编译，但链接时会报 undefined reference 之类的错误（找不到 std::cout 等）。所以编译 C++ 一律用 g++，或者用 gcc 但手动加 -lstdc++。' }
        ]
      },

      /* ==================================================== 3 从 C 到 C++ */
      {
        id: 'basics',
        title: '从 C 到 C++',
        sub: '第一个 C++ 程序，以及它相对 C 的进化',
        blocks: [
          { t: 'h2', x: '为什么从 C 说起' },
          { t: 'p', x: 'C++ 几乎完全兼容 C，所以 C 的变量、循环、数组、指针在 C++ 里都成立。但 C++ 在之上叠加了更安全、更表达力强的写法。**学 C++ 不是抛弃 C，而是学会在合适的地方用更现代的替代**。本章先建立「从 C 过渡到 C++」的直觉。' },

          { t: 'h2', x: '用 iostream 代替 stdio' },
          { t: 'p', x: 'C 用 `printf` 输出，靠 `%d`/`%s` 等格式符对应参数；C++ 用 `std::cout <<`，由编译器在编译期就检查类型是否匹配，少了一大类格式错误。' },

          { t: 'code', lang: 'cpp', title: '第一个 C++ 风格程序', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    std::cout << "你好，C++" << std::endl;',
              '    // << 是「输出运算符」，可链式拼接',
              '    std::cout << "一行可以" << "拼接" << "输出" << std::endl;',
              '    int n = 42;',
              '    std::cout << "答案是 " << n << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '你好，C++\n一行可以拼接输出\n答案是 42' },

          { t: 'note', k: 'info', title: 'std::endl 是什么',
            x: '`std::endl` 先输出一个换行，再**刷新输出缓冲区**。多数情况下用 `\\n` 就够（更快）；需要立即看到输出（如日志）时才用 `endl`。本章为了清晰统一用 `endl`，实战中高频输出建议用 `\\n`。' },

          { t: 'h2', x: '对比 C 的 printf' },
          { t: 'p', x: '同样的逻辑，C 的写法需要你手动保证格式符和参数类型一致，错一个就是未定义行为：' },
          { t: 'code', lang: 'cpp', title: '同样是输出，C 的写法', run: true,
            code: [
              '#include <cstdio>',
              '',
              'int main() {',
              '    int n = 42;',
              '    // 必须写对 %d，否则行为未定义',
              '    std::printf("答案是 %d\\n", n);',
              '    return 0;',
              '}'
            ],
            expect: '答案是 42' },
          { t: 'note', k: 'tip', title: '该用哪个',
            x: '新代码一律推荐 `std::cout`。`printf` 仍有用武之地：超高频日志、需要精细格式控制（如固定小数位）时。两者可以混用，但一个项目里最好统一风格。' },

          { t: 'h2', x: 'using namespace std 简化' },
          { t: 'p', x: '每次都写 `std::` 很啰嗦。可以在文件顶部写 `using namespace std;` 把 `std` 这个名字空间「展开」，省掉前缀。但**在头文件或大项目里不推荐**——它会把 std 里的名字全倒进全局，容易命名冲突。' },
          { t: 'code', lang: 'cpp', title: '用 using 去掉 std:: 前缀', run: true,
            code: [
              '#include <iostream>',
              '',
              'using namespace std;',
              '',
              'int main() {',
              '    cout << "用 using namespace std 去掉 std:: 前缀" << endl;',
              '    cout << "但大型项目里不推荐这样做" << endl;',
              '    return 0;',
              '}'
            ],
            expect: '用 using namespace std 去掉 std:: 前缀\n但大型项目里不推荐这样做' },

          { t: 'h2', x: '注释' },
          { t: 'code', lang: 'cpp', title: '两种注释风格（继承自 C）', run: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    // 单行注释：从 // 到行尾',
              '    /* 多行注释',
              '       可以跨越多行 */',
              '    std::cout << "C++ 的注释风格继承自 C" << std::endl;  // 行尾也能写',
              '    return 0;',
              '}'
            ],
            expect: 'C++ 的注释风格继承自 C' },

          { t: 'h2', x: '变量与声明' },
          { t: 'code', lang: 'cpp', title: '声明、初始化与赋值', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    int age = 20;          // 声明并初始化',
              '    double price = 9.9;',
              '    std::cout << "年龄=" << age << " 价格=" << price << std::endl;',
              '    age = 21;              // 重新赋值',
              '    std::cout << "明年年龄=" << age << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '年龄=20 价格=9.9\n明年年龄=21' },

          { t: 'h2', x: 'const：编译期常量' },
          { t: 'p', x: '用 `const` 修饰的变量不可再修改，编译器会强制保证。它比 C 的 `#define` 宏安全——宏只是文本替换，而 `const` 有类型和作用域。' },
          { t: 'code', lang: 'cpp', title: '常量不可修改', run: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    const double PI = 3.14159;',
              '    std::cout << "PI = " << PI << std::endl;',
              '    // PI = 3.14;  // 取消注释会编译失败：常量不可修改',
              '    return 0;',
              '}'
            ],
            expect: 'PI = 3.14159' },

          { t: 'note', k: 'warn', title: 'C++ 的「变量必须初始化」',
            x: 'C++ 的变量默认**不会**被自动清零。一个未初始化的 `int` 里是「垃圾值」。养成声明即初始化的习惯，这是无数 bug 的根源。现代 C++ 还有更安全的 `constexpr` 和 `constinit`，后面会讲到。' },

          { t: 'kp', x: [
            'C++ 兼容 C，但提供了更安全现代的替代（cout / const / 容器）',
            '`std::cout << x` 类型安全，不必写格式符',
            '`using namespace std;` 省事但有命名污染风险，慎用',
            '变量不会自动初始化，声明即赋值',
            '`const` 比 `#define` 更安全：有类型、有作用域'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 cout 链式输出年龄和成绩', lang: 'cpp',
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    int age = 18;',
              '    double score = 95.5;',
              '    std::cout << "年龄: " << age << std::endl;',
              '    std::cout << "成绩: " << score << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '年龄: 18\n成绩: 95.5',
            hint: '<< 可以链式拼接，编译器自动处理 int 和 double',
            ans: 'cout 自动根据类型选择输出方式，不用你手写 %d 和 %f。这就是类型安全输出的好处——少一大类格式错误。' },
          { t: 'ex', q: '用 std::string 拼接问候语', lang: 'cpp',
            code: [
              '#include <iostream>',
              '#include <string>',
              '',
              'int main() {',
              '    std::string name = "Alice";',
              '    std::string greet = "你好, " + name;',
              '    std::cout << greet << std::endl;',
              '    std::cout << "名字长度: " << name.length() << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '你好, Alice\n名字长度: 5',
            hint: 'string 可以直接用 + 拼接，length() 返回字符数',
            ans: '和 C 的 char 数组比，std::string 能直接用 + 拼接、自带 length()，完全不用担心缓冲区溢出。这是从 C 过渡到 C++ 最立竿见影的改进。' },
          { t: 'think', q: 'C++ 的变量为什么要「声明即初始化」？',
            ans: 'C++ 的局部变量不会被自动清零，未初始化的 int 里是随机垃圾值。如果不小心用了它，行为不可预测。养成声明就赋值的习惯，能从根源上消除一大类 bug。' },
          { t: 'think', q: 'std::endl 和 \'\\n\' 都能换行，它们有什么区别？什么时候该用哪个？',
            ans: 'std::endl 输出换行符的同时**强制刷新缓冲区**（等价于输出 \\n 后调用 flush()），而 \'\\n\' 只输出换行符不刷新。频繁用 endl 会导致大量系统调用，性能很差（尤其在循环里打印时）。日常输出用 \'\\n\' 就行，只有在需要立即看到输出（比如调试、进度条）时才用 endl。这是 C++ 性能优化的一个常见细节。' }
        ]
      },

      /* ==================================================== 4 数据类型 */
      {
        id: 'types',
        title: '基本类型',
        sub: '整型、浮点、布尔、字符与 std::string',
        blocks: [
          { t: 'h2', x: 'C++ 的类型体系' },
          { t: 'p', x: 'C++ 是**静态强类型**：每个变量在编译期就有固定类型，且类型之间**不会**悄悄自动转换。`int a = 3.9;` 会截断成 `3`，而不是四舍五入——这是 C++ 设计上「不替你做可能出错的猜测」的体现。' },

          { t: 'h2', x: '基本类型一览' },
          { t: 'table',
            head: ['类型', '含义', '典型大小', '示例'],
            rows: [
              ['`bool`', '布尔', '1 字节', '`true`, `false`'],
              ['`char`', '字符/小整数', '1 字节', '`\'A\'`'],
              ['`short`', '短整型', '2 字节', '`-32768 ~ 32767`'],
              ['`int`', '整型', '4 字节', '`-2^31 ~ 2^31-1`'],
              ['`long long`', '长整型', '8 字节', '约 ±9×10^18'],
              ['`float`', '单精度浮点', '4 字节', '约 7 位有效数'],
              ['`double`', '双精度浮点', '8 字节', '约 15 位有效数']
            ]},

          { t: 'h2', x: '整型与大小' },
          { t: 'p', x: 'C++ 只规定「最小宽度」，具体大小由平台和编译器决定。现代桌面平台几乎一致：char=1、short=2、int=4、long long=8 字节。`sizeof` 能在编译期告诉你某类型占多少字节。' },
          { t: 'code', lang: 'cpp', title: '查看各整型大小', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    std::cout << "char       : " << sizeof(char) << " 字节" << std::endl;',
              '    std::cout << "short      : " << sizeof(short) << " 字节" << std::endl;',
              '    std::cout << "int        : " << sizeof(int) << " 字节" << std::endl;',
              '    std::cout << "long long  : " << sizeof(long long) << " 字节" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'char       : 1 字节\nshort      : 2 字节\nint        : 4 字节\nlong long  : 8 字节' },

          { t: 'h2', x: '整型的溢出' },
          { t: 'p', x: 'C++ 的整型是**定宽**的——它不会像 Python 那样无限扩容。一旦超过表示范围就会「环绕」（溢出），这是未定义行为的一种，务必警惕。需要大整数时考虑 `long long` 或 `__int128`。' },
          { t: 'code', lang: 'cpp', title: '整型范围演示', run: true,
            code: [
              '#include <iostream>',
              '#include <climits>',
              '',
              'int main() {',
              '    std::cout << "int 最大值 = " << INT_MAX << std::endl;',
              '    std::cout << "int 最小值 = " << INT_MIN << std::endl;',
              '    std::cout << "char 最大值 = " << int(CHAR_MAX) << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'int 最大值 = 2147483647\nint 最小值 = -2147483648\nchar 最大值 = 127' },

          { t: 'h2', x: '浮点型' },
          { t: 'p', x: '浮点数遵循 IEEE 754 二进制近似。**浮点误差是所有语言的通病**，不是 C++ 的锅。金融计算请改用整数（以「分」为单位）或专门的十进制库。' },
          { t: 'code', lang: 'cpp', title: '浮点的精度', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    float f = 0.1f;',
              '    double d = 0.1;',
              '    std::cout << "float  0.1 = " << f << std::endl;',
              '    std::cout << "double 0.1 = " << d << std::endl;',
              '    std::cout << "3.14 * 2  = " << (3.14 * 2) << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'float  0.1 = 0.1\ndouble 0.1 = 0.1\n3.14 * 2  = 6.28' },

          { t: 'note', k: 'warn', title: '别用 == 比较浮点',
            x: '由于二进制近似，`0.1 + 0.2 == 0.3` 可能为假。比较两个浮点应判断「差的绝对值小于某个极小量 ε」：`std::fabs(a - b) < 1e-9`。' },

          { t: 'h2', x: '布尔与字符' },
          { t: 'code', lang: 'cpp', title: 'bool 与 char', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    bool ok = true;',
              '    std::cout << "ok = " << ok << std::endl;          // 输出 1',
              '    std::cout << "否 = " << false << std::endl;        // 输出 0',
              '    std::cout << std::boolalpha;                       // 之后按 true/false 显示',
              '    std::cout << "ok = " << ok << std::endl;',
              '    char c = \'A\';',
              '    std::cout << "字符 " << c << " 的编码=" << int(c) << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'ok = 1\n否 = 0\nok = true\n字符 A 的编码=65' },

          { t: 'h2', x: 'std::string：C++ 的字符串' },
          { t: 'p', x: 'C 用 `char[]` 或 `char*` 表示字符串，既容易越界又不便拼接。C++ 的 `std::string` 是**可动态增长、自带长度、支持 + 拼接**的安全类型。这是从 C 过渡到 C++ 最立竿见影的改进之一。' },
          { t: 'code', lang: 'cpp', title: 'std::string 基本用法', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <string>',
              '',
              'int main() {',
              '    std::string s = "Hello";',
              '    std::string t = "C++";',
              '    std::cout << "拼接: " << s + ", " + t << std::endl;',
              '    std::cout << "长度: " << s.length() << std::endl;',
              '    std::string name = "Alice";',
              '    std::cout << "问候: " << "你好, " + name << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '拼接: Hello, C++\n长度: 5\n问候: 你好, Alice' },

          { t: 'h2', x: '类型转换' },
          { t: 'p', x: 'C++ 偏好**显式**转换。用 `static_cast<T>(x)` 表达「我知道自己在做什么」。相比 C 的 `(T)x` 强转，它更显眼、更易被工具检查，也更不容易误用。' },
          { t: 'code', lang: 'cpp', title: '显式转换 static_cast', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    double d = 3.99;',
              '    int i = static_cast<int>(d);',
              '    std::cout << "3.99 -> int = " << i << " (截断，非四舍五入)" << std::endl;',
              '    int a = 65;',
              '    char c = static_cast<char>(a);',
              '    std::cout << "65 -> char = " << c << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '3.99 -> int = 3 (截断，非四舍五入)\n65 -> char = A' },

          { t: 'note', k: 'danger', title: '隐式转换的陷阱',
            x: 'C++ 会在很多地方悄悄做窄化转换，比如把 `double` 赋给 `int`、把 `int` 赋给 `short`。这些转换可能丢数据却不报错。写 `auto` 或函数参数时尤其要警觉「类型被悄悄变小」。C++20 引入的「列表初始化」`int x{3.9};` 会直接拒绝这种窄化，更安全。' },

          { t: 'kp', x: [
            'C++ 是静态强类型，类型不隐式转换（窄化会丢数据）',
            '整型定宽：int 通常 4 字节、long long 8 字节，溢出是未定义行为',
            '浮点有精度误差，金融计算改用整数或十进制库，别用 == 比较',
            '字符串用 `std::string`，告别 C 的 `char*` 苦海',
            '优先 `static_cast`，少用 C 风格 `(T)x` 强转'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 static_cast 把 double 截断成 int，并查看 bool 的大小', lang: 'cpp',
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    double d = 3.99;',
              '    int i = static_cast<int>(d);',
              '    std::cout << "3.99 截断为 " << i << std::endl;',
              '    std::cout << "bool 大小: " << sizeof(bool) << " 字节" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '3.99 截断为 3\nbool 大小: 1 字节',
            hint: 'static_cast<int>(3.99) 截断小数，不是四舍五入',
            ans: '3.99 截断成 3（不是 4），bool 通常占 1 字节。static_cast 让类型转换更显眼，编译器也能帮你检查。' },
          { t: 'think', q: '为什么金融计算不能用浮点数，而要用整数？',
            ans: '浮点数是二进制近似，0.1 在内存中不精确。经过大量加减乘除后误差会累积，导致账目对不上。金融计算以「分」为单位用整数存储，需要显示时再除以 100，彻底避免精度问题。' },
          { t: 'think', q: 'auto 关键字是怎么推导类型的？它会推导出引用吗？',
            ans: 'auto 推导的是**值类型**，会丢弃引用和 const 限定符。比如 `int x = 5; int& r = x; auto a = r;` 中 a 的类型是 int（不是 int&），因为 auto 按值推导。如果想要引用，要写 `auto& a = r;`；想要 const 引用，写 `const auto& a = r;`。这和模板类型推导规则一致，理解这点才能正确使用 auto。' }
        ]
      },

      /* ==================================================== 5 运算符 */
      {
        id: 'operators',
        title: '运算符',
        sub: '算术、比较、逻辑、位运算，以及运算符重载',
        blocks: [
          { t: 'h2', x: '运算符总览' },
          { t: 'p', x: 'C++ 的运算符体系和 C 几乎一致，但 C++ 允许你**为自定义类型重载运算符**——这正是 `std::string` 能用 `+` 拼接、`std::cout` 能用 `<<` 输出的底层原理。本节先讲内置运算符，再揭开重载的神秘面纱。' },
          { t: 'table',
            head: ['类别', '运算符', '说明'],
            rows: [
              ['算术', '`+ - * / %`', '加 减 乘 除 取余'],
              ['自增', '`++ --`', '前置/后置，有细微差别'],
              ['比较', '`== != < > <= >=`', '结果为 bool'],
              ['逻辑', '`&& || !`', '短路求值'],
              ['位运算', '`& | ^ ~ << >>`', '按二进制位操作'],
              ['赋值', '`= += -=` 等', '复合赋值']
            ]},

          { t: 'h2', x: '算术与自增' },
          { t: 'p', x: '注意两点：整数除法会**截断**（不是四舍五入）；`%` 是取余。前置 `++i` 先加后用，后置 `i++` 先用后加——在简单语句里结果相同，但在复杂表达式和迭代器上有性能与语义差别。' },
          { t: 'code', lang: 'cpp', title: '算术运算', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    int a = 17, b = 5;',
              '    std::cout << "a + b = " << a + b << std::endl;',
              '    std::cout << "a / b = " << a / b << " (整数除法截断)" << std::endl;',
              '    std::cout << "a % b = " << a % b << std::endl;',
              '    std::cout << "a++ = " << a++ << "  之后 a=" << a << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'a + b = 22\na / b = 3 (整数除法截断)\na % b = 2\na++ = 17  之后 a=18' },

          { t: 'h2', x: '比较与逻辑' },
          { t: 'p', x: '`&&` 和 `||` 是**短路**的：左操作数已能决定结果时，右操作数根本不会执行。这一特性常被用来做「空指针保护」：`if (p && p->ok())`。' },
          { t: 'code', lang: 'cpp', title: '比较与逻辑', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    int x = 7;',
              '    std::cout << "(x > 5 && x < 10) = " << (x > 5 && x < 10) << std::endl;',
              '    std::cout << "(x == 7 || x == 8) = " << (x == 7 || x == 8) << std::endl;',
              '    std::cout << "!(x > 10) = " << (!(x > 10)) << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '(x > 5 && x < 10) = 1\n(x == 7 || x == 8) = 1\n!(x > 10) = 1' },

          { t: 'h2', x: '位运算' },
          { t: 'p', x: '位运算直接操作二进制位，在底层、加密、压缩、状态标志里极常用。理解 `&`（与）、`|`（或）、`^`（异或）、`<<`（左移，等价于乘 2 的幂）是基本功。' },
          { t: 'code', lang: 'cpp', title: '位运算', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    int a = 6;   // 二进制 110',
              '    int b = 3;   // 二进制 011',
              '    std::cout << "6 & 3 = " << (a & b) << std::endl;   // 010 = 2',
              '    std::cout << "6 | 3 = " << (a | b) << std::endl;   // 111 = 7',
              '    std::cout << "6 ^ 3 = " << (a ^ b) << std::endl;   // 101 = 5',
              '    std::cout << "6 << 1 = " << (a << 1) << std::endl; // 1100 = 12',
              '    return 0;',
              '}'
            ],
            expect: '6 & 3 = 2\n6 | 3 = 7\n6 ^ 3 = 5\n6 << 1 = 12' },

          { t: 'h2', x: 'C++ 的特色：运算符重载' },
          { t: 'p', x: '在 C 里，两个结构体相加得自己写函数；在 C++ 里，你可以让 `+` 直接作用于自定义类型。这背后的机制叫**运算符重载**。`std::string` 的 `+`、`std::cout` 的 `<<` 都是这么来的。' },
          { t: 'code', lang: 'cpp', title: '为向量定义 + 运算符', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'struct Vector {',
              '    double x, y;',
              '    Vector operator+(const Vector& other) const {',
              '        return Vector{x + other.x, y + other.y};',
              '    }',
              '};',
              '',
              'int main() {',
              '    Vector a{1, 2}, b{3, 4};',
              '    Vector c = a + b;',
              '    std::cout << "a + b = (" << c.x << ", " << c.y << ")" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'a + b = (4, 6)' },

          { t: 'note', k: 'tip', title: '运算符重载的节制',
            x: '能重载不代表该滥用。重载应保持运算符的「直觉语义」：`+` 就该是「相加」，`<<` 在流里是「输出」。把一个完全不相干的操作绑到 `*` 上，只会让读代码的人崩溃。C++ 的威力在于克制使用。' },

          { t: 'kp', x: [
            '整数除法截断取整；`%` 是取余',
            '`&&` / `||` 短路求值，可用来做安全判断',
            '位运算直接操作二进制，是底层开发的利器',
            '运算符重载让自定义类型用起来像内置类型',
            '重载要保持语义直觉，不可滥用'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '算算 17/5 的商和余数，再试试后置自增', lang: 'cpp',
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    int a = 17, b = 5;',
              '    std::cout << a << " / " << b << " = " << a / b << std::endl;',
              '    std::cout << a << " % " << b << " = " << a % b << std::endl;',
              '    int c = a++;',
              '    std::cout << "c = " << c << ", a = " << a << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '17 / 5 = 3\n17 % 5 = 2\nc = 17, a = 18',
            hint: '整数除法截断，a++ 先返回原值再加',
            ans: '17/5=3（截断），17%5=2（余2）。a++ 把 17 赋给 c 后 a 才变成 18。cout 自动处理类型，不用写格式符。' },
          { t: 'think', q: '短路求值是什么？为什么它很有用？',
            ans: '&& 在左边已经为 false 时不再算右边，|| 在左边已经为 true 时不再算右边。这让你可以写 if (p != nullptr && p->ok())——如果 p 是空指针，右边根本不会执行，避免了崩溃。' },
          { t: 'think', q: 'C++ 中 ++i 和 i++ 有什么区别？为什么在迭代器上推荐用 ++i？',
            ans: '++i 是先自增再返回新值，i++ 是先返回旧值再自增。对于 int 来说两者性能一样（编译器会优化），但对于**迭代器**等复杂类型，i++ 需要创建一个临时对象保存旧值再返回，而 ++i 直接返回引用，没有额外开销。所以在范围 for、STL 算法等场景中，习惯写 ++it 而不是 it++，这是 C++ 的性能最佳实践。' }
        ]
      },

      /* ==================================================== 6 控制流 */
      {
        id: 'control',
        title: '控制流',
        sub: 'if / for / while / switch，以及现代的范围 for',
        blocks: [
          { t: 'h2', x: '选择：if / else' },
          { t: 'p', x: 'C++ 用花括号 `{}` 划定代码块（不像 Python 用缩进）。条件表达式必须产生 `bool`；非零值当作「真」。忘记写 `{}` 是常见 bug——即使只有一行，也建议始终加上。' },
          { t: 'code', lang: 'cpp', title: 'if / else if / else', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    int score = 85;',
              '    if (score >= 90) {',
              '        std::cout << "优秀" << std::endl;',
              '    } else if (score >= 60) {',
              '        std::cout << "及格" << std::endl;',
              '    } else {',
              '        std::cout << "不及格" << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '及格' },

          { t: 'h2', x: '循环：for' },
          { t: 'code', lang: 'cpp', title: '经典三段式 for', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    for (int i = 1; i <= 5; ++i) {',
              '        std::cout << "i = " << i << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: 'i = 1\ni = 2\ni = 3\ni = 4\ni = 5' },

          { t: 'h2', x: '循环：while 与 do-while' },
          { t: 'p', x: '`while` 先判断后执行；`do-while` **至少执行一次**，因为条件在末尾。注意二者语义差异——需要「先做一次再判断」时用 `do-while`。' },
          { t: 'code', lang: 'cpp', title: 'while 与 do-while', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    int n = 3;',
              '    while (n > 0) {',
              '        std::cout << "倒数 " << n << std::endl;',
              '        --n;',
              '    }',
              '    int m = 0;',
              '    do {',
              '        std::cout << "至少执行一次: m=" << m << std::endl;',
              '    } while (m > 0);',
              '    return 0;',
              '}'
            ],
            expect: '倒数 3\n倒数 2\n倒数 1\n至少执行一次: m=0' },

          { t: 'h2', x: '多路分支：switch' },
          { t: 'p', x: '`switch` 根据整数/枚举值跳转分支。**每个 `case` 末尾要写 `break`**，否则会「穿透」到下一个分支——这是 C/C++ 最经典的坑之一。忘写 `break` 常常导致难以察觉的逻辑错误。' },
          { t: 'code', lang: 'cpp', title: 'switch 与 break', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    int day = 3;',
              '    switch (day) {',
              '        case 1: std::cout << "周一" << std::endl; break;',
              '        case 2: std::cout << "周二" << std::endl; break;',
              '        case 3: std::cout << "周三" << std::endl; break;',
              '        default: std::cout << "其他" << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '周三' },

          { t: 'h2', x: '现代写法：范围 for（C++11）' },
          { t: 'p', x: '遍历整个容器时，经典 `for` 要你管索引和下标，既啰嗦又容易越界。C++11 引入的**范围 for**（也叫 for-each）让「对容器里每个元素做某事」变得一行就能写完，且不可能越界。这是现代 C++ 的日常主力写法。' },
          { t: 'code', lang: 'cpp', title: '范围 for 遍历 vector', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    std::vector<int> nums = {10, 20, 30};',
              '    for (int v : nums) {',
              '        std::cout << "元素: " << v << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '元素: 10\n元素: 20\n元素: 30' },

          { t: 'note', k: 'info', title: '要修改元素？加引用',
            x: '范围 for 默认是「按值拷贝」，改 `v` 不会影响容器。想就地修改，写成 `for (int& v : nums)`，用引用绑定到原元素。只读遍历推荐 `for (const int& v : nums)`，避免不必要的拷贝。' },

          { t: 'h2', x: 'break 与 continue' },
          { t: 'p', x: '`break` 立刻结束整个循环；`continue` 跳过本次剩余、进入下一轮。两者在搜索、过滤场景里极常用。' },
          { t: 'code', lang: 'cpp', title: 'break 与 continue', run: true,
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    for (int i = 1; i <= 6; ++i) {',
              '        if (i == 3) continue;   // 跳过 3',
              '        if (i == 5) break;       // 到 5 就停',
              '        std::cout << i << " ";',
              '    }',
              '    std::cout << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '1 2 4 ' },

          { t: 'kp', x: [
            '用 `{}` 划定代码块，始终为 if/循环加花括号更安全',
            '`while` 先判后做，`do-while` 至少做一次',
            '`switch` 的 `case` 末尾记得 `break`，否则会穿透',
            '范围 for 遍历容器既简洁又不会越界',
            '`break` 结束循环，`continue` 跳到下一轮'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用范围 for 求 vector 里所有元素的和', lang: 'cpp',
            code: [
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    std::vector<int> v = {2, 4, 6, 8, 10};',
              '    int sum = 0;',
              '    for (int x : v) sum += x;',
              '    std::cout << "总和 = " << sum << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '总和 = 30',
            hint: '2+4+6+8+10=30',
            ans: '范围 for 让遍历容器变得极简——不用管索引、不用怕越界，一行就搞定。2+4+6+8+10=30。' },
          { t: 'ex', q: '用 continue 跳过 3，打印 1 到 5 的其他数字', lang: 'cpp',
            code: [
              '#include <iostream>',
              '',
              'int main() {',
              '    for (int i = 1; i <= 5; i++) {',
              '        if (i == 3) continue;',
              '        std::cout << i << " ";',
              '    }',
              '    std::cout << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '1 2 4 5 ',
            hint: 'continue 跳过本次循环剩余部分，直接进入下一轮',
            ans: 'i=3 时触发 continue，跳过打印，直接进入下一轮。最终输出 1 2 4 5（注意末尾有空格）。' },
          { t: 'think', q: '范围 for 里想修改元素，应该怎么写？',
            ans: '默认 for (int x : v) 是按值拷贝，改 x 不影响容器。要就地修改要写成 for (int& x : v)，让 x 成为容器元素的引用。只读遍历则推荐 for (const int& x : v) 避免拷贝。' },
          { t: 'think', q: 'switch 语句中 case 标签可以用变量吗？为什么？',
            ans: '不行。case 标签必须是**编译期常量**（整数常量、枚举值、constexpr 变量），不能是运行时变量。因为 switch 在编译时会被优化成跳转表或二分查找，需要在编译期就知道所有分支的值。如果需要根据运行时变量做多路分支，应该用 if-else if 链，或者 C++17 的 if constexpr（仅限编译期条件）。' }
        ]
      },

      /* ==================================================== 7 函数 */
      {
        id: 'functions',
        title: '函数',
        sub: '函数、引用参数、重载与默认参数',
        blocks: [
          { t: 'h2', x: '函数的基本形态' },
          { t: 'p', x: 'C++ 函数必须声明**返回类型**和**参数类型**（C 允许省略返回类型当作 int，C++ 不允许）。参数默认是「按值传递」——函数拿到的是实参的**一份拷贝**，改它不影响外面。' },
          { t: 'code', lang: 'cpp', title: '定义与调用', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int add(int a, int b) {',
              '    return a + b;',
              '}',
              '',
              'int main() {',
              '    std::cout << "add(3, 4) = " << add(3, 4) << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'add(3, 4) = 7' },

          { t: 'h2', x: '引用参数：避开拷贝、修改实参' },
          { t: 'p', x: '这是 C++ 相对 C 指针更优雅的一处。`int& a` 表示「a 是外面那个变量的**别名**（引用）」，对它赋值就是改外面的变量，又不用像指针那样写 `*` 和 `&`。`swap` 是最经典的教学例子。' },
          { t: 'code', lang: 'cpp', title: '用引用实现交换', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'void swap(int& a, int& b) {',
              '    int tmp = a;',
              '    a = b;',
              '    b = tmp;',
              '}',
              '',
              'int main() {',
              '    int x = 1, y = 2;',
              '    std::cout << "交换前: x=" << x << " y=" << y << std::endl;',
              '    swap(x, y);',
              '    std::cout << "交换后: x=" << x << " y=" << y << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '交换前: x=1 y=2\n交换后: x=2 y=1' },

          { t: 'h2', x: 'const 引用：只读、又省拷贝' },
          { t: 'p', x: '传大对象（如长字符串、大容器）时，按值传递会**整个拷贝**一份，很浪费。用 `const std::string&` 既能避免拷贝，又保证函数内不会修改它——这是 C++ 函数参数的「默认最优解」。' },
          { t: 'code', lang: 'cpp', title: 'const 引用参数', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <string>',
              '',
              'void greet(const std::string& name) {',
              '    std::cout << "你好, " << name << std::endl;',
              '    // name = "x";  // 报错：const 引用不可修改',
              '}',
              '',
              'int main() {',
              '    greet("Alice");',
              '    return 0;',
              '}'
            ],
            expect: '你好, Alice' },

          { t: 'h2', x: '函数重载' },
          { t: 'p', x: 'C++ 允许**同名函数**存在，只要参数类型或个数不同。编译器根据调用时的实参自动选最合适的版本。这让 `max`、`print` 这类通用操作用一个名字就能覆盖多种类型。' },
          { t: 'code', lang: 'cpp', title: '重载 max', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'int max(int a, int b) { return a > b ? a : b; }',
              'double max(double a, double b) { return a > b ? a : b; }',
              '',
              'int main() {',
              '    std::cout << "max(3, 7) = " << max(3, 7) << std::endl;',
              '    std::cout << "max(3.14, 2.71) = " << max(3.14, 2.71) << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'max(3, 7) = 7\nmax(3.14, 2.71) = 3.14' },

          { t: 'h2', x: '默认参数' },
          { t: 'p', x: '可以为参数提供默认值，调用时省略就使用默认。规则：**默认参数必须从右往左连续**，因为实参是按位置匹配的。' },
          { t: 'code', lang: 'cpp', title: '带默认参数的函数', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'void log(const std::string& msg, bool with_time = true) {',
              '    if (with_time) std::cout << "[LOG] ";',
              '    std::cout << msg << std::endl;',
              '}',
              '',
              'int main() {',
              '    log("系统启动");',
              '    log("调试信息", false);',
              '    return 0;',
              '}'
            ],
            expect: '[LOG] 系统启动\n调试信息' },

          { t: 'h2', x: '返回多个值：用引用“带出”结果' },
          { t: 'p', x: 'C++ 函数只能返回一个值。需要返回多个结果时，常见做法是用引用参数把结果「带」出去（C 的惯用法），或返回一个 `struct`/`std::pair`（现代更推荐）。' },
          { t: 'code', lang: 'cpp', title: '用引用返回商和余数', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'void divmod(int a, int b, int& q, int& r) {',
              '    q = a / b;',
              '    r = a % b;',
              '}',
              '',
              'int main() {',
              '    int q, r;',
              '    divmod(17, 5, q, r);',
              '    std::cout << "17 / 5 = " << q << " 余 " << r << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '17 / 5 = 3 余 2' },

          { t: 'note', k: 'tip', title: '现代多值返回：std::tuple + 结构化绑定',
            x: 'C++17 之后更优雅的写法是返回 `std::tuple` 并用结构化绑定接收：`auto [q, r] = divmod(17, 5);`。本章先建立引用参数的直觉，进阶写法留到「现代 C++」一章。' },

          { t: 'kp', x: [
            '函数必须显式声明返回类型和参数类型',
            '默认按值传递（拷贝）；想改外面用引用 `T&`',
            '`const T&` 是大对象参数的黄金准则：不拷贝、不改',
            '同名不同参可重载，编译期自动选版本',
            '默认参数从右往左连续；多返回值用引用或 tuple'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个 add 函数返回两个数之和', lang: 'cpp',
            code: [
              '#include <iostream>',
              '',
              'int add(int a, int b) {',
              '    return a + b;',
              '}',
              '',
              'int main() {',
              '    std::cout << "add(10, 20) = " << add(10, 20) << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'add(10, 20) = 30',
            hint: '函数定义在 main 之前就不用写声明了',
            ans: '10+20=30。函数把逻辑封装起来，调用时只关心输入输出。' },
          { t: 'ex', q: '用引用参数让函数真正修改变量', lang: 'cpp',
            code: [
              '#include <iostream>',
              '',
              'void inc(int& x) {',
              '    x++;',
              '}',
              '',
              'int main() {',
              '    int n = 5;',
              '    inc(n);',
              '    std::cout << "n = " << n << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'n = 6',
            hint: 'int& x 是引用，对 x 赋值就是改外面的变量',
            ans: 'n 从 5 变成了 6！int& x 是外面 n 的别名，x++ 就是 n++。和 C 的按值传递不同，C++ 的引用参数能直接修改外部变量。' },
          { t: 'think', q: '为什么大对象做函数参数时推荐用 const 引用？',
            ans: '按值传参会把整个对象拷贝一份（比如一个 1MB 的 vector），又慢又浪费内存。写成 const std::string& 既避免了拷贝，又保证函数不会修改它——性能和安全两不误。' },
          { t: 'think', q: '函数重载是怎么实现的？为什么 C 不支持函数重载而 C++ 支持？',
            ans: 'C++ 通过**名字修饰（name mangling）**实现重载：编译器把函数名和参数类型编码成一个唯一的符号名（比如 void foo(int) 变成 _Z3fooi，void foo(double) 变成 _Z3food），链接器就能区分它们。C 不做名字修饰，函数名就是符号名，所以同名函数会冲突。这也解释了为什么 C++ 函数要在 C 里调用必须加 extern "C"——它告诉编译器不要修饰名字，用 C 的链接方式。' }
        ]
      },

      /* ==================================================== 8 开发环境与工具链 */
      {
        id: 'devtools',
        title: '开发环境与工具链',
        sub: '从编译器到包管理，搭建专业 C++ 开发环境',
        blocks: [
          { t: 'h2', x: '编译器选择' },
          { t: 'defs', x: [
            { term: 'GCC', desc: 'GNU Compiler Collection，最经典的 C++ 编译器，Linux 默认。g++ -std=c++20 -Wall -Wextra -Wpedantic -g -O2。支持 C++11/14/17/20/23。' },
            { term: 'Clang', desc: 'LLVM 项目的 C++ 编译器，错误提示更友好，编译速度更快，静态分析和工具链强大。clang++ -std=c++20 -Weverything。macOS 默认（Xcode 命令行工具）。' },
            { term: 'MSVC', desc: 'Microsoft Visual C++，Windows 平台编译器，Visual Studio 内置。cl /std:c++20 /W4 /Zi /O2。Windows 开发首选，C++20 模块支持最好。' },
            { term: 'MinGW-w64', desc: 'Windows 上的 GCC 移植，支持 64 位 Windows。MSYS2 环境提供完整的 GCC + Make + CMake + 包管理（pacman）。' }
          ]},
          { t: 'code', lang: 'shell', title: 'GCC/Clang 常用编译选项', run: false,
            code: [
              'g++ -std=c++20 -Wall -Wextra -Wpedantic -Wconversion -g -O2 -o program main.cpp',
              '',
              '# -std=c++20        使用 C++20 标准',
              '# -Wall             开启常用警告',
              '# -Wextra           开启额外警告',
              '# -Wpedantic        严格遵循标准',
              '# -Wconversion      隐式转换警告',
              '# -g                生成调试信息',
              '# -O2               优化级别 2',
              '# -o program        输出文件名',
              '',
              '# 多文件编译',
              'g++ -c main.cpp -o main.o',
              'g++ -c utils.cpp -o utils.o',
              'g++ main.o utils.o -o program'
            ]},
          { t: 'h2', x: '构建工具' },
          { t: 'defs', x: [
            { term: 'CMake', desc: 'C++ 构建系统事实标准，跨平台，生成 Makefile/Ninja/Visual Studio/Xcode 项目。CMakeLists.txt 定义构建。现代 CMake（target_*）是推荐写法。' },
            { term: 'Make', desc: '经典构建工具，Makefile 定义目标和依赖。适合中小型项目。隐式规则、变量、模式规则。' },
            { term: 'Meson', desc: '现代构建系统，Python 编写，比 CMake 更快更简单。meson.build 定义构建，Ninja 作为后端。GNOME、Systemd 等项目使用。' },
            { term: 'Ninja', desc: '极速构建执行器，比 Make 快 10 倍以上。通常作为 CMake/Meson 的后端。' },
            { term: 'Bazel', desc: 'Google 出品的构建系统，支持多语言、分布式缓存、可复现构建。大型项目（Google、TensorFlow）使用。' },
            { term: 'xmake', desc: '轻量现代构建工具，Lua 脚本，类似 Meson 但更轻量。支持包管理、远程编译、WASM。' }
          ]},
          { t: 'code', lang: 'cmake', title: '现代 CMakeLists.txt', run: false,
            code: [
              'cmake_minimum_required(VERSION 3.20)',
              'project(MyProject VERSION 1.0.0 LANGUAGES CXX)',
              '',
              'set(CMAKE_CXX_STANDARD 20)',
              'set(CMAKE_CXX_STANDARD_REQUIRED ON)',
              'set(CMAKE_CXX_EXTENSIONS OFF)',
              '',
              '# 导出 compile_commands.json（clangd 用）',
              'set(CMAKE_EXPORT_COMPILE_COMMANDS ON)',
              '',
              '# 可执行文件',
              'add_executable(program main.cpp utils.cpp)',
              '',
              '# 编译选项',
              'target_compile_features(program PRIVATE cxx_std_20)',
              'if(MSVC)',
              '  target_compile_options(program PRIVATE /W4 /WX)',
              'else()',
              '  target_compile_options(program PRIVATE -Wall -Wextra -Wpedantic -Werror)',
              'endif()',
              '',
              '# 链接库',
              '# find_package(Threads REQUIRED)',
              '# target_link_libraries(program PRIVATE Threads::Threads)',
              '',
              '# 安装',
              'install(TARGETS program DESTINATION bin)'
            ]},
          { t: 'h2', x: '包管理' },
          { t: 'defs', x: [
            { term: 'vcpkg', desc: 'Microsoft 出品的 C++ 包管理器，跨平台，2000+ 库。vcpkg install boost fmt spdlog。与 CMake 集成良好（find_package）。适合 Windows 和跨平台项目。' },
            { term: 'Conan', desc: '去中心化 C++ 包管理器，Python 编写，支持多配置（Debug/Release）、多编译器、二进制缓存。conanfile.txt / conanfile.py 定义依赖。适合大型项目。' },
            { term: 'Hunter', desc: '基于 CMake 的包管理器，下载并构建依赖，完全集成到 CMake 构建流程。hunter_add_package(Boost)。' },
            { term: 'CPM.cmake', desc: '极简 CMake 包管理，基于 FetchContent，单文件包含。CPMAddPackage("gh:fmtlib/fmt#10.2.1")。零配置，适合小型项目。' },
            { term: '系统包管理器', desc: 'Linux 上用 apt/yum/dnf/pacman 安装开发库（libboost-dev、libfmt-dev）。macOS 用 Homebrew（brew install boost fmt）。' }
          ]},
          { t: 'code', lang: 'shell', title: 'vcpkg 常用命令', run: false,
            code: [
              '# 安装 vcpkg',
              'git clone https://github.com/microsoft/vcpkg',
              './vcpkg/bootstrap-vcpkg.sh',
              '',
              '# 搜索和安装库',
              'vcpkg search boost',
              'vcpkg install boost fmt spdlog nlohmann-json',
              '',
              '# 与 CMake 集成',
              'cmake -B build -DCMAKE_TOOLCHAIN_FILE=$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake',
              '',
              '# CMakeLists.txt 中',
              'find_package(fmt REQUIRED)',
              'find_package(spdlog REQUIRED)',
              'target_link_libraries(program PRIVATE fmt::fmt spdlog::spdlog)'
            ]},
          { t: 'h2', x: 'IDE 与编辑器' },
          { t: 'defs', x: [
            { term: 'CLion', desc: 'JetBrains 出品的 C/C++ IDE，付费。智能补全、重构、调试、CMake 集成、Valgrind 集成、CPU  profiler都是顶级。专业 C++ 开发首选。' },
            { term: 'Visual Studio', desc: 'Windows 平台 C++ 开发首选，Community 版免费。MSVC 编译器、调试器、性能分析器、静态分析、CMake 支持集成度极高。' },
            { term: 'VS Code', desc: '免费轻量，安装 C/C++ 扩展（Microsoft 或 clangd）+ CMake Tools 后支持智能补全、调试、lint。配合 clangd 体验更好。' },
            { term: 'Qt Creator', desc: 'Qt 官方 IDE，跨平台，对 Qt 项目支持最好。也支持普通 CMake 项目。' },
            { term: 'Vim/Neovim + clangd', desc: '终端党首选，clangd 提供 LSP 智能补全（需要 compile_commands.json），配合 coc.nvim/nvim-lspconfig。调试用 vimspector。' }
          ]},
          { t: 'h2', x: '调试工具' },
          { t: 'defs', x: [
            { term: 'GDB', desc: 'GNU 调试器，Linux 默认。gdb ./program。break/run/next/step/print/backtrace/continue。支持 Python 脚本、反向调试。' },
            { term: 'LLDB', desc: 'LLVM 调试器，macOS 默认（Xcode 内置）。API 更现代，Python 脚本支持更好。命令类似 GDB。' },
            { term: 'Visual Studio Debugger', desc: 'Windows 平台最强调试器，支持断点条件、数据断点、IntelliTrace、时间旅行调试（TTD）、并行堆栈。' },
            { term: 'Valgrind', desc: '内存调试和性能分析工具集。Memcheck 检测内存泄漏、越界访问、使用未初始化内存。Callgrind 性能分析。Linux 平台。' },
            { term: 'AddressSanitizer', desc: '编译器内置内存错误检测，比 Valgrind 快 10-100 倍。g++ -fsanitize=address -g。检测越界、使用后释放、内存泄漏。' },
            { term: 'UndefinedBehaviorSanitizer', desc: '检测未定义行为：整数溢出、空指针解引用、对齐错误。g++ -fsanitize=undefined。' },
            { term: 'ThreadSanitizer', desc: '检测数据竞争和死锁。g++ -fsanitize=thread。多线程程序必备。' },
            { term: 'perf / VTune', desc: '性能分析。perf 是 Linux 内核级性能分析器。VTune 是 Intel 出品的专业性能分析器，支持 CPU/GPU/FPGA。' }
          ]},
          { t: 'h2', x: '静态分析与代码质量' },
          { t: 'defs', x: [
            { term: 'clang-tidy', desc: 'LLVM 静态分析工具，基于 Clang AST，检测 bug、性能问题、可读性问题、C++ Core Guidelines 违规。支持自定义检查和自动修复（-fix）。.clang-tidy 配置文件。' },
            { term: 'cppcheck', desc: 'C/C++ 静态分析工具，检测未使用变量、数组越界、内存泄漏、空指针解引用。cppcheck --enable=all --inconclusive .' },
            { term: 'C++ Core Guidelines', desc: 'Stroustrup 和 Sutter 主编的 C++ 编码规范，涵盖类型安全、资源管理、并发、性能。clang-tidy 的 cppcoreguidelines-* 检查规则基于此。' },
            { term: 'clang-format', desc: '代码格式化工具，LLVM 出品。.clang-format 配置文件，支持 Google/LLVM/Mozilla/WebKit/Chromium 等预设风格。保存时自动格式化。' },
            { term: 'include-what-you-use', desc: '基于 Clang 的头文件清理工具，检测缺失和多余的 #include。帮助减少编译时间和依赖。' },
            { term: 'CCache / SCCache', desc: '编译缓存工具，缓存编译结果，重复编译时直接命中缓存，提速 5-10 倍。CCache 支持 GCC/Clang，SCCache 支持分布式缓存（Redis/S3）。' }
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            '编译器：GCC（Linux 默认）、Clang（macOS/更好的工具链）、MSVC（Windows）、MinGW-w64（Windows 上的 GCC）',
            '编译选项：-std=c++20 -Wall -Wextra -Wpedantic -g -O2 必开，警告就是错误',
            '构建：CMake（事实标准，现代 target_* 写法）、Make（中小型）、Meson（现代轻量）、Ninja（极速执行）',
            '包管理：vcpkg（Microsoft，跨平台）、Conan（去中心化，大型项目）、CPM（极简 FetchContent）、系统包管理器',
            'IDE：CLion（专业首选）、Visual Studio（Windows）、VS Code + clangd（免费）、Qt Creator（Qt 项目）',
            '调试：GDB/LLDB（断点调试）、Valgrind（内存检测）、AddressSanitizer/UBSan/TSan（编译器内置，更快）',
            '静态分析：clang-tidy（C++ Core Guidelines）、cppcheck；格式化：clang-format；编译缓存：CCache'
          ]}
        ]
      },

      /* ==================================================== 9 STL 容器 */
      {
        id: 'collections',
        title: 'STL 容器',
        sub: 'vector / map / set / array——C++ 最值得骄傲的武器库',
        blocks: [
          { t: 'h2', x: '为什么需要容器' },
          { t: 'p', x: 'C 只有「裸数组」：大小固定、不记录长度、越界不报错、传参退化成指针。C++ 的 **STL（标准模板库）** 提供了一系列「智能容器」，它们**自动管理内存、自带长度、提供丰富操作**，还遵循统一的接口约定。这是从 C 转向 C++ 收益最大的一块。' },
          { t: 'note', k: 'info', title: 'RAII：容器背后的魔法',
            x: 'STL 容器遵循 **RAII**（资源获取即初始化）：容器对象在栈上创建，析构时自动释放内部堆内存。你几乎从不需要手动 `new`/`delete` 来管理一串数据——这正是 C++ 防内存泄漏的核心思想。' },

          { t: 'defs', x: [
            { term: 'STL', desc: '标准模板库（Standard Template Library），C++ 标准库的核心部分，包含容器（vector/map/set）、算法（sort/find）、迭代器三大组件，是泛型编程的典范。' },
            { term: '迭代器（Iterator）', desc: '类似指针的对象，用于遍历容器元素。begin() 返回首元素迭代器，end() 返回尾后迭代器。是算法和容器之间的桥梁，让 sort、find 等算法通吃所有容器。' },
            { term: 'RAII', desc: '资源获取即初始化：对象构造时获取资源、析构时自动释放。vector 离开作用域自动释放内存，unique_ptr 自动 delete，都是 RAII 的体现，从根本上杜绝资源泄漏。' },
            { term: '容器（Container）', desc: '管理一组元素的数据结构，自动管理内存、自带长度、提供统一接口。序列容器（vector/array）按顺序存储，关联容器（map/set）按 key 排序存储。' }
          ]},

          { t: 'note', k: 'warn', title: '迭代器失效是 C++ 容器的高频坑',
            x: '对 vector 调用 push_back/insert 可能触发扩容，导致所有迭代器、引用、指针失效；对 vector 调用 erase 会使被删元素之后的迭代器失效；对 map/set 调用 erase 只使被删元素的迭代器失效。修改容器后，之前保存的迭代器不要继续使用，需要重新获取。' },

          { t: 'h2', x: 'vector：可动态增长的数组' },
          { t: 'p', x: '`std::vector` 是最常用的容器——它在内存里是**连续存储**的（和数组一样快），但能随时 `push_back` 扩容。随机访问 `v[i]` 是 O(1)。几乎所有的「一串同类型数据」都应该先想到它。' },
          { t: 'code', lang: 'cpp', title: 'vector 基础', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    std::vector<int> v;',
              '    v.push_back(10);',
              '    v.push_back(20);',
              '    v.push_back(30);',
              '    std::cout << "大小=" << v.size() << std::endl;',
              '    for (size_t i = 0; i < v.size(); ++i) {',
              '        std::cout << "v[" << i << "]=" << v[i] << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '大小=3\nv[0]=10\nv[1]=20\nv[2]=30' },

          { t: 'h2', x: 'vector 的常用操作' },
          { t: 'p', x: '除了 `push_back`，vector 还支持 `front`/`back` 取首尾、`pop_back` 删尾、`insert`/`erase` 插入删除。注意 `pop_back` 不返回被删元素，要先读再删。' },
          { t: 'code', lang: 'cpp', title: '首尾操作与遍历', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    std::vector<int> v = {5, 2, 8, 1};',
              '    v.push_back(9);',
              '    std::cout << "首=" << v.front() << " 尾=" << v.back() << std::endl;',
              '    v.pop_back();',
              '    std::cout << "pop 后大小=" << v.size() << std::endl;',
              '    for (int x : v) std::cout << x << " ";',
              '    std::cout << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '首=5 尾=9\npop 后大小=4\n5 2 8 1 ' },

          { t: 'h2', x: 'map：键值对（红黑树，自动排序）' },
          { t: 'p', x: '`std::map<Key, Value>` 是「键到值的字典」，底层是红黑树，所以**按键有序**，查找、插入、删除都是 O(log n)。想用字符串当索引查数据？map 就是答案。C++17 起还能用 `[]` 下标直接存取。' },
          { t: 'code', lang: 'cpp', title: 'map 字典', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <map>',
              '#include <string>',
              '',
              'int main() {',
              '    std::map<std::string, int> ages;',
              '    ages["Alice"] = 20;',
              '    ages["Bob"] = 25;',
              '    ages["Carol"] = 22;',
              '    ages["Alice"]++;',
              '    for (auto& kv : ages) {',
              '        std::cout << kv.first << " : " << kv.second << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: 'Alice : 21\nBob : 25\nCarol : 22' },

          { t: 'h2', x: 'set：自动去重且有序的集合' },
          { t: 'p', x: '`std::set` 只存「键」、自动去重、自动排序。往里塞一堆重复数字，出来就是排好序的唯一值。底层同样是红黑树。需要「是否存在」「去重」时用它。' },
          { t: 'code', lang: 'cpp', title: 'set 去重排序', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <set>',
              '',
              'int main() {',
              '    std::set<int> s = {3, 1, 4, 1, 5, 9, 3};',
              '    std::cout << "去重后元素个数=" << s.size() << std::endl;',
              '    for (int x : s) std::cout << x << " ";',
              '    std::cout << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '去重后元素个数=5\n1 3 4 5 9 ' },

          { t: 'h2', x: 'array：栈上的固定数组（C 数组的安全版）' },
          { t: 'p', x: '如果你**确实**需要编译期固定大小（比如一个 3D 坐标的 3 个分量），用 `std::array` 而不是 C 风格 `int a[3]`。它大小和性能与 C 数组一致，但知道自己的 `size()`、能整体拷贝、能用在容器算法里。' },
          { t: 'code', lang: 'cpp', title: 'array 固定数组', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <array>',
              '',
              'int main() {',
              '    std::array<int, 3> a = {1, 2, 3};',
              '    std::cout << "大小固定为 " << a.size() << std::endl;',
              '    for (int x : a) std::cout << x << " ";',
              '    std::cout << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '大小固定为 3\n1 2 3 ' },

          { t: 'h2', x: '算法：<algorithm> 让容器如虎添翼' },
          { t: 'p', x: 'STL 的精髓是「**容器与算法分离**」：算法（如 `sort`、`find`、`binary_search`）以「迭代器区间」为参数，能作用于任何容器。写排序不必自己写快排——一行 `std::sort` 搞定。' },
          { t: 'code', lang: 'cpp', title: '用算法排序与查找', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '#include <algorithm>',
              '',
              'int main() {',
              '    std::vector<int> v = {5, 2, 8, 1, 9};',
              '    std::sort(v.begin(), v.end());',
              '    std::cout << "排序后: ";',
              '    for (int x : v) std::cout << x << " ";',
              '    std::cout << std::endl;',
              '    int target = 8;',
              '    bool found = std::binary_search(v.begin(), v.end(), target);',
              '    std::cout << "是否包含 " << target << ": " << (found ? "是" : "否") << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '排序后: 1 2 5 8 9 \n是否包含 8: 是' },

          { t: 'note', k: 'tip', title: '还有这些常用容器',
            x: '本章讲透四大主力。其余值得认识的：`deque`（双端队列）、`list`（双向链表）、`unordered_map/unordered_set`（哈希实现、平均 O(1)、不排序）、`stack`/`queue`（适配器）。按需取用，别死记。' },

          { t: 'kp', x: [
            'STL 容器自动管理内存（RAII），告别手动 new/delete',
            '`vector` 是默认首选：连续存储、可增长、随机访问快',
            '`map` 键值对、自动按键排序；`set` 去重排序',
            '`array` 是 C 固定数组的安全替代',
            '`<algorithm>` 的 sort/find 等算法作用于迭代器区间'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 vector 装几个数字，排序后打印出来', lang: 'cpp',
            code: [
              '#include <iostream>',
              '#include <vector>',
              '#include <algorithm>',
              '',
              'int main() {',
              '    std::vector<int> v = {5, 2, 8, 1, 9};',
              '    std::sort(v.begin(), v.end());',
              '    for (int x : v) std::cout << x << " ";',
              '    std::cout << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '1 2 5 8 9 ',
            hint: 'std::sort 作用于 [begin, end) 区间',
            ans: '5 个数字排序后变成 1 2 5 8 9。你不需要自己写排序算法，一行 std::sort 就搞定——这就是 STL 容器 + 算法的威力。' },
          { t: 'think', q: 'vector 和 array 有什么区别？什么时候用哪个？',
            ans: 'vector 可以动态增长，内存分配在堆上，是最常用的默认选择；array 大小在编译期固定，分配在栈上，性能更好但不能动态扩容。当你明确知道元素数量不变（比如 3D 坐标的三个分量）时用 array，否则一律用 vector。' },
          { t: 'think', q: 'vector 的 push_back 为什么可能导致之前获取的引用或迭代器失效？',
            ans: 'vector 在内存中是连续存储的。push_back 时如果当前容量不够，vector 会**重新分配一块更大的内存**（通常扩一倍），把旧元素拷贝过去，然后释放旧内存。这时候旧内存上的所有引用、指针、迭代器全部失效——它们指向的是已经被释放的内存。所以规则：在可能触发扩容的操作（push_back、insert、emplace_back）之后，不要使用之前保存的迭代器或引用，需要重新获取。' }
        ]
      },

      /* ==================================================== 9 面向对象 */
      {
        id: 'oop',
        title: '类与对象',
        sub: '封装、继承、多态，以及构造函数与访问控制',
        blocks: [
          { t: 'h2', x: '类：把数据和行为绑在一起' },
          { t: 'p', x: 'C 的结构体只能装数据；C++ 的 `class`/`struct` 还能装**函数（成员方法）**，并且能控制哪些对外可见。这就是「对象」——一个自带能力的、封装好的数据块。' },
          { t: 'code', lang: 'cpp', title: '第一个类', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <string>',
              '',
              'class Dog {',
              'public:',
              '    std::string name;',
              '    void bark() {',
              '        std::cout << name << " 汪汪!" << std::endl;',
              '    }',
              '};',
              '',
              'int main() {',
              '    Dog d;',
              '    d.name = "旺财";',
              '    d.bark();',
              '    return 0;',
              '}'
            ],
            expect: '旺财 汪汪!' },

          { t: 'h2', x: '封装：用访问控制保护数据' },
          { t: 'p', x: '`public` 对外公开，`private` 只内部可见。把数据设为 `private`、通过 `public` 方法访问，能防止外部乱改导致对象处于非法状态——这就是**封装**。银行账户余额不该被外部随意改成 9999。' },
          { t: 'code', lang: 'cpp', title: '封装：私有数据 + 公开接口', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <string>',
              '',
              'class BankAccount {',
              'private:',
              '    double balance = 0;',
              'public:',
              '    void deposit(double amount) {',
              '        if (amount > 0) balance += amount;',
              '    }',
              '    double get_balance() const {',
              '        return balance;',
              '    }',
              '};',
              '',
              'int main() {',
              '    BankAccount acc;',
              '    acc.deposit(100);',
              '    acc.deposit(50);',
              '    std::cout << "余额: " << acc.get_balance() << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '余额: 150' },

          { t: 'h2', x: '构造函数：对象出生的仪式' },
          { t: 'p', x: '构造函数和类同名、无返回类型，在对象创建时自动调用，用来做初始化。用**初始化列表** `: x(x_), y(y_)` 在构造函数体执行前就完成成员初始化，比在函数体内赋值更高效、也更正确（对 `const` 成员是必须的）。' },
          { t: 'code', lang: 'cpp', title: '构造函数与初始化列表', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'class Point {',
              'public:',
              '    int x, y;',
              '    Point(int x_, int y_) : x(x_), y(y_) {',
              '        std::cout << "构造 Point(" << x << ", " << y << ")" << std::endl;',
              '    }',
              '};',
              '',
              'int main() {',
              '    Point p(3, 4);',
              '    std::cout << "p = (" << p.x << ", " << p.y << ")" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '构造 Point(3, 4)\np = (3, 4)' },

          { t: 'h2', x: '继承：复用并扩展' },
          { t: 'p', x: '`class Cat : public Animal` 表示 Cat「是一种」Animal，自动获得父类的公开成员。继承让「共性上提、个性下沉」，是代码复用的核心手段。' },
          { t: 'code', lang: 'cpp', title: '继承示例', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'class Animal {',
              'public:',
              '    void eat() { std::cout << "吃东西" << std::endl; }',
              '};',
              '',
              'class Cat : public Animal {',
              'public:',
              '    void meow() { std::cout << "喵~" << std::endl; }',
              '};',
              '',
              'int main() {',
              '    Cat c;',
              '    c.eat();',
              '    c.meow();',
              '    return 0;',
              '}'
            ],
            expect: '吃东西\n喵~' },

          { t: 'h2', x: '多态：同一接口，不同行为' },
          { t: 'p', x: '**多态**是 OOP 最强大的特性。把父类指针指向子类对象，调用「虚函数」时，程序会在**运行时**根据实际类型选择正确版本——父类无需知道子类细节，却能正确调用子类行为。这正是框架与插件机制的基石。' },
          { t: 'code', lang: 'cpp', title: '虚函数实现多态', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'class Shape {',
              'public:',
              '    virtual void draw() { std::cout << "画图形" << std::endl; }',
              '    virtual ~Shape() {}',
              '};',
              '',
              'class Circle : public Shape {',
              'public:',
              '    void draw() override { std::cout << "画圆" << std::endl; }',
              '};',
              '',
              'int main() {',
              '    Shape* s = new Circle();',
              '    s->draw();        // 运行时根据实际类型调用',
              '    delete s;',
              '    return 0;',
              '}'
            ],
            expect: '画圆' },

          { t: 'note', k: 'warn', title: '别忘了虚析构函数',
            x: '通过父类指针 `delete` 子类对象时，若父类析构不是 `virtual`，子类的析构不会被调用，导致内存泄漏。规则：**只要类可能被继承并通过基类指针删除，基类析构就应该是 `virtual` 的。**' },

          { t: 'h2', x: '抽象类：只定接口，不写实现' },
          { t: 'p', x: '把虚函数写成「纯虚函数」`= 0`，这个类就成了**抽象类**——不能实例化，只作为接口规范。子类必须实现它，否则也仍是抽象类。这是 C++ 表达「契约」的方式。' },
          { t: 'code', lang: 'cpp', title: '纯虚函数与抽象类', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'class Animal {',
              'public:',
              '    virtual void speak() = 0;   // 纯虚函数 -> 抽象类',
              '    virtual ~Animal() {}',
              '};',
              '',
              'class Dog : public Animal {',
              'public:',
              '    void speak() override { std::cout << "汪汪" << std::endl; }',
              '};',
              '',
              'int main() {',
              '    Dog d;',
              '    d.speak();',
              '    return 0;',
              '}'
            ],
            expect: '汪汪' },

          { t: 'kp', x: [
            '`class` 把数据和方法绑在一起；`struct` 默认公开',
            '`private` 保护数据，`public` 提供接口 = 封装',
            '构造函数用初始化列表 `: x(x_)` 更高效',
            '继承 `: public` 复用父类；多态靠 `virtual` 虚函数',
            '基类若被多态使用，析构必须是 `virtual`',
            '纯虚函数 `= 0` 定义接口（抽象类）'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '定义一个 Dog 类，构造时给名字，bark() 打印叫声', lang: 'cpp',
            code: [
              '#include <iostream>',
              '#include <string>',
              '',
              'class Dog {',
              'public:',
              '    std::string name;',
              '    Dog(std::string n) : name(n) {}',
              '    void bark() {',
              '        std::cout << name << " 说: 汪!" << std::endl;',
              '    }',
              '};',
              '',
              'int main() {',
              '    Dog d("旺财");',
              '    d.bark();',
              '    return 0;',
              '}'
            ],
            expect: '旺财 说: 汪!',
            hint: '构造函数用初始化列表 : name(n) 初始化成员',
            ans: 'Dog 类把 name（数据）和 bark（行为）绑在一起。创建 d 时自动调用构造函数设好名字，调用 d.bark() 就打印叫声。' },
          { t: 'ex', q: '写一个 Counter 类，inc() 加一，get() 读取当前值', lang: 'cpp',
            code: [
              '#include <iostream>',
              '',
              'class Counter {',
              '    int count = 0;',
              'public:',
              '    void inc() { count++; }',
              '    int get() const { return count; }',
              '};',
              '',
              'int main() {',
              '    Counter c;',
              '    c.inc();',
              '    c.inc();',
              '    c.inc();',
              '    std::cout << "count = " << c.get() << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'count = 3',
            hint: 'count 是 private，外部只能通过 inc/get 访问',
            ans: '调用三次 inc()，count 从 0 变成 3。count 是 private 的，外部不能直接改，只能通过公开接口操作——这就是封装。' },
          { t: 'think', q: '为什么基类如果可能被继承，析构函数要写成 virtual？',
            ans: '当你用基类指针 delete 子类对象时，如果基类析构不是 virtual，只会调用基类的析构函数，子类的析构被跳过，导致子类资源泄漏。规则：只要类会被多态使用，析构就该是 virtual。' },
          { t: 'think', q: '成员初始化列表和在构造函数体内赋值有什么区别？为什么推荐用初始化列表？',
            ans: '初始化列表在对象构造时**直接初始化**成员，而构造函数体内赋值是先默认初始化成员、再赋值覆盖。对于 const 成员、引用成员、没有默认构造函数的成员，**必须**用初始化列表（因为它们不能先默认构造再赋值）。即使是普通成员，初始化列表也更高效（少一次默认构造 + 赋值的开销）。所以 C++ 的最佳实践是：能用初始化列表就不用函数体内赋值。' }
        ]
      },

      /* ==================================================== 10 异常 */
      {
        id: 'errors',
        title: '异常处理',
        sub: 'try / catch / throw、noexcept 与异常安全',
        blocks: [
          { t: 'h2', x: '为什么用异常，而不是错误码' },
          { t: 'p', x: 'C 习惯用返回值（如 `-1`、`NULL`）表示错误，调用者得**每次都记得检查**，忘了就带着错误往下跑。C++ 的**异常**能把错误沿着调用栈自动向上传播，直到有人处理——中间层不用写一堆 `if (err) return err;`，代码干净得多。' },

          { t: 'defs', x: [
            { term: '异常（Exception）', desc: '程序运行时发生的错误对象，通过 throw 抛出、catch 捕获。异常沿调用栈向上传播，中间函数不需要显式传递错误码，直到被某个 catch 处理。' },
            { term: '栈展开（Stack Unwinding）', desc: '异常抛出后，程序沿调用栈向上寻找匹配的 catch，期间自动销毁所有局部对象（调用析构函数）。这保证了异常发生时资源不会泄漏——前提是用 RAII 管理资源。' },
            { term: 'noexcept', desc: '标记函数「承诺不抛出异常」的关键字。若函数内抛出异常，直接调用 std::terminate 终止程序。标记 noexcept 能让编译器优化，也影响 vector 扩容时选择移动还是拷贝。' },
            { term: '异常安全', desc: '保证异常发生时资源不泄漏、对象状态不被破坏的编程约定。分三个等级：基本保证（不泄漏、状态合法）、强保证（要么成功要么回滚）、不抛异常保证（绝不会抛）。' }
          ]},

          { t: 'note', k: 'warn', title: '析构函数不要抛出异常',
            x: '如果析构函数抛出异常，而此时正在因为另一个异常进行栈展开（调用析构函数），C++ 会直接调用 std::terminate 终止程序——两个异常同时存在无法处理。所以析构函数应该默认 noexcept，内部用 try/catch 吞掉可能的异常，或至少确保不向外抛。' },

          { t: 'h2', x: 'try / catch / throw 三件套' },
          { t: 'p', x: '`throw` 抛出一个异常对象；`try` 包裹可能出错的代码；`catch` 捕获并处理。一旦抛出，控制流立刻跳到最近的 `catch`，跳过中间所有代码——这就是「栈展开」。' },
          { t: 'code', lang: 'cpp', title: '抛出并捕获异常', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <stdexcept>',
              '#include <string>',
              '',
              'int divide(int a, int b) {',
              '    if (b == 0) {',
              '        throw std::runtime_error("除数不能为 0");',
              '    }',
              '    return a / b;',
              '}',
              '',
              'int main() {',
              '    try {',
              '        std::cout << divide(10, 2) << std::endl;',
              '        std::cout << divide(10, 0) << std::endl;',
              '    } catch (const std::runtime_error& e) {',
              '        std::cout << "捕获异常: " << e.what() << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '5\n捕获异常: 除数不能为 0' },

          { t: 'h2', x: '捕获顺序：先具体后宽泛' },
          { t: 'p', x: '`catch` 是按**顺序**匹配的，所以从最具体的派生类写到最宽泛的基类 `std::exception`。所有标准异常都继承自 `std::exception`，它的 `what()` 返回错误描述。' },
          { t: 'code', lang: 'cpp', title: '多 catch 分支', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <stdexcept>',
              '',
              'int main() {',
              '    try {',
              '        throw std::out_of_range("越界");',
              '    } catch (const std::out_of_range& e) {',
              '        std::cout << "范围错误: " << e.what() << std::endl;',
              '    } catch (const std::exception& e) {',
              '        std::cout << "其他异常: " << e.what() << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '范围错误: 越界' },

          { t: 'h2', x: 'noexcept：给编译器的承诺' },
          { t: 'p', x: '`noexcept` 声明「这个函数保证不抛异常」。它既是给调用者的契约，也让编译器**免去栈展开的准备**、生成更快的代码。移动构造函数、析构函数默认就应是 `noexcept`。' },
          { t: 'code', lang: 'cpp', title: 'noexcept 函数', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'void safe() noexcept {',
              '    std::cout << "这个函数保证不抛异常" << std::endl;',
              '}',
              '',
              'int main() {',
              '    safe();',
              '    std::cout << "noexcept 让编译器做更多优化" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '这个函数保证不抛异常\nnoexcept 让编译器做更多优化' },

          { t: 'h2', x: '自定义异常类型' },
          { t: 'p', x: '继承自 `std::exception` 并重写 `what()`，就能拥有带业务含义的异常类型，让上层 `catch` 精确区分「网络错误」「校验错误」等。' },
          { t: 'code', lang: 'cpp', title: '自定义异常', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <exception>',
              '',
              'struct MyError : public std::exception {',
              '    const char* what() const noexcept override {',
              '        return "我的自定义错误";',
              '    }',
              '};',
              '',
              'int main() {',
              '    try {',
              '        throw MyError();',
              '    } catch (const std::exception& e) {',
              '        std::cout << "捕获: " << e.what() << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '捕获: 我的自定义错误' },

          { t: 'note', k: 'info', title: '异常安全与 RAII 是绝配',
            x: '异常会在任何一行突然跳出，若手动 `new` 了内存却没释放就 `throw`，就泄漏了。但用智能指针/容器（RAII），它们在栈展开时自动析构释放——所以「现代 C++ 不用裸指针管理资源」才敢放心用异常。下一章详述。' },

          { t: 'kp', x: [
            '异常把错误沿调用栈自动上抛，避免每层 `if (err) return`',
            '`throw` 抛出、`try` 包裹、`catch` 捕获',
            '`catch` 按声明顺序匹配，先具体（派生）后宽泛（基类）',
            '`noexcept` 承诺不抛异常，助编译器优化',
            '自定义异常继承 `std::exception` 并重写 `what()`',
            'RAII + 异常 = 安全的资源管理'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个 divide 函数，除零时抛异常并用 try/catch 捕获', lang: 'cpp',
            code: [
              '#include <iostream>',
              '#include <stdexcept>',
              '',
              'int divide(int a, int b) {',
              '    if (b == 0) throw std::runtime_error("除数为零");',
              '    return a / b;',
              '}',
              '',
              'int main() {',
              '    try {',
              '        std::cout << divide(10, 2) << std::endl;',
              '    } catch (const std::exception& e) {',
              '        std::cout << "错误: " << e.what() << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '5',
            hint: '10/2=5，没有触发异常，所以 catch 分支不执行',
            ans: '10/2=5，正常打印。因为没有除零，throw 没被触发，catch 块根本不会执行——try 里的代码一路跑完。' },
          { t: 'think', q: 'catch 的顺序为什么要先写具体异常、后写宽泛异常？',
            ans: 'catch 是按代码顺序匹配的。如果先写 catch (const std::exception&)，它能匹配所有派生类异常，后面更具体的 catch (const std::out_of_range&) 永远不会被执行。所以必须从最具体的派生类写到最宽泛的基类。' },
          { t: 'think', q: 'noexcept 关键字有什么用？标记了 noexcept 的函数如果抛出异常会怎样？',
            ans: 'noexcept 是「承诺不抛出异常」的标记。它有两个作用：一是告诉编译器可以优化（不需要生成异常处理的栈展开代码）；二是让标准库在移动构造函数等场景选择更高效的路径（vector 扩容时，如果元素的移动构造是 noexcept，就会用移动而不是拷贝）。如果标记了 noexcept 的函数真的抛出了异常，程序会直接调用 std::terminate 终止——不会栈展开，局部对象可能不被析构。所以 noexcept 是严肃的承诺，只在确定不会抛异常时使用。' }
        ]
      },

      /* ==================================================== 11 现代 C++ */
      {
        id: 'modern',
        title: '现代 C++',
        sub: 'auto、范围 for、智能指针、lambda、constexpr、结构化绑定',
        blocks: [
          { t: 'h2', x: '现代 C++ 是什么' },
          { t: 'p', x: '2011 年的 C++11 是一次「重生」，之后 C++14/17/20 持续加料。现代 C++ 的目标很明确：**让你写得更少、更安全，同时不损失性能**。本章把最常用的现代特性串起来——它们是今天写 C++ 的「默认姿势」。' },

          { t: 'h2', x: 'auto：让编译器推导类型' },
          { t: 'p', x: '`auto` 把「写出复杂类型名」的活儿交给编译器，代码更短、更易改。常用于迭代器这种又长又臭的类型。注意 `auto` 是「推导」，不是「动态类型」——类型在编译期就定了。' },
          { t: 'code', lang: 'cpp', title: 'auto 类型推导', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    auto x = 42;          // int',
              '    auto name = "C++";    // const char*',
              '    std::vector<int> v = {1, 2, 3};',
              '    for (auto it = v.begin(); it != v.end(); ++it) {',
              '        std::cout << *it << " ";',
              '    }',
              '    std::cout << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '1 2 3 ' },

          { t: 'h2', x: '范围 for（再会会老朋友）' },
          { t: 'p', x: '前面控制流章讲过，这里再见识它在算法里的威力：一行算总和，没有索引、没有越界风险。' },
          { t: 'code', lang: 'cpp', title: '范围 for 求和', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    std::vector<int> v = {1, 2, 3, 4};',
              '    int sum = 0;',
              '    for (int x : v) sum += x;',
              '    std::cout << "求和=" << sum << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '求和=10' },

          { t: 'h2', x: '智能指针：让内存自动回收（RAII 的巅峰）' },
          { t: 'p', x: 'C++ 最让人头疼的是「忘记 `delete` 导致内存泄漏」和「重复 `delete` 导致崩溃」。**智能指针**用 RAII 把这件事彻底自动化：`unique_ptr` 独占所有权、离开作用域自动释放；你基本不再需要手写 `new`/`delete`。这是现代 C++ 最重要的进步。' },
          { t: 'code', lang: 'cpp', title: 'unique_ptr 自动释放', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <memory>',
              '#include <string>',
              '',
              'struct Widget {',
              '    std::string name;',
              '    Widget(const std::string& n) : name(n) {',
              '        std::cout << "创建 " << name << std::endl;',
              '    }',
              '    ~Widget() {',
              '        std::cout << "销毁 " << name << std::endl;',
              '    }',
              '};',
              '',
              'int main() {',
              '    std::unique_ptr<Widget> w = std::make_unique<Widget>("按钮");',
              '    std::cout << "使用 " << w->name << std::endl;',
              '    // 离开作用域自动释放，无需 delete',
              '    return 0;',
              '}'
            ],
            expect: '创建 按钮\n使用 按钮\n销毁 按钮' },

          { t: 'h2', x: 'shared_ptr：共享所有权' },
          { t: 'p', x: '当多个地方要**共同拥有**同一对象（比如缓存、节点图），用 `shared_ptr`。它内部维护引用计数，最后一个持有者释放时才真正删除。注意循环引用要用 `weak_ptr` 打破，否则计数永不为 0。' },
          { t: 'code', lang: 'cpp', title: 'shared_ptr 引用计数', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <memory>',
              '',
              'int main() {',
              '    std::shared_ptr<int> a = std::make_shared<int>(10);',
              '    std::shared_ptr<int> b = a;   // 共享所有权',
              '    std::cout << "引用计数=" << a.use_count() << std::endl;',
              '    std::cout << "值=" << *a << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '引用计数=2\n值=10' },

          { t: 'h2', x: 'lambda：就地写匿名函数' },
          { t: 'p', x: '`lambda`（匿名函数）让「把一段逻辑作为参数传给算法」变得自然，比如自定义排序规则。写作 `[捕获](参数) { 体 }`。它在 STL 算法、回调、多线程里无处不在。' },
          { t: 'code', lang: 'cpp', title: 'lambda 自定义排序', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '#include <algorithm>',
              '',
              'int main() {',
              '    std::vector<int> v = {5, 2, 8, 1};',
              '    std::sort(v.begin(), v.end(), [](int a, int b) {',
              '        return a > b;   // 降序',
              '    });',
              '    for (int x : v) std::cout << x << " ";',
              '    std::cout << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '8 5 2 1 ' },

          { t: 'h2', x: 'constexpr：在编译期就算好' },
          { t: 'p', x: '`constexpr` 表示「这个值/函数能在编译期求值」。编译期算出结果意味着**运行时零成本**，且能用于数组大小等要求编译期常量的场合。越多的 `constexpr`，运行时越快。' },
          { t: 'code', lang: 'cpp', title: 'constexpr 编译期计算', run: true, ed: true,
            code: [
              '#include <iostream>',
              '',
              'constexpr int square(int n) {',
              '    return n * n;',
              '}',
              '',
              'int main() {',
              '    constexpr int s = square(9);',
              '    std::cout << "square(9) = " << s << " (编译期算出)" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'square(9) = 81 (编译期算出)' },

          { t: 'h2', x: '结构化绑定（C++17）' },
          { t: 'p', x: '遍历 `map` 时，键和值挤在一个 `pair` 里，访问得写 `kv.first`/`kv.second`，可读性差。结构化绑定 `auto& [key, value]` 把它们「拆包」成有意义的名字，代码立刻清爽。' },
          { t: 'code', lang: 'cpp', title: '结构化绑定拆包', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <map>',
              '#include <string>',
              '',
              'int main() {',
              '    std::map<std::string, int> m = {{"Alice", 20}, {"Bob", 25}};',
              '    for (auto& [key, value] : m) {',
              '        std::cout << key << " -> " << value << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: 'Alice -> 20\nBob -> 25' },

          { t: 'note', k: 'tip', title: '现代 C++ 的「三不」原则',
            x: '不裸 `new`/`delete`（用智能指针）；不手写循环而用算法+lambda；不写死类型名而用 `auto`。遵循这三点的代码，既短又安全，性能还不打折。' },

          { t: 'kp', x: [
            '`auto` 让编译器推导类型，代码更短更易改',
            '智能指针 `unique_ptr`/`shared_ptr` 自动管理内存（RAII）',
            'lambda 把逻辑当参数传，配合 `<algorithm>` 极好用',
            '`constexpr` 把计算搬到编译期，运行时零成本',
            '结构化绑定 `auto& [k, v]` 让拆包更可读',
            '现代 C++ 目标：更短、更安全、零开销'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 unique_ptr 管理一个 int 对象，离开作用域自动释放', lang: 'cpp',
            code: [
              '#include <iostream>',
              '#include <memory>',
              '',
              'int main() {',
              '    auto p = std::make_unique<int>(42);',
              '    std::cout << "*p = " << *p << std::endl;',
              '    std::cout << "离开作用域自动释放" << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '*p = 42\n离开作用域自动释放',
            hint: 'make_unique 自动分配内存，离开作用域自动 delete',
            ans: '你不需要手写 new 和 delete。unique_ptr 在离开作用域时自动释放内存，从根本上杜绝了内存泄漏。这就是 RAII 的威力。' },
          { t: 'think', q: 'unique_ptr 和 shared_ptr 有什么区别？',
            ans: 'unique_ptr 独占所有权，同一时间只有一个指针指向对象，不能拷贝只能移动，开销最小。shared_ptr 共享所有权，内部维护引用计数，最后一个持有者销毁时才释放对象。大多数情况优先用 unique_ptr，只有确实需要共享时才用 shared_ptr。' },
          { t: 'think', q: 'lambda 表达式的捕获列表中，[=] 和 [&] 有什么区别？各自的风险是什么？',
            ans: '[=] 按**值**捕获所有用到的外部变量（拷贝一份），lambda 内部修改不影响外部；[&] 按**引用**捕获所有外部变量，lambda 内部修改直接影响外部。[=] 的风险是拷贝大对象开销大，且捕获的是快照（外部变量后来变了 lambda 看不到）；[&] 的风险是**悬垂引用**——如果 lambda 的生命周期比被捕获的变量长（比如 lambda 被存起来异步执行），变量销毁后引用就失效了。最佳实践是显式列出要捕获的变量，而不是用 [=] 或 [&] 一把抓。' }
        ]
      },

      /* ==================================================== 调试与排错 */
      {
        id: 'debugging',
        title: '调试与排错',
        sub: '从模板报错到未捕获异常：C++ 调试的分层排查法',
        blocks: [
          { t: 'p', x: 'C++ 的报错信息以「又长又吓人」著称——模板实例化错误动辄几百行，未捕获异常直接 terminate。但只要建立分层思路，就不会被吓住。**编译期错误**先看最上面的第一条（后面都是级联），**运行期异常**看异常类型和 what()，**崩溃**用调试器看调用栈。核心原则和 C 一样：让工具告诉你真相，别靠肉眼猜。' },
          { t: 'p', x: '一个高效的 C++ 调试流程是：编译加 `-g -Wall -Wextra` 把警告全开，用 `std::cerr` 或日志插桩缩小范围，用 `assert`/`static_assert` 在开发期拦截不变量违反，最后用 gdb/lldb 精确定位。内存问题用 AddressSanitizer（比 valgrind 快很多），未定义行为用 UndefinedBehaviorSanitizer。' },

          { t: 'h2', x: '常见的坑' },
          { t: 'table', head: ['报错或现象', '原因', '处理办法'], rows: [
            ['`terminate called after throwing an instance of \'std::out_of_range\'`', '抛出了异常但没有被 catch，程序直接终止', '在合适的层级加 try/catch，或检查 vector::at() 的下标是否越界'],
            ['`error: no matching function for call to \'foo(int)\'`', '调用的函数没有匹配的重载：参数类型不对、缺少 const 限定、或函数根本没声明', '检查函数签名是否和调用一致，注意参数的 const/引用/值传递区别'],
            ['`Segmentation fault (core dumped)`', '空指针解引用、悬垂引用、迭代器失效后使用、数组越界', '用 gdb 看 bt 定位崩溃行，检查指针是否为 nullptr、引用的对象是否已销毁'],
            ['`error: \'vector\' does not name a type`', '用了 vector 但没写 std:: 前缀，也没 #include <vector>', '加上 #include <vector>，并写成 std::vector（或 using std::vector）'],
            ['`error: invalid use of non-static member function \'foo\'`', '把成员函数当普通函数用了，没通过对象调用，或没加 & 取地址', '成员函数必须通过对象调用 obj.foo()，取函数地址要写 &Class::foo'],
            ['程序偶发崩溃、数据错乱', '悬垂指针/引用：对象已销毁但指针还在用；或迭代器失效后继续使用', '用 AddressSanitizer 检测，检查容器扩容/删除后是否还持有旧引用或迭代器']
          ]},

          { t: 'h2', x: '调试手段' },
          { t: 'p', x: '最直接的手段是 **std::cerr 插桩**。和 std::cout 不同，cerr 是无缓冲的，打印后立即输出，不会因为程序崩溃而丢失。在关键位置打印变量值和「我跑到这里了」标记，逐步缩小崩溃范围。' },
          { t: 'code', lang: 'cpp', title: 'cerr 插桩定位崩溃', run: false, ed: false,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    std::vector<int> v = {1, 2, 3};',
              '    std::cerr << "[调试] v 大小 = " << v.size() << std::endl;',
              '    // cerr 无缓冲，崩溃前一定能看到这行',
              '    int *p = nullptr;',
              '    // *p = 42;  // 取消注释会段错误，用 cerr 确认前面没崩',
              '    std::cerr << "[调试] 到达终点" << std::endl;',
              '    return 0;',
              '}'
            ],
            note: 'cerr 无缓冲是关键——如果用 cout，程序崩溃时缓冲区里的打印可能还没输出，误导你以为程序没跑到那里。' },

          { t: 'p', x: '**static_assert** 是编译期断言，在编译时检查常量条件，失败直接报编译错误，不产生任何运行时代码。**assert** 是运行期断言，条件为假时终止程序。两者配合：编译期能确定的事用 static_assert，运行时变量状态用 assert。' },
          { t: 'code', lang: 'cpp', title: 'static_assert 与 assert 双保险', run: false, ed: false,
            code: [
              '#include <iostream>',
              '#include <cassert>',
              '#include <cstdint>',
              '',
              '// 编译期检查：确保 int 至少 4 字节',
              'static_assert(sizeof(int) >= 4, "int 必须至少 4 字节");',
              '',
              'double average(const int* arr, int n) {',
              '    assert(arr != nullptr);  // 运行期检查：指针不能为空',
              '    assert(n > 0);           // 运行期检查：元素个数必须为正',
              '    int sum = 0;',
              '    for (int i = 0; i < n; ++i) sum += arr[i];',
              '    return static_cast<double>(sum) / n;',
              '}',
              '',
              'int main() {',
              '    int data[3] = {10, 20, 30};',
              '    std::cout << "平均值 = " << average(data, 3) << std::endl;',
              '    return 0;',
              '}'
            ],
            note: 'static_assert 在编译时就拦住平台不兼容问题，assert 在运行时拦住逻辑错误。发布版定义 NDEBUG 后 assert 会被移除，但 static_assert 永远生效。' },

          { t: 'p', x: '当插桩和断言不够用时，上 **gdb/lldb 调试器**。C++ 的调试器还能查看虚函数表、智能指针的引用计数、容器内部结构。编译加 `-g` 保留调试信息，常用命令和 C 一样：break 设断点、run 运行、print 看变量、backtrace 看调用栈、next/step 单步。' },
          { t: 'code', lang: 'cpp', title: 'gdb 调试思维（C++ 版）', run: false, ed: false,
            code: [
              '/* 编译：g++ -g -Wall -std=c++17 demo.cpp -o demo */',
              '/* 启动：gdb ./demo */',
              '/* (gdb) break ClassName::method   ← 按成员函数名设断点 */',
              '/* (gdb) run                        ← 运行 */',
              '/* (gdb) print this                 ← 查看当前对象指针 */',
              '/* (gdb) print *this                ← 查看对象所有成员 */',
              '/* (gdb) print vec.size()           ← 调用容器成员函数查看大小 */',
              '/* (gdb) backtrace                  ← 查看调用栈（含虚函数分发） */',
              '/* (gdb) next / step                ← 单步（step 会进入函数） */',
              '',
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    std::vector<int> v = {3, 1, 4, 1, 5};',
              '    for (size_t i = 0; i < v.size(); ++i) {',
              '        std::cout << v[i] << " ";  // 在这里设断点看 i 和 v[i]',
              '    }',
              '    std::cout << std::endl;',
              '    return 0;',
              '}'
            ],
            note: 'C++ 调试器能直接 print 容器大小、对象成员，比 C 的裸内存友好得多。善用 print this 和 print *this 看对象状态。' },

          { t: 'note', k: 'tip', title: 'AddressSanitizer 比 valgrind 更适合 C++',
            x: '编译时加 `-fsanitize=address -g`，程序运行时会自动检测内存错误：越界、use-after-free、内存泄漏，报错信息精确到行号。比 valgrind 快 10 倍以上，是 C++ 内存调试的首选。还有 `-fsanitize=undefined` 检测未定义行为（如有符号整数溢出、空指针解引用）。' },
          { t: 'note', k: 'warn', title: '模板报错看第一条',
            x: '模板错误动辄输出几百行，别被吓到。**只看最上面的第一条 error**——后面的都是级联产生的。第一条会告诉你哪个模板、哪个类型、在哪个文件哪一行出了问题。如果还是看不懂，把模板参数替换成具体类型，手动展开一遍，问题往往就清楚了。' },

          { t: 'think', q: '程序输出 terminate called after throwing an instance of \'std::out_of_range\' 然后崩溃，这说明什么？该怎么排查？',
            ans: '说明程序抛出了 std::out_of_range 异常，但没有任何 catch 捕获它，导致 std::terminate 被调用、程序直接终止。std::out_of_range 最常见的来源是 vector::at() 下标越界（[] 不检查但 at() 会抛异常）、string::at()、或 bitset 的越界访问。排查方法：用 gdb 运行，崩溃时输入 bt 看调用栈，找到是哪个 at() 调用越界了，然后检查下标计算逻辑。' },
          { t: 'think', q: '为什么推荐用 AddressSanitizer 而不是只靠 printf 调试内存问题？',
            ans: '因为内存问题（越界、use-after-free、泄漏）往往是「隐性」的——越界写可能暂时不崩溃，只在某个时刻破坏了别的数据；use-after-free 可能读到的还是旧值，看起来正常。printf 只能看到你主动打印的变量，发现不了「偷偷摸摸」的内存破坏。AddressSanitizer 在每次内存访问时都做检查，一旦越界或访问已释放内存立即报错并精确到行号，比 printf 高效且可靠得多。' },

          { t: 'kp', x: [
            '编译期错误看第一条，后面都是级联；模板报错把参数代进去手动展开',
            '未捕获异常导致 terminate，用 gdb bt 看抛出点，补 try/catch 或修越界',
            'cerr 无缓冲，插桩调试比 cout 更可靠（崩溃前一定能输出）',
            'static_assert 编译期检查 + assert 运行期检查，双保险拦截不变量违反',
            'AddressSanitizer（-fsanitize=address）是 C++ 内存调试首选，比 valgrind 快 10 倍',
            '开发编译一律 -g -Wall -Wextra，警告就是编译器在帮你找 bug'
          ]}
        ]
      },

      /* ==================================================== 12 第三方库与生态 */
      {
        id: 'libraries',
        title: '第三方库与生态',
        sub: '从 Boost 到 Qt，掌握 C++ 最有价值的生态',
        blocks: [
          { t: 'h2', x: '标准库扩展' },
          { t: 'defs', x: [
            { term: 'Boost', desc: 'C++ 最经典的库集合，160+ 库，很多已进入标准（smart_ptr、thread、filesystem、regex、variant、optional）。跨平台、高质量、peer review。C++ 开发者的瑞士军刀。' },
            { term: 'Abseil', desc: 'Google 开源的 C++ 基础库，包含字符串处理（absl::StrCat/StrSplit）、时间（absl::Time）、同步原语（absl::Mutex）、容器（absl::flat_hash_map）、日志。Google 内部使用，生产级质量。' },
            { term: 'Folly', desc: 'Facebook 开源的 C++ 基础库，高性能、并发友好。包含 folly::fbstring（小字符串优化）、folly::ConcurrentHashMap、folly::Future（异步）、folly::IOBuf。Facebook 内部使用。' },
            { term: 'range-v3', desc: '范围库，C++20 ranges 的参考实现和超集。管道式操作：view::filter | view::transform | action::sort。Eric Niebler 出品，已部分进入 C++20 标准。' },
            { term: 'fmt', desc: '现代格式化库，{fmt} 语法，比 printf/iostream 更快更安全。std::format 的参考实现。fmt::format("Hello, {}!", name)。已进入 C++20 标准。' },
            { term: 'CTRE', desc: '编译期正则表达式库，正则在编译时解析，运行时零开销。ctre::match<"[a-z]+">(input)。Hana Dusíková 出品。' }
          ]},
          { t: 'code', lang: 'cpp', title: 'fmt + range-v3 示例', run: false,
            code: [
              '#include <fmt/ranges.h>',
              '#include <range/v3/all.hpp>',
              '#include <vector>',
              '#include <iostream>',
              '',
              'int main() {',
              '    std::vector<int> nums = {5, 2, 8, 1, 9, 3};',
              '',
              '    // 管道式操作：过滤偶数 → 乘2 → 排序',
              '    auto result = nums',
              '        | ranges::views::filter([](int n) { return n % 2 == 0; })',
              '        | ranges::views::transform([](int n) { return n * 2; })',
              '        | ranges::to<std::vector>();',
              '',
              '    // fmt 格式化输出',
              '    fmt::print("结果: {}\\n", result);  // 结果: [4, 16]',
              '    fmt::print("最大值: {}\\n", ranges::max(result));',
              '    return 0;',
              '}'
            ]},
          { t: 'h2', x: 'GUI 框架' },
          { t: 'defs', x: [
            { term: 'Qt', desc: '最流行的跨平台 C++ GUI 框架，Widget + QML 双引擎。信号槽机制、模型视图、网络、数据库、多媒体、3D。商业授权 + LGPL。KDE、VLC、WPS、VirtualBox 使用。Qt 6 是最新版本。' },
            { term: 'wxWidgets', desc: '老牌跨平台 GUI 框架，原生控件（Windows 用 Win32、macOS 用 Cocoa、Linux 用 GTK）。LGPL 授权，免费商用。API 类似 MFC。' },
            { term: 'GTKmm', desc: 'GTK 的 C++ 封装，GNOME 桌面环境使用。跨平台，LGPL 授权。面向对象风格，信号槽（libsigc++）。' },
            { term: 'Dear ImGui', desc: '即时模式 GUI 库，极简 API，无回调，立即渲染。适合工具、调试器、游戏编辑器。ImGui::Begin/Button/Text/End。Omar Cornut 出品。' },
            { term: 'SFML', desc: '多媒体库，窗口、输入、图形、音频、网络。简单 API，适合 2D 游戏和多媒体应用。zlib 授权。' },
            { term: 'FLTK', desc: '轻量跨平台 GUI 库，体积极小（<1MB），启动快。适合小型工具和嵌入式。LGPL 授权。' }
          ]},
          { t: 'h2', x: '网络编程与 Web 框架' },
          { t: 'defs', x: [
            { term: 'Boost.Asio', desc: '异步网络编程库，跨平台，proactor 模式。io_context、ip::tcp::socket、async_read/async_write。C++ 网络编程事实标准，很多 Web 框架的底层。' },
            { term: 'libcurl', desc: '最流行的 HTTP/FTP 客户端库，支持几乎所有协议。curl_easy_init/setopt/perform。跨平台，C 语言但 C++ 友好。' },
            { term: 'Drogon', desc: '高性能 C++17 Web 框架，基于 Boost.Asio/epoll，支持 HTTP/1.1、WebSocket、ORM、插件、模板。性能极强（TechEmpower 排名前列）。' },
            { term: 'Crow', desc: '极简 C++ Web 框架，类似 Flask，单文件（crow_all.h），基于 Boost.Asio。CROW_ROUTE(app, "/hello")([](){ return "Hello"; })。' },
            { term: 'Oat++', desc: '高性能 Web 框架，支持 REST、WebSocket、Swagger、ORM、依赖注入。对象映射（DTO），类型安全。Apache 2.0 授权。' },
            { term: 'Poco', desc: '全功能 C++ 库，网络（HTTP/SSL/FTP/SMTP）、数据库、XML/JSON、日志、加密、进程间通信。类似 C++ 的 Java 标准库。Boost 授权。' },
            { term: 'cpp-httplib', desc: '单文件 HTTP 客户端/服务器库，头文件-only，极简 API。httplib::Client cli("http://example.com"); auto res = cli.Get("/api");。适合简单 HTTP 需求。' }
          ]},
          { t: 'code', lang: 'cpp', title: 'Crow Web 服务示例', run: false,
            code: [
              '#include "crow.h"',
              '#include <string>',
              '',
              'int main() {',
              '    crow::SimpleApp app;',
              '',
              '    // 基础路由',
              '    CROW_ROUTE(app, "/")([](){',
              '        return "Hello, World!";',
              '    });',
              '',
              '    // 带参数的路由',
              '    CROW_ROUTE(app, "/hello/<string>")([](const std::string& name){',
              '        return crow::response("Hello, " + name + "!");',
              '    });',
              '',
              '    // JSON API',
              '    CROW_ROUTE(app, "/api/user/<int>")([](int id){',
              '        crow::json::wvalue user;',
              '        user["id"] = id;',
              '        user["name"] = "Alice";',
              '        user["age"] = 25;',
              '        return user;',
              '    });',
              '',
              '    app.port(8080).multithreaded().run();',
              '    return 0;',
              '}'
            ]},
          { t: 'h2', x: '数据库' },
          { t: 'defs', x: [
            { term: 'SQLite', desc: '嵌入式关系型数据库，单文件、零配置、ACID。C 语言接口，C++ 封装有 SQLiteCpp、sqlite_orm、sqlpp11。全世界部署最广的数据库。' },
            { term: 'libpqxx', desc: 'PostgreSQL 官方 C++ 客户端库，类型安全、事务支持、连接池。pqxx::connection/work/result。' },
            { term: 'MySQL Connector/C++', desc: 'MySQL 官方 C++ 连接器，支持 X DevAPI（NoSQL 风格）和传统 JDBC 风格 API。' },
            { term: 'Redis++', desc: 'Redis C++ 客户端，基于 hiredis，支持同步/异步、连接池、管道、发布订阅、Redis 模块。sewenew 出品。' },
            { term: 'RocksDB', desc: 'Facebook 出品的嵌入式键值数据库，LSM 树存储，写性能极佳，支持列族、事务、TTL。LevelDB 的增强版。Facebook、LinkedIn、CockroachDB 使用。' },
            { term: 'LevelDB', desc: 'Google 出品的嵌入式键值数据库，LSM 树，写性能好。轻量、快速。Chrome、Node.js 使用。' },
            { term: 'ODB', desc: 'C++ ORM，编译期生成数据库访问代码，支持 SQLite/MySQL/PostgreSQL。对象持久化、事务、视图。Code Synthesis 出品。' }
          ]},
          { t: 'h2', x: 'JSON / XML / 序列化' },
          { t: 'defs', x: [
            { term: 'nlohmann/json', desc: '最流行的 C++ JSON 库，单文件、头文件-only，API 直观（json j; j["name"] = "Alice";）。支持 JSON Pointer、JSON Patch、CBOR、MessagePack。MIT 授权。' },
            { term: 'RapidJSON', desc: '腾讯出品的高性能 JSON 库，SAX/DOM 双模式，零拷贝、内存池。比 nlohmann/json 快 5-10 倍。适合性能敏感场景。' },
            { term: 'jsoncpp', desc: '老牌 JSON 库，CDN 托管，API 类似 nlohmann/json。历史悠久，很多老项目使用。' },
            { term: 'pugixml', desc: '轻量 XML 解析库，单文件、极快、XPath 1.0 支持。比 TinyXML 快 10 倍以上。适合 XML 配置和文档。' },
            { term: 'TinyXML-2', desc: '极简 XML 解析库，单文件，API 简单。适合小型 XML 需求。' },
            { term: 'Protocol Buffers', desc: 'Google 出品的序列化框架，IDL 定义消息，编译生成 C++/Java/Python 代码。二进制格式，比 JSON 小 3-10 倍、快 10-100 倍。gRPC 的基础。' },
            { term: 'FlatBuffers', desc: 'Google 出品的序列化框架，零拷贝、零解析，直接访问序列化数据。适合游戏、高性能通信。比 Protobuf 更快但 API 稍复杂。' },
            { term: 'Cap\'n Proto', desc: 'Kenton Varda（Protobuf 作者之一）出品的序列化框架，零拷贝、时间旅行 RPC、能力安全。比 FlatBuffers 更激进。' }
          ]},
          { t: 'code', lang: 'cpp', title: 'nlohmann/json 示例', run: false,
            code: [
              '#include <nlohmann/json.hpp>',
              '#include <iostream>',
              '#include <fstream>',
              '',
              'using json = nlohmann::json;',
              '',
              'int main() {',
              '    // 创建 JSON',
              '    json user;',
              '    user["id"] = 1;',
              '    user["name"] = "Alice";',
              '    user["age"] = 25;',
              '    user["hobbies"] = {"reading", "coding", "hiking"};',
              '    user["address"] = {{"city", "Beijing"}, {"zip", "100000"}};',
              '',
              '    // 序列化（带缩进）',
              '    std::cout << user.dump(4) << std::endl;',
              '',
              '    // 解析',
              '    std::string text = R"({"name": "Bob", "age": 30})";',
              '    json parsed = json::parse(text);',
              '    std::string name = parsed["name"];  // "Bob"',
              '    int age = parsed["age"];             // 30',
              '',
              '    // 类型安全访问',
              '    if (parsed.contains("email")) {',
              '        std::string email = parsed["email"].get<std::string>();',
              '    }',
              '    return 0;',
              '}'
            ]},
          { t: 'h2', x: '日志 / 测试 / 并发' },
          { t: 'defs', x: [
            { term: 'spdlog', desc: '极快的 C++ 日志库，头文件-only，异步日志、格式化（fmt）、多 sink（控制台/文件/旋转）。spdlog::info("Hello, {}!", name)。比 glog 快，API 更现代。' },
            { term: 'glog', desc: 'Google 出品的日志库，条件日志、崩溃转储、信号处理。LOG(INFO) << "message"。Google 内部使用，生产级。' },
            { term: 'Google Test', desc: '最流行的 C++ 单元测试框架，TEST/TEST_F/EXPECT_EQ/ASSERT_EQ。Mock 框架 Google Mock。xUnit 风格，跨平台。' },
            { term: 'Catch2', desc: '现代 C++ 测试框架，单文件、头文件-only，BDD 风格（SECTION/GIVEN/WHEN/THEN），表达式分解。比 Google Test 更轻量。' },
            { term: 'doctest', desc: '最轻量的 C++ 测试框架，编译速度极快，可嵌入生产代码。API 类似 Catch2 但更小更快。' },
            { term: 'TBB', desc: 'Intel Threading Building Blocks，任务并行库，parallel_for/parallel_reduce、并发容器（concurrent_vector/concurrent_hash_map）、任务调度器。高性能并行编程。' },
            { term: 'libunifex', desc: 'Facebook 出品的异步编程库，sender/receiver 模型，C++23 execution 的参考实现。结构化并发、取消、超时。比 std::future 更强大。' },
            { term: 'HPX', desc: 'C++ 标准库的分布式实现，全局地址空间，任务并行、futures、算法。适合高性能计算（HPC）。' }
          ]},
          { t: 'h2', x: '数学 / 科学 / 图形' },
          { t: 'defs', x: [
            { term: 'Eigen', desc: '最流行的 C++ 线性代数库，头文件-only，模板元编程，SIMD 优化。矩阵、向量、分解（LU/QR/SVD/Cholesky）、特征值。TensorFlow、ROS、Unity 使用。' },
            { term: 'Armadillo', desc: 'C++ 线性代数库，API 类似 MATLAB，高层接口，底层调用 LAPACK/BLAS。适合快速原型和科学计算。' },
            { term: 'OpenCV', desc: '计算机视觉库，图像处理、特征检测、目标识别、视频分析、机器学习。跨平台，C++/Python/Java 接口。计算机视觉事实标准。' },
            { term: 'CGAL', desc: '计算几何算法库，三角剖分、Voronoi 图、凸包、布尔运算、网格处理。学术级质量，几何计算事实标准。' },
            { term: 'Boost.Math', desc: '数学函数库，特殊函数（贝塞尔、伽马、椭圆积分）、统计分布、多项式、根查找、数值积分。' },
            { term: 'Vulkan', desc: '下一代跨平台 3D 图形 API，Khronos 出品，比 OpenGL 更低层、更高性能、多线程友好。Vulkan-Hpp 是 C++ 绑定。' },
            { term: 'bgfx', desc: '跨平台渲染库，封装 D3D/Metal/Vulkan/OpenGL，API 简洁，适合跨平台图形应用。Branimir Karadžić 出品。' },
            { term: 'SDL', desc: '跨平台多媒体库，窗口、输入、音频、2D 渲染。游戏开发基础库。Valve 维护，Steam 平台使用。' }
          ]},
          { t: 'h2', x: '机器学习 / AI' },
          { t: 'defs', x: [
            { term: 'PyTorch C++ API (LibTorch)', desc: 'PyTorch 的 C++ 前端，支持模型定义、训练、推理、自动微分。torch::nn::Module、torch::Tensor、torch::optim。生产环境部署 PyTorch 模型的首选。' },
            { term: 'ONNX Runtime', desc: 'Microsoft 出品的跨平台推理引擎，支持 ONNX 模型，CPU/GPU 加速，C/C++/Python/C# 接口。生产部署常用。' },
            { term: 'TensorFlow Lite', desc: 'TensorFlow 的轻量推理引擎，针对移动和嵌入式设备优化。C API 为主，C++ 封装可用。' },
            { term: 'MLPACK', desc: 'C++ 机器学习库，头文件-only，高性能，支持多种算法（线性回归、决策树、KNN、K-Means、神经网络）。类似 scikit-learn 的 C++ 版。' },
            { term: 'Shark', desc: 'C++ 机器学习库，支持监督学习、无监督学习、进化算法、优化。模块化设计，文档完善。' },
            { term: 'FANN', desc: '快速人工神经网络库，C 语言，C++ 封装可用。轻量、快速、易于使用。适合简单神经网络需求。' }
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            '标准库扩展：Boost（经典全能）、Abseil（Google）、Folly（Facebook）、range-v3（范围）、fmt（格式化）',
            'GUI：Qt（最流行）、wxWidgets（原生控件）、Dear ImGui（即时模式工具）、SFML（多媒体）',
            '网络：Boost.Asio（异步基础）、Drogon/Oat++/Crow（Web 框架）、libcurl（HTTP 客户端）、Poco（全功能）',
            '数据库：SQLite（嵌入式）、libpqxx（PostgreSQL）、Redis++（Redis）、RocksDB/LevelDB（键值）、ODB（ORM）',
            '序列化：nlohmann/json（最流行 JSON）、RapidJSON（高性能 JSON）、Protocol Buffers（Google 标准）、FlatBuffers/Cap\'n Proto（零拷贝）',
            '日志测试：spdlog（极快日志）、glog（Google 日志）、Google Test（测试标准）、Catch2/doctest（轻量测试）',
            '并发：TBB（任务并行）、libunifex（异步 sender/receiver）、HPX（分布式）',
            '科学图形：Eigen（线性代数）、OpenCV（计算机视觉）、CGAL（计算几何）、Vulkan/bgfx（图形）',
            'AI：LibTorch（PyTorch C++）、ONNX Runtime（推理）、MLPACK（机器学习）'
          ]}
        ]
      },

      /* ==================================================== 13 实战项目 */
      {
        id: 'projects',
        title: '综合实战',
        sub: '用 STL 搭一个学生管理系统',
        blocks: [
          { t: 'p', x: '这一章把前面学的容器、结构体、函数、现代特性串起来，做一个能在浏览器里直接运行的**简易学生管理系统**。重点是体会：**C++ 不靠花哨语法，靠「合适的容器 + 清晰的结构」把问题解掉**。' },

          { t: 'h2', x: '第一步：用结构体描述学生' },
          { t: 'p', x: '先定义「学生」这个数据形态：学号、姓名、成绩。用 `struct` 把三个字段打包，比散落的三个数组清晰得多——这就是「面向对象之前、却已结构化」的第一步。' },
          { t: 'code', lang: 'cpp', title: '结构体 + vector 存储', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '#include <string>',
              '',
              'struct Student {',
              '    int id;',
              '    std::string name;',
              '    int score;',
              '};',
              '',
              'int main() {',
              '    std::vector<Student> students;',
              '    students.push_back({1, "Alice", 90});',
              '    students.push_back({2, "Bob", 75});',
              '    students.push_back({3, "Carol", 88});',
              '',
              '    int total = 0;',
              '    for (auto& s : students) {',
              '        std::cout << s.id << " " << s.name << " " << s.score << std::endl;',
              '        total += s.score;',
              '    }',
              '    std::cout << "平均分=" << total / static_cast<int>(students.size()) << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '1 Alice 90\n2 Bob 75\n3 Carol 88\n平均分=84' },

          { t: 'h2', x: '第二步：按姓名快速查找（map）' },
          { t: 'p', x: '若用 `vector` 查找，得遍历全部；若按「姓名」索引，用 `map<string, int>` 直接 O(log n) 命中。STL 容器各有所长，选对容器问题就简单一半。' },
          { t: 'code', lang: 'cpp', title: '用 map 做成绩查询', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <map>',
              '#include <string>',
              '',
              'int main() {',
              '    std::map<std::string, int> scores;',
              '    scores["Alice"] = 90;',
              '    scores["Bob"] = 75;',
              '    scores["Carol"] = 88;',
              '',
              '    std::string query = "Bob";',
              '    auto it = scores.find(query);',
              '    if (it != scores.end()) {',
              '        std::cout << query << " 的成绩是 " << it->second << std::endl;',
              '    } else {',
              '        std::cout << "未找到 " << query << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: 'Bob 的成绩是 75' },

          { t: 'h2', x: '第三步：按成绩排序' },
          { t: 'p', x: '排名是刚需。用 `std::sort` 配合 lambda 自定义「按成绩降序」的比较规则，一行搞定——再次看到「容器 + 算法 + lambda」的现代组合拳。' },
          { t: 'code', lang: 'cpp', title: '按成绩降序排名', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '#include <algorithm>',
              '#include <string>',
              '',
              'struct Student { int id; std::string name; int score; };',
              '',
              'int main() {',
              '    std::vector<Student> v = {',
              '        {1, "Alice", 90}, {2, "Bob", 75}, {3, "Carol", 88}',
              '    };',
              '    std::sort(v.begin(), v.end(),',
              '        [](const Student& a, const Student& b) { return a.score > b.score; });',
              '    for (auto& s : v) {',
              '        std::cout << s.name << " : " << s.score << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: 'Alice : 90\nCarol : 88\nBob : 75' },

          { t: 'h2', x: '第四步：封装成类（完整可运行版）' },
          { t: 'p', x: '把「增删查」收进一个 `Manager` 类，对外只暴露 `add`/`remove`/`show`。这就是从「脚本式代码」走向「可维护程序」的关键一步：把数据和行为绑在一起，用 `private` 保护好内部状态。' },
          { t: 'code', lang: 'cpp', title: '封装后的学生管理系统', run: true, ed: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '#include <string>',
              '#include <algorithm>',
              '',
              'struct Student { int id; std::string name; int score; };',
              '',
              'class Manager {',
              '    std::vector<Student> list;',
              'public:',
              '    void add(int id, const std::string& name, int score) {',
              '        list.push_back({id, name, score});',
              '    }',
              '    void remove(int id) {',
              '        list.erase(std::remove_if(list.begin(), list.end(),',
              '            [id](const Student& s) { return s.id == id; }), list.end());',
              '    }',
              '    void show() const {',
              '        for (auto& s : list) {',
              '            std::cout << s.id << " " << s.name << " " << s.score << std::endl;',
              '        }',
              '    }',
              '};',
              '',
              'int main() {',
              '    Manager mgr;',
              '    mgr.add(1, "Alice", 90);',
              '    mgr.add(2, "Bob", 75);',
              '    mgr.remove(2);',
              '    std::cout << "剩余学生:" << std::endl;',
              '    mgr.show();',
              '    return 0;',
              '}'
            ],
            expect: '剩余学生:\n1 Alice 90' },

          { t: 'note', k: 'info', title: '这个项目还能怎么扩展',
            x: '真实系统会加上：从文件 `std::fstream` 读写数据、用 `std::unordered_map` 做 O(1) 学号索引、加异常处理防止非法输入、把成绩计算提取成 `const` 成员函数。每一步都只是把本章学过的内容拼起来——这就是 C++ 工程化的样子。' },

          { t: 'kp', x: [
            '用 `struct` 把相关数据打包，比散落变量清晰',
            '`vector` 存序列、`map` 做索引，选对容器事半功倍',
            '`sort` + lambda 轻松实现自定义排序',
            '把操作封装进 `class`，用 `private` 保护内部状态',
            '`remove_if` + `erase` 是「按条件删除」的标准惯用法'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 vector 装几种水果，范围 for 遍历打印', lang: 'cpp',
            code: [
              '#include <iostream>',
              '#include <vector>',
              '#include <string>',
              '',
              'int main() {',
              '    std::vector<std::string> fruits = {"苹果", "香蕉", "橙子"};',
              '    for (auto& f : fruits) {',
              '        std::cout << "- " << f << std::endl;',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '- 苹果\n- 香蕉\n- 橙子',
            hint: 'vector<string> 装字符串，auto& 避免拷贝',
            ans: '用 vector 存字符串，范围 for 遍历，每个元素前面加个短横线。三行输出，干净利落——这就是 STL + 现代写法的日常。' },
          { t: 'think', q: '学生管理系统项目中，为什么把数据和操作封装进 Manager 类比散着写更好？',
            ans: '封装后，外部只能通过 add/remove/show 这些公开接口操作数据，不能随意修改内部的 vector。这保证了对象始终处于合法状态，也让代码更容易维护和测试——改内部实现不影响外部调用。' },
          { t: 'think', q: '在学生管理系统中，如果用 std::map 按学号存储学生，相比 vector 有什么优势和劣势？',
            ans: '优势：map 按 key（学号）自动排序，查找是 O(log n) 而 vector 线性查找是 O(n)，插入/删除也保持有序且不需要手动移动元素。劣势：map 是红黑树实现，内存开销比 vector 大（每个节点有指针），不支持随机访问（不能用下标 O(1) 取第 k 个），遍历速度比连续存储的 vector 慢。如果数据量小、主要操作是遍历，vector 更合适；如果需要频繁按学号查找、插入删除，map 更合适。' }
        ]
      },

      /* ==================================================== 13 速查表 */
      {
        id: 'cheatsheet',
        title: '速查总结',
        sub: '把整门课的要点压成一张表',
        blocks: [
          { t: 'h2', x: '常用头文件' },
          { t: 'table',
            head: ['头文件', '提供', '典型用途'],
            rows: [
              ['`<iostream>`', '输入输出', '`std::cout` / `std::cin`'],
              ['`<string>`', '字符串', '`std::string`'],
              ['`<vector>`', '动态数组', '`std::vector`'],
              ['`<map>` / `<set>`', '有序关联容器', '字典 / 集合'],
              ['`<array>`', '固定数组', '`std::array`'],
              ['`<algorithm>`', '通用算法', '`sort` / `find`'],
              ['`<memory>`', '智能指针', '`unique_ptr` / `shared_ptr`'],
              ['`<stdexcept>`', '标准异常', '`runtime_error` 等']
            ]},

          { t: 'h2', x: '语法速查' },
          { t: 'table',
            head: ['场景', '写法'],
            rows: [
              ['输出一行', '`std::cout << x << std::endl;`'],
              ['定义函数', '`int f(int a, int b) { return a+b; }`'],
              ['引用参数', '`void g(int& x)`'],
              ['只读大参数', '`void g(const T& x)`'],
              ['动态数组', '`std::vector<T> v; v.push_back(x);`'],
              ['键值字典', '`std::map<K,V> m; m[k]=v;`'],
              ['遍历容器', '`for (auto& x : container)`'],
              ['智能指针', '`auto p = std::make_unique<T>(...);`'],
              ['lambda', '`[](int a, int b){ return a>b; }`'],
              ['异常', '`try { } catch (const std::exception& e) { }`']
            ]},

          { t: 'h2', x: '现代特性速查' },
          { t: 'table',
            head: ['特性', '写法', '说明'],
            rows: [
              ['类型推导', '`auto x = 42;`', '编译器自动推导类型，编译期确定'],
              ['decltype', '`decltype(x) y;`', '提取表达式的类型'],
              ['范围 for', '`for (auto& x : container)`', '遍历容器，不会越界'],
              ['lambda', '`[](int a, int b){ return a>b; }`', '匿名函数，用于算法回调'],
              ['独占指针', '`auto p = std::make_unique<T>();`', '独占所有权，离开作用域自动释放'],
              ['共享指针', '`auto p = std::make_shared<T>();`', '引用计数，最后一个持有者释放'],
              ['移动语义', '`T&& r = std::move(x);`', '转移资源所有权，避免深拷贝'],
              ['结构化绑定', '`auto [k, v] = pair;`', 'C++17，把 pair/tuple 拆成变量']
            ]},

          { t: 'h2', x: 'STL 容器选择指南' },
          { t: 'table',
            head: ['容器', '头文件', '特点', '典型用途'],
            rows: [
              ['`vector`', '`<vector>`', '连续存储、可动态增长', '默认首选，序列数据'],
              ['`map`', '`<map>`', '红黑树、按键有序', '键值对字典，需要排序'],
              ['`unordered_map`', '`<unordered_map>`', '哈希表、平均 O(1)', '键值对，不需要排序'],
              ['`set`', '`<set>`', '有序去重集合', '判断存在、去重'],
              ['`array`', '`<array>`', '栈上固定大小', '数量编译期已知'],
              ['`string`', '`<string>`', '动态字符串', '文本处理']
            ]},

          { t: 'h2', x: '核心概念回顾' },
          { t: 'defs', x: [
            { term: '零开销抽象', desc: '高级写法（类、模板）编译后不比手写 C 慢。C++ 的性能底气所在。' },
            { term: 'RAII', desc: '资源获取即初始化：对象析构时自动释放资源。容器、智能指针都靠它防泄漏。' },
            { term: '引用', desc: '变量的别名，用于避免拷贝、修改实参，比指针更安全直观。' },
            { term: 'STL', desc: '标准模板库：容器 + 迭代器 + 算法，C++ 最值得骄傲的武器库。' },
            { term: '多态', desc: '通过基类指针调用虚函数，运行时按实际类型分派。框架/插件的基础。' },
            { term: '异常安全', desc: '用异常传播错误，配合 RAII 保证即使出错资源也不泄漏。' }
          ]},

          { t: 'code', lang: 'cpp', title: '一句话总结 C++', run: true,
            code: [
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    std::cout << "C++ 核心：零开销抽象 + RAII + 模板" << std::endl;',
              '    std::vector<int> v = {1, 2, 3};',
              '    std::cout << "vector 大小=" << v.size() << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: 'C++ 核心：零开销抽象 + RAII + 模板\nvector 大小=3' },

          { t: 'h2', x: '下一步学什么' },
          { t: 'ol', x: [
            '**模板与泛型**：写 `template<typename T>` 让算法通吃所有类型，STL 本身就是模板的杰作',
            '**移动语义与右值引用**：理解 `std::move` 为什么能让返回值「零拷贝」',
            '**并发**：`<thread>` 多线程，`<atomic>` 无锁编程',
            '**CMake 与构建系统**：把多文件项目组织起来',
            '**实战库**：Boost、fmt、{abseil}、{spdlog} 等现代生态'
          ]},

          { t: 'note', k: 'tip', title: '给坚持到这里的你',
            x: 'C++ 是公认最难掌握的主流语言之一，但难在「要你理解计算机」——内存、编译、对象模型。每多懂一点底层，你写别的语言都会更通透。把这门课的 13 章代码亲手敲一遍、改一改、故意写错看编译器怎么骂你，你就算真正入门了。' },

          { t: 'kp', x: [
            '`<iostream>`/`<vector>`/`<string>`/`<memory>` 是最常用头文件',
            'RAII 是安全与性能的根基，优先用容器和智能指针',
            '`auto` + 范围 for + lambda 是现代 C++ 的肌肉记忆',
            '选对容器：序列用 vector，索引用 map，去重用 set',
            'C++ 难在理解计算机，但换来的是掌控一切的力'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '创建一个 vector，push_back 一个元素后查看大小', lang: 'cpp',
            code: [
              '#include <iostream>',
              '#include <vector>',
              '',
              'int main() {',
              '    std::vector<int> v = {1, 2, 3};',
              '    std::cout << "大小: " << v.size() << std::endl;',
              '    v.push_back(4);',
              '    std::cout << "加完后大小: " << v.size() << std::endl;',
              '    return 0;',
              '}'
            ],
            expect: '大小: 3\n加完后大小: 4',
            hint: 'vector 初始有 3 个元素，push_back 后变成 4 个',
            ans: '初始 3 个元素，push_back(4) 后变成 4 个。vector 自动管理内存，你只管 push_back，扩容由它负责。' },
          { t: 'think', q: '学完 C++，最该记住的三条「现代写法」原则是什么？',
            ans: '① 不裸 new/delete，用智能指针和容器（RAII）；② 不写死类型名，用 auto；③ 不手写循环，优先用 <algorithm> 算法配合 lambda。遵循这三条，代码又短又安全。' },
          { t: 'think', q: 'RAII 是什么？为什么说它是 C++ 资源管理的基石？',
            ans: 'RAII（Resource Acquisition Is Initialization，资源获取即初始化）的核心思想是：把资源（内存、文件句柄、锁）的生命周期绑定到对象的生命周期上——对象构造时获取资源，析构时自动释放。这样无论函数正常返回还是异常抛出，局部对象的析构函数一定会被调用，资源就一定被释放。vector、unique_ptr、lock_guard 都是 RAII 的典范。它从根本上解决了 C 语言中「忘记 free」「异常导致泄漏」的问题，是 C++ 安全与性能兼得的关键。' }
        ]
      }

    ]
  });

})(window);
