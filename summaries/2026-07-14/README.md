# DayAI 每日资讯索引 — 2026-07-14

> 检索触发时间：2026-07-14T22:01:24Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.209**（7/14 04:45 UTC）发布，含 screen reader、`/model` 后台会话修复、内存泄漏补丁；**Fable 5 订阅包含窗口二次延期至 7/19 23:59 PT**。 |
| **Cursor** | **3.11（7/10）** 仍为最新 Changelog；外媒报道内部测试通用智能体 **Sand**（7/14），对标 ChatGPT Work / Claude Cowork。 |
| **Codex** | 稳定版 **0.144.4**（7/14 05:08 UTC）无用户可见变更；**5 小时滚动限额临时移除**（7/12 Tibo 公告）+ 用量重置仍在生效。 |
| **国内综述** | **阿里 Claude 禁令第 5 日**持续；Fable 5 再延期与 Codex 限流松绑引发国产平替（Qoder/CodeBuddy）二次讨论。 |
| **行业宏观** | **算力争夺白热化**：Anthropic 延期 Fable 5 ↔ OpenAI 移除 Codex 5h 限额；Cursor Sand 入局通用办公 Agent 赛道。 |
| **媒体透镜** | **共识**：AI 编程进入「限流博弈 + 长程 Agent」双主线；**最大分歧**：Cursor Sand 能否在 SpaceX 收购阴影下独立推向市场。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 5 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-14 22:01 UTC） |
| 腾讯混元/CodeBuddy | **CodeBuddy Code v2.103.0** 仍为最近更新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新（检索 2026-07-14 22:01 UTC） |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K2.7 Code 7/7 进入 Copilot Business/Enterprise；Kimi 产品今日无新版本 |
| DeepSeek | V4 预览版运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 **10 天** |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-14 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-14 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-14 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-14 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-14 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-14 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-14 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：Fable 5 再延期与 Codex 5h 限额松绑标志算力争夺进入「你延期我松绑」白热化阶段 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：Cursor Sand 是独立产品战略还是 SpaceX 收购前的过渡实验 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.209 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.4 | ✅ `@latest` 已升至 0.144.4；`doctor` 12 ok · 1 warn · 4 fail |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 3.11 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.209 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.4
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 再延期、Codex 5h 限额松绑、Claude for Teachers、Cursor Sand |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.209 新补丁、Fable 5 延期至 7/19、Claude for Teachers |
| [`cursor.md`](./cursor.md) | 3.11 第 5 日观察、Sand 内测报道、SpaceX 收购变量 |
| [`codex.md`](./codex.md) | 0.144.4 稳定版、5h 限额临时移除、alpha.11 预发布 |
| [`china-ai.md`](./china-ai.md) | 阿里禁令第 5 日、全厂商轮询、DeepSeek SOP |

## 检索记录脚注

- 国际官方：Claude Code Changelog、Anthropic News（Claude for Teachers 7/14）、Cursor Changelog、Codex Changelog、GitHub openai/codex releases（0.144.4/0.145.0-alpha.11）、Tibo @thsottiaux X 帖（7/12）
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn（触发日 ±24h）
- 交叉验证：Fable 5 延期（Anthropic 支持页 + 量子位 7/14）；Codex 5h 限额（Tibo X + BleepingComputer 7/12）；Cursor Sand（The Information + 36氪 7/14）
