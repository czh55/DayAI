# Cursor 每日技术文档 — 2026-06-10

> 监测源：[cursor.com/changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)  
> 今日核心更新：**Bugbot 3 倍提速**（6/10）、Design Mode 增强（6/5）、SDK 3.7（6/4）  
> 交叉验证：官方 Changelog + Signal Yomi 日文社区解读

---

## 今日综述

2026-06-10 Cursor 发布 Bugbot 性能重大升级：平均审查时间从 ~5 分钟降至 **~90 秒**，bug 检出率从 0.56 提升至 **0.62**（+10%），单次成本降低 **~22%**。驱动力是 Composer 2.5 训练进展。同日还上线了推送前 `/review` 本地预审能力。本周早些时候（6/4–6/5）的 Design Mode 和 SDK 更新同样值得开发者关注。

---

## 特性一：Bugbot 3 倍提速 + 成本降低（2026-06-10，今日发布）

### 是什么（机制说明，非一句话）

Bugbot 是 Cursor 的 AI 代码审查 Agent，集成在 GitHub/GitLab PR 流程和 Cursor IDE 中。6/10 更新后，Bugbot 由 **Composer 2.5** 驱动，在保持（并提升）检出率的同时大幅缩短审查时间和 token 消耗。官方数据：平均审查时间 ~90 秒（原 ~5 分钟），每次审查平均发现 0.62 个 bug（原 0.56），成本降低约 22%。Bugbot 尊重组织的 model block lists，实际性能因配置而异。

### 适用场景

**适合：** 中大型 PR 的自动审查、安全敏感代码库、团队 CI 集成的 pre-merge 检查  
**不适合：** 极小改动（<10 行）的 PR（overhead 不划算）、无 Git 集成的纯本地项目

### 前置条件

- Cursor **3.7+**
- Bugbot 已在组织/个人设置中启用
- GitHub 或 GitLab 仓库已连接（PR 审查）或本地项目已打开（IDE 审查）
- Composer 2.5 未被 model block list 禁用

### 详细使用步骤

1. 确保 Cursor 升级到 3.7+：`Cursor → Check for Updates`
2. 打开项目，在 Source Control 面板确认有未推送的更改
3. 在 Agent 输入框输入 `/review` 或 `/review-bugbot`
4. 选择要运行的审查 Agent（Bugbot / Security Review）
5. 等待 ~90 秒，审查结果出现在侧边栏
6. 修复标记的问题后重新运行或推送

### 命令与配置示例

**基础示例：推送前本地审查**

```
# 在 Cursor Agent 输入框
/review-bugbot
```

**进阶示例：配置仅审查 PR 增量**

在 Cursor Settings 中配置 Bugbot 只审查自上次审查以来的新更改：

```
Settings → Cursor Settings → Bugbot → Review Scope → "Only new changes since last review"
```

**推荐 `.cursor/permissions.json` 完整示例**（配合 Bugbot + Agent 工作流）：

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections of source files under ./src are fine.",
      "Running linters and type checkers (eslint, tsc --noEmit) is allowed.",
      "Read-only git commands (git diff, git log, git status) are allowed."
    ],
    "block_instructions": [
      "Always pause delete operations so I get a chance to review them.",
      "Block any git push or force push commands.",
      "Block modifications to .env, credentials, or secrets files.",
      "Block npm publish or docker push commands."
    ]
  },
  "allow": [
    "Read(**/*)",
    "Grep(**/*)",
    "Glob(**/*)",
    "Shell(git *)",
    "Shell(npm run lint)",
    "Shell(npm run test)",
    "Shell(npx tsc --noEmit)"
  ],
  "deny": [
    "Shell(git push *)",
    "Shell(rm -rf *)",
    "Read(.env*)",
    "Read(**/secrets/**)"
  ]
}
```

Settings 完整路径：`Cursor → Settings → Cursor Settings → Rules and Permissions → Edit permissions.json`

### 本地测试结果

| 项目 | 结果 | 状态 |
|------|------|------|
| Changelog 数据 | ~90s / 0.62 bugs / -22% cost | ✅ 官方确认 |
| 本地 Bugbot 运行 | 需 Cursor Desktop 3.7+ | ⚠️ 云环境无 Desktop |
| Composer 2.5 驱动 | Changelog 明确说明 | ✅ |

### 问题与解决方案

**错误 1：Bugbot 仍然很慢（>3 分钟）**
- 排查：检查 Settings → Models → 是否 block 了 Composer 2.5
- 解决：解除 block 或等待组织策略更新

**错误 2：审查结果与 GitHub PR Bugbot 重复**
- 原因：未使用 `/review` 同步机制
- 解决：先本地 `/review`，再开 PR——相同 diff 会被识别跳过

### 官方 vs 社区交叉验证

| 来源 | 链接 | 一致性 |
|------|------|--------|
| Cursor Changelog 6/10 | https://cursor.com/changelog | 基准 |
| Cursor Blog 6/10 | https://cursor.com/blog | 一致 |
| Releasebot 汇总 | https://releasebot.io/updates/cursor | 一致 |

### 利弊分析 + 分角色使用建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 推送前 habit：`/review-bugbot`；小项目可跳过 |
| 团队 | 强制 PR 前本地 review + GitHub Bugbot 双检 |
| 企业 | 配置 model block list；监控 Bugbot token 消耗报表 |

---

## 特性二：推送前 `/review` 本地预审（2026-06-10）

### 是什么（机制说明，非一句话）

开发者可在 push 之前于 Cursor IDE 或 cursor.com/agents 运行 Bugbot 和 Security Review。`/review` 弹出 Agent 选择器；`/review-bugbot` 和 `/review-security` 直达特定审查。关键创新：**与 GitHub/GitLab Bugbot 同步**——若本地 `/review` 后开 PR 的 diff 相同，远程 Bugbot 会识别并跳过重复审查，留 comment 说明已审查。

### 适用场景

**适合：** 想减少 PR 往返的开发者、CI 等待时间敏感团队  
**不适合：** 无 Git 托管的纯本地项目

### 前置条件

- Cursor 3.7+
- cursor.com/agents 账号（Web 端）
- CLI 支持即将推出（changelog 注明 "coming soon"）

### 详细使用步骤

1. 完成代码修改，`git add` 但先不 push
2. 在 Cursor Agent 输入 `/review`
3. 选择 Bugbot 和/或 Security Review
4. 等待审查完成，修复问题
5. `git push` 并开 PR——远程 Bugbot 自动识别已审查 diff

### 命令与配置示例

```
# 基础
/review

# 直达 Bugbot
/review-bugbot

# 直达安全审查
/review-security
```

### 本地测试结果

⚠️ 需 Cursor Desktop 3.7+，云环境未实测。官方 changelog 功能描述完整。

### 问题与解决方案

**错误 1：PR 上 Bugbot 仍重新审查**
- 排查：确认本地 diff 与 PR diff 完全一致（包括 unstaged changes）
- 解决：先 commit 再 `/review`，然后 push 同一 commit

**错误 2：`/review` 命令不存在**
- 排查：Cursor 版本 < 3.7
- 解决：升级 Cursor

---

## 特性三：Design Mode 多选 + 语音输入（2026-06-05）

### 是什么（机制说明，非一句话）

Design Mode 是 Cursor 内置浏览器中的可视化 UI 编辑模式。6/5 更新新增：**多元素同时选择**（点击 2+ 元素，Agent 获取代码+布局+视觉关系上下文）和**语音输入**（麦克风在 Agent 运行期间保持可用，可队列下一条语音指令）。

### 适用场景

**适合：** 前端 UI 微调、设计-开发协作、快速原型迭代  
**不适合：** 纯后端项目、无浏览器的 headless 环境

### 前置条件

- Cursor 3.7+
- 项目有可运行的前端 dev server
- 麦克风权限（语音功能）

### 详细使用步骤

1. 在 Cursor 中启动项目 dev server
2. 打开 Cursor Browser（内置浏览器面板）
3. 启用 Design Mode（浏览器工具栏按钮）
4. **多选**：按住 Shift 点击多个 UI 元素
5. 在 overlay 中描述修改意图，或使用语音
6. Agent 执行修改后检查浏览器预览

### 命令与配置示例

```
# 在 Design Mode overlay 文本框
Make the header button match the footer button style

# 多选后
Remove the duplicate content between these two cards and align their padding
```

**permissions.json 补充**（允许浏览器工具）：

```json
{
  "allow": [
    "Read(**/*)",
    "Edit(**/*.{tsx,jsx,css,scss})",
    "Shell(npm run dev)"
  ]
}
```

Settings 路径：`Cursor → Settings → Cursor Settings → Beta → Design Mode`（若存在）

### 本地测试结果

⚠️ 需 Cursor Desktop + 浏览器面板，云环境未实测。

### 问题与解决方案

**错误 1：多选后 Agent 只修改了一个元素**
- 排查：确认所有目标元素在 overlay 中高亮
- 解决：重新多选并明确描述关系

**错误 2：语音无响应**
- 排查：系统麦克风权限、浏览器权限
- 解决：检查 Cursor Settings → Privacy → Microphone

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Cursor Changelog 6/5](https://cursor.com/changelog) | 基准 |
| [Signal Yomi 报道](https://signalyomi.com/articles/cursor-design-mode-sdk-update/) | 一致 |

---

## 特性四：Cursor SDK Custom Tools + Auto-Review（2026-06-04）

### 是什么（机制说明，非一句话）

TypeScript (`@cursor/sdk`) 和 Python (`cursor-sdk`) SDK 6/4 重大更新：  
1. **Custom Tools**：通过 `local.customTools` 传入函数定义，SDK 自动暴露为 `custom-user-tools` MCP server  
2. **Auto-Review**：headless 运行时通过 `local.autoReview` 路由工具调用至分类器，用 `permissions.json` 的 `autoRun.allow/block_instructions` 自然语言控制  
3. **JSONL Store**：替代 SQLite 的 append-only 元数据存储  
4. **Nested Subagents**：任意深度嵌套

### 适用场景

**适合：** CI/CD 集成、自定义内部工具链、生产级 Agent 脚本  
**不适合：** 纯 GUI 用户（无需 SDK）

### 前置条件

- `npm install @cursor/sdk` 或 `pip install cursor-sdk`
- Node.js 18+ 或 Python 3.10+
- Cursor API 凭证

### 详细使用步骤

1. 安装 SDK：`npm install @cursor/sdk`
2. 创建 Agent 并传入 custom tools
3. 配置 `local.autoReview: true`
4. 编写 `permissions.json` 控制自动执行边界
5. 运行 headless 脚本并检查 `requestId` 关联日志

### 命令与配置示例

**基础：Custom Tool**

```typescript
import { Agent } from '@cursor/sdk';

const agent = await Agent.create({
  local: {
    customTools: [
      {
        name: 'get_build_status',
        description: 'Get CI build status for current branch',
        parameters: {
          type: 'object',
          properties: {
            branch: { type: 'string', description: 'Git branch name' }
          },
          required: ['branch']
        },
        execute: async ({ branch }) => {
          const res = await fetch(`https://ci.example.com/api/builds?branch=${branch}`);
          return await res.json();
        }
      }
    ]
  }
});

const result = await agent.send('Check if the current branch build is green');
await result.wait();
console.log(result.text);
```

**进阶：Auto-Review + JSONL Store**

```typescript
import { Agent, JsonlLocalAgentStore } from '@cursor/sdk';

const store = new JsonlLocalAgentStore('./agent-runs.jsonl');

const agent = await Agent.create({
  local: {
    store,
    autoReview: true,
    customTools: [/* ... */]
  }
});

const run = await agent.send('Deploy staging environment');
console.log('requestId:', run.requestId);
const result = await run.wait();
```

`permissions.json`：

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections of build artifacts under ./dist are fine."
    ],
    "block_instructions": [
      "Always pause delete operations so I get a chance to review them."
    ]
  }
}
```

### 本地测试结果

| 项目 | 结果 | 状态 |
|------|------|------|
| SDK 安装 | `npm install @cursor/sdk` 可执行 | ⚠️ 未在本环境安装实测 |
| Changelog 代码示例 | 与官方一致 | ✅ |

### 问题与解决方案

**错误 1：Custom tool 不可见给 subagent**
- 原因：v6/4 前不支持；现已自动继承
- 解决：升级 SDK 到最新

**错误 2：`wait()` 提前返回**
- 原因：旧版 bug
- 解决：6/4 修复——升级到最新 SDK

### 官方 vs 社区交叉验证

| 来源 | 链接 | 一致性 |
|------|------|--------|
| [SDK Changelog](https://cursor.com/changelog/sdk-updates-jun-2026) | 基准 | — |
| [Releasebot](https://releasebot.io/updates/cursor) | 一致 | ✅ |

---

## 特性五：Enterprise Organizations 多团队管理（2026-06-03）

### 是什么（机制说明，非一句话）

Enterprise 客户可在一个 Organization 下管理多个 Team，每个 Team 有独立的安全、治理、预算和功能设置。新增 Groups 轻量用户分组（跨 Team 的模型访问、spend limit、agent 权限）。用户可属于多个 Team，取最宽松权限。

### 适用场景

**适合：** 大型企业的多部门/多区域 Cursor 部署  
**不适合：** 个人用户和小团队（Teams 计划已足够）

### 前置条件

- Cursor Enterprise 订阅
- Admin 角色

### 详细使用步骤（管理员）

1. 登录 Cursor Dashboard → Organization Settings
2. 创建 Organization（若尚未有）
3. 在 Organization 下创建 Teams（部门/区域）
4. 配置每个 Team 的 model access、spend limits、security policies
5. 创建 Groups 做跨 Team 的权限分组
6. 通过 Dashboard/API/CSV 移动用户

### 详细使用步骤（业务用户）

1. 接受 Team 邀请
2. 在 Cursor IDE 登录后自动继承 Team 设置
3. 若属于多 Team，默认路由到创建 Team 时指定的 home team

### 命令与配置示例

管理员通过 Dashboard 操作，无 CLI 命令。API 端点见 [Cursor Enterprise Docs](https://cursor.com/docs/enterprise)。

### 本地测试结果

⚠️ 需 Enterprise 账号，未实测。

### 问题与解决方案

**错误 1：用户看不到预期模型**
- 排查：检查 Group vs Team 权限取最宽松规则
- 解决：在 Dashboard 确认 model allowlist

**错误 2：支出统计不准确**
- 排查：Organization 级 rollup 有延迟
- 解决：使用 drill-down 到具体 Team

---

## 检索记录

- cursor.com/changelog：2026-06-10 22:05 UTC
- cursor.com/blog：2026-06-10 22:06 UTC
