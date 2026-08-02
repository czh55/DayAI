# 国内 AI 厂商与编程产品 — 2026-08-02

> 检索时间：2026-08-02T22:01:35Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek V4-Flash 正式版 API 公测第 3 日**（7/31 上线）：模型 `deepseek-v4-flash-0731`，API 调用无变更；原生 Responses API + Codex 适配；Pro 正式版仍「尽快发布」/目标 8 月初 Responses API。
2. **Okta 指数间接利好国内 Agent 生态**：Anthropic（Claude Code）增速第一印证终端 Agent 需求；DeepSeek Flash 以 Responses API + Codex 适配切入同一生态，国内开发者可用 Flash 做低成本 Agent 后端。
3. **阿里 Claude 禁令第 24 日**：办公环境 Anthropic 全系仍禁用，官方推荐 Qoder；通义/百炼模型今日无新版本。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `claude --version` | ✅ 2.1.220 |
| Codex CLI | `codex --version` | ✅ 0.146.0（npm `@latest`） |
| Codex doctor | `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| Codex features | `codex features list` | ✅ apps/browser_use stable；code_mode under development |
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
| 阿里通义/百炼 | 2026-08-02 22:01 | 通义官网、百炼控制台、Qoder 公告 | 禁令第 24 日；模型无新版本 |
| 百度文心/Comate | 2026-08-02 22:01 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-08-02 22:01 | CodeBuddy 发布页 | v2.103.0 仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-08-02 22:01 | Trae、火山方舟控制台 | TRAE 2.0 SOLO 第 13 日，无新稿 |
| 智谱 GLM/CodeGeeX | 2026-08-02 22:01 | 智谱开放平台、CodeGeeX | GLM-5.2 仍最新 |
| 月之暗面 Kimi | 2026-08-02 22:01 | Kimi API、GitHub | K3 开源第 7 日；API 无新版本 |
| 讯飞星火/iFlyCode | 2026-08-02 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-08-02 22:01 | 华为云 CodeArts | 今日无公开更新 |
| MiniMax | 2026-08-02 22:01 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-08-02 22:01 | 商汤 SenseNova | 今日无公开更新 |
| 昆仑万维 | 2026-08-02 22:01 | 天工、Skywork | 今日无公开更新 |
| 零一万物 | 2026-08-02 22:01 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-08-02 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（公测第 3 日观察）

**V4-Flash 正式版 API 公测**（2026-07-31 上线，8/2 第 3 日）：

| 项目 | 内容 |
|------|------|
| 模型 ID | `deepseek-v4-flash-0731`（API 调用名 `deepseek-v4-flash`） |
| 架构 | 与 Preview 版结构尺寸完全一致，仅后训练升级 |
| Terminal Bench 2.1 | **82.7**（Preview 61.8；Pro-Preview 72.1） |
| DeepSWE | **54.4**（Preview 7.3） |
| Cybergym | **76.7** |
| 工程适配 | 原生 Responses API；针对性适配 Codex |
| 定价 | 约 $0.14/$0.28 per Mtok；并发 2500 |
| 未升级 | V4-Pro API、APP/Web 端 |
| 即将发布 | V4-Pro 正式版；Pro Responses API 目标 8 月初 |

**8/2 状态**：第 3 日无 API 破坏性变更；海外社区持续引用 7/31 后训练跃升叙事；独立 Harness 复现仍缺。

**官方来源**：[DeepSeek API Changelog 7/31](https://api-docs.deepseek.com/updates/)｜[36氪 7/31](https://www.36kr.com/p/3919242384043654)

**对开发者**：公测第 3 日可放心集成 Flash 做 Agent 后端；关注 8 月上旬 Pro 正式版是否拉开分层。

### 月之暗面 Kimi（第 7 日观察）

K3 权重开源第 7 日（7/27 起）：权重与技术报告持续可下载；API `kimi-k3` 无新版本。Okta 指数未单独列出 Kimi，但 Cursor Composer 2.5 训练曾公开使用 Kimi K2.5 基座（量子位 5 月稿），与 Cursor Okta 增速 Top 3 定位仍具关联讨论价值。

### 阿里通义/百炼（禁令持续）

禁令第 24 日（7/10 起）：办公环境 Claude 全系禁用，推荐 Qoder。通义/百炼模型今日无新版本。Okta 指数未覆盖国内厂商，但 Anthropic 增速第一间接强化「国产替代」叙事压力。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例（Chat Completions）

```bash
export DEEPSEEK_API_KEY="your-api-key"
curl https://api.deepseek.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "Write a Python hello world"}],
    "temperature": 1.0,
    "top_p": 0.95
  }'
```

### curl 示例（Responses API — Codex 兼容）

```bash
curl https://api.deepseek.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "input": "Refactor this auth module to use JWT",
    "reasoning": {"effort": "max"}
  }'
```

### Python 示例

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Explain async/await in Python"}],
    temperature=1.0,
    top_p=0.95,
)
print(response.choices[0].message.content)
```

### Codex 指向 DeepSeek 配置示例

```toml
# ~/.codex/config.toml（示例，需 DeepSeek 官方 Codex 适配文档确认）
[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/v1"
api_key_env_var = "DEEPSEEK_API_KEY"
wire_api = "responses"
```

**本地实测**：⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；以上 SOP 基于 [DeepSeek API 文档](https://api-docs.deepseek.com/) 与 7/31 Changelog。
