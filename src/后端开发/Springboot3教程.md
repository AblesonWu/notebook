# 1. JDK 新特性

Springboot 3 默认支持Java17. 

## 1.2 Record

Record 是一种特殊类型的Java类，可用来创建不可变类型。有如下优势：

- 带有全部参数的构造方法
- public 访问器
- toString, hasCode, equals
- 无 get, set 方法
- 不可变类
- final 属性，不可更改

### 1. Record的构造方法

可以在Record中添加构造方法，有三种类型的构造方法分类：

- 紧凑型构造方法：没有任何参数，甚至没有括号
- 规范型构造方法：以所有成员作为参数
- 定制构造方法：自定义参数个数