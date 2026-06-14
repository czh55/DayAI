# Cursor 每日技术文档 — 2026-06-14

> 监测源：[cursor.com/changelog](https://cursor.com/changelog)｜本地环境：Cursor Cloud Agent（无桌面 GUI，以下桌面功能以官方文档 SOP 为准）

## 今日综述

2026 年 6 月 14 日 Cursor 生态的头条是 **6 月 10 日发布的 Bugbot 重大性能更新**（距触发约 4 天，仍属本周核心变更）：审查时间从约 5 分钟降至约 90 秒，单次成本低 22%，缺陷检出率提升 10%。同期 **6 月 4 日 SDK 更新** 为 TypeScript/Python 生产集成带来 custom tools、auto-review、JSONL 存储与无限深度子 Agent 嵌套。桌面端 **3.7** 还包含 Canvas Design Mode 与 Context Usage Report（6 月 4–5 日）。

---

## 特性一：Bugbot 性能升级与 Composer 2.5 驱动（2026-06-10）

### 是什么（机制说明）

Bugbot 是 Cursor 的 AI 代码审查 Agent，集成于 GitHub/GitLab PR 与 Cursor IDE。2026 年 6 月 10 日更新后，Bugbot 由 **Composer 2.5** 驱动：平均审查时间约 **90 秒**（原约 5 分钟），每次审查平均发现问题数从 0.56 升至 0.62（+10%），单次运行成本降低约 22%。Bugbot 尊重组织的 model block list。

### 适用场景

- **适合**：中大型 PR、安全敏感模块、合并前自动把关
- **不适合**：极小 diff（开销不成比例）；已有人工详尽 review 的 trivial 变更

### 前置条件

- Cursor **3.7+** 或 [cursor.com/agents](https://cursor.com/agents)
- 已连接 GitHub 或 GitLab
- Bugbot 已在仓库设置中启用（管理员）

### 详细使用步骤（业务用户）

1. 更新 Cursor 至 3.7+：`Cursor` → `Check for Updates`（macOS）或官网下载
2. 打开项目，在 Agent 输入框输入 `/review`
3. 选择 **Bugbot** 和/或 **Security Review**（或直接用 `/review-bugbot`、`/review-security`）
4. 等待约 90 秒查看结果
5. 修复问题后 push；若 PR 与本地 `/review` diff 相同，云端 Bugbot 会识别并跳过重复审查

### 管理员开启 SOP

1. 登录 [cursor.com](https://cursor.com) 组织控制台
2. 进入 **Settings** → **Bugbot**（或 Integrations → GitHub/GitLab）
3. 连接 VCS 组织，选择启用 Bugbot 的仓库
4. 配置「仅审查自上次审查以来的新变更」（增量审查，见特性二）
5. 可选：设置 model block list 排除特定模型

### 命令与配置示例

```
/review
/review-bugbot
/review-security
```

推荐 `.cursor/permissions.json` 片段（与 Bugbot 并用的自动运行策略）：

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only git diff and log commands are fine.",
      "Running eslint --fix on staged files only is fine."
    ],
    "block_instructions": [
      "Always pause git push and git reset --hard.",
      "Pause any command that deletes files outside ./tmp."
    ]
  }
}
```

**Settings 完整路径（桌面端）**：

`Cursor` → `Settings` → `Cursor Settings` → `Features` → `Bugbot`  
`Cursor` → `Settings` → `Cursor Settings` → `Models` → `Model Block List`

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent 环境 `/review` | ⚠️ 未实测（无 Cursor 3.7 桌面 GUI） |
| 官方 changelog 数据 | ✅ 90s / -22% cost / +10% bugs |

### 问题与解决方案

**Bugbot 仍很慢** — 检查 model block list 是否强制更慢模型；确认 Composer 2.5 未被禁用。

**PR 上重复审查** — 确保先本地 `/review` 再开 PR；或启用「only review what's new」。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [官方 Changelog 2026-06-10](https://cursor.com/changelog/bugbot-updates-june-2026) | 基准 |
| [Developer Toolkit 汇总](https://developertoolkit.ai/en/cursor-ide/version-management/changelog/) | 一致 |

### 利弊 + 建议

- **个人**：合并前 habit 化 `/review-bugbot`
- **团队**：管理员统一启用增量审查，减少 PR 噪音
- **企业**：Security Review 与现有 SAST 互补，非替代

---

## 特性二：推送前 `/review` 与 PR 去重同步

### 是什么

开发者可在 **push 之前** 在 IDE 内运行 Bugbot/Security Review，结果与 GitHub/GitLab 上 Bugbot 同步：相同 diff 的 PR 将显示「已审查」并跳过云端重复运行。

### 适用场景

- **适合**：希望「先修再 PR」的开发者；减少 CI 等待
- **不适合**：仅依赖云端审查、从不本地预检的流程

### 前置条件

Cursor 3.7+；已登录 cursor.com 账号；VCS 集成已配置

### 详细使用步骤

1. 完成本地 commit（未 push）
2. 打开 Cursor Agent，输入 `/review`
3. 勾选 Bugbot + Security Review
4. 根据反馈修改代码
5. `git push` 并创建 PR
6. 验证 PR 上 Bugbot 注释为「already reviewed」

### 示例

```bash
git add -A && git commit -m "feat: add auth middleware"
# 在 Cursor 中：/review-bugbot
git push origin feature/auth
```

### 本地测试

⚠️ 需 Cursor 3.7 桌面 + GitHub 集成；Cloud Agent 未实测

### 常见问题

**PR 仍触发完整审查** — diff 与本地不完全一致（如 rebase 后）；重新本地 `/review`

**CLI 支持** — 官方注明「CLI coming soon」（截至 6 月 10 日 changelog）

### 交叉验证

官方 changelog ✅；量子位等国内媒体未单独报道（非不一致，属未覆盖）

---

## 特性三：仅审查 PR 增量变更

### 是什么

配置 Bugbot **只审查自上次审查以来新增的 commit/diff**，避免同一 PR 多轮 push 时重复评论已修复问题。

### 步骤

1. `Cursor Settings` → `Features` → `Bugbot`
2. 启用 **Only review what's new since last review**
3. 或在 cursor.com 组织 Bugbot 设置中启用同等选项

### 示例配置（组织级，概念性）

在 Cursor Dashboard → Repository Settings → Bugbot → Incremental Review: **On**

### 本地测试

⚠️ 未实测

### 常见问题

**首次 PR 仍全量审查** — 预期行为；增量仅在有「上次审查」基线后生效

**需要强制全量** — 关闭增量选项或在新分支重开 PR

---

## 特性四：Cursor SDK — Custom Tools（2026-06-04）

### 是什么

TypeScript/Python SDK 可通过 `local.customTools` 将**自定义 JavaScript/Python 函数**暴露给本地 Agent，SDK 内置 MCP 服务器 `custom-user-tools` 转发调用，权限门与常规 MCP 工具相同。子 Agent 自动继承父 Agent 的 custom tools。

### 适用场景

- **适合**：CI 脚本、内部 API 封装、无需独立 MCP 进程的轻量集成
- **不适合**：需独立进程隔离的不可信工具（仍应用沙箱 MCP）

### 前置条件

`npm install @cursor/sdk` 或 `pip install cursor-sdk`（Python 0.1.6+）

### 详细使用步骤

1. 安装 SDK：`npm install @cursor/sdk`
2. 定义工具函数与 JSON Schema
3. 创建 Agent 时传入 `local.customTools`
4. `agent.send("...")` 触发调用
5. 检查 `RunResult` 中的 tool 输出

### 命令与配置示例

**基础示例（TypeScript）**

```typescript
import { Agent } from "@cursor/sdk";

async function getBuildStatus(): Promise<string> {
  return "green";
}

const agent = await Agent.create({
  local: {
    customTools: [
      {
        name: "get_build_status",
        description: "Return CI build status for current branch",
        parameters: { type: "object", properties: {} },
        execute: getBuildStatus,
      },
    ],
  },
});

const run = await agent.send("Is CI green? Use get_build_status.");
console.log(await run.wait());
```

**进阶示例 — 结合 JSONL 存储（见特性五）**

```typescript
import { Agent, JsonlLocalAgentStore } from "@cursor/sdk";

const store = new JsonlLocalAgentStore("./agent-runs.jsonl");

const agent = await Agent.create({
  local: {
    store,
    customTools: [/* ... */],
    autoReview: true,
  },
});
```

### 本地测试结果

⚠️ 未安装 `@cursor/sdk` 实测（需 Cursor API 凭证）；官方 changelog 与文档一致 ✅

### 问题与解决方案

**工具未出现在 Agent 上下文** — 确认 `customTools` 在 `create` 而非仅在单次 `send`（除非故意 per-send）

**权限被拒** — 检查 `permissions.json` 的 MCP 规则是否误拦 `custom-user-tools`

### 官方 vs 社区

[SDK Changelog 2026-06-04](https://cursor.com/changelog/sdk-updates-jun-2026) ✅

---

## 特性五：SDK Auto-Review 与 JSONL Store

### 是什么

- **autoReview**：无头 SDK 运行时默认自动执行 tool calls；设置 `local.autoReview: true` 后由分类器决定哪些调用可自动执行、哪些需拦截。
- **JSONL Store**：Agent 元数据写入可 diff 的 append-only JSONL 文件，替代默认 SQLite。

### 管理员 / 平台 SOP

1. 在仓库根目录创建 `.cursor/permissions.json`（团队共享）
2. 定义 `autoRun.allow_instructions` 与 `block_instructions`
3. CI 中设置 `local.autoReview: true`
4. 审计 JSONL 日志文件（可入 git-LFS 或 artifact）

### 完整 permissions.json 示例

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections of build artifacts under ./dist are fine.",
      "Running npm test in read-only CI containers is fine."
    ],
    "block_instructions": [
      "Always pause delete operations.",
      "Pause any curl or wget to non-github.com domains.",
      "Never auto-run docker push."
    ]
  }
}
```

### 业务用户使用 SOP

1. 拉取含 `.cursor/permissions.json` 的仓库
2. 本地 SDK 脚本继承相同策略
3. 被 block 的调用会在日志中标记待人工批准（具体行为依 SDK 版本）

### 本地测试

⚠️ 未实测 SDK 运行时

### 常见问题

**JSONL 文件过大** — 定期 rotate；CI 用 ephemeral in-memory store

**autoReview 过于宽松** — 收紧 `block_instructions` 自然语言描述

---

## 特性六：Canvas Design Mode 与 Context Usage Report（2026-06-04）

### 是什么

- **Design Mode**：在 Canvas 内直接选中、标注 UI 元素，Agent 看到对应代码与布局关系
- **Context Usage Report**：以交互式 Canvas 展示 token 在 system prompt、tools、rules、skills 间的分配

### 适用场景

- **适合**：前端 UI 迭代、调试 context 膨胀、向团队演示 Agent 上下文构成
- **不适合**：纯后端无 UI 项目

### 前置条件

Cursor 3.7+；Canvas 功能可用

### 详细使用步骤

1. 在 Agent 对话中请求生成 Canvas 报告：`Show me context usage as a canvas report`
2. 打开 Canvas 侧边栏
3. Design Mode：点击 UI 元素进行标注
4. 对报告追问：「哪条 rule 占用最多 token？」

### Settings 路径

`Cursor` → `Settings` → `Cursor Settings` → `Features` → `Canvas` → **Design Mode**

### 本地测试

⚠️ Cloud Agent 无 Canvas GUI

### 交叉验证

[Canvas improvements changelog](https://cursor.com/changelog/canvas-improvements) ✅

---

## 特性七：SDK 嵌套子 Agent 任意深度

### 是什么

子 Agent 可再 spawn 子 Agent，无深度硬限制；每层保留独立 prompt 与 model。无需额外开关。

### 示例（概念）

```typescript
// reviewer → test-writer → lint-fixer 链式委派
await agent.send(
  "Review PR, spawn subagent to write tests, then spawn another to fix lint."
);
```

### 建议

- 设定组织级最大深度或 token 预算（自定义 wrapper）
- 用 `requestId`（SDK 6 月更新）关联日志

---

## 今日研究员结论

Cursor 6 月更新主线是 **「审查更快更便宜」+ 「SDK 更可投产」**。开发者应立即在 3.7+ 启用推送前 `/review`；平台团队应把 `permissions.json` + JSONL store 纳入 CI 标准模板。Fable 5 停服间接利好 Cursor：部分用户可能转向 Composer 2.5 驱动的 Bugbot 与 Cursor Agent 作为审查层。
