# 3D 个人简历网站

[![Website](https://img.shields.io/badge/在线预览-6366f1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://noii-y.github.io/resume/)
![Three.js](https://img.shields.io/badge/Three.js-r160-black?style=for-the-badge&logo=threedotjs&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

一个基于 **Three.js + 原生 HTML/CSS/JS** 打造的沉浸式 3D 风格个人在线简历 / 作品集单页网站。纯静态、无后端，免费托管于 GitHub Pages。

> 🌐 **在线预览**：[https://noii-y.github.io/resume/](https://noii-y.github.io/resume/)

## ✨ 功能亮点

- 🌌 **3D 粒子星空背景**：3000 粒子动态星空，随鼠标产生视差与旋转交互
- 🧊 **玻璃拟态界面**：磨砂玻璃卡片 + 渐变主题，现代深色视觉
- ⌨️ **打字机职位轮播**：循环展示多个职业定位
- 🎬 **滚动驱动动画**：GSAP ScrollTrigger 触发入场、技能条填充、数字滚动计数
- 🧭 **完整简历模块**：首页、关于我、技能专长、教育与工作经历、项目案例、专业认证、联系方式
- 🗂️ **项目分组展示**：企业交付项目与个人技术作品分区呈现
- 📜 **证书展示**：专业认证卡片，点击可查看原图
- 📱 **响应式适配**：手机、平板、桌面均有良好排版
- ⚡ **零构建、零后端**：纯静态文件，开箱即部署

## 🧱 技术栈

| 类别 | 技术 |
| --- | --- |
| 3D 渲染 | [Three.js](https://threejs.org/) r160（粒子系统、自定义着色器） |
| 动画 | [GSAP](https://gsap.com/) 3.12 + ScrollTrigger、原生 CSS 动画 |
| 页面 | 语义化 HTML5、CSS3（Grid / Flexbox、CSS 变量、`backdrop-filter`） |
| 交互 | 原生 JavaScript（无框架依赖） |
| 字体 | Google Fonts · Inter + Noto Sans SC |
| 托管 | GitHub Pages |

## 📁 项目结构

```
resume/
├── index.html          # 页面结构与全部文案内容
├── css/
│   └── style.css       # 样式：玻璃拟态、响应式、动画
├── js/
│   ├── three-scene.js  # Three.js 粒子星空 3D 场景
│   └── main.js         # 交互：打字机、滚动动画、计数、导航等
├── assets/             # 图片资源（个人照片、证书等）
└── README.md
```

## 🚀 本地运行

直接用浏览器打开 `index.html` 即可（Three.js 与字体通过 CDN 加载，需联网）。

如遇浏览器本地文件限制，推荐起一个静态服务器：

```bash
# Python 3
python -m http.server 8000

# 或 Node.js
npx serve .
```

然后访问 <http://localhost:8000>。

## 🌐 部署到 GitHub Pages

1. 将仓库推送到 GitHub；
2. 进入仓库 **Settings → Pages**；
3. **Source** 选择 `main` 分支、根目录 `/(root)`；
4. 等待约 1–2 分钟，即可通过 `https://<用户名>.github.io/<仓库名>/` 访问。

> 💡 **更新缓存提示**：`index.html` 中对 CSS / JS / 图片引用带了 `?v=版本号` 参数。每次更新内容后，把版本号往后拨一位（如 `?v=20260920f` → `?v=20260920g`），即可让访客浏览器与 CDN 立即加载最新版本，而不是旧缓存。

## 📬 交流反馈

- 项目源码与更多作品见作者的 [GitHub 主页](https://github.com/noii-y)
- 问题与建议欢迎在 [Issues](https://github.com/noii-y/resume/issues) 中提出

## 📄 版权说明

- **代码部分**（HTML / CSS / JavaScript）基于 [MIT License](https://opensource.org/license/mit) 开放，欢迎学习参考。
- **个人内容**（包括但不限于简历文案、个人照片、证书图片、项目与业绩数据）版权归站点作者所有，**未经书面授权，禁止转载、复制或用于任何商业用途**。

---

用 ❤️ 和 Three.js 打造
