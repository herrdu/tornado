/**
 * Author:DuYutao
 * Date:2016-3-24
 * Description:工资发放界面
 */

var TableDatatablesEditable = function() {
    var table = $('#salaryList'),
        oTable;

    //初始化上传工资单
    var initDialog = function() {
        $('#btnUploadBill').on('click', function(e) {
            var dialogContent = [];
            dialogContent.push('<div class="row">');
            dialogContent.push('<div class="col-md-12">');
            dialogContent.push('<div class="form-group">');
            dialogContent.push('<div class="input-group">');
            dialogContent.push('<label class="input-group-addon">年度</label>');
            dialogContent.push('<div class="input-group-content">');
            dialogContent.push('<input type="text" id="year" name="year" class="form-control" placeholder="年度" value="">');
            dialogContent.push('</div>');
            dialogContent.push('</div>');
            dialogContent.push('</div>');
            dialogContent.push('</div>');
            dialogContent.push('<div class="col-md-12">');
            dialogContent.push('<div class="form-group">');
            dialogContent.push('<div class="input-group">');
            dialogContent.push('<label class="input-group-addon">月度</label>');
            dialogContent.push('<div class="input-group-content">');
            dialogContent.push('<select  id="month" name="month" class="form-control" placeholder="月度" ></select>');
            dialogContent.push('</div>');
            dialogContent.push(' </div>');
            dialogContent.push('</div>');
            dialogContent.push('</div>');
            dialogContent.push('<div class="col-md-12">');
            dialogContent.push('<div class="form-group">');
            dialogContent.push('<span class="btn green fileinput-button" >');
            dialogContent.push('<i class="glyphicon glyphicon-plus"></i>');
            dialogContent.push('<span>添加工资单</span>');
            dialogContent.push('<input id="fileupload" type="file" name="files" ></span>');
            // dialogContent.push('<div id="progress" class="progress">');
            // dialogContent.push('<div class="progress-bar progress-bar-success"></div>');
            dialogContent.push('</div>');
            dialogContent.push('<div id="files" class="files"></div>');
            dialogContent.push('</div>');
            dialogContent.push('</div>');
            dialogContent.push(' </div>');
            var uploadDialog = bootbox.dialog({
                message: dialogContent.join(''),
                title: "上传工资单",
                buttons: {
                    success: {
                        label: "保存",
                        className: "green btnSave",
                        callback: function() {
                            $('.btnSave').addClass('disabled');
                            // App.blockUI({
                            //     boxed: true,
                            //     message: '工资单上传中，请耐心等待',
                            // });
                            $('#btnUpload').trigger('click');
                            return false;
                        }
                    },
                    cancel: {
                        label: "取消",
                        className: "default",
                        callback: function() {}
                    },
                }
            }).init(function(e) {
                $('#year').select2({
                    width: "400px",
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
                $('#month').select2({
                    width: "400px",
                    placeholder: "请选择月度",
                    allowClear: true,
                    data: $.convertObjectToSelect2Array(com_Conf.getArrMonth()),
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity, //没有选择框
                    // escapeMarkup: function(markup) {
                    //     return markup;
                    // }, // let our custom formatter work
                    // minimumInputLength: 1,
                }).select2('val', null);
                $('#fileupload').fileupload({
                        url: Inter.getApiUrl().uploadSalary,
                        dataType: 'json',
                        autoUpload: false,
                        acceptFileTypes: /(\.|\/)(xls?x)$/i,
                        maxFileSize: 999000,
                        formData: function(formId) {
                            return [{ name: 'year', value: $('#year').val() }, { name: "month", value: $('#month').val() }];
                        }, //添加额外的数据
                        singleFileUploads: true,
                        // Enable image resizing, except for Android and Opera,
                        // which actually support image resizing, but fail to
                        // send Blob objects via XHR requests:
                        disableImageResize: /Android(?!.*Chrome)|Opera/
                            .test(window.navigator.userAgent),
                        previewMaxWidth: 100,
                        previewMaxHeight: 100,
                        previewCrop: true,
                        maxNumberOfFiles: 1,
                    }).on('fileuploadadd', function(e, data) {
                        $('#files').empty();
                        data.context = $('<div/>').appendTo('#files');
                        $.each(data.files, function(index, file) {
                            var node = $('<p/>').append($('<span/>').text(file.name));
                            node.appendTo(data.context);
                        });
                        var uploadButton = $('<button/>').text('Upload').css('display', 'none').attr('id', 'btnUpload');
                        uploadButton.insertAfter('#fileupload').on('click', function(e) {
                            data.submit();
                        });

                    }).on('fileuploadprocessalways', function(e, data) {
                        var index = data.index,
                            file = data.files[index],
                            node = $(data.context.children()[index]);
                        if (file.preview) {
                            node
                                .prepend('<br>')
                                .prepend(file.preview);
                        }
                        if (file.error) {
                            node
                                .append('<br>')
                                .append($('<span class="text-danger"/>').text(file.error));
                        }
                        if (index + 1 === data.files.length) {
                            data.context.find('button')
                                .text('Upload')
                                .prop('disabled', !!data.files.error);
                        }
                    }).on('fileuploadprogressall', function(e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        $('#progress .progress-bar').css(
                            'width',
                            progress + '%'
                        );
                    }).on('fileuploaddone', function(e, data) {
                        $('.btnSave').removeClass('disabled');

                        // App.unblockUI();
                        var re = data.result;
                        if (re.success) {
                            bootbox.hideAll();
                            oTable.api().ajax.reload();
                        } else {
                            var arrErrMsg = [];
                            for (var i = 0; i < re.message.length; i++) {
                                arrErrMsg.push(re.message + "<br/>");
                            }
                            bootbox.alert(arrErrMsg.join(''));
                        }
                        // $.each(data.result.files, function(index, file) {
                        //     if (file.url) {
                        //         var link = $('<a>')
                        //             .attr('target', '_blank')
                        //             .prop('href', file.url);
                        //         $(data.context.children()[index])
                        //             .wrap(link);
                        //     } else if (file.error) {
                        //         var error = $('<span class="text-danger"/>').text(file.error);
                        //         $(data.context.children()[index])
                        //             .append('<br>')
                        //             .append(error);
                        //     }
                        // });
                    }).on('fileuploadfail', function(e, data) {
                        $('.btnSave').removeClass('disabled');
                        // App.unblockUI();
                        $.each(data.files, function(index) {
                            // bootbox.alert('asdfasdfas');
                            var error = $('<span class="text-danger"/>').text('文件上传失败， 请重试');
                            $('#files').find('.text-danger').remove();
                            $('#files').find('br').remove();
                            $(data.context.children()[index])
                                .append('<br>')
                                .append(error);
                        });
                    }).prop('disabled', !$.support.fileInput)
                    .parent().addClass($.support.fileInput ? undefined : 'disabled');
            });
        });
    }

    //初始化列表
    var initDateTable = function() {

        oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            searching: false,
            ordering: false,
            paging: true,
            buttons: [],
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": Inter.getApiUrl().getPayQuery,
                "type": "POST",
                "data": function(d) {
                    $('#searchForm').formatFormParam(d);
                },
                "dataSrc": function(json) { //datatable callback后可以修改数据的地方
                    // var objstatus = {
                    //     1: '正常',
                    //     2: '停用',
                    // };
                    // for (var i = 0, ien = json.data.length; i < ien; i++) {
                    //     json.data[i].statusName = objstatus[json.data[i].status];
                    // }
                    return json.data;
                }
            },
            "rowId": "id",
            "columns": [
                { "data": "year" },
                { "data": "month" },
                { "data": "salaryModel" },
                { "data": "companyName" },
                { "data": "operatorId" },
                { "data": "salaryMoney" },
                { "data": "personNum" },
                { "data": "salaryurl" }, {
                    "data": "handler",
                    "class": "",
                    "orderable": false,
                    "data": null,
                    "defaultContent": '<a name="btnPay" class="btn btn-success" href="javascript:;"> 发放 </a><a name="btnDel" class="btn btn-danger" href="javascript:;">删除</a><a name="btnEx" class="btn btn-primary" href="javascript:;">查看异常</a>',
                }
            ],
            "columnDefs": [{
                "targets": [7],
                "render": function(data, type, row) {
                    return row.salaryurl ? '<a name="btnDown" class=""  href="' + row.salaryurl + '">  下载  </a>' : "暂无附件";
                }
            }],
            initComplete: function(data) {
                //初始化查询事件
                $('#btnSearch').on('click', function(e) {
                    oTable.api().ajax.reload();
                });
            },
            // setup responsive extension: http://datatables.net/extensions/responsive/
            responsive: true,

            //"ordering": false, disable column ordering 
            //"paging": false, disable pagination

            "order": [
                [0, 'asc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "全部"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });

        // var tableWrapper = $("#sample_editable_1_wrapper");

        table.on('click', function(e) {
            var eName = $(e.target).attr('name'),
                $curRow = $(e.target).closest('tr'),
                curRowId = oTable.api().row($curRow[0]).id();

            switch (eName) {
                case "btnPay":
                    App.blockUI({
                        boxed: true
                    });
                    Util.setAjax(Inter.getApiUrl().payOff, { orderNo: curRowId }, function(json) {
                        App.unblockUI();
                        if (json.success) {
                            oTable.api().ajax.reload();
                        } else {
                            bootbox.alert(json.errMsg);
                        }
                    }, function() {});
                    break;
                case "btnDel":
                    var delDialog = bootbox.dialog({
                        message: "你确定删除这张工资单吗？",
                        title: "删除工资单",
                        buttons: {
                            success: {
                                label: "删除",
                                className: "btn-danger",
                                callback: function() {
                                    App.blockUI({
                                        boxed: true,
                                    });
                                    Util.setAjax(Inter.getApiUrl().delPayslip, { orderNo: curRowId }, function(json) {
                                        App.unblockUI();
                                        if (json.success) {
                                            oTable.api().ajax.reload();
                                        } else {
                                            bootbox.alert('删除失败');
                                        }
                                    }, function() {});
                                    delDialog.modal('hide');
                                    return false;
                                }
                            },
                            cancel: {
                                label: "取消",
                                className: "default",
                                callback: function() {
                                    return true;
                                }
                            },
                        }
                    })
                    break;
                case 'btnEx':
                    window.location.href = Inter.getApiUrl().getSalaryEx + '?orderNo=' + curRowId;
                    break;
            }
        });
    }

    //初始化状态下拉
    var initStatusSel = function() {
        $('#selStatus').select2({
            width: "100%",
            placeholder: "请选择状态",
            allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getPayStatus()),
            theme: "bootstrap",
            minimumResultsForSearch: Infinity, //没有选择框
            // escapeMarkup: function(markup) {
            //     return markup;
            // }, // let our custom formatter work
            // minimumInputLength: 1,
        }).select2('val', null);
    }

    //初始化公司下拉
    var initComSel = function() {
        $("#selCom").select2({
            width: "100%",
            data: [{ 'id': '1', 'text': '公司1' }],
            placeholder: "请选择公司",
            allowClear: true,
            minimumInputLength: 1,
        }).select2('val', null);
    }

    //初始化操作人下拉
    var initOperatorSel = function() {
        $("#selOperator").select2({
            width: "100%",
            data: [{ 'id': '1', 'text': '操作人1' }],
            placeholder: "请选择操作人",
            allowClear: true,
            minimumInputLength: 1,
        }).select2('val', null);
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
    };
    //初始月度下拉
    var initMonthSel = function() {
        $('#selMonth').select2({
            width: "100%",
            placeholder: "请选择月度",
            allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getArrMonth()),
            theme: "bootstrap",
            minimumResultsForSearch: Infinity, //没有选择框
            // escapeMarkup: function(markup) {
            //     return markup;
            // }, // let our custom formatter work
            // minimumInputLength: 1,
        }).select2('val', null);
    };

    //初始化查询按钮
    var initClearBtn = function() {
        $('#btnClear').on('click', function(e) {
            e.preventDefault();
            $('#searchForm')[0].reset();
            $('.select2-hidden-accessible').each(function(i, e) {
                $(this).select2('val', null);
            });
            // initOperatorSel();
            // initComSel();
        })
    };

    return {

        //main function to initiate the module
        init: function() {
            initDialog();
            initStatusSel();
            initComSel();
            initYearSel();
            initMonthSel();
            initOperatorSel();
            initDateTable();
            initClearBtn();
        }

    };

}();

jQuery(document).ready(function() {
    TableDatatablesEditable.init();
}).on('keydown', function(e) {
    if (e.keyCode == 13) {
        $('#btnSearch').trigger('click');
    }
});
