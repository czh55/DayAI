# DayAI 每日资讯索引 — 2026-06-05

> 检索触发时间：2026-06-05T22:02:31Z（UTC）｜本地实测目录：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | CLI 本地版本 **2.1.165**；Anthropic 6/4 发布「When AI Builds Itself」报告，Claude 已合并 80%+ 内部代码；Dynamic Workflows / ultracode 仍是本周核心能力 |
| **Cursor** | **3.7（6/5）** 浏览器 Design Mode 新增多选元素与语音输入；**6/4** SDK 发布 customTools、autoReview、JSONL 存储与无限嵌套 subagent |
| **Codex** | CLI **0.137.0（6/4）** 稳定版；企业云配置 bundle、plugin list --json、Multi-agent v2；OpenAI 持续推进 Codex 并入 ChatGPT |
| **国内综述** | **腾讯 WorkBuddy 企业版 + 华为云 Agentic Infra 系列** 同日发布，国内 Agent 从个人提效转向组织级 Harness 与治理 |
| **媒体透镜** | 共识：Agent 进入企业「效率时刻」与 Harness 工程化；分歧：36氪强调分发层（Codex×ChatGPT），虎嗅强调组织流程才是新瓶颈 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼/Qoder | 今日无公开更新（检索 2026-06-05 22:00 UTC，来源：通义博客、GitHub QwenLM） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy/WorkBuddy | **WorkBuddy 企业版 + Agent Suite 发布**（6/5 北京 AI 产业应用大会） |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | 今日无 API/模型 changelog 更新（识图灰测为 6/1 前后媒体热） |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | **Agentic Infra + 智果 AgentArts + openJiuwen + CodeArts 商用**（6/5 INSPIRE 大会） |
| MiniMax/商汤/昆仑/零一/面壁 | 今日无公开更新 |
| 阶跃 StepFun | **Step 3.7 Flash 登顶 AA 榜**（模型 5/29 发布，6/5 媒体跟进） |

## 媒体行业透镜一句话

- **共识**：量子位、InfoQ、上观等认为 6/5 国内主线是「企业 Agent 工作台 + Infra Token 工厂」，编程 Agent 竞争从模型能力转向 Harness 与组织治理。
- **最大分歧**：36氪/新智元强调 OpenAI 用 ChatGPT 分发 Codex 改写 ToC/ToB 边界；虎嗅同期深度文认为 Coding Agent 已过奇点、真正瓶颈是评审流程与组织变革，而非再堆模型。（详见 [`china-media.md`](./china-media.md)）

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| `@anthropic-ai/claude-code` | 2.1.165 | ✅ `--version` / `--help` 正常；`--effort` 支持 low~max |
| `@openai/codex` | 0.137.0 | ✅ `--version` / `doctor` / `features list` 正常；⚠️ 无 API Key 无法联网推理；`plugin list --json` 返回空 marketplace |
| DeepSeek API（curl） | — | ⚠️ 无 Key，端点返回 401（符合预期） |
| `openai` Python SDK | 2.41.0 | ✅ 已安装，可用于 OpenAI 兼容端点调用模板 |

完整命令与输出见各工具文档及 [`china-ai.md`](./china-ai.md)「本地实测总览」。

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 国际+国内宏观：Anthropic 递归自改进警告、OpenAI 机器人/Codex 企业化等 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ、晚点等 8+ 源行业判断 |
| [`claude-code.md`](./claude-code.md) | Dynamic Workflows、ultracode、/deep-research、本地 CLI |
| [`cursor.md`](./cursor.md) | 3.7 Design Mode、SDK autoReview、permissions.json |
| [`codex.md`](./codex.md) | 0.137.0 特性、Plugins/Sites、企业云配置 |
| [`china-ai.md`](./china-ai.md) | 腾讯 WorkBuddy 企业版、华为 Agentic Infra、阶跃 Step 3.7 Flash |

## 检索记录脚注

- 国际：cursor.com/changelog、github.com/openai/codex/releases、code.claude.com/docs、anthropic.com/institute/recursive-self-improvement
- 国内厂商：qbitai.com/2026/06/、华为云公众号、腾讯云大会通稿
- 媒体：site:36kr.com、site:huxiu.com、site:infoq.cn、site:latepost.com（2026-06-04~06-05 窗口）
