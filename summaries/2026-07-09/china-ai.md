# 国内 AI 厂商与编程产品 — 2026-07-09

> 检索时间：2026-07-09T22:02:15Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **阿里 Claude 禁令明日（7/10）生效**：全员须卸载 Claude 全系含 Claude Code，推荐 Qoder 替代；与工信部 7/8 NVDB 定调形成政策—企业共振，国内大厂合规窗口进入实操阶段。
2. **OpenAI Codex 0.144.0 并入 ChatGPT 桌面端**：7/9 国际侧最大编程 Agent 更新，国内开发者可通过 API/桌面端间接使用，但与国内禁令形成使用场景割裂。
3. **腾讯混元 Hy3 正式版（7/6）仍为近期最大国产 Agent 更新**：元宝 Agent 能力免费开放；TokenHub day 0 接入开源社区；国内替代 Claude Code 的候选之一。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.205 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.144.0 |
| DeepSeek API | curl/Python 调用 | ⚠️ 未实测（无 Key） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.205 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-09 22:02 | 通义官网、百炼控制台 | 产品无新版本；**7/10 内部禁用 Claude** 倒计时 1 天 |
| 百度文心/Comate | 2026-07-09 22:02 | 文心一言、Comate 官网 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-09 22:02 | 豆包、Trae、火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-07-09 22:02 | 智谱 AI、CodeGeeX | GLM-5.2（6/27）仍最新 |
| 月之暗面 Kimi | 2026-07-09 22:02 | Kimi 官网、GitHub Changelog | Kimi 产品无新版本；K2.7 Code 7/7 进入 Copilot |
| DeepSeek | 2026-07-09 22:02 | DeepSeek 平台、API 文档 | V4 预览版运行中；旧模型名 7/24 停用倒计时 15 天 |
| 讯飞星火/iFlyCode | 2026-07-09 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-09 22:02 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-09 22:02 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-09 22:02 | 商汤科技 | 今日无公开更新 |
| 昆仑万维 | 2026-07-09 22:02 | 昆仑万维 | 今日无公开更新 |
| 零一万物 | 2026-07-09 22:02 | 零一万物 | 今日无公开更新 |
| 面壁智能 | 2026-07-09 22:02 | 面壁智能 | 今日无公开更新 |

## 分厂商详情

### 阿里巴巴（通义/百炼/Qoder）

- **7/10 起内部全面禁用 Claude 全系**（Sonnet、Opus、Fable、Claude Code），推荐自研 **Qoder** 替代
- 7/9 为禁令生效前最后一日；通义/Qwen 模型产品本身今日无新版本
- 背景：Claude Code 检测机制争议 + 工信部 7/8 NVDB 定调
- 来源：[36氪 — 阿里禁用 Claude](https://36kr.com/newsflashes/3879528169025542)

### 腾讯（混元/CodeBuddy/元宝）

- **Hy3 正式版 7/6 发布**（preview 的 GA 版本），今日无进一步更新
- 元宝基于 Hy3 Agent 能力升级，办公文档交付全部免费
- Agent 评测：任务完成率 93.7%；6 Agent 协作派发正确率 92%
- 来源：[InfoQ — 腾讯混元 Hy3](https://www.infoq.cn/article/2IGjsbCMxxHjLGPJ7tls)

### 月之暗面（Kimi）

- **Kimi K2.7 Code 7/7 进入 GitHub Copilot Business/Enterprise** 模型选择器
- Kimi 产品本身今日无新版本
- 来源：GitHub Changelog

### DeepSeek

- V4 预览版持续运行
- `deepseek-chat` / `deepseek-reasoner` 旧模型名 **7/24 停用**，倒计时 15 天
- 建议迁移至 `deepseek-v4` 等新模型 ID

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
        {"role": "user", "content": "Explain quicksort in Python with doctest."},
    ],
)
print(response.choices[0].message.content)
```

> ⚠️ 未实测：本环境无 `DEEPSEEK_API_KEY`。7/24 前请将 `deepseek-chat` 迁移至官方文档最新模型名。

---
