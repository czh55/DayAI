# 国内 AI 厂商与编程产品 — 2026-06-26

> 检索时间：2026-06-26T22:00:14Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek 510 亿融资后史上最大规模招聘**：6/25–26 官宣 7 大类 33 岗位，含 **Agent Harness 团队**、Agent Infra、通用 Agent 数据产品经理；计划所有部门规模翻倍。标志着国产 AI 从精干研究转向规模化 Agent 工程。
2. **阿里 Qwen-AgentWorld（6/24 余波）**：首个原生语言世界模型，单一模型覆盖 MCP/Terminal/SWE/Web/OS/Android；同步 AgentWorldBench 评测基准。Qwen3.7-Max 在 Code Arena 全球第四仍被引用。
3. **智谱 GLM-5.2 / 字节 Seed 2.1 无今日更新**：GLM-5.2（6/17 MIT 开源）与 Seed 2.1 Pro（6/23）仍为各自最新版本；编程能力对标 Claude Fable 5 的媒体讨论持续。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.195 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.142.3 |
| DeepSeek API | curl 调用 | ⚠️ 未实测（无 Key） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.195 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.3
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 百度文心/Comate | 2026-06-26 22:00 | 官网/Comate 文档 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-26 22:00 | 官网/CodeBuddy | WorkBuddy 企业版（6/5）仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-06-26 22:00 | 火山方舟/Trae | Seed 2.1（6/23）仍最新 |
| 月之暗面 Kimi | 2026-06-26 22:00 | kimi.moonshot.cn | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-26 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-26 22:00 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-06-26 22:00 | minimax.io | 今日无公开更新 |
| 商汤 | 2026-06-26 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维/天工 | 2026-06-26 22:00 | 天工 AI | 今日无公开更新 |
| 零一万物 | 2026-06-26 22:00 | 01.ai | 今日无公开更新 |
| 面壁智能 | 2026-06-26 22:00 | 面壁官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek — 510 亿融资 + 史上最大规模招聘（6/25–26）

**发生了什么**

DeepSeek 官方公众号 6/25 21:35 推送「寻找闪亮发光的你」，宣布计划将所有部门规模扩大至少一倍。33 个岗位覆盖：

- Agent Harness 团队（杭州）
- Agent Infra 研发工程师
- 通用 Agent 数据产品经理
- AI 搜索算法/架构工程师
- 预训练数据工程师、服务端/前端开发

背景：6/16 左右完成约 **510 亿元**首轮融资，估值近 **4000 亿元**。梁文锋个人出资约 200 亿；腾讯约 100 亿；宁德时代体系约 50 亿。

**对开发者**：Harness 团队招聘意味着 DeepSeek 正构建类似 Claude Code / Codex 的 Agent 执行框架——关注其是否开源。

**来源**：[36氪](https://36kr.com/p/3869415015404551)｜[凤凰网](https://tech.ifeng.com/c/8uGjzPiyNfD)

---

### 阿里通义/百炼 — Qwen-AgentWorld（6/24，仍最新）

**发生了什么**

6/24 发布 Qwen-AgentWorld（Language World Model）：

- 文本环境：MCP、Search、Terminal、SWE
- GUI 环境：Web、OS、Android
- 同步 AgentWorldBench 七大领域评测基准

百炼平台同时接入 DeepSeek-V4-Pro/Flash 系列，API 定价与官网一致。

**对开发者**：可在百炼平台调用 Qwen3.7-Max 作为 Agent 基座；AgentWorldBench 可参考其环境评测设计。

**来源**：[36氪 newsflash](https://36kr.com/newsflashes/3866712419193860)

---

### 智谱 GLM/CodeGeeX — GLM-5.2（6/17，仍最新）

6/17 MIT 开源 GLM-5.2，量子位报道其在开源界 AI 编程排名第一（Claude Fable 5 之下）。支持 1M 上下文。今日无新版本。

**来源**：[量子位](https://www.qbitai.com/2026/06/436085.html)

---

### 字节豆包/Trae/火山方舟 — Seed 2.1（6/23，仍最新）

Seed 2.1 Pro 在 Terminal Bench 2.1 接近 Opus 4.7；18 小时完成芯片 RTL 设计案例。火山方舟 API 全量上线。今日无新版本。

**来源**：[36氪](https://36kr.com/p/3865585237660676)

---

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### 前置条件

- 注册 [DeepSeek 开放平台](https://platform.deepseek.com/)
- 获取 `DEEPSEEK_API_KEY`
- 模型：`deepseek-chat` 或 `deepseek-reasoner`

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
    ],
    stream=False
)

print(response.choices[0].message.content)
```

### 在 OpenCode / Aider 中配置

```json
{
  "provider": "deepseek",
  "api_key": "${DEEPSEEK_API_KEY}",
  "base_url": "https://api.deepseek.com",
  "model": "deepseek-chat"
}
```

### 本地实测状态

⚠️ 未实测（Cloud Agent 环境无 `DEEPSEEK_API_KEY`）。上述 SOP 基于 DeepSeek 官方 API 文档格式，部署前请对照最新文档验证 endpoint 与模型 ID。

---
