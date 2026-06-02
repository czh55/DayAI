# DayAI 每日资讯 — 2026-06-02

> 触发时间（UTC）：2026-06-02T23:51:21.639Z  
> 本地 CLI 测试目录：`/workspace/tools`  
> 分支：`cursor/claude-cursor-codex-02b2`

## 今日一句话

| 工具 | 版本（本地实测） | 结论 |
|------|------------------|------|
| Claude Code | 2.1.161 | Dynamic Workflows / ultracode 进入研究预览，与 Opus 4.8、Auto 模式同日平台更新形成「大规模编排 + 更强模型」组合 |
| Cursor | 3.6（changelog 5/29） | Auto-review 用分类子代理减少审批打断；3.5 起 Automations / Canvas / `/loop` 强化长任务与协作 |
| OpenAI Codex | 0.136.0 | CLI 加固会话归档与 app-server；同日企业向发布 Sites + 角色插件，把 Codex 从「写代码」推向「知识工作编排」 |

## 文件索引

| 文件 | 内容 |
|------|------|
| [industry.md](./industry.md) | 行业大事件（Anthropic IPO、OpenAI Codex 企业化、白宫 AI 行政令等） |
| [claude-code.md](./claude-code.md) | Claude Code 特性逐项说明 + 本地 CLI 实测 |
| [cursor.md](./cursor.md) | Cursor 桌面/云能力 + `permissions.json` 完整示例 |
| [codex.md](./codex.md) | Codex CLI 0.136.0 + Sites/Plugins 管理员/用户 SOP |

## 本地 CLI 实测摘要

```bash
cd /workspace/tools && npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version    # → 2.1.161
./node_modules/.bin/codex --version     # → codex-cli 0.136.0
./node_modules/.bin/codex doctor        # → 无 auth；PATH 与全局 npm 根不一致（见各文档）
./node_modules/.bin/codex features list # → plugins/sites 相关 flag 为 stable
./node_modules/.bin/claude agents --json # → []
```

## 交叉验证说明

- 每个工具特性至少引用 **1 份官方文档** + **1 份社区/新闻**；不一致处已在对应小节标注。
- 需登录/企业套餐/桌面 App 的能力已标注 **未实测原因**，并附官方完整 SOP。

## 阅读建议

1. 产品负责人：先读 `industry.md` 中「对普通开发者意味着什么」段落。  
2. 工程师：按工具打开对应 md，按「前置条件 → 步骤 → 命令示例 → 本地测试结果」执行。  
3. 平台管理员：重点看 `codex.md` 的 Sites/Plugins 管理员 SOP 与 `cursor.md` 的 `permissions.json`。
