var data;
var cId = localStorage.getItem('id');
var qId = localStorage.getItem("questionRollCompanyId");
var time = localStorage.getItem('year');
var con = 0;
$(function () {
    getNorm();

    var inps = $(".modelInps input");
    for (var i = 0; i < inps.length; i++) {
        if (inps[i].value == '') {
            con++;
        }
    }
    if (con == 28) {
        $(".bMConCirBtn").removeClass("cirBtna");
    } else {
        $(".bMConCirBtn").addClass("cirBtna");
    }
});

//输入值
function getNorm() {
    data = {age: time}
    app.DataRequest(URL + 'norm/getNorm', data, function (err) {
        },
        function (msg) {
            if (msg[0].status == 1) {
                var str1 = '',
                    str2 = '',
                    str3 = '',
                    str4 = '',
                    str5 = ''
                var lists = msg[0].NormList;
                for (var i = 0; i < lists.length; i++) {
                    if (i == 0) {
                        for (var j = 0; j < lists[i].list.length; j++) {
                            str1 += showInp('1', lists[i].list[j]);
                        }
                    } else if (i == 1) {
                        for (var j = 0; j < lists[i].list.length; j++) {
                            str2 += showInp('2', lists[i].list[j]);
                        }
                    } else if (i == 2) {
                        for (var j = 0; j < lists[i].list.length; j++) {
                            str3 += showInp('3', lists[i].list[j]);
                        }
                    } else if (i == 3) {
                        for (var j = 0; j < lists[i].list.length; j++) {
                            str4 += showInp('4', lists[i].list[j]);
                        }
                    } else if (i == 4) {
                        for (var j = 0; j < lists[i].list.length; j++) {
                            str5 += showInp('5', lists[i].list[j]);
                        }
                    }
                }
                $(".modal1").append(str1)
                $(".modal2").append(str2)
                $(".modal3").append(str3)
                $(".modal4").append(str4)
                $(".modal5").append(str5)
            }
        }, false);
}

function showInp(i, data) {
    var str = '';
    var normValue = data.normValue ? data.normValue : '';
    str += '<div class="modelInps showinp' + i + '">'
    str += '<div class="modelName">' + data.name + '：</div>'
    str += '<div class="modelInp">'
    str += '<input type="text" class="form-control" name="" value="' + normValue + '"  id="' + data.id + '" disabled>'
    // str += '<a class="modelTipBox" data-toggle="tooltip" data-placement="bottom" title="' + data.remark + '"><span class="modelTipIcon">i</span></a>'
    str += '</div>'
    str += '<div class="modalRight">'
    str += '<div>' + data.remark + '</div>'
    str += '<div>' + data.explain + '</div>'
    str += '</div>'
    str += '<div class="clearfix"></div>'
    str += '</div>'
    return str
}

var showModeI = '';

function showMode(i) {
    showModeI = i;
    if (i == "1") {
        $('#aModal').modal('show');
    } else if (i == "2") {
        $('#bModal').modal('show');
    } else if (i == "3") {
        $('#cModal').modal('show');
    } else if (i == "4") {
        $('#dModal').modal('show');
    } else if (i == "5") {
        $('#eModal').modal('show');
    }
}

//下一步
$(".bMConCirBtn").click(function () {
    // var inps = $(".modelInps input");
    // var con = 0;
    // for (var i = 0; i < inps.length; i++) {
    //     if (inps[i].value == '') {
    //         con++;
    //     }
    // }
    if (con == 28) {
        $('#tipModal').modal('show');
        $(".bMConCirBtn").removeClass("cirBtna");
    } else {
        $(".bMConCirBtn").addClass("cirBtna");
        var inps = $(".modelInps input");
        var names = "";
        for (var i = 0; i < inps.length; i++) {
            if (inps[i].value == "") {
                names += '""' + ",";
            } else {
                names += inps[i].value.replace(/%/g, "") + ",";
            }
        }

        data = {
            names: names.substring(0, names.length - 1),
            year: time,
            companyId: cId,
            questionRollCompanyId: qId
        }
        // console.log(data)
        app.DataRequest(URL + 'normResult/addProfit', data, function (err) {
            },
            function (msg) {
                if (msg[0].status != 0) {
                    localStorage.setItem("year", time);
                    location.href = "./CoPerformance_industryBid.html";
                }
            });
    }
});