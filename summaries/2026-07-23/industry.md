# 行业宏观 — 2026-07-23

> 覆盖触发日前 24–72 小时重大事件｜每项含「对普通开发者意味着什么」

---

## 1. DeepSeek 旧 API 名弃用倒计时 1 天：全球迁移进入最后窗口

**发生了什么**

DeepSeek 官方此前公告：`deepseek-chat` 与 `deepseek-reasoner` 两个旧模型名将于 **2026 年 7 月 24 日 15:59 UTC**（北京时间 7 月 24 日 23:59）彻底停用。7 月 23 日为迁移最后完整工作日。

官方映射关系：

| 旧 model 名 | 新 model 名 | 额外动作 |
|-------------|-------------|----------|
| `deepseek-chat` | `deepseek-v4-flash` | 无，直接替换 |
| `deepseek-reasoner` | `deepseek-v4-flash` | 请求体加 `thinking: {"type": "enabled"}` |
| 更强推理需求 | `deepseek-v4-pro` | 单独压测后切换 |

`base_url`（`https://api.deepseek.com`）、API Key、OpenAI ChatCompletions 请求格式均不变。V4 自 4 月 24 日 GA 以来，旧名一直作为别名路由到 V4-Flash，7/24 后别名撤销将导致 400/404 错误。

7 月 23 日，多家技术博客（ofox.ai、byteiota、Developers Digest）集中发布迁移指南，强调 `deepseek-reasoner` 迁移陷阱：直接换名会获得 Flash 级推理而非 Pro 级，需显式评估是否升级到 `deepseek-v4-pro`。

**官方来源**：[DeepSeek API Pricing](https://api-docs.deepseek.com/quick_start/pricing)｜[DeepSeek V4 Announcement](https://api-docs.deepseek.com/news/news250424)｜[ofox.ai 迁移指南](https://ofox.ai/zh/blog/deepseek-chat-reasoner-retire-migrate-v4-2026/)

**对普通开发者意味着什么**

立即检查代码库、CI 配置、`.env` 文件、LangChain/LLM 路由规则中是否仍引用 `deepseek-chat` 或 `deepseek-reasoner`。用 `grep -r "deepseek-chat\|deepseek-reasoner" .` 全局搜索。若使用国内云厂商（阿里百炼、火山方舟）代理 DeepSeek，确认其默认模型名是否已切换。迁移本身是一行改动，但遗漏将导致生产环境 7/24 晚间起全面报错。

---

## 2. Cursor Router 发布次日：企业智能路由进入落地观察期

**发生了什么**

2026 年 7 月 22 日发布的 **Cursor Router** 在 7 月 23 日进入企业落地观察期。Router 是 Cursor Auto 模式的智能模型路由器，按任务类型与复杂度将请求分发给前沿或性价比模型。

三档优化模式：

| 模式 | 定位 | 官方宣称 |
|------|------|----------|
| **Intelligence** | 前沿质量 | 接近 Fable 满意度，成本约低 60% |
| **Balance** | 日常驾驶 | 高于 Opus 4.8 满意度，成本约低 36% |
| **Cost** | 优化 token 花费 | 此前 Auto 路由的固定单价模式 |

Router 基于 60 万+ 真实请求训练，早期客户报告节省 31–52% 成本。Teams 计划默认开启，Enterprise 需 Dashboard 启用。Admin 可按团队/组织组限制模式、设置默认、允许/屏蔽底层模型。覆盖桌面、Web、iOS、CLI 与 SDK。

7 月 23 日社区开始讨论路由质量可预测性——部分开发者担忧复杂 brownfield 代码库场景下路由模型不稳定。

**官方来源**：[Cursor Changelog 7/22](https://cursor.com/changelog/router)｜[Introducing Cursor Router Blog](https://cursor.com/blog/router)｜[Cursor Router Docs](https://cursor.com/docs/cursor-router)

**对普通开发者意味着什么**

Teams/Enterprise 用户今日起可在模型选择器选 Auto 并切换三档优化。建议开启 routed model 显示（默认隐藏）以了解实际路由行为。个人 Pro 用户暂不受影响。与 Codex 0.145.0 `/import` 形成竞争：两边都在降低多模型切换成本，但 Cursor 走「按请求路由」、Codex 走「一键迁移设置」。

---

## 3. Codex 0.146.0-alpha 通道加速迭代：一日两版 alpha

**发生了什么**

2026 年 7 月 23 日，OpenAI Codex GitHub 仓库连发两个 alpha 预发布版本：

| 版本 | 发布时间 (UTC) |
|------|----------------|
| 0.146.0-alpha.4 | 00:46 |
| **0.146.0-alpha.5** | 20:02 |

npm `@latest` 仍指向稳定版 **0.145.0**（7/21 发布）。alpha 版本 release notes 较简略，详细变更需查看 commit diff。自 7/22 起 alpha 通道已连续发布 alpha.1 至 alpha.5 共 5 个版本，显示 0.146.0 stable 发布在即。

0.145.0 stable 仍是生产推荐版本，含 `/import` 迁移、Bedrock 登录、多智能体 V2 等重大功能。

**官方来源**：[Codex GitHub Releases](https://github.com/openai/codex/releases)｜[0.146.0-alpha.5 Release](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.5)

**对普通开发者意味着什么**

生产环境继续使用 `npm install -g @openai/codex@latest`（0.145.0）。若关注前沿功能，可通过 GitHub releases 安装 alpha 测试，但需承担不稳定风险。alpha 快速迭代通常预示 stable 0.146.0 将在数日内发布。

---

## 4. Anthropic Record a Skill 持续 rollout：录屏学技能进入付费用户

**发生了什么**

7 月 21–23 日，Anthropic **Record a Skill** 功能在 Claude Cowork 桌面端持续向 Pro、Max、Team 用户 rollout。用户通过 Claude Desktop 的 `+` 菜单选择「Record a skill」，录屏并旁白讲解工作流，Claude 将演示转化为可复用 Skill。

核心机制：追踪屏幕活动、鼠标路径、按键与语音解说，分析后生成可重复执行的 Skill。适用于整理发票、批量重命名、周报生成等重复性桌面任务。与 OpenAI Codex 6 月 18 日推出的 Record and Replay 形成直接竞争。

7 月 23 日多家媒体（Search Engine Journal、explainx.ai、Coursiv）发布深度解读，关注隐私问题（录屏可能捕获敏感信息）与 Team 计划共享 Skill 库的粘性价值。

**官方来源**：[@claudeai 7/21 公告](https://x.com/claudeai)｜[explainx.ai 解读](https://www.explainx.ai/blog/claude-cowork-record-a-skill-screen-recording-july-2026)｜[Search Engine Journal](https://www.searchenginejournal.com/anthropics-claude-can-now-watch-a-video-and-learn-your-job/583053/)

**对普通开发者意味着什么**

这是 Cowork 从「数字同事」向「可教学自动化」的延伸，与 Claude Code 的 Skill/MCP 生态形成互补：桌面端录屏学技能，CLI 端用 Markdown Skill 封装。对非开发者知识工作者价值更大；开发者可将常见部署/数据清洗流程录屏一次、反复调用。需更新 Claude Desktop 到最新版并在 `+` 菜单中确认功能可用。

---

## 5. Kimi K3 权重开源倒计时 4 天：国产 2.8T 模型生态整合待验证

**发生了什么**

月之暗面 **Kimi K3**（2.8 万亿参数 MoE 模型）于 7 月 17 日发布，完整权重定于 **7 月 27 日** 开源。7 月 23 日距开源还有 4 天。

K3 在 SWE-Bench、Terminal-Bench 等编程基准上表现强劲，已被 Cursor Composer 2.5 训练管线部分采用（85% 算力用于后训练 RL）。TRAE 中国版需通过 Anthropic 兼容接口 `https://api.kimi.com/coding/` 自定义配置，预设列表尚未更新。

社区关注 K3 开源后国产 IDE（TRAE、Qoder、CodeBuddy）的预设模型整合速度，以及是否能在 Cursor Router 路由池中作为性价比选项。

**官方来源**：[Kimi K3 发布](https://www.moonshot.cn/)｜[TRAE 社区 K3 接入讨论](https://forum.trae.cn/t/topic/168808)｜[量子位 Composer 2.5 报道](https://www.qbitai.com/2026/05/419990.html)

**对普通开发者意味着什么**

若计划本地部署或微调 K3，关注 7/27 权重发布。若使用 TRAE，提前配置 Anthropic 兼容端点。K3 开源可能推动国产编程工具降低对 Claude API 的依赖，但 Harness 与上下文工程能力仍是差异化关键。

---
