# 国内 AI 厂商与编程产品 — 2026-07-08

> 检索时间：2026-07-08T22:01:04Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **工信部 7/8 定调 Claude Code「危害严重」**：NVDB 公告受影响版本 2.1.91–2.1.196，建议立即卸载；与阿里 7/10 全员禁用形成政策—企业联动，国内政企环境应将 Claude Code 列为高风险软件。
2. **腾讯混元 Hy3 正式版 7/6 发布**：元宝同步上线 Agent 能力、免费交付办公文档；TokenHub day 0 接入开源社区；Agent 任务完成率 93.7%，多 Agent 协作派发正确率 92%。
3. **月之暗面 Kimi K2.7 Code 7/7 进入 GitHub Copilot Business/Enterprise**：首个开源权重模型进入 Copilot 模型选择器，由 GitHub 在 Azure 托管，按 provider 定价计费。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.205 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.143.0 |
| DeepSeek API | curl/Python 调用 | ⚠️ 未实测（无 Key） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.205 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.143.0
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-08 22:01 | 通义官网、百炼控制台 | 产品无新版本；**7/10 内部禁用 Claude** 政策倒计时 2 天 |
| 百度文心/Comate | 2026-07-08 22:01 | 文心一言、Comate 官网 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-08 22:01 | 豆包、Trae、火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-07-08 22:01 | 智谱 AI、CodeGeeX | GLM-5.2（6/27）仍最新 |
| 月之暗面 Kimi | 2026-07-08 22:01 | Kimi 官网、GitHub Changelog | Kimi 产品无新版本；K2.7 Code 7/7 进入 Copilot |
| DeepSeek | 2026-07-08 22:01 | DeepSeek 平台、API 文档 | V4 预览版运行中；旧模型名 7/24 停用倒计时 16 天 |
| 讯飞星火/iFlyCode | 2026-07-08 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-08 22:01 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-08 22:01 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-08 22:01 | 商汤科技 | 今日无公开更新 |
| 昆仑万维 | 2026-07-08 22:01 | 昆仑万维 | 今日无公开更新 |
| 零一万物 | 2026-07-08 22:01 | 零一万物 | 今日无公开更新 |
| 面壁智能 | 2026-07-08 22:01 | 面壁智能 | 今日无公开更新 |

## 分厂商详情

### 阿里巴巴（通义/百炼/Qoder）

- **7/10 起内部全面禁用 Claude 全系**（Sonnet、Opus、Fable、Claude Code），推荐自研 **Qoder** 替代
- 背景：Claude Code 2.1.91 起用户检测机制争议 + 工信部 7/8 NVDB 定调
- 通义/Qwen 模型产品本身今日无新版本发布
- 来源：[36氪 — 阿里禁用 Claude](https://36kr.com/newsflashes/3879528169025542)

### 腾讯（混元/CodeBuddy/元宝）

- **Hy3 正式版 7/6 发布**（preview 的 GA 版本）
- 元宝基于 Hy3 Agent 能力升级，用户输入需求即可交付 PPT/Word/Excel/PDF/HTML，**全部免费**
- TokenHub day 0 接入 Hermes、Kilo 等开源社区
- Agent 评测：任务完成率 93.7%（+12.7% vs preview）；6 Agent 协作派发正确率 92%（+13.5%）
- 来源：[InfoQ — 腾讯混元 Hy3](https://www.infoq.cn/article/2IGjsbCMxxHjLGPJ7tls)

### 月之暗面（Kimi）

- Kimi 产品本身今日无新版本
- **Kimi K2.7 Code** 7/7 进入 GitHub Copilot Business/Enterprise 模型选择器
- 首个开源权重模型在 Copilot 中可选；管理员须手动启用策略
- 来源：[GitHub Changelog](https://github.blog/changelog/2026-07-07-kimi-k2-7-now-available-for-copilot-business-and-enterprise/)

### DeepSeek

- V4 预览版持续运行中
- `deepseek-chat` / `deepseek-reasoner` 旧模型名将于 **2026-07-24 23:59** 停用（倒计时 16 天）
- 正式版 7 月中旬预告仍有效（⚠️ 以官方公告为准）
- 来源：DeepSeek 平台公告

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
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Write a Python function to merge two sorted lists."}
    ],
    stream=False
)

print(response.choices[0].message.content)
```

### 迁移提醒

- 7/24 前将 `deepseek-chat` 迁移至新模型名（⚠️ 以 DeepSeek 官方文档最新公告为准）
- 本地实测：⚠️ 未实测（无 `DEEPSEEK_API_KEY`）
