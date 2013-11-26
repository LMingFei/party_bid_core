/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-11-16
 * Time: 下午3:47
 * To change this template use File | Settings | File Templates.
 */
function notify_sms_received(sms_json){
    var sms_obj=new Sms(sms_json);
    var prefix=sms_obj.get_prefix(sms_json);
    sms_obj.handle_by_prefix[prefix](sms_obj.message_obj);
}

function Sms(sms_json){
    this.message_obj=sms_json.messages[0];
}

Sms.prototype.get_prefix=function(){
    var message=this.message_obj.message.substr(0,2).toLowerCase();
    return message;
}

Sms.handle_sms=function(message_obj){
    message_obj.message=(trim(message_obj.message),message_obj.message.substr(2));
    return message_obj
}

Sms.prototype.handle_by_prefix={
    'bm':function(message_obj){
        var sms_handler=new SmsHandleProcessManager(message_obj)
        sms_handler.is_signing_up[Sign_up.get_is_signing_up()](message_obj);
    },
    'jj':function(message_obj){
        var sms_handler=new SmsHandleProcessManager(message_obj)
        sms_handler.is_bidding_up[Bid.get_is_bidding_up()](message_obj);
    }
}

function judge_repeat(_array,user_phone){
    return _.find(_array,function(obj){
        return obj.phone==user_phone
    })
}

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function SmsHandleProcessManager(message_obj){
    this.message_obj=message_obj;
}

SmsHandleProcessManager.is_sign=function(message_obj){
    return judge_repeat(sign_array(),message_obj.phone);
}

SmsHandleProcessManager.is_bid=function(message_obj){
    return judge_repeat(bid_array(),message_obj.phone);
}

SmsHandleProcessManager.prototype.is_signing_up={
    'true':function(message_obj){
        if(SmsHandleProcessManager.is_sign(message_obj)==undefined){
            new_user.insert('sign_up',Sms.handle_sms(message_obj));
        }
    },
    'false':function(){return false},
    '':function(){return false},
    'undefined':function(){return false}

}

SmsHandleProcessManager.prototype.is_bidding_up={
    'true':function(message_obj){
        if(SmsHandleProcessManager.is_sign(message_obj)!=undefined&&SmsHandleProcessManager.is_bid(message_obj)==undefined){
            new_user.insert('bidding',Sms.handle_sms(message_obj));
        }
    },
    'false':function(){return false},
    '':function(){
        return false
    },
    'undefined':function(){return false}
}