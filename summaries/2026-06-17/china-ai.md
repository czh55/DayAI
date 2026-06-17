# 国内 AI 厂商与编程产品 — 2026-06-17

> 检索时间：2026-06-17T22:02:23Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **智谱 GLM-5.2 编程能力获媒体集中报道**：6/14 发布 GLM-5.2 并同步 ZCode 3.0.0（新用户可免费使用 GLM-5.2）；6/16 量子位称其在开源编程榜位列全球第二，与 Claude Code、Codex 构成开发者三路选择。

2. **DeepSeek 官方编程 Agent 仍未发布**：Harness 团队招聘（崔添翼挂帅）持续；社区 **DeepSeek-TUI**（Rust 终端 Agent，兼容 MCP/子 Agent）保持高 Stars，可作为过渡体验。

3. **头部 IDE 厂商（通义灵码/CodeBuddy/Trae/文心快码）今日无公开版本更新**；AI 编程竞争焦点已转向 Harness/Loop 长程编排，而非单点 IDE 功能。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` / Python | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 智谱 API | — | ⚠️ 未实测（无 Key） |
| DeepSeek-TUI | — | ⚠️ 未安装实测 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼/灵码 | 2026-06-17 22:02 | 通义官网、阿里云新闻 | 今日无公开更新 |
| 百度文心/Comate/快码 | 2026-06-17 22:02 | 百度 AI 开放平台 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-17 22:02 | 腾讯云、微信开放社区 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-06-17 22:02 | Trae 官网、火山引擎 | 今日无公开更新 |
| 月之暗面 Kimi | 2026-06-17 22:02 | Kimi 官网 | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-17 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-17 22:02 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-06-17 22:02 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-06-17 22:02 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-17 22:02 | 昆仑万维官网 | 今日无公开更新 |
| 零一万物 | 2026-06-17 22:02 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-17 22:02 | 面壁官网 | 今日无公开更新 |

## 分厂商详情

### 智谱 GLM / ZCode / CodeGeeX（有近期更新）

- **6/14**：发布 **GLM-5.2**，ZCode 3.0.0 新用户可免费使用 GLM-5.2（来源：B站 AI 早报 2026-06-14）。
- **6/16**：量子位报道 GLM-5.2 在编程评测中开源第一、全球第二，支持 1M 上下文长程任务。
- **今日 6/17**：无新版本公告；GLM-5.2 仍为最新公开模型。
- **开发者建议**：可在 Claude Code 中配置 `ANTHROPIC_BASE_URL` 指向智谱兼容端点试用长程 Agent（需自行验证兼容性）；或使用 ZCode IDE。

### DeepSeek（招聘持续，产品未发）

- Harness 团队负责人崔添翼招聘要求深度使用过 Claude Code、Codex、Cursor 等产品。
- 社区 **DeepSeek-TUI** 提供类 Claude Code 终端体验，针对 DeepSeek API 优化。
- **今日无官方编程 Agent 发布公告**。

### 其余厂商

合并见上表「今日轮询无更新」。

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
        {"role": "user", "content": "Explain quicksort in 3 sentences."},
    ],
)
print(response.choices[0].message.content)
```

### 与 Claude Code 联用（社区方案）

```bash
export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
export ANTHROPIC_AUTH_TOKEN="$DEEPSEEK_API_KEY"
export ANTHROPIC_MODEL="deepseek-chat"
claude
```

> ⚠️ 上述兼容端点需以 DeepSeek 官方文档为准；本环境未实测。

---
