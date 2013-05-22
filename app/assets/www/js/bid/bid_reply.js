var reply_bid = {
    have_not_applied : function(phone){
        console.log(phone,'没有报名');
//        native_accessor.send_sms(phone, '您未报名，不能参加竞价');
    },
    do_not_start : function(phone) {
        console.log(phone,'没有开始');
//        native_accessor.send_sms(phone, '竞价未开始，稍等');
    },
    success : function(phone){
        console.log(phone,'竞价成功');
//        native_accessor.send_sms(phone, '竞价成功');
    },
    repeat : function(phone){
        console.log(phone,'请勿重复出价');
//        native_accessor.send_sms(phone, '请勿重复出价');
    },
    ended : function(phone){
        console.log(phone,'本轮竞价已经结束');
//        native_accessor.send_sms(phone, '本轮竞价已结束');
    }
}