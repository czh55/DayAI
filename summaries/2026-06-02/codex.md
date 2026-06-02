# Codex — 2026-06-02 特性与本地测试

## 版本信息

| 项目 | 值 |
|------|-----|
| CLI 最新发布 | **rust-v0.136.0**（2026-06-01） |
| 本地安装 | **codex-cli 0.136.0** |
| 安装路径 | `/workspace/tools/node_modules/@openai/codex` |

---

## 今日重磅：Codex for Every Role（2026-06-02）

**来源**：[OpenAI 官方公告](https://openai.com/index/codex-for-every-role-tool-workflow/)

### 1. Sites（预览，Business / Enterprise）

将想法、分析、计划转为**可托管、可分享的交互式 Web 应用**：
- 客户评审页、财务场景规划器、发布里程碑看板等
- 工作区内 URL 分享，非静态文件
- 通过 **Codex 桌面应用** 使用；管理员在 workspace 设置中启用

**场景**：分析师把 Excel 模型变成领导可点的 scenario planner  
**局限**：CLI 侧无法直接创建 Sites；需企业账号与 Codex App

---

### 2. Annotations（扩展）

原用于代码/Markdown/网站的局部选中修改，现扩展至：
- 文档、电子表格、幻灯片
- Sites 内 UI 元素（如导航栏字体）

**场景**：只改幻灯片上一张图表的标签，无需重写整份 deck  
**利**：减少「全量重写」导致的风格漂移  
**弊**：依赖 Codex 对文档底层 schema 的理解，复杂格式可能失败

---

### 3. 六个角色插件

| 插件 | 目标用户 | 集成示例 |
|------|----------|----------|
| Data Analytics | 分析师 | Snowflake, Databricks, Hex, Tableau |
| Creative Production | 营销 | Figma, Canva, Shutterstock |
| Sales | 销售 | Salesforce, HubSpot, Slack |
| Product Design | 设计 | Figma, Canva, 原型 |
| Public Equity Investing | 公募投资 | FactSet, PitchBook, Moody’s |
| Investment Banking | 投行 | 可比公司、尽调材料 |

合计 **62 个应用、110 项技能**；可从 Codex plugin directory 安装。

**趋势信号**：非开发者占 Codex 周活约 20%，增速为开发者 3 倍。

---

## CLI v0.136.0 技术更新（本地可验证）

基于 [GitHub Compare v0.135.0...v0.136.0](https://github.com/openai/codex/compare/rust-v0.135.0...rust-v0.136.0)（108 commits）：

| 类别 | 亮点 |
|------|------|
| 会话管理 | `codex archive` / `unarchive`、`/archive` 斜杠命令 |
| TUI | OSC 8 超链接、紧凑 Markdown 表格、多行 hook 输出 |
| 安全 | `/diff` 防仓库配置注入执行、Windows sandbox 增强 |
| 平台 | Guardian 缓存键、ChatGPT token 刷新、MCP 1.7.0 |
| 多 Agent | multi_agent stable、multi_agent_v2 开发中 |
| Python SDK | Beta 发布流水线 |

---

## 本地测试过程

### 测试 1：版本与命令树

```bash
./node_modules/.bin/codex --version
# codex-cli 0.136.0

./node_modules/.bin/codex --help
# 子命令: exec, review, login, mcp, plugin, archive, features, doctor, sandbox, cloud...
```

**结果**：✅ 命令结构完整，与官方文档一致

---

### 测试 2：`codex doctor`

```
12 ok · 1 idle · 5 notes · 1 warn · 4 fail
```

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 版本 | ✅ current | 0.136.0 已是最新 |
| Auth | ❌ | 无 `~/.codex/auth.json` |
| Terminal | ❌ | `TERM=dumb`（云 Agent 无 TTY） |
| Install path | ⚠️ | 项目内 npm 与全局 `/lib` 路径不一致 |
| WebSocket | ⚠️ | 401（无 bearer token，预期） |
| Sandbox | ✅ | restricted fs + network |

**解决方案**：
- 认证：`codex login` 或设置 API Key 环境变量
- 交互 TUI：在真实终端运行，设置 `TERM=xterm-256color`
- 自更新：确保 PATH 指向同一 npm 前缀，或 `npm i -g @openai/codex@0.136.0`

---

### 测试 3：`codex features list`

稳定功能包括：`fast_mode`、`multi_agent`、`guardian_approval`、`hooks`、`goals`、`browser_use`、`image_generation` 等。

开发中：`code_mode`、`multi_agent_v2`、`memories`（experimental）等。

**感受**：功能开关丰富，企业可通过 config.toml 渐进启用。

---

### 测试 4：`codex archive` / `codex plugin`

```bash
codex archive --help    # 支持 UUID 或 session name
codex plugin --help     # add, list, marketplace, remove
```

**结果**：✅ v0.136.0 会话归档与插件管理 CLI 就绪（需登录后实际操作）

---

### 测试 5：`codex exec`（未登录）

未配置凭证，未执行完整 Agent 任务。`codex doctor` 表明 sandbox 与 git 检测正常，具备执行前提。

---

### 测试 6：Sites / Annotations / 角色插件

**无法本地完整测试** — 需 Business/Enterprise + Codex App + 管理员启用 Sites。

**交叉验证**：
- [VentureBeat](https://venturebeat.com/orchestration/openais-codex-update-lets-agents-build-interactive-enterprise-workspaces-via-sites-and-role-specific-plugins)：Sites 通过 OpenAI 托管，插件在 CLI 与桌面端均可用
- [The New Stack](https://thenewstack.io/openai-codex-knowledge-workers/)：Annotations 映射文档 schema 后局部编辑

---

## 问题与解决方案

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| `codex update` 无效 | 项目内 npm 与全局安装分离 | 对实际使用的路径执行 `npm i -g @openai/codex` |
| TUI 无颜色/光标 | `TERM=dumb` | 本地终端运行 |
| Sites 找不到 | 仅企业预览 | 联系管理员开启；使用 Codex App |
| 插件安装失败 | 未登录 / 区域限制 | `codex login`；确认 supported regions |
| WebSocket 失败 | 无 auth | 登录后重试；HTTPS fallback 可能仍可用 |

---

## 利弊深度分析

### Sites

| 利 | 弊 |
|----|-----|
| 非技术团队无需前端开发 | 数据在 OpenAI 托管，合规需审查 |
| 动态更新而非静态导出 | 预览期，API 可能变化 |
| 工作区 URL 协作 | 依赖 Enterprise 管理员开关 |

### 角色插件

| 利 | 弊 |
|----|-----|
| 开箱即用 62+ 应用连接 | 定制深度受限于 OpenAI 策划 |
| 降低销售/分析师上手成本 | 与现有 SaaS 许可费用叠加 |
| 未来开放合作伙伴插件生态 | 当前仅 6 个官方角色 |

### CLI 0.136.0

| 利 | 弊 |
|----|-----|
| archive/多 Agent/Guardian 成熟 | Rust 二进制体积大（~80MB wheel） |
| `doctor` 诊断全面 | 无登录几乎无法体验核心 Agent |
| 沙箱默认开启 | 复杂企业网络可能阻断 WebSocket |

---

## 实际使用建议

| 用户类型 | 建议 |
|----------|------|
| 开发者 | CLI `codex exec` + `workspace-write` sandbox；CI 用 `codex review` |
| 分析师/销售 | 桌面 Codex App + 对应角色插件；用 Annotations 迭代报告 |
| 企业管理员 | 先试点 Data Analytics 插件；评估 Sites 数据驻留 |
| 本仓库 Automation | 继续用 Cursor Cloud Agent；Codex 作对比参考需单独密钥 |

**升级命令**：

```bash
npm install -g @openai/codex@0.136.0
codex doctor
codex login
```
