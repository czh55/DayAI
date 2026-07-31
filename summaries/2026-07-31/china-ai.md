# 国内 AI 厂商与编程产品 — 2026-07-31

> 检索时间：2026-07-31T22:00:55Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek V4-Flash 正式版 API 公测上线**（7/31）：模型 `deepseek-v4-flash-0731`，9 项 Agent 基准全面超越 V4-Pro-Preview；原生支持 Responses API 并适配 Codex；架构不变仅后训练升级。
2. **Kimi K3 权重开源第 5 日**：Moonshot GitHub 权重持续可下载，API `kimi-k3` 无新版本；36氪 7/30 Infra 难抄讨论余温仍在。
3. **阿里 Claude 禁令第 22 日**：办公环境 Anthropic 全系仍禁用，官方推荐 Qoder；通义/百炼模型今日无新版本。

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
| 阿里通义/百炼 | 2026-07-31 22:00 | 通义官网、百炼控制台、Qoder 公告 | 禁令第 22 日；模型无新版本 |
| 百度文心/Comate | 2026-07-31 22:00 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-31 22:00 | CodeBuddy 发布页 | v2.103.0 仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-07-31 22:00 | Trae、火山方舟控制台 | TRAE 2.0 SOLO 第 11 日，无新稿 |
| 智谱 GLM/CodeGeeX | 2026-07-31 22:00 | 智谱开放平台、CodeGeeX | GLM-5.2 仍最新 |
| 月之暗面 Kimi | 2026-07-31 22:00 | Kimi API、GitHub | K3 开源第 5 日；API 无新版本 |
| 讯飞星火/iFlyCode | 2026-07-31 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-31 22:00 | 华为云 CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-31 22:00 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-31 22:00 | 商汤 SenseNova | 今日无公开更新 |
| 昆仑万维 | 2026-07-31 22:00 | 天工、Skywork | 今日无公开更新 |
| 零一万物 | 2026-07-31 22:00 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-31 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（今日有更新）

**V4-Flash 正式版 API 公测**（2026-07-31）：

| 项目 | 内容 |
|------|------|
| 模型 ID | `deepseek-v4-flash-0731`（API 调用名 `deepseek-v4-flash`） |
| 架构 | 与 Preview 版结构尺寸完全一致，仅后训练升级 |
| Terminal Bench 2.1 | **82.7** |
| Cybergym | **76.7** |
| DSBench-FullStack | **68.7** |
| DSBench-Hard | **59.6** |
| 工程适配 | 原生 Responses API；针对性适配 Codex |
| 未升级 | V4-Pro API、APP/Web 端 |
| 即将发布 | V4-Pro 正式版、DeepSeek Harness 极简模式 |

**官方来源**：[36氪报道](https://36kr.com/p/3919242384043654)｜[36氪深度](https://36kr.com/p/3919224296451461)｜DeepSeek API 文档

**对开发者**：若已用 `deepseek-v4-flash` Preview，切换至正式版通常只需确认 model ID 后缀；Codex 用户可参考官方文档配置 V4-Flash 作为 custom provider。Pro 用户暂不受影响。

### 月之暗面 Kimi（第 5 日观察）

K3 权重开源第 5 日（7/27 00:00 UTC 起）：权重与技术报告持续可下载；API `kimi-k3` 无新版本。36氪 7/30 Infra 难抄讨论仍具参考价值。

### 阿里通义/百炼（禁令持续）

禁令第 22 日（7/10 起）：办公环境 Claude 全系禁用，推荐 Qoder。通义/百炼模型今日无新版本。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
export DEEPSEEK_API_KEY="your-api-key"

curl https://api.deepseek.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "system", "content": "You are a coding assistant."},
      {"role": "user", "content": "Write a Python function to merge two sorted lists."}
    ],
    "temperature": 1.0,
    "top_p": 0.95,
    "max_tokens": 4096
  }'
```

### Responses API 格式（Codex 适配）

```bash
curl https://api.deepseek.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "input": "Analyze this repo and suggest refactoring.",
    "tools": [{"type": "code_interpreter"}]
  }'
```

### Python 示例

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com/v1",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "user", "content": "Explain Agent Harness in one paragraph."}
    ],
    temperature=1.0,
    top_p=0.95,
    max_tokens=2048,
)
print(response.choices[0].message.content)
```

### Codex 配置示例（`~/.codex/config.toml` 概念性）

```toml
[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/v1"
api_key_env_var = "DEEPSEEK_API_KEY"

[profiles.deepseek-flash]
model_provider = "deepseek"
model = "deepseek-v4-flash"
```

⚠️ 以上 SOP 未经本地实测（无 `DEEPSEEK_API_KEY`）；正式版 API 公测后请以 DeepSeek 官方文档为准。

---
