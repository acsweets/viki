---
title: flutter在android中启用前台服务使用插件flutter_foreground_task
date: 2023-07-31
description: 利用插件flutter_foreground_task 简单使用前台服务
---

# flutter在android中启用前台服务使用插件flutter_foreground_task

> 利用插件flutter_foreground_task 简单使用前台服务

## 概述

# 权限



首先在androidManifest.xml 加入权限
```android
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS"/>

<service
    android:name="com.pravera.flutter_foreground_task.service.ForegroundService"
    android:stopWithTask="true" />

```

## 开始

简单使用

```dart
//初始化这个前台任务
void _initForeground() {
  FlutterForegroundTask.init(
      androidNotificationOptions:
          AndroidNotificationOptions(channelId: 'notification_channel_id', channelName: 'Foreground Notification'),
      iosNotificationOptions: const IOSNotificationOptions(),
      foregroundTaskOptions: const ForegroundTaskOptions());
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e5c99d62f2d4134a71c83ca8647b58d~tplv-k3u1fbpfcp-watermark.image?)


然后在initState中调用这个_initForeground()函数，再使用 **FlutterForegroundTask.startService** 设置一下和标题和内容就可以启动一个简单的前台服务了。

## 回调函数

当我们想使用这个前台服务的操作的回调就需要设置这个服务的 **Callback** 首先要继承 **TaskHandler** 抽象类实现自己的处理前台服务的处理程序，
我们来看一下这个抽象类**TaskHandler**，

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/992314a31c154d43b056e2d432c54991~tplv-k3u1fbpfcp-watermark.image?)

一共有五个方法，以及三个抽象方法
1. onStart 当我们启动前台服务时，会回调用这个函数，
1. onRepeatEvent 前台服务重复事件的回调，
1. onDestroy自然不用多说，销毁啦~
1. onNotificationPressed点击通知栏时回调，默认启动app，
1. onNotificationButtonPressed 当通知栏里存在按钮 当点击按钮时，会将按钮id传递进来，可以根据不同的id 进行不同的处理


```dart
///简单的实现一下三个函数吧
class MyTaskHandler extends TaskHandler {
  @override
  Future<void> onDestroy(DateTime timestamp, SendPort? sendPort) async {
    print("销毁事件");
  }

  @override
  Future<void> onRepeatEvent(DateTime timestamp, SendPort? sendPort) async {
    print("重复事件");
  }

  @override
  Future<void> onStart(DateTime timestamp, SendPort? sendPort) async {
    print("启动服务");
  }
}

```


```dart
//回调函数应始终是顶级函数。所以他放在外面
//必须调用 setTaskHandler 函数来在后台处理任务。
@pragma('vm:entry-point')
void startCallback() {
  FlutterForegroundTask.setTaskHandler(MyTaskHandler());
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a0e58650bb3431685f7107d17fbdcb9~tplv-k3u1fbpfcp-watermark.image?)


然后在我们的前台服务中加上这个回调函数

```dart
FlutterForegroundTask.startService(
    notificationTitle: "一个服务", notificationText: "1111", callback: startCallback);
```

再点击启动按钮调用这个函数就会打印

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b214a0b5299431bb3769976790179c1~tplv-k3u1fbpfcp-watermark.image?)


## 前台服务初始化
 在初始化中需要传3个参数，分别是 **AndroidNotificationOptions** ，**IOSNotificationOptions** **ForegroundTaskOptions**，
### 在AndroidNotificationOptions的参数
- id：通知的唯一 ID。
- channelId ：通知通道的唯一 ID，
- channelName：通知通道的名称。此值在通知设置中向用户显示。
- channelDescription ：描述。
- channelImportance ：重要等级。
- priority：通知的优先级。
- showWhen：显示时间。
- isSticky：通知被销毁是否重建
- iconData ：通知的图标，默认是app的图标
- buttons ：通知下的按钮，最多三个，这个按钮点击会调用handle中onNotificationButtonPressed，并将按钮id传过去

### IOSNotificationOptions
他比较简单只有两个参数，showNotification是否显示通知默认为true，playSound接收通知时是否播放声音，默认false

### ForegroundTaskOptions

- interval：任务调用的间隔
- isOnceEvent ：重复任务回调是不是只调用一次
- autoRunOnBoot ：是否在引导时自动运行前台任务。
- allowWakeLock ：通知时可以唤醒锁定
## 检测权限
这个就完全是插件的官方案例啦

```dart
///启动前台服务需要一系列的授权
Future<void> _requestPermissionForAndroid() async {
  if (!Platform.isAndroid) {
    return;
  }
  if (!await FlutterForegroundTask.canDrawOverlays) {
    ///打开设置页面，您可以在其中允许拒绝“android.permission.SYSTEM_ALERT_WINDOW”权限。传递“forceOpen”布尔值以打开权限页面，即使已授予。
    await FlutterForegroundTask.openSystemAlertWindowSettings();
  }

  if (!await FlutterForegroundTask.isIgnoringBatteryOptimizations) {
    //判断是否开启排除电池优化权限，如果没有开启去开启
    await FlutterForegroundTask.requestIgnoreBatteryOptimization();
  }


  ///检查前台服务权限授予的状态
  final NotificationPermission notificationPermissionStatus =
  await FlutterForegroundTask.checkNotificationPermission();
  if (notificationPermissionStatus != NotificationPermission.granted) {
    //没有授予先去请求
    await FlutterForegroundTask.requestNotificationPermission();
  }
}
```


## 使用isolate

在TaskHandler中利用sendPort将事件放在isolate中处理，在**MyTaskHandler** 定义一个 sendPort用来发送信息，

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5de16f5617b44d48ac7704f200ffefd6~tplv-k3u1fbpfcp-watermark.image?)


有发送端口，当然有接收端口啦！

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7ec40f27d5a40829bc0f5a806a9e2ad~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ca97b2e05254176991f290ea7c8e249~tplv-k3u1fbpfcp-watermark.image?)

在接收端口收到信息后就打印出来，于是我们得到

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2a8210ba5054b1cad9bc23fcb50a5a0~tplv-k3u1fbpfcp-watermark.image?)

还可以在不重新启动服务的情况下获取以前的接收端口。
```dart
if (await FlutterForegroundTask.isRunningService) {
  final newReceivePort = FlutterForegroundTask.receivePort;
  _registerReceivePort(newReceivePort);
}
```


结束服务调用

```
FlutterForegroundTask.stopService();
```

ending ~~~~~




---

*发布时间：2023-07-31*
