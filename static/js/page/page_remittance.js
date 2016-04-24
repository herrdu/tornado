/**
 * Author:DuYutao
 * Date:2016-3-31
 * Description:汇款管理
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initRemPage = function() {

    //初始化datatable 列表
    var dataTable = function() {
        var table = $('#remlist'),
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
                    "url": Inter.getApiUrl().getRemitRecords,
                    "type": "POST",
                    "data": function(d) {
                        $('#searchForm').formatFormParam(d);
                    }
                },
                "rowId": 'id',
                "columns": [
                    { "data": "batchNo" },
                    { "data": "operator" },
                    { "data": "remitDate" },
                    { "data": "remiter" },
                    { "data": "remitAccount" },
                    { "data": "amount" },
                    { "data": "remitDate" },
                    { "data": "status" }, {
                        "class": "",
                        "orderable": false,
                        "data": 'handler',
                        "defaultContent": ['<a href="javascript:;" name="btnDetail" class="btn btn-primary">查看</a>',
                            '<a href="javascript:;" class="btn green" name="btnView">附件下载</a>',
                        ].join('')
                    }
                ],
                "order": [
                    [0, 'asc']
                ],
                "columnDefs": [{
                    "targets": [7],
                    "render": function(data, type, row) {
                        var objStatus = com_Conf.getRemitStatus();
                        return objStatus[data];
                    }
                }, {
                    "targets": [8],
                    "render": function(data, type, row) {
                        var objStatus = com_Conf.getRemitStatus(),
                            redata = ['<a href="javascript:;" name="btnDetail" class="btn btn-primary">查看</a>'];
                        if (row.voucher) {
                            redata.push('<a href="' + row.voucher + '" class="btn green" name="btnDown">附件</a>');
                        }
                        if (row.status == "FAILED") {
                            redata.push('<a href="javascript:;" class="btn btn-primary" name="btnEdit">编辑</a>');
                            // redata.push('<a href="javascript:;" class="btn red" name="btnSubmitAgain">重新提交</a>');
                        }
                        return redata.join('');
                    }
                }],
                "lengthMenu": [
                    [1, 5, 10, 15, 20, -1],
                    [1, 5, 10, 15, 20, "全部"] // change per page values here
                ],
                // set the initial value
                "pageLength": 10,
                "dom": "<'row' <'col-md-12'B>><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
                initComplete: function(settings, json) {
                    $('#remlist').on('click', function(e) {
                        var $target = $(e.target),
                            tName = $target.attr('name'),
                            curRowId = $target.closest('tr').attr('id'),
                            html = '';

                        if (tName) {
                            switch (tName) {
                                case 'btnDetail':
                                    e.preventDefault();
                                    window.location.href = Util.strFormat(Inter.getApiUrl().remitDetail, [curRowId]);
                                    break;
                                case 'btnEdit':
                                    e.preventDefault();
                                    window.location.href = Util.strFormat(Inter.getApiUrl().remitEditPage, [curRowId]);
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

        // $('#roleSearchClean').on('click', function(e) {
        //     e.preventDefault();
        //     $('#roleManageForm')[0].reset();
        // });
    }

    // var initDatePicker = function() {
    //     $('.date-picker').datepicker({
    //         orientation: "right",
    //         autoclose: true,
    //         language: "zh-CN",
    //         format: "yyyy-mm-dd",
    //     });
    // }

    // //初始化业务类型下拉
    // var initBusiTypeSel = function() {
    //     var objBusiType = com_Conf.getBusiType(),
    //         arrHtml = ['<option value="">请选择</option>'];
    //     for (var key in objBusiType) {
    //         arrHtml.push('<option value="' + objBusiType[key] + '">' + objBusiType[key] + '</option>')
    //     }
    //     $('#selBusiTyep').empty().append(arrHtml.join(''));
    // };

    // //初始化业务类型下拉
    // var initTradeStatusSel = function() {
    //     var objTradeStatus = com_Conf.getTradeStatus(),
    //         arrHtml = ['<option value="">请选择</option>'];
    //     for (var key in objTradeStatus) {
    //         arrHtml.push('<option value="' + objTradeStatus[key] + '">' + objTradeStatus[key] + '</option>')
    //     }
    //     $('#selStatus').empty().append(arrHtml.join(''));
    // };
    //初始化新增按钮
    var initCreateBtn = function() {
        $('#btnCreate').on('click', function(e) {
            window.location.href = Inter.getApiUrl().remitCreatePage
        });
    }
    var initSearchBtn = function() {
        $('#btnClear').on('click', function(e) {
            e.preventDefault();
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
            initSearchBtn();
            dataTable();
            // initDatePicker();
            // initBusiTypeSel();
            // initTradeStatusSel();
            initCreateBtn();
        }
    };
}();

jQuery(document).ready(function() {
    initRemPage.init();
}).on('keydown', function(e) {
    if (e.keyCode == "13") {
        $('#btnSearch').trigger('click');
    }
});
