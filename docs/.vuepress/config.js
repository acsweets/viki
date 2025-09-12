module.exports = {
  title: '星星 · 小宇宙',
  description: '记录我的再学习旅程、探索欲与创造力的星系笔记',
  base: '/viki/',
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap', rel: 'stylesheet' }]
  ],
  themeConfig: {
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '📚 文章列表', link: '/posts/' },
      { text: '🌱 成长仪式', link: '/ritual/' },
      { text: '✨ 哇因子', link: '/wow/' },
      { text: '🎯 技术卡片', link: '/tech-cards/' },
      { text: '🧪 内驱力实验室', link: '/lab/' },
      { text: '👋 关于我', link: '/about/' }
    ],
    sidebar: false,
    lastUpdated: '最后更新',
    repo: 'acsweets/viki',
    repoLabel: 'GitHub',
    editLinks: false
  },
  plugins: []
}