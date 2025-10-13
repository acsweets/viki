---
title: 插件 stomp_dart_client 简单使用
date: 2025-06-26
description: 插件 stomp_dart_client 简单使用 初始化StompClient 链接 订阅服务信息
---

# 插件 stomp_dart_client 简单使用

> 插件 stomp_dart_client 简单使用 初始化StompClient 链接 订阅服务信息

## 概述

## 初始化插件使用

> `useSockJS` 的设置 是否使用SockJS
> 
> `onConnect` 连接后的回调
> 
>`onDisconnect` 断开连接的回调
>
>`url`服务地址


```dart
// 初始化StompClient 链接
late StompClient _client;
Future<void> init() async {
  if (_initialized) return;
  _initialized = true;

  final url = 'wss:// you.server.com/ws';
  _client = StompClient(
    config: StompConfig(
      url: url,
      onConnect: _onConnectCallback,
      onStompError: (frame) => log('STOMP 错误: ${frame.body}'),
      onWebSocketError: (error) => log('WebSocket 错误: $error'),
      onDisconnect: (_) => _connected = false,
      onDebugMessage: (msg) => log('[STOMP DEBUG] $msg'),
  //    useSockJS: true,
    ),
  );
  _client.activate();
}

```
## 激活 

> _client.activate();

## 连接后的回调

```
/// 建立连接后的回调
void _onConnectCallback(StompFrame connectFrame) {
  _connected = true;
  log('✅ STOMP 已连接');
  _subscribeToMessages();
  _loadHistory();
}
```

## 订阅消息
```dart
void _subscribeToMessages() {
  if (_subscribed) return;
  _client.subscribe(
    destination: '订阅通道',
    callback: (StompFrame frame) {
      if (frame.body != null) {
        final body = frame.body!;
 
        final data = jsonDecode(body);
        addMessage(
          data['content'] ?? body,
        );
      }
    },
  );

  _subscribed = true;
}
```


## 发送消息

```dart
void send(String text) {
  if (!_connected || text.trim().isEmpty) return;
  addMessage(text, isMine: true);
  final payload = {
    'content': text,
  };
  _client.send(
    destination: '发送通道',
    body: jsonEncode(payload),
  );
}
```


## 断开连接

```
/// 主动断开连接（如退出页面）
void disconnect() {
  _client.deactivate();
  _connected = false;
  _initialized = false;
  _subscribed = false;
  messages.clear();
}
```


*发布时间：2025-06-26*
