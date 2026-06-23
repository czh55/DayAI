# DayAI 每日资讯索引 — 2026-06-23

> 检索触发时间：2026-06-23T22:03:24Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.187**（较 6/20 的 2.1.185 +2 patch）：**6/22** 发布 **2.1.186** 含 CLI 级 `claude mcp login/logout`、`!` bash 自动响应；**Fable 5 免费窗口今日（6/23 UTC）正式结束**，订阅用户需 usage credits。 |
| **Cursor** | **3.8（6/22）** 第二波更新：统一 **Customize** 页管理 plugins/skills/MCP、**Marketplace leaderboard**、**Plugin canvases**（Hex/Atlassian）、Team Marketplaces 支持 **GitLab/BitBucket/Azure DevOps**。 |
| **Codex** | 稳定版升至 **0.142.0**（6/22 发布）；`/usage` credits 兑换、`/plugins` 分区推荐、rollout token 预算、indexed web-search；**0.143.0-alpha** 线 6/23 密集预发布。 |
| **国内综述** | 媒体聚焦 **Fable 5 窗口切换日**与 **微软 6/30 Claude Code 迁移倒计时**；智谱 **GLM-5.2**、DeepSeek Harness 招聘热度延续，今日各厂商无重大版本发布。 |
| **行业宏观** | **Fable 5 订阅免费期结束**与 **微软 E+D 部门 Copilot CLI 强制迁移（剩 7 天）**并列今日两大企业选型节点；Cursor/Codex 插件生态加速分化。 |
| **媒体透镜** | **共识**：2026 年 AI 编程竞争从模型跑分转向 Harness + Loop Engineering 系统能力；**最大分歧**：量子位/36氪强调 Fable 5 真场景成本与出口管制余波，InfoQ 更关注 Loop/Harness 范式与多模型路由策略。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-23 22:03 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版（6/5）持续引用；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/17 MIT 开源）热度延续；今日无新版本 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | Harness 团队招聘持续，官方 DeepSeek Code 仍未发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Loop Engineering 与 Harness 三件套（Context / Subagents / 权限）取代 Prompt 工程成为 2026 主流叙事 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：36氪将 Fable 5 定位为「四日惊魂」出口管制与数据留存博弈；InfoQ 聚焦 Boris Cherny `/loops` 与 OpenAI Harness 工程方法论 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.187 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.142.0 | ✅ `--version` / `doctor` / `features list` 正常（12 ok · 1 warn · 4 fail，auth 未登录）；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/22 Changelog 3.8 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.187 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 窗口结束、微软 6/30 迁移倒计时、Cursor/Codex 插件生态 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、InfoQ、虎嗅 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.186–187、Fable 5 付费切换、MCP CLI 认证、bash 自动响应 |
| [`cursor.md`](./cursor.md) | Customize 页、Marketplace leaderboard、Plugin canvases、Team Marketplaces |
| [`codex.md`](./codex.md) | 0.142.0 稳定版、`/usage` credits、`/plugins`、rollout token 预算 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek Harness、GLM-5.2、API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Changelog](https://code.claude.com/docs/en/changelog.md)（2.1.186 @ 6/22）、[Fable 5 发布说明](https://www.anthropic.com/news/claude-fable-5-mythos-5)、Cursor [Changelog](https://cursor.com/changelog)（3.8 @ 6/22）、OpenAI [Codex Changelog](https://developers.openai.com/codex/changelog)、GitHub Releases（0.142.0 @ 2026-06-22T22:19Z、0.143.0-alpha.9 @ 2026-06-23T18:56Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 21–23 日内容
- 交叉验证：Fable 5 6/23 截止日 Anthropic 官方 + 量子位 secondary；微软 Claude Code 迁移 The Verge/InfoQ + 36氪 secondary；Cursor 3.8 Customize 页官方 Changelog + Docs 交叉一致
