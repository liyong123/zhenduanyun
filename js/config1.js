// 开发网址
var URL = 'http://117.78.33.45:8081/diagnosis/';
var certificationURL = 'http://117.78.33.45:8085/sso-web/';
var honeycombURL = 'http://test1.icshoneycomb.cn:8002/';
var selfURL = 'http://117.78.33.45:8081/diagnose/';


// 本地网址
/*var URL = 'http://192.168.2.228:8081/soft/';
var certificationURL = 'http://192.168.2.228:8085/sso-web/';
var honeycombURL = 'http://192.168.2.142:3000/';
var selfURL = 'http://192.168.2.227:3088/';*/

// 内网  
// var URL = 'http://192.168.2.143:8088/'; //何军

// utils ------
function getHtmlArgs(name, defaultValue){
  var match = window.location.href.match(new RegExp(name + '=([^&#]*)'))
  return match ? decodeURIComponent(match[1]) : defaultValue
}
//JS操作cookies方法!
function setCookie(name,value,hours,path){
    var name = escape(name);
    var value = escape(value);
    var expires = new Date();
     expires.setTime(expires.getTime() + hours*3600000);
     path = path == "" ? "" : ";path=" + path;
     _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
     document.cookie = name + "=" + value + _expires + path;
  }
  //获取cookie值
  function getCookie(name){
    var name = escape(name);
    //读cookie属性，这将返回文档的所有cookie
    var allcookies = document.cookie;    
    //查找名为name的cookie的开始位置
     name += "=";
    var pos = allcookies.indexOf(name);  
    //如果找到了具有该名字的cookie，那么提取并使用它的值
    if (pos != -1){                       //如果pos值为-1则说明搜索"version="失败
      var start = pos + name.length;         //cookie值开始的位置
      var end = allcookies.indexOf(";",start);    //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
      if (end == -1) end = allcookies.length;    //如果end值为-1说明cookie列表里只有一个cookie
      var value = allcookies.substring(start,end); //提取cookie的值
      return (value);              //对它解码   
       }  
    else return "";                //搜索失败，返回空字符串
  }
  //删除cookie
  function deleteCookie(name,path){
    var name = escape(name);
    var expires = new Date(0);
     path = path == "" ? "" : ";path=" + path;
     document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;
  }
// utils end --------------


// 接口
var app = {
    // ajax请求
    DataRequest: function (url, data, succeed, fail, async) {
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
            type: 'POST',
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
                if(token){
                    xhr.setRequestHeader("token", token)
                }
            },
            error: function (xhr) {
                if (fail && "function" == typeof fail)
                    fail(xhr);
                else{
                    app && app.alert && app.alert("系统提示", "请求服务器错误，请检查网络连接。")
                    console.error('请求错误,',url)
                }

            },
            success: function (result) {
                if (result[0] == undefined) {
                    if (result.status == -1) {
                        //outCompany();
                        console.error('status error',url);
                        return;
                    }
                } else {
                    if (result[0].status == -1) {
                        //outCompany();
                        console.error('status error',url);
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
                    if (fail && "function" == typeof fail)
                        fail(result);
                    else
                        app.alert("系统提示", result.Error);
                }
            },
            async: async
        });
    },

    // utils
    getUrlParams: getHtmlArgs,
    getHtmlArgs : getHtmlArgs
}


// 初始化
$('.alogin').attr('href',honeycombURL+'login?path='+selfURL)
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
if(tokenP){
	setCookie('token',tokenP);
}

var token = getCookie('token');
var name = localStorage.getItem('name');

if(token){
    app.DataRequest(URL+'company/getUserDetails',null,function (res) {
        name = res.name || res.phone || '已登录'
        localStorage.getItem('name',name)
        $(".headUser_name span").html(name);
    })
}

var sessionid = token; 
var qId = localStorage.getItem("questionRollCompanyId");
if (name == null) {
    $(".headUser_name span").html("");
} else {
    $(".headUser_name span").html(name);
}

//if (sessionid == null) {
if(!token){
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
    var data = {token:token}
    $.ajax({
        url: certificationURL + "logout.do",
        type: 'POST',
        data: data,
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        complete:function(xhr,textStatus){
            if(xhr.status != 200 || (xhr.responseJSON && xhr.responseJSON.status!='1')){
                console.log('退出失败');
                debugger;
            }

            localStorage.removeItem("sessionid");
            localStorage.removeItem("name");
            deleteCookie('token');

            sessionid = null;
            name = null;
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


