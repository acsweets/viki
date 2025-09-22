---
title: 安卓开发 Jetpack Compose 之（不同版本的）底部导航栏
date: 2024-04-25
description: 实现 Flutter && XML && Compose 三个不同版本的底部导航栏切换。
---

# 安卓开发 Jetpack Compose 之（不同版本的）底部导航栏

> 实现 Flutter && XML && Compose 三个不同版本的底部导航栏切换。

## 概述


>底部导航栏是App中必不可少的，这篇将实现三个版本的底部导航栏 Flutter && xml && Jetpack Compose 。


## Flutter 版本

我之前写过一个自定义版的底部导航切换 [自定义导航](https://juejin.cn/post/7267585231791538213)

在这里就实现一个比较基础的底部导航切换 可以通过定义一个页面列表和Flutter自带BottomNavigationBar组件来实现，总体实现比较简单。


### 效果 ：
![62pv5-br3ud.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2b059095a48440aa91483a5ea7594d6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=420&h=900&s=611811&e=gif&f=234&b=f33b2e)

完整代码：

``` dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bottom_Navigation_dome',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;
  List<Widget> pages = [
    PageOne(),
    PageTwo(),
    PageThree(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        selectedFontSize: 12.0,
        // 被选中时的字体大小
        unselectedFontSize: 14.0,
        // 未被选中时的字体大小
        showSelectedLabels: true,
        // 被选中时是否显示Label
        showUnselectedLabels: true,
        // 未被选中时是否显示Label
        enableFeedback: true,
        //点击会产生咔嗒声，长按会产生短暂的振动
        selectedItemColor: Colors.orange,
        // 设置被选中时的图标颜色     size: 24.0,

        unselectedItemColor: Colors.grey,
        // 设置未被选中时的图标颜色
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
            ),
            label: '工作室',
            backgroundColor: Colors.white,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.event_note, size: 24.0),
            label: '数据',
            backgroundColor: Colors.white,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person, size: 24.0),
            label: '我的',
            backgroundColor: Colors.white,
          ),
        ],

        // 设置当前（即被选中时）页面
        currentIndex: _selectedIndex,

        // 当点击其中一个[items]被触发
        onTap: (int index) {
          _selectedIndex = index;
          setState(() {
            /*
       * item 被点中时更改当前索引。
       * 其中，currentIndex 字段设置的值时响应式的
       * 新版dart不用this.
       */
            _selectedIndex = index;
          });
        },
      ),
    );
  }
}

class PageOne extends StatelessWidget {
  const PageOne({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("页面1"),
      ),
      body: Container(width: double.infinity, height: double.infinity, color: Colors.green),
    );
  }
}

class PageTwo extends StatelessWidget {
  const PageTwo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("页面2"),
      ),
      body: Container(width: double.infinity, height: double.infinity, color: Colors.red),
    );
  }
}

class PageThree extends StatelessWidget {
  const PageThree({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("页面3"),
      ),
      body: Container(width: double.infinity, height: double.infinity, color: Colors.orangeAccent),
    );
  }
}
```

## XML 版
> 不管是哪个版本的导航无非都是两部分组成，底部导航器和上面的页面。点击不同的导航器跳转到不同的页面。





### xml部分

页面部分使用`Fragment`视图
- 创建3个Fragment 并与对应的xml绑定

`ProfileFragment.java`

``` java
public class ProfileFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_profile, container, false);
    }
}
```


`fragment_profile.xml`

```xml
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ui.home.HomeFragment">

    <TextView
        android:id="@+id/text_other"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:textAlignment="center"
        android:textSize="20sp"
        android:text="@string/other"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

剩下两个Fragment略..

- 底部导航部分 `menu`
 
 新建` bottom_nav_menu.xml`
 
 ``` xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/navigation_home"
        android:icon="@drawable/ic_home_black_24dp"
        android:title="@string/title_home" />

    <item
        android:id="@+id/navigation_dashboard"
        android:icon="@drawable/ic_dashboard_black_24dp"
        android:title="@string/title_dashboard" />

    <item
        android:id="@+id/navigation_notifications"
        android:icon="@drawable/ic_notifications_black_24dp"
        android:title="@string/title_notifications" />

</menu>
```
 

### 页面部分

页面的上面是 `Fragment` 底部是 `menu`


创建 `activity_bottom.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
        android:id="@+id/fragment_container"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@id/bottom_navigation" />

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottom_navigation"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        app:menu="@menu/bottom_nav_menu" />

</RelativeLayout>
```

创建一个 `Activity` 来显示页面以及处理导航跳转的逻辑


```  java
package com.example.wisteria;

import android.annotation.SuppressLint;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import com.google.android.material.navigation.NavigationBarView;
public class MainActivity3 extends AppCompatActivity {
    private HomeFragment homeFragment;
    private SearchFragment searchFragment;
    private ProfileFragment profileFragment;

    private FragmentManager fragmentManager;
    private Fragment activeFragment;

    @SuppressLint("NonConstantResourceId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bottom);

        homeFragment = new HomeFragment();
        searchFragment = new SearchFragment();
        profileFragment = new ProfileFragment();

        fragmentManager = getSupportFragmentManager();
        activeFragment = homeFragment;

        fragmentManager.beginTransaction().add(R.id.fragment_container, homeFragment, null).commit();

        NavigationBarView bottomNavigation = findViewById(R.id.bottom_navigation);
        bottomNavigation.setOnItemSelectedListener(item -> {
            Fragment newFragment = null;
            int id = item.getItemId();

            if (id == R.id.navigation_home) {
                newFragment = homeFragment;
            }
            if (id == R.id.navigation_dashboard) {
                newFragment = searchFragment;
            }
            if (id == R.id.navigation_notifications) {
                newFragment = profileFragment;
            }

            if (newFragment != null && !newFragment.equals(activeFragment)) {
                fragmentManager.beginTransaction()
                        .replace(R.id.fragment_container, newFragment)
                        .commit();
                activeFragment = newFragment;
            }

            return true;
        });

    }
}
```
### 效果

![c522y-xml.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c16bc28fb164537bde82c674c0f9267~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=366&h=824&s=356630&e=gif&f=197&b=fbf5fc)



## Compose 版本

> 因为是通过查资料来写 Compose 许多文章都用的 `BottomNavigation`，但是这个已经被弃用了，我还以为自己导包导错了。 

*想查看有哪些组件还是看官方文档靠谱点*

[material3的组件库](https://m3.material.io/components)


[Jetpack Compose 中的 Material 组件](https://developer.android.com/develop/ui/compose/components?hl=zh-cn)

### 代码实现

> 比较简单，还是通过底部导航的index来更改展示的页面

``` kotlin
package com.example.lily

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Home
import androidx.compose.material.icons.rounded.Person
import androidx.compose.material.icons.rounded.Settings
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.Scaffold
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.example.lily.ui.theme.CarnationTheme

/////底部导航栏的实现
//
class MainActivity3 : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CarnationTheme {
                // A surface container using the 'background' color from the theme
                BottomNavigationExample()
            }
        }
    }
}

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BottomNavigationExample() {
    // 创建底部导航栏的状态
    var selectedIndex by remember { mutableIntStateOf(0) }

    // 创建底部导航栏的项目
    val items = listOf(
        NavItem.Home,
        NavItem.Profile,
        NavItem.Settings
    )

    Scaffold(
        bottomBar = {
            NavigationBar() {
                items.forEachIndexed { index, item ->
                    NavigationBarItem(
                        icon = { Icon(imageVector = item.icon, contentDescription = null) },
                        label = { Text(text = item.title) },
                        selected = selectedIndex == index,
                        onClick = { selectedIndex = index }
                    )
                }
            }


        }
    ) {
        // 根据选中的索引显示不同的页面内容
        when (selectedIndex) {
            0 -> TabContent(text = "Tab 1 Content")
            1 -> TabContent(text = "Tab 2 Content")
            2 -> TabContent(text = "Tab 3 Content")
        }
    }
}

@Composable
fun TabContent(text: String) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = text)
    }
}


// 底部导航
sealed class NavItem(var route: String, var icon: ImageVector, var title: String) {
    object Home : NavItem("home", Icons.Rounded.Home, "Home")
    object Profile : NavItem("profile", Icons.Rounded.Person, "Profile")
    object Settings : NavItem("settings", Icons.Rounded.Settings, "Settings")
}
```



### 效果


![q4fhf-com.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0679d12025a949778f080f34ad868493~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=366&h=824&s=453461&e=gif&f=184&b=fcf8fd)

## kotlin 延伸

### mutableStateOf 

在 Kotlin 中，`mutableStateOf` 是一个用于创建可变状态的函数，通常与 Compose 中的 UI 组件一起使用。它创建一个包含可变状态的 `MutableState` 对象，可以通过修改其 `value` 属性来改变状态的值。这样做会触发 Compose 的重新组合机制，使得界面能够响应状态的变化并重新绘制。

### sealed 关键字

在Kotlin中，`sealed`关键字用于声明一个密封类（sealed class）。密封类是一种特殊的类，它允许你定义一组有限的子类，并且这些子类必须在密封类的同一个文件中声明。密封类在处理有限的类继承结构时非常有用，因为它们提供了更严格的类型检查

#### 使用

```kotlin
sealed class NavItem(var route: String, var icon: ImageVector, var title: String) {
    object Home : NavItem("home", Icons.Rounded.Home, "Home")
    object Profile : NavItem("profile", Icons.Rounded.Person, "Profile")
    object Settings : NavItem("settings", Icons.Rounded.Settings, "Settings")
}
```



## 总结 

感觉三个版本写下来最麻烦的是写XML，Compose和 Flutter，很像写起来也很简单，就是没学过kotlin，写kotlin 有点费劲，像没牙的老太太啃骨头！




---

*发布时间：2024-04-25*
