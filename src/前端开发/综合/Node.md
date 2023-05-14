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



