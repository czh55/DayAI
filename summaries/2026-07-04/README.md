# DayAI 每日资讯索引 — 2026-07-04

> 检索触发时间：2026-07-04T22:00:10Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.201** patch：修复 Sonnet 5 会话 harness reminder 不再使用 mid-conversation system role；延续 2.1.200 Manual 默认与 background agent 修复。 |
| **Cursor** | **7/4 仍无新 Changelog**（6/30 Team MCP 最新）；Automations cron 第 3 日连续触发。 |
| **Codex** | 稳定版 **0.142.5** 不变；预发布 **0.143.0-alpha.35**（7/3）仍为最新；社区传闻 GPT-5.6 Sol/Terra/Luna 定档 **7/7–9**。 |
| **国内综述** | DeepSeek V4 正式版 **7 月中旬**峰谷定价倒计时；Sonnet 5 **分词器暗涨**争议持续；其余厂商今日无新版本。 |
| **行业宏观** | Fable 5 周额度 **7/7 截止**与 GPT-5.6 传闻窗口重叠；Anthropic 7/2 CJS 越狱框架进入行业讨论期。 |
| **媒体透镜** | **共识**：Sonnet 5「单价不变、Token 变多」需开发者自测账单；**最大分歧**：官方尝鲜价「成本持平」vs 量子位/Artificial Analysis「实际更贵」。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | Qwen-AgentWorld（6/24）仍最新；今日无公开更新（检索 2026-07-04 22:00 UTC） |
| 百度文心/Comate | 千帆 Agent Infra 仍最新；今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版仍最新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 豆包专业版三级阶梯定价（68/200/500 元/月）仍最新；今日无新产品 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；量子位称性价比优于 Sonnet 5；今日无新版本 |
| 月之暗面 Kimi | Kimi K2.7 仍最新；今日无公开更新 |
| DeepSeek | V4 正式版 **7 月中旬**上线 + 峰谷定价（高峰 2×）；DSpark 推理加速已部署；今日无新产品 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Fable 5 恢复后误拦与降级体验成为主叙事，开发者应用 Token 计数工具评估 Sonnet 5 真实成本 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：Anthropic「尝鲜价维持总成本」vs 社区实测英文 Token +27%–42%、部分任务 Sonnet 5 花费超 Opus → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.201 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Sonnet 5 harness 修复 |
| Codex CLI | 0.142.5 | ✅ `--version` / `doctor` / `features list` 正常；alpha.35 可装但未作 `@latest` |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/30 Team MCP Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.201 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.5
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | GPT-5.6 传闻窗口、Fable 5 额度截止、CJS 框架、Claude Desktop Linux |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.201 Sonnet 5 修复、2.1.200 Manual/后台 Agent 余波 |
| [`cursor.md`](./cursor.md) | 6/30 Team MCP 余波、Automations cron 连续触发 |
| [`codex.md`](./codex.md) | 0.142.5 稳定版、alpha.35、GPT-5.6 代码泄露传闻 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)（6/30）、[CJS Framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework)（7/2）、[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（2.1.201）、Cursor [Changelog](https://cursor.com/changelog)（**6/30 后无更新**）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（**alpha.35 @ 7/3 02:33Z**）、[GPT-5.6 Sol Preview](https://openai.com/index/previewing-gpt-5-6-sol/)（6/26）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`，优先 7/2–7/4 内容
- 交叉验证：Claude Code npm @latest **2.1.201**（modified 7/3 23:49Z）；Codex npm stable 0.142.5 与 GitHub Latest 一致；alpha.35 GitHub 与 npm 版本号吻合
