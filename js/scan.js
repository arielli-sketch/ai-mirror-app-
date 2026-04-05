// 扫描页面专用JS

// 状态文本循环
const statuses = [
    { main: '多光谱扫描中...', sub: 'RGB • UV • 偏振光分析' },
    { main: '面部特征识别中...', sub: '检测 10 个关键点位' },
    { main: '皮肤纹理分析中...', sub: '毛孔 • 细纹 • 色素' },
    { main: '水分含量测量中...', sub: '表皮 • 真皮层分析' },
    { main: 'AI 数据处理中...', sub: '生成个性化报告' },
    { main: '分析完成 ✓', sub: '查看详细报告' }
];
let statusIndex = 0;

function updateStatus() {
    const statusMain = document.getElementById('statusMain');
    const statusSub = document.getElementById('statusSub');

    if (statusMain && statusSub) {
        const status = statuses[statusIndex];
        statusMain.textContent = status.main;
        statusSub.textContent = status.sub;
        statusIndex = (statusIndex + 1) % statuses.length;
    }
}

// 更新进度
let progress = 0;
function updateProgress() {
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progress += 2;
        if (progress > 100) progress = 0;
        progressText.textContent = `分析进度: ${progress}%`;
    }
}

// 初始化扫描页面
function initScanPage() {
    createParticles(30);
    setInterval(updateStatus, 3000);
    setInterval(updateProgress, 100);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScanPage);
} else {
    initScanPage();
}
