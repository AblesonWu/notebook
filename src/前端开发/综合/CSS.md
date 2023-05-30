# 各种CSS问题

## 1. Prevent input zoom on safari

> 由于可访问性问题，如果字体设置小于16px时用户访问页面会自动方法

- [No input zoom in Safari on iPhone, the pixel perfect way](https://thingsthemselves.com/no-input-zoom-in-safari-on-iphone-the-pixel-perfect-way/)
- [16px or Large Text Prevent iOS Form Zoom](https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/#:~:text=If%20the%20font-size%20of%20an%20%3Cinput%3E%20is%2016px,wants%20you%20to%20see%20what%20you%20are%20doing.)



# CSS变量

CSS变量可以存放在任何类或属性中。CSS变量的名称必须是以`--`为前缀，它们的声明和定义跟普通的CSS样式定义一样：

```css
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}
```

在其它css代码中引用这个变量需要使用`var()`方法。

```css
a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}
```

如果你用firebug在浏览器里观察这些变量的使用，会发现被引用的变量并没有显示成它真实的值，仍然显示的是变量。

这个`var()`方法实际上可以有两个参数，第一个参数是需要引用的变量，而第二个参数是可选的，作用是如果这个变量没有找到时使用的替代值。

```css
color: var(--primary, #7F583F);
```

## 1.CSS变量的作用域

CSS变量的作用域和普通的样式属性是一样的。变量的作用范围是联级向下渗透的。比如，下面这个变量将会在整个页面生效。

```css
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}
```

而在一个CSS规则内定义的变量只会在这个规则内有效：

```css
.content {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}
```

如果你在`.content`之外的地方引用这个变量，将不会有任何效果。

## 2. 与 SASS变量比较

CSS变量和SASS变量相比有很多类似的地方，但是在某些情况下CSS变量可以实现SASS变量很难实现的功能。

> ### 1. 可以使用JavaScript控制变量的值

使用CSS变量其中一个优势就是允许我们使用JavaScript 来改变变量的值

```javascript
document.body.style.setProperty('--primary', '#7F583F');
document.body.style.setProperty('--secondary', '#F7EFD2');

// 获取根元素
var r = document.querySelector(':root');

// 创建获取变量值的函数
function myFunction_get() {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  // Alert the value of the --blue variable
  alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
}

// 创建设置变量值的函数
function myFunction_set() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--blue', 'lightblue');
}
```

只需要改动一个值，整个页面的引用了这个变量的地方的颜色都会发送变化，代码变得简洁干净。

> ### 2. 媒体查询 Media Query

在SASS里，变量在media queries无法重新定义的。比如，你希望在不同的媒体查询条件里定义不同的颜色变量，如下：

```scss
$primary: #7F583F;
$secondary: #F7EFD2;

a {
  color: $primary;
  text-decoration-color: $secondary;

  @media screen and (min-width: 768px) {
    $primary: #F7EFD2;
    $secondary: #7F583F;
  }
}
```

很可惜，这种写法在Sass里是无效的，因为Sass是一个预处理工具，无法知道这些媒体查询条件真正执行是的样子。此时，如果使用CSS变量：

```css
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}
```

这种写法是可以正确的执行，因为变量的引用是在浏览器里发生的，浏览器知道什么时候该引用哪个变量。



```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test

```

