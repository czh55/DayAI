# DayAI 每日资讯索引 — 2026-06-13

> 检索窗口：UTC 2026-06-12 22:00 至 2026-06-13 22:02（trigger 时间）及前 24 小时高相关更新  
> 本地实测环境：`/workspace/tools`，Ubuntu 24.04，Node npm 本地安装

## 一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | Fable 5 上线四天后遭美国商务部出口管制暂停全球访问；CLI 已迭代至 **2.1.177**，嵌套 Sub-agent 与 `/code-review ultra` 成为本周工程向亮点 |
| **Cursor** | Bugbot 换芯 **Composer 2.5** 后审查提速 3 倍；`/review` 可在 push 前跑审查并与 GitHub/GitLab PR 去重 |
| **Codex** | CLI **0.139.0** 让 Code mode 可直接调用独立 Web Search；App **26.609** 新增 Browser Developer mode 与 `/init` |
| **国内厂商** | **豆包「任务模式」** 6/13 大范围上线，把 Agent 推到 C 端；**智源大会** 6/12–13 北京开幕，Agent 工作流成主议题 |
| **行业宏观** | Anthropic 呼吁政府有权「阻断危险 AI 部署」与商务部 **暂停 Fable/Mythos 5** 形成戏剧性张力 |
| **媒体透镜** | 共识：Agent 从 demo 进入入口与执行权争夺；分歧：36氪强调约束性部署，钛媒体强调超级入口战争 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼/千问 | 智源大会同台亮相；千问第三方 Agent/Skill 开放持续发酵（媒体跟进，无 6/13 新 changelog） |
| 百度文心/Comate | 今日无公开更新（检索 2026-06-13 22:10） |
| 腾讯混元/CodeBuddy | 微信 AI 生态接入小程序持续报道；无 6/13 官方版本公告 |
| 字节豆包/Trae/扣子 | **豆包 App「任务模式」6/13 上线**；扣子 3.0 多 Agent 项目空间（6/10 钛媒体实测） |
| 智谱 GLM/CodeGeeX | 智源大会参与；无 6/13 模型/API 公告 |
| 月之暗面 Kimi | 虎嗅 6/12 深度：融资与 Harness 扩张；无 6/13 产品 changelog |
| DeepSeek | 虎嗅 6/12：启动融资、招聘数据中心岗位；网页快速/专家模式分层（媒体延续讨论） |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 智源大会 Agentic Infra 议题；无 6/13 版本帖 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无可靠来源的 6/13 更新 |

## 媒体行业透镜一句话

- **共识**：多家媒体（量子位、钛媒体、虎嗅）认为 2026 年 H1 Agent 竞争已从「能不能做」转向「谁掌握入口、执行权与上下文」。  
- **最大分歧**：36氪/InfoQ 编译倾向「工作流增强 80% + 选择性自主 15%」的约束部署；钛媒体/雷科技强调豆包/微信/千问把 Agent 推到普通用户桌面，更乐观看待 C 端爆发。  
→ 详见 [`china-media.md`](./china-media.md)「今日媒体行业透镜」

## 本地实测摘要

```text
# 国际 CLI（/workspace/tools）
claude --version  → 2.1.177 (Claude Code)  ✅
claude --help     → 子命令含 -p/--print, --agent, /code-review 等  ✅
codex --version   → codex-cli 0.139.0  ✅
codex doctor      → 12 ok · 4 fail（auth 未登录、TERM=dumb）  ⚠️
codex features list → browser_use/stable, standalone_web_search/under development  ✅

# 国内
DeepSeek OpenAI 兼容 API → 无 API Key，仅验证 curl 模板与 openai SDK 导入  ⚠️
```

## 文件导航

| 文件 | 内容 |
|------|------|
| [`claude-code.md`](./claude-code.md) | Fable 5、嵌套 Sub-agent、`/code-review ultra`、VSCode 用量归因等 |
| [`cursor.md`](./cursor.md) | Bugbot 2.5、`/review`、SDK Custom Tools / Auto-review / JSONL |
| [`codex.md`](./codex.md) | 0.139.0 Web Search、MCP Schema、App 26.609 Developer mode |
| [`china-ai.md`](./china-ai.md) | 豆包任务模式、扣子 3.0、智源大会、厂商轮询表 |
| [`industry.md`](./industry.md) | Fable 5 暂停、Amodei 监管框架、全球 AI 治理 |
| [`china-media.md`](./china-media.md) | 量子位/36氪/虎嗅/钛媒体等 8+ 源行业判断 |

## 交叉索引速查

| 事件 | industry | china-ai | china-media |
|------|----------|----------|-------------|
| Fable 5 发布又暂停 | ✅ 主写 | Claude Code 章节 | 虎嗅 6/10 安全政策解读 |
| 豆包任务模式 | Agent C 端化 | ✅ 主写 | 雷科技/网易 6/13 |
| 智源大会 6/12–13 | Agent 宏观 | ✅ 主写 | 量子位 6/12 |
| Cursor Bugbot 提速 | 编程 Agent 竞品 | — | 36氪 Agent 指数 |
