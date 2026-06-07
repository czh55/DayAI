# 国内 AI 厂商与编程产品 — 2026-06-07

> 检索时间：**2026-06-07 22:30 UTC**  
> 轮询范围：阿里、百度、腾讯、字节、智谱、月之暗面、DeepSeek、讯飞、华为及 MiniMax 等  
> 本地实测：见文末「本地实测总览」

---

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **腾讯 WorkBuddy 企业版（6/5）**：从「超级个体」扩展到「超级团队」，CodeBuddy Harness 内核嵌入办公 Agent 套件——国内 ToB Agent 基建本周最重要发布。  
2. **北京智源大会「悟界」系列（6/6）**：Emu3、Brainμ、RoboOS 2.0 等开源/研究模型集中亮相，影响多模态与具身 Agent 上游。  
3. **行业侧 Harness 方法论（6/5 InfoQ）**：华为 openJiuwen **Auto Harness** 工程化落地，与腾讯、阿里 Qoder 1.0 的「任务运行时」叙事同频——**Agent 竞争从模型转向执行系统**。

**今日（6/7）绝大多数头部编程产品线无新版本 changelog**；下文仅展开有可靠来源的近期更新，其余列入轮询表。

---

## 今日轮询无更新（检索时间 2026-06-07）

| 厂商/产品 | 检索入口 | 结论 |
|-----------|----------|------|
| 阿里通义/Qwen/百炼/Qoder | qwen.ai、阿里云、GitHub QwenLM | 今日无公开更新 |
| 百度文心/Comate | ai.baidu.com、Comate 文档 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | volcengine.com、Trae 官网 | 今日无公开更新 |
| 月之暗面 Kimi/Kimi Code | moonshot.cn | 今日无公开更新 |
| 讯飞星火/iFlyCode | xfyun.cn | 今日无公开更新 |
| MiniMax/商汤/昆仑/零一/面壁 | 各官网 | 今日无公开更新 |

---

## 腾讯混元 / CodeBuddy / WorkBuddy

### 事件：WorkBuddy 企业版发布（2026-06-05）

**来源**：[量子位 2026-06-05](https://www.qbitai.com/2026/06/430758.html)、[虎嗅 2026-06-02](https://www.huxiu.com/article/4864991.html)

腾讯云在北京 AI 产业应用大会发布 **WorkBuddy Enterprise** 与 **Agent Suite**。产品主张「从超级个体到超级团队」：办公场景 Agent 与 **CodeBuddy**（插件/IDE/CLI 三形态）共享 **Harness 内核**——编排控制、上下文工程、Memory/Action/Hooks、SubAgent/AgentTeams、MCP&CLI、Skills。

关键数据点（媒体转述）：WorkBuddy 自 2026 年 3 月初发布以来 **43 个版本、约每 2 天一次迭代**；CodeBuddy 在腾讯内部覆盖 **90%+ 工程师**。

### 是什么

WorkBuddy 企业版不是单一聊天框，而是 **Agent OS + 垂直智能体套件**：通用办公（WorkBuddy）、研发（CodeBuddy）、创意（妙境 Miora）、交互设计（Ardot）等，底层由 **Harness API** 统一运行时驱动。

### 适用场景

**适合：** 已用企微/腾讯云的企业、希望统一研发+办公 Agent 政策的中大型团队  
**不适合：** 纯海外业务且无腾讯云合规路径的团队；强定制 IDE 且不愿接受腾讯模型路由的个体

### 前置条件

- 企业腾讯云账号与 WorkBuddy Enterprise 合约
- 国内生成式 AI **备案**与数据出境政策审查（跨境团队需法务评估）
- 管理员开通 Agent Suite 与模型权限

### 管理员开启 SOP

1. 登录腾讯云控制台 → **WorkBuddy Enterprise**
2. 创建组织 → 绑定企微/SSO
3. 开通 **CodeBuddy** 三形态分发策略（插件白名单、IDE 安装包、CLI token）
4. 配置 **Harness**：MCP 白名单、Hooks 审计、SubAgent 深度上限
5. 设定部门 spend cap 与模型路由（混元/第三方）
6. 发布内部 runbook，禁止员工私自接入未备案外部模型

### 业务/开发者使用 SOP

1. 安装 CodeBuddy 插件或 IDE（按企业指引）
2. CLI：`codebuddy`（以官方文档为准）登录企业账号
3. WorkBuddy 桌面/小程序创建「专家」并绑定 MCP（Jira、Git、内部 Wiki）
4. 研发任务：在 CodeBuddy 中 `@workspace` 引用仓库；办公任务在 WorkBuddy 流转
5. 敏感仓库：仅使用企业提供的 **私有化/专线** 端点

### 命令与配置示例

**基础（CodeBuddy CLI 示意，以官方最新为准）：**

```bash
# 登录（企业 SSO）
codebuddy auth login --enterprise

# 在仓库根目录发起 Agent 任务
cd my-service
codebuddy agent run "为 payment 模块补充单元测试并跑通 CI"
```

**进阶（MCP + Skills 组合）：**

```bash
codebuddy mcp add jira --url https://jira.corp.example/mcp
codebuddy agent run --skill code-review "审查本次 MR 的安全与性能"
```

### 本地测试结果

- ❌ **未实测** CodeBuddy/WorkBuddy CLI：无企业账号与官方 npm 包公开名（国内产品多通过安装包分发）
- 未实测原因：需腾讯云企业合约；非公开 npm `@tencent/codebuddy` 类包

### 问题与解决方案

**问题 1：与 OpenClaw 镜像抓取争议（虎嗅提及 3 月）**

- 排查：企业是否允许接入社区 Agent 镜像
- 解决：仅用腾讯官方 Harness 与备案模型

**问题 2：Harness 过严导致 Agent 频繁失败**

- 解决：管理员放宽 MCP 白名单；在 Harness 中增加「只读探索」profile

### 官方 vs 媒体

| 信源 | 一致性 |
|------|--------|
| 量子位 6/5 通稿 | ✅ 与大会发布事实一致 |
| 虎嗅 6/2 评论 | ⚠️ 强调「非两年前规划、靠市场热度跟进」——属分析，非官方否认 |

### 分角色建议

- **个人**：继续国际工具为主；关注 CodeBuddy CLI 是否开放个人版
- **团队**：试点 WorkBuddy + CodeBuddy 统一审计
- **企业合规**：优先 Harness 全链路日志与私有化

---

## 智谱 / 智源（悟界系列，2026-06-06）

### 事件

第七届北京智源大会发布 **悟界** 系列（36氪、量子位首页提及）：**Emu3**（原生多模态世界模型）、**见微 Brainμ**（脑科学多模态基础模型，Science 合作成果）、**RoboOS 2.0 / RoboBrain 2.0**、**OpenComplex2**（全原子微观生命模型）。

### 对编程 Agent 的间接意义

不直接替代 IDE，但为 **具身 Agent、科学代码生成、仿真环境** 提供基础模型与数据接口；未来可能通过智谱开放平台/API 进入开发者工具链。

### 本地测试

- ❌ 未实测权重下载与推理（需 GPU 与申请渠道）

### 开发者建议

关注 Hugging Face `THUDM` / 智源 GitHub 组织；机器人/仿真开发者预研 **RoboOS** 编排接口。

---

## DeepSeek

### 近期更新（非 6/7 当日）：识图模式灰测（2026-06-01 前后）

**来源**：[36氪](https://www.36kr.com/p/3788474106715144)、[技术报告 GitHub](https://github.com/deepseek-ai/Thinking-with-Visual-Primitives)

DeepSeek 网页/App 灰度 **识图模式**，技术路线「视觉原语」（坐标/边界框）+ V4-Flash 语言主干；论文 *Thinking with Visual Primitives* 已公开。

### 前置条件

- DeepSeek 账号；灰度命中（非全量）
- API：`deepseek-v4-pro` / `deepseek-v4-flash`（4/24 起）；旧名 `deepseek-chat` **2026-07-24 停用**

### 详细使用步骤（API 基础）

1. 在 [platform.deepseek.com](https://platform.deepseek.com) 创建 API Key
2. 设置环境变量 `DEEPSEEK_API_KEY`
3. 调用 OpenAI 兼容或 Anthropic 兼容端点

### 命令与配置示例

**基础（OpenAI 兼容 chat）：**

```bash
export DEEPSEEK_API_KEY="your-key-here"
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "用 Python 写快速排序"}]
  }'
```

**进阶（Anthropic 兼容 + 思考模式，示意）：**

```bash
curl https://api.deepseek.com/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $DEEPSEEK_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "deepseek-v4-pro",
    "max_tokens": 4096,
    "messages": [{"role": "user", "content": "分析这段代码的时间复杂度"}]
  }'
```

### 本地测试结果

```bash
$ curl -s -o /dev/null -w "%{http_code}" https://api.deepseek.com/
# 需有效 key 才能 200；无 key 时仅验证端点可达

$ pip show openai 2>/dev/null || echo "openai sdk not installed"
```

- ⚠️ **无 DEEPSEEK_API_KEY**，未执行真实 completion
- ✅ API 文档 [api-docs.deepseek.com/zh-cn/updates](https://api-docs.deepseek.com/zh-cn/updates) 与媒体对 V4/识图描述一致

### 问题与解决方案

**问题 1：识图灰度未命中**

- 解决：等待全量；或使用 API 多模态端点（若已开放）

**问题 2：仍用 `deepseek-chat` 报错（7/24 后）**

- 解决：迁移至 `deepseek-v4-flash` / `deepseek-v4-pro`

### 备案/数据出境

- 使用官方 API：数据经国内主体处理，适合国内合规场景
- 出海产品：评估用户数据是否构成出境；企业私有化部署另议合同

---

## 华为云 CodeArts / Agentic AI（2026-06-04 媒体）

**来源**：量子位 [华为云 Agentic AI 系列](https://www.qbitai.com)（前天 18:46 条目）

华为云发布 **Agentic AI 系列新品**，定位「硅基黑土地」；与 **openJiuwen Auto Harness**（InfoQ 6/5）形成「国产 Agent OS」叙事互补。

### 开发者动作

- 已用华为云 DevCloud/CodeArts 团队：关注 Agent 运行时是否集成到现有 CI
- 未用华为栈：暂无需迁移；记录为 **国产 Harness 备选**

---

## 阶跃星辰 Step 3.7 Flash（2026-06-05，关联竞品）

量子位报道 **Step 3.7 Flash** 登顶 AA 榜速度/性价比/端到端（[链接](https://www.qbitai.com) 前天 14:12）。非编程 IDE，但影响国内 **Coding 模型选型** 性价比参照。

---

## 阿里 Qoder 1.0（5 月，延续参考）

虽非本周发布，仍是国内「编程 Agent 工作台」标杆：**Quest 视窗、Task Runtime、知识引擎**（代码保留率 +11%、Token -40%）。开发者若评估国内替代 Cursor，应优先试用 Qoder 1.0 Windows/macOS/Linux 客户端。

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest

# 国际 CLI（必做）
./node_modules/.bin/claude --version
# 2.1.168 (Claude Code)

./node_modules/.bin/claude --help | head -20
# ✅ 正常

./node_modules/.bin/codex --version
# codex-cli 0.137.0

./node_modules/.bin/codex doctor
# ⚠️ 无 auth；features/plugins/multi_agent stable

./node_modules/.bin/codex features list | head -20
# ✅

# 国内 DeepSeek（需 key）
# export DEEPSEEK_API_KEY=...
# curl api.deepseek.com/chat/completions ...
# 本环境：跳过，仅文档模板
```

| 产品 | 实测 | 说明 |
|------|------|------|
| Claude Code npm | ✅ 2.1.168 | 无 OAuth/API 未跑推理 |
| Codex npm | ✅ 0.137.0 | 无 login |
| DeepSeek API | ⚠️ 未调用 | 无 key |
| CodeBuddy/WorkBuddy | ❌ | 企业分发，无公开 npm |
| Qoder/Kimi CLI | ❌ | 未提供本环境可装官方 CLI |

---

## 参考链接

- [量子位 WorkBuddy 企业版](https://www.qbitai.com/2026/06/430758.html)
- [虎嗅 腾讯 AI 新牌](https://www.huxiu.com/article/4864991.html)
- [InfoQ openJiuwen Auto Harness](https://www.infoq.cn/article/lk4PwQKXhgPSlM7a8ACU)
- [DeepSeek API 更新日志](https://api-docs.deepseek.com/zh-cn/updates)
- [36氪 DeepSeek 识图](https://www.36kr.com/p/3788474106715144)
