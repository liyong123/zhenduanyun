$.fn.lineChart = function (options) {
    var defaultOptions = {
        title: '',
        marks: [0, 20, 40, 60, 80, 100],
        showEndpoint: false,
        areaLabels: [
            {
                label: 'one',
                start: 0,
                end: 20
            },
            {
                label: 'two',
                start: 20,
                end: 40
            }
        ]
    }

    var opts = $.extend({}, defaultOptions, options);

    if (opts.width) {
        this.css({width: opts.width})
    }

    var length = opts.marks[opts.marks.length - 1] - opts.marks[0];
    var className = 'inputScroe';
    if (isNaN(opts.value) || opts.value === void(0)) {
        className = 'inpNull'
    }
    var dom = $('<div class="detailItem">' +
        ' <div class="detailItem_title">' + opts.title + ':</div>' +
        ' <div class="detailItem_proGray">' +
        '   <div class="detailItem_proBlue" >' +
        '     <div class=' + className + '>' + (isNaN(opts.value) || opts.value === void(0) ? '暂无数据' : opts.value) + '</div>' +
        '   </div>' +
        '  </div>' +
        '</div>'
    );

    if (opts.width) {
        dom.css({
            width: opts.width
        })
    }

    if (opts.color) {
        dom.find('.detailItem_proBlue').css({background: opts.color})
        dom.find('.inputScroe').css({color: opts.color})
    }


    var realValue = -1;
    var perAreaLength = 100 / (opts.marks.length + 1);//25
    for (var i = 0; i < opts.marks.length; i++) {
        var start = opts.marks[i];//2
        var end = opts.marks[i + 1]//6
        if (opts.value >= start && opts.value <= end) {
            realValue = perAreaLength + i * perAreaLength + perAreaLength * ((opts.value - start) / (end - start));
        }

        if (opts.value >= end && opts.value <= start) {
            realValue = perAreaLength + i * perAreaLength + perAreaLength * ((start - opts.value) / (start - end));
        }

    }
    if (realValue == -1) {
        if (opts.marks[0] < opts.marks[opts.marks.length - 1]) {
            realValue = opts.value < opts.marks[0] ? 10 : 100
        } else {
            realValue = opts.value < opts.marks[0] ? 100 : 10
        }
    }
    if (isNaN(opts.value) || opts.value == void(0)) {
        realValue = 0
    }
    dom.find('.detailItem_proBlue').css({
        width: realValue + '%'
    })

    for (var i = 0; i < opts.marks.length; i++) {
        if (opts.showEndpoint == false && (i == 0 || i == opts.marks.length - 1)) {

        } else {
            var item = '';
            if (isNaN(opts.marks[i]) || opts.marks[i] === null) {
                item = 'N';
            } else {
                item = opts.marks[i];
            }

            var label = opts.label ? opts.label(item) : item
            $('   <div class="proTip">' +
                '     <div class="proTipScore">' + label + '</div>' +
                '   </div>')
                .css({
                    left: (perAreaLength + i * perAreaLength) + '%'
                })
                .appendTo(dom.find('.detailItem_proGray'));
        }
    }

    for (i = 0; i < opts.areaLabels.length; i++) {
        var item = opts.areaLabels[i]
        $('<div class="areaName">' +
            item.label +
            '</div>')
            .css({
                left: i * perAreaLength + '%'
            }).appendTo(dom);
    }

    dom.appendTo(this);
    return this;
}