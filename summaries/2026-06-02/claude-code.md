# 2026-06-02 · Claude Code

## 官方近期重点（v2.1.150 → v2.1.157 区间，文档 Week 22）

### 1. Claude Opus 4.8 成为默认

- 默认 **high effort**；更难任务可用 `/effort xhigh`
- **Fast mode**：约 2× 标准单价、约 2.5× 速度（Opus 4.8 定价档与 4.7 不同）
- 需要 **v2.1.154+**

### 2. Dynamic Workflows（研究预览）

- 用自然语言描述大型任务，Claude 编写编排脚本，在后台调度大量子代理
- 管理：`/workflows`；内置示例 `/deep-research`
- **Ultracode**：`xhigh` effort + 自动 workflow，适合极复杂任务（token/耗时显著增加）
- 关闭方式：`/config`、`disableWorkflows`、环境变量 `CLAUDE_CODE_DISABLE_WORKFLOWS=1`

### 3. security-guidance 插件

- 安装：`/plugin install security-guidance@claude-plugins-official`
- 在编辑、回合结束、commit/push 等阶段做模式匹配 + 模型审查
- 项目规则：`.claude/claude-security-guidance.md`

### 4. 其他值得关注的改动

- `claude agents`：输入 `!command` 或 `claude --bg --exec` 跑后台 shell 会话
- `.claude/skills` 自动加载
- `/simplify` 改为专注「清理/简化」而非完整 bug hunt
- Streaming tool execution 在 Bedrock/Vertex/Foundry 上默认开启
- 主模型不可用时会 fallback 到 `--fallback-model`（整 session）

---

## 本地测试记录

### 环境

```bash
npm install --prefix /workspace/tools @anthropic-ai/claude-code
# 实测版本：2.1.159（高于 changelog 提到的 2.1.154）
```

### 测试 1：版本与 CLI 面

```bash
/workspace/tools/node_modules/.bin/claude --version
# 输出：2.1.159 (Claude Code)
```

**结果**：通过。npm 包可离线安装，不依赖全局 `npm -g`（云环境常无 root）。

### 测试 2：非交互 `-p` 调用

```bash
claude -p "只回复：pong"
```

**现象**：

```
Not logged in · Please run /login
```

**问题**：无 Anthropic OAuth / API Key，无法验证 Opus 4.8、workflows、插件的实际推理质量。

**解决方案（给用户）**：

1. 在已登录机器执行 `claude` → `/login`
2. 或在 CI/沙箱使用 `ANTHROPIC_API_KEY` + `--bare`（见 `--help`，会跳过 OAuth/keychain）
3. 企业场景配置 Bedrock/Vertex/Foundry 凭据

### 测试 3：`claude agents` 子命令

```bash
claude agents --help
```

**结果**：通过。确认支持 `--effort`、`--model`、`--json`（脚本化列出后台会话）等参数，与官方「多后台会话」叙事一致。

**未测项**（需 TTY + 登录）：

- `←←` 打开 agents 视图
- `/workflows`、`/deep-research`
- security-guidance 实时代码扫描

---

## 使用感受

| 维度 | 评价 |
|------|------|
| 安装 | npm 本地前缀安装简单；比全局安装更适合容器/Agent |
| 文档 | Week 22 文档与 GitHub Release 信息对齐度高 |
| 差异化 | Dynamic Workflows + security 插件清晰对标「大型迁移/审计」与「安全左移」 |
| 门槛 | 完整体验强依赖登录；无头环境需提前规划 API Key 或 `--bare` |
| 与 Cursor 对比 | Claude Code 偏终端原生、子代理编排更显式；Cursor 偏 IDE/云 Agent 与审批流 |

## 建议尝试顺序（有账号后）

1. `claude` → `/effort` 查看 Opus 4.8 / fast mode  
2. `/plugin install security-guidance@claude-plugins-official` → 故意写一段含硬编码 key 的代码看是否拦截  
3. 对小仓库执行：`请为整个 repo 做一次安全审计，使用 workflow` → `/workflows` 观察后台任务  
