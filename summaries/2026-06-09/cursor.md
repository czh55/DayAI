# Cursor 每日深度 — 2026-06-09

> 监测源：[cursor.com/changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)  
> **今日（2026-06-09）无新 changelog 条目**；本文覆盖 trigger 前 72 小时内仍属「活跃窗口」的 3.7 更新（6/3～6/5）及 SDK 3.7（6/4）。

---

## 今日状态

| 项目 | 状态 |
|------|------|
| 桌面版 Changelog | 最近更新 **2026-06-05**（Design Mode 多选/语音） |
| SDK | **@cursor/sdk 3.7**（2026-06-04） |
| 本地桌面实测 | ❌ Cloud Agent 环境无 Cursor IDE GUI |

---

## 特性一：SDK Custom Tools（`local.customTools`）

### 是什么

TypeScript / Python SDK 可通过 `local.customTools` 将 **普通函数定义** 注册为 Agent 工具，无需自建 MCP stdio/HTTP 服务。SDK 内置 MCP 服务器 `custom-user-tools` 暴露这些工具，子 agent **自动继承** 父级 custom tools。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| CI 脚本调用内部 API | 需复杂 OAuth 的远程服务（仍用 MCP） |
| 读内部数据库封装 | 无 SDK 的纯 GUI 用户 |

### 前置条件

- `@cursor/sdk` ≥ 3.7 或 `cursor-sdk` ≥ 0.1.6
- Cursor 账号与 API 访问
- Node 18+ 或 Python 3.10+

### 详细使用步骤

1. `npm install @cursor/sdk@latest`
2. 创建 `agent-ci.ts`，定义 `customTools` 数组（name、description、parameters、handler）
3. `Agent.create({ local: { customTools: [...] } })`
4. `agent.send("调用 my_tool 查询构建状态")`
5. `await run.wait()` 读取结果

### 命令与配置示例

```typescript
// agent-ci.ts — 基础示例
import { Agent } from "@cursor/sdk";

const checkBuild = async (args: { branch: string }) => {
  const res = await fetch(`https://ci.example.com/api/build?branch=${args.branch}`);
  return { content: [{ type: "text", text: await res.text() }] };
};

async function main() {
  const agent = await Agent.create({
    local: {
      customTools: [
        {
          name: "check_build",
          description: "Query CI build status for a git branch",
          parameters: {
            type: "object",
            properties: { branch: { type: "string" } },
            required: ["branch"],
          },
          handler: checkBuild,
        },
      ],
    },
  });
  const run = await agent.send("check_build branch=main 并总结是否通过");
  const result = await run.wait();
  console.log(result);
}

main();
```

```typescript
// 进阶：per-send 覆盖工具
const run = await agent.send("仅本次调用 deploy_preview", {
  local: {
    customTools: [
      {
        name: "deploy_preview",
        description: "Trigger preview deploy",
        parameters: { type: "object", properties: {} },
        handler: async () => ({ content: [{ type: "text", text: "deployed" }] }),
      },
    ],
  },
});
```

```bash
npm install @cursor/sdk@3.7
npx tsx agent-ci.ts
```

### 本地测试结果

❌ 未安装 `@cursor/sdk` 并跑通（需 Cursor API 凭证）。  
✅ [官方 changelog 2026-06-04](https://cursor.com/changelog/sdk-updates-jun-2026) 与 [Production AI Institute 评估](https://www.productionai.institute/insights/cursor-sdk-3-7-psf-assessment-2026) 机制一致。

### 问题与解决方案

| 错误 | 排查 |
|------|------|
| 工具不可见 | 确认 `customTools` 在 `create` 或 `send` 传入 |
| 权限被拒 | 检查 `.cursor/permissions.json` MCP 策略 |
| TS2305 类型错误 | 升级 3.7（修复 unpublished workspace 类型引用） |

### 交叉验证

- 官方：https://cursor.com/changelog/sdk-updates-jun-2026 ✅
- 社区：https://www.aiarainia.com/en/news/tools/cursor-sdk-custom-tools-auto-review-jsonl-stores ✅

### 分角色建议

- **个人**：用 customTools 包装个人脚本
- **团队**：统一工具库 npm 包，CI 共享
- **企业**：customTools 走 code review + 审计日志

---

## 特性二：SDK Auto-Review（`local.autoReview`）

### 是什么

无头 SDK Agent 默认 **自动执行** 工具调用（无人审批）。设置 `local.autoReview: true` 后，工具调用经 **分类器子 agent** 裁决：允许 / 换方案 / 挂起待审，规则由 `permissions.json` 自然语言指令驱动。

### 前置条件

- SDK 3.7+
- 项目根 `.cursor/permissions.json`

### 详细使用步骤

1. 创建 `.cursor/permissions.json`（见下方完整示例）
2. `Agent.create({ local: { autoReview: true } })`
3. 运行 headless 脚本
4. 观察被 block 的调用是否按 `block_instructions` 暂停
5. 迭代调整 allow/block 自然语言规则

### 推荐 `.cursor/permissions.json` 完整示例

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections of build artifacts under ./dist are fine.",
      "Running npm test or npm run lint in the project root is allowed.",
      "Reading files under ./src and ./docs without modification is allowed."
    ],
    "block_instructions": [
      "Always pause delete operations so I get a chance to review them.",
      "Block any command that modifies package.json or lockfiles.",
      "Block curl or wget to domains outside *.example.com.",
      "Pause any git push or force-push until a human approves."
    ]
  },
  "mcp": {
    "allowedServers": [],
    "deniedServers": []
  }
}
```

```typescript
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  local: { autoReview: true },
});
```

### Settings 路径（桌面端 Run Mode，与 SDK 概念对齐）

**Settings → Cursor Settings → Agents → Run Mode** → 选择 **Auto-review**（3.6+ 桌面功能；SDK 用 `local.autoReview`）。

### 本地测试

❌ 未跑 SDK headless。桌面 Auto-review 需 GUI。

### 常见错误

| 问题 | 解决 |
|------|------|
| 全部自动执行 | 确认 `autoReview: true` |
| 过度拦截 | 收紧 `block_instructions` 表述 |
| 分类器误判 | 在 allow 中写更具体的「允许形状」 |

### 交叉验证

- 官方 changelog 3.6 + SDK 3.7 ✅
- Production AI Institute PSF 评估：CI 闭环关键能力 ✅

---

## 特性三：JSONL / Custom Agent Store

### 是什么

SDK 本地 agent 元数据默认 SQLite；3.7 起可选 **JsonlLocalAgentStore**——追加写 JSONL，可 diff、可入库版本控制。亦可实现 `LocalAgentStore` 接 Postgres。

### 使用步骤

1. `import { JsonlLocalAgentStore } from "@cursor/sdk"`
2. `Agent.create({ local: { store: new JsonlLocalAgentStore("./.cursor/agents.jsonl") } })`
3. 进程重启后 `Agent.resume(agentId)` 恢复
4. `git add .cursor/agents.jsonl` 团队共享 run 元数据（勿含密钥）

### 配置示例

```typescript
import { Agent, JsonlLocalAgentStore } from "@cursor/sdk";

const store = new JsonlLocalAgentStore("/workspace/.cursor/runs.jsonl");
const agent = await Agent.create({
  local: { store },
});
```

### 本地测试

❌ 未实测 resume；官方 API 导出类名已确认。

---

## 特性四：Nested Subagents（任意深度嵌套）

### 是什么

子 agent 可再 spawn 子 agent，无需额外开关；reviewer → test-writer → fixer 链自动可用。每个层级可独立 prompt/model。

### 使用步骤

1. 在 Agent 定义中配置 subagents（Task 工具）
2. SDK 3.7 自动注册嵌套 executor
3. 父 agent `send` 复杂任务触发嵌套
4. 用 `requestId`（3.7 每 send 生成）关联日志

### 示例

```typescript
// 概念：主 agent 提示词中描述子 agent 分工即可，SDK 3.7 自动支持嵌套 Task
await agent.send(
  "先派 reviewer 子 agent 审 PR，再派 test-writer 补测试，最后汇总"
);
```

### 注意

嵌套深度与 token 成本线性相关；Production AI Institute 建议显式 **blast-radius** 限制。

---

## 特性五：浏览器 Design Mode — 多选元素（2026-06-05）

### 是什么

Cursor 内置浏览器 Design Mode 中，可 **同时选中两个及以上 DOM 元素**，Agent 可见元素代码、布局关系，便于「让 A 样式匹配 B」「批量删除重复块」等 UI 编辑。

### 前置条件

- Cursor 3.7 桌面版
- 项目可在 Cursor Browser 预览

### 详细使用步骤

1. 在 Agent 中打开 **Browser / Preview**
2. 进入 **Design Mode**（画布或浏览器 overlay）
3. Shift+点击（或官方文档所述多选手势）选中多个元素
4. 在聊天框描述关系型修改：「让左侧卡片与右侧 hero 同宽」
5. Agent 应用 patch 后在浏览器验证

### 预期结果

选中元素的 computed style / 组件源码进入 agent 上下文，单次 turn 完成多元素协调修改。

### 本地测试

❌ 无 Cursor 桌面 GUI，未实测。

### 交叉验证

- https://cursor.com/changelog ✅
- developertoolkit.ai 版本笔记 ✅

---

## 特性六：Design Mode 语音输入（2026-06-05）

### 是什么

Design Mode overlay 支持 **语音叙述** UI 修改；Agent 运行中麦克风仍可用，可 **排队** 下一条语音指令而无需等上一轮结束。

### 使用步骤

1. Design Mode 中点击麦克风
2. 口述：「把导航栏背景改成深色，logo 放大 20%」
3. Agent 执行中可继续口述下一条
4. 检查无障碍与隐私政策（语音上传云端）

### 适用场景

- 快速 UI 迭代、双手占用场景
- 不适合安静开放办公区

---

## 特性七：Canvas Design Mode + Context Usage Report（2026-06-04）

### 是什么

**Canvas** 内可选中标注 UI；Agent 可生成 **上下文用量交互报告**（system prompt、tools、rules、skills 占比），内嵌「Debug with Agent」按钮开新会话优化 token。

### Settings 路径

Agent 会话 → 打开 Canvas → Design Mode 工具栏 → Context explorer（报告由 agent 生成于 canvas）。

### 使用步骤

1. 让 Agent 创建 dashboard/report canvas
2. 请求「展示 context usage breakdown」
3. 在 canvas 点击 **Debug with Agent**
4. 按建议删减 rules/skills

---

## 特性八：Organizations / Teams / Groups（Enterprise GA，2026-06-03）

### 是什么

企业可在一个 **Organization** 下管理多 **Team**，每 team 独立安全/预算/模型策略；**Groups** 跨 team 细分权限与 spend cap。

### 管理员开启 SOP

1. Enterprise 管理员登录 Cursor Dashboard
2. **Organization Settings** → 创建 Organization（若迁移则原 team 变默认 team）
3. **Teams** → New Team → 配置模型访问、Agent 权限、预算
4. **Groups** → 按 cohort 设置 spend / model allowlist
5. IDP：Organization-level SSO/SCIM
6. 用户可在多 team 间切换，**最宽松策略胜出**

### 业务/开发者使用 SOP

1. 登录后选择正确 Team context
2. 日常 Agent 使用受 team 策略约束
3. 跨部门协作时确认自己所在 group 的模型列表

### 本地测试

❌ 需 Enterprise 租户，未实测。

---

## SDK 3.7 可靠性补丁摘要

| 补丁 | 说明 |
|------|------|
| `requestId` | 每次 `send()` 可关联后端日志 |
| `wait()` | 本地 run 写完终态再 resolve |
| Composer 2 → 2.5 | 旧 slug 自动路由 |
| Python `list_runs(cwd=)` | 修复 subprocess bridge 找不到 agent |

---

## 本地实测总览

本环境为 Cloud Agent，**未安装 Cursor IDE**。SDK 特性以官方 changelog + 第三方 PSF 评估交叉验证；建议读者在本地执行：

```bash
npm install @cursor/sdk@3.7
pip install cursor-sdk==0.1.6
```

---

## 今日研究员结论

Cursor 在 6/9 无桌面更新，但 **SDK 3.7 是企业把 Agent 嵌入 CI 的分水岭**（customTools + autoReview + JSONL）。桌面侧 **Design Mode 多选/语音** 降低 UI Agent 的描述成本。未来 3–6 个月可观察：SDK headless 是否在中文团队替代部分自研 Agent 框架——取决于 Cursor 中国区可用性与定价。
