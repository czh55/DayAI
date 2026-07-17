# 国内 AI 厂商与编程产品 — 2026-07-17

> 检索时间：2026-07-17T22:00:37Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Kimi K3 昨夜发布，7/27 全面开源**：2.8 万亿参数，Arena.ai 前端能力榜第一；官方承认整体仍落后于 Fable 5 / GPT-5.6 Sol，但已超过其余所有模型。Kimi Work 可操控本地文件完成工程任务。

2. **DeepSeek API 旧模型名弃用倒计时 7 天**：`deepseek-chat` 与 `deepseek-reasoner` 将于北京时间 **2026-07-24 23:59** 完全停用。需迁移至 `deepseek-v4-flash` 或 `deepseek-v4-pro`。

3. **Grok Build 7/16 全面开源 + Trae 2.0 官宣 7/21**：xAI 将终端 Agent 完整源码发布至 GitHub（7.7k Star）；字节 Trae 2.0 将上线 SOLO 模式（上下文工程 + 端到端交付）。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.212 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.144.5 |
| DeepSeek API | curl 调用 | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.212 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.5
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-17 22:00 | 通义官网、百炼控制台 | 禁令第 8 日持续；模型无新版本 |
| 百度文心/Comate | 2026-07-17 22:00 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-17 22:00 | CodeBuddy 发布页 | v2.103.0 仍最新 |
| 智谱 GLM/CodeGeeX | 2026-07-17 22:00 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 讯飞星火/iFlyCode | 2026-07-17 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-17 22:00 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-17 22:00 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-17 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-17 22:00 | 天工 AI | 今日无公开更新 |
| 零一万物 | 2026-07-17 22:00 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-17 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 月之暗面 Kimi（有更新 — K3 发布）

**状态**：**Kimi K3** 于 7/16 晚间发布，7/27 全面开源并发布技术报告。

**官方/媒体来源**：[36氪 Kimi K3 实测](https://www.36kr.com/p/3899650690188936)

**要点**：
- Arena.ai 前端能力榜第一，超越 Fable 5 与 GPT-5.6 Sol（前端单项）
- 官方承认复杂任务仍落后于 Fable 5 / GPT-5.6 Sol
- Kimi Work 支持操控本地文件，类豆包办公模式
- 对 Cursor Composer 生态影响：Composer 2.5 基于 Kimi K2.5，K3 可能成为下一代基座

### DeepSeek（有更新 — 弃用倒计时）

**状态**：V4 预览版运行中；旧名倒计时 **7 天**（7/24 23:59 北京时间）。

**官方来源**：[DeepSeek API Change Log](https://api-docs.deepseek.com/updates)｜[V4 预览版公告](https://api-docs.deepseek.com/news/news260424)

**迁移要点**：
- `deepseek-chat` → `deepseek-v4-flash`（thinking disabled）
- `deepseek-reasoner` → `deepseek-v4-flash` + `thinking: {type: "enabled"}`
- `base_url` 保持 `https://api.deepseek.com` 不变

### 字节豆包/Trae/火山方舟（有更新 — Trae 2.0 预告）

**状态**：Trae 2.0 官宣 **7/21** 发布 SOLO 模式；Trae-Agent 核心组件已于 7/4 开源。

**来源**：[InfoQ Trae 2.0](https://www.infoq.cn/article/cuhIGtw8gWy5CW2aaxA0)

**要点**：SOLO 模式基于上下文工程，支持从需求到上线的端到端交付；与 Claude Code Loop Engineering 叙事形成国内对标。

### 阿里通义/百炼（禁令持续）

**状态**：第 8 日办公环境 Claude 全系（含 Claude Code CLI）仍禁用，内部推荐 Qoder。

**开发者建议**：阿里员工及合作方须使用 Qoder 或通义灵码；外部开发者不受影响但需关注供应链合规。

### xAI Grok Build（间接影响国内生态）

**状态**：7/16 全面开源，GitHub [xai-org/grok-build](https://github.com/xai-org/grok-build)。

**国内关联**：与 Cursor/SpaceX 合作关系背景下，Grok Build 开源为国内开发者提供了可自建的 Agent 参考实现，尤其对数据出境敏感的企业有吸引力。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
# 非思考模式（替代原 deepseek-chat）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "写一个 Python 快速排序"}],
    "thinking": {"type": "disabled"}
  }'

# 思考模式（替代原 deepseek-reasoner）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "分析这段代码的时间复杂度"}],
    "thinking": {"type": "enabled"}
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

# 替代 deepseek-chat
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "实现一个 LRU 缓存"}],
    extra_body={"thinking": {"type": "disabled"}},
)
print(response.choices[0].message.content)

# 替代 deepseek-reasoner
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "证明这个算法正确性"}],
    extra_body={"thinking": {"type": "enabled"}},
)
print(response.choices[0].message.content)
```

### 迁移检查清单

1. `grep -r "deepseek-chat\|deepseek-reasoner" .` 审计代码库
2. 更新 CI/CD 环境变量和配置文件
3. 在 7/22 前完成 staging 回归测试
4. 关注第三方 Agent 工具（iFlow CLI、LangChain 集成）是否已自动迁移
