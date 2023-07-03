# 背景知识

## 1. 学习资源

<span style="font-size:1.25rem;color:#2ecc71;font-weight:bolder;font-style:italic">一、文档</span>

1. <a href="https://www.devbean.net/2012/08/qt-study-road-2-catelog/" style="text-decoration:underline;color: #27ae60">博客：学习之路2</a>
2. <a href="https://www.bookstack.cn/read/QmlBook-In-Chinese/README.md" style="text-decoration:underline;color: #27ae60">QML book 中文版</a>
3. <a href="https://www.bookstack.cn/read/qt-study-road-2/ddf84b4ac149953f.md" style="text-decoration:underline;color: #27ae60">Qt 学习之路2</a>
4. <a href="http://www.cleartechfei.com/tag/qt/" style="text-decoration:underline;color: #27ae60">Qt 打包</a>

<span style="font-size:1.25rem;color:#2ecc71;font-weight:bolder;font-style:italic">二、英文文档</span>

1. <a href="https://riptutorial.com/qml" style="text-decoration:underline;color: #27ae60">QML Tutorial: 简单使用</a>

<span style="font-size:1.25rem;color:#2ecc71;font-weight:bolder;font-style:italic">二、项目实战</span>

1. <a href="https://www.hyz.cool/articles/185" style="text-decoration:underline;color: #27ae60">Qt QML 项目实战 -- Cloud Music Player</a>
2. <a href="https://www.hyz.cool/articles/178" style="text-decoration:underline;color: #27ae60">Qt 项目实战 -- 代码编辑器</a>


## 2.使用Clion搭建项目

在代码提示和编辑器熟悉程度方面，Clion都比Qt Creator 方便一大截，所以这里更加倾向于使用Clion作为主要开发工具。另外从2023.1 版本开发Clion已经默认提供了对QML的支持，虽然目前使用上还是有很多不足，但是也在积极完善当中。

1. 使用Clion开发之前需要创建cmake项目，这里比较重要的是需要指明qt的路径

```cmake
cmake_minimum_required(VERSION 3.25)
project(FramelessWindow)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

# 需要说明qt的路径
set(CMAKE_PREFIX_PATH "/Users/ranwu/Softwares/qt/6.5.1/macos")
find_package(Qt6 REQUIRED COMPONENTS Quick)
include_directories(${PROJECT_SOURCE_DIR})

add_executable(${PROJECT_NAME} main.cpp qml.qrc QuickFramelessWindow.cpp)
target_link_libraries(${PROJECT_NAME} Qt6::Quick)
```

2. 下面需要确定 qml文件资源。具体是在跟路径下创建`qml.qrc` 文件

```xml
<RCC>
    <qresource prefix="">
        <file>Main.qml</file>
        <file>MyButton.qml</file>
        <file>ClickableImage</file>
    </qresource>
</RCC>
```

3. 创建项目入口 `main.cpp`

```cpp
#include <QGuiApplication>
#include <QQmlApplicationEngine>

int main(int argc, char *argv[]) {
    QGuiApplication app(argc, argv);
    QQmlApplicationEngine engine;

    const QUrl url(u"qrc:/Main.qml"_qs);

    QObject::connect(&engine,
                     &QQmlApplicationEngine::objectCreationFailed,
                     &app,
                     []() { QCoreApplication::exit(-1); },
                     Qt::QueuedConnection);
    engine.load(url);

    return QGuiApplication::exec();
}
```

4. 创建QML入口程序

```qml
import QtQuick
import QtQuick.Window

Window {
    height: 480
    title: qsTr("Hello World")
    visible: true
    width: 640

    Text {
        id: status

        height: 26
        horizontalAlignment: Text.AlignHCenter
        text: "waiting..."
        width: 116
        x: 12
        y: 76
    }
}
```