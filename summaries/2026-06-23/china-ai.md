# 国内 AI 厂商与编程产品 — 2026-06-23

> 检索时间：2026-06-23T22:03:24Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Fable 5 付费切换波及国内 Claude 用户**：订阅用户 6/23 起需 credits；国内通过 API/第三方网关调用 `claude-fable-5` 的路径按 $10/$50 计费，不受订阅窗口影响，但需关注出口管制恢复后的账号地域限制（官方 6/12–13 曾全球暂停）。
2. **智谱 GLM-5.2 开源编程热度延续**：6/17 MIT 开源后社区持续讨论其在 SWE-bench 与中文政企场景的性价比；今日无新版本发布，但 secondary 横评（搜狐、腾讯云开发者社区）仍将 GLM 系列列为国产编程第一梯队。
3. **DeepSeek Harness 招聘信号持续**：官方尚未发布 DeepSeek Code 终端产品，但招聘页持续招募 Agent Harness 工程师，与 OpenAI Harness Engineering 叙事形成对标——⚠️ 推测 DeepSeek 可能在 Q3 推出自有 CLI Agent。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.187 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.142.0 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内厂商 CLI | — | ⚠️ 未实测（无各厂商 API Key） |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-23 22:03 | 通义官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-23 22:03 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-23 22:03 | 混元、CodeBuddy 文档 | WorkBuddy 企业版（6/5）仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-06-23 22:03 | 火山引擎、Trae 官网 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-06-23 22:03 | 智谱开放平台、GitHub | GLM-5.2（6/17）仍最新 |
| 月之暗面 Kimi | 2026-06-23 22:03 | Kimi 开放平台 | 今日无公开更新 |
| DeepSeek | 2026-06-23 22:03 | deepseek.com、招聘页 | Harness 招聘持续；无 Code CLI |
| 讯飞星火/iFlyCode | 2026-06-23 22:03 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-23 22:03 | 华为云 CodeArts | 今日无公开更新 |
| MiniMax | 2026-06-23 22:03 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-06-23 22:03 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-23 22:03 | 昆仑万维 AI | 今日无公开更新 |
| 零一万物 | 2026-06-23 22:03 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-23 22:03 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 智谱 GLM/CodeGeeX（无今日更新，延续 6/17）

- **GLM-5.2**：6/17 MIT 开源，SWE-bench 与中文指令遵循为卖点
- **CodeGeeX**：IDE 插件持续维护，无 6/23 changelog
- **开发者建议**：中文政企全栈可继续评估 GLM-5.2；复杂 Agent 任务建议与 Claude/Codex 路由搭配

### DeepSeek（招聘信号，无产品发布）

- **DeepSeek V4-Pro**：API 按量 $3/$6 per M tokens（secondary 横评引用）
- **DeepSeek Code**：⚠️ 未发布；Harness 团队招聘持续
- **开发者建议**：日常编码 API 调用性价比仍高；关注官方是否 Q3 发布终端 Agent

### 腾讯 CodeBuddy / WorkBuddy

- **WorkBuddy 企业版**：6/5 发布，面向企业私有化 Agent 部署
- 今日无版本更新

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
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Refactor this function to use async/await:\n\n" + open("main.py").read()},
    ],
    stream=False,
)

print(response.choices[0].message.content)
```

### 环境变量配置

```bash
# ~/.bashrc 或项目 .env
export DEEPSEEK_API_KEY="sk-..."
```

| 步骤 | 说明 |
|------|------|
| 1 | 在 [DeepSeek 开放平台](https://platform.deepseek.com/) 注册并创建 API Key |
| 2 | 设置 `DEEPSEEK_API_KEY` 环境变量 |
| 3 | 使用 OpenAI 兼容 SDK，`base_url` 指向 `https://api.deepseek.com` |
| 4 | 编程任务推荐 `deepseek-chat`；推理任务推荐 `deepseek-reasoner` |

⚠️ 本环境未配置 `DEEPSEEK_API_KEY`，上述 SOP 未经本地实测验证。

## 多模型路由建议（研究员综合）

| 任务类型 | 推荐模型 | 理由 |
|----------|----------|------|
| 高频日常编码 | DeepSeek V4 Flash | 性价比最高（secondary 横评） |
| 中文政企全栈 | GLM-5.1/5.2 | 中文语感与合规 |
| 复杂 Agent 长程 | Claude Fable 5（credits）/ Codex | Harness 成熟度 |
| 阿里云生态 | 通义 Qwen3.5 Plus | 平台集成 |

---
