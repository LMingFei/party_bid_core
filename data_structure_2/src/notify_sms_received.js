


function sign_array(){
    return Activity.get_activities()[Activity.get_current_activity_id(Activity.get_act_id_by_name(Activity.get_current_activity()))].sign_ups
}

function bid_array(){
    return Activity.get_activities()[Activity.get_current_activity_id(Activity.get_act_id_by_name(Activity.get_current_activity()))].biddings[Bid.get_current_bid()]
}