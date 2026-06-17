# OpenAI Codex 每日技术文档 — 2026-06-17

> 本地实测版本：**0.140.0**（npm latest stable）｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

**2026 年 6 月 17 日** Codex CLI npm 稳定版仍为 **0.140.0**（6/15 发布），同日 GitHub 连续发布 **0.141.0-alpha.4~6** 三条预发布。0.140.0 带来 `/usage` 用量视图、`/import` 从 Claude Code 迁移、`thread/delete` 永久删会话、Bedrock API Key 认证、远程 compaction v2 默认启用等重大特性。本地实测：`doctor` 12 ok · 1 warn · 4 fail（auth 未登录）；`features list` 显示 `browser_use`、`computer_use`、`apps` 为 stable。

---

## 特性一：`/usage` 用量视图（0.140.0）

### 是什么（机制说明）

0.140.0 新增 `/usage` 命令，展示 **日/周/累计** 账户 Token 活动，帮助开发者与团队监控 Agent 工作流成本。背景是 GitHub 等平台 6 月全面转向按量计费，用量透明化成为刚需。

### 适用场景

- **适合**：高频 Codex 用户；团队成本分摊
- **不适合**：仅偶尔使用的用户（可用 Dashboard 代替）

### 前置条件

- codex-cli **0.140.0+**
- 已登录 OpenAI/Codex 账户

### 详细使用步骤（业务用户）

1. 启动 `codex` 交互 TUI
2. 输入 `/usage`
3. 切换日/周/累计视图
4. 结合 `/goal` 长任务评估单次任务 Token 消耗

### 命令与配置示例

**基础**

```
/usage
```

**config.toml 相关（用量与模型）**

```toml
[model]
default = "gpt-5.4"

[analytics]
# 具体字段见官方 Config Reference
```

### 本地测试结果

| 命令 | 输出 | 结果 |
|------|------|------|
| `codex --version` | `codex-cli 0.140.0` | ✅ |
| `/usage` | 需登录 | ⚠️ 未实测（无 auth） |
| `codex doctor` | 12 ok · 1 warn · 4 fail | ✅ 结构正常 |

### 问题与解决方案

**错误 1：`/usage` 无数据**

排查：确认已登录；检查网络；升级至 0.140.0+。

**错误 2：数字与 Dashboard 不一致**

排查：注意日/周/累计切换；时区差异；缓存延迟。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [0.140.0 Release](https://github.com/openai/codex/releases/tag/rust-v0.140.0) | 官方 #27925 |
| 虎嗅 GitHub 按量计费 | 行业背景一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | 长任务前 `/usage` 检查余额 |
| 团队 Admin | 结合 API 账单做预算告警 |
| 从 Claude Code 迁移 | 对比两侧 `/usage` 成本 |

---

## 特性二：`/import` 从 Claude Code 迁移（0.140.0）

### 是什么（机制说明）

`/import` 与 CLI `codex import` 支持 **选择性导入** Claude Code 的 setup、项目配置与近期聊天，降低工具切换摩擦。Codex 0.140.0 Release Notes 明确列为 New Feature。

### 适用场景

- **适合**：从 Claude Code 评估/迁移至 Codex 的团队
- **不适合**：全新 Codex 用户（无导入源）

### 前置条件

- codex-cli 0.140.0+
- 本机存在 Claude Code 配置（`~/.claude/`、项目 `.claude/`）

### 详细使用步骤（业务用户）

1. 安装/升级：`npm install -g @openai/codex@latest`
2. 启动 `codex`，输入 `/import`
3. 选择要导入的项：setup / project config / recent chats
4. 确认导入范围，避免覆盖现有 Codex 配置
5. `codex doctor` 验证导入后健康状态

### 命令与配置示例

**TUI**

```
/import
```

**CLI**

```bash
codex import --from claude-code --select setup,config,chats
```

**导入后验证**

```bash
codex doctor
codex features list | head -20
```

### 本地测试结果

| 命令 | 结果 |
|------|------|
| `codex import` | ⚠️ 未实测（无 Claude Code 本地配置 + 无 auth） |
| Release Notes | ✅ 0.140.0 官方功能 |

### 问题与解决方案

**错误 1：导入后 MCP 冲突**

排查：检查 `config.toml` MCP 段；禁用重复 server。

**错误 2：聊天记录不完整**

排查：`/import` 为选择性导入；检查 Claude Code 版本兼容性。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.140.0 Release #27070 | 官方 |
| Fable 5 停服背景 | 迁移需求上升 ⚠️ 推测 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Claude Code 用户 | Fable 5 停服窗口评估 `/import` |
| 团队 | 先导入 config，聊天可选 |
| 安全 | 审查导入的 secrets 与 MCP 权限 |

---

## 特性三：`codex exec` 与非交互执行（稳定能力）

### 是什么（机制说明）

`codex exec` 在 headless 环境执行单次或脚本化任务，适合 CI、cron、Cloud Agent。0.140.0 改进：非 TTY 后台命令可用 Ctrl-C 中断并保留输出；`codex exec` 可 surface runtime warnings。

### 适用场景

- **适合**：CI 自动修 lint；定时任务；本 DayAI 自动化
- **不适合**：需频繁人工确认的 exploratory 任务

### 前置条件

- codex-cli 已安装并认证
- 项目 `config.toml` 或环境变量配置

### 详细使用步骤（业务用户）

1. 在项目根创建/编辑 `~/.codex/config.toml` 或项目配置
2. 运行 `codex exec "fix all eslint errors in src/"`
3. CI 中：`codex exec --full-auto "run tests and fix failures"`
4. 检查 exit code 与 stdout

### 命令与配置示例

**基础**

```bash
codex exec "summarize git diff --stat"
```

**进阶 CI**

```bash
codex exec \
  --sandbox workspace-write \
  "npm test 2>&1 | tail -50; fix failing tests"
```

**config.toml sandbox**

```toml
[sandbox]
mode = "workspace-write"
```

### 本地测试结果

| 命令 | 结果 |
|------|------|
| `codex exec` | ⚠️ 未实测（无 auth） |
| `codex --help` | ✅ 显示 exec 子命令 |

### 问题与解决方案

**错误 1：exec 挂起无输出**

排查：检查 sandbox 权限；加 `--json` 输出；非 TTY 用 Ctrl-C 中断（0.140 已修复）。

**错误 2：sandbox 拒绝写文件**

排查：`config.toml` 调整 `sandbox.mode`；`codex doctor` 检查 sandbox 依赖。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.140.0 #27415 | runtime warnings in exec |
| DayAI 自动化 | 同类 headless 用法 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 嵌入 `codex exec` + 人工 review PR |
| 开发者 | 本地先用 TUI，成熟后转 exec |
| 成本敏感 | 配合 `/usage` 设单次 token 上限 |

---

## 特性四：`codex doctor` 与 `features list`（诊断套件）

### 是什么（机制说明）

`codex doctor` 全面检查 CLI 安装、auth、sandbox、app-server 等子系统；`codex features list` 列出 feature flag 状态（stable / under development / removed）。升级前必备。

### 适用场景

- **适合**：首次安装；升级后；CI 环境 smoke test
- **不适合**：— 

### 前置条件

- codex-cli 已安装

### 详细使用步骤（业务用户）

1. `codex --version` 确认版本
2. `codex doctor` 查看摘要
3. `codex doctor --all` 展开详情（若有 fail）
4. `codex features list` 确认所需能力（如 `computer_use`）为 stable

### 命令与配置示例

```bash
codex --version
codex doctor 2>&1 | tail -10
codex features list 2>&1 | head -20
codex doctor --json  # 机器可读
```

### 本地测试结果（2026-06-17）

```
codex-cli 0.140.0

codex doctor:
  12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
  (auth 未登录、app-server 未运行属预期)

codex features list (节选):
  browser_use          stable    true
  computer_use         stable    true
  apps                 stable    true
  code_mode            under development  false
  chronicle            under development  false
```

| 项 | 结果 |
|----|------|
| `--version` | ✅ 0.140.0 |
| `doctor` | ✅ 可运行（4 fail = auth） |
| `features list` | ✅ 正常 |

### 问题与解决方案

**错误 1：4 fail 全为 auth**

排查：运行 `codex login`；设置 `OPENAI_API_KEY`；属预期非 bug。

**错误 2：sandbox 依赖 missing**

排查：Linux 安装 bubblewrap 等；参考 doctor `--all` 详情。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 | 与 6/16 同类环境一致 |
| 0.140.0 | SQLite 自动恢复等修复 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全员 | 升级后先 `doctor` |
| CI | `codex doctor --json` 门禁 |
| 尝鲜 alpha | 对比 stable features 差异 |

---

## 特性五：0.141.0-alpha 线与 0.140.0 稳定版关系（2026-06-17）

### 是什么（机制说明）

**6 月 17 日** GitHub 发布 **0.141.0-alpha.4**（00:28Z）、**alpha.5**（09:23Z）、**alpha.6**（19:52Z）。npm `@latest` 仍指向 **0.140.0**。alpha 通常含未完全验证的修复与特性，数日内可能 promote 为 0.141.0 stable。

0.140.0 其他重要特性（仍有效）：
- `thread/delete` 永久删会话
- Bedrock API Key managed auth
- 远程 compaction v2 默认启用
- `@` 统一 mentions 菜单
- 移除实验性 `/realtime` 语音

### 适用场景

- **适合**：生产用 0.140.0；尝鲜跟踪 alpha.6
- **不适合**：生产直接装 alpha

### 前置条件

- npm：`npm install @openai/codex@latest` → 0.140.0
- 尝鲜：`npm install @openai/codex@0.141.0-alpha.6`（若已发布 npm）

### 详细使用步骤（业务用户）

1. 生产：`npm install -g @openai/codex@0.140.0`
2. 跟踪：`watch gh release list -R openai/codex`
3. alpha 发布后：`npm install @openai/codex@next`（若有 tag）
4. 升级后：`codex doctor && codex features list`

### 命令与配置示例

```bash
# 锁定稳定版
npm install -g @openai/codex@0.140.0

# 查看 GitHub 最新 release
# https://github.com/openai/codex/releases
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| npm @latest | ✅ 0.140.0 |
| GitHub alpha.6 | ✅ 6/17 19:52Z 发布 |
| alpha npm 安装 | ⚠️ 未尝试 |

### 问题与解决方案

**错误 1：误装 alpha 到生产**

排查：package.json 锁定 `0.140.0`；`codex --version` 门禁。

**错误 2：alpha 与 stable 配置不兼容**

排查：备份 `~/.codex/`；`doctor` 检查 SQLite 迁移。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Releases | alpha.4~6 @ 6/17 |
| npm registry | latest = 0.140.0 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | 锁定 0.140.0 |
| 贡献者 | 跟踪 alpha.6 changelog |
| DayAI 自动化 | 继续 npm @latest，升级时重跑 doctor |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 0.141.0-alpha.6 | 2026-06-17 | 当日最新 alpha |
| 0.140.0 | 2026-06-15 | `/usage`、`/import`、`thread/delete`、Bedrock |
| 0.139.0 | 更早 | 基线对比 |

## 今日研究员结论

Codex 处于 **0.140.0 稳定能力释放 + 0.141 alpha 密集迭代** 阶段。开发者应：生产锁定 **0.140.0**；用 **`codex doctor` + `features list`** 做健康检查；Fable 5 停服用户可评估 **`/import`** 迁移路径。本地实测 **0.140.0** 安装正常，auth 未配置导致 doctor 4 fail 属预期。关注 alpha.6 是否在未来 48h  promote 为 0.141.0 stable。

---
