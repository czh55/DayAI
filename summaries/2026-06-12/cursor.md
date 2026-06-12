# Cursor 每日技术文档 — 2026-06-12

> **监测源**：[cursor.com/changelog](https://cursor.com/changelog)  
> **当日状态**：**2026-06-12 无新 changelog 条目**；本文覆盖 trigger 前 48 小时内仍属「当前行动项」的 **6 月 10 日 Bugbot** 与 **6 月 4–5 日 Cursor 3.7 / SDK** 更新。  
> **交叉验证**：[Bugbot June 2026](https://cursor.com/changelog/bugbot-updates-june-2026)、[SDK Updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026)、[Developer Toolkit 汇总](https://developertoolkit.ai/en/cursor-ide/version-management/changelog/)

---

## 今日概览

Cursor 在 6 月 12 日未发布新版本，但 **6 月 10 日的 Bugbot 更新**对日常提交流程影响直接：平均审查时间从 **~5 分钟降至 ~90 秒**，单次成本降 **22%**，缺陷发现率升 **10%**（0.56→0.62 个/次）。底层模型换为 **Composer 2.5**。同时 **6 月 4 日 SDK 更新**使自建 Agent 管道可挂载自定义工具、JSONL 状态存储与 auto-review——与 Claude Code Loop 叙事形成行业共振（见 `china-media.md`）。

---

## 特性一：Bugbot 换用 Composer 2.5（2026-06-10）

### 是什么（机制说明）

Bugbot 是 Cursor 面向 PR / 本地 diff 的自动 Code Review Agent。2026-06-10 起，推理后端由 Composer 2 系列升级为 **Composer 2.5**（Cursor 自研编码模型）。官方称在相同 diff 规模下，审查延迟与美元成本双降，且多检出约 10% 问题。Bugbot 仍遵守工作区的 **model block list**（禁用模型列表）。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 团队 PR 量大、希望缩短 CI 等待 | 极小个人项目、无 Git 托管 |
| 已启用 Cursor Business / Bugbot 席位 | 仅使用 Copilot 补全、未开 Agent |

### 前置条件

- **Cursor 3.7+** 桌面端或 [cursor.com/agents](https://cursor.com/agents)
- 仓库已连接 GitHub / GitLab
- Bugbot 已在组织或仓库设置中启用
- 可选：配置 model block list（Settings → Models）

### 详细使用步骤

1. 升级 Cursor 至 **3.7 或更高**（Help → Check for Updates）
2. 打开 **Cursor Settings → Bugbot**（或组织 Admin → Bugbot），确认已启用
3. 在 IDE Agent 输入框或 PR 评论触发 Bugbot（见特性二 `/review`）
4. 对比升级前后：记录单次审查耗时与评论条数
5. 若审查变慢：检查是否 block 了 Composer 2.5 相关 slug

### 命令与配置示例

桌面端无 CLI 审查命令（6/10 公告写 **CLI coming soon**）；Web Agents：

```
在 cursor.com/agents 连接仓库后，从 PR 侧边栏启动 Bugbot
```

组织级 model block list（示例路径）：

**Settings → Cursor Settings → Models → Model Block List**

### 本地测试结果

- ❌ 未实测 Bugbot（云环境无 Cursor 桌面与 GitHub App 授权）  
- **未实测原因**：Bugbot 需 Cursor 3.7 GUI + 托管集成

### 问题与解决方案

| 问题 | 排查 |
|------|------|
| 审查仍 >3 分钟 | 确认版本 ≥3.7；diff 过大时拆分 PR |
| 检出率无提升 | 检查 `.cursor/rules` 是否与 Bugbot 提示冲突 |
| Composer 2.5 被 block | Settings → Models 移除 block |

```bash
# 本地仅验证 Cursor CLI 是否存在（若已安装）
cursor --version
```

### 官方 vs 社区交叉验证

- **官方**：[Bugbot updates June 2026](https://cursor.com/changelog/bugbot-updates-june-2026) — 90s / 22% / 10%  
- **社区**：[AIwerse Cursor 3.7 解读](https://www.aiwerse.blog/ai-tools/cursor-just-got-smarter-what-s-new-in-cursor-3-7-update) — 与官方数据一致

### 利弊 + 分角色建议

- **个人**：免费档可能限额，关注用量  
- **团队**：ROI 明确，建议默认开启 PR Bugbot  
- **企业**：结合 model block list 防止审查 Agent 调用未批准模型

---

## 特性二：推送前 `/review` 本地审查（2026-06-10）

### 是什么

在 **push 之前**于 Cursor Agent 输入 **`/review`**，可选择运行 **Bugbot** 和/或 **Security Review**。子命令 **`/review-bugbot`**、**`/review-security`** 直达单一审查器。若本地 `/review` 的 diff 与随后 PR 相同，GitHub/GitLab 上 Bugbot 会**识别并跳过重复审查**，留言说明已审过。

### 适用场景

- 希望「先审后推」，减少 PR 往返  
- Security Review 与 Bugbot 组合的安全敏感模块

### 前置条件

- Cursor **3.7+**
- 已登录并连接 Git 远程
- Bugbot / Security Review 功能可用（套餐与组织策略）

### 详细使用步骤

1. 本地完成 commit，**尚未 push**
2. 打开 Cursor **Agent** 面板（`Cmd+I` / `Ctrl+I`）
3. 输入 `/review`，在弹窗勾选 Bugbot、Security Review
4. 等待 ~90s（Composer 2.5 基准），按建议修改
5. `git push` 并开 PR；确认远端 Bugbot 跳过重复 diff

### 命令与配置示例

```
/review
/review-bugbot
/review-security
```

### 本地测试结果

- ❌ 未实测（无 Cursor GUI）

### 问题与解决方案

1. **`/review` 无响应**：确认 3.7+；Agent 模式而非 Chat-only  
2. **远端仍重复审查**：diff 与本地不完全一致（含 merge commit）

### 官方 vs 社区

- 官方 changelog 6/10  
- 36氪 [Agent 规范文](https://www.36kr.com/p/3713736075636867) 强调「先验证再推进」——与 `/review` 工作流一致

### 分角色建议

Tech Lead 可将 `/review` 写入 `CONTRIBUTING.md`；企业可强制 push 前审查（配合 branch protection）。

---

## 特性三：Bugbot 仅审查 PR 增量（2026-06-10）

### 是什么

可配置 Bugbot **只评论自上次审查以来的新 commit**，避免同一 PR 反复收到已解决问题的旧评论。

### 适用场景

- 长生命周期 PR、多轮 force-push  
- 审查者疲劳、噪音过多

### 前置条件

- Bugbot 已启用  
- 托管平台 GitHub/GitLab

### 详细使用步骤

1. **Cursor Settings → Bugbot → Review Settings**（或文档等价路径）  
2. 开启 **「Only review changes since last review」**（文案以英文 UI 为准）  
3. 在 PR 上触发第二轮 Bugbot，确认仅新 diff 被评论

### 命令与配置示例

Settings 完整路径（桌面）：

```
Cursor → Settings → Cursor Settings → Bugbot → Only review new changes since last review
```

### 本地测试结果

- ❌ 未实测

### 问题与解决方案

1. **仍全量审查**：组织级策略覆盖用户设置  
2. **漏审旧问题**：重大重构时手动请求 full review

### 官方 vs 社区

- [官方文档链接](https://cursor.com/changelog/bugbot-updates-june-2026) 文末 "Learn more in our docs"

---

## 特性四：Cursor SDK 自定义工具 `local.customTools`（2026-06-04）

### 是什么

TypeScript / Python **Cursor SDK** 现可将普通函数注册为 Agent 工具，无需自建 MCP stdio 服务器。SDK 内置 **`custom-user-tools`** MCP 服务暴露这些函数，权限与 MCP 工具相同。子 Agent **继承**父级 customTools。

### 适用场景

- CI 脚本内嵌「查 Jira」「发 Slack」  
- 不想维护独立 MCP 进程

### 前置条件

- `npm install @cursor/sdk` 或 `pip install cursor-sdk`（Python ≥0.1.6）  
- Node 18+ / Python 3.10+

### 详细使用步骤

1. 安装 SDK：`npm install @cursor/sdk`  
2. 定义工具函数与 JSON Schema  
3. `Agent.create({ local: { customTools: [...] } })`  
4. `agent.send("调用我的工具完成任务")`  
5. 检查权限门与日志

### 命令与配置示例（TypeScript 基础）

```typescript
import { Agent } from "@cursor/sdk";

const checkDeployStatus = async (args: { env: string }) => {
  return { status: "ok", env: args.env };
};

const agent = await Agent.create({
  local: {
    customTools: [
      {
        name: "check_deploy_status",
        description: "Check deployment status for an environment",
        parameters: {
          type: "object",
          properties: { env: { type: "string" } },
          required: ["env"],
        },
        execute: checkDeployStatus,
      },
    ],
  },
});

const run = await agent.send("检查 production 部署状态");
await run.wait();
console.log(run.result);
```

### 命令与配置示例（进阶 — 嵌套子 Agent）

```typescript
// 子 Agent 自动可见父级 customTools，无需重复注册
const reviewer = await Agent.create({
  local: { customTools: [/* ... */] },
  subagents: { tester: { prompt: "Write tests only" } },
});
```

### 本地测试结果

- ⚠️ 未安装 `@cursor/sdk`（本次聚焦 CLI）；`npm view @cursor/sdk version` 可验证包存在  
- **未实测原因**：需 Cursor API 凭证与本地 bridge

### 问题与解决方案

1. **工具不可见**：检查 `custom-user-tools` 是否被 permissions 拒绝  
2. **子 Agent 无工具**：升级至 6/4 后 SDK，确认 nested subagents 已启用

### 官方 vs 社区

- [SDK Updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026)  
- [Developer Toolkit](https://developertoolkit.ai/en/cursor-ide/version-management/changelog/) — 一致

---

## 特性五：SDK `local.autoReview` 与 permissions.json（2026-06-04）

### 是什么

Headless SDK Agent 默认**自动执行**工具（无人工）。设置 `local.autoReview: true` 后，工具调用经**分类器**决定自动通过或暂停，规则由自然语言写入 **`.cursor/permissions.json`** 的 `autoRun.allow_instructions` / `block_instructions`。

### 适用场景

- 夜间 CI Agent：允许读、禁止删  
- 合规：删除操作必须人工批

### 前置条件

- SDK 6/4+  
- 项目根 `.cursor/permissions.json`

### 详细使用步骤

1. 创建 `.cursor/permissions.json`（见下方完整示例）  
2. `Agent.create({ local: { autoReview: true } })`  
3. 发送会触发 `rm` 或 `git push --force` 的任务  
4. 确认 block_instructions 生效

### 命令与配置示例 — 推荐 `.cursor/permissions.json` 完整示例

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections of build artifacts under ./dist are fine.",
      "Running unit tests with npm test or pytest is allowed.",
      "Reading files under ./src and ./docs without modification is allowed."
    ],
    "block_instructions": [
      "Always pause delete operations so I get a chance to review them.",
      "Block any git push --force or git reset --hard.",
      "Block modifications to .env, secrets/, and *.pem files."
    ]
  },
  "shell": {
    "allow": [
      "npm test",
      "npm run build",
      "git status",
      "git diff"
    ],
    "deny": [
      "rm -rf",
      "curl * | sh"
    ]
  }
}
```

```typescript
const agent = await Agent.create({
  local: { autoReview: true },
});
```

### 本地测试结果

- ❌ 未实测 SDK 分类器

### 问题与解决方案

1. **全部自动通过**：`autoReview` 未设 true  
2. **误拦读操作**：细化 allow_instructions

### 官方 vs 社区

- 官方 SDK changelog 含 JSON 示例 — **一致**  
- 36氪 [六大军规](https://www.36kr.com/p/3713736075636867) — 理念一致（边界/contracts）

---

## 特性六：SDK JSONL 状态存储（2026-06-04）

### 是什么

Agent 元数据默认 SQLite；现可选 **`JsonlLocalAgentStore`** 追加写入纯文本 JSONL，便于 diff、版本控制与 CI 产物归档。亦可实现 `LocalAgentStore` 接 Postgres。

### 适用场景

- CI 希望 `agent-runs.jsonl` 随构建上传  
- 审计：每行一条 run 记录

### 前置条件

- `@cursor/sdk` 最新版

### 详细使用步骤

1. `import { JsonlLocalAgentStore, Agent } from "@cursor/sdk"`  
2. `const store = new JsonlLocalAgentStore({ path: "./.cursor/runs.jsonl" })`  
3. `Agent.create({ local: { store } })`  
4. 进程重启后 `Agent.resume` 验证

### 命令与配置示例

```typescript
import { Agent, JsonlLocalAgentStore } from "@cursor/sdk";

const store = new JsonlLocalAgentStore({
  path: ".cursor/agent-runs.jsonl",
});

const agent = await Agent.create({
  local: { store },
});

const run = await agent.send("Summarize README");
await run.wait();
// run.requestId 可用于关联日志
console.log(run.requestId, run.result);
```

### 本地测试结果

- ❌ 未实测

### 问题与解决方案

1. **resume 失败**：JSONL 路径只读或并发写冲突 — 单进程写或使用文件锁  
2. **SQLite 仍被使用**：未传入 `local.store`

---

## 特性七：Design Mode 与 Canvas（Cursor 3.7，2026-06-04/05）

### 是什么（桌面）

**Design Mode** 支持在浏览器预览中**多选 UI 元素**、语音输入改样式；**Canvas** 内也可 Design Mode，并新增**交互式 Token 用量报告**。面向前端与设计师协作。

### 适用场景

- React/Vue 组件视觉微调  
- 查看 Agent 上下文消耗

### 前置条件

- Cursor **3.7+**  
- 前端项目可启动 dev server

### 详细使用步骤

1. **Settings → Beta → Design Mode** 确认开启  
2. 打开 Canvas：`Cmd+Shift+P` → "Open Canvas"  
3. 多选两个按钮元素，Agent 输入：「让次要按钮样式与主按钮一致」  
4. Canvas 内打开 Context usage report 查看 token 分布

### Settings 完整路径

```
Cursor → Settings → Cursor Settings → Beta → Design Mode
Cursor → Settings → Cursor Settings → Agent → Canvas
```

### 本地测试结果

- ❌ 无 GUI

### 官方 vs 社区

- [Cursor changelog 3.7](https://cursor.com/changelog)  
- [AIwerse 3.7](https://www.aiwerse.blog/ai-tools/cursor-just-got-smarter-what-s-new-in-cursor-3-7-update) — 一致

---

## 特性八：Enterprise Organizations 三层治理（2026-05-29 GA）

### 是什么

**Org → Team → Group** 三层模型 GA：统一计费、策略下发、模型与扩展治理。与 `permissions.json`、model block list 配合。

### 管理员开启 SOP

1. [cursor.com/settings](https://cursor.com/settings) → **Organization**  
2. 创建 Org，邀请 Team  
3. **Policies**：默认模型、禁用扩展、数据留存  
4. 下发 Group 级 overrides

### 业务/开发者使用 SOP

1. 登录企业 SSO  
2. 本地 `.cursor/rules` 服从组织模板  
3. 不得禁用组织强制 Bugbot（若已配置）

### 本地测试结果

- ❌ 无企业租户

---

## 本地实测总览

| 项目 | 结果 |
|------|------|
| Cursor 桌面 Bugbot | ❌ 无 GUI |
| changelog 抓取 | ✅ 6/10 Bugbot、6/4 SDK |
| permissions.json 示例 | ✅ 文档内完整 JSON |

---

## 对普通开发者的行动清单（2026-06-12）

1. 升级 **Cursor 3.7+**  
2. push 前习惯 **`/review`**  
3. 自建 CI 评估 **`@cursor/sdk`** + `permissions.json`  
4. 关注 Bugbot **CLI** 即将支持（官方称 coming soon）

---

*DayAI | 2026-06-12*
