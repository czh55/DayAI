# 国内 AI 厂商与编程产品 — 2026-07-11

> 检索时间：2026-07-11T22:02:00Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **腾讯 CodeBuddy Code v2.103.0 发布**：新增 **DeepSeek V4 Pro** 与 **Flash** 双模型支持（1M 上下文、工具调用、图片理解）；`/doctor` 诊断面板增强 Session/Trace/Request ID 一键复制。
2. **阿里 Claude 禁令第 2 日**：办公环境 Claude 全系仍禁用，推荐 Qoder；通义/Qwen 模型本身无新版本，禁令实操进入稳定期。
3. **DeepSeek V4 预览 + 旧模型名弃用倒计时 13 天**：`deepseek-chat`/`deepseek-reasoner` 将于 7/24 停用，开发者须迁移至 V4 API 命名。

## 本地实测总览

| 工具/API | 命令 | 版本/结果 |
|----------|------|-----------|
| Claude Code | `./node_modules/.bin/claude --version` | ✅ 2.1.207 |
| Codex CLI | `./node_modules/.bin/codex --version` | ✅ 0.144.1 |
| DeepSeek API | curl/Python 调用 | ⚠️ 未实测（无 Key） |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.207 (Claude Code)
./node_modules/.bin/claude --help 2>&1 | head -5
./node_modules/.bin/codex --version    # codex-cli 0.144.1
./node_modules/.bin/codex doctor 2>&1 | tail -10
./node_modules/.bin/codex features list 2>&1 | head -15
```

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-11 22:02 | 通义千问、百炼平台 | 模型无新版本；禁令第 2 日持续 |
| 百度文心/Comate | 2026-07-11 22:02 | 文心一言、Comate 官网 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-07-11 22:02 | 豆包、Trae、火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-07-11 22:02 | 智谱 AI、CodeGeeX | GLM-5.2（6/27）仍最新 |
| 月之暗面 Kimi | 2026-07-11 22:02 | Kimi 官网 | Kimi 产品无新版本 |
| DeepSeek | 2026-07-11 22:02 | DeepSeek 平台 | V4 预览运行中；旧名 7/24 停用倒计时 13 天 |
| 讯飞星火/iFlyCode | 2026-07-11 22:02 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-11 22:02 | 华为云、CodeArts | 今日无公开更新 |
| MiniMax | 2026-07-11 22:02 | MiniMax 官网 | 今日无公开更新 |
| 商汤 | 2026-07-11 22:02 | 商汤科技 | 今日无公开更新 |
| 昆仑万维 | 2026-07-11 22:02 | 昆仑万维 | 今日无公开更新 |
| 零一万物 | 2026-07-11 22:02 | 零一万物 | 今日无公开更新 |
| 面壁智能 | 2026-07-11 22:02 | 面壁智能 | 今日无公开更新 |

## 分厂商详情

### 腾讯混元 / CodeBuddy — 今日有更新

- **CodeBuddy Code v2.103.0** 发布（官方 Release Notes 页面上线，检索日确认）
- 新功能：
  - **DeepSeek V4 Pro / Flash**：1M 上下文、工具调用、图片理解
  - **`/doctor` 增强**：Session ID、Trace ID、Request ID 展示与一键复制
- 改进：调试环境变量统一为 `CODEBUDDY_DEBUG`/`CODEBUDDY_DEBUG_SDK`；沙箱审批超时可通过 `CBC_SANDBOX_APPROVAL_TIMEOUT_MS` 配置
- 来源：[CodeBuddy v2.103.0 Release Notes](https://www.codebuddy.cn/docs/cli/release-notes/v2.103.0)
- **混元 Hy3 正式版**（7/6）仍为模型侧最近重大更新；IDE 4.9.15（6/26）仍最新

**CodeBuddy 接入 DeepSeek V4 SOP**

```bash
# 1. 启动 CodeBuddy Code
codebuddy

# 2. 配置 models.json（追加 deepseek-v4-pro）
# 见腾讯云 TokenHub 文档

# 3. 切换模型
/model
# 选择 deepseek-v4-pro 或 deepseek-v4-flash
```

### 阿里巴巴（通义/百炼/Qoder）— 禁令第 2 日

- **7/10 禁令持续生效**：办公环境禁用 Claude 全系，推荐 Qoder
- 通义/Qwen 模型产品今日无新版本
- 阿里员工：确认 Qoder 迁移完成，勿在办公网使用 Claude Code

### DeepSeek — 倒计时持续

- V4 预览版（`deepseek-v4-pro`、`deepseek-v4-flash`）运行中
- **7/24** 停用 `deepseek-chat`、`deepseek-reasoner`（倒计时 **13 天**）
- 腾讯 CodeBuddy、阿里 Qwen Code 均已内置 DeepSeek V4 接入路径

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
export DEEPSEEK_API_KEY="your-api-key-here"

curl https://api.deepseek.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
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
    base_url="https://api.deepseek.com/v1",
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Explain quicksort in 3 sentences."},
    ],
)
print(response.choices[0].message.content)
```

### 迁移提醒（7/24 前）

| 旧模型名 | 新模型名 |
|----------|----------|
| `deepseek-chat` | `deepseek-v4-flash` |
| `deepseek-reasoner` | `deepseek-v4-pro` |

⚠️ 本地环境无 `DEEPSEEK_API_KEY`，上述 SOP 未实测推理，仅验证命令格式。
