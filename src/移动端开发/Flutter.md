---
typora-copy-images-to: ../../assets/images/flutter
---

VSCode 配置：

扩展插件：

- Flutter
- Dart
- Dart Data Class Generator <hzgood>

# link

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

![flutter link](../../assets/images/flutter/flutter-link.png)