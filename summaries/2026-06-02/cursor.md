# 2026-06-02 · Cursor

## 官方近期版本要点

### Cursor 3.6（2026-05-29）— Auto-review

- **作用**：减少反复点「批准」，同时提高执行安全性
- **机制**：
  - 白名单内的 Shell/MCP/Fetch → 立即执行
  - 可沙箱化的 → 进沙箱
  - 其余 → **分类子代理（classifier）** 决定：放行 / 换方案 / 询问用户
- **配置**：Settings → Cursor Settings → Agents → **Run Mode**
- 可为 classifier 编写自定义指令

### Cursor 3.5（2026-05-20）

- **Shared canvases**：分享 Agent 生成的画布快照（报告、仪表盘等），Dashboard 只读查看
- **`/loop` skill**：按本地计划重复执行 prompt，直到达成目标或手动停止
- **Automations 进 Agents Window**：支持 **多仓库**、**无仓库** 自动化；新自动化前 7 天 agent runs **50% off**（官方促销）

### Composer 2.5（2026-05-18）

- 相对 Composer 2：长任务持续性、复杂指令遵循、协作体验提升
- 定价（官方 changelog）：Standard $0.50/M in、$2.50/M out；Fast（默认）$3.00/M in、$15.00/M out
- 首周双倍用量促销（以官方为准）

### 其他（5 月）

- **Jira 集成**：`@Cursor` 或分配工单触发 Cloud Agent
- **Cloud Agent 开发环境**：多仓库、Dockerfile、构建密钥、审计日志等（3.4 前后文档）

---

## 本地测试记录（Cloud Agent 环境）

> 说明：当前会话即 **Cursor Automation（cron）** 触发的 Cloud Agent，无法操作桌面 Cursor 客户端 UI，以下为用户态可验证部分。

### 测试 1：运行环境识别

```bash
env | grep CURSOR
```

**观测**：

- `CURSOR_AGENT=1`
- `CURSOR_CONVERSATION_ID=...`
- `AGENT_TRANSCRIPTS=...`

**结论**：确认处于 Agent 模式，与官方 Cloud Agent / Automations 产品线一致。

### 测试 2：本任务即 Automation 能力验证

| 能力 | 本次是否用到 | 结果 |
|------|-------------|------|
| 定时触发（cron `0 22 * * *`） | 是 | 成功触发 |
| Shell 无交互执行 | 是 | 可装 npm 包、写文件、git 操作 |
| 网络检索 + 文档抓取 | 是 | WebSearch / WebFetch 正常 |
| 多工具编排（grep、read、write） | 是 | 正常 |
| Auto-review Run Mode UI | 否 | 需在桌面客户端切换，云 Agent 侧不可见 |
| `/loop`、Shared canvas | 否 | 属 IDE 本地/团队功能 |

### 测试 3：Composer 模型

- 系统配置中可见子代理类型含 **composer-2.5-fast** 等 slug
- 本次对话实际由 Cloud Agent 调度，**无法**在本地切换 Run Mode 做 A/B

### 遇到的问题

1. **桌面特性无法在 VM 复现**：Auto-review、canvas 分享、Jira 插件需用户本机或团队租户  
2. **与 Claude/Codex CLI 不同**：Cursor 云侧不暴露 `cursor --version` 类 CLI（本环境 `which cursor` 为空）

### 解决方案 /  workaround

- 日报类任务：用 **Automations + 多仓库/无仓库** 在云端完成（如此次总结写入 git）  
- 要测 Auto-review：在 Cursor 桌面 → Agents → Run Mode → Auto-review，对「频繁 git push / curl」类任务观察审批次数  

---

## 使用感受

| 维度 | 评价 |
|------|------|
| 自动化 | Cron + 仓库写回非常适合「每日 AI 简报」；与 `/loop` 本地定时形成互补 |
| 安全 | Auto-review 理念正确（分类器优于「全开」或「全问」）；实际体验取决于团队白名单配置 |
| 模型 | Composer 2.5 定位为「长程编码」；与 Claude Opus 4.8、Codex gpt-5.5 形成三足鼎立 |
| 协作 | Shared canvas 降低「分享整段 chat」的噪音；适合 PM/设计看 Agent 产出 |
| 局限 | 云 Agent 不能替代桌面 IDE 的全部新特性验证 |

## 建议在桌面客户端验证的检查清单

- [ ] Settings → Agents → Run Mode → **Auto-review**，跑一个需 20+ 次 shell 的重构任务，统计审批次数  
- [ ] 创建一个 **无仓库 Automation**（如 Slack digest 模板）  
- [ ] 选用 **Composer 2.5 Fast**，对比同一 prompt 与 Composer 2 的步数与 diff 质量  
