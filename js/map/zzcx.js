function Draw6()
{
    var v1=randomNum(20,100);
    var v2=randomNum(20,100);
    var v3=randomNum(20,100);

    var myChart = echarts.init(document.getElementById('draw6'));
    var itemcolor=['#2e8ce1','#d0a351', '#d44435', '#35ba88', '#b345db','#3e4ade',  '#3d5a19', '#db7d45'];
    var dataStyle = {
        normal: {
            label: {show:false},
            labelLine: {show:false}
        }
    };
    var placeHolderStyle = {
        normal : {
            color: 'rgba(0,0,0,0)',
            label: {show:false},
            labelLine: {show:false}
        },
        emphasis : {
            color: 'rgba(0,0,0,0)'
        }
    };
    option = {
       color:itemcolor,
        tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {            
            orient : 'vertical',
            x : 'right',
            y:'center',
            data:['发明专利拥有率','自主品牌拥有率','新产品销售收入率','技术消化引进费用率'],
            textStyle:{color:'#fff'}
        },  
        
        // legend: {
        //     orient : 'vertical',
        //     x : document.getElementById('draw6').offsetWidth / 2,
        //     y : 45,
        //     itemGap:12,
        //     data:['发明专利拥有率','自主品牌拥有率','新产品销售收入率'],
        // },
        
        series : [
            {
                name:'1',
                type:'pie',
                clockWise:false,
                startAngle:45,
                radius : [70, 80],
                center: ['100', '90'],
                itemStyle : dataStyle,
                data:[
                    {
                        value:v1,
                        name:'发明专利拥有率'
                    },
                    {
                        value:100-v1,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'2',
                type:'pie',
                clockWise:false,
                radius : [60, 70],
                center: ['100', '90'],
                startAngle:45,
                itemStyle : dataStyle,
                data:[
                    {
                        value:v2, 
                        name:'自主品牌拥有率'
                    },
                    {
                        value:100-v2,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'3',
                type:'pie',
                clockWise:false,
                radius : [50, 60],
                center: ['100', '90'],
                startAngle:45,
                itemStyle : dataStyle,
                data:[
                    {
                        value:v3, 
                        name:'新产品销售收入率'
                    },
                    {
                        value:100-v3,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            },
            {
                name:'4',
                type:'pie',
                clockWise:false,
                radius : [40, 50],
                center: ['100', '90'],
                startAngle:45,
                itemStyle : dataStyle,
                data:[
                    {
                        value:40, 
                        name:'技术消化引进费用率'
                    },
                    {
                        value:60,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            }
        ]
    };

    myChart.setOption(option);
}


function setDraw6()
{
    var dd = echarts.getInstanceByDom(document.getElementById('draw6'));
    var v1=randomNum(20,100);
    var v2=randomNum(20,100);
    var v3=randomNum(20,100);
    dd.setOption({
        series:[
            {
                data:[
                    {value:v1},
                    {value:100-v1,}]
            },
            {
                data:[
                    {value:v2},
                    {value:100-v2,}]
            },
            {
                data:[
                    {value:v3},
                    {value:100-v3,}]
            }
        ]
    });    
}