$(function () {
    var bigH = $(window).height();
    $(".content").css("height", (bigH - 70) + "px");
    var phone = $("input[name=loginPhone]").val();
    var pwd = $("input[name=loginPwd]").val();

    var oRemember = $("#remember");
    //页面初始化时，如果帐号密码存在则填充
    if (localStorage.getItem('user') && localStorage.getItem('pswd')) {
        phone = localStorage.getItem('user');
        pwd = localStorage.getItem('pswd');
        $("#remember").prop('checked', true);
        $("input[name=loginPhone]").val(phone);
        $("input[name=loginPwd]").val(pwd);
    }
});

//勾选记住密码
$(".rememberPwd label").click(function () {
    if ($("#remember").prop('checked') == false) {
        localStorage.removeItem('user');
        localStorage.removeItem('pswd');
    }
});


var data;
$(".loginBtn").click(function () {
    document.cookie = "isodk=true";
    var phone = $("input[name=loginPhone]").val();
    var pwd = $("input[name=loginPwd]").val();
    if ($("#remember").prop('checked')) {
        localStorage.setItem('user', phone); 
        localStorage.setItem('pswd', pwd);
    }
    if (phone == "") {
        $(".tip").html('手机号码不能为空！');
    } else if (pwd == "") {
        $(".tip").html('密码不能为空！');
    } else {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            $(".tip").html('手机号码格式不对！');
        } else {
            data = {
                phone: phone,
                password: pwd
            }
            app.DataRequest(URL + "company/login", data, function (err) {}, function (msg) {
                if (msg[0].status == 1) {
                    localStorage.setItem('sessionid', msg[0].sessionid);
                    localStorage.setItem('name', msg[0].company.name);
                    localStorage.setItem('id', msg[0].company.id);
                    localStorage.setItem("questionState", msg[0].company.questionState);
                    location.href = "./index.html";
                } else {
                    $(".tip").html('用户名或密码错误！');
                }
            });
        }
    }
});