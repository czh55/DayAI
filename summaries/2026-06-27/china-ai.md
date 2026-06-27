# 国内 AI 厂商与编程产品 — 2026-06-27

> 检索时间：2026-06-27T22:01:50Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek 扩招余波与组织挑战（6/26 36氪）**：6/25 官宣史上最大规模招聘后，媒体聚焦「大扩军之后怎么走」——从精干研究小队转向平台型组织，Harness/Code Agent 仍是核心方向，但 API 稳定性、交付一致性、组织厚度成为新考题。
2. **智谱 GLM-5.2 编程能力获持续关注**：6/17 MIT 开源后，量子位等媒体报道其在编程评测中「Fable 5 之下全球第二、开源第一」；1M 上下文与 Design Arena 品味第一被反复引用。
3. **阿里 Qwen-AgentWorld（6/24 仍最新）**：首个原生语言世界模型，覆盖 MCP/Terminal/SWE/Web/OS/Android 七大环境；AgentWorldBench 同步发布。百炼平台接入 DeepSeek-V4 系列。

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
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 百度文心/Comate | 2026-06-27 22:01 | 官网/Comate 文档 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-27 22:01 | 官网/CodeBuddy | WorkBuddy 企业版（6/5）仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-06-27 22:01 | 火山方舟/Trae | Seed 2.1（6/23）仍最新 |
| 月之暗面 Kimi | 2026-06-27 22:01 | kimi.moonshot.cn | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-27 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-27 22:01 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-06-27 22:01 | minimax.io | 今日无公开更新 |
| 商汤 | 2026-06-27 22:01 | 商汤官网 | 今日无公开更新 |
| 昆仑万维/天工 | 2026-06-27 22:01 | 天工 AI | 今日无公开更新 |
| 零一万物 | 2026-06-27 22:01 | 01.ai | 今日无公开更新 |
| 面壁智能 | 2026-06-27 22:01 | 面壁官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek — 扩招余波 + Harness 方向（6/25–26 官宣，6/26 媒体解读）

**发生了什么**

DeepSeek 6/25 官方公众号推送「寻找闪亮发光的你」，计划所有部门规模扩大至少一倍，覆盖 7 大类 33 岗位。36氪 6/26「大扩军之后，DeepSeek 怎么走」解读：扩招是融资后「组织补课」，但也带来平台化挑战——API 响应速度、稳定性、企业接入可用性、国产算力适配后的成本优势能否兑现。

Harness 方向不变：陈德里社交发文确认「对标 Claude Code，做 DeepSeek Code Harness」；招聘岗位要求深度使用 Claude Code、Codex、Cursor 等产品。

**对开发者**：关注 DeepSeek 是否在 Q3 发布可公测 Code Agent；当前仍以 API + 开源模型为主。

**来源**：[36氪 6/26](https://www.36kr.com/p/3869871238068864)｜[36氪 5/25 Harness](https://36kr.com/p/3824544793628801)

---

### 阿里通义/百炼 — Qwen-AgentWorld（6/24，仍最新）

**发生了什么**

6/24 发布 Qwen-AgentWorld（Language World Model）：

- 文本环境：MCP、Search、Terminal、SWE
- GUI 环境：Web、OS、Android
- 参数规模：35B-A3B、397B-A17B
- 同步 AgentWorldBench 七大领域评测

百炼平台接入 DeepSeek-V4-Pro/Flash 系列，API 定价与官网一致。

**对开发者**：可在百炼调用 Qwen3.7-Max 作为 Agent 基座；AgentWorld 可作为环境模拟器用于 Agent RL 训练。

**来源**：[阿里云社区](https://www.alibabacloud.com/blog/qwen-agentworld-language-world-models-for-general-agents_603304)｜[GitHub](https://github.com/QwenLM/Qwen-AgentWorld)

---

### 智谱 GLM/CodeGeeX — GLM-5.2（6/17 仍最新）

**发生了什么**

GLM-5.2 于 6/17 MIT 开源，量子位 6 月报道其在编程评测中取得开源界第一、全球第二（仅次于 Claude Fable 5）。核心能力：1M 上下文、长程工程任务自主推进、Design Arena 品味第一。

**对开发者**：可关注 GLM-5.2 + 开源 Harness（如 OpenCode、Aider）组合；CodeGeeX 插件是否同步升级待观察。

**来源**：[量子位](https://www.qbitai.com/2026/06/436085.html)｜[智谱 GitHub](https://github.com/THUDM/GLM-5)

---

### 字节豆包/Trae/火山方舟 — Seed 2.1（6/23 仍最新）

**发生了什么**

Seed 2.1 Pro 于 6/23 发布，Trae 国际版与豆包编程助手无 6/27 新版本。

**结论**：今日无公开更新（检索 2026-06-27 22:01 UTC）

---

### 腾讯混元/CodeBuddy — WorkBuddy 企业版（6/5 仍最新）

**发生了什么**

WorkBuddy 企业版 6/5 发布，支持企业级 Agent 工作流。6/27 无新版本。

**结论**：今日无公开更新（检索 2026-06-27 22:01 UTC）

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
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Explain quicksort in Python with code."},
    ],
    stream=False,
)

print(response.choices[0].message.content)
```

### 本地实测状态

| 项 | 结果 |
|----|------|
| API 调用 | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 端点可达性 | ✅ `api.deepseek.com` 公网可解析 |
| 模型 ID | `deepseek-chat` / `deepseek-reasoner`（以官方文档为准） |

**获取 Key**：https://platform.deepseek.com/api_keys
