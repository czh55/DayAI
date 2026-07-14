# Cursor 每日技术文档 — 2026-07-14

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[The Information](https://www.theinformation.com/)、[36氪 7/14](https://www.36kr.com/p/3894912989854720)

## 今日综述

2026 年 7 月 14 日 Cursor 官方 Changelog **无新版本**——**3.11（7/10）** 仍为最新稳定版，进入发版后第 **5** 日观察期。行业侧最大变量来自 **36氪 7/14 报道**：Cursor 内部测试通用智能体 **Sand**，目标从编程工具扩展至日常办公自动化，直接对标 Claude Cowork 与 ChatGPT Work。SpaceX 拟 600 亿美元收购的交易阴影使 Sand 产品命运充满不确定性。

---

## 特性一：Cursor 3.11 Side Chats 第 5 日观察（7/10 发版）

### 是什么（机制说明）

Cursor 3.11（2026-07-10）引入 **Side Chats**——与主 Agent 对话并行运行的辅助会话：

- 通过 `/side`、`/btw` 或聊天面板顶部 **+** 按钮创建
- 默认聚焦读取、搜索、回答——适合澄清问题、调研替代方案、决策 sanity check
- 每个 side chat 是**持久完整 Agent 对话**，可后续跟进、@mention 拉回主线程
- 主 Agent 继续执行时，side chat 不中断主流程

### 适用场景

- **适合**：主 Agent 执行长任务时平行的调研/澄清；不想污染主上下文的探索性提问
- **不适合**：需要修改代码的任务（side chat 默认只读导向）

### 前置条件

Cursor ≥ 3.11；付费计划（Agent 功能）

### 详细使用步骤（业务用户）

1. 打开 Cursor → **Agents 面板**
2. 在主 Agent 对话运行中，点击顶部 **+** 或输入 `/side`
3. 在 side chat 中提问（如「这个 API 有没有更轻量的替代？」）
4. 需要时将 side chat 结论 `@mention` 回主线程
5. 关闭 side chat 不影响主 Agent 进度

### 命令与配置示例

```
/side What are the tradeoffs of using Redis vs in-memory cache here?

/btw Can you check if this library supports TypeScript 5.5?
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Side Chats 功能 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 3.11 | ✅ 官方确认 7/10 发版 |
| `/side` `/btw` 命令 | ✅ Changelog 文档确认 |

### 问题与解决方案

**Side chat 无法编辑文件**：设计行为——用主 Agent 执行修改。**Side chat 上下文不足**：@mention 主线程相关段落。**版本 < 3.11**：更新 Cursor 至最新版。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| 7/13 DayAI 总结 | ✅ 第 4 日观察延续 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发者 | 长 refactor 时用 side chat 做平行调研，避免中断主 Agent |
| 技术 Lead | 用 side chat 做架构决策 sanity check |
| 新用户 | 先熟悉主 Agent 流程，再探索 side chat |

---

## 特性二：Conversation Search — Agent 对话全文检索（3.11）

### 是什么（机制说明）

3.11 引入两层搜索：

1. **Agents Window 全局搜索**：Cmd+K 命令面板搜索 Agent 历史对话，本地构建索引，支持数千条对话快速检索
2. **会话内搜索**：Cmd+F 在当前对话中跳转匹配项，显示计数器，长 transcript 滚动时持续搜索

### 适用场景

- **适合**：管理大量 Agent 会话的开发者；需要回溯历史决策/实现细节
- **不适合**：会话数量极少、无需检索的用户

### 前置条件

Cursor ≥ 3.11

### 详细使用步骤（业务用户）

1. 打开 **Agents Window**
2. **Cmd+K**（macOS）/ **Ctrl+K**（Windows/Linux）打开命令面板
3. 输入关键词搜索历史 Agent 对话
4. 在打开的会话中 **Cmd+F** 搜索具体内容
5. 使用匹配计数器在长 transcript 中导航

### 命令与配置示例

```
# Agents Window 命令面板
Cmd+K → 输入 "refactor auth module"

# 会话内搜索
Cmd+F → 输入 "JWT"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 全局对话搜索 | ⚠️ 未实测（无 GUI） |
| 会话内 Cmd+F | ⚠️ 未实测 |
| Changelog 描述 | ✅ 3.11 确认 |

### 问题与解决方案

**搜索无结果**：确认 Cursor ≥ 3.11；索引可能仍在构建中。**搜索慢**：Changelog 称本地索引可扩展至数千对话——若过慢尝试重启 Cursor。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog | ✅ |
| 3.11 发版日 7/10 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 高频 Agent 用户 | 用 Cmd+K 替代手动翻找历史 PR/任务 |
| 团队协作者 | 搜索他人 Agent 会话中的决策记录 |

---

## 特性三：Cloud Agent Hooks 扩展 — 对话级控制（3.11）

### 是什么（机制说明）

3.11 在既有工具执行/文件/shell hooks 基础上，新增**对话级 hooks**：

| Hook | 触发时机 |
|------|----------|
| `beforeSubmitPrompt` | 用户提交 prompt 前 |
| `afterAgentResponse` | Agent 回复后 |
| `afterAgentThought` | Agent 思考后 |
| `stop` | Agent 停止时 |
| `subagentStart` | 子 Agent 启动时 |
| 更多 | 见 [Cursor Hooks 文档](https://cursor.com/docs) |

用途：观察输出与推理、控制子 Agent、构建自校正循环。

### 适用场景

- **适合**：Team/Enterprise 管理员；需合规审计、输出过滤、子 Agent 编排的团队
- **不适合**：个人开发者无特殊治理需求

### 前置条件

Cursor Team/Enterprise；Cloud Agent 功能启用

### 详细使用步骤（业务用户）

1. **Dashboard → Settings → Hooks**（或 `.cursor/hooks.json`）
2. 配置对话级 hook 脚本
3. 部署至 Cloud Agent 环境
4. 测试 `beforeSubmitPrompt` 过滤敏感信息
5. 用 `afterAgentResponse` 记录审计日志

### 命令与配置示例

```json
// .cursor/hooks.json（概念示例）
{
  "hooks": {
    "beforeSubmitPrompt": [
      {
        "command": "./scripts/filter-pii.sh"
      }
    ],
    "afterAgentResponse": [
      {
        "command": "./scripts/audit-log.sh"
      }
    ]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent Hooks | ⚠️ 未实测（当前环境为 Cloud Agent 但无 hook 配置权限） |
| Changelog 3.11 | ✅ 新 hooks 列表确认 |

### 问题与解决方案

**Hook 未触发**：确认 Team/Enterprise 计划；检查 hook 脚本权限。**子 Agent 控制失效**：使用 `subagentStart` hook 显式配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| Cursor Docs Hooks | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 优先部署 `beforeSubmitPrompt` PII 过滤 |
| 个人开发者 | 了解即可，暂无刚需 |
| 自动化作者 | 结合 Cursor Automations cron 触发 + hooks 审计 |

---

## 特性四：Sand 通用智能体内测（7/14 媒体报道，⚠️ 未官方确认）

### 是什么（机制说明）

据 [The Information](https://www.theinformation.com/briefings/cursor-working-competitor-claude-cowork) 与 [36氪 7/14](https://www.36kr.com/p/3894912989854720) 报道：

- **Sand** 是 Cursor 首款面向**非开发者**的通用 AI 智能体
- 目标：邮件回复、短信管理、电子表格整理、工程相关琐碎任务
- **2026 年 6 月下旬**在 Cursor 内部上线测试，员工为首批用户
- 尚未公布对外发布时间；SpaceX 收购可能改变产品路线图

### 适用场景

- **适合**（若正式发布）：非技术知识工作者的日常办公自动化
- **不适合**：当前阶段——产品未公开，无法使用

### 前置条件

⚠️ 产品未发布；仅内部测试

### 详细使用步骤（业务用户）

当前无法操作。若未来发布，预期路径：

1. Cursor 设置中启用 Sand
2. 连接邮件/日历/Slack 等集成
3. 描述任务让 Sand 自主执行
4. 审查并批准 Sand 的输出

### 命令与配置示例

```
# ⚠️ 推测性示例，产品未发布
/sand Reply to unread emails from last 24 hours with a summary
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Sand 产品 | ❌ 不可用（未发布） |
| 媒体报道 | ✅ The Information + 36氪 7/14 |
| Cursor 官方确认 | ❌ 无官方公告 |

### 问题与解决方案

**如何获取 Sand**：目前无法获取，关注 Cursor 官方 Changelog。**与 ChatGPT Work 区别**：⚠️ 推测 Sand 将Leverage Cursor 的代码执行可靠性做结构化自动化（表格逻辑、CRM 流程），而非纯对话助手。

### 官方 vs 社区交叉验证

| 来源 | 类型 |
|------|------|
| The Information | 媒体报道 |
| 36氪 | 媒体报道 |
| Cursor Changelog | 无 Sand 相关内容 |
| OpenAI ChatGPT Work | ✅ 已正式发布（竞品参照） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Cursor 付费开发者 | 关注但不必焦虑——Sand 不影响 3.11 编程能力 |
| 企业采购决策者 | 等待官方发布再评估；当前对标 ChatGPT Work / Claude Cowork |
| 投资者/观察者 | SpaceX 收购是最大变量——Sand 可能夭折或重组 |

---

## 特性五：Redesigned Project and Repo Pickers（3.11）

### 是什么（机制说明）

3.11 重构项目与仓库选择器：

- 搜索范围限定为 **This Computer / Cloud / Remote Machine**
- 移除 Home 概念，**No Repo** 为显式选项（可输入 `none` 或 `no repo` 搜索）
- 可在选择器内创建项目并连接 GitHub/GitLab/Azure DevOps
- **Run on** 选择器：Cloud / This Computer / Remote Machines
- 多仓库选择改为 Cloud 和 This Computer 飞窗内的 **Select Multiple** 开关

### 适用场景

- **适合**：多仓库/多根工作区开发者；Cloud Agent 与本地切换频繁的用户
- **不适合**：单仓库单根简单工作流

### 前置条件

Cursor ≥ 3.11

### 详细使用步骤（业务用户）

1. 打开 Cursor → 点击项目/仓库选择器
2. 选择运行环境：**This Computer** / **Cloud** / **Remote Machines**
3. 搜索或浏览仓库列表
4. 多仓库场景：在飞窗中开启 **Select Multiple**
5. 无仓库场景：选择 **No Repo**

### 命令与配置示例

```
# 选择器内搜索
输入 "none" → 定位 No Repo 选项

# Cloud Agent 启动
Run on → Cloud → 选择 repo → 选择 branch
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 新选择器 UI | ⚠️ 未实测（无 GUI） |
| Changelog 3.11 | ✅ 详细改进列表 |

### 问题与解决方案

**找不到 No Repo**：输入 `none` 或 `no repo` 搜索。**Cloud repo 仅存在于云端**：选择器会建议 clone 到本地。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ Picker Improvements 完整列表 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Cloud Agent 用户 | 熟悉 Run on → Cloud 路径 |
| 多 monorepo 开发者 | 使用 Select Multiple 一次选中多根 |

---

## 版本对照表

| 版本 | 发版日 | 关键特性 |
|------|--------|----------|
| 3.10 | 2026-06-30 | Team MCPs in marketplaces |
| 3.9 | 2026-06-29 | Cursor for iOS 公测 |
| **3.11** | **2026-07-10** | Side Chats、Conversation Search、Repo Pickers、Cloud Hooks |
| Sand | ⚠️ 未发布 | 通用办公 Agent（内测报道） |

## 今日研究员结论

Cursor 3.11 编程能力进入稳定观察期，Side Chats 与 Conversation Search 是提升长程 Agent 工作流效率的实用功能。Sand 内测报道标志 Cursor 战略从「纯编程」向「通用办公 Agent」扩张，但 SpaceX 收购阴影使产品命运不确定。开发者当前应聚焦 3.11 已发布功能；Sand 以官方公告为准。

---
