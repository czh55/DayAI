# DayAI

每日 AI 资讯研究员：自动搜集 **国际编程 Agent**（Claude Code、Cursor、Codex）、**国内 AI 厂商** 与 **国内专业科技媒体行业判断**，本地 CLI 实测后输出中文 Markdown 文档。

## 目录

| 路径 | 说明 |
|------|------|
| [prompts/daily-ai-research.md](./prompts/daily-ai-research.md) | **Automation 指令模板**（复制到 Cursor Automation） |
| [summaries/YYYY-MM-DD/](./summaries/) | 按日落盘的报告 |
| [tools/](./tools/) | 国际 CLI 本地测试依赖（`package.json`） |

## 每日输出结构

```text
summaries/YYYY-MM-DD/
├── README.md
├── industry.md       # 国际 + 国内宏观事件
├── china-media.md    # 量子位/36氪/虎嗅等：关心什么 + 行业判断
├── claude-code.md
├── cursor.md
├── codex.md
└── china-ai.md       # 国内厂商与编程产品
```

## 使用方式

1. 在 Cursor 创建 **Automation**（cron 或手动）  
2. 将 `prompts/daily-ai-research.md` 全文粘贴到 Agent **Instructions**  
3. 指定开发分支（如 `cursor/claude-cursor-codex-*`）  
4. 运行后检查 `summaries/` 下当日目录并 review PR

## 监测范围

- **国内厂商**：阿里通义/百炼、百度 Comate、腾讯 CodeBuddy、字节 Trae、智谱、Kimi、DeepSeek、讯飞、华为等  
- **国内媒体**：量子位、机器之心、36氪、虎嗅、钛媒体、晚点、InfoQ 中文、极客公园、财新科技等——详见 [prompts/daily-ai-research.md](./prompts/daily-ai-research.md) §1.4
