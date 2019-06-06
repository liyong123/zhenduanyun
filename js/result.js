$(document).ready(function () {
    normClassify();
    getComInfo();

    $('.circle').each(function () {
        var num = $(this).find('span').html() * 3.6;
        if (num <= 180) {
            $(this).find('.right').css('transform', "rotate(" + num + "deg)");
        } else {
            $(this).find('.right').css('transform', "rotate(180deg)");
            $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
        }
        ;
    });
});

$(".rCenTab_item").click(function () {
    $(this).addClass("rCenTabOn").siblings().removeClass("rCenTabOn");
});

// 指标分类
function normClassify() {
    data = {}
    app.DataRequest(URL + 'performanceReport/normClassify', data, function (err) {
        },
        function (msg) {
            var NormClassify = msg[0].NormClassify;
            var str1 = '',
                str2 = '',
                str3 = '',
                str4 = '',
                str5 = '';
            for (var i = 0; i < NormClassify.length; i++) {
                if (i == 0) {
                    getClassifyDetail(NormClassify[i].id);
                    str1 += '<i class="tabIcon" id="' + NormClassify[i].id + '"></i>' + NormClassify[i].name + ''
                } else if (i == 1) {
                    str2 += '<i class="tabIcon" id="' + NormClassify[i].id + '"></i>' + NormClassify[i].name + ''
                } else if (i == 2) {
                    str3 += '<i class="tabIcon" id="' + NormClassify[i].id + '"></i>' + NormClassify[i].name + ''
                } else if (i == 3) {
                    str4 += '<i class="tabIcon" id="' + NormClassify[i].id + '"></i>' + NormClassify[i].name + ''
                } else if (i == 4) {
                    str5 += '<i class="tabIcon" id="' + NormClassify[i].id + '"></i>' + NormClassify[i].name + ''
                }
            }
            $(".rCenTaba").html(str1);
            $(".rCenTabb").html(str2);
            $(".rCenTabc").html(str3);
            $(".rCenTabd").html(str4);
            $(".rCenTabe").html(str5);
        });
}

var year = localStorage.getItem("year");
var benYear = localStorage.getItem("benYear");

//企业信息
function getComInfo() {
    data = {
        inputYear: year,
        comparisonYear: benYear,
        questionRollCompanyId: qId
    }
    app.DataRequest(URL + '/enterpriseEvaluation/getEnterpriseEvaluation', data, function (err) {
        },
        function (msg) {
            var score = msg.enterpriseEvalOutline.evalScore;
            var status = '';
            if (score > 0 && score < 28) {
                status = '较差'
            } else if (score > 29 && score < 56) {
                status = '较低'
            } else if (score > 57 && score < 84) {
                status = '平均'
            } else if (score > 85 && score < 112) {
                status = '良好'
            } else if (score > 113 && score < 140) {
                status = '优秀'
            }
            $('.evalStatus').text(status)
            var spanScore = (score / 140) * 100;
            $(".mask span").text(spanScore)
            $(".companyName").text(msg.enterpriseEvalBaseInfo.companyName);
            $(".companyStandard").text(msg.enterpriseEvalBaseInfo.companyStandard);
            $(".dataYear").text(msg.enterpriseEvalBaseInfo.dataYear);
            $(".fromIndustry").text(msg.enterpriseEvalBaseInfo.fromIndustry);
            $(".evalDate").text(msg.enterpriseEvalBaseInfo.evalDate);
            $(".compareYear").text(msg.enterpriseEvalBaseInfo.compareYear);
            $(".evalScore").text(score);
            $(".industryRank").text(msg.enterpriseEvalOutline.industryRank);
            $(".overIndustry").text(msg.enterpriseEvalOutline.overIndustry);
            $(".companyStandardRank").text(msg.enterpriseEvalOutline.companyStandardRank);
            $(".overCompanyStandard").text(msg.enterpriseEvalOutline.overCompanyStandard);

            var pieData1 = [],
                pieData2 = [];
            var mpmc = msg.mpmc;
            for (var i = 0; i < mpmc.length; i++) {
                var pie = {};
                pie["value"] = mpmc[i].value;
                pie["name"] = mpmc[i].name;
                pieData1.push(pie)
            }
            var mpmcTgm = msg.mpmcTgm;
            for (var i = 0; i < mpmcTgm.length; i++) {
                var pie = {};
                pie["value"] = mpmc[i].value;
                pie["name"] = mpmc[i].name;
                pieData2.push(pie)
            }
            infoPie("pie1", pieData1, "按行业分布");
            infoPie("pie2", pieData2, "按规模分布");
        }, false);
}

//对标详细
$(".rCenTab_item").click(function () {
    var id = $(this).find("i").attr("id");
    getClassifyDetail(id);
});


function getClassifyDetail(id) {
    data = {
        normClassifyId: id,
        inputYear: year,
        questionRollCompanyId: qId,
        comparisonYear: benYear,// my data
    }
    var LpieChart = "";
    var RpieChart = "";
    var TabName = "";
    if (id == "ZB1") {
        LpieChart = "pieChart1";
        RpieChart = "pieChart2";
        TabName = "";
    } else if (id == "ZB2") {
        LpieChart = "pieChart3";
        RpieChart = "pieChart4";
        TabName = "zc";
    } else if (id == "ZB3") {
        LpieChart = "pieChart5";
        RpieChart = "pieChart6";
        TabName = "zw";
    } else if (id == "ZB4") {
        LpieChart = "pieChart7";
        RpieChart = "pieChart8";
        TabName = "jy";
    } else if (id == "ZB5") {
        LpieChart = "pieChart9";
        RpieChart = "pieChart10";
        TabName = "bc";
    }
    var pieData1 = [],
        pieData2 = [];

    app.DataRequest(URL + 'performanceReport/resultByNormClassify', data, function (err) {
        },
        function (msg) {
            var inputScoreData = msg[0].InputScoreAndComparisonData;

            if (msg[0].totalCount == '-1' || !inputScoreData.length) {
                $(".totalCount_no").html("N").css('color', '#BBBBBB');
                $(".totalCountText_txt").html("无");
                $(".totalCount").html('企业' + (inputScoreData.length ? inputScoreData[0].normClassifyName : '') + '得分 :<span class="color23">无</span>');
                $(".totalCountText").html('' + (inputScoreData.length ? inputScoreData[0].normClassifyName : '') + '状态 ：<span class="color53">无</span>');

                if (!inputScoreData.length) {
                    return;
                }

            } else {
                $(".totalCount_no").html("N").css('color', '#fff');
                $(".totalCount_no").html(msg[0].totalCount);
                $(".totalCountText_txt").html(msg[0].totalCountText);
                $(".totalCount").html('企业' + inputScoreData[0].normClassifyName + '得分 :<span class="color23">' + msg[0].totalCount + '</span>分');
                $(".totalCountText").html('' + inputScoreData[0].normClassifyName + '状态 ：<span class="color53">' + msg[0].totalCountText + '</span>');
            }
            //仪表图
            var str = '';
            for (var i = 0; i < inputScoreData.length; i++) {
                str += '<div class="gaugeChart">'
                str += '<div id="' + TabName + 'gauge' + i + '"></div>'
                str += '</div>'
            }
            str += '<div class="clearfix"></div>'
            $(".rCenTabTop_right:eq(" + $('.rCenTabOn').index() + ")").html(str);
            for (var i = 0; i < inputScoreData.length; i++) {
                if (!inputScoreData[i].area) {
                    gaugeGray(TabName + 'gauge' + i, inputScoreData[i]);
                } else {
                    gauge(TabName + 'gauge' + i, inputScoreData[i]);
                }
            }

            //行业分布情况
            var industryPie = msg[0].industryTotalScore;
            if (!industryPie[0].msg) {
                for (var i = 0; i < industryPie.length; i++) {
                    var pie = {};
                    pie["value"] = industryPie[i].value;
                    pie["name"] = industryPie[i].name;
                    pieData1.push(pie)
                }
                pieChart(LpieChart, pieData1, inputScoreData[0].normClassifyName + "-行业分布情况");
            } else {
                pieChart(LpieChart, pieData1, inputScoreData[0].normClassifyName + "-行业分布情况暂无数据");
            }

            //规模分布情况
            var scaleTotalScore = msg[0].scaleTotalScore;
            if (!scaleTotalScore[0].msg) {
                for (var i = 0; i < scaleTotalScore.length; i++) {
                    var pie = {};
                    pie["value"] = scaleTotalScore[i].value;
                    pie["name"] = scaleTotalScore[i].name;
                    pieData2.push(pie)
                }
                pieChart(RpieChart, pieData2, inputScoreData[0].normClassifyName + "-规模分布情况");
            } else {
                pieChart(RpieChart, pieData2, inputScoreData[0].normClassifyName + "-规模分布情况暂无数据");
            }
        });
}

//评价结论饼状图
function infoPie(id, pictData, title) {
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        color: ['#5388f0', '#23b7e5', '#b0c2f9', '#bcb0f9', '#ffc016'],
        title: {
            text: title,
            left: '27%',
            bottom: '0%',
            textStyle: {
                color: '#23b7e5',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"//"{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            // orient: 'vertical',
            right: '5%',
            bottom: '20%',
            width: '250px',
            data: ['较差值', '较低值', '平均值', '良好值', '优秀值']
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['10%', '80%'],
            center: ['35%', '45%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderType: 'solid',
                },
            },
            data: pictData
        }]
    };
    myChart.setOption(option);
}

//仪表图
function gauge(id, gaugeData) {
    var data = [];
    if (!gaugeData.inputScore) {
        gaugeData.inputScore = '';
    }
    if (!gaugeData.poor) {
        gaugeData.poor = '';
    }
    if (!gaugeData.lower) {
        gaugeData.lower = '';
    }
    if (!gaugeData.average) {
        gaugeData.average = '';
    }
    if (!gaugeData.good) {
        gaugeData.good = '';
    }
    if (!gaugeData.excellent) {
        gaugeData.excellent = '';
    }
    var pie = {};
    //todo: 反向问题
    var kedu = [
        parseFloat(gaugeData.poor),
        parseFloat(gaugeData.lower),
        parseFloat(gaugeData.average),
        parseFloat(gaugeData.good),
        parseFloat(gaugeData.excellent)];
    var keduP = [];
    var keduX = [0, 25, 50, 75, 100];
    var current = parseFloat(gaugeData.inputScore);
    var total = Math.abs(kedu[4] - kedu[0]);
    var direction = kedu[4] > kedu[0] ? 1 : -1;
    var value = null;
    for (var i = 4; i >= 0; i--) {
        var k = kedu[i];
        var k1 = Math.abs(100 * (k - kedu[0]) / total);//真百分比
        keduP.push(k1);

        if (direction == -1) {
            if (value == null && current <= k && current < kedu[0]) {
                value = keduX[i + 1] + (keduX[i] - keduX[i + 1]) * (current - kedu[i + 1]) / (kedu[i] - kedu[i + 1]);
            }
        } else if (value == null && current >= k && current < kedu[4]) {
            value = keduX[i] + (keduX[i + 1] - keduX[i]) * (current - kedu[i]) / (kedu[i + 1] - kedu[i]);
        }
    }
    if (!value) {
        value = 100 * direction * (gaugeData.inputScore - gaugeData.poor)
    }
    pie["value"] = value;
    pie["name"] = gaugeData.normName;
    data.push(pie);
    var myChart = window.myChart = echarts.init(document.getElementById(id));
    var option = {

        tooltip: {
            show: false,
            formatter: "{a} <br/>{b} : {c}"
        },
        series: [{
            name: '业务指标',
            type: 'gauge',
            // min: gaugeData.poor,
            // max: gaugeData.excellent,
            splitNumber: 4,
            axisLabel: {
                // show: false,
                distance: 0,
                formatter: function (e) {
                    var length = gaugeData.excellent - gaugeData.poor;
                    var start = parseFloat(gaugeData.poor);
                    switch (e + "") {
                        case "0":
                            return start + "";
                        case "25":
                            return gaugeData.lower + "";//(start+length*0.25).toFixed(1)//
                        case "50":
                            return gaugeData.average + "";//(start+length*0.5).toFixed(1)//
                        case "75":
                            return gaugeData.good + "";//(start+length*0.75).toFixed(1)//
                        case "100":
                            return gaugeData.excellent + "";
                        default:
                            return "";
                    }
                },
            },
            detail: {
                formatter: '{value}',
                fontSize: 20,
                offsetCenter: [0, '85%'],
                formatter: function (value) {
                    var val = gaugeData.inputScore;
                    return parseFloat(val.substring(0, val.indexOf(".") + 4));
                },
            },
            data: data,
            axisLine: {
                lineStyle: {
                    width: 3,
                    color: [
                        [0.25, '#ffc016'],
                        [0.5, '#bcb0f9'],
                        [0.75, '#b0c2f9'],
                        [1, '#23b7e5'],
                        // [1, '#5388f0']
                    ]
                },
            },
            axisTick: {
                // show: false,
                length: 5,
                lineStyle: {
                    color: 'auto'
                }
            },
            splitLine: {
                // show: false,
                length: 10,
                lineStyle: {
                    color: 'auto'
                }
            },
            title: {
                offsetCenter: [0, '115%'],
                fontSize: 12
            },
            pointer: {
                width: 4,
            }
        }]
    };

    myChart.setOption(option);
}

//灰色仪表图
function gaugeGray(id, gaugeData) {
    var myChart = window.myChart = echarts.init(document.getElementById(id));
    var option = {
        tooltip: {
            show: false,
            formatter: "{a} <br/>{b} : {c}"
        },
        series: [{
            name: '业务指标',
            type: 'gauge',
            axisLabel: {
                distance: 0,
                formatter: function (e) {
                    switch (e + "") {
                        case "0":
                            return "0";
                        case "30":
                            return "0";
                        case "50":
                            return "0";
                        case "70":
                            return "0";
                        case "100":
                            return "0";
                        default:
                            return "";
                    }
                },
            },
            detail: {
                formatter: '{value}',
                fontSize: 16,
                offsetCenter: [0, '85%'],
                color: '#333',
                formatter: function (value) {
                    return '暂无数据';
                },
            },
            data: [{
                value: '',
                name: gaugeData.normName
            }],
            axisLine: {
                lineStyle: {
                    width: 3,
                    color: [
                        [0.2, '#e1e1e1'],
                        [0.4, '#e1e1e1'],
                        [0.6, '#e1e1e1'],
                        [0.8, '#e1e1e1'],
                        [1, '#e1e1e1']
                    ]
                },
            },
            axisTick: {
                length: 5,
                lineStyle: {
                    color: 'auto'
                }
            },
            splitLine: {
                length: 10,
                lineStyle: {
                    color: 'auto'
                }
            },
            title: {
                offsetCenter: [0, '115%'],
                fontSize: 12
            },
            pointer: {
                width: 4,
            }
        }]
    };

    myChart.setOption(option);
}

//行业对标明细饼状图
function pieChart(id, pictData, title) {
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        color: ['#5388f0', '#23b7e5', '#b0c2f9', '#bcb0f9', '#ffc016'],
        title: {
            text: title,
            top: '35%',
            right: '15%',
            textStyle: {
                color: '#333',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}"//"{a} <br/>{b}: {c} "
        },
        legend: {
            // orient: 'vertical',
            right: '15%',
            bottom: '20%',
            width: '200px',
            data: ['较差', '较低', '平均', '良好', '优秀']
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['10%', '80%'],
            center: ['25%', '55%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderType: 'solid',
                },
            },
            data: pictData
        }]
    };
    myChart.setOption(option);
}