# OpenAI Codex 每日技术文档 — 2026-06-19

> 本地实测版本：**codex-cli 0.141.0**｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

**2026 年 6 月 19 日**：npm 稳定通道仍为 **0.141.0**（6/18 发布）；GitHub 当日连发 **0.142.0-alpha.3 至 alpha.6** 四个预发布（最新 `rust-v0.142.0-alpha.6` @ 20:29 UTC），下一稳定版迭代活跃但未切换 Latest。App **26.616**（6/18）含 **Record & Replay** 与自动化历史批量操作。量子位 ALE 基准报道 **GPT 5.5+Codex** 在真场景通过率略胜 Fable 5+Claude Code。

---

## 特性一：CLI 0.141.0 稳定版（2026-06-18，今日仍为主通道）

### 是什么（机制说明）

0.141.0 为 `@openai/codex@latest` 对应版本。核心：

- **Noise relay**：远程 executor 认证、端到端加密通道
- **跨平台 cwd/shell**：PathUri 保留 executor 原生工作目录
- **插件 MCP**：按线程激活 stdio MCP；created-by-me marketplace
- **性能**：缓存 tool search、减少 history 拷贝；prompt image 缓存 64 MiB 上限
- **修复**：`codex exec` hook trust 持久化；Windows sandbox 凭证修复；SQLite WAL-reset

### 适用场景

- **适合**：远程执行、插件工具链、长时 tool-heavy 会话
- **不适合**：仅本地简单 exec 且不愿升级（仍建议 0.141.0）

### 前置条件

- Node.js + `npm install @openai/codex@latest`
- `codex login` 或 `OPENAI_API_KEY`

### 详细使用步骤（业务用户）

1. `cd /workspace/tools && npm install @openai/codex@latest`
2. `codex --version` → `codex-cli 0.141.0`
3. `codex doctor`
4. `codex features list`
5. 配置 `~/.codex/config.toml` 启用 browser/computer use

### 命令与配置示例

```bash
codex --version
codex doctor
codex features list | head -20
codex exec "run tests and fix failures"
```

```toml
# ~/.codex/config.toml
[features]
browser_use = true
computer_use = true
```

### 本地测试结果

```bash
./node_modules/.bin/codex --version
# codex-cli 0.141.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

| 项 | 结果 |
|----|------|
| 版本 | ✅ 0.141.0 |
| doctor | ✅ 12 ok · 4 fail（auth） |
| exec 推理 | ⚠️ 无 API Key |

### 问题与解决方案

**错误 1：doctor auth failed**

排查：`codex login`；4 fail 多为 auth/relay 未配置。

**错误 2：远程 cwd 错误**

排查：双方 ≥ 0.141.0。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub rust-v0.141.0 | ✅ |
| npm @latest 实测 | ✅ 0.141.0 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | pin 0.141.0 |
| 尝鲜 | 见特性二 alpha |

---

## 特性二：0.142.0-alpha 预发布线（2026-06-19 活跃）

### 是什么（机制说明）

6/19 GitHub Releases 发布 **alpha.3、alpha.4、alpha.5、alpha.6**（Pre-release），显示 0.142.0 稳定版临近。alpha 版可能含未文档化 API 变更；**npm latest 仍指向 0.141.0**。

### 适用场景

- **适合**：隔离环境尝鲜、贡献者测试
- **不适合**：生产 CI/CD

### 前置条件

- 明确接受 pre-release 风险

### 详细使用步骤（业务用户）

1. 隔离目录：`mkdir codex-alpha && cd codex-alpha`
2. `npm install @openai/codex@0.142.0-alpha.6`
3. `npx codex --version`
4. 对比 `codex doctor` 与 0.141.0 差异
5. 勿与生产 `~/.codex` 配置混用

### 命令与配置示例

```bash
npm install @openai/codex@0.142.0-alpha.6
npx codex --version
# 预期：codex-cli 0.142.0-alpha.6 或类似
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本环境 @latest | ✅ 0.141.0（未装 alpha） |
| GitHub alpha.6 | ✅ 2026-06-19T20:29Z 存在 |

### 问题与解决方案

**错误 1：alpha 与 stable 配置冲突**

排查：分离 `CODEX_HOME` 或容器隔离。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Pre-release | ✅ 官方 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多数用户 | 等 0.142.0 stable |
| 早期采用者 | alpha.6 冒烟测试 |

---

## 特性三：App 26.616 Record & Replay（2026-06-18）

### 是什么（机制说明）

macOS App **26.616** 新增 **Record & Replay**：演示工作流→可复用 **Skill**。需 **Computer Use** 开启；**EEA/UK/CH 除外**。另：自动化运行历史支持批量 mark read / archive。

### 适用场景

- **适合**：重复性 UI 操作 SOP、团队 onboarding
- **不适合**：欧盟经济区用户（官方排除）

### 前置条件

- Codex App ≥ 26.616
- macOS + Computer Use 权限

### 详细使用步骤（业务用户）

1. 更新 Codex App 至 26.616+
2. Settings → 启用 Computer Use
3. Record 一次完整工作流演示
4. Replay 生成 Skill 并命名
5. 在后续线程调用该 Skill

### 命令与配置示例

```
# App 内 slash command（概念）
/record start
# 完成操作后
/replay save-as-skill "deploy-staging"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Record & Replay | ⚠️ 未实测（无 macOS GUI） |
| Changelog | ✅ 6/18 官方 |

### 问题与解决方案

**错误 1：EEA 地区不可用**

排查：官方区域限制；用 CLI Skills 手工编写替代。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| macOS 团队 | 录屏→Skill 降培训成本 |
| 欧盟 | 等待政策更新或 CLI 方案 |

---

## 特性四：`codex doctor` 与 `features list` 运维门禁

### 是什么（机制说明）

`codex doctor` 检查 auth、relay、app-server、沙箱等子系统；`codex features list` 列出功能开关及 stable/under development 状态。本日实测：**browser_use**、**computer_use** 为 stable true。

### 适用场景

- **适合**：CI 安装验证、升级后冒烟、排查 auth
- **不适合**：替代功能测试（doctor 不跑推理）

### 前置条件

- 已安装 codex CLI

### 详细使用步骤（业务用户）

1. 每次升级后跑 `codex doctor`
2. 解析 summary：`12 ok · 1 warn · 4 fail`
3. `codex features list` 确认所需 feature stable
4. auth fail 时 `codex login`
5. CI 加：`codex doctor --json`（若支持）作门禁

### 命令与配置示例

```bash
codex doctor 2>&1 | tail -10
codex features list 2>&1 | grep -E 'browser|computer|apps'
```

### 本地测试结果

```
apply_patch_freeform                 removed            false
browser_use                          stable             true
computer_use                         stable             true
apps                                 stable             true
chronicle                            under development  false
code_mode                            under development  false
```

| 项 | 结果 |
|----|------|
| doctor | ✅ 12 ok · 4 fail（auth） |
| features | ✅ stable 功能可依赖 |

### 问题与解决方案

**错误 1：app-server not running**

排查：ephemeral 模式正常；需 daemon 时 `codex app-server` 文档。

**错误 2：features list exit 101**

排查：head 截断不影响；全量 list 可能较长。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 官方 CLI docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | 升级流水线加 doctor 步骤 |
| 开发 | 关注 code_mode under development |

---

## 特性五：ALE 基准中的 Codex 框架表现（媒体报道）

### 是什么（机制说明）

UC Berkeley **ALE** 基准测试 Agent 在 NX/Unreal/AE 等真工具链中的任务完成率。**GPT 5.5 + Codex 框架**  reported **24.0%** 通过率，排名第一；成本约 **566 美元** 跑完全部任务，低于 Fable 5 的 ~2315 美元（量子位 secondary 报道）。

### 适用场景

- **适合**：评估「真干活」能力而非 SWE-Bench 分数
- **不适合**：作为唯一选型依据（通过率仍仅 24%）

### 前置条件

- 理解 ALE 与 SWE-Bench 评测维度差异

### 详细使用步骤（业务用户）

1. 阅读 ALE 论文/官方结果（⚠️ 待交叉验证 primary）
2. 对照自家工具链是否在 ALE 覆盖范围
3. 小范围 POC：Codex + 你的专业软件
4. 记录 token 成本与通过率
5. 与 Claude Code 组合对比

### 命令与配置示例

```bash
# 概念：长程 Codex 任务
codex exec --goal "Complete CAD export task in NX" 
# 实际需 App/CLI 与工具集成，非单行命令
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| ALE 实测 | ⚠️ 未跑（无 Key + 无 NX 许可） |
| 媒体报道 | ✅ 量子位 6 月 |

### 问题与解决方案

**错误 1：SWE-Bench 高但 ALE 低**

排查：正常——基准维度不同；勿过度外推。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 量子位 | secondary |
| Berkeley primary | ⚠️ 待独立验证 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 架构师 | ALE 类评测纳入 POC 清单 |
| Codex 用户 | 关注成本效率叙事 |

---

## 版本对照表

| 版本 | 日期 | 通道 |
|------|------|------|
| 0.142.0-alpha.6 | 2026-06-19 | Pre-release |
| 0.141.0 | 2026-06-18 | **Latest stable** |
| App 26.616 | 2026-06-18 | macOS Record & Replay |

## 今日研究员结论

**生产继续 0.141.0**；**0.142.0-alpha.6** 预示近期 stable 发布，升级前跑 `codex doctor`。ALE 报道强化 Codex「真场景 + 成本效率」叙事，但 24% 通过率提醒：Agent 编程仍处早期——Harness 与人工验收不可或缺。
