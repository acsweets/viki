---
title: Flutter 如何实现一个边线按钮
date: 2024-11-17
description: 最近看到 tolyui 中有个虚线按钮，比较有意思。想看看它的源码实现。
---

# Flutter 如何实现一个边线按钮

> 最近看到 tolyui 中有个虚线按钮，比较有意思。想看看它的源码实现。

## 概述



最近看到 [tolyui](https://github.com/TolyFx/toly_ui) 中有个虚线按钮，比较有意思。就想看看它的源码实现。写篇小文章，记录一下学习的过程：


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5feb419e4e934a18800fc307774d04f5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=912&h=94&s=6399&e=png&b=ffffff)

---

#### 1. 按钮的装饰边线

代码里用了 ElevatedButton 组件，用 OutlineButtonPalette 呈现圆角的虚线效果。这里虚线的秘密应该是 step 和 span 的作用：

```dart
ElevatedButton(
  onPressed: () {},
  style: OutlineButtonPalette(
    borderPalette: border,
    foregroundPalette: foreground,
    borderRadius: BorderRadius.circular(20),
    step: 2,
    span: 2,
    backgroundPalette: bg,
  ).style,
  child: Text("Cancel"),
),
```

---

来看看这个属性在 OutlineButtonPalette 的作用：可以看出，在 dashGap 为 0 时，会使用 RoundedRectangleBorder 圆角矩形边线形状。反之会用 DashOutlineShapeBorder 边线形状。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f869daa17b8648f09f1415819ed0cb6d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=577&h=265&s=34860&e=png&b=fffefe)

再看一下，这个形状是他自定义的形状，原来形状还能自定义啊，真好玩。 DashOutlineShapeBorder 继承自 OutlinedBorder ，在构造函数中传入边线、圆角、虚线配置等数据：

```dart
class DashOutlineShapeBorder extends OutlinedBorder {
  const DashOutlineShapeBorder({
    super.side,
    this.borderRadius = BorderRadius.zero,
    required this.step,
    required this.span,
  });
```

---

#### 2. 自定义装饰的绘制

里面最重要的是复写了 paint 方法，这里画什么，按钮就能展示什么边线；绘制过程中需要的参数，由构造方法传入。getOuterPath 方法可以得到边线的路径，最后通过 DashPainter 进行绘制，这样就能得到虚线边框了：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3ddb7170091469581b53bfd14087f90~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=840&h=101&s=5928&e=png&b=ffffff)

```dart
@override
void paint(Canvas canvas, Rect rect, {TextDirection? textDirection}) {
  final Paint paint = Paint()
    ..style = PaintingStyle.stroke
    ..strokeWidth = side.width
    ..color = side.color;
  Path path = getOuterPath(rect);
  DashPainter(step: step, span: span).paint(canvas, path, paint);
}

@override
Path getInnerPath(Rect rect, {TextDirection? textDirection}) {
  final RRect borderRect = borderRadius.resolve(textDirection).toRRect(rect);
  final RRect adjustedRect = borderRect.deflate(side.strokeInset);
  return Path()..addRRect(adjustedRect);
}

@override
Path getOuterPath(Rect rect, {TextDirection? textDirection}) {
  return Path()..addRRect(borderRadius.resolve(textDirection).toRRect(rect));
}

@override
void paintInterior(Canvas canvas, Rect rect, Paint paint, {TextDirection? textDirection}) {
  if (borderRadius == BorderRadius.zero) {
    canvas.drawRect(rect, paint);
  } else {
    canvas.drawRRect(borderRadius.resolve(textDirection).toRRect(rect), paint);
  }
}
```

---


#### 3. 怎么实现虚线的绘制

这里的源码很简单，DashPainter 就像一个简单的配置类，step 和 span 分别是实线长和空格长。绘制过程中，主要使用 path.computeMetrics 方法测量路径：  
PathMetric 对象可以通过 extractPath 方法截取指定长度的路径，拿到路径就可以使用 canvas drawPath 绘制路径。这里计算出总的段数，然后遍历绘制每个分段就行了：

```dart
// [step] the length of solid line 每段实线长
// [span] the space of each solid line  每段空格线长
class DashPainter {
  const DashPainter({
    this.step = 2,
    this.span = 2,
  });

  final double step;
  final double span;

  void paint(Canvas canvas, Path path, Paint paint) {
    final PathMetrics pms = path.computeMetrics();
    final double pointLineLength = paint.strokeWidth;
    final double partLength = step + span;

    for (PathMetric pm in pms) {
      final int count = pm.length ~/ partLength;
      for (int i = 0; i < count; i++) {
        canvas.drawPath(
          pm.extractPath(partLength * i, partLength * i + step),
          paint,
        );
      }
      final double tail = pm.length % partLength;
      canvas.drawPath(pm.extractPath(pm.length - tail, pm.length), paint);
    }
  }
}
```

---

#### 4. 怎么把代码偷出来

了解了原理以后，就非常简单了，其实就是自定义了一个边线形状。如果不想用 tolyui ，只是简单实现一个虚线边线按钮。直接把 DashOutlineShapeBorder 拷贝出来，在 ElevatedButton 构造时通过 shape 指定边线形状为 DashOutlineShapeBorder 即可。tolyui 只是提供了 OutlineButtonPalette 帮助调色，形成 style 而已，并不是非常复杂 


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b958916ae4184342a66b7553da51573f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=988&h=97&s=3750&e=png&b=ffffff)

```dart
ElevatedButton(
  style: ElevatedButton.styleFrom(
      backgroundColor: Colors.white,
      foregroundColor: Colors.blue,
      shape: DashOutlineShapeBorder(
          step: 4,
          span: 2,
          borderRadius: BorderRadius.circular(6),
          side: BorderSide(color: Colors.blue))),
  onPressed: () {},
  child: Text('星星sweet'),
),
```

不止是按钮的边线，任何有 shape 字段的组件都可以通过这种方式来处理虚线边线。甚至还可以自定义装饰对象，使用这个里的绘制边线的小技巧即可。

*发布时间：2024-11-17*
