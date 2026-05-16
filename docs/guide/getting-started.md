# 快速开始

## 环境要求

- Node.js >= 18
- npm >= 9

## 安装

克隆项目后，安装依赖：

```bash
npm install
```

## 开发模式

启动开发服务器：

```bash
npm run docs:dev
```

访问 `http://localhost:8080` 查看文档。

## 构建

构建生产版本：

```bash
npm run docs:build
```

构建后的文件位于 `docs/.vuepress/dist` 目录。

## 预览

预览生产构建：

```bash
npm run docs:serve
```

## GitHub Pages 部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages。

推送代码到 main 分支后，会自动触发部署流程。

你也可以手动部署：

```bash
npm run docs:build
```

然后将 `docs/.vuepress/dist` 目录的内容部署到你的服务器。
