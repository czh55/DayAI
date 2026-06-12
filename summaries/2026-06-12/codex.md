# OpenAI Codex 每日技术文档 — 2026-06-12

> **本地稳定版**：`codex-cli 0.139.0`（npm `@openai/codex@latest`）  
> **当日预发布**：GitHub [rust-v0.140.0-alpha.16](https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.16)（2026-06-12 19:03 UTC）  
> **官方来源**：[developers.openai.com/codex](https://developers.openai.com/codex)、[GitHub Releases](https://github.com/openai/codex/releases)  
> **交叉验证**：[Ars Technica Plugins 报道](https://arstechnica.com/ai/2026/03/openai-brings-plugins-to-codex-closing-some-of-the-gap-with-claude-code/)、[量子位 ALE/Codex 排名](https://www.qbitai.com/2026/06/434774.html)

---

## 今日概览

6 月 12 日，OpenAI Codex 在 GitHub **一天内推送 4 个 0.140.0-alpha 预发布**（alpha.13–16），显示多 Agent v2、插件与目标（Goals）管线仍在快速迭代。npm **稳定通道仍为 0.139.0**；`codex features list` 显示 **`plugins`、`goals`、`multi_agent`、`shell_tool`** 等已为 **stable**。本地 `codex doctor` 在无 API Key 时报告 auth 失败属预期，核心 CLI 与 feature 探针可用。

---

## 特性一：Plugins 插件系统（stable）

### 是什么（机制说明）

**Plugin** 是 Codex 的可安装分发单元，可捆绑 **Skills**（`SKILL.md` 工作流）、**MCP 服务器配置**、应用集成与 UI 元数据。与 Claude Code 插件市场类似，Codex App 与 CLI 均支持从 **marketplace snapshot** 安装。CLI 子命令：`codex plugin add/list/remove/marketplace`。

Skills 与 Plugins 关系（官方）：Skill 是 authoring 格式；Plugin 是安装包。见 [Agent Skills 文档](https://developers.openai.com/codex/skills)。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 团队统一「部署到 Vercel」「读 Notion」工作流 | 仅需一次性 ad-hoc 提问 |
| 非纯编码知识工作（销售、研报插件等） | 无法访问 OpenAI 账号的组织 |

### 前置条件

- Codex CLI ≥ 0.139（`features.plugins = stable`）  
- `codex login` 或 `OPENAI_API_KEY`  
- 管理员：配置 marketplace 源（企业）

### 详细使用步骤（用户）

1. `codex login`  
2. `codex plugin marketplace list` 查看已配置源  
3. `codex plugin list` 浏览可安装项  
4. `codex plugin add <plugin-name>`  
5. 交互会话中让 Codex「使用 xxx 插件部署」

### 详细使用步骤（管理员开启 SOP）

1. 在 Codex App → **Plugins** 启用组织 marketplace  
2. 审核第三方插件 MCP 权限范围  
3. 通过 MDM 或文档下发 `~/.codex/config.toml` marketplace URL  
4. 禁止用户侧 `codex plugin marketplace add`（若需锁定）— 以企业策略为准

### 命令与配置示例

```bash
cd /workspace/tools
./node_modules/.bin/codex login
./node_modules/.bin/codex plugin marketplace list
./node_modules/.bin/codex plugin list
./node_modules/.bin/codex plugin add github
```

`~/.codex/config.toml` 片段（示例）：

```toml
[plugins]
enabled = true

[[plugins.marketplaces]]
name = "openai-official"
url = "https://example.com/marketplace.json"
```

### 本地测试结果

```bash
$ ./node_modules/.bin/codex plugin list
No marketplace plugins found.

$ ./node_modules/.bin/codex features list 2>&1 | rg plugins
plugins                              stable             true
plugin_sharing                       stable             true
```

- ✅ `plugin` 子命令与 stable flag  
- ⚠️ 无 marketplace 配置，列表为空  
- ❌ 未 `login`，未安装插件

### 问题与解决方案

| 错误 | 排查 |
|------|------|
| `No marketplace plugins found` | 先 `plugin marketplace add`；确认网络 |
| 安装后工具不可见 | `codex mcp list`；检查 plugin 内 MCP 定义 |
| 远程卸载失败 | 0.140 alpha 修复 plugin service route — 可试 `@openai/codex@next` |

```bash
./node_modules/.bin/codex doctor --summary compact
./node_modules/.bin/codex mcp list
```

### 官方 vs 社区交叉验证

- **官方**：[Skills 文档](https://developers.openai.com/codex/skills)  
- **Ars Technica**：称插件缩小与 Claude Code 差距 — **部分一致**（形态相似，生态成熟度社区仍偏 Claude）  
- **量子位 ALE**：GPT 5.5 + Codex 框架 ALE 通过率 24% 第一 — **补充** Codex 在「真干活」场景的定位

### 利弊 + 分角色建议

- **个人**：从 GitHub/Vercel 官方插件试起  
- **团队**：管理员审核 MCP 出站  
- **企业**：插件 = _supply chain_ 风险，需 SBOM

---

## 特性二：Goals 目标驱动多轮任务（stable）

### 是什么

**Goals** 允许为 Codex 设定可追踪的完成条件，Agent 跨多轮工具调用直至满足目标。0.140 alpha 变更含「完成后可创建新 goal」。Feature flag：`goals = stable`。

### 适用场景

- 「修到所有测试通过」类终止条件明确的任务  
- 长时运行 refactor

### 前置条件

- `features.goals = true`（默认 stable）  
- 已认证

### 详细使用步骤

1. 启动 `codex`  
2. 使用 goals 相关 UI 或配置（以 App 为准；CLI 侧配合 prompt 描述完成标准）  
3. 观察 rollout 直至 goal 完成  
4. 查看 `~/.codex/goals_1.sqlite`（若存在）

### 命令与配置示例

```bash
codex -c features.goals=true "Refactor utils/date.ts until all jest tests in utils/ pass"
```

### 本地测试结果

```bash
$ ./node_modules/.bin/codex features list 2>&1 | rg goals
goals                                stable             true
```

- ✅ feature 已 stable  
- ❌ 无 API Key，未跑 goal 循环

### 问题与解决方案

1. **Goal 永不结束**：完成条件模糊 — 在 prompt 写明「success = npm test exit 0」  
2. **DB 损坏**：`codex doctor` 检查 `~/.codex/goals_1.sqlite`

### 官方 vs 社区

- GitClear [0.140.0-alpha.1](https://www.gitclear.com/open_repos/openai/codex/release/rust-v0.140.0-alpha.1) — Allow creating a new goal after completion

---

## 特性三：Multi-agent 多 Agent 编排（stable + 0.140 v2）

### 是什么

**multi_agent** 在 0.139 已为 stable：主 Agent 可派发子任务。0.140 alpha 系列增加 **multi-agent v2 path-based activity tracking**、app-server 对子 Agent 输入限制等，面向更复杂编排。

### 适用场景

- 大仓库分模块并行改  
- Review + Implement 分工

### 前置条件

- `features.multi_agent = true`  
- 试用 v2：`npm install @openai/codex@0.140.0-alpha.16`（预发布风险自担）

### 详细使用步骤

1. `codex features list` 确认 `multi_agent` stable  
2. 提示词明确子任务边界：「Agent A 只改 frontend，Agent B 只改 API」  
3. 监控各子 rollout 日志 `~/.codex/log/`

### 命令与配置示例

```bash
codex --enable multi_agent "Split work: subagent 1 fixes types in src/, subagent 2 updates tests/"
```

### 本地测试结果

```bash
multi_agent                          stable             true
multi_agent_v2                       under development  false
```

- ✅ v1 stable  
- ⚠️ v2 仍 under development

### 问题与解决方案

1. **子 Agent 收直接输入**（v2 限制）：通过主 Agent 转发 — alpha.1 修复 app-server reject direct input  
2. **活动追踪丢失**：升级 0.140 alpha

---

## 特性四：`codex doctor` 安装诊断（0.139）

### 是什么

一条命令检查 install 路径、auth、git、terminal、sandbox、WebSocket、更新通道等。云 CI 推荐纳入 onboarding。

### 适用场景

- 新机器配置  
- 「codex 装了两份」PATH 冲突

### 前置条件

- 已 `npm install @openai/codex`

### 详细使用步骤

1. `cd /workspace/tools && ./node_modules/.bin/codex doctor`  
2. 阅读 `✗` 与 `⚠` 行  
3. 按建议修复（如 `codex login`、`export TERM=xterm-256color`）

### 命令与配置示例

```bash
./node_modules/.bin/codex doctor --summary compact
./node_modules/.bin/codex doctor --json 2>/dev/null | head -c 2000
```

### 本地测试结果（摘录）

```
Codex Doctor v0.139.0 · linux-x86_64
✗ auth         no Codex credentials were found
✗ install      npm install -g @openai/codex would update a different install
⚠ websocket    Responses WebSocket failed; HTTPS fallback may still work
✗ terminal     TERM=dumb
12 ok · 1 idle · 5 notes · 1 warn · 4 fail
```

- ✅ doctor 正常运行  
- ⚠️ 预期 auth/terminal 失败

### 问题与解决方案

| 项 | 修复 |
|----|------|
| install 路径不一致 | 统一使用 `./node_modules/.bin/codex` 或 `npm install -g` 二选一 |
| WebSocket 401 | 配置 `codex login` |
| TERM=dumb | `export TERM=xterm-256color` |

---

## 特性五：`codex exec` 非交互管道（stable 能力）

### 是什么

`codex exec`（别名 `e`）在脚本中非交互运行单条任务，配合 sandbox 与 approval policy。

### 适用场景

- CI nightly fix  
- `git diff | codex exec review`

### 前置条件

- Auth 配置  
- 默认 sandbox：`restricted` + `OnRequest` approval

### 详细使用步骤

1. `export OPENAI_API_KEY=...` 或 `codex login`  
2. `codex exec "run npm test and fix failures"`  
3. 检查 exit code 与 `codex apply` 应用补丁

### 命令与配置示例（基础）

```bash
cd /workspace
./tools/node_modules/.bin/codex exec "List top 3 TODO comments in README.md"
```

### 命令与配置示例（进阶 — 配合 review）

```bash
git diff HEAD~1 | ./tools/node_modules/.bin/codex review
```

### 本地测试结果

- ❌ 无凭证，未执行推理

---

## 特性六：Codex Sites / 应用托管（概念 + 管理员/用户 SOP）

### 是什么

**Sites**（feature `apps` stable）允许 Codex 生成并托管交互式 Web 应用。企业场景需区分管理员开启与市场插件权限。

### 管理员开启 SOP

1. Codex App 组织设置 → **Apps / Sites** → Enable  
2. 配置允许的外部域名与部署目标  
3. 审计日志开启  
4. 下发政策：禁止 Sites 访问内网元数据

### 业务用户使用 SOP

1. 在 Codex 会话：「创建一个展示本周销售数据的 dashboard site」  
2. 预览 → 发布 → 分享链接  
3. 迭代：「把图表改为按区域分组」

### 本地测试结果

```bash
apps                                 stable             true
in_app_browser                       stable             true
```

- ✅ features 显示 apps stable  
- ❌ 未实测托管（需登录 App）

### 官方 vs 社区

- Ars Technica 提及 Codex 扩展至知识工作 — Sites 属该战略一部分

---

## 特性七：0.140.0-alpha.16 当日预发布要点

### 是什么

6 月 12 日最新 alpha 构建，GitHub Release 正文仅标题，但从 alpha.1–15 累积变更含：multi-agent v2 活动追踪、插件远程卸载修复、PR review 注释忽略、rollout 冷恢复优化等。

### 前置条件

```bash
npm install @openai/codex@0.140.0-alpha.16
```

### 风险

- Prerelease，不适合生产默认通道  
- 与 stable 0.139 并行安装时注意 PATH

### 本地测试结果

- 本次实测保持 **0.139.0 stable**；alpha 未安装

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/codex --version          # codex-cli 0.139.0
./node_modules/.bin/codex doctor             # 见上文
./node_modules/.bin/codex features list      # plugins/goals/multi_agent stable
./node_modules/.bin/codex plugin list          # 空列表
```

---

## 对普通开发者意味着什么

1. **稳定用 0.139**，关注 **plugins + goals + multi_agent** 已可生产试用  
2. **敢用 alpha** 的团队可试 0.140 多 Agent v2，但需隔离环境  
3. ALE 基准说明 **Codex 框架 + GPT 5.5** 在跨行业「真操作」场景暂领先 Claude Code + Fable 5 组合——选工具时勿只看 SWE-bench  
4. 与 Claude Code 一样，**认证与 PATH** 是云 CI 第一故障点 — 先 `codex doctor`

---

*DayAI | 2026-06-12*
