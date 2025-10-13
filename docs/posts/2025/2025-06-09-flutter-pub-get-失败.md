---
title: flutter pub get 失败
date: 2025-06-09
description: 后运行flutter pub get 报错 Got socket error trying to find package at https://pub.dev
---

# flutter pub get 失败

> 后运行flutter pub get 报错 Got socket error trying to find package at https://pub.dev

## 概述

> 升级Windows 11 后运行flutter pub get 报错
>
> Got socket error trying to find package ## at <https://pub.dev>.  69

### 解决参考

> Flutter/Dart 使用的是 HTTPS 请求来从 `https://pub.dev` 下载依赖，而这些请求依赖系统的 DNS 解析。
>
> *   默认的中国大陆运营商 DNS（如 192.168.x.x 或本地 DNS）
> *   开启了 Clash 的 Fake IP 模式（本地 DNS 会返回 127.0.0.1 或错误 IP）

*   打开【控制面板】 →【网络和 Internet】→【更改适配器选项】

*   点击当前连接的网络（例如 “WLAN”）

*   点击【属性】

*   选择 `Internet 协议版本 4 (TCP/IPv4)` →【属性】

*   勾选【使用下面的 DNS 服务器地址】

    *   **首选 DNS 服务器：8.8.8.8**
    *   **备用 DNS 服务器：8.8.4.4**

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7f499566fe5e4068b88a29cd2c6c4f00~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112726&x-orig-sign=KM2x1DlT6uwi2Uue0jrmh0TYOVY%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0176f783417343969b8fb77bee6e17c6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112726&x-orig-sign=ibDqSIN6SSWNsLSR7kIaQxXsL58%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ab905e00a35a418e8fb8277978866c29~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112726&x-orig-sign=LpVK9aiOHeNKMG3aeNQdKnChOe0%3D)


---

*发布时间：2025-06-09*
