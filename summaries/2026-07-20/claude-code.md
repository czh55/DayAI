# Claude Code 每日技术文档 — 2026-07-20

> 本地实测版本：**2.1.215**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[GitHub v2.1.215 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.215)

## 今日综述

2026 年 7 月 20 日 Claude Code **无新版本发布**，npm `@latest` 仍为 **2.1.215**（7/19 02:56 UTC）。今日最大变化来自 **Fable 5 分层定价正式生效**（7/20 00:00 PT）：

1. **Max / Team Premium**：Fable 5 永久包含，占周额度 50%
2. **Pro / Team Standard**：Fable 5 转 credits 计费 + $100 一次性额度
3. **Claude Code +50% 周限额加碼结束**：与 Fable 5 分层同日生效
4. CLI 层面 2.1.215 行为调整（skills 不再自动触发）仍有效

---

## 特性一：Fable 5 分层定价今日正式生效（7/20）

### 是什么（机制说明）

7/20 00:00 PT 起，Anthropic 将 7/18 宣布的分层方案落地：

| 方案 | Fable 5 权益 | 计费方式 |
|------|-------------|----------|
| Max / Team Premium | 永久包含 | 占周额度 50%，无 per-token 费用 |
| Pro / Team Standard | 不再内置 | credits 计费，$100 一次性额度 |
| API / Enterprise | 始终 API | $10/MTok 输入、$50/MTok 输出 |

同日，Claude Code 每周用量 +50% 加碼结束。Max 用户面临「双重压缩」：标准周限额回落 + Fable 5 50% cap。

### 适用场景

- **适合 Max 用户**：继续以 Fable 5 处理复杂编程任务，无需 per-token 焦虑
- **适合 Pro 轻量用户**：$100 credits 可支撑数次中等规模任务
- **不适合 Pro 重度用户**：一次 200 万 output tokens 的自主编程即可耗尽 $100

### 前置条件

Claude Pro/Max/Team 付费订阅；Claude Code 已登录

### 详细使用步骤（业务用户）

1. 打开 Claude Code，输入 `/status` 查看当前方案与额度
2. **Max 用户**：通过 `/model fable-5` 选择 Fable 5，注意 50% 周额度 cap
3. **Pro 用户**：在 Settings → Account 查看 usage credits 余额
4. 轻量任务切换 Sonnet 5：`/model sonnet-5` 节省 credits
5. 评估是否升级 Max（$100/月）或分流至 Codex

### 命令与配置示例

```bash
# 查看版本与状态
claude --version
```

```text
# 会话中
/model fable-5      # 选择 Fable 5（Pro 用户消耗 credits）
/model sonnet-5     # 轻量任务，不消耗 Fable credits
/status             # 查看额度与 credits 余额
```

```json
// ~/.claude/settings.json — Pro 用户 fallback 策略
{
  "model": "claude-sonnet-5-20260305",
  "fallbackModel": "claude-sonnet-5-20260305"
}
```

```json
// 仅在明确需要 Fable 5 时切换
{
  "model": "claude-fable-5-20260305"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `claude --version` | ✅ `2.1.215 (Claude Code)` |
| Fable 5 分层生效 | ⚠️ 未实测（无 API Key，无法验证额度变化） |
| `/status` 额度显示 | ⚠️ 未实测 |

### 问题与解决方案

**Pro 用户 $100 credits 未到账**：PCWorld（7/20）报道部分用户尚未收到，申领截止 8/2 PT，联系 support@anthropic.com。**Max 用户感觉额度骤降**：+50% 周限额加碼结束 + Fable 5 50% cap 叠加，属预期行为。**Fable 5 credits 消耗过快**：将代码分析、上下文整理交给 Sonnet 5，仅核心推理用 Fable 5。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| @claudeai 7/17 公告 | ✅ 分层方案原文 |
| TechTimes 7/20 | ✅ 今日生效确认 |
| PCWorld 7/20 | ✅ Pro credits 延迟报道 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Max 用户 | 继续以 Fable 5 为主力，注意 50% cap 规划 |
| Pro 重度用户 | 评估升级 Max 或分流 Codex（5h 限额已移除） |
| Pro 轻量用户 | $100 credits 用于关键任务，日常用 Sonnet 5 |
| 团队 Lead | 统一团队模型策略，避免 credits 意外消耗 |

---

## 特性二：Skills 自动触发行为调整（2.1.215，仍有效）

### 是什么（机制说明）

2.1.215（7/19 发布）变更：

> Claude no longer runs the `/verify` and `/code-review` skills on its own; invoke them with `/verify` or `/code-review` when you want them.

Claude 不再在完成代码修改后自动触发验证与审查 skills，需用户显式调用。

### 适用场景

- **适合**：精确控制 verify/review 时机；token 预算敏感场景
- **不适合**：完全依赖自动质量保证的无人值守 pipeline

### 前置条件

Claude Code ≥ 2.1.215

### 详细使用步骤（业务用户）

1. 确认版本：`claude --version` 应显示 `2.1.215`
2. 完成代码任务后，显式输入 `/verify`
3. 需要代码审查时，显式输入 `/code-review`
4. CI 自动化：在 prompt 或 SessionStart hook 中写入显式指令

### 命令与配置示例

```bash
claude --version   # 2.1.215 (Claude Code)
```

```text
/verify
/code-review
```

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "echo 'Consider running /verify'" }]
      }
    ]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `claude --version` | ✅ `2.1.215` |
| Skills 自动触发 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**习惯自动 verify 被打断**：prompt 末尾加「完成后请运行 /verify」。**CI 无人值守失败**：`-p` 模式传入含 `/verify` 的 prompt。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 顶栏 | ✅ 首条变更 |
| GitHub v2.1.215 | ✅ 唯一变更项 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 养成显式 `/verify` 习惯 |
| CI/CD 维护者 | 更新 pipeline prompt |

---

## 特性三：/model 与 /effort 模型选择（持续能力）

### 是什么（机制说明）

Claude Code 支持会话内切换模型与推理强度：

- `/model`：切换当前会话模型（fable-5、sonnet-5、opus-4.8 等）
- `/effort`：调整推理强度（low、medium、high、max）

Fable 5 分层生效后，Pro 用户每次 `/model fable-5` 将消耗 credits。

### 适用场景

- **适合**：同一项目内按任务复杂度切换模型
- **不适合**：Pro 用户频繁切换 Fable 5（credits 消耗快）

### 前置条件

已登录 Claude Code；对应模型在方案中可用

### 详细使用步骤（业务用户）

1. 在 Claude Code 会话中输入 `/model` 查看可用模型列表
2. 选择目标模型，如 `fable-5` 或 `sonnet-5`
3. 输入 `/effort high` 提升推理强度（Fable 5 下增加 token 消耗）
4. 用 `/status` 确认当前模型与额度

### 命令与配置示例

```text
/model
/model fable-5
/model sonnet-5
/effort high
/effort medium
```

```json
{
  "model": "claude-sonnet-5-20260305",
  "fallbackModel": "claude-sonnet-5-20260305"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/model` 命令存在 | ✅ `--help` 可见 |
| 模型切换实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**Fable 5 不在列表中**：检查方案是否为 Pro/Max/Team；Pro 用户需启用 credits。**effort 不生效**：部分模型不支持全部 effort 级别，用 `/status` 确认。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Claude Code Docs | ✅ /model /effort 文档完整 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro 用户 | 默认 Sonnet 5，仅关键任务切 Fable 5 |
| Max 用户 | Fable 5 + high effort 处理复杂任务 |

---

## 特性四：/loops 与 /goal 循环工程（2.1.212+）

### 是什么（机制说明）

Claude Code 2.1.212+ 引入 Loop Engineering 能力：

- `/goal`：设定明确目标，评估器模型自动判断是否达标，未达标则重试
- `/loop`：按固定时间间隔触发任务
- `/schedule`：定时任务（cron 风格）
- `/fork`：复制会话到后台（2.1.212 重构，原 `/subtask` 更名）

官方 7/17 博客定义四种循环：回合制、目标、时间、主动。

### 适用场景

- **适合**：重复性任务自动化、夜间批量处理、CI 集成
- **不适合**：需要人工每步确认的安全敏感操作

### 前置条件

Claude Code ≥ 2.1.212；Max/Pro 付费订阅

### 详细使用步骤（业务用户）

1. 设计循环：明确触发条件、停止条件、验证标准
2. 输入 `/goal "确保所有测试通过"` 启动目标循环
3. 或 `/loop 1h "扫描依赖漏洞"` 启动时间循环
4. 用 `claude agents` 查看后台会话状态
5. 用 `←` 或 `/background` 将当前会话移至后台

### 命令与配置示例

```text
/goal 确保所有单元测试通过且覆盖率 > 80%
/loop 2h 检查 GitHub Issues 中的 bug 标签并自动分诊
/schedule "0 9 * * 1" 每周一早上生成周报
/fork 将此重构任务复制到后台继续
```

```bash
# 查看后台 agent 列表
claude agents --json
```

```json
{
  "env": {
    "CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION": "50",
    "CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION": "100"
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/goal` `/loop` 命令 | ✅ `--help` 可见 |
| 循环执行实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**循环不停止**：检查停止条件是否明确；设置 `CLAUDE_CODE_MAX_SUBAGENTS_PER_SESSION`。**后台会话无法删除**：2.1.214 修复了 `claude rm` 问题，确保版本 ≥ 2.1.214。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Claude Code 官方 Loop 博客 | ✅ 四类型定义 |
| 36氪 7/17 转载 | ✅ 与官方一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 从单一重复任务开始设计第一个 `/goal` |
| 团队 Lead | 标准化团队 Loop 模板与验证器 |

---

## 特性五：--safe-mode 与权限配置（2.1.214）

### 是什么（机制说明）

2.1.214 强化权限 fail-closed 策略：

- Bash 权限检查对超过 10,000 字符的命令始终 prompt
- `docker` 命令（含 daemon-redirect flags）需权限确认
- 单段 `dir/**` allow 规则仅匹配 `/dir`，不再 any-depth 匹配
- `--safe-mode` 启动时拒绝所有工具调用，仅允许只读操作

### 适用场景

- **适合**：审查不可信代码库、演示环境、企业合规场景
- **不适合**：需要自主修改文件的正常开发流程

### 前置条件

Claude Code ≥ 2.1.214

### 详细使用步骤（业务用户）

1. 审查模式：`claude --safe-mode` 启动只读会话
2. 配置权限：编辑 `.claude/settings.json` 或 `~/.claude/settings.json`
3. 设置 allow/deny/ask 规则控制工具调用
4. 企业环境：通过 `managed-settings` 强制策略

### 命令与配置示例

```bash
claude --safe-mode -p "分析这个代码库的安全问题"
```

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Grep",
      "Glob"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Edit(**/.env)"
    ],
    "ask": [
      "Bash(docker *)",
      "Edit(src/**)"
    ]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--safe-mode` 标志 | ✅ `--help` 可见 |
| 权限规则实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**allow 规则不生效**：2.1.214 修复了 `dir/**` any-depth 匹配问题，检查规则写法。**Bash 命令被意外拒绝**：超过 10K 字符的命令现在始终 prompt，属预期行为。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| v2.1.214 release notes | ✅ 权限修复列表 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 安全审查员 | 使用 `--safe-mode` 分析不可信代码 |
| 企业管理员 | 配置 managed-settings 统一权限策略 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 核心变更 |
|------|----------------|----------|
| 2.1.215 | 7/19 02:56 | Skills 不再自动触发 /verify /code-review |
| 2.1.214 | 7/18 01:20 | 权限 fail-closed、EndConversation、OTel 关联 |
| 2.1.212 | 7/17 | /fork 后台化、WebSearch 上限 200、MCP 自动后台 |
| 2.1.211 | 7/16 | ultracode、/loops 增强 |

## 今日研究员结论

7/20 无 CLI 新版本，但 **Fable 5 分层落地** 是今日最重要变化。Pro 用户应立即：① 检查 credits 余额；② 将日常任务切换 Sonnet 5；③ 评估 Codex 作为 Fable 5 分流方案。CLI 层面 2.1.215 的 skills 行为调整要求开发者养成显式 `/verify` 习惯。Loop Engineering（/goal、/loops）仍是 2026 下半年最值得投入学习的 Claude Code 能力。

---
