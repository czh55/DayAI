# Cursor 每日技术文档 — 2026-06-07

> 监测源：[cursor.com/changelog](https://cursor.com/changelog)、官方 SDK 文档  
> 关注版本：**3.7**（2026-06-04 至 06-05 连续发布）  
> 本地说明：Cursor 桌面端需在用户本机升级；下文 SDK 部分可在 Node/Python 环境实测

---

## 今日综述

2026 年 6 月 4–5 日，Cursor 在 **3.7** 版本密集交付两类能力：**面向 UI 迭代的 Design Mode**（浏览器多选 + 语音；Canvas 内标注）与 **面向生产自动化的 Agent SDK 增强**（自定义工具、JSONL 存储、auto-review、无限嵌套 Subagent）。企业侧 6 月 3 日 GA 的 Organizations/Teams/Groups 三层治理仍值得团队管理员跟进。本日（6/7）changelog 无新条目，但 6/5 浏览器 Design Mode 为当周最重要用户可见特性。

---

## 特性一：浏览器 Design Mode — 多选元素

### 是什么（机制说明）

Cursor 内置浏览器（Cursor Browser）中的 Design Mode 允许开发者在**渲染后的页面上直接点选 DOM 元素**，将元素的选择器、布局上下文、相邻组件关系序列化为结构化上下文注入 Agent。6/5 更新加入 **Multi-select**：可同时选中两个及以上元素，Agent 可见它们之间的视觉关系与代码对应关系，从而执行「让 A 样式匹配 B」「删除重复区块」「批量调整一组组件」类任务，而无需用自然语言反复描述位置。

### 适用场景

**适合：** 前端 UI 微调、设计稿对齐、组件库一致性修复、营销页 A/B 变体  
**不适合：** 纯后端逻辑、无 UI 的 CLI 工具、未在 Cursor Browser 中打开的项目

### 前置条件

- Cursor **3.7**（2026-06-05 changelog）
- Cursor Pro/Business/Enterprise 订阅
- 项目在 Cursor 中打开且可通过 Agent 启动本地 dev server
- 浏览器面板：View → Open Browser 或 Agent 提示启动预览

### 详细使用步骤

1. 打开 Cursor，确保版本 ≥ 3.7：Help → About Cursor
2. 启动前端 dev server（如 `npm run dev`）
3. 在 Agent 面板选择 **Open in Browser** 或命令 `@browser`
4. 进入 **Design Mode**（浏览器工具栏画笔/设计图标）
5. **按住 Shift 或按 changelog 说明多选**：依次点击多个元素直至高亮
6. 在 Agent 输入框描述变更，例如：「让左侧卡片 padding 与右侧一致，并统一圆角为 8px」
7. 审查 Agent 生成的 diff，在浏览器中刷新验证

### 命令与配置示例

**Agent 提示词（基础）：**

```text
我已在 Design Mode 中多选了 header 导航与 footer 链接组。
请让 footer 链接的 hover 颜色与 header active 状态一致，修改 Tailwind class，不要改 TS 逻辑。
```

**Agent 提示词（进阶 — 批量去重）：**

```text
多选了三个重复的 ProductCard 实例（见浏览器选中高亮）。
保留第一个的结构，删除另两个重复 JSX，抽取共享组件到 components/ProductCard.tsx，并更新 import。
```

**推荐 `.cursor/permissions.json`（团队前端仓库）：**

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only file reads and npm run dev health checks are fine.",
      "Edits under src/components and src/styles are fine for UI tasks."
    ],
    "block_instructions": [
      "Always pause edits to package.json, .env, and CI workflow files.",
      "Always pause git push and deploy scripts."
    ]
  },
  "deny": [
    "Shell(rm -rf *)",
    "Shell(git push --force *)"
  ]
}
```

**Settings 路径（桌面 Auto-review 联动）：**

`Settings` → `Cursor Settings` → `Agents` → `Run Mode` → 选择 `Auto-review` 或 `Auto-run`（按团队风险偏好）

### 本地测试结果

- ⚠️ Cloud Agent 环境无 Cursor 桌面 GUI，**未实测** Design Mode 多选
- 未实测原因：需 Cursor 3.7 桌面 + 本地 dev server；官方 changelog 与截图描述一致
- ✅ changelog 日期 2026-06-05 与功能描述可交叉验证

### 问题与解决方案

**问题 1：点选元素后 Agent 看不到选中上下文**

- 排查：是否处于 Design Mode；dev server 是否与 Agent 工作区同源
- 解决：重新 Open in Browser；确认元素在 iframe 内时需选中外层 frame

**问题 2：多选后 Agent 只改了第一个元素**

- 排查：提示词是否明确「所有选中元素」
- 解决：在提示词中列出选中顺序与期望的批量操作类型

### 官方 vs 社区交叉验证

| 来源 | 内容 | 一致 |
|------|------|------|
| [cursor.com/changelog 3.7 Jun 5](https://cursor.com/changelog) | Multi-select + Voice | ✅ |
| [虎嗅 Cursor 模型训练文 2026-06](https://www.huxiu.com/article/4864434.html) | 应用侧押注软件工程专用模型 | ✅ 战略一致 |

### 分角色建议

- **个人前端**：Design Mode 替代截图+口述，迭代速度提升明显
- **团队**：`.cursor/permissions.json` 限制改 package.json；Design Mode 变更走 PR review
- **企业**：结合 6/3 Organizations 按团队分配浏览器/Agent 权限与预算

---

## 特性二：浏览器 Design Mode — 语音输入（Voice Input）

### 是什么

Design Mode overlay 内置麦克风：用户可**语音描述** UI 修改。麦克风在 Agent **运行过程中仍保持可用**，支持「排队」下一条语音指令而无需等待当前 run 结束——适合连续微调间距、颜色、文案。

### 前置条件

- Cursor 3.7+
- 系统麦克风权限已授予 Cursor
- 稳定网络（语音转写需云端）

### 详细使用步骤

1. 进入 Design Mode（见特性一）
2. 点击 overlay 上麦克风图标
3. 口述修改，例如：「把主按钮再大一点，颜色改成品牌蓝」
4. Agent 运行中可继续按住麦克风追加：「副标题字号减小两档」
5. 检查 transcript 与代码 diff

### 配置示例

无需额外配置文件；若企业禁用语音，在 managed policy 中关闭 Voice（如有）。

### 本地测试结果

- ⚠️ 未实测（无桌面环境）

### 问题与解决方案

**问题 1：语音无响应**

- 排查：系统隐私设置 → 麦克风 → Cursor
- 解决：重启 Cursor；检查 VPN 是否阻断语音 API

**问题 2：识别中英文混杂错误**

- 解决：单语口述；关键 CSS 属性名可拼读字母

---

## 特性三：SDK Custom Tools（`local.customTools`）

### 是什么

`@cursor/sdk` 本地 Agent 可通过 `local.customTools` 传入 **JavaScript 函数定义**，SDK 自动挂载内置 MCP 服务器 `custom-user-tools`，模型以与普通 MCP 相同路径调用，走同一权限门控。子 Agent **继承**父级 custom tools。

### 前置条件

- `@cursor/sdk` 最新版：`npm install @cursor/sdk`
- Node 18+
- 项目内已配置 Agent 脚本

### 详细使用步骤

1. `npm install @cursor/sdk`
2. 创建 `agent.mjs`，定义 `customTools` 数组（name、description、parameters、handler）
3. `Agent.create({ local: { customTools } })` 或单次 `send({ local: { customTools } })`
4. 运行脚本，观察 tool call 日志
5. 生产环境配合 `local.autoReview: true`

### 命令与配置示例

**基础示例 `examples/custom-tool.mjs`：**

```javascript
import { Agent } from "@cursor/sdk";

const customTools = [
  {
    name: "get_build_status",
    description: "Return last CI build status for current branch",
    parameters: {
      type: "object",
      properties: {},
    },
    async handler() {
      const { execSync } = await import("node:child_process");
      const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
      return { branch, status: "passed", url: "https://ci.example.com/latest" };
    },
  },
];

const agent = await Agent.create({
  local: {
    customTools,
    cwd: process.cwd(),
  },
});

const run = await agent.send("What is the CI status for this branch?");
console.log(await run.wait());
```

**进阶示例（auto-review + JSONL store）：**

```javascript
import { Agent, JsonlLocalAgentStore } from "@cursor/sdk";
import path from "node:path";

const store = new JsonlLocalAgentStore(path.join(process.cwd(), ".cursor-agent-runs.jsonl"));

const agent = await Agent.create({
  local: {
    store,
    autoReview: true,
    customTools: [/* ... */],
  },
});

const run = await agent.send("Run tests only if CI failed");
const result = await run.wait();
console.log("requestId:", result.requestId);
```

### 本地测试结果

```bash
$ cd /workspace && npm install @cursor/sdk 2>&1 | tail -3
# 若未安装，文档建议：npm install @cursor/sdk
```

- ⚠️ 本仓库未预装 `@cursor/sdk`；按 changelog 安装即可
- ✅ API 形状与 [changelog Jun 4](https://cursor.com/changelog) 一致

### 问题与解决方案

**问题 1：custom tool 未出现在 Agent 工具列表**

- 排查：`Agent.create` 是否传入 `local.customTools`；handler 是否 async 抛错
- 解决：先用最小 `handler` 返回字符串验证

**问题 2：子 Agent 调不到 custom tool**

- 排查：是否 SDK 版本 < 3.7 对应 SDK 发布
- 解决：升级 `@cursor/sdk`；custom tools 应自动继承

### 官方 vs 社区

- 官方 changelog ✅
- [InfoQ Harness 文](https://www.infoq.cn/article/vblM3MlOEs86dmVdH8d1) 讨论「薄 Harness」与 Cursor 专用模型路线 — 部分一致

---

## 特性四：SDK Auto-review（`local.autoReview`）

### 是什么

无头 SDK 默认自动执行 tool calls；设 `local.autoReview: true` 后，调用经 **分类器** 决定自动执行或挂起，规则由 `permissions.json` 的 `autoRun.allow_instructions` / `block_instructions` 自然语言描述。

### 前置条件

- `@cursor/sdk` 3.7 配套版本
- 项目根 `.cursor/permissions.json`

### 详细使用步骤

1. 编写 `.cursor/permissions.json`（见特性一完整示例）
2. `Agent.create({ local: { autoReview: true } })`
3. 发送会触发 Shell 的 prompt
4. 检查 run 元数据中被 block 的 calls
5. CI 中对 block 率设告警

### 本地测试结果

- ⚠️ 未在无头环境跑通完整分类器（需 Cursor 后端）

### 问题与解决方案

**问题 1：所有命令都被 block**

- 解决：放宽 `allow_instructions`；确认非 destructive 命令写法明确

**问题 2：危险 delete 仍自动执行**

- 解决：在 `block_instructions` 显式写「Always pause rm and git reset --hard」

---

## 特性五：SDK JSONL 与自定义 Store

### 是什么

Agent run 元数据默认 SQLite；现可换 **JSONL** 追加日志，便于 diff、git 跟踪或自定义 `LocalAgentStore`（如 Postgres 后端）。

### 详细使用步骤

1. `import { JsonlLocalAgentStore } from "@cursor/sdk"`
2. 实例化并传入 `local.store`
3. 运行多个 `send()`，检查 jsonl 文件行
4. 进程重启后用同一 store `Agent.resume`

### 配置示例

```javascript
import { JsonlLocalAgentStore } from "@cursor/sdk";

const store = new JsonlLocalAgentStore("./agent-runs.jsonl");
// Agent.create({ local: { store } })
```

### 本地测试结果

- ⚠️ 未实测写入（需 SDK 安装与 API）

---

## 特性六：SDK 嵌套 Subagents

### 是什么

Subagent 可再 spawn Subagent，深度不限；每层独立 prompt/model；无需额外开关，`Task` 工具自动注册 executor。

### 适用场景

Reviewer → Test-writer → Lint-fixer 链式编排；与 ultracode/Claude 动态工作流概念类似但属 Cursor SDK 编程接口。

### 详细使用步骤

1. 在 Agent 定义中配置 subagents 字典
2. 主 prompt 要求 delegate 给 `reviewer` subagent
3. reviewer 的 prompt 允许再 delegate `test-writer`
4. 用 `requestId` 关联日志

### 本地测试结果

- ⚠️ 未实测嵌套深度 >2

---

## 特性七：Canvas Design Mode 与 Context Usage Report

### 是什么（6/4 changelog）

- **Canvas Design Mode**：在 Agent 生成的 Canvas artifact 内直接点选 UI 元素标注修改
- **Context usage report**：Canvas 内可视化 token 分布（system prompt、tools、rules、skills），可点「Debug with Agent」开新会话优化上下文

### Settings 路径

`Settings` → `Cursor Settings` → `Features` → **Canvases**（启用）  
Agent 会话中：`/canvas` 或让 Agent 「create a canvas report」

### 本地测试结果

- ⚠️ 桌面功能未实测

---

## 企业治理速览（6/3 GA）

| 层级 | 作用 |
|------|------|
| Organization | 公司级身份、花费 rollup、IDP |
| Teams | 部门级安全/预算/模型策略 |
| Groups | 跨团队用户 cohort，最宽松策略胜出 |

管理员 SOP：Dashboard → Organization → Create Team → 配置 spend cap → CSV/API 迁移用户

---

## 升级命令

```bash
# SDK
npm install @cursor/sdk
# 或
pip install cursor-sdk

# 桌面：Help → Check for Updates
```

---

## 参考链接

- [Cursor Changelog](https://cursor.com/changelog)
- [虎嗅：Cursor 自研编程模型](https://www.huxiu.com/article/4864434.html)
- [36氪：Codex vs Claude Token 竞争](https://www.36kr.com/p/3681165079539328)（行业交叉）
