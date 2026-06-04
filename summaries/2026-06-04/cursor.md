# Cursor 每日技术札记 — 2026-06-04

**监测源**：https://cursor.com/changelog · https://cursor.com/docs  
**当日版本**：**3.7**（Changelog 标注 **Jun 4, 2026**）  
**前序重要版本**：3.6（5/29 Auto-review）、6/3 Enterprise Organizations GA

---

## 版本总览

6 月 4 日 **Cursor 3.7** 将 **Design Mode** 与 **上下文用量报告** 从浏览器/Agents Window **下沉到 Canvas（可交互制品）**，并强化 Canvas 分享与按钮触发 Prompt。对企业用户，6 月 3 日发布的 **Organization / Teams / Groups** 多租户治理已 GA，与今日 Canvas 能力形成「可视化协作 + 配额治理」组合。

**社区交叉**：  
- 官方：https://cursor.com/changelog/canvas-improvements  
- 论坛预告：https://forum.cursor.com/t/design-mode-for-canvases/158254（kevinn，2026-05-26 内测说明）  
- 第三方解读：https://pasqualepillitteri.it/en/news/3794/cursor-design-mode-what-it-is-how-it-works-cursor-3  

---

## 特性一：Canvas 内的 Design Mode（可视化标注驱动改 UI）

### 是什么（机制说明）

**Design Mode** 允许在 Agent 生成的 **Canvas**（仪表盘、报告、内部工具等交互制品）中，像浏览器里一样 **点选 UI 元素并标注**，把视觉上下文直接喂给 Agent，而不是用自然语言描述「左上角第二个按钮」。机制与 3.0（2026-04-02）Agents Window 浏览器 Design Mode 同源，3.7 将其扩展到 **Canvas 渲染面**。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| Agent 生成的 React/HTML 仪表盘微调 | 纯后端仓库无 UI 制品 |
| 设计/产品参与评审 Agent 产出 | 无 Canvas 的旧版 Cursor |
| 需要多轮「指哪改哪」 | 期望直接改本地源码树而不经 Agent |

### 前置条件

- Cursor **3.7+**（检查：**Help → About** 或命令面板 `Cursor: About`）  
- **Pro / Teams / Enterprise**（Canvas 分享能力依计划而异，Design Mode 在 changelog 未单独锁计划，以实际账号为准）  
- 已有一条生成 Canvas 的 Agent 会话（如「做一个销售看板 Canvas」）

### 详细使用步骤

1. 打开 **Cursor**，进入 **Agents Window**（macOS 默认 `Cmd+Shift+A`，以你键位为准）。  
2. 让 Agent 创建 Canvas：「请用 Canvas 做一个包含折线图与筛选器的运营看板。」  
3. Canvas 面板出现后，找到工具栏 **Design Mode** 按钮（与 **Publish** 相邻；3.7 前可能不可见）。  
4. 点击 **Design Mode**，或使用快捷键 **`Cmd+Shift+D`**（Windows/Linux：`Ctrl+Shift+D`）。  
5. 在 Canvas 上 **点击目标组件** 或 **Shift+拖拽框选区域**，输入修改意见（如「把主色改为 #2563eb，字号 +2」）。  
6. 发送后观察 Agent 对制品的增量修改；重复 4–6 直至满意。  
7. 需要分享时，使用 **Publish** 或共享链接（见特性三）。

### 命令与配置示例

交互为主，无 CLI。推荐在项目根增加 Agent 规则提示 Design Mode：

```markdown
# .cursor/rules/ui-canvas.mdc
---
description: Canvas UI iteration
---
When modifying UI in a Canvas, prefer Design Mode selections over vague positional language.
Always preserve accessibility: contrast ratio >= 4.5:1 for text.
```

**推荐 `.cursor/permissions.json` 完整示例**（团队可审阅后按需裁剪）：

```json
{
  "version": 1,
  "permissions": {
    "allow": [
      "Shell(npm run *)",
      "Shell(git status)",
      "Shell(git diff)",
      "Read(**/*)",
      "Write(src/**)",
      "Write(apps/**)",
      "Mcp(*)"
    ],
    "deny": [
      "Shell(curl *)",
      "Shell(rm -rf *)",
      "Read(.env)",
      "Read(**/*secret*)",
      "Write(**/.npmrc)",
      "Write(**/credentials*)"
    ]
  },
  "runMode": "auto-review",
  "agent": {
    "model": "default",
    "autoRunMcp": false
  }
}
```

**Settings 路径（Run Mode，与 3.6 Auto-review 配合）**：

`Cursor Settings` → `Agents` → `Run Mode` → 选择 **Auto-review** / **Ask every time** 等。

### 本地测试结果

Cloud Agent 环境无 Cursor GUI，**未实测 Design Mode 点击** ⚠️。  
Changelog 与论坛 kevinn 回复（2026-05-26）交叉验证功能已对内测用户_ship，6/4 公开 ✅。

### 问题与解决方案

1. **看不到 Design Mode 按钮**  
   - 确认版本 ≥3.7；重启 Cursor；Canvas 需为交互制品而非纯 Markdown  

2. **快捷键无反应**  
   - 检查是否与系统/IDE 快捷键冲突；在 Keyboard Shortcuts 搜索 `Design Mode`  

3. **标注后 Agent 改错文件**  
   - 在 Prompt 中明确「仅修改 Canvas 内嵌代码，不要改仓库 src 除非我确认」  

### 官方 vs 社区交叉验证

| 来源 | URL | 一致性 |
|------|-----|--------|
| 官方 Changelog 3.7 | https://cursor.com/changelog | — |
| 官方 Canvas 子页 | https://cursor.com/changelog/canvas-improvements | 一致 ✅ |
| 论坛 | https://forum.cursor.com/t/design-mode-for-canvases/158254 | 一致 ✅ |
| 国内 | 36氪 Cursor/Claude 关系讨论（非 Design Mode 专项）| 部分相关 ⚠️ |

### 利弊与分角色建议

- **个人开发者**：显著降低 UI 迭代摩擦；注意 Canvas 代码可能与主仓库不同步。  
- **团队**：Publish + Design Mode 适合评审；需规定「最终以 git 为准」的合并流程。  
- **企业**：结合 6/3 Organizations 做团队级模型与 spend 限制；Design Mode 不替代设计系统审核。

---

## 特性二：Canvas 上下文用量报告（Context Explorer）

### 是什么

Agent 可在 Canvas 中渲染 **交互式上下文用量报告**：分解 **system prompt、tool 定义、rules、skills** 等 token 占用。内置 **「Debug with Agent」** 按钮，可新开对话专门做 **降上下文优化**。

### 前置条件

- Cursor 3.7+  
- 当前会话已消耗可观上下文（否则报告信息量少）

### 详细使用步骤

1. 在长会话中向 Agent 说：「生成一份 context usage report canvas。」  
2. 打开生成的 Canvas，查看各区块占比条形图/表格。  
3. 点击 **Debug with Agent**，在新对话中问：「哪三条 rules 可以合并或删除？」  
4. 按建议精简 `.cursor/rules` 或关闭未用 skills。  
5. 在原任务中 `/reload-skills`（若使用 Claude 侧技能同步）或重启 Cursor Agent 验证 token 下降。

### 命令与配置示例

```text
请用 Canvas 展示本线程的 context breakdown，并标注 Top 5 最大块。
然后点击 Debug with Agent，给出可删除的 rules 列表（只建议，不自动删除）。
```

### 本地测试结果

未实测 GUI ⚠️；官方 changelog 描述与 3.5「Shared canvases」能力链一致 ✅。

### 问题与解决方案

1. **报告数字与账单不一致**  
   - 报告为会话内估算；以 Cursor Dashboard 计费为准  

2. **Debug 按钮开新对话丢失仓库上下文**  
   - 在新对话首条消息粘贴仓库结构与相关 rules 路径  

### 官方 vs 社区

- 官方：https://cursor.com/changelog（Jun 4, 2026）  
- 社区：https://www.meritforgeai.com/ai-coding/cursor-3-interactive-canvases-dashboards-april-2026/（Canvas 概念，非 3.7 专项）  

### 分角色建议

- **个人**：长项目必备，避免「rules 堆叠」导致模型变钝。  
- **团队**：把报告截图纳入 PR 模板，审查谁加了过大 skill。  
- **企业**：与 Organization 级 usage analytics 对照（6/3 GA）。

---

## 特性三：Canvas 改进包（全屏分享 / 嵌入按钮 / 图表与类型修复）

### 是什么

Changelog **Canvas Improvements (4)**：

1. 共享 Canvas 可在浏览器 **全屏** 演示  
2. Agent 可在 Canvas **嵌入按钮**，点击即运行指定 Prompt  
3. 改进 Canvas **TypeScript 类型错误** 自修复能力  
4. 组件样式与 **图表定制** 增强  

### 适用场景

- 对内 demo、对外 Stakeholder 汇报  
- 运维/客服「一键重跑诊断 Prompt」  

### 详细使用步骤（嵌入按钮）

1. 让 Agent：「在 Canvas 底部加两个按钮：『重新拉取数据』『导出 CSV』，分别绑定 Prompt …」  
2. Publish Canvas 并分享链接给同事（Pro/Teams/Enterprise）。  
3. 同事浏览器打开，点击按钮触发 Agent 侧预置 Prompt（只读权限账号需确认策略）。  
4. 全屏：分享页右上角 **Fullscreen**。  
5. 若类型报错，复制错误信息回 Agent：「修复 Canvas 内 TS 类型」。

### 配置示例

```text
在 Canvas 中添加按钮：
- 标签「Run lint」
- 点击后执行 Prompt：「对当前 monorepo 运行 npm run lint 并总结错误」
```

### 问题与解决方案

1. **分享链接同事无法打开**  
   - 检查团队计划与 Dashboard 共享权限  

2. **按钮执行了危险 Shell**  
   - 收紧 `.cursor/permissions.json` 的 `Shell` allow 列表  

---

## 特性四：Enterprise Organizations / Teams / Groups（6 月 3 日 GA，运维必读）

### 是什么

**Organization** 为顶层容器；其下多个 **Team**（部门/区域）可有独立 **安全、治理、预算、功能开关**；**Groups** 跨团队分配模型访问、spend cap、Agent 权限，**多组并存时取最宽松策略（most permissive wins）**。

### 管理员开启 SOP

1. 登录 **Cursor Dashboard**（Enterprise 管理员）。  
2. **Settings → Organization**，确认组织名称与 IdP。  
3. **Organization-level IDP**：配置 SAML/OIDC 单点登录。  
4. 创建 **Team A / Team B**，分别设置 model allowlist 与 monthly budget。  
5. 创建 **Group**（如 `contractors`），限制只能使用较快/便宜模型。  
6. 通过 Dashboard、**API 或 CSV** 迁移用户到正确 Team。  
7. 新用户加入 Team 时 **自动继承** 该 Team 的 settings/permissions。

### 业务/开发者使用 SOP

1. 使用公司 IdP 登录 Cursor。  
2. 若属多 Team，在 Dashboard 查看当前 **默认 Team**（创建新 Team 时的路由）。  
3. 日常在 Agents Window 工作；花费计入所属 Team。  
4. 遇到模型不可用，联系管理员查 Group/Team allowlist。  

### 官方 vs 社区

- 官方：https://cursor.com/changelog（Jun 3, 2026）  
- 国内：虎嗅 2026-06-04 讨论大厂 Token 配额，与 Team 级预算管理方向一致 — https://www.huxiu.com/article/4864328.html  

---

## 特性五：Automations 与多仓库（延续，6 月 2 日前后，与今日联动）

### 是什么

Automations 进入 **Agents Window**；支持 **多 repo** 与 **无 repo** 模板（Slack 摘要、Stripe 收入等）。**新 Automation 7 日内运行费用 50% off**（以 changelog 为准，过期日请查官网）。

### 开发者步骤

1. `Cursor Settings` → `Automations` 或访问 https://cursor.com/automations  
2. 选择模板或新建，附加 1–N 个 GitHub 仓库  
3. 设置 cron：`0 9 * * 1-5`（工作日 9 点）  
4. 在 Agents Window 查看运行历史  

### 与今日关系

Canvas + Automation 可组合：Automation 定时生成 **上下文报告 Canvas** 发到 Slack（需自行写 Prompt）。

---

## Settings 路径速查

| 功能 | 路径 |
|------|------|
| Run Mode / Auto-review | `Cursor Settings` → `Agents` → `Run Mode` |
| Permissions | 项目 `.cursor/permissions.json` + Dashboard 企业策略 |
| Organization | `Cursor Dashboard` → `Organization` / `Teams` |
| Design Mode 快捷键 | `Cmd+Shift+D` / `Ctrl+Shift+D` |
| Agents Window | `Cmd+Shift+A`（默认，可改键） |

---

## 本地实测

| 项 | 结果 |
|----|------|
| Cursor GUI Design Mode | 未测（无桌面环境）⚠️ |
| Changelog 抓取 | 3.7 条目完整 ✅ |
| permissions.json 示例 | 语法自检 ✅ |

---

## 参考

- https://cursor.com/changelog  
- https://cursor.com/changelog/canvas-improvements  
- https://forum.cursor.com/t/design-mode-for-canvases/158254  
- https://www.huxiu.com/article/4864328.html  
