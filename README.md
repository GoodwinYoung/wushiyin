# 🇯🇵 Japanese Gojuon Study | 五十音图交互学习

一个优雅、现代且互动的日语五十音图学习工具。支持平假名、片假名、浊音及拗音的全面学习，内置语音播报与练习模式。

---

## ⚡️ Vibe Coding Origin

本项目的初始原型、核心逻辑及交互细节均由 **Gemini CLI** 通过 **Vibe Coding** 模式自动生成。从零到完整功能的实现仅经历了数轮自然语言对话，充分展示了 AI 驱动开发的极速体验。

> **"Built with vibes, refined by logic."**

---

## ✨ 核心特性 | Features

-   **全假名覆盖**：包含清音 (Seion)、浊音/半浊音 (Dakuon) 以及拗音 (Yoon)。
-   **交互式发音**：点击任一假名卡片即可触发高保真语音播报（基于 Web Speech API）。
-   **练习模式 (Practice Mode)**：隐藏发音提示（罗马音），点击后才显现，助你高效记忆。
-   **全部播放 (Auto-Play)**：一键按序播放当前列表所有发音，支持随时暂停/停止。
-   **双语切换 (I18n)**：完整支持中英文界面切换，自动适配对应语言字体渲染。
-   **视觉动效**：灵动的水波纹点击特效、响应式网格布局以及丝滑的过渡动画。
-   **响应式设计**：适配 PC、平板及手机端，随时随地开启学习。

## 🛠 技术栈 | Tech Stack

-   **Framework**: [Vue 3 (Composition API)](https://vuejs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Bundler**: [Vite](https://vitejs.dev/)
-   **I18n**: [vue-i18n](https://vue-i18n.intlify.dev/)
-   **Styling**: Vanilla CSS (Modern CSS Variables)

## 🚀 快速开始 | Getting Started

### 1. 克隆项目
```bash
git clone https://github.com/your-username/japanese-gojuon-study.git
cd japanese-gojuon-study
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 构建生产环境
```bash
npm run build
```

## 📸 预览说明 | Preview
项目中包含：
-   `Seion Grid`: 基础 46 音学习。
-   `Mode Toggle`: 平假名/片假名一键对照。
-   `Practice UI`: 挑战你的记忆极限。

## 📄 开源协议 | License
本项目采用 [MIT License](LICENSE) 开源。

---

*Made with ❤️ by Gemini CLI and Vibe Coding.*