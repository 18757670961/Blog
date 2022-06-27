import { defineUserConfig } from 'vuepress'
import { gungnirTheme } from 'vuepress-theme-gungnir'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  lang: 'en-US',
  title: "Desmond's Blog",
  description: 'About Programming & Design',
  plugins: [
    mediumZoomPlugin({
      // options
    }),
    // searchPlugin({
    //   isSearchable: (page) => !["Tags", "Links", "HomePage"].includes(page.frontmatter.layout)
    // })
  ],
  markdown: {
    extractHeaders: {
      level: [2, 3, 4, 5],
    },
    code: {
      lineNumbers: false,
    },
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/img/logo/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/img/logo/favicon-32x32.png`,
      },
    ],
  ],
  theme: gungnirTheme({
    repo: 'shuguang-lv/Blog',
    docsBranch: 'VuePress',
    themePlugins: {
      // search: false,
      katex: true,
      mermaid: true,
      mdPlus: {
        all: true, // enable all features (default: false)
      },
      giscus: {
        repo: 'shuguang-lv/Blog', // required, string, format: user_name/repo_name
        repoId: 'MDEwOlJlcG9zaXRvcnkyNzY2MzcwMTc=', // required, string, generate it on Giscus's website
        category: 'Announcements', // required, string
        categoryId: 'DIC_kwDOEH0lWc4CPVvC', // required, string, generate it on Giscus's website
        lazyLoad: true, // optional, boolean, default=false (if true, loading of Giscus will be deferred until the user scrolls near the comments container)
        theme: 'preferred_color_scheme', // optional, string, default="light"
      },
    },
    navbarTitle: '$ cd /Desmond/Blog',
    navbar: [
      {
        text: 'Home',
        link: '/',
        icon: 'fa-fort-awesome',
      },
      {
        text: 'Tags',
        link: '/tags/',
        icon: 'fa-tag',
      },
      {
        text: 'About',
        link: '/about',
        icon: 'fa-paw',
      },
      {
        text: 'Resume',
        link: 'https://bearfoundersfiles.s3.amazonaws.com/media/files/user_files/f09a7d2858434a3abc2a3015e5e3f942.pdf',
        icon: 'ai-cv-square',
      },
    ],
    personalInfo: {
      // required: nickname, will be showed on home page, mobile sidebar and author info of articles
      name: 'Shuguang LYU (Desmond)',
      // required: avatar, will be showed on home page and mobile sidebar
      avatar: '/img/avatar.png',
      // required: a description, will be showed on home page
      description: 'A blog about Programming & Design',
      // optional: id of social platform, will be showed on home page and mobile sidebar
      sns: {
        github: 'shuguang-lv', // Github
        linkedin: 'shuguang-lyu-7371311a3', // Linkedin
        // facebook: 'renovamen.zou',  // Facebook
        // twitter: 'renovamen_zxh',  // Twitter
        // zhihu: 'chao-neng-gui-su',  // Zhihu
        // weibo: 'your-weibo-id',  // Sina Weibo
        email: 'shuguang-lv@outlook.com', // Email
        // rss: "/rss.xml",  // link to RSS file
        // if you want to add other social platforms
        // bilibili: {  // any name you want
        //   icon: "ri-bilibili-line",  // platform icon
        //   link: "https://www.bilibili.com/"  // profile URL
        // }
      },
    },
    homeHeaderImages: [
      {
        path: '/img/home-bg/1.jpg',
        mask: 'rgb(45, 55, 71, .4)',
      },
      {
        path: '/img/home-bg/2.jpg',
        mask: 'rgba(45, 55, 71, .4)',
      },
    ],
    pages: {
      // tags page
      tags: {
        // optional: subtitle of tags page
        // subtitle: 'Hey! Here is tags page!',

        // optional: paths to and masks of the tags page cover images
        bgImage: {
          path: '/img/pages/tags.jpg',
          mask: 'rgba(45, 55, 71, .4)',
        },
      },

      // links page
      // links: {
      //   // optional: subtitle of links page
      //   // subtitle: 'Hey! Here is links page!',

      //   // optional: paths to and masks of the links page cover images
      //   bgImage: {
      //     path: '/img/pages/links.jpg',
      //     mask: 'rgba(45, 55, 71, 0.4)'
      //   }
      // }
    },
    footer: `
      &copy; <a href="https://github.com/shuguang-lv" target="_blank">Desmond</a> 2020-2022
      <br>
      Powered by <a href="https://v2.vuepress.vuejs.org" target="_blank">VuePress</a> &
      <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>
    `,
  }),
})
