$(document).ready(function () {
    normClassify();
    getComInfo();
    getComData();

});

// 指标分类
function normClassify() {
    data = {}
    app.DataRequest(URL + 'performanceReport/normClassify', data, function (err) {},
        function (msg) {
            var NormClassify = msg[0].NormClassify;
            // getClassifyDetail(1, 'ZB5', '测试');
            for (var i = 0; i < NormClassify.length; i++) {
                getClassifyDetail(i, NormClassify[i].id, NormClassify[i].name);
            }
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
    app.DataRequest(URL + '/enterpriseEvaluation/getEnterpriseEvaluation', data, function (err) {},
        function (msg) {
            var score = msg.enterpriseEvalOutline.evalScore;
            var status = '',
                color = '';
            if (score <= 56) {
                status = '较差'
                color = '#d6cbec'
            } else if (score > 56 && score <= 69) {
                status = '较低'
                color = '#bcb6e9'
            } else if (score > 69 && score <= 97) {
                status = '平均'
                color = '#b5c5f4'
            } else if (score > 97 && score <= 117) {
                status = '良好'
                color = '#4abeec'
            } else if (score > 117 && score <= 140) {
                status = '优秀'
                color = '#7f9be7'
            }
            $(".comState big").text(score).css('color', color);
            $(".comScore").text(score).css('color', color);
            $('.comState small').text(status).css('color', color);
            $(".comScoreProBlue").css({
                'background-color': color,
                'width': (score / 140) * 100 + '%'
            });

            $(".companyName").text(msg.enterpriseEvalBaseInfo.companyName);
            $(".companyStandard").text(msg.enterpriseEvalBaseInfo.companyStandard);
            $(".dataYear").text(msg.enterpriseEvalBaseInfo.dataYear);
            $(".fromIndustry").text(msg.enterpriseEvalBaseInfo.fromIndustry);
            $(".evalDate").text(msg.enterpriseEvalBaseInfo.evalDate);
            $(".compareYear").text(msg.enterpriseEvalBaseInfo.compareYear);
            //饼状图
            comDataPie('comChart', msg.mpmcTgm);
        }, false);
}

//对标信息
function getComData() {
    data = {
        inputYear: year,
        comparisonYear: benYear,
        questionRollCompanyId: qId
    }
    app.DataRequest(URL + '/performanceReport/getBenchmarkData', data, function (err) {},
        function (msg) {
            $(".benchmarkCom").text(msg[0].industry);
            $(".BenchmarkArea").text(msg[0].area);
            $(".BenchmarkMsg").text(msg[0].msg);
        }, false);
}

//行业对标明细
function getClassifyDetail(no, id, name) {



    data = {
        normClassifyId: id,
        inputYear: year,
        questionRollCompanyId: qId,
        comparisonYear: benYear, // my data
    }

    app.DataRequest(URL + 'performanceReport/resultByNormClassify', data, function (err) {},
        function (msg) {
            var str = '',
                tbl = '',
                wid = null;
            var inputData = msg[0].InputScoreAndComparisonData;
            str += '<div class="resultCen">'
            str += '<div class="rCenTab_item rCenTabOn">'
            str += '<div class="rCenTab' + no + ' rCenTab_itemBg"><i class="tabIcon"></i>' + name + '</div>'
            str += '</div>'
            str += '<div class="resultCenCon">'
            str += '<div class="resultCenCon_top">'
            str += '<div id="aaa" class="resultCenCon_topLeft">'
            //str += '<div class="detailTile">' + (inputData.length ? inputData[0].normClassifyName + ':' : '') + '</div>'
            //str += '<div id="aaa" class="resultCenCon_proGray">'
            var sumScore = msg[0].scoreList;
            str += '</div>'
            str += '<div class="resultCenCon_topRight">'
            for (var i = 0; i < sumScore.length; i++) {
                str += '<div><span>' + sumScore[i].scoreMin + '-' + sumScore[i].scoreMax + '分 为' + sumScore[i].name + '</span> <i class="resultColor' + i + '"></i></div>'
            }
            str += '</div>'
            str += '<div class="clearfix"></div>'
            str += '</div>'
            str += '<div class="resultCenCon_center">'
            for (var i = 0; i < inputData.length; i++) {
                tbl += '<tr>'
                tbl += '<td>' + inputData[i].normName + '</td>'
                tbl += '<td>' + (inputData[i].poor ? inputData[i].poor : '-') + '</td>'
                tbl += '<td>' + (inputData[i].lower ? inputData[i].lower : '-') + '</td>'
                tbl += '<td>' + (inputData[i].average ? inputData[i].average : '-') + '</td>'
                tbl += '<td>' + (inputData[i].good ? inputData[i].good : '-') + '</td>'
                tbl += '<td>' + (inputData[i].excellent ? inputData[i].excellent : '-') + '</td>'
                tbl += '<td>' + (inputData[i].inputScore ? inputData[i].inputScore : '-') + '</td>'
                tbl += '</tr>'
            }
            str += '<div class="clearfix"></div>'
            str += '</div>'
            str += '<div class="resultCenCon_bottom">'
            str += '<table>'
            str += '<thead>'
            str += '<tr>'
            str += '<th width="22%">参数指标</th>'
            str += '<th width="12%">较差</th>'
            str += '<th width="12%">较低</th>'
            str += '<th width="12%">平均</th>'
            str += '<th width="12%">良好</th>'
            str += '<th width="12%">优秀</th>'
            str += '<th width="18%">企业当前值</th>'
            str += '</tr>'
            str += '</thead>'
            str += '<tbody>' + tbl + '</tbody>'
            str += '</table>'
            str += '</div>'
            str += '</div>'
            str += '</div>'
            str += '</div>'

            var dom = $(str);
            var marks = [];
            var areas = []
            var score = parseFloat(parseFloat(msg[0].totalCount)) == '-1' ? 'N' : parseFloat(parseFloat(msg[0].totalCount))
            var color;
            for (var i = 0; i < sumScore.length; i++) {
                if (i != 0) {
                    marks.push(parseFloat(sumScore[i].scoreMax))
                }
                areas.push({
                    label: sumScore[i].name,
                    start: parseFloat(sumScore[i].scoreMin),
                    end: parseFloat(sumScore[i].scoreMax),
                })
                if (score > sumScore[i].scoreMin && score <= sumScore[i].scoreMax) {
                    if (sumScore[i].name == '较差') {
                        color = '#d6cbec'
                    } else if (sumScore[i].name == '较低') {
                        color = '#bcb6e9'
                    } else if (sumScore[i].name == '平均') {
                        color = '#b5c5f4'
                    } else if (sumScore[i].name == '良好') {
                        color = '#4abeec'
                    } else if (sumScore[i].name == '优秀') {
                        color = '#7f9be7'
                    }
                }
            }

            var opts = {
                title: inputData[0].normClassifyName,
                width: '75%',
                color: color,
                value: score,
                marks: marks.sort(function (a, b) {
                    return a > b
                }),
                areaLabels: areas.sort(function (a, b) {
                    return a.start > b.start
                }),
                showEndpoint: true,

            }
            // console.log('opts:', opts)
            dom.find('#aaa').lineChart(opts)

            for (var i = 0; i < inputData.length; i++) {
                var line = $('<div class="demo"></div>').lineChart({
                    title: inputData[i].normName,
                    value: parseFloat(inputData[i].inputScore),
                    marks: [
                        parseFloat(inputData[i].lower),
                        parseFloat(inputData[i].average),
                        parseFloat(inputData[i].good),
                        parseFloat(inputData[i].excellent)
                    ],
                    showEndpoint: true,
                    areaLabels: [{
                            label: '较差',
                            start: sumScore[4].scoreMin,
                            end: sumScore[3].scoreMin
                        },
                        {
                            label: '较低',
                            start: sumScore[3].scoreMin,
                            end: sumScore[2].scoreMin
                        },
                        {
                            label: '平均',
                            start: sumScore[2].scoreMin,
                            end: sumScore[1].scoreMin
                        },
                        {
                            label: '良好',
                            start: sumScore[1].scoreMin,
                            end: sumScore[0].scoreMin
                        },
                        {
                            label: '优秀',
                            start: sumScore[0].scoreMin,
                            end: sumScore[0].scoreMax
                        }
                    ]
                });
                line.appendTo(dom.find('.resultCenCon_center'))
            }

            $(".industryDetail").append(dom)
        }
    );


    // 获取公司基本信息
    app.DataRequest(URL + 'questionRoll/getEvaluatinMsg', data, null, function (quest) {
        if (data.abort) {
            console.error('接口读取失败');
        } else {
            $('#renderPdf').attr('data-companyName', quest[0].name)

        }
    })
}

// 评价概述饼状图
function comDataPie(id, pictData) {
    var data = [],
        name = [];
    for (var i = 0; i < pictData.length; i++) {
        var pie = {};
        pie["value"] = pictData[i].value;
        pie["name"] = pictData[i].name;
        data.push(pie)
        name.push(pictData[i].name);
    }
    var myChart = echarts.init(document.getElementById(id));
    option = {
        color: ['#7f9be7', '#4abeec', '#b5c5f4', '#bcb6e9', '#d6cbec'],
        title: {
            text: '',
            subtext: '',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            left: '%',
            bottom: '0%',
            data: name,
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['40%', '45%'],
            data: data,
            label: {
                normal: {
                    formatter: '{c} ，{per|{d}%}  ',
                    rich: {
                        per: {
                            color: '#767879',
                            padding: [2, 4],
                        }
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderType: 'solid',
                },
            }
        }]
    };
    myChart.setOption(option);
}