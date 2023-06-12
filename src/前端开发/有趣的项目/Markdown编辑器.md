# 1. 概述

<span style="font-size:1.25rem;color:#27ae60;font-weight:bolder">视频地址: </span><a href="https://www.youtube.com/watch?v=gxBis8EgoAg&t=1855s" style="text-decoration:underline;color: #27ae60">https://www.youtube.com/watch?v=gxBis8EgoAg&t=1855s</a>

<span style="font-size:1.35rem;color:#27ae60;font-weight:bolder">使用的框架：</span>

- <span style="font-size:1.25rem;color:orange;font-weight:bolder">Electron</span> 
- <span style="font-size:1.25rem;color:orange;font-weight:bolder">Vite</span>
- <span style="font-size:1.25rem;color:orange;font-weight:bolder">Typescript</span>
- <span style="font-size:1.25rem;color:orange;font-weight:bolder">React</span>
- <span style="font-size:1.25rem;color:orange;font-weight:bolder">CodeMirror 6</span>
- <span style="font-size:1.25rem;color:orange;font-weight:bolder">Remark</span>

<span style="font-size:1.35rem;color:#27ae60;font-weight:bolder">项目结构：</span>

```txt
$PROJECT_ROOT
-- packages
---- main
     # Electron main script
---- preload
     # Used in BrowserWindow.webPreferences.preload
---- renderer
     # Electron web page
```

<div style="margin-top: 2em"></div>
<span style="font-size:1.35rem;color:#27ae60;font-weight:bolder">项目脚手架：</span> 
<a href="https://github.com/cawa-93/vite-electron-builder.git" style="text-decoration:underline;color: #27ae60">https://github.com/cawa-93/vite-electron-builder.git</a>

<div style="margin-top: 1em"></div>

# 2. 初始化

<span style="font-size:1.25rem;color:steelblue;font-weight:bolder">1. 删除相关依赖，以及把 vue 的项目改为 React 的项目</span>

1. 使用 `pnpm`管理项目以来，_因为 npm 会安装以来失败，而且很慢_
2. 删除 vue 相关的依赖包。

```shell
pnpm uninstall @vitejs/plugin-vue @vue/compiler-sfc eslint-plugin-vue vue vue-router vue-tsc @vue/test-utils
```

3. 安装 react 插件

```shell
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom @typescript-eslint/parser eslint eslint-config-prettier @typescript-eslint/eslint-plugin
```

<span style="font-size:1.25rem;color:steelblue;font-weight:bolder">2. 修改 eslint,prettier,vite 等配置，使支持 React 开发</span>

1. 删除 eslint 默认配置

```shell
rm packages/renderer/.eslintrc.json
```

2. 修改跟目录下的 eslint 配置

a. 添加 prettier 配置 -> `extends: prettier`
b. 删除 semi 的警告

3. 修改 ts 的配置文件 `packages/renderer/tsconfig.json`

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "allowSyntheticDefaultImports": true
  }
}
```

4. 删除 vite 中的 vue 配置 `packages/renderer/vite.config.js`, 删除 vue 相关的配置

5. 删除文件 `packages/renderer/types/shims-vue.d.ts`

<span style="font-size:1.25rem;color:steelblue;font-weight:bolder">3. 删除 vue 相关文件，创建 React 入口文件</span>

```shell
$ find packages/ -type f | grep vue | xargs rm
```

在项目渲染进程入口文件创建 React， `packages/renderer/src/index.tsx`

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";

const app = document.getElementById("app");
if (app) {
  ReactDOM.createRoot(app).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
```

# 3. 开发过程

在接下来记录开发过程中不会过于详细描述具体实现细节，例如：对于一些样式等问题会略去，如果需要知道什么样式可以渠道作者的 Github 中查看（<a href="https://github.com/craftzdog/electron-markdown-editor-tutorial" style="text-decoration:underline;color: #27ae60">https://github.com/craftzdog/electron-markdown-editor-tutorial</a>）

## 1. 毛玻璃效果

毛玻璃样式仅在 MacOS 中生效，需要通过下面两个属性进行设置：

- `vibrancy` - 窗口是否使用 vibrancy 动态效果，仅 macOS 中有效
- `visualEffectState` - Specify how the material appearance should reflect window activity in an uncoming version of macOS.

详细信息参考 [Electron 中实现毛玻璃效果](https://juejin.cn/post/6955781723946745886)。

```javascript
let win = new BrowserWindow({
  width: 800,
  height: 600,
  vibrancy: "dark", // 'light', 'medium-light' etc
  visualEffectState: "active", // 这个参数不加的话，鼠标离开应用程序其背景就会变成白色
});
```

## 2. 使用 CodeMirror

CodeMirror 是一个在线的代码编辑器，具有语法检查，提示等功能，在这里不做详细描述。具体可以在网上查找相关文档。

<span style="font-size:1.125rem;color:green;font-weight:bolder">第一步，下载相关依赖</span>

```shell
$ pnpm add  @codemirror/lang-javascript@0.19.7 @codemirror/matchbrackets"@0.19.4 @codemirror/commands@0.19.5 @codemirror/gutter@0.19.8 @codemirror/highlight@0.19.6 @codemirror/history@0.19.0 @codemirror/language@0.19.6 @codemirror/legacy-modes@0.19.0 @codemirror/search@0.19.3 @codemirror/state@0.19.6 @codemirror/view@0.19.24

```

<span style="font-size:1.125rem;color:#27ae60;font-weight:bolder">第二步，自定义 Hook，并添加 Code Mirror 相关配置</span>

```typescript
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { KeyBinding } from "@codemirror/view";
import { EditorView, highlightActiveLine, keymap } from "@codemirror/view";
import { history, historyKeymap } from "@codemirror/history";
import { indentOnInput } from "@codemirror/language";
import { highlightActiveLineGutter, lineNumbers } from "@codemirror/gutter";
import { defaultKeymap } from "@codemirror/commands";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { bracketMatching } from "@codemirror/matchbrackets";

interface Props {
  initialDoc: string;
  onChange?: (state: EditorState) => void;
}

const useCodeMirror = <T extends Element>(props: Props): [React.MutableRefObject<T | null>, EditorView?] => {
  const { onChange } = props;
  const containerRef = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();

  useEffect(() => {
    if (!containerRef.current) return;

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        keymap.of([...(defaultKeymap as KeyBinding[]), ...(historyKeymap as unknown as KeyBinding[])]),
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        defaultHighlightStyle.fallback,
        highlightActiveLine(),
        javascript(),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    setEditorView(view);
  }, [containerRef]);

  return [containerRef, editorView];
};

export default useCodeMirror;
```

<span style="font-size:1.125rem;color:#27ae60;font-weight:bolder">第三步，引入 Code Mirror 的 Hook</span>

```typescript
interface Props {
  initialDoc: string;
  onChange: (doc: string) => void;
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props;

  const handleChange = useCallback((state: EditorState) => onChange(state.doc.toString()), [onChange]);
  const [containerRef, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    // if (editorView) {}
  }, [editorView]);

  return <div className="editor-wrapper" ref={containerRef} />;
};
```

<span style="font-size:1.125rem;color:#27ae60;font-weight:bolder">第四步，在 App 组件中使用 Editor 组件</span>

```typescript
const App = () => {
  const [doc, setDoc] = useState<string>("# Hello, World!\n");

  const handleDocChange = useCallback((newDoc: string) => setDoc(newDoc), []);

  return (
    <div className="editor-wrapper">
      <Editor initialDoc={doc} onChange={handleDocChange} />
    </div>
  );
};
```

## 3. 添加 Markdown 语法支持

使用 Code Mirror 最主要的目的是利用其提供的 Markdown 语法支持，并添加自定义主题。这一部分，主要就是做这个工作

<span style="font-size:1.125rem;color:#27ae60;font-weight:bolder">一、添加 codemirror相关依赖</span>

```shell
$ pnpm install @codemirror/lang-markdown@0.19.6 @codemirror/language-data@0.19.2 @codemirror/theme-one-dark@0.19.1
```

<span style="font-size:1.125rem;color:#27ae60;font-weight:normal">二、配置markdown语法支持</span>

配置markdown语法支持相对比较简单，只需要在CodeMirror的扩展中添加Markdown 的配置就可以了。不过这里除了添加markdown语法支持，也配置相关颜色方面的配置

```typescript
// use-codemirror.tsx
export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%',
  },
});

const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading2,
    fontSize: '1.4em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
]);

const extensions = [
  // ...
   markdown({
    base: markdownLanguage,
    codeLanguages: languages,
    addKeymap: true,
  }),
  oneDark,
  transparentTheme,
  syntaxHighlighting,
]
// ...
```

## 4. Markdown 实时预览

<span style="font-size:1.125rem;color:#27ae60;font-weight:bolder">一、安装依赖</span>

```shell
$ pnpm install assert process
$ pnpm install unified remark-gfm remark-parse remark-react
$ pnpm install github-markdown-css
```

在安装过之后需要在rollup的external中提出 process和assets。要想实现前面说的要求，需要借助 `builtin-modules`这个第三方包。  

```javascript
// renderer/vite.config.js
imoprt builtinModuls from 'builtin-modules';
const config = {
  rollupOptions: {
    external: [...builtinModuls.filters(m => m !== 'process' || m !== 'assets')],
  }
}
```

为了考虑系统的兼容性，需要借助 `process`这个第三方包，在window对象上添加process对象

```typescript
// renderer/src/shum.js
import process from 'process';

if (typeof global === 'undefined' || typeof global.process === 'undefined') {
  window.global = window;
  window.process = process;
}
```

在根目录下添加前面的兼容性代码

```typescript
// renderer/src/index.tsx
import './shim.js'
// ...
```

<span style="font-size:1.125rem;color:#27ae60;font-weight:bolder">二、创建预览组件</span>

```typescript
interface Props {
  doc: string;
}

const Preview: React.FC<Props> = (props) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement: React.createElement,
    })
    .processSync(props.doc).result as JSX.Element;

  return <div className="preview markdown-body">{md}</div>;
};
```

<span style="font-size:1.125rem;color:#27ae60;font-weight:bold">三、在 App 组件中引入 Preview 就可以出现实时预览的效果啦</span>

```typescript
// app/index.tsx
const App = () => {
  const [doc, setDoc] = useState<string>("# Hello, World\n");

  const handleChange = useCallback((newDoc: string) => setDoc(newDoc), []);

  return (
    <div className="app">
      <Editor initialDoc={doc} onChange={handleChange} />
      <Preview doc={doc} />
    </div>
  );
};
```

## 5. 给预览窗口添加颜色

现在虽然可以实现了实时预览的效果，但是我们发现预览页面没有颜色。下面就要做这个工作。对于文字部分我们只能通过自定义不同的样式实现样式的改变，对于代码部分我们需要知道当前代码块标记的是什么语言，然后根据特定的语言再进行相应的渲染。

<span style="font-size:1rem;color:#27ae60;font-weight:normal">一、获取当前代码的标记的语言</span>

```typescript

type RunModeCallback = (text: string, style: string | null, from: number, to: number) => void

const runmode = (textContent: string, language: Language, callback: RunModeCallback): void => {
  const tree = language.parser.parse(textContent);
  let pos = 0;
  highlightTree(tree, oneDarkHighlightStyle.match, (from, to, classes) => {
    if (from > pos) {
      callback(textContent.slice(pos, from), null, pos, from);
    }
    callback(textContent.slice(from, to), classes, from, to);
    pos = to;
  });
  if (pos !== tree.length) {
    callback(textContent.slice(pos, tree.length), null, pos, tree.length);
  }
};

export const findLanguage = (langName: string): LanguageDescription | null => {
  const i = languages.findIndex((lang: LanguageDescription) => {
    if (lang.alias.indexOf(langName) >= 0) {
      return true;
    }
  });
  if (i >= 0) {
    return languages[i];
  }
  return null;
};

export const getLanguage = async (langName: string): Promise<Language | null> => {
  const desc = findLanguage(langName);
  if (desc) {
    const langSupport = await desc.load();
    return langSupport.language;
  }
  return null;
};
```

<span style="font-size:1rem;color:#27ae60;font-weight:bolder">二、知道了语言之后就可以对当前代码块进行颜色渲染了，具体实现需要借助unfied</span>

*注：在进行渲染需要利用到 `hast-util-sanitize`定义颜色schema*

```typescript
// preview.tsx
import {defaultSchema} from 'hast-util-sanitize' 
const schema = {
  ...defaultSchema,
  attribute: {
    ...defaultSchema.attribute,
    code: [...(defaultSchema.attribute?.code || []), 'className']
  }
}

const Preview:React.FC<Props> = (props) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement: React.createElement,
      sanitize: schema, // 添加schema
      remarkReactComponents: { // 标记code颜色
        code: RemarkCode
      }
    })
    .processSync(props.doc).result as JSX.Element;

    // ....
}
```