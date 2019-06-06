// 现状说明
let totalPointsArrany = ['企业没有明确地定义HRM(人力资源管理)工作，大多数的工作流程都是为解决某一事件而设计的，且再遇到相同事件时流程重复设计。 企业HRM主要停留在处理行政的琐事和基础报表上，偏离了真正的人力资源管理工作，且没有专人负责。员工流失率较高，同时流失技术和企业成本，削弱了企业的能力。', '已形成基本的人力资源管理意识，有专人负责基本工作，部分模块的工作流程已建立，但未与企业的实际情况结合在一起。员工基本问题不能得到及时有效的解决，问题反馈没有对应的窗口。培训只限于形式，没有结合员工实际工作需求。', '企业已初步建立人力资源部门，企业人力资源管理已初步与企业的经营活动结合在一起，将战略目标基本分解到各部门，已实行基本的绩效考核，但未进行量化；各岗位已明确工作职责，但工作只限于岗位说明书内容，使工作缺乏灵活性与效率；某一工作或指令执行后，没有Check机制，使部分问题一直在重复发生；员工个人的压力以及未来规划，未建立对口的部门。', '企业已基本建立力资源体系，缺乏持续改善的意识与活动；企业在实行战略变革时遇到一系列内部问题，不能及时调整；企业战略规划，在执行时出现偏差，没有预警机制，导致企业措手不及；企业在面临业务拓展等情况，没有事先做好人力资源预估与成本管控机制；企业文化只限于表面，没有使员工接受和运用企业文化。', '企业目前人力资源目前处于较好的发展水平，在行业内已有较先进的人力资源管理理念，各     模块要保持对先进理念的学习和探索，来牵引着企业发展，匹配企业战略规划。将员工职业生涯规划纳入管理范畴和企业发展规划中。此时，技术创新及组织变革的速度很快，需要建立持续发展人力资源组织，来快速匹配适合企业的人力资源需求。'];
// 建议说明   <p></p>
let suggestArrany = ['<p>明确区分人事与人力资源的概念，企业的管理者重视人力资源管理，根据企业的自身发展逐步建立人力资源部门；</p><p>主要方向：</p><p>1.逐步建立招聘流程，明确各部门的工作职责；</p><p>2.逐步建立培训管理流程，确保员工具备完成任务所需的基本能力；</p><p>3.逐步建立薪酬策略，使员工对企业的付出与价值受到相对公平的回报；</p><p>4.逐步建立绩效管理与各部门业绩指标；</p><p>5.逐步建立沟通与协调机制，使员工具有分享信息和有效协调的意识，促进团队共同成长；</p>', '<p>整合各资源与企业的经营活动结合在一起，从而获得竞争优势。</p><p>主要方向：</p><p>1.逐步完善各岗位工作分析，明确定义各岗位的工作职责与所需要具备的知识、能力、技能。</p><p>2. 完善培训管理制度，从员工实际需求出发，重视职业培养，完善培训效果评估流程。</p><p>3. 逐步建立员工关系，完善沟通反馈流程，使员工的反馈的问题得到及时的解决，增强员工的被认同感。</p>', '<p>健全人力资源各模块体系的建立，完善人力资源管理流程；</p><p>主要方向：</p><p>1. 将不同的人力资源能力集成，相互提高工作的效率和灵活性。</p><p>2. 建立稽核小组，赋予工作小组责任，由他们及时Check工作或指令完成情况。</p><p>3. 量化绩效管理，转化为可实现、可预测的绩效目标。 </p><p>4.完善员工关系体系，建立并完善沟通反馈流程，将员工职业生涯规划纳入中高层管理者范畴和企业发展规划中； </p><p>5. 建立企业文化，通过企业文化潜移默化的影响，使公司的员工接受共同价值观，把思想、行为引导到实现企业目标上来。</p>', '<p>建立持续改善组织与体系，企业流程可自发地不断改进，有效防止同类缺陷二次出现，同时，企业员工能够在获得授权的情况下继续提高工作流程并为流程优化提出变革建议。</p><p>主要方向：</p><p>1. 企业实施战略变革时，能够及时有效进行组织优化、再造，解决问题冲突；</p><p>2.企业战略规划时，需要考虑到预警机制、及时调整措施，且有双向监控和逻辑逆推审查机制，对实施过程进行实时监控，确保正确导向战略目标。</p><p>3. 建立并完善企业人力资源成本管控机制，从企业取得成本、开发成本、离职成本、使用成本等分析效益比</p>', ''];
$(function () {
    _questData();
    // _radar()
})

function _questData() {
    app.DataRequest(URL + 'companyHrmiRoll/lookHrmiRoll', {
        id: localStorage.getItem('createHRID')
    }, function (err) {}, function (data) {
        console.log(data)
        if (data.status != 1) {
            return;
        }
        if (data.status == 1) {
            // 基本信息
            $('#companyName').text(data.companyHrmiRoll.evaluatingCompanyName);
            $('#evaluatingPeople').text(data.companyHrmiRoll.evaluatingPeople);
            $('#evaluatingTime').text(formatDate(data.companyHrmiRoll.evaluatingTime));
            $('#evaluatingJob').text(data.companyHrmiRoll.job);
            $('#evaluatingType').text(data.companyHrmiRoll.evaluatingType == 0 ? '企业评测' : '专家评测');

            // 评测结果
            let backgroundColor = '';
            if (data.companyHrmiRoll.evaluatingLevel == '1') {
                backgroundColor = '#bea5ee';
                $('.grade_one').addClass('grade_active').find('span:first').css({
                    'backgroundColor': backgroundColor,
                    'marginLeft': '-1px'
                });

            } else if (data.companyHrmiRoll.evaluatingLevel == '2') {
                backgroundColor = '#b0a8ef';
                $('.grade_two').addClass('grade_active').find('span:first').css({
                    'backgroundColor': backgroundColor,
                    'marginLeft': '-1px'
                });

            } else if (data.companyHrmiRoll.evaluatingLevel == '3') {
                backgroundColor = '#99aeec';
                $('.grade_three').addClass('grade_active').find('span:first').css({
                    'backgroundColor': backgroundColor,
                    'marginLeft': '-1px'
                });

            } else if (data.companyHrmiRoll.evaluatingLevel == '4') {
                backgroundColor = '#74c2e1';
                $('.grade_four').addClass('grade_active').find('span:first').css({
                    'backgroundColor': backgroundColor,
                    'marginLeft': '-1px'
                });

            } else if (data.companyHrmiRoll.evaluatingLevel == '5') {
                backgroundColor = '#95aaef';
                $('.grade_five').addClass('grade_active').find('span:first').css({
                    'backgroundColor': backgroundColor,
                    'marginLeft': '-1px'
                });

            }

            //  圆盘的背景颜色
            $('#disk_three').css('backgroundColor', backgroundColor);

            // 圆盘右侧半圆环的颜色
            $('.disk_one_before').css({
                'border': '3px solid ' + backgroundColor,
                'borderTop': 'transparent',
            });

            // 边缘小圆圈的颜色
            $('.grade_one>span:first').css('border', '5px solid ' + backgroundColor);
            $('.grade_two>span:first').css('border', '5px solid ' + backgroundColor);
            $('.grade_three>span:first').css('border', '5px solid ' + backgroundColor);
            $('.grade_four>span:first').css('border', '5px solid ' + backgroundColor);
            $('.grade_five>span:first').css('border', '5px solid ' + backgroundColor);

            $('#total_points').text(data.companyHrmiRoll.score);
            $('#evaluatingLever').text('评级：' + data.companyHrmiRoll.evaluatingLevel + '级');
            $('#current_situation').html(totalPointsArrany[parseInt(data.companyHrmiRoll.evaluatingLevel) - 1]);
            $('#suggest').html(suggestArrany[parseInt(data.companyHrmiRoll.evaluatingLevel) - 1]);

            // 模块评测分布
            let radarLable = new Array();
            let radarExpect = new Array();
            let radarScore = new Array();

            let list = data.companyHrmiRoll.companyHrmiNormList;
            for (let i = 0; i < list.length; i++) {
                radarLable.push({
                    text: list[i].quotaName,
                    max: 5
                });

                radarExpect.push(list[i].expect);
                radarScore.push(list[i].actuality);
            }
            _radar(radarLable, radarExpect, radarScore);


            // 模块评测详情
            let particularsTbodyHTML = '';
            for (let i = 0; i < list.length; i++) {
                particularsTbodyHTML += '<tr>';
                particularsTbodyHTML += '<td style="display:table-cell; vertical-align:middle">' + (i + 1) + '</td>';
                particularsTbodyHTML += '<td style="display:table-cell; vertical-align:middle">' + list[i].quotaName + '</td>';
                particularsTbodyHTML += '<td style="display:table-cell; vertical-align:middle">' + list[i].actuality + '</td>';
                particularsTbodyHTML += '<td style="display:table-cell; vertical-align:middle">' + list[i].expect + '</td>';
                particularsTbodyHTML += '<td style="width:500px;height:100px;overflow: hidden;text-overflow: ellipsis;text-align: left;"title="' + list[i].remark + '">' + list[i].remark + '</td>';
                particularsTbodyHTML += '</tr>';
            }
            $('#particulars_tbody').html(particularsTbodyHTML);


            // 综合说明
            $('#comprehensive').text(data.companyHrmiRoll.synthesizeRemark);

        }
    })



}


// 雷达图  双数据
function _radar(radarLable, radarExpect, radarScore) {
    var domAirRadar = document.getElementById('distribution');
    var myChartAirRadar = echarts.init(domAirRadar);
    option = {
        color: ['#11b55a', '#4445d9'],
        legend: {
            orient: 'vertical',
            selectedMode: false,
            itemGap: 25,
            right: '35%',
            top: '40%',
            data: [{
                name: '目标',
                icon: 'line'
            }, {
                name: '现状',
                icon: 'line'
            }],
        },
        radar: [{
            indicator: radarLable,
            center: ['40%', '50%'],
            radius: 120
        }],
        series: [{
            name: '成绩单',
            type: 'radar',
            data: [{
                    value: radarExpect,
                    name: '目标',
                    label: {
                        normal: {
                            show: true,
                            formatter: function (params) {
                                return params.value;
                            }
                        }
                    }
                },
                {
                    value: radarScore,
                    name: '现状',
                    label: {
                        normal: {
                            show: true,
                            formatter: function (params) {
                                return params.value;
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.5,
                            color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
                                    color: '#ffffff',
                                    offset: 0
                                },
                                {
                                    color: '#4445d9',
                                    offset: 1
                                }
                            ])
                        }
                    }
                }
            ]
        }]
    }
    myChartAirRadar.setOption(option, true);
}