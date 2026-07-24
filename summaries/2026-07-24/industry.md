# 行业宏观 — 2026-07-24

> 覆盖触发日前 24–72 小时重大事件｜每项含「对普通开发者意味着什么」

---

## 1. Anthropic 发布 Claude Opus 5：半价 Fable 级智能成为新默认

**发生了什么**

2026 年 7 月 24 日，Anthropic 正式发布 **Claude Opus 5**（`claude-opus-5`），同日 Claude Code 发布 **2.1.219** 将其设为默认 Opus 模型。官方定位：以 Opus 4.8 相同定价（$5/$25 per Mtok）提供接近 Fable 5 的前沿智能，Fast mode 定价 $10/$50 per Mtok（约 2.5× 速度）。

核心 benchmark 宣称：
- **Frontier-Bench v0.1**：超越所有其他模型，成本低于 Opus 4.8 且性能翻倍
- **CursorBench 3.2**：max effort 下与 Fable 5 峰值差距 <0.5%，成本约一半
- **ARC-AGI 3**：得分约为次优模型 3 倍
- **OSWorld 2.0**：以 Fable 5 最佳结果约 1/3 成本超越所有模型

Opus 5 同步上线 Claude Max/Pro 默认模型、Claude API（`claude-opus-5`）、Claude Code `/model` 选择器。API 新增 beta 功能：对话中动态切换工具（不 invalidate prompt cache）、自动 fallback（安全分类器拦截时路由至其他模型）。

网络安全方面，Opus 5 在漏洞识别接近 Mythos 5，但 exploit 开发能力显著落后；cyber classifiers 比 Fable 5 干预少约 85%，被拦截请求默认 fallback 至 Opus 4.8。

**官方来源**：[Introducing Claude Opus 5](https://www.anthropic.com/news/claude-opus-5)｜[Claude Code v2.1.219 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.219)｜[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)

**对普通开发者意味着什么**

Claude Code 用户应立即 `npm install -g @anthropic-ai/claude-code@latest` 升级至 2.1.219，在 `/model` 中确认 Opus 行显示「Opus (1M context)」。API 用户可将 `claude-opus-4-8` 逐步迁移至 `claude-opus-5`，定价不变但 token 效率可能提升。注意 Fast mode 已移除 Opus 4.7 支持，仅适用于 Opus 5 与 Opus 4.8。若依赖 Fable 5 级网络安全 exploit 能力，仍需使用 Mythos 5。

---

## 2. DeepSeek 旧 API 名正式退役：全球迁移硬截止日到来

**发生了什么**

2026 年 7 月 24 日 **15:59 UTC**（北京时间 23:59），DeepSeek 正式停用 `deepseek-chat` 与 `deepseek-reasoner` 两个旧模型别名。自 4 月 V4 Preview 以来，这两个名称一直作为兼容路由指向 `deepseek-v4-flash` 的思考/非思考模式；截止后任何仍引用旧名的请求将直接报错，无 grace period 或软重定向。

官方迁移映射：

| 旧 model 名 | 新 model 名 | 额外动作 |
|-------------|-------------|----------|
| `deepseek-chat` | `deepseek-v4-flash` | 建议显式设 `thinking: {"type": "disabled"}` |
| `deepseek-reasoner` | `deepseek-v4-flash` | 加 `thinking: {"type": "enabled"}` |
| 更强推理 | `deepseek-v4-pro` | 单独压测后切换 |

关键陷阱：V4-Flash 默认启用 thinking mode，直接替换 `deepseek-chat` 而不禁用 thinking 可能导致延迟上升、成本增加、输出格式变化。多家技术博客（TECHi、Machine Brief、4sAPI）在截止日前集中发布迁移 checklist。

**官方来源**：[DeepSeek API Docs](https://api-docs.deepseek.com/)｜[V4 Preview Announcement](https://api-docs.deepseek.com/news/news260424/)｜[DeepSeek Pricing](https://api-docs.deepseek.com/quick_start/pricing)

**对普通开发者意味着什么**

若生产环境今日起出现 DeepSeek API 400/404 错误，首先检查 `model` 字段是否仍含 `deepseek-chat` 或 `deepseek-reasoner`。用 `grep -r "deepseek-chat\|deepseek-reasoner" .` 全局排查。迁移不仅是字符串替换，还需根据原用途配置 `thinking` 参数。使用国内云代理（百炼、火山方舟）的用户需确认代理层模型名是否已同步切换。

---

## 3. Codex 0.146.0-alpha 通道持续加速：7/24 再发两版

**发生了什么**

2026 年 7 月 24 日，OpenAI Codex GitHub 仓库继续密集发布 alpha 预发布版本：

| 版本 | 发布时间 (UTC) |
|------|----------------|
| **0.146.0-alpha.6** | 05:31 |
| **0.146.0-alpha.7** | 18:24 |

npm `@latest` 仍指向稳定版 **0.145.0**（7/21 发布）。自 7/22 起 alpha 通道已连续发布 alpha.1 至 alpha.7 共 7 个版本，显示 0.146.0 stable 发布在即。alpha 版本 release notes 较简略，详细变更需查看 commit diff。

0.145.0 stable 仍是生产推荐版本，含 `/import` 迁移、Bedrock 登录、多智能体 V2、分页线程历史等重大功能。

**官方来源**：[Codex GitHub Releases](https://github.com/openai/codex/releases)｜[0.146.0-alpha.7 Release](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.7)

**对普通开发者意味着什么**

生产环境继续使用 `npm install -g @openai/codex@latest`（0.145.0）。关注前沿功能的开发者可在隔离环境安装 `@openai/codex@0.146.0-alpha.7` 测试，但需承担不稳定风险。alpha 七日七版的高频迭代通常预示 stable 0.146.0 将在数日内发布。

---

## 4. Cursor Router 发布第 3 日：企业路由落地观察延续

**发生了什么**

2026 年 7 月 24 日 Cursor 无新 Changelog 条目，**Cursor Router**（7/22 发布）进入企业落地观察第 3 日。Router 是 Cursor Auto 模式的智能模型路由器，按任务类型与复杂度分发请求至前沿或性价比模型。

三档优化模式（Intelligence / Balance / Cost）在 Teams 计划默认开启，Enterprise 需 Dashboard 启用。Admin 可按团队/组织组限制模式、设置默认、允许/屏蔽底层模型。早期客户报告节省 31–52% 成本，但社区开始讨论复杂 brownfield 代码库场景下路由质量可预测性问题。

7 月 24 日 Anthropic Opus 5 发布进一步加剧竞争：Cursor 官方 early-access 评价称「Opus 5 在 CursorBench 接近 Fable 5 且成本约一半」，与 Router 降本叙事形成呼应。

**官方来源**：[Cursor Changelog 7/22](https://cursor.com/changelog)｜[Anthropic Opus 5 — Cursor 评价](https://www.anthropic.com/news/claude-opus-5)

**对普通开发者意味着什么**

Teams/Enterprise 用户可在模型选择器选 Auto 并切换三档优化。建议开启 routed model 显示以了解实际路由行为。个人 Pro 用户暂不受影响。Opus 5 发布后，关注 Cursor 是否将 Opus 5 纳入 Router 路由池及对应档位映射。

---

## 5. Kimi K3 权重开源倒计时 3 天：开源 3T 级模型临近

**发生了什么**

月之暗面 Kimi K3（2.8T 参数 MoE）于 7/16 发布 API，完整模型权重将于 **2026 年 7 月 27 日**前发布。7 月 24 日为倒计时第 3 天。K3 在 Frontend Code Arena 1679 分排名第一，超越 Claude Fable 5 的 1631 分，但官方承认整体仍落后 Fable 5 与 GPT-5.6 Sol。

预期许可证为 Modified MIT（与 K2 系列一致），允许商用但可能有 MAU 阈值与合成数据条款。截至今日 GitHub `MoonshotAI` 组织尚无 K3 仓库。

**官方来源**：[Kimi K3 Tech Blog](https://www.kimi.com/zh-cn/blog/kimi-k3)｜[Kimi API Platform](https://platform.kimi.com/docs/guide/kimi-k3-quickstart)

**对普通开发者意味着什么**

当前仅可通过 Kimi API（`kimi-k3`）或 Kimi Code CLI 使用 K3。自托管需等待 7/27 权重发布并评估硬件门槛（2.8T MoE 需数据中心级 GPU）。接入 TRAE/Cursor 等工具需自定义 Anthropic 兼容端点 `https://api.kimi.com/coding/`。
