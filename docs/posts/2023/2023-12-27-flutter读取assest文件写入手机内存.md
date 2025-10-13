---
title: flutter读取assest文件写入手机内存
date: 2023-12-27
description: 加载assest中的资源文件 资源文件需要在 pubspec.yarm文件中声明
---

# flutter读取assest文件写入手机内存

> 加载assest中的资源文件 资源文件需要在 pubspec.yarm文件中声明

## 概述
## 1、加载assest中的资源文件 

资源文件需要在 `pubspec.yarm`文件中声明

```pubspec.yarm

assets:
  - assets/bundle
 
```

通过加载`rootBundle.load`方法加载 `assest`中的资源文件 

```dart

ByteData data = await rootBundle.load(path.join("assets/bundle/lib_modules.js"));
List<int> bytes = data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);

```

获取手机内部文件目录

```dart

final directory = await getApplicationDocumentsDirectory();

```

将资源数据写入路径下新建的 `test.js` 文件夹

```dart
String filePath ='${directory.path}/test.js';
await File(filePath).writeAsBytes(bytes);
```

判断文件是否存在，使用 `File` 的 `exists` 方法


```
var fileExists = await File(filePath).exists();
```



然后拿到这个写入的文件的路径`filePath`就可以进行操作了




---

*发布时间：2023-12-27*
