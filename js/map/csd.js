function Draw4()
{
    var myChart = echarts.init(document.getElementById('draw4'));
    
    option = {
        
        tooltip: {
            trigger: 'item'
        },
        
        calculable: true,
        barWidth:20,
        grid: {
            borderWidth: 0,
            y: 20,
            y2: 20
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['已规划级', '规范级', '集成级', '优化级', '引领级']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                name: '智能制造成熟度',
                type: 'bar',
                top:20,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#bb2e36','#e28b22','#217fe2','#23e36d','#8326e3',
                               '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                               '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        },
                        barBorderRadius:10,
                    }
                },
                data: [12,21,10,4,12],
                markPoint: {
                    tooltip: {
                        trigger: 'item',
                        backgroundColor: 'rgba(0,0,0,0)',
                        
                    },
                    data: [
                        {xAxis:0, y: 350, name:'已规划级', symbolSize:20},
                        {xAxis:1, y: 350, name:'规范级', symbolSize:20},
                        {xAxis:2, y: 350, name:'集成级', symbolSize:20},
                        {xAxis:3, y: 350, name:'优化级', symbolSize:20},
                        {xAxis:4, y: 350, name:'引领级', symbolSize:20},
                        
                    ]
                }
            }
        ]
    };

    myChart.setOption(option);
}

function setDraw4()
{
    var dd = echarts.getInstanceByDom(document.getElementById('draw4'));
    dd.setOption({
        series:{
            data: [randomNum(1,20),randomNum(1,20),randomNum(1,20),randomNum(1,20),randomNum(1,20)]
        }
    });    
}

