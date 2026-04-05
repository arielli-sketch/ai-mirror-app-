// 趋势页面专用JS

// 面部区域数据
const areaData = {
    'dark-circles': {
        name: '黑眼圈',
        weekData: [92, 88, 75, 90, 82, 68, 95],
        details: {
            1: { score: 92, yesterday: +4, lastWeek: +6, note: '黑眼圈明显改善，继续保持良好作息' },
            2: { score: 88, yesterday: -4, lastWeek: +2, note: '略有下降，注意眼部护理' },
            3: { score: 75, yesterday: -13, lastWeek: -8, note: '黑眼圈加重，建议增加睡眠时间' },
            4: { score: 90, yesterday: +15, lastWeek: +12, note: '恢复良好，保持当前作息' },
            5: { score: 82, yesterday: -8, lastWeek: +5, note: '轻微波动，注意用眼卫生' },
            6: { score: 68, yesterday: -14, lastWeek: -10, note: '周末熬夜导致黑眼圈加重' },
            7: { score: 95, yesterday: +27, lastWeek: +18, note: '本周最佳状态，继续保持' }
        }
    },
    'wrinkles': {
        name: '法令纹',
        weekData: [78, 80, 82, 79, 85, 88, 90],
        details: {
            1: { score: 78, yesterday: +2, lastWeek: +3, note: '法令纹略有改善' },
            2: { score: 80, yesterday: +2, lastWeek: +4, note: '持续改善中' },
            3: { score: 82, yesterday: +2, lastWeek: +5, note: '保持良好状态' },
            4: { score: 79, yesterday: -3, lastWeek: +2, note: '轻微反弹，注意面部保湿' },
            5: { score: 85, yesterday: +6, lastWeek: +8, note: '明显改善，护肤效果显著' },
            6: { score: 88, yesterday: +3, lastWeek: +10, note: '本周进步明显' },
            7: { score: 90, yesterday: +2, lastWeek: +12, note: '达到本周最佳状态' }
        }
    },
    'pores': {
        name: '毛孔',
        weekData: [85, 83, 88, 90, 87, 92, 89],
        details: {
            1: { score: 85, yesterday: +1, lastWeek: +4, note: '毛孔状态良好' },
            2: { score: 83, yesterday: -2, lastWeek: +2, note: '轻微扩张，注意清洁' },
            3: { score: 88, yesterday: +5, lastWeek: +6, note: '清洁效果显著' },
            4: { score: 90, yesterday: +2, lastWeek: +8, note: '毛孔收缩明显' },
            5: { score: 87, yesterday: -3, lastWeek: +5, note: '保持稳定' },
            6: { score: 92, yesterday: +5, lastWeek: +10, note: '本周最佳状态' },
            7: { score: 89, yesterday: -3, lastWeek: +7, note: '整体改善良好' }
        }
    },
    'spots': {
        name: '色斑',
        weekData: [70, 72, 75, 73, 78, 80, 82],
        details: {
            1: { score: 70, yesterday: +1, lastWeek: +2, note: '色斑略有淡化' },
            2: { score: 72, yesterday: +2, lastWeek: +3, note: '持续改善中' },
            3: { score: 75, yesterday: +3, lastWeek: +5, note: '美白效果开始显现' },
            4: { score: 73, yesterday: -2, lastWeek: +3, note: '轻微反弹，注意防晒' },
            5: { score: 78, yesterday: +5, lastWeek: +8, note: '色斑明显淡化' },
            6: { score: 80, yesterday: +2, lastWeek: +10, note: '防晒效果良好' },
            7: { score: 82, yesterday: +2, lastWeek: +12, note: '本周改善显著' }
        }
    },
    'acne': {
        name: '痘痘',
        weekData: [65, 70, 68, 75, 80, 78, 85],
        details: {
            1: { score: 65, yesterday: -2, lastWeek: +1, note: '痘痘略有增加，注意饮食' },
            2: { score: 70, yesterday: +5, lastWeek: +6, note: '炎症开始消退' },
            3: { score: 68, yesterday: -2, lastWeek: +4, note: '轻微反复，继续治疗' },
            4: { score: 75, yesterday: +7, lastWeek: +10, note: '痘痘明显减少' },
            5: { score: 80, yesterday: +5, lastWeek: +15, note: '皮肤状态改善明显' },
            6: { score: 78, yesterday: -2, lastWeek: +13, note: '保持稳定' },
            7: { score: 85, yesterday: +7, lastWeek: +20, note: '本周最佳状态，痘痘基本消退' }
        }
    }
};

let currentArea = 'dark-circles';

// 时间范围按钮切换
function initTimeRangeButtons() {
    const buttons = document.querySelectorAll('.range-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const range = this.textContent;
            console.log(`切换到时间范围: ${range}`);
        });
    });
}

// 面部区域按钮切换
function initAreaButtons() {
    const buttons = document.querySelectorAll('.area-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentArea = this.dataset.area;
            updateHeatmap();
        });
    });
}

// 更新热力图
function updateHeatmap() {
    const data = areaData[currentArea];
    const areaName = document.getElementById('areaName');
    const cells = document.querySelectorAll('.heatmap-cell');
    const summary = document.getElementById('trendSummary');

    // 更新区域名称
    areaName.textContent = `${data.name}变化趋势`;

    // 更新热力图数据
    cells.forEach((cell, index) => {
        const value = data.weekData[index];
        const valueElement = cell.querySelector('.cell-value');
        valueElement.textContent = value;

        // 更新颜色等级
        cell.classList.remove('high', 'medium', 'low');
        if (value >= 85) {
            cell.classList.add('high');
        } else if (value >= 75) {
            cell.classList.add('medium');
        } else {
            cell.classList.add('low');
        }
    });

    // 计算趋势
    const firstDay = data.weekData[0];
    const lastDay = data.weekData[6];
    const change = lastDay - firstDay;
    const changePercent = Math.round((change / firstDay) * 100);

    const summaryIcon = summary.querySelector('.summary-icon');
    const summaryText = summary.querySelector('.summary-text');

    if (change > 0) {
        summaryIcon.textContent = '📈';
        summaryText.innerHTML = `本周${data.name}整体改善 <span class="trend-up">+${changePercent}%</span>`;
    } else if (change < 0) {
        summaryIcon.textContent = '📉';
        summaryText.innerHTML = `本周${data.name}略有下降 <span class="trend-down">${changePercent}%</span>`;
    } else {
        summaryIcon.textContent = '➡️';
        summaryText.innerHTML = `本周${data.name}保持稳定`;
    }
}

// 热力图单元格点击事件
function initHeatmapClick() {
    const cells = document.querySelectorAll('.heatmap-cell');
    const detailCard = document.getElementById('detailCard');
    const closeBtn = document.getElementById('closeDetail');

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            const day = parseInt(this.dataset.day);
            showDetail(day);
        });
    });

    closeBtn.addEventListener('click', function() {
        detailCard.style.display = 'none';
    });
}

// 显示详细数据
function showDetail(day) {
    const data = areaData[currentArea];
    const detail = data.details[day];
    const detailCard = document.getElementById('detailCard');

    const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    document.getElementById('detailTitle').textContent = `${dayNames[day - 1]}详情 - ${data.name}`;
    document.getElementById('detailScore').textContent = detail.score;

    const yesterdayEl = document.getElementById('comparisonYesterday');
    yesterdayEl.textContent = detail.yesterday > 0 ? `+${detail.yesterday}` : detail.yesterday;
    yesterdayEl.className = 'comparison-value ' + (detail.yesterday > 0 ? 'up' : 'down');

    const lastWeekEl = document.getElementById('comparisonLastWeek');
    lastWeekEl.textContent = detail.lastWeek > 0 ? `+${detail.lastWeek}` : detail.lastWeek;
    lastWeekEl.className = 'comparison-value ' + (detail.lastWeek > 0 ? 'up' : 'down');

    document.getElementById('detailNote').textContent = detail.note;

    detailCard.style.display = 'block';
    detailCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 初始化趋势页面
function initTrendsPage() {
    initTimeRangeButtons();
    initAreaButtons();
    initHeatmapClick();
    updateHeatmap();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrendsPage);
} else {
    initTrendsPage();
}
