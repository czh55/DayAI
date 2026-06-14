# 国内 AI 厂商与编程产品 — 2026-06-14

> 检索时间：2026-06-14T08:43–09:30 UTC｜触发日轮询

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **跨境前沿模型断供风险具象化**：Anthropic Fable 5 于 6 月 12 日全球停服，国内通过代理使用 Claude API 的团队需立即回退 Opus 4.8，并评估国产备选（DeepSeek V4-Pro、Qwen-Coder、GLM-5）。
2. **国内头部厂商当日无新产品发布**：阿里、百度、腾讯、字节、智谱、Kimi、DeepSeek 等均在触发日无公开 changelog；日常开发仍以 4–5 月发布的 V4/GLM-5 等版本为主。
3. **Loop/Goal 长程 Agent 范式已成国内媒体共识**：36氪等热议「Loop 工程」，与 Codex `/goal`、Claude `/loops` 产品化方向一致——国内 IDE（Trae、Comate）预计跟进长程任务能力。

---

## 本地实测总览

```bash
cd /workspace/tools

# 国际 CLI（必做）
npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version && ./node_modules/.bin/claude --help | head -3
./node_modules/.bin/codex --version && ./node_modules/.bin/codex doctor 2>&1 | tail -5
./node_modules/.bin/codex features list 2>&1 | head -10
```

| 命令 | 实际输出摘要 | 结果 |
|------|--------------|------|
| `claude --version` | `2.1.177 (Claude Code)` | ✅ |
| `claude --help` | 221 行，含 `--effort`、`--safe-mode` | ✅ |
| `codex --version` | `codex-cli 0.139.0` | ✅ |
| `codex doctor` | 12 ok · 4 fail（auth/terminal 预期） | ⚠️ |
| `codex features list` | 列出 70+ feature flags | ✅ |

**国内 CLI/SDK**

| 产品 | 实测 | 说明 |
|------|------|------|
| DeepSeek API | ⚠️ 未实测推理 | 无 `DEEPSEEK_API_KEY`；下方提供 curl/Python SOP |
| Qwen npm CLI | ❌ 无官方 `@qwen` CLI | 使用 OpenAI 兼容 HTTP API |
| Kimi CLI | ❌ 未安装 | Moonshot 以 HTTP API 为主 |

---

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 监测源 | 结论 |
|-----------|----------------|--------|------|
| 阿里通义千问/百炼/Qwen-Coder | 2026-06-14 08:55 | aliyun.com、github.com/QwenLM | 今日无公开更新 |
| 百度文心/Comate/文心快码 | 2026-06-14 08:56 | ai.baidu.com | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-14 08:56 | cloud.tencent.com | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 2026-06-14 08:57 | volcengine.com、trae.ai | 今日无公开更新 |
| 智谱 GLM/CodeGeeX/Z.ai | 2026-06-14 08:57 | open.bigmodel.cn、github.com/THUDM | 今日无公开更新 |
| 月之暗面 Kimi/Kimi Code | 2026-06-14 08:58 | platform.moonshot.cn | 今日无公开更新 |
| DeepSeek/DeepSeek-Coder | 2026-06-14 08:58 | platform.deepseek.com、github.com/deepseek-ai | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-14 08:59 | xfyun.cn | 今日无公开更新 |
| 华为盘古/CodeArts/MindSpore | 2026-06-14 08:59 | huaweicloud.com | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 2026-06-14 09:00 | 各官网 | 今日无公开更新 |

---

## DeepSeek

> 最近重大更新：2026-04-24 DeepSeek-V4 预览版（非今日发布，但仍是国内开发者主力 API）

### 是什么

DeepSeek-V4 提供 **V4-Pro**（1.6T/49B active）与 **V4-Flash**（284B/13B active）两档，默认 **1M token** 上下文，支持 Thinking/Non-Thinking 双模式。旧 ID `deepseek-chat` / `deepseek-reasoner` 将于 **2026-07-24 15:59 UTC** 退役。

### 适用场景

- **V4-Flash**：日常编码、高并发、成本敏感
- **V4-Pro**：复杂 Agent、长推理、对标闭源旗舰

### 前置条件

- [platform.deepseek.com](https://platform.deepseek.com) API Key
- 国内可直接访问；企业需注意数据合规与备案要求
- **数据出境**：若代码含敏感业务逻辑，优先私有化或国内 VPC 部署

### 详细使用步骤

1. 注册并创建 API Key
2. 将 `base_url` 设为 `https://api.deepseek.com`
3. `model` 使用 `deepseek-v4-flash` 或 `deepseek-v4-pro`
4. 用 OpenAI SDK 或 curl 调用
5. 7 月 24 日前迁移旧 model ID

### 命令与配置示例

**基础示例 — curl**

```bash
export DEEPSEEK_API_KEY="your_key_here"

curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {"role": "user", "content": "用 Python 写快速排序，附单元测试"}
    ],
    "max_tokens": 2048
  }'
```

**进阶示例 — OpenAI Python SDK（OpenAI 兼容）**

```python
from openai import OpenAI

client = OpenAI(
    api_key="your_key_here",
    base_url="https://api.deepseek.com",
)

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[
        {"role": "system", "content": "你是资深代码审查员。"},
        {"role": "user", "content": "审查以下 diff 的安全问题：..."},
    ],
    extra_body={"thinking": {"type": "enabled"}},
)
print(response.choices[0].message.content)
```

### 本地测试结果

```bash
# 无 API Key 时仅验证 SDK 安装
python3 -c "from openai import OpenAI; print('openai SDK OK')"
# openai SDK OK

# curl 无 Key 时预期 401
curl -s -o /dev/null -w "%{http_code}" https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-v4-flash","messages":[]}'
# 401（符合预期，端点可达）
```

| 项 | 结果 |
|----|------|
| SDK 安装 | ✅ |
| 无 Key 调用 | ⚠️ 401，端点可达 |
| 完整推理 | ❌ 未实测（无 Key） |

### 问题与解决方案

**401 Unauthorized** — 检查 `DEEPSEEK_API_KEY` 与 Bearer 头

**model not found** — 使用 `deepseek-v4-flash` / `deepseek-v4-pro`，勿用已路由的旧 ID

### 官方 vs 媒体交叉验证

| 来源 | 一致性 |
|------|--------|
| [DeepSeek V4 官方公告](https://api-docs.deepseek.com/news/news260424) | 基准 |
| [证券时报 集体上新报道](https://www.stcn.com/article/detail/3640328.html) | 部分一致（2 月旧闻，上下文长度升级） |

### 分角色建议

- **个人**：默认 V4-Flash；复杂任务切 V4-Pro thinking 模式
- **团队**：CI 中封装 model 参数；设 7 月迁移提醒
- **企业**：备案 + 内网网关；勿将 Fable 5 级任务单押跨境 API

---

## 阿里通义 / 百炼

### 今日状态

**今日无公开更新**（检索 2026-06-14 08:55 UTC）。最近可见动态为 6 月初通义千问开放品牌 Agent 接入（肯德基等），属产品生态非 IDE changelog。

### 开发者可操作特性（基线 SOP，非今日更新）

**百炼 OpenAI 兼容调用 — 基础示例**

```bash
export DASHSCOPE_API_KEY="your_key"

curl https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions \
  -H "Authorization: Bearer $DASHSCOPE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-plus",
    "messages": [{"role": "user", "content": "解释 RAII"}]
  }'
```

**进阶 — Qwen-Coder 代码任务**

```bash
curl https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions \
  -H "Authorization: Bearer $DASHSCOPE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3-coder-plus",
    "messages": [{"role": "user", "content": "将以下 Java 类转为 Kotlin data class：..."}]
  }'
```

### 前置条件（企业）

- 阿里云账号、百炼控制台开通
- **备案**：对外生成式服务需符合国内生成式 AI 备案要求
- **数据出境**：默认国内区域；跨境需单独合规评估

### 本地测试

❌ 无 `DASHSCOPE_API_KEY`；curl 模板已验证格式

### 管理员 vs 用户 SOP

| 角色 | 动作 |
|------|------|
| 管理员 | 百炼控制台创建 API Key、配置 RAM 权限、启用模型 |
| 开发者 | 使用 compatible-mode 端点；IDE 插件（通义灵码）用企业分配的 Key |

---

## 智谱 GLM / CodeGeeX

### 今日状态

**今日无公开更新**。GLM-5 仍为 2026 年 2 月发布的主力模型（Coding/Agent 开源 SOTA 定位）。

### 基线 API 示例

**基础**

```bash
export ZHIPU_API_KEY="your_key"

curl https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Authorization: Bearer $ZHIPU_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "glm-5",
    "messages": [{"role": "user", "content": "写二分查找"}]
  }'
```

**进阶 — CodeGeeX 风格多文件上下文（需 IDE 插件或长 messages）**

```python
# 概念示例：将多文件拼入 messages
files = {"main.py": "...", "utils.py": "..."}
content = "\n\n".join(f"### {k}\n{v}" for k, v in files.items())
# 发送至 glm-5 with max_tokens 8192
```

### 本地测试

❌ 无 API Key

### 媒体交叉验证

[国金证券/财联社 GLM-5 报道](https://www.cls.cn/detail/2291408) 与官方发布方向一致

---

## 月之暗面 Kimi

### 今日状态

**今日无公开更新**。龙珠领投等资本动态见晚点播客（非产品 changelog）。

### 基线 API

```bash
export MOONSHOT_API_KEY="your_key"

curl https://api.moonshot.cn/v1/chat/completions \
  -H "Authorization: Bearer $MOONSHOT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "kimi-latest",
    "messages": [{"role": "user", "content": "总结这篇论文方法"}]
  }'
```

### 本地测试

❌ 无 Key

---

## 百度 Comate / 腾讯 CodeBuddy / 字节 Trae

### 今日状态

三家均 **今日无公开 changelog**。

### 开发者指引（非今日更新）

| 产品 | 启用路径 | 备注 |
|------|----------|------|
| Comate | VS Code/JetBrains 插件市场安装「文心快码」| 需百度账号 |
| CodeBuddy | [copilot.tencent.com](https://copilot.tencent.com) 下载 IDE | 原 Copilot 国内版 |
| Trae | [trae.ai](https://www.trae.ai) 下载独立 IDE | 字节出品 |

### 本地测试

❌ 三款均为 GUI IDE/插件，本 Linux 无头环境未安装实测

### 未实测原因

需桌面 IDE 与厂商账号；已记录官方安装 SOP

---

## 华为 CodeArts / 讯飞 iFlyCode

### 今日状态

**今日无公开更新**。

### 企业场景

- **CodeArts**：华为云控制台开通 → 组织管理员分配项目 → 开发者 IDE 插件登录
- **iFlyCode**：讯飞开放平台申请 → VS Code 插件配置 AppID/APIKey

### 本地测试

❌ 需企业账号与私有化配置

---

## Fable 5 停服对国内开发者的连带影响（非厂商发布，必读）

尽管非国内厂商事件，但直接影响使用 Claude Code/API 的国内团队：

1. 将所有 `claude-fable-5` 替换为 `claude-opus-4-8` 或国产 `deepseek-v4-pro`
2. 评估 **Anthropic API 跨境** 是否纳入出口管制扩展风险
3. 在 RFP 中要求供应商提供**国内可替代模型**与切换 SLA

媒体解读见 [`china-media.md`](./china-media.md) 与 [`industry.md`](./industry.md)。

---

## 研究员结论

2026-06-14 是国内开发者「安静的一天」——无国产重磅发布，但 **Fable 5 全球停服** 是选型层面的地震。建议今日完成：DeepSeek 旧 model ID 迁移清单、百炼/智谱 API 连通性抽检、IDE 默认模型配置审计。
