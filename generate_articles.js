const fs = require('fs');
const path = require('path');

// 读取文章数据
const data = fs.readFileSync('docs/posts/文章数据.txt', 'utf8');

// 解析数据
const articles = [];
const lines = data.split('\n');
let currentArticle = {};

for (let line of lines) {
  line = line.trim();
  if (line.includes('"title":')) {
    if (currentArticle.title) {
      articles.push(currentArticle);
    }
    currentArticle = {};
    const titleMatch = line.match(/"title":\s*"([^"]+)"/);
    if (titleMatch) currentArticle.title = titleMatch[1];
  } else if (line.includes('"brief_content":')) {
    const briefMatch = line.match(/"brief_content":\s*"([^"]+)"/);
    if (briefMatch) currentArticle.brief_content = briefMatch[1];
  } else if (line.includes('"mtime":')) {
    const mtimeMatch = line.match(/"mtime":\s*"(\d+)"/);
    if (mtimeMatch) currentArticle.mtime = parseInt(mtimeMatch[1]);
  }
}
if (currentArticle.title) {
  articles.push(currentArticle);
}

// 按时间排序
articles.sort((a, b) => b.mtime - a.mtime);

// 生成文章文件
articles.forEach(article => {
  const date = new Date(article.mtime * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const dateStr = `${year}-${month}-${day}`;
  const filename = `${dateStr}-${article.title.replace(/[^\w\u4e00-\u9fa5]/g, '-')}.md`;
  const yearDir = `docs/posts/${year}`;
  
  // 创建年份目录
  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true });
  }
  
  // 生成文章内容
  const content = `---
title: ${article.title}
date: ${dateStr}
description: ${article.brief_content}
---

# ${article.title}

> ${article.brief_content}

## 概述

*文章内容待补充...*

## 详细内容

*请在此处添加具体的技术内容、代码示例和实践经验。*

---

*发布时间：${dateStr}*
`;
  
  const filePath = path.join(yearDir, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created: ${filePath}`);
});

console.log(`Generated ${articles.length} articles`);