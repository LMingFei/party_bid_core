function notify_sms_received(sms_json){
    judge_prefix[get_sms_prefix(sms_json)](sms_json)
}

var judge_prefix={
    'bm':function(sms_json){
        is_signing_up[Sign_up.get_is_signing_up()](sms_json)
    },
    'jj':function(sms_json){
        is_bidding_up[Bid.get_is_bidding_up()](sms_json)
    }
}

var is_signing_up={
    'true':function(sms_json){

    },
    'false':function(){return false},
    '':function(){return false},
    'undefined':function(){return false}

}

var is_bidding_up={
    'true':function(sms_json){

    },
    'false':function(){return false},
    '':function(){
        return false
    },
    'undefined':function(){return false}
}

function get_sms_prefix(sms_json){
    var message=sms_json.messages[0].message.substr(0,2).toLowerCase();
    return message;
}

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function judge_repeat(_array,user_phone){
    return _.find(_array,function(obj){
        return obj.phone==user_phone
    })
}