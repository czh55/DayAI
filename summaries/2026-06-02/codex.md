# 2026-06-02 · OpenAI Codex

## 官方近期重点（CLI 0.136.0，2026-06-01）

### 新功能摘要

| 功能 | 说明 |
|------|------|
| **会话归档** | TUI `/archive`；CLI `codex archive` / `codex unarchive`；归档后不可 resume/fork 直至恢复 |
| **OSC 8 链接** | TUI Markdown 中 URL 可点击；窄表格转为 key-value 仍保留链接 |
| **Amazon Bedrock** | 可将 Bedrock 配为模型提供商，用 AWS 鉴权与计费 |
| **CODEX_API_KEY** | 远程执行注册；remote-control WebSocket 改用短期 server token |
| **app-server --stdio** | 集成方可 stdio 模式启动 |
| **Windows 沙箱** | Alpha：`codex sandbox setup --elevated` |
| **图像生成扩展** | Feature-gated，走原生 image artifact 管线 |
| **Python SDK** | `pip install openai-codex`；`CodexConfig` 命名统一 |

### 0.135.0 延续能力（仍相关）

- `codex doctor`：环境 / Git / 终端 / app-server / 线程清单诊断  
- Vim 文本对象、可配置中断键  
- `--profile` 成为权限/沙箱配置主入口（**`-p` 不再是 prompt 简写**）

---

## 本地测试记录

### 安装

```bash
# 全局失败（EACCES）
npm install -g @openai/codex@0.136.0

# 成功：项目本地前缀
npm install --prefix /workspace/tools @openai/codex@0.136.0
```

### 测试 1：版本与命令面

```bash
/workspace/tools/node_modules/.bin/codex --version
# codex-cli 0.136.0

codex archive --help   # 子命令存在，参数清晰
codex features list    # 列出 stable/experimental flags
```

**结果**：通过。

### 测试 2：`codex doctor`

**现象（节选）**：

- ✓ Git 2.43、bundled `rg`、runtime 0.136.0  
- ✗ **auth**：无凭据  
- ✗ **install 路径不一致**：本地 `node_modules` 与全局 `/lib/node_modules` 前缀不同  
- ⚠ **websocket**：Responses WebSocket 失败（无 auth / 网络策略）  
- ✗ **TERM=dumb**：无颜色、非真实终端  

**解决方案**：

1. 统一安装：`npm config set prefix ~/.local` 且 PATH 优先，或始终用 `npx codex` / 项目内 `.bin`  
2. `codex login` 或设置 `OPENAI_API_KEY` / `CODEX_API_KEY`  
3. 交互 TUI 前：`export TERM=xterm-256color`  

**感受**：`doctor` 对云 CI/Agent 极其友好，比「静默失败」好得多。

### 测试 3：`codex exec` 非交互

**错误用法（踩坑）**：

```bash
codex exec -p "只回复 pong"
# error: invalid value ... for '--profile'
```

**原因**：`-p` / `--profile` 在 0.134+ 专指 **配置 profile 名称**，不再是 prompt。

**正确用法**：

```bash
echo "只回复 pong" | codex exec
# 或：codex exec "只回复 pong"
```

**现象（无 API Key）**：

```
HTTP error: 401 Unauthorized, wss://api.openai.com/v1/responses
ERROR: Reconnecting... 2/5 ...
```

另：`bubblewrap` 不在 PATH，Codex 回退 bundled bwrap（沙箱仍尝试启用）。

**解决方案**：配置 OpenAI 或 Bedrock 凭据后再测；Linux 可按文档安装 bubblewrap。

### 测试 4：Feature flags

```bash
codex features list | head
```

**观测**：`goals`、`multi_agent`、`browser_use`、`fast_mode` 等为 **stable**；`imagegenext` 等为 under development。

**感受**：Flags 透明，便于在自动化里 `--enable` / `--disable` 做可控实验。

---

## 使用感受

| 维度 | 评价 |
|------|------|
| CLI 成熟度 | 子命令丰富（doctor、archive、sandbox、app-server），适合脚本化 |
| 破坏性变更 | `--profile` 取代 `-p` prompt 是迁移痛点，老脚本需改 |
| 安全 | `/diff` 防仓库 hook、PowerShell 解析加固等体现「供应链意识」 |
| 云环境 | 无 TTY + TERM=dumb 时建议用 `exec` 而非完整 TUI |
| 与 Claude Code | Codex 更偏 OpenAI 生态 + Bedrock；Claude Code 更偏 Anthropic 插件/workflow |

## 建议验证路径（有 Key 后）

1. `codex login` → `codex doctor` 全绿  
2. 开一次交互会话 → `/archive` → `codex unarchive <id>`  
3. 配置 Bedrock provider，对比与 OpenAI 直连延迟  
4. `codex exec "列出 src 下所有 TODO"` 写入 CI  

## 参考

- [Codex Changelog June 2026](https://developers.openai.com/codex/changelog)
- [GitHub Release 0.136.0](https://github.com/openai/codex/releases/tag/rust-v0.136.0)
