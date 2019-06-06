//  
let topicSerial = 1; //题目序号
let topicNumber = 0; //题目分序号
let topicNumberLength = 0; //题目分类总数
let topicType = new Array(); //题目分类
let topicAnswer = []; //答案字符串
let topicTypeDOM; //当前题目分类的dom标签


$(function () {
    _questTopics();
})

// 请求题目数据
function _questTopics() {
    let topicsTypeHTML = '';
    app.DataRequest(URL + 'companyHrmiRoll/lookHrmiRoll', {
        id: localStorage.getItem('createHRID')
    }, function (err) {}, function (data) {

        let listType = data.companyHrmiRoll.companyHrmiNormList;
        topicNumberLength = listType.length;
        console.log(listType);
        for (let i = 0; i < listType.length; i++) {
            if (listType[i].actuality != null) {
                topicNumber++;
                // for (let k = 0; k < listType[i].companyHrmiDetails; k++) {
                //     topicAnswer.push({
                //         id: listType[i].companyHrmiDetails[k].id,
                //         score: listType[i].companyHrmiDetails[k].actuality,
                //         targetScore: listType[i].companyHrmiDetails[k].expect
                //     })
                // }
            }
            topicType.push(listType[i].quotaName);
            let topicHtml = '';
            let listTopic = listType[i].companyHrmiDetails;
            for (let j = 0; j < listTopic.length; j++) {
                topicHtml += '<div class="topic" data-id="' + listTopic[j].id + '" data-msg=' + JSON.stringify({
                    id: listType[i].companyHrmiDetails[j].id,
                    score: listType[i].companyHrmiDetails[j].actuality,
                    targetScore: listType[i].companyHrmiDetails[j].expect
                }) + '>';
                topicHtml += '<p>' + topicSerial + '、' + listTopic[j].quotaName + '</p>';
                topicHtml += '<p>' + listTopic[j].questionContext + '</p>';

                let answerClass = 'class="option_active"';

                let actualityCss = listTopic[j].actuality;
                let expectCss = listTopic[j].expect;

                topicHtml += '<!--现状-->';
                topicHtml += '<div class="options_topic">';
                topicHtml += '<span>现状:</span>';
                topicHtml += '<span ' + (actualityCss == '1' ? answerClass : '') + ' data-score="1">1阶段</span>';
                topicHtml += '<span ' + (actualityCss == '2' ? answerClass : '') + ' data-score="2">2阶段</span>';
                topicHtml += '<span ' + (actualityCss == '3' ? answerClass : '') + ' data-score="3">3阶段</span>';
                topicHtml += '<span ' + (actualityCss == '4' ? answerClass : '') + ' data-score="4">4阶段</span>';
                topicHtml += '<span ' + (actualityCss == '5' ? answerClass : '') + ' data-score="5">5阶段</span>';
                topicHtml += '</div>';
                topicHtml += '<!--目标-->';
                topicHtml += '<div class="options_topic_target">';
                topicHtml += '<span>目标:</span>';
                topicHtml += '<span ' + (expectCss == '1' ? answerClass : '') + ' data-targetScore="1">1阶段</span>';
                topicHtml += '<span ' + (expectCss == '2' ? answerClass : '') + ' data-targetScore="2">2阶段</span>';
                topicHtml += '<span ' + (expectCss == '3' ? answerClass : '') + ' data-targetScore="3">3阶段</span>';
                topicHtml += '<span ' + (expectCss == '4' ? answerClass : '') + ' data-targetScore="4">4阶段</span>';
                topicHtml += '<span ' + (expectCss == '5' ? answerClass : '') + ' data-targetScore="5">5阶段</span>';
                topicHtml += '</div >';
                topicHtml += '</div>';

                topicSerial++;
            }

            topicsTypeHTML += '<div class="topic_type_all" data-id="' + listType[i].id + '">' + topicHtml;

            topicsTypeHTML += '<!--模块评测说明-->';
            topicsTypeHTML += '<div class="explain">';
            topicsTypeHTML += '<p>模块评测说明:</p>';
            topicsTypeHTML += '<div class="evaluate_result">';
            topicsTypeHTML += '<textarea id="textareasyn' + i + '" name="textarea " type="text" rows="3" cols="105" maxlength="1000" onkeyup="textareaKeyup(\'#textareasyn' + i + '\' ,\'#fontLength' + i + '\' )" onkeydown="textareaKeyup(\'#textareasyn' + i + '\' ,\'#fontLength' + i + '\' )" style="resize:none;line-height: 30px;padding: 10px;">' + (listType[i].remark != null ? listType[i].remark : '') + '</textarea>';
            topicsTypeHTML += '<div class="fontLength textarea_span"><span id="fontLength' + i + '">' + (listType[i].remark != null ? listType[i].remark.length : 0) + '</span><span>/1000</span></div>';
            topicsTypeHTML += '</div>';
            topicsTypeHTML += '</div>';
            topicsTypeHTML += '</div>';
        }

        topicsTypeHTML += '<div class="topic_type_all">';
        topicsTypeHTML += '<p class="evaluate_resultss_p">综合评价:</p>';
        topicsTypeHTML += '<div class="evaluate_resultss">';
        topicsTypeHTML += '<textarea type="text" id="textareasyns" name="textareasyn" rows="18" cols="117" maxlength="1000" onkeydown=\'textareaKeyup("#textareasyns","#fontLengths");\' onkeyup=\'textareaKeyup("#textareasyns","#fontLengths");\' style="resize:none;line-height: 30px;padding: 10px;"></textarea>';
        topicsTypeHTML += '<div class="fontLength textarea_span"><span id="fontLengths">0</span><span>/1000</span></div>';
        topicsTypeHTML += '</div>';
        topicsTypeHTML += '</div>';

        $('#topics').html(topicsTypeHTML);
        _pageNumber(topicNumber);
    })
}

// 输入框值计数
function textareaKeyup(textareaText, textareaNumber) {
    $('#hint').text('');
    let length = $(textareaText).val().length;
    $(textareaNumber).text(length);
}

// 显示当前页面的题目内容
function _pageNumber(number) {
    $('#topics').find('.topic_type_all').eq(number).show().siblings().hide();
    topicTypeDOM = $('#topics').find('.topic_type_all').eq(number);

    $('#progress_bar').css('width', ((number / topicNumberLength) * 100 + '%'));
    $('#topic_type').text(topicType[number]);

    // 回到页面顶端
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

// 选择当前题目的现状阶段
$('#topics').on('click', '.options_topic>span', function () {
    $(this).addClass('option_active').siblings().removeClass('option_active');
    let topicID = $(this).parent().parent().attr('data-id');
    let score = $(this).attr('data-score') ? $(this).attr('data-score') : 'null';
    let targetScore = $(this).attr('data-targetScore') ? $(this).attr('data-targetScore') : 'null';

    _answerArray(topicID, score, targetScore)

})

// 选择当前题目的目标阶段
$('#topics').on('click', '.options_topic_target>span', function () {
    $(this).addClass('option_active').siblings().removeClass('option_active');

    let topicID = $(this).parent().parent().attr('data-id');
    let score = $(this).attr('data-score') ? $(this).attr('data-score') : 'null';
    let targetScore = $(this).attr('data-targetScore') ? $(this).attr('data-targetScore') : 'null';
    _answerArray(topicID, score, targetScore)

})


// 串联答案数组
function _answerArray(id, score, targetScore) {
    $('#hint').text('');
    if (topicAnswer.length == 0) {
        topicAnswer.push({
            id: id,
            score: score,
            targetScore: targetScore
        })
    } else {
        // 判断当前题目之前是否有过答案
        let idIsNot = false;
        for (let i = 0; i < topicAnswer.length; i++) {
            if (id == topicAnswer[i].id) {
                idIsNot = true;
            }
        }

        // 当前题目之前有过答案
        if (idIsNot) {
            for (let i = 0; i < topicAnswer.length; i++) {
                if (id == topicAnswer[i].id) {
                    topicAnswer[i].score = (score == 'null' ? topicAnswer[i].score : score)
                    topicAnswer[i].targetScore = (targetScore == 'null' ? topicAnswer[i].targetScore : targetScore)
                }
            }
        }

        // 当前题目之前没有过答案
        if (!idIsNot) {
            topicAnswer.push({
                id: id,
                score: score,
                targetScore: targetScore
            })
        }
    }

}

// 上一题
function prePage() {
    if (topicNumber == 0) {
        $('#pre_question_modal').modal('show');
        return;
    } else {
        topicNumber--;
        _pageNumber(topicNumber);
    }
}


// 下一题
function nextPage() {

    if ($(this).data('loading')) return;

    let topicAnswers = [];
    for (let i = 0; i < topicTypeDOM.find('.topic').length; i++) {
        topicAnswers.push(JSON.parse(topicTypeDOM.find('.topic').eq(i).attr('data-msg')));
    }

    if (topicAnswer.length == 0) {
        topicAnswer = topicAnswers;
    }
    $('#hint').text('');
    // 是否提交综合评价
    if (topicTypeDOM.find('.evaluate_resultss').length == 0) {
        // 是否有题目尚未作答
        if (topicTypeDOM.find('.topic').length > topicAnswer.length) {
            $('#hint').text('请答完本页题目再进入下一页！');
            return;
        }

        let answerText = '';

        // 是否有题目缺少现状或目标阶段的选择值
        for (var i in topicAnswer) {
            if (i == 0) {
                answerText += topicAnswer[i].id + '_' + topicAnswer[i].score + '_' + topicAnswer[i].targetScore
            } else {
                answerText += ',' + topicAnswer[i].id + '_' + topicAnswer[i].score + '_' + topicAnswer[i].targetScore
            }
        }

        if (answerText.indexOf('null') != -1) {
            $('#hint').text('请答完本页题目再进入下一页！');
            return;
        }

        // 判断所有题目的目标阶段是否都大于或等于现状阶段

        for (let i = 0; i < topicAnswer.length; i++) {
            if (topicAnswer[i].score > topicAnswer[i].targetScore) {
                $('#hint').text('每道题目的目标阶段都不应当小于现状阶段！');
                return;
            } else {
                continue;
            }
        }

        let answerQuest = {
            answers: answerText,
            companyHrmiNormId: topicTypeDOM.attr('data-id'),
            remark: topicTypeDOM.find('textarea').val()
        }
        $(this).data('loading', true);
        var that = this;
        app.DataRequest(URL + 'companyHrmiRoll/saveDetail', answerQuest, function (err) {}, function (data) {
            if (data.status == 1) {
                $(that).data('loading', false);
                topicNumber++;
                topicAnswer = [];
                _pageNumber(topicNumber);
            } else {
                console.log('保存错误');
            }
        })
    }

    if (topicTypeDOM.find('.evaluate_resultss').length == 1) {
        let evaluatingQuest = {
            id: localStorage.getItem('createHRID'),
            remark: topicTypeDOM.find('textarea').val()
        }
        app.DataRequest(URL + 'companyHrmiRoll/submitHrmiRoll', evaluatingQuest, function (err) {}, function (data) {
            if (data.status == 1) {
                location.href = './HRResult.html'
            } else {
                console.log('保存错误');
            }
        })
    }
}

// 是否放弃本次诊断  是  删除本次问卷  跳转回上一页面
$('#pre_cancel').click(function () {
    app.DataRequest(URL + 'companyHrmiRoll/deleteHrmiRoll', {
        id: localStorage.getItem('createHRID')
    }, function (err) {}, function (data) {
        if (data.status == 1) {
            location.href = './HRHome.html';
        } else {
            console.log('删除失败！')
        }
    })
})