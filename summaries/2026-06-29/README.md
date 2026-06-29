# DayAI 每日资讯索引 — 2026-06-29

> 检索触发时间：2026-06-29T22:00:55Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.195**（npm @latest 无变化）：Changelog 维护线延续；微软 E+D 迁移 Copilot CLI **剩最后 1 天**（6/30 截止）。 |
| **Cursor** | **6/29 新 Changelog**：**Cursor for iOS 公测**上线，付费用户可移动端启动 Cloud Agent、Remote Control、Live Activities 与 PR 合并。 |
| **Codex** | 稳定版 **0.142.4**（**今日 05:04Z 新发布**，maintenance-only）；alpha.29 仍最新预发布。 |
| **国内综述** | 量子位报道 GLM-5.2 开源编程全球第二、ALE「智能体终极考试」基准引发讨论；GPT-5.6 预览（6/27）余波持续。 |
| **行业宏观** | 微软内部 Claude Code 许可证明日到期；OpenAI GPT-5.6 Sol 编程基准超 Fable 5；Cursor 移动端补齐「随时指挥 Agent」闭环。 |
| **媒体透镜** | **共识**：AI 编程从 Prompt → Loop → Harness 演进，开发者角色转向系统设计；**最大分歧**：虎嗅强调 Loop Token 成本 2–4 倍于人工，量子位/36氪更聚焦模型能力竞赛与 ALE 新基准。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | Qwen-AgentWorld（6/24）仍最新；今日无公开更新（检索 2026-06-29 22:00 UTC） |
| 百度文心/Comate | 千帆 Agent Infra + 伐谋仍最新；今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版（6 月大会）仍最新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | Seed 2.1 / 豆包专业版（6/23–24）仍最新；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/17 MIT 开源）被量子位引用为「开源编程全球第一」；今日无新版本 |
| 月之暗面 Kimi | Kimi Work Beta（6/3）仍最新；今日无公开更新 |
| DeepSeek | Harness 对标 Claude Code 叙事延续；今日无新产品发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | Agentic Infra 叙事延续；今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Loop Engineering 与 Harness 工程成为 6 月媒体主轴，开发者从「写提示词」转向「设计循环系统 + 验收护栏」 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：量子位/36氪聚焦 ALE 基准、GLM-5.2 编程排名与 GPT-5.6 能力竞赛；虎嗅/InfoQ 更强调 Loop Token 成本与 Harness 厚度之争 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.195 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.142.4 | ✅ `--version` / `doctor` / `features list` 正常；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/29 Changelog iOS 公测为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.195 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.4
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 微软 6/30 迁移最后 24h、GPT-5.6 预览、Cursor iOS 公测、ALE 基准 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.195 维护线、`/loops`、OTel、微软迁移影响 |
| [`cursor.md`](./cursor.md) | 6/29 iOS 公测、Cloud Agent 移动端、Remote Control |
| [`codex.md`](./codex.md) | 0.142.4 稳定版新发布、alpha.29 预发布、Remote GA |
| [`china-ai.md`](./china-ai.md) | GLM-5.2 编程叙事、国内厂商轮询、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（维护线，npm 2.1.195 无变）、[Anthropic News](https://www.anthropic.com/news)（无 6/29 新稿）、Cursor [Changelog](https://cursor.com/changelog)（**6/29 iOS 公测新条目**）、OpenAI [Codex GitHub Releases](https://github.com/openai/codex/releases)（**0.142.4 @ 2026-06-29T05:04Z**）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 27–29 日内容
- 交叉验证：Claude Code npm @latest 与昨日一致；Codex 0.142.4 官方标注 maintenance-only；Cursor iOS 公测 Changelog + Docs 一致；微软迁移 Winbuzzer + The Verge 一致
