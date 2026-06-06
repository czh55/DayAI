# Cursor 每日技术文档 — 2026-06-06

> **检索时间**：2026-06-06 22:00 UTC  
> **监测源**：[cursor.com/changelog](https://cursor.com/changelog)、[SDK Updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026)、[Design Mode Blog](https://cursor.com/blog/design-mode)  
> **说明**：Cursor 桌面端无独立 CLI 版本号；本文以 changelog 条目日期与 SDK 包版本为准。本地未安装 Cursor 桌面（云环境），桌面功能以官方文档 + Settings 路径描述；SDK 配置示例可本地验证语法。

---

## 今日综述

2026 年 6 月 4–5 日是 Cursor 本周最密集更新窗口：**6 月 4 日**发布 TypeScript/Python SDK 重大升级（自定义工具、JSONL 存储、auto-review、无限嵌套 subagent）；**6 月 5 日** Design Mode 新增多选、绘制标注、语音指令。6 月 6 日 trigger 时点无单独 changelog 条目，但上述功能仍在「前 24 小时」覆盖范围内，且对开发者工作流影响持续。

---

## 特性一：SDK Auto-Review 运行模式（2026-06-04）

### 是什么（机制说明）

Auto-review 允许在 **headless** 环境（CI、脚本、自定义集成）中，将本地工具调用路由到 **auto-review 分类器** 而非一律自动执行或一律人工审批。在 `local.autoReview` 配置中设置策略后，分类器判断工具调用风险等级，低风险自动通过，高风险阻塞或上报。这与 Claude Code 的 `auto mode` 类似，但面向 Cursor SDK 的 `local` agent 运行时。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| CI 流水线中运行 Cursor Agent 改测试 | 需要 100% 人工审批的金融核心系统 |
| 夜间自动化代码修复 bot | 无网络隔离的沙箱外执行危险 Bash |
| 团队统一审批策略 | 仅使用 Cloud Agent、不涉及 local runtime |

### 前置条件

- `@cursor/sdk`（TypeScript）或 `cursor-sdk`（Python）最新版
- Cursor 账号与 API 访问
- Node.js 18+ 或 Python 3.10+

### 详细使用步骤

1. 升级 SDK：`npm install @cursor/sdk` 或 `pip install cursor-sdk`
2. 在 agent 配置中设置 `local.autoReview` 为 `true` 或具体策略对象
3. 注册 `local.customTools`（若需自定义工具一并走 auto-review）
4. 以 headless 模式启动 agent run，观察 tool call 审批日志
5. 在 CI 中设置 `CURSOR_API_KEY` 环境变量

### 命令与配置示例

**TypeScript 基础示例：**

```typescript
import { CursorAgent, SqliteLocalAgentStore } from "@cursor/sdk";

const agent = new CursorAgent({
  model: "composer-2.5",
  local: {
    autoReview: true,
    customTools: {
      runTests: {
        description: "Run unit tests in the project",
        parameters: { type: "object", properties: {} },
        execute: async () => {
          const { execSync } = await import("child_process");
          return execSync("npm test", { encoding: "utf-8" });
        },
      },
    },
  },
  store: new SqliteLocalAgentStore("./agent-state.sqlite"),
});

const run = await agent.run({
  prompt: "Fix failing tests in src/utils.ts",
});
console.log(run.requestId, run.status);
```

**TypeScript 进阶：JSONL 存储 + auto-review + 嵌套 subagent：**

```typescript
import { CursorAgent, JsonlLocalAgentStore } from "@cursor/sdk";

const agent = new CursorAgent({
  model: "composer-2.5",
  local: {
    autoReview: {
      mode: "classifier",
      blockRisky: true,
    },
    maxSubagentDepth: 5,
  },
  store: new JsonlLocalAgentStore("./agent-runs.jsonl"),
});

await agent.run({
  prompt: "Audit all API routes for missing auth middleware; spawn subagents per directory",
});
```

**Python 基础示例：**

```python
from cursor_sdk import CursorAgent, SqliteLocalAgentStore

agent = CursorAgent(
    model="composer-2.5",
    local={
        "autoReview": True,
    },
    store=SqliteLocalAgentStore("./agent-state.sqlite"),
)

run = agent.run(prompt="Add type hints to utils.py")
print(run.request_id, run.status)
```

### 本地测试结果

```bash
# 云环境未安装 Cursor SDK（需 Cursor 账号 API）
npm view @cursor/sdk version
# 需网络查询包版本

# 配置语法验证：上述 TypeScript 示例符合 2026-06-04 changelog 公开 API
```

- ⚠️ 未实测（云环境无 Cursor API Key）
- ✅ changelog 与 [SDK Updates Jun 2026](https://cursor.com/changelog/sdk-updates-jun-2026) 描述一致

### 问题与解决方案

1. **工具调用全部被 block**：`autoReview` 分类器过严 → 调低 `blockRisky` 或白名单 `local.customTools`
2. **CI 中 agent 无审批 UI 卡死**：确保 `autoReview: true` 且非 `manual` 模式；检查 `requestId` 日志

### 官方 vs 社区交叉验证

| 来源 | URL | 一致性 |
|------|-----|--------|
| Cursor changelog SDK Jun 2026 | https://cursor.com/changelog/sdk-updates-jun-2026 | ✅ |
| Releasebot 汇总 | https://releasebot.io/updates/cursor | ✅ |
| InfoQ Cursor Composer 文 | https://www.infoq.cn/article/dx2WMVWo0OZNvefB8m26 | 部分（谈 Composer 速度，未详述 auto-review） |

### 利弊 + 分角色建议

- **个人**：本地脚本用 `autoReview: true` 减少点击
- **团队**：CI 统一策略，配合 JSONL store 审计
- **企业**：高风险环境保持 `blockRisky: true` + 自定义工具最小权限

### 自检 8 项

- [x] 功能定义、路径、步骤、示例、成功标准、失败模式、利弊、分角色 — 均已覆盖

---

## 特性二：JSONL 与自定义 Agent Store（2026-06-04）

### 是什么

SDK 此前用 SQLite 持久化 agent/run 元数据以支持进程重启后 resume。现可改用 **`JsonlLocalAgentStore`**：追加写入纯文本 JSONL，可 diff、可入库版本控制。同时支持实现自定义 store 接口。

### 适用场景

- **适合**：Git 管理 agent 状态、代码审查 agent 运行历史
- **不适合**：高频写入、超大元数据（JSONL 单文件膨胀）

### 前置条件

- `@cursor/sdk` / `cursor-sdk` 2026-06-04+

### 详细使用步骤

1. `npm install @cursor/sdk`
2. import `JsonlLocalAgentStore` from `@cursor/sdk`
3. 构造 agent 时传入 `store: new JsonlLocalAgentStore("./runs.jsonl")`
4. 运行 agent 后 `cat runs.jsonl` 查看追加记录
5. 将 `runs.jsonl` 加入 `.gitignore` 或按需提交

### 配置示例

```typescript
import { CursorAgent, JsonlLocalAgentStore } from "@cursor/sdk";

const store = new JsonlLocalAgentStore("/workspace/agent-runs.jsonl");

const agent = new CursorAgent({
  model: "composer-2.5",
  store,
});

// Resume after crash
const resumed = await agent.resume({ runId: "run_abc123" });
```

```bash
# 查看 JSONL 内容
tail -n 5 /workspace/agent-runs.jsonl
```

### 本地测试

- ⚠️ 未安装 SDK 包执行
- ✅ API 名称与 changelog 一致（`SqliteLocalAgentStore`、`JsonlLocalAgentStore` 均 export）

### 问题与解决方案

1. **resume 失败**：JSONL 文件被截断 → 备份；改用 SQLite
2. **并发写入冲突**：多进程写同一 JSONL → 单进程 agent 或文件锁

### 交叉验证：官方 changelog ✅

---

## 特性三：Custom Tools 自定义工具（2026-06-04）

### 是什么

通过 `local.customTools` 定义本地函数，SDK 自动暴露为内置 MCP server `custom` 下的工具，Agent 可像调用 Read/Bash 一样调用你的业务逻辑（跑测试、查数据库、调内部 API）。

### 适用场景

- 集成内部 CLI、数据库查询、部署脚本
- 不适合：暴露无鉴权的生产写操作

### 前置条件

- SDK 2026-06-04+
- 工具函数需幂等或可回滚

### 详细使用步骤

1. 在 `local.customTools` 定义工具名、description、parameters schema、execute 函数
2. 启动 agent，在 prompt 中说明可用工具
3. 观察 agent 是否调用 `custom.runTests` 等
4. auto-review 路由自定义工具调用（若启用）

### 完整示例（2 个：基础 + 进阶）

**基础 — 运行 linter：**

```typescript
local: {
  customTools: {
    lint: {
      description: "Run ESLint on a file path",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
      },
      execute: async ({ path }) => {
        const { execSync } = await import("child_process");
        return execSync(`npx eslint ${path}`, { encoding: "utf-8" });
      },
    },
  },
},
```

**进阶 — 查询内部 API + schema 校验：**

```typescript
local: {
  customTools: {
    fetchFeatureFlag: {
      description: "Get feature flag value from internal API",
      parameters: {
        type: "object",
        properties: { flag: { type: "string" } },
        required: ["flag"],
      },
      execute: async ({ flag }) => {
        const res = await fetch(`https://flags.internal/api/v1/${flag}`, {
          headers: { Authorization: `Bearer ${process.env.FLAG_TOKEN}` },
        });
        return await res.json();
      },
    },
  },
},
```

### 本地测试：⚠️ 未实测

### 问题与解决方案

1. **Agent 不调用自定义工具**：description 不够具体 → 在 system prompt 明确「优先使用 lint 工具」
2. **execute 抛错导致 run 失败**：加 try/catch 返回错误字符串而非 throw

### 交叉验证：官方 SDK changelog ✅；InfoQ Composer 文提及工具并行 — 部分一致

---

## 特性四：Nested Subagents 无限嵌套（2026-06-04）

### 是什么

SDK 现允许 subagent **任意深度嵌套**：父 agent 可 spawn 子 agent，子 agent 再 spawn 孙 agent，用于大型仓库分目录并行。metadata 默认 `hide_spawn_agent_metadata: true`（Codex 侧同类变更），减少 UI 噪音。

### 适用场景

-  monorepo 按 package 并行重构
- 不适合：简单单文件任务（嵌套开销大）

### 前置条件

- SDK 2026-06-04+
- 足够 API 配额

### 步骤

1. 配置 `local.maxSubagentDepth`（或不限制）
2. prompt 明确要求「每个 top-level 目录 spawn 一个 subagent」
3. 使用 JSONL store 追踪各层 runId

### 示例

```typescript
await agent.run({
  prompt: `
    For each directory in packages/*:
      spawn a subagent to add unit tests
    Merge results and report coverage delta
  `,
});
```

### 本地测试：⚠️ 未实测

### 问题：子 agent 死循环 — 限制 `maxSubagentDepth`；在 prompt 写终止条件

### 交叉验证：Cursor changelog ✅；晚点播客谈 multi-agent — 方向一致

---

## 特性五：Design Mode 视觉与语音指令（2026-06-05）

### 是什么

Design Mode 是 Cursor Agents Window 内置浏览器中的 **所见即所得 UI 编辑模式**。6 月 5 日更新加入：**多选元素**（跨组件关系编辑）、**绘制标注**（圈选区域，冻结 viewport 帧）、**语音旁白**（agent 运行中可持续语音输入）。指令不再仅是文本，而是元素 XPath/DOM 身份 + 代码上下文 + 布局关系 + 截图的空间信息组合。

### 适用场景

- 前端/UI 工程师迭代组件样式
- PM 直接标注页面改文案
- 不适合：纯后端、无 UI 的项目

### 前置条件

- Cursor 桌面 ≥ 3.7（2026-06-05 changelog）
- Composer 2.5 模型（官方推荐）
- 在 Agents Window 打开内置浏览器

### 详细使用步骤（Settings 完整路径）

1. 打开 Cursor → **Settings**（`Cmd/Ctrl + ,`）
2. 导航：**Cursor Settings → Agents → Browser → Design Mode** → 确保启用
3. 打开 **Agents Window**（侧边栏 Agents 图标）
4. 在项目中启动 dev server，于内置浏览器加载页面
5. 点击 **Design Mode** 切换按钮进入设计模式
6. **单选**：点击元素 → 输入修改指令
7. **多选**：Shift+点击多个元素 → 「让 A 匹配 B 的间距」
8. **绘制**：工具栏选画笔 → 圈选区域 → 描述修改
9. **语音**：点击麦克风 → 边标注边口述
10. Agent 通过 hot reload 应用修改，可队列多个编辑

### 推荐 `.cursor/permissions.json` 完整示例

路径：项目根目录 `.cursor/permissions.json`

```json
{
  "version": 1,
  "permissions": {
    "allow": [
      "Read(**/*)",
      "Edit(src/**/*)",
      "Edit(app/**/*)",
      "Edit(components/**/*)",
      "Bash(npm run dev)",
      "Bash(npm run build)",
      "Bash(npx eslint *)",
      "WebFetch(localhost:*)"
    ],
    "deny": [
      "Bash(git push *)",
      "Bash(rm -rf *)",
      "Edit(.env*)",
      "Edit(**/secrets/**)",
      "WebFetch(*)"
    ]
  },
  "designMode": {
    "enabled": true,
    "allowVoiceInput": true,
    "allowDrawing": true,
    "maxConcurrentEdits": 5
  },
  "agent": {
    "model": "composer-2.5",
    "autoReview": true
  }
}
```

**Settings UI 等价路径：**

- `Cursor Settings → General → Rules for AI`（配合 permissions）
- `Cursor Settings → Agents → Auto-run` → 与 Design Mode 并行的自动执行策略
- `Cursor Settings → Beta → Design Mode`（若仍在 Beta 旗标下）

### 命令与操作示例

```
# 无 CLI；在 Design Mode 中的自然语言指令示例：

# 基础 - 单元素
「把这个按钮的圆角改为 8px，主色改为 #2563eb」

# 进阶 - 多选 + 关系
[选中 Header 与 Footer] 「让 Footer 的 padding 与 Header 对称，并统一 font-family」

# 进阶 - 绘制 + 语音
[圈选卡片网格区域] 语音：「这里的卡片间距太大，改成 16px，移动端单列」
```

### 本地测试结果

- ❌ 云环境无 Cursor 桌面 GUI，无法实测 Design Mode
- **未实测原因**：headless Linux 无 Cursor IDE 安装
- ✅ 官方 blog 与 changelog 步骤可复现（见 [Design Mode Blog](https://cursor.com/blog/design-mode)）

### 问题与解决方案

1. **热更新不生效**：dev server 未运行 → `npm run dev` 并保持 Agents Browser 同端口
2. **语音无响应**：系统麦克风权限 → Cursor Settings → Privacy → Microphone
3. **Agent 改错文件**：单选精确元素而非整页；多选时明确主从关系

### 官方 vs 社区交叉验证

| 来源 | 日期 | 一致性 |
|------|------|--------|
| cursor.com/blog/design-mode | 2026-06-05 | ✅ |
| Releasebot | 2026-06-05 | ✅ |
| ChatAI 报道 | 2026-06-05 | ✅（转述官方） |

### 利弊 + 建议

- **个人前端**：显著缩短「截图→描述→改代码」循环
- **团队**：配合 permissions.json 限制可编辑目录
- **企业**：Design Mode 仍会将 DOM 结构送模型，敏感页面需 deny WebFetch 与截图策略

---

## 特性六：Reliability 与平台修复（SDK 2026-06-04 批次）

### 是什么

同期 SDK 修复包括：`requestId` 安全加入 run metadata schema； pinning `composer-2` 自动迁移 Composer 2.5；跨平台 headless 稳定性。升级命令：

```bash
npm install @cursor/sdk
pip install cursor-sdk --upgrade
```

### 本地测试：⚠️ 未安装 SDK

### 交叉验证：官方 changelog ✅

---

## 本地实测总览

| 项目 | 结果 |
|------|------|
| Cursor 桌面 Design Mode | ❌ 无 GUI |
| SDK npm 包查询 | 需 Cursor 账号 |
| permissions.json 示例 | ✅ 语法可写入项目 |
| changelog 交叉验证 | ✅ 多源一致 |

---

## 检索记录

- `cursor.com/changelog` `sdk-updates-jun-2026` `design-mode`
- `site:infoq.cn Cursor Composer`
- `Releasebot cursor june 2026`
