# DayAI 每日资讯索引 — 2026-06-11

> 检索窗口：UTC 2026-06-11T22:01:48（北京时间 2026-06-12 06:01）及前 24 小时  
> 本地实测环境：`/workspace/tools`（Ubuntu 24.04，Node npm 本地安装）

## 一句话结论

| 类别 | 结论 |
|------|------|
| **Claude Code** | 当日发布 **v2.1.173**（Fable 5 模型名 `[1m]` 后缀归一化 + Windows 沙箱误报警修复）；延续 6/10 的 **5 层嵌套子 Agent** 与 Fable 5 接入热度 |
| **Cursor** | 6/10 **Bugbot 提速 3 倍+、降价 22%**；新增 **`/review` 推送前审查** 与「仅审增量 diff」；6/4 SDK 自定义工具/自动审查/JSONL 存储仍值得落地 |
| **Codex** | 稳定版 **0.139.0**（6/9）：Code mode 独立 Web 搜索、MCP `oneOf`/`allOf` 模式保留、`resume --last` 提示词修复；6/11 仅有 alpha 预发布 |
| **国内综述** | **字节 TRAE** 在火山引擎 Force 大会官宣智能 Cue/MCP/SOLO；**通义千问** 上线高考志愿 Agent；多数模型厂商当日无新版本 |
| **媒体透镜** | **共识**：Mythos 级模型 + 长程 Agent 成焦点；**最大分歧**：Harness 该做厚还是做薄、Fable 5 企业合规与 ZDR 冲突 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼/Qwen Code | **有更新**：千问上线全周期**高考志愿填报 Agent**（6/11）；Qwen Code 最新 npm **0.17.1**（Computer Use 内置，6/4 周报） |
| 百度文心/Comate | 今日无公开 changelog 更新（检索 2026-06-11） |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | **有更新**：**TRAE** Force 大会发布智能 Cue、豆包 1.6、MCP 市场、SOLO 预告（6/11） |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | 今日无新模型发布；**Mega MoE/融资传闻** 为媒体跟进（非官方 6/11 发版） |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑/零一/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：多家媒体将 **Claude Fable 5 / Mythos 5** 视为「编程 Agent 从补全走向自主执行系统」的里程碑，并关注 **6/22 前 Pro 用户免费窗口**。详见 [`china-media.md`](./china-media.md#今日媒体行业透镜跨源汇总400-字)。
- **最大分歧**：**36氪/量子位** 强调 SWE-bench 与长程任务商业价值；**虎嗅/InfoQ** 更关注 **Loop/Harness 工程范式** 与 **多 Agent 规模悖论**（Google DeepMind 论文：3–4 个 Agent 为甜点）。详见 [`china-media.md`](./china-media.md#分歧)。

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| `claude` | 2.1.173 | ✅ `--version` / `--help` 正常 |
| `codex` | 0.139.0 | ✅ `doctor` 12 ok；❌ 无 API Key；⚠️ WebSocket 401 |
| `qwen` (@qwen-code/qwen-code) | 0.17.1 | ✅ `--version` / `--help` 正常；未测 API（无 Key） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.173
./node_modules/.bin/codex --version    # codex-cli 0.139.0
./node_modules/.bin/qwen --version       # 0.17.1
```

## 文件导航

| 文件 | 内容 |
|------|------|
| [`claude-code.md`](./claude-code.md) | v2.1.173 / 172 / 170：Fable 5、嵌套子 Agent、ultracode 模板 |
| [`cursor.md`](./cursor.md) | Bugbot 6/10、SDK 6/4、Design Mode、permissions.json |
| [`codex.md`](./codex.md) | 0.139.0 特性、Plugins/Sites SOP、Web 搜索 |
| [`china-ai.md`](./china-ai.md) | 字节 TRAE、通义千问、DeepSeek 生态、CLI 实测 |
| [`industry.md`](./industry.md) | Fable 5 发布、微软 ZDR 摩擦、谷歌 DiffusionGemma |
| [`china-media.md`](./china-media.md) | 量子位/36氪/虎嗅/InfoQ 等 8+ 源行业判断 |

## 检索记录脚注

- 国际：GitHub `anthropics/claude-code` CHANGELOG、`cursor.com/changelog`、`github.com/openai/codex/releases`
- 国内厂商：各官网 changelog、火山引擎/通义博客、npm `@qwen-code/qwen-code`
- 媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn` 等，优先 6/10–6/11 发稿
