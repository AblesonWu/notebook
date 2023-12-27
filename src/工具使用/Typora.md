# Color

1. <div style="color: #d63031">Test Color</div>



## Heading2




# 常用快捷键

**1. 快速搜索文件**

有时通过侧边栏逐级打开文件夹的方式实在太慢，这时通过**==快捷键的方式==**搜索想要打开的文件会比较快。使用 

| Mac                   | Windows |
| --------------------- | ------- |
| `Command + Shift + O` |         |



# 插件管理

在当前最新的版本中，Typora增加的插件的功能。这样可以更加丰富各种功能。详细可以查看：[Typora Plugins](https://github.com/obgnail/typora_plugin)。***但是这些插件都不是官方提供的，因为Typora依然是闭源。***

对于各种Plugin的详细功能可以到 [小众讨论区](https://meta.appinn.net/t/topic/44934/5) 查看



# 插件开发

由于Typora 在Markdown支持方面还有很多方面的不足，同时也没有提供插件方面的功能。为了添加各种功能，这里尝试记录下开发自定义 插件。

## 功能分析

1. 在Typora软件的根目录下，建立一个 `install.sh` 文件，用户点击的时候可以从网上下载配置文件

```txt
1. 校验当前install.sh 文件的位置是否在Typora的根目录下
2. 选择是 Install/Uninstall 插件
3. 选择Install之后
	 a. 选择Typora版本，并根据对应的下载相应的配置文件
   a. 备份 resource/window.html 文件，并替换为新的修改后 window.html 文件
   b. 在 resources 目录下创建 plugin 文件，包括 plugin的入口文件 plugin/index.js, 包括插件的注册与管理等核心功能，还有 需要修改的样式文件
4. 选择 Uninstall 之后
	a. 将 window.html 文件替换为备份的文件
	b. 删除 plugin文件夹，以及用户根目录下的 .typora 文件夹
```

2. 将 所有的插件都安装在用户根目录下的 `.typora` 文件夹内。

```txt
1. 每一个插件都应当是一个文件夹，基本结构如下：
   	a. package.json 包括插件的版本信息等信息
   	b. README.md 记录该插件的相关基本信息
   	c. config.json  该插件的默认配置信息
2. 除了插件内容外，还需要保存全局用户配置信息文件 config.global.json
```

3. 考虑到随着插件的增加，会影响到Typora加载时间，以及运行性能。所以在初始时windows.html 中仅仅添加插件管理页面

```txt
插件管理：
	1. 插件管理页面放置在 管理文件夹中。
	2. 当用户打开插件管理页面时， 需要请求插件索引页面。
	3. 页面提供快速搜索功能
	4. 当点击任意插件时，打开插件详情页面
	5. 详情也面中需要说明该插件的作用，以及如何配置该插件
	
加载：
	1. 用户打开Typora并编辑文档时，插件不会影响功能，此时用户可以编辑任意文件。
	2. 用户可以知道什么时候插件已经加载完毕

核心插件：
	1. 管理所有的插件，包括插件的注册，启用
  2. 提供一些核心功能，包括： 全局命令上界面，通过命令行打开配置文件
```

	4. 下面这些是目前需要功能

```txt
1. Git
2. 通过 / 快速打开命令行窗口
```



## 实现细节

用户打开Typora, 运行核心插件文件，注册插件

**1. 插件激活**

a. 一启动Typora 就激活

​	对于如：命令行窗口，需要在用户一起启动时候就要激活插件

b. 不需要一启动就激活

​	而对于其他一些插件不需要一开始就启动。

- `onCommand: show.table` 通过在命令行窗口调用命令激活插件



## 自定义命令窗口

1. 覆盖 `Ctrl + P` 命令

在Windows中，使用 `Ctrl + P` 命令是在新窗口打开文件，现在需要覆盖该行为， 从而实现在当前窗口打开文件，不仅更方便而且打开速度更快。

```javascript
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "p") {
    e.preventDefault();
    e.stopImmediatePropagation();
    
  }
}, false);
```





## 样式文件

```css
/****************** Customize Config ******************/

header #w-titlebar-left>#title-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

/*** 自定义滚动条 ***/
body::-webkit-scrollbar {
    display: none;
}

body {
    -ms-overflow-style: none;
}

content:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: rgba(0,0,0,0.3);
    box-shadow: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: rgba(0,0,0,0.5);
    box-shadow: rgba(0, 0, 0, 0.5);
    background-color: transparent;
}
```



# Mac 插件开发

可以调用的函数或方法：

**路径或目录：**

1. 获取当前文档的根路径。 `File.getMountFolder()` => `/Users/ranwu/develop/notebook/src`
2. 获取当前文件名。  `File.bundle.fileName` => `Typora.md`
3. 获取当前文件的全路径。 `File.bundle.filePath`  => `/Users/ranwu/develop/notebook/src/工具使用/Typora.md`

4. 获取当前文件所在目录。 `File.bundle.currentFolderPath` => `"/Users/ranwu/develop/notebook/src/工具使用"`

5. 用户根目录 `File.option.userPath`



**跳转：**

1. 跳转到文件顶部：`File.editor.selection.jumpTop()`
2. 跳转到文件底部： `File.editor.selection.jumpBottom()`



**其他：**

1. 打开网页：·`bridge.callHandler("path.openURL", /^https?:/.exec(n) ? n : e)`
2. 新建窗口并打开文件：

```javascript
function (e, t) {
  return new Promise(function (n, i) {
    bridge.callHandler(
      "path.openFile",
      {
        url: e.replace(/\\/g, "/"),
        relateToFolder: !0,
        anchor: t || "",
      },
      function (e) {
        e ? n() : i();
      }
    );
  });
}
```

3. 在Finder中打开。 `window.bridge.callHandler("path.showInFinder", "/Users/ranwu/develop/notebook/src")`

4. 运行命令

`````javascript
f = await function(e, t) {
  return File.isNode ? v.runExportCommand(e, t) : File.isMac ? new Promise(n => {
        bridge.callHandler("controller.runCommand", {
            args: e,
            cwd: t || ""
        }, function(e) {
            n({
                code: e[0] ? 0 : -1,
                message: e[1],
                error: e[2]
            })
        })
    }) : void 0
}(u, h);

# Example

f = await function(e, t) {
  return File.isNode ? v.runExportCommand(e, t) : File.isMac ? new Promise(n => {
        bridge.callHandler("controller.runCommand", {
            args: e,
            cwd: t || ""
        }, function(e) {
            n({
                code: e[0] ? 0 : -1,
                message: e[1],
                error: e[2]
            })
        })
    }) : void 0
}("git status -s | wc -l", File.getMountFolder());
`````

````javascript
bridge.callHandler("quickOpen.query", e)
````

5. 查找目录下所有目录河文档

```javascript
bridge.callHandler("library.listDocsUnder", File.getMountFolder(), (e) => console.log(e))
```





## 具体实现

```javascript
execForAll: function (e) {
              window.reqnode ? ClientCommand.execForAll(e) : o && o.callHandler("window.execForAll", e);
            },
            showInFinder: function (e) {
              e && (File.isMac ? o.callHandler("path.showInFinder", e) : e && l.invoke("shell.showItemInFolder", e));
            },
            openFolder: function (e) {
              e && (File.isMac ? o.callHandler("path.openFolderInFinder", e) : l.invoke("shell.openItem", e));
            },
            openFile: function (e) {
              e && (File.isMac ? o.callHandler("path.openFile", e) : l.invoke("shell.openItem", e));
            },
            showInBrowser: function (e) {
              File.isMac ? o.callHandler("path.openURL", e) : e && l.invoke("shell.openExternal", e);
            },
            selectFile: function (e, t, n) {
              File.isNode
                ? l
                    .invoke("dialog.showOpenDialog", {
                      defaultPath: e || void 0,
                      filters: t,
                      properties: ["openFile", "dontAddToRecent"],
                    })
                    .then(({ filePaths: e }) => {
                      n((e || [null])[0] || null);
                    })
                : File.isMac &&
                  o.callHandler(
                    "path.selectFolderOrFile",
                    {
                      dir: !1,
                      defaultPath: e,
                      filters: t ? t.map((e) => e.extensions) : null,
                    },
                    (e) => {
                      n(e);
                    }
                  );
            },
```

