# 项目结构说明

## 📁 目录组织

```
todo-list/
├── .github/              # GitHub 配置
│   └── workflows/        # GitHub Actions 工作流
├── docs/                 # 项目文档
│   ├── README.md         # 详细文档
│   └── LICENSE           # 许可证
├── public/               # 静态资源（直接复制到 dist）
│   └── favicon.svg
├── scripts/              # 脚本文件
│   ├── test-supabase.js  # Supabase 测试脚本
│   └── supabase-fix-rls.sql  # Supabase RLS 修复脚本
├── src/                  # 源代码
│   ├── components/       # Vue 组件
│   │   └── ConfirmDialog.vue
│   ├── composables/      # 组合式函数（Composition API）
│   │   └── useTodos.ts
│   ├── types/            # TypeScript 类型定义
│   │   └── todo.ts
│   ├── utils/            # 工具函数
│   │   └── supabase.ts
│   ├── App.vue           # 根组件
│   └── main.ts           # 应用入口
├── .env.example          # 环境变量示例
├── .env.local            # 本地环境变量（不提交到 Git）
├── .gitignore            # Git 忽略配置
├── index.html            # HTML 入口
├── package.json          # 项目依赖和脚本
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── env.d.ts              # 环境变量类型声明
```

## 📂 目录说明

### `.github/`
GitHub 相关配置，包含 CI/CD 工作流文件。

### `docs/`
项目文档目录，包含详细的 README 和许可证文件。

### `public/`
存放静态资源文件，这些文件在构建时会直接复制到 `dist` 目录。
- favicon.ico
- 图片、字体等静态资源

### `scripts/`
存放各种脚本文件：
- 数据库迁移脚本
- 测试脚本
- 部署脚本
- 工具脚本

### `src/`
主要源代码目录：

#### `components/`
Vue 组件文件，可复用的 UI 组件。

#### `composables/`
Vue 3 组合式函数，封装可复用的逻辑。

#### `types/`
TypeScript 类型定义和接口。

#### `utils/`
工具函数和辅助方法。

## 🔧 配置文件

- **vite.config.ts** - Vite 构建工具配置
- **tsconfig.json** - TypeScript 编译配置
- **env.d.ts** - 环境变量类型声明
- **package.json** - 项目元数据和依赖管理

## 🌍 环境配置

- **.env.example** - 环境变量模板（提交到 Git）
- **.env.local** - 本地环境变量（不提交到 Git）

## 🚫 忽略的文件

以下文件和目录不会被提交到 Git：
- `node_modules/` - 依赖包
- `dist/` - 构建输出
- `.env.local` - 本地环境变量
- `.idea/` - IDE 配置
