# Claude Code 每日技术札记 — 2026-06-04

**监测源**：https://code.claude.com/docs/en/changelog · https://github.com/anthropics/claude-code/releases  
**本地版本**：`2.1.163`（`npm install @anthropic-ai/claude-code@latest`，实测于 `/workspace/tools`）  
**当日发布**：GitHub Release **v2.1.163**（2026-06-04 21:52 UTC）

---

## 版本总览

| 项目 | 值 |
|------|-----|
| 发布日 | 2026-06-04 |
| 上一 notable | v2.1.162（6 月 3 日）、v2.1.161（6 月 2 日 OTEL/并行工具等） |
| 社区交叉 | [claudeupdates.dev](https://www.claudeupdates.dev/version/2.1.161) 追踪至 2.1.161；当日 163 以 GitHub 为准 |

**对开发者的总判断**：6 月 4 日版本偏**企业治理 + 后台 Agent 稳定性 + CLI 非交互可靠性**，没有新模型发布，但 Managed Settings 版本锁与 Hook 反馈循环对团队落地很关键。

---

## 特性一：企业版本锁（`requiredMinimumVersion` / `requiredMaximumVersion`）

### 是什么（机制说明）

Managed Settings 新增 **最低/最高 Claude Code 版本** 字段。启动时若当前 CLI 版本落在允许区间外，进程**拒绝启动**并提示安装受批准版本。机制在客户端本地比对 semver，不依赖网络二次校验（组织策略文件或云端 managed settings 下发）。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 金融/政务等需统一 CLI 版本的团队 | 个人开发者无 MDM |
| 防止员工自动 `claude update` 到未审计版本 | 需要频繁尝鲜 nightly 的研发小组（需放宽上限） |

### 前置条件

- Claude Code **Team / Enterprise** 或已配置 **managed settings** 的管理员权限  
- 管理员能向终端下发 `managed-settings.json` 或等效企业策略  
- 员工机器可访问受信安装源（npm、内部镜像或 IT 推送包）

### 详细使用步骤

1. **管理员**：在企业管理台或策略仓库定义允许版本区间，例如最低 `2.1.160`、最高 `2.1.200`。  
2. **管理员**：将策略同步到各端（GPO、Jamf、或 Claude 官方 managed settings 管道）。  
3. **开发者**：运行 `claude --version` 确认当前版本。  
4. **开发者**：启动 `claude`；若版本不符，阅读终端中的升级/降级指引。  
5. **开发者**：按 IT 文档执行 `npm install -g @anthropic-ai/claude-code@2.1.163`（或企业镜像等价命令）后重试。

### 命令与配置示例

```json
{
  "requiredMinimumVersion": "2.1.160",
  "requiredMaximumVersion": "2.1.200"
}
```

```bash
claude --version
claude doctor
```

### 本地测试结果

```bash
cd /workspace/tools && ./node_modules/.bin/claude --version
# 输出：2.1.163 (Claude Code)  ✅
```

未配置 managed settings 时不会触发拦截（本环境无企业策略文件）。

### 问题与解决方案

1. **启动即退出并提示版本不符**  
   - 排查：`claude --version` 与策略 JSON 区间  
   - 修复：安装区间内版本，或请管理员放宽 `requiredMaximumVersion`  

2. **npm 全局与项目本地版本不一致**  
   - 排查：`which claude` 与 `npm root -g`  
   - 修复：统一 PATH，优先使用 IT 指定的全局前缀  

### 官方 vs 社区交叉验证

| 来源 | 链接 | 一致性 |
|------|------|--------|
| 官方 | https://github.com/anthropics/claude-code/releases（2026-06-04） | — |
| 社区 | https://www.claudeupdates.dev/ | 社区站滞后 1–2 个小版本属正常 ⚠️ |

### 利弊与分角色建议

- **个人开发者**：无感；若加入企业后突然无法启动，先查版本锁。  
- **团队**：强烈建议与 CI 镜像版本对齐，避免「本地能跑、同事不能跑」。  
- **企业合规**：与变更窗口、渗透测试周期绑定，记录每次放宽上限的审批单。

---

## 特性二：`/plugin list` 与插件清单治理

### 是什么

新增 **`/plugin list`** 斜杠命令，可列出已安装插件，并支持 **`--enabled` / `--disabled`** 过滤。与 5 月下旬「`.claude/skills` 自动加载」配套，便于审计项目内隐式加载的技能包。

### 前置条件

- Claude Code ≥ 2.1.163  
- 项目或用户目录存在 `.claude/skills` 或 marketplace 已安装插件

### 详细使用步骤

1. 在项目根目录启动 `claude`。  
2. 输入 `/plugin list` 查看全部插件。  
3. 输入 `/plugin list --enabled` 仅看启用项。  
4. 结合 `/plugin` Discover 页对比「建议安装」与「已启用」差异。  
5. 对可疑插件执行 `/plugin disable <name>` 或从 `enabledPlugins` 配置移除。

### 命令与配置示例

```bash
# 交互会话内
/plugin list
/plugin list --enabled
/plugin list --disabled
```

```json
{
  "enabledPlugins": {
    "my-security-audit@team-marketplace": true
  }
}
```

### 本地测试结果

```bash
./node_modules/.bin/claude --help | grep -i plugin
# help 中含 plugin 相关子命令说明  ✅（非交互未实测 TUI 斜杠）
```

### 问题与解决方案

1. **`/plugin list` 显示 marketplace not found**  
   - 见 v2.1.152 修复说明：清理 `enabledPlugins` 中已删除的 marketplace 引用  
   - 运行 `claude doctor`  

2. **列表为空但 skills 仍生效**  
   - `.claude/skills` 自动加载不经过 marketplace；用 `ls .claude/skills` 核对  

### 官方 vs 社区

- 官方 changelog：https://github.com/anthropics/claude-code/releases（2026-06-04）  
- 国内媒体：36氪曾讨论 Cursor「套壳」Claude Agent SDK（2026-05 旧文），与插件机制无直接冲突，提醒企业区分「官方 CLI」与「第三方 IDE 封装」— https://www.36kr.com/p/3766536116732416  

### 分角色建议

- **个人**：上线新 skill 后跑一次 `/plugin list` 防重复。  
- **团队**：Code Review 检查 `enabledPlugins` 是否 pin 版本。  
- **企业**：禁止未审批 marketplace URL。

---

## 特性三：`/btw` 一键复制 Markdown 答案（`c to copy`）

### 是什么

`/btw`（By The Way 类快捷问答）结果区增加 **「c to copy」**：将原始 Markdown 复制到系统剪贴板，保留标题与代码块格式，便于贴入 Notion/飞书文档。

### 详细使用步骤

1. 在会话中运行 `/btw` 并输入问题。  
2. 等待流式输出完成。  
3. 按提示键 **`c`** 复制全文。  
4. 在目标编辑器 **Ctrl+V / Cmd+V** 粘贴验证格式。  
5. 若需二次编辑，在粘贴后再让 Claude 精简。

### 命令与配置示例

```text
/btw 用三句话解释本仓库的 CI 流水线
# 输出完成后按 c
```

### 本地测试结果

未在 TTY 环境实测按键；`claude --help` 确认 `/btw` 存在于命令体系 ⚠️（需真实终端验证剪贴板）。

### 问题与解决方案

1. **按 c 无反应（Linux 无 GUI 剪贴板）**  
   - 安装 `wl-copy` / `xclip`；全屏模式 2.1.161+ 已改进 Linux 剪贴板路径  

2. **WSL 复制失败**  
   - 2.1.160 起 WSL 用 PowerShell 互操作；执行 `/terminal-setup`  

### 官方 vs 社区

- 官方：2026-06-04 release notes  
- 社区：Reddit/HN 较少讨论该微功能；属体验型改进  

---

## 特性四：Stop / SubagentStop Hook 回传 `additionalContext`（不断话）

### 是什么

**Stop** 与 **SubagentStop** 类 Hook 可在 `hookSpecificOutput.additionalContext` 中返回文本，Claude 将其作为反馈继续对话，**不再被标记为 hook 错误** 而中断回合。适合「子 Agent 完成后的质检清单」自动化。

### 前置条件

- 项目 `.claude/settings.json` 或 hooks 配置目录  
- Hook 脚本退出码与 JSON 输出符合 Claude Code Hook 协议  

### 详细使用步骤

1. 在 `.claude/hooks/` 编写 `subagent-stop.sh`（示例见下）。  
2. 在 `settings.json` 注册 `SubagentStop` 事件。  
3. 启动子 Agent 任务，等待 SubagentStop 触发。  
4. 观察主会话是否收到 additionalContext 且无红色 hook 错误。  
5. 迭代脚本输出直至质检项被主 Agent 执行。

### 命令与配置示例

```json
{
  "hooks": {
    "SubagentStop": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/subagent-stop.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
#!/usr/bin/env bash
# .claude/hooks/subagent-stop.sh
cat <<'EOF'
{"hookSpecificOutput":{"additionalContext":"【子任务结束】请运行 npm test 并汇总失败用例。"}}
EOF
```

### 问题与解决方案

1. **Hook 仍显示 error**  
   - 检查 JSON 是否单行、字段名拼写  
   - `claude -d hooks` 过滤日志  

2. **Bash 条件 `if: "Bash(...)"` 误触发**  
   - 6 月 4 日版修复：模式匹配扩展到子 shell；升级至 2.1.163  

### 官方 vs 社区

- 官方：GitHub release 2026-06-04  
- 社区：与 Cursor Automations 的「cron Agent」形成对照 — 企业更倾向 Claude Hook 留在仓库内可审计  

---

## 特性五：`claude -p` 非交互可靠性（后台进程与 Bedrock/CI）

### 是什么

修复两类生产痛点：（1）**后台 Bash 永不退出** 导致 `claude -p` 挂死 — 现于 stdin 关闭约 **5 秒** 后终止后台 shell；（2）**CI=true 且无 ANTHROPIC_API_KEY** 时 Bedrock/Vertex/Foundry 误报需 API Key。

### 详细使用步骤

1. 在 CI 配置云厂商凭据（`AWS_PROFILE` / `GOOGLE_APPLICATION_CREDENTIALS` 等）。  
2. 避免无意义 `export CI=true` 除非确需检测。  
3. 脚本中使用 `claude -p "summarize diff" --output-format json`。  
4. 对长驻 `npm run dev` 类命令，避免在 `-p` 会话中后台启动，或确保可自动退出。  
5. 管道结束时确认进程退出码为 0。

### 命令与配置示例

```bash
export AWS_REGION=us-east-1
# 勿在无 Key 的 Bedrock 流水线设置 CI=true 除非已配置云凭据
claude -p "List top 3 risks in git diff" --output-format text < /dev/null
echo exit:$?
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/claude -p "say hi" 2>&1 | head -5
# 无 ANTHROPIC_API_KEY 时预期失败；与 Bedrock 修复逻辑一致  ⚠️
```

### 问题与解决方案

1. **hang 在 result 之后**  
   - 升级 2.1.163；检查是否有未退出的 `&` 后台任务  

2. **ANTHROPIC_API_KEY required on Bedrock**  
   - 升级并配置云凭据；勿单独依赖 CI 环境变量  

---

## 特性六：`claude agents` 与后台服务（6 月 4 日修复包）

### 是什么

当日修复包括：更新后重连**不丢失 running 后台任务**、Esc 退出 agent 视图**不再卡数秒**、从 state-grouped 视图派发时使用**打开 agents 视图时的 cwd**。

### 详细使用步骤

1. `claude update` 到 2.1.163。  
2. `claude agents` 打开列表，`! npm test` 派发后台会话。  
3. 附加到运行中会话，确认任务芯片与进程一致。  
4. 按 Esc 返回列表，确认 UI 响应 <1s。  
5. 在 monorepo 子包目录打开 agents 再派发，验证 cwd 正确。

### 命令与配置示例

```bash
claude agents
claude agents --json | jq '.[].waitingFor'
claude --bg --exec 'npm run test:unit'
```

### 本地测试结果

无 OAuth 凭据，未实测 agents TUI ⚠️；`claude --help` 含 `--bg`、`agents` 子命令 ✅。

---

## Ultracode 工作流：3 个完整 Prompt 模板

> **说明**：`workflow` 触发词已于 2.1.160 更名为 **`ultracode`**（输入框紫高亮）。以下模板适用于 `/effort` 支持 xhigh 的模型；不支持时 CLI 不再提供 ultracode 选项（6 月 3 日修复）。

### 模板 A — 安全审计（Audit）

```text
ultracode

目标：对当前仓库做供应链与密钥泄露审计。

范围：
- 仅读：依赖树（package-lock / poetry.lock）、.github/workflows、Dockerfile、.env.example
- 禁止：修改生产配置、访问外网非 allowlist 域名

交付：
1) CRITICAL/HIGH/MEDIUM 分级表（文件:行号）
2) 可自动修复项 vs 需人工项
3) 若发现硬编码密钥，给出轮换 SOP 草案

停止条件：无 CRITICAL 未处理方案时不标记完成。
```

### 模板 B — 框架迁移（Migration）

```text
ultracode

目标：将 src/legacy-api（Express 4）迁移到 src/api（Fastify 5），保持 OpenAPI 兼容。

约束：
- 每个子模块独立 PR 描述（markdown）
- 先写 characterization tests 再改实现
- 使用 worktree 隔离，不直接改 main 分支

步骤建议：
1) 盘点路由与中间件映射表
2) 生成测试脚手架
3) 逐路由迁移并跑 test
4) 更新部署文档

验收：npm test && npm run lint 全绿。
```

### 模板 C — 技术调研（Research）

```text
ultracode

目标：评估「Codex on Amazon Bedrock」是否适合我司（AWS 为主、数据不出境）。

请调研并输出：
- 认证路径（Bearer vs SDK 链）
- 区域可用性（us-east-2 等）
- 与现有 ChatGPT Enterprise 合同的成本对比假设
- 风险：预览功能、SLA、日志留存

输出格式：决策备忘录（1 页）+ 附录链接表。
引用需含官方 AWS 博客与 OpenAI 开发者文档 URL。
```

---

## 6 月 3 日延续特性（交叉引用，便于当日阅读）

若你尚未升级 6 月 3 日的 **v2.1.162**，建议同步关注：

- `claude agents --json` 的 **`waitingFor`** 字段（权限阻塞可视化）  
- **`--tools` 显式列出 Grep/Glob** 在原生搜索构建上生效  
- **Remote Control 常驻 footer pill**  
- **并行工具**：单条 Bash 失败不再取消同批其他工具（v2.1.161）

---

## 本地实测总表

| 命令 | 结果 |
|------|------|
| `claude --version` | 2.1.163 ✅ |
| `claude --help` | 完整 ✅ |
| `claude -p` | 无 API Key，认证失败（预期）⚠️ |
| `claude agents` | 未测 TUI ⚠️ |

---

## 参考链接

- https://github.com/anthropics/claude-code/releases  
- https://code.claude.com/docs/en/changelog  
- https://www.36kr.com/p/3766536116732416（国内：IDE 与 Claude Code 关系讨论）
