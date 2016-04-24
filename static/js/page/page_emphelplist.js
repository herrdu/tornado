/**
 * Author:DuYutao
 * Date:2016-3-23
 * Description:员工信息代改
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initEmpHelpEditListPage = function() {

    //初始化datatable 列表
    var intiDataTable = function() {
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
                    "url": Inter.getApiUrl().helpEditQuery,
                    "type": "POST",
                    "data": function(d) {
                        $('#searchForm').formatFormParam(d);
                    }
                },
                "rowId": 'id',
                "columns": [
                    // {
                    //     "class": "",
                    //     "orderable": false,
                    //     "data": null,
                    //     "defaultContent": '<div class="checker"><span class=""><input type="checkbox" class="checkboxes" value="1" name="comcheckboxList" ></span></div>'
                    // },
                    { "data": "userName" },
                    { "data": "lawNum" },
                    { "data": "telephone" },
                    { "data": "email" },
                    { "data": "cardNum" },
                    { "data": "accountBankName" },
                    { "data": "accountProvince" },
                    { "data": "cityName" },
                    { "data": "branchName" }, {
                        "class": "",
                        "orderable": false,
                        "data": 'handler',
                        "defaultContent": ['<a href="javascript:;" name="btnEdit" class="btn btn-primary">编辑</a>',
                            // '<a href="javascript:;" class="btn green" name="btnView">查看</a>',
                            // '<a href="javascript:;" class="btn btn-danger" name="btnDel">删除</a>'
                        ].join('')
                    }
                ],

                // "columnDefs": [{
                //     "targets": [0],
                //     "render": function(data, type, row) {
                //         var redata = '<div class="checker"><span class=""><input type="checkbox" class="checkboxes" value="' + data + '" name="comcheckboxList" ></span></div>';
                //         return redata;
                //     }
                // }],
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
                    //初始化checkbox点击事件
                    table.find('.group-checkable').change(function(e) {
                        var checkBoxs = jQuery(this).attr("data-set"),
                            checked = jQuery(this).is(":checked");
                        console.log(checkBoxs);
                        jQuery(checkBoxs).each(function() {
                            if (checked) {
                                $(this).prop("checked", true);
                                $(this).parent('span').addClass('checked').parents('tr').addClass("active");
                            } else {
                                $(this).prop("checked", false);
                                $(this).parent('span').removeClass('checked').parents('tr').removeClass("active");
                            }
                        });
                        jQuery.uniform.update(checkBoxs);
                    });
                    table.find('.checkboxes').closest('td').on('click', function(e) {
                        e.stopPropagation();
                        $(this).find('span').toggleClass('checked').parents('tr').toggleClass("active");
                    });
                    $('#emplist').on('click', '.btn', function(e) {
                        // e.preventDefault();
                        var $target = $(e.target),
                            tName = $target.attr('name'),
                            curRowId = $target.closest('tr').attr('id');

                        if (tName) {
                            switch (tName) {
                                case 'btnEdit':
                                    window.location.href = './emphelpeditform?id=' + curRowId;
                                    break;
                                case 'btnView':
                                    window.location.href = './emphelpeditform';
                                    break;
                                case 'btnDel':
                                    var delDialog = bootbox.dialog({
                                        title: "删除",
                                        message: '你即将删除这条数据，请确认操作',
                                        animate: true,
                                        buttons: {

                                            // For each key inside the buttons object...

                                            "ok": {
                                                label: "删除",

                                                /**
                                                 * @optional String
                                                 * an additional class to apply to the button
                                                 */
                                                className: "btn-danger",

                                                /**
                                                 * @optional Function
                                                 * the callback to invoke when this button is clicked
                                                 */
                                                callback: function() {
                                                    oTable.api().ajax.reload();
                                                    delDialog.modal("hide")
                                                    return false;
                                                }
                                            },
                                            'cancel': {
                                                label: "取消",

                                                /**
                                                 * @optional String
                                                 * an additional class to apply to the button
                                                 */
                                                className: "btn-primary",

                                                /**
                                                 * @optional Function
                                                 * the callback to invoke when this button is clicked
                                                 */
                                                callback: function() {
                                                    oTable.api().ajax.reload();
                                                }
                                            }
                                        }
                                    });
                                    break;
                            }
                        }
                    });
                }
            });

        //提交
        $('#btnSubmit').on('click', function() {
            var str = [],
                activeItem = table.find('.checkBoxs[checked=checked]'),
                overStr = '';
            if (activeItem.length) {
                $.each(activeItem, function() {
                    var status = $(this).find('td:eq(6)').data('status');
                    console.log(status);
                    if (status !== 2) {
                        bootbox.alert({
                            message: '选择用户状态错误，只有状态为: "停用"的用户信息才可进行启用操作。',
                        });
                    } else {
                        str.push($(this).attr('id'));
                    }
                });
                overStr = str.join(',');
            } else {
                bootbox.alert('尚未选中用户，请先选择。');
            }
            console.log(overStr.length);
            if (overStr.length) {
                $.post(Inter.getApiUrl().comUpUser, { 'userIds': overStr, 'status': 1 }, function(data) {
                    if (data.success) {
                        activeItem.find('.btn-success').addClass('disabled');
                        activeItem.find('.red').removeClass('disabled');
                        activeItem.removeClass('active').find('td:eq(6)').text('启用');
                        activeItem.find('.checked').removeClass('checked');
                    }
                });
            }
        });

        $('#btnSearch').on('click', function(e) {
            e.preventDefault();
            oTable.api().ajax.reload();
        });
    }

    var initSearchBtn = function() {
        $('#btnClear').on('click', function(e) {
            $('#searchForm')[0].reset();
            $('.select2-hidden-accessible').each(function(i, e) {
                $(this).select2('val', null);
            });
        });
    }
    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().dataTable) {
                return;
            }
            intiDataTable();
            initSearchBtn();
        }
    };
}();

jQuery(document).ready(function() {
    initEmpHelpEditListPage.init();
});
