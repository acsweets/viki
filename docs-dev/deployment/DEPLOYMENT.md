# 部署文档

## 🚀 部署方案概览

### 支持的部署平台

| 平台 | 难度 | 费用 | 自动化 | 推荐度 |
|------|------|------|--------|--------|
| GitHub Pages | ⭐ | 免费 | ✅ | ⭐⭐⭐⭐⭐ |
| Vercel | ⭐⭐ | 免费 | ✅ | ⭐⭐⭐⭐ |
| Netlify | ⭐⭐ | 免费 | ✅ | ⭐⭐⭐⭐ |
| 自建服务器 | ⭐⭐⭐⭐ | 付费 | ⚙️ | ⭐⭐⭐ |

## 📋 部署前准备

### 环境检查

```bash
# 检查 Node.js 版本
node --version  # >= 14.0.0

# 检查 npm 版本
npm --version   # >= 6.0.0

# 检查项目依赖
npm list --depth=0
```

### 构建测试

```bash
# 本地构建测试
npm run build

# 检查构建产物
ls -la docs/.vuepress/dist/

# 本地预览
npx serve docs/.vuepress/dist
```

## 🎯 GitHub Pages 部署（推荐）

### 自动部署配置

项目已配置 GitHub Actions 自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs/.vuepress/dist
```

### 部署步骤

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "feat: update content"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 找到 Pages 选项
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "gh-pages"

3. **配置自定义域名（可选）**
   ```bash
   # 在 docs/.vuepress/public/ 目录下创建 CNAME 文件
   echo "your-domain.com" > docs/.vuepress/public/CNAME
   ```

### 访问地址

- 默认地址：`https://username.github.io/repository-name/`
- 自定义域名：`https://your-domain.com/`

## ⚡ Vercel 部署

### 快速部署

1. **连接 GitHub 仓库**
   - 访问 [Vercel](https://vercel.com/)
   - 点击 "New Project"
   - 选择 GitHub 仓库

2. **配置构建设置**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "docs/.vuepress/dist",
     "installCommand": "npm install"
   }
   ```

3. **环境变量配置**
   ```bash
   NODE_VERSION=16
   NPM_VERSION=8
   ```

### 自定义配置

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "docs/.vuepress/dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## 🌐 Netlify 部署

### 拖拽部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **上传构建产物**
   - 访问 [Netlify](https://netlify.com/)
   - 拖拽 `docs/.vuepress/dist` 文件夹

### Git 集成部署

1. **连接仓库**
   - 选择 "New site from Git"
   - 连接 GitHub 仓库

2. **构建配置**
   ```bash
   Build command: npm run build
   Publish directory: docs/.vuepress/dist
   ```

3. **环境变量**
   ```bash
   NODE_VERSION=16
   NPM_VERSION=8
   ```

### 自定义配置

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "docs/.vuepress/dist"

[build.environment]
  NODE_VERSION = "16"
  NPM_VERSION = "8"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🖥️ 自建服务器部署

### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/viki;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 部署脚本

```bash
#!/bin/bash
# deploy.sh

# 构建项目
npm run build

# 上传到服务器
rsync -avz --delete docs/.vuepress/dist/ user@server:/var/www/viki/

# 重启 Nginx
ssh user@server "sudo systemctl reload nginx"

echo "部署完成！"
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:16-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/docs/.vuepress/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# 构建镜像
docker build -t viki-blog .

# 运行容器
docker run -d -p 80:80 viki-blog
```

## 🔧 部署优化

### 性能优化

1. **启用 Gzip 压缩**
   ```nginx
   gzip on;
   gzip_comp_level 6;
   gzip_types text/plain text/css application/json application/javascript;
   ```

2. **设置缓存策略**
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **启用 HTTP/2**
   ```nginx
   listen 443 ssl http2;
   ```

### SEO 优化

1. **配置 robots.txt**
   ```txt
   # docs/.vuepress/public/robots.txt
   User-agent: *
   Allow: /
   
   Sitemap: https://your-domain.com/sitemap.xml
   ```

2. **生成 sitemap**
   ```javascript
   // docs/.vuepress/config.js
   plugins: [
     ['sitemap', {
       hostname: 'https://your-domain.com'
     }]
   ]
   ```

### 安全配置

1. **HTTPS 配置**
   ```nginx
   server {
       listen 443 ssl;
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
   }
   ```

2. **安全头部**
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN";
   add_header X-Content-Type-Options "nosniff";
   add_header X-XSS-Protection "1; mode=block";
   ```

## 🚨 故障排除

### 常见问题

**Q: 部署后页面显示 404？**
```bash
# 检查 base 配置
# docs/.vuepress/config.js
module.exports = {
  base: '/repository-name/'  // 确保与仓库名一致
}
```

**Q: 静态资源加载失败？**
```bash
# 检查资源路径
# 使用相对路径或绝对路径
![image](./assets/image.png)  # 相对路径
![image](/assets/image.png)   # 绝对路径
```

**Q: GitHub Actions 构建失败？**
```bash
# 检查 Node.js 版本
# .github/workflows/deploy.yml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '16'  # 确保版本兼容
```

### 调试技巧

1. **查看构建日志**
   ```bash
   npm run build --verbose
   ```

2. **本地模拟生产环境**
   ```bash
   npm run build
   npx serve docs/.vuepress/dist -s
   ```

3. **检查网络请求**
   - 使用浏览器开发者工具
   - 查看 Network 面板
   - 检查失败的请求

## 📊 监控与维护

### 性能监控

1. **Google Analytics**
   ```javascript
   // docs/.vuepress/config.js
   plugins: [
     ['@vuepress/google-analytics', {
       'ga': 'UA-XXXXXXXXX-X'
     }]
   ]
   ```

2. **Lighthouse 评分**
   ```bash
   # 安装 Lighthouse CLI
   npm install -g lighthouse
   
   # 运行性能测试
   lighthouse https://your-domain.com --output html --output-path ./report.html
   ```

### 自动化维护

```bash
#!/bin/bash
# maintenance.sh

# 更新依赖
npm update

# 安全审计
npm audit fix

# 重新构建
npm run build

# 部署更新
git add .
git commit -m "chore: update dependencies"
git push origin main
```

---

*部署过程中遇到问题？请查看 [故障排除指南](../TROUBLESHOOTING.md)*