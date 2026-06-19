# DayAI 每日资讯索引 — 2026-06-19

> 检索触发时间：2026-06-19T22:03:05Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.183** patch（较 6/18 的 2.1.181 +2）：auto mode 破坏性 git 拦截、`/config key=value`、Bun 1.4 与 Subagent 面板优化持续落地；**Fable 5 免费窗口 6/22 UTC 截止**。 |
| **Cursor** | **3.8（6/18）** 进入消化期：Automations 新增 `/automate` skill、Slack emoji 触发、5 项 GitHub trigger 与默认 **Computer Use**；6/19 无新 Changelog。 |
| **Codex** | 稳定版仍为 **0.141.0**；**6/19** GitHub 连发 **0.142.0-alpha.3–alpha.6** 预发布，稳定通道尚未切换。 |
| **国内综述** | 智谱 **GLM-5.2** 开源热度延续；腾讯 **WorkBuddy 企业版**（6/5）与快手 **RCA Agent**（QCon 6 月）代表「企业 Agent 下半场」；DeepSeek 官方 Code Agent 仍缺位。 |
| **行业宏观** | **ALE（Agents' Last Exam）** 引发「真干活」评测讨论：GPT 5.5+Codex 在通过率上略胜 Fable 5+Claude Code；**Fable 5 免费试用倒计时 3 天**。 |
| **媒体透镜** | **共识**：2026 年 Coding Agent 竞争焦点已从 Prompt 转向 **Harness / Context Engineering**；**最大分歧**：垂直媒体强调 ALE「真场景」颠覆 SWE-Bench，商业媒体更关注 Automations 对企业研发流程的改造。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-19 22:03 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | **WorkBuddy 企业版**（6/5 发布）持续发酵：数字员工 + 人机协同「项目」+ Admin 治理后台 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新；InfoQ 预告 **Qoder CLI** AICon 上海（6/26–27）分享 |
| 智谱 GLM/CodeGeeX | **GLM-5.2**（6/17 MIT 开源）持续可部署；今日无新版本发布 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | Harness 团队招聘持续，官方编程 Agent 仍未发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Agent 工程化需 Harness、Subagents 与 Context Engineering 三件套，「能写代码」≠「能交付」→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：量子位等垂直 AI 媒体将 ALE 解读为「Fable 5 神话破灭」；36氪/InfoQ 更强调企业 RCA Agent、WorkBuddy 等落地场景对研发组织的改造 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.183 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.141.0 | ✅ `--version` / `doctor` / `features list` 正常（12 ok · 1 warn · 4 fail，auth 未登录）；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/18 Changelog 3.8 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.183 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.141.0
./node_modules/.bin/codex doctor 2>&1 | tail -5
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | ALE 基准争议、Cursor Automations 3.8、Fable 5 免费窗口倒计时 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、InfoQ、虎嗅 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.183 auto mode 安全、`/config`、Bun 1.4、Fable 5 窗口策略 |
| [`cursor.md`](./cursor.md) | Automations `/automate`、GitHub/Slack 触发器、Computer Use |
| [`codex.md`](./codex.md) | 0.141.0 稳定版、0.142.0-alpha 预发布、Record & Replay |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、WorkBuddy/RCA Agent、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic Changelog、Cursor Changelog（6/18 3.8）、OpenAI Codex Changelog（6/18 App 26.616）、GitHub Releases（0.142.0-alpha.6 @ 2026-06-19T20:29Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 17–19 日内容
- 交叉验证：ALE 基准 UC Berkeley 官方发布 + 量子位 secondary 报道；Cursor Automations 官方 Changelog + Releasebot 二次汇总
