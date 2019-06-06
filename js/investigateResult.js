let chartData = [];
let chartTypeArry = [];
$(function () {
    _resultPage();
})

function _resultPage() {
    app.DataRequest(URL + 'dwsurvey/getQuestionList', {
        directoryRemarkId: localStorage.getItem('directoryRemarkId')
    }, function (err) {}, function (data) {

        // 抬头信息及概述
        $('#directoryName').text(data.directoryRemark.directoryName);
        $('#area').text(data.directoryRemark.area);
        $('#analysisTime').text(formatDate(data.directoryRemark.analysisTime));
        $('#summarize').text(data.directoryRemark.remark)

        let requestList = data.list;
        let requestHTML = '';



        // 题目的图表信息
        for (let i = 0; i < requestList.length; i++) {
            let chartType = '';

            let unit = '次';
            if (requestList[i].qu_type == '20' || requestList[i].qu_type == '10') {
                unit = '分';
            }
            if (requestList[i].qu_type == '11') {
                unit = '排名';
            }


            if (requestList[i].questionRemark_chartsType == 1) {
                // 柱状图
                let lableArrey = [];
                if (requestList[i].qu_type == 13 || requestList[i].qu_type == 14 || requestList[i].qu_type == 15 || requestList[i].qu_type == 20) {
                    // 矩阵题
                    let arryData = [];
                    for (let k = 0; k < requestList[i].cloumnOptions.length; k++) {

                        lableArrey.push(requestList[i].cloumnOptions[k].option_name);

                        arryData.push({
                            name: requestList[i].datas[k].option_name,
                            type: 'bar',
                            data: requestList[i].datas[k].colDatas
                        })
                    }
                    chartData.push(arryData)
                } else {
                    // 非矩阵题
                    let arryData = []
                    for (let k = 0; k < requestList[i].options.length; k++) {
                        lableArrey.push(requestList[i].options[k].option_name);
                        arryData.push(requestList[i].datas[k])
                    }
                    chartData.push(arryData)
                }

                chartTypeArry.push({
                    title: requestList[i].qu_title,
                    lable: lableArrey,
                    chartsType: requestList[i].questionRemark_chartsType,
                    qu_type: requestList[i].qu_type
                });

            } else if (requestList[i].questionRemark_chartsType == 11) {
                // 累积百分比
                chartTypeArry.push({
                    title: requestList[i].qu_title,
                    qu_type: requestList[i].qu_type,
                    chartsType: requestList[i].questionRemark_chartsType,
                });

                chartData.push({
                    cumulativeData: requestList[i].cumulativeData,
                    cumulativeDataLine: requestList[i].cumulativeDataPercentage,
                    cumulativeOptions: requestList[i].cumulativeOptions,
                });
            } else if (requestList[i].questionRemark_chartsType == 12) {
                // 占比
                let lableArrey = [];

                let arryData = [];
                let accountedData = [];
                for (let k = 0; k < requestList[i].options.length; k++) {
                    lableArrey.push(requestList[i].options[k].option_name);
                    arryData.push(requestList[i].datas[k]);
                    accountedData.push(requestList[i].dataAccounteds[k]);
                }

                chartData.push({
                    datas: arryData,
                    dataAccounteds: accountedData
                })

                chartTypeArry.push({
                    title: requestList[i].qu_title,
                    lable: lableArrey,
                    chartsType: requestList[i].questionRemark_chartsType,
                    qu_type: requestList[i].qu_type
                });

            } else if (requestList[i].questionRemark_chartsType == 2) {

                // 饼状图
                let lableArrey = [];
                let pieData = [];
                for (let k = 0; k < requestList[i].pies.length; k++) {
                    // pieData.push()
                    pieData.push({
                        name: requestList[i].pies[k].name ? requestList[i].pies[k].name : requestList[i].pies[k].option_name,
                        value: requestList[i].pies[k].count
                    })
                }
                chartData.push(pieData)

                chartTypeArry.push({
                    title: requestList[i].qu_title,
                    lable: lableArrey,
                    chartsType: requestList[i].questionRemark_chartsType,
                    qu_type: requestList[i].qu_type
                });

            } else if (requestList[i].questionRemark_chartsType == 3) {
                // 条形图
                let lableArrey = [];
                if (requestList[i].qu_type == 13 || requestList[i].qu_type == 14 || requestList[i].qu_type == 15 || requestList[i].qu_type == 20) {
                    // 矩阵题
                    let arryData = [];
                    for (let k = 0; k < requestList[i].cloumnOptions.length; k++) {

                        lableArrey.push(requestList[i].cloumnOptions[k].option_name);

                        arryData.push({
                            name: requestList[i].datas[k].option_name,
                            type: 'bar',
                            barWidth: '20%',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{c}' + unit
                                },
                            },
                            data: requestList[i].datas[k].colDatas
                        })
                    }
                    chartData.push(arryData)
                } else {
                    // 非矩阵题
                    let arryData = []
                    for (let k = 0; k < requestList[i].options.length; k++) {
                        lableArrey.push(requestList[i].options[k].option_name);
                        arryData.push(requestList[i].datas[k])
                    }
                    chartData.push(arryData)
                }

                chartTypeArry.push({
                    title: requestList[i].qu_title,
                    lable: lableArrey,
                    chartsType: requestList[i].questionRemark_chartsType,
                    qu_type: requestList[i].qu_type
                });
            } else if (requestList[i].questionRemark_chartsType == 4) {
                // 折线图
                let lableArrey = [];
                if (requestList[i].qu_type == 13 || requestList[i].qu_type == 14 || requestList[i].qu_type == 15 || requestList[i].qu_type == 20) {
                    // 矩阵题
                    let arryData = [];
                    for (let k = 0; k < requestList[i].cloumnOptions.length; k++) {
                        lableArrey.push(requestList[i].cloumnOptions[k].option_name);
                        arryData.push({
                            name: requestList[i].datas[k].option_name,
                            type: 'line',
                            data: requestList[i].datas[k].colDatas
                        })
                    }
                    chartData.push(arryData)

                } else {
                    // 非矩阵题
                    let arryData = []
                    for (let k = 0; k < requestList[i].options.length; k++) {
                        lableArrey.push(requestList[i].options[k].option_name);
                        arryData.push(requestList[i].datas[k])
                    }
                    chartData.push(arryData)
                }

                chartTypeArry.push({
                    title: requestList[i].qu_title,
                    lable: lableArrey,
                    chartsType: requestList[i].questionRemark_chartsType,
                    qu_type: requestList[i].qu_type
                });
            }

            requestHTML += '<div class="summarize">'
            requestHTML += '<h3 class="subtitle">' + (i + 1) + '.' + requestList[i].qu_title + '</h3>'
            requestHTML += '<div class="chart" id="pie_chart' + i + '" ></div>'
            requestHTML += '<div>' + requestList[i].questionRemark_remark + '</div>'
            requestHTML += '</div>'
        }
        $('#topic_description').html(requestHTML);
        setTimeout(function () {
            _chartPage(chartTypeArry, chartData);
        }, 0);
    })
}

// 渲染页面图表
function _chartPage(chartTypeArry, chartData) {

    for (let i = 0; i < chartTypeArry.length; i++) {
        // 柱状图
        if (chartTypeArry[i].chartsType == 1) {
            if (chartTypeArry[i].qu_type == 13 || chartTypeArry[i].qu_type == 14 || chartTypeArry[i].qu_type == 15 || chartTypeArry[i].qu_type == 20) {
                // 矩阵题
                _barFun('pie_chart' + i, chartTypeArry[i].qu_type, chartTypeArry[i].lable, chartData[i])

            } else {
                // 非矩阵题
                _barOddFun('pie_chart' + i, chartTypeArry[i].qu_type, chartTypeArry[i].lable, chartData[i])
            }
        }
        // 累积百分比
        if (chartTypeArry[i].chartsType == 11) {
            let cumuLable = [];
            for (let j = 0; j < chartData[i].cumulativeOptions.length; j++) {
                cumuLable.push(chartData[i].cumulativeOptions[j].option_name);
            }
            _barLineFun('pie_chart' + i, chartTypeArry[i].qu_type, cumuLable, chartData[i].cumulativeData, chartData[i].cumulativeDataLine);
        }
        // 占比
        if (chartTypeArry[i].chartsType == 12) {
            // console.log(chartTypeArry, chartData)
            _barLineProFun('pie_chart' + i, chartTypeArry[i].qu_type, chartTypeArry[i].lable, chartData[i].datas, chartData[i].dataAccounteds);
        }
        // 饼状图
        if (chartTypeArry[i].chartsType == 2) {
            _pieFun('pie_chart' + i, chartTypeArry[i].qu_type, chartData[i], chartTypeArry[i].lable)
        }
        // 条形图
        if (chartTypeArry[i].chartsType == 3) {
            if (chartTypeArry[i].qu_type == 13 || chartTypeArry[i].qu_type == 14 || chartTypeArry[i].qu_type == 15 || chartTypeArry[i].qu_type == 20) {
                // 矩阵题
                _barStripFun('pie_chart' + i, chartTypeArry[i].qu_type, chartTypeArry[i].lable, chartData[i])
            } else {
                // 非矩阵题
                _barOddStripFun('pie_chart' + i, chartTypeArry[i].qu_type, chartTypeArry[i].lable, chartData[i])
            }
        }
        // 折线图
        if (chartTypeArry[i].chartsType == 4) {
            if (chartTypeArry[i].qu_type == 13 || chartTypeArry[i].qu_type == 14 || chartTypeArry[i].qu_type == 15 || chartTypeArry[i].qu_type == 20) {
                // 矩阵题
                _lineOddFun('pie_chart' + i, chartTypeArry[i].qu_type, chartTypeArry[i].lable, chartData[i])
            } else {
                // 非矩阵题
                _lineFun('pie_chart' + i, chartTypeArry[i].qu_type, chartTypeArry[i].lable, chartData[i])
            }
        }
    }
}

// 饼状图
function _pieFun(id, title, pieData, lable) {
    let unit = '次';
    if (title == '20' || title == '10') {
        unit = '分';
    }
    if (title == '11') {
        unit = '排名';
    }
    var domAirPie = document.getElementById(id);
    var myChartAirPie11 = echarts.init(domAirPie);
    option = {
        color: ['#2c82be', '#53a8e2', '#76ddfb', '#dbecf8'],
        // title: {
        //     text: title,
        //     x: 'center',
        //     y: 'bottom'
        // },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            bottom: '12%',
            data: lable
        },
        series: [{
            name: title,
            type: 'pie',
            radius: ['25%', '55%'],
            center: ['50%', '45%'],
            data: pieData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }

        }]
    };

    myChartAirPie11.setOption(option, true);
}

// 折线图  单条
function _lineFun(id, title, lable, lineData) {

    let unit = '次';
    if (title == '20' || title == '10') {
        unit= '分';
    }
    if (title == '11') {
        unit = '排名';
    }

    var domAirLine = document.getElementById(id);
    var myChartAirLine = echarts.init(domAirLine);
    option = {
        color: ['#2c82be', '#53a8e2', '#76ddfb', '#dbecf8'],
        // title: {
        //     text: title,
        //     x: 'center',
        //     y: 'bottom'
        // },
        grid: {
            left: '5%',
            right: '6%',
            bottom: '15%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b}<br/> <span style="display: inline-block;background-color: #2c82be;width: 10px;height: 10px;border-radius: 50%;"></span>&#x3000;{c}' + unit
        },
        xAxis: {
            type: 'category',
            data: lable,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                rotate: 45
            },
        },
        yAxis: {
            type: 'value',
            min: 0,
            name: '(' + unit + ')',
            axisLabel: {
                // formatter: '{value}' + unit
            }
        },
        series: [{
            type: 'line',
            data: lineData,
            label: {
                normal: {
                    formatter: lineData.value,
                    show: true,
                    position: 'top', //文字显示位置,如上图中的1.0,1.1字样
                    textStyle: {
                        fontSize: 18,
                        color: '#53a8e2'
                    },
                }
            },
        }]
    };
    myChartAirLine.setOption(option, true);
}

// 折线图  多条
function _lineOddFun(id, title, lable, lineData) {
    let unit = '次';
    if (title == '20' || title == '10') {
        unit = '分';
    }
    if (title == '11') {
        unit = '排名';
    }
    var domAirLineOdd = document.getElementById(id);
    var myChartAirLineOdd = echarts.init(domAirLineOdd);
    option = {
        color: ['#2c82be', '#53a8e2', '#76ddfb', '#dbecf8'],
        // title: {
        //     text: title,
        //     x: 'center',
        //     y: 'bottom'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b}<br/> <span style="display: inline-block;background-color: #2c82be;width: 10px;height: 10px;border-radius: 50%;"></span>&#x3000;{c}' + unit
        },
        grid: {
            left: '5%',
            right: '6%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: lable,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                rotate: 45
            },

        },
        yAxis: {
            type: 'value',
            min: 0,
            name: '(' + unit + ')',
            axisLabel: {
                // formatter: '{value}'+ unit
            }
        },
        series: lineData
    };
    myChartAirLineOdd.setOption(option, true);
}

// 柱状图  单条
function _barOddFun(id, title, lable, barData) {

    let unit = '次';
    if (title == '20' || title == '10') {
        unit = '分';
    }
    if (title == '11') {
        unit = '排名';
    }

    var domAirBarOdd = document.getElementById(id);
    var myChartAirBarOdd = echarts.init(domAirBarOdd);
    option = {
        color: ['#2c82be', '#53a8e2', '#76ddfb', '#dbecf8'],
        // title: {
        //     text: title,
        //     x: 'center',
        //     y: 'bottom'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b}<br/> <span style="display: inline-block;background-color: #2c82be;width: 10px;height: 10px;border-radius: 50%;"></span>&#x3000;{c}' + unit
        },
        grid: {
            left: '7%',
            right: '8%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: lable,
            name: '(选项)',
            axisTick: {
                alignWithLabel: true
            }

        }],
        yAxis: [{
            type: 'value',
            min: 0,
            name: '(' + unit + ')',
            axisLabel: {
                // formatter: '{value}'+ unit
            }
        }],
        series: [{
            // name:'',
            type: 'bar',
            barWidth: '20%',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    // formatter: '{c}'+unit
                },
            },
            data: barData
        }]
    }

    myChartAirBarOdd.setOption(option, true);
}

// 柱状图  多条
function _barFun(id, title, lable, barData) {
    let unit = '次';
    if (title == '20' || title == '10') {
        unit = '分';
    }
    if (title == '11') {
        unit = '排名';
    }
    var domAirBar = document.getElementById(id);
    var myChartAirBar = echarts.init(domAirBar);
    app.title = '坐标轴刻度与标签对齐';
    option = {
        color: ['#2c82be', '#53a8e2', '#76ddfb', '#dbecf8'],
        // title: {
        //     text: title,
        //     x: 'center',
        //     y: 'bottom'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '5%',
            right: '6%',
            bottom: '15%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            data: lable,
            axisTick: {
                alignWithLabel: true
            },
            name: '(选项)',

            axisLabel: {
                rotate: 45
            },
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            scale: true,
            name: unit,

        }],
        series: barData
    };
    myChartAirBar.setOption(option, true);
}

// 柱状图 + 折线图  累积百分比
function _barLineFun(id, title, lable, barData, lineData) {

    let unit = '次';
    if (title == '20' || title == '10') {
        unit ='分';
    }
    if (title == '11') {
        unit = '排名';
    }
    var domAirBarLine = document.getElementById(id);
    var myChartAirBarLine = echarts.init(domAirBarLine);
    option = {
        color: ['#2c82be', '#53a8e2', '#76ddfb', '#dbecf8'],
        // title: {
        //     text: title,
        //     x: 'center',
        //     y: 'bottom'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                crossStyle: {
                    color: '#999'
                }
            },
            formatter: '{b}<br/> <span style="display: inline-block;background-color: #2c82be;width: 10px;height: 10px;border-radius: 50%;"></span>&#x3000;{c}' + unit
        },
        grid: {
            left: '5%',
            right: '6%',
            bottom: '15%',
            containLabel: true
        },
        legend: {
            data: lable
        },
        xAxis: [{
            type: 'category',
            data: lable,
            // name: '(选项)',
            axisTick: {
                alignWithLabel: true
            }

        }],
        yAxis: [{
                type: 'value',
                min: 0,
                name: '(' + unit + ')',
                interval: 25,
                axisLabel: {
                    // formatter: '{value}'+ unit,
                },
                splitLine: {
                    show: true
                },
            },
            {
                type: 'value',
                interval: 25,
                min: 0,
                max: 100,
                // name: '%',
                axisLabel: {
                    // formatter: '{value} %'
                },
                splitLine: {
                    show: true
                },
                label: {
                    normal: {
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        show: false,
                        position: 'top', //文字显示位置,如上图中的1.0,1.1字样
                        textStyle: {
                            fontSize: 14,
                            color: '#53a8e2'
                        },
                    }
                }
            }
        ],
        series: [{
                // name: '降水量',
                type: 'bar',
                data: barData,
                barWidth: '20%',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}' + unit,
                        color: '#ffffff',
                    },
                },
            },
            {
                // name: '平均温度',
                type: 'line',
                yAxisIndex: 1,
                label: {
                    normal: {
                        formatter: '{c}%',
                        show: true,
                        position: 'top', //文字显示位置,如上图中的1.0,1.1字样
                        textStyle: {
                            fontSize: 18,
                            color: '#95aaef'
                        },
                    }
                },
                data: lineData
            }
        ]
    };

    myChartAirBarLine.setOption(option, true);
}

// 柱状图 + 折线图  占比
function _barLineProFun(id, title, lable, barData, lineData) {

    let unit = '次';
    if (title == '20' || title == '10') {
        unit = '分';
    }
    if (title == '11') {
        unit = '排名';
    }
    var domAirBarLine = document.getElementById(id);
    var myChartAirBarLine = echarts.init(domAirBarLine);
    option = {
        color: ['#2c82be', '#53a8e2', '#76ddfb', '#dbecf8'],
        // title: {
        //     text: title,
        //     x: 'center',
        //     y: 'bottom'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                crossStyle: {
                    color: '#999'
                }
            },
            formatter: '{b}<br/> <span style="display: inline-block;background-color: #2c82be;width: 10px;height: 10px;border-radius: 50%;"></span>&#x3000;{c}' + unit
        },
        grid: {
            left: '5%',
            right: '6%',
            bottom: '15%',
            containLabel: true
        },
        legend: {
            data: lable
        },
        xAxis: [{
            type: 'category',
            data: lable,
            // name: '(选项)',
            axisTick: {
                alignWithLabel: true
            }

        }],
        yAxis: [{
                type: 'value',
                min: 0,
                name: '(' + unit + ')',
                interval: 25,
                axisLabel: {
                    // formatter: '{value}' +unit
                },
                splitLine: {
                    show: true
                },
            },
            {
                type: 'value',
                interval: 25,
                min: 0,
                max: 100,
                // name: '%',
                axisLabel: {
                    // formatter: '{value} %'
                },
                splitLine: {
                    show: true
                },
                label: {
                    normal: {
                        axisLabel: {
                            // formatter: '{value} %'
                        },
                        show: false,
                        position: 'top', //文字显示位置,如上图中的1.0,1.1字样
                        textStyle: {
                            fontSize: 18,
                            color: '#53a8e2'
                        },
                    }
                }
            }
        ],
        series: [{
                // name: '降水量',
                type: 'bar',
                data: barData,
                barWidth: '20%',
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}' + unit,
                        color: '#ffffff',
                    },
                },
            },
            {
                // name: '平均温度',
                type: 'line',
                yAxisIndex: 1,
                label: {
                    normal: {
                        formatter: '{c}%',
                        show: true,
                        position: 'top', //文字显示位置,如上图中的1.0,1.1字样
                        textStyle: {
                            fontSize: 18,
                            color: '#95aaef'
                        },
                    }
                },
                data: lineData
            }
        ]
    };

    myChartAirBarLine.setOption(option, true);
}

// 横向柱状图 单条
function _barOddStripFun(id, title, lable, barData) {

    let unit = '次';
    if (title == '20' || title == '10') {
        unit = '分';
    }
    if (title == '11') {
        unit = '排名';
    }
    var domAirBarOdd = document.getElementById(id);
    var myChartAirBarOdd = echarts.init(domAirBarOdd);
    option = {
        color: ['#2c82be', '#53a8e2', '#76ddfb', '#dbecf8'],
        // title: {
        //     text: title,
        //     x: 'center',
        //     y: 'bottom'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b}<br/> <span style="display: inline-block;background-color: #2c82be;width: 10px;height: 10px;border-radius: 50%;"></span>&#x3000;{c}' + unit
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'value',
            min: 0,
            name: '(' + unit + ')',
            axisLabel: {
                // formatter: '{value} '+unit
            }

        }],
        yAxis: [{
            type: 'category',
            data: lable,
            name: '(选项)',
            axisTick: {
                alignWithLabel: true
            }

        }],
        series: [{
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}' + unit
                },
            },
            data: barData
        }]
    }

    myChartAirBarOdd.setOption(option, true);
}

// 横向柱状图  多条
function _barStripFun(id, title, lable, barData) {

    let unit = '次';
    if (title == '20' || title == '10') {
        unit = '分';
    }
    if (title == '11') {
        unit = '排名';
    }
    var domAirBar = document.getElementById(id);
    var myChartAirBar = echarts.init(domAirBar);
    app.title = '坐标轴刻度与标签对齐';
    option = {
        color: ['#2c82be', '#53a8e2', '#76ddfb', '#dbecf8'],
        // title: {
        //     text: title,
        //     x: 'center',
        //     y: 'bottom'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '5%',
            right: '6%',
            bottom: '15%',
            containLabel: true
        },

        xAxis: [{
            type: 'value',
            min: 0,
            scale: true,
            name: unit,

        }],
        yAxis: [{
            type: 'category',
            data: lable,
            axisTick: {
                alignWithLabel: true
            },
            name: '(选项)',
            axisLabel: {
                rotate: 45
            }
        }],
        series: barData
    };
    myChartAirBar.setOption(option, true);
}

// 堆叠柱状图
function _barPileFun(id) {
    var domAirBarPile = document.getElementById('bar_pile_chart');
    var myChartAirBarPile = echarts.init(domAirBarPile);
    option = {
        color: ['#f3c997', '#b8dbec', '#95aaef', '#a8b9ee', '#c1bbf2', '#cbb8f1', '#9fb5f7', '#5f83f1', '#01aced', '#95aaef'],
        // title: {
        //     text: '某站点用户访问来源',
        //     x: 'center',
        //     y: 'bottom'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            orient: 'horizontal',
            bottom: '11%',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
            selectedMode: false
        },
        grid: {
            top: '4%',
            left: '3%',
            right: '4%',
            bottom: '20%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: lable,
        },
        yAxis: {

            type: 'value'
        },
        series: [{
                name: '直接访问',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [30, 32, 31, 34, 90, 30, 20]
            },
            {
                name: '邮件营销',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [10, 32, 11, 34, 90, 20, 20]
            },
            {
                name: '联盟广告',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [20, 12, 11, 34, 20, 30, 10]
            },
            {
                name: '视频广告',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [10, 22, 1, 54, 90, 30, 40]
            },
            {
                name: '搜索引擎',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [20, 32, 91, 34, 90, 10, 10]
            }
        ]
    };
    myChartAirBarPile.setOption(option, true);
}