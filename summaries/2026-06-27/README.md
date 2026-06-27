# DayAI 每日资讯索引 — 2026-06-27

> 检索触发时间：2026-06-27T22:01:50Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.195**（npm @latest 无变化）：Changelog 维护线延续；Anthropic 6/27 无新产品发布；微软 E+D 迁移 Copilot CLI **剩 3 天**（6/30）。 |
| **Cursor** | **3.9（6/22）** 无 6/27 新 Changelog；Customize 页 + Automations cron（本任务即实例）仍是本周主线；Cloud Agent computer use 为 3.8 延续能力。 |
| **Codex** | 稳定版 **0.142.3** 无变化；**0.143.0-alpha.27/28** 今日预发布（18:35Z / 20:15Z）；Remote GA（6/25）余波持续。 |
| **国内综述** | DeepSeek 扩招余波（36氪 6/26 解读组织挑战）；**智谱 GLM-5.2** 开源编程能力被媒体引用为「Fable 5 之下全球第二」；阿里 Qwen-AgentWorld（6/24）仍最新。 |
| **行业宏观** | 三大 CLI 进入「无新版本维护日」；微软 Copilot CLI 迁移倒计时；**ALE（Agents Last Exam）** 新基准引发 GPT-5.5 vs Fable 5 讨论。 |
| **媒体透镜** | **共识**：AI 编程从 Loop 走向 RTS / Agent Control Plane，开发者角色转向「任务系统设计」；**最大分歧**：量子位聚焦模型榜单（GLM-5.2 / ALE），虎嗅/InfoQ 更强调 Loop Token 成本 3–8 倍与可观测性瓶颈。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | Qwen-AgentWorld（6/24 发布）仍最新；百炼接入 DeepSeek-V4 系列；今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-06-27 22:01 UTC） |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版（6/5）仍最新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | Seed 2.1（6/23）仍最新；今日无新版本 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/17 MIT 开源）仍最新；量子位 6 月报道编程榜单全球第二（开源第一） |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | 6/25–26 扩招余波持续；36氪 6/26 解读「大扩军之后怎么走」；Harness/Code Agent 方向不变 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：AI 编程范式从 Prompt → Skill → Loop → RTS → Agent Control Plane 演进，人类从「写提示词」转向「设计任务系统与验证护栏」 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：量子位将 GLM-5.2 / ALE 榜单解读为「模型能力竞赛」；虎嗅强调 Loop 模式 Token 成本 2–4 倍于人工、可观测性缺失 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.195 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.142.3 | ✅ `--version` / `doctor` / `features list` 正常；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/22 Changelog 3.9 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.195 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.3
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 微软 6/30 迁移倒计时、ALE 新基准、三大 CLI 维护日、Agent Control Plane |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.195 维护线、`/loops`、`autoMode.classifyAllShell`、OTel 响应日志 |
| [`cursor.md`](./cursor.md) | 3.9 Customize 页、Automations cron、computer use |
| [`codex.md`](./codex.md) | 0.142.3 稳定、alpha.27/28 预发布、Remote GA 余波 |
| [`china-ai.md`](./china-ai.md) | DeepSeek 扩招、GLM-5.2、Qwen-AgentWorld、国内厂商轮询、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（维护线，npm 2.1.195 无变）、[Anthropic News](https://www.anthropic.com/news)（无 6/27 新稿）、Cursor [Changelog](https://cursor.com/changelog)（3.9 @ 6/22，无 6/27 更新）、OpenAI [Codex Changelog](https://developers.openai.com/codex/changelog)（0.142.3 稳定）、GitHub Releases（0.143.0-alpha.27 @ 2026-06-27T18:35Z、alpha.28 @ 20:15Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 25–27 日内容
- 交叉验证：Claude Code / Codex npm @latest 与昨日一致；Codex alpha.27/28 仅 GitHub Pre-release；DeepSeek 扩招 36氪 + 官方公众号 secondary；Qwen-AgentWorld 阿里官方 + 36氪一致
