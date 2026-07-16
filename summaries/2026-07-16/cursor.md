# Cursor 每日技术文档 — 2026-07-16

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 16 日 Cursor Changelog **仍为 3.11（7/10 发布）**，第七日无新版本。行业焦点：

1. **SpaceX $600 亿收购 Cursor** 被机器之心 Week 25 列为本周头条，Q3 交割变量持续
2. **Sand 通用智能体内测进入第四周**——对标 Claude Cowork / ChatGPT Work，Cursor 未官方确认
3. **3.11 核心功能稳定可用**：Side Chats、Conversation Search、Cloud Agent Hooks、Redesigned Pickers

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
| Conversation Search | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 描述 | ✅ 本地索引 + Cmd+K/Cmd+F |

### 问题与解决方案

**搜索无结果**：确认对话在 Agents Window 中可见；索引可能需时间构建。**性能慢**：检查对话数量；考虑归档旧对话。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| Cursor Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度 Agent 用户 | 养成 Cmd+K 搜索习惯 |
| 团队 Lead | 用搜索追溯历史决策和 PR 关联 |

---

## 特性三：Cloud Agent Hooks 对话级控制（3.11）

### 是什么（机制说明）

3.11 新增对话级 Cloud Agent Hooks，扩展现有工具执行和文件/shell 钩子：

| Hook | 用途 |
|------|------|
| `beforeSubmitPrompt` | 提交前拦截/修改 prompt |
| `afterAgentResponse` | 观察 Agent 输出 |
| `afterAgentThought` | 观察推理过程 |
| `subagentStart` | 控制子 Agent 启动 |
| `stop` | 构建自纠正循环 |
| compaction / turn completion | 控制会话压缩和轮次结束 |

团队可在 Dashboard 配置 hooks，构建自纠正 loops 和输出过滤。

### 适用场景

- **适合**：企业团队需要 Agent 输出审计；构建自纠正工作流
- **不适合**：个人用户无合规需求

### 前置条件

Cursor Teams/Enterprise；Dashboard 访问权限

### 详细使用步骤（业务用户）

1. 登录 **Cursor Dashboard**
2. 导航至 **Team Settings → Hooks**
3. 配置 `beforeSubmitPrompt` hook 过滤敏感信息
4. 配置 `afterAgentResponse` hook 记录输出日志
5. 在 Cloud Agent 会话中验证 hook 触发

### 命令与配置示例

```json
// .cursor/hooks.json 示例（概念）
{
  "beforeSubmitPrompt": [
    {
      "command": "node scripts/filter-pii.js"
    }
  ],
  "afterAgentResponse": [
    {
      "command": "node scripts/audit-log.js"
    }
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Hooks 配置 | ⚠️ 未实测（Cloud Agent 环境限制） |
| Changelog 3.11 | ✅ 6+ 新 hook 类型确认 |

### 问题与解决方案

**Hook 未触发**：确认 Cloud Agent 模式（非本地 Agent）。**权限不足**：Teams 管理员需在 Dashboard 启用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| Cursor Docs — Hooks | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 用 hooks 实现合规审计和 PII 过滤 |
| 个人开发者 | 了解即可，本地 Agent 不支持全部 hooks |

---

## 特性四：Redesigned Project/Repo Pickers（3.11）

### 是什么（机制说明）

3.11 重新设计项目和仓库选择器：

- 搜索范围限定为 **This Computer / Cloud / Remote Machine**
- 移除 Home 概念，无仓库工作变为显式 **No Repo** 选择
- 可在选择器内创建项目并连接 GitHub/GitLab/Azure DevOps
- **Run on** 选择器显示 Agent 运行位置（Cloud/本地/远程）
- 分支选择器默认显示 default branch 和最近使用分支

### 适用场景

- **适合**：多仓库、多环境开发者；Cloud Agent 频繁用户
- **不适合**：单仓库本地开发者（变化感知有限）

### 前置条件

Cursor ≥ 3.11

### 详细使用步骤（业务用户）

1. 点击项目选择器打开新 UI
2. 选择运行环境：**This Computer** / **Cloud** / **Remote Machines**
3. 搜索或浏览仓库列表
4. 选择分支（默认显示 recent branches）
5. 无仓库时输入 `none` 或 `no repo` 选择 No Repo 模式

### 命令与配置示例

```
# 选择器内搜索
none          → No Repo 模式
no repo       → No Repo 模式

# Cloud 多仓库
Select Multiple toggle → 多 repo 选择
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Picker UI | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 描述 | ✅ 完整功能列表 |

### 问题与解决方案

**找不到 Cloud repo**：确认已在 Dashboard 连接 Git 提供商。**Remote Machines 为空**：确认团队池配置或已有远程工作区。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| Picker Improvements 列表 | ✅ 12 项改进 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Cloud Agent 用户 | 熟悉 Run on 选择器切换环境 |
| 多 repo 开发者 | 使用 Select Multiple 批量选择 |

---

## 特性五：SpaceX 收购与 Sand 内测观察（行业变量）

### 是什么（机制说明）

**SpaceX 收购**：6 月 16 日签署协议，SpaceX 获得以 $600 亿全股票收购 Anysphere（Cursor 母公司）的优先权，预计 Q3 2026 交割。机器之心 Week 25（7 月中旬）将此列为本周头条。

**Sand 内测**：The Information 7/9 报道 Cursor 正在内测通用办公智能体 Sand，面向非开发者处理邮件、表格和工程管理，对标 Claude Cowork 和 ChatGPT Work。使用 4 月起租用的 SpaceXAI Colossus 2 算力。Cursor 尚未承诺公开发布。

**Composer 2.5**：量子位 5 月报道 85% 算力花在 Kimi K2.5 基模之外的后训练上，Terminal-Bench 2.0 达 69.3%。

### 适用场景

- **适合**：关注行业格局的长期 Cursor 用户
- **不适合**：无——但当前 3.11 功能不受影响

### 前置条件

无技术前置；关注官方公告

### 详细使用步骤（业务用户）

1. 继续使用 Cursor 3.11 正常开发
2. 关注 Q3 交割后官方声明（模型中立性、数据政策）
3. Sand 相关：等待 Cursor 官方确认，勿依赖 The Information 报道做生产决策
4. 评估 Composer 模型依赖风险（Kimi 基模 + Colossus 2）

### 命令与配置示例

```
# 当前无 Sand 相关命令
# 关注渠道：
# - cursor.com/changelog
# - cursor.com/blog
# - The Information（付费）
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Sand 功能 | ⚠️ 未实测（内测未公开） |
| SpaceX 收购 | ✅ 机器之心 + 量子位 + The Information 交叉验证 |
| Cursor 3.11 | ✅ 不受收购影响，正常使用 |

### 问题与解决方案

**担心收购后变化**：Q3 前功能不受影响；关注官方声明。**Sand vs Cowork/Work**：三家均在探索通用 Agent，Cursor 尚未公开。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 机器之心 Week 25 | ✅ $600B 收购头条 |
| The Information 7/9 | ✅ Sand 内测（付费源） |
| TechTimes 7/13 | ✅ Sand 分析 |
| Cursor 官方 | ⚠️ 未确认 Sand 产品名 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长期 Cursor 用户 | 关注 Q3 交割声明，评估模型中立性承诺 |
| 企业决策者 | 在合同中明确数据处理和模型选择权 |
| 普通开发者 | 3.11 功能正常使用，Sand 观望即可 |

---

## 版本对照表

| 版本 | 发布日 | 核心变更 |
|------|--------|----------|
| **3.11** | **2026-07-10** | Side Chats、Conversation Search、Cloud Agent Hooks、Picker 重设计 |
| 3.10 | 2026-06-30 | Team MCPs in marketplaces、组织组访问控制 |
| 3.9 | 2026-06-29 | Cursor for iOS 公测、Cloud agents on mobile |
| 3.8 | 2026-06-18 | Automations `/automate`、Computer use tool |

## 今日研究员结论

Cursor 3.11 第七日无新版本，功能稳定。SpaceX $600 亿收购成为本周行业头条，但短期内不影响 IDE 使用。Sand 内测进入第四周，Cursor 仍未官方确认——建议开发者正常使用 3.11 的 Side Chats、Search 和 Hooks，同时关注 Q3 交割后的产品路线图声明。

---
