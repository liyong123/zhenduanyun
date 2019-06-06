$(".headUser").click(function () {
    $(".signOut").show();
});

$("main").click(function () {
    $(".signOut").hide();
});

// 最小值
Array.prototype.min = function () {
    var min = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++) {
        if (this[i] < min) {
            min = this[i];
        }
    }
    return min;
}
//最大值
Array.prototype.max = function () {
    var max = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++) {
        if (this[i] > max) {
            max = this[i];
        }
    }
    return max;
}

// 处理时间戳
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

var sessionid = localStorage.getItem('sessionid')

if (sessionid == null) {
    location.href = "./index.html";
}

var data_con_detail = [
    '<p>本次智能制造能力成熟度测评未达到任何等级，企业智能制造能力非常薄弱，企业需要从智能制造基础环节逐步完善</p><p>企业需要在智能制造改造路径规划和企业核心业务信息化方面投入更多资源，以帮助企业启动智能制造改造行动，逐步提供企业智能制造能力。</p>',
    '<p>在这个级别下，企业有了实施智能制造的想法，开始进行规划和投资。部分核心的制造环节已实现业务流程信息化，具备部分满足未来通信和集成需求的基础设施，企业已开始基于 IT 进行制造活动，但只是具备实施智能制造的基础条件，还未真正进入到智能制造的范畴。</p><P>企业还需要将智能制造的想法付诸于行动，将更多的业务纳入信息化，在设备数字化方面也要同步增加投入，增加信息化和自动化的覆盖范围。</p>',
    '<p>在这个级别下，企业已形成了智能制造的规划，对支撑核心业务的设备和系统进行投资，通过技术改造，使得主要设备具备数据采集和通信的能力，实现了覆盖核心业务重要环节的自动化、数字化升级。通过制定标准化的接口和数据格式，部分支撑生产作业的信息系统能够实现内部集成，数据和信息在业务内部实现共享，企业开始迈进智能制造的门槛。</p><p>企业需要在核心业务系统集成方面投入更多关注，并增加数字化设备网络化能力，在企业进行应用系统和数字化设备的全面集成，使数据在企业范围内各业务部门间集成。</p>',
    '<p>在这个级别下，企业对智能制造的投资重点开始从对基础设施、生产装备和信息系统等的单项投入，向集成实施转变，重要的制造业务、生产设备、生产单元完成数字化、网络化改造，能够实现设计、生产、销售、物流、服务等核心业务间的信息系统集成，开始聚焦工厂范围内数据的共享，企业已完成了智能化提升的准备工作。</p><p>企业需要对企业数据的处理上增加投入，将企业内部经验和外部知识通过数据模型应用到运营管理中，提升企业智能化水平。</p>',
    '<p>在这个级别下，企业内生产系统、管理系统以及其他支撑系统已完成全面集成，实现了工厂级的数字建模，并开始对人员、装备、产品、环境所采集到的数据以及生产过程中所形成的数据进行分析，通过知识库、专家库等优化生产工艺和业务流程，能够实现信息世界与物理世界互动。从 3 级到 4 级体现了量变到质变的过程，企业智能制造的能力快速提升。</p><p>企业可以开始构建自学习型企业，增强企业系统的自适应，自我调节的能力，并加强与企业外部实现充分的数据融合。</p>',
    '<p>引领级是智能制造能力建设的最高程度，在这个级别下，数据的分析使用已贯穿企业的方方面面，各类生产资源都得以最优化的利用，设备之间实现自治的反馈和优化，企业已成为上下游产业链中的重要角色，个性化定制、网络协同、远程运维已成为企业开展业务的主要模式，企业成为本行业智能制造的标杆。</p><p>企业需要着手考虑减少人员干预，让企业运营实现完全自治。<p>'
]
var loc_detail = ['企业智能制造能力非常薄弱，;企业需要从智能制造基础环节逐步完善', '开始对智能制造进行规划，;部门核心业务有信息化基础', '核心业务重要环节实现了标准化和数字化，;单一业务内部开始实现数据共享', '核心业务间实现了集成，;数据在工厂范围内可共享', '能够对数据进行挖掘，实现了对知识、模型等的应;用，并能反馈优化核心业务流程，体现了人工智能', '实现了预测、预警、自适应，通过与产业链上;下游的横向集成，带动产业模式的创新']


var questionRollCompanyId = localStorage.getItem("questionRollCompanyId");
//  请求数据
function question_data() {
    var quest = {
        sessionid: sessionid,
        questionRollCompanyId: questionRollCompanyId,
        isHistorical: localStorage.getItem('optinosss')
    }
    app.DataRequest(URL + 'evaluateReuslts/getOverallAssessment', quest, function (err) {}, function (data) {
        var ls = 0
        if (data.finalLevel == '0级') {
            ls = 0
        } else if (data.finalLevel == '1级') {
            ls = 1
        } else if (data.finalLevel == '2级') {
            ls = 2
        } else if (data.finalLevel == '3级') {
            ls = 3
        } else if (data.finalLevel == '4级') {
            ls = 4
        } else if (data.finalLevel == '5级') {
            ls = 5
        }

        if (data.finalName == '未达标') {
            $('#last_text').hide()
        }

        $('#headline').html(data.questionRollName.split('（')[1])
        $('#ent_rank').html(data.finalName)
        setValue(data.finalScore, data.finalName);
        $('#con_detail').html(data_con_detail[ls])
        $('#score-title').text(data.finalName)
        $('#detail4').html(data.finalName)
        $('#detail5').html(loc_detail[ls].split(';')[0] + loc_detail[ls].split(';')[1])

       


        var scoreDetail = data.scoreDetail
        var scoreDetail_text = '<div class="loc_title">评测结果<div class="hrrs"></div>' +
            '<p>测评原则：当组织申请某等级的评价时，各级别内涉及的所有类的平均分值必须达到0.8分，才能视为满足该级,一等级内任何一个问题得分≠0，任何一个域的得分≥0.5，否则视为不具备此等级的能力要求。</p>' +
            '</div>'
        var rands = new Array()
        var randatas = new Array()

        // 雷达图
        var colors = new Array()
        for (var i = 0; i < scoreDetail.length; i++) {
            var styleone = ''
            var stylefontcolor = '#c8b3f2'
            var color = '#7594f3'
            if (scoreDetail[i].isReachStandard == '未达标') {
                styleone = 'style="background-color: #b7bccf;"'
                stylefontcolor = '#7d8397'
                color = '#b7bccf'
            }

            colors.push(color)

            var currentKind = scoreDetail[i].currentKindStore
            var cur_text = ''
            var text = data_con_detail[0]
            if (scoreDetail[i].levelName == '已规划级') {
                text = data_con_detail[1]
            }
            if (scoreDetail[i].levelName == '规范级') {
                text = data_con_detail[2]
            }
            if (scoreDetail[i].levelName == '集成级') {
                text = data_con_detail[3]
            }
            if (scoreDetail[i].levelName == '优化级') {
                text = data_con_detail[4]
            }
            if (scoreDetail[i].levelName == '引领级') {
                text = data_con_detail[5]
            }

            var score = new Array()
            for (var j = 0; j < currentKind.length; j++) {
                score.push(currentKind[j].classScore)
                var classstyle = 'style="color: #01ACED"'
                if (currentKind[j].classScore < 0.8) {
                    classstyle = 'style="color: #EFA04F"'
                }
                cur_text += '<dl>'
                cur_text += '<dt class="bColor" ' + classstyle + '>' + currentKind[j].classScore + '</dt>'
                cur_text += '<dd>' + currentKind[j].className.split('-')[2] + '</dd>'
                cur_text += '</dl>'
            }


            var min = score.min()
            var max = score.max()

            var mins = '是'
            var maxs = '是'
            for (var k = 0; k < currentKind.length; k++) {
                if (k == 0) {
                    if (min == currentKind[k].classScore) {
                        mins += ' ' + currentKind[k].className.split('-')[2]
                    }

                    if (max == currentKind[k].classScore) {
                        maxs += ' ' + currentKind[k].className.split('-')[2]
                    }

                } else {
                    if (min == currentKind[k].classScore) {
                        mins += ' ' + currentKind[k].className.split('-')[2]
                    }

                    if (max == currentKind[k].classScore) {
                        maxs += ' ' + currentKind[k].className.split('-')[2]
                    }
                }
            }

            if (mins == maxs && max > 0.8) {
                mins = '无'
            } else if (mins == maxs && min < 0.8) {
                maxs = '无'
            }

            scoreDetail_text += '<div class="project"><div class="left">'
            scoreDetail_text += '<div class="scores bColor" style="color:' + stylefontcolor + '">' + scoreDetail[i].score + '</div>'
            scoreDetail_text += '<div class="measure_name">' + scoreDetail[i].levelName + '</div>'
            scoreDetail_text += '<div class="measure" ' + styleone + '>'
            scoreDetail_text += scoreDetail[i].isReachStandard + '</div></div>'
            scoreDetail_text += '<div class="middle"><div class="middleScore">'
            scoreDetail_text += cur_text + '<div class="clearfix"></div></div>'
            scoreDetail_text += '<p>' + text + '</p>'
            scoreDetail_text += '<p>通过诊断，贵企业在该等级上薄弱环节' + mins + '，优势环节' + maxs + '</p></div>'
            scoreDetail_text += '<div class="right" id="cur' + i + '"></div>'
            scoreDetail_text += '<div class="clearfix"></div></div>'

            var ranID = 'cur' + i
            rands.push(ranID)
            randatas.push(scoreDetail[i])
        }

        // 渲染雷达图页面
        setTimeout(function () {
            for (var i = 0; i < rands.length; i++) {
                var randata = new Array()
                var ran = new Array()
                for (var j = 0; j < randatas[i].currentKindStore.length; j++) {
                    randata.push(randatas[i].currentKindStore[j].classScore)
                    ran.push({
                        name: randatas[i].currentKindStore[j].className.split('-')[2],
                        max: 1
                    })
                }
                randers(rands[i], ran, randata, colors[i])
            }
        }, 0);

        $('#detailed_results').html(scoreDetail_text)

        // 柱状图
        var chartArray = data.chartArray[0]
        // console.log(data)

        for (var lli = 0; lli < chartArray.companyZb.length; lli++) {
            if (data.finalName == chartArray.companyZb[lli].mc.split(':')[1]) {
                $('#detail3').text(chartArray.companyZb[lli].zb);
                break;
            }
        }

        // $('#detail2').text(chartArray.ztnl.evaluation_score)
        $('#detail6').text(chartArray.ztnl.cy)
        // 企业总占比
        var companyZb = chartArray.companyZb
        var company = new Array()
        // 行业总占比
        // var industryZb = chartArray.industryZb
        // var industry = new Array()
        // 地区总占比
        // var cityZb = chartArray.cityZb
        // var city = new Array()
        for (var i = 0; i < 6; i++) {
            company.push(companyZb[i].zb)
            // industry.push(industryZb[i].zb)
            // city.push(cityZb[i].zb)
        }
        histograms(company, "company")
        // histograms(industry, "industry")
        // histograms(city, "region")
    }, false)

    // 获取公司基本信息
    app.DataRequest(URL + 'questionRoll/getEvaluatinMsg', quest, null, function (data) {
        if (data.abort) {
            console.error('接口读取失败');
        } else {
            var noData = '无数据';
            var values = $('.rc-value');
            values.eq(0).text(get(data, '[0].company.name', noData))
            values.eq(1).text("智能制造能力成熟度模型白皮书1.0版（中国电子技术标准化研究院（CESI) )").css({
                'width': 'auto'
            })
            var time = get(data, '[0].time');
            if (time) {
                time = formatDate(time)
                // time = new Date(time).toLocaleDateString();
            }
            values.eq(2).text(time || noData);

            var companyType = get(data, '[0].companyType');
            if (companyType == 201) {
                companyType = '流程型'
            } else if (companyType == 203) {
                companyType = '离散型'
            }
            values.eq(3).text(companyType || noData);

            var EvaluatinType = get(data, '[0].EvaluatinType')
            if (EvaluatinType == 0) {
                EvaluatinType = '分项'
            } else if (EvaluatinType == 1) {
                EvaluatinType = '整体'
            }
            values.eq(4).text(EvaluatinType || noData);

             $('#renderPdf').attr('data-companyName',get(data, '[0].company.name', noData))

        }
    })
}

// 控制圆盘的的显示
function setValue(value, name) {
    var colors = ['#b7bccf', '#ded1f7', '#aaa1ee', '#bfccf1', '#a8e0f4', '#a9bcf7'],
        titles = ['未达标', '已规划级', '规范级', '集成级', '优化级', '引领级']
    var index = titles.indexOf(name);
    if (index != -1) {
        if (index != 0&&index<=3) {
            $('#arrow').show().css({
                /*'transform': 'rotate(' + (18 - 20 * (index - 1)) + 'deg)'*/
                'transform': 'rotate(' + (44 - 22 * (index - 1)) + 'deg)',
                '-ms-transform': 'rotate(' + (44 - 22 * (index - 1)) + 'deg)',
                '-webkit-transform': 'rotate(' + (44 - 22 * (index - 1)) + 'deg)',
                'top':462-(index-1)* 75 +"px",
                'left':337 +(index-1) * 30 +"px"
            })
            if(index==2){
                $('#arrow').show().css({
                    'left':340 +(index-1) * 40 +"px"
                })
            }
        }else if(index!=0&&index>3&&index<=5){
            $('#arrow').show().css({
                'transform': 'rotate(' + (44 - 22 * (index - 1)) + 'deg)',
                '-ms-transform': 'rotate(' + (44 - 22 * (index - 1)) + 'deg)',
                '-webkit-transform': 'rotate(' + (44 - 22 * (index - 1)) + 'deg)',
                'top':462-(index-1)* 75 +"px",
                'left':397 -(index-3) * 30 +"px"
            })
            if(index==4){
                $('#arrow').show().css({
                    'left':400 -(index-3) * 20 +"px"
                })
            }   
        }

        $('#score_bg').css({
            fill: colors[index]
        })

        // $('#score-title').text(name)
        $('#DetailOne').text(loc_detail[index].split(';')[0])
        $('#DetailTwo').text(loc_detail[index].split(';')[1])
    } else {
        console.error('值错误')
        $('#arrow').hide();
    }

    $('#det_score').html(value);
    $('#detail2').html(value)
}


$(function () {
    var questss = {
        questionRollCompanyId: questionRollCompanyId,
        status: 99
    }
    app.DataRequest(URL + 'questionRoll/updateQuestionCompany', questss, function (err) {}, function (data) {})

    question_data()
});

// 显示柱状图
function histograms(hisID, his) {
    var domAir11 = document.getElementById(his);
    var myChartAir11 = echarts.init(domAir11);
    optionss1 = {
        color: ['#A9BCF7'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{c}%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '4%',
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
                },
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

// 显示雷达图
function randers(ranID, ran, randata, color) {
    var domAir1 = document.getElementById(ranID);
    var myChartAir1 = echarts.init(domAir1);
    var itemcolor = [color];
    // '#01ACED'
    option = {
        color: itemcolor,
        radar: [{
            indicator: ran,
            center: ['50%', '50%'],
            radius: 90,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            name: {
                formatter: '{value}',
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(255, 255, 255, 0)']
                }
            },
        }],
        series: [{
            name: '雷达图',
            type: 'radar',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#333'
                    }
                }
            },
            itemStyle: {
                emphasis: {
                    lineStyle: {
                        borderColor: '#4462B8',
                        borderWidth: 3

                    },
                    areaStyle: {
                        color: '#ffffff',
                        opacity: 0
                    }
                }
            },
            data: [{
                value: randata,
                areaStyle: {
                    normal: {
                        color: color,
                        opacity: 0.5
                    }
                }
            }]
        }],
    }
    myChartAir1.setOption(option, true)
}