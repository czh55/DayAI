# 国内 AI 厂商与编程产品 — 2026-06-22

> 检索时间：2026-06-22T22:00:57Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Fable 5 订阅免费窗口今日 UTC 截止，国内开发者或加速评估 GLM-5.2 自部署**：智谱 GLM-5.2（6/17 MIT 开源）被量子位称为「Fable 5 之下开源编程全球第一」；Fable 5 credits 定价（$10/$50 per M）可能推动成本敏感团队转向国产开源底座。
2. **DeepSeek Code Harness 招聘持续，产品仍未发布**：36氪 5–6 月跟进 Deli Chen 确认的北京 Harness 团队；今日无官方产品公告。
3. **微软 6/30 内部 Claude Code 关停进入 8 天倒计时**：对国内无直接影响，但印证「模型 API 开放、Agent 前端封闭」的大厂策略。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 见下方 SOP | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| GLM-5.2 API | — | ⚠️ 未实测（无 Z.ai API Key） |
| 国内 IDE 插件 | — | ⚠️ Cloud Agent 无法安装 GUI 插件 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-22 22:00 | 通义灵码官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-22 22:00 | Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-22 22:00 | CodeBuddy/WorkBuddy 官网 | 今日无公开更新（WorkBuddy 6/5 发布持续引用） |
| 字节豆包/Trae/火山方舟 | 2026-06-22 22:00 | Trae/火山方舟 | 今日无公开更新 |
| 月之暗面 Kimi | 2026-06-22 22:00 | Kimi 官网、kimi-cli | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-22 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-22 22:00 | CodeArts 官网 | 今日无公开更新 |
| MiniMax | 2026-06-22 22:00 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-06-22 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-22 22:00 | 昆仑万维 AI | 今日无公开更新 |
| 零一万物 | 2026-06-22 22:00 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-22 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 智谱 GLM / CodeGeeX（6/17 开源，今日无新版本）

**状态**：GLM-5.2 MIT 全量开源持续可用；1M 上下文；CodeGeeX 无独立 6/22 更新。

**量子位观点（secondary）**：在 Fable 5 之下拿下开源编程全球第一；Design Arena 品味评测全球第一；代表「开源长程 Coding Agent 底座」路线。

**对开发者建议**：Fable 5 窗口关闭后，长程 Agentic Coding 可试用 GLM-5.2 + 自建 Harness 或 Z.ai Coding Plan。

### DeepSeek（Harness 招聘持续，产品未发布）

**状态**：5/20 Deli Chen 确认组建 Harness 团队；招聘岗位持续；今日无官方产品公告。

**对开发者建议**：生产环境使用 DeepSeek V3/V4 API + 自建 Agent 循环；关注官方招聘作为产品发布前瞻信号。

### 腾讯混元 / CodeBuddy / WorkBuddy

**状态**：WorkBuddy 企业版（6/5 发布）持续被引用；今日无新版本。

### 阿里通义 / 百炼 / Qoder

**状态**：通义灵码、百炼今日无更新。InfoQ 6/10 预告阿里 **Qoder CLI** 将于 AICon 上海（6/26–27）分享 SDK 化与 Cloud Agents 集成。

### 月之暗面 Kimi

**状态**：kimi-cli 等终端工具入口存在；今日无公开更新。

---

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
        {"role": "user", "content": "Refactor this function to use async/await."},
    ],
    stream=False,
)

print(response.choices[0].message.content)
```

### 注意事项

- DeepSeek API 兼容 OpenAI SDK，仅需修改 `base_url`
- 长程 Agent 任务建议使用 `deepseek-reasoner` 模型（若可用）
- ⚠️ 本环境未配置 `DEEPSEEK_API_KEY`，上述命令未经实测

---
