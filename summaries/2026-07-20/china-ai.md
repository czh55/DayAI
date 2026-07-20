# 国内 AI 厂商与编程产品 — 2026-07-20

> 检索时间：2026-07-20T22:00:56Z UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **Fable 5 分层今日落地，国内开发者需重新评估工具栈**：Pro 用户 Fable 5 转 credits 计费，$100 一次性额度约等于 200 万 output tokens；若重度使用 Claude Code，建议同步评估 Codex（5h 限额移除）或 Kimi K3 API 作为备选。

2. **DeepSeek 旧 API 名弃用倒计时 4 天**：`deepseek-chat`/`deepseek-reasoner` 将于 7/24 23:59（北京时间）完全停用，国内大量接入 DeepSeek 的 Agent 框架需立即迁移至 `deepseek-v4-flash`。

3. **TRAE Work 知识库 7/18 上线**：字节发布 40 万字 AI 工作 SOP，将 Loop/Harness 方法论产品化；Trae 2.0 SOLO 预告 7/21 发布。

## 本地实测总览

| 工具/API | 命令 | 结果 |
|----------|------|------|
| Claude Code | `claude --version` | ✅ 2.1.215 |
| Codex CLI | `codex --version` | ✅ 0.144.6 |
| DeepSeek API | `curl` 调用 | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`） |

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义/百炼 | 2026-07-20 22:00 | 通义官网、百炼控制台 | 禁令第 11 日；Qoder 仍推荐；无新版本 |
| 百度文心/Comate | 2026-07-20 22:00 | 文心一言、Comate 官网 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-07-20 22:00 | CodeBuddy 官网、GitHub | v2.103.0 仍最新 |
| 智谱 GLM/CodeGeeX | 2026-07-20 22:00 | 智谱开放平台 | GLM-5.2（6/27）仍最新 |
| 讯飞星火/iFlyCode | 2026-07-20 22:00 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-07-20 22:00 | 华为云官网 | 今日无公开更新 |
| MiniMax | 2026-07-20 22:00 | MiniMax 开放平台 | 今日无公开更新 |
| 商汤 | 2026-07-20 22:00 | 商汤官网 | 今日无公开更新 |
| 昆仑万维 | 2026-07-20 22:00 | 天工 AI 官网 | 今日无公开更新 |
| 零一万物 | 2026-07-20 22:00 | 零一万物官网 | 今日无公开更新 |
| 面壁智能 | 2026-07-20 22:00 | 面壁智能官网 | 今日无公开更新 |

## 分厂商详情

### 字节豆包/Trae/火山方舟

**TRAE Work 知识库 7/18 上线**（钛媒体 7/18 报道）：覆盖 2026/6/16–7/16 期间 AI 工具与工作流研究，提供「角色设定 + 任务边界 + 自检清单」Prompt 方法论。TRAE Work 已从 SOLO 模式（6/9 更名）扩展为 Work/Code/Design 三模式工作台。

Trae 2.0 SOLO 预告 **7/21 发布**（倒计时 1 天），定位上下文工程驱动的端到端软件交付。Trae-Agent 已于 7/4 开源。

### 月之暗面 Kimi

**Kimi K3 发布第 4 日**（7/17 发布）：2.8 万亿参数、100 万 token 上下文、KDA 混合线性注意力。官方承认整体仍略逊 Fable 5/GPT-5.6 Sol，但编程任务已超越 Opus 4.8。完整权重 **7/27 前** 开源。

可通过 kimi.com、Kimi App、Kimi Work、Kimi Code、Kimi API 使用。Cursor Composer 2.5 训练基座为 Kimi K2.5。

### DeepSeek

V4 预览运行中。**`deepseek-chat`/`deepseek-reasoner` 7/24 弃用倒计时 4 天**。

迁移路径：
- `deepseek-chat` → `deepseek-v4-flash`（`thinking: {"type": "disabled"}`）
- `deepseek-reasoner` → `deepseek-v4-flash`（`thinking: {"type": "enabled"}`）

`base_url`（`https://api.deepseek.com`）与 API Key 不变。

### 阿里通义/百炼

办公环境 Claude 全系禁令第 11 日仍生效，官方推荐 Qoder 作为替代。通义模型无新版本发布。

## DeepSeek API 调用 SOP（若无 Key 仍须提供）

### curl 示例

```bash
# 非思考模式（替代 deepseek-chat）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "用 Python 写一个快速排序"}],
    "thinking": {"type": "disabled"}
  }'

# 思考模式（替代 deepseek-reasoner）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "分析这段代码的时间复杂度"}],
    "thinking": {"type": "enabled"}
  }'
```

### Python 示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com"
)

# 非思考模式
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "实现一个 LRU 缓存"}],
    extra_body={"thinking": {"type": "disabled"}}
)
print(response.choices[0].message.content)

# 思考模式
response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[{"role": "user", "content": "设计一个分布式锁"}],
    extra_body={"thinking": {"type": "enabled"}}
)
print(response.choices[0].message.content)
```

### 迁移检查清单

1. `grep -r "deepseek-chat\|deepseek-reasoner" .` 搜索代码库
2. 检查环境变量、CI/CD 配置、网关路由规则
3. 在 staging 环境用生产级 prompt 验证迁移结果
4. **7/24 23:59 北京时间前完成部署**

---
