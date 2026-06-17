# Claude Code 每日技术文档 — 2026-06-17

> 本地实测版本：**2.1.179**｜监测源：[Changelog](https://code.claude.com/docs/en/changelog.md)、[Anthropic News](https://www.anthropic.com/news)

## 今日综述

**2026 年 6 月 17 日** npm 最新版仍为 **2.1.179**，官方 changelog 无单独「6/17」版本标签，但近期 patch 持续修复 WSL2 滚轮回归、sandbox glob 性能、流式断连保留 partial 响应等稳定性问题。Anthropic 今日宣布 **首尔办公室** 开业；**Fable 5 / Mythos 5** 自 6/12 美国政府出口管制指令后仍全球不可用。开发者应关注 `Tool(param:value)` 权限语法、`--safe-mode`、`fallbackModel` 与 `/cd` 等近期重要特性。

---

## 特性一：WSL2 滚轮与流式断连修复（2.1.179 维护）

### 是什么（机制说明）

2.1.179 及近期 changelog 修复两类高频痛点：

1. **WSL2 鼠标滚轮**：在 Windows Terminal 与 VS Code 集成终端中滚轮失效（2.1.172 回归）已修复。
2. **流式断连**：中途连接断开时保留 partial 响应而非裸错误，spinner 不再卡在 "running tool"。

### 适用场景

- **适合**：WSL2 + Windows Terminal 日常开发者；不稳定网络环境下的长会话
- **不适合**：需 Fable 5 的场景（仍停服）

### 前置条件

- `claude --version` ≥ 2.1.179
- WSL2 用户需重启终端会话使修复生效

### 详细使用步骤（业务用户）

1. `npm install -g @anthropic-ai/claude-code@latest` 或项目内 `npm install @anthropic-ai/claude-code@latest`
2. 运行 `claude --version` 确认 **2.1.179**
3. WSL2 用户：在 Windows Terminal 打开 WSL 标签，启动 `claude`，测试滚轮浏览历史输出
4. 若遇断连：检查 partial 响应是否保留；使用 `/resume` 恢复会话

### 命令与配置示例

**基础：版本检查**

```bash
claude --version
# 2.1.179 (Claude Code)
```

**进阶：非交互模式断连恢复**

```bash
claude -p "analyze src/" --output-format json 2>&1 | tee session.log
# 断连时检查 session.log 中的 partial 内容
```

### 本地测试结果

| 命令 | 输出摘要 | 结果 |
|------|----------|------|
| `claude --version` | `2.1.179 (Claude Code)` | ✅ |
| `claude --help \| head -5` | 显示 Usage 与 `-p/--print` | ✅ |
| 推理实测 | 无 API Key | ⚠️ 未实测 |

### 问题与解决方案

**错误 1：WSL2 滚轮仍无效**

排查：确认版本 ≥ 2.1.179；升级 Windows Terminal；尝试 `export TERM=xterm-256color`。

**错误 2：断连后 spinner 卡住**

排查：升级至最新版；`Ctrl+C` 中断后 `/resume`；检查代理/防火墙是否中断 WebSocket。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [官方 Changelog](https://code.claude.com/docs/en/changelog.md) | WSL2、断连修复条目 |
| 社区 WSL issue | 与 2.1.172 回归报告吻合 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| WSL2 开发者 | 立即升级 2.1.179 |
| 远程 SSH 用户 | 关注断连 partial 保留，减少重跑成本 |
| 企业管理员 | 推送统一版本，避免 2.1.172 回归版本滞留 |

---

## 特性二：`Tool(param:value)` 权限规则语法（近期新增）

### 是什么（机制说明）

新增 `Tool(param:value)` 语法，权限规则可匹配工具输入参数（支持 `*` 通配），例如 `Agent(model:opus)` 可阻止 Opus 子代理启动。与 `mcp__server` 等 MCP 规则互补。

### 适用场景

- **适合**：企业限制高成本模型子代理；按工具参数细粒度授权
- **不适合**：简单 allow/deny 已够用的个人项目

### 前置条件

- Claude Code 2.1.17x+
- 配置文件：`.claude/settings.json` 或 `~/.claude/settings.json`

### 详细使用步骤（业务用户）

1. 打开项目 `.claude/settings.json`
2. 在 `permissions.allow` 或 `permissions.deny` 添加 `Tool(param:value)` 规则
3. 保存后重启 `claude` 或 `/doctor` 检查
4. 测试：尝试触发被 deny 的子代理，应出现权限提示

### 命令与配置示例

**基础：阻止 Opus 子代理**

```json
{
  "permissions": {
    "deny": ["Agent(model:opus)", "Agent(model:opus*)"]
  }
}
```

**进阶：仅允许特定 MCP 工具**

```json
{
  "permissions": {
    "allow": ["mcp__github__*", "Read(src/**)"],
    "deny": ["Bash(rm *)", "Agent(model:*)"]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 配置语法 | ⚠️ 未实测（无交互会话） |
| Changelog 文档 | ✅ 官方已记录 |

### 问题与解决方案

**错误 1：规则不生效**

排查：检查 `deny` 与 `allow` 优先级；`/doctor` 查看权限加载；子代理 `disallowedTools` 需同步更新。

**错误 2：通配符过宽导致误拦**

排查：从精确规则开始，逐步放宽；使用 `/doctor` 的 flat tree 布局查看命中规则。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 官方 Changelog | `Tool(param:value)` 条目 |
| 企业 managed settings | `enforceAvailableModels` 可叠加使用 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 安全管理员 | 用 `Agent(model:*)` 限制子代理模型 |
| 团队 Lead | 在 repo 级 settings 统一规则 |
| 个人开发者 | 默认可不配置，按需添加 |

---

## 特性三：`--safe-mode` 故障排查模式（2.1.170+）

### 是什么（机制说明）

`--safe-mode` 或环境变量 `CLAUDE_CODE_SAFE_MODE` 启动时禁用所有自定义项：CLAUDE.md、plugins、skills、hooks、MCP servers。用于隔离「配置导致的问题」。

### 适用场景

- **适合**：启动崩溃、权限循环、MCP 冲突排查
- **不适合**：日常开发（失去项目上下文）

### 前置条件

- Claude Code 2.1.170+

### 详细使用步骤（业务用户）

1. 遇到异常时运行：`claude --safe-mode`
2. 若 safe-mode 下正常，逐项恢复 plugins/skills/MCP 定位元凶
3. 也可用 `CLAUDE_CODE_SAFE_MODE=1 claude`
4. 排查完毕后正常启动 `claude`

### 命令与配置示例

**基础**

```bash
claude --safe-mode
```

**进阶：对比诊断**

```bash
claude --safe-mode -p "list files in ." 
claude -p "list files in ."   # 对比是否正常
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--safe-mode` 启动 | ⚠️ 未实测（无 API Key） |
| `--help` 显示 flag | ✅ 存在 |

### 问题与解决方案

**错误 1：safe-mode 仍崩溃**

排查：检查 Node 版本；`claude doctor`；可能是安装损坏，重装 CLI。

**错误 2：恢复后问题复现**

排查：二分法禁用 MCP/plugins；检查 `.claude/settings.json` symlink 问题（Linux 已修复）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.170 | 官方新增 |
| 社区 troubleshooting | 广泛推荐 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 onboarding 失败 | 首选 safe-mode |
| CI 环境 | 可用 safe-mode 做 smoke test |
| 重度 MCP 用户 | 排查时必备 |

---

## 特性四：`fallbackModel` 与 compaction 回退（近期修复）

### 是什么（机制说明）

`fallbackModel` 设置可配置最多三个回退模型，主模型过载或不可用时按序尝试。近期修复：**compaction 现在也 honor `--fallback-model`**，过载时 compaction 会沿 fallback 链回退。

### 适用场景

- **适合**：生产环境高可用；API 限流频繁的组织
- **不适合**：仅使用单一固定模型的个人用户

### 前置条件

- settings.json 或 CLI `--fallback-model`

### 详细使用步骤（业务用户）

1. **Settings** → 或在 `.claude/settings.json` 配置 `fallbackModel`
2. 设置主模型 `/model` 为首选
3. 配置 1–3 个 fallback（如 Sonnet → Haiku）
4. 长会话触发 compaction 时观察是否自动回退

### 命令与配置示例

**基础 settings.json**

```json
{
  "model": "claude-sonnet-4-5-20250929",
  "fallbackModel": [
    "claude-sonnet-4-5-20250929",
    "claude-haiku-4-5-20251001"
  ]
}
```

**进阶 CLI**

```bash
claude --model claude-opus-4-8 \
  --fallback-model claude-sonnet-4-5-20250929 \
  --fallback-model claude-haiku-4-5-20251001
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| fallback 触发 | ⚠️ 未实测 |
| Changelog compaction 修复 | ✅ 官方确认 |

### 问题与解决方案

**错误 1：compaction 仍失败**

排查：确认版本含 compaction fallback 修复；检查 fallback 模型是否在 `availableModels` 允许列表内。

**错误 2：回退到错误模型**

排查：`enforceAvailableModels` managed setting 可能覆盖用户选择。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | compaction + fallback 修复 |
| Bedrock 用户 | GovCloud inference profile 前缀已修复 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 | 配置 fallback 链 + `enforceAvailableModels` |
| 成本敏感 | Sonnet 主 + Haiku fallback |
| Fable 5 用户 | 迁移至 Opus 4.8（Fable 仍停服） |

---

## 特性五：`/cd` 工作目录迁移（2.1.170+）

### 是什么（机制说明）

`/cd <path>` 在会话中将工作目录迁移到新路径，**不破坏 prompt cache**，避免为换目录而重启会话。

### 适用场景

- **适合**：monorepo 跨子项目；同一 session 内切换 worktree
- **不适合**：需完全隔离上下文的多项目并行（应用子代理或新 session）

### 前置条件

- Claude Code 2.1.170+
- 目标目录存在且可访问

### 详细使用步骤（业务用户）

1. 在 Claude Code 交互会话输入 `/cd packages/frontend`
2. 确认 footer 显示新目录与 git branch
3. 继续在同一 session 编辑新目录文件
4. 若用 worktree：先 `EnterWorktree` 再 `/cd` 到 worktree 路径

### 命令与配置示例

```
/cd /workspace/my-project/backend
/cd ../shared-lib
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/cd` 命令 | ⚠️ 未实测 |
| Changelog | ✅ 2.1.170 新增 |

### 问题与解决方案

**错误 1：footer 仍显示旧 branch**

排查：已知 bug 已修复（`/cd` 后 git branch 同步）；升级至 2.1.179。

**错误 2：嵌套 skills 未加载**

排查：nested `.claude/skills` 在对应目录工作时应自动加载；检查权限 prompt。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | `/cd` + worktree 修复 |
| 社区 | monorepo 工作流好评 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| monorepo 开发者 | 用 `/cd` 替代新开会话 |
| 背景 Agent 用户 | 注意 background session 目录继承问题已修复 |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 2.1.179 | npm latest @ 6/17 | WSL2 滚轮、断连 partial、权限语法 |
| 2.1.170 | 6/9 前后 | Fable 5 发布、`--safe-mode`、`/cd` |
| 2.1.172 | 中间版 | WSL2 滚轮回归（已在 2.1.179 修复） |

## 今日研究员结论

Claude Code 处于 **稳定维护 + Fable 5 停服善后** 阶段：优先升级 **2.1.179** 获取 WSL2/断连修复；新能力关注 `Tool(param:value)` 权限与 `fallbackModel` compaction 回退。Fable 5 用户应规划迁移至 Opus 4.8 或评估国内 GLM-5.2 开源 Harness 路线。Anthropic 首尔办公室属区域扩张，不影响 CLI 功能路线图。

---
