/**
 * Author:DuYutao
 * Date:2016-4-1
 * Description:员工代改编辑页
 */

/**
 * 页面初始化
 */
var intiEmpHelpEditPage = function() {
    var initBankSel = function() {
        $.initSelectBank({
            bankId: 'bankCode', //银行ID
            bankNameId: 'bankName', //银行Name
            provinceId: 'provinceCode',
            provinceNameId: 'provinceName',
            cityId: 'cityCode',
            cityNameId: 'cityName',
            branchBankId: 'branchBankCode',
            branchBankNameId: 'branchBankName',
            cityUrl: Inter.getApiUrl().branchCity,
            branchUrl:Inter.getApiUrl().branchBank,
        });
    }
    return {
        //main function to initiate the module
        init: function() {
            initBankSel();
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
            createFormValidation();
        }

    };
}();

jQuery(document).ready(function() {
    intiEmpHelpEditPage.init();

    $('#btnBack').on('click', function(e) {
        window.location.href = Inter.getApiUrl().helpEditPage;
    });
    $('#btnSubmit').on('click', function(e) {
        var postdata = $('#empHelpForm').formatForm();
        // if ($('#empForm').valid()) {
        $(this).find('.btn').prop('disabled', true);
        Util.setAjax(Inter.getApiUrl().empHelpEditSave, postdata, function(data) {
            if (data.success) {
                window.location.href = Inter.getApiUrl().helpEditPage;
            } else {
                $(this).find('.btn').prop('disabled', false);
                bootbox.alert(data.errMsg);
            }
        }, function() {});
        // }
    });
});
