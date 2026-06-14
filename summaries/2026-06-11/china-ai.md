# 国内 AI 厂商与编程产品 — 2026-06-11

> 轮询时间：北京时间 2026-06-12 06:00 前后（UTC 2026-06-11T22:01 trigger）  
> 检索源：各厂商官网/changelog、npm、火山引擎、通义博客、GitHub `QwenLM` / `deepseek-ai`

---

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **字节 TRAE 在火山引擎 Force 大会（6/11）集中官宣**：智能 **Cue**（连续 Tab 预测跳转）、国内版接入 **豆包 1.6**、直连火山 **MCP 市场**（百余工具）、**SOLO 模式**预告——这是当日国内**编程 IDE 侧最明确的 product 发布**。[澎湃新闻转甲子光年](https://www.thepaper.cn/newsDetail_forward_31004647)

2. **通义千问上线全周期高考志愿填报 Agent（6/11）**：面向 C 端，但对开发者而言印证千问 **Agent 平台化**（志愿报告/日历/问答）与夸克数据打通。[网易转 i黑马](https://www.163.com/dy/article/KV4PEET905118I96.html)

3. **国际 Fable 5 余波 + DeepSeek Harness 招聘**：国内媒体热议 Anthropic 新模型；DeepSeek 被 InfoQ 等报道组建 **Harness 对标 Claude Code** 团队（5 月中下旬招聘，6/11 无新官方 repo 发布）——影响国内「模型+工具」双轮战略判断。

---

## 本地实测总览

```bash
cd /workspace/tools

# 国际（必做）✅
npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version    # 2.1.173
./node_modules/.bin/codex --version     # 0.139.0
./node_modules/.bin/codex doctor
./node_modules/.bin/codex features list

# 国内 CLI ✅
npm install @qwen-code/qwen-code@latest
./node_modules/.bin/qwen --version        # 0.17.1
./node_modules/.bin/qwen --help | head -30

# OpenAI SDK（用于兼容端点 curl 模板，未调真实 Key）✅ pip install openai
```

| 产品 | 版本 | 结果 | 未测原因 |
|------|------|------|----------|
| Qwen Code | 0.17.1 | ✅ `--version`/`--help` | 无 `DASHSCOPE_API_KEY` / OAuth |
| DeepSeek API | — | ⚠️ 仅文档 | 无 `DEEPSEEK_API_KEY` |
| Kimi CLI | — | ❌ npm 无官方 `moonshot-ai` 包 | 官方未提供当日 npm CLI |
| Trae | 桌面 IDE | ❌ | 无 Linux headless 服务端包 |

---

## 阿里通义 / 百炼 / Qwen Code

### 今日更新：高考志愿填报 Agent（2026-06-11）

#### 是什么

千问 App/端内上线**全周期高考志愿填报 Agent**，能力包括志愿报告、志愿日历、志愿问答；底层为「千问高考志愿大模型」+ 夸克 8 年高考数据。

#### 适用场景

- **考生/家长**：填报咨询（C 端）  
- **开发者**：观察通义 **Agent 编排 + 结构化报告输出** 产品形态，为百炼 Agent 应用提供参考

#### 前置条件

- 千问客户端或网页入口  
- 中国大陆网络；涉及教育数据需遵守个人信息保护法  
- **企业 API 复用**：需单独在百炼申请模型与 Agent 框架，高考 Agent 不等同于开放 API

#### 详细使用步骤（C 端）

1. 打开千问 App 或 [tongyi.aliyun.com](https://tongyi.aliyun.com)  
2. 搜索「高考志愿」或首页 Agent 入口  
3. 输入省份、分数、选科  
4. 生成志愿报告并加入日历提醒  
5. 追问「冲稳保」策略

#### 开发者示例 A（基础）：百炼 OpenAI 兼容聊天

```bash
export DASHSCOPE_API_KEY="your-key"
curl -X POST "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions" \
  -H "Authorization: Bearer $DASHSCOPE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-plus",
    "messages": [{"role": "user", "content": "用三句话说明 Agent 与 Chat 的区别"}]
  }'
```

**预期结果**：JSON 含 `choices[0].message.content`。  
**未实测**：无 Key。

#### 开发者示例 B（进阶）：Qwen Code 项目内审计

```bash
cd /your/repo
npm install -g @qwen-code/qwen-code@0.17.1
qwen -p "只读扫描 src/，列出超过 500 行的文件并建议拆分模块"
```

配合 [Qwen Code 6/4 周报](https://qwenlm.github.io/qwen-code-docs/zh/blog/weekly-update-2026-06-04/)：**Computer Use** 默认 `tools.computer_use.enabled: true`，首次调用弹权限。

#### 本地测试

```text
$ ./node_modules/.bin/qwen --version
0.17.1
```

✅ CLI 安装成功。

#### 问题与解决方案

1. **API 401**：检查百炼 Key 与区域 endpoint。  
2. **Qwen Code Computer Use 无权限**：macOS 需 Accessibility + Screen Recording。  
3. **高考 Agent 无开发者 API**：属产品化 Agent，勿假设与 `qwen-plus` 同路由。

#### 官方 vs 媒体

| 来源 | 一致性 |
|------|--------|
| [网易/i黑马 6/11](https://www.163.com/dy/article/KV4PEET905118I96.html) | 三项核心能力 |
| [Qwen Code 官方周报 6/4](https://qwenlm.github.io/qwen-code-docs/zh/blog/weekly-update-2026-06-04/) | 编程侧独立更新，与高考 Agent 无冲突 |
| [天脉财经 企业 Agent 开放](https://www.dtm.com.cn/news/202606/264770.html) | 平台化战略一致 |

#### 分角色建议

- **个人开发者**：用 Qwen Code 0.17.1 试国内开源模型 + Computer Use。  
- **团队**：百炼上部署私有 Agent，勿依赖 C 端高考模板。  
- **企业合规**：教育类数据出境需评估；金融/政务用专有云百炼。

---

### Qwen Code v0.17.0–0.17.1（官方 6/4 周报，npm 当日 latest 0.17.1）

**要点**：Computer Use 九工具 deferred 内置；飞书 channel；压缩引擎重写防丢用户意图。  
**管理员 SOP**：在 `settings.json` 关闭 `tools.computer_use.enabled` 若终端不允许桌面控制。  
**用户 SOP**：`qwen` → 首次 tool 调用点 Approve → 后续自动拉取 open-computer-use。

---

## 字节豆包 / Trae / 火山方舟

### 今日更新：Force 大会 TRAE 发布（2026-06-11）

#### 是什么

火山引擎 Force 主论坛公布 TRAE 更新：**智能 Cue**（连续 Tab 预测与批量改写）、国内版 **豆包 1.6 免费**、**火山 MCP 市场**（百余工具）、预告 **TRAE SOLO**（自然语言到软件交付）。月活官方称已破百万；字节内部 80% 工程师使用 AI Coding 工具。

#### 适用场景

| 适合 | 不适合 |
|------|--------|
| 国内中文业务 + 豆包生态 | 需 Claude Fable 5 极限长程的单体迁移 |
| MCP 集成火山系数据源 | 无法安装桌面 IDE 的纯 CI |

#### 前置条件

- 下载 [trae.cn](https://www.trae.cn) 国内版  
- 火山账号（MCP 市场）  
- 豆包 1.6 模型权限（国内版宣称免费）

#### 详细使用步骤

1. 安装 TRAE 国内版并登录  
2. **智能 Cue**：编码时连续按 `Tab` 接受预测跳转；选中多段代码触发批量改写  
3. **MCP**：Settings → MCP → 连接火山 MCP 市场 → 选择工具（如内部 API）  
4. **Trae Rules**：项目 `.trae/rules` 写团队规范；个人规则全局生效  
5. **SOLO**（预告/逐步开放）：切换到 SOLO Agent 模式，用自然语言描述端到端应用

#### 示例 A（基础）：Trae Rules 项目规则

```markdown
# .trae/rules/project.md
- 所有 API 调用必须经过 src/api/client.ts
- 禁止在组件内直接 fetch
- 单元测试使用 vitest
```

#### 示例 B（进阶）：MCP 连接火山工具

1. TRAE → MCP → Add from Marketplace  
2. 选择「火山引擎 XXX」工具  
3. 配置 AK/SK（企业子账号）  
4. Agent 对话：`@agent 查询昨日 OSS 访问日志摘要`

#### 本地测试

❌ TRAE 为桌面 IDE，本环境未安装。  
✅ [trae.cn/changelog](https://www.trae.cn/changelog) 最近条目 2026-06-08 v0.1.16-17 为修复性发布；**6/11 功能以 Force 演讲为准**。

#### 问题与解决方案

1. **Cue 不准确**：确认豆包 1.6 已选为默认模型；检查项目上下文是否加载。  
2. **MCP 鉴权失败**：火山 AK 权限最小化；企业 VPC endpoint。  
3. **与 TRAE 国际版 skill 不互通**：6/7 changelog 称全局 skill 目录已相互兼容个人版。

#### 官方 vs 媒体

- [澎湃新闻 6/11](https://www.thepaper.cn/newsDetail_forward_31004647) 与 Force 演讲一致  
- [36氪 字节 Coding 命题](https://m.36kr.com/p/3838454229027072) 补充背景：字节 2026 重押 Coding 数据回流，与 TRAE 发布节奏吻合

#### 管理员 vs 用户

| 角色 | SOP |
|------|-----|
| 管理员 | 统一分发 TRAE、配置火山 MCP 企业目录、强制 Seed 模型策略（内部） |
| 开发者 | Cue + Rules + MCP；SOLO 试点需单独申请 |

---

## DeepSeek

### 今日状态：无新模型 tag；生态与媒体跟进

- **官方最近大版本**：DeepSeek-V4 预览（2026-04-24 开源），[API 文档](https://api-docs.deepseek.com/news/news260424)  
- **6/11 无** platform.deepseek.com 新公告  
- **媒体**：融资传闻（⚠️ 单一财经源 [100wjjw](https://www.100wjjw.com/knowledgeinfo/3229.html)）；Mega MoE [36氪](https://www.36kr.com/p/3770337582858759) 为 DeepGEMM 基础设施更新  
- **InfoQ**：DeepSeek 招 Harness 团队对标 Claude Code — https://www.infoq.cn/article/zqYChrE48RgRbWTX7vhT

#### API 示例 A（基础）

```bash
export DEEPSEEK_API_KEY="your-key"
curl https://api.deepseek.com/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

#### 示例 B（进阶）：Anthropic 兼容端点（官方称 V4 支持）

```bash
curl https://api.deepseek.com/anthropic/v1/messages \
  -H "x-api-key: $DEEPSEEK_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"deepseek-v4-pro","max_tokens":1024,"messages":[{"role":"user","content":"hi"}]}'
```

**未实测**：无 Key。旧版 `deepseek-chat` 将于 **2026-07-24** 停用，需迁移 V4。

#### 备案/区域

- 使用官方 `api.deepseek.com` 数据留在 DeepSeek 合规框架内  
- 企业私有化需商务合同，非本日报范围

---

## 今日轮询无更新（检索 2026-06-11）

| 厂商 | 检索入口 | 备注 |
|------|----------|------|
| 百度文心 / Comate | ai.baidu.com、Comate 更新日志 | 无 6/11 changelog |
| 腾讯混元 / CodeBuddy | cloud.tencent.com、codebuddy.ai | 无 6/11 更新 |
| 智谱 GLM / CodeGeeX | open.bigmodel.cn、GitHub THUDM | 无 6/11 发版 |
| 月之暗面 Kimi | platform.moonshot.cn | 无 CLI npm；无 6/11 公告 |
| 讯飞星火 / iFlyCode | xfyun.cn | 无 6/11 更新 |
| 华为盘古 / CodeArts | huaweicloud.com | 无 6/11 更新 |
| MiniMax / 商汤 / 昆仑 / 零一 / 面壁 | 各开放平台 | 无 6/11 可靠更新 |

---

## 交叉索引

| 事件 | 详见 |
|------|------|
| Claude Fable 5 对国内竞争格局 | `industry.md`、`china-media.md` 量子位/36氪 |
| Harness 范式 | `china-media.md` 虎嗅、InfoQ |
| Cursor Bugbot | `cursor.md` |

---

## 参考链接

- https://www.trae.cn/changelog  
- https://qwenlm.github.io/qwen-code-docs/zh/blog/weekly-update-2026-06-04/  
- https://api-docs.deepseek.com/news/news260424  
- https://www.thepaper.cn/newsDetail_forward_31004647  
- https://www.infoq.cn/article/zqYChrE48RgRbWTX7vhT  
