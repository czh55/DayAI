# 国内 AI 厂商与编程产品 — 2026-07-10

> 检索时间：2026-07-10T22:02:12Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **阿里 Claude 禁令今日（7/10）正式生效**：办公环境全面禁用 Anthropic 全系含 Claude Code，推荐 **Qoder** 替代；与工信部 7/8 NVDB 定调形成政策—企业共振，国内大厂合规进入实操日。
2. **Cursor 3.11 发布 Side Chats 与 Cloud Hooks**：国际侧 IDE Agent 工作流升级，国内开发者可通过个人设备使用，但与阿里办公禁令形成场景割裂。
3. **腾讯混元 Hy3 正式版（7/6）仍为近期最大国产 Agent 更新**：元宝 Agent 能力免费开放；阿里员工迁移 Qoder 外，Hy3/CodeBuddy 为另一候选。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.206 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.144.1 |
| DeepSeek API | curl/Python 调用 | ⚠️ 未实测（无 Key） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.206 (Claude Code)
./node_modules/.bin/claude --help 2>&1 | head -5
./node_modules/.bin/codex --version    # codex-cli 0.144.1
./node_modules/.bin/codex doctor 2>&1 | tail -10
./node_modules/.bin/codex features list 2>&1 | head -15
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 百度文心/Comate | 2026-07-10 22:02 | 文心一言、Comate 官网 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-10 22:02 | 豆包、Trae、火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-07-10 22:02 | 智谱 AI、CodeGeeX | GLM-5.2（6/27）仍最新 |
| 月之暗面 Kimi | 2026-07-10 22:02 | Kimi 官网、GitHub Changelog | Kimi 产品无新版本；K2.7 Code 7/7 进入 Copilot |
| DeepSeek | 2026-07-10 22:02 | DeepSeek 平台、API 文档 | V4 预览版运行中；旧模型名 7/24 停用倒计时 14 天 |
| 讯飞星火/iFlyCode | 2026-07-10 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-10 22:02 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-10 22:02 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-10 22:02 | 商汤科技 | 今日无公开更新 |
| 昆仑万维 | 2026-07-10 22:02 | 昆仑万维 | 今日无公开更新 |
| 零一万物 | 2026-07-10 22:02 | 零一万物 | 今日无公开更新 |
| 面壁智能 | 2026-07-10 22:02 | 面壁智能 | 今日无公开更新 |

## 分厂商详情

### 阿里巴巴（通义/百炼/Qoder）— 今日有更新

- **7/10 禁令正式生效**：办公环境禁用 Claude 全系（Sonnet、Opus、Fable、Claude Code），员工卸载客户端，推荐 **Qoder** 替代
- 通义/Qwen 模型产品本身今日无新版本；Qoder 截至 2026/5 全球 500 万+ 用户
- 背景：Claude Code 检测机制争议 + 工信部 7/8 NVDB 定调 + Anthropic 蒸馏指控
- 来源：[第一财经](https://www.yicai.com/news/103259844.html)｜[36氪](https://m.36kr.com/p/3879721635361032)｜[钛媒体](https://www.tmtpost.com/8052766.html)

**阿里员工迁移 SOP（研究员整理）**

1. 卸载办公设备 Claude Code：`npm uninstall -g @anthropic-ai/claude-code` 或删除桌面客户端
2. 安装 Qoder：访问通义灵码/Qoder 官网按企业指引部署
3. 将项目 `CLAUDE.md` 规则迁移为 Qoder 项目配置（概念对等）
4. 个人设备与办公设备分离；勿在办公网使用未经批准的海外 Agent 工具

### 腾讯（混元/CodeBuddy/元宝）

- **Hy3 正式版 7/6 发布**仍最新，今日无进一步更新
- 元宝 Agent 能力升级，办公文档交付免费
- 作为阿里禁令后国产替代候选之一

### 智谱（GLM/CodeGeeX）

- GLM-5.2（6/27）仍最新
- 量子位报道 GLM-5.2 性能与 Sonnet 5 接近，可作为成本敏感场景替代
- 今日无新版本

### 月之暗面（Kimi）

- Kimi K2.7 Code 7/7 进入 GitHub Copilot Business/Enterprise
- Kimi 产品本身今日无新版本

### DeepSeek

- V4 预览版持续运行
- `deepseek-chat` / `deepseek-reasoner` **7/24 停用**，倒计时 **14 天**
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
        {"role": "user", "content": "Refactor this function to use type hints."},
    ],
    stream=False,
)
print(response.choices[0].message.content)
```

> ⚠️ 本地未实测：Cloud Agent 环境无 `DEEPSEEK_API_KEY`。请在 [DeepSeek 开放平台](https://platform.deepseek.com/) 申请 Key 后执行上述命令。

---
