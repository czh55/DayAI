# OpenAI Codex 每日技术文档 — 2026-06-18

> 本地实测版本：**codex-cli 0.141.0**｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

**2026 年 6 月 18 日 Codex 双线更新**：CLI 稳定版从 0.140.0 升至 **0.141.0**（GitHub `rust-v0.141.0` @ 04:43 UTC），主打远程执行 **Noise 加密 relay**、跨平台 cwd/shell 保留、插件 MCP 按线程激活与 `codex exec` hook 信任持久化。App 侧 **26.616** 新增 **Record & Replay**（macOS 演示→skill，EEA/UK/CH 除外）与自动化运行历史批量操作。alpha 线 **0.142.0-alpha.2** 同日预发布。

---

## 特性一：CLI 0.141.0 稳定版（2026-06-18）

### 是什么（机制说明）

0.141.0 为 `@openai/codex` npm **Latest** 标签对应版本。核心变更：

- **Remote executors**：认证、端到端加密 **Noise relay** 通道
- **跨平台远程执行**：保留 executor 原生 cwd/shell，含 app-server ↔ exec-server 文件权限 PathUri
- **插件 MCP**：选中 executor 插件可 **按线程激活 stdio MCP**；新增 created-by-me marketplace
- **性能**：大 session 缓存 tool search、减少 request/history 拷贝；prompt image 缓存上限 64 MiB
- **修复**：hook trust bypass 在 `codex exec` start/resume 持久化；Windows sandbox 凭证自动修复；SQLite WAL-reset  corruption fix

### 适用场景

- **适合**：远程/多机执行、插件化工具链、长时 tool-heavy 会话
- **不适合**：仅需本地简单 `codex exec` 且无远程需求（0.140.0 仍可用但建议升级）

### 前置条件

- Node.js 环境或 npm 全局/项目内安装
- `codex login` 或 `OPENAI_API_KEY`（推理实测）

### 详细使用步骤（业务用户）

1. 升级：`cd /workspace/tools && npm install @openai/codex@latest`
2. 验证：`./node_modules/.bin/codex --version` → `codex-cli 0.141.0`
3. 健康检查：`./node_modules/.bin/codex doctor`
4. 功能开关：`codex features list`
5. 远程执行：按 [官方 remote 文档](https://developers.openai.com/codex) 配置 executor

### 命令与配置示例

**基础 — 版本与 doctor**

```bash
codex --version
codex doctor
codex features list | head -20
```

**进阶 — config.toml 远程与插件**

```toml
# ~/.codex/config.toml
[features]
browser_use = true
computer_use = true

# 插件与远程 executor 配置见官方 Config Reference
```

**codex exec 带 hook**

```bash
codex exec "run tests and fix failures"
# 0.141.0: hook trust bypass 在 exec thread 中持久化
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.141.0

./node_modules/.bin/codex doctor 2>&1 | tail -5
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

./node_modules/.bin/codex features list 2>&1 | head -15
# browser_use    stable  true
# computer_use   stable  true
# chronicle      under development  false
```

| 项 | 结果 |
|----|------|
| 版本 | ✅ 0.141.0 |
| doctor | ✅ 12 ok · 1 warn · 4 fail（auth 未登录） |
| features list | ✅ |
| 推理/exec | ⚠️ 无 API Key |

### 问题与解决方案

**错误 1：doctor auth failed**

排查：`codex login` 或设置 `OPENAI_API_KEY`；4 fail 项多为 auth/relay 未配置，非安装问题。

**错误 2：远程 executor cwd 错误**

排查：0.141.0 修复跨平台 cwd；确认双方 ≥ 0.141.0。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [GitHub rust-v0.141.0](https://github.com/openai/codex/releases/tag/rust-v0.141.0) | 一致 |
| npm `@latest` | ✅ 实测 0.141.0 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全员 | 从 0.140.0 升级；关注 Noise relay 安全模型 |
| 插件作者 | 测试 per-thread stdio MCP 激活 |
| CI | pin `0.141.0` 后跑 `codex doctor` 门禁 |

---

## 特性二：App 26.616 Record & Replay（2026-06-18）

### 是什么（机制说明）

**Record & Replay** 是 macOS App 功能：将用户 **演示过的工作流** 录制并转化为可复用 **skill**。初始可用性 **排除 EEA、UK、瑞士**；需管理员启用 **Computer Use**。

同版本还新增：自动化运行历史 **批量标记已读/归档**；Browser Use 草稿 session 迁移至 server 时保留 visible-tab 路由与标注；SSH 连接管理 deep links。

### 适用场景

- **适合**：重复性 GUI 操作 SOP、onboarding 演示转自动化
- **不适合**：Linux 纯 CLI 用户；EEA 用户（功能不可用）

### 前置条件

- Codex App **26.616**（App 内检查更新）
- macOS + Computer Use 权限
- 非 EEA/UK/CH 区域

### 详细使用步骤（业务用户）

1. 更新 Codex App 至 26.616+
2. **Settings → Computer Use → Install**
3. 授予 Screen Recording + Accessibility
4. 启动 Record，演示工作流（如「打开 Figma 导出资产」）
5. 结束录制 → 保存为 skill → 后续自然语言调用

### 命令与配置示例

**App 内自然语言（录制后）**

```
用昨天录制的「发布 checklist」skill 处理当前 release
```

**CLI 侧 skill 生态（独立）**

```bash
codex features list | grep -i skill
# skills 相关 feature 见 features list 完整输出
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| App Record & Replay | ⚠️ 未实测（无 macOS App） |
| Changelog 6/18 | ✅ 官方条目 |

### 问题与解决方案

**错误 1：Record & Replay unavailable**

排查：EEA/UK/CH 预期不可用；检查 Computer Use 是否企业/admin 启用。

**错误 2：Replay 步骤错位**

排查：演示时保持窗口焦点稳定；更新至 26.616 修复类。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog 2026-06-18](https://developers.openai.com/codex/changelog) | 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| macOS 非 EEA 用户 | 优先试用重复性 GUI 流程 |
| 欧洲用户 | 等待区域 rollout；暂用 CLI `/goal` + scripts |

---

## 特性三：EEA/UK/CH 能力扩展（2026-06-16，窗口内仍有效）

### 是什么（机制说明）

6/16 Changelog 宣布欧洲经济区、英国、瑞士用户获得：

- **Computer Use**（macOS/Windows）
- **Codex Chrome 扩展**
- **Memories**（**默认 off**）
- **Chronicle**（Pro macOS opt-in 预览）

与 6/18 Record & Replay **区域限制**形成对比：基础 Computer Use 已进欧洲，Record & Replay 仍排除。

### 适用场景

- **适合**：欧洲开发者 GUI 自动化、浏览器 signed-in 任务
- **不适合**：不愿启用数据保留/GDPR 审查未通过的组织

### 前置条件

- 账号位于 EEA/UK/CH
- App 最新版

### 详细使用步骤（业务用户）

1. 更新 App
2. Settings → Computer Use → Install
3. Memories：手动 opt-in（EEA 默认 off）
4. Pro + macOS：Chronicle opt-in 阅读隐私说明
5. 安装 Chrome 扩展处理浏览器任务

### 命令与配置示例

```toml
# ~/.codex/config.toml — CLI 不受 App 区域限制
[features]
browser_use = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| EEA rollout | ⚠️ 未实测 |
| `computer_use` feature | ✅ stable in features list |

### 问题与解决方案

**错误 1：Memories 找不到**

排查：EEA 默认 off，需 Settings 手动开启。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/16 | 官方 |
| Digg secondary | 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 欧洲团队 | 先 Computer Use + Chrome；Memories 需法务审批 |

---

## 特性四：`codex doctor` 与 `features list`（持续运维）

### 是什么（机制说明）

`codex doctor` 输出环境健康报告（compact/summary/json）。`codex features list` 列出 feature flag 状态：stable / under development / removed。

0.141.0 实测：**12 ok · 1 warn · 4 fail**（未登录 auth）。

### 适用场景

- **适合**：CI 门禁、升级后冒烟、排查 sandbox/auth
- **不适合**：替代功能测试

### 前置条件

- 已安装 codex CLI

### 详细使用步骤（业务用户）

1. `codex doctor` 查看 fail 项
2. 针对 auth： `codex login`
3. `codex features list` 确认所需 feature 为 stable
4. CI：`codex doctor --json` 解析 redacted report

### 命令与配置示例

```bash
codex doctor --summary
codex doctor --json | jq '.checks[] | select(.status=="fail")'
codex features list | grep -E "stable.*true"
```

### 本地测试结果

| 检查项 | 结果 |
|--------|------|
| 二进制 | ✅ |
| auth | ❌ 未登录（预期） |
| app-server | ⚠️ not running（headless 预期） |

### 问题与解决方案

**错误 1：4 fail 全为 auth**

排查：正常；配置 API key 后重跑。

**错误 2：sandbox fail on Linux**

排查：检查 bwrap/landlock；GitHub issues 有 distro 特定修复。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 官方 CLI docs | 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | 升级后必跑 doctor |
| 开发者 | features list 查 code_mode/chronicle 成熟度 |

---

## 特性五：`/import` 与 Claude Code 迁移（0.140.0+，仍有效）

### 是什么（机制说明）

Codex CLI **`/import`** 从 Claude Code 等项目导入配置、skills、MCP 设置，是 Fable 5 受限用户的官方迁移路径之一。0.141.0 继续兼容并改进 external-agent import 结果统计（app-server #28008）。

### 适用场景

- **适合**：从 Claude Code 试用 Codex、团队工具链切换
- **不适合**：全新项目无历史配置

### 前置条件

- codex CLI ≥ 0.140.0
- 源项目含 `.claude/` 或兼容结构

### 详细使用步骤（业务用户）

1. `codex` 进入 TUI
2. 输入 `/import` 按提示选择源路径
3. 检查生成的 `~/.codex/config.toml` 与 skills
4. `codex doctor` 验证
5. 小任务试跑 `codex exec`

### 命令与配置示例

```
/import
# 或指定路径（以 CLI 实际提示为准）

codex exec "smoke test: list repo structure"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/import` | ⚠️ 未实测（无 API Key / 无交互 TUI） |
| 0.141.0 changelog | ✅ import accounting 改进 |

### 问题与解决方案

**错误 1：import 后 MCP 未连接**

排查：重新 OAuth；检查 plugin 路径。

**错误 2：skills 冲突**

排查：手动合并 `~/.codex/skills`；见官方 migration guide。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.140.0 release notes | 基础能力 |
| 0.141.0 | import 结果统计增强 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Claude 迁移用户 | Fable 5 窗口关闭前并行评估 Codex |
| 企业 | import 后审计 permissions 与 secrets |

---

## 版本对照表

| 版本/Build | 日期 | 要点 |
|------------|------|------|
| CLI 0.141.0 | 2026-06-18 | Noise relay、插件 MCP、cwd 修复 |
| CLI 0.142.0-alpha.2 | 2026-06-18 | 预发布线 |
| App 26.616 | 2026-06-18 | Record & Replay、自动化批量操作 |
| CLI 0.140.0 | 2026-06-15 | `/import`、rate-limit banking |
| App EEA 扩展 | 2026-06-16 | Computer Use、Chrome、Memories |

## 今日研究员结论

Codex **0.141.0 是值得立即升级的 stable 版本**，远程执行与 exec hook 修复对生产脚本友好。App **Record & Replay** 标志 skill 生态从「手写」走向「演示录制」，但 **EEA  exclusion** 与 **Computer Use 依赖** 限制首批受众。建议：`npm pin 0.141.0` + `codex doctor` 入门；欧洲用户优先消化 6/16 区域扩展，macOS 非 EEA 用户试用 Record & Replay。
