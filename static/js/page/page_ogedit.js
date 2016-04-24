/**
 * Author:DuYutao
 * Date:2016-3-21
 * Description:组织管理编辑
 */

'use strict';
/*global $, jQuery, ued_conf, Util, Inter, window*/
var initOgEditPage = function() {
    //初始组织状态下拉
    var initOgStatusSel = function() {
        var objStatus = com_Conf.getOgStatus(),
            arrHtml = [];
        for (var key in objStatus) {
            arrHtml.push('<option value="' + objStatus[key] + '">' + objStatus[key] + '</option>')
        }
        $('#selOgStatus').empty().append(arrHtml.join(''));
    };

    //初始化上级组织下拉
    var initUpOgSel = function() {
        $("#selUpOg").select2({
            width: "off",
            placeholder: '选择上级组织',
            allowClear: true,
            // data: [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }],
            ajax: {
                url: Inter.getApiUrl().getUpOgSelData,
                dataType: 'json',
                delay: 1000,
                data: function(params) {
                    return {
                        q: params.term, // search term
                        // cityCode: $("#" + options.cityId).val(),
                        // clsCode: $("#" + options.bankId).val().substring(0, 3),
                        page: params.page
                    };
                },
                processResults: function(data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data, //返回的数据
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };
                },
                cache: true
            },
            minimumInputLength: 1,
        }).select2('val', null);
    }
    var initChargerSel = function() {
        $("#selCharger").select2({
            width: "off",
            placeholder: '选择负责人',
            allowClear: true,
            // data: [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }],
            ajax: {
                url: Inter.getApiUrl().getOgCharger,
                dataType: 'json',
                delay: 1000,
                data: function(params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function(data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.data, //返回的数据
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };
                },
                cache: true
            },
            minimumInputLength: 1,
        })
    }

    //初始化状态下拉
    var initStatusSel = function() {
        $('#selOgStatus').select2({
            // width: "off",
            placeholder: "请选择业务",
            allowClear: true,
            data: $.convertObjectToSelect2Array(com_Conf.getOgStatus()),
            minimumResultsForSearch: Infinity, //没有选择框
            // escapeMarkup: function(markup) {
            //     return markup;
            // }, // let our custom formatter work
            // minimumInputLength: 1,
        }).select2('val', null);
    }

    var initDatePicker = function() {
        $('.date-picker').datepicker({
            orientation: "right",
            autoclose: true,
            language: "zh-CN",
            format: "yyyy-mm-dd",
        });
    }
    var initSaveBtn = function() {
        $('#btnSubmit').on('click', function() {
            // window.location.href = 'oglist';
            var postData = $('#ogform').formatForm();
            Util.setAjax(Inter.getApiUrl().saveOgForm, postData, function(data) {
                window.location.href = 'company-application/oglist';
            }, function(data) {});
        });
    }

    return {
        //main function to initiate the module
        init: function() {
            initStatusSel();
            initOgStatusSel();
            initChargerSel();
            initUpOgSel();
            initDatePicker();
            initSaveBtn();
        }
    };
}();

var initFormValidation = function() {

    // basic validation
    var createFormValidation = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

        var ogForm = $('#ogform'),
            formError = $('.alert-danger', ogForm),
            formSuccess = $('.alert-success', ogForm);

        ogForm.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input
            messages: {
                roleName: {
                    required: "角色名称为必填项",
                    maxlength: jQuery.validator.format("角色名称长度不能超过 {0} 个字")
                }
            },
            rules: {
                ogcode: {
                    required: true,
                    maxlength: 10
                },
                ogname: {
                    required: true,
                    maxlength: 100
                },
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
    $('#btnBack').on('click', function(e) {
        e.preventDefault();
        window.location.href = Inter.getApiUrl().ogList;
    });
   
    if ($('#pageType').val() == "view") {
        return;
    }


    initOgEditPage.init();
    initFormValidation.init();
    $('#btnSubmit').on('click', function(e) {
        e.preventDefault();
        var postData = $('#ogform').formatForm();
        if ($('#ogform').valid()) {
            $(this).find('.btn').prop('disabled', true);
            Util.setAjax(Inter.getApiUrl().saveOgInfo, postData, function(data) {
                if (data.success) {
                    window.location.href = "";
                } else {
                    $(this).find('.btn').prop('disabled', false);
                    bootbox.alert(data.errMsg);
                }
            });
        }
    });
});
