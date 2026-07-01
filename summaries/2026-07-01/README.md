# DayAI 每日资讯索引 — 2026-07-01

> 检索触发时间：2026-07-01T22:01:07Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.198** 今日 patch（npm @ 16:50Z）；**Fable 5 全球恢复**（7/1 官方确认）；Sonnet 5 仍为默认模型。 |
| **Cursor** | **6/30 新 Changelog**：Team MCP 进团队市场 + **组织组（organization groups）** 访问控制；6/29 iOS 公测余波延续。 |
| **Codex** | 稳定版升至 **0.142.5**（7/1 01:15Z，WebSocket trace 日志修复）；alpha **0.143.0-alpha.32** 同步发布。 |
| **国内综述** | 36氪/量子位聚焦 **Sonnet 5 性价比与 Token 隐性成本**；字节 **豆包 2.1 Pro**（6/23）Coding Plan 兼容 Claude Code/Cursor 叙事延续。 |
| **行业宏观** | **Fable 5/Mythos 5 全球重新上线** + 与 Amazon/Microsoft/Google 共推 **jailbreak 严重度框架**；Sonnet 5 促销窗口开启。 |
| **媒体透镜** | **共识**：Sonnet 5 拉低多 Agent 并行成本门槛；**最大分歧**：量子位质疑新分词器致实际账单高于 Opus，36氪更强调「打工版 Claude 5」普惠叙事。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | Qwen-AgentWorld（6/24）仍最新；今日无公开更新（检索 2026-07-01 22:01 UTC） |
| 百度文心/Comate | 千帆 Agent Infra 仍最新；今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版仍最新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 豆包 2.1 Pro（6/23）+ Coding Plan 兼容主流 Agent 工具链；今日无新版本 |
| 智谱 GLM/CodeGeeX | GLM-5.2 开源编程叙事（6/27）仍最热；今日无新版本 |
| 月之暗面 Kimi | Kimi K2.7 仍最新；今日无公开更新 |
| DeepSeek | Harness 招聘叙事延续；今日无新产品发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Sonnet 5 + Fable 5 回归使 Anthropic 形成「旗舰 + 中端 + 安全分层」完整产品线，多 Agent 并行成本门槛被进一步压低 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：量子位强调 Sonnet 5 新分词器可能导致实际 Token 消耗高于 Opus 4.8；36氪/新智元更聚焦 SWE-bench 63.2% 与「人人都能用的打工版 Claude」→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.198 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Sonnet 5 / Fable 5 推理 |
| Codex CLI | 0.142.5 | ✅ `--version` / `doctor` / `features list` 正常；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/30 Team MCP Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.198 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.5
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 全球恢复、jailbreak 框架、Sonnet 5 余波 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.198、Fable 5 恢复、Sonnet 5 默认模型 |
| [`cursor.md`](./cursor.md) | Team MCP 市场、组织组访问控制 |
| [`codex.md`](./codex.md) | 0.142.5 稳定版、alpha.32 预发布 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、豆包 2.1 Pro、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5)（**7/1 全球恢复**）、[Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)（6/30）、[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、Cursor [Changelog](https://cursor.com/changelog)（**6/30 Team MCP**）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（**0.142.5 @ 7/1 01:15Z**）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`，优先 6/29–7/1 内容
- 交叉验证：Claude Code npm @latest 2.1.198 与昨日 2.1.197 +1 patch；Fable 5 恢复官方博客 + Changelog update 一致；Codex 0.142.5 GitHub release 与 npm @latest 一致
