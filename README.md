# 🇯🇵 Japanese Gojuon Study | 五十音图交互学习

[English Edition](./README_EN.md) | 中文版

一个优雅、现代且互动的日语五十音图学习工具。支持平假名、片假名、浊音及拗音的全面学习，内置语音播报与练习模式。

---

## ⚡️ Vibe Coding Origin

本项目的初始原型、核心逻辑及交互细节均由 **Gemini CLI** 通过 **Vibe Coding** 模式自动生成。从零到完整功能的实现仅经历了数轮自然语言对话，充分展示了 AI 驱动开发的极速体验。

> **"Built with vibes, refined by logic."**

---

## 🔗 演示地址 | Demo

点击下方链接即可直接在浏览器中体验（由 GitHub Pages 提供托管）：

**👉 [在线体验地址 (Demo Link)](https://goodwinyoung.github.io/wushiyin/)**

---

## ✨ 核心特性 | Features

-   **全假名覆盖**：包含清音 (Seion)、浊音/半浊音 (Dakuon) 以及拗音 (Yoon)。
-   **交互式发音**：点击任一假名卡片即可触发高保真语音播报（基于 Web Speech API）。
-   **练习模式 (Practice Mode)**：隐藏发音提示（罗马音），点击后才显现，助你高效记忆。
-   **全部播放 (Auto-Play)**：一键按序播放当前列表所有发音，支持随时暂停/停止。
-   **双语切换 (I18n)**：完整支持中英文界面切换，自动适配对应语言字体渲染。
-   **视觉动效**：灵动的水波纹点击特效、响应式网格布局以及丝滑的过渡动画。

---

## 🛠 技术栈 | Tech Stack

-   **Frontend**: Vue 3 (Composition API) + TypeScript + Vite
-   **I18n**: vue-i18n
-   **Deployment**: Docker + Nginx (Optimized for SPA)
-   **CI/CD**: GitLab CI (Docker-in-Docker)

---

## 🚀 部署说明 | Deployment

### 1. 本地开发 (Local Development)
```bash
npm install
npm run dev
```

### 2. Docker 一键部署 (Docker One-Click)
项目包含优化的 `nginx.conf`，支持 Gzip 压缩及 SPA 路由回退。
```bash
# 构建并启动容器
docker compose up -d --build
```
访问地址：`http://localhost:8080`

### 3. CI/CD 流水线 (GitLab CI/CD)
本项目已配置 `.gitlab-ci.yml`，支持推送到 GitLab 私有仓库后自动构建并推送镜像至 **Container Registry**：
-   **Build 阶段**: 验证 Node.js 编译环境。
-   **Package 阶段**: 构建 Docker 镜像并打标（`latest` & `commit_sha`）。

### 4. 反向代理建议 (Reverse Proxy)
如果你使用 **SWAG** 或其他 Nginx 反向代理服务，只需将流量转发至容器的 `80` 端口即可。

---

## 📁 项目结构 | Structure

-   `src/data/`: 核心假名数据集。
-   `src/components/`: 可复用的交互式组件（如 `GojuonCard`）。
-   `src/i18n/`: 国际化语言配置文件。
-   `Dockerfile` & `nginx.conf`: 工业级生产环境镜像配置。
-   `.gitlab-ci.yml`: 自动化构建流水线配置。

---

## 📄 开源协议 | License
本项目采用 [MIT License](LICENSE) 开源。

---

*Made with ❤️ by Gemini CLI and Vibe Coding.*
