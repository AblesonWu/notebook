# Webpack相关教程

> **SVG**

- [SVG config in webpack](https://dev.to/smelukov/webpack-5-asset-modules-2o3h)

- [SVGR](https://react-svgr.com/docs/webpack/)

## 环境变量

利用`dotenv`配置环境变量，并利用插件`dotenv-webpack`将环境变量的配置过程集成到webpack中

**1.** `dotenv` 的具体使用

- 首先安装`dotenv`:    `npm install dotenv -D`

- 配置使用

  ```javascript
  const dotenv = require('dotenv');
  const path = require('path');
  
  const envConfPath = {
    dev: path.resolve(__dirname, './env/.env.dev'),
    test: path.resolve(__dirname, './env/.env.test'),
    prod: path.resolve(__dirname, './env/.env.prod'),
  };
  
  const envConf = dotenv.config({
    path: envConfPath[process.env.ENV],
    encoding: 'utf8',
    debug: false,
    override: true,
  }).parsed;
  
  if (!envConf) {
    // eslint-disable-next-line no-console
    console.log('[doten] no such file or directory: ', envConfPath[process.env.ENV]);
    process.exit(1);
  }
  
  console.log('==> config:', envConf);
  ```

这种方式会以健值对的方式将所有配置参数返回给用户，这时可以利用webpack中提供的DefinePlugin方法配置到环境变量中。
这种方式和使用插件`dotenv-webpack` 达到的效果是一样的。具体配置方式如下：

```javascript
const webpack = require('webpack');

// 和上面的方法相同获取到配置参数
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envConf),
    })
  ]
}
```

**2.** 利用`doting-webpack` 将配置过程放到webpack中

```javascript
const dotenv = require('dotenv');
const path = require('path');
const DotenvWebpack = require('dotenv-webpack');

const envConfPath = {
  dev: path.resolve(__dirname, './env/.env.dev'),
  test: path.resolve(__dirname, './env/.env.test'),
  prod: path.resolve(__dirname, './env/.env.prod'),
};

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../index.js'),
  plugins: [
    new DotenvWebpack({
      path: envConfPath[process.env.ENV || 'test'],
    }),
  ],
};

```

现在在项目中就可以直接使用环境变量而不需要额外的动作
