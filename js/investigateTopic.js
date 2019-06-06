let topicNumber = ''; //当前DOM
let page = 1;
let pages = '';
let chartsType = 1;
let pageBool = true;
// 饼状图数据
let pieData = [];
let pieDataNumber;

// 柱状图数据
let barData = [];
let barDataNumber;

function _JSONHTML(nameLable) {
    let names = nameLable;
    if (nameLable && nameLable.indexOf('<') != -1) {
        names = nameLable.replace(/<\/?[^>]*>/g, '');
        // if (names && names.indexOf('style') != -1) {
        //     names = names.replace(/style="[^"]*"/g, '');
        // }
    }
    return names;
}

$(function () {
    _applyPage();

    localStorage.getItem('directoryRemarkId');
})
// 返回上一页  删除当前问卷分析
$('#pre_page').click(function () {
    $('#pre_question_modal').modal('show');
})

// 删除当前问卷
$('#pre_cancel').click(function () {
    app.DataRequest(URL + 'dwsurvey/deleteDirectoryRemark', {
        directoryRemarkId: localStorage.getItem('directoryRemarkId')
    }, function (err) {}, function (data) {
        if (data.status == 1) {
            location.href = './investigateHome.html';
        } else {
            console.log('删除失败！')
        }
    })
})

// 渲染页面上所有题目
function _applyPage() {
    let pageTopicHTML = '';
    app.DataRequest(URL + 'dwsurvey/getQuestionList', {
        directoryRemarkId: localStorage.getItem('directoryRemarkId')
    }, function (err) {}, function (msg) {
        if (msg.status != 1) return;
        if (msg.directoryRemark.flag == 1) location.href = './investigateResult.html';

        $('#questionName').text(msg.directoryRemark.directoryName);
        let dataList = msg.list;
        // console.log(dataList)
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].questionRemark_flag == '1') {
                page++;
            }

            let topicTypeHTML = '';
            let topicChartHtml = '';
            if (dataList[i].qu_type != 10) {
                // questionRemark_chartsType   length_active
                topicTypeHTML += '<span class="' + (parseInt(dataList[i].questionRemark_chartsType) == 1 ? 'length_active' : '') + '"  onclick="_chartSwitch(\'bar\' ,' + i + ')">柱状图</span>';
                topicTypeHTML += '<span class="' + (parseInt(dataList[i].questionRemark_chartsType) == 2 ? 'length_active' : '') + '"  onclick="_chartSwitch(\'pie\' ,' + i + ')">饼图</span>';
                topicTypeHTML += '<span class="' + (parseInt(dataList[i].questionRemark_chartsType) == 3 ? 'length_active' : '') + '"  onclick="_chartSwitch(\'strip\' ,' + i + ')">条形图</span>';
                topicTypeHTML += '<span class="' + (parseInt(dataList[i].questionRemark_chartsType) == 4 ? 'length_active' : '') + '"  onclick="_chartSwitch(\'line\' ,' + i + ')">折线图</span>';

                // topicChartHtml += ''; 
                topicChartHtml += '<div class="chart" id="bar_chart' + i + '"></div>';
                topicChartHtml += '<div class="chart" id="pie_chart' + i + '"></div>';
                topicChartHtml += '<div class="chart" id="bar_crosswise_chart' + i + '"></div>';
                topicChartHtml += '<div class="chart" id="line_chart' + i + '"></div>';
                topicChartHtml += '<div class="chart" id="bar_line_chart' + i + '"></div>';
            } else {
                topicTypeHTML += '<span class="' + (parseInt(dataList[i].questionRemark_chartsType) == 1 ? 'length_active' : '') + '"  onclick="_chartSwitch(\'bar\' ,' + i + ')">柱状图</span>';
                topicTypeHTML += '<span class="' + (parseInt(dataList[i].questionRemark_chartsType) == 3 ? 'length_active' : '') + '"  onclick="_chartSwitch(\'strip\' ,' + i + ')">条形图</span>';
                topicTypeHTML += '<span class="' + (parseInt(dataList[i].questionRemark_chartsType) == 4 ? 'length_active' : '') + '"  onclick="_chartSwitch(\'line\' ,' + i + ')">折线图</span>';

                // topicChartHtml += '';  radios_active
                topicChartHtml += '<div class="chart" id="bar_chart' + i + '"></div>';
                topicChartHtml += '<div class="chart" id="bar_crosswise_chart' + i + '"></div>';
                topicChartHtml += '<div class="chart" id="line_chart' + i + '"></div>';
                topicChartHtml += '<div class="chart" id="bar_line_chart' + i + '"></div>';
            }

            let barTypeHTML = '';
            if (dataList[i].qu_type == 1 || dataList[i].qu_type == 2) {
                barTypeHTML += '<div class="bar_type">';
                barTypeHTML += '<span onclick="_chartSwitch(\'barProp\' ,' + i + ')"> <span class="radios"><i class="' + (parseInt(dataList[i].questionRemark_chartsType) == 12 ? 'radios_active' : '') + '"></i></span>占比</span>';
                barTypeHTML += '<span onclick="_chartSwitch(\'barLine\' ,' + i + ')"><span class="radios"><i class="' + (parseInt(dataList[i].questionRemark_chartsType) == 11 ? 'radios_active' : '') + '"></i></span>累积百分比</span>';
                barTypeHTML += '</div>';
            }

            let lableTEXT = new Array();

            // 矩阵题数据  柱状图   折线图
            // bar Data  柱状图数据
            barData.push(dataList[i].datas);

            // 矩阵题lable lableTEXT  柱状图   折线图
            if (dataList[i].qu_type == 13 || dataList[i].qu_type == 14 || dataList[i].qu_type == 15 || dataList[i].qu_type == 20) {
                for (let j = 0; j < dataList[i].cloumnOptions.length; j++) {
                    lableTEXT.push(dataList[i].cloumnOptions[j].option_name);
                }
            } else {
                // 非矩阵题
                for (let j = 0; j < dataList[i].options.length; j++) {
                    lableTEXT.push(dataList[i].options[j].option_name);
                }
            }

            // cumulativeOptions  累积百分比
            let cumulativeOptions = new Array();
            if (dataList[i].cumulativeOptions) {
                for (let j = 0; j < dataList[i].cumulativeOptions.length; j++) {
                    cumulativeOptions.push(dataList[i].cumulativeOptions[j].option_name)
                }
            }


            // pieDATA  饼状图数据
            let pieDATA = new Array();
            if (dataList[i].qu_type == 13 || dataList[i].qu_type == 14 || dataList[i].qu_type == 15 || dataList[i].qu_type == 20) {
                // 矩阵题
                for (let j = 0; j < dataList[i].pies.length; j++) {
                    pieDATA.push({
                        name: dataList[i].pies[j].name,
                        value: dataList[i].pies[j].count
                    })
                }
            } else {
                // 非矩阵题
                for (let j = 0; j < dataList[i].pies.length; j++) {
                    pieDATA.push({
                        name: dataList[i].pies[j].option_name,
                        value: dataList[i].pies[j].count
                    })
                }
            }


            pageTopicHTML += '<div class="topic" data-obj=' + JSON.stringify({
                    id: dataList[i].questionRemark_id,
                    type: dataList[i].qu_type,
                    // title: dataList[i].qu_title,
                    // labelData: dataList[i].datas,
                    // pieDATA: pieDATA,
                    cumulativeData: dataList[i].cumulativeData,
                    cumulativeDataLine: dataList[i].cumulativeDataPercentage,
                    // cumulativeOptions: cumulativeOptions,
                    chartsType: dataList[i].questionRemark_chartsType,
                    dataAccounteds: dataList[i].dataAccounteds
                }) + '  data-lable="' + lableTEXT + '" data-title="' + dataList[i].qu_title + '" data-pieDATA=' + JSON.stringify(pieDATA) +
                ' data-cumulativeOptions="' + cumulativeOptions + '" data-datas="' + dataList[i].datas + '">';

            pageTopicHTML += '<h3>' + (i + 1) + '.' + dataList[i].qu_title + '</h3>';
            pageTopicHTML += '<div class="legend">' + topicTypeHTML;

            pageTopicHTML += '</div>';

            // pageTopicHTML += '<div class="bar_type">';
            // pageTopicHTML += '<span onclick="_chartSwitch(\'bar\' ,' + i + ')"> <span class="radios"><i class="radios_active"></i></span>占比</span>';
            // pageTopicHTML += '<span onclick="_chartSwitch(\'barLine\' ,' + i + ')"><span class="radios"><i></i></span>累积百分比</span>';
            // pageTopicHTML += '</div>';

            pageTopicHTML += barTypeHTML + topicChartHtml;

            pageTopicHTML += '<p class="analysis_description_title">分析描述</p>';
            pageTopicHTML += '<div class="analysis_description">';
            pageTopicHTML += '<textarea  style="resize: none;  width: 100%;height: 200px;  border: 0;outline: none;" id="evaluate' + i + '" maxlength="1000" onkeyup="textareaKeyup(\'#evaluate' + i + '\',\'#textarea' + i + '\')" placeholder="请输入您的文字">' + dataList[i].questionRemark_remark + '</textarea>';
            pageTopicHTML += '<span class="analysis_description_number"><span id="textarea' + i + '">' + dataList[i].questionRemark_remark.length + '</span>/1000</span>';
            pageTopicHTML += '</div>';
            pageTopicHTML += '</div>';

            pieData.push(pieDATA)
        }



        if (page == dataList.length + 1) {
            location.href = './investigateResult.html';
        }

        _paging(page, dataList.length + 1, pageBool)

        $('#topics').html(pageTopicHTML);
    })
}

// 显示当前题目
function _topicNumber(number, numberSize) {
    // pageBool = false;
    topicNumber = $('#topics').find('.topic').eq(number);
    $(topicNumber).show().siblings().hide();
    $(topicNumber).find('.chart').eq(0).show().siblings('.chart').hide();

    pieDataNumber = pieData[number];
    barDataNumber = barData[number];


    let topicINFOs = JSON.parse($(topicNumber).attr('data-obj'));

    let chartType = 'bar';
    if (topicINFOs.chartsType == '1') {
        chartType = 'bar';
    } else if (topicINFOs.chartsType == '11') {
        chartType = 'barLine';
    } else if (topicINFOs.chartsType == '12') {
        chartType = 'barProp';
    } else if (topicINFOs.chartsType == '2') {
        chartType = 'pie';
    } else if (topicINFOs.chartsType == '3') {
        chartType = 'strip';
    } else if (topicINFOs.chartsType == '4') {
        chartType = 'line';
    }

    setTimeout(function () {
        _chartSwitch(chartType, number);
    }, 0)
}

// 当前题目的图表切换  $(topicNumber).attr('data-datas') 
function _chartSwitch(type, number) {

    $(topicNumber).find('.bar_type').hide();
    let topicINFO = JSON.parse($(topicNumber).attr('data-obj'));

    console.log(topicINFO);

    if (type == 'pie') {
        chartsType = 2;
        $(topicNumber).find('#bar_chart' + number).hide();
        $(topicNumber).find('#pie_chart' + number).show();
        $(topicNumber).find('#bar_crosswise_chart' + number).hide();
        $(topicNumber).find('#line_chart' + number).hide();
        $(topicNumber).find('#bar_line_chart' + number).hide();
        _pieFun('pie_chart' + number, topicINFO.type, pieDataNumber, $(topicNumber).attr('data-lable').split(','));
    } else if (type == 'line') {
        chartsType = 4;
        let lineData = [];
        let matrixLine = false;
        if (topicINFO.type == 13 || topicINFO.type == 14 || topicINFO.type == 15 || topicINFO.type == 20) {
            matrixLine = true;
            // 矩阵题
            for (let i = 0; i < barDataNumber.length; i++) {
                lineData.push({
                    name: barDataNumber[i].option_name,
                    type: 'line',
                    label: {
                        normal: {
                            formatter: lineData.value,
                            show: true,
                            barWidth: 50,
                            position: 'top', //文字显示位置,如上图中的1.0,1.1字样
                            textStyle: {
                                fontSize: 18,
                                color: '#53a8e2'
                            },
                        }
                    },
                    data: barDataNumber[i].colDatas
                })
            }
        } else {
            // 非矩阵题
            for (let i = 0; i < $(topicNumber).attr('data-datas').split(',').length; i++) {
                lineData.push($(topicNumber).attr('data-datas').split(',')[i])
            }
        }

        $(topicNumber).find('#bar_chart' + number).hide();
        $(topicNumber).find('#pie_chart' + number).hide();
        $(topicNumber).find('#bar_crosswise_chart' + number).hide();
        $(topicNumber).find('#line_chart' + number).show();
        $(topicNumber).find('#bar_line_chart' + number).hide();

        if (matrixLine) {
            _lineOddFun('line_chart' + number, topicINFO.type, $(topicNumber).attr('data-lable').split(','), lineData);
        } else {
            _lineFun('line_chart' + number, topicINFO.type, $(topicNumber).attr('data-lable').split(','), lineData);
        }

    } else if (type == 'bar') {
        chartsType = 1;
        let barData = [];
        let matrix = false;
        if (topicINFO.type == 13 || topicINFO.type == 14 || topicINFO.type == 15 || topicINFO.type == 20) {
            matrix = true;
            console.log('data-datas:', barDataNumber);
            console.log('data-lable:', $(topicNumber).attr('data-lable').split(','));
            // 矩阵题
            $(topicNumber).find('.bar_type').hide();
            for (let i = 0; i < barDataNumber.length; i++) {
                barData.push({
                    name: barDataNumber[i].option_name,
                    type: 'bar',
                    barWidth: 50,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            // formatter: '{c}次'
                        },
                    },
                    data: barDataNumber[i].colDatas
                })
            }
        } else {
            // 非矩阵题
            $(topicNumber).find('.bar_type').show();
            for (let i = 0; i < $(topicNumber).attr('data-datas').split(',').length; i++) {
                barData.push($(topicNumber).attr('data-datas').split(',')[i])
            }
        }

        $(topicNumber).find('#bar_chart' + number).show();
        $(topicNumber).find('#pie_chart' + number).hide();
        $(topicNumber).find('#bar_crosswise_chart' + number).hide();
        $(topicNumber).find('#line_chart' + number).hide();
        $(topicNumber).find('#bar_line_chart' + number).hide();

        if (matrix) {

            _barFun('bar_chart' + number, topicINFO.type, $(topicNumber).attr('data-lable').split(','), barData);
        } else {
            _barOddFun('bar_chart' + number, topicINFO.type, $(topicNumber).attr('data-lable').split(','), barData);
        }

    } else if (type == 'barLine') {
        chartsType = 11;
        // let cumuLable = [];

        // 非矩阵题
        // for (let i = 0; i < $(topicNumber).attr('data-cumulativeOptions').split(',').length; i++) {
        //     cumuLable.push($(topicNumber).attr('data-cumulativeOptions')[i].option_name)
        // }
        // console.log($(topicNumber).attr('data-cumulativeOptions').split(','))
        // console.log(cumuLable)

        $(topicNumber).find('.bar_type').show();
        $(topicNumber).find('#bar_chart' + number).hide();
        $(topicNumber).find('#pie_chart' + number).hide();
        $(topicNumber).find('#bar_crosswise_chart' + number).hide();
        $(topicNumber).find('#line_chart' + number).hide();
        $(topicNumber).find('#bar_line_chart' + number).show();

        _barLineFun('bar_line_chart' + number, topicINFO.type, $(topicNumber).attr('data-cumulativeOptions').split(','), topicINFO.cumulativeData, topicINFO.cumulativeDataLine);
    } else if (type == 'barProp') {
        chartsType = 12;
        let barData = [];

        $(topicNumber).find('.bar_type').show();


        for (let i = 0; i < $(topicNumber).attr('data-datas').split(',').length; i++) {
            barData.push($(topicNumber).attr('data-datas').split(',')[i])
        }

        $(topicNumber).find('.bar_type').show();
        $(topicNumber).find('#bar_chart' + number).hide();
        $(topicNumber).find('#pie_chart' + number).hide();
        $(topicNumber).find('#bar_crosswise_chart' + number).hide();
        $(topicNumber).find('#line_chart' + number).hide();
        $(topicNumber).find('#bar_line_chart' + number).show();

        _barLineProFun('bar_line_chart' + number, topicINFO.type, $(topicNumber).attr('data-lable').split(','), barData, topicINFO.dataAccounteds);
    } else if (type == 'strip') {
        chartsType = 3;
        let barData = [];
        let matrix = false;
        if (topicINFO.type == 13 || topicINFO.type == 14 || topicINFO.type == 15 || topicINFO.type == 20) {
            matrix = true;
            // 矩阵题
            for (let i = 0; i < barDataNumber.length; i++) {
                barData.push({
                    name: barDataNumber[i].option_name,
                    type: 'bar',
                    barWidth: '20%',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            // formatter: '{c}次'
                        },
                    },
                    data: barDataNumber[i].colDatas
                })
            }
        } else {
            // 非矩阵题
            for (let i = 0; i < $(topicNumber).attr('data-datas').split(',').length; i++) {
                barData.push($(topicNumber).attr('data-datas').split(',')[i])
            }
        }

        $(topicNumber).find('.bar_type').hide();
        $(topicNumber).find('#bar_chart' + number).hide();
        $(topicNumber).find('#pie_chart' + number).hide();
        $(topicNumber).find('#bar_crosswise_chart' + number).show();
        $(topicNumber).find('#line_chart' + number).hide();
        $(topicNumber).find('#bar_line_chart' + number).hide();

        if (matrix) {
            _barStripFun('bar_crosswise_chart' + number, topicINFO.type, $(topicNumber).attr('data-lable').split(','), barData);
        } else {
            _barOddStripFun('bar_crosswise_chart' + number, topicINFO.type, $(topicNumber).attr('data-lable').split(','), barData);
        }
        // bar_crosswise_chart
    }
}

// 切换图表列表样式
$('#topics').on('click', '.legend>span', function () {
    $(topicNumber).find('i').removeClass('radios_active');

    $(this).addClass('length_active').siblings().removeClass('length_active');
})

$('#topics').on('click', '.bar_type>span', function () {
    $('#topics').find('.legend>span').removeClass('length_active');
    $(this).find('i').addClass('radios_active');
    $(this).siblings().find('i').removeClass('radios_active');
})

// 输入框值计数
function textareaKeyup(textareaText, textareaNumber) {
    $('#hint').text('');
    let length = $(textareaText).val().length;
    $(textareaNumber).text(length);
}

// 分页
let pre_page = 1;

function _paging(page, pagingSize, pageBool) {
    $('#box').paging({
        initPageNo: page, // 初始页码
        totalPages: pagingSize, //总页数
        slideSpeed: 600, // 缓动速度。单位毫秒
        jump: true, //是否支持跳转
        callback: function (page) { // 回调函数
            // console.log(page)
            // 回到页面顶端
            document.body.scrollTop = document.documentElement.scrollTop = 0;

            if (!pageBool) {
                if (page - pre_page != 1) {
                    setTimeout(function () {
                        _topicNumber(page - 1, pagingSize)
                    }, 0)
                    return;
                }
            }

            // 第一题
            if (pageBool) {
                pageBool = false;
                setTimeout(function () {
                    _topicNumber(page - 1, pagingSize)
                }, 0)
            } else if (!pageBool && page != pagingSize) {
                // 中间题目  1 < page && page < pagingSize
                // 提交当前题目的数据
                let updateQuestionRemarkData = {
                    questionRemarkId: JSON.parse($(topicNumber).attr('data-obj')).id,
                    remark: $(topicNumber).find('.analysis_description>textarea').val(),
                    chartsType: chartsType
                }
                app.DataRequest(URL + 'dwsurvey/updateQuestionRemark', updateQuestionRemarkData, function (err) {}, function (data) {
                    if (data.status == 1) {
                        setTimeout(function () {
                            _topicNumber(page - 1, pagingSize)
                        }, 0)
                    }
                })
            } else if (page == pagingSize) {
                // 最后一题

                // 提交当前题目的数据
                let updateQuestionRemarkData = {
                    questionRemarkId: JSON.parse($(topicNumber).attr('data-obj')).id,
                    remark: $(topicNumber).find('.analysis_description>textarea').val(),
                    chartsType: chartsType
                }

                app.DataRequest(URL + 'dwsurvey/updateQuestionRemark', updateQuestionRemarkData, function (err) {}, function (data) {
                    if (data.status == 1) {
                        app.DataRequest(URL + 'dwsurvey/overDirectoryRemark', {
                            directoryRemarkId: localStorage.getItem('directoryRemarkId')
                        }, function (err) {}, function (data) {
                            if (data.status == 1) {
                                location.href = './investigateResult.html'
                            }
                        })
                    }
                })
            }
            pre_page = page;
        }
    })
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
            center: ['50%', '35%'],
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
        unit = '分';
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
                // formatter: '{value} ' + unit
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
                // formatter: '{value} '+unit
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
            // name: '(选项)',
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                rotate: 45
            },

        }],
        yAxis: [{
            type: 'value',
            min: 0,
            name: '(' + unit + ')',
            axisLabel: {
                // formatter: '{value} '+unit
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
            // name: '(选项)',

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
            },
            axisLabel: {
                rotate: 45
            },

        }],
        yAxis: [{
                type: 'value',
                min: 0,
                name: '(' + unit + ')',
                interval: 25,
                axisLabel: {
                    // formatter: '{value}'+unit
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
            },
            axisLabel: {
                rotate: 45
            },

        }],
        yAxis: [{
                type: 'value',
                min: 0,
                name: '(' + unit + ')',
                interval: 25,
                // axisLabel: {
                //     formatter: '{value} 次'
                // },
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
                        // formatter: '{c}次',
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
                        // formatter: '{c}%',
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
            right: '6%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'value',
            min: 0,
            name: '(' + unit + ')',
            // axisLabel: {
            //     formatter: '{value} 次'
            // },
            axisLabel: {
                rotate: 45
            },

        }],
        yAxis: [{
            type: 'category',
            data: lable,
            // name: '(选项)',
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
                    // formatter: '{c}次'
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
            name: '次',

        }],
        yAxis: [{
            type: 'category',
            data: lable,
            axisTick: {
                alignWithLabel: true
            },
            // name: '(选项)',
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