// 趋势页面 V2

// 面部区域数据（包含30天数据）
const faceAreaData = {
    'forehead': {
        name: '额头',
        icon: '✨',
        status: '持续改善中',
        advice: '额头纹路明显减少，继续使用抗皱精华效果会更好！',
        data30days: [65, 67, 66, 68, 70, 69, 71, 73, 72, 74, 76, 75, 77, 79, 78, 80, 82, 81, 83, 85, 84, 86, 88, 87, 89, 90, 89, 91, 92, 88]
    },
    'left-eye': {
        name: '左眼黑眼圈',
        icon: '👁️',
        status: '显著改善',
        advice: '黑眼圈快速改善，保持充足睡眠和眼部护理！',
        data30days: [60, 62, 64, 63, 65, 67, 66, 68, 70, 72, 71, 73, 75, 74, 76, 78, 80, 79, 81, 83, 85, 84, 86, 88, 87, 89, 91, 90, 92, 92]
    },
    'right-eye': {
        name: '右眼黑眼圈',
        icon: '👁️',
        status: '持续改善中',
        advice: '右眼黑眼圈也在改善，继续保持良好作息！',
        data30days: [62, 64, 63, 65, 67, 66, 68, 70, 72, 71, 73, 75, 77, 76, 78, 80, 79, 81, 83, 82, 84, 86, 85, 87, 89, 88, 90, 91, 90, 90]
    },
    'nose': {
        name: '鼻部毛孔',
        icon: '👃',
        status: '稳定改善',
        advice: '鼻部毛孔收缩明显，定期清洁很重要！',
        data30days: [70, 71, 72, 71, 73, 74, 73, 75, 76, 75, 77, 78, 77, 79, 80, 81, 80, 82, 83, 82, 84, 85, 84, 86, 87, 86, 88, 89, 88, 85]
    },
    'left-cheek': {
        name: '左脸颊',
        icon: '✨',
        status: '状态极佳',
        advice: '左脸颊状态非常好，肤色均匀有光泽！',
        data30days: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 94, 95, 96, 95, 96, 97, 96, 94, 94]
    },
    'right-cheek': {
        name: '右脸颊',
        icon: '✨',
        status: '状态极佳',
        advice: '右脸颊也很棒，继续保持护肤习惯！',
        data30days: [74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 93, 94, 95, 94, 95, 96, 95, 93, 93]
    },
    'mouth': {
        name: '嘴部法令纹',
        icon: '💋',
        status: '缓慢改善',
        advice: '法令纹需要长期护理，建议增加面部按摩！',
        data30days: [68, 69, 68, 70, 71, 70, 72, 73, 72, 74, 75, 74, 76, 77, 76, 78, 79, 78, 80, 81, 80, 82, 83, 82, 84, 85, 84, 86, 87, 82]
    },
    'chin': {
        name: '下巴痘痘',
        icon: '✨',
        status: '快速改善',
        advice: '下巴痘痘明显减少，注意饮食清淡！',
        data30days: [50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 89, 88, 87, 86, 85, 84, 83, 82, 78]
    }
};

// 激励文案
const motivationTexts = [
    '你的皮肤状态越来越好了',
    '坚持就是胜利，你做得很棒',
    '你的努力正在开花结果',
    '继续保持，你会更美',
    '每一天都在变得更好'
];

// 初始化面部地图
function initFaceMap() {
    const areas = document.querySelectorAll('.face-area');
    const detailCard = document.getElementById('areaDetailCard');
    const closeBtn = document.getElementById('closeAreaDetail');

    areas.forEach(area => {
        area.addEventListener('click', function() {
            const areaId = this.dataset.area;
            showAreaDetail(areaId);
        });
    });

    closeBtn.addEventListener('click', function() {
        detailCard.style.display = 'none';
    });
}

// 显示区域详情
function showAreaDetail(areaId) {
    const data = faceAreaData[areaId];
    const detailCard = document.getElementById('areaDetailCard');

    document.getElementById('areaIcon').textContent = data.icon;
    document.getElementById('areaDetailName').textContent = data.name;
    document.getElementById('areaStatus').textContent = data.status;
    document.getElementById('areaAdvice').textContent = data.advice;

    // 初始化照片时间轴
    initPhotoTimeline(areaId, data.data30days);

    detailCard.style.display = 'block';
}

// 初始化照片时间轴
function initPhotoTimeline(areaId, scores) {
    const slider = document.getElementById('photoSlider');
    const photo = document.getElementById('timelinePhoto');
    const scoreEl = document.getElementById('photoScore');
    const changeEl = document.getElementById('photoChange');
    const dayEl = document.getElementById('currentDay');
    const dateEl = document.getElementById('currentDate');
    const quickNavBtns = document.querySelectorAll('.quick-nav-btn');

    // 计算日期（从30天前开始）
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 29);

    function updatePhoto(dayIndex) {
        const day = parseInt(dayIndex);

        // 更新照片淡入效果
        photo.style.opacity = '0';
        setTimeout(() => {
            photo.style.opacity = '1';
        }, 150);

        // 更新分数
        const score = scores[day];
        scoreEl.textContent = score;

        // 更新变化
        if (day > 0) {
            const change = score - scores[day - 1];
            changeEl.textContent = change > 0 ? `+${change}` : change;
            changeEl.className = 'photo-change ' + (change >= 0 ? 'up' : 'down');
        } else {
            changeEl.textContent = '+0';
            changeEl.className = 'photo-change';
        }

        // 更新日期
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + day);
        const month = currentDate.getMonth() + 1;
        const date = currentDate.getDate();

        if (day === 29) {
            dayEl.textContent = '今天';
        } else {
            dayEl.textContent = `第${day + 1}天`;
        }
        dateEl.textContent = `${month}月${date}日`;

        // 更新快速导航按钮状态
        quickNavBtns.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.day) === day) {
                btn.classList.add('active');
            }
        });
    }

    // 滑块事件
    slider.addEventListener('input', function() {
        updatePhoto(this.value);
    });

    // 快速导航按钮事件
    quickNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const day = this.dataset.day;
            slider.value = day;
            updatePhoto(day);
        });
    });

    // 初始化显示第1天
    updatePhoto(0);
}

// 随机更新激励文案
function updateMotivation() {
    const text = motivationTexts[Math.floor(Math.random() * motivationTexts.length)];
    const el = document.getElementById('motivationText');
    if (el) el.textContent = text;
}

// 卡片轮播
let currentSlide = 0;
const totalSlides = 3;

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // 更新轨道位置
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // 更新导航点
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // 更新按钮状态
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

// 将函数暴露到全局作用域
window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

// 初始化
function initTrendsV2() {
    initFaceMap();
    updateMotivation();
    updateCarousel();

    // 每30秒更新一次激励文案
    setInterval(updateMotivation, 30000);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrendsV2);
} else {
    initTrendsV2();
}
