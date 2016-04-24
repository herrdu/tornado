/**
 * Author:DuYutao
 * Date:2016-3-23
 * Description:员工审核
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initEmpAuditPage = function() {

    //初始化datatable 列表
    var initTable = function() {
        var table = $('#emplist'),
            oTable = table.dataTable({
                'buttons': [],
                // data: [
                //     ['0001', '联合智信', '北京市朝阳区', '正常', '备注', '操作'],
                //     ['0001', '联合智信', '北京市朝阳区', '正常', '备注', '操作']
                // ],
                'searching': false,
                // setup responsive extension: http://datatables.net/extensions/responsive/
                'responsive': false,
                //"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

                "ordering": false, //disable column ordering,
                "paging": true, //disable pagination
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": Inter.getApiUrl().empAuditQuery,
                    "type": "POST",
                    "data": function(d) {
                        $('#searchForm').formatFormParam(d);
                    }
                },
                "rowId": 'id',
                "columns": [
                    { "data": "userCode" },
                    { "data": "userName" },
                    { "data": "lawNo" },
                    { "data": "telephone" },
                    { "data": "organize" },
                    { "data": "remark" },
                    { "data": "status" }, {
                        "class": "",
                        "orderable": false,
                        "data": 'handler',
                        "defaultContent": ['<a href="javascript:;" name="btnView" class="btn btn-success">查看</a>',
                            '<a href="javascript:;" class="btn btn-primary" name="btnPass">通过</a>',
                        ].join('')
                    }, { "data": "userId", visible: false }
                ],
                "columnDefs": [{
                    "targets": [6],
                    "render": function(data, type, row) {
                        var objStatus = com_Conf.getEmpAuditStatus();
                        return objStatus[data];
                    }
                }, {
                    "targets": [7],
                    "render": function(data, type, row) {
                        // console.group(row);
                        var redata = ['<a href="javascript:;" name="btnView" class="btn btn-success">查看</a>'];
                        if (row.status == 0) {
                            redata.push('<a href="javascript:;" class="btn btn-primary" name="btnPass" data-userid="' + row.userId + '">通过</a>');
                            redata.push('<a href="javascript:;" class="btn btn-default" name="btnNoPass" data-userid="' + row.userId + '">不通过</a>');
                        }
                        return redata.join('');
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

                    $('#emplist').on('click', function(e) {
                        e.preventDefault();
                        var domName = $(e.target).attr('name'),
                            $curRow = $(e.target).closest('tr'),
                            curRowId = oTable.api().row($curRow[0]).id();
                        switch (domName) {
                            case 'btnView':
                                // window.location.href = Util.strFormat(Inter.getApiUrl().empEditRecord, [curRowId]);
                                window.location.href = Util.strFormat(Inter.getApiUrl().empEditRecord, [curRowId]);
                                break;
                            case 'btnPass':
                                var userId = $(e.target).data("userid");
                                $.post(Inter.getApiUrl().empPassOrNot, { userId: userId, auditStatus: "2" }, function(json) {
                                    if (json.success) {
                                        oTable.fnUpdate('<a href="javascript:;" name="btnView" class="btn btn-success">查看</a><a href="javascript:;" class="btn btn-danger" name="btnNoPass">不通过</a>', $curRow, 7, false);
                                        oTable.fnUpdate('正常', $curRow, 6, false);
                                    } else {
                                        $(this).find('.btn').prop('disabled', false);
                                        bootbox.alert(json.errMsg);
                                    }
                                }, 'JSON')

                                // Util.setAjax(Inter.getApiUrl().empPassOrNot, { userId: curRowId, auditStatus: 2 }, function(data) {

                                // }, function() {});

                                break;
                            case 'btnNoPass':
                                var userId = $(e.target).data("userid");
                                $.post(Inter.getApiUrl().empPassOrNot, { userId: userId, auditStatus: "1" }, function(json) {
                                    if (json.success) {
                                        oTable.fnUpdate('通过', $curRow, 6, false);
                                        oTable.fnUpdate('<a href="javascript:;" name="btnView" class="btn btn-success">查看</a><a href="javascript:;" class="btn btn-primary" name="btnPass">通过</a>', $curRow, 7, false);
                                    } else {
                                        $(this).find('.btn').prop('disabled', false);
                                        bootbox.alert(json.errMsg);
                                    }
                                }, 'JSON')
                                break;
                        }
                    });
                }
            });
        $('#btnSearch').on('click', function(e) {
            oTable.api().ajax.reload();
        });
    }

    //初始化状态
    var initAuditStatusSel = function() {
        $('#selAuditStatus').select2({
            width: "100%",
            placeholder: "请选择审核状态",
            allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getEmpAuditStatus()),
            minimumResultsForSearch: Infinity, //没有选择框
            // escapeMarkup: function(markup) {
            //     return markup;
            // }, // let our custom formatter work
            // minimumInputLength: 1,
        }).select2('val', null);
    }

    var initSearchBtn = function() {
        $('#btnClear').on('click', function(e) {
            $('#searchForm')[0].reset();
            $('.select2-hidden-accessible').each(function(i, e) {
                $(this).select2('val', null);
            });
        })
    }

    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().dataTable) {
                return;
            }
            initTable();
            initSearchBtn();
            initAuditStatusSel();
        }
    };
}();

jQuery(document).ready(function() {
    $(document).keydown(function(e) {
        if (e.keyCode == 13) {
            $('#btnSearch').trigger('click');
        }
    });
    initEmpAuditPage.init();
});
