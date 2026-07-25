# 行业宏观 — 2026-07-25

> 覆盖触发日前 24–72 小时重大事件｜每项含「对普通开发者意味着什么」

---

## 1. Claude Opus 5 进入生态全面接入日（7/24–7/25）

**发生了什么**

Anthropic 于 7/24 正式发布 **Claude Opus 5**（`claude-opus-5`），定价维持 $5/$25 per Mtok（与 Opus 4.8 相同），Fast mode $10/$50。官方宣称 Frontier-Bench v0.1 达 43.3%（Fable 5 为 33.7%），GDPval-AA Elo 1,861 领先 Fable 5。Claude Code 2.1.219 同步将 Opus 5 设为默认 Opus 模型。

7/25 次日，生态接入全面铺开：
- **GitHub Copilot** 宣布 Opus 5 向 Pro+/Max/Business/Enterprise 用户开放（[GitHub Changelog](https://github.blog/changelog/2026-07-24-claude-opus-5-is-now-available-in-github-copilot/)）
- **AWS Bedrock** 在 US East、Europe、Asia Pacific 多区域上线（[AWS Blog](https://aws.amazon.com/blogs/machine-learning/introducing-claude-opus-5-on-aws-anthropics-most-capable-opus-model/)）
- **Claude Code** 发布 2.1.220 维护版（7/25 01:35 UTC），仅含 bug fixes

**官方来源**：[Anthropic Opus 5 公告](https://www.anthropic.com/news/claude-opus-5)｜[GitHub Copilot Changelog](https://github.blog/changelog/2026-07-24-claude-opus-5-is-now-available-in-github-copilot/)｜[Claude Code v2.1.220 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.220)

**对普通开发者意味着什么**

Opus 5 已从「Anthropic 自家产品」扩展为 Copilot、Bedrock、Claude Code 多平台可用。若你使用 GitHub Copilot，可在模型选择器中尝试 Opus 5 做长程 Agent 任务；API 用户可将 `model` 改为 `claude-opus-5` 且定价不变。建议先用 medium effort 测试成本，复杂 Agent 循环再用 xhigh。

---

## 2. Kimi K3 权重开源倒计时进入最后 48 小时（7/27）

**发生了什么**

月之暗面 7/16 在 WAIC 期间发布 **Kimi K3**（2.8T 参数稀疏 MoE，1M context，原生视觉），官方承诺完整权重将于 **2026-07-27** 前以 Modified MIT 许可证开放。截至 7/25，Hugging Face 已设置倒计时页面，但 GitHub MoonshotAI 组织尚无 K3 仓库。

7/25 国内媒体集中报道：黄仁勋发出人生首条 X 推文，签署英伟达《开放权重与美国 AI 领导力》联名信，力挺开放权重路线；36氪称近 200 家硅谷初创组成「小科技联盟」警告政府勿封杀廉价开源模型。

**官方来源**：[Kimi K3 Quickstart](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)｜[36氪：黄仁勋首推 Kimi K3](https://www.36kr.com/p/3909804755342726)

**对普通开发者意味着什么**

7/27 前仍以 API 为主（`platform.moonshot.cn` 或 Kimi Code）。权重开放后个人几乎无法自托管 2.8T 模型（官方建议 64+ 加速卡超节点），更现实的路径是通过 Fireworks、Together 等托管推理或继续用 API。关注 Modified MIT 附加条款（MAU 门槛、合成数据条款）再决定商用。

---

## 3. DeepSeek API 旧名退役后第 2 日：迁移合规窗口关闭

**发生了什么**

DeepSeek 于 7/24 15:59 UTC 正式退役 `deepseek-chat` 与 `deepseek-reasoner` 旧 API 名。7/25 为退役后首个完整工作日，未迁移服务持续报错。国内技术社区迁移教程、SDK 升级指南仍在发酵。

**官方来源**：DeepSeek API Docs｜[2026-07-24 DayAI 总结](../2026-07-24/china-ai.md)

**对普通开发者意味着什么**

若仍使用旧模型名，立即改为 `deepseek-v4-flash`（原 chat）或 `deepseek-v4-pro`（原 reasoner）。检查环境变量、CI 配置、第三方 SDK 默认值。thinking 参数行为可能与旧版不同，需在 staging 环境回归测试。

---

## 4. OpenAI Codex 0.146.0 alpha 冲刺：一日三版（7/25）

**发生了什么**

Codex GitHub 在 7/25 密集发布：
- **0.146.0-alpha.9**（00:34 UTC）
- **0.146.0-alpha.10**（02:18 UTC）
- **0.146.0-alpha.10.1**（20:29 UTC）

自 7/22 alpha.1 起，四日内已发 10+ 个 alpha 版本，0.146.0 stable 发布在即。npm `@latest` 仍指向 **0.145.0**（7/21）。

**官方来源**：[Codex GitHub Releases](https://github.com/openai/codex/releases)

**对普通开发者意味着什么**

生产环境继续锁定 0.145.0。若评估 alpha，建议容器隔离并锁定具体版本号（如 `0.146.0-alpha.10.1`），勿用浮动 `@alpha` 标签。stable 发布前关注 `/import`、Code mode、`codex exec` 相关变更。

---

## 5. Cursor Router 发布第 4 日：成本治理成为 Teams 标配

**发生了什么**

Cursor 7/22 发布 **Cursor Router**，Auto mode 由智能路由器驱动，提供 Intelligence / Balance / Cost 三档优化。7/25 无新 Changelog，Router 进入发布第 4 日。社区与第三方（Digital Applied、DEV Community）持续讨论 brownfield 路由可预测性与 Grok 4.5 作为路由底座的必要性。

**官方来源**：[Cursor Changelog Router](https://cursor.com/changelog/router)｜[Cursor Router 博客](https://cursor.com/blog/router)

**对普通开发者意味着什么**

Teams 用户默认已启用 Router。若项目对模型选择敏感（如需固定 Sonnet 做代码审查），与 Admin 确认是否可禁用 Router 或锁定模式。Enterprise 需 Admin 手动启用。评估 Cost 模式前先在小任务上对比 accepted-change 率。

---
