# DayAI 每日资讯索引 — 2026-06-24

> 检索触发时间：2026-06-24T22:02:07Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.191**（npm @latest；Changelog **2.1.190 @ 6/24** 维护 patch）：同日 Anthropic 发布 **Claude Tag**——Slack 内 @Claude 派活、共享记忆与 Ambient 主动介入，官方称内部 65% 产品代码由其参与完成。 |
| **Cursor** | **3.9（6/22）** 无 6/24 新 Changelog；Customize 页 + Marketplace leaderboard 仍是本周主线，与 Claude Tag 形成「桌面 Agent vs 协作频道 Agent」对照。 |
| **Codex** | 稳定版 **0.142.0** 未变；**0.143.0-alpha.15**（6/24 19:41Z）等 alpha 线当日密集预发布 3 版；`doctor` 12 ok · 1 warn · 4 fail（auth 未登录）。 |
| **国内综述** | 媒体集中解读 **Claude Tag** 与卡帕西「LLM UI 第三次变革」；字节 **Seed 2.1**（6/23 前后）Agent 长程编程热度延续；各主流厂商今日无重大版本发布。 |
| **行业宏观** | **Claude Tag** 将 Agent 嵌入 Slack 工作流 vs **微软 E+D 部门 6/30 Copilot CLI 强制迁移**（剩 6 天）并列今日企业选型两极；Fable 5 付费期已切换次日余波持续。 |
| **媒体透镜** | **共识**：2026 年 AI 编程竞争从单点代码生成转向「嵌入式队友 + Harness 长程任务」；**最大分歧**：量子位/36氪强调 Claude Tag 安全叙事与 65% 内部代码占比，虎嗅/InfoQ 更关注微软工具链收敛与多模型路由成本。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-24 22:02 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版（6/5）仍最新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | Seed 2.1 Pro/Turbo（6/23 前后发布）热度延续；今日无新版本 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/17 MIT 开源）仍最新；今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | Harness 团队招聘持续；官方 DeepSeek Code 仍未发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Agent 从 IDE 走向协作频道（Slack/Teams），「@一下派活 + 异步执行」成为 2026 下半年企业叙事 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：36氪将 Claude Tag 定位为「嵌入式队友」颠覆办公入口；量子位同时追踪字节 Seed 2.1 18 小时芯片 RTL 长程 Agent → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.191 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.142.0 | ✅ `--version` / `doctor` / `features list` 正常；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/22 Changelog 3.9 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.191 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Claude Tag 发布、微软 6/30 迁移倒计时、Codex alpha 预发布线 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | Claude Tag、2.1.187–191、sandbox.credentials、MCP CLI 认证 |
| [`cursor.md`](./cursor.md) | 3.9 Customize 页、Marketplace leaderboard、与 Claude Tag 对照 |
| [`codex.md`](./codex.md) | 0.142.0 稳定版、0.143.0-alpha 线、`doctor` / `features list` |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、Seed 2.1、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Claude Tag 发布](https://www.anthropic.com/news/introducing-claude-tag)（6/23）、[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（2.1.190 @ 6/24）、Cursor [Changelog](https://cursor.com/changelog)（3.9 @ 6/22，无 6/24 更新）、OpenAI [Codex Changelog](https://developers.openai.com/codex/changelog)、GitHub Releases（0.143.0-alpha.15 @ 2026-06-24T19:41Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 22–24 日内容
- 交叉验证：Claude Tag 功能 Anthropic 官方 + TechCrunch/Reuters + 量子位 secondary；微软 6/30 迁移 The Verge + 36氪 secondary；Cursor 3.9 Customize 页官方 Changelog + Docs 一致
