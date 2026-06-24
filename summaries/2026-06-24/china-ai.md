# 国内 AI 厂商与编程产品 — 2026-06-24

> 检索时间：2026-06-24T22:02:07Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Claude Tag 引发国内「协作 Agent」讨论**：量子位、36氪 6/24 集中报道 Anthropic Slack 集成；国内尚无对等产品官宣，但腾讯 WorkBuddy（6/5）、字节 TRAE WORK 等方向形成潜在对标。
2. **字节 Seed 2.1 长程 Agent 热度延续**（6/23 发布）：Doubao-Seed-2.1-Pro 在 OpenCode/TRAE 中完成 18 小时芯片 RTL 迭代案例；API 已全量上线火山方舟——今日无新版本，但 secondary 讨论持续。
3. **智谱 GLM-5.2、DeepSeek Harness 招聘信号延续**：均无 6/24 新版本；国产编程 Agent 仍以 API + IDE 插件为主，频道级协作 Agent 空白。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.191 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.142.0 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内厂商 CLI | — | ⚠️ 未实测（无各厂商 API Key） |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-24 22:02 | 通义官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-24 22:02 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-24 22:02 | 混元、CodeBuddy 文档 | WorkBuddy 企业版（6/5）仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-06-24 22:02 | 火山引擎、Trae 官网 | Seed 2.1（6/23）仍最新；今日无新版本 |
| 智谱 GLM/CodeGeeX | 2026-06-24 22:02 | 智谱开放平台、GitHub | GLM-5.2（6/17）仍最新 |
| 月之暗面 Kimi | 2026-06-24 22:02 | Kimi 开放平台 | 今日无公开更新 |
| DeepSeek | 2026-06-24 22:02 | deepseek.com、招聘页 | Harness 招聘持续；无 Code CLI |
| 讯飞星火/iFlyCode | 2026-06-24 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-24 22:02 | 华为云 CodeArts | 今日无公开更新 |
| MiniMax | 2026-06-24 22:02 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-06-24 22:02 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-24 22:02 | 昆仑万维 AI | 今日无公开更新 |
| 零一万物 | 2026-06-24 22:02 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-24 22:02 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 字节豆包/Trae/火山方舟（Seed 2.1 延续，无今日更新）

- **Doubao-Seed-2.1-Pro / Turbo**：6/23 前后发布，API 全量上线火山方舟
- **编程亮点**：16×16 PE Tiny NPU Tile 案例——近 18 小时、9 轮迭代、1303 行 RTL
- **入口**：火山方舟 API、TRAE、TRAE WORK、扣子、豆包专业版
- **开发者建议**：评估 Seed 2.1 Pro 在 Terminal Bench 2.1 与 SciCode 的表现；长程 Agent 任务可对比 Claude Tag 异步执行成本

### 智谱 GLM/CodeGeeX（无今日更新）

- **GLM-5.2**：6/17 MIT 开源，SWE-bench 与中文指令遵循为卖点
- **今日**：无 changelog 或版本发布
- **开发者建议**：中文政企全栈可继续评估；协作 Agent 场景关注 Claude Tag 与 WorkBuddy 动态

### 腾讯混元/CodeBuddy

- **WorkBuddy 企业版**：6/5 发布，面向企业私有化 Agent
- **今日**：无版本更新；与 Claude Tag 形成潜在企业协作 Agent 竞争维度

### DeepSeek（招聘信号，无产品发布）

- **DeepSeek Code**：⚠️ 未发布
- **Harness 团队招聘**：持续，与 OpenAI Harness Engineering 叙事对标
- **开发者建议**：日常编码 API 性价比仍高；关注 Q3 是否发布终端 Agent

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
        {"role": "user", "content": "Refactor this function to use async/await."},
    ],
    stream=False,
)

print(response.choices[0].message.content)
```

### 常见错误排查

| 错误 | 原因 | 解决 |
|------|------|------|
| `401 Unauthorized` | API Key 无效或未设置 | 检查 `DEEPSEEK_API_KEY` 环境变量 |
| `429 Too Many Requests` | 速率限制 | 降低并发或升级套餐 |
| `model not found` | 模型 ID 错误 | 使用 `deepseek-chat` 或 `deepseek-reasoner` |

> ⚠️ 本环境未配置 `DEEPSEEK_API_KEY`，以上 SOP 未经实测推理验证。

---
