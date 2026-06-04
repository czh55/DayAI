# 国内 AI 厂商与编程产品 — 2026-06-04

**检索时间（UTC）**：2026-06-04T22:00 前后  
**轮询范围**：阿里、百度、腾讯、字节、智谱、月之暗面、DeepSeek、讯飞、华为及「其他」清单  

---

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **国际侧当日主战场在 IDE Agent**：Cursor 3.7 Canvas Design Mode、Claude Code 2.1.163 企业版本锁、Codex 0.138 alpha 企业配置 — 国内官网 **未见同级 changelog**，但开发者应同步评估内部工具链是否跟进「Canvas 可视化协作 + 企业配额」。  
2. **字节 Bernini 开源（6 月上旬媒体报道）**：视频生成/编辑统一框架，MLLM 先规划、DiT 再渲染 — 偏多模态工程化，对 **Trae/豆包编程 Agent** 无直接版本号更新，但反映字节在 **Agent 流水线** 上的组件化思路。  
3. **DeepSeek 识图灰度**：属 **2026 年 4 月** 已报道能力，**非 6 月 4 日新发**；若你依赖视觉 API，应跟踪 `deepseek-v4-pro` 是否正式开放 vision 端点（灰度与 API 文档可能不同步）。

---

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 (UTC) | 主要来源 | 结论 |
|-----------|----------------|----------|------|
| 阿里通义/百炼/Model Studio/Qwen-Coder | 2026-06-04 22:00 | aliyun.com、github.com/QwenLM | 今日无公开更新 |
| 百度文心/Comate/快码 | 同上 | ai.baidu.com、Comate 文档 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 同上 | cloud.tencent.com、codebuddy 文档 | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 同上 | volcengine.com、trae.ai | 今日无 changelog；Bernini 见下节 |
| 智谱 GLM/CodeGeeX/Z.ai | 同上 | open.bigmodel.cn、github.com/THUDM | 今日无公开更新 |
| 月之暗面 Kimi/Kimi Code | 同上 | platform.moonshot.cn | 今日无公开更新 |
| DeepSeek API/平台 | 同上 | platform.deepseek.com、github.com/deepseek-ai | 今日无新公告 |
| 讯飞星火/iFlyCode | 同上 | xfyun.cn | 今日无公开更新 |
| 华为盘古/CodeArts/昇思 | 同上 | huaweicloud.com | 今日无公开更新 |
| MiniMax/商汤/天工/零一万物/面壁 | 同上 | 各官网 | 今日无公开更新 |

> 文首声明：**今日无公开更新**（指 6 月 4 日 24h 内无可靠 changelog/新闻稿级发布）。下节仅收录 **近日可靠来源**、且与开发者相关的条目，避免与「当日」混淆。

---

## 字节：Bernini 开源（视频 Agent 流水线，非 Trae 版本号）

### 核心事实

- **谁**：字节跳动相关团队  
- **做了什么**：开源 **Bernini** — 视频生成与编辑统一框架；**Bernini-R** 为训练第二阶段模型，含 MLLM Planner 的完整版「代码整理中」  
- **何时**：量子位 2026 年 6 月栏目报道（URL 日期路径 `/2026/06/427810.html`）  
- **来源**：https://www.qbitai.com/2026/06/427810.html  

### 对开发者的意义

适合做多模态应用、短视频工具链的团队评估「先语义规划、再 DiT 渲染」架构；**与终端编程 Agent（Trae）无直接替代关系**。

### 前置条件

- GPU 训练/推理环境  
- 关注 GitHub 开源仓库（报道未在 6/4 给出最终 star 数，以官方 repo 为准）  
- 商业使用需核对 LICENSE  

### 基础示例（概念级 curl，待官方 repo 发布后替换为真实端点）

```bash
# 未实测：仓库 URL 以字节官方 GitHub 组织为准
git clone https://github.com/bytedance/Bernini.git
cd Bernini
pip install -e .
python -m bernini.demo --prompt "把视频中的天空换成晚霞" --input ./sample.mp4
```

### 进阶示例

```python
# 伪代码：Planner + Renderer 两阶段
from bernini import Planner, DiTRenderer

plan = Planner().predict(text="添加电影感调色", video="in.mp4", ref_image="style.jpg")
out = DiTRenderer().render(plan, source_vae_features="in.mp4")
out.save("out.mp4")
```

### 本地测试结果

**未实测** — 6 月 4 日轮询未定位到已安装的官方 pip 包名；原因：报道侧重框架发布，CLI 以 repo 为准 ⚠️  

### 官方 vs 媒体

| 维度 | 结论 |
|------|------|
| 量子位 | 技术路径「先理解再生成」 |
| 官方 | 待核对字节开源账号 README |

### 分角色建议

- **个人**：观望，优先等完整 Planner 开源。  
- **团队**：与现有火山方舟视频 API 对比成本。  
- **企业**：视频内容合规、版权与输出水印策略先行。  

---

## DeepSeek：识图灰度与 V4 API（背景，非今日）

### 核心事实

- **识图模式**：网页/App 灰度，与快速/专家模式并列 — 36氪等 **2026 年 4 月** 报道  
- **V4**：`deepseek-v4-pro` / `deepseek-v4-flash`，1M 上下文；旧名 `deepseek-chat` / `deepseek-reasoner` **2026-07-24** 停用 — 官方 https://api-docs.deepseek.com/zh-cn/news/news260424  

### 开发者可操作：OpenAI 兼容 API（基础）

**前置条件**：DeepSeek 平台 API Key；数据出境/备案按你方企业合规执行。

```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxx"
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "用一句话解释 RAII"}],
    "max_tokens": 256
  }'
```

### 进阶：思考模式 + Agent 场景

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{"role": "user", "content": "设计一个三步骤的代码审查 Agent 工作流"}],
    "reasoning_effort": "max"
  }'
```

### 本地测试结果

```bash
# 本环境无 DEEPSEEK_API_KEY
echo ${DEEPSEEK_API_KEY:-empty}
# empty → 未发起真实推理  ⚠️

# 若仅验证 CLI 生态（第三方 DeepSeek-TUI，非官方）
# 量子位 2026-05 报道 Rust 实现 DeepSeek-TUI — 非 DeepSeek 官方 npm 包
```

### 常见错误

1. **仍使用 deepseek-chat 名称** — 2026-07-24 后失效；迁移至 `deepseek-v4-flash`  
2. **识图灰度与 API vision 能力混淆** — 以 API 文档为准，灰度不等于生产 SLA  

### 媒体交叉

- 36氪：https://www.36kr.com/p/3788474106715144（识图，4 月）  
- 量子位 DeepSeek-TUI：https://www.qbitai.com/2026/05/412914.html（社区 CLI，非官方）  

---

## 国内编程 Agent / CLI 生态对照（供选型）

| 产品 | 官方 CLI/npm | 6/4 状态 | 备注 |
|------|--------------|----------|------|
| DeepSeek-TUI | 社区 Rust 开源 | 非官方 | 适配 V4，Plan/Agent/YOLO 模式 |
| Kimi Code/CLI | 以 Moonshot 文档为准 | 今日无更新 | 需 API Key |
| Qwen-Coder | 通义开发工具链 | 今日无更新 | 常配合百炼 |
| Comate / 快码 | IDE 插件为主 | 今日无更新 | 百度系 |
| CodeBuddy | 腾讯 IDE | 今日无更新 | 原 Copilot 国内版演进 |
| Trae | 字节 IDE | 今日无更新 | 关注 changelog |

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest

# 国际（必做）✅
./node_modules/.bin/claude --version   # 2.1.163
./node_modules/.bin/codex --version    # 0.137.0
./node_modules/.bin/codex doctor       # 无 auth
./node_modules/.bin/codex features list  # TERM=xterm-256color

# 国内
pip show openai 2>/dev/null || echo "未安装 openai SDK"
# 未安装 → 未用 openai 库测 DeepSeek 兼容端点 ⚠️
```

### 使用 openai SDK 测 DeepSeek 兼容端点（模板，需 Key）

```bash
pip install openai
export OPENAI_API_KEY="$DEEPSEEK_API_KEY"
export OPENAI_BASE_URL="https://api.deepseek.com"
python -c "
from openai import OpenAI
c = OpenAI()
r = c.chat.completions.create(model='deepseek-v4-flash', messages=[{'role':'user','content':'ping'}], max_tokens=16)
print(r.choices[0].message.content)
"
```

**结果**：本环境未配置 Key，**未执行** ⚠️  

---

## 数据出境 / 备案 / 私有化（通用前置）

- **公有云 API**：模型推理数据经 DeepSeek/阿里/腾讯等境内节点策略以各平台 **DPA** 为准；跨境团队需法务评审。  
- **大模型备案**：ToB 合同常要求选用 **已备案** 模型名；自建微调需单独评估。  
- **私有化**：华为 CodeArts、部分厂商「专属实例」— 管理员先开通 VPC 内 endpoint，开发者 `BASE_URL` 指向内网。  

---

## 管理员 vs 用户 SOP（企业 IDE 示例：CodeBuddy / Comate 类）

### 管理员

1. 企业控制台开通席位与模型 allowlist。  
2. 配置 SSO、代码不上传策略（以厂商控制台为准）。  
3. 分发 IDE 插件离线包或应用商店链接。  
4. 设定月度 Token 上限（对齐虎嗅 2026-06-04 大厂收紧叙事）。  

### 开发者

1. 安装 IDE 插件并 `login`。  
2. 仅在工作仓库开启「代码上下文」。  
3. 敏感分支使用本地 `.gitignore` 与厂商「排除目录」设置。  

---

## 参考

- https://api-docs.deepseek.com/zh-cn/news/news260424  
- https://www.qbitai.com/2026/06/427810.html  
- https://www.qbitai.com/2026/05/412914.html  
- https://www.36kr.com/p/3788474106715144  
