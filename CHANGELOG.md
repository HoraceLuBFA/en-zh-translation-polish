# Changelog

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

[1.1.0]: https://github.com/HoraceLuBFA/en-zh-translation-polish/releases/tag/v1.1.0
[1.0.0]: https://github.com/HoraceLuBFA/en-zh-translation-polish/releases/tag/v1.0.0
