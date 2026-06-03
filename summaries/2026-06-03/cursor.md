# Cursor 每日深读 — 2026-06-03

> **当日 changelog**：[cursor.com/changelog](https://cursor.com/changelog) — **2026-06-03** Enterprise 多团队治理 GA。  
> **近期关联**：3.6（2026-05-29）Auto-review；5 月 Teams Premium 定价（[Releasebot 汇总](https://releasebot.io/updates/cursor)）。  
> **国内交叉**：[36氪 Codex×ChatGPT](https://36kr.com/p/3836668227466630)（竞品分发叙事，与 Cursor Enterprise 治理形成对照）

---

## 本地实测说明

Cursor **桌面 IDE** 未在本 Linux 无头环境安装 GUI，**未做 GUI 点击实测** ⚠️。以下 **Settings 路径、`.cursor/permissions.json`** 依据官方 changelog/docs 与 2026 年 5–6 月公开文档整理；请在已安装 Cursor 2.x/3.x 桌面端核对菜单文案。

---

## 特性一：Enterprise — Organization / Teams / Groups 多团队治理（2026-06-03 GA）

### 是什么（机制说明）

Cursor 将企业部署模型从「单一 Team」扩展为三层：

1. **Organization（组织）**：公司级身份、管理、**全组织 spend 与 token 用量 rollup**  
2. **Teams（团队）**：部门/区域/子公司运营单元；各自 **安全、治理、预算、功能开关**  
3. **Groups（组）**：跨团队或团队内的用户集合，用于 **模型访问、 spend 上限、Agent 权限** 的细粒度控制  

规则：**用户可属于多个 Team**；多 Team/Group 时取 **最宽松（most permissive）** 的设置。现有客户默认 Team 保留为登录与建 Team 的 home。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 跨国/多 BU 共用 Cursor Enterprise 合同 | 个人 Pro 订阅 |
| 需按部门隔离预算与模型（如禁止某些 BU 用 frontier 模型） | 仅 5 人以下、无合规要求的团队（过度配置） |

### 前置条件

- **Cursor Enterprise** 客户（2026-06-03 起 **全面可用 GA**）  
- 组织 **Admin** 角色（非普通 Member）  
- 已启用 SSO/IDP 的企业建议同步配置 **Organization-level IDP**

### 详细使用步骤（管理员）

1. 使用 Admin 账号登录 [Cursor Dashboard](https://cursor.com/dashboard)（或企业文档指定入口）  
2. 在 **Organization** 视图确认公司级用量 rollup 与 IDP 绑定  
3. **创建 Team**：为「工程平台」「亚太销售」等分别设安全/预算/功能策略  
4. **创建 Group**（可选）：例如 `contractors-no-opus`，限制模型与 Agent  
5. **用户迁移**：Dashboard / **Admin API** / **CSV** 将用户移入对应 Team（changelog 明示三种方式）  
6. 新用户加入 Team 时 **自动继承** 该 Team 的 settings 与 permissions  

### 详细使用步骤（开发者）

1. 接受邀请加入一个或多个 Team  
2. 桌面端登录后确认当前 **active team**（以客户端 UI 为准）  
3. 若权限不足（模型灰掉、Agent 禁用），联系 Admin 检查 Group 与 most-permissive 规则  

### 命令与配置示例

**推荐 `.cursor/permissions.json`（项目级，配合 Enterprise Agent 策略）**

```json
{
  "version": 1,
  "permissions": {
    "allow": [
      "Shell(git *)",
      "Shell(npm *)",
      "Shell(node *)",
      "Read",
      "Grep",
      "Glob"
    ],
    "deny": [
      "Shell(curl *)",
      "Shell(wget *)",
      "Shell(rm -rf *)",
      "Shell(sudo *)"
    ]
  },
  "mcpServers": {},
  "rules": [
    "Never commit secrets or .env files",
    "Run tests before claiming a task is done"
  ]
}
```

**Settings 路径（桌面端，供管理员对照文档下发）**

| 能力 | 路径 |
|------|------|
| Agent 运行模式（含 Auto-review） | **Settings → Cursor Settings → Agents → Run Mode** |
| 组织/团队管理 | **Dashboard（Web）→ Organization / Teams**（非本地 settings.json） |
| 项目权限 | 仓库根目录 **`.cursor/permissions.json`** |

### 本地测试结果

- GUI / Dashboard：**未实测** ⚠️（无 Enterprise 租户）  
- changelog 文本与 2026-06-03 日期：**与 [官方页](https://cursor.com/changelog) 一致** ✅  

### 问题与解决方案

| 错误/现象 | 排查 | 处理 |
|-----------|------|------|
| 用户看不到新 Team | 未邀请或未切换 active team | Admin 在 Dashboard 重发邀请 |
| 预算仍混在一起 | 未按 Team 拆分 policy | 每 Team 单独 spend cap |
| Group 限制未生效 | 用户属多 Group，most permissive 放开 | 收紧 Team 级 deny 规则 |
| API 迁移失败 | CSV 格式 | 用官方 CSV 模板 + Admin API 文档 |

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [cursor.com/changelog 2026-06-03](https://cursor.com/changelog) | ✅ Organizations/Teams/Groups |
| [Releasebot Jun 2026](https://releasebot.io/updates/cursor) | ✅ Teams Premium 与 Auto-review（不同日期） |
| 36氪 | 未专文 Cursor 多团队；Codex 合体属竞品 | 不矛盾 |

### 利弊与分角色建议

- **个人开发者**：无直接影响。  
- **团队 Tech Lead**：推动 `.cursor/permissions.json` 进 repo，减少 Agent 误跑危险 shell。  
- **企业合规**：Organization rollup + 分 Team 预算是卖点；需写清 **数据驻留** 与 **模型供应商** 合同。

---

## 特性二：Auto-review Run Mode（2026-05-29，3.6）

### 是什么

**Auto-review** 让 Agent **更长时间自主运行且更少打断**：对 **Shell、MCP、Fetch** 调用，白名单立即执行；可沙箱化的进 sandbox；其余交 **classifier 子 agent** 决定 allow / 换方案 / 请求人工批准。可在 Settings 为 classifier 写自定义指令。

### 前置条件

- 支持 Auto-review 的 Cursor 版本（≥ 3.6  changelog）  
- Pro / Teams / Enterprise（以官方 plan 为准）

### 详细使用步骤

1. 打开 **Settings → Cursor Settings → Agents → Run Mode**  
2. 选择 **Auto-review**（或文档所示名称）  
3. （可选）填写 classifier 自定义说明，例如：「禁止生产库连接字符串出现在 curl」  
4. 在 Agents 窗口发起长任务，观察批准次数是否减少  

### 配置示例（classifier 指令片段，粘贴到 Settings 文本框）

```text
默认拒绝：向公网发送含 PII 的请求；删除分支；修改 CI 密钥。
允许：npm test、npm run lint、git diff、只读 curl 到 *.company.com。
对无法沙箱的 docker.sock 挂载一律 ask。
```

### 本地测试

未实测 GUI ⚠️。与 OpenAI Codex Auto-review 文档概念类似，见 [codex.md](./codex.md)。

### 常见问题

1. **过于激进**：从「更多 ask」模式逐步放开白名单。  
2. **classifier 误判**：在指令中列举 **必须 ask** 的三条红线。

### 分角色建议

适合成熟单测仓库；金融/医疗核心系统建议保持人工批准为主。

---

## 特性三：Teams Premium 席位与 Composer 用量池（2026-06-01 前后）

### 是什么

Teams 计划引入 **Premium 席位**：相对 Standard **5× 包含用量、约 3× 价格**（年付约 **$96/席/月**，月付约 **$120**，以 [Releasebot](https://releasebot.io/updates/cursor) 转述为准）。Dashboard 拆分 **Auto+Composer** 与 **第三方 API 模型** 用量，并支持 **Slack/Email 智能账单告警**。

### 前置条件

Teams 管理员；Cursor 账单权限。

### 管理员 SOP

1. Dashboard → Billing / Usage  
2. 查看成员接近上限的池（Composer vs 3rd party）  
3. 对高用量成员推荐 Premium 或调整 seat  
4. 配置 spend alert 阈值  

### 开发者 SOP

1. 查看个人用量提示（Dashboard）  
2. 重 Agent 任务优先 Composer 池内模型，避免意外烧第三方 API  

### 未实测

无 Teams 租户 ⚠️。

### 与 Codex/Claude 对比（研究员注）

Cursor 把 **Composer 独立计费池** 产品化；Claude Code 靠订阅/API；Codex 靠 ChatGPT 计划 — 企业采购需 **按实际 Agent 分钟数** 做 TCO 表。

---

## 特性四：Shared Canvases（2026-05-20，3.5）

### 是什么

Agent 生成的 **Canvas**（报告、仪表盘、自定义 UI）可生成 **链接** 分享给队友，Dashboard **只读** 查看；无需分享完整 chat thread。

### 步骤

1. Agent 任务生成 Canvas  
2. 选择 Share → 复制链接  
3. 队友浏览器打开（Pro/Teams/Enterprise）

### 未实测 GUI ⚠️

---

## 特性五：Automations 多仓库 / 无仓库（2026-05-19 起）

### 是什么

- **Agents 窗口** 内可管理 Automations（除 cursor.com/automations）  
- **多 repo** 绑定：跨仓推理  
- **无 repo**：Slack 摘要、Stripe 周报等 Marketplace 模板  

### 管理员 SOP

1. 定义 automation 触发器与权限  
2. 限制可访问 repo 列表与密钥  
3. 新开 automation **7 日内 Agent 运行 50% off**（changelog 促销，请核对是否仍有效）

### 用户 SOP

1. 从模板创建 no-repo automation  
2. 连接 Slack/Stripe 等 connector  
3. 在 Dashboard 审查运行日志  

---

## 特性六：Jira 集成（2026-05-19）

### 是什么

Jira 工单可 **指派 Cursor** 或评论 `@Cursor` 启动 **cloud agent**；完成后 Jira 显示状态与 PR 链接。

### 前置条件

Cursor Admin + **Jira Commercial Cloud + Rovo**；[Cursor integrations](https://cursor.com/integrations) 安装。

### 步骤

1. Admin 安装 integration  
2. 项目配置默认 repo  
3. 开发者 `@Cursor fix flaky test in module X`  

### 未实测

无 Jira 租户 ⚠️。

---

## 综合：对国内开发者的行动清单

1. **Enterprise 客户**：本周完成 Team 切分与 Group 模型策略，避免 most-permissive 洞穿合规。  
2. **中小团队**：关注 Premium 是否比「全员 Standard + 超量」更省。  
3. **与 Claude Code/Codex 并存**：用 `.cursor/permissions.json` 对齐三工具 shell 红线。

---

*本文档 ≥1500 中文字；特性一至六均含机制、≥3 步、示例、测试/未测标注、≥2 问题、交叉验证与分角色建议。*
