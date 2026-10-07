# Changelog

## [1.1.1] - 2026-10-07

### Changed / 变更

- 明确所有档位均以忠实性为前提；归化与“脱壳”只调整表达，混合文本按段落或信息功能判断。
- 准确性质检采用原文覆盖与译文依据的双向核对，保留限定、逻辑、发言者及图注归属；长文按原有结构分批翻译与检查。
- 校正参考表中的表达边界及节选译例，增加三组原创翻译质量回归样例；中英文 README 描述完整使用方式。

- Make fidelity the prerequisite for every register; limit domestication and deverbalization to expression and assess mixed texts by information function.
- Check source coverage and translation evidence in both directions, preserving qualifiers, logic, and attribution; translate and review long texts in sections.
- Clarify reference guidance and excerpt examples, add three original translation-quality cases, and align both READMEs with the complete workflow.

### Fixed / 修复

- 修复 Star History 定时任务因 GitHub Star 总数与时间戳明细数量不一致而失败的问题。图表依据返回的有效时间戳生成，数量差异同时显示在图表与 workflow 警告中；缺失或无效时间戳及 API 请求失败仍会中止更新。
- Fix scheduled Star History updates when GitHub's reported total differs from the timestamped stargazer list. Plot returned valid timestamps and disclose the difference in the chart and workflow warning; missing or invalid timestamps and API errors still stop the update.
- 增加生成器回归测试，并在每次图表更新前执行。Run generator regression tests before each chart update.

## [1.1.0] - 2026-09-12

### Changed / 变更

- 明确触发范围：英文段落翻译，以及对照原文润色中文译稿。
- 短段落直接在聊天中交付，用户要求文件时才落盘；全文与项目翻译保留默认文件契约。
- 尊重用户已指定的纯译文、双语或目标文件，不重复确认；按文体选择必要检查，短文本无需展示完整诊断过程或通读全部参考表。
- 将版本与标签字段归入标准 `metadata`，同步中英文使用说明。
- 独立安装使用；文档输入依据宿主可用工具读取，明确提取缺口并保留请求范围。

- Clarify triggering for English passages and source-grounded polishing of Chinese translations.
- Deliver short passages in chat unless a file is requested; retain the default file contract for full-text and project translations.
- Honor explicit output choices without repeated confirmation; use checks appropriate to the text without requiring a full diagnostic display or every reference table for short passages.
- Place version and tags under standard `metadata` and align the Chinese and English documentation.
- Support standalone installation and document inputs through available host tools, with explicit extraction limitations.

The translation methodology, source-fidelity requirements, reference materials, and MIT license remain in place. This release does not introduce a new translation engine or claim a measured quality improvement.

## [1.0.0] - 2026-06-14

首个公开发布：基于叶子南英汉翻译方法论的翻译与润色流程，包含文本定档、三份参考表、中英对照交付、中英文说明与 MIT 许可。原标签及 GitHub Release 保留。

First public release: a translation and polishing workflow based on Ye Zinan's methodology, with text classification, three reference tables, bilingual delivery, Chinese and English documentation, and the MIT license. The original tag and GitHub Release are retained.

[1.1.1]: https://github.com/HoraceLuBFA/en-zh-translation-polish/releases/tag/v1.1.1
[1.1.0]: https://github.com/HoraceLuBFA/en-zh-translation-polish/releases/tag/v1.1.0
[1.0.0]: https://github.com/HoraceLuBFA/en-zh-translation-polish/releases/tag/v1.0.0
