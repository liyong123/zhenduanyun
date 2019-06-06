var pages = 1 // 当前页码
var numberDIV //题目的总页数
var currentPage = -1;
var data; //请求到的数据
var pageNames = []; //当前页的题目分类
var nextts = false;

// 请求分项题目数据
function questTopic() {
    var quest = {
        questionRollCompanyId: localStorage.getItem("questionRollCompanyId")
    }
    app.DataRequest(URL + 'questionRoll/getQuestion', quest, function (err) {}, function (p) {
        data = p;
        $('#questName').text(data[0].QuestionRollCompany.name);
        var list = data[0].list
        var area = ""; //当前问题的域
        var divNum = 0; //类的id
        var topicText = '';
        for (var i = 0; i < list.length; i++) {
            if (i == 0) {
                area = list[0].area;
                pageNames.push(area);
                topicText += '<div id="' + divNum + '" style="display: none;">';
            }
            if (area != list[i].area) {
                topicText += '</div>';
                area = list[i].area;
                pageNames.push(area);
                divNum += 1;
                topicText += '<div id="' + divNum + '" style="display: none;">';
            }

            // 选项
            var choose = ''
            var truess = ''
            for (var j = 0; j < list[i].questionChooseList.length; j++) {
                var selected_choose = ["one", "two", "three", "four"]
                var selected = ''
                if (list[i].answers.choose && list[i].answers.choose == list[i].questionChooseList[j].id) {
                    selected = 'topic_options_option'
                }
                choose = choose + '<span class="' + selected_choose[j] + ' ' + selected + '"  data-answerId="' + list[i].answers.id + '" data-choose="' + list[i].questionChooseList[j].id + '">' + list[i].questionChooseList[j].text + '</span>'
            }
            topicText += '<div class="topic ' + divNum + '">'
            topicText += '<p>' + list[i].level.split('0')[1] + '级：' + list[i].context + '</p>'
            topicText += '<div class="choose">' + choose + '</div>'
            topicText += '</div>'

            if (i == list.length - 1) {
                topicText += '</div>';
            }
        }

        numberDIV = divNum
        // console.log(numberDIV)
        $('#numberPage').text(numberDIV + 1)
        $('#topics').html(topicText)
        setPage(0);
    })
}

// 保存题目答案
$('#topics').on('click', '.choose>span', function () {
    $('#hintss').hide()
    $(this).addClass('topic_options_option').siblings().removeClass('topic_options_option')
    var quest = {
        answerId: $(this).attr('data-answerId'),
        choose: $(this).attr('data-choose')
    }
    app.DataRequest(URL + 'questionRoll/updateAnswer', quest, function (err) {}, function (data) {})
})


// 判断当前页的题目是否答完
function length(nextID) {
    nextts = true
    $('#' + nextID).find('.topic').each(function (i) {
        var length = $(this).find('.topic_options_option').length
        if (length == 0) {
            nextts = false
        }
    })
    return nextts
}

// 当页码发生变化时，页面中内容的变化
function setPage(page) {
    if (page == -1) {
        $('#pre_question_modal').modal('show')
        return;
    }

    if (page == (numberDIV +1)) {
        var questss = {
            questionRollCompanyId: localStorage.getItem("questionRollCompanyId"),
            status: 99
        }
        app.DataRequest(URL + 'questionRoll/updateQuestionCompany', questss, function (err) {}, function (data) {
            localStorage.setItem('optinosss', '0')
            location.href = './subitem.html'
        })
        return;
    }

    if (currentPage == page) return;
    currentPage = page;
    $('#' + currentPage).show().siblings().hide();

    $('#pressPage').text(currentPage + 1);
    var ll = ((currentPage + 1) / numberDIV) * 100
    $('#schs').css('width', ll + '%');

    $('#pageName').html(pageNames[currentPage].split('-')[2] + '&gt;' + pageNames[currentPage].split('-')[3]);
}


// 下一页分项的题目
$('#next_question').click(function () {
    var numdf = length(currentPage)
    if (numdf) {
        setPage(currentPage + 1);
    } else {
        $('#hintss').show()
    }
    return;
})

// 上一页分项的题目
$('#pre_question').click(function () {
    setPage(currentPage - 1);
})

// 从模态框返回上一页时，删除当前问卷
$('#pre_cancel').click(function () {
    app.DataRequest(URL + 'questionRoll/deleteQuestionCompany', {
        questionRollCompanyId: localStorage.getItem("questionRollCompanyId")
    }, function (err) {}, function (data) {
        location.href = './optionsLL.html'
    })
})

// 页面加载时的触发函数
$(function () {
    $('#hintss').hide()
    questTopic()
});