# OpenAI Codex 每日技术文档 — 2026-07-05

> 本地实测版本：**0.142.5**（stable `@latest`）/ **0.143.0-alpha.36**（预发布，本地安装）｜监测源：[Codex Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 5 日 Codex 预发布线更新至 **0.143.0-alpha.36**（7/5 01:02Z），距 alpha.35 约 46 小时。npm `@openai/codex@latest` 仍指向稳定版 **0.142.5**（7/1 发布，WebSocket trace 修复）。本地实测 alpha.36 可安装运行，`features list` 显示 `code_mode_host` 为 under development 新旗标（stable 0.142.5 首 15 项无此条目）。GPT-5.6 Sol/Terra/Luna 仍处 limited preview，社区传闻 **7/7–9** 全面发布窗口倒计时 2 天——⚠️ 非官方确认。

---

## 特性一：预发布 0.143.0-alpha.36（2026-07-05 01:02Z）— 今日主更新

### 是什么（机制说明）

GitHub [rust-v0.143.0-alpha.36](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.36) 于 7/5 01:02Z 发布，标记 **Pre-release**。Release notes 仅写「Release 0.143.0-alpha.36」，无详细 changelog 条目（与 alpha.33–35 惯例一致）。npm 可安装 `@openai/codex@0.143.0-alpha.36`。相较 alpha.35，`features list` 首屏出现 **`code_mode_host`**（under development, false）。

### 适用场景

- **适合**：跟踪 Codex 0.143 分支的早期采用者、CI 金丝雀环境
- **不适合**：生产依赖、无回退计划的团队

### 前置条件

- 显式安装 `@openai/codex@0.143.0-alpha.36`
- 接受预发布不稳定
- 隔离环境（勿覆盖全局 stable）

### 详细使用步骤（业务用户）

1. `cd tools && npm install @openai/codex@0.143.0-alpha.36`
2. `./node_modules/.bin/codex --version` → `codex-cli 0.143.0-alpha.36`
3. `codex doctor` 检查环境
4. `codex features list` 对比 stable 差异
5. 问题回退：`npm install @openai/codex@0.142.5`

### 命令与配置示例

```bash
npm install @openai/codex@0.143.0-alpha.36
./node_modules/.bin/codex --version
# codex-cli 0.143.0-alpha.36

codex features list 2>&1 | grep code_mode
# code_mode                            under development  false
# code_mode_host                       under development  false
# code_mode_only                       under development  false
```

```toml
# ~/.codex/config.toml — alpha 测试时建议独立 profile
model = "gpt-5.3-codex"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| alpha.36 安装 | ✅ `codex-cli 0.143.0-alpha.36` |
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| `code_mode_host` 旗标 | ✅ under development false |
| 推理实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**alpha 与 stable 行为差异**：用 `codex features list` diff。**npm 缓存旧版**：`npm cache clean --force` 后重装。**误装 alpha 到生产**：`npm install @openai/codex@latest` 回退 0.142.5。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub alpha.36 7/5 01:02Z | ✅ |
| npm 可安装 | ✅ |
| 详细 changelog | ❌ 无条目 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人尝鲜 | 虚拟机测试 alpha.36 |
| 企业 | 等 stable 0.143 GA |

---

## 特性二：稳定版 0.142.5 WebSocket Trace 修复（2026-07-01）

### 是什么（机制说明）

0.142.5 为当前 **Latest** 稳定版，核心修复：**防止完整 Responses WebSocket 请求 payload 写入 trace 日志**（#30771），降低敏感数据泄露风险。相较 0.142.4「无用户可见变更」，本版为安全/运维向 patch。npm `@latest` 仍指向此版本。

### 适用场景

- **适合**：生产环境启用 trace/logging 的团队
- **不适合**：无 trace 需求的极简本地使用（仍建议保持最新 stable）

### 前置条件

- `npm install @openai/codex@latest` 或 `tools/` 本地安装
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
| `@latest` 版本 | ✅ `codex-cli 0.142.5` |
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| trace 修复验证 | ⚠️ 未实测完整 WS 会话 |

### 问题与解决方案

**doctor 4 fail**：常见为 app-server 未运行、认证缺失——非阻断 CLI 基础功能。**想试 alpha.36**：显式安装，勿用 `@latest`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Release 0.142.5 | ✅ #30771 |
| npm @latest | ✅ 0.142.5 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 锁定 0.142.5 stable |
| 尝鲜用户 | alpha.36 在独立环境测试 |

---

## 特性三：`codex features list` 功能旗标（alpha.36 vs stable 对比）

### 是什么（机制说明）

`codex features list` 列出 CLI 功能开关及状态（stable / under development / removed）。**0.142.5 stable** 实测：**apps、auto_compaction、browser_use** 等为 stable；**code_mode** 为 under development。**0.143.0-alpha.36** 首屏新增 **`code_mode_host`**（under development, false），暗示 Code mode 主机侧能力正在开发。

### 适用场景

- **适合**：排查「某功能为何不可用」、对比 alpha/stable 差异
- **不适合**：替代官方文档的完整能力说明

### 前置条件

- Codex CLI 已安装（指定版本）

### 详细使用步骤（业务用户）

1. `codex features list` 查看前 15 项
2. `codex features list --all` 展开截断列表
3. `codex features list --json` 机器可读输出
4. 升级前后 diff：`diff <(codex features list) <(./alpha/bin/codex features list)`

### 命令与配置示例

```bash
# stable 0.142.5
codex features list 2>&1 | head -15
# apps                                 stable             true
# auto_compaction                      stable             true
# browser_use                          stable             true
# code_mode                            under development  false

# alpha.36 额外条目
codex features list 2>&1 | grep code_mode
# code_mode_host                       under development  false
```

### 本地测试结果

| 功能 | stable 0.142.5 | alpha.36 |
|------|----------------|----------|
| browser_use | ✅ stable true | ✅ stable true |
| code_mode | ⚠️ under dev false | ⚠️ under dev false |
| code_mode_host | — 未出现 | ⚠️ under dev false |
| auto_compaction | ✅ stable true | 需 `--all` 确认 |

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
| Agent 开发者 | 关注 code_mode_host 转正时间 |

---

## 特性四：`codex exec` 非交互模式（稳定能力）

### 是什么（机制说明）

`codex exec` 在终端非交互执行 Codex 任务，适合 CI、脚本化代码生成。配合 `config.toml` 指定 model、sandbox、approval 策略。`/goal` 可设定长期目标（若 CLI 版本支持）。

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

## 特性五：GPT-5.6 Sol 预览与 Codex 集成（6/26 官方，7/5 窗口倒计时）

### 是什么（机制说明）

OpenAI 6/26 宣布 **GPT-5.6 Sol**（旗舰 $5/$30）、**Terra**（均衡 $2.50/$15，2× 便宜于 5.5）、**Luna**（快速 $1/$6）有限预览，经 API/Codex 向 trusted partners 开放。TechCrunch 报道美国政府要求限制首发范围。社区称 Codex App 源码出现 `gpt-5.6-sol/terra/luna` 及「速度拨盘」，传闻 **7/7–9** 全面发布——⚠️ 推测。alpha.36 一日一更节奏或为先导信号。

### 适用场景

- **适合**：等待 GPT-5.6 的 Codex 重度用户
- **不适合**：基于泄露日期做生产排期

### 前置条件

- trusted partner 资格（当前）或等待 GA
- Codex 最新 alpha 可能先行支持

### 详细使用步骤（业务用户）

1. 每日检查 [GitHub releases](https://github.com/openai/codex/releases)
2. `codex features list` 与 `config.toml` model 选项
3. 7/7 前后关注 OpenAI 官方博客与 ChatGPT 上线
4. 官方信息以 [openai.com/index/previewing-gpt-5-6-sol](https://openai.com/index/previewing-gpt-5-6-sol/) 为准

### 命令与配置示例

```toml
# 未来 GA 后可能支持（⚠️ 推测）
model = "gpt-5.6-terra"
```

```bash
codex features list 2>&1 | grep -i gpt
# 当前 stable/alpha 未必显示 5.6
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GPT-5.6 模型可用 | ❌ 本环境未开放 |
| alpha.36 发布 | ✅ 7/5 01:02Z |
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
| 0.143.0-alpha.36 | 7/5 | pre-release | **今日更新**；`code_mode_host` 旗标 |
| 0.143.0-alpha.35 | 7/3 | pre-release | — |
| 0.142.5 | 7/1 | **stable** | WS trace 修复 |
| 0.142.4 | 6/29 | stable | 无用户可见变更 |

## 今日研究员结论

Codex **7/5 有预发布更新**：alpha.36 显示 0.143 分支持续活跃，但 release notes 无详细说明，**生产仍推荐 0.142.5 stable**。最大变量是 **GPT-5.6 发布窗口**（官方「coming weeks」+ 社区 7/7 传闻）。建议：生产锁定 0.142.5；尝鲜者在隔离环境跟踪 alpha.36；用 `codex doctor` 定期体检；7/5 起每日检查 GitHub releases。

---
