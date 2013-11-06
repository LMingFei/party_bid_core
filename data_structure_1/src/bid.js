function Bid(bids_length){
    this.name="竞价"+bids_length;
    this.biddings=[];
}

function Bidding(sms_json){
    var current_activity=JSON.parse(localStorage.current_activity);
    this.name= (_.find(current_activity.sign_ups,function(sign_up){
        return sign_up.phone==sms_json.messages[0].phone;
    })).name;
    this.phone=sms_json.messages[0].phone;
    this.price=sms_json.messages[0].message.substr(2);
}

Bid.create_new_bid=function(activity_name){
    var activities=JSON.parse(localStorage.activities);
    var act=_.find(activities,function(act){
        return act.name=activity_name;
    })
    var new_bid=new Bid(act.bids.length+1);
    act.bids.unshift(new_bid);
    localStorage.setItem("activities",JSON.stringify(activities))
}

function render_bids(activity_name){
    var activities=JSON.parse(localStorage.activities);
    var act=_.find(activities,function(act){
        return act.name==activity_name;
    })
    return act.bids;
}

function render_biddings(activity_name,bidding_name){
    var activities=JSON.parse(localStorage.activities);
    var act=_.find(activities,function(act){
        return act.name==activity_name;
    })
    return _.find(act.bids,function(bid){
        return bid.name==bidding_name;
    }).biddings
}