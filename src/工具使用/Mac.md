# 开发

> ####  1.在Mac上调试苹果手机上safari浏览器页面：

On your iPad, iPhone or iPod, go to Settings > Safari > Advanced and toggle on Web Inspector.

On your Mac, open Safari and go to Safari > Preferences > Advanced then check Show Develop menu in menu bar.

Connect your iOS device to your Mac with the USB cable.

On your Mac, restart Safari.

On your iOS device, open the web site that you want to debug.

On your Mac, open Safari and go to the Develop menu. You will now see the iOS device you connected to your Mac.



# HomeBrew

如果使用官网安装HomeBrew在下载包时会非常的慢，可以按照下面的步骤自动安装国内源，会加快下载速度。:muscle:

## 自动安装

<span style="font-weight:bolder;font-size:1.2rem;text-decoration:underline">苹果电脑 常规安装脚本（推荐 完全体 几分钟安装完成）：</span>

```cmd
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

<span style="font-weight:bolder;font-size:1.2rem;text-decoration:underline">苹果电脑 极速安装脚本（精简版 几秒钟安装完成）：</span>

```cmd
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)" speed
```

-> [Mac电脑如何打开终端：command+空格 在聚焦搜索中输入terminal回车](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fsupport.apple.com%2Fzh-cn%2Fguide%2Fterminal%2Fapd5265185d-f365-44cb-8b09-71a064a42125%2Fmac)。

**苹果电脑 卸载脚本：**

```cmd
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

**常见错误**去下方[地址](https://link.juejin.cn/?target=https%3A%2F%2Fgitee.com%2Fcunkai%2FHomebrewCN%2Fblob%2Fmaster%2Ferror.md)查看

```cmd
https://gitee.com/cunkai/HomebrewCN/blob/master/error.md
```

**Linux电脑** 安装脚本：

```cmd
rm Homebrew.sh ; wget https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh ; bash Homebrew.sh
```

**Linux电脑** 卸载脚本：

```cmd
rm HomebrewUninstall.sh ; wget https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh ; bash HomebrewUninstall.sh
```

> 如果遇到 SSL certificate problem: certificate has expired 错误 具体内容如下： Cloning into '/usr/local/Homebrew'... fatal: unable to access '[mirrors.ustc.edu.cn/bre](https://link.juejin.cn/?target=http%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fmirrors.ustc.edu.cn%2Fbrew.git%2F)': SSL certificate problem: certificate has expired m此步骤失败 '尝试再次运行自动脚本选择其他下载源或者切换网络' [问题分析]： 该部分原因可能因为在此之前 安装过Git客户端 默认Git客户端安装是开启SSL证书验证功能 需要在终端中关闭该验证 [解决办法] : 前面都不是重点，重点是问题描述里面的最后一句 certificate problem: certificate has expired，意思是证书过期了。其实就是SSL卡住了你，因此最快的解决方法就是关掉SSL验证。 终端输入下方代码 关闭SSL证书验证： git config --global http.sslVerify false



# Item2

## 设置zsh为默认shell

```bash
# 查看系统所有shell列表
$ cat /etc/shells

# 查看当前使用的shell
$ echo $SHELL

# 设置zsh为默认shell
$ chsh -s /bin/zsh
```



## 安装oh-my-zsh

oh-my-zsh 是一款社区驱动的命令行工具，它基于 zsh 命令行，提供了主题配置，插件机制，大大提高了可玩（用）性。它的 Github 地址为：[github.com/robbyrussel…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frobbyrussell%2Foh-my-zsh)

我们可以使用 curl 安装：

```bash
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```



##  自动提示

这里用到 **zsh-autosuggestions** 插件，它可以让终端提示我们接下来可能要输入的命令，按右键即可补齐，提高我们工作的效率。

首先，我们先将仓库克隆到 `～/.oh-my-zsh/custom/plugins` 目录下

```bash
$ git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

然后，用 `vim  ~/.zshrc` 打开文件，找到其中的插件设置，默认是 `plugins=(git)`，我们将其修改为

```bash
plugins=(zsh-autosuggestions git)
```

## 语法高亮

这里用到 **zsh-syntax-highlighting** 插件，它可以使终端中的命令带有语法高亮的功能。

首先，将下载文件并放到 `~/.oh-my-zsh/custom/plugins` 目录下

```bash
$ git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

然后，用 `vim ~/.zshrc`打开文件，找到其中的插件位置，并添加该插件

```bash
plugins=(git zsh-syntax-highlighting)
```



# Ranger

`ranger` 是一个文件管理器，类似于 `windows` 下的 `Total Commander`，但 `ranger` 最主要的好处就是可以使用 `vim` 的快捷键，`ranger` 不同层级的目录分别在一个面板的三列中进行展示，可以使用快捷来进行操作，非常方便，下面简单说一下配置和一些快捷键：

## 安装

在 `mac` 下的安装

```
brew install ranger
```

## 配置

###### 创建配置文件：

运行下面命令：

```
ranger --copy-config=all
```

会在主目录生成下面的几个文件

```
creating: /Users/test/.config/ranger/rifle.conf    # 指定不同类型的文件的默认打开程序
creating: /Users/test/.config/ranger/commands.py    # 能通过 : 执行的命令
creating: /Users/test/.config/ranger/commands_full.py    # 能通过 : 执行的命令，但这个更全
creating: /Users/test/.config/ranger/rc.conf    # 选项设置和快捷键
creating: /Users/test/.config/ranger/scope.sh    # 当 use_preview_script = true，这个脚本会被调用
```

###### 配置颜色方案

1. 先从 https://github.com/ranger/ranger/tree/master/ranger 这里下载 colorschemes 目录放到 /Users/test/.config/ranger 目录下
2. 打开 `/Users/test/.config/ranger/rc.conf` 文件，修改下面的代码为

```
set colorscheme jungle
```

`说明：` 有四个颜色可以选： default 、snow、jungle、solarized

## 安装各种插件

1. 代码的语法高亮

```
brew install highlight
```

1. 浏览网页

```
brew install w3m
```

## 启用文件预览功能

打开 `/Users/test/.config/ranger/rc.conf` 文件，修改下面的代码为：

```
set use_preview_script true    # 显示简单的文本文件或者图片的预览

set preview_script ~/.config/ranger/scope.sh    # 为其它预览功能指定脚本文件

set preview_images true    # 预览图片

set preview_images_method iterm2    # 使用什么方法来预览图片

set vcs_aware true    # 开启 svn、git 之类的工具
```

## 自定义快捷键

###### 定义一个快捷键 DD ，在 Mac 中能把文件或者目录放到回收站

打开 `/Users/test/.config/ranger/rc.conf` 文件，添加下面的代码

```
map DD shell mv %s ~/.Trash
```

###### 定义一个快捷键到指定的目录

打开 `/Users/test/.config/ranger/rc.conf` 文件，添加下面的代码

```
map gw cd ~/workspace/
```

`说明：` 这个功能可以非常快速定位到自己常用的目录，可以多定义几个自己常用的目录

## 常用快捷键

- `q` ： 退出 ranger
- `R` : 重新刷新目录
- `S` : 执行 shell 命令
- `:` 或者 `;` : 控制台
- `W` : 显示日志
- `k` : 向上
- `j` : 向下
- `h` : 向左
- `l` : 向右
- `g` : 到顶部
- `G` : 到底部
- `J` : 半页向下
- `K` : 半页向上
- `gh` : 相当于 `cd ~`
- `ge` : 相当于 `cd /etc`
- `gu` : `cd /usr`
- `dd` : 剪切
- `yy` : 复制
- `pp` : 粘贴

## bookmark 操作

这个 bookmark 功能很不错，可以非常快速地回到某一个目录

- `m+键` 定义一个目录的 bookmark 的键，例如：ma 或者 ma
- `um+键` 取消定义一个目录的 bookmark 的键，例如：ma 或者 ma
- `'+键` 跳回到定义目录的 bookmark，例如：'a

`draw_bookmarks` 命令用来查看已经定义了哪些 bookmark 键



#   Tmux

`tmux` 是一个在终端窗口的支持多个终端会话的工具，对于经常操作 `linux` 系统的人来说，熟练使用 `tmux` 可以提高工作效率，特别是经常在远程服务器命令行工作，如果执行一些比较长的命令，这时是不能断开的，用 `tmux` 就算关闭了窗口，命令也能继续执行的，下面来说一下 `tmux` 的安装，常用配置和使用:

### 安装 tmux

```
brew install tmux
```

`注意：` 关于 `brew` 的安装，可以看这篇文章 [Mac常用软件](https://www.52gvim.com/post/mac-common-software)

### 基本概念

1. `session` 会话：一个服务器可以包含多个会话
2. `window` 窗口：一个会话可以包含多个窗口
3. `pane` 面板：一个窗口可以包含多个面板

### 启动 tmux

###### 直接启动

```
tmux
```

###### 启动并且指定会话

```
tmux new -s 会话名称
```

### 创建窗口

可以分为两步：

1. 按 Ctrl + B 组合键，然后松开
2. 再按一下 c 键

### 切换窗口

1. 按 Ctrl + B 组合键，然后松开
2. 然后再按下想切换的窗口所对应的数字

### tmux 的配置，配置文件为 ( ~/.tmux.conf )

```
set -g status-interval 1
set -g status-justify centre
set -g status-left-length 20
set -g status-right-length 140

set -g status-left '#[fg=green]#H #[fg=black]• #[fg=green,bright]#(uname -r | cut -c 1-6)#[default]'
set -g status-right '#[fg=green,bg=black,bright]#(tmux-mem-cpu-load 1) #[fg=red,dim]#(uptime | cut -f 4-5 -d " " | cut -f 1 -d ",") #[fg=white]%a%l:%M:%S %p#[default] #[fg=blue]%Y-%m-%d'

set -g status-fg white
set -g status-bg default
set -g status-attr bright

set-window-option -g window-status-fg white
set-window-option -g window-status-bg default
set-window-option -g window-status-attr dim

set-window-option -g window-status-current-fg white
set-window-option -g window-status-current-bg default
set-window-option -g window-status-current-attr bright

set-option -g prefix C-a
bind-key C-a last-window

set -g base-index 1

set -s escape-time 0

setw -g aggressive-resize on

bind-key a send-prefix

setw -g monitor-activity on
set -g visual-activity on

set-window-option -g window-status-current-bg red

setw -g mode-keys vi
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

bind r source-file ~/.tmux.conf \; display-message "Config reloaded..."

set-window-option -g automatic-rename

set-option -g mouse off

set -g default-terminal "screen-256color"

unbind '"'
bind - splitw -v
unbind %
bind | splitw -h

bind e lastp
bind ^e last
bind q killp
bind ^q killw

bind Escape copy-mode
注意：` 没有配置之前，tmux 原生的快捷键是 `Ctrl + B`，在这个配置中，我们把这个快捷键改为 `Ctrl + A
```

下面是配置后的一些快捷键：

1. 新建竖直 `pane` 面板，先按住 `Ctrl + A`, 松开，然后再按 `|`
2. 新建水平 `pane` 面板，先按住 `Ctrl + A`, 松开，然后再按 `-`
3. `pane` 面板的切换可以先按住 `Ctrl + A`，再加上 `j(上)` 或 `k(下)` 或 `h(左)` 或 `l(右)`

# Mysql

使用HomeBrew执行安装命令：`brew install mysql`

该命令在执行过程中，会设置环境变量，配置初始化密码以及启动服务等操作。

启动Mysql服务： `brew services start mysql`

1. 在默认情况下，root的密码为空，需要使用命令 `mysql_secure_installation` 进行配置
1. 
