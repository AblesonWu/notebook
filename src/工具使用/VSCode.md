# I. Markdown

## 1. 添加 emoji

Emoji 图标可以为 markdown 文档添加更多色彩， 推荐插件`emojisense`

## 2. 添加 Table

安装插件 [`Markdown Table`](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable)

1. 在全局环境下定义 Snippet

在命令行窗口选择`Snippets: Configure User Snippets`, 然后选择`markdown.json` 并添加下面配置：

```json
{
  "Insert a simple table": {
    "prefix": "table",
    "scope": "markdown",
    "body": ["|${0:title} |  |", "| :-: | :-: |", "|   |   |"],
    "description": "Insert a simple table"
  }
}
```

2. 在工作目录下创建 Snippet

在项目目录中创建文件`.vscode/markdown.code-snippets`, 并添加下面代码：

```json
{
  "Insert a simple table": {
    "prefix": "table",
    "scope": "markdown",
    "body": ["|${0:title} |  |", "| - | - |", "|   |   |"],
    "description": "Insert a simple table"
  }
}
```

## 3. 插入图片

安装插件 ['Markdown Image'](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image)

## 4. 快捷键

自定快捷键的方式不在赘述，下面是一些常用的针对 Markdown 编辑的快捷键

```json
[
  {
    // toggle markdown menu
    "key": "ctrl+m",
    "command": "workbench.action.toggleAuxiliaryBar"
  },
  {
    // insert a colomn to right for markdown text
    "key": "ctrl+l",
    "command": "markdowntable.insertRight",
    "when": "editorTextFocus && editorLangId =~ /markdown/"
  },
  {
    // align text center for markdown text
    "key": "ctrl+c",
    "command": "markdowntable.alignCenter",
    "when": "editorTextFocus && editorLangId =~ /markdown/"
  }
]
```

# II. 插件

```markdown
alefragnani.project-manager
christian-kohler.npm-intellisense
christian-kohler.path-intellisense
codezombiech.gitignore
dbaeumer.vscode-eslint
donjayamanne.githistory
DotJoshJohnson.xml
DSKWRK.vscode-generate-getter-setter
dsznajder.es7-react-js-snippets
ecmel.vscode-html-css
EditorConfig.EditorConfig
esbenp.prettier-vscode
formulahendry.auto-close-tag
formulahendry.auto-rename-tag
GitHub.vscode-pull-request-github
jock.svg
leizongmin.node-module-intellisense
mhutchie.git-graph
mikestead.dotenv
ms-vscode.vscode-typescript-next
patbenatar.advanced-new-file
PKief.material-icon-theme
pranaygp.vscode-css-peek
redhat.fabric8-analytics
redhat.java
redhat.vscode-xml
ritwickdey.LiveServer
sohibe.java-generate-setters-getters
SonarSource.sonarlint-vscode
steoates.autoimport
vincaslt.highlight-matching-tag
VisualStudioExptTeam.intellicode-api-usage-examples
VisualStudioExptTeam.vscodeintellicode
vscjava.vscode-java-debug
vscjava.vscode-java-dependency
vscjava.vscode-java-pack
vscjava.vscode-java-test
vscjava.vscode-lombok
vscjava.vscode-maven
Vue.volar
```

# III.美化

## 主题插件

- [Mayukai Theme](https://marketplace.visualstudio.com/items?itemName=GulajavaMinistudio.mayukaithemevsc)

- [Monokai Pro](https://marketplace.visualstudio.com/items?itemName=monokai.theme-monokai-pro-vscode)

  Monokar Pro 下包含 4 个扩展主题：`Filter Machine, Filter Octagon, Filter Spectron, Filter Risttro`

## 字体(Font)

使用：`Cascadia Mono` - <a href="https://github.com/microsoft/cascadia-code" style="text-decoration:underline;color: #27ae60">https://github.com/microsoft/cascadia-code</a>

配置：

```json
{
  "editor.fontFamily": "\"Cascadia Mono\", Fira Code Retina,Consolas, 'Courier New', monospace",
  "editor.fontWeight": "300",
  "editor.fontSize": 13,
  // 启用连字符
  "editor.fontLigatures": true
}
```

# IV. 代码片段（Snippets）

💪  [VSCode 创建自定义代码片段](https://juejin.cn/post/7238230111941394488)


# 配置

## Eslint 配置

1. 安装`Eslint`插件
2. 配置

```json
{
	"eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact"
  ],
  "eslint.workingDirectories": [
    "./ui.frontend"
  ],
  "eslint.lintTask.options": "-c C:/Users/ranlai.a.wu/develop/aem-cathay/ui.frontend/.eslintrc.js --ignore-path C:/Users/ranlai.a.wu/develop/aem-cathay/ui.frontend/.eslintignore"
}
```

*参考文档：* https://www.cnblogs.com/yayoi/p/12455529.html



# Task



# 具体配置

## Java

```json
// 在settings.json 中配置
{
  "java.server.launchMode": "Standard",
  "java.configuration.runtimes": [
    {
      "name": "JavaSE-11",
      "path": "C:\\Develop\\Softwares\\Java\\jdk11",
      "default": true
    }
  ],
  "java.compile.nullAnalysis.mode": "automatic"
}
```

##  Maven

- [VSCode 进行Java开发](https://zhuanlan.zhihu.com/p/583363069)
