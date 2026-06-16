# 国内 AI 厂商与编程产品 — 2026-06-16

> 检索时间：2026-06-16T22:00:27Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek Harness 团队招聘持续，官方 Agent 仍缺位**：5 月中下旬启动 Harness 团队（对标 Claude Code），InfoQ/网易 6 月初报道 DeepSeek Code 概念与 V4 推理优化，截至今日无官方编程 Agent 发布；社区 DeepSeek-TUI 填补空白。
2. **Fable 5 停服第 5 天，跨境 Harness 备选评估升温**：国内开发者若依赖 Claude API，需评估 DeepSeek V4 API、通义 Qwen-Coder、智谱 GLM-4 等备选，并关注 Codex 0.140.0 `/import` 迁移路径。
3. **Cursor Composer 2.5 与 Kimi K2.5 合作持续被引用**：虎嗅/量子位 6 月稿件指出 Cursor 通过 Fireworks 授权使用 Kimi K2.5 基座——对国内开发者意味着 Kimi 生态与 Cursor 训练数据飞轮间接关联，但 Cursor 本身非国内产品。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 见下方 SOP | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内 IDE 插件 | — | ⚠️ Cloud Agent 无法安装 GUI 插件 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-16 22:00 | 通义灵码官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-16 22:00 | Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-16 22:00 | CodeBuddy 官网 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-06-16 22:00 | Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-06-16 22:00 | 智谱开放平台 | 今日无公开更新 |
| 月之暗面 Kimi | 2026-06-16 22:00 | Kimi 官网 | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-16 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-16 22:00 | CodeArts 官网 | 今日无公开更新 |
| MiniMax | 2026-06-16 22:00 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-06-16 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-16 22:00 | 昆仑万维 AI | 今日无公开更新 |
| 零一万物 | 2026-06-16 22:00 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-16 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### DeepSeek（Harness 招聘 + V4 API）

**状态**：官方编程 Agent **未发布**；Harness 团队招聘持续（Agent Harness PM/研发，北京，要求深度使用 Claude Code/Codex/Cursor）。

**社区替代**：DeepSeek-TUI（非官方）基于 DeepSeek V4，支持 Plan/Agent 模式；可通过 Anthropic 兼容接口让 Claude Code 走 DeepSeek 后端（社区 SOP，非官方支持）。

**对开发者建议**：生产环境优先 DeepSeek V4 API + 自建 Harness；等待官方产品前参考 MiMo Code、DeepSeek-TUI 架构。

### 小米 MiMo Code（6/11 发布，窗口内相关）

**状态**：MIT 开源，基于 OpenCode；MiMo Auto 限时免费。**非今日新发布**。

**对开发者建议**：适合 Harness 研究样本，生产环境需隔离沙箱。

### 月之暗面 Kimi（Cursor 生态间接关联）

**状态**：今日无产品更新；虎嗅/量子位持续引用 Kimi K2.5 作为 Cursor Composer 2.5 基座——Kimi 官方已通过 X 声明 Fireworks 授权合作。

**对开发者建议**：Kimi K2.5 修改版 MIT 许可证对月营收 >2000 万美元产品要求界面标注；自行集成时需读 license。

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
        {"role": "user", "content": "Refactor this function to use type hints."},
    ],
)
print(response.choices[0].message.content)
```

### Claude Code 走 DeepSeek 后端（社区方案，⚠️ 非官方）

```bash
export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
export ANTHROPIC_AUTH_TOKEN="$DEEPSEEK_API_KEY"
export ANTHROPIC_MODEL="deepseek-chat"
claude --version  # 需 Claude Code CLI；推理走 DeepSeek
```

**注意**：映射规则与模型 ID 随 DeepSeek 更新可能变化；生产环境请查阅 [platform.deepseek.com](https://platform.deepseek.com) 最新文档。

---
