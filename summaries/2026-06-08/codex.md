# OpenAI Codex — DayAI 每日资讯 2026-06-08

> 检索窗口：2026-06-08T22:00Z 前后；本地 CLI 实测目录：`/workspace/tools`  
> 官方来源：[GitHub Releases](https://github.com/openai/codex/releases) · [OpenAI Codex 文档](https://developers.openai.com/codex)

---

## 版本速览

| 渠道 | 版本 | 状态 | 备注 |
|------|------|------|------|
| npm `@openai/codex` | **0.137.0** | 稳定版（latest） | 本地实测已安装 |
| GitHub `rust-v0.138.0-alpha.8` | **0.138.0-alpha.8** | 预发布 | 2026-06-08 21:46 UTC 发布 |
| GitHub `rust-v0.138.0-alpha.1` | **0.138.0-alpha.1** | 预发布 | 2026-06-04 大版本功能基线，下文六大特性均出自其 Release Notes |

**今日结论**：生产环境继续用 npm `0.137.0`；尝鲜 `0.138.0-alpha` 系列需从 [GitHub Releases](https://github.com/openai/codex/releases) 下载对应平台包，或安装带平台后缀的 npm 预发布标签（如 `0.138.0-alpha.8-linux-x64`）。`0.138.0-alpha.1` 至 `alpha.8` 为同一 minor 线的连续 alpha 迭代，核心能力在 alpha.1 已落地，后续 alpha 主要为修复与 CI/平台加固。

---

## 本地实测摘要

实测环境：Ubuntu 24.04，`/workspace/tools` 下 `npm install @openai/codex@latest`。

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
./node_modules/.bin/codex doctor
./node_modules/.bin/codex features list
```

| 命令 | 结果 | 说明 |
|------|------|------|
| `codex --version` | `codex-cli 0.137.0` | ✅ CLI 可执行 |
| `codex doctor` | 12 ok · 1 warn · 4 fail | ⚠️ **auth 缺失**（`~/.codex/auth.json` 无凭证）；⚠️ **WebSocket 401**（无 Bearer，HTTPS fallback 仍可能可用）；⚠️ **install path 不一致**（运行包在 `/workspace/tools/node_modules/@openai/codex`，全局 npm 根在 `/lib/node_modules/@openai/codex`） |
| `codex features list` | `multi_agent` **stable**；`multi_agent_v2` **under development**；`plugins` **stable** | 与 alpha.1 发布说明一致：v1 多智能体已稳定，v2 仍在开发中 |

`codex plugin list --json` 在 0.137.0 已可用，输出 `{"installed":[],"available":[]}`（无 marketplace 配置时为空，属预期）。

---

## 1. Multi-Agent v2（followup_task、per-thread runtime）

### 是什么

Multi-Agent v2 是 Codex 多智能体编排的第二代实现。相较 v1，v2 将**运行时选择（runtime）与每个线程（thread）绑定**，子智能体可继承更清晰的元数据默认值；原 `assign_task` RPC/语义重命名为 **`followup_task`**，用于向已派生的子智能体线程发送后续指令，而非每次重新 spawn。GitHub PR #25266、#25636、#25720–#25722、#25841、#26114 覆盖了 dogfood 默认、元数据持久化、per-thread runtime 解析与启动预热对齐。

### 适用场景

- 大型 PR 审查：按维度（安全、质量、测试、竞态）各 spawn 一个子智能体，再用 `followup_task` 追问细节。
- 长时探索任务：父线程保持上下文，子线程以不同 sandbox/模型配置并行读代码。
- CSV 批处理（`spawn_agents_on_csv`，实验性）：每行一个 worker，父线程汇总结果。

### 前置条件

- ChatGPT Plus / Pro / Business / Enterprise / Edu 计划之一，且工作区已开启 Codex Local。
- `multi_agent` 特性为 stable；`multi_agent_v2` 在 0.137.0 仍为 **under development**，完整 v2 行为需 0.138.0-alpha 线。
- 自定义智能体可放在 `~/.codex/agents/` 或 `.codex/agents/`；全局限制见 `config.toml` 的 `[agents]`（`max_threads` 默认 6，`max_depth` 默认 1）。

### 步骤

1. 在 CLI 或 App 中**显式要求** Codex spawn 子智能体（Codex 不会自动 fan-out）。
2. 用 `/agent` 切换活跃线程、查看子线程状态。
3. 对运行中的子智能体直接说「继续检查 X」或「停止该 agent」——底层走 followup 语义。
4. 需要自定义行为时，在 `.codex/agents/reviewer.toml` 等文件中定义 `name`、`description`、`developer_instructions`。

### 命令

```bash
# 查看特性开关
codex features list | grep multi_agent

# 交互式多智能体审查（示例 prompt）
codex
# 输入：对本 PR 的 6 个维度各 spawn 一个 agent，全部完成后汇总

# 切换线程（TUI 内）
/agent
```

### 本地测试

- `codex features list`：`multi_agent` = stable ✅；`multi_agent_v2` = under development ⚠️。
- 未配置 auth，未能实际 spawn 子智能体；CLI 结构与 `/agent` 命令在 0.137.0 已存在。

### 问题

- v2 在稳定版 CLI 中特性旗标仍为开发态，行为可能与 GitHub alpha 不完全一致。
- 每个子智能体独立消耗 token；`max_depth > 1` 可能导致递归 fan-out 与账单激增。
- 非交互模式（`codex exec`）下，子线程审批请求可能无法弹窗，需提前配置 approval policy。

### 交叉验证

- 官方：[Subagents 文档](https://developers.openai.com/codex/multi-agent)
- GitHub：[0.138.0-alpha.1 Release Notes](https://github.com/openai/codex/releases/tag/rust-v0.138.0-alpha.1)（Multi-agent v2 条目）
- 社区：`industry.md` 指出 Codex 尚无 Claude Code `/loop` 对等的原生循环命令，多智能体更适合「并行子任务」而非「定时轮询」。

### 利弊

| 利 | 弊 |
|----|-----|
| 复杂任务可并行、上下文隔离更好 | Token 成本显著高于单智能体 |
| per-thread runtime 便于按任务选模型/沙箱 | v2 尚未在 stable 全面开启 |
| followup_task 减少重复 spawn 开销 | 深层嵌套难以预测与调试 |

---

## 2. 企业云托管 Config Bundle + 月度额度展示

### 是什么

Enterprise / Edu 管理员可通过 ChatGPT 工作区 **Codex Policies** 页面下发**云托管配置包（cloud-managed config bundle）**，格式与本地 `requirements.toml` 相同，覆盖审批策略、沙箱模式、Web 搜索、网络域白名单、MCP 允许列表、特性 pin 等。运行时 Codex Local（App / CLI / IDE）登录 ChatGPT 后自动拉取并合成策略层（#24617–#24622、#25963）。同时，企业流程可在状态栏展示**月度 credit 额度**（#24812），便于成员感知用量。

### 适用场景

- 金融、政务、大型 SaaS：需按部门差异化沙箱（只读 vs workspace-write）。
- 需统一禁用 Browser Use / Computer Use / 外网搜索的合规团队。
- 平台团队需要「策略下发 + 用量可视化」一体化治理。

### 前置条件

- ChatGPT **Enterprise** 或 **Edu** 工作区；工作区 Owner 或具备 **Codex Admin** 自定义角色。
- 在 Workspace Settings → Settings and Permissions 中开启 **Allow members to use Codex Local**。
- 建议单独建「Codex Admin」组，仅少数人拥有 **Allow members to administer Codex**。

### 步骤（管理员）

1. 进入 ChatGPT Admin → Codex Policies。
2. 编写 baseline `requirements.toml`（示例见下），为不同用户组创建策略变体。
3. 将策略绑定到 SCIM 同步的 Group；配置 default fallback 策略。
4. 用策略查找工具按邮箱验证某用户实际生效配置。
5. 通知成员在 CLI 执行 `codex login` 使用工作邮箱登录。

### 命令

```toml
# 示例：标准研发组 — 限制 Web 搜索与审批
allowed_web_search_modes = ["disabled", "cached"]
allowed_sandbox_modes = ["workspace-write"]
allowed_approval_policies = ["on-request"]

[features]
browser_use = false
computer_use = false
```

```bash
# 成员侧验证
codex doctor          # 查看 config 是否 loaded
codex login           # ChatGPT 工作账号
```

### 本地测试

- 当前环境无 Enterprise 工作区，无法验证云 bundle 拉取与月额度 UI。
- `codex doctor` 显示 `config.toml` 已加载、27 个 feature flags enabled，均为本地默认。

### 问题

- 多组匹配时**第一条规则优先**，不会合并字段；策略需写完整 profile。
- 云策略与仓库内 `.codex/config.toml` Team Config 并存时，需理解 precedence（云 requirements 为硬约束上限）。
- 月度额度展示依赖 ChatGPT 计费体系，与 API Key 计费路径不同。

### 交叉验证

- 官方：[Enterprise Admin Setup](https://developers.openai.com/codex/enterprise) Step 3「Configure Codex local requirements」
- GitHub：#24812（monthly credit limits）、#24620（cloud-managed config layer）

### 利弊

| 利 | 弊 |
|----|-----|
| 零接触下发，无需 MDM 推文件 | 仅 Enterprise/Edu，中小团队不可用 |
| 与本地 requirements.toml 格式统一 | 策略错误可能影响全员，需灰度组验证 |
| 月额度提升成本可见性 | 依赖 ChatGPT 登录，离线 API Key 路径策略不同 |

---

## 3. 插件系统：`plugin list --json` 与远程目录缓存

### 是什么

Codex 插件将 Skills、Apps（GitHub/Slack/Gmail 等）、MCP Server 打包为可安装工作流。0.138.0-alpha.1 新增：

- **`codex plugin list --json`**：机器可读输出，便于 CI/CD 或内部门户集成（#25330）。
- **远程插件目录缓存**：加速 marketplace 建议与去重本地/远程精选安装（#25457、#25491、#25681）。

稳定版 0.137.0 的 `codex plugin list --help` 已包含 `--json` 与 `--available` 标志；`plugins` 特性为 **stable**。

### 适用场景

- 平台工程：用 JSON 管道审计成员已装插件。
- 安全团队：在 requirements.toml 中 pin 允许的 MCP / 插件。
- 个人开发者：通过 `/plugins` TUI 或 App 插件目录安装 Gmail、Slack、Codex Security 等。

### 前置条件

- Codex Local 已安装且已 `codex login`。
- 可选：在 `config.toml` 配置 `[plugins]` marketplace 源。
- 部分插件需 ChatGPT 侧 App 授权（OAuth）。

### 步骤

**通用**：`codex` → `/plugins` 浏览安装；或 `codex plugin add <id>`。

**JSON 集成**：

```bash
codex plugin list --json
codex plugin list --available --json
codex plugin list --marketplace <name> --json
```

### 命令

```bash
codex plugin list --json | jq .
codex plugin marketplace list
codex plugin add <plugin@marketplace>
# 禁用已装插件：编辑 ~/.codex/config.toml
# [plugins."gmail@openai-curated"]
# enabled = false
```

### 本地测试

```bash
$ codex plugin list --json
{"installed":[],"available":[]}
```

✅ JSON 输出格式正确；空列表因未配置 marketplace / 未登录。

### 问题

- 未登录时无法拉取远程 curated 目录。
- 插件含外部 App 时，卸载插件不等于撤销 ChatGPT App 授权。
- `skills` 字段 malformed 时 alpha.1 起改为 warning 而非硬失败（#25717）。

### 交叉验证

- 官方：[Plugins 文档](https://developers.openai.com/codex/plugins)
- GitHub：#25330、#25457

### 利弊

| 利 | 弊 |
|----|-----|
| JSON 输出利于自动化治理 | 远程目录依赖网络与 auth |
| 缓存降低 TUI 浏览延迟 | 第三方插件质量参差不齐 |
| 与 Skills/MCP 统一打包 | 企业需额外制定插件白名单流程 |

### 管理员开启 SOP（插件）

1. **工作区**：Workspace Settings → 开启 Codex Local；RBAC 创建「Codex Users」组。
2. **策略**：Codex Admin 在 Policies 页下发 `requirements.toml`，用 `[features]` pin 或禁用高风险能力（如 `computer_use = false`）；按需限制 MCP 域。
3. **插件目录**：评估 OpenAI Curated 与团队私有 marketplace；将私有源 URL 写入内部文档。
4. **审计**：定期 `codex plugin list --json` 导出（可通过合规 API 补充）；对比允许列表。
5. **培训**：明确「安装插件 ≠ 自动获得外网写权限」，审批策略仍生效。

### 业务用户使用 SOP（插件）

1. 安装 Codex CLI / App，`codex login` 用公司邮箱登录。
2. 打开 `/plugins` 或 App「Plugins」，搜索所需插件（如 Gmail、Google Drive、Codex Security）。
3. 点击 Install，按提示完成 ChatGPT App OAuth。
4. **新开会话**后使用：直接描述任务，或 `@插件名` 显式调用。
5. 不用时：`enabled = false` 或 Uninstall；敏感任务优先只读 sandbox 会话。

---

## 4. Remote-Control 配对 RPC（app-server v2）

### 是什么

Remote-control 允许外部客户端（如 IDE 扩展、移动端、自动化编排器）通过 **app-server v2 RPC** 与本地 Codex 实例配对并控制会话。0.138.0-alpha.1 新增：

- **启动配对（pairing start）**（#25675）
- **列出 / 撤销 controller 授权**（#25785）

配套 app-server 文档与 schema 已更新（Release Notes Documentation 段）。

### 适用场景

- IDE 插件需要驱动本地 Codex 线程而非独立进程。
- 远程开发机（SSH）上跑 Codex，本地 UI 显示状态。
- 企业内部「Codex 控制平面」集成 app-server Unix socket / control socket。

### 前置条件

- `codex-app-server` 组件（GitHub Release 含独立包）。
- 0.137.0 `codex doctor` 显示 app-server **not running (ephemeral mode)** 为默认；需显式启动 daemon。
- 网络与本地 socket 权限；企业环境需评估 controller 授权范围。

### 步骤

1. 启动 app-server daemon（具体标志因版本而异，参考 [app-server 文档](https://developers.openai.com/codex)）。
2. 外部客户端调用 pairing start RPC 获取配对码或 token。
3. 用户在 Codex TUI/App 确认配对。
4. 管理员可通过 list/revoke RPC 审计已授权 controller。

### 命令

```bash
codex doctor    # 查看 app-server 状态、control socket 路径
# 典型 socket：~/.codex/app-server-control.sock
# RPC 调用需通过 app-server 客户端 SDK 或 grpc/JSON schema（见 config-schema.json）
```

### 本地测试

- `codex doctor`：app-server **not running**；control socket 路径已列出。
- 未启动 daemon，未执行 pairing RPC。

### 问题

- `codex features list` 中 `remote_control` 标记为 **removed**（0.137.0），与 alpha.1 新增 RPC 存在命名代际差异；尝鲜需 alpha 线并查阅最新 schema。
- 配对授权泄露等同本地 Codex 控制权，需短期 token + revoke 流程。

### 交叉验证

- GitHub：#25675、#25785；Release Notes「Remote-control clients can start pairing…」
- 官方：Enterprise 文档 Background Server 段提及 app-server daemon 路径

### 利弊

| 利 | 弊 |
|----|-----|
| 解耦 UI 与 agent 运行时 | 配置复杂，默认未启用 |
| 可构建企业定制控制面 | 安全面扩大，需严格 revoke |
| 支持多客户端协同 | 文档与 stable 特性旗标不一致，迁移期混乱 |

---

## 5. Code Mode 托管 Web/Image 工具 + 并行 Standalone Web Search

### 是什么

在 **code mode**（及 code-only 变体）下，此前不可用的**托管 Web 搜索与图像生成工具**现已可见并可调用（#25176、#25890、#25923）。同时，**standalone web search** 支持**并行多路调用**（#25702），缩短多主题调研的总延迟。图像生成走 host finalization 路径；与 `image_generation` stable 特性协同。

### 适用场景

- 纯编码会话中仍需查文档、API 参考、错误码——不必切换模式。
- 前端/UI 任务：在 code mode 直接生成 mock 图、图标。
- 并行搜索：「同时查 React 19 迁移、Vitest 配置、ESLint flat config」类 prompt。

### 前置条件

- `image_generation`：stable；`standalone_web_search`：0.137.0 为 **under development**。
- 企业策略可能通过 `allowed_web_search_modes` 禁用或仅允许 `cached`。
- 需有效 auth；WebSocket 或 HTTPS 至 OpenAI API 可达。

### 步骤

1. 在会话中启用 code mode（或 `--enable code_mode` 等配置，视版本而定）。
2. 直接要求 Codex「搜索 X 并继续改代码」或「生成一张 … 的示意图」。
3. 对多主题调研，在单条 prompt 中列出并行搜索子任务。

### 命令

```bash
codex features list | grep -E 'code_mode|standalone_web_search|image_generation|web_search'
# 企业禁用搜索时，管理员在 requirements.toml：
# allowed_web_search_modes = ["disabled"]
```

### 本地测试

- `code_mode`、`standalone_web_search` 均为 under development；`image_generation` 为 stable。
- 无 auth，WebSocket 401，未能实测搜索/生图。

### 问题

- 并行搜索增加 token 与 API 配额消耗。
- 企业 cached-only 模式下结果可能滞后。
- code-only 模式可见工具 ≠ 自动批准，仍受 sandbox / approval 约束。

### 交叉验证

- GitHub：#25702（parallel standalone web search）、#25890（hosted tools in code-only mode）
- 官方：Enterprise requirements 示例 `allowed_web_search_modes`

### 利弊

| 利 | 弊 |
|----|-----|
| 减少模式切换，编码流不中断 | 开发中特性，stable 行为未完全对齐 |
| 并行搜索降低 wall-clock 延迟 | 账单与速率限制压力 |
| 图像工具补齐设计类子任务 | 企业合规可能禁止实时搜索 |

---

## 6. TUI 改进：F13–F24、可搜索菜单粘贴、Reasoning 状态项

### 是什么

终端 UI（TUI）在 0.138.0-alpha.1 获得多项可用性增强（#25329、#25400、#25504）：

- **F13–F24** 纳入 keymap，适配高级终端/键盘。
- **可搜索选择菜单支持粘贴**（长路径、commit hash 场景）。
- 新增 **reasoning-only 紧凑状态/标题项**，减少 footer 噪音。
- 相关修复：取消无输出 prompt 时恢复草稿与附件（#25316）；slash 命令过滤与 footer 快捷键提示随 UI 状态重置（#25492、#25625）。

### 适用场景

- 长时间 TUI 驻留的 SRE / 平台工程师。
- 需要快速输入分支名、issue 链接的 workflow。
- 使用外部键盘（F13+ 映射宏）的 power user。

### 前置条件

- 真实终端：`TERM=xterm-256color`（`codex doctor` 在 `TERM=dumb` 会警告颜色与光标控制禁用）。
- 终端模拟器需转发 F13–F24（部分 SSH 客户端默认不透传）。

### 步骤

1. `export TERM=xterm-256color` 后启动 `codex`。
2. 在 searchable menu 中用系统粘贴（通常 Ctrl+Shift+V 或终端绑定）。
3. 在 `~/.codex/config.toml` 自定义 keymap 绑定 F13–F24（若版本提供对应段）。

### 命令

```bash
export TERM=xterm-256color
codex
# TUI 内：打开可搜索菜单 → 粘贴过滤关键词
codex doctor   # 检查 terminal 段
```

### 本地测试

- 当前自动化环境 `TERM=dumb`，`codex doctor` 报 terminal fail；未进行交互式 TUI 验证。
- alpha.1 Release Notes 与 changelog 已确认上述 PR 合并。

### 问题

- CI / 非交互环境无法受益；需真终端。
- F13–F24 在 macOS Terminal 默认可能未映射。
- reasoning-only 项对不看 reasoning 的用户价值有限。

### 交叉验证

- GitHub：#25329、#25400、#25504
- 本地：`codex doctor` terminal 检查项

### 利弊

| 利 | 弊 |
|----|-----|
| 粘贴提升长文本筛选效率 | 仅 TUI 用户感知 |
| 扩展功能键覆盖专业键盘 | 终端兼容性参差 |
| 紧凑 reasoning 状态省屏幕 | 对 GUI App 用户无直接影响 |

---

## 7. Plugins：Sites（托管站点 / Web App）

Sites 插件让 Codex 创建、保存版本、部署并检查由 OpenAI 托管的网站、Web App 与小游戏；部署 URL 即生产环境。预览期面向 **ChatGPT Business / Enterprise**；Enterprise 需管理员通过 RBAC 开启。

### 管理员开启 SOP（Sites）

1. 确认工作区为 **ChatGPT Enterprise**（Business 默认开启 Sites，Enterprise 需显式授权）。
2. ChatGPT Admin → **RBAC** → 为「Codex Users」或目标角色开启 **Sites** 权限。
3. 评估数据驻留与外链政策；在 Codex Policies 中限制高风险特性（如 `computer_use`）。
4. 内部文档说明：Sites 部署 = 生产；敏感项目先 **save version** 再 **deploy**。
5. 配置合规负责人审查 `.openai/hosting.json`、D1/R2 绑定与访问模式（`admins_only` / `workspace_all` / `custom`）。

### 业务用户使用 SOP（Sites）

1. 确认管理员已开启 Sites；在 App「Plugins」安装 **Sites** 插件。
2. **新开线程**，用自然语言或 `@Sites` 描述站点需求（受众、功能、是否需登录）。
3. 要求 Codex **先验证构建**，再决定 save（审阅候选）或 deploy（上线）。
4. 需要持久化数据时明确 D1（结构化）/ R2（文件）；内部工具可要求 workspace 身份认证。
5. 部署前在 Codex 审查面板检查源码变更与迁移；在 Sites 侧栏配置环境变量/密钥（勿写入 git）。
6. 通过 App 侧栏「Sites」或 prompt 查询部署状态与 URL； widening 访问范围前用 `@Sites` 确认当前 `access mode`。

### Sites 快速命令与提示示例

```text
@Sites 为运营团队构建工单看板：提交、认领、状态流转、筛选；要求工作区账号登录。
@Sites 部署当前项目，检查 Sites 兼容性并返回部署 URL。
@Sites 将已部署站点访问范围改为 workspace 全员（先展示当前 URL）。
```

### 交叉验证

- 官方：[Sites 插件文档](https://developers.openai.com/codex/plugins/sites)
- 与本文第 3 节插件 JSON 列表、第 2 节企业 RBAC 策略联动。

---

## 升级与选型建议

| 人群 | 建议 |
|------|------|
| 生产研发 | 保持 **npm 0.137.0**；关注 [Releases](https://github.com/openai/codex/releases) 至 0.138.0 stable |
| 平台 / SRE | 在隔离环境试装 **0.138.0-alpha.8**，验证 `plugin list --json`、app-server pairing、config bundle |
| Enterprise 管理员 | 优先落地云托管 `requirements.toml` + Sites RBAC；用 Compliance API 审计 |
| 个人开发者 | `codex login` 解决 auth 与 WebSocket 401；`export TERM=xterm-256color` 优化 TUI |

```bash
# 升级 stable
npm install -g @openai/codex@latest

# 尝鲜 alpha（示例：linux x64）
npm install @openai/codex@0.138.0-alpha.8-linux-x64
```

---

## 参考链接

- GitHub Releases：https://github.com/openai/codex/releases
- 0.138.0-alpha.1（功能基线）：https://github.com/openai/codex/releases/tag/rust-v0.138.0-alpha.1
- 0.138.0-alpha.8（今日预发布）：https://github.com/openai/codex/releases/tag/rust-v0.138.0-alpha.8
- OpenAI Codex 文档：https://developers.openai.com/codex
- 多智能体：https://developers.openai.com/codex/multi-agent
- 插件：https://developers.openai.com/codex/plugins
- Sites：https://developers.openai.com/codex/plugins/sites
- 企业管理员：https://developers.openai.com/codex/enterprise

---

*DayAI 编排 · 2026-06-08 · 本地实测版本 0.137.0 · 预发布跟踪 0.138.0-alpha.8*
