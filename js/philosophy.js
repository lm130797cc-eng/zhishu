// 哲学页面专用JavaScript
class PhilosophyPage {
    constructor() {
        this.wuxingChart = null;
        this.init();
    }
    
    init() {
        this.initParticles();
        this.initWuxingChart();
        this.initScrollAnimations();
        this.initCardInteractions();
    }
    
    // 初始化粒子系统
    initParticles() {
        const container = document.getElementById('philosophy-particles');
        if (!container) return;
        
        // 创建哲学粒子系统
        new PhilosophyParticles(container);
    }
    
    // 初始化五行图表
    initWuxingChart() {
        const container = document.getElementById('wuxing-network');
        if (!container) return;
        
        this.wuxingChart = echarts.init(container);
        
        const wuxingNodes = [
            { id: '木', name: '木', x: 0, y: -100, element: '木', color: '#00ff00' },
            { id: '火', name: '火', x: 100, y: 0, element: '火', color: '#ff4500' },
            { id: '土', name: '土', x: 0, y: 100, element: '土', color: '#daa520' },
            { id: '金', name: '金', x: -100, y: 0, element: '金', color: '#ffd700' },
            { id: '水', name: '水', x: 0, y: 0, element: '水', color: '#00ffff' }
        ];
        
        const wuxingLinks = [
            // 相生关系
            { source: '木', target: '火', relation: '相生', lineStyle: { color: '#00ff00', width: 3 } },
            { source: '火', target: '土', relation: '相生', lineStyle: { color: '#00ff00', width: 3 } },
            { source: '土', target: '金', relation: '相生', lineStyle: { color: '#00ff00', width: 3 } },
            { source: '金', target: '水', relation: '相生', lineStyle: { color: '#00ff00', width: 3 } },
            { source: '水', target: '木', relation: '相生', lineStyle: { color: '#00ff00', width: 3 } },
            // 相克关系
            { source: '木', target: '土', relation: '相克', lineStyle: { color: '#ff0000', width: 2, type: 'dashed' } },
            { source: '土', target: '水', relation: '相克', lineStyle: { color: '#ff0000', width: 2, type: 'dashed' } },
            { source: '水', target: '火', relation: '相克', lineStyle: { color: '#ff0000', width: 2, type: 'dashed' } },
            { source: '火', target: '金', relation: '相克', lineStyle: { color: '#ff0000', width: 2, type: 'dashed' } },
            { source: '金', target: '木', relation: '相克', lineStyle: { color: '#ff0000', width: 2, type: 'dashed' } }
        ];
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    if (params.dataType === 'node') {
                        return `<div style="padding: 10px;">
                            <div style="font-size: 16px; font-weight: bold; color: #d4af37; margin-bottom: 8px;">
                                ${params.data.name}行
                            </div>
                            <div style="color: #b8c5d1;">五行属性: ${params.data.element}</div>
                        </div>`;
                    } else {
                        return `<div style="padding: 10px;">
                            <div style="margin-bottom: 5px;">
                                <strong>${params.data.source}</strong> → <strong>${params.data.target}</strong>
                            </div>
                            <div style="color: #d4af37;">关系: ${params.data.relation}</div>
                        </div>`;
                    }
                },
                backgroundColor: 'rgba(26, 31, 46, 0.95)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
                textStyle: { color: '#ffffff' }
            },
            series: [{
                type: 'graph',
                layout: 'none',
                animation: true,
                roam: true,
                draggable: true,
                symbolSize: 60,
                data: wuxingNodes.map(node => ({
                    id: node.id,
                    name: node.name,
                    x: node.x,
                    y: node.y,
                    element: node.element,
                    itemStyle: {
                        color: node.color,
                        borderColor: '#d4af37',
                        borderWidth: 2,
                        shadowColor: node.color,
                        shadowBlur: 20
                    }
                })),
                links: wuxingLinks,
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#ffffff'
                },
                lineStyle: {
                    curveness: 0.2
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: { width: 4 }
                }
            }]
        };
        
        this.wuxingChart.setOption(option);
        
        // 添加动画效果
        this.animateWuxingChart();
        
        // 响应式调整
        window.addEventListener('resize', () => {
            if (this.wuxingChart) {
                this.wuxingChart.resize();
            }
        });
    }
    
    // 五行图表动画
    animateWuxingChart() {
        let angle = 0;
        
        const animate = () => {
            angle += 0.01;
            
            const option = this.wuxingChart.getOption();
            const nodes = option.series[0].data;
            
            // 旋转节点
            nodes.forEach((node, index) => {
                const originalAngle = (index * 72 * Math.PI) / 180;
                const radius = 80;
                node.x = Math.cos(originalAngle + angle) * radius;
                node.y = Math.sin(originalAngle + angle) * radius;
            });
            
            this.wuxingChart.setOption({
                series: [{
                    data: nodes
                }]
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // 初始化滚动动画
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        // 观察需要动画的元素
        document.querySelectorAll('.philosophy-card, .theory-card, .advantage-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }
    
    // 元素动画
    animateElement(element) {
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutCubic',
            delay: Math.random() * 200
        });
    }
    
    // 初始化卡片交互
    initCardInteractions() {
        // 哲学卡片悬停效果
        document.querySelectorAll('.philosophy-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.highlightCard(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.unhighlightCard(card);
            });
            
            card.addEventListener('click', () => {
                this.showCardDetails(card);
            });
        });
        
        // 理论卡片交互
        document.querySelectorAll('.theory-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateTheoryCard(card);
            });
        });
        
        // 优势卡片交互
        document.querySelectorAll('.advantage-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.pulseCard(card);
            });
        });
    }
    
    // 高亮卡片
    highlightCard(card) {
        anime({
            targets: card,
            scale: [1, 1.02],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        // 添加发光效果
        card.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.3)';
    }
    
    // 取消高亮
    unhighlightCard(card) {
        anime({
            targets: card,
            scale: [1.02, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        card.style.boxShadow = 'none';
    }
    
    // 显示卡片详情
    showCardDetails(card) {
        const header = card.querySelector('.card-header h3').textContent;
        const symbol = card.querySelector('.bagua-symbol-large').textContent;
        const content = card.querySelector('.card-content').innerHTML;
        
        // 创建详情模态框
        const modal = this.createDetailModal(header, symbol, content);
        document.body.appendChild(modal);
        
        // 动画显示
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        anime({
            targets: modal.querySelector('.modal-content'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutBack'
        });
    }
    
    // 创建详情模态框
    createDetailModal(title, symbol, content) {
        const modal = document.createElement('div');
        modal.className = 'detail-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title">
                            <span class="modal-symbol">${symbol}</span>
                            <h2>${title}</h2>
                        </div>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .detail-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 3000;
                opacity: 0;
            }
            
            .modal-overlay {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background: var(--secondary-bg);
                border: 1px solid var(--border-color);
                border-radius: 15px;
                padding: 30px;
                max-width: 700px;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                transform: scale(0.8);
                opacity: 0;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-title {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .modal-symbol {
                font-size: 2rem;
                color: var(--accent-gold);
            }
            
            .modal-header h2 {
                color: var(--accent-gold);
                font-size: 1.8rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 2rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }
            
            .modal-close:hover {
                color: var(--accent-gold);
            }
            
            .modal-body {
                color: var(--text-secondary);
                line-height: 1.8;
            }
        `;
        
        document.head.appendChild(style);
        
        // 绑定关闭事件
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        const closeModal = () => {
            anime({
                targets: modal,
                opacity: [1, 0],
                duration: 300,
                easing: 'easeOutCubic',
                complete: () => {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }
            });
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        
        return modal;
    }
    
    // 理论卡片动画
    animateTheoryCard(card) {
        const levels = card.querySelectorAll('.level');
        
        levels.forEach((level, index) => {
            anime({
                targets: level,
                translateX: [-20, 0],
                opacity: [0.7, 1],
                duration: 300,
                delay: index * 100,
                easing: 'easeOutCubic'
            });
        });
    }
    
    // 优势卡片脉冲效果
    pulseCard(card) {
        anime({
            targets: card.querySelector('.advantage-icon'),
            scale: [1, 1.2, 1],
            duration: 600,
            easing: 'easeInOutSine'
        });
    }
}

// 哲学粒子系统
class PhilosophyParticles {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.symbols = ['☰', '☷', '☳', '☴', '☵', '☲', '☶', '☱', '☯'];
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        this.container.appendChild(this.canvas);
        
        window.addEventListener('resize', () => {
            const rect = this.container.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        });
    }
    
    createParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new PhilosophyParticle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                this.symbols[Math.floor(Math.random() * this.symbols.length)]
            ));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update(this.canvas.width, this.canvas.height);
            particle.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 哲学粒子类
class PhilosophyParticle {
    constructor(x, y, symbol) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.size = Math.random() * 20 + 15;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }
    
    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.02;
        
        // 边界检测
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
        
        // 脉冲效果
        this.opacity = 0.1 + Math.sin(this.pulsePhase) * 0.05;
    }
    
    draw(ctx) {
        ctx.save();
        
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // 发光效果
        ctx.shadowColor = '#d4af37';
        ctx.shadowBlur = 15;
        
        ctx.fillStyle = '#d4af37';
        ctx.font = `${this.size}px 'Noto Sans SC', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(this.symbol, 0, 0);
        
        ctx.restore();
    }
}

// 初始化哲学页面
document.addEventListener('DOMContentLoaded', function() {
    new PhilosophyPage();
});