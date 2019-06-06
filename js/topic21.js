var num = 0; //当前显示第几道题
var numSize; //一共多少道题目
var questionNumber = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一']

$(function () {
    question_topic()
})

// 显示页面题目  分题显示
function question_topic() {
    var topicHTML = ''
    let quest = {
        id: localStorage.getItem('companyEvaluatingRollID')
    }
    app.DataRequest(URL + 'companyEvaluatingRoll/editorEvaluting', quest, function (err) {}, function (data) {
        if (data[0].status != 2 && data[0].status != 1) {
            $('#topic_conent').html('<h3 style="width: 100%;line-height: 100px;text-align: center;">暂无数据</h3>')
            return
        }
        if (data[0].status == 2) {
            location.href = './demensions21.html'
            return
        }
        if (data[0].status == 1) {

            var topicList = data[0].companyEvaluatingRoll.detailLists
            numSize = topicList.length

            for (let i = 0; i < topicList.length; i++) {
                let actuality = ''; //现状
                let expect = ''; //目标
                let remark = ''; //评测说明
                if (topicList[i].actuality != undefined) {
                    num = num + 1;
                    actuality = topicList[i].actuality;
                    expect = topicList[i].expect
                }

                if (topicList[i].remark != undefined) {
                    remark = topicList[i].remark
                }

                let questionChooseListText = ''; //问题的选项
                let situationText = ''; //问题现状
                let targetText = ''; //问题目标
                for (let j = 0; j < topicList[i].questionChooseList.length; j++) {
                    let pitchUpSit = ''
                    let pitchUpTar = ''
                    if (actuality == topicList[i].questionChooseList[j].id) {
                        pitchUpSit = 'class="sitTar_pitch_Up"'
                    }
                    if (expect == topicList[i].questionChooseList[j].id) {
                        pitchUpTar = 'class="sitTar_pitch_Up"'
                    }
                    questionChooseListText += '<p>' + j + '阶段：' + topicList[i].questionChooseList[j].text + '</p>'
                    situationText += '<span ' + pitchUpSit + ' data-questID="' + topicList[i].id + '"  data-score="' + topicList[i].questionChooseList[j].score + '" data-id="' + topicList[i].questionChooseList[j].id + '">' + j + '阶段</span>'
                    targetText += '<span ' + pitchUpTar + ' data-score="' + topicList[i].questionChooseList[j].score + '" data-id="' + topicList[i].questionChooseList[j].id + '">' + j + '阶段</span>'
                }

                topicHTML += '<div class="topic_title" data-id="">';
                topicHTML += '<h3>' + questionNumber[i] + '、' + topicList[i].context + '</h3>';
                topicHTML += '<div class="topic_options">' + questionChooseListText + '</div>';

                topicHTML += '<div class="situation_target">';

                topicHTML += '<div class="topic_situation" id="situation' + i + '">';
                topicHTML += '<span>现状：</span>';
                topicHTML += situationText

                topicHTML += '</div>';

                topicHTML += '<div class="topic_situation" id="target' + i + '">';
                topicHTML += '<span>目标：</span>';
                topicHTML += targetText

                topicHTML += '</div>';

                topicHTML += '</div>';

                topicHTML += '<div class="review_instructions">';
                topicHTML += '<span>评测说明:</span>';
                topicHTML += '<textarea id="textareasyn' + i + '"  name="textarea' + i + '" type="text" rows="3" cols="105" maxlength="150" onkeydown="countChar(' + "textareasyn" + i + ',' + "fontLength" + i + ');" onkeyup="countChar(' + "textareasyn" + i + ',' + "fontLength" + i + ');" style="resize:none;line-height: 30px;padding: 10px;">' + remark + ' </textarea>';
                topicHTML += '<div class="fontLength"><span id="fontLength' + i + '">0</span><span>/150</span></div>';
                topicHTML += '</div>';
                topicHTML += '</div>';
            }

            topicHTML += '<div class="topic_title comprehensive_assessment">';
            topicHTML += '<p>综合评价:</p>';
            topicHTML += '<textarea type="text" id="textareasyns" name="textareasyn" rows="18" cols="117" maxlength="1000" onkeydown=\'countChar("textareasyns","fontLengths");\' onkeyup=\'countChar("textareasyns","fontLengths");\' style="resize:none;line-height: 30px;padding: 10px;"></textarea>';
            topicHTML += '<div class="fontLength"><span id="fontLengths">0</span><span>/1000</span></div>';
            topicHTML += '</div>';

            $('#topic_titles').html(topicHTML);

            topic_number(num, numSize);
        }

    })
}

// 显示当前是第几道题
function topic_number(nums, numSize) {
    if (nums < numSize) {
        $('.progressBar>div').css('width', (nums + 1) / numSize * 100 + '%');
    }
    if (num == numSize) {
        $('.progressBar>div').css('width', '1200px');
        $('#next_topic').text('保存');
        $('#question_number').hide();
    }
    $('#hint').text('')
    $('#numbers').text(nums + 1);
    $('#num_size').text(numSize);
    $('#topic_titles').find('.topic_title').eq(nums).show().siblings().hide();
}

// 上一题
$('#pre_topic').click(function () {
    if (num < 1) {
        $('#pre_question_modal').modal('show');
        return;
    }
    num = num - 1;
    $('#next_topic').text('下一题');
    $('#question_number').show();
    topic_number(num, numSize);
})

// 下一题
$('#next_topic').click(function () {
    $('#hint').text('')

    if ($(this).data('loading')) return;

    if (num > numSize - 1) {
        let textareaValueSyn = $('textarea[name=textareasyn]').val()
        if (textareaValueSyn == "") {
            $('#hint').text('请填写综合评价')
        } else {
            let quest = {
                id: localStorage.getItem('companyEvaluatingRollID'),
                synthesizeRemark: textareaValueSyn,
                flag: 1
            }
            if (quest.synthesizeRemark.replace(/\s+/g, "") == "") {
                $('#hint').text('综合评价不能为空')
                return
            } else {
                $(this).data('loading', true);
                var that = this;
                app.DataRequest(URL + 'companyEvaluatingRoll/evaluatingSubmit', quest, function (err) {}, function (data) {
                     $(that).data('loading', false);

                    if (data[0].status == 1) {
                        location.href = './demensions21.html'
                    }
                })
            }
        }
        return;
    }

    let situationPitch = $('.topic_title').find('#situation' + num).find('.sitTar_pitch_Up').length;
    let targetPitch = $('.topic_title').find('#target' + num).find('.sitTar_pitch_Up').length;

    let sitScore = $('.topic_title').find('#situation' + num).find('.sitTar_pitch_Up').attr('data-score');
    let tarScore = $('.topic_title').find('#target' + num).find('.sitTar_pitch_Up').attr('data-score');
    let textareaValue = $('textarea[name=textarea' + num + ']').val();

    let questID = $('.topic_title').find('#situation' + num).find('.sitTar_pitch_Up').attr('data-questID');

    let quest = {
        id: questID,
        actuality: $('.topic_title').find('#situation' + num).find('.sitTar_pitch_Up').attr('data-id'),
        expect: $('.topic_title').find('#target' + num).find('.sitTar_pitch_Up').attr('data-id'),
        remark: textareaValue
    }
    if (situationPitch != 1) {
        $('#hint').text('请选择企业当下所处阶段')
    } else if (targetPitch != 1) {
        $('#hint').text('请选择企业期望达到的目标阶段')
    } else if (situationPitch == 1 && targetPitch == 1) {
        if (sitScore > tarScore) {
            $('#hint').text('企业目标阶段应该高于现状所处阶段')
        } else {
            $(this).text('loading...').data('loading', true);
            var that = this;
            app.DataRequest(URL + 'companyEvaluatingRoll/saveQuestion', quest, function (err) {
                $(that).text('下一题').data('loading', false);
            }, function (data) {
                $(that).text('下一题').data('loading', false);
                if (data[0].status == 1) {
                    num = num + 1;
                    topic_number(num, numSize);
                }
            })
        }
    }
})

$('#topic_titles').on('click', '.topic_situation>span', function () {
    $(this).addClass('sitTar_pitch_Up').siblings().removeClass('sitTar_pitch_Up')
})

$('#pre_cancel').click(function () {
    let quest = {
        id: localStorage.getItem('companyEvaluatingRollID')
    }
    app.DataRequest(URL + 'companyEvaluatingRoll/deleteEvaluting', quest, function (err) {}, function (data) {
        if (data[0].status == 1) {
            location.href = './topicBasic21.html'
        } else {
            console.log('删除失败！')
        }
    })
})

function countChar(textareaName, spanName) {
    document.getElementById(spanName).innerHTML = document.getElementById(textareaName).value.length;
}