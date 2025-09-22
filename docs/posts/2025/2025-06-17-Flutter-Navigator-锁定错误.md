---
title: Flutter Navigator 锁定错误
date: 2025-06-17
description: 导航跳转时提示报错 Assertion failed
---

# Flutter Navigator 锁定错误

> 导航跳转时提示报错 Assertion failed

## 概述

导航跳转时提示报错
> Assertion failed: >file:///D:/sdk/flutter/packages/flutter/lib/src/widgets/navigator.dart:4536:12
>!_debugLocked is not true

### 报错原因：

`Navigator` 内部在处理一次导航（比如 `push` 或 `pop`）时，会将其锁定（`_debugLocked = true`），直到该导航操作完成。

你看到这个错误说明：

> 在正在执行 `push`、`pop`、`pushReplacement` 等操作期间，又触发了新的导航请求。

例如，**可能触发这个报错情形**

#### 在 `build()` 过程中触发导航

```
dart
@override
Widget build(BuildContext context) {
  Navigator.pushNamed(context, '/home'); // ❌ 错误：build 过程中导航
  return Container();
}
```

####  在 `showDialog` 弹窗中，点完按钮马上调用 `Navigator.pop` 和 `Navigator.push`

```
dart
onPressed: () {
  Navigator.pop(context); // 弹窗关闭
  Navigator.pushNamed(context, '/next'); // ❌ 同步立即 push，会报错
}
```

* * *

###  解决方法

#### 使用 `Future.microtask` / `WidgetsBinding.instance.addPostFrameCallback`

推迟导航操作，等当前帧绘制完毕：

```
dart
WidgetsBinding.instance.addPostFrameCallback((_) {
  Navigator.pushNamed(context, '/home');
});
```

或者：

```
dart
Future.microtask(() {
  Navigator.pushNamed(context, '/home');
});
```

* * *

#### 在 `await` 弹窗关闭之后再导航

```
dart
onPressed: () async {
  Navigator.pop(context); // 关闭弹窗
  await Future.delayed(Duration(milliseconds: 300)); // 等一会儿再导航
  Navigator.pushNamed(context, '/next');
}
```


---

*发布时间：2025-06-17*
