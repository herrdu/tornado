/**
 * Author:DuYutao
 * Date:2016-3-23
 * Description:工资列表
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initSalaryListPage = function() {

    //初始化datatable 列表
    var intiDataTable = function() {
        var table = $('#salarylist'),
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
                    "url": Inter.getApiUrl().getSalaryQuery,
                    "type": "POST",
                    "data": function(d) {
                        $('#searchForm').formatFormParam(d);
                    }
                },
                "rowId": 'id',
                "columns": [
                    { "data": "year" },
                    { "data": "month" },
                    { "data": "salaryModel" },
                    { "data": "companyName" },
                    { "data": "amount" },
                    { "data": "peopleNum" }, {
                        "data": "handle",
                        "class": "",
                        "defaultContent": '<a name="btnView" class="btn green" href="javascript:;"> 工资单 </a>'
                    }
                ],
                "order": [
                    [0, 'asc']
                ],
                "lengthMenu": [
                    [1, 5, 10, 15, 20, -1],
                    [1, 5, 10, 15, 20, "全部"] // change per page values here
                ],
                "columnDefs": [{
                    "targets": [6],
                    "render": function(data, type, row) {
                        var redata = row.detail ? '<a name="btnView" class="btn green" href="' + row.detail + '" target=""> 工资单 </a>' : '';
                        return redata;
                    }
                }],
                // set the initial value
                "pageLength": 5,
                "dom": "<'row' <'col-md-12'B>><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
                initComplete: function(settings, json) {
                    //初始化查询事件
                    $('#btnSearch').on('click', function(e) {
                        oTable.api().ajax.reload();
                    });

                    $('#salarylist').on('click', function(e) {
                        var $target = $(e.target),
                            tName = $target.attr('name'),
                            curRowId = $target.closest('tr').attr('id');

                        if (tName) {
                            switch (tName) {
                                case 'btnView':
                                    // window.location.href = './emphelpeditform?payslipId=' + curRowId;
                                    break;
                            }
                        }
                    });
                }
            });

        // $('#roleSearch').on('click', function(e) {
        //     e.preventDefault();
        //     oTable.api().ajax.reload();
        // });
        // $('#roleSearchClean').on('click', function(e) {
        //     e.preventDefault();
        //     $('#roleManageForm')[0].reset();
        // });
    }

    //初始年度下拉
    var initYearSel = function() {
        $('#selYear').select2({
            width: "100%",
            placeholder: "请选择年度",
            allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getArrYear()),
            theme: "bootstrap",
            minimumResultsForSearch: Infinity, //没有选择框
            // escapeMarkup: function(markup) {
            //     return markup;
            // }, // let our custom formatter work
            // minimumInputLength: 1,
        }).select2('val', null);
    }

    //初始月度下拉
    var initMonthSel = function() {
        $('#selMonth').select2({
            width: "100%",
            placeholder: "请选择年度",
            allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getArrMonth()),
            theme: "bootstrap",
            minimumResultsForSearch: Infinity, //没有选择框
            // escapeMarkup: function(markup) {
            //     return markup;
            // }, // let our custom formatter work
            // minimumInputLength: 1,
        }).select2('val', null);
    }

    //初始化模板的选择
    var initSalarySelect = function() {
        $('#selTemplate').select2({
            width: "100%",
            placeholder: "请选择年度",
            allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getSalaryConf('salaryTemplateType')),
            theme: "bootstrap",
            minimumResultsForSearch: Infinity, //没有选择框
            // escapeMarkup: function(markup) {
            //     return markup;
            // }, // let our custom formatter work
            // minimumInputLength: 1,
        }).select2('val', null);
    }

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
    var initSearchBtn = function() {}
    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().dataTable) {
                return;
            }
            initSalarySelect();
            initYearSel();
            initMonthSel();
            intiDataTable();
            initClearBtn();
        }
    };
}();

jQuery(document).ready(function() {
    initSalaryListPage.init();
});
