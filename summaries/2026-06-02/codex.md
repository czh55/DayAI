# Codex — 2026-06-02 特性与本地测试

## 版本信息

| 项目 | 值 |
|------|-----|
| 今日发布 | Codex 企业版重大更新（Sites / Annotations / 角色插件） |
| 本地 CLI 版本 | **codex-cli 0.136.0** |
| 安装方式 | `npm install @openai/codex --prefix /workspace/tools` |

## 今日核心新特性

### 1. Sites（预览，Business / Enterprise）

- Codex 将想法、分析、计划转化为**托管交互式网页**
- 支持仪表盘、规划器、评审工作区、项目看板、画廊等
- 通过 workspace URL 分享给同事，无需下载文件

**合作伙伴**：Wix、Base44、Replit、Lovable、Figma、Emergent

### 2. Annotations

- 指向文档、电子表格、幻灯片或 Site 的**特定区域**
- Agent 仅修改选中部分，或以选中内容为上下文
- 开发者版 Annotations 已用于代码/Markdown，今日扩展到知识工作内容

### 3. 六个角色插件

| 插件 | 典型集成 |
|------|----------|
| 数据分析 | Snowflake、Databricks、Hex、Tableau |
| 创意制作 | 设计/内容工具链 |
| 销售 | Salesforce、HubSpot、Slack |
| 产品设计 | Figma 等 |
| 股权投资 | 金融数据源 |
| 投资银行 | 投行工作流 |

- 共聚合 **62 个业务应用**、**110 项自动化技能**
- 从 Codex plugin directory 安装；Business/Enterprise 管理员可控制底层 app 权限

### 4. 平台数据（OpenAI 内部报告）

- 周活用户约 **500 万**
- 非开发者占 **20%**，采用速度是工程师的 **3 倍**

---

## 本地测试过程

### 测试 1：版本与 CLI 结构

```bash
cd /workspace/tools
npx codex --version
# codex-cli 0.136.0

npx codex --help
# 子命令：exec, review, login, plugin, mcp, sandbox, doctor, features, cloud ...
```

**结果**：✅ CLI 安装正常，命令面丰富

### 测试 2：doctor 诊断

```bash
npx codex doctor
```

| 检查项 | 状态 | 说明 |
|--------|------|------|
| auth | ✗ | 未找到 Codex 凭证，需 `codex login` |
| websocket | ⚠ | WebSocket 失败，HTTPS fallback 可能仍可用 |
| terminal | ✗ | TERM=dumb，颜色和光标控制禁用 |
| runtime | ✓ | bun 0.136.0，linux-x86_64 |
| git | ✓ | 检测到 /workspace 仓库，分支 cursor/ai-aaf7 |
| install | ✓ | PATH 一致 |

**问题**：
1. 无认证凭证 — 预期行为，Cloud Agent 未配置 OpenAI 账号
2. TERM=dumb — Cloud Agent 非真实终端

**解决方案**：
- 运行 `codex login` 或设置 `OPENAI_API_KEY`
- 在真实终端（`export TERM=xterm-256color`）中运行以获得完整 TUI 体验

### 测试 3：Feature Flags 列表

```bash
npx codex features list
```

**关键 stable 功能**（本地已启用）：
- `apps` — 应用集成
- `plugins` / `plugin_sharing` — 插件系统
- `multi_agent` — 多 Agent
- `browser_use` / `computer_use` — 浏览器/计算机控制
- `fast_mode` — 快速模式
- `guardian_approval` —  Guardian 审批
- `shell_tool` / `shell_snapshot` — Shell 工具

**未发现独立 flag**：Sites、Annotations 未在 CLI feature list 中出现——推测为 **Codex App（桌面/Web）层面功能**，需 Business/Enterprise 账号在 App 中启用。

### 测试 4：Plugin 系统

```bash
npx codex plugin list
# No marketplace plugins found.

npx codex plugin --help
# 支持 add, list, marketplace, remove
```

**问题**：本地未配置 plugin marketplace，无法安装今日发布的 6 个角色插件。

**解决方案**：
1. 在 Codex App 中通过 plugin directory 安装（需企业账号）
2. 配置 marketplace snapshot 后 CLI 可 `codex plugin add`

### 测试 5：非交互 exec

```bash
npx codex exec "say hello in one word"
# 无 auth 时命令挂起等待认证
```

**问题**：无凭证时 exec 不会快速失败，而是长时间等待。

**解决方案**：测试前先 `codex login`；或在脚本中加 timeout。

---

## 问题汇总

| 问题 | 严重度 | 解决方案 |
|------|--------|----------|
| Sites/Annotations 无法通过 CLI 测试 | 高（功能限制） | 需 Codex App + Business/Enterprise 账号 |
| 角色插件需 marketplace + 企业权限 | 高（权限限制） | 在 App 内安装，管理员开启 Sites 权限 |
| exec 无 auth 时挂起 | 中 | 先 login 或加 timeout |
| TERM=dumb 警告 | 低 | 真实终端环境可忽略 |

---

## 使用感受

**战略意义**：
- 今日更新是 OpenAI 将 Codex 从「AI 编程工具」推向「企业知识工作平台」的关键一步
- Sites 让非开发者也能获得「可分享的交互式产出物」，而不只是 chat 回复或本地文件
- Annotations 解决了「改整个文档 vs 改一行」的精度问题——这对表格和幻灯片尤其重要
- 62 个 app 集成说明 OpenAI 选择做**编排层**而非替换 SaaS

**CLI vs App 分裂**：
- 开发者熟悉的 Codex CLI 继续强化 shell、MCP、plugin、multi_agent
- 今日 headline 功能（Sites、Annotations、角色插件）明显偏向 **Codex App**
- 建议在文档中更清晰地区分「CLI 能力」和「App 能力」，避免开发者找不到 Sites

**与 Claude Code 对比（今日）**：
| 维度 | Codex | Claude Code |
|------|-------|-------------|
| 企业知识工作 | Sites + 角色插件 | Dynamic Workflows (ultracode) |
| 精准编辑 | Annotations | grep 后直接 Edit |
| 安全 | guardian_approval | shell rc / npmrc 写入确认 |
| 多 Agent | multi_agent (stable) | background agents + ultracode workflows |

**推荐行动**：
1. Business/Enterprise 用户：在 Admin Settings 启用 Sites 预览
2. 从 plugin directory 安装与自己角色匹配的插件
3. CLI 用户：先 `codex login`，再探索 `codex plugin marketplace` 配置
