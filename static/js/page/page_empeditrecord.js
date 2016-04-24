/**
 * Author:DuYutao
 * Date:2016-3-23
 * Description:员工修改记录列表
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initEmpEditRecordPage = function() {

    //初始化datatable 列表
    var initTable = function() {
        var table = $('#editRecorList'),
            oTable = table.dataTable({
                'buttons': [],
                // data: [
                //     ['0001', '联合智信', '北京市朝阳区', '正常', '备注', '操作'],
                //     ['0001', '联合智信', '北京市朝阳区', '正常', '备注', '操作']
                // ],
                'searching': false,
                // setup responsive extension: http://datatables.net/extensions/responsive/
                'responsive': false,
                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

                "ordering": false, //disable column ordering,
                "paging": true, //disable pagination
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": Inter.getApiUrl().empEditRecordQuery,
                    "type": "POST",
                    "data": function(d) {
                        d.id=$('#recordId').val();
                        // $('#editRecorList').formatFormParam(d);
                    }
                },
                "rowId": 'id',
                "columns": [
                    { "data": "userCode" },
                    { "data": "userName" },
                    { "data": "lawNo" },
                    { "data": "editField" },
                    { "data": "valueBefore" },
                    { "data": "valueAfter" },
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
                initComplete: function(settings, json) {}
            });
        $('#btnSearch').on('click', function(e) {
            e.preventDefault();
            oTable.api().ajax.reload();
        });
    }

    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().dataTable) {
                return;
            }
            initTable();
        }
    };
}();

jQuery(document).ready(function() {

    initEmpEditRecordPage.init();
});
