# DayAI 每日资讯索引 — 2026-07-29

> 检索触发时间：2026-07-29T22:01:30Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 7/29 无新版本，npm `@latest` 仍为 **2.1.220**；**Opus 5** 进入发布第 **6** 日；Anthropic 7/27 开放权重立场文无新修订。 |
| **Cursor** | **Cursor for iPad** 今日向全部付费计划开放；iPhone/iPad 新增 **Inbox**、完整 PR Review（评论/检查/合并），并支持 Bitbucket/Azure DevOps SCM。 |
| **Codex** | 稳定版 **0.146.0** 今日正式发布（01:42 UTC），npm `@latest` **已跟随升级**；同日 GitHub 再发 **0.147.0-alpha.1**。 |
| **国内综述** | **Kimi K3 权重开源第 3 日** + 全球大使计划启动；Unity 中国发布团结引擎 2.0 与 AI Agent「团结 Codely」；其余 12 家厂商今日无公开更新。 |
| **行业宏观** | Codex 0.146.0 stable 标志 OpenAI 编程 CLI 进入新稳定周期；Cursor 与 Codex 同日强化移动端 Agent 工作流，AI 编程竞争向「移动审查 + 会话管理」延伸。 |
| **媒体透镜** | **共识**：AI 编程瓶颈已从「写代码」转向「验证与交付」；**最大分歧**：Uncle Bob「绝不读 AI 代码」vs Hashimoto「逐行阅读」，代表测试围墙与人工直觉两种治理路径。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 20 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本（检索 2026-07-29 22:01 UTC） |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-29 22:01 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 9 日；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K3 权重开源第 3 日；7/28 启动全球大使计划；API `kimi-k3` 无新版本 |
| DeepSeek | 旧 API 名退役第 6 日；须使用 `deepseek-v4-flash` / `deepseek-v4-pro`；今日无新版本 |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-29 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-29 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-29 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-29 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-29 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-29 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-29 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：AI 编程提效遭遇「验证鸿沟」——编码快 10 倍但交付仅快 18%，行业共识转向 SDD、Evals 与全链路重构 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：Uncle Bob 主张用变异测试围墙替代读代码，Hashimoto 坚持逐行阅读建立直觉；Unity CEO 不相信「一句话生成游戏」→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.220 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Opus 5 推理 |
| Codex CLI (stable) | 0.146.0 | ✅ npm `@latest` 已升级至 0.146.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.147.0-alpha.1 | ✅ GitHub 7/29 09:13 UTC 最新；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/29 iPad Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.220 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.146.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 行业宏观：Codex 0.146.0 stable、Cursor iPad、验证鸿沟与 SDD |
| [`china-media.md`](./china-media.md) | 国内媒体行业透镜：Uncle Bob vs Hashimoto、交付提速悖论、K3 EDA |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、Unity Codely、Kimi 全球大使、DeepSeek 迁移 SOP |
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.220 维护观察 + Opus 5 第 6 日详解 |
| [`cursor.md`](./cursor.md) | Cursor iPad 全付费开放 + Inbox/PR Review 详解 |
| [`codex.md`](./codex.md) | Codex 0.146.0 stable 发布与 Agent Plugins 会话管理 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（2.1.220 / 7/25 01:35 UTC，7/29 无更新）、[Cursor iPad Changelog](https://cursor.com/changelog/ipad)（7/29）、Codex GitHub Releases（0.146.0 stable / 7/29 01:42 UTC；alpha.1 / 7/29 09:13 UTC）、[Codex Learn Changelog](https://learn.chatgpt.com/docs/changelog)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn；7/29 ±24h 窗口以验证鸿沟、Uncle Bob 争论、Unity Codely、K3 第 3 日为主
- 交叉验证：Cursor iPad 经官方 Changelog 确认；Codex 0.146.0 经 GitHub + npm + Learn Changelog 三重确认；K3 开源经 Moonshot GitHub + 36氪/机器之心确认；Unity Codely 经虎嗅采访 + 官方发布会确认
