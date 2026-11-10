# en-zh-translation-polish 安装指南

[GitHub 仓库](https://github.com/HoraceLuBFA/en-zh-translation-polish) · [官网详情页](https://www.lumenghe.com/skills/en-zh-translation-polish/)

## 从 GitHub 安装

1. **检查依赖。** 支持 Agent Skills 的宿主；标点处理使用 Python 3。
2. **检查已有安装。** 核对 `~/.agents/skills/en-zh-translation-polish/` 及宿主同名入口，包括目录、文件、符号链接和失效链接。更新前保留现有版本与本地修改。首次安装使用 README 中的 GitHub 安装命令；已有 Git 工作区先审阅差异，再合并更新。

## 使用官网 ZIP

3. **选定并校验安装包。** [发布元数据](https://www.lumenghe.com/skills/en-zh-translation-polish/release.json)列出来源提交、ZIP 地址与 SHA-256。下载到临时目录，核对摘要并检查成员路径：单一 `en-zh-translation-polish/` 根目录、目录内的相对路径、安全的链接目标。摘要或路径校验失败时停止安装。
4. **放置完整技能。** 将 `SKILL.md`、README、安装指南、许可证、脚本与参考文件一并解压到 `~/.agents/skills/en-zh-translation-polish/`，保留目录结构和执行权限。已有安装按审阅后的方案合并或替换，并保留备份。

## 配置与验证

5. **配置宿主入口。** Codex 使用共享目录 `~/.agents/skills/`；Claude Code 使用 `~/.claude/skills/`，检查同名入口后，在空闲路径建立指向共享技能的符号链接。其他 Agent 按当前宿主文档配置。操作范围限于本技能与对应发现入口，交互式认证由用户完成。
6. **验证并报告。** 检查 `SKILL.md`、配套文件与依赖，在宿主技能列表或新会话中确认发现结果。需要行为验证时使用临时样例。报告安装路径、来源提交、依赖及发现结果、实际检查项目与保留的备份。

[官网纯文本指南](https://www.lumenghe.com/skills/en-zh-translation-polish/install.txt)另附当前安装包的下载链接与校验值。
