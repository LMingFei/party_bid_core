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
    sms_obj.handle_by_prefix(prefix);
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

Sms.prototype.handle_by_prefix=function(prefix){
    switch (prefix) {
        case 'bm' : is_signing_up[Sign_up.get_is_signing_up()](this.message_obj);break;
        case 'jj' : is_bidding_up[Bid.get_is_bidding_up()](this.message_obj);break;
        default :break;
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

var is_bidding_up={
    'true':function(message_obj){
        var is_sign=judge_repeat(sign_array(),message_obj.phone);
        var is_bid=judge_repeat(bid_array(),message_obj.phone);
        if(is_sign!=undefined&&is_bid==undefined){
            console.log(1)
            new_user.insert('bidding',Sms.handle_sms(message_obj));
        }
    },
    'false':function(){return false},
    '':function(){
        return false
    },
    'undefined':function(){return false}
}

var is_signing_up={
    'true':function(message_obj){
        if(judge_repeat(sign_array(),message_obj.phone)==undefined){
            new_user.insert('sign_up',Sms.handle_sms(message_obj));

        }
    },
    'false':function(){return false},
    '':function(){return false},
    'undefined':function(){return false}

}
