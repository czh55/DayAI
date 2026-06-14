# DayAI

每日 AI 资讯总结：Claude Code、Cursor、Codex 与国内行业动态。

## 网页阅读

仓库已内置静态前端，可直接在浏览器中阅读每日总结。

### 本地预览

```bash
# 在项目根目录启动静态服务器
python3 -m http.server 8080
# 打开 http://localhost:8080
```

### 部署到 GitHub Pages

1. 推送代码到 GitHub 仓库 `czh55/dayai`
2. 进入仓库 **Settings → Pages**
3. **Source** 选择 **Deploy from a branch**
4. **Branch** 选择 `main`，目录选择 **/ (root)**
5. 保存后等待几分钟，访问：`https://czh55.github.io/dayai/`

> 根目录已包含 `.nojekyll`，确保 GitHub Pages 正确提供 `index.json` 与 Markdown 文件。

### 前端结构

```
index.html          # 入口页面
assets/
  css/style.css     # 样式
  js/app.js         # 路由 + Markdown 渲染
index.json          # 日期索引（自动生成）
summaries/          # 每日 Markdown 总结
svgs/               # 工具图标
```

### 数据格式

`index.json` 由自动化流程生成，包含日期列表、头条摘要、各章节文件路径与工具速览。前端通过 Hash 路由加载对应 Markdown：

- `#/` — 首页（历史归档）
- `#/2026-06-14` — 某日索引
- `#/2026-06-14/cursor` — 某日 Cursor 章节
