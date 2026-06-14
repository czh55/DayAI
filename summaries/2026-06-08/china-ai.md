# 国内 AI 开发者日报 — 2026-06-08

> 检索窗口：2026-06-07 22:00 UTC 至 2026-06-08 22:01 UTC。  
> 本地 CLI 目录：`/workspace/tools`。与 `china-media.md` 分工：本文偏「可复现操作与厂商动态」；媒体判断见 `china-media.md`。

---

## 文首国内综述（开发者必读）

1. **阿里 Qwen Code v0.17.0–v0.17.1（6/4 周报，本地 0.17.1）**：Computer Use 改为零配置内置、飞书 Channel 上线、长任务压缩引擎重写——三项均直接影响「桌面自动化 + 企业 IM 接入 + 长会话 Agent」落地路径，建议今日完成升级与冒烟测试。
2. **蚂蚁 AMP 智能体支付协议（6/8 量子位等集中报道）**：跨境 Agentic Commerce 从「能对话」进入「能授权、能支付、能赔付」阶段；做消费级 Agent 的开发者应开始设计 KYA 身份、预算上限与授权 UX，而非仅接 LLM。
3. **深圳 AI 创业大赛今日启动报名（6/8）**：四大赛道明确把 Agent、具身、Infra 并列国家队方向；DeepSeek 6 月初融资约 74 亿美元持续发酵，但 **6/8 无官方 changelog**——模型路由与 API 迁移仍应按 7 月退役时间表推进。

---

## 本地实测总览

测试环境：Ubuntu 24.04，`/workspace/tools` 通过 `npm install` 安装三件套。

| 工具 | 版本 | 实测命令 | 结果 |
|------|------|----------|------|
| Qwen Code | **0.17.1** | `qwen --version && qwen --help` | ✅ CLI 正常；`qwen channel status` 返回「No channel service is running」（未配置飞书凭证，符合预期） |
| Claude Code | **2.1.169** | `claude --version && claude --help` | ✅ 安装成功；帮助页含 `/loop` 相关能力说明；无 API Key 未跑推理 |
| Codex | **0.137.0** | `codex --version && codex doctor && codex features list` | ✅ CLI 正常；`doctor` 报 auth 缺失 ⚠️、WebSocket 401；`features list` 显示 `computer_use: stable` |

**统一安装命令（推荐在 `/workspace/tools` 执行）：**

```bash
cd /workspace/tools
npm install @qwen-code/qwen-code@latest @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/qwen --version      # 0.17.1
./node_modules/.bin/claude --version    # 2.1.169
./node_modules/.bin/codex --version     # codex-cli 0.137.0
```

**交叉验证（国内媒体）**：Qwen 功能细节见官方周报（2026-06-04）；AMP 见量子位 6/8 报道；大赛见量子位 6/8 报道；DeepSeek 融资见路透社 6/3–4 及晚点播客 163 期（V4 发布后，非 6/8 当日）。

---

## 阿里通义 / Qwen Code v0.17.0–v0.17.1

> 官方发布：v0.17.0（2026-06-03）、v0.17.1（2026-06-03，含 `@qwen-code/open-computer-use` 签名包）。  
> 来源：https://qwenlm.github.io/qwen-code-docs/en/blog/weekly-update-2026-06-04/ 、https://github.com/QwenLM/qwen-code/releases/tag/v0.17.1

### 功能一：Computer Use 零配置内置

**是什么**：9 个桌面自动化工具（`computer_use__list_apps`、`computer_use__get_app_state`、`computer_use__click` 等）注册为延迟加载内置能力；首次调用弹出标准工具授权对话框，用户点一次 Approve 后，自动执行 `npx -y open-computer-use mcp` 拉取二进制（约 50MB）、引导 macOS 无障碍/录屏权限、管理 MCP 服务生命周期。默认开启 `tools.computerUse.enabled: true`，可用任意模型后端，不绑定单一厂商。

**前置条件**
- Node.js 18+、可访问 npm registry
- macOS：需授予 Accessibility + Screen Recording（Linux 本环境可装 CLI，桌面自动化需图形会话）
- DashScope 或兼容 OpenAI API 的模型 Key（跑推理时）

**步骤与命令**

```bash
# 1. 升级
cd /workspace/tools && npm install @qwen-code/qwen-code@latest
./node_modules/.bin/qwen --version   # 确认 0.17.1

# 2. 交互模式启动（首次 Computer Use 会触发授权）
./node_modules/.bin/qwen -i "打开系统设置，截一张图"

# 3. 禁用 Computer Use（企业合规场景）
# 编辑 ~/.qwen/settings.json
# { "tools": { "computerUse": { "enabled": false } } }

# 4. 覆盖上游包版本（进阶）
export QWEN_COMPUTER_USE_PACKAGE=open-computer-use@latest
```

**示例 A（基础）**：在终端输入「列出当前打开的 GUI 应用」，模型首次调用 `computer_use__list_apps` 时你点 Approve，后续同会话内点击/截图类工具直通。

**示例 B（进阶）**：多步桌面任务——「打开浏览器，搜索 Qwen Code 文档，对第一个结果截图」。模型会批量加载 schema（`select:computer_use__list_apps,computer_use__get_app_state,computer_use__click`），配合截图触发压缩（见功能三）维持长任务上下文。

**本地测试**：本环境 `qwen --version` → `0.17.1` ✅；无图形桌面与 DashScope Key，**未执行真实桌面点击**，仅验证 CLI 与帮助文档一致性。

**已知问题**
- Linux 服务器无 DISPLAY 时 Computer Use 不可用
- 首次 `npx` 拉包依赖网络；企业内网需预置 `~/.qwen/computer-use/` 缓存
- v0.17.1 改用签名版 `@qwen-code/open-computer-use`，缓解 macOS Gatekeeper 拦截

**交叉验证**：官方周报 2026-06-04；GitHub PR #4590、#4726；对比 Anthropic Opus 4.8 Computer Use（厂商锁定）与 Gemini CLI 免费层 6/18 关停（开源工具政策风险），Qwen 路线强调「模型可选 + 零配置」。

---

### 功能二：飞书（Feishu）Channel

**是什么**：新增飞书/Lark 通道适配器，支持 WebSocket（默认，出站长连接无需公网 URL）与 Webhook 两种模式；回复以飞书互动卡片 v2 流式渲染，带「生成中」状态与 Stop 按钮；支持引用回复上下文、图片/文件附件、群聊多用户并发隔离。

**前置条件**
- 飞书企业账号 + 已创建应用（App ID / App Secret）
- 开放平台启用机器人能力、事件订阅「长连接」、订阅 `im.message.receive_v1`
- 权限：`im:message`、`im:message:send_as_bot`、`im:resource`
- 应用发布并审批通过

**步骤与命令**

```bash
# 1. 配置 ~/.qwen/settings.json（节选）
cat >> ~/.qwen/settings.json << 'EOF'
{
  "channels": {
    "my-feishu": {
      "type": "feishu",
      "clientId": "<your-app-id>",
      "clientSecret": "<your-app-secret>",
      "senderPolicy": "open",
      "sessionScope": "user",
      "cwd": "/path/to/your/project",
      "groupPolicy": "open",
      "groups": { "*": { "requireMention": true } }
    }
  }
}
EOF

# 2. 启动通道
./node_modules/.bin/qwen channel start my-feishu
# 或启动全部已配置通道
./node_modules/.bin/qwen channel start

# 3. 查看状态
./node_modules/.bin/qwen channel status

# 4. Webhook 模式（进阶，需公网可达）
# settings 中增加 "webhookPort": 9321, "verificationToken": "...", "encryptKey": "..."
# 飞书控制台请求 URL 设为 http://<server>:9321
```

**示例 A（基础）**：飞书私聊 @ 机器人发送「总结本周 git log」，卡片流式输出，可随时点 Stop。

**示例 B（进阶）**：群聊 @ 机器人并**引用**某条 PR 讨论消息提问；`sessionScope: user` 下每用户独立会话，多人同时提问互不干扰；`collapsible: true` 折叠超长回复避免触达飞书卡片元素上限。

**本地测试**：`qwen channel status` → `No channel service is running.` ✅（未配置凭证）；`qwen channel --help` 子命令完整。

**已知问题**
- 超长表格回复可能触达飞书卡片元素限制，卡片卡在「生成中」
- 群聊默认需 @mention；设 `requireMention: false` 可改为全量响应（注意噪声）
- Webhook 模式需 TLS/反代配置，生产环境优先 WebSocket

**交叉验证**：官方文档 `feishu.md`（bundled）；GitHub PR #4379（贡献者 @yuanyuanAli）；量子位 6/4 周报提及「与微信并列的企业 IM 通道」。

---

### 功能三：压缩引擎重写（Chat Compression Rewrite）

**是什么**：旧版按字符 70/30 切分历史，单轮长任务（典型 Computer Use：用户只说一句话、Agent 跑几十轮工具）找不到切分点，会丢弃全部截图与原用户 Prompt，导致压缩后「失明」。新版采用 **9 段结构化摘要 + 选择性恢复**：强制逐字保留每条用户消息；恢复最近 5 个文件（小文件嵌入全文，大文件仅路径）；恢复最近 3 张图片并附带 turn/工具元数据。另增截图触发压缩：`enableScreenshotTrigger` 默认 true，工具返回图片达 `screenshotTriggerThreshold`（默认 50）即触发，独立于 token 阈值。

**前置条件**
- Qwen Code ≥ 0.17.0
- 长会话或 Computer Use 场景（截图密集）

**步骤与命令**

```bash
# 1. 手动压缩并指定关注点（交互模式 slash 命令）
/compress focus on the auth bug

# 2. 环境变量调优（进阶）
export QWEN_COMPACT_MAX_RECENT_FILES=5      # 默认 5
export QWEN_COMPACT_MAX_RECENT_IMAGES=3     # 默认 3
export QWEN_COMPACT_SCREENSHOT_TRIGGER=1    # 启用截图触发
export QWEN_COMPACT_SCREENSHOT_THRESHOLD=50

# 3. settings.json（可选）
# model.chatCompression.enableScreenshotTrigger: true
# 注意：model.chatCompression.contextPercentageThreshold 已移除，阈值由 computeThresholds() 内部计算

# 4. 无头模式续跑（压缩检查点会恢复）
./node_modules/.bin/qwen -p "继续上次的桌面自动化任务" -c
```

**示例 A（基础）**：Computer Use 任务跑 30+ 轮后 token 逼近窗口，自动压缩触发；压缩后 Agent 仍能看到最近 3 张截图与你的原始指令「打开 Safari 并截图」。

**示例 B（进阶）**：截图密集型任务在 token 未达阈值前，因 `screenshotTriggerThreshold=50` 提前压缩；配合 `/compress focus on checkout flow` 让摘要聚焦支付模块；Plan 模式与后台 subagent 状态在压缩后自动恢复（PR #4688）。

**本地测试**：读取 bundled `settings.md` 确认压缩配置项与 0.17.1 一致 ✅；无 API Key 未触发真实压缩事件。

**已知问题**
- 无法完全「关闭压缩」；溢出时 API 层仍有 reactive overflow recovery
- 旧配置 `contextPercentageThreshold` 写入 settings 会被静默忽略
- 压缩通知曾误标截图触发类型（#4623 已修）

**交叉验证**：官方周报「Compression Rewrite」章节；PR #4599、#4688；虎嗅 6/8 Loop Engineering 文强调长时 Agent 上下文治理，与此功能方向一致。

---

## 蚂蚁 AMP 智能体支付（2026-06-08 报道）

**是什么**：蚂蚁国际推出移动智能体协议 AMP（Agentic Mobile Protocol），将智能体身份（Identity）、授权（Authorization）、支付（Payment）、结算（Settlement）、信任（Trust）纳入全球移动支付生态；核心组件含 **KYA（Know Your Agent）** 智能体信用评级与 **AgentSafePay**（扩展「敢付敢赔」至智能体交易）。已与 Google UCP、Visa/Mastercard 智能体卡支付合作，并支持千问、Gemini 等平台一键接入。

**前置条件（开发者视角）**
- 面向跨境/超级应用/数字银行场景的 Agent 产品
- 需设计用户授权链：钱包绑定 → 任务预算 → 超预算终止
- 商户侧需接入 KYA 评级与订单意图校验

**步骤与集成要点**
1. 用户三步：钱包绑定智能体 → 聊天框内直接支付（如订机票）→ 钱包实时管控各项任务支出并设预算。
2. 智能体支出超预算时任务自动终止（fail-closed）。
3. 商户收到 KYA 过低警示时可拒单；资金异常走 AgentSafePay 赔付。

**本地测试**：AMP 为协议层/商业基础设施，**无本地 CLI**；本日仅完成媒体报道交叉阅读。

**已知问题 / 开放问题**
- 国内支付宝 AI 钱包与海外 AMP 的 API 统一时间表未在 6/8 报道中细化
- KYA 评级算法与跨境合规细则待更多技术白皮书
- 与 MCP/UCP 的开发者 SDK 接入文档需持续跟踪

**交叉验证**
- 量子位：https://www.qbitai.com/2026/06/432587.html（2026-06-08）
- 蚂蚁集团 5/26 支付宝 AI 支付生态大会（韩歆毅讲话背景）
- `industry.md` 第 5 节「智能体商业基础设施」

---

## DeepSeek 融资动态（6 月初；6/8 无 changelog）

**是什么**：路透社 2026-06-03–04 报道，DeepSeek 拟首次外部融资约 **500 亿元人民币（约 74 亿美元）**，投后估值约 3500–4000 亿元人民币；梁文锋个人出资约 200 亿，腾讯拟投约 100 亿，宁德时代约 50 亿，国家 AI 基金、网易、京东等处于谈判，投资者总数或少于 10 家。资金拟用于算力集群、芯片与人才——标志多年「不融资」策略逆转。

**与开发者相关的既有事实（非 6/8 新发布）**
- V4 已于 2026-04-24 发布（V4-Pro / V4-Flash，默认 1M 上下文）
- 2026-05-22 V4-Pro API 价格永久下调约 75%
- `deepseek-chat` / `deepseek-reasoner` 将于 **2026-07-24 UTC** 退役
- 晚点 LateTalk **163 期**（V4 发布后录制）：V4 为组合创新（混合稀疏注意力、Muon、mHC、FP4），百万上下文「从理论进入实用」；内部评测称约 9% 工程师不会把 V4 Pro 作为编程首选

**前置条件 / 行动项**
```bash
# API 迁移检查（示例）
curl https://api.deepseek.com/v1/models -H "Authorization: Bearer $DEEPSEEK_API_KEY"
# 将路由表中的 deepseek-chat 替换为 deepseek-v4-pro 或 deepseek-v4-flash
```

**本地测试**：Qwen Code bundled 文档已含 DeepSeek V4 `reasoning_effort` 映射说明 ✅；本环境无 DeepSeek Key，未跑 API。

**交叉验证**
- Reuters：https://sg.finance.yahoo.com/news/deepseek-slated-draw-7-billion-041524836.html（2026-06-03）
- DeepSeek 官方：https://api-docs.deepseek.com/news/news260424（2026-04-24）
- 晚点播客 163：https://podcast.latepost.com/163（V4 发布后，**非 6/8 当日**）

---

## 深圳 AI 创业大赛（2026-06-08 启动报名）

**是什么**：「2026 新一代人工智能（深圳）创业创新大赛」今日正式启动报名（征集至 **7 月 15 日**），由深圳市网信办、宝安区政府、网易传媒联合主办。四大赛道：**AI 大模型与智能体**、**AI 硬件与具身智能**、**AI+文化**、**AI Infra**。总决赛 8 月底–9 月初在深圳宝安；复赛 8 月上旬北京路演。

**前置条件**
- 海内外 AI 创业企业 / 创新团队 / 高校科研成果转化项目
- 原创项目，未侵犯知识产权
- 曾进入 2023/2024 总决赛的项目不可重复参赛

**步骤**
1. 6/8–7/15：官网/二维码提交 BP（量子位文内扫码报名）
2. 7 月中旬：线上初赛
3. 8 月上旬：北京复赛路演
4. 8 月底–9 月初：深圳总决赛

**奖励摘要**：一等奖 1 名（权益总价值 100 万+，含网易曝光、资本对接、产业资源）；二等奖 3 名、三等奖 6 名。

**本地测试**：赛事为线下/报名流程，无 CLI；已核对量子位文内赛程与宝安「1+3+1」政策矩阵描述。

**交叉验证**
- 量子位：https://www.qbitai.com/2026/06/432581.html（2026-06-08）
- `industry.md` 第 5 节

---

## 今日轮询无更新

| 厂商/产品 | 轮询结论 | 最近有效更新 | 检索日期 |
|-----------|----------|--------------|----------|
| 百度文心 / Comate | 官网/changelog 无 6/8 条目 | — | 2026-06-08 |
| 腾讯混元 / CodeBuddy | 无公开更新 | — | 2026-06-08 |
| 字节豆包 / **Trae** | 无 6/8 changelog | **最近更新 2026-06-01**（浏览器选元素等） | 2026-06-08 |
| 智谱 GLM / CodeGeeX | 无公开更新 | — | 2026-06-08 |
| 月之暗面 Kimi | 无公开更新 | — | 2026-06-08 |
| 讯飞星火 / iFlyCode | 无公开更新 | — | 2026-06-08 |
| 华为盘古 / CodeArts 码道 | 无 6/8 新 changelog（码道为 2 月发布，InfoQ 2/27 文持续引用） | 2026-02-26 公测 | 2026-06-08 |
| MiniMax | 无公开更新 | — | 2026-06-08 |
| 商汤 / 天工 / 零一 / 面壁 | 无公开更新 | — | 2026-06-08 |

---

## 今日小结

| 优先级 | 行动 |
|--------|------|
| P0 | 升级 Qwen Code 至 0.17.1，验证 Computer Use 授权流与压缩配置 |
| P1 | 有飞书场景的团队配置 `qwen channel start`，WebSocket 优先 |
| P2 | DeepSeek API 模型名迁移（7/24 截止）；关注 AMP/KYA 协议白皮书 |
| P3 | Agent/Infra 创业者评估深圳大赛赛道与宝安政策包 |

**文件交叉索引**：Loop 范式 ↔ `industry.md` + `china-media.md`（虎嗅 6/8）；AMP ↔ `china-media.md`（量子位）；Qwen 压缩 ↔ `claude-code.md` 长会话议题。
