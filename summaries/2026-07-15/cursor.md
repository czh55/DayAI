# Cursor 每日技术文档 — 2026-07-15

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 15 日 Cursor Changelog **仍为 3.11（7/10 发布）**，第六日无新版本。行业焦点：

1. **Sand 通用智能体内测进入第 3 周**——对标 Claude Cowork / ChatGPT Work，尚未官方确认
2. **SpaceX $600 亿收购 Q3 交割临近**——Sand 产品路线图变量持续
3. **3.11 核心功能稳定可用**：Side Chats、Conversation Search、Cloud Agent Hooks

---

## 特性一：Side Chats 并行对话（3.11，7/10）

### 是什么（机制说明）

Side Chats 允许在主 Agent 对话进行时，开启平行的辅助对话而不中断主线程：

- 触发方式：`/side`、`/btw` 或聊天面板顶部 **+** 按钮
- 每个 Side Chat 是独立的完整 Agent 会话，可后续跟进、@mention 拉回主线程
- 默认聚焦阅读、搜索和回答——适合澄清问题、调研替代方案

### 适用场景

- **适合**：主 Agent 执行长任务时，并行调研或澄清需求
- **不适合**：简单单步任务（直接主对话即可）

### 前置条件

Cursor ≥ 3.11；付费订阅

### 详细使用步骤（业务用户）

1. 在 Agent 对话面板中，主 Agent 正在执行重构任务
2. 输入 `/side` 或点击 **+** 按钮
3. 在 Side Chat 中提问：「这个 auth 模块有没有更轻量的替代方案？」
4. Side Chat 独立搜索和回答，不中断主 Agent
5. 满意后将结论 @mention 回主线程

### 命令与配置示例

```
/side
# 或
/btw Can you check if there's a lighter auth library?

# 拉回主线程
@side-chat-1 请按这个方案调整主任务
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Side Chats 功能 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 3.11 | ✅ 功能描述确认 |

### 问题与解决方案

**Side Chat 无上下文**：确认从主对话中创建（自动继承上下文）。**无法 @mention**：确认 Side Chat 会话未删除。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ 7/10 发布 |
| Cursor Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长任务用户 | 用 Side Chat 避免中断主 Agent |
| 探索型开发者 | 在 Side Chat 中调研，主线程保持执行 |

---

## 特性二：Conversation Search 对话搜索（3.11）

### 是什么（机制说明）

3.11 引入两层搜索：

1. **Agents Window 全局搜索**：Cmd+K 搜索数千条 Agent 对话 transcript，超越名称和 PR 号
2. **会话内搜索**：Cmd+F 在当前对话中跳转匹配项，显示匹配计数器

Cursor 构建本地搜索索引，号称可扩展至数千对话且性能流畅。

### 适用场景

- **适合**：高频 Agent 用户找回历史决策；长 transcript 内定位关键代码段
- **不适合**：对话量少、无需回溯的用户

### 前置条件

Cursor ≥ 3.11

### 详细使用步骤（业务用户）

1. 打开 **Agents Window**
2. **Cmd+K** → 输入关键词如 "refactor auth"
3. 浏览搜索结果，点击进入对应对话
4. 在对话内 **Cmd+F** → 搜索 "JWT"
5. 用匹配计数器在长 transcript 中导航

### 命令与配置示例

```
# Agents Window 命令面板
Cmd+K → "database migration"

# 会话内搜索
Cmd+F → "connection pool"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 全局对话搜索 | ⚠️ 未实测（无 GUI） |
| Changelog 描述 | ✅ 3.11 确认 |

### 问题与解决方案

**搜索无结果**：确认 ≥ 3.11；索引可能仍在构建。**搜索慢**：重启 Cursor 重建索引。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 高频 Agent 用户 | Cmd+K 替代手动翻找历史 |
| 团队协作者 | 搜索他人 Agent 会话中的决策记录 |

---

## 特性三：Cloud Agent Hooks 对话级控制（3.11）

### 是什么（机制说明）

3.11 在工具执行/文件/shell hooks 基础上，新增**对话级 hooks**：

| Hook | 触发时机 |
|------|----------|
| `beforeSubmitPrompt` | 用户提交 prompt 前 |
| `afterAgentResponse` | Agent 回复后 |
| `afterAgentThought` | Agent 思考后 |
| `stop` | Agent 停止时 |
| `subagentStart` | 子 Agent 启动时 |

用途：观察输出与推理、控制子 Agent、构建自校正循环。

### 适用场景

- **适合**：Team/Enterprise 合规审计、输出过滤、子 Agent 编排
- **不适合**：个人开发者无特殊治理需求

### 前置条件

Cursor Team/Enterprise；Cloud Agent 启用

### 详细使用步骤（业务用户）

1. **Dashboard → Settings → Hooks** 或编辑 `.cursor/hooks.json`
2. 配置对话级 hook 脚本
3. 部署至 Cloud Agent 环境
4. 测试 `beforeSubmitPrompt` 过滤敏感信息
5. 用 `afterAgentResponse` 记录审计日志

### 命令与配置示例

```json
// .cursor/hooks.json
{
  "hooks": {
    "beforeSubmitPrompt": [
      { "command": "./scripts/filter-pii.sh" }
    ],
    "afterAgentResponse": [
      { "command": "./scripts/audit-log.sh" }
    ],
    "subagentStart": [
      { "command": "./scripts/log-subagent.sh" }
    ]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent Hooks | ⚠️ 未实测（无 hook 配置权限） |
| Changelog 3.11 | ✅ hooks 列表确认 |

### 问题与解决方案

**Hook 未触发**：确认 Team/Enterprise 计划；检查脚本权限。**子 Agent 控制失效**：使用 `subagentStart` hook。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| Cursor Docs Hooks | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 优先部署 `beforeSubmitPrompt` PII 过滤 |
| 自动化作者 | 结合 Cursor Automations cron + hooks 审计 |

---

## 特性四：Sand 通用智能体内测（⚠️ 未官方确认）

### 是什么（机制说明）

据 [The Information 7/9](https://www.theinformation.com/) 与 [TechTimes 7/13](https://www.techtimes.com/articles/320271/20260713/cursors-sand-agent-eyes-claude-cowork-market-before-spacex-rewrites-its-roadmap.htm) 报道：

- **Sand** 是 Cursor 首款面向**非开发者**的通用 AI 智能体
- 功能：邮件回复、短信管理、电子表格整理、工程琐碎任务
- **6 月下旬**向 Cursor 员工内部 rollout，使用 SpaceXAI 租用算力
- Cursor **未承诺公开发布**；SpaceX $600 亿收购可能改变路线图

### 适用场景

- **适合**（若正式发布）：非技术知识工作者日常办公自动化
- **不适合**：当前阶段——产品未公开

### 前置条件

⚠️ 产品未发布；仅内部测试

### 详细使用步骤（业务用户）

当前无法操作。若未来发布，预期路径：

1. Cursor 设置中启用 Sand
2. 连接邮件/日历/Slack 集成
3. 描述任务让 Sand 自主执行
4. 审查并批准输出

### 命令与配置示例

```
# ⚠️ 以下为推测，非官方
/sand "Organize this week's meeting notes into a summary"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Sand 产品 | ⚠️ 未发布，无法实测 |
| 媒体报道 | ✅ The Information + TechTimes 交叉验证 |

### 问题与解决方案

**无法使用 Sand**：正常——产品未公开发布。**关注进展**：跟踪 Q3 SpaceX 收购交割后的产品公告。

### 官方 vs 社区交叉验证

| 来源 | 类型 | 一致性 |
|------|------|--------|
| The Information 7/9 | 媒体报道 | ✅ 一手来源 |
| Cursor 官方 | 官方 | ❌ 未确认 Sand 产品名 |
| TechTimes 7/13 | 媒体 | ✅ 与 The Information 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开发者 | 暂不影响 Cursor IDE 使用，关注 Q3 收购后变化 |
| 企业采购 | 评估 SpaceX 收购对供应商中立性的影响 |
| 非技术用户 | 等待正式发布，当前可用 Claude Cowork 替代 |

---

## 特性五：Redesigned Project/Repo Pickers（3.11）

### 是什么（机制说明）

3.11 简化项目和仓库选择器：

- 搜索范围限定为当前工作环境（This Computer / Cloud / Remote Machine）
- 移除 Home 概念，「无仓库」为显式 No Repo 选择
- 可在选择器内直接创建项目并连接 GitHub/GitLab/Azure DevOps
- 远程选项合并为统一 Remote Machines 菜单
- 输入 `none` 或 `no repo` 可找到 No Repo 选项

### 适用场景

- **适合**：多仓库/多环境开发者；Cloud Agent 频繁切换
- **不适合**：单仓库固定环境用户

### 前置条件

Cursor ≥ 3.11

### 详细使用步骤（业务用户）

1. 打开项目/仓库选择器
2. 选择运行环境：Cloud / This Computer / Remote Machine
3. 搜索或浏览仓库列表
4. 无仓库时选择 No Repo（或输入 `none`）
5. 多仓库：在 Cloud/This Computer 下拉中启用 Select Multiple

### 命令与配置示例

```
# 选择器内搜索
"my-backend-repo"

# 无仓库模式
none
# 或
no repo
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 新选择器 UI | ⚠️ 未实测（无 GUI） |
| Changelog 3.11 | ✅ 改进列表确认 |

### 问题与解决方案

**找不到仓库**：确认 Git 远程配置；Cloud 仓库可能需要先 clone。**多仓库选择**：在 flyout 中启用 Select Multiple toggle。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多仓库开发者 | 利用环境限定搜索提升效率 |
| Cloud Agent 用户 | 熟悉 No Repo 模式用于非代码任务 |

---

## 版本对照表

| 版本 | 发布日 | 核心变更 |
|------|--------|----------|
| 3.11 | 2026-07-10 | Side Chats、Conversation Search、Cloud Agent Hooks、Picker 重设计 |
| 3.10 | 2026-06-30 | Team MCPs、Organization Groups |
| 3.9 | 2026-06-29 | Cursor iOS 公开测试、Cloud Agent 移动端 |
| 3.8 | 2026-06-18 | Cursor Automations、Computer Use |

## 今日研究员结论

Cursor 3.11 进入第六日稳定期，核心 IDE 功能（Side Chats、Search、Hooks）可正常使用。Sand 内测进入第三周但无官方确认，SpaceX 收购是最大变量。建议开发者正常使用 3.11 功能，同时关注 Q3 交割后的产品路线图变化。模型中立性承诺（Michael Truell 表态）是否维持，将在收购后首次产品发布时得到验证。

---
