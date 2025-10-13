const fs = require('fs');
const path = require('path');

// 重命名文件，使用英文文件名
const renames = [
  {
    old: 'docs/posts/2024/2024-11-17-Flutter-如何实现一个边线按钮.md',
    new: 'docs/posts/2024/2024-11-17-flutter-border-button.md'
  },
  {
    old: 'docs/posts/2024/2024-10-22-设计模式小案例之单例.md', 
    new: 'docs/posts/2024/2024-10-22-design-pattern-singleton.md'
  },
  {
    old: 'docs/posts/2024/2024-10-12-手搓一个跟随鼠标移动的浮窗组件.md',
    new: 'docs/posts/2024/2024-10-12-mouse-follow-popup.md'
  }
];

renames.forEach(rename => {
  if (fs.existsSync(rename.old)) {
    fs.renameSync(rename.old, rename.new);
    console.log(`Renamed: ${rename.old} -> ${rename.new}`);
  }
});