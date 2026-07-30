# 国内 AI 厂商与编程产品 — 2026-07-30

> 检索时间：2026-07-30T22:00:19Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Kimi K3 开源第 4 日 + Infra 难抄讨论**：36氪 7/30 分析权重开放不等于 MoonEP/FlashKDA 等 Infra 可复制，自托管门槛仍高；API `kimi-k3` 无新版本。
2. **阿里 Claude 禁令第 21 日**：办公环境 Anthropic 全系仍禁用，官方推荐 Qoder；通义/百炼模型今日无新版本。
3. **GCC 禁 AI 法律重要代码贡献**（36氪 7/30 快讯）：对国内团队向国际开源项目贡献代码的合规策略有参考价值（非国内厂商发布）。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `claude --version` | ✅ 2.1.220 |
| Codex CLI | `codex --version` | ✅ 0.146.0（npm `@latest`） |
| Codex doctor | `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| DeepSeek API | curl/Python | ⚠️ 未实测（无 Key） |
| Cursor 桌面 | — | ⚠️ 未实测（无 GUI） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version
./node_modules/.bin/codex --version
./node_modules/.bin/codex doctor 2>&1 | tail -5
./node_modules/.bin/codex features list 2>&1 | head -15
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-30 22:00 | 通义官网、百炼控制台、Qoder 公告 | 禁令第 21 日；模型无新版本 |
| 百度文心/Comate | 2026-07-30 22:00 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-30 22:00 | CodeBuddy 发布页 | v2.103.0 仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-07-30 22:00 | Trae、火山方舟控制台 | TRAE 2.0 SOLO 第 10 日，无新稿 |
| 智谱 GLM/CodeGeeX | 2026-07-30 22:00 | 智谱开放平台、CodeGeeX | GLM-5.2 仍最新 |
| DeepSeek | 2026-07-30 22:00 | DeepSeek API 文档 | v4-flash/v4-pro 仍最新 |
| 讯飞星火/iFlyCode | 2026-07-30 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-30 22:00 | 华为云 CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-30 22:00 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-30 22:00 | 商汤 SenseNova | 今日无公开更新 |
| 昆仑万维 | 2026-07-30 22:00 | 天工、Skywork | 今日无公开更新 |
| 零一万物 | 2026-07-30 22:00 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-30 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 月之暗面 Kimi（第 4 日观察）

**K3 权重开源第 4 日**（7/27 00:00 UTC 起）：
- 权重、技术报告、MoonEP/FlashKDA/AgentEnv 持续可下载
- API 模型名 `kimi-k3` 无新版本
- **36氪 7/30**：《Kimi K3 公开了不少秘密，但最重要的 Infra 却很难抄》——强调 Infra 工程壁垒，权重开放 ≠ 可复现部署

**官方来源**：[Kimi K3 GitHub](https://github.com/MoonshotAI/Kimi-K3)｜[36氪 Infra 报道](https://36kr.com/p/3918081073262209)

**对开发者**：自托管仍须高端 GPU 集群与 Infra  expertise；API 或 Fireworks 托管为更现实路径。

### 阿里通义/百炼（禁令持续）

办公环境 Claude 全系禁用第 **21** 日（自 7/10 生效），官方推荐 **Qoder**。IDC 报道 Qoder 中国市场份额 47.6%（7/16 稿，7/30 仍被 36氪引用）。通义模型与百炼平台今日无新版本。

### 其余厂商

百度 Comate、腾讯 CodeBuddy、字节 Trae、智谱 GLM、DeepSeek、讯飞、华为、MiniMax、商汤、昆仑万维、零一万物、面壁智能今日均无公开产品更新。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

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
    "temperature": 0.7,
    "max_tokens": 2048
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
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Explain the difference between async and sync in Python."},
    ],
    temperature=0.7,
    max_tokens=2048,
)

print(response.choices[0].message.content)
```

### 模型迁移提醒

旧 API 模型名（如 `deepseek-chat`、`deepseek-coder`）已退役第 **7** 日。须使用：
- `deepseek-v4-flash`：快速推理
- `deepseek-v4-pro`：高质量推理

⚠️ 本地环境无 `DEEPSEEK_API_KEY`，上述 SOP 未实测推理。
