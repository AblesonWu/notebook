# 基础笔记

### 1. 多版本管理

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

## 2. Maven配置

### 1. 阿里云源配置

打开Maven的配置文件，例如：`conf/settings.xml`，在`<mirrors></mirrors>` 标签中添加mirror子节点：

```xml
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```



## 3. VSCode进行Java开发

**1. 插件**

1. Extension Pack for Java - 这个插件包括：
   1. Language Support for Java (TM)
   2. Debugger for Java
   3. Test Runner for Java
   4. Maven for Java
   5. Project Manager for Java
   6. IntelliCode
2. MybatisX
3. MySQL
4. XML Tools

**2. 配置**

使用VSCode 进行Java开发最重要的配置是知名JDK的运行路径：

```json
{
  "java.server.launchMode": "Standard",
  "java.configuration.runtimes": [
    {
      "name": "JavaSE-11",
      "path": "/Users/ranwu/.jenv/versions/11.0",
      "default": true
    }
  ]
}
```

**3. Snippets代码片段**

1. 在MyBatis 开发使用需要定义 mapper 和config需要配置XML文件

```json
{
  "Create a MyBatis mapper": {
    "prefix": "mybatis-mapper",
    "body": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>",
      "<!DOCTYPE mapper",
      "\t\tPUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\"",
      "\t\t\"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">",
      "<mapper namespace=\"$1\">",
      "$2",
      "</mapper>"
    ],
    "description": "Create a MyBatis mapper"
  },
  "Create a MyBatis Configure": {
    "prefix": "mybatis-config",
    "body": [
      "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>",
      "<!DOCTYPE configuration",
      "\t\tPUBLIC \"-//mybatis.org//DTD Config 3.0//EN\"",  
      "\t\t\"http://mybatis.org/dtd/mybatis-3-config.dtd\">",  
      "<configuration>",
      "$1",
      "</configuration>"
    ],
    "description": "Create a MyBatis configure"
  }
}
```



**4. Task 任务**

1. 通过命令行启动Spring Boot项目

```json
{
  "label": "springboot:run",
  "type": "shell",
  "command": "./mvnw spring-boot:run",
  "options": {
    "cwd": "${workspaceFolder}"
  },
  "group": "test",
}
```



# 3. 其他

## 1.判空处理

在Java中判空是常见的行为，而一般的判空处理是使用if else 语句；这种用法使用多了后会使代码非常恶心。在Java 8 提供了Optinal 方法可以一定程度上简化这种操作。

```java
String message = "Hello, world!";

// 首先判断message是否为空，如果为空这赋值为“”，然后执行replace操作
String str = Optional.ofNullable(message).orElse("").replaceAll("(?<!^).", "*");
// 首先判断message是否为空，如果不为空者执行replace，否则复制为“null”
String str1 = Optional.ofNullable(message).map(e -> e.replaceAll("(?<!^).", "*")).orElse("null");
```

