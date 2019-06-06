let entiretys; //标识综合评测  单项评测
let intems; //单项评测时  对应的项
// 综合能力等级说明
let description1 = ['企业工业互联网建设尚未启动，设备和系统孤岛问题明显，数据采集工作尚未起步，数据价值意识薄弱。', '企业工业互联网建设刚刚开始，互联互通基础设施具备一定基础，系统集成工作覆盖部分环节，数据采集和分析尚处于探索阶段。', '企业工业互联网建设逐步推进，互联互通能力不断提升，纵向集成基本完成，端到端集成和横向集成具备一定基础，数据采集工作已经启动。', '企业工业互联网建设比较完善，基础设施互联互通和系统集成度较高，数据流已经基本贯通，对新型工业网络、云计算、大数据等新技术的应用比较广泛，数据价值挖掘意识较强。', '企业工业互联网建设水平领先，基础设施互联互通和系统集成度高，企业内部数据和供应链上下游价值流已经全线打通，新技术应用比较成熟，数据价值挖掘比较充分。'];
// 互联互通能力等级说明
let description2 = ['企业工业互联网建设尚未启动，设备和系统孤岛问题明显。', '企业工业互联网建设刚刚开始，互联互通基础设施具备一定基础。', '企业工业互联网建设逐步推进，互联互通能力不断提升。', '企业工业互联网建设比较完善，基础设施互联互通集成度较高。', '企业工业互联网建设水平领先，基础设施互联互通集成度高。'];
// 综合集成能力等级说明
let description3 = ['企业工业互联网建设尚未启动，设备和系统孤岛问题明显，数据采集工作尚未起步。', '企业工业互联网建设刚刚开始，系统集成工作覆盖部分环节，数据采集尚处于探索阶段。', '企业工业互联网建设逐步推进，系统纵向集成基本完成，端到端集成和横向集成具备一定基础。', '企业工业互联网建设比较完善，系统集成度较高，数据流已经基本贯通，对新型工业网络、云计算、大数据等新技术的应用比较广泛。', '企业工业互联网建设水平领先，系统集成度高，企业内部数据和供应链上下游价值流已经全线打通，新技术应用比较成熟。'];
// 数据分析利用等级说明
let description4 = ['企业工业互联网建设尚未启动，数据价值意识薄弱。', '企业工业互联网建设刚刚开始，数据采集和分析尚处于探索阶段。', '企业工业互联网建设逐步推进，数据采集工作已经启动。', '企业工业互联网建设比较完善，数据价值挖掘意识较强。', '企业工业互联网建设水平领先，数据价值挖掘比较充分。'];

// 页面加载时触发
$(function () {
    // lineChart();
    let url_info = window.location.href;
    // console.log(url_info)
    if (url_info.indexOf('internetReport') == -1) {
        submitAnswer();
    } else {
        gainResule();
    }
})

// 过滤字符前后的空格
function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 输入框值计数
function textareaKeyup(textareaText, textareaNumber) {
    $('#hint').text('');
    let length = $(textareaText).val().length;
    $(textareaNumber).text(length);
}

// 确定提交问卷信息
function submitAnswer() {
    let question_evaluating = {
        companyInternetRollId: localStorage.getItem('internerCompanyId')
    }
    app.DataRequest(URL + 'companyInternetRoll/submitInternetEvaluating', question_evaluating, function (err) {}, function (msg) {
        if (msg[0].status == 1) {
            gainResule();
        } else {
            console.log('数据错误');
        }
    })
}

// 渲染结果页面数据
function gainResule() {
    let question_evaluating = {
        companyInternetRollId: localStorage.getItem('internerCompanyId')
    };
    app.DataRequest(URL + 'companyInternetRoll/internetEvaluatingLook', question_evaluating, function (err) {}, function (msg) {
        // console.log(msg);
        if (msg[0].status == 1) {
            var noData = '无数据';

            // 评测类型  离散 流程  综合  单项
            $('#topic_classify').find('span').eq(0).text(msg[0].companyInternetRoll.manufactureType == 1 ? '离散型' : '流程型');
            $('#topic_classify').find('span').eq(1).text(msg[0].companyInternetRoll.entirety == 1 ? '综合评测' : '单项评测');

            // 基本信息
            $('#company_name').text(msg[0].companyInternetRoll.evaluatingCompanyName).attr('title', msg[0].companyInternetRoll.evaluatingCompanyName);
            $('#evaluating_date').text(formatDate(msg[0].companyInternetRoll.evaluatingTime));
            $('#evaluating_type').text(msg[0].companyInternetRoll.evaluatingType == 0 ? '企业评测' : '专家评测');
            $('#evaluating_people').text(msg[0].companyInternetRoll.evaluatingPeople).attr('title', msg[0].companyInternetRoll.evaluatingPeople);
            $('#evaluating_position').text(msg[0].companyInternetRoll.job).attr('title', msg[0].companyInternetRoll.job);

            $('#renderPdf').attr('data-companyName',get(msg, '[0].companyInternetRoll.evaluatingCompanyName', noData))

            // 各项能力得分

            // 综合评测
            entiretys = msg[0].companyInternetRoll.entirety
            if (msg[0].companyInternetRoll.entirety == 1) {
                // 综合能力
                let abilities = {
                    thisLabel: $('#comprehensive_abilities'),
                    grade: msg[0].companyInternetRoll.synthesizeLevel,
                    score: msg[0].companyInternetRoll.synthesizeScore,
                    remark: msg[0].companyInternetRoll.synthesizeRemark,
                    description: description1,
                    demotion: msg[0].companyInternetRoll.demotion

                }
                colorShow(abilities);
                // 互联互通
                let interflow = {
                    thisLabel: $('#connectivity'),
                    grade: msg[0].companyInternetRoll.interflowLevel,
                    score: msg[0].companyInternetRoll.interflowScore,
                    remark: msg[0].companyInternetRoll.interflowRemark,
                    description: description2,
                    weight: msg[0].companyInternetRoll.interflowWeight
                }
                colorShow(interflow);
                // 综合集成
                let synthesize = {
                    thisLabel: $('#meta_synthesis'),
                    grade: msg[0].companyInternetRoll.integrationLevel,
                    score: msg[0].companyInternetRoll.integrationScore,
                    remark: msg[0].companyInternetRoll.integrationRemark,
                    description: description3,
                    weight: msg[0].companyInternetRoll.integrationWeight
                }
                colorShow(synthesize);
                // 数据分析利用
                let analyse = {
                    thisLabel: $('#data_analysis'),
                    grade: msg[0].companyInternetRoll.analyseLevel,
                    score: msg[0].companyInternetRoll.analyseScore,
                    remark: msg[0].companyInternetRoll.analyseRemark,
                    description: description4,
                    weight: msg[0].companyInternetRoll.analyseWeight
                }
                colorShow(analyse);
            }

            // 单项评测
            let items = msg[0].companyInternetRoll.items;
            let itemsShow = new Array();
            if (msg[0].companyInternetRoll.entirety == 2) {
                intems = items;
                $('#comprehensive_abilities').hide();
                if (items.length == 1) {
                    if (items == 1) {
                        $('#connectivity').hide();
                        $('#meta_synthesis').hide();
                        // $('#data_analysis').hide();

                        // 数据分析利用
                        let analyse = {
                            thisLabel: $('#data_analysis'),
                            grade: msg[0].companyInternetRoll.analyseLevel,
                            score: msg[0].companyInternetRoll.analyseScore,
                            remark: msg[0].companyInternetRoll.analyseRemark,
                            description: description4,
                            weight: msg[0].companyInternetRoll.analyseWeight
                        }
                        colorShow(analyse);
                    }
                    if (items == 2) {
                        $('#connectivity').hide();
                        // $('#meta_synthesis').hide();
                        $('#data_analysis').hide();

                        // 综合集成
                        let synthesize = {
                            thisLabel: $('#meta_synthesis'),
                            grade: msg[0].companyInternetRoll.integrationLevel,
                            score: msg[0].companyInternetRoll.integrationScore,
                            remark: msg[0].companyInternetRoll.integrationRemark,
                            description: description3,
                            weight: msg[0].companyInternetRoll.integrationWeight
                        }
                        colorShow(synthesize);
                    }
                    if (items == 3) {
                        // $('#connectivity').hide();
                        $('#meta_synthesis').hide();
                        $('#data_analysis').hide();

                        // 互联互通
                        let interflow = {
                            thisLabel: $('#connectivity'),
                            grade: msg[0].companyInternetRoll.interflowLevel,
                            score: msg[0].companyInternetRoll.interflowScore,
                            remark: msg[0].companyInternetRoll.interflowRemark,
                            description: description2,
                            weight: msg[0].companyInternetRoll.interflowWeight
                        }
                        colorShow(interflow);
                    }
                }

                if (items.length == 3) {
                    if (items.indexOf('1') == -1) {
                        $('#data_analysis').hide();
                        // 综合集成
                        let synthesize = {
                            thisLabel: $('#meta_synthesis'),
                            grade: msg[0].companyInternetRoll.integrationLevel,
                            score: msg[0].companyInternetRoll.integrationScore,
                            remark: msg[0].companyInternetRoll.integrationRemark,
                            description: description3,
                            weight: msg[0].companyInternetRoll.integrationWeight
                        }
                        colorShow(synthesize);

                        // 互联互通
                        let interflow = {
                            thisLabel: $('#connectivity'),
                            grade: msg[0].companyInternetRoll.interflowLevel,
                            score: msg[0].companyInternetRoll.interflowScore,
                            remark: msg[0].companyInternetRoll.interflowRemark,
                            description: description2,
                            weight: msg[0].companyInternetRoll.interflowWeight
                        }
                        colorShow(interflow);
                    }
                    if (items.indexOf('2') == -1) {
                        $('#meta_synthesis').hide();

                        // 数据分析利用
                        let analyse = {
                            thisLabel: $('#data_analysis'),
                            grade: msg[0].companyInternetRoll.analyseLevel,
                            score: msg[0].companyInternetRoll.analyseScore,
                            remark: msg[0].companyInternetRoll.analyseRemark,
                            description: description4,
                            weight: msg[0].companyInternetRoll.analyseWeight
                        }
                        colorShow(analyse);

                        // 互联互通
                        let interflow = {
                            thisLabel: $('#connectivity'),
                            grade: msg[0].companyInternetRoll.interflowLevel,
                            score: msg[0].companyInternetRoll.interflowScore,
                            remark: msg[0].companyInternetRoll.interflowRemark,
                            description: description2,
                            weight: msg[0].companyInternetRoll.interflowWeight
                        }
                        colorShow(interflow);
                    }
                    if (items.indexOf('3') == -1) {
                        $('#connectivity').hide();
                        // 数据分析利用
                        let analyse = {
                            thisLabel: $('#data_analysis'),
                            grade: msg[0].companyInternetRoll.analyseLevel,
                            score: msg[0].companyInternetRoll.analyseScore,
                            remark: msg[0].companyInternetRoll.analyseRemark,
                            description: description4,
                            weight: msg[0].companyInternetRoll.analyseWeight
                        }
                        colorShow(analyse);
                        // 综合集成
                        let synthesize = {
                            thisLabel: $('#meta_synthesis'),
                            grade: msg[0].companyInternetRoll.integrationLevel,
                            score: msg[0].companyInternetRoll.integrationScore,
                            remark: msg[0].companyInternetRoll.integrationRemark,
                            description: description3,
                            weight: msg[0].companyInternetRoll.integrationWeight
                        }
                        colorShow(synthesize);
                    }

                }
            }

            if (msg[0].companyInternetRoll.remark) {
                $('#evaluate_line>div').text(msg[0].companyInternetRoll.remark).attr('title', msg[0].companyInternetRoll.remark);
            }

            // 折线图
            let normsName = new Array(); //单项名称
            let normsWeight = new Array(); //每项权重
            let normsScore = new Array(); //每项得分

            let normsList = msg[0].companyInternetRoll.companyInternetNorms;
            for (let i = 0; i < normsList.length; i++) {
                normsName.push(normsList[i].name);
                normsWeight.push(normsList[i].weight);
                normsScore.push(normsList[i].score);
            }
            lineChart(normsName, normsScore, normsWeight);
        }
    })
}

// 页面左侧圆盘的样式显示
function colorShow(data) {

    // console.log(data)

    let backgroundColor = '';
    if (data.grade == 1) {
        backgroundColor = '#c7b2f0';
        data.thisLabel.find('.grade_one').addClass('grade_active').find('span:first').css({
            'backgroundColor': backgroundColor,
            'marginLeft': '-1px'
        });
        data.thisLabel.find('.description').text(data.description[0]); //等级描述
    } else if (data.grade == 2) {
        backgroundColor = '#aaa1ee';
        data.thisLabel.find('.grade_two').addClass('grade_active').find('span:first').css({
            'backgroundColor': backgroundColor,
            'marginLeft': '-3px'
        });
        data.thisLabel.find('.description').text(data.description[1]); //等级描述
    } else if (data.grade == 3) {
        backgroundColor = '#99aeec';
        data.thisLabel.find('.grade_three').addClass('grade_active').find('span:first').css({
            'backgroundColor': backgroundColor,
            'marginLeft': '-2px'
        });
        data.thisLabel.find('.description').text(data.description[2]); //等级描述
    } else if (data.grade == 4) {
        backgroundColor = '#9ed2e9';
        data.thisLabel.find('.grade_four').addClass('grade_active').find('span:first').css({
            'backgroundColor': backgroundColor,
            'marginLeft': '-1px'
        });
        data.thisLabel.find('.description').text(data.description[3]); //等级描述
    } else if (data.grade == 5) {
        backgroundColor = '#95aaef';
        data.thisLabel.find('.grade_five').addClass('grade_active').find('span:first').css({
            'backgroundColor': backgroundColor,
            'marginLeft': '-1px'
        });
        data.thisLabel.find('.description').text(data.description[4]); //等级描述
    }

    // subentry_weight  权重
    if (data.weight) {
        data.thisLabel.find('.subentry_weight').text('(权重:' + data.weight + ')');
    }

    // 降级  显示
    if (data.demotion && data.demotion == 1) {
        $('#demotion').show();
    }

    // 评价说明
    if (data.remark) {
        data.thisLabel.find('.explain').text(data.remark).attr('title', data.remark);
    }

    // 边缘小圆圈的颜色
    data.thisLabel.find('.grade_one>span:first').css('border', '5px solid ' + backgroundColor);
    data.thisLabel.find('.grade_two>span:first').css('border', '5px solid ' + backgroundColor);
    data.thisLabel.find('.grade_three>span:first').css('border', '5px solid ' + backgroundColor);
    data.thisLabel.find('.grade_four>span:first').css('border', '5px solid ' + backgroundColor);
    data.thisLabel.find('.grade_five>span:first').css('border', '5px solid ' + backgroundColor);

    // 右侧半圆环
    data.thisLabel.find('.disk_one_before').css({
        'border': '3px solid ' + backgroundColor,
        'borderTop': 'transparent',
    });

    // 内容显示
    let scoreGrade = ' <p>' + data.score + '</p><p>评级：' + data.grade + '级</p>'
    data.thisLabel.find('.disk_three').css('backgroundColor', backgroundColor).html(scoreGrade);

}

// 判断评价说明是否填写
function submit() {
    // $('#hint').text('');
    let evaluateSave = {
        companyInternetRollId: localStorage.getItem('internerCompanyId'),
        synthesizeRemark: $('#evaluate_one').val(),
        interflowRemark: $('#evaluate_two').val(),
        integrationRemark: $('#evaluate_three').val(),
        analyseRemark: $('#evaluate_four').val(),
        remark: $('#evaluate_five').val()
    };

    app.DataRequest(URL + 'companyInternetRoll/saveInternetEvaluating', evaluateSave, function (err) {}, function (msg) {
        if (msg[0].status == 1) {
            location.href = './internetReport.html';
        } else {
            console.log('数据错误');
        }
    })

    // if (entiretys == 1) {
    //     if (evaluateSave.synthesizeRemark == "") {
    //         $('#hint').text('综合能力评价不能为空');
    //     } else if (evaluateSave.interflowRemark == "") {
    //         $('#hint').text('互联互通评价不能为空');
    //     } else if (evaluateSave.integrationRemark == "") {
    //         $('#hint').text('综合集成评价不能为空');
    //     } else if (evaluateSave.analyseRemark == "") {
    //         $('#hint').text('数据分析利用评价不能为空');
    //     } else {
    //         responsive(evaluateSave);
    //     }
    // } else {
    //     if (intems.length == 1) {
    //         if (intems == 1) {
    //             if (evaluateSave.analyseRemark == "") {
    //                 $('#hint').text('数据分析利用评价不能为空');
    //             } else {
    //                 responsive(evaluateSave);
    //             }
    //         }
    //         if (intems == 2) {
    //             if (evaluateSave.integrationRemark == "") {
    //                 $('#hint').text('综合集成评价不能为空');
    //             } else {
    //                 responsive(evaluateSave);
    //             }
    //         }
    //         if (intems == 3) {
    //             if (evaluateSave.interflowRemark == "") {
    //                 $('#hint').text('互联互通评价不能为空');
    //             } else {
    //                 responsive(evaluateSave);
    //             }
    //         }
    //     }
    //     if (intems.length == 3) {
    //         if (intems.indexOf('1') == -1) {
    //             if (evaluateSave.interflowRemark == "") {
    //                 $('#hint').text('互联互通评价不能为空');
    //             } else if (evaluateSave.integrationRemark == "") {
    //                 $('#hint').text('综合集成评价不能为空');
    //             } else {
    //                 responsive(evaluateSave);
    //             }
    //         }
    //         if (intems.indexOf('2') == -1) {
    //             if (evaluateSave.interflowRemark == "") {
    //                 $('#hint').text('互联互通评价不能为空');
    //             } else if (evaluateSave.analyseRemark == "") {
    //                 $('#hint').text('数据分析利用评价不能为空');
    //             } else {
    //                 responsive(evaluateSave);
    //             }
    //         }
    //         if (intems.indexOf('3') == -1) {
    //             if (evaluateSave.integrationRemark == "") {
    //                 $('#hint').text('综合集成评价不能为空');
    //             } else if (evaluateSave.analyseRemark == "") {
    //                 $('#hint').text('数据分析利用评价不能为空');
    //             } else {
    //                 responsive(evaluateSave);
    //             }
    //         }
    //     }
    // }
}

// 提交完评价说明 进入到报告页面
// function responsive(evaluateSave) {
//     if (evaluateSave.remark == "") {
//         $('#hint').text('二级指标评价不能为空');
//     } else {
//         app.DataRequest(URL + 'companyInternetRoll/saveInternetEvaluating', evaluateSave, function (err) {}, function (msg) {
//             if (msg[0].status == 1) {
//                 location.href = './internetReport.html';
//             } else {
//                 console.log('数据错误');
//             }
//         })
//     }
// }

// 折线图
function lineChart(name, dataScore, dataWeight) {
    var domAir11 = document.getElementById('line_chart');
    var myChartAir11 = echarts.init(domAir11);
    option = {
        color: ['#f38b45', '#01aced'],
        title: {
            text: '二级指标得分及权重',
            left: "center",
            top: 15,
            textStyle: {
                color: '#333333',
                font: 12,
                fontWeight: 'normal',
                lineHeight: 50,
                height: 50
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['得分', '权重'],
            selectedMode: false,
            y: 'bottom',
            x: 'center',
        },

        grid: {
            top: '20%',
            left: '10%',
            right: '10%',
            bottom: '10%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            axisLabel: {
                rotate: 45, //刻度旋转45度角
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#999696',
                    width: '1'
                }
            },
            data: name
        },
        yAxis: [{
            type: 'value',
            name: '得分(100)',
            max: 100,
            min: 0,
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#999696',
                    width: '1'
                }
            },
        }, {
            type: 'value',
            name: '权重(1)',
            max: 1,
            min: 0,
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#999696',
                    width: '1'
                }
            },
        }],
        series: [{
                name: '权重',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        }
                    }
                },
                data: dataWeight
            },
            {
                name: '得分',
                type: 'line',
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        }
                    }
                },
                data: dataScore
            }
        ]
    };
    myChartAir11.setOption(option, true);
}