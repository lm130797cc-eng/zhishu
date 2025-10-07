// 技术页面专用JavaScript
class TechnologyPage {
    constructor() {
        this.charts = {};
        this.init();
    }
    
    init() {
        this.initParticles();
        this.initEncodingChart();
        this.initPerformanceCharts();
        this.initScrollAnimations();
        this.initCodeHighlighting();
        this.initArchitectureInteraction();
    }
    
    // 初始化粒子系统
    initParticles() {
        const container = document.getElementById('tech-particles');
        if (!container) return;
        
        // 创建技术粒子系统
        new TechParticles(container);
    }
    
    // 初始化编码图表
    initEncodingChart() {
        const container = document.getElementById('encoding-chart');
        if (!container) return;
        
        const chart = echarts.init(container);
        
        // 编码效率对比数据
        const data = [
            { name: '二进制', efficiency: 100, complexity: 100 },
            { name: 'ASCII', efficiency: 87, complexity: 75 },
            { name: 'Unicode', efficiency: 65, complexity: 85 },
            { name: '八卦编码', efficiency: 133, complexity: 45 }
        ];
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(26, 31, 46, 0.95)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
                textStyle: { color: '#ffffff' }
            },
            legend: {
                data: ['编码效率', '复杂度'],
                textStyle: { color: '#b8c5d1' },
                top: 20
            },
            xAxis: {
                type: 'category',
                data: data.map(d => d.name),
                axisLine: { lineStyle: { color: '#d4af37' } },
                axisLabel: { color: '#b8c5d1' }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: '#d4af37' } },
                axisLabel: { color: '#b8c5d1' },
                splitLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.2)' } }
            },
            series: [
                {
                    name: '编码效率',
                    type: 'bar',
                    data: data.map(d => d.efficiency),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#d4af37' },
                            { offset: 1, color: '#00ffff' }
                        ])
                    }
                },
                {
                    name: '复杂度',
                    type: 'line',
                    data: data.map(d => d.complexity),
                    lineStyle: { color: '#ff4500', width: 3 },
                    itemStyle: { color: '#ff4500' }
                }
            ]
        };
        
        chart.setOption(option);
        this.charts.encoding = chart;
        
        // 响应式调整
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }
    
    // 初始化性能图表
    initPerformanceCharts() {
        this.initEfficiencyChart();
        this.initSpeedChart();
        this.initMemoryChart();
        this.initAccuracyChart();
    }
    
    initEfficiencyChart() {
        const container = document.getElementById('efficiency-chart');
        if (!container) return;
        
        const chart = echarts.init(container);
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(26, 31, 46, 0.95)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
                textStyle: { color: '#ffffff' }
            },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                data: [
                    { value: 35, name: '八卦编码', itemStyle: { color: '#d4af37' } },
                    { value: 25, name: '二进制', itemStyle: { color: '#00ffff' } },
                    { value: 20, name: 'ASCII', itemStyle: { color: '#00ff00' } },
                    { value: 20, name: 'Unicode', itemStyle: { color: '#ff4500' } }
                ],
                label: {
                    color: '#b8c5d1',
                    fontSize: 12
                },
                labelLine: {
                    lineStyle: { color: '#d4af37' }
                }
            }]
        };
        
        chart.setOption(option);
        this.charts.efficiency = chart;
    }
    
    initSpeedChart() {
        const container = document.getElementById('speed-chart');
        if (!container) return;
        
        const chart = echarts.init(container);
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(26, 31, 46, 0.95)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
                textStyle: { color: '#ffffff' }
            },
            xAxis: {
                type: 'category',
                data: ['1KB', '10KB', '100KB', '1MB', '10MB'],
                axisLine: { lineStyle: { color: '#d4af37' } },
                axisLabel: { color: '#b8c5d1' }
            },
            yAxis: {
                type: 'value',
                name: '处理时间(ms)',
                nameTextStyle: { color: '#b8c5d1' },
                axisLine: { lineStyle: { color: '#d4af37' } },
                axisLabel: { color: '#b8c5d1' },
                splitLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.2)' } }
            },
            series: [{
                type: 'line',
                data: [0.1, 0.8, 7.2, 68, 650],
                lineStyle: { color: '#00ff00', width: 3 },
                itemStyle: { color: '#00ff00' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0, 255, 0, 0.3)' },
                        { offset: 1, color: 'rgba(0, 255, 0, 0.1)' }
                    ])
                }
            }]
        };
        
        chart.setOption(option);
        this.charts.speed = chart;
    }
    
    initMemoryChart() {
        const container = document.getElementById('memory-chart');
        if (!container) return;
        
        const chart = echarts.init(container);
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(26, 31, 46, 0.95)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
                textStyle: { color: '#ffffff' }
            },
            xAxis: {
                type: 'category',
                data: ['编码', '存储', '处理', '传输', '解码'],
                axisLine: { lineStyle: { color: '#d4af37' } },
                axisLabel: { color: '#b8c5d1' }
            },
            yAxis: {
                type: 'value',
                name: '内存使用(MB)',
                nameTextStyle: { color: '#b8c5d1' },
                axisLine: { lineStyle: { color: '#d4af37' } },
                axisLabel: { color: '#b8c5d1' },
                splitLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.2)' } }
            },
            series: [{
                type: 'bar',
                data: [12, 45, 28, 15, 8],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#d4af37' },
                        { offset: 1, color: '#00ffff' }
                    ])
                }
            }]
        };
        
        chart.setOption(option);
        this.charts.memory = chart;
    }
    
    initAccuracyChart() {
        const container = document.getElementById('accuracy-chart');
        if (!container) return;
        
        const chart = echarts.init(container);
        
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(26, 31, 46, 0.95)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
                textStyle: { color: '#ffffff' }
            },
            radar: {
                indicator: [
                    { name: '语义准确性', max: 100 },
                    { name: '处理速度', max: 100 },
                    { name: '资源效率', max: 100 },
                    { name: '可扩展性', max: 100 },
                    { name: '稳定性', max: 100 },
                    { name: '易用性', max: 100 }
                ],
                axisLine: { lineStyle: { color: '#d4af37' } },
                axisLabel: { color: '#b8c5d1' },
                splitLine: { lineStyle: { color: 'rgba(212, 175, 55, 0.2)' } }
            },
            series: [{
                type: 'radar',
                data: [{
                    value: [95, 88, 92, 85, 90, 87],
                    name: '八卦系统',
                    itemStyle: { color: '#d4af37' },
                    areaStyle: { color: 'rgba(212, 175, 55, 0.3)' }
                }]
            }]
        };
        
        chart.setOption(option);
        this.charts.accuracy = chart;
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
        document.querySelectorAll('.algorithm-card, .performance-card, .case-card').forEach(el => {
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
    
    // 初始化代码高亮
    initCodeHighlighting() {
        // 添加代码块复制功能
        document.querySelectorAll('.code-block').forEach(block => {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = '复制';
            copyBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: var(--accent-gold);
                color: var(--primary-bg);
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 0.8rem;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            `;
            
            block.style.position = 'relative';
            block.appendChild(copyBtn);
            
            copyBtn.addEventListener('click', () => {
                const code = block.querySelector('code').textContent;
                navigator.clipboard.writeText(code).then(() => {
                    copyBtn.textContent = '已复制!';
                    setTimeout(() => {
                        copyBtn.textContent = '复制';
                    }, 2000);
                });
            });
        });
    }
    
    // 初始化架构交互
    initArchitectureInteraction() {
        document.querySelectorAll('.layer').forEach(layer => {
            layer.addEventListener('mouseenter', () => {
                this.highlightLayer(layer);
            });
            
            layer.addEventListener('mouseleave', () => {
                this.unhighlightLayer(layer);
            });
            
            layer.addEventListener('click', () => {
                this.showLayerDetails(layer);
            });
        });
    }
    
    // 高亮层级
    highlightLayer(layer) {
        anime({
            targets: layer,
            scale: [1, 1.02],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        // 添加发光效果
        layer.style.boxShadow = '0 10px 25px rgba(212, 175, 55, 0.3)';
        
        // 高亮相关的层级
        const allLayers = document.querySelectorAll('.layer');
        allLayers.forEach(l => {
            if (l !== layer) {
                l.style.opacity = '0.7';
            }
        });
    }
    
    // 取消高亮
    unhighlightLayer(layer) {
        anime({
            targets: layer,
            scale: [1.02, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        layer.style.boxShadow = 'none';
        
        // 恢复所有层级
        const allLayers = document.querySelectorAll('.layer');
        allLayers.forEach(l => {
            l.style.opacity = '1';
        });
    }
    
    // 显示层级详情
    showLayerDetails(layer) {
        const layerName = layer.querySelector('h4').textContent;
        const items = Array.from(layer.querySelectorAll('.layer-item')).map(item => item.textContent);
        
        // 创建详情模态框
        const modal = this.createLayerModal(layerName, items);
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
    
    // 创建层级详情模态框
    createLayerModal(layerName, items) {
        const modal = document.createElement('div');
        modal.className = 'layer-detail-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${layerName}详情</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="layer-items-detail">
                            ${items.map(item => `
                                <div class="layer-item-detail">
                                    <div class="item-icon">▶</div>
                                    <div class="item-content">
                                        <h4>${item}</h4>
                                        <p>${this.getItemDescription(item)}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .layer-detail-modal {
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
                max-width: 600px;
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
            
            .layer-items-detail {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .layer-item-detail {
                display: flex;
                align-items: flex-start;
                gap: 15px;
                padding: 15px;
                background: rgba(10, 14, 26, 0.3);
                border-radius: 8px;
                border-left: 3px solid var(--accent-gold);
            }
            
            .item-icon {
                color: var(--accent-gold);
                font-size: 1.2rem;
                margin-top: 2px;
            }
            
            .item-content h4 {
                color: var(--accent-cyan);
                font-size: 1.1rem;
                margin-bottom: 8px;
            }
            
            .item-content p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin: 0;
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
    
    // 获取项目描述
    getItemDescription(item) {
        const descriptions = {
            '智能对话': '基于八卦哲学的自然语言理解和生成系统',
            '文本分析': '深度语义分析和情感识别算法',
            '决策支持': '多维度权衡的智能决策引擎',
            '创意生成': '基于变化理论的创意启发系统',
            '语义理解': '八卦符号的语义映射和解析',
            '推理引擎': '基于五行相生相克关系的推理算法',
            '学习算法': '自适应的八卦编码优化算法',
            '记忆系统': '基于八卦结构的知识存储和检索',
            '八卦转换': '二进制与八卦符号的双向转换',
            '语义映射': '符号与语义的智能对应关系',
            '模式识别': '基于八卦结构的模式发现算法',
            '关系推理': '五行关系的逻辑推理引擎',
            '数据存储': '分布式八卦结构数据库',
            '计算引擎': '高性能并行计算框架',
            '网络通信': '八卦编码的数据传输协议',
            '安全机制': '基于八卦哲学的加密认证系统'
        };
        
        return descriptions[item] || '功能描述待完善';
    }
    
    // 销毁所有图表
    destroy() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.dispose) {
                chart.dispose();
            }
        });
    }
}

// 技术粒子系统
class TechParticles {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.connections = [];
        
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
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new TechParticle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 更新和绘制粒子
        this.particles.forEach(particle => {
            particle.update(this.canvas.width, this.canvas.height);
            particle.draw(this.ctx);
        });
        
        // 绘制连接线
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        const maxDistance = 120;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const distance = this.getDistance(
                    this.particles[i].x, this.particles[i].y,
                    this.particles[j].x, this.particles[j].y
                );
                
                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    this.ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}

// 技术粒子类
class TechParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }
    
    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += 0.02;
        
        // 边界检测
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        
        // 脉冲效果
        this.opacity = 0.2 + Math.sin(this.pulsePhase) * 0.1;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#d4af37';
        ctx.shadowColor = '#d4af37';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// 初始化技术页面
document.addEventListener('DOMContentLoaded', function() {
    new TechnologyPage();
    
    // 响应式图表调整
    window.addEventListener('resize', () => {
        Object.values(window.techPage?.charts || {}).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    });
});