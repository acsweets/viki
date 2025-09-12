# 星星 · 小宇宙 | 个人博客

> 记录我的再学习旅程、探索欲与创造力的星系笔记

## 📖 项目简介

基于 VuePress 构建的个人技术博客，专注于 Flutter 开发经验分享、学习内驱力探索和创造力记录。采用现代化设计理念，提供沉浸式阅读体验。

## ✨ 核心功能

- **🌱 成长仪式**：每日打卡记录，哇因子收集，学习进度追踪
- **✨ 哇因子**：灵感卡片墙，记录技术突破和创意时刻
- **🎯 技术卡片**：Flutter 开发笔记，代码片段，技术知识库
- **🧪 内驱力实验室**：学习方法论探索，心智模型构建
- **👤 个人档案**：技能展示，项目经历，联系方式

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:8080` 查看效果

### 构建生产版本

```bash
npm run build
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

## 📁 项目结构

```
viki/
├── docs/                          # 文档源码
│   ├── .vuepress/                 # VuePress 配置
│   │   ├── config.js              # 站点配置
│   │   └── styles/                # 自定义样式
│   │       └── index.styl         # 全局样式
│   ├── README.md                  # 首页
│   ├── about/                     # 关于页面
│   ├── ritual/                    # 成长仪式
│   ├── wow/                       # 哇因子
│   ├── tech-cards/                # 技术卡片
│   ├── lab/                       # 内驱力实验室
│   └── posts/                     # 文章归档
├── .github/                       # GitHub 配置
│   └── workflows/                 # 自动部署
│       └── deploy.yml             # CI/CD 配置
├── .vscode/                       # VSCode 配置
│   ├── launch.json                # 调试配置
│   ├── tasks.json                 # 任务配置
│   └── settings.json              # 工作区设置
├── package.json                   # 项目配置
└── README.md                      # 项目说明
```

## 🎨 设计特色

### 视觉风格
- **配色方案**：星空蓝主色调 + 紫光渐变
- **UI 风格**：温柔宇宙感，卡片化设计
- **动效设计**：悬浮效果，渐变高光，流畅动画

### 技术特性
- **响应式设计**：完美适配移动端和桌面端
- **SEO 优化**：静态生成，搜索引擎友好
- **性能优化**：代码分割，懒加载，CDN 加速
- **可访问性**：符合 WCAG 标准

## 📝 内容管理

### 添加新文章

1. 在 `docs/posts/` 目录创建 Markdown 文件
2. 文件命名格式：`YYYY-MM-DD-title.md`
3. 更新 `docs/posts/README.md` 添加文章链接
4. 更新导航配置（如需要）

### 添加技术卡片

1. 在 `docs/tech-cards/` 目录创建文件
2. 使用统一的卡片模板格式
3. 添加相关标签和分类

### 记录哇因子

1. 在 `docs/wow/` 页面添加新的灵感卡片
2. 选择合适的情绪标签
3. 更新统计数据

## 🛠 开发指南

### 自定义样式

在 `docs/.vuepress/styles/index.styl` 中添加自定义样式：

```stylus
// 自定义变量
:root
  --custom-color: #your-color

// 自定义样式
.your-class
  color: var(--custom-color)
```

### 配置修改

在 `docs/.vuepress/config.js` 中修改站点配置：

```javascript
module.exports = {
  title: '站点标题',
  description: '站点描述',
  // 其他配置...
}
```

### VSCode 开发

项目已配置 VSCode 开发环境：

- 按 `F5` 启动调试模式
- 使用 `Ctrl+Shift+P` → "Tasks: Run Task" 运行任务
- 支持热重载和实时预览

## 🚀 部署方案

### GitHub Pages（推荐）

1. 推送代码到 GitHub 仓库
2. 启用 GitHub Pages 功能
3. GitHub Actions 自动构建部署

### 其他平台

- **Vercel**：连接 GitHub 仓库，自动部署
- **Netlify**：拖拽 `dist` 文件夹部署
- **自建服务器**：上传构建产物到服务器

## 📊 性能优化

- 图片懒加载和压缩
- CSS/JS 代码分割
- 字体子集化
- CDN 资源加速
- Service Worker 缓存

## 🔧 故障排除

### 常见问题

**Q: 本地开发服务器启动失败？**
A: 检查 Node.js 版本，清除 `node_modules` 重新安装

**Q: 样式不生效？**
A: 检查 Stylus 语法，确保文件路径正确

**Q: 部署后页面空白？**
A: 检查 `base` 配置是否与仓库名匹配

### 调试技巧

1. 使用浏览器开发者工具
2. 查看控制台错误信息
3. 检查网络请求状态
4. 验证构建产物结构

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 发起 Pull Request

### 代码规范

- 使用 ESLint 和 Prettier
- 遵循 Vue.js 风格指南
- 编写清晰的提交信息

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

- **邮箱**：jurelxc@163.com
- **GitHub**：[@acsweets](https://github.com/acsweets)
- **博客**：[星星·小宇宙](https://acsweets.github.io/viki/)

---

*"代码是写给人看的，只是顺便让机器执行"*