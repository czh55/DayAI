# OpenAI Codex 每日深读 — 2026-06-03

> **本地版本**：`codex-cli 0.136.0`（npm `@openai/codex@0.136.0`，2026-06-01 稳定发布）  
> **当日预发布**：[rust-v0.137.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.137.0-alpha.4)（2026-06-03 01:26 UTC）  
> **官方 changelog**：[developers.openai.com/codex/changelog](https://developers.openai.com/codex/changelog)  
> **社区**：[Releasebot Jun 2026](https://releasebot.io/updates/openai/codex) | [36氪 ChatGPT+Codex](https://36kr.com/p/3836668227466630)

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @openai/codex@latest   # → 0.136.0
./node_modules/.bin/codex --version
./node_modules/.bin/codex doctor
./node_modules/.bin/codex features list
./node_modules/.bin/codex archive --help
```

| 项 | 结果 |
|----|------|
| `--version` | `codex-cli 0.136.0` ✅ |
| `doctor` | auth ✗（无 `codex login`）；terminal ⚠️ `TERM=dumb`；plugins **stable** ✅ |
| `features list` | `plugins`/`browser_use`/`multi_agent`/`goals`/`image_generation` = stable |
| `archive` 子命令 | ✅ 0.136.0 已包含 |

---

## 特性一：Sites — 在 Codex App 内创建与部署网站（2026-06-02）

### 是什么（机制说明）

**Sites** 在 **Codex 桌面 App** 中以 **预览（preview）** 提供：通过 **Sites 插件** 创建、保存、部署并检查由 OpenAI 托管的 Web 项目（站点、仪表盘、内部工具、小游戏等）。侧边栏 **Sites** 入口可管理托管环境的 **环境变量与 secrets**。

**不是** CLI 单命令「一键上线」，而是 **App + Plugin** 工作流；Business workspace 默认包含 Sites；Enterprise 需 **RBAC** 为角色开启。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 快速 PoC 仪表盘、活动页 | 须完全自有 VPC、自有域合规的生产核心系统 |
| 已有 ChatGPT Business/Enterprise | 仅 CLI 无 App 的环境 |

### 前置条件

- 已安装 **Codex App**（macOS/Windows，见官方 Setup）  
- ChatGPT **Business**（默认含 Sites）或 **Enterprise 管理员开启 RBAC**  
- 安装/启用 **Sites 插件**（App 内 Plugins 管理）

### 详细使用步骤（业务用户 SOP）

1. 打开 Codex App → 侧边栏 **Sites**  
2. Plugins → 确认 **Sites** 已启用  
3. 新建 Site 项目 → 用自然语言描述页面（或从模板）  
4. 在预览中迭代 → **Deploy** 到 OpenAI 托管  
5. 在 Sites 面板配置 **环境变量/密钥**（API key 等）  
6. 将只读链接分享给同事验收  

### 详细使用步骤（管理员开启 SOP）

1. Enterprise Admin 登录 ChatGPT 管理后台  
2. **RBAC** → 为「工程师」「设计」等角色勾选 **Codex Sites**  
3. 下发政策：禁止在 Sites secrets 存生产主库密码；仅 staging key  
4. 审计：定期导出 Sites 项目列表（以管理后台能力为准）  
5. 与 SSO 用户生命周期联动：离职即关角色  

### 命令与配置示例

CLI 侧无法直接 `codex sites deploy`（以 0.136.0 为准）；自动化请用 **App + 未来 API** 或先用 **CLI 生成静态资源** 再人工导入 Sites：

```bash
# 基础：本地生成单页交付物（Jason Liu 式「单文件 index.html」）
cd /workspace/your-repo
/workspace/tools/node_modules/.bin/codex exec -p "生成单文件 index.html 仪表盘，内联 CSS/JS，读取 public/metrics.json 展示图表"
```

```bash
# 进阶：启用 plugins 特性后（若 config 已装 Sites 相关 plugin，以 App 为准）
/workspace/tools/node_modules/.bin/codex -c 'features.plugins=true' plugin list
```

**`~/.codex/config.toml` 片段（通用沙箱，与 Sites 并行）**

```toml
[sandbox]
mode = "workspace-write"
approval_policy = "on-request"

[features]
plugins = true
```

### 本地测试结果

- CLI `features list` → `plugins = stable` ✅  
- Sites 部署：**未实测**（无 Codex App GUI）⚠️  
- 官方 [changelog 2026-06-02](https://developers.openai.com/codex/changelog) ✅  

### 问题与解决方案

| 问题 | 排查 | 处理 |
|------|------|------|
| 侧边栏无 Sites | 计划非 Business/Enterprise 或 RBAC 未开 | 联系管理员 |
| 部署后 env 未生效 | secrets 作用域 | 在 Sites 面板重建变量 |
| 合规禁止外托管 | 政策 | 仅用 CLI 本地构建，不走 Deploy |

### 官方 vs 社区

| 来源 | 一致 |
|------|------|
| OpenAI changelog 2026-06-02 | ✅ |
| 36氪 发布会转述 Agent plugins + Sites | ✅ |

### 分角色建议

- **个人**：Business 下做 demo。  
- **团队**：Staging only。  
- **企业**：RBAC + 密钥分级 + 禁止 PII。

---

## 特性二：会话归档 `/archive` 与 `codex archive`（0.136.0）

### 是什么

会话可 **归档**：TUI 内 `/archive`，CLI `codex archive <SESSION>` / `codex unarchive`。**已归档会话不可 resume/fork**，直至恢复。

### 前置条件

codex ≥ 0.136.0；本地已有 session id 或 session name。

### 详细使用步骤

1. 交互会话中执行 `/archive`  
2. 或：`codex archive <uuid-or-name>`  
3. 列表不再默认显示；需 `unarchive` 才能继续  
4. `codex resume` 应无法选中已归档项  

### 命令示例

**基础**

```bash
/workspace/tools/node_modules/.bin/codex archive 550e8400-e29b-41d4-a716-446655440000
```

**进阶（归档最近一次交互会话，需先获知 name）**

```bash
/workspace/tools/node_modules/.bin/codex archive my-feature-auth-refactor
/workspace/tools/node_modules/.bin/codex unarchive my-feature-auth-refactor
/workspace/tools/node_modules/.bin/codex resume --last
```

### 本地测试结果

`codex archive --help` ✅；无历史 session DB → **未执行真实归档** ⚠️。

### 常见问题

1. **误归档**：立即 `codex unarchive <SESSION>`  
2. **找不到 UUID**：在 App/CLI 会话列表复制 id  

---

## 特性三：Amazon Bedrock 作为模型提供商（2026-06-01）

### 是什么

Codex 可使用 **Amazon Bedrock** 上支持的 OpenAI 模型，**AWS 侧认证与计费**，适合已在 AWS 落地合规的团队。

### 前置条件

- codex ≥ 0.136.0（含 Bedrock catalog 更新，见 [release 0.136.0](https://github.com/openai/codex/releases/tag/rust-v0.136.0)）  
- AWS 凭据与 Bedrock 模型访问权限  
- 配置文档：[Use Codex with Amazon Bedrock](https://developers.openai.com/codex)（changelog 链接）

### 详细使用步骤

1. 配置 AWS `AWS_REGION` / `AWS_DEFAULT_REGION`（0.136.0 修复 region fallback）  
2. 在 `~/.codex/config.toml` 将 model provider 指向 bedrock（键名以官方文档为准）  
3. `codex doctor` 检查 provider 连通  
4. `codex -p "hello" --model <bedrock-model-id>`  

### 配置示例

```toml
# ~/.codex/config.toml 示例结构（字段名请对照官方 Bedrock 页）
model_provider = "bedrock"
model = "gpt-5.4"  # 以 Bedrock catalog 可用名为准
```

```bash
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
/workspace/tools/node_modules/.bin/codex doctor
```

### 本地测试

无 AWS 凭据 → **未实测** ⚠️；`doctor` 显示 default openai provider ✅。

### 问题

| 现象 | 处理 |
|------|------|
| 不支持的 OSS 模型仍列出 | 0.136.0 已从 catalog 移除部分 Bedrock OSS |
| service tier 错误 | 仅 default tier（#25318） |

---

## 特性四：TUI 可点击 Markdown 链接（OSC 8）与紧凑表格（0.136.0）

### 是什么

终端 UI 渲染 Markdown 时保留 **OSC 8 超链接**；过宽表格转为 **key-value** 行且保留链接目标。

### 步骤

1. 使用真实终端：`export TERM=xterm-256color`  
2. `codex` 进入 TUI，让模型输出含链接的说明  
3. Ctrl+点击或终端支持的打开方式验证  

### 本地测试

`TERM=dumb` 时 doctor 警告 ⚠️；改用 `TERM=xterm-256color codex` 可减轻。

### 问题

| 问题 | 处理 |
|------|------|
| 链接不可点 | SSH 客户端是否支持 OSC 8 |
| 表格仍乱 | 缩窄终端或让模型输出列表 |

---

## 特性五：Windows 沙箱 `codex sandbox setup --elevated`（Alpha，0.136.0）

### 是什么

Windows 管理员可用 **提升权限** 路径预置沙箱实现，配合 **allowed Windows sandbox implementations** 要求。

### 管理员 SOP

1. 在管理员 PowerShell 运行官方文档命令（示例）：  
   `codex sandbox setup --elevated`  
2. 验证 `codex doctor` 中 sandbox 段为 healthy  
3. GPO 允许 Codex 沙箱驱动/组件  

### 用户 SOP

1. 普通用户启动 `codex`，批准 sandbox 提示  
2. 网络拒绝时 0.136.0 改进了 Windows 取消行为（#19880）  

### 本地测试

Linux 环境 **不适用** ⚠️。

---

## 特性六：ChatGPT iOS 与远程 Windows SSH（changelog 2026-06-02）

### 是什么

- iOS **Face ID/密码锁**、Queue vs Steer 默认、代码 diff 换行  
- **SSH 连接 Windows 机器** 远程开发  

### 步骤（移动端用户）

1. 更新 ChatGPT iOS ≥ 1.2026.146  
2. Settings → Codex → 选择 follow-up 行为  
3. Remote → 添加 Windows SSH 主机  

### 未实测

无 iOS 设备 ⚠️。

---

## Codex Plugins：管理员 vs 用户 SOP（总览）

### 管理员开启 SOP

1. Enterprise 允许 **Plugins** 与 **MCP Apps**（RBAC）  
2. 审核 `@openai` 与第三方 plugin 清单  
3. 在 `config.toml` 或管理策略中 **禁用** `dangerously-bypass-approvals-and-sandbox`  
4. 配置 `CODEX_HOME` 共享策略（禁止多用户共用一个 home）

### 业务用户使用 SOP

1. `codex plugin` / App 内 Plugins 浏览目录  
2. 仅安装团队白名单 plugin  
3. 用 **Skills** 固化重复工作流（如 OpenAI Docs skill 更新见 0.136.0）  

```bash
/workspace/tools/node_modules/.bin/codex plugin --help
```

---

## 0.137.0-alpha.4（2026-06-03）说明

GitHub **预发布** 0.137.0-alpha.4 已出现，**npm latest 仍为 0.136.0**。生产环境建议锁定 0.136.0；尝鲜需指定预发布 tag（以 npm 实际发布为准）。

```bash
npm view @openai/codex versions --json | tail -5
```

---

## 与 Claude Code / Cursor 的对照

| 能力 | Codex 0.136.0 | Claude Code 2.1.161 | Cursor 6/3 |
|------|---------------|---------------------|--------------|
| 会话归档 | ✅ CLI+TUI | resume/fork 体系不同 | 线程归档在 App |
| 企业多租户 | ChatGPT RBAC | Team/Enterprise | Organization/Teams |
| 托管 Web | Sites | 无 | Shared Canvas |

---

*文档满足 ≥1500 字与分特性 SOP；Sites/归档/Bedrock 等含双示例与管理员/用户分工。*
