# 国内 AI 厂商与编程产品 — 2026-07-23

> 检索时间：2026-07-23T22:02:45Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek 旧 API 名弃用倒计时 1 天**：`deepseek-chat` / `deepseek-reasoner` 将于 **7/24 15:59 UTC** 停用，需立即迁移至 `deepseek-v4-flash` 或 `deepseek-v4-pro`。`base_url` 不变，仅改 `model` 参数。
2. **Kimi K3 权重开源倒计时 4 天**：7/27 完整权重发布，TRAE 需自定义 Anthropic 端点 `https://api.kimi.com/coding/` 接入。
3. **TRAE 2.0 SOLO 发布第 3 日**：Context Engineer 范式持续发酵，社区反馈 brownfield 场景可靠性待验证。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `claude --version` | ✅ 2.1.218 |
| Codex CLI | `codex --version` | ✅ 0.145.0 |
| Codex doctor | `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| DeepSeek API | curl 调用 | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-23 22:02 | 通义官网、百炼控制台 | 今日无公开更新；Claude 禁令第 14 日仍推荐 Qoder |
| 百度文心/Comate | 2026-07-23 22:02 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-23 22:02 | CodeBuddy 官网、GitHub | v2.103.0 仍最新，今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-07-23 22:02 | 智谱 AI 官网 | GLM-5.2（6/27）仍最新 |
| 讯飞星火/iFlyCode | 2026-07-23 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-23 22:02 | 华为云官网 | 今日无公开更新 |
| MiniMax | 2026-07-23 22:02 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-23 22:02 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-23 22:02 | 昆仑万维官网 | 今日无公开更新 |
| 零一万物 | 2026-07-23 22:02 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-23 22:02 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek — 旧 API 名弃用倒计时 1 天

**状态**：V4 GA 运行中；`deepseek-chat` / `deepseek-reasoner` 将于 **2026-07-24 15:59 UTC** 停用。

**迁移映射**：

| 旧名 | 新名 | 说明 |
|------|------|------|
| `deepseek-chat` | `deepseek-v4-flash` | 非思考模式，直接替换 |
| `deepseek-reasoner` | `deepseek-v4-flash` + `thinking: {"type": "enabled"}` | 思考模式改为参数控制 |
| 更强推理 | `deepseek-v4-pro` | 旗舰版，需单独压测 |

**官方来源**：[DeepSeek API Pricing](https://api-docs.deepseek.com/quick_start/pricing)

### 月之暗面 Kimi — K3 权重开源倒计时 4 天

**状态**：Kimi K3（2.8T 参数 MoE）7/17 发布 API，完整权重 **7/27** 开源。

**接入方式**：
- Anthropic 兼容：`https://api.kimi.com/coding/`
- TRAE 需自定义配置，预设列表未更新
- Cursor Composer 2.5 训练管线部分采用 K3 基模

### 字节 Trae/火山方舟 — SOLO 发布第 3 日

**状态**：TRAE 2.0 SOLO 7/21 发布，Context Engineer 范式。

**社区反馈**：
- Kimi K3 接入需 Anthropic 接口自定义配置
- brownfield 存量代码库可靠性社区质疑
- greenfield MVP 与演示场景表现良好

### 阿里通义/百炼 — Qoder 持续推荐

**状态**：Claude 办公禁令第 14 日，阿里内部仍推荐 Qoder 替代 Claude。

**IDC 数据**（7/16）：阿里 Qoder 中国 AI 编程市场份额 47.6%，全球用户超 500 万。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
# 迁移后：deepseek-v4-flash（替代 deepseek-chat）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# 迁移后：deepseek-v4-flash + thinking（替代 deepseek-reasoner）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "Explain quantum computing"}],
    "thinking": {"type": "enabled"}
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
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)

# 替代 deepseek-reasoner（思考模式）
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Solve this math problem step by step"}],
    extra_body={"thinking": {"type": "enabled"}}
)
print(response.choices[0].message.content)
```

### 迁移检查清单

```bash
# 全局搜索旧模型名
grep -rn "deepseek-chat\|deepseek-reasoner" . --include="*.py" --include="*.env*" --include="*.yaml" --include="*.json"

# 检查 CI/CD 环境变量
echo $DEEPSEEK_MODEL  # 应改为 deepseek-v4-flash 或 deepseek-v4-pro
```

⚠️ 未实测：本环境无 `DEEPSEEK_API_KEY`，以上 SOP 基于官方文档与迁移指南整理。

---
