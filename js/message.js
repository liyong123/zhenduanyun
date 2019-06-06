// 返回我的诊断列表页
$('#prePage').click(function () {
    // location.href = './mine.html'
   window.history.back(-1);
})

var detailID = localStorage.getItem('detailID')
$(function () {
    $('#hintss').hide()
    listData()
});

function formatDate(nows) {
    var now = new Date(nows)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var timels = year;
    if (month < 10) {
        timels += "-" + '0' + month
    } else {
        timels += "-" + month
    }

    if (date < 10) {
        timels += "-" + '0' + date
    } else {
        timels += "-" + date
    }

    if (hour < 10) {
        timels += " " + '0' + hour
    } else {
        timels += " " + hour
    }

    if (minute < 10) {
        timels += ":" + '0' + minute
    } else {
        timels += ":" + minute
    }

    if (second < 10) {
        timels += ":" + '0' + second
    } else {
        timels += ":" + second
    }

    return timels;
}

function listData() {
    var questss = {
        questionRollCompanyId: detailID
    }
    app.DataRequest(URL + 'questionRoll/showQuestionRollDetials', questss, function (err) {}, function (data) {
        // console.log(data)
        if (data.status) {
            $('#grade').html('<h3 id="hesdee">暂无数据</h3>');
            return
        }
        $('#questtopic').text(data[0].questionRollCompany.name)
        $('#titleClassifyTitle').text(data[0].questionRollCompany.name)
        var whole = ''
        if (data[0].questionRollCompany.whole == 0) {
            whole = '分项'
            var KindLevelData = data[0].KindLevelData
            var levelName = ''
            for (var k = 0; k < KindLevelData.length; k++) {
                if (k == 0) {
                    levelName = KindLevelData[k].kindName.split('-')[2] + ':' + KindLevelData[k].levelName
                } else {
                    levelName += '/' + KindLevelData[k].kindName.split('-')[2] + ':' + KindLevelData[k].levelName
                }
            }
            $('#gradeResult').html(levelName)
        }
        if (data[0].questionRollCompany.whole == 1) {
            whole = '整体'
            $('#gradeResult').text(data[0].levelData.levelName)
        }
        $('#questtype').text(whole)
        $('#questtype_title').text(whole)
        $('#comName').text(data[0].questionRollCompany.companyName)

        var time = formatDate(data[0].questionRollCompany.createTime)
        $('#times').text(time)

        var answerDetails = data[0].answerDetails
        var ansText = ''
        if (answerDetails.length == 0) {
            $('#grade').html('<h3 id="hesdee">暂无数据</h3>');
            return
        }

        for (var i = 0; i < answerDetails.length; i++) {
            ansText += ''
            ansText += '<p class="gradeTitle"><span>' + answerDetails[i].area.split('-')[2] + '</span>&gt; <span>' + answerDetails[i].area.split('-')[3] + '</span></p>'
            for (var j = 0; j < answerDetails[i].answerList.length; j++) {
                var classfiy = 'unrealized'
                if (answerDetails[i].answerList[j].chooseText == '非常好') {
                    classfiy = 'realized'
                } else if (answerDetails[i].answerList[j].chooseText == '没有') {
                    classfiy = 'unrealized'
                } else {
                    classfiy = 'portion '
                }
                ansText += '<div class="gradees">'
                ansText += '<div class="gradeLeft"><span>' + answerDetails[i].answerList[j].levelContext + '</span></div>'
                ansText += '<div class="gradeRight ' + classfiy + '">' + answerDetails[i].answerList[j].chooseText + '</div>'
                ansText += '</div>'
            }

        }
        $('#grade').html(ansText)
    })
}