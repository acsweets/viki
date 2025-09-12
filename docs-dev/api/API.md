# API 文档

## 📋 概述

本文档描述了星星·小宇宙博客系统的内部 API 和配置接口。虽然这是一个静态博客，但通过 VuePress 的插件系统和配置 API，可以实现丰富的功能扩展。

## 🔧 VuePress 配置 API

### 基础配置

```javascript
// docs/.vuepress/config.js
module.exports = {
  // 站点元数据
  title: String,           // 站点标题
  description: String,     // 站点描述
  base: String,           // 部署基础路径
  dest: String,           // 构建输出目录
  
  // 头部配置
  head: Array,            // 额外的头部标签
  
  // 主题配置
  themeConfig: Object,    // 主题相关配置
  
  // 插件配置
  plugins: Array,         // 插件列表
  
  // Markdown 配置
  markdown: Object,       // Markdown 解析配置
  
  // 构建配置
  configureWebpack: Function | Object,  // Webpack 配置
  chainWebpack: Function  // Webpack 链式配置
}
```

### 主题配置 API

```javascript
themeConfig: {
  // 导航栏
  nav: [
    {
      text: String,       // 显示文本
      link: String,       // 链接地址
      items: Array        // 下拉菜单项
    }
  ],
  
  // 侧边栏
  sidebar: {
    '/path/': [           // 路径匹配
      '',                 // README.md
      'page1',           // page1.md
      'page2'            // page2.md
    ]
  },
  
  // 仓库配置
  repo: String,          // GitHub 仓库
  repoLabel: String,     // 仓库链接文本
  editLinks: Boolean,    // 编辑链接
  editLinkText: String,  // 编辑链接文本
  
  // 其他配置
  lastUpdated: String,   // 最后更新时间
  smoothScroll: Boolean, // 平滑滚动
  search: Boolean,       // 搜索功能
  searchMaxSuggestions: Number  // 搜索建议数量
}
```

## 🎨 样式 API

### CSS 变量系统

```stylus
// 主色调变量
:root
  --primary-color: #1E2A38
  --accent-color: #6C5CE7
  --accent-gradient: linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)
  
  // 背景色变量
  --bg-color: #F9F9F9
  --card-bg: #FFFFFF
  --section-bg: #F8F9FA
  
  // 文本颜色变量
  --text-primary: #333333
  --text-secondary: #666666
  --text-light: #999999
  
  // 状态色变量
  --success-color: #00B894
  --warning-color: #FAB1A0
  --error-color: #FF6B6B
  --info-color: #74B9FF
  
  // 尺寸变量
  --border-radius: 12px
  --shadow-light: 0 2px 10px rgba(0,0,0,0.05)
  --shadow-medium: 0 4px 20px rgba(0,0,0,0.08)
  --shadow-heavy: 0 8px 30px rgba(0,0,0,0.12)
```

### 组件样式 API

```stylus
// 卡片组件
.card
  background: var(--card-bg)
  border-radius: var(--border-radius)
  box-shadow: var(--shadow-medium)
  padding: 1.5rem
  transition: all 0.3s ease
  
  &:hover
    transform: translateY(-4px)
    box-shadow: var(--shadow-heavy)

// 按钮组件
.btn
  padding: 0.75rem 1.5rem
  border-radius: calc(var(--border-radius) / 2)
  font-weight: 500
  transition: all 0.3s ease
  border: none
  cursor: pointer
  
  &.primary
    background: var(--accent-gradient)
    color: white
    
  &.secondary
    background: transparent
    color: var(--accent-color)
    border: 2px solid var(--accent-color)

// 标签组件
.tag
  display: inline-block
  padding: 0.25rem 0.75rem
  border-radius: 15px
  font-size: 0.875rem
  font-weight: 500
  
  &.tech
    background: rgba(108, 92, 231, 0.1)
    color: var(--accent-color)
    
  &.creative
    background: rgba(255, 107, 107, 0.1)
    color: var(--error-color)
```

## 📝 内容 API

### Front Matter 规范

```yaml
---
# 页面元数据
title: String              # 页面标题
description: String        # 页面描述
keywords: Array           # 关键词
author: String            # 作者

# 导航配置
sidebar: Boolean | String # 侧边栏显示
navbar: Boolean           # 导航栏显示
prev: String | Object     # 上一页
next: String | Object     # 下一页

# 页面配置
layout: String            # 布局模板
permalink: String         # 永久链接
date: Date               # 发布日期
updated: Date            # 更新日期
tags: Array              # 标签
categories: Array        # 分类

# 自定义字段
mood: String             # 心情标签
difficulty: Number       # 难度等级
readTime: Number         # 阅读时间
---
```

### Markdown 扩展语法

```markdown
<!-- 容器语法 -->
::: tip 提示
这是一个提示容器
:::

::: warning 警告
这是一个警告容器
:::

::: danger 危险
这是一个危险提示容器
:::

::: details 点击展开
这是一个详情容器
:::

<!-- 代码组 -->
::: code-group
```javascript [JavaScript]
const hello = 'world'
```

```typescript [TypeScript]
const hello: string = 'world'
```
:::

<!-- 自定义容器 -->
::: wow-factor
这是一个哇因子容器
:::
```

## 🔌 插件 API

### 内置插件配置

```javascript
plugins: [
  // 回到顶部
  '@vuepress/back-to-top',
  
  // 图片缩放
  '@vuepress/medium-zoom',
  
  // 最后更新时间
  ['@vuepress/last-updated', {
    transformer: (timestamp, lang) => {
      return new Date(timestamp).toLocaleDateString()
    }
  }],
  
  // 搜索
  ['@vuepress/search', {
    searchMaxSuggestions: 10
  }],
  
  // PWA
  ['@vuepress/pwa', {
    serviceWorker: true,
    updatePopup: true
  }]
]
```

### 自定义插件开发

```javascript
// 插件结构
module.exports = (options, context) => ({
  name: 'plugin-name',
  
  // 插件初始化
  async ready() {
    // 初始化逻辑
  },
  
  // 生成页面
  async generated(pagePaths) {
    // 页面生成后的处理
  },
  
  // 扩展 Markdown
  extendMarkdown(md) {
    md.use(require('markdown-it-plugin'))
  },
  
  // 扩展页面数据
  extendPageData(page) {
    page.customField = 'custom value'
  },
  
  // 客户端增强
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceApp.js')
  ]
})
```

## 🎯 组件 API

### 全局组件

```vue
<!-- 卡片组件 -->
<Card 
  :title="String"
  :subtitle="String"
  :image="String"
  :tags="Array"
  :link="String"
  :hover-effect="Boolean"
>
  <template #content>
    <!-- 卡片内容 -->
  </template>
</Card>

<!-- 标签组件 -->
<Tag 
  :type="'tech' | 'creative' | 'personal'"
  :size="'small' | 'medium' | 'large'"
  :clickable="Boolean"
>
  标签文本
</Tag>

<!-- 进度条组件 -->
<ProgressBar 
  :value="Number"
  :max="Number"
  :color="String"
  :animated="Boolean"
/>

<!-- 统计卡片 -->
<StatCard 
  :icon="String"
  :number="Number"
  :label="String"
  :trend="'up' | 'down' | 'stable'"
/>
```

### 页面组件

```vue
<!-- 哇因子卡片 -->
<WowCard 
  :content="String"
  :tags="Array"
  :mood="String"
  :date="Date"
  :actions="Array"
/>

<!-- 技术卡片 -->
<TechCard 
  :title="String"
  :description="String"
  :code="String"
  :language="String"
  :difficulty="Number"
  :tags="Array"
/>

<!-- 成长统计 -->
<GrowthStats 
  :data="Object"
  :period="String"
  :chart-type="'line' | 'bar' | 'pie'"
/>
```

## 📊 数据 API

### 页面数据结构

```javascript
// 页面对象结构
{
  key: String,              // 页面唯一标识
  path: String,             // 页面路径
  title: String,            // 页面标题
  frontmatter: Object,      // Front Matter 数据
  excerpt: String,          // 页面摘要
  headers: Array,           // 标题列表
  lastUpdated: Number,      // 最后更新时间
  lastUpdatedText: String,  // 最后更新时间文本
  
  // 自定义字段
  tags: Array,              // 标签
  categories: Array,        // 分类
  readingTime: Object,      // 阅读时间
  wordCount: Number         // 字数统计
}
```

### 站点数据结构

```javascript
// 站点对象结构
{
  title: String,            // 站点标题
  description: String,      // 站点描述
  base: String,             // 基础路径
  pages: Array,             // 所有页面
  themeConfig: Object,      // 主题配置
  
  // 计算属性
  allTags: Array,           // 所有标签
  allCategories: Array,     // 所有分类
  recentPosts: Array,       // 最新文章
  popularPosts: Array       // 热门文章
}
```

## 🔍 搜索 API

### 搜索配置

```javascript
// 搜索插件配置
['@vuepress/search', {
  searchMaxSuggestions: 10,
  test: /\.(vue|md)$/,
  searchHotkeys: ['s', '/'],
  locales: {
    '/': {
      placeholder: '搜索文档'
    }
  }
}]
```

### 自定义搜索

```javascript
// 搜索数据结构
{
  title: String,            // 标题
  path: String,             // 路径
  excerpt: String,          // 摘要
  headers: Array,           // 标题列表
  tags: Array,              // 标签
  score: Number             // 搜索得分
}

// 搜索方法
function search(query, options = {}) {
  const {
    limit = 10,
    includeHeaders = true,
    includeTags = true
  } = options
  
  // 搜索逻辑
  return results
}
```

## 🎨 主题 API

### 布局组件

```vue
<!-- 默认布局 -->
<Layout>
  <template #navbar>
    <!-- 导航栏内容 -->
  </template>
  
  <template #sidebar>
    <!-- 侧边栏内容 -->
  </template>
  
  <template #content>
    <!-- 主要内容 -->
  </template>
  
  <template #footer>
    <!-- 页脚内容 -->
  </template>
</Layout>

<!-- 首页布局 -->
<HomeLayout>
  <template #hero>
    <!-- Hero 区域 -->
  </template>
  
  <template #features>
    <!-- 特性展示 -->
  </template>
  
  <template #content>
    <!-- 主要内容 -->
  </template>
</HomeLayout>
```

### 主题继承

```javascript
// 继承默认主题
module.exports = {
  extend: '@vuepress/theme-default',
  
  // 覆盖布局
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
    Home: path.resolve(__dirname, 'layouts/Home.vue')
  },
  
  // 全局组件
  globalUIComponents: [
    'BackToTop',
    'Notification'
  ]
}
```

## 🔧 构建 API

### Webpack 配置

```javascript
// 链式配置
chainWebpack: (config, isServer) => {
  // 添加别名
  config.resolve.alias
    .set('@components', path.resolve(__dirname, 'components'))
    .set('@assets', path.resolve(__dirname, 'assets'))
  
  // 添加加载器
  config.module
    .rule('stylus')
    .test(/\.styl$/)
    .use('stylus-loader')
    .loader('stylus-loader')
    .options({
      preferPathResolver: 'webpack'
    })
}

// 对象配置
configureWebpack: {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.CUSTOM_VAR': JSON.stringify(process.env.CUSTOM_VAR)
    })
  ]
}
```

### 生命周期钩子

```javascript
module.exports = {
  // 准备阶段
  async ready() {
    console.log('VuePress is ready!')
  },
  
  // 生成阶段
  async generated(pagePaths) {
    console.log('Pages generated:', pagePaths.length)
  },
  
  // 更新阶段
  async updated() {
    console.log('Site updated!')
  }
}
```

---

*更多 API 详情请参考 [VuePress 官方文档](https://vuepress.vuejs.org/)*