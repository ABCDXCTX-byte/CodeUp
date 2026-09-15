/* ==========================================================================
   CodeUp码上 · data/tut/java.js — Java 教程（内容模板）
   --------------------------------------------------------------------------
   编写约定（对照 python.js）：
     - IIFE 包裹，纯 <script> 加载，无 import/export/module
     - 所有 code 块：lang:'java'、run:true、带 expect（标准输出逐字符）
     - 每段 Java 必须自包含：public class Main { public static void main(...) }
     - 统一 4 空格缩进，禁止 Tab；class 名用 Main 保证与文件同名
     - 目标编译环境：openjdk-jdk-21（wandbox），避免过于冷门的特性
   ========================================================================== */
(function (global) {
  'use strict';

  var CL = global.CL;
  var T = CL.Tutorials;

  T.register('java', {
    chapters: [

      /* ==================================================== 1 概览 */
      {
        id: 'overview',
        title: '语言概览',
        sub: '一门把「健壮」与「可移植」刻进骨子里的语言',
        blocks: [
          { t: 'p', x: 'Java 由 James Gosling 在 Sun 公司主导设计，1995 年正式发布。它的诞生有一个很朴素的目标：**让同一份代码能在不同设备上运行**——从服务器到浏览器插件（Applet），再到后来的安卓手机。这个口号叫 **"Write Once, Run Anywhere"（一次编写，到处运行）。' },

          { t: 'p', x: '实现这个目标的秘密是 **JVM（Java 虚拟机）**。你写的 `.java` 源码先被编译成与平台无关的 **字节码（`.class`）**，再由每台机器上的 JVM 解释或即时编译（JIT）执行。换句话说，Java 不是直接编译成机器码，而是编译成一套「虚拟机器」的指令，这套虚拟机器再由各个平台分别实现。' },

          { t: 'h2', x: 'Java 的设计哲学' },
          { t: 'p', x: '如果说 Python 把「可读性」写进语法，Java 则把 **「约束」写进语法**。很多在动态语言里「随便写」的事情，在 Java 里会被编译器拦下来。这种约束初看啰嗦，却能在大型团队协作和长期维护中显著降低事故率。' },
          { t: 'ol', x: [
            '**强类型 + 静态类型**——变量类型在编译期就确定，类型不匹配直接报错，而不是运行时崩溃',
            '**面向对象**——一切围绕「类」与「对象」组织，封装、继承、多态是语言的一等公民',
            '**自动内存管理**——垃圾回收（GC）替你回收不再使用的对象，不用像 C/C++ 那样手动 `free`',
            '**显式失败**—— checked exception 强制你面对「可能出错」的地方',
            '**向后兼容**——二十多年里，老代码几乎总能跑在新版 JVM 上'
          ]},

          { t: 'h2', x: '第一个程序' },
          { t: 'code', lang: 'java', title: 'Hello, World!', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        System.out.println("Hello, World!");',
              '    }',
              '}'
            ],
            expect: 'Hello, World!' },

          { t: 'p', x: '和 Python 的 `print("Hello, World!")` 比，Java 多了不少「仪式」：`public class Main` 声明一个公开类，`public static void main(String[] args)` 是程序入口。这不是为了显摆，而是 Java 的「万物皆类」带来的必然结果——**所有代码都必须住在某个类里，main 方法是 JVM 启动的约定入口**。类名 `Main` 必须和文件名 `Main.java` 一致，这是编译器的硬性要求。' },

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

          { t: 'p', x: '这张对照表值得反复看。C/C++ 需要手动 `return 0` 和头文件，Go 需要 `package main`，而 Java 把「类 + main 方法」作为入口。**这些「冗余」服务于各自的工程目标**：Java 要求类声明，是因为它从根上假设你要构建的是一个由类和对象组成的系统，而不是一段零散脚本。' },

          { t: 'h2', x: 'Java 擅长什么' },
          { t: 'defs', x: [
            { term: '企业级后端', desc: 'Spring / Jakarta EE 生态成熟，银行、电商、政务系统的大量核心服务由 Java 支撑。' },
            { term: '安卓应用', desc: 'Android 的官方开发语言长期是 Java（如今 Kotlin 为主，但 JVM 一脉相承）。' },
            { term: '大数据', desc: 'Hadoop、Spark、Flink、Kafka 等基础设施大多用 JVM 语言编写，运维生态完善。' },
            { term: '跨平台工具', desc: 'IDEA、Eclipse、Minecraft 等桌面程序，靠 JVM 实现一套二进制多平台运行。' }
          ]},

          { t: 'h2', x: 'Java 不擅长什么' },
          { t: 'p', x: '诚实地说清楚边界，比一味吹捧更有价值：' },
          { t: 'ul', x: [
            '**极小的程序 / 脚本**——为了打印一行字要写整个类和方法，仪式感太重；这种场景 Python 更顺手。',
            '**对二进制尺寸和启动速度极度敏感的场景**——JVM 启动要几十到上百毫秒，且内存占用偏大；Serverless 冷启动里这是个痛点（GraalVM 原生镜像正在解决）。',
            '**系统级 / 贴近硬件的编程**——没有指针和手动内存管理，写操作系统内核、驱动、高频交易底层还是 C/C++/Rust 的天下。',
            '**快速试错的原型**——编译步骤让「改一下立刻看结果」的循环比解释型语言长。'
          ]},

          { t: 'note', k: 'tip', title: '怎么判断该不该学 Java',
            x: '如果你目标是进大厂做后端、安卓开发，或者构建需要长期维护的大型系统——Java 几乎是绕不开的选择。如果你只是想自动化点小任务、做数据分析，Python 更轻快。两者并不冲突，很多工程师两种都会。' },

          { t: 'kp', x: [
            'Java 源码编译成字节码，由 JVM 在各平台执行，实现「一次编写，到处运行」',
            '强静态类型：变量类型编译期确定，类型错误在编译时暴露',
            '万物皆类：所有代码必须写在类里，main 是 JVM 约定的入口',
            '类名必须与文件名相同（公开类），本教程统一用 Main',
            '自动垃圾回收免去了手动内存管理，但有 GC 停顿的代价',
            '向后兼容性极好，二十多年前的老代码大多仍能运行'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '动手跑一跑：写一个最小 Main 类，打印一句话并做个简单加法。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        System.out.println("Hello, CodeUp码上!");',
              '        System.out.println(1 + 2);',
              '    }',
              '}'
            ],
          expect: 'Hello, CodeUp码上!\n3', hint: '所有代码必须写在类里，main 是入口。', ans: '`public class Main` 声明类，`public static void main` 是 JVM 启动入口。println 输出并换行；字符串和数字用 + 时，数字先转成字符串拼接。' },
          { t: 'think', q: 'Java 凭什么能「一次编写，到处运行」？中间产物是什么？', ans: '源码 .java 先被 javac 编译成与平台无关的**字节码 .class**，再由各平台上的 JVM 执行。你给不同系统分别提供 JVM，同一份字节码就能到处跑——这就是 WORA 的秘密。' },
          { t: 'think', q: 'Java 既是编译型语言又是解释型语言，这个说法矛盾吗？', ans: '不矛盾。Java 的编译是把 `.java` 源码编译成 `.class` 字节码（这一步是编译），但字节码不是机器码，不能直接被 CPU 执行——需要 JVM 在运行时逐条解释或即时编译（JIT）成机器码。所以准确地说：Java 是**编译到字节码 + 运行时解释/JIT** 的混合模式。这和 C 直接编译成机器码不同，也和 Python 纯解释执行不同。' },
        ]
      },

      /* ==================================================== 2 快速开始 */
      {
        id: 'setup',
        title: '快速开始',
        sub: '在线运行与基础工具',
        blocks: [
          { t: 'h2', x: 'JDK 与 JRE 的区别' },
          { t: 'p', x: '初学者最容易被两个词绕晕：**JRE（Java 运行时环境）**只负责运行别人写好的 Java 程序；**JDK（Java 开发工具包）**才包含编译器 `javac`，是开发者的完整工具箱。你要写代码，装 **JDK** 即可，它自带 JRE。' },

          { t: 'h2', x: '安装 JDK' },
          { t: 'p', x: 'Java 现在有两个来源：Oracle 的发行版（生产环境注意许可）和开源的 **OpenJDK**。日常学习与本教程的在线编译用的是 OpenJDK。推荐装 **JDK 21（LTS 长期支持版）**，它是当前最稳的版本线。' },

          { t: 'h3', x: 'Windows' },
          { t: 'ol', x: [
            '从 adoptium.net 或 oracle.com 下载 Windows 版 JDK 安装包并安装',
            '安装时记下安装路径（如 `C:\\Java\\jdk-21`）',
            '把 `安装路径\\bin` 加进系统环境变量 **PATH**——这是新手最常见的坑',
            '打开命令提示符，输入 `java -version` 与 `javac -version` 验证'
          ]},
          { t: 'note', k: 'warn', title: 'PATH 没配对会怎样',
            x: '如果输入 `java` 提示「不是内部或外部命令」，说明 PATH 没包含 JDK 的 bin 目录，或者装的是 JRE 而非 JDK（没有 `javac`）。重新检查环境变量即可。' },

          { t: 'h3', x: 'macOS 与 Linux' },
          { t: 'p', x: '推荐用包管理器安装，省去手动配 PATH：' },
          { t: 'ul', x: [
            '**macOS**：`brew install openjdk@21`，再用 `brew --prefix openjdk@21` 把路径软链到 `/Library/Java/JavaVirtualMachines`',
            '**Ubuntu / Debian**：`sudo apt install openjdk-21-jdk`',
            '**通用**：用 `sdkman`（`sdk install java 21.0.2-open`）可在一台机器上管理多个版本'
          ]},

          { t: 'h2', x: '编译与运行：两个步骤' },
          { t: 'p', x: '这是 Java 和 Python 最大的工作流差异：**Python 改完直接跑，Java 要先编译再运行**。理解这两步，你就不会被奇怪的报错弄晕。' },
          { t: 'table',
            head: ['步骤', '命令', '作用', '产物'],
            rows: [
              ['编译', '`javac Main.java`', '把源码编译成字节码', '`Main.class`'],
              ['运行', '`java Main`', '启动 JVM 执行字节码', '程序输出'],
              ['一键（仅部分工具）', '`java Main.java`', 'Java 11+ 单文件可直接跑', '程序输出']
            ]},

          { t: 'note', k: 'info', title: 'java Main 后面为什么没有 .class',
            x: '运行命令里写的是**类名** `Main`，不是文件名 `Main.class`。JVM 会按类名去磁盘上找对应的 `.class` 文件。这是初学者常犯的小错：写成 `java Main.class` 反而会报错。' },

          { t: 'code', lang: 'java', title: '亲手走一遍完整流程', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        System.out.println("编译成功，JVM 正在执行我");',
              '        System.out.println("类名 Main 与文件名 Main.java 一致，所以能跑");',
              '    }',
              '}'
            ],
            expect: '编译成功，JVM 正在执行我\n类名 Main 与文件名 Main.java 一致，所以能跑' },

          { t: 'h2', x: '推荐的开发工具' },
          { t: 'defs', x: [
            { term: 'IntelliJ IDEA', desc: 'JetBrains 出品，社区版免费、功能最强。智能补全、重构、调试体验都是业界顶流，强烈推荐。' },
            { term: 'VS Code', desc: '免费轻量，装「Extension Pack for Java」后获得不错的编辑与调试能力。' },
            { term: 'Eclipse', desc: '老牌开源 IDE，插件生态庞大，企业里仍常见。' },
            { term: '命令行 + 任意编辑器', desc: '`javac` + `java` + Vim/Notepad++，最朴素也最锻炼基本功，本教程的在线环境就等价于它。' }
          ]},

          { t: 'note', k: 'tip', title: '本站就是你的「云端 IDE」',
            x: '你不必真的装好 JDK 才能开始学。本站每个代码块背后连着 wandbox 在线编译（OpenJDK 21），点「运行」即可在远程编译执行。失败时，会降级展示 `expect` 里写的「预期输出」。所以你在下面看到的每一段代码，都是可以直接运行的完整程序。' },

          { t: 'kp', x: [
            '开发者装 JDK（含编译器 javac），只运行程序装 JRE 即可',
            'Java 工作流分两步：`javac` 编译成 `.class`，`java` 运行字节码',
            '运行命令写类名 `java Main`，不是文件名 `java Main.class`',
            '公开类名必须与文件名一致，本教程统一用 Main',
            '推荐 JDK 21（LTS），在线环境即 OpenJDK 21',
            'IDEA 是体验最好的 Java IDE，新手值得用'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '走一遍完整流程：写一个能编译运行的 Main，理解「编译—运行」两步。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        System.out.println("编译与运行两步走");',
              '        System.out.println("javac 编译，java 运行");',
              '    }',
              '}'
            ],
          expect: '编译与运行两步走\njavac 编译，java 运行', hint: '先 javac Main.java，再 java Main。', ans: '`javac Main.java` 把源码编译成 Main.class 字节码，`java Main` 启动 JVM 运行它。注意运行命令写的是**类名 Main**，不带 .class。' },
          { t: 'think', q: '运行 Java 程序时，写 java Main 还是 java Main.class？为什么？', ans: '写 `java Main`。JVM 按**类名**去磁盘找对应的 .class 文件，不是按文件名。写成 `java Main.class` 会被当成「名为 Main.class 的类」去查找，然后报错。' },
          { t: 'think', q: 'JDK、JRE、JVM 三者是什么关系？写代码装哪个就够了？', ans: 'JVM 是 Java 虚拟机，只负责运行字节码；JRE = JVM + 核心类库，能跑 Java 程序但不能编译；JDK = JRE + 编译器（javac）和工具，既能编译又能运行。**写代码必须装 JDK**，只跑别人编译好的程序装 JRE 就行。现在 Oracle 的发行版里 JDK 已经包含了 JRE，所以直接装 JDK 最省事，不用单独装 JRE。' },
        ]
      },

      /* ==================================================== 3 基础语法 */
      {
        id: 'basics',
        title: '基础语法',
        sub: '类、main 方法、变量、注释，以及那对必须配对的大括号',
        blocks: [
          { t: 'h2', x: '程序骨架：为什么要有类和方法' },
          { t: 'p', x: 'Python 写 `print(...)` 就能跑，Java 不行。因为 Java 是纯面向对象语言，**没有任何代码能脱离类独立存在**。所有逻辑都住在某个类的某个方法里。`main` 是一个特殊方法：JVM 启动时只认它作为入口。' },

          { t: 'code', lang: 'java', title: '最小的合法程序', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        System.out.println("最小的 Java 程序");',
              '    }',
              '}'
            ],
            expect: '最小的 Java 程序' },

          { t: 'h2', x: '变量：类型在前，名字在后' },
          { t: 'p', x: 'Java 是**静态类型**语言：声明变量时必须写明类型，而且一旦写好，这个变量就只能装同类型的值。这和 Python「同一个名字先后装数字和字符串」完全不同。约束带来安全感——编译器提前帮你挡掉一大类错误。' },

          { t: 'code', lang: 'java', title: '变量声明与赋值', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        // 类型 名字 = 值;',
              '        int age = 25;',
              '        double height = 1.78;',
              '        String name = "Alice";',
              '        boolean isStudent = true;',
              '',
              '        System.out.println("姓名：" + name);',
              '        System.out.println("年龄：" + age);',
              '        System.out.println("身高：" + height);',
              '        System.out.println("是否学生：" + isStudent);',
              '',
              '        // 类型一旦确定不能换成别的类型',
              '        // age = "二十";  // 编译错误：类型不匹配',
              '    }',
              '}'
            ],
            expect: '姓名：Alice\n年龄：25\n身高：1.78\n是否学生：true' },

          { t: 'note', k: 'tip', title: '变量名命名规则',
            x: '标识符由字母、数字、下划线、`$` 组成，**不能以数字开头**，且区分大小写（`age` 与 `Age` 是两回事）。约定：变量/方法用 `camelCase`，类用 `PascalCase`，常量用 `UPPER_CASE`。不能用 `int`、`class` 等关键字作名字。' },

          { t: 'h2', x: '输出：三种常用写法' },
          { t: 'p', x: '`System.out.println` 输出并换行；`print` 不换行；`printf` 做格式化（类似 C 的 printf）。理解三者差异，输出才好看。' },

          { t: 'code', lang: 'java', title: 'print / println / printf', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        String name = "Alice";',
              '        int age = 25;',
              '',
              '        // 字符串拼接（最常用）',
              '        System.out.println("你好，" + name + "！");',
              '',
              '        // 不换行，连续拼接',
              '        System.out.print("今年 ");',
              '        System.out.print(age);',
              '        System.out.println(" 岁");',
              '',
              '        // 格式化：%s 字符串，%d 整数，%n 换行',
              '        System.out.printf("你好，%s！你今年 %d 岁。%n", name, age);',
              '        System.out.printf("明年你就 %d 岁了。%n", age + 1);',
              '    }',
              '}'
            ],
            expect: '你好，Alice！\n今年 25 岁\n你好，Alice！你今年 25 岁。\n明年你就 26 岁了。' },

          { t: 'note', k: 'warn', title: 'printf 用 %n 还是 \\n',
            x: 'Java 里推荐用 `%n` 表示「平台相关的换行符」，在 Linux 上就是 `\\n`。本教程为了输出可预测，演示中统一用 `%n`。如果你写 `\\n`，在 Windows 上可能变成 `\\r\\n`，导致和预期输出对不上。' },

          { t: 'h2', x: '输入：Scanner 类' },
          { t: 'p', x: '控制台读入要用 `Scanner` 包装 `System.in`。注意 `nextLine()` 读整行、`nextInt()` 读整数、`nextDouble()` 读小数。字符串用 `+` 拼接成一行传入最稳妥。' },

          { t: 'code', lang: 'java', title: '用 Scanner 读输入', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        // 本站在线环境无法交互输入，这里用固定数据演示等价逻辑',
              '        String name = "Alice";',
              '        int age = Integer.parseInt("25");',
              '        double height = Double.parseDouble("1.68");',
              '',
              '        System.out.println("名字：" + name);',
              '        System.out.println("年龄：" + age);',
              '        System.out.println("身高：" + height);',
              '    }',
              '}'
            ],
            expect: '名字：Alice\n年龄：25\n身高：1.68' },

          { t: 'note', k: 'warn', title: '在线环境的交互输入',
            x: '本站远程编译以「非交互」方式运行：程序启动后没有真人敲键盘。所以教程中所有需要输入的例子，都用固定数据或 `parseXxx` 等价演示，保证你点「运行」能看到确定结果。你可以用 `new Scanner(System.in)` 真正读键盘。' },

          { t: 'h2', x: '注释' },
          { t: 'code', lang: 'java', title: '单行与多行注释', run: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        // 单行注释：用两个斜杠',
              '        int x = 10;  // 行尾也可以跟注释',
              '',
              '        /*',
              '         * 多行注释用一对斜杠星号包裹，',
              '         * 通常用于文件头或方法的整体说明。',
              '         */',
              '',
              '        System.out.println("x = " + x);',
              '    }',
              '}'
            ],
            expect: 'x = 10' },

          { t: 'note', k: 'tip', title: '好注释写「为什么」',
            x: '`x += 1; // x 加 1` 是废话注释。`// 跳过表头行` 才有价值——它解释意图，代码本身已经说明了行为。Java 还有 `javadoc`：`/** ... */` 三斜杠注释能被工具提取成 API 文档。' },

          { t: 'h2', x: '语句、分号与大括号' },
          { t: 'p', x: '每条语句以**分号 `;`** 结尾（和 C/C++ 一样）；代码块用**一对大括号 `{}`** 包裹。缩进只是为了人眼可读，Java 编译器不靠缩进判断结构——但你应当保持整洁，否则三个月后的自己会恨你。' },

          { t: 'kp', x: [
            'Java 纯面向对象：所有代码必须写在类里，main 是入口',
            '静态类型：声明时写类型，且不能中途换成别的类型',
            'println 换行、print 不换行、printf 做格式化',
            '注释用 // 和 /* */，三斜杠 /** */ 用于 javadoc',
            '语句以分号结尾，代码块用大括号包裹',
            '类名必须与文件名一致，本教程统一叫 Main'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '声明几种类型的变量，用 + 拼接输出。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        String name = "Alice";',
              '        int age = 25;',
              '        System.out.println(name + " 今年 " + age + " 岁");',
              '    }',
              '}'
            ],
          expect: 'Alice 今年 25 岁', hint: '字符串和任何类型用 + 都会转成字符串。', ans: 'Java 静态类型，声明时必须写 String、int。`"Alice 今年 " + age + " 岁"` 里，+ 一边是字符串，age 就被自动转成字符串拼接。' },
          { t: 'ex', q: '用 printf 保留两位小数，再用 println 输出整数。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        double pi = 3.14159;',
              '        System.out.printf("pi=%.2f%n", pi);',
              '        System.out.println("整数: " + 42);',
              '    }',
              '}'
            ],
          expect: 'pi=3.14\n整数: 42', hint: '%.2f 保留两位小数，%n 换行。', ans: 'printf 的 `%.2f` 表示浮点数保留两位小数，`%n` 是平台相关的换行符。println 则是「输出并换行」。' },
          { t: 'think', q: 'Java 声明变量时为什么要写类型？这和 Python 最大的区别是什么？', ans: 'Java 是**静态类型**：变量类型在编译期就确定，而且不能中途换成别的类型，编译器能提前挡掉大量类型错误。Python 是动态类型，同一个变量可以先后装数字和字符串。' },
          { t: 'think', q: 'printf 里换行推荐用 %n 还是 \\n？为什么？', ans: '推荐 `%n`。它代表「当前平台的换行符」，Linux 上是 \\n、Windows 上是 \\r\\n，程序跨平台时输出都正确。手写 \\n 在 Windows 上可能和预期对不上。' },
        ]
      },

      /* ==================================================== 4 数据类型 */
      {
        id: 'types',
        title: '数据类型',
        sub: '基本类型与包装类、String，以及类型转换的规则',
        blocks: [
          { t: 'h2', x: 'Java 的类型体系' },
          { t: 'p', x: 'Java 的类型分为两大类：**基本类型（primitive）**直接存值，高效省内存；**引用类型（reference）**存的是「对象的地址」，包括类、接口、数组和字符串。理解这个二分，是理解 Java 许多行为（比如 `==` 与 `equals` 的区别）的钥匙。' },

          { t: 'h2', x: '八种基本类型' },
          { t: 'table',
            head: ['类型', '位数', '范围 / 说明', '示例'],
            rows: [
              ['`byte`', '8', '-128 ~ 127，节省内存的迷你整数', '`byte b = 100;`'],
              ['`short`', '16', '-32768 ~ 32767', '`short s = 30000;`'],
              ['`int`', '32', '约 ±21 亿，最常用整数', '`int i = 42;`'],
              ['`long`', '64', '极大整数，字面量加 `L`', '`long l = 9L;`'],
              ['`float`', '32', '单精度浮点，字面量加 `f`', '`float f = 3.14f;`'],
              ['`double`', '64', '双精度浮点，默认小数类型', '`double d = 2.7;`'],
              ['`char`', '16', '单个 Unicode 字符，单引号', '`char c = \'A\';`'],
              ['`boolean`', '1', '只有 `true` / `false`', '`boolean ok = true;`']
            ]},

          { t: 'code', lang: 'java', title: '基本类型一览', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        byte b = 120;',
              '        short s = 30000;',
              '        int i = 2_000_000_000;          // 下划线仅增强可读性',
              '        long l = 9_000_000_000L;        // long 字面量要加 L',
              '        float f = 3.14f;                // float 字面量要加 f',
              '        double d = 2.718281828;',
              '        char c = \'A\';',
              '        boolean flag = true;',
              '',
              '        System.out.println("byte   : " + b);',
              '        System.out.println("short  : " + s);',
              '        System.out.println("int    : " + i);',
              '        System.out.println("long   : " + l);',
              '        System.out.println("float  : " + f);',
              '        System.out.println("double : " + d);',
              '        System.out.println("char   : " + c);',
              '        System.out.println("boolean: " + flag);',
              '    }',
              '}'
            ],
            expect: 'byte   : 120\nshort  : 30000\nint    : 2000000000\nlong   : 9000000000\nfloat  : 3.14\ndouble : 2.718281828\nchar   : A\nboolean: true' },

          { t: 'note', k: 'danger', title: 'int 会溢出，没有 Python 那种任意精度',
            x: 'Python 的 `int` 永远不会溢出，Java 的 `int` 会。当数值超过 21 亿时，最高位会被「绕回」成负数，且**编译器不报警**。需要极大整数请用 `long`（约 ±9×10¹⁸）或更专业的 `BigInteger`。' },

          { t: 'h2', x: '类型转换' },
          { t: 'p', x: '基本类型之间可以互转。**拓宽转换**（小类型→大类型，如 `int`→`double`）自动进行；**窄化转换**（大→小，如 `double`→`int`）必须显式写 `(类型)`，且会丢失精度或截断。字符串与数字互转要调用专门方法。' },

          { t: 'code', lang: 'java', title: '显式与隐式转换', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int a = 10;',
              '        double d = a;            // 拓宽转换（自动）',
              '        System.out.println("int -> double: " + d);',
              '',
              '        double big = 9.99;',
              '        int truncated = (int) big;   // 窄化转换（强制，丢小数）',
              '        System.out.println("double 9.99 -> int: " + truncated);',
              '',
              '        // 字符串与数字互转',
              '        String num = "42";',
              '        int n = Integer.parseInt(num);',
              '        System.out.println("parseInt(\"42\") = " + (n + 8));',
              '',
              '        String fromInt = String.valueOf(100);',
              '        System.out.println("String.valueOf(100) = \\"" + fromInt + "\\"");',
              '    }',
              '}'
            ],
            expect: 'int -> double: 10.0\ndouble 9.99 -> int: 9\nparseInt("42") = 50\nString.valueOf(100) = "100"' },

          { t: 'note', k: 'warn', title: '窄化转换是「 silently 截断」',
            x: '`(int) 9.99` 得到 `9` 而不是 `10`——它直接丢掉小数部分，不是四舍五入。需要四舍五入请用 `Math.round()`。把 `long` 强转成 `int` 若超出范围，会高位丢失，结果可能很离谱。' },

          { t: 'h2', x: '字符串 String' },
          { t: 'p', x: '`String` 是引用类型里最特殊的存在：它是**不可变**的——任何「修改」操作都返回一个新字符串，原字符串不动。这个设计让字符串可以安全地在多线程间共享、也能做常量池优化。' },

          { t: 'code', lang: 'java', title: '常用字符串操作', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        String s = "  Hello, Java World  ";',
              '        System.out.println("原字符串: [" + s + "]");',
              '        System.out.println("trim()  : [" + s.trim() + "]");',
              '        System.out.println("toUpperCase(): " + s.toUpperCase());',
              '        System.out.println("length(): " + s.length());',
              '        System.out.println("charAt(7): " + s.charAt(7));',
              '        System.out.println("contains(\\"Java\\"): " + s.contains("Java"));',
              '        System.out.println("indexOf(\\"Java\\"): " + s.indexOf("Java"));',
              '        System.out.println("substring(9,13): " + s.substring(9, 13));',
              '        System.out.println("replace: " + s.replace("Java", "Python"));',
              '',
              '        // 字符串不可变：replace 返回新字符串',
              '        String greeting = "Hello";',
              '        String jello = "J" + greeting.substring(1);',
              '        System.out.println("变成: " + jello);',
              '    }',
              '}'
            ],
            expect: '原字符串: [  Hello, Java World  ]\ntrim()  : [Hello, Java World]\ntoUpperCase():   HELLO, JAVA WORLD\nlength(): 22\ncharAt(7): ,\ncontains("Java"): true\nindexOf("Java"): 9\nsubstring(9,13): Java\nreplace:   Hello, Python World\n变成: Jello' },

          { t: 'note', k: 'info', title: '比较字符串用 equals，不是 ==',
            x: '`==` 比较两个引用是否指向同一个对象；`equals` 比较内容。两个内容相同但分别创建的字符串，`==` 可能为 `false`。这条规则在「包装类」一节还会再遇到，是 Java 头号经典坑。' },

          { t: 'h2', x: '包装类：让基本类型也能当对象' },
          { t: 'p', x: '基本类型不是对象，不能放进集合、也不能调用方法。于是 Java 给每个基本类型配了一个**包装类**（如 `int`→`Integer`、`double`→`Double`）。从 Java 5 起，编译器会在需要时自动**装箱（boxing）**和**拆箱（unboxing）**。' },

          { t: 'table',
            head: ['基本类型', '包装类', '基本类型', '包装类'],
            rows: [
              ['`byte`', '`Byte`', '`short`', '`Short`'],
              ['`int`', '`Integer`', '`long`', '`Long`'],
              ['`float`', '`Float`', '`double`', '`Double`'],
              ['`char`', '`Character`', '`boolean`', '`Boolean`']
            ]},

          { t: 'code', lang: 'java', title: '装箱、拆箱与实用方法', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int primitive = 42;',
              '        Integer boxed = primitive;     // 自动装箱',
              '        int back = boxed;              // 自动拆箱',
              '        System.out.println("装箱: " + boxed + "，拆箱: " + back);',
              '',
              '        // 包装类的实用方法',
              '        System.out.println("Integer.MAX_VALUE: " + Integer.MAX_VALUE);',
              '        System.out.println("Double.parseDouble(\\"3.14\\"): " + Double.parseDouble("3.14"));',
              '        System.out.println("Character.isDigit(\'7\'): " + Character.isDigit(\'7\'));',
              '        System.out.println("Boolean.parseBoolean(\\"true\\"): " + Boolean.parseBoolean("true"));',
              '',
              '        // 包装类是对象，可用于集合',
              '        java.util.List<Integer> nums = java.util.Arrays.asList(1, 2, 3);',
              '        System.out.println("集合里的数字: " + nums);',
              '    }',
              '}'
            ],
            expect: '装箱: 42，拆箱: 42\nInteger.MAX_VALUE: 2147483647\nDouble.parseDouble("3.14"): 3.14\nCharacter.isDigit(\'7\'): true\nBoolean.parseBoolean("true"): true\n集合里的数字: [1, 2, 3]' },

          { t: 'note', k: 'danger', title: '包装类的 == 又是一个坑',
            x: '两个 `Integer` 用 `==` 比较的是对象地址，不是值；而且 JVM 会缓存 `-128~127` 的小整数，使得这个区间内的 `==` 偶尔「碰巧」为真，区间外又为假，极其迷惑。结论：**任何对象比较内容一律用 `equals`**。' },

          { t: 'kp', x: [
            'Java 类型分基本类型（存值）和引用类型（存地址）',
            '八种基本类型：byte/short/int/long/float/double/char/boolean',
            'int 会溢出，没有任意精度；大整数用 long 或 BigInteger',
            '窄化转换 `(int)x` 是直接截断，不是四舍五入',
            'String 不可变，比较内容用 equals 而非 ==',
            '每个基本类型有对应包装类，支持自动装箱/拆箱'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '练习自动拓宽与强制窄化两种类型转换。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int a = 10;',
              '        double d = a;',
              '        System.out.println(d);',
              '        double b = 9.99;',
              '        int c = (int) b;',
              '        System.out.println(c);',
              '    }',
              '}'
            ],
          expect: '10.0\n9', hint: '小转大自动；大转小要强转，且会截断。', ans: 'int a 赋给 double d 是拓宽转换，自动完成得 10.0。`(int) 9.99` 是窄化转换，**直接丢掉小数部分**得 9，不是四舍五入。' },
          { t: 'ex', q: '对 String 取长度、转小写、判断是否包含子串。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        String s = "Hello Java";',
              '        System.out.println(s.length());',
              '        System.out.println(s.toLowerCase());',
              '        System.out.println(s.contains("Java"));',
              '    }',
              '}'
            ],
          expect: '10\nhello java\ntrue', hint: '方法名是 length()、toLowerCase()、contains()。', ans: 'length() 返回字符数（含空格共 10 个）；toLowerCase() 返回新的小写字符串（原串不变，String 不可变）；contains 判断是否包含子串。' },
          { t: 'think', q: '两个内容相同的 String，用 == 比较为什么可能是 false？该用什么？', ans: '== 比较的是两个引用是否指向**同一个对象**，不是内容。内容相同但分别创建的字符串可能在不同地址，== 就是 false。比较内容永远用 `s1.equals(s2)`。' },
          { t: 'think', q: '(int) 9.99 得到 9 还是 10？Java 的窄化转换是四舍五入吗？', ans: '得到 **9**。强转 (int) 是**直接截断小数部分**，不是四舍五入。需要四舍五入要用 `Math.round(9.99)`。这点和直觉相反，是新手常踩的坑。' },
        ]
      },

      /* ==================================================== 5 运算符 */
      {
        id: 'operators',
        title: '运算符',
        sub: '算术、比较、逻辑、位运算，以及短路求值的妙用',
        blocks: [
          { t: 'h2', x: '运算符总览' },
          { t: 'table',
            head: ['类别', '运算符', '说明'],
            rows: [
              ['算术', '`+ - * / %`', '加减乘除、取余（`%` 是余数，不是百分号）'],
              ['自增自减', '`++ --`', '`a++` 先用后加，`++a` 先加后用'],
              ['比较', '`== != < > <= >=`', '结果是 `boolean`'],
              ['逻辑', '`&& || !`', '**短路求值**，结果才是 boolean'],
              ['位运算', '`& | ^ ~ << >>`', '按二进制位操作'],
              ['赋值', '`= += -= *= /= %=`', '复合赋值'],
              ['三元', '`条件 ? a : b`', '简化 if-else 的取值']
            ]},

          { t: 'h2', x: '算术运算与整数除法' },
          { t: 'p', x: 'Java 的除法有个要命的细节：**两个整数相除，结果还是整数，小数部分直接丢弃**（不是四舍五入）。只要参与运算的一方是 `double`，结果才变小数。这和 Python 的 `/` 永远返回小数不同，务必留心。' },

          { t: 'code', lang: 'java', title: '算术与整数除法', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int a = 17, b = 5;',
              '        System.out.println("a + b = " + (a + b));',
              '        System.out.println("a - b = " + (a - b));',
              '        System.out.println("a * b = " + (a * b));',
              '        System.out.println("a / b = " + (a / b));     // 整数除法，截断',
              '        System.out.println("a % b = " + (a % b));     // 取余',
              '        System.out.println("7.0 / 2 = " + (7.0 / 2));  // 有 double 才得小数',
              '        System.out.println("2 的 10 次方 = " + (int) Math.pow(2, 10));',
              '',
              '        int c = 3;',
              '        System.out.println("c++ 先用后加: " + (c++));',
              '        System.out.println("加完后 c = " + c);',
              '        System.out.println("++c 先加后用: " + (++c));',
              '    }',
              '}'
            ],
            expect: 'a + b = 22\na - b = 12\na * b = 85\na / b = 3\na % b = 2\n7.0 / 2 = 3.5\n2 的 10 次方 = 1024\nc++ 先用后加: 3\n加完后 c = 4\n++c 先加后用: 5' },

          { t: 'note', k: 'warn', title: '7 / 2 等于 3，不是 3.5',
            x: '这是 Java 新手排名第一的除法坑。`17 / 5` 得 `3`，余数 `2` 被静默丢弃。若想保留小数，把被除数或除数写成 `7.0` 这种 double，或先强转：`(double) 7 / 2`。' },

          { t: 'h2', x: '比较与逻辑：返回 boolean' },
          { t: 'p', x: '比较运算的结果是 `boolean`（`true`/`false`），**不能当数字用**——`if (1)` 在 C/Java 里非法（Java 要求条件必须是 boolean）。逻辑运算符 `&&`、`||` 具有**短路**特性：左边已能决定结果时，右边根本不执行。' },

          { t: 'code', lang: 'java', title: '短路求值', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int x = 0;',
              '        boolean r1 = (x != 0) && (10 / x > 1);   // 短路：左边假，右边不跑',
              '        System.out.println("短路 && 结果: " + r1);',
              '',
              '        int y = 5;',
              '        boolean r2 = (y > 0) || (10 / 0 > 1);    // 短路：左边真，右边不跑',
              '        System.out.println("短路 || 结果: " + r2);',
              '',
              '        boolean r3 = !(y > 10);',
              '        System.out.println("!(y > 10) = " + r3);',
              '',
              '        System.out.println("3 == 3 ? " + (3 == 3));',
              '        System.out.println("3 != 4 ? " + (3 != 4));',
              '        System.out.println("3 > 4 ? " + (3 > 4));',
              '    }',
              '}'
            ],
            expect: '短路 && 结果: false\n短路 || 结果: true\n!(y > 10) = true\n3 == 3 ? true\n3 != 4 ? true\n3 > 4 ? false' },

          { t: 'note', k: 'tip', title: '短路能避免除零崩溃',
            x: '上面 `10 / x > 1` 在 `x == 0` 时会抛异常，但因为 `&&` 短路，左边 `x != 0` 已经是假，右边根本不执行，所以程序安然无恙。把「可能为假的防护条件」写在 `&&` 左边，是写安全代码的好习惯。' },

          { t: 'h2', x: '位运算与三元运算符' },
          { t: 'p', x: '位运算直接操作二进制，常用于底层优化、权限掩码、哈希。`&` 按位与、`|` 按位或、`^` 异或、`<<` 左移（乘 2 的幂）、`>>` 右移。三元 `条件 ? 值1 : 值2` 是「取值版」的 if-else。' },

          { t: 'code', lang: 'java', title: '位运算与三元', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int m = 6;   // 0110',
              '        int n = 3;   // 0011',
              '        System.out.println("m & n = " + (m & n));   // 按位与 -> 2',
              '        System.out.println("m | n = " + (m | n));   // 按位或 -> 7',
              '        System.out.println("m ^ n = " + (m ^ n));   // 异或   -> 5',
              '        System.out.println("m << 1 = " + (m << 1)); // 左移 1 -> 12',
              '        System.out.println("m >> 1 = " + (m >> 1)); // 右移 1 -> 3',
              '',
              '        int score = 85;',
              '        String grade = score >= 60 ? "及格" : "不及格";',
              '        System.out.println("成绩 " + score + " -> " + grade);',
              '    }',
              '}'
            ],
            expect: 'm & n = 2\nm | n = 7\nm ^ n = 5\nm << 1 = 12\nm >> 1 = 3\n成绩 85 -> 及格' },

          { t: 'h2', x: '运算符优先级' },
          { t: 'p', x: '从高到低，记住几条常用的就够：一元（`++`、`!`）> 乘除取余 > 加减 > 移位 > 比较 > 相等 > `&&` > `||` > 三元。拿不准就加括号——**括号不只是消除歧义，更是让读代码的人不用去背优先级表**。' },
          { t: 'ol', x: [
            '`()` 括号永远最高，先算里面',
            '`!`、`++`、`--`（一元）',
            '`*` `/` `%`',
            '`+` `-`（二元）',
            '`<` `>` `<=` `>=`',
            '`==` `!=`',
            '`&&` → `||`',
            '三元 `? :`（优先级最低，except 赋值）'
          ]},

          { t: 'kp', x: [
            '两个整数相除结果仍是整数，小数部分静默截断',
            '比较运算返回 boolean，不能当数字用在 if 里',
            '`&&`/`||` 短路：左边已定结论时右边不执行',
            '位运算操作二进制，左移相当于乘 2 的幂',
            '三元 `条件 ? a : b` 是「取值」版的 if-else',
            '优先级拿不准就加括号'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '观察 Java 的整数除法：为什么 7/2 不是 3.5？', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        System.out.println(7 / 2);',
              '        System.out.println(7.0 / 2);',
              '        System.out.println(7 % 2);',
              '    }',
              '}'
            ],
          expect: '3\n3.5\n1', hint: '两个 int 相除结果还是 int；有一个 double 才得小数。', ans: '`7/2` 两个整数相除，小数部分被丢弃得 3；`7.0/2` 有 double 才得 3.5；`%` 取余得 1。想要小数就把其中一个数写成 7.0 或强转。' },
          { t: 'ex', q: '用三元运算符给分数定级，并比较两个数的大小。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int score = 55;',
              '        String r = score >= 60 ? "及格" : "不及格";',
              '        System.out.println(r);',
              '        int a = 3, b = 5;',
              '        System.out.println("较大者: " + (a > b ? a : b));',
              '    }',
              '}'
            ],
          expect: '不及格\n较大者: 5', hint: '条件 ? 值1 : 值2。', ans: '55 < 60，三元表达式返回「不及格」。第二个三元里 5 更大，所以输出 5。三元就是「取值版」的 if-else。' },
          { t: 'think', q: '为什么 Java 里 7 / 2 得 3 而不是 3.5？怎么改成 3.5？', ans: 'Java 规定**两个整数相除结果仍是整数**，小数部分静默截断。要得到小数，把被除数或除数写成 double，如 `7.0 / 2` 或 `(double) 7 / 2`。这是新手排名第一的除法坑。' },
          { t: 'think', q: '&& 的「短路」是什么？它怎么避免了除零崩溃？', ans: '短路指：左边已经能决定结果时，右边**根本不执行**。`(x != 0) && (10/x > 1)` 中，如果 x==0，左边为假，右边的 10/x 不会被算，程序就不会因除零而抛异常。把防护条件写在 && 左边是好习惯。' },
        ]
      },

      /* ==================================================== 6 流程控制 */
      {
        id: 'control',
        title: '流程控制',
        sub: 'if / for / while / switch，以及现代 switch 表达式',
        blocks: [
          { t: 'h2', x: '条件判断 if / else' },
          { t: 'p', x: '和 Python 用缩进区分块不同，Java 用大括号 `{}` 包裹代码块。条件必须是个 `boolean` 表达式。阶梯式的 `else if` 从上往下匹配，命中即停。' },

          { t: 'code', lang: 'java', title: 'if / else if / else', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int score = 85;',
              '        if (score >= 90) {',
              '            System.out.println("优秀");',
              '        } else if (score >= 60) {',
              '            System.out.println("及格");',
              '        } else {',
              '            System.out.println("不及格");',
              '        }',
              '        System.out.println("评估结束");',
              '    }',
              '}'
            ],
            expect: '及格\n评估结束' },

          { t: 'h3', x: '三元表达式简化取值' },
          { t: 'code', lang: 'java', title: '条件表达式', run: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int age = 20;',
              '        String status = age >= 18 ? "成年" : "未成年";',
              '        System.out.println(status);',
              '',
              '        // 嵌套不宜超过一层，否则不如写 if',
              '        String level = age >= 60 ? "高" : (age >= 18 ? "中" : "低");',
              '        System.out.println("风险等级: " + level);',
              '    }',
              '}'
            ],
            expect: '成年\n风险等级: 中' },

          { t: 'h2', x: '循环：for / 增强 for / while' },
          { t: 'p', x: 'Java 的 `for` 是经典的「三段式」（`初始化; 条件; 步进`），和 C 一致。`增强 for`（for-each）专门用于遍历数组或集合，更不易出错。需要索引时再用传统 `for`。' },

          { t: 'code', lang: 'java', title: '两种 for 与 while', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        // 传统 for',
              '        System.out.println("传统 for：");',
              '        for (int i = 1; i <= 3; i++) {',
              '            System.out.println("  i = " + i);',
              '        }',
              '',
              '        // 增强 for（遍历数组/集合）',
              '        System.out.println("增强 for：");',
              '        int[] nums = {10, 20, 30};',
              '        for (int v : nums) {',
              '            System.out.println("  v = " + v);',
              '        }',
              '',
              '        // while：先判断再执行',
              '        int n = 5;',
              '        int fact = 1;',
              '        while (n > 0) {',
              '            fact *= n;',
              '            n--;',
              '        }',
              '        System.out.println("5! = " + fact);',
              '    }',
              '}'
            ],
            expect: '传统 for：\n  i = 1\n  i = 2\n  i = 3\n增强 for：\n  v = 10\n  v = 20\n  v = 30\n5! = 120' },

          { t: 'h3', x: 'do-while：至少执行一次' },
          { t: 'code', lang: 'java', title: 'do-while 与 break/continue', run: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int x = 0;',
              '        do {',
              '            System.out.println("do-while 执行，x = " + x);',
              '            x++;',
              '        } while (x < 3);',
              '',
              '        // break 跳出、continue 跳过本次',
              '        System.out.println("带 continue 的循环：");',
              '        for (int i = 1; i <= 5; i++) {',
              '            if (i % 2 == 0) continue;',
              '            System.out.println("  奇数: " + i);',
              '        }',
              '    }',
              '}'
            ],
            expect: 'do-while 执行，x = 0\ndo-while 执行，x = 1\ndo-while 执行，x = 2\n带 continue 的循环：\n  奇数: 1\n  奇数: 3\n  奇数: 5' },

          { t: 'h2', x: 'switch：多分支选择' },
          { t: 'p', x: '当判断条件是「等于某几个离散值」时，`switch` 比一长串 `if-else` 更清晰。传统写法每个 `case` 末尾要 `break`，忘了 `break` 会「贯穿」到下一个分支——这是个经典 bug 来源。' },

          { t: 'code', lang: 'java', title: '传统 switch 语句', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int day = 3;',
              '        String name;',
              '        switch (day) {',
              '            case 1:',
              '                name = "星期一";',
              '                break;',
              '            case 2:',
              '                name = "星期二";',
              '                break;',
              '            case 3:',
              '                name = "星期三";',
              '                break;',
              '            default:',
              '                name = "其他";',
              '        }',
              '        System.out.println("今天是 " + name);',
              '    }',
              '}'
            ],
            expect: '今天是 星期三' },

          { t: 'note', k: 'danger', title: '忘写 break 会「贯穿」',
            x: '传统 switch 每个 case 执行完不会自动跳出，会继续往下跑，直到遇见 `break` 或 `}`。这种「fall-through」有时是故意的（几个 case 共用一段逻辑），但大多时候是疏忽。Java 14 引入的 switch 表达式从语法上消灭了这个问题。' },

          { t: 'h2', x: '现代 switch 表达式（Java 14+）' },
          { t: 'p', x: '新写法用 `->` 箭头语法：**每个分支自动终止，不再需要 break**；并且整个 `switch` 可以作为一个「值」赋给变量。`case` 还能用逗号合并多个值。本教程目标环境 OpenJDK 21 完全支持。' },

          { t: 'code', lang: 'java', title: 'switch 表达式（箭头语法）', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int month = 2;',
              '        // 箭头语法：无需 break，整体是一个值',
              '        String season = switch (month) {',
              '            case 12, 1, 2 -> "冬季";',
              '            case 3, 4, 5 -> "春季";',
              '            case 6, 7, 8 -> "夏季";',
              '            case 9, 10, 11 -> "秋季";',
              '            default -> "未知";',
              '        };',
              '        System.out.println(month + " 月是 " + season);',
              '',
              '        // yield 用于需要多行逻辑的分支',
              '        int num = 7;',
              '        String kind = switch (num) {',
              '            case 1, 3, 5, 7, 9 -> {',
              '                System.out.println("  奇数分支计算中...");',
              '                yield "奇数";',
              '            }',
              '            default -> "偶数或其他";',
              '        };',
              '        System.out.println(num + " 是 " + kind);',
              '    }',
              '}'
            ],
            expect: '2 月是 冬季\n  奇数分支计算中...\n7 是 奇数' },

          { t: 'kp', x: [
            'Java 用大括号划分代码块，条件必须是 boolean',
            '传统 for 三段式；增强 for 专用于遍历数组/集合',
            'while 先判后跑，do-while 至少跑一次',
            'break 跳出循环，continue 跳过本次',
            '传统 switch 忘写 break 会贯穿到下一分支',
            '现代 switch 表达式用 -> 箭头，无需 break，还是个值'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用三段式 for 循环打印 3 次。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        for (int i = 1; i <= 3; i++) {',
              '            System.out.println("第 " + i + " 次");',
              '        }',
              '    }',
              '}'
            ],
          expect: '第 1 次\n第 2 次\n第 3 次', hint: 'for (int i = 1; i <= 3; i++)。', ans: '初始化 i=1，每次检查 i<=3，执行完后 i++。这种「初始化; 条件; 步进」的三段式 for 是 Java 最通用的循环。' },
          { t: 'ex', q: '用增强 for（for-each）遍历数组并求和。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int[] nums = {10, 20, 30};',
              '        int sum = 0;',
              '        for (int n : nums) sum += n;',
              '        System.out.println("总和: " + sum);',
              '    }',
              '}'
            ],
          expect: '总和: 60', hint: 'for (int n : nums) 逐个取出元素。', ans: '增强 for 直接把数组每个元素依次放进 n，不用管下标，累加得 10+20+30=60。它专用于遍历数组和集合。' },
          { t: 'think', q: '传统 for 和增强 for（for-each）分别在什么场景用？', ans: '只遍历所有元素、不需要下标时，用**增强 for**（`for (int n : nums)`），简洁安全。需要索引、需要倒序、或需要修改当前位置时，用**传统三段式 for**。' },
          { t: 'think', q: '传统 switch 里每个 case 末尾如果漏写 break，会发生什么？', ans: '会**贯穿（fall-through）**：从命中的 case 开始一直执行到遇到 break 或 switch 结束，把后面的 case 也一起跑了，是经典 bug 来源。Java 14+ 的 switch 表达式用 -> 箭头，从语法上消灭了这个问题。' },
        ]
      },

      /* ==================================================== 7 函数（方法） */
      {
        id: 'functions',
        title: '方法 / 函数',
        sub: '参数、返回值、重载、可变参数，以及「Java 只有按值传递」',
        blocks: [
          { t: 'h2', x: '方法的定义与调用' },
          { t: 'p', x: 'Java 里没有「游离的函数」，所有逻辑都叫**方法（method）**，写在类里。方法签名由「返回类型 + 名字 + 参数列表」组成。`void` 表示不返回值。调用时直接写 `名字(参数)`。' },

          { t: 'code', lang: 'java', title: '定义与调用方法', run: true, ed: true,
            code: [
              'public class Main {',
              '    // 方法定义：修饰符 返回类型 名字(参数)',
              '    static int add(int a, int b) {',
              '        return a + b;',
              '    }',
              '',
              '    static void greet(String name) {',
              '        System.out.println("你好，" + name + "！");',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        greet("Alice");',
              '        int sum = add(3, 5);',
              '        System.out.println("3 + 5 = " + sum);',
              '    }',
              '}'
            ],
            expect: '你好，Alice！\n3 + 5 = 8' },

          { t: 'note', k: 'info', title: '为什么示例方法都带 static',
            x: '示例里方法加了 `static`，是为了能直接从 `main`（它本身是 static）调用，省去先 `new` 一个对象的步骤。正式的项目里，大多数方法属于某个对象，不带 static。这点在「面向对象」章会展开。' },

          { t: 'h2', x: '方法重载（overloading）' },
          { t: 'p', x: '同一个类里可以有**多个同名方法**，只要参数列表（个数或类型）不同。编译器按你传入的参数自动挑最匹配的版本。重载让「同名操作支持不同类型」变得自然，比如 `System.out.println` 能打印任何东西就是靠重载。' },

          { t: 'code', lang: 'java', title: '重载示例', run: true, ed: true,
            code: [
              'public class Main {',
              '    static int square(int x) { return x * x; }',
              '    static double square(double x) { return x * x; }',
              '    static int square(int x, int y) { return x * x + y * y; }',
              '',
              '    public static void main(String[] args) {',
              '        System.out.println("square(4) = " + square(4));',
              '        System.out.println("square(2.5) = " + square(2.5));',
              '        System.out.println("square(3,4) = " + square(3, 4));',
              '    }',
              '}'
            ],
            expect: 'square(4) = 16\nsquare(2.5) = 6.25\nsquare(3,4) = 25' },

          { t: 'h2', x: '可变参数 varargs' },
          { t: 'p', x: '有时你不知道调用方会传几个参数。用 `类型... 名字` 声明可变参数，方法内部把它当成数组用。一个方法最多只能有一个 varargs，且必须放在参数列表最后。' },

          { t: 'code', lang: 'java', title: '可变参数', run: true, ed: true,
            code: [
              'public class Main {',
              '    static int sum(int... numbers) {',
              '        int total = 0;',
              '        for (int n : numbers) total += n;',
              '        return total;',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        System.out.println("sum() = " + sum());',
              '        System.out.println("sum(1,2) = " + sum(1, 2));',
              '        System.out.println("sum(1,2,3,4,5) = " + sum(1, 2, 3, 4, 5));',
              '    }',
              '}'
            ],
            expect: 'sum() = 0\nsum(1,2) = 3\nsum(1,2,3,4,5) = 15' },

          { t: 'h2', x: 'Java 只有「按值传递」' },
          { t: 'p', x: '这是 Java 最重要的语义之一，也最常被误解。简单说：**方法拿到的是「值的副本」**。对基本类型，副本就是数字本身，方法里改它不影响外面；对对象/数组，副本是「引用（地址）的副本」——所以你能通过它修改对象内部，但无法让外面的引用指向另一个对象。' },

          { t: 'code', lang: 'java', title: '按值传递的两种表现', run: true, ed: true,
            code: [
              'public class Main {',
              '    static void changePrimitive(int x) {',
              '        x = 100;',
              '    }',
              '    static void changeArray(int[] arr) {',
              '        arr[0] = 999;',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        int a = 10;',
              '        changePrimitive(a);',
              '        System.out.println("基本类型传值后 a = " + a);   // 仍是 10',
              '',
              '        int[] arr = {1, 2, 3};',
              '        changeArray(arr);',
              '        System.out.println("数组传引用副本后 arr[0] = " + arr[0]);  // 999',
              '    }',
              '}'
            ],
            expect: '基本类型传值后 a = 10\n数组传引用副本后 arr[0] = 999' },

          { t: 'note', k: 'danger', title: '「Java 对象是按引用传递」是错的',
            x: '准确说法是：基本类型传值；对象传的是「引用的副本」。区别在于——如果你在方法里 `obj = new Something()`，外面的变量并不会跟着变，因为它只拿到了副本。理解这一点，能避免无数「为什么我的修改没生效」的困惑。' },

          { t: 'h2', x: '递归：方法调用自己' },
          { t: 'code', lang: 'java', title: '递归求阶乘', run: true,
            code: [
              'public class Main {',
              '    static long factorial(int n) {',
              '        if (n <= 1) return 1;          // 基线条件，防止无限递归',
              '        return n * factorial(n - 1);  // 递推',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        for (int i = 1; i <= 6; i++) {',
              '            System.out.println(i + "! = " + factorial(i));',
              '        }',
              '    }',
              '}'
            ],
            expect: '1! = 1\n2! = 2\n3! = 6\n4! = 24\n5! = 120\n6! = 720' },

          { t: 'kp', x: [
            'Java 的方法写在类里，void 表示无返回值',
            '重载 = 同名不同参，编译器按实参自动选择',
            'varargs（类型...）接收任意数量的同类型参数',
            'Java 只有按值传递：基本类型传副本，对象传引用副本',
            '递归必须有基线条件，否则栈溢出',
            '示例方法加 static 才能被 static 的 main 直接调用'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '写一个返回两数较大者的方法，并在 main 中调用。', lang: 'java', code: [
              'public class Main {',
              '    static int max(int a, int b) {',
              '        return a > b ? a : b;',
              '    }',
              '    public static void main(String[] args) {',
              '        System.out.println("较大: " + max(3, 9));',
              '    }',
              '}'
            ],
          expect: '较大: 9', hint: '方法要写在类里；示例加 static 才能被 main 直接调用。', ans: 'max 是 static 方法，用三元返回较大者。因为 main 本身是 static，所以直接 max(3,9) 调用，得到 9。' },
          { t: 'ex', q: '用可变参数 int... 求任意多个数的和。', lang: 'java', code: [
              'public class Main {',
              '    static int sum(int... numbers) {',
              '        int total = 0;',
              '        for (int n : numbers) total += n;',
              '        return total;',
              '    }',
              '    public static void main(String[] args) {',
              '        System.out.println(sum(1, 2, 3, 4));',
              '    }',
              '}'
            ],
          expect: '10', hint: '方法内部把 varargs 当数组用。', ans: '`sum(int... numbers)` 接收任意个 int，内部当数组遍历累加，调用 sum(1,2,3,4) 得 10。varargs 必须放在参数列表最后，一个方法最多一个。' },
          { t: 'think', q: 'Java 是按值传递还是按引用传递？方法里修改基本类型参数会影响外部吗？', ans: 'Java **只有按值传递**。基本类型传的是值的副本，方法里改它不影响外部；对象传的是「引用的副本」——你能通过它改对象内部，但无法让外部变量指向新对象。' },
          { t: 'think', q: '什么是方法重载（overload）？两个同名方法靠什么区分？', ans: '同一个类里可以有多个同名方法，只要**参数列表**不同（个数或类型）。编译器按你传入的实参自动挑最匹配的版本。光靠返回类型不同不能区分重载。' },
        ]
      },

      /* ==================================================== 8 开发环境与工具链 */
      {
        id: 'devtools',
        title: '开发环境与工具链',
        sub: '从 JDK 到构建工具，搭建专业 Java 开发环境',
        blocks: [
          { t: 'h2', x: 'JDK 安装与版本管理' },
          { t: 'p', x: 'Java 生态有多个 JDK 发行版：Oracle JDK（商用需付费）、OpenJDK（开源参考实现）、Eclipse Temurin（Adoptium，社区推荐）、Amazon Corretto、Azul Zulu、Microsoft Build of OpenJDK。**初学者推荐 Eclipse Temurin**，免费、长期支持、社区活跃。' },
          { t: 'defs', x: [
            { term: 'SDKMAN', desc: '跨平台 JDK 版本管理工具，支持安装多个 JDK 版本并切换。`sdk install java 21-tem`、`sdk use java 21-tem`。' },
            { term: 'jEnv', desc: 'macOS/Linux 下的 JDK 版本切换工具，不负责下载，只管理已安装的 JDK。' },
            { term: 'Jabba', desc: '跨平台 JDK 版本管理器，类似 Node.js 的 nvm。' },
            { term: 'LTS 版本', desc: '长期支持版本：Java 8、11、17、21。企业生产环境优先选 LTS，每 2 年一个新 LTS。' }
          ]},
          { t: 'code', lang: 'shell', title: 'SDKMAN 常用命令', run: false,
            code: [
              'sdk list java                  # 列出可安装的 JDK',
              'sdk install java 21-tem       # 安装 Eclipse Temurin 21',
              'sdk use java 21-tem           # 当前终端使用 21',
              'sdk default java 21-tem       # 设为默认',
              'java -version                  # 验证'
            ]},
          { t: 'h2', x: '构建工具：Maven 与 Gradle' },
          { t: 'p', x: 'Java 项目不手动用 javac 编译——项目大了之后，依赖管理、编译、测试、打包、发布需要专门的构建工具。**Maven 是事实标准，Gradle 是现代更快的替代。**' },
          { t: 'defs', x: [
            { term: 'Maven', desc: '基于 XML（pom.xml）的构建工具，约定优于配置。中央仓库（Maven Central）有海量依赖。生命周期：compile → test → package → install → deploy。' },
            { term: 'Gradle', desc: '基于 Groovy/Kotlin DSL 的构建工具，比 Maven 快 2-10 倍（增量编译、构建缓存、守护进程）。Android 官方构建工具。' },
            { term: 'Maven Wrapper', desc: 'mvnw 脚本，让没有安装 Maven 的机器也能构建项目，自动下载指定版本的 Maven。' },
            { term: 'Gradle Wrapper', desc: 'gradlew 脚本，同理。' }
          ]},
          { t: 'code', lang: 'xml', title: 'pom.xml 最小示例', run: false,
            code: [
              '<?xml version="1.0" encoding="UTF-8"?>',
              '<project xmlns="http://maven.apache.org/POM/4.0.0">',
              '    <modelVersion>4.0.0</modelVersion>',
              '    <groupId>com.example</groupId>',
              '    <artifactId>myapp</artifactId>',
              '    <version>1.0.0</version>',
              '    <properties>',
              '        <maven.compiler.source>21</maven.compiler.source>',
              '        <maven.compiler.target>21</maven.compiler.target>',
              '    </properties>',
              '    <dependencies>',
              '        <dependency>',
              '            <groupId>com.google.guava</groupId>',
              '            <artifactId>guava</artifactId>',
              '            <version>33.0.0-jre</version>',
              '        </dependency>',
              '    </dependencies>',
              '</project>'
            ]},
          { t: 'code', lang: 'shell', title: 'Maven 常用命令', run: false,
            code: [
              'mvn compile            # 编译',
              'mvn test               # 运行测试',
              'mvn package            # 打包（jar/war）',
              'mvn clean package      # 清理后打包',
              'mvn install            # 安装到本地仓库',
              'mvn dependency:tree    # 查看依赖树',
              'java -jar target/myapp.jar  # 运行'
            ]},
          { t: 'h2', x: 'IDE 选择' },
          { t: 'defs', x: [
            { term: 'IntelliJ IDEA', desc: 'Java 开发首选 IDE，社区版免费，旗舰版付费。智能补全、重构、调试、数据库工具、Spring 集成都是顶级。' },
            { term: 'Eclipse', desc: '老牌开源 IDE，插件生态丰富，SWT 界面。曾经是标准，现在市场份额被 IntelliJ 蚕食。' },
            { term: 'VS Code', desc: '安装 Extension Pack for Java 后可用，轻量、免费。适合小项目和偶尔写 Java。' },
            { term: 'NetBeans', desc: 'Apache 旗下开源 IDE，Oracle 捐赠。对 Maven 支持好，界面简洁。' }
          ]},
          { t: 'note', k: 'tip', title: 'IntelliJ 常用快捷键',
            x: 'Ctrl+N（新建类）、Ctrl+Shift+T（跳转到测试）、Alt+Enter（显示意图操作）、Ctrl+Alt+L（格式化代码）、Ctrl+Alt+O（优化 import）、Shift+F6（重命名）、Ctrl+Alt+M（提取方法）、F2（跳转到下一个错误）。' },
          { t: 'h2', x: '标准项目结构' },
          { t: 'code', lang: 'text', title: 'Maven 标准目录布局', run: false,
            code: [
              'myapp/',
              '├── src/',
              '│   ├── main/',
              '│   │   ├── java/          # Java 源码',
              '│   │   │   └── com/example/myapp/',
              '│   │   ├── resources/     # 配置文件（.properties, .xml）',
              '│   │   └── webapp/        # Web 项目专用（JSP, CSS, JS）',
              '│   └── test/',
              '│       ├── java/          # 测试源码',
              '│       └── resources/     # 测试配置',
              '├── target/                # 编译输出（不提交 Git）',
              '├── pom.xml',
              '└── README.md'
            ]},
          { t: 'h2', x: '调试与诊断工具' },
          { t: 'defs', x: [
            { term: 'jdb', desc: 'JDK 自带命令行调试器，类似 gdb。`jdb -attach 5005` 附加到远程 JVM。' },
            { term: 'JConsole', desc: 'JDK 自带的 JMX 监控工具，图形化查看内存、线程、GC、类加载。' },
            { term: 'VisualVM', desc: '更强大的 JVM 监控和分析工具，支持 CPU/内存采样、堆转储分析。' },
            { term: 'JFR', desc: 'Java Flight Recorder，JDK 内置的低开销性能分析器，生产环境可用。' },
            { term: 'Arthas', desc: '阿里开源的 Java 诊断工具，在线排查问题，无需重启应用。' }
          ]},
          { t: 'code', lang: 'shell', title: '远程调试配置', run: false,
            code: [
              '# 启动时开启调试端口',
              'java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -jar myapp.jar',
              '',
              '# 用 jdb 附加',
              'jdb -attach 5005'
            ]},
          { t: 'h2', x: '代码质量工具' },
          { t: 'table', head: ['工具', '作用', 'Maven 插件'], rows: [
            ['Checkstyle', '代码风格检查（Google/Sun 规范）', 'maven-checkstyle-plugin'],
            ['SpotBugs', '字节码缺陷检测（原 FindBugs）', 'spotbugs-maven-plugin'],
            ['PMD', '源码缺陷检测 + 重复代码', 'maven-pmd-plugin'],
            ['JaCoCo', '代码覆盖率统计', 'jacoco-maven-plugin'],
            ['OWASP Dependency-Check', '依赖安全漏洞扫描', 'dependency-check-maven'],
            ['SonarQube', '综合代码质量平台', 'sonar-maven-plugin']
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            'JDK：选 Eclipse Temurin LTS 版本，用 SDKMAN 管理多版本',
            '构建：Maven（pom.xml，事实标准）或 Gradle（更快更灵活）',
            'IDE：IntelliJ IDEA 社区版（首选）或 Eclipse / VS Code',
            '项目结构：Maven 标准布局（src/main/java + src/test/java）',
            '调试：jdb（命令行）+ JConsole/VisualVM（监控）+ JFR（性能分析）',
            '质量：Checkstyle + SpotBugs + JaCoCo + SonarQube'
          ]}
        ]
      },

      /* ==================================================== 9 集合 */
      {
        id: 'collections',
        title: '集合',
        sub: '数组、ArrayList、HashMap，以及 Stream 流式处理',
        blocks: [
          { t: 'h2', x: '为什么需要集合' },
          { t: 'p', x: '数组长度固定、类型单一，用起来别扭。Java 在 `java.util` 里提供了一整套**集合框架（Collections Framework）**：`List` 有序可重复、`Set` 不可重复、`Map` 键值对。它们都存放在「泛型」容器里，既能装任意对象，又保留类型安全。' },

          { t: 'table',
            head: ['接口', '常用实现', '特点', '典型用途'],
            rows: [
              ['`List`', '`ArrayList`', '有序、可重复、按索引', '动态数组、序列'],
              ['`Set`', '`HashSet`', '不可重复、无序', '去重、成员判定'],
              ['`Map`', '`HashMap`', '键值对、按键查', '字典、缓存、配置'],
              ['`Queue`', '`LinkedList`', '先进先出', '任务队列']
            ]},

          { t: 'h2', x: '数组：最底层的结构' },
          { t: 'p', x: '数组是固定长度的连续容器，访问快（`O(1)`），但长度不能变。声明用 `类型[] 名字`，下标从 0 开始，越界会抛 `ArrayIndexOutOfBoundsException`。' },

          { t: 'code', lang: 'java', title: '数组操作', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int[] nums = {3, 1, 4, 1, 5, 9};',
              '        System.out.println("长度: " + nums.length);',
              '        System.out.println("第一个: " + nums[0]);',
              '        nums[2] = 40;',
              '        System.out.println("修改后的第3个: " + nums[2]);',
              '',
              '        System.out.print("所有元素: ");',
              '        for (int n : nums) System.out.print(n + " ");',
              '        System.out.println();',
              '',
              '        java.util.Arrays.sort(nums);',
              '        System.out.println("排序后: " + java.util.Arrays.toString(nums));',
              '    }',
              '}'
            ],
            expect: '长度: 6\n第一个: 3\n修改后的第3个: 40\n所有元素: 3 1 40 1 5 9 \n排序后: [1, 1, 3, 5, 9, 40]' },

          { t: 'h2', x: 'ArrayList：可伸缩的列表' },
          { t: 'p', x: '`ArrayList` 是日常最常用的集合，底层是动态数组，满了会自动扩容。泛型 `<String>` 锁定元素类型，编译器帮你挡掉「误装错误类型」。' },

          { t: 'code', lang: 'java', title: 'ArrayList 增删查', run: true, ed: true,
            code: [
              'import java.util.ArrayList;',
              '',
              'public class Main {',
              '    public static void main(String[] args) {',
              '        ArrayList<String> list = new ArrayList<>();',
              '        list.add("苹果");',
              '        list.add("香蕉");',
              '        list.add("樱桃");',
              '        System.out.println("列表: " + list);',
              '        list.add(1, "牛油果");',
              '        System.out.println("插入后: " + list);',
              '        list.remove("香蕉");',
              '        System.out.println("删除后: " + list);',
              '        System.out.println("大小: " + list.size());',
              '        System.out.println("包含 樱桃? " + list.contains("樱桃"));',
              '        System.out.println("第0个: " + list.get(0));',
              '    }',
              '}'
            ],
            expect: '列表: [苹果, 香蕉, 樱桃]\n插入后: [苹果, 牛油果, 香蕉, 樱桃]\n删除后: [苹果, 牛油果, 樱桃]\n大小: 3\n包含 樱桃? true\n第0个: 苹果' },

          { t: 'note', k: 'tip', title: '菱形运算符 <>',
            x: '`new ArrayList<>()` 里的 `<>` 叫「菱形运算符」，Java 7 引入，让编译器根据左边 `ArrayList<String>` 自动推断泛型类型，省得右边再写一遍。这是写集合时几乎必用的语法糖。' },

          { t: 'h2', x: 'HashMap：键值映射' },
          { t: 'p', x: '`HashMap` 按「键」快速查「值」，底层是哈希表，平均 `O(1)`。注意：HashMap **不保证遍历顺序**。若需要固定顺序，用 `LinkedHashMap`；需要按key排序，用 `TreeMap`。下面示例用 `TreeSet` 给键排序，保证输出确定。' },

          { t: 'code', lang: 'java', title: 'HashMap 用法', run: true, ed: true,
            code: [
              'import java.util.HashMap;',
              'import java.util.TreeSet;',
              '',
              'public class Main {',
              '    public static void main(String[] args) {',
              '        HashMap<String, Integer> scores = new HashMap<>();',
              '        scores.put("Alice", 90);',
              '        scores.put("Bob", 75);',
              '        scores.put("Charlie", 88);',
              '        System.out.println("Alice 的分数: " + scores.get("Alice"));',
              '        System.out.println("Bob 的分数: " + scores.get("Bob"));',
              '        System.out.println("是否存在 David? " + scores.containsKey("David"));',
              '',
              '        scores.put("Alice", 95);   // 同键覆盖',
              '        System.out.println("更新后 Alice: " + scores.get("Alice"));',
              '        System.out.println("大小: " + scores.size());',
              '',
              '        System.out.println("按名字排序遍历:");',
              '        for (String name : new TreeSet<>(scores.keySet())) {',
              '            System.out.println("  " + name + " -> " + scores.get(name));',
              '        }',
              '    }',
              '}'
            ],
            expect: 'Alice 的分数: 90\nBob 的分数: 75\n是否存在 David? false\n更新后 Alice: 95\n大小: 3\n按名字排序遍历:\n  Alice -> 95\n  Bob -> 75\n  Charlie -> 88' },

          { t: 'h2', x: 'Stream：声明式的集合处理' },
          { t: 'p', x: 'Java 8 引入的 **Stream API** 把集合处理变成「流水线」：过滤 `filter`、映射 `map`、收集 `collect`。它不修改原数据，而是产出新结果，读起来像在描述「要什么」而非「怎么做」。这是现代 Java 最有代表性的进步。' },

          { t: 'code', lang: 'java', title: 'Stream 流式处理', run: true, ed: true,
            code: [
              'import java.util.List;',
              'import java.util.stream.Collectors;',
              '',
              'public class Main {',
              '    public static void main(String[] args) {',
              '        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);',
              '        // 过滤偶数并乘以 10',
              '        List<Integer> result = nums.stream()',
              '                .filter(n -> n % 2 == 0)',
              '                .map(n -> n * 10)',
              '                .collect(Collectors.toList());',
              '        System.out.println("偶数放大 10 倍: " + result);',
              '',
              '        // 求和与最大值',
              '        int sum = nums.stream().mapToInt(Integer::intValue).sum();',
              '        System.out.println("总和: " + sum);',
              '        nums.stream().max(Integer::compare)',
              '            .ifPresent(m -> System.out.println("最大值: " + m));',
              '    }',
              '}'
            ],
            expect: '偶数放大 10 倍: [20, 40, 60, 80, 100]\n总和: 55\n最大值: 10' },

          { t: 'note', k: 'info', title: 'Stream 与「函数式」',
            x: '`n -> n * 10` 是 lambda 表达式（Java 8+），相当于一个只干一件小事的匿名方法。`Integer::intValue` 是方法引用。Stream 用这些把「行为」作为参数传递，风格更接近函数式编程，代码更短也更聚焦意图。' },

          { t: 'kp', x: [
            '数组长度固定、访问 O(1)，越界抛异常',
            'ArrayList 动态数组，最常用；泛型锁定元素类型',
            'HashMap 按键查值 O(1)，但不保证顺序',
            '需要确定顺序用 LinkedHashMap / TreeMap',
            'Stream 用 filter/map/collect 做声明式处理',
            'lambda 与方法引用让集合处理更简洁'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 ArrayList 动态添加元素，查看大小和指定位置。', lang: 'java', code: [
              'import java.util.ArrayList;',
              '',
              'public class Main {',
              '    public static void main(String[] args) {',
              '        ArrayList<String> list = new ArrayList<>();',
              '        list.add("苹果");',
              '        list.add("香蕉");',
              '        System.out.println(list.size());',
              '        System.out.println(list.get(0));',
              '    }',
              '}'
            ],
          expect: '2\n苹果', hint: 'add 尾部加，size() 大小，get(0) 取第一个。', ans: 'ArrayList 是可伸缩的动态数组，add 追加，size() 得 2，get(0) 取第一个元素「苹果」。泛型 <String> 锁定只能装字符串。' },
          { t: 'ex', q: '用 HashMap 存「名字→分数」，并练习 getOrDefault。', lang: 'java', code: [
              'import java.util.HashMap;',
              '',
              'public class Main {',
              '    public static void main(String[] args) {',
              '        HashMap<String, Integer> scores = new HashMap<>();',
              '        scores.put("Alice", 90);',
              '        System.out.println(scores.get("Alice"));',
              '        System.out.println(scores.getOrDefault("Bob", 0));',
              '    }',
              '}'
            ],
          expect: '90\n0', hint: 'put 存，get 取；getOrDefault 在键不存在时返回默认值。', ans: 'put("Alice",90) 存值，get 得 90。Bob 不存在，`getOrDefault("Bob", 0)` 不抛异常，直接返回默认 0——避免了 get 返回 null 的麻烦。' },
          { t: 'think', q: 'ArrayList 比原生数组好在哪里？', ans: '数组长度固定，创建后不能变；ArrayList 会**自动扩容**，能随意 add/remove，还提供 size、contains、indexOf 等现成方法。代价是操作基本类型时会有装箱开销。' },
          { t: 'think', q: 'HashMap 遍历顺序固定吗？想要按键排序遍历该用什么？', ans: 'HashMap **不保证**遍历顺序。需要插入顺序用 LinkedHashMap；需要按键排序用 TreeMap，或像教程那样把 keySet 放进 TreeSet 再遍历。' },
          { t: 'defs', x: [
            { term: '泛型（generics）', desc: '在类或方法上用 `<类型参数>` 声明，让同一个类能处理不同类型而不丢失类型信息。比如 `ArrayList<String>` 只能装 String，编译器会在插入时检查类型，取出时不用强转。' },
            { term: '装箱与拆箱（boxing / unboxing）', desc: '基本类型（int）和对应包装类（Integer）之间的自动转换。ArrayList 只能装对象，所以 `list.add(5)` 会自动把 int 装箱成 Integer；`int x = list.get(0)` 会自动拆箱。频繁装箱有性能开销。' },
            { term: '迭代器（Iterator）', desc: '集合框架中用于遍历元素的接口，有 hasNext()、next()、remove() 三个方法。增强 for 循环的底层就是迭代器。调用 next() 前必须用 hasNext() 判断，否则会抛 NoSuchElementException。' },
            { term: '哈希表（hash table）', desc: 'HashMap 和 HashSet 的底层实现。通过把键的 hashCode() 映射到数组下标，实现平均 O(1) 的查找。键必须正确实现 equals() 和 hashCode()——这两个方法必须一致（equals 为 true 的对象 hashCode 必须相同）。' }
          ]},
          { t: 'note', k: 'tip', title: '选集合类型的速查思路',
            x: '需要有序、可重复、要增删 → ArrayList；需要键值对映射 → HashMap；需要去重 → HashSet；需要按键排序 → TreeMap；需要按插入顺序遍历 → LinkedHashMap/LinkedHashSet。Java 集合框架的命名很规律：前缀是实现方式（Array/Hash/Tree/Linked），后缀是接口（List/Map/Set）。' },
        ]
      },

      /* ==================================================== 9 面向对象 */
      {
        id: 'oop',
        title: '面向对象',
        sub: '类、封装、继承、多态、接口与抽象类',
        blocks: [
          { t: 'h2', x: '类与对象' },
          { t: 'p', x: '**类（class）是蓝图，对象（object）是照蓝图造出的实例**。类里装「字段（数据）」和「方法（行为）」。`new` 关键字负责在内存里真正创建一个对象。' },

          { t: 'code', lang: 'java', title: '定义类并创建对象', run: true, ed: true,
            code: [
              'public class Main {',
              '    // 类定义',
              '    static class Dog {',
              '        String name;       // 字段（属性）',
              '        int age;',
              '        void bark() {       // 方法（行为）',
              '            System.out.println(name + "：汪汪！");',
              '        }',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        Dog dog1 = new Dog();',
              '        dog1.name = "旺财";',
              '        dog1.age = 3;',
              '        dog1.bark();',
              '',
              '        Dog dog2 = new Dog();',
              '        dog2.name = "小黑";',
              '        dog2.bark();',
              '    }',
              '}'
            ],
            expect: '旺财：汪汪！\n小黑：汪汪！' },

          { t: 'h2', x: '构造方法与封装' },
          { t: 'p', x: '构造方法在 `new` 时自动调用，用来初始化字段。真正的封装是：把字段设为 `private`（外部不能直接碰），只通过 `getter`/`setter` 暴露受控的读写——这样能在赋值前做校验，保证对象永远处于合法状态。' },

          { t: 'code', lang: 'java', title: '封装：私有字段 + getter/setter', run: true, ed: true,
            code: [
              'public class Main {',
              '    static class Person {',
              '        private String name;   // 私有字段，外部不能直接访问',
              '        private int age;',
              '',
              '        Person(String name, int age) {  // 构造方法',
              '            this.name = name;',
              '            setAge(age);',
              '        }',
              '',
              '        void setAge(int age) {          // setter 中做校验',
              '            if (age < 0) age = 0;',
              '            this.age = age;',
              '        }',
              '',
              '        String getName() { return name; }',
              '        int getAge() { return age; }',
              '',
              '        void introduce() {',
              '            System.out.println("我是 " + name + "，今年 " + age + " 岁。");',
              '        }',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        Person p = new Person("Alice", 25);',
              '        p.introduce();',
              '        p.setAge(-5);   // 非法值被修正为 0',
              '        System.out.println("修正后的年龄: " + p.getAge());',
              '    }',
              '}'
            ],
            expect: '我是 Alice，今年 25 岁。\n修正后的年龄: 0' },

          { t: 'note', k: 'tip', title: 'this 是什么',
            x: '`this` 指「当前这个对象」。当参数名和字段名撞车（`setAge(int age)` 里想给 `this.age` 赋值）时，用 `this.age` 明确指代对象的字段，避免歧义。它是 Java 里最常出现的关键字之一。' },

          { t: 'h2', x: '继承与多态' },
          { t: 'p', x: '**继承（extends）**让子类复用父类的代码；**多态**让「同一段调用，对不同对象表现出不同行为」。`abstract` 类可以包含「只有声明、没有实现」的抽象方法，强制子类去补全——这是定义「规范」的有力工具。' },

          { t: 'code', lang: 'java', title: '继承 + 多态', run: true, ed: true,
            code: [
              'public class Main {',
              '    static abstract class Animal {',
              '        String name;',
              '        Animal(String name) { this.name = name; }',
              '        abstract String speak();',
              '        void describe() {',
              '            System.out.println("我是 " + name + "，我会说：" + speak());',
              '        }',
              '    }',
              '',
              '    static class Dog extends Animal {',
              '        Dog(String name) { super(name); }',
              '        String speak() { return "汪汪"; }',
              '    }',
              '',
              '    static class Cat extends Animal {',
              '        Cat(String name) { super(name); }',
              '        String speak() { return "喵喵"; }',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        Animal[] animals = { new Dog("旺财"), new Cat("咪咪") };',
              '        for (Animal a : animals) {',
              '            a.describe();   // 多态：同一调用，不同表现',
              '        }',
              '    }',
              '}'
            ],
            expect: '我是 旺财，我会说：汪汪\n我是 咪咪，我会说：喵喵' },

          { t: 'h2', x: '接口：定义能力，不关心实现' },
          { t: 'p', x: '如果说继承是「is-a（是一个）」，接口就是「can-do（能做）」。接口只声明方法签名，类用 `implements` 承诺「我具备这种能力」。Java 8 后接口还能有 `default` 默认方法，提供通用实现而不强制每个实现类重写。一个类可实现多个接口，弥补了「Java 只能单继承」的灵活度。' },

          { t: 'code', lang: 'java', title: '接口与默认方法', run: true, ed: true,
            code: [
              'public class Main {',
              '    interface Drawable {',
              '        void draw();                 // 抽象方法',
              '        default void info() {        // 默认方法（Java 8+）',
              '            System.out.println("这是一个可绘制的图形");',
              '        }',
              '    }',
              '',
              '    static class Circle implements Drawable {',
              '        public void draw() {',
              '            System.out.println("绘制一个圆形 O");',
              '        }',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        Drawable d = new Circle();',
              '        d.draw();',
              '        d.info();',
              '    }',
              '}'
            ],
            expect: '绘制一个圆形 O\n这是一个可绘制的图形' },

          { t: 'h2', x: '抽象类 vs 接口：怎么选' },
          { t: 'table',
            head: ['维度', '抽象类（abstract class）', '接口（interface）'],
            rows: [
              ['关系', 'is-a（是一个）', 'can-do（能做）'],
              ['继承数量', '一个类只能继承一个', '一个类可实现多个'],
              ['字段', '可以有各种字段', '只能有 `static final` 常量'],
              ['构造方法', '可以有', '不能有'],
              ['适用', '为一组紧密相关的类抽取共性', '定义跨类别的能力契约']
            ]},

          { t: 'note', k: 'info', title: '三大特性的落点',
            x: '**封装** = 用 private 隐藏细节、用方法暴露受控接口；**继承** = 复用父类代码、建立层级；**多态** = 父类/接口引用指向子类对象，运行时调用真实实现。三者合起来，才是面向对象能「用小型构件拼出大型系统」的根本原因。' },

          { t: 'kp', x: [
            '类是蓝图，对象是用 new 造出的实例',
            '封装 = private 字段 + getter/setter 受控访问',
            '构造方法在 new 时自动调用，用于初始化',
            '继承 extends 复用代码；多态让同一调用表现不同',
            '接口定义能力契约，一个类可实现多个',
            '抽象类抽共性，接口定规范，按关系选'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '定义一个 Dog 类（带构造方法和 bark 方法），创建实例并调用。', lang: 'java', code: [
              'public class Main {',
              '    static class Dog {',
              '        String name;',
              '        Dog(String name) { this.name = name; }',
              '        void bark() { System.out.println(name + ": 汪汪"); }',
              '    }',
              '    public static void main(String[] args) {',
              '        Dog d = new Dog("旺财");',
              '        d.bark();',
              '    }',
              '}'
            ],
          expect: '旺财: 汪汪', hint: 'this.name 给字段赋值；new Dog(...) 创建对象。', ans: 'Dog 是类（蓝图），new Dog("旺财") 造出一个具体对象。构造方法在 new 时自动调用，this.name 把参数存进字段，bark() 打印出来。' },
          { t: 'ex', q: '用抽象类 Animal + Dog/Cat 子类，体会多态。', lang: 'java', code: [
              'public class Main {',
              '    static abstract class Animal {',
              '        abstract String speak();',
              '    }',
              '    static class Dog extends Animal {',
              '        String speak() { return "汪汪"; }',
              '    }',
              '    static class Cat extends Animal {',
              '        String speak() { return "喵喵"; }',
              '    }',
              '    public static void main(String[] args) {',
              '        Animal[] animals = { new Dog(), new Cat() };',
              '        for (Animal a : animals) System.out.println(a.speak());',
              '    }',
              '}'
            ],
          expect: '汪汪\n喵喵', hint: '抽象类里 abstract 方法只有签名，子类去实现。', ans: 'Animal 声明抽象方法 speak()，Dog、Cat 各自实现成「汪汪」「喵喵」。遍历时用统一的 Animal 引用，调用同一个 speak()，却按真实对象执行不同版本——这就是多态。' },
          { t: 'think', q: '封装为什么要把字段设成 private，再通过 getter/setter 暴露？', ans: '直接公开字段，外部就能随便塞非法值（比如年龄 -5）。把字段设 private 隐藏起来，只通过 setter 读写，就能在里面加**校验**，保证对象永远处于合法状态——这就是封装的意义。' },
          { t: 'think', q: '抽象类和接口怎么选？什么时候该用接口？', ans: '「is-a、有共同字段/实现」用抽象类；「can-do、只定义能力契约」用接口。Java 只能单继承抽象类，但可以实现**多个接口**。需要跨不同层级的类共享一个能力（如「可比较」）时，用接口。' },
        ]
      },

      /* ==================================================== 10 异常 */
      {
        id: 'errors',
        title: '异常',
        sub: 'try/catch/finally、throw、自定义异常与 try-with-resources',
        blocks: [
          { t: 'h2', x: '异常是什么' },
          { t: 'p', x: '程序运行时的意外情况（除零、格式错、文件找不到…）在 Java 里被包装成**异常对象**。异常体系是分层的：最顶端是 `Throwable`，往下分 `Error`（严重到不该捕获，如内存溢出）和 `Exception`（你该处理的）。`Exception` 又分 **checked**（编译期强制你处理）和 **unchecked / RuntimeException**（可不处理）。' },

          { t: 'table',
            head: ['类型', '示例', '是否强制处理'],
            rows: [
              ['`RuntimeException`（unchecked）', '`NullPointerException`、`ArithmeticException`', '否，编译器不管'],
              ['其他 `Exception`（checked）', '`IOException`、`SQLException`', '是，必须 try 或 throws'],
              ['`Error`', '`OutOfMemoryError`', '否，通常无力回天']
            ]},

          { t: 'h2', x: 'try / catch / finally' },
          { t: 'p', x: '把「可能出错的代码」放进 `try`，把「出错后的补救」放进 `catch`，把「无论成败都要做」的事（如关闭资源）放进 `finally`。`catch` 按从具体到宽泛的顺序排列，命中一个就停止。' },

          { t: 'code', lang: 'java', title: '捕获除零异常', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        try {',
              '            int result = 10 / 0;     // 抛出 ArithmeticException',
              '            System.out.println(result);',
              '        } catch (ArithmeticException e) {',
              '            System.out.println("捕获到异常: " + e.getMessage());',
              '        }',
              '        System.out.println("程序继续运行");',
              '    }',
              '}'
            ],
            expect: '捕获到异常: / by zero\n程序继续运行' },

          { t: 'code', lang: 'java', title: '多 catch 与 finally', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        String text = "abc";',
              '        try {',
              '            int n = Integer.parseInt(text);   // NumberFormatException',
              '            System.out.println(n);',
              '        } catch (NumberFormatException e) {',
              '            System.out.println("数字格式错误: " + e.getMessage());',
              '        } catch (Exception e) {',
              '            System.out.println("其他异常: " + e);',
              '        } finally {',
              '            System.out.println("[finally] 总会执行");',
              '        }',
              '    }',
              '}'
            ],
            expect: '数字格式错误: For input string: "abc"\n[finally] 总会执行' },

          { t: 'note', k: 'danger', title: '不要写裸 catch (Exception) 吞掉一切',
            x: '`catch (Exception e)` 能接住几乎所有异常，但范围太广会掩盖你没预料到的错误，给调试埋雷。原则：**只捕获你能合理处理的异常，且越具体越好**。也不要捕获 `Throwable`（那会把 `Error` 也揽进来）。' },

          { t: 'h2', x: '主动抛异常与自定义异常' },
          { t: 'p', x: '用 `throw` 主动抛出问题；方法签名上的 `throws` 是把「处理责任」上交给调用方。业务上常见做法是定义一个继承 `Exception` 的**自定义异常**，让错误类型一目了然，还能附带数据。' },

          { t: 'code', lang: 'java', title: 'throw 与自定义异常', run: true, ed: true,
            code: [
              'public class Main {',
              '    static class InsufficientFundsException extends Exception {',
              '        InsufficientFundsException(String msg) { super(msg); }',
              '    }',
              '',
              '    static int withdraw(int balance, int amount) throws InsufficientFundsException {',
              '        if (amount <= 0) throw new IllegalArgumentException("金额必须大于 0");',
              '        if (amount > balance) throw new InsufficientFundsException("余额不足：当前 " + balance + "，需 " + amount);',
              '        return balance - amount;',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        try {',
              '            System.out.println("取出 30，剩余 " + withdraw(100, 30));',
              '            System.out.println(withdraw(70, 200));',
              '        } catch (InsufficientFundsException e) {',
              '            System.out.println("业务异常: " + e.getMessage());',
              '        }',
              '    }',
              '}'
            ],
            expect: '取出 30，剩余 70\n业务异常: 余额不足：当前 70，需 200' },

          { t: 'note', k: 'warn', title: 'checked 异常是 Java 的争议特性',
            x: '`InsufficientFundsException` 继承了 `Exception`，所以方法必须写 `throws`，调用方必须 try 或继续 throws——编译器会检查。这强制你面对错误，但也被很多人嫌「太啰嗦」。Java 7 的 `try-with-resources` 和后来的新特性都在缓解这种负担。' },

          { t: 'h2', x: 'try-with-resources：自动关资源' },
          { t: 'p', x: '读文件、连数据库这类「占用系统资源」的操作，忘了关闭会泄漏。传统写法要在 `finally` 里手动 `close()`；Java 7 起用 **try-with-resources**，凡是实现了 `AutoCloseable` 的资源，离开 `try` 块会自动关闭，代码清爽又安全。' },

          { t: 'code', lang: 'java', title: 'try-with-resources', run: true, ed: true,
            code: [
              'import java.io.BufferedReader;',
              'import java.io.StringReader;',
              'import java.io.IOException;',
              '',
              'public class Main {',
              '    public static void main(String[] args) throws IOException {',
              '        String text = "第一行\\n第二行\\n第三行";',
              '        try (BufferedReader reader = new BufferedReader(new StringReader(text))) {',
              '            String line;',
              '            while ((line = reader.readLine()) != null) {',
              '                System.out.println("读到: " + line);',
              '            }',
              '        }   // 离开块，reader 自动关闭',
              '        System.out.println("读取完毕，资源已自动关闭");',
              '    }',
              '}'
            ],
            expect: '读到: 第一行\n读到: 第二行\n读到: 第三行\n读取完毕，资源已自动关闭' },

          { t: 'kp', x: [
            '异常是对象：Error 严重、Exception 可处理',
            'RuntimeException 不必强制捕获，其他 Exception 必须',
            'catch 从具体到宽泛排列，命中即停',
            'finally 无论成败都执行，常用于释放资源',
            'throw 主动抛错，throws 把责任上交调用方',
            'try-with-resources 自动关闭 AutoCloseable 资源'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '尝试把 "abc" 解析成整数，捕获异常后让程序继续。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        try {',
              '            int n = Integer.parseInt("abc");',
              '            System.out.println(n);',
              '        } catch (NumberFormatException e) {',
              '            System.out.println("不是合法数字");',
              '        }',
              '        System.out.println("程序继续");',
              '    }',
              '}'
            ],
          expect: '不是合法数字\n程序继续', hint: 'Integer.parseInt 解析失败会抛 NumberFormatException。', ans: 'parseInt("abc") 抛 NumberFormatException，被 catch 接住打印提示。因为异常被处理了，程序不崩溃，继续执行最后的「程序继续」。' },
          { t: 'ex', q: '捕获除零异常并打印错误信息。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        try {',
              '            int r = 10 / 0;',
              '        } catch (ArithmeticException e) {',
              '            System.out.println("除零了: " + e.getMessage());',
              '        }',
              '    }',
              '}'
            ],
          expect: '除零了: / by zero', hint: '整数除零抛 ArithmeticException。', ans: '10 / 0 触发 ArithmeticException，getMessage() 返回 "/ by zero"。catch 捕获后程序安然无恙。' },
          { t: 'think', q: 'checked 异常和 unchecked（RuntimeException）异常有什么区别？', ans: 'unchecked（如 NullPointerException）编译器**不强制**你处理；checked（如 IOException）则**必须**用 try 捕获或在方法签名 throws 声明，否则编译不通过。这是 Java 的争议特性，强制你面对错误。' },
          { t: 'think', q: 'finally 什么时候执行？try-with-resources 解决了什么问题？', ans: 'finally **无论是否发生异常都会执行**，传统上用来在里面手动 close() 资源。try-with-resources（`try (资源) {}`）让任何 AutoCloseable 资源在出块时**自动关闭**，省掉手写 finally，更清爽也更不易漏。' },
          { t: 'defs', x: [
            { term: '受检异常（checked exception）', desc: '编译器强制你处理的异常，必须用 try-catch 捕获或在方法签名 throws 声明，否则编译不通过。典型代表是 IOException、SQLException。Java 的争议特性，设计初衷是强制开发者面对错误。' },
            { term: '非受检异常（unchecked exception）', desc: '编译器不强制处理的异常，包括 RuntimeException 及其子类（如 NullPointerException、ArrayIndexOutOfBoundsException）和 Error。这类异常通常是代码 bug 导致的，应该通过改进代码避免，而不是靠 try-catch。' },
            { term: '异常栈追踪（stack trace）', desc: '异常发生时 JVM 打印的调用链信息，格式为 `at 类名.方法名(文件名:行号)`，从异常发生点逐层向外列出。从下往上读，最下面是异常类型和消息，往上找自己代码的行号。' },
            { term: 'try-with-resources', desc: 'Java 7 引入的语法，`try (资源声明) { ... }`，任何实现了 AutoCloseable 接口的资源（如 BufferedReader、Scanner）在出块时会自动调用 close()，不用手写 finally，也不会遗漏关闭。' }
          ]},
          { t: 'note', k: 'warn', title: '别吞掉异常',
            x: '空的 catch 块（`catch (Exception e) {}`）是调试杀手——异常被静默吞掉，程序继续跑但数据已经错了，后面炸的时候根本找不到原因。至少要 `e.printStackTrace()` 把异常栈打出来，正式项目用日志框架（如 SLF4J）记录。生产环境可以不打印到控制台，但必须有日志记录。' },
        ]
      },

      /* ==================================================== 11 现代特性 */
      {
        id: 'modern',
        title: '现代特性',
        sub: 'var、record、文本块、sealed、switch 表达式与模式匹配',
        blocks: [
          { t: 'h2', x: '为什么要了解现代特性' },
          { t: 'p', x: 'Java 长期被吐槽「啰嗦」。但从 Java 8 起，它进入了「每半年一个版本、每三年一个 LTS」的快节奏，陆续引入了大量减少样板代码的特性。本教程目标环境 OpenJDK 21，下面这些都能直接用。掌握它们，你的 Java 代码会清爽一大截。' },

          { t: 'h2', x: 'var：局部变量类型推断（Java 10）' },
          { t: 'p', x: '`var` 让编译器根据右边的值**推断**局部变量类型。它不是「动态类型」——变量类型在编译期就定了，只是不用你手写。`var` 只能用于局部变量，不能用于方法参数或字段。' },

          { t: 'code', lang: 'java', title: 'var 类型推断', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        var name = "Alice";        // 推断为 String',
              '        var count = 42;            // 推断为 int',
              '        var list = java.util.List.of("a", "b", "c");  // 推断为 List<String>',
              '        System.out.println(name + " / " + count + " / " + list);',
              '        System.out.println("name 是 String? " + (name instanceof String));',
              '    }',
              '}'
            ],
            expect: 'Alice / 42 / [a, b, c]\nname 是 String? true' },

          { t: 'note', k: 'tip', title: 'var 的边界',
            x: '`var` 不能用于「没有初始值」的声明（`var x;` 不合法），也不能用于 lambda 参数（那个要等后续版本）、方法返回类型或字段。它纯粹是给「右边一眼能看出类型」的局部变量省键盘的。' },

          { t: 'h2', x: 'record：一行定义数据载体（Java 16）' },
          { t: 'p', x: '如果一个类只是「装数据的桶」（DTO、配置、返回值），传统写法要写一堆私有字段、`getter`、构造方法、`equals`/`hashCode`/`toString`——几十行样板。Java 16 的 **`record`** 一行搞定：编译器自动生成这些。' },

          { t: 'code', lang: 'java', title: 'record 数据类', run: true, ed: true,
            code: [
              'public class Main {',
              '    record Point(int x, int y) {}',
              '',
              '    public static void main(String[] args) {',
              '        Point p = new Point(3, 4);',
              '        System.out.println(p);',
              '        System.out.println("x = " + p.x() + ", y = " + p.y());',
              '        // record 自动实现 equals / hashCode',
              '        System.out.println("p.equals(new Point(3,4))? " + p.equals(new Point(3, 4)));',
              '    }',
              '}'
            ],
            expect: 'Point[x=3, y=4]\nx = 3, y = 4\np.equals(new Point(3,4))? true' },

          { t: 'h2', x: '文本块：多行字符串（Java 15）' },
          { t: 'p', x: '写 JSON、SQL、HTML 时，老式字符串要疯狂转义引号和加 `\n`。**文本块**用一对 `"""` 包裹，保留换行和缩进，几乎不用转义，可读性飞跃。' },

          { t: 'code', lang: 'java', title: '文本块 text block', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        String json = """',
              '{',
              '  "name": "Alice",',
              '  "age": 25',
              '}',
              '""";',
              '        System.out.println(json);',
              '    }',
              '}'
            ],
            expect: '{\n  "name": "Alice",\n  "age": 25\n}' },

          { t: 'note', k: 'info', title: '文本块的缩进怎么算',
            x: 'Java 会参考「结束 `"""` 所在列的缩进」自动砍掉每行的公共前导空格。上面把结束 `"""` 顶格写，所以内容保留你看到的缩进。这样无论代码怎么缩进，输出的 JSON 都干干净净。' },

          { t: 'h2', x: 'sealed：受限继承（Java 17）' },
          { t: 'p', x: '有时你希望「这个类只能被固定的几个子类继承」，既保留多态，又防止别人随意扩展破坏逻辑。`sealed` 类用 `permits` 明确列出允许的子类，子类必须是 `final` / `sealed` / `non-sealed` 之一——继承关系从「开放」变成「声明式受控」。' },

          { t: 'code', lang: 'java', title: 'sealed 受限继承', run: true, ed: true,
            code: [
              'public class Main {',
              '    sealed interface Shape permits Circle, Square {}',
              '    static final class Circle implements Shape {',
              '        public String name() { return "圆形"; }',
              '    }',
              '    static final class Square implements Shape {',
              '        public String name() { return "方形"; }',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        Shape s = new Circle();',
              '        System.out.println("形状: " + ((Circle) s).name());',
              '        Shape s2 = new Square();',
              '        System.out.println("形状: " + ((Square) s2).name());',
              '    }',
              '}'
            ],
            expect: '形状: 圆形\n形状: 方形' },

          { t: 'h2', x: 'switch 表达式 + 模式匹配（Java 21）' },
          { t: 'p', x: '现代 Java 把 `switch` 升级成了真正的表达式，还能对**类型**做模式匹配：`case Integer i ->` 在匹配成功的同时把对象转型绑定到 `i`。配合「增强 instanceof」（`o instanceof Integer n` 直接拿到转型后的 `n`），类型判断代码大幅简化。' },

          { t: 'code', lang: 'java', title: 'switch 表达式与类型模式', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        Object obj = "hello";',
              '        String type = switch (obj) {',
              '            case Integer i -> "整数 " + i;',
              '            case String s  -> "字符串 " + s;',
              '            case Double d  -> "小数 " + d;',
              '            default        -> "其他类型";',
              '        };',
              '        System.out.println("obj 是 " + type);',
              '',
              '        // 增强 instanceof：匹配并绑定变量',
              '        Object o = 42;',
              '        if (o instanceof Integer n) {',
              '            System.out.println("o 是数字，加 1 得 " + (n + 1));',
              '        }',
              '    }',
              '}'
            ],
            expect: 'obj 是 字符串 hello\no 是数字，加 1 得 43' },

          { t: 'kp', x: [
            'var 让编译器推断局部变量类型，不是动态类型',
            'record 一行定义不可变数据类，自动生成 equals/hashCode',
            '文本块 """ """ 优雅写多行字符串',
            'sealed 用 permits 限制谁能继承，继承关系可控',
            'switch 表达式可作值，还能按类型模式匹配',
            '增强 instanceof 绑定变量，少写一次强制转型'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '用 record 一行定义数据类 Point，再用 var 声明变量。', lang: 'java', code: [
              'public class Main {',
              '    record Point(int x, int y) {}',
              '    public static void main(String[] args) {',
              '        var p = new Point(3, 4);',
              '        System.out.println(p);',
              '    }',
              '}'
            ],
          expect: 'Point[x=3, y=4]', hint: 'record 自动生成 toString。', ans: '`record Point(int x, int y) {}` 一行就得到带构造、x()/y() 访问器、equals、toString 的数据类。var 让编译器推断类型，打印时 record 自动输出 Point[x=3, y=4]。' },
          { t: 'ex', q: '用文本块（text block）写多行字符串。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        String s = """',
              '第一行',
              '第二行""";',
              '        System.out.println(s);',
              '    }',
              '}'
            ],
          expect: '第一行\n第二行', hint: '三引号 """ 保留换行。', ans: '文本块用一对 """ 包裹，里面的换行和缩进自然保留，不用手写 \\n 和转义引号，非常适合写 JSON、SQL、HTML。' },
          { t: 'think', q: 'var 是动态类型吗？它能用在哪里、不能用在哪里？', ans: '不是动态类型！var 让编译器根据右边的值**推断**类型，一旦推断出来就固定了。它只能用于**方法内的局部变量**，不能用于字段、方法参数或返回类型，也不能用于「没有初始值」的声明。' },
          { t: 'think', q: '相比手写一个普通类，record 自动生成了哪些东西？', ans: 'record 自动生成：带全部参数的构造方法、每个字段的访问器（x()、y()）、equals/hashCode、以及 toString。原本几十行的样板代码现在一行搞定，特别适合「纯装数据」的类。' },
        ]
      },

      /* ==================================================== 12 第三方库与生态 */
      {
        id: 'libraries',
        title: '第三方库与生态',
        sub: '从工具库到框架，掌握 Java 最有价值的生态',
        blocks: [
          { t: 'h2', x: '核心工具库' },
          { t: 'defs', x: [
            { term: 'Google Guava', desc: 'Google 出品的核心库扩展：不可变集合（ImmutableList）、新集合类型（Multimap、BiMap、Table）、缓存（CacheBuilder）、字符串工具（Strings、Splitter、Joiner）、函数式工具（Optional、Function、Predicate）。' },
            { term: 'Apache Commons', desc: 'Apache 旗下系列工具库：Lang3（字符串、数字、反射）、Collections4（集合扩展）、IO（文件/流操作）、Codec（编码解码）、CSV（CSV 解析）、Math3（数学计算）。' },
            { term: 'Lombok', desc: '通过注解消除样板代码：@Data（自动生成 getter/setter/equals/hashCode/toString）、@Builder（建造者模式）、@Slf4j（日志）、@NoArgsConstructor/@AllArgsConstructor、@SneakyThrows。编译期注解处理器，运行时零依赖。' },
            { term: 'MapStruct', desc: '编译期生成类型安全的 Bean 映射代码，比反射的 BeanUtils 快 10 倍以上。@Mapper 注解定义映射接口，自动生成实现类。' }
          ]},
          { t: 'code', lang: 'java', title: 'Lombok 示例', run: false,
            code: [
              'import lombok.Data;',
              'import lombok.Builder;',
              'import lombok.extern.slf4j.Slf4j;',
              '',
              '@Data',
              '@Builder',
              '@Slf4j',
              'public class User {',
              '    private Long id;',
              '    private String name;',
              '    private String email;',
              '',
              '    public void save() {',
              '        log.info("Saving user: {}", this.name);',
              '    }',
              '}',
              '',
              '// 使用',
              'User user = User.builder()',
              '    .id(1L).name("Alice").email("alice@example.com")',
              '    .build();'
            ]},
          { t: 'h2', x: 'JSON 处理' },
          { t: 'defs', x: [
            { term: 'Jackson', desc: 'Java JSON 处理事实标准，Spring Boot 默认。ObjectMapper 序列化/反序列化，支持流式（Streaming API）、树模型（Tree Model）、数据绑定（Data Binding）。性能优秀，生态完善。' },
            { term: 'Gson', desc: 'Google 出品的 JSON 库，API 简洁，对泛型和自定义序列化支持好。toJson/fromJson 一行搞定。' },
            { term: 'Fastjson', desc: '阿里出品，性能极强，但历史上有多个安全漏洞，生产环境需谨慎。Fastjson2 是重写版本。' },
            { term: 'JSON-B', desc: 'Java EE 标准 JSON 绑定 API（JSR-367），Eclipse Yasson 是参考实现。' }
          ]},
          { t: 'code', lang: 'java', title: 'Jackson 常用操作', run: false,
            code: [
              'ObjectMapper mapper = new ObjectMapper();',
              '',
              '// 对象 → JSON',
              'String json = mapper.writeValueAsString(user);',
              '',
              '// JSON → 对象',
              'User user = mapper.readValue(json, User.class);',
              '',
              '// JSON → List<User>',
              'List<User> users = mapper.readValue(json,',
              '    new TypeReference<List<User>>() {});',
              '',
              '// 配置：忽略未知字段',
              'mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);'
            ]},
          { t: 'h2', x: 'Web 框架' },
          { t: 'defs', x: [
            { term: 'Spring Boot', desc: 'Java Web 开发绝对主流。约定优于配置，内嵌 Tomcat/Jetty/Undertow，自动配置（Auto-Configuration），Starter 依赖一站式整合。Spring Initializr 一键生成项目。' },
            { term: 'Spring Framework', desc: 'Spring Boot 的底层核心：IoC 容器、AOP、事务管理、JDBC 模板、统一抽象。理解 Spring 核心才能用好 Spring Boot。' },
            { term: 'Jakarta EE', desc: '原 Java EE，Eclipse 管理。企业级规范集合：Servlet、JPA、CDI、EJB、JAX-RS、Bean Validation。应用服务器：WildFly、GlassFish、Payara、WebLogic。' },
            { term: 'Micronaut', desc: '现代云原生框架，启动快、内存低（编译时依赖注入，无反射）。支持 AOT 编译为原生镜像。适合 Serverless 和微服务。' },
            { term: 'Quarkus', desc: 'Red Hat 出品的云原生 Java 框架，Supersonic Subatomic Java。GraalVM 原生镜像支持，启动毫秒级，内存几十 MB。' },
            { term: 'Vert.x', desc: '响应式、事件驱动、非阻塞的工具包，类似 Node.js 但在 JVM 上。Polyglot，支持多种语言。' }
          ]},
          { t: 'code', lang: 'java', title: 'Spring Boot 最小 REST API', run: false,
            code: [
              '@SpringBootApplication',
              'public class Application {',
              '    public static void main(String[] args) {',
              '        SpringApplication.run(Application.class, args);',
              '    }',
              '}',
              '',
              '@RestController',
              '@RequestMapping("/api/users")',
              'class UserController {',
              '    @GetMapping("/{id}")',
              '    public User getUser(@PathVariable Long id) {',
              '        return new User(id, "Alice");',
              '    }',
              '',
              '    @PostMapping',
              '    public User createUser(@RequestBody User user) {',
              '        return user;',
              '    }',
              '}'
            ]},
          { t: 'h2', x: '数据访问' },
          { t: 'defs', x: [
            { term: 'JPA / Hibernate', desc: 'Java 持久化标准（JPA）+ 最流行实现（Hibernate）。ORM 映射，@Entity、@Table、@Id、@OneToMany、@ManyToMany。Spring Data JPA 提供 Repository 抽象，方法名自动生成查询。' },
            { term: 'MyBatis', desc: '半 ORM 框架，SQL 与 Java 代码分离（XML 或注解）。灵活控制 SQL，性能可控，国内互联网公司广泛使用。MyBatis-Plus 提供增强。' },
            { term: 'JOOQ', desc: '类型安全的 SQL 构建器，用 Java 代码写 SQL，编译期检查。支持代码生成，根据数据库表生成 Java 类。' },
            { term: 'Spring Data', desc: '统一数据访问抽象：Spring Data JPA、Spring Data MongoDB、Spring Data Redis、Spring Data Elasticsearch。Repository 接口 + 方法名查询。' },
            { term: 'Flyway / Liquibase', desc: '数据库版本迁移工具。Flyway 用 SQL 脚本，Liquibase 用 XML/YAML/JSON 变更集。CI/CD 中自动执行迁移。' },
            { term: 'HikariCP', desc: '性能最好的 JDBC 连接池，Spring Boot 默认。"零开销"设计，字节码级优化。' }
          ]},
          { t: 'code', lang: 'java', title: 'Spring Data JPA Repository', run: false,
            code: [
              'public interface UserRepository extends JpaRepository<User, Long> {',
              '    // 方法名自动生成查询',
              '    Optional<User> findByEmail(String email);',
              '    List<User> findByAgeGreaterThan(int age);',
              '    Page<User> findByActiveTrue(Pageable pageable);',
              '',
              '    // @Query 自定义 JPQL',
              '    @Query("SELECT u FROM User u WHERE u.name LIKE %:keyword%")',
              '    List<User> search(@Param("keyword") String keyword);',
              '}',
              '',
              '// 使用',
              '@Service',
              'class UserService {',
              '    private final UserRepository repo;',
              '    public UserService(UserRepository repo) { this.repo = repo; }',
              '    public User findByEmail(String email) {',
              '        return repo.findByEmail(email).orElseThrow();',
              '    }',
              '}'
            ]},
          { t: 'h2', x: '测试生态' },
          { t: 'defs', x: [
            { term: 'JUnit 5', desc: 'Java 测试框架标准。@Test、@BeforeEach、@AfterEach、@BeforeAll、@AfterAll、@DisplayName、@ParameterizedTest、@Nested。架构：JUnit Platform + Jupiter + Vintage。' },
            { term: 'Mockito', desc: '最流行的 Mock 框架。@Mock、@InjectMocks、when().thenReturn()、verify()、@Spy。模拟外部依赖，隔离测试。' },
            { term: 'AssertJ', desc: '流式断言库，比 JUnit 原生断言更可读。assertThat(user).isNotNull().hasFieldOrPropertyWithValue("name", "Alice")。' },
            { term: 'TestContainers', desc: '用 Docker 容器做集成测试：MySQL、PostgreSQL、Redis、Kafka、Elasticsearch。测试环境与生产一致，用完即销毁。' },
            { term: 'WireMock', desc: 'HTTP API Mock 服务器，模拟外部 REST 服务。支持请求匹配、响应模板、故障注入。' },
            { term: 'RestAssured', desc: 'REST API 测试 DSL，given-when-then 风格。given().param("key", "value").when().get("/api").then().statusCode(200)。' }
          ]},
          { t: 'code', lang: 'java', title: 'JUnit 5 + Mockito + AssertJ', run: false,
            code: [
              '@ExtendWith(MockitoExtension.class)',
              'class UserServiceTest {',
              '    @Mock UserRepository repo;',
              '    @InjectMocks UserService service;',
              '',
              '    @Test',
              '    @DisplayName("按邮箱查找用户成功")',
              '    void findByEmail_shouldReturnUser() {',
              '        User alice = new User(1L, "Alice", "alice@test.com");',
              '        when(repo.findByEmail("alice@test.com"))',
              '            .thenReturn(Optional.of(alice));',
              '',
              '        User result = service.findByEmail("alice@test.com");',
              '',
              '        assertThat(result).isNotNull();',
              '        assertThat(result.getName()).isEqualTo("Alice");',
              '        verify(repo).findByEmail("alice@test.com");',
              '    }',
              '}'
            ]},
          { t: 'h2', x: '并发与响应式' },
          { t: 'defs', x: [
            { term: 'Reactor', desc: 'Spring 生态的响应式编程库，实现 Reactive Streams 规范。Mono（0/1 元素）、Flux（0/N 元素）。操作符：map、flatMap、filter、zip、merge、retry、backpressure。' },
            { term: 'RxJava', desc: 'ReactiveX 的 JVM 实现，历史最悠久。Observable、Flowable、Single、Maybe、Completable。Android 开发广泛使用。' },
            { term: 'CompletableFuture', desc: 'JDK 8+ 自带的异步编程 API。supplyAsync、thenApply、thenCompose、thenCombine、allOf、anyOf。比 Future 强大，比 Reactor 轻量。' },
            { term: 'Virtual Threads', desc: 'Java 21+ 正式特性（JEP 444），轻量级线程，百万级并发。同步代码写异步性能，无需响应式框架。Thread.ofVirtual().start(runnable)。' },
            { term: 'Disruptor', desc: 'LMAX 开源的高性能线程间消息传递库，无锁环形缓冲区，吞吐量极高。高频交易系统使用。' }
          ]},
          { t: 'h2', x: '微服务与分布式' },
          { t: 'defs', x: [
            { term: 'Spring Cloud', desc: 'Spring Boot 之上的微服务工具集：服务发现（Eureka/Nacos/Consul）、配置中心（Config/Nacos）、负载均衡（LoadBalancer）、熔断降级（Resilience4j/Sentinel）、网关（Gateway）、链路追踪（Sleuth/Micrometer）。' },
            { term: 'gRPC', desc: 'Google 开源的高性能 RPC 框架，基于 HTTP/2 和 Protocol Buffers。跨语言，双向流，强类型。适合微服务间通信。' },
            { term: 'Apache Kafka', desc: '分布式事件流平台，高吞吐、持久化、可水平扩展。生产者/消费者模型，主题分区，消费者组。日志收集、事件驱动、流处理。' },
            { term: 'RabbitMQ', desc: 'AMQP 协议实现的消息代理，功能丰富：交换机（直连/主题/扇出/头）、队列、路由键、死信队列、延迟队列。适合复杂路由场景。' },
            { term: 'Redis', desc: '内存数据结构存储，用作缓存、会话、排行榜、分布式锁、发布订阅。Java 客户端：Jedis、Lettuce（Spring Boot 默认）、Redisson（功能最丰富）。' },
            { term: 'Resilience4j', desc: '轻量级容错库：CircuitBreaker（熔断）、RateLimiter（限流）、Bulkhead（隔离）、Retry（重试）、TimeLimiter（超时）。比 Hystrix 更现代。' }
          ]},
          { t: 'h2', x: '本章小结' },
          { t: 'ul', x: [
            '工具库：Guava（集合/缓存/字符串）+ Apache Commons（Lang3/IO/CSV）+ Lombok（消除样板）',
            'JSON：Jackson（事实标准）或 Gson（简洁）',
            'Web：Spring Boot（绝对主流）、Quarkus/Micronaut（云原生）、Vert.x（响应式）',
            '数据访问：Spring Data JPA（ORM）、MyBatis（SQL 灵活）、Flyway（版本迁移）',
            '测试：JUnit 5 + Mockito + AssertJ + TestContainers',
            '并发：Reactor/RxJava（响应式）、CompletableFuture（异步）、Virtual Threads（Java 21+）',
            '微服务：Spring Cloud + gRPC + Kafka/RabbitMQ + Redis + Resilience4j'
          ]}
        ]
      },

      /* ==================================================== 13 调试与排错 */
      {
        id: 'debugging',
        title: '调试与排错',
        sub: '分清编译期和运行期错误，读懂异常栈，学会插桩与断言',
        blocks: [
          { t: 'p', x: 'Java 的错误分两类：**编译期错误**和**运行期异常**。编译期错误是 `javac` 在编译时拦住的——代码根本没跑起来，红色提示里写着 `error:` 和行号，改完重新编译就行。运行期异常是程序跑起来之后才炸的，JVM 会打印一长串 `Exception in thread ...`，这叫**异常栈追踪（stack trace）**。' },
          { t: 'p', x: '读异常栈的方法和 Python 类似：**从下往上读**。最下面一行是异常类型和消息（比如 `java.lang.NullPointerException: Cannot invoke "String.length()" because "s" is null`），往上找包含你自己类名和行号的那一行，那就是出错的具体位置。中间那些 `at java.base/...` 是 JDK 内部调用，一般跳过。' },

          { t: 'h2', x: '常见的坑' },
          { t: 'table', head: ['报错或现象', '原因', '处理办法'], rows: [
            ['`error: cannot find symbol`', '用了没定义的变量、方法或类，或拼写错了、没 import', '检查拼写、确认变量已声明、需要的类有没有 import'],
            ['`error: incompatible types: int cannot be converted to String`', '把一种类型的值赋给了另一种类型的变量', '强转或用正确的类型，比如 `String.valueOf(num)`'],
            ['`error: \';\' expected`', '某行末尾漏了分号，或大括号没配对', '检查报错行及上一行的分号和大括号配对'],
            ['`error: method does not override or implement a method from a supertype`', '写了 @Override 但父类/接口里没有这个方法（通常是参数类型或方法名拼错了）', '核对父类方法签名，确认方法名和参数类型完全一致'],
            ['`Exception in thread "main" java.lang.NullPointerException`', '调用了 null 对象的方法或字段，对象没初始化就用了', '在调用前判断对象是否为 null，或用 `Objects.requireNonNull()` 提前拦截'],
            ['`java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5`', '数组下标越界，长度 5 的数组有效下标是 0~4', '检查循环边界，用 `arr.length` 确认长度，遍历时优先用增强 for'],
            ['`java.lang.ClassCastException: class java.lang.Integer cannot be cast to class java.lang.String`', '把对象强转成了它实际不是的类型', '强转前用 `instanceof` 判断，或用泛型从源头避免'],
            ['`java.lang.ArithmeticException: / by zero`', '整数除法中除数为 0', '除法前判断除数是否为 0，或用 try/catch 处理']
          ]},

          { t: 'h2', x: '调试手段' },
          { t: 'p', x: '下面三种手段覆盖日常调试的绝大多数场景。' },

          { t: 'code', lang: 'java', title: '手段一：System.out.println 插桩', run: false, ed: false,
            code: [
              'public class Main {',
              '    public static int findMax(int[] nums) {',
              '        // 可疑点：先打印输入，确认数据和你想的一样',
              '        System.out.println("调试：nums 长度 = " + nums.length);',
              '        int max = nums[0]; // 如果数组为空，这行会 ArrayIndexOutOfBoundsException',
              '        for (int i = 0; i < nums.length; i++) {',
              '            System.out.println("调试：正在比较 nums[" + i + "] = " + nums[i]);',
              '            if (nums[i] > max) {',
              '                max = nums[i];',
              '            }',
              '        }',
              '        return max;',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        int[] data = {3, 7, 2, 9, 1};',
              '        System.out.println("最大值 = " + findMax(data));',
              '    }',
              '}'
            ],
            note: 'println 插桩是最快的定位手段：在可疑处把变量打出来，看它和你预期的是否一致。定位完记得删掉或注释掉调试用的输出。' },

          { t: 'code', lang: 'java', title: '手段二：assert 关键字——提前拦住非法状态', run: false, ed: false,
            code: [
              'public class Main {',
              '    public static double average(int[] scores) {',
              '        // 断言：数组不能为 null',
              '        assert scores != null : "scores 不能为 null";',
              '        // 断言：数组不能为空',
              '        assert scores.length > 0 : "scores 不能为空数组";',
              '',
              '        int sum = 0;',
              '        for (int s : scores) {',
              '            sum += s;',
              '        }',
              '        return (double) sum / scores.length;',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        int[] data = {80, 90, 85};',
              '        System.out.println("平均分 = " + average(data));',
              '',
              '        // 这行会触发 AssertionError（需要用 java -ea 开启断言）',
              '        // average(null);',
              '    }',
              '}'
            ],
            note: 'Java 的 assert 默认是关闭的，需要加 `-ea` 参数运行才会生效（`java -ea Main`）。断言用来检查「程序运行到这里必须满足的条件」，不满足就立刻抛 AssertionError。注意别用 assert 做必须执行的参数校验——因为生产环境可能不开断言。' },

          { t: 'code', lang: 'java', title: '手段三：Objects.requireNonNull——防御空指针', run: false, ed: false,
            code: [
              'import java.util.Objects;',
              '',
              'public class Main {',
              '    static class User {',
              '        private final String name;',
              '',
              '        public User(String name) {',
              '            // 在构造时就拦住 null，而不是等后面调用 name.length() 才炸',
              '            this.name = Objects.requireNonNull(name, "用户名不能为 null");',
              '        }',
              '',
              '        public int nameLength() {',
              '            // 到这里 name 一定非空，不用再判断',
              '            return name.length();',
              '        }',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        User u = new User("小明");',
              '        System.out.println("名字长度 = " + u.nameLength());',
              '',
              '        // new User(null); // 会在构造时就抛 NullPointerException，带自定义消息',
              '    }',
              '}'
            ],
            note: '`Objects.requireNonNull(obj, "消息")` 在 obj 为 null 时立刻抛 NullPointerException 并带上你写的消息。把它放在构造方法或方法入口处，能让错误在最早的位置暴露，而不是等后面某个地方调用了 null 的方法才炸——那时候已经很难追溯 null 是从哪来的。' },

          { t: 'note', k: 'tip', title: '编译期错误 vs 运行期异常，处理方式不同',
            x: '编译期错误（`error:` 开头）是编译器帮你拦的，改完重新 `javac` 就行，这类错误越多说明编译器越尽职。运行期异常（`Exception in thread` 开头）是程序跑起来才炸的，需要读异常栈定位。新手常见误区：把编译期错误当成「程序崩了」，其实程序根本没跑起来——先把编译错误全部修完，再谈运行期调试。' },

          { t: 'note', k: 'warn', title: '别吞掉异常',
            x: '写 `try { ... } catch (Exception e) {}` 空 catch 块是最危险的调试杀手——异常被你静默吞掉了，程序继续跑，但数据已经错了，后面炸的时候你根本找不到原因。至少要 `e.printStackTrace()` 把异常栈打出来，或者用日志框架记录。空 catch 等于把火灾报警器的电池拔了。' },

          { t: 'think', q: '程序报了 `NullPointerException`，你会按什么步骤排查？', ans: '第一步：读异常栈最下面一行，看异常消息——新版 JDK 会告诉你哪个变量是 null（比如 `Cannot invoke "String.length()" because "s" is null`）。第二步：往上找自己类名和行号，定位到具体哪一行。第三步：分析这一行里哪个对象可能为 null——通常是方法返回了 null、数组元素没初始化、或者从集合里 get 了不存在的键。第四步：在那一行之前加 `System.out.println()` 打印可疑变量，或用 `Objects.requireNonNull()` 在更早的位置拦截。第五步：修复后考虑加 null 检查或使用 Optional 来防御。' },
          { t: 'think', q: '为什么说编译期错误是「好事」？它和运行期异常哪个更可怕？', ans: '编译期错误是编译器在代码跑起来之前就帮你拦住的问题，你改完重新编译就行，**用户永远看不到**。运行期异常是程序已经发布、用户正在用的时候才炸的，这时候影响的是真实用户，排查也更难（你需要复现用户的操作环境）。所以编译期错误越多，说明编译器在帮你把关——Java 强类型的价值就在这里：很多在动态语言里要到运行时才炸的错误，在 Java 里编译期就拦住了。真正可怕的是那些编译通过、但在特定输入下才触发的运行期异常。' },

          { t: 'kp', x: [
            '错误分两类：编译期 error（改完重编译）和运行期 Exception（读异常栈）',
            '异常栈从下往上读：最后一行是异常类型，往上找自己代码的行号',
            '常见报错：cannot find symbol / NullPointerException / ArrayIndexOutOfBoundsException',
            '调试手段：println 插桩 / assert 断言（需 -ea 开启）/ Objects.requireNonNull',
            '别写空 catch 块吞异常，至少 printStackTrace 或用日志记录'
          ]},
        ]
      },

      /* ==================================================== 12 综合实战 */
      {
        id: 'projects',
        title: '综合实战',
        sub: '学生成绩管理系统 + 极简计算器，串起全套语法',
        blocks: [
          { t: 'h2', x: '实战一：学生成绩管理',
            sub: '用类、集合、方法、格式化输出做一个小系统' },
          { t: 'p', x: '这个例子把前面学的**类与字段、ArrayList、方法、循环、格式化输出**串起来：每个学生有名字和若干成绩，能算总分、平均分、评级。所有数据在 `main` 里固定构造，保证在线环境点「运行」就能看到确定的报告。' },

          { t: 'code', lang: 'java', title: '学生成绩报告', run: true, ed: true,
            code: [
              'import java.util.ArrayList;',
              'import java.util.List;',
              '',
              'public class Main {',
              '    static class Student {',
              '        String name;',
              '        List<Integer> scores = new ArrayList<>();',
              '        Student(String name) { this.name = name; }',
              '        void add(int s) { scores.add(s); }',
              '        int total() {',
              '            int t = 0;',
              '            for (int s : scores) t += s;',
              '            return t;',
              '        }',
              '        double average() {',
              '            return scores.isEmpty() ? 0 : (double) total() / scores.size();',
              '        }',
              '        String level() {',
              '            double a = average();',
              '            if (a >= 90) return "A";',
              '            if (a >= 80) return "B";',
              '            if (a >= 70) return "C";',
              '            if (a >= 60) return "D";',
              '            return "F";',
              '        }',
              '    }',
              '',
              '    public static void main(String[] args) {',
              '        Student[] students = { new Student("Alice"), new Student("Bob"), new Student("Charlie") };',
              '        students[0].add(95); students[0].add(88);',
              '        students[1].add(72); students[1].add(68);',
              '        students[2].add(55); students[2].add(49);',
              '',
              '        System.out.println("=== 学生成绩报告 ===");',
              '        for (Student s : students) {',
              '            System.out.printf("%s：总分 %d，平均 %.1f，等级 %s%n",',
              '                    s.name, s.total(), s.average(), s.level());',
              '        }',
              '    }',
              '}'
            ],
            expect: '=== 学生成绩报告 ===\nAlice：总分 183，平均 91.5，等级 A\nBob：总分 140，平均 70.0，等级 C\nCharlie：总分 104，平均 52.0，等级 F' },

          { t: 'note', k: 'tip', title: '怎样把它变成真正可交互的程序',
            x: '在线环境无法读键盘，所以成绩是写死的。你可以把 `Student[]` 换成 `List<Student>`，用 `Scanner` 在 `while` 循环里让用户输入名字和分数，再存进列表——这就成了完整的小管理系统。结构完全不用变，只是数据来源从「常量」换成「输入」。' },

          { t: 'h2', x: '实战二：极简四则计算器' },
          { t: 'p', x: '第二个例子练 **方法封装与格式化输出**。把加减乘除四个运算直接打印出来，逻辑清清楚楚。如果你想进阶，可以把它改成「读入表达式再解析」——那会涉及字符串切分和栈，是很好的下一步挑战。' },

          { t: 'code', lang: 'java', title: '四则运算演示', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        double x = 12.0, y = 4.0;',
              '        System.out.printf("%.1f + %.1f = %.1f%n", x, y, x + y);',
              '        System.out.printf("%.1f - %.1f = %.1f%n", x, y, x - y);',
              '        System.out.printf("%.1f * %.1f = %.1f%n", x, y, x * y);',
              '        System.out.printf("%.1f / %.1f = %.1f%n", x, y, x / y);',
              '    }',
              '}'
            ],
            expect: '12.0 + 4.0 = 16.0\n12.0 - 4.0 = 8.0\n12.0 * 4.0 = 48.0\n12.0 / 4.0 = 3.0' },

          { t: 'h3', x: '进阶：用 Map + lambda 组织运算' },
          { t: 'p', x: '如果想「按符号查运算」，可以用 `Map<Character, BiFunction>` 把运算符和逻辑关联起来。不过 HashMap 的遍历顺序不保证，下面的例子用固定顺序逐个打印，确保输出确定。' },

          { t: 'code', lang: 'java', title: '运算符即数据', run: true,
            code: [
              'import java.util.function.BiFunction;',
              '',
              'public class Main {',
              '    public static void main(String[] args) {',
              '        BiFunction<Double, Double, Double> add = (a, b) -> a + b;',
              '        BiFunction<Double, Double, Double> sub = (a, b) -> a - b;',
              '        BiFunction<Double, Double, Double> mul = (a, b) -> a * b;',
              '        BiFunction<Double, Double, Double> div = (a, b) -> a / b;',
              '',
              '        double x = 12.0, y = 4.0;',
              '        System.out.println("add: " + add.apply(x, y));',
              '        System.out.println("sub: " + sub.apply(x, y));',
              '        System.out.println("mul: " + mul.apply(x, y));',
              '        System.out.println("div: " + div.apply(x, y));',
              '    }',
              '}'
            ],
            expect: 'add: 16.0\nsub: 8.0\nmul: 48.0\ndiv: 3.0' },

          { t: 'note', k: 'info', title: 'lambda 让「运算」变成可传递的值',
            x: '`(a, b) -> a + b` 把「加法」本身封装成一个对象，可以存进变量、传进方法、放进集合。这正呼应了现代特性章讲的「行为作为参数」。计算器、策略模式、排序比较器，背后都是同一个思想。' },

          { t: 'h2', x: '还能继续练什么' },
          { t: 'ul', x: [
            '**猜数字游戏**：用 `Random` 生成谜底，循环读用户输入并提示大小，用到循环、分支、异常',
            '**通讯录**：用 `HashMap<String, String>` 存「名字→电话」，练习增删查',
            '**词频统计**：读一段文本，用 `HashMap` 统计每个词出现次数，练 Stream 的 `groupingBy`',
            '**文件读写**：用 `Files.readAllLines` / `Files.write`，练 try-with-resources'
          ]},

          { t: 'kp', x: [
            '实战把类、集合、方法、循环、格式化串在一起',
            '数据可固定写在 main 里，也可换成 Scanner 交互输入',
            'lambda 让「运算/行为」成为可传递的值',
            'HashMap 遍历顺序不定，需要确定顺序就用 TreeMap/LinkedHashMap',
            '下一步可挑战：猜数字、通讯录、词频统计、文件读写'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '计算一组成绩的平均分，注意要保留小数。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        int[] scores = {80, 90, 100};',
              '        int sum = 0;',
              '        for (int s : scores) sum += s;',
              '        double avg = (double) sum / scores.length;',
              '        System.out.printf("平均分: %.1f%n", avg);',
              '    }',
              '}'
            ],
          expect: '平均分: 90.0', hint: '整数相除会截断，要先转 double。', ans: '先累加 sum，`(double) sum / scores.length` 先把 sum 转成 double 再除，结果才是小数（否则整数除法会得 90）。printf %.1f 保留一位小数输出 90.0。' },
          { t: 'think', q: '上题里为什么要写 (double) sum / scores.length？直接 sum / scores.length 会怎样？', ans: 'sum 和 length 都是 int，直接相除会触发**整数除法**，小数被截断（这里正好整除得 90，但换成 80、90、91 就会丢掉小数）。先把一个操作数强转成 double，整个除法才按浮点算。' },
          { t: 'think', q: '把示例里写死的数据换成 Scanner 交互输入，类和方法的结构需要大改吗？', ans: '基本不用。把成绩从「数组里写死」改成「在 while 循环里读 Scanner、再 add 进列表」即可，total()、average()、level() 这些方法一行都不用动。这正体现了封装的好处。' },
        ]
      },

      /* ==================================================== 13 速查总结 */
      {
        id: 'cheatsheet',
        title: '速查总结',
        sub: '一页纸回顾 Java 的核心语法与易错点',
        blocks: [
          { t: 'h2', x: '程序骨架速记' },
          { t: 'table',
            head: ['目的', '写法'],
            rows: [
              ['公开类', '`public class Main { ... }`（类名=文件名）'],
              ['入口', '`public static void main(String[] args) { ... }`'],
              ['输出换行', '`System.out.println(...)`'],
              ['输出不换行', '`System.out.print(...)`'],
              ['格式化输出', '`System.out.printf("%.2f%n", x)`'],
              ['读输入', '`new Scanner(System.in)`（在线环境用固定数据代替）']
            ]},

          { t: 'h2', x: '八种基本类型' },
          { t: 'table',
            head: ['整数', '小数', '字符', '布尔'],
            rows: [
              ['`byte` `short` `int` `long`', '`float` `double`', '`char`', '`boolean`']
            ]},

          { t: 'h2', x: '流程控制速记' },
          { t: 'table',
            head: ['结构', '写法要点'],
            rows: [
              ['`if / else`', '条件必须 boolean；阶梯从上往下匹配'],
              ['`for (i; cond; step)`', '三段式，最通用'],
              ['`for (x : 集合)`', '增强 for，专用于遍历'],
              ['`while / do-while`', '先判后跑 / 至少跑一次'],
              ['`switch` 语句', '每个 case 记得 `break`，否则贯穿'],
              ['`switch` 表达式', '`case x -> 值`，无需 break，整体是值']
            ]},

          { t: 'h2', x: '集合速记' },
          { t: 'table',
            head: ['接口', '实现', '记忆点'],
            rows: [
              ['`List`', '`ArrayList`', '有序可重复，按索引'],
              ['`Set`', '`HashSet`', '去重，判断成员'],
              ['`Map`', '`HashMap`', '键值对，按键查'],
              ['流式', '`stream().filter().map().collect()`', '声明式处理']
            ]},

          { t: 'h2', x: '面向对象三件套' },
          { t: 'defs', x: [
            { term: '封装', desc: 'private 字段 + getter/setter，隐藏细节、受控访问。' },
            { term: '继承', desc: 'extends 复用父类代码，super() 调父类构造。单继承。' },
            { term: '多态', desc: '父类/接口引用指向子类对象，运行时调真实实现。' },
            { term: '抽象类', desc: 'abstract 方法只有声明，强制子类补全；抽共性。' },
            { term: '接口', desc: 'implements 承诺能力；一个类可实现多个；定规范。' }
          ]},

          { t: 'h2', x: '异常速记' },
          { t: 'ul', x: [
            '`try { ... } catch (具体 e) { ... } finally { ... }`',
            '`catch` 从具体到宽泛排列，命中即停',
            '`throw new X()` 主动抛；方法签名 `throws` 上交责任',
            '`try (资源) { ... }` 自动关闭 AutoCloseable',
            'RuntimeException 可不捕获；其他 Exception 编译期强制'
          ]},

          { t: 'h2', x: '现代特性一句话' },
          { t: 'ul', x: [
            '`var x = ...` 局部变量类型推断（Java 10）',
            '`record Point(int x, int y) {}` 一行数据类（Java 16）',
            '`"""..."""` 文本块写多行字符串（Java 15）',
            '`sealed interface X permits A, B` 受限继承（Java 17）',
            '`switch (o) { case Integer i -> ... }` 表达式 + 类型模式（Java 21）'
          ]},

          { t: 'h2', x: '把全套语法串起来看一眼' },
          { t: 'code', lang: 'java', title: '核心语法回顾', run: true, ed: true,
            code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        // record + var + List + Stream + 方法引用，一行串起多个特性',
              '        record User(String name, int age) {}',
              '        var users = java.util.List.of(new User("Alice", 30), new User("Bob", 17));',
              '        users.stream()',
              '             .filter(u -> u.age() >= 18)',
              '             .forEach(u -> System.out.println(u.name() + " 已成年"));',
              '    }',
              '}'
            ],
            expect: 'Alice 已成年' },

          { t: 'note', k: 'tip', title: '学完之后怎么进阶',
            x: '你已经掌握了 Java 的骨架：语法、类型、流程、集合、面向对象、异常、现代特性。下一步建议深入：泛型与通配符、注解（annotation）、反射、并发（Thread / 线程池）、以及 Spring 框架。每一块都建立在你今天打下的基础上。' },

          { t: 'kp', x: [
            '骨架：类 + main；输出用 System.out.println/printf',
            '类型：8 种基本 + 引用（String/类/数组/集合）',
            '控制：if/for/while/switch，现代 switch 是表达式',
            '集合：ArrayList/HashMap + Stream',
            'OOP：封装/继承/多态 + 接口/抽象类',
            '异常：try-catch-finally + try-with-resources',
            '现代：var / record / 文本块 / sealed / 模式匹配'
          ]},
          { t: 'h2', x: '本章练习' },
          { t: 'ex', q: '根据速查表：用 printf 把 3.14159 保留两位小数输出。', lang: 'java', code: [
              'public class Main {',
              '    public static void main(String[] args) {',
              '        double pi = 3.14159;',
              '        System.out.printf("%.2f%n", pi);',
              '    }',
              '}'
            ],
          expect: '3.14', hint: '格式串 %.2f。', ans: '`System.out.printf("%.2f%n", pi)`：%.2f 表示浮点数保留两位小数，%n 换行，所以输出 3.14。' },
          { t: 'think', q: '速查表里，遍历一个 List 的每个元素用哪种 for？', ans: '用**增强 for**：`for (元素类型 x : list) { ... }`。它直接取出每个元素，不用管索引。需要索引时才用传统三段式 for。' },
          { t: 'think', q: '速查表里，把 int 转成 String 有哪几种写法？哪种最推荐？', ans: '三种常见写法：`String.valueOf(n)`、`Integer.toString(n)`、`n + ""`。最推荐 `String.valueOf(n)`——它语义最清晰，而且当 n 是 null 时返回 "null" 而不是抛异常。`n + ""` 虽然写法最短，但会创建多余的 StringBuilder 对象，性能略差，可读性也不如前两种。反向把 String 转 int 用 `Integer.parseInt(s)`，注意它会抛 NumberFormatException。' },
        ]
      }

    ]
  });

})(window);
