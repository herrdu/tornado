/**
 * Author:DuYutao
 * Date:2016-3-16
 * Description:公司端管理账户管理界面
 */

//初始化基本信息界面
var initAccManPage = function() {
    //初始化充值操作
    var initChargeBtn = function() {
        $('#btnCharge').on('click', function(e) {
            window.location.href = Inter.getApiUrl().remitCreatePage;
        });
    }

    //初始化提现界面
    var initCashOutBtn = function() {
        $('#btnCashOut').on('click', function(e) {
            window.location.href = Inter.getApiUrl().cashoutPage;
        });
    }

    //初始化交易记录按钮
    var initTradeRecord = function() {
        $('#btnViewRecord').on('click', function(e) {
            window.location.href = Inter.getApiUrl().tradeRecordPage;
        });
    }

    return {

        //main function to initiate the module
        init: function() {
            initChargeBtn();
            initCashOutBtn();
            initTradeRecord();
        }
    };

}();

//初始化提现界面
var initCashoutPage = function() {
    //表单验证方法

    // basic validation
    var createFormValidation = function() {
        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation

        var createForm = $('#writeForm');
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
                },
                writeAmout: {
                    required:"请输入提现金额",
                    min: jQuery.validator.format("不能输入小于{0}的金额"),
                    max: jQuery.validator.format("不能输入大于{0}的金额"),
                }
            },
            rules: {
                writeAmout: {
                    required: true,
                    number: true,
                    min: 0,
                    max: Number($('#writeUseAmout').text()),
                },
            },

            errorPlacement: function(error, element) {
                // error.insertAfter(element);
                $('#cashoutmoney-error').text(error.text());
            },

            invalidHandler: function(event, validator) { //display error alert on form submit              
                formSuccess.hide();
                formError.show();
                App.scrollTo(formError, -200);
            },

            highlight: function(element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function(element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            submitHandler: function(form) {
                formSuccess.show();
                formError.hide();
            }
        });
    }

    //初始化下一步操作按钮
    var initNextBtn = function() {
        $('#btnNext').on('click', function(e) {
            if ($('#writeForm').valid()) {
                var amount = $('#cashoutmoney').val();
                $('#confirmAmout').text(amount);
                $('#cashOutForm').addClass('hide');
                $('#cashoutPassForm').removeClass('hide');
            }
        });
    };
    //确认按钮增加事件
    var initConfirmBtn = function() {
        $('#btnConfirm').on('click', function(e) {

            Util.setAjax(Inter.getApiUrl().cashout, { amount: $('#confirmAmout').text(), password: $('#payPassword').val() }, function(json) {
                if (json.success) {
                    bootbox.dialog({
                        message: "提现成功",
                        // title: "提醒",
                        closeButton: false,
                        buttons: {
                            success: {
                                label: "确定",
                                className: "green",
                                callback: function() {
                                    window.location.href = Inter.getApiUrl().accountPage;
                                }
                            },
                        }
                    });
                } else {
                    bootbox.alert(json.errMsg);
                }
            }, function() {})
        });
    }
    return {

        //main function to initiate the module
        init: function() {
            initNextBtn();
            initConfirmBtn();
            createFormValidation();
        }
    };
}();



jQuery(document).ready(function() {
    if ($('#basicInfoForm')) {
        initAccManPage.init();
    }
    if ($('#cashOutForm')) {
        initCashoutPage.init();
    }
});
