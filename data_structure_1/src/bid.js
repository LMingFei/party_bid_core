function Bid(bids_length){
    this.name="竞价"+bids_length;
    this.biddings=[];
}

Bid.create_new_bid=function(activity_name){
    var activities=Activity.get_activities();
    var act=_.find(activities,function(act){
        return act.name=activity_name;
    })
    var new_bid=new Bid(act.bids.length+1);
    act.bids.unshift(new_bid);
    Activity.update_activities(JSON.stringify(activities))
}



function Bidding(sms_json){
    var current_act_obj=Activity.get_current_act_obj();
    this.name= (_.find(current_act_obj.sign_ups,function(sign_up){
        return sign_up.phone==sms_json.messages[0].phone;
    })).name;
    this.phone=sms_json.messages[0].phone;
    this.price=sms_json.messages[0].message;
}


Bid.get_current_bid_obj=function(){
    var act_obj=Activity.get_current_act_obj();
    return _.find(act_obj.bids,function(act_bid){
        return act_bid.name==Bid.get_current_bid();
    })
}


Bid.get_current_bid=function(){
    return localStorage.current_bid;
}

Bid.get_is_bidding_up=function(){
    return localStorage.is_bidding;
}

Bidding.prototype.insert=function(){

    var activities=Activity.get_activities()
    var current_activity=Activity.get_current_activity();
    var bids=_.find(activities,function(act){
        return act.name==JSON.parse(current_activity);
    }).bids
    var current_bid= _.find(bids,function(act_bid){
        return act_bid.name==localStorage.current_bid;
    })
    current_bid.biddings.unshift(this);
    Activity.update_activities(JSON.stringify(activities));
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