# OpenAI Codex 每日技术文档 — 2026-06-10

> 监测源：[GitHub openai/codex releases](https://github.com/openai/codex/releases)、[developers.openai.com/codex](https://developers.openai.com/codex)  
> 本地实测版本：**codex-cli 0.139.0**（npm `@openai/codex@latest`）  
> 最新 GitHub Release：**0.140.0-alpha.4**（2026-06-10 pre-release）

---

## 今日综述

Codex 本周双线推进：6/2 产品层发布**角色插件 + Sites + Annotations** 扩至知识工作者；6/10 工程层 alpha.4 新增 **Code Mode 独立 Web 搜索**。CLI 本地 0.139.0 可正常运行 `doctor` 和 `features list`；需 `codex login` 才能执行实际任务。

---

## 特性一：Code Mode 独立 Web 搜索（0.140.0-alpha.4，6/10）

### 是什么（机制说明，非一句话）

Code Mode 是 Codex 中让 Agent 在沙箱内执行 JavaScript 的环境。alpha.4 起，Code Mode 可**直接调用独立 Web 搜索**，包括从嵌套 JavaScript 工具调用中发起搜索并接收纯文本结果。此前 Web 搜索需通过主 Agent 工具链，无法在 Code Mode 沙箱内直接使用。

### 适用场景

**适合：** 需要实时数据的自动化脚本、研究型 Agent、数据抓取+分析流水线  
**不适合：** 离线环境、有严格出站网络限制的企业沙箱

### 前置条件

- Codex CLI **≥ 0.140.0-alpha.4**（当前 npm latest 为 0.139.0，需手动安装 alpha）
- 有效 Codex 认证（`codex login`）
- `code_mode` feature flag 启用（`codex features list` 显示 `under development`）

### 详细使用步骤

1. 安装 alpha 版本（或等待 stable 发布）
2. 登录：`codex login`
3. 在 Codex 会话中启用 Code Mode
4. 编写需要实时搜索的 JavaScript 工具
5. 验证搜索结果被正确注入 Code Mode 上下文

### 命令与配置示例

```bash
# 检查当前版本与 feature flags
cd /workspace/tools
./node_modules/.bin/codex --version
./node_modules/.bin/codex features list | grep code_mode

# 安装 alpha（当 stable 发布后替换为 @latest）
npm install @openai/codex@0.140.0-alpha.4

# 登录
./node_modules/.bin/codex login

# 非交互执行（需认证后）
./node_modules/.bin/codex exec "Search for the latest Node.js LTS version and write a summary to node-lts.md"
```

### 本地测试结果

```bash
$ ./node_modules/.bin/codex --version
codex-cli 0.139.0

$ ./node_modules/.bin/codex features list | grep code_mode
code_mode                            under development  false

$ ./node_modules/.bin/codex doctor
# 12 ok · 4 fail（auth 缺失、TERM=dumb）⚠️
```

### 问题与解决方案

**错误 1：`code_mode` feature 不可用**
- 排查：`codex features list` 确认状态
- 解决：升级到 0.140.0-alpha.4+

**错误 2：Web 搜索返回空**
- 排查：`codex doctor` 检查 network sandbox 和 proxy 设置
- 解决：配置 `config.toml` 网络策略或请求管理员放开

### 官方 vs 社区交叉验证

| 来源 | 链接 | 一致性 |
|------|------|--------|
| [GitHub 0.140.0-alpha.4](https://github.com/openai/codex/releases) | #26719 Enable standalone web search in code mode | 基准 |
| [OpenAI Blog 6/2](https://openai.com/index/codex-for-every-role-tool-workflow/) | 产品方向一致 | 部分一致 |

---

## 特性二：角色特定插件（Role-Specific Plugins，6/2 发布）

### 是什么（机制说明，非一句话）

OpenAI 发布 6 个角色插件：**Sales、Data Analytics、Product Design、Creative Production、Investment Banking、Public Equity Investing**。每个插件打包角色特定的 skills、app 集成（62 个应用）、starter prompts 和工作流指导。另新增 66 个单应用插件（Databricks、Salesforce、Hex、Clay 等）。插件通过 Codex 插件目录安装，workspace 管理员控制底层 app 权限。

### 适用场景

**适合：** 非开发岗位（分析师、销售、设计师）使用 Codex、企业标准化工作流  
**不适合：** 纯软件开发（用默认 coding 能力即可）

### 前置条件

- ChatGPT Business/Enterprise workspace
- Workspace Admin 已在 Settings 中启用插件
- 目标区域在 supported regions 内

### 详细使用步骤

**管理员开启 SOP：**

1. 登录 ChatGPT Admin Console
2. 导航至 Workspace Settings → Codex → Plugins
3. 启用 Plugin Directory 访问
4. 为每个插件配置底层 app 权限（OAuth/API credentials）
5. 通知团队成员可安装的角色插件

**业务用户使用 SOP：**

1. 打开 Codex App 或 CLI
2. 进入 Plugin Directory
3. 搜索并安装目标角色插件（如 "Data Analytics"）
4. 按 starter prompt 完成 OAuth 授权
5. 开始对话，插件自动注入上下文和工具

### 命令与配置示例

```bash
# CLI 插件管理
./node_modules/.bin/codex plugin list
./node_modules/.bin/codex plugin marketplace list --json

# 安装插件（示例）
./node_modules/.bin/codex plugin add data-analytics

# 查看已启用 feature flags
./node_modules/.bin/codex features list | grep plugin
# plugins                              stable             true
# plugin_sharing                       stable             true
```

### 本地测试结果

```bash
$ ./node_modules/.bin/codex features list | grep plugin
apps                                 stable             true
plugin_hooks                         removed            false
plugin_sharing                       stable             true
plugins                              stable             true
skill_mcp_dependency_install         stable             true
```

✅ plugins feature stable；⚠️ 实际安装需 Business workspace 认证。

### 问题与解决方案

**错误 1：插件目录为空**
- 排查：区域限制、workspace 未启用
- 解决：联系 Admin 在 Settings 中开启

**错误 2：OAuth 授权失败**
- 排查：底层 app 权限未配置
- 解决：Admin 在 workspace settings 中完成 app 授权

### 官方 vs 社区交叉验证

| 来源 | 链接 | 一致性 |
|------|------|--------|
| [OpenAI Blog](https://openai.com/index/codex-for-every-role-tool-workflow/) | 6/2 发布 | 基准 |
| [Reworked.co](https://www.reworked.co/digital-workplace/openai-adds-plugins-to-codex/) | 6/3 报道 | 一致 |
| [Pulse2](https://pulse2.com/openai-codex-introduces-role-specific-plugins-sites-and-annotations-to-expand-beyond-software-development/) | 6/5 报道 | 一致 |

### 利弊分析 + 分角色使用建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 默认 coding 能力足够；角色插件非必需 |
| 团队 | 选 1-2 个角色插件试点（如 Data Analytics） |
| 企业 Admin | 先审计 app 权限范围；分 Team 启用不同插件集 |

---

## 特性三：Sites 交互式 Web 应用（Preview，6/2）

### 是什么（机制说明，非一句话）

Sites 允许 Codex 将想法、分析、计划转化为**可交互的托管 Web 应用**，通过 workspace 内 URL 分享。可创建 dashboard、planner、review workspace、project board、gallery 等。当前为 Business/Enterprise preview。

### 适用场景

**适合：** 内部数据看板、项目协作空间、评审工作区  
**不适合：** 对外公开发布（当前仅限 workspace 内分享）

### 前置条件

- Business 或 Enterprise workspace
- Enterprise Admin 在 admin settings 中启用 Sites

### 详细使用步骤

**管理员开启 SOP：**

1. Admin Console → Codex Settings → Features
2. 启用 "Sites" preview feature
3. 配置 workspace 内分享权限
4. 通知用户 Sites 功能可用

**业务用户使用 SOP：**

1. 在 Codex 中描述要创建的交互式页面
2. Codex 生成 Site 并提供 workspace URL
3. 通过 Annotations 局部修改
4. 分享 URL 给团队成员

### 命令与配置示例

```bash
# 检查 Sites 相关 feature
./node_modules/.bin/codex features list | grep -i app
# apps                                 stable             true
# in_app_browser                       stable             true
```

Sites 主要通过 Codex App GUI 创建，CLI 支持有限。

### 本地测试结果

⚠️ 需 Business/Enterprise 账号，未实测 Site 创建流程。

### 问题与解决方案

**错误 1：Sites 选项不可见**
- 排查：Admin 未启用 preview
- 解决：联系 Enterprise Admin

**错误 2：分享的 URL 同事无法访问**
- 排查：不在同一 workspace
- 解决：确认 recipient 已加入 workspace

---

## 特性四：Annotations 文档批注（6/2 扩展）

### 是什么（机制说明，非一句话）

Annotations 允许用户选中生成内容的**特定部分**请求定向修改，无需重建整个项目。6/2 起从代码/网站扩展至**文档、电子表格、演示文稿**。

### 适用场景

**适合：** 精修报告、调整表格公式、修改幻灯片局部  
**不适合：** 需要完全重写的内容（直接新对话更高效）

### 前置条件

- Codex App 最新版
- 已生成可批注的 artifact

### 详细使用步骤

1. 在 Codex 中生成文档/表格/演示稿
2. 选中需要修改的段落/单元格/幻灯片元素
3. 输入修改指令
4. Codex 仅修改选中部分，保留其余内容

### 命令与配置示例

通过 Codex App GUI 操作，无 CLI 等效命令。

### 本地测试结果

⚠️ 需认证后 GUI 操作，未实测。

### 问题与解决方案

**错误 1：选中后修改影响了其他部分**
- 排查：选中范围过大
- 解决：缩小选中范围，分步修改

**错误 2：Annotations 在 CLI 不可用**
- 原因：当前为 App 功能
- 解决：使用 Codex Desktop/App

---

## 特性五：`/app` Desktop 交接（0.139.0，6/8）

### 是什么（机制说明，非一句话）

`/app` 命令可将当前 CLI 线程**交接至 Codex Desktop**（macOS 和原生 Windows）。Windows workspace 启动可直接打开 Desktop 而非停在手动提示。

### 适用场景

**适合：** CLI 中开始任务后想在 GUI 中继续编辑  
**不适合：** Linux（不支持 Desktop 交接）

### 前置条件

- Codex CLI ≥ 0.139.0
- macOS 或 Windows 上安装 Codex Desktop
- 有效认证

### 详细使用步骤

1. 在 CLI 中启动任务
2. 输入 `/app`
3. Desktop 自动打开并加载当前线程上下文
4. 在 Desktop 中继续操作

### 命令与配置示例

```bash
# 启动 CLI 交互会话
./node_modules/.bin/codex

# 在 TUI 中输入
/app
```

### 本地测试结果

⚠️ 云环境 Linux 无 Desktop，未实测。GitHub Release #25638 确认功能。

### 问题与解决方案

**错误 1：`/app` 无响应**
- 排查：未安装 Desktop 或非 macOS/Windows
- 解决：安装 Desktop 或使用 Web 端

**错误 2：上下文丢失**
- 排查：CLI 版本过旧
- 解决：升级到 0.139.0+

---

## 特性六：Codex Doctor 增强（0.140.0-alpha.4）

### 是什么（机制说明，非一句话）

`codex doctor` 本地诊断工具新增 editor 和 pager 环境详情（本地报告完整显示，JSON 输出脱敏）。

### 适用场景

**适合：** 排查安装问题、CI 环境验证、支持工单  
**不适合：** —

### 前置条件

- 任意 Codex CLI 版本

### 详细使用步骤

1. 运行 `codex doctor`
2. 检查 fail/warn 项
3. 按提示修复（auth、PATH、terminal 等）
4. 重新运行验证

### 命令与配置示例

```bash
cd /workspace/tools
./node_modules/.bin/codex doctor
./node_modules/.bin/codex doctor --json
./node_modules/.bin/codex doctor --all
```

### 本地测试结果

```
codex-cli 0.139.0
12 ok · 1 idle · 5 notes · 1 warn · 4 fail
主要 fail：auth 缺失、npm global/local 路径不一致、TERM=dumb
```

### 问题与解决方案

**错误 1：`install` fail — npm prefix 不一致**
- 解决：统一使用本地 `node_modules/.bin/codex` 或 `npm install -g` 到同一 prefix

**错误 2：`auth` fail**
- 解决：`codex login` 或设置 `OPENAI_API_KEY`

---

## 检索记录

- GitHub Releases：2026-06-10 22:10 UTC
- developers.openai.com：2026-06-10 22:10 UTC
- 本地 npm install + doctor：2026-06-10 22:08 UTC
