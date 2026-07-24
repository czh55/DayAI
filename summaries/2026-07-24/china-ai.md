# 国内 AI 厂商与编程产品 — 2026-07-24

> 检索时间：2026-07-24T22:02:00Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek 旧 API 名已于 15:59 UTC 正式退役**：`deepseek-chat` / `deepseek-reasoner` 不再可用，须迁移至 `deepseek-v4-flash` 或 `deepseek-v4-pro`，并显式配置 `thinking` 参数。
2. **Kimi K3 权重开源倒计时 3 天**：7/27 完整权重发布，TRAE 需自定义 Anthropic 端点 `https://api.kimi.com/coding/` 接入。
3. **Anthropic Opus 5 同日发布**：国内开发者通过 Claude Code 2.1.219 或 API `claude-opus-5` 可用，定价与 Opus 4.8 相同（$5/$25 per Mtok）。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `claude --version` | ✅ 2.1.219 |
| Codex CLI | `codex --version` | ✅ 0.145.0 |
| Codex doctor | `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| DeepSeek API | curl 调用 | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-24 22:02 | 通义官网、百炼控制台 | 今日无公开更新；Claude 禁令第 15 日仍推荐 Qoder |
| 百度文心/Comate | 2026-07-24 22:02 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-24 22:02 | CodeBuddy 官网、GitHub | v2.103.0 仍最新，今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-07-24 22:02 | 智谱 AI 官网 | GLM-5.2（6/27）仍最新 |
| 讯飞星火/iFlyCode | 2026-07-24 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-24 22:02 | 华为云官网 | 今日无公开更新 |
| MiniMax | 2026-07-24 22:02 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-24 22:02 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-24 22:02 | 昆仑万维官网 | 今日无公开更新 |
| 零一万物 | 2026-07-24 22:02 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-24 22:02 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek — 旧 API 名已于今日退役

**状态**：V4 GA 运行中；`deepseek-chat` / `deepseek-reasoner` 已于 **2026-07-24 15:59 UTC** 停用。

**迁移映射**：

| 旧名 | 新名 | 说明 |
|------|------|------|
| `deepseek-chat` | `deepseek-v4-flash` | 非思考模式，建议显式 `thinking: disabled` |
| `deepseek-reasoner` | `deepseek-v4-flash` + `thinking: {"type": "enabled"}` | 思考模式改为参数控制 |
| 更强推理 | `deepseek-v4-pro` | 旗舰版，需单独压测 |

**官方来源**：[DeepSeek API Docs](https://api-docs.deepseek.com/)｜[V4 Preview Announcement](https://api-docs.deepseek.com/news/news260424/)

**今日影响**：未迁移的生产服务自 15:59 UTC 起将收到 API 错误。国内云代理（阿里百炼、火山方舟）用户需确认代理层默认模型名是否已切换。

### 月之暗面 Kimi — K3 权重开源倒计时 3 天

**状态**：Kimi K3（2.8T 参数 MoE）7/16 发布 API，完整权重 **7/27** 开源。

**接入方式**：
- Anthropic 兼容：`https://api.kimi.com/coding/`
- Kimi Code CLI：`/model` 选择 `kimi-k3`
- TRAE 需自定义配置，预设列表未更新

**定价**：$0.30/MTok cache-hit input，$3.00/MTok cache-miss input，$15.00/MTok output

### 字节 Trae/火山方舟 — SOLO 发布第 4 日

**状态**：TRAE 2.0 SOLO 7/21 发布，Context Engineer 范式。

**社区反馈**：
- Kimi K3 接入需 Anthropic 接口自定义配置
- brownfield 存量代码库可靠性社区质疑
- greenfield MVP 与演示场景表现良好

### 阿里通义/百炼 — Qoder 持续推荐

**状态**：Claude 办公禁令第 15 日，阿里内部仍推荐 Qoder 替代 Claude。

**IDC 数据**（7/16）：阿里 Qoder 中国 AI 编程市场份额 47.6%，全球用户超 500 万。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
# 替代原 deepseek-chat（非思考模式）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "Hello"}],
    "extra_body": {"thinking": {"type": "disabled"}}
  }'

# 替代原 deepseek-reasoner（思考模式）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "Solve this math problem"}],
    "extra_body": {"thinking": {"type": "enabled"}}
  }'
```

### Python 示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com"
)

# 替代 deepseek-chat
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Hello"}],
    extra_body={"thinking": {"type": "disabled"}}
)
print(response.choices[0].message.content)

# 替代 deepseek-reasoner
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Complex reasoning task"}],
    extra_body={"thinking": {"type": "enabled"}}
)
print(response.choices[0].message.content)
```

### 迁移检查清单

```bash
# 1. 全局搜索旧名
grep -r "deepseek-chat\|deepseek-reasoner" . --include="*.py" --include="*.js" --include="*.env*"

# 2. 检查 CI/CD 环境变量
env | grep -i deepseek

# 3. 检查 LangChain/LLM 路由配置
grep -r "deepseek" . --include="*.yaml" --include="*.toml" --include="*.json"
```

⚠️ **未实测**：本环境无 `DEEPSEEK_API_KEY`，以上 SOP 基于官方文档编写，请在测试环境验证后切换生产。
