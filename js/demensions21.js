String.prototype.slim = function (length) { return this.substr(0, length) };
const limitedLength = 16;

const GRADE = [{ level: "优秀", rate: 0.93 },
{ level: "良好", rate: 0.63 },
{ level: "一般", rate: 0.334 },
{ level: "&nbsp;&nbsp;差", rate: 0.01 }];
class EvaluationIndicator {
    constructor(level) {
        this.grade = GRADE;
        this.HEIGHT = 156;
        this.section = 4;
        this.currentSection = 0;

        this.AdjustBallUp = 72;
        this.AdjustTrigngleUp = -9;
        this.AdjustLevelUp = -2;

        this.ballEle = "ball";
        this.progressFrontEle = "progressFront";
        this.uiLevelEle = "ulLevel";
        this.triangleEle = "triangle";
        this.levelEle = "level";

        this.totalScore = 105;//总分

        var curGrade = this.getGrade(level);
        this.initial(curGrade)
    }
    //根据积分做数据转行
    getGrade(level) {
        switch (level) {
            case "1": return GRADE[3];
            case "2": return GRADE[2];
            case "3": return GRADE[1];
            case "4": return GRADE[0];
        }
        return GRADE[3];
        // if (level > 105 || level < 0)
        //     return GRADE[3];    //报错了不及格

        // var rate = level / this.totalScore;
        // if (rate <= GRADE[3].rate)
        //     return GRADE[3];

        // if (rate >= GRADE[3].rate && rate < GRADE[2].rate)
        //     return GRADE[2];

        // if (rate >= GRADE[2].rate && rate < GRADE[1].rate)
        //     return GRADE[1];

        // if (rate >= GRADE[1].rate)
        //     return GRADE[0];
    }
    initial(grade) {
        var eleBall = $(`#${this.ballEle}`);
        var eleProgs = $(`#${this.progressFrontEle}`);
        var eleLevel = $(`#${this.uiLevelEle}`);
        var triangleLevel = $(`#${this.triangleEle}`);
        var levelLevel = $(`#${this.levelEle}`);

        var currentHeight = this.HEIGHT * grade.rate;

        eleBall.css("bottom", currentHeight + this.AdjustBallUp);
        eleProgs.css("height", currentHeight);
        eleProgs.css("bottom", parseInt(eleProgs.css("bottom")) - (this.HEIGHT - currentHeight));
        triangleLevel.css("bottom", parseInt(triangleLevel.css("bottom")) + currentHeight + this.AdjustTrigngleUp);
        levelLevel.css("bottom", parseInt(levelLevel.css("bottom")) + currentHeight + this.AdjustLevelUp);

        this.grade.forEach((val) => {
            if (grade.level === val.level)
                eleLevel.append(`<li style="color:white;">${val.level}</li>`);
            else
                eleLevel.append(`<li>${val.level}</li>`);
        })
    }
}
$(() => {
    {
        let relatedId = localStorage.getItem('companyEvaluatingRollID');
        if (relatedId === null || relatedId === undefined) {
            alert("加载数据接口失败");
            console.warn("let relatedId = localStorage.getItem('companyEvaluatingRollID'); author liuwenju");

        }
        let params = { id: relatedId };

        app.DataRequest(URL + 'companyEvaluatingRoll/lookEvaluating', params, function (err) { },
            (msg //:Demensions21[]
            ) => {

                var companyEvaluatingRoll = msg[0].companyEvaluatingRoll;

                if (companyEvaluatingRoll.status == 1) {
                    console.warn(companyEvaluatingRoll);
                }
                // console.warn(companyEvaluatingRoll);
                //創建頭部介紹内容
                {
                    $("#introduce").append(`
                        <li>
                        <span>评测单位 :</span>
                        <span>${companyEvaluatingRoll.evaluatingCompanyName === undefined ?
                            '' : companyEvaluatingRoll.evaluatingCompanyName.slim(limitedLength)}</span>
                        </li>
                        <li>
                            <span>测评日期 :</span>
                            <span>${formatDate(companyEvaluatingRoll.evaluatingTime, false).slim(24)}</span>
                        </li>
                        <li>
                            <span>企业类型 :</span>
                            <span>${companyEvaluatingRoll.evaluatingType == "0" ? "企业测评".slim(limitedLength) : "专家测评".slim(limitedLength)}</span>
                        </li>
                        <li>
                            <span>测评地点 :</span>
                            <span>${companyEvaluatingRoll.evaluatingAddress.slim(limitedLength)}</span>
                        </li>
                        <li>
                            <span>测评人 :</span>
                            <span>${companyEvaluatingRoll.evaluatingPeople.slim(limitedLength)}
    
                            </span>
                        </li>
                        <li>
                            <span>测评人岗位 :</span>
                            <span>${companyEvaluatingRoll.job.slim(limitedLength)}</span>
                        </li>`);
                }

                $("#synthesizeRemark").html(companyEvaluatingRoll.synthesizeRemark.substr(0, 300));
                $("#synthesizeRemark").attr("title", companyEvaluatingRoll.synthesizeRemark);

                if (companyEvaluatingRoll.score >= 100) {
                    $("#currentScore").css("font-size", "46px");
                }
                $("#currentScore").html(companyEvaluatingRoll.score + '/');


                setTimeout(() => {
                    new EvaluationIndicator(companyEvaluatingRoll.evaluatingLevel);

                }, 20);

                let indicator = [];
                let currentValue = [];
                let expectionValue = [];
                for (let index = 0; index < companyEvaluatingRoll.detailLists.length; index++) {
                    var item = companyEvaluatingRoll.detailLists[index];

                    indicator.push({ name: item.context, max: 6 });
                    let ranValue = Math.round(Math.random() * 5);
                    currentValue.push(item.score);
                    expectionValue.push(item.expectScore);
                }
                var values = [];
                values.push({
                    value: currentValue, name: '现状阶段',
                    label: {
                        normal: {
                            show: true,
                            formatter: function (params) {
                                return params.value;
                            }
                        }
                    },
                });
                values.push({
                    value: expectionValue, name: '目标阶段', 
                    label: {
                        normal: {
                            show: true,
                            formatter: function (params) {
                                return params.value;
                            }
                        }
                    },
                });
                radar("radar", indicator, values);

                //创建表格数据
                {
                    let firstTdStyle = `style="background:#eef1fc;text-align: center;" `;
                    $("#tbody").append(`
                        <tr >
                            <td style="width:60px; background:#eef1fc;" ${firstTdStyle}>序号</td>
                            <td style="width:240px;">纬度</td>
                            <td style="width:100px;">当前阶段</td>
                            <td style="width:100px;">目标阶段</td>
                            <td>评测说明</th>
                        </tr>
                        `);
                    for (let index = 0; index < companyEvaluatingRoll.detailLists.length; index++) {
                        let marker = companyEvaluatingRoll.detailLists[index].remark;
                        $("#tbody").append(`
                            <tr>
                                <td ${firstTdStyle}>${index + 1}</td>
                                <td>${companyEvaluatingRoll.detailLists[index].context}</td>
                                <td>${companyEvaluatingRoll.detailLists[index].score}</td>
                                <td>${companyEvaluatingRoll.detailLists[index].expectScore}</td>
                                <td title="${marker}">${marker.length > 50 ? (marker.substr(0, 50) + '...') : marker}</td>
                            </tr>`);
                    }
                }
            })
    }
})

