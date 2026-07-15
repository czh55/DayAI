# 国内 AI 厂商与编程产品 — 2026-07-15

> 检索时间：2026-07-15T22:01:35Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek API 旧模型名弃用倒计时 9 天**：`deepseek-chat` 与 `deepseek-reasoner` 将于北京时间 **2026-07-24 23:59** 完全停用，请求将直接报错而非自动重定向。需迁移至 `deepseek-v4-flash` 或 `deepseek-v4-pro`，思考模式改为请求参数控制。

2. **阿里 Claude 禁令第 6 日持续**：办公环境 Claude 全系（含 Claude Code）仍禁用，内部推荐 Qoder 作为替代。通义/百炼模型今日无新版本发布。

3. **腾讯 CodeBuddy Code v2.103.0 仍为最近更新**：今日无新版本；阿里禁令背景下 CodeBuddy 作为国产替代的讨论热度延续。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.210 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.144.4 |
| DeepSeek API | curl 调用 | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.210 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.4
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-15 22:01 | 通义官网、百炼控制台 | 禁令第 6 日持续；模型无新版本 |
| 百度文心/Comate | 2026-07-15 22:01 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-15 22:01 | CodeBuddy 发布页 | v2.103.0 仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-07-15 22:01 | 豆包、Trae、方舟文档 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-07-15 22:01 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 月之暗面 Kimi | 2026-07-15 22:01 | Kimi 官网、开放平台 | K2.7 Code 7/7 后无更新 |
| 讯飞星火/iFlyCode | 2026-07-15 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-15 22:01 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-15 22:01 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-15 22:01 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-15 22:01 | 天工 AI | 今日无公开更新 |
| 零一万物 | 2026-07-15 22:01 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-15 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（有更新 — 弃用倒计时）

**状态**：V4 预览版（`deepseek-v4-flash` / `deepseek-v4-pro`）已上线；旧名 `deepseek-chat` / `deepseek-reasoner` 倒计时 **9 天**。

**官方来源**：[DeepSeek API 文档](https://api-docs.deepseek.com/zh-cn/)｜[V4 预览版公告](https://api-docs.deepseek.com/zh-cn/news/news260424)

**迁移要点**：
- `deepseek-chat` → `deepseek-v4-flash`（thinking disabled）
- `deepseek-reasoner` → `deepseek-v4-flash` + `thinking: {type: "enabled"}`
- `base_url` 保持 `https://api.deepseek.com` 不变

### 阿里通义/百炼（禁令持续）

**状态**：第 6 日办公环境 Claude 全系禁用（含 Claude Code CLI），推荐 Qoder。

**开发者建议**：阿里员工及合作方须使用 Qoder 或通义灵码；外部开发者不受影响但需关注供应链合规风险。

### 腾讯 CodeBuddy（无更新）

**状态**：CodeBuddy Code **v2.103.0** 仍为最近版本，今日无新发布。

**背景**：阿里禁令后 CodeBuddy 作为国产 Claude Code 替代的讨论热度延续，但无官方借势营销稿。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
# 非思考模式（替代原 deepseek-chat）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "system", "content": "You are a helpful coding assistant."},
      {"role": "user", "content": "Write a Python function to merge two sorted lists."}
    ],
    "thinking": {"type": "disabled"},
    "stream": false
  }'

# 思考模式（替代原 deepseek-reasoner）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "user", "content": "Design a rate limiter for an API gateway."}
    ],
    "thinking": {"type": "enabled"},
    "reasoning_effort": "high",
    "stream": false
  }'
```

### Python 示例（OpenAI SDK）

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com"
)

# 非思考模式
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "user", "content": "Refactor this function to use async/await."}
    ],
    extra_body={"thinking": {"type": "disabled"}}
)
print(response.choices[0].message.content)

# 思考模式
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "user", "content": "Design a distributed cache invalidation strategy."}
    ],
    extra_body={"thinking": {"type": "enabled"}, "reasoning_effort": "high"}
)
print(response.choices[0].message.content)
```

### Claude Code 接入 DeepSeek

```json
// ~/.claude/settings.json 或通过 ANTHROPIC_BASE_URL 覆盖
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_API_KEY": "YOUR_DEEPSEEK_API_KEY"
  }
}
```

⚠️ 本地未实测（无 `DEEPSEEK_API_KEY`）。建议在 7/24 前完成代码库全局搜索 `deepseek-chat` 和 `deepseek-reasoner` 并替换。

---
