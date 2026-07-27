# 国内 AI 厂商与编程产品 — 2026-07-27

> 检索时间：2026-07-27T22:01:48Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Kimi K3 完整权重正式开源**：7/27 00:00 UTC Moonshot 发布 2.8T MoE 完整权重（MXFP4 约 1.4TB），Hugging Face `moonshotai/Kimi-K3`、GitHub `MoonshotAI/Kimi-K3`、ModelScope 同步上线；技术报告 `k3_tech_report.pdf` 与 MoonEP、FlashKDA、AgentEnv 一并开源。API 路径 `kimi-k3` 持续可用（$3/$15 per Mtok）。
2. **开放权重地缘政治波及国内厂商**：白宫指控 Moonshot 蒸馏 Fable 5 训练 K3，NVIDIA 50 家联名信呼吁不限制开放权重；Anthropic 7/27 发文澄清未主张禁令。国内开发者需关注 API 接入合规与供应商风险。
3. **除 Kimi 外其余 13 家厂商今日无公开更新**：阿里禁令第 18 日、DeepSeek 旧 API 名退役第 4 日，生态以 K3 开源为绝对焦点。

## 本地实测总览

| 命令 | 输出摘要 | 结果 |
|------|----------|------|
| `claude --version` | `2.1.220 (Claude Code)` | ✅ |
| `codex --version` | `codex-cli 0.145.0` | ✅ |
| `codex doctor` | 12 ok · 1 warn · 4 fail | ✅ 环境诊断完成 |
| DeepSeek API | 未执行（无 Key） | ⚠️ 见下方 SOP |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-27 22:01 | 通义官网、百炼控制台 | 禁令第 18 日；通义模型无新版本 |
| 百度文心/Comate | 2026-07-27 22:01 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-27 22:01 | CodeBuddy 发布页 | v2.103.0 仍最新 |
| 字节豆包/Trae/火山方舟 | 2026-07-27 22:01 | Trae、火山方舟 | TRAE 2.0 SOLO 第 7 日；无更新 |
| 智谱 GLM/CodeGeeX | 2026-07-27 22:01 | 智谱开放平台 | GLM-5.2 仍最新 |
| DeepSeek | 2026-07-27 22:01 | platform.deepseek.com | 旧 API 名已退役；无新版本 |
| 讯飞星火/iFlyCode | 2026-07-27 22:01 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-27 22:01 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-07-27 22:01 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-27 22:01 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-27 22:01 | 天工开放平台 | 今日无公开更新 |
| 零一万物 | 2026-07-27 22:01 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-27 22:01 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 月之暗面 Kimi — 今日有更新

**Kimi K3 权重开源（7/27 00:00 UTC）**

- **权重**：Hugging Face [moonshotai/Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)，MXFP4 量化约 1.4TB
- **代码与报告**：GitHub [MoonshotAI/Kimi-K3](https://github.com/MoonshotAI/Kimi-K3)，含 `k3_tech_report.pdf`
- **许可**：Kimi K3 License（非 Modified MIT；商业使用见许可条款）
- **基础设施开源**：MoonEP、FlashKDA、AgentEnv
- **自托管要求**：官方建议 8×H100 或 2TB+ VRAM；支持 vLLM、SGLang、TensorRT-LLM
- **API**：`kimi-k3`，定价 $0.30（cache hit）/ $3（cache miss）/ $15（output）per Mtok
- **Claude Code 接入**：可通过 `https://api.kimi.com/coding/` 自定义 Base URL 使用 Kimi K3

**本地实测**：⚠️ 未实测权重下载与推理（Cloud Agent 无 1.4TB 存储与 H100 集群）；API 未实测（无 Key）。

### 阿里通义/百炼 — 禁令持续

办公环境 Claude 全系仍禁用（第 18 日），官方推荐 Qoder 作为替代。通义模型与百炼平台今日无新版本公告。

### DeepSeek — API 迁移收尾

7/24 15:59 UTC 旧 API 模型名已退役，须使用 `deepseek-v4-flash`（轻量）与 `deepseek-v4-pro`（旗舰）。今日无新版本发布。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
export DEEPSEEK_API_KEY="your-api-key-here"

curl https://api.deepseek.com/v1/chat/completions \
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

### Python 示例

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com/v1",
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Refactor this function to use type hints."},
    ],
)
print(response.choices[0].message.content)
```

**注意**：旧模型名（如 `deepseek-chat`、`deepseek-coder` 等）已返回错误；迁移至 `deepseek-v4-flash` 或 `deepseek-v4-pro`。本地实测状态：⚠️ 未实测（无 `DEEPSEEK_API_KEY`）。

---
