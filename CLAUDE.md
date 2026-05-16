# todo-list

个人文档站点，基于 VuePress 2 构建。

## 技术栈

- VuePress 2 + Vite
- TypeScript + Vue 3
- @vuepress/theme-default
- sass-embedded

## 快速开始

```bash
npm install
npm run docs:dev    # 开发服务器 http://localhost:8080
npm run docs:build  # 构建生产版本
```

## 图片管理

所有图片统一使用 CDN：`https://img.fpdan.asia/PicGo/`
Markdown 中引用直接使用 CDN 完整 URL，107 张图全部在线。

### 下载脚本
`scripts/download-images.py` — 下载外部图片到 `docs/external/`，支持自动转 WebP 和重命名：
```bash
python scripts/download-images.py --webp --rename <URL>         # 下载+转WebP+重命名
python scripts/download-images.py --webp --rename --all         # 从 Markdown 全量处理
python scripts/download-images.py -f urls.txt                   # 从文件批量下载
```
下载到 `docs/external/`，上传 CDN 后手动清理本地文件。
