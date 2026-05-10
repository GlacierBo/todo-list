# 📝 Todo List Application

一个基于 Vue 3 + Vite + TypeScript + Supabase 的现代化待办事项管理应用。

![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?logo=vuedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)

##  功能特性

### 核心功能
- ✅ **任务管理** - 创建、查看、删除任务
- 🎯 **优先级设置** - 支持低/中/高三种优先级，可视化标签显示
- ✔️ **完成状态** - 点击复选框标记任务完成/未完成
-  **实时同步** - 基于 Supabase 实时订阅，数据即时更新
- 🎨 **现代 UI** - 简洁美观的界面设计，响应式布局
- 💬 **自定义对话框** - 优雅的确认对话框，替代原生 alert/confirm

### 技术特点
- 🚀 使用 Vue 3 Composition API 和 TypeScript
- ⚡ Vite 快速开发和构建
- 🗄️ Supabase PostgreSQL 数据库
- 📦 模块化代码结构
- 🌐 GitHub Actions 自动部署

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue 3 | ^3.4.0 | 前端框架（Composition API） |
| TypeScript | ~5.3.0 | 类型安全的 JavaScript |
| Vite | ^5.0.0 | 下一代前端构建工具 |
| Supabase | ^2.39.0 | 开源 Firebase 替代品 |
| Pinia | ^2.1.7 | Vue 状态管理 |
| Vue Router | ^4.2.5 | Vue 官方路由 |

## 🚀 快速开始

### 前置要求

- Node.js 20+ 
- npm 或 yarn 或 pnpm
- Supabase 账号

### 1. 克隆项目

```bash
git clone https://github.com/your-username/todo-list.git
cd todo-list
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Supabase

#### 3.1 创建 Supabase 项目

1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 点击 "New Project"
3. 填写项目信息并创建

#### 3.2 创建数据库表

在 Supabase SQL Editor 中执行以下 SQL：

```sql
-- 创建任务表
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority SMALLINT DEFAULT 1, -- 1:低 2:中 3:高
  due_date TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全策略
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有操作（仅用于开发，生产环境建议启用用户认证）
DROP POLICY IF EXISTS "Enable all access for all users" ON todos;
CREATE POLICY "Enable all access for all users" ON todos
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

#### 3.3 配置环境变量

复制环境变量示例文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Supabase 配置：

```env
# Supabase 配置
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# 应用配置
VITE_APP_NAME=Todo List
```

> **获取 Supabase 配置**：
> 1. 进入 Supabase Dashboard
> 2. 选择你的项目
> 3. 点击 Settings → API
> 4. 复制 Project URL 和 anon/public 密钥

### 4. 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 5. 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 6. 预览生产构建

```bash
npm run preview
```

## 🗂️ 项目结构

```
todo-list/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署配置
├── public/
│   └── favicon.svg             # 网站图标
├── src/
│   ├── components/             # 可复用组件
│   │   └── ConfirmDialog.vue   # 自定义确认对话框
│   ├── composables/            # Vue 组合式函数
│   │   └── useTodos.ts         # 任务管理逻辑
│   ├── types/                  # TypeScript 类型定义
│   │   └── todo.ts             # 任务和标签类型
│   ├── utils/                  # 工具函数
│   │   └── supabase.ts         # Supabase 客户端配置
│   ├── App.vue                 # 根组件
│   └── main.ts                 # 应用入口
── .env.example                # 环境变量示例
├── .env.local                  # 本地环境变量（不提交到 Git）
├── .gitignore                  # Git 忽略文件
├── env.d.ts                    # TypeScript 环境声明
├── index.html                  # HTML 入口
├── package.json                # 项目配置和依赖
── tsconfig.json               # TypeScript 配置
── vite.config.ts              # Vite 配置
└── README.md                   # 项目说明文档
```

## 🌐 部署到 GitHub Pages

### 1. 配置 GitHub Secrets

1. 进入 GitHub 仓库
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加以下 Secrets：

| Secret 名称 | 值 |
|------------|------|
| `SUPABASE_URL` | 你的 Supabase Project URL |
| `SUPABASE_ANON_KEY` | 你的 Supabase Anon Key |

### 2. 配置 Vite

如果你的仓库名不是用户名（例如 `https://username.github.io/todo-list/`），需要修改 `vite.config.ts`：

```typescript
export default defineConfig({
  base: '/todo-list/', // 改为你的仓库名
  // ...其他配置
})
```

### 3. 推送代码触发部署

```bash
git add .
git commit -m "feat: 初始化项目"
git push origin main
```

GitHub Actions 会自动：
- 安装依赖
- 构建项目
- 部署到 GitHub Pages

### 4. 启用 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. 在 **Source** 选择 "GitHub Actions"
3. 等待部署完成
4. 访问生成的链接

## 🎨 功能说明

### 任务优先级

- 🟢 **低优先级** - 灰色标签，默认选项
- 🟡 **中优先级** - 黄色标签
- 🔴 **高优先级** - 红色标签

创建任务时，在输入框右侧的下拉框中选择优先级。

### 任务状态

- ☐ 未完成 - 普通样式
- ☑ 已完成 - 删除线 + 灰色

点击复选框切换任务状态。

### 删除确认

点击删除按钮时，会弹出优雅的确认对话框：
- 点击 "确认" 执行删除
- 点击 "取消" 或遮罩层关闭对话框

## 📖 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热重载） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 运行 ESLint 并自动修复 |

## 🔧 常见问题

### 环境变量未生效？

1. 确保使用 `.env.local` 文件（不会被 git 跟踪）
2. 变量名必须以 `VITE_` 开头
3. 修改后需要重启开发服务器

### 数据库连接失败？

1. 检查 Supabase URL 和 Key 是否正确
2. 确认数据库表已创建
3. 验证 RLS 策略配置正确
4. 查看浏览器控制台错误信息

### 部署后页面空白？

1. 打开浏览器开发者工具查看错误
2. 确认 `vite.config.ts` 中的 `base` 路径正确
3. 验证 GitHub Secrets 已正确配置
4. 检查 GitHub Actions 构建日志

### 如何连接本地数据库管理工具？

使用 Navicat、DBeaver 等工具连接 Supabase：

- **主机**: `db.your-project.supabase.co`
- **端口**: `5432` (Direct) 或 `6543` (Pooler)
- **数据库**: `postgres`
- **用户名**: `postgres`
- **密码**: 在 Supabase Settings → Database 中设置

> **注意**: 需要启用 SSL 连接

### Navicat 连接报错 "column datlastsysoid does not exist"？

这是 Navicat 版本过旧导致的。解决方案：
- 升级 Navicat 到最新版本（16+）
- 或使用 DBeaver、pgAdmin 等替代工具
- 或直接使用 Supabase Dashboard 的 Table Editor

##  贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

MIT License

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端工具
- [Supabase](https://supabase.com/) - 开源 Firebase 替代品
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

---

Made with ❤️ using Vue 3 + Supabase
