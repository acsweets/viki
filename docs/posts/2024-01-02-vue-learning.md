# Vue.js 学习笔记

::: tip 发布时间
2024年1月2日
:::

## 简介

Vue.js是一个渐进式JavaScript框架，用于构建用户界面。本文记录了我学习Vue.js的一些心得和重要概念。

## 核心概念

### 1. 响应式数据

```javascript
// Vue 3 Composition API
import { ref, reactive } from 'vue'

const count = ref(0)
const state = reactive({
  name: 'Vue',
  version: '3.0'
})
```

### 2. 组件化开发

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="increment">点击次数: {{ count }}</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```

### 3. 生命周期钩子

- `created`: 实例创建完成后调用
- `mounted`: 挂载到DOM后调用
- `updated`: 数据更新后调用
- `destroyed`: 实例销毁后调用

## 学习资源

1. [Vue.js官方文档](https://vuejs.org/)
2. [Vue.js中文文档](https://cn.vuejs.org/)
3. [Vue Mastery](https://www.vuemastery.com/)

## 总结

Vue.js以其简洁的API和渐进式的设计理念，让前端开发变得更加高效和愉快。通过组件化的开发方式，我们可以构建出可维护、可复用的应用程序。

::: warning 注意
这只是学习笔记的开始，Vue.js还有很多高级特性等待探索！
:::

---

*下一篇文章将分享Vue Router的使用心得。*