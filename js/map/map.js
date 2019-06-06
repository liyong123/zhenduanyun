function DrawMap(){
    var myChart = echarts.init(document.getElementById('china-map'));
    var option = {
        tooltip: {
    //                    show: false //不显示提示标签
            formatter: '{b}', //提示标签格式
            backgroundColor:"#ff7f50",//提示标签背景颜色
            textStyle:{color:"#fff"} //提示标签字体颜色
        },
        grid:{
            left:'5',
            right:'5',
            top:'5',
            bottom:'5'
        },
        series: [{
            type: 'map',
            mapType: 'china',
            left:'20',
            right:'5',
            top:'5',
            bottom:'5',
            selectedMode:'single',
            label: {
                normal: {
                    show: true,//显示省份标签
                    textStyle:{color:"#fff"}//省份标签字体颜色
                },    
                emphasis: {//对应的鼠标悬浮效果
                    show: true,
                    textStyle:{color:"#fff"}
                } 
            },
            itemStyle: {
                normal: {
                    //borderWidth: .5,//区域边框宽度
                    borderColor: '#80b8ff',//区域边框颜色
                    //areaColor:"#59a0fc",//区域颜色
                },
                emphasis: {
                    borderWidth: .5,
                    borderColor: '#78cbff',
                    areaColor:"#2579e6",
                    shadowBlur: 10                    
                }
            },
            data:[
                {name:'黑龙江', itemStyle:{normal:{areaColor:'#6dc7fc'}}},//福建为选中状态
                {name:'吉林', itemStyle:{normal:{areaColor:'#5bb1fa'}}},
                {name:'辽宁', itemStyle:{normal:{areaColor:'#6fc5fe'}}},

                {name:'内蒙古', itemStyle:{normal:{areaColor:'#59a0fc'}}},
                {name:'宁夏', itemStyle:{normal:{areaColor:'#6dc7fc'}}},
                {name:'新疆', itemStyle:{normal:{areaColor:'#59a0fc'}}},

                {name:'北京', itemStyle:{normal:{areaColor:'#53a3f8'}}},
                {name:'天津', itemStyle:{normal:{areaColor:'#59a0fc'}}},
                {name:'河北', itemStyle:{normal:{areaColor:'#59a0fc'}}},

                {name:'陕西', itemStyle:{normal:{areaColor:'#5dacfb'}}},
                {name:'甘肃', itemStyle:{normal:{areaColor:'#6bcbfd'}}},
                {name:'青海', itemStyle:{normal:{areaColor:'#59a0fc'}}},

                {name:'西藏', itemStyle:{normal:{areaColor:'#6dc7fc'}}},
                {name:'四川', itemStyle:{normal:{areaColor:'#5ca9fb'}}},
                {name:'云南', itemStyle:{normal:{areaColor:'#62aafe'}}},

                {name:'重庆', itemStyle:{normal:{areaColor:'#73c5fd'}}},
                {name:'贵州', itemStyle:{normal:{areaColor:'#65b9ff'}}},
                {name:'广西', itemStyle:{normal:{areaColor:'#5eabfb'}}},

                {name:'湖南', itemStyle:{normal:{areaColor:'#59a0fc'}}},
                {name:'湖北', itemStyle:{normal:{areaColor:'#6dc7fb'}}},
                {name:'河南', itemStyle:{normal:{areaColor:'#65b9ff'}}},

                {name:'山东', itemStyle:{normal:{areaColor:'#6dc8ff'}}},
                {name:'安徽', itemStyle:{normal:{areaColor:'#61aaf9'}}},
                {name:'江苏', selected:true, itemStyle:{normal:{areaColor:'#6cc7fe'}}},

                {name:'上海', itemStyle:{normal:{areaColor:'#59a0fc'}}},
                {name:'浙江', itemStyle:{normal:{areaColor:'#59a0fc'}}},
                {name:'福建', itemStyle:{normal:{areaColor:'#59a0fc'}}},

                {name:'江西', itemStyle:{normal:{areaColor:'#59a0fc'}}},
                {name:'广东', itemStyle:{normal:{areaColor:'#59a0fc'}}},
                {name:'澳门', itemStyle:{normal:{areaColor:'#59a0fc'}}},

                {name:'香港', itemStyle:{normal:{areaColor:'#59a0fc'}}},
                {name:'海南', itemStyle:{normal:{areaColor:'#6fc9fb'}}},
                {name:'台湾', itemStyle:{normal:{areaColor:'#59a0fc'}}},
                {name:'南海诸岛', itemStyle:{normal:{areaColor:'#59a0fc'}}},

                {name:'山西', itemStyle:{normal:{areaColor:'#59a0fc'}}},
            ]
        }],
    };
    
    myChart.setOption(option);
    myChart.on('click', function (params) {
        setDraw1();
        setDraw2();
        setDraw3();
        setDraw4();
        setDraw5();
        Draw6();
        Setxygxl();
    });
}
