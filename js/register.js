$(function () {
    var bigH = $(window).height();
    $(".content").css("height", (bigH - 70) + "px");
})

var data = {};
var phone = '';
//验证手机号
$("#phone").change(function () {
    debugger
    phone = $("input[name=phone]").val();
    data = {
        phone: phone
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
        $(".tip").html('手机号码格式不正确！');
    } else {
        app.DataRequest(URL + "company/checkPhone", data, function (err) {}, function (msg) {
            if (msg[0].status == 0) {
                $(".tip").html('手机号码已存在！');
            }
        });
    }
});

//获取验证码
var sid;
$(".getCode").click(function () {
    var t = this;
    phone = $("input[name=phone]").val()
    data = {
        phone: phone
    }
    if (phone == "") {
        $(".tip").html('请输入手机号！');
    } else {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            $(".tip").html('手机号码格式不正确！');
        } else {
            app.DataRequest(URL + "company/getSmsCode", data, function (err) {}, function (msg) {
                if (msg[0].status == 1) {
                    sid = msg[0].sessionid;
                    time(t);
                }
            });
        }
    }
});

$(".checkFuwu").click(function () {
    if ($(".checkFuwu").prop('checked') == false) {
        $(".registerBtn").attr("disabled", true);
    } else {
        $(".registerBtn").attr("disabled", false);
    }
});

//注册
$(".registerBtn").click(function () {
    phone = $("input[name=phone]").val();
    var code = $("input[name=code]").val();
    var pwd = $("input[name=pwd]").val();
    var newPwd = $("input[name=newPwd]").val();
    if (phone == "") {
        $(".tip").html('手机号码不能为空！');
    } else if (code == "") {
        $(".tip").html('验证码不能为空！');
    } else if (pwd == "") {
        $(".tip").html('密码不能为空！');
    } else if (newPwd == "") {
        $(".tip").html('确认密码不能为空！');
    } else {
        if (pwd.length < 6) {
            $(".tip").html('密码不能小于6位数！');
        } else {
            if (pwd != newPwd) {
                $(".tip").html('两次密码不一致！');
            } else {
                data = {
                    phone: phone,
                    password: newPwd,
                    code: code,
                    sessionid: sid
                }
                app.DataRequest(URL + "company/Register", data, function (err) {}, function (msg) {
                    if (msg[0].status == 1) {
                        localStorage.setItem('sessionid', msg[0].sessionid);
                        localStorage.setItem('id', msg[0].company.id)
                        localStorage.setItem("questionState", 0);
                        localStorage.setItem("name", "")
                        location.href = "./index.html";
                    } else if (msg[0].status == 0) {
                        $(".tip").html('注册失败,用户已存在！');
                    } else if (msg[0].status == 3) {
                        $(".tip").html('验证码错误！');
                    }
                });
            }
        }

    }
});