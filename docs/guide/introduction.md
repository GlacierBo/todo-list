# 介绍

TodoList 是一个基于 Vue 3 和 TypeScript 构建的现代化待办事项管理应用。

## 项目概述

这个项目旨在提供一个简洁、高效的任务管理工具，帮助用户更好地组织和跟踪日常任务。

## 技术栈

- **前端框架**: Vue 3 + Composition API
- **语言**: TypeScript
- **构建工具**: Vite
- **文档工具**: VuePress 2
- **数据存储**: LocalStorage（浏览器本地存储）

## 核心功能

1. **任务管理**
   - 创建新任务
   - 标记任务完成/未完成
   - 删除任务

2. **优先级系统**
   - 🟢 低优先级
   - 🟡 中优先级
   - 🔴 高优先级

3. **数据持久化**
   - 使用 LocalStorage 保存数据
   - 刷新页面数据不丢失

## 项目结构

```
todo-list/
├── docs/              # VuePress 文档
│   ├── .vuepress/     # VuePress 配置
│   ├── guide/         # 指南文档
│   └── demo/          # 演示页面
├── src/               # 源代码
│   ├── components/    # Vue 组件
│   ├── composables/   # 组合式函数
│   ├── types/         # TypeScript 类型定义
│   └── utils/         # 工具函数
└── public/            # 静态资源
```
