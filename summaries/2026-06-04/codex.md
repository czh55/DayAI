# OpenAI Codex 每日技术札记 — 2026-06-04

**监测源**：https://github.com/openai/codex/releases · https://developers.openai.com/codex · https://aws.amazon.com/blogs/aws/get-started-with-openai-gpt-5-5-gpt-5-4-models-and-codex-on-amazon-bedrock/  
**npm 稳定版（本地）**：`0.137.0`  
**GitHub 当日预发布**：`0.138.0-alpha.1` ~ `alpha.4`（2026-06-04 密集发布）

> **版本对齐说明**：`npm install @openai/codex@latest` 在 2026-06-04 仍解析到 **0.137.0**；企业新特性（月度额度、云配置包、multi-agent v2 等）见 **0.138.0-alpha.1** release notes，生产环境请以你方渠道（npm stable / 内测 alpha）为准。

---

## 版本总览

| 渠道 | 版本 | 日期 |
|------|------|------|
| npm `@openai/codex` | 0.137.0 | 稳定 |
| GitHub Release | 0.138.0-alpha.1 | 2026-06-04 01:17 UTC |
| GitHub Release | 0.138.0-alpha.4 | 2026-06-04 22:01 UTC（触发时刻附近） |

**行业背景（6/1–6/4）**：OpenAI 模型与 **Codex on Amazon Bedrock 正式 GA**（6 月 1 日），企业可将 Codex 推理计入 AWS 承诺用量；与 Anthropic IPO 竞速、Cursor 3.7 Canvas 形成「多云 + 多 IDE Agent」格局。

---

## 特性一：企业月度额度显示（Enterprise Monthly Credit Limits）

### 是什么

TUI/状态界面展示 **企业月度 credit 上限与消耗**，便于管理员与开发者在 CLI 内自检配额，减少「突然限流不知原因」。

### 适用场景

- Enterprise / EDU workspace  
- 使用 Codex CLI 或 TUI 的长会话团队  

### 前置条件

- 组织已开通 Codex Enterprise 额度策略  
- `codex login` 完成（ChatGPT 或企业 SSO，以组织配置为准）  
- CLI ≥ 0.138.0-alpha.1（稳定版是否 backport 请 `codex --version` 核对）

### 详细使用步骤

1. 安装/升级：`npm install -g @openai/codex@latest`（或企业镜像）。  
2. 运行 `codex login` 完成认证。  
3. 启动 `codex` 进入 TUI。  
4. 查看状态栏或 `/status`（以实际 TUI 为准）中的 **monthly credit** 字段。  
5. 接近上限时切换 `fast` 模型或联系管理员扩容。

### 命令与配置示例

```bash
codex --version
codex login
codex
# TUI 内
/status
```

```toml
# ~/.codex/config.toml 片段（模型与区域示例）
model = "gpt-5.5"
model_provider = "openai"
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.137.0  ✅

./node_modules/.bin/codex doctor
# auth: 无凭据 ✗
# 无法验证 credit UI  ⚠️
```

### 问题与解决方案

1. **看不到 credit 字段**  
   - 确认 workspace 为企业版；升级 alpha 或等待 stable 合并  

2. **doctor 报 PATH 与全局 npm 不一致**  
   - 统一使用 `export PATH="/workspace/tools/node_modules/.bin:$PATH"`  

### 官方 vs 社区

| 来源 | URL |
|------|-----|
| GitHub 0.138.0-alpha.1 | https://github.com/openai/codex/releases |
| AWS GA 博客 | https://aws.amazon.com/blogs/machine-learning/openai-models-and-codex-on-amazon-bedrock-are-now-generally-available/ |
| 国内 | 36氪 / 虎嗅讨论 OpenAI 企业分发，与 Bedrock 叙事一致 |

### 分角色建议

- **个人**：通常无月度 credit 条，忽略。  
- **团队**：将 `/status` 截图纳入周报。  
- **企业**：与 AWS Cost Explorer 对账（若走 Bedrock）。

---

## 特性二：云托管配置包（Cloud-Managed Config Bundles）

### 是什么

企业管理员可通过云端下发 **config bundle**（权限、沙箱、模型路由等分层组合），客户端 **runtime 切换至 cloud config layer**，实现「总部策略一键覆盖」。

### 管理员开启 SOP

1. 在 OpenAI / 企业控制台创建 **Config Bundle**（名称、版本、requirements 层）。  
2. 绑定 workspace / EDU 组织。  
3. 配置 **transport** 与签名（见 app-server 文档 #24617–24622）。  
4. 通知开发机执行 `codex login` 并重启 CLI。  
5. 抽查 `codex doctor` → Configuration 段是否显示 **cloud-managed** 来源。  
6. 变更 bundle 后观察客户端是否自动拉取（注意缓存窗口）。

### 业务/开发者使用 SOP

1. 不在本地 `config.toml` 硬编码与总部冲突的 `approval_policy`。  
2. 遇到权限拒止，查看 TUI 提示的 **environmentId** / bundle 版本。  
3. 需要临时放宽时走工单，而非本地 `--dangerously-bypass`。  

### 命令与配置示例

```bash
codex doctor --all
codex doctor --json | jq '.configuration'
```

### 本地测试结果

无企业 bundle 下发，doctor 仅显示本地 `~/.codex/config.toml` ⚠️。

### 问题与解决方案

1. **本地改 config 不生效**  
   - 云 bundle 优先级更高；在控制台改 bundle  

2. **EDU workspace 策略异常**  
   - alpha.1 提及 EDU 专用路径，确认组织类型  

### 官方 vs 社区

- 官方 PR 索引见 release #24617–24622、#25963  
- 社区：企业合规博客多将其类比 MDM 配置描述 ⚠️

---

## 特性三：Multi-Agent v2（`followup_task`、按线程 runtime）

### 是什么

多 Agent 编排 v2：**每个 thread 保留 runtime 选择**；`assign_task` 重命名为 **`followup_task`**；子 Agent 元数据更清晰；dogfood 默认开启（#25266 等）。

### 适用场景

- 大型 repo 拆分「测试 Agent」「实现 Agent」  
- 长时程 Goal 扩展与 idle continuation 联用  

### 前置条件

- Feature flag：`multi_agent_v2`（`codex features list` 查看；本地为 **under development false** 于 stable 0.137.0）  
- alpha 渠道或企业预览开启  

### 详细使用步骤

1. `codex features list | grep multi_agent`  
2. 在 `config.toml` 启用（若组织允许）：  
   ```toml
   [features]
   multi_agent_v2 = true
   ```  
3. 在会话中要求 Codex spawn 子 agent 执行子任务。  
4. 使用 `followup_task` 向子线程追加指令（API/TUI 以 release note 为准）。  
5. 用 `codex doctor` 检查 thread 元数据是否含 `parent_thread_id`。

### 命令与配置示例

```bash
codex features list | grep multi_agent
```

### 本地测试结果

```bash
TERM=xterm-256color ./node_modules/.bin/codex features list | grep multi_agent
# multi_agent          stable             true
# multi_agent_v2       under development  false   ⚠️ stable 未开 v2
```

### 问题与解决方案

1. **子 Agent 无响应**  
   - 查 #25603 raw events 继承；升级 alpha  

2. **runtime 与主线程不一致**  
   - #25722 per-thread resolver；重启 session  

### 官方 vs 社区

- GitHub release 0.138.0-alpha.1  
- 国内量子位「单 Agent 时代结束」讨论多 Agent 趋势 — https://www.qbitai.com/2026/04/404130.html（概念一致，非 Codex 专项）

---

## 特性四：`codex plugin list --json` 与插件目录缓存

### 是什么

**机器可读**插件列表，供脚本/IDE 集成；**远程 catalog 建议缓存**加速 `plugin install` 体验。

### 详细使用步骤

1. 安装插件：`codex plugin install <id>`（以实际子命令为准，`codex --help` 查看）。  
2. 导出 JSON：`codex plugin list --json > plugins.json`  
3. CI 校验：`jq '.plugins | length' plugins.json`  
4. 清理重复：alpha.1 修复 local/remote curated 重复安装 (#25681)。  

### 命令与配置示例

```bash
codex plugin list --json
codex plugin list --json | jq .
```

### 本地测试结果

```bash
./node_modules/.bin/codex plugin list --json 2>&1 | head -20
# 无 auth 时可能失败  ⚠️
```

### 问题与解决方案

1. **malformed skills 字段**  
   - 降为 warning，不阻断加载 (#25717)  

2. **manifest 顺序错乱**  
   - #25491 保留 app manifest 顺序  

---

## 特性五：Goal 扩展与空闲续跑（Goal Extension / Idle Turn）

### 是什么

**Goal API** 与 **idle continuation**：长任务在空闲时注入 steering prompt；**Plan-mode gate** 从 idle injection 移除（#25577），使长自治任务更顺滑。

### 基础示例

```text
# TUI 内
设定 Goal：直到单元测试全部通过才停止。
每完成一个子模块运行 npm test。
```

### 进阶示例

```toml
# config.toml
[goals]
enabled = true
```

```bash
# 配合 archive 管理长会话
codex archive <session-id>
codex unarchive <session-id>
```

### 问题与解决方案

1. **Goal 超限**  
   - #25095 / #24628 处理 usage limit 错误  

2. **压缩 rollout 损坏标题**  
   - #25624 保留重命名标题  

---

## 特性六：Codex on Amazon Bedrock（6 月 1 日 GA）

### 是什么

企业通过 **AWS 凭据** 调用 **GPT-5.5 / GPT-5.5** 与 **Codex**，推理走 Bedrock **Responses API**，价格与 OpenAI 首方一致，用量计入 **AWS 承诺**。

### 管理员开启 SOP

1. 在 AWS 控制台开通 Bedrock OpenAI 模型访问（区域见 AWS 文档，如 **us-east-2**）。  
2. 创建 IAM 角色/用户，授权 `bedrock:InvokeModel`。  
3. 生成 **Bedrock API Key** 或配置 **SDK 凭据链**。  
4. 在开发者机器分发 `~/.codex/config.toml` 与 `~/.codex/.env`。  
5. 审计：开启 CloudTrail，限制 `openai.gpt-5.5` 仅生产账号。  

### 业务/开发者使用 SOP

1. 安装 Codex CLI / VS Code 扩展 / Desktop App。  
2. 配置 `model_provider` 与 `model = "openai.gpt-5.5"`。  
3. `codex login` 或设置 `AWS_BEARER_TOKEN_BEDROCK`。  
4. 在 IDE 内正常 `@codex` 任务；确认网络不出境（区域锁定）。  

### 命令与配置示例

```toml
# ~/.codex/config.toml
model_provider = "bedrock"
model = "openai.gpt-5.5"
```

```bash
export AWS_BEARER_TOKEN_BEDROCK="your-bedrock-api-key"
export AWS_REGION=us-east-2
codex doctor
codex "Explain this repo's auth flow"
```

### 官方 vs 社区

| 来源 | 一致性 |
|------|--------|
| https://aws.amazon.com/about-aws/whats-new/2026/06/amazon-bedrock-openai-models-codex-generally-available/ | ✅ |
| https://www.aboutamazon.com/news/aws/bedrock-openai-models | ✅ |
| 社区 jahanzaib.ai 称 4/28 曾为 preview，6/1 GA — 时间线一致 ✅ |

### 分角色建议

- **AWS 为主的企业**：优先 Bedrock 路径满足合规。  
- **已签 ChatGPT Enterprise**：评估是否双轨；注意预览功能 SLA。  

---

## 特性七：TUI 与平台修复（0.138.0-alpha.1 精选）

| 修复 | 开发者价值 |
|------|------------|
| F13–F24 键位 | 终端用户自定义 |
| 取消无输出 prompt 恢复草稿 (#25316) | 误触 Cancel 可继续编辑 |
| Windows SQLite / 沙箱 (#25490 等) | Windows CI 稳定 |
| MITM 托管 CA 导出 (#22668) | 企业代理环境 |
| `codex archive` / `/archive` (#25027) | 会话归档治理 |

### `codex archive` 示例

```bash
codex archive
codex unarchive <id>
```

---

## Codex Sites / Plugins 管理员 vs 用户 SOP（概要）

> **Sites**：托管 Web/应用扩展；**Plugins**：技能与 MCP 打包。以下按 release 中 **plugins stable** 整理。

### 管理员

1. 选定 allowed plugin marketplace URL（含 org 私有 registry）。  
2. 下发 cloud config bundle 禁止 `plugin install` 来自非白名单源。  
3. 运行 `codex plugin list --json` 定期审计。  
4. 对 **remote curated** 插件启用缓存策略（#25457）。  
5. 监控 **monthly credit** 与 Bedrock 账单。

### 用户

1. `codex plugin install <approved>`  
2. 在 TUI 用 `@plugin` 或 skills 调用  
3. 勿从未知 Git URL side-load  
4. 遇权限弹窗阅读 **environmentId**  

---

## 本地实测总表

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest

./node_modules/.bin/codex --version
# codex-cli 0.137.0 ✅

./node_modules/.bin/codex doctor
# 4 fail: auth, install path, updates path, terminal TERM=dumb
# 1 warn: websocket 401 (无 bearer) ⚠️

TERM=xterm-256color ./node_modules/.bin/codex features list
# 27 enabled ✅
```

---

## 参考链接

- https://github.com/openai/codex/releases  
- https://developers.openai.com/codex  
- https://aws.amazon.com/blogs/aws/get-started-with-openai-gpt-5-5-gpt-5-4-models-and-codex-on-amazon-bedrock/  
- https://www.huxiu.com/article/4863693.html  
