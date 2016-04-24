/**
 * Author:DuYutao
 * Date:2016-3-25
 * Description:工资异常列表
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initSalaryExListPage = function() {

    //初始化datatable 列表
    var intiDataTable = function() {
        var table = $('#salaryExList'),
            oTable = table.dataTable({
                'buttons': [],
                'searching': false,
                // setup responsive extension: http://datatables.net/extensions/responsive/
                'responsive': false,
                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

                "ordering": false, //disable column ordering,
                "paging": true, //disable pagination
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": Inter.getApiUrl().getSalaryExQuery,
                    "type": "POST",
                    "data": function(d) {
                        $('#searchForm').formatFormParam(d);
                        d.orderNo = Util.location().orderNo;
                    }
                },
                "rowId": 'id',
                "columns": [
                    { "data": "username" },
                    { "data": "lawNum" },
                    { "data": "amount" },
                    { "data": "payDate" },
                    { "data": "companyName" },
                    { "data": "status" },
                    // {
                    //     "data": "payAgain",
                    //     "class": "",
                    //     "orderable": false,
                    //     "defaultContent": '<a name="btnPayagain" class="btn btn-primary" href="javascript:;"> 重新发放 </a>'
                    // }
                ],
                "columnDefs": [{
                    "targets": [5],
                    "render": function(data, type, row) {
                        var objStatus = com_Conf.getPayStatus();
                        return objStatus[data];
                    }
                }],
                "order": [
                    [0, 'asc']
                ],
                "lengthMenu": [
                    [1, 5, 10, 15, 20, -1],
                    [1, 5, 10, 15, 20, "全部"] // change per page values here
                ],
                // set the initial value
                "pageLength": 10,
                "dom": "<'row' <'col-md-12'B>><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
                initComplete: function(settings, json) {
                    //初始化查询事件
                    $('#btnSearch').on('click', function(e) {
                        oTable.api().ajax.reload();
                    });

                    table.on('click', function(e) {
                        e.preventDefault();
                        var $target = $(e.target),
                            tName = $target.attr('name'),
                            curRowId = $target.closest('tr').attr('id');

                        if (tName) {
                            switch (tName) {
                                case 'btnPayagain':
                                    e.stopPropagation();
                                    $target.addClass('disabled');
                                    Util.setAjax(Inter.getApiUrl().salaryPayAgain, { 'empId': 1, 'payslipId': 1 }, function(json) {
                                        if (json.success) {
                                            oTable.api().ajax.reload();

                                        } else {
                                            $target.removeClass('disabled');
                                            bootbox.alert(json.errMsg);
                                        }
                                    }, function() {
                                        $target.removeClass('disabled');
                                    });
                                    break;
                            }
                        }
                    });
                }
            });
        $('#btnSearch').on('click', function(e) {
            e.preventDefault();
            oTable.api().ajax.reload();
        });
    }

    // //初始年度下拉
    // var initYearSel = function() {
    //     var arrYear = com_Conf.getArrYear(),
    //         arrHtml = ['<option value="">请选择</option>'];
    //     for (var i = 0; i < arrYear.length; i++) {
    //         arrHtml.push('<option value="' + arrYear[i] + '">' + arrYear[i] + '</option>')
    //     }
    //     $('#selYear').empty().append(arrHtml.join(''));
    // }

    // //初始月度下拉
    // var initMonthSel = function() {
    //     var arrMonth = com_Conf.getArrMonth(),
    //         arrHtml = ['<option value="">请选择</option>'];
    //     for (var i = 0; i < arrMonth.length; i++) {
    //         arrHtml.push('<option value="' + arrMonth[i] + '">' + arrMonth[i] + '</option>')
    //     }
    //     $('#selMonth').empty().append(arrHtml.join(''));
    // }

    // //初始化模板的选择
    // var initSalarySelect = function() {
    //     var arrOptions = ['<option value="">请选择</option>'],
    //         objConf = com_Conf.getSalaryConf('salaryTemplateType');
    //     for (var key in objConf) {
    //         arrOptions.push('<option value="' + key + '">' + objConf[key] + '</option>');
    //     }
    //     $('#selTemplate').empty().append(arrOptions.join(''));
    // }

    //初始化清空按钮
    var initClearBtn = function() {
        $('#btnClear').on('click', function(e) {
            e.preventDefault();
            $('#searchForm')[0].reset();
            $('.select2-hidden-accessible').each(function(i, e) {
                $(this).select2('val', null);
            });
        })
    }

    //初始时间选择空间
    var initDatePicker = function() {
        $('.date-picker').datepicker({
            orientation: "right",
            autoclose: true,
            language: "zh-CN",
            format: "yyyy-mm-dd",
        });
    };
    var initSearchBtn = function() {}
    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().dataTable) {
                return;
            }
            initDatePicker();
            // initSalarySelect();
            // initYearSel();
            // initMonthSel();
            intiDataTable();
            initClearBtn();
        }
    };
}();

jQuery(document).ready(function() {
    initSalaryExListPage.init();
});
