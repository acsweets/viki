---
title: 手搓一个跟随鼠标移动的浮窗组件
date: 2024-10-12
description: 手搓一个跟随鼠标移动的浮窗组件，浮窗会随着鼠标的移动而移动，鼠标移出区域就不再显示浮窗
---

# 手搓一个跟随鼠标移动的浮窗组件

> 手搓一个跟随鼠标移动的浮窗组件，浮窗会随着鼠标的移动而移动，鼠标移出区域就不再显示浮窗

## 概述

## 使用

> 浮窗会随着鼠标的移动而移动，鼠标移出区域就不再显示浮窗,
> 可以使用属性 `offsetRatio` 自定义浮窗相对于鼠标区域的位置。

### 代码

```dart
FollowPopup(
  width: 100,
  height: 100,
  child: Container(
      color: Colors.blueGrey,
      child: Center(
        child: Text('鼠标区域',
            style: TextStyle(), textAlign: TextAlign.center),
      )),
)
```

### 效果

![2terd-7ggm2.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/69f4021e7fb846f29cfb69691fdae1fe~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112972&x-orig-sign=gBofw%2FGGWff11xYxOskwsZscks8%3D)

## 源码

```dart
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class FollowPopup extends StatefulWidget {
  const FollowPopup({
    super.key,
    required this.child,
    required this.width,
    required this.height,
    this.follow,
    this.offsetRatio = 0.2,
  });

  final double width;
  final double height;
  final Widget child;
  final Widget? follow;

  ///浮窗相对于组件的偏移距离
  final double offsetRatio;

  @override
  State<FollowPopup> createState() => _FollowPopupState();
}

class _FollowPopupState extends State<FollowPopup> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: MouseRegion(
        cursor: SystemMouseCursors.click,
        child: widget.child,
        onHover: (PointerHoverEvent event) {
          setState(() {
            _showOverlay(context, event.position);
          });
        },
        onExit: (PointerExitEvent event) {
          _removeOverlay();
          setState(() {});
        },
      ),
    );
  }

  OverlayEntry? _overlayEntry;

  void _showOverlay(
    BuildContext context,
    Offset offset,
  ) {
    _overlayEntry?.remove();
    _overlayEntry = OverlayEntry(
      builder: (context) => Positioned(
        left: offset.dx + (widget.width * widget.offsetRatio),
        top: offset.dy - (widget.height * widget.offsetRatio),
        child: widget.follow ??
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: Colors.lightGreen),
                borderRadius: BorderRadius.circular(5),
              ),
              child: const Text(
                '浮窗示例',
                style: TextStyle(
                  color: Colors.lightGreen,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
      ),
    );

    Overlay.of(context).insert(_overlayEntry!);
  }

  void _removeOverlay() {
    _overlayEntry?.remove();
    _overlayEntry = null;
  }
}
```


*发布时间：2024-10-12*
