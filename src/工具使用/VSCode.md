# Markdown

### 1. 添加emoji

Emoji图标可以为markdown文档添加更多色彩， 推荐插件`emojisense`

### 2. 添加Table

安装插件 [`Markdown Table`](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable)

1. 在全局环境下定义Snippet

在命令行窗口选择`Snippets: Configure User Snippets`, 然后选择`markdown.json` 并添加下面配置：

```json
{
  "Insert a simple table": {
    "prefix": "table",
    "body": [
        "|${0:title} |  |",
        "| - | - |",
        "|   |   |"
    ],
    "description": "Insert a simple table"
  }
}
```

2. 在工作目录下创建Snippet

在项目目录中创建文件`.vscode/markdown.code-snippets`, 并添加下面代码：

```json
{
    "Insert a simple table": {
        "prefix": "table",
        "scope": "markdown",
        "body": [
            "|${0:title} |  |",
            "| - | - |",
            "|   |   |"
        ],
        "description": "Insert a simple table"
    }    
}
```

### 3. 插入图片

安装插件 ['Markdown Image'](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image)



# 插件

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

