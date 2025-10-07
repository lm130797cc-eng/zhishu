// 关于页面专用JavaScript
class AboutPage {
    constructor() {
        this.init();
    }
    
    init() {
        this.initParticles();
        this.initScrollAnimations();
        this.initTimelineAnimation();
        this.initContactForm();
        this.initTeamInteraction();
    }
    
    // 初始化粒子系统
    initParticles() {
        const container = document.getElementById('about-particles');
        if (!container) return;
        
        // 创建关于页面粒子系统
        new AboutParticles(container);
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
        document.querySelectorAll('.innovation-card, .value-section, .metric-card, .team-member').forEach(el => {
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
    
    // 初始化时间线动画
    initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            // 初始状态
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            
            // 滚动动画
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: entry.target,
                            opacity: [0, 1],
                            translateX: [-50, 0],
                            duration: 600,
                            delay: index * 200,
                            easing: 'easeOutCubic'
                        });
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(item);
        });
        
        // 时间线连接线动画
        this.animateTimelineLine();
    }
    
    // 时间线连接线动画
    animateTimelineLine() {
        const timeline = document.querySelector('.vision-timeline');
        if (!timeline) return;
        
        // 创建连接线
        const line = document.createElement('div');
        line.className = 'timeline-line';
        line.style.cssText = `
            position: absolute;
            left: 96px;
            top: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, #d4af37, #00ffff);
            transform: scaleY(0);
            transform-origin: top;
            transition: transform 2s ease-out;
        `;
        
        timeline.appendChild(line);
        
        // 滚动时显示连接线
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        line.style.transform = 'scaleY(1)';
                    }, 500);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(timeline);
    }
    
    // 初始化联系表单
    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
        
        // 表单字段动画
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                anime({
                    targets: input,
                    scale: [1, 1.02],
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
            
            input.addEventListener('blur', () => {
                anime({
                    targets: input,
                    scale: [1.02, 1],
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });
    }
    
    // 处理表单提交
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // 显示加载状态
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '发送中...';
        submitBtn.disabled = true;
        
        // 模拟提交过程
        setTimeout(() => {
            // 重置表单
            form.reset();
            
            // 显示成功消息
            this.showSuccessMessage();
            
            // 恢复按钮状态
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    // 显示成功消息
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div class="message-content">
                <div class="message-icon">✅</div>
                <div class="message-text">
                    <h4>发送成功！</h4>
                    <p>感谢您的留言，我们会尽快回复您。</p>
                </div>
            </div>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(26, 31, 46, 0.95);
            border: 1px solid var(--accent-gold);
            border-radius: 10px;
            padding: 20px;
            z-index: 3000;
            backdrop-filter: blur(10px);
            transform: translateX(400px);
            opacity: 0;
        `;
        
        const messageContent = message.querySelector('.message-content');
        messageContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
        `;
        
        const messageIcon = message.querySelector('.message-icon');
        messageIcon.style.cssText = `
            font-size: 2rem;
            flex-shrink: 0;
        `;
        
        const messageText = message.querySelector('.message-text');
        messageText.style.cssText = `
            color: var(--text-secondary);
        `;
        
        const messageTitle = message.querySelector('h4');
        messageTitle.style.cssText = `
            color: var(--accent-gold);
            margin-bottom: 5px;
        `;
        
        document.body.appendChild(message);
        
        // 动画显示
        anime({
            targets: message,
            translateX: [400, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutBack'
        });
        
        // 自动消失
        setTimeout(() => {
            anime({
                targets: message,
                translateX: [0, 400],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInCubic',
                complete: () => {
                    document.body.removeChild(message);
                }
            });
        }, 4000);
    }
    
    // 初始化团队成员交互
    initTeamInteraction() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                this.highlightTeamMember(member);
            });
            
            member.addEventListener('mouseleave', () => {
                this.unhighlightTeamMember(member);
            });
            
            member.addEventListener('click', () => {
                this.showMemberDetails(member);
            });
        });
    }
    
    // 高亮团队成员
    highlightTeamMember(member) {
        anime({
            targets: member,
            scale: [1, 1.02],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        // 添加发光效果
        member.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.3)';
        
        // 技能标签动画
        const skills = member.querySelectorAll('.skill-tag');
        skills.forEach((skill, index) => {
            anime({
                targets: skill,
                scale: [1, 1.1, 1],
                duration: 400,
                delay: index * 100,
                easing: 'easeInOutSine'
            });
        });
    }
    
    // 取消高亮
    unhighlightTeamMember(member) {
        anime({
            targets: member,
            scale: [1.02, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        member.style.boxShadow = 'none';
    }
    
    // 显示成员详情
    showMemberDetails(member) {
        const name = member.querySelector('h3').textContent;
        const title = member.querySelector('.member-title').textContent;
        const desc = member.querySelector('.member-desc').textContent;
        const skills = Array.from(member.querySelectorAll('.skill-tag')).map(tag => tag.textContent);
        
        // 创建成员详情模态框
        const modal = this.createMemberModal(name, title, desc, skills);
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
    
    // 创建成员详情模态框
    createMemberModal(name, title, desc, skills) {
        const modal = document.createElement('div');
        modal.className = 'member-detail-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${name}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="member-detail">
                            <div class="member-avatar-large">
                                <div class="avatar-placeholder-large">${this.getAvatarByName(name)}</div>
                            </div>
                            <div class="member-info-detail">
                                <h3>${title}</h3>
                                <p>${desc}</p>
                                <div class="member-skills-detail">
                                    <h4>专业技能</h4>
                                    <div class="skills-list">
                                        ${skills.map(skill => `
                                            <span class="skill-tag-detail">${skill}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .member-detail-modal {
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
            
            .member-detail {
                display: flex;
                gap: 30px;
                align-items: flex-start;
            }
            
            .member-avatar-large {
                flex-shrink: 0;
            }
            
            .avatar-placeholder-large {
                width: 120px;
                height: 120px;
                background: var(--gradient-accent);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: var(--primary-bg);
            }
            
            .member-info-detail {
                flex: 1;
            }
            
            .member-info-detail h3 {
                color: var(--accent-cyan);
                font-size: 1.3rem;
                margin-bottom: 15px;
            }
            
            .member-info-detail p {
                color: var(--text-secondary);
                line-height: 1.8;
                margin-bottom: 20px;
            }
            
            .member-skills-detail h4 {
                color: var(--accent-gold);
                font-size: 1.1rem;
                margin-bottom: 15px;
            }
            
            .skills-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .skill-tag-detail {
                background: rgba(212, 175, 55, 0.2);
                border: 1px solid rgba(212, 175, 55, 0.4);
                border-radius: 15px;
                padding: 6px 12px;
                font-size: 0.9rem;
                color: var(--accent-gold);
            }
            
            @media (max-width: 768px) {
                .member-detail {
                    flex-direction: column;
                    text-align: center;
                }
                
                .avatar-placeholder-large {
                    width: 100px;
                    height: 100px;
                    font-size: 2.5rem;
                }
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
    
    // 根据姓名获取头像
    getAvatarByName(name) {
        const avatars = {
            '李明智': '👨‍🔬',
            '王雅琴': '👩‍🔬',
            '张技术': '👨‍💻',
            '陈算法': '👩‍💻',
            '刘设计': '👨‍🎨',
            '赵工程': '👩‍🔧'
        };
        return avatars[name] || '👤';
    }
}

// 关于页面粒子系统
class AboutParticles {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.symbols = ['☰', '☷', '☳', '☴', '☵', '☲', '☶', '☱'];
        
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
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new AboutParticle(
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

// 关于页面粒子类
class AboutParticle {
    constructor(x, y, symbol) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.2 + 0.1;
        this.size = Math.random() * 15 + 20;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }
    
    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.01;
        
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
        ctx.shadowBlur = 10;
        
        ctx.fillStyle = '#d4af37';
        ctx.font = `${this.size}px 'Noto Sans SC', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(this.symbol, 0, 0);
        
        ctx.restore();
    }
}

// 初始化关于页面
document.addEventListener('DOMContentLoaded', function() {
    new AboutPage();
});