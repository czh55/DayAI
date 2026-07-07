# 国内 AI 厂商与编程产品 — 2026-07-07

> 检索时间：2026-07-07T22:02:52Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **阿里巴巴 7/10 起内部禁用 Claude 全系**（含 Claude Code 客户端），推荐自研 **Qoder** 替代——国内头部科技公司首次大规模将 Anthropic 工具列入高风险软件名单。
2. **Anthropic 7/3 起全面封堵中国访问通道**（含境外子公司、API 中转、Azure 隐秘通道）——与阿里禁令形成双向脱钩，国产模型替代窗口打开。
3. **DeepSeek API 旧模型名 7/24 停用倒计时 17 天**：`deepseek-chat` → `deepseek-v4-flash`；`deepseek-reasoner` → `deepseek-v4-flash`（思考）或 `deepseek-v4-pro`（复杂 Agent）。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| DeepSeek API | `curl` 见下方 SOP | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |
| 国内 CLI 产品 | — | 今日无新版本可测 |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 百度文心/Comate | 2026-07-07 22:02 | 千帆、Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-07 22:02 | 混元、CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-07 22:02 | 豆包、Trae | 专业版定价仍最新；无 7/7 新产品 |
| 智谱 GLM/CodeGeeX | 2026-07-07 22:02 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 月之暗面 Kimi | 2026-07-07 22:02 | Kimi 官网 | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-07-07 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-07 22:02 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-07-07 22:02 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-07 22:02 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-07 22:02 | 天工 | 今日无公开更新 |
| 零一万物 | 2026-07-07 22:02 | 零一万物 | 今日无公开更新 |
| 面壁智能 | 2026-07-07 22:02 | 面壁智能 | 今日无公开更新 |

## 分厂商详情

### 阿里巴巴通义/百炼 + Qoder（有动态）

- **内部政策**：据 [36氪](https://m.36kr.com/p/3879721635361032)，**2026-07-10** 起全员卸载 Anthropic 产品（Sonnet、Opus、Fable、Claude Code），推荐使用 **Qoder**（阿里自研 AI 编程产品）。
- **背景**：Claude Code 隐蔽地区检测机制（2.1.91 起，7/2 回滚）+ Anthropic 中国通道封堵。
- **通义/Qwen 产品**：Qwen-AgentWorld（6/24）仍最新；今日无新版本 changelog。
- **建议**：阿里员工及合作方评估 Qoder/Qwen Code 工作流；外部开发者关注国内合规政策外溢。

### DeepSeek（有动态，非今日新产品）

- **API 迁移截止**：北京时间 **2026/07/24 23:59**，`deepseek-chat` 与 `deepseek-reasoner` 弃用。
- **映射关系**（官方 [定价页](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)）：
  - `deepseek-chat` → `deepseek-v4-flash`（非思考模式）
  - `deepseek-reasoner` → `deepseek-v4-flash`（思考模式）或 `deepseek-v4-pro`（复杂 Agent）
- **正式版时间**：7 月中旬预告仍有效。
- **建议**：本周内完成生产环境 `model` 参数迁移与回归测试。

### 智谱 GLM-5.2（媒体关注，无今日更新）

- 量子位/36氪称 GLM-5.2 性能接近 Sonnet 5——⚠️ 媒体观点；今日无新版本。

### 字节豆包（近期动态回顾）

- 豆包专业版三级阶梯：68/200/500 元/月仍最新；Trae IDE 无 7/7 公开更新。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例（V4-Flash，推荐迁移目标）

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
    "stream": false
  }'
```

### curl 示例（V4-Pro 思考模式，复杂 Agent）

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [
      {"role": "user", "content": "Refactor this module to use async/await."}
    ],
    "thinking": {"type": "enabled", "reasoning_effort": "max"}
  }'
```

### Python 示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "user", "content": "Explain quicksort in Python."}
    ],
)
print(response.choices[0].message.content)
```

### 迁移检查清单

1. 全局搜索 `deepseek-chat` / `deepseek-reasoner` 字符串
2. 按映射表替换 `model` 参数
3. 对 Agent 复杂任务评估是否升级 `deepseek-v4-pro`
4. 在 staging 跑回归测试后上线

---
