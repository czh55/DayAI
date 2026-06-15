# 国内 AI 厂商与编程产品 — 2026-06-15

> 检索时间：2026-06-15T22:00:27Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek Harness 团队招聘持续，官方 Agent 仍缺位**：InfoQ 与网易科技 5–6 月报道 DeepSeek 正组建 Harness 团队对标 Claude Code，要求熟悉 Claude Code/Codex/Cursor 等产品。截至今日无官方编程 Agent 发布，社区 DeepSeek-TUI（GitHub 10k+ Star）填补空白。
2. **小米 MiMo Code 开源余波（6/11）**：MIT 协议终端 Agent 引发国内「开源 Harness」讨论，但 36氪 与社区反馈早期版本稳定性不足（卡顿、误删全局 npm 包）。建议隔离环境试用。
3. **Fable 5 停服冲击跨境选型**：国内开发者若依赖 Claude API 做编程 Agent，需立即评估 DeepSeek V4 API、通义 Qwen-Coder、智谱 GLM-4 等备选，并关注 6/23 前 Anthropic 订阅政策变化（停服前：Fable 5 将移出订阅含用量）。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 见下方 SOP | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内 IDE 插件 | — | ⚠️ Cloud Agent 无法安装 GUI 插件 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-15 22:00 | 通义灵码官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-15 22:00 | Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-15 22:00 | CodeBuddy 官网 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-06-15 22:00 | Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-06-15 22:00 | 智谱开放平台 | 今日无公开更新 |
| 月之暗面 Kimi | 2026-06-15 22:00 | Kimi 官网 | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-15 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-15 22:00 | CodeArts 官网 | 今日无公开更新 |
| MiniMax | 2026-06-15 22:00 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-06-15 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-15 22:00 | 昆仑万维 AI | 今日无公开更新 |
| 零一万物 | 2026-06-15 22:00 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-15 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（Harness 招聘 + V4 API）

**状态**：官方编程 Agent **未发布**；5 月中下旬启动 Harness 团队招聘（终端集成、权限控制、Subagent 编排方向）。

**社区替代**：DeepSeek-TUI（非官方，GitHub Trending）基于 DeepSeek V4，支持 Plan/Agent/YOLO 三模式与 Auto Mode 成本路由。

**对开发者建议**：生产环境优先使用 DeepSeek V4 API + 自建 Harness；等待官方产品前可参考 DeepSeek-TUI 架构设计。

### 小米 MiMo Code（6/11 发布，窗口内相关）

**状态**：MIT 开源，基于 OpenCode；MiMo Auto 限时免费（MiMo-V2.5-Pro）。

**已知问题**（36氪/社区）：界面卡顿、API Key 配置失败、Agent 误删全局 npm 包、WSL/Termux 兼容性差。

**对开发者建议**：适合作为开源 Harness 研究样本，不建议直接用于生产仓库。

### 字节豆包（6/3 政策，窗口内引用）

**状态**：6 月 3 日宣布将推出「专业版」含软件开发服务；日常功能保持免费。App Store 页面显示订阅定价（最低 68 元/月）即将生效。

**对开发者建议**：关注专业版软件开发能力上线时间；当前编程场景仍以 Trae 国际化与 Marscode 预览为主。

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
        {"role": "user", "content": "Explain Python asyncio gather vs wait."},
    ],
    stream=False,
)
print(response.choices[0].message.content)
```

### 注意事项

- DeepSeek API 兼容 OpenAI SDK 格式，`base_url` 设为 `https://api.deepseek.com`
- V4 系列模型 ID 以 [DeepSeek 官方文档](https://platform.deepseek.com/api-docs/) 为准
- ⚠️ 本环境未实测：无有效 `DEEPSEEK_API_KEY`
