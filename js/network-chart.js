// 八卦关系网络图表
class BaguaNetworkChart {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.chart = null;
        this.nodes = [];
        this.links = [];
        this.init();
    }
    
    init() {
        this.initChart();
        this.createNodes();
        this.createLinks();
        this.render();
        this.bindEvents();
    }
    
    initChart() {
        this.chart = echarts.init(this.container);
        
        // 设置图表选项
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    if (params.dataType === 'node') {
                        return this.formatNodeTooltip(params.data);
                    } else {
                        return this.formatLinkTooltip(params.data);
                    }
                },
                backgroundColor: 'rgba(26, 31, 46, 0.95)',
                borderColor: 'rgba(212, 175, 55, 0.3)',
                textStyle: {
                    color: '#ffffff'
                }
            },
            series: [{
                type: 'graph',
                layout: 'force',
                animation: true,
                roam: true,
                draggable: true,
                focusNodeAdjacency: true,
                force: {
                    repulsion: 1000,
                    gravity: 0.1,
                    edgeLength: 150,
                    layoutAnimation: true
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 3
                    }
                },
                lineStyle: {
                    color: 'rgba(212, 175, 55, 0.6)',
                    width: 2,
                    curveness: 0.1
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#d4af37'
                },
                symbolSize: 80,
                data: [],
                links: []
            }]
        };
        
        this.chart.setOption(option);
    }
    
    createNodes() {
        const trigrams = [
            { name: '乾', symbol: '☰', element: '金', nature: '天', x: 0, y: -100 },
            { name: '兑', symbol: '☱', element: '金', nature: '泽', x: 70, y: -70 },
            { name: '离', symbol: '☲', element: '火', nature: '火', x: 100, y: 0 },
            { name: '震', symbol: '☳', element: '木', nature: '雷', x: 70, y: 70 },
            { name: '巽', symbol: '☴', element: '木', nature: '风', x: -70, y: -70 },
            { name: '坎', symbol: '☵', element: '水', nature: '水', x: -100, y: 0 },
            { name: '艮', symbol: '☶', element: '土', nature: '山', x: -70, y: 70 },
            { name: '坤', symbol: '☷', element: '土', nature: '地', x: 0, y: 100 }
        ];
        
        this.nodes = trigrams.map(trigram => ({
            id: trigram.name,
            name: trigram.symbol,
            trigramName: trigram.name,
            element: trigram.element,
            nature: trigram.nature,
            x: trigram.x,
            y: trigram.y,
            itemStyle: {
                color: this.getElementColor(trigram.element),
                borderColor: '#d4af37',
                borderWidth: 2,
                shadowColor: this.getElementColor(trigram.element),
                shadowBlur: 20
            }
        }));
    }
    
    createLinks() {
        // 五行相生关系
        const generatingLinks = [
            { source: '木', target: '火', relation: '相生' },
            { source: '火', target: '土', relation: '相生' },
            { source: '土', target: '金', relation: '相生' },
            { source: '金', target: '水', relation: '相生' },
            { source: '水', target: '木', relation: '相生' }
        ];
        
        // 五行相克关系
        const controllingLinks = [
            { source: '木', target: '土', relation: '相克' },
            { source: '土', target: '水', relation: '相克' },
            { source: '水', target: '火', relation: '相克' },
            { source: '火', target: '金', relation: '相克' },
            { source: '金', target: '木', relation: '相克' }
        ];
        
        // 创建基于五行的连接
        this.nodes.forEach(sourceNode => {
            this.nodes.forEach(targetNode => {
                if (sourceNode.id !== targetNode.id) {
                    // 检查相生关系
                    const generating = generatingLinks.find(link => 
                        (link.source === sourceNode.element && link.target === targetNode.element)
                    );
                    
                    if (generating) {
                        this.links.push({
                            source: sourceNode.id,
                            target: targetNode.id,
                            relation: generating.relation,
                            lineStyle: {
                                color: '#00ff00',
                                width: 3,
                                type: 'solid'
                            }
                        });
                    }
                    
                    // 检查相克关系
                    const controlling = controllingLinks.find(link => 
                        (link.source === sourceNode.element && link.target === targetNode.element)
                    );
                    
                    if (controlling) {
                        this.links.push({
                            source: sourceNode.id,
                            target: targetNode.id,
                            relation: controlling.relation,
                            lineStyle: {
                                color: '#ff0000',
                                width: 2,
                                type: 'dashed'
                            }
                        });
                    }
                }
            });
        });
        
        // 添加阴阳关系连接（按用户要求重新分组）
        // 阳：乾、兑、离、震；阴：巽、坎、艮、坤
        const yangNodes = ['乾', '兑', '离', '震'];
        const yinNodes = ['巽', '坎', '艮', '坤'];
        
        yangNodes.forEach(yang => {
            yinNodes.forEach(yin => {
                this.links.push({
                    source: yang,
                    target: yin,
                    relation: '阴阳',
                    lineStyle: {
                        color: '#d4af37',
                        width: 1,
                        type: 'dotted',
                        opacity: 0.3
                    }
                });
            });
        });
    }
    
    getElementColor(element) {
        const colors = {
            '金': '#ffd700',
            '木': '#00ff00',
            '水': '#00ffff',
            '火': '#ff4500',
            '土': '#daa520'
        };
        return colors[element] || '#ffffff';
    }
    
    formatNodeTooltip(data) {
        return `
            <div style="padding: 10px; font-size: 14px;">
                <div style="font-size: 18px; font-weight: bold; color: #d4af37; margin-bottom: 8px;">
                    ${data.name} ${data.trigramName}
                </div>
                <div style="margin-bottom: 5px;"><strong>五行属性:</strong> ${data.element}</div>
                <div><strong>自然现象:</strong> ${data.nature}</div>
            </div>
        `;
    }
    
    formatLinkTooltip(data) {
        return `
            <div style="padding: 10px; font-size: 14px;">
                <div style="margin-bottom: 5px;">
                    <strong>${data.source}</strong> → <strong>${data.target}</strong>
                </div>
                <div style="color: #d4af37;">关系: ${data.relation}</div>
            </div>
        `;
    }
    
    render() {
        const option = {
            series: [{
                data: this.nodes,
                links: this.links
            }]
        };
        
        this.chart.setOption(option);
    }
    
    bindEvents() {
        // 点击节点事件
        this.chart.on('click', (params) => {
            if (params.dataType === 'node') {
                this.highlightNodeRelations(params.data.id);
                this.showNodeDetails(params.data);
            }
        });
        
        // 鼠标悬停事件
        this.chart.on('mouseover', (params) => {
            if (params.dataType === 'node') {
                this.showNodePreview(params.data);
            }
        });
        
        // 窗口大小改变
        window.addEventListener('resize', () => {
            this.chart.resize();
        });
    }
    
    highlightNodeRelations(nodeId) {
        // 高亮选中的节点及其相关连接
        const relatedNodes = new Set([nodeId]);
        const relatedLinks = [];
        
        this.links.forEach(link => {
            if (link.source === nodeId || link.target === nodeId) {
                relatedNodes.add(link.source);
                relatedNodes.add(link.target);
                relatedLinks.push(link);
            }
        });
        
        // 更新节点样式
        const updatedNodes = this.nodes.map(node => ({
            ...node,
            itemStyle: {
                ...node.itemStyle,
                opacity: relatedNodes.has(node.id) ? 1 : 0.3
            }
        }));
        
        // 更新连接样式
        const updatedLinks = this.links.map(link => ({
            ...link,
            lineStyle: {
                ...link.lineStyle,
                opacity: (link.source === nodeId || link.target === nodeId) ? 1 : 0.1
            }
        }));
        
        this.chart.setOption({
            series: [{
                data: updatedNodes,
                links: updatedLinks
            }]
        });
        
        // 3秒后恢复
        setTimeout(() => {
            this.resetHighlight();
        }, 3000);
    }
    
    resetHighlight() {
        const resetNodes = this.nodes.map(node => ({
            ...node,
            itemStyle: {
                ...node.itemStyle,
                opacity: 1
            }
        }));
        
        const resetLinks = this.links.map(link => ({
            ...link,
            lineStyle: {
                ...link.lineStyle,
                opacity: 1
            }
        }));
        
        this.chart.setOption({
            series: [{
                data: resetNodes,
                links: resetLinks
            }]
        });
    }
    
    showNodeDetails(nodeData) {
        // 创建详细信息的模态框
        const modal = document.createElement('div');
        modal.className = 'node-detail-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${nodeData.name} ${nodeData.trigramName}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="detail-section">
                            <h3>基本信息</h3>
                            <p><strong>五行属性:</strong> ${nodeData.element}</p>
                            <p><strong>自然现象:</strong> ${nodeData.nature}</p>
                        </div>
                        <div class="detail-section">
                            <h3>关系网络</h3>
                            <div id="relation-chart"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .node-detail-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 3000;
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
            
            .detail-section {
                margin-bottom: 25px;
            }
            
            .detail-section h3 {
                color: var(--accent-gold);
                margin-bottom: 15px;
                font-size: 1.2rem;
            }
            
            .detail-section p {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 8px;
            }
            
            #relation-chart {
                height: 200px;
                background: rgba(10, 14, 26, 0.3);
                border-radius: 8px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // 关闭功能
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
        
        // 创建关系图表
        this.createRelationChart(nodeData, modal.querySelector('#relation-chart'));
    }
    
    createRelationChart(nodeData, container) {
        const chart = echarts.init(container);
        
        // 获取相关节点和连接
        const relatedNodes = [nodeData];
        const relatedLinks = [];
        
        this.links.forEach(link => {
            if (link.source === nodeData.id) {
                const targetNode = this.nodes.find(n => n.id === link.target);
                if (targetNode) {
                    relatedNodes.push(targetNode);
                    relatedLinks.push(link);
                }
            } else if (link.target === nodeData.id) {
                const sourceNode = this.nodes.find(n => n.id === link.source);
                if (sourceNode) {
                    relatedNodes.push(sourceNode);
                    relatedLinks.push(link);
                }
            }
        });
        
        const option = {
            backgroundColor: 'transparent',
            series: [{
                type: 'graph',
                layout: 'force',
                animation: true,
                roam: true,
                force: {
                    repulsion: 300,
                    gravity: 0.1,
                    edgeLength: 80
                },
                symbolSize: 60,
                data: relatedNodes,
                links: relatedLinks,
                label: {
                    show: true,
                    fontSize: 14,
                    color: '#d4af37'
                },
                lineStyle: {
                    color: 'rgba(212, 175, 55, 0.6)',
                    width: 2
                }
            }]
        };
        
        chart.setOption(option);
    }
    
    showNodePreview(nodeData) {
        // 可以在这里添加预览功能
        console.log('预览节点:', nodeData);
    }
    
    destroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}

// 初始化网络图表
document.addEventListener('DOMContentLoaded', function() {
    let networkChart = null;
    
    // 等待容器加载
    const initNetwork = () => {
        const container = document.getElementById('bagua-network');
        if (container && !networkChart) {
            networkChart = new BaguaNetworkChart('bagua-network');
        }
    };
    
    initNetwork();
    
    // 定期检查和初始化
    setInterval(initNetwork, 1000);
    
    // 页面卸载时清理
    window.addEventListener('beforeunload', () => {
        if (networkChart) {
            networkChart.destroy();
        }
    });
});