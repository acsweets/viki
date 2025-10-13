---
title: 安卓开发 Jetpack Compose 之导航篇（页面跳转）
date: 2024-04-23
description: Android 中不同版本页面跳转的实现，Java -xml 和kotlin -Jetpack Compose
---

# 安卓开发 Jetpack Compose 之导航篇（页面跳转）

> Android 中不同版本页面跳转的实现，Java -xml 和kotlin -Jetpack Compose

## 概述

## 页面跳转

### Java-xml 版

创建两个 `Activity`  通过 `startActivity` 方法完成页面的跳转


``` java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 当前的页面布局采用的是res/layout/activity_main.xml
        setContentView(R.layout.activity_main);
        // 获取名叫tv_hello的TextView控件，注意添加导包语句import android.widget.TextView;
        TextView tv_hello = findViewById(R.id.tv_hello);
        // 设置TextView控件的文字内容
        tv_hello.setText("你好，世界");
    }

    @Override
    protected void onResume() {
        super.onResume();
        goNextPage(); // 跳到下个页面
    }

    // 跳到下个页面
    private void goNextPage() {
        TextView tv_hello = findViewById(R.id.tv_hello);
        tv_hello.setText("3秒后进入下个页面");
        // 延迟3秒（3000毫秒）后启动任务mGoNext
        new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(mGoNext, 3000);
    }
    //用于在单独的线程上启动 Main2Activity,这样可以避免阻塞主 UI 线程。当进行耗时操作(如网络请求或复杂计算)时,这种做法可以使应用程序保持响应式和高效。
    private Runnable mGoNext = () -> {
        // 活动页面跳转，从MainActivity跳到Main2Activity
        startActivity(new Intent(MainActivity.this, Main2Activity.class));
    };

}
```


### Kotlin-compose 版

`kotlin` 可以跳转不同` activity` 同时也支持单一 `activity` 使用Jetpack中的 Navigation组件

#### 通过startActivity 跳转不同activity 

``` kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CarnationTheme {
                Greeting("你好，世界")
            }
        }
    }

    override fun onResume() {
        super.onResume()
        delayAndNavigate()
    }


    //直线任务kotlin的协程
    private fun delayAndNavigate() {
        CoroutineScope(Dispatchers.Main).launch {
            delay(3000L) // 延时 3 秒，单位为毫秒
            startActivityToNewScreen() // 调用跳转方法
        }
}

    private fun startActivityToNewScreen() {
        val intent = Intent(this, MainActivity2::class.java)
        startActivity(intent)
    }


    }
```

#### 同一 activity 通过  Navigation组件 跳转不同 `@Composable`


``` kotlin
class MainActivity2 : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CarnationTheme {
                NavGraph()
            }
        }
    }
}

@Composable
fun NavGraph() {
    val navController = rememberNavController()
    NavHost(
        navController = navController, startDestination = "home"
    ) {
        composable("home") {
            HomeScreen(navController = navController)
        }
        composable("details") {
            DetailsScreen()
        }
    }
}

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DetailsScreen() {
//    Scaffold (topBar ={ AppBar()}){
//
//    }
    Column(modifier = Modifier.fillMaxWidth()) {
        Text(text = "详情页")
    }
}


@Composable

fun AppBar() {
    Text(text = "详情页")
}

@Composable
fun HomeScreen(navController: NavHostController) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Text(text = "主页")
        Button(onClick = { navController.navigate("details") }) {
            Text(text = "跳转去详情页")
        }

    }

}
```


## 延伸

### Java 线程的使用
> 线程是操作系统能够进行运算调度的最小单位,它包含在进程之中,是进程中实际运作的单位。一个进程可以包含 多个线程。Java中使用线程的主要目的是提高程序的并发性,从而提高程序运行效率。通过java.lang.Thread   类和java.lang.Runnable接口来支持多线程编程。

**线程的概念**

-   线程是程序执行流的最小单位

-   线程是进程中的实体,是被系统独立调度和分派的基本单位

-   线程自己不拥有系统资源,但可与同个进程的其他线程共享进程所拥有的资源

**线程的使用**

创建线程的方式:

-   继承Thread类,重写run()方法
-   实现Runnable接口,并重写run()方法,然后将Runnable实例传递给Thread类的构造函数
  
线程的生命周期:

   -   新建(New)
   -   就绪(Runnable)
   -   运行(Running)
   -   阻塞(Blocked)
   -   死亡(Dead)

线程的常用方法:

   -   start() 启动线程
   -   run() 线程运行时执行的操作
   -   sleep(long millis) 让当前线程休眠
   -   join() 等待线程终止
   -   yield() 线程让步
   -   interrupt() 中断线程
   -   isAlive() 判断线程是否还活着
线程同步:
   -   synchronized关键字用于方法或代码块同步
   -   Lock接口用于显式锁定
   -   线程通信: wait()、notify()、notifyAll()

线程池:

   -   通过重用线程来避免线程创建和销毁的开销
   -   使用Executors创建不同类型的线程池
   -   可控制线程池的属性和任务处理方式


在Java跳转页面中在单独的线程上启动 Main2Activity,这样可以避免阻塞主 UI 线程
```java
new Handler(Objects.requireNonNull(Looper.myLooper())).postDelayed(() -> 

startActivity(new Intent(MainActivity.this, MainActivity2.class)), 1000);
```
 


### kotlin 协程的使用
协程是一种轻量级的线程,它在语言层面实现了异步编程的能力。与传统线程相比,协程的优势在于更加高效、轻量级,能够大大减少资源占用。

**协程的概念**

-   协程是一种可被暂停和恢复的执行流程,它可以在不阻塞线程的情况下等待其他协程或异步操作完成。

-   协程不是操作系统级别的概念,它是在语言层面实现的一种异步编程范式。

-   协程可以在单个线程中被调度和切换,从而实现并发执行。
  
**协程运行的位置**
 -
 运行在协程调度器(CoroutineDispatcher)之上。协程调度器负责将协程的执行分派到不同的线程或线程池上运行。Kotlin 内置的协程调度器,这些调度器会决定协程运行的位置:

1.  Dispatchers.Main

    -   这是一个特殊的调度器,它将协程的运行限制在 Android 主线程(UI 线程)上。
    -   适用于需要更新 UI 的操作,或者其他必须在主线程中执行的任务。

1.  Dispatchers.IO

    -   该调度器使用共享的线程池,专门用于offload阻塞的IO操作,如网络请求、磁盘访问等。
    -   通常用于IO密集型的任务,以避免阻塞主线程或其他计算线程。

1.  Dispatchers.Default

    -   该调度器使用共享的后台线程池,适用于运行CPU密集型任务。
    -   通常用于计算密集型的任务,如解析JSON、处理图像等。

1.  Dispatchers.Unconfined

    -   这是一个特殊的调度器,它启动的协程将与当前执行协程的上下文相同,比如在主线程启动的协程会继续执行在主线程上。
    -   如果当前上下文被释放(比如主线程空闲时),它会继续在第一个可调度线程上恢复执行。

除了内置调度器外，还可以通过自定义线程池和调度器来控制协程的执行位置和策略，简单来说 `协程运行在线程中`


 协程的特点:

-   轻量级: 协程比线程更加轻量级,创建和切换的开销小。
-   无阻塞: 协程可以在不阻塞线程的情况下等待其他操作完成。
-   可暂停和恢复: 协程可以被暂停、恢复,从而实现更好的控制流。

 协程的使用:
-   使用 `launch` 或 `async` 函数启动新的协程。
-   使用 `suspend` 关键字标记可被暂停的函数。
-   使用 `delay`、`withContext`、`withTimeout` 等挂起函数实现协程的暂停和恢复。
-   使用 `await` 等待协程执行结果。
-   使用 `coroutineScope` 管理协程的作用域和生命周期。

  协程构建器:

-   `launch`: 创建一个新的协程并启动,不携带任何结果值。
-   `async`: 创建一个新的协程并启动,返回一个 `Deferred` 对象,可以通过 `await()` 获取结果值。
-   `withContext`: 在指定的上下文中执行协程代码块,可以切换协程上下文。
-   `supervisorScope`: 创建一个新的作用域,可以在其中启动子协程并监督它们的执行。

 协程上下文和调度器:

-   协程上下文决定了协程在哪个线程或线程池中执行。
-   Kotlin 内置了多个调度器,如 `Dispatchers.Main` (UI线程)、`Dispatchers.IO` (IO操作)、`Dispatchers.Default` (CPU密集型任务)等。


使用kotlin的协程 在 Android 主线程(UI 线程) 中创建一个协程来完成跳转页面。

```kotlin

CoroutineScope(Dispatchers.Main).launch { delay(3000L) 
// 调用跳转方法
startActivity(new Intent(MainActivity.this, MainActivity2.class)) 
 }
 }

```
### 源码
[我的kotlin版源码](https://github.com/acsweets/carnation/tree/main/lily)
### 参考
 
[《Android Studio开发实战：从零基础到App上线(第3版)》配套源码 ](https://github.com/aqi00/android3/tree/main/chapter02)



---

*发布时间：2024-04-23*
