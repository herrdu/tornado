/**
 * Author:DuYutao
 * Date:2016-2-25
 * Description:汇款票据添加列表
 */

/**
 * 页面初始化
 */
var initRemitPage = function() {

    var handleDatePickers = function() {

        if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                orientation: "left",
                autoclose: true,
                language: "zh-CN",
                format: "yyyy-mm-dd",
            });
            //$('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
        }

        /* Workaround to restrict daterange past date select: http://stackoverflow.com/questions/11933173/how-to-restrict-the-selectable-date-ranges-in-bootstrap-datepicker */
    }

    var initFileUpload = function() {
        $('#fileupload').fileupload({
                url: Inter.getApiUrl().uploadRemit,
                dataType: 'json',
                autoUpload: true,
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize: 999000,
                // Enable image resizing, except for Android and Opera,
                // which actually support image resizing, but fail to
                // send Blob objects via XHR requests:
                disableImageResize: /Android(?!.*Chrome)|Opera/
                    .test(window.navigator.userAgent),
                previewMaxWidth: 100,
                previewMaxHeight: 100,
                previewCrop: true
            }).on('fileuploadadd', function(e, data) {}).on('fileuploadprocessalways', function(e, data) {}).on('fileuploadprogressall', function(e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            }).on('fileuploaddone', function(e, data) {
                if (data.result.success) {
                    $('#progress').addClass('hide');
                    $('#filepreview').removeClass('hide');
                    if ($('.previewImg').length > 0) {
                        $('.previewImg').attr('src', data.result.filePath);
                    } else {
                        var previewImg = $('<img>').attr('src', data.result.filePath).addClass('previewImg');
                        $('#filepreview').empty().append(previewImg);
                    }
                    $('#fileurl').val(data.result.filePath);
                } else {
                    $('#filepreview').empty().removeClass('hide').append(data.result.errMsg);
                }
            }).on('fileuploadfail', function(e, data) {
                $('#filepreview').empty().removeClass('hide').append(data.result.errMsg);
            }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
    };
    //初始化汇款类型
    var initRemitType = function() {
        $('#selRemitType').select2({
            width: "100%",
            placeholder: "请选择汇款状态",
            // allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getRemitType()),
            theme: "bootstrap",
            minimumResultsForSearch: Infinity, //没有选择框
        }).select2('val', $('#remitTyepCode').val() || 1);
    };
    return {
        //main function to initiate the module
        init: function() {
            handleDatePickers();
            initFileUpload();
            initRemitType();
        }
    };

}();

//表单验证方法
var FormValidation = function() {

    // basic validation
    var createFormValidation = function() {
        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation

        var createForm = $('#empForm');
        var formError = $('.alert-danger', createForm);
        var formSuccess = $('.alert-success', createForm);

        createForm.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input
            messages: {
                select_multi: {
                    maxlength: jQuery.validator.format("Max {0} items allowed for selection"),
                    minlength: jQuery.validator.format("At least {0} items must be selected")
                }
            },
            rules: {
                remiter: {
                    required: true,
                    maxlength: 20,
                },
                remitAccount: {
                    required: true,
                    maxlength: 30,
                    alphanumeric: true
                },
                remitBank: {
                    maxlength: 30,
                    required: true,
                },
                remitDate: {
                    required: true,
                    dateCN: true,
                },
                znAmount: {
                    required: true,
                },
                amount: {
                    number: true,
                    min: 0,
                    required: true,
                },
                remitType: {
                    required: true,
                }
            },

            errorPlacement: function(error, element) {
                error.appendTo(element.parent());
            },

            invalidHandler: function(event, validator) { //display error alert on form submit              
                formSuccess.hide();
                formError.show();
                App.scrollTo(formError, -200);
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function(element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            submitHandler: function(form) {
                formSuccess.show();
                formError.hide();
            }
        });
    }

    return {
        //main function to initiate the module
        init: function() {
            createFormValidation();
        }

    };
}();

jQuery(document).ready(function() {
    initRemitPage.init();
    FormValidation.init();
    var reUrl = $('#remitId').val() ? Inter.getApiUrl().getRemitListPage : Inter.getApiUrl().accountPage;
    $('#btnBack').on('click', function(e) {
        window.location.href = reUrl;
    });
    $('#btnSubmit').on('click', function(e) {
        var postdata = $('#empForm').formatForm();
        if ($('#empForm').valid()) {
            $(this).find('.btn').prop('disabled', true);
            App.blockUI({
                boxed: true,
                message: '保存中，请等待',
            });
            Util.setAjax(Inter.getApiUrl().remitSave, postdata, function(data) {
                if (data.success) {
                    window.location.href = reUrl;
                } else {
                    App.unblockUI();
                    bootbox.dialog({
                        message: data.errMsg,
                        title: "提醒",
                        closeButton: false,
                        buttons: {
                            success: {
                                label: "确定",
                                className: "green",
                                callback: function() {
                                    window.location.href = reUrl;
                                }
                            },
                        }
                    });
                    // $(this).find('.btn').prop('disabled', false);
                    // bootbox.confirm();
                }
            });
        }
    });
});
