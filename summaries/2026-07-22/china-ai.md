# 国内 AI 厂商与编程产品 — 2026-07-22

> 检索时间：2026-07-22T22:01:02Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek 旧 API 弃用倒计时 2 天**：`deepseek-chat` 与 `deepseek-reasoner` 将于 **7/24** 停用，请立即将 `model` 参数改为 `deepseek-v4-pro` 或 `deepseek-v4-flash`。
2. **Kimi K3 权重开源倒计时 5 天**：2.8T 参数、1M 上下文、原生视觉；完整权重 **7/27** 前发布，TRAE 已支持自定义 Anthropic 接口接入。
3. **TRAE 2.0 SOLO 发布第 2 日**：Context Engineer 范式持续发酵；国际版 Pro + SOLO Code 解锁，国内版等待名单。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` / Python | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| Kimi K3 API | — | ⚠️ 未实测（需充值解锁 K3） |
| TRAE SOLO | — | ⚠️ 未实测（Cloud Agent 无 GUI） |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-22 22:01 | 通义官网、百炼控制台 | 今日无公开更新；办公 Claude 禁令第 13 日 |
| 百度文心/Comate | 2026-07-22 22:01 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-22 22:01 | 混元、CodeBuddy 官网 | CodeBuddy v2.103.0 仍最新 |
| 智谱 GLM/CodeGeeX | 2026-07-22 22:01 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 讯飞星火/iFlyCode | 2026-07-22 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-22 22:01 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-07-22 22:01 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-22 22:01 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-22 22:01 | 天工 AI | 今日无公开更新 |
| 零一万物 | 2026-07-22 22:01 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-22 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 字节 TRAE 2.0 SOLO（发布第 2 日）

7/21 晚正式发布的 SOLO 模式以「任务中心」为核心，四大 Context 入口（Doc/Terminal/Browser/IDE）覆盖 PRD → 编码 → 测试 → 部署全流程。国际版定价首月 $3、后续 $10/月。

**社区反馈**（TRAE 论坛 7/17–18）：Kimi K3 可通过自定义配置接入，但需使用 Anthropic 兼容端点 `https://api.kimi.com/coding/`，OpenAI 格式暂不可用。内置模型列表更新滞后于 Kimi 官方发布。

### 月之暗面 Kimi K3（发布第 6 日）

- 2.8T 参数，KDA 混合线性注意力 + Attention Residuals
- 1M token 上下文，原生视觉理解
- API 定价：cache-hit 输入 $0.30/MTok，cache-miss $3.00/MTok，输出 $15.00/MTok
- 完整权重 **7/27** 前开源
- Kimi Code CLI：`/model` 选择 K3；Kimi Work 桌面端 ≥ 3.1.0

**官方来源**：[Kimi K3 Tech Blog](https://www.kimi.com/en/blog/kimi-k3)｜[Kimi API 文档](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)

### DeepSeek V4（弃用倒计时 2 天）

| 旧模型名 | 当前指向 | 弃用日期 | 新模型名 |
|----------|----------|----------|----------|
| `deepseek-chat` | V4-Flash 非思考 | **2026-07-24** | `deepseek-v4-flash` |
| `deepseek-reasoner` | V4-Flash 思考 | **2026-07-24** | `deepseek-v4-pro`（思考模式） |

`base_url` 保持 `https://api.deepseek.com` 不变。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
# V4-Flash（非思考，适合日常对话）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "写一个 Python 快速排序"}],
    "max_tokens": 4096
  }'

# V4-Pro（思考模式，适合复杂推理）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{"role": "user", "content": "分析这段代码的时间复杂度"}],
    "max_tokens": 8192
  }'
```

### Python 示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-deepseek-api-key",
    base_url="https://api.deepseek.com"
)

# 迁移检查：确认不再使用旧模型名
OLD_NAMES = ["deepseek-chat", "deepseek-reasoner"]
MODEL = "deepseek-v4-flash"  # 或 deepseek-v4-pro
assert MODEL not in OLD_NAMES, "请使用新模型名，旧名 7/24 停用"

response = client.chat.completions.create(
    model=MODEL,
    messages=[{"role": "user", "content": "Hello"}],
    max_tokens=1024
)
print(response.choices[0].message.content)
```

### Kimi K3 Anthropic 兼容端点（TRAE 接入用）

```bash
# Anthropic 兼容格式
curl https://api.kimi.com/coding/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $KIMI_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "kimi-k3",
    "max_tokens": 4096,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

⚠️ 以上 API 调用均未实测（无 Key）。

---
