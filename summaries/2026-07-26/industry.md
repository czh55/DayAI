# 行业宏观 — 2026-07-26

> 覆盖触发日前 24–72 小时重大事件｜每项含「对普通开发者意味着什么」

---

## 1. Kimi K3 权重开放进入最后倒计时（7/27 00:00 UTC）

**发生了什么**

月之暗面 7/16 在 WAIC 期间发布 **Kimi K3**（2.8T 参数稀疏 MoE，1M context，原生视觉），官方承诺完整权重将于 **2026 年 7 月 27 日前**以 Modified MIT 许可证开放。截至 7/26 22:01 UTC，距承诺节点 **不足 2 小时**（社区普遍预期 **7/27 00:00 UTC** 在 Hugging Face `moonshotai` 组织发布）。

技术细节已公开：MXFP4 权重量化、896 专家 MoE（每 token 激活 16 个）、KDA（Kimi Delta Attention）架构；官方建议生产部署需 **64+ 加速卡超节点**，权重文件约 **594GB**（社区估算）。vLLM 将同步发布 KDA prefill cache 实现。

7/25–7/26 国内媒体持续报道黄仁勋首条 X 推文力挺开放权重、硅谷「小科技联盟」警告勿封杀廉价开源模型等地缘政治叙事。

**官方来源**：[Kimi K3 Quickstart](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)｜[Kimi K3 Tech Blog](https://www.kimi.com/blog/kimi-k3)｜[新华社 7/16 报道](https://www.163.com/dy/article/L20JTKL405346RC6.html)

**对普通开发者意味着什么**

权重开放前仍以 API 为主（`platform.moonshot.cn` 或 Kimi Code `https://api.kimi.com/coding/`）。开放后个人几乎无法自托管完整 2.8T 模型；更现实路径是通过 Fireworks、Together 等托管推理或继续用 API。关注 Modified MIT 附加条款（MAU 门槛、合成数据条款）再决定商用。⚠️ 社区有独立测试报告提及幻觉率争议，生产部署前须自行评测。

---

## 2. Claude Opus 5 发布第 3 日：生态接入趋于平稳

**发生了什么**

Anthropic 于 7/24 正式发布 **Claude Opus 5**（`claude-opus-5`），定价维持 $5/$25 per Mtok。7/25–7/26 无新官方公告，但生态接入已全面铺开：
- **GitHub Copilot**：Pro+/Max/Business/Enterprise 可选 Opus 5（7/24 宣布，渐进 rollout）
- **AWS Bedrock**：多区域上线
- **Claude Code**：2.1.220 维护版（7/25 01:35 UTC）仍为最新，npm 未更新

7/26 社区与第三方（Coursiv、Codersera、Novaknown）持续发布 Opus 5 使用指南，聚焦 effort 调速（low/medium/high/xhigh）、1M context 窗口与 Frontier-Bench 43.3% 成绩解读。

**官方来源**：[Anthropic Opus 5 公告](https://www.anthropic.com/news/claude-opus-5)｜[GitHub Copilot Changelog](https://github.blog/changelog/2026-07-24-claude-opus-5-is-now-available-in-github-copilot/)｜[Claude Code v2.1.220](https://github.com/anthropics/claude-code/releases/tag/v2.1.220)

**对普通开发者意味着什么**

Opus 5 已从「发布日新闻」进入「日常工具」阶段。建议：日常任务用 medium effort 控成本；长程 Agent 循环用 xhigh；在 Copilot 中先小任务测试再用于生产 PR。Claude Code 用户确认 `claude --version` 为 2.1.220 即可，无需每日升级。

---

## 3. DeepSeek API 旧名退役第 3 日：迁移收尾期

**发生了什么**

DeepSeek 于 7/24 15:59 UTC 正式退役 `deepseek-chat` 与 `deepseek-reasoner` 旧 API 名。7/26 为退役后第 3 日，未迁移服务持续报错。国内技术社区迁移教程、SDK 升级指南仍在发酵，部分企业 CI/CD 流水线在周末后发现中断。

新模型名映射：
- `deepseek-chat` → `deepseek-v4-flash`
- `deepseek-reasoner` → `deepseek-v4-pro`

**官方来源**：DeepSeek API Docs｜[2026-07-24 DayAI 总结](../2026-07-24/china-ai.md)

**对普通开发者意味着什么**

立即全局搜索代码库与环境变量中的旧模型名。检查第三方 SDK 默认值、Docker 镜像、K8s ConfigMap。thinking 参数行为可能与旧版不同，须在 staging 环境回归测试。

---

## 4. OpenAI Codex 0.146.0 alpha 冲刺暂停观察日（7/26）

**发生了什么**

Codex GitHub 最新 Release 仍为 **0.146.0-alpha.10.1**（7/25 20:29 UTC），7/26 无新 alpha 版本。自 7/22 alpha.3 起，五日内已发 10+ 个 alpha 版本，7/26 出现「静默日」，可能预示 0.146.0 stable 发布前的冻结窗口。npm `@latest` 仍指向 **0.145.0**（7/21）。

**官方来源**：[Codex GitHub Releases](https://github.com/openai/codex/releases)｜[Codex Changelog](https://learn.chatgpt.com/docs/changelog)

**对普通开发者意味着什么**

生产环境继续锁定 0.145.0。若 7/27 前后发布 stable，关注 release notes 中 Code mode、`codex exec`、`/goal` 相关变更。alpha 评估者可继续锁定 `0.146.0-alpha.10.1` 做对比测试。

---

## 5. Cursor Router 发布第 5 日：成本治理成为 Teams 标配

**发生了什么**

Cursor 7/22 发布 **Cursor Router**，Auto mode 由智能路由器驱动，提供 Intelligence / Balance / Cost 三档优化。7/26 无新 Changelog，Router 进入发布第 5 日。社区持续讨论 brownfield 路由可预测性、Grok 4.5 作为路由底座的必要性，以及 Opus 5 是否已纳入路由池（⚠️ 无官方确认）。

**官方来源**：[Cursor Changelog Router](https://cursor.com/changelog)｜[Cursor Router 博客](https://cursor.com/blog/router)

**对普通开发者意味着什么**

Teams 用户默认已启用 Router。若项目对模型选择敏感，与 Admin 确认是否可禁用 Router 或锁定模式。评估 Cost 模式前先在小任务上对比 accepted-change 率。Opus 5 发布后关注 Router 是否自动路由至 Opus 5 做复杂任务。

---
