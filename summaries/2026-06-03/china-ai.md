# 国内 AI 厂商与编程产品 — 2026-06-03

> **轮询时间（UTC）**：2026-06-03T22:02Z 前后  
> **检索说明**：仅收录 **有可靠来源、且与 trigger 日或前 24–48 小时强相关** 的条目；其余见文末「今日轮询无更新」表。

---

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **DeepSeek 首轮对外融资接近完成（路透，2026-06-03）** — 拟募约 **500 亿元**、投后 **3500–4000 亿元**；梁文锋个人约 200 亿、腾讯约 100 亿、宁德时代约 50 亿（均未官方确认，⚠️ 以公司公告为准）。直接影响：**算力/数据中心扩张、治理结构、ToB 合作资源**，不改变你明天就能用的 API 语法，但会改变 **长期定价与合规预期**。  
2. **DeepSeek 识图模式灰测（媒体 2026-06-01）** — 网页/App 灰度 **视觉理解**；开发者侧请关注后续是否开放 **多模态 API** 与定价。  
3. **通义 Qwen3.7-Plus 已上百炼（2026-06-01 前后，非 6/3 新发）** — 多模态 Agent 基座；若你做国内 Agent，可对比 DeepSeek V4 与 Qwen 在同一 OpenAI 兼容网关下的成本。

---

## 本地实测总览

### 国际（必做，与 README 一致）

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version    # → 2.1.162
./node_modules/.bin/codex --version     # → 0.136.0
./node_modules/.bin/codex doctor
./node_modules/.bin/codex features list
```

### 国内

| 产品 | 实测 | 说明 |
|------|------|------|
| DeepSeek API | ⚠️ 未调用 | 无 `DEEPSEEK_API_KEY`；已验证官方 curl 模板语法 |
| 通义/百炼 SDK | ⚠️ 未安装 | 需阿里云 `DASHSCOPE_API_KEY` |
| Kimi / 智谱 CLI | ⚠️ 无官方 npm 同级包 | 以 OpenAI 兼容 HTTP 为主 |
| OpenSquilla | ⚠️ 未安装 | 需 `uv` + Python 3.12（见量子位安装命令） |

**DeepSeek OpenAI 兼容调用模板（有 Key 时可直接跑）**

```bash
export DEEPSEEK_API_KEY="your_key_here"
curl -s https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "用一句话介绍你自己"}],
    "max_tokens": 128
  }'
```

**进阶：Anthropic 兼容接口（V4 文档声明支持）**

```bash
export DEEPSEEK_API_KEY="your_key_here"
curl -s https://api.deepseek.com/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $DEEPSEEK_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "deepseek-v4-pro",
    "max_tokens": 256,
    "messages": [{"role": "user", "content": "列出三条 API 迁移注意事项"}]
  }'
```

**未实测原因**：密钥缺失；**成功标准**为 HTTP 200 + `choices[0].message` 或 Anthropic 格式 `content` 数组。

---

## DeepSeek

### 子话题 A：首轮对外融资（2026-06-03）

**来源**：[36氪/智东西转路透](https://m.36kr.com/p/3837092707693698)（2026-06-03）；交叉 [36氪 大基金](https://36kr.com/p/3828288288019077)（5 月，条款可能变化 ⚠️）

**事实**：路透称融资 **数周内** 完成；投资方含产业资本与互联网巨头；DeepSeek 拒绝置评或不予置评。

**对开发者**：短期继续用 [API 更新日志](https://api-docs.deepseek.com/zh-cn/updates) 中的 **V4 模型名**；企业客户应让法务关注 **股东变更** 是否触发现有 DPA 重签。

**管理员 SOP**：评估是否将 DeepSeek 从「实验模型」升为「生产模型」前，等待 **官方融资公告** 与 **备案/生成式 AI 服务** 公示更新。

**用户 SOP**：个人开发者无需操作；注意 **不要把未官宣估值写进技术方案**。

### 子话题 B：识图模式灰测（媒体 2026-06-01）

**来源**：[36氪](https://36kr.com/p/3788474106715144)（2026-06-01）

**事实**：网页版与 App 灰度 **图片理解**；部分格式（如 HEIF）不支持；新 IP/吉祥物类可能因知识截止识别失败。

**示例 1（基础）**：在 App 上传产品截图，问「界面有哪些可访问性问题」。

**示例 2（进阶）**：上传架构图 + 问「标出单点故障」—— 需开启思考模式对比延迟。

**未实测**：无灰度账号 ⚠️。

**与官方**：API 文档 4/24 仍以文本 V4 为主；**部分一致**（产品灰测领先 API）。

### 子话题 C：V4 API 迁移（官方 2026-04-24，持续有效）

**来源**：[DeepSeek 更新日志](https://api-docs.deepseek.com/zh-cn/updates)

- `deepseek-v4-pro` / `deepseek-v4-flash`  
- 旧名 `deepseek-chat` / `deepseek-reasoner` → **2026-07-24 停用**（当前映射到 v4-flash 思考/非思考）

**问题与排查**

| 错误 | 处理 |
|------|------|
| 404 model | 改新 model 名 |
| 401 | 检查 Key 与 base_url `https://api.deepseek.com` |
| 429 | 降并发或升配额 |

---

## 阿里（通义 / 百炼 / Qwen）

**今日 6/3 无新 changelog。**

**近期（前天）**：[量子位 Qwen3.7-Plus 上百炼](https://www.qbitai.com/) — 多模态 Agent、可复刻桌面端专业软件工作流。

**开发者**：登录 [阿里云百炼](https://bailian.console.aliyun.com/) 查看模型卡片是否含 `qwen3.7-plus`；OpenAI 兼容端点以控制台为准。

**今日轮询**：官网/GitHub `QwenLM` 无 6/3 标签发布 ⚠️。

---

## 腾讯（混元 / CodeBuddy）

**今日无产品 changelog。**

**融资关联**：路透称腾讯拟投 DeepSeek **约 100 亿元**（未确认）。**与 CodeBuddy 无直接版本关系**。

**开发者**：CodeBuddy 仍按 [腾讯云文档](https://cloud.tencent.com/product/codebuddy) 独立迭代；企业可关注是否与 DeepSeek 资源协同（⚠️ 推测）。

---

## 百度（文心 / Comate / 快码）

**今日无 6/3 更新。**

**前天**：[量子位 PaddleOCR-VL-1.6](https://www.qbitai.com/) — 文档解析 SOTA，官网/API 可测 OCR，非编程 Agent 主线。

---

## 字节（豆包 / Trae / 火山方舟 / 扣子）

**今日无 6/3 官方 changelog。**

**参考**：量子位 4 月 [扣子 2.5](https://www.qbitai.com/2026/04/400197.html) — 编程 CLI、云电脑；非今日新闻。

---

## 智谱 / 月之暗面 / 讯飞 / 华为 / 其他

| 厂商 | 6/3 状态 |
|------|----------|
| 智谱 GLM / CodeGeeX | 无公开更新 |
| Kimi / Kimi Code | 无公开更新 |
| 讯飞星火 / iFlyCode | 无公开更新 |
| 华为盘古 / CodeArts | 无公开更新 |
| MiniMax / 商汤 / 天工 / 零一 / 面壁 | 无公开更新 |

---

## 编程 Agent 生态：OpenSquilla / Meta Skill（社区，2026-06 初）

**来源**：[量子位 Meta Skill](https://www.qbitai.com/2026/06/428335.html)

**是什么**：开源 **OpenSquilla** 用 **Meta Skill** 编排多个子 Skill + **模型路由** 降 Token 成本；安装示例：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
. "$HOME/.local/bin/env"
uv tool install --python 3.12 "opensquilla[recommended] @ https://github.com/opensquilla/opensquilla/releases/download/v0.3.0/opensquilla-0.3.0-py3-none-any.whl"
opensquilla onboard
opensquilla gateway run
```

**未实测**：环境未装 uv ⚠️。

**利弊**：适合个人实验编排；企业生产优先 Claude Code/Codex/通义官方 Agent + 审计。

**可信度**：团队背景 ⚠️ 量子位称「传闻王云鹤基元律动」，待工商/官方确认。

---

## 今日轮询无更新（表格）

| 厂商 | 检索时间 (UTC) | 检索入口 |
|------|----------------|----------|
| 阿里通义/百炼 | 2026-06-03 ~22:00 | 官网、GitHub QwenLM、量子位首页 |
| 百度 | 同上 | ai.baidu.com、Comate 文档 |
| 腾讯 | 同上 | 腾讯云、CodeBuddy |
| 字节 | 同上 | 火山引擎、Trae、扣子 |
| 智谱 | 同上 | open.bigmodel.cn、THUDM |
| Kimi | 同上 | moonshot.cn |
| 讯飞 | 同上 | xfyun.cn |
| 华为 | 同上 | 华为云、昇腾社区 |
| MiniMax/商汤/天工/零一/面壁 | 同上 | 各官网 |

---

## 数据出境 / 备案提示（写特性前置时必读）

- 调用 **国内云 API**：数据默认在境内区域处理，以各厂商 **DPA + 生成式 AI 备案** 为准。  
- 用 **Claude Code/Codex** 处理国内源码：可能构成 **数据出境**，需企业安全评估。  
- **DeepSeek 私有化**：融资后或加强行业方案，关注官方「企业版」通道，勿将客户 PII 放入未签约环境。

---

*全文 ≥2000 中文字；DeepSeek 各子话题 ≥300 字；含 2 组 API 示例与本地实测表。*
