# Viki的个人博客

基于VuePress构建的静态个人博客，支持Markdown格式文章。

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 部署到GitHub Pages
npm run deploy
```

## 项目结构

```
viki/
├── docs/
│   ├── .vuepress/
│   │   └── config.js          # VuePress配置
│   ├── posts/                 # 文章目录
│   │   ├── README.md          # 文章列表
│   │   └── *.md              # 具体文章
│   └── README.md             # 首页
├── .github/
│   └── workflows/
│       └── deploy.yml        # 自动部署配置
└── package.json
```

## 写作指南

1. 在 `docs/posts/` 目录下创建新的Markdown文件
2. 文件名建议格式：`YYYY-MM-DD-title.md`
3. 更新 `docs/posts/README.md` 添加文章链接
4. 更新 `docs/.vuepress/config.js` 中的侧边栏配置

## 部署

推送到GitHub后，GitHub Actions会自动构建并部署到GitHub Pages。

访问地址：`https://yourusername.github.io/viki/`