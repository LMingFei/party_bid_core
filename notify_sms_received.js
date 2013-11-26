/**
 * Created with JetBrains RubyMine.
 * User: fei
 * Date: 13-11-16
 * Time: 下午3:47
 * To change this template use File | Settings | File Templates.
 */
function notify_sms_received(sms_json){
    var prefix=get_prefix(sms_json)
    handle_by_prefix[prefix](sms_json)
}


function handle_sms(sms_json){
    var message_obj=get_message_obj(sms_json);
    message_obj.message=(trim(message_obj.message),message_obj.message.substr(2));
    return sms_json;
}

function get_prefix(sms_json){
    var message_obj=get_message_obj(sms_json);
    var message=message_obj.message.substr(0,2).toLowerCase();
    return message;
}


function judge_repeat(_array,user_phone){
    return _.find(_array,function(obj){
        return obj.phone==user_phone
    })
}

var handle_by_prefix={
    'bm':function(sms_json){
        is_signing_up[Sign_up.get_is_signing_up()](sms_json)
    },
    'jj':function(sms_json){
        is_bidding_up[Bid.get_is_bidding_up()](sms_json)
    }
}

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}


var is_bidding_up={
    'true':function(sms_json){
        var message_obj=get_message_obj(sms_json);
        var is_sign=judge_repeat(sign_array(),message_obj.phone);
        var is_bid=judge_repeat(bid_array(),message_obj.phone);
        if(is_sign!=undefined&&is_bid==undefined){
            new_user.insert('bidding',handle_sms(sms_json));
        }
    },
    'false':function(){return false},
    '':function(){
        return false
    },
    'undefined':function(){return false}
}

var is_signing_up={
    'true':function(sms_json){
        var message_obj=get_message_obj(sms_json);
        if(judge_repeat(sign_array(),message_obj.phone)==undefined){
              new_user.insert('sign_up',handle_sms(sms_json));

        }
    },
    'false':function(){return false},
    '':function(){return false},
    'undefined':function(){return false}

}


function get_message_obj(sms_json){
    return sms_json.messages[0];
}





