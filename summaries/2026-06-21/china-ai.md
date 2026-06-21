# 国内 AI 厂商与编程产品 — 2026-06-21

> 检索时间：2026-06-21T22:00:57Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **智谱 GLM-5.2 开源编程热度延续**：6/17 MIT 开源后，量子位等媒体报道其在自研评测中仅次于 Fable 5、开源界第一。支持 1M 上下文与长程 Agent 任务，为国内「第三条 Coding Agent 路线」（Claude Code / Codex / GLM-5.2 开源栈）提供底座。今日无新版本发布。
2. **DeepSeek Harness 招聘持续，官方 Coding 产品仍未发布**：DeepSeek 持续招聘 Agent Harness 工程师，社区期待 DeepSeek Code 对标 Claude Code/Codex，但官方尚未发布独立 CLI 产品。今日无公开更新。
3. **Fable 5 免费窗口倒计时影响国内订阅用户**：持有 Claude Pro/Max 的国内开发者同样适用 6/22 UTC 截止规则；6/23 起需 usage credits。与国内厂商无直接关联，但影响「用 Claude Code + 国产模型 API」混合栈的成本结构。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 | 标注 |
|----------|------|-----------|------|
| Claude Code | `./node_modules/.bin/claude --version` | 2.1.185 | ✅ |
| Claude Code | `claude --help \| head -5` | 正常输出 | ✅ |
| Codex CLI | `./node_modules/.bin/codex --version` | 0.141.0 | ✅ |
| Codex CLI | `codex doctor` | 12 ok · 1 warn · 4 fail | ✅（auth 未登录） |
| Codex CLI | `codex features list \| head -15` | browser_use stable 等 | ✅ |
| DeepSeek API | curl/Python | — | ⚠️ 未实测（无 Key） |
| 国内厂商 CLI | — | — | ⚠️ 无官方 CLI 可测 |

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version
./node_modules/.bin/codex --version
./node_modules/.bin/codex doctor 2>&1 | tail -10
./node_modules/.bin/codex features list 2>&1 | head -15
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-21 22:00 | 通义官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-21 22:00 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-21 22:00 | 混元、CodeBuddy 文档 | WorkBuddy 企业版（6/5）持续；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 2026-06-21 22:00 | 豆包、Trae、火山引擎 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-06-21 22:00 | open.bigmodel.cn、GitHub | GLM-5.2（6/17）为最近更新；今日无新版本 |
| 月之暗面 Kimi | 2026-06-21 22:00 | kimi.moonshot.cn | 今日无公开更新 |
| DeepSeek | 2026-06-21 22:00 | deepseek.com、招聘页 | Harness 招聘持续；DeepSeek Code 未发布 |
| 讯飞星火/iFlyCode | 2026-06-21 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-21 22:00 | 华为云 CodeArts | 今日无公开更新 |
| MiniMax | 2026-06-21 22:00 | minimaxi.com | 今日无公开更新 |
| 商汤 | 2026-06-21 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-21 22:00 | 昆仑万维官网 | 今日无公开更新 |
| 零一万物 | 2026-06-21 22:00 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-21 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 智谱 GLM/CodeGeeX（有近期更新，今日无新发布）

- **最近更新**：GLM-5.2 于 2026-06-17 MIT 开源发布
- **核心能力**：1M 上下文、长程 Coding Agent、CodeGeeX IDE 插件
- **媒体报道**：[量子位 GLM-5.2 报道](https://www.qbitai.com/2026/06/436085.html)
- **开发者行动**：可通过 Z.ai API 或本地部署试用；见下方 API 示例

### DeepSeek（招聘持续，产品未发布）

- **状态**：官方 DeepSeek Code CLI 仍未发布；Harness 团队招聘页面持续开放
- **社区期待**：对标 Claude Code 的终端 Agent 工具
- **替代方案**：DeepSeek API + 自建 Harness 或社区 Claude Code 协议桥接（非官方）

### 腾讯 CodeBuddy / WorkBuddy

- **最近公开更新**：WorkBuddy 企业版 2026-06-05 发布（持续引用）
- **今日**：无新版本 changelog

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxx"

curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "system", "content": "You are a coding assistant."},
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
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "user", "content": "Explain quicksort in 3 sentences."},
    ],
)
print(response.choices[0].message.content)
```

### 与 Claude Code 集成（社区方案，非官方）

```bash
export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
export ANTHROPIC_AUTH_TOKEN="$DEEPSEEK_API_KEY"
export ANTHROPIC_MODEL="deepseek-chat"
claude -p "List files in current directory"
```

⚠️ 社区方案，DeepSeek 未官方支持 Claude Code 协议；生产环境请使用官方 API + 自建 Harness。

### GLM-5.2 API 示例（Z.ai，⚠️ 未实测）

```bash
export ZAI_API_KEY="xxxxxxxx"

curl https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -d '{
    "model": "glm-5.2",
    "messages": [{"role": "user", "content": "Refactor this function for readability."}]
  }'
```

---
