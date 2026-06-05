# Cursor 每日技术文档 — 2026-06-05

> 官方 Changelog：https://cursor.com/changelog  
> 今日重点：**3.7（2026-06-05）浏览器 Design Mode**；**SDK 批更新（2026-06-04）**

## 今日综述

2026-06-05 Cursor 发布 **3.7** changelog 条目，核心是将 **Design Mode** 扩展到 **Cursor 内置浏览器**：支持多元素选择、语音输入，Agent 运行中可持续接收语音队列指令。2026-06-04 同日有两条重要更新：**Canvas Design Mode + Context 使用报告**，以及 **TypeScript/Python SDK** 的 customTools、autoReview、JSONL 存储、无限嵌套 subagent。

桌面端 **Auto-review** 运行模式于 3.6（5/29）GA，与 SDK 的 `local.autoReview` 形成「有人/无人 loop」双轨。

---

## 本地实测说明

Cursor 桌面 IDE 与 `@cursor/sdk` **未在本 CI 环境安装**（无 GUI）。以下 CLI 相关能力以官方 changelog 与 npm 文档为准；**未实测原因**：headless Linux 无 Cursor.app / 无 Cursor 账号登录。

可验证项：

```bash
# 若已安装 SDK（本环境未装）
npm install @cursor/sdk
# 或 pip install cursor-sdk
```

---

## 特性一：浏览器 Design Mode — 多选元素（3.7 / 2026-06-05）

### 是什么（机制说明）

Design Mode 原已在 **Canvas** 中提供（6/4）；6/5 扩展到 **Cursor Browser**。用户可在渲染页面上**点击选择 DOM 元素**（支持 **Shift/多选两个及以上**），Cursor 将选中元素的 **DOM、源码位置、布局关系** 注入 Agent 上下文，用视觉+结构信息驱动 UI 修改，替代纯自然语言描述。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 对齐两个组件样式 | 纯后端 API 修改 |
| 批量调整一组重复卡片 | 无前端预览的服务端模板 |
| 设计稿级微调 spacing/颜色 | 无法在内置浏览器打开的项目 |

### 前置条件

- Cursor **3.7+**
- 项目可在 Cursor Browser 中预览（通常 Web 前端）
- Agent 有权限编辑对应源码文件

### 详细使用步骤

1. 升级 Cursor 至 3.7（Help → Check for Updates 或官网下载）
2. 打开 Agents 窗口，启动可在浏览器预览的前端任务
3. 打开 **Cursor Browser** / 预览面板
4. 进入 **Design Mode**（界面 overlay，与 Canvas 版类似）
5. **按住 Shift 或依次点击** 两个以上元素完成多选
6. 在 Agent 输入框描述意图，例如：「让左侧卡片与右侧 hero 的圆角和阴影一致」
7. 审查 Agent diff，保存并在浏览器刷新验证

### 命令与配置示例

Design Mode 为 GUI 功能，无 CLI。推荐配合 **Rules** 约束 UI 修改范围：

```markdown
<!-- .cursor/rules/ui-design-mode.mdc -->
When using Design Mode multi-select:
- Only edit Tailwind classes in src/components/**
- Do not change routing or data fetching
- Preserve accessibility attributes on selected nodes
```

推荐 **`.cursor/permissions.json`** 片段（与 auto-review 协同，完整示例见特性四）：

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only inspection of files under src/components is allowed during Design Mode iterations."
    ],
    "block_instructions": [
      "Never delete files under src/ without explicit user approval.",
      "Block npm publish and git push during Design Mode sessions."
    ]
  }
}
```

### 本地测试结果

未实测（无 Cursor 桌面）— ⚠️  
官方 changelog 6/5 描述与 6/4 Canvas Design Mode 机制一致 — 社区预期 ✅

### 问题与解决方案

**问题 1：多选后 Agent 只改了一个元素**

- 排查：是否完成多选高亮；prompt 是否明确 "all selected elements"
- 解决：在 prompt 中粘贴 Design Mode 生成的元素列表摘要

**问题 2：Browser 无法加载本地 dev server**

- 排查：vite/next 是否绑定 `0.0.0.0`；Cursor 是否允许访问 localhost
- 命令：`npm run dev -- --host 0.0.0.0`

### 官方 vs 社区交叉验证

| 来源 | URL | 一致性 |
|------|-----|--------|
| 官方 Changelog 6/5 | https://cursor.com/changelog | 基准 |
| 官方 Changelog 6/4 Canvas | 同上 | 机制一致 |
| 社区 | 暂无独立 6/5 长文 | — |

### 分角色建议

- **个人前端**：多选 + 短 prompt 迭代 UI，比截图粘贴省 token
- **团队**：Design Mode 修改必须走 PR + visual regression
- **企业**：Browser 访问内网 staging 需 VPN；permissions.json 禁止 prod URL

---

## 特性二：Design Mode 语音输入（3.7 / 2026-06-05）

### 是什么

Design Mode overlay 内建 **麦克风**；Agent **运行过程中** 麦克风仍可用，可**语音队列下一条修改**，无需等上一轮结束。

### 前置条件

- Cursor 3.7+
- 系统麦克风权限
- 企业环境需确认是否允许语音数据上传（视 Cursor 隐私政策）

### 详细使用步骤

1. 进入 Browser Design Mode
2. 点击 overlay 上 **麦克风图标**
3. 口述修改（如「把选中按钮改成 primary blue，字号加大一号」）
4. Agent 运行中可继续按住麦克风追加指令
5. 查看 Agent  transcript 确认理解无误

### 配置示例

无独立 settings key；可在 Cursor Settings 搜索 **voice** / **microphone** 确认启用。

### 本地测试

未实测 ⚠️

### 常见错误

1. **麦克风无输入**：OS 权限 / 远程桌面无音频设备
2. **语音识别语言错误**：在 prompt 中首句指定「请用简体中文理解」

### 利弊

- 利：站立会议、双手占用时快速改 UI
- 弊：开放式办公隐私；识别错误导致错误 diff

---

## 特性三：SDK Custom Tools（2026-06-04）

### 是什么

`@cursor/sdk` / `cursor-sdk` 可通过 `local.customTools` 在 **Agent.create()** 或单次 **send()** 注册 **JavaScript 函数**，SDK 通过内置 MCP 服务器 **`custom-user-tools`** 暴露给 Agent，**子 Agent 继承**父级 custom tools。

### 前置条件

- `npm install @cursor/sdk` 或 `pip install cursor-sdk`
- Node 18+ / Python 3.10+
- 本地 Agent 运行环境

### 详细使用步骤

1. 安装 SDK：`npm install @cursor/sdk`
2. 编写脚本，定义 customTools  schema + handler
3. `Agent.create({ local: { customTools: [...] } })`
4. `agent.send("use my_tool to ...")`
5. 查看 run 日志与 `requestId` 关联 CI

### 命令与配置示例

**基础 — TypeScript**

```typescript
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  local: {
    customTools: [
      {
        name: "get_build_version",
        description: "Return package.json version",
        parameters: { type: "object", properties: {} },
        execute: async () => {
          const pkg = await import("./package.json", { assert: { type: "json" } });
          return { version: pkg.default.version };
        },
      },
    ],
  },
});

const run = await agent.send("Call get_build_version and print result");
await run.wait();
console.log(run.result);
```

**进阶 — 与 autoReview 联用**

```typescript
const agent = await Agent.create({
  local: {
    autoReview: true,
    customTools: [/* ... */],
  },
});
```

### 本地测试

未安装 @cursor/sdk — ⚠️ 未实测；changelog 代码片段与 API 命名一致 ✅

### 常见错误

1. **Tool 未出现在子 Agent**：确认 SDK 版本 ≥ 6/4 发布版
2. **execute 抛错未捕获**：在 handler 内返回 `{ error: message }` 结构

### 交叉验证

- https://cursor.com/changelog （6/4 SDK 章节）✅

---

## 特性四：SDK Auto-review + permissions.json（2026-06-04）

### 是什么

Headless 本地 Agent 默认 **自动执行工具**（无人工）。设置 `local.autoReview: true` 后，工具调用经 **分类器** 决定自动执行或 hold；分类器行为由 **`.cursor/permissions.json`** 自然语言指令 steering。

桌面端对应：**Settings → Cursor Settings → Agents → Run Mode → Auto-review**（3.6）。

### 完整 `.cursor/permissions.json` 推荐示例

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections of build artifacts under ./dist are fine.",
      "Running unit tests with npm test or pnpm test without coverage flags is allowed.",
      "Reading files under docs/ and *.md is always allowed."
    ],
    "block_instructions": [
      "Always pause delete operations so I get a chance to review them.",
      "Block any curl or wget to domains outside *.company.com.",
      "Never run docker push or kubectl apply without human approval.",
      "Hold all git push and git reset --hard commands."
    ]
  }
}
```

### 详细使用步骤（桌面）

1. **Settings → Cursor Settings → Agents → Run Mode** → 选 **Auto-review**
2. 在项目根创建或编辑 `.cursor/permissions.json`（如上）
3. 可选：为 classifier 添加自定义说明（Settings 同页）
4. 启动 Agent 任务，观察 Shell/MCP 调用是否自动/待批
5. 调整 `allow_instructions` / `block_instructions` 直至误杀率可接受

### 详细使用步骤（SDK）

1. `Agent.create({ local: { autoReview: true } })`
2. 确保 cwd 下存在 `.cursor/permissions.json`
3. 运行 headless 脚本，检查 hold 的工具是否在日志中标记

### 本地测试

permissions.json 语法可本地 `jq . .cursor/permissions.json` 验证 — ✅（若文件存在）

### 常见错误

1. **所有命令都被 hold**：block_instructions 过宽 → 收窄或删除
2. **SDK 与桌面行为不一致**：确认 SDK 版本与桌面同代

### 交叉验证

- Changelog 6/4 + 3.6 Auto-review 文档 ✅
- 社区：暂无冲突报道

---

## 特性五：JSONL LocalAgentStore（2026-06-04）

### 是什么

Agent run 元数据默认 SQLite；现可换 **JSONL 追加日志**，便于 diff、版本控制或自定义 `LocalAgentStore`（如 Postgres、内存 CI store）。

### 使用步骤

1. 升级 `@cursor/sdk`
2. 导入 `JsonlLocalAgentStore`
3. `Agent.create({ local: { store: new JsonlLocalAgentStore(path) } })`
4. CI 结束后归档 JSONL  artifact

### 示例

```typescript
import { Agent, JsonlLocalAgentStore } from "@cursor/sdk";
import path from "node:path";

const store = new JsonlLocalAgentStore(path.join(".cursor", "agent-runs.jsonl"));

const agent = await Agent.create({
  local: { store },
});
```

### 本地测试

未实测 ⚠️

### 常见错误

- **并发写冲突**：多进程写同一 JSONL → 每 job 独立文件
- **敏感数据入库**：JSONL 可能含 prompt → 加入 `.gitignore`

---

## 特性六：Nested Subagents（2026-06-04）

### 是什么

Subagent 可再 spawn subagent，**无限深度**；每层独立 prompt/model。Subagent session 自动注册 Task executor — **无需额外开关**。

### 使用步骤

1. 在 agent 定义中配置 subagents（`.cursor/agents` 或 SDK agents JSON）
2. 父 Agent 分配 Task 给 reviewer → reviewer 再 Task 给 test-writer
3. 使用 `requestId` 追踪整条链

### 示例 agents JSON（CLI）

```json
{
  "reviewer": {
    "description": "Reviews code and delegates tests",
    "prompt": "You review diffs. Spawn test-writer subagent for missing coverage.",
    "model": "opus"
  },
  "test-writer": {
    "description": "Writes tests",
    "prompt": "Write minimal tests for the given module."
  }
}
```

```bash
claude --agents '{"reviewer":{...},"test-writer":{...}}' 
# Cursor 桌面：Settings → Agents → Subagents
```

### 利弊

- 利：复杂 pipeline 职责分离
- 弊：token 与延迟指数增长 — 设深度/预算

---

## 特性七：Canvas Context Usage Report（2026-06-04）

### 是什么

Agent 可在 Canvas 展示 **交互式 context 分解**（system prompt、tools、rules、skills 各占 token），可点击 **Debug with Agent** 开新会话优化 context。

### 使用步骤

1. 在 Agent 会话请求「show context usage report in canvas」
2. 打开生成的 Canvas
3. 点击 Debug with Agent 针对最大块优化

### 本地测试

未实测 ⚠️

---

## 升级命令

```bash
npm install @cursor/sdk@latest
pip install -U cursor-sdk
```

Composer 2 客户端 slug 自动路由至 **Composer 2.5**（changelog 说明，旧脚本兼容）。

---

## 参考链接

- Changelog：https://cursor.com/changelog
- Auto-review（3.6）：https://cursor.com/changelog （5/29 条目）
- SDK 文档：Cursor 官网 Docs → SDK
