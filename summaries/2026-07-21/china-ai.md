# 国内 AI 厂商与编程产品 — 2026-07-21

> 检索时间：2026-07-21T22:00:08Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **TRAE 2.0 SOLO 今晚正式发布**：字节跳动 AI 编程工具进入 2.0 阶段，SOLO 模式以 Context Engineer 定位覆盖需求→部署全流程；国际版 Pro 用户需 SOLO Code 解锁，国内版等待名单开放中。

2. **DeepSeek 旧 API 名弃用倒计时 3 天**：`deepseek-chat`/`deepseek-reasoner` 将于 7/24 15:59 UTC 退役，务必迁移至 `deepseek-v4-flash`/`deepseek-v4-pro` + thinking 参数。

3. **Kimi K3 发布第 5 日**：2.8T 参数旗舰持续可用，完整权重 7/27 开源倒计时 6 天；API 定价 $0.30–$3/MTok 输入，显著低于 Claude/GPT 前沿模型。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| Kimi Code CLI | — | ⚠️ 未实测（Cloud Agent 无 Kimi 环境） |
| TRAE SOLO | — | ⚠️ 未实测（需国际版 Pro + SOLO Code） |

```bash
# DeepSeek V4 迁移验证（需 API Key）
curl https://api.deepseek.com/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4-flash","messages":[{"role":"user","content":"ping"}]}'
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-21 22:00 | 通义官网、百炼控制台 | 禁令第 12 日，办公 Claude 仍禁用；模型无新版本 |
| 百度文心/Comate | 2026-07-21 22:00 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-21 22:00 | CodeBuddy 官网、GitHub | v2.103.0 仍最新 |
| 智谱 GLM/CodeGeeX | 2026-07-21 22:00 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 讯飞星火/iFlyCode | 2026-07-21 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-21 22:00 | 华为云官网 | 今日无公开更新 |
| MiniMax | 2026-07-21 22:00 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-21 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-21 22:00 | 昆仑万维官网 | 今日无公开更新 |
| 零一万物 | 2026-07-21 22:00 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-21 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 字节豆包/Trae/火山方舟 — TRAE 2.0 SOLO 发布（7/21）

**今日更新**：TRAE 2.0 SOLO 模式今晚正式发布。

**核心能力**：
- **Context Engineer**：智能获取需求文档、代码仓库、部署信息等上下文，动态规划路径
- **SOLO Builder**：自然语言/图片输入 → PRD → 编码 → 测试 → 部署
- **四大入口**：Doc、Terminal、Browser、IDE
- **实时跟随**：可视化 AI 操作阶段

**获取方式**：
- 国际版 Pro 用户：关注 TRAE.ai 微信公众号或抖音/小红书官方账号领取 SOLO Code
- 国内版：加入等待名单
- 定价：首月 $3，后续 $10/月起

**来源**：[官方公众号](https://mp.weixin.qq.com/s/4rLneoMkOe9PbNbPqiWtZw)｜[智东西 7/21](https://news.qq.com/rain/a/20250721A053NW00)

### 月之暗面 Kimi — K3 第 5 日

**状态**：Kimi K3（2.8T 参数、1M 上下文）持续可用。

**接入方式**：
- Kimi.com / Kimi Work 3.1.0+ / Kimi Code（`/model kimi-k3`）
- API：`model: "kimi-k3"`，$0.30/MTok cache-hit 输入

**倒计时**：完整权重 **7/27** 发布（剩余 6 天）

**来源**：[Kimi K3 Tech Blog](https://www.kimi.com/zh-cn/blog/kimi-k3)

### DeepSeek — 弃用倒计时 3 天

**状态**：V4 预览运行中，旧名仍可用但即将退役。

**关键日期**：2026-07-24 15:59 UTC

**迁移对照**：

| 旧模型名 | 新模型名 | thinking 参数 |
|----------|----------|---------------|
| `deepseek-chat` | `deepseek-v4-flash` | 不设置或 `disabled` |
| `deepseek-reasoner` | `deepseek-v4-flash` 或 `deepseek-v4-pro` | `{"type": "enabled"}` |

**来源**：[DeepSeek API Changelog](https://api-docs.deepseek.com/updates)

### 阿里通义/百炼 — 禁令持续

办公环境 Claude 全系仍禁用（第 12 日），推荐 Qoder 作为替代。通义模型今日无新版本发布。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
# 非思考模式（替代 deepseek-chat）
curl https://api.deepseek.com/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "用 Python 写一个快速排序"}],
    "max_tokens": 1024
  }'

# 思考模式（替代 deepseek-reasoner）
curl https://api.deepseek.com/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "分析这段代码的时间复杂度"}],
    "thinking": {"type": "enabled"},
    "max_tokens": 4096
  }'
```

### Python 示例

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com"
)

# 替代 deepseek-chat
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "Hello"}]
)
print(response.choices[0].message.content)

# 替代 deepseek-reasoner
response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role": "user", "content": "证明勾股定理"}],
    extra_body={"thinking": {"type": "enabled"}}
)
print(response.choices[0].message.content)
```

### 迁移检查清单

1. 全局搜索代码库中的 `deepseek-chat` 和 `deepseek-reasoner`
2. 更新 `.env`、`config.yaml`、CI 配置中的模型名
3. 对原 reasoner 流量添加 `thinking: {"type": "enabled"}`
4. 在 staging 环境验证后部署生产
5. **截止日期：2026-07-24 15:59 UTC**

---
