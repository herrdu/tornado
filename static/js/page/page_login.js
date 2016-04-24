/**
 * Author:DuYutao
 * Date:2016-3-23
 * Description:登录界面
 */

var Login = function() {

    var $loginForm = $('#loginForm'),
        captchaApi = null,
        $tips = $('.login-tips');
    var initBackStretch = function() {
        $.backstretch([
            // "../misc-company/images/login/1.jpg",
           ued_conf.root+ "/images/login/2.jpg",
           ued_conf.root+ "/images/login/3.jpg",
           ued_conf.root+ "/images/login/4.jpg"
        ], {
            fade: 1000,
            duration: 8000
        });
    }

    //初始化验证码控件
    var initCaptcha = function() {
        $('#btnCaptcha').on('click', function(e) {
            e.preventDefault();
            changeCaptcha();
        });
        $('#txtCaptcha').on('blur', function(e) {
            var $this = $(this),
                code = $this.val();
            checkCaptcha($this, code);
        });
    };

    /**
     * 刷新验证码
     */
    var changeCaptcha = function() {
        // return;
        $('#captchaImg').prop('src', Inter.getApiUrl().captchaUrl + '?' + Math.random());
    };

    //校验验证码
    var checkCaptcha = function(obj, code, call, errCall) {
        if (code) {
            captchaApi && captchaApi.abort();
            // $.post(Inter.getApiUrl().captchaVal,JSON.stringify({code:code,val:'1231'}),function(json){
            //     console.log(json);
            // });
            captchaApi = Util.setAjax(Inter.getApiUrl().captchaVal, {
                code: code
            }, function(json) {
                if (!json.success && json.errCode) {
                    $tips.empty().html(json.errMsg);
                    errCall && errCall();
                } else {
                    $tips.empty();
                    call && call();
                }
            }, function() {
                // tips.prop('title', '服务器繁忙，请稍后再试。')
                //     .addClass('icon-form-error')
                //     .removeClass('icon-form-right');
                // errCall && errCall();
            });
        } else {
            errCall && errCall();
        }
    };

    //初始化登录功能
    var initLogin = function() {
        $loginForm.on('submit', function(e) {
            e.preventDefault();
            login();
        });
    }

    //登录函数主体
    var login = function() {
        var oName = $('#userCode'),
            oPwd = $('#password'),
            oCaptcha = $('#txtCaptcha'),
            username = $.trim(oName.val()),
            password = oPwd.val(),
            captcha = oCaptcha.val(),
            title = $('.login-title'),
            tipPanel = $('.login-tips'),
            referer = decodeURIComponent(Util.location().referer || ''),
            loginBtn = $loginForm.find('.btn-login');

        // if (loginBtn.hasClass('btn-gray')) {
        //     return false;
        // }
        if(!username.length){
            title.addClass('none');
            tipPanel.removeClass('hide').html('<span><i class="icon icon-form-error"></i>请输入登录名</span>');
            oName.focus();
            return false;
        }
        /*
        // if(!check.isMobile(username).match && !check.email(username).match && !check.IDCard(username).match){
        //     title.addClass('none');
        //     tipPanel.removeClass('none').html('<span><i class="icon icon-form-error"></i>工资365账户是邮箱地址或手机号码或。</span>');
        //     oName.focus();
        //     return false;
        // }*/
        if(!password.length){
            title.addClass('none');
            tipPanel.removeClass('hide').html('<span><i class="icon icon-form-error"></i>请输入密码</span>');
            oPwd.focus();
            return false;
        }
        // if(password.length < 6 || password.length > 16){
        //     title.addClass('none');
        //     tipPanel.removeClass('none').html('<span><i class="icon icon-form-error"></i>用户名或密码错误，请重新输入。</span>');
        //     oPwd.focus();
        //     return false;
        // }
        if(!captcha.length){
            title.addClass('none');
            tipPanel.removeClass('hide').html('<span><i class="icon icon-form-error"></i>请输入验证码</span>');
            oCaptcha.focus();
            return false;
        }
        if(captcha.length < 4){
            title.addClass('none');
            tipPanel.removeClass('hide').html('<span><i class="icon icon-form-error"></i>验证码不正确</span>');
            oCaptcha.focus();
            return false;
        }
        // loginBtn.html('正在进入').removeClass('blue').addClass('btn-gray').css('letter-spacing', '2px')
        loginBtn.html('正在进入').removeClass('blue').addClass('btn-gray');
        // title.removeClass('none');
        tipPanel.addClass('hide');
        // logining = true;
        checkCaptcha(oCaptcha.parent(), captcha, function() {

            // logining = false;
            Util.setAjax(Inter.getApiUrl().loginUrl, {
                usercode: username,
                password: password,
                code: captcha
            }, function(data) {
                if (!data.success) {
                    var errMsg = data.errMsg;
                    if (data.errorCode == '10004' && data.remainLoginTime && data.remainLoginTime < 4) {
                        if (data.remainLoginTime <= 0) {
                            errMsg = '尊敬的用户，由于密码输入错误已达当日上限，您的账户已经被冻结。将于当日24:00解冻，请您耐心等候或找回登录密码。给您造成不便，请原谅。';
                        } else {
                            errMsg = '用户名或密码不正确，您还可以输入' + json.remainLoginTime + '次，错误次数到达上限后相关账户将被冻结24小时。';
                        }
                    }
                    changeCaptcha();
                    // title.addClass('none');
                    tipPanel.removeClass('hide').html('<span><i class="icon icon-form-error"></i>' + errMsg + '</span>');
                    loginBtn.html('登录').removeClass('btn-gray').addClass('blue').css('letter-spacing', '20px');
                } else {
                    // cookie.set('username', json.usercode);
                    // cookie.set('bToken', json.baseToken);
                    if (referer) {
                        var root = location.origin;
                        if (referer.indexOf(location.protocol) == -1) {
                            referer = root + referer;
                        }
                        if (referer.indexOf(root) == 0) {
                            location.href = referer;
                        }
                    } else {
                        location.href = Inter.getApiUrl().accountPage;
                    }
                }
            }, function() {
                title.addClass('none');
                tipPanel.removeClass('hide').html('<span>服务器繁忙，请稍后再试</span>');
                loginBtn.html('登录').removeClass('btn-gray').addClass('blue');
                changeCaptcha();
            });
        }, function() {
            logining = false;
            title.addClass('none');
            tipPanel.removeClass('hide').html('<span>验证码不正确</span>');
            loginBtn.html('登录').removeClass('btn-gray').addClass('blue').css('letter-spacing', '20px');
        })
    }

    return {
        //main function to initiate the module
        init: function() {
            initCaptcha();
            // handleLogin();
            // handleForgetPassword();
            initBackStretch();
            initLogin();
        }
    };
}();

jQuery(document).ready(function() {
    Login.init();
}).on('keydown',function(e){
    if(e.keyCode==13){
        $('.btn-login').trigger('click');
    }
});
