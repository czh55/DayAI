# 国内 AI 厂商与编程产品 — 2026-06-18

> 检索时间：2026-06-18T22:02:47Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **智谱 GLM-5.2 MIT 全量开源（6/17）**：1M 上下文、Code Arena 开源第一、Hugging Face `zai-org/GLM-5.2` 可部署；Z.ai API 与 GLM Coding Plan 已上线，面向长程 Agentic Coding。
2. **DeepSeek Harness 团队招聘持续，官方 Code Agent 仍缺位**：5 月启动 Harness PM/研发招聘（对标 Claude Code），截至今日无「DeepSeek Code」公开发布；社区 DeepSeek-TUI 为非官方替代。
3. **Fable 5 免费窗口 6/22 截止**：国内开发者若依赖 Claude 生态，需同步评估 GLM-5.2 自部署、DeepSeek V4 API 或 Codex `/import` 迁移路径。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 见下方 SOP | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| GLM-5.2 API | — | ⚠️ 未实测（无 Z.ai API Key）；可参考官方文档 |
| 国内 IDE 插件 | — | ⚠️ Cloud Agent 无法安装 GUI 插件 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-06-18 22:02 | 通义灵码官网、百炼控制台 | 今日无公开更新 |
| 百度文心/Comate | 2026-06-18 22:02 | Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-18 22:02 | CodeBuddy 官网 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-06-18 22:02 | Trae/火山方舟 | 今日无公开更新 |
| 月之暗面 Kimi | 2026-06-18 22:02 | Kimi 官网 | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-18 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-18 22:02 | CodeArts 官网 | 今日无公开更新 |
| MiniMax | 2026-06-18 22:02 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-06-18 22:02 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-06-18 22:02 | 昆仑万维 AI | 今日无公开更新 |
| 零一万物 | 2026-06-18 22:02 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-06-18 22:02 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 智谱 GLM / CodeGeeX（今日有更新）

**发生了什么（6/13–6/17）**

- 发布并开源 **GLM-5.2**：753B 总参数 MoE、1M 上下文、128K 输出、IndexShare 稀疏注意力（1M 上下文 FLOPs 降 2.9×）
- **MIT License** 全量开放，无区域限制
- Code Arena **1595 分**（媒体称全球可用第一）；FrontierSWE 介于 Opus 4.7–4.8；Design Arena 全球第一
- 国产算力首日适配：华为昇腾、平头哥、摩尔线程等
- 思考档位：high / max effort，Coding Plan 场景 low/medium/high 映射至 high，xhigh/max/ultracode 映射至 max

**官方来源**：[Hugging Face zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)｜[量子位报道](https://www.qbitai.com/2026/06/436085.html)

**对开发者建议**：可用 vLLM/SGLang 本地部署或 Z.ai API；与 Claude Code 集成需自建 Harness 或使用 GLM Coding Plan；长程任务建议开启 thinking 并监控 token 成本。

### DeepSeek（Harness 招聘持续）

**状态**：官方编程 Agent **未发布**；Harness 团队招聘持续（Agent Harness PM/研发，北京，要求深度使用 Claude Code/Codex/Cursor/OpenClaw）。

**社区替代**：DeepSeek-TUI（非官方，Rust TUI）支持 Plan/Agent、MCP、子 Agent；可通过 Anthropic 兼容接口让 Claude Code 走 DeepSeek 后端（社区方案，非官方支持）。

**对开发者建议**：生产环境优先 DeepSeek V4 API + 自建 Harness；关注官方招聘动态作为产品发布前瞻信号。

### 小米 MiMo Code（非今日更新）

**状态**：6/11 MIT 开源终端 Agent，基于 OpenCode；**非今日新发布**。

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
    stream=False,
)
print(response.choices[0].message.content)
```

### GLM-5.2 API 参考（Z.ai，⚠️ 未实测）

```bash
# 参考 Z.ai 开放平台文档；端点与鉴权以官方为准
curl https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-5.2",
    "messages": [{"role": "user", "content": "Explain IndexShare attention."}]
  }'
```

**注意**：GLM-5.2 端点名称与 base URL 以 [Z.ai 官方文档](https://docs.z.ai) 为准；上例仅为结构示意。
