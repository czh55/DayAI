# Claude Code 每日技术文档 — 2026-07-08

> 本地实测版本：**2.1.205**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Fable 5 extension](https://www.androidauthority.com/claude-fable-5-free-extension-3685103/)、[Anthropic News](https://www.anthropic.com/news)

## 今日综述

2026 年 7 月 8 日 npm `@anthropic-ai/claude-code@latest` 实测为 **2.1.205**，当日连发 **2.1.204**（hook 流式修复）与 **2.1.205**（`/doctor` 全量体检、auto mode 增强、agent view 改进）。**Fable 5 周额度原定于今日截止**，因社区反弹 Anthropic 延期至 **7/12 23:59 PT**。工信部 NVDB 同日定调 Claude Code 2.1.91–2.1.196 存在后门隐患。

---

## 特性一：Fable 5 周额度延期至 7/12（社区反弹后）

### 是什么（机制说明）

Anthropic 原计划在 **7/8 00:00 PT** 结束 Pro/Max/Team 用户对 Fable 5 的订阅内周额度。社区强烈反弹后，官方确认延期至 **2026-07-12 23:59:59 PT**。延期期间规则不变：付费用户可将周用量 **50%** 用于 Fable 5 且不额外计费；超额后须购买 usage credits（$10/input Mtok、$50/output Mtok）或切换其他模型。

### 适用场景

- **适合**：7/8–7/12 窗口内用尽剩余周额度跑高难 SWE、长程迁移
- **不适合**：未评估 7/12 后 credits 成本就长期默认 Fable 5

### 前置条件

- Claude Code ≥ 2.1.170；Pro/Max/Team 席位
- 7/12 后：Settings → Usage 启用 usage credits

### 详细使用步骤（业务用户）

1. Claude.ai → Settings → Usage：查看本周 Fable 5 消耗百分比
2. 7/8–7/12：`/model` 选 Fable 5 跑高价值任务
3. 7/11 前：启用 usage credits 并设月度上限
4. 7/12 后日常 Sonnet 5；关键节点 Fable 5 + `/effort`

### 命令与配置示例

```bash
# 选择 Fable 5 模型
/model   # 交互选择 claude-fable-5

# 非交互高难任务
claude --model claude-fable-5 -p "Refactor auth module with full test coverage"
```

```json
// ~/.claude/settings.json 片段
{
  "defaultModel": "claude-sonnet-5",
  "fallbackModel": "claude-opus-4-8"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `2.1.205 (Claude Code)` |
| `/model` Fable 5 | ⚠️ 未实测（无 API Key） |
| 周额度 / credits | ⚠️ 以控制台为准 |

### 问题与解决方案

**7/12 后无法选 Fable 5**：Settings → Usage 启用 credits 并充值。**账单超预期**：配合 `/effort medium` 与 prompt caching。**频繁降级 Opus 4.8**：换 Sonnet 5 或简化 prompt。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Android Authority 延期至 7/12 | ✅ |
| ABP Live 50% 周额度规则 | ✅ |
| TechTimes 原 7/8 截止计划 | ✅（已被延期覆盖） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Fable 重度用户 | 7/8–7/12 用尽额度；7/11 前配 credits |
| 成本敏感者 | 7/12 后默认 Sonnet 5 |
| 企业管理员 | 下发 credits 预算与模型白名单 |

---

## 特性二：2.1.205 `/doctor` 升级为全量体检

### 是什么（机制说明）

[Changelog 2.1.205](https://code.claude.com/docs/en/changelog.md)：`/doctor` 从简单诊断升级为**全量 setup checkup**，可诊断并修复问题；`/checkup` 为其别名。原 startup 警告（如 claude command missing）移至 `/doctor` 和 `/status` 显示，减少启动干扰。

### 适用场景

- **适合**：新环境部署、升级后排查、CI 环境验证
- **不适合**：已知配置正确时频繁运行（无必要开销）

### 前置条件

- Claude Code ≥ 2.1.205
- 终端可访问 `~/.claude/` 配置目录

### 详细使用步骤（业务用户）

1. 启动 Claude Code 交互会话
2. 输入 `/doctor` 或 `/checkup`
3. 查看诊断报告，按提示修复标记为 fail 的项
4. 可选：`/status` 查看运行时状态摘要

### 命令与配置示例

```bash
# 非交互环境快速检查
claude -p "/doctor" 2>&1 | head -30

# 查看版本确认支持
claude --version   # 需 ≥ 2.1.205
```

```bash
# 环境变量诊断相关
echo $ANTHROPIC_API_KEY | head -c 10   # 确认 Key 存在（勿泄露完整 Key）
which claude                              # 确认 PATH 正确
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `2.1.205` |
| `/doctor` 交互 | ⚠️ 未实测（无 API Key 完整会话） |
| `--help` 提及 doctor | ✅ 在 changelog 确认 |

### 问题与解决方案

**doctor 报 login 失败**：运行 `/login` 重新认证。**PATH 问题**：确认 `npm install -g @anthropic-ai/claude-code` 或 `npx` 路径。**Cowork VM 模式 login 失败**：changelog 提及 2.1.203+ 修复，升级至 2.1.205。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.205 `/doctor` 描述 | ✅ |
| npm 2.1.205 版本号 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 首次安装后运行 `/doctor` |
| 企业 IT | 将 `/doctor` 纳入 onboarding checklist |
| CI 维护者 | 升级后自动化运行版本检查 |

---

## 特性三：2.1.205 Auto Mode 安全增强

### 是什么（机制说明）

2.1.205 新增 auto mode 规则：**阻止篡改 session transcript 文件**；执行 `rm -rf` 时若变量无法从上下文解析，**先询问用户**再执行。背景任务通知明确标注「无人工输入」，防止 transcript 中伪造的批准被误执行。

### 适用场景

- **适合**：启用 auto mode 的自动化工作流、background agent 编排
- **不适合**：需要完全自主删除操作的无人值守场景（会有确认中断）

### 前置条件

- Claude Code ≥ 2.1.205
- Auto mode 已启用（Settings 或 `/config`）

### 详细使用步骤（业务用户）

1. 启动 Claude Code，确认 footer 显示当前权限模式
2. `/config` → 搜索 auto mode → 启用
3. 发起含 `rm -rf $UNKNOWN_VAR` 类操作时，观察是否弹出确认
4. 检查 background 通知是否标注 approval 状态

### 命令与配置示例

```bash
# 启用 safe mode 对比（更保守）
claude --safe-mode

# 查看当前权限模式
/config   # 搜索 permission mode
```

```json
// settings.json 权限相关
{
  "permissionMode": "auto",
  "autoModeRules": {
    "blockTranscriptTampering": true,
    "confirmUnresolvedRmRf": true
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--safe-mode` flag | ✅ `--help` 可见 |
| auto mode 实际行为 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**auto mode 过于保守**：切换 manual mode 或调整 rules。**background 通知误导**：2.1.205 已修复，确保升级。**transcript 被误改**：auto mode 现阻止此类操作。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog auto mode 规则 | ✅ |
| 工信部后门争议 | ⚠️ 不同议题——auto mode 是防护，后门是历史检测机制 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 安全敏感团队 | 保持 auto mode + manual 混合 |
| 自动化重度用户 | 接受 rm -rf 确认作为安全税 |
| 国内合规团队 | 结合工信部公告评估客户端风险 |

---

## 特性四：2.1.205 Agent View 与 Background 改进

### 是什么（机制说明）

Agent view 多项改进：行显示**彩色状态词**和 classifier 生成的 headline（替代原始 tool call 文本）；peek 打开时显示完整状态含 blocked session 的 exact ask。编辑/合并/评论/推送已有 PR 的 session 在 `claude agents` 中自动链接 PR。Background daemon 升级改为流式下载（峰值内存降约 400MB）。

2.1.203–2.1.205 连续修复 background session 稳定性：token 过期自动恢复、PATH 继承、ANTHROPIC_BASE_URL 丢失等。

### 适用场景

- **适合**：多 background agent 并行、PR 关联工作流
- **不适合**：单会话简单问答（agent view 价值有限）

### 前置条件

- Claude Code ≥ 2.1.203（建议 2.1.205）
- Git 仓库环境（PR 链接功能）

### 详细使用步骤（业务用户）

1. 输入 `claude agents` 进入 agent 列表
2. 查看 Needs input / Working / Completed 分区
3. 点击行查看 peek 详情（含 blocked ask）
4. Background agent 完成 PR 操作后，列表自动显示 PR 链接

### 命令与配置示例

```bash
# 启动 background agent
claude -p "Fix all lint errors in src/" --background

# 查看 agent 列表
claude agents

# 附加到 background session
claude attach <session-id>
```

```bash
# Remote Control 相关（移动端）
# VSCode Settings → Enable Remote Control for all sessions
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `claude agents` 命令 | ✅ `--help` 可见 |
| background 实际运行 | ⚠️ 未实测（无 API Key） |
| agent view UI | ⚠️ 未实测 |

### 问题与解决方案

**background session 无响应**：升级至 2.1.205（token 过期自动恢复）。**PR 链接缺失**：确认 bash 输出未超 30K inline 限制。**agent 显示 failed 后 resume**：2.1.205 修复 SendMessage resume 后状态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.203–205 background 修复 | ✅ |
| Boris Loop 工作流叙事 | ✅ 方向一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多任务开发者 | 用 background + agent view 管理并行 |
| PR 驱动团队 | 利用 PR 自动链接追踪 agent 产出 |
| 资源受限环境 | 流式升级减少 400MB 峰值内存 |

---

## 特性五：2.1.205 `--json-schema` 与 Windows 修复

### 是什么（机制说明）

修复 `--json-schema` 在 schema 无效时静默产出非结构化输出的问题；拒绝使用 `format` keyword 的 schema。修复 Windows worktree 删除时 NTFS junction/symlink 可能删除 worktree 外文件的问题。修复目录被删除/锁定/unmount 时 Windows 崩溃。

### 适用场景

- **适合**：CI 管道使用 `--json-schema` 结构化输出；Windows 多 worktree 开发
- **不适合**：依赖 `format` keyword 的旧 schema（需迁移）

### 前置条件

- Claude Code ≥ 2.1.205
- 结构化输出场景需有效 JSON Schema

### 详细使用步骤（业务用户）

1. 定义不含 `format` keyword 的 JSON Schema
2. 使用 `claude -p "..." --json-schema schema.json` 获取结构化输出
3. Windows 用户：正常使用 git worktree，无需额外操作（修复已内置）

### 命令与配置示例

```bash
# 结构化输出
cat > schema.json << 'EOF'
{
  "type": "object",
  "properties": {
    "summary": {"type": "string"},
    "files_changed": {"type": "array", "items": {"type": "string"}}
  },
  "required": ["summary"]
}
EOF

claude -p "Summarize recent git changes" --json-schema schema.json
```

```bash
# worktree 隔离 subagent
claude -p "Fix bug in feature branch" --worktree feature/fix-123
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--json-schema` flag | ✅ `--help` 可见 |
| 结构化输出实测 | ⚠️ 未实测（无 API Key） |
| Windows worktree | ⚠️ 未实测（Linux 环境） |

### 问题与解决方案

**schema 含 format 被拒**：移除 `format` keyword。**静默非结构化输出**：升级至 2.1.205 后无效 schema 会报错。**worktree 删除误删**：升级至 2.1.205。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.205 修复列表 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI 工程师 | 用 `--json-schema` 替代 regex 解析 |
| Windows 开发者 | 立即升级至 2.1.205 |
| Schema 设计者 | 避免 `format` keyword |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 关键变更 |
|------|----------------|----------|
| **2.1.205** | 2026-07-08 | `/doctor` 全量体检、auto mode 安全、agent view 改进 |
| 2.1.204 | 2026-07-08 | SessionStart hook 流式修复 |
| 2.1.203 | 2026-07-07 | 动态工作流 OTel、background 稳定性大修复 |
| 2.1.202 | 2026-07-06 | 中间版本 |
| 2.1.201 | 2026-07-06 | 维护态 patch |

## 今日研究员结论

Claude Code 2.1.205 是 background agent 稳定性与安全的集中修复版，`/doctor` 升级降低新用户门槛。Fable 5 延期至 7/12 缓解社区反弹，但 7/12 后 credits 计费仍不可避免——建议今日起规划模型路由策略。国内用户须高度关注工信部 NVDB 定调与阿里 7/10 禁令，核心业务不应依赖 Claude Code 客户端。
