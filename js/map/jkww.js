function Draw1()
{
    var myChart = echarts.init(document.getElementById('draw1'));
    var itemcolor=['#2e8ce1','#d0a351', '#d44435', '#35ba88', '#b345db','#3e4ade',  '#3d5a19', '#db7d45'];
option = {
    color:itemcolor,
    title : {
        text: '',
        subtext: ''
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient : 'vertical',
        x : 'center',
        y : 'bottom',
        data:['大型企业','中型企业','小型企业'],
        textStyle:{color:'#fff'}
    },
    
    polar : [
       {
           indicator : [
               { text: '成长性', max: 100,color:'#6dc7fc'},
               { text: '稳定性', max: 100,color:'#6dc7fc'},
               { text: '适应性', max: 100,color:'#6dc7fc'},
               { text: '可恢复性', max: 100,color:'#6dc7fc'},
               { text: '抗脆性', max: 100,color:'#6dc7fc'}
            ]
        }
    ],
    
    calculable : true,
    series : [
        {
            name: '健康五维分析',
           
            type: 'radar',
            data : [
                {
                    value : [43, 23, 67, 63, 82],
                    name : '大型企业'
                },
                 {
                    value : [56, 83, 22, 90, 88],
                    name : '中型企业'
                },
                {
                   value : [78, 97, 45, 66, 81],
                   name : '小型企业'
               }
                
            ]
        }
    ]
};

myChart.setOption(option);
}

function setDraw1()
{
    var dd = echarts.getInstanceByDom(document.getElementById('draw1'));
    dd.setOption({
        series:{
            data : [
                {
                    value : [randomNum(10,100), randomNum(10,100),randomNum(10,100), randomNum(10,100), randomNum(10,100)],
                    name : '大型企业'
                },
                 {
                    value : [randomNum(10,100),randomNum(10,100), randomNum(10,100), randomNum(10,100), randomNum(10,100)],
                    name : '中型企业'
                },
                {
                   value : [randomNum(10,100), randomNum(10,100), randomNum(10,100), randomNum(10,100), randomNum(10,100)],
                   name : '小型企业'
               }
                
            ]
        }
    });    
}