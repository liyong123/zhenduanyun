$(".headUser").click(function () {
    $(".signOut").show();
});

$("main").click(function () {
    $(".signOut").hide();
});
$('#hintss').hide()
var question_list_length = 0

var area = new Array()
var areas = new Array()
var questionRollCompanyId = localStorage.getItem("questionRollCompanyId");

function question_data() {
    var quest = {
        questionRollCompanyId: questionRollCompanyId
    }

    app.DataRequest(URL + 'questionRoll/getQuestion', quest, function (err) {}, function (data) {
        if (data[0].QuestionRollCompany.status == 99) {
            location.href = './list.html'
        }
        var wholess = ''
        if (data[0].QuestionRollCompany.whole == 0) {
            wholess = '分项'
        } else if (data[0].QuestionRollCompany.whole == 1) {
            wholess = '整体'
        }

        var quest_list = data[0].list
        var topic_text = ''
        question_list_length = quest_list.length

        for (var i = 0; i < quest_list.length; i++) {

            // 判断是否添加模态框
            var modal_pre = ''
            var modal_next = ''
            var next_cc = ''

            // 是否回答到第一道题
            if (i == 0) {
                modal_pre = 'data-toggle="modal" data-target="#pre_question_modal"'
            }

            // 是否回答到最后一道题
            if (i == quest_list.length - 1) {
                next_cc = 'next_cc'
            }

            var ans = 0
            if (quest_list[i].answers.choose) {
                ans = 1
            }

            // 进度条
            var wid = ((i + 1) / quest_list.length) * 100

            // 选项
            var choose = ''
            var truess = ''
            for (var j = 0; j < quest_list[i].questionChooseList.length; j++) {
                var selected_choose = ''
                if (quest_list[i].answers.choose && quest_list[i].answers.choose == quest_list[i].questionChooseList[j].id) {
                    selected_choose = 'class="topic_options_option"'
                }
                choose = choose + '<div ' + selected_choose + '  data-answerId="' + quest_list[i].answers.id + '" data-choose="' + quest_list[i].questionChooseList[j].id + '">' + quest_list[i].questionChooseList[j].text + '</div>'
            }

            // 显示所有题目
            topic_text += '<div class="topic" data-awans="' + ans + '" id="' + (i + 1) + '" data-id="' + quest_list[i].id + '">'
            topic_text += '<p class="topictype">' + data[0].QuestionRollCompany.name + ' &gt;' + wholess + ' &gt;' + quest_list[i].area.split('-')[2] + ' &gt;' + quest_list[i].area.split('-')[3] + '</p>'
            topic_text += '<div class="schedule">'
            topic_text += '<div style="width:' + wid + '%;"></div></div>'
            topic_text += '<div class="question_number">'
            topic_text += '<span>' + (i + 1) + '</span>/<span>' + (quest_list.length) + '</span>'
            topic_text += '</div>'
            topic_text += '<div class="topic_content">'
            topic_text += '<h4 class="topic_title"> ' + quest_list[i].context + '</h4>'
            topic_text += '<div class="topic_options" data-order="' + (i + 1) + '" data-id="' + (i + 1) + '" data-whole="' + data[0].QuestionRollCompany.whole + '" data-status="' + data[0].QuestionRollCompany.status + '">' + choose + '</div></div>'
            topic_text += '<div class="next_question ' + next_cc + '" data-id="' + (i + 1) + '" data-whole="' + data[0].QuestionRollCompany.whole + '" data-status="' + data[0].QuestionRollCompany.status + '" ' + modal_next + '><div>NEXT</div></div>'
            topic_text += '<div class="pre_question" ' + modal_pre + ' data-id="' + (i + 1) + '">'
            topic_text += '<div><i class="glyphicon glyphicon-menu-left"></i></div>'
            topic_text += '</div></div>'
            topic_text += ''
        }

        $('#topics').html(topic_text)

        var top = 0
        $('#topics').find('.topic').each(function (i) {
            if ($(this).attr('data-awans') == 0) {
                top++
                if (top == 1) {
                    $(this).show()
                } else {
                    $(this).hide()
                }
            }

            if ($(this).attr('data-awans') == 1) {
                $(this).hide();
            }
        })
    })
}

$(function () {
    $('#hintss').hide()
    question_data()
});

// 选择题目答案
var quest_chooisede = " "
$('#topics').on('click', '.topic_options>div', function () {

    $('#hintss').hide()
    $(this).addClass('topic_options_option').siblings().removeClass('topic_options_option')
    quest_chooisede = {
        answerId: $(this).attr('data-answerId'),
        choose: $(this).attr('data-choose')
    }

})

// 鼠标移动到选项上
$('#topics').on('mouseover', '.topic_options>div', function () {
    $(this).addClass('topic_options_hover')
})

// 鼠标离开选项
$('#topics').on('mouseleave', '.topic_options>div', function () {
    $(this).removeClass('topic_options_hover')
})

// 下一题
$('main').on('click', '.next_question', function () {
    var topic = $(this).attr('data-id')
    var whole = $(this).attr('data-whole')
    var classif = $(this).attr('class')
    var length = $('#' + topic).find('.topic_options>.topic_options_option').length
    var status = $(this).attr('data-status')

    // 本题是否做答
    if (quest_chooisede != " ") {
        if (length == 1) {
            app.DataRequest(URL + 'questionRoll/updateAnswer', quest_chooisede, function (err) {}, function (data) {
                if (data[0].status == 1) {}
            })
            $('#hintss').hide()
            topic++
            $('#' + topic).show().siblings().hide()
        } else {
            $('#hintss').show()
            return;
        }
    }

    if (status == 4 && classif == 'next_question next_cc') {
        var questss = {
            questionRollCompanyId: questionRollCompanyId,
            status: 99
        }
        app.DataRequest(URL + 'questionRoll/updateQuestionCompany', questss, function (err) {}, function (data) {
            localStorage.setItem('optinosss', '0')
            location.href = './entirety.html'
        })
    }

    var status = $(this).attr('data-status')
    if (status && whole == 1) {
        var level = ''
        if (status == 0) {
            level = '501'
        } else if (status == 1) {
            level = '502'
        } else if (status == 2) {
            level = '503'
        } else if (status == 3) {
            level = '504'
        } else if (status == 4) {
            level = '505'
        } else if (status == 99) {
            //    问卷答完
        }

        if (classif == 'next_question next_cc') {
            var quest = {
                level: level,
                questionRollCompanyId: questionRollCompanyId
            }
            app.DataRequest(URL + 'answer/getPopUp', quest, function (err) {}, function (data) {
                if (data[0].status == 0) {
                    // 不达标  显示结果

                    $('#jiebie1').text(data[0].msg)
                    $('#standard_no').show()
                    $('#standard').hide()
                    $('#next_continue').hide()

                    var questss = {
                        questionRollCompanyId: questionRollCompanyId,
                        status: 99
                    }
                    app.DataRequest(URL + 'questionRoll/updateQuestionCompany', questss, function (err) {}, function (data) {
                        localStorage.setItem('optinosss', '0')
                        location.href = './entirety.html'
                    })
                }
                if (data[0].status == 1) {

                    status = ''
                    $('#jiebie1').text(data[0].msg)
                    // 达标  继续  取消
                    $('#standard_no').hide()
                    $('#standard').show()
                    $('#standard').text(data[0].msg)
                    $('#next_question_modal').modal('show')
                }

                var questss = {
                    questionRollCompanyId: questionRollCompanyId,
                    status: status
                }

                app.DataRequest(URL + 'questionRoll/updateQuestionCompany', questss, function (err) {}, function (data) {

                })
            })
        }
    }
    // 分项
    if (whole == 0 && classif == 'next_question next_cc') {
        var questss = {
            questionRollCompanyId: questionRollCompanyId,
            status: 99
        }
        app.DataRequest(URL + 'questionRoll/updateQuestionCompany', questss, function (err) {}, function (data) {
            localStorage.setItem('optinosss', '0')
            location.href = './subitem.html'
        })
    }
})

// 跳转到结果页
$('#next_cancel').click(function () {
    var questss = {
        questionRollCompanyId: questionRollCompanyId,
        status: 99
    }
    app.DataRequest(URL + 'questionRoll/updateQuestionCompany', questss, function (err) {}, function (data) {
        localStorage.setItem('optinosss', '0')
        location.href = './entirety.html'
    })
})

// 继续答题
$('#next_continue').click(function () {
    $('#topics').html('<p style="width: 100%;text-align: center;color: gray;">页面正在加载，请稍后</p>')
    question_data()
})

// 上一题
$('main').on('click', '.pre_question', function () {
    var topic = $(this).attr('data-id')
    // topic--
    topic--
    $('#hintss').hide()

    $('#' + topic).show().siblings().hide()
})

$('#pre_cancel').click(function () {
    app.DataRequest(URL + 'questionRoll/deleteQuestionCompany', {
        questionRollCompanyId: questionRollCompanyId
    }, function (err) {}, function (data) {
        location.href = './optionsLL.html'
    })
})