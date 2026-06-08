# Cursor 每日资讯 — 2026-06-08

> **DayAI 项目** | 检索窗口：2026-06-07 22:00 UTC 至 2026-06-08 22:01 UTC  
> **官方 Changelog**：https://cursor.com/changelog  
> **本地实测目录**：`/workspace/tools`（云 VM，无 Cursor Desktop GUI）

---

## 今日一句话结论

2026 年 6 月初 Cursor 在两条战线上同时推进：**Design Mode 浏览器**（6/5，v3.7）补齐多选元素与常驻语音输入，把「指哪改哪」从单点标注升级为关系型 UI 编辑；**Cursor SDK**（6/4）则让无头 Agent 具备自定义工具、Auto-review 分类器、JSONL 可审计存储与无限嵌套 Subagent，更适合 CI、脚本与企业集成。对 DayAI 团队而言，前端/设计同学可优先体验 Design Mode；平台与 DevOps 同学应评估 SDK 升级路径与 `permissions.json` 治理策略。

---

## 1. Design Mode 浏览器 — 多选元素（2026-06-05）

### 是什么

Cursor 3.7 在**内置浏览器**的 Design Mode 叠加层中新增**多元素同时选中**能力。用户可在页面上连续点击两个及以上 DOM 元素，Agent 会同时获取各元素的源码、周边布局与彼此之间的视觉关系，而非仅理解单个节点。

官方表述：适用于「让 A 组件样式匹配 B」「删除重复内容」「批量调整一组组件」等**跨元素关系型**修改场景。详见 [Design Mode Improvements](https://cursor.com/changelog/design-mode-improvements) 与 [Design Mode 博客](https://cursor.com/blog/design-mode)。

### 适用场景

| 场景 | 示例指令 |
|------|----------|
| 样式对齐 | 「让左侧卡片标题字号与右侧 Hero 区一致」 |
| 去重/合并 | 「这两个列表项内容重复，合并为一项」 |
| 批量布局 | 「把这排三个按钮统一改成 outline 风格并等宽」 |
| 组件关系推理 | 「参考导航栏的下拉菜单，给侧边栏加同样交互」 |

### 前置条件

- Cursor Desktop **≥ 3.7**（2026-06-05 发布）
- 项目能在 Cursor **内置浏览器**中预览（本地 dev server 或静态预览）
- 已打开 **Agents 窗口**并进入 Design Mode（社区文档常见快捷键：`Cmd+Shift+D` / `Ctrl+Shift+D` 激活叠加层；`Shift+拖拽` 可框选区域）
- 目标元素在 DOM 中可被唯一识别（Shadow DOM 过深或 canvas 渲染区域可能选不中）

### 详细使用步骤

1. 在 Cursor 中启动前端 dev server（如 `npm run dev`），于 Agents 窗口打开**内置浏览器**并加载页面。
2. 进入 Design Mode 叠加层，单击第一个目标元素（高亮确认选中）。
3. 按住 **Shift**（或按界面提示）继续点击第二、第三个元素，直至选区包含所有相关节点。
4. 在 Agent 输入框用自然语言描述**关系型**意图，例如：「让选中的两个按钮样式与第三个主按钮一致」。
5. Agent 运行期间可继续点选或配合绘图标注；修改完成后在浏览器中刷新验证，必要时用 `Cmd+L` 将选中元素注入对话继续迭代。

### 命令与配置完整示例

Design Mode 为 GUI 能力，无独立 CLI 开关。推荐在项目根目录用脚本保证浏览器可访问：

```json
// package.json 片段
{
  "scripts": {
    "dev": "vite --host 127.0.0.1 --port 5173",
    "preview:cursor": "vite preview --host 127.0.0.1 --port 4173"
  }
}
```

```bash
# 终端 1：启动预览
cd /path/to/your-frontend
npm run dev

# 终端 2：可选 — 记录 Design Mode 相关 Agent 规则
# .cursor/rules/design-mode.mdc 中写明「多选时优先保持 design token 一致」
```

### 本地测试结果

| 项目 | 结果 |
|------|------|
| Cursor Desktop GUI / 内置浏览器 | ❌ 云 VM 无桌面环境，**无法实测**多选与高亮交互 |
| 官方 Changelog 条目 | ✅ 已核对 [design-mode-improvements](https://cursor.com/changelog/design-mode-improvements) |
| 社区快捷键文档 | ⚠️ `Cmd+Shift+D` 等来自第三方教程，以本机 Cursor 快捷键面板为准 |

### 常见问题（≥2）

1. **多选后 Agent 只改了其中一个元素？**  
   检查是否在 Agent **开始执行前**已完成全部点选；执行中途追加选区有时不会回溯到已发出的上下文。建议先选齐再发送，或在新一轮对话中重新多选。

2. **动态列表/虚拟滚动里选不中目标行？**  
   未挂载到 DOM 的节点无法被 Design Mode 捕获。先滚动到可视区域，或暂停虚拟列表再选；极端情况下退回文本描述 + 文件路径指代。

3. **与 Figma/设计稿不一致？**  
   多选提供的是**实现层**关系，不是设计 token 源。复杂设计系统场景应结合 Code Connect 或变量文档，避免 Agent 仅做视觉近似。

### 官方 vs 社区

| 维度 | 官方（Changelog / Blog） | 社区（BuildFastWithAI、Developer Toolkit 等） |
|------|--------------------------|-----------------------------------------------|
| 能力描述 | 多选 + 代码/布局/视觉关系 | 补充快捷键、版本号 3.7、与语音组合用法 |
| 可靠性 | 以 Cursor 发布为准 | 快捷键因 OS/版本可能漂移 |
| 深度 | 偏产品叙事 | 偏实操教程与截图 |

### 利弊与角色建议

- **利**：降低「用文字描述哪个 div」的认知负担；关系型 UI 任务一次上下文更完整。  
- **弊**：依赖内置浏览器与 Desktop；复杂 SPA/Canvas 覆盖率低；多选误点会增加 token 消耗。  
- **建议**：**前端/全栈**日常迭代首选；**设计**同学做走查与标注；**后端**同学仅在联调 UI 时偶尔使用。

---

## 2. Design Mode 浏览器 — 语音输入（2026-06-05）

### 是什么

同一 3.7 更新在 Design Mode 叠加层加入**常驻麦克风**：用户可用语音叙述修改意图，且**麦克风在 Agent 执行过程中保持可用**，无需等上一轮结束即可**排队**下一条语音指令。可与点选、绘图标注组合使用。

### 适用场景

- 双手占用（真机对照、握鼠标点选）时口述「把间距加大 8px」
- 快速连续迭代：Agent 改 A 的同时口述 B、C 的后续修改
- 非英语母语开发者用中文口述细节，减少打字摩擦
- 与设计/产品同事结对时，口头描述 + 屏幕点选同步进行

### 前置条件

- Cursor Desktop ≥ 3.7，Design Mode 已开启
- 操作系统已授权 **麦克风**权限给 Cursor
- 稳定网络（语音转写通常走云端 ASR，离线不可用）
- 安静环境或耳机麦克风，避免误触发

### 详细使用步骤

1. 打开内置浏览器与 Design Mode，确认叠加层右下角/侧边出现**麦克风**图标。
2. 点击麦克风开始录音，口述修改，例如：「把选中按钮的圆角改成 12 像素，颜色用品牌主色」。
3. 停止录音后，转写文本进入 Agent 输入队列；可同时点选元素补充空间上下文。
4. **在 Agent 仍在运行时**，再次点击麦克风口述下一条，形成修改队列而无需等待。
5. 结合绘图：先 Shift 框选区域，再语音说明「仅在这个区域内增加阴影」。

### 命令与配置完整示例

```bash
# macOS：确认麦克风权限
# 系统设置 > 隐私与安全性 > 麦克风 > 勾选 Cursor

# Windows：设置 > 隐私 > 麦克风 > 允许桌面应用访问

# 项目侧：可在 .cursor/rules 中约定语音转写后的术语
# 例：「主色 = --color-primary，间距单位默认 px」
```

```markdown
<!-- .cursor/rules/voice-ui.mdc 示例 -->
- 用户通过 Design Mode 语音描述时，优先读取已选中元素的 React 组件名
- 颜色修改必须引用 tailwind.config 或 CSS 变量，禁止硬编码随意色值
```

### 本地测试结果

| 项目 | 结果 |
|------|------|
| 语音输入 / 排队 | ❌ 云 VM 无 Cursor Desktop，未实测 |
| 官方说明 | ✅ [changelog/design-mode-improvements](https://cursor.com/changelog/design-mode-improvements) 明确「mid-run 可排队」 |

### 常见问题（≥2）

1. **语音转写偏差大（专业术语、组件库名）？**  
   在规则文件或对话首条消息中固定词汇表；转写后人工快速编辑再发送，比重复录音更省时间。

2. **Agent 运行中排队语音，执行顺序混乱？**  
   排队不等于严格 FIFO 与当前 diff 同步。关键依赖关系（先改布局再改颜色）建议等上一条 **Finished** 再发，或拆成独立 Agent 会话。

3. **开放式办公隐私问题？**  
   语音会经过转写与上传。敏感代码名、客户数据避免口述；可用耳机 + 低声或退回文字输入。

### 官方 vs 社区

- **官方**：强调与点选、绘图组合的「编辑循环」体验，未公布 ASR 供应商与语言列表。  
- **社区**：多提到「always-on mic」「Cursor 3.7」时间线；部分教程混用第三方语音插件，与内置能力需区分。

### 利弊与角色建议

- **利**：迭代速度上限显著提高；适合视觉任务口述细节。  
- **弊**：转写错误、隐私与嘈杂环境；对中文技术术语支持因地区而异。  
- **建议**：**产品/设计**走查与**前端**快速调样式优先；**安全敏感仓库**默认关闭或仅用文字；**开源维护者**在公开场所慎用。

---

## 3. SDK Custom Tools via `local.customTools`（2026-06-04）

### 是什么

TypeScript / Python Cursor SDK 允许在 `Agent.create()` 或单次 `send()` 时通过 `local.customTools` 传入**进程内函数定义**。SDK 将其暴露为内置 MCP 服务器 `custom-user-tools`，模型与调用路径、权限门控与普通 MCP 工具一致。父 Agent 定义的 custom tools 对**所有 Subagent 可见**。

此前需自建 stdio/HTTP MCP 服务并接线；现在「一个函数定义即可」。

### 适用场景

- CI 脚本调用内部 API（工单系统、特征开关、部署状态）
- 读取仅在内网可用的数据库/缓存快照（只读封装）
- 把企业合规检查封装为工具，供 Agent 在改代码前自动调用
- 快速原型：不必为单个脚本上架完整 MCP Server

### 前置条件

- `npm install @cursor/sdk` 或 `pip install cursor-sdk` 升级至含 6/4 特性的版本
- **Local Agent** 路径（`local.customTools` 不支持 Cloud Agent）
- Node.js ≥ 18（TypeScript SDK）
- 函数 `execute` 需幂等、可序列化返回值（`string | JSON | content[]`）

### 详细使用步骤

1. 升级 SDK（见文末升级说明）。
2. 定义 `SDKCustomTool`：`description`、`inputSchema`（JSON Schema 形状）、`execute(args, context)`。
3. 在 `Agent.create({ local: { customTools: { toolName: def } } })` 注册，或在 `agent.send(msg, { local: { customTools: {...} } })` 按次覆盖。
4. 在 prompt 中明确告知 Agent 工具名与用途，避免模型幻觉调用。
5. 结合 `local.autoReview: true`（下一节）对危险工具调用走分类器审核。

### 命令与配置完整示例

**TypeScript**

```typescript
import { Agent, Cursor } from "@cursor/sdk";

const fetchFeatureFlag: SDKCustomTool = {
  description: "查询 DayAI 功能开关当前值",
  inputSchema: {
    type: "object",
    properties: { flagKey: { type: "string" } },
    required: ["flagKey"],
  },
  async execute(args) {
    const key = String(args.flagKey);
    // 调用你们的内部 HTTP API
    const res = await fetch(`https://internal.dayai/api/flags/${key}`);
    return { enabled: (await res.json()).enabled };
  },
};

const agent = await Agent.create({
  model: { id: "composer-2.5" },
  local: {
    cwd: "/workspace/dayai",
    customTools: { fetch_feature_flag: fetchFeatureFlag },
  },
});

const run = await agent.send(
  "改登录页前先用 fetch_feature_flag 查 new_login_ui 是否开启"
);
await run.wait();
console.log(run.result);
```

**Python（概念对齐，以官方 Python 文档为准）**

```python
from cursor_sdk import Agent

# Python SDK 通过 bridge 暴露同等 local 选项；customTools 形状与 TS 对齐
agent = Agent.create(
    model={"id": "composer-2.5"},
    local={
        "cwd": "/workspace/dayai",
        "customTools": {
            "fetch_feature_flag": {
                "description": "查询功能开关",
                "inputSchema": {"type": "object", "properties": {"flagKey": {"type": "string"}}},
                "execute": lambda args, ctx: {"enabled": True},
            }
        },
    },
)
```

### 本地测试结果

```bash
cd /workspace/tools && npm install @cursor/sdk 2>&1
# added 131 packages — @cursor/sdk ^1.0.18 安装成功
# 存在 10 个 npm audit 漏洞（2 low, 1 moderate, 7 high），需团队评估是否 audit fix

node --input-type=module -e "import { JsonlLocalAgentStore } from '@cursor/sdk'; console.log('ok')"
# 可正常解析 ESM 导出；未配置 Cursor API Key / 本地 Agent 运行时，未执行完整 send()
```

| 项目 | 结果 |
|------|------|
| `npm install @cursor/sdk` | ✅ v1.0.18 |
| 类型导出 `SDKCustomTool` | ✅ `dist/esm/options.d.ts` 已确认 |
| 端到端 `Agent.create` + customTools 调用 | ⚠️ 无本地 Cursor Agent 后端，未跑通 |

### 常见问题（≥2）

1. **模型不调用我的 custom tool？**  
   检查 `description` 是否清晰、`inputSchema` 是否合法 JSON Schema；在 user message 中显式要求「必须先调用 xxx 工具」。

2. **Subagent 看不到工具？**  
   官方称父级 `customTools` 自动继承；若按 `send` 级覆盖为空对象，可能清空当次工具集。避免无意覆盖。

3. **与自建 MCP Server 重复？**  
   简单函数用 `customTools`；需跨进程、多语言或远程团队共享时用标准 MCP。两者可并存，注意权限门控一致。

### 官方 vs 社区

- **官方**：[sdk-updates-jun-2026](https://cursor.com/changelog/sdk-updates-jun-2026) 明确 `custom-user-tools` MCP 路径与 Subagent 可见性。  
- **社区**：早期示例仍大量展示 stdio MCP；迁移时需改写为 `local.customTools` 以减少进程数。

### 利弊与角色建议

- **利**：集成成本骤降；适合 DayAI 内部 API 薄封装。  
- **弊**：工具跑在 Agent 进程内，崩溃会影响会话；无内置远程隔离。  
- **建议**：**平台工程师**主责封装与审计；**应用开发**提需求；**安全**评审 `execute` 副作用与数据出境。

---

## 4. SDK Auto-review with `permissions.json`（2026-06-04）

### 是什么

默认情况下，**本地 SDK Agent** 在无人工介入时会**自动执行**工具调用。设置 `local.autoReview: true` 后，调用改道 **Auto-review 分类器**：由 LLM 子 Agent 判断自动放行、换路或挂起待审。桌面端同一分类器对应 **Run Mode = Auto-review**。

分类器行为可通过 `permissions.json` 中的自然语言 **`autoRun.allow_instructions`** / **`autoRun.block_instructions`**  steer（引导，非硬拦截）。

**桌面端开启路径**：`Settings > Cursor Settings > Agents > Run Mode` → 选择 **Auto-review**。

### 适用场景

- 无头 CI 中希望「只读检查自动跑、删除/部署人工批」
- 本地脚本 `agent -p` 长时间跑重构，减少全手动点批准
- 企业统一「允许读 `./dist`、禁止 `rm -rf`」策略
- SDK 与 IDE 共用同一套 `permissions.json` 治理口径

### 前置条件

- Cursor **≥ 3.6** 引入 Auto-review Run Mode；SDK 6/4 起支持 `local.autoReview`
- 后端账号需启用 **Auto-review classifier** 特性（SDK 文档：connected backend 需有该 feature）
- 仓库或用户目录存在 `permissions.json`（见完整示例）
- `autoRun` **仅在 Run Mode = Auto-review 时生效**（Allowlist / Run Everything 下行为不同）

### 详细使用步骤

1. **桌面端**：`Settings > Cursor Settings > Agents > Run Mode` → **Auto-review**。
2. 在仓库创建 `.cursor/permissions.json`（可与 `~/.cursor/permissions.json` 合并生效）。
3. 填写 `autoRun.allow_instructions` 与 `block_instructions`（自然语言句子数组）。
4. SDK 侧：`Agent.create({ local: { autoReview: true, cwd: "..." } })`。
5. 观察运行：只读类应快速通过；匹配 `block_instructions` 的调用应挂起或转人工（视分类器判定）。

### 命令与配置完整示例

**`.cursor/permissions.json`（完整示例，含 allow/block + 可选 allowlist）**

```json
{
  "terminalAllowlist": [
    "npm test",
    "npm run lint",
    "pnpm test",
    "python -m pytest",
    "git status",
    "git diff"
  ],
  "mcpAllowlist": [
    "custom-user-tools:fetch_feature_flag"
  ],
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections of build artifacts under ./dist are fine.",
      "Allow read-only shell commands that inspect files, directories, git state, logs, or process status without modifying files.",
      "Allow read-only MCP and WebFetch calls that retrieve data without creating, updating, deleting, or deploying anything.",
      "Running unit tests and linters inside the current repository is acceptable."
    ],
    "block_instructions": [
      "Always pause delete operations so I get a chance to review them.",
      "Block any command that uses rm -rf, shred, or recursively deletes directories.",
      "Block commands that modify files outside the current project directory.",
      "Block npm publish, docker push, kubectl apply, and any deployment or production mutation.",
      "Block all npx commands unless explicitly allowlisted.",
      "Block MCP tools that send data to external URLs not on the corporate allowlist."
    ]
  }
}
```

**TypeScript SDK**

```typescript
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  model: { id: "composer-2.5" },
  local: {
    cwd: "/workspace/dayai",
    autoReview: true,
    settingSources: ["project", "user"],
  },
});

const run = await agent.send("分析 dist 目录体积并列出可安全删除的缓存");
await run.wait();
```

**注意**：当 `permissions.json` 定义了 `terminalAllowlist` / `mcpAllowlist` 时，会**覆盖** IDE 内对应 allowlist 编辑器（只读）。用户级与仓库级文件**数组合并**后生效。详见 [permissions.json Reference](https://cursor.com/docs/reference/permissions)。

### 本地测试结果

| 项目 | 结果 |
|------|------|
| `local.autoReview` 类型定义 | ✅ `@cursor/sdk` v1.0.18 `LocalAgentOptions.autoReview?: boolean` |
| 分类器实际判定 | ❌ 无 Desktop + 无 API 完整链路，未实测挂起/放行 |
| 文档一致性 | ✅ 与 [sdk-updates-jun-2026](https://cursor.com/changelog/sdk-updates-jun-2026) 示例一致 |

### 常见问题（≥2）

1. **`autoRun` 写了但没效果？**  
   确认 Run Mode 是否为 **Auto-review**；在 Allowlist 模式下 `autoRun` 不被咨询。SDK 还需 `local.autoReview: true`。

2. **分类器仍放行了 block 里描述的操作？**  
   官方明确 `allow_instructions` / `block_instructions` 是 **steering 非 enforcement**；关键操作应配合 `terminalAllowlist` 硬名单或人工 Review。

3. **CLI `agent -p` 与 IDE 行为不一致？**  
   社区反馈 CLI 长期仅有 `allowlist` / `unrestricted` approvalMode；SDK `local.autoReview` 旨在补齐无头场景。部署时需在目标环境分别验证。

### 官方 vs 社区

- **官方**：[Auto-review Run Mode changelog](https://cursor.com/changelog/auto-review) + SDK 6/4 文档；强调 allowlist → sandbox → classifier 三级。  
- **社区**：[Forum #161922](https://forum.cursor.com/t/auto-review-run-mode/161922) 提供更长 `allow_instructions` 模板；呼吁 CLI `approvalMode: auto-review` 与 IDE parity。

### 利弊与角色建议

- **利**：长时 Agent 吞吐量提升；策略即代码（`permissions.json` 可 PR 评审）。  
- **弊**：分类器非确定性；自然语言策略有歧义；过度信任可能导致误放行。  
- **建议**：**DevOps/SRE** 维护 `permissions.json`；**开发**在 feature 分支启用；**安全**定期 red-team 常见越权命令。

---

## 5. SDK JSONL and Custom Stores（2026-06-04）

### 是什么

SDK 持久化 Agent / Run 元数据以支持进程重启后 `resume`。此前默认 **SQLite**；现可改用 **JSONL**（追加式纯文本，可 diff、可入库）。导出 `SqliteLocalAgentStore`、`JsonlLocalAgentStore`；亦可实现 `LocalAgentStore` 接口自定义后端（内存、Postgres 等）。Python SDK 通过 bridge 暴露 host / JSONL / composed JSONL stores。

JSONL 目录典型文件：`agents.ndjson`、`runs.ndjson`、`run_events.ndjson`、`checkpoints.ndjson`。

### 适用场景

- CI 工件.attach JSONL 日志供事后审计
- Git 友好：将 run 元数据纳入版本管理（需注意体积与秘密信息）
- 与 DayAI 现有 Postgres 运维栈统一存储 Agent 状态
-  ephemeral CI job 使用内存 store，零残留

### 前置条件

- `@cursor/sdk` / `cursor-sdk` 6/4+
- 对 JSONL 写路径有文件系统写权限
- 高并发大量 agent 时：官方提示 JSONL 删除/更新会重写整文件，**不适合超大目录**

### 详细使用步骤

1. 选择存储后端：默认 SQLite、`new JsonlLocalAgentStore(rootDir)` 或自定义 `LocalAgentStore`。
2. 全局配置：`Cursor.configure({ local: { store } })` 或在 `Agent.create({ local: { store } })` 传入。
3. `Agent.create` / `Agent.resume` / `list` API 使用**同一 store 实例**。
4. JSONL 模式下定期归档或轮转 `*.ndjson`，避免单文件过大。
5. 读取 `requestId`（6/4 起每次 `send()` 生成）关联后端日志与 JSONL 行。

### 命令与配置完整示例

```typescript
import {
  Agent,
  Cursor,
  JsonlLocalAgentStore,
  SqliteLocalAgentStore,
} from "@cursor/sdk";
import path from "node:path";

const storeRoot = path.join("/workspace/dayai", ".cursor-agent-store");

// 方案 A：JSONL — 可 diff、可提交（勿提交含密钥的 ndjson）
const jsonlStore = new JsonlLocalAgentStore(storeRoot);
Cursor.configure({ local: { store: jsonlStore } });

// 方案 B：仍用 SQLite（默认，单机性能更好）
// const sqliteStore = await SqliteLocalAgentStore.open(storeRoot);

const agent = await Agent.create({
  model: { id: "composer-2.5" },
  local: { cwd: "/workspace/dayai" },
});

const run = await agent.send("运行测试并总结失败用例");
await run.wait();
console.log("requestId:", run.requestId); // 6/4+ 关联 ID
```

```bash
# 查看 JSONL 产物
ls -la /workspace/dayai/.cursor-agent-store/
# agents.ndjson  runs.ndjson  run_events.ndjson  checkpoints.ndjson

# 审计最近一次 run
tail -n 3 /workspace/dayai/.cursor-agent-store/runs.ndjson | jq .
```

### 本地测试结果

```bash
cd /workspace/tools
node --input-type=module -e "
  import { JsonlLocalAgentStore, SqliteLocalAgentStore } from '@cursor/sdk';
  console.log('JsonlLocalAgentStore', typeof JsonlLocalAgentStore);
  console.log('SqliteLocalAgentStore', typeof SqliteLocalAgentStore);
"
# JsonlLocalAgentStore function
# SqliteLocalAgentStore function
```

| 项目 | 结果 |
|------|------|
| JSONL Store 类导出 | ✅ |
| 实际写入 ndjson | ⚠️ 未跑 Agent 会话，无样例文件 |

### 常见问题（≥2）

1. **resume 找不到 agent？**  
   `Agent.resume` 与 `create` 必须使用相同 `store` 与 `cwd`；Python 6/4 修复了 `list_runs(cwd)` 工作区范围问题，升级前注意 [changelog](https://cursor.com/changelog/sdk-updates-jun-2026) 说明。

2. **JSONL 文件暴涨？**  
   checkpoint 行可能很大；生产环境应设 retention 或继续用 SQLite/Blob 外置存储。

3. **多进程并发写 JSONL？**  
   SDK 对写操作有进程级串行化；多机并发写同一 NFS 目录仍可能损坏，需外部队列或数据库 store。

### 官方 vs 社区

- **官方**：明确四文件名与 `LocalAgentStore` 扩展点。  
- **社区**：少量 Postgres 适配示例，非官方维护，接入需自测迁移脚本。

### 利弊与角色建议

- **利**：可观测性、审计与 GitOps 友好；`requestId` 打通支持工单。  
- **弊**：大规模性能弱于 SQLite；checkpoint 体积难控。  
- **建议**：**平台**选存储策略；**合规**倾向 JSONL 审计；**高频自动化**保留 SQLite 或 Postgres。

---

## 6. SDK Nested Subagents（2026-06-04）

### 是什么

Subagent 现可**无限深度嵌套**：Reviewer → Test-writer → 更细分子任务，每层可独立 `prompt` 与 `model`。无需额外开关：Subagent 会话注册执行 `Task` 所需的 executor，定义了 `agents` 的 Agent 自动获得嵌套能力。

### 适用场景

- 代码审查 Agent 委派测试生成，再委派「只改测试文件」子 Agent
- 大型迁移：Planner Subagent 拆模块，每模块 Specialist Subagent 实施
- 模型分级：父 Agent 用强模型规划，子 Agent 用 fast 模型批量改单测
- DayAI 多仓库编排：顶层协调 monorepo 包边界

### 前置条件

- SDK 6/4+（嵌套为运行时自动注册能力）
- 在 `Agent.create({ agents: { name: AgentDefinition } })` 中声明 Subagent
- Subagent **继承父级 MCP 配置**；不支持在 Subagent 上内联独立 `McpServerConfig` 对象（SDK 会 reject）
- 父级 `local.customTools` 对嵌套子树可见

### 详细使用步骤

1. 规划 Subagent 树：名称、`description`（供父 Agent 选择）、`prompt`、`model`（或 `"inherit"`）。
2. `Agent.create({ agents: { reviewer: {...}, testWriter: {...} } })`。
3. 父 Agent prompt 中说明何时 `Task` 委派给哪个 Subagent。
4. 运行中观察嵌套 Subagent 各自 checkpoint；利用 JSONL/SQLite store 追踪多层 `runId`。
5. 控制深度与预算：每层独立 token 消耗，过深树易爆炸。

### 命令与配置完整示例

```typescript
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  model: { id: "composer-2.5" },
  local: { cwd: "/workspace/dayai" },
  agents: {
    reviewer: {
      description: "审查 PR 质量、安全与测试覆盖",
      prompt: "你是严格代码审查员。发现问题则委派 test-writer 补测试。",
      model: { id: "composer-2.5" },
    },
    testWriter: {
      description: "编写与修复单元测试，不改生产代码",
      prompt: "仅修改 __tests__ 与 *.test.ts。需要更细拆分时再 Task 给 impl-helper。",
      model: { id: "composer-2.5-fast" },
    },
    implHelper: {
      description: "单文件小范围实现助手",
      prompt: "每次只处理一个文件，保持 diff 最小。",
      model: "inherit",
    },
  },
});

const run = await agent.send(
  "审查 src/auth/login.ts 的最近改动，缺测试则嵌套委派补齐"
);
await run.wait();
```

```bash
# 监控嵌套 run（配合 JSONL store）
rg '"agentId"' /workspace/dayai/.cursor-agent-store/runs.ndjson | tail -5
```

### 本地测试结果

| 项目 | 结果 |
|------|------|
| `AgentOptions.agents` 类型 | ✅ `Record<string, AgentDefinition>` |
| 嵌套 Task 执行 | ❌ 无完整 Agent 后端，未实测多层委派 |
| 官方说明 | ✅ 「nothing to turn on」— [sdk-updates-jun-2026](https://cursor.com/changelog/sdk-updates-jun-2026) |

### 常见问题（≥2）

1. **Subagent 循环委派停不下来？**  
   在父 prompt 明确最大委派深度与停止条件；结合 `autoReview` 阻断危险 shell。

2. **子 Agent 用了错误模型？**  
   检查 `model: "inherit"` 与显式 `{ id }`；`composer-2` 已自动路由至 `composer-2.5`（6/4 兼容）。

3. **上下文碎片化？**  
   深层 Subagent 不自动共享全部对话；关键约束应在 Subagent `prompt` 中重复或用 `customTools` 读共享状态。

### 官方 vs 社区

- **官方**：强调自动注册 executor、每层独立 prompt/model。  
- **社区**：多 Agent 编排模式（LangGraph 等）与 Cursor 原生 `Task` 嵌套对比讨论尚少，最佳实践仍在形成。

### 利弊与角色建议

- **利**：复杂任务分解原生化，无需外部编排框架即可原型。  
- **弊**：成本难估、调试链长、错误传播跨层。  
- **建议**：**Tech Lead** 设计 Subagent 树；**日常开发**保持 2–3 层以内；**成本管控**对 deep nest 设 token 上限。

---

## SDK 升级说明（npm / pip）

官方升级命令（[sdk-updates-jun-2026](https://cursor.com/changelog/sdk-updates-jun-2026)）：

```bash
# TypeScript / Node
npm install @cursor/sdk@latest
# 或项目内
cd /workspace/tools && npm install @cursor/sdk 2>&1

# Python
pip install -U cursor-sdk
# 官方 changelog 提及 0.1.6 文档与 analytics 标签；本环境实测安装 0.1.7
```

**升级注意项**

| 项 | 说明 |
|----|------|
| `composer-2` | 自动路由至 **Composer 2.5**，旧脚本无需改 slug 即可继续跑 |
| `requestId` | 每次 `send()` 新增，可安全加入 run 元数据 schema |
| 导入性能 | `@cursor/sdk` 懒加载本地栈，纯 Cloud/类型引用更快 |
| Python `list_runs(cwd)` | 0.1.6+ 修复工作区范围；subprocess bridge 场景务必传 `cwd` |
| 破坏性 | 6/4 以 additive 为主；自定义 store 需自行迁移 SQLite → JSONL |

### 本地 SDK 安装实测汇总

```bash
cd /workspace/tools && npm install @cursor/sdk 2>&1
# ✅ 成功 — package.json 记录 "@cursor/sdk": "^1.0.18"
# ⚠️ npm audit：10 vulnerabilities（含 7 high），生产镜像需评估
# ⚠️ 无 cursor-sdk CLI 二进制；通过 import '@cursor/sdk' 使用

pip install cursor-sdk
# ✅ Successfully installed cursor-sdk-0.1.7
# ⚠️ cursor-sdk-bridge 安装在 ~/.local/bin，默认不在 PATH
```

**Cursor Desktop**：本云 VM **未安装** Cursor IDE，Design Mode、Run Mode 设置界面、Auto-review 交互式批准均**无法本地演示**；以上 SDK 测试仅覆盖包安装与类型导出。

---

## DayAI 行动建议（优先级）

1. **本周**：前端同学在 Desktop 3.7+ 试用 Design Mode 多选 + 语音，收集术语转写词表写入 `.cursor/rules`。  
2. **下周**：平台组升级 `@cursor/sdk` / `cursor-sdk`，在 staging 用 `local.customTools` 对接内部 feature flag API。  
3. **合规**：将 `.cursor/permissions.json` 纳入代码评审，桌面 Run Mode 与 SDK `local.autoReview` 策略对齐。  
4. **观测**：选型 JSONL store 输出至 CI artifact，用 `requestId` 关联支持日志。

---

## 参考链接

| 资源 | URL |
|------|-----|
| 官方 Changelog 总览 | https://cursor.com/changelog |
| Design Mode 3.7（2026-06-05） | https://cursor.com/changelog/design-mode-improvements |
| SDK 更新（2026-06-04） | https://cursor.com/changelog/sdk-updates-jun-2026 |
| Auto-review Run Mode | https://cursor.com/changelog/auto-review |
| permissions.json 参考 | https://cursor.com/docs/reference/permissions |
| TypeScript SDK 文档 | https://cursor.com/docs/api/sdk/typescript |
| Design Mode 博客 | https://cursor.com/blog/design-mode |

---

*文档生成：DayAI 自动化资讯流水线 · 2026-06-08*
