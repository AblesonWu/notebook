# 1.快捷键

| 说明               | Mac | Windows      |
| ------------------ | --- | ------------ |
| 打开最近打开的文件 |     | `Alt + R`    |
| 修改变量名         |     | `Shift + F6` |

## 自动导入

自动导入模块，自动删除没有用到的模块。

🌶️ 配置

打开 `Settings -> Editor -> General -> Auto Import`， 选中 Optimize imports on the fly 和 Add unambiguous imports on the fly

🌶️ 定义快捷键

Windows: `Ctrl + Alt + O`

## 跳转到 Navigation bar

所谓的 navigation Bar 就是当前的打开页面的面包屑导航。![image-navigation-bar](../../assets/images/img-navigation-bar.png)

对于 Windows 用户使用快捷键 `Alt + Home` 即可跳转到导航条。并选择当前导航条下的文件或方法分类

## 3. 当前文件编辑

<span style="font-size:1.25rem;color:#e74c3c;font-weight:bold;font-style:inherit">当前文件编辑</span> 指的是仅仅针对当前正在编辑的文件窗口对应的快捷键

|                                                   说明                                                    | MacOS 快捷键 | Windows 快捷键 |
| :-------------------------------------------------------------------------------------------------------: | :----------: | :------------: |
| **选中当前整个 Field.** 即指针定位到将要选中文字的任意位置，然后使用快捷键快速选中整个字段，并进行修改删除操作 |  `Ctr + G`   |                |


## 4. 分屏

分屏操作包括：竖向和横向分屏； 除了分屏之外还要设置如何在分屏之间切换的快捷键

- <span style="font-size:1rem;color:#2ecc71;font-weight:bolder;font-style:inherit">竖向切分</span> - 快捷键： `Alt + Shift + |` - 配置属性：<span style="font-size:1rem;color:#e67e22;font-weight:normal;font-style:italic">Split Right</span>

- <span style="font-size:1rem;color:#2ecc71;font-weight:bolder;font-style:inherit">横向切分</span> - 快捷键：`Alt  + |` - 配置属性：<span style="font-size:1rem;color:#e67e22;font-weight:normal;font-style:italic">Split Down</span>

- <span style="font-size:1rem;color:#2ecc71;font-weight:bolder;font-style:inherit">切换到下一个分屏</span> - 快捷键：`Alt + ]` - 配置属性：<span style="font-size:1rem;color:#e67e22;font-weight:normal;font-style:italic">Goto Next Spliter</span>

- <span style="font-size:1rem;color:#2ecc71;font-weight:bolder;font-style:inherit">切换到上一个分屏</span> - 快捷键：`Alt + [` - 配置属性：<span style="font-size:1rem;color:#e67e22;font-weight:normal;font-style:italic">Goto Previous Spliter</span>

## 5. 其他常用

### 1. 关闭Tab

关闭当前打开的文件，为了保持和Mac一直，设置为 `Alt + W`。  
配置的属性： <span style="font-size:1rem;color:#e67e22;font-weight:bolder;font-style:italic">Close Tab</span>


# 2. 美化

## 1. 隐藏行号

对于显示代码每行的行号在绝大多数的情况下是没有实际用途的，而且还会挤占代码空间，使整个编辑器不那么简洁。如果要隐藏它也是很简单的。

<span style="font-size:1.125rem;color:#e67e22;font-weight:bold">Settings -> Editor -> Appearance -> Show line numbers 取消勾选</span>

## 2. 浮动目录

使用浮动目录的灵感来自于 NeoVim。使用浮动目录窗口的好处是当查看目录目录结构时，代码编辑区域窗口的大小不用改变，从而不会分散人的注意力；同时将目录窗口移到中间，不用在大屏移动脖子。
具体设置方法如下：

<div style="margin-top: 1.2em"></div>

<span style="font-size:1.125rem;color:#e67e22;font-weight:bold;font-style:italic">打开目录窗口（快捷键：Command + 1）-> 选中该窗口右上角三个点 -> 点击 <code>View Mode</code> 选择 <code>Window</code></span>

_注意： 这里还有一个选项：`Float`，区别是：当选择 Window 时，如果用户进入目录，选择文件并按 Enter 后目录窗口会自动关闭；如果选择 Float，则目录窗口会一直打开。_


## 3. 字体

可以按照个人便好自定义字体，这里推荐使用 Cascadian Mono 字体。<a href="https://github.com/microsoft/cascadia-code" style="text-decoration:underline;color: #27ae60">https://github.com/microsoft/cascadia-code</a>

<span style="font-size:1.125rem;color:#2ecc71;font-weight:normal;font-style:inherit">1. 编辑区字体设置</span>

在Idea中的配置位置：<span style="font-size:1rem;color:#e67e22;font-weight:normal;font-style:oblique">Settings -> Editor -> General -> Font</span>

- 字体选择（Font）：`Cascadian Mono`
- 字体大小（Size）：`13.5`
- 字重（Main weight）: `Light`

<span style="font-size:1.125rem;color:#2ecc71;font-weight:normal;font-style:inherit">2. 控制台字体设置</span>

在Idea中的配置位置：<span style="font-size:1rem;color:#e67e22;font-weight:normal;font-style:oblique">Settings -> Editor -> Color Schema -> Console Font</span>


## 4. 主题

主题也可以按照个人便好自主设置，这里推荐使用 Monokao Pro Theme。 <a href="https://plugins.jetbrains.com/plugin/13643-monokai-pro-theme" style="text-decoration:underline;color: #27ae60">https://plugins.jetbrains.com/plugin/13643-monokai-pro-theme</a>


# 3. 其他常用

## 1. 激活码

```text
MXMQUYT815-eyJsaWNlbnNlSWQiOiJNWE1RVVlUODE1IiwibGljZW5zZWVOYW1lIjoiSHVuYW4gSW5zdGl0dXRlIG9mIFNjaWVuY2UgYW5kIFRlY2hub2xvZ3kiLCJhc3NpZ25lZU5hbWUiOiJqaWtlIGNvZGUiLCJhc3NpZ25lZUVtYWlsIjoiamV0YnJhaW5zMjMwMjA2QG91dGxvb2suY29tIiwibGljZW5zZVJlc3RyaWN0aW9uIjoiRm9yIGVkdWNhdGlvbmFsIHVzZSBvbmx5IiwiY2hlY2tDb25jdXJyZW50VXNlIjpmYWxzZSwicHJvZHVjdHMiOlt7ImNvZGUiOiJEUE4iLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IkRCIiwicGFpZFVwVG8iOiIyMDI0LTAyLTA5IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJQUyIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiSUkiLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJTQyIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJHTyIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiRE0iLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJTRiIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJEUyIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUEMiLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJDIiwicGFpZFVwVG8iOiIyMDI0LTAyLTA5IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJDTCIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiV1MiLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJEIiwicGFpZFVwVG8iOiIyMDI0LTAyLTA5IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSUzAiLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IlJNIiwicGFpZFVwVG8iOiIyMDI0LTAyLTA5IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJBQyIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUlNWIiwicGFpZFVwVG8iOiIyMDI0LTAyLTA5IiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IkRDIiwicGFpZFVwVG8iOiIyMDI0LTAyLTA5IiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJSU1UiLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6ZmFsc2V9LHsiY29kZSI6IkRQIiwicGFpZFVwVG8iOiIyMDI0LTAyLTA5IiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBEQiIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQV1MiLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUFNJIiwicGFpZFVwVG8iOiIyMDI0LTAyLTA5IiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBQUyIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQQ1dNUCIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQR08iLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUFBDIiwicGFpZFVwVG8iOiIyMDI0LTAyLTA5IiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBSQiIsInBhaWRVcFRvIjoiMjAyNC0wMi0wOSIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQU1ciLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUlMiLCJwYWlkVXBUbyI6IjIwMjQtMDItMDkiLCJleHRlbmRlZCI6dHJ1ZX1dLCJtZXRhZGF0YSI6IjAxMjAyMzAyMDZMUEFBMDA4MDA5IiwiaGFzaCI6IjQyNTQ5NjcyLzIwMDk1Nzk5Oi03OTk2MzgyNTgiLCJncmFjZVBlcmlvZERheXMiOjcsImF1dG9Qcm9sb25nYXRlZCI6ZmFsc2UsImlzQXV0b1Byb2xvbmdhdGVkIjpmYWxzZX0=-OXfbtL5lwz9bDhPZ0POhH6h8h1ubDm0bzkRWX33IjJlRmK4BkGzO65BWjIJ+ndT0stY8uOUWo4FM1Aej+YGXMTlyD3rcCBkcFN6dB6FEVelLYoBevxN9myhp0IGvfHaLQ6hoVxAKr0AkSAlSsgKVN6gOYw7Nn8lR/ivpuXXteZWiG4x7KCxHM/6/oPXAbQQmD1sy2q05s1tsvxBltZbsFJ3/Yv6lG89h0YlN9FvFciqUM6B1Cc5Fo7a6oUOfpyCJKPSwzyzkxLOhlL4QO6/LfQ3zNO9wirnz506mZXh3oB+wS1gDFLk7RehEQMqdqnjh+zaNKi1QKB/cyK1Op0oDTQ==-MIIETDCCAjSgAwIBAgIBDzANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTIyMTAxMDE2MDU0NFoXDTI0MTAxMTE2MDU0NFowHzEdMBsGA1UEAwwUcHJvZDJ5LWZyb20tMjAyMjEwMTAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/W3uCpU5M2y48rUR/3fFR6y4xj1nOm3rIuGp2brELVGzdgK2BezjnDXpAxVDw5657hBkAUMoyByiDs2MgmVi9IcqdAwpk988/Daaajq9xuU1of59jH9eQ9c3BmsEtdA4boN3VpenYKATwmpKYkJKVc07ZKoXL6kSyZuF7Jq7HoQZcclChbF75QJPGbri3cw9vDk/e46kuzfwpGftvl6+vKibpInO6Dv0ocwImDbOutyZC7E+BwpEm1TJZW4XovMBegHhWC04cJvpH1u98xoR94ichw0jKhdppywARe43rGU96163RckIuFmFDQKZV9SMUrwpQFu4Z2D5yTNqnlLRfAgMBAAGjgZkwgZYwCQYDVR0TBAIwADAdBgNVHQ4EFgQU5FZqQ4gnVc+inIeZF+o3ID+VhcEwSAYDVR0jBEEwP4AUo562SGdCEjZBvW3gubSgUouX8bOhHKQaMBgxFjAUBgNVBAMMDUpldFByb2ZpbGUgQ0GCCQDSbLGDsoN54TATBgNVHSUEDDAKBggrBgEFBQcDATALBgNVHQ8EBAMCBaAwDQYJKoZIhvcNAQELBQADggIBANLG1anEKid4W87vQkqWaQTkRtFKJ2GFtBeMhvLhIyM6Cg3FdQnMZr0qr9mlV0w289pf/+M14J7S7SgsfwxMJvFbw9gZlwHvhBl24N349GuthshGO9P9eKmNPgyTJzTtw6FedXrrHV99nC7spaY84e+DqfHGYOzMJDrg8xHDYLLHk5Q2z5TlrztXMbtLhjPKrc2+ZajFFshgE5eowfkutSYxeX8uA5czFNT1ZxmDwX1KIelbqhh6XkMQFJui8v8Eo396/sN3RAQSfvBd7Syhch2vlaMP4FAB11AlMKO2x/1hoKiHBU3oU3OKRTfoUTfy1uH3T+t03k1Qkr0dqgHLxiv6QU5WrarR9tx/dapqbsSmrYapmJ7S5+ghc4FTWxXJB1cjJRh3X+gwJIHjOVW+5ZVqXTG2s2Jwi2daDt6XYeigxgL2SlQpeL5kvXNCcuSJurJVcRZFYUkzVv85XfDauqGxYqaehPcK2TzmcXOUWPfxQxLJd2TrqSiO+mseqqkNTb3ZDiYS/ZqdQoGYIUwJqXo+EDgqlmuWUhkWwCkyo4rtTZeAj+nP00v3n8JmXtO30Fip+lxpfsVR3tO1hk4Vi2kmVjXyRkW2G7D7WAVt+91ahFoSeRWlKyb4KcvGvwUaa43fWLem2hyI4di2pZdr3fcYJ3xvL5ejL3m14bKsfoOv
```