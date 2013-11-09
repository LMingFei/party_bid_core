function notify_sms_received(sms_json){
    judge_prefix[get_sms_prefix(sms_json)](sms_json)
}

var is_signing_up={
    'true':function(sms_json){
        if(judge_repeat(Activity.get_activities()[Activity.get_current_activity_id()].sign_ups,sms_json.messages[0].phone)==undefined){
            var new_signer =create_signer(handle_sms(sms_json));
            var current_activity=Activity.get_activities()[Activity.get_current_activity_id(get_act_id_by_name(Activity.get_current_activity()))]
            current_activity.sign_ups.push(new_signer);
            Activity.activity_update(current_activity);
        }
    },
    'false':function(){return false},
    '':function(){return false},
    'undefined':function(){return false}

}

var is_bidding_up={
    'true':function(sms_json){

        var is_sign=judge_repeat(Activity.get_activities()[Activity.get_current_activity_id(get_act_id_by_name(Activity.get_current_activity()))].sign_ups,sms_json.messages[0].phone);
        var is_bid=judge_repeat(Activity.get_activities()[Activity.get_current_activity_id(get_act_id_by_name(Activity.get_current_activity()))].biddings[Activity.get_current_bid()],sms_json.messages[0].phone)
        if(is_sign!=undefined&&is_bid==undefined){
            var new_bidding=create_bidding(handle_sms(sms_json));
            var current_activity=Activity.get_activities()[Activity.get_current_activity_id(get_act_id_by_name(Activity.get_current_activity()))]
            current_activity.biddings[Activity.get_current_bid()].push(new_bidding);
            Activity.activity_update(current_activity)
        }
    },
    'false':function(){return false},
    '':function(){
        return false
    },
    'undefined':function(){return false}
}

var judge_prefix={
    'bm':function(sms_json){
        is_signing_up[Activity.get_is_signing_up()](sms_json)
    },
    'jj':function(sms_json){
        is_bidding_up[Activity.get_is_bidding_up()](sms_json)
    }
}

function handle_sms(sms_json){
    sms_json.messages[0].message=(trim(sms_json.messages[0].message),sms_json.messages[0].message.substr(2));
    return sms_json;
}

function get_sms_prefix(sms_json){
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

function create_bidding(sms_json){
    var new_bidding={
        name:get_username_by_phone(sms_json.messages[0].phone),phone:sms_json.messages[0].phone,price:sms_json.messages[0].message
    }
    return new_bidding;
}

function judge_repeat(_array,user_phone){
   return _.find(_array,function(obj){
        return obj.phone==user_phone
    })

}

function get_act_id_by_name(activity_name){
    var activities=Activity.get_activities();
    var ids=Activity.get_activity_ids();
    return _.find(ids,function(id){
        return activities[id].name==activity_name
    })
}

function get_username_by_phone(phone){
    var signs=Activity.get_activities()[Activity.get_current_activity_id()].sign_ups;
    return _.find(signs,function(sign){
        return sign.phone==phone;
    }).name
}

function get_min_unique_price(bid_array){
    return _.find(_.groupBy(bid_array,'price'),function(price_array){
        return price_array.length==1
    })
}