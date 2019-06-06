$('.headUser').click(function () {
    $('.signOut').show()
})

$('main').click(function () {
    $('.signOut').hide()
})

$(function () {
    basicInfo()
    sub_quest()
    radarDataL()
})

var textss = [
    '未达标需改进',
    '实现业务流程化和初步的信息化',
    '重要制造环节实现标准化和数字化',
    '重要制造间实现内外部协同',
    '利用知识或模型进行业务优化',
    '实现预测、预警、自适应，体现人工智能'
]

var sessionid = localStorage.getItem('sessionid')
var questionRollCompanyId = localStorage.getItem('questionRollCompanyId')

var levelResult = {
    "未达标": {
        desc: "该类还未达到成熟度模型要求的最低级别",
        advice: "可逐步推进该类的信息化，提升智能制造能力"
    },
    "已规划级": {
        desc: "该类实现业务流程化和初步信息化",
        advice: "可加强该类的标准化和数字化能力"
    },
    "规范级": {
        desc: "该类实现标准化和数字化",
        advice: "可加强该类与外部环境的融合能力"
    },
    "集成级": {
        desc: "该类实现内外部协同",
        advice: "可加强该类的内部经验和知识建模，提高智能水平"
    },
    "优化级": {
        desc: "该类利用知识模型进行业务优化",
        advice: "可加强该类的预测、预警、自适应能力，迈向人工智能"
    },
    "引领级": {
        desc: "该类实现预测、预警、自适应，体现人工智能",
        advice: "可持续改进该类智能制造能力，并为其他类的能力水平提升提供帮助"
    }
}

if (sessionid == null) {
    location.href = "./index.html";
}

// 时间戳 华为标准时间格式
function formatDate(nows) {
    var now = new Date(nows)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var timels = year;
    if (month < 10) {
        timels += "-" + '0' + month
    } else {
        timels += "-" + month
    }

    if (date < 10) {
        timels += "-" + '0' + date
    } else {
        timels += "-" + date
    }

    // if (hour < 10) {
    //     timels += " " + '0' + hour
    // } else {
    //     timels += " " + hour
    // }

    // if (minute < 10) {
    //     timels += ":" + '0' + minute
    // } else {
    //     timels += ":" + minute
    // }

    // if (second < 10) {
    //     timels += ":" + '0' + second
    // } else {
    //     timels += ":" + second
    // }
    return timels;
}

// 企业基本信息
function basicInfo() {
    var quest = {
        questionRollCompanyId: questionRollCompanyId
    }
    app.DataRequest(URL + 'questionRoll/getEvaluatinMsg', quest, function (err) {}, function (data) {
        $('#name').text(data[0].name)
        // console.log(data)
        $('#time').text(formatDate(data[0].time))
        if (data[0].companyType == '201') {
            $('#companyType').text('流程型')
            $('#subType').find('span').eq(4).hide()
        } else if (data[0].companyType == '203') {
            $('#companyType').text('离散型')
            $('#subType').find('span').eq(4).show()
        }
        if (data[0].EvaluatinType == '0') {
            $('#EvaluatinType').text('分项测评')
        } else if (data[0].EvaluatinType == '1') {
            $('#EvaluatinType').text('整体测评')
        }

        $('#renderPdf').attr('data-companyName',data[0].name)
    })

}

// 所处位置
function sub_quest() {
    var quest = {
        id: questionRollCompanyId,
        companyId: localStorage.getItem('id'),
    }

    app.DataRequest(URL + 'count/level', quest, function (err) {}, function (data) {
        if (!data[0]) {
            return
        }
        if (data[0].status == 1) {
            $('#headline').html(data[0].questionRollName)
            var textHtml = ''
            var kind = data
            for (var i = 0; i < kind.length; i++) {
                var windthLoca = "55px"
                var marginLeft = "0px"

                if (kind[i].level1Name != "未达标") {
                    windthLoca = "120px"
                }


                if (kind[i].kind.split('-')[2] == '设计') {
                    $('#subType').find('span').eq(0).addClass('subTypeSpan')
                } else if (kind[i].kind.split('-')[2] == '生产') {
                    $('#subType').find('span').eq(1).addClass('subTypeSpan')
                } else if (kind[i].kind.split('-')[2] == '物流') {
                    $('#subType').find('span').eq(2).addClass('subTypeSpan')
                } else if (kind[i].kind.split('-')[2] == '销售') {
                    $('#subType').find('span').eq(3).addClass('subTypeSpan')
                } else if (kind[i].kind.split('-')[2] == '服务') {
                    $('#subType').find('span').eq(4).addClass('subTypeSpan')
                }

                // 进度条的颜色值变化
                var style_span_color1 = '#FFFFFF'
                var style_span_color2 = '#FBFBFB'
                var style_span_color3 = '#F7F7F7'
                var style_span_color4 = '#F4F4F4'
                var style_span_color5 = '#F1F1F1'
                var kindll = 0
                if (kind[i].evaluateLevel == '1级') {
                    style_span_color1 = '#d9c5ff'
                    kindll = 1
                    marginLeft = "55px"
                } else if (kind[i].evaluateLevel == '2级') {
                    style_span_color1 = '#d9c5ff'
                    style_span_color2 = '#aaa1ee'
                    kindll = 2
                    marginLeft = "175px"
                } else if (kind[i].evaluateLevel == '3级') {
                    style_span_color1 = '#d9c5ff'
                    style_span_color2 = '#aaa1ee'
                    style_span_color3 = '#a4b1df'
                    kindll = 3
                    marginLeft = "295px"
                } else if (kind[i].evaluateLevel == '4级') {
                    style_span_color1 = '#d9c5ff'
                    style_span_color2 = '#aaa1ee'
                    style_span_color3 = '#a4b1df'
                    style_span_color4 = '#74c2e1'
                    kindll = 4
                    marginLeft = "415px"
                } else if (kind[i].evaluateLevel == '5级') {
                    style_span_color1 = '#d9c5ff'
                    style_span_color2 = '#aaa1ee'
                    style_span_color3 = '#a4b1df'
                    style_span_color4 = '#74c2e1'
                    style_span_color5 = '#829ced'
                    kindll = 5
                    marginLeft = "535px"
                }
                var style_site = kindll * 19

                textHtml += '<div>'
                textHtml += '<div class = "left">'
                textHtml += '<h4 class = "mes_type"> ' + kind[i].kind.split('-')[2] + '能力 </h4>'
                textHtml += '<p> 该能力得分 <strong>' + parseFloat(kind[i].resultScore).toFixed(2) + '</strong>,级别：<span class="norm">' + kind[i].level1Name + '</span> </p>'
                textHtml += '<div style = "color : #7f7f7f"> ' + levelResult[kind[i].level1Name].desc + ',' + levelResult[kind[i].level1Name].advice + ' 。</div>'
                textHtml += '</div>'
                textHtml += '<div class = "right">'
                textHtml += '<div>'
                textHtml += '<div class = "location" style="width: ' + windthLoca + '; margin-left: ' + marginLeft + ';">'
                textHtml += '<i class = "glyphicon glyphicon-map-marker"> </i>'
                textHtml += '</div>'
                textHtml += '<span class = "backgroundZero"> </span>'
                textHtml += '<span style = "background-color:' + style_span_color1 + ';"> </span>'
                textHtml += '<span style = "background-color:' + style_span_color2 + ';"> </span>'
                textHtml += '<span style = "background-color:' + style_span_color3 + ';"> </span>'
                textHtml += '<span style = "background-color:' + style_span_color4 + ';"> </span>'
                textHtml += '<span style = "background-color:' + style_span_color5 + ';"> </span>'
                textHtml += '</div>'
                textHtml += '</div></div>'
            }
            $('#ability_rank').html(textHtml)
            sub_industry()
        }
    })
}

// 行业所在位置   地区所在位置 
function sub_industry() {
    var quest = {
        sessionid: sessionid,
        question_roll_company_id: questionRollCompanyId,
        isHistorical: localStorage.getItem('optinosss'),
    }

    app.DataRequest(URL + 'overallEvaluation/getOverallEvaluationFx1', quest, function (err) {}, function (data) {
        // 行业-所在位置
        var indFx = data[0].industryZbByFx
        var indFxText = ''
        var divID = new Array()
        // console.log(indFx)
        for (var i = 0; i < indFx.length; i++) {
            var divId = 'histogram' + i
            indFxText += ' <div id="histogram' + i + '"></div>'
            divID.push(divId)
        }

        $('#rankedDistributionImg').html(indFxText)

        setTimeout(function () {
            for (var i = 0; i < indFx.length; i++) {
                var scoreData = new Array()
                var nameText = '测评企业' + indFx[i].name.split('-')[2] + '能力等级分布'

                for (var j = 0; j < indFx[i].tx.length; j++) {
                    scoreData.push(indFx[i].tx[j].zb)
                }
                histograms(scoreData, divID[i], nameText)
            }
        }, 0);
    })
}

// 雷达图数据
function radarDataL() {
    var name = [{
            text: '一级'
        },
        {
            text: '二级'
        },
        {
            text: '三级'
        },
        {
            text: '四级'
        },
        {
            text: '五级'
        },
    ]

    var quest = {
        id: questionRollCompanyId,
    }
    app.DataRequest(URL + 'count/getAreaScore', quest, function (err) {}, function (data) {
        if (data[0].status != '1') {
            alert('数据请求失败，请重试')
            return
        }

        var radaData = data[0].areaScore

        var radaHtml = ''
        var radaID = new Array()

        for (var i = 0; i < radaData.length; i++) {
            var ranID = 'rada' + i
            radaHtml += '<div>'
            radaHtml += '<h3>' + radaData[i].name.split('-')[2] + '能力</h3>'
            radaHtml += '<p>' + radaData[i].name.split('-')[3] + '域各级别得分详情</p>'
            radaHtml += '<hr/>'
            radaHtml += '<div class="radarImage" id="rada' + i + '"></div>'
            radaHtml += '</div>'
            radaID.push(ranID)
        }
        $('#loctt').html(radaHtml)

        setTimeout(function () {
            for (var i = 0; i < radaData.length; i++) {
                var randata = new Array()
                var ran = new Array()
                for (var j = 0; j < radaData[i].text.length; j++) {
                    randata.push(radaData[i].text[j].score)
                    var textNmame = ''
                    if (radaData[i].text[j].level == '501') {
                        textNmame = '一级'
                    } else if (radaData[i].text[j].level == '502') {
                        textNmame = '二级'
                    } else if (radaData[i].text[j].level == '503') {
                        textNmame = '三级'
                    } else if (radaData[i].text[j].level == '504') {
                        textNmame = '四级'
                    } else if (radaData[i].text[j].level == '505') {
                        textNmame = '五级'
                    }

                    ran.push({
                        name: textNmame,
                        max: 1
                    })
                }
                radar(radaID[i], ran, randata)

            }
        }, 0);
    })
}

// 雷达图
function radar(docRadar, name, data) {
    var domAir1 = document.getElementById(docRadar);
    var myChartAir1 = echarts.init(domAir1);
    // var myChartAir1 = echarts.init(docRadar[0])
    option = {
        color: ['#a5b9f6'],
        radar: {
            center: ['50%', '50%'],
            radius: 75,
            startAngle: 75,
            splitNumber: 4,
            shape: 'circle',
            name: {
                textStyle: {
                    color: '#999',
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    padding: [1, 2],
                },
            },
            nameGap: '5',
            splitNumber: '4',
            shape: 'circle',
            splitArea: {
                show: 'true',
                areaStyle: {
                    color: '#fff',
                },
            },
            indicator: name,
        },
        series: [{
            type: 'radar',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#333'
                    }
                }
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0,
                            color: '#cdeffb' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#a5b9f6' // 100% 处的颜色
                        }],
                    },
                },
                emphasis: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0,
                            color: '#cdeffb',
                        }, {
                            offset: 1,
                            color: '#a5b9f6',
                        }],
                    },
                },

            },
            itemStyle: {
                emphasis: {
                    lineStyle: {
                        // width: 2,
                        borderColor: '#4462B8',
                        borderWidth: 3,
                    },
                    areaStyle: {
                        color: '#ffffff',
                        opacity: 0.5,
                    },
                    // shadowColor:"#ffffff"
                },
            },
            data: [{
                value: data,
                // name: '预算分配'
            }],
        }],
    }
    myChartAir1.setOption(option, true)
}

// 显示柱状图
function histograms(hisID, his, nameText) {
    var domAir11 = document.getElementById(his);
    var myChartAir11 = echarts.init(domAir11);
    optionss1 = {
        color: ['#A9BCF7'],
        title: {
            x: 'center',
            y: '30',
            text: nameText,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{c}%'
        },
        grid: {
            top: '100',
            left: '5%',
            right: '6%',
            bottom: '2%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['不达标', '已规划级', '规范级', '集成级', '优化级', '引领级'],
            axisLabel: {
                interval: 0,
                rotate: 30,
                align: 'right',
            }
        }],
        yAxis: [{
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            type: 'value',
            max: 100,
            min: 0,
            axisLabel: {
                formatter: '{value} %'
            }
        }],
        series: [{
            type: 'bar',
            barWidth: '60%',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%'
                }
            },
            itemStyle: {
                normal: {
                    barBorderRadius: 30,
                    color: function (params) {
                        var colorList = ['#dddddd', '#d9c5ff', '#aaa1ee', '#a4b1df', '#74c2e1', '#829ced'];
                        return colorList[params.dataIndex]
                    }
                }
            },
            data: hisID
        }]
    };
    myChartAir11.setOption(optionss1, true)
}