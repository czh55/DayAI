# Cursor 每日技术文档 — 2026-06-22

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 6 月 22 日 **Cursor 无新 Changelog 发布**，最新版本仍为 **3.8（2026-06-18）**。本周主线叙事从 3.8 的 Automations（`/automate`、5 项 GitHub trigger、默认 Computer Use）转向 **SpaceX 600 亿美元全股票收购 Cursor**（6/16 SEC 备案）。市场份额 secondary 数据显示 Cursor 从 2025 年 6 月 41% 降至 2026 年 5 月约 26%，Claude Code 占赛道约一半。本日属 3.8 消化期，重点在收购影响评估与 Automations 实践。

---

## 特性一：Cursor Automations 与 `/automate` Skill（2026-06-18，3.8）

### 是什么（机制说明）

Cursor Automations 是 always-on 云端 Agent，可按触发器自动执行任务。3.8 引入：

- **`/automate` skill**：在本地 Agent 会话中用自然语言描述任务，Cursor 自动配置 triggers、instructions、tools
- **默认 Open PR**：Automation 可默认开 PR，无需在 UI 中显式指定
- **不完整状态保存**：可暂存未完成 Automation，去配置 MCP auth 后不丢失进度
- **Memory 管理**：UI 删除 memory 文件，或 prompt Automation 删除过时 memories

### 适用场景

- **适合**：每日资讯生成、CI 分诊、PR review 自动修复、定时报告
- **不适合**：需严格人工审批的合规敏感变更

### 前置条件

- Cursor 3.8+
- cursor.com/automations 账号
- 触发源授权（GitHub/Slack/cron 等）

### 详细使用步骤（业务用户）

1. 本地 Cursor Agent 会话输入 `/automate`
2. 用自然语言描述：「每天 UTC 22:00 生成 AI 资讯总结并 push 到 main」
3. Cursor 生成 Automation 配置（trigger、instructions、tools）
4. 在 cursor.com/automations 审阅并启用
5. 可选：绑定 GitHub repo 与 cron schedule

### 命令与配置示例

**本地 `/automate` prompt**

```
/automate Create a daily automation that:
- Triggers at 22:00 UTC via cron
- Researches AI coding tool news
- Writes markdown summaries to summaries/YYYY-MM-DD/
- Commits and opens a PR
```

**Automation instructions 模板**

```markdown
你是 DayAI 每日资讯研究员。每次触发时：
1. 检索 Claude Code / Cursor / Codex 官方 changelog
2. 在 summaries/YYYY-MM-DD/ 生成 7 个 Markdown 文件
3. 运行 node tools/build-index.js
4. commit 并 push
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.8 | ✅ `/automate` 确认 |
| 本仓库 Automation | ✅ cron 触发实测可行（本任务即为例证） |
| GUI 配置 | ⚠️ 未实测（Cloud Agent 无桌面 GUI） |

### 问题与解决方案

**错误 1：Automation 未触发**

排查：确认 cron timezone 为 UTC；检查 GitHub App 权限；Automation 状态为 enabled。

**错误 2：token 消耗超预期**

排查：Automations 强制 Max Mode；Team Owned 计入团队池。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog 6/18](https://cursor.com/changelog) | ✅ |
| DayAI 本仓库 Automation | ✅ 实测可行 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | Marketplace「fix PR review comments」模板起步 |
| 团队 Lead | Team Owned + PR 质量门槛 |
| 本仓库 | cron Automation 已验证可行 |

---

## 特性二：GitHub 五项新 Trigger（2026-06-18）

### 是什么（机制说明）

Automations 新增 5 个 GitHub 事件触发器：

- **Issue comment**：非 PR issue 上的评论
- **PR review comment**：PR diff 内联评论
- **PR review submitted**：PR review 提交
- **Review thread updated**：review thread 标记 resolved/unresolved
- **Workflow run completed**：PR/branch 上 Actions 运行完成

Marketplace 新增「triage failed GitHub actions」「auto-fix PR review comments」模板。

### 适用场景

- **适合**：CI 红灯自动分诊、PR review 自动回复、issue triage
- **不适合**：需人工审批的合规敏感 PR

### 前置条件

- Cursor 3.8+
- GitHub App 授权 Cursor 访问目标 repo

### 详细使用步骤（业务用户）

1. cursor.com/automations → New Automation
2. Trigger 选 **GitHub** → 选择上述 5 项之一
3. 配置 repo 范围与 branch 过滤
4. instructions 写明修复策略与 PR 策略
5. 启用 **Open PR by default**（3.8 默认行为）

### 命令与配置示例

**Workflow run completed 触发 instructions**

```markdown
当 GitHub Actions 在 PR 上失败时：
1. 读取 failed workflow logs
2. 定位 root cause
3. 若可自动修复，commit 到 PR branch
4. 在 PR 留言说明修复内容
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog | ✅ 5 项 trigger 确认 |
| 实测触发 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**错误 1：trigger 未捕获 event**

排查：确认 GitHub App 权限含 checks/actions；repo 在 Automation 配置范围内。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/18 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 维护者 | 从 workflow_run_completed 起步 |
| 开源项目 | PR review comment 自动修复需谨慎授权 |

---

## 特性三：Computer Use 默认开启（2026-06-18）

### 是什么（机制说明）

Cloud Agent 被 Automation 触发后，默认启用 **Computer Use** 工具——Agent 可操作独立计算机产出 demo、截图、artifact。instructions 中写明「include a demo of your work」即可引导使用。

### 适用场景

- **适合**：需要可视化 demo 的 Automation（UI 变更、文档截图）
- **不适合**：纯后端/API 变更；高安全合规环境

### 前置条件

- Cursor 3.8+ Automation
- Cloud Agent 额度

### 详细使用步骤（业务用户）

1. 创建 Automation 时 Computer Use 默认 enabled
2. instructions 添加：「Produce a demo screenshot or recording of the result」
3. 审阅 Agent 产出的 artifact
4. 若不需 Computer Use，在 tools 中显式禁用

### 命令与配置示例

**instructions**

```markdown
After completing the code changes, use Computer Use to:
1. Start the dev server
2. Open the changed page in browser
3. Capture a screenshot and attach to PR description
```

**permissions.json 限制**

```json
{
  "autoRun": {
    "block_instructions": ["delete production data", "modify .env secrets"]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 默认开启 | ✅ |
| 实测 Computer Use | ⚠️ 未实测（Cloud Agent 环境限制） |

### 问题与解决方案

**错误 1：Agent 误操作生产环境**

排查：限制 Automation 到 staging branch；`.cursor/permissions.json` 限制破坏性操作。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 产品团队 | demo artifact 提升 PR 可审阅性 |
| 安全团队 | 默认禁用或严格 permissions |

---

## 特性四：SpaceX 收购与战略影响（2026-06-16，行业事件）

### 是什么（机制说明）

SpaceX 以 **600 亿美元全股票交易**收购 Cursor 母公司 Anysphere（SEC 6/16 备案）：

- Cursor 成为 SpaceX 全资子公司
- 交易预计 2026 Q3 完成
- Cursor 开发者数据将用于 Grok 后训练
- SpaceX 计划发布 Grok+Cursor 联合模型及 **Grok Build**
- ⚠️ 收购后第三方模型（Claude/GPT）API 供应是否持续，尚无官方答案

### 适用场景

- **适合**：评估供应商锁定风险、导出配置备份
- **不适合**：因收购消息立即迁移（Q3 前产品功能不变）

### 前置条件

- 了解当前 Cursor 订阅与模型使用策略

### 详细使用步骤（业务用户）

1. 导出 `.cursor/permissions.json`、MCP 配置、Automations 模板
2. 记录当前使用的第三方模型列表
3. 关注 Q3 交割后官方模型策略公告
4. 企业用户启动供应商风险评估流程

### 命令与配置示例

```bash
# 备份 Cursor 配置（路径因 OS 而异）
cp -r ~/.cursor/permissions.json ~/cursor-backup/
cp -r .cursor/ ./cursor-project-backup/
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| SEC 备案 secondary | ✅ 36氪/量子位交叉验证 |
| 产品功能影响 | ⚠️ Q3 前无变化（推断） |

### 问题与解决方案

**错误 1：担心立即失去 Claude/GPT 模型**

排查：Q3 交割前无官方变更；持续关注 Cursor 博客。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [36氪 6/17](https://36kr.com/p/3856591177618690) | ✅ SEC 备案 secondary |
| [量子位 secondary](https://m.36kr.com/p/3857007460439297) | ✅ 600 亿估值 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | Q3 前正常使用；备份配置 |
| 企业 | 启动供应商风险评估；准备多工具 fallback |
| 开源维护者 | 关注 Grok Build 与现有生态兼容性 |

---

## 特性五：Bugbot `/review` 与 Composer 2.5（2026-06-10，3.7+）

### 是什么（机制说明）

- **Bugbot**：平均 review 时间 ~90 秒（原 ~5 分钟）；由 **Composer 2.5** 驱动；bugs/review 0.62（原 0.56）
- **`/review`**：push 前运行 Bugbot + Security Review；与 GitHub/GitLab Bugbot 同步（同 diff 跳过重复 review）
- **仅审新增**：可配置 Bugbot 只 review 自上次 review 以来的变更

### 适用场景

- **适合**：PR 质量门禁、push 前自检
- **不适合**：无 Git 集成的纯本地实验

### 前置条件

- Cursor 3.7+
- Bugbot 已连接 GitHub/GitLab

### 详细使用步骤（业务用户）

1. 本地修改完成后输入 `/review`
2. 选择 Bugbot 和/或 Security Review
3. 审阅 findings 并修复
4. push 后开 PR——若 diff 相同，GitHub Bugbot 自动跳过

### 命令与配置示例

```
/review
/review-bugbot
/review-security
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/10 | ✅ ~90s review 确认 |
| `/review` 实测 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**错误 1：GitHub Bugbot 重复 review**

排查：确保本地 `/review` 与 PR diff 一致；检查 Bugbot sync 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/10 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | push 前 `/review` 养成习惯 |
| 团队 | 配置「仅审新增」减少噪音 |

---

## 版本对照表

| 版本 | 日期 | 核心变更 |
|------|------|----------|
| 3.8 | 2026-06-18 | `/automate`、5 GitHub triggers、Computer Use 默认、Open PR 默认 |
| 3.7 | 2026-06-17 | Cloud environment setup、`/in-cloud`、`/babysit` |
| 3.7 | 2026-06-10 | Bugbot ~90s、`/review`、Composer 2.5 驱动 |
| 3.7 | 2026-06-05 | Design Mode 多选+语音 |

## 今日研究员结论

6/22 无新版本，**3.8 消化期 + SpaceX 收购叙事**为本周焦点。Automations（含本仓库 cron 任务）是 Cursor 区别于 Claude Code/Codex 的差异化能力——always-on、Computer Use、GitHub 深度集成。收购后第三方模型供应是最大不确定性，建议 Q3 前备份配置。Fable 5 窗口今日关闭可能间接推高 Cursor+第三方模型组合的成本敏感性——关注用户是否转向 Cursor 自研 Composer 2.5 或 GLM-5.2 路线。

---
