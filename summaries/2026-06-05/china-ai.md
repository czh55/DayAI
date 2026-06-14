# 国内 AI 厂商与编程产品 — 2026-06-05

> 检索时间：2026-06-05T22:00Z 前后 | 触发基准：2026-06-05T22:02:31Z

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **腾讯 WorkBuddy 企业版 + 办公智能体套件（6/5 北京）**：从个人「超级个体」升级到组织级 **数字员工 + 项目制人机协同 + Admin 治理**，CodeBuddy 作为研发垂类正式纳入 Buddy 家族；Skill 市场过万、Connector 打通腾讯文档/乐享/会议等 — **国内 ToB Agent 的标杆发布日**。
2. **华为云 Agentic Infra + 智果 AgentArts + openJiuwen（6/5 上海）**：提出 Token 工业化与 **10 万卡 / 500 万 tokens/s** 集群叙事，**CodeArts 代码智能体 5/30 商用**，开源 **openJiuwen** 与企业版同源 — 影响国企/制造/政务私有化 Agent 选型。
3. **阶跃 Step 3.7 Flash 登顶 AA 榜（6/5 媒体）**：5/29 发布的 Agent 向 Flash 模型获 Artificial Analysis 三项第一 — 高频多轮 Agent 的国产 backend 备选。

---

## 本地实测总览

```bash
cd /workspace/tools

# 国际（必做）— 见 README
npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version   # 2.1.165
./node_modules/.bin/codex --version    # 0.137.0

# 国内 OpenAI 兼容端点（DeepSeek 模板）
pip install openai -q
python3 -c "import openai; print('openai', openai.__version__)"
# openai 2.41.0

curl -s -o /dev/null -w "HTTP %{http_code}\n" https://api.deepseek.com/v1/models
# HTTP 401（无 API Key，端点可达）
```

| 产品 | 实测 | 说明 |
|------|------|------|
| DeepSeek API | ⚠️ 端点 401 | 无 `DEEPSEEK_API_KEY`；SOP 见下文 |
| 通义/百炼 CLI | 未测 | 无官方 npm 全局 CLI 同 Claude；用 dashscope SDK |
| Kimi CLI | 未测 | 需 Moonshot API Key |
| CodeBuddy CLI | 未测 | 需腾讯账号与企业授权，本环境无 |

---

## 今日轮询无更新（表格）

| 厂商 | 检索时间 (UTC) | 来源 |
|------|----------------|------|
| 阿里通义/百炼/Qwen/Qoder | 2026-06-05 22:00 | qwen.ai、GitHub QwenLM、qbitai 6月归档 |
| 百度文心/Comate | 2026-06-05 22:00 | ai.baidu.com、Comate 更新日志 |
| 字节豆包/Trae/火山方舟 | 2026-06-05 22:00 | volcengine.com、Trae 官网 |
| 智谱 GLM/CodeGeeX | 2026-06-05 22:00 | open.bigmodel.cn、GitHub THUDM |
| 月之暗面 Kimi | 2026-06-05 22:00 | platform.moonshot.cn |
| DeepSeek 官方 changelog | 2026-06-05 22:00 | api-docs.deepseek.com（最近 2026-04-24 V4） |
| 讯飞星火/iFlyCode | 2026-06-05 22:00 | xfyun.cn |
| MiniMax/商汤/昆仑/零一/面壁 | 2026-06-05 22:00 | 各官网 |

---

## 腾讯 · WorkBuddy 企业版 / CodeBuddy / 混元

### 事件摘要

2026 年 6 月 5 日，腾讯云 AI 产业应用大会发布 **WorkBuddy Enterprise** 与 **办公智能体套件 Agent Suite**（腾讯文档、腾讯网盘、腾讯乐享原生集成 WorkBuddy 工作台）。

**来源**：量子位 https://www.qbitai.com/2026/06/430758.html （2026-06-05）

### 核心能力（开发者相关）

| 模块 | 说明 |
|------|------|
| 数字员工 | 7×24 云端运行，接知识库、业务系统、Connector、专属 Skill |
| 「项目」 | 人 + 多 Agent 共享上下文 / Skills / MCP，流水线接力 |
| Admin | 组织、权限、审计、用量与成本归集、模型接入标准化 |
| CodeBuddy | Plugin + IDE + CLI 三形态；内部 90%+ 工程师使用 |
| Harness API | 编排、Memory/Action/Hooks、SubAgent/AgentTeams、MCP&CLI、Skills |
| 交付 | 公有云 / VPC 专享 / 私有化；WorkBuddy Management Agent API |

### 前置条件

- 企业采购 WorkBuddy 企业版或参与 Buddy AI 生态共创
- 国内数据合规：业务数据默认在腾讯云中国区；私有化需 VPC/专有云合同
- CodeBuddy CLI 需企业开发者账号与内网/外网策略放行

### 管理员开启 SOP

1. 腾讯云控制台开通 WorkBuddy Enterprise 与所需席位
2. Admin 后台：组织架构导入、RBAC、模型与 Skill 白名单
3. 配置 Connector：One ID 对接 OA/CRM/腾讯文档/乐享等
4. 发布企业 Skill 到 Skill 市场或团队空间
5. 为研发组开通 **CodeBuddy** IDE/CLI 插件渠道并审计日志

### 业务/开发者使用 SOP

1. 登录 WorkBuddy 企业版工作台
2. 创建或选用「数字员工」/ 进入「项目」
3. 在项目中 @CodeBuddy 或打开 CodeBuddy IDE/CLI 处理研发任务
4. 通过 Skill 市场安装「前端设计 / 浏览器自动化 / 云诊断」等技能
5. 产出物回写腾讯文档/网盘，乐享知识库自动沉淀

### 命令与配置示例

**基础 — CodeBuddy CLI（示意，以官方文档为准）**

```bash
# 安装与登录（路径以 CodeBuddy 官方文档为准）
npm install -g @tencent/codebuddy-cli
codebuddy login
codebuddy chat "为当前仓库生成单元测试骨架"
```

**进阶 — 通过 Connector 调用内部 API（概念示例）**

```json
{
  "connector": "crm-prod",
  "action": "get_opportunity",
  "params": { "id": "OPP-2026-001" }
}
```

在 WorkBuddy 项目 prompt 中：

```text
使用 CRM Connector 拉取 OPP-2026-001，并让 CodeBuddy 生成对接 webhook 的 TypeScript 接口定义。
```

### 本地测试结果

未实测 — **未实测原因**：需腾讯企业账号、WorkBuddy 企业版授权；本环境无腾讯云 SSO。

### 问题与解决方案

1. **Skill 无法跨项目复用**：检查 Admin 是否限制 Skill 分发范围
2. **CodeBuddy CLI 与 IDE 策略不一致**：在 Admin 统一模型路由与 MCP 白名单

### 官方 vs 媒体交叉验证

| 来源 | 一致性 |
|------|--------|
| 量子位 6/5 | 与大会通稿一致 ✅ |
| 腾讯 Q1 财报 WorkBuddy DAU 表述 | 量子位引用 ✅ |

### 利弊与建议

- **个人**：可关注 WorkBuddy 个人版迭代作为参考；企业版需雇主采购
- **团队**：优先用「项目」模式共享 MCP/Skill，避免每人散装 Agent
- **企业合规**：选 VPC/私有化 + Admin 审计；敏感代码用 CodeBuddy 内网部署

---

## 华为 · Agentic Infra / 智果 AgentArts / CodeArts

### 事件摘要

2026 年 6 月 5 日上海 **华为云 INSPIRE 创想者大会**，发布 Agentic Infra 系列：**AICS 灵衢智算集群**（10 万卡、200 EFLOPS、500 万 tokens/s）、**AMS 记忆存储**、**CCE VolcanoNext**、**AgentSphere** 沙箱；**ModelArts Next** RL/机密推理/模型路由；**智果 AgentArts** 公测、**openJiuwen** 开源；**CodeArts 代码智能体 5/30 商用**（用户数破 10 万）。

**来源**：新浪科技 2026-06-05 https://finance.sina.cn/tech/2026-06-05/detail-iniaiyys8426291.d.html ；上观新闻 https://www.shobserver.com/news/detail?id=1123640

### 前置条件

- 华为云账号；政企客户常见 **华为云 Stack 混合云**
- CodeArts 商用需订阅；openJiuwen 开源可本地部署（MIT/华为开源协议以 repo 为准）
- 昇腾/NPU 路径涉及 **国产算力备案与等保**

### 管理员开启 SOP

1. 华为云控制台开通 **智果 AgentArts** 或部署 **openJiuwen**
2. 配置 AgentSphere 沙箱策略与 Agentic Infra 算力池
3. 接入 ModelArts Next 模型矩阵与 RL 服务
4. 开通 **CodeArts 代码智能体** 席位并对接 CodeArts 项目
5. 「智果园」入口：Skill 化/CLI 化能力编排

### 开发者使用 SOP

1. 在 CodeArts 项目启用 AI 代码助手
2. 或通过 openJiuwen 本地/专有云部署 Agent，连接企业知识库
3. 长程任务使用 AMS 记忆层（PB 级、KV Cache 池化）
4. 具身场景试用 **CloudRobo** 开发管线（大会发布）

### 示例

**基础 — CodeArts 内联生成（GUI）**

在 IDE 内选中函数 → 「代码生成」→ 描述意图 → 审查 diff。

**进阶 — openJiuwen CLI（示意，随开源文档更新）**

```bash
git clone https://gitcode.com/openJiuwen/openJiuwen.git
cd openJiuwen
# 按官方 README 安装依赖
./scripts/jiuwen-cli agent run --config examples/code-review.yaml
```

### 本地测试

未实测 openJiuwen/CodeArts — 无华为云账号 ⚠️

### 交叉验证

- 新浪 / 上观 / 凤凰网 6/5 报道互相一致 ✅
- 量子位 6/5 列表「华为云发布 Agentic AI 系列新品」✅

---

## 阶跃 · Step 3.7 Flash

### 事件摘要

2026 年 5 月 29 日发布并开源；**2026 年 6 月 5 日**量子位报道登顶 **Artificial Analysis** 速度、性价比、端到端三项第一。

**来源**：https://platform.stepfun.com/docs/zh/guides/models/step-3.7-flash ；量子位 6/5 相关条目

### 规格

- 196B MoE + 1.8B ViT，11B 激活；256K 上下文；最高 ~400 tokens/s
- Chat Completions：`reasoning_effort` = low | medium | high
- 兼容 OpenAI / Anthropic 协议；可接 Coding Agent 工具链

### 前置条件

- 阶跃开放平台 API Key（国内实名与备案要求以平台为准）
- 数据出境：默认中国区 endpoint

### 使用步骤

1. 注册 https://platform.stepfun.com 获取 API Key
2. 设置环境变量 `STEPFUN_API_KEY`
3. 用 OpenAI SDK 指向阶跃 base_url
4. Agent 场景：`reasoning_effort=medium`，多轮 tool call 压测延迟

### 命令示例

**基础**

```bash
export STEPFUN_API_KEY="your-key"
python3 << 'PY'
from openai import OpenAI
client = OpenAI(api_key=open("env").read if False else __import__("os").environ["STEPFUN_API_KEY"],
                base_url="https://api.stepfun.com/v1")
r = client.chat.completions.create(
    model="step-3.7-flash",
    messages=[{"role":"user","content":"用一句话解释 MoE"}],
    reasoning_effort="low",
)
print(r.choices[0].message.content)
PY
```

**进阶 — 多轮 Agent tool 模拟**

```python
from openai import OpenAI
import os, json
client = OpenAI(api_key=os.environ["STEPFUN_API_KEY"], base_url="https://api.stepfun.com/v1")
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get weather",
        "parameters": {"type": "object", "properties": {"city": {"type": "string"}}},
    },
}]
msgs = [{"role": "user", "content": "北京天气怎样？"}]
r = client.chat.completions.create(
    model="step-3.7-flash",
    messages=msgs,
    tools=tools,
    reasoning_effort="medium",
)
print(json.dumps(r.model_dump(), ensure_ascii=False, indent=2)[:800])
```

### 本地测试

无 STEPFUN_API_KEY — **未实测推理** ⚠️  
官方文档与量子位参数一致 ✅

### 常见错误

1. **404 model**：确认 slug 为 `step-3.7-flash`
2. **延迟高于预期**：检查是否误开 `high` reasoning

---

## DeepSeek · V4 API（今日无新 changelog，保留可操作模板）

### 说明

官方 changelog 最近条目为 **2026-04-24 DeepSeek-V4**；6/1 前后 **识图灰测** 为 App/网页能力，非 API 文档更新。旧名 `deepseek-chat` / `deepseek-reasoner` 将于 **2026-07-24** 停用。

### 前置条件

- `DEEPSEEK_API_KEY`；数据存储与备案遵循 DeepSeek 服务条款
- Anthropic 兼容接口可用于 Claude Code 类工具迁移

### 示例

**基础 Chat**

```bash
export DEEPSEEK_API_KEY="sk-..."
curl https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role":"user","content":"Hello"}]
  }'
```

**进阶 — OpenAI SDK**

```python
from openai import OpenAI
client = OpenAI(api_key="...", base_url="https://api.deepseek.com")
print(client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[{"role":"user","content":"写快速排序 Python"}],
).choices[0].message.content)
```

### 本地测试

```bash
curl -s -o /dev/null -w "%{http_code}" https://api.deepseek.com/v1/models
# 401 without key — 端点可达 ✅
```

---

## 阿里云 · JVS 智能体套件（5/20 发布，今日无新条目，供企业对照）

2026-05-20 阿里云峰会发布 **JVS Claw / JVS Crew / JVS Mobile**（InfoQ 报道）：企业 Agent **小时级部署**、按量计费、OpenClaw 双引擎。与今日腾讯/华为形成 **国内三巨头 Agent 平台矩阵**。开发者若做跨云集成，可对比：

| 维度 | 腾讯 WorkBuddy Ent. | 华为智果/openJiuwen | 阿里 JVS Crew |
|------|---------------------|---------------------|---------------|
| 开源 | 部分 Harness API | openJiuwen | JVS Claw 4.0 |
| 编程垂类 | CodeBuddy | CodeArts | 百炼/通义编码模型 |
| 移动 | 小程序 WorkBuddy | — | JVS Mobile GUI Agent |

---

## 参考链接

- 量子位 WorkBuddy：https://www.qbitai.com/2026/06/430758.html
- 华为云 6/5：新浪科技链接见上文
- Step 3.7 文档：https://platform.stepfun.com/docs/zh/guides/models/step-3.7-flash
- DeepSeek changelog：https://api-docs.deepseek.com/zh-cn/updates
- InfoQ JVS：https://www.infoq.cn/news/azivxFvIw86aDycABC6a
