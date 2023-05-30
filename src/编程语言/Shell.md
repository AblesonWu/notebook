### 基本概念

## 僵尸进程

在Linux系统中，存在父子进程的情况，当出现父进程结束而子进程任然停留在进程中的现象称为 **僵尸进程**。

> ### 如何查看僵尸进程

1. 使用 `top` 命令，其中zombie数量即表示僵尸进程的 数量

2. 使用 `ps aux` 其中 `STAT` 栏表示进程状态，为 `Z` 表示为僵尸进程

   ```shell
   $ ps aux |grep defunct |grep -v grep|wc -l
   
   $ ps -e -o ppid,stat |grep Z
   ```

> ### 如何杀死僵尸进程

直接使用 `kill` 是停止不掉僵尸进程的，可以通过 `kill` 掉其父进程，然后僵尸进程会被系统自动清理掉

```sh
$ ps -e -o ppid,stat |grep Z |cut -d" " -f2 |xargs kill -9

$ kill -HUP `ps -A -o stat,ppid |grep -e '^[Zz]' |awk '{print $2}'`
```



## 1. 数据结构

Shell可以使用数组变量来保存数据，其基本操作与Python的列表类似；同时，Shell中也有类似Python中字典的数据类型，称为关联数组

### 数组

```shell
# 1. 定义一个数组
array_var=(test1 test2 test3 test4)

# 获取数组的长度
echo ${#array_var[*]}
echo ${#array_var[@]}

# 2. 获取数组元素 
# 数组索引： 数组下标是从0开始的
# 返回第一个数组元素
echo ${array_var[0]}  

# 返回最后一个数组元素
echo array_var[$((${#array_var[*]} - 1))]

# 返回所有数组元素
echo ${array_var[*]}

# 3. 删除数组元素
# 删除第一个数组元素
unset array_var[0]  
# 删除最后一个数组元素
unset array_var[$((${#array_var[*]} - 1))] 

# 4.增加数组元素
# 类似与python的 list.append
array_var[${#array_var[*]}]=100

# 5. 获取数组的键值
# 数组的键值是一组0到数组长度的序列
echo ${!array_var[*]}

# 6. 数组循环
for i in ${array[@]}; do
	num=$i
done

for i in $(seq 0 ${#array[@]}); do
	num=${array[$i]}
done

for (( i=0; i <${#array[@]}; i++)); do
	echo ${array[i]}
done
```

使用 `unset` 虽然删除了变量，但是当使用索引时发现值为空。

数组的兼容性比较低，所以在实际应用中尽量少用

### 关联数组

关联数组的形式和Python中的字典类似。



```shell
# 1. 声明一个关联数组
declare -A fruits_value

# 2. 给关联数组添加值
fruits_value=([apple]='100 dollars' [orange]='150 dollars')
fruits_value[banana]='120 dollars'

# 3. 获取关联数组的值
echo ${fruits_value[apple]}

# 4. 获取数组的所有键值
echo ${!fruits_value[*]}
```

## 2. 条件判断

### if-then-else

shell的if 语句会运行if 后面的那个命令。如果该命令的退出状态码是0 （该命令成功运行），位于then 部分的命令就会被执行。如果该命令的退出状态码是其他值， then 部分的命令就不会被执行，bash shell会继续执行脚本中的下一个命令。fi 语句用来表示if-then 语句到此结束



### for loop

使用方式一：

```shell
#!/bin/bash
sum=0
for ((i=1; i<=100; i++)); do
	((sum += i))
done
echo "The sum is: $sum"
```

方式二：`for seq`

```shell
#!/bin/bash
sum=0
for i in $(seq 1 100); do
	(( sum += i ))
done
echo "The sum is: $sum"
seq` 也可以加上step， `$(1 100 2)
```

方式三：`{1..10}`

```shell
#!/bin/bash
sum=0
for i in {1..100};do
	((sum += i))
done
echo "The sum is: $sum"
```

## 3.字符串

### 分割字符串

```shell
str="aa,bb,cc,dd"

# 1. 使用 awk
echo $str |awk -F, '{print $1}'

#2. 使用 cut
echo $str |cut -d"," -f1

#3. 替换
arr=(${str//,/ })
echo ${arr[0]}
```

# 常用命令

### 1.`netstat`

获取网络端口状态

```sh
$ netstat -antup
```

### 2. `lsof`

通过端口找到 `PID`, 还可以查找文件进程，具体参考：https://wangchujiang.com/linux-command/c/lsof.html

```sh
$ lsof -i:22
```

### 3. `find`

> #### 语法格式

```
find [路径] [选项] [操作]
```

> **选项参考对照表：**

| 选项                  | 含义                                   |
| --------------------- | -------------------------------------- |
| `-name`               | 根据文件名查找                         |
| `-perm`               | 根据文件权限查找                       |
| `-prune`              | 该选项可以排除某些查找目录             |
| `-user`               | 根据文件属主查找                       |
| `-group`              | 根据文件数组查找                       |
| `-mtime -n|+n`        | 根据文件更改时间查找                   |
| `-nogroup`            | 查找无有效属组的文件                   |
| `-nouser`             | 查找无有效属主的文件                   |
| `-newer file1 !file2` | 查找更改时间比file1新但比file2旧的文件 |
| `-type`               | 按文件类型查找                         |
| `-size -n +n`         | 按文件大小查找                         |
| `-mindepth n`         | 从n级子目录开始搜索                    |
| `-maxdepth n`         | 最多搜索到n级子目录                    |

**示例：**

```
常用选项：
  -name   查找/etc目录下以conf结尾的文件  find /etc -name '*.conf'
  -iname  查找当前目录下文件名为aa的文件，不区分大小写   find . -iname aa
  -user   查找文件属主为hdfs的所有文件    find . -user hdfs
  -group  查找文件属组为yarn的所有文件    find . -group yarn
  -type   
    f   文件    find . -type f
    d   目录    find . -type d
    c   字符设备文件    find . -type c
    b   块设备文件   find . -type b
    l   链接文件    find . -type l
    p   管道文件    find . -type p
  -size
    -n  大小大于n的文件
    +n  大小小于n的文件
    n   大小等于n的文件
      查找/etc目录下小于1000字节的文件  find /etc -size -1000c
      查找/etc目录下大于1M的文件    find /etc -size +1M
      
```

> **操作**

```
-print    打印输出
-exec     对搜索到的文件执行特定的操作，格式为：-exec 'command' {} \;
  例1： 搜索/etc下的文件(非目录),文件名以conf结尾，且大于10k，然后将其删除
      find /etc -type f -name '*.conf' -size +10k -exec rm -f {} \;
  例2： 将/var/log目录下以log结尾的文件，且更改时间在7天以上的删除
      find /var/log -type d -name '*.log' -mtime +7 -exec rm -rf {} \;
  例3： 搜索条件和例1一样，只是不删除，而是将其复制到/root/conf目录下
      find /etc -size +10k -type f  -name '*.conf' -exec cp {} /root/conf/ \;
-ok     和exe功能一样，只是每次操作都会给用户提示
```



> **逻辑运算符**

```
-a      与
-o      或
-not|!  非

例1：查找当前目录下，属主不是hdfs的所有文件
  find . -not -user hdfs  |  find . ! -user hdfs
例2： 查找当前目录下，属主属于hdfs，且大小大于300字节的文件
  find . -type f -a -user hdfs -a -size +300c
例3：查找当前目录下的属主为hdfs或者以xml结尾的普通文件
  find . -type f -a \( -user hdfs -o name '*.xml' \)
```

# 4. `grep`

## 简单概述

> **语法格式：**

第一种格式：`grep [option] [pattern] [file1,file2,,,]`

第二种格式：`command |grep [option] [pattern]`

> **参数：**

| 选项 | 含义                                       |
| ---- | ------------------------------------------ |
| `-v` | 不显示匹配的行信息                         |
| `-i` | 搜索时忽略大小写                           |
| `-n` | 显示行号                                   |
| `-r` | 递归搜索                                   |
| `-E` | 支持扩展正则表达式                         |
| `-F` | 不按正则表达式匹配，按照字符串字面意思匹配 |

## 详细教程

`grep` 是一个用来在文件中搜索内容的工具，但不能替换和删除文件中的内容，如果要实现这些功能，可以使用 `sed` 和 `awk` 命令。`grep` 的强大在于正则表达式，下面简单说一下 grep 的正则表达式和一些常用的用法：

### 格式

```
grep [OPTION]... PATTERN [FILE]..
```

### grep、egrep、fgrep 的关系

- `grep -E` 相当于 `egrep`
- `grep -F` 相当于 `fgrep`
- `grep` 默认支持 `基本的正则表达式 BRE` ( basic regular expression )
- `egrep` 支持 `扩展的正则表达式 ERE` ( extended regular expression )
- `fgrep` 不支持正则表达式

### 基本的正则表达式 BRE

- `.` 表示任意的单个字符
- `[]` 表示括号里的任意一个字符，比如 [0-9] 表示数字，[a-z] 表示小写字母
- `*` 表示 * 前面的字符出现1次或者多次
- `[^]` 表示排除括号内的内容，比如说 [^0-9] 表示非数字的内容
- `^` 表示以 ^ 后面的内容开头
- `$` 表示以 $ 前面的内容结尾
- `\?` 表示 ? 前面的字符出现1次或者0次
- `\{m,n\}` 表示前面的字符最少m次，最多n次
- `\< 或者 \b` 表示以 < 或者 \b 之后的字符做为一个单词的开始
- `\> 或者 \b` 表示以 > 或者 \b 之后的字符做为一个单词的结尾
- `\<\>` 表示以 < 开始和 > 结尾作为一个单词
- `\(\)` 表示反向搜索

### 扩展的正则表达式 ERE

- `.` 表示任意的单个字符
- `[]` 表示括号里的任意一个字符，比如 [0-9] 表示数字，[a-z] 表示小写字母
- `*` 表示 * 前面的字符出现1次或者多次
- `[^]` 表示排除括号内的内容，比如说 [^0-9] 表示非数字的内容
- `^` 表示以 ^ 后面的内容开头
- `$` 表示以 $ 前面的内容结尾
- `?` 表示 ? 前面的字符出现1次或者0次
- `{m,n}` 表示前面的字符最少m次，最多n次
- `\< 或者 \b` 表示以 < 或者 \b 之后的字符做为一个单词的开始
- `\> 或者 \b` 表示以 > 或者 \b 之后的字符做为一个单词的结尾
- `\<\>` 表示以 < 开始和 > 结尾作为一个单词
- `()` 表示分组

```
说明：` 其实 基本的正则表达式 与 扩展的正则表达式 完全有相同的，像 `.`、`*`、`[]`、`[^]`、`^`、`$`、`\<或者\b`、`\>或者\b`，还有一些是也有相同，但是 `基本的正则表达式` 要加 `\` 这个，像 `?`、`{m,n}`、`()
```

### 常用参数

- `-i` 表示不区分大小写
- `-o` 表示只显示匹配的单词
- `-v` 表示显示没有匹配的行
- `-A` 表示显示匹配行的相邻下几行
- `B` 表示显示匹配行的相邻上几行
- `C` 表示显示匹配行的相邻上下几行
- `-n` 表示显示结果所在的行数

### 举例

**1. test.txt 的内容**

```
The old man was thin and gaunt with deep wrinkles in the back of his neck.
The brown blotches of the benevolent skin cancer the sun
this is a 135 test 135.
12456 112125 1111

But none of these scars were fresh.
They were as old as erosions in a fishless desert.

as root my  god
test \abc good ao scars were fresh.
```

**2. 不区分大小写**

```
grep -in 'the' test.txt
```

**3. 显示没有匹配的行**

```
grep -vn '[0-9]' test.txt
```

**4.显示匹配行的相邻下两行**

```
grep -A 2 'test' test.txt
```

`注意：`不能加 `n` 参数

**5. 显示匹配行的相邻上两行**

```
grep -B 2 'test' test.txt
```

**6. 显示匹配行的相邻上下两行**

```
grep -C 2 'test' test.txt
```

**7.显示匹配数字的行**

```
grep -n '[0-9]' test.txt
```

**8.显示1个或者多个 e 的行**

```
grep -n 'e*' test.txt
```

**9.显示以 th开头的单词，并且不区分大小写的行**

```
grep -in '\<th' test.txt
```

**10.显示以 th结尾的单词，并且不区分大小写的行**

```
grep -in 'th\>' test.txt
```

**11.显示以 the 为单词的行**

```
grep -n '\bthe\b' test.txt
```

**12.显示以数字开头的行**

```
grep -n '^[0-9]' test.txt
```

**13.显示以数字结尾的行**

```
grep -n '[0-9]$' test.txt
```

**14.显示d后面跟大于2个e再跟一个p的行**

```
grep -n 'de\{2,\}p' test.txt
```

或者

```
egrep -n 'de{2,}p' test.txt
```

`注意：` 逗号不能有空格

**15.显示 th 后面跟 in 或者 e 的行**

```
grep -E 'th(in|e)' test.txt
```

**16.显示两个 the 包含的字符的行**

```
grep -E '(the).*?\1' test.txt
```

<span style="color:purple">**17.显示 home 目录下所有目录**</span>

```
ls -lh /home | grep '^d'
```

**<span style="color:purple">18.显示 \a 的行</span>**

```
fgrep '\a' test.txt
```

`说明：` fgrep 是把任何的字符都当作普通的字符，如果使用 grep 来搜索，不会匹配 \a ，只会匹配 a



# 5. `sed`

## 简单概述

`sed (Stream Edit)` 流编辑器，对标准输出或文件逐行进行处理。

> **语法格式：**

第一种形式：`stdout | sed [option] "pattern command"`

第二种形式：`sed [option] "pattern command" file`

> **选项：**

| 选项 | 含义                                  |
| ---- | ------------------------------------- |
| `-n` | 只打印模式匹配行                      |
| `-e` | 直接在命令行进行 `sed` 编辑，默认选项 |
| `-f` | 编辑动作保存在文件中，指定文件执行    |
| `-r` | 支持扩展正则表达式                    |
| `-i` | 直接修改文件                          |

> **Pattern用法表：**

| 匹配模式                           | 含义                                    |
|--------------------------------|---------------------------------------|
| `10command`                    | 匹配到第10行                               |
| `$`                            | 匹配最后一行                                |
| `10，20command`                 | 匹配从第10行开始，到第20行结束                     |
| `10，+5command`                 | 匹配从第10行开始，到第16行结束                     |
| `/pattern1/command`            | 匹配到 `pattern1`的行                      |
| `/pattern1/,/pattern2/command` | 匹配到 `pattern1`的行开始，到匹配到 `patern2`的行结束 |
| `10,/pattern1/command`         | 匹配从第10行开始，到匹配到 `pattern1`的行结束         |
| `/pattern1/,10command`         | 匹配到 `pattern1`的行开始，到第10行结束            |

> **命令总结：**

```
查询：
    p   打印
删除：
    d   删除
增加：
    a   匹配到的行后追加内容
    i     匹配到的行前追加内容
    r     将后面指定文件的内容追加到匹配到的行后面
    w     将匹配到的行内容另存到其他文件中
修改：
    s/pattern/string/     查找并替换，查找符合pattern模式的字符串，并将其替换为string
    s/pattern/string/g    g表示替换的全部匹配的内容
    s/pattern/string/ig   全部替换匹配到的内容，忽略大小写
其他编辑命令：
    =     显示行号
```

**示例：**

```sh
# 在第一行前插入一行(insert)
$ sed "1 i This is my monkey" my.txt

# 在最后一行后追加一行(append)
$ sed "$ a This is my monkey" my.txt

# 在匹配的行后追加一行
$ sed "/fish/a This is my monkey" my.txt

# 只显示匹配到的行号
$ sed -n '/\/sbin\/nologin/=' passwd

# 替换匹配到的行
$ sed "/fish/c This is my monkey" my.txt
```

## 详细教程

`grep`、`sed` 和 `awk` 是文本处理的三剑客。`grep` 主要是用于文本的搜索，`sed` 主要用于文本的编辑，`awk` 主要用于文本的格式化处理。

`sed` 是 `stream editor` 的简称，叫做流编辑器。其实 sed 的内容可以写一本书，这一节主要讲一下 `sed` 的基本概念及用法

### sed 基本原理

`sed` 在处理文本的时候是以 `行` 为单位的，如果没有限制范围，sed 会对每一行进行处理。sed 由标准输入读入一行数据放到一个叫做 `模式空间` 的地方来执行脚本，处理后就会把 `模式空间` 的结果输出到标准输出，接着重复上述的动作，直到读完所有数据为止。但是有时我们也想对 `模式空间` 进行操作，这时就需要用到另外一个临时的空间，叫做 `暂存空间`，有专门的指令来操作个 `暂存空间` 的。

### sed 格式

```
sed [option...] [script] [inputfile...]
```

### option 的参数

###### -f 参数

这个 `-f` 主要是把所有脚本放到文件里去执行，用来指定脚本文件的

```
sed -f scriptfile [inputfile...]
```

###### -e 参数

这个 `-e` 参数后面要跟执行的命令，如果要执行多条命令，可以使用多个 `-e`，或者每条命令用 `;` 分隔也可以

```
sed -e 'command_1' -e 'command_2' -e 'command_3' [inputfile...]
```

或者

```
sed -e 'command_1;command_2;command_3' [inputfile...]
```

###### -n 参数

sed 会自动输出所有的行的，不管有没有匹配，但有时我们不想自动输出，或者我们只想输出匹配的，这时 `-n` 就非常有用，这个 `-n` 就可以控制所有的行是否被输出，一般来说， `-n` 都是跟 `p` 参数一起用，用来打印匹配的行

###### -i 参数

如果 `-i` 后面没有跟后缀，那么 `-i` 指定要将sed的输出结果保存到当前编辑的文件中，这个选项会生成一个临时文件，处理完所有命令，就会把临时文件覆盖原文件，并把命令替换为原文件名。如果指定了后缀，这个后缀的文件名会保存原文件的内容，原文件会被新的内容覆盖。

其实除了 `-i` 可以保存结果，也可以用 `重定向` 来保存执行命令的结果。

```
sed -i['.txt']  [script] [inputfile...] #  这个 .txt 可以改为任意的后缀
```

###### -s 参数

默认情况下，如果有多个输入文件，会把所有文件组合成一个文件来操作，如果想单独操作这些文件，可以使用 -s 参数

```
sed -s [script] [inputfile...]
```

###### -r 参数

我们之前在 grep 里讲过有基础正则表达式和扩展正则表达式，这个 -r 参数，就是使用扩展正则表达来匹配。

```
sed -r [script] [inputfile...]
```

### script 参数

我们从上面知道 `sed -e 'command_1;command_2;command_3' [inputfile...]`，`command_1`、`command_2`、`command_3` 就是 script，而这个 command_1 就是由 `选址` + `命令` 组成的，下面分别来说一下选址和命令参数：

###### 选址

什么叫选址呢？简单来说，就是用某种方式来确定某些行的位置。为什么要选址呢？确定了地址范围就可以用 `下面的 script` 执行操作。选址大概有三种方式可以实现：

- 行号：就是一个简单的数字后面加 script命令，例如 1d、5d

- 数字推导公式：

  a. num1`~`num2，表示选择 `num1 + (n*num2)` ，例如： 1~2，表示 选择 1、3、5、7...的奇数行

  b. `选址, +N`，这个选址可以是行号、数字推导公式和正则表达式，表示选择匹配 选址的后几行，例如 `/test/, +2`，表示选中了 test 行再加后面的 `2` 行

- 正则表达式

  a. 关于正则表式的可以看一下之前写的 grep 文章，里面有介绍，sed 的正则跟 grep 的 基本正则表达式是差不多，如果需要使用扩展的正则表式也需要使用 `\` 进行转义

  b. 例如：

  1. `1, /^$/` 表示第一行到空白行之间的所有行
  2. `3, 5` 表示第三行到第五行之间的所有行
  3. `3, 5!` 表示除第三行到第五行之间的所有行
  4. `/test1/, /test2/` 表示匹配 `test1` 到匹配 `test2` 之间的所有行
  5. 还有很多，这里就不一一说了，有兴趣的可以上网查阅相关资料

###### script 的各种命令参数

记得要跟上面的 option 参数区分开，下面是一些常用的参数：

- `[address]s/regexp/replace/`：表示用 replace 替换 regexp，但每一行只替换一次，如果想每一匹配的行全部替换，可以使用 `g`，例如： `s/abc/test/g`，还有可以用 `&` 来替换 regepx的
- `[address]p`：表示打印匹配的行，经常与 option 的 `-n` 一起使用
- `[address]n`：要注意跟 option 的 `-n` 区分开来，这个是表示下一行
- `[address]d`：表示删除
- `[address]i`：要注意跟 option 的 `-i` 区分开来，这个是表示搜索或者其实操作的时候不区分大小写
- `[address]c\要修改的文本`：表示修改匹配行的文本
- `[address]i\要插入的文本`：表示在匹配行前面插入文本
- `[address]a\要添加的文本`：表示在匹配行后面添加文本
- `[address]y/source/dest/`：表示把source的每一个字符串都依次替换为 dest 的每一个字符，source 的字串要跟 dest 的字符一样，注意不能加 g，这个是自动全局替换的
- `[address]{command1;command2}`：表示可以在花括号里可以执行一组命令
- `q`：注意，这个命令的地址部分只能是单行地址而不能用正则表达式。

`说明：` h H g G X 的内容暂时不说，涉及到 `暂存空间` 与 `模式空间` 那块

### inputfile 的说明

如果没有给出 `inputfile` 或者为 `--` ，那么输入文本将从标准输入中取得，可以给多个 `inputfile`，`sed` 将依次从各文件中执行命令

### 举例

###### 测试文本（ `test.txt` ）的内容

```
The old man was thin and gaunt with deep wrinkles in the back of his neck.
The brown blotches of the benevolent skin cancer the sun
 this is a 135 test 135.
124  56 3433 33
    But none of 3 these scars were fresh.
They were as old as erosions in a fishless desert.

as as as as as    as as deeep


1 one test \abc good ao scars were fresh one 1.
asdf jas df hao-test asdf dsafjdasf
h.ao ais js bin
bash
```

###### 删除所有空白行

```
sed -e '/^$/d' test.txt
```

或者

```
sed -e '/./!d' test.txt
```

###### 只显示前三行

```
sed -e '3q' test.txt
```

或者

```
head -3 test.txt
```

###### 显示最后一行

```
sed -e '$!d' test.txt
```

或者

```
sed -n -e '$p' test.txt
```

或者

```
tail -1 test.txt
```

###### 删除偶数行

```
sed -e 'n;d' test.txt
```

或者

```
sed -e '2~2d' test.txt
```

###### 把每一行最前面的 `空格` 和 `制表符` 删除

```
sed -e 's/^[ \t]*//' test.txt
```

###### 只显示包含one这个单词的行

```
sed -n -e '/\<one\>/p' test.txt
```

或者

```
sed -e '/\bone\b/!d' test.txt
```

或者

```
grep '\bone\b' test.txt
```

###### 显示包含 one 的这一行的下一行显示，不包含匹配one这一行

```
sed -n -e '/one/{n;p;}' test.txt
```

###### 显示包含 one 的这一行的下一行，并包含匹配one这一行

```
sed -n -e '/one/, +1p' test.txt
```

###### 显示以单个数字开头的行

```
sed -n -e '/^[0-9]/p' test.txt
```

或者

```
grep '^[0-9]' test.txt
```

###### 显示以一个 one 单词的行到最后的行

```
sed -n -e '/\<one\>/,$p' test.txt
```

###### 显示3行到6行的所有行

```
sed -n -e '3,6p' test.txt
```

或者

```
sed -e '3,6!d' test.txt
```

###### 显示包含one的第一行到包含test的最后一行

```
sed -n -e '/one/, /test/p' test.txt
```

或者

```
sed -e '/one/, /test/!d' test.txt
```

###### 显示包含 old 或者 this 的行

```
sed -n -e '/old\|this/p' test.txt
```

或者

```
grep 'old\|this' test.txt
```

###### 显示第五行

```
sed -n -e '5p' test.txt
```

或者

```
sed -e '5!d' test.txt
```

或者

```
sed -n -e '6q;5p' text.txt # 如果是在一个大型文件，这种效率会更高，因为只显示q行之前的数据
```

###### 在以包含 of 的行 到包含 were 的行 为范围，全局用 out 替换 in

```
sed -e '/of/, /were/s/in/out/g' test.txt
```

###### 删除 所有以 包含 of 的行 到 包含 were 的行

```
sed -e '/of/, /were/d' test.txt
```

###### 删除顶部的所有空白行

```
sed -e '/./, $!d' test.txt
```

###### 在包含the的行的后面添加一行，并且这一行的内容是 add content

```
sed -e '/the/a\add content' test.txt
```

###### 在包含the的事行替换的内容是 add content

```
sed -e '/the/c\add content' test.txt
```

###### 把全局的 as 替换为 if，用 test.txt.bak 来备份原来的文件，原来的文件用最新的结果来覆盖

```
sed -i'.bak' -e 's/as/if/g' test.txt
```

###### 交换用 - 连接起来的两个单词的位置

```
sed -e 's/\(\<[a-z]*\>\)\-\(\<[a-z]*\>\)/\2\-\1/g' test.txt
```

###### 递归搜索一个目录的所有子目录，找出匹配 good 的行

```
find . -type f -exec sed -n -e '/good/p' {} \;
```

或者

```
find . -type f | xargs sed -n -e '/good/p'
```

或者

```
find . -type f -exec grep 'good' {} \;
```

或者

```
find . -type f | xargs grep 'good'
```

###### 打印 test 目录下所有以 .txt 结尾的文件的第三行

```
find test -name "*.txt" | xargs sed -s -n -e '3p'
```

或者

```
find . -name "*.txt" -exec sed -s -n -e '2p' {} \;
```

###### 给 test 目录的所有以 .txt 结尾的文件的第三到第十行前面添加 # 注释

```
find . -maxdepth 1 -name "*.txt" | xargs sed -s -e '3,10s/^/# /g'
```

或者

```
find . -maxdepth 1 -name "*.txt" -exec sed -s -e '3,10s/^/# /g' {} \;
```