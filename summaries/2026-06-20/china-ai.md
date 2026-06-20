# 国内 AI 厂商与编程产品 — 2026-06-20

> 检索时间：2026-06-20T22:03:02Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek Code Harness 招聘持续，产品仍未发布**：36氪/Decrypt 5–6 月跟进 Deli Chen 确认的北京 Harness 团队，内部工作名「DeepSeek Code」，公式 Model + Harness = Agent；今日无官方产品公告，但招聘 JD 明确要求深度使用 Claude Code/Codex/Cursor 等竞品。
2. **智谱 GLM-5.2 开源编程热度延续（6/17 发布）**：量子位报道其在 Fable 5 之下拿下开源编程全球第一、Design Arena 品味评测第一；1M 上下文面向长程工程任务；今日无新版本发布。
3. **微软 6/30 内部 Claude Code 关停进入 10 天倒计时**：对国内无直接影响，但印证「模型 API 开放、Agent 前端封闭」的大厂策略；国内开发者应同步评估通义/智谱/DeepSeek 自建 Harness 路径。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 见下方 SOP | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| GLM-5.2 API | — | ⚠️ 未实测（无 Z.ai API Key） |
| 国内 IDE 插件 | — | ⚠️ Cloud Agent 无法安装 GUI 插件 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-20 22:03 | 通义灵码官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-20 22:03 | Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-20 22:03 | CodeBuddy/WorkBuddy 官网 | 今日无公开更新（WorkBuddy 6/5 发布持续引用） |
| 字节豆包/Trae/火山方舟 | 2026-06-20 22:03 | Trae/火山方舟 | 今日无公开更新 |
| 月之暗面 Kimi | 2026-06-20 22:03 | Kimi 官网、kimi-cli | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-20 22:03 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-20 22:03 | CodeArts 官网 | 今日无公开更新 |
| MiniMax | 2026-06-20 22:03 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-06-20 22:03 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-20 22:03 | 昆仑万维 AI | 今日无公开更新 |
| 零一万物 | 2026-06-20 22:03 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-20 22:03 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（Harness 招聘持续，产品未发布）

**发生了什么**

- 5/20 Deli Chen 确认组建 **Harness 团队**，目标从零构建 **Code Harness**（社区简称 DeepSeek Code）
- 招聘岗位：Agent Harness 产品经理、研发工程师（北京海淀）
- JD 要求深度使用 Claude Code、Codex、Cursor、Copilot、Manus 等竞品
- 36氪 6 月报道：DeepSeek V4 Pro-Max SWE-Bench Pro **55.4%**，低于 Kimi K2.6（58.6%）与 GLM-5.1（58.4%）
- ⚠️ 无公开发布日期；社区 DeepSeek-TUI 为非官方项目

**官方来源**：[36氪 DeepSeek Harness 报道](https://www.36kr.com/p/3821376674386305)｜[Decrypt secondary](https://decrypt.co/368689/deepseek-code-harness-claude-code-alternative-china-ai)

**对开发者建议**：生产环境使用 DeepSeek V3/V4 API + 自建 Agent 循环；关注官方招聘作为产品发布前瞻信号。

### 智谱 GLM / CodeGeeX（6/17 开源，今日无新版本）

**状态**：GLM-5.2 MIT 全量开源持续可用；1M 上下文；CodeGeeX 无独立 6/20 更新。

**量子位观点（secondary）**：在 Fable 5 之下拿下开源编程全球第一；Design Arena 品味评测全球第一；代表「开源长程 Coding Agent 底座」路线。

**对开发者建议**：长程 Agentic Coding 可试用 GLM-5.2 + 自建 Harness 或 Z.ai Coding Plan；关注 thinking 档位与 Claude Code 兼容性。

### 腾讯混元 / CodeBuddy / WorkBuddy

**状态**：WorkBuddy 企业版（6/5 发布）持续被量子位/36氪引用；今日无新版本。

**核心能力（6/5）**：数字员工 7×24、人机协同「项目」、Admin 治理后台、Agent Suite 与腾讯文档/网盘/乐享打通。

### 月之暗面 Kimi

**状态**：kimi-cli、Kimi Code 等终端工具入口存在；今日无公开更新。36氪引述 Kimi K2.6 SWE-Bench Pro 58.6%。

### 阿里通义 / 百炼 / Qoder

**状态**：通义灵码、百炼今日无更新。InfoQ 6/10 预告阿里 **Qoder CLI** 将于 AICon 上海（6/26–27）分享 SDK 化与 Cloud Agents 集成。

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
