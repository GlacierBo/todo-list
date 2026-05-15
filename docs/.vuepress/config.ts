import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { path } from 'vuepress/utils'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'TodoList 文档',
  description: '一个基于 Vue 3 的待办事项列表应用',
  base: '/todo-list/',
  
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../../src')
        }
      },
      server: {},
      plugins: [
        {
          name: 'redirect-base',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              if (req.url === '/todo-list' || req.url === '/todo-list?') {
                res.writeHead(302, { Location: '/todo-list/' })
                res.end()
                return
              }
              next()
            })
          }
        }
      ]
    }
  }),
  
  theme: defaultTheme({
    logo: '/favicon.svg',
    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'TodoList', link: '/todolist.html' },
      { text: '技术', link: '/tech/' },
      { text: '日志', link: '/journal/' },
      { text: '读书笔记', link: '/reading/' },
      { text: '代码片', link: '/snippets/' },
      { text: '导航', link: '/nav/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          children: [
            { text: '介绍', link: '/guide/introduction.md' },
            { text: '快速开始', link: '/guide/getting-started.md' },
            { text: '功能特性', link: '/guide/features.md' },
          ],
        },
      ],
      '/tech/': [
        {
          text: '技术文章',
          children: [
            { text: 'Go学习笔记', link: '/tech/Go学习笔记.md' },
            { text: 'GoWeb学习笔记', link: '/tech/GoWeb学习笔记.md' },
            { text: 'Docker学习笔记', link: '/tech/docker学习笔记.md' },
            { text: 'k8s', link: '/tech/k8s.md' },
            { text: 'Envoy', link: '/tech/Envoy.md' },
            { text: 'CoreDNS', link: '/tech/coreDNS.md' },
            { text: 'Rancher踩坑记录', link: '/tech/Rancher踩坑记录.md' },
            { text: '青龙面板', link: '/tech/青龙面板.md' },
            { text: 'Coding自动化部署项目', link: '/tech/coding自动化部署项目.md' },
            { text: 'Docker部署Minecraft', link: '/tech/docker部署minecraft.md' },
            { text: '一些比较有意思的Docker项目', link: '/tech/一些比较有意思的docker项目.md' },
          ],
        },
      ],
      '/journal/': [
        {
          text: '年度总结',
          children: [
            { text: '2022年终总结', link: '/journal/2022/2022年年终总结.md' },
            { text: '2021年终总结', link: '/journal/2021/2021年终总结.md' },
            { text: '2020年终总结', link: '/journal/2020/2020年终总结.md' },
            { text: '比完美更重要的是完成', link: '/journal/2019/比完美更重要的是完成.md' },
            { text: '毕业一周年', link: '/journal/2018/毕业一周年.md' },
          ],
        },
        {
          text: '生活随笔',
          children: [
            { text: '我又开始写博客了', link: '/journal/2022/我又开始写博客了.md' },
            { text: '从一张保单说起', link: '/journal/2022/从一张保单说起.md' },
            { text: '面朝大海，春暖花开', link: '/journal/2020/面朝大海，春暖花开.md' },
            { text: '讲个年轻时候的故事', link: '/journal/2020/讲个年轻时候的故事.md' },
            { text: '我们期待五颜六色的人生，却不得不向黑白灰的现实低头', link: '/journal/2019/我们期待五颜六色的人生，却不得不向黑白灰的现实低头.md' },
          ],
        },
      ],
      '/reading/': [
        {
          text: '读书笔记',
          children: [
            { text: '对线面试官', link: '/reading/对线面试官.md' },
            { text: '小岛经济学', link: '/reading/小岛经济学.md' },
            { text: '没有谁是一座孤岛', link: '/reading/没有谁是一座孤岛.md' },
            { text: '软件变现-产品规划和设计', link: '/reading/软件变现-产品规划和设计.md' },
          ],
        },
      ],
      '/snippets/': [
        {
          text: '代码片段',
          children: [
            { text: 'Docker命令备忘', link: '/snippets/docker命令备忘.md' },
            { text: 'Docker Nginx配置', link: '/snippets/docker_nginx.md' },
            { text: 'Docsify文档Docker部署', link: '/snippets/docsify文档docker部署.md' },
            { text: 'OpenSSL自签证书', link: '/snippets/openssl自签证书.md' },
          ],
        },
      ],
      '/nav/': [
        {
          text: '导航',
          children: [
            { text: '关于', link: '/nav/about.md' },
            { text: '常用链接', link: '/nav/links.md' },
          ],
        },
      ],
    },
  }),
})
