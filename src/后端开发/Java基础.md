# Java基础笔记

## 1. 多版本管理

JDK版本管理的主要目的是为了解决不同项目需要不同的JAVA版本。

- Open JDK 下载地址：[ZuluJDK (一个OpenJDK的发行版本)](https://link.juejin.cn/?target=https%3A%2F%2Fwww.azul.com%2Fdownloads%2F%3Fpackage%3Djdk%23download-openjdk)

### 1. Mac上JDK版本管理

1. 彻底卸载电脑上已经安装的JDK `rm -rf /Library/Java`
2. 安装`jenv` -> `brew install jenv`

安装完成后，检查是否安装成功

```shell
$ jenv doctor
[OK] No JAVA_HOME set
[ERROR] Java binary in path is not in the jenv shims.
[ERROR] Please check your path, or try using /path/to/java/home is not a valid path to java installation.
 PATH : /usr/local/Cellar/jenv/0.5.2/libexec/libexec:/Users/xxx/.cargo/bin:/Users/xxx/.pyenv/shims:/Users/username/.pyenv:/Users/xxx/.nvm/versions/node/v8.11.4/bin:/Users/xxx/bin:/usr/local/bin:/Users/xxx/.cargo/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/Users/xxx/Documents/Projects/golang/bin
[ERROR] Jenv is not loaded in your zsh
[ERROR] To fix :  cat eval "$(jenv init -)" >> /Users/xxx/.zshrc
```

根据要求配置环境变量

```shell
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(jenv init -)"' >> ~/.zshrc
```

然后执行`jenv doctor`, 得到如下信息：

```txt
[OK] No JAVA_HOME set
[ERROR] Java binary in path is not in the jenv shims.
[ERROR] Please check your path, or try using /path/to/java/home is not a valid path to java installation.
 PATH : /usr/local/Cellar/jenv/0.5.2/libexec/libexec:/Users/xxx/.jenv/shims:/Users/xxx/.cargo/bin:/Users/xxx/.pyenv/shims:/Users/username/.pyenv:/Users/xxx/.cargo/bin:/Users/xxx/.pyenv/shims:/Users/username/.pyenv:/Users/xxx/.nvm/versions/node/v8.11.4/bin:/Users/xxx/bin:/usr/local/bin:/Users/xxx/.cargo/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/Users/xxx/Documents/Projects/golang/bin:/Users/xxx/Documents/Projects/golang/bin
[OK] Jenv is correctly loaded
```

为了能够正确的设置`JAVA_HOME`, 最好开启`export`插件：

```shell
jenv enable-plugin export
```

如果是Maven用户，建议开启Maven插件，使得Maven能够使用正确的JDK版本

```shell
jenv enable-plugin maven
```

下面需要将jdk安装到指定的位置，不需要设定环境变量。 然后手动指定目录

```shell
jenv add $HOME/java/jdk11
```

查看JDK版本， 执行`jenv versions`

```txt
 system
* 1.8 (set by JENV_VERSION environment variable)
  1.8.0.191
  13
  openjdk64-13
  oracle64-1.8.0.191
```

默认情况下，system指的是系统安装的最新版本的JDK
**切换JDK版本**

- Global ==> `jenv global 13`
- Local(在某个工作目录下设置JDK版本，会在当前目录下创建`.java-verison`文件) ==> `jenv local 17`

## 2. Maven的实用

### 1. 阿里云源配置

打开Maven的配置文件，例如：`conf/settings.xml`，在`<mirrors></mirrors>` 标签中添加mirror子节点：

```xml
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```
