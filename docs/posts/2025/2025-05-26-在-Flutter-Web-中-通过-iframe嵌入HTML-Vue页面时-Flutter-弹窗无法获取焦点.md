---
title: 在 Flutter Web 中 通过 iframe嵌入HTML/Vue页面时， Flutter 弹窗无法获取焦点
date: 2025-05-26
description: 嵌入的 Vue 网页会占据渲染层的顶层 z-index，导致 Flutter Web 上的弹窗虽然渲染了，但点击事件实际上被底下的 Vue 网页抢走了。
---

# 在 Flutter Web 中 通过 iframe嵌入HTML/Vue页面时， Flutter 弹窗无法获取焦点

> 嵌入的 Vue 网页会占据渲染层的顶层 z-index，导致 Flutter Web 上的弹窗虽然渲染了，但点击事件实际上被底下的 Vue 网页抢走了。

## 概述


> 嵌入的 Vue 网页（如通过 `<iframe>`）会占据渲染层的 **顶层 z-index**，导致 Flutter Web 上的弹窗虽然渲染了，但点击事件实际上被底下的 Vue 网页抢走了。在 `iframe` 中嵌 Vue 页面时，点击 Flutter 弹窗按钮无反应，就是因为 pointer 被遮挡。

## 解决方案 
>当弹出弹窗时，找到当前的iframe 元素，修改`pointerEvents`属性值为 `'none'`
>
>弹窗关闭后再将属性值改为 `'auto'`
```dart
import 'dart:html' as html;

/// 关闭 iframe 点击（用于弹窗期间）
void disableIframeInteraction() {
  final iframe = html.document.querySelector('iframe');
  if (iframe != null) {
    iframe.style.pointerEvents = 'none';
  }
}

/// 恢复 iframe 点击（弹窗关闭后）
void enableIframeInteraction() {
  final iframe = html.document.querySelector('iframe');
  if (iframe != null) {
    iframe.style.pointerEvents = 'auto';
  }
}

```

---

*发布时间：2025-05-26*
