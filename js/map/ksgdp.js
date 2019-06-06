//自动执行
//饼图
!(() => {
    var myChart = echarts.init(document.getElementById('draw5'));
    var itemcolor = ['#2BE9C3', '#9084F8', '#59C8F9', '#E3BE6B', '#779AF9', '#3e4ade', '#3d5a19', '#db7d45'];
    option = {
        color: itemcolor,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 10,
            data: MAPMETA.intelligence.data,
            textStyle: {
                color: '#fff'
            }
        },
        calculable: true,
        series: [{
            name: '',
            type: 'pie',
            top: -110,
            radius: '44%',
            center: ['40%', '40%'],
            data: MAPMETA.intelligence.data
        }]
    };

    myChart.setOption(option);
})();

function setDraw5() {
    var dd = echarts.getInstanceByDom(document.getElementById('draw5'));
    dd.setOption({
        series: {
            data: [{
                value: randomNum(200, 400),
                name: '第一产业'
            },
            {
                value: randomNum(200, 400),
                name: '第二产业'
            },
            {
                value: randomNum(200, 400),
                name: '第三产业'
            }
            ]
        }
    });
}