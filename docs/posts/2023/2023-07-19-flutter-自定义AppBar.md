---
title: flutter 自定义AppBar
date: 2023-07-19
description: 点开Scaffold 可以查看到appBar 是 PreferredSizeWidget类型
---

# flutter 自定义AppBar

> 点开Scaffold 可以查看到appBar 是 PreferredSizeWidget类型

## 概述

点开Scaffold 可以查看到appBar 是 PreferredSizeWidget类型，PreferredSizeWidget 是一个抽象类

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d022e5630b646dcb3e80f53b4d15089~tplv-k3u1fbpfcp-watermark.image?)

如果我们想修改appBar的尺寸就可以通过 preferredSize 这个抽象方法 自定义appBar的尺寸 

```dart
class MissAppBar extends StatelessWidget implements PreferredSizeWidget {
  final VoidCallback setting;

  const MissAppBar({
    Key? key,
    required this.setting,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.cyan,
      foregroundColor: Colors.orange,
      centerTitle: true,
      title: const Text("诉念"),
      actions: [
        IconButton(
          onPressed: setting,
          icon: const Icon(Icons.settings),
        )
      ],
    );
  }
  @override
  Size get preferredSize => const Size(100,100);  
  }
  ```
 
 还可以不使用AppBar  使用 PreferredSize来布局appBar 使用这个组件就可以传入自己自定义的child，拥有appBar自由，想怎么写布局都可以。
 
  ```dart
appBar: PreferredSize(
  preferredSize: const Size(200,200),
  child: Container(
    width: double.infinity,
    height: double.infinity,
    color: Colors.deepPurpleAccent.withOpacity(0.5),
    child: Row(
      children: [
        Expanded(
          child: GestureDetector(
            child: Text("返回"),
          ),
        ),
        Expanded(child: Text("  诉念")),

        GestureDetector(
          child: const Icon(
            Icons.settings,
            size: 25,
          ),
        ),
      ],
    ),
  ),
),
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39038ec2693447dab4649c28bfcb174b~tplv-k3u1fbpfcp-watermark.image?)

PreferredSize也很简单，只是继承了 StatelessWidget implements PreferredSizeWidget，
**思考PreferredSize为什么不能直接继承 PreferredSizeWidget 来修改尺寸，返回自己的appBar呢？**

当我直接继承PreferredSizeWidget 我需要复写9个上层未实现的方法，明明 PreferredSizeWidget 和 StatelessWidget 都是一样继承 widget
  
通过张老师的梦始之地的小册中介绍的抽象类的特性我们就可以知道 

小册章节==>https://juejin.cn/book/6844733827617652750/section/7142666073928630284?enter_from=course_center&utm_source=course_center

实现类必须实现上层所有未实现方法，implements是支持多实现的，所以需要覆写全部方法，不然调用中可能出现歧义，当我继承StatelessWidget 再 implements PreferredSizeWidget 只需要实现一个抽象方法

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/218b4587fe264521aaf2463ec2708789~tplv-k3u1fbpfcp-watermark.image?)

因为在StatelessWidget内部已经帮我实现了其他的抽象方法，

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f82e561eb81f49af9f93b32b4bc59f3e~tplv-k3u1fbpfcp-watermark.image?)
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61af1c2d2ee241509ce6c9f3371d3eea~tplv-k3u1fbpfcp-watermark.image?)




---

*发布时间：2023-07-19*
