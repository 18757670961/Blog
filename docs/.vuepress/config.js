/*
 * @Author: your name
 * @Date: 2021-05-21 23:34:49
 * @LastEditTime: 2021-05-22 00:30:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Blog\docs\.vuepress\config.js
 */

module.exports = {
  title: 'Desmond的避难所',
  description: '吕曙光的个人博客',
  theme: 'reco',
  themeConfig: {
    // 博客配置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category', // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag', // 默认文案 “标签”
      },
      socialLinks: [
        // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/recoluan' },
        { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' },
      ],
    },
  },
}
