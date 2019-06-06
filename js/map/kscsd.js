//  自动执行
// 柱状图
!(() => {

    var myChart = echarts.init(document.getElementById('draw4'));

    option = {

        tooltip: {
            trigger: 'item'
        },

        calculable: true,
        barWidth: 20,
        grid: {
            borderWidth: 0,
            y: 30,
            y2: 100,
            height:120
        },
        xAxis: [{
            type: 'category',
            show: false,
            data: MAPMETA.evaluate.names
        }],
        yAxis: [{
            type: 'value',
            show: false
        }],
     
        series: [{
            name: '智能制造成熟度',
            type: 'bar',
            top: 20,
            itemStyle: {
                normal: {
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            '#2BE9C3', '#9084F8', '#59C8F9', '#E3BE6B', '#779AF9',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}\n{c}'
                    },
                    barBorderRadius: 8,
                }
            },
            data: MAPMETA.evaluate.data,
            markPoint: {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(0,0,0,0)',

                },
                data: [{
                    xAxis: 0,
                    y: 350,
                    name: '已规划级',
                    symbolSize: 20
                },
                {
                    xAxis: 1,
                    y: 350,
                    name: '规范级',
                    symbolSize: 20
                },
                {
                    xAxis: 2,
                    y: 350,
                    name: '集成级',
                    symbolSize: 20
                },
                {
                    xAxis: 3,
                    y: 350,
                    name: '优化级',
                    symbolSize: 20
                },
                {
                    xAxis: 4,
                    y: 350,
                    name: '引领级',
                    symbolSize: 20
                },

                ]
            }
        }]
    };

    myChart.setOption(option);
})();

function setDraw4() {
    var dd = echarts.getInstanceByDom(document.getElementById('draw4'));
    dd.setOption({
        series: {
            data: [randomNum(1, 20), randomNum(1, 20), randomNum(1, 20), randomNum(1, 20), randomNum(1, 20)]
        }
    });
}