# AI 智能镜 - 面部扫描应用

高科技感的 AI 智能镜面部扫描和数据分析应用，采用模块化架构设计，方便与其他项目集成。

## 项目结构

```
ai-mirror-app/
├── scan.html              # 扫描页面（入口页面）
├── trends.html            # 数据趋势页面
├── css/
│   ├── common.css         # 通用基础样式（必需）
│   ├── scan.css           # 扫描页面专用样式
│   └── trends.css         # 趋势页面专用样式
├── js/
│   ├── common.js          # 通用功能模块（必需）
│   ├── scan.js            # 扫描页面逻辑
│   └── trends.js          # 趋势页面逻辑
└── README.md              # 项目说明文档
```

## 功能特性

### 扫描页面 (scan.html)
- ✅ 六边形扫描框架，渐变流动动画
- ✅ 10 个面部特征点实时脉冲
- ✅ 3 层扫描线动画
- ✅ 雷达环扩散效果
- ✅ 数据流代码显示
- ✅ 全息网格背景
- ✅ 30 个浮动粒子
- ✅ 实时进度条
- ✅ 状态文本循环切换

### 趋势页面 (trends.html)
- ✅ 时间范围选择器（7/30/90天）
- ✅ 3 个统计卡片（平均值 + 趋势）
- ✅ 2 个 SVG 折线图（水分、弹性）
- ✅ 每周热力图（7天数据）
- ✅ AI 个性化建议（4条）
- ✅ 平滑动画和交互效果

## 技术栈

- **纯前端实现**：HTML5 + CSS3 + Vanilla JavaScript
- **无依赖**：不需要任何第三方库
- **响应式设计**：移动端优先（430px 宽度）
- **高性能动画**：使用 GPU 加速（transform、opacity）
- **模块化架构**：CSS 和 JS 分离，便于复用

## 快速开始

### 方式 1：直接打开
双击 `scan.html` 在浏览器中打开即可使用。

### 方式 2：本地服务器
```bash
# 使用 Python 启动本地服务器
cd ai-mirror-app
python3 -m http.server 8000

# 访问 http://localhost:8000/scan.html
```

## 与其他项目集成

### 集成方式 1：引入完整模块
将整个 `css/` 和 `js/` 文件夹复制到你的项目中，然后在 HTML 中引入：

```html
<!-- 必需的基础文件 -->
<link rel="stylesheet" href="css/common.css">
<script src="js/common.js"></script>

<!-- 根据需要引入页面专用文件 -->
<link rel="stylesheet" href="css/scan.css">
<script src="js/scan.js"></script>
```

### 集成方式 2：选择性引入
如果只需要某些功能，可以单独引入对应的 CSS 和 JS 文件：

**只要扫描功能：**
```html
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/scan.css">
<script src="js/common.js"></script>
<script src="js/scan.js"></script>
```

**只要趋势分析：**
```html
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/trends.css">
<script src="js/common.js"></script>
<script src="js/trends.js"></script>
```

### 集成方式 3：提取特定组件
每个 CSS 文件都是独立的模块，你可以：
- 从 `common.css` 提取全息网格、粒子效果等通用组件
- 从 `scan.css` 提取六边形框架、扫描线等扫描组件
- 从 `trends.css` 提取图表、热力图等数据可视化组件

## 核心组件说明

### 1. 通用组件 (common.css + common.js)
- **全息网格背景** `.holographic-grid`
- **粒子效果** `.particles` + `createParticles()`
- **状态栏** `.status-bar`
- **时间显示** `updateTime()`

### 2. 扫描组件 (scan.css + scan.js)
- **六边形框架** `.hexagon-border` - 渐变流动 + 脉冲动画
- **扫描线** `.scan-line` - 3层垂直扫描
- **特征点** `.point` - 10个脉冲点位
- **雷达环** `.radar-ring` - 扩散波纹
- **数据流** `.data-stream` - 代码流动效果

### 3. 趋势组件 (trends.css + trends.js)
- **统计卡片** `.stat-card` - 数值 + 趋势指示
- **折线图** `.chart-path` - SVG 动画绘制
- **热力图** `.heatmap-cell` - 颜色强度映射
- **建议卡片** `.recommendation-item` - AI 建议展示

## 自定义配置

### 修改主题色
在 CSS 文件中搜索 `#00ffff`（青色）并替换为你的品牌色：
```css
/* 示例：改为紫色主题 */
#00ffff → #9d4edd
rgba(0, 255, 255, 0.x) → rgba(157, 78, 221, 0.x)
```

### 调整动画速度
修改 `animation-duration` 值：
```css
/* 扫描线速度 */
animation: scan 3s linear infinite;  /* 改为 2s 更快 */

/* 粒子速度 */
animation-duration: (Math.random() * 4 + 6) + 's';  /* 调整范围 */
```

### 修改数据内容
在 JS 文件中修改数据数组：
```javascript
// scan.js - 修改状态文本
const statuses = [
    { main: '你的文本', sub: '你的副标题' },
    // ...
];

// trends.js - 修改图表数据
// 直接在 HTML 的 SVG path 中修改坐标点
```

## 性能优化

- ✅ 使用 CSS `transform` 和 `opacity` 实现 GPU 加速
- ✅ 避免使用 `width`、`height`、`left`、`top` 等触发重排的属性
- ✅ 使用 `will-change` 提示浏览器优化
- ✅ SVG 路径使用 `stroke-dasharray` 实现绘制动画
- ✅ 粒子数量控制在 30 个以内
- ✅ 使用 `requestAnimationFrame` 优化 JS 动画（如需要）

## 浏览器兼容性

- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+

**注意**：需要支持 CSS `clip-path`、`backdrop-filter` 和 SVG 动画。

## 设计参考

本项目设计灵感来源于：
- **CareOS Artemis** - 高端智能镜交互设计
- **Samsung AI Mirror** - 面部扫描动效
- **MagicMirror** - 模块化布局系统

## 开发建议

### 与 React/Vue 集成
```javascript
// React 示例
import './css/common.css';
import './css/scan.css';
import { createParticles, updateTime } from './js/common.js';

useEffect(() => {
    createParticles(30);
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
}, []);
```

### 与后端 API 集成
```javascript
// 在 trends.js 中添加数据获取
async function fetchTrendsData(range) {
    const response = await fetch(`/api/trends?range=${range}`);
    const data = await response.json();
    updateCharts(data);
}
```

### 添加新页面
1. 创建新的 HTML 文件
2. 引入 `common.css` 和 `common.js`
3. 创建新的 CSS 和 JS 文件
4. 在 HTML 中引入新文件

## 文件依赖关系

```
scan.html
├── css/common.css (必需)
├── css/scan.css
├── js/common.js (必需)
└── js/scan.js

trends.html
├── css/common.css (必需)
├── css/trends.css
├── js/common.js (必需)
└── js/trends.js
```

**重要**：`common.css` 和 `common.js` 是所有页面的基础依赖，必须首先引入。

## 许可证

MIT License - 可自由用于商业和个人项目

## 更新日志

### v1.0.0 (2026-04-05)
- ✅ 初始版本发布
- ✅ 完成扫描页面和趋势页面
- ✅ 模块化架构重构
- ✅ 完整文档编写

## 联系方式

如有问题或建议，欢迎反馈。

---

**提示**：建议在集成前先在浏览器中测试完整功能，确保所有动画和交互正常工作。
