# DayAI 每日资讯索引 — 2026-07-02

> 检索触发时间：2026-07-02T22:01:08Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.198** 无新 patch；Fable 5 恢复次日社区集中反馈 **安全分类器误拦致强制降级 Opus 4.8**；Sonnet 5 仍为默认模型。 |
| **Cursor** | **6/30 后无新 Changelog**；Team MCP + organization groups 仍是最新企业能力；本触发即为 Automations cron 实测。 |
| **Codex** | 稳定版维持 **0.142.5**；预发布线 **0.143.0-alpha.33**（7/2 01:58Z）与 **alpha.34**（7/2 21:42Z）同日连发。 |
| **国内综述** | 36氪/量子位 7/1–7/2 持续争论 **Sonnet 5 隐性 Token 成本** 与 **Fable 5 降智体验**；国内厂商今日均无新版本。 |
| **行业宏观** | Fable 5 恢复进入 **第 2 天**，安全护栏与可用性权衡成主叙事；jailbreak 严重度框架余波延续。 |
| **媒体透镜** | **共识**：Agent 编程进入「模型分层 + Harness 治理」常态；**最大分歧**：36氪称 Fable 5「解禁即翻车」，官方仍强调 99%+ bypass 阻断。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | Qwen-AgentWorld（6/24）仍最新；今日无公开更新（检索 2026-07-02 22:01 UTC） |
| 百度文心/Comate | 千帆 Agent Infra 仍最新；今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版仍最新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 豆包 2.1 Pro（6/23）+ Coding Plan 叙事延续；今日无新版本 |
| 智谱 GLM/CodeGeeX | GLM-5.2 开源编程叙事（6/27）仍最热；今日无新版本 |
| 月之暗面 Kimi | Kimi K2.7 仍最新；今日无公开更新 |
| DeepSeek | Harness 招聘叙事延续；今日无新产品发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Fable 5 恢复 + Sonnet 5 默认使 Anthropic 产品线完整，但 **安全分类器成本由开发者承担** → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：36氪 7/2 称 Fable 5「写一行代码就降智」，虎嗅称「第一批用户沉默」；官方 7/1 公告承认分类器会增加误拦 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.198 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Fable 5 / Sonnet 5 推理 |
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
| [`industry.md`](./industry.md) | Fable 5 恢复次日、分类器争议、Codex alpha 连发 |
| [`china-media.md`](./china-media.md) | 36氪、量子位、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.198 维护态、Fable 5 分类器、Sonnet 5 默认 |
| [`cursor.md`](./cursor.md) | 6/30 Team MCP 余波、Automations cron 触发 |
| [`codex.md`](./codex.md) | 0.142.5 稳定版、alpha.33/34 预发布线 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5)（7/1 全球恢复）、[Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)（6/30）、[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（2.1.198）、Cursor [Changelog](https://cursor.com/changelog)（**6/30 后无更新**）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（**alpha.33 @ 7/2 01:58Z、alpha.34 @ 7/2 21:42Z**）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`，优先 6/30–7/2 内容
- 交叉验证：Claude Code npm @latest 仍为 2.1.198（modified 7/2 但无新版本号）；Codex npm stable 0.142.5 与 GitHub Latest 一致；alpha.34 GitHub 发布时间与触发窗口吻合
