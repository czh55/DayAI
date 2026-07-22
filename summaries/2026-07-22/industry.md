# 行业宏观 — 2026-07-22

> 覆盖触发日前 24–72 小时重大事件｜每项含「对普通开发者意味着什么」

---

## 1. Cursor Router 发布：智能模型路由成为 IDE 标配

**发生了什么**

2026 年 7 月 22 日，Cursor 正式发布 **Cursor Router**——面向 Teams 与 Enterprise 的智能模型路由系统。Auto 模式不再使用简单启发式规则，而是按任务类型与复杂度分析每个请求，将工作分发给最合适的前台或性价比模型。

三档优化模式：

| 模式 | 定位 | 官方宣称效果 |
|------|------|-------------|
| **Intelligence** | 前沿质量，匹配最贵最强模型 | 接近 Fable 满意度，成本约低 60% |
| **Balance** | 日常驾驶级质量 | 高于 Opus 4.8 满意度，成本约低 36% |
| **Cost** | 在可用智能上限内优化 token 花费 | 此前 Auto 路由的固定单价模式 |

Router 基于 60 万+ 真实请求训练，在数百万请求 A/B 测试中验证。早期客户报告 Auto 路由请求节省 31–52% 成本且质量无下降。Admin 可按团队/组织组启用、限制模式、设置默认、允许/屏蔽底层模型。Teams 计划默认开启，Enterprise 需 Dashboard 启用。覆盖桌面、Web、iOS、CLI 与 SDK。

**官方来源**：[Cursor Changelog 7/22](https://cursor.com/changelog)｜[Introducing Cursor Router Blog](https://cursor.com/blog/router)｜[Cursor Forum 7/22](https://forum.cursor.com/t/introducing-cursor-router/166386)

**对普通开发者意味着什么**

若你使用 Cursor Teams/Enterprise，今日起可在模型选择器选 Auto 并切换三档优化。个人 Pro 用户暂不受影响。路由降本意味着日常补全与简单任务可能自动走性价比模型，复杂重构仍路由前沿模型——建议观察 routed model 显示（默认隐藏）以了解实际路由行为。与 Codex 0.145.0 `/import` 形成竞争：两边都在降低多模型切换与迁移成本。

---

## 2. AMD 与 Anthropic 战略合作：2GW MI450 GPU 部署

**发生了什么**

2026 年 7 月 22 日，AMD 与 Anthropic 宣布多年战略合作：

- Anthropic 将部署最多 **2 吉瓦** AMD Instinct MI450 Series GPU，采用 AMD Helios 机架级方案
- 首批 1 吉瓦计划于 **2027 年上半年** 开始部署
- 双方将协作使用 Claude 优化 AMD Instinct GPU 工作负载并加速 ROCm 开发
- AMD 承诺对 Anthropic 进行最高 **50 亿美元** 战略股权投资

Anthropic 联合创始人兼首席计算官 Tom Brown 表示：「通过与 AMD 在全栈合作，我们确保所需算力容量，并将工作负载映射到合适硬件。」

**官方来源**：[AMD Press Release 7/22](https://ir.amd.com/news-events/press-releases/detail/1292/amd-and-anthropic-announce-strategic-partnership-to-deploy-up-to-2-gigawatts-of-amd-instinct-mi450-series-gpus)｜[Anthropic News](https://www.anthropic.com/news)

**对普通开发者意味着什么**

短期内对 CLI 用户无直接影响，但标志着 Anthropic 算力供应链多元化（不再仅依赖 NVIDIA）。ROCm 优化可能改善 Claude 在 AMD 硬件上的推理成本，长期或间接影响 API 定价与可用性。Fable 5 额度紧张背景下，算力扩张是缓解供需矛盾的必要条件。

---

## 3. Anthropic「Record a Skill」：录屏教学取代手写 Prompt

**发生了什么**

7 月 21–22 日，Anthropic 在 Claude 桌面端 Cowork 界面推出 **「Teach Claude a skill」/ Record a Skill** 功能：

- 用户录制屏幕并旁白讲解工作流，Claude 将演示转化为可复用 Skill
- 追踪屏幕活动、鼠标路径、按键与语音解说
- 适用于整理发票、批量重命名文件、周报生成等重复性桌面任务
- 面向 Claude Pro、Max、Team 订阅用户逐步 rollout

同期 Anthropic 还发布 **Economic Index Connector**（7/22），允许在 claude.ai 直接查询 AI 经济影响数据。

**官方来源**：[Android Authority 7/21](https://www.androidauthority.com/claude-cowork-record-skills-feature-3689919/)｜[Anthropic Economic Index Connector 7/22](https://www.anthropic.com/news/anthropic-economic-index-connector)｜[@claudeai 7/21](https://x.com/claudeai)

**对普通开发者意味着什么**

这是 Cowork 从「数字同事」向「可教学自动化」的延伸，与 Claude Code 的 Skill/MCP 生态形成互补：桌面端录屏学技能，CLI 端用 Markdown Skill 封装。对非开发者知识工作者价值更大；开发者可将常见部署/数据清洗流程录屏一次、反复调用。

---

## 4. Claude Code 2.1.218：后台 Code Review 与 Auto 模式进化

**发生了什么**

2026 年 7 月 22 日 21:24 UTC，Anthropic 发布 Claude Code **2.1.218**。核心变更：

- `/code-review` 改为**后台子智能体**运行，审查工作不再占满主对话
- `context: fork` 技能默认**后台执行**（`background: false` 可关闭）
- Auto 模式下危险 rm、后台 `&`、可疑 Windows 路径不再弹权限对话框，改由 auto-mode classifier 裁决
- Plan mode + auto 不再对静态分析器无法证明只读的 Bash 命令弹窗
- `/deep-research` 仅手动触发，Claude 不再自动启动
- 修复 Windows `\u` 路径乱码、MCP 连接错误显示、ultrareview 描述性参数等 30+ 项

**官方来源**：[GitHub v2.1.218 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.218)

**对普通开发者意味着什么**

Code Review 后台化显著改善长会话体验——审查不再阻塞主线程。Auto 模式权限判定更智能，减少打断，但也意味着 classifier 误判时用户需主动检查。建议更新后运行 `claude --version` 确认 2.1.218，并在 CI 中验证 `/code-review` 行为变化。

---

## 5. DeepSeek 旧 API 弃用倒计时 2 天：迁移窗口即将关闭

**发生了什么**

DeepSeek 官方此前公告：`deepseek-chat` 与 `deepseek-reasoner` 两个旧模型名将于 **2026 年 7 月 24 日** 停用。当前阶段分别指向 `deepseek-v4-flash` 的非思考模式与思考模式。`base_url` 不变，仅需将 `model` 参数改为 `deepseek-v4-pro` 或 `deepseek-v4-flash`。

V4 GA 已上线官网、App 与 API，支持 OpenAI ChatCompletions 与 Anthropic 兼容两套接口，引入峰谷计费。

**官方来源**：[DeepSeek API 文档](https://platform.deepseek.com)｜[36氪 7/20](https://www.36kr.com/p/3780352529077509)

**对普通开发者意味着什么**

**仅剩 2 天**。生产环境若仍使用旧模型名，必须在 7/24 前完成迁移。个人项目可先用 `deepseek-v4-flash` 测试，生产推荐 `deepseek-v4-pro`。详见 [`china-ai.md`](./china-ai.md) 中的 curl/Python SOP。

---
