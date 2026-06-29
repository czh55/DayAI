# 国内 AI 厂商与编程产品 — 2026-06-29

> 检索时间：2026-06-29T22:00:55Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **智谱 GLM-5.2 编程叙事持续发酵（量子位 6 月）**：在 Claude Fable-5 之下，GLM-5.2 被报道为「开源编程全球第一、全球第二」；支持 1M 上下文与长程工程任务，MIT 开源（6/17 发布）仍是最近重大更新。
2. **字节豆包 2.1 / 专业版（6/23–24）仍最新**：豆包大模型 2.1 Pro 编程能力对标 Opus 4.7、成本降低约 80%；豆包专业版接入 2.1 Pro 驱动「办公任务」模式，含定时任务与 Skills。
3. **国产桌面 Agent 混战格局固化（36氪 6 月）**：Kimi Work、豆包任务模式、腾讯 WorkBuddy、MiniMax Code 等形成「中国版 Codex」矩阵，但今日各厂商均无新版本发布。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.195 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.142.4 |
| DeepSeek API | curl 调用 | ⚠️ 未实测（无 Key） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.195 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.4
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-29 22:00 | 阿里云/百炼 | Qwen-AgentWorld（6/24）仍最新 |
| 百度文心/Comate | 2026-06-29 22:00 | 官网/Comate 文档 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-29 22:00 | 官网/CodeBuddy | WorkBuddy 企业版（6 月大会）仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-06-29 22:00 | 火山方舟/Trae | Seed 2.1 / 豆包专业版（6/23–24）仍最新 |
| 月之暗面 Kimi | 2026-06-29 22:00 | kimi.moonshot.cn | Kimi Work Beta（6/3）仍最新 |
| DeepSeek | 2026-06-29 22:00 | deepseek.com | Harness 叙事延续，无新产品 |
| 讯飞星火/iFlyCode | 2026-06-29 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-29 22:00 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-06-29 22:00 | minimax.io | 今日无公开更新 |
| 商汤 | 2026-06-29 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-29 22:00 | 天工/Skywork | 天工 3.1 Dynamic Workflows（6 月）仍最新 |
| 零一万物 | 2026-06-29 22:00 | 01.ai | 今日无公开更新 |
| 面壁智能 | 2026-06-29 22:00 | 面壁官网 | 今日无公开更新 |

## 分厂商详情

### 智谱 GLM/CodeGeeX — GLM-5.2（6/17，仍最新）

**发生了什么**

6/17 智谱开源 GLM-5.2（MIT 许可），支持 1M 上下文。量子位 6 月报道其在编程评测中位列「开源全球第一、全球第二（Fable-5 之下）」，Design Arena 品味评测全球第一。CodeGeeX 作为 IDE 插件持续集成 GLM 系列。

**对开发者**：可关注 GLM-5.2 作为开源长程 Coding Agent 底座；今日无新版本。

**来源**：[量子位 GLM-5.2](https://www.qbitai.com/2026/06/436085.html)｜智谱开源仓库

---

### 字节豆包/Trae/火山方舟 — Seed 2.1 / 豆包专业版（6/23–24，仍最新）

**发生了什么**

6/23 FORCE 原动力大会发布豆包大模型 2.1 Pro/Turbo；6/24 豆包专业版正式上线，办公任务模式由 2.1 Pro 驱动，含定时任务、Skills、浏览器操作。Trae 国际版持续迭代，火山方舟提供 API 接入。

**对开发者**：豆包 2.1 Pro 定价输入 6 元/百万 token、输出 30 元，适合高频 Agent 场景；今日无新版本。

**来源**：[36氪 豆包 2.1](https://36kr.com/p/3865600233395201)｜[36氪 豆包专业版](https://m.36kr.com/p/3866614308951048)

---

### 阿里通义/百炼 — Qwen-AgentWorld（6/24，仍最新）

**发生了什么**

6/24 发布 Qwen-AgentWorld（Language World Model），覆盖 MCP/Terminal/SWE/Web/OS/Android 七大环境；AgentWorldBench 同步发布。百炼平台持续接入 Qwen3 系列与 DeepSeek-V4。

**结论**：今日无公开更新（检索 2026-06-29 22:00 UTC）

---

### DeepSeek — Harness 团队叙事延续

**发生了什么**

36氪 5 月报道 DeepSeek 组建 Harness 团队对标 Claude Code；招聘岗位要求深度使用 Claude Code/Codex/Cursor。社区 DeepSeek-TUI 等项目持续活跃，但官方尚未发布对标 Claude Code 的终端 Agent 产品。

**结论**：今日无新产品发布；Harness 叙事为媒体报道延续，⚠️ 官方未确认具体产品时间表。

---

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
export DEEPSEEK_API_KEY="your-api-key-here"

curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "system", "content": "You are a helpful coding assistant."},
      {"role": "user", "content": "Write a Python function to merge two sorted lists."}
    ],
    "stream": false
  }'
```

### Python 示例

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Explain quicksort in Python with code."}
    ]
)
print(response.choices[0].message.content)
```

**本地实测**：⚠️ 未实测（Cloud Agent 环境无 `DEEPSEEK_API_KEY`）

---
