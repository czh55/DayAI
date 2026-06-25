# 国内 AI 厂商与编程产品 — 2026-06-25

> 检索时间：2026-06-25T22:02:49Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek Harness 招聘信号延续**：官方 JD 要求深度使用 Claude Code、Codex、Cursor 等对标产品；量化背景负责人崔添翼牵头，「Model + Harness = Agent」公式持续出现在招聘页——今日无产品发布。
2. **字节 Seed 2.1 长程 Agent 热度延续**（6/23 发布）：量子位等 secondary 讨论持续；火山方舟 API 已全量上线——今日无新版本。
3. **媒体「AI 孤独感」叙事**：Fiona Fung 访谈（6/25）引发对 TRAE、Comate 等国产工具「人机协作设计」的关注——各厂商今日均无回应或新版本。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.193 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.142.2 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内厂商 CLI | — | ⚠️ 未实测（无各厂商 API Key） |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-25 22:02 | 通义官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-25 22:02 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-25 22:02 | 混元、CodeBuddy 文档 | WorkBuddy 企业版（6/5）仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-06-25 22:02 | 火山引擎、Trae 官网 | Seed 2.1（6/23）仍最新 |
| 智谱 GLM/CodeGeeX | 2026-06-25 22:02 | 智谱开放平台、GitHub | GLM-5.2（6/17）仍最新 |
| 月之暗面 Kimi | 2026-06-25 22:02 | Kimi 开放平台 | 今日无公开更新 |
| DeepSeek | 2026-06-25 22:02 | deepseek.com、招聘页 | Harness 招聘持续；无 Code CLI |
| 讯飞星火/iFlyCode | 2026-06-25 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-25 22:02 | 华为云 CodeArts | 今日无公开更新 |
| MiniMax | 2026-06-25 22:02 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-06-25 22:02 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-25 22:02 | 昆仑万维 AI | 今日无公开更新 |
| 零一万物 | 2026-06-25 22:02 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-25 22:02 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（Harness 招聘，无产品发布）

- **DeepSeek Code / Harness**：⚠️ 未发布；招聘页持续要求候选人深度使用 Claude Code、Codex、Cursor、OpenCode 等
- **负责人**：崔添翼（前 Jane Street / TSY Capital 量化背景）牵头 Harness 团队
- **战略信号**：36氪/PANews 分析——DeepSeek 500 亿融资后补足「Model + Harness = Agent」执行层，对标 Claude Code
- **开发者建议**：日常编码 API 性价比仍高；关注 Q3 是否发布终端 Agent；国内 Claude Code 访问限制为国产 Harness 留出替代窗口

### 字节豆包/Trae/火山方舟（Seed 2.1 延续）

- **Doubao-Seed-2.1-Pro / Turbo**：6/23 发布，今日无更新
- **编程亮点**：18 小时芯片 RTL 迭代、Terminal Bench 2.1 与 Opus 4.7 持平（量子位 secondary）
- **入口**：火山方舟 API、TRAE、TRAE WORK、扣子
- **开发者建议**：长程 Agent 任务可评估 Seed 2.1 Pro API 成本 vs Claude Tag/Codex Remote 异步方案

### 智谱 GLM/CodeGeeX（无今日更新）

- **GLM-5.2**：6/17 MIT 开源，SWE-bench 与 Design Arena 表现受量子位关注
- **Coding Plan**：接入 Claude Code、Cline、OpenCode 等第三方工具
- **今日**：无 changelog

### 腾讯混元/CodeBuddy

- **WorkBuddy 企业版**：6/5 发布
- **今日**：无版本更新；与 Claude Tag 形成企业协作 Agent 潜在竞争

### 百度文心/Comate

- **InfoQ 6/11**：牛万鹏分享 Comate Feedback Loop、复杂度路由、Benchmark 方法论
- **今日**：无公开版本发布

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
        {"role": "user", "content": "Refactor this function to use type hints:\ndef add(a, b): return a + b"}
    ],
    stream=False
)

print(response.choices[0].message.content)
```

### 常见错误排查

| 错误 | 原因 | 解决 |
|------|------|------|
| `401 Unauthorized` | API Key 无效或未设置 | 检查 `DEEPSEEK_API_KEY` 环境变量 |
| `429 Too Many Requests` | 速率限制 | 降低并发或升级套餐 |
| `model not found` | 模型 ID 错误 | 使用 `deepseek-chat` 或 `deepseek-reasoner` |

**实测状态**：⚠️ 未实测（Cloud Agent 环境无 `DEEPSEEK_API_KEY`）
