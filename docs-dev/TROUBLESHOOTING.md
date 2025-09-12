# 故障排除指南

## 🚨 常见问题与解决方案

### 安装与依赖问题

#### Q: npm install 失败

**症状**：
```bash
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
```

**解决方案**：
```bash
# 方案1：使用 nvm 管理 Node.js 版本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 16
nvm use 16

# 方案2：修改 npm 全局目录权限
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# 方案3：清除缓存重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Q: 依赖版本冲突

**症状**：
```bash
npm ERR! peer dep missing: vue@^2.6.0
npm ERR! Found: vue@3.0.0
```

**解决方案**：
```bash
# 检查依赖树
npm ls

# 安装正确版本
npm install vue@^2.6.0

# 或使用 --legacy-peer-deps 标志
npm install --legacy-peer-deps
```

### 开发服务器问题

#### Q: 开发服务器启动失败

**症状**：
```bash
Error: Cannot find module 'vuepress'
```

**解决方案**：
```bash
# 检查 VuePress 是否正确安装
npm list vuepress

# 重新安装 VuePress
npm uninstall vuepress
npm install vuepress@^1.9.7

# 检查 Node.js 版本兼容性
node --version  # 应该 >= 14.0.0
```

#### Q: 端口被占用

**症状**：
```bash
Error: listen EADDRINUSE: address already in use :::8080
```

**解决方案**：
```bash
# 查找占用端口的进程
lsof -i :8080
netstat -tulpn | grep :8080

# 杀死占用进程
kill -9 <PID>

# 或使用不同端口
npm run dev -- --port 8081
```

#### Q: 热重载不工作

**症状**：修改文件后页面不自动刷新

**解决方案**：
```bash
# 检查文件监听限制（Linux/Mac）
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# 清除缓存
rm -rf node_modules/.cache
rm -rf docs/.vuepress/.cache

# 重启开发服务器
npm run dev
```

### 构建问题

#### Q: 构建失败 - 内存不足

**症状**：
```bash
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

**解决方案**：
```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# 或在 package.json 中配置
{
  "scripts": {
    "build": "node --max-old-space-size=4096 ./node_modules/.bin/vuepress build docs"
  }
}
```

#### Q: 构建产物路径错误

**症状**：构建后静态资源 404

**解决方案**：
```javascript
// 检查 docs/.vuepress/config.js 中的 base 配置
module.exports = {
  base: '/repository-name/',  // 必须与 GitHub 仓库名一致
  
  // 或使用环境变量
  base: process.env.NODE_ENV === 'production' ? '/repository-name/' : '/'
}
```

#### Q: Markdown 解析错误

**症状**：
```bash
Error: Unexpected token in markdown file
```

**解决方案**：
```markdown
<!-- 检查 Front Matter 格式 -->
---
title: 正确的标题
description: 正确的描述
---

<!-- 避免在代码块中使用未转义的字符 -->
```javascript
// 使用反引号包裹代码
const code = `template string`
```

<!-- 检查 Vue 组件语法 -->
<template>
  <div>正确的 Vue 组件</div>
</template>
```

### 样式问题

#### Q: 自定义样式不生效

**症状**：CSS 样式没有应用到页面

**解决方案**：
```stylus
// 检查 docs/.vuepress/styles/index.styl 文件路径
// 确保使用正确的 Stylus 语法

// 错误写法
.class {
  color: red;
}

// 正确写法
.class
  color: red

// 或使用 CSS 语法
.class {
  color: red;
}
```

#### Q: 样式覆盖问题

**症状**：自定义样式被默认主题覆盖

**解决方案**：
```stylus
// 使用更高的特异性
.content .custom-class
  color: red !important

// 或使用 CSS 变量覆盖
:root
  --c-brand: #your-color
  --c-brand-light: #your-light-color
```

### 部署问题

#### Q: GitHub Pages 部署失败

**症状**：GitHub Actions 构建失败

**解决方案**：
```yaml
# 检查 .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # 确保分支名正确

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      with:
        fetch-depth: 0  # 获取完整历史记录
        
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'  # 使用稳定版本
        cache: 'npm'        # 启用缓存
```

#### Q: 部署后页面空白

**症状**：部署成功但页面显示空白

**解决方案**：
```javascript
// 检查 base 配置
module.exports = {
  base: '/repository-name/',  // 确保正确
  
  // 检查构建输出
  dest: 'docs/.vuepress/dist'
}
```

```bash
# 本地测试构建产物
npm run build
npx serve docs/.vuepress/dist -s

# 检查浏览器控制台错误
# 查看网络请求是否正常
```

#### Q: 自定义域名配置失败

**症状**：CNAME 文件被覆盖

**解决方案**：
```bash
# 将 CNAME 文件放在正确位置
echo "your-domain.com" > docs/.vuepress/public/CNAME

# 确保构建时不会被删除
# docs/.vuepress/public/ 目录下的文件会被复制到根目录
```

### 性能问题

#### Q: 页面加载缓慢

**症状**：首屏加载时间过长

**解决方案**：
```javascript
// 启用代码分割
module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}

// 优化图片
// 使用 WebP 格式
// 启用懒加载
```

```stylus
// 优化 CSS
// 避免复杂选择器
.simple-class
  color: red

// 使用 CSS 变量减少重复
:root
  --primary-color: #1E2A38

.component
  color: var(--primary-color)
```

#### Q: 构建时间过长

**症状**：npm run build 执行时间超过 5 分钟

**解决方案**：
```javascript
// 启用并行构建
module.exports = {
  configureWebpack: {
    optimization: {
      minimize: process.env.NODE_ENV === 'production'
    }
  },
  
  // 减少不必要的插件
  plugins: [
    // 只保留必要的插件
  ]
}
```

### 兼容性问题

#### Q: IE 浏览器兼容性

**症状**：在 IE 中页面显示异常

**解决方案**：
```javascript
// 添加 polyfill
module.exports = {
  configureWebpack: {
    entry: {
      app: ['babel-polyfill', './src/main.js']
    }
  }
}
```

```html
<!-- 在 head 中添加 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

#### Q: 移动端适配问题

**症状**：在移动设备上显示异常

**解决方案**：
```stylus
// 添加响应式断点
@media (max-width: 768px)
  .container
    padding: 0 1rem
    
  .grid
    grid-template-columns: 1fr

// 确保视口设置正确
// <meta name="viewport" content="width=device-width, initial-scale=1">
```

## 🔧 调试工具

### 开发工具

```bash
# 启用详细日志
DEBUG=vuepress:* npm run dev

# 分析构建产物
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer docs/.vuepress/dist/static/js/*.js

# 性能分析
npm install -g lighthouse
lighthouse http://localhost:8080 --output html
```

### 常用命令

```bash
# 清除所有缓存
rm -rf node_modules/.cache
rm -rf docs/.vuepress/.cache
rm -rf docs/.vuepress/dist

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 检查依赖版本
npm outdated
npm audit

# 更新依赖
npm update
npm audit fix
```

## 📋 问题报告模板

当遇到无法解决的问题时，请按以下模板提供信息：

```markdown
## 问题描述
简要描述遇到的问题

## 环境信息
- 操作系统：
- Node.js 版本：
- npm 版本：
- VuePress 版本：

## 重现步骤
1. 
2. 
3. 

## 期望行为
描述期望的正确行为

## 实际行为
描述实际发生的情况

## 错误日志
```
粘贴完整的错误日志
```

## 相关配置
```javascript
// 粘贴相关的配置文件内容
```

## 已尝试的解决方案
列出已经尝试过的解决方法
```

## 🆘 获取帮助

### 官方资源
- [VuePress 官方文档](https://vuepress.vuejs.org/)
- [VuePress GitHub Issues](https://github.com/vuejs/vuepress/issues)
- [Vue.js 官方论坛](https://forum.vuejs.org/)

### 社区资源
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vuepress)
- [Vue.js Discord](https://discord.com/invite/vue)
- [中文社区](https://www.vue-js.com/)

### 联系方式
- **邮箱**：jurelxc@163.com
- **GitHub Issues**：[项目 Issues](https://github.com/acsweets/viki/issues)

---

*如果本指南没有解决您的问题，请通过上述渠道寻求帮助。*