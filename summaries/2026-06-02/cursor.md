# Cursor — 2026-06-02 特性与本地测试

## 版本与能力概览

Cursor 桌面版最新公开 changelog 为 **3.6（2026-05-29）**。本次测试在 **Cursor Cloud Agent** 环境进行——即 Cursor Automations 触发的云端 Agent 运行时，可直接验证多项 Agent 能力。

| 版本/能力 | 发布日期 | 核心变化 |
|-----------|----------|----------|
| **3.6** | 2026-05-29 | Auto-review 运行模式、Teams 集成 |
| **3.5** | 2026-05-20 | Shared Canvases、/loop skill、Automations 重构 |
| **Composer 2.5** | 2026-05-18 | 更强长任务能力，Standard/Fast 双档定价 |
| **Jira 集成** | 2026-05-19 | 工单指派 @Cursor 触发 Cloud Agent |

---

## 重点新特性详解

### 1. Auto-review 运行模式（3.6）

**位置**：Settings → Cursor Settings → Agents → Run Mode

三级信任体系：
1. **Allowlisted** — 预批准命令，立即执行
2. **Sandboxed** — 在云端沙箱中执行，不影响宿主机
3. **Classifier 评估** — 分类子 Agent 决定：允许 / 换方案 / 请求人工批准

**价值**：在「每个命令都确认」和「完全 YOLO」之间取得平衡，适合长时间 Agent 任务。

### 2. Automations（本次测试即为此功能）

**触发方式**：Cron（`0 22 * * *`）、GitHub PR、Slack 等

**3.5 新增**：
- Agents Window 内直接管理 Automation
- **Multi-repo**：一个 Automation 绑定多个仓库
- **No-repo**：无代码仓库的监控类 Automation（Slack 摘要、Stripe 财务等模板）

**本次运行上下文**：
```json
{
  "automationId": "61ca50c1-f6ab-461f-b46a-1101418993d0",
  "triggerType": "cron",
  "schedule": "0 22 * * *"
}
```

### 3. Composer 2.5

- 长任务持续工作能力显著提升
- 复杂指令遵循更可靠
- 定价：Standard $0.50/M in · $2.50/M out；Fast（默认）$3.00/M in · $15.00/M out

### 4. 其他近期功能

- **Shared Canvases**：Agent 生成的交互式报告/仪表盘可分享链接
- **/loop skill**：按 schedule 或条件重复执行 prompt
- **Await 工具（3.0+）**：Agent 可等待后台 shell 或特定输出
- **Task 子 Agent**：explore / debug / computerUse 等专用子 Agent

---

## 本地测试过程

### 测试 1：Cron Automation 触发（自身即测试）

当前会话由 Automation cron 在 22:02 UTC 自动触发，执行「每日 AI 总结」任务。

**结果**：✅ Automation 链路正常，Agent 收到完整 trigger context

### 测试 2：AutomationMemory 持久记忆

```
操作：写入 testing-notes.md，记录 CLI 版本与已知问题
结果：✅ 写入成功，version 冲突检测机制正常
```

**感受**：跨 Automation 运行的记忆积累很实用，避免每次重复探测环境。

### 测试 3：tmux 持久 Shell

```bash
SESSION_NAME="cursor-test-shell"
tmux -f /exec-daemon/tmux.portal.conf new-session -d -s "$SESSION_NAME" ...
tmux send-keys -t "$SESSION_NAME:0.0" 'echo "Cursor tmux shell test OK" && date' C-m
# 输出：Cursor tmux shell test OK / Tue Jun 2 10:23:44 PM UTC 2026
```

**结果**：✅ tmux 会话创建、命令发送、输出捕获均正常

**问题**：首次 capture-pane 为空，需等待命令执行后再 capture。

**解决方案**：send-keys 后 `sleep 1` 再 capture。

### 测试 4：Await 工具等待后台命令

```bash
# 启动后台 shell：sleep 3 && echo Ready
# Await pattern="Ready" block_until_ms=10000
# 结果：3068ms 后匹配成功，exit code 0
```

**结果**：✅ Await 精准等待特定输出，适合「等 dev server 启动」类场景

**踩坑**：误传 subagent id 给 Await 会报错——Await 只接受 Shell 工具的 numeric shell_id。

### 测试 5：Task 子 Agent（explore 类型）

```
任务：读取 /workspace/README.md 并一句话总结
结果：成功返回「DayAI 仓库，README 仅含项目名」
耗时：约数秒，只读探索效率高
```

**结果**：✅ 子 Agent 并行/委派机制正常

### 测试 6：Auto-review 模式

**限制**：Cloud Agent 环境无法访问 Cursor 桌面 Settings UI，未能切换 Run Mode 做 A/B 对比。

**间接验证**：本次会话中 Shell/Grep/Write 等工具多数直接执行，符合 Cloud Agent 预配置的高信任策略。

---

## 问题汇总

| 问题 | 严重度 | 解决方案 |
|------|--------|----------|
| Cloud Agent 无法测试桌面 UI 功能（Auto-review 设置、Canvases 分享） | 中（环境限制） | 在 Cursor 桌面客户端手动验证 |
| Await 参数类型易混淆 | 低 | 仅传 Shell 返回的 numeric shell_id |
| tmux capture 时序 | 低 | send-keys 后短暂 sleep |

---

## 使用感受

**优点**：
- Cloud Agent + Cron Automation 组合非常适合「每日总结」「CI 巡检」等定时任务——完全无人值守
- Await + tmux 让 Agent 能可靠等待长时间命令，不再 blind sleep
- Task 子 Agent 适合把探索性工作委派出去，主 Agent 保持聚焦
- AutomationMemory 让自动化任务有「经验积累」

**待体验（需桌面客户端）**：
- Auto-review 在实际开发中的打断频率 vs 安全性的平衡点
- Shared Canvases 团队协作流程
- /loop skill 做「直到测试通过」类长循环

**与竞品对比（今日视角）**：
- Cursor 3.6 Auto-review ≈ Claude Code Auto mode 分类器（v2.1.160 也在优化 classifier 延迟）
- Cursor Automations ≈ Claude Code Dynamic Workflows（ultracode）
- 两者都在解决「Agent 越来越自主，如何减少 babysitting」这一核心问题
