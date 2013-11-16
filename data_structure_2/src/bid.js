function create_new_bid(bid_name){
    var new_bid_name="竞价"+bid_name;
    var current_act=Activity.get_activities()[Activity.get_current_activity_id()]
    current_act.biddings[new_bid_name]=[];
    Activity.activity_update(current_act);
}


Bid.get_is_bidding_up=function(){
    return localStorage.is_bidding;
}


Bid.get_current_bid=function(){
    return localStorage.current_bid;
}


function Bid(){

}



function Bidding(sms_json){
    this.name=Activity.get_username_by_phone(sms_json.messages[0].phone)
    this.phone=sms_json.messages[0].phone;
    this.price=sms_json.messages[0].message;
}

Bidding.prototype.insert=function(){
    var current_activity=Activity.get_activities()[Activity.get_current_activity_id(Activity.get_act_id_by_name(Activity.get_current_activity()))]
    current_activity.biddings[Bid.get_current_bid()].push(this);
    Activity.activity_update(current_activity)
}

Bidding.get_min_unique_price=function(biddings){
    return _.find(_.groupBy(biddings,'price'),function(price_array){
        return price_array.length==1
    })
}

Bidding.get_min_unique_price=function(bid_array){
    return _.find(_.groupBy(bid_array,'price'),function(price_array){
        return price_array.length==1
    })
}
