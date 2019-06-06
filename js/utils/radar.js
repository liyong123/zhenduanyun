 
 
function radar(eleId, indicator, valueArray) {
    var myChartAir1 = echarts.init(document.getElementById(eleId));
    var color = ['#a9bcf7', '#e28f8f'];
    var option = {
        legend: {
            data: ['目标阶段', '现状阶段'],
            orient: "horizontal",
            top: 430
        },
        color: color,
        radar: [{
            indicator: indicator,
            center: ['50%', '50%'],
            splitNumber: 2,
            shape: 'circle',
            radius: 140,
            name: {
                formatter: '{value}',
                fontSize: 10,
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(255, 255, 255, 0.5)']
                }
            },
        }],
        series: [{
            name: '雷达图',
            type: 'radar',
            data: valueArray
        }],
    }
    myChartAir1.setOption(option, true)
}




