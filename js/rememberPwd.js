$(function () {
    var bigH = $(window).height();
    $(".content").css("height", (bigH - 70) + "px");
})

var data;
var phone;
//验证手机号
// $("#phone").change(function () {
//     phone = $("input[name=phone]").val();
//     data = {
//         phone: phone
//     }
//     if (!(/^1[34578]\d{9}$/.test(phone))) {
//         $(".tip").html('手机号码格式不对！');
//     } else {
//         $(".getCode").attr("disabled", false);
//         $(".getCode").innerHTML = "获取验证码";
//         $(".getCode").css("color", "#0F36A5");
//         app.DataRequest(url + "company/checkPhone", data, function (err) {}, function (msg) {
//             if (msg[0].status == 0) {
//                 $(".tip").html('手机号码已存在！');
//             }
//         });
//     }
// });

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
            $(".tip").html('手机号码格式不对！');
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

// var i = 1;
// var intervalid;
// function dTime() {
//     $(".stip").removeClass("hide");
//     if (i == 0) {
//         window.location.href = "./login.html";
//         clearInterval(intervalid);
//     }
//     document.getElementById("mes").innerHTML = i;
//     i--;
// }

//修改密码
$(".infoSubmit").click(function () {
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
                    smsCode: code,
                    sessionid: sid
                }
                app.DataRequest(URL + "company/forgetPassword", data, function (err) {}, function (msg) {
                    if (msg[0].status == 1) {
                        $(".stip").removeClass("hide");
                        setTimeout(function () {
                            window.location.href = "./login.html";
                        }, 1000);
                    } else if (msg[0].status == 0) {
                        if (msg[0].state == 1) {
                            $(".tip").html('验证码过期请重新输入！');
                        }
                    } else if (data[0].status == -1) {
                        outCompany();
                    }
                });
            }
        }

    }
});