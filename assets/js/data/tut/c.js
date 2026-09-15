/* ==========================================================================
   CodeUp码上 · data/tut/c.js — C 语言教程（内容模板）
   对标 python.js / typescript.js 的 13 章结构，并为 C 增设指针专章。

   代码块约定（远程编译语言，wandbox + gcc-13 -std=c11 -lm）：
     - 数组形式 code: ['行1','行2']，禁止 Tab，统一 4 空格
     - 每个 C code 块带 lang:'c' / title / run:true / expect
     - 自包含可编译：#include <stdio.h> (+ 数学函数时加 #include <math.h>)
       + int main(void){ ...; return 0; }，用 printf 输出
     - expect = 程序标准输出完整文本（不含结尾换行），与 printf 逐字符一致
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL;
  var T = CL.Tutorials;

  T.register('c', {
    chapters: [

      /* ==================================================== 1 概览 */
      {
        id: 'overview',
        title: '语言概览',
        sub: '一门贴近硬件、把内存交到你手里的「系统级」语言',
        blocks: [
          { t: 'p', x: 'C 语言由 **Dennis Ritchie** 在 1972 年前后于贝尔实验室（Bell Labs）设计，最初是为了重写 Unix 操作系统。在此之前 Unix 主要用汇编编写，C 的出现让操作系统第一次能用一门「可移植」的高级语言写出来——这奠定了它此后半个世纪不可替代的地位。' },

          { t: 'p', x: '理解 C 的关键词是 **「贴近硬件」** 与 **「信任程序员」**。它没有自动垃圾回收，没有内置的字符串和动态容器，没有异常机制；它把内存、指针、生命周期的选择权全部交给你。代价是容易写出崩溃或泄漏的代码，收益是极致的性能与可控性——操作系统内核、数据库引擎、浏览器、嵌入式固件，底层几乎都是 C（或 C++）。' },

          { t: 'h2', x: 'C 的核心特征' },
          { t: 'ul', x: [
            '**编译型、静态类型**：先编译成机器码再运行，没有解释器，没有虚拟机。',
            '**手动内存管理**：`malloc`/`free` 由你负责，没有 GC 替你擦屁股。',
            '**指针是第一公民**：可以直接操作内存地址，这是 C 的灵魂，也是难点。',
            '**极薄运行时**：编译出的程序几乎不依赖语言环境，启动快、体积小。',
            '**未定义行为（UB）**：某些写法编译器不保证结果，可能“看起来能跑”却埋下隐患。',
            '**可移植**：同一份源码在 x86、ARM、RISC-V 上换编译器即可重编。'
          ]},

          { t: 'h2', x: '第一个程序' },
          { t: 'code', lang: 'c', title: 'Hello, World!', run: true, ed: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    printf("Hello, World!\\n");',
              '    return 0;',
              '}'
            ],
            expect: 'Hello, World!' },

          { t: 'p', x: '这几行几乎浓缩了 C 的全部「仪式」：`#include <stdio.h>` 引入标准输入输出函数声明；`int main(void)` 是程序入口；`printf` 负责把字符送到屏幕；`return 0` 告诉操作系统「我正常结束了」。和 Python 的 `print("Hello, World!")` 比，C 让你一开始就明白：**程序是被编译、被链接、被操作系统调用的**。' },

          { t: 'note', k: 'info', title: '为什么有 #include 和 main',
            x: 'C 标准库的函数（如 `printf`）声明放在头文件里。`#include` 在编译前把头文件文本复制进来，编译器才知道 `printf` 长什么样。而 `main` 是约定俗成的入口函数名——操作系统加载程序后，从 `main` 开始执行。' },

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

          { t: 'p', x: '这张对照表值得反复看。Python 一行就完事，而 C 需要头文件、入口函数、返回值和分号——这些不是啰嗦，而是**把程序如何被编译、被操作系统调用的真相摆在你面前**。Java 需要类和 main 的仪式，Go 需要包声明，Rust 需要 `fn main`，本质都在做同一件事：告诉系统「从哪里开始」。' },

          { t: 'h2', x: 'C 擅长什么' },
          { t: 'defs', x: [
            { term: '操作系统与内核', desc: 'Linux、Windows 内核的大量代码是 C。需要直接操作硬件、管理内存布局时，C 无可替代。' },
            { term: '嵌入式与固件', desc: '单片机、路由器、汽车 ECU 等资源受限设备，C 是直接和寄存器对话的语言。' },
            { term: '高性能库', desc: 'SQLite、Redis、OpenSSL、FFmpeg 的核心都是 C。Python/Node 的性能热点也常用 C 扩展。' },
            { term: '编译器与运行时', desc: '许多语言（包括 Python 的解释器 CPython）本身用 C 实现，C 是「造工具的工具」。' }
          ]},

          { t: 'h2', x: 'C 不擅长什么' },
          { t: 'p', x: '诚实地说清楚边界，比一味吹捧更有价值：' },
          { t: 'ul', x: [
            '**大型应用的开发效率**——没有容器、没有字符串拼接语法糖、没有异常，业务代码写起来冗长。',
            '**内存安全**——空指针、越界、悬垂指针、内存泄漏全靠人肉规避，现代语言（Rust）正是为此而生。',
            '**快速原型 / 脚本**——连个 `list` 都要手写，做数据探索远不如 Python。',
            '**跨项目的大型抽象**——没有命名空间、没有类、没有模板（直到 C11 才有极有限的泛型），抽象靠约定。'
          ]},

          { t: 'note', k: 'tip', title: '怎么判断该不该学 C',
            x: '如果你要学操作系统、嵌入式、高性能计算，或者想真正搞懂「程序在内存里到底长什么样」——C 是绕不开的基石。如果你只想快速做个网站或脚本，从 Python/TypeScript 起步更顺。但学一遍 C，会让你在所有语言里都更有底气。' },

          { t: 'kp', x: [
            'C 是编译型静态语言：先编成机器码，没有解释器和虚拟机',
            '内存由你手动管理，没有垃圾回收，也没有内置容器',
            '指针是 C 的灵魂——它能直接操作内存地址',
            '「未定义行为」意味着某些错误写法编译通过却运行结果不可预测',
            '标准库极精简，printf/字符串/内存函数都需 #include 对应头文件',
            '可移植性来自「同一份源码换编译器重编」'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '把 Hello World 改成输出你自己的一句话', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    printf("我正在学 C 语言\\n");',
              '    return 0;',
              '}'
            ],
            expect: '我正在学 C 语言',
            hint: '注意 printf 里的 \\n 和结尾的分号',
            ans: '运行后屏幕输出「我正在学 C 语言」。你可以把字符串换成任何你想打印的内容，感受一下 printf 的基本用法。' },
          { t: 'think', q: '为什么 C 程序必须写 #include <stdio.h> 和 int main(void)？',
            ans: '#include 在编译前把 stdio.h 的文本复制进来，编译器才认识 printf；int main(void) 是操作系统加载程序后调用的入口。两者缺一不可——少了头文件编译器报错，少了 main 程序没有起点。' },
          { t: 'think', q: 'C 语言的「未定义行为」是什么意思？为什么它很危险？',
            ans: '未定义行为（UB）是指 C 标准没有规定结果的写法，比如数组越界访问、对同一变量多次自增、解引用空指针。编译器可以生成任何代码——可能崩溃、可能给出错误结果、也可能「看起来正常」。危险在于它在你的机器上能跑，换个编译器或开个优化就炸了，而且没有任何报错提示。写 C 的核心纪律就是主动规避所有 UB。' }
        ]
      },

      /* ==================================================== 2 快速开始 */
      {
        id: 'setup',
        title: '快速开始',
        sub: '装好 GCC，读懂「编译—链接」四步，写出第一个可执行文件',
        blocks: [
          { t: 'h2', x: '装一个 C 编译器' },
          { t: 'p', x: 'C 没有官方“解释器”，你需要的是**编译器**。最常用的是 **GCC**（GNU Compiler Collection），macOS 上也可直接用 **Clang**。本教程所有示例按 `-std=c11` 标准编写，可被 gcc-13 及以上编译。' },

          { t: 'h3', x: 'Windows' },
          { t: 'p', x: '推荐两条路：**WSL（Windows Subsystem for Linux）** 里装 `gcc` 体验最佳；或用 **MinGW-w64** / **MSYS2** 提供原生 Windows 的 gcc。避免在老旧 `gcc` 上学习。' },
          { t: 'note', k: 'warn', title: 'Windows 用户注意',
            x: '传统的 MinGW 只支持到 32 位且版本陈旧，请务必装 **MinGW-w64**（或 MSYS2 里的 `mingw-w64-x86_64-gcc`）。在 WSL 里直接 `sudo apt install gcc` 最省心，与 Linux 教学完全一致。' },

          { t: 'h3', x: 'macOS' },
          { t: 'p', x: '装好 Xcode 命令行工具即自带 Clang：`xcode-select --install`。想用更新版本的 GCC 可用 Homebrew：`brew install gcc`。' },

          { t: 'h3', x: 'Linux' },
          { t: 'p', x: 'Debian/Ubuntu 系：`sudo apt update && sudo apt install gcc`。验证版本：`gcc --version`。' },

          { t: 'h2', x: '从源码到程序：四步流水线' },
          { t: 'p', x: '一条 `gcc main.c` 背后其实藏着四个阶段，理解它你就理解了 C 的程序模型：' },
          { t: 'ol', x: [
            '**预处理（Preprocess）**：展开 `#include`、宏、条件编译，得到纯 C 文本。',
            '**编译（Compile）**：把 C 翻译成汇编语言。',
            '**汇编（Assemble）**：把汇编翻译成机器码目标文件 `.o`。',
            '**链接（Link）**：把你的目标文件和标准库（如 `printf` 的实现）拼成最终可执行文件。'
          ]},

          { t: 'note', k: 'info', title: '分步查看每一步的产物',
            x: '可以单独执行：`gcc -E main.c -o main.i`（只看预处理）、`gcc -S main.c -o main.s`（生成汇编）、`gcc -c main.c -o main.o`（生成目标文件）。最后 `gcc main.o -o main` 完成链接。日常开发通常一步到位。' },

          { t: 'h2', x: '最小编译—运行流程' },
          { t: 'p', x: '把下面这段保存为 `main.c`，然后在终端执行：**`gcc -std=c11 -Wall main.c -o main`** 编译，再 **`./main`**（Windows 上是 `main.exe`）运行。`-Wall` 打开常用警告，`-std=c11` 指定语言标准。' },

          { t: 'code', lang: 'c', title: 'main.c', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    printf("编译成功，你好 C!\\n");',
              '    return 0;',
              '}'
            ],
            expect: '编译成功，你好 C!' },

          { t: 'p', x: '如果屏幕上出现 `编译成功，你好 C!`，恭喜——你的工具链打通了。后面的每一段示例，都可以照这个流程自己编译运行。`-lm` 参数用于链接数学库（用到 `math.h` 的 `sqrt`、`sin` 等函数时加上），本教程在需要时明确说明。' },

          { t: 'h2', x: '推荐的开发工具' },
          { t: 'defs', x: [
            { term: 'GCC / Clang', desc: '编译器本体。gcc 覆盖面广，clang 报错更友好。二选一即可。' },
            { term: 'Make / CMake', desc: '当源文件变多，用构建系统管理编译依赖，而不是手敲一长串 gcc。' },
            { term: 'GDB', desc: '命令行调试器，能单步执行、查看变量和内存，排查段错误（segfault）的利器。' },
            { term: 'VS Code', desc: '免费轻量，装 C/C++ 扩展后支持智能补全、调试、断点，新手最友好的图形环境。' }
          ]},

          { t: 'note', k: 'tip', title: '把警告当错误看',
            x: '养成习惯：编译时加 `-Wall -Wextra`。能报出“未使用变量”“有符号比较”等隐患。进阶可加 `-Werror` 让警告直接编译失败——许多隐藏 bug 在警告阶段就被抓住。' },

          { t: 'kp', x: [
            'C 需要编译器（GCC/Clang），不是解释器；写好源码再编译运行',
            '一条 gcc 命令背后是：预处理 → 编译 → 汇编 → 链接',
            '日常编译：`gcc -std=c11 -Wall main.c -o main`，数学库加 `-lm`',
            '`-Wall` 打开常用警告，能提前暴露大量隐患',
            'Windows 推荐 WSL 或 MinGW-w64；macOS 用 Clang；Linux 用 apt 装 gcc',
            '写一个可运行示例，先确认工具链打通再往下学'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个程序输出「工具链已就绪」', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    printf("工具链已就绪\\n");',
              '    return 0;',
              '}'
            ],
            expect: '工具链已就绪',
            hint: '照抄教程里的模板，改一下打印的文字就行',
            ans: '编译运行后看到「工具链已就绪」，说明你的 gcc 环境没问题。后面的示例都可以照这个流程跑。' },
          { t: 'think', q: '一条 gcc 命令背后经过了哪四个阶段？',
            ans: '预处理（展开 #include 和宏）→ 编译（C 翻译成汇编）→ 汇编（汇编翻译成机器码 .o 文件）→ 链接（把目标文件和标准库拼成最终可执行文件）。日常一步到位，但排查问题时这四步各有产物可以单独看。' },
          { t: 'think', q: '编译时出现 undefined reference 错误，通常是什么原因？',
            ans: '这是**链接阶段**的错误，不是编译错误。说明编译器找到了函数声明（头文件里有原型），但链接时找不到函数的实现代码。常见原因：函数只声明了没写定义体、忘了把对应的 .c 文件一起编译、或者需要链接的第三方库没加 `-l` 参数。解决办法是检查函数是否有实现、编译命令是否包含了所有源文件。' }
        ]
      },

      /* ==================================================== 3 基础语法 */
      {
        id: 'basics',
        title: '基础语法与第一个程序',
        sub: '语句、分号、花括号、注释，以及 printf 格式化输出',
        blocks: [
          { t: 'h2', x: '一个 C 程序的骨架' },
          { t: 'p', x: 'C 程序由**函数**组成，必有一个名为 `main` 的入口函数。每条语句以**分号 `;`** 结束，代码块用**花括号 `{}`** 包裹。这和 Python 用缩进、Java 用花括号但强制类的风格都不同。' },

          { t: 'code', lang: 'c', title: '最小可运行程序', run: true, ed: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    printf("最小程序\\n");',
              '    return 0;',
              '}'
            ],
            expect: '最小程序' },

          { t: 'h3', x: '#include 与头文件' },
          { t: 'p', x: '`#include <stdio.h>` 把“标准输入输出”的函数声明引进来。尖括号 `<>` 表示系统头文件；自己写的头文件用双引号 `\"my.h\"`。没有它，编译器不认识 `printf`。' },

          { t: 'h3', x: 'return 0 是什么' },
          { t: 'p', x: '`main` 返回 `int`，`return 0` 表示「程序正常结束」。非零返回值通常代表出错。操作系统（以及 shell 的 `$?`）会读取它。' },

          { t: 'h2', x: '注释' },
          { t: 'p', x: 'C 支持两种注释：行注释 `//` 和块注释 `/* ... */`。块注释不能嵌套。' },
          { t: 'code', lang: 'c', title: '注释写法', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    // 这是行注释',
              '    /* 这是块注释',
              '       可以跨多行 */',
              '    printf("注释会被忽略\\n");',
              '    return 0;',
              '}'
            ],
            expect: '注释会被忽略' },

          { t: 'h2', x: 'printf：格式化输出' },
          { t: 'p', x: '`printf` 第一个参数是格式串，里面用 **转换说明符** 占位：`%d` 整数、`%c` 字符、`%s` 字符串、`%f` 浮点。后面按顺序给出对应的值。' },

          { t: 'code', lang: 'c', title: '格式说明符', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int n = 42;',
              '    double pi = 3.14159;',
              '    char ch = \'A\';',
              '    char name[] = "C";',
              '',
              '    printf("整数: %d\\n", n);',
              '    printf("字符: %c\\n", ch);',
              '    printf("字符串: %s\\n", name);',
              '    printf("浮点: %f\\n", pi);',
              '    printf("浮点(2位): %.2f\\n", pi);',
              '    printf("十六进制: %x\\n", n);',
              '    printf("八进制: %o\\n", n);',
              '    printf("多个值: %d, %c, %s\\n", n, ch, name);',
              '    return 0;',
              '}'
            ],
            expect: '整数: 42\n字符: A\n字符串: C\n浮点: 3.141590\n浮点(2位): 3.14\n十六进制: 2a\n八进制: 52\n多个值: 42, A, C' },

          { t: 'note', k: 'warn', title: '占位符类型要对上',
            x: '`printf("%d", 3.14)` 这类「类型不匹配」是新手高频 bug：浮点被当成整数解读，会打印出乱码甚至崩溃。占位符与实参类型必须一一对应。' },

          { t: 'h2', x: '变量与赋值' },
          { t: 'p', x: 'C 是静态类型：**变量必须先声明类型，且之后不能改类型**。声明同时可初始化。赋值用 `=`。' },

          { t: 'code', lang: 'c', title: '变量声明与修改', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int age = 20;',
              '    double price = 9.9;',
              '    char grade = \'B\';',
              '',
              '    age = age + 1;',
              '    printf("age = %d\\n", age);',
              '    printf("price = %.1f\\n", price);',
              '    printf("grade = %c\\n", grade);',
              '    return 0;',
              '}'
            ],
            expect: 'age = 21\nprice = 9.9\ngrade = B' },

          { t: 'h2', x: '常量' },
          { t: 'p', x: '用 `const` 声明只读变量；用 `#define` 定义宏常量（编译前文本替换）。' },
          { t: 'code', lang: 'c', title: '常量', run: true,
            code: [
              '#include <stdio.h>',
              '#define MAX 100',
              '',
              'int main(void) {',
              '    const double PI = 3.14159;',
              '    printf("MAX = %d\\n", MAX);',
              '    printf("PI = %.5f\\n", PI);',
              '    return 0;',
              '}'
            ],
            expect: 'MAX = 100\nPI = 3.14159' },

          { t: 'kp', x: [
            'C 程序由函数组成，入口是 int main(void)',
            '每条语句以分号结尾，代码块用 {} 包裹',
            '#include 引入头文件声明，否则编译器不认识库函数',
            'printf 用 %d %c %s %f 等占位符，类型必须匹配',
            '变量先声明类型且不可更改；const / #define 定义常量',
            'return 0 表示正常退出，非零通常表示出错'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 printf 打印一个人的年龄、身高和等级', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int age = 18;',
              '    double height = 1.75;',
              '    char grade = \'A\';',
              '    printf("年龄: %d\\n", age);',
              '    printf("身高: %.2f\\n", height);',
              '    printf("等级: %c\\n", grade);',
              '    return 0;',
              '}'
            ],
            expect: '年龄: 18\n身高: 1.75\n等级: A',
            hint: '%d 对应 int，%.2f 保留两位小数，%c 对应 char',
            ans: '三个 printf 分别用不同的转换说明符。%.2f 让 1.75 显示为 1.75（不是 1.750000），这就是 printf 格式控制的威力。' },
          { t: 'ex', q: '用 for 循环算 1 到 5 的累加和', lang: 'c',
            code: [
              '#include <stdio.h>',
              '#define MAX 5',
              '',
              'int main(void) {',
              '    int sum = 0;',
              '    for (int i = 1; i <= MAX; i++) {',
              '        sum += i;',
              '    }',
              '    printf("1 到 %d 的和 = %d\\n", MAX, sum);',
              '    return 0;',
              '}'
            ],
            expect: '1 到 5 的和 = 15',
            hint: 'sum 初始化为 0，每轮循环加上 i',
            ans: '1+2+3+4+5=15。这里演示了 #define 定义常量、for 循环累加、printf 多占位符的组合，是基础语法的综合运用。' },
          { t: 'think', q: '为什么 printf("%d", 3.14) 会输出错误结果？',
            ans: '%d 期望一个 int 参数，但传过去的是 double（8 字节）。printf 按 %d 的方式去读内存，类型不匹配导致读到错误的数据。占位符必须和实参类型一一对应——要打印浮点用 %f，要打印整数用 %d。' },
          { t: 'think', q: 'printf 里想打印一个百分号 %，为什么必须写 %% 而不是直接写 %？',
            ans: '因为 % 是 printf 的格式控制符起始标记，编译器看到 % 后面会期待一个格式字母（d、f、s 等）。如果直接写一个 % 后面跟普通字符，行为是未定义的——可能打印出奇怪的东西，也可能崩溃。写 %% 是约定的「转义」，告诉 printf 这里就是要输出一个字面百分号。' }
        ]
      },

      /* ==================================================== 4 数据类型 */
      {
        id: 'types',
        title: '数据类型',
        sub: 'int/char/float/double、short/long、unsigned，以及 sizeof 与取值范围',
        blocks: [
          { t: 'h2', x: 'C 的基本类型' },
          { t: 'p', x: 'C 的类型体系很「薄」：整数家族（char/short/int/long，可加 `unsigned`）、浮点（float/double），以及后面章节的指针与结构体。没有 Python 那种任意精度整数，也没有内置的 string/bool（C99 才有 `_Bool`，通常直接用 `int` 表示真假）。' },

          { t: 'table',
            head: ['类型', '典型大小', '说明'],
            rows: [
              ['`char`', '1 字节', '最小整数类型，也用作字符（ASCII）'],
              ['`short`', '2 字节', '短整型，范围较小'],
              ['`int`', '4 字节', '最常用整型，与机器字长有关'],
              ['`long`', '4 或 8 字节', '长整型，64 位系统通常 8 字节'],
              ['`float`', '4 字节', '单精度浮点（约 7 位有效数字）'],
              ['`double`', '8 字节', '双精度浮点（约 15 位有效数字）']
            ]},

          { t: 'h2', x: '用 sizeof 看真实大小' },
          { t: 'p', x: '`sizeof` 是编译期运算符，返回类型或变量占用的**字节数**。同一份 C 代码在不同平台，`long` 的大小可能不同——这正是 C「贴近硬件」的体现。' },

          { t: 'code', lang: 'c', title: '各类型占用的字节', run: true,
            code: [
              '#include <stdio.h>',
              '#include <limits.h>',
              '',
              'int main(void) {',
              '    printf("char  : %2zu 字节\\n", sizeof(char));',
              '    printf("short : %2zu 字节\\n", sizeof(short));',
              '    printf("int   : %2zu 字节\\n", sizeof(int));',
              '    printf("long  : %2zu 字节\\n", sizeof(long));',
              '    printf("float : %2zu 字节\\n", sizeof(float));',
              '    printf("double: %2zu 字节\\n", sizeof(double));',
              '    printf("INT_MAX = %d\\n", INT_MAX);',
              '    printf("INT_MIN = %d\\n", INT_MIN);',
              '    printf("CHAR_BIT = %d\\n", CHAR_BIT);',
              '    return 0;',
              '}'
            ],
            expect: 'char  :  1 字节\nshort :  2 字节\nint   :  4 字节\nlong  :  8 字节\nfloat :  4 字节\ndouble:  8 字节\nINT_MAX = 2147483647\nINT_MIN = -2147483648\nCHAR_BIT = 8' },

          { t: 'note', k: 'info', title: 'size_t 与 %zu',
            x: '`sizeof` 的返回类型是 `size_t`（无符号整数）。打印它要用 `%zu`，而不是 `%d`，否则在严格编译下会报警告。这是很多教材忽略、但实战必踩的细节。' },

          { t: 'h2', x: '整数修饰符：short / long / unsigned' },
          { t: 'p', x: '在 `int` 前可加修饰符缩小或扩大范围：`short int`（可省 `int`）、`long int`、`long long int`；`unsigned` 去掉符号位，把范围整体挪到正数侧。' },

          { t: 'code', lang: 'c', title: 'unsigned 与范围', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    unsigned int u = 0;',
              '    u = u - 1;            /* 无符号下溢：回绕到最大值 */',
              '    printf("u - 1 = %u\\n", u);',
              '',
              '    short s = 32767;',
              '    s = s + 1;            /* 有符号溢出：未定义行为！ */',
              '    printf("short 溢出后 = %d\\n", s);',
              '    return 0;',
              '}'
            ],
            expect: 'u - 1 = 4294967295\nshort 溢出后 = -32768' },

          { t: 'note', k: 'danger', title: '有符号溢出是「未定义行为」',
            x: '无符号整数溢出是良定义的（按 2^n 回绕），但**有符号整数溢出是未定义行为（UB）**：标准不保证结果，某些编译器在优化后可能给出「反直觉」的值，甚至被直接删掉相关代码。永远不要让有符号整数溢出。' },

          { t: 'h2', x: '字符类型 char' },
          { t: 'p', x: '`char` 本质是小整数（通常 8 位，能表示 -128~127 或 0~255）。字符字面量用单引号 \'A\'，存的是它的 ASCII 码。' },

          { t: 'code', lang: 'c', title: 'char 即小整数', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    char c = \'A\';',
              '    printf("字符 %c 的 ASCII = %d\\n", c, c);',
              '    printf("小写 a = %c\\n", c + 32);',
              '    return 0;',
              '}'
            ],
            expect: '字符 A 的 ASCII = 65\n小写 a = a' },

          { t: 'h2', x: '浮点：float 与 double' },
          { t: 'p', x: '浮点遵循 IEEE 754，是二进制近似。因此 `0.1 + 0.2 != 0.3` 在所有语言都成立，C 也不例外。默认用 `double`，需要省内存才用 `float`。' },

          { t: 'code', lang: 'c', title: '浮点精度', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    float f = 0.1f;',
              '    double d = 0.1;',
              '    printf("float  0.1 = %.10f\\n", f);',
              '    printf("double 0.1 = %.10f\\n", d);',
              '    if (0.1 + 0.2 == 0.3) {',
              '        printf("相等\\n");',
              '    } else {',
              '        printf("0.1+0.2 不等于 0.3\\n");',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: 'float  0.1 = 0.1000000010\ndouble 0.1 = 0.1000000000\n0.1+0.2 不等于 0.3' },

          { t: 'note', k: 'tip', title: '比较浮点要容差',
            x: '判断两个浮点是否“相等”要用 `fabs(a - b) < 1e-9` 这类容差，而不是 `==`。直接 `==` 几乎总会失败。' },

          { t: 'kp', x: [
            '基本类型：char/short/int/long（整数）+ float/double（浮点）',
            'sizeof 返回字节数，long 的大小随平台变化',
            'unsigned 去掉符号位，溢出回绕；有符号溢出是未定义行为',
            'char 本质是小整数，存 ASCII 码，字符字面量用单引号',
            '浮点是二进制近似，不可直接 == 比较',
            '打印 size_t 用 %zu，打印 long 用 %ld'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 char 做大小写转换：把小写 a 转成大写 A', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    char c = \'a\';',
              '    printf("字符 %c 的 ASCII 是 %d\\n", c, c);',
              '    printf("大写是 %c\\n", c - 32);',
              '    printf("int 占 %zu 字节\\n", sizeof(int));',
              '    return 0;',
              '}'
            ],
            expect: '字符 a 的 ASCII 是 97\n大写是 A\nint 占 4 字节',
            hint: '小写字母比大写字母的 ASCII 码大 32',
            ans: 'char 本质是小整数，所以 char 和 int 之间可以直接做算术。a 的 ASCII 是 97，减去 32 得到 65，对应大写 A。' },
          { t: 'think', q: '为什么不能用 == 直接比较两个浮点数？',
            ans: '浮点数在二进制中是近似表示，0.1 在内存里并不是精确的 0.1。因此 0.1 + 0.2 可能略大于或略小于 0.3，== 判断会失败。正确做法是判断差值的绝对值小于一个极小的容差（比如 1e-9）。' },
          { t: 'think', q: 'char 类型到底是有符号还是无符号？为什么这很重要？',
            ans: 'C 标准没有规定 char 默认是 signed 还是 unsigned，这取决于编译器和平台。x86 上的 gcc 通常是 signed char（范围 -128~127），而 ARM 上可能是 unsigned char（0~255）。这很重要：如果你把一个大于 127 的值存进 char，在 signed 平台上会变成负数，导致比较和运算出错。需要明确范围时应该写 signed char 或 unsigned char，不要假设 char 的符号性。' }
        ]
      },

      /* ==================================================== 5 运算符 */
      {
        id: 'operators',
        title: '运算符与优先级',
        sub: '算术、关系、逻辑、位运算、自增自减与三元运算符',
        blocks: [
          { t: 'h2', x: '算术运算符' },
          { t: 'p', x: 'C 的除法对整数做**截断**（向零取整），取余用 `%`。想得到小数必须让操作数之一是浮点。' },

          { t: 'code', lang: 'c', title: '算术与取余', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int a = 17, b = 5;',
              '    printf("a + b = %d\\n", a + b);',
              '    printf("a - b = %d\\n", a - b);',
              '    printf("a * b = %d\\n", a * b);',
              '    printf("a / b = %d\\n", a / b);',
              '    printf("a %% b = %d\\n", a % b);',
              '    printf("7 / 2.0 = %.1f\\n", 7.0 / 2.0);',
              '    return 0;',
              '}'
            ],
            expect: 'a + b = 22\na - b = 12\na * b = 85\na / b = 3\na % b = 2\n7 / 2.0 = 3.5' },

          { t: 'note', k: 'warn', title: '整数除法会丢小数',
            x: '`17 / 5` 得 `3` 而不是 `3.4`。若要小数，写成 `17.0 / 5` 或强制转换 `(double)a / b`。这也是浮点章节那个坑的源头。' },

          { t: 'h2', x: '自增与自减' },
          { t: 'p', x: '`i++` 是**后置**（先取值再加），`++i` 是**前置**（先加再取值）。单独成句时两者效果一样；混在表达式里结果不同。' },

          { t: 'code', lang: 'c', title: '前置与后置', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int i = 5;',
              '    printf("i = %d\\n", i);',
              '    printf("i++ 返回 %d\\n", i++);',
              '    printf("现在 i = %d\\n", i);',
              '    printf("++i 返回 %d\\n", ++i);',
              '    printf("最终 i = %d\\n", i);',
              '    return 0;',
              '}'
            ],
            expect: 'i = 5\ni++ 返回 5\n现在 i = 6\n++i 返回 7\n最终 i = 7' },

          { t: 'note', k: 'danger', title: '别在同一表达式里多次修改同一变量',
            x: '`i = i++ + ++i` 这类写法是未定义行为——标准不规定先算哪边。一条语句里只让一个 `++` 作用于同一变量，可读性也更好。' },

          { t: 'h2', x: '关系与逻辑运算符' },
          { t: 'p', x: '关系运算 `>` `<` `==` `!=` 返回 `1`（真）或 `0`（假）。逻辑运算 `&&` `||` `!` 同样返回 1/0，且有**短路**特性：左边已能定结果时右边不执行。' },

          { t: 'code', lang: 'c', title: '关系与逻辑', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int x = 7;',
              '    printf("x > 5 ? %d\\n", x > 5);',
              '    printf("x == 5 ? %d\\n", x == 5);',
              '    printf("(x>5) && (x<10) ? %d\\n", (x > 5) && (x < 10));',
              '    printf("(x<5) || (x>3) ? %d\\n", (x < 5) || (x > 3));',
              '    printf("!(x>5) ? %d\\n", !(x > 5));',
              '    return 0;',
              '}'
            ],
            expect: 'x > 5 ? 1\nx == 5 ? 0\n(x>5) && (x<10) ? 1\n(x<5) || (x>3) ? 1\n!(x>5) ? 0' },

          { t: 'h2', x: '位运算' },
          { t: 'p', x: '位运算直接操作二进制位：`&` 与、`|` 或、`^` 异或、`~` 取反、`<<` `>>` 移位。常用于底层协议、标志位、性能优化。' },

          { t: 'code', lang: 'c', title: '位运算', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    unsigned int a = 6;   /* 0110 */',
              '    unsigned int b = 3;   /* 0011 */',
              '    printf("a & b = %u\\n", a & b);',
              '    printf("a | b = %u\\n", a | b);',
              '    printf("a ^ b = %u\\n", a ^ b);',
              '    printf("~a = %u\\n", ~a);',
              '    printf("a << 1 = %u\\n", a << 1);',
              '    printf("a >> 1 = %u\\n", a >> 1);',
              '    return 0;',
              '}'
            ],
            expect: 'a & b = 2\na | b = 7\na ^ b = 5\n~a = 4294967289\na << 1 = 12\na >> 1 = 3' },

          { t: 'h2', x: '赋值、复合与三元' },
          { t: 'p', x: '复合赋值 `+=` `-=` `*=` 等同 `x = x + ...`。三元运算符 `条件 ? 真值 : 假值` 是表达式版的 if。' },

          { t: 'code', lang: 'c', title: '三元与复合赋值', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int score = 85;',
              '    char grade = (score >= 60) ? \'P\' : \'F\';',
              '    printf("grade = %c\\n", grade);',
              '',
              '    int total = 0;',
              '    total += 10;',
              '    total *= 2;',
              '    printf("total = %d\\n", total);',
              '    return 0;',
              '}'
            ],
            expect: 'grade = P\ntotal = 20' },

          { t: 'note', k: 'info', title: '优先级速记',
            x: '记不住优先级时，**加括号**。常见坑：`* /` 高于 `+ -`；`&&` 高于 `||`；`==` 高于 `=` 但低于算术。括号不仅防错，还让意图一目了然。' },

          { t: 'kp', x: [
            '整数除法截断；要小数需浮点操作数或强制转换',
            'i++ 先取值后加，++i 先加后取值；别在一句里多次改同一变量',
            '关系/逻辑运算返回 1 或 0；&& 和 || 短路求值',
            '位运算 & | ^ ~ << >> 直接操作二进制位',
            '三元运算符 条件 ? a : b 是表达式版的 if',
            '拿不准优先级就加括号，可读性优先'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '算一算 13 / 4 和 13 % 4，再试试后置自增', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int a = 13, b = 4;',
              '    printf("a + b = %d\\n", a + b);',
              '    printf("a / b = %d\\n", a / b);',
              '    printf("a %% b = %d\\n", a % b);',
              '    int c = a++;',
              '    printf("c = %d, a = %d\\n", c, a);',
              '    return 0;',
              '}'
            ],
            expect: 'a + b = 17\na / b = 3\na % b = 1\nc = 13, a = 14',
            hint: '整数除法截断，% 是取余；a++ 先返回原值再加',
            ans: '13/4=3（截断小数），13%4=1（余1）。a++ 把 13 赋给 c 后 a 才变成 14。注意 printf 里要打 % 必须写 %%。' },
          { t: 'think', q: '为什么 i = i++ + ++i; 是未定义行为？',
            ans: 'C 标准没有规定在同一个表达式里对同一变量多次修改时，各部分的求值顺序。不同编译器、不同优化级别可能给出不同结果，甚至让程序崩溃。规则：一条语句里最多让一个 ++/-- 作用于同一变量，拆成两行写最安全。' },
          { t: 'think', q: 'a = b = c = 5; 这种链式赋值为什么合法？赋值运算符的结合性是什么？',
            ans: '赋值运算符是**右结合**的，所以 a = b = c = 5 等价于 a = (b = (c = 5))。先把 5 赋给 c，整个 c = 5 表达式的值是 5，再赋给 b，最后赋给 a。这和减法的左结合不同（a - b - c = (a - b) - c）。理解结合性才能搞清楚复杂表达式的求值顺序。' }
        ]
      },

      /* ==================================================== 6 控制流 */
      {
        id: 'control',
        title: '控制流',
        sub: 'if / else、for、while、do-while 与 switch',
        blocks: [
          { t: 'h2', x: 'if / else' },
          { t: 'p', x: '条件为真（非 0）则执行。C 没有布尔类型时，约定 **0 为假，非 0 为真**。`else` 可选，`else if` 靠链式实现。' },

          { t: 'code', lang: 'c', title: '奇偶判断', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int n = 7;',
              '    if (n % 2 == 0) {',
              '        printf("%d 是偶数\\n", n);',
              '    } else {',
              '        printf("%d 是奇数\\n", n);',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '7 是奇数' },

          { t: 'h2', x: 'for 循环' },
          { t: 'p', x: '`for (初始化; 条件; 步进)` 三步写在一行，最适合「已知次数」的遍历。C99 起允许在初始化里声明循环变量。' },

          { t: 'code', lang: 'c', title: '累加 1..5', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int sum = 0;',
              '    for (int i = 1; i <= 5; i++) {',
              '        sum += i;',
              '    }',
              '    printf("1..5 之和 = %d\\n", sum);',
              '    return 0;',
              '}'
            ],
            expect: '1..5 之和 = 15' },

          { t: 'h2', x: 'while 与 do-while' },
          { t: 'p', x: '`while` 先判后执行；`do-while` 先执行一次再判——**至少执行一次**。' },

          { t: 'code', lang: 'c', title: '两种循环', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int i = 1;',
              '    while (i <= 3) {',
              '        printf("while: %d\\n", i);',
              '        i++;',
              '    }',
              '    int j = 1;',
              '    do {',
              '        printf("do-while: %d\\n", j);',
              '        j++;',
              '    } while (j <= 3);',
              '    return 0;',
              '}'
            ],
            expect: 'while: 1\nwhile: 2\nwhile: 3\ndo-while: 1\ndo-while: 2\ndo-while: 3' },

          { t: 'h2', x: 'break 与 continue' },
          { t: 'p', x: '`break` 立即跳出整个循环；`continue` 跳过本次剩余、进入下一轮。' },

          { t: 'code', lang: 'c', title: 'break / continue', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    for (int i = 1; i <= 5; i++) {',
              '        if (i == 3) continue;   /* 跳过 3 */',
              '        if (i == 5) break;      /* 到 5 终止 */',
              '        printf("i = %d\\n", i);',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: 'i = 1\ni = 2\ni = 4' },

          { t: 'h2', x: 'switch' },
          { t: 'p', x: '`switch` 对整数/字符做多分支匹配，每个 `case` 末尾通常要 `break`，否则会**穿透**到下一个 case（有时故意利用穿透，但要加注释）。' },

          { t: 'code', lang: 'c', title: '星期匹配', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int day = 3;',
              '    switch (day) {',
              '        case 1: printf("周一\\n"); break;',
              '        case 2: printf("周二\\n"); break;',
              '        case 3: printf("周三\\n"); break;',
              '        default: printf("其他\\n");',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '周三' },

          { t: 'note', k: 'danger', title: '忘写 break 会穿透',
            x: '如果 `case 1` 后面没 `break`，程序会继续执行 `case 2` 的代码——这常常不是你想要的。忘记 break 是 switch 最常见的隐蔽 bug，写时务必逐个确认。' },

          { t: 'kp', x: [
            'C 约定 0 为假、非 0 为真，没有独立布尔类型的年代就靠这个',
            'for 适合已知次数；while 先判后执行；do-while 至少执行一次',
            'break 跳出循环，continue 跳到下一轮',
            'switch 的 case 默认会穿透，记得加 break',
            '循环变量可在 for 的初始化里声明（C99+）',
            '条件表达式结果为 1/0，可直接赋值给 int'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 while 循环算 5 的阶乘（5! = 120）', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int n = 1;',
              '    int fact = 1;',
              '    while (n <= 5) {',
              '        fact *= n;',
              '        n++;',
              '    }',
              '    printf("5! = %d\\n", fact);',
              '    return 0;',
              '}'
            ],
            expect: '5! = 120',
            hint: 'fact 从 1 开始，每轮乘上当前 n，然后 n++',
            ans: '1×1=1, 1×2=2, 2×3=6, 6×4=24, 24×5=120。while 循环适合「不知道要循环几次，但知道什么时候停」的场景。' },
          { t: 'ex', q: '用 switch 根据分数打印等级（90 以上 A，60 以上 B，否则 C）', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int score = 85;',
              '    int level = score / 10;',
              '    switch (level) {',
              '        case 10:',
              '        case 9: printf("等级 A\\n"); break;',
              '        case 8:',
              '        case 7:',
              '        case 6: printf("等级 B\\n"); break;',
              '        default: printf("等级 C\\n");',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '等级 B',
            hint: 'score/10 整数除法截断，85/10=8',
            ans: '85/10=8，匹配 case 8，打印「等级 B」。注意 case 10 后面没写 break，会穿透到 case 9——这是故意利用穿透让 100 分也算 A。' },
          { t: 'think', q: 'switch 的 case 末尾如果忘了写 break，会发生什么？',
            ans: '程序会「穿透」到下一个 case 的代码继续执行，直到遇到 break 或 switch 结束。比如 case 1 没写 break，case 2 的代码也会跟着跑。这常常不是你想要的结果，是最经典的隐蔽 bug 之一。' },
          { t: 'think', q: 'for (int i = 0; i < 10; i++); 后面多了一个分号，会发生什么？',
            ans: '这个分号会被当作一个**空语句**，for 循环的循环体就是这个空语句——循环跑 10 次什么都不做。后面跟着的代码块（比如 { printf(...); }）会在循环结束后只执行一次，而不是循环 10 次。这是新手极容易犯的错误，而且编译器不会报错，因为语法上完全合法。写 for 时注意不要在括号后随手加分号。' }
        ]
      },

      /* ==================================================== 7 函数 */
      {
        id: 'functions',
        title: '函数',
        sub: '声明（原型）、定义、返回值，以及「按值传递」的真相',
        blocks: [
          { t: 'h2', x: '声明与定义分离' },
          { t: 'p', x: '函数**定义**是带函数体的实现；**声明（原型）**只写签名，告诉编译器「有这么个函数、长这样」。把原型放在 `main` 之前，定义放在之后（或放进头文件），是 C 的标准组织方式。' },

          { t: 'code', lang: 'c', title: '原型 + 定义', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int add(int a, int b);   /* 函数声明（原型） */',
              '',
              'int main(void) {',
              '    printf("3 + 4 = %d\\n", add(3, 4));',
              '    return 0;',
              '}',
              '',
              'int add(int a, int b) {  /* 函数定义 */',
              '    return a + b;',
              '}'
            ],
            expect: '3 + 4 = 7' },

          { t: 'note', k: 'info', title: '为什么要有原型',
            x: 'C 编译器自上而下扫描。若 `main` 里调用了还没见过的函数，它无法检查参数类型——非常危险。原型让编译器在调用点就能做类型校验，是「头文件思想」的核心。' },

          { t: 'h2', x: '返回值' },
          { t: 'p', x: '函数通过 `return` 返回一个值。可以有多条 `return` 提前退出。`main` 的返回值交给操作系统。' },

          { t: 'code', lang: 'c', title: '多出口与最大值', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int max(int a, int b) {',
              '    if (a > b) return a;',
              '    return b;',
              '}',
              '',
              'int main(void) {',
              '    printf("max(8, 5) = %d\\n", max(8, 5));',
              '    printf("max(2, 9) = %d\\n", max(2, 9));',
              '    return 0;',
              '}'
            ],
            expect: 'max(8, 5) = 8\nmax(2, 9) = 9' },

          { t: 'h2', x: '按值传递：C 的核心心法' },
          { t: 'p', x: 'C 的所有参数都是**按值传递**——调用时把实参的值**复制**一份给形参。函数内改形参，不会影响外面的原变量。下面这个「交换失败」的例子，正是理解指针的钥匙。' },

          { t: 'code', lang: 'c', title: '按值传递：交换无效', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'void swap(int a, int b) {',
              '    int t = a;',
              '    a = b;',
              '    b = t;',
              '}',
              '',
              'int main(void) {',
              '    int x = 1, y = 2;',
              '    printf("交换前: x=%d, y=%d\\n", x, y);',
              '    swap(x, y);',
              '    printf("交换后: x=%d, y=%d\\n", x, y);',
              '    return 0;',
              '}'
            ],
            expect: '交换前: x=1, y=2\n交换后: x=1, y=2' },

          { t: 'p', x: '`swap` 里改的是 `a`、`b` 的副本，`x`、`y` 纹丝不动。要真正修改外部变量，必须传入它的**地址**——这正是下一章「指针」要解决的。' },

          { t: 'h2', x: '头文件思想：把接口与实现分开' },
          { t: 'p', x: '工程上，把原型放进 `.h` 头文件、把定义放进 `.c` 源文件，其他文件 `#include` 头文件即可复用，而不必关心实现。这样编译单元相互独立，也隐藏了内部细节。' },

          { t: 'table',
            head: ['文件', '放什么', '作用'],
            rows: [
              ['`calc.h`', '函数原型 + 宏/类型声明', '对外公布的接口契约'],
              ['`calc.c`', '函数的具体实现', '编译成独立目标文件'],
              ['`main.c`', '`#include "calc.h"` 后调用', '只依赖接口，不知实现']
            ]},

          { t: 'note', k: 'tip', title: 'include guard',
            x: '头文件可能被多次包含，重复声明会报错。惯例在头文件首尾加 `#ifndef CALC_H / #define CALC_H / #endif` 防止重复包含（即 include guard）。现代编译器也支持 `#pragma once`。' },

          { t: 'kp', x: [
            '函数分「原型（声明）」和「定义（实现）」，原型让编译器提前校验',
            'C 参数是按值传递：函数拿到的是副本，改形参不影响外部',
            '想改外部变量，必须传它的地址——引出指针',
            '返回值用 return；main 的返回值交给操作系统',
            '工程上接口放 .h、实现放 .c，用 include guard 防重复包含',
            '头文件是「契约」，源文件是「黑盒实现」'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个 square 函数，返回一个数的平方', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int square(int x) {',
              '    return x * x;',
              '}',
              '',
              'int main(void) {',
              '    printf("square(5) = %d\\n", square(5));',
              '    printf("square(8) = %d\\n", square(8));',
              '    return 0;',
              '}'
            ],
            expect: 'square(5) = 25\nsquare(8) = 64',
            hint: '函数定义在 main 之前就不用写原型了',
            ans: 'square(5)=25，square(8)=64。函数把重复逻辑封装起来，调用时只需要关心输入输出，不用管内部怎么算的。' },
          { t: 'ex', q: '写一个 increment 函数试试：它能改变外面的变量吗？', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'void increment(int x) {',
              '    x = x + 1;',
              '}',
              '',
              'int main(void) {',
              '    int n = 10;',
              '    increment(n);',
              '    printf("n = %d\\n", n);',
              '    return 0;',
              '}'
            ],
            expect: 'n = 10',
            hint: '想想按值传递——函数拿到的是副本还是原件？',
            ans: 'n 还是 10！increment 里的 x 是 n 的副本，x++ 只改了副本，外面的 n 纹丝不动。这就是 C 按值传递的真相——要修改外部变量，下一章学的指针才行。' },
          { t: 'think', q: '为什么 C 里的 swap(int a, int b) 交换不了外部变量？',
            ans: 'C 的参数是按值传递的，函数拿到的是实参的副本。swap 里改的是副本 a、b，外面的原变量 x、y 根本没被碰到。要真正修改外部变量，必须传入它们的地址（指针）——这就是下一章要讲的内容。' },
          { t: 'think', q: '函数声明和函数定义有什么区别？为什么调用前必须先声明？',
            ans: '**声明**（原型）只告诉编译器函数的名字、参数类型和返回类型，不写函数体；**定义**是完整的函数实现，包含函数体。C 编译器是从上到下单遍扫描的，如果调用函数时还没见过它的声明，编译器会「猜测」函数返回 int、参数任意（隐式声明），这往往和真实情况不符，导致运行时错误。所以要么把函数定义放在调用之前，要么在调用前写一行原型声明。' }
        ]
      },

      /* ==================================================== 8 开发环境与工具链 */
      {
        id: 'devtools',
        title: '开发环境与工具链',
        sub: '从编译器到调试器，搭建专业 C 开发环境',
        blocks: [
          { t: 'h2', x: '编译器选择' },
          { t: 'defs', x: [
            { term: 'GCC', desc: 'GNU Compiler Collection，最经典的 C 编译器，跨平台，Linux 默认。gcc -std=c11 -Wall -Wextra -g -O2。支持 C11/C17/C23。' },
            { term: 'Clang', desc: 'LLVM 项目的 C/C++ 编译器，错误提示更友好，编译速度更快，静态分析工具强大。clang -std=c11 -Weverything。macOS 默认（Xcode 命令行工具）。' },
            { term: 'MSVC', desc: 'Microsoft Visual C++，Windows 平台编译器，Visual Studio 内置。cl /std:c11 /W4 /Zi /O2。Windows 开发首选。' },
            { term: 'MinGW-w64', desc: 'Windows 上的 GCC 移植，支持 64 位 Windows。MSYS2 环境提供完整的 GCC + Make + 包管理（pacman）。Windows 上用 GCC 的首选。' },
            { term: 'TinyCC', desc: '极小的 C 编译器（~1MB），编译速度极快，支持直接运行 C 脚本（tcc -run）。适合嵌入式和快速原型。' }
          ]},
          { t: 'code', lang: 'shell', title: 'GCC 常用编译选项', run: false,
            code: [
              'gcc -std=c11 -Wall -Wextra -Wpedantic -g -O2 -o program program.c',
              '',
              '# -std=c11       使用 C11 标准',
              '# -Wall          开启常用警告',
              '# -Wextra        开启额外警告',
              '# -Wpedantic     严格遵循标准',
              '# -g             生成调试信息（GDB 用）',
              '# -O2            优化级别 2（平衡速度和大小）',
              '# -o program     输出文件名',
              '',
              '# 多文件编译',
              'gcc -c main.c -o main.o',
              'gcc -c utils.c -o utils.o',
              'gcc main.o utils.o -o program'
            ]},
          { t: 'note', k: 'warn', title: '警告就是错误',
            x: 'C 语言的编译器警告非常重要——很多 bug 在编译时就能被发现。养成习惯：-Wall -Wextra -Wpedantic 必开，新项目加 -Werror（警告视为错误）。不要忽略警告，更不要用 #pragma 压制警告。' },
          { t: 'h2', x: '构建工具' },
          { t: 'defs', x: [
            { term: 'Make', desc: '经典构建工具，Makefile 定义目标和依赖。make 命令执行构建。适合中小型项目。隐式规则、变量、模式规则。' },
            { term: 'CMake', desc: '跨平台构建系统生成器，CMakeLists.txt 定义构建，生成 Makefile/Ninja/Visual Studio 项目。事实标准，大型项目首选。' },
            { term: 'Meson', desc: '现代构建系统，Python 编写，比 CMake 更快更简单。meson.build 定义构建，Ninja 作为后端。GNOME、Systemd 等项目使用。' },
            { term: 'Ninja', desc: '极速构建执行器，比 Make 快 10 倍以上。通常作为 CMake/Meson 的后端。ninja.build 文件由生成器创建。' },
            { term: 'Autotools', desc: 'GNU 经典构建系统（autoconf/automake/libtool），./configure && make && make install。历史悠久但复杂，新项目不推荐。' }
          ]},
          { t: 'code', lang: 'makefile', title: 'Makefile 示例', run: false,
            code: [
              'CC = gcc',
              'CFLAGS = -std=c11 -Wall -Wextra -Wpedantic -g -O2',
              'LDFLAGS =',
              'TARGET = program',
              'SRCS = $(wildcard *.c)',
              'OBJS = $(SRCS:.c=.o)',
              '',
              '.PHONY: all clean',
              '',
              'all: $(TARGET)',
              '',
              '$(TARGET): $(OBJS)',
              '	$(CC) $(LDFLAGS) -o $@ $^',
              '',
              '%.o: %.c',
              '	$(CC) $(CFLAGS) -c -o $@ $<',
              '',
              'clean:',
              '	rm -f $(OBJS) $(TARGET)'
            ]},
          { t: 'code', lang: 'cmake', title: 'CMakeLists.txt 示例', run: false,
            code: [
              'cmake_minimum_required(VERSION 3.16)',
              'project(MyProject C)',
              '',
              'set(CMAKE_C_STANDARD 11)',
              'set(CMAKE_C_STANDARD_REQUIRED ON)',
              'set(CMAKE_C_EXTENSIONS OFF)',
              '',
              'if(MSVC)',
              '  add_compile_options(/W4 /WX)',
              'else()',
              '  add_compile_options(-Wall -Wextra -Wpedantic -Werror)',
              'endif()',
              '',
              'add_executable(program main.c utils.c)',
              '',
              '# 链接库',
              '# target_link_libraries(program PRIVATE m)',
              '',
              '# 安装',
              'install(TARGETS program DESTINATION bin)'
            ]},
          { t: 'h2', x: 'IDE 与编辑器' },
          { t: 'defs', x: [
            { term: 'VS Code', desc: '免费轻量，安装 C/C++ 扩展（Microsoft 或 clangd）后支持智能补全、调试、lint。配合 CMake Tools 扩展管理 CMake 项目。' },
            { term: 'CLion', desc: 'JetBrains 出品的 C/C++ IDE，付费。智能补全、重构、调试、CMake 集成、Valgrind 集成都是顶级。专业 C/C++ 开发首选。' },
            { term: 'Visual Studio', desc: 'Windows 平台 C/C++ 开发首选，Community 版免费。MSVC 编译器、调试器、性能分析器、静态分析集成度极高。' },
            { term: 'Code::Blocks', desc: '开源跨平台 C/C++ IDE，轻量，自带 MinGW。适合初学者和小型项目。' },
            { term: 'Vim/Neovim + clangd', desc: '终端党首选，clangd 提供 LSP 智能补全，配合 YouCompleteMe/coc.nvim。调试用 vimspector。' }
          ]},
          { t: 'h2', x: '调试工具' },
          { t: 'defs', x: [
            { term: 'GDB', desc: 'GNU 调试器，Linux 默认。gdb ./program 启动。break（断点）、run（运行）、next（下一步）、step（步入）、print（打印变量）、backtrace（调用栈）、continue（继续）。' },
            { term: 'LLDB', desc: 'LLVM 调试器，macOS 默认（Xcode 内置）。API 比 GDB 更现代，Python 脚本支持更好。命令类似 GDB。' },
            { term: 'Valgrind', desc: '内存调试和性能分析工具集。Memcheck 检测内存泄漏、越界访问、使用未初始化内存。valgrind --leak-check=full ./program。Linux 平台。' },
            { term: 'AddressSanitizer', desc: '编译器内置的内存错误检测工具，比 Valgrind 快 10-100 倍。gcc -fsanitize=address -g。检测越界、使用后释放、内存泄漏。' },
            { term: 'UndefinedBehaviorSanitizer', desc: '检测未定义行为：整数溢出、空指针解引用、对齐错误。gcc -fsanitize=undefined。' },
            { term: 'gprof / perf', desc: '性能分析工具。gprof 是 GCC 自带的采样分析器（-pg 编译）。perf 是 Linux 内核级性能分析器，功能更强大。' }
          ]},
          { t: 'code', lang: 'shell', title: 'GDB 常用命令', run: false,
            code: [
              'gdb ./program              # 启动调试',
              '(gdb) break main           # 在 main 函数打断点',
              '(gdb) break 42             # 在第 42 行打断点',
              '(gdb) run                  # 运行程序',
              '(gdb) next                 # 下一步（不进入函数）',
              '(gdb) step                 # 步入函数',
              '(gdb) print variable       # 打印变量值',
              '(gdb) print *array@10      # 打印数组前 10 个元素',
              '(gdb) backtrace            # 查看调用栈',
              '(gdb) continue             # 继续运行',
              '(gdb) quit                 # 退出'
            ]},
          { t: 'code', lang: 'shell', title: 'Sanitizer 编译', run: false,
            code: [
              '# AddressSanitizer（内存错误）',
              'gcc -fsanitize=address -g -O1 -o program program.c',
              '',
              '# UndefinedBehaviorSanitizer（未定义行为）',
              'gcc -fsanitize=undefined -g -o program program.c',
              '',
              '# MemorySanitizer（使用未初始化内存，仅 Clang）',
              'clang -fsanitize=memory -g -O1 -o program program.c',
              '',
              '# ThreadSanitizer（数据竞争）',
              'gcc -fsanitize=thread -g -o program program.c'
            ]},
          { t: 'h2', x: '静态分析与代码质量' },
          { t: 'defs', x: [
            { term: 'cppcheck', desc: 'C/C++ 静态分析工具，检测未使用变量、数组越界、内存泄漏、空指针解引用。cppcheck --enable=all --inconclusive .' },
            { term: 'clang-tidy', desc: 'LLVM 静态分析工具，基于 Clang AST，检测 bug、性能问题、可读性问题。支持自定义检查规则。.clang-tidy 配置文件。' },
            { term: 'scan-build', desc: 'Clang 静态分析器的前端，运行构建并生成 HTML 报告。scan-build make。' },
            { term: 'Splint', desc: '经典 C 静态分析工具（原 LCLint），检测类型错误、内存管理、安全漏洞。比 cppcheck 更严格但更新较慢。' },
            { term: 'clang-format', desc: '代码格式化工具，LLVM 出品。.clang-format 配置文件，支持 Google/LLVM/Mozilla/WebKit 等预设风格。保存时自动格式化。' },
            { term: 'uncrustify', desc: '另一个代码格式化工具，配置选项更丰富（700+ 选项），适合需要精细控制格式的团队。' }
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            '编译器：GCC（Linux 默认）、Clang（macOS/更好的错误提示）、MSVC（Windows）、MinGW-w64（Windows 上的 GCC）',
            '编译选项：-std=c11 -Wall -Wextra -Wpedantic -g -O2 必开，警告就是错误',
            '构建：Make（中小型）、CMake（跨平台事实标准）、Meson（现代轻量）、Ninja（极速执行）',
            'IDE：VS Code（免费）、CLion（专业首选）、Visual Studio（Windows）',
            '调试：GDB/LLDB（断点调试）、Valgrind（内存检测）、AddressSanitizer（编译器内置，更快）',
            '静态分析：cppcheck、clang-tidy、scan-build；格式化：clang-format'
          ]}
        ]
      },

      /* ==================================================== 9 数组与字符串 */
      {
        id: 'collections',
        title: '数组与字符串',
        sub: 'C 没有原生容器：用定长数组与字符数组（C 风格字符串）将就',
        blocks: [
          { t: 'h2', x: 'C 没有「容器」',
            sub: '重要前提',
            x: 'Python 有 list/dict，Java 有 ArrayList/HashMap，而 **C 标准库没有动态容器**。能用的只有：固定大小的**数组**，以及基于字符数组的**字符串**。需要动态增长？自己用 `malloc` + `realloc` 造（后续进阶）。本章先吃透静态数组与字符串。' },

          { t: 'h2', x: '数组：同类型元素的连续块' },
          { t: 'p', x: '声明 `类型 名[长度]`。元素按下标访问，下标从 **0** 开始。数组大小必须是编译期常量（C99 的变长数组 VLA 是例外，但不推荐滥用）。' },

          { t: 'code', lang: 'c', title: '数组求和与下标', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int nums[5] = {10, 20, 30, 40, 50};',
              '    int sum = 0;',
              '    for (int i = 0; i < 5; i++) {',
              '        sum += nums[i];',
              '    }',
              '    printf("数组求和 = %d\\n", sum);',
              '    printf("第三个元素 = %d\\n", nums[2]);',
              '    return 0;',
              '}'
            ],
            expect: '数组求和 = 150\n第三个元素 = 30' },

          { t: 'note', k: 'danger', title: '下标越界不报错',
            x: '访问 `nums[10]` 不会抛异常，而是读取到「数组外面」的内存——可能得到乱值、可能崩溃、也可能暂时正常。这是 C 最危险的坑之一：**编译器不替你检查边界**。' },

          { t: 'defs', x: [
            { term: '数组（Array）', desc: '同类型元素在内存中连续存储的集合，大小在声明时固定，下标从 0 开始。越界访问不会报错，是 C 最常见的 bug 来源。' },
            { term: 'C 风格字符串', desc: '以 \\0（空字符）结尾的 char 数组，不是独立类型。"hi" 实际占 3 字节：h、i、\\0。所有字符串操作都依赖这个结束标记。' },
            { term: '缓冲区溢出', desc: '写入数据超过数组/字符数组的容量，覆盖了相邻内存。轻则数据错乱，重则被攻击者利用执行任意代码，是严重安全漏洞。' },
            { term: 'string.h', desc: 'C 标准库中处理字符串的头文件，提供 strlen（求长度）、strcpy（拷贝）、strcmp（比较）、strcat（拼接）等函数，使用前必须 include。' }
          ]},

          { t: 'note', k: 'tip', title: 'strcpy 不安全，优先用 strncpy',
            x: '`strcpy(dst, src)` 不检查目标缓冲区大小，src 太长就会溢出。更安全的写法是 `strncpy(dst, src, sizeof(dst) - 1)` 并手动补 \\0，或者用 snprintf 统一格式化。' },

          { t: 'h2', x: '字符串：以 \\0 结尾的字符数组' },
          { t: 'p', x: 'C 没有字符串类型。所谓「字符串」就是一串 `char`，以空字符 `\\0` 标记结束。`"Hi"` 实际占 3 字节：`H`、`i`、`\\0`。处理字符串的函数都在 `string.h`。' },

          { t: 'code', lang: 'c', title: '字符串基础与 string.h', run: true,
            code: [
              '#include <stdio.h>',
              '#include <string.h>',
              '',
              'int main(void) {',
              '    char s[20] = "Hello";',
              '    printf("原字符串: %s\\n", s);',
              '    printf("长度: %zu\\n", strlen(s));',
              '    strcat(s, ", C");',
              '    printf("拼接后: %s\\n", s);',
              '    printf("比较 \\"Hello, C\\" : %d\\n", strcmp(s, "Hello, C"));',
              '    return 0;',
              '}'
            ],
            expect: '原字符串: Hello\n长度: 5\n拼接后: Hello, C\n比较 "Hello, C" : 0' },

          { t: 'note', k: 'warn', title: '缓冲区溢出是头号安全漏洞',
            x: '`strcat`/`strcpy` 不会检查目标数组够不够大。把长字符串拷进小数组会**溢出**，覆盖相邻内存——历史上无数漏洞（如 Heartbleed）源于此。安全写法用 `strncat`/`snprintf` 并显式限制长度。' },

          { t: 'table',
            head: ['函数', '作用', '注意'],
            rows: [
              ['`strlen(s)`', '返回长度（不含 \\0）', '返回 size_t，用 %zu 打印'],
              ['`strcpy(d, s)`', '复制字符串', '不检查目标容量，危险'],
              ['`strcat(d, s)`', '拼接字符串', '同理需防溢出'],
              ['`strcmp(a, b)`', '比较：0 相等', '别用 `==` 比字符串'],
              ['`strncpy`/`snprintf`', '带长度限制的版本', '更安全，实战首选']
            ]},

          { t: 'h2', x: '二维数组：矩阵' },
          { t: 'p', x: '`类型 名[行][列]`。内存上仍是连续一维，只是按行排列。常用于网格、图像像素等。' },

          { t: 'code', lang: 'c', title: '二维数组', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int m[2][3] = {{1, 2, 3}, {4, 5, 6}};',
              '    printf("m[1][2] = %d\\n", m[1][2]);',
              '    printf("第二行之和 = %d\\n", m[1][0] + m[1][1] + m[1][2]);',
              '    return 0;',
              '}'
            ],
            expect: 'm[1][2] = 6\n第二行之和 = 15' },

          { t: 'h2', x: '数组会「退化」成指针' },
          { t: 'p', x: '把数组传给函数时，它会被「退化」为指向首元素的指针——所以函数里 `sizeof(arr)` 拿到的是指针大小，而不是整个数组。这正是下一章指针要深讲的点。' },

          { t: 'kp', x: [
            'C 没有动态容器，只有定长数组和字符数组字符串',
            '数组下标从 0 开始，越界不报错、后果不可预测',
            '字符串 = 以 \\0 结尾的 char 数组，函数都在 string.h',
            'strcmp 返回 0 才表示相等，绝不能用 == 比字符串',
            'strcpy/strcat 不检查容量，缓冲区溢出极危险',
            '数组传参会退化为指针，sizeof 不再代表整体'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '求数组 [3, 7, 2, 9, 4] 的平均值', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int nums[5] = {3, 7, 2, 9, 4};',
              '    int sum = 0;',
              '    for (int i = 0; i < 5; i++) {',
              '        sum += nums[i];',
              '    }',
              '    printf("平均值 = %d\\n", sum / 5);',
              '    return 0;',
              '}'
            ],
            expect: '平均值 = 5',
            hint: 'sum=3+7+2+9+4=25，25/5=5',
            ans: '总和 25 除以 5 等于 5。注意整数除法会截断——如果想要小数，需要把 sum 转成 double。' },
          { t: 'think', q: '为什么字符串不能用 == 比较，而要用 strcmp？',
            ans: '字符串名（char 数组名）在表达式里退化为指向首字符的指针。== 比较的是两个地址是否相同，而不是字符串内容。strcmp 才逐字符比较内容，返回 0 表示两个字符串完全相等。' },
          { t: 'think', q: 'char s[6] = "hello"; 和 char *s = "hello"; 有什么本质区别？',
            ans: '前者是**字符数组**，在栈上分配 6 字节（含 \\0），内容可以修改；后者是**字符指针**，指向只读数据段中的字符串常量，内容不可修改（尝试修改会导致段错误）。数组 s 是固定地址，不能 s++；指针 s 是变量，可以 s++ 移动指向。传参时两者都会退化为指针，但存储位置和可修改性完全不同。' }
        ]
      },

      /* ==================================================== 9 指针（C 的灵魂） */
      {
        id: 'pointers',
        title: '指针',
        sub: 'C 的灵魂：取址、解引用、指针运算、数组即指针、函数指针',
        blocks: [
          { t: 'h2', x: '什么是指针' },
          { t: 'p', x: '指针就是**存着另一个变量内存地址**的变量。`&` 取地址，`*` 解引用（按地址取回值）。指针让函数能真正修改外部变量、能遍历大片内存、能动态分配——它是 C 的力量来源，也是 90% bug 的来源。' },

          { t: 'code', lang: 'c', title: '取址与解引用', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int n = 42;',
              '    int *p = &n;            /* p 指向 n */',
              '    printf("n 的值 = %d\\n", n);',
              '    printf("*p 解引用 = %d\\n", *p);',
              '    *p = 100;              /* 通过指针改 n */',
              '    printf("改 *p 后 n = %d\\n", n);',
              '    return 0;',
              '}'
            ],
            expect: 'n 的值 = 42\n*p 解引用 = 42\n改 *p 后 n = 100' },

          { t: 'note', k: 'tip', title: '声明读法',
            x: '`int *p` 读作「p 是指向 int 的指针」。星号紧贴变量名还是类型都行，但建议紧贴变量名：`int *a, *b;` 才表示两个指针；`int* a, b;` 里 b 其实只是普通 int。' },

          { t: 'defs', x: [
            { term: '指针（Pointer）', desc: '存储内存地址的变量。用 & 取变量地址赋给指针，用 * 解引用读取/修改该地址上的值。指针是 C 操作内存的核心手段。' },
            { term: '空指针（NULL）', desc: '值为 0 的指针，表示「不指向任何有效内存」。对空指针解引用会触发 Segmentation fault。使用指针前应检查是否为 NULL。' },
            { term: '野指针（Wild Pointer）', desc: '未初始化的指针，或指向已释放内存的指针。它的值是随机的，解引用可能读到垃圾数据、修改无关内存，或直接崩溃，比空指针更难排查。' },
            { term: '指针运算', desc: '指针加减按「元素个数」而非字节跳转。p+1 跳到下一个同类型元素（int* 跳 4 字节，char* 跳 1 字节），这是指针遍历数组的原理。' }
          ]},

          { t: 'note', k: 'warn', title: 'free 之后立即把指针置为 NULL',
            x: '调用 free(p) 后，p 指向的内存被释放，但 p 本身的值不变，变成「野指针」。如果后续不小心再用 *p，就是访问已释放内存（use-after-free），行为不可预测。好习惯：free(p); 后立刻 p = NULL;，这样再次使用时至少会触发明确的空指针崩溃。' },

          { t: 'h2', x: '指针运算' },
          { t: 'p', x: '指针加减的不是「字节」，而是「元素个数」。`p + 1` 跳到下一个同类型元素。这让指针天然适合遍历数组。' },

          { t: 'code', lang: 'c', title: '指针算术', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int a[4] = {10, 20, 30, 40};',
              '    int *p = a;',
              '    printf("*p = %d\\n", *p);',
              '    p++;',
              '    printf("*p = %d\\n", *p);',
              '    printf("*(p+1) = %d\\n", *(p + 1));',
              '    return 0;',
              '}'
            ],
            expect: '*p = 10\n*p = 20\n*(p+1) = 30' },

          { t: 'h2', x: '数组名就是指针（几乎）' },
          { t: 'p', x: '在大多数语境下，数组名会**退化**成指向首元素的指针。所以 `nums[i]` 完全等价于 `*(nums + i)`。明白这点，C 的字符串、数组、指针就通了。' },

          { t: 'code', lang: 'c', title: '数组与指针等价', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int nums[3] = {5, 6, 7};',
              '    int *p = nums;',
              '    printf("nums[1]   = %d\\n", nums[1]);',
              '    printf("*(nums+1) = %d\\n", *(nums + 1));',
              '    printf("*(p+1)    = %d\\n", *(p + 1));',
              '',
              '    int x = 9;',
              '    int *q = &x;',
              '    int **qq = &q;        /* 指向指针的指针 */',
              '    printf("**qq = %d\\n", **qq);',
              '    return 0;',
              '}'
            ],
            expect: 'nums[1]   = 6\n*(nums+1) = 6\n*(p+1)    = 6\n**qq = 9' },

          { t: 'h2', x: '用指针「修复」交换函数' },
          { t: 'p', x: '回到函数章那个失败的 `swap`：只要传**地址**，函数就能改到外部变量。这是指针最经典的应用。' },

          { t: 'code', lang: 'c', title: '传指针真正交换', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'void swap(int *a, int *b) {',
              '    int t = *a;',
              '    *a = *b;',
              '    *b = t;',
              '}',
              '',
              'int main(void) {',
              '    int x = 1, y = 2;',
              '    printf("交换前: x=%d, y=%d\\n", x, y);',
              '    swap(&x, &y);',
              '    printf("交换后: x=%d, y=%d\\n", x, y);',
              '    return 0;',
              '}'
            ],
            expect: '交换前: x=1, y=2\n交换后: x=2, y=1' },

          { t: 'h2', x: '函数指针' },
          { t: 'p', x: '函数本身也住在内存里，它的地址就是**函数指针**。函数指针让你可以把「行为」当参数传递——回调、策略模式、状态机的底层都靠它。' },

          { t: 'code', lang: 'c', title: '函数指针', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int add(int a, int b) { return a + b; }',
              'int sub(int a, int b) { return a - b; }',
              '',
              'int main(void) {',
              '    int (*op)(int, int) = add;   /* 指向 add */',
              '    printf("add: %d\\n", op(3, 2));',
              '    op = sub;                    /* 换成 sub */',
              '    printf("sub: %d\\n", op(3, 2));',
              '    return 0;',
              '}'
            ],
            expect: 'add: 5\nsub: 1' },

          { t: 'note', k: 'danger', title: '野指针与悬垂指针',
            x: '指向已释放/未初始化内存的指针叫野指针或悬垂指针。解引用它们后果不可预测，常表现为「时好时坏」的崩溃。规则：指针声明即初始化（或置 `NULL`），`free` 后立即置 `NULL`，解引用前先判 `NULL`。' },

          { t: 'kp', x: [
            '指针存的是内存地址；& 取址，* 解引用',
            '指针加减按「元素个数」跳，天然适合遍历数组',
            '数组名在多数语境退化成首元素指针，nums[i] == *(nums+i)',
            '想让函数修改外部变量，传它的地址（指针）',
            '函数指针把「行为」当参数，是回调与策略的基础',
            '野指针/悬垂指针是崩溃元凶：初始化、free 后置 NULL、解引用前判空'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用指针修改变量：通过 *p 把 x 改成 99', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int x = 20;',
              '    int *p = &x;',
              '    printf("x = %d\\n", x);',
              '    printf("*p = %d\\n", *p);',
              '    *p = 99;',
              '    printf("改完后 x = %d\\n", x);',
              '    return 0;',
              '}'
            ],
            expect: 'x = 20\n*p = 20\n改完后 x = 99',
            hint: '&x 取地址给 p，*p 解引用读写那个地址',
            ans: 'p 存的是 x 的内存地址。*p = 99 等价于「把地址里的值改成 99」，所以 x 也变了。这就是指针修改外部变量的原理。' },
          { t: 'ex', q: '用指针遍历数组：从第一个元素走到第四个', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    int arr[5] = {100, 200, 300, 400, 500};',
              '    int *p = arr;',
              '    printf("第一个 = %d\\n", *p);',
              '    p++;',
              '    printf("第二个 = %d\\n", *p);',
              '    printf("第四个 = %d\\n", *(p + 2));',
              '    return 0;',
              '}'
            ],
            expect: '第一个 = 100\n第二个 = 200\n第四个 = 400',
            hint: 'p++ 跳到下一个元素，p+2 跳过两个元素',
            ans: 'p 初始指向 arr[0]=100，p++ 后指向 arr[1]=200，*(p+2) 就是 arr[3]=400。指针加减按「元素个数」跳，这就是指针遍历数组的原理。' },
          { t: 'think', q: '*p 和 &p 分别是什么意思？别搞混了',
            ans: '*p 是解引用——取出指针 p 所存地址里的值；&p 是取地址——获取变量 p 本身在内存中的位置。一个是「按地址读值」，一个是「问指针变量自己的地址在哪」。int **pp = &p; 就是指向指针的指针。' },
          { t: 'think', q: 'int a[5]; 那么 a 和 &a 有什么区别？它们的值一样吗？',
            ans: '它们的**数值**相同（都是数组首元素的地址），但**类型**不同。a 的类型是 int*（指向 int 的指针），a+1 跳过 4 字节（一个 int）；&a 的类型是 int(*)[5]（指向含 5 个 int 的数组的指针），&a+1 跳过整个数组（20 字节）。这就是为什么指针加减的步长取决于指针指向的类型——类型决定了「一步跨多远」。' }
        ]
      },

      /* ==================================================== 10 结构体与「面向对象」 */
      {
        id: 'oop',
        title: '结构体与面向过程',
        sub: '用 struct + typedef 组织数据，用「传指针的函数」模拟方法',
        blocks: [
          { t: 'h2', x: 'C 没有 class，但有 struct' },
          { t: 'p', x: 'C 是纯面向过程语言，没有类、没有继承、没有方法。但 `struct` 能把多个字段打包成一个复合类型；配合 `typedef` 起别名，再让**操作该结构体的函数接收它的指针**，就能模拟出「对象 + 方法」的韵味。' },

          { t: 'h2', x: '定义结构体' },
          { t: 'p', x: '`struct` 用花括号聚合字段。`typedef` 给结构体起个短名字，之后就能像 `int` 一样使用。' },

          { t: 'code', lang: 'c', title: 'struct + typedef', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'typedef struct {',
              '    int id;',
              '    char name[32];',
              '    double score;',
              '} Student;',
              '',
              'int main(void) {',
              '    Student s = {1, "Alice", 92.5};',
              '    printf("id=%d, name=%s, score=%.1f\\n", s.id, s.name, s.score);',
              '    return 0;',
              '}'
            ],
            expect: 'id=1, name=Alice, score=92.5' },

          { t: 'note', k: 'info', title: '. 与 -> 的区别',
            x: '访问结构体字段：变量用点 `.`（如 `s.id`）；**指针**用箭头 `->`（如 `p->id`，等价于 `(*p).id`）。这是 C 里极易混的一点。' },

          { t: 'h2', x: '用函数模拟「方法」' },
          { t: 'p', x: '没有成员函数？那就把结构体指针作为第一个参数传给普通函数，约定「这是对这个对象操作的例程」。传指针还能避免大结构体被整体复制。' },

          { t: 'code', lang: 'c', title: '传指针的「方法」', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'typedef struct {',
              '    int x;',
              '    int y;',
              '} Point;',
              '',
              'void move(Point *p, int dx, int dy) {',
              '    p->x += dx;',
              '    p->y += dy;',
              '}',
              '',
              'int main(void) {',
              '    Point pt = {0, 0};',
              '    printf("初始: (%d, %d)\\n", pt.x, pt.y);',
              '    move(&pt, 3, 4);',
              '    printf("移动后: (%d, %d)\\n", pt.x, pt.y);',
              '    return 0;',
              '}'
            ],
            expect: '初始: (0, 0)\n移动后: (3, 4)' },

          { t: 'h2', x: '结构体数组：简易集合' },
          { t: 'p', x: '把结构体放进数组，就得到「一组对象」。遍历方式与普通数组无异。' },

          { t: 'code', lang: 'c', title: '结构体数组', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'typedef struct {',
              '    int id;',
              '    char name[32];',
              '} Item;',
              '',
              'int main(void) {',
              '    Item items[2] = {{1, "apple"}, {2, "banana"}};',
              '    for (int i = 0; i < 2; i++) {',
              '        printf("%d: %s\\n", items[i].id, items[i].name);',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '1: apple\n2: banana' },

          { t: 'h2', x: '「继承」与「多态」的穷人版' },
          { t: 'p', x: '真正的继承/多态 C 没有，但工程里有惯用法：让一个结构体把「公共字段」放最前，后面的「子类」结构体首字段是它——通过指针强制转换实现「基类视角」。这是 Linux 内核等大量 C 项目的常见技巧（不展开，知道存在即可）。' },

          { t: 'table',
            head: ['面向对象概念', 'C 的对应做法'],
            rows: [
              ['对象/数据', '`struct` + `typedef` 聚合字段'],
              ['方法', '第一个参数是结构体指针的普通函数'],
              ['封装', '头文件只暴露必要函数，隐藏字段细节'],
              ['构造/析构', '自己写 `create_xxx` / `destroy_xxx` 函数'],
              ['继承/多态', '结构体首字段复用 + 函数指针（进阶手法）']
            ]},

          { t: 'note', k: 'tip', title: 'C 的「面向对象」够用吗',
            x: '对操作系统、驱动、嵌入式这类追求极简与可控的场景，struct + 函数指针的组合足够且高效。需要复杂继承多态的业务系统，通常会换 C++/Java。理解这层映射，你看任何 C 项目都不会再困惑。' },

          { t: 'kp', x: [
            'C 无 class，用 struct 聚合数据，typedef 起别名',
            '变量用 . 访问字段，指针用 -> 访问字段',
            '把结构体指针作首个参数传给函数 = 模拟「方法」',
            '传指针还能避免大结构体被整体复制，效率高',
            '结构体数组即「一组对象」，遍历同普通数组',
            '构造/析构、封装靠约定与头文件；继承多态有进阶惯用法'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '定义一个 Point 结构体并打印坐标', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'typedef struct {',
              '    int x;',
              '    int y;',
              '} Point;',
              '',
              'int main(void) {',
              '    Point p = {3, 4};',
              '    printf("(%d, %d)\\n", p.x, p.y);',
              '    return 0;',
              '}'
            ],
            expect: '(3, 4)',
            hint: '用 typedef struct {...} 起别名，之后就能像 int 一样用',
            ans: 'Point 把 x 和 y 打包成一个类型。访问字段用点号 .，p.x 就是 3，p.y 就是 4。' },
          { t: 'ex', q: '写一个 move 函数，通过指针修改 Point 的坐标', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'typedef struct {',
              '    int x;',
              '    int y;',
              '} Point;',
              '',
              'void move(Point *p, int dx, int dy) {',
              '    p->x += dx;',
              '    p->y += dy;',
              '}',
              '',
              'int main(void) {',
              '    Point pt = {0, 0};',
              '    move(&pt, 5, 2);',
              '    printf("(%d, %d)\\n", pt.x, pt.y);',
              '    return 0;',
              '}'
            ],
            expect: '(5, 2)',
            hint: '指针用 -> 访问字段，传参时要取地址 &pt',
            ans: 'move 接收 Point 指针，用 -> 修改字段。传 &pt 而不是 pt，这样函数改的是外面的真 Point，不是副本。' },
          { t: 'think', q: '访问结构体字段时，什么时候用 . 什么时候用 ->？',
            ans: '变量本身用点 .（如 p.x）；指针用箭头 ->（如 ptr->x，等价于 (*ptr).x）。因为指针需要先解引用才能访问成员，-> 就是这个操作的简写，写起来更清爽。' },
          { t: 'think', q: '结构体作为函数参数按值传递时，会发生什么？大结构体传参有什么问题？',
            ans: '按值传递会把整个结构体**拷贝一份**到函数栈上。如果结构体很大（比如包含几百字节的数组），拷贝开销很大，既慢又占栈空间。而且函数里修改的是副本，外面的原结构体不受影响。正确做法是传结构体指针（`void func(struct Point *p)`），只拷贝一个地址（4 或 8 字节），还能直接修改原结构体。' }
        ]
      },

      /* ==================================================== 11 错误处理 */
      {
        id: 'errors',
        title: '错误处理',
        sub: '返回码、errno、assert 与防御性编程——C 没有异常',
        blocks: [
          { t: 'h2', x: 'C 没有 try / catch' },
          { t: 'p', x: 'C 没有异常机制。错误处理靠三板斧：**返回码**（函数返回特殊值表示失败）、**errno**（系统调用设置的全局错误号）、**assert**（开发期断言）。养成「每个可能失败的函数都要被检查」的习惯。' },

          { t: 'defs', x: [
            { term: '返回码', desc: '函数用返回值表示成功/失败的约定（通常 0 表示成功，非 0 表示失败）。需要输出结果时通过指针参数带出。调用方必须检查返回值，不能假设一定成功。' },
            { term: 'errno', desc: '标准库/系统函数失败时设置的全局错误号（需 #include <errno.h>）。不同错误对应不同编号（如 ENOENT 表示文件不存在），可用 perror 打印人类可读的描述。' },
            { term: 'assert', desc: '开发期断言宏，条件为假时终止程序并打印文件名和行号。发布版定义 NDEBUG 后会被全部移除，只用于检查内部不变量，不能处理外部错误。' },
            { term: '防御性编程', desc: '在函数入口检查参数合法性（如指针非空、下标在范围内、除数不为 0），提前拦截非法输入并返回错误码，而不是让错误在深处爆发。' }
          ]},

          { t: 'note', k: 'warn', title: '不要忽略函数返回值',
            x: 'C 里最危险的习惯之一是「调用了 fopen/malloc/scanf 却不检查返回值」。如果 fopen 返回 NULL 你还继续 fread，程序直接崩溃；如果 malloc 返回 NULL 你还往里写数据，就是野指针写内存。每一个可能失败的调用，都要有对应的 if 检查。' },

          { t: 'h2', x: '返回码模式' },
          { t: 'p', x: '约定：成功返回 0，失败返回非 0；需要输出结果时，通过**指针参数**带出。调用方必须检查返回值。' },

          { t: 'code', lang: 'c', title: '返回码 + 出参', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int divide(int a, int b, int *result) {',
              '    if (b == 0) return -1;   /* 错误：除零 */',
              '    *result = a / b;',
              '    return 0;                /* 成功 */',
              '}',
              '',
              'int main(void) {',
              '    int r;',
              '    if (divide(10, 2, &r) == 0) {',
              '        printf("10 / 2 = %d\\n", r);',
              '    }',
              '    if (divide(10, 0, &r) != 0) {',
              '        printf("除以零被拒绝\\n");',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '10 / 2 = 5\n除以零被拒绝' },

          { t: 'h2', x: 'errno：系统调用的错误号' },
          { t: 'p', x: '很多标准库/系统函数在失败时把具体原因写进全局变量 `errno`（需 `#include <errno.h>`）。不同错误对应不同编号（如文件不存在是 `ENOENT`）。' },

          { t: 'code', lang: 'c', title: 'errno 编号', run: true,
            code: [
              '#include <stdio.h>',
              '#include <errno.h>',
              '',
              'int main(void) {',
              '    errno = 0;',
              '    FILE *f = fopen("/no/such/file.txt", "r");',
              '    if (f == NULL) {',
              '        printf("打开失败，errno = %d\\n", errno);',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '打开失败，errno = 2' },

          { t: 'note', k: 'warn', title: ' errno 要在调用后立即读取',
            x: '`errno` 是全局共享的，中间一旦调用了别的可能失败的函数，它会被覆盖。正确做法：调用失败后**立刻**读取 errno（或立刻 `perror`/`strerror`）。本例先 `errno = 0` 再调用，确保读到的是本次的结果。' },

          { t: 'h2', x: 'assert：开发期的保险丝' },
          { t: 'p', x: '`assert(条件)` 在条件为假时中止程序并打印位置。它用于捕捉「绝不该发生」的内部逻辑错误，而非处理正常的外部失败。注意：定义了 `NDEBUG` 后 assert 会被整体删除——所以它不能承担运行时错误处理。' },

          { t: 'code', lang: 'c', title: 'assert 断言', run: true,
            code: [
              '#include <stdio.h>',
              '#include <assert.h>',
              '',
              'int main(void) {',
              '    int x = 5;',
              '    assert(x == 5);          /* 成立，程序继续 */',
              '    printf("断言通过，继续\\n");',
              '    return 0;',
              '}'
            ],
            expect: '断言通过，继续' },

          { t: 'h2', x: '防御性编程' },
          { t: 'p', x: '对外部输入（用户输入、文件、网络、函数参数）一律不信任。**解引用指针前判 NULL**，数组访问前核边界，资源用完即释放。' },

          { t: 'code', lang: 'c', title: '判空防御', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'void safe_print(const char *s) {',
              '    if (s == NULL) {',
              '        printf("(null)\\n");',
              '        return;',
              '    }',
              '    printf("%s\\n", s);',
              '}',
              '',
              'int main(void) {',
              '    safe_print("hello");',
              '    safe_print(NULL);',
              '    return 0;',
              '}'
            ],
            expect: 'hello\n(null)' },

          { t: 'note', k: 'danger', title: '不要忽略返回值',
            x: '`malloc` 可能返回 NULL（内存耗尽），`fopen` 可能失败，`scanf` 可能只读入部分数据。把这些返回值赋给变量却不用，编译器也许只给个警告，但生产环境就是崩溃或安全漏洞的来源。检查每一个可能失败的返回值。' },

          { t: 'kp', x: [
            'C 没有异常：靠返回码、errno、assert 三板斧',
            '约定成功返回 0、失败返回非 0；结果用指针参数带出',
            'errno 是全局错误号，调用失败后要立即读取',
            'assert 抓「不该发生」的内部错误，NDEBUG 下会被删除',
            '防御性编程：解引用前判 NULL、访问前核边界',
            '永远检查 malloc/fopen/scanf 等可能失败的返回值'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个 safe_div 函数：除零时返回错误码，正常时用指针带出结果', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int safe_div(int a, int b, int *out) {',
              '    if (b == 0) return -1;',
              '    *out = a / b;',
              '    return 0;',
              '}',
              '',
              'int main(void) {',
              '    int r;',
              '    if (safe_div(20, 4, &r) == 0) {',
              '        printf("结果 = %d\\n", r);',
              '    }',
              '    return 0;',
              '}'
            ],
            expect: '结果 = 5',
            hint: '成功返回 0，结果通过 out 指针写出去',
            ans: '这是 C 错误处理的标准范式：返回码表示成功失败，结果用指针参数带出。调用方必须检查返回值，不能假设一定成功。' },
          { t: 'think', q: 'assert 适合用来处理「文件打不开」这类运行时错误吗？',
            ans: '不适合。assert 只用于捕捉「绝不该发生」的内部逻辑错误，而且在发布模式（定义了 NDEBUG）后会被整体删除，根本不会执行。文件打不开、用户输入非法这类外部失败，应该用返回码或 errno 来处理。' },
          { t: 'think', q: 'errno 在函数调用成功后会被清零吗？使用 errno 时要注意什么？',
            ans: '**不会**。标准库函数成功时不会修改 errno，只有失败时才设置。所以 errno 里可能残留着上一次失败的值。正确用法是：调用函数前先把 errno = 0，调用后立即检查返回值，如果返回值表明失败再读 errno。不能只看 errno 非零就判断失败——必须先看函数返回值。另外 errno 是线程局部的，多线程下各自独立。' }
        ]
      },

      /* ==================================================== 12 现代 C（C11） */
      {
        id: 'modern',
        title: '现代 C',
        sub: 'C11 的 _Generic、_Static_assert、stdint.h 固定宽度类型与 inline',
        blocks: [
          { t: 'h2', x: '为什么需要「现代 C」' },
          { t: 'p', x: 'C 标准演进到 C11（2011），引入了若干提升安全与表达力的特性。其中 **stdint.h 固定宽度类型**在跨平台时几乎必备——`int` 在不同机器上可能是 2 或 4 字节，而 `int32_t` 永远精确 32 位。' },

          { t: 'h2', x: 'stdint.h：精确宽度的整数' },
          { t: 'p', x: '网络协议、文件格式、加密算法都要求「字节级精确」。用 `int32_t`/`uint64_t` 等替代裸 `int`，代码行为不再依赖平台。' },

          { t: 'code', lang: 'c', title: '固定宽度类型', run: true,
            code: [
              '#include <stdio.h>',
              '#include <stdint.h>',
              '',
              'int main(void) {',
              '    int32_t a = 2147483647;',
              '    uint64_t b = 123456789012345ULL;',
              '    printf("a = %d\\n", (int)a);',
              '    printf("b = %llu\\n", (unsigned long long)b);',
              '    return 0;',
              '}'
            ],
            expect: 'a = 2147483647\nb = 123456789012345' },

          { t: 'note', k: 'info', title: '打印固定宽度类型',
            x: '`uint64_t` 不一定等于 `unsigned long long`，严谨做法是用 `PRIu64` 宏（`inttypes.h`）。本例在常见 64 位平台上 `unsigned long long` 足够；实战跨平台建议用 `PRIu64`。' },

          { t: 'h2', x: '_Static_assert：编译期断言' },
          { t: 'p', x: '`_Static_assert(条件, 消息)` 在**编译时**检查条件。不满足直接编译失败，且不产生任何运行时开销、也不输出任何内容。用来锁死「int 必须是 4 字节」这类假设极佳。' },

          { t: 'code', lang: 'c', title: '编译期断言', run: true,
            code: [
              '#include <stdio.h>',
              '#include <stdint.h>',
              '#include <assert.h>',
              '',
              '_Static_assert(sizeof(int32_t) == 4, "int32_t 必须是 4 字节");',
              '_Static_assert(sizeof(void *) == 8, "本机指针应为 8 字节");',
              '',
              'int main(void) {',
              '    printf("编译期断言全部通过\\n");',
              '    return 0;',
              '}'
            ],
            expect: '编译期断言全部通过' },

          { t: 'h2', x: 'inline：建议编译器内联' },
          { t: 'p', x: '`inline` 建议编译器把小函数体直接展开到调用处，省去函数调用的开销（只是「建议」，编译器可忽略）。配合 `static` 避免多重定义。' },

          { t: 'code', lang: 'c', title: 'inline 函数', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'static inline int square(int x) {',
              '    return x * x;',
              '}',
              '',
              'int main(void) {',
              '    printf("square(9) = %d\\n", square(9));',
              '    return 0;',
              '}'
            ],
            expect: 'square(9) = 81' },

          { t: 'h2', x: '_Generic：编译期类型分发' },
          { t: 'p', x: '`_Generic` 根据表达式的**类型**在编译期选择不同分支，是 C 实现「泛型宏」的手段（比如让一个 `print` 宏对不同类型走不同逻辑）。' },

          { t: 'code', lang: 'c', title: '_Generic 泛型宏', run: true,
            code: [
              '#include <stdio.h>',
              '',
              '#define type_name(x) _Generic((x), \\',
              '    int: "int", \\',
              '    double: "double", \\',
              '    char *: "char*")',
              '',
              'int main(void) {',
              '    printf("%s\\n", type_name(42));',
              '    printf("%s\\n", type_name(3.14));',
              '    printf("%s\\n", type_name("hi"));',
              '    return 0;',
              '}'
            ],
            expect: 'int\ndouble\nchar*' },

          { t: 'note', k: 'tip', title: '现代 C 推荐基线',
            x: '新项目一律用 `-std=c11`（或更新的 C17/C23）。配合 `-Wall -Wextra`，并优先使用 `stdint.h`、`_Static_assert`、泛型宏来换取可移植性与安全性。老式「K&R」风格代码（参数写在函数体和 `/* */` 注释）已不推荐。' },

          { t: 'kp', x: [
            'stdint.h 提供精确宽度类型：int32_t / uint64_t 跨平台一致',
            '打印固定宽度类型严谨用 inttypes.h 的 PRI 宏',
            '_Static_assert 做编译期检查，失败即编译错误、零运行时开销',
            'inline 建议编译器展开小函数，常用于 static 辅助函数',
            '_Generic 按类型编译期分发，是泛型宏的基础',
            '新项目基线：C11 + -Wall -Wextra，弃用 K&R 老风格'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 int32_t 做加法，确保跨平台行为一致', lang: 'c',
            code: [
              '#include <stdio.h>',
              '#include <stdint.h>',
              '',
              'int main(void) {',
              '    int32_t a = 100;',
              '    int32_t b = 200;',
              '    printf("和 = %d\\n", (int)(a + b));',
              '    return 0;',
              '}'
            ],
            expect: '和 = 300',
            hint: 'int32_t 保证在任何平台上都是精确 32 位',
            ans: '100+200=300。重点不是算得多复杂，而是体会 int32_t 的用法——网络协议、文件格式等需要精确字节布局的场景，必须用这种固定宽度类型。' },
          { t: 'think', q: '为什么跨平台代码推荐用 int32_t 而不是 int？',
            ans: 'int 的大小在不同平台上可能是 2 字节或 4 字节，而 int32_t 保证在任何平台上都恰好是 32 位。换个平台编译，int 的行为可能变，但 int32_t 永远一样。需要精确字节布局的代码（协议、文件格式）必须用固定宽度类型。' },
          { t: 'think', q: '_Static_assert 和 assert 有什么区别？各自用在什么场景？',
            ans: '`_Static_assert` 是**编译期**断言，在编译时检查常量表达式，失败直接编译报错，不产生任何运行时代码；`assert` 是**运行期**断言，程序跑起来才检查，失败时终止进程。_Static_assert 适合检查编译期就能确定的事（如结构体大小、枚举值范围、类型宽度），assert 适合检查运行时的变量状态。两者互补：编译期能查的就别留到运行期。' }
        ]
      },

      /* ==================================================== 调试与排错 */
      {
        id: 'debugging',
        title: '调试与排错',
        sub: '从编译报错到段错误：建立一套属于你的排查思路',
        blocks: [
          { t: 'p', x: 'C 语言的调试和别的语言不太一样——它没有运行时异常替你兜底，数组越界、空指针、野指针都可能让程序直接崩溃，甚至「看起来能跑」却在某个时刻突然炸掉。所以调试 C 的核心心智模型是：**先分清是编译期错误还是运行期问题，再用工具逐层缩小范围**。编译期错误编译器会直接告诉你哪一行有问题，运行期问题则需要你自己插桩、断言、用调试器追踪。' },
          { t: 'p', x: '一个高效的调试流程通常是：先开 `-Wall -Wextra` 把警告当错误看，再用 `printf` 或 `assert` 缩小崩溃范围，最后用 `gdb` 精确定位。内存问题则交给 `valgrind` 或 AddressSanitizer。不要一上来就盯着代码瞎猜——**让工具告诉你真相**。' },

          { t: 'h2', x: '常见的坑' },
          { t: 'table', head: ['报错或现象', '原因', '处理办法'], rows: [
            ['`Segmentation fault (core dumped)`', '访问了非法内存地址：空指针解引用、数组越界、已释放内存再访问', '用 gdb 跑 `bt` 看崩溃栈，检查指针是否为 NULL、下标是否越界'],
            ['`error: expected \';\' before \'}\' token`', '上一条语句漏了分号，编译器在花括号处才发现', '看报错行的上一行，补上缺失的分号'],
            ['`warning: implicit declaration of function \'foo\'`', '调用了未声明的函数（C99 前允许隐式声明，C99 起是警告/错误）', '在调用前加函数原型声明，或 include 对应头文件'],
            ['`undefined reference to \'bar\'`', '链接阶段找不到函数实现：只声明了没定义，或忘了链接对应的 .o / 库', '检查函数是否有定义体，编译时把所有源文件一起传进去'],
            ['`Bus error`', '访问了未对齐的内存地址（如在奇数地址读 int），或映射了不可访问的内存', '检查指针强制转换和结构体对齐，避免把 char* 强转成 int* 后直接解引用'],
            ['程序无报错但内存占用持续上涨', 'malloc 后忘记 free，造成内存泄漏', '用 valgrind --leak-check=full 检测，确保每条 malloc 都有对应 free']
          ]},

          { t: 'h2', x: '调试手段' },
          { t: 'p', x: '最朴素也最有效的手段是 **printf 插桩**——在可疑位置打印变量值，看程序到底跑到了哪、数据变成了什么。注意 stdout 是行缓冲的，崩溃前可能没刷新出来，加 `fflush(stdout)` 确保打印落地。' },
          { t: 'code', lang: 'c', title: 'printf 插桩定位崩溃', run: false, ed: false,
            code: [
              '#include <stdio.h>',
              '#include <stdlib.h>',
              '',
              'int main(void) {',
              '    int *p = NULL;',
              '    printf("阶段1：p 已初始化为 NULL\\n");',
              '    fflush(stdout);  /* 确保上面的打印在崩溃前输出 */',
              '    /* *p = 42; */   /* 这行会段错误，先注释掉确认前面正常 */',
              '    printf("阶段2：如果看到这行，说明前面没崩\\n");',
              '    fflush(stdout);',
              '    return 0;',
              '}'
            ],
            note: '把可疑代码逐段注释，看程序能跑到哪一步，崩溃点就锁定在最后一个能打印的位置之后。' },

          { t: 'p', x: '**assert 宏**用来在开发期检查「绝不该发生」的条件。条件为假时直接终止程序并打印文件名和行号，比 printf 更精准。发布版定义 `NDEBUG` 后 assert 会被全部移除，所以它只用于开发期自检，不能用来处理真实错误。' },
          { t: 'code', lang: 'c', title: 'assert 开发期断言', run: false, ed: false,
            code: [
              '#include <stdio.h>',
              '#include <assert.h>',
              '',
              'double average(int *arr, int n) {',
              '    assert(arr != NULL);   /* 数组指针不能为空 */',
              '    assert(n > 0);          /* 元素个数必须为正 */',
              '    int sum = 0;',
              '    for (int i = 0; i < n; i++) sum += arr[i];',
              '    return (double)sum / n;',
              '}',
              '',
              'int main(void) {',
              '    int data[3] = {1, 2, 3};',
              '    printf("平均值 = %.1f\\n", average(data, 3));',
              '    /* average(NULL, 0); */  /* 打开这行会触发 assert 并终止 */',
              '    return 0;',
              '}'
            ],
            note: 'assert 检查的是「程序员的假设」，不是「用户输入是否合法」。用户输入非法要用返回码处理。' },

          { t: 'p', x: '当 printf 和 assert 不够用时，就该上 **gdb 调试器**了。编译时加 `-g` 保留调试信息，然后在 gdb 里设断点、单步执行、查看变量。常用命令：`break 行号` 设断点、`run` 启动、`next` 跳过函数、`step` 进入函数、`print 变量` 查看值、`backtrace` 看调用栈。' },
          { t: 'code', lang: 'c', title: 'gdb 调试思维演示', run: false, ed: false,
            code: [
              '/* 编译：gcc -g -Wall demo.c -o demo */',
              '/* 启动：gdb ./demo */',
              '/* (gdb) break 10        ← 在第 10 行设断点 */',
              '/* (gdb) run             ← 运行到断点停下 */',
              '/* (gdb) print i         ← 查看变量 i 的值 */',
              '/* (gdb) next            ← 执行下一行（不进函数） */',
              '/* (gdb) step            ← 进入函数内部 */',
              '/* (gdb) backtrace       ← 查看当前调用栈 */',
              '/* (gdb) continue        ← 继续运行到下一个断点 */',
              '/* (gdb) quit            ← 退出 */',
              '',
              '#include <stdio.h>',
              '',
              'int factorial(int n) {',
              '    if (n <= 1) return 1;',
              '    return n * factorial(n - 1);  /* 在这里设断点看递归展开 */',
              '}',
              '',
              'int main(void) {',
              '    int r = factorial(5);',
              '    printf("5! = %d\\n", r);',
              '    return 0;',
              '}'
            ],
            note: 'gdb 的核心价值是「让程序暂停在你想停的地方」，然后逐行看变量怎么变，比瞎猜高效十倍。' },

          { t: 'note', k: 'tip', title: '编译选项是调试的第一道防线',
            x: '养成习惯：开发阶段一律 `gcc -g -Wall -Wextra` 编译。`-g` 保留调试信息让 gdb 能用，`-Wall -Wextra` 把潜在问题（未使用变量、隐式声明、类型不匹配）变成警告。警告不是「建议」，是「编译器在帮你找 bug」，尽量全部消除。' },
          { t: 'note', k: 'warn', title: '内存问题别靠肉眼看',
            x: '内存泄漏、野指针、重复 free 这类问题，肉眼几乎不可能发现。用 `valgrind --leak-check=full ./程序名` 跑一遍，它会告诉你哪一行 malloc 的内存没释放、哪一行访问了已释放的内存。Linux 上还可以用 `-fsanitize=address` 编译（AddressSanitizer），性能更好、报错更精准。' },

          { t: 'think', q: '程序报 Segmentation fault，但你不确定是哪一行崩溃的，第一步该做什么？',
            ans: '先用 `gcc -g` 重新编译（保留调试信息），然后用 `gdb ./程序名` 启动，输入 `run` 让它跑起来。崩溃后 gdb 会自动停在崩溃点，输入 `backtrace`（或 `bt`）就能看到完整的调用栈，直接定位到是哪个函数、哪一行触发的崩溃。这比在代码里到处加 printf 快得多。' },
          { t: 'think', q: '为什么说 assert 不能用来处理「用户输入了非法数据」这种情况？',
            ans: '因为 assert 在发布版（定义了 NDEBUG）会被完全删除，根本不会执行。如果用 assert 检查用户输入，开发时看起来没问题，发布后 assert 消失了，非法输入就直接溜进逻辑里。正确做法是用 if 判断 + 返回码/errno 来处理外部输入，assert 只用来检查「程序员自己保证的内部不变量」（比如指针不该为 NULL、数组长度不该为 0）。' },

          { t: 'kp', x: [
            '调试分两步：先看编译报错（编译器直接告诉你行号），再查运行期问题（崩溃/泄漏/逻辑错）',
            'printf 插桩 + fflush(stdout) 是最朴素的定位手段，逐段注释缩小范围',
            'assert 只用于开发期内部自检，发布版会被删除，不能处理外部错误',
            'gdb 是终极武器：break 设断点、run 运行、print 看变量、backtrace 看调用栈',
            '内存问题交给 valgrind 或 AddressSanitizer，别靠肉眼猜',
            '开发编译一律加 -g -Wall -Wextra，警告就是编译器在帮你找 bug'
          ]}
        ]
      },

      /* ==================================================== 13 第三方库与生态 */
      {
        id: 'libraries',
        title: '第三方库与生态',
        sub: '从数据结构到网络编程，掌握 C 语言最有价值的生态',
        blocks: [
          { t: 'h2', x: '通用工具库' },
          { t: 'defs', x: [
            { term: 'GLib', desc: 'GTK 项目的基础库，提供数据结构（链表、哈希表、树、数组）、字符串处理、文件操作、主循环、线程、正则表达式。GNOME 生态基石。功能全面但较重。' },
            { term: 'klib', desc: 'Attractive Chaos 出品的轻量工具库，头文件-only。kvec（动态数组）、khash（哈希表）、kbtree（B树）、ksort（排序）、kseq（FASTA/FASTQ 解析）。生物信息学领域广泛使用。' },
            { term: 'uthash', desc: '头文件-only 的哈希表实现，直接给结构体加 UT_hash_handle 字段即可用。简单、轻量、无依赖。适合需要哈希表的小项目。' },
            { term: 'SDS', desc: 'Redis 出品的简单动态字符串库，替代 C 标准字符串。自动扩容、二进制安全、长度 O(1) 获取、与 C 字符串兼容。Redis、Valkey 等项目使用。' },
            { term: 'libcello', desc: 'C 语言的高级编程库，提供泛型、异常处理、垃圾回收、面向对象、接口。让 C 写起来像高级语言，但有运行时开销。' }
          ]},
          { t: 'code', lang: 'c', title: 'uthash 示例', run: false,
            code: [
              '#include "uthash.h"',
              '#include <stdio.h>',
              '#include <string.h>',
              '',
              'typedef struct {',
              '    char name[20];          // key',
              '    int age;                // value',
              '    UT_hash_handle hh;      // uthash 必需字段',
              '} User;',
              '',
              'User *users = NULL;',
              '',
              'void add_user(const char *name, int age) {',
              '    User *u = malloc(sizeof(User));',
              '    strncpy(u->name, name, sizeof(u->name)-1);',
              '    u->age = age;',
              '    HASH_ADD_STR(users, name, u);',
              '}',
              '',
              'User *find_user(const char *name) {',
              '    User *u;',
              '    HASH_FIND_STR(users, name, u);',
              '    return u;',
              '}',
              '',
              'int main() {',
              '    add_user("Alice", 25);',
              '    add_user("Bob", 30);',
              '    User *u = find_user("Alice");',
              '    if (u) printf("%s is %d years old\\n", u->name, u->age);',
              '    return 0;}'
            ]},
          { t: 'h2', x: '网络编程' },
          { t: 'defs', x: [
            { term: 'libcurl', desc: '最流行的 HTTP/FTP 客户端库，支持几乎所有协议。curl_easy_init/setopt/perform/cleanup。同步和异步（multi）接口。跨平台，文档完善。' },
            { term: 'libuv', desc: 'Node.js 使用的跨平台异步 I/O 库。事件循环、异步文件 I/O、TCP/UDP、定时器、线程池、进程管理。高性能网络服务的基石。' },
            { term: 'libevent', desc: '经典的事件驱动网络库，封装 epoll/kqueue/IOCP。bufferevent 提供缓冲 I/O，evhttp 提供 HTTP 服务。Tor、Memcached 使用。' },
            { term: 'libev', desc: 'libevent 的轻量替代，更简单更快，只做事件循环（不包含 HTTP/DNS 等高层协议）。适合需要高性能事件循环的项目。' },
            { term: 'mongoose', desc: '极简嵌入式 Web 服务器，单文件（mongoose.c + mongoose.h），支持 HTTP/WebSocket/MQTT/CoAP。适合嵌入式设备和微服务。' },
            { term: 'civetweb', desc: 'mongoose 的分支，更活跃的维护，支持更多功能（SSL、CGI、Lua 脚本）。' }
          ]},
          { t: 'code', lang: 'c', title: 'libcurl HTTP GET', run: false,
            code: [
              '#include <curl/curl.h>',
              '#include <stdio.h>',
              '#include <stdlib.h>',
              '#include <string.h>',
              '',
              'typedef struct {',
              '    char *data;',
              '    size_t size;',
              '} Response;',
              '',
              'static size_t write_cb(void *ptr, size_t size, size_t nmemb, void *userdata) {',
              '    Response *resp = (Response *)userdata;',
              '    size_t total = size * nmemb;',
              '    resp->data = realloc(resp->data, resp->size + total + 1);',
              '    memcpy(resp->data + resp->size, ptr, total);',
              '    resp->size += total;',
              '    resp->data[resp->size] = "\\0";',
              '    return total;',
              '}',
              '',
              'int main(void) {',
              '    CURL *curl = curl_easy_init();',
              '    Response resp = {0};',
              '    curl_easy_setopt(curl, CURLOPT_URL, "https://api.example.com/data");',
              '    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_cb);',
              '    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &resp);',
              '    curl_easy_perform(curl);',
              '    printf("%s\\n", resp.data);',
              '    free(resp.data);',
              '    curl_easy_cleanup(curl);',
              '    return 0;}'
            ]},
          { t: 'h2', x: '数据库' },
          { t: 'defs', x: [
            { term: 'SQLite', desc: '嵌入式关系型数据库，单文件、零配置、事务支持、ACID。sqlite3.h 接口简洁。全世界部署最广的数据库（浏览器、手机、应用内嵌）。适合中小型应用和嵌入式设备。' },
            { term: 'libpq', desc: 'PostgreSQL 官方 C 客户端库。PQconnectdb/PQexec/PQgetvalue。支持异步查询、LISTEN/NOTIFY、COPY。PostgreSQL 生态基础。' },
            { term: 'hiredis', desc: 'Redis 官方 C 客户端库，极简 API。redisConnect/redisCommand/redisFree。支持同步和异步（hiredis-async）。轻量、快速。' },
            { term: 'MySQL Connector/C', desc: 'MySQL 官方 C 客户端库（原 libmysqlclient）。mysql_init/mysql_real_connect/mysql_query/mysql_store_result。' },
            { term: 'LMDB', desc: '超快的嵌入式键值数据库，内存映射、零拷贝、ACID、读无锁。比 SQLite 快 10 倍以上。适合高性能缓存和配置存储。OpenLDAP 项目出品。' },
            { term: 'LevelDB', desc: 'Google 出品的嵌入式键值数据库，LSM 树存储，写性能极佳。C++ 编写但有 C 封装（leveldb-c）。适合写多读少的场景。' }
          ]},
          { t: 'code', lang: 'c', title: 'SQLite 基本操作', run: false,
            code: [
              '#include <sqlite3.h>',
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    sqlite3 *db;',
              '    sqlite3_open("test.db", &db);',
              '',
              '    // 创建表',
              '    sqlite3_exec(db, "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)", NULL, NULL, NULL);',
              '',
              '    // 插入（参数化查询，防 SQL 注入）',
              '    sqlite3_stmt *stmt;',
              '    sqlite3_prepare_v2(db, "INSERT INTO users (name, age) VALUES (?, ?)", -1, &stmt, NULL);',
              '    sqlite3_bind_text(stmt, 1, "Alice", -1, SQLITE_TRANSIENT);',
              '    sqlite3_bind_int(stmt, 2, 25);',
              '    sqlite3_step(stmt);',
              '    sqlite3_finalize(stmt);',
              '',
              '    // 查询',
              '    sqlite3_prepare_v2(db, "SELECT id, name, age FROM users", -1, &stmt, NULL);',
              '    while (sqlite3_step(stmt) == SQLITE_ROW) {',
              '        printf("ID: %d, Name: %s, Age: %d\\n",',
              '               sqlite3_column_int(stmt, 0),',
              '               sqlite3_column_text(stmt, 1),',
              '               sqlite3_column_int(stmt, 2));',
              '    }',
              '    sqlite3_finalize(stmt);',
              '    sqlite3_close(db);',
              '    return 0;}'
            ]},
          { t: 'h2', x: 'JSON / XML / 配置解析' },
          { t: 'defs', x: [
            { term: 'cJSON', desc: '极简 JSON 解析/生成库，单文件（cJSON.c + cJSON.h），MIT 协议。cJSON_Parse/cJSON_GetObjectItem/cJSON_Print。适合嵌入式和小型项目。' },
            { term: 'jansson', desc: '功能更全的 JSON 库，支持 Unicode、引用计数、错误定位、JSON Patch。API 比 cJSON 更现代。' },
            { term: 'json-c', desc: '另一个 JSON 库，面向对象风格（json_object），支持引用计数。' },
            { term: 'libxml2', desc: 'XML 解析/生成/验证库，功能最全，支持 DOM/SAX/XPath/XSLT/Schema。GNOME 项目出品。较重但功能全面。' },
            { term: 'expat', desc: '流式 XML 解析器（SAX 风格），轻量快速。不构建 DOM，回调式解析。适合大文件和嵌入式。' },
            { term: 'libconfig', desc: '结构化配置文件解析库，类似 JSON 但更简洁。支持层级、数组、类型。配置文件比 XML/JSON 更易读。' },
            { term: 'inih', desc: '极简 INI 配置文件解析器，单文件，头文件-only。适合简单配置。' }
          ]},
          { t: 'h2', x: '压缩 / 加密 / 安全' },
          { t: 'defs', x: [
            { term: 'zlib', desc: '最经典的压缩库，deflate/gzip 格式。deflateInit/deflate/deflateEnd、inflateInit/inflate/inflateEnd。几乎所有软件都依赖它。PNG、gzip、zip 格式基础。' },
            { term: 'libzip', desc: 'ZIP 归档操作库，基于 zlib。zip_open/zip_add/zip_fopen。支持创建、修改、提取 ZIP 文件。' },
            { term: 'lz4', desc: '极速压缩库，压缩速度 500MB/s+，解压速度 2000MB/s+。适合需要实时压缩的场景（数据库、日志、网络传输）。' },
            { term: 'zstd', desc: 'Facebook 出品的现代压缩算法，压缩比接近 gzip 但速度快 5 倍，支持多线程、字典压缩。正在成为新标配。' },
            { term: 'OpenSSL', desc: '最流行的 TLS/SSL 库，提供加密算法（AES、RSA、ECC、SHA）、证书管理、SSL/TLS 协议。几乎所有 HTTPS 客户端/服务器使用。' },
            { term: 'libsodium', desc: '现代加密库，API 简洁安全，默认参数就是最佳实践。crypto_secretbox（对称加密）、crypto_sign（签名）、crypto_pwhash（密码哈希）。比 OpenSSL 易用。' },
            { term: 'mbed TLS', desc: '轻量 TLS 库，适合嵌入式设备。代码可读、模块化、可裁剪。ARM mbed 生态使用。' }
          ]},
          { t: 'h2', x: 'GUI / 图形 / 游戏' },
          { t: 'defs', x: [
            { term: 'GTK', desc: 'GNOME 桌面环境的 GUI 工具包，跨平台（Linux/Windows/macOS）。C 语言编写，面向对象风格（GObject）。GIMP、GNOME 使用。GTK4 是最新版本。' },
            { term: 'ncurses', desc: '终端 UI 库，创建基于文本的用户界面（TUI）。initscr/printw/getch/refresh。vim、htop、nano 等终端程序使用。' },
            { term: 'SDL', desc: '跨平台多媒体库，提供窗口、输入、音频、2D 渲染。游戏开发基础库。Valve 维护，Steam 平台使用。SDL3 是最新版本。' },
            { term: 'Raylib', desc: '极简游戏编程库，API 友好，无依赖，适合教学和原型。InitWindow/BeginDrawing/DrawText/CloseWindow。' },
            { term: 'cairo', desc: '2D 矢量图形库，支持多种后端（X11、Win32、PDF、SVG、PNG）。抗锯齿、渐变、变换。GTK、Firefox 使用。' },
            { term: 'OpenGL / GLFW', desc: 'OpenGL 是 3D 图形 API 标准，GLFW 是跨平台窗口/输入库（配合 OpenGL 使用）。游戏和图形编程基础。' }
          ]},
          { t: 'h2', x: '测试 / 日志 / 数学' },
          { t: 'defs', x: [
            { term: 'Unity', desc: '极简单元测试框架，单文件，TEST_ASSERT_EQUAL/TEST_ASSERT_TRUE。适合嵌入式和 C 项目。ThrowTheSwitch 出品（还有 CMock 自动生成 Mock）。' },
            { term: 'CMocka', desc: '另一个单元测试框架，支持 Mock、夹具、参数化测试。Apache 协议。' },
            { term: 'Check', desc: 'C 单元测试框架，支持夹具、参数化测试、测试报告输出。' },
            { term: 'Criterion', desc: '现代 C 测试框架，支持参数化测试、理论、信号处理、并行执行。API 简洁。' },
            { term: 'zlog', desc: '高性能 C 日志库，支持多线程、异步写入、日志轮转、配置文件。比 printf 调试专业。' },
            { term: 'log.c', desc: '极简日志库，单文件，支持颜色、级别、文件输出。适合小型项目。' },
            { term: 'GSL', desc: 'GNU 科学计算库，提供矩阵、向量、数值积分、微分方程、统计、随机数。C 语言的 NumPy/SciPy。' },
            { term: 'FFTW', desc: '最快的离散傅里叶变换库，自动优化算法选择。信号处理、图像处理、物理模拟必备。' }
          ]},
          { t: 'h2', x: '并发与并行' },
          { t: 'defs', x: [
            { term: 'pthread', desc: 'POSIX 线程库，Linux/Unix 默认。pthread_create/pthread_join/pthread_mutex_init/pthread_cond_init。C 语言并发编程基础。' },
            { term: 'OpenMP', desc: '编译器指令级并行，#pragma omp parallel for。适合循环并行化，无需手动管理线程。GCC/Clang 支持。' },
            { term: 'libuv', desc: '跨平台异步 I/O 库，事件循环、线程池、异步文件/网络。Node.js 底层。高性能并发服务。' },
            { term: 'libdispatch', desc: 'Apple 出品的 GCD（Grand Central Dispatch），队列式并发。macOS/iOS 原生，Linux 有移植版（libdispatch）。' },
            { term: 'TBB', desc: 'Intel Threading Building Blocks，C++ 模板库但有 C 接口。任务并行、并行算法、并发容器。' }
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            '通用工具：GLib（全面）、klib/uthash（轻量头文件）、SDS（动态字符串）',
            '网络：libcurl（HTTP 客户端）、libuv（异步 I/O）、libevent/libev（事件驱动）、mongoose（嵌入式 Web 服务器）',
            '数据库：SQLite（嵌入式关系型）、libpq（PostgreSQL）、hiredis（Redis）、LMDB（高性能键值）',
            '解析：cJSON（极简 JSON）、libxml2（XML 全功能）、expat（流式 XML）、libconfig（配置文件）',
            '压缩加密：zlib（经典压缩）、zstd/lz4（现代极速压缩）、OpenSSL（TLS/加密）、libsodium（现代加密）',
            'GUI图形：GTK（桌面 GUI）、ncurses（终端 UI）、SDL/Raylib（游戏）、cairo（2D 矢量）',
            '测试日志：Unity（极简测试）、CMocka（带 Mock）、zlog（高性能日志）、GSL（科学计算）、FFTW（傅里叶变换）',
            '并发：pthread（POSIX 线程）、OpenMP（指令级并行）、libuv（异步 I/O）'
          ]}
        ]
      },

      /* ==================================================== 14 综合实战 */
      {
        id: 'projects',
        title: '综合实战',
        sub: '把前面所学串起来：迷你计算器与结构体通讯录',
        blocks: [
          { t: 'h2', x: '实战一：命令行风格计算器' },
          { t: 'p', x: '把「运算符」章的知识组织成一个 `calc` 函数，用 `switch` 分发四种运算。真实计算器要从输入读表达式，这里为可编译演示，直接给定操作数与运算符，展示「函数 + 控制流 + 格式化输出」的组合。' },

          { t: 'code', lang: 'c', title: '计算器', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'double calc(double a, double b, char op) {',
              '    if (op == \'+\') return a + b;',
              '    if (op == \'-\') return a - b;',
              '    if (op == \'*\') return a * b;',
              '    if (op == \'/\') return a / b;',
              '    return 0;',
              '}',
              '',
              'int main(void) {',
              '    printf("10 + 5 = %.2f\\n", calc(10, 5, \'+\'));',
              '    printf("10 - 5 = %.2f\\n", calc(10, 5, \'-\'));',
              '    printf("10 * 5 = %.2f\\n", calc(10, 5, \'*\'));',
              '    printf("10 / 5 = %.2f\\n", calc(10, 5, \'/\'));',
              '    return 0;',
              '}'
            ],
            expect: '10 + 5 = 15.00\n10 - 5 = 5.00\n10 * 5 = 50.00\n10 / 5 = 2.00' },

          { t: 'h2', x: '实战二：结构体通讯录' },
          { t: 'p', x: '把「结构体 + 数组 + 字符串」组合起来：用 `Contact` 结构体描述一条记录，用定长数组存多条，用一个打印函数（接收数组与长度）统一展示。这就是「面向对象」章思路的小成品。' },

          { t: 'code', lang: 'c', title: '通讯录', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'typedef struct {',
              '    int id;',
              '    char name[32];',
              '    char phone[16];',
              '} Contact;',
              '',
              'void print_book(const Contact *book, int n) {',
              '    printf("通讯录（共 %d 条）:\\n", n);',
              '    for (int i = 0; i < n; i++) {',
              '        printf("#%d %s %s\\n", book[i].id, book[i].name, book[i].phone);',
              '    }',
              '}',
              '',
              'int main(void) {',
              '    Contact book[3] = {',
              '        {1, "Alice", "138001"},',
              '        {2, "Bob",   "138002"},',
              '        {3, "Carol", "138003"}',
              '    };',
              '    print_book(book, 3);',
              '    return 0;',
              '}'
            ],
            expect: '通讯录（共 3 条）:\n#1 Alice 138001\n#2 Bob 138002\n#3 Carol 138003' },

          { t: 'h2', x: '还可以怎么扩展' },
          { t: 'ul', x: [
            '**增删查改**：用 `add_contact` / `find_by_name` 函数封装逻辑，引入返回码表示成功与否。',
            '**动态容量**：当数组满时，用 `realloc` 扩一倍——进入「指针 + 动态内存」的进阶领域。',
            '**持久化**：把通讯录 `fprintf` 写进文件，下次 `fscanf` 读回。',
            '**更安全字符串**：用 `snprintf` 限制姓名长度，杜绝缓冲区溢出。'
          ]},

          { t: 'note', k: 'tip', title: '小项目也要分文件',
            x: '随着代码变多，把 `Contact` 相关放进 `contact.h` / `contact.c`，`main.c` 只负责流程。用 Makefile 管理编译。这个「分接口/实现」的习惯，正是函数章讲的头文件思想。' },

          { t: 'h2', x: '实战三：用指针统计元音（综合运用）' },
          { t: 'p', x: '一个把「字符串 + 指针遍历 + 计数」串起来的小练习：统计一句英文里的元音字母个数。' },

          { t: 'code', lang: 'c', title: '元音计数', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int count_vowels(const char *s) {',
              '    int n = 0;',
              '    for (; *s != \'\\0\'; s++) {',
              '        char c = *s;',
              '        if (c == \'a\' || c == \'e\' || c == \'i\' ||',
              '            c == \'o\' || c == \'u\') {',
              '            n++;',
              '        }',
              '    }',
              '    return n;',
              '}',
              '',
              'int main(void) {',
              '    printf("vowels = %d\\n", count_vowels("hello world"));',
              '    return 0;',
              '}'
            ],
            expect: 'vowels = 3' },

          { t: 'p', x: '`for (; *s != \'\\0\'; s++)` 是 C 字符串遍历的经典写法：指针走到 `\\0` 结束。把这段读懂，字符串与指针就真正过关了。' },

          { t: 'kp', x: [
            '计算器 = 函数 + switch 分发 + 格式化输出',
            '通讯录 = struct 数组 + 接收指针的打印函数',
            '字符串遍历经典写法：for (; *s != \'\\0\'; s++)',
            '小项目也要分 .h/.c，用头文件思想管理接口',
            '想动态扩容就上 realloc，进入动态内存进阶',
            '扩展方向：增删查改、文件持久化、snprintf 防溢出'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个函数找数组中的最大值', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int max_of(int a[], int n) {',
              '    int m = a[0];',
              '    for (int i = 1; i < n; i++) {',
              '        if (a[i] > m) m = a[i];',
              '    }',
              '    return m;',
              '}',
              '',
              'int main(void) {',
              '    int nums[5] = {3, 7, 2, 9, 4};',
              '    printf("最大值 = %d\\n", max_of(nums, 5));',
              '    return 0;',
              '}'
            ],
            expect: '最大值 = 9',
            hint: '先假设第一个最大，然后逐个比较',
            ans: '初始 m=3，依次比较后 m 更新为 7、9，最终输出 9。这是「遍历找最值」的经典模板，把函数和数组遍历结合起来了。' },
          { t: 'think', q: '如果要让通讯录能无限增加联系人，需要用什么技术？',
            ans: '当前用定长数组（比如 contacts[100]），满了就加不进去。应该用 malloc/realloc 动态分配内存：先申请一块，满了就 realloc 扩一倍。这就从「静态数组」进入了「动态内存管理」，是 C 进阶的必修课。' },
          { t: 'think', q: '通讯录项目中，为什么查找联系人时要用 strcmp 而不是 == 比较姓名字符串？',
            ans: '因为 C 的字符串是 char 数组，数组名在比较时退化为指针。`==` 比较的是两个指针的地址是否相同，而不是字符串内容。两个内容完全相同的字符串可能存在不同的内存地址，用 == 比较会得到 false。必须用 strcmp 逐字符比较，返回 0 才表示内容相同。这是 C 字符串操作的核心规则。' }
        ]
      },

      /* ==================================================== 14 速查总结 */
      {
        id: 'cheatsheet',
        title: '速查总结',
        sub: '一张表查语法、转换说明符与高频坑',
        blocks: [
          { t: 'h2', x: '最小程序骨架' },
          { t: 'code', lang: 'c', title: '万能模板', run: true,
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    printf("Hi\\n");',
              '    return 0;',
              '}'
            ],
            expect: 'Hi' },

          { t: 'h2', x: 'printf 转换说明符' },
          { t: 'table',
            head: ['说明符', '含义', '示例值'],
            rows: [
              ['`%d`', '十进制 int', '`42`'],
              ['`%u`', '无符号 int', '`42`'],
              ['`%ld`', 'long int', '`42`'],
              ['`%lld`', 'long long int', '`42`'],
              ['`%f`', 'double（默认 6 位）', '`3.140000`'],
              ['`%.2f`', 'double 保留 2 位', '`3.14`'],
              ['`%c`', '单个字符', '`A`'],
              ['`%s`', '字符串', '`hi`'],
              ['`%p`', '指针地址', '`0x...`'],
              ['`%%`', '输出一个百分号', '`%`']
            ]},

          { t: 'note', k: 'warn', title: 'size_t / uint64_t 怎么打',
            x: '`sizeof` 返回 `size_t`，用 `%zu`；打印 `uint64_t` 严谨用 `inttypes.h` 的 `PRIu64`（通常是 `%llu` 的别名）。乱用 `%d` 会警告甚至输出错误。' },

          { t: 'h2', x: '常用头文件' },
          { t: 'table',
            head: ['头文件', '提供'],
            rows: [
              ['`<stdio.h>`', 'printf / scanf / fopen 等输入输出'],
              ['`<stdlib.h>`', 'malloc / free / exit / atoi'],
              ['`<string.h>`', 'strlen / strcpy / strcmp / strcat'],
              ['`<math.h>`', 'sqrt / sin / pow（链接加 -lm）'],
              ['`<stdint.h>`', 'int32_t / uint64_t 固定宽度类型'],
              ['`<assert.h>`', 'assert 断言'],
              ['`<errno.h>`', 'errno 错误号'],
              ['`<limits.h>`', 'INT_MAX / CHAR_BIT 等极限值']
            ]},

          { t: 'h2', x: '高频易错点' },
          { t: 'defs', x: [
            { term: '整数除法截断', desc: '`17 / 5` 得 `3`。要小数需浮点操作数或 `(double)a / b`。' },
            { term: '== 比字符串', desc: '字符串是 `char*`，`==` 比的是地址。必须用 `strcmp`，返回 0 才相等。' },
            { term: '数组越界不报错', desc: '访问 `a[10]` 不抛异常，读到非法内存，后果不可预测。' },
            { term: '忘写 break', desc: 'switch 的 case 默认穿透，漏 break 会执行下一个分支。' },
            { term: '指针未初始化', desc: '野指针解引用会崩溃；声明即初始化或置 NULL。' },
            { term: '有符号溢出', desc: '是未定义行为；用 unsigned 做计数/位运算更安全。' },
            { term: '忽略 malloc 返回值', desc: '可能返回 NULL（内存不足），必须判空再使用。' },
            { term: '缓冲区溢出', desc: 'strcpy/strcat 不检查长度；用 snprintf / strncpy 并限长。' }
          ]},

          { t: 'h2', x: '运算符速记（部分优先级，从高到低）' },
          { t: 'ul', x: [
            '`()` `[]` `->` `.` —— 最高，先算',
            '`!` `~` `++` `--` `*`(解引用) `&`(取址) `sizeof` —— 单目',
            '`*` `/` `%` —— 高于 `+` `-`',
            '`<<` `>>` —— 移位',
            '`<` `<=` `>` `>=` —— 比较',
            '`==` `!=` —— 相等',
            '`&` `^` `|` —— 位与/异或/或',
            '`&&` —— 高于 `||`',
            '`?:` —— 三元（很低）',
            '`=` `+=` ... —— 赋值（最低）'
          ]},

          { t: 'note', k: 'tip', title: '拿不准就加括号',
            x: '优先级记不全没关系，表达式该加括号就加。编译器不在乎你多写几对括号，人读起来却清楚十倍，也杜绝了「自以为优先级对」的隐蔽 bug。' },

          { t: 'h2', x: '学习路线建议' },
          { t: 'ol', x: [
            '吃透变量、类型、控制流——本章前六章是地基',
            '死磕指针与数组的关系——这是 C 的分水岭，过不了这关就不算会 C',
            '理解 struct + 函数指针如何模拟对象与回调',
            '掌握错误处理的三种手段，写「不崩溃」的代码',
            '用动态内存（malloc/realloc/free）自己造容器，理解内存生命周期',
            '读一遍优秀 C 项目源码（如 tinycc、lua、redis 部分），看高手怎么组织'
          ]},

          { t: 'kp', x: [
            '万能骨架：#include <stdio.h> + int main(void){...;return 0;}',
            '占位符与类型必须匹配：%d %u %f %c %s %zu %p',
            '字符串用 strcmp 比、用 strlen 量长度，别用 ==',
            '数组越界、忘 break、野指针、缓冲区溢出是四大高频坑',
            '指针与数组的关系 = C 的分水岭，必须吃透',
            '现代项目用 C11 + -Wall -Wextra，优先 stdint.h 与 _Static_assert'
          ]},

          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用学过的知识打印两个数的和以及一个字符的 ASCII', lang: 'c',
            code: [
              '#include <stdio.h>',
              '',
              'int main(void) {',
              '    printf("%d + %d = %d\\n", 3, 4, 3 + 4);',
              '    printf("字符 %c 的 ASCII 是 %d\\n", \'Z\', \'Z\');',
              '    return 0;',
              '}'
            ],
            expect: '3 + 4 = 7\n字符 Z 的 ASCII 是 90',
            hint: 'printf 多参数格式串和实参要一一对应',
            ans: '3+4=7，Z 的 ASCII 是 90。这道题综合了 printf 格式串、字符字面量、整数运算，是速查章的迷你自测。' },
          { t: 'think', q: 'C 语言最容易踩的三个坑是什么？',
            ans: '① 数组越界不报错，读到非法内存；② switch 忘写 break 导致穿透；③ 字符串用 == 比较而不是 strcmp。这三个是新手最高频的 bug 来源，写代码时务必自查。' },
          { t: 'think', q: 'printf 的 %zu 是用来打印什么类型的？为什么不能用 %d 代替？',
            ans: '%zu 用来打印 `size_t` 类型——这是 sizeof 和 strlen 的返回值类型，是无符号整数，在 64 位系统上是 8 字节。用 %d 打印会有两个问题：一是 %d 期望有符号 int（4 字节），类型不匹配导致未定义行为；二是如果值超过 int 范围（比如很大的内存大小），会溢出显示错误。size_t 就该用 %zu，这是 C99 标准规定的正确做法。' }
        ]
      }

    ]
  });

})(window);
