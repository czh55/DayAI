# 国内 AI 厂商与编程产品 — 2026-07-04

> 检索时间：2026-07-04T22:00:10Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek V4 正式版倒计时**：7 月中旬上线 + API 峰谷定价（高峰 2×，覆盖 9–12 时、14–18 时北京时间）。非高峰价格与现行预览版一致。DSpark 推理框架已全量部署，单用户生成速度最高 +85%。
2. **智谱 GLM-5.2 被量子位列为 Sonnet 5 性价比替代**：输入价约为 Sonnet 5 七成、输出不足一半——⚠️ 该文观点，今日智谱无新官方发布。
3. **字节豆包专业版三级阶梯价**（68/200/500 元/月）仍为最新产品动态；Trae/火山方舟无 7/4 更新。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 见下方 SOP | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内 CLI 产品 | — | 今日无新版本可测 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-04 22:00 | 通义官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-07-04 22:00 | 千帆、Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-04 22:00 | 混元、CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-04 22:00 | 豆包、Trae | 专业版定价仍最新；无 7/4 新产品 |
| 智谱 GLM/CodeGeeX | 2026-07-04 22:00 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 月之暗面 Kimi | 2026-07-04 22:00 | Kimi 官网 | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-07-04 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-04 22:00 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-07-04 22:00 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-04 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-04 22:00 | 天工 | 今日无公开更新 |
| 零一万物 | 2026-07-04 22:00 | 零一万物 | 今日无公开更新 |
| 面壁智能 | 2026-07-04 22:00 | 面壁智能 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（有动态，非今日新产品）

- **状态**：V4 预览版（4/24）仍运行；正式版 **7 月中旬**上线预告持续有效（6/29 官方通知）。
- **峰谷定价**（正式版后生效）：
  - 高峰：9:00–12:00、14:00–18:00（北京时间），价格为平时 2×
  - V4-Pro 非高峰：缓存命中 0.025 元/百万、未命中 3 元/百万、输出 6 元/百万
  - V4-Flash 非高峰：缓存命中 0.02 元/百万、未命中 1 元/百万、输出 2 元/百万
- **建议**：7 月中旬前将 batch 推理迁移至非高峰；启用 prompt caching 降低未命中成本。

### 智谱 GLM-5.2（媒体关注，无今日更新）

- 量子位 7 月初称 GLM-5.2 性能接近 Sonnet 5、价格更低——开发者可自行对比 [智谱开放平台](https://open.bigmodel.cn/) 定价与 API 延迟。
- 今日无新版本或 changelog。

### 字节豆包（近期动态回顾）

- 豆包专业版三级阶梯：68/200/500 元/月（7/3 前后媒体报道仍最新）。
- Trae IDE、火山方舟 Agent 无 7/4 公开更新。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
export DEEPSEEK_API_KEY="your-api-key"

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
        {"role": "user", "content": "Explain asyncio.gather in Python."}
    ],
)
print(response.choices[0].message.content)
```

### 峰谷调度建议（正式版后）

```python
from datetime import datetime, timezone, timedelta

def is_peak_hour_beijing() -> bool:
    bj = datetime.now(timezone(timedelta(hours=8)))
    h = bj.hour
    return (9 <= h < 12) or (14 <= h < 18)

if is_peak_hour_beijing():
    print("⚠️ 高峰时段，API 费用为平时 2×，建议延迟非紧急任务")
```

> ⚠️ 未实测：本环境无 `DEEPSEEK_API_KEY`，以上 SOP 基于 DeepSeek 开放平台公开文档格式。

---
