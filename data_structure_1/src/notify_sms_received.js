
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


var is_signing_up={
    'true':function(sms_json){
        if(judge_repeat(Activity.get_current_act_obj().sign_ups,sms_json.messages[0].phone)==undefined){
            var new_signer =new Sign_up(handle_sms(sms_json));
            new_signer.insert();
        }
    },
    'false':function(){return false},
    '':function(){return false},
    'undefined':function(){return false}

}


var is_bidding_up={
    'true':function(sms_json){
        var is_sign=judge_repeat(Activity.get_current_act_obj().sign_ups,sms_json.messages[0].phone);
        var is_bid=judge_repeat(Bid.get_current_bid_obj().biddings,sms_json.messages[0].phone);
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






//function handle_sms(sms_json,prefix_message){
//    if(prefix_message=='bm'){
//        var activities=JSON.parse(localStorage.activities);
//        var current_activity=JSON.parse(localStorage.current_activity);
//        sms_json.messages[0].message=sms_json.messages[0].message.substr(2);
//        var act_in_acts= _.find(activities,function(act){
//            return act.name==current_activity.name;
//        })
//        act_in_acts.sign_ups.unshift(sms_json);
//        localStorage.setItem("activities",JSON.stringify(activities))
//    }
//    else if(prefix_message='jj'){
//        if(judge_repeat.bm(sms_json)&&judge_repeat.jj(sms_json)==undefined){
//            do_with_JJ(sms_json);
//        }
//    }
//}



//function do_with_JJ(sms_json){
//    var activities=JSON.parse(localStorage.activities);
//    var current_activity=JSON.parse(localStorage.current_activity);
//    var act_in_acts=_.find(activities,function(act){
//        return act.name==current_activity.name;
//    })
//    var current_bid= _.find(act_in_acts.bids,function(act_bid){
//        return act_bid.name==localStorage.current_bid;
//    })
//    var new_bidding=new Bidding(sms_json);
//    current_bid.biddings.unshift(new_bidding);
//    localStorage.setItem("activities",JSON.stringify(activities))
//}


     ////



function handle_sms(sms_json){
    sms_json.messages[0].message=(trim(sms_json.messages[0].message),sms_json.messages[0].message.substr(2));
    return sms_json;
}



function get_sms_prefix(sms_json){
    var message=sms_json.messages[0].message.substr(0,2).toLowerCase();
    return message;
}


function notify_sms_received(sms_json){
    judge_prefix[get_sms_prefix(sms_json)](sms_json)
}


function judge_repeat(_array,user_phone){
    return _.find(_array,function(obj){
        return obj.phone==user_phone
    })
}

var judge_prefix={
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


