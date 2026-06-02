# Claude Code — 2026-06-02 特性与本地测试

## 版本信息

| 项目 | 值 |
|------|-----|
| 发布版本 | v2.1.160（2026-06-02 发布） |
| 本地 npm 版本 | **2.1.161**（略高于 GitHub Release，含后续补丁） |
| 安装方式 | `npm install @anthropic-ai/claude-code --prefix /workspace/tools` |

## 今日核心新特性

### 1. 动态工作流触发词改名：`workflow` → `ultracode`

- 在输入框输入 `ultracode` 会触发 Dynamic Workflows，并以**紫色（violet）**高亮
- 单词 `workflow` 不再触发；用自然语言描述仍可创建工作流
- **迁移提醒**：若已习惯输入 `workflow`，需立即切换

### 2. 安全写入确认（acceptEdits 模式增强）

以下路径写入前会弹出确认：
- Shell 启动文件：`.zshenv`、`.zlogin`、`.bash_login`
- Git 配置：`~/.config/git/`
- 构建工具配置：`.npmrc`、`.yarnrc*`、`bunfig.toml`、`.bazelrc`、`.pre-commit-config.yaml`、`.devcontainer/` 等

**意义**：防止 Agent 在自主模式下意外修改可执行配置，降低供应链攻击面。

### 3. grep 后直接编辑

单文件 `grep`/`egrep`/`fgrep` 结果现在满足 read-before-edit 检查，无需再单独 Read 一次。

### 4. 其他改进

- Auto mode 分类器延迟降低，减少 "could not evaluate this action" 阻断
- Background session 退出时先 SIGTERM 再 SIGKILL，让清理 handler 有机会执行
- 移除 `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` 环境变量（已 no-op）

---

## 本地测试过程

### 测试 1：版本与 CLI 可用性

```bash
cd /workspace/tools
npx claude --version
# 输出：2.1.161 (Claude Code)

npx claude --help
# 正常输出完整帮助，包含 agents、ultrareview、--effort 等子命令
```

**结果**：✅ 通过

### 测试 2：doctor 健康检查

```bash
timeout 15 npx claude doctor
```

**问题**：在无 TTY 的 Cloud Agent 环境中，`claude doctor` 会**挂起超过 15 秒**，无法完成。

**解决方案**：使用 `timeout` 限制等待时间；在真实终端（iTerm、Windows Terminal）中运行 doctor 可正常完成。

**感受**：doctor 似乎依赖交互式终端检测，CI/自动化场景体验不佳。

### 测试 3：非交互对话

```bash
npx claude -p "Say hello in one word" --max-turns 1
# 输出：Not logged in · Please run /login
```

**问题**：未配置 Anthropic OAuth 或 `ANTHROPIC_API_KEY`，无法测试 ultracode、grep-edit、安全确认等运行时特性。

**解决方案**：
1. 运行 `claude login` 完成 OAuth
2. 或设置 `ANTHROPIC_API_KEY` 环境变量
3. 或在已登录的本地机器上测试

### 测试 4：Background Agents 命令结构

```bash
npx claude agents --help
# 支持 --json 脚本化输出、--cwd 过滤、--effort 默认级别
```

**结果**：✅ CLI 结构清晰，适合脚本集成

### 测试 5：grep-before-edit 逻辑验证（模拟）

```bash
echo 'hello world' > /tmp/claude-test/test.txt
grep -n "hello" /tmp/claude-test/test.txt
# 1:hello world
```

**说明**：本地验证了 grep 命令本身；实际 Edit 免 Read 行为需在已登录的 Claude Code 会话中向 Agent 发起「grep 后 edit」任务验证。

---

## 问题汇总

| 问题 | 严重度 | 解决方案 |
|------|--------|----------|
| doctor 在无 TTY 环境挂起 | 中 | 加 timeout 或在真实终端运行 |
| 未登录无法测试核心 Agent 功能 | 高（测试限制） | 配置 API Key 或 OAuth |
| ultracode 触发词迁移 | 低（用户习惯） | 更新文档/ muscle memory |

---

## 使用感受

**优点**：
- v2.1.160 的安全确认非常及时——Agent 工具越来越强大，对 `.npmrc`、shell rc 文件的防护是必要的
- grep 后直接 edit 减少了无意义的 Read 往返，小改动更流畅
- 2.1.161 比 GitHub 上的 2.1.160 更新，npm 渠道迭代速度快

**待改进**：
- doctor 在非交互环境的行为需要优化（应快速退出并报告 TERM 问题，而非挂起）
- ultracode 改名对老用户有一定学习成本，建议在首次启动时提示迁移

**推荐行动**：
1. 立即将工作流触发词从 `workflow` 改为 `ultracode`
2. 在 acceptEdits / Auto mode 下留意新的安全确认弹窗——这是 feature，不是 bug
3. 升级命令：`npm update @anthropic-ai/claude-code`
