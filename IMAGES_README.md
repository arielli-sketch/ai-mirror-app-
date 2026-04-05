# AI 镜子项目 - 图片说明

## 图片文件夹结构

```
ai-mirror-app/
└── images/
    ├── forehead/        # 额头照片（30张）
    │   ├── day1.jpg
    │   ├── day2.jpg
    │   ├── ...
    │   └── day30.jpg
    ├── left-eye/        # 左眼照片（30张）
    ├── right-eye/       # 右眼照片（30张）
    ├── nose/            # 鼻子照片（30张）
    ├── left-cheek/      # 左脸颊照片（30张）
    ├── right-cheek/     # 右脸颊照片（30张）
    ├── mouth/           # 嘴部照片（30张）
    └── chin/            # 下巴照片（30张）
```

## 如何添加照片

### 方式1：手动添加
1. 准备30张照片（每天一张）
2. 命名为 `day1.jpg`, `day2.jpg`, ..., `day30.jpg`
3. 放入对应的文件夹（如 `images/forehead/`）

### 方式2：批量重命名
如果你有30张照片但命名不规范：

```bash
cd /Users/didi/Desktop/ai-mirror-app/images/forehead/

# 批量重命名（假设原文件名是 IMG_001.jpg, IMG_002.jpg...）
counter=1
for file in *.jpg; do
    mv "$file" "day${counter}.jpg"
    counter=$((counter + 1))
done
```

## 照片要求

- **格式**：JPG 或 PNG
- **尺寸**：建议 800x600 或更高（会自动适配）
- **内容**：聚焦在对应的面部区域
- **数量**：每个区域30张（对应30天）
- **命名**：严格按照 `day1.jpg` 到 `day30.jpg`

## 当前状态

- ✅ 已创建 `images/forehead/` 文件夹
- ✅ 已添加示例图片 `day1.jpg`
- ⚠️ 需要添加 `day2.jpg` 到 `day30.jpg`（共29张）

## 临时方案

如果暂时没有30张照片，可以：
1. 复制 `day1.jpg` 多次作为占位符
2. 后续逐步替换为真实照片

```bash
cd /Users/didi/Desktop/ai-mirror-app/images/forehead/
for i in {2..30}; do
    cp day1.jpg day${i}.jpg
done
```

## 功能说明

用户点击额头区域后：
1. 显示照片时间轴
2. 滑动滑块查看30天的照片变化
3. 每张照片显示当天的健康指数
4. 显示较前一天的变化（+3 或 -2）
5. 快速导航按钮跳转到关键日期

## 注意事项

- 图片路径是相对路径，确保文件夹结构正确
- 如果图片加载失败，会显示灰色占位符
- 建议压缩图片以提高加载速度（每张控制在200KB以内）
