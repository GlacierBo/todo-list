# VuePress 迁移说明

## 项目改造完成 ✅

已将 TodoList 从独立的 Vite 应用改造为 VuePress 文档站点，TodoList 作为其中的一个演示模块。

## 主要变更

### 1. 安装 VuePress
- 添加 `vuepress@next`、`@vuepress/bundler-vite`、`@vuepress/theme-default`
- 添加 `sass-embedded` 依赖

### 2. 目录结构调整
```
todo-list/
├── docs/                    # VuePress 文档目录
│   ├── .vuepress/          # VuePress 配置
│   │   ├── config.ts       # 配置文件
│   │   └── client.ts       # 客户端配置（注册全局组件）
│   ├── guide/              # 指南文档
│   │   ├── introduction.md
│   │   ├── getting-started.md
│   │   └── features.md
│   ├── demo/               # 演示页面
│   │   └── README.md
│   └── README.md           # 首页
├── src/                     # 源代码（保持不变）
│   ├── components/         # Vue 组件
│   ├── composables/        # 组合式函数
│   └── types/              # 类型定义
└── public/                  # 静态资源
```

### 3. 新增文件
- `docs/.vuepress/config.ts` - VuePress 主配置
- `docs/.vuepress/client.ts` - 注册 TodoList 为全局组件
- `src/components/TodoList.vue` - 可复用的 TodoList 组件
- 文档页面（首页、指南、演示）

### 4. 删除文件
- `index.html` - VuePress 自动生成
- `vite.config.ts` - 使用 VuePress 内置的 Vite 配置
- `src/utils/supabase.ts` - 已改用 LocalStorage

### 5. 脚本命令更新
```bash
# 开发模式
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览生产构建
npm run docs:serve
```

### 6. GitHub Actions 更新
- 构建命令改为 `npm run docs:build`
- 输出目录改为 `docs/.vuepress/dist`

## 数据存储方案

已从 Supabase 改为 **LocalStorage**：
- ✅ 完全本地化，无需后端
- ✅ 无需配置环境变量
- ✅ 数据保存在浏览器中
- ⚠️ 不同浏览器数据不共享
- ⚠️ 清除浏览器数据会丢失

## 访问地址

开发环境：`http://localhost:8082/todo-list/`

包含以下页面：
- 📄 首页 - 项目介绍和快速入口
- 📖 指南 - 详细介绍项目功能和使用方法
- 🎮 演示 - 可交互的 TodoList 应用

## 下一步

你可以：
1. 访问开发服务器查看效果
2. 添加更多文档页面
3. 自定义主题样式
4. 推送代码到 GitHub，自动部署到 GitHub Pages
