---
title: flutter 状态管理的学习，关于最基本的InheritedWidget
date: 2023-07-06
description: 使用了flutter很久，觉得自己也很理解状态管理是怎么回事
---

# flutter 状态管理的学习，关于最基本的InheritedWidget

> 使用了flutter很久，觉得自己也很理解状态管理是怎么回事

## 概述

   使用了flutter很久，觉得自己也很理解状态管理是怎么回事，公司的项目中使用的是Provider这个状态管理框架。但是因为都是封装好且易用始终没有下定决心好好钻研。好了吧，现在因为自己想写一个小的属于自己的项目，才发现自己对状态管理理解的还不是很透彻，所以就从头开始吧！
    所有的状态管理都是基于flutter的 InheritedWidget 这个组件来封装的，那就从这个开始吧！
    那么假设我们想要共享的是颜色的状态，我们应该怎么管理这个颜色的状态呢？我只需要把要共享的状态放在InheritedWidget 里

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d644157348c4e02b2430b74211ea85c~tplv-k3u1fbpfcp-watermark.image?)

在不同的组件中使用了这个共享状态的颜色

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f08d6ea9ae34db7bf6d360cf7f7db57~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b5719464e4140029f634e2cd5c73f72~tplv-k3u1fbpfcp-watermark.image?)
这样只要改变颜色，这两句诗的颜色就会改变


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9ba2384669a426981213ec3db61ffa8~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a740b27a390844c9af95fe498ed9f99d~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/344dad83647845d4950f57de9a525e78~tplv-k3u1fbpfcp-watermark.image?)

这个只是组件间共享状态，跨页面的话把ColorInheritedWidget套在MaterialApp`的上层节点就可以实现跨页面去使用这个共享的颜色了。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/525cd3e4cada4b60b8db8fa9a950e86a~tplv-k3u1fbpfcp-watermark.image?)



源码 https://github.com/acsweets/diary/tree/main/lib/state_management
---

*发布时间：2023-07-06*
