# 国内 AI 厂商与编程产品 — 2026-06-19

> 检索时间：2026-06-19T22:03:05Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **腾讯 WorkBuddy 企业版持续发酵（6/5 发布）**：CodeBuddy 团队推出企业 AI 办公工作台——数字员工 7×24、人机协同「项目」、Admin 后台统一治理 Agent 权限/用量/Skills；代表国内大厂从「个人 Coding Agent」迈向「组织级 Agent 操作系统」。
2. **智谱 GLM-5.2 开源红利延续（6/17）**：MIT 全量开源、1M 上下文、Code Arena 开源第一；今日无新版本，但 Hugging Face 部署与 Z.ai API 仍是最受关注的国产编程模型选项。
3. **DeepSeek 官方 Code Agent 仍缺位**：Harness 团队招聘持续；社区 DeepSeek-TUI 为非官方替代。Fable 5 免费窗口 6/22 截止，国内开发者应同步评估 GLM-5.2 / DeepSeek API / Codex 迁移路径。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 见下方 SOP | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| GLM-5.2 API | — | ⚠️ 未实测（无 Z.ai API Key） |
| 国内 IDE 插件 | — | ⚠️ Cloud Agent 无法安装 GUI 插件 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-19 22:03 | 通义灵码官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-19 22:03 | Comate 官网 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-06-19 22:03 | Trae/火山方舟 | 今日无公开更新 |
| 月之暗面 Kimi | 2026-06-19 22:03 | Kimi 官网 | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-19 22:03 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-19 22:03 | CodeArts 官网 | 今日无公开更新 |
| MiniMax | 2026-06-19 22:03 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-06-19 22:03 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-19 22:03 | 昆仑万维 AI | 今日无公开更新 |
| 零一万物 | 2026-06-19 22:03 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-19 22:03 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 腾讯混元 / CodeBuddy / WorkBuddy（持续热度）

**发生了什么（6/5 发布，6/19 媒体持续引用）**

- **WorkBuddy 企业版**：企业 AI 办公工作台，含数字员工（云端 7×24）、人机协同「项目」（人+Agent 共享上下文/Skills/MCP）、企业管理后台（组织架构、权限、用量、模型接入）
- **办公智能体套件 Agent Suite**：腾讯文档、网盘、乐享原生接入 WorkBuddy，打通内容创作→知识沉淀→能力复用
- 交付模式：公有云、VPC 专项、私有部署；开放 WorkBuddy Management Agent API
- CodeBuddy 负责人刘毅：「AI Agent 下半场，主线转向生产力提效，进入企业真实场景」

**官方来源**：[量子位报道](https://www.qbitai.com/2026/06/430758.html)

**对开发者建议**：若团队已用腾讯生态，可评估 WorkBuddy 作为组织级 Harness；个人开发者仍可使用 CodeBuddy IDE 插件，但企业治理需 Admin 后台统一配置 Skills 与 MCP 白名单。

### 智谱 GLM / CodeGeeX（6/17 开源，今日无新版本）

**状态**：GLM-5.2 MIT 开源持续可用；CodeGeeX 无独立 6/19 更新公告。

**对开发者建议**：长程 Agentic Coding 可优先试用 GLM-5.2 + 自建 Harness；关注 Z.ai Coding Plan 定价与 thinking 档位映射。

### 字节豆包 / Trae / 火山方舟 / Qoder

**状态**：Trae、豆包今日无公开更新。InfoQ 6/10 预告阿里 **Qoder CLI** 将于 AICon 上海（6/26–27）分享 SDK 与 Cloud Agents 集成——字节侧无对等 6/19 发布。

### DeepSeek（Harness 招聘持续）

**状态**：官方编程 Agent **未发布**；Harness 团队招聘持续。

**对开发者建议**：生产环境使用 DeepSeek V3/V4 API + 自建 Agent 循环；关注官方招聘作为产品发布前瞻信号。

---

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

---
