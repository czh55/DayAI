# DayAI 每日资讯 — 2026-06-03

> 触发时间（UTC）：2026-06-03T14:06:12.138Z  
> 本地 CLI 测试目录：`/workspace/tools`  
> 分支：`cursor/dayai-ai-cff6`

## 今日一句话

| 工具 / 板块 | 版本（本地实测） | 结论 |
|-------------|------------------|------|
| Claude Code | 2.1.161 | 代理工作流稳定性大补丁：并行 Bash 不再拖垮整批工具、MCP 密钥不再明文打印、Bedrock/Vertex 企业登录回归修复 |
| Cursor | 3.6 + 6/1 Teams 定价 | Auto-review 继续发酵；**6 月 1 日** Teams 拆分 Composer/第三方 API 用量池并推出 Premium 席位 |
| OpenAI Codex | 0.136.0（npm）；GitHub **0.137.0-alpha.4**（6/3） | 本地已装 0.136.0；上游 6/3 预发布聚焦会话归档、Python SDK beta、Windows 沙箱 provisioning |
| 国内厂商 | 见 [china-ai.md](./china-ai.md) | **MiniMax M3 + Code**、DeepSeek 识图灰测、字节 Bernini 视频框架为开发者向头条 |
| 媒体透镜 | 见 [china-media.md](./china-media.md) | **共识**：Agent 从对话走向交付、算力=收入；**分歧**：88% 试点失败 vs 80% 已见 ROI 如何并存 |

## 国内厂商一句话结论

| 厂商 / 产品 | 结论 |
|-------------|------|
| 阿里通义 / 百炼 | 今日轮询无 6/3 当日公开 changelog；通义相关报道多为行业综述引用 |
| 百度文心 / Comate | 今日无公开更新 |
| 腾讯混元 / CodeBuddy | 量子位转述混元 Hy-MT2 开源与小程序（非 6/3 首发，交叉索引） |
| 字节豆包 / Trae / 火山 | **Bernini** 视频统一框架开源（量子位 6 月报道） |
| 智谱 GLM / CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi | 36氪等回顾 Kimi K2.5 被 Cursor Composer 底座引用（产业叙事，非当日版本） |
| DeepSeek | 识图模式灰测持续；DeepGEMM **Mega MoE** 基础设施更新（36氪） |
| 讯飞 / 华为 / 商汤等 | 今日轮询无公开更新 |
| **MiniMax** | **M3 模型 + MiniMax Code** 上线，编程向对标国际闭源（量子位实测文） |
| 零一万物 / 面壁 / 昆仑等 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：多家媒体（虎嗅、36氪、量子位）认为 2026 中国 AI 应用已从 Chatbot 红海转向 **Agent 交付** 与 **编程 IDE 嵌入**，黄仁勋 GTC 台北将「算力即收入」与 Agentic AI 绑为行业定调。  
- **最大分歧**：企业 Agent「88% 从未进生产」与 Anthropic 报告「80% 组织已有可衡量回报」并存——虎嗅将其解读为 **场景选择与数据治理** 决定成败，而非模型参数。  
- 详情 → [china-media.md#今日媒体行业透镜](./china-media.md#今日媒体行业透镜)

## 文件索引

| 文件 | 内容 |
|------|------|
| [industry.md](./industry.md) | Anthropic 秘密递交 IPO、OpenAI 机器人招聘、英伟达 GTC 台北 Agentic AI |
| [china-media.md](./china-media.md) | 量子位 / 36氪 / 虎嗅 / 晚点等 ≥8 源行业判断 |
| [claude-code.md](./claude-code.md) | v2.1.161 / v2.1.160（ultracode）逐项 + CLI 实测 |
| [cursor.md](./cursor.md) | Teams 定价、Auto-review、`permissions.json` |
| [codex.md](./codex.md) | CLI 0.136.0 实测 + 0.137.0-alpha.4 新特性 SOP |
| [china-ai.md](./china-ai.md) | 国内厂商轮询 + DeepSeek/MiniMax 实测说明 |

## 本地 CLI 实测摘要

```bash
cd /workspace/tools && npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version    # → 2.1.161 (Claude Code)
./node_modules/.bin/claude --help       # → 209 行帮助输出
./node_modules/.bin/claude agents --json # → []
./node_modules/.bin/claude mcp list     # → No MCP servers configured
./node_modules/.bin/codex --version     # → codex-cli 0.136.0
./node_modules/.bin/codex doctor        # → 无 auth；PATH 与全局 npm 根不一致（见 codex.md）
./node_modules/.bin/codex features list # → plugins/stable 等 27 flags enabled
```

## 阅读建议

1. **平台管理员**：`cursor.md` Teams 定价 + `codex.md` 远程 `CODEX_API_KEY` 注册 SOP。  
2. **终端工程师**：`claude-code.md` 并行工具调用与 MCP 密钥修复。  
3. **国内业务**：先读 `china-ai.md` 综述，再读 `china-media.md` 透镜。
