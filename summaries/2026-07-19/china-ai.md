# 国内 AI 厂商与编程产品 — 2026-07-19

> 检索时间：2026-07-19T22:01:04Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Fable 5 窗口今日截止 + DeepSeek 弃用倒计时 5 天**：两条「硬截止日」叠加——Anthropic Fable 5 促销于今日 23:59 PT 结束，7/20 起 Pro 转 credits；DeepSeek `deepseek-chat`/`reasoner` 于 7/24 23:59（北京时间）停用。国内开发者若使用 DeepSeek API 做编程辅助，需立即完成迁移。

2. **Trae 2.0 SOLO 模式 7/21 发布（倒计时 2 天）**：字节跳动 AI 编程 IDE 将上线「Context Engineer」定位的 SOLO 模式，支持从 PRD 到部署的端到端交付。国际版 Pro 用户需 SOLO Code 解锁，国内版排队 waitlist。

3. **Kimi K3 发布第 3 日**：Arena 前端榜第一持续发酵；7/27 全面开源权重。Kimi Code CLI 与 API（`kimi-k3`）已可用，定价输入 2–20 元/MTok、输出 100 元/MTok。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.215 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.144.6 |
| DeepSeek API | curl 调用 | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.215 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.6
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-19 22:01 | 通义官网、百炼控制台 | 禁令第 10 日持续；模型无新版本 |
| 百度文心/Comate | 2026-07-19 22:01 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-19 22:01 | CodeBuddy 发布页 | v2.103.0 仍最新 |
| 智谱 GLM/CodeGeeX | 2026-07-19 22:01 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 讯飞星火/iFlyCode | 2026-07-19 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-19 22:01 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-19 22:01 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-19 22:01 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-19 22:01 | 天工 AI | 今日无公开更新 |
| 零一万物 | 2026-07-19 22:01 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-19 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 字节豆包/Trae/火山方舟（有更新 — Trae 2.0 预告）

**状态**：Trae 2.0 SOLO 模式官宣 **7/21** 发布；Trae-Agent 核心组件已于 7/4 开源。

**来源**：[InfoQ Trae 2.0](https://www.infoq.cn/article/cuhIGtw8gWy5CW2aaxA0)｜[火山引擎开发者社区](https://www.cnblogs.com/volcengine-developer/articles/19012798)

**要点**：
- SOLO 定位为「Context Engineer」，从 PRD 到部署端到端交付
- 国际版 Pro 用户通过 SOLO Code 解锁；国内版 waitlist：https://www.trae.cn/solo
- Trae 月活超 100 万，累计生成代码超 60 亿行

### 月之暗面 Kimi（有更新 — K3 发布第 3 日）

**状态**：Kimi K3 于 7/17 发布，今日为第 3 日；7/27 全面开源权重。

**官方来源**：[Kimi K3 技术博客](https://www.kimi.com/zh-cn/blog/kimi-k3)｜[Kimi API 文档](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)

**要点**：
- 2.8T 参数、1M 上下文；Arena 前端代码榜第一
- 官方承认整体仍落后于 Fable 5 / GPT-5.6 Sol
- Kimi Code CLI：`/model kimi-k3` 切换

### DeepSeek（有更新 — 弃用倒计时 5 天）

**状态**：V4 预览版运行中；旧名倒计时 **5 天**（7/24 23:59 北京时间）。

**官方来源**：[DeepSeek API Docs](https://api-docs.deepseek.com/)

**迁移要点**：
- `deepseek-chat` → `deepseek-v4-flash`
- `deepseek-reasoner` → `deepseek-v4-flash` + `thinking: {type: "enabled"}`
- `base_url` 保持 `https://api.deepseek.com` 不变

### 阿里通义/百炼（禁令持续）

**状态**：第 10 日办公环境 Claude 全系仍禁用，内部推荐 Qoder。

**开发者建议**：阿里员工及合作方须使用 Qoder 或通义灵码。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
# 非思考模式（替代 deepseek-chat）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "写一个 Python 快速排序"}],
    "stream": false
  }'

# 思考模式（替代 deepseek-reasoner）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "分析这段代码的时间复杂度"}],
    "thinking": {"type": "enabled"},
    "stream": false
  }'
```

### Python 示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com",
)

# 替代 deepseek-chat
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "实现一个 LRU 缓存"}],
)
print(response.choices[0].message.content)

# 替代 deepseek-reasoner
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "证明这个算法的正确性"}],
    extra_body={"thinking": {"type": "enabled"}},
)
print(response.choices[0].message.content)
```

⚠️ 以上 SOP 基于官方迁移文档编写，本地环境无 `DEEPSEEK_API_KEY`，未实测推理。
