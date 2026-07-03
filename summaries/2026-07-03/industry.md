# 行业宏观 — 2026-07-03

> 覆盖触发日前 24–72 小时重大事件｜每项含「对普通开发者意味着什么」

---

## 1. Anthropic 披露 Fable 5 安全分类器细节与 CJS 越狱严重度框架（2026-07-02）

**发生了什么**

Anthropic 于 **2026-07-02** 发布 [More details on Fable 5's cyber safeguards and our jailbreak framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework)，在 Fable 5 全球恢复（7/1）后进一步公开技术细节。文档分两部分：

**安全分类器四类体系**：将网络安全相关请求分为 **Prohibited use**（勒索软件、恶意软件、C2 等，一律拦截）、**High-risk dual use**（漏洞利用开发等，拦截）、**Low-risk dual use**（多数防御性用途，监控/有时拦截）、**Benign use**（无害编码调试，允许）。Fable 5 的 **safety margin** 故意设得比旧模型更宽，以换取更强越狱防护，代价是 **更高误拦率**——与 36氪 7/2 社区反馈一致。

**Cyber Jailbreak Severity (CJS) 框架**：与 Amazon、Microsoft、Google 等 Glasswing 伙伴共建的草案，用 **CJS-0 至 CJS-4** 五级（指数级严重度）评估越狱。四轴评分：capability gain、breadth、ease of weaponization、discoverability。同步上线 **HackerOne** 项目征集 Fable 5 越狱报告（cyber-safeguards@anthropic.com 收反馈）。

**官方来源**：[Fable Safeguards & CJS Framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework)（Jul 2, 2026）｜[Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5)（Jul 1）

**对普通开发者意味着什么**

若你因 Fable 5 频繁降级而困惑，官方 7/2 文档解释了 **机制设计意图**（非 bug）：无害编码大多落在 Benign/Low-risk，但 safety margin 会扩大拦截面。日常任务继续用 **Sonnet 5**（默认，分类器更宽松）；安全研究可走 HackerOne 负责任披露通道。CJS 框架对普通开发者暂无直接操作影响，但预示未来越狱事件将按严重度分级响应，可能影响模型发布节奏。

---

## 2. Claude Code 2.1.200 发布：权限模型与后台 Agent 大修复（2026-07-03）

**发生了什么**

npm `@anthropic-ai/claude-code@latest` 于 **2026-07-03T20:52Z** 更新至 **2.1.200**（前日 2.1.198）。Changelog 核心变更：

- **默认权限模式改为 Manual**（CLI、`--help`、VS Code、JetBrains 统一；`--permission-mode manual` 与 `"defaultMode": "manual"` 均可）
- **`AskUserQuestion` 对话框默认不再自动继续**，需通过 `/config` 配置 idle timeout 才启用
- **大量 background agent 修复**：daemon handover、stale lock、Linux ~50s 自杀、SSH macOS audit session、subagent 后台默认运行等
- **SSL 证书错误立即失败并提示修复**（不再空耗重试）
- **流式响应中途 server error 保留 partial output**

本地实测：`claude --version` → `2.1.200 (Claude Code)`。

**官方来源**：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)｜npm `@anthropic-ai/claude-code@2.1.200`

**对普通开发者意味着什么**

升级后 **工具调用需更明确授权**（Manual 默认），适合企业合规场景但可能增加交互步骤。若你依赖 background subagent 长任务，2.1.200 值得尽快升级——修复了多个导致 agent 静默停止或 daemon 接管的严重 bug。用 `/config` 检查权限与 AskUserQuestion 超时设置是否符合团队习惯。

---

## 3. OpenAI Codex 预发布 alpha.35 发布（2026-07-03 02:33Z）

**发生了什么**

GitHub [rust-v0.143.0-alpha.35](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.35) 于 **2026-07-03T02:33Z** 发布（commit `5969673`），为 alpha 线 **连续第 3 日** 更新（alpha.33/34 于 7/2，alpha.35 于 7/3）。Release note 无详细 changelog。npm 已可安装 `@openai/codex@0.143.0-alpha.35`，但 `@latest` 仍指向稳定版 **0.142.5**。

**官方来源**：[GitHub Releases — alpha.35](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.35)｜[0.142.5 Latest](https://github.com/openai/codex/releases/tag/rust-v0.142.5)

**对普通开发者意味着什么**

生产环境继续 **0.142.5**；alpha 线三日连更暗示 0.143 stable 临近。隔离环境可 `npm install @openai/codex@0.143.0-alpha.35` 尝鲜。`codex features list` 显示 `code_mode`、`chronicle` 仍为 under development。

---

## 4. DeepSeek 预告 API 峰谷定价，国产商业化加速（2026-07-03 媒体报道）

**发生了什么**

光大证券 7/3 研报引述：DeepSeek 于 **6/29 晚** 向开发者邮件宣布 **V4 正式版**计费调整，**API 服务预计 7 月中旬起采用峰谷定价**——高峰时段价格为平时 **2 倍**。同期字节 **豆包专业版**上线三级阶梯定价（标准版 68 元/月、加强版 200 元/月、高级版 500 元/月，连续包年最高 5088 元）。智谱 GLM-5.2 国产算力 Day 0 适配叙事（6/17）仍被引用。

**官方来源**：光大证券研报（慧博，2026-07-03）｜36氪 [DeepSeek 融资 500 亿](https://36kr.com/p/3877226091180296)（7/2，商业化背景）

**对普通开发者意味着什么**

若你使用 DeepSeek API 做 Agent 推理，**7 月中旬前**应评估是否将批处理任务迁移至低谷时段以控成本。豆包专业版为高频 Coding 用户提供订阅选项，可与 Claude Code/Cursor 等 Agent 工具链组合（需自行配置 API 端点）。⚠️ 峰谷定价细则以 DeepSeek 官方后续公告为准。

---

## 5. Fable 5 恢复第 3 天：7/7 优惠窗口倒计时（2026-07-01 起）

**发生了什么**

Pro/Max/Team 用户 **至 2026-07-07** 可将每周用量 **50%** 用于 Fable 5 且不额外计费。7/7 后 Fable 5 将脱离订阅额度，需 **usage credits**（$10/$50 per Mtok）。虎嗅 7 月初稿报道 Anthropic 同步发布 **Fable 5 官方提示指南**（任务边界、并行子 Agent、证据核对）及 **Claude Desktop Linux 测试版**（Ubuntu 22.04+、Debian 12+）。

**官方来源**：[Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5)｜[虎嗅 — Fable5复活](https://www.huxiu.com/article/4872102.html)

**对普通开发者意味着什么**

距 7/7 仅剩 **4 天**（UTC），若计划体验 Fable 5 Frontier Code 能力应抓紧窗口。体验后评估是否值得 credits 溢价，或继续 Sonnet 5 + 国产 API 组合。Linux 用户可试用 Desktop 测试版的 Code 标签页 GUI diff 审查。
