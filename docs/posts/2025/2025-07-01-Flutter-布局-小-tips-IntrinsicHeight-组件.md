---
title: Flutter 布局 小 tips ，IntrinsicHeight 组件
date: 2025-07-01
description: IntrinsicHeight 组件 测量所有子 widget 的自然高度，然后把它们的高度都设置为最长的那个，使得它们垂直方向对齐。
---

# Flutter 布局 小 tips ，IntrinsicHeight 组件

> IntrinsicHeight 组件 测量所有子 widget 的自然高度，然后把它们的高度都设置为最长的那个，使得它们垂直方向对齐。

## 概述


>在工作中遇见了一个布局问题，整体是横向布局，我希望的效果是高度自适应，横向布局的高度为布局中最高的那个组件作为最高的高度，同时其他组件的高度依据这个高度撑满。

例如:

```dart
Row(
  children: [
    Text("左边内容\n有两行"),
    VerticalDivider(),
    Text("右边内容"),
  ],
)
```

你会发现：

-   `VerticalDivider`（或 `Container` 的 `border.right`）**高度是根据它左右相邻 widget 的高度单独计算的**；
-   所以看起来边线没对齐、没拉满。


如果直接使用` Row` 布局设置属性  `crossAxisAlignment: CrossAxisAlignment.stretch`
如果父组件高度不固定，或者父组件是无限高度。就会导致布局有问题。 



## `IntrinsicHeight` 组件

 测量所有子 widget 的“自然高度”，然后把它们的高度都设置为最长的那个，使得它们垂直方向对齐。
 这样就可以依据子组件的高度来进行布局了。
 
 

```dart
 IntrinsicHeight(
  child: Row(
    crossAxisAlignment: CrossAxisAlignment.stretch,
    children: [
      Text("左边内容\n有两行"),
      VerticalDivider(), // 现在高度自动拉满了
      Text("右边内容"),
    ],
  ),
)
```

这时所有子项（包括 Divider）都会被拉高到与“最高的子项”一致

---

*发布时间：2025-07-01*
