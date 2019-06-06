
 interface Demensions21 {
    companyEvaluatingRoll: CompanyEvaluatingRoll;
}

interface CompanyEvaluatingRoll {
    id: string;//
    evaluatingCompany: string;//评测公司
    evaluatingCompanyName: string;//评测公司名称
    job: string;//岗位
    writeCompany: string;//填写公司 /测评人
    writeCompanyName: string;//填写公司名称
    evaluatingTime: number;//填写时间
    evaluatingAddress: string;//填写地址
    evaluatingType: string;//评测类型(0企业1专家)
    synthesizeRemark: string;//综合评价
    questionRollId: string;//问卷id
    createTime: number;//
    updateTime: number;//
    flag: string;//状态(0未完成1完成)
    score: string;//得分
    evaluatingPeople:string ; //评测人
    evaluatingLevel: string;//评价等级
    detailLists: Array<CompanyEvaluatingDetail>//评测问题（多个）
}
interface CompanyEvaluatingDetail {
    actuality:string;
    context:string;
    id: string;//
    companyEvaluatingRollId: string;//公司维度卷id
    questionId: string;//问题id
    sort: string;//排序
    actuality: string;//现状
    expect: string;//期望
    remark;//评价说明
    createTime: number;//
    updateTime: number;//
    score: string;//得分
    expectScore: string;//目标得分
    questionChooseList: Array<QuestionChoose>;//问题选项（多个）
}


