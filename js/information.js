var data;
$(function () {
    location.href = "./index.html";

    $("#distpicker").distpicker('destroy');
    $("#distpicker").distpicker({
        autoSelect: true,
        placeholder: true
    });
    var bigH = $(window).height();
    $(".content").css("height", (bigH - 70) + "px");

    //行业
    app.DataRequest(URL + "trade/selectAllTrade", data, function (err) {}, function (msg) {
        if (msg[0].status == 1) {
            var tradeList = msg[0].tradeList;
            var selectFhangye = $('.selectFhangye option:selected').attr('value');
            for (i = 0; i < tradeList.length; i++) {
                if (tradeList[i].parentId == "") {
                    $('.selectFhangye').append('<option value="' + tradeList[i].id + '">' + tradeList[i].industry + '</option>');
                }
            }
        }
    }, false);

    //显示企业信息
    data = {
        sessionid: sessionid
    }
    app.DataRequest(URL + "company/getCompany", data, function (err) {}, function (data) {
        if (data[0].status == 1) {
            var company = data[0].company;
            if (company.name) {
                $('input[name=name]').val(company.name);
                $('input[name=name]').css("background", "#ccc");
                $('input[name=name]').attr("disabled", true);
                $('.selectFhangye').val(company.industry);
                if ($('.selectFhangye').val()) {
                    app.DataRequest(URL + 'trade/selectAllTrade', {}, function (err) {}, function (msg) {
                        if (msg[0].status == 1) {
                            var tradeList = msg[0].tradeList;
                            for (i = 0; i < tradeList.length; i++) {
                                if ($('.selectFhangye').val() == tradeList[i].parentId) {
                                    $('.selectZhangye').append('<option value="' + tradeList[i].id + '">' + tradeList[i].industry + '</option>');
                                }
                            }
                        }
                    }, false)
                }
                $('.selectZhangye').val(company.industryCategory);
                $(".selectNo").val(company.employee);
                $(".selectPrice").val(company.turnover);
                $(".selectYear").val(company.year);
                $(".selectZprice").val(company.property);
                $(".selectProvince").val(company.province);
                $(".selectProvince").trigger("change");
                $(".selectCity").val(company.city);
                $(".selectCity").trigger("change");
                $(".selectDistrict").val(company.county);
            }
        } 
    });

});

//具体行业
$('.selectFhangye').change(function () {
    $(".selectZhangye").empty();
    var selectFhangye = $('.selectFhangye option:selected').attr('value');
    app.DataRequest(URL + 'trade/selectAllTrade', {}, function (err) {}, function (msg) {
        if (msg[0].status == 1) {
            var tradeList = msg[0].tradeList;
            $('.selectZhangye').append('<option value="-1">请选择</option>');
            for (i = 0; i < tradeList.length; i++) {
                if (selectFhangye == tradeList[i].parentId) {
                    $('.selectZhangye').append('<option value="' + tradeList[i].id + '">' + tradeList[i].industry + '</option>');
                }
            }
        }
    })
});

//添加/修改信息
var id = localStorage.getItem("id");
$(".infoSubmit").click(function () {
    var name = $('input[name=name]').val();
    var selectFhangye = $(".selectFhangye").val();
    var selectZhangye = $(".selectZhangye").val();
    var selectNo = $(".selectNo").val();
    var selectPrice = $(".selectPrice").val();
    var selectYear = $(".selectYear").val();
    var selectZprice = $(".selectZprice").val();
    var selectProvince = $(".selectProvince").val();
    var selectCity = $(".selectCity").val();
    var selectDistrict = $(".selectDistrict").val();
    if (name == "") {
        $(".tip").html('企业名称不能为空！');
    } else if (selectFhangye == -1) {
        $(".tip").html('所属行业不能为空！');
    } else if (selectZhangye == -1) {
        $(".tip").html('所属行业不能为空！');
    } else if (selectNo == -1) {
        $(".tip").html('从业人数不能为空！');
    } else if (selectPrice == -1) {
        $(".tip").html('营业收入不能为空！');
    } else if (selectYear == -1) {
        $(".tip").html('营业年限不能为空！');
    } else if (selectZprice == -1) {
        $(".tip").html('企业总资产不能为空！');
    } else if (selectProvince == "") {
        $(".tip").html('企业所在地区不能为空！');
    } else if (selectCity == "") {
        $(".tip").html('企业所在地区不能为空！');
    } else if (selectDistrict == "") {
        $(".tip").html('企业所在地区不能为空！');
    } else {
        data = {
            id: id,
            name: name,
            industry: selectFhangye,
            industry_category: selectZhangye,
            employee: selectNo,
            turnover: selectPrice,
            year: selectYear,
            property: selectZprice,
            province: selectProvince,
            city: selectCity,
            county: selectDistrict,
            sessionid: sessionid
        }
        app.DataRequest(URL + 'company/updateCompany', data, function (err) {}, function (msg) {
            if (msg[0].status == 1) {
                localStorage.setItem("sessionid", msg[0].sessionid);
                localStorage.setItem("name", name)
                location.href = "./list.html"
            } else if (msg[0].status == -1) {
                outCompany();
            }
        });
    }

});