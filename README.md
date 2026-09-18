# 3D 个人简历网站

一个使用 Three.js 打造的沉浸式 3D 风格个人简历展示网站框架。

## ✨ 特性

- 🎨 **3D 粒子背景** - 3000+ 粒子组成的动态星空效果
- 🧊 **磨砂玻璃 UI** - 现代毛玻璃设计风格
- 📱 **响应式设计** - 完美适配手机、平板、电脑
- ⚡ **流畅动画** - 打字机效果、滚动动画、技能条动画
- 🎯 **完整模块** - Hero、关于、技能、经历、项目、联系
- 🚀 **零依赖部署** - 纯静态文件，无需后端

## 📁 项目结构

```
3d-resume-website/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── three-scene.js  # Three.js 3D场景
│   └── main.js         # 交互逻辑
├── assets/             # 资源文件夹（放图片等）
└── README.md           # 说明文档
```

## 🚀 快速开始

### 本地预览

直接用浏览器打开 `index.html` 即可预览。

推荐使用本地服务器（避免某些浏览器限制）：

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# VS Code
# 使用 Live Server 插件
```

然后访问 `http://localhost:8000`

## 📝 内容修改指南

### 1. 基本信息

打开 `index.html`，搜索以下占位符并替换：

| 占位符 | 位置 | 说明 |
|--------|------|------|
| `[你的名字]` | 多处 | 你的姓名 |
| `[你的职业]` | 关于我 | 职业身份 |
| `[X]年` | 关于我 | 工作年限 |
| `your@email.com` | 联系区 | 邮箱地址 |
| `+86 138-XXXX-XXXX` | 联系区 | 电话号码 |
| `[城市]` | 联系区 | 所在城市 |

### 2. 打字机职位

在 `js/main.js` 中修改 `phrases` 数组：

```javascript
const phrases = [
    '前端开发工程师',
    'UI/UX 设计师',
    // 添加你的职位...
];
```

### 3. 技能数据

在 `index.html` 的技能区域修改：
- 技能名称
- 百分比（`data-width` 属性）
- 技术标签

### 4. 工作经历

在时间线区域修改：
- 职位名称
- 时间范围
- 公司名称
- 工作描述列表

### 5. 项目作品

每个项目卡片修改：
- 项目标题
- 项目描述
- 技术标签
- 项目链接（GitHub、演示地址）

### 6. 个人照片

将照片放入 `assets/` 文件夹，然后在 `index.html` 中找到 `.image-placeholder` 替换为：

```html
<div class="image-placeholder">
    <img src="assets/your-photo.jpg" alt="你的名字" style="width:100%;height:100%;object-fit:cover;border-radius:20px;">
</div>
```

### 7. 社交链接

在 Hero 区域和联系区域修改社交链接的 `href` 属性：
- GitHub
- LinkedIn
- 邮箱
- 微信（可选）

## 🌐 部署方式

### 方式一：GitHub Pages（推荐，免费）

1. 创建 GitHub 仓库
2. 上传所有文件
3. 进入 Settings → Pages
4. Source 选择 `main` 分支
5. 等待部署完成，获得 `https://username.github.io/repo-name/` 地址

### 方式二：Vercel（免费，速度快）

1. 注册 [Vercel](https://vercel.com)
2. 导入 GitHub 仓库
3. 一键部署
4. 获得 `https://project-name.vercel.app` 地址

### 方式三：Netlify（免费）

1. 注册 [Netlify](https://netlify.com)
2. 拖拽项目文件夹到部署区
3. 完成部署

### 方式四：阿里云/腾讯云（国内访问快）

1. 购买域名和服务器
2. 域名备案（国内必需）
3. 使用 Nginx 托管静态文件
4. 配置 HTTPS 证书

## 🎨 自定义配色

在 `css/style.css` 顶部修改 CSS 变量：

```css
:root {
    --primary: #6366f1;      /* 主色调 */
    --secondary: #8b5cf6;    /* 辅助色 */
    --accent: #06b6d4;       /* 强调色 */
    --bg-dark: #0a0a1a;      /* 背景色 */
}
```

## 🔧 技术栈

- **Three.js** - 3D 图形渲染
- **GSAP** - 动画库（可选）
- **纯 HTML/CSS/JS** - 无框架依赖
- **Google Fonts** - Inter + Noto Sans SC

## 📱 浏览器兼容

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 许可证

MIT License - 可自由使用和修改。

## 🤝 致谢

灵感来源于抖音高赞视频中的个人网站制作教程，包括：
- @小羊同学 - Codex 制作个人作品集
- @小郑还挺忙 - 3D 互动简历
- @数字游牧人Samuel - 酷炫个人网站技巧

---

**用 ❤️ 和 Three.js 打造**
