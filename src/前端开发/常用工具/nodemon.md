# nodemon 配置说明

```json
{
  "verbose": true,
  "colours": true,
  "ignore": ["*.test.js", "**/fixture/**"],
  "watch": [
    "test/fixture/**/*.js", // 当文件变化时重新执行
    "*.*" // 全局监听文件变化
  ],
  "ext": "js,json,html" // 监听变化的文件
}
```

在`package.json`中配置要执行的命令

```json
{
  "scripts": {
    "start": "nodemon --exec electron ."
  }
}
```
