// 粒子系统 - 二进制到八卦的视觉效果
class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.binaryStream = [];
        this.animationId = null;
        this.canvas = null;
        this.ctx = null;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.generateBinaryStream();
        this.createParticles();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        this.container.appendChild(this.canvas);
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // 重新生成粒子以适应新尺寸
        this.particles = [];
        this.createParticles();
    }
    
    generateBinaryStream() {
        // 生成随机二进制流
        this.binaryStream = [];
        for (let i = 0; i < 1000; i++) {
            this.binaryStream.push(Math.random() > 0.5 ? '1' : '0');
        }
    }
    
    createParticles() {
        const particleCount = Math.min(50, Math.floor(this.canvas.width / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new BinaryParticle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                this.binaryStream[Math.floor(Math.random() * this.binaryStream.length)]
            ));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 更新和绘制粒子
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
            
            // 检查是否需要转换为八卦
            if (particle.isReadyForTransformation()) {
                this.transformToBagua(particle);
            }
        });
        
        // 添加连线效果
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    transformToBagua(particle) {
        // 随机选择一个八卦符号
        const baguaSymbols = ['☰', '☷', '☳', '☴', '☵', '☲', '☶', '☱'];
        const randomSymbol = baguaSymbols[Math.floor(Math.random() * baguaSymbols.length)];
        
        // 创建转换动画
        const transformAnimation = new TransformationAnimation(
            particle.x,
            particle.y,
            particle.value,
            randomSymbol
        );
        
        transformAnimation.animate(this.ctx);
        
        // 重置粒子
        particle.reset();
    }
    
    drawConnections() {
        const maxDistance = 100;
        
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
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// 二进制粒子类
class BinaryParticle {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.size = Math.random() * 4 + 12;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
        this.transformationTimer = Math.random() * 300 + 200;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.transformationTimer--;
        
        // 边界检测
        if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
        
        // 生命周期
        this.opacity = this.life / this.maxLife;
        
        if (this.life <= 0) {
            this.reset();
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00ffff';
        ctx.font = `${this.size}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 添加发光效果
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        
        ctx.fillText(this.value, this.x, this.y);
        ctx.restore();
    }
    
    isReadyForTransformation() {
        return this.transformationTimer <= 0;
    }
    
    reset() {
        // 重置粒子属性
        this.x = Math.random() * (this.canvasWidth || 800);
        this.y = Math.random() * (this.canvasHeight || 600);
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.value = Math.random() > 0.5 ? '1' : '0';
        this.opacity = Math.random() * 0.8 + 0.2;
        this.size = Math.random() * 4 + 12;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
        this.transformationTimer = Math.random() * 300 + 200;
    }
    
    setCanvasDimensions(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }
}

// 转换动画类
class TransformationAnimation {
    constructor(x, y, fromValue, toValue) {
        this.x = x;
        this.y = y;
        this.fromValue = fromValue;
        this.toValue = toValue;
        this.progress = 0;
        this.duration = 60; // 帧数
        this.complete = false;
    }
    
    animate(ctx) {
        if (this.complete) return;
        
        this.progress++;
        
        const t = this.progress / this.duration;
        const easeT = this.easeInOutCubic(t);
        
        ctx.save();
        
        // 计算当前状态
        const currentSize = 16 + easeT * 8;
        const opacity = 1 - Math.abs(easeT - 0.5) * 2;
        
        ctx.globalAlpha = opacity;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (t < 0.5) {
            // 显示二进制
            ctx.fillStyle = '#00ffff';
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 15;
            ctx.font = `${currentSize}px 'Courier New', monospace`;
            ctx.fillText(this.fromValue, this.x, this.y);
        } else {
            // 显示八卦符号
            ctx.fillStyle = '#d4af37';
            ctx.shadowColor = '#d4af37';
            ctx.shadowBlur = 20;
            ctx.font = `${currentSize}px 'Noto Sans SC', sans-serif`;
            ctx.fillText(this.toValue, this.x, this.y);
        }
        
        ctx.restore();
        
        if (this.progress >= this.duration) {
            this.complete = true;
        }
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
}

// 八卦粒子系统
class BaguaParticleSystem {
    constructor(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.baguaParticles = [];
        this.rotation = 0;
        this.init();
    }
    
    init() {
        const trigrams = [
            { symbol: '☰', name: '乾', angle: 0 },
            { symbol: '☱', name: '兑', angle: 45 },
            { symbol: '☲', name: '离', angle: 90 },
            { symbol: '☳', name: '震', angle: 135 },
            { symbol: '☴', name: '巽', angle: 180 },
            { symbol: '☵', name: '坎', angle: 225 },
            { symbol: '☶', name: '艮', angle: 270 },
            { symbol: '☷', name: '坤', angle: 315 }
        ];
        
        trigrams.forEach(trigram => {
            const angleRad = (trigram.angle * Math.PI) / 180;
            const radius = 120;
            
            this.baguaParticles.push(new BaguaParticle(
                this.centerX + Math.cos(angleRad) * radius,
                this.centerY + Math.sin(angleRad) * radius,
                trigram.symbol,
                trigram.name,
                trigram.angle
            ));
        });
    }
    
    update() {
        this.rotation += 0.005;
        
        this.baguaParticles.forEach(particle => {
            particle.update(this.centerX, this.centerY, this.rotation);
        });
    }
    
    draw(ctx) {
        this.baguaParticles.forEach(particle => {
            particle.draw(ctx);
        });
        
        // 绘制连接线
        this.drawConnections(ctx);
    }
    
    drawConnections(ctx) {
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let i = 0; i < this.baguaParticles.length; i++) {
            const particle = this.baguaParticles[i];
            if (i === 0) {
                ctx.moveTo(particle.x, particle.y);
            } else {
                ctx.lineTo(particle.x, particle.y);
            }
        }
        
        ctx.closePath();
        ctx.stroke();
    }
}

// 八卦粒子类
class BaguaParticle {
    constructor(x, y, symbol, name, angle) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.name = name;
        this.angle = angle;
        this.baseX = x;
        this.baseY = y;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.glowIntensity = 0.5 + Math.random() * 0.5;
    }
    
    update(centerX, centerY, rotation) {
        const angleRad = ((this.angle * Math.PI) / 180) + rotation;
        const radius = 120 + Math.sin(this.pulsePhase) * 10;
        
        this.x = centerX + Math.cos(angleRad) * radius;
        this.y = centerY + Math.sin(angleRad) * radius;
        
        this.pulsePhase += 0.02;
        this.glowIntensity = 0.5 + Math.sin(this.pulsePhase * 2) * 0.3;
    }
    
    draw(ctx) {
        ctx.save();
        
        // 发光效果
        ctx.shadowColor = '#d4af37';
        ctx.shadowBlur = 20 * this.glowIntensity;
        
        // 绘制八卦符号
        ctx.fillStyle = '#d4af37';
        ctx.font = '24px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.8 + this.glowIntensity * 0.2;
        
        ctx.fillText(this.symbol, this.x, this.y);
        
        // 绘制名称
        ctx.font = '12px "Noto Sans SC", sans-serif';
        ctx.fillStyle = '#b8c5d1';
        ctx.shadowBlur = 5;
        ctx.fillText(this.name, this.x, this.y + 25);
        
        ctx.restore();
    }
}

// 初始化粒子系统
document.addEventListener('DOMContentLoaded', function() {
    let particleSystem = null;
    let baguaSystem = null;
    
    // 等待容器加载
    const initParticles = () => {
        const container = document.getElementById('particles-container');
        if (container && !particleSystem) {
            particleSystem = new ParticleSystem('particles-container');
        }
        
        // 初始化八卦粒子系统
        if (!baguaSystem && container) {
            const rect = container.getBoundingClientRect();
            baguaSystem = new BaguaParticleSystem(rect.width / 2, rect.height / 2);
            
            // 在粒子系统的动画循环中更新八卦系统
            const originalAnimate = particleSystem.animate.bind(particleSystem);
            particleSystem.animate = function() {
                originalAnimate();
                if (baguaSystem) {
                    baguaSystem.update();
                    baguaSystem.draw(particleSystem.ctx);
                }
            };
        }
    };
    
    initParticles();
    
    // 定期重新初始化以适应页面变化
    setInterval(initParticles, 1000);
    
    // 页面卸载时清理
    window.addEventListener('beforeunload', () => {
        if (particleSystem) {
            particleSystem.destroy();
        }
    });
});