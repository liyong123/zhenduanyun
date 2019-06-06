var year = localStorage.getItem("year");
$(function () {
    getYear();
});

function getYear() {
    data = {}
    app.DataRequest(URL + 'company/getYear', data, function (err) {},
        function (msg) {
            var str = '';
            var list = msg[0].list;
            if (msg[0].status == 1) {
                for (var i = 0; i < list.length; i++) {
                    str += ' <option>' + list[i] + '</option>'
                }
                $(".dataYear").append(str);
            }
        });
}

//行业对标 下一步
$(".industrySubmit").click(function () {
    var benYear = $(".dataYear option:selected").text();
    if (benYear == "请选择") {
        $(".timeTip").removeClass("hide");
        setTimeout(function ()  {
            $(".timeTip").addClass("hide");
        }, 3000);
        $('.modal').modal('hide');
    } else {
        data = {
            year: year,
            benchmarkingYear: benYear,
            questionRollCompanyId: qId
        }
        app.DataRequest(URL + 'company/goBenchmarking', data, function (err) {},
            function (msg) {
                if (msg[0].status == 1) {
                    $(".firstShow").hide();
                    $(".firstProgress").show();
                    setTimeout(function ()  {
                        localStorage.setItem("year", year);
                        localStorage.setItem("benYear", benYear);
                        // location.href = "./CoPerformance_result.html"
                        location.href = './CoPerformance_result_new_backup.html'
                    }, 4000);
                }
            });
    }
});