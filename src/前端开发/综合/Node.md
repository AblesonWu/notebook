# 多进程开发

总所周知，JS是运行在单进程单线程上的。

**这种架构所带来的优点是：**

1. 没有锁、线程同步的问题。
2. 由于较少的切换上下文，可以很好的提高CPU的使用率

**同样这种结构也会带来一些不足：**

1. 无法充分利用多核CPU服务器
2. 单个进程的稳定性很难得到保证

面对单进程单线程对多核CPU使用率不足的问题，可以启用多进程。Node提供了`child_process` 模块可以复制出多个进程

## 1. 建立多进程

在master文件中复制出多个worker服务器

```javascript
// worker.js
const express = require('express');
const PORT = Math.round((1 + Math.random()) * 1000);
const app = express();
app.get("/", function (req, res) {
  res.status(200).set({'Content-Type': 'text/plain'});
  res.send('Hello World!\n');
});

app.listen(PORT, function (){
  console.log(`Server is running on ${PORT}`);
});
```

根据计算机CPU多少创建多个进程

```javascript
// master.js
const {fork} = require('child_process');
const cpus = require('os').cpus();
for (const _ of cpus) {
  fork('./worker.js')
}
```

在`shell` 中就可以看到多个进程被启动起来`ps aux |grep worker.js`

> 这种工作模式被称为Master-Worker模式，即将进程分为主进程和工作进程。主进程负责任务调度或管理工作进程，而工作进程负责具体的业务处理。当主进程被停止时，工作进程也会自动停止。



**除了使用`fork`创建子进程外，Node还提供了其他创建方式：**

- [x] `spawn()` 
- [x] `exec()`  除了可以创建子进程，还提供了一个回调函数，当子进程执行完毕执行该回调函数
- [x] `execFile()`  可以传入一个JS文件用于创建进程
- [x] `fork()` 

各种不同创建方式：

```javascript
const {spawn, exec, execFile, fork} = require('child_process');
spawn('node', ['worker.js']);
exec('node worker.js', function(err, stdout, stderr) {
  // some code
});
execFile('worker.js', function(err, stdout, stderr) {
  // some code
});
fork('./worker.js'); 
```

> 使用`execFile`	创建子进程，如果是一个JS文件，则需要在首先添加下面代码：`#!/usr/bin/env node`

## 2. 进程间通信



# 2. `package.json`

<font style="color:purple;font-size:1.5rem">References: </font>

- [package.json 详细说明：https://www.pengfeixc.com/blogs/javascript/package-json](https://www.pengfeixc.com/blogs/javascript/package-json)
- 

### sideEffects字段

`sideEffects: false`用于告知打包工具（webpack），当前项目`无副作用`，可以使用`tree shaking`优化。也可以是一个文件路径组成的数组，告知哪些文件`有副作用`，不可以使用`tree shaking`优化。

```json
"sideEffects": [
    "a.js",
    "b.js"
]
```

由于`tree shaking`只在`production`模式生效，所以本地开发会一切正常，生产环境很难及时发现这个问题。当然， 样式文件使用`"import xxx;"`的方式引入，会进行保留。

### files字段

可选择的 `files` 字段，是一个文件匹配字符串，当你的包被安装为一个项目依赖时，被 `files` 字段指定的文件将会被包含。文件匹配采用的语法类似于 `.gitignore` 文件。忽略该字段，等价于 `["*"]`，表示包含所有文件。

如果在`.gitignore`中指定了要删除的文件，即使在`files`中定义了也不会被包含进来。

```json
"files": [
  "dist"
],
```

### main字段

`package.json`文件有两个字段可以指定模块的入口文件：`main`和`exports`。比较简单的模块，可以只使用`main`字段，指定模块加载的入口文件。

```javascript
// ./node_modules/es-module-package/package.json
{
  "type": "module",
  "main": "./src/index.js"
}
```

上面代码指定项目的入口脚本为`./src/index.js`，它的格式为 ES6 模块。如果没有`type`字段，`index.js`就会被解释为 CommonJS 模块。

然后，`import`命令就可以加载这个模块。

```javascript
// ./my-app.mjs

import { something } from 'es-module-package';
// 实际加载的是 ./node_modules/es-module-package/src/index.js
```

上面代码中，运行该脚本以后，Node.js 就会到`./node_modules`目录下面，寻找`es-module-package`模块，然后根据该模块`package.json`的`main`字段去执行入口文件。

这时，如果用 CommonJS 模块的`require()`命令去加载`es-module-package`模块会报错，因为 CommonJS 模块不能处理`export`命令。

### exports字段

`exports`字段的优先级高于`main`字段。它有多种用法。

（1）子目录别名

`package.json`文件的`exports`字段可以指定脚本或子目录的别名。

```javascript
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./submodule": "./src/submodule.js"
  }
}
```

上面的代码指定`src/submodule.js`别名为`submodule`，然后就可以从别名加载这个文件。

```javascript
import submodule from 'es-module-package/submodule';
// 加载 ./node_modules/es-module-package/src/submodule.js
```

下面是子目录别名的例子。

```javascript
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/": "./src/features/"
  }
}

import feature from 'es-module-package/features/x.js';
// 加载 ./node_modules/es-module-package/src/features/x.js
```

如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。

```javascript
// 报错
import submodule from 'es-module-package/private-module.js';

// 不报错
import submodule from './node_modules/es-module-package/private-module.js';
```

（2）main 的别名

`exports`字段的别名如果是`.`，就代表模块的主入口，优先级高于`main`字段，并且可以直接简写成`exports`字段的值。

```javascript
{
  "exports": {
    ".": "./main.js"
  }
}

// 等同于
{
  "exports": "./main.js"
}
```

由于`exports`字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。

```javascript
{
  "main": "./main-legacy.cjs",
  "exports": {
    ".": "./main-modern.cjs"
  }
}
```

上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是`main-legacy.cjs`，新版本的 Node.js 的入口文件是`main-modern.cjs`。

**（3）条件加载**

利用`.`这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。

```javascript
{
  "type": "module",
  "exports": {
    ".": {
      "require": "./main.cjs",
      "default": "./main.js"
    }
  }
}
```

上面代码中，别名`.`的`require`条件指定`require()`命令的入口文件（即 CommonJS 的入口），`default`条件指定其他情况的入口（即 ES6 的入口）。

上面的写法可以简写如下。

```javascript
{
  "exports": {
    "require": "./main.cjs",
    "default": "./main.js"
  }
}
```

注意，如果同时还有其他别名，就不能采用简写，否则会报错。

```json
{
  // 报错
  "exports": {
    "./feature": "./lib/feature.js",
    "require": "./main.cjs",
    "default": "./main.js"
  }
}
```



### types字段

项目如果是用`TypeScript`写的，则需要`types`字段，对外暴露相关的类型定义。比如`dance-ui(ts编写的react组件库)`项目：

```json
"types": "./dist/index.d.ts",
```

### config

`config` 对象可以被用来配置 scripts 的参数，例如：

```json
{ 
    "name" : "foo",
    "config" : { "port" : "8080" }
}
```

有一个 start 命令，并且可以通过 `npm_package_config_port` 变量引用设置的 port。用户也可以通过 `npm config set foo:port 8001` 覆盖配置。

可以在 [config](https://docs.npmjs.com/cli/v6/using-npm/config) 和 [scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts) 获取更多信息。

### dependencies

指定项目依赖，值为包名加上版本号。

版本号可以指定一个范围，有以下语法。

- `version`：精确的版本，例如 `1.0.0`
- `>version`：大于 `version`
- `>=version`：大于等于
- `<version`: 小于
- `<=version`: 小于等于
- `~version`: 允许补丁级别的变化，例如 `~1.2.3` 表示 `>=1.2.3 <1.3.0`
- `^version`：允许不更改最左侧非0版本号数字的变化，例如 `^1.2.3` 表示 `>=1.2.3 <2.0.0`
- `1.2.x`
- `http://...`
- `*`
- `version1 - version2` 等同于 `>=version1 <=version2`

可以在 [semver](https://docs.npmjs.com/cli/v6/using-npm/semver) 获取更多关于 version 的信息。

```json
{ 
    "dependencies" :
    { 
        "foo" : "1.0.0 - 2.9999.9999",
        "bar" : ">=1.0.2 <2.1.2",
        "baz" : ">1.0.2 <=2.3.4",
        "boo" : "2.0.1",
        "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
        "asd" : "http://asdf.com/asdf.tar.gz", 
        "til" : "~1.2",
        "elf" : "~1.2.3",
        "two" : "2.x",
        "thr" : "3.3.x",
        "lat" : "latest",
        "dyl" : "file:../dyl"
    }
}
```

可以使用 URL 代替版本号。

也可以使用本地路径。

```json
{
    "name": "baz",
    "dependencies": {
        "bar": "file:../foo/bar"
    }
}
```

### bin

很多包拥有一个或者多个可执行文件，并且希望安装在 PATH 中。npm 可以很简单的实现这个（实际上，就是使用这个特性安装的 npm 可执行文件）。

为了使用这个特性，需要在 package.json 文件中指定 `bin` 字段，它表示命令与本地文件名称的映射关系。当进行全局安装时，npm 将这个文件与 `prefix/bin` 进行符号连接（symlink），进行本地安装时，会将这个文件与 `node_modules/.bin/` 进行符号连接。

例如，`myapp` 的 `package.json` 包含以下内容：

```json
{ "bin" : { "myapp" : "./cli.js" } }
```

当你全局安装 `myapp` 时， npm 会从 `cli.js` 脚本创建一个符号连接至 `usr/local/bin/myapp` 目录。

如果你只有一个可执行文件，那么你可以提供一个字符串，像这样：

```json
{
    "name": "my-program",
    "version": "1.2.5",
    "bin": "./path/to/program"
}
```

上面的写法，等价于：

```json
{
    "name": "my-program",
    "version": "1.2.5",
    "bin" : { "my-program" : "./path/to/program" }
}
```

最后，请确保 `bin` 字段引用的文件内容以 `#!/usr/bin/env node` 开头，用于指示该脚本的执行需要 node。

### engines

可以指定一些运行环境，例如 node 和 npm：

```json
{ 
    "engines" : {
        "node" : ">=0.10.3 <0.12",
        "npm" : "~1.0.20"
    }
}
```

