/**
 * Author:DuYutao
 * Date:2016-3-19
 * Description:组织管理
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initOgListPage = function() {

    //初始化datatable 列表
    var initTable = function() {
        var table = $('#oglist'),
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
                    "url": Inter.getApiUrl().ogQuery,
                    "type": "POST",
                    "data": function(d) {
                        $('#searchForm').formatFormParam(d);
                    }
                },
                "rowId": 'id',
                "columns": [
                    { "data": "ogCode" },
                    { "data": "ogName" },
                    { "data": "upOgName" },
                    { "data": "charger" },
                    { "data": "maintainData" },
                    { "data": "createDate" },
                    { "data": "status" },
                    { "data": "remark" }, {
                        "class": "",
                        "orderable": false,
                        "data": 'handle',
                        "defaultContent": ['<a href="javascript:;" name="btnEdit" class="btn btn-primary">编辑</a>',
                            '<a href="javascript:;" class="btn btn-success" name="btnEnable">启用</a>',
                        ].join('')
                    }
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

                    $('#oglist').on('click', function(e) {
                        var domName = $(e.target).attr('name'),
                            $curRow = $(e.target).closest('tr'),
                            curRowId = oTable.api().row($curRow[0]).id();
                        switch (domName) {
                            case 'btnView':
                                window.location.href = Util.addUrlParam(Inter.getApiUrl().ogView, { id: curRowId });
                                break;
                            case 'btnEdit':
                                window.location.href = Util.addUrlParam(Inter.getApiUrl().ogEdit, { id: curRowId });
                                break;
                            case 'btnEnable':
                                oTable.fnUpdate('<a href="javascript:;" name="btnView" class="btn btn-primary">查看</a><a href="javascript:;" class="btn btn-danger" name="btnDisable">停用</a>', $curRow, 8, false);
                                Util.setAjax(Inter.getApiUrl().enableOg, { id: curRowId,status:'1' }, function(json) {
                                    if (json.success) {
                                        oTable.api().ajax.reload();
                                    } else {
                                        bootbox.alert(json.errMsg);
                                    }
                                }, function() {});
                                break;
                            case 'btnDisable':
                                oTable.fnUpdate(['<a href="javascript:;" name="btnEdit" class="btn btn-primary">编辑</a>',
                                    '<a href="javascript:;" class="btn btn-success" name="btnEnable">启用</a>'
                                ].join(''), $curRow, 8, false);
                                Util.setAjax(Inter.getApiUrl().disableOg, { id: curRowId ,status:'2'}, function(json) {
                                    if (json.success) {
                                        oTable.api().ajax.reload();
                                    } else {
                                        bootbox.alert(json.errMsg);
                                    }
                                }, function() {});
                                break;
                        }
                    });
                }
            });
    }

    var initCreateBtn = function() {
        $('#btnCreateCom').on('click', function() {
            window.location.href = Util.addUrlParam(Inter.getApiUrl().ogCreate);
        });
    }

    var initSearchBtn = function() {
        $('#btnClear').on('click', function(e) {
            $('#searchForm')[0].reset();
             $('.select2-hidden-accessible').each(function(i, e) {
                $(this).select2('val', null);
            });
        })
    }

    var initDatePicker = function() {
        $('.date-picker').datepicker({
            orientation: "right",
            autoclose: true,
            language: "zh-CN",
            format: "yyyy-mm-dd",
        });
    }

    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().dataTable) {
                return;
            }
            initCreateBtn();
            initTable();
            initDatePicker();
            initSearchBtn();
        }
    };
}();

jQuery(document).ready(function() {

    initOgListPage.init();
});
