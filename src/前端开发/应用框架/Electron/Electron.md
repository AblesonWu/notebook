# 概述

## 桌面端开发的技术选型

1. Native （C++/C#/Objective-C）

   优点： 高性能/原生体验/包体积小

   缺点： 门槛高/迭代速度慢

2. QT

   优点：基于 C++/跨平台/高性能/媲美原生体验

   缺点：门槛高/迭代速度慢

3. Fltter

   优点：跨平台

   缺点：PC 端在发展中/基建少

4. NW.js

   优点：跨平台/迭代速度快/源码加密/社区

   缺点：包体积大/性能一般

5. Electron

   优点：跨平台/Web 技术构建/活跃的社区/大型应用案例

   缺点：包体积大/性能一般

|          |                     Electron                     |             Native              |                 QT                  |                        NW                        |
| :------: | :----------------------------------------------: | :-----------------------------: | :---------------------------------: | :----------------------------------------------: |
|   性能   |                       ✔️                       |          ✔️✔️✔️           |              ✔️✔️               |                       ✔️                       |
|  安装包  |                       ✔️                       |          ✔️✔️✔️           |                ✔️                 |                       ✔️                       |
| 原生体验 |                       ✔️                       |          ✔️✔️✔️           |              ✔️✔️               |                       ✔️                       |
|  跨平台  |                   ✔️✔️✔️                   |               ❌                |            ✔️✔️✔️             |                   ✔️✔️✔️                   |
| 开发效率 |                   ✔️✔️✔️                   |              ✔️               |              ✔️✔️               |                   ✔️✔️✔️                   |
| 人才储备 |                   ✔️✔️✔️                   |            ✔️✔️             |              ✔️✔️               |                   ✔️✔️✔️                   |
|   社区   |                   ✔️✔️✔️                   |            ✔️✔️             |                ✔️                 |                     ✔️✔️                     |
| 使用场景 | 跨平台应用 <br />前端技术栈 <br />quick delivery | 专业应用 <br />best performance | 跨平台应用 <br />better performance | 跨平台应用 <br />quick delivery <br />前端技术栈 |


## 进程通信

Electron采用的是多进程架构，包括主进程和渲染进程；其中渲染进程由主进程创建，而进程间通信通过IPC来完成。

<span style="font-size:1.125rem;color:#e67e22;font-weight:bolder;font-style:inherit">1. Electron 渲染进程</span>

引入模块，各进程直接在electron模块引入即可

```javascript
const {app, BrowserWindow} = require('electron');
const {ipcRenderer} = require('electron');  // 渲染进程引入ipcRenderer

ipcRenderer.invoke(channel, ...args).then(result => {handleResult}); // 渲染进程向主进程发送请求
```

<span style="font-size:1.125rem;color:#e67e22;font-weight:bolder;font-style:inherit">2. Electron 主进程</span>

app, 用于控制应用声明周期

BrowserWindow，用于创建和控制窗口

```javascript
const win = new BrowserWindow({width, height, ...}); // 创建窗口，并设置宽高
win.loadURL(url);
win.loadFile(path)
```

Notification, 创建Notification

```javascript
const notification = new Notification({title, body, action: [{text, type}]});
notification.show();
```

`ipcMain.handle(channel, handler)`, 处理渲染进程的channel请求，在handler中return返回结果

