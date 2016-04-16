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
                ogList: '/company-application/oglist', //组织管理
                ogQuery: '/company-application/datatable', //组织管理
                getUpOgSelData: '/company-application/select2', //得到上级组织数据
                getOgCharger: '/company-application/select2', //得到上级组织数据
                saveOgInfo: '/company-application/save', //保存组织信息
                enableOg: '/company-application/enableOg', //启用组织
                disableOg: '/company-application/disableOg', //停用组织
                ogEdit: '/company-application/ogedit', //组织编辑界面
                ogView: '/company-application/ogview', //组织编辑查看
                ogCreate: '/company-application/ogcreate', //创建组织界面


                /*员工管理*/
                empList: '/company-application/emplist', //员工管理
                empQuery: '/company-application/queryEmployee', //员工管理查询
                empLeave: '/company-application/employeeQuit', //员工离职
                empEdit: '/company-application/empedit', //员工编辑
                empView: '/company-application/empview', //员工查看
                empSave: '/company-application/saveEmployee', //员工编辑
                empAudit: '/company-application/datatable', //员工审核界面
                empAuditQuery: '/company-application/reviewQuery', //员工审核列表
                empPassOrNot: '/company-application/checkPassOrNot', //员工审核按钮
                empEditRecord: '/company-application/empeditrecord/{0}', //员工修改记录
                empEditRecordQuery: '/company-application/viewModifyRecord', //员工修改记录
                helpEditList: '/company-application/datatable', //员工代改界面
                helpEditQuery: '/company-application/employUpdateQuery', //员工列表查询
                empHelpEditSave: '/company-application/employUpdateSave', //员工代改保存

                /*账户管理*/
                tradeRecordsQuery: '/company-application/tradeRecordsQuery', //交易记录
                cashout: '/company-application/withdrawOperate', //提现操作
                accountPage: '/company-application/accountmanage', //我的账户的界面

                getRemitListPage: '/company-application/remit/tance', //汇款管理列表页面
                getRemitRecords: '/company-application/remit/records', //汇款管理列表查询
                remitCreatePage: '/company-application/remit/create', //汇款管理创建页面
                remitEditPage: '/company-application/remit/edit/{0}', //汇款管理编辑页面
                uploadRemit: '/company-application/remit/upload', //汇款管理上传功能
                remitDetail: '/company-application/remit/detail/{0}', //汇款管理上传功能
                remitSave: '/company-application/remit/save', //添加功能

                /*工资发放*/

                uploadSalary: '/company-application/uploadFile', //上传工资模板
                getSalaryTemp: '/company-application/querySalaryModel', //获取工资模板
                getPayList: '/company-application/datatable', //获取工资发放界面
                getPayQuery: '/company-application/salaryManageQuery', //获取工资发放列表
                payOff: '/company-application/payoff', //工资发放
                delPayslip: '/company-application/delpayslip', //删除工资单

                //工资管理
                getSalaryList: '/company-application/datatable', //获取工资单
                getSalaryQuery: '/company-application/salaryManager', //获取工资单
                //工资查询
                getSalarySearchList: '/company-application/datatable', //工资查询列表
                getSalarySearchQuery: '/company-application/querySalary', //工资查询列表
                //工资异常
                getSalaryEx: '/company-application/salaryex', //工资
                getSalaryExQuery: '/company-application/exceptionProcess', //工资查询列表
                salaryPayAgain: '/company-application/datatable', //重新发放
                // saveSalaryTemp:'http://172.19.6.230:8060/company-application/saveSalaryModel',
                saveSalaryTemp: '/company-application/saveSalaryModel', //保存工资模板


                //银行选择
                branchBank: 'http://localhost:8083/cbip-m-web/bankInfo/serch', //开户行分行
                branchCity: 'http://localhost:8083/cbip-m-web/cityInfo/city',

                /*登录功能*/
                toLogin: '/company-application/toLogin', //登录界面
                loginUrl: '/company-application/login', //登录请求
                captchaUrl: '/company-application/getCode', //获取验证码
                captchaVal: '/company-application/validateCode', //获取验证码
                logout: '/company-application/logout', //等处功能
            };
        }
    };

}();
// jQuery(document).ready(function () {
//     Inter.getApiUrl(); // init metronic core componets
// });
