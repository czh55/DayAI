# 国内 AI 厂商与编程产品 — 2026-06-06

> **检索时间**：2026-06-06 22:00 UTC（trigger）  
> **轮询窗口**：2026-06-05 22:00 UTC 至 2026-06-06 22:00 UTC 为主；6 月 1–5 日重大发布作为交叉上下文收录

---

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **6 月 5 日双巨头同日发力企业 Agent**：腾讯云发布 **WorkBuddy 企业版 + Agent Suite**（[36氪快讯](https://36kr.com/newsflashes/3840103073139209)）；华为云 INSPIRE 大会发布 **Agentic Infra 通智一体化基础设施**（[量子位](https://www.qbitai.com/2026/06/431027.html)）。国内 ToB Agent 从「单点工具」进入「组织级工作台」阶段。
2. **DeepSeek 识图模式灰测**（6 月 1 日，[36氪/APPSO](https://www.36kr.com/p/3788474106715144)）：V4 发布后首个多模态用户向能力，影响 API/应用层竞品格局；旧 API 名 `deepseek-chat`/`deepseek-reasoner` 将于 **2026-07-24** 停用，开发者需迁移至 `deepseek-v4-pro`/`deepseek-v4-flash`。
3. **6 月 6 日 trigger 时点**：多数厂商官网无新 changelog；国际侧 Claude Code 2.1.166/167、Codex 0.138.0-alpha.6 发布，国内需关注兼容层与云厂商集成跟进。

---

## 本地实测总览

```bash
cd /workspace/tools

# 国际（必做）✅
npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version   # 2.1.167
./node_modules/.bin/codex --version    # 0.137.0
./node_modules/.bin/codex doctor
./node_modules/.bin/codex features list

# 国内 CLI — Qwen Code ✅
npm install @qwen-code/qwen-code@latest
./node_modules/.bin/qwen --version     # 0.17.1
./node_modules/.bin/qwen --help | head -40

# DeepSeek API — 无 DEEPSEEK_API_KEY，仅文档 curl 模板 ⚠️
# curl https://api.deepseek.com/v1/chat/completions \
#   -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
#   -H "Content-Type: application/json" \
#   -d '{"model":"deepseek-v4-flash","messages":[{"role":"user","content":"hello"}]}'
```

| 产品 | 命令 | 结果 |
|------|------|------|
| Qwen Code | `qwen --version` | ✅ 0.17.1 |
| Qwen Code | `qwen --help` | ✅ 含 worktree/sandbox/approval-mode |
| DeepSeek API | curl | ⚠️ 无 API Key |
| Kimi CLI | 无官方 npm 包 | ❌ 跳过 |

---

## 腾讯混元 / CodeBuddy / WorkBuddy

### 6 月 5 日：WorkBuddy 企业版与 Agent Suite

#### 是什么

腾讯在 **2026 腾讯云 AI 产业应用大会**（北京，6 月 5 日）发布 **WorkBuddy Enterprise** 与 **办公智能体套件 Agent Suite**，定位「AI 原生组织进化解决方案」。核心能力：7×24 专家数字员工、人与 AI 协作的「团队」模式、企业级管理后台。同期发布覆盖 20+ 垂直场景的「效率智能体工具集」，并升级 **ClawPro** 管控平台与 **ADP 4.0** 开发平台。

#### 适用场景

- 企业办公自动化、跨腾讯系产品（文档、会议、ima、邮箱）编排
- 不适合：强私有化、不可上云的核心研发（需评估数据出境）

#### 前置条件

- 腾讯云企业账号 / WorkBuddy 企业合约
- 管理员开通 WorkBuddy Enterprise
- 国内备案与数据合规审查（企业微信/QClaw 等集成）

#### 详细使用步骤（管理员 SOP）

1. 登录 [腾讯云控制台](https://cloud.tencent.com/) → 企业应用 → WorkBuddy
2. 购买/开通 **WorkBuddy 企业版** 席位
3. 在 **ClawPro** 配置 Agent 权限、MCP 白名单、模型路由
4. 在 **ADP 4.0** 部署垂直场景 Agent（HR、财务、法务等）
5. 下发 **Agent Suite** 给员工，绑定腾讯文档/会议等连接器

#### 详细使用步骤（业务/开发者 SOP）

1. 安装 WorkBuddy 客户端或访问 Web 工作台
2. 选择「团队」模式，邀请同事与 Agent 加入同一工作区
3. 使用自然语言派发任务：「根据上周会议纪要生成行动项并同步到腾讯文档」
4. 通过 MCP 连接内部系统（需管理员预批准）
5. 在 ClawPro 查看 Agent 执行审计日志

#### 命令与配置示例

WorkBuddy 以 GUI 为主；ADP 4.0 部署 API 示例（示意，以官方文档为准）：

```bash
# ADP Agent 部署 CLI（示意）
tencentcloud adp agent deploy \
  --name "weekly-report-agent" \
  --template "office-suite/weekly-report" \
  --model "hunyuan-pro"
```

```json
{
  "agent": {
    "name": "code-review-buddy",
    "tools": ["tencent-docs", "tencent-meeting"],
    "model": "hunyuan-standard"
  }
}
```

#### 本地测试结果

- ❌ 无腾讯云企业账号，未实测 WorkBuddy
- **未实测原因**：需企业合约与国内账号

#### 问题与解决方案

1. **Agent 无法访问腾讯文档**：管理员未在 ClawPro 授权 OAuth → 重新走连接器授权
2. **个人版与企版能力差异**：企业版独有团队模式与管理后台，需升级席位

#### 官方 vs 社区交叉验证

| 来源 | URL | 一致性 |
|------|-----|--------|
| 腾讯官方大会 | 量子位转述 2026-06-05 | ✅ |
| 36氪快讯 | https://36kr.com/newsflashes/3840103073139209 | ✅ |
| 36氪工具集报道 | https://36kr.com/newsflashes/3839715093662211 | ✅ |

#### 利弊 + 建议

- **个人**：关注 QClaw 微信直连（大会同日提及）
- **团队**：优先试点 Agent Suite 单一场景（如周报）
- **企业**：ClawPro 统一 MCP 与模型审计

---

## 华为盘古 / CodeArts / 昇腾

### 6 月 5 日：Agentic Infra 与 CloudRobo

#### 是什么

华为云 INSPIRE 创想者大会（上海，6 月 5 日）提出 **Agentic Infra 新范式**，发布通智一体化基础设施、新一代模型训推平台、企业级智能体平台；**CloudRobo** 全流程具身智能开发平台（6 月 30 日公测）；智慧医疗等四大「行业 AI 梦工厂」专区上线。

#### 适用场景

- 制造业、医疗、具身智能政企客户
- 昇腾国产算力栈上的大模型训推
- 不适合：纯海外公有云、无华为云账号的初创

#### 前置条件

- 华为云账号、昇腾资源配额
- 行业合规（医疗数据本地化）
- CodeArts 与盘古大模型 API 权限

#### 管理员 SOP

1. 华为云控制台 → 开通 **Agentic Infra** 与 **模型训推平台**
2. 配置昇腾 NPU 集群与 CANN 运行时
3. 6 月 30 日后申请 **CloudRobo** 公测
4. 智慧医疗专区：接入病理 AI 方案（已有多家医院入驻）

#### 开发者 SOP

1. 使用 CodeArts IDE 集成盘古/CodeArts Snap
2. 调用盘古 API 进行 Agent 编排
3. 具身场景：CloudRobo 数据合成 → 仿真 → 部署

#### 配置示例

```bash
# 华为云 CLI 示意（需 hwcloud CLI）
hcloud ModelArts training-job create --name agent-finetune --spec Ascend910
```

#### 本地测试：❌ 无华为云资源

#### 交叉验证：量子位 2026-06-05 — ✅；与 DeepSeek V4 昇腾适配报道 — 部分一致（国产算力主题）

---

## DeepSeek

### 6 月 1 日：识图模式灰测（trigger 前 5 日内）

#### 是什么

DeepSeek 网页版与 App 灰度上线 **识图模式**：用户上传图片，模型进行视觉理解并结合文本推理。APPSO 实测识别隐喻图、常规物体准确率较高；不支持 HEIF；极新物体（如苹果 Finder 酱）可能失败。

#### 适用场景

- 多模态问答、图表解读、产品截图分析
- 不适合：生产 OCR 流水线（灰测稳定性未保证）

#### 前置条件

- chat.deepseek.com 或 App 最新版
- 可能被灰度到（非全量）
- API 侧多模态接口以官方文档为准

#### 使用步骤

1. 打开 DeepSeek 网页/App，查看输入框是否出现图片上传图标
2. 上传 PNG/JPG 图片
3. 提问：「描述这张图中的关键信息」
4. 开启思考模式可提高复杂推理质量

#### API 示例（V4-Flash，OpenAI 兼容）

```bash
export DEEPSEEK_API_KEY="your-key"

curl https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "这张架构图的核心组件是什么？"},
          {"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}
        ]
      }
    ]
  }'
```

**进阶 — Anthropic 兼容接口迁移（V4 文档）：**

```bash
curl https://api.deepseek.com/anthropic/v1/messages \
  -H "x-api-key: $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "max_tokens": 4096,
    "messages": [{"role": "user", "content": "Review this PR diff..."}]
  }'
```

#### 本地测试

- ⚠️ 无 `DEEPSEEK_API_KEY`，未执行 curl
- ✅ [API 文档](https://api-docs.deepseek.com/zh-cn/updates) 确认 V4 模型名与 7 月 24 日旧名停用

#### 问题与解决方案

1. **未看到识图入口**：灰测未覆盖 → 等待全量或换账号
2. **API 404 model**：使用 `deepseek-v4-pro` 而非 `deepseek-chat`（7 月 24 日后旧名将不可用）

#### 交叉验证

| 来源 | 一致性 |
|------|--------|
| [DeepSeek API 更新日志](https://api-docs.deepseek.com/zh-cn/updates) | ✅ |
| [36氪 2026-06-01](https://www.36kr.com/p/3788474106715144) | ✅ |
| 晚点播客 V4 解读 | 部分（播客侧重架构，未谈识图） |

#### 利弊 + 建议

- **个人**：灰测期勿依赖识图做关键业务
- **团队**：开始迁移 API model 名至 v4-pro/flash
- **企业**：评估私有化 DeepSeek + 昇腾部署（V4 MIT 开源）

---

## 阿里通义 / 百炼 / Qwen-Coder

### 今日轮询（2026-06-06）

**今日无公开更新**（检索时间 2026-06-06 22:00 UTC）。最近动态：**Qwen Code v0.16.2**（5 月 28 日）Auto-Memory 默认开启、Worktree Phase D。

#### Qwen Code 本地实测（6 月 6 日）

```bash
npm install @qwen-code/qwen-code@latest
qwen --version  # 0.17.1

# Worktree 隔离（5 月 28 日文档能力，0.17.1 应包含）
qwen --worktree my-feature --approval-mode auto -i "添加 README 章节"
```

**基础示例 — 单次查询：**

```bash
qwen -p "列出 package.json 中的 dependencies" --approval-mode default
```

**进阶 — worktree + symlink 配置 `.qwen/settings.json`：**

```json
{
  "worktree": {
    "symlinkDirectories": ["node_modules", ".venv"]
  }
}
```

```bash
qwen --worktree pr-123 --worktree-ref refs/pull/123/head
```

#### 交叉验证

- [Qwen Code 周报 2026-05-28](https://qwenlm.github.io/qwen-code-docs/zh/blog/weekly-update-2026-05-28/) — ✅
- 本地 `qwen --help` 含 `--worktree` — ✅

---

## 字节 Trae / 火山方舟

### 最近更新：2026-06-01（非 trigger 当日）

**今日无公开更新**（2026-06-06 检索）。**6 月 1 日** Trae SOLO 桌面端：内置浏览器支持选中元素并添加到对话/评论（[trae.cn/changelog](https://www.trae.cn/changelog)）。

#### 使用步骤

1. 更新 Trae SOLO 至 v0.1.13+
2. 打开 SOLO 内置浏览器，加载本地 dev server
3. 选中 DOM 元素 → 「添加到对话」
4. Agent 获得元素上下文进行改码

#### 本地测试：❌ Trae 桌面未安装在 Linux 云环境

#### 交叉验证：Trae 官方 changelog — ✅

---

## 百度文心 / Comate

**今日无公开更新**（2026-06-06 22:00 UTC，检索百度 AI 开放平台与 Comate 更新日志无 6 月 5–6 日条目）。

---

## 智谱 GLM / CodeGeeX

**今日无公开更新**。InfoQ 近期提及 GLM-4.7 在国内 Agentic 基座表现（[InfoQ 2026](https://www.infoq.cn/article/iHkvlLuTCWNJv27eJ1XY)），非 6 月 6 日新发布。

---

## 月之暗面 Kimi

**今日无公开更新**。Kimi K2.5/K2.6 视频读取能力见于 Trae 5 月 15 日集成，非 Kimi 官方 6 月 6 日 changelog。

---

## 讯飞星火 / iFlyCode

**今日无公开更新**（2026-06-06 检索讯飞开放平台无新公告）。

---

## 其他厂商（MiniMax、商汤、昆仑万维、零一万物、面壁）

| 厂商 | 6 月 5–6 日状态 |
|------|-----------------|
| MiniMax | 无公开更新；量子位 6 月 5 日提及 Step 3.7 Flash AA 榜（阶跃星辰，非 MiniMax） |
| 商汤 SenseNova | 无公开更新 |
| 昆仑万维天工 | 无公开更新 |
| 零一万物 Yi | 无公开更新 |
| 面壁 MiniCPM | 无公开更新 |

---

## 今日轮询无更新汇总表

| 厂商/产品 | 检索时间 (UTC) | 检索来源 |
|-----------|----------------|----------|
| 阿里通义/百炼官网 | 2026-06-06 22:00 | aliyun.com, qwenlm.github.io |
| 百度 Comate | 2026-06-06 22:00 | ai.baidu.com |
| 腾讯混元 API 文档 | 2026-06-06 22:00 | cloud.tencent.com（6/5 有大会新闻） |
| 字节 Trae changelog | 2026-06-06 22:00 | trae.cn/changelog |
| 智谱开放平台 | 2026-06-06 22:00 | open.bigmodel.cn |
| Kimi 平台 | 2026-06-06 22:00 | moonshot.cn |
| 讯飞开放平台 | 2026-06-06 22:00 | xf-yun.com |
| 华为云 CodeArts | 2026-06-06 22:00 | huaweicloud.com（6/5 有大会） |
| MiniMax/商汤/天工/Yi/MiniCPM | 2026-06-06 22:00 | 各官网 |

---

## 检索记录

- `腾讯云 WorkBuddy 企业版 2026年6月5日`
- `华为云 Agentic Infra 2026年6月5日`
- `DeepSeek 识图 2026年6月`
- `npm @qwen-code/qwen-code`
