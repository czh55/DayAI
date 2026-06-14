# DayAI 每日资讯索引 — 2026-06-14

> 检索触发时间：2026-06-14T08:43:43Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | Fable 5 上线三天即遭美国政府出口管制令全球停用；Claude Code 2.1.177 已支持 `ultracode` 动态工作流与 `--safe-mode` 排障模式。 |
| **Cursor** | Bugbot 6 月 10 日更新：Composer 2.5 驱动下审查提速至约 90 秒，本地 `/review` 可与 GitHub/GitLab PR 去重。 |
| **Codex** | CLI 稳定版 0.139.0（6 月 9 日）+ App 26.609（6 月 11 日）带来 Code mode 独立 Web Search 与 Browser Developer mode（CDP）。 |
| **国内综述** | 今日国内头部厂商无重大新产品发布；开发者最需关注 Anthropic Fable 5 全球停服对跨境 API 与编程 Agent 选型的冲击。 |
| **行业宏观** | 美国商务部首次对**特定商业 AI 模型**实施出口管制，Fable 5/Mythos 5 全球下线，标志 AI 模型进入「国界化」时代。 |
| **媒体透镜** | **共识**：编程 Agent 正从提示词工程转向 Loop/Goal 长程编排；**最大分歧**：36氪强调 Loop 工程范式转移，量子位聚焦御三家模型竞速与 Fable 5 停服冲击。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-14 08:50 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | 今日无公开更新（V4 预览版仍为 4 月 24 日发布版本） |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：多家媒体（36氪、量子位）认为 AI 编程已进入「Loop 工程 / Agentic Engineering」阶段，长程自主循环比单次提示词更重要。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：商业媒体强调组织与范式变革（Loop 工程、监工角色），垂直 AI 媒体更关注模型能力军备竞赛与出口管制冲击。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.177 | ✅ `--version` / `--help` 正常；221 行帮助输出 |
| Codex CLI | 0.139.0 | ✅ `--version` / `doctor` / `features list` 正常；⚠️ 无 API Key 无法实测推理 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；文档 SOP 已写入 `china-ai.md` |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.177
./node_modules/.bin/codex --version    # codex-cli 0.139.0
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 国际+国内宏观：Fable 5 出口管制、IPO 竞速、对开发者影响 |
| [`china-media.md`](./china-media.md) | 量子位、36氪等 8+ 源媒体行业判断与交叉验证 |
| [`claude-code.md`](./claude-code.md) | Fable 5、ultracode、--safe-mode、fallbackModel |
| [`cursor.md`](./cursor.md) | Bugbot 提速、/review、SDK custom tools、Canvas |
| [`codex.md`](./codex.md) | 0.139.0 CLI、26.609 App、Browser Developer mode |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek API 调用 SOP、实测记录 |

## 检索记录脚注

- 国际官方：Anthropic News、Cursor Changelog、OpenAI Codex Changelog/GitHub Releases
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:jiqizhixin.com` 等，优先 6 月 12–14 日内容
- 交叉验证：Fortune、Bloomberg、MarkTechPost 对 Fable 5 停服事件的英文报道
