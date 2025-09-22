---
title: 设计模式小案例之单例
date: 2024-10-22
description: 单例模式的两种创建方式 懒汉模式 优点 缺点 实例 饿汉模式 优点 缺点 实例
---

# 设计模式小案例之单例

> 单例模式的两种创建方式 懒汉模式 优点 缺点 实例 饿汉模式 优点 缺点 实例

## 概述


## 单例

> 单例模式是一种广泛使用的设计模式，特别适用于需要全局访问的场景。
> 在应用开发中，像网络请求管理、应用配置、数据库操作以及本地存储等
> 通常需要确保只有一个全局对象实例进行操作，因此非常适合采用单例模式来实现。

### 单例模式的两种创建方式

#### 懒汉模式

> 而懒汉比较懒，只有当调用getInstance的时候，才回去初始化这个单例。

##### 优点

> 不使用则不创建，节省资源
>

##### 缺点

> 第一次使用时需要初始化，可能有延迟
> 基本实现不是线程安全的，需要额外处理,等待同步的问题。

#### 实例

```dart
class SingletonLH {
static SingletonLH? instance;

SingletonLH._();

static SingletonLH getInstance() {
instance ??= SingletonLH._();
return instance!;
}
}
```
#### 饿汉模式

> 饿汉就是类一旦加载，就把单例初始化完成，保证getInstance的时候，单例是已经存在的了。

##### 优点

> 获取实例时速度快，没有延迟
> 天然线程安全，因为实例在类加载时就创建完成

##### 缺点

> 在类加载时就创建实例，不管是否使用

#### 实例

```dart
class SingletonEH {
static SingletonEH instance = SingletonEH._();


SingletonEH._();

static SingletonEH getInstance() {
return instance;
}
}
```

#### 适用场景

##### 懒汉式适用于：

- 实例化成本高的情况
- 不确定是否会使用该实例的情况
- 资源敏感的应用

##### 饿汉式适用于：

- 实例化成本较低的情况
- 确定会使用该实例的情况
- 需要确保绝对的线程安全的情况

### 小案例

> 需求描述
>
> 游戏在任何时候都只能有一个活跃的进度管理器实例。
>
> 进度管理器需要在游戏的不同部分之间共享数据。
>
> 它应该能保存和加载游戏进度。
>
> 进度管理器应该提供方法来更新和查询玩家的各种统计数据。
>
> 系统需要线程安全，因为可能会有多个游戏系统同时访问或修改数据。
>
> 使用单例模式实现这个游戏进度管理器。你需要：
>
> 在这个类中实现以下功能：
>
> 保存玩家的等级、经验值、生命值等基本属性
>
> 管理已完成的任务列表
>
> 管理玩家的物品清单
>
> 提供保存和加载游戏进度的方法
>
> 实现更新和查询这些数据的方法

#### 创建单例

创建单例就非常简单了，我们选择饿汉模式来创建

```dart
class GameProgressManager {
static GameProgressManager instance = GameProgressManager._();

GameProgressManager._();

//使用工厂构造确保返回同一个实例
factory GameProgressManager() {
return instance;
}
//亦可以通过get获取这个实例
// static GameProgressManager get instance => _instance;
}
```

#### 定义玩家属性


```dart
int _playerLevel = 1; //等级
int _experienceValue = 0;//经验
int _healthValue = 100;//生命值
double _gameProgress = 0.0; //经验
final List<String> _items = []; // 物品
```

####  管理玩家属性


```dart
int get playerLevel => _playerLevel;
set playerLevel(int value) {
if (value != _playerLevel) {
_playerLevel = value;
}
}

int get experienceValue => _experienceValue;
set experienceValue(int value) {
if (value < 0) throw ArgumentError('经验值不能为负数');
_experienceValue = value;
_checkLevelUp();  // 检查是否需要升级
}

int get healthValue => _healthValue;
set healthValue(int value) {
if (value < 0) {
_healthValue = 0;
} else if (value > 100) {
_healthValue = 100;
} else {
_healthValue = value;
}
}

double get gameProgress => _gameProgress;
set gameProgress(double value) {
if (value < 0 || value > 100) {
throw ArgumentError('进度必须在0-100之间');
}
_gameProgress = value;
}

// 9. 物品管理方法
List<String> get items => List.unmodifiable(_items);

void addItem(String item) {
if (item.isNotEmpty && !_items.contains(item)) {
_items.add(item);
}
}

void removeItem(String item) {
_items.remove(item);
}


void _checkLevelUp() {
final newLevel = (_experienceValue / 1000).floor() + 1;
if (newLevel != _playerLevel) {
playerLevel = newLevel;
}
}
```

### 总结
> 如果程序中的某个类对于所有客户端只有一个可用的实例，可以使用单例模式。 


---

*发布时间：2024-10-22*
