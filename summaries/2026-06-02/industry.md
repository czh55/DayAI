# 行业大事件 — 2026-06-02

> 日期锚定：自动化触发日 2026-06-02（UTC）。部分事件新闻稿发布于 6/1–6/2 美东时间，均纳入本日综述。

---

## 1. Anthropic 秘密递交 IPO S-1，估值约 9650 亿美元

**发生了什么**  
2026 年 6 月 1 日，Anthropic 宣布已向美国 SEC **秘密提交** Form S-1 草案，为潜在 IPO 铺路；具体股数与发行价尚未确定，上市时间取决于市场条件与监管审查。此前约一周，公司完成约 650 亿美元融资，投后估值约 **9650 亿美元**，在估值上首次超过 OpenAI（约 8520 亿美元）。公司披露年化收入 run rate 已升至约 **470 亿美元**（较 2025 年约 100 亿大幅增长）。

**官方 vs 社区**  
- 官方/权威：[CNBC 报道](https://www.cnbc.com/2026/06/01/anthropic-ipo-s1-prospectus.html)、[Anthropic 声明引述](https://www.cnbc.com/2026/06/01/anthropic-ipo-s1-prospectus.html)  
- 社区解读：[Tech Funding News](https://techfundingnews.com/anthropic-files-for-ipo-beating-openai-to-the-punch/)、[The Next Web](https://thenextweb.com/news/anthropic-ipo-confidential-filing-openai-race-965-billion)  
- **一致性**：均确认「秘密递交、未定价、与 OpenAI IPO 竞赛」；社区对「最早 2026 年秋上市」为推测，非 SEC 文件原文。

**对普通开发者意味着什么**  
短期对你写代码的方式几乎无直接影响，但会间接改变 **Claude API 定价稳定性、企业采购周期、以及 Claude Code 在企业中的合规叙事**。若你依赖 Claude 做生产级 Agent，应关注未来财报季是否出现 **速率限制、新区域部署、或 ToS 调整**；个人开发者仍可照常使用 API/Claude Code，但公司层面可能更早要求「供应商上市主体 + SOC2」类审查。

---

## 2. OpenAI 将 Codex 扩展为企业工作平台：Sites + 角色插件 + Annotations

**发生了什么**  
2026 年 6 月 2 日，OpenAI 宣布 Codex 重大更新：**Sites**（预览）可把分析/文档变成可分享的托管 Web 应用；**六个角色向插件**捆绑约 62 个企业应用与 110 项自动化技能；**Annotations** 支持就地编辑 Agent 产出。VentureBeat 等称非开发者已占 Codex 周活约 20%，增速约为工程师 3 倍。

**官方 vs 社区**  
- 官方：[OpenAI 博客 Codex for every role](https://openai.com/index/codex-for-every-role-tool-workflow/)、[Plugins 文档](https://developers.openai.com/codex/plugins)  
- 社区：[VentureBeat](https://venturebeat.com/orchestration/openais-codex-update-lets-agents-build-interactive-enterprise-workspaces-via-sites-and-role-specific-plugins)、[The Next Web](https://thenextweb.com/news/openai-codex-enterprise-plugins-sites-non-developers)  
- **一致性**：Sites 为 Business/Enterprise 预览、经 Codex App 侧栏管理；社区强调「编排层坐在 Salesforce/Figma/Snowflake 之上」与官方一致。CLI 可装插件，Sites 托管由 OpenAI 承担。

**对普通开发者意味着什么**  
若你只用 **Codex CLI 写代码**，CLI 0.136.0 的归档、app-server 等仍与你相关；**Sites 更像给产品/运营/财务的「免前端交付」**，但会改变团队分工——工程师可能要维护 **插件 manifest、RBAC、密钥与托管环境变量**。建议把 Codex 插件当作「带技能的 MCP 包」来版本化管理。

---

## 3. 白宫签署 AI 行政令：自愿 30 天前沿模型网络安全评估框架

**发生了什么**  
2026 年 6 月 2 日，特朗普签署行政令 **《Promoting Advanced Artificial Intelligence Innovation and Security》**。核心包括：30 天内设立 **AI 网络安全 clearinghouse**（财政部牵头，协同 NSA/CISA）；60 天内建立 **机密基准** 以界定「covered frontier model」；开发者可 **自愿** 在发布前约 30 天向政府提供模型访问以供网络安全能力评估。文本明确 **不授权** 强制许可或预审批。

**官方 vs 社区**  
- 官方：[白宫全文](https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/)  
- 社区：[Lawfare 解读](https://www.lawfaremedia.org/article/white-house-releases-executive-order-on-ai)、[GovInfoSecurity](https://www.govinfosecurity.com/trump-signs-voluntary-ai-cyber-review-order-a-31833)、[The Next Web](https://thenextweb.com/news/trump-signs-downsized-ai-executive-order-voluntary-review)  
- **差异点**：早期草案传闻 90 天 **强制** 审查被缩减为 30 天 **自愿** 框架；社区与官方在「非强制」上一致。

**对普通开发者意味着什么**  
除非你在大模型公司做 **发布合规**，日常编码不受影响。中长期可能看到：**美国政企客户要求供应商说明是否参与自愿评估**、安全基准成为 RFP 条目。开源权重发布节奏或企业「对外承诺」文案会受影响，但不像 GDPR 那样直接约束个人 GitHub 账号。

---

## 4. Claude 平台 6/2 更新：Advisor `max_tokens` 与拒绝不计费

**发生了什么**  
Anthropic 平台 release notes 在 **2026-06-02** 记录：Advisor 工具支持 `max_tokens` 封顶单次顾问输出；Claude API 在 `stop_reason: "refusal"` 且 **无模型输出** 时不计费。同日条目还指向 Claude Code 侧 **Auto 模式扩展**、Max 用户 Opus 4.8 **fast mode 默认**、**Workflows 研究预览**（详见 [claude-code.md](./claude-code.md)）。

**官方 vs 社区**  
- 官方：[Platform release notes](https://platform.claude.com/docs/en/release-notes/overview)  
- 社区：5/28–6/2 大量 Substack/Medium 文章讨论 Dynamic Workflows（与官方 5/28 博客一致）  
- **一致性**：API 计费规则以官方为准；Workflows 细节以 [code.claude.com/workflows](https://code.claude.com/docs/en/workflows) 为准。

**对普通开发者意味着什么**  
用 **Messages API + advisor 工具** 做「执行模型 + 顾问模型」架构的团队，可直接用 `max_tokens` **控成本**；拒绝不计费减少「空回拒绝」账单噪音。Claude Code 用户应评估 Workflow/ultracode 的 **token 倍增**，在长跑任务上启用 Auto 或 fast mode 时注意套餐用量。

---

## 5. Cursor 3.6 Auto-review：分类子代理减少 Agent 审批打断

**发生了什么**  
2026 年 5 月 29 日发布的 Cursor **3.6** 引入 **Auto-review** 运行模式：对 Shell、MCP、Fetch 调用，白名单立即执行、可沙箱则进沙箱，其余交由 **分类子代理** 决定放行、换方案或弹出人工审批。可通过 `Settings > Cursor Settings > Agents > Run Mode` 配置，并用 `.cursor/permissions.json` 的 `autoRun` 引导分类器（详见 [cursor.md](./cursor.md)）。

**官方 vs 社区**  
- 官方：[Changelog](https://cursor.com/changelog)、[permissions.json 参考](https://cursor.com/docs/reference/permissions)  
- 社区：[Cursor Forum 讨论](https://forum.cursor.com/t/auto-review-run-mode/161922)、[Vibe Coder Blog](https://blog.vibecoder.me/cursor-auto-review-agentic-run-mode)  
- **一致性**：三方均强调分类器 **非确定性、非安全边界**；论坛确认可用 `permissions.json`。

**对普通开发者意味着什么**  
长任务 Agent（改几十个文件、反复跑测试）可 **少点几百次 Allow**。代价是可能 **误放行** 危险命令——务必用 `block_instructions` 写清「禁止动生产库、禁止 git push」等，敏感仓库仍建议 Allowlist 模式而非完全 Auto-review。

---

## 6. 同日 CLI 工程发布：Codex 0.136.0 与 Claude Code 2.1.161

**发生了什么**  
OpenAI 在 GitHub 发布 [codex rust-v0.136.0](https://github.com/openai/codex/releases/tag/rust-v0.136.0)（会话归档、TUI Markdown 链接、app-server `--stdio`、远程 `CODEX_API_KEY` 等）。npm 上 `@anthropic-ai/claude-code` 本地实测为 **2.1.161**，高于 Dynamic Workflows 文档要求的 2.1.154+。

**对普通开发者意味着什么**  
建议在团队 `tools/package.json` **锁定 minor 版本** 并每周跑一次 `codex doctor` / `claude --version`，避免 CI 与本地行为漂移。无 OpenAI/Anthropic 登录的自动化环境只能测 **--help / doctor / features**，交互功能需标注未实测（见各工具文档）。
