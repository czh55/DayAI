# 国内 AI 厂商与编程产品 — 2026-06-13

> 检索时间：UTC 2026-06-13 22:30（北京时间 2026-06-14 06:30）  
> 轮询范围：阿里、百度、腾讯、字节、智谱、月之暗面、DeepSeek、讯飞、华为及「其他」清单

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **字节豆包 App「任务模式」于 6 月 13 日大范围上线**（雷科技/网易转载），将 Agent 能力（联网、浏览器操控、定时任务、PPT/报告生成）推到 **C 端默认入口**，模式切换由「快速/思考/专家」变为「快速/专家/任务」。  
2. **2026 智源大会 6 月 12–13 日在北京中关村国际创新中心举行**（量子位），主题升级为 AI 与物理世界、生命科学「三体互动」，**Agent 工作流部署与安全**成主论坛核心。  
3. **扣子 3.0 多 Agent 项目空间**（钛媒体 6/10 实测）：可把 **Claude Code、Codex、OpenClaw** 等本地 Agent 拉入同一协作空间——国内开发者编排国际编程 Agent 的「飞书群式」范式落地。

---

## 本地实测总览

### 国际 CLI（必做）

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest

./node_modules/.bin/claude --version
# 2.1.177 (Claude Code)  ✅

./node_modules/.bin/claude --help | head -20
# 正常输出选项  ✅

./node_modules/.bin/codex --version
# codex-cli 0.139.0  ✅

./node_modules/.bin/codex doctor
# 无 auth，auth/websocket/terminal 有 warn/fail  ⚠️

./node_modules/.bin/codex features list | head -20
# 正常  ✅
```

### 国内 OpenAI 兼容 API（DeepSeek 示例）

**未实测原因**：环境无 `DEEPSEEK_API_KEY`；以下仅验证 SDK 与官方 curl 模板格式。

```bash
pip install openai
python3 -c "import openai; print('openai', openai.__version__)"
# openai 2.41.1  ✅

# 官方 curl 模板（需替换 key 后实测）
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

```python
# 基础示例 — OpenAI SDK 指向 DeepSeek
from openai import OpenAI
client = OpenAI(api_key="sk-...", base_url="https://api.deepseek.com")
# resp = client.chat.completions.create(model="deepseek-chat", messages=[...])

# 进阶示例 — 流式 + 工具占位
# stream = client.chat.completions.create(
#     model="deepseek-chat",
#     messages=[{"role": "user", "content": "写快速排序 Python"}],
#     stream=True,
# )
# for chunk in stream:
#     print(chunk.choices[0].delta.content or "", end="")
```

| 项目 | 结果 |
|------|------|
| openai SDK 安装 | ✅ |
| DeepSeek 实调 | ❌ 无 Key |
| 百炼/Qwen 官方 npm CLI | 未检出当日必装包，跳过 |

---

## 字节：豆包「任务模式」（2026-06-13）

### 是什么

豆包 App 在底部模式栏新增 **「任务」**，本质是面向普通用户的 **Agent 模式**：可拆解目标、联网检索、调用浏览器、生成 PPT/报告/表格，并支持 **定时任务**（如每日资讯汇总）。

### 前置条件

- 豆包 App 最新版（6/13 起大范围灰度/全量，以客户端为准）  
- 登录字节账号；任务模式当前报道为 **免费**  
- 浏览器/文件权限需用户授权

### 详细使用步骤

1. 打开豆包 App，确认底部有 **任务** 标签  
2. 输入目标，如：「整理国内 AI 应用竞争格局，生成内部分享 PPT」  
3. 观察 Agent 拆解子任务并逐步执行  
4. 在产物页面下载 PPT/文档  
5. （进阶）设置定时：「每天早上 8 点汇总 AI 行业新闻」

### 命令与配置示例

移动端无 CLI；语音输入可直接说任务目标。进阶用户可配合 **火山方舟 API** 自建类似 Agent（需企业备案与密钥）。

### 本地测试结果

- ❌ 无安卓/iOS 模拟器，**未实测** App UI  
- ✅ 信源： [网易/雷科技 2026-06-13](https://www.163.com/dy/article/KVA1QR2R051100B9.html)

### 问题与解决方案

| 问题 | 处理 |
|------|------|
| 看不到「任务」| 升级 App；换账号区域；等待全量 |
| 浏览器操控失败 | 检查系统浏览器权限与杀后台策略 |
| PPT 质量参差 | 缩小 scope，指定大纲章节 |

### 官方 vs 媒体

| 来源 | 一致性 |
|------|--------|
| 雷科技 6/13 | 任务模式免费、大范围上线 | — |
| [36氪 豆包付费](https://www.36kr.com/p/3797510542334983) | 豆包试水会员，免费仍保留 | 部分一致：任务免费 vs 会员增值并存 |

### 分角色建议

- 个人：用任务模式做调研/PPT 草稿  
- 团队：勿将未脱敏数据交给 C 端 Agent  
- 企业：评估数据出境与豆包企业版合约

---

## 字节：扣子 3.0 多 Agent 项目空间（2026-06-10）

### 是什么

扣子（Coze）**3.0** 引入 **项目空间**：可添加人类成员与 **AI 成员**（本地 Claude Code/Codex/OpenClaw、云端 Agent 或职业模板 Agent），共享上下文与交付记录。

### 管理员 SOP

1. 火山引擎控制台开通扣子企业版/团队  
2. 配置 SSO 与数据驻留策略  
3. 审批可接入的本地 Agent 类型（Codex/Claude Code）  
4. 设定项目模板与权限角色

### 开发者使用 SOP

1. 登录扣子 3.0 → 新建项目  
2. 成员列表 → 添加 AI → 选择 **本地 Agent** 或云端  
3. 按本地工具文档启动 Claude Code/Codex 并授权扣子桥接  
4. 在群聊中 @ 各 Agent 分工  
5. 移动端查看产物并微调

### 示例

- **基础**：单 Codex 成员完成「调研竞品 API 定价」  
- **进阶**：Claude Code 写代码 + 模板 Agent 写运营文案，同一项目空间汇总

### 本地测试

- ⚠️ 未开通扣子账号，未桥接本地 Codex  
- 媒体实测：[钛媒体 2026-06-10](https://www.tmtpost.com/8021226.html)

### 对开发者意味着什么

国内平台首次把 **国际 CLI Agent** 当作「群成员」编排，降低多工具切换成本；但依赖火山账号与网络，企业需单独评估代码外传风险。

---

## 智源大会与生态（2026-06-12–13）

### 核心事实

- **时间**：2026 年 6 月 12–13 日  
- **地点**：北京·中关村国际创新中心  
- **来源**：[量子位 2026-06-12](https://www.qbitai.com/2026/06/435394.html)  
- **议题**：Agent 与真实世界交互、安全可信、终端智能体、OpenClaw、Agent for Science 等  
- **参会**：阿里、腾讯、智谱、MiniMax、Meta、英伟达、MIT 等

### 对开发者意味着什么

大会信号是 **Agent 从模型 demo 进入社会系统运行**，国内招聘与开源项目可能向 Agent Infra、评测、安全倾斜；短期可关注智源开源评测与示范 Agent。

---

## DeepSeek（媒体延续 + 无 6/13 官方帖）

### 今日状态

- **官方平台**（platform.deepseek.com、GitHub deepseek-ai）在 trigger 窗口 **无新模型发布公告**  
- **媒体**：虎嗅 6/12 [梁文锋向左，杨植麟向右](https://www.huxiu.com/article/4866794.html) 报道 DeepSeek 启动融资、招聘数据中心/GPU 交付岗位；36氪此前报道网页端 **快速/专家模式** 分层  

### API 实测（模板）

见文首「本地实测总览」；有 Key 后可用 `base_url=https://api.deepseek.com` 调用 `deepseek-chat` / `deepseek-reasoner`。

### 备案/区域

- 使用官方 API 需遵守深度求索服务条款与国内生成式 AI 备案要求  
- 企业私有化部署需单独商务与等保评估

---

## 阿里通义 / 千问

### 今日状态

- 无 6/13 单独 changelog；钛媒体延续报道 **千问向第三方 Agent/Skill 开放**（瑞幸、肯德基等入驻测试）  
- 智源大会同台露出

### 开发者可关注

- 千问 App 内品牌 Agent 接入流程（企业 ToB）  
- 百炼 Model Studio OpenAI 兼容端点（需阿里云 AK）

---

## 月之暗面 Kimi

### 今日状态

- 虎嗅 6/12：Kimi 多轮融资、Harness 团队扩张 vs DeepSeek 基建路线对比  
- 无 Kimi Code / CLI 6/13 版本公告

---

## 腾讯 CodeBuddy / 微信 AI

### 今日状态

- 钛媒体/界面延续 **微信 AI 生态接入小程序**（6/8 开放平台公告）  
- CodeBuddy 无 6/13 独立更新日志

---

## 百度 Comate / 智谱 / 讯飞 / 华为 / 其他

| 厂商 | 6/13 状态 |
|------|-----------|
| 百度 Comate | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 智源大会参与，无新产品帖 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 大会 Agentic Infra 议题，无版本帖 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无可靠 6/13 更新 |

---

## 今日轮询无更新（汇总表）

| 厂商/产品 | 检索时间 | 检索来源 | 结论 |
|-----------|----------|----------|------|
| 百度文心/Comate | 2026-06-13 22:30 | ai.baidu.com、Comate 文档 | 无 6/13 更新 |
| 腾讯混元/CodeBuddy | 同上 | cloud.tencent.com、CodeBuddy 文档 | 无 6/13 版本公告 |
| 阿里百炼 API changelog | 同上 | bailian.console.aliyun.com | 无 6/13 新帖 |
| 智谱开放平台 | 同上 | open.bigmodel.cn | 无 6/13 更新 |
| Kimi 产品页 | 同上 | kimi.moonshot.cn | 无 6/13 changelog |
| DeepSeek GitHub | 同上 | github.com/deepseek-ai | 无 6/13 release |
| 讯飞开放平台 | 同上 | xfyun.cn | 无 6/13 更新 |
| 华为云盘古 | 同上 | huaweicloud.com | 无 6/13 更新 |
| Trae IDE | 同上 | trae.ai | 无 6/13 可验证更新 |
| MiniMax/商汤/天工/Yi/MiniCPM | 同上 | 各官网 | 无 6/13 更新 |

---

## 检索关键词记录

`豆包 任务模式 2026-06-13`、`智源大会 2026 Agent`、`扣子 3.0 Claude Code`、`DeepSeek 融资 2026-06`
