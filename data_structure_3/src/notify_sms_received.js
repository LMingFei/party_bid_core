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
        if(judge_repeat(_.where(Sign_up.get_sign_ups(),{activity_id:Activity.get_current_activity_id()}),sms_json.messages[0].phone)==undefined){
            var new_sign_up=new Sign_up(handle_sms(sms_json));
            new_sign_up.insert();
        }
    },
    'false':function(){return false},
    '':function(){return false},
    'undefined':function(){return false}

}

var is_bidding_up={
    'true':function(sms_json){
        var is_sign=judge_repeat(_.where(Sign_up.get_sign_ups(),{activity_id:Activity.get_current_activity_id()}),sms_json.messages[0].phone);
        var is_bid=judge_repeat(_.where(Bid.get_bids(),{name:Bid.get_current_bid(),activity_id:Activity.get_current_activity_id()}),sms_json.messages[0].phone);
        if(is_sign!=undefined&&is_bid==undefined){
            var new_bidding=new Bidding(handle_sms(sms_json));
            new_bidding.insert();
        }
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

function handle_sms(sms_json){
    sms_json.messages[0].message=(trim(sms_json.messages[0].message),sms_json.messages[0].message.substr(2));
    return sms_json;
}