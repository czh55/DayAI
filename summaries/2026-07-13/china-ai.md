# 国内 AI 厂商与编程产品 — 2026-07-13

> 检索时间：2026-07-13T22:01:15Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Fable 5 credits 计费时代首日 + 阿里 Claude 禁令第 4 日**：7/13 起 Fable 5 不再计入订阅周额度；阿里办公环境 Claude 全系仍禁用，推荐 Qoder；国产平替（Qoder、CodeBuddy、OpenCode）讨论持续。
2. **腾讯 CodeBuddy Code v2.103.0 仍为最近更新**：DeepSeek V4 Pro/Flash（1M 上下文）支持持续可用；今日无新版本发布。
3. **DeepSeek V4 预览 + 旧模型名弃用倒计时 11 天**：`deepseek-chat`/`deepseek-reasoner` 将于 **7/24** 停用，开发者须迁移至 V4 API 命名。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.207 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.144.3 |
| DeepSeek API | curl/Python 调用 | ⚠️ 未实测（无 Key） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.207 (Claude Code)
./node_modules/.bin/claude --help 2>&1 | head -5
./node_modules/.bin/codex --version    # codex-cli 0.144.3
./node_modules/.bin/codex doctor 2>&1 | tail -10
./node_modules/.bin/codex features list 2>&1 | head -15
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-13 22:01 | 通义千问、百炼平台 | 模型无新版本；禁令第 4 日持续 |
| 百度文心/Comate | 2026-07-13 22:01 | 文心一言、Comate 官网 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-13 22:01 | 豆包、Trae、火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-07-13 22:01 | 智谱 AI、CodeGeeX | GLM-5.2（6/27）仍最新 |
| 月之暗面 Kimi | 2026-07-13 22:01 | Kimi 官网 | Kimi 产品无新版本 |
| DeepSeek | 2026-07-13 22:01 | DeepSeek 平台 | V4 预览运行中；旧名 7/24 停用倒计时 11 天 |
| 讯飞星火/iFlyCode | 2026-07-13 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-13 22:01 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-13 22:01 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-13 22:01 | 商汤科技 | 今日无公开更新 |
| 昆仑万维 | 2026-07-13 22:01 | 昆仑万维 | 今日无公开更新 |
| 零一万物 | 2026-07-13 22:01 | 零一万物 | 今日无公开更新 |
| 面壁智能 | 2026-07-13 22:01 | 面壁智能 | 今日无公开更新 |

## 分厂商详情

### 腾讯混元 / CodeBuddy — 仍为最近更新（v2.103.0）

- **CodeBuddy Code v2.103.0**（7/11 前后确认）仍为最近版本，今日无新版本
- 功能回顾：DeepSeek V4 Pro/Flash（1M 上下文）、`/doctor` 增强
- 来源：[CodeBuddy v2.103.0 Release Notes](https://www.codebuddy.cn/docs/cli/release-notes/v2.103.0)
- **混元 Hy3 正式版**（7/6）仍为模型侧最近重大更新

### 阿里巴巴（通义/百炼/Qoder）— 禁令第 4 日

- **7/10 禁令持续生效**：办公环境禁用 Claude 全系，推荐 Qoder
- 通义/Qwen 模型产品今日无新版本
- 36氪推荐替代路径：Qoder（阿里自研）、OpenCode（开源 MIT）、CodeBuddy（腾讯）

### DeepSeek — 倒计时持续

- V4 预览版（`deepseek-v4-pro`、`deepseek-v4-flash`）运行中
- **7/24 弃用倒计时 11 天**：`deepseek-chat`、`deepseek-reasoner` 将停用
- 量子位（4 月）报道 V4 永久降价 + 缓存命中 1 折，编程成本可降 83%

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
export DEEPSEEK_API_KEY="your-api-key-here"

curl https://api.deepseek.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [
      {"role": "system", "content": "You are a helpful coding assistant."},
      {"role": "user", "content": "Write a Python function to merge two sorted lists."}
    ],
    "stream": false
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
    model="deepseek-v4-pro",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Refactor this function to use type hints."},
    ],
    stream=False,
)
print(response.choices[0].message.content)
```

### 迁移注意事项（7/24 截止）

| 旧模型名 | 新模型名 | 状态 |
|----------|----------|------|
| `deepseek-chat` | `deepseek-v4-flash` | ⚠️ 7/24 停用 |
| `deepseek-reasoner` | `deepseek-v4-pro` | ⚠️ 7/24 停用 |

本地实测：⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；上述 SOP 基于 DeepSeek 官方 API 文档与量子位 V4 降价报道。
