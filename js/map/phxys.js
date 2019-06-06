function Draw3()
{
    var myChart = echarts.init(document.getElementById('draw3'));
    var itemcolor=['#2e8ce1','#d0a351', '#d44435', '#35ba88', '#b345db','#3e4ade',  '#3d5a19', '#db7d45'];
    option = {
        color:itemcolor,
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {            
            orient : 'vertical',
            x : 'right',
            y:'center',
            data:['经济','环境','资源','风险'],
            textStyle:{color:'#fff'}
        },       
        calculable : true,
        series : [
            {
                name:'影响因素',
                type:'pie',
                radius : ['20%', '70%'],
                center: ['40%', '50%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : true
                        },
                        labelLine : {
                            show : true
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                    {value:0.3, name:'经济'},
                    {value:0.1, name:'环境'},
                    {value:0.2, name:'资源'},
                    {value:0.2, name:'风险'}
                ]
            }
        ]
    };

    myChart.setOption(option);
}

function setDraw3()
{
    var dd = echarts.getInstanceByDom(document.getElementById('draw3'));
    dd.setOption({
        series:{
            data:[
                {value:randomNum(1,10), name:'经济'},
                {value:randomNum(1,10), name:'环境'},
                {value:randomNum(1,10), name:'资源'},
                {value:randomNum(1,10), name:'风险'}
            ]
        }
    });    
}