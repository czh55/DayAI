# 国内 AI 厂商与编程产品 — 2026-07-25

> 检索时间：2026-07-25T22:02:00Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Kimi K3 权重开源倒计时 2 天**：月之暗面承诺 7/27 前开放完整权重（Modified MIT），Hugging Face 已设倒计时；编码 API 持续限流，开发者可先用 `https://api.kimi.com/coding/` 接入 Claude Code / Cursor。
2. **DeepSeek 旧 API 名退役第 2 日**：`deepseek-chat` / `deepseek-reasoner` 已于 7/24 15:59 UTC 停用，须迁移至 `deepseek-v4-flash` / `deepseek-v4-pro`。
3. **黄仁勋首推开放权重**：7/25 国内媒体集中报道英伟达 CEO 首条 X 推文力挺 Kimi K3 与开放权重路线，硅谷「开源 vs 闭源」争议升温。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 调用 | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| Kimi API | `curl` 调用 | ⚠️ 未实测（无 `MOONSHOT_API_KEY`） |
| 通义/百炼 | — | 今日无新版本，未实测 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-25 22:02 | 通义官网、百炼控制台 | 今日无公开更新；办公 Claude 禁令仍有效 |
| 百度文心/Comate | 2026-07-25 22:02 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-25 22:02 | 混元、CodeBuddy 发布页 | CodeBuddy v2.103.0 仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-07-25 22:02 | 豆包、TRAE、火山方舟 | TRAE 2.0 SOLO 仍最新（7/21 发布） |
| 智谱 GLM/CodeGeeX | 2026-07-25 22:02 | 智谱开放平台、CodeGeeX | GLM-5.2（6/27）仍最新 |
| 讯飞星火/iFlyCode | 2026-07-25 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-25 22:02 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-25 22:02 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-25 22:02 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-25 22:02 | 昆仑万维、天工 | 今日无公开更新 |
| 零一万物 | 2026-07-25 22:02 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-25 22:02 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 月之暗面 Kimi（有更新观察）

- **Kimi K3**：7/16 发布，2.8T 参数，1M context，编程榜登顶；完整权重 **7/27** 开放
- **Kimi Code**：支持 Anthropic 兼容接口，Base URL `https://api.kimi.com/coding/`
- **限流状态**：7/25 媒体报道编码套餐售罄、网页端限流

### DeepSeek（迁移期）

- **旧名已退役**：`deepseek-chat` → `deepseek-v4-flash`；`deepseek-reasoner` → `deepseek-v4-pro`
- **退役时间**：2026-07-24 15:59 UTC（官方确认）

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
# 设置 API Key
export DEEPSEEK_API_KEY="your-api-key"

# 使用新模型名 deepseek-v4-flash（原 deepseek-chat）
curl https://api.deepseek.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "用 Python 写快速排序"}],
    "max_tokens": 1024
  }'

# 推理模型 deepseek-v4-pro（原 deepseek-reasoner）
curl https://api.deepseek.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{"role": "user", "content": "分析这段代码的时间复杂度"}],
    "max_tokens": 4096
  }'
```

### Python 示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.deepseek.com"
)

# 日常对话 / 编码
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "解释 React useEffect 依赖数组"}],
    max_tokens=1024
)
print(response.choices[0].message.content)

# 复杂推理
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "设计一个分布式缓存一致性方案"}],
    max_tokens=4096
)
print(response.choices[0].message.content)
```

> ⚠️ 本地未实测：Cloud Agent 环境无 `DEEPSEEK_API_KEY`。迁移后请检查 `thinking` 等参数是否与旧版行为一致。

### Kimi K3 API 示例（Anthropic 兼容）

```bash
curl https://api.kimi.com/coding/v1/messages \
  -H "x-api-key: $MOONSHOT_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "kimi-k3",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```
