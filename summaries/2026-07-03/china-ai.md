# 国内 AI 厂商与编程产品 — 2026-07-03

> 检索时间：2026-07-03T22:00:11Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek 预告 7 月中旬 API 峰谷定价**：据光大证券 7/3 研报，DeepSeek 6/29 邮件通知开发者 V4 正式版计费调整，高峰时段价格为平时 **2 倍**。对高频 Agent 调用团队，需提前规划 **错峰批处理** 策略。⚠️ 细则以 DeepSeek 官方后续公告为准。
2. **豆包专业版三级阶梯定价上线**：标准版 68 元/月、加强版 200 元/月、高级版 500 元/月（连续包年最高 5088 元）。与既有 **Coding Plan**（兼容 Claude Code/Cursor 等）形成「订阅 + API」双轨，在 Fable 5 分类器争议背景下为国内开发者提供 **可预期成本** 选项。
3. **国产模型仍无新版本，但商业化叙事升温**：DeepSeek 510 亿融资（36氪 7/2）、智谱 GLM-5.2 国产算力适配（6/17）仍为最近技术热点；今日轮询 **无新模型发布**。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` / Python（见下） | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内厂商 CLI | 无统一官方 CLI 对标 Claude Code | — |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-03 22:00 | 官方博客、阿里云新闻 | 今日无公开更新 |
| 百度文心/Comate | 2026-07-03 22:00 | 百度 AI 开放平台 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-03 22:00 | 腾讯云新闻 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-03 22:00 | 火山引擎动态 | **定价更新**（专业版阶梯价）；模型无新版本 |
| 智谱 GLM/CodeGeeX | 2026-07-03 22:00 | 智谱开放平台 | 今日无新版本 |
| 月之暗面 Kimi | 2026-07-03 22:00 | Moonshot 平台 | 今日无公开更新 |
| DeepSeek | 2026-07-03 22:00 | deepseek.com | **峰谷定价预告**；无新产品发布 |
| 讯飞星火/iFlyCode | 2026-07-03 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-03 22:00 | 华为云新闻 | 今日无公开更新 |
| MiniMax | 2026-07-03 22:00 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-03 22:00 | 商汤科技新闻 | 今日无公开更新 |
| 昆仑万维 | 2026-07-03 22:00 | 昆仑万维公告 | 今日无公开更新 |
| 零一万物 | 2026-07-03 22:00 | 零一万物动态 | 今日无公开更新 |
| 面壁智能 | 2026-07-03 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（峰谷定价预告，无新产品）

36氪 7/2 报道 DeepSeek 完成 510 亿元融资，估值近 4000 亿元，商业化转型加速。6/29 邮件宣布 V4 正式版，**API 预计 7 月中旬起峰谷定价**（高峰 2×）。DSpark 推理加速框架论文（6/27 GitHub 更新）为工程层热点。Harness 对标 Claude Code 的招聘叙事延续，**今日无 CLI 产品发布**。

### 字节豆包 / Trae / 火山方舟（定价更新）

豆包 2.1 Pro 模型仍为 6/23 版本。今日媒体报道 **豆包专业版** 三级订阅价上线。Coding Plan 仍支持将豆包 API 接入 Claude Code、Cursor、Cline、Codex CLI 等 Agent 环境——在 Anthropic Fable 5 误拦争议下，开发者可 **只换底层模型、不改工作流**，但需自行评估代码质量是否满足项目要求。

### 智谱 GLM / CodeGeeX（无更新）

GLM-5.2（6/27 开源）在 Code Arena 等 benchmark 叙事仍强。量子位 7 月稿提及部分开发者认为 GLM-5.2 性价比优于 Sonnet 5——**该文观点，非官方确认**。GLM Coding Plan 可接入第三方 Agent 工具链。今日轮询 **无新版本**。

### 阿里通义 / 百炼

Qwen-AgentWorld（6/24）仍为最近重大更新。今日无新稿。

### 百度文心 / Comate

千帆 Agent Infra 叙事延续。今日无新版本。

### 腾讯混元 / CodeBuddy

WorkBuddy 企业版仍最新。今日无公开更新。

### 月之暗面 Kimi

Kimi K2.7 仍最新。今日无公开更新。

### 讯飞星火 / iFlyCode、华为盘古 / CodeArts、MiniMax、商汤、昆仑万维、零一万物、面壁智能

今日轮询均无公开更新（检索 2026-07-03 22:00 UTC）。

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
import requests

API_KEY = os.environ.get("DEEPSEEK_API_KEY", "your-api-key-here")
url = "https://api.deepseek.com/chat/completions"

payload = {
    "model": "deepseek-chat",
    "messages": [
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Refactor this function to use type hints."},
    ],
    "stream": False,
}

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}",
}

response = requests.post(url, json=payload, headers=headers, timeout=60)
response.raise_for_status()
print(response.json()["choices"][0]["message"]["content"])
```

### 峰谷定价准备（7 月中旬预期）

```python
# ⚠️ 伪代码示例：待官方公布时段后替换 PEAK_HOURS
from datetime import datetime, timezone

def is_peak_hour(now: datetime) -> bool:
  # 官方细则未公布；以下为占位逻辑
  hour_utc = now.astimezone(timezone.utc).hour
  return 13 <= hour_utc <= 21  # 示例：UTC 13-21 视为高峰

def choose_model_for_task(task_priority: str) -> str:
  if task_priority == "batch" and not is_peak_hour(datetime.now(timezone.utc)):
    return "deepseek-chat"  # 低谷批处理
  return "deepseek-chat"
```

### 实测状态

| 项 | 结果 |
|----|------|
| curl 调用 | ⚠️ 未实测（无 API Key） |
| 峰谷定价 | ⚠️ 官方细则未公布，仅研报转述 |
