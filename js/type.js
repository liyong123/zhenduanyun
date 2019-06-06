$(function () {
    var bigH = $(window).height();
    $(".content").css("height", (bigH - 170) + "px");

    $(".typePrev").click(function () {
        window.history.go(-1);
    });

    getIfItem();
});

var data;
var qId = location.href;
qId = qId.substr((qId.indexOf("=")) + 1);

function getIfItem() {
    data = {
        questionRollId: qId,
        sessionid: sessionid
    }
    app.DataRequest(URL + "questionRoll/ifItem", data, function (err) {}, function (msg) {
        if (msg[0].status == 1) {
            var list = msg[0].list;
            var str = '';
            for (i = 0; i < list.length; i++) {
                var name = list[i].name;
                var n = name.substring(name.lastIndexOf("-") + 1, name.length);
                str += '<div class="typeCenterItem">'
                str += '<dl>'
                if (n == "设计") {
                    str += '<dt class="typeChan"></dt>'
                }
                if (n == "生产") {
                    str += '<dt class="typeSheng"></dt>'
                }
                if (n == "物流") {
                    str += '<dt class="typeWu"></dt>'
                }
                if (n == "销售") {
                    str += '<dt class="typeXiao"></dt>'
                }
                if (n == "服务") {
                    str += '<dt class="typeFu"></dt>'
                }
                str += '<dd>' + n + '类</dd>'
                str += '</dl>'
                str += '<div class="typeWid">'
                str += '<span class=""  id="' + list[i].id + '"></span>'
                str += '</div>'
                str += '</div>'
            }
            str += '<div class="clearfix"></div>'
            $(".typeFxDl").append(str);
        } else if (data[0].status == -1) {
            outCompany();
        }
    }, false);
}

$(".typeCenterBottom").on("click", ".typeCenterItem", function () {
    $(this).find("span").toggleClass("typeOn");
    $(".typeCenterTop").find("span").removeClass("typeOn");
});

$(".typeCenterTop").on("click", ".typeCenterItem", function () {
    $(this).find("span").toggleClass("typeOn");
    $(".typeCenterBottom").find("span").removeClass("typeOn");
});

var itemsId = "";
$(".typeNext").click(function () {
    var whole = 1;
    var typeId = "";
    var num = 0;
    var sp = $(".typeCenterItem span")
    for (i = 0; i < $(".typeCenterItem").length; i++) {
        if (sp[i].getAttribute("class") == "typeOn") {
            num = 1;
            if (sp[i].getAttribute("id") == "zt") {
                whole = 1;
                break;
            } else {
                whole = 0;
                typeId += sp[i].getAttribute("id") + ","
            }
        }
    }
    if (num == 0) {
        $(".tip").html("请选择评估类型！");
    } else {
        $(".tip").html(null);
        itemsId = typeId.substring(0, typeId.length - 1)
        data = {
            questionRollId: qId,
            sessionid: sessionid,
            whole: whole,
            items: itemsId
        }
        app.DataRequest(URL + "questionRoll/createQuestionRollCompany", data, function (err) {}, function (msg) {
           
            if (msg[0].status == 1) {
                var questionRollCompanyId = msg[0].questionRollCompany.id;
                localStorage.setItem("questionRollCompanyId", questionRollCompanyId);
                if (whole == 1) {
                    location.href = "./evaluating.html";
                } else {
                    location.href = "./andpro.html";
                }
            } else if (data[0].status == -1) {
                outCompany();
            }
        });
    }
})