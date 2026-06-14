# DayAI 每日索引 — 2026-06-04

**检索触发时间（UTC）**：2026-06-04T22:01:17Z  
**本地实测目录**：`/workspace/tools`（`@anthropic-ai/claude-code@2.1.163`、`@openai/codex@0.137.0`）

---

## 一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 当日发布 **v2.1.163**：企业可锁版本区间、`/plugin list` 与 `/btw` 复制、Hook 可回传上下文而不报错；本地 `claude --version` → **2.1.163** ✅ |
| **Cursor** | **3.7（6 月 4 日）**：Canvas 内 **Design Mode** + **上下文用量报告**；企业多团队组织昨日 GA |
| **Codex** | GitHub 当日连发 **0.138.0-alpha.1–4**；npm 稳定版仍为 **0.137.0**；企业月度额度、云托管配置包、Multi-agent v2 为 alpha 重点 |
| **国内厂商** | 编程 Agent/IDE **当日无各官网 changelog 级更新**；值得跟进的近期信号：字节 **Bernini** 开源、DeepSeek 识图灰度（非今日） |
| **行业宏观** | Anthropic 秘密递表 IPO、SpaceX 路演、OpenAI×AWS Bedrock 正式 GA、特朗普 AI 国家安全审查行政令 |
| **媒体透镜** | **共识**：大厂从「全员堆 Token」转向 ROI/配额管理；**分歧**：虎嗅强调 95% 试点无财务回报，量子位仍押注世界模型/物理 AI 长赛道 — 见 [china-media.md](./china-media.md) |

---

## 国内厂商一句话结论表

| 厂商/产品 | 2026-06-04 结论 |
|-----------|-----------------|
| 阿里通义/百炼/Qwen-Coder | 今日无公开更新（轮询阿里云/通义博客/GitHub QwenLM，22:00 UTC 档） |
| 百度文心/Comate/快码 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟/扣子 | 今日无产品 changelog；**6 月上旬** 量子位报道 Bernini 框架开源（视频编辑） |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi/Kimi Code | 今日无公开更新 |
| DeepSeek | 今日无 API/平台新公告；识图灰度为 **4 月** 旧闻 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/天工/零一万物/面壁 | 今日无公开更新 |

---

## 媒体行业透镜一句话

- **共识**：编程 Agent 进入「企业配额 + 多 Agent 编排」阶段（Cursor 组织/Canvas、Codex 企业额度、虎嗅 Token 收紧文）。
- **最大分歧**：**世界模型/物理 AI 长投入**（量子位、机器之心 PRO） vs **企业 AI 试点普遍不赚钱**（虎嗅 2026-06-04）— 详见 [china-media.md#今日媒体行业透镜](./china-media.md#今日媒体行业透镜)。

---

## 本地实测摘要

```text
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest

./node_modules/.bin/claude --version     → 2.1.163 (Claude Code)  ✅
./node_modules/.bin/claude --help        → 正常输出（非交互环境）✅

./node_modules/.bin/codex --version      → codex-cli 0.137.0      ✅
./node_modules/.bin/codex doctor         → 无凭据：auth ✗；PATH 与全局 npm 前缀不一致 ⚠️
./node_modules/.bin/codex features list  → 27 enabled（TERM=xterm-256color）✅
```

国内 CLI：本环境无各厂商 API Key，未对 DeepSeek/Qwen 等做 curl 推理；见 [china-ai.md#本地实测总览](./china-ai.md#本地实测总览)。

---

## 文档索引

| 文件 | 内容 |
|------|------|
| [industry.md](./industry.md) | 国际/国内宏观：IPO、监管、算力、对开发者含义 |
| [china-media.md](./china-media.md) | ≥8 源轮询、行业透镜、交叉索引 |
| [claude-code.md](./claude-code.md) | v2.1.163 特性逐项 + ultracode 模板 |
| [cursor.md](./cursor.md) | 3.7 Canvas Design Mode、上下文报告、权限配置 |
| [codex.md](./codex.md) | 0.138 alpha / 0.137 稳定版、Bedrock、企业配置 |
| [china-ai.md](./china-ai.md) | 国内轮询、Bernini、DeepSeek 背景、实测 |

---

*检索记录脚注：国际源 cursor.com/changelog、github.com/anthropics/claude-code/releases、github.com/openai/codex/releases、aws.amazon.com（6/1 GA）；国内源见 china-media.md 各节「检索入口」。*
