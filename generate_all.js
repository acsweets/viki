const fs = require('fs');

// 手动解析所有文章数据
const articles = [
  { title: "Flutter 布局 小 tips ，IntrinsicHeight 组件", brief_content: "IntrinsicHeight 组件 测量所有子 widget 的自然高度，然后把它们的高度都设置为最长的那个，使得它们垂直方向对齐。", mtime: 1751362672 },
  { title: "插件 stomp_dart_client 简单使用", brief_content: "插件 stomp_dart_client 简单使用 初始化StompClient 链接 订阅服务信息", mtime: 1750928823 },
  { title: "Flutter Navigator 锁定错误", brief_content: "导航跳转时提示报错 Assertion failed", mtime: 1750141337 },
  { title: "flutter pub get 失败", brief_content: "后运行flutter pub get 报错 Got socket error trying to find package at https://pub.dev", mtime: 1749449072 },
  { title: "在 Flutter Web 中 通过 iframe嵌入HTML/Vue页面时， Flutter 弹窗无法获取焦点", brief_content: "嵌入的 Vue 网页会占据渲染层的顶层 z-index，导致 Flutter Web 上的弹窗虽然渲染了，但点击事件实际上被底下的 Vue 网页抢走了。", mtime: 1748250104 },
  { title: "flutter开发web平台小技巧", brief_content: "WEB打包发布之子自定义BASE_HREF,Flutter 项目中打包的 AssetManifest.json 文件, html获取dom", mtime: 1746772218 },
  { title: "flutter 路由跳转动画设置", brief_content: "路由动画设置 如何设置flutter路由动画，以及如何自定义路由动画。页面退出动画和新页面进入动画自定义", mtime: 1745305160 },
  { title: "Flutter 如何实现一个边线按钮", brief_content: "最近看到 tolyui 中有个虚线按钮，比较有意思。想看看它的源码实现。", mtime: 1731818769 },
  { title: "设计模式小案例之单例", brief_content: "单例模式的两种创建方式 懒汉模式 优点 缺点 实例 饿汉模式 优点 缺点 实例", mtime: 1729577549 },
  { title: "手搓一个跟随鼠标移动的浮窗组件", brief_content: "手搓一个跟随鼠标移动的浮窗组件，浮窗会随着鼠标的移动而移动，鼠标移出区域就不再显示浮窗", mtime: 1728726982 },
  { title: "使用 Github Action 完成Flutter的Web部署", brief_content: "如何使用Action创建自己想要的 workflows ？ 在Github上打开你的仓库找到Action条目", mtime: 1721359802 },
  { title: "在Flutter 项目中添加 iconfont", brief_content: "使用阿里素材的库的图标 使用 ttf 把选好的图标加入项目中，打包下载。", mtime: 1720085503 },
  { title: "Flutter知识梳理 布局篇《三》", brief_content: "Flutter 中自定义多子布局 CustomMultiChildLayout 中也是通过代理类进行自定义布局逻辑的", mtime: 1716454554 },
  { title: "Flutter知识梳理 布局篇《二》", brief_content: "布局中的单子组件，以及单子组件的作用。单子布局组件 ConstrainedBox (限制宽高)", mtime: 1716198668 },
  { title: "Flutter知识梳理 布局篇《一》", brief_content: "布局中的紧约束 ，在Flutter中使用Stack定位组件，使用Positioned 的左右定位属性设置为 0", mtime: 1715913744 },
  { title: "使用Flutter 完成我的静态博客（一）构思界面", brief_content: "一直都想写一个自己的博客，因为Flutter能够支持web，就还挺方便的。", mtime: 1714184056 },
  { title: "flutter 升级3.19 后 gradle 迁移", brief_content: "flutter 3.19 后 gradle 迁移 You are applying Flutter's main Gradle plugin imperatively using", mtime: 1714445059 },
  { title: "安卓开发 Jetpack Compose 的状态管理", brief_content: "为什么会有状态管理 因为UI界面并不是一成不变的，所以需要在数据状态发生变化时更新界面", mtime: 1714111252 },
  { title: "安卓开发 Jetpack Compose 之（不同版本的）底部导航栏", brief_content: "实现 Flutter && XML && Compose 三个不同版本的底部导航栏切换。", mtime: 1714013976 },
  { title: "安卓开发 Jetpack Compose 之导航篇（页面跳转）", brief_content: "Android 中不同版本页面跳转的实现，Java -xml 和kotlin -Jetpack Compose", mtime: 1713869093 },
  { title: "如何使用 Figma 设计一个自己的专属图标or Logo", brief_content: "作为一个移动开发是否也会经常苦恼找不到自己心中想要的图标设计", mtime: 1713431201 },
  { title: "Flutter 中禁用系统的返回", brief_content: "使用 PopScope 小组件。这个小组件可以拦截系统的返回按钮事件", mtime: 1713177885 },
  { title: "Flutter与原生通讯的三种方式的异同", brief_content: "BasicMessageChannel 使用的 codec 类型是MessageCodec类编码解码器", mtime: 1711098622 },
  { title: "Flutter 中路由的理解", brief_content: "本质是通过 NavigatorState#_pushEntry 方法推入一个 _RouteEntry", mtime: 1710492835 },
  { title: "fair 的一些配置", brief_content: "自己的烂笔头 他人看不懂 莫看 main 入口 runApp(const MyApp()); 修改为 自定义的js解析器", mtime: 1704357478 },
  { title: "flutter读取assest文件写入手机内存", brief_content: "加载assest中的资源文件 资源文件需要在 pubspec.yarm文件中声明", mtime: 1703672674 },
  { title: "dart 导入库的那些小事", brief_content: "dart 导入库的关键字的那些小事，import ，export，hide，show ，as", mtime: 1702977025 },
  { title: "flutter自定义底部导航栏", brief_content: "想做个有意思的底部导航栏， 简单的底部导航栏 效果", mtime: 1692174733 },
  { title: "getx 实现全局字体切换", brief_content: "很喜欢一些好看的字体，所以找了一些免费的字体，最近学了getx这个框架就想做一下项目内的字体切换", mtime: 1691662162 },
  { title: "flutter 中 sqlite 数据库初体验 如何查看手机中存的数据库", brief_content: "导入 在 yaml文件中加入sqlite插件 开始 新建模型类 打开数据库 && 建表", mtime: 1691044263 },
  { title: "在flutter使用realm", brief_content: "导入 在pubspec.yaml文件中 创建 在创建数据的对象时，可以用PrimaryKey标志主键。", mtime: 1691567115 },
  { title: "flutter 自定义AppBar", brief_content: "点开Scaffold 可以查看到appBar 是 PreferredSizeWidget类型", mtime: 1689749306 },
  { title: "flutter在android中启用前台服务使用插件flutter_foreground_task", brief_content: "利用插件flutter_foreground_task 简单使用前台服务", mtime: 1690796264 },
  { title: "flutter 状态管理的学习，关于最基本的InheritedWidget", brief_content: "使用了flutter很久，觉得自己也很理解状态管理是怎么回事", mtime: 1688611915 }
];

// 按时间排序
articles.sort((a, b) => b.mtime - a.mtime);

// 生成文章文件
articles.forEach(article => {
  const date = new Date(article.mtime * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const dateStr = `${year}-${month}-${day}`;
  const filename = `${dateStr}-${article.title.replace(/[^\w\u4e00-\u9fa5]/g, '-').replace(/-+/g, '-')}.md`;
  const yearDir = `docs/posts/${year}`;
  
  // 创建年份目录
  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true });
  }
  
  const content = `---
title: ${article.title}
date: ${dateStr}
description: ${article.brief_content}
---

# ${article.title}

> ${article.brief_content}

## 概述

*文章内容待补充...*

## 详细内容

*请在此处添加具体的技术内容、代码示例和实践经验。*

---

*发布时间：${dateStr}*
`;
  
  const filePath = `${yearDir}/${filename}`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created: ${filePath}`);
});

console.log(`Generated ${articles.length} articles`);