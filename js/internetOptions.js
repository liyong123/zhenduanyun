// 评测范围选择
let eORs;
$('#entirety').click(function () {
    $('.hint_o').hide();
    $(this).find('.radio_es>i').addClass('active_i');
    $('#single').find('.radio_es>i').removeClass('active_i');
    eORs = 1;
})

$('#single>div').click(function () {
    $('.hint_o').hide();
    $(this).find('.radio_es>i').addClass('active_i');
    $('#entirety').find('.radio_es>i').removeClass('active_i');
    eORs = 2;
    translation();
})

// 判断单项全部选中 则进行综合评测
function translation() {
    if ($('#single').find('.active_i').length == 3) {
        $('.hint_o').hide();
        $('#entirety').find('.radio_es>i').addClass('active_i');
        $('#single').find('.radio_es>i').removeClass('active_i');
        eORs = 1;
    }
}

// 上一步
$('#previous').click(function () {
    $('.hint_o').hide();
    location.href = './internetTopicBasic.html';
})

// 下一步
$('#next').click(function () {
    $('.hint_o').hide();
    if (!eORs) {
        $('.hint_o').show();
        return;
    }
    let review;
    if (eORs == 2) {
        for (let i = 0; i < $('#single').find('.active_i').length; i++) {
            if (review) {
                review = review + ',' + $('#entirety_or_single').find('.active_i').eq(i).attr('data-type');
            } else {
                review = $('#entirety_or_single').find('.active_i').eq(i).attr('data-type');
            }
        }
    } else {
        review = '1,2,3'
    }

    let questOptions = {
        companyInternetRollId: localStorage.getItem('internerCompanyId'),
        entirety: eORs,
        items: review
    }

    // console.log(questOptions)

    app.DataRequest(URL + 'companyInternetRoll/updateInternetEvaluatingType', questOptions, function (err) {}, function (msg) {
        if (msg[0].status == 1 || msg[0].status == 2) {
            location.href = './internetTopic.html';
        }
    })

})