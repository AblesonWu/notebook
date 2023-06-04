# 使用Vue开发项目时常见的问题

## 1. 无法识别vue文件

在TS文件中引入Vue文件会报无法识别vue模块的错误：

```txt
Cannot find module './App.vue' or its corresponding type declarations
```

**解决：** 使用Volar替代旧插件在VSCode中可以不再显示这个错误。

1. 打开`command palette` (Ctrl + Shift + P in Windows)
2. 输入`Extensions: Show Built-in Extensions`
3. 在插件列表中可以看到`TypeScript and JavaScript Language Features`
4. 选择`Disable(workspace)` (点击`Disable`按钮右边的箭头)
5. 重新加载VSCode (在命令行窗口输入`Developer: Reload Window`)
