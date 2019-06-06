function Draw2()
{
    var myChart = echarts.init(document.getElementById('draw2'));
    var itemcolor=['#2e8ce1','#d0a351', '#d44435', '#35ba88', '#b345db','#3e4ade',  '#3d5a19', '#db7d45'];
    option = {
        color:itemcolor,
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                show: true,
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            }
        },
        grid:{
            // left:'5',
            // right:'5',
            // top:'5',
            // bottom:'5'
            top:'20',
            bottom:'40',
            right:'20'
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        
        legend : {
            show : false,
            data : ['series1', 'series2']
        },
        dataRange: {
            min: 0,
            max: 50,
            show:false,
            orient: 'horizontal',
            y: 30,
            x: 'center',
            text:['高','低'],           // 文本，默认为数值文本
            color:['lightgreen','orange'],
            splitNumber: 10
        },
        xAxis : [
            {
                type : 'category',
                axisLabel: {
                    color:'#fff'
                },
                data : ['电器机械','石油化工','纺织服装','食品饮料','建造材料','汽车制造','药品造纸'],
                // axisLine:{lineStyle:{color:'#fff'}}
                //xAxis.axisLine.lineStyle.color
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{color:'#fff'},
                axisLine:false,
                axisTick:{show:false},
                splitLine:false
            }
        ],
        animation: false,
        series : [
            
            {
                left:'20',
                right:'5',
                top:'5',
                bottom:'5',
                name:'产值',
                type:'scatter',         
                animation:true,       
                symbolSize: function(v){return v;},
                data: [10,15,30,10,15,40,39]
            }
        ]
    };

    myChart.setOption(option);
}

function setDraw2()
{
    var dd = echarts.getInstanceByDom(document.getElementById('draw2'));
    dd.setOption({
        series:{
            data : [randomNum(5,30),randomNum(5,30),randomNum(5,30),randomNum(5,30),randomNum(5,30),randomNum(5,30),randomNum(5,30)]
        }
    });    
}