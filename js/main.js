// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initHeroAnimations();
});

// 导航功能
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // 滚动时导航栏效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 滚动效果
function initScrollEffects() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.feature-card, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Hero区域动画
function initHeroAnimations() {
    const trigrams = document.querySelectorAll('.trigram');
    
    trigrams.forEach(trigram => {
        trigram.addEventListener('mouseenter', function() {
            const trigramName = this.dataset.trigram;
            showTrigramInfo(trigramName);
            
            // 添加发光效果
            this.style.textShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
            this.style.transform = 'scale(1.3)';
        });
        
        trigram.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.3)';
            this.style.transform = 'scale(1)';
        });
        
        trigram.addEventListener('click', function() {
            const trigramName = this.dataset.trigram;
            showTrigramDetails(trigramName);
        });
    });
}

// 显示八卦信息
function showTrigramInfo(trigramName) {
    const info = getTrigramInfo(trigramName);
    
    // 创建信息提示框
    let tooltip = document.querySelector('.trigram-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'trigram-tooltip';
        document.body.appendChild(tooltip);
    }
    
    tooltip.innerHTML = `
        <strong>${info.name}</strong><br>
        ${info.meaning}<br>
        五行: ${info.element}
    `;
    
    tooltip.style.display = 'block';
    tooltip.style.position = 'fixed';
    tooltip.style.background = 'rgba(26, 31, 46, 0.95)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px 15px';
    tooltip.style.borderRadius = '8px';
    tooltip.style.fontSize = '14px';
    tooltip.style.border = '1px solid rgba(212, 175, 55, 0.3)';
    tooltip.style.zIndex = '1000';
    tooltip.style.pointerEvents = 'none';
    
    // 更新位置
    document.addEventListener('mousemove', function(e) {
        tooltip.style.left = e.clientX + 10 + 'px';
        tooltip.style.top = e.clientY - 10 + 'px';
    });
    
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 3000);
}

// 显示八卦详细信息
function showTrigramDetails(trigramName) {
    const info = getTrigramInfo(trigramName);
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'trigram-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${info.name} ${info.symbol}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="trigram-detail">
                    <h3>基本含义</h3>
                    <p>${info.description}</p>
                </div>
                <div class="trigram-detail">
                    <h3>自然现象</h3>
                    <p>${info.nature}</p>
                </div>
                <div class="trigram-detail">
                    <h3>五行属性</h3>
                    <p>${info.element}</p>
                </div>
                <div class="trigram-detail">
                    <h3>家族关系</h3>
                    <p>${info.family}</p>
                </div>
                <div class="trigram-detail">
                    <h3>性格特征</h3>
                    <p>${info.personality}</p>
                </div>
            </div>
        </div>
    `;
    
    // 样式
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        backdrop-filter: blur(5px);
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: var(--secondary-bg);
        border: 1px solid var(--border-color);
        border-radius: 15px;
        padding: 30px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    document.body.appendChild(modal);
    
    // 关闭功能
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 获取八卦信息
function getTrigramInfo(trigramName) {
    const trigramData = {
        '乾': {
            name: '乾',
            symbol: '☰',
            meaning: '天、刚健、创造',
            description: '代表天，象征刚健、创造、进取的力量。在自然界中代表天，在人事上代表君主、父亲。',
            nature: '天、天空、宇宙',
            element: '金',
            family: '父亲',
            personality: '刚健、积极、进取、有创造力'
        },
        '坤': {
            name: '坤',
            symbol: '☷',
            meaning: '地、柔顺、包容',
            description: '代表地，象征柔顺、包容、承载的力量。在自然界中代表大地，在人事上代表母亲、臣民。',
            nature: '地、大地、土壤',
            element: '土',
            family: '母亲',
            personality: '柔顺、包容、稳重、有耐心'
        },
        '震': {
            name: '震',
            symbol: '☳',
            meaning: '雷、震动、奋起',
            description: '代表雷，象征震动、奋起、觉醒的力量。在自然界中代表雷电，在人事上代表长男。',
            nature: '雷、雷电、震动',
            element: '木',
            family: '长男',
            personality: '活跃、积极、有冲劲、容易激动'
        },
        '巽': {
            name: '巽',
            symbol: '☴',
            meaning: '风、顺从、渗透',
            description: '代表风，象征顺从、渗透、温和的力量。在自然界中代表风，在人事上代表长女。',
            nature: '风、空气、气流',
            element: '木',
            family: '长女',
            personality: '温和、顺从、有渗透力、善于沟通'
        },
        '坎': {
            name: '坎',
            symbol: '☵',
            meaning: '水、险陷、智慧',
            description: '代表水，象征险陷、智慧、流动的力量。在自然界中代表水，在人事上代表中男。',
            nature: '水、河流、海洋',
            element: '水',
            family: '中男',
            personality: '智慧、灵活、深沉、有洞察力'
        },
        '离': {
            name: '离',
            symbol: '☲',
            meaning: '火、光明、依附',
            description: '代表火，象征光明、依附、温暖的力量。在自然界中代表火，在人事上代表中女。',
            nature: '火、光明、太阳',
            element: '火',
            family: '中女',
            personality: '热情、光明、有魅力、善于表达'
        },
        '艮': {
            name: '艮',
            symbol: '☶',
            meaning: '山、静止、阻止',
            description: '代表山，象征静止、阻止、稳定的力量。在自然界中代表山，在人事上代表少男。',
            nature: '山、山峰、高地',
            element: '土',
            family: '少男',
            personality: '稳重、固执、有定力、不易改变'
        },
        '兑': {
            name: '兑',
            symbol: '☱',
            meaning: '泽、喜悦、沟通',
            description: '代表泽，象征喜悦、沟通、润泽的力量。在自然界中代表沼泽，在人事上代表少女。',
            nature: '泽、沼泽、湖泊',
            element: '金',
            family: '少女',
            personality: '喜悦、温和、善于沟通、有感染力'
        }
    };
    
    return trigramData[trigramName] || {};
}

// 滚动到转换器
function scrollToConverter() {
    const converter = document.getElementById('converter');
    if (converter) {
        converter.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 打开哲学页面
function openPhilosophy() {
    window.location.href = 'philosophy.html';
}