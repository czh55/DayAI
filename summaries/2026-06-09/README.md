# DayAI 每日资讯索引 — 2026-06-09

> 检索截止时间（UTC）：2026-06-09T22:02:21Z  
> 本地 CLI 实测环境：`/workspace/tools`（Ubuntu 24.04，Node npm 本地安装）

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | v2.1.170 接入 Claude Fable 5（Mythos 级公开模型）；v2.1.169 新增 `--safe-mode`、`/cd`、禁用内置技能等排查与多会话能力 |
| **Cursor** | 今日无新 changelog；近 48 小时焦点为 3.7 浏览器 Design Mode 多选/语音与 SDK 3.7 自定义工具、auto-review、JSONL 存储 |
| **Codex** | **今日发布 CLI 0.139.0**：Code mode 独立 Web 搜索、MCP schema 增强、`codex doctor` 环境诊断、插件市场 JSON 改进 |
| **国内厂商** | 今日多数厂商无公开更新；近期 DeepSeek 识图灰测与 V4 API 迁移倒计时（7/24 停用旧端点）仍值得开发者跟进 |
| **行业宏观** | Anthropic 正式发布 Claude Fable 5 / Mythos 5，定价翻倍于 Opus 4.8，强制 30 天流量留存用于安全监控 |
| **媒体透镜** | 共识：编程 Agent 从「写提示词」转向「循环工程」；分歧：36氪/虎嗅对 DeepSeek 出海性价比乐观，对闭源 Agent 稳定性仍认美系领先 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索：官网、GitHub QwenLM，2026-06-09） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| **DeepSeek** | 今日官网无新公告；**近期**识图模式灰测、V4 旧 API 7/24 停用提醒仍有效 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/天工/零一/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：多家媒体（36氪、虎嗅、InfoQ）认为 2026 年 Agent/Coding Agent 进入「循环工程 + 企业基建」阶段，而非单纯模型竞赛。
- **最大分歧**：虎嗅强调中美「场景分裂」（开源/成本中国强、长程 Agent 美系稳）；36氪同期报道 DeepSeek 海外调用量登顶，对「闭源不可替代」持更怀疑态度。详见 [`china-media.md`](./china-media.md#今日媒体行业透镜跨源汇总400-字)。

## 本地实测摘要

```text
# 国际 CLI（/workspace/tools）
claude --version  → 2.1.170 (Claude Code)  ✅
claude --help     → 含 --safe-mode、--fallback-model  ✅
codex --version   → codex-cli 0.139.0  ✅
codex doctor      → 12 ok · 4 fail（无 auth、TERM=dumb、npm 路径分裂）⚠️
codex features list → 已列出 70+ feature flags  ✅

# 国内
openai pip 2.41.0 安装成功；DeepSeek/Qwen 官方 npm CLI 无官方包，API 需 Key 未实测调用 ⚠️
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 国际与国内宏观：Fable 5 发布、AI 监管与算力、对开发者影响 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 等 ≥8 源行业判断与交叉索引 |
| [`claude-code.md`](./claude-code.md) | Fable 5、safe-mode、/cd、disableBundledSkills、ultracode 动态工作流 |
| [`cursor.md`](./cursor.md) | SDK 3.7 自定义工具/auto-review/JSONL、Design Mode、Organizations |
| [`codex.md`](./codex.md) | 0.139.0 新特性、Sites/Plugins SOP、本地 doctor 实测 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek 识图与 API 迁移、本地实测总览 |

## 检索记录脚注

- 国际官方：cursor.com/changelog、developers.openai.com/codex/changelog、github.com/anthropics/claude-code/releases、anthropic.com/news
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn` 等，优先 2026-06-08～06-09 内容
