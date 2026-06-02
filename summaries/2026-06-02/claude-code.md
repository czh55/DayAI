# Claude Code — 2026-06-02 特性与本地测试

## 版本信息

| 项目 | 值 |
|------|-----|
| 今日发布 | **v2.1.160**（2026-06-02 02:10 UTC） |
| 本地安装 | **v2.1.161**（npm 解析到补丁版） |
| 安装方式 | `npm i @anthropic-ai/claude-code` in `/workspace/tools` |

---

## 重点新特性

### 1. 动态工作流触发词：`workflow` → `ultracode`

**背景**：5 月 28 日推出的 Dynamic Workflows 允许 Claude 编写编排脚本，并行运行数十至数百个子 Agent（上限 16 并发、1000 总计）。

**v2.1.160 变更**：
- 字面触发词从 `workflow` 改为 **`ultracode`**（输入框中紫色高亮）
- 自然语言如「use a workflow」仍然有效
- `/effort ultracode` 开启 xhigh 推理 + 自动工作流编排

**使用场景**：
- 全库安全审计、500 文件迁移、多源交叉验证研究
- 不适合：简单单文件修改（token 消耗显著更高）

**利弊**：

| 利 | 弊 |
|----|-----|
| 计划固化在脚本中，可 `/workflows` 保存复用 | 单次运行 token 远超普通对话 |
| 会话保持响应，后台跑 Agent | Enterprise 默认关闭，需管理员开启 |
| `/deep-research` 内置多阶段调研 | Pro 需在 `/config` 手动开启 |

**文档交叉验证**：[官方 Workflows 文档](https://code.claude.com/docs/en/workflows) 确认 v2.1.160 前触发词为 `workflow`，现已统一为 `ultracode`。

---

### 2. 安全加固（今日重点）

| 保护对象 | 行为 |
|----------|------|
| Shell 启动文件（`.zshenv`、`.bash_login` 等） | 写入前强制确认 |
| `~/.config/git/` | 同上 |
| `acceptEdits` 下的构建配置（`.npmrc`、`.bazelrc`、`.devcontainer/` 等） | 写入前确认 |

**建议**：生产环境保持默认权限模式，勿长期使用 `bypass permissions`。

---

### 3. grep 后可直接 Edit

单文件 `grep`/`egrep`/`fgrep` 现可满足「先读后改」检查，无需额外 `Read` 工具调用。

**实测**：逻辑合理，减少 Agent 往返；多文件 grep 仍需 Read。

---

### 4. 后台 Agent 大量修复

v2.1.160 修复列表包括：
- `claude agents` 恢复会话不再丢失历史、不再重跑原 prompt
- 后台 teardown 先发 SIGTERM 再 SIGKILL
- Windows/WSL 剪贴板改用 PowerShell 互操作
- Auto mode 分类器延迟优化

---

## 本地测试过程

### 测试 1：版本与 CLI 结构

```bash
cd /workspace/tools
./node_modules/.bin/claude --version
# 输出: 2.1.161 (Claude Code)

./node_modules/.bin/claude --help
# 确认: -p/--print 非交互、--agents JSON、mcp 子命令等
```

**结果**：✅ CLI 安装与帮助正常

---

### 测试 2：非交互模式 `-p`

```bash
./node_modules/.bin/claude -p "echo hello" --max-turns 1
```

**输出**：
```
Not logged in · Please run /login
```

**问题**：无 API Key / OAuth 时无法执行 Agent 逻辑。  
**解决方案**：
- 交互式：`claude` → `/login`
- CI/自动化：`ANTHROPIC_API_KEY` 或 `--settings` 注入 apiKeyHelper

**感受**：`-p` 适合脚本化，但云环境需提前配置密钥。

---

### 测试 3：动态工作流（无法完整执行）

**原因**：需 Max/Team/Enterprise 账号 + 登录态；本环境无凭证。

**文档验证**：
- 禁用方式：`/config` 关闭、`disableWorkflows: true`、`CLAUDE_CODE_DISABLE_WORKFLOWS=1`
- 首次运行会展示阶段计划并要求确认（Default 模式）

---

## 问题与解决方案汇总

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| `Not logged in` | 未配置认证 | `/login` 或 `ANTHROPIC_API_KEY` |
| 输入 `workflow` 不触发 | v2.1.160 已改名 | 改用 `ultracode` 或自然语言 |
| 工作流 token 爆炸 | 多 Agent 并行 | 先小范围切片试跑；`/workflows` 监控用量 |
| Enterprise 无工作流 | 默认关闭 | 管理员在 Claude Code 设置中启用 |

---

## 实际使用建议

1. **日常开发**：`/effort high`，勿默认开 ultracode
2. **大型任务**：prompt 含 `ultracode:` 前缀，或 `/deep-research <问题>`
3. **可重复流程**：跑完后在 `/workflows` 按 `s` 保存到 `.claude/workflows/`
4. **成本控制**：工作流前检查 `/model`；非关键阶段指定较小模型
5. **安全**：警惕 Agent 修改 `.npmrc` 等——v2.1.160 会拦截但需人工确认
