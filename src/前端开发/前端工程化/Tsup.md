

**常用配置：**

```typescript
import {defineConfig} from 'tsup'

export default defineConfig({
  entry: ["src/index.ts"],
  treeshake: true,
  clean: true,
  minify: true,
  dts: true,
  splitting: false,
  target: "es5",
  format: [
    'cjs',
    'esm'
  ],
  external: ['react']
})
```



<span style="font-size:1.35rem; color: purple">1. 剔除依赖</span>

默认情况下tsup会将所有保存在`dependencies` 和`peerDependencies`下的依赖全部删除，而仅仅添加已经`import`的模块，你可以使用`--external <module|pkgJson>` 将模块标记为为external的。



<span style="font-size:1.35rem; color: purple">2. 生成申明文件</span>

对于Typescript文件可以使用 `--dts`在在输出结果中生成类型声明文件， 例如：`./dist/index.d.ts`。 对于多个入口文件，默认也会生成多个对应的类型声明文件。所以如果要想将多个声明文件放到一个位置，可以指明声明文件路径，例如：`--dts src/index.ts`



<span style="font-size:1.35rem; color: purple">3. 支持ES5</span>

可以使用 `--target es5` 将代码编译到es5以下的版本



<span style="font-size:1.35rem; color: purple">4. 编译时环境变量</span>

可以使用 `--env` 定义编译时环境变量， `tsup src/index.ts --env.NODE_ENV production`



<span style="font-size:1.35rem; color: purple">5. 构建CLI</span>

如果入口文件中含有hashbang， 例如 `#!/bin/env node` 则tsup会生成可执行文件

