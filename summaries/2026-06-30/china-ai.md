# 国内 AI 厂商与编程产品 — 2026-06-30

> 检索时间：2026-06-30T22:01:18Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Anthropic Sonnet 5 发布对国产中端 Agent 定价形成压力**：官方促销价 $2/$10 per Mtok（至 8/31）+ 1M 上下文，直接对标企业日常 Agent 编码场景；智谱 GLM-5.2 此前被量子位称为「开源编程全球第二」，今日需重新评估与 Sonnet 5 的性价比差距。
2. **DeepSeek Harness 团队招聘叙事延续**：36氪/新浪财经此前报道 DeepSeek 组建 Harness 团队对标 Claude Code（DeepSeek Code），模型层已有 V4 能力，**产品层 Harness 仍缺官方发布**——与今日 Claude Code 2.1.197 + Sonnet 5 升级形成对照。
3. **微软内部 Claude Code 今日截止**：不影响国内开发者使用 Claude Code 公开版，但信号是国内企业选型时需考虑 **CLI 工具链锁定风险**（Copilot CLI vs Claude Code vs 自研 Harness）。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` / Python（见下） | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内厂商 CLI | 无统一官方 CLI 对标 Claude Code | — |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-30 22:01 | 官方博客、阿里云新闻 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-30 22:01 | 百度 AI 开放平台 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-30 22:01 | 腾讯云新闻 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-06-30 22:01 | 火山引擎动态 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-06-30 22:01 | 智谱开放平台 | 今日无新版本（GLM-5.2 为 6/17 前后） |
| 月之暗面 Kimi | 2026-06-30 22:01 | Moonshot 平台 | 今日无公开更新 |
| DeepSeek | 2026-06-30 22:01 | deepseek.com / 招聘渠道 | 今日无新产品发布 |
| 讯飞星火/iFlyCode | 2026-06-30 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-30 22:01 | 华为云新闻 | 今日无公开更新 |
| MiniMax | 2026-06-30 22:01 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-06-30 22:01 | 商汤科技新闻 | 今日无公开更新 |
| 昆仑万维 | 2026-06-30 22:01 | 昆仑万维公告 | 今日无公开更新 |
| 零一万物 | 2026-06-30 22:01 | 零一万物动态 | 今日无公开更新 |
| 面壁智能 | 2026-06-30 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 智谱 GLM / CodeGeeX（近期热点，今日无更新）

量子位 6/27 报道 [GLM-5.2 开源编程全球第二](https://www.qbitai.com/2026/06/436085.html)，强调 1M 上下文与长程 Agent 能力。今日轮询智谱开放平台 **无新版本发布**。开发者可通过 GLM Coding Plan 接入 Claude Code、Cline、OpenCode 等第三方工具链——与 Anthropic 今日 Sonnet 5 默认升级形成生态竞争。

### DeepSeek（Harness 筹备中，今日无产品发布）

36氪报道 DeepSeek 招聘 Agent Harness 产品经理/工程师，内部对标 Claude Code。研究员陈德里社交媒体确认「做 DeepSeek Code Harness」。**今日无 DeepSeek Code 产品发布公告**。

### 阿里通义 / 百炼

Qwen-AgentWorld（6/24）仍为最近重大更新。通义灵码 + 百炼 Agent 工具链适合阿里生态内企业；今日无新稿。

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
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "user", "content": "Explain quicksort in Python with doctest."}
    ],
)
print(response.choices[0].message.content)
```

> ⚠️ 本环境未配置 `DEEPSEEK_API_KEY`，上述命令未实测。获取 Key： [DeepSeek 开放平台](https://platform.deepseek.com/)。
