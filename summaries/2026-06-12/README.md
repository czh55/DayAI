# DayAI 每日资讯索引 — 2026-06-12

> **检索基准时间**：2026-06-12T22:01:39Z（Automation cron trigger）  
> **本地实测环境**：Ubuntu 24.04，`/workspace/tools` npm 本地安装  
> **分支**：`cursor/ai-153b`

---

## 一句话结论

| 类别 | 结论 |
|------|------|
| **Claude Code** | 当日连发 **v2.1.174 / v2.1.176**：Remote Control、后台会话、Bedrock 凭证缓存与 `availableModels` 治理大幅加固；本地实测 **2.1.176**。 |
| **Cursor** | 当日无新 changelog；**6 月 10 日 Bugbot** 换用 Composer 2.5，审查 ~90s、成本降 22%，新增 `/review` 与增量 PR 审查。 |
| **OpenAI Codex** | npm 稳定版 **0.139.0**；GitHub 当日连推 **0.140.0-alpha.16** 预发布，`plugins`/`goals`/`multi_agent` 已 stable。 |
| **国内厂商** | 当日多数头部厂商无公开更新；**Trae CN v3.3.64–3.3.65**（6/9）企业版日志上传；媒体热议 **ALE 基准** 与 **G7 AI 峰会**。 |
| **行业宏观** | **G7 法国峰会**（6/15–17）确认 Altman/Amodei/Hassabis 等出席；OpenAI/Anthropic 机密 S-1 与 SpaceX IPO 同日交易。 |
| **媒体透镜** | **共识**：编程 Agent 评测从「答题榜」转向「真干活」（ALE）；**分歧**：Fable 5 成本/效率 vs GPT 5.5 在 ALE 上的反超解读。→ 见 [`china-media.md`](./china-media.md) |

---

## 国内厂商一句话结论表

| 厂商 / 产品 | 今日结论 |
|-------------|----------|
| 阿里通义 / 百炼 / Qwen-Coder | 今日无公开更新 |
| 百度文心 / Comate / 快码 | 今日无公开更新 |
| 腾讯混元 / CodeBuddy | 今日无公开更新 |
| 字节豆包 / Trae / 火山方舟 | Trae CN **v3.3.64–3.3.65**（6/9 发布，非今日）；内置 Kimi-K2.6 等模型此前已上线 |
| 智谱 GLM / CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi / Kimi Code | 今日无公开更新（K2.6 经 Trae 集成，非 Kimi 官方当日发版） |
| DeepSeek / DeepSeek-Coder | 今日无公开更新 |
| 讯飞星火 / iFlyCode | 今日无公开更新 |
| 华为盘古 / CodeArts | 今日无公开更新 |
| MiniMax / 商汤 / 天工 / 零一万物 / 面壁 | 今日无公开更新 |
| 云知声 U2（港股 AGI） | 媒体深度报道 U2 基座（量子位，6 月）；**非厂商当日 changelog** |

---

## 媒体行业透镜一句话

- **共识**：多家媒体（量子位、36氪、虎嗅）认为 **Agent 工程化**（Loop/规范/评测）已取代「单次 Prompt」成为 2026 下半年主叙事。
- **最大分歧**：量子位报道 **ALE 基准** 上 GPT 5.5+Ccodex 略胜 Fable 5+Claude Code，与此前 SWE-bench 叙事形成反差——见 [`china-media.md#今日媒体行业透镜`](./china-media.md)。

---

## 本地实测摘要

```bash
cd /workspace/tools && npm install @anthropic-ai/claude-code@latest @openai/codex@latest
```

| 工具 | 版本 | 结果 |
|------|------|------|
| `claude --version` | **2.1.176** | ✅ 安装与 `--help` 正常 |
| `codex --version` | **0.139.0** | ✅ `doctor` / `features list` 可运行；⚠️ 无 API Key，WebSocket 401 预期 |
| `codex plugin list` | — | ✅ 返回空列表（未配置 marketplace） |
| DeepSeek/Qwen API | — | ❌ 未实测（无环境变量 API Key）；见 `china-ai.md` curl 模板 |

---

## 文件导航

| 文件 | 内容 |
|------|------|
| [`claude-code.md`](./claude-code.md) | v2.1.174/176 特性详解 + Fable 5 / ultracode / Remote Control |
| [`cursor.md`](./cursor.md) | Bugbot 6/10 更新 + SDK 6/4 更新 + permissions.json |
| [`codex.md`](./codex.md) | 0.139 stable + 0.140 alpha + Plugins/Goals/Multi-agent |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询 + Trae 实测说明 |
| [`china-media.md`](./china-media.md) | 8+ 媒体源行业透镜 |
| [`industry.md`](./industry.md) | G7、IPO、ALE 等行业宏观 |

---

## 检索记录（脚注）

- 国际：`code.claude.com/docs`、`github.com/anthropics/claude-code/releases`、`cursor.com/changelog`、`github.com/openai/codex/releases`
- 国内厂商：各官网 / 火山引擎开发者社区 / `docs.trae.cn`
- 媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn` 等，优先 6/11–6/12 内容
