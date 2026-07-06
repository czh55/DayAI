# 国内 AI 厂商与编程产品 — 2026-07-06

> 检索时间：2026-07-06T22:00:58Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek API 旧模型名 7/24 停用倒计时 18 天**：`deepseek-chat` → `deepseek-v4-flash`（非思考）；`deepseek-reasoner` → `deepseek-v4-flash`（思考模式）或 `deepseek-v4-pro`（复杂 Agent）。base_url 不变，仅改 `model` 参数。
2. **DeepSeek V4 正式版 7 月中旬预告仍有效**：峰谷定价（高峰 9–12/14–18 时北京时间 2×）将在正式版后生效；预览版 API 价格暂不变。
3. **智谱 GLM-5.2 仍被量子位列为 Sonnet 5 性价比替代**——⚠️ 该文观点，今日智谱无新官方发布。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 见下方 SOP | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内 CLI 产品 | — | 今日无新版本可测 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-06 22:00 | 通义官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-07-06 22:00 | 千帆、Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-06 22:00 | 混元、CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-06 22:00 | 豆包、Trae | 专业版定价仍最新；无 7/6 新产品 |
| 智谱 GLM/CodeGeeX | 2026-07-06 22:00 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 月之暗面 Kimi | 2026-07-06 22:00 | Kimi 官网 | 今日无公开更新 |
| DeepSeek | 2026-07-06 22:00 | DeepSeek 官网、API 文档 | V4 预览版运行中；7/24 旧名停用；正式版 7 月中旬 |
| 讯飞星火/iFlyCode | 2026-07-06 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-06 22:00 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-07-06 22:00 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-06 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-06 22:00 | 天工 | 今日无公开更新 |
| 零一万物 | 2026-07-06 22:00 | 零一万物 | 今日无公开更新 |
| 面壁智能 | 2026-07-06 22:00 | 面壁智能 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（有动态，非今日新产品）

- **API 迁移截止**：北京时间 **2026/07/24 23:59**，`deepseek-chat` 与 `deepseek-reasoner` 弃用。
- **映射关系**（官方 [定价页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)）：
  - `deepseek-chat` → `deepseek-v4-flash`（非思考模式）
  - `deepseek-reasoner` → `deepseek-v4-flash`（思考模式）或 `deepseek-v4-pro`（复杂 Agent，`reasoning_effort: max`）
- **正式版时间**：7 月中旬（6/29 官方通知仍有效）；峰谷定价正式版后生效。
- **建议**：本周内完成生产环境 `model` 参数迁移与回归测试；batch 任务规划至非高峰时段。

### 智谱 GLM-5.2（媒体关注，无今日更新）

- 量子位称 GLM-5.2 性能接近 Sonnet 5、价格更低——开发者可自行对比 [智谱开放平台](https://open.bigmodel.cn/) 定价。
- 今日无新版本或 changelog。

### 字节豆包（近期动态回顾）

- 豆包专业版三级阶梯：68/200/500 元/月（7/3 前后媒体报道仍最新）。
- Trae IDE、火山方舟 Agent 无 7/6 公开更新。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例（V4-Flash，推荐迁移目标）

```bash
export DEEPSEEK_API_KEY="your-api-key"

curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "system", "content": "You are a helpful coding assistant."},
      {"role": "user", "content": "Write a Python function to merge two sorted lists."}
    ],
    "stream": false
  }'
```

### curl 示例（V4-Pro 思考模式，复杂 Agent）

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [
      {"role": "user", "content": "Refactor this module to use async/await."}
    ],
    "thinking": {"type": "enabled", "reasoning_effort": "max"}
  }'
```

### Python 示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Explain Python decorators with an example."},
    ],
)
print(response.choices[0].message.content)
```

### 迁移检查清单（7/24 前完成）

1. 全局搜索代码库中 `deepseek-chat` / `deepseek-reasoner` 字符串
2. 按上表映射替换 `model` 参数
3. 对 Agent 场景评估是否升级至 `deepseek-v4-pro` + `reasoning_effort: max`
4. 在 staging 环境跑一轮回归测试
5. 监控 7 月中旬正式版峰谷定价公告

---
