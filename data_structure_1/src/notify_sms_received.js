
var prefix_message={
    bm:function(sms_json){
        if(localStorage.is_signing_up=="true"){
            if(judge_repeat.bm(sms_json)!=undefined){
            }
            else
            {
                handle_sms(sms_json,'bm');
            }
        }
    },
    jj:function(sms_json){
        if(localStorage.is_bidding=="true"){
            if(judge_repeat.jj(sms_json)!=undefined){
            }
            else
            {
                handle_sms(sms_json,'jj');
            }
        }
    }
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


function handle_sms(sms_json,prefix_message){
    if(prefix_message=='bm'){
        var activities=JSON.parse(localStorage.activities);
        var current_activity=JSON.parse(localStorage.current_activity);
        sms_json.messages[0].message=sms_json.messages[0].message.substr(2);
        var act_in_acts= _.find(activities,function(act){
            return act.name==current_activity.name;
        })
        act_in_acts.sign_ups.unshift(sms_json);
        localStorage.setItem("activities",JSON.stringify(activities))
    }
    else if(prefix_message='jj'){
        if(judge_repeat.bm(sms_json)&&judge_repeat.jj(sms_json)==undefined){
            do_with_JJ(sms_json);
        }
    }
}

function get_current_act(){
    var activities=JSON.parse(localStorage.activities);
    var current_activity=JSON.parse(localStorage.current_activity);
    return _.find(activities,function(act){
        return act.name==current_activity.name;
    })
}

function do_with_JJ(sms_json){
    var activities=JSON.parse(localStorage.activities);
    var current_activity=JSON.parse(localStorage.current_activity);
    var act_in_acts=_.find(activities,function(act){
        return act.name==current_activity.name;
    })
    var current_bid= _.find(act_in_acts.bids,function(act_bid){
        return act_bid.name==localStorage.current_bid;
    })
    var new_bidding=new Bidding(sms_json);
    current_bid.biddings.unshift(new_bidding);
    localStorage.setItem("activities",JSON.stringify(activities))
}


     ////

function notify_sms_received(sms_json){
    judge_prefix[get_sms_prefix(sms_json)](sms_json);
}

function get_sms_prefix(sms_json){
    var message=sms_json.messages[0].message.substr(0,2).toLowerCase();
    return message;
}



//var judge_repeat={
//    'bm':function(sms_json){
//        var act_in_acts=get_current_act();
//        return _.find(act_in_acts.sign_ups,function(act_signs){
//            return act_signs.phone==sms_json.messages[0].phone;
//        })
//    },
//    'jj':function(sms_json){
//        var act_in_acts=get_current_act();
//        var current_bid= _.find(act_in_acts.bids,function(act_bid){
//            return act_bid.name==localStorage.current_bid;
//        })
//        return _.find(current_bid.biddings,function(bidding){
//            return bidding.phone==sms_json.messages[0].phone;
//        })
//    }
//}



var judge_prefix={
    'bm':function(sms_json){
        is_signing_up[Activity.get_is_signing_up()](sms_json)
    },
    'jj':function(sms_json){
        is_bidding_up[Activity.get_is_bidding_up()](sms_json)
    }
}

function judge_repeat(_array,user_phone){
    return _.find(_array,function(obj){
        return obj.phone==user_phone
    })
}





//var prefix_message={
//    bm:function(sms_json){
//        if(localStorage.is_signing_up=="true"){
//            if(judge_repeat.bm(sms_json)!=undefined){
//            }
//            else
//            {
//                handle_sms(sms_json,'bm');
//            }
//        }
//    },
//    jj:function(sms_json){
//        if(localStorage.is_bidding=="true"){
//            if(judge_repeat.jj(sms_json)!=undefined){
//            }
//            else
//            {
//                handle_sms(sms_json,'jj');
//            }
//        }
//    }
//}