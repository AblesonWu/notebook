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



# Mac 插件开发

可以调用的函数或方法：

**路径或目录：**

1. 获取当前文档的根路径。 `File.getMountFolder()` => `/Users/ranwu/develop/notebook/src`
2. 获取当前文件名。  `File.bundle.fileName` => `Typora.md`
3. 获取当前文件的全路径。 `File.bundle.filePath`  => `/Users/ranwu/develop/notebook/src/工具使用/Typora.md`

2. 获取当前文件所在目录。 `File.bundle.currentFolderPath` => `"/Users/ranwu/develop/notebook/src/工具使用"`



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

