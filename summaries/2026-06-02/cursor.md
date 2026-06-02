# Cursor — 2026-06-02 特性与本地测试

## 版本与能力概览

Cursor 桌面版最新公开 changelog 为 **3.6（2026-05-29）**。本次测试在 **Cursor Cloud Agent** 环境进行——即 Cursor Automations 触发的云端 Agent 运行时。

| 版本/能力 | 发布日期 | 核心变化 |
|-----------|----------|----------|
| **3.6** | 2026-05-29 | Auto-review 运行模式 |
| **3.5** | 2026-05-20 | Shared Canvases、/loop skill、Automations 重构 |
| **Composer 2.5** | 2026-05-18 | 长任务与复杂指令能力提升 |
| **Jira 集成** | 2026-05-19 | 工单 @Cursor 触发 Cloud Agent |

---

## 重点新特性详解

### 1. Auto-review 运行模式（3.6）

**配置路径**：Settings → Cursor Settings → Agents → Run Mode

三级信任体系（仅 Shell、MCP、Fetch）：

1. **Allowlisted** — 预批准命令，立即执行
2. **Sandboxed** — 云端沙箱执行（macOS / Linux / WSL2）
3. **Classifier** — 子 Agent 决定：允许 / 换方案 / 人工批准

**项目级策略**：仓库根目录 `.cursor/permissions.json`：

```json
{
  "autoRun": {
    "allow_instructions": [
      "Allow read-only shell commands that inspect files, git state, or logs."
    ],
    "block_instructions": [
      "Block all npx commands.",
      "Block commands that modify files outside the project directory."
    ]
  }
}
```

**利弊**：

| 利 | 弊 |
|----|-----|
| 长任务中断大幅减少 | Classifier 非确定性，非安全边界 |
| 无额外费用（官方说明） | 空 allowlist 初期仍会频繁询问 |
| 可自然语言定制策略 | 误判可能放行危险命令 |

**社区交叉验证**：[Cursor Forum #161922](https://forum.cursor.com/t/auto-review-run-mode/161922) 确认 Classifier 基于 LLM，建议敏感项目仍用严格 Allowlist。

**建议**：从 Auto-review 起步，逐步把 `git status`、`npm test` 等加入 allowlist；绝密仓库继续手动批准。

---

### 2. Automations（本次测试核心）

**触发类型**：Cron、GitHub PR、Slack、Webhook 等

**3.5 增强**：
- Agents Window 内管理
- **Multi-repo**：跨仓库推理与修改
- **No-repo**：无代码仓库的监控类任务（Slack 摘要、Stripe 报表等 Marketplace 模板）

**本次运行上下文**：

```json
{
  "automationId": "61ca50c1-f6ab-461f-b46a-1101418993d0",
  "triggerType": "cron",
  "schedule": "0 22 * * *"
}
```

---

### 3. Composer 2.5

- 长任务持续工作与复杂指令遵循改进
- 定价：Standard $0.50/M in · $2.50/M out；Fast $3.00/M in · $15.00/M out（默认 Fast）

---

### 4. 其他近期功能

| 功能 | 说明 |
|------|------|
| Shared Canvases | Agent 生成的交互报告可分享只读链接 |
| `/loop` skill | 按 schedule 或条件重复执行 prompt |
| **Await** | 等待后台 shell 或 regex 匹配输出 |
| **Task 子 Agent** | explore / debug / computerUse / best-of-n-runner 等 |
| **tmux 会话** | 长驻 shell、dev server 必须用 tmux（Cloud Agent 规则） |
| **AutomationMemory** | 跨 Automation 运行的持久记忆 |

---

## 本地测试过程

### 测试 1：Cron Automation 触发

当前会话由 Automation 在 23:37 UTC 自动触发，任务为「每日 AI 总结」。

**结果**：✅ 收到完整 `automation_trigger_info` 与 `cloud_task_instructions`（含分支 `cursor/ai-0f8b`）

---

### 测试 2：AutomationMemory

```
操作：list → 发现 MEMORIES.md、testing-notes.md
结果：✅ 持久记忆目录可用
```

**感受**：适合记录「本机 CLI 版本」「已知 PATH 问题」等，避免每次 Automation 重复探测。

---

### 测试 3：tmux 持久 Shell

```bash
SESSION_NAME="codex-test"
tmux -f /exec-daemon/tmux.portal.conf new-session -d -s "$SESSION_NAME" ...
tmux send-keys -t "$SESSION_NAME:0.0" 'codex exec --help' C-m
tmux capture-pane -p  # 成功捕获输出
```

**结果**：✅ tmux 会话创建、发命令、抓输出正常

**注意**：必须使用 `/exec-daemon/tmux.portal.conf`，与普通 tmux 配置不同。

---

### 测试 4：Shell / Git / 文件写入

- 创建 `summaries/2026-06-02/` 目录与多文件 ✅
- `git status` 显示新文件 ✅
- 无人工批准中断（Cloud Agent 默认高权限）✅

---

### 测试 5：Task 子 Agent（间接）

系统提供 `explore`、`debug`、`computerUse` 等子 Agent；本次任务以直接工具调用为主，未启动子 Agent。

**建议**：大范围代码探索用 `Task(subagent_type=explore)` 比手动 grep 更高效。

---

## 问题与解决方案

| 问题 | 解决方案 |
|------|----------|
| Auto-review 仍频繁弹窗 | 配置 `.cursor/permissions.json` 并积累 allowlist |
| Cloud Agent 无法测桌面 UI | 用 `computerUse` 子 Agent 或本地 IDE |
| 长命令被 kill | 用 tmux + `Await` 轮询，勿 `block_until_ms=0` 裸跑 |
| Composer Fast 成本高 | 简单任务切 Standard 或更小模型 |

---

## 实际使用建议

| 场景 | 推荐配置 |
|------|----------|
| 每日 cron 任务 | No-repo 或单 repo Automation + AutomationMemory |
| 跨 repo 重构 | Multi-repo Automation |
| 本地长开发会话 | Auto-review + Composer 2.5 Fast |
| PR 审查 | Agents Window PR 标签页（3.3+） |
| 探索陌生代码库 | Task explore 子 Agent |
