# 国内 AI 厂商与编程产品 — 2026-07-29

> 检索时间：2026-07-29T22:01:30Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Unity 中国团结引擎 2.0 +「团结 Codely」**：7/28 发布可独立执行游戏开发任务的垂直 Agent，改造引擎底层使 AI 可调用 API；CEO 强调服务创意者而非「一句话生成游戏」。详见下方 Unity 条目。
2. **Kimi K3 开源第 3 日 + 全球大使计划**：7/28 启动全球大使招募，面向 Workshop/黑客松组织者；权重与 Infra 持续可下载，媒体讨论扩展至 EDA/芯片设计场景。
3. **验证鸿沟讨论升温**：虎嗅 7/29 集中报道组织级 AI 编程提效悖论与 SDD 方法论，对国内团队使用 Cursor/Codex/通义等工具的组织落地具有参考价值（非厂商发布，属行业透镜）。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `claude --version` | ✅ 2.1.220 |
| Codex CLI | `codex --version` | ✅ 0.146.0（npm `@latest` 已升级） |
| Codex doctor | `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| DeepSeek API | curl/Python | ⚠️ 未实测（无 Key） |
| Cursor 桌面 | — | ⚠️ 未实测（无 GUI） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version
./node_modules/.bin/codex --version
./node_modules/.bin/codex doctor 2>&1 | tail -5
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-29 22:01 | 通义官网、百炼控制台、Qoder 公告 | 禁令第 20 日；模型无新版本 |
| 百度文心/Comate | 2026-07-29 22:01 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-29 22:01 | CodeBuddy 发布页 | v2.103.0 仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-07-29 22:01 | Trae、火山方舟控制台 | TRAE 2.0 SOLO 第 9 日，无新稿 |
| 智谱 GLM/CodeGeeX | 2026-07-29 22:01 | 智谱开放平台、CodeGeeX | GLM-5.2 仍最新 |
| DeepSeek | 2026-07-29 22:01 | DeepSeek API 文档 | v4-flash/v4-pro 仍最新 |
| 讯飞星火/iFlyCode | 2026-07-29 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-29 22:01 | 华为云 CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-29 22:01 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-29 22:01 | 商汤 SenseNova | 今日无公开更新 |
| 昆仑万维 | 2026-07-29 22:01 | 天工、Skywork | 今日无公开更新 |
| 零一万物 | 2026-07-29 22:01 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-29 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 月之暗面 Kimi（有更新 — 第 3 日观察）

**K3 权重开源第 3 日**（7/27 00:00 UTC 起）：
- 权重、技术报告、MoonEP/FlashKDA/AgentEnv 持续可在 Hugging Face / GitHub 获取
- API 模型名 `kimi-k3` 无新版本发布
- **7/28 全球大使计划**：招募深度用户组织社区活动，收集真实场景反馈

**官方来源**：[Kimi K3 GitHub](https://github.com/MoonshotAI/Kimi-K3)｜[36氪大使计划报道](https://36kr.com/p/3915198234481800)

**对开发者**：自托管门槛仍高；API 或 Fireworks 托管为更现实路径。关注大使计划是否产出第三方集成案例。

### Unity 中国 / 团结 Codely（有更新 — 7/28 发布）

**团结引擎 2.0** 于 7/28 发布，配套 AI Agent **「团结 Codely」** 可独立执行游戏开发任务。引擎底层数据格式、文档与 API 已改造为 AI 可理解与调用。CEO 张俊波 7/29 虎嗅采访强调 AI 降门槛但不替代创意。

**来源**：[虎嗅采访](https://www.huxiu.com/article/4879209.html)

**对开发者**：游戏开发者可关注 Codely 工作流；与通用 IDE Agent（Cursor/Codex）形成垂直 vs 通用对比。

### 阿里通义/百炼（禁令持续）

办公环境 Claude 全系禁用第 20 日，官方推荐 Qoder。通义模型与百炼平台今日无新版本。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
export DEEPSEEK_API_KEY="your-api-key"

curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "system", "content": "You are a helpful coding assistant."},
      {"role": "user", "content": "Write a Python function to merge two sorted lists."}
    ],
    "temperature": 0.7,
    "max_tokens": 2048
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
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Explain the difference between async and sync in Python."},
    ],
    temperature=0.7,
    max_tokens=2048,
)

print(response.choices[0].message.content)
```

### 模型迁移提醒

旧 API 模型名（如 `deepseek-chat`、`deepseek-coder`）已退役第 6 日。须使用：
- `deepseek-v4-flash`：快速推理
- `deepseek-v4-pro`：高质量推理

⚠️ 本地未实测（无 `DEEPSEEK_API_KEY`）。请在 [DeepSeek 开放平台](https://platform.deepseek.com/) 获取 Key 后按上述 SOP 验证。
