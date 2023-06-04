[Plop](https://plopjs.com/documentation/#your-first-plopfile) 是一个代码模板生成工具。对于一个优秀的项目，结构清晰、组织一致是一个重要的考量维度。因为这样一方面为我们在开发过程中提供了一个代码组织方向，避免在多人同时开发中，因开发人员习惯不同而使整个项目过于凌乱，另一方面，方便后期维护。这时，Plop就派上了用场。利用Plop 你可以采用“最佳实践”的方法根据既定模版创建具有很高一致性的代码。这样不仅避免了你在代码库中到处复制粘贴类似代码，还将其抽取为一个通用创建工具。



**1. 总体逻辑**

plop 通过`setGenerator`创建一个模板生成器， 在生成器中需要定义当前生成器的名字，以及生成器的两个配置：

- `prompt` : 一个与用户交互的媒介，这里可以定义多个参数。当运行命令时会向用户询问多个问题。
- `actions`： 生成器具体动作都需要在这里定义

```typescript
import {NodePlopAPI} from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setGenerator();
  plop.setHelper();
  plop.setPartial();
  plop.setActionType();
  plop.setPrompt();
}
```



# 1. Main Methods

Main Methods 就是直接属于plop对象的常用方法。这些方法主要用于定义生成器，action 类型以及其他辅助方法等

| 方法            | 参数类型                    | 说明                                |
| --------------- | --------------------------- | ----------------------------------- |
| `setGenerator`  | `(string, GeneratorConfig)` | 定义一个生成器                      |
| `setHelper`     | `(string, function)`        | 在Handlebars 模板引擎使用的辅助函数 |
| `setPartial`    | `(string, string)`          | 在handlebars模板引擎中的partial     |
| `setActionType` | `(string, CustomAction)`    | 注册自定义action                    |
| `setPrompt`     | `(string, InquirerPrompt)`  | 自定义用户交互类型                  |
| `load`          | `Object`                    | 加载第三方生成器，helpers或partials |

## setHelper

`setHelper`直接对应[handlebars](https://handlebarsjs.com/guide/expressions.html#html-escaping) 中的 `registerHelper` 方法。当定义过了之后就可以在handlebars中使用

1. 定义helper 函数

```javascript
module.exports = function (plop) {
  plop.setHelper('upperCase', function (text) {
    return text.toUpperCase();
  });
}
```

2. 在handlebar中使用。（所谓的handlebar就是以`.hbs`结尾的文件）

```handlebars
{{firstname}} {{upperCase lastname}}
// lihua SMITH
```



## setPartial

`setPartial`直接对应[handlebars](https://handlebarsjs.com/guide/partials.html)中的`registerPartial` 方法。

> 你可以在Handlebar 中通过partial使用其他模板。 Partials 是普通的Handlebars模板，可以被其他模板直接使用

1. 定义partial

```javascript
module.exports = function (plop) {
  plop.setPartial('myTitlePartial', '<h1>{{totleCase name}}</h1>')
}
```

2. 在Handlebar中使用partial. 

```handlebars
{{> myTitlePartial}}
```



## setActionType

`setActionType`主要用于创建自定义的action，当默认的action type (add, addMany, modify, append)不满足需求时，就可以使用该方法创建自定义action。

创建自定义action需要提供：action 名，action配置，

```javascript
export default function (plop) {
    plop.setActionType('doTheThing', function (answers, config, plop) {
        // do something
        doSomething(config.configProp);
        // if something went wrong
        throw 'error message';
        // otherwise
        return 'success status message';
    });

    // or do async things inside of an action
    plop.setActionType('doTheAsyncThing', function (answers, config, plop) {
        // do something
        return new Promise((resolve, reject) => {
            if (success) {
                resolve('success status message');
            } else {
                reject('error message');
            }
        });
    });

    // use the custom action
    plop.setGenerator('test', {
        prompts: [],
        actions: [{
            type: 'doTheThing',
            configProp: 'available from the config param'
        }, {
            type: 'doTheAsyncThing',
            speed: 'slow'
        }]
    });
};
```



## setPrompt

Plop 借助[Inquirer](https://github.com/SBoudrias/Inquirer.js)实现与用户交互，所以所有Inquirer提供的prompt 可以直接在这里使用。尽管Inquirer为我们提供大量开箱即用prompt，但是如果这些都不满足需求时，可以使用`setPrompt`创建自定义Prompt。具体事项如下：

```javascript
import autocompletePrompt from 'inquirer-autocomplete-prompt';
export default function (plop) {
    plop.setPrompt('autocomplete', autocompletePrompt);
    plop.setGenerator('test', {
        prompts: [{
            type: 'autocomplete',
            ...
        }]
    });
};
```



## setGenerator

这个方法用于定义一个生成器，它需要两个参数：`prompt`和`actions`， `prompt`将会传递给Inquirer, 实现与用户交互，而最后会执行`action` 并创建一系列文件。

```javascript
plop.setGenerator('generator name', config);

// generator name: 在plop中可以定义多个generator，我们可以在运行时指定generator name, `plop test`
// config:
//    description: 对当前生成器的简短描述
//    prompts: []
//.   actions: []
```



# 2. Built-in Actions

## Add

> 向项目中添加一个文件

参数：

- `path`： 最终生成的文件路径
- `template`:  **Handlebars** 模板文件路径
- `templateFile`: 其他模板文件路径
- `skipIfExists`: 如果最终生成的文件已经存在，在跳过（默认：false）
- `transform`: 在生成模板之后，最终写入文件之前调用该函数
- `skip`： 函数返回结果决定是否执行action
- `force`： 是否强制执行（默认：false）
- `data`： 运行此操作时与用户提示答案混合的数据
- `abortOnFail`：如果action执行失败时，会退所有结果（默认： true）



## Add Many

> 向项目添加多个文件

参数：

- `destination`
- `base`
- `templateFiles`
- `stripExtensions`
- `globOptions`
- `verbose`
- `trasform`
- `skip`
- `skipIfExists`
- `force`
- `data`
- `abortOnFail`



```javascript
actions(answers) {
  const actions = []

  if (!answers) return actions

  const { componentName, description, outDir } = answers

  actions.push({
    type: "addMany",
    templateFiles: "plop/component/**",
    destination: `./packages/{{outDir}}/{{dashCase componentName}}`,
    base: "plop/component",
    data: { description, componentName, outDir },
    abortOnFail: true,
  })

  return actions
},
```



## Modify

`modify`操作可以通过两种方式使用。您可以使用`property`属性在位于指定`path`的文件中查找/替换文本，也可以使用`transform`函数来转换文件内容。`pattern`和`transform`可以同时使用（`transform`将最后发生）。有关修改的更多详细信息可以在示例文件夹中找到。

参数：

- `path`： 是要修改的 handlebars  template文件的路径
- `pattern`: 用于匹配应替换的文本的正则表达式
- `template`
- `templateFile`
- `transform`
- `skip`
- `data`
- `abortOnFail`

## Append

`append`操作是`transform`的常用子集。它用于在特定位置的文件中添加数据。

参数：

- `path`
- `pattern`
- `unique`
- `separator`
- `template`
- `templateFile`
- `data`
- `abortOnFail`

#  3. Built-In Helpers

- **camelCase**: changeFormatToThis
- **snakeCase**: change_format_to_this
- **dashCase/kebabCase**: change-format-to-this
- **dotCase**: change.format.to.this
- **pathCase**: change/format/to/this
- **properCase/pascalCase**: ChangeFormatToThis
- **lowerCase**: change format to this
- **sentenceCase**: Change format to this,
- **constantCase**: CHANGE_FORMAT_TO_THIS
- **titleCase**: Change Format To This