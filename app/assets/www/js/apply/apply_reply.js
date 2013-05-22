var reply_application = {
    do_not_start : function (phone){
        console.log('没开始呢',phone);
//        native_accessor.send_sms(phone,'报名还未开始，请稍后');
    },
    ended : function (phone) {
        console.log('已经结束',phone);
//        native_accessor.send_sms(phone, '对不起，报名已经结束');
    },
    success : function(phone){
        console.log('报名成功',phone);
//        native_accessor.send_sms(phone,'报名成功!');
    },
    repeat : function(phone){
        console.log('报名已经成功，别重复报',phone);
//        native_accessor.send_sms(phone, '您已经报名成功，请勿重复报名!');
    }
}