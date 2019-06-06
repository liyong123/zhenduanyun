let page = 0; //当前题目序号
let pages; //题目的总数
let presentDIV; //当前显示题目的标签
let presentDIVMsg; //当前题目的信息
let optionMsgDiv; //当前选中选项的信息


// 页面加载时触发
$(function () {
    topicList();
})

// 渲染题目
function topicList() {
    $('#hint').text('');
    let topicHTML = '';

    let questOptions = {
        companyInternetRollId: localStorage.getItem('internerCompanyId')
    }
    app.DataRequest(URL + 'companyInternetRoll/internetEvaluatingLook', questOptions, function (err) {}, function (msg) {
        if (msg[0].status != 1) {
            $('#topic_conent').html('<h3 style="width: 100%;line-height: 100px;text-align: center;">暂无数据</h3>')
            return
        }

        if (msg[0].status == 1) {
            // 评测类型  离散 流程  综合  单项
            $('#topic_classify').find('span').eq(0).text(msg[0].companyInternetRoll.manufactureType == 1 ? '离散型' : '流程型');
            $('#topic_classify').find('span').eq(1).text(msg[0].companyInternetRoll.entirety == 1 ? '综合评测' : '单项评测');

            // 题目列表
            let listTopic = msg[0].companyInternetRoll.companyInternetDetails;

            pages = listTopic.length;
            for (let i = 0; i < listTopic.length; i++) {
                let activeOption;
                let activeRadio;

                if (listTopic[i].chooseId != undefined) page++;

                // 题目选项
                let topicOptionHTML = '';

                for (let j = 0; j < listTopic[i].questionChooseList.length; j++) {
                    let optionActive = '';
                    let radioOption = '';
                    if (listTopic[i].chooseId && listTopic[i].chooseId == listTopic[i].questionChooseList[j].id) {
                        optionActive = 'class="option_active"';
                        radioOption = 'radio_active';
                    }
                    topicOptionHTML += '<div data-optionMsg=' + JSON.stringify({
                        id: listTopic[i].questionChooseList[j].id
                    }) + ' ' + optionActive + ' >';
                    topicOptionHTML += '<span class="radio_option"><i class="' + radioOption + '"></i></span>';
                    topicOptionHTML += '<p>' + listTopic[i].questionChooseList[j].text + '</p>';
                    topicOptionHTML += '</div>';
                }


                topicHTML += '<div data-msg=' + JSON.stringify({
                    id: listTopic[i].id,
                    capacity:listTopic[i].capacity,
                    element:listTopic[i].element
                }) + ' class="topic_info">';
                topicHTML += '<!--题目-->';
                topicHTML += '<p class="topic_title">' + (i + 1) + '、' + listTopic[i].questionContent + '</p>';
                topicHTML += '<!--选项-->';
                topicHTML += '<div class="topic_option">';
                topicHTML += topicOptionHTML;
                topicHTML += '</div>';
                topicHTML += '</div>';
            }

            $('#topic_infos').html(topicHTML);
            pageNumber(page, pages);
        }
    })

}

// 显示当前题目
function pageNumber(page, pages) {
    if (page > pages - 1) {
        location.href = './internetResult.html';
        return;
    }

    $('#hint').text('');
    // 显示当前题目

    presentDIV = $('#topic_infos').find('.topic_info').eq(page);
    presentDIVMsg = JSON.parse(presentDIV.attr('data-msg'));

    let elementText = '';
    if (presentDIVMsg.element == 1) {
        elementText = '数据分析利用';
    } else if (presentDIVMsg.element == 2) {
        elementText = '综合集成';
    } else if (presentDIVMsg.element == 3) {
        elementText = '互联互通';
    }
    $('#element').text(elementText);
    $('#capacity').text(presentDIVMsg.capacity);
    $('#topic_infos').find('.topic_info').eq(page).show().siblings().hide();

    if (presentDIV.find('.option_active').length == 1) {
        optionMsgDiv = JSON.parse(presentDIV.find('.option_active').attr('data-optionMsg'));
    }

    // 显示当前题目序号
    $('#topic_number').find('span').eq(0).text(page + 1);
    $('#topic_number').find('span').eq(1).text(pages);

    // 答题进度条显示
    $('#progress_bar').css('width', (page + 1) / pages * 100 + '%');

}

// 下一题
$('#next_topic').click(function () {
    $('#hint').text('');

    if ($(this).data('loading')) return;

    if (presentDIV.find('.option_active').length == 1) {
        optionMsgDiv = JSON.parse(presentDIV.find('.option_active').attr('data-optionMsg'));
    }

    if (optionMsgDiv && optionMsgDiv != '') {
        let question_look = {
            detailId: presentDIVMsg.id,
            chooseId: optionMsgDiv.id
        }
        $(this).data('loading', true);
        var that = this;
        app.DataRequest(URL + 'companyInternetRoll/saveAnswer', question_look, function (err) {}, function (msg) {
            $(that).data('loading', false);
            if (msg[0].status == 1) {
                page++;
                pageNumber(page, pages);
                optionMsgDiv = ''
            }
        })

    } else {
        $('#hint').text('您尚未答题，请答完本题再进入下一页！');
        optionMsgDiv = ''
        return;
    }
})

//上一题 
$('#pre_topic').click(function () {
    $('#hint').text('');
    if (page < 1) {
        $('#pre_question_modal').modal('show');
        return;
    }
    page--;
    pageNumber(page, pages);
})

// 选择题目答案
$('#topic_infos').on('click', '.topic_option>div', function () {
    $('#hint').text('');
    $(this).addClass('option_active').siblings().removeClass('option_active');
    $(this).find('i').addClass('radio_active').parent().parent().siblings().find('i').removeClass('radio_active');
    optionMsgDiv = JSON.parse($(this).attr('data-optionMsg'));
})

// 删除此问卷
$('#pre_cancel').click(function () {
    let quest = {
        companyInternetRollId: localStorage.getItem('internerCompanyId')
    }
    app.DataRequest(URL + 'companyInternetRoll/internetEvaluatingDelete', quest, function (err) {}, function (data) {
        if (data[0].status == 1) {
            location.href = './internetTopicBasic.html'
        } else {
            console.log('删除失败！')
        }
    })
})