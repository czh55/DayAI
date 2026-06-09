# 国内 AI 厂商与编程产品 — 2026-06-09

> 检索时间：2026-06-09T22:02Z 前后  
> 轮询：阿里、百度、腾讯、字节、智谱、月之暗面、DeepSeek、讯飞、华为及「其他」清单

---

## 国内综述（今日最值得开发者关注的 1–3 条）

1. **今日无国内头部编程 IDE/CLI 官宣大版本**；国际侧 Anthropic Fable 5 + Codex 0.139.0 占头条，国内需关注 **间接影响**（API 定价压力、Agent 范式跟进）。
2. **DeepSeek**：官网 6/9 无新公告，但 **识图灰测** 与 **V4 旧 API 7/24 停用** 仍直接影响接入方；建议本周完成 `deepseek-chat` → `deepseek-v4-*` 迁移演练。
3. **媒体共识**（见 china-media.md）：国内 Coding Agent 竞争从「模型榜单」转向 **飞轮（反馈/Benchmark/Agent Engineers）** 与 **企业 Spec-Driven**，华为码道、百度文心快码等 QCon 议题可作路线图参考。

---

## 今日轮询无更新（检索 2026-06-09）

| 厂商/产品 | 检索入口 | 结果 |
|-----------|----------|------|
| 阿里通义/百炼/Qwen-Coder | tongyi.aliyun.com、github.com/QwenLM | 今日无公开 changelog |
| 百度文心/Comate/快码 | ai.baidu.com、Comate 文档 | 今日无公开更新 |
| 腾讯混元/CodeBuddy | cloud.tencent.com、codebuddy.ai | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | volcengine.com、trae.ai | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | open.bigmodel.cn、github.com/THUDM | 今日无公开更新 |
| 月之暗面 Kimi/Kimi Code | moonshot.cn | 今日无公开更新 |
| 讯飞星火/iFlyCode | xfyun.cn | 今日无公开更新 |
| 华为盘古/CodeArts/码道 | huaweicloud.com | 今日无公开更新 |
| MiniMax/商汤/天工/零一/面壁 | 各官网 | 今日无公开更新 |

文首声明：**今日（2026-06-09）下列多数厂商无公开更新**；下表仅展开 **近期有可靠来源、且影响开发者** 的条目。

---

## DeepSeek

### 近期更新：识图模式灰测（非 6/9 当日，仍属活跃）

**来源**：36氪 2026-06 报道；研究员陈小康 X 发文「Now, we see you」。

**机制**：网页版/App 灰度开启图像输入；支持隐喻解读与常规识图；**不支持 HEIF**；**不联网**，新知识体可能识别失败。

**前置条件**：DeepSeek 账号；灰度命中；图片 JPG/PNG 等支持格式。

**使用步骤**

1. 打开 https://chat.deepseek.com 或 App
2. 查看输入框是否出现图像附件按钮
3. 上传图片并提问
4. 对比「思考模式」开/关速度与准确率
5. 开发者侧：关注后续 API 多模态端点公告（灰测期 API 可能未同步）

**API 迁移（高优先级）**

官方文档：2026-07-24 15:59 UTC 后 `deepseek-chat` / `deepseek-reasoner` **停用**，需迁至 `deepseek-v4-pro` 或 `deepseek-v4-flash`。

**基础示例（OpenAI 兼容，需 `DEEPSEEK_API_KEY`）**

```bash
export DEEPSEEK_API_KEY="your-key"
export DEEPSEEK_BASE_URL="https://api.deepseek.com"

curl -s https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-v4-flash",
    "messages": [{"role": "user", "content": "用一句话解释 Rust 所有权"}],
    "max_tokens": 256
  }'
```

**进阶示例（Anthropic 兼容格式，V4 文档宣称）**

```bash
curl -s https://api.deepseek.com/anthropic/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $DEEPSEEK_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "deepseek-v4-pro",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "列出 monorepo 迁移 checklist 十条"}]
  }'
```

**本地实测**

```bash
# 无 API Key，仅验证 openai SDK 可安装用于兼容调用
pip install openai -q
python3 -c "import openai; print('openai', openai.__version__)"
# openai 2.41.0 ✅

# curl 模板未执行（无 DEEPSEEK_API_KEY）❌
```

**常见错误**

| 错误 | 排查 |
|------|------|
| 401 | 检查 Key 与 base_url |
| model not found | 改用 v4-pro/v4-flash |
| 7/24 后旧模型失败 | 提前迁移并压测 |

**交叉验证**

- 官方：https://api-docs.deepseek.com/news/news260424 ✅
- 36氪识图报道 ✅
- 腾讯云社区 V4 解读 ✅

**备案/出境**：面向境内用户需使用已备案服务；API 数据存储与跨境以 DeepSeek 用户协议为准。

---

## 华为云码道（CodeArts）— 企业级编程 Agent 参考架构

> 非 6/9 更新；InfoQ 2026-02-27 深度文，供国内「百万行 Java」场景对照。

**要点**：强调 **托底机制**（ML 补全 + 确定性重构 + 语义巡检 + 全局导航），AI 生成后人类审核架构；适合 **长周期维护、高可靠** 而非 demo 生成量。

**管理员 SOP**：在华为云开通 CodeArts 码道 → 配置企业代码仓权限 → 设定规范与巡检规则 → 分配开发者席位。

**开发者 SOP**：IDE 插件登录 → 使用补全/重构/巡检 → 对 AI 生成块做 code review → 合并走现有 CI。

**未实测原因**：需华为云企业账号与码道租户。

**来源**：https://www.infoq.cn/article/H9C1UYwZUOhemxTDphqY

---

## 百度文心快码 — Coding Agent 飞轮（QCon 议题）

InfoQ 2026-04 预告：文心快码分享 **Feedback Loop + Benchmark + Agent Engineers**，强调「调系统不调模型」。

**对开发者启示**：国内大厂 IDE 产品将要求团队建立 **Agent 行为评测集** 与 **生产反馈闭环**，个人仅换模型不够。

**今日状态**：无新 changelog；Comate 官网 6/9 无编程 Agent 特性公告。

**未实测**：Comate 无官方 npm CLI；需 IDE 插件 + 百度账号。

---

## 本地实测总览

| 项目 | 命令/结果 | 状态 |
|------|-----------|------|
| 国际 Claude Code | `claude --version` → 2.1.170 | ✅ |
| 国际 Codex | `codex --version` → 0.139.0 | ✅ |
| openai Python SDK | `pip install openai` → 2.41.0 | ✅ |
| DeepSeek API curl | 无 `DEEPSEEK_API_KEY` | ❌ 未测 |
| Qwen/Kimi 官方 npm CLI | 无官方包 | ⚠️ 跳过 |
| 智谱/百川 CLI | 未安装官方全局 CLI | ⚠️ 跳过 |

**说明**：国内厂商普遍以 **Web/API + IDE 插件** 交付；有 OpenAI 兼容端点的优先用 `curl` + `openai` SDK 模板；密钥由用户自备。

---

## 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | 完成 DeepSeek V4 迁移；识图灰测可体验产品方向 |
| 团队 | 建立自有 Benchmark，对照 Claude Code Loop 范式 |
| 企业 | 评估码道/Comate 类「托底机制」+ 备案合规 |

---

## 研究员结论

2026-06-09 国内 **产品发布空窗**，但 **DeepSeek API 迁移倒计时** 与 **识图能力补齐** 是真实工程任务。国际 Fable 5 拉高「最强编码模型」天花板，国内 V4/Qwen/GLM 应在 **同仓库 Agent 任务** 上复测，避免只看 MMLU。未来 3–6 个月：Trae、CodeBuddy、Comate 可能集中跟进 **Loop/Goal 类自动化**——建议本周在内部文档记录国际范式，便于对齐下一波国内 changelog。
