# OpenAI Codex 每日技术文档 — 2026-06-05

> GitHub Release：https://github.com/openai/codex/releases/tag/rust-v0.137.0  
> 开发者 Changelog：https://developers.openai.com/codex/changelog  
> 本地 CLI：**0.137.0**（`npm install @openai/codex@latest`）

## 今日综述

2026-06-04 OpenAI 发布 **Codex CLI 0.137.0** 稳定版（npm `@openai/codex@0.137.0`）；6/4–6/5 GitHub 上仍有 **0.138.0-alpha.x** 预发布。0.137.0 重点：**企业云配置 bundle**、**plugin list --json**、**Multi-agent v2**、TUI 增强、rollout 压缩与权限 environmentId。

产品层（非 CLI patch）：OpenAI 6 月初直播披露 **Codex 将 deeper 接入 ChatGPT**、**6 个业务插件**、**Annotations** 与 **Sites**（36氪 / developers.openai.com）。

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @openai/codex@latest

./node_modules/.bin/codex --version
# codex-cli 0.137.0

./node_modules/.bin/codex doctor
# 12 ok · 1 warn · 4 fail（无 auth、TERM=dumb、npm 路径双安装 — 预期）

./node_modules/.bin/codex features list
# plugins=stable, multi_agent=stable, goals=stable, ...

./node_modules/.bin/codex plugin list --json
# {"installed":[],"available":[]}  （无 marketplace 配置）
```

| 项 | 结果 |
|----|------|
| 版本 | ✅ 0.137.0 |
| doctor | ⚠️ 无 API Key；功能正常 |
| features list | ✅ |
| plugin list --json | ✅ 命令可用，空列表 |
| 交互推理 | ❌ 未实测（无 auth） |

---

## 特性一：企业云配置 Bundle（Cloud-managed config）

### 是什么

0.137.0 引入 **cloud-managed config bundle** 传输与分层：Enterprise/EDU workspace 管理员可下发统一 **config.toml 策略层**（模型、沙箱、插件、额度），客户端自动合并 requirements layers。TUI 可显示 **monthly credit limits**。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 全公司统一 Codex 安全基线 | 个人 hobby 单用户 |
| EDU / 企业多团队 | 无 ChatGPT Enterprise 的组织 |

### 前置条件

- Codex **0.137.0+**
- ChatGPT **Enterprise / Business / EDU** 管理员权限
- 组织已启用 cloud config bundle（Admin 控制台）

### 管理员开启 SOP

1. 登录 ChatGPT Enterprise Admin / Codex 企业管理页
2. 进入 **Cloud config** / **Policy bundles**（名称以控制台为准）
3. 创建 bundle：定义默认 model、approval policy、sandbox、禁用 features 列表
4. 将 bundle **绑定到 workspace 或 OU**
5. 通知开发者运行 `codex login` 重新拉取策略
6. 抽查：`codex doctor` 应显示 loaded config 与 org 限制

### 业务/开发者使用 SOP

1. `codex login` 使用公司账号
2. `codex doctor` 确认 config 来自 managed layer
3. 正常使用 `codex`；若功能被禁，doctor/config 会反映
4. 额度：状态栏查看 monthly credit（0.137.0+）

### 配置示例（本地 override，仅当 admin 允许）

```toml
# ~/.codex/config.toml — 可能被 cloud bundle 覆盖
model = "gpt-5.3-codex"

[features]
plugins = true
```

```bash
codex -c 'model="gpt-5.3-codex"' "explain this repo"
```

### 本地测试

无 Enterprise workspace — **未实测 cloud bundle 拉取** ⚠️  
`codex doctor` 显示 `config loaded` ✅

### 常见错误

1. **本地 config 不生效**：cloud layer 优先级更高 → 联系 admin 改 bundle
2. **EDU 账号无法 fetch bundle**：0.137.0 修复 EDU fetch — 升级 CLI

### 交叉验证

- GitHub release 0.137.0 notes ✅
- developers.openai.com changelog 2026-06-04 ✅

---

## 特性二：Plugin 体系与 `codex plugin list --json`

### 是什么

Plugins 打包 **Skills + Apps + MCP servers**（developers.openai.com/codex/plugins）。0.137.0 新增 **`codex plugin list --json`** 机器可读输出与 **remote catalog 缓存** 建议。

### 前置条件

- Codex 0.137.0+
- `features.plugins = true`（默认 stable）
- 可选：ChatGPT 账号登录以安装 curated plugins

### 详细使用步骤

1. `codex login`
2. 打开插件 UI：`codex` 交互后输入 `/plugins`，或 App 内 Plugins 目录
3. 浏览 marketplace → Install
4. 新线程中 `@插件名` 或自然语言描述任务
5. CLI 脚本：`codex plugin list --json --available` 列出可装插件

### 命令示例

**基础**

```bash
codex plugin list
codex plugin list --json
```

**进阶 — CI 检查插件是否安装**

```bash
codex plugin list --json | jq '.installed[] | select(.name=="gmail@openai-curated")'
```

**禁用插件**

```toml
# ~/.codex/config.toml
[plugins."gmail@openai-curated"]
enabled = false
```

### 本地测试

```bash
./node_modules/.bin/codex plugin list --json
# {"installed":[],"available":[]}
```

✅ 命令正常；空因未 login / 无 marketplace

### 常见错误

1. **installed 为空**：需 `codex login` + 网络
2. **插件安装后无权限**：App OAuth 在 ChatGPT 侧完成

### 交叉验证

- https://developers.openai.com/codex/plugins ✅
- GitHub #25330 plugin list JSON ✅

---

## 特性三：业务 Agent Plugins（产品层，2026-06 直播）

### 是什么

OpenAI 发布 **6 个面向岗位的开箱插件**：Sales、Data analytics、Creative production、Product design、Public equity investing、Investment banking — 打包岗位常用 App 与 workflow（36氪转述 OpenAI 直播）。

### 管理员开启 SOP

1. Enterprise Admin 在 ChatGPT/Codex **插件/Connector 治理**中批准业务插件类别
2. 配置 SSO 与 data residency 策略
3. 为团队开通对应 ChatGPT/Codex 席位与插件 whitelist
4. 审计：启用 usage analytics 导出

### 业务用户使用 SOP

1. 在 ChatGPT 或 Codex App 打开 **Plugins**，安装本岗位插件（如 Sales）
2. 连接 Salesforce/Slack 等（按提示 OAuth）
3. Prompt：「用 Sales 插件总结本周 pipeline 并起草跟进邮件」
4. 审查 Codex 输出后再发送/执行

### 示例 Prompt

**基础**

```text
@data-analytics Pull last week's warehouse metrics and explain anomalies in revenue by region.
```

**进阶**

```text
Using the investment banking plugin, draft a one-page teaser for Project Aurora using only files in /data/deal-room/ and cite every numeric claim.
```

### 本地测试

需 ChatGPT Plus/Enterprise + 插件市场 — **未实测** ⚠️

### 交叉验证

- 36氪：https://www.36kr.com/p/3836943798369158 （2026-06 初）
- MarketingProfs AI Update 2026-06-05 ✅ 一致

---

## 特性四：Sites（交互式网站/应用发布）

### 是什么

Codex **Sites** 将计划、分析、原型转为 **可分享 URL 的交互网站/应用**（与 ChatGPT 合体战略一部分）。

### 管理员开启 SOP

1. Admin 确认 **Sites 功能** 对组织可用（无禁用 policy）
2. 配置 **对外分享域名** 白名单 / DLP
3. 培训：Sites URL 可能含敏感数据 — 禁止上传密钥

### 业务用户使用 SOP

1. 在 Codex 完成分析或 PRD 后，选择 **Publish as Site** / prompt「Create a Site from this plan」
2. 审查预览 → 生成 URL
3. 团队内分享；需要迭代时用 **Annotations** 局部修改

### 示例

```text
Turn this quarterly metrics analysis into an interactive Site with filters for region and product line. No external API keys in the client bundle.
```

### 本地测试

未实测（需 auth + Sites feature）⚠️

### 常见错误

1. **URL 404**：发布未完成或 org 禁用
2. **数据泄露**：Site 静态托管含 PII → 发布前 redact

### 交叉验证

- 36氪 / 新智元 2026-06 Codex 三大更新 ✅
- developers.openai.com（Sites 文档随产品 GA 更新）

---

## 特性五：Annotations（输出局部批注迭代）

### 是什么

对 Codex 生成的文档、幻灯片、表格等 **选中片段添加批注**，Agent 仅重写标注区域。

### 使用步骤

1. 在 Codex App 打开生成物
2. 选中段落/单元格 → Add annotation
3. 输入修改意图
4. Codex 增量更新

### 示例

```text
[Annotate paragraph 2]: Replace all 2025 figures with 2026 Q1 actuals from attached CSV.
```

### 本地测试

App 功能 — CLI 未暴露 — **未实测** ⚠️

---

## 特性六：Multi-agent v2（0.137.0）

### 是什么

子 Agent **runtime 按线程选择**；`followup_task` 替代旧 assign API；metadata 默认 `hide_spawn_agent_metadata=true`；支持 remote runtime selector。

### 前置条件

- 0.137.0+
- feature `multi_agent` stable；`multi_agent_v2` under development

### 使用步骤

1. `codex features list | rg multi_agent`
2. 在 config 启用 v2（若需 dogfood flags，随版本默认值）
3. Prompt：「Spawn a reviewer agent and a test agent in parallel for this diff」

### 示例

```bash
codex --enable multi_agent "Review src/auth/ and spawn a second agent to write missing tests"
```

### 本地测试

features list 显示 `multi_agent stable` ✅；spawn 未测 ❌

### 常见错误

- **MAv2 close_agent self-target**：0.137.0 已 reject — 升级即可

---

## 特性七：TUI 与 Rollout 压缩（0.137.0）

### 是什么

- F13–F24 键位、searchable menu 粘贴、reasoning-only status
- **Cold rollout compression** 降低本地 SQLite 体积
- 取消无输出 prompt 时 **恢复 draft 与 attachments**

### 使用步骤

1. 升级 0.137.0
2. 长会话后自动压缩 — 无需配置
3. 误 cancel：重新编辑 restored draft

### 本地测试

`codex doctor` state DB missing（首次运行）— 压缩逻辑未触发 ⚠️

---

## 特性八：Codex × ChatGPT 合体（产品路线图）

### 是什么

OpenAI 宣布 **未来数周** Codex 能力进入 ChatGPT 主入口；Codex 周活 **500 万+**，20% 非开发者（官方直播）。

### 对 CLI 用户

- CLI 仍是 **CI/headless** 首选
- ChatGPT 内适合 **知识工作者触发** 同一 Codex backend
- 关注 `codex mcp-server` 与 ChatGPT connector 策略是否统一

### 交叉验证

- 36氪：https://www.36kr.com/p/3836668227466630
- 官方 changelog 2026-06-04 Codex app updates 26.602

---

## 升级与 doctor 修复

```bash
cd /workspace/tools
npm install @openai/codex@0.137.0
./node_modules/.bin/codex update   # 或 npm install -g 与 PATH 一致

export TERM=xterm-256color        # 修复 doctor terminal 警告
codex login                       # 修复 auth fail
```

---

## 参考链接

- Release 0.137.0：https://github.com/openai/codex/releases/tag/rust-v0.137.0
- Plugins：https://developers.openai.com/codex/plugins
- Changelog：https://developers.openai.com/codex/changelog
- GPT-5.3-Codex Copilot LTS：https://github.blog/changelog/2026-05-17-gpt-5-3-codex-is-now-the-base-model-for-copilot-business-and-enterprise/
