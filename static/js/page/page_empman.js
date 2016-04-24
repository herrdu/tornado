/**
 * Author:DuYutao
 * Date:2016-3-22
 * Description:员工管理
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initEmpManPage = function() {

    //初始化datatable 列表
    var initTable = function() {
        var table = $('#emplist'),
            oTable = table.dataTable({
                'buttons': [],
                'searching': false,
                // setup responsive extension: http://datatables.net/extensions/responsive/
                'responsive': false,
                //"bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

                "ordering": false, //disable column ordering,
                "paging": true, //disable pagination
                "processing": true,
                "serverSide": true,
                "ajax": {
                    "url": Inter.getApiUrl().empQuery,
                    "type": "POST",
                    "data": function(d) {
                        $('#searchForm').formatFormParam(d);
                    }
                },
                "rowId": 'id',
                "columns": [
                    { "data": "userName" },
                    { "data": "certificateNum" },
                    { "data": "telephone" },
                    { "data": "agency" },
                    // { "data": "organize" },
                    { "data": "status" },
                    { "data": "validateStatus" },
                    // { "data": "business" }, 
                    {
                        "class": "",
                        "orderable": false,
                        "data": '',
                        "defaultContent": ['<a href="javascript:;" class="btn green" name="btnView">查看</a>', //'<a href="javascript:;" name="btnEdit" class="btn btn-primary">编辑</a>',
                            '<a href="javascript:;" class="btn btn-danger" name="btnLeave">离职</a>',
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
                    $('#emplist').on('click', function(e) {
                        e.preventDefault();
                        var domName = $(e.target).attr('name'),
                            $curRow = $(e.target).closest('tr'),
                            curRowId = oTable.api().row($curRow[0]).id();
                        switch (domName) {
                            case 'btnEdit':
                                window.location.href = Util.addUrlParam(Inter.getApiUrl().empEdit, { id: curRowId });
                                break;
                            case 'btnView':
                                window.location.href = Util.addUrlParam(Inter.getApiUrl().empView, { id: curRowId });
                                break;
                            case 'btnLeave':
                                Util.setAjax(Inter.getApiUrl().empLeave, { id: curRowId }, function(json) {
                                    if (json.success) {
                                        // oTable.fnUpdate('<a href="javascript:;" class="btn green" name="btnView">查看</a>', $curRow, 8, false);
                                        oTable.api().ajax.reload();
                                    } else {
                                        bootbox.alert(json.errMsg);
                                    }
                                })
                                break;
                        }
                    });
                }
            });
        $('#btnSearch').on('click', function(e) {
            e.preventDefault();
            oTable.api().ajax.reload();
        });
    };

    var initCreateBtn = function() {
        $('#btnCreateCom').on('click', function() {
            window.location.href = Util.addUrlParam(Inter.getApiUrl().ogEdit);
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
    };

    //初始化员工验证状态下拉
    var initValStatusSel = function() {
        $('#selValStatus').select2({
            width: "100%",
            placeholder: "请选择验证状态",
            allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getEmpValidateStatus()),
            theme: "bootstrap",
            minimumResultsForSearch: Infinity, //没有选择框
            // escapeMarkup: function(markup) {
            //     return markup;
            // }, // let our custom formatter work
            // minimumInputLength: 1,
        }).select2('val', null);
    }

    //初始化员工状态下拉
    var initStatusSel = function() {
        $('#selStatus').select2({
            width: "100%",
            placeholder: "请选择状态",
            allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getEmpStatus()),
            minimumResultsForSearch: Infinity, //没有选择框
            // escapeMarkup: function(markup) {
            //     return markup;
            // }, // let our custom formatter work
            // minimumInputLength: 1,
            theme: "bootstrap",
        }).select2('val', null);
    }


    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().dataTable) {
                return;
            }
            // initCreateBtn();
            initTable();
            // initDatePicker();
            initSearchBtn();
            initValStatusSel();
            initStatusSel();

        }
    };
}();



jQuery(document).ready(function() {
    $(document).keydown(function(e) {
        if (e.keyCode == 13) {
            $('#btnSearch').trigger('click');
        }
    });
    initEmpManPage.init();
});
