# 国内 AI 厂商与编程产品 — 2026-07-01

> 检索时间：2026-07-01T22:01:07Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Anthropic Sonnet 5 + Fable 5 恢复对国产 Coding Plan 形成双向压力**：Sonnet 5 促销价与 1M 上下文拉低闭源 Agent 门槛；同时 Fable 5 回归使极限任务仍有闭源选项。字节豆包 2.1 Pro（6/23）与智谱 GLM-5.2（6/17 前后）继续以 **兼容 Claude Code/Cursor + 低价 API** 争夺切量。
2. **36氪 7/1 豆包稿揭示国内 Agent 商业模式共性**：订阅 Plan 有月度上限，高强度 Agent 场景 API 成本可达订阅数十倍；智谱 Coding Plan 曾限量——国内厂商与 Anthropic 同样面临 **Token 经济学** 约束。
3. **DeepSeek Harness 仍无官方产品**：招聘对标 Claude Code 叙事延续，今日无 DeepSeek Code 发布公告；与 Claude Code 2.1.198 + Fable 5 恢复形成产品层差距。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` / Python（见下） | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内厂商 CLI | 无统一官方 CLI 对标 Claude Code | — |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-01 22:01 | 官方博客、阿里云新闻 | 今日无公开更新 |
| 百度文心/Comate | 2026-07-01 22:01 | 百度 AI 开放平台 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-01 22:01 | 腾讯云新闻 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-01 22:01 | 火山引擎动态 | 今日无新版本（豆包 2.1 Pro 为 6/23） |
| 智谱 GLM/CodeGeeX | 2026-07-01 22:01 | 智谱开放平台 | 今日无新版本 |
| 月之暗面 Kimi | 2026-07-01 22:01 | Moonshot 平台 | 今日无公开更新 |
| DeepSeek | 2026-07-01 22:01 | deepseek.com | 今日无新产品发布 |
| 讯飞星火/iFlyCode | 2026-07-01 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-01 22:01 | 华为云新闻 | 今日无公开更新 |
| MiniMax | 2026-07-01 22:01 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-01 22:01 | 商汤科技新闻 | 今日无公开更新 |
| 昆仑万维 | 2026-07-01 22:01 | 昆仑万维公告 | 今日无公开更新 |
| 零一万物 | 2026-07-01 22:01 | 零一万物动态 | 今日无公开更新 |
| 面壁智能 | 2026-07-01 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 字节豆包 / Trae / 火山方舟（近期热点，今日无新版本）

36氪 7/1 报道 [豆包，开始学智谱](https://36kr.com/p/3876369894633479)：豆包 2.1 Pro（6/23 发布）强化 Coding 与 Agent，官方称多项测试接近 GPT-5.5 / Claude Opus 4.7。**Coding Plan** 支持 Claude Code、Cursor、Cline、Codex CLI 等主流环境——开发者可只换底层模型不改工作流。定价：API 输入约 $0.3/百万 token 档（报道引用），高强度场景成本仍显著高于个人订阅上限。

### 智谱 GLM / CodeGeeX（近期热点，今日无更新）

量子位 6/27 [GLM-5.2 开源编程全球第二](https://www.qbitai.com/2026/06/436085.html) 仍为最强叙事。GLM Coding Plan 可接入第三方 Agent 工具链。今日轮询 **无新版本**。

### DeepSeek（Harness 筹备中）

36氪此前报道 Harness 团队招聘对标 Claude Code。**今日无产品发布**。与今日 Fable 5 恢复、Sonnet 5 默认升级对照，国产 Harness 产品层仍空白。

### 阿里通义 / 百炼

Qwen-AgentWorld（6/24）仍为最近重大更新。今日无新稿。

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
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Refactor this function to use type hints."},
    ],
)
print(response.choices[0].message.content)
```

> ⚠️ 未实测：云 Agent 环境无 `DEEPSEEK_API_KEY`。获取 Key： https://platform.deepseek.com/
