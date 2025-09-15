const fs = require('fs');

// 手动解析几个示例文章
const articles = [
  {
    title: "Flutter 布局 小 tips ，IntrinsicHeight 组件",
    brief_content: "IntrinsicHeight 组件 测量所有子 widget 的自然高度，然后把它们的高度都设置为最长的那个，使得它们垂直方向对齐。",
    mtime: 1751362672
  },
  {
    title: "插件 stomp_dart_client 简单使用", 
    brief_content: "插件 stomp_dart_client 简单使用 初始化StompClient 链接 订阅服务信息",
    mtime: 1750928823
  },
  {
    title: "Flutter Navigator 锁定错误",
    brief_content: "导航跳转时提示报错 Assertion failed",
    mtime: 1750141337
  }
];

// 生成文章
articles.forEach(article => {
  const date = new Date(article.mtime * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const dateStr = `${year}-${month}-${day}`;
  const filename = `${dateStr}-${article.title.replace(/[^\w\u4e00-\u9fa5]/g, '-').replace(/-+/g, '-')}.md`;
  
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
  
  const filePath = `docs/posts/${year}/${filename}`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created: ${filePath}`);
});