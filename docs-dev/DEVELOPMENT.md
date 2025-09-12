# 开发文档 - 测试修改

## 🏗️ 架构设计

### 技术栈

- **框架**：VuePress 1.9.7
- **构建工具**：Webpack
- **样式**：Stylus
- **部署**：GitHub Actions + GitHub Pages

### 目录结构说明

```
docs/
├── .vuepress/
│   ├── config.js          # 核心配置文件
│   ├── styles/            # 样式文件
│   │   └── index.styl     # 全局样式
│   └── public/            # 静态资源
├── README.md              # 首页内容
├── ritual/                # 成长仪式模块
├── wow/                   # 哇因子模块
├── tech-cards/            # 技术卡片模块
├── lab/                   # 内驱力实验室
└── about/                 # 关于页面
```

## 🎨 样式系统

### CSS 变量

```stylus
:root
  --primary-color: #1E2A38      // 主色调
  --accent-color: #6C5CE7       // 强调色
  --bg-color: #F9F9F9           // 背景色
  --card-bg: #FFFFFF            // 卡片背景
  --text-primary: #333333       // 主文本
  --text-secondary: #666666     // 次要文本
  --border-radius: 12px         // 圆角半径
```

### 组件样式规范

```stylus
// 卡片组件
.card
  background: var(--card-bg)
  border-radius: var(--border-radius)
  padding: 1.5rem
  box-shadow: 0 4px 20px rgba(0,0,0,0.08)
  transition: all 0.3s ease
  
  &:hover
    transform: translateY(-4px)
    box-shadow: 0 8px 30px rgba(0,0,0,0.12)
```

### 响应式断点

```stylus
// 移动端
@media (max-width: 768px)
  .container
    padding: 0 1rem
    
// 平板端
@media (max-width: 1024px)
  .grid
    grid-template-columns: repeat(2, 1fr)
```

## 🔧 配置说明

### VuePress 配置

```javascript
// docs/.vuepress/config.js
module.exports = {
  title: '星星 · 小宇宙',
  description: '记录我的再学习旅程、探索欲与创造力的星系笔记',
  base: '/viki/',
  
  // 头部配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }]
  ],
  
  // 主题配置
  themeConfig: {
    nav: [...],
    sidebar: {...},
    lastUpdated: '最后更新',
    smoothScroll: true
  },
  
  // 插件配置
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom'
  ]
}
```

### 导航配置

```javascript
nav: [
  { text: '🏠 首页', link: '/' },
  { text: '🌱 成长仪式', link: '/ritual/' },
  { text: '✨ 哇因子', link: '/wow/' },
  { text: '🎯 技术卡片', link: '/tech-cards/' },
  { text: '🧪 内驱力实验室', link: '/lab/' },
  { text: '👋 关于我', link: '/about/' }
]
```

## 📝 内容编写规范

### Markdown 语法扩展

```markdown
# 标题

::: tip 提示
这是一个提示框
:::

::: warning 警告
这是一个警告框
:::

::: danger 危险
这是一个危险提示框
:::

<!-- 代码块 -->
```javascript
const hello = 'world'
```

<!-- 表格 -->
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
```

### 页面 Front Matter

```yaml
---
title: 页面标题
description: 页面描述
sidebar: auto
prev: ./previous-page
next: ./next-page
---
```

### 组件使用

```vue
<!-- 自定义组件 -->
<div class="custom-component">
  <h3>组件标题</h3>
  <p>组件内容</p>
</div>

<style>
.custom-component {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}
</style>
```

## 🚀 构建优化

### 性能优化策略

1. **代码分割**
   ```javascript
   // 异步组件加载
   const AsyncComponent = () => import('./AsyncComponent.vue')
   ```

2. **图片优化**
   ```markdown
   <!-- 使用 WebP 格式 -->
   ![图片描述](./image.webp)
   
   <!-- 懒加载 -->
   <img loading="lazy" src="./image.jpg" alt="描述">
   ```

3. **CSS 优化**
   ```stylus
   // 使用 CSS 变量减少重复
   .component
     color: var(--primary-color)
     background: var(--bg-color)
   ```

### 构建配置

```javascript
// 自定义 webpack 配置
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../')
      }
    }
  }
}
```

## 🧪 测试策略

### 本地测试

```bash
# 启动开发服务器
npm run dev

# 构建测试
npm run build

# 预览构建结果
npx serve docs/.vuepress/dist
```

### 兼容性测试

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 性能测试

使用 Lighthouse 进行性能评估：
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## 🔍 调试技巧

### 开发工具

1. **Vue DevTools**：调试 Vue 组件
2. **Chrome DevTools**：性能分析
3. **VSCode**：代码调试和格式化

### 常见问题排查

```bash
# 清除缓存
rm -rf node_modules/.cache
rm -rf docs/.vuepress/.cache

# 重新安装依赖
rm -rf node_modules
npm install

# 检查配置语法
npm run build --verbose
```

### 日志调试

```javascript
// 开发环境日志
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}
```

## 📦 依赖管理

### 核心依赖

```json
{
  "vuepress": "^1.9.7",
  "gh-pages": "^4.0.0"
}
```

### 依赖更新策略

```bash
# 检查过期依赖
npm outdated

# 更新依赖
npm update

# 安全审计
npm audit
npm audit fix
```

## 🔒 安全考虑

### 内容安全

- 避免在代码中暴露敏感信息
- 使用环境变量管理配置
- 定期更新依赖包

### 部署安全

- 启用 HTTPS
- 配置 CSP 头部
- 使用 SRI 校验资源完整性

---

*更多开发问题请参考 [故障排除文档](./TROUBLESHOOTING.md)*