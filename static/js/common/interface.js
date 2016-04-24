'use strict';
/*global jQuery, $*/
/**
 * @description: 接口
 * @author: fangyuan(43726695@qq.com)
 * @update:
 */
var Inter = function() {
    return {
        getApiUrl: function() {
            return {
                /**
                 * 公司端接口 Start
                 */
                /*组织管理*/
                ogList: ued_conf.context+'/oglist', //组织管理
                ogQuery: ued_conf.context+'/datatable', //组织管理
                getUpOgSelData: ued_conf.context+'/select2', //得到上级组织数据
                getOgCharger: ued_conf.context+'/select2', //得到上级组织数据
                saveOgInfo: ued_conf.context+'/save', //保存组织信息
                enableOg: ued_conf.context+'/enableOg', //启用组织
                disableOg: ued_conf.context+'/disableOg', //停用组织
                ogEdit: ued_conf.context+'/ogedit', //组织编辑界面
                ogView: ued_conf.context+'/ogview', //组织编辑查看
                ogCreate: ued_conf.context+'/ogcreate', //创建组织界面


                /*员工管理*/
                empList: ued_conf.context+'/emplist', //员工管理
                empQuery: ued_conf.context+'/queryEmployee', //员工管理查询
                empLeave: ued_conf.context+'/employeeQuit', //员工离职
                empEdit: ued_conf.context+'/empedit', //员工编辑
                empView: ued_conf.context+'/empview', //员工查看
                empSave: ued_conf.context+'/saveEmployee', //员工编辑
                empAudit: ued_conf.context+'/datatable', //员工审核界面
                empAuditQuery: ued_conf.context+'/reviewQuery', //员工审核列表
                empPassOrNot: ued_conf.context+'/checkPassOrNot', //员工审核按钮
                empEditRecord: ued_conf.context+'/empeditrecord/{0}', //员工修改记录
                empEditRecordQuery: ued_conf.context+'/viewModifyRecord', //员工修改记录

                /*信息代改保存*/
                helpEditPage: ued_conf.context+'/emphelpeditlist', //信息代改保存 
                helpEditList: ued_conf.context+'/datatable', //员工代改界面
                helpEditQuery: ued_conf.context+'/employUpdateQuery', //员工列表查询
                empHelpEditSave: ued_conf.context+'/employUpdateSave', //员工代改保存

                /*账户管理*/
                accountPage: ued_conf.context+'/accountmanage', //我的账户的界面
                cashoutPage: ued_conf.context+'/cashout', //提现界面
                tradeRecordPage: ued_conf.context+'/traderecord', //交易记录界面

                tradeRecordsQuery: ued_conf.context+'/tradeRecordsQuery', //交易记录
                cashout: ued_conf.context+'/withdrawOperate', //提现操作

                getRemitListPage: ued_conf.context+'/remit/tance', //汇款管理列表页面
                getRemitRecords: ued_conf.context+'/remit/records', //汇款管理列表查询
                remitCreatePage: ued_conf.context+'/remit/create', //汇款管理创建页面
                remitEditPage: ued_conf.context+'/remit/edit/{0}', //汇款管理编辑页面
                uploadRemit: ued_conf.context+'/remit/upload', //汇款管理上传功能
                remitDetail: ued_conf.context+'/remit/detail/{0}', //汇款管理上传功能
                remitSave: ued_conf.context+'/remit/save', //添加功能

                /*工资发放*/

                uploadSalary: ued_conf.context+'/uploadFile', //上传工资模板
                getSalaryTemp: ued_conf.context+'/querySalaryModel', //获取工资模板
                getPayList: ued_conf.context+'/datatable', //获取工资发放界面
                getPayQuery: ued_conf.context+'/salaryManageQuery', //获取工资发放列表
                payOff: ued_conf.context+'/payoff', //工资发放
                delPayslip: ued_conf.context+'/delpayslip', //删除工资单

                //工资管理
                getSalaryList: ued_conf.context+'/datatable', //获取工资单
                getSalaryQuery: ued_conf.context+'/salaryManager', //获取工资单
                //工资查询
                getSalarySearchList: ued_conf.context+'/datatable', //工资查询列表
                getSalarySearchQuery: ued_conf.context+'/querySalary', //工资查询列表
                //工资异常
                getSalaryEx: ued_conf.context+'/salaryex', //工资
                getSalaryExQuery: ued_conf.context+'/exceptionProcess', //工资查询列表
                salaryPayAgain: ued_conf.context+'/datatable', //重新发放
                // saveSalaryTemp:'http://172.19.6.230:8060/company-application/saveSalaryModel',
                saveSalaryTemp: ued_conf.context+'/saveSalaryModel', //保存工资模板


                //银行选择
                branchBank: ued_conf.mPath+ '/bankInfo/serch', //开户行分行
                branchCity: ued_conf.mPath+ '/cityInfo/city',

                /*登录功能*/
                toLogin: ued_conf.context+'/toLogin', //登录界面
                loginUrl: ued_conf.context+'/login', //登录请求
                captchaUrl: ued_conf.context+'/getCode', //获取验证码
                captchaVal: ued_conf.context+'/validateCode', //获取验证码
                logout: ued_conf.context+'/logout', //等处功能
            };
        }
    };

}();
// jQuery(document).ready(function () {
//     Inter.getApiUrl(); // init metronic core componets
// });
