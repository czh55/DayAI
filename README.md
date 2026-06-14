# DayAI

每日 AI 资讯总结：Claude Code、Cursor、Codex 与国内行业动态。

## 每日发布流程

生成当日总结后，按以下三步发布到网页：

```bash
# 1. 确保 Markdown 已写入 summaries/YYYY-MM-DD/（7 个固定文件名，见下方）
# 2. 自动生成 index.json
node tools/build-index.js

# 3. 提交并推送
git add summaries/ index.json
git commit -m "docs: add daily summary YYYY-MM-DD"
git push
```

也可在 `tools/` 目录运行：`npm run build-index`

### 固定文件结构

```
summaries/YYYY-MM-DD/
├── README.md          # 必须含「今日一句话结论」表格
├── industry.md
├── china-media.md
├── china-ai.md
├── claude-code.md
├── cursor.md
└── codex.md
```

`README.md` 中的「今日一句话结论」表格会被脚本自动解析，用于生成网页头条、工具速览和国内/媒体摘要。**无需手写 `index.json`**。

### Agent Prompt 片段

将以下内容加入每日总结的 Agent prompt：

```markdown
## 发布到 DayAI 网页

1. 在 `summaries/YYYY-MM-DD/` 下创建 7 个 Markdown 文件（文件名必须严格一致）：
   README.md、industry.md、china-media.md、china-ai.md、claude-code.md、cursor.md、codex.md

2. `README.md` 必须包含 `## 今日一句话结论` 表格，列：板块 | 结论
   板块名需包含：Claude Code、Cursor、Codex、国内综述、行业宏观、媒体透镜

3. 生成完成后运行：`node tools/build-index.js`

4. 提交并 push：`git add summaries/ index.json && git commit && git push`
```

## 网页阅读

仓库已内置静态前端，可直接在浏览器中阅读每日总结。

### 本地预览

```bash
# 在项目根目录启动静态服务器
python3 -m http.server 8080
# 打开 http://localhost:8080
```

### 部署到 GitHub Pages

1. 将仓库设为 **Public**（免费账户的私有仓库无法使用 Pages）
2. 进入仓库 **Settings → Pages**
3. **Source** 选择 **Deploy from a branch**
4. **Branch** 选择 `main`，目录选择 **/ (root)**
5. 保存后访问：`https://czh55.github.io/DayAI/`

> 根目录已包含 `.nojekyll`，确保 GitHub Pages 正确提供 `index.json` 与 Markdown 文件。

### 前端结构

```
index.html              # 入口页面
assets/css/style.css    # 样式
assets/js/app.js        # 路由 + Markdown 渲染
tools/build-index.js    # 索引自动生成脚本
index.json              # 日期索引（由脚本生成）
summaries/              # 每日 Markdown 总结
svgs/                   # 工具图标
```

### 路由

- `#/` — 首页（历史归档）
- `#/2026-06-14` — 某日索引
- `#/2026-06-14/cursor` — 某日 Cursor 章节
