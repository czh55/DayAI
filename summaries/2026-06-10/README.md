# DayAI 每日资讯索引 — 2026-06-10

> 检索截止时间：2026-06-10 22:02 UTC（北京时间 2026-06-11 06:02）  
> 本地 CLI 实测环境：`/workspace/tools`（Node.js npm 本地安装）

---

## 今日一句话结论

| 类别 | 结论 |
|------|------|
| **Claude Code** | v2.1.172 今日发布：子 Agent 可嵌套至 5 层；叠加 6/9 发布的 Claude Fable 5 Mythos 级模型与 Safe Mode 排障能力 |
| **Cursor** | 6/10 Bugbot 审查提速 3 倍（~90s）、检出率 +10%、成本 -22%；推送前可用 `/review` 本地预审 |
| **OpenAI Codex** | CLI 本地 0.139.0；6/10 alpha.4 新增 Code Mode 独立 Web 搜索；6/2 角色插件 + Sites 预览扩至知识工作 |
| **国内综述** | **Kimi Code CLI 0.13.0 今日发布**（自定义主题 + 从 CC/Codex 一键导入）；Qwen Code CLI 0.17.1 可本地实测 |
| **媒体透镜** | 共识：编程 Agent 从 Prompt 转向 Loop/Harness 工程；分歧：ToB 付费意愿 vs 组织变革阻力（详见 `china-media.md`） |

---

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼/Qwen | 今日无公开版本更新；Qwen3.7-Max 每日 200 次免费调用促销延续中（6/1 起） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 今日无公开更新（最近 IDE 4.9.9 为 5/12） |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| **月之暗面 Kimi** | **Kimi Code CLI v0.13.0 今日发布**（主题、CC/Codex 导入） |
| DeepSeek | 今日无公开更新（DeepGEMM Mega MoE 为 4 月基础设施更新） |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

---

## 媒体行业透镜一句话

- **共识**：多家媒体（36氪、虎嗅、InfoQ）认为 2026 年编程 Agent 的核心竞争已从「模型智商」转向 **Loop/Harness 工程**——谁能让 Agent 长时间不跑偏，谁赢。
- **最大分歧**：36氪强调 Agent 将颠覆「3 人打磨 1 产品」的创业路径；虎嗅则警告 Loop 自动化带来的 **API 成本失控与安全隐患**，主张企业保留关闭开关。

→ 详见 [`china-media.md`](./china-media.md) 的「今日媒体行业透镜」章节

---

## 文件导航

| 文件 | 内容 |
|------|------|
| [`claude-code.md`](./claude-code.md) | Claude Fable 5、嵌套子 Agent、Safe Mode、`/cd`、disableBundledSkills |
| [`cursor.md`](./cursor.md) | Bugbot 提速、`/review`、Design Mode、SDK 3.7 更新 |
| [`codex.md`](./codex.md) | 角色插件、Sites、Annotations、Code Mode Web 搜索 |
| [`china-ai.md`](./china-ai.md) | Kimi Code CLI 0.13.0 详解 + 国内厂商轮询 |
| [`industry.md`](./industry.md) | Claude Fable 5 发布、Agent 范式转移、DeepSeek V4 后续讨论 |
| [`china-media.md`](./china-media.md) | 量子位/36氪/虎嗅/晚点/InfoQ 等 8+ 源行业判断 |

---

## 本地实测摘要

```text
# 国际 CLI（必做）— 路径 /workspace/tools
claude --version     → 2.1.172 (Claude Code) ✅
claude --help        → 完整选项列表可用 ✅
codex --version      → codex-cli 0.139.0 ✅
codex doctor         → 12 ok / 4 fail（无 auth、TERM=dumb）⚠️
codex features list  → plugins/stable, multi_agent/stable 等 ✅

# 国内 CLI
qwen --version       → 0.17.1（@qwen-code/qwen-code）✅
kimi --version       → 旧版 Python kimi-cli 1.47.0（pip）⚠️ 非官方 Kimi Code CLI
Kimi Code CLI 0.13.0 → npm 无官方包，需 curl 安装脚本；本次未实测 ❌
DeepSeek API         → 无 API Key，仅文档级 curl 模板 ⚠️
```

完整命令与输出见各子文档「本地测试结果」章节。
