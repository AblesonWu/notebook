---
typora-root-url: ./../../assets\images\flutter
typora-copy-images-to: ../../assets/images/flutter
---

VSCode 配置：

扩展插件：

- Flutter
- Dart
- Dart Data Class Generator <hzgood>



# Text

Text组件的基本使用：

```dart
const Text(String data,{
    Key key,
    TextStyle style,
    StrutStyle strutStyle,
    TextAlign textAlign,
    TextDirection textDirection,
    TextOverflow overflow,
    bool softWrap,
    double textScaleFactor,
    int maxLines,
    String semanticsLabel,
    TextWidthBasis textWidthBasis,
    TextHeightBehavior textHeightBehavior
    }
)
```



## 链接

使用Flutter 模拟HTML中的 link 标签。

```dart
RichText(
  text: TextSpan(
      text: "Don't have an account?\t",
      style: const TextStyle(color: Colors.black, fontSize: 20),
      children: [
        TextSpan(
          text: "Sign Up",
          style: TextStyle(
              color: Colors.blueAccent,
              fontSize: 20,
              decorationThickness: 1.75,
              decoration: _hover
                  ? TextDecoration.underline
                  : TextDecoration.none),
          mouseCursor: SystemMouseCursors.click,
          recognizer: TapGestureRecognizer()
            ..onTap = () => debugPrint("Sign up"),
          onEnter: (_) => setState(() => _hover = true),
          onExit: (_) => setState(() => _hover = false),
        )
      ]),
),
```

![flutter link](./flutter-link.png)

## 组合其他组件

在Text组件中添加其他组件可以借助 `WidgetSpan` 实现：

```dart
Text.rich(
  TextSpan(
    style: Theme.of(context).textTheme.bodyLarge,
    children: const [
      TextSpan(text: "Click", style: TextStyle(fontSize: 15)),
      WidgetSpan(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 1.0),
          child: Icon(Icons.add, color: Colors.red),
        ),
      ),
      TextSpan(text: '\tto add', style: TextStyle(fontSize: 25))
    ],
  ),
),
```

![image-20231010114025652](./image-20231010114025652.png)