# 国内 AI 厂商与编程产品 — 2026-06-12

> **检索时间**：2026-06-12T22:01Z（UTC）  
> **轮询结论**：**当日（6/12）绝大多数头部厂商无公开 changelog/API 发版**；下文重点写 **48 小时内仍影响开发者的 Trae 发版**，以及媒体当日热议的 **云知声 U2**、**阶跃 Step 3.7 Flash**（非今日厂商公告）。  
> **本地实测**：见文末「本地实测总览」

---

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **评测叙事转向「真干活」**：量子位 6/12 报道 UC Berkeley **ALE（Agents' Last Exam）** 基准，GPT 5.5 + Codex 在通过率上略超 Claude Fable 5 + Claude Code——国内选型若只看 SWE-bench 需同步关注跨 GUI/多行业任务。（[量子位](https://www.qbitai.com/2026/06/434774.html)）

2. **编程 IDE 侧**：字节 **Trae CN v3.3.64–3.3.65**（6/9 发布）增加**企业版一键上传日志**，便于排障；内置 **Kimi-K2.6** 等模型此前已集成，今日 Trae 官网无新条目。（[docs.trae.cn](https://docs.trae.cn/ide_changelog)）

3. **宏观**：**G7 法国峰会**（6/15–17）将邀 Altman、Amodei、Hassabis 及 **Mistral** 等讨论 AI 监管——国内出海团队需关注欧美政策连带效应。（[Reuters 6/12](https://sa.marketscreener.com/news/tech-executives-to-attend-g7-summit-as-leaders-address-ai-online-safety-ce7f5cd9d98ff521)）

---

## 今日轮询无更新（检索时间 2026-06-12T22:01Z）

| 厂商 / 产品 | 监测源 | 今日结论 |
|-------------|--------|----------|
| 阿里通义千问 / 百炼 / Model Studio / Qwen-Coder | qianwen.aliyun.com、github.com/QwenLM | 今日无公开更新 |
| 百度文心 / Comate / 文心快码 | ai.baidu.com、Comate 更新日志 | 今日无公开更新 |
| 腾讯混元 / CodeBuddy | cloud.tencent.com、CodeBuddy 文档 | 今日无公开更新 |
| 智谱 GLM / CodeGeeX / Z.ai | open.bigmodel.cn、github.com/THUDM | 今日无公开更新 |
| 月之暗面 Kimi / Kimi Code / CLI | platform.moonshot.cn | 今日无公开更新 |
| DeepSeek / DeepSeek-Coder | platform.deepseek.com、github.com/deepseek-ai | 今日无公开更新（V4 系 4/24 已发） |
| 讯飞星火 / iFlyCode | xfyun.cn | 今日无公开更新 |
| 华为盘古 / MindSpore / CodeArts | huaweicloud.com | 今日无公开更新 |
| MiniMax / 商汤 SenseNova / 昆仑天工 / 零一万物 Yi / 面壁 MiniCPM | 各官网 | 今日无公开更新 |

---

## 字节豆包 / Trae / 火山方舟

### Trae CN v3.3.64–3.3.65（2026-06-09 发布，非今日）

#### 是什么

Trae（The Real AI Engineer）是字节跳动面向国内开发者的 AI IDE，支持 IDE 模式与 SOLO Agent 模式。v3.3.64–3.3.65 变更面小但**企业可运维性**增强：企业版支持**客户端一键上传日志**，降低远程排障成本。

#### 适用场景

- 企业团队统一使用 Trae CN，需向官方/support 提交诊断包  
- 已使用内置 Kimi-K2.6、通义等模型做日常编码

#### 前置条件

- Trae CN **企业版**（个人版无「一键上传日志」）  
- 升级至 v3.3.64+  
- 网络可访问火山引擎支持渠道

#### 详细使用步骤（管理员）

1. 确认组织许可证为 Trae 企业版  
2. 推送升级包或引导用户 Help → Check for Updates  
3. 在支持政策中说明：故障时通过 **设置 → 上传日志**（路径以客户端为准）收集包  
4. 日志出企业前做脱敏审计（可能含路径、片段代码）

#### 详细使用步骤（开发者）

1. 打开 Trae CN → **帮助 / 设置**  
2. 选择 **上传日志**（仅企业版可见）  
3. 复现问题后上传，记录工单号  
4. 继续用内置 **Kimi-K2.6** 等模型开发（无需额外 API Key）

#### 命令与配置示例

Trae 无公开 CLI 包；模型在 IDE 内选择：

```
设置 → 模型 → Kimi-K2.6（内置）
```

项目级 Agent 命令（`.trae/commands/`，v3.3.56+ 支持 3 层目录）：

```
.trae/commands/deploy/production.md
```

#### 本地测试结果

- ❌ 未安装 Trae 桌面（Linux 云 Agent 无 GUI）  
- **未实测原因**：Trae 为桌面 IDE，非 npm CLI  
- ✅ 已抓取 [changelog](https://docs.trae.cn/ide_changelog) 更新于 2026-06-11

#### 问题与解决方案

1. **找不到上传日志**：确认企业版；个人版换邮件反馈  
2. **Kimi 视频读取不可用**：视频能力仅个人版 K2.5/K2.6（5/15  changelog）

#### 官方 vs 社区交叉验证

| 来源 | 内容 | 一致性 |
|------|------|--------|
| [docs.trae.cn 6/9](https://docs.trae.cn/ide_changelog) | 企业版一键上传日志 | 基准 |
| [火山引擎社区 Kimi-K2.6](https://developer.volcengine.com/articles/7633059422998118438) | TRAE 首发内置 K2.6 | **一致**（发版日晚于 4/20 Kimi 发布） |

#### 利弊 + 分角色建议

- **个人**：免费内置模型性价比高  
- **团队**：企业日志上传缩短 MTTR  
- **合规**：日志上传涉及代码片段出境 — 需 DPA

### 火山方舟 / 豆包（编程相关）

- **今日无 API 或模型版本更新公告**  
- OpenAI 兼容调用仍经 `https://ark.cn-beijing.volces.com/api/v3`（以控制台为准）

**基础示例（curl，需 `ARK_API_KEY`）**：

```bash
export ARK_API_KEY="your-ark-key"
curl https://ark.cn-beijing.volces.com/api/v3/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ARK_API_KEY" \
  -d '{
    "model": "doubao-pro-32k",
    "messages": [{"role": "user", "content": "用 Python 写快速排序"}]
  }'
```

**进阶示例（流式）**：

```bash
curl https://ark.cn-beijing.volces.com/api/v3/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ARK_API_KEY" \
  -d '{
    "model": "doubao-pro-32k",
    "stream": true,
    "messages": [{"role": "user", "content": "解释 Trae SOLO 模式架构"}]
  }'
```

- ⚠️ 未实测（无 `ARK_API_KEY`）

---

## 云知声 U2（媒体热议，非 6/12 官方 changelog）

> 来源：[量子位 2026/06](https://www.qbitai.com/2026/06/432747.html) — 报道 U2 基座与 Token Hub，**非当日厂商 PDF/公告**

### 是什么

云知声发布 **U2** 通用/原生智能体基座，强调「智能密度 × Token 价值」，思考 token 约减 25%，已上 **Token Hub**，支持 OpenClaw/Hermes 等 Agent 脚手架。

### 对开发者含义

- 国内又一 **Agent 原生模型** 商业化路径（MaaS + 行业场景）  
- 若做医疗/客服垂直 Agent，可关注其兽牙平台与 API 定价  
- **今日无新 API 版本号**，不宜当作当日升级依据

### 前置条件

- 云知声 Token Hub 注册、实名与备案要求（以平台为准）  
- 数据不出境场景需企业私有化洽谈

### 示例（占位 — 以官网 OpenAI 兼容端点为准）

```bash
# 未实测 — 需从 Token Hub 控制台获取 base_url 与 key
export YUNZHISHENG_API_KEY="your-key"
export YUNZHISHENG_BASE_URL="https://api.example.yunzhisheng.com/v1"
curl "$YUNZHISHENG_BASE_URL/chat/completions" \
  -H "Authorization: Bearer $YUNZHISHENG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"u2","messages":[{"role":"user","content":"hello"}]}'
```

### 官方 vs 媒体

- **媒体**：量子位 — 融资与 Token ARR 叙事  
- **官方**：当日未检索到与量子位一一对应的 press release — 标注 **⚠️ 单信源营销成分**，关键数字待财报二次确认

---

## 阶跃星辰 Step 3.7 Flash（媒体，非 6/12 发版）

[量子位](https://www.qbitai.com/2026/06/429294.html) 报道 Step 3.7 Flash 在 OpenRouter / AA 榜速度与性价比领先。**今日阶跃官网无新 changelog**。开发者若追求高 tps Agent，可在 OpenRouter 按量调用 — 需自行注册与合规。

---

## DeepSeek

### 平台状态（2026-06-12）

- 最近重大更新：**DeepSeek-V4**（2026-04-24），`deepseek-v4-pro` / `deepseek-v4-flash`，1M context（[API Changelog](https://api-docs.deepseek.com/updates)）  
- **今日无新条目**

### OpenAI 兼容 API 实测模板

**基础**：

```bash
export DEEPSEEK_API_KEY="your-key"
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "写一个 Bash 函数统计仓库行数"}]
  }'
```

**进阶（思考模式 / 旧名映射）**：

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-reasoner",
    "messages": [{"role": "user", "content": "分析快速排序最坏复杂度证明"}]
  }'
```

- 文档说明 `deepseek-reasoner` 映射 v4-flash 思考模式；**2026-07-24 计划弃用旧名**  
- ❌ 本地未实测（无 `DEEPSEEK_API_KEY`）

### 备案 / 区域

- API 数据驻留与备案以 [platform.deepseek.com](https://platform.deepseek.com) 用户协议为准  
- 企业私有化需商务合同，非公开 CLI

---

## 阿里通义 / 百炼

- **今日无公开更新**  
- Qwen-Coder / 通义灵码插件请以 IDE 市场版本为准

**百炼 OpenAI 兼容 curl 模板（未实测）**：

```bash
export DASHSCOPE_API_KEY="your-key"
curl https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions \
  -H "Authorization: Bearer $DASHSCOPE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-plus",
    "messages": [{"role": "user", "content": "生成 React 表单组件"}]
  }'
```

---

## Kimi / 月之暗面

- **今日无 Kimi 官方发版**  
- **Trae 内置 Kimi-K2.6** 为集成渠道（见上）  
- Kimi Code / CLI：以 platform.moonshot.cn 文档为准；**无官方 npm 包在本环境实测**

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest

./node_modules/.bin/claude --version
# 2.1.176 (Claude Code)

./node_modules/.bin/claude --help | head -5
# Usage: claude [options] [command] [prompt]

./node_modules/.bin/codex --version
# codex-cli 0.139.0

./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · ... · 4 fail (auth/terminal 预期)

pip install openai -q
python3 -c "import openai; print('openai', openai.__version__)"
# openai 2.41.1  — 可用于兼容端点 curl 替代脚本，但今日无国内 key
```

| 国内产品 | 实测 | 说明 |
|----------|------|------|
| DeepSeek API | ❌ | 无 API Key |
| 百炼 / 方舟 | ❌ | 无 Key |
| Trae 桌面 | ❌ | 无 GUI |
| Kimi CLI | ❌ | 未提供官方 npm；跳过 |
| Qwen pip | ❌ | 当日文档未涉及特定 pip CLI 发版 |

---

## 管理员 vs 用户 SOP 摘要

| 产品 | 管理员 | 开发者 |
|------|--------|--------|
| Trae 企业版 | 推送版本、制定日志上传与脱敏政策 | 升级客户端、选内置模型、`.trae/commands` |
| 火山方舟 | 开通模型、配额、VPC | curl/SDK 调豆包/第三方模型 |
| DeepSeek | 企业合同、私有部署 | `deepseek-v4-flash` API + 旧名迁移计划 |

---

*DayAI | 检索完成 2026-06-12T22:01Z*
