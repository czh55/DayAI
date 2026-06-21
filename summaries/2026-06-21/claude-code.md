# Claude Code 每日技术文档 — 2026-06-21

> 本地实测版本：**2.1.185**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Anthropic News](https://www.anthropic.com/news)

## 今日综述

2026 年 6 月 21 日本地实测 **2.1.185**（与 6/20 相同，npm `@anthropic-ai/claude-code@latest` 无新版本）。Changelog 顶部变更延续 **auto mode 破坏性 git 拦截**、**`/config key=value`**、**Bun 1.4**、Subagent 面板 UX 与 Remote Control 修复。**今日最大事件：Fable 5 订阅免费窗口仅剩最后 1 天（6/22 UTC 截止）**；6/23 起 Pro/Max/Team 用户需 usage credits 消费 Fable 5。

---

## 特性一：Fable 5 免费窗口最后 24 小时与模型切换策略（6/9–6/22 UTC）

### 是什么（机制说明）

Anthropic 6/9 发布 **Claude Fable 5**（Mythos-class），向订阅用户提供限时免费窗口：

- **窗口**：6/9–**6/22 UTC**（含当日）——**今日为最后完整日**
- **6/23 起**：从套餐额度移除，需 **usage credits**（$10/M 输入、$50/M 输出）
- **消耗倍率**：Fable 5 token 对套餐额度消耗约为 Opus 的 ~2×
- Claude Code 通过 `/model` 切换；`best` alias 在有权限时解析为 Fable 5

### 适用场景

- **适合**：6/22 前完成长程重构/全库迁移/动态工作流的成本效益对比
- **不适合**：6/23 后无 credits 预算的持续 Fable 5 生产流量

### 前置条件

- Claude Pro/Max/Team/Enterprise 订阅
- Claude Code ≥ 2.1.170
- 6/23 后需 Settings > Usage 启用 credits

### 详细使用步骤（业务用户）

1. 升级 CLI：`cd /workspace/tools && npm install @anthropic-ai/claude-code@latest`
2. 验证：`./node_modules/.bin/claude --version` → `2.1.185`
3. 交互模式：`/model` → 选择 `claude-fable-5` 或输入 `/model fable`
4. 配置 fallback：编辑 `~/.claude/settings.json`：

```json
{
  "fallbackModel": "claude-opus-4-8-20250514"
}
```

5. **今日行动**：对核心项目跑一轮 Fable 5 vs Sonnet 4.6 对比（token/时间/质量）
6. **6/22 23:59 UTC 前**决策：预购 credits 或回退 Opus/Sonnet 默认

### 命令与配置示例

**基础 — 切换模型**

```
/model claude-fable-5
```

**进阶 — print mode 指定模型**

```bash
claude -p --model claude-fable-5 "Analyze this repo structure and suggest refactoring plan"
```

**settings.json 完整 fallback 链**

```json
{
  "model": "claude-fable-5",
  "fallbackModel": "claude-sonnet-4-6-20250514",
  "availableModels": ["claude-fable-5", "claude-opus-4-8-20250514", "claude-sonnet-4-6-20250514"]
}
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/claude --version
# 2.1.185 (Claude Code)
```

| 项 | 结果 |
|----|------|
| `--version` | ✅ 2.1.185 |
| `--help` | ✅ 正常 |
| `/model fable` 推理 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：6/23 后 Fable 5 不可用**

排查：检查 Settings > Usage 是否启用 credits；确认账户余额。

**错误 2：Fable 5 快速耗尽套餐额度**

排查：Fable 5 消耗约为 Opus 2×；长任务切换 Sonnet 执行层；设置 `enforceAvailableModels` 限制团队滥用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Anthropic 官方公告](https://www.anthropic.com/news/claude-fable-5-mythos-5) | ✅ 6/22 截止 |
| MCP.Directory secondary | ✅ 窗口日期一致 |
| 量子位 ALE 报道 | ⚠️ 成本效率解读，非官方立场 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro 用户 | 6/22 前跑 2–3 个真实项目对比，再决定 6/23 后是否买 credits |
| Team Lead | 通知团队窗口截止日；统一 `fallbackModel` 策略 |
| 成本敏感者 | 6/23 起默认 Opus/Sonnet，Fable 5 仅用于高价值长任务 |

---

## 特性二：auto mode 破坏性 Git 命令安全拦截（2.1.185 延续）

### 是什么（机制说明）

auto mode 下新增/延续安全拦截规则：

- 阻断：`git reset --hard`、`git checkout -- .`、`git clean -fd`、`git stash drop`（用户未明确要求丢弃本地工作时）
- 阻断：`git commit --amend`（非本会话 Agent 创建的 commit）
- 阻断：`terraform destroy`/`pulumi destroy`/`cdk destroy`（非用户指定 stack）
- Subagent spawn 前由 classifier 评估，堵住子 Agent 绕过审查的缺口

### 适用场景

- **适合**：团队启用 auto mode 的生产仓库
- **不适合**：需要 Agent 自主清理工作区的实验环境（需显式授权）

### 前置条件

- Claude Code 2.1.185+
- auto mode 已启用

### 详细使用步骤（业务用户）

1. 确认 auto mode：`/config` → 查看 auto 相关设置
2. 若需 Agent 执行破坏性 git 操作，在 prompt 中**明确说明**：「请 discard all local changes and reset to origin/main」
3. 配置权限规则细化拦截：

```json
{
  "permissions": {
    "allow": ["Bash(git status:*)", "Bash(git diff:*)"],
    "deny": ["Bash(git reset --hard:*)"]
  }
}
```

4. 使用 `Tool(param:value)` 语法精确控制：`Agent(model:opus)` 阻止 Opus 子 Agent

### 命令与配置示例

**显式授权 destructive git**

```
Please run git reset --hard to discard all my uncommitted changes and match origin/main exactly.
```

**Tool 参数匹配权限规则**

```json
{
  "permissions": {
    "deny": ["Agent(model:opus)", "Bash(terraform destroy:*)"]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 确认 | ✅ |
| 实测 auto mode 拦截 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：Agent 拒绝执行合理的 git clean**

解决：在 prompt 中明确授权；或临时切换非 auto mode。

**错误 2：子 Agent 仍执行被阻断操作**

排查：确认 2.1.185+ 已安装；检查 subagent classifier 是否生效。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 顶部条目 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 欢迎此变更，减少误删风险 |
| CI/CD 集成 | 在 `-p` 模式 prompt 中明确授权范围 |

---

## 特性三：`/config key=value` 快捷配置（2.1.185 延续）

### 是什么（机制说明）

新增 `/config key=value` 语法，可在 prompt 中直接设置任意配置项，支持：

- 交互模式、`-p` print mode、Remote Control 会话
- 示例：`/config thinking=false`、`/config model=claude-sonnet-4-6-20250514`
- `/config --help` 列出所有可用 shorthand keys
- Enter 和 Space 均可切换 `/config` 面板选项；Esc 保存并关闭

### 适用场景

- **适合**：会话中快速切换模型/effort/thinking 而无需编辑 settings.json
- **不适合**：需持久化跨会话的配置（仍用 settings.json）

### 前置条件

- Claude Code 2.1.185+

### 详细使用步骤（业务用户）

1. 在 Claude Code 会话中输入：`/config model=claude-fable-5`
2. 查看可用 keys：`/config --help`
3. 打开配置面板：`/config`（Enter/Space 切换，Esc 保存关闭）
4. print mode 同样支持：`claude -p "/config thinking=false" "explain this code"`

### 命令与配置示例

```
/config model=claude-fable-5
/config thinking=false
/config effort=high
/config --help
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog | ✅ |
| 交互实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：`settings.json` ENOENT（符号链接）**

Changelog 2.1.185 已修复相对符号链接场景；升级后重试。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常用户 | 用 `/config` 快速试验，满意后写入 settings.json |
| 脚本用户 | `-p` 模式首行 `/config` 设置会话参数 |

---

## 特性四：`/loops` 循环工程与 Loop Engineering 范式（持续功能）

### 是什么（机制说明）

`/loops` 在持续 Claude Code 会话中运行自动循环：

- 保留上下文窗口、工具权限、MCP 连接（非冷启动）
- 间隔：最小 1 分钟，最长运行 3 天自动停止
- 绑定当前会话：关闭终端即停止
- 36氪/虎嗅 6 月报道将其定位为「Loop Engineering」核心工具

### 适用场景

- **适合**：夜间自动测试-修复循环、定期 lint/format、监控型任务
- **不适合**：需跨机器持久化的后台任务（用 `/bg` 或外部 cron）

### 前置条件

- Claude Code 2.1.x
- 组织未禁用 Loops 功能

### 详细使用步骤（业务用户）

1. 在会话中：`/loops` 创建新循环
2. 设置间隔与停止条件
3. 描述每轮循环任务（如「运行测试，修复失败，提交 PR」）
4. 监控 token 消耗；3 天到期自动停止
5. 禁用：组织 settings 或 `settings.json` 关闭 loops

### 命令与配置示例

```
/loops create every 30m "run npm test, fix any failures, commit if all pass"
```

```json
{
  "loopsEnabled": false
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 36氪/虎嗅报道 | ✅ 功能描述一致 |
| 实测 Loop | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：Loop 失控消耗 API 额度**

解决：设置较短 max duration；监控 `/usage`；组织禁用 loops。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 36氪 Loop Engineering 稿 | ✅ |
| Boris Cherny 公开工作流 | ✅ secondary |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 独立开发者 | 从 30 分钟间隔 lint 循环起步 |
| 团队 | 统一 loops 策略与 token 预算 |

---

## 特性五：MCP 与权限配置增强（2.1.185 维护）

### 是什么（机制说明）

近期 changelog 多项 MCP/权限修复：

- `claude mcp get`/`list` 在 tools/list 失败时显示 `! Connected · tools fetch failed`
- MCP server-level specs 在 subagent `disallowedTools` 中正确生效
- headless/SDK 模式不再向模型暴露需认证的 auth-stub 工具
- `Tool(param:value)` 权限规则支持通配符

### 适用场景

- **适合**：多 MCP 服务器、子 Agent 权限隔离
- **不适合**：无 MCP 的简单会话

### 前置条件

- 配置 `.mcp.json` 或 `claude mcp add`
- Claude Code 2.1.185+

### 详细使用步骤（业务用户）

1. 添加 MCP：`claude mcp add my-server -- npx -y @my/mcp-server`
2. 验证连接：`claude mcp list`
3. 配置 subagent 禁用：`disallowedTools: ["mcp__dangerous-server"]`
4. 权限文件：`~/.claude/settings.json` 或项目 `.claude/settings.json`

### 命令与配置示例

```bash
claude mcp list
claude mcp get my-server
```

```json
{
  "permissions": {
    "allow": ["mcp__github__*"],
    "deny": ["mcp__prod-db__write"]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `mcp list` | ⚠️ 未配置 MCP 服务器 |
| Changelog 修复项 | ✅ |

### 问题与解决方案

**错误 1：`✓ Connected` 但实际 tools 不可用**

升级 2.1.185+ 后 `mcp get` 会显示真实错误。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多工具用户 | 定期 `claude mcp list` 健康检查 |
| 安全团队 | 用 `disallowedTools` 隔离高风险 MCP |

---

## 版本对照表

| 版本 | 发布日 | 要点 |
|------|--------|------|
| 2.1.185 | 6/18–6/20 | auto mode 安全、`/config key=value`、Bun 1.4、MCP 修复 |
| 2.1.183 | 6/19 | patch 维护 |
| 2.1.170 | 6/9 | Fable 5 `/model` 支持 |

## 今日研究员结论

Claude Code 今日无新版本，但 **Fable 5 窗口倒计时**是开发者最紧迫行动项。建议 6/22 UTC 前完成对比测试并配置 `fallbackModel`。2.1.185 的 auto mode 安全拦截与 `/config` 快捷配置值得团队统一升级。Loop Engineering 范式下，`/loops` 是从 Prompt 工程迁移的第一步。

---
