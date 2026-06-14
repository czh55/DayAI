# DayAI 每日索引 — 2026-06-03

> **检索基准时间（trigger）**：2026-06-03T22:02:16Z（UTC）  
> **本地 CLI 实测目录**：`/workspace/tools`  
> **分支**：`cursor/ai-0264`

---

## 一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm 实测 **2.1.162**；昨日发布 **2.1.161** 重点：并行 Bash 失败不再拖垮同批工具、OTEL 指标标签、MCP 密钥脱敏、Linux 剪贴板与第三方登录策略修复。详见 [claude-code.md](./claude-code.md) |
| **Cursor** | **2026-06-03** Enterprise GA：**Organization → Teams → Groups** 多团队治理与跨团队用户/预算/模型权限。详见 [cursor.md](./cursor.md) |
| **OpenAI Codex** | npm 实测 **0.136.0**；**6/3** 预发布 **0.137.0-alpha.4**；**6/2** 官方 **Sites** 预览 + ChatGPT 合体路线图；**6/1** **0.136.0** 会话归档、Bedrock、TUI 可点击链接。详见 [codex.md](./codex.md) |
| **国内厂商综述** | **DeepSeek 首轮对外融资**（路透 6/3，拟 500 亿元、投后 3500–4000 亿元）为今日最大变量；产品侧 **识图模式灰测**（媒体 6/1）与 **V4 API** 迁移窗口仍影响开发者。详见 [china-ai.md](./china-ai.md) |
| **行业宏观** | **Anthropic 6/1 秘密递交 S-1**；**DeepSeek 融资**与 **OpenAI×ChatGPT Agent 分发** 同日发酵。详见 [industry.md](./industry.md) |
| **媒体行业透镜** | **共识**：编程 Agent 从工具进企业工作流/IPO 叙事；**最大分歧**：36氪/路透强调 DeepSeek「国家队+产业资本」治理考验，虎嗅强调 Agent 落地率与组织变革阻力。详见 [china-media.md](./china-media.md) |

---

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里（通义/Qwen/百炼） | 今日无 6/3 当日官方 changelog；首页可见 **Qwen3.7-Plus**（前天上线百炼）— 见 [china-ai.md](./china-ai.md) |
| 百度（文心/Comate） | 今日无 6/3 公开更新；近期 **PaddleOCR-VL-1.6**（前天） |
| 腾讯（混元/CodeBuddy） | 今日无产品 changelog；**拟投 DeepSeek 100 亿元**（路透 6/3，未官方确认） |
| 字节（豆包/Trae/扣子） | 今日无 6/3 官方更新 |
| 智谱（GLM/CodeGeeX） | 今日无 6/3 公开更新 |
| 月之暗面（Kimi） | 今日无 6/3 公开更新 |
| **DeepSeek** | **首轮融资接近完成**（路透 6/3）+ **识图灰测**（媒体 6/1） |
| 讯飞（星火/iFlyCode） | 今日无公开更新 |
| 华为（盘古/CodeArts） | 今日无公开更新 |
| MiniMax / 商汤 / 天工 / 零一 / 面壁 | 今日无 6/3 公开更新 |

---

## 本地实测摘要

```text
/workspace/tools$ npm list
@anthropic-ai/claude-code@2.1.162
@openai/codex@0.136.0

claude --version  → 2.1.162 (Claude Code)
claude --help     → ✅ 正常
codex --version   → codex-cli 0.136.0
codex doctor      → ⚠️ 无 auth（预期）；⚠️ TERM=dumb；✅ 27 feature flags
codex features list → ✅ plugins/sites/multi_agent 等为 stable
```

国内 CLI：无官方 npm 包可测；DeepSeek OpenAI 兼容 API 需 `DEEPSEEK_API_KEY`，本环境未配置 — 见 [china-ai.md#本地实测总览](./china-ai.md)。

---

## 文件导航

| 文件 | 内容 |
|------|------|
| [industry.md](./industry.md) | 国际 IPO/融资、OpenAI 产品战略、国内 DeepSeek 资本与算力链 |
| [china-media.md](./china-media.md) | ≥8 源媒体透镜 + 跨源共识/分歧 |
| [claude-code.md](./claude-code.md) | v2.1.161/162 特性逐项 SOP + ultracode 模板 |
| [cursor.md](./cursor.md) | Enterprise 多团队治理 + Auto-review 等近期能力 |
| [codex.md](./codex.md) | Sites / 归档 / Bedrock / 0.136.0 |
| [china-ai.md](./china-ai.md) | 国内厂商轮询 + DeepSeek 融资与识图 |

---

## 检索记录（脚注）

- 国际： [cursor.com/changelog](https://cursor.com/changelog)、[GitHub anthropics/claude-code v2.1.161](https://github.com/anthropics/claude-code/releases/tag/v2.1.161)、[developers.openai.com/codex/changelog](https://developers.openai.com/codex/changelog)、[openai/codex rust-v0.136.0](https://github.com/openai/codex/releases/tag/rust-v0.136.0)
- 国内：路透/36氪 DeepSeek 融资（2026-06-03）、 [api-docs.deepseek.com/updates](https://api-docs.deepseek.com/zh-cn/updates)
- 媒体：量子位、36氪、虎嗅（见 china-media.md 各节 URL）
