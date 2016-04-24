/**
 * Author:DuYutao
 * Date:2016-3-25
 * Description:工资查询
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initSalarySearchPage = function() {

    //初始化datatable 列表
    var initDataTable = function() {
        var table = $('#salaryList'),
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
                    "url": Inter.getApiUrl().getSalarySearchQuery,
                    "type": "POST",
                    "data": function(d) {
                        $('#searchForm').formatFormParam(d);
                    }
                },
                "rowId": 'id',
                "columns": [
                    { "data": "username" },
                    { "data": "lawNum" },
                    { "data": "salary" },
                    { "data": "payDate" },
                ],
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
                }
            });


    };
    //初始化清空按钮
    var initClearBtn = function() {
        $('#btnClear').on('click', function(e) {
            e.preventDefault();
            $('#searchForm')[0].reset();
        })
    };

    //初始时间选择空间
    var initDatePicker = function() {
        $('.date-picker').datepicker({
            orientation: "right",
            autoclose: true,
            language: "zh-CN",
            format: "yyyy-mm-dd",
        });
    };

    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().dataTable) {
                return;
            }
            initDataTable();
            initClearBtn();
            initDatePicker();
        }
    };
}();


jQuery(document).ready(function() {

    initSalarySearchPage.init();
});
