// 页面加载
let companyList;
let evaluating_type = 0;
let evaluatingCompany;

$(function () {
    $('#hint').text('');
    companyList = [];

    app.DataRequest(URL + 'companyHrmiRoll/checkAuthority', {}, function (err) {}, function (data) {
        if (data.status == 1) {
            let companyData = data.company;
            let option_text;
            if (companyData.specialist == 0) {
                $('#evaluating_type').text('企业评测');
                $("#firm_name").attr("disabled", true);
                $("#makeupCo").val(companyData.name).attr("disabled", true);
                evaluatingCompany = companyData.id
            } else if (companyData.specialist == 1) {
                evaluating_type = 1
                companyList = data.companyList;
                $('#evaluating_type').text('专家评测');
                for (let i = 0; i < companyList.length; i++) {
                    companyListArry.push(companyList[i])
                    if (companyList[i].name) {
                        option_text += '<option value="' + companyList[i].id + '">' +
                            companyList[i].name +
                            '</option>';
                    }
                }
                $('#firm_name').html(option_text);
            }
        } else if (data.status == 2) {
            location.href = './list.html';
        }

    })
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

// 默认时间
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

// 返回列表页面
$('#return_back').click(function () {
    location.href = './list.html'
})

// 开始评测
$('#began_review').click(function () {
    let basicData = {
        evaluatingTime: $('#homeJxMonth').val(),
        evaluatingPeople: $('#people_name').val(),
        job: $('#job').val(),
        evaluatingCompany: evaluatingCompany,
        questionRollId: 'WJ011'
    };

    if (basicData.evaluatingPeople == "") {
        $('#hint').text('评测人姓名不能为空');
        return;
    }
    if (basicData.job == "") {
        $('#hint').text('评测人岗位不能为空');
        return;
    }

    app.DataRequest(URL + 'companyHrmiRoll/createHrmi', basicData, function (err) {}, function (data) {
        if (data.status == "1") {
            localStorage.setItem('createHRID',data.companyHrmiRoll.id)
            location.href = './HRTopic.html';
        } else {
            console.log('请求错误！')
        }
    })


    // location.href = './HRTopic.html';
})