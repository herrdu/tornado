/**
 * Author:DuYutao
 * Date:2016-3-22
 * Description:员工编辑
 */

/**
 * 页面初始化
 */
var intiEmpEditPage = function() {

    //初始化国籍选择
    // var initNationSel = function() {
    //     $('#txtnation').selNation({});
    // }

    //初始化证件类型
    // var initCertificateTyepSel = function() {
    //     var objCerType = com_Conf.getCertificateTyep(),
    //         arrOptions = [];
    //     for (var key in objCerType) {
    //         arrOptions.push('<option value="'+key+'">'+objCerType[key]+'</option>')
    //     }
    //     $('#selCerType').append(arrOptions.join(''));
    // };

    //初始化日期选择控件
    // var handleDatePickers = function() {

    //     if (jQuery().datepicker) {
    //         $('.date-picker').datepicker({
    //             orientation: "left",
    //             autoclose: true,
    //             language: "zh-CN",
    //             format: "yyyy-mm-dd",
    //         });
    //         //$('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
    //     }

    //     /* Workaround to restrict daterange past date select: http://stackoverflow.com/questions/11933173/how-to-restrict-the-selectable-date-ranges-in-bootstrap-datepicker */
    // }

    //初始化员工验证状态下拉
    // var initValStatusSel = function() {
    //     var objValStatus = com_Conf.getEmpValidateStatus(),
    //         arrHtml = [];
    //     for (var key in objValStatus) {
    //         arrHtml.push('<option value="' + objValStatus[key] + '">' + objValStatus[key] + '</option>')
    //     }
    //     $('#selValStatus').empty().append(arrHtml.join(''));
    // }

    //初始化员工状态下拉
    // var initStatusSel = function() {
    //     var objStatus = com_Conf.getEmpStatus(),
    //         arrHtml = [];
    //     for (var key in objStatus) {
    //         arrHtml.push('<option value="' + objStatus[key] + '">' + objStatus[key] + '</option>')
    //     }

    //     $('#selStatus').empty().append(arrHtml.join(''));
    // }



    return {
        //main function to initiate the module
        init: function() {
            if ($('#selbusiType')) {
                $('#selbusiType').select2({
                    // width: "off",
                    placeholder: "请选择业务",
                    allowClear: true,
                    data: $.convertObjectToSelect2Array(com_Conf.getBusiType()),
                    // escapeMarkup: function(markup) {
                    //     return markup;
                    // }, // let our custom formatter work
                    // minimumInputLength: 1,
                }).select2('val', null);

                $('#selOgName').select2({
                    // width: "off",
                    placeholder: "请选择组织",
                    allowClear: true,
                    data: $.convertObjectToSelect2Array(com_Conf.getOgName()),
                    minimumResultsForSearch: Infinity, //没有选择框
                    // escapeMarkup: function(markup) {
                    //     return markup;
                    // }, // let our custom formatter work
                    // minimumInputLength: 1,
                }).select2('val', null);
            };
            // handleDatePickers();
            // initNationSel();
            // initCertificateTyepSel();
            // initValStatusSel();
            // initStatusSel();
        }
    };

}();


//初始化表单验证
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
                    // maxlength: jQuery.validator.format("Max {0}在 items allowed for selection"),
                    // minlength: jQuery.validator.format("At least {0} items must be selected")
                }
            },
            rules: {
                businessType: {
                    required: true
                },
                ogName: {
                    required: true,
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
            // createFormValidation();
        }

    };
}();

jQuery(document).ready(function() {
    $('#btnBack').on('click', function(e) {
        e.preventDefault();
        window.location.href = Inter.getApiUrl().empList;
    });

    if ($('#pageType').val() == "view") {
        return;
    }

    // FormValidation.init();

    intiEmpEditPage.init();

    $('#btnSubmit').on('click', function(e) {
    	e.preventDefault();
        var postData = $('#empForm').formatForm(),
        	btn = $(this);
        postData.businessType = JSON.stringify($('#selbusiType').val());
        if ($('#empForm').valid()) {
            btn.addClass('disabled');
            Util.setAjax(Inter.getApiUrl().empSave, postData, function(data) {
                if (data.success) {
                    window.location.href = Inter.getApiUrl().empList;
                } else {
                    btn.removeClass('disabled');
                    bootbox.alert(data.errMsg);
                }
            });
        }
    });
});
