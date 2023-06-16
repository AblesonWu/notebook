### 判空处理

在Java中判空是常见的行为，而一般的判空处理是使用if else 语句；这种用法使用多了后会使代码非常恶心。在Java 8 提供了Optinal 方法可以一定程度上简化这种操作。

```java
String message = "Hello, world!";

// 首先判断message是否为空，如果为空这赋值为“”，然后执行replace操作
String str = Optional.ofNullable(message).orElse("").replaceAll("(?<!^).", "*");
// 首先判断message是否为空，如果不为空者执行replace，否则复制为“null”
String str1 = Optional.ofNullable(message).map(e -> e.replaceAll("(?<!^).", "*")).orElse("null");
```