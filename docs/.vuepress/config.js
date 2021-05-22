/*
 * @Author: your name
 * @Date: 2021-05-21 23:34:49
 * @LastEditTime: 2021-05-22 12:35:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Blog\docs\.vuepress\config.js
 */

module.exports = {
  title: 'Desmond的避难所',
  description: 'bury the past, sow the future',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    // 博客配置
    blogConfig: {
      // category: {
      //   location: 3, // 在导航栏菜单中所占的位置，默认2
      //   text: 'Category', // 默认文案 “分类”
      // },
      tag: {
        location: 5, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag', // 默认文案 “标签”
      },
      socialLinks: [
        // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/recoluan' },
        { icon: 'reco-wechat', link: 'https://www.npmjs.com/~reco_luan' },
        { icon: 'reco-facebook', link: 'https://www.npmjs.com/~reco_luan' },
        { icon: 'reco-linkedin', link: 'https://www.npmjs.com/~reco_luan' },
        { icon: 'reco-twitter', link: 'https://www.npmjs.com/~reco_luan' },
        { icon: 'reco-email', link: 'https://www.npmjs.com/~reco_luan' },
      ],
    },
    type: 'blog',
    authorAvatar: '/avatar.jpg',
    author: 'Desmond',
    subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    nav: [
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'About', link: '/about.html', icon: 'reco-account' }
      // { text: 'Menu', link: 'https://www.npmjs.com/~reco_luan', icon: 'reco-menu' },
    ],
    valineConfig: {
      appId: 'ld71aOoHttYMrEYndC0DMJQC-gzGzoHsz',// your appId
      appKey: '2odP1opK8R97ry76E2OHjR9N', // your appKey
    },
    // 备案
    record: 'ICP 备案文案',
    recordLink: 'ICP 备案指向链接',
    cyberSecurityRecord: '公安部备案文案',
    cyberSecurityLink: '公安部备案指向链接',
    // 项目开始时间，只填写年份
    startYear: '2020'
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    '@vuepress/active-header-links',
    // '@vuepress/back-to-top',
    // '@vuepress/blog',
    '@vuepress/medium-zoom',
    '@vuepress/nprogress',
    'vuepress-plugin-smooth-scroll',
    'vuepress-plugin-copyright'
  ],
}