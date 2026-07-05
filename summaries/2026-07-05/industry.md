# 行业宏观 — 2026-07-05

> 覆盖触发日前 24–72 小时重大事件｜每项含「对普通开发者意味着什么」

---

## 1. Codex 预发布线 0.143.0-alpha.36 发布（7/5 01:02Z）

**发生了什么**

OpenAI Codex GitHub 于 2026-07-05 01:02Z 发布预发布版 **0.143.0-alpha.36**，距 alpha.35（7/3 02:33Z）约 46 小时。Release notes 仅标注「Release 0.143.0-alpha.36」，无详细 changelog 条目（与近期 alpha 惯例一致）。稳定版 **0.142.5**（7/1）仍为 GitHub/npm Latest。本地实测 alpha.36 可安装运行，`features list` 显示 `code_mode_host` 为 under development 新旗标。

**官方来源**：[Codex Release alpha.36](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.36)（7/5）｜[Codex Release 0.142.5](https://github.com/openai/codex/releases/tag/rust-v0.142.5)（7/1）

**对普通开发者意味着什么**

生产环境继续锁定 **0.142.5 stable**；尝鲜用户可在隔离环境 `npm install @openai/codex@0.143.0-alpha.36` 跟踪 0.143 分支。alpha 一日一更节奏显示 Codex 团队活跃，但 7/5 无用户可见功能说明——勿将 alpha 当作生产依赖。

---

## 2. GPT-5.6 Sol/Terra/Luna 传闻窗口 7/7–9 倒计时 2 天

**发生了什么**

OpenAI 于 6/26 官方预览 [GPT-5.6 Sol](https://openai.com/index/previewing-gpt-5-6-sol/) 系列三款模型，当前仅向 trusted partners 开放 API/Codex 预览。多家媒体（Axios、VentureBeat、explainx.ai）援引 Sam Altman 内部表态，预计 **7/10–17** 全面开放 ChatGPT/Codex/API；社区泄露称 Codex App 源码含 GPT-5.6 Sol/Terra/Luna 标识及「速度拨盘」，目标窗口 **7/7–9**——与 Anthropic Fable 5 周额度 **7/7 截止**时间重叠。截至 7/5 22:02Z，OpenAI 未发布 GA 日期。

**官方来源**：[Previewing GPT-5.6 Sol](https://openai.com/index/previewing-gpt-5-6-sol/)（6/26）｜[OpenAI Help Center](https://help.openai.com/en/articles/20001325-a-preview-of-gpt-56-sol-terra-and-luna)｜⚠️ 7/7 定档为社区泄露，非 OpenAI 官方确认

**对普通开发者意味着什么**

7/6–7/7 是关键观察窗口：关注 Codex `features list` 是否出现 `gpt-5.6-*` 模型、ChatGPT 是否上线 Terra/Luna。若 GPT-5.6 全面开放，Fable 5 额度截止后开发者将面临选型压力。建议勿提前改生产依赖，等待官方 GA 公告。

---

## 3. Fable 5 周额度 7/7 截止倒计时（剩余 2 天）

**发生了什么**

Anthropic 6/30 宣布 [Fable 5 全球恢复](https://www.anthropic.com/news)，Pro/Max/Team 用户在当地时间 **7/7 前**可将每周额度的 **50%** 用于 Fable 5。7/7 之后继续使用需 **usage credits**；标准 Enterprise 席位默认不含 Fable 5 额度。虎嗅 7/1 报道首批用户反馈聚焦安全分类器误拦与降级 Opus 4.8 体验落差，而非否认 Fable 5 基准能力。

**官方来源**：[Redeploying Fable 5](https://www.anthropic.com/news)（6/30）｜[虎嗅 Fable5复活](https://www.huxiu.com/article/4872102.html)（7/1）

**对普通开发者意味着什么**

若计划用 Fable 5 处理复杂工程任务，**7/6 前**应消耗剩余周额度。7/7 后评估是否购买 credits 或切换 Sonnet 5（默认模型，网络安全护栏严格度低于 Fable 5）。企业用户联系管理员确认 Enterprise credits 配置。

---

## 4. Anthropic CJS 越狱严重度框架进入落地讨论期（7/2 技术长文）

**发生了什么**

7 月 2 日 Anthropic 发布 [Fable 5 cyber safeguards & jailbreak framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework) 技术长文，详述 Fable 5 **四类网络安全分类器**（Prohibited / High-risk dual use / Low-risk dual use / Benign）及 **CJS（Cyber Jailbreak Severity）** 框架草案。Glasswing 伙伴（Amazon、Microsoft、Google 等）共建。同步上线 HackerOne 计划征集 Fable 5 越狱报告。7/5 行业讨论焦点从「解禁情绪」转向「安全 margin 误拦率」与「可审计标准」。

**官方来源**：[More details on Fable 5's cyber safeguards](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework)（7/2）

**对普通开发者意味着什么**

Fable 5 误拦后降级 Opus 4.8 的行为现在有官方分类表可对照。若任务落在「Low-risk dual use」或 safety margin，可尝试改写 prompt 或换 Sonnet 5。企业安全团队可用 CJS 框架与 Anthropic 对齐越狱严重度沟通语言。

---

## 5. DeepSeek V4 正式版 7 月中旬 + API 峰谷定价倒计时

**发生了什么**

6/29 DeepSeek 宣布 V4 正式版 **7 月中旬**上线，同步引入 **峰谷定价**：北京时间 9:00–12:00、14:00–18:00 为高峰，价格为平时 2×。36氪、腾讯新闻等多源交叉验证。7/2 36氪报道 DeepSeek 完成 510 亿元融资、DSpark 推理加速框架已部署。7/5 距正式版上线约 1–2 周。

**官方来源**：[36氪快讯](https://36kr.com/newsflashes/3874139626984448)（6/29）｜[36氪 DeepSeek变胖了](https://36kr.com/p/3877226091180296)（7/2）

**对普通开发者意味着什么**

工作时段 API 成本将翻倍——非紧急推理应调度至夜间/午休。配合 DSpark 推理加速（官方称单用户生成速度最高 +85%），可部分抵消高峰溢价。国内 Agent 管线若依赖 DeepSeek，7 月中旬前应完成成本模型更新。

---
