---
title: flutter开发web平台小技巧
date: 2025-05-09
description: WEB打包发布之子自定义BASE_HREF,Flutter 项目中打包的 AssetManifest.json 文件, html获取dom
---

# flutter开发web平台小技巧

> WEB打包发布之子自定义BASE_HREF,Flutter 项目中打包的 AssetManifest.json 文件, html获取dom

## 概述
## WEB打包发布之子自定义BASE_HREF

  > 在web  `index.html` 文件中使用`FLUTTER_BASE_HREF`设置动态的 `base href`
  >`$FLUTTER_BASE_HREF` 作为占位符。在打包时，通过命令行替换。

```js
<base href="$FLUTTER_BASE_HREF">
```

 > 那么在打包时需要传入对应的 `base href`

`flutter build web --base-href /my-web/`

在 **本地开发** (`flutter run -d chrome`) 的时候，`base href` 是 `/`

在 **独立域名部署**（比如自己服务器）也能直接用 `/` 。


## Flutter 项目中打包的 `AssetManifest.json` 文件

>在 Flutter 中，`AssetManifest.json` 是一个自动生成的文件，用于记录你在 `pubspec.yaml` 中声明的所有
>资源（assets）。该文件会在构建时由 Flutter 构建系统生成，其内容是一个 JSON 对象，映射了所有资源的路径。

### 获取方法

```dart
final jsonString = await rootBundle.loadString('AssetManifest.json');
```

## 自己管理路由，不依赖服务器配置

>HashUrlStrategy（有 #）    
> 访问地址 `https://xxx.com/#/path`   刷新时不发真正 HTTP 请求
  
>PathUrlStrategy（无 #）        
>访问地址  `https://xxx.com/path`  发起 HTTP 请求 `/path`需要服务器正确配置。

### 使用 HashUrlStrategy

``` dart
void main() {
  setUrlStrategy(const HashUrlStrategy());
  runApp(const MyApp());
}
```


## html获取dom
 
 `html.document.title`
 

`html.window.location.hostname` 
获取的是 **当前网页的主机名**，也就是 **域名部分**，不带端口、不带协议。


>当前网页地址 (`window.location.href`)  例如 `https://example.com` 
>
>`window.location.hostname` 返回 `example.com`


## dart 和 js 双向通讯


```dart
class WebBridgeService {
  static void setup() {
    html.window.setProperty('navTo'.toJS, _navTo.toJS);
  }

  static void _navTo(String path) {
    Get.toNamed(path);
  }

  static void notifyJs(String event, [dynamic data]) {
    final jsFunc = html.window.getProperty('flutterNotify'.toJS);
    if (jsFunc != null && jsFunc is JSFunction) {
      jsFunc.callAsFunction(event.toJS, data?.toJS);
    }
  }
}
```



```js
window.flutterNotify = function (event, data) {
  console.log('Flutter通知到我了!', event, data);
}

```


### Dart   `await` JS 的返回

dart调用js的代码

```dart
Future<dynamic> callJsFunctionWithResult(String functionName, List<dynamic> args) async {
  final jsFunc = html.window.getProperty(functionName.toJS);

  if (jsFunc != null && jsFunc is JSFunction) {
    final jsResult = jsFunc.callAsFunction(args.map((e) => e.toJS).toList());

    // 这里转换Promise为Future
    final dartResult = await js_util.promiseToFuture(jsResult);

    return dartResult;
  } else {
    throw Exception('JS function $functionName not found.');
  }
}

Future<void> askUserConfirm() async {
  try {
    final result = await callJsFunctionWithResult('openConfirmDialog', ['是否确认删除？']);
    if (result == true) {
      print('用户点击了确认');
    } else {
      print('用户取消了');
    }
  } catch (e) {
    print('调用 JS 失败: $e');
  }
}


```



js 部分的 Promise函数代码

```js
window.openConfirmDialog = function (message) {
  return new Promise(function (resolve, reject) {
    const confirmed = window.confirm(message);
    resolve(confirmed);  // 用户确认 -> true，取消 -> false
  });
}

```

## 浏览器自带的本地持久化存储

`key-value`（键值对）形式的本地数据库，**存储在用户浏览器硬盘上**。


-   **本地存储**，保存在浏览器里，不传到服务器
-   **长期有效**，关闭网页、关闭浏览器、重启电脑都还在
-   **同步访问**，操作简单，像用 Map 字典一样



```dart
import 'dart:html' as html;

// 保存数据
html.window.localStorage['token'] = 'abc123';

// 读取数据
String? token = html.window.localStorage['token'];

// 删除单个数据
html.window.localStorage.remove('token');

// 清空所有
html.window.localStorage.clear();
```


---

*发布时间：2025-05-09*
