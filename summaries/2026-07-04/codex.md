# OpenAI Codex 每日技术文档 — 2026-07-04

> 本地实测版本：**0.142.5**（stable）｜监测源：[Codex Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 4 日 npm `@openai/codex@latest` 实测稳定版 **0.142.5**（7/1 发布，WebSocket trace 修复）。预发布线最新为 **0.143.0-alpha.35**（7/3 02:33Z），**7/4 无新 release**。社区传闻 Codex App 源码泄露 **GPT-5.6 Sol/Terra/Luna** 及 7/7–9 发布窗口——⚠️ 非 OpenAI 官方确认。OpenAI 6/26 已官方预览 GPT-5.6 Sol 系列，当前限 trusted partners。

---

## 特性一：稳定版 0.142.5 WebSocket Trace 修复（2026-07-01）

### 是什么（机制说明）

0.142.5 为当前 **Latest** 稳定版，核心修复：**防止完整 Responses WebSocket 请求 payload 写入 trace 日志**（#30771），降低敏感数据泄露风险。相较 0.142.4「无用户可见变更」，本版为安全/运维向 patch。

### 适用场景

- **适合**：生产环境启用 trace/logging 的团队
- **不适合**：无 trace 需求的极简本地使用（仍建议保持最新 stable）

### 前置条件

- `npm install -g @openai/codex@latest` 或 `tools/` 本地安装
- OpenAI/Codex 认证配置

### 详细使用步骤（业务用户）

1. `cd tools && npm install @openai/codex@latest`
2. `./node_modules/.bin/codex --version` → `codex-cli 0.142.5`
3. 若启用 trace：确认升级后日志不再含完整 WS payload
4. `codex doctor` 检查环境

### 命令与配置示例

```bash
codex --version
# codex-cli 0.142.5

codex doctor
codex doctor --json
```

```toml
# ~/.codex/config.toml
[log]
level = "info"
# 0.142.5 起 WS payload 不再完整写入 trace
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `codex-cli 0.142.5` |
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| trace 修复验证 | ⚠️ 未实测完整 WS 会话 |

### 问题与解决方案

**doctor 4 fail**：常见为 app-server 未运行、认证缺失——非阻断 CLI 基础功能。**想试 alpha.35**：`npm install @openai/codex@0.143.0-alpha.35`（预发布，生产慎用）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Release 0.142.5 | ✅ #30771 |
| npm @latest | ✅ 0.142.5 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 锁定 0.142.5 stable |
| 尝鲜用户 | alpha.35 在独立环境测试 |

---

## 特性二：预发布线 0.143.0-alpha.35（2026-07-03）

### 是什么（机制说明）

alpha.35 于 7/3 02:33Z 发布，GitHub 标记 **Pre-release**。7/2–7/3 连续发布 alpha.33/34/35，显示 0.143 分支活跃开发。release notes 多为「Release 0.143.0-alpha.35」无详细 changelog 条目（与近期 alpha 惯例一致）。

### 适用场景

- **适合**：跟踪 Codex 新特性的早期采用者
- **不适合**：生产 CI 依赖

### 前置条件

- 显式安装 `@openai/codex@0.143.0-alpha.35`
- 接受预发布不稳定

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@0.143.0-alpha.35`
2. `codex --version` 确认 alpha 版本
3. `codex features list` 对比 stable 功能旗标
4. 问题回退：`npm install @openai/codex@0.142.5`

### 命令与配置示例

```bash
npm install @openai/codex@0.143.0-alpha.35
./node_modules/.bin/codex --version
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| alpha.35 安装 | ⚠️ 本日实测使用 @latest=0.142.5 |
| features list (stable) | ✅ 见下方特性三 |

### 问题与解决方案

**alpha 与 stable 行为差异**：用 `codex features list` 对比。**npm 缓存旧版**：`npm cache clean --force` 后重装。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub alpha.35 7/3 | ✅ |
| npm 包 | ✅ 可安装 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人尝鲜 | alpha.35 虚拟机测试 |
| 企业 | 等 stable 0.143 |

---

## 特性三：`codex features list` 功能旗标（实测 0.142.5）

### 是什么（机制说明）

`codex features list` 列出 CLI 功能开关及状态（stable / under development / removed）。0.142.5 实测：**apps、auto_compaction、browser_use** 等为 stable；**code_mode、chronicle、artifact** 为 under development；**collaboration_modes** 标记 removed。

### 适用场景

- **适合**：排查「某功能为何不可用」
- **不适合**：替代官方文档的完整能力说明

### 前置条件

- Codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex features list` 查看前 15 项
2. `codex features list --all` 展开截断列表
3. `codex features list --json` 机器可读输出
4. 对照 [Codex Features 文档](https://developers.openai.com/codex/cli/features)

### 命令与配置示例

```bash
codex features list 2>&1 | head -15
# apply_patch_freeform                 removed            false
# apps                                 stable             true
# auto_compaction                      stable             true
# browser_use                          stable             true
# code_mode                            under development  false

codex features list --json
```

### 本地测试结果

| 功能 | 状态 |
|------|------|
| browser_use | ✅ stable true |
| code_mode | ⚠️ under development false |
| auto_compaction | ✅ stable true |
| collaboration_modes | removed true |

### 问题与解决方案

**code_mode 不可用**：仍为 under development，等待后续 alpha/stable。**browser_use 失败**：`codex doctor` 检查 sandbox。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 features list | ✅ |
| developers.openai.com | ✅ 文档对应 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 调试者 | 升级前后 diff features list |
| Agent 开发者 | 关注 code_mode 转正时间 |

---

## 特性四：`codex exec` 非交互模式（稳定能力）

### 是什么（机制说明）

`codex exec` 在终端非交互执行 Codex 任务，适合 CI、脚本化代码生成。配合 `config.toml` 指定 model、sandbox、approval 策略。

### 适用场景

- **适合**：CI 自动修复、batch 代码审查
- **不适合**：需多轮人机协作的复杂设计

### 前置条件

- Codex CLI + API 认证
- 项目 `config.toml` 或 `~/.codex/config.toml`

### 详细使用步骤（业务用户）

1. 项目根创建或编辑 `config.toml`
2. `codex exec "fix lint errors in src/"` 
3. 检查 diff 与退出码
4. CI 中：`codex exec --full-auto`（若策略允许）

### 命令与配置示例

```bash
codex exec "Add unit tests for utils/parser.ts"
codex exec --help
```

```toml
# config.toml
model = "gpt-5.3-codex"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` | ⚠️ 未实测推理（无 API Key） |
| `--help` | ✅ 可显示 |

### 问题与解决方案

**认证失败**：`codex login` 或设置 `OPENAI_API_KEY`。**sandbox 拒绝写入**：调整 `sandbox_mode`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex CLI 文档 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 集成 exec + doctor |
| 个人 | 交互 `codex` 更灵活 |

---

## 特性五：GPT-5.6 Sol 预览与 Codex 集成（6/26 官方，7/4 传闻发酵）

### 是什么（机制说明）

OpenAI 6/26 宣布 **GPT-5.6 Sol**（旗舰）、**Terra**（均衡 2× 便宜于 5.5）、**Luna**（快速低价）有限预览，经 API/Codex 向 trusted partners 开放。TechCrunch 报道美国政府要求限制首发范围。7/2–7/4 社区称 Codex App 源码出现 `gpt-5.6-sol/terra/luna` 及「速度拨盘」，传闻 **7/7–9** 全面发布——⚠️ 推测。

### 适用场景

- **适合**：等待 GPT-5.6 的 Codex 重度用户
- **不适合**：基于泄露日期做生产排期

### 前置条件

- trusted partner 资格（当前）或等待 GA
- Codex 最新 alpha 可能先行支持

### 详细使用步骤（业务用户）

1. 关注 `codex features list` 与 `config.toml` model 选项
2. 7/7 前后检查 `codex --version` 与 release notes
3. 若有 rate limit reset credits，社区称 **7/12 前** 可能过期——尽早使用
4. 官方信息以 [openai.com/index/previewing-gpt-5-6-sol](https://openai.com/index/previewing-gpt-5-6-sol/) 为准

### 命令与配置示例

```toml
# 未来 GA 后可能支持（⚠️ 推测）
model = "gpt-5.6-terra"
```

```bash
codex features list 2>&1 | grep -i gpt
# 当前 stable 0.142.5 未必显示 5.6
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GPT-5.6 模型可用 | ❌ 本环境未开放 |
| 传闻验证 | ⚠️ 非官方 |

### 问题与解决方案

**无法访问 5.6**：等待 GA 或申请 partner。**与 Fable 5 选型**：7/7 Anthropic 额度截止或加剧竞争。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| OpenAI 6/26 博客 | ✅ 三款模型预览 |
| 7/7 定档泄露 | ⚠️ 未官方确认 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Codex 用户 | 7/5–7/9 紧盯 releases |
| 成本敏感者 | Terra/Luna 定价或优于 Fable 5 |

---

## 版本对照表

| 版本 | 日期 | 通道 | 要点 |
|------|------|------|------|
| 0.143.0-alpha.35 | 7/3 | pre-release | 最新 alpha，无详细 notes |
| 0.143.0-alpha.34 | 7/2 | pre-release | — |
| 0.142.5 | 7/1 | **stable** | WS trace 修复 |
| 0.142.4 | 6/29 | stable | 无用户可见变更 |

## 今日研究员结论

Codex 7/4 **无新版本**，stable **0.142.5** 仍为生产推荐。alpha.35 显示 0.143 分支活跃但不宜生产。最大变量是 **GPT-5.6 发布窗口**（官方「coming weeks」+ 社区 7/7 传闻）。建议：保持 0.142.5；用 `codex doctor` 定期体检；7/5 起每日检查 GitHub releases。

---
