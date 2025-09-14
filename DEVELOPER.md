# 星星·小宇宙 开发者文档

## 项目概述

基于 VuePress 1.x 构建的个人技术博客，采用现代化设计理念，专注于 Flutter 开发经验分享和学习内驱力探索。

## 技术栈

- **框架**: VuePress 1.9.7
- **样式**: Stylus
- **部署**: GitHub Pages + GitHub Actions
- **开发工具**: VSCode + 调试配置

## 项目架构

```
viki/
├── docs/                    # VuePress 源码目录
│   ├── .vuepress/          # VuePress 配置
│   │   ├── config.js       # 站点配置
│   │   ├── public/         # 静态资源
│   │   └── styles/         # 自定义样式
│   ├── README.md           # 首页
│   ├── posts/              # 技术文章
│   ├── ritual/             # 成长仪式
│   ├── wow/                # 哇因子
│   └── about/              # 关于页面
├── .github/workflows/      # CI/CD 配置
├── .vscode/                # VSCode 配置
└── package.json            # 项目依赖
```

## 开发环境

### 系统要求
- Node.js >= 14.0.0
- npm >= 6.0.0

### 环境配置

**macOS (Homebrew)**:
```bash
export PATH="/opt/homebrew/bin:$PATH"
```

**Windows**:
使用默认 PATH 配置

### 安装与运行

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## VSCode 调试配置

项目包含两套调试配置：

1. **Windows 配置**: 使用反斜杠路径分隔符
2. **macOS 配置**: 包含 Homebrew PATH 环境变量

按 `F5` 启动对应系统的调试配置。

## 内容管理

### 文章发布流程

1. 在 `docs/posts/` 创建 Markdown 文件
2. 文件命名: `YYYY-MM-DD-title.md`
3. 添加 frontmatter 元数据
4. 更新导航配置（如需要）

### 页面结构

- **首页**: 个人介绍、技能展示、成长履历
- **技术文章**: 按时间倒序的文章列表
- **成长仪式**: 学习打卡记录
- **哇因子**: 灵感卡片收集

## 样式系统

### 设计语言
- **主色调**: 星空蓝 + 紫光渐变
- **UI 风格**: 卡片化设计，温柔宇宙感
- **动效**: 悬浮效果、渐变高光

### 自定义样式
在 `docs/.vuepress/styles/index.styl` 中添加：

```stylus
:root
  --primary-color: #your-color

.custom-class
  color: var(--primary-color)
```

## 部署流程

### GitHub Actions 自动部署

触发条件：推送到 `main` 分支

部署流程：
1. 安装 Node.js 环境
2. 安装项目依赖
3. 构建静态文件
4. 部署到 `gh-pages` 分支

### 手动部署

```bash
npm run build
npm run deploy
```

## 性能优化

- 代码分割和懒加载
- 图片压缩和 CDN 加速
- CSS/JS 文件压缩
- Service Worker 缓存

## 开发规范

### 文件命名
- 文章: `YYYY-MM-DD-title.md`
- 组件: PascalCase
- 样式: kebab-case

### Git 工作流
- `main`: 生产分支
- `develop`: 开发分支
- `feature/*`: 功能分支

### 代码规范
- 使用 ESLint + Prettier
- 遵循 Vue.js 风格指南
- 编写清晰的提交信息

## 故障排除

### 常见问题

**Node.js 找不到**:
- 检查 PATH 环境变量
- 使用完整路径运行命令

**样式不生效**:
- 检查 Stylus 语法
- 确认文件路径正确

**部署失败**:
- 检查 GitHub Pages 设置
- 验证 `base` 配置

### 调试技巧

1. 使用浏览器开发者工具
2. 检查控制台错误信息
3. 验证构建产物结构
4. 查看网络请求状态

## 扩展开发

### 添加新页面
1. 在 `docs/` 下创建目录
2. 添加 `README.md` 文件
3. 更新导航配置

### 自定义组件
1. 在 `.vuepress/components/` 创建 Vue 组件
2. 在 Markdown 中直接使用

### 插件集成
在 `config.js` 中添加插件配置：

```javascript
module.exports = {
  plugins: [
    ['plugin-name', options]
  ]
}
```

## 维护指南

### 依赖更新
```bash
npm audit
npm update
```

### 备份策略
- 定期推送到远程仓库
- 重要内容本地备份
- 使用 Git 标签标记版本

### 监控指标
- 页面加载速度
- 构建时间
- 部署成功率

---

<div align="center">

**开发者文档** | 最后更新: 2024年

</div>