var Login = function() {

    /**
     * 登录功能
     * @return {[type]} [description]
     */
    function login() {
        if ($('.login-form').validate().form()) {
            var postData = $('.login-form').formatForm();
            Util.setAjax(Inter.getApiUrl().loginUrl, postData,
                function(json) {
                    if (json.success) {
                        window.location = "./index";
                    } else {
                        // alert('')
                    }
                },
                function() {

                });
        }
    }
    var handleLogin = function() {
        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },
            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },
            invalidHandler: function(event, validator) {
                //display error alert on form submit
                $('.alert-danger', $('.login-form')).show();
            },
            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error');
                // set error class to the control group
            },
            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },
            submitHandler: function(form) {
                login();
                // form validation success, call ajax form submit
            }
        });
        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                login();
                return false;
            }
        });
        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    alert(3333);
                    $('.forget-form').submit();
                }
                return false;
            }
        });
        $('#forget-password').click(function() {
            $('.login-form').hide();
            $('.forget-form').show();
        });
        $('#back-btn').click(function() {
            $('.login-form').show();
            $('.forget-form').hide();
        });
    }
    return {
        //main function to initiate the module
        init: function() {
            handleLogin();
            // init background slide images
            $('.login-bg').backstretch([
                ued_conf.root + "images/login/bg1.jpg",
                ued_conf.root + "images/login/bg2.jpg",
                ued_conf.root + "images/login/bg3.jpg"
            ], {
                fade: 1000,
                duration: 8000
            });
            $('.forget-form').hide();
        }
    };
}();
jQuery(document).ready(function() {
    Login.init();
});
