# Cursor 每日技术文档 — 2026-07-28

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Start 公告](https://cursor.com/blog/cursor-start-india)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 28 日 Cursor 发布 **Cursor Start**——面向印度开发者的国家专属订阅，定价 **₹649/月**（含税、INR 计费，UPI/卡支付）。这是 Cursor 首次推出国家专属定价 tier，介于 Free 与 $20 Pro 之间，包含 Grok 4.5、Composer、Cloud Agent、iOS 远程操控及 Plugins/MCP/hooks/skills，**不包含** Auto mode、Bugbot、外部 frontier 模型（OpenAI/Anthropic）及按需超额。同日 **Cursor Router**（7/22）进入发布第 **7** 日。本地无法实测 Cursor 桌面功能，以下基于官方 Changelog、博客与 TechCrunch 报道。

---

## 特性一：Cursor Start 印度专属计划（7/28 新发布）

### 是什么（机制说明）

Cursor Start 是 Cursor 首个 **国家专属订阅计划**，仅面向物理位于印度的开发者（官方将运行检测阻止 VPN 滥用）。定价 **₹649/月**（约 $7，含税），自 2026-07-28 起可用，月付自动续费。

**包含**：
- Grok 4.5（固定 medium effort、非 fast）与 Composer（非 fast）的充足 Agent 用量
- 常驻 Cloud Agent（构建、测试、提交 PR）
- Cursor iOS 远程操控
- Plugins、MCP servers、hooks、skills

**不包含**（需升级 Pro）：
- Auto mode / Cursor Router
- Bugbot、Automation
- OpenAI、Anthropic 等外部 frontier 模型
- Cursor SDK
- 按需超额计费

TechCrunch 报道印度为 Cursor 全球第三大市场（300 万+ 开发者），人均 Agent 请求量全球最高；该计划距 SpaceX 约 600 亿美元收购预期交割（Q3）数周。

### 适用场景

- **适合**：印度开发者需超越 Free tier 的日常 Agent 用量、偏好 UPI 支付
- **不适合**：需 Claude/GPT 模型、Auto Router、Bugbot 的用户（须 Pro）

### 前置条件

物理位于印度；Free 用户可从 Dashboard 升级，新用户访问 cursor.com/signup 选择 Start

### 详细使用步骤（业务用户）

1. 访问 [cursor.com/pricing](https://cursor.com/pricing) 或 [cursor.com/signup](https://cursor.com/signup)
2. 选择 **Cursor Start** 计划
3. 使用 UPI、信用卡或借记卡支付（INR 计费）
4. 升级后可用 Grok 4.5 + Composer + Cloud Agent
5. 需 OpenAI/Anthropic 模型时升级至 Pro（$20/月）

### 命令与配置示例

```bash
# CLI 登录后（Start 计划权限以 Dashboard 为准）
cursor --version
cursor chat --model composer "Refactor auth module"
```

```json
{
  "plan": "start",
  "region": "IN",
  "billing": {
    "currency": "INR",
    "amount": 649,
    "methods": ["UPI", "card"]
  },
  "includedModels": ["grok-4.5-medium", "composer"],
  "excludedFeatures": ["auto", "bugbot", "openai", "anthropic", "sdk"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor 桌面 Start 计划 | ⚠️ 未实测（Cloud Agent 无 GUI + 非印度 IP） |
| 官方 Changelog 7/28 | ✅ Cursor Start 条目有效 |
| TechCrunch 报道 | ✅ 定价与范围一致 |

### 问题与解决方案

**VPN 无法订阅**：官方检测印度 IP，须物理位于印度。**需要 Claude**：Start 不含 Anthropic 模型，升级 Pro。**用量不足**：Start 定位为日常 building，重度用户考虑 Pro。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/28 | ✅ ₹649、Grok 4.5、Composer |
| 官方博客 | ✅ UPI、Cloud Agent、iOS |
| TechCrunch | ✅ 300 万用户、SpaceX 背景 |
| Times of India | ✅ 不含 OpenAI/Anthropic |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 印度个人开发者 | Start 性价比高于 Free，低于 Pro |
| 印度团队 | 评估是否需 Pro 的 Auto/Bugbot |
| 中国开发者 | 无直接影响；关注本地化定价趋势 |
| Cursor 竞品 | 参考「国家 tier + 支付本地化」策略 |

---

## 特性二：Cursor Router 三档优化模式（7/22，第 7 日观察）

### 是什么（机制说明）

Cursor Router 分析每个请求的任务类型与复杂度，将工作路由至最合适的底层模型。用户选择 Auto 后，再选优化模式：
- **Intelligence**：前沿质量，匹配最贵最强模型
- **Balance**：强质量，匹配多数人日常使用的 frontier 模型（推荐默认）
- **Cost**：在可用智能范围内优化 token 花费

Balance 与 Intelligence 按路由模型费率计费。**注意**：Cursor Start 计划 **不包含** Auto mode，故无法使用 Router。

### 适用场景

- **适合**：Teams/Pro 日常混合任务、成本敏感团队
- **不适合**：Start 计划用户、需固定特定模型的合规场景

### 前置条件

Cursor Teams 或 Pro/Enterprise；**Grok 4.5 必须启用**（路由底座）

### 详细使用步骤（业务用户）

1. 打开 Cursor → Chat/Composer
2. 模型选择器选 **Auto**
3. 选择优化模式：Intelligence / Balance / Cost
4. Admin：Dashboard → Cursor Router → 配置团队默认

### 命令与配置示例

```bash
cursor chat --model auto --router-mode balance "Refactor auth module"
```

```json
{
  "router": {
    "enabled": true,
    "defaultMode": "balance",
    "allowedModes": ["balance", "cost", "intelligence"],
    "showRoutedModel": true
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor 桌面 Router | ⚠️ 未实测（Cloud Agent 无 GUI） |
| 官方 Changelog 7/22 | ✅ 三档模式 |
| 7/28 更新 | ✅ 无 Router 变更 |

### 问题与解决方案

**Router 不可用**：确认 Pro/Teams 计划，Start 不含 Auto。**Cost 模式质量不足**：切换 Balance 或 Intelligence。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/22 | ✅ 三档模式 |
| Start 计划 | ✅ 不含 Auto |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro 用户 | 默认 Balance |
| Start 用户 | 直接使用 Grok 4.5 / Composer，无 Router |
| Admin | 评估 soft vs hard enforcement |

---

## 特性三：Cloud Agent 与 iOS 远程操控（Start 计划包含）

### 是什么（机制说明）

Cursor Start 包含 **always-on cloud agents**，可在后台构建、测试、提交 PR，用户继续其他工作。同时包含 **Cursor for iOS** 远程操控，可从手机启动与引导 Agent。7/10 Changelog 新增 cloud agent hooks（`beforeSubmitPrompt`、`afterAgentResponse`、`subagentStart` 等）支持对话级观测与控制。

### 适用场景

- **适合**：移动端快速启动 Agent、后台长任务
- **不适合**：需本地文件系统直接访问的敏感代码

### 前置条件

Cursor Start 或 Pro；iOS 设备安装 Cursor App

### 详细使用步骤（业务用户）

1. 桌面端启动 Cloud Agent 任务
2. iOS App 登录同一账号
3. 远程查看进度、发送 follow-up
4. 团队 Admin 可配置 cloud agent hooks

### 命令与配置示例

```json
{
  "cloudAgent": {
    "hooks": {
      "beforeSubmitPrompt": "./hooks/validate-prompt.sh",
      "afterAgentResponse": "./hooks/log-response.sh"
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent | ⚠️ 未实测（无 GUI） |
| iOS 远程 | ⚠️ 未实测 |
| Start 包含 | ✅ 官方确认 |

### 问题与解决方案

**Cloud Agent 无响应**：检查网络与账号 tier。**iOS 不同步**：确认同一账号登录。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Start Changelog | ✅ Cloud Agent + iOS |
| 7/10 hooks | ✅ 对话级 hooks |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 移动办公 | 利用 iOS 远程启动 |
| 团队 | 配置 hooks 做审计 |
| 安全敏感 | 评估 cloud 代码暴露风险 |

---

## 特性四：Plugins、MCP、hooks 与 skills（Start 计划包含）

### 是什么（机制说明）

Cursor Start 包含 Plugins、MCP servers、hooks、skills 扩展能力，与 Pro 在扩展性上对齐（模型访问除外）。7/22 Changelog 提及 Team MCPs 可在 Dashboard 配置后分发至 cloud agents、IDE、CLI。Skills 为项目级 Agent 指令文件。

### 适用场景

- **适合**：自定义工作流、团队 MCP 集成
- **不适合**：无扩展需求的简单用户

### 前置条件

Cursor Start 或 Pro；MCP 服务器或 Plugin 源

### 详细使用步骤（业务用户）

1. Settings → MCP → 添加服务器
2. 项目根目录 `.cursor/skills/` 放置 SKILL.md
3. Settings → Plugins → 安装团队 marketplace 插件
4. hooks：`.cursor/hooks.json` 配置

### 命令与配置示例

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

```bash
# skills 目录结构
.cursor/skills/my-skill/SKILL.md
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| MCP 配置 | ⚠️ 未实测（无 GUI） |
| Start 包含 | ✅ 官方确认 |

### 问题与解决方案

**MCP 连接失败**：检查 command 与 args。**Skills 不生效**：确认路径与 frontmatter。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Start Changelog | ✅ Plugins/MCP/hooks/skills |
| Docs | ✅ MCP 配置 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 扩展用户 | Start 已含扩展能力 |
| 团队 | 利用 Team MCP marketplace |

---

## 特性五：`.cursor/permissions.json` 与 Agent 安全护栏

### 是什么（机制说明）

Cursor 支持 `.cursor/permissions.json` 配置 Agent 文件/Shell 权限。社区案例（如 Railway 删库事件）凸显 destructive 操作护栏重要性。Plan Mode 理论上为只读审批模式，但实际执行仍依赖 token 权限与环境隔离。Start 计划用户同样受 permissions 配置约束。

### 适用场景

- **适合**：生产环境、多 repo 协作、企业合规
- **不适合**：完全信任的本地实验（仍建议最小权限）

### 前置条件

Cursor 项目根目录；了解 Agent 工具权限模型

### 详细使用步骤（业务用户）

1. 项目根创建 `.cursor/permissions.json`
2. 配置 allow/deny 规则（文件读写、Shell 命令）
3. 敏感操作使用 Plan Mode 人工确认
4. API token 按环境隔离（dev/staging/prod 分离）

### 命令与配置示例

```json
{
  "permissions": {
    "allow": [
      "Read(src/**)",
      "Write(src/**)",
      "Shell(npm test)"
    ],
    "deny": [
      "Shell(rm -rf *)",
      "Write(.env)",
      "Shell(curl * | bash)"
    ]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| permissions.json | ⚠️ 未实测（无 GUI） |
| 社区删库案例 | ✅ 量子位等报道 |

### 问题与解决方案

**Agent 越权**：收紧 deny 列表。**Plan Mode 未阻止**：检查 token 环境隔离。**生产误删**：备份物理隔离 + 最小权限 token。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Docs | ✅ permissions 配置 |
| 社区案例 | ⚠️ Plan Mode 非万能 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | 配置 permissions.json |
| 企业 | token 环境隔离 + 审计 |
| Start 用户 | 同样适用安全实践 |

---

## 版本对照表

| 日期 (UTC) | 版本/事件 | 要点 |
|------------|-----------|------|
| **2026-07-28** | **Cursor Start** | 印度 ₹649/月专属计划 |
| 2026-07-22 | Cursor Router | Auto 三档优化模式 |
| 2026-07-17 | Slack 集成 | 多 repo、跨频道 |
| 2026-07-10 | 3.11 | Side chats、对话搜索 |

## 今日研究员结论

Cursor 7/28 最大新闻为 **Cursor Start 印度计划**，标志 AI 编程工具进入「新兴市场本地化定价」阶段。₹649 用 Grok 4.5 + Composer 锚定低端，将 frontier 模型留在 Pro。Router 第 7 日无变更；Start 用户不含 Auto。中国开发者无直接影响，但可观察 Cursor 定价策略对行业启示。本地 ⚠️ 未实测桌面功能。
