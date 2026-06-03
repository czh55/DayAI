# Cursor 每日深度 — 2026-06-03

- **参考版本**：**Teams 定价更新**（2026-06-01）、**3.6 Auto-review**（2026-05-29）、**Composer 2.5**（2026-05-18）
- **本地环境**：Cloud Agent Linux VM，**未安装 Cursor 桌面客户端**；GUI 路径与分享链接标注未实测
- **交叉验证**：[cursor.com/changelog](https://cursor.com/changelog)（抓取超时）、[Releasebot Jun 2026](https://releasebot.io/updates/cursor/cursor)、[Forum Auto-review](https://forum.cursor.com/t/auto-review-run-mode/161922)、[permissions 文档](https://cursor.com/docs/reference/permissions)

---

## 推荐 `.cursor/permissions.json`（完整示例）

保存为仓库根目录 **`.cursor/permissions.json`**。

**Settings 路径（Auto-review）**：`Settings` → `Cursor Settings` → `Agents` → `Run Mode` → **Auto-review**

```jsonc
{
  "mcpAllowlist": [
    "github:*",
    "linear:list_issues"
  ],
  "terminalAllowlist": [
    "git",
    "git status",
    "git diff",
    "git log",
    "npm test",
    "npm run lint",
    "pnpm test",
    "cargo test"
  ],
  "autoRun": {
    "allow_instructions": [
      "Allow read-only git and file inspection commands in the workspace root only.",
      "Allow unit tests and linters that do not deploy or mutate production systems.",
      "Allow read-only MCP and Fetch to documentation and package registry hosts."
    ],
    "block_instructions": [
      "Block npx, curl piping to shell, and any global package install.",
      "Block git push, force push, reset --hard, clean -fd, and branch deletion.",
      "Block writes to .env, secrets/, credentials, and shell startup files.",
      "Block MCP tools that modify production databases or billing."
    ]
  }
}
```

**合并规则**：项目级与 `~/.cursor/permissions.json` 的 allowlist **数组合并**；若文件存在则 **覆盖** IDE 内只读展示。

---

## 特性 1：Teams 定价与 Composer / 第三方 API 双池（2026-06-01）

### 是什么（机制说明）

Cursor 对 **Teams** 商业套餐调整计费结构：将用量拆为 **Auto + Composer** 池与 **第三方 API 模型**（如 Claude/GPT 非 Composer 路由）池；提高 Standard 席位包含额度；新增 **Premium** 席位（约 **5×** Standard 用量、**3×** 价格）。Dashboard 提供分池进度条与 **Slack/Email 花费告警**，并可根据使用行为推荐席位类型。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 10+ 人工程团队统一采购 | 仅偶尔用 Copilot 的个人 |
| Agent 重度、Composer 长任务多 | 几乎只用第三方 Claude API 且不用 Composer |

### 前置条件

- **Teams** 或 **Enterprise** 管理员权限  
- 新计费自 **2026-06-01** 起的新账单周期生效（以 Cursor 账单页为准）  
- 管理员可访问 [cursor.com](https://cursor.com) Dashboard

### 详细使用步骤（管理员 SOP）

1. 登录 Cursor Dashboard → **Billing / Team**  
2. 查看现有 Standard 席位数与两池用量历史  
3. 识别「Composer 池经常触顶」的成员 → 标记候选 **Premium**  
4. 在 Billing 中调整席位类型（Standard ↔ Premium 混合）  
5. 配置 **Spend alerts**：美元阈值 + Slack webhook 或邮件收件人  
6. 向团队公告：第三方模型与 Composer 消耗 **分开计数**  
7. 一个月后复盘 Dashboard 推荐与真实账单

### 详细使用步骤（开发者 SOP）

1. IDE 内查看用量提示（接近上限时 Dashboard 同步）  
2. 长 Agent 任务优先用 **Composer** 路由以吃 Composer 池  
3. 明确指定 Claude Opus 等第三方模型时消耗 **第三方池**  
4. 触顶前改用 **Claude Code / Codex CLI**（36氪 报道的「按量 vs 订阅」替代路径）  
5. 联系 admin 申请 Premium 或临时额度

### 命令与配置示例

无 CLI；管理员在 Dashboard 操作。团队策略文件仍用 `.cursor/permissions.json` 控制 Agent 行为，**不直接改用量池**。

### 本地测试结果

| 项 | 结果 |
|----|------|
| Dashboard 改价 | ❌ 未实测 — 无 Teams admin |
| Releasebot 与 36氪 产业文 | ✅ 价格区间一致（Standard ~$32–40/席·月，Premium ~$96–120） |

### 问题与解决方案

| 现象 | 排查 | 解决 |
|------|------|------|
| 额度突然变少 | 是否新周期拆分两池 | 阅读 Cursor 邮件说明 |
| Premium 仍不够 | 实际为第三方池耗尽 | 分开统计成员模型选择 |
| 告警未收到 | Webhook/邮件配置 | Dashboard 重配 alerts |

### 官方 vs 社区交叉验证

- Releasebot 2026-06-01 条目 — ✅  
- [36氪 Cursor 毛利与 Composer 2.5](https://36kr.com/p/3824027398951299) — **该文观点**：Composer 2.5 基于 Kimi K2.5 底座做编程特化 — 标注为 **媒体观点**，与 Cursor 官方 changelog 需对照  
- cursor.com/changelog — ⚠️ 本次抓取超时，以 Releasebot 为主、论坛为辅

### 利弊 + 建议

- **利**：重度 Agent 用户可用 Premium 降低超量焦虑  
- **弊**：双池增加认知负担；混用模型易误烧池  
- **Admin**：默认 Standard + 按数据升 Premium  
- **开发者**：repo 内文档写明「默认 Composer」  
- **企业合规**：保留 Claude Code 作第二供应商，避免单 IDE 锁定

---

## 特性 2：Auto-review Run Mode（3.6，持续有效）

### 是什么

对 **Shell、MCP、Fetch** 三类调用依次尝试：**白名单立即执行** → **沙箱执行**（macOS/Linux/WSL2）→ **LLM 分类子代理**（allow / 换方案 / 人工审批）。分类器可读 `permissions.json` 的 `autoRun` 自然语言规则；**非确定性、非安全边界**（官方论坛强调）。

### 适用场景

长时重构、测试循环、文档抓取；不适合生产删库、未经审计的 `curl | bash`。

### 前置条件

- Cursor **3.6+**，Pro/Teams/Enterprise  
- `Settings > Cursor Settings > Agents > Run Mode` = **Auto-review**  
- 建议配置 `.cursor/permissions.json`（见文首）

### 详细使用步骤

1. 打开 Settings → Cursor Settings → Agents → Run Mode → **Auto-review**  
2. 仓库根放置 `permissions.json`  
3. 新开 Agent，运行 `git status` 验证免审批  
4. 运行 `git push` 验证应被 block 或要求审批  
5. （可选）在 Run Mode 旁填写 classifier 自定义说明  
6. 团队：在 PR 模板要求提交 permissions 变更

### 命令与配置示例

无 CLI；验证配置加载：修改 `block_instructions` 后重启 Cursor，观察高危命令是否更频繁弹窗。

### 本地测试结果

❌ 未实测 GUI。Forum + Releasebot 与 2026-06-02 文档结构 — ✅ 一致。

### 问题与解决方案

| 现象 | 解决 |
|------|------|
| 仍每条都问 | 确认 Run Mode 非 Normal |
| 分类器误放行 | 收紧 `block_instructions`；敏感库改纯 Allowlist |
| 沙箱不可用 | Windows 非 WSL2 时跳过沙箱直达分类器 |

### 官方 vs 社区

- [Forum Colin 2026-05-29](https://forum.cursor.com/t/auto-review-run-mode/161922) — ✅  
- [Vibe Coder Blog](https://blog.vibecoder.me/cursor-auto-review-agentic-run-mode) 称分类器不消耗主模型 token — **社区观点**，官方 changelog 未写 token 计量  

### 示例 2（进阶）：仅 CI 目录可写

在 `block_instructions` 追加：

```jsonc
"Block any file write outside ./packages/ and ./apps/ except package-lock.json updates from npm install in root."
```

### 建议

**团队 Lead**：Auto-review + 严格 block；**安全**：生产仓库继续人工批准每条 push。

---

## 特性 3：Composer 2.5 与编程 Agent 定位（2026-05-18 起）

### 是什么

**Composer 2.5** 为 Cursor 自研编码模型迭代，面向 **长周期编程任务**；36氪 报道称基于 **Kimi K2.5** 底座并加大合成数据规模（**媒体说法**，Cursor 官方标注为自研 Composer 品牌）。与 **Teams 定价** 联动：Composer 消耗计入 Composer 池。

### 适用场景

全库重构、多文件特性；不适合极短补全（可用轻量模型）。

### 前置条件

- 支持 Composer 2.5 的 Cursor 版本  
- 账户有 Composer 额度

### 详细使用步骤

1. Agent 模式选择 **Composer 2.5**（Model picker）  
2. 给出带验收标准的任务（测试命令、目录范围）  
3. 使用 Auto-review 减少测试命令审批  
4. 对比同一任务在 Claude Code CLI 上的成本（36氪：部分团队转向按量 CLI）  
5. 记录 Composer 池消耗至 Dashboard

### 本地测试结果

❌ 未实测模型质量。Releasebot「Introducing Composer 2.5」— ✅ 存在该发布。

### 问题与解决方案

| 现象 | 解决 |
|------|------|
| 底座争议 | 以商业合约为准；评估时看 **SWE 基准与长任务** 而非品牌 |
| 额度不足 | Premium 席位或分流 CLI |

### 建议

**国内团队**：关注 Kimi 授权与数据驻留；**个人**：Composer 2.5 + 本地 `claude`/`codex` 双栈。

---

## 特性 4：Bugbot Teams / Individuals 更新（2026-06 索引）

### 是什么

Releasebot 在 2026-06 索引中列出 **Bugbot** 面向团队与个人的更新（具体条目以 changelog 为准）。Bugbot 为 Cursor 生态中的 **自动代码审查/修复** 能力，与 Agent 并行。

### 适用场景

PR 自动审查、组织级代码规范 enforced。

### 前置条件

- 关联 GitHub/GitLab（以官方为准）  
- Teams 套餐功能开关

### 详细使用步骤

1. Dashboard → 启用 Bugbot for organization  
2. 在 VCS 安装 Cursor GitHub App（若尚未）  
3. 配置审查规则严格度  
4. 在 PR 中观察 Bot 评论  
5. 与 `Auto-review` 区分：Bugbot 偏 **review**，Auto-review 偏 **Agent 工具执行**

### 本地测试结果

❌ 未实测。Releasebot 索引 — ✅ 有该标题。

### 建议

**Tech Lead**：Bugbot 管质量门禁，Auto-review 管 Agent 执行效率。

---

## 今日 Cursor 小结（2026-06-03）

6 月 3 日 **无** 新 changelog headline 进入检索窗口；**6 月 1 日 Teams 定价** 为对企业用户最可操作的变更，**5 月 29 日 Auto-review** 仍为个体开发者配置重点。建议动作：**管理员** 本周完成双池告警配置；**开发者** 提交 `.cursor/permissions.json` 并在 Run Mode 选 Auto-review；**评估 Composer 2.5 成本** 时对照 Claude Code 2.1.161 与 Codex 0.136+ 的按量方案。
