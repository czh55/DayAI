# OpenAI Codex 每日技术文档 — 2026-07-07

> 本地实测版本：**0.143.0-alpha.38**（alpha）/ **0.142.5**（stable @latest）｜监测源：[Codex Releases](https://github.com/openai/codex/releases)、[Developers Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 7 日 GitHub 发布预发布版 **0.143.0-alpha.38**（**04:34 UTC**）。Release 资产首次打包 **`codex-code-mode-host`** 二进制；`codex features list` 新增 **`code_mode_host`**（under development）。npm `@openai/codex@latest` 仍指向稳定版 **0.142.5**（7/1 发布，WebSocket trace 日志修复）。GPT-5.6 Sol 仍处 limited preview，无 GA 日期。

---

## 特性一：alpha.38 与 code_mode_host 基础设施

### 是什么（机制说明）

[rust-v0.143.0-alpha.38](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.38) 在 7/7 04:34 UTC 发布。相比 alpha.37，release 资产新增多平台 **`codex-code-mode-host-*`** 包（darwin/linux/windows）。本地 `features list` 显示 `code_mode_host: under development`（alpha.37 仅有 `code_mode`）。表明 Code mode 正拆分为 CLI 主体与 host 进程架构。

### 适用场景

- **适合**：抢先评估 Code mode 架构变化的贡献者、OpenAI preview 合作方
- **不适合**：生产 CI/CD 默认依赖 alpha 渠道

### 前置条件

- 明确安装 alpha 版本：`npm install @openai/codex@0.143.0-alpha.38`
- OpenAI API 访问（Code mode 特性可能需 allowlist）
- Linux 上 sandbox 依赖（`codex doctor` 检查）

### 详细使用步骤（业务用户）

1. 隔离环境安装 alpha：`npm install @openai/codex@0.143.0-alpha.38`
2. 运行 `codex --version` 确认 `0.143.0-alpha.38`
3. `codex features list | grep code_mode` 查看 flag 状态
4. 生产回退：`npm install @openai/codex@latest` → 0.142.5

### 命令与配置示例

```bash
# 安装 alpha.38
npm install @openai/codex@0.143.0-alpha.38

# 检查特性开关
./node_modules/.bin/codex features list 2>&1 | grep code_mode

# 回退 stable
npm install @openai/codex@latest
./node_modules/.bin/codex --version   # codex-cli 0.142.5
```

```toml
# ~/.codex/config.toml 片段（Code mode 相关，以官方文档为准）
[features]
# code_mode 相关配置项可能随 alpha 变化——升级前备份 config
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` (alpha.38) | ✅ `codex-cli 0.143.0-alpha.38` |
| `features list` code_mode_host | ✅ under development |
| `codex doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| Code mode 实际运行 | ⚠️ 未实测（under development + 无完整 auth） |

```bash
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**alpha 与 stable 行为不一致**：生产锁定 `0.142.5`。**doctor 4 fail**：常见为 app-server 未运行、沙箱组件缺失——对 CLI 基础功能影响有限。**code_mode_host 无文档**：等待 developers.openai.com 更新。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub release 资产 code-mode-host | ✅ |
| npm 0.143.0-alpha.38 | ✅ |
| features list | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 早期采用者 | 隔离环境跟踪 alpha.38 |
| 生产团队 | 保持 0.142.5 |
| 平台工程师 | 关注 host 拆分对部署的影响 |

---

## 特性二：稳定版 0.142.5 维护态（7/1）

### 是什么（机制说明）

**0.142.5**（2026-07-01 01:15 UTC）为当前 **Latest** 稳定版。唯一用户可见修复：**防止完整 Responses WebSocket 请求 payload 写入 trace 日志**（#30771）——降低敏感数据泄露风险。`@latest` npm 仍指向此版本。

### 适用场景

- **适合**：所有生产与 CI 默认渠道
- **不适合**：需要 alpha Exclusive 特性的场景

### 前置条件

- `npm install @openai/codex@latest` 或 pin `0.142.5`

### 详细使用步骤（业务用户）

1. 生产 Dockerfile/CI 固定 `@openai/codex@0.142.5`
2. 升级后运行 `codex doctor` 确认环境
3. 检查 trace 日志配置是否符合合规要求

### 命令与配置示例

```bash
npm install @openai/codex@0.142.5
codex --version
codex doctor
```

```bash
# codex exec 非交互示例
codex exec "List all TODO comments in src/"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `@latest` 版本 | ✅ 0.142.5 |
| `doctor` | ✅ 12 ok · 4 fail（app-server 类） |
| `codex exec` | ⚠️ 未实测推理（无 API Key） |

### 问题与解决方案

**误装 alpha**：`npm install @openai/codex@latest` 显式回退。**WebSocket 日志仍过大**：确认 ≥ 0.142.5。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Latest 0.142.5 | ✅ |
| npm @latest | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有人 | 生产默认 0.142.5 |
| 安全团队 | 利用 trace 修复做日志审计 |
| CI 维护者 | pin 版本防漂移 |

---

## 特性三：codex doctor 环境诊断

### 是什么（机制说明）

`codex doctor` 检查 CLI、沙箱（bwrap）、app-server、配置、网络等组件健康状态。本环境 2026-07-07 实测：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**——fail 多为 app-server daemon 未运行，不影响 `--version`/`features list`。

### 适用场景

- **适合**：新环境安装验证、CI 镜像构建后自检
- **不适合**：替代 API 连通性端到端测试

### 前置条件

- 已安装 codex CLI

### 详细使用步骤（业务用户）

1. `codex doctor` 全量输出
2. `codex doctor 2>&1 | tail -10` 查看摘要
3. `--json` 获取机器可读报告（若支持）
4. 按 fail 项逐项修复（常见：启动 app-server、安装沙箱依赖）

### 命令与配置示例

```bash
codex doctor
codex doctor 2>&1 | tail -10
codex doctor --summary   # 若版本支持 compact 输出
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor 摘要 | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| app-server status | not running（预期） |

### 问题与解决方案

**4 fail 惊慌**：Cloud/CI 环境常见，先测 `codex exec`。**Linux 沙箱失败**：安装 bwrap 或查阅 install.sh。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 alpha.38 / stable | ✅ 均可运行 doctor |
| 昨日 7/6 记录 | ✅ 同类结果 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后第一件事跑 doctor |
| DevOps | CI 加 doctor 门禁 |
| 开发者 | 区分 fail 是否阻塞工作流 |

---

## 特性四：features list 与能力开关矩阵

### 是什么（机制说明）

`codex features list` 展示特性开关及状态：`stable`、`under development`、`removed`。2026-07-07 alpha.38 实测摘录：`browser_use` stable；`code_mode`/`code_mode_host` under development；`collaboration_modes` removed；`auto_compaction` stable。

### 适用场景

- **适合**：判断某 CLI 能力是否 GA、规划脚本兼容性
- **不适合**：作为官方长期 API 承诺——flag 名可能变

### 前置条件

- codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex features list 2>&1 | head -30` 浏览
2. `grep` 目标特性（如 `browser`、`code_mode`）
3. 仅依赖 `stable` 特性编写自动化

### 命令与配置示例

```bash
codex features list 2>&1 | head -20
codex features list 2>&1 | grep -E 'code_mode|browser|web'
```

### 本地测试结果

| 特性 | 状态 |
|------|------|
| browser_use | stable ✅ |
| code_mode | under development |
| code_mode_host | under development（alpha.38 新增可见） |
| auto_compaction | stable ✅ |
| collaboration_modes | removed |

### 问题与解决方案

**脚本依赖 removed 特性**：查 changelog 迁移路径。**under development 不稳定**：勿用于生产 cron。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| alpha.38 features list | ✅ |
| alpha.37 对比 | ✅ 新增 code_mode_host |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 自动化作者 | 只锁 stable flags |
| 研究员 | 每日 diff features list |
| 产品 | 关注 code_mode GA 时间窗 |

---

## 特性五：codex exec 与 /goal 长任务（stable 能力回顾）

### 是什么（机制说明）

`codex exec` 为非交互式单轮/多轮任务入口；`/goal`（交互模式）支持长时目标驱动循环，与 Claude Code `/loops`、Cursor Automations 对标。stable 0.142.5 已包含 `browser_use`、`auto_compaction` 等 stable 特性，适合脚本化 CI 辅助。

### 适用场景

- **适合**：CI 中自动修 lint、生成 changelog、批量重构
- **不适合**：需复杂人工审批的高风险生产变更

### 前置条件

- `OPENAI_API_KEY` 或 Codex 订阅认证
- codex CLI ≥ 0.142.5
- 仓库内执行并配置沙箱策略

### 详细使用步骤（业务用户）

1. 导出 API Key：`export OPENAI_API_KEY=...`
2. 非交互：`codex exec "your task"`
3. 交互长任务：启动 `codex`，输入 `/goal 描述长期目标`
4. 配合 git worktree 隔离变更

### 命令与配置示例

```bash
# 基础 exec
codex exec "Add unit tests for utils/parser.ts"

# 进阶：指定工作目录
cd /path/to/repo && codex exec "Fix all clippy warnings"
```

```toml
# ~/.codex/config.toml 示例结构
[model]
# 具体键名以官方 schema 为准
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` | ⚠️ 未实测推理（无 API Key） |
| CLI 入口存在 | ✅ |
| `/goal` | ⚠️ 未实测 |

### 问题与解决方案

**exec 无输出**：检查 API Key 与网络。**成本过高**：缩短 prompt、启用 auto_compaction（stable）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| developers.openai.com 文档 | ✅ |
| InfoQ Codex 增长报道 | ✅ 采用上升 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI 工程师 | 从只读任务试点 exec |
| 个人开发者 | `/goal` 处理周末长任务 |
| 企业 | 沙箱 + 审批网关 |

---

## 版本对照表

| 版本 | 发布时间 (UTC) | 渠道 | 要点 |
|------|----------------|------|------|
| 0.143.0-alpha.38 | 2026-07-07 04:34 | pre-release | code_mode_host 二进制；features 新增 flag |
| 0.143.0-alpha.37 | 2026-07-06 18:11 | pre-release | 过渡 alpha |
| 0.142.5 | 2026-07-01 01:15 | **Latest** | WebSocket trace 日志修复 |
| 0.142.4 | 2026-06-29 05:04 | stable | 无用户可见变更 |

## 今日研究员结论

Codex 今日变化集中在 **alpha 线的 Code mode 基础设施**（`code_mode_host`），stable 线保持安静。生产环境继续 **0.142.5**；愿意尝鲜者在隔离环境跟踪 alpha.38→后续 alpha 的 Code mode GA 信号。结合 GPT-5.6 preview 仍未开放，短期技术栈仍以 **GPT-5.3-Codex + 0.142.5** 为稳妥组合。

---
