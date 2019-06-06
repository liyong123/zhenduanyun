var questent
var questionRollId
var modalList = false //判断是否显示历史诊断列表
var showList = false //判断是否显示我的统计列表
var session = localStorage.getItem('sessionid')
var data_con_detail = ['本次智能制造能力成熟度评测未达到任何等级，企业智能制造能力非常薄弱，企业需要从智能制造基础环节逐步完善', '在这个级别下，企业有了实施智能制造的想法，开始进行规划和投资。部分核心的制造环节已实现业务流程信息化，具备部分满足未来通信和集成需求的基础设施，企业已开始基于 IT 进行制造活动，但只是具备实施智能制造的基础条件，还未真正进入到智能制造的范畴', '在这个级别下，企业已形成了智能制造的规划，对支撑核心业务的设备和系统进行投资，通过技术改造，使得主要设备具备数据采集和通信的能力，实现了覆盖核心业务重要环节的自动化、数字化升级。通过制定标准化的接口和数据格式，部分支撑生产作业的信息系统能够实现内部集成，数据和信息在业务内部实现共享，企业开始迈进智能制造的门槛', '在这个级别下，企业对智能制造的投资重点开始从对基础设施、生产装备和信息系统等的单项投入，向集成实施转变，重要的制造业务、生产设备、生产单元完成数字化、网络化改造，能够实现设计、生产、销售、物流、服务等核心业务间的信息系统集成，开始聚焦工厂范围内数据的共享，企业已完成了智能化提升的准备工作', '在这个级别下，企业内生产系统、管理系统以及其他支撑系统已完成全面集成，实现了工厂级的数字建模，并开始对人员、装备、产品、环境所采集到的数据以及生产过程中所形成的数据进行分析，通过知识库、专家库等优化生产工艺和业务流程，能够实现信息世界与物理世界互动。从 3 级到 4 级体现了量变到质变的过程，企业智能制造的能力快速提升', '引领级是智能制造能力建设的最高程度，在这个级别下，数据的分析使用已贯穿企业的方方面面，各类生产资源都得以最优化的利用，设备之间实现自治的反馈和优化，企业已成为上下游产业链中的重要角色，个性化定制、网络协同、远程运维已成为企业开展业务的主要模式，企业成为本行业智能制造的标杆']

// 我的智能成熟度--诊断模型  左侧列表 渲染 我的统计列表 + 智能制造成熟度分项集成报告列表
function leftList() {
    var quest = {
        companyId: localStorage.getItem('id')
    }
    // 我的统计列表
    app.DataRequest(URL + 'statistical/getQuestionRollName', quest, function (err) {}, function (data) {
        // 夏浩
        if (data[0].status == 1) {
            var madalList = data[0].list
            var madalText = ''
            for (var i = 0; i < madalList.length; i++) {
                if (madalList[i].name != '企业绩效评价诊断')
                    madalText += '<p class="" data-companyId="' + madalList[i].companyId + '" data-questionRollId="' + madalList[i].questionRollId + '">' + madalList[i].name + '</p>'
            }

            $('#modal_name').html(madalText)

        } else {
            return
        }
    })

    var questList = {
        questionRollId: "WJ001,WJ002",
        whole: "0"
    }

    // 智能制造成熟度分项集成报告列表
    app.DataRequest(URL + 'questionRoll/getRollItemList', questList, function (err) {}, function (data) {
        // 田成昌
        if (data[0].status == 1) {
            var itemList = data[0].list
            var itemText = ''
            for (var i = 0; i < itemList.length; i++) {
                itemText += '<p class="" data-id="' + itemList[i].id + '" data-questionRollId="' + itemList[i].questionRollId + '">' + itemList[i].questionRoll.name + '</p>'
            }
            $('#sub_name').html(itemText)
        } else {
            return
        }
    })
}

$(".headUser").click(function () {
    $(".signOut").show();
});

$("main").click(function () {
    $(".signOut").hide();
});

// 页面加载时触发
$(function () {
    // 历史诊断列表
    // $('#modal_name_list').hide() //隐藏历史诊断左侧目录
    // $('#mineList').hide() //隐藏成熟度诊断列表
    // $('#perforList').hide() //隐藏企业绩效评价列表
    // $('#dimenList').hide() //隐藏制造21维度评测列表  
    // $('#internetList').hide() //隐藏工业互联网成熟度模型
    // $('#surveyList').hide() //隐藏企业调研问卷分析报告
    // $('#HRManageList').hide() //隐藏人力资源管理评测报告

    // $('#synthesize').addClass('modalNameActive') //企业综合诊断报告左侧目录加选中样式
    // $('#synthesizeCon').show() //显示企业综合诊断报告


    // // 我的智能成熟度--诊断模型  左侧列表 渲染 我的统计列表 + 智能制造成熟度分项集成报告列表
    // leftList()

    // // 加载企业绩效的PDF文件
    // exportData()

    // // 企业绩效报告  右侧显示报告内容
    // var downPdf = {
    //     status: "path"
    // }
    // app.DataRequest(URL + 'company/downPdf', downPdf, function (err) {}, function (data) {
    //     $("#pdfCon").attr('src', data[0].path)
    // })


     // 我的诊断列表   智能制造成熟度模型
    $('#synthesizeCon').hide() //隐藏企业综合诊断报告

    // 历史诊断列表
    // $('#modal_name_list').hide() //隐藏历史诊断左侧目录
    $('#mineList').show() //显示成熟度诊断列表
    $('#perforList').hide() //隐藏企业绩效评价列表
    $('#dimenList').hide() //隐藏制造21维度评测列表
    $('#internetList').hide() //隐藏工业互联网成熟度模型
    $('#surveyList').hide() //隐藏企业调研问卷分析报告
    $('#HRManageList').hide() //隐藏人力资源管理评测报告

    //我的统计
    // $('#modal_name').hide() //隐藏我的统计左侧目录
    $('#relativelyResult').hide() //我的统计 右侧内容隐藏

    // 左侧列表样式调整
    // $('#synthesize').removeClass('modalNameActive') //企业综合诊断报告左侧目录加选中样式
    $('#maturity').addClass('modalNameActive').siblings().removeClass('modalNameActive')
    $('#sub_name').find('p').removeClass('modalNameActive'); //智能制造成熟度分项集成报告移除选中样式
    // $('#modal_name_list').find('p').removeClass('modalNameActive');//历史诊断列表移除选中样式
    $('#modal_name').find('p').removeClass('modalNameActive'); //我的统计移除选中样式

    quest_list(1, 10);


});

// 控制历史诊断列表的显隐
$('#main_list').click(function () {
    modalList = !modalList
    if (modalList) {
        $('#modal_name_list').toggle()
        $('#main_list').find('i').eq(1).toggleClass('fa-chevron-right').toggleClass('fa-chevron-down')
    } else {
        $('#modal_name_list').toggle()
        $('#main_list').find('i').eq(1).toggleClass('fa-chevron-down').toggleClass('fa-chevron-right')
    }
})

$('#modal_name_list').on('click', 'p', function () {
    $(this).addClass('modalNameActive').siblings().removeClass('modalNameActive');
    $('#modal_name>p').removeClass('modalNameActive');
    $('#synthesize').removeClass('modalNameActive');
})

// 控制我的诊断列表的显隐
$('#statistics').click(function () {
    showList = !showList
    if (showList) {
        $('#modal_name').show()
        $('#statistics').find('i').eq(1).removeClass('fa-chevron-right').addClass('fa-chevron-down')
    } else {
        $('#modal_name').hide()
        $('#statistics').find('i').eq(1).removeClass('fa-chevron-down').addClass('fa-chevron-right')
    }
})

$('#modal_name').on('click', 'p', function () {
    modalList = false
    $(this).addClass('modalNameActive').siblings().removeClass('modalNameActive')
    $('#modal_name_list>p').removeClass('modalNameActive')
    $('#synthesize').removeClass('modalNameActive')
})

// **********************************************************企业综合诊断报告*******************************************
$('#synthesize').click(function () {
    // 企业综合诊断报告
    $('#synthesizeCon').show() //显示企业综合诊断报告

    // 历史诊断列表
    // $('#modal_name_list').hide() //隐藏历史诊断左侧目录
    $('#mineList').hide() //隐藏成熟度诊断列表
    $('#perforList').hide() //隐藏企业绩效评价列表
    $('#dimenList').hide() //隐藏制造21维度评测列表
    $('#internetList').hide() //隐藏工业互联网成熟度模型
    $('#surveyList').hide() //隐藏企业调研问卷分析报告
    $('#HRManageList').hide() //隐藏人力资源管理评测报告

    //我的统计
    // $('#modal_name').hide() //隐藏我的统计左侧目录
    $('#relativelyResult').hide() //我的统计 右侧内容隐藏

    // 左侧列表样式调整
    $('#synthesize').addClass('modalNameActive') //企业综合诊断报告左侧目录加选中样式
    $('#sub_name').find('p').removeClass('modalNameActive'); //智能制造成熟度分项集成报告移除选中样式
    $('#modal_name_list').find('p').removeClass('modalNameActive'); //历史诊断列表移除选中样式
    $('#modal_name').find('p').removeClass('modalNameActive'); //我的统计移除选中样式

    // 加载企业绩效的PDF文件
    exportData()
})

// 加载企业绩效的PDF文件   加载企业绩效的PDF文件
function exportData() {
    var downPdf = {
        status: "path"
    }
    app.DataRequest(URL + 'company/downPdf', downPdf, function (err) {}, function (data) {
        $("#pdfCon").attr('src', data[0].path)
    })
}

// 下载文件
$('#exports').click(function () {
    $(this).attr('href', URL + 'company/downPdf?id=' + localStorage.getItem('id'))
})

// ---------------------------------------------------------------智能制造成熟度分项集成报告----------------------------------------------

// if (sessionid == null) {
//     location.href = "./index.html";
// }
var subenTF = false
$('#subentryIntegration').click(function () {
    subenTF = !subenTF
    $("#sub_name").toggle();
    if (subenTF) {
        $('#subentryIntegration').find('i').eq(1).removeClass('fa-chevron-right').addClass('fa-chevron-down')
    } else {
        $('#subentryIntegration').find('i').eq(1).removeClass('fa-chevron-down').addClass('fa-chevron-right')
    }
})

$('#sub_name').on('click', 'p', function () {
    localStorage.setItem('questionRollId', $(this).attr('data-questionRollId'))
    localStorage.setItem('quesID', $(this).attr('data-id'))
    location.href = "./subentryIntegration.html"
})


// ----------------------------------------------------------智能制造成熟度模型诊断列表----------------------------------------------------
$('#maturity').click(function () {
    // 我的诊断列表   智能制造成熟度模型
    $('#synthesizeCon').hide() //隐藏企业综合诊断报告

    // 历史诊断列表
    // $('#modal_name_list').hide() //隐藏历史诊断左侧目录
    $('#mineList').show() //显示成熟度诊断列表
    $('#perforList').hide() //隐藏企业绩效评价列表
    $('#dimenList').hide() //隐藏制造21维度评测列表
    $('#internetList').hide() //隐藏工业互联网成熟度模型
    $('#surveyList').hide() //隐藏企业调研问卷分析报告
    $('#HRManageList').hide() //隐藏人力资源管理评测报告

    //我的统计
    // $('#modal_name').hide() //隐藏我的统计左侧目录
    $('#relativelyResult').hide() //我的统计 右侧内容隐藏

    // 左侧列表样式调整
    $('#synthesize').removeClass('modalNameActive') //企业综合诊断报告左侧目录加选中样式
    $(this).addClass('modalNameActive').siblings().removeClass('modalNameActive')
    $('#sub_name').find('p').removeClass('modalNameActive'); //智能制造成熟度分项集成报告移除选中样式
    // $('#modal_name_list').find('p').removeClass('modalNameActive');//历史诊断列表移除选中样式
    $('#modal_name').find('p').removeClass('modalNameActive'); //我的统计移除选中样式

    quest_list(1, 10);
})

var pagess = 0
// 历史诊断列表
function quest_list(pageNo, pageSize) {
    var quest = {
        sessionid: session,
        startTime: '',
        endTime: '',
        name: $('input[name=tem_name]').val(),
        pageNo: pageNo,
        pageSize: pageSize
    }
    app.DataRequest(URL + 'questionRoll/getQuestionRollCompanyAll', quest, function (err) {}, function (data) {
        var list = data[0].list
        var list_text = ''
        if (list.length == 0) {
            $('#mine_subent').show()
            $('#pages').hide()
            $('#mine_tbody').hide()
            return;
        }
        $('#mine_subent').hide()
        $('#pages').show()
        $('#mine_tbody').show()

        for (var i = 0; i < list.length; i++) {
            var time = formatDate(list[i].createTime)
            var type
            var status = '未完成'
            if (list[i].whole == 0) {
                type = '分项'
            } else if (list[i].whole == 1) {
                type = '整体'
            }
            if (list[i].status == 99) {
                status = '完成'
            }

            list_text += '<tr id="' + list[i].id + '">'
            list_text += '<td></td>'
            list_text += ' <td>' + (i + 1) + '</td>'
            list_text += '<td>' + list[i].name + '</td>'
            list_text += ' <td>' + type + '</td>'
            list_text += ' <td>' + status + '</td>'
            list_text += '<td>' + time + '</td>'
            list_text += '<td>'
            list_text += '<span data-id="' + list[i].id + '" title="查看详情" data-whole="' + list[i].whole + '" data-flag="0" class="search"><img src="./img/01.png" alt=""></span>'
            list_text += '<span data-id="' + list[i].id + '" title="问卷信息" class="neuter"><img src="./img/02.png" alt=""></span>'
            list_text += '<span class="trash" title="删除问卷" data-id="' + list[i].id + '"><img src="./img/03.png" alt=""></span>'
            list_text += '</td>'
            list_text += '</tr>'
        }

        pagess = data[0].pages
        var pag_text = ' <li><a href="#">上一页</a></li>'
        for (var i = 0; i < data[0].pages; i++) {
            pag_text += ' <li><a href="#">' + (i + 1) + '</a></li>'
        }
        pag_text += '<li><a href="#">下一页</a></li>'
        pag_text += '<li><a>共' + data[0].pages + '页</a></li>'
        $('#mine_tbody').html(list_text)
        $('#pages').html(pag_text)
    })
}

// 按条件搜索
$('#searchls').click(function () {
    quest_list(1, 10)
})

$('input[name=tem_name]').blur(function () {
    quest_list(1, 10)
})


// 查看详情  
$('#mine_tbody').on('click', '.search', function () {
    var whole = $(this).attr('data-whole')
    var questi = $(this).parent().parent().attr('id')
    localStorage.setItem("questionRollCompanyId", questi);
    var flag = $(this).attr('data-flag')

    if ($(this).parent().parent().find('td').eq(4).text() == '未完成') {
        if (whole == 0) {
            localStorage.setItem('optinosss', '1')
            location.href = './andpro.html'
        } else if (whole == 1) { //CoPerformance_buildModel
            localStorage.setItem('optinosss', '1')
            location.href = './evaluating.html'
        }
    } else {
        if (whole == 0) {
            localStorage.setItem('optinosss', '1')
            location.href = './subitem.html'
        } else if (whole == 1) {
            localStorage.setItem('optinosss', '1')
            location.href = './entirety.html'
        }
    }
})

// 删除问卷
var ID
$('#mine_tbody').on('click', '.trash', function () {
    ID = $(this).attr('data-id')
    var text = $(this).parent().parent().find('td').eq(2).text()
    $('#title_model').text(text)
    $('#delete').modal('show')
})

$('#delect_model').click(function () {
    app.DataRequest(URL + 'questionRoll/deleteQuestionCompany', {
        questionRollCompanyId: ID
    }, function (err) {}, function (data) {
        quest_list(1, 10)
        leftList()
    })
})

// 跳转到问卷信息页 
$('#mine_tbody').on('click', '.neuter', function () {
    localStorage.setItem('detailID', $(this).attr('data-id'))
    $(this).attr('data-id')
    location.href = './message.html'
})

//跳转到当前页
var lip = 1
$('#pages').on('click', 'li', function () {
    $('#hint').text('')
    var lips = $(this).text().replace(/\s/ig, '');
    if (lips == '上一页') {
        if (lip > 1) {
            lip--;
            quest_list(lip, 10)
        } else {
            $('#hint').text('这已经是第一页了！');
            return;
        }
    } else if (lips == '下一页') {
        if (lip < pagess) {
            lip++;
            quest_list(lip, 10)
        } else {
            $('#hint').text('这已经是最后一页了！');
            return;
        }
    } else if (lips == '共' + pagess + '页') {
        return;
    } else {
        lip = lips
        pageNum = lips
        quest_list(pageNum, 10)
    }
})


// ----------------------------------------------------------企业绩效评价列表列表--------------------------------------------------------
$('#performanes').click(function () {
    // 我的诊断列表   企业绩效评价列表
    $('#synthesizeCon').hide() //隐藏企业综合诊断报告

    // 历史诊断列表
    // $('#modal_name_list').hide() //隐藏历史诊断左侧目录
    $('#mineList').hide() //隐藏成熟度诊断列表
    $('#perforList').show() //显示企业绩效评价列表
    $('#dimenList').hide() //隐藏制造21维度评测列表
    $('#internetList').hide() //隐藏工业互联网成熟度模型
    $('#surveyList').hide() //隐藏企业调研问卷分析报告
    $('#HRManageList').hide() //隐藏人力资源管理评测报告

    //我的统计
    // $('#modal_name').hide() //隐藏我的统计左侧目录
    $('#relativelyResult').hide() //我的统计 右侧内容隐藏

    // 左侧列表样式调整
    $('#synthesize').removeClass('modalNameActive') //企业综合诊断报告左侧目录加选中样式
    $(this).addClass('modalNameActive').siblings().removeClass('modalNameActive')
    $('#sub_name').find('p').removeClass('modalNameActive'); //智能制造成熟度分项集成报告移除选中样式
    // $('#modal_name_list').find('p').removeClass('modalNameActive');//历史诊断列表移除选中样式
    $('#modal_name').find('p').removeClass('modalNameActive'); //我的统计移除选中样式


    performandes()
})

// 企业绩效诊断列表
function performandes() {
    var perText = ''
    var pagText = ''
    app.DataRequest(URL + 'questionRoll/getBenchmarkingAll', {}, function (err) {}, function (data) {
        if (data[0].status != 1) {
            $('#perfor_subent').show()
            $('#mine_tbody').hide()
            return
        } else {
            var list = data[0].normResultList
            if (list.length == 0) {
                $('#perfor_subent').show()
                $('#perfor_tbody').hide()
                return
            } else {
                for (var i = 0; i < list.length; i++) {
                    var comparisonYear = '——'
                    var yearsed = 0
                    var time = formatDate(list[i].createtime)
                    if (list[i].updatetime != undefined) {
                        time = formatDate(list[i].updatetime)
                    }

                    if (list[i].comparisonYear) {
                        yearsed = 1
                        comparisonYear = list[i].comparisonYear
                    }
                    perText += '<tr id="' + list[i].id + '">'
                    perText += '<td></td>'
                    perText += '<td>' + (i + 1) + '</td>'
                    perText += '<td>' + list[i].questionRollName + '</td>'
                    perText += '<td>' + list[i].inputYear + '</td>'
                    perText += '<td>' + comparisonYear + '</td>'
                    perText += '<td>' + time + '</td>'
                    perText += '<td>'
                    perText += '<span data-id="' + list[i].id + '" data-year="' + list[i].inputYear
                    perText += '"data-benYear="' + comparisonYear + '" title="查看详情" data-whole="' + list[i].whole + '"data-questionRollCompanyId="' + list[i].questionRollCompanyId
                    perText += '"data-yearsed="' + yearsed + '" data-flag="1" class="search"><img src="./img/01.png" alt=""></span>'
                    perText += '<span data-id="' + list[i].id + '" data-year="' + list[i].inputYear
                    perText += '"data-benYear="' + comparisonYear + '" title="问卷信息" data-whole="' + list[i].whole + '"data-questionRollCompanyId="' + list[i].questionRollCompanyId
                    perText += '"data-yearsed="' + yearsed + '" data-flag="1" class="neuters"><img src="./img/02.png" alt=""></span>'
                    perText += '</td>'
                    perText += '</tr>'
                }
            }
            $('#perfor_tbody').html(perText)
        }

    })

}

// 查看详情
$('#perfor_tbody').on('click', '.search', function () {
    var whole = $(this).attr('data-whole')
    var questi = $(this).parent().parent().attr('id')
    localStorage.setItem("questionRollCompanyId", questi);
    var flag = $(this).attr('data-flag')

    // 判断是否完成对标
    var yearsed = $(this).attr('data-yearsed')
    // 数据年份
    localStorage.setItem("year", $(this).attr('data-year'));
    // 对标年份 questionRollCompanyId
    localStorage.setItem("benYear", $(this).attr('data-benYear'));

    localStorage.setItem("questionRollCompanyId", $(this).attr('data-questionRollCompanyId'));

    if (yearsed == 0) {
        localStorage.setItem('optinosss', '1')
        location.href = './CoPerformance_buildModel.html'
    }
    if (yearsed == 1) {
        localStorage.setItem('optinosss', '1')
        // location.href = './CoPerformance_result.html'
        location.href = './CoPerformance_result_new_backup.html'
    }
})

// 跳转到问卷信息页 
$('#perfor_tbody').on('click', '.neuters', function () {
    // 判断是否完成对标
    var yearsed = $(this).attr('data-yearsed')
    // 数据年份
    localStorage.setItem("year", $(this).attr('data-year'));
    // 对标年份 questionRollCompanyId
    localStorage.setItem("benYear", $(this).attr('data-benYear'));

    localStorage.setItem("questionRollCompanyId", $(this).attr('data-questionRollCompanyId'));

    if (yearsed == 0) {
        localStorage.setItem('optinosss', '1')
        location.href = './CoPerformance_buildModel.html'
    }
    if (yearsed == 1) {
        localStorage.setItem('optinosss', '1')
        location.href = './messages.html'
    }
    // location.href = './messages.html'
})

// ---------------------------------------------------------------整体评测------------------------------------------------------

// 数据加载函数
function getCompleteScores(quest) {
    app.DataRequest(URL + 'statistical/getCompleteScores', quest, function (err) {}, function (data) {
        if (data[0].status != 1) {
            $('#subent').show()
            $('#entiretyAppraisal').hide()
            return;
        }

        if (data[0].status == 1) {
            $('#subent').hide()
            $('#entiretyAppraisal').show()
            if (data[0].rise == 0) {
                $('#ent_score>.fa').removeClass('fa-long-arrow-down').addClass('fa-long-arrow-up')
            } else if (data[0].rise == 1) {
                $('#ent_score>.fa').removeClass('fa-long-arrow-up').addClass('fa-long-arrow-down')
            } else if (data[0].rise == 2) {
                $('#ent_score>.fa').removeClass('fa-long-arrow-down').addClass('fa-long-arrow-up')
            }

            // 整体评测总体介绍
            $('#finalScore').text(data[0].nowResult.finalScore)
            $('#entRank').text(data[0].nowResult.finalName)

            var ls = 0
            if (data[0].nowResult.finalLevel == '0级') {
                ls = 0
            } else if (data[0].nowResult.finalLevel == '1级') {
                ls = 1
            } else if (data[0].nowResult.finalLevel == '2级') {
                ls = 2
            } else if (data[0].nowResult.finalLevel == '3级') {
                ls = 3
            } else if (data[0].nowResult.finalLevel == '4级') {
                ls = 4
            } else if (data[0].nowResult.finalLevel == '5级') {
                ls = 5
            }

            $('#entDetail').text(data_con_detail[ls])

            // 柱状图
            var lasts = new Array()
            var news = new Array()

            if (!data[0].lastResult) {
                lasts = [0, 0, 0, 0, 0]
            } else {
                var lastResult = data[0].lastResult.scoreDetail
                for (var i = 0; i < lastResult.length; i++) {
                    lasts.push(lastResult[i].score)
                }
            }
            var nowResult = data[0].nowResult.scoreDetail
            for (var i = 0; i < nowResult.length; i++) {
                news.push(nowResult[i].score)
            }

            histogram(lasts, news);

            var scoreDetail = data[0].nowResult.scoreDetail

            // 雷达图

            for (var i = 0; i < scoreDetail.length; i++) {
                if (scoreDetail[i].status == 1) {
                    var currentKindStore = scoreDetail[i].currentKindStore
                    $('#radarAll0').show()
                    $('#radarAll0').find('p>span:first').html(scoreDetail[i].levelName + '<strong>【' + scoreDetail[i].score + '】</strong>')
                    $('#radarAll0').find('p>span:last').html(scoreDetail[i].isReachStandard)
                    $('#radarMap').find('.radarAll').eq(i).show()
                    var names = new Array()
                    var ranDatass = new Array()
                    var backColor = '#67d781'
                    var color = '#4dc4f2'
                    if (scoreDetail[i].isReachStandard == '未达标') {
                        backColor = '#e57c53'
                        color = '#e7c57c'
                    }
                    $('#radarMap').find('.radarAll').eq(i).show()
                    $('#radarMap').find('.radarAll').eq(i).find('p>span:first').html(scoreDetail[i].levelName + '<strong>【' + scoreDetail[i].score + '】</strong>')
                    $('#radarMap').find('.radarAll').eq(i).find('p>span:last').html(scoreDetail[i].isReachStandard).css('background-color', backColor)
                    var name = new Array()
                    var ranDatas = new Array()
                    for (var j = 0; j < currentKindStore.length; j++) {
                        names.push({
                            name: currentKindStore[j].className.split('-')[2]
                        })
                        ranDatass.push(currentKindStore[j].classScore)
                    }



                    radar('radarMap' + i, names, ranDatass, color)
                }

            }
        } else {
            return;
        }
    })
}


$('#modal_name').on('click', 'p', function () {
    $('#synthesizeCon').hide()
    $('#relativelyResult').show()
    $('#entiretyTitlt').addClass('appraisalActive')
    $('#subentryTitlt').removeClass('appraisalActive')
    $('#mineList').hide();
    $('#relativelyResulth3').show()
    $('#entiretyAppraisal').show()
    $('#subentryAppraisal').hide()
    $('#radarMap').find('.radarAll').hide()
    $('#dimenList').hide()
    $('#internetList').hide() //隐藏工业互联网成熟度模型
    $('#surveyList').hide() //隐藏企业调研问卷分析报告
    $('#HRManageList').hide() //隐藏人力资源管理评测报告

    questionRollId = $(this).attr('data-questionRollId')
    questent = {
        companyId: $(this).attr('data-companyId'),
        questionRollId: $(this).attr('data-questionRollId')
    }

    getCompleteScores(questent)
})

$('#entiretyTitlt').click(function () {
    $(this).addClass('appraisalActive')
    $('#subentryTitlt').removeClass('appraisalActive')
    $('#mineList').hide();
    $('#relativelyResulth3').show()
    $('#entiretyAppraisal').show()
    $('#subentryAppraisal').hide()
    // $('#radarMap').find('.radarAll').hide()
    getCompleteScores(questent)
})


// 柱状图
function histogram(lasts, news) {
    var domAir1 = document.getElementById('histogram');
    var myChartAir1 = echarts.init(domAir1);
    option = {
        color: ['#f0c870', '#ac9efc'],
        tooltip: {
            trigger: 'axis',
            formatter: '{b}<br /><div style="display: inline-block;width: 10px;height: 10px;background-color: #f0c870;border-radius: 50%;"></div> {c0}<br /><div style="display: inline-block;width: 10px;height: 10px;background-color: #ac9efc;border-radius: 50%;"></div> {c1}',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['已规划级', '规范级', '集成级', '优化级', '引领级']
        },
        yAxis: {
            type: 'value',
            max: 1,
            min: 0
        },
        series: [{
                type: 'bar',
                barCategoryGap: '50%',
                data: news
            },
            {
                type: 'bar',
                barCategoryGap: '50%',
                data: lasts
            }
        ]
    };
    myChartAir1.setOption(option, true)
}


// 雷达图
function radar(docRadar, name, data, color) {
    var domAir1 = document.getElementById(docRadar);
    var myChartAir1 = echarts.init(domAir1);
    option = {
        color: [color], //['#4dc4f2'],
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
                    padding: [1, 2]
                }
            },
            nameGap: '5',
            splitNumber: '4',
            shape: 'circle',
            splitArea: {
                show: 'true',
                areaStyle: {
                    color: '#fff'
                }
            },
            indicator: name
        },
        series: [{
            type: 'radar',
            areaStyle: {
                normal: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0,
                            color: '#ffffff' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: color // 100% 处的颜色
                        }],
                    }
                },
                emphasis: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0,
                            color: '#ffffff'
                        }, {
                            offset: 1,
                            color: color
                        }],
                    }
                }
            },
            itemStyle: {
                emphasis: {
                    lineStyle: {
                        // width: 2,
                        borderColor: '#4462B8',
                        borderWidth: 3
                    },
                    areaStyle: {
                        color: '#ffffff',
                        opacity: 0.5
                    }
                }
            },
            data: [{
                value: data
            }]

        }]
    };
    myChartAir1.setOption(option, true)
}


// ---------------------------------------------------------------分项评测-------------------------------------------------------

// 分数颜色设置
function colors(params) {
    var color = 'f1705f';
    if (params == '已规范级') {
        color = '#f1b85f';
    } else if (params == '规范级') {
        color = '#ac9efc';
    } else if (params == '集成级') {
        color = '#5fcaf1';
    } else if (params == '优化级') {
        color = '#5f99f1';
    } else if (params == '引领级') {
        color = '#40cca6';
    } else if (params == '未达标') {
        color = '#f1705f';
    }
    return color;
}

// 处理数据格式
function dataType(value) {
    var result
    if (value.indexOf('.') == -1) {
        result = parseInt(value)
    } else {
        result = parseFloat(value).toFixed(2)
    }
    return result
}

// 分项评测结果数据
function subentryData() {
    var quest = {
        questionRollId: questionRollId,
        sessionid: localStorage.getItem('sessionid')
    }
    app.DataRequest(URL + 'overallEvaluation/getOverallEvaluationCsd', quest, function (err) {}, function (data) {
        var companyOv = data.companyOverallEvaluation
        if (companyOv.length == 0) {
            $('#subent').show()
            $('#subentryAppraisal').hide()
            return;
        }
        $('#subent').hide()
        $('#subentryAppraisal').show()
        var lastd = {
            serve: 0,
            logistics: 0,
            market: 0,
            production: 0,
            design: 0,
        }
        var news = {
            serve: 0,
            logistics: 0,
            market: 0,
            production: 0,
            design: 0,
        }

        for (var i = 0; i < companyOv.length; i++) {
            var color
            var currentResult = dataType(companyOv[i].currentResult)

            if (companyOv[i].name.split('-')[2] == '服务') {
                color = colors(companyOv[i].levelName)
                $('#serve').show()
                $('#serve').find('.sub_detail>span:first').text(currentResult).css('color', color)
                $('#serve').find('.sub_detail>span:last').text(companyOv[i].levelName)

                news.serve = companyOv[i].currentResult
                var lastResult
                if (companyOv[i].lastResult == '') {
                    lastResult = 0
                } else {
                    lastResult = companyOv[i].lastResult
                }
                lastd.serve = lastResult

            } else if (companyOv[i].name.split('-')[2] == '物流') {
                color = colors(companyOv[i].levelName)
                $('#logistics').show()
                $('#logistics').find('.sub_detail>span:first').text(currentResult).css('color', color)
                $('#logistics').find('.sub_detail>span:last').text(companyOv[i].levelName)
                news.logistics = companyOv[i].currentResult
                var lastResult
                if (companyOv[i].lastResult == '') {
                    lastResult = 0
                } else {
                    lastResult = companyOv[i].lastResult
                }
                lastd.logistics = lastResult

            } else if (companyOv[i].name.split('-')[2] == '销售') {
                color = colors(companyOv[i].levelName)
                $('#market').show()
                $('#market').find('.sub_detail>span:first').text(currentResult).css('color', color)
                $('#market').find('.sub_detail>span:last').text(companyOv[i].levelName)
                news.market = companyOv[i].currentResult
                var lastResult
                if (companyOv[i].lastResult == '') {
                    lastResult = 0
                } else {
                    lastResult = companyOv[i].lastResult
                }
                lastd.market = lastResult

            } else if (companyOv[i].name.split('-')[2] == '生产') {
                color = colors(companyOv[i].levelName)
                $('#production').show()
                $('#production').find('.sub_detail>span:first').text(currentResult).css('color', color)
                $('#production').find('.sub_detail>span:last').text(companyOv[i].levelName)
                news.production = companyOv[i].currentResult
                var lastResult
                if (companyOv[i].lastResult == '') {
                    lastResult = 0
                } else {
                    lastResult = companyOv[i].lastResult
                }
                lastd.production = lastResult

            } else if (companyOv[i].name.split('-')[2] == '设计') {
                color = colors(companyOv[i].levelName)
                $('#design').show()
                $('#design').find('.sub_detail>span:first').text(currentResult).css('color', color)
                $('#design').find('.sub_detail>span:last').text(companyOv[i].levelName)
                news.design = companyOv[i].currentResult
                var lastResult
                if (companyOv[i].lastResult == '') {
                    lastResult = 0
                } else {
                    lastResult = companyOv[i].lastResult
                }
                lastd.design = lastResult
            }
        }
        map(news, lastd)
    })
}

$('#subentryTitlt').click(function () {
    $(this).addClass('appraisalActive')
    $('#entiretyTitlt').removeClass('appraisalActive')
    $('#mineList').hide();
    $('#relativelyResulth3').show()
    $('#subentryAppraisal').show()
    $('#entiretyAppraisal').hide()
    $('#dimenList').hide()
    $('#internetList').hide() //隐藏工业互联网成熟度模型
    $('#surveyList').hide() //隐藏企业调研问卷分析报告
    $('#HRManageList').hide() //隐藏人力资源管理评测报告
    subentryData()
})


function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var size = api.size([1, 1])
    var height = size[1] * 0.25;
    var sliceWidth = size[0];
    var bg = [],
        bar = [];
    var bgColors = ['#fafafa', '#f5f5f5', '#efefef', '#e4e4e4', '#dddddd'];
    var barColors = [
        ['#edecfd', '#ddd9fb', '#cbc6f9', '#bab3f8', '#a79ff2'],
        ['#fbf9e5', '#f7e9ca', '#f3deb0', '#eed39c', '#eacb7e']
    ];
    var gap = 8;
    var gapV = 4;
    var seriesIndex = params.seriesIndex;

    if (seriesIndex >= 5) {
        debugger;
        return null;
    }

    for (var i = 0; i < 5; i++) {
        bg.push({
            type: 'rect',
            shape: {
                x: start[0] + sliceWidth * i + gap / 2,
                y: start[1] - height / 2 - height + seriesIndex * (height + gapV),
                width: i == 4 ? sliceWidth - gap / 2 : sliceWidth - gap,
                height: height
            },
            style: {
                fill: bgColors[i]
            }
        })
    }

    var length = Math.ceil(((end[0] - start[0]) / sliceWidth).toFixed(2));
    for (i = 0; i < length; i++) {
        bar.push({
            type: 'rect',
            shape: {
                x: start[0] + sliceWidth * i + gap / 2,
                y: start[1] - height / 2 - height + seriesIndex * (height + gapV),
                width: i == length - 1 ? sliceWidth - (sliceWidth * (length) - end[0] + start[0]) - gap / 2 : sliceWidth - gap,
                height: height
            },
            style: {
                fill: barColors[seriesIndex][i]
            }
        })
    }

    return {
        type: 'group',
        diffChildrenByName: true,
        children: [{
                type: 'group',
                children: bg
            },
            {
                type: 'group',
                children: bar
            }
        ]
    }
}

// 柱状图
function map(news, lastd) {
    var chart = echarts.init(document.getElementById('histogramSub'))
    var startTime = 0;
    var categories = ['设计', '生产', '销售', '物流', '服务'];
    var seriesColors = ['#a8a1f6', '#e7c57c'];

    var itemStyle = {
        'normal': {
            'color': seriesColors[0]
        }
    };
    var data = [{
            'value': [4, 0, news.serve, news.serve],
        },
        {
            'value': [3, 0, news.logistics, news.logistics],
        },
        {
            'value': [2, 0, news.market, news.market],
        },
        {
            'value': [1, 0, news.production, news.production]
        },
        {
            'value': [0, 0, news.design, news.design]
        }
    ]
    var data1 = [{
            'value': [0, 0, lastd.design, lastd.design]
        },
        {
            'value': [1, 0, lastd.production, lastd.production]
        },
        {
            'value': [2, 0, lastd.market, lastd.market],
        },
        {
            'value': [3, 0, lastd.logistics, lastd.logistics],
        },
        {
            'value': [4, 0, lastd.serve, lastd.serve],
        }
    ]

    var option = {

        tooltip: {
            formatter: function (params) {
                return params.seriesName + ': ' + params.value[3];
            }
        },
        title: {
            text: '最新次和次新次的对比',
            left: 'left',
            show: false
        },
        legend: {
            show: false,
            align: 'right',
            data: ['最新次', '次新次']
        },
        grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            scale: true,
            axisLabel: {
                formatter: function (val) {
                    var showNames = ['', '已规划级', '规范级', '集成级', '优化级', '引领级']
                    return showNames[val]
                }
            },
            splitLine: {
                show: false
            },
            max: 5,
            min: 0,
            nameTextStyle: {
                color: '#b6b6b6'
            }
        },
        yAxis: {
            data: categories,
            nameTextStyle: {
                color: '#b6b6b6'
            }
        },
        series: [{
                name: '次新次',
                type: 'custom',
                renderItem: renderItem,
                itemStyle: {
                    normal: {
                        opacity: 1,
                        color: seriesColors[1]
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                encode: {
                    x: [1, 2],
                    y: 0
                },
                data: data1
            },
            {
                name: '最新次',
                type: 'custom',
                renderItem: renderItem,
                itemStyle: {
                    normal: {
                        opacity: 1,
                        color: seriesColors[0]
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                encode: {
                    x: [1, 2],
                    y: 0
                },
                data: data,
                context: {
                    colors: [1, 2]
                }
            },

        ]
    };

    chart.setOption(option)

    chart.on('click', function (params) {})

    window.onresize = chart.resize
}



// ---------------------------------------------------------制造21维度评测---------------------------------------------------

$('#dimensionality').click(function () {
    // 我的诊断列表   智能制造成熟度模型
    $('#synthesizeCon').hide() //隐藏企业综合诊断报告

    // 历史诊断列表
    // $('#modal_name_list').hide() //隐藏历史诊断左侧目录
    $('#mineList').hide() //隐藏成熟度诊断列表
    $('#perforList').hide() //隐藏企业绩效评价列表
    $('#dimenList').show() //显示制造21维度评测列表
    $('#internetList').hide() //隐藏工业互联网成熟度模型
    $('#surveyList').hide() //隐藏企业调研问卷分析报告
    $('#HRManageList').hide() //隐藏人力资源管理评测报告

    //我的统计
    // $('#modal_name').hide() //隐藏我的统计左侧目录
    $('#relativelyResult').hide() //我的统计 右侧内容隐藏

    // 左侧列表样式调整
    $('#synthesize').removeClass('modalNameActive') //企业综合诊断报告左侧目录加选中样式
    $(this).addClass('modalNameActive').siblings().removeClass('modalNameActive')
    $('#sub_name').find('p').removeClass('modalNameActive'); //智能制造成熟度分项集成报告移除选中样式
    // $('#modal_name_list').find('p').removeClass('modalNameActive');//历史诊断列表移除选中样式
    $('#modal_name').find('p').removeClass('modalNameActive'); //我的统计移除选中样式

    dimensionalityList(1, 10)
})


// 渲染制造21维度评测列表
var dime_pagess = 1 //列表共分多少页显示
function dimensionalityList(pageNo, pageSize) {
    var dimen_quest = {
        pageNo: pageNo,
        pageSize: pageSize
    }
    app.DataRequest(URL + 'companyEvaluatingRoll/evaluatingAll', dimen_quest, function (err) {}, function (data) {
        if (data[0].status != 1) {
            $('#dimen_subent').show()
        } else if (data[0].list.length == 0) {
            $('#dimen_subent').show()
        } else {
            let dimeList = data[0].list
            // console.log(dimeList)
            let dimeListText = ''
            for (let i = 0; i < dimeList.length; i++) {
                // 评测结果所属级别
                let evaluatingLevel = ''
                if (dimeList[i].evaluatingLevel == 0) {
                    evaluatingLevel = '差'
                } else if (dimeList[i].evaluatingLevel == 1) {
                    evaluatingLevel = '差'
                } else if (dimeList[i].evaluatingLevel == 2) {
                    evaluatingLevel = '一般'
                } else if (dimeList[i].evaluatingLevel == 3) {
                    evaluatingLevel = '良好'
                } else if (dimeList[i].evaluatingLevel == 4) {
                    evaluatingLevel = '优秀'
                }

                dimeListText += '<tr>'
                dimeListText += '<td></td>'
                dimeListText += '<td>' + (i + 1) + '</td>'
                dimeListText += '<td>' + formatDate(dimeList[i].evaluatingTime, false) + '</td>'
                dimeListText += '<td style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="' + dimeList[i].evaluatingAddress + '">' + dimeList[i].evaluatingAddress + '</td>'
                dimeListText += '<td style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="' + dimeList[i].writeCompanyName + '">' + dimeList[i].writeCompanyName + '</td>'
                dimeListText += '<td style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="' + dimeList[i].evaluatingCompanyName + '">' + dimeList[i].evaluatingCompanyName + '</td>'
                dimeListText += '<td>' + dimeList[i].score + '</td>'
                dimeListText += '<td>' + evaluatingLevel + '</td>'
                dimeListText += '<td>' + (dimeList[i].evaluatingType == 0 ? '企业' : '专家') + '评测</td>'
                dimeListText += '<td>' + (dimeList[i].flag == 1 ? '完成' : '未完成') + '</td>'
                dimeListText += '<td style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="' + dimeList[i].evaluatingPeople + '">' + dimeList[i].evaluatingPeople + '</td>'
                dimeListText += '<td>'
                dimeListText += '<span data-flag="' + dimeList[i].flag + '" data-id="' + dimeList[i].id + '" title="查看详情" class="search"><img src="./img/01.png" alt=""></span>'
                dimeListText += '<span data-flag="' + dimeList[i].flag + '" data-id="' + dimeList[i].id + '" class="trash" title="删除问卷"><img src="./img/03.png" alt=""></span>'
                dimeListText += '</td>'
                dimeListText += '</tr>'
            }
            dime_pagess = data[0].pages
            let dimePageText = '<li><a href="#">上一页</a></li>'
            for (let i = 0; i < data[0].pages; i++) {
                dimePageText += '<li><a href="#">' + (i + 1) + '</a></li>'
            }
            dimePageText += '<li><a href="#">下一页</a></li>'
            dimePageText += '<li><a>共' + data[0].pages + '页</a></li>'
            $('#dimen_tbody').html(dimeListText)
            $('#dimen_pages').html(dimePageText)
        }

    })
}

// 切页
var dime_lip = 1;
$('#dimen_pages').on('click', 'li', function () {
    $('#dimen_hint').text('')
    var nowPage = parseInt($(this).text().replace(/\s/ig, ''));
    var prePage = dime_lip - 1
    var nextPage = dime_lip + 1
    if ($(this).text().replace(/\s/ig, '') == '上一页') {
        if (prePage > 0) {
            dime_lip = prePage
            dimensionalityList(prePage, 10)
        } else {
            $('#dimen_hint').text('已经是第一页了');
            return;
        }
    } else if ($(this).text().replace(/\s/ig, '') == '下一页') {
        if (nextPage < dime_pagess + 1) {
            dime_lip = nextPage
            dimensionalityList(nextPage, 10)
        } else {
            $('#dimen_hint').text('已经是最后一页了');
            return;
        }
    } else if ($(this).text().replace(/\s/ig) == '共' + dime_pagess + '页') {
        return;
    } else {
        dime_lip = nowPage
        dimensionalityList(nowPage, 10)
    }
})

// 查看21维度列表中的数据详情
$('#dimen_tbody').on('click', '.search', function () {
    let flagStatus = $(this).attr('data-flag');
    let dimeID = $(this).attr('data-id');
    localStorage.setItem('companyEvaluatingRollID', dimeID)
    if (flagStatus == 0) {
        location.href = './topic21.html'
    }
    if (flagStatus == 1) {
        location.href = './demensions21.html'
    }
})

// 删除21维度列表中的数据
$('#dimen_tbody').on('click', '.trash', function () {
    let flagStatus = $(this).attr('data-flag');
    let dimeID = $(this).attr('data-id');
    localStorage.setItem('companyEvaluatingRollID', dimeID);
    $('#delete21').modal('show');
    $('#title_model21').text($(this).parent().parent().find('td').eq(8).text())
})

$('#delect_model21').click(function () {
    let quest = {
        id: localStorage.getItem('companyEvaluatingRollID')
    }
    app.DataRequest(URL + 'companyEvaluatingRoll/deleteEvaluting', quest, function (err) {}, function (data) {
        if (data[0].status == 1) {
            dimensionalityList(1, 10)
        } else {
            console.log('删除失败！')
        }
    })
})

// ---------------------------------------------------------工业互联网成熟度模型---------------------------------------------------
$('#internetIndustry').click(function () {
    // 我的诊断列表   智能制造成熟度模型
    $('#synthesizeCon').hide() //隐藏企业综合诊断报告

    // 历史诊断列表
    // $('#modal_name_list').hide() //隐藏历史诊断左侧目录
    $('#mineList').hide() //隐藏成熟度诊断列表
    $('#perforList').hide() //隐藏企业绩效评价列表
    $('#dimenList').hide() //隐藏制造21维度评测列表
    $('#internetList').show() //隐藏工业互联网成熟度模型
    $('#surveyList').hide() //隐藏企业调研问卷分析报告
    $('#HRManageList').hide() //隐藏人力资源管理评测报告

    //我的统计
    // $('#modal_name').hide() //隐藏我的统计左侧目录
    $('#relativelyResult').hide() //我的统计 右侧内容隐藏

    // 左侧列表样式调整
    $('#synthesize').removeClass('modalNameActive') //企业综合诊断报告左侧目录加选中样式
    $(this).addClass('modalNameActive').siblings().removeClass('modalNameActive')
    $('#sub_name').find('p').removeClass('modalNameActive'); //智能制造成熟度分项集成报告移除选中样式
    // $('#modal_name_list').find('p').removeClass('modalNameActive');//历史诊断列表移除选中样式
    $('#modal_name').find('p').removeClass('modalNameActive'); //我的统计移除选中样式

    _internetEvaluating(1, 10)
})

// 渲染工业互联网能力成熟度列表
var internet_pagess = 1 //列表共分多少页显示
function _internetEvaluating(pageIn, pageSizeIn) {
    var internet_quest = {
        pageNo: pageIn,
        pageSize: pageSizeIn
    }
    app.DataRequest(URL + 'companyInternetRoll/internetEvaluatingList', internet_quest, function (err) {}, function (data) {
        // console.log(data[0].list);
        if (data[0].status != 1) {
            $('#internet_subent').show()
        } else if (data[0].list.length == 0) {
            $('#internet_subent').show()
        } else {
            let list = data[0].list;
            let listHtml = '';
            for (let i = 0; i < list.length; i++) {
                listHtml += '<tr>'
                listHtml += '<td></td>'
                listHtml += '<td>' + (i + 1) + '</td>'
                listHtml += '<td>' + formatDate(list[i].evaluatingTime) + '</td>'
                listHtml += '<td>' + (list[i].manufactureType == 1 ? '离散' : '流程') + '型</td>'
                listHtml += '<td>' + (list[i].entirety == 1 ? '综合' : '分项') + '评测</td>'
                listHtml += '<td>' + (list[i].evaluatingType == 0 ? '企业' : '专家') + '评测</td>'
                listHtml += '<td>' + (list[i].flag == 9 ? '完成' : '未完成') + '</td>'
                listHtml += '<td style="width: 11%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" title="' + list[i].evaluatingPeople + '">' + list[i].evaluatingPeople + '</td>'
                listHtml += '<td data-msg=' + JSON.stringify({
                    id: list[i].id,
                    flag: list[i].flag,
                    name: (list[i].manufactureType == 1 ? '离散型' : '流程型') + (list[i].entirety == 1 ? '综合评测' : '分项评测'),
                    synthesizeLevel: list[i].synthesizeLevel ? list[i].synthesizeLevel : null,
                    interflowLevel: list[i].interflowLevel ? list[i].interflowLevel : null,
                    integrationLevel: list[i].integrationLevel ? list[i].integrationLevel : null,
                    analyseLevel: list[i].analyseLevel ? list[i].analyseLevel : null
                }) + '><span title="查看详情" class="search"><img src="./img/01.png" alt=""></span><span class="trash" title="删除问卷"><img src="./img/03.png" alt=""></span></td>'
                listHtml += '</tr>'
            }
            internet_pagess = data[0].pages;
            let interPageText = '<li><a href="#">上一页</a></li>';
            for (let i = 0; i < data[0].pages; i++) {
                interPageText += '<li><a href="#">' + (i + 1) + '</a></li>';
            }
            interPageText += '<li><a href="#">下一页</a></li>';
            interPageText += '<li><a>共' + data[0].pages + '页</a></li>';
            $('#internet_tbody').html(listHtml);
            $('#internet_pages').html(interPageText);
        }
    })
}

// 切页
var inter_lip = 1;
$('#internet_pages').on('click', 'li', function () {
    $('#internet_hint').text('')
    var nowPage = parseInt($(this).text().replace(/\s/ig, ''));
    var prePage = inter_lip - 1
    var nextPage = inter_lip + 1
    if ($(this).text().replace(/\s/ig, '') == '上一页') {
        if (prePage > 0) {
            inter_lip = prePage
            _internetEvaluating(prePage, 10)
        } else {
            $('#internet_hint').text('已经是第一页了');
            return;
        }
    } else if ($(this).text().replace(/\s/ig, '') == '下一页') {
        if (nextPage < internet_pagess + 1) {
            inter_lip = nextPage
            _internetEvaluating(nextPage, 10)
        } else {
            $('#internet_hint').text('已经是最后一页了');
            return;
        }
    } else if ($(this).text().replace(/\s/ig) == '共' + internet_pagess + '页') {
        return;
    } else {
        inter_lip = nowPage
        _internetEvaluating(nowPage, 10)
    }
})

// 查看详情
$('#internet_tbody').on('click', '.search', function () {
    let listInfo = JSON.parse($(this).parent().attr('data-msg'));
    localStorage.setItem('internerCompanyId', listInfo.id);
    if (listInfo.flag == 0) {
        location.href = './internetOptions.html';
    } else if (listInfo.flag == 9) {
        location.href = './internetReport.html';
    } else if (listInfo.flag == 1) {
        if (listInfo.synthesizeLevel == null && listInfo.interflowLevel == null && listInfo.integrationLevel == null && listInfo.analyseLevel == null) {
            location.href = './internetTopic.html';
        } else {
            location.href = './internetResult.html';
        }
    }
})

// 删除问卷
let deleteInternet;
$('#internet_tbody').on('click', '.trash', function () {
    let listInfo = JSON.parse($(this).parent().attr('data-msg'));
    localStorage.setItem('internerCompanyId', listInfo.id);
    deleteInternet = listInfo;

    $('#deleteInternet').modal('show');
    $('#title_modelInternet').text(listInfo.name);
})

$('#delect_modelInternet').click(function () {
    app.DataRequest(URL + 'companyInternetRoll/internetEvaluatingDelete', {
        companyInternetRollId: deleteInternet.id
    }, function (err) {}, function (data) {
        if (data[0].status == 1) {
            _internetEvaluating(1, 10);
        } else {
            console.log('删除失败！')
        }
    })
})
// -------------------------------------------------企业调研问卷分析报告---------------------------

// public static string ClearHtmlCode(string text) {

// }

function _JSONHTML(name) {
    let names = name.replace(/<\/?[^>]*>/g, '');
    return names
}

$('#surveyQuestion').click(function () {
    // 我的诊断列表   智能制造成熟度模型
    $('#synthesizeCon').hide() //隐藏企业综合诊断报告

    // 历史诊断列表
    // $('#modal_name_list').hide() //隐藏历史诊断左侧目录
    $('#mineList').hide() //隐藏成熟度诊断列表
    $('#perforList').hide() //隐藏企业绩效评价列表
    $('#dimenList').hide() //隐藏制造21维度评测列表
    $('#internetList').hide() //隐藏工业互联网成熟度模型
    $('#surveyList').show() //隐藏企业调研问卷分析报告
    $('#HRManageList').hide() //隐藏人力资源管理评测报告

    //我的统计
    // $('#modal_name').hide() //隐藏我的统计左侧目录
    $('#relativelyResult').hide() //我的统计 右侧内容隐藏

    // 左侧列表样式调整
    $('#synthesize').removeClass('modalNameActive') //企业综合诊断报告左侧目录加选中样式
    $(this).addClass('modalNameActive').siblings().removeClass('modalNameActive')
    $('#sub_name').find('p').removeClass('modalNameActive'); //智能制造成熟度分项集成报告移除选中样式
    // $('#modal_name_list').find('p').removeClass('modalNameActive');//历史诊断列表移除选中样式
    $('#modal_name').find('p').removeClass('modalNameActive'); //我的统计移除选中样式

    _surveyQuestion(1, 10)
})

var surver_pagess = 1 //列表共分多少页显示
function _surveyQuestion(pageIn, pageSizeIn) {
    var internet_quest = {
        pageNo: pageIn,
        pageSize: pageSizeIn
    }
    app.DataRequest(URL + 'dwsurvey/directoryRemarkList', internet_quest, function (err) {}, function (data) {
        if (data.status != 1) {
            $('#survey_subent').show()
        } else if (data.list.length == 0) {
            $('#survey_subent').show()
        } else {
            let list = data.list;
            let listHtml = '';
            for (let i = 0; i < list.length; i++) {
                listHtml += '<tr>'
                listHtml += '<td></td>'
                listHtml += '<td>' + (i + 1) + '</td>'
                listHtml += '<td>' + list[i].directoryName + '</td>'
                listHtml += '<td>' + list[i].area + '</td>'
                listHtml += '<td>' + formatDate(list[i].analysisTime) + '</td>'
                listHtml += '<td>' + (list[i].flag == 0 ? '未完成' : '完成') + '</td>'
                listHtml += '<td data-msg=' + JSON.stringify({
                    id: list[i].id,
                    flag: list[i].flag,
                    name: _JSONHTML(list[i].directoryName)
                }) + '><span title="查看详情" class="search"><img src="./img/01.png" alt=""></span><span class="trash" title="删除问卷"><img src="./img/03.png" alt=""></span></td>'
                listHtml += '</tr>'
            }
            surver_pagess = data.pages;
            let interPageText = '<li><a href="#">上一页</a></li>';
            for (let i = 0; i < data.pages; i++) {
                interPageText += '<li><a href="#">' + (i + 1) + '</a></li>';
            }
            interPageText += '<li><a href="#">下一页</a></li>';
            interPageText += '<li><a>共' + data.pages + '页</a></li>';
            $('#survey_tbody').html(listHtml);
            $('#survey_pages').html(interPageText);
        }
    })
}

// 切页
var surver_lip = 1;
$('#survey_pages').on('click', 'li', function () {
    $('#surver_hint').text('')
    var nowPage = parseInt($(this).text().replace(/\s/ig, ''));
    var prePage = surver_lip - 1
    var nextPage = surver_lip + 1
    if ($(this).text().replace(/\s/ig, '') == '上一页') {
        if (prePage > 0) {
            surver_lip = prePage
            _surveyQuestion(prePage, 10)
        } else {
            $('#surver_hint').text('已经是第一页了');
            return;
        }
    } else if ($(this).text().replace(/\s/ig, '') == '下一页') {
        if (nextPage < surver_pagess + 1) {
            surver_lip = nextPage
            _surveyQuestion(nextPage, 10)
        } else {
            $('#surver_hint').text('已经是最后一页了');
            return;
        }
    } else if ($(this).text().replace(/\s/ig) == '共' + surver_pagess + '页') {
        return;
    } else {
        surver_lip = nowPage
        _surveyQuestion(nowPage, 10)
    }
})

// 查看详情
$('#survey_tbody').on('click', '.search', function () {
    let listInfo = JSON.parse($(this).parent().attr('data-msg'));
    localStorage.setItem('directoryRemarkId', listInfo.id);
    if (listInfo.flag == 0) {
        location.href = './investigateTopic.html';
    } else if (listInfo.flag == 1) {
        location.href = './investigateResult.html';
    }
})

// 删除问卷
let deleteSurver;
$('#survey_tbody').on('click', '.trash', function () {
    let listInfo = JSON.parse($(this).parent().attr('data-msg'));
    localStorage.setItem('directoryRemarkId', listInfo.id);
    deleteSurver = listInfo;

    $('#deleteServer').modal('show');
    $('#title_modelServer').text(listInfo.name);
})

$('#delect_modelServer').click(function () {
    app.DataRequest(URL + 'dwsurvey/deleteDirectoryRemark', {
        directoryRemarkId: deleteSurver.id
    }, function (err) {}, function (data) {
        if (data.status == 1) {
            _surveyQuestion(1, 10);
        } else {
            console.log('删除失败！')
        }
    })
})



// -------------------------------------------------人力资源管理评测---------------------------

$('#HRManage').click(function () {
    // 我的诊断列表   智能制造成熟度模型
    $('#synthesizeCon').hide() //隐藏企业综合诊断报告

    // 历史诊断列表
    // $('#modal_name_list').hide() //隐藏历史诊断左侧目录
    $('#mineList').hide() //隐藏成熟度诊断列表
    $('#perforList').hide() //隐藏企业绩效评价列表
    $('#dimenList').hide() //隐藏制造21维度评测列表
    $('#internetList').hide() //隐藏工业互联网成熟度模型
    $('#surveyList').hide() //隐藏企业调研问卷分析报告
    $('#HRManageList').show() //显示人力资源管理评测报告


    //我的统计
    // $('#modal_name').hide() //隐藏我的统计左侧目录
    $('#relativelyResult').hide() //我的统计 右侧内容隐藏

    // 左侧列表样式调整
    $('#synthesize').removeClass('modalNameActive') //企业综合诊断报告左侧目录加选中样式
    $(this).addClass('modalNameActive').siblings().removeClass('modalNameActive')
    $('#sub_name').find('p').removeClass('modalNameActive'); //智能制造成熟度分项集成报告移除选中样式
    // $('#modal_name_list').find('p').removeClass('modalNameActive');//历史诊断列表移除选中样式
    $('#modal_name').find('p').removeClass('modalNameActive'); //我的统计移除选中样式

    _HRManageQuestion(1, 10)
})

// 渲染人力资源管理评测列表
var HRManage_pagess = 1 //列表共分多少页显示
function _HRManageQuestion(pageIn, pageSizeIn) {
    var HRManage_quest = {
        pageNo: pageIn,
        pageSize: pageSizeIn
    }
    app.DataRequest(URL + 'companyHrmiRoll/getHrmiRollList', HRManage_quest, function (err) {}, function (data) {
        // console.log(data.list);
        if (data.status != 1) {
            $('#HRManage_subent').show()
        } else if (data.list.length == 0) {
            $('#HRManage_subent').show()
        } else {
            let list = data.list;
            let listHtml = '';
            for (let i = 0; i < list.length; i++) {
                listHtml += '<tr>'
                listHtml += '<td></td>'
                listHtml += '<td>' + (i + 1) + '</td>'
                listHtml += '<td>' + list[i].evaluatingCompanyName + '</td>'
                listHtml += '<td>' + formatDate(list[i].evaluatingTime) + '</td>'
                listHtml += '<td>' + (list[i].evaluatingType == 0 ? '企业' : '专家') + '评测</td>'
                listHtml += '<td>' + list[i].evaluatingPeople + '</td>'
                listHtml += '<td>' + list[i].job + '</td>'
                listHtml += '<td>' + (list[i].flag == 1 ? '完成' : '未完成') + '</td>'
                listHtml += '<td data-msg=' + JSON.stringify({
                    id: list[i].id,
                    flag: list[i].flag,
                    name: list[i].evaluatingCompanyName
                }) + '><span title="查看详情" class="search"><img src="./img/01.png" alt=""></span><span class="trash" title="删除问卷"><img src="./img/03.png" alt=""></span></td>'
                listHtml += '</tr>'
            }
            HRManage_pagess = data.pages;
            let HRManagePageText = '<li><a href="#">上一页</a></li>';
            for (let i = 0; i < data.pages; i++) {
                HRManagePageText += '<li><a href="#">' + (i + 1) + '</a></li>';
            }
            HRManagePageText += '<li><a href="#">下一页</a></li>';
            HRManagePageText += '<li><a>共' + data.pages + '页</a></li>';
            $('#HRManage_tbody').html(listHtml);
            $('#HRManage_pages').html(HRManagePageText);
        }
    })
}

// 切页
var HRManage_lip = 1;
$('#HRManage_pages').on('click', 'li', function () {
    $('#HRManage_hint').text('')
    var nowPage = parseInt($(this).text().replace(/\s/ig, ''));
    var prePage = HRManage_lip - 1
    var nextPage = HRManage_lip + 1
    if ($(this).text().replace(/\s/ig, '') == '上一页') {
        if (prePage > 0) {
            HRManage_lip = prePage
            _HRManageQuestion(prePage, 10)
        } else {
            $('#HRManage_hint').text('已经是第一页了');
            return;
        }
    } else if ($(this).text().replace(/\s/ig, '') == '下一页') {
        if (nextPage < HRManage_pagess + 1) {
            HRManage_lip = nextPage
            _HRManageQuestion(nextPage, 10)
        } else {
            $('#HRManage_hint').text('已经是最后一页了');
            return;
        }
    } else if ($(this).text().replace(/\s/ig) == '共' + HRManage_pagess + '页') {
        return;
    } else {
        HRManage_lip = nowPage
        _HRManageQuestion(nowPage, 10)
    }
})

// 查看详情
$('#HRManage_tbody').on('click', '.search', function () {
    let listInfo = JSON.parse($(this).parent().attr('data-msg'));
    localStorage.setItem('createHRID', listInfo.id);
    if (listInfo.flag == 0) {
        location.href = './HRTopic.html';
    } else if (listInfo.flag == 1) {
        location.href = '../HRResult.html';
    }
})

// // 删除问卷
let deleteHRManage;
$('#HRManage_tbody').on('click', '.trash', function () {
    let listInfo = JSON.parse($(this).parent().attr('data-msg'));
    localStorage.setItem('internerCompanyId', listInfo.id);
    deleteHRManage = listInfo;

    $('#deleteHRManage').modal('show');
    $('#title_modelHRManage').text(listInfo.name);
})

$('#delect_modelHRManage').click(function () {
    app.DataRequest(URL + 'companyHrmiRoll/deleteHrmiRoll', {
        id: deleteHRManage.id
    }, function (err) {}, function (data) {
        if (data.status == 1) {
            _HRManageQuestion(1, 10);
        } else {
            console.log('删除失败！')
        }
    })
})