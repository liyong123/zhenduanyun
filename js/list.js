$(function () {
    var bigH = $(window).height()
    // $(".content").css("height", (bigH - 70) + "px");
    $('#buyBtn').attr('href', honeycombURL + 'zhenduanyun');
    //显示列表
    getQuestion()
})
var data

function getQuestion() {
    function onClickBuyBt() {
        var id = $(this).data('id')
        var type = $(this).data('type')
        var item = $(this).data('item');

        if (!item) {
            return;
        }

        if (!sessionid) {
            window.location.href = honeycombURL + 'login?path=' + selfURL;
        }

        if (item.id == "WJ001") {
            isQueLisan(id)
        } else if (item.id == "WJ002") {
            isQueLiucheng(id)
        } else if (item.id == "WJ007") {
            isComJixiao(id);
        } else if (item.id == "WJ006") {
            dimen21(id)
        } else if (item.id == "WJ009") {
            internets(id)
        } else if (item.id == "WJ010") {
            questionnaireAnalysis(id)
        } else if (item.id == "WJ011") {
            _HR(id)
        } else {
            //nothing
        }
    }

    var url = app.getUrlParams('fbMode') == 16 ? '/json/list.json' : URL +
        'questionRoll/getAll'
    app.DataRequest(url, data, function (err) {}, function (msg) {
        if (msg[0].status == 1) {
            var list = msg[0].list
            console.log(list)
            var sn = ''
            var dn = ''
            var str = ''
            var isOld = false
            var flagCont = true
            var flagName = ''
            // console.log(list)
            for (i = 0; i < list.length; i++) {
                if (list[i].flag == 2 && !flagCont) {
                    continue
                }

                if (list[i].flag == 0) {
                    flagName = ' <span class="chanye">产业</span>'
                } else if (list[i].flag == 1 || list[i].flag == 2) {
                    flagName = ' <span class="qiye">企业</span>'
                }

                var nameText = ''
                var companyText = ''
                var industryText = ''

                if (list[i].name.indexOf('（') >= 0) {
                    companyText = list[i].name.indexOf('企业')
                    industryText = list[i].name.indexOf('产业')
                    nameText = (companyText == -1 && industryText == -1) ? list[i].name.substring(0, list[i].name.indexOf('（')) : list[i].name.substring(2, list[i].name.indexOf('（'))
                    dn = flagName + nameText
                    sn = '<span>' +
                        list[i].name.substring(list[i].name.indexOf('（') + 1,
                            list[i].name.indexOf('）')) + '</span>'
                } else {
                    companyText = list[i].name.indexOf('企业')
                    industryText = list[i].name.indexOf('产业')
                    nameText = (companyText == -1 && industryText == -1) ? list[i].name : list[i].name.substring(2)
                    dn = flagName + nameText
                    sn = ''
                }

                var spn = list[i].name.substring(list[i].name.indexOf('（') + 1, list[i].name.indexOf('）'))


                str = '<div class="pricing-grid1">\n' +
                    '                        <div class="price-value">\n' +
                    '                            <h2></h2>\n' +
                    '                        </div>\n' +
                    '                        <div class="price-bg">\n' +
                    '                           <div class="price-content-wrap">' +
                    '                              <div class="price-content">' +
                    '<div class="price-article"></div>' +
                    '</div>' +
                    '                           </div>' +
                    '                           <div class="buyBt"></div>' +
                    '                        </div>\n' +
                    '    </div>'

                var dom = $(str);
                if (list[i].imageUrl) {
                    dom.find('.price-value').css({
                        'background': 'url(' + list[i].imageUrl + ')',
                        'background-color': '#5f7fe0',
                        'background-size': '100% auto',
                        'background-blend-mode': 'normal'
                    })
                } else {
                    dom.find('.price-value').css({
                        'background': 'url(./images/temp.png)',
                        'background-color': '#5f7fe0',
                        'background-size': '100% auto',
                        'background-blend-mode': 'normal'
                    })
                }
                var btnTitle = '开始诊断'
                if (list[i].id == 'WJ007' || list[i].id == 'WJ006' || list[i].id == 'WJ002' || list[i].id == 'WJ001' || list[i].id == 'WJ009' || list[i].id == 'WJ010' || list[i].id == 'WJ011') {
                    if (spn == '流程型') {
                        dom.addClass('flowType')
                    } else if (spn == '离散型') {
                        dom.addClass('discretedTye')
                    }
                } else {
                    dom.addClass('waitType')
                    btnTitle = '敬请期待'
                }

                dom.find('h2').html(dn)
                dom.find('.buyBt').text(btnTitle).data('item', list[i]).data('type', spn).data('id', list[i].id).click(onClickBuyBt)

                var contentDom = dom.find('.price-content .price-article');
                var contentDomContainer = dom.find('.price-content');
                contentDom.html(list[i].content)


                dom.appendTo('.center')
                // 判断成熟度诊断的显示框
                if (list[i].flag == 2) {
                    flagCont = false
                }

                //计算'更多'位置
                var match = list[i].id.match(/WJ0(\d*)/);
                var moreUrl;
                if (list[i].id == 'WJ001') {
                    moreUrl = './list_Detail02.html';
                }
                if (list[i].id == 'WJ002') {
                    moreUrl = './list_Detail02.html';
                }
                if (list[i].id == 'WJ003') {
                    moreUrl = './list_Detail03.html';
                }
                if (list[i].id == 'WJ004') {
                    moreUrl = './list_Detail04.html';
                }
                if (list[i].id == 'WJ005') {
                    moreUrl = './list_Detail05.html';
                }
                if (list[i].id == 'WJ006') {
                    moreUrl = './list_Detail06.html';
                }
                if (list[i].id == 'WJ007') {
                    moreUrl = './list_Detail07.html';
                }
                if (list[i].id == 'WJ009') {
                    moreUrl = './list_Detail09.html';
                }
                if (list[i].id == 'WJ010') {
                    moreUrl = './list_Detail10.html';
                }
                if (list[i].id == 'WJ011') {
                    moreUrl = './list_Detail11.html';
                }

                if (moreUrl) {
                    var moreBt = $('<span><a>查看更多 &gt;</a></span>').appendTo(contentDomContainer);
                    moreBt.find('a').attr('href', moreUrl);
                    if (contentDom.height() >= 200) {
                        moreBt.appendTo(dom.find('.price-bg')).addClass('more-float');
                    }
                }
            }
        }
    }, false)
}

// 流程型
function isQueLiucheng(id) {
    data = {
        questionRollId: 'WJ002',
        sessionid: sessionid,
    }
    app.DataRequest(URL + 'questionRoll/ifItem', data, function (err) {}, function (msg) {
        if (msg[0].status == 9) {
            $('#liuChengLiSan').modal('hide')
            $('#purchaseHint').text('您尚未购买CESI-智能制造成熟度模型')
            $('#purchase').modal('show')
        } else {
            location.href = './optionsLL.html'
        }
    })
}

// 离散型
function isQueLisan(id) {
    data = {
        questionRollId: 'WJ001',
        sessionid: sessionid,
    }
    app.DataRequest(URL + 'questionRoll/ifItem', data, function (err) {}, function (msg) {
        if (msg[0].status == 9) {
            $('#liuChengLiSan').modal('hide')
            $('#purchaseHint').text('您尚未购买CESI-智能制造成熟度模型')
            $('#purchase').modal('show')
        } else {
            location.href = './optionsLL.html'
        }
    })
}


// 企业绩效
function isComJixiao(id) {
    data = {
        questionRollId: id,
        sessionid: sessionid,
    }
    app.DataRequest(URL + 'questionRollCompany/getBenchmarking', data, function (err) {},
        function (msg) {
            if (msg[0].status == 1) {
                localStorage.setItem('questionRollCompanyId', msg[0].questionRollCompanyId)
                location.href = './CoPerformance_buildModel.html'
            }
        })
}


function isComJixiao(id) {
    data = {
        questionRollId: id,
        sessionid: sessionid,
    }
    app.DataRequest(URL + 'questionRollCompany/getBenchmarking', data, function (err) {},
        function (msg) {
            if (msg[0].status == 9) {
                $('#purchaseHint').text('您尚未购买企业绩效评价诊断！')
                $('#purchase').modal('show')
            }
            if (msg[0].status == 1) {
                localStorage.setItem('questionRollCompanyId', msg[0].questionRollCompanyId)
                location.href = './CoPerformance_filldata.html'
            }
        })
    $('#buyBtn').attr('href', honeycombURL + 'zhenduanyun');
}


// 制造21维度测评
function dimen21(id) {
    let data_dimen = {
        questionRollId: id,
        sessionid: sessionid,
    }
    app.DataRequest(URL + 'companyEvaluatingRoll/checkAuthority', data_dimen, function (err) {}, function (msg) {
        if (msg[0].status == 2) {
            $('#purchaseHint').text('您尚未购买制造21维度测评！')
            $('#purchase').modal('show')
        }
        if (msg[0].status == 1) {
            localStorage.setItem('questionRollCompanyId', msg[0].questionRollCompanyId)
            location.href = './topicBasic21.html'
        }
    })
}

// 工业互联网能力成熟度模型
function internets(id) {
    let data_dimen = {
        questionRollId: id,
        sessionid: sessionid,
    }
    app.DataRequest(URL + 'companyInternetRoll/checkAuthority', data_dimen, function (err) {}, function (msg) {
        if (msg[0].status == 2) {
            $('#purchaseHint').text('您尚未购买工业互联网能力成熟度模型！')
            $('#purchase').modal('show')
        }
        if (msg[0].status == 1) {
            localStorage.setItem('questionRollCompanyId', msg[0].questionRollCompanyId)
            location.href = './internetTopicBasic.html';
        }
    })
}

// 智能制造调研问卷分析模型
function questionnaireAnalysis(id) {
    // let data_dimen = {
    //     questionRollId: id,
    //     sessionid: sessionid,
    // }
    location.href = './investigateHome.html';
    // app.DataRequest(URL + 'companyInternetRoll/checkAuthority', data_dimen, function (err) {}, function (msg) {
    //     if (msg[0].status == 2) {
    //         $('#purchaseHint').text('您尚未购买工业互联网能力成熟度模型！')
    //         $('#purchase').modal('show')
    //     }
    //     if (msg[0].status == 1) {
    //         localStorage.setItem('questionRollCompanyId', msg[0].questionRollCompanyId)

    //     }
    // })
}

// 人力资源管理评测
function _HR(id) {
    let data_dimen = {
        questionRollId: id,
        sessionid: sessionid,
    }
    app.DataRequest(URL + 'companyHrmiRoll/checkAuthority', data_dimen, function (err) {}, function (msg) {
        console.log(msg)
        if (msg.status == 2) {
            $('#purchaseHint').text('您尚未购买人力资源管理评测模型！')
            $('#purchase').modal('show')
        }
        if (msg.status == 1) {
            localStorage.setItem('questionRollCompanyId', msg.questionRollCompanyId)
            location.href = './HRHome.html';
        }
    })
}