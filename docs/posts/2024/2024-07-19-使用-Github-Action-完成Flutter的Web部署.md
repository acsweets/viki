---
title: 使用 Github Action 完成Flutter的Web部署
date: 2024-07-19
description: 如何使用Action创建自己想要的 workflows ？ 在Github上打开你的仓库找到Action条目
---

# 使用 Github Action 完成Flutter的Web部署

> 如何使用Action创建自己想要的 workflows ？ 在Github上打开你的仓库找到Action条目

## 概述
## 如何使用Action创建自己想要的 `workflows` ？

### 在Github上打开你的仓库找到Action条目

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a0bc7d3004084701b06353dece20c504~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112989&x-orig-sign=eGhIWGj9owFeGOdEN8%2BXXdbA708%3D)

#### 上面有一些别人写好的工作流，如果和你要运行的工作相同，就可以直接拿来使用


![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a7a7b416568e4c559c35969f241b8a07~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112989&x-orig-sign=rfkAKoV3Fyq%2FMACeDNeio5z1Gkc%3D)


#### 新建一个workflows 


![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/846fd5c9abe44186968ad8640c5226b0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112989&x-orig-sign=CV18I6Z2JzYi952i0x6mWnkq%2Fdw%3D)


![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6ecd2357ce75411c9ba8fdbfdbc873b2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112989&x-orig-sign=2hnThIP8i8dCY%2BqiojBAQt8a%2FH8%3D)

> 他会在你的项目下面创建一个.github/workflows/main.yml


![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/14b03032d6674f818fa4ae54dd930d37~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112989&x-orig-sign=1aPWtjht%2BSx4QHc%2Fy3LQQyuww9Q%3D)

>在这个yml 文件中添加你的工作流



### 设置你的工作流的触发条件

> 使用`on`关键字，我设置我工作流触发条件是，每次`push`到 `main` 分支就会运行这个工作流

```
on:
  push:
    branches: [ main ]  # 根据你的主分支名称调整
```

#### 比较常见的触发条件

-   **拉取请求**

    -   `pull_request`：当拉取请求的时触发，如打开、同步、合并等。

        ```yml
        on:
          pull_request:
            types: [opened, synchronize, reopened]
        ```

-   **发布**

    -   `release`：当发布版本时触发，如创建、删除发布等。

        ```yml
        on:
          release:
            types: [created, published]
        ```

-   **定时**

    -   `schedule`：间隔的定时触发工作流，使用cron语法。

        ```yml
        on:
          schedule:
            - cron: '0 0 * * *'  # 每天运行一次
        ```

-   **工作流**

    -   `workflow_dispatch`：手动触发工作流，。

        ``` yml
      
        on:
          workflow_dispatch:
            inputs:
              name:
                description: 'Person to greet'
                required: true
                default: 'World'
        ```

-   **问题**

    -   `issues`：当问题的活动发生时触发，如打开、关闭、评论等。

        ```yml
        on:
          issues:
            types: [opened, edited, closed]
        ```

-   **标签**

    -   `label`：当发生标签的活动发生时触发，如创建、删除等。

        ```yml
        on:
          label:
            types: [created, deleted]
        ```

-   **仓库**

    -   `repository_dispatch`：由外部事件触发的工作流，通常由其他应用程序或服务调用GitHub API来触发。

        ```yml
        on:
          repository_dispatch:
            types: [my_custom_event]
        ```
        
#### runs-on  指定运行环境

- 一般默认为最新的GitHub虚拟机的环境 `ubuntu-latest`

       
``` yml
runs-on: ubuntu-latest
```

> 也可以设置成别的环境
       
 -   `ubuntu-latest`：使用最新的 Ubuntu LTS 版本。

-   `ubuntu-22.04`：使用 Ubuntu 22.04 版本。

-   `ubuntu-20.04`：使用 Ubuntu 20.04 版本。

-   `ubuntu-18.04`：使用 Ubuntu 18.04 版本。

-   `windows-latest`：使用最新的 Windows Server 版本。

-   `macos-latest`：使用最新的 macOS 版本。



#### steps 设置工作流的步骤 

> 使用`uses` 用于引用和使用一个已经存在的动作，一般是官方社区创建好的，当然你也可以创建自己的。

##### `uses` 指令的格式

`uses` 指令格式：

```yml
uses: {owner}/{repo}@{version-or-branch-or-commit}
```

-   `owner`：存储库的所有者或组织名。
-   `repo`：存储库名称。
-   `version-or-branch-or-commit`：可以是版本标签（例如 `v1`）、分支名称（例如 `main`）或特定提交哈希（例如 `a1b2c3d`）。

> 使用`with` 关键字传递参数
>
> 在使用`peaceiris/actions-gh-pages@v3`就需要传递 `github_token`，`publish_dir`等参数，这个指令可以将指定文件部署到Github pages

> 使用 `run` 
>
> 在`workflows`中运行`flutter`的指令生成 web的文件


``` yml
  steps:
       # 检出代码
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v1
        # 使用 subosito/flutter-action@v1 Action 设置 Flutter 环境，并指定使用 stable 通道
        with:
          channel: 'stable'
      - run: flutter clean
      - run: flutter pub get
      - run: flutter build web --base-href "/resume/"
# 将构建的文件部署到 GitHub Pages。
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # 构建后的文件目录，例如静态网站的输出目录
          publish_dir: ./build/web
          publish_branch: info-pages //指定提交的分支
```



#### 运行报错

错误信息显示 "Write access to repository not granted"  是仓库没有写入权限

在 `settings` 里修改workflows的权限

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/958a8795dd77406aaf2896bfc57f6c2c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6KG_55KD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTgzNDQwNDI2OTgwMzMxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1759112989&x-orig-sign=8Py9T9EYPh%2FGeG98y%2B%2B14OAFVkQ%3D)


### 完整工作流代码


```
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]  # 根据你的主分支名称调整

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: subosito/flutter-action@v1
        with:
          channel: 'stable'
      - run: flutter clean
      - run: flutter pub get
      - run: flutter build web --base-href "/resume/"
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build/web
          publish_branch: info-pages
```


> 这样在我每次推送到主分支的时候，就会自动触发`workflows`来帮我构建`web`的项目，并部署在gitHub pages上。



[官方文档](https://docs.github.com/zh/actions)

---

*发布时间：2024-07-19*
