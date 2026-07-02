# 国内 AI 厂商与编程产品 — 2026-07-02

> 检索时间：2026-07-02T22:01:08Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Anthropic Fable 5 恢复次日体验争议，间接利好国产「稳定可用」叙事**：36氪 7/2 集中报道 Fable 5 分类器误拦，部分开发者或更倾向 Sonnet 5 / Opus 4.8 或转向 **豆包 2.1 Pro / GLM-5.2 Coding Plan** 作为可预期成本的替代——但今日国产厂商 **无新版本发布**。
2. **Sonnet 5 隐性 Token 成本讨论延续**，强化国内厂商「明码标价 + 兼容 Claude Code/Cursor」策略价值：火山引擎豆包 Coding Plan、智谱 GLM Coding Plan 仍支持主流 Agent 工具链，用 **API 单价透明** 对比 Anthropic 新 tokenizer 不确定性。
3. **DeepSeek Harness 仍无官方产品**：招聘对标 Claude Code 叙事延续；与今日 Claude Code 2.1.198 + Fable 5 恢复形成产品层差距；国内 Agent Harness 竞争窗口仍在。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` / Python（见下） | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内厂商 CLI | 无统一官方 CLI 对标 Claude Code | — |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-02 22:01 | 官方博客、阿里云新闻 | 今日无公开更新 |
| 百度文心/Comate | 2026-07-02 22:01 | 百度 AI 开放平台 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-02 22:01 | 腾讯云新闻 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-02 22:01 | 火山引擎动态 | 今日无新版本（豆包 2.1 Pro 为 6/23） |
| 智谱 GLM/CodeGeeX | 2026-07-02 22:01 | 智谱开放平台 | 今日无新版本 |
| 月之暗面 Kimi | 2026-07-02 22:01 | Moonshot 平台 | 今日无公开更新 |
| DeepSeek | 2026-07-02 22:01 | deepseek.com | 今日无新产品发布 |
| 讯飞星火/iFlyCode | 2026-07-02 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-02 22:01 | 华为云新闻 | 今日无公开更新 |
| MiniMax | 2026-07-02 22:01 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-02 22:01 | 商汤科技新闻 | 今日无公开更新 |
| 昆仑万维 | 2026-07-02 22:01 | 昆仑万维公告 | 今日无公开更新 |
| 零一万物 | 2026-07-02 22:01 | 零一万物动态 | 今日无公开更新 |
| 面壁智能 | 2026-07-02 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 字节豆包 / Trae / 火山方舟（近期热点，今日无新版本）

豆包 2.1 Pro（6/23 发布）强化 Coding 与 Agent；**Coding Plan** 支持 Claude Code、Cursor、Cline、Codex CLI 等环境。在 Fable 5 分类器争议背景下，开发者可将底层模型切换为豆包 API 而 **不改 Agent 工作流**——但需自行评估 benchmark 与代码质量是否满足项目要求。今日轮询火山引擎动态 **无 7/2 新版本**。

### 智谱 GLM / CodeGeeX（近期热点，今日无更新）

量子位 6/27 [GLM-5.2 开源编程全球第二](https://www.qbitai.com/2026/06/436085.html) 仍为最强叙事。GLM Coding Plan 可接入第三方 Agent 工具链。量子位 7 月稿亦提及部分开发者认为 GLM-5.2 性价比优于 Sonnet 5——**该文观点，非官方确认**。今日轮询 **无新版本**。

### DeepSeek（Harness 筹备中）

36氪此前报道 Harness 团队招聘对标 Claude Code。**今日无产品发布**。建议关注 deepseek.com 与官方 GitHub 是否出现 CLI/Harness 仓库。

### 阿里通义 / 百炼

Qwen-AgentWorld（6/24）仍为最近重大更新。今日无新稿。

### 百度文心 / Comate

千帆 Agent Infra 叙事延续。今日无新版本。

### 腾讯混元 / CodeBuddy

WorkBuddy 企业版仍最新。今日无公开更新。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
export DEEPSEEK_API_KEY="your-api-key-here"

curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-chat",
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
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Refactor this function to use type hints."},
    ],
    stream=False,
)
print(response.choices[0].message.content)
```

### 接入 Claude Code 替代基座（社区方案，⚠️ 非官方）

```bash
export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
export ANTHROPIC_API_KEY="$DEEPSEEK_API_KEY"
# 注意：社区曾报告 Claude Code 对非官方 BASE_URL 有特殊检测逻辑，需自行验证兼容性
claude --version
```

**本地实测**：⚠️ 未实测（无 `DEEPSEEK_API_KEY`）

---
