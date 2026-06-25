# DayAI 每日资讯索引 — 2026-06-25

> 检索触发时间：2026-06-25T22:02:49Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.193**（npm @latest；Changelog 维护 patch 线延续）：`/rewind` 恢复 `/clear` 前对话、MCP `login/logout` CLI 认证、流式 CPU 降 **37%**；无 6/25 重大产品发布，Claude Tag（6/23）余波持续。 |
| **Cursor** | **3.9（6/22）** 无 6/25 新 Changelog；Customize 页 + Automations cron 触发（本任务即实例）仍是本周主线，与 Codex Remote GA 形成「桌面 vs 移动端遥控」对照。 |
| **Codex** | 稳定版跃升至 **0.142.2**（6/25 07:32Z）：MCP **tool search** 默认启用、插件 dark-mode logo、macOS 系统代理；**Codex Remote 正式 GA** + DigitalOcean 插件；`codex-zsh v0.1.0` 预发布。 |
| **国内综述** | 媒体 6/25 转向「AI 编程孤独感」社会叙事（Fiona Fung 访谈）；DeepSeek Harness 招聘与字节 Seed 2.1 长程 Agent 无今日新版本；各主流厂商今日无重大发布。 |
| **行业宏观** | **Codex Remote GA** 将 Agent 控制延伸至手机端；微软 E+D **Copilot CLI 迁移剩 5 天**（6/30）；Token 薪酬化讨论（黄仁勋 GTC 2026）持续发酵。 |
| **媒体透镜** | **共识**：AI 编程从「提效工具」进入「组织协作 + 人机关系」反思期；**最大分歧**：36氪/新智元强调 Claude 80% 代码合并的孤独副作用，虎嗅/InfoQ 更关注 Codex 分发层与 Harness 工程范式。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-25 22:02 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版（6/5）仍最新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | Seed 2.1（6/23）仍最新；今日无新版本 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/17 MIT 开源）仍最新；今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | Harness 团队招聘持续；官方 DeepSeek Code 仍未发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Claude Tag 发布两天后，讨论从「功能评测」转向「组织文化与孤独感」——AI 编程普及带来的人际连接流失 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：新智元将 Fiona Fung 访谈解读为「80% 代码合并的代价」；量子位仍聚焦 Seed 2.1 长程 Agent 技术对标 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.193 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.142.2 | ✅ `--version` / `doctor` / `features list` 正常；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/22 Changelog 3.9 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.193 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.2
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Codex Remote GA、0.142.2 稳定版、微软 6/30 迁移倒计时、AI 孤独感叙事 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.192–193、`/rewind`、MCP CLI 认证、流式性能优化 |
| [`cursor.md`](./cursor.md) | 3.9 Customize 页、Automations cron、与 Codex Remote 对照 |
| [`codex.md`](./codex.md) | 0.142.2、Remote GA、MCP tool search、codex-zsh |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek Harness、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（维护 patch 线）、[Anthropic News](https://www.anthropic.com/news)（无 6/25 新稿）、Cursor [Changelog](https://cursor.com/changelog)（3.9 @ 6/22，无 6/25 更新）、OpenAI [Codex Changelog](https://developers.openai.com/codex/changelog)（0.142.2 + Remote GA @ 6/25）、GitHub Releases（0.142.2 @ 2026-06-25T07:32Z、codex-zsh v0.1.0 @ 21:02Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 23–25 日内容
- 交叉验证：Codex 0.142.2 官方 Changelog + GitHub Release + npm @latest 一致；Codex Remote GA 官方 Changelog + Release notes 一致；Fiona Fung 访谈 36氪 secondary + 新智元 6/25 一致；微软 6/30 迁移 The Verge + 36氪 secondary
