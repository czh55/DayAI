# Cursor 每日深度 — 2026-06-02

- **参考版本**：Cursor **3.6**（2026-05-29 Auto-review）、**3.5**（2026-05-20 Automations/Canvas/`/loop`）、**Composer 2.5**（2026-05-18）
- **本地环境**：Cloud Agent Linux VM，**未安装 Cursor 桌面客户端**；桌面功能标注未实测 + 官方 SOP
- **交叉验证**：[官方 Changelog](https://cursor.com/changelog)、[permissions.json](https://cursor.com/docs/reference/permissions)、社区 [Forum Auto-review](https://forum.cursor.com/t/auto-review-run-mode/161922)

---

## 推荐 `.cursor/permissions.json`（完整示例）

将下列文件保存为仓库根目录 **`.cursor/permissions.json`**（JSONC 注释可选）。与官方参考一致，并针对 DayAI 类 monorepo 加强块规则。

**Settings 路径（Auto-review）**：`Settings` → `Cursor Settings` → `Agents` → `Run Mode` → 选择 **Auto-review**

```jsonc
{
  "mcpAllowlist": [
    "github:*",
    "linear:list_issues",
    "linear:get_issue"
  ],
  "terminalAllowlist": [
    "git",
    "git status",
    "git diff",
    "git log",
    "npm",
    "npm test",
    "npm run lint",
    "pnpm",
    "pnpm test",
    "cargo build",
    "cargo test"
  ],
  "autoRun": {
    "allow_instructions": [
      "Allow read-only shell commands that inspect files, directories, git state, logs, process status, or command output without modifying files or external state.",
      "Allow read-only MCP, WebFetch, and WebSearch calls that retrieve or inspect data without creating, updating, deleting, posting, triggering, or deploying anything.",
      "Allow running unit tests and linters inside the repository workspace only.",
      "Allow package manager read-only commands: npm ls, npm outdated, pnpm list, cargo metadata."
    ],
    "block_instructions": [
      "Block all npx commands, regardless of arguments or apparent intent.",
      "Block commands that create, edit, move, delete, chmod, chown, format, install, generate, or otherwise modify files outside the current project directory.",
      "Block any git push, git reset --hard, git clean -fd, git rebase, or branch deletion.",
      "Block any shell command that writes to .env, .env.local, secrets/, or credential files.",
      "Block any MCP call that mutates production data, billing, payments, or customer records.",
      "Block any Fetch to hosts not in the project's documented dependency or documentation allowlist.",
      "Block global installs: npm install -g, pip install --user, brew install."
    ]
  }
}
```

**说明**：当文件中定义了 `mcpAllowlist` / `terminalAllowlist` 时，会 **完全覆盖** IDE 内对应白名单编辑器（只读）。`~/.cursor/permissions.json` 与项目文件 **数组合并**。

---

## 特性 1：Auto-review Run Mode（3.6）

### 是什么（机制说明）

Auto-review 是新的 **Agent 运行模式**：仅针对 **Shell、MCP、Fetch** 三类工具调用。处理顺序为：（1）命中终端/MCP **白名单** → 立即执行；（2）可沙箱化 → 在 **沙箱** 内执行（macOS/Linux/WSL2）；（3）其余交给 **分类子代理（classifier）**，输出 allow / 换方案 / 弹出人工审批。分类器可使用 `permissions.json` 的 `autoRun.allow_instructions` 与 `block_instructions` 作为自然语言策略，**非确定性、非安全边界**（官方与论坛均强调）。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 长时 Agent：大量读文件、跑测试、拉文档 | 必须逐条人工批准的高危生产运维 |
| 已写好清晰 allow/block 策略的仓库 | 不愿维护 `permissions.json` 的个人实验项目 |

### 前置条件

- Cursor **3.6+**，套餐 **Pro / Teams / Enterprise**
- `Settings > Cursor Settings > Agents > Run Mode` = **Auto-review**
- 团队管理员未在 Dashboard 锁定 Run Mode

### 详细使用步骤

1. 打开 Cursor，进入 **Settings**（`Ctrl+,` / `Cmd+,`）
2. 导航：**Cursor Settings** → **Agents** → **Run Mode**
3. 选择 **Auto-review**（勿与旧称 Yolo 混淆）
4. 在仓库根创建 `.cursor/permissions.json`（见上文完整示例）
5. 新开 Agent 会话，执行只读命令（如 `git status`）观察是否免审批
6. 故意触发高危命令（如 `git push`），确认分类器或 block 规则要求审批
7. （可选）在 Run Mode 旁填写 **classifier 自定义说明** 补充项目策略

### 命令与配置示例

无 CLI 专用命令；配置即 IDE + 文件。验证文件被加载：修改 `permissions.json` 后重启 Cursor，Settings 中应显示 allowlist 来自文件且为只读。

### 本地测试结果

| 项 | 结果 |
|----|------|
| 桌面 Auto-review 切换 | ❌ 未实测 — VM 无 Cursor GUI |
| `permissions.json` 语法 | ✅ 与 [官方 reference](https://cursor.com/docs/reference/permissions) 字段一致 |

### 问题与解决方案

| 错误现象 | 排查 | 解决 |
|----------|------|------|
| 仍每条都问 | Run Mode 是否为 Auto-review | 重新选择并重启 Agent |
| allowlist 不生效 | 文件路径是否为 `<repo>/.cursor/permissions.json` | 修正路径；JSON 合法 |
| 分类器误放行 | 查看 Agent 日志中 classifier 决策 | 加强 `block_instructions`；敏感库改 Allowlist 模式 |
| 团队无法改模式 | 管理员 Dashboard 锁 Run Mode | 联系 admin 或改用团队策略 |

### 官方 vs 社区交叉验证

- 官方 3.6 changelog：三层逻辑 — ✅  
- [Vibe Coder Blog](https://blog.vibecoder.me/cursor-auto-review-agentic-run-mode)：分类器不消耗主模型 token — 社区说法，**官方 changelog 未写 token**，采纳时标为社区观点  
- Forum：可用 `permissions.json` — **与官方 docs 一致** ✅

### 利弊 + 建议

- **利**：减少「审批疲劳」，长任务更连贯  
- **弊**：LLM 分类可能双向失误  
- **个人**：中小项目用 Auto-review + 严格 `block_instructions`  
- **团队 Lead**：把 `permissions.json` 纳入 PR 模板  
- **安全**：生产相关仓库继续 **Allowlist** 或人工批准，不用 Auto-review 代替 SOC2 控制

### 示例 2（进阶）：仅放开测试与 lint

在 `autoRun.allow_instructions` 追加：

```jsonc
"Allow npm test, npm run lint, pnpm test, vitest, jest, and playwright test only when cwd is the workspace root."
```

---

## 特性 2：Shared Canvases（3.5）

### 是什么

**Canvas** 是 Agent 生成的交互式制品（报告、仪表盘、轻量 UI）。**Shared Canvases** 允许生成 **可分享的浏览器链接**（实时快照），无需分享完整聊天线程。团队在 **Cursor Dashboard** 只读查看已分享 canvas。适用于 Pro / Teams / Enterprise。

### 适用场景

适合：评审文档、指标看板、设计稿协作。不适合：含密钥的调试输出（分享前需脱敏）。

### 前置条件

- Cursor 3.5+，符合套餐  
- 已生成含 Canvas 的 Agent 输出

### 详细使用步骤

1. 在 Agent 中完成会产出 Canvas 的任务（如「生成本周发布指标仪表盘」）  
2. 在 Canvas 视图选择 **Share**（具体按钮以 IDE 为准，见 [官方 docs](https://cursor.com/changelog)）  
3. 复制链接发给队友  
4. 管理员在 **cursor.com** Dashboard → 团队 Shared Canvases 审计  
5. 不再需要时撤销分享（IDE 或 Dashboard）

### 本地测试结果

❌ 未实测 — 无桌面客户端。官方 changelog 5/20 描述与 [Releasebot](https://releasebot.io/updates/cursor) **一致** ✅

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 队友打不开链接 | 确认同 workspace/套餐；Enterprise 策略 |
| 泄露敏感数据 | 分享前让 Agent  redact；勿 canvas 含 .env |

### 建议

PM/数据分析用 Canvas 做 **周报入口**；工程师仍用 PR 作权威源码变更记录。

---

## 特性 3：`/loop` 技能（3.5）

### 是什么

`/loop` 让 Cursor 在 **本地** 按 schedule **重复执行** 同一 prompt，直到满足条件或手动停止。未指定固定间隔时，由 Agent **自行决定** 唤醒时机（事件驱动语义）。

### 适用场景

适合：「每 5 分钟检查 deploy」「直到测试全绿」。不适合：应用生产 cron 应用 **专用调度器**（应用 K8s CronJob 更可靠）。

### 前置条件

- Cursor 3.5+  
- 本机 Agent 可长期运行（笔记本需防睡眠）

### 详细使用步骤

1. 打开 Agent 输入框  
2. 输入 `/loop` 并选择技能  
3. 写清目标，例如：`/loop 每 5 分钟运行 npm test，直到全部通过或我停止`  
4. 观察循环日志；完成后在 UI 停止 loop  
5. 与 **Cloud Automations** 区分：loop 是 **本地** 长运行

### 命令示例

```text
/loop 检查 https://staging.example.com/health 每 3 分钟，连续 3 次 200 后停止并总结
```

### 本地测试结果

❌ 未实测 GUI

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 机器休眠中断 | 插电/防睡眠；或改 Cloud Automation |
| token 耗尽 | 缩小检查频率；加退出条件 |

### 官方 vs 社区

Changelog 与 Releasebot 均描述 loop — ✅

### 建议

个人开发调试 staging；团队级监控用 **Automations + webhook**。

---

## 特性 4：Automations 进 Agents Window + 多仓库 / 无仓库（3.5）

### 是什么

**Cursor Automations** 从仅 `cursor.com/automations` 扩展到 **Agents Window** 内创建与管理。支持：**多 repo** 附加（跨库推理与改代码）、**无 repo**（监控 Slack/Stripe 等信号）。Marketplace 提供 5 个无仓库模板（Slack digest、产品分析、FAQ、财务、客户健康等）。新 Automation **7 天内 agent 运行 50% off**（changelog 原文）。

### 适用场景

适合：每日站会 digest、跨前后端仓库的功能、非代码运维自动化。不适合：需要严格本地 air-gap 的环境（云 Automation 需评估数据出境）。

### 前置条件

- Cursor 账号与 Automations 权限  
- 云 Agent / 仓库访问 token 已配置

### 详细使用步骤

1. 打开 **Agents Window**（Cursor 3 UI）  
2. 选择 **Automations** → **Create**  
3. **多仓库**：Attach repositories → 选 repo A + B  
4. **无仓库**：选择 No repository → 从 Marketplace 选模板或自定义 prompt  
5. 配置 trigger：cron / GitHub PR / Slack 等（以 UI 为准）  
6. 保存并在 Dashboard 查看运行历史  
7. 本自动化任务由 Cloud Agent 执行时，阅读 [cloud_task_instructions] 类 git 分支要求

### 配置示例（概念性 cron）

```yaml
# 逻辑示例 — 实际以 cursor.com/automations UI 为准
name: nightly-test-guard
schedule: "0 6 * * *"
repos:
  - org/frontend
  - org/api
prompt: |
  在两个仓库分别运行测试；若任一失败，在 Slack 发摘要并附日志链接。
```

### 本地测试结果

本仓库为 **Cloud Agent cron 触发** 的实例 ✅（meta：`triggerType: cron`）。桌面 Agents Window UI ❌ 未实测。

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 无法访问私有 repo | 安装 GitHub App / 配置 deploy key |
| 多 repo 上下文过大 | 缩小 attach 范围；分 Automation |

### 官方 vs 社区

[Changelog 5/20](https://cursor.com/changelog) 与 Releasebot — ✅

### 建议

**平台组**用多 repo Automation 做跨服务发布；**运营**用无 repo 模板。

---

## 特性 5：Composer 2.5 模型

### 是什么

2026-05-18 起 **Composer 2.5** 成为 Cursor 内置编程模型，强调长任务耐力、复杂指令遵循与协作体验。定价（changelog）：Standard **$0.50/M input, $2.50/M output**；Fast（默认）**$3.00/M input, $15.00/M output**。首周 **双倍用量额度**（促销，以官方为准）。

### 适用场景

适合：大型重构、多文件特性。不适合：极简单补全（可用更小模型降本）。

### 前置条件

- Cursor 更新至含 Composer 2.5 的版本  
- 模型选择器可见 Composer 2.5

### 详细使用步骤

1. Agent 或 Chat 打开模型下拉  
2. 选 **Composer 2.5**（Fast 或 Standard）  
3. 对长任务写清验收标准与测试命令  
4. 在 Dashboard **Usage** 观察 Composer 池消耗（Teams 新定价见特性 7）

### 本地测试结果

❌ 未实测推理质量。定价来自官方 changelog ✅

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 账单高 | 非关键任务改 Standard；避免不必要的 Fast |
| 指令漂移 | 拆分子任务；用 Plan 模式再 Build |

### 建议

**重度 Agent 用户** 选 Teams **Premium seat**（见下）。

---

## 特性 6：Cursor in Jira（2026-05-19）

### 是什么

Jira 集成：将 work item **指派给 Cursor** 或在评论 **@Cursor** 启动 **Cloud Agent**。Agent 使用 ticket 标题、描述、评论与团队仓库设置建上下文；完成后 Jira 显示状态与 **PR 链接**。

### 前置条件

- Cursor **admin** 安装 [Integrations](https://cursor.com) 中 Jira  
- Jira **Commercial Cloud** + **Rovo enabled**

### 详细使用步骤

1. Admin：Cursor Dashboard → Integrations → Jira → 安装并授权  
2. 项目管理员：配置默认仓库与分支策略  
3. 开发：在 Jira issue 指派 Cursor 或评论 `@Cursor 修复描述中的空指针并补测试`  
4. 等待 Cloud Agent 完成，在 Jira 点击 PR 链接 review  
5. 合并后关闭 ticket

### 本地测试结果

❌ 未实测（无 Jira 租户）

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| Agent 未启动 | Rovo 是否开启；仓库映射 |
| PR 错仓库 | 修正团队 repository settings |

### 建议

**Scrum Master** 定义哪些 issue 类型可指派 Cursor（如 bug、测试更新）。

---

## 特性 7：Teams 定价与 Premium Seat（2026-06 前后）

### 是什么

Cursor 调整 Teams：**Composer 专用用量池**、Standard seat 额度提升、新增 **Premium seat**（约为 Standard **5× 包含用量、3× 价格**），并加强 Dashboard **实时用量**与智能告警。旨在让 99% 重度用户一个月 Composer 池够用（官方表述）。

### 适用场景

适合：团队多人高强度 Agent。不适合：个人 Pro 用户（规则不同，以账单页为准）。

### 详细使用步骤

1. Admin 登录 Cursor Dashboard → Billing / Teams  
2. 识别高用量成员（Usage 页）  
3. 为重度用户分配 **Premium seat**  
4. 配置 spend limit 与告警邮箱  
5. 每月回顾 Composer vs 第三方 API 模型占比

### 本地测试结果

❌ 未实测账单 UI。信息来自 [Releasebot 6/2026](https://releasebot.io/updates/cursor) 与 changelog 汇总 — 与官方公告方向 **一致**（具体数字以账单为准）

### 建议

**Engineering Manager** 先迁 1–2 名最强用户到 Premium 试点一个月。

---

## Cursor CLI 相关（3.x 其他）

changelog 还提到 **CLI Debug Mode**、**`/btw`** 等；本日重点为 3.6 Auto-review。CLI 权限与桌面 **分离**（官方 permissions 文档末尾指向 CLI Permissions）。

---

## 参考链接

- https://cursor.com/changelog  
- https://cursor.com/docs/reference/permissions  
- https://forum.cursor.com/t/auto-review-run-mode/161922  
- https://cursor.com/changelog/05-07-26（3.3 PR Review / Build in Parallel）  
