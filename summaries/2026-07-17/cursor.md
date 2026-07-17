# Cursor 每日技术文档 — 2026-07-17

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)（7/17 Slack 更新）、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 17 日 Cursor Changelog **发布 Slack 集成重大更新**，桌面端最近大版本仍为 **3.11（7/10）**。今日焦点：

1. **Cursor in Slack 交互升级**：启动前先输出计划、执行中推送状态更新；消息内按钮改为紧凑 footer 链接
2. **Slack 多仓库环境**：从命名 multi-repo environment 启动；**Switch repository** 中途切换并续跑
3. **跨频道工作流**：读取/发送其他 Slack 频道与线程上下文
4. **3.11 桌面端（维护）**：Side Chats、Conversation Search、Cloud Agent Hooks、Redesigned Pickers 持续可用
5. **行业背景**：SpaceX $600 亿收购 Q3 交割变量仍在；Sand 内测未官方确认；Composer 2.5 基于 Kimi K2.5，Kimi K3 或影响下一代基座

---

## 特性一：Slack 计划先行与状态更新（7/17）

### 是什么（机制说明）

7/17 **Interaction improvements** 重构 Slack 内 Agent 交互：

- **计划先行**：编码/审查前先回复执行计划，用户可早期纠偏
- **状态更新**：执行中推送分步进度（读代码、改文件、开 PR 等）
- **UI 精简**：移除消息内嵌按钮，改为 footer 链接；表格、PR、artifacts 渲染更清晰

### 适用场景

- **适合**：Slack 线程 @Cursor 处理 PR 审查、bugfix、文档更新
- **不适合**：需 IDE 实时 diff 预览的精细 UI 工作

### 前置条件

组织已安装 Cursor Slack 集成；用户具备 Cloud Agent 与仓库权限

### 详细使用步骤（业务用户）

1. Slack 中 @Cursor 描述任务
2. 审阅**计划摘要**，不对则直接回复修正
3. 执行期间观察**状态更新**
4. 完成后点击 footer 中的 PR / artifact 链接

### 命令与配置示例

```
@Cursor 请审查 #1234 的 JWT 过期逻辑，重点关注 refresh token 轮换
@Cursor 计划里请加上单元测试，不要改 public API
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Slack 计划/状态 | ⚠️ 未实测（无 Slack 集成环境） |
| Changelog 7/17 | ✅ 官方确认 |

### 问题与解决方案

计划过粗 → 补充文件路径与验收标准。找不到按钮 → 7/17 起操作在 footer 链接。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 7/17 | ✅ |
| Cursor Slack Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 工程经理 | 用计划消息对齐任务，减少返工 |
| 开发者 | 在计划阶段纠偏，而非等 PR 后再改 |

---

## 特性二：Slack 多仓库环境支持（7/17）

### 是什么（机制说明）

Slack 内 Cursor 支持 **multi-repo environment**：

- 从**命名环境**启动，自动覆盖 frontend / backend / shared-lib 等多 repo
- 任务中途需访问环境外 repo 时，弹出 **Switch repository**；切换后**断点续跑**

与 3.11 桌面 **Select Multiple** 互补——Slack 侧重「环境」抽象。

### 适用场景

- **适合**：微服务分库；Slack 内跨 repo bugfix
- **不适合**：单仓库小项目

### 前置条件

Dashboard 已配置命名 multi-repo environment；Slack 集成绑定 Cloud Agent

### 详细使用步骤（业务用户）

1. Dashboard → Environments 创建 `full-stack-prod`，关联 web / api / shared repo
2. Slack @Cursor 描述跨库任务
3. Cursor 在匹配环境启动
4. 需额外 repo 时点击 **Switch repository** 并选择目标

### 命令与配置示例

```
@Cursor 在 full-stack 环境修复 checkout：
- api-server: 修正 /orders schema
- web-app: 更新 OrderCard 类型
- shared-utils: 同步 OrderStatus enum
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Multi-repo / Switch | ⚠️ 未实测 |
| Changelog 7/17 | ✅ |

### 问题与解决方案

环境选错 → 任务描述写明 repo 或环境名。权限拒绝 → 检查 Cloud Agent Git token。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/17 | ✅ |
| 3.11 Select Multiple | ✅ 桌面端互补 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈团队 | 预配置命名环境，Slack 任务无需手写 repo 路径 |
| 平台/DevOps | 维护 environment 映射，控制 Agent 权限范围 |

---

## 特性三：Slack 跨频道工作流（7/17）

### 是什么（机制说明）

**Cross-channel workflows** 允许 Cursor：

- **读取**工作区其他频道/线程（incident、spec、设计讨论）
- **发送**更新至原线程或相关频道

将 Slack 从单线程入口扩展为多频道信息编排。

### 适用场景

- **适合**：上下文分散在 `#incidents` 与 `#backend`；需汇总后再改代码
- **不适合**：目标频道未授权 Agent 读取

### 前置条件

Slack App 对目标频道有读写权限；组织政策允许跨频道 Agent 访问

### 详细使用步骤（业务用户）

1. `@Cursor 根据 #incidents 今日 outage 讨论，给 payment client 加 retry`
2. Cursor 计划阶段说明将拉取 incident 线程
3. 执行中读取并提取 agreed fix
4. 在原线程更新 PR；可选回写 `#incidents`

### 命令与配置示例

```
@Cursor 阅读 #product-specs 中 dark mode 线程，在 web-app 实现 toggle
@Cursor 完成后在 #releases 发简短 changelog
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 跨频道读写 | ⚠️ 未实测 |
| Changelog 7/17 | ✅ |

### 问题与解决方案

无法读取 → `/invite @Cursor` 进目标频道。合规 → Enterprise 限定 Agent 可读频道 allowlist。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/17 | ✅ Cross-channel workflows |
| Slack Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| SRE | 跨频道读 incident，减少 copy-paste |
| 安全/合规 | 审计 Slack App 频道权限 |

---

## 特性四：3.11 桌面端能力维护（Side Chats / Search / Hooks / Pickers）

### 是什么（机制说明）

桌面 **3.11（7/10）** 四项能力持续有效：

| 能力 | 要点 |
|------|------|
| **Side Chats** | `/side`、`/btw`、**+** 开并行对话；@mention 拉回主线程 |
| **Conversation Search** | **Cmd+K** 搜 transcript；**Cmd+F** 会话内搜索带计数 |
| **Cloud Agent Hooks** | `beforeSubmitPrompt`、`afterAgentResponse`、`afterAgentThought`、`subagentStart`、`stop` 等 |
| **Redesigned Pickers** | Cloud/本地/Remote 分区；**No Repo**；**Run on**；**Select Multiple** |

### 适用场景

Side Chats 并行调研；Search 找回历史决策；Hooks 合规审计；Pickers 多环境切换

### 前置条件

Cursor ≥ 3.11；Hooks 需 Teams/Enterprise

### 详细使用步骤（业务用户）

1. 主 Agent 长跑中 `/side` 问澄清问题，结论 @mention 回主线程
2. Agents Window **Cmd+K** 搜历史；对话内 **Cmd+F** 定位关键词
3. Dashboard 配置 `beforeSubmitPrompt` 过滤 PII
4. Picker → Cloud → **Select Multiple** 选多 repo

### 命令与配置示例

```
/side
/btw 这个 API 有没有 breaking change?
Cmd+K → "refactor auth"
{ "beforeSubmitPrompt": [{ "command": "node scripts/filter-pii.js" }] }
none / no repo → No Repo 模式
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Side Chats / Search / Hooks / Pickers | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 3.11 | ✅ |

### 问题与解决方案

Hook 未触发 → 须 Cloud Agent 模式。Search 无结果 → 索引构建需时间。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ 7/10 |
| 7/17 Slack 多 repo | ✅ 与 Select Multiple 互补 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 桌面重度用户 | Side Chats + Search 照常；Slack 更新不影响 IDE |
| 企业管理员 | Hooks 与 Slack 跨频道权限一并治理 |

---

## 特性五：SpaceX 收购、Sand 与 Composer 2.5（行业背景）

### 是什么（机制说明）

- **SpaceX 收购**：6/16 签署 $600 亿全股票收购 Anysphere 优先权，预计 Q3 交割；机器之心 Week 25 头条
- **Sand 内测**：The Information（7/9）报道通用办公 Agent，对标 Cowork/ChatGPT Work，用 Colossus 2 算力；**Cursor 未官方确认**
- **Composer 2.5**：基于 Kimi K2.5 后训练，Terminal-Bench 2.0 69.3%；**Kimi K3（7/17）** 或成下一代基座候选

### 适用场景

- **适合**：评估 vendor lock-in、模型中立性的架构师/采购
- **不适合**：将 Sand 当作已发布功能规划生产

### 前置条件

无；关注 changelog 与官方博客

### 详细使用步骤（业务用户）

1. 正常使用 3.11 + 7/17 Slack 能力
2. Q3 交割后审阅数据驻留与模型选择声明
3. Sand 等待官方确认；Composer 关注 K3 开源（7/27）后 Cursor 公告

### 命令与配置示例

```
# 无 Sand 相关命令；监测 cursor.com/changelog 与 Dashboard 公告
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Sand | ⚠️ 未实测（内测未公开） |
| SpaceX 收购 | ✅ 多源交叉验证 |
| Composer 2.5 / K3 升级 | ⚠️ 待 Cursor 官方 |

### 问题与解决方案

担心收购变化 → Q3 前功能照常；企业合同写明数据处理条款。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 机器之心 / The Information | ✅ 收购与 Sand |
| Cursor 官方 | ⚠️ 未确认 Sand；7/17 仅 Slack |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长期用户 | Q3 声明前照常升级 |
| 企业采购 | 合同明确 Slack 跨频道与模型选择权 |

---

## 版本对照表

| 版本/更新 | 发布日 | 核心变更 |
|-----------|--------|----------|
| **Slack 集成更新** | **2026-07-17** | 计划先行、状态更新、multi-repo environment、Switch repository、跨频道读写 |
| **3.11** | **2026-07-10** | Side Chats、Conversation Search、Cloud Agent Hooks、Picker 重设计 |
| 3.10 | 2026-06-30 | Team MCPs in marketplaces、组织组访问控制 |
| 3.9 | 2026-06-29 | Cursor for iOS 公测、Cloud agents on mobile |
| 3.8 | 2026-06-18 | Automations `/automate`、Computer use tool |

## 今日研究员结论

**7/17 是 Cursor 协作栈的重要一日**：Slack 集成进化为计划可纠偏、进度可观测、多 repo 可切换、跨频道可编排的协作入口，与 3.11 桌面 Side Chats / Search / Hooks 形成「Slack 异步 + IDE 同步」双轨。本地 Cloud Agent **⚠️ 未实测** Slack 与 GUI，结论以 [官方 Changelog](https://cursor.com/changelog) 为准；已启用 Slack 集成的团队应验证 multi-repo environment 与跨频道权限。SpaceX 收购与 Sand 仍为背景变量；Composer 2.5 用户可关注 Kimi K3 发布后 Cursor 是否宣布基座升级。

---
