# OpenAI Codex 每日深度 — 2026-06-03

- **本地 npm 版本**：`codex-cli 0.136.0`（`@openai/codex@latest` 于 2026-06-03 安装）
- **GitHub 最新预发行**：**0.137.0-alpha.4**（2026-06-03 01:26 UTC）
- **交叉验证**：[GitHub Releases](https://github.com/openai/codex/releases)、[developers.openai.com/codex](https://developers.openai.com/codex)、本地 `codex doctor` / `codex features list`

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest

./node_modules/.bin/codex --version
# codex-cli 0.136.0

./node_modules/.bin/codex doctor
# ✗ auth: no Codex credentials
# ✗ install: local node_modules vs global /lib/node_modules/@openai/codex PATH 不一致
# ⚠ websocket: 401 without bearer (expected)
# ✗ terminal: TERM=dumb

./node_modules/.bin/codex features list
# plugins, shell_tool, multi_agent, goals → stable
```

| 项 | 结果 |
|----|------|
| 版本 | ✅ 0.136.0 |
| `doctor` | ⚠️ 无登录；PATH 双安装提示 |
| `features list` | ✅ 27 enabled flags |
| 实际 coding 会话 | ❌ 未实测 — 无 API Key / ChatGPT login |

---

## 特性 1：会话归档 `/archive` 与 `codex archive`（0.137.0-alpha.4）

### 是什么（机制说明）

TUI 新增 **`/archive`**，CLI 提供 **`codex archive`** / **`codex unarchive`**。已归档会话 **不可 resume/fork**，直至恢复，用于清理实验性 rollout 而不删除历史。

### 适用场景

适合：大量试错的 Agent 会话管理。不适合：仍需继续的长任务主线会话。

### 前置条件

- Codex **≥ 0.137.0**（alpha 需 `npm install @openai/codex@0.137.0-alpha.4` 或等待 stable）  
- 已登录：`codex login` 或 `CODEX_API_KEY` / ChatGPT 认证

### 详细使用步骤

1. 升级（预发行示例）：  
   `cd /workspace/tools && npm install @openai/codex@0.137.0-alpha.4`  
2. 列出会话：`codex threads list`（子命令以 `codex --help` 为准）  
3. 归档：`codex archive <session-id>`  
4. TUI 内：`/archive` 归档当前会话  
5. 尝试 `codex resume` 应被拒绝或提示需 unarchive  
6. 恢复：`codex unarchive <session-id>`

### 命令与配置示例

```bash
cd /workspace/tools
./node_modules/.bin/codex login

./node_modules/.bin/codex threads list
./node_modules/.bin/codex archive SESSION_ID_HERE
./node_modules/.bin/codex unarchive SESSION_ID_HERE
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 0.136.0 是否有 archive | ❌ 命令可能不存在 — 需 0.137+ |
| GitHub Release 说明 | ✅ #25027, #25021 |

### 问题与解决方案

| 现象 | 排查 | 解决 |
|------|------|------|
| command not found | 版本过低 | 升级 alpha 或等 stable |
| 仍被 resume | 未归档成功 | `threads list` 看状态 |
| alpha 不稳定 | 生产环境 | 仅在沙箱账号试用 |

### 官方 vs 社区

- [GitHub 0.137.0-alpha.4](https://github.com/openai/codex/releases) — ✅  
- 国内媒体 6/3 少 — 以官方为准

### 建议

**个人**：每周归档实验会话；**团队**：规范 SESSION 命名便于批量 archive。

---

## 特性 2：Python SDK beta — `pip install openai-codex`（0.137）

### 是什么

官方将 Python 集成包文档统一为 **`pip install openai-codex`**，配置类公开名为 **`CodexConfig`**（原 AppServerConfig 更名），支持 **独立 `python-v*` 标签** 发布，与 runtime 版本解耦。

### 适用场景

在 FastAPI/内部平台嵌入 Codex app-server；CI 批量代码任务。

### 前置条件

- Python 3.10+（以 PyPI 元数据为准）  
- Codex 认证（API key 或 OAuth 流程）  
- 阅读 [developers.openai.com/codex](https://developers.openai.com/codex) Python 章节

### 详细使用步骤

1. `python3 -m venv .venv && source .venv/bin/activate`  
2. `pip install openai-codex`  
3. 按官方 quickstart 创建 `Codex` / `AsyncCodex` 实例  
4. 使用 `CodexConfig` 配置 sandbox preset（0.136 已引入 friendly Sandbox presets）  
5. 在 staging 跑通一轮 thread API  
6. 锁定版本：`pip freeze | grep openai-codex`

### 命令与配置示例

```bash
python3 -m venv /workspace/tools/.venv-codex
source /workspace/tools/.venv-codex/bin/activate
pip install openai-codex

python3 << 'PY'
from openai_codex import Codex, CodexConfig
# 以下 API 以官方文档为准；无 key 时仅做 import 烟雾测试
config = CodexConfig()
print("CodexConfig OK", config)
PY
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `pip install openai-codex` | ❌ 未执行 — 避免无 key 外呼 |
| Release #24836 等 | ✅ 文档/metadata 更新 |

### 问题与解决方案

| 现象 | 解决 |
|------|------|
| import 失败 | 检查包名是否为 `openai-codex` 非旧名 |
| 版本漂移 | pin `openai-codex==x.y.z` |

### 管理员 vs 用户 SOP

- **管理员**：在私有 PyPI 镜像代理 `openai-codex`；审计出站域名；发放 service account key  
- **开发者**：venv 内开发；勿把 key 写入 notebook

### 建议

平台团队优先读官方 FAQ；生产与 **0.137 runtime** 版本兼容性表对照发布说明。

---

## 特性 3：远程执行 `CODEX_API_KEY` 注册（0.137）

### 是什么

远程 execution setup 支持用 **`CODEX_API_KEY`** 向 **已批准的 OpenAI host** 注册；remote-control WebSocket 改用 **短期 server token**，降低 ChatGPT access token 暴露面。

### 适用场景

企业自托管 exec-server、远程 Codex runner；不适合个人笔记本随意暴露 API key。

### 前置条件

- 0.137+  
- 组织已批准 remote host（OpenAI 企业流程）  
- 管理员分发 `CODEX_API_KEY`

### 详细使用步骤（管理员 SOP）

1. 在 OpenAI 企业控制台申请 **approved host** 与 API key 策略  
2. 在 runner 机器设置：  
   `export CODEX_API_KEY="..."`  
3. 按 [exec-server 文档](https://developers.openai.com/codex) 启动 registration  
4. 验证 WebSocket 使用 server token 而非用户 ChatGPT token  
5. 审计日志开启；定期轮换 key

### 详细使用步骤（业务用户 SOP）

1. 向管理员索取 **只读/受限** runner 访问  
2. 本地 `codex` 仍用 `codex login` 个人流  
3. 远程任务通过团队提供的 exec-server URL 提交  
4. 不在个人 `.env` 粘贴企业级 `CODEX_API_KEY`

### 命令与配置示例

```bash
export CODEX_API_KEY="your-org-key"
# 具体 registration 子命令见 codex app-server / remote 文档
./node_modules/.bin/codex app-server --stdio
```

### 本地测试结果

❌ 未实测 — 无企业 host。GitHub #24666 — ✅。

### 问题与解决方案

| 现象 | 解决 |
|------|------|
| 401 | key 过期或 host 未批准 |
| token 泄露 | 轮换 key；检查日志 redaction |

### 建议

**安全**：`CODEX_API_KEY` 仅 CI/Vault；**开发**：继续本地 `codex login`。

---

## 特性 4：Windows 沙箱 `codex sandbox setup --elevated`（alpha）

### 是什么

Windows 管理员可用 **提升权限** 路径预配沙箱组件（alpha）；并支持配置允许的 Windows sandbox 实现列表（#24831, #23766）。

### 适用场景

企业 Windows 开发机统一 Agent 沙箱；不适合未打补丁的多用户共用机。

### 前置条件

- Codex 0.137+  
- Windows + 管理员 PowerShell  
- alpha 功能接受不稳定风险

### 详细使用步骤（管理员）

1. 以管理员打开 PowerShell  
2. `npm install -g @openai/codex@0.137.0-alpha.4`（或企业内镜像）  
3. `codex sandbox setup --elevated`  
4. 在 `config.toml` 配置 `approval policy` 与 filesystem sandbox  
5. 下发标准 `~/.codex/config.toml` 给开发者  
6. 收集 `codex doctor` 报告排查

### 详细使用步骤（用户）

1. 确认 IT 已运行 setup  
2. 普通用户启动 `codex`  
3. 触发 shell 工具，观察 sandbox 批准流程  
4. 若失败，附 `doctor --json` 给 IT

### 本地测试结果

❌ 未实测 — Linux VM。Release notes — ✅。

### 问题与解决方案

| 现象 | 解决 |
|------|------|
| elevated 失败 | UAC/组策略 |
| 与 Linux 行为不一致 | 查阅 Windows 专用 release fix 列表 |

---

## 特性 5：TUI Markdown OSC 8 超链接与紧凑表格（0.137）

### 是什么

终端 UI 渲染 Markdown 时：网页链接带 **OSC 8** 可点击；过宽表格在窄终端转为 **键值记录** 且保留链接目标（#24472, #24636, #24825）。

### 适用场景

在 SSH 终端阅读 Codex 输出的文档与 PR 链接。

### 前置条件

- 终端支持 OSC 8（iTerm2、WezTerm、较新 Windows Terminal）  
- Codex 0.137+

### 详细使用步骤

1. 升级 Codex  
2. `export TERM=xterm-256color`（Cloud VM 默认 `dumb` 需改）  
3. 运行 `codex` TUI，让 Agent 输出含链接的 Markdown  
4. Ctrl+click 或终端约定手势打开链接  
5. 缩窄终端宽度观察表格 → KV 布局

### 本地测试结果

⚠️ `TERM=dumb` 未测 OSC。Release — ✅。

### 建议

在 `~/.bashrc` 设置 `export TERM=xterm-256color` 后再跑 `codex`。

---

## 特性 6：0.136.0 已发布能力回顾（本地已装）

### `codex doctor` 增强（#24261）

**是什么**：诊断环境、Git、终端、app-server、线程库存。**步骤**：`codex doctor` / `codex doctor --json`。**本地**：✅ 已运行，见 README。**问题**：PATH 双安装 → 统一 `which codex` 或只用 `/workspace/tools/node_modules/.bin/codex`。

### 命名 Permission Profiles（#21559）

TUI `/permissions` 支持命名配置文件。**未实测 GUI**。

### Vim 文本对象与可配置中断键（#24382, #24766）

**未实测**。

---

## Sites / Plugins 企业化（延续 6/1 稳定版上下文）

> OpenAI 在 2026-06-01 稳定线强调 **Codex Sites** 与 **角色插件**；本地 `codex features list` 显示 `plugins: stable`, `plugin_sharing: stable`。

### Sites — 管理员开启 SOP

1. 企业 workspace 管理员登录 ChatGPT/Codex 企业控制台  
2. 启用 **Codex Sites** 与域名/SSO 策略  
3. 配置知识源连接（内部 wiki、Git 组织）  
4. 设定哪些 **角色插件** 对全员可用  
5. 审计导出与数据驻留区域  
6. 在 staging site 跑端到端问答

### Sites — 业务用户使用 SOP

1. 浏览器打开企业分配的 Codex Site URL  
2. 使用 SSO 登录  
3. 选择任务模板（如「季度财报摘要」）  
4. 上传允许的文件类型；不上传机密到未批准 site  
5. 将输出导出到 approved 存储

### Plugins — 管理员开启 SOP

1. Dashboard → Plugins → 批准 marketplace 源  
2. 上传企业私有 plugin bundle（#23983 修复 bundle 安装）  
3. 配置 `runtime extra skill roots`（0.137 #24977）  
4. 下发 `config.toml` 默认启用列表

### Plugins — 业务用户使用 SOP

1. TUI/IDE：`/plugin` 发现已批准插件  
2. 启用所需 skill（注意 `defaultEnabled: false` 插件需手动 enable）  
3. 在 prompt 中 `@plugin` 引用  
4. 勿安装未批准第三方 marketplace

**未实测原因**：无企业 workspace；以 [developers.openai.com/codex](https://developers.openai.com/codex) 与 GitHub 0.136/0.137 changelog 为准。

---

## 升级与 PATH 建议

```bash
# 仅项目内使用（推荐本仓库）
cd /workspace/tools
npm install @openai/codex@latest
export PATH="/workspace/tools/node_modules/.bin:$PATH"
codex --version

# 若需 0.137 alpha 功能
npm install @openai/codex@0.137.0-alpha.4
```

**doctor 提示「global vs local」**：避免混用 `npm install -g` 与项目 `node_modules`；CI 中显式 `$(npm root -g)/.bin` 或 npx 路径。

---

## 交叉验证小结

| 特性 | 官方 | 社区/媒体 |
|------|------|-----------|
| archive | GitHub 6/3 | — |
| Python SDK | GitHub #24836 | LMSYS 等偏 V4，不冲突 |
| CODEX_API_KEY | #24666 | — |
| 0.136 doctor | #24261 | Releasebot 5/28 汇总 ✅ |

**对普通开发者**：6/3 可先做 **PATH 清理 + `codex login`**；需要 Python 集成则跟踪 **`openai-codex`** 包；Windows 企业等待 **sandbox setup** 出 stable 再统一部署。
