# 国内 AI 厂商与编程产品 — 2026-06-28

> 检索时间：2026-06-28T22:00:26Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **AICon 上海（6/26–27）Harness 工程成主旋律**：蚂蚁数科分享「从 AI Coding 到可验收的研发闭环」五层 Harness；大会命题「构建可信赖、可规模化、可商业化的 Agentic 操作系统」与虎嗅/InfoQ Loop 讨论形成呼应。
2. **天工 3.1 Dynamic Workflows 国内同步（量子位 6 月）**：昆仑万维天工上线 Skywork Design + Dynamic Workflows，对标 Claude 5 月 Design / Dynamic Workflows，支持数百子 Agent 并行执行代码库级排查与批量迁移。
3. **DeepSeek Harness 对标 Claude Code 叙事延续**：36氪 5 月报道余波仍在；招聘岗位要求深度使用 Claude Code / Codex / Cursor；社区 DeepSeek-TUI 超 3 万 star 佐证 Harness 价值，官方产品尚未发布。

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
| 百度文心/Comate | 2026-06-28 22:00 | 官网/Comate 文档 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-28 22:00 | 官网/CodeBuddy | WorkBuddy 企业版（6 月大会）仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-06-28 22:00 | 火山方舟/Trae | Seed 2.1（6/23）仍最新 |
| 月之暗面 Kimi | 2026-06-28 22:00 | kimi.moonshot.cn | K2.6 Agent 集群（4 月）仍最新 |
| 讯飞星火/iFlyCode | 2026-06-28 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-28 22:00 | 华为云 | Agentic Infra 叙事延续，无新版本 |
| MiniMax | 2026-06-28 22:00 | minimax.io | 今日无公开更新 |
| 商汤 | 2026-06-28 22:00 | 商汤官网 | 今日无公开更新 |
| 零一万物 | 2026-06-28 22:00 | 01.ai | 今日无公开更新 |
| 面壁智能 | 2026-06-28 22:00 | 面壁官网 | 今日无公开更新 |

## 分厂商详情

### 阿里通义/百炼 — Qwen-AgentWorld（6/24，仍最新）

**发生了什么**

6/24 发布 Qwen-AgentWorld（Language World Model），覆盖 MCP/Terminal/SWE/Web/OS/Android 七大环境；AgentWorldBench 同步发布。Code Arena 千问 3.7-Max 1541 分（5/26 量子位报道）仍被引用为「国产编程第一」。百炼平台接入 DeepSeek-V4 系列。

**对开发者**：可在百炼调用 Qwen3.7-Max 作为 Agent 基座；今日无新版本。

**来源**：[阿里云社区](https://www.alibabacloud.com/blog/qwen-agentworld-language-world-models-for-general-agents_603304)｜[量子位 Code Arena](https://www.qbitai.com/2026/05/425150.html)

---

### 百度文心/Comate — 千帆 Agent Infra（仍最新）

**发生了什么**

百度世界 2025 发布的千帆 Agent Infra（开发服务、工具服务、模型服务、数据服务、运行环境）及「伐谋」自我演化智能体仍为最新公开产品线。6/28 官网与 Comate 文档无新版本公告。

**结论**：今日无公开更新（检索 2026-06-28 22:00 UTC）

---

### 腾讯混元/CodeBuddy — WorkBuddy 企业版（6 月大会，仍最新）

**发生了什么**

2026 腾讯云 AI 产业应用大会发布 WorkBuddy 企业版，定位为「企业 AI 办公统一入口」。CodeBuddy 以 Plugin、IDE、CLI 三形态接入 Admin 后台统一治理；Agent Suite 覆盖 Miora、Ardot、CNB、Onboard 等办公智能体。

**对开发者**：企业用户可关注 WorkBuddy + CodeBuddy 统一治理；今日无新版本。

**来源**：[量子位](https://www.qbitai.com/2026/06/432631.html)

---

### 字节豆包/Trae/火山方舟 — Seed 2.1（6/23，仍最新）

**发生了什么**

Seed 2.1 Pro 于 6/23 发布，Trae 国际版与豆包编程助手无 6/28 新版本。

**结论**：今日无公开更新（检索 2026-06-28 22:00 UTC）

---

### 智谱 GLM/CodeGeeX — GLM-5.2（6/17，仍最新）

**发生了什么**

GLM-5.2 于 6/17 MIT 开源，1M 上下文、长程工程任务能力。量子位报道编程评测「开源第一、全球第二（Fable 5 之下）」。

**结论**：今日无公开更新（检索 2026-06-28 22:00 UTC）

---

### 月之暗面 Kimi — K2.6 Agent 集群（4 月，仍最新）

**发生了什么**

K2.6 于 4 月发布，支持最多 300 子 Agent 并行、4000 协作步骤。量子位报道「Claw 群组」测试中 K2.6 作协调员。

**结论**：今日无公开更新（检索 2026-06-28 22:00 UTC）

---

### DeepSeek — Harness 团队 + V4 优化（叙事延续，无 6/28 新产品）

**发生了什么**

DeepSeek 5 月发布 Agent Harness 产品经理/研发工程师岗位；陈德里确认「对标 Claude Code，做 DeepSeek Code Harness」。V4 系列针对 Claude Code 等主流 Agent 工具优化；识图模式灰度上线弥补架构图识别短板。36氪报道 Harness 负责人崔添翼（前 Jane Street 量化背景）加入。

**对开发者**：关注 Q3 是否发布 DeepSeek Code 公测；当前以 API（deepseek-chat / deepseek-reasoner）+ 开源模型为主。

**来源**：[36氪 Harness](https://www.36kr.com/p/3821376674386305)｜[36氪 智能体产品](https://www.36kr.com/p/3818407956366208)

---

### 昆仑万维/天工 — 天工 3.1（6 月，有更新）

**发生了什么**

天工 3.1 发布 Skywork Design（画布承载 UI 设计）与 Dynamic Workflows（数百子 Agent 并行）。量子位称国内与海外市场同步上线，对标 Claude 4 月中旬 Design + 5 月底 Dynamic Workflows。

**对开发者**：可关注天工 3.1 在代码库级排查、批量迁移场景的并行 Agent 能力。

**来源**：[量子位](https://www.qbitai.com/2026/06/436110.html)

---

### 华为盘古/CodeArts — Agentic Infra（叙事延续）

**发生了什么**

华为云 Agentic Infra 及「智果」平台面向政企私有化部署叙事延续。6/28 无新版本公告。

**结论**：今日无公开更新（检索 2026-06-28 22:00 UTC）

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

### 注意事项

- 模型 ID：`deepseek-chat`（对话）、`deepseek-reasoner`（推理）
- Base URL：`https://api.deepseek.com`（兼容 OpenAI SDK）
- 本地实测：⚠️ 未实测（Cloud Agent 环境无 `DEEPSEEK_API_KEY`）
- 定价：见 [DeepSeek 官网定价页](https://platform.deepseek.com/api-docs/pricing)

---
