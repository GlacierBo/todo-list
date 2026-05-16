# 个人文档站点

一个基于 VuePress 2 构建的现代化个人文档站点，用于记录技术文章、生活日志、读书笔记等内容。

## 📋 项目简介

这是一个个人知识管理和内容分享平台，包含以下主要内容：

### 📚 技术文章
- Go 语言学习笔记
- Docker 容器化技术
- Kubernetes 集群管理
- 其他技术实践和踩坑记录

### 📔 生活日志
- 年度总结与反思
- 生活随笔和感悟
- 个人成长记录

### 📖 读书笔记
- 技术书籍阅读心得
- 非技术类书籍感悟
- 知识整理与分享

### 💻 代码片段
- 常用命令备忘
- 配置模板
- 实用工具脚本

## 🛠️ 技术栈

- **VuePress 2** - Vue 驱动的静态网站生成器
- **Vite** - 下一代前端构建工具
- **TypeScript** - 类型安全的 JavaScript 超集
- **Default Theme** - VuePress 默认主题

## 📁 项目结构

```
.
├── docs/                   # VuePress 文档目录
│   ├── .vuepress/          # VuePress 配置
│   │   ├── public/         # 静态资源
│   │   ├── config.ts       # 主配置文件
│   │   └── client.ts       # 客户端配置
│   ├── guide/              # 指南文档
│   ├── tech/               # 技术文章
│   ├── journal/            # 生活日志
│   ├── reading/            # 读书笔记
│   ├── snippets/           # 代码片段
│   ├── money/              # 搞钱计划
│   ├── nav/                # 导航页面
│   ├── image/              # 图片资源
│   └── README.md           # 文档首页
├── .github/                # GitHub 配置
│   └── workflows/          # GitHub Actions CI/CD
├── package.json            # 项目依赖配置
├── netlify.toml            # Netlify 部署配置
└── README.md               # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9 或 yarn >= 1.22

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

启动本地开发服务器：

```bash
npm run docs:dev
# 或
yarn docs:dev
```

访问 http://localhost:8080/ 查看文档。

### 构建生产版本

```bash
npm run docs:build
# 或
yarn docs:build
```

构建产物位于 `docs/.vuepress/dist` 目录。

### 预览生产构建

```bash
npm run docs:serve
# 或
yarn docs:serve
```

## 🌐 部署

### GitHub Pages

项目已配置 GitHub Actions 自动部署到 GitHub Pages。

推送代码到 `main` 分支后，会自动触发部署流程。

### Netlify

项目包含 `netlify.toml` 配置文件，可以直接连接到 Netlify 进行自动部署。

### 手动部署

构建后将 `docs/.vuepress/dist` 目录的内容部署到您的服务器即可。

## 📝 添加新内容

### 添加技术文章

在 `docs/tech/` 目录下创建新的 Markdown 文件：

```markdown
---
title: 文章标题
date: 2026-05-16
tags:
  - 标签1
  - 标签2
---

# 文章标题

文章内容...
```

### 添加生活日志

在 `docs/journal/年份/` 目录下创建新的 Markdown 文件。

### 添加读书笔记

在 `docs/reading/` 目录下创建新的 Markdown 文件。
