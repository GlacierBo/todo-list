# TodoList 文档站点

一个基于 VuePress 2 的文档站点，集成了 TodoList 应用演示。

## 📋 项目简介

这是一个个人文档站点，包含技术文章、生活日志、读书笔记等内容，同时集成了一个功能完整的 TodoList 应用作为演示。

### 主要功能

- 📝 **TodoList 应用** - 独立的待办事项管理工具
  - ✅ 添加、编辑、删除任务
  - 🎯 优先级管理（低/中/高）
  - 💾 LocalStorage 本地存储
  - 🎨 美观的渐变界面
  
- 📚 **文档系统** - 基于 VuePress 2
  - 技术文章（Go、Docker、K8s 等）
  - 年度总结和生活随笔
  - 读书笔记
  - 代码片段备忘

## 🛠️ 技术栈

### 核心框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **VuePress 2** - Vue 驱动的静态网站生成器
- **Vite** - 下一代前端构建工具

### 数据存储
- **LocalStorage** - 浏览器本地存储（TodoList 数据）

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化

## 📁 项目结构

```
todo-list/
├── src/                    # TodoList 应用源代码
│   ├── components/         # Vue 组件
│   │   ├── ConfirmDialog.vue    # 确认对话框组件
│   │   └── TodoList.vue         # TodoList 组件（备用）
│   ├── composables/        # 组合式函数
│   │   └── useTodos.ts          # Todo 业务逻辑
│   ├── types/              # TypeScript 类型定义
│   │   └── todo.ts              # Todo 类型定义
│   ├── App.vue             # 应用根组件
│   └── main.ts             # 应用入口
├── docs/                   # VuePress 文档
│   ├── .vuepress/          # VuePress 配置
│   │   ├── public/         # 静态资源（favicon 等）
│   │   │   └── favicon.svg
│   │   ├── config.ts       # VuePress 主配置
│   │   └── client.ts       # 客户端配置
│   ├── guide/              # 指南文档
│   ├── tech/               # 技术文章
│   ├── journal/            # 生活日志
│   ├── reading/            # 读书笔记
│   ├── snippets/           # 代码片段
│   ├── nav/                # 导航页面
│   ├── image/              # 图片资源
│   ├── todolist.vue        # TodoList 独立页面
│   └── README.md           # 文档首页
├── public/                 # 静态资源
│   └── favicon.svg
├── index.html              # Vite 入口
├── vite.config.ts          # Vite 构建配置
├── .lingma/                # 归档文档
├── .github/                # GitHub 配置
│   └── workflows/          # GitHub Actions
├── package.json            # 项目依赖
└── tsconfig.json           # TypeScript 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装和运行

```bash
# 克隆项目
git clone <repository-url>
cd todo-list

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 访问 http://localhost:8080/todo-list/
```

### 可用脚本

```bash
# 开发模式 - 启动 VuePress 开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览生产构建
npm run docs:serve

# 代码检查
npm run lint
```

## 🌐 部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages。

推送代码到 main 分支后，会自动触发部署流程。

构建产物位于 `docs/.vuepress/dist` 目录。

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

---

**注意**: 本项目使用 LocalStorage 存储 TodoList 数据，数据仅保存在当前浏览器中，不同浏览器之间数据不共享。
