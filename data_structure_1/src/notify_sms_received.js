var judge_repeat={
    'bm':function(sms_json){
        var act_in_acts=get_current_act();
        return _.find(act_in_acts.sign_ups,function(act_signs){
            return act_signs.phone==sms_json.messages[0].phone;
        })
    },
    'jj':function(sms_json){
        var act_in_acts=get_current_act();
        var current_bid= _.find(act_in_acts.bids,function(act_bid){
            return act_bid.name==localStorage.current_bid;
        })
        return _.find(current_bid.biddings,function(bidding){
            return bidding.phone==sms_json.messages[0].phone;
        })
    }
}
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

function notify_sms_received(sms_json){
    prefix_message[sms_json.messages[0].message.substr(0,2).toLowerCase()](sms_json);
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