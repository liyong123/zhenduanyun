//判断环境
var serverEnv = '';

// 开发网址  117测试
var URL = 'http://117.78.36.12:8081/diagnosis/';
var certificationURL = 'http://117.78.36.12:8085/sso-web/';
var honeycombURL = 'http://test1.icshoneycomb.cn:8002/';
var selfURL = 'http://117.78.36.12:8081/diagnose/';


// 测试网址
// var URL = 'http://43.254.1.46/diagnosis/';
// var certificationURL = 'http://43.254.1.46/sso-web/';
// var honeycombURL = 'http://43.254.1.46/';
// var selfURL = 'http://43.254.1.46/diagnose/';


// ------ 生产配置参数 ----------
// var URL = 'http://www.icshoneycomb.com/diagnosis/';
// var certificationURL = 'http://www.icshoneycomb.com/sso-web/';
// var honeycombURL = 'http://www.icshoneycomb.com/';
// var selfURL = 'http://www.icshoneycomb.com/diagnose/';
// serverEnv = 'production';

// 本地网址
// var URL = 'http://117.78.36.12:8081/diagnosis/';
// var certificationURL = 'http://117.78.36.12:8085/sso-web/';
// var honeycombURL = 'http://localhost:3001/';
// var selfURL = 'http://localhost:3088/index.html';


// utils ------
function getHtmlArgs(name, defaultValue) {
    var match = window.location.href.match(new RegExp(name + '=([^&#]*)'))
    return match ? decodeURIComponent(match[1]) : defaultValue
}

function get(object, path, defaultV) {
    path = path.replace(/\[(\d*)\]/g, function ($0, $1) {
        return '.' + $1
    }).replace(/^\./, '').replace(/\.$/, '').split('.');
    var index = 0,
        length = path.length;
    while (object != null && index < length) {
        object = object[path[index++]]
    }
    return (index && index == length && object) ? object : defaultV
}

//JS操作cookies方法!
function setCookie(name, value, hours, path) {
    var name = escape(name);
    var value = escape(value);
    var expires = new Date();
    expires.setTime(expires.getTime() + hours * 3600000);
    path = path == "" ? "" : ";path=" + path;
    _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + _expires + path;
}

//获取cookie值
function getCookie(name) {
    var name = escape(name);
    //读cookie属性，这将返回文档的所有cookie
    var allcookies = document.cookie;
    //查找名为name的cookie的开始位置
    name += "=";
    var pos = allcookies.indexOf(name);
    //如果找到了具有该名字的cookie，那么提取并使用它的值
    if (pos != -1) { //如果pos值为-1则说明搜索"version="失败
        var start = pos + name.length; //cookie值开始的位置
        var end = allcookies.indexOf(";", start); //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
        if (end == -1) end = allcookies.length; //如果end值为-1说明cookie列表里只有一个cookie
        var value = allcookies.substring(start, end); //提取cookie的值
        return (value); //对它解码
    } else return ""; //搜索失败，返回空字符串
}

//删除cookie
function deleteCookie(name, path) {
    var name = escape(name);
    var expires = new Date(0);
    path = path == "" ? "" : ";path=" + path;
    document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
}

function clearUser() {
    console.log('clearUser:----')
    console.log('token:', getCookie('token', '/'))
    console.log('sessionid:', localStorage.getItem('sessionid'))
    console.log('tokenTime:', localStorage.getItem('tokenTime'))
    console.log('name:', localStorage.getItem('name'))
    console.log('id:', localStorage.getItem('id'))


    localStorage.removeItem("sessionid");
    localStorage.removeItem("name");
    localStorage.removeItem('id');
    deleteCookie('token', '/');

    sessionid = null;
    name = null;
    if (getHtmlArgs('debug')) debugger;
}

function toLogin(relogin) {
    var tokenTime = localStorage.getItem('tokenTime');
    if (tokenTime) {
        tokenTime = new Date(tokenTime).valueOf();
        var now = new Date().valueOf();
        if (now - tokenTime < 20000) {
            relogin = true;
            alert('登录异常，请重新登录。');
        }
    }

    debugger; //不要删除此处断点，用于调试子站登录异常
    window.location.href = honeycombURL + 'login?' + (relogin ? 'relogin=true&' : '') + 'path=' + window.location.href.replace(/token=[^&]*/ig, '').replace('?&', '?').replace(/\?$/, '');
}

function showModal(options) {
    var dialogX = $('#dialogCommon');
    var onClickOk = function () {
        if (options.onOk) {
            options.onOk();
        } else {
            console.warn('dialog no onOk handler');
        }
    }
    if (dialogX.length == 0) {
        dialogX = $(
            '<div id="dialogCommon" class="modal fade" tabindex="-1" role="dialog">\n' +
            '  <div class="modal-dialog" role="document">\n' +
            '    <div class="modal-content">\n' +
            '      <div class="modal-header">\n' +
            '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
            '        <h4 class="modal-title">' + options.title + '</h4>\n' +
            '      </div>\n' +
            '      <div class="modal-body">\n' +
            '      </div>\n' +
            '      <div class="modal-footer">\n' +
            '        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>\n' +
            '        <button type="button" class="dia_ok btn btn-primary">' + (options.okText || '确定') + '</button>\n' +
            '      </div>\n' +
            '    </div>' +
            '  </div>' +
            '</div>');
        dialogX.find('.modal-body').append(options.content);
        dialogX.find('.dia_ok').click(onClickOk)
        $('body').append(dialogX);
    }
    dialogX.modal('show');
    //dialogX.find('.dia-title').html(options.title||'提示');
    //dialogX.find('.dia-content').html(options.content);*/
}

// utils end --------------
//debugger;

// 接口
var app = {
    // ajax请求
    DataRequest: function (url, data, succeed, fail, async, type) {
        if (data == undefined) {
            data = {
                sessionid: sessionid
            }
        } else {
            if (data.sessionid == undefined) {
                data.sessionid = sessionid;
            }
        }
        if (async)
            async = true;

        $.ajax({
            url: url,
            type: type || 'POST',
            data: data,
            dataType: 'json',
            //crossDomain: true,
            /*xhrFields: {
                withCredentials: true
            },*/
            /*headers:{
                Authorization:'a'
            },*/
            beforeSend: function (xhr) {
                if (token) {
                    xhr.setRequestHeader("token", token)
                }
            },
            error: function (xhr) {
                if (fail && "function" == typeof fail)
                    fail(xhr);
                else {
                    app && app.alert && app.alert("系统提示", "请求服务器错误，请检查网络连接。")
                    console.error('请求错误,', url)
                }

            },
            success: function (result) {
                if (result[0] == undefined) {
                    if (result.status == -1 || result.status == '-1000') {
                        console.error('用户未登录或登录超时！')
                        clearUser();
                        toLogin();
                        return;
                    }
                } else {
                    if (result[0].status == -1 || result.status == '-1000') {
                        console.error('用户未登录或登录超时！')
                        clearUser();
                        toLogin();
                        return;
                    }
                }
                if (result && result.ISSuccess) {
                    if (succeed && "function" == typeof succeed) {
                        if (result.Data && result.Data != "")
                            succeed(JSON.parse(result.Data));
                        else
                            succeed(result.Data);
                    }
                } else {
                    if (fail && "function" == typeof fail) {
                        fail(result);
                    } else if (app && app.alert) {
                        app.alert("系统提示", result.Error);
                    } else {
                        console.error('接口失败', url)
                    }

                }
            },
            async: async
        });
    },

    // utils
    getUrlParams: getHtmlArgs,
    getHtmlArgs: getHtmlArgs
}


// 初始化
$('.alogin').attr('href', honeycombURL + 'login?path=' + selfURL)
$('.aregister').attr('href', honeycombURL + 'register?path=' + selfURL)
$('#diagnose').click(function () {
    location.href = './mine.html'
})

$('#mines').click(function () {
    location.href = './about.html'
})

$(".headLogo").click(function () {
    location.href = './index.html'
});

$(".showBox").click(function () {
    $(".signOut").show();
});

$(".content").click(function () {
    $(".signOut").hide();
});

var tokenP = getHtmlArgs('token');
if (tokenP) {
    tokenP = decodeURIComponent(tokenP);
    setCookie('token', tokenP, "", '/');
    localStorage.setItem('sessionid', tokenP);
    localStorage.setItem('tokenTime', new Date().toISOString());
    window.location.href = window.location.href.replace(/token=[^&]*/ig, '').replace('?&', '?').replace(/\?$/, '');
}

var token = getCookie('token');
var name = localStorage.getItem('name');
var sessionid = token;

//读取用户信息
if (token && token != '') {
    app.DataRequest(URL + 'company/getUserDetails', null, null, function (res) {
        if (res.abort) {
            console.error('读取用户信息失败，请查看Network面板');
            toLogin();
            return;
        } else {

            name = res[0].company.name || res[0].company.phone || '已登录'
            localStorage.setItem('name', name)
            localStorage.setItem('id', res[0].company.id);
            $(".headUser_name span").html(name);
            localStorage.removeItem('tokenTime');
        }

    }, false);
}

var qId = localStorage.getItem("questionRollCompanyId");
if (name == 'null' || name == null) {
    $(".headUser_name span").html("亲爱的用户");
} else {
    $(".headUser_name span").html(name);
}

//if (sessionid == null) {
if (!token) {
    $(".noSessionid").removeClass("hide");
    $(".yesSessionid").addClass("hide");
} else {
    $(".noSessionid").addClass("hide");
    $(".yesSessionid").removeClass("hide");
}

$("#outLogin").click(function () {
    outCompany();
});

function outCompany() {
    var data = {
        token: token
    }
    $.ajax({
        url: certificationURL + "logout.do",
        type: 'POST',
        data: data,
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        complete: function (xhr, textStatus) {
            if (xhr.status != 200 || (xhr.responseJSON && xhr.responseJSON.status != '1')) {
                console.error('退出失败');
                alert('退出失败，请重试。')
                return;
            }
            clearUser();
            location.href = "./index.html";
        }
    })
}

//重新获取验证码
var wait = 120;

function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.innerHTML = "获取验证码";
        o.style.color = "#fff";
        wait = 120;
    } else {
        o.setAttribute("disabled", false);
        o.innerHTML = wait + "S 后重新获取";
        o.style.color = "#fff";
        wait--;
        setTimeout(function () {
            time(o)
        }, 1000)
    }
}

//注入返回honeyComb页面

$('body').append("<div id='honeyCombLink'><img src='./images/honeycomb-logo.png' alt=''/></div>");
$('#honeyCombLink').bind("click", function () {
    var path = honeycombURL;
    if (window.location.href.indexOf('localhost:3088') != -1) {
        path = path.replace(honeycombURL, 'localhost:3001'); //调研宝
    }
    window.location.href = path;
})

// 设置我要点评  我要反馈的链接
$('#comment').attr('href', honeycombURL + 'appScore?id=CP0004');
$('#feedback').attr('href', honeycombURL + 'submitFeedback?id=CP0004');

// 添加百度统计
if (serverEnv == 'production') {
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e31609d1496f4c92fe7e277634001ff8";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}

// 时间戳处理函数
function formatDate(nows, boolTrue) {
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

    if (boolTrue) {
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
    }
    return timels;
}


// 输入框失去焦点事件 判断长度四否符合要求  
// length 设定输入框允许输入的长度   value为输入框的值
function contentLength(length, that) {
    $('#hint').text('');
    if (that.value.length > length) {
        // $('#hint').text('输入的字符串超过' + length + '字符');
        $(that).val(that.value.substring(0, 20));
    }
}