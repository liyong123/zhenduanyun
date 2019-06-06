$(document).ready(function () {
    //日期控件
    var myDate = new Date();
    $(".form_datetime").datetimepicker({
        format: 'yyyy',
        weekStart: 1,
        autoclose: true,
        todayBtn: true,
        startView: 4,
        minView: 4,
        endDate: myDate.getFullYear(),
        forceParse: false,
        language: 'zh-CN'
    });

    getList();
});

//input列表
function getList() {
    $.getJSON("./js/filldata.json", function (data) {
        if (data[0].status == 1) {
            getInput(data[0].propertyList);
            getInput(data[0].moneyList);
            getInput(data[0].lossList);
            getInput(data[0].importList);
        } else {
            console.log('读取数据失败')
        }
    });
}

function getInput(data) {
    var dom = $('<div class="form-horizontal">' +
        ' <div class="filldataName">' + data[0].data + '（单位：元）：</div>' +
        ' <div class="filldataList"></div>' +
        ' <div class="clearfix"></div>' +
        '</div>')

    for (var i = 0; i < data.length; i++) {
        var inputValue = data[i].inputValue;
        if (!inputValue) {
            inputValue = '';
        }
        $(' <div class="form-group">' +
            '   <label class="col-sm-4 control-label">' + data[i].name + '：</label>' +
            '   <div class="col-sm-7">' +
            '     <input type="number" class="form-control ' + data[i].no + '" value="' + inputValue + '" placeholder="请输入">' +
            '   </div>' +
            '  </div>').appendTo(dom.find('.filldataList'));
    }
    dom.appendTo('.inputList');
}

//下载
function fileExcel() {
    $("#fileBtn").attr("href", URL + 'normResult/downExcel');

    // var form = $('<form method="GET"></form>');
    // form.attr('action', URL + 'normResult/downExcel');
    // form.appendTo($('body'));
    // form.submit();
}

//上传
function uploadPic() {
    if ($("#pic").val()) {
        var form = document.getElementById('upload'),
            formData = new FormData(form);
        if (formData) {
            $.ajax({
                url: URL + "normResult/upFileExcel",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function (xhr) {
                    if (token) {
                        xhr.setRequestHeader("token", token)
                    }
                },
                success: function (res) {
                    if (res.status == -1000) {
                        alert("上传失败，请检查是否登录!");
                    }

                    var data = JSON.parse(res);
                    if (data[0].status == 1 && data[0].importList.length != 0) {
                        form.reset();//清空表单
                        $('.inputList').empty();//清空input
                        $('#tipModalSuccess').modal('show');
                        getInput(data[0].propertyList);
                        getInput(data[0].moneyList);
                        getInput(data[0].lossList);
                        getInput(data[0].importList);
                    } else {
                        $('#tipModalFail').modal('show');
                        // alert("上传失败！请确认上传文件是否是本网站下载的文件。");
                    }
                },
                error: function (err) {
                    alert("网络连接失败,稍后重试", err);
                }

            })
        }
    }
}

function nextBuildModel() {
    var time = $("#time").val();
    if (time == "") {
        // $(".timeTip").removeClass("hide");
        // setTimeout(function () {
        //     $(".timeTip").addClass("hide");
        // }, 3000);
        $('#tipModalData').modal('show');
    } else {
        data = {
            C01: $('.C01').val(),
            C02: $('.C02').val(),
            C03: $('.C03').val(),
            C04: $('.C04').val(),
            C05: $('.C05').val(),
            C06: $('.C06').val(),
            C07: $('.C07').val(),
            C08: $('.C08').val(),
            C09: $('.C09').val(),
            C10: $('.C10').val(),
            C12: $('.C12').val(),
            C13: $('.C13').val(),
            C14: $('.C14').val(),
            C15: $('.C15').val(),
            C16: $('.C16').val(),
            C17: $('.C17').val(),
            C18: $('.C18').val(),
            C20: $('.C20').val(),
            C21: $('.C21').val(),
            C23: $('.C23').val(),
            C24: $('.C24').val(),
            F01: $('.F01').val(),
            F02: $('.F02').val(),
            F03: $('.F03').val(),
            P01: $('.P01').val(),
            P02: $('.P02').val(),
            P03: $('.P03').val(),
            P04: $('.P04').val(),
            P05: $('.P05').val(),
            P06: $('.P06').val(),
            P07: $('.P07').val(),
            P08: $('.P08').val(),
            P09: $('.P09').val(),
            P10: $('.P10').val(),
            P11: $('.P11').val(),
            P12: $('.P12').val(),
            P13: $('.P13').val(),
            H1: $('.H1').val(),
            H2: $('.H2').val(),
            H3: $('.H3').val(),
            H4: $('.H4').val(),
            age: time,
            questionRollCompanyId: qId
        }
        // console.log(data)
        app.DataRequest(URL + '/normResult/addNormResult', data, function (err) {
            },
            function (msg) {
                if (msg[0].status) {
                    localStorage.setItem("year", time);
                    location.href = './CoPerformance_buildModel.html'
                }
            });
    }
}