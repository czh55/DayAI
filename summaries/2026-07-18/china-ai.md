# 国内 AI 厂商与编程产品 — 2026-07-18

> 检索时间：2026-07-18T22:01:33Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Kimi K3 发布次日持续发酵**：2.8 万亿参数、Arena 前端榜第一；官方承认整体仍落后于 Fable 5 / GPT-5.6 Sol；7/27 全面开源权重。Kimi Code CLI 与 Kimi API（`kimi-k3`）已可用。

2. **DeepSeek API 旧模型名弃用倒计时 6 天**：`deepseek-chat` 与 `deepseek-reasoner` 将于北京时间 **2026-07-24 23:59** 完全停用。需迁移至 `deepseek-v4-flash` 或 `deepseek-v4-pro`。

3. **Trae 2.0 官宣 7/21 发布 SOLO 模式**：字节跳动 AI 编程 IDE 将上线上下文工程驱动的端到端交付模式，与 Claude Loop Engineering 形成国内对标。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.214 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.144.6 |
| DeepSeek API | curl 调用 | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.214 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.6
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-18 22:01 | 通义官网、百炼控制台 | 禁令第 9 日持续；模型无新版本 |
| 百度文心/Comate | 2026-07-18 22:01 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-18 22:01 | CodeBuddy 发布页 | v2.103.0 仍最新 |
| 智谱 GLM/CodeGeeX | 2026-07-18 22:01 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 讯飞星火/iFlyCode | 2026-07-18 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-18 22:01 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-18 22:01 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-18 22:01 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-18 22:01 | 天工 AI | 今日无公开更新 |
| 零一万物 | 2026-07-18 22:01 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-18 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 月之暗面 Kimi（有更新 — K3 发布次日）

**状态**：Kimi K3 于 7/17 发布，今日为发布次日；7/27 全面开源权重并发布技术报告。

**官方来源**：[Kimi K3 技术博客](https://www.kimi.com/zh-cn/blog/kimi-k3)｜[Kimi API 文档](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)

**要点**：
- 2.8T 参数、1M 上下文、KDA 混合线性注意力 + Attention Residuals
- Arena.ai 前端代码榜第一；官方承认整体仍落后于 Fable 5 / GPT-5.6 Sol
- Kimi Code CLI：`/model kimi-k3` 切换；Kimi Work 桌面端支持本地文件操控
- API 定价：输入 2 元/MTok（缓存命中）/ 20 元（未命中），输出 100 元/MTok

### DeepSeek（有更新 — 弃用倒计时 6 天）

**状态**：V4 预览版运行中；旧名倒计时 **6 天**（7/24 23:59 北京时间）。

**官方来源**：[DeepSeek API Docs](https://api-docs.deepseek.com/guides/reasoning_model)

**迁移要点**：
- `deepseek-chat` → `deepseek-v4-flash`（thinking disabled）
- `deepseek-reasoner` → `deepseek-v4-flash` + `thinking: {type: "enabled"}`
- `base_url` 保持 `https://api.deepseek.com` 不变

### 字节豆包/Trae/火山方舟（有更新 — Trae 2.0 预告）

**状态**：Trae 2.0 官宣 **7/21** 发布 SOLO 模式；Trae-Agent 核心组件已于 7/4 开源。

**来源**：[InfoQ Trae 2.0](https://www.infoq.cn/article/cuhIGtw8gWy5CW2aaxA0)

**要点**：SOLO 模式基于上下文工程，支持从需求到上线的端到端交付。

### 阿里通义/百炼（禁令持续）

**状态**：第 9 日办公环境 Claude 全系（含 Claude Code CLI）仍禁用，内部推荐 Qoder。

**开发者建议**：阿里员工及合作方须使用 Qoder 或通义灵码；Qoder 0.7.1+ 支持 BYOK 调用 Claude 模型。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例（V4 Flash，非 thinking 模式）

```bash
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

### curl 示例（V4 Flash，thinking 模式 — 替代 deepseek-reasoner）

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "user", "content": "Analyze the time complexity of quicksort worst case."}
    ],
    "thinking": {"type": "enabled"},
    "reasoning_effort": "high"
  }'
```

### Python 示例（OpenAI SDK 兼容）

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com"
)

# 非 thinking 模式（替代 deepseek-chat）
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Refactor this function to use async/await."}]
)
print(response.choices[0].message.content)

# thinking 模式（替代 deepseek-reasoner）
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Prove this algorithm is correct."}],
    extra_body={"thinking": {"type": "enabled"}, "reasoning_effort": "high"}
)
print(response.choices[0].message.content)
```

> ⚠️ 未实测（Cloud Agent 环境无 `DEEPSEEK_API_KEY`）。请在 7/24 前完成代码库中 `deepseek-chat` / `deepseek-reasoner` 字符串的全量替换。

---
