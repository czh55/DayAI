# DayAI 每日资讯索引 — 2026-07-05

> 检索触发时间：2026-07-05T22:02:10Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.201** 维持不变（7/3 发布）；Sonnet 5 harness 修复与 Manual 默认权限仍为本周主线，**7/5 无新 patch**。 |
| **Cursor** | **7/5 仍无新 Changelog**（6/30 Team MCP 最新）；Automations cron 第 4 日连续触发。 |
| **Codex** | 预发布线更新至 **0.143.0-alpha.36**（7/5 01:02Z）；稳定版 **0.142.5** 不变；GPT-5.6 传闻窗口 **7/7–9** 倒计时 2 天。 |
| **国内综述** | DeepSeek V4 正式版 **7 月中旬**峰谷定价倒计时；其余 14 家国内厂商今日无公开更新。 |
| **行业宏观** | Fable 5 周额度 **7/7 截止**与 GPT-5.6 传闻窗口重叠；Anthropic 7/2 CJS 越狱框架进入落地讨论期。 |
| **媒体透镜** | **共识**：Sonnet 5「标价不变、Token 变多」需开发者自测账单；**最大分歧**：Anthropic「尝鲜价成本持平」vs 量子位/Artificial Analysis「部分任务比 Opus 更贵」。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | Qwen-AgentWorld（6/24）仍最新；今日无公开更新（检索 2026-07-05 22:02 UTC） |
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
| Claude Code | 2.1.201 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.142.5 | ✅ `@latest` 指向稳定版；`doctor` / `features list` 正常 |
| Codex CLI (alpha) | 0.143.0-alpha.36 | ✅ 可安装运行；`features list` 含 `code_mode_host`（under development） |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/30 Team MCP Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.201 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.143.0-alpha.36（本地安装 alpha）
npm install @openai/codex@latest       # 回退至 0.142.5 stable
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | GPT-5.6 传闻窗口、Fable 5 额度截止、CJS 框架、DeepSeek 峰谷定价 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.201 维护态、Sonnet 5/Manual/background agent 余波 |
| [`cursor.md`](./cursor.md) | 6/30 Team MCP 余波、Automations cron 连续触发 |
| [`codex.md`](./codex.md) | alpha.36 新发布、0.142.5 稳定版、GPT-5.6 预览 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)（6/30）、[CJS Framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework)（7/2）、[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（**2.1.201 @ 7/3，7/5 无更新**）、Cursor [Changelog](https://cursor.com/changelog)（**6/30 后无更新**）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（**alpha.36 @ 7/5 01:02Z**）、[GPT-5.6 Sol Preview](https://openai.com/index/previewing-gpt-5-6-sol/)（6/26）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`，优先 7/3–7/5 内容
- 交叉验证：Claude Code npm @latest **2.1.201**（modified 7/3 23:49Z）；Codex stable npm 0.142.5 与 GitHub Latest 一致；alpha.36 GitHub 与 npm 版本号吻合
