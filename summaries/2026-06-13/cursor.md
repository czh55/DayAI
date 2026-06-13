# Cursor 每日技术文档 — 2026-06-13

> 监测源：[cursor.com/changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)  
> 检索时间：UTC 2026-06-13 22:20  
> 说明：Cursor 桌面版需在 GUI 环境操作；本文档基于官方 changelog + SDK 配置说明，CLI 侧 Bugbot `/review` 标注「coming soon」

## 今日综述

Trigger 日前 24 小时内，Cursor 最显著的工程向更新是 **6 月 10 日 Bugbot 性能公告**：审查引擎切换为自研 **Composer 2.5**，平均审查时间从约 5 分钟降至 **~90 秒**，单次发现问题数从 0.56 升至 **0.62**，单次成本降约 **22%**。同日发布 **push 前 `/review`** 与 **仅审查 PR 增量** 配置。6 月 4–5 日的 **Canvas Design Mode**、**Context Usage Report** 与 **SDK Custom Tools / Auto-review** 仍在持续影响 Agent 工程化实践。以下逐项展开。

---

## 特性一：Bugbot 提速（Composer 2.5 驱动）

### 是什么（机制说明）

Bugbot 是 Cursor 面向 PR / diff 的自动代码审查 Agent。2026-06-10 起，其后端模型从旧版 Composer 系列升级为 **Composer 2.5**（与 Cursor 编辑器内 Agent 同源系列）。官方披露：平均审查时长 **~90s**（原 ~5min），平均每 review 发现问题 **0.62**（原 0.56），单次运行成本 **-22%**。Bugbot 仍尊重组织的 **model block list**，实际速度因配置而异。

### 适用场景

**适合**：高频 PR 团队、希望合并前自动抓逻辑/安全问题的仓库。  
**不适合**：对审查延迟仍敏感且 diff 极大的单体 PR（可拆分或启用「仅增量」）；完全禁用云端模型的 air-gapped 项目。

### 前置条件

- **Cursor 3.7+** 桌面客户端，或 cursor.com/agents  
- 仓库已连接 **GitHub / GitLab** 并启用 Bugbot  
- 组织未 block Composer 2.5

### 详细使用步骤

1. 升级 Cursor 至 3.7+（Help → Check for Updates）  
2. 打开 **Settings → Bugbot**（或项目 `.cursor` 配置）确认已连接 VCS  
3. 在 GitHub/GitLab 打开 PR，等待 Bugbot 自动评论，或见特性二在本地先跑 `/review`  
4. 在 PR 设置中开启 **Only review what's new**（仅审查上次 review 后的新 commit）  
5. 对比 review 前后问题数，调整 block list 若误报增多

### 命令与配置示例

```json
// .cursor/bugbot.json 或团队文档中的推荐片段（字段名以官方 docs 为准）
{
  "onlyReviewNewChanges": true,
  "modelBlockList": []
}
```

```bash
# Cursor CLI（若已安装 cursor CLI，版本需 3.7+）
# Bugbot /review 在 CLI 上官方标注 coming soon；桌面 Agent 输入：
/review
```

### 本地测试结果

- ⚠️ 当前云环境 **无 Cursor 3.7 GUI**，未执行真实 PR 审查  
- ✅ 官方数据与 changelog 可访问：[bugbot-updates-june-2026](https://cursor.com/changelog/bugbot-updates-june-2026)

### 问题与解决方案

| 问题 | 排查 |
|------|------|
| 审查仍很慢 | 查 model block list 是否回退旧模型；缩小 PR diff |
| 问题数下降 | 可能是 diff 变小或 only-new 生效，非必然退步 |
| 与 GitHub App 重复评论 | 使用 `/review` 后再开 PR 应去重（见特性二） |

### 官方 vs 社区交叉验证

| 来源 | 观点 |
|------|------|
| [Cursor Changelog 2026-06-10](https://cursor.com/changelog/bugbot-updates-june-2026) | 3x 速度、+10% bugs、-22% cost | 
| [36氪 Agent 指数 2026-06-10](https://www.36kr.com/p/3701445354074249) | 闭源模型主导 Agent，审查类工具依赖 GPT/Claude/Cursor 系 | 部分一致 |

### 分角色建议

- 个人：小 PR 合并前 habit 化 `/review`  
- 团队：在 CI 质量门禁中记录 Bugbot 发现问题密度趋势  
- 企业：将 Bugbot 纳入 SOC2 变更审计证据链

---

## 特性二：Push 前 `/review` 与 GitHub/GitLab 去重

### 是什么（机制说明）

在 push 之前，开发者可在 Cursor Agent 输入 **`/review`**，选择运行 **Bugbot** 和/或 **Security Review**；也可直接 `/review-bugbot`、`/review-security`。若本地 `/review` 的 diff 与随后 PR 相同，云端 Bugbot **识别已审查** 并跳过重复跑，留言说明。

### 适用场景

**适合**：想「左移」审查、减少 PR 上 CI 等待的开发者。  
**不适合**：仅依赖远端 Bugbot、从不本地 Agent 的用户（可继续用 PR 触发）。

### 前置条件

- Cursor **3.7+**  
- 已登录并连接 GitHub/GitLab  
- 本地有未 push 的 commit 或 staged 变更

### 详细使用步骤

1. 完成本地开发并 `git commit`（或 stage）  
2. 打开 Cursor Agent 聊天  
3. 输入 `/review`  
4. 勾选 Bugbot / Security Review  
5. 根据评论修复后再次 `/review` 或 push  
6. 创建 PR 时观察 Bugbot 是否留言「already reviewed」

### 命令与配置示例

```text
/review-bugbot

请只审查当前分支相对 main 的 diff，关注：
- 空指针与资源泄漏
- 并发 race
输出 markdown 列表
```

```text
/review-security

扫描 staged 变更中的：
- hardcoded secrets
- SQL 拼接
- 不安全反序列化
```

### 本地测试结果

- ⚠️ 无 GUI，未实测 `/review` 交互  
- ✅ Changelog 明确 Available in Cursor 3.7+

### 问题与解决方案

1. **PR 仍完整重跑**：确认 push 的 diff 与本地 review 时一致（无额外 amend）  
2. **Security Review 无输出**：检查是否启用 Security 插件及权限

### 分角色建议

- 团队：规定「push 前至少一次 `/review-bugbot`」  
- 企业：Security Review 结果归档到 SIEM

---

## 特性三：仅审查 PR 增量（Only review what's new）

### 是什么

Bugbot 可配置为 **只审查自上次 review 以来的新变更**，避免同一 PR 多轮 push 后重复罗列旧问题。

### 使用步骤

1. Cursor Settings → Bugbot → 启用 **Only review new changes since last review**  
2. 或在 PR 评论中使用官方文档指定的配置入口  
3. 多轮 push 后验证评论仅含新 diff 范围

### 配置示例

```json
{
  "bugbot": {
    "incrementalReview": true
  }
}
```

### 本地测试：⚠️ 未实测（需 GitHub 集成）

### 利弊

- 利：减少噪音、降 Token/费用  
- 弊：若上轮 review 漏报，增量模式不会重扫旧行——大改结构时建议手动全量 review

---

## 特性四：SDK Custom Tools（`local.customTools`）

### 是什么（机制说明）

`@cursor/sdk`（TypeScript）与 `cursor-sdk`（Python）允许通过 **`local.customTools`** 把普通 JavaScript/Python 函数注册为 Agent 工具。SDK 内置 MCP 服务器 **`custom-user-tools`** 暴露这些函数，权限与 MCP 工具同一套 gate；**子 Agent 自动继承**父级 custom tools。

### 适用场景

**适合**：CI 脚本、内部平台封装（查工单、发 Slack）、无需自建 MCP stdio 服务器的团队。  
**不适合**：需跨进程隔离的不可信工具（应走沙箱 MCP）。

### 前置条件

- `npm install @cursor/sdk` 或 `pip install cursor-sdk`（2026-06-04  changelog）  
- Node 18+ / Python 3.10+  
- 项目内 `.cursor/permissions.json` 定义自动运行规则

### 详细使用步骤

1. 安装 SDK：`npm install @cursor/sdk`  
2. 编写 `agent.ts` 定义 `local.customTools`  
3. 配置 `.cursor/permissions.json` 允许工具自动执行或走 auto-review  
4. `Agent.create()` 启动本地 headless agent  
5. `send()` 触发任务，观察工具调用日志

### 命令与配置示例

```typescript
// agent.ts — 基础示例
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  local: {
    customTools: [
      {
        name: "get_build_status",
        description: "查询 CI 构建状态",
        parameters: {
          type: "object",
          properties: { branch: { type: "string" } },
          required: ["branch"],
        },
        execute: async ({ branch }) => {
          const res = await fetch(`https://ci.example.com/api/build?branch=${branch}`);
          return { content: await res.text() };
        },
      },
    ],
  },
});

const run = await agent.send("检查 main 分支最新构建是否通过");
await run.wait();
console.log(run.result);
```

```typescript
// agent-advanced.ts — 子 agent 继承 custom tool
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  local: {
    customTools: [/* 同上 */],
    store: "jsonl", // 见特性六
  },
  subagents: {
    investigator: {
      prompt: "你只负责调用 get_build_status 并解释失败日志",
    },
  },
});

await agent.send("派 investigator 检查 release 分支 CI");
```

```json
// .cursor/permissions.json — 完整推荐示例
{
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections of build artifacts under ./dist are fine.",
      "Calls to get_build_status for branches matching release/* may run without prompt."
    ],
    "block_instructions": [
      "Always pause delete operations so I get a chance to review them.",
      "Never auto-run shell commands that modify git history."
    ]
  },
  "mcp": {
    "custom-user-tools": {
      "alwaysAllow": ["get_build_status"]
    }
  }
}
```

### 本地测试结果

- ⚠️ 未安装 `@cursor/sdk` 于本仓库（仅文档验证 API 形状）  
- ✅ Changelog 2026-06-04 与 [Developer Toolkit 汇总](https://developertoolkit.ai/en/cursor-ide/version-management/changelog/) 一致

### 问题与解决方案

1. **工具不可见**：确认 `customTools` 在 `create()` 而非仅单次 `send()`  
2. **权限被拒**：检查 `permissions.json` 与 `autoRun` 指令是否覆盖该工具名

### 官方 vs 社区

- 官方：Cursor changelog 2026-06-04 Custom tools  
- 社区：[钛媒体扣子 3.0 实测](https://www.tmtpost.com/8021226.html) 称可拉本地 Claude Code/Codex 进项目空间——与「自定义工具/多 Agent」生态互补，非替代 SDK

---

## 特性五：Auto-review（`local.autoReview`）

### 是什么

默认 headless 本地 Agent **绕过**人工审批直接跑工具。设置 **`local.autoReview: true`** 后，工具调用经分类器裁决：匹配 `autoRun.allow_instructions` 的放行，匹配 `block_instructions` 的暂停。

### 使用步骤

1. 在 `Agent.create({ local: { autoReview: true } })` 启用  
2. 编辑 `.cursor/permissions.json` 中自然语言规则  
3. 在 CI 日志中检查被 block 的调用  
4. 迭代 allow/block 文案

### 配置示例

见特性四 `permissions.json` 完整块。

### 分角色建议

- 企业：block_instructions 优先写「写盘、删库、发外网」  
- 个人：开发机可放宽 allow，笔记本出差收紧

---

## 特性六：JSONL / 自定义 Store（`local.store`）

### 是什么

Agent 元数据默认 SQLite；现可选 **`JsonlLocalAgentStore`** 或实现 **`LocalAgentStore`** 接口（如 Postgres）。便于 CI 产物归档与 `git diff` 会话状态。

### 使用步骤

1. `import { JsonlLocalAgentStore } from "@cursor/sdk"`  
2. `Agent.create({ local: { store: new JsonlLocalAgentStore("./.cursor/agents.jsonl") } })`  
3. 跑完后检查 jsonl 文件行  
4. 可选：自定义 `PostgresLocalAgentStore` 对接团队 DB

### 示例

```typescript
import { Agent, JsonlLocalAgentStore } from "@cursor/sdk";

const store = new JsonlLocalAgentStore("/workspace/.cursor/agent-runs.jsonl");
const agent = await Agent.create({ local: { store } });
```

### 本地测试：⚠️ 未跑 SDK

---

## 特性七：Canvas Design Mode 与 Context Usage Report（3.7）

### 是什么

- **Design Mode**：在 Canvas 或内置浏览器中点选 UI 元素、语音描述修改，Agent 直接改代码。  
- **Context Usage Report**：Canvas 中可视化 **token 去向**（system prompt、tools、rules、skills 等），可追问 Agent 优化上下文。

### Settings 路径（桌面）

1. **Cursor → Settings → Cursor Settings → Beta / Features**  
2. 启用 **Canvas** 与 **Design Mode**  
3. Agent 生成 Canvas 后，点击 **Design** 进入点选模式  
4. 命令面板：**Open Context Usage Report**（或在 Canvas 内 Ask for context report）

### `.cursor/permissions.json` 推荐（与 Design Mode 联用）

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only file reads for UI inspection are allowed.",
      "Edits to files under src/components/** triggered from Design Mode selections are allowed."
    ],
    "block_instructions": [
      "Pause edits to package.json and lockfiles unless explicitly requested."
    ]
  },
  "browser": {
    "designMode": {
      "voiceInput": true,
      "multiSelect": true
    }
  }
}
```

### 使用步骤（Design Mode）

1. 让 Agent 创建含 UI 的 Canvas  
2. 打开 Design Mode，**多选**两个按钮元素  
3. 语音或文字：「让左侧按钮样式与右侧一致」  
4. Agent 修改源码；在浏览器预览验证  
5. 打开 Context Usage Report，若 tools 占比过高则精简 MCP

### 本地测试：⚠️ 无 Canvas GUI

### 官方 vs 社区

- [canvas-improvements](https://cursor.com/changelog/canvas-improvements)  
- 社区 Developer Toolkit 2026-06-05 补充 multi-select + voice

---

## 特性八：SDK 嵌套 Subagent 与 Composer 2 路由

### 是什么

- Subagent 可无限深度嵌套（与 Claude Code 5 层不同，官方写 **any depth**）  
- 仍 pin `composer-2` 的客户端 **自动路由到 Composer 2.5**

### 示例

```bash
npm install @cursor/sdk
# package.json 中 model 仍写 composer-2 的脚本无需修改
```

### 本地测试：⚠️ 未执行

---

## 本地实测总览

| 项目 | 结果 |
|------|------|
| Cursor GUI / Bugbot | 未安装，未实测 |
| Changelog 抓取 | ✅ |
| permissions.json 示例 | 文档级 ✅ |

## 对普通开发者意味着什么

Bugbot 变快意味着「等审查」不再是喝咖啡的借口，而更像 lint；`/review` 左移则把 PR 评论压力前移到本地。SDK 侧 customTools + autoReview 让 **headless Agent 进 CI** 的门槛低于自建 MCP。若你只用编辑器聊天、不用 SDK/Canvas，本周仍值得升级 3.7 并试一次 push 前 `/review`。
