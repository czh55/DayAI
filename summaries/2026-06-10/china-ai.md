# 国内 AI 厂商与编程产品 — 2026-06-10

> 检索时间：2026-06-10 22:02 UTC  
> 轮询范围：阿里、百度、腾讯、字节、智谱、月之暗面、DeepSeek、讯飞、华为及其他  
> 本地实测路径：`/workspace/tools`

---

## 国内综述：今日最值得开发者关注的 3 条

1. **【今日更新】Kimi Code CLI v0.13.0**（6/10）：自定义颜色主题 + `/import-from-cc-codex` 一键从 Claude Code/Codex 迁移配置——国内编程 Agent 工具链互操作性里程碑。
2. **【昨日更新】Kimi Code CLI v0.12.0**（6/9）：`/swarm` 多 Agent 并行、完整代理环境变量支持、Goal/后台/Sub-Skill 转正——与 Claude Code 嵌套子 Agent、Cursor SDK nested subagents 形成对标。
3. **【持续促销】通义 Qwen3.7-Max 每日 200 次免费调用**（6/1 起延续）：面向 Qoder CN / QoderWork CN 用户，Agent 场景旗舰模型低成本试用窗口。

---

## 本地实测总览

```bash
# 国际（必做）
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version    # → 2.1.172 ✅
./node_modules/.bin/codex --version     # → 0.139.0 ✅
./node_modules/.bin/codex doctor        # → 12 ok, 4 fail (no auth) ⚠️
./node_modules/.bin/codex features list # → plugins/stable ✅

# 国内
npm install @qwen-code/qwen-code
./node_modules/.bin/qwen --version      # → 0.17.1 ✅
./node_modules/.bin/qwen --help         # → 完整子命令 ✅

pip install kimi-cli
kimi --version                          # → 1.47.0 (旧版 Python CLI) ⚠️
# 官方 Kimi Code CLI 0.13.0 需 curl 安装，npm 无官方包 → 未实测 ❌
```

| 产品 | 版本 | 状态 | 说明 |
|------|------|------|------|
| Qwen Code CLI | 0.17.1 | ✅ | `@qwen-code/qwen-code` npm 可装 |
| Kimi Code CLI (新) | 0.13.0 | ❌ 未实测 | 官方安装脚本，npm 无包 |
| kimi-cli (旧) | 1.47.0 | ⚠️ | Python 版，非今日文档目标 |
| DeepSeek API | — | ⚠️ | 无 API Key，仅文档 curl 模板 |

---

## 月之暗面 Kimi — Kimi Code CLI v0.13.0（今日更新）

### 是什么（机制说明，非一句话）

Kimi Code CLI 是月之暗面 2026 年 5 月从 Python 完整重写为 TypeScript/Node.js 的终端编程 Agent。v0.13.0（6/10）两大新功能：**自定义颜色主题**（JSON 调色板或 `/custom-theme` 交互生成）和 **`/import-from-cc-codex`**（从 Claude Code 和 Codex 一键导入指令、Skills、MCP 设置）。此外 marketplace 列表显示已安装插件的可用更新。

### 适用场景

**适合：** 从 Claude Code/Codex 迁移到国内 Agent 的开发者、需要品牌化终端主题的团队  
**不适合：** 仍依赖旧版 Python kimi-cli 的用户（配置格式不兼容）

### 前置条件

- Kimi Code CLI ≥ 0.13.0
- Node.js 18+（或通过官方 curl 安装脚本）
- Kimi API 凭证（Moonshot 平台）
- 迁移源：Claude Code（`~/.claude/`）或 Codex（`~/.codex/`）配置文件

### 详细使用步骤

1. 安装/升级 Kimi Code CLI（见安装命令）
2. 登录：`kimi` → 完成设备登录或 API Key 配置
3. 导入配置：输入 `/import-from-cc-codex`，选择要导入的指令/Skills/MCP
4. 自定义主题：输入 `/custom-theme` 交互选色，或手动创建 `~/.kimi-code/themes/my-theme.json`
5. 验证：检查 slash 命令面板和 MCP 列表

### 命令与配置示例

**基础：安装与导入**

```bash
# 官方安装（推荐）
curl -fsSL https://code.kimi.com/install.sh | bash

# 启动
kimi

# 在 TUI 中一键导入
/import-from-cc-codex
```

**进阶：自定义主题 JSON**

```json
// ~/.kimi-code/themes/solarized.json
{
  "name": "solarized",
  "base": "dark",
  "colors": {
    "background": "#002b36",
    "foreground": "#839496",
    "accent": "#268bd2",
    "error": "#dc322f",
    "success": "#859900"
  }
}
```

在 `config.toml` 中引用：

```toml
[tui]
theme = "solarized"
```

### 本地测试结果

| 项目 | 结果 | 状态 |
|------|------|------|
| `pip install kimi-cli` | v1.47.0（旧版 Python） | ⚠️ 非目标产品 |
| `npm install kimi-code` | 第三方 anthropic-proxy 包 | ❌ 非官方 |
| 官方 curl 安装 | 云环境未执行 | ❌ 未实测 |
| 官方文档 changelog | v0.13.0 功能描述完整 | ✅ |

**未实测原因：** 官方 Kimi Code CLI 无 npm 官方包，需 curl 安装脚本；旧版 Python kimi-cli 与新版架构完全不同，不能代表 v0.13.0 行为。

### 问题与解决方案

**错误 1：导入后 MCP 不工作**
- 排查：检查 `~/.kimi-code/config.toml` 中 MCP server 配置
- 解决：手动验证每个 MCP server 的 command/args

**错误 2：主题不生效**
- 排查：JSON 文件名是否与 `theme` 字段匹配
- 解决：确认文件在 `~/.kimi-code/themes/` 目录

### 官方 vs 社区交叉验证

| 来源 | 链接 | 一致性 |
|------|------|--------|
| [Kimi Code 官方 Whats New](https://www.kimi.com/code/docs/kimi-code/whats-new.html) | v0.13.0 6/10 | 基准 |
| [Kimi Code Changelog EN](https://www.kimi.com/code/docs/en/kimi-code-cli/release-notes/changelog.html) | 一致 | ✅ |
| 量子位 | 今日无专门 v0.13.0 报道 | — |

### 利弊分析 + 分角色使用建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 用 `/import-from-cc-codex` 无痛迁移；保留 Claude Code 作备选 |
| 团队 | 统一主题 JSON 品牌化；制定 MCP 白名单 |
| 企业 | 评估数据出境：Moonshot API 调用需符合备案要求 |

---

## 月之暗面 Kimi — v0.12.0 `/swarm` 多 Agent 并行（6/9 更新）

### 是什么（机制说明，非一句话）

`/swarm <任务>` 启动群组模式：多个 Agent 并行拆解同一目标，带实时进度展示和速率限制自动重试，任务完成后自动退出群组模式。同时 v0.12.0 正式发布了 Goal 模式、后台任务、Sub-Skill（移除实验 flag），以及完整的 HTTP/SOCKS 代理环境变量支持。

### 适用场景

**适合：** 大型代码库并行审计、多模块同时重构、需要代理访问的国内网络环境  
**不适合：** 简单单文件任务（swarm overhead 不必要）

### 前置条件

- Kimi Code CLI ≥ 0.12.0
- 有效 API 凭证
- 代理环境（如需要）：`HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY`/`NO_PROXY`

### 详细使用步骤

1. 升级至 0.12.0+
2. 配置代理（如需要）：设置环境变量
3. 输入 `/swarm 审计 src/ 下所有模块的安全漏洞`
4. 观察并行进度面板
5. 等待所有子 Agent 完成，查看汇总结果

### 命令与配置示例

```bash
# 代理配置
export HTTPS_PROXY=http://proxy.corp.com:8080
export NO_PROXY=localhost,127.0.0.1

# 启动并 swarm
kimi
# /swarm Review all packages in this monorepo for dependency vulnerabilities
```

### 本地测试结果

❌ 未实测（无官方 npm 包 + 无 API Key）

### 问题与解决方案

**错误 1：swarm 子 Agent 速率限制**
- 原因：API rate limit
- 解决：v0.12.0 内置自动重试；降低并行度

**错误 2：代理导致 localhost MCP 失败**
- 原因：代理拦截本地连接
- 解决：v0.12.0 已自动将 localhost 加入 NO_PROXY

---

## 阿里通义 / 百炼

**今日状态：无公开版本更新。**

持续中的促销（非今日发布）：
- Qwen3.7-Max 每日 200 次免费调用（6/1 起，覆盖 Qoder CN / QoderWork CN）
- Qwen3.7-Max/Plus 推理后付费限时 5 折/8 折

开发者可关注：
- [百炼 Model Studio](https://cn.aliyun.com/product/tongyi)
- [Qoder CN 帮助中心促销说明](https://help.aliyun.com/zh/lingma/product-overview/qwen3-7-max-limited-time-offer)

Qwen Code CLI 本地实测 0.17.1 可用（`npm install @qwen-code/qwen-code`）。

---

## DeepSeek

**今日状态：无公开更新。**

近期基础设施更新（4 月，非今日）：
- DeepGEMM Public Release 26/04：Mega MoE 融合算子、FP8×FP4、FP4 Indexer
- [GitHub PR #304](https://github.com/deepseek-ai/DeepGEMM/pull/304)
- [36氪报道](https://www.36kr.com/p/3770337582858759)

旧版 API（`deepseek-chat`/`deepseek-reasoner`）将于 **2026-07-24** 停用，需迁移至 V4。

**DeepSeek API curl 模板（无 Key 未实测）：**

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": false
  }'
```

---

## 今日轮询无更新

| 厂商/产品 | 检索时间 | 检索来源 | 结论 |
|-----------|----------|----------|------|
| 百度文心/Comate | 2026-06-10 22:15 | 百度 AI 开放平台 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 2026-06-10 22:15 | codebuddy.cn release notes | 最近 4.9.9（5/12） |
| 字节豆包/Trae/火山方舟 | 2026-06-10 22:15 | 火山引擎、Trae 官网 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 2026-06-10 22:15 | 智谱开放平台、GitHub THUDM | 今日无公开更新 |
| 讯飞星火/iFlyCode | 2026-06-10 22:15 | 讯飞开放平台 | 今日无公开更新 |
| 华为盘古/CodeArts | 2026-06-10 22:15 | 华为云 | 今日无公开更新 |
| MiniMax | 2026-06-10 22:15 | 官网 | 今日无公开更新 |
| 商汤 SenseNova | 2026-06-10 22:15 | 官网 | 今日无公开更新 |
| 昆仑万维天工 | 2026-06-10 22:15 | 官网 | 今日无公开更新 |
| 零一万物 Yi | 2026-06-10 22:15 | 官网 | 今日无公开更新 |
| 面壁 MiniCPM | 2026-06-10 22:15 | 官网 | 今日无公开更新 |

---

## 检索记录

- Kimi Code 官方 docs：2026-06-10 22:12 UTC
- 阿里/help.aliyun.com：2026-06-10 22:15 UTC
- 各厂商官网轮询：2026-06-10 22:15 UTC
