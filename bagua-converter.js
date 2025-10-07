// 八卦编码转换器
class BaguaConverter {
    constructor() {
        this.binaryToBagua = {
            '000': '坤',
            '001': '艮',
            '010': '坎',
            '011': '巽',
            '100': '震',
            '101': '离',
            '110': '兑',
            '111': '乾'
        };
        
        this.baguaToBinary = {
            '坤': '000',
            '艮': '001',
            '坎': '010',
            '巽': '011',
            '震': '100',
            '离': '101',
            '兑': '110',
            '乾': '111'
        };
        
        this.trigramInfo = {
            '乾': { name: '乾', symbol: '☰', meaning: '天、刚健、创造', element: '金', nature: '天' },
            '坤': { name: '坤', symbol: '☷', meaning: '地、柔顺、包容', element: '土', nature: '地' },
            '震': { name: '震', symbol: '☳', meaning: '雷、震动、奋起', element: '木', nature: '雷' },
            '巽': { name: '巽', symbol: '☴', meaning: '风、顺从、渗透', element: '木', nature: '风' },
            '坎': { name: '坎', symbol: '☵', meaning: '水、险陷、智慧', element: '水', nature: '水' },
            '离': { name: '离', symbol: '☲', meaning: '火、光明、依附', element: '火', nature: '火' },
            '艮': { name: '艮', symbol: '☶', meaning: '山、静止、阻止', element: '土', nature: '山' },
            '兑': { name: '兑', symbol: '☱', meaning: '泽、喜悦、沟通', element: '金', nature: '泽' }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initInputHandlers();
    }
    
    bindEvents() {
        const textInput = document.getElementById('text-input');
        if (textInput) {
            textInput.addEventListener('input', () => this.handleInput());
            textInput.addEventListener('keyup', () => this.handleInput());
        }
        
        // 输入类型切换
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                optionBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.handleInput();
            });
        });
    }
    
    initInputHandlers() {
        // 初始化占位符
        this.updateOutput('', []);
    }
    
    handleInput() {
        const input = document.getElementById('text-input').value;
        const inputType = document.querySelector('.option-btn.active').dataset.type;
        
        if (!input.trim()) {
            this.updateOutput('', []);
            return;
        }
        
        let result = '';
        let meanings = [];
        
        switch (inputType) {
            case 'text':
                result = this.convertTextToBagua(input);
                meanings = this.getMeaningsFromBagua(result);
                break;
            case 'number':
                result = this.convertNumberToBagua(input);
                meanings = this.getMeaningsFromBagua(result);
                break;
            case 'binary':
                result = this.convertBinaryToBagua(input);
                meanings = this.getMeaningsFromBagua(result);
                break;
        }
        
        this.updateOutput(result, meanings);
        this.animateConversion();
    }
    
    convertTextToBagua(text) {
        const binaryString = this.textToBinary(text);
        return this.binaryToBaguaString(binaryString);
    }
    
    convertNumberToBagua(number) {
        const num = parseInt(number);
        if (isNaN(num)) return '';
        
        const binaryString = num.toString(2);
        return this.binaryToBaguaString(binaryString);
    }
    
    convertBinaryToBagua(binary) {
        // 清理二进制字符串
        const cleanBinary = binary.replace(/[^01]/g, '');
        return this.binaryToBaguaString(cleanBinary);
    }
    
    textToBinary(text) {
        let binary = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const charBinary = charCode.toString(2).padStart(16, '0');
            binary += charBinary;
        }
        return binary;
    }
    
    binaryToBaguaString(binary) {
        let baguaString = '';
        
        // 确保长度是3的倍数
        const paddedBinary = binary.padEnd(Math.ceil(binary.length / 3) * 3, '0');
        
        for (let i = 0; i < paddedBinary.length; i += 3) {
            const chunk = paddedBinary.substr(i, 3);
            if (chunk.length === 3) {
                const bagua = this.binaryToBagua[chunk] || '坤';
                baguaString += this.trigramInfo[bagua].symbol;
            }
        }
        
        return baguaString;
    }
    
    getMeaningsFromBagua(baguaString) {
        const meanings = [];
        const symbols = Array.from(baguaString);
        
        // 映射符号到八卦名称
        const symbolToName = {};
        Object.entries(this.trigramInfo).forEach(([name, info]) => {
            symbolToName[info.symbol] = name;
        });
        
        symbols.forEach(symbol => {
            const name = symbolToName[symbol];
            if (name && this.trigramInfo[name]) {
                meanings.push({
                    symbol: symbol,
                    name: name,
                    meaning: this.trigramInfo[name].meaning,
                    element: this.trigramInfo[name].element,
                    nature: this.trigramInfo[name].nature
                });
            }
        });
        
        return meanings;
    }
    
    updateOutput(baguaString, meanings) {
        const outputElement = document.getElementById('bagua-output');
        const meaningElement = document.getElementById('philosophy-meaning');
        const lengthElement = document.getElementById('code-length');
        const ratioElement = document.getElementById('compression-ratio');
        
        if (baguaString) {
            // 更新八卦输出
            outputElement.innerHTML = this.formatBaguaOutput(baguaString);
            
            // 更新哲学含义
            meaningElement.innerHTML = this.formatPhilosophyOutput(meanings);
            
            // 更新统计信息
            const originalLength = document.getElementById('text-input').value.length;
            lengthElement.textContent = baguaString.length;
            
            if (originalLength > 0) {
                const ratio = ((baguaString.length / originalLength) * 100).toFixed(1);
                ratioElement.textContent = ratio + '%';
            } else {
                ratioElement.textContent = '0%';
            }
        } else {
            outputElement.innerHTML = '<div class="placeholder">请输入内容开始转换</div>';
            meaningElement.innerHTML = '<div class="placeholder">转换结果将显示对应的哲学含义</div>';
            lengthElement.textContent = '0';
            ratioElement.textContent = '0%';
        }
    }
    
    formatBaguaOutput(baguaString) {
        if (!baguaString) return '<div class="placeholder">请输入内容开始转换</div>';
        
        let html = '';
        const symbols = Array.from(baguaString);
        
        symbols.forEach((symbol, index) => {
            html += `<span class="bagua-symbol" style="
                display: inline-block;
                margin: 2px;
                padding: 5px;
                border-radius: 4px;
                background: rgba(212, 175, 55, 0.1);
                border: 1px solid rgba(212, 175, 55, 0.3);
                animation: fadeIn 0.5s ease-out ${index * 0.1}s both;
            ">${symbol}</span>`;
        });
        
        return html;
    }
    
    formatPhilosophyOutput(meanings) {
        if (!meanings || meanings.length === 0) {
            return '<div class="placeholder">转换结果将显示对应的哲学含义</div>';
        }
        
        let html = '<div class="philosophy-analysis">';
        
        // 显示前几个八卦的详细含义
        meanings.slice(0, 3).forEach((meaning, index) => {
            html += `
                <div class="meaning-item" style="
                    margin-bottom: 15px;
                    padding: 15px;
                    background: rgba(10, 14, 26, 0.3);
                    border-radius: 8px;
                    border-left: 3px solid var(--accent-gold);
                    animation: slideInLeft 0.5s ease-out ${index * 0.1}s both;
                ">
                    <div class="meaning-header">
                        <span class="meaning-symbol" style="
                            font-size: 24px;
                            color: var(--accent-gold);
                            margin-right: 10px;
                        ">${meaning.symbol}</span>
                        <span class="meaning-name" style="
                            font-weight: 600;
                            color: var(--accent-gold);
                        ">${meaning.name}</span>
                    </div>
                    <div class="meaning-content" style="
                        margin-top: 8px;
                        color: var(--text-secondary);
                        line-height: 1.6;
                    ">
                        <div><strong>含义:</strong> ${meaning.meaning}</div>
                        <div><strong>五行:</strong> ${meaning.element} | <strong>自然:</strong> ${meaning.nature}</div>
                    </div>
                </div>
            `;
        });
        
        // 如果有更多八卦，显示总结
        if (meanings.length > 3) {
            const elementCount = {};
            meanings.forEach(m => {
                elementCount[m.element] = (elementCount[m.element] || 0) + 1;
            });
            
            const dominantElement = Object.keys(elementCount).reduce((a, b) => 
                elementCount[a] > elementCount[b] ? a : b
            );
            
            html += `
                <div class="meaning-summary" style="
                    margin-top: 20px;
                    padding: 20px;
                    background: rgba(212, 175, 55, 0.1);
                    border-radius: 10px;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                ">
                    <h4 style="color: var(--accent-gold); margin-bottom: 10px;">整体分析</h4>
                    <p style="color: var(--text-secondary); line-height: 1.6;">
                        此序列包含 ${meanings.length} 个八卦符号，
                        主要五行属性为<strong>${dominantElement}</strong>，
                        体现了${this.getElementCharacteristic(dominantElement)}的特质。
                    </p>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }
    
    getElementCharacteristic(element) {
        const characteristics = {
            '金': '刚毅、果断、有决断力',
            '木': '生长、发展、有创造力',
            '水': '智慧、灵活、适应性强',
            '火': '热情、光明、有感染力',
            '土': '稳重、包容、有承载力'
        };
        return characteristics[element] || '平衡和谐';
    }
    
    animateConversion() {
        // 添加转换动画效果
        const outputElement = document.getElementById('bagua-output');
        const meaningElement = document.getElementById('philosophy-meaning');
        
        // 添加闪烁效果
        outputElement.style.transition = 'all 0.3s ease';
        outputElement.style.transform = 'scale(1.02)';
        outputElement.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.3)';
        
        setTimeout(() => {
            outputElement.style.transform = 'scale(1)';
            outputElement.style.boxShadow = 'none';
        }, 300);
        
        // 含义区域的动画
        if (meaningElement) {
            meaningElement.style.opacity = '0.7';
            setTimeout(() => {
                meaningElement.style.opacity = '1';
            }, 200);
        }
    }
    
    // 反向转换：八卦到文本
    baguaToText(baguaString) {
        const symbolToName = {};
        Object.entries(this.trigramInfo).forEach(([name, info]) => {
            symbolToName[info.symbol] = name;
        });
        
        let binaryString = '';
        const symbols = Array.from(baguaString);
        
        symbols.forEach(symbol => {
            const name = symbolToName[symbol];
            if (name) {
                binaryString += this.baguaToBinary[name];
            }
        });
        
        // 二进制到文本
        let text = '';
        for (let i = 0; i < binaryString.length; i += 16) {
            const chunk = binaryString.substr(i, 16);
            if (chunk.length === 16) {
                const charCode = parseInt(chunk, 2);
                if (charCode > 0 && charCode < 65536) {
                    text += String.fromCharCode(charCode);
                }
            }
        }
        
        return text;
    }
}

// 初始化转换器
document.addEventListener('DOMContentLoaded', function() {
    window.baguaConverter = new BaguaConverter();
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    .bagua-symbol:hover {
        transform: scale(1.1) !important;
        transition: transform 0.2s ease;
    }
    
    .meaning-header {
        display: flex;
        align-items: center;
    }
`;
document.head.appendChild(style);