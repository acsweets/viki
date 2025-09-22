---
title: 在Flutter 项目中添加 iconfont
date: 2024-07-04
description: 使用阿里素材的库的图标 使用 ttf 把选好的图标加入项目中，打包下载。
---

# 在Flutter 项目中添加 iconfont

> 使用阿里素材的库的图标 使用 ttf 把选好的图标加入项目中，打包下载。

## 概述

## 使用阿里素材的库的图标

[阿里素材的库](https://www.iconfont.cn/)

## 使用 ttf

#### 把选好的图标加入项目中，打包下载。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6853b595be8946eeb1393109ea61e8e6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1259&h=425&s=61798&e=png&b=fbfbfb)

#### 使用解压后文件的`ttf`文件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a5aa9c386424789a82be39bceb7fc39~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=405&h=148&s=16389&e=png&b=fdfdfd)


#### 在 `json`文件中可以查看每个图标的信息

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e71c4ab94d9c47578d23ee286e7505f7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=457&h=207&s=23076&e=png&b=fffefe)


#### `html` 文件中可以查看图标和 iconde更详细的信息

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e44a5ba8a70a401495815138ed14e31d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=864&h=321&s=29695&e=png&b=ffffff)



## Flutter 中

####  在项目中新建一个`assest`文件夹， 把`ttf` 文件放进去。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0e16a4b6b8448078a3d7e981b3339ff~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=478&h=82&s=14223&e=png&b=414446)


#### 在 `yaml` 导入这个资源文件
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/88c5bd0691974e8fb4c9f37ff5a79436~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=870&h=323&s=196990&e=png&b=403d3c)

#### 新建一个文件把所有的图标放在一起方便使用。一个一个使用太散乱

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef355931ca7a4e5db00e21fa47aca1aa~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1131&h=550&s=450763&e=png&b=3d3a39)


#### 使用

```
Icon(IconData(0xeadb, fontFamily: "LilacIcon")),
Icon(LilacIcon.appround15),
```


---

*发布时间：2024-07-04*
