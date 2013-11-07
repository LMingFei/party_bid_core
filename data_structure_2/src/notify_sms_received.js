function notify_sms_received(sms_json){
    judge_prefix[judge_sms(sms_json)](sms_json)
}

var is_signing_up={
    'true':function(sms_json){
        if(judge_repeat(Activity.get_activities()[Activity.get_current_activity_id()].sign_ups,sms_json.messages[0].phone)==undefined){
            var new_signer =create_signer(handle_sms(sms_json));
            var current_activity=Activity.get_activities()[Activity.get_current_activity()]
            current_activity.sign_ups.push(new_signer);
            Activity.activity_update(current_activity);
        }
    },
    'false':function(){return false},
    '':function(){return false}
}

var is_is_bidding_up={
    'true':function(){
        var is_sign=judge_repeat(Activity.get_activities()[Activity.get_current_activity_id()].sign_ups,sms_json.messages[0].phone);
        var is_bid=judge_repeat(Activity.get_activities()[Activity.get_current_activity_id()].biddings[Activity.get_current_bid()],sms_json.messages[0].phone)
        if(is_sign!=undefined&&is_bid==undefined){

        }
    },
    'false':function(){return false},
    '':function(){return false}
}
var judge_prefix={
    'bm':function(sms_json){
        is_signing_up[Activity.get_is_signing_up()](sms_json)
    },
    'jj':function(sms_json){
        is_is_bidding_up[Activity.get_is_bidding_up()](sms_json)
    }
}

function handle_sms(sms_json){
    sms_json.messages[0].message=(trim(sms_json.messages[0].message),sms_json.messages[0].message.substr(2));
    return sms_json;
}

function judge_sms(sms_json){
    var message=sms_json.messages[0].message.substr(0,2).toLowerCase();
    return message;
}

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function create_signer(sms_json){
    var new_signer={
        name:sms_json.messages[0].message,phone:sms_json.messages[0].phone
    }
    return new_signer;
}

function judge_repeat(_array,user_phone){
   return _.find(_array,function(obj){
        return obj.phone==user_phone
    })

}