function Draw5()
{
    var myChart = echarts.init(document.getElementById('draw5'));
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
            data:['第一产业','第二产业','第三产业'],
            textStyle:{color:'#fff'}
        },       
        calculable : true,
        series : [
            {
                name:'产业GDP比重',
                type:'pie',
                top:10,
                radius : '55%',
                center: ['40%', '40%'],
                data:[
                    {value:335, name:'第一产业'},
                    {value:310, name:'第二产业'},
                    {value:234, name:'第三产业'}
                ]
            }
        ]
    };

    myChart.setOption(option);
}

function setDraw5()
{
    var dd = echarts.getInstanceByDom(document.getElementById('draw5'));
    dd.setOption({
        series:{
            data:[
                {value:randomNum(200,400), name:'第一产业'},
                {value:randomNum(200,400), name:'第二产业'},
                {value:randomNum(200,400), name:'第三产业'}
            ]
        }
    });    
}