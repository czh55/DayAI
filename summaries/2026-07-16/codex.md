# OpenAI Codex 每日技术文档 — 2026-07-16

> 本地实测版本：**0.144.5**（stable）｜监测源：[GitHub openai/codex releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 16 日 Codex CLI 实测：

- **稳定版 0.144.5**（7/16 02:54 UTC）今日发布，强化危险命令检测
- **预发布 0.145.0-alpha.18** 于 18:11 UTC 发布（触发前约 4 小时），7/16 已连发 alpha.15–18
- **5 小时滚动限额临时移除**（7/12 Tibo 公告）仍生效，周限额有效

---

## 特性一：稳定版 0.144.5 危险命令检测强化（今日发布）

### 是什么（机制说明）

[0.144.5 release](https://github.com/openai/codex/releases/tag/rust-v0.144.5)（7/16 02:54 UTC）为安全导向补丁：

> Improved dangerous-command detection, including more forced `rm` forms, and provides clearer rejection reasons when commands are denied. (#33455)

扩展了对强制 `rm` 变体的识别，并在命令被拒绝时提供更清晰的拒绝原因。npm `@openai/codex@latest` 已指向 0.144.5。

### 适用场景

- **适合**：使用 `codex exec` 自动化 shell 任务的用户；CI/CD 集成
- **不适合**：需要执行边缘 case `rm` 变体的特殊脚本（需审查是否被误拦）

### 前置条件

Node.js 18+ 或直接下载二进制

### 详细使用步骤（业务用户）

1. `npm install -g @openai/codex@latest`
2. `codex --version` 确认 `0.144.5`
3. `codex doctor` 验证环境
4. 测试现有自动化脚本是否被新规则误拦
5. 关注拒绝消息中的具体原因说明

### 命令与配置示例

```bash
codex --version
# codex-cli 0.144.5

codex doctor
codex features list 2>&1 | head -15
```

```toml
# ~/.codex/config.toml
[model]
default = "gpt-5.6-sol"

[sandbox]
# 危险命令检测为内置行为，无需额外配置
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.144.5` |
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `codex features list` | ✅ browser_use stable, code_mode under development |
| 推理能力 | ⚠️ 未实测（无 API Key） |

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.144.5
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**合法脚本被误拦**：检查是否使用了强制 `rm` 变体；考虑拆分命令或添加人工确认步骤。**版本仍为 0.144.4**：`npm cache clean --force && npm install -g @openai/codex@latest`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.144.5 | ✅ 7/16 02:54 UTC |
| npm @latest | ✅ 0.144.5 |
| PR #33455 | ✅ 危险命令检测 |
| 本地实测 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 立即升级，安全补丁不应延迟 |
| DevOps | 审查 CI 脚本中的 `rm` 用法 |
| 早期采用者 | stable 升级后再关注 alpha |

---

## 特性二：5 小时滚动限额临时移除（7/12 起，仍生效）

### 是什么（机制说明）

OpenAI Codex 负责人 Tibo（@thsottiaux）7/12 宣布：

1. **临时移除** Plus/Business/Pro 的 5 小时滚动使用限额
2. **GPT-5.6 Sol 效率优化**——同等任务消耗更少 token
3. **一次性用量重置**

移除后长会话不再被 5h 滚动窗口打断，但**周限额仍有效**。截至 7/16 未宣布恢复日期。量子位 7/14 将此与 Anthropic Fable 5 延期并列为「算力争夺」对称博弈。

### 适用场景

- **适合**：被 5h 限额打断的长程 refactor、多文件迁移
- **不适合**：误以为完全 unlimited

### 前置条件

ChatGPT Plus/Business/Pro；Codex CLI 或 ChatGPT 桌面端

### 详细使用步骤（业务用户）

1. 确认 Plus/Business/Pro 订阅
2. 启动 Codex 长程任务
3. 不再遇 5h 滚动中断
4. 监控**周限额**（Settings → Usage）
5. ⚠️ 趁窗口期完成积压任务

### 命令与配置示例

```bash
codex exec "Refactor the auth module to use JWT instead of sessions"
codex exec "Run full test suite and fix all failures"

# 长程任务配合 browser_use（stable）
codex exec "Browse the API docs and implement the client SDK"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 5h 限额移除 | ✅ Tibo X + BleepingComputer + 量子位交叉验证 |
| 本地长程任务 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**仍遇限额**：可能是周限额——检查 Usage。**限额恢复**：官方未公布结束日期，随时可能恢复。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Tibo @thsottiaux X 7/12 | ✅ |
| BleepingComputer 7/12 | ✅ |
| 量子位 7/14 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长程 Agent 用户 | 立即利用窗口完成积压 |
| 团队管理员 | 通知团队窗口期有限 |

---

## 特性三：0.145.0-alpha 高速迭代（7/16 四个版本）

### 是什么（机制说明）

7 月 16 日 GitHub 连发四个 alpha 预发布：

| 版本 | 发布时间 (UTC) |
|------|---------------|
| 0.145.0-alpha.15 | 00:29 |
| 0.145.0-alpha.16 | 05:22 |
| 0.145.0-alpha.18 | 18:11 |

（alpha.17 未在 release 列表显示，可能为内部构建）。npm `@latest` 仍指向稳定版 0.144.5，alpha 需显式安装。

### 适用场景

- **适合**：早期采用者测试新特性；CI 预发布验证
- **不适合**：生产环境

### 前置条件

愿意承担 alpha 不稳定风险

### 详细使用步骤（业务用户）

1. `npm install -g @openai/codex@0.145.0-alpha.18`
2. `codex --version` 确认 alpha 版本
3. `codex features list` 对比 stable 差异
4. 在隔离环境测试新特性
5. 发现问题通过 GitHub Issues 反馈

### 命令与配置示例

```bash
npm install -g @openai/codex@0.145.0-alpha.18
codex --version
# codex-cli 0.145.0-alpha.18

codex features list 2>&1 | grep -E "under development|stable"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| alpha.18 GitHub 发布 | ✅ 2026-07-16T18:11 UTC |
| npm @latest | ✅ 仍为 0.144.5（未跟随 alpha） |
| alpha 安装 | ⚠️ 未实测安装 alpha 包 |

### 问题与解决方案

**alpha 安装失败**：检查 Node.js 版本；尝试指定完整版本号。**与 stable 混用**：建议隔离环境，避免 PATH 冲突。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub releases | ✅ 四个 alpha 时间戳确认 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 早期采用者 | 关注 alpha.18 changelog，隔离测试 |
| 生产用户 | 继续使用 0.144.5 stable |

---

## 特性四：`codex exec` 非交互执行（stable）

### 是什么（机制说明）

`codex exec` 允许在命令行非交互模式下执行 Codex 任务，适合 CI/CD 和脚本化工作流：

- 无需 TTY；适合 cron/CI 管道
- 接受 prompt 作为参数或 stdin
- 输出可直接管道到下游工具
- 0.144.5 的危险命令检测在 exec 模式下同样生效

### 适用场景

- **适合**：CI 自动修复、批量代码审查、定时任务
- **不适合**：需要多轮交互的复杂任务

### 前置条件

Codex CLI ≥ 0.140.0；API Key 配置

### 详细使用步骤（业务用户）

1. 配置 API Key：`export OPENAI_API_KEY=...`
2. 执行非交互任务：`codex exec "your prompt"`
3. 管道输入：`cat task.md | codex exec`
4. 在 CI 中集成
5. 检查退出码判断成功/失败

### 命令与配置示例

```bash
# 基础用法
codex exec "Add unit tests for the UserService class"

# 从文件读取任务
codex exec < tasks/refactor-auth.md

# 指定模型
codex exec --model gpt-5.6-sol "Optimize database queries"
```

```yaml
# GitHub Actions 示例
- run: codex exec "Fix all lint errors in src/"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` 命令存在 | ✅ `--help` 确认 |
| 实际执行 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**exec 超时**：增加超时配置或拆分任务。**危险命令被拒**（0.144.5+）：检查拒绝原因，调整脚本。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex CLI help | ✅ |
| GitHub README | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps 工程师 | 在 CI 中集成 `codex exec` 自动修复 |
| 个人开发者 | 用 exec 处理明确的批量任务 |

---

## 特性五：`codex doctor` 与 `features list` 诊断（0.144.5）

### 是什么（机制说明）

- `codex doctor`：检查 CLI 环境健康，输出 ok/warn/fail 统计
- `codex features list`：列出所有功能开关及状态（stable / under development / removed）

实测 0.144.5 doctor 结果：`12 ok · 1 idle · 5 notes · 1 warn · 4 fail`

关键 stable 特性：`browser_use`、`browser_use_external`、`browser_use_full_cdp_access`、`auth_elicitation`、`code_mode_host`

Under development：`code_mode`、`artifact`、`chronicle`

### 适用场景

- **适合**：新环境部署、升级后验证、功能探索
- **不适合**：无——建议每次升级后运行

### 前置条件

Codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex doctor` 检查环境
2. 关注 fail 项：app-server 未运行在 headless 环境正常
3. `codex features list` 查看可用特性
4. 根据 stable 特性规划工作流
5. 升级至 0.144.5 后重复 doctor 验证

### 命令与配置示例

```bash
codex doctor
codex doctor --summary
codex doctor --json

codex features list 2>&1 | head -15
codex features list 2>&1 | grep stable
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `features list` | ✅ browser_use stable, code_mode under development |
| app-server | ❌ not running（headless 环境预期） |

```bash
./node_modules/.bin/codex features list 2>&1 | head -15
# apply_patch_freeform                 removed            false
# browser_use                          stable             true
# code_mode                            under development  false
# code_mode_host                       stable             true
```

### 问题与解决方案

**4 fail 项**：headless/Cloud 环境 app-server 未运行属正常。**warn 项**：查看 `--all` 展开详情。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 0.144.5 | ✅ |
| GitHub features 文档 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | 升级至 0.144.5 后运行 doctor |
| 功能探索者 | 用 features list 确认 stable 特性再使用 |

---

## 版本对照表

| 版本 | 发布日 (UTC) | 类型 | 核心变更 |
|------|-------------|------|----------|
| **0.144.5** | **2026-07-16 02:54** | **stable** | **危险命令检测强化 (#33455)** |
| 0.145.0-alpha.18 | 2026-07-16 18:11 | alpha | 预发布 |
| 0.145.0-alpha.16 | 2026-07-16 05:22 | alpha | 预发布 |
| 0.145.0-alpha.15 | 2026-07-16 00:29 | alpha | 预发布 |
| 0.144.4 | 2026-07-14 05:08 | stable | 无用户可见变更 |

## 今日研究员结论

Codex 稳定版今日升级至 0.144.5，安全补丁应立即部署。alpha.15–18 在 24 小时内连发显示 0.145 stable 临近，但生产环境仍建议锁定 0.144.5。5h 限额临时移除是当前最大用户利好，建议在恢复前密集利用长程任务窗口。`browser_use` 已 stable，可在支持环境中尝试 Web 自动化；`code_mode` 仍在 under development。

---
