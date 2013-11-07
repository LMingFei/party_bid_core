function create_new_bid(bid_name){
    var new_bid_name="竞价"+bid_name
    var current_act=Activity.get_activities()[Activity.get_current_activity_id()]
    current_act.biddings[new_bid_name]=[];
    Activity.activity_update(current_act);
}