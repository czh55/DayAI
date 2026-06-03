# 国内 AI 厂商与编程产品 — 2026-06-03

> 轮询时间（UTC）：2026-06-03T14:06 前后；来源：各官网、GitHub、量子位/36氪等（见各节）。  
> 本地实测目录：`/workspace/tools`

---

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **MiniMax M3 + MiniMax Code**：量子位 6 月报道 M3 在 SWE-Bench Pro 等指标对标国际闭源，并同步推出编程产品；Token Plan 计费引发讨论后官方调整周限额——**国内开源模型 + 编程 Agent 商业化** 的样本。  
2. **DeepSeek 识图灰测 + DeepGEMM Mega MoE**：多模态能力以「识图模式」小范围上线；基础设施层推进 **FP8×FP4、Mega MoE** 与 JIT 内核统一——影响后续 API 成本与长上下文 Agent。  
3. **字节 Bernini 视频框架开源**：MLLM 规划 + DiT 渲染的「先理解再生成」路线，对 **多模态 Agent / 视频工具链** 有参考意义，非纯聊天模型新闻。

---

## 本地实测总览

```bash
cd /workspace/tools
# 国际（必做）— 2026-06-03 已执行
npm install @anthropic-ai/claude-code@latest @openai/codex@latest
./node_modules/.bin/claude --version   # 2.1.161 ✅
./node_modules/.bin/codex --version    # 0.136.0 ✅

# 国内官方 npm/pip CLI — 当日文档涉及但无统一 API Key
# MiniMax / DeepSeek 等以 OpenAI-compatible HTTP 为主，本环境未配置密钥
curl -sS "https://api.deepseek.com/v1/models" -H "Authorization: Bearer $DEEPSEEK_API_KEY" 
# ❌ 未执行：DEEPSEEK_API_KEY 未设置

# 若有 Key，基础调用模板（OpenAI 兼容）：
# curl -sS https://api.deepseek.com/v1/chat/completions \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
#   -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"hello"}]}'
```

| 产品 | 实测 | 说明 |
|------|------|------|
| Claude Code / Codex | ✅ 版本与 help | 见 README |
| DeepSeek API | ❌ 无 Key | 模板见上 |
| MiniMax API | ❌ 无 Key | 见 MiniMax 开放平台文档 |
| Qwen / 百炼 CLI | ❌ 未安装 | 无当日必测特性 |

---

## MiniMax

### 核心更新（2026 年 6 月，量子位等）

- **M3 模型**上线，强调编程与长任务；报道称 SWE-Bench Pro **~59%**，并推出 **MiniMax Code**。  
- **Token Plan** 新计费引发争议，官方提高周限额并对老用户保留原周限额策略（量子位转述 CEO 与社区反馈）。

### 特性：MiniMax Code + M3 编程调用

#### 是什么

面向开发者的编程入口，配合 M3 长上下文与工具调用（具体能力以 [MiniMax 开放平台](https://www.minimaxi.com) 为准）。

#### 适用场景

长任务代码生成、仓库级分析；不适合强合规金融场景未备案部署。

#### 前置条件

- 注册 MiniMax 账号与 API Key  
- 了解 **Token Plan** 配额（周限额）  
- 数据出境：若处理境内用户 PII，需企业合规评估

#### 详细使用步骤

1. 登录 MiniMax 开放平台创建 API Key  
2. 阅读 Token Plan 与 Code 产品页定价  
3. 在 IDE 或 CLI 中配置 OpenAI 兼容 base URL（以官方文档为准）  
4. 发送编程任务（基础示例见下）  
5. 监控周用量；触顶后按官方公告扩容或等待周期重置

#### 命令与配置示例

**基础（curl，需替换 KEY 与官方 base URL）**

```bash
export MINIMAX_API_KEY="your-key-here"
export MINIMAX_BASE_URL="https://api.minimaxi.com/v1"

curl -sS "${MINIMAX_BASE_URL}/chat/completions" \
  -H "Authorization: Bearer ${MINIMAX_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "MiniMax-M3",
    "messages": [
      {"role": "user", "content": "用 Python 写一个快速排序并附单元测试"}
    ]
  }'
```

**进阶（OpenAI Python SDK 兼容，需 pip install openai）**

```bash
pip install openai
export OPENAI_API_KEY="${MINIMAX_API_KEY}"
export OPENAI_BASE_URL="${MINIMAX_BASE_URL}"

python3 << 'PY'
from openai import OpenAI
client = OpenAI()
r = client.chat.completions.create(
    model="MiniMax-M3",
    messages=[{"role": "user", "content": "Refactor this repo's lint script to support monorepo"}],
)
print(r.choices[0].message.content)
PY
```

#### 本地测试结果

❌ 未实测 — 无 API Key。量子位 [一手实测文](https://www.qbitai.com/2026/06/428092.html) 与官方回应 — **部分一致**（模型能力为媒体实测，计费策略以官方为准）。

#### 问题与解决方案

| 问题 | 排查 | 解决 |
|------|------|------|
| 周限额触顶 | Dashboard 用量 | 官方扩容公告；降级模型 |
| 与 GPT 对比失真 | 基准任务不同 | 用自家仓库任务复现 |
| 合规 | 数据驻留 | 企业私有化洽谈 |

#### 官方 vs 媒体

- 量子位：M3 性能、Token Plan — **含观点与实测**  
- 官方：限额调整 — ✅ 与「火速回应」叙述一致（细节以官网为准）

#### 建议

**个人**：先用小 repo 验证 Code；**团队**：将 MiniMax 作 **第二供应商** 与 Claude Code/Codex 并列，避免 IDE 单点。

---

## DeepSeek

### 核心更新

1. **识图模式灰测**（App/Web，36氪 等 6 月初报道）：快速模式/专家模式外增加「识图」；非全量开放。  
2. **DeepGEMM / Mega MoE**（36氪）：基础设施更新，**FP8×FP4**、JIT、统一 CUDA 内核库描述调整——**非新模型发布**，但影响推理成本。  
3. **V4 系列**（4–5 月已发）：百万上下文、旧 API `deepseek-chat` / `deepseek-reasoner` 将于 **2026-07-24** 停用（腾讯云开发者社区等转述）。

### 特性：识图模式（灰测）

#### 是什么

基于 V4 主干的 **视觉理解模块** 灰度；媒体称更接近「挂载式识图」而非完整原生多模态一体（36氪「能力边界」文 **观点**）。

#### 前置条件

- 账号在灰度名单  
- 客户端/App 已更新  
- 图片格式：部分 **不支持 HEIF**（36氪实测 **观点**）

#### 使用步骤

1. 更新 DeepSeek App 或网页版  
2. 若输入栏出现「识图模式」则进入  
3. 上传 JPG/PNG 测试  
4. 对比「专家模式 + 联网」对新物品的识别差异  
5. 勿将灰测能力写入生产 SLA

#### 本地测试结果

❌ 未实测 — 无灰度账号。36氪与 APPSO 转述 — 交叉验证 **一致**。

#### 对开发者

API 侧仍以文本为主；视觉 API 全量开放需等官方文档。迁移计划：在 **7/24 前** 切到 V4 接口。

### 特性：OpenAI 兼容 API（V4）

#### 命令示例

```bash
export DEEPSEEK_API_KEY="sk-..."
curl -sS https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "解释 MoE 路由"}]
  }'
```

#### 本地测试

❌ 未实测。官方 [platform.deepseek.com](https://platform.deepseek.com) — SOP 完整。

#### 备案/区域

面向境内服务需遵循生成式备案；企业私有化部署需单独商务与昇腾/CANN 适配（V4 报道提及国产算力）。

---

## 字节跳动（豆包 / Trae / 火山 / Bernini）

### Bernini 开源（量子位 2026/06）

**事实**：字节开源 **Bernini** 统一视频生成与编辑框架；**MLLM planner** 理解文本与参考视频/图，**DiT renderer** 出画；已开源 **Bernini-R**（训练第二阶段），含完整 planner 版本整理中。

**开发者意义**：视频 Agent、广告/剪辑工具链可参考「规划与渲染分离」架构；与 Trae IDE Agent **无直接 CLI 更新** 同日绑定。

**实测**：❌ 未克隆仓库跑通；GitHub 链接见量子位文。

**交叉验证**：[量子位](https://www.qbitai.com/2026/06/427810.html) — 单一信源为主，⚠️ 等待官方博客二次确认。

---

## 腾讯（混元 / CodeBuddy）

### 轮询结果

**今日（6/3）无新 changelog**。量子位 5 月下旬提及 **Hy-MT2** 翻译模型开源与小程序「腾讯 Hy 翻译」——列入 **近期背景**，非 6/3 首发。

**CodeBuddy**：未检索到 6/3 官方更新；编程 Agent 竞品对照见 [china-media.md](./china-media.md) 虎嗅 Trae 增速叙述。

---

## 阿里（通义 / 百炼 / Qwen-Coder）

**今日无公开更新**。行业文引用通义生态与 CUA 训练范式（量子位 5/31 复旦×通义）——非当日版本。

**开发者**：继续通过 Model Studio 控制台查看 Qwen-Coder 版本；百炼 Agent 部署 SOP 以阿里云文档为准。

---

## 百度（文心 / Comate）、智谱、月之暗面、讯飞、华为等

| 厂商 | 6/3 轮询 |
|------|----------|
| 百度 Comate | 无公开更新 |
| 智谱 GLM / CodeGeeX | 无公开更新 |
| 月之暗面 Kimi | 无当日版本；36氪 回顾 Kimi K2.5 与 Cursor 底座合作叙事 |
| 讯飞星火 / iFlyCode | 无公开更新 |
| 华为盘古 / CodeArts | 无公开更新 |
| 商汤 / 昆仑 / 零一 / 面壁 | 无公开更新 |

---

## 今日轮询无更新（汇总表）

| 厂商 | 检索时间 (UTC) | 主要入口 |
|------|----------------|----------|
| 阿里通义 | 2026-06-03 ~14:00 | tongyi.aliyun.com, github.com/QwenLM |
| 百度 | 同上 | yiyan.baidu.com, Comate 文档 |
| 腾讯 | 同上 | cloud.tencent.com, CodeBuddy 文档 |
| 智谱 | 同上 | open.bigmodel.cn |
| Kimi | 同上 | platform.moonshot.cn |
| 讯飞 | 同上 | xfyun.cn |
| 华为 | 同上 | huaweicloud.com |

---

## 管理员 vs 用户（企业 IDE 类，通则）

### 管理员 SOP

1. 选定厂商与 **备案** 状态  
2. 开通企业 VPC / 私有化（若需）  
3. 配置 SSO 与 API 密钥轮换  
4. 下发 IDE 插件 vs CLI 使用规范  
5. 审计日志对接 SIEM

### 开发者 SOP

1. 使用公司发放的 Key（勿个人密钥进生产）  
2. 优先 OpenAI 兼容层减少厂商锁定  
3. 长任务配合本地 `claude`/`codex` 做对照  
4. 7/24 前完成 DeepSeek 旧 API 迁移（如适用）

---

## 与 industry / media 交叉索引

| 话题 | 本文 | 其他文件 |
|------|------|----------|
| DeepSeek V4 / 识图 | 本节 | industry #5 晚点播客；china-media 晚点/36氪 |
| MiniMax M3 | 本节 | china-media 量子位 |
| Trae Agent 增速 | 虎嗅引用 | china-media |
