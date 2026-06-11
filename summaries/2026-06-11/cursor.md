# Cursor 每日深度 — 2026-06-11

> 官方源：[cursor.com/changelog](https://cursor.com/changelog)  
> 检索日：**2026-06-11**；最近重大更新：**2026-06-10 Bugbot**、**2026-06-04 SDK**、**2026-06-05 Design Mode**  
> 本地说明：Cursor 桌面 IDE 无法在 headless 环境完整实测；下文 CLI/SDK 相关命令可在本地 Node 项目验证

---

## 今日总览

6/11 当日 Cursor 官网**无新 changelog 条目**；行业讨论仍围绕 **6/10 Bugbot 性能跃迁**（Composer 2.5 驱动，审查 ~90s、成本 -22%、bug 检出 +10%）及 **6/4 Agent SDK 生产化能力**（自定义工具、auto-review、JSONL 存储、无限嵌套子 Agent）。对日常开发者而言，**推送前 `/review`** 与 **`.cursor/permissions.json` 自动审查策略** 是今日最值得落地的两项。

社区交叉：[Releasebot Cursor 2026-06](https://releasebot.io/updates/cursor) 与官方 changelog 时间线一致。

---

## 特性一：Bugbot 性能升级（Composer 2.5，2026-06-10）

### 是什么

**Bugbot** 是 Cursor 面向 PR 的自动代码审查 Agent。2026-06-10 起由 **Composer 2.5** 驱动：平均审查时间从 ~5 分钟降至 **~90 秒**（官方称 >3× 提速），单次运行成本约 **降 22%**，平均每 review 检出 bug 数从 0.56 升至 **0.62**（+10%）。仍受组织 **model block list** 影响。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| GitHub/GitLab PR 常规审查 | 无 Git 集成的纯本地实验 |
| 中大型 diff 的安全/逻辑扫描 | 需 100% 确定性规则引擎的场景（应配 linter/静态分析） |

### 前置条件

- **Cursor 3.7+** 或 cursor.com/agents
- 仓库已连接 GitHub/GitLab
- Bugbot 已在组织设置中启用

### 详细使用步骤

1. 打开 Cursor → **Settings** → 搜索 `Bugbot` → 确认已连接代码托管
2. 在 PR 页面等待 Bugbot 自动评论，或本地改完后使用 **`/review`**（见特性二）
3. 组织管理员可在 Cursor Dashboard 配置 model block list
4. 对比前后：同一 PR 记录审查耗时与评论条数

### 命令与配置示例

IDE 内聊天框：

```text
/review-bugbot
```

PR 设置（仅审增量，见特性三）在 Bugbot 配置 UI 勾选 **Only review changes since last review**。

### 本地测试结果

⚠️ **未实测 Bugbot 云端审查**——需 Cursor 3.7 桌面客户端与已连接仓库。官方 changelog 数据与 [Releasebot 摘要](https://releasebot.io/updates/cursor) 一致 ✅。

### 问题与解决方案

1. **审查仍很慢**：检查 block list 是否路由到更慢模型；diff 过大时拆分 PR。  
2. **检出率无提升**：确认 Bugbot 版本已切 Composer 2.5（6/10 后默认）。  
3. **与 GitHub App 冲突**：断开重装 Cursor GitHub 集成。

### 官方 vs 社区

- 官方：https://cursor.com/changelog/bugbot-updates-june-2026  
- Releasebot：https://releasebot.io/updates/cursor — 一致

### 分角色建议

- **个人**：在 side project 开 Bugbot 免费档试用。  
- **团队**：把 Bugbot 设为 PR 必过检查之一，与 CI test 并列。  
- **企业**：评估 Composer 2.5 数据驻留与 block list 合规。

---

## 特性二：推送前 `/review` 与 GitHub/GitLab 同步（2026-06-10）

### 是什么

开发者可在 **push 之前** 在 Cursor 内运行 **`/review`**，选择 Bugbot 和/或 Security Review；也可用 **`/review-bugbot`**、**`/review-security`** 直达。若本地 `/review` 的 diff 与随后 PR 相同，云端 Bugbot **识别已审 diff、跳过重复审查** 并留言说明。

CLI 支持「coming soon」（changelog 原文）。

### 前置条件

- Cursor **3.7+**
- 本地分支有未推送 commit 或 staged 变更
- 远程已配置 `origin`

### 详细使用步骤

1. 完成本地开发并 `git commit`
2. Cursor Agent 输入：`/review`
3. 在弹窗勾选 **Bugbot**、**Security Review**
4. 根据评论修复后再次 `/review` 或 push
5. 打开 PR：确认 Bugbot 未重复全量扫描

### Settings 完整路径

```text
Cursor → Settings (Ctrl+,) → Cursor Settings → Features → Bugbot
```

或：**Cursor Settings → Beta / Agents → Code Review**

（路径因版本略有差异；Settings 搜索框输入 `review` 最快。）

### 命令与配置示例

```text
/review
/review-bugbot
/review-security
```

### 本地测试结果

⚠️ 需桌面 IDE；headless 环境无法调用 `/review`。

### 问题与解决方案

1. **`/review` 无选项**：升级 3.7+；登录 Cursor 账号。  
2. **PR 仍全量重审**：确认 push 的 diff 与本地 review 完全一致（含 merge base）。  
3. **Security Review 误报**：在 permissions.json 用 `block_instructions` 约束删除类操作（见特性四）。

### 官方 vs 社区

官方 changelog 6/10；量子位 6/11 转述 Fable 5 时侧面印证「审查前置」趋势，无矛盾。

---

## 特性三：仅审查 PR 增量变更（2026-06-10）

### 是什么

可配置 Bugbot **只审查自上次 review 以来的新 commit**，避免大 PR 反复全量扫描、评论噪音。

### 步骤

1. Cursor Dashboard 或 PR 集成设置 → Bugbot → **Only review what's new**
2. 推送新 commit 后 Bugbot 仅扫增量 diff

### 示例配置意图

适合频繁 push 的 feature 分支；不适合每次都需要全库安全基线扫描的合规 PR（应关闭增量模式）。

### 问题与解决方案

1. **漏掉跨文件关联 bug**：重大重构时手动触发 full review。  
2. **评论线程混乱**：在 PR 描述中标注「incremental review 开启」。

---

## 特性四：SDK 自定义工具 + Auto-Review（2026-06-04）

### 是什么

**TypeScript / Python Cursor SDK** 更新：通过 `local.customTools` 把**本地函数**暴露给 Agent（内置 MCP 服务器 `custom-user-tools`）；`local.autoReview` 让无人工 headless 运行时仍走**分类器审查**而非全自动执行。

### 前置条件

```bash
npm install @cursor/sdk
# 或
pip install cursor-sdk
```

Cursor SDK **0.1.6+**（Python）；TypeScript 取 npm latest。

### 详细使用步骤

1. 项目根创建 `.cursor/permissions.json`（见下方完整示例）
2. TypeScript：

```typescript
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  local: {
    customTools: [
      {
        name: "check_dist",
        description: "Read-only inspect ./dist artifacts",
        parameters: { type: "object", properties: {} },
        execute: async () => ({ ok: true }),
      },
    ],
    autoReview: true,
  },
});
await agent.send("Run check_dist on the latest build");
```

3. 运行脚本前确保 `permissions.json` 与 store 路径可写
4. 升级：`npm install @cursor/sdk@latest`

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
      "Block any command that runs curl or wget to external domains.",
      "Block modifications to .env, secrets/, and *.pem files.",
      "Pause git push or git reset --hard."
    ]
  },
  "shell": {
    "allow": [
      "npm test",
      "npm run lint",
      "git status",
      "git diff"
    ],
    "deny": [
      "rm -rf",
      "sudo"
    ]
  }
}
```

**Settings 路径（桌面）**：`Cursor → Settings → Cursor Settings → Rules → Project Rules` 旁可打开 `.cursor` 目录；permissions 文件放在**仓库根** `.cursor/permissions.json`。

### 本地测试结果

```bash
npm view @cursor/sdk version
```

✅ registry 可解析包名；⚠️ 本仓库未安装 `@cursor/sdk` 跑通 Agent（需 Cursor 账号与本地 bridge）。`permissions.json` 结构与 [官方 changelog 6/4](https://cursor.com/changelog) 一致 ✅。

### 问题与解决方案

1. **自定义工具不可见**：确认 `customTools` 在 `Agent.create` 传入；子 Agent 自动继承。  
2. **autoReview 仍全自动删文件**：加强 `block_instructions` 自然语言描述。  
3. **TS2305 类型错误**：升级 SDK；changelog 称已修复 workspace 类型引用。

### 官方 vs 社区

- 官方：https://cursor.com/changelog（Jun 4 SDK 条目）  
- InfoQ Harness 讨论：https://www.infoq.cn/article/vblM3MlOEs86dmVdH8d1 — SDK autoReview 印证「薄 harness + 权限门」路线

---

## 特性五：JSONL / 自定义 LocalAgentStore（2026-06-04）

### 是什么

Agent 元数据默认 SQLite 持久化；现可选 **JSONL 追加日志**（`JsonlLocalAgentStore`），或实现 `LocalAgentStore` 接 Postgres 等。便于 CI 产物归档与 `git diff` 审计。

### 步骤

1. `import { JsonlLocalAgentStore } from "@cursor/sdk"`
2. `Agent.create({ local: { store: new JsonlLocalAgentStore("./agent-runs.jsonl") } })`
3. 进程重启后 `Agent.resume` 从 JSONL 恢复

### 示例

```typescript
import { Agent, JsonlLocalAgentStore } from "@cursor/sdk";

const store = new JsonlLocalAgentStore("/tmp/cursor-agent.jsonl");
const agent = await Agent.create({ local: { store } });
```

### 问题与解决方案

1. **resume 找不到 agent**：检查 `cwd` 与 `list_runs({ cwd })`（Python 0.1.6 修复）。  
2. **JSONL 过大**：定期 rotate；长任务用子 Agent 分段。

---

## 特性六：SDK 嵌套子 Agent 任意深度（2026-06-04）

### 是什么

与 Claude Code 2.1.172 类似，SDK 子 Agent 可再派子 Agent，**无需额外开关**；每层独立 prompt/model。

### 步骤

1. 定义 subagent 配置
2. 父 Agent `Task` 调用子 Agent
3. 子 Agent 内继续 `Task`

### 注意

Google DeepMind 论文（36氪转述）提示多 Agent 在部分任务上效率暴跌——嵌套深度应匹配任务结构，非越深越好。

---

## 特性七：Design Mode 与 Canvas（2026-06-04 / 06-05）

### 是什么

**Design Mode** 可在 Canvas 与内置浏览器中**点击、框选、语音**描述 UI 修改；支持多选元素、上下文用量报告 Canvas。

### Settings 路径

```text
Cursor → 打开 Canvas → 右上角 Design Mode 开关
Cursor → Settings → Features → Canvas → Design Mode
```

### 步骤

1. Agent 生成 Canvas artifact  
2. 进入 Design Mode，点选 DOM 元素  
3. 语音或文字描述修改  
4. Agent 迭代布局

### 本地测试

⚠️ 需 3.7 桌面 + 浏览器面板；服务器环境未测。

---

## 升级与对照表

| 日期 | 主题 | 行动 |
|------|------|------|
| 6/10 | Bugbot + `/review` | 升级 3.7，push 前习惯 `/review` |
| 6/4 | SDK customTools / JSONL | `npm i @cursor/sdk`，提交 permissions.json |
| 6/5 | Design Mode 语音/多选 | 前端团队试用 Canvas 迭代 UI |

---

## 参考

- https://cursor.com/changelog/bugbot-updates-june-2026  
- https://cursor.com/changelog  
- https://releasebot.io/updates/cursor  
- https://www.infoq.cn/article/vblM3MlOEs86dmVdH8d1  
