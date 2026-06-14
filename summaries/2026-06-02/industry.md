# 2026-06-02 AI 行业大事件

## 1. OpenAI Codex 向知识工作者全面扩展

**时间**：2026-06-02  
**来源**：[OpenAI 官方公告](https://openai.com/index/codex-for-every-role-tool-workflow/) · [TechCrunch 报道](https://techcrunch.com/2026/06/02/openai-launches-new-codex-tools-for-white-collar-work/)

OpenAI 发布 Codex 企业版重大更新，核心三项能力：

- **Sites（预览）**：将分析、计划、数据转化为可托管的交互式网页/仪表盘，通过 workspace URL 分享给同事
- **Annotations**：指向文档、表格、幻灯片或 Site 的特定区域进行精准编辑，类似开发者的代码注释工作流
- **6 个角色插件**：覆盖数据分析、创意制作、销售、产品设计、股权投资、投行，聚合 62 个业务应用、110 项自动化技能（Snowflake、Figma、Salesforce 等）

**数据亮点**：Codex 周活用户约 500 万，非开发者占比 20%，且采用速度是工程师的 3 倍。

---

## 2. Claude Code v2.1.160 发布（6 月 2 日凌晨）

**来源**：[GitHub Release v2.1.160](https://github.com/anthropics/claude-code/releases/tag/v2.1.160)

今日最重要的变更：

| 类别 | 内容 |
|------|------|
| 安全 | 写入 shell 启动文件（`.zshenv` 等）和构建工具配置（`.npmrc` 等）前强制确认 |
| 工作流 | 动态工作流触发词从 `workflow` 改为 **`ultracode`**（紫色高亮） |
| 效率 | 单文件 `grep` 后可直接 Edit，无需额外 Read |
| 稳定性 | 修复 background agent 会话恢复丢历史、WSL 剪贴板等十余项 bug |

近期版本脉络（5 月底）：
- **v2.1.154**：Opus 4.8 上线、Dynamic Workflows 首次发布
- **v2.1.157**：`.claude/skills` 插件自动加载
- **v2.1.158**：Bedrock/Vertex/Foundry 支持 Auto mode

---

## 3. Microsoft Build 2026 开幕（6 月 2 日，旧金山）

**来源**：[Microsoft Build Live Blog](https://news.microsoft.com/build-2026-live-blog/microsoft-build-2026-live/) · [The Verge 总结](https://www.theverge.com/tech/941738/microsoft-build-2026-biggest-announcements)

### 核心发布

- **MAI 模型家族**：微软自研 LLM 正式亮相，标志「后 OpenAI 依赖」战略
- **Project Polaris**：自研编码模型，2026 年 8 月起替换 Copilot 默认的 GPT-4 Turbo
- **GitHub Copilot Workspace GA**：跨仓库推理、多文件编辑、自主测试迭代的 Agent 编程环境
- **VS Code 多 Agent 扩展**：编排器可并行派发 lint、测试、文档、安全审查等子 Agent
- **Microsoft Scout**：基于 OpenClaw 的 7×24 个人工作 Agent（Outlook、Teams、OneDrive）
- **Windows Agent Runtime（预览）**：Agent 作为 OS 一级公民运行
- **Majorana 2 量子芯片**：量子比特精度提升 1000 倍

### 开发者工具链

- Windows 11 原生 Coreutils、WSL Linux 容器
- Intelligent Terminal：为 AI Agent 提供上下文
- Microsoft Execution Containers (MXC)：Agent 沙箱安全边界

---

## 4. 其他值得关注

- **Cursor Teams 定价调整**（5 月）：Standard / Premium 双档，Composer + Auto 与第三方 API 用量池分离 ([来源](https://cursor.com/blog/teams-pricing-june-2026))
- **Anthropic vs OpenAI 企业竞争加剧**：Anthropic 2 月推出 Enterprise Agents，OpenAI 今日以 Codex 插件生态正面回应
