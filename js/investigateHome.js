$('#pre_page').click(function () {
    location.href = './list.html'
})
//日期控件
$(".form_datetime").datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd', //显示格式
    todayHighlight: 1, //今天高亮
    minView: "month", //设置只显示到月份
    startView: 2,
    forceParse: 0,
    showMeridian: 1,
    autoclose: 1 //选择后自动关闭,
});

$(function () {
    nowTime();

    rollData();
})

function nowTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    let nowDate = year + "-" + month + "-" + day;
    $(".form_datetime").attr('value', nowDate);
}

// $.get(url + 'dwsurvey/getDirectory', function (status) {
//     var company = JSON.parse(status)
//     for (var iloginStaff = 0; iloginStaff < company[0].enterpriseList.length; iloginStaff++) {
//         $('#companyName').append('<option value="' + company[0].enterpriseList[iloginStaff].id + '">' + company[0].enterpriseList[iloginStaff].name + '</option>')
//     }
// })

function rollData() {
    app.DataRequest(URL + 'dwsurvey/getDirectory', {}, function (err) {}, function (msg) {
        // console.log(msg);
        var roll = msg.list;
        for (var iroll = 0; iroll < roll.length; iroll++) {
            $('#roll').append('<option value="' + roll[iroll].id + '">' + roll[iroll].survey_name + '</option>')
            // console.log(roll[iroll].id);
        }
    }, false)
}


function textareaKeyup(textareaText, textareaNumber) {
    let length = $(textareaText).val().length;
    $(textareaNumber).text(length);
}

$('#roll').change(function () {
    $(this).removeClass('grey');
})

$('#next_topic').click(function () {
    $('#hint').text('');
    let quest = {
        directoryId: $('#roll').val(),
        area: $('#area').val(),
        analysisTime: $('#homeJxMonth').val(),
        remark: $('#evaluate_one').val()
    }
    var eolength= document.getElementById("evaluate_one").value.length;
    console.log(eolength);
    if (quest.area == "") {
        $('#hint').text('调研地区不能为空！');
        return;
    }
    if (quest.analysisTime == "") {
        $('#hint').text('评测日期不能为空！');
        return;
    }
    if (quest.directoryId == "" || quest.directoryId == null) {
        $('#hint').text('问卷名称不能为空！');
        return;
    }
    if (quest.remark == "") {
        $('#hint').text('概述不能为空！');
        return;
    }
    if (eolength>1000){
        $('#hint').text('字数超出限制！');
        return;
    }
    app.DataRequest(URL + 'dwsurvey/editDirectoryRemark', quest, function (err) {},
        function (msg) {
            if (msg.status == 1) {
                localStorage.setItem('directoryRemarkId', msg.directoryRemark.id);
                location.href = './investigateTopic.html'
            } else {
                console.log('调研问卷分析失败')
                return;
            }
        })
})