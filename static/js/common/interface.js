'use strict';
/*global jQuery, $*/
/**
 * @description: 接口
 * @author: fangyuan(43726695@qq.com)
 * @update:
 */
var Inter = function() {
    return {
        getApiUrl: function() {
            return {
                /*登录功能*/
                loginUrl: ued_conf.context+'/login', //登录请求
                captchaUrl: ued_conf.context+'/getCode', //获取验证码
                captchaVal: ued_conf.context+'/validateCode', //获取验证码
                logout: ued_conf.context+'/logout', //等处功能
            };
        }
    };

}();
// jQuery(document).ready(function () {
//     Inter.getApiUrl(); // init metronic core componets
// });
