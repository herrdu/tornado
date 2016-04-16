/**
 * 公司端配置文件
 * @type {Object}
 * 调用形式：com_Conf.getSalaryConf('salaryTemplateType')
 */
var com_Conf = function() {
    return {
        systemDate: '2014-01-01',
        getSalaryConf: function(key) {
            var re;
            switch (key) {
                case 'salaryTemplateType':
                    //工资模板类型配置文件
                    re = { 1: '月工资模板', 2: '奖金模板', 3: '福利模板' };
                    break;
                case 'fixedItems':
                    //模板中的固定的数据
                    re = { basic: ['姓名', '证件编号', '税后工资'], salary: [], fund: [] };
                    break;
                case 'tempItems':
                    //默认模板
                    re = {
                        basic: ['姓名', '证件编号', '税后工资'],
                        salary: ['年度', '月度', '税后工资', '本月应发总额', '扣税基数', '工资个人所得税'],
                        fund: ['公积金基数', '社保基数', '公积金-个人', '养老-个人', '医疗-个人', '失业-个人', '社保及住房个人部分小记', '公积金-公司', '养老-公司', '医疗-公司', '失业-公司', '工商-公司', '生育-公司', '社保及住房公司部分小记', '备注']
                    };
                    break;
                    // case ''
            }
            return re;
        },
        getCertificateTyep: function() { //证件类型
            return { 1: '身份证', 2: '军官证/警官证', 3: '户口本', 4: '护照', 5: '临时证件' };
        },
        getEmpStatus: function() { //员工状态
            return { 1: '新增', 2: '启用', 3: '禁用' };
        },
        getEmpAuditStatus: function() { //员工审核状态
            return { 1: '未审核', 2: '通过', 3: '不通过' };
        },
        getEmpValidateStatus: function() { //员工验证状态
            return { 1: '通过', 2: '异常' };
        },
        getPayStatus: function() { //工资发放状态
            return {"SUCCESS":"成功","FAILURE":"失败","INPROGRESS":"进行中","ABORT":"废弃","PREPARED":"待发放"}
        },
        getArrYear: function() { //年度
            var curdate = '2016-03-25 22:10:10';
            var curYear = curdate.split(' ')[0].split('-')[0],
                startYear = com_Conf.systemDate.split('-')[0],
                objYear = {};
            while (startYear <= curYear) {
                objYear[startYear] = startYear;
                startYear = (startYear * 1 + 1).toString();
            }
            console.log(objYear);
            return objYear;
        },
        getArrMonth: function() { //月度
            return { 1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06', 7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12' };
        },
        getOgStatus: function() { //组织状态
            return { 1: '启用', 2: '停用' };
        },
        getBusiType: function() { //业务类型
            // CONSUME,SALARY,TRANSFER,FUND,REFUND,WITHDRAW,DEPOSIT,FROZEN,INNERTRANSFER,DUEPAYOFF
            return {"CONSUME":"不知道","SALARY":"工资","TRANSFER":"转账","FUND":"基金","REFUND":"不知道","WITHDRAW":"提现","DEPOSIT":"不知道","FROZEN":"冻结","INNERTRANSFER":"内部转账","DUEPAYOFF":"不知道"}
            // return { 1: '充值', 2: '提现', 3: '消费' }
        },
        getTradeStatus: function() { //交易状态
            //SUCCESS,FAILED,INPROGRESS,ABORT,PREPARED
            return {"SUCCESS":"成功","FAILED":"失败","INPROGRESS":"进行中","ABORT":"停止","PREPARED":"准备中"}
            // return { 1: '正常', 2: '异常' }
        },
        getOgName: function() { //所属组织
            return { 1: '人力部', 2: '财务部' }
        },
        getRemitType: function() { //汇款方式
            return { 1: '现金汇款', 2: '银行转账' }
        },
        getRemitStatus: function() { //汇款状态
            return { 'SUCCESS': '成功', 'INPROGRESS': '处理中','FAILED':'失败' }
        },
    }
}();
