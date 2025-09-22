---
title: 安卓开发 Jetpack Compose 的状态管理
date: 2024-04-26
description: 为什么会有状态管理 因为UI界面并不是一成不变的，所以需要在数据状态发生变化时更新界面
---

# 安卓开发 Jetpack Compose 的状态管理

> 为什么会有状态管理 因为UI界面并不是一成不变的，所以需要在数据状态发生变化时更新界面

## 概述



## 为什么会有状态管理

因为UI界面并不是一成不变的，所以需要在数据状态发生变化时更新界面，管理界面中的状态。


## Flutter 的状态管理

在Flutter中有很多优秀的状态管理的库，比如`Getx`，`provider` ，`bloc` 等，基于`Stream`流或者 Flutter自带内置组件`InheritedWidget`来封装，不管是什么框架状态管理本质都是 发布-订阅模式。之前写过一篇关于Flutter的状态管理  [Flutter 状态管理的学习](https://juejin.cn/post/7252231214723727397)


## Android 中状态管理

### 完成一个简单的ToList

> 添加或删除 todo，完成todo项


#### **让组件有状态**  
 
  使用  `mutableStateOf` ，
  `by`关键字表示这是一个委托属性。
  
 
 ``` kotlin
 var tasks by remember { mutableStateOf(dummyTasks) }
 ```
   > **委托属性**
  > 
  >当你访问 `tasks` 属性时,实际上是委托给了 `mutableStateOf(dummyTasks)` 创建的状态对象,读取其中   的值。当你给 `tasks` 赋新值时,也是委托给了同一个状态对象,对其进行了修改。使用委托属性的好处是,你可   以将属性的底层实现委托给另一个对象,而不需要自己手动实现 getter 和 setter 方法。
  
  ##### **`remember` 和 `rememberSaveable`**

虽然 `remember` 可在重组后保持状态，只会记住重组后的，执行任何导致 Android 重新创建运行中 activity 的其他配置更改时，状态还会重置。所以横竖屏的切换，状态就会重置。要想更改配置状态依旧保留需要使用 `rememberSaveable`，因为`rememberSaveable`会自动保存可保存在 `Bundle`中的任何值中，

> 使用 **`remember`** 存储对象的可组合函数包含内部状态，这会使该可组合函数**有状态**。


#### **让列表成为可变列表**

使用可变 `ArrayList<T>` 或 `mutableListOf,`。这些类型不会通知列表中的项已发生更改并安排界面重组。
从列表中添加或删除任务的行为，第一步是让列表成为可变列表，创建一个可由 Compose 观的 `MutableList` 实例。允许 Compose 跟踪更改，以便在列表中添加或移除项时重组界面。

```kotlin
val dummyTasks = mutableListOf(
    Task(id = 1, title = "买菜"),
    Task(id = 2, title = "做饭"),
    Task(id = 3, title = "洗衣服")
)
```

##### **`mutableStateListOf` 和 `toMutableStateList`**

`mutableStateOf` 函数会返回一个类型为 `MutableState<T>` 的对象。

`mutableStateListOf` 和 `toMutableStateList` 函数会返回一个类型为 `SnapshotStateList<T>`



>**`mutableStateListOf` 不能被委托**
>
> `mutableStateListOf` 不能被委托的原因,委托属性需要实现 `getValue() `和 `setValue()` 方法。
> 而 `mutableStateListOf`本身并没有实现这两个方法,因此无法作为委托属性使用。


## **LiveData和ViewModel：**

在官方文档的介绍中`LiveData`和`ViewModel` 都是生命周期感知型组件

### **ViewModel**

**官方简介**：*是一种业务逻辑或屏幕级状态容器。它用于将状态公开给界面，以及封装相关的业务逻辑。 它的主要优点是，它可以缓存状态，并可在配置更改后持久保留相应状态。
*

**优势** ：

ViewModel 类的主要优势实际上有两个方面：

-   它允许持久保留界面状态。
-   它可以提供对业务逻辑的访问权限。

#### ViewModel 的生命周期

1.  **创建阶段（onCreate）：** 当Activity或Fragment首次创建时，ViewModel被创建并初始化。这是ViewModel的生命周期的开始阶段。
1.  **活动阶段（active）：** 一旦ViewModel被创建并与Activity或Fragment相关联，它会进入活动阶段。在这个阶段，ViewModel可以被观察者观察，并且可以存储和管理与UI相关的数据。
1.  **销毁阶段（onCleared）：** 当Activity或Fragment被销毁时，ViewModel的onCleared()方法会被调用。在这个方法中，你可以执行一些清理工作，例如取消异步任务或释放资源。

 ViewModel的生命周期超出了配置更改引起的Activity或Fragment的销毁和重新创建。这意味着，即使Activity或Fragment被销毁和重新创建，ViewModel仍然存在，并且可以保持其状态和数据。这样可以确保在配置更改后，例如屏幕旋转，用户切换了应用的语言，或者由于系统内存不足导致的重新创建，数据不会丢失，UI状态得以保持。



### **LiveData**

**官方定义**： *是一种可观察的数据存储器类。与常规的可观察类不同，LiveData 具有生命周期感知能力，意指它遵循其他应用组件（如 activity、fragment 或 service）的生命周期。这种感知能力可确保 LiveData 仅更新处于活跃生命周期状态的应用组件观察者。*

 *如果观察者（由 [`Observer`](https://developer.android.com/reference/androidx/lifecycle/Observer?hl=zh-cn) 类表示）的生命周期处于 [`STARTED`](https://developer.android.com/reference/androidx/lifecycle/Lifecycle.State?hl=zh-cn#STARTED) 或 [`RESUMED`](https://developer.android.com/reference/androidx/lifecycle/Lifecycle.State?hl=zh-cn#RESUMED) 状态，则 LiveData 会认为该观察者处于活跃状态。LiveData 只会将更新通知给活跃的观察者。为观察 [`LiveData`](https://developer.android.com/reference/androidx/lifecycle/LiveData?hl=zh-cn) 对象而注册的非活跃观察者不会收到更改通知。*

### 使用 LiveData 的优势

使用 LiveData 具有以下优势：

-   **确保界面符合数据状态**

    LiveData 遵循观察者模式。当底层数据发生变化时，LiveData 会通知 [`Observer`](https://developer.android.com/reference/androidx/lifecycle/Observer?hl=zh-cn) 对象。您可以整合代码以在这些 `Observer` 对象中更新界面。这样一来，您无需在每次应用数据发生变化时更新界面，因为观察者会替您完成更新。

-   **不会发生内存泄漏**

    观察者会绑定到 [`Lifecycle`](https://developer.android.com/reference/androidx/lifecycle/Lifecycle?hl=zh-cn) 对象，并在其关联的生命周期遭到销毁后进行自我清理。

-   **不会因 Activity 停止而导致崩溃**

    如果观察者的生命周期处于非活跃状态（如返回堆栈中的 activity），它便不会接收任何 LiveData 事件。

-   **不再需要手动处理生命周期**

    界面组件只是观察相关数据，不会停止或恢复观察。LiveData 将自动管理所有这些操作，因为它在观察时可以感知相关的生命周期状态变化。

-   **数据始终保持最新状态**

    如果生命周期变为非活跃状态，它会在再次变为活跃状态时接收最新的数据。例如，曾经在后台的 Activity 会在返回前台后立即接收最新的数据。

-   **适当的配置更改**

    如果由于配置更改（如设备旋转）而重新创建了 activity 或 fragment，它会立即接收最新的可用数据。

-   **共享资源**

    您可以使用单例模式扩展 [`LiveData`](https://developer.android.com/reference/androidx/lifecycle/LiveData?hl=zh-cn) 对象以封装系统服务，以便在应用中共享它们。`LiveData` 对象连接到系统服务一次，然后需要相应资源的任何观察者只需观察 `LiveData` 对象。[扩展 LiveData](https://developer.android.com/topic/libraries/architecture/livedata?hl=zh-cn#extend_livedata)。


LiveData和ViewModel的 [官方文档](https://developer.android.com/topic/libraries/architecture/viewmodel?hl=zh-cn)
 
在Android的官方文档中给出了一个 [饮水计数的案例](https://developer.android.com/codelabs/jetpack-compose-state?hl=zh-cn&continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fjetpack-compose-for-android-developers-1%3Fhl%3Dzh-cn%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fjetpack-compose-state#0)



### 我的实现


####  使用LiveData和ViewModel

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e4080b0341a4fc48289af89a3e65df8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=970&h=371&s=332051&e=png&b=3f3c3b)




####  不使用LiveData和ViewModel

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73434c22d8364c0bb63977fb56896fcf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=954&h=662&s=543409&e=png&b=3d3a39)

### 效果


![rh801-todo.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d25af7f52d744daf9059343742873a4e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=380&h=822&s=1028550&e=gif&f=300&b=fcf8fd)



### 源码
[lily02](https://github.com/acsweets/carnation/tree/main/lily02)





## 延伸

### it 关键字 
1.  **Lambda 表达式**

当使用lambda表达式时,如果lambda只有一个参数,那么可以省略参数,直接使用 `it`代指这个参数。

```kotlin

Copy code
val list = listOf(1, 2, 3, 4, 5)
list.forEach { println(it) } // 输出: 1 2 3 4 5
```

2.  **作用域函数**

Kotlin 提供了一些作用域函数,如 `let`、`run`、`apply`、`also`等, 它们使用`it`代指作为其闭包的调用对象。

```kotlin
val str = "Hello"
str.let { println(it.length) } // 输出: 5
```

3.  **解构声明**

在解构声明中,`it`可以代表被解构的对象。

```kotlin
data class Person(val name: String, val age: Int)
val person = Person("Alice", 25)
val (name, age) = person // name = "Alice", age = 25
println(it) // 输出: Person(name=Alice, age=25)
```

4.  **其他情况**

在某些特殊情况下,如类型推断无法推断出正确的类型时,可以使用`it`作为一个临时标识符。

```kotlin
val map = mapOf("a" to 1, "b" to 2, "c" to 3)
map.forEach { (key, value) ->
    println("$key -> $value")
}
```



---

*发布时间：2024-04-26*
